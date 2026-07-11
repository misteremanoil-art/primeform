"use client";

import { useState } from "react";
import { InboxIcon } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { StatusPill } from "@/components/fitness/status-pill";
import { Drawer } from "@/components/coach/drawer";
import { Field, TextArea, TextInput } from "@/components/ui/form";
import { usePrimeStore } from "@/lib/store/store";
import { toast } from "@/lib/store/hooks";
import { useI18n } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { CheckIn } from "@/lib/store/types";

const filters = ["Pending", "Submitted", "Reviewed", "Overdue"] as const;

const copy = {
  en: {
    title: "Check-in review",
    subtitle: "Review submissions and send feedback.",
    checkin: "Check-in",
    filterPending: "Pending",
    filterSubmitted: "Submitted",
    filterReviewed: "Reviewed",
    filterOverdue: "Overdue",
    overall: "Overall",
    nutrition: "Nutrition",
    energy: "Energy",
    sleep: "Sleep",
    stress: "Stress",
    workouts: "Workouts",
    emptyTitle: "No check-ins require review.",
    emptyBody: "Everything is currently up to date.",
    wentWell: "What went well",
    challenge: "Biggest challenge",
    changes: "Requested changes",
    discomfort: "Discomfort",
    notSubmitted: "This check-in has not been submitted yet",
    coachResponse: "Coach response",
    required: "This field is required.",
    feedbackPlaceholder: "Write feedback for the client…",
    programmeAdjust: "Programme adjustment required",
    nutritionAdjust: "Nutrition adjustment required",
    followUp: "Follow-up needed",
    nextPriority: "Next week priority",
    priorityPlaceholder: "e.g. Prioritise sleep and protein",
    sendFeedback: "Send Feedback",
    feedbackSent: "Feedback sent to the client.",
  },
  ro: {
    title: "Verificare check-in-uri",
    subtitle: "Verifică trimiterile și trimite feedback.",
    checkin: "Check-in",
    filterPending: "În așteptare",
    filterSubmitted: "Trimise",
    filterReviewed: "Verificate",
    filterOverdue: "Restante",
    overall: "General",
    nutrition: "Nutriție",
    energy: "Energie",
    sleep: "Somn",
    stress: "Stres",
    workouts: "Antrenamente",
    emptyTitle: "Niciun check-in nu necesită verificare.",
    emptyBody: "Totul este la zi în acest moment.",
    wentWell: "Ce a mers bine",
    challenge: "Cea mai mare provocare",
    changes: "Modificări solicitate",
    discomfort: "Disconfort",
    notSubmitted: "Acest check-in nu a fost încă trimis",
    coachResponse: "Răspunsul antrenorului",
    required: "Acest câmp este obligatoriu.",
    feedbackPlaceholder: "Scrie feedback pentru client…",
    programmeAdjust: "Necesită ajustarea programului",
    nutritionAdjust: "Necesită ajustarea nutriției",
    followUp: "Necesită urmărire",
    nextPriority: "Prioritatea săptămânii viitoare",
    priorityPlaceholder: "ex.: Prioritizează somnul și proteinele",
    sendFeedback: "Trimite feedback",
    feedbackSent: "Feedback trimis clientului.",
  },
} as const;

const filterLabel: Record<(typeof filters)[number], keyof (typeof copy)["en"]> = {
  Pending: "filterPending",
  Submitted: "filterSubmitted",
  Reviewed: "filterReviewed",
  Overdue: "filterOverdue",
};

const statusToFilter = (s: CheckIn["status"]) => {
  if (s === "Needs Review" || s === "Submitted") return "Submitted";
  if (s === "Reviewed") return "Reviewed";
  if (s === "Overdue") return "Overdue";
  return "Pending";
};

export default function CheckinsPage() {
  const { lang } = useI18n();
  const t = copy[lang];
  const checkIns = usePrimeStore((s) => s.checkIns);
  const reviewCheckIn = usePrimeStore((s) => s.reviewCheckIn);
  const [filter, setFilter] = useState<(typeof filters)[number]>("Submitted");
  const [openId, setOpenId] = useState<string | null>(null);

  const visible = checkIns.filter((c) => statusToFilter(c.status) === filter);
  const active = checkIns.find((c) => c.id === openId);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold sm:text-3xl">{t.title}</h1>
        <p className="mt-1.5 text-muted">{t.subtitle}</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const count = checkIns.filter((c) => statusToFilter(c.status) === f).length;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                filter === f ? "border-transparent bg-accent text-accent-ink" : "border-line text-muted hover:text-ink",
              )}
            >
              {t[filterLabel[f]]} <span className="tnum opacity-70">{count}</span>
            </button>
          );
        })}
      </div>

      {visible.length > 0 ? (
        <div className="mt-5 space-y-3">
          {visible.map((c) => (
            <GlassCard key={c.id} variant="solid" onClick={() => setOpenId(c.id)} className="flex cursor-pointer items-center justify-between gap-3 p-4">
              <div>
                <p className="font-semibold">{c.clientName}</p>
                <p className="text-sm text-muted">{c.weekLabel}</p>
                {c.overall != null && (
                  <p className="tnum mt-1 text-xs text-faint">
                    {t.overall} {c.overall}/10 · {t.nutrition} {c.nutrition}/10 · {t.energy} {c.energy}/10
                  </p>
                )}
              </div>
              <StatusPill status={c.status} />
            </GlassCard>
          ))}
        </div>
      ) : (
        <div className="mt-5 grid place-items-center rounded-section border border-dashed border-line py-16 text-center">
          <InboxIcon className="size-8 text-faint" strokeWidth={1.5} />
          <p className="mt-4 text-lg font-semibold">{t.emptyTitle}</p>
          <p className="text-sm text-muted">{t.emptyBody}</p>
        </div>
      )}

      <Drawer open={!!active} onClose={() => setOpenId(null)} title={active ? `${active.clientName} · ${t.checkin}` : t.checkin}>
        {active && <ReviewPanel checkIn={active} lang={lang} onReview={reviewCheckIn} onClose={() => setOpenId(null)} />}
      </Drawer>
    </div>
  );
}

