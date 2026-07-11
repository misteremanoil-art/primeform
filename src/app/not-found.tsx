"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { TrainingHalo } from "@/components/fitness/training-halo";
import { useI18n } from "@/lib/i18n";

const copy = {
  en: {
    title: "This page could not be found.",
    body: "The page may have moved, or the link is part of a demo route that no longer exists.",
    home: "Back to homepage",
    demo: "Enter the demo",
  },
  ro: {
    title: "Această pagină nu a putut fi găsită.",
    body: "Pagina s-ar putea să fi fost mutată sau linkul face parte dintr-o rută demo care nu mai există.",
    home: "Înapoi la pagina principală",
    demo: "Intră în demo",
  },
} as const;

export default function NotFound() {
  const { lang } = useI18n();
  const t = copy[lang];

  return (
    <main className="relative grid min-h-dvh place-items-center overflow-hidden px-6 py-16 text-center">
      <div aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center opacity-50">
        <TrainingHalo size={520} />
      </div>
      <div className="relative">
        <Link href="/" className="mx-auto flex w-fit items-center gap-2">
          <Logo className="size-8" />
          <span className="font-heading text-xl font-extrabold tracking-tight">PRIMEFORM</span>
        </Link>
        <p className="tnum mt-10 font-heading text-7xl font-extrabold text-accent sm:text-8xl">404</p>
        <h1 className="mt-4 text-3xl sm:text-4xl">{t.title}</h1>
        <p className="mx-auto mt-4 max-w-md text-muted">{t.body}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn btn-primary">
            <ArrowLeft className="size-4" strokeWidth={2} />
            {t.home}
          </Link>
          <Link href="/login" className="btn btn-secondary">
            {t.demo}
          </Link>
        </div>
      </div>
    </main>
  );
}
