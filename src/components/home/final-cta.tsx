import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";
import { TrainingHalo } from "@/components/fitness/training-halo";

export function FinalCta() {
  return (
    <section className="container-p pb-20">
      <Reveal>
        <GlassCard
          variant="standard"
          className="relative overflow-hidden rounded-section p-8 text-center sm:p-14"
        >
          {/* Abstract light + glass composition */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(60% 80% at 50% 0%, var(--glow-orange), transparent 60%)",
            }}
          />
          <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 opacity-40">
            <TrainingHalo size={280} />
          </div>

          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-[clamp(1.9rem,4.5vw,3rem)] leading-[1.08]">
              A better plan starts with a better understanding of where you are now.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
              Complete the short application and tell us what you are working towards.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/apply" className="btn btn-primary">
                Apply for Coaching
                <ArrowRight className="size-4" strokeWidth={2} />
              </Link>
              <Link href="/calculator" className="btn btn-secondary">
                Calculate Your Daily Calories
              </Link>
            </div>
          </div>
        </GlassCard>
      </Reveal>
    </section>
  );
}
