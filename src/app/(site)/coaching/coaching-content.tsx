"use client";

import { Check, Dumbbell, PlayCircle, Utensils, ClipboardCheck, TrendingUp, MessageSquare } from "lucide-react";
import { PageIntro } from "@/components/site/page-intro";
import { SectionHeader } from "@/components/home/section-header";
import { PricingCard } from "@/components/site/pricing-card";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";
import { BarbellTimeline } from "@/components/fitness/barbell-timeline";
import { DemoDisclosure } from "@/components/fitness/demo-disclosure";
import { useI18n } from "@/lib/i18n";

const copy = {
  en: {
    introEyebrow: "Online Coaching",
    introTitle: "Personalised coaching, wherever you train.",
    introBody:
      "A complete online system combining structured workouts, nutrition guidance, weekly reviews and direct access to your coach.",
    introCta: "Apply for Online Coaching",
    introSecondary: "Explore the Client Portal",
    whoEyebrow: "Who it is for",
    whoTitle: "Online Coaching may be suitable for you when:",
    includedEyebrow: "What is included",
    includedTitle: "Everything the online system covers.",
    timelineEyebrow: "Programme timeline",
    timelineTitle: "A structured twelve-week arc.",
    timelineBody: "Every phase has a clear purpose, from assessment to consolidation.",
    pricingEyebrow: "Pricing",
    pricingTitle: "Choose online, or add in-person sessions.",
    disclosure: "Pricing is fictional and used only to demonstrate service presentation.",
    onlineName: "Online Coaching",
    onlinePrice: "From €149",
    perMonth: "per month",
    onlineDesc: "Final pricing depends on the required support level and programme structure.",
    onlineCta: "Apply for Coaching",
    onlineNote: "Submitting an application does not create a payment or commitment.",
    hybridBadge: "Most complete",
    hybridName: "Hybrid Coaching",
    hybridPrice: "From €249",
    hybridDesc: "In-person sessions combined with a complete online plan for the rest of the week.",
    hybridCta: "Explore Hybrid Coaching",
    hybridNote: "Pricing is fictional and used only to demonstrate service presentation.",
  },
  ro: {
    introEyebrow: "Coaching online",
    introTitle: "Coaching personalizat, oriunde te antrenezi.",
    introBody:
      "Un sistem online complet care combină antrenamente structurate, îndrumare nutrițională, analize săptămânale și acces direct la antrenorul tău.",
    introCta: "Aplică pentru coaching online",
    introSecondary: "Explorează portalul clientului",
    whoEyebrow: "Pentru cine este",
    whoTitle: "Coachingul online ți se poate potrivi atunci când:",
    includedEyebrow: "Ce este inclus",
    includedTitle: "Tot ceea ce acoperă sistemul online.",
    timelineEyebrow: "Cronologia programului",
    timelineTitle: "Un arc structurat de douăsprezece săptămâni.",
    timelineBody: "Fiecare etapă are un scop clar, de la evaluare până la consolidare.",
    pricingEyebrow: "Prețuri",
    pricingTitle: "Alege varianta online sau adaugă sesiuni în persoană.",
    disclosure: "Prețurile sunt fictive și folosite doar pentru a demonstra prezentarea serviciului.",
    onlineName: "Coaching online",
    onlinePrice: "De la €149",
    perMonth: "pe lună",
    onlineDesc: "Prețul final depinde de nivelul de suport necesar și de structura programului.",
    onlineCta: "Aplică pentru coaching",
    onlineNote: "Trimiterea unei aplicații nu creează o plată sau un angajament.",
    hybridBadge: "Cel mai complet",
    hybridName: "Coaching hibrid",
    hybridPrice: "De la €249",
    hybridDesc: "Sesiuni în persoană combinate cu un plan online complet pentru restul săptămânii.",
    hybridCta: "Explorează coachingul hibrid",
    hybridNote: "Prețurile sunt fictive și folosite doar pentru a demonstra prezentarea serviciului.",
  },
} as const;

