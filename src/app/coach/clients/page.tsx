"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { StatusPill } from "@/components/fitness/status-pill";
import { usePrimeStore } from "@/lib/store/store";
import { useI18n } from "@/lib/i18n";

const copy = {
  en: {
    title: "Clients",
    subtitle: "active coaching clients.",
    client: "Client",
    programme: "Programme",
    week: "Week",
    lastWorkout: "Last Workout",
    checkIn: "Check-In",
    completion: "Completion",
    status: "Status",
    weekShort: "Week",
    last: "Last",
    completionSuffix: "completion",
  },
  ro: {
    title: "Clienți",
    subtitle: "clienți activi de coaching.",
    client: "Client",
    programme: "Program",
    week: "Săptămână",
    lastWorkout: "Ultimul antrenament",
    checkIn: "Check-in",
    completion: "Finalizare",
    status: "Status",
    weekShort: "Săpt.",
    last: "Ultimul",
    completionSuffix: "finalizat",
  },
} as const;

export default function ClientsPage() {
  const { lang } = useI18n();
  const t = copy[lang];
  const clients = usePrimeStore((s) => s.clients);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold sm:text-3xl">{t.title}</h1>
        <p className="mt-1.5 text-muted">{clients.length} {t.subtitle}</p>
      </div>

      {/* Desktop table */}
      <GlassCard variant="solid" className="hidden overflow-hidden p-0 lg:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-4 py-3 font-semibold">{t.client}</th>
              <th className="px-4 py-3 font-semibold">{t.programme}</th>
              <th className="px-4 py-3 font-semibold">{t.week}</th>
              <th className="px-4 py-3 font-semibold">{t.lastWorkout}</th>
              <th className="px-4 py-3 font-semibold">{t.checkIn}</th>
              <th className="px-4 py-3 font-semibold">{t.completion}</th>
              <th className="px-4 py-3 font-semibold">{t.status}</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              <tr key={c.id} className="border-b border-line last:border-0 transition-colors hover:bg-ink/[0.03]">
                <td className="px-4 py-3">
                  <Link href={`/coach/clients/${c.id}`} className="font-semibold hover:text-accent">
                    {c.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-muted">{c.programme}</td>
                <td className="tnum px-4 py-3 text-muted">{c.currentWeek} of {c.totalWeeks}</td>
                <td className="px-4 py-3 text-muted">{c.lastWorkout}</td>
                <td className="px-4 py-3 text-muted">{c.checkIn}</td>
                <td className="tnum px-4 py-3">
                  <span className="font-semibold">{c.completion}%</span>
                </td>
                <td className="px-4 py-3"><StatusPill status={c.status} /></td>
                <td className="px-4 py-3">
                  <Link href={`/coach/clients/${c.id}`} className="text-muted hover:text-ink">
                    <ChevronRight className="size-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>

      {/* Mobile cards */}
      <div className="space-y-3 lg:hidden">
        {clients.map((c) => (
          <Link key={c.id} href={`/coach/clients/${c.id}`}>
            <GlassCard variant="solid" className="p-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{c.name}</p>
                <StatusPill status={c.status} />
              </div>
              <p className="mt-1 text-sm text-muted">{c.programme}</p>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-faint">
                <span className="tnum">{t.weekShort} {c.currentWeek}/{c.totalWeeks}</span>
                <span>{t.last}: {c.lastWorkout}</span>
                <span>{t.checkIn}: {c.checkIn}</span>
                <span className="tnum">{c.completion}% {t.completionSuffix}</span>
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
