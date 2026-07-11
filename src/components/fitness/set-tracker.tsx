"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

const copy = {
  en: { set: "Set", progress: "Set progress" },
  ro: { set: "Seria", progress: "Progresul seriilor" },
} as const;

/**
 * SET 01–04 capsules: olive done, orange active, transparent upcoming.
 */
export function SetTracker({
  total,
  done,
  active,
  className,
}: {
  total: number;
  done: number;
  active?: number; // index of the active set (0-based)
  className?: string;
}) {
  const { lang } = useI18n();
  const t = copy[lang];

  return (
    <div className={cn("flex flex-wrap gap-1.5", className)} role="list" aria-label={t.progress}>
      {Array.from({ length: total }).map((_, i) => {
        const isDone = i < done;
        const isActive = active === i || (active === undefined && i === done);
        return (
          <div
            key={i}
            role="listitem"
            className={cn(
              "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.66rem] font-semibold uppercase tracking-wide transition-colors",
              isDone && "border-transparent bg-olive/15 text-olive",
              !isDone && isActive && "border-accent/40 bg-accent/12 text-accent",
              !isDone && !isActive && "border-line text-faint",
            )}
          >
            {isDone ? (
              <Check className="size-3" strokeWidth={2.5} />
            ) : (
              <span
                className={cn(
                  "size-1.5 rounded-full",
                  isActive ? "bg-accent" : "bg-faint/50",
                )}
              />
            )}
            {t.set} {String(i + 1).padStart(2, "0")}
          </div>
        );
      })}
    </div>
  );
}
