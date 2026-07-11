"use client";

import { WorkoutLogger } from "@/components/portal/workout-logger";
import { PortalHeader } from "@/components/portal/portal-header";
import { usePrimeStore } from "@/lib/store/store";
import { useI18n } from "@/lib/i18n";

const copy = {
  en: {
    subtitle: (week: number, session: number, min: number) =>
      `Week ${week}, Session ${session} · Estimated duration ${min} minutes`,
  },
  ro: {
    subtitle: (week: number, session: number, min: number) =>
      `Săptămâna ${week}, Sesiunea ${session} · Durată estimată ${min} minute`,
  },
} as const;

export default function WorkoutPage() {
  const workout = usePrimeStore((s) => s.workout);
  const { lang } = useI18n();
  const t = copy[lang];
  return (
    <div className="mx-auto max-w-3xl">
      <PortalHeader title={workout.title}>
        {t.subtitle(workout.week, workout.session, workout.durationMin)}
      </PortalHeader>
      <WorkoutLogger />
    </div>
  );
}
