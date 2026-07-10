"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  Users,
  ClipboardCheck,
  CalendarDays,
  Dumbbell,
  RotateCcw,
  LogOut,
} from "lucide-react";
import { usePrimeStore } from "@/lib/store/store";
import { useHasHydrated, toast } from "@/lib/store/hooks";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { NotificationBell } from "@/components/portal/notification-bell";
import { Logo } from "@/components/site/logo";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/coach", label: "Overview", icon: LayoutDashboard },
  { href: "/coach/leads", label: "Leads", icon: Inbox },
  { href: "/coach/clients", label: "Clients", icon: Users },
  { href: "/coach/checkins", label: "Check-ins", icon: ClipboardCheck },
  { href: "/coach/bookings", label: "Bookings", icon: CalendarDays },
  { href: "/coach/programs", label: "Programs", icon: Dumbbell },
];

export function CoachShell({ children }: { children: React.ReactNode }) {
  const hydrated = useHasHydrated();
  const role = usePrimeStore((s) => s.role);
  const setRole = usePrimeStore((s) => s.setRole);
  const resetDemo = usePrimeStore((s) => s.resetDemo);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (hydrated && role !== "coach") router.replace("/login");
  }, [hydrated, role, router]);

  if (!hydrated || role !== "coach") {
    return (
      <div className="grid min-h-dvh place-items-center">
        <div className="flex flex-col items-center gap-3 text-muted">
          <Logo className="size-10 animate-pulse" />
          <p className="text-sm">Loading the coach dashboard…</p>
        </div>
      </div>
    );
  }

  const isActive = (href: string) =>
    href === "/coach" ? pathname === "/coach" : pathname.startsWith(href);

  const handleReset = () => {
    resetDemo();
    toast("Demo data reset", "The dashboard is back to the seed state.");
  };
  const exit = () => {
    setRole("visitor");
    router.push("/");
  };

  return (
    <div className="flex min-h-dvh">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col border-r border-line bg-surface/40 p-4 lg:flex">
        <Link href="/coach" className="flex items-center gap-2 px-2 py-2">
          <Logo className="size-7" />
          <span className="font-heading text-lg font-extrabold tracking-tight">PRIMEFORM</span>
        </Link>
        <div className="mt-3 rounded-card border border-line bg-surface p-3">
          <p className="text-sm font-semibold">Daniel Ionescu</p>
          <p className="text-xs text-muted">PRIMEFORM Coaching</p>
        </div>
        <nav className="mt-4 flex-1 space-y-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                isActive(item.href) ? "bg-accent/12 text-accent" : "text-muted hover:bg-ink/5 hover:text-ink",
              )}
            >
              <item.icon className="size-4.5" strokeWidth={1.8} />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="space-y-1 border-t border-line pt-3">
          <button onClick={handleReset} className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-ink/5 hover:text-ink">
            <RotateCcw className="size-4.5" strokeWidth={1.8} />
            Reset demo data
          </button>
          <button onClick={exit} className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-ink/5 hover:text-ink">
            <LogOut className="size-4.5" strokeWidth={1.8} />
            Exit demo
          </button>
          <div className="px-3 pt-2">
            <ThemeSwitcher />
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-line bg-bg/80 backdrop-blur-md">
          <div className="flex items-center justify-between gap-3 px-4 py-3 lg:px-8">
            <div className="flex items-center gap-2 lg:hidden">
              <Logo className="size-6" />
              <span className="font-heading text-base font-extrabold">Coach</span>
            </div>
            <p className="hidden text-sm font-medium text-muted lg:block">
              {nav.find((n) => isActive(n.href))?.label ?? "Coach"}
            </p>
            <div className="flex items-center gap-1.5">
              <button
                onClick={exit}
                className="inline-flex rounded-full p-2 text-muted transition-colors hover:text-ink lg:hidden"
                aria-label="Exit demo and return to homepage"
              >
                <LogOut className="size-4.5" strokeWidth={1.8} />
              </button>
              <NotificationBell audience="coach" />
              <button onClick={handleReset} className="hidden rounded-full p-2 text-muted hover:text-ink lg:inline-flex" aria-label="Reset demo data">
                <RotateCcw className="size-4.5" strokeWidth={1.8} />
              </button>
              <div className="lg:hidden">
                <ThemeSwitcher />
              </div>
            </div>
          </div>
          {/* Mobile nav */}
          <nav className="no-scrollbar flex gap-1 overflow-x-auto px-4 pb-2.5 lg:hidden">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                  isActive(item.href) ? "border-transparent bg-accent text-accent-ink" : "border-line text-muted",
                )}
              >
                <item.icon className="size-3.5" strokeWidth={1.8} />
                {item.label}
              </Link>
            ))}
          </nav>
        </header>

        <main className="flex-1 px-4 py-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
