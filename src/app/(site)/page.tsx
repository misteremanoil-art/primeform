import { Footprints, GlassWater, Utensils, Moon, Activity } from "lucide-react";
import {
  StatsPanel,
  TrainingHalo,
  PlateProgressRing,
  SetTracker,
  WeeklyTracker,
  PRBadge,
  HabitChip,
  BarbellTimeline,
  WeightChart,
} from "@/components/fitness";
import { GlassCard } from "@/components/ui/glass-card";
import { seedProgress, weekActivity } from "@/lib/store/seed";

// Temporary Phase-2 component showcase. Replaced by the full homepage in Phase 3.
export default function Home() {
  const chartData = [...seedProgress]
    .reverse()
    .map((p) => ({ date: p.date, weight: p.weight }));

  return (
    <section className="container-p section space-y-12">
      <div>
        <p className="eyebrow">Phase 2 · Signature components</p>
        <h1 className="mt-3 text-4xl sm:text-5xl">Fitness UI vocabulary</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <StatsPanel />
        <div className="grid place-items-center">
          <TrainingHalo size={380} value="91%" label="Weekly progress" />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <GlassCard className="grid place-items-center p-6">
          <PlateProgressRing value={91} label="91%" sublabel="completed" />
        </GlassCard>
        <GlassCard variant="solid" className="space-y-4 p-6">
          <SetTracker total={4} done={2} active={2} />
          <WeeklyTracker days={weekActivity} activeIndex={6} />
        </GlassCard>
        <PRBadge exercise="Incline Press" detail="28 kg × 9" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <HabitChip icon={Footprints} label="Steps" value={6240} target={8000} />
        <HabitChip icon={GlassWater} label="Water" value={1.8} target={2.5} unit="L" />
        <HabitChip icon={Utensils} label="Protein" value={170} target={170} unit="g" />
        <HabitChip icon={Moon} label="Sleep" value={6.8} target={7.5} unit="h" />
        <HabitChip icon={Activity} label="Mobility" value={0} target={10} unit="min" />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <GlassCard variant="solid" className="p-6">
          <p className="eyebrow mb-4">Body weight trend</p>
          <WeightChart data={chartData} />
        </GlassCard>
        <GlassCard variant="solid" className="p-6">
          <BarbellTimeline
            items={[
              { marker: "Week 0", title: "Assessment", detail: "Onboarding, goals, measurements." },
              { marker: "Week 1", title: "Foundation", detail: "Training, nutrition, first habits." },
              { marker: "Weeks 2–4", title: "Consistency", detail: "Build routine and confidence." },
            ]}
          />
        </GlassCard>
      </div>
    </section>
  );
}
