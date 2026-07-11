"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Camera, ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Field, TextArea, inputCls } from "@/components/ui/form";
import { usePrimeStore } from "@/lib/store/store";
import { toast } from "@/lib/store/hooks";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

const copy = {
  en: {
    submittedHeading: "Check-in submitted.",
    submittedBody: "Your coach has been notified and will review your answers.",
    coachFeedback: "Coach feedback",
    backToDashboard: "Back to dashboard",
    required: "This field is required.",
    overall: "Rate your overall week (1–10)",
    workoutsQuestion: "How many workouts did you complete?",
    nutrition: "How closely did you follow your nutrition targets? (1–10)",
    energy: "Average daily energy (1–10)",
    sleep: "Average sleep quality (1–10)",
    stress: "Average stress (1–10)",
    wentWell: "What went well this week?",
    challenge: "What was the biggest challenge?",
    changes: "Is there anything you want changed in your programme?",
    discomfortQuestion: "Do you have any pain or discomfort?",
    yesNo: { No: "No", Yes: "Yes" },
    discomfortPlaceholder: "Describe where you feel discomfort and when it occurs.",
    photoUpload: "Photo upload",
    photoFront: "Front",
    photoSide: "Side",
    photoBack: "Back",
    submit: "Submit Check-In",
    submittedToastTitle: "Check-in submitted.",
    submittedToastBody: "Your coach has been notified.",
  },
  ro: {
    submittedHeading: "Check-in trimis.",
    submittedBody: "Antrenorul tău a fost notificat și îți va analiza răspunsurile.",
    coachFeedback: "Feedback de la antrenor",
    backToDashboard: "Înapoi la panou",
    required: "Acest câmp este obligatoriu.",
    overall: "Cum evaluezi săptămâna în ansamblu? (1–10)",
    workoutsQuestion: "Câte antrenamente ai finalizat?",
    nutrition: "Cât de fidel ți-ai respectat obiectivele nutriționale? (1–10)",
    energy: "Energia medie zilnică (1–10)",
    sleep: "Calitatea medie a somnului (1–10)",
    stress: "Nivelul mediu de stres (1–10)",
    wentWell: "Ce a mers bine săptămâna aceasta?",
    challenge: "Care a fost cea mai mare provocare?",
    changes: "Vrei să schimbăm ceva în programul tău?",
    discomfortQuestion: "Ai vreo durere sau disconfort?",
    yesNo: { No: "Nu", Yes: "Da" },
    discomfortPlaceholder: "Descrie unde simți disconfortul și când apare.",
    photoUpload: "Încărcare fotografii",
    photoFront: "Față",
    photoSide: "Lateral",
    photoBack: "Spate",
    submit: "Trimite check-in-ul",
    submittedToastTitle: "Check-in trimis.",
    submittedToastBody: "Antrenorul tău a fost notificat.",
  },
} as const;

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
  const { lang } = useI18n();
  const t = copy[lang];

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
        <h2 className="mt-6 text-2xl font-bold">{t.submittedHeading}</h2>
        <p className="mt-3 text-muted">{t.submittedBody}</p>
        {existing?.coachResponse && (
          <div className="surface-card mt-6 p-5 text-left">
            <p className="text-[0.62rem] font-bold uppercase tracking-widest text-accent">
              {t.coachFeedback}
            </p>
            <p className="mt-2 text-sm leading-relaxed">{existing.coachResponse}</p>
          </div>
        )}
        <div className="mt-7 flex justify-center gap-3">
          <Link href="/portal" className="btn btn-primary">
            {t.backToDashboard}
            <ArrowRight className="size-4" strokeWidth={2} />
          </Link>
        </div>
      </GlassCard>
    );
  }

  const submit = () => {
    if (!scores.overall || !workouts || !scores.energy || !scores.sleep || (discomfort === "Yes" && !discomfortDetail.trim())) {
      setError(t.required);
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
    toast(t.submittedToastTitle, t.submittedToastBody, "success");
  };

  return (
    <GlassCard variant="solid" className="mx-auto max-w-2xl p-6 sm:p-8">
      <div className="space-y-7">
        <Field label={t.overall}>
          <ScorePicker value={scores.overall} onChange={(v) => setScores((s) => ({ ...s, overall: v }))} />
        </Field>

        <div>
          <p className="text-[0.72rem] font-semibold uppercase tracking-wide text-muted">
            {t.workoutsQuestion}
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

        <Field label={t.nutrition}>
          <ScorePicker value={scores.nutrition} onChange={(v) => setScores((s) => ({ ...s, nutrition: v }))} />
        </Field>
        <Field label={t.energy}>
          <ScorePicker value={scores.energy} onChange={(v) => setScores((s) => ({ ...s, energy: v }))} />
        </Field>
        <Field label={t.sleep}>
          <ScorePicker value={scores.sleep} onChange={(v) => setScores((s) => ({ ...s, sleep: v }))} />
        </Field>
        <Field label={t.stress}>
          <ScorePicker value={scores.stress} onChange={(v) => setScores((s) => ({ ...s, stress: v }))} />
        </Field>

        <Field label={t.wentWell}>
          <TextArea value={text.wentWell} onChange={(e) => setText({ ...text, wentWell: e.target.value })} />
        </Field>
        <Field label={t.challenge}>
          <TextArea value={text.challenge} onChange={(e) => setText({ ...text, challenge: e.target.value })} />
        </Field>
        <Field label={t.changes}>
          <TextArea value={text.changes} onChange={(e) => setText({ ...text, changes: e.target.value })} />
        </Field>

        <div>
          <p className="text-[0.72rem] font-semibold uppercase tracking-wide text-muted">
            {t.discomfortQuestion}
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
                {t.yesNo[o]}
              </button>
            ))}
          </div>
          {discomfort === "Yes" && (
            <div className="mt-3">
              <TextArea
                value={discomfortDetail}
                onChange={(e) => setDiscomfortDetail(e.target.value)}
                placeholder={t.discomfortPlaceholder}
              />
            </div>
          )}
        </div>

        <div>
          <p className="text-[0.72rem] font-semibold uppercase tracking-wide text-muted">{t.photoUpload}</p>
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

        {error && <p className="text-sm font-medium text-danger">{error}</p>}

        <button onClick={submit} className="btn btn-primary w-full">
          {t.submit}
        </button>
      </div>
    </GlassCard>
  );
}
