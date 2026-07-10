import { cn } from "@/lib/utils";

/**
 * Abstract coach composition — NO real photo. Layered gradients, grain, soft
 * shadow and a simple bodybuilder silhouette (front double-biceps flex),
 * composed so real photography can drop in later.
 */
export function CoachPortrait({
  className,
  rounded = "rounded-full",
}: {
  className?: string;
  rounded?: string;
}) {
  return (
    <div
      className={cn("relative overflow-hidden", rounded, className)}
      style={{
        background:
          "radial-gradient(120% 90% at 50% 8%, color-mix(in oklab, var(--accent) 30%, transparent), transparent 55%)," +
          "linear-gradient(180deg, color-mix(in oklab, var(--gold) 22%, var(--surface)) 0%, var(--surface-2) 48%, var(--bg-2) 100%)",
      }}
    >
      {/* PHOTO: cinematic coach portrait, warm side light — see VISUAL_DIRECTION §32 */}

      {/* Simple bodybuilder silhouette — front double-biceps flex */}
      <svg
        viewBox="0 0 240 240"
        className="absolute inset-x-0 bottom-0 h-[94%] w-full"
        preserveAspectRatio="xMidYMax meet"
        aria-hidden
      >
        <defs>
          <linearGradient id="sil" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="color-mix(in oklab, var(--ink) 62%, transparent)" />
            <stop offset="100%" stopColor="color-mix(in oklab, var(--ink) 30%, transparent)" />
          </linearGradient>
        </defs>
        {/* Head */}
        <circle cx="120" cy="42" r="22" fill="url(#sil)" />
        {/* Traps, flexed arms, lats and torso */}
        <path
          d="M132 70 L162 66 Q186 48 206 66 Q211 42 195 22 L175 26 Q189 58 184 74 Q170 88 152 98 Q172 130 138 206 L132 214 L108 214 L102 206 Q68 130 88 98 Q70 88 56 74 Q51 58 65 26 L45 22 Q29 42 34 66 Q54 48 78 66 L108 70 Z"
          fill="url(#sil)"
        />
        {/* Rim light along the raised right arm */}
        <path
          d="M162 66 Q186 48 206 66 Q211 42 195 22"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.55"
        />
      </svg>

      {/* Warm side-light bloom */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 78% 24%, color-mix(in oklab, var(--accent) 22%, transparent), transparent 60%)",
        }}
      />
      <div className="grain absolute inset-0 mix-blend-soft-light" />
    </div>
  );
}
