"use client";

import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";

type Tone = "accent" | "olive" | "clay" | "gold" | "danger" | "muted";

const toneClass: Record<Tone, string> = {
  accent: "bg-accent/12 text-accent border-accent/25",
  olive: "bg-olive/15 text-olive border-olive/25",
  clay: "bg-clay/15 text-clay border-clay/25",
  gold: "bg-gold/15 text-[color:var(--gold)] border-gold/30",
  danger: "bg-danger/12 text-danger border-danger/25",
  muted: "bg-ink/5 text-muted border-line",
};

const dotColor: Record<Tone, string> = {
  accent: "bg-accent",
  olive: "bg-olive",
  clay: "bg-clay",
  gold: "bg-gold",
  danger: "bg-danger",
  muted: "bg-faint",
};

// Semantic mapping — consistent meaning across both themes. Keyed on the
// canonical English status so callers can keep passing English values.
const statusTone: Record<string, Tone> = {
  // positive / done
  Won: "olive",
  Active: "olive",
  Completed: "olive",
  Reviewed: "olive",
  Submitted: "olive",
  // action / in-flight
  New: "accent",
  Booked: "accent",
  Scheduled: "accent",
  Qualified: "accent",
  "Needs Review": "accent",
  // attention
  "Needs Attention": "clay",
  Overdue: "clay",
  Contacted: "clay",
  Upcoming: "clay",
  Pending: "clay",
  Rescheduled: "clay",
  Paused: "muted",
  Archived: "muted",
  // critical
  Lost: "danger",
  Cancelled: "danger",
  "No Show": "danger",
};

// Localized display labels. Tone is still resolved from the English key above,
// so the colour semantics survive translation. Unknown statuses fall back to
// the raw string.
const statusLabel: Record<string, Record<Lang, string>> = {
  Won: { en: "Won", ro: "Câștigat" },
  Active: { en: "Active", ro: "Activ" },
  Completed: { en: "Completed", ro: "Finalizat" },
  Reviewed: { en: "Reviewed", ro: "Revizuit" },
  Submitted: { en: "Submitted", ro: "Trimis" },
  New: { en: "New", ro: "Nou" },
  Booked: { en: "Booked", ro: "Rezervat" },
  Scheduled: { en: "Scheduled", ro: "Programat" },
  Qualified: { en: "Qualified", ro: "Calificat" },
  "Needs Review": { en: "Needs Review", ro: "Necesită revizuire" },
  "Needs Attention": { en: "Needs Attention", ro: "Necesită atenție" },
  Overdue: { en: "Overdue", ro: "Întârziat" },
  Contacted: { en: "Contacted", ro: "Contactat" },
  Upcoming: { en: "Upcoming", ro: "Urmează" },
  Pending: { en: "Pending", ro: "În așteptare" },
  Rescheduled: { en: "Rescheduled", ro: "Reprogramat" },
  Paused: { en: "Paused", ro: "Pe pauză" },
  Archived: { en: "Archived", ro: "Arhivat" },
  Lost: { en: "Lost", ro: "Pierdut" },
  Cancelled: { en: "Cancelled", ro: "Anulat" },
  "No Show": { en: "No Show", ro: "Neprezentat" },
};

export function StatusPill({
  status,
  tone,
  className,
  dot = true,
}: {
  status: string;
  tone?: Tone;
  className?: string;
  dot?: boolean;
}) {
  const { lang } = useI18n();
  const t = tone ?? statusTone[status] ?? "muted";
  const label = statusLabel[status]?.[lang] ?? status;
  return (
    <span className={cn("pill", toneClass[t], className)}>
      {dot && <span className={cn("size-1.5 rounded-full", dotColor[t])} />}
      {label}
    </span>
  );
}
