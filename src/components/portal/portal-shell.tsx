"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Dumbbell,
  TrendingUp,
  ClipboardCheck,
  Utensils,
  ListChecks,
  MessageSquare,
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
  { href: "/portal", label: "Dashboard", icon: Home },
  { href: "/portal/workout", label: "Workout", icon: Dumbbell },
  { href: "/portal/progress", label: "Progress", icon: TrendingUp },
  { href: "/portal/checkin", label: "Check-in", icon: ClipboardCheck },
  { href: "/portal/nutrition", label: "Nutrition", icon: Utensils },
  { href: "/portal/habits", label: "Habits", icon: ListChecks },
  { href: "/portal/messages", label: "Messages", icon: MessageSquare },
];

const bottomNav = [nav[0], nav[1], nav[2], nav[3], nav[6]];

export function PortalShell({ children }: { children: React.ReactNode }) {
  const hydrated = useHasHydrated();
  const role = usePrimeStore((s) => s.role);
  const setRole = usePrimeStore((s) => s.setRole);
  const resetDemo = usePrimeStore((s) => s.resetDemo);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (hydrated && role !== "client") router.replace("/login");
  }, [hydrated, role, router]);

  if (!hydrated || role !== "client") {
    return (
      <div className="grid min-h-dvh place-items-center">
        <div className="flex flex-col items-center gap-3 text-muted">
          <Logo className="size-10 animate-pulse" />
          <p className="text-sm">Loading your portal…</p>
        </div>
      </div>
    );
  }

  const isActive = (href: string) =>
    href === "/portal" ? pathname === "/portal" : pathname.startsWith(href);

  const handleReset = () => {
    resetDemo();
    toast("Demo data reset", "Your portal is back to the seed state.", "default");
  };

  const exit = () => {
    setRole("visitor");
    router.push("/");
  };

  return (
    <div className="flex min-h-dvh">
      {/* Sidebar (desktop) */}
      <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r border-line bg-surface/40 p-4 lg:flex">
        <Link href="/portal" className="flex items-center gap-2 px-2 py-2">
          <Logo className="size-7" />
          <span className="font-heading text-lg font-extrabold tracking-tight">PRIMEFORM</span>
        </Link>

        <div className="mt-3 rounded-card border border-line bg-surface p-3">
          <p className="text-sm font-semibold">Alex Popescu</p>
          <p className="text-xs text-muted">12-Week Fat Loss · Week 7 of 12</p>
        </div>

        <nav className="mt-4 flex-1 space-y-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "bg-accent/12 text-accent"
                  : "text-muted hover:bg-ink/5 hover:text-ink",
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
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-line bg-bg/80 px-4 py-3 backdrop-blur-md lg:px-8">
          <div className="flex items-center gap-2 lg:hidden">
            <Logo className="size-6" />
            <span className="font-heading text-base font-extrabold">PRIMEFORM</span>
          </div>
          <p className="hidden text-sm font-medium text-muted lg:block">
            {nav.find((n) => isActive(n.href))?.label ?? "Portal"}
          </p>
          <div className="flex items-center gap-1.5">
            <NotificationBell audience="client" />
            <button onClick={handleReset} className="hidden rounded-full p-2 text-muted hover:text-ink lg:inline-flex" aria-label="Reset demo data">
              <RotateCcw className="size-4.5" strokeWidth={1.8} />
            </button>
            <div className="lg:hidden">
              <ThemeSwitcher />
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 pb-28 lg:px-8 lg:pb-10">{children}</main>
      </div>

      {/* Bottom nav (mobile, portal only) */}
      <nav className="glass glass-dense fixed inset-x-3 bottom-3 z-40 flex items-center justify-around rounded-full px-2 py-1.5 lg:hidden">
        {bottomNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-0.5 rounded-full px-3 py-1.5 text-[0.6rem] font-medium transition-colors",
              isActive(item.href) ? "text-accent" : "text-muted",
            )}
          >
            <item.icon className="size-5" strokeWidth={1.8} />
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
