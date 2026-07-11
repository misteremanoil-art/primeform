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
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const tabs = ["Overview", "Workouts", "Progress", "Check-Ins", "Habits", "Messages", "Notes"] as const;
type Tab = (typeof tabs)[number];

const copy = {
  en: {
    notFound: "Client not found.",
    backToClients: "Back to clients",
    week: "Week",
    of: "of",
    session: "Session",
    goal: "Goal",
    lost: "lost",
    waistReduction: "waist reduction",
    workoutCompletion: "workout completion",
    activityStreakValue: "7-week",
    activityStreak: "activity streak",
    todaysWorkout: "Today’s workout",
    scheduledSession: "Scheduled session",
    completedToday: "Completed today",
    notCompleted: "Not yet completed",
    latestCheckin: "Latest check-in",
    setsLogged: "sets logged",
    workoutsPlaceholder: "Detailed workout logs are populated for the Alex demo client.",
    bodyWeightTrend: "Body weight trend",
    progressPlaceholder: "Progress data is populated for the Alex demo client.",
    overall: "Overall",
    nutrition: "Nutrition",
    energy: "Energy",
    sleep: "Sleep",
    stress: "Stress",
    noAnswers: "No submitted answers yet.",
    openReviewQueue: "Open review queue →",
    weeklyCompletion: "Weekly completion",
    days: "days",
    habitsPlaceholder: "Habit data is populated for the Alex demo client.",
    messagesPlaceholder: "The conversation is populated for the Alex demo client.",
    privateNoteHeading: "Coach private note",
    privateNotePlaceholder: "Private notes visible only to you…",
    saveNote: "Save note",
    noteSaved: "Private note saved",
    // actions
    sendMessage: "Send message",
    assignProgramme: "Assign programme",
    adjustTargets: "Adjust targets",
    reviewCheckin: "Review check-in",
    addNote: "Add private note",
    pauseCoaching: "Pause coaching",
    archiveClient: "Archive client",
    messageSent: "Message sent — demo only",
    targetsUpdated: "Targets updated — demo only",
    coachingPaused: "Coaching paused",
    clientArchived: "Client archived",
    // tabs
    tabOverview: "Overview",
    tabWorkouts: "Workouts",
    tabProgress: "Progress",
    tabCheckins: "Check-Ins",
    tabHabits: "Habits",
    tabMessages: "Messages",
    tabNotes: "Notes",
  },
  ro: {
    notFound: "Clientul nu a fost găsit.",
    backToClients: "Înapoi la clienți",
    week: "Săptămâna",
    of: "din",
    session: "Sesiunea",
    goal: "Obiectiv",
    lost: "pierdute",
    waistReduction: "reducere talie",
    workoutCompletion: "finalizare antrenamente",
    activityStreakValue: "7 săptămâni",
    activityStreak: "serie de activitate",
    todaysWorkout: "Antrenamentul de azi",
    scheduledSession: "Sesiune programată",
    completedToday: "Finalizat astăzi",
    notCompleted: "Încă nefinalizat",
    latestCheckin: "Ultimul check-in",
    setsLogged: "seturi înregistrate",
    workoutsPlaceholder: "Jurnalele detaliate de antrenament sunt disponibile pentru clientul demo Alex.",
    bodyWeightTrend: "Evoluția greutății corporale",
    progressPlaceholder: "Datele de progres sunt disponibile pentru clientul demo Alex.",
    overall: "General",
    nutrition: "Nutriție",
    energy: "Energie",
    sleep: "Somn",
    stress: "Stres",
    noAnswers: "Niciun răspuns trimis încă.",
    openReviewQueue: "Deschide coada de verificare →",
    weeklyCompletion: "Finalizare săptămânală",
    days: "zile",
    habitsPlaceholder: "Datele despre obiceiuri sunt disponibile pentru clientul demo Alex.",
    messagesPlaceholder: "Conversația este disponibilă pentru clientul demo Alex.",
    privateNoteHeading: "Notă privată a antrenorului",
    privateNotePlaceholder: "Note private, vizibile doar pentru tine…",
    saveNote: "Salvează nota",
    noteSaved: "Notă privată salvată",
    // actions
    sendMessage: "Trimite mesaj",
    assignProgramme: "Atribuie program",
    adjustTargets: "Ajustează obiectivele",
    reviewCheckin: "Verifică check-in-ul",
    addNote: "Adaugă notă privată",
    pauseCoaching: "Suspendă coaching-ul",
    archiveClient: "Arhivează clientul",
    messageSent: "Mesaj trimis — doar demo",
    targetsUpdated: "Obiective actualizate — doar demo",
    coachingPaused: "Coaching suspendat",
    clientArchived: "Client arhivat",
    // tabs
    tabOverview: "Prezentare",
    tabWorkouts: "Antrenamente",
    tabProgress: "Progres",
    tabCheckins: "Check-in-uri",
    tabHabits: "Obiceiuri",
    tabMessages: "Mesaje",
    tabNotes: "Note",
  },
} as const;

