"use client";

import Link from "next/link";
import { PageIntro } from "@/components/site/page-intro";
import { GlassCard } from "@/components/ui/glass-card";
import { useI18n } from "@/lib/i18n";

const copy = {
  en: {
    eyebrow: "Legal",
    title: "Privacy, terms & cookies.",
    intro:
      "PRIMEFORM is a fictional demo. This page summarises how the demo handles the limited test information it collects.",
    privacyTitle: "Privacy summary",
    privacyLead: "The demo may collect test information submitted through forms, including:",
    privacy1: "Public visitors should be informed not to submit sensitive medical information.",
    privacy2: "Demo data may be periodically deleted or reset.",
    privacy3:
      "The production version of the platform would require a complete privacy policy, cookie policy, data-processing agreements and data-retention rules appropriate to the client’s business.",
    cookiesTitle: "Cookies",
    cookiesBody:
      "We use essential cookies to operate this demo and optional analytics cookies to understand how it is used. You can accept or reject optional cookies from the banner. Cookie categories: Essential, Analytics, Marketing.",
    termsTitle: "Terms",
    termsBefore:
      "This site is a portfolio demonstration. All names, images, statistics, qualifications, testimonials, prices and results are fictional and provided only to demonstrate a complete coaching platform. See the ",
    termsLink: "health disclaimer",
    termsAfter: " for guidance on exercise and nutrition information.",
  },
  ro: {
    eyebrow: "Legal",
    title: "Confidențialitate, termeni și cookie-uri.",
    intro:
      "PRIMEFORM este un demo fictiv. Această pagină rezumă modul în care demo-ul tratează informațiile de test limitate pe care le colectează.",
    privacyTitle: "Rezumatul confidențialității",
    privacyLead: "Demo-ul poate colecta informații de test trimise prin formulare, printre care:",
    privacy1: "Vizitatorii publici ar trebui informați să nu trimită informații medicale sensibile.",
    privacy2: "Datele din demo pot fi șterse sau resetate periodic.",
    privacy3:
      "Versiunea de producție a platformei ar necesita o politică de confidențialitate completă, o politică de cookie-uri, acorduri de prelucrare a datelor și reguli de păstrare a datelor adecvate afacerii clientului.",
    cookiesTitle: "Cookie-uri",
    cookiesBody:
      "Folosim cookie-uri esențiale pentru a face acest demo să funcționeze și cookie-uri opționale de analiză pentru a înțelege cum este utilizat. Poți accepta sau respinge cookie-urile opționale din banner. Categorii de cookie-uri: Esențiale, Analiză, Marketing.",
    termsTitle: "Termeni",
    termsBefore:
      "Acest site este o demonstrație de portofoliu. Toate numele, imaginile, statisticile, calificările, testimonialele, prețurile și rezultatele sunt fictive și oferite doar pentru a demonstra o platformă completă de coaching. Consultă ",
    termsLink: "disclaimerul medical",
    termsAfter: " pentru îndrumări privind informațiile despre exercițiu și nutriție.",
  },
} as const;

const collected = [
  { en: "name", ro: "nume" },
  { en: "email", ro: "e-mail" },
  { en: "telephone number", ro: "număr de telefon" },
  { en: "fitness goals", ro: "obiective de fitness" },
  { en: "booking details", ro: "detalii despre programare" },
  { en: "demo progress information", ro: "informații demo despre progres" },
] as const;

export function LegalContent() {
  const { lang } = useI18n();
  const t = copy[lang];

  return (
    <>
      <PageIntro eyebrow={t.eyebrow} title={t.title}>
        {t.intro}
      </PageIntro>

      <section className="container-p section pt-4">
        <div className="max-w-2xl space-y-6">
          <GlassCard variant="solid" className="p-6 sm:p-8">
            <h2 className="text-xl font-bold">{t.privacyTitle}</h2>
            <p className="mt-3 text-muted">{t.privacyLead}</p>
            <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
              {collected.map((c) => (
                <li key={c.en} className="flex items-center gap-2 text-muted">
                  <span className="size-1.5 rounded-full bg-accent" />
                  <span className="first-letter:uppercase">{c[lang]}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-3 border-t border-line pt-4 text-muted">
              <p>{t.privacy1}</p>
              <p>{t.privacy2}</p>
              <p>{t.privacy3}</p>
            </div>
          </GlassCard>

          <GlassCard variant="solid" className="p-6 sm:p-8">
            <h2 className="text-xl font-bold">{t.cookiesTitle}</h2>
            <p className="mt-3 text-muted">{t.cookiesBody}</p>
          </GlassCard>

          <GlassCard variant="solid" className="p-6 sm:p-8">
            <h2 className="text-xl font-bold">{t.termsTitle}</h2>
            <p className="mt-3 text-muted">
              {t.termsBefore}
              <Link href="/health-disclaimer" className="font-semibold text-accent hover:text-ink">
                {t.termsLink}
              </Link>
              {t.termsAfter}
            </p>
          </GlassCard>
        </div>
      </section>
    </>
  );
}
