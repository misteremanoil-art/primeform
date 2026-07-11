"use client";

import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

const DAYS = {
  en: ["M", "T", "W", "T", "F", "S", "S"],
  ro: ["L", "M", "M", "J", "V", "S", "D"],
} as const;

const copy = {
  en: { consistency: "Weekly workout consistency", completed: "completed", active: "active", upcoming: "upcoming" },
  ro: { consistency: "Constanța antrenamentelor săptămânale", completed: "finalizat", active: "activ", upcoming: "urmează" },
} as const;

/**
 * Weekly consistency dot row. Olive = completed, orange = active/today,
 * faint = upcoming. Readable at a glance.
 */
export function WeeklyTracker({
  days,
  activeIndex,
  showLabels = true,
  className,
}: {
  days: boolean[]; // length 7
  activeIndex?: number;
  showLabels?: boolean;
  className?: string;
}) {
  const { lang } = useI18n();
  const t = copy[lang];

  return (
    <div className={cn("inline-flex flex-col gap-1.5", className)}>
      {showLabels && (
        <div className="flex gap-2.5">
          {DAYS[lang].map((d, i) => (
            <span
              key={i}
              className="w-3.5 text-center text-[0.62rem] font-semibold uppercase text-faint"
            >
              {d}
            </span>
          ))}
        </div>
      )}
      <div className="flex gap-2.5" role="list" aria-label={t.consistency}>
        {days.map((done, i) => {
          const active = i === activeIndex;
          return (
            <span
              key={i}
              role="listitem"
              aria-label={done ? t.completed : active ? t.active : t.upcoming}
              className={cn(
                "size-3.5 rounded-full transition-colors",
                done && "bg-olive",
                !done && active && "bg-accent ring-2 ring-accent/25",
                !done && !active && "border border-line bg-transparent",
              )}
            />
          );
        })}
      </div>
    </div>
  );
}
