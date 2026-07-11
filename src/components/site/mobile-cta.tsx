"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const copy = {
  en: { cta: "Start Your Application" },
  ro: { cta: "Începe aplicația" },
} as const;

/** Public-site mobile sticky CTA — never shown in the portal or coach dashboard. */
export function MobileCta() {
  const pathname = usePathname();
  const { lang } = useI18n();
  // Hide on the application flow itself.
  if (pathname.startsWith("/apply")) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 p-3 sm:hidden">
      <Link
        href="/apply"
        className="btn btn-primary pointer-events-auto flex w-full shadow-xl"
      >
        {copy[lang].cta}
        <ArrowRight className="size-4" strokeWidth={2} />
      </Link>
    </div>
  );
}