const suitableWhen = [
  {
    en: "you want a personalised plan rather than a downloadable template;",
    ro: "îți dorești un plan personalizat, nu un șablon descărcabil;",
  },
  {
    en: "you can train independently but need structure;",
    ro: "te poți antrena independent, dar ai nevoie de structură;",
  },
  {
    en: "you want regular feedback and accountability;",
    ro: "vrei feedback regulat și responsabilizare;",
  },
  {
    en: "your schedule changes from week to week;",
    ro: "programul tău se schimbă de la o săptămână la alta;",
  },
  {
    en: "you want your programme adjusted using real progress data.",
    ro: "vrei ca programul să fie ajustat pe baza datelor reale de progres.",
  },
] as const;

const included = [
  {
    icon: Dumbbell,
    title: { en: "Personalised training", ro: "Antrenament personalizat" },
    body: {
      en: "A programme adapted to your goal, experience, schedule and equipment.",
      ro: "Un program adaptat obiectivului, experienței, programului și echipamentului tău.",
    },
  },
  {
    icon: PlayCircle,
    title: { en: "Exercise guidance", ro: "Îndrumare la exerciții" },
    body: {
      en: "Videos, written cues, rest periods, tempo and progression targets.",
      ro: "Videoclipuri, indicații scrise, pauze, tempo și obiective de progresie.",
    },
  },
  {
    icon: Utensils,
    title: { en: "Nutrition targets", ro: "Ținte nutriționale" },
    body: {
      en: "Practical calorie, protein and meal-structure guidance based on your goal.",
      ro: "Îndrumare practică privind caloriile, proteinele și structura meselor, în funcție de obiectivul tău.",
    },
  },
  {
    icon: ClipboardCheck,
    title: { en: "Weekly check-in", ro: "Check-in săptămânal" },
    body: {
      en: "A structured review covering training, nutrition, sleep, stress and recovery.",
      ro: "O analiză structurată care acoperă antrenamentul, nutriția, somnul, stresul și recuperarea.",
    },
  },
  {
    icon: TrendingUp,
    title: { en: "Progress tracking", ro: "Monitorizarea progresului" },
    body: {
      en: "Weight, measurements, photos, completed sessions and strength data.",
      ro: "Greutate, măsurători, fotografii, sesiuni finalizate și date despre forță.",
    },
  },
  {
    icon: MessageSquare,
    title: { en: "Direct support", ro: "Suport direct" },
    body: {
      en: "Private messaging for questions, updates and programme guidance.",
      ro: "Mesagerie privată pentru întrebări, actualizări și îndrumare privind programul.",
    },
  },
] as const;

const timeline = [
  {
    marker: { en: "Week 0 — Assessment", ro: "Săptămâna 0 — Evaluare" },
    title: { en: "Assessment", ro: "Evaluare" },
    detail: {
      en: "Onboarding form, movement history, goal setting, measurements and equipment review.",
      ro: "Formular de înscriere, istoricul mișcării, stabilirea obiectivelor, măsurători și evaluarea echipamentului.",
    },
  },
  {
    marker: { en: "Week 1 — Foundation", ro: "Săptămâna 1 — Fundație" },
    title: { en: "Foundation", ro: "Fundație" },
    detail: {
      en: "Start your training plan, nutrition targets and initial daily habits.",
      ro: "Începi planul de antrenament, țintele nutriționale și primele obiceiuri zilnice.",
    },
  },
  {
    marker: { en: "Weeks 2–4 — Consistency", ro: "Săptămânile 2–4 — Consecvență" },
    title: { en: "Consistency", ro: "Consecvență" },
    detail: {
      en: "Build routine, improve exercise confidence and identify early obstacles.",
      ro: "Construiești rutina, câștigi încredere la exerciții și identifici obstacolele timpurii.",
    },
  },
  {
    marker: { en: "Weeks 5–8 — Progression", ro: "Săptămânile 5–8 — Progresie" },
    title: { en: "Progression", ro: "Progresie" },
    detail: {
      en: "Adjust volume, intensity, nutrition and habits based on your data.",
      ro: "Ajustezi volumul, intensitatea, nutriția și obiceiurile pe baza datelor tale.",
    },
  },
  {
    marker: { en: "Weeks 9–12 — Consolidation", ro: "Săptămânile 9–12 — Consolidare" },
    title: { en: "Consolidation", ro: "Consolidare" },
    detail: {
      en: "Review results, reinforce progress and create the next phase.",
      ro: "Analizezi rezultatele, consolidezi progresul și creezi etapa următoare.",
    },
  },
] as const;

