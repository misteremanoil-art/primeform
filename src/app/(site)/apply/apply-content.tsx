"use client";

import { ApplyForm } from "@/components/apply/apply-form";
import { useI18n } from "@/lib/i18n";

const copy = {
  en: {
    eyebrow: "Application",
    title: "Tell us where you are now and where you want to go.",
    intro:
      "The application takes approximately three minutes. Your answers help determine whether PRIMEFORM is the right coaching option for your goal. Submitting the form does not create a payment or commitment.",
  },
  ro: {
    eyebrow: "Aplicație",
    title: "Spune-ne unde te afli acum și unde vrei să ajungi.",
    intro:
      "Aplicația durează aproximativ trei minute. Răspunsurile tale ne ajută să stabilim dacă PRIMEFORM este opțiunea de coaching potrivită pentru obiectivul tău. Trimiterea formularului nu creează o plată sau un angajament.",
  },
} as const;

export function ApplyContent() {
  const { lang } = useI18n();
  const t = copy[lang];

  return (
    <section className="container-p section">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1 className="mt-3 text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.05]">{t.title}</h1>
        <p className="mt-5 text-muted">{t.intro}</p>
      </div>
      <ApplyForm />
    </section>
  );
}
