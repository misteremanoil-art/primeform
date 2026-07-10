"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "./section-header";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Is the programme suitable for beginners?",
    a: "Yes. Your training plan is created around your current experience and adjusted as you improve.",
  },
  {
    q: "Do I need access to a gym?",
    a: "No. Programmes can be created for a commercial gym, a home setup or limited equipment.",
  },
  {
    q: "Will I receive a strict meal plan?",
    a: "The programme focuses on flexible nutrition targets and practical meal structure. More detailed planning can be included when appropriate.",
  },
  {
    q: "How often is my programme updated?",
    a: "Your progress is reviewed weekly, while larger programme adjustments are normally made every four to six weeks or when your situation changes.",
  },
  {
    q: "How quickly will I see results?",
    a: "Progress depends on your starting point, consistency, lifestyle and goal. No specific result or timeline can be guaranteed.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="container-p section">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeader eyebrow="Questions" title="Answers before you apply.">
          If something is not covered here, you can ask during your consultation.
        </SectionHeader>

        <Reveal className="divide-y divide-line">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="text-lg font-semibold">{f.q}</span>
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
                      <p className="pb-5 pr-8 text-muted">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
          <div className="pt-6">
            <Link href="/coaching" className="text-sm font-semibold text-accent hover:text-ink">
              Read All Questions →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
