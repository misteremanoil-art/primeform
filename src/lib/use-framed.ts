"use client";

import { useEffect, useState } from "react";

/**
 * Whether the page is running inside an iframe: `true`, `false`, or `null` while
 * that is still unknown.
 *
 * The studio gallery embeds this site as a preview thumbnail, where anything
 * addressed to a visitor — a consent dialog, a link back to the gallery — is
 * either meaningless or in the way of the screenshot it is standing in.
 *
 * The answer can only come from an effect, so the first render does not have it.
 * Reporting `false` in the meantime would race whatever else the caller waits on
 * (store rehydration, say) and let the thing flash inside the frame before the
 * answer arrived. `null` makes callers wait, which is the only correct default.
 */
export function useFramed() {
  const [framed, setFramed] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      setFramed(window.self !== window.top);
    } catch {
      setFramed(true); // cross-origin frame — still a frame
    }
  }, []);

  return framed;
}
