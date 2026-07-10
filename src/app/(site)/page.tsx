import { GlassCard } from "@/components/ui/glass-card";

// Temporary foundation smoke-test home. Replaced by the full homepage in Phase 3.
export default function Home() {
  return (
    <section className="container-p section">
      <p className="eyebrow">Personalised Fitness Coaching</p>
      <h1 className="mt-4 max-w-3xl text-5xl sm:text-7xl">
        Stop guessing. Start training with a plan built around you.
      </h1>
      <p className="mt-6 max-w-xl text-lg text-muted">
        Foundation online — tokens, glass, store and shell are live. Signature
        components and full sections follow.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <GlassCard variant="air" className="p-6">
          <p className="eyebrow">Glass Air</p>
        </GlassCard>
        <GlassCard variant="standard" className="p-6">
          <p className="eyebrow">Glass Standard</p>
        </GlassCard>
        <GlassCard variant="solid" className="p-6">
          <p className="eyebrow">Solid Surface</p>
        </GlassCard>
      </div>
    </section>
  );
}
