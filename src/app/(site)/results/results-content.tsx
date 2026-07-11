"use client";

import { PageIntro } from "@/components/site/page-intro";
import { ResultsGrid } from "@/components/results/results-grid";
import { DemoDisclosure } from "@/components/fitness/demo-disclosure";
import { useI18n } from "@/lib/i18n";

const copy = {
  en: {
    eyebrow: "Client journeys",
    title: "Every result has context.",
    intro:
      "Progress should be understood through consistency, performance, habits and the client’s starting point — not only through a single photograph.",
    disclaimer: "Names, images and data shown in this demo are fictional.",
  },
  ro: {
    eyebrow: "Parcursuri ale clienților",
    title: "Fiecare rezultat are un context.",
    intro:
      "Progresul ar trebui înțeles prin consecvență, performanță, obiceiuri și punctul de plecare al clientului — nu doar printr-o singură fotografie.",
    disclaimer: "Numele, imaginile și datele afișate în acest demo sunt fictive.",
  },
} as const;

export function ResultsContent() {
  const { lang } = useI18n();
  const t = copy[lang];

  return (
    <>
      <PageIntro eyebrow={t.eyebrow} title={t.title}>
        {t.intro}
      </PageIntro>

      <section className="container-p section pt-4">
        <ResultsGrid />
        <DemoDisclosure className="mt-8">{t.disclaimer}</DemoDisclosure>
      </section>
    </>
  );
}
