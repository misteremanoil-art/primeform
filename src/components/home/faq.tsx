"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "./section-header";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

const faqs = [
  {
    q: { en: "Is the programme suitable for beginners?", ro: "Programul este potrivit pentru începători?" },
    a: {
      en: "Yes. Your training plan is created around your current experience and adjusted as you improve.",
      ro: "Da. Planul tău de antrenament este creat în funcție de experiența ta actuală și ajustat pe măsură ce progresezi.",
    },
  },
  {
    q: { en: "Do I need access to a gym?", ro: "Am nevoie de acces la o sală?" },
    a: {
      en: "No. Programmes can be created for a commercial gym, a home setup or limited equipment.",
      ro: "Nu. Programele pot fi create pentru o sală comercială, un spațiu de acasă sau echipament limitat.",
    },
  },
  {
    q: { en: "Will I receive a strict meal plan?", ro: "Voi primi un plan alimentar strict?" },
    a: {
      en: "The programme focuses on flexible nutrition targets and practical meal structure. More detailed planning can be included when appropriate.",
      ro: "Programul se axează pe obiective de nutriție flexibile și pe o structură practică a meselor. O planificare mai detaliată poate fi inclusă atunci când este cazul.",
    },
  },
  {
    q: { en: "How often is my programme updated?", ro: "Cât de des este actualizat programul meu?" },
    a: {
      en: "Your progress is reviewed weekly, while larger programme adjustments are normally made every four to six weeks or when your situation changes.",
      ro: "Progresul tău este evaluat săptămânal, iar ajustările mai mari ale programului se fac de obicei la fiecare patru–șase săptămâni sau atunci când situația ta se schimbă.",
    },
  },
  {
    q: { en: "How quickly will I see results?", ro: "Cât de repede voi vedea rezultate?" },
    a: {
      en: "Progress depends on your starting point, consistency, lifestyle and goal. No specific result or timeline can be guaranteed.",
      ro: "Progresul depinde de punctul tău de plecare, de consecvență, de stilul de viață și de obiectiv. Nu poate fi garantat un rezultat sau un termen anume.",
    },
  },
];

const copy = {
  en: {
    eyebrow: "Questions",
    title: "Answers before you apply.",
    lead: "If something is not covered here, you can ask during your consultation.",
    readAll: "Read All Questions →",
  },
  ro: {
    eyebrow: "Întrebări",
    title: "Răspunsuri înainte să aplici.",
    lead: "Dacă ceva nu este acoperit aici, poți întreba în timpul consultației.",
    readAll: "Citește toate întrebările →",
  },
} as const;

export function Faq() {
  const { lang } = useI18n();
  const t = copy[lang];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="container-p section">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeader eyebrow={t.eyebrow} title={t.title}>
          {t.lead}
        </SectionHeader>

        <Reveal className="divide-y divide-line">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q.en}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="text-lg font-semibold">{f.q[lang]}</span>
                  <Plus
                    className={cn(
                      "size-5 shrink-0 text-accent transition-transform duration-300",
                      isOpen && "rotate-45",
                    )}
                    strokeWidth={2}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 pr-8 text-muted">{f.a[lang]}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
          <div className="pt-6">
            <Link href="/coaching" className="text-sm font-semibold text-accent hover:text-ink">
              {t.readAll}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
