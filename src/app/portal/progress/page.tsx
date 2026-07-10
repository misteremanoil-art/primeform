"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, X, Camera } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { WeightChart } from "@/components/fitness/weight-chart";
import { PortalHeader } from "@/components/portal/portal-header";
import { Field, TextInput, TextArea, inputCls } from "@/components/ui/form";
import { usePrimeStore } from "@/lib/store/store";
import { toast } from "@/lib/store/hooks";
import { cn } from "@/lib/utils";

const ranges = ["4 weeks", "8 weeks", "12 weeks", "All time"] as const;
const measurements = ["Chest", "Waist", "Hips", "Left arm", "Right arm", "Left thigh", "Right thigh"];

export default function ProgressPage() {
  const progress = usePrimeStore((s) => s.progress);
  const addProgressEntry = usePrimeStore((s) => s.addProgressEntry);
  const [range, setRange] = useState<(typeof ranges)[number]>("12 weeks");
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({ date: "", weight: "", waist: "", chest: "", hips: "", notes: "" });
  const [error, setError] = useState<string | null>(null);

  const latest = progress[0];
  const earliest = progress[progress.length - 1];
  const weightChange = latest && earliest ? latest.weight - earliest.weight : 0;
  const waistChange =
    latest?.waist != null && earliest?.waist != null ? latest.waist - earliest.waist : -8;

  const chrono = [...progress].reverse().map((p) => ({ date: p.date, weight: p.weight }));
  const rangeCount = range === "4 weeks" ? 4 : range === "8 weeks" ? 8 : chrono.length;
  const chartData = chrono.slice(-rangeCount);

  const metrics = [
    { label: "Weight change", value: `${weightChange <= 0 ? "−" : "+"}${Math.abs(weightChange).toFixed(1)} kg`, tone: "olive" },
    { label: "Waist change", value: `${waistChange <= 0 ? "−" : "+"}${Math.abs(waistChange)} cm`, tone: "olive" },
    { label: "Workout completion", value: "91%", tone: "ink" },
    { label: "Average steps", value: "8,420", tone: "ink" },
    { label: "Strength change", value: "+14%", tone: "olive" },
  ];

  const openForm = () => {
    const now = new Date();
    setForm({
      date: now.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }),
      weight: "", waist: "", chest: "", hips: "", notes: "",
    });
    setError(null);
    setOpen(true);
  };

  const save = () => {
    if (!form.weight || isNaN(Number(form.weight))) {
      setError("This field is required.");
      return;
    }
    addProgressEntry({
      date: form.date || "New",
      weight: Number(form.weight),
      waist: form.waist ? Number(form.waist) : undefined,
      chest: form.chest ? Number(form.chest) : undefined,
      hips: form.hips ? Number(form.hips) : undefined,
      notes: form.notes || undefined,
    });
    setOpen(false);
    toast("Progress entry saved.", "Your coach can now review the new data.", "success");
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <PortalHeader title="Your progress" />
        <button onClick={openForm} className="btn btn-primary mb-6 h-10 min-h-0 px-4 py-0 text-sm">
          <Plus className="size-4" strokeWidth={2.2} />
          Add Progress Entry
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {metrics.map((m) => (
          <GlassCard key={m.label} variant="solid" className="p-4">
            <p className={cn("tnum font-heading text-2xl font-bold", m.tone === "olive" && "text-olive")}>
              {m.value}
            </p>
            <p className="mt-1 text-xs text-muted">{m.label}</p>
          </GlassCard>
        ))}
      </div>

      {/* Chart */}
      <GlassCard variant="solid" className="mt-4 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold">Body weight trend</h2>
          <div className="inline-flex rounded-full border border-line p-0.5">
            {ranges.map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                  range === r ? "bg-accent text-accent-ink" : "text-muted hover:text-ink",
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <WeightChart data={chartData} />
        </div>
      </GlassCard>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1fr]">
        {/* Measurements */}
        <GlassCard variant="solid" className="p-6">
          <h2 className="text-lg font-bold">Measurements</h2>
          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">
            {measurements.map((m) => {
              const value =
                m === "Waist" ? latest?.waist : m === "Chest" ? latest?.chest : m === "Hips" ? latest?.hips : undefined;
              return (
                <div key={m} className="flex items-center justify-between border-b border-line pb-2 text-sm">
                  <span className="text-muted">{m}</span>
                  <span className="tnum font-semibold">{value != null ? `${value} cm` : "—"}</span>
                </div>
              );
            })}
          </div>
        </GlassCard>

        {/* History */}
        <GlassCard variant="solid" className="p-6">
          <h2 className="text-lg font-bold">Recent entries</h2>
          <ul className="mt-4 space-y-2">
            {progress.slice(0, 6).map((p) => (
              <li key={p.id} className="flex items-center justify-between rounded-md border border-line px-3.5 py-2.5 text-sm">
                <span className="font-medium">{p.date}</span>
                <span className="tnum text-muted">
                  {p.weight} kg{p.waist ? ` · ${p.waist} cm waist` : ""}
                </span>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>

      {/* Add entry modal */}
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[95] grid place-items-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/45 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="glass glass-dense relative max-h-[88dvh] w-full max-w-md overflow-y-auto rounded-hero p-6"
            >
              <button onClick={() => setOpen(false)} className="absolute right-4 top-4 text-faint hover:text-ink" aria-label="Close">
                <X className="size-5" />
              </button>
              <h3 className="text-xl font-bold">Add progress entry</h3>
              <div className="mt-5 space-y-4">
                <Field label="Date">
                  <TextInput value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Body weight" error={error ?? undefined}>
                    <TextInput inputMode="decimal" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} placeholder="kg" />
                  </Field>
                  <Field label="Waist" optional>
                    <TextInput inputMode="decimal" value={form.waist} onChange={(e) => setForm({ ...form, waist: e.target.value })} placeholder="cm" />
                  </Field>
                  <Field label="Chest" optional>
                    <TextInput inputMode="decimal" value={form.chest} onChange={(e) => setForm({ ...form, chest: e.target.value })} placeholder="cm" />
                  </Field>
                  <Field label="Hips" optional>
                    <TextInput inputMode="decimal" value={form.hips} onChange={(e) => setForm({ ...form, hips: e.target.value })} placeholder="cm" />
                  </Field>
                </div>
                <Field label="Notes" optional>
                  <TextArea rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
                </Field>
                <div>
                  <p className="text-[0.72rem] font-semibold uppercase tracking-wide text-muted">Photos</p>
                  <div className="mt-1.5 grid grid-cols-3 gap-2">
                    {["Front", "Side", "Back"].map((p) => (
                      <label key={p} className={cn(inputCls, "flex cursor-pointer flex-col items-center gap-1 py-4 text-xs text-muted")}>
                        <Camera className="size-4" strokeWidth={1.7} />
                        {p}
                        <input type="file" accept="image/*" className="hidden" />
                      </label>
                    ))}
                  </div>
                </div>
                <button onClick={save} className="btn btn-primary w-full">Save Entry</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
