import { cn } from "@/lib/utils";

/**
 * Abstract coach composition — NO real photo. Warm layered gradients, grain,
 * soft shadow and a simple silhouette treatment, composed so real photography
 * can drop in later.
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

      {/* Abstract silhouette — head + shoulders */}
      <svg
        viewBox="0 0 200 260"
        className="absolute inset-x-0 bottom-0 h-[86%] w-full"
        preserveAspectRatio="xMidYMax meet"
        aria-hidden
      >
        <defs>
          <linearGradient id="sil" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="color-mix(in oklab, var(--ink) 62%, transparent)" />
            <stop offset="100%" stopColor="color-mix(in oklab, var(--ink) 30%, transparent)" />
          </linearGradient>
        </defs>
        <path
          d="M100 60c22 0 38 17 38 42 0 16-7 27-7 33 0 5 6 7 18 11 30 10 41 26 45 52 3 20 4 40 4 62H2c0-22 1-42 4-62 4-26 15-42 45-52 12-4 18-6 18-11 0-6-7-17-7-33 0-25 16-42 38-42Z"
          fill="url(#sil)"
        />
        {/* Rim light on one edge */}
        <path
          d="M100 60c22 0 38 17 38 42 0 16-7 27-7 33"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
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
