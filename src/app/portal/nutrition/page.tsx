"use client";

import { Download, Info } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { PortalHeader } from "@/components/portal/portal-header";
import { usePrimeStore } from "@/lib/store/store";
import { toast } from "@/lib/store/hooks";
import { useI18n } from "@/lib/i18n";

const meals = [
  {
    title: { en: "Breakfast", ro: "Mic dejun" },
    structure: {
      en: "Protein source + fruit + carbohydrate source.",
      ro: "Sursă de proteine + fructe + sursă de carbohidrați.",
    },
    example: {
      en: "Greek yoghurt, berries, oats and honey.",
      ro: "Iaurt grecesc, fructe de pădure, ovăz și miere.",
    },
  },
  {
    title: { en: "Lunch", ro: "Prânz" },
    structure: {
      en: "Lean protein + vegetables + carbohydrate source.",
      ro: "Proteină slabă + legume + sursă de carbohidrați.",
    },
    example: {
      en: "Chicken, rice and mixed vegetables.",
      ro: "Pui, orez și legume asortate.",
    },
  },
  {
    title: { en: "Dinner", ro: "Cină" },
    structure: {
      en: "Protein source + vegetables + preferred carbohydrate or fat source.",
      ro: "Sursă de proteine + legume + sursă preferată de carbohidrați sau grăsimi.",
    },
    example: {
      en: "Salmon, potatoes and salad.",
      ro: "Somon, cartofi și salată.",
    },
  },
  {
    title: { en: "Snack", ro: "Gustare" },
    structure: {
      en: "Protein-focused option.",
      ro: "Opțiune axată pe proteine.",
    },
    example: {
      en: "Protein shake, fruit or cottage cheese.",
      ro: "Shake proteic, fructe sau brânză de vaci.",
    },
  },
] as const;

const copy = {
  en: {
    title: "Nutrition targets",
    calories: "Calories",
    protein: "Protein",
    carbs: "Carbohydrates",
    fat: "Fat",
    fibre: "Fibre",
    water: "Water",
    coachNote: "Coach note",
    mealStructure: "Meal structure examples",
    example: "Example: ",
    downloadToastTitle: "Download started — demo only",
    downloadToastBody: "The nutrition guide is a demo placeholder.",
    download: "Download Nutrition Guide",
    disclaimer:
      "Nutrition information is educational and does not replace medical or clinical dietetic advice.",
  },
  ro: {
    title: "Obiective nutriționale",
    calories: "Calorii",
    protein: "Proteine",
    carbs: "Carbohidrați",
    fat: "Grăsimi",
    fibre: "Fibre",
    water: "Apă",
    coachNote: "Notă de la antrenor",
    mealStructure: "Exemple de structură a meselor",
    example: "Exemplu: ",
    downloadToastTitle: "Descărcare începută — doar demo",
    downloadToastBody: "Ghidul de nutriție este un exemplu demonstrativ.",
    download: "Descarcă ghidul de nutriție",
    disclaimer:
      "Informațiile nutriționale au scop educativ și nu înlocuiesc sfaturile medicale sau dietetice de specialitate.",
  },
} as const;

export default function NutritionPage() {
  const n = usePrimeStore((s) => s.nutrition);
  const { lang } = useI18n();
  const t = copy[lang];

  const targets = [
    { label: t.calories, value: n.calories.toLocaleString("en-GB"), unit: "kcal", accent: true },
    { label: t.protein, value: String(n.protein), unit: "g" },
    { label: t.carbs, value: String(n.carbs), unit: "g" },
    { label: t.fat, value: String(n.fat), unit: "g" },
    { label: t.fibre, value: n.fibre, unit: "" },
    { label: t.water, value: String(n.water), unit: "L" },
  ];

  return (
    <div className="mx-auto max-w-4xl">
      <PortalHeader title={t.title} />

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
          <p className="text-[0.62rem] font-bold uppercase tracking-widest text-accent">{t.coachNote}</p>
          <p className="mt-1 text-sm leading-relaxed">{n.coachNote}</p>
        </div>
      </GlassCard>

      {/* Meal structure */}
      <h2 className="mt-8 text-lg font-bold">{t.mealStructure}</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {meals.map((m) => (
          <GlassCard key={m.title.en} variant="solid" className="p-6">
            <h3 className="text-base font-bold">{m.title[lang]}</h3>
            <p className="mt-2 text-sm text-muted">{m.structure[lang]}</p>
            <p className="mt-3 rounded-md bg-ink/5 px-3 py-2 text-sm">
              <span className="font-semibold">{t.example}</span>
              {m.example[lang]}
            </p>
          </GlassCard>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          onClick={() => toast(t.downloadToastTitle, t.downloadToastBody)}
          className="btn btn-secondary"
        >
          <Download className="size-4" strokeWidth={1.9} />
          {t.download}
        </button>
        <p className="text-xs text-faint">{t.disclaimer}</p>
      </div>
    </div>
  );
}
