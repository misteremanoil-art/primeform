"use client";

import { Quote } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";
import { DemoDisclosure } from "@/components/fitness/demo-disclosure";
import { SectionHeader } from "./section-header";
import { useI18n } from "@/lib/i18n";

const testimonials = [
  {
    quote: {
      en: "The plan was detailed, but never overwhelming. I always knew what I had to do next.",
      ro: "Planul era detaliat, dar niciodată copleșitor. Știam mereu ce aveam de făcut în continuare.",
    },
    name: "Elena M.",
    service: { en: "Online Coaching", ro: "Coaching online" },
  },
  {
    quote: {
      en: "My programme changed when my schedule changed. That made the difference between quitting and continuing.",
      ro: "Programul meu s-a schimbat când mi s-a schimbat programul zilnic. Asta a făcut diferența dintre a renunța și a continua.",
    },
    name: "Radu P.",
    service: { en: "Hybrid Coaching", ro: "Coaching hibrid" },
  },
  {
    quote: {
      en: "The weekly check-in kept me honest without making me feel judged.",
      ro: "Check-in-ul săptămânal m-a ținut pe drumul cel bun, fără să mă simt judecată.",
    },
    name: "Andreea T.",
    service: { en: "Online Coaching", ro: "Coaching online" },
  },
  {
    quote: {
      en: "I became stronger, but the biggest result was finally feeling confident inside a gym.",
      ro: "Am devenit mai puternic, dar cel mai important rezultat a fost că, în sfârșit, mă simt încrezător într-o sală.",
    },
    name: "Mihai C.",
    service: { en: "Personal Training", ro: "Antrenament personal" },
  },
];

const copy = {
  en: {
    title: "Support that continues after the programme is delivered.",
    disclosure: "Testimonials are fictional and included to demonstrate the platform experience.",
  },
  ro: {
    title: "Sprijin care continuă și după ce programul a fost livrat.",
    disclosure: "Testimonialele sunt fictive și incluse pentru a demonstra experiența platformei.",
  },
} as const;

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("");
  return (
    <span
      className="grid size-10 shrink-0 place-items-center rounded-full text-sm font-bold text-accent-ink"
      style={{
        background:
          "linear-gradient(135deg, var(--accent), color-mix(in oklab, var(--gold) 70%, var(--accent)))",
      }}
      aria-hidden
    >
      {initials}
    </span>
  );
}

export function Testimonials() {
  const { lang } = useI18n();

  return (
    <section className="section">
      <div className="container-p">
        <SectionHeader title={copy[lang].title} />
      </div>

      <Reveal className="mt-10">
        <div className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-[max(1.15rem,calc((100vw-1200px)/2+1.15rem))] pb-4">
          {testimonials.map((t) => (
            <GlassCard
              key={t.name}
              variant="standard"
              className="flex w-[300px] shrink-0 snap-start flex-col p-6 sm:w-[360px]"
            >
              <Quote className="size-6 text-accent/50" strokeWidth={1.6} />
              <p className="mt-3 flex-1 text-[0.98rem] leading-relaxed">“{t.quote[lang]}”</p>
              <div className="mt-5 flex items-center gap-3">
                <Avatar name={t.name} />
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted">{t.service[lang]}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </Reveal>

      <div className="container-p mt-4">
        <DemoDisclosure>
          {copy[lang].disclosure}
        </DemoDisclosure>
      </div>
    </section>
  );
}