const onlineIncludes = [
  { en: "custom training plan", ro: "plan de antrenament personalizat" },
  { en: "nutrition guidance", ro: "îndrumare nutrițională" },
  { en: "weekly check-in", ro: "check-in săptămânal" },
  { en: "progress tracking", ro: "monitorizarea progresului" },
  { en: "direct messaging", ro: "mesagerie directă" },
  { en: "monthly programme review", ro: "analiză lunară a programului" },
] as const;

const hybridIncludes = [
  { en: "scheduled personal training sessions", ro: "sesiuni de antrenament personal programate" },
  { en: "additional online workouts", ro: "antrenamente online suplimentare" },
  { en: "weekly check-ins", ro: "check-in-uri săptămânale" },
  { en: "nutrition guidance", ro: "îndrumare nutrițională" },
  { en: "full progress tracking", ro: "monitorizare completă a progresului" },
  { en: "support between sessions", ro: "suport între sesiuni" },
] as const;

export function CoachingContent() {
  const { lang } = useI18n();
  const t = copy[lang];

  return (
    <>
      <PageIntro
        eyebrow={t.introEyebrow}
        title={t.introTitle}
        cta={{ label: t.introCta, href: "/apply" }}
        secondary={{ label: t.introSecondary, href: "/login" }}
      >
        {t.introBody}
      </PageIntro>

      {/* Who it is for */}
      <section className="container-p section">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeader eyebrow={t.whoEyebrow} title={t.whoTitle} />
          <Reveal className="space-y-3">
            {suitableWhen.map((s) => (
              <div key={s.en} className="flex items-start gap-3 rounded-md border border-line bg-surface/50 p-4">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-olive/15 text-olive">
                  <Check className="size-3" strokeWidth={2.5} />
                </span>
                <span className="text-sm leading-relaxed first-letter:uppercase">{s[lang]}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* What is included */}
      <section className="bg-bg-2/50">
        <div className="container-p section">
          <SectionHeader eyebrow={t.includedEyebrow} title={t.includedTitle} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {included.map((f, i) => (
              <Reveal key={f.title.en} delay={i * 0.06}>
                <GlassCard variant="solid" className="h-full p-6">
                  <span className="grid size-10 place-items-center rounded-full bg-accent/12 text-accent">
                    <f.icon className="size-5" strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-4 text-lg font-bold">{f.title[lang]}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{f.body[lang]}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Programme timeline */}
      <section className="container-p section">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader eyebrow={t.timelineEyebrow} title={t.timelineTitle}>
            {t.timelineBody}
          </SectionHeader>
          <Reveal>
            <BarbellTimeline
              items={timeline.map((item) => ({
                marker: item.marker[lang],
                title: item.title[lang],
                detail: item.detail[lang],
              }))}
            />
          </Reveal>
        </div>
      </section>

      {/* Pricing + Hybrid comparison */}
      <section id="hybrid" className="scroll-mt-24 bg-bg-2/50">
        <div className="container-p section">
          <SectionHeader eyebrow={t.pricingEyebrow} title={t.pricingTitle} align="center" />
          <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-2">
            <PricingCard
              name={t.onlineName}
              price={t.onlinePrice}
              per={t.perMonth}
              description={t.onlineDesc}
              includes={onlineIncludes.map((x) => x[lang])}
              cta={{ label: t.onlineCta, href: "/apply" }}
              note={t.onlineNote}
            />
            <PricingCard
              highlighted
              badge={t.hybridBadge}
              name={t.hybridName}
              price={t.hybridPrice}
              per={t.perMonth}
              description={t.hybridDesc}
              includes={hybridIncludes.map((x) => x[lang])}
              cta={{ label: t.hybridCta, href: "/apply" }}
              note={t.hybridNote}
            />
          </div>
          <DemoDisclosure className="mx-auto mt-8 w-full justify-center">
            {t.disclosure}
          </DemoDisclosure>
        </div>
      </section>
    </>
  );
}
