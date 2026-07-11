"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";
import { DemoDisclosure } from "@/components/fitness/demo-disclosure";
import { CoachPortrait } from "./coach-portrait";
import { SectionHeader } from "./section-header";
import { useI18n } from "@/lib/i18n";

const copy = {
  en: {
    years: "8 yrs",
    yearsLabel: "coaching experience",
    clientsLabel: "client programmes",
    eyebrow: "Meet your coach",
    title: "Coaching should make fitness feel clearer, not more complicated.",
    lead: "PRIMEFORM was created for people who are tired of jumping between programmes, diets and conflicting advice. The goal is simple: understand the client, create a realistic plan and use consistent feedback to improve it over time.",
    body: "Coaching is not about forcing every client into the same routine. It is about building the right level of structure for the person in front of you.",
    cta: "Meet Daniel",
    disclosure: "Coach identity, qualifications and experience are fictional.",
  },
  ro: {
    years: "8 ani",
    yearsLabel: "experiență în coaching",
    clientsLabel: "programe pentru clienți",
    eyebrow: "Cunoaște-ți antrenorul",
    title: "Coaching-ul ar trebui să facă fitness-ul mai clar, nu mai complicat.",
    lead: "PRIMEFORM a fost creat pentru oamenii care s-au săturat să sară de la un program la altul, de la o dietă la alta și de la un sfat contradictoriu la altul. Scopul este simplu: să înțelegem clientul, să creăm un plan realist și să folosim feedbackul constant pentru a-l îmbunătăți în timp.",
    body: "Coaching-ul nu înseamnă să forțezi fiecare client în aceeași rutină. Înseamnă să construiești nivelul potrivit de structură pentru persoana din fața ta.",
    cta: "Cunoaște-l pe Daniel",
    disclosure: "Identitatea, calificările și experiența antrenorului sunt fictive.",
  },
} as const;

export function CoachSection() {
  const { lang } = useI18n();
  const t = copy[lang];

  return (
    <section className="container-p section">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Visual */}
        <Reveal className="relative order-last lg:order-first">
          <div className="mx-auto max-w-[420px]">
            {/* PHOTO: editorial coach portrait, warm side light — see VISUAL_DIRECTION §32 */}
            <CoachPortrait rounded="rounded-hero" className="aspect-[4/5] w-full" />
          </div>
          <GlassCard
            variant="air"
            className="absolute -left-2 top-10 hidden rounded-md p-4 sm:block"
          >
            <p className="tnum font-heading text-2xl font-bold">{t.years}</p>
            <p className="text-xs text-muted">{t.yearsLabel}</p>
          </GlassCard>
          <GlassCard
            variant="air"
            className="absolute -right-2 bottom-10 hidden rounded-md p-4 sm:block"
          >
            <p className="tnum font-heading text-2xl font-bold">300+</p>
            <p className="text-xs text-muted">{t.clientsLabel}</p>
          </GlassCard>
        </Reveal>

        {/* Copy */}
        <div>
          <SectionHeader
            eyebrow={t.eyebrow}
            title={t.title}
          >
            {t.lead}
          </SectionHeader>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
              {t.body}
            </p>
            <Link href="/about" className="btn btn-primary mt-8">
              {t.cta}
              <ArrowRight className="size-4" strokeWidth={2} />
            </Link>
            <DemoDisclosure className="mt-5">
              {t.disclosure}
            </DemoDisclosure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
