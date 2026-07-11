"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Check, CheckCircle2, Info, ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { SetTracker } from "@/components/fitness/set-tracker";
import { inputCls } from "@/components/ui/form";
import { usePrimeStore } from "@/lib/store/store";
import { toast } from "@/lib/store/hooks";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import type { Exercise } from "@/lib/store/types";

const difficulties = ["Easy", "Moderate", "Hard", "Maximum"] as const;

const copy = {
  en: {
    exercise: (n: number) => `Exercise ${n}`,
    setsWord: "sets",
    tempo: "Tempo",
    prev: "Prev",
    colSet: "Set",
    colWeight: "Weight",
    colReps: "Reps",
    colDifficulty: "Difficulty",
    colDone: "Done",
    repsPlaceholder: "reps",
    difficultyPlaceholder: "Difficulty",
    difficulties: { Easy: "Easy", Moderate: "Moderate", Hard: "Hard", Maximum: "Maximum" },
    markSetDone: (n: number) => `Mark set ${n} done`,
    notesPlaceholder: "Notes for your coach (optional)",
    completedToastTitle: "Workout completed. Strong work.",
    completedToastBody: "Your results are now visible to your coach.",
    completedHeading: "Workout completed. Strong work.",
    completedBody: "Your results have been saved and are now visible to your coach.",
    backToDashboard: "Back to dashboard",
    logProgress: "Log progress",
    coachNote: "Coach note",
    completeWorkout: "Complete Workout",
    confirmHeading: "Are you ready to mark this workout as complete?",
    continueEditing: "Continue Editing",
  },
  ro: {
    exercise: (n: number) => `Exercițiul ${n}`,
    setsWord: "serii",
    tempo: "Tempo",
    prev: "Anterior",
    colSet: "Serie",
    colWeight: "Greutate",
    colReps: "Repetări",
    colDifficulty: "Dificultate",
    colDone: "Gata",
    repsPlaceholder: "rep.",
    difficultyPlaceholder: "Dificultate",
    difficulties: { Easy: "Ușor", Moderate: "Moderat", Hard: "Greu", Maximum: "Maxim" },
    markSetDone: (n: number) => `Marchează seria ${n} ca finalizată`,
    notesPlaceholder: "Note pentru antrenor (opțional)",
    completedToastTitle: "Antrenament finalizat. Bravo!",
    completedToastBody: "Rezultatele tale sunt acum vizibile pentru antrenor.",
    completedHeading: "Antrenament finalizat. Bravo!",
    completedBody: "Rezultatele tale au fost salvate și sunt acum vizibile pentru antrenor.",
    backToDashboard: "Înapoi la panou",
    logProgress: "Înregistrează progresul",
    coachNote: "Notă de la antrenor",
    completeWorkout: "Finalizează antrenamentul",
    confirmHeading: "Ești gata să marchezi acest antrenament ca finalizat?",
    continueEditing: "Continuă editarea",
  },
} as const;

