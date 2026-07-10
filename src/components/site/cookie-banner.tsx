"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { usePrimeStore } from "@/lib/store/store";
import { useHasHydrated } from "@/lib/store/hooks";

const categories = ["Essential", "Analytics", "Marketing"];

export function CookieBanner() {
  const hydrated = useHasHydrated();
  const consent = usePrimeStore((s) => s.cookieConsent);
  const setConsent = usePrimeStore((s) => s.setCookieConsent);
  const [expanded, setExpanded] = useState(false);

  const visible = hydrated && consent === null;

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
          aria-label="Cookie preferences"
        >
          <div className="glass glass-dense rounded-hero p-5">
            <p className="text-sm leading-relaxed text-ink">
              We use essential cookies to operate this demo and optional analytics
              cookies to understand how it is used.
            </p>

            {expanded && (
              <ul className="mt-3 flex flex-wrap gap-2">
                {categories.map((c) => (
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
                Accept All
              </button>
              <button
                onClick={() => setConsent("rejected")}
                className="btn btn-secondary h-10 min-h-0 px-4 py-0 text-sm"
              >
                Reject Optional
              </button>
              <button
                onClick={() => setExpanded((e) => !e)}
                className="btn btn-ghost h-10 min-h-0 px-3 py-0 text-sm"
                aria-expanded={expanded}
              >
                Manage Preferences
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
