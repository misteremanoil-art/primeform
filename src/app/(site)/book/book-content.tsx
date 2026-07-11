"use client";

import { BookingForm } from "@/components/book/booking-form";
import { useI18n } from "@/lib/i18n";

const copy = {
  en: {
    eyebrow: "Booking",
    title: "Choose a time for your consultation.",
    intro:
      "Select a suitable date and time for a short conversation about your goal, current routine and the coaching option that may fit you best.",
  },
  ro: {
    eyebrow: "Programare",
    title: "Alege o oră pentru consultația ta.",
    intro:
      "Alege o dată și o oră potrivite pentru o scurtă conversație despre obiectivul tău, rutina actuală și opțiunea de coaching care ți s-ar potrivi cel mai bine.",
  },
} as const;

export function BookContent() {
  const { lang } = useI18n();
  const t = copy[lang];

  return (
    <section className="container-p section">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1 className="mt-3 text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.05]">{t.title}</h1>
        <p className="mt-5 text-muted">{t.intro}</p>
      </div>
      <BookingForm />
    </section>
  );
}
