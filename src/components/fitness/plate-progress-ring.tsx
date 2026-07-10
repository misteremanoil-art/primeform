"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const R = 40;
const CIRC = 2 * Math.PI * R;

/**
 * Weight-plate progress ring: thick arc, fine tick marks, metallic hub.
 * Fills once on first view. Used for workout completion / weekly progress.
 */
export function PlateProgressRing({
  value,
  size = 160,
  label,
  sublabel,
  className,
  strokeWidth = 9,
  tone = "accent",
}: {
  value: number; // 0–100
  size?: number;
  label?: string;
  sublabel?: string;
  className?: string;
  strokeWidth?: number;
  tone?: "accent" | "olive" | "gold";
}) {
  const reduce = useReducedMotion();
  const pct = Math.max(0, Math.min(100, value));
  const offset = CIRC * (1 - pct / 100);
  const stroke = `var(--${tone})`;

  const ticks = Array.from({ length: 32 }, (_, i) => {
    const a = (i / 32) * Math.PI * 2 - Math.PI / 2;
    const inner = 47;
    const outer = i % 4 === 0 ? 50 : 48.6;
    const r = (v: number) => v.toFixed(2);
    return {
      x1: r(50 + Math.cos(a) * inner),
      y1: r(50 + Math.sin(a) * inner),
      x2: r(50 + Math.cos(a) * outer),
      y2: r(50 + Math.sin(a) * outer),
      major: i % 4 === 0,
    };
  });

  return (
    <div
      className={cn("relative grid place-items-center", className)}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" className="size-full -rotate-90">
        <defs>
          <radialGradient id={`hub-${tone}`} cx="38%" cy="34%" r="70%">
            <stop offset="0%" stopColor="var(--surface-2)" />
            <stop offset="70%" stopColor="var(--surface)" />
            <stop offset="100%" stopColor="var(--bg-2)" />
          </radialGradient>
        </defs>

        {/* Ticks */}
        <g className="rotate-90" style={{ transformOrigin: "50px 50px" }}>
          {ticks.map((t, i) => (
            <line
              key={i}
              x1={t.x1}
              y1={t.y1}
              x2={t.x2}
              y2={t.y2}
              stroke="var(--muted)"
              strokeWidth={t.major ? 0.9 : 0.5}
              opacity={t.major ? 0.5 : 0.28}
            />
          ))}
        </g>

        {/* Track */}
        <circle
          cx="50"
          cy="50"
          r={R}
          fill="none"
          stroke="var(--line-strong)"
          strokeWidth={strokeWidth}
          opacity={0.5}
        />
        {/* Progress arc */}
        <motion.circle
          cx="50"
          cy="50"
          r={R}
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={CIRC}
          initial={{ strokeDashoffset: reduce ? offset : CIRC }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: reduce ? 0 : 1.3, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Metallic hub */}
        <circle cx="50" cy="50" r="27" fill={`url(#hub-${tone})`} stroke="var(--line)" strokeWidth="0.6" />
      </svg>

      {(label || sublabel) && (
        <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
          {label && (
            <div>
              <span className="tnum block font-heading text-2xl font-bold leading-none">
                {label}
              </span>
              {sublabel && (
                <span className="mt-1 block text-[0.62rem] font-semibold uppercase tracking-wider text-muted">
                  {sublabel}
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
