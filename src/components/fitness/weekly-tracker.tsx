import { cn } from "@/lib/utils";

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

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
  return (
    <div className={cn("inline-flex flex-col gap-1.5", className)}>
      {showLabels && (
        <div className="flex gap-2.5">
          {DAYS.map((d, i) => (
            <span
              key={i}
              className="w-3.5 text-center text-[0.62rem] font-semibold uppercase text-faint"
            >
              {d}
            </span>
          ))}
        </div>
      )}
      <div className="flex gap-2.5" role="list" aria-label="Weekly workout consistency">
        {days.map((done, i) => {
          const active = i === activeIndex;
          return (
            <span
              key={i}
              role="listitem"
              aria-label={done ? "completed" : active ? "active" : "upcoming"}
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
