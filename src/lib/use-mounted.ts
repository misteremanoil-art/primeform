"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

/**
 * Returns false during SSR and the first client render, true afterwards.
 * Uses useSyncExternalStore so it never calls setState inside an effect.
 */
export function useMounted() {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
}
