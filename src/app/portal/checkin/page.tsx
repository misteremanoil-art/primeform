"use client";

import { CheckinForm } from "@/components/portal/checkin-form";
import { PortalHeader } from "@/components/portal/portal-header";
import { useI18n } from "@/lib/i18n";

const copy = {
  en: {
    title: "Weekly check-in",
    intro:
      "Take a few minutes to review the week honestly. There are no perfect answers. The purpose is to understand what worked, what did not and what should change next.",
  },
  ro: {
    title: "Check-in săptămânal",
    intro:
      "Acordă câteva minute pentru a analiza sincer săptămâna. Nu există răspunsuri perfecte. Scopul este să înțelegi ce a funcționat, ce nu și ce ar trebui schimbat în continuare.",
  },
} as const;

export default function CheckinPage() {
  const { lang } = useI18n();
  const t = copy[lang];
  return (
    <div className="mx-auto max-w-2xl">
      <PortalHeader title={t.title}>{t.intro}</PortalHeader>
      <CheckinForm />
    </div>
  );
}
