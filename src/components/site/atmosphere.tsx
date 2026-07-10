/**
 * Fixed warm atmospheric backdrop shared by every surface.
 * Diffuse orange glow + subtle gold accent + near-invisible grain.
 * Dark mode reads as an espresso base with an orange glow and soft vignette.
 * Pure CSS — colours come from theme variables, so it cross-fades for free.
 */
export function Atmosphere() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 82% 8%, var(--glow-orange), transparent 55%)," +
            "radial-gradient(90% 70% at 8% 100%, var(--glow-gold), transparent 60%)," +
            "linear-gradient(180deg, var(--bg) 0%, var(--bg-2) 100%)",
        }}
      />
      {/* Dark-mode vignette */}
      <div
        className="absolute inset-0 dark:opacity-100 opacity-0 transition-opacity"
        style={{
          background:
            "radial-gradient(130% 100% at 50% 40%, transparent 55%, rgba(0,0,0,0.42) 100%)",
        }}
      />
      {/* Grain */}
      <div className="grain absolute inset-0 mix-blend-soft-light" />
    </div>
  );
}
