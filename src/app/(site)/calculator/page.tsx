import type { Metadata } from "next";
import { PageIntro } from "@/components/site/page-intro";
import { CalorieCalculator } from "@/components/calculator/calorie-calculator";
import { GlassCard } from "@/components/ui/glass-card";

export const metadata: Metadata = {
  title: "Calorie Calculator",
  description:
    "Estimate your daily calorie needs with the Mifflin-St Jeor equation. Educational demo — not medical advice.",
};

export default function CalculatorPage() {
  return (
    <>
      <PageIntro eyebrow="Tools" title="Estimate your daily calorie needs.">
        Use the calculator to receive an estimated daily calorie target based on your
        body, activity level and current goal.
      </PageIntro>

      <section className="container-p section pt-4">
        <CalorieCalculator />

        <GlassCard variant="solid" className="mt-8 p-6">
          <p className="eyebrow">Medical disclaimer</p>
          <div className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
            <p>
              This calculator provides general estimates and is not medical or
              nutritional advice.
            </p>
            <p>
              It does not account for pregnancy, medical conditions, eating disorders,
              medication or individual clinical needs.
            </p>
            <p>
              Consult an appropriately qualified healthcare professional before making
              significant changes to your diet or activity.
            </p>
          </div>
        </GlassCard>
      </section>
    </>
  );
}
