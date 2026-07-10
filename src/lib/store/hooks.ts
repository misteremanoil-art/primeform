"use client";

import { useEffect, useState } from "react";
import { create } from "zustand";
import { usePrimeStore } from "./store";

/**
 * Hydration guard — zustand `persist` + the App Router will mismatch if we
 * render persisted state on first paint. Gate store-driven UI behind this and
 * render skeletons until it returns true. Zero hydration warnings.
 */
export function useHasHydrated() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Already finished before this effect ran?
    if (usePrimeStore.persist.hasHydrated()) setHydrated(true);
    const unsub = usePrimeStore.persist.onFinishHydration(() =>
      setHydrated(true),
    );
    return unsub;
  }, []);

  return hydrated;
}

/* ---- Transient toast store (never persisted) ---- */

export type ToastTone = "default" | "success" | "gold";
export interface Toast {
  id: string;
  title: string;
  description?: string;
  tone: ToastTone;
}

interface ToastState {
  toasts: Toast[];
  push: (t: Omit<Toast, "id">) => void;
  dismiss: (id: string) => void;
}

let toastSeq = 0;

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  push: (t) => {
    toastSeq += 1;
    const id = `t-${toastSeq}`;
    set((s) => ({ toasts: [...s.toasts, { ...t, id }] }));
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((x) => x.id !== id) }));
    }, 4200);
  },
  dismiss: (id) => set((s) => ({ toasts: s.toasts.filter((x) => x.id !== id) })),
}));

/** Convenience: fire a toast from anywhere. */
export function toast(title: string, description?: string, tone: ToastTone = "default") {
  useToastStore.getState().push({ title, description, tone });
}
