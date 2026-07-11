"use client";

import Link from "next/link";
import {
  ArrowRight,
  Dumbbell,
  TrendingUp,
  ListChecks,
  MessageSquare,
  Play,
  ClipboardCheck,
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";
import { PlateProgressRing } from "@/components/fitness/plate-progress-ring";
import { DemoDisclosure } from "@/components/fitness/demo-disclosure";
import { SectionHeader } from "./section-header";
import { useI18n } from "@/lib/i18n";

const features = [
  {
    icon: Dumbbell,
    title: { en: "Today's workout", ro: "Antrenamentul de azi" },
    body: {
      en: "See exercises, sets, repetitions, previous performance and coach instructions.",
      ro: "Vezi exercițiile, seriile, repetările, performanța anterioară și instrucțiunile antrenorului.",
    },
  },
  {
    icon: TrendingUp,
    title: { en: "Weekly progress", ro: "Progres săptămânal" },
    body: {
      en: "Track body weight, measurements, workout completion and personal records.",
      ro: "Urmărește greutatea corporală, măsurătorile, finalizarea antrenamentelor și recordurile personale.",
    },
  },
  {
    icon: ListChecks,
    title: { en: "Habits", ro: "Obiceiuri" },
    body: {
      en: "Log sleep, steps, hydration, protein and other daily targets.",
      ro: "Notează somnul, pașii, hidratarea, proteinele și alte obiective zilnice.",
    },
  },
  {
    icon: ClipboardCheck,
    title: { en: "Check-ins", ro: "Check-in-uri" },
    body: {
      en: "Submit a structured weekly review and receive feedback from your coach.",
      ro: "Trimite o evaluare săptămânală structurată și primește feedback de la antrenorul tău.",
    },
  },
  {
    icon: MessageSquare,
    title: { en: "Messages", ro: "Mesaje" },
    body: {
      en: "Ask questions and receive support without losing important information in multiple apps.",
      ro: "Pune întrebări și primește sprijin fără să pierzi informații importante în mai multe aplicații.",
    },
  },
];

const copy = {
  en: {
    greeting: "Good afternoon, Alex",
    todaysWorkout: "Today’s Workout",
    workoutName: "Upper Body Strength",
    workoutMeta: "6 exercises · 58 min",
    week: "Week 7",
    weight: "Weight",
    habits: "Habits",
    today: "today",
    coach: "Coach",
    coachMessage: "Keep the same load and focus on control.",
    eyebrow: "Everything in one place",
    title: "Your training, progress and communication — organised in one private portal.",
    lead: "No spreadsheets hidden in email threads. No searching through old messages for your workout. Your complete coaching experience is available in one simple dashboard.",
    ctaPrimary: "Try the Client Demo",
    ctaSecondary: "View the Coach Dashboard",
    disclosure: "Portal data shown is fictional and for demonstration purposes.",
  },
  ro: {
    greeting: "Bună ziua, Alex",
    todaysWorkout: "Antrenamentul de azi",
    workoutName: "Forță partea superioară",
    workoutMeta: "6 exerciții · 58 min",
    week: "Săpt. 7",
    weight: "Greutate",
    habits: "Obiceiuri",
    today: "azi",
    coach: "Antrenor",
    coachMessage: "Păstrează aceeași greutate și concentrează-te pe control.",
    eyebrow: "Totul într-un singur loc",
    title: "Antrenamentul, progresul și comunicarea ta — organizate într-un singur portal privat.",
    lead: "Fără tabele ascunse prin e-mailuri. Fără căutat antrenamentul prin mesaje vechi. Întreaga ta experiență de coaching este disponibilă într-un singur tablou de bord simplu.",
    ctaPrimary: "Încearcă demo-ul pentru client",
    ctaSecondary: "Vezi panoul antrenorului",
    disclosure: "Datele afișate în portal sunt fictive și au scop demonstrativ.",
  },
} as const;

function MiniDashboard() {
  const { lang } = useI18n();
  const t = copy[lang];

  return (
    <GlassCard variant="dense" className="w-full rounded-hero p-4 shadow-2xl">
      <p className="text-sm font-semibold">{t.greeting}</p>
      <div className="mt-3 grid grid-cols-2 gap-2.5">
        {/* Today's workout */}
        <div className="surface-card col-span-2 flex items-center gap-3 p-3.5">
          <div className="min-w-0 flex-1">
            <p className="text-[0.58rem] font-bold uppercase tracking-widest text-accent">
              {t.todaysWorkout}
            </p>
            <p className="truncate text-sm font-bold">{t.workoutName}</p>
            <p className="tnum text-xs text-muted">{t.workoutMeta}</p>
          </div>
          <span className="grid size-9 place-items-center rounded-full bg-accent text-accent-ink">
            <Play className="size-4 fill-current" strokeWidth={0} />
          </span>
        </div>
        {/* Week progress */}
        <div className="surface-card flex items-center gap-2 p-3">
          <PlateProgressRing value={91} size={52} strokeWidth={8} />
          <div>
            <p className="tnum text-lg font-bold leading-none">91%</p>
            <p className="text-[0.6rem] uppercase tracking-wide text-muted">{t.week}</p>
          </div>
        </div>
        {/* Weight */}
        <div className="surface-card p-3">
          <p className="text-[0.58rem] font-bold uppercase tracking-widest text-muted">
            {t.weight}
          </p>
          <p className="tnum text-lg font-bold text-olive">−6.6 kg</p>
          <p className="text-[0.6rem] text-muted">96.4 → 89.8</p>
        </div>
        {/* Habits */}
        <div className="surface-card p-3">
          <p className="text-[0.58rem] font-bold uppercase tracking-widest text-muted">
            {t.habits}
          </p>
          <p className="tnum text-lg font-bold">4 / 5</p>
          <p className="text-[0.6rem] text-muted">{t.today}</p>
        </div>
        {/* Coach message */}
        <div className="surface-card p-3">
          <p className="text-[0.58rem] font-bold uppercase tracking-widest text-accent">
            {t.coach}
          </p>
          <p className="mt-0.5 line-clamp-2 text-[0.66rem] leading-snug text-muted">
            {t.coachMessage}
          </p>
        </div>
      </div>
    </GlassCard>
  );
}

export function PortalPreview() {
  const { lang } = useI18n();
  const t = copy[lang];

  return (
    <section className="relative overflow-hidden">
      {/* Orange glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 -z-0 size-[560px] -translate-y-1/2 translate-x-1/4 rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--glow-orange), transparent 68%)" }}
      />
      <div className="container-p section relative">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader
              eyebrow={t.eyebrow}
              title={t.title}
            >
              {t.lead}
            </SectionHeader>

            <div className="mt-8 grid gap-x-6 gap-y-4 sm:grid-cols-2">
              {features.map((f) => (
                <div key={f.title.en} className="flex gap-3">
                  <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-accent/12 text-accent">
                    <f.icon className="size-4" strokeWidth={1.7} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{f.title[lang]}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted">{f.body[lang]}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className="btn btn-primary">
                {t.ctaPrimary}
                <ArrowRight className="size-4" strokeWidth={2} />
              </Link>
              <Link href="/login" className="btn btn-secondary">
                {t.ctaSecondary}
              </Link>
            </div>
          </div>

          {/* Product composition */}
          <Reveal delay={0.1} className="relative">
            <div className="[perspective:1600px]">
              <div className="mx-auto max-w-[440px] lg:[transform:rotateY(-16deg)_rotateX(6deg)]">
                <MiniDashboard />
              </div>
            </div>
          </Reveal>
        </div>

        <DemoDisclosure className="mt-10">
          {t.disclosure}
        </DemoDisclosure>
      </div>
    </section>
  );
}
