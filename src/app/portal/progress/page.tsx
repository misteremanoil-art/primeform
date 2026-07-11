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
import { useI18n } from "@/lib/i18n";

const ranges = ["4 weeks", "8 weeks", "12 weeks", "All time"] as const;
const measurements = ["Chest", "Waist", "Hips", "Left arm", "Right arm", "Left thigh", "Right thigh"] as const;

const copy = {
  en: {
    title: "Your progress",
    addEntry: "Add Progress Entry",
    ranges: {
      "4 weeks": "4 weeks",
      "8 weeks": "8 weeks",
      "12 weeks": "12 weeks",
      "All time": "All time",
    },
    metrics: {
      weightChange: "Weight change",
      waistChange: "Waist change",
      workoutCompletion: "Workout completion",
      averageSteps: "Average steps",
      strengthChange: "Strength change",
    },
    measurements: {
      Chest: "Chest",
      Waist: "Waist",
      Hips: "Hips",
      "Left arm": "Left arm",
      "Right arm": "Right arm",
      "Left thigh": "Left thigh",
      "Right thigh": "Right thigh",
    },
    bodyWeightTrend: "Body weight trend",
    measurementsTitle: "Measurements",
    recentEntries: "Recent entries",
    waistWord: "waist",
    required: "This field is required.",
    modalTitle: "Add progress entry",
    date: "Date",
    bodyWeight: "Body weight",
    waist: "Waist",
    chest: "Chest",
    hips: "Hips",
    notes: "Notes",
    photos: "Photos",
    photoFront: "Front",
    photoSide: "Side",
    photoBack: "Back",
    saveEntry: "Save Entry",
    close: "Close",
    savedToastTitle: "Progress entry saved.",
    savedToastBody: "Your coach can now review the new data.",
  },
  ro: {
    title: "Progresul tău",
    addEntry: "Adaugă o înregistrare",
    ranges: {
      "4 weeks": "4 săptămâni",
      "8 weeks": "8 săptămâni",
      "12 weeks": "12 săptămâni",
      "All time": "Tot timpul",
    },
    metrics: {
      weightChange: "Modificare greutate",
      waistChange: "Modificare talie",
      workoutCompletion: "Finalizare antrenamente",
      averageSteps: "Pași în medie",
      strengthChange: "Modificare forță",
    },
    measurements: {
      Chest: "Piept",
      Waist: "Talie",
      Hips: "Șolduri",
      "Left arm": "Braț stâng",
      "Right arm": "Braț drept",
      "Left thigh": "Coapsă stângă",
      "Right thigh": "Coapsă dreaptă",
    },
    bodyWeightTrend: "Evoluția greutății corporale",
    measurementsTitle: "Măsurători",
    recentEntries: "Înregistrări recente",
    waistWord: "talie",
    required: "Acest câmp este obligatoriu.",
    modalTitle: "Adaugă o înregistrare de progres",
    date: "Dată",
    bodyWeight: "Greutate corporală",
    waist: "Talie",
    chest: "Piept",
    hips: "Șolduri",
    notes: "Note",
    photos: "Fotografii",
    photoFront: "Față",
    photoSide: "Lateral",
    photoBack: "Spate",
    saveEntry: "Salvează înregistrarea",
    close: "Închide",
    savedToastTitle: "Înregistrarea de progres a fost salvată.",
    savedToastBody: "Antrenorul tău poate analiza acum noile date.",
  },
} as const;

