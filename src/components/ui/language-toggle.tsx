"use client";

import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import { useMounted } from "@/lib/use-mounted";
import type { Lang } from "@/lib/i18n";

/**
 * Compact EN / RO switch. Two bare labels; the active language is inked, the
 * other is muted. Clicking either sets that language (updates `?lang` + state
 * with no reload). Kept text-only to match the minimalist navbar controls.
 */
export function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang } = useI18n();
  const mounted = useMounted();

  const item = (value: Lang, label: string) => {
    const active = lang === value;
    return (
      <button
        type="button"
        onClick={() => setLang(value)}
        aria-label={value === "en" ? "Switch to English" : "Comută pe română"}
        aria-pressed={active}
        className={cn(
          "px-0.5 text-xs font-semibold uppercase tracking-wide transition-colors",
          active ? "text-ink" : "text-muted hover:text-ink",
        )}
      >
        {label}
      </button>
    );
  };

  return (
    <div
      className={cn("flex items-center gap-1 tabular-nums", className)}
      // Avoid a hydration mismatch: render the default (EN) markup on the
      // server and only reflect the resolved language once mounted.
      suppressHydrationWarning
    >
      {mounted ? (
        <>
          {item("en", "EN")}
          <span aria-hidden className="text-line-strong">
            /
          </span>
          {item("ro", "RO")}
        </>
      ) : (
        <span className="text-xs font-semibold uppercase tracking-wide text-ink">
          EN <span className="text-line-strong">/</span>{" "}
          <span className="text-muted">RO</span>
        </span>
      )}
    </div>
  );
}
