"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, Sparkles, X } from "lucide-react";
import { useToastStore } from "@/lib/store/hooks";
import { useI18n } from "@/lib/i18n";

const copy = {
  en: { dismiss: "Dismiss notification" },
  ro: { dismiss: "Închide notificarea" },
} as const;

export function Toaster() {
  const toasts = useToastStore((s) => s.toasts);
  const dismiss = useToastStore((s) => s.dismiss);
  const { lang } = useI18n();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex flex-col items-center gap-2 px-4 sm:bottom-6">
      <AnimatePresence>
        {toasts.map((t) => {
          const Icon =
            t.tone === "success" ? CheckCircle2 : t.tone === "gold" ? Sparkles : Info;
          const iconColor =
            t.tone === "success"
              ? "text-olive"
              : t.tone === "gold"
                ? "text-gold"
                : "text-accent";
          return (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="glass glass-dense pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-md px-4 py-3"
              role="status"
            >
              <Icon className={`mt-0.5 size-5 shrink-0 ${iconColor}`} strokeWidth={1.8} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{t.title}</p>
                {t.description && (
                  <p className="mt-0.5 text-sm text-muted">{t.description}</p>
                )}
              </div>
              <button
                aria-label={copy[lang].dismiss}
                onClick={() => dismiss(t.id)}
                className="-mr-1 -mt-1 rounded-full p-1 text-faint transition-colors hover:text-ink"
              >
                <X className="size-4" strokeWidth={2} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
