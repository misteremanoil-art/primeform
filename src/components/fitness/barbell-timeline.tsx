import { cn } from "@/lib/utils";

export interface TimelineItem {
  marker: string; // e.g. "Week 0" or "0"
  title: string;
  detail: string;
}

/**
 * Programme timeline — a central bar with circular milestones inspired by the
 * collars of an olympic barbell.
 */
export function BarbellTimeline({
  items,
  className,
}: {
  items: TimelineItem[];
  className?: string;
}) {
  return (
    <ol className={cn("relative", className)}>
      {/* Central bar */}
      <span
        aria-hidden
        className="absolute bottom-4 left-[1.15rem] top-4 w-0.5 rounded-full bg-gradient-to-b from-accent/60 via-line-strong to-line sm:left-6"
      />
      {items.map((item, i) => (
        <li key={i} className="relative flex gap-5 pb-8 last:pb-0 sm:gap-6">
          {/* Collar / milestone */}
          <span className="relative z-10 grid size-9 shrink-0 place-items-center rounded-full border-2 border-accent/40 bg-surface sm:size-12">
            <span className="grid size-4 place-items-center rounded-full bg-accent sm:size-5">
              <span className="size-1.5 rounded-full bg-accent-ink/70" />
            </span>
          </span>
          <div className="pt-1 sm:pt-2.5">
            <p className="eyebrow text-accent">{item.marker}</p>
            {item.title && (
              <h3 className="mt-1 text-lg font-bold sm:text-xl">{item.title}</h3>
            )}
            <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted">
              {item.detail}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
