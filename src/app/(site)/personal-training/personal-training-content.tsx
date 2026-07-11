"use client";

import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { PageIntro } from "@/components/site/page-intro";
import { SectionHeader } from "@/components/home/section-header";
import { PricingCard } from "@/components/site/pricing-card";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";
import { DemoDisclosure } from "@/components/fitness/demo-disclosure";
import { useI18n } from "@/lib/i18n";

const copy = {
  en: {
    introEyebrow: "Personal Training",
    introTitle: "Private coaching built around your movement, confidence and progress.",
    introBody:
      "One-to-one training sessions for people who want expert guidance, better technique and a plan that goes beyond simply completing exercises.",
    introCta: "Book a Consultation",
    introSecondary: "Check Availability",
    focusTitle: "Session focus",
    focusLead: "Personal training sessions may include:",
    beforeTitle: "Before the first session",
    beforeLead: "What happens before the first session:",
    pricingEyebrow: "Pricing",
    pricingTitle: "Sessions and packages.",
    disclosure: "Pricing is fictional and used only to demonstrate service presentation.",
    checkAvailability: "Check Availability",
    perMonth: "per month",
    singleName: "Single Session",
    singleDesc: "One private training session.",
    packageBadge: "Best value",
    packageName: "8-Session Package",
    packageDesc: "Eight personal training sessions with progress tracking.",
    hybridName: "Hybrid Package",
    hybridPrice: "From €249",
    hybridDesc: "Personal training sessions combined with online programming and weekly check-ins.",
    ctaTitle: "Ready to train with a plan?",
    ctaBody:
      "Book a consultation and we will discuss your goal, training history and the best way to start.",
    ctaButton: "Book a Consultation",
  },
  ro: {
    introEyebrow: "Antrenament personal",
    introTitle: "Coaching privat construit în jurul mișcării, încrederii și progresului tău.",
    introBody:
      "Sesiuni de antrenament unu-la-unu pentru cei care vor îndrumare de specialitate, o tehnică mai bună și un plan care depășește simpla bifare a exercițiilor.",
    introCta: "Programează o consultație",
    introSecondary: "Verifică disponibilitatea",
    focusTitle: "Focusul sesiunilor",
    focusLead: "Sesiunile de antrenament personal pot include:",
    beforeTitle: "Înainte de prima sesiune",
    beforeLead: "Ce se întâmplă înainte de prima sesiune:",
    pricingEyebrow: "Prețuri",
    pricingTitle: "Sesiuni și pachete.",
    disclosure: "Prețurile sunt fictive și folosite doar pentru a demonstra prezentarea serviciului.",
    checkAvailability: "Verifică disponibilitatea",
    perMonth: "pe lună",
    singleName: "Sesiune individuală",
    singleDesc: "O sesiune privată de antrenament.",
    packageBadge: "Cel mai bun raport",
    packageName: "Pachet de 8 sesiuni",
    packageDesc: "Opt sesiuni de antrenament personal, cu monitorizarea progresului.",
    hybridName: "Pachet hibrid",
    hybridPrice: "De la €249",
    hybridDesc: "Sesiuni de antrenament personal combinate cu programare online și check-in-uri săptămânale.",
    ctaTitle: "Gata să te antrenezi cu un plan?",
    ctaBody:
      "Programează o consultație și vom discuta despre obiectivul tău, istoricul antrenamentelor și cea mai bună cale de a începe.",
    ctaButton: "Programează o consultație",
  },
} as const;

const sessionFocus = [
  { en: "strength development", ro: "dezvoltarea forței" },
  { en: "fat-loss focused training", ro: "antrenament axat pe slăbire" },
  { en: "technique improvement", ro: "îmbunătățirea tehnicii" },
  { en: "beginner gym confidence", ro: "încredere în sală pentru începători" },
  { en: "mobility and movement quality", ro: "mobilitate și calitatea mișcării" },
  { en: "return to structured exercise", ro: "revenire la antrenamentul structurat" },
  { en: "performance tracking", ro: "monitorizarea performanței" },
] as const;

const beforeFirst = [
  { en: "goal discussion", ro: "discuție despre obiective" },
  { en: "training history", ro: "istoricul antrenamentelor" },
  { en: "injury and limitation review", ro: "evaluarea accidentărilor și limitărilor" },
  { en: "schedule and availability", ro: "program și disponibilitate" },
  { en: "basic movement assessment", ro: "evaluare de bază a mișcării" },
  { en: "initial programme direction", ro: "direcția inițială a programului" },
] as const;

export function PersonalTrainingContent() {
  const { lang } = useI18n();
  const t = copy[lang];

  return (
    <>
      <PageIntro
        eyebrow={t.introEyebrow}
        title={t.introTitle}
        cta={{ label: t.introCta, href: "/book" }}
        secondary={{ label: t.introSecondary, href: "/book" }}
      >
        {t.introBody}
      </PageIntro>

      {/* Session focus + before first session */}
      <section className="container-p section">
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <GlassCard variant="solid" className="h-full p-6 sm:p-8">
              <SectionHeader title={t.focusTitle} />
              <p className="mt-2 text-sm text-muted">{t.focusLead}</p>
              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {sessionFocus.map((s) => (
                  <li key={s.en} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-0.5 grid size-4.5 shrink-0 place-items-center rounded-full bg-accent/12 text-accent">
                      <Check className="size-3" strokeWidth={2.5} />
                    </span>
                    <span className="first-letter:uppercase">{s[lang]}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.08}>
            <GlassCard variant="solid" className="h-full p-6 sm:p-8">
              <SectionHeader title={t.beforeTitle} />
              <p className="mt-2 text-sm text-muted">{t.beforeLead}</p>
              <ul className="mt-5 space-y-3">
                {beforeFirst.map((s, i) => (
                  <li key={s.en} className="flex items-center gap-3 text-sm">
                    <span className="tnum grid size-6 shrink-0 place-items-center rounded-full bg-ink/5 text-xs font-bold text-muted">
                      {i + 1}
                    </span>
                    <span className="first-letter:uppercase">{s[lang]}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-bg-2/50">
        <div className="container-p section">
          <SectionHeader eyebrow={t.pricingEyebrow} title={t.pricingTitle} align="center" />
          <div className="mx-auto mt-12 grid max-w-5xl gap-5 lg:grid-cols-3">
            <PricingCard
              name={t.singleName}
              price="€40"
              description={t.singleDesc}
              cta={{ label: t.checkAvailability, href: "/book" }}
            />
            <PricingCard
              highlighted
              badge={t.packageBadge}
              name={t.packageName}
              price="€280"
              description={t.packageDesc}
              cta={{ label: t.checkAvailability, href: "/book" }}
            />
            <PricingCard
              name={t.hybridName}
              price={t.hybridPrice}
              per={t.perMonth}
              description={t.hybridDesc}
              cta={{ label: t.checkAvailability, href: "/book" }}
            />
          </div>
          <DemoDisclosure className="mx-auto mt-8 w-full justify-center">
            {t.disclosure}
          </DemoDisclosure>
        </div>
      </section>

      {/* CTA */}
      <section className="container-p section">
        <GlassCard variant="standard" className="rounded-section p-8 text-center sm:p-12">
          <h2 className="text-[clamp(1.8rem,4vw,2.6rem)]">{t.ctaTitle}</h2>
          <p className="mx-auto mt-4 max-w-lg text-muted">{t.ctaBody}</p>
          <Link href="/book" className="btn btn-primary mt-7">
            {t.ctaButton}
            <ArrowRight className="size-4" strokeWidth={2} />
          </Link>
        </GlassCard>
      </section>
    </>
  );
}
