"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Camera, ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Field, TextArea, inputCls } from "@/components/ui/form";
import { usePrimeStore } from "@/lib/store/store";
import { toast } from "@/lib/store/hooks";
import { cn } from "@/lib/utils";

function ScorePicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          aria-pressed={value === n}
          className={cn(
            "tnum grid size-9 place-items-center rounded-md border text-sm font-semibold transition-colors",
            value === n
              ? "border-accent bg-accent text-accent-ink"
              : "border-line text-muted hover:text-ink",
          )}
        >
          {n}
        </button>
      ))}
    </div>
  );
}

const workoutCounts = ["0", "1", "2", "3", "4+"];

export function CheckinForm() {
  const submitCheckIn = usePrimeStore((s) => s.submitCheckIn);
  const existing = usePrimeStore((s) => s.checkIns.find((c) => c.clientId === "alex"));

  const [scores, setScores] = useState({ overall: 0, nutrition: 0, energy: 0, sleep: 0, stress: 0 });
  const [workouts, setWorkouts] = useState("");
  const [text, setText] = useState({ wentWell: "", challenge: "", changes: "" });
  const [discomfort, setDiscomfort] = useState<"No" | "Yes" | "">("");
  const [discomfortDetail, setDiscomfortDetail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const alreadyDone =
    existing && ["Needs Review", "Reviewed", "Submitted"].includes(existing.status);

  if (alreadyDone) {
    return (
      <GlassCard variant="standard" className="mx-auto max-w-xl rounded-hero p-8 text-center sm:p-10">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-olive/15 text-olive">
          <CheckCircle2 className="size-8" strokeWidth={1.7} />
        </span>
        <h2 className="mt-6 text-2xl font-bold">Check-in submitted.</h2>
        <p className="mt-3 text-muted">
          Your coach has been notified and will review your answers.
        </p>
        {existing?.coachResponse && (
          <div className="surface-card mt-6 p-5 text-left">
            <p className="text-[0.62rem] font-bold uppercase tracking-widest text-accent">
              Coach feedback
            </p>
            <p className="mt-2 text-sm leading-relaxed">{existing.coachResponse}</p>
          </div>
        )}
        <div className="mt-7 flex justify-center gap-3">
          <Link href="/portal" className="btn btn-primary">
            Back to dashboard
            <ArrowRight className="size-4" strokeWidth={2} />
          </Link>
        </div>
      </GlassCard>
    );
  }

  const submit = () => {
    if (!scores.overall || !workouts || !scores.energy || !scores.sleep || (discomfort === "Yes" && !discomfortDetail.trim())) {
      setError("This field is required.");
      return;
    }
    setError(null);
    submitCheckIn({
      overall: scores.overall,
      workoutsCompleted: workouts,
      nutrition: scores.nutrition,
      energy: scores.energy,
      sleep: scores.sleep,
      stress: scores.stress,
      wentWell: text.wentWell,
      challenge: text.challenge,
      changes: text.changes,
      discomfort: discomfort === "Yes" ? "Yes" : "No",
      discomfortDetail,
    });
    toast("Check-in submitted.", "Your coach has been notified.", "success");
  };

  return (
    <GlassCard variant="solid" className="mx-auto max-w-2xl p-6 sm:p-8">
      <div className="space-y-7">
        <Field label="Rate your overall week (1–10)">
          <ScorePicker value={scores.overall} onChange={(v) => setScores({ ...scores, overall: v })} />
        </Field>

        <div>
          <p className="text-[0.72rem] font-semibold uppercase tracking-wide text-muted">
            How many workouts did you complete?
          </p>
          <div className="mt-1.5 flex gap-2">
            {workoutCounts.map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => setWorkouts(w)}
                aria-pressed={workouts === w}
                className={cn(
                  "tnum grid size-11 place-items-center rounded-md border text-sm font-semibold transition-colors",
                  workouts === w ? "border-accent bg-accent text-accent-ink" : "border-line text-muted hover:text-ink",
                )}
              >
                {w}
              </button>
            ))}
          </div>
        </div>

        <Field label="How closely did you follow your nutrition targets? (1–10)">
          <ScorePicker value={scores.nutrition} onChange={(v) => setScores({ ...scores, nutrition: v })} />
        </Field>
        <Field label="Average daily energy (1–10)">
          <ScorePicker value={scores.energy} onChange={(v) => setScores({ ...scores, energy: v })} />
        </Field>
        <Field label="Average sleep quality (1–10)">
          <ScorePicker value={scores.sleep} onChange={(v) => setScores({ ...scores, sleep: v })} />
        </Field>
        <Field label="Average stress (1–10)">
          <ScorePicker value={scores.stress} onChange={(v) => setScores({ ...scores, stress: v })} />
        </Field>

        <Field label="What went well this week?">
          <TextArea value={text.wentWell} onChange={(e) => setText({ ...text, wentWell: e.target.value })} />
        </Field>
        <Field label="What was the biggest challenge?">
          <TextArea value={text.challenge} onChange={(e) => setText({ ...text, challenge: e.target.value })} />
        </Field>
        <Field label="Is there anything you want changed in your programme?">
          <TextArea value={text.changes} onChange={(e) => setText({ ...text, changes: e.target.value })} />
        </Field>

        <div>
          <p className="text-[0.72rem] font-semibold uppercase tracking-wide text-muted">
            Do you have any pain or discomfort?
          </p>
          <div className="mt-1.5 flex gap-2">
            {(["No", "Yes"] as const).map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => setDiscomfort(o)}
                aria-pressed={discomfort === o}
                className={cn(
                  "rounded-md border px-6 py-2.5 text-sm font-medium transition-colors",
                  discomfort === o ? "border-accent bg-accent/8 text-ink" : "border-line text-muted hover:text-ink",
                )}
              >
                {o}
              </button>
            ))}
          </div>
          {discomfort === "Yes" && (
            <div className="mt-3">
              <TextArea
                value={discomfortDetail}
                onChange={(e) => setDiscomfortDetail(e.target.value)}
                placeholder="Describe where you feel discomfort and when it occurs."
              />
            </div>
          )}
        </div>

        <div>
          <p className="text-[0.72rem] font-semibold uppercase tracking-wide text-muted">Photo upload</p>
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

        {error && <p className="text-sm font-medium text-danger">{error}</p>}

        <button onClick={submit} className="btn btn-primary w-full">
          Submit Check-In
        </button>
      </div>
    </GlassCard>
  );
}
