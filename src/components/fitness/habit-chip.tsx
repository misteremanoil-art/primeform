import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const R = 15;
const CIRC = 2 * Math.PI * R;

/**
 * Compact habit chip with a small circular progress ring (steps, water,
 * protein, sleep, mobility).
 */
export function HabitChip({
  icon: Icon,
  label,
  value,
  target,
  unit,
  className,
  tone = "accent",
}: {
  icon: LucideIcon;
  label: string;
  value: number;
  target: number;
  unit?: string;
  className?: string;
  tone?: "accent" | "olive" | "gold";
}) {
  const pct = target > 0 ? Math.min(100, (value / target) * 100) : 0;
  const complete = value >= target && target > 0;
  const ringTone = complete ? "olive" : tone;
  const offset = CIRC * (1 - pct / 100);
  const fmt = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1));

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-md border border-line bg-surface/60 p-3",
        className,
      )}
    >
      <div className="relative grid size-11 shrink-0 place-items-center">
        <svg viewBox="0 0 40 40" className="size-full -rotate-90">
          <circle cx="20" cy="20" r={R} fill="none" stroke="var(--line-strong)" strokeWidth="3.5" opacity="0.5" />
          <circle
            cx="20"
            cy="20"
            r={R}
            fill="none"
            stroke={`var(--${ringTone})`}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={offset}
          />
        </svg>
        <Icon
          className={cn("absolute size-4", complete ? "text-olive" : "text-muted")}
          strokeWidth={1.8}
        />
      </div>
      <div className="min-w-0">
        <p className="text-[0.68rem] font-semibold uppercase tracking-wide text-muted">
          {label}
        </p>
        <p className="tnum text-sm font-semibold text-ink">
          {fmt(value)}
          <span className="text-muted"> / {fmt(target)}</span>
          {unit && <span className="ml-0.5 text-xs text-faint">{unit}</span>}
        </p>
      </div>
    </div>
  );
}
