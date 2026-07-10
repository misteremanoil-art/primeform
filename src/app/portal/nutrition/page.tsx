"use client";

import { Download, Info } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { PortalHeader } from "@/components/portal/portal-header";
import { usePrimeStore } from "@/lib/store/store";
import { toast } from "@/lib/store/hooks";

const meals = [
  { title: "Breakfast", structure: "Protein source + fruit + carbohydrate source.", example: "Greek yoghurt, berries, oats and honey." },
  { title: "Lunch", structure: "Lean protein + vegetables + carbohydrate source.", example: "Chicken, rice and mixed vegetables." },
  { title: "Dinner", structure: "Protein source + vegetables + preferred carbohydrate or fat source.", example: "Salmon, potatoes and salad." },
  { title: "Snack", structure: "Protein-focused option.", example: "Protein shake, fruit or cottage cheese." },
];

export default function NutritionPage() {
  const n = usePrimeStore((s) => s.nutrition);

  const targets = [
    { label: "Calories", value: n.calories.toLocaleString("en-GB"), unit: "kcal", accent: true },
    { label: "Protein", value: String(n.protein), unit: "g" },
    { label: "Carbohydrates", value: String(n.carbs), unit: "g" },
    { label: "Fat", value: String(n.fat), unit: "g" },
    { label: "Fibre", value: n.fibre, unit: "" },
    { label: "Water", value: String(n.water), unit: "L" },
  ];

  return (
    <div className="mx-auto max-w-4xl">
      <PortalHeader title="Nutrition targets" />

      {/* Daily target */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {targets.map((t) => (
          <GlassCard key={t.label} variant="solid" className="p-4">
            <p className={`tnum font-heading text-2xl font-bold ${t.accent ? "text-accent" : ""}`}>
              {t.value}
              {t.unit && <span className="ml-1 text-xs font-medium text-muted">{t.unit}</span>}
            </p>
            <p className="mt-1 text-xs text-muted">{t.label}</p>
          </GlassCard>
        ))}
      </div>

      {/* Coach note */}
      <GlassCard variant="standard" className="mt-4 flex items-start gap-3 p-5">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent/12 text-accent">
          <Info className="size-5" strokeWidth={1.7} />
        </span>
        <div>
          <p className="text-[0.62rem] font-bold uppercase tracking-widest text-accent">Coach note</p>
          <p className="mt-1 text-sm leading-relaxed">{n.coachNote}</p>
        </div>
      </GlassCard>

      {/* Meal structure */}
      <h2 className="mt-8 text-lg font-bold">Meal structure examples</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {meals.map((m) => (
          <GlassCard key={m.title} variant="solid" className="p-6">
            <h3 className="text-base font-bold">{m.title}</h3>
            <p className="mt-2 text-sm text-muted">{m.structure}</p>
            <p className="mt-3 rounded-md bg-ink/5 px-3 py-2 text-sm">
              <span className="font-semibold">Example: </span>
              {m.example}
            </p>
          </GlassCard>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          onClick={() => toast("Download started — demo only", "The nutrition guide is a demo placeholder.")}
          className="btn btn-secondary"
        >
          <Download className="size-4" strokeWidth={1.9} />
          Download Nutrition Guide
        </button>
        <p className="text-xs text-faint">
          Nutrition information is educational and does not replace medical or clinical
          dietetic advice.
        </p>
      </div>
    </div>
  );
}
