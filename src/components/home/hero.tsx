"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Reveal, RevealGroup, revealChild } from "@/components/ui/reveal";
import { motion } from "framer-motion";
import { HeroVisual, HeroVisualMobile } from "./hero-visual";
import { useI18n } from "@/lib/i18n";

const trustIndicators = [
  { en: "Personalised weekly programming", ro: "Programare săptămânală personalizată" },
  { en: "Direct coach support", ro: "Sprijin direct de la antrenor" },
  { en: "Progress tracked in one place", ro: "Progres urmărit într-un singur loc" },
  { en: "Online and in-person options", ro: "Opțiuni online și față în față" },
] as const;

const copy = {
  en: {
    eyebrow: "Personalised Fitness Coaching",
    heading: "Stop guessing. Start training with a plan built around you.",
    lead: "Personalised training, flexible nutrition and weekly accountability for people who are ready to make consistent progress.",
    ctaPrimary: "Apply for Coaching",
    ctaSecondary: "Explore the Client Portal",
    microcopy: "No extreme diets. No generic templates. No unnecessary complexity.",
  },
  ro: {
    eyebrow: "Coaching fitness personalizat",
    heading: "Gata cu presupunerile. Începe să te antrenezi cu un plan construit pentru tine.",
    lead: "Antrenament personalizat, nutriție flexibilă și responsabilizare săptămânală, pentru cei care sunt pregătiți să facă progres constant.",
    ctaPrimary: "Aplică pentru coaching",
    ctaSecondary: "Explorează portalul clientului",
    microcopy: "Fără diete extreme. Fără șabloane generice. Fără complicații inutile.",
  },
} as const;

export function Hero() {
  const { lang } = useI18n();
  const t = copy[lang];

  return (
    <section className="container-p relative pb-8 pt-6 lg:pb-16 lg:pt-10">
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        {/* Copy */}
        <div>
          <RevealGroup className="max-w-xl">
            <motion.p variants={revealChild} className="eyebrow">
              {t.eyebrow}
            </motion.p>
            <motion.h1
              variants={revealChild}
              className="mt-4 text-[clamp(2.85rem,7vw,4.6rem)] leading-[1.02]"
            >
              {t.heading}
            </motion.h1>
            <motion.p
              variants={revealChild}
              className="mt-6 max-w-lg text-lg leading-relaxed text-muted"
            >
              {t.lead}
            </motion.p>
            <motion.div
              variants={revealChild}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Link href="/apply" className="btn btn-primary">
                {t.ctaPrimary}
                <ArrowRight className="size-4" strokeWidth={2} />
              </Link>
              <Link href="/login" className="btn btn-secondary">
                {t.ctaSecondary}
              </Link>
            </motion.div>
            <motion.p variants={revealChild} className="mt-5 text-sm text-faint">
              {t.microcopy}
            </motion.p>
          </RevealGroup>

          <Reveal delay={0.2} className="mt-9 grid max-w-lg grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
            {trustIndicators.map((item) => (
              <div key={item.en} className="flex items-center gap-2.5 text-sm text-muted">
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-olive/15 text-olive">
                  <Check className="size-3" strokeWidth={2.5} />
                </span>
                {item[lang]}
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
