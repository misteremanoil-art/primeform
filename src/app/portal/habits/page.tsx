"use client";

import { Footprints, GlassWater, Utensils, Moon, Activity } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { PortalHeader } from "@/components/portal/portal-header";
import { PlateProgressRing } from "@/components/fitness/plate-progress-ring";
import { usePrimeStore } from "@/lib/store/store";
import { toast } from "@/lib/store/hooks";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

const meta: Record<string, { icon: typeof Footprints; step: number }> = {
  "h-steps": { icon: Footprints, step: 250 },
  "h-water": { icon: GlassWater, step: 0.1 },
  "h-protein": { icon: Utensils, step: 5 },
  "h-sleep": { icon: Moon, step: 0.5 },
  "h-mobility": { icon: Activity, step: 1 },
};

const fmt = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1));

const copy = {
  en: {
    title: "Daily habits",
    intro:
      "Small actions completed consistently create the conditions for better progress.",
    today: "Today",
    days: (done: number, total: number) => `${done} of ${total} days`,
    setAria: (label: string) => `Set ${label}`,
    saved: "Today's habits have been updated.",
    save: "Save Today's Habits",
  },
  ro: {
    title: "Obiceiuri zilnice",
    intro:
      "Acțiunile mici, făcute constant, creează condițiile pentru un progres mai bun.",
    today: "Astăzi",
    days: (done: number, total: number) => `${done} din ${total} zile`,
    setAria: (label: string) => `Setează ${label}`,
    saved: "Obiceiurile de azi au fost actualizate.",
    save: "Salvează obiceiurile de azi",
  },
} as const;

export default function HabitsPage() {
  const habits = usePrimeStore((s) => s.habits);
  const updateHabit = usePrimeStore((s) => s.updateHabit);
  const saveHabits = usePrimeStore((s) => s.saveHabits);
  const { lang } = useI18n();
  const t = copy[lang];

  const save = () => {
    saveHabits();
    toast(t.saved, undefined, "success");
  };

  return (
    <div className="mx-auto max-w-3xl">
      <PortalHeader title={t.title}>{t.intro}</PortalHeader>

      <div className="space-y-4">
        {habits.map((h) => {
          const { icon: Icon, step } = meta[h.id] ?? { icon: Activity, step: 1 };
          const pct = h.target > 0 ? Math.min(100, (h.today / h.target) * 100) : 0;
          const complete = h.today >= h.target;
          return (
            <GlassCard key={h.id} variant="solid" className="p-5">
              <div className="flex items-center gap-4">
                <PlateProgressRing
                  value={pct}
                  size={72}
                  strokeWidth={8}
                  tone={complete ? "olive" : "accent"}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <Icon className="size-4 text-muted" strokeWidth={1.8} />
                    <p className="font-semibold">{h.label}</p>
                  </div>
                  <p className="tnum mt-0.5 text-sm text-muted">
                    {t.today}: {fmt(h.today)} / {fmt(h.target)}{" "}
                    {h.unit !== "steps" ? h.unit : ""}
                  </p>
                  {/* Weekly completion dots */}
                  <div className="mt-2 flex items-center gap-1.5">
                    {Array.from({ length: h.weeklyTotal }).map((_, i) => (
                      <span
                        key={i}
                        className={cn(
                          "size-2.5 rounded-full",
                          i < h.weeklyCompleted ? "bg-olive" : "border border-line",
                        )}
                      />
                    ))}
                    <span className="ml-1.5 text-xs text-faint">
                      {t.days(h.weeklyCompleted, h.weeklyTotal)}
                    </span>
                  </div>
                </div>
              </div>
              <input
                type="range"
                min={0}
                max={h.target}
                step={step}
                value={h.today}
                onChange={(e) => updateHabit(h.id, Number(e.target.value))}
                className="mt-4 w-full accent-[var(--accent)]"
                aria-label={t.setAria(h.targetLabel)}
              />
            </GlassCard>
          );
        })}
      </div>

      <button onClick={save} className="btn btn-primary mt-6 w-full sm:w-auto">
        {t.save}
      </button>
    </div>
  );
}
