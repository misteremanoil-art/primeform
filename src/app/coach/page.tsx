"use client";

import Link from "next/link";
import { ArrowRight, Users, Inbox, CalendarDays, ClipboardCheck, Activity, Wallet } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { DemoDisclosure } from "@/components/fitness/demo-disclosure";
import { usePrimeStore } from "@/lib/store/store";
import { coachKpis } from "@/lib/store/seed";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const toneDot: Record<string, string> = {
  accent: "bg-accent",
  olive: "bg-olive",
  clay: "bg-clay",
  gold: "bg-gold",
};

const copy = {
  en: {
    greeting: "Good afternoon, Daniel.",
    intro: "You have three client actions and two consultations requiring attention today.",
    activeClients: "Active Clients",
    newLeads: "New Leads",
    consultationsThisWeek: "Consultations This Week",
    pendingCheckIns: "Pending Check-Ins",
    workoutCompletion: "Workout Completion",
    monthlyRevenue: "Monthly Demo Revenue",
    disclosure: "Financial and performance data are fictional.",
    attention: "Needs your attention",
  },
  ro: {
    greeting: "Bună ziua, Daniel.",
    intro: "Ai trei acțiuni de client și două consultații care necesită atenție astăzi.",
    activeClients: "Clienți activi",
    newLeads: "Leaduri noi",
    consultationsThisWeek: "Consultații săptămâna aceasta",
    pendingCheckIns: "Check-in-uri în așteptare",
    workoutCompletion: "Rată de finalizare antrenamente",
    monthlyRevenue: "Venit lunar demo",
    disclosure: "Datele financiare și de performanță sunt fictive.",
    attention: "Necesită atenția ta",
  },
} as const;

export default function CoachOverview() {
  const { lang } = useI18n();
  const t = copy[lang];
  const attention = usePrimeStore((s) => s.attention);
  const leads = usePrimeStore((s) => s.leads);

  const newLeads = leads.filter((l) => l.status === "New").length;

  const kpis = [
    { icon: Users, label: t.activeClients, value: coachKpis.activeClients },
    { icon: Inbox, label: t.newLeads, value: Math.max(coachKpis.newLeadsOverview, newLeads) },
    { icon: CalendarDays, label: t.consultationsThisWeek, value: coachKpis.consultationsThisWeek },
    { icon: ClipboardCheck, label: t.pendingCheckIns, value: coachKpis.pendingCheckIns },
    { icon: Activity, label: t.workoutCompletion, value: `${coachKpis.workoutCompletion}%` },
    { icon: Wallet, label: t.monthlyRevenue, value: `€${coachKpis.monthlyRevenue.toLocaleString("en-GB")}` },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold sm:text-3xl">{t.greeting}</h1>
        <p className="mt-1.5 text-muted">
          {t.intro}
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        {kpis.map((k) => (
          <GlassCard key={k.label} variant="solid" className="p-4">
            <k.icon className="size-5 text-accent" strokeWidth={1.7} />
            <p className="tnum mt-3 font-heading text-3xl font-bold">{k.value}</p>
            <p className="mt-0.5 text-xs text-muted">{k.label}</p>
          </GlassCard>
        ))}
      </div>
      <DemoDisclosure className="mt-3">{t.disclosure}</DemoDisclosure>

      {/* Attention feed */}
      <h2 className="mt-8 text-lg font-bold">{t.attention}</h2>
      <div className="mt-4 space-y-2.5">
        {attention.map((a) => (
          <GlassCard
            key={a.id}
            variant="solid"
            className="flex flex-wrap items-center gap-3 p-4"
          >
            <span className={cn("size-2.5 shrink-0 rounded-full", toneDot[a.tone] ?? "bg-accent")} />
            <div className="min-w-0 flex-1">
              <p className="font-semibold">{a.name}</p>
              <p className="text-sm text-muted">{a.detail}</p>
            </div>
            <Link
              href={a.href}
              className="btn btn-secondary h-9 min-h-0 shrink-0 px-3.5 py-0 text-sm"
            >
              {a.action}
              <ArrowRight className="size-3.5" strokeWidth={2} />
            </Link>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
