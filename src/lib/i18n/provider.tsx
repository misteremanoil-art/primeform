"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import type { Lang } from "./types";

interface I18nContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
}

const I18nContext = React.createContext<I18nContextValue | null>(null);

/**
 * Holds the active language in React state, initialised from the `?lang` URL
 * parameter (default `en`). Switching updates both the state and the URL (via
 * history.replaceState — no navigation, no scroll jump) and keeps `<html lang>`
 * in sync for accessibility. No reload, so the whole client tree re-renders in
 * the new language instantly.
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const initial: Lang = searchParams.get("lang") === "ro" ? "ro" : "en";
  const [lang, setLangState] = React.useState<Lang>(initial);

  const setLang = React.useCallback((next: Lang) => {
    setLangState(next);
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (next === "en") {
      url.searchParams.delete("lang");
    } else {
      url.searchParams.set("lang", next);
    }
    window.history.replaceState(null, "", url.toString());
    document.documentElement.lang = next;
  }, []);

  const toggle = React.useCallback(() => {
    setLangState((prev) => {
      const next: Lang = prev === "en" ? "ro" : "en";
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        if (next === "en") url.searchParams.delete("lang");
        else url.searchParams.set("lang", next);
        window.history.replaceState(null, "", url.toString());
        document.documentElement.lang = next;
      }
      return next;
    });
  }, []);

  React.useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = React.useMemo<I18nContextValue>(
    () => ({ lang, setLang, toggle }),
    [lang, setLang, toggle],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/**
 * Read the active language. Any component that renders localized copy must be
 * a Client Component ("use client") and call this hook.
 */
export function useI18n(): I18nContextValue {
  const ctx = React.useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within a LanguageProvider");
  }
  return ctx;
}