function ExerciseCard({ exercise, index }: { exercise: Exercise; index: number }) {
  const logSet = usePrimeStore((s) => s.logSet);
  const done = exercise.logs.filter((l) => l.done).length;
  const { lang } = useI18n();
  const t = copy[lang];

  return (
    <GlassCard variant="solid" className="p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[0.62rem] font-bold uppercase tracking-widest text-muted">
            {t.exercise(index + 1)}
          </p>
          <h3 className="mt-0.5 text-lg font-bold">{exercise.name}</h3>
          <p className="tnum mt-1 text-sm text-muted">
            {exercise.sets} {t.setsWord} · {exercise.reps} · {exercise.rest}
            {exercise.tempo && ` · ${t.tempo} ${exercise.tempo}`}
          </p>
        </div>
        {exercise.previousWeight && (
          <span className="pill border-line text-muted">
            <span className="text-faint">{t.prev}</span>
            <span className="tnum font-semibold text-ink">{exercise.previousWeight}</span>
          </span>
        )}
      </div>

      {exercise.cue && (
        <div className="mt-3 flex items-start gap-2 rounded-md bg-accent/8 px-3 py-2 text-sm text-ink">
          <Info className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={1.8} />
          {exercise.cue}
        </div>
      )}

      <div className="mt-4">
        <SetTracker total={exercise.sets} done={done} />
      </div>

      {/* Set rows */}
      <div className="mt-4 space-y-2">
        {/* header */}
        <div className="hidden grid-cols-[auto_1fr_1fr_1.2fr_auto] gap-2 px-1 text-[0.6rem] font-semibold uppercase tracking-wide text-faint sm:grid">
          <span className="w-12">{t.colSet}</span>
          <span>{t.colWeight}</span>
          <span>{t.colReps}</span>
          <span>{t.colDifficulty}</span>
          <span className="w-9 text-center">{t.colDone}</span>
        </div>
        {exercise.logs.map((log, i) => (
          <div
            key={i}
            className={cn(
              "grid grid-cols-[auto_1fr_1fr] items-center gap-2 rounded-md border p-2 sm:grid-cols-[auto_1fr_1fr_1.2fr_auto]",
              log.done ? "border-olive/40 bg-olive/8" : "border-line",
            )}
          >
            <span className="tnum w-12 pl-1 text-xs font-bold text-muted">
              {String(i + 1).padStart(2, "0")}
            </span>
            <input
              className={cn(inputCls, "px-2.5 py-1.5")}
              placeholder="kg"
              inputMode="decimal"
              value={log.weight}
              onChange={(e) => logSet(exercise.id, i, { weight: e.target.value })}
            />
            <input
              className={cn(inputCls, "px-2.5 py-1.5")}
              placeholder={t.repsPlaceholder}
              inputMode="numeric"
              value={log.reps}
              onChange={(e) => logSet(exercise.id, i, { reps: e.target.value })}
            />
            <select
              className={cn(inputCls, "col-span-2 px-2.5 py-1.5 sm:col-span-1")}
              value={log.difficulty}
              onChange={(e) => logSet(exercise.id, i, { difficulty: e.target.value })}
            >
              <option value="">{t.difficultyPlaceholder}</option>
              {difficulties.map((d) => (
                <option key={d} value={d}>{t.difficulties[d]}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => logSet(exercise.id, i, { done: !log.done })}
              aria-pressed={log.done}
              aria-label={t.markSetDone(i + 1)}
              className={cn(
                "col-start-3 row-start-1 mx-auto grid size-9 place-items-center rounded-full border transition-colors sm:col-start-auto sm:row-start-auto",
                log.done ? "border-transparent bg-olive text-white" : "border-line-strong text-faint hover:text-ink",
              )}
            >
              <Check className="size-4" strokeWidth={2.5} />
            </button>
          </div>
        ))}
      </div>

      {/* Notes */}
      <input
        className={cn(inputCls, "mt-3")}
        placeholder={t.notesPlaceholder}
        value={exercise.logs[0]?.notes ?? ""}
        onChange={(e) => logSet(exercise.id, 0, { notes: e.target.value })}
      />
    </GlassCard>
  );
}

export function WorkoutLogger() {
  const workout = usePrimeStore((s) => s.workout);
  const completeWorkout = usePrimeStore((s) => s.completeWorkout);
  const [confirm, setConfirm] = useState(false);
  const { lang } = useI18n();
  const t = copy[lang];

  const complete = () => {
    completeWorkout();
    setConfirm(false);
    toast(t.completedToastTitle, t.completedToastBody, "success");
  };

  if (workout.completed) {
    return (
      <GlassCard variant="standard" className="mx-auto max-w-xl rounded-hero p-8 text-center sm:p-10">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-olive/15 text-olive">
          <CheckCircle2 className="size-8" strokeWidth={1.7} />
        </span>
        <h2 className="mt-6 text-2xl font-bold">{t.completedHeading}</h2>
        <p className="mt-3 text-muted">{t.completedBody}</p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/portal" className="btn btn-primary">
            {t.backToDashboard}
            <ArrowRight className="size-4" strokeWidth={2} />
          </Link>
          <Link href="/portal/progress" className="btn btn-secondary">
            {t.logProgress}
          </Link>
        </div>
      </GlassCard>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Coach note */}
      <GlassCard variant="solid" className="mb-4 flex items-start gap-3 p-4">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent/12 text-accent">
          <Info className="size-5" strokeWidth={1.7} />
        </span>
        <div>
          <p className="text-[0.62rem] font-bold uppercase tracking-widest text-accent">{t.coachNote}</p>
          <p className="mt-0.5 text-sm leading-relaxed">{workout.coachNote}</p>
        </div>
      </GlassCard>

      <div className="space-y-4">
        {workout.exercises.map((ex, i) => (
          <ExerciseCard key={ex.id} exercise={ex} index={i} />
        ))}
      </div>

      <button onClick={() => setConfirm(true)} className="btn btn-primary mt-6 w-full">
        {t.completeWorkout}
      </button>

      {/* Confirmation dialog */}
      <AnimatePresence>
        {confirm && (
          <motion.div
            className="fixed inset-0 z-[95] grid place-items-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/45 backdrop-blur-sm" onClick={() => setConfirm(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="glass glass-dense relative w-full max-w-sm rounded-hero p-6 text-center"
            >
              <h3 className="text-xl font-bold">{t.confirmHeading}</h3>
              <div className="mt-6 flex flex-col gap-2.5">
                <button onClick={complete} className="btn btn-primary">{t.completeWorkout}</button>
                <button onClick={() => setConfirm(false)} className="btn btn-secondary">{t.continueEditing}</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
