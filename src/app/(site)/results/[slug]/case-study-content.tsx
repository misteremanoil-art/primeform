"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import type { CaseStudy } from "@/lib/content/case-studies";
import { CoachPortrait } from "@/components/home/coach-portrait";
import { BarbellTimeline } from "@/components/fitness/barbell-timeline";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";
import { DemoDisclosure } from "@/components/fitness/demo-disclosure";
import { useI18n } from "@/lib/i18n";

const copy = {
  en: {
    allResults: "All results",
    startingSituation: "Starting situation",
    obstacles: "Main obstacles",
    approach: "Coaching approach",
    programme: "Programme structure",
    lessons: "Lessons from the process",
    timeline: "Progress timeline",
    relatedOption: "Related coaching option",
    exploreOption: "Explore this option",
    apply: "Apply for Coaching",
    disclaimer: (name: string) =>
      `${name} is a fictional client. Names, images and data are for demonstration only.`,
  },
  ro: {
    allResults: "Toate rezultatele",
    startingSituation: "Situația inițială",
    obstacles: "Principalele obstacole",
    approach: "Abordarea de coaching",
    programme: "Structura programului",
    lessons: "Lecții din proces",
    timeline: "Cronologia progresului",
    relatedOption: "Opțiune de coaching asociată",
    exploreOption: "Explorează această opțiune",
    apply: "Aplică pentru coaching",
    disclaimer: (name: string) =>
      `${name} este un client fictiv. Numele, imaginile și datele au doar scop demonstrativ.`,
  },
} as const;

export function CaseStudyContent({ study }: { study: CaseStudy }) {
  const { lang } = useI18n();
  const t = copy[lang];

  return (
    <article className="container-p section">
      <Link
        href="/results"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-ink"
      >
        <ArrowLeft className="size-4" strokeWidth={2} />
        {t.allResults}
      </Link>

      {/* Header */}
      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_0.8fr]">
        <Reveal>
          <p className="eyebrow text-accent">{study.focus[lang]}</p>
          <h1 className="mt-3 text-[clamp(2.4rem,6vw,4rem)] leading-[1.04]">
            {study.name} · {study.duration[lang]}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            {study.profile[lang]}
          </p>
          <blockquote className="mt-6 border-l-2 border-accent/50 pl-4 text-lg italic leading-relaxed">
            “{study.quote[lang]}”
          </blockquote>
        </Reveal>
        <Reveal delay={0.08}>
          {/* PHOTO: transformation composition, warm grading — see VISUAL_DIRECTION §32 */}
          <CoachPortrait rounded="rounded-hero" className="aspect-[4/5] w-full" />
        </Reveal>
      </div>

      {/* Key metrics */}
      <Reveal className="mt-12">
        <div className="grid gap-4 sm:grid-cols-3">
          {study.metrics.map((m) => (
            <GlassCard key={m.label.en} variant="solid" className="p-6">
              <p className="tnum font-heading text-4xl font-bold">{m.value}</p>
              <p className="mt-1 text-sm text-muted">{m.label[lang]}</p>
            </GlassCard>
          ))}
        </div>
      </Reveal>

      {/* Body */}
      <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-10">
          <Section title={t.startingSituation}>
            <p className="text-muted">{study.startingSituation[lang]}</p>
          </Section>
          <Section title={t.obstacles}>
            <ul className="space-y-2.5">
              {study.obstacles.map((o) => (
                <li key={o.en} className="flex items-start gap-2.5 text-muted">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-clay" />
                  {o[lang]}
                </li>
              ))}
            </ul>
          </Section>
          <Section title={t.approach}>
            <p className="text-muted">{study.approach[lang]}</p>
          </Section>
          <Section title={t.programme}>
            <p className="font-medium">{study.programme[lang]}</p>
          </Section>
          <Section title={t.lessons}>
            <ul className="space-y-2.5">
              {study.lessons.map((l) => (
                <li key={l.en} className="flex items-start gap-2.5">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-olive/15 text-olive">
                    <Check className="size-3" strokeWidth={2.5} />
                  </span>
                  {l[lang]}
                </li>
              ))}
            </ul>
          </Section>
        </div>

        <div className="space-y-8">
          <Section title={t.timeline}>
            <BarbellTimeline
              items={study.timeline.map((tl) => ({
                marker: tl.marker[lang],
                title: "",
                detail: tl.detail[lang],
              }))}
            />
          </Section>
          <GlassCard variant="solid" className="p-6">
            <p className="eyebrow">{t.relatedOption}</p>
            <p className="mt-2 text-lg font-bold">{study.relatedService[lang]}</p>
            <Link
              href={study.relatedHref}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-ink"
            >
              {t.exploreOption}
              <ArrowRight className="size-4" strokeWidth={2} />
            </Link>
          </GlassCard>
        </div>
      </div>

      <DemoDisclosure className="mt-12">
        {t.disclaimer(study.name)}
      </DemoDisclosure>

      <div className="mt-10">
        <Link href="/apply" className="btn btn-primary">
          {t.apply}
          <ArrowRight className="size-4" strokeWidth={2} />
        </Link>
      </div>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="mt-3 leading-relaxed">{children}</div>
    </section>
  );
}
