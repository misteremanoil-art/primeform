import { cn } from "@/lib/utils";

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

// Semantic mapping — consistent meaning across both themes.
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
  const t = tone ?? statusTone[status] ?? "muted";
  return (
    <span className={cn("pill", toneClass[t], className)}>
      {dot && <span className={cn("size-1.5 rounded-full", dotColor[t])} />}
      {status}
    </span>
  );
}
