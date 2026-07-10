"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { Logo } from "@/components/site/logo";

const links = [
  { href: "/coaching", label: "Coaching" },
  { href: "/personal-training", label: "Personal Training" },
  { href: "/results", label: "Results" },
  { href: "/about", label: "About" },
  { href: "/login", label: "Portal" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={cn(
          "glass glass-air pointer-events-auto flex w-full max-w-[1180px] items-center gap-2 rounded-full py-2 pl-4 pr-2 transition-all duration-300",
          scrolled && "glass-standard shadow-lg",
        )}
        aria-label="Primary"
      >
        <Link href="/" className="mr-1 flex items-center gap-2" aria-label="PRIMEFORM home">
          <Logo className="size-7" />
          <span className="font-heading text-lg font-extrabold tracking-tight">
            PRIMEFORM
          </span>
        </Link>

        <div className="mx-auto hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  active ? "text-ink" : "text-muted hover:text-ink",
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <ThemeSwitcher className="hidden sm:inline-flex" />
          <Link href="/apply" className="btn btn-primary hidden h-10 min-h-0 px-5 py-0 text-sm sm:inline-flex">
            Apply for Coaching
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="grid size-10 place-items-center rounded-full text-ink lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24 }}
            className="glass glass-dense pointer-events-auto absolute inset-x-4 top-20 rounded-hero p-4 lg:hidden"
          >
            <div className="flex flex-col">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-md px-3 py-3 text-base font-medium text-ink hover:bg-ink/5"
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-2 flex items-center justify-between gap-3 border-t border-line pt-3">
                <ThemeSwitcher />
                <Link href="/apply" className="btn btn-primary flex-1">
                  Apply for Coaching
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
