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
import type { Exercise } from "@/lib/store/types";

const difficulties = ["Easy", "Moderate", "Hard", "Maximum"];

function ExerciseCard({ exercise, index }: { exercise: Exercise; index: number }) {
  const logSet = usePrimeStore((s) => s.logSet);
  const done = exercise.logs.filter((l) => l.done).length;

  return (
    <GlassCard variant="solid" className="p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[0.62rem] font-bold uppercase tracking-widest text-muted">
            Exercise {index + 1}
          </p>
          <h3 className="mt-0.5 text-lg font-bold">{exercise.name}</h3>
          <p className="tnum mt-1 text-sm text-muted">
            {exercise.sets} sets · {exercise.reps} · {exercise.rest}
            {exercise.tempo && ` · Tempo ${exercise.tempo}`}
          </p>
        </div>
        {exercise.previousWeight && (
          <span className="pill border-line text-muted">
            <span className="text-faint">Prev</span>
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
          <span className="w-12">Set</span>
          <span>Weight</span>
          <span>Reps</span>
          <span>Difficulty</span>
          <span className="w-9 text-center">Done</span>
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
              placeholder="reps"
              inputMode="numeric"
              value={log.reps}
              onChange={(e) => logSet(exercise.id, i, { reps: e.target.value })}
            />
            <select
              className={cn(inputCls, "col-span-2 px-2.5 py-1.5 sm:col-span-1")}
              value={log.difficulty}
              onChange={(e) => logSet(exercise.id, i, { difficulty: e.target.value })}
            >
              <option value="">Difficulty</option>
              {difficulties.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => logSet(exercise.id, i, { done: !log.done })}
              aria-pressed={log.done}
              aria-label={`Mark set ${i + 1} done`}
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
        placeholder="Notes for your coach (optional)"
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

  const complete = () => {
    completeWorkout();
    setConfirm(false);
    toast("Workout completed. Strong work.", "Your results are now visible to your coach.", "success");
  };

  if (workout.completed) {
    return (
      <GlassCard variant="standard" className="mx-auto max-w-xl rounded-hero p-8 text-center sm:p-10">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-olive/15 text-olive">
          <CheckCircle2 className="size-8" strokeWidth={1.7} />
        </span>
        <h2 className="mt-6 text-2xl font-bold">Workout completed. Strong work.</h2>
        <p className="mt-3 text-muted">
          Your results have been saved and are now visible to your coach.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/portal" className="btn btn-primary">
            Back to dashboard
            <ArrowRight className="size-4" strokeWidth={2} />
          </Link>
          <Link href="/portal/progress" className="btn btn-secondary">
            Log progress
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
          <p className="text-[0.62rem] font-bold uppercase tracking-widest text-accent">Coach note</p>
          <p className="mt-0.5 text-sm leading-relaxed">{workout.coachNote}</p>
        </div>
      </GlassCard>

      <div className="space-y-4">
        {workout.exercises.map((ex, i) => (
          <ExerciseCard key={ex.id} exercise={ex} index={i} />
        ))}
      </div>

      <button onClick={() => setConfirm(true)} className="btn btn-primary mt-6 w-full">
        Complete Workout
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
              <h3 className="text-xl font-bold">Are you ready to mark this workout as complete?</h3>
              <div className="mt-6 flex flex-col gap-2.5">
                <button onClick={complete} className="btn btn-primary">Complete Workout</button>
                <button onClick={() => setConfirm(false)} className="btn btn-secondary">Continue Editing</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
