"use client";

import { PageIntro } from "@/components/site/page-intro";
import { CalorieCalculator } from "@/components/calculator/calorie-calculator";
import { GlassCard } from "@/components/ui/glass-card";
import { useI18n } from "@/lib/i18n";

const copy = {
  en: {
    eyebrow: "Tools",
    title: "Estimate your daily calorie needs.",
    intro:
      "Use the calculator to receive an estimated daily calorie target based on your body, activity level and current goal.",
    disclaimerEyebrow: "Medical disclaimer",
    d1: "This calculator provides general estimates and is not medical or nutritional advice.",
    d2: "It does not account for pregnancy, medical conditions, eating disorders, medication or individual clinical needs.",
    d3: "Consult an appropriately qualified healthcare professional before making significant changes to your diet or activity.",
  },
  ro: {
    eyebrow: "Instrumente",
    title: "Estimează-ți necesarul zilnic de calorii.",
    intro:
      "Folosește calculatorul pentru a primi un target zilnic estimativ de calorii, în funcție de corpul tău, nivelul de activitate și obiectivul actual.",
    disclaimerEyebrow: "Disclaimer medical",
    d1: "Acest calculator oferă estimări generale și nu constituie sfat medical sau nutrițional.",
    d2: "Nu ia în considerare sarcina, afecțiunile medicale, tulburările de alimentație, medicația sau nevoile clinice individuale.",
    d3: "Consultă un profesionist în domeniul sănătății, calificat corespunzător, înainte de a face schimbări semnificative în dieta sau activitatea ta.",
  },
} as const;

export function CalculatorContent() {
  const { lang } = useI18n();
  const t = copy[lang];

  return (
    <>
      <PageIntro eyebrow={t.eyebrow} title={t.title}>
        {t.intro}
      </PageIntro>

      <section className="container-p section pt-4">
        <CalorieCalculator />

        <GlassCard variant="solid" className="mt-8 p-6">
          <p className="eyebrow">{t.disclaimerEyebrow}</p>
          <div className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
            <p>{t.d1}</p>
            <p>{t.d2}</p>
            <p>{t.d3}</p>
          </div>
        </GlassCard>
      </section>
    </>
  );
}
