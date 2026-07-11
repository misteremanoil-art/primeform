"use client";

import { PageIntro } from "@/components/site/page-intro";
import { GlassCard } from "@/components/ui/glass-card";
import { useI18n } from "@/lib/i18n";

const copy = {
  en: {
    eyebrow: "Legal",
    title: "Health disclaimer.",
    p1: "The information provided through this website and coaching demo is intended for general educational and demonstration purposes.",
    p2: "It is not a substitute for medical advice, diagnosis, treatment, physiotherapy or clinical nutrition guidance.",
    p3: "Always consult a qualified healthcare professional before beginning a new exercise or nutrition programme, particularly if you have a medical condition, injury, are pregnant or take medication.",
    p4: "Stop exercising and seek appropriate medical advice if you experience chest pain, dizziness, severe shortness of breath or unexpected pain.",
    p5: "No specific result can be guaranteed.",
  },
  ro: {
    eyebrow: "Legal",
    title: "Disclaimer medical.",
    p1: "Informațiile oferite prin acest site și prin demo-ul de coaching au scop general educativ și demonstrativ.",
    p2: "Acestea nu înlocuiesc sfatul medical, diagnosticul, tratamentul, fizioterapia sau îndrumarea nutrițională clinică.",
    p3: "Consultă întotdeauna un profesionist calificat în domeniul sănătății înainte de a începe un nou program de exercițiu sau nutriție, mai ales dacă ai o afecțiune medicală, o accidentare, ești însărcinată sau iei medicamente.",
    p4: "Oprește antrenamentul și solicită sfat medical adecvat dacă apar dureri în piept, amețeli, dificultăți severe de respirație sau dureri neașteptate.",
    p5: "Niciun rezultat specific nu poate fi garantat.",
  },
} as const;

export function HealthDisclaimerContent() {
  const { lang } = useI18n();
  const t = copy[lang];

  return (
    <>
      <PageIntro eyebrow={t.eyebrow} title={t.title} />
      <section className="container-p section pt-4">
        <GlassCard variant="solid" className="max-w-2xl space-y-4 p-6 leading-relaxed text-muted sm:p-8">
          <p>{t.p1}</p>
          <p>{t.p2}</p>
          <p>{t.p3}</p>
          <p>{t.p4}</p>
          <p className="font-medium text-ink">{t.p5}</p>
        </GlassCard>
      </section>
    </>
  );
}
