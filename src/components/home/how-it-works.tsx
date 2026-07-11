"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "./section-header";
import { useI18n } from "@/lib/i18n";

const steps = [
  {
    n: "01",
    title: { en: "Apply", ro: "Aplici" },
    body: {
      en: "Tell us about your goal, current routine, schedule and the challenges you have faced so far.",
      ro: "Ne spui despre obiectivul tău, rutina actuală, programul și provocările pe care le-ai întâmpinat până acum.",
    },
  },
  {
    n: "02",
    title: { en: "Speak with your coach", ro: "Vorbești cu antrenorul tău" },
    body: {
      en: "Book a consultation to discuss your situation and decide whether the programme is a good fit.",
      ro: "Programezi o consultație ca să discutați situația ta și să decideți dacă programul ți se potrivește.",
    },
  },
  {
    n: "03",
    title: { en: "Complete your assessment", ro: "Completezi evaluarea" },
    body: {
      en: "Share your training history, measurements, preferences and available equipment.",
      ro: "Ne împărtășești istoricul de antrenament, măsurătorile, preferințele și echipamentul disponibil.",
    },
  },
  {
    n: "04",
    title: { en: "Receive your plan", ro: "Primești planul" },
    body: {
      en: "Your first training week, nutrition targets and habits are added to your private coaching portal.",
      ro: "Prima ta săptămână de antrenament, obiectivele de nutriție și obiceiurile sunt adăugate în portalul tău privat de coaching.",
    },
  },
  {
    n: "05",
    title: { en: "Track and adjust", ro: "Urmărești și ajustezi" },
    body: {
      en: "Complete workouts, log progress and submit weekly check-ins so the plan can evolve with you.",
      ro: "Finalizezi antrenamentele, îți notezi progresul și trimiți check-in-uri săptămânale, ca planul să evolueze odată cu tine.",
    },
  },
];

const copy = {
  en: {
    eyebrow: "A clear process",
    title: "From application to your first week of training.",
    cta: "Start Your Application",
  },
  ro: {
    eyebrow: "Un proces clar",
    title: "De la aplicație până la prima ta săptămână de antrenament.",
    cta: "Începe aplicația",
  },
} as const;

export function HowItWorks() {
  const { lang } = useI18n();
  const t = copy[lang];

  return (
    <section id="how-it-works" className="scroll-mt-28 bg-bg-2/50">
      <div className="container-p section">
        <SectionHeader eyebrow={t.eyebrow} title={t.title} />

        <div className="mt-12 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06} className="relative">
              <span className="tnum font-heading text-4xl font-extrabold text-accent/25">
                {s.n}
              </span>
              <h3 className="mt-2 text-lg font-bold">{s.title[lang]}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.body[lang]}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-12">
          <Link href="/apply" className="btn btn-primary">
            {t.cta}
            <ArrowRight className="size-4" strokeWidth={2} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
