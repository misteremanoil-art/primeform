"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Short, controlled count-up on first view. SSR renders the final value so
 * there is never a hydration mismatch; the animation only runs on the client
 * once the element scrolls into view. Respects prefers-reduced-motion.
 */
export function AnimatedNumber({
  value,
  format,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1100,
  className,
}: {
  value: number;
  /** Only pass from a client component — functions can't cross the RSC boundary. */
  format?: (n: number) => string;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const fmt =
    format ?? ((n: number) => `${prefix}${n.toFixed(decimals)}${suffix}`);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    // display is initialised to `value`, so when we are not animating we simply
    // leave it as-is (no synchronous setState in the effect body).
    if (reduce || !inView) return;
    let raf = 0;
    let startTime = 0;
    const step = (now: number) => {
      if (!startTime) startTime = now;
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(value * eased);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reduce]);

  return (
    <span ref={ref} className={cn("tnum", className)}>
      {fmt(display)}
    </span>
  );
}
