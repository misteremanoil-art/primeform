import { cn } from "@/lib/utils";

/**
 * Training Halo — a large translucent ring that fuses a weight plate, a
 * progress ring and studio light. Cream/gold in light, smoked glass with an
 * orange rim light in dark. Never a literal illustration. Reused in the hero,
 * the loader and the progress section.
 */
export function TrainingHalo({
  size = 460,
  className,
  children,
  label,
  value,
  clock = false,
}: {
  size?: number;
  className?: string;
  children?: React.ReactNode;
  label?: string;
  value?: string;
  /** Spin the ticked ring like a fast clock (5 clock-seconds per real second). */
  clock?: boolean;
}) {
  return (
    <div
      className={cn("relative grid place-items-center", className)}
      style={{ width: size, height: size }}
      aria-hidden={!label}
    >
      {/* Soft studio-light bloom */}
      <div
        className="absolute inset-[6%] rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle at 40% 30%, var(--halo-fill), transparent 62%)",
        }}
      />

      {/* Rim + ticks (spins as a clock when enabled) */}
      <svg
        viewBox="0 0 100 100"
        className={cn("absolute inset-0 size-full", clock && "clock-spin")}
      >
        <circle cx="50" cy="50" r="47" fill="none" stroke="var(--halo-rim)" strokeWidth="0.7" opacity="0.65" />
        <circle cx="50" cy="50" r="43.5" fill="none" stroke="var(--glass-border)" strokeWidth="0.5" />
        <circle
          cx="50"
          cy="50"
          r="47"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeDasharray="295"
          strokeDashoffset="80"
          transform="rotate(-90 50 50)"
          opacity="0.8"
        />
        {Array.from({ length: 60 }).map((_, i) => {
          const a = (i / 60) * Math.PI * 2;
          const major = i % 5 === 0;
          const inner = major ? 39 : 40.5;
          const outer = 42.5;
          const r = (v: number) => v.toFixed(2);
          return (
            <line
              key={i}
              x1={r(50 + Math.cos(a) * inner)}
              y1={r(50 + Math.sin(a) * inner)}
              x2={r(50 + Math.cos(a) * outer)}
              y2={r(50 + Math.sin(a) * outer)}
              stroke="var(--muted)"
              strokeWidth={major ? 0.5 : 0.3}
              opacity={major ? 0.4 : 0.22}
            />
          );
        })}
      </svg>

      {/* Inner glass disc */}
      <div className="glass glass-air absolute inset-[14%] rounded-full" />

      {/* Centre content */}
      <div className="relative z-10 grid place-items-center text-center">
        {children ??
          (value && (
            <div>
              <span className="tnum block font-heading text-5xl font-bold">{value}</span>
              {label && (
                <span className="mt-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                  {label}
                </span>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
