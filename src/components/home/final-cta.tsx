"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";
import { TrainingHalo } from "@/components/fitness/training-halo";
import { useI18n } from "@/lib/i18n";

const copy = {
  en: {
    heading: "A better plan starts with a better understanding of where you are now.",
    lead: "Complete the short application and tell us what you are working towards.",
    ctaPrimary: "Apply for Coaching",
    ctaSecondary: "Calculate Your Daily Calories",
  },
  ro: {
    heading: "Un plan mai bun începe cu o înțelegere mai bună a locului în care te afli acum.",
    lead: "Completează aplicația scurtă și spune-ne către ce obiectiv lucrezi.",
    ctaPrimary: "Aplică pentru coaching",
    ctaSecondary: "Calculează-ți caloriile zilnice",
  },
} as const;

export function FinalCta() {
  const { lang } = useI18n();
  const t = copy[lang];

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
              {t.heading}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
              {t.lead}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/apply" className="btn btn-primary">
                {t.ctaPrimary}
                <ArrowRight className="size-4" strokeWidth={2} />
              </Link>
              <Link href="/calculator" className="btn btn-secondary">
                {t.ctaSecondary}
              </Link>
            </div>
          </div>
        </GlassCard>
      </Reveal>
    </section>
  );
}
