import { Dumbbell, Utensils, ClipboardCheck } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";
import { SetTracker } from "@/components/fitness/set-tracker";
import { SectionHeader } from "./section-header";
import { seedNutrition } from "@/lib/store/seed";

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted">{label}</span>
        <span className="tnum font-semibold text-ink">{value} / 10</span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-ink/8">
        <div
          className="h-full rounded-full bg-olive"
          style={{ width: `${value * 10}%` }}
        />
      </div>
    </div>
  );
}

export function CoachingSystem() {
  return (
    <section className="container-p section">
      <SectionHeader
        eyebrow="The PRIMEFORM system"
        title="Everything you need to train, improve and stay consistent."
      />

      <div className="mt-12 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        {/* Personalised training — large cell */}
        <Reveal>
          <GlassCard variant="solid" className="flex h-full flex-col p-6 sm:p-8">
            <div className="flex items-center gap-2 text-accent">
              <Dumbbell className="size-5" strokeWidth={1.7} />
              <span className="eyebrow text-accent">Personalised training</span>
            </div>
            <h3 className="mt-3 text-2xl font-bold">Training built around you</h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
              Your programme is based on your goal, experience, available equipment,
              schedule and recovery. Each exercise includes clear instructions, target
              repetitions, rest periods and progression guidance.
            </p>

            {/* Live workout preview */}
            <div className="mt-6 rounded-card border border-line bg-bg/40 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Incline Dumbbell Press</p>
                  <p className="tnum text-xs text-muted">
                    4 sets · 8–10 reps · 90s rest
                  </p>
                </div>
                <span className="pill border-line text-muted">
                  <span className="tnum">26 kg</span>
                </span>
              </div>
              <div className="mt-4">
                <SetTracker total={4} done={2} active={2} />
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-muted">
                  <span>Exercise progression</span>
                  <span className="tnum font-semibold text-olive">+8%</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-ink/8">
                  <div className="h-full w-[68%] rounded-full bg-accent" />
                </div>
              </div>
            </div>
          </GlassCard>
        </Reveal>

        <div className="grid gap-5">
          {/* Nutrition */}
          <Reveal delay={0.08}>
            <GlassCard variant="solid" className="h-full p-6">
              <div className="flex items-center gap-2 text-accent">
                <Utensils className="size-5" strokeWidth={1.7} />
                <span className="eyebrow text-accent">Nutrition</span>
              </div>
              <h3 className="mt-3 text-xl font-bold">Nutrition that fits real life</h3>
              <div className="mt-4 flex gap-6">
                <div>
                  <p className="tnum font-heading text-3xl font-bold">
                    {seedNutrition.calories.toLocaleString("en-GB")}
                  </p>
                  <p className="text-xs uppercase tracking-wide text-muted">kcal</p>
                </div>
                <div>
                  <p className="tnum font-heading text-3xl font-bold">
                    {seedNutrition.protein} g
                  </p>
                  <p className="text-xs uppercase tracking-wide text-muted">protein</p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Calorie and macronutrient targets, meal structure guidance and
                practical adjustments without removing every food you enjoy.
              </p>
            </GlassCard>
          </Reveal>

          {/* Weekly review */}
          <Reveal delay={0.16}>
            <GlassCard variant="solid" className="h-full p-6">
              <div className="flex items-center gap-2 text-accent">
                <ClipboardCheck className="size-5" strokeWidth={1.7} />
                <span className="eyebrow text-accent">Weekly review</span>
              </div>
              <h3 className="mt-3 text-xl font-bold">Weekly accountability</h3>
              <div className="mt-4 space-y-3">
                <ScoreBar label="Energy" value={8} />
                <ScoreBar label="Sleep" value={7} />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                The plan changes when your data shows that it needs to change.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
