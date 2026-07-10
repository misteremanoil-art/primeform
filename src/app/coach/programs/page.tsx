"use client";

import { useState } from "react";
import { Plus, Dumbbell, X, ListChecks } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Field, TextInput, TextArea, SelectInput } from "@/components/ui/form";
import { usePrimeStore } from "@/lib/store/store";
import { toast } from "@/lib/store/hooks";

const difficulties = ["Beginner", "Intermediate", "Advanced"];

const emptyForm = {
  name: "",
  description: "",
  goal: "",
  duration: "",
  sessionsPerWeek: "4",
  difficulty: "Intermediate",
  equipment: "",
  notes: "",
};

export default function ProgramsPage() {
  const programs = usePrimeStore((s) => s.programs);
  const saveProgram = usePrimeStore((s) => s.saveProgram);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState<string | null>(null);

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const save = () => {
    if (!form.name.trim() || !form.goal.trim()) {
      setError("This field is required.");
      return;
    }
    saveProgram({
      id: `pg-${Date.now().toString(36)}`,
      name: form.name,
      goal: form.goal,
      description: form.description,
      duration: form.duration,
      sessionsPerWeek: Number(form.sessionsPerWeek) || 0,
      difficulty: form.difficulty,
      equipment: form.equipment,
      notes: form.notes,
      custom: true,
    });
    toast("Programme saved successfully.", undefined, "success");
    setForm(emptyForm);
    setOpen(false);
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Programmes</h1>
          <p className="mt-1.5 text-muted">Templates and custom programmes.</p>
        </div>
        <button onClick={() => setOpen((o) => !o)} className="btn btn-primary h-10 min-h-0 px-4 py-0 text-sm">
          {open ? <X className="size-4" strokeWidth={2} /> : <Plus className="size-4" strokeWidth={2.2} />}
          {open ? "Close" : "New programme"}
        </button>
      </div>

      {/* Create form */}
      {open && (
        <GlassCard variant="solid" className="mb-6 p-6">
          <p className="text-lg font-bold">Create a programme</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Programme name" error={error && !form.name ? error : undefined}>
              <TextInput value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. 8-Week Recomp" />
            </Field>
            <Field label="Goal" error={error && !form.goal ? error : undefined}>
              <TextInput value={form.goal} onChange={(e) => set("goal", e.target.value)} placeholder="e.g. Fat loss and strength" />
            </Field>
            <Field label="Duration">
              <TextInput value={form.duration} onChange={(e) => set("duration", e.target.value)} placeholder="e.g. 8 weeks" />
            </Field>
            <Field label="Sessions per week">
              <TextInput inputMode="numeric" value={form.sessionsPerWeek} onChange={(e) => set("sessionsPerWeek", e.target.value)} />
            </Field>
            <Field label="Difficulty">
              <SelectInput options={difficulties} value={form.difficulty} onChange={(e) => set("difficulty", e.target.value)} />
            </Field>
            <Field label="Required equipment">
              <TextInput value={form.equipment} onChange={(e) => set("equipment", e.target.value)} placeholder="e.g. Full gym" />
            </Field>
          </div>
          <div className="mt-4 grid gap-4">
            <Field label="Description">
              <TextArea rows={2} value={form.description} onChange={(e) => set("description", e.target.value)} />
            </Field>
            <Field label="Coach notes">
              <TextArea rows={2} value={form.notes} onChange={(e) => set("notes", e.target.value)} />
            </Field>
          </div>

          {/* Day/exercise structure hint */}
          <div className="mt-4 rounded-md border border-dashed border-line p-4">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <ListChecks className="size-4 text-accent" strokeWidth={1.8} />
              Session structure
            </p>
            <p className="mt-1 text-xs text-muted">
              Days, session titles, training focus and exercises (sets, reps, rest,
              tempo, cues and alternatives) are added after saving the programme.
            </p>
          </div>

          <div className="mt-5 flex gap-3">
            <button onClick={save} className="btn btn-primary">Save Programme</button>
            <button onClick={() => toast("Assign flow — demo only")} className="btn btn-secondary">Assign to Client</button>
          </div>
        </GlassCard>
      )}

      {/* Templates */}
      <div className="grid gap-4 sm:grid-cols-2">
        {programs.map((p) => (
          <GlassCard key={p.id} variant="solid" className="p-6">
            <div className="flex items-start justify-between">
              <span className="grid size-10 place-items-center rounded-full bg-accent/12 text-accent">
                <Dumbbell className="size-5" strokeWidth={1.7} />
              </span>
              {p.custom && (
                <span className="pill border-accent/30 bg-accent/10 text-accent">Custom</span>
              )}
            </div>
            <h3 className="mt-3 text-lg font-bold">{p.name}</h3>
            <p className="tnum text-sm text-muted">
              {p.sessionsPerWeek} weekly sessions{p.difficulty ? ` · ${p.difficulty}` : ""}
            </p>
            <p className="mt-2 text-sm">
              <span className="text-muted">Goal: </span>
              {p.goal}
            </p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
