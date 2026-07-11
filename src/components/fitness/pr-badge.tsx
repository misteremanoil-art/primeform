"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

const copy = {
  en: { title: "New Personal Record" },
  ro: { title: "Record personal nou" },
} as const;

/**
 * Gold-reflective "NEW PERSONAL RECORD" card with a single gold pulse on
 * mount (no confetti). Respects reduced motion.
 */
export function PRBadge({
  exercise,
  detail,
  className,
}: {
  exercise: string;
  detail: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const { lang } = useI18n();
  return (
    <motion.div
      initial={reduce ? false : { boxShadow: "0 0 0 0 rgba(233,188,106,0)" }}
      animate={
        reduce
          ? undefined
          : {
              boxShadow: [
                "0 0 0 0 rgba(233,188,106,0.0)",
                "0 0 0 6px rgba(233,188,106,0.18)",
                "0 0 0 0 rgba(233,188,106,0.0)",
              ],
            }
      }
      transition={{ duration: 1.4, ease: "easeOut" }}
      className={cn(
        "relative overflow-hidden rounded-card border border-gold/40 p-4",
        className,
      )}
      style={{
        background:
          "linear-gradient(135deg, color-mix(in oklab, var(--gold) 22%, var(--surface)) 0%, var(--surface) 55%)",
      }}
    >
      {/* Reflective sweep */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-y-8 -left-1/3 w-1/3 rotate-12 opacity-40"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
        }}
      />
      <div className="relative flex items-center gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gold/20 text-[color:var(--gold)]">
          <Trophy className="size-4.5" strokeWidth={1.8} />
        </span>
        <div className="min-w-0">
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[color:var(--gold)]">
            {copy[lang].title}
          </p>
          <p className="mt-0.5 truncate text-sm font-semibold text-ink">{exercise}</p>
          <p className="tnum text-xs text-muted">{detail}</p>
        </div>
      </div>
    </motion.div>
  );
}
