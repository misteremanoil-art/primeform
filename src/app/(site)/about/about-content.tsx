"use client";

import Link from "next/link";
import { ArrowRight, Award } from "lucide-react";
import { PageIntro } from "@/components/site/page-intro";
import { SectionHeader } from "@/components/home/section-header";
import { CoachPortrait } from "@/components/home/coach-portrait";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";
import { DemoDisclosure } from "@/components/fitness/demo-disclosure";
import { useI18n } from "@/lib/i18n";

const copy = {
  en: {
    eyebrow: "Meet your coach",
    title: "Fitness becomes easier to follow when the plan makes sense.",
    intro1:
      "I am Daniel, the fictional coach behind PRIMEFORM. This demo profile represents the type of professional Emanoil Studio can build a complete digital coaching system for.",
    intro2:
      "The coaching philosophy is centred on clarity, personalisation and measurable progress.",
    body1:
      "Many people believe they need more discipline. Often, what they actually need is a plan designed for their current life rather than an ideal routine they cannot maintain.",
    body2:
      "PRIMEFORM was built around that idea. Every client receives clear expectations, regular feedback and a programme that can change when work, recovery, equipment or priorities change.",
    principlesEyebrow: "Coaching principles",
    principlesTitle: "What guides every programme.",
    credentialsEyebrow: "Fictional credentials",
    credentialsTitle: "Experience and qualifications.",
    disclosure:
      "Coach identity, qualifications and experience are fictional and shown only for demonstration purposes.",
    apply: "Apply to Work Together",
  },
  ro: {
    eyebrow: "Cunoaște-ți antrenorul",
    title: "Fitnessul devine mai ușor de urmat atunci când planul are sens.",
    intro1:
      "Sunt Daniel, antrenorul fictiv din spatele PRIMEFORM. Acest profil demonstrativ reprezintă tipul de profesionist pentru care Emanoil Studio poate construi un sistem digital complet de coaching.",
    intro2:
      "Filosofia de coaching este centrată pe claritate, personalizare și progres măsurabil.",
    body1:
      "Mulți oameni cred că le trebuie mai multă disciplină. De cele mai multe ori, ceea ce le trebuie de fapt este un plan gândit pentru viața lor actuală, nu o rutină ideală pe care nu o pot menține.",
    body2:
      "PRIMEFORM a fost construit în jurul acestei idei. Fiecare client primește așteptări clare, feedback regulat și un program care se poate schimba atunci când se schimbă jobul, recuperarea, echipamentul sau prioritățile.",
    principlesEyebrow: "Principii de coaching",
    principlesTitle: "Ce ghidează fiecare program.",
    credentialsEyebrow: "Calificări fictive",
    credentialsTitle: "Experiență și calificări.",
    disclosure:
      "Identitatea antrenorului, calificările și experiența sunt fictive și afișate doar în scop demonstrativ.",
    apply: "Aplică pentru a lucra împreună",
  },
} as const;

const principles = [
  {
    title: { en: "Personal before perfect", ro: "Personal înainte de perfect" },
    body: {
      en: "The best programme is not the most advanced one. It is the one that fits the client and can be followed consistently.",
      ro: "Cel mai bun program nu este cel mai avansat, ci cel care se potrivește clientului și poate fi urmat cu consecvență.",
    },
  },
  {
    title: { en: "Progress must be measurable", ro: "Progresul trebuie să fie măsurabil" },
    body: {
      en: "Training performance, body measurements, habits and recovery provide better decisions than emotion alone.",
      ro: "Performanța la antrenament, măsurătorile corporale, obiceiurile și recuperarea duc la decizii mai bune decât o face emoția de una singură.",
    },
  },
  {
    title: { en: "Nutrition should be practical", ro: "Nutriția trebuie să fie practică" },
    body: {
      en: "A nutrition plan should support the client's goal without making normal life impossible.",
      ro: "Un plan de nutriție trebuie să susțină obiectivul clientului fără să facă imposibilă viața normală.",
    },
  },
  {
    title: { en: "Accountability should be constructive", ro: "Responsabilizarea trebuie să fie constructivă" },
    body: {
      en: "The purpose of a check-in is not to judge the client. It is to understand what happened and decide what comes next.",
      ro: "Scopul unui check-in nu este să judece clientul, ci să înțeleagă ce s-a întâmplat și să decidă ce urmează.",
    },
  },
] as const;

const credentials = [
  { en: "Certified Personal Trainer", ro: "Antrenor personal certificat" },
  { en: "Strength and Conditioning Specialist", ro: "Specialist în forță și condiție fizică" },
  { en: "Nutrition Coaching Certification", ro: "Certificare în coaching nutrițional" },
  { en: "Eight years of coaching experience", ro: "Opt ani de experiență în coaching" },
  { en: "300+ completed client programmes", ro: "Peste 300 de programe finalizate cu clienți" },
] as const;

export function AboutContent() {
  const { lang } = useI18n();
  const t = copy[lang];

  return (
    <>
      <PageIntro eyebrow={t.eyebrow} title={t.title} />

      {/* Intro + portrait */}
      <section className="container-p section pt-4">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="order-last lg:order-first">
            <div className="mx-auto max-w-[420px]">
              {/* PHOTO: cinematic coach portrait, warm side light — see VISUAL_DIRECTION §32 */}
              <CoachPortrait rounded="rounded-hero" className="aspect-[4/5] w-full" />
            </div>
          </Reveal>
          <div>
            <p className="text-lg leading-relaxed text-muted">{t.intro1}</p>
            <p className="mt-4 text-lg leading-relaxed text-muted">{t.intro2}</p>
            <div className="mt-8 space-y-4 border-t border-line pt-8">
              <p className="leading-relaxed">{t.body1}</p>
              <p className="leading-relaxed">{t.body2}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="bg-bg-2/50">
        <div className="container-p section">
          <SectionHeader eyebrow={t.principlesEyebrow} title={t.principlesTitle} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.title.en} delay={i * 0.06}>
                <GlassCard variant="solid" className="h-full p-6">
                  <span className="tnum font-heading text-3xl font-extrabold text-accent/25">
                    0{i + 1}
                  </span>
                  <h3 className="mt-2 text-xl font-bold">{p.title[lang]}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.body[lang]}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="container-p section">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader eyebrow={t.credentialsEyebrow} title={t.credentialsTitle} />
          <div>
            <div className="grid gap-3 sm:grid-cols-2">
              {credentials.map((c) => (
                <div key={c.en} className="flex items-center gap-3 rounded-md border border-line bg-surface/50 p-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gold/15 text-[color:var(--gold)]">
                    <Award className="size-4" strokeWidth={1.8} />
                  </span>
                  <span className="text-sm font-medium">{c[lang]}</span>
                </div>
              ))}
            </div>
            <DemoDisclosure className="mt-5">{t.disclosure}</DemoDisclosure>
            <Link href="/apply" className="btn btn-primary mt-7">
              {t.apply}
              <ArrowRight className="size-4" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
