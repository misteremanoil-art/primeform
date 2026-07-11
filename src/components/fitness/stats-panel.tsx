"use client";

import Link from "next/link";
import { Flame, Play, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import { GlassCard } from "@/components/ui/glass-card";
import { PlateProgressRing } from "./plate-progress-ring";
import { WeeklyTracker } from "./weekly-tracker";
import { AnimatedNumber } from "./animated-number";
import { DemoDisclosure } from "./demo-disclosure";
import { seedWorkout, weekActivity } from "@/lib/store/seed";

const copy = {
  en: {
    week: "Your Week",
    completed: "completed",
    progress: "progress",
    weeks: "weeks",
    streak: "streak",
    consistency: "Workout consistency",
    today: "Today",
    exercises: "exercises",
    min: "min",
    start: "Start",
  },
  ro: {
    week: "Săptămâna ta",
    completed: "finalizat",
    progress: "progres",
    weeks: "săptămâni",
    streak: "serie",
    consistency: "Constanța antrenamentelor",
    today: "Astăzi",
    exercises: "exerciții",
    min: "min",
    start: "Începe",
  },
} as const;

/**
 * THE signature element. Week 7/12, plate-ring 91%, −6.6 kg, 7-week gold
 * streak, weekly consistency dots and the solid inner workout card with an
 * orange START. Reused in the hero, the portal-preview section and the client
 * dashboard — one component, density props, one source of truth.
 */
export function StatsPanel({
  density = "default",
  startHref = "/portal/workout",
  showDisclosure = true,
  className,
}: {
  density?: "default" | "compact";
  startHref?: string;
  showDisclosure?: boolean;
  className?: string;
}) {
  const { lang } = useI18n();
  const t = copy[lang];
  const compact = density === "compact";
  const ringSize = compact ? 108 : 128;

  return (
    <GlassCard
      variant="standard"
      className={cn(
        "w-full rounded-hero",
        compact ? "p-5" : "p-6 sm:p-7",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="eyebrow">{t.week}</span>
        <span className="tnum font-heading text-lg font-bold">
          7 <span className="text-muted">/ 12</span>
        </span>
      </div>

      {/* Metrics */}
      <div className="mt-5 flex items-center gap-5">
        <PlateProgressRing
          value={91}
          size={ringSize}
          label="91%"
          sublabel={t.completed}
          className="shrink-0"
        />
        <div className="flex-1 space-y-4">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="tnum font-heading text-3xl font-bold text-ink">
                −<AnimatedNumber value={6.6} decimals={1} />
              </span>
              <span className="text-sm font-medium text-muted">kg</span>
              <TrendingDown className="size-4 text-olive" strokeWidth={2} />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              {t.progress}
            </p>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="tnum font-heading text-3xl font-bold text-[color:var(--gold)]">
                <AnimatedNumber value={7} />
              </span>
              <span className="text-sm font-medium text-muted">{t.weeks}</span>
              <Flame className="size-4 text-[color:var(--gold)]" strokeWidth={2} />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              {t.streak}
            </p>
          </div>
        </div>
      </div>

      {/* Consistency */}
      <div className="mt-6">
        <p className="eyebrow mb-2.5">{t.consistency}</p>
        <WeeklyTracker days={weekActivity} activeIndex={6} />
      </div>

      {/* Inner solid workout card */}
      <div className="surface-card mt-5 flex items-center gap-3 p-4">
        <div className="min-w-0 flex-1">
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-accent">
            {t.today}
          </p>
          <p className="mt-0.5 truncate font-heading text-base font-bold">
            {seedWorkout.title}
          </p>
          <p className="tnum text-xs text-muted">
            {seedWorkout.exercises.length} {t.exercises} · {seedWorkout.durationMin} {t.min}
          </p>
        </div>
        <Link
          href={startHref}
          className="btn btn-primary h-11 min-h-0 shrink-0 px-5 py-0 text-sm"
        >
          <Play className="size-4 fill-current" strokeWidth={0} />
          {t.start}
        </Link>
      </div>

      {showDisclosure && <DemoDisclosure className="mt-4" />}
    </GlassCard>
  );
}
