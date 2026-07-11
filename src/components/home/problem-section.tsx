"use client";

import { HelpCircle, TriangleAlert, Unplug } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "./section-header";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

const copy = {
  en: {
    eyebrow: "Why most plans fail",
    title: "You probably do not need more motivation. You need a system you can actually follow.",
    lead: "Most people are not failing because they are lazy. They are failing because their training changes every week, their nutrition feels impossible to maintain and nobody is helping them adjust when life gets in the way. A good coaching system removes the guesswork.",
    overTarget: "Over target",
    noReview: "No review",
  },
  ro: {
    eyebrow: "De ce eșuează majoritatea planurilor",
    title: "Probabil nu ai nevoie de mai multă motivație. Ai nevoie de un sistem pe care chiar îl poți urma.",
    lead: "Majoritatea oamenilor nu eșuează pentru că sunt leneși. Eșuează pentru că antrenamentul li se schimbă în fiecare săptămână, nutriția pare imposibil de menținut și nimeni nu îi ajută să se adapteze atunci când viața le dă peste cap planurile. Un sistem de coaching bun elimină incertitudinea.",
    overTarget: "Peste țintă",
    noReview: "Fără evaluare",
  },
} as const;

/* Small "broken" micro-UI that visualises each failure mode. */

function BrokenWeek() {
  // Inconsistent, scattered training week with an unknown day.
  const pattern = [true, false, true, false, false, true, false];
  return (
    <div className="flex items-center gap-2">
      {pattern.map((on, i) => (
        <span
          key={i}
          className={cn(
            "size-3 rounded-full",
            on ? "bg-clay/60" : "border border-dashed border-line",
          )}
        />
      ))}
      <HelpCircle className="ml-1 size-4 text-clay" strokeWidth={1.8} />
    </div>
  );
}

function BrokenNutrition() {
  const { lang } = useI18n();
  // A target overshot, then abandoned.
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[0.62rem] font-semibold uppercase tracking-wide text-clay">
        <span>{copy[lang].overTarget}</span>
        <span>+640 kcal</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-ink/8">
        <div className="h-full w-[128%] rounded-full bg-clay/60" />
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-ink/8">
        <div className="h-full w-[18%] rounded-full bg-line-strong" />
      </div>
    </div>
  );
}

function BrokenAccountability() {
  const { lang } = useI18n();
  return (
    <div className="flex items-end gap-1.5">
      {[8, 6, 7, 6, 6, 6].map((h, i) => (
        <span
          key={i}
          className="w-3 rounded-t bg-line-strong"
          style={{ height: `${h * 3}px` }}
        />
      ))}
      <span className="ml-2 rounded-full border border-dashed border-line px-2 py-0.5 text-[0.6rem] font-medium text-faint">
        {copy[lang].noReview}
      </span>
    </div>
  );
}

const cards = [
  {
    icon: HelpCircle,
    title: { en: "Random workouts", ro: "Antrenamente la întâmplare" },
    body: {
      en: "You train regularly, but you do not know whether your programme is moving you towards your actual goal.",
      ro: "Te antrenezi constant, dar nu știi dacă programul tău te apropie de obiectivul real.",
    },
    ui: <BrokenWeek />,
  },
  {
    icon: TriangleAlert,
    title: { en: "Unsustainable nutrition", ro: "Nutriție nesustenabilă" },
    body: {
      en: "You follow strict rules for a few days, lose control and feel like you need to start again.",
      ro: "Respecți reguli stricte câteva zile, pierzi controlul și simți că trebuie să o iei de la capăt.",
    },
    ui: <BrokenNutrition />,
  },
  {
    icon: Unplug,
    title: { en: "No accountability", ro: "Fără responsabilizare" },
    body: {
      en: "When progress slows down, there is nobody reviewing the data or helping you make the next adjustment.",
      ro: "Când progresul încetinește, nu e nimeni care să analizeze datele sau să te ajute cu următoarea ajustare.",
    },
    ui: <BrokenAccountability />,
  },
];

export function ProblemSection() {
  const { lang } = useI18n();
  const t = copy[lang];

  return (
    <section className="container-p section">
      <SectionHeader eyebrow={t.eyebrow} title={t.title}>
        {t.lead}
      </SectionHeader>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {cards.map((c, i) => (
          <Reveal key={c.title.en} delay={i * 0.08}>
            <GlassCard variant="solid" className="flex h-full flex-col p-6">
              <span className="grid size-10 place-items-center rounded-full bg-clay/12 text-clay">
                <c.icon className="size-5" strokeWidth={1.7} />
              </span>
              <h3 className="mt-4 text-xl font-bold">{c.title[lang]}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{c.body[lang]}</p>
              <div className="mt-5 rounded-md border border-line bg-bg/40 p-3.5">
                {c.ui}
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
