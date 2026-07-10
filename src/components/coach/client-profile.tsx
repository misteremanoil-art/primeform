"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  MessageSquare,
  Dumbbell,
  Target,
  ClipboardCheck,
  StickyNote,
  Pause,
  Archive,
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { StatusPill } from "@/components/fitness/status-pill";
import { WeightChart } from "@/components/fitness/weight-chart";
import { TextArea } from "@/components/ui/form";
import { usePrimeStore } from "@/lib/store/store";
import { toast } from "@/lib/store/hooks";
import { cn } from "@/lib/utils";

const tabs = ["Overview", "Workouts", "Progress", "Check-Ins", "Habits", "Messages", "Notes"] as const;
type Tab = (typeof tabs)[number];

export function ClientProfile({ clientId }: { clientId: string }) {
  const client = usePrimeStore((s) => s.clients.find((c) => c.id === clientId));
  const workout = usePrimeStore((s) => s.workout);
  const progress = usePrimeStore((s) => s.progress);
  const habits = usePrimeStore((s) => s.habits);
  const messages = usePrimeStore((s) => s.messages);
  const checkIn = usePrimeStore((s) => s.checkIns.find((c) => c.clientId === clientId));
  const updateClientNote = usePrimeStore((s) => s.updateClientNote);
  const updateClientStatus = usePrimeStore((s) => s.updateClientStatus);

  const [tab, setTab] = useState<Tab>("Overview");
  const [note, setNote] = useState(client?.privateNote ?? "");

  if (!client) {
    return (
      <div className="mx-auto max-w-3xl py-16 text-center">
        <p className="text-lg font-semibold">Client not found.</p>
        <Link href="/coach/clients" className="btn btn-secondary mt-5">Back to clients</Link>
      </div>
    );
  }

  const isAlex = client.id === "alex";
  const weightLost = client.startWeight && client.currentWeight
    ? (client.startWeight - client.currentWeight).toFixed(1)
    : null;

  const actions = [
    { icon: MessageSquare, label: "Send message", onClick: () => toast("Message sent — demo only") },
    { icon: Dumbbell, label: "Assign programme", href: "/coach/programs" },
    { icon: Target, label: "Adjust targets", onClick: () => toast("Targets updated — demo only") },
    { icon: ClipboardCheck, label: "Review check-in", href: "/coach/checkins" },
    { icon: StickyNote, label: "Add private note", onClick: () => setTab("Notes") },
    { icon: Pause, label: "Pause coaching", onClick: () => { updateClientStatus(client.id, "Paused"); toast("Coaching paused"); } },
    { icon: Archive, label: "Archive client", onClick: () => { updateClientStatus(client.id, "Archived"); toast("Client archived"); } },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <Link href="/coach/clients" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink">
        <ArrowLeft className="size-4" strokeWidth={2} /> Clients
      </Link>

      {/* Header */}
      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">{client.name}</h1>
          <p className="tnum mt-1 text-muted">
            {client.service} · Week {client.currentWeek} of {client.totalWeeks}
          </p>
        </div>
        <StatusPill status={client.status} />
      </div>

      {/* Summary */}
      <GlassCard variant="solid" className="mt-5 p-5">
        <p className="text-sm text-muted">Goal</p>
        <p className="font-semibold">{client.goal}.</p>
        {isAlex && (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Metric value={`${weightLost} kg`} label="lost" tone />
            <Metric value="8 cm" label="waist reduction" tone />
            <Metric value={`${client.completion}%`} label="workout completion" />
            <Metric value="7-week" label="activity streak" />
          </div>
        )}
      </GlassCard>

      {/* Actions */}
      <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
        {actions.map((a) =>
          a.href ? (
            <Link key={a.label} href={a.href} className="flex shrink-0 items-center gap-1.5 rounded-full border border-line px-3.5 py-2 text-sm font-medium text-muted hover:text-ink">
              <a.icon className="size-4" strokeWidth={1.8} /> {a.label}
            </Link>
          ) : (
            <button key={a.label} onClick={a.onClick} className="flex shrink-0 items-center gap-1.5 rounded-full border border-line px-3.5 py-2 text-sm font-medium text-muted hover:text-ink">
              <a.icon className="size-4" strokeWidth={1.8} /> {a.label}
            </button>
          ),
        )}
      </div>

      {/* Tabs */}
      <div className="no-scrollbar mt-6 flex gap-1 overflow-x-auto border-b border-line">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "shrink-0 border-b-2 px-3.5 py-2.5 text-sm font-medium transition-colors",
              tab === t ? "border-accent text-ink" : "border-transparent text-muted hover:text-ink",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-5">
        {tab === "Overview" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <GlassCard variant="solid" className="p-5">
              <p className="text-[0.62rem] font-bold uppercase tracking-widest text-accent">Today&rsquo;s workout</p>
              <p className="mt-1 font-semibold">{isAlex ? workout.title : "Scheduled session"}</p>
              <div className="mt-2">
                {isAlex && workout.completed ? (
                  <span className="inline-flex items-center gap-1.5 text-sm text-olive"><CheckCircle2 className="size-4" /> Completed today</span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-sm text-muted"><Circle className="size-4" /> Not yet completed</span>
                )}
              </div>
            </GlassCard>
            <GlassCard variant="solid" className="p-5">
              <p className="text-[0.62rem] font-bold uppercase tracking-widest text-accent">Latest check-in</p>
              <p className="mt-1 font-semibold">{checkIn?.weekLabel ?? client.checkIn}</p>
              <div className="mt-2"><StatusPill status={checkIn?.status ?? "Upcoming"} /></div>
            </GlassCard>
          </div>
        )}

        {tab === "Workouts" && (
          isAlex ? (
            <GlassCard variant="solid" className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{workout.title}</p>
                  <p className="tnum text-sm text-muted">Week {workout.week}, Session {workout.session}</p>
                </div>
                <StatusPill status={workout.completed ? "Completed" : "Pending"} />
              </div>
              <ul className="mt-4 space-y-2">
                {workout.exercises.map((ex) => {
                  const done = ex.logs.filter((l) => l.done).length;
                  return (
                    <li key={ex.id} className="flex items-center justify-between rounded-md border border-line px-3.5 py-2.5 text-sm">
                      <span>{ex.name}</span>
                      <span className="tnum text-muted">{done}/{ex.sets} sets logged</span>
                    </li>
                  );
                })}
              </ul>
            </GlassCard>
          ) : <Placeholder text="Detailed workout logs are populated for the Alex demo client." />
        )}

        {tab === "Progress" && (
          isAlex ? (
            <GlassCard variant="solid" className="p-5">
              <p className="font-semibold">Body weight trend</p>
              <div className="mt-3"><WeightChart data={[...progress].reverse().map((p) => ({ date: p.date, weight: p.weight }))} height={200} /></div>
            </GlassCard>
          ) : <Placeholder text="Progress data is populated for the Alex demo client." />
        )}

        {tab === "Check-Ins" && (
          <GlassCard variant="solid" className="p-5">
            <div className="flex items-center justify-between">
              <p className="font-semibold">{checkIn?.weekLabel ?? client.checkIn}</p>
              <StatusPill status={checkIn?.status ?? "Upcoming"} />
            </div>
            {checkIn?.overall != null ? (
              <div className="mt-4 grid grid-cols-3 gap-3 text-center sm:grid-cols-5">
                <Score label="Overall" value={checkIn.overall} />
                <Score label="Nutrition" value={checkIn.nutrition} />
                <Score label="Energy" value={checkIn.energy} />
                <Score label="Sleep" value={checkIn.sleep} />
                <Score label="Stress" value={checkIn.stress} />
              </div>
            ) : (
              <p className="mt-3 text-sm text-muted">No submitted answers yet.</p>
            )}
            <Link href="/coach/checkins" className="mt-4 inline-flex text-sm font-semibold text-accent hover:text-ink">Open review queue →</Link>
          </GlassCard>
        )}

        {tab === "Habits" && (
          isAlex ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {habits.map((h) => (
                <GlassCard key={h.id} variant="solid" className="p-4">
                  <p className="font-semibold">{h.label}</p>
                  <p className="tnum mt-1 text-sm text-muted">Weekly completion: {h.weeklyCompleted} of {h.weeklyTotal} days</p>
                </GlassCard>
              ))}
            </div>
          ) : <Placeholder text="Habit data is populated for the Alex demo client." />
        )}

        {tab === "Messages" && (
          isAlex ? (
            <GlassCard variant="solid" className="space-y-3 p-5">
              {messages.map((m) => (
                <div key={m.id} className={cn("max-w-[80%] rounded-2xl px-4 py-2.5 text-sm", m.from === "coach" ? "ml-auto rounded-br-sm bg-accent text-accent-ink" : "rounded-bl-sm border border-line")}>
                  {m.text}
                </div>
              ))}
            </GlassCard>
          ) : <Placeholder text="The conversation is populated for the Alex demo client." />
        )}

        {tab === "Notes" && (
          <GlassCard variant="solid" className="p-5">
            <p className="text-[0.62rem] font-bold uppercase tracking-widest text-muted">Coach private note</p>
            <TextArea className="mt-2" rows={5} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Private notes visible only to you…" />
            <button onClick={() => { updateClientNote(client.id, note); toast("Private note saved"); }} className="btn btn-primary mt-3 h-10 min-h-0 px-4 py-0 text-sm">
              Save note
            </button>
          </GlassCard>
        )}
      </div>
    </div>
  );
}

function Metric({ value, label, tone }: { value: string; label: string; tone?: boolean }) {
  return (
    <div>
      <p className={cn("tnum font-heading text-2xl font-bold", tone && "text-olive")}>{value}</p>
      <p className="text-xs text-muted">{label}</p>
    </div>
  );
}
function Score({ label, value }: { label: string; value?: number }) {
  return (
    <div className="rounded-md border border-line py-3">
      <p className="tnum text-xl font-bold">{value ?? "—"}</p>
      <p className="text-[0.62rem] uppercase tracking-wide text-muted">{label}</p>
    </div>
  );
}
function Placeholder({ text }: { text: string }) {
  return (
    <div className="rounded-card border border-dashed border-line py-14 text-center text-sm text-muted">
      {text}
    </div>
  );
}
