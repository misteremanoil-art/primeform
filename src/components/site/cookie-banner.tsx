"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePrimeStore } from "@/lib/store/store";
import { useHasHydrated } from "@/lib/store/hooks";
import { useI18n } from "@/lib/i18n";

const copy = {
  en: {
    aria: "Cookie preferences",
    body: "We use essential cookies to operate this demo and optional analytics cookies to understand how it is used.",
    categories: ["Essential", "Analytics", "Marketing"],
    accept: "Accept All",
    reject: "Reject Optional",
    manage: "Manage Preferences",
  },
  ro: {
    aria: "Preferințe cookie-uri",
    body: "Folosim cookie-uri esențiale pentru a opera acest demo și cookie-uri opționale de analiză pentru a înțelege cum este utilizat.",
    categories: ["Esențiale", "Analiză", "Marketing"],
    accept: "Acceptă tot",
    reject: "Refuză opționalele",
    manage: "Gestionează preferințele",
  },
} as const;

export function CookieBanner() {
  const hydrated = useHasHydrated();
  const { lang } = useI18n();
  const t = copy[lang];
  const consent = usePrimeStore((s) => s.cookieConsent);
  const setConsent = usePrimeStore((s) => s.setCookieConsent);
  const [expanded, setExpanded] = useState(false);

  // The studio gallery embeds the site as a preview thumbnail. A consent dialog
  // has nothing to ask of someone looking at a card, and it covers the hero it
  // is meant to be showing off, so it stays out of frames.
  const [framed, setFramed] = useState(false);
  useEffect(() => {
    try {
      setFramed(window.self !== window.top);
    } catch {
      setFramed(true); // cross-origin frame — still a frame
    }
  }, []);

  const visible = hydrated && !framed && consent === null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-3 bottom-3 z-[90] mx-auto max-w-2xl sm:inset-x-6"
          role="dialog"
          aria-label={t.aria}
        >
          <div className="glass glass-dense rounded-hero p-5">
            <p className="text-sm leading-relaxed text-ink">{t.body}</p>

            {expanded && (
              <ul className="mt-3 flex flex-wrap gap-2">
                {t.categories.map((c) => (
                  <li key={c} className="pill text-muted">
                    {c}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                onClick={() => setConsent("accepted")}
                className="btn btn-primary h-10 min-h-0 px-4 py-0 text-sm"
              >
                {t.accept}
              </button>
              <button
                onClick={() => setConsent("rejected")}
                className="btn btn-secondary h-10 min-h-0 px-4 py-0 text-sm"
              >
                {t.reject}
              </button>
              <button
                onClick={() => setExpanded((e) => !e)}
                className="btn btn-ghost h-10 min-h-0 px-3 py-0 text-sm"
                aria-expanded={expanded}
              >
                {t.manage}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
