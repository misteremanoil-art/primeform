/**
 * i18n primitives — safe to import from both Server and Client Components
 * (this module has no "use client" directive and no React runtime).
 */

export type Lang = "en" | "ro";

export const LANGS: Lang[] = ["en", "ro"];

/** A value provided in both languages. */
export type Localized<T = string> = { en: T; ro: T };

/**
 * Resolve a value for the active language. Accepts either a `{ en, ro }`
 * pair or a plain value (returned as-is), so data can be migrated field by
 * field without breaking callers.
 */
export function pick<T>(lang: Lang, value: Localized<T> | T): T {
  if (value && typeof value === "object" && "en" in (value as object) && "ro" in (value as object)) {
    return (value as Localized<T>)[lang];
  }
  return value as T;
}
