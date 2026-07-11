"use client";

import Link from "next/link";
import { Camera, MessageCircle } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { useI18n } from "@/lib/i18n";

const columns = [
  {
    title: { en: "Coaching", ro: "Coaching" },
    links: [
      { label: { en: "Online Coaching", ro: "Coaching online" }, href: "/coaching" },
      { label: { en: "Personal Training", ro: "Antrenament personal" }, href: "/personal-training" },
      { label: { en: "Hybrid Coaching", ro: "Coaching hibrid" }, href: "/coaching#hybrid" },
      { label: { en: "Apply", ro: "Aplică" }, href: "/apply" },
    ],
  },
  {
    title: { en: "Explore", ro: "Explorează" },
    links: [
      { label: { en: "Results", ro: "Rezultate" }, href: "/results" },
      { label: { en: "Calorie Calculator", ro: "Calculator calorii" }, href: "/calculator" },
      { label: { en: "About", ro: "Despre" }, href: "/about" },
      { label: { en: "Client Login", ro: "Autentificare client" }, href: "/login" },
    ],
  },
  {
    title: { en: "Legal", ro: "Legal" },
    links: [
      { label: { en: "Privacy Policy", ro: "Politica de confidențialitate" }, href: "/legal" },
      { label: { en: "Terms and Conditions", ro: "Termeni și condiții" }, href: "/legal" },
      { label: { en: "Cookie Policy", ro: "Politica de cookie-uri" }, href: "/legal" },
      { label: { en: "Health Disclaimer", ro: "Disclaimer medical" }, href: "/health-disclaimer" },
    ],
  },
] as const;

const copy = {
  en: {
    tagline:
      "Personalised fitness coaching built around clear training, flexible nutrition and measurable progress.",
    contact: "Contact",
    location: "Bucharest, Romania",
    disclaimer1:
      "PRIMEFORM is a fictional business created by Emanoil Studio to demonstrate a complete fitness coaching website and client management platform.",
    disclaimer2:
      "All names, images, statistics, qualifications, testimonials, prices and results are fictional.",
    rights: "PRIMEFORM Coaching · Demo",
    credit: "Designed and developed by Emanoil Studio",
  },
  ro: {
    tagline:
      "Coaching fitness personalizat, construit în jurul unui antrenament clar, al unei nutriții flexibile și al unui progres măsurabil.",
    contact: "Contact",
    location: "București, România",
    disclaimer1:
      "PRIMEFORM este o afacere fictivă creată de Emanoil Studio pentru a demonstra un site complet de coaching fitness și o platformă de management al clienților.",
    disclaimer2:
      "Toate numele, imaginile, statisticile, calificările, testimonialele, prețurile și rezultatele sunt fictive.",
    rights: "PRIMEFORM Coaching · Demo",
    credit: "Design și dezvoltare de Emanoil Studio",
  },
} as const;

export function Footer() {
  const { lang } = useI18n();
  const t = copy[lang];

  return (
    <footer className="relative mt-auto border-t border-line">
      <div className="container-p pb-28 pt-16 sm:pb-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <div className="flex items-center gap-2">
              <Logo className="size-8" />
              <span className="font-heading text-xl font-extrabold tracking-tight">
                PRIMEFORM
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">{t.tagline}</p>
            <div className="mt-5 flex items-center gap-3 text-sm text-muted">
              <a
                href="#"
                className="grid size-9 place-items-center rounded-full border border-line transition-colors hover:text-ink"
                aria-label="Instagram"
              >
                <Camera className="size-4" strokeWidth={1.7} />
              </a>
              <a
                href="#"
                className="grid size-9 place-items-center rounded-full border border-line transition-colors hover:text-ink"
                aria-label="WhatsApp"
              >
                <MessageCircle className="size-4" strokeWidth={1.7} />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.title.en} aria-label={col.title[lang]}>
              <p className="eyebrow">{col.title[lang]}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label.en}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted transition-colors hover:text-ink"
                    >
                      {l.label[lang]}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 grid gap-6 border-t border-line pt-8 text-sm text-muted sm:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="font-medium text-ink">{t.contact}</p>
            <p className="mt-2">hello@primeform.demo</p>
            <p>{t.location}</p>
          </div>
          <div className="rounded-card border border-line bg-surface/50 p-4 text-xs leading-relaxed">
            <p>{t.disclaimer1}</p>
            <p className="mt-2">{t.disclaimer2}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {t.rights}</p>
          <a
            href="https://emanoil.studio"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-ink transition-colors hover:text-accent"
          >
            {t.credit}
          </a>
        </div>
      </div>
    </footer>
  );
}
