"use client";

import Link from "next/link";
import { ArrowRight, Users, Inbox, CalendarDays, ClipboardCheck, Activity, Wallet } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { DemoDisclosure } from "@/components/fitness/demo-disclosure";
import { usePrimeStore } from "@/lib/store/store";
import { coachKpis } from "@/lib/store/seed";
import { cn } from "@/lib/utils";

const toneDot: Record<string, string> = {
  accent: "bg-accent",
  olive: "bg-olive",
  clay: "bg-clay",
  gold: "bg-gold",
};

export default function CoachOverview() {
  const attention = usePrimeStore((s) => s.attention);
  const leads = usePrimeStore((s) => s.leads);

  const newLeads = leads.filter((l) => l.status === "New").length;

  const kpis = [
    { icon: Users, label: "Active Clients", value: coachKpis.activeClients },
    { icon: Inbox, label: "New Leads", value: Math.max(coachKpis.newLeadsOverview, newLeads) },
    { icon: CalendarDays, label: "Consultations This Week", value: coachKpis.consultationsThisWeek },
    { icon: ClipboardCheck, label: "Pending Check-Ins", value: coachKpis.pendingCheckIns },
    { icon: Activity, label: "Workout Completion", value: `${coachKpis.workoutCompletion}%` },
    { icon: Wallet, label: "Monthly Demo Revenue", value: `€${coachKpis.monthlyRevenue.toLocaleString("en-GB")}` },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold sm:text-3xl">Good afternoon, Daniel.</h1>
        <p className="mt-1.5 text-muted">
          You have three client actions and two consultations requiring attention today.
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
      <DemoDisclosure className="mt-3">Financial and performance data are fictional.</DemoDisclosure>

      {/* Attention feed */}
      <h2 className="mt-8 text-lg font-bold">Needs your attention</h2>
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
