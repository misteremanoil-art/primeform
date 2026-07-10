"use client";

import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMounted } from "@/lib/use-mounted";

/**
 * Single sun/moon control that toggles between light and dark only.
 * The icon shows the active theme; clicking flips it.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      // Static label — never theme-dependent, so it can't cause a hydration mismatch.
      aria-label="Toggle colour theme"
      title="Toggle colour theme"
      className={cn(
        "relative grid size-9 place-items-center overflow-hidden text-ink transition-colors hover:text-accent",
        className,
      )}
    >
      {mounted && (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={{ opacity: 0, rotate: -35, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 35, scale: 0.6 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="grid place-items-center"
          >
            {isDark ? (
              <Moon className="size-[1.15rem]" strokeWidth={1.8} />
            ) : (
              <Sun className="size-[1.15rem]" strokeWidth={1.8} />
            )}
          </motion.span>
        </AnimatePresence>
      )}
    </button>
  );
}
