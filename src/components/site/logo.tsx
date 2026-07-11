import { cn } from "@/lib/utils";

/**
 * PRIMEFORM mark — a weight-plate progress ring. Outer plate, a black
 * progress arc, fine tick marks and a metallic centre. Referenced discreetly,
 * never literal. Reused as the favicon.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("block", className)}
      role="img"
      aria-label="PRIMEFORM"
      fill="none"
    >
      <circle cx="24" cy="24" r="21" stroke="var(--gold)" strokeWidth="2" opacity="0.5" />
      <circle
        cx="24"
        cy="24"
        r="21"
        stroke="var(--accent)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeDasharray="132"
        strokeDashoffset="34"
        transform="rotate(-90 24 24)"
      />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        // Round to fixed precision so SSR and client serialise identical strings.
        const r = (v: number) => v.toFixed(3);
        return (
          <line
            key={i}
            x1={r(24 + Math.cos(a) * 16.5)}
            y1={r(24 + Math.sin(a) * 16.5)}
            x2={r(24 + Math.cos(a) * 18.5)}
            y2={r(24 + Math.sin(a) * 18.5)}
            stroke="var(--muted)"
            strokeWidth="1"
            opacity="0.5"
          />
        );
      })}
      <circle cx="24" cy="24" r="8.5" fill="var(--ink)" opacity="0.08" />
      <circle cx="24" cy="24" r="4" stroke="var(--ink)" strokeWidth="2" opacity="0.55" />
    </svg>
  );
}
