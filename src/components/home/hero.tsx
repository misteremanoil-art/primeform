"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Reveal, RevealGroup, revealChild } from "@/components/ui/reveal";
import { motion } from "framer-motion";
import { FluidParticlesBackground } from "@/components/ui/fluid-particles-background";
import { HeroVisual, HeroVisualMobile } from "./hero-visual";

const trustIndicators = [
  "Personalised weekly programming",
  "Direct coach support",
  "Progress tracked in one place",
  "Online and in-person options",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-8 pt-6 lg:pb-16 lg:pt-10">
      {/* Fluid particle field — drifts behind the hero, over the warm atmosphere */}
      <FluidParticlesBackground
        particleCount={550}
        noiseIntensity={0.009}
        speed={4.5}
        flowSpeed={0.0035}
        particleSize={{ min: 0.6, max: 2.4 }}
        className="pointer-events-none absolute inset-0 !h-full bg-transparent"
      />

      <div className="container-p relative z-10 grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        {/* Copy */}
        <div>
          <RevealGroup className="max-w-xl">
            <motion.p variants={revealChild} className="eyebrow">
              Personalised Fitness Coaching
            </motion.p>
            <motion.h1
              variants={revealChild}
              className="mt-4 text-[clamp(2.85rem,7vw,4.6rem)] leading-[1.02]"
            >
              Stop guessing. Start training with a plan built around you.
            </motion.h1>
            <motion.p
              variants={revealChild}
              className="mt-6 max-w-lg text-lg leading-relaxed text-muted"
            >
              Personalised training, flexible nutrition and weekly accountability for
              people who are ready to make consistent progress.
            </motion.p>
            <motion.div
              variants={revealChild}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Link href="/apply" className="btn btn-primary">
                Apply for Coaching
                <ArrowRight className="size-4" strokeWidth={2} />
              </Link>
              <Link href="/login" className="btn btn-secondary">
                Explore the Client Portal
              </Link>
            </motion.div>
            <motion.p variants={revealChild} className="mt-5 text-sm text-faint">
              No extreme diets. No generic templates. No unnecessary complexity.
            </motion.p>
          </RevealGroup>

          <Reveal delay={0.2} className="mt-9 grid max-w-lg grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
            {trustIndicators.map((t) => (
              <div key={t} className="flex items-center gap-2.5 text-sm text-muted">
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-olive/15 text-olive">
                  <Check className="size-3" strokeWidth={2.5} />
                </span>
                {t}
              </div>
            ))}
          </Reveal>
        </div>

        {/* Visual */}
        <HeroVisual />
        <HeroVisualMobile />
      </div>
    </section>
  );
}