function ReviewPanel({
  checkIn,
  lang,
  onReview,
  onClose,
}: {
  checkIn: CheckIn;
  lang: Lang;
  onReview: (id: string, input: { coachResponse: string; programmeAdjustment: boolean; nutritionAdjustment: boolean; followUp: boolean; nextPriority: string }) => void;
  onClose: () => void;
}) {
  const t = copy[lang];
  const [response, setResponse] = useState(checkIn.coachResponse ?? "");
  const [flags, setFlags] = useState({ programme: !!checkIn.programmeAdjustment, nutrition: !!checkIn.nutritionAdjustment, followUp: !!checkIn.followUp });
  const [priority, setPriority] = useState(checkIn.nextPriority ?? "");
  const [error, setError] = useState<string | null>(null);

  const submitted = checkIn.overall != null;

  const send = () => {
    if (!response.trim()) {
      setError(t.required);
      return;
    }
    onReview(checkIn.id, {
      coachResponse: response,
      programmeAdjustment: flags.programme,
      nutritionAdjustment: flags.nutrition,
      followUp: flags.followUp,
      nextPriority: priority,
    });
    toast(t.feedbackSent, undefined, "success");
    onClose();
  };

  return (
    <div className="space-y-6">
      {submitted ? (
        <>
          <div className="grid grid-cols-3 gap-2 text-center">
            <Score label={t.overall} value={checkIn.overall} />
            <Score label={t.nutrition} value={checkIn.nutrition} />
            <Score label={t.energy} value={checkIn.energy} />
            <Score label={t.sleep} value={checkIn.sleep} />
            <Score label={t.stress} value={checkIn.stress} />
            <Score label={t.workouts} value={checkIn.workoutsCompleted} />
          </div>
          {checkIn.wentWell && <Answer label={t.wentWell} text={checkIn.wentWell} />}
          {checkIn.challenge && <Answer label={t.challenge} text={checkIn.challenge} />}
          {checkIn.changes && <Answer label={t.changes} text={checkIn.changes} />}
          {checkIn.discomfort === "Yes" && checkIn.discomfortDetail && (
            <Answer label={t.discomfort} text={checkIn.discomfortDetail} />
          )}
        </>
      ) : (
        <p className="rounded-md border border-dashed border-line p-4 text-sm text-muted">
          {t.notSubmitted} ({checkIn.weekLabel}).
        </p>
      )}

      <div className="space-y-4 border-t border-line pt-5">
        <Field label={t.coachResponse} error={error ?? undefined}>
          <TextArea rows={4} value={response} onChange={(e) => setResponse(e.target.value)} placeholder={t.feedbackPlaceholder} />
        </Field>
        <div className="space-y-2">
          {[
            { key: "programme", label: t.programmeAdjust },
            { key: "nutrition", label: t.nutritionAdjust },
            { key: "followUp", label: t.followUp },
          ].map((f) => (
            <label key={f.key} className="flex cursor-pointer items-center gap-2.5 text-sm">
              <input
                type="checkbox"
                checked={flags[f.key as keyof typeof flags]}
                onChange={(e) => setFlags({ ...flags, [f.key]: e.target.checked })}
                className="size-4 accent-[var(--accent)]"
              />
              {f.label}
            </label>
          ))}
        </div>
        <Field label={t.nextPriority} optional>
          <TextInput value={priority} onChange={(e) => setPriority(e.target.value)} placeholder={t.priorityPlaceholder} />
        </Field>
        <button onClick={send} className="btn btn-primary w-full">{t.sendFeedback}</button>
      </div>
    </div>
  );
}

function Score({ label, value }: { label: string; value?: number | string }) {
  return (
    <div className="rounded-md border border-line py-2.5">
      <p className="tnum text-lg font-bold">{value ?? "—"}</p>
      <p className="text-[0.58rem] uppercase tracking-wide text-muted">{label}</p>
    </div>
  );
}
function Answer({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="text-[0.62rem] font-semibold uppercase tracking-wide text-faint">{label}</p>
      <p className="mt-0.5 text-sm">{text}</p>
    </div>
  );
}
