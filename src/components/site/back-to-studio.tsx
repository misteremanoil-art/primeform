"use client";

import { useFramed } from "@/lib/use-framed";
import { useI18n } from "@/lib/i18n";

const copy = {
  en: { label: "Emanoil", aria: "Back to the Emanoil Studio gallery" },
  ro: { label: "Emanoil", aria: "Înapoi la galeria Emanoil Studio" },
} as const;

/**
 * A way out of the demo.
 *
 * The link is usually the first thing a prospect sees of the studio, sent to
 * them on its own, so the demo cannot be a dead end — the browser's back button
 * has nowhere to go from a fresh tab.
 *
 * Desktop only: on small screens the bottom of the viewport already belongs to
 * the mobile CTA bar and, inside the portal, to its nav.
 */
export function BackToStudio() {
  const framed = useFramed();
  const { lang } = useI18n();
  const t = copy[lang];

  if (framed !== false) return null;

  return (
    <a
      href="https://emanoil.studio/work"
      aria-label={t.aria}
      className="glass glass-dense fixed bottom-5 left-5 z-[60] hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5 md:inline-flex"
    >
      <span aria-hidden="true">&larr;</span> {t.label}
    </a>
  );
}
