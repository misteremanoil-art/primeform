"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { DemoDisclosure } from "@/components/fitness/demo-disclosure";
import { SectionHeader } from "./section-header";
import { ResultCard } from "./result-card";
import { caseStudies } from "@/lib/content/case-studies";
import { useI18n } from "@/lib/i18n";

const copy = {
  en: {
    eyebrow: "Client journeys",
    title: "Progress measured beyond a before-and-after photo.",
    body: "Every client starts from a different place. The goal is not to chase the fastest possible change. It is to build progress that can be repeated and maintained.",
    cta: "View All Demo Results",
    disclaimer: "Names, images and data shown in this demo are fictional.",
  },
  ro: {
    eyebrow: "Parcursuri ale clienților",
    title: "Progres măsurat dincolo de o fotografie înainte și după.",
    body: "Fiecare client pornește dintr-un punct diferit. Scopul nu este să urmărim cea mai rapidă schimbare posibilă, ci să construim un progres care poate fi repetat și menținut.",
    cta: "Vezi toate rezultatele demo",
    disclaimer: "Numele, imaginile și datele afișate în acest demo sunt fictive.",
  },
} as const;

export function ResultsSection() {
  const { lang } = useI18n();
  const t = copy[lang];

  return (
    <section className="container-p section">
      <SectionHeader eyebrow={t.eyebrow} title={t.title}>
        {t.body}
      </SectionHeader>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {caseStudies.map((s, i) => (
          <Reveal key={s.slug} delay={i * 0.08}>
            <ResultCard study={s} />
          </Reveal>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/results" className="btn btn-secondary">
          {t.cta}
          <ArrowRight className="size-4" strokeWidth={2} />
        </Link>
        <DemoDisclosure>{t.disclaimer}</DemoDisclosure>
      </div>
    </section>
  );
}
