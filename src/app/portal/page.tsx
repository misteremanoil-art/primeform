"use client";

import Link from "next/link";
import {
  ArrowRight,
  Play,
  CheckCircle2,
  TrendingUp,
  ClipboardCheck,
  MessageSquare,
  Footprints,
  GlassWater,
  Utensils,
  Moon,
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { PlateProgressRing } from "@/components/fitness/plate-progress-ring";
import { HabitChip } from "@/components/fitness/habit-chip";
import { usePrimeStore } from "@/lib/store/store";

const habitIcons: Record<string, typeof Footprints> = {
  "h-steps": Footprints,
  "h-water": GlassWater,
  "h-protein": Utensils,
  "h-sleep": Moon,
};

export default function PortalDashboard() {
  const workout = usePrimeStore((s) => s.workout);
  const habits = usePrimeStore((s) => s.habits);
  const messages = usePrimeStore((s) => s.messages);
  const checkIn = usePrimeStore((s) => s.checkIns.find((c) => c.clientId === "alex"));
  const alex = usePrimeStore((s) => s.clients.find((c) => c.id === "alex"));

  const lastCoachMsg = [...messages].reverse().find((m) => m.from === "coach");
  const dashHabits = habits.filter((h) => h.id !== "h-mobility").slice(0, 4);
  const checkinSubmitted = checkIn?.status === "Submitted" || checkIn?.status === "Needs Review" || checkIn?.status === "Reviewed";

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold sm:text-3xl">Good afternoon, Alex.</h1>
        <p className="mt-1.5 text-muted">
          You have completed three of four scheduled workouts this week. Your next
          check-in is due on Sunday.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Today's workout */}
        <GlassCard
          variant="solid"
          className={workout.completed ? "border-olive/40 p-6" : "p-6"}
        >
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-accent">
            Today&rsquo;s workout
          </p>
          <h2 className="mt-1 text-xl font-bold">{workout.title}</h2>
          <p className="tnum mt-1 text-sm text-muted">
            Estimated duration: {workout.durationMin} minutes · {workout.exercises.length} exercises
          </p>
          {workout.completed ? (
            <div className="mt-5 flex items-center gap-2 rounded-md bg-olive/12 px-4 py-3 text-olive">
              <CheckCircle2 className="size-5" strokeWidth={1.9} />
              <span className="text-sm font-semibold">Completed. Strong work.</span>
            </div>
          ) : (
            <Link href="/portal/workout" className="btn btn-primary mt-5">
              <Play className="size-4 fill-current" strokeWidth={0} />
              Start Workout
            </Link>
          )}
        </GlassCard>

        {/* Current progress */}
        <GlassCard variant="solid" className="p-6">
          <div className="flex items-center gap-4">
            <PlateProgressRing value={91} size={92} strokeWidth={9} label="91%" />
            <div>
              <p className="tnum text-2xl font-bold text-olive">
                {(96.4 - (alex?.currentWeight ?? 89.8)).toFixed(1)} kg lost
              </p>
              <p className="text-sm text-muted">91% workout completion</p>
              <p className="text-sm text-muted">7-week consistency streak</p>
            </div>
          </div>
          <Link href="/portal/progress" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-ink">
            View Progress <ArrowRight className="size-4" strokeWidth={2} />
          </Link>
        </GlassCard>

        {/* Weekly check-in */}
        <GlassCard variant="solid" className="p-6">
          <div className="flex items-center gap-2 text-accent">
            <ClipboardCheck className="size-5" strokeWidth={1.7} />
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em]">Weekly check-in</p>
          </div>
          <p className="mt-2 text-lg font-bold">
            {checkinSubmitted ? "Submitted this week" : "Due in 3 days"}
          </p>
          <Link
            href="/portal/checkin"
            className="btn btn-secondary mt-4 h-10 min-h-0 px-4 py-0 text-sm"
          >
            {checkinSubmitted ? "View Check-In" : "Complete Check-In"}
          </Link>
        </GlassCard>

        {/* Daily habits */}
        <GlassCard variant="solid" className="p-6">
          <div className="flex items-center gap-2 text-accent">
            <TrendingUp className="size-5" strokeWidth={1.7} />
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em]">Daily habits</p>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {dashHabits.map((h) => (
              <HabitChip
                key={h.id}
                icon={habitIcons[h.id] ?? Footprints}
                label={h.targetLabel}
                value={h.today}
                target={h.target}
                unit={h.unit === "steps" ? "" : h.unit}
              />
            ))}
          </div>
          <Link href="/portal/habits" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-ink">
            Update Habits <ArrowRight className="size-4" strokeWidth={2} />
          </Link>
        </GlassCard>

        {/* Coach message */}
        <GlassCard variant="standard" className="p-6 md:col-span-2">
          <div className="flex items-center gap-2 text-accent">
            <MessageSquare className="size-5" strokeWidth={1.7} />
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em]">Coach message</p>
          </div>
          <p className="mt-3 text-lg leading-relaxed">
            &ldquo;{lastCoachMsg?.text}&rdquo;
          </p>
          <Link href="/portal/messages" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-ink">
            Open Messages <ArrowRight className="size-4" strokeWidth={2} />
          </Link>
        </GlassCard>
      </div>
    </div>
  );
}
