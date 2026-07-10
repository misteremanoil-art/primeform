import type { Metadata } from "next";
import { PageIntro } from "@/components/site/page-intro";
import { GlassCard } from "@/components/ui/glass-card";

export const metadata: Metadata = {
  title: "Health Disclaimer",
  description:
    "General educational and demonstration health information for the PRIMEFORM demo. Not a substitute for medical advice.",
};

export default function HealthDisclaimerPage() {
  return (
    <>
      <PageIntro eyebrow="Legal" title="Health disclaimer." />
      <section className="container-p section pt-4">
        <GlassCard variant="solid" className="max-w-2xl space-y-4 p-6 leading-relaxed text-muted sm:p-8">
          <p>
            The information provided through this website and coaching demo is intended
            for general educational and demonstration purposes.
          </p>
          <p>
            It is not a substitute for medical advice, diagnosis, treatment,
            physiotherapy or clinical nutrition guidance.
          </p>
          <p>
            Always consult a qualified healthcare professional before beginning a new
            exercise or nutrition programme, particularly if you have a medical
            condition, injury, are pregnant or take medication.
          </p>
          <p>
            Stop exercising and seek appropriate medical advice if you experience chest
            pain, dizziness, severe shortness of breath or unexpected pain.
          </p>
          <p className="font-medium text-ink">No specific result can be guaranteed.</p>
        </GlassCard>
      </section>
    </>
  );
}