export default function ProgressPage() {
  const progress = usePrimeStore((s) => s.progress);
  const addProgressEntry = usePrimeStore((s) => s.addProgressEntry);
  const { lang } = useI18n();
  const t = copy[lang];
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
    { label: t.metrics.weightChange, value: `${weightChange <= 0 ? "−" : "+"}${Math.abs(weightChange).toFixed(1)} kg`, tone: "olive" },
    { label: t.metrics.waistChange, value: `${waistChange <= 0 ? "−" : "+"}${Math.abs(waistChange)} cm`, tone: "olive" },
    { label: t.metrics.workoutCompletion, value: "91%", tone: "ink" },
    { label: t.metrics.averageSteps, value: "8,420", tone: "ink" },
    { label: t.metrics.strengthChange, value: "+14%", tone: "olive" },
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
      setError(t.required);
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
    toast(t.savedToastTitle, t.savedToastBody, "success");
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <PortalHeader title={t.title} />
        <button onClick={openForm} className="btn btn-primary mb-6 h-10 min-h-0 px-4 py-0 text-sm">
          <Plus className="size-4" strokeWidth={2.2} />
          {t.addEntry}
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
          <h2 className="text-lg font-bold">{t.bodyWeightTrend}</h2>
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
                {t.ranges[r]}
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
          <h2 className="text-lg font-bold">{t.measurementsTitle}</h2>
          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">
            {measurements.map((m) => {
              const value =
                m === "Waist" ? latest?.waist : m === "Chest" ? latest?.chest : m === "Hips" ? latest?.hips : undefined;
              return (
                <div key={m} className="flex items-center justify-between border-b border-line pb-2 text-sm">
                  <span className="text-muted">{t.measurements[m]}</span>
                  <span className="tnum font-semibold">{value != null ? `${value} cm` : "—"}</span>
                </div>
              );
            })}
          </div>
        </GlassCard>

        {/* History */}
        <GlassCard variant="solid" className="p-6">
          <h2 className="text-lg font-bold">{t.recentEntries}</h2>
          <ul className="mt-4 space-y-2">
            {progress.slice(0, 6).map((p) => (
              <li key={p.id} className="flex items-center justify-between rounded-md border border-line px-3.5 py-2.5 text-sm">
                <span className="font-medium">{p.date}</span>
                <span className="tnum text-muted">
                  {p.weight} kg{p.waist ? ` · ${p.waist} cm ${t.waistWord}` : ""}
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
              <button onClick={() => setOpen(false)} className="absolute right-4 top-4 text-faint hover:text-ink" aria-label={t.close}>
                <X className="size-5" />
              </button>
              <h3 className="text-xl font-bold">{t.modalTitle}</h3>
              <div className="mt-5 space-y-4">
                <Field label={t.date}>
                  <TextInput value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label={t.bodyWeight} error={error ?? undefined}>
                    <TextInput inputMode="decimal" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} placeholder="kg" />
                  </Field>
                  <Field label={t.waist} optional>
                    <TextInput inputMode="decimal" value={form.waist} onChange={(e) => setForm({ ...form, waist: e.target.value })} placeholder="cm" />
                  </Field>
                  <Field label={t.chest} optional>
                    <TextInput inputMode="decimal" value={form.chest} onChange={(e) => setForm({ ...form, chest: e.target.value })} placeholder="cm" />
                  </Field>
                  <Field label={t.hips} optional>
                    <TextInput inputMode="decimal" value={form.hips} onChange={(e) => setForm({ ...form, hips: e.target.value })} placeholder="cm" />
                  </Field>
                </div>
                <Field label={t.notes} optional>
                  <TextArea rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
                </Field>
                <div>
                  <p className="text-[0.72rem] font-semibold uppercase tracking-wide text-muted">{t.photos}</p>
                  <div className="mt-1.5 grid grid-cols-3 gap-2">
                    {[
                      { key: "Front", label: t.photoFront },
                      { key: "Side", label: t.photoSide },
                      { key: "Back", label: t.photoBack },
                    ].map((p) => (
                      <label key={p.key} className={cn(inputCls, "flex cursor-pointer flex-col items-center gap-1 py-4 text-xs text-muted")}>
                        <Camera className="size-4" strokeWidth={1.7} />
                        {p.label}
                        <input type="file" accept="image/*" className="hidden" />
                      </label>
                    ))}
                  </div>
                </div>
                <button onClick={save} className="btn btn-primary w-full">{t.saveEntry}</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