const tabLabelKey: Record<Tab, keyof (typeof copy)["en"]> = {
  Overview: "tabOverview",
  Workouts: "tabWorkouts",
  Progress: "tabProgress",
  "Check-Ins": "tabCheckins",
  Habits: "tabHabits",
  Messages: "tabMessages",
  Notes: "tabNotes",
};

export function ClientProfile({ clientId }: { clientId: string }) {
  const { lang } = useI18n();
  const t = copy[lang];
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
        <p className="text-lg font-semibold">{t.notFound}</p>
        <Link href="/coach/clients" className="btn btn-secondary mt-5">{t.backToClients}</Link>
      </div>
    );
  }

  const isAlex = client.id === "alex";
  const weightLost = client.startWeight && client.currentWeight
    ? (client.startWeight - client.currentWeight).toFixed(1)
    : null;

  const actions = [
    { icon: MessageSquare, label: t.sendMessage, onClick: () => toast(t.messageSent) },
    { icon: Dumbbell, label: t.assignProgramme, href: "/coach/programs" },
    { icon: Target, label: t.adjustTargets, onClick: () => toast(t.targetsUpdated) },
    { icon: ClipboardCheck, label: t.reviewCheckin, href: "/coach/checkins" },
    { icon: StickyNote, label: t.addNote, onClick: () => setTab("Notes") },
    { icon: Pause, label: t.pauseCoaching, onClick: () => { updateClientStatus(client.id, "Paused"); toast(t.coachingPaused); } },
    { icon: Archive, label: t.archiveClient, onClick: () => { updateClientStatus(client.id, "Archived"); toast(t.clientArchived); } },
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
            {client.service} · {t.week} {client.currentWeek} {t.of} {client.totalWeeks}
          </p>
        </div>
        <StatusPill status={client.status} />
      </div>

      {/* Summary */}
      <GlassCard variant="solid" className="mt-5 p-5">
        <p className="text-sm text-muted">{t.goal}</p>
        <p className="font-semibold">{client.goal}.</p>
        {isAlex && (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Metric value={`${weightLost} kg`} label={t.lost} tone />
            <Metric value="8 cm" label={t.waistReduction} tone />
            <Metric value={`${client.completion}%`} label={t.workoutCompletion} />
            <Metric value={t.activityStreakValue} label={t.activityStreak} />
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
        {tabs.map((tb) => (
          <button
            key={tb}
            onClick={() => setTab(tb)}
            className={cn(
              "shrink-0 border-b-2 px-3.5 py-2.5 text-sm font-medium transition-colors",
              tab === tb ? "border-accent text-ink" : "border-transparent text-muted hover:text-ink",
            )}
          >
            {t[tabLabelKey[tb]]}
          </button>
        ))}
      </div>

      <div className="mt-5">
        {tab === "Overview" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <GlassCard variant="solid" className="p-5">
              <p className="text-[0.62rem] font-bold uppercase tracking-widest text-accent">{t.todaysWorkout}</p>
              <p className="mt-1 font-semibold">{isAlex ? workout.title : t.scheduledSession}</p>
              <div className="mt-2">
                {isAlex && workout.completed ? (
                  <span className="inline-flex items-center gap-1.5 text-sm text-olive"><CheckCircle2 className="size-4" /> {t.completedToday}</span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-sm text-muted"><Circle className="size-4" /> {t.notCompleted}</span>
                )}
              </div>
            </GlassCard>
            <GlassCard variant="solid" className="p-5">
              <p className="text-[0.62rem] font-bold uppercase tracking-widest text-accent">{t.latestCheckin}</p>
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
                  <p className="tnum text-sm text-muted">{t.week} {workout.week}, {t.session} {workout.session}</p>
                </div>
                <StatusPill status={workout.completed ? "Completed" : "Pending"} />
              </div>
              <ul className="mt-4 space-y-2">
                {workout.exercises.map((ex) => {
                  const done = ex.logs.filter((l) => l.done).length;
                  return (
                    <li key={ex.id} className="flex items-center justify-between rounded-md border border-line px-3.5 py-2.5 text-sm">
                      <span>{ex.name}</span>
                      <span className="tnum text-muted">{done}/{ex.sets} {t.setsLogged}</span>
                    </li>
                  );
                })}
              </ul>
            </GlassCard>
          ) : <Placeholder text={t.workoutsPlaceholder} />
        )}

        {tab === "Progress" && (
          isAlex ? (
            <GlassCard variant="solid" className="p-5">
              <p className="font-semibold">{t.bodyWeightTrend}</p>
              <div className="mt-3"><WeightChart data={[...progress].reverse().map((p) => ({ date: p.date, weight: p.weight }))} height={200} /></div>
            </GlassCard>
          ) : <Placeholder text={t.progressPlaceholder} />
        )}

        {tab === "Check-Ins" && (
          <GlassCard variant="solid" className="p-5">
            <div className="flex items-center justify-between">
              <p className="font-semibold">{checkIn?.weekLabel ?? client.checkIn}</p>
              <StatusPill status={checkIn?.status ?? "Upcoming"} />
            </div>
            {checkIn?.overall != null ? (
              <div className="mt-4 grid grid-cols-3 gap-3 text-center sm:grid-cols-5">
                <Score label={t.overall} value={checkIn.overall} />
                <Score label={t.nutrition} value={checkIn.nutrition} />
                <Score label={t.energy} value={checkIn.energy} />
                <Score label={t.sleep} value={checkIn.sleep} />
                <Score label={t.stress} value={checkIn.stress} />
              </div>
            ) : (
              <p className="mt-3 text-sm text-muted">{t.noAnswers}</p>
            )}
            <Link href="/coach/checkins" className="mt-4 inline-flex text-sm font-semibold text-accent hover:text-ink">{t.openReviewQueue}</Link>
          </GlassCard>
        )}

        {tab === "Habits" && (
          isAlex ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {habits.map((h) => (
                <GlassCard key={h.id} variant="solid" className="p-4">
                  <p className="font-semibold">{h.label}</p>
                  <p className="tnum mt-1 text-sm text-muted">{t.weeklyCompletion}: {h.weeklyCompleted} {t.of} {h.weeklyTotal} {t.days}</p>
                </GlassCard>
              ))}
            </div>
          ) : <Placeholder text={t.habitsPlaceholder} />
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
          ) : <Placeholder text={t.messagesPlaceholder} />
        )}

        {tab === "Notes" && (
          <GlassCard variant="solid" className="p-5">
            <p className="text-[0.62rem] font-bold uppercase tracking-widest text-muted">{t.privateNoteHeading}</p>
            <TextArea className="mt-2" rows={5} value={note} onChange={(e) => setNote(e.target.value)} placeholder={t.privateNotePlaceholder} />
            <button onClick={() => { updateClientNote(client.id, note); toast(t.noteSaved); }} className="btn btn-primary mt-3 h-10 min-h-0 px-4 py-0 text-sm">
              {t.saveNote}
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
