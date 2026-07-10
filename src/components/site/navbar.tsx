"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { Logo } from "@/components/site/logo";

const links = [
  { href: "/coaching", label: "Coaching" },
  { href: "/personal-training", label: "Personal Training" },
  { href: "/results", label: "Results" },
  { href: "/about", label: "About" },
  { href: "/calculator", label: "Calculator" },
  { href: "/login", label: "Portal" },
];

function MenuButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      className="group relative grid size-11 place-items-center rounded-full border border-line/70 bg-surface/40 backdrop-blur-md transition-colors hover:bg-surface/70"
    >
      <span className="relative block h-4 w-5">
        <motion.span
          className="absolute left-0 top-[2px] block h-[1.6px] w-full rounded-full bg-ink"
          style={{ transformOrigin: "center" }}
          initial={false}
          animate={open ? { y: 5.2, rotate: 45 } : { y: 0, rotate: 0 }}
          transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.span
          className="absolute left-0 top-1/2 block h-[1.6px] w-full -translate-y-1/2 rounded-full bg-ink"
          initial={false}
          animate={open ? { opacity: 0, scaleX: 0.5 } : { opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.16 }}
        />
        <motion.span
          className="absolute bottom-[2px] left-0 block h-[1.6px] w-full rounded-full bg-ink"
          style={{ transformOrigin: "center" }}
          initial={false}
          animate={open ? { y: -5.2, rotate: -45 } : { y: 0, rotate: 0 }}
          transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
        />
      </span>
    </button>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll subtly? No — the panel is compact, keep the page usable.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-colors duration-300",
          scrolled || open
            ? "border-b border-line bg-bg/70 backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        <div className="container-p relative flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5" aria-label="PRIMEFORM home">
            <Logo className="size-8" />
            <span className="font-heading text-lg font-extrabold tracking-tight">
              PRIMEFORM
            </span>
          </Link>

          <MenuButton open={open} onClick={() => setOpen((o) => !o)} />

          {/* Compact content-sized dropdown, anchored under the button */}
          <AnimatePresence>
            {open && (
              <motion.nav
                aria-label="Primary"
                initial={{ opacity: 0, y: -10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "top right", background: "var(--surface)" }}
                className="absolute right-[clamp(1.15rem,4vw,2.5rem)] top-[calc(100%+0.6rem)] w-64 rounded-3xl border border-line-strong p-2.5 shadow-2xl"
              >
                <ul className="flex flex-col">
                  {links.map((l, i) => {
                    const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
                    return (
                      <motion.li
                        key={l.href}
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.04 + i * 0.035, duration: 0.2 }}
                      >
                        <Link
                          href={l.href}
                          className={cn(
                            "flex items-center justify-between rounded-xl px-3.5 py-2.5 text-[0.95rem] font-medium transition-colors",
                            active
                              ? "bg-accent/12 text-accent"
                              : "text-ink hover:bg-ink/5",
                          )}
                        >
                          {l.label}
                          {active && <span className="size-1.5 rounded-full bg-accent" />}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>

                <div className="mt-2 border-t border-line pt-2.5">
                  <Link
                    href="/apply"
                    className="btn btn-primary flex w-full"
                  >
                    Apply for Coaching
                    <ArrowUpRight className="size-4" strokeWidth={2} />
                  </Link>
                  <div className="mt-2.5 flex items-center justify-between px-1.5">
                    <span className="text-xs text-muted">Theme</span>
                    <ThemeSwitcher />
                  </div>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Invisible click-catcher — closes on outside click, never dims the screen */}
      {open && (
        <button
          aria-hidden
          tabIndex={-1}
          onClick={() => setOpen(false)}
          className="fixed inset-0 -z-10 cursor-default"
        />
      )}
    </header>
  );
}
