"use client";

import { WorkoutLogger } from "@/components/portal/workout-logger";
import { PortalHeader } from "@/components/portal/portal-header";
import { usePrimeStore } from "@/lib/store/store";

export default function WorkoutPage() {
  const workout = usePrimeStore((s) => s.workout);
  return (
    <div className="mx-auto max-w-3xl">
      <PortalHeader title={workout.title}>
        Week {workout.week}, Session {workout.session} · Estimated duration{" "}
        {workout.durationMin} minutes
      </PortalHeader>
      <WorkoutLogger />
    </div>
  );
}
