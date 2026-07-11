"use client";

import { Users, Activity, Star, CalendarRange } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { AnimatedNumber } from "@/components/fitness/animated-number";
import { DemoDisclosure } from "@/components/fitness/demo-disclosure";
import { useI18n } from "@/lib/i18n";

const stats = [
  { icon: Users, value: 300, suffix: { en: "+", ro: "+" }, label: { en: "coaching journeys", ro: "parcursuri de coaching" } },
  { icon: Activity, value: 91, suffix: { en: "%", ro: "%" }, label: { en: "average workout completion", ro: "finalizare medie a antrenamentelor" } },
  { icon: Star, value: 4.9, decimals: 1, suffix: { en: "/5", ro: "/5" }, label: { en: "average client rating", ro: "rating mediu al clienților" } },
  { icon: CalendarRange, value: 12, suffix: { en: "-week", ro: " săpt." }, label: { en: "structured programmes", ro: "programe structurate" } },
];

const copy = {
  en: { heading: "A coaching system designed around real life." },
  ro: { heading: "Un sistem de coaching gândit în jurul vieții reale." },
} as const;

export function TrustStrip() {
  const { lang } = useI18n();
  const t = copy[lang];

  return (
    <section className="container-p pb-6 pt-4">
      <Reveal className="surface-card overflow-hidden rounded-section p-6 sm:p-8">
        <p className="text-center text-sm font-medium text-muted">
          {t.heading}
        </p>
        <div className="mt-6 grid grid-cols-2 gap-6 sm:gap-4 lg:grid-cols-4">
          {stats.map(({ icon: Icon, value, suffix, decimals, label }) => (
            <div key={label.en} className="flex flex-col items-center text-center">
              <Icon className="mb-2 size-5 text-accent" strokeWidth={1.7} />
              <span className="font-heading text-3xl font-bold sm:text-4xl">
                <AnimatedNumber value={value} decimals={decimals ?? 0} suffix={suffix[lang]} />
              </span>
              <span className="mt-1 text-xs font-medium uppercase tracking-wide text-muted">
                {label[lang]}
              </span>
            </div>
          ))}
        </div>
        <DemoDisclosure className="mt-6 w-full justify-center" />
      </Reveal>
    </section>
  );
}
