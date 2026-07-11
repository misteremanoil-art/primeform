"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, X } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { DemoDisclosure } from "@/components/fitness/demo-disclosure";
import { usePrimeStore } from "@/lib/store/store";
import { toast } from "@/lib/store/hooks";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const activityLevels = [
  { key: "sedentary", factor: 1.2, label: { en: "Mostly sedentary", ro: "Preponderent sedentar" } },
  { key: "light", factor: 1.375, label: { en: "Lightly active", ro: "Ușor activ" } },
  { key: "moderate", factor: 1.55, label: { en: "Moderately active", ro: "Moderat activ" } },
  { key: "very", factor: 1.725, label: { en: "Very active", ro: "Foarte activ" } },
  { key: "high", factor: 1.9, label: { en: "Highly active", ro: "Extrem de activ" } },
] as const;

const goals = [
  { key: "lose", label: { en: "Lose body fat", ro: "Slăbire (pierdere de grăsime)" } },
  { key: "maintain", label: { en: "Maintain weight", ro: "Menținerea greutății" } },
  { key: "build", label: { en: "Build muscle", ro: "Creștere musculară" } },
] as const;

type GoalKey = (typeof goals)[number]["key"];

const copy = {
  en: {
    sex: "Sex",
    female: "Female",
    male: "Male",
    age: "Age",
    height: "Height",
    weight: "Weight",
    activityLevel: "Activity level",
    primaryGoal: "Primary goal",
    emailLabel: "Email address",
    requiredError: "This field is required.",
    emailError: "Enter a valid email address.",
    calculate: "Calculate My Target",
    resultEyebrow: "Your estimated daily target",
    maintenanceLabel: "Estimated maintenance calories",
    targetLabel: "Suggested daily target",
    proteinLabel: "Suggested protein range",
    weeklyLabel: "Estimated weekly change",
    stable: "Approximately stable",
    perWeek: "kg / week",
    resultNote:
      "These values are estimates and should be adjusted using real progress, energy levels and professional guidance.",
    receive: "Receive Your Results by Email",
    sent: "Results sent",
    previewEmail: "Preview email",
    empty: "Enter your details and calculate to see an estimated daily target.",
    disclosure: "Demonstration data used for portfolio purposes.",
    modalEyebrow: "Email preview · demo only",
    modalTitle: "Your estimated daily calorie target",
    close: "Close",
    greeting: (name: string) => `Hi ${name},`,
    thereFallback: "there",
    modalIntro: "Based on the information you provided, your estimated daily calorie figures are:",
    modalMaintenance: (n: string) => `Maintenance calories: ${n}`,
    modalTarget: (n: string) => `Suggested target: ${n}`,
    modalProtein: (low: number, high: number) => `Protein range: ${low}–${high} g`,
    modalNote1:
      "These values are estimates and should be adjusted using real progress, energy and professional guidance.",
    modalNote2: "This information is educational and does not replace medical or clinical advice.",
    brand: "PRIMEFORM Coaching",
    toastTitle: "Confirmation email sent — demo only",
    toastBody: "A new lead now appears in the coach dashboard.",
  },
  ro: {
    sex: "Sex",
    female: "Femeie",
    male: "Bărbat",
    age: "Vârstă",
    height: "Înălțime",
    weight: "Greutate",
    activityLevel: "Nivel de activitate",
    primaryGoal: "Obiectiv principal",
    emailLabel: "Adresă de e-mail",
    requiredError: "Acest câmp este obligatoriu.",
    emailError: "Introdu o adresă de e-mail validă.",
    calculate: "Calculează-mi targetul",
    resultEyebrow: "Targetul tău zilnic estimat",
    maintenanceLabel: "Calorii estimate de întreținere",
    targetLabel: "Target zilnic sugerat",
    proteinLabel: "Interval sugerat de proteine",
    weeklyLabel: "Modificare săptămânală estimată",
    stable: "Aproximativ stabil",
    perWeek: "kg / săptămână",
    resultNote:
      "Aceste valori sunt estimative și ar trebui ajustate în funcție de progresul real, nivelul de energie și îndrumarea de specialitate.",
    receive: "Primește rezultatele pe e-mail",
    sent: "Rezultate trimise",
    previewEmail: "Previzualizează e-mailul",
    empty: "Completează datele și apasă „Calculează” pentru a vedea un target zilnic estimat.",
    disclosure: "Date demonstrative folosite în scop de portofoliu.",
    modalEyebrow: "Previzualizare e-mail · doar demo",
    modalTitle: "Targetul tău zilnic estimat de calorii",
    close: "Închide",
    greeting: (name: string) => `Salut ${name},`,
    thereFallback: "prietene",
    modalIntro: "Pe baza informațiilor furnizate, cifrele tale zilnice estimate de calorii sunt:",
    modalMaintenance: (n: string) => `Calorii de întreținere: ${n}`,
    modalTarget: (n: string) => `Target sugerat: ${n}`,
    modalProtein: (low: number, high: number) => `Interval de proteine: ${low}–${high} g`,
    modalNote1:
      "Aceste valori sunt estimative și ar trebui ajustate în funcție de progresul real, energie și îndrumarea de specialitate.",
    modalNote2: "Aceste informații au scop educativ și nu înlocuiesc sfatul medical sau clinic.",
    brand: "PRIMEFORM Coaching",
    toastTitle: "E-mail de confirmare trimis — doar demo",
    toastBody: "Un nou lead apare acum în panoul antrenorului.",
  },
} as const;

const inputCls =
  "w-full rounded-md border border-line bg-surface px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-accent";
const labelCls = "text-[0.72rem] font-semibold uppercase tracking-wide text-muted";

interface Result {
  maintenance: number;
  target: number;
  proteinLow: number;
  proteinHigh: number;
  weekly: number;
  goal: string;
}

const round10 = (n: number) => Math.round(n / 10) * 10;

export function CalorieCalculator() {
  const { lang } = useI18n();
  const t = copy[lang];
  const numLocale = lang === "ro" ? "ro-RO" : "en-GB";
  const captureLead = usePrimeStore((s) => s.captureLead);

  const [sex, setSex] = useState<"Female" | "Male">("Male");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState<string>("moderate");
  const [goal, setGoal] = useState<GoalKey>("lose");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [showEmail, setShowEmail] = useState(false);
  const [sent, setSent] = useState(false);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const a = Number(age);
    const h = Number(height);
    const w = Number(weight);
    if (!a || !h || !w) {
      setError(t.requiredError);
      return;
    }
    setError(null);
    const bmr = 10 * w + 6.25 * h - 5 * a + (sex === "Male" ? 5 : -161);
    const factor = activityLevels.find((x) => x.key === activity)?.factor ?? 1.55;
    const maintenance = bmr * factor;
    const target =
      goal === "lose"
        ? maintenance * 0.82
        : goal === "build"
          ? maintenance * 1.1
          : maintenance;
    const weekly = ((target - maintenance) * 7) / 7700;
    setResult({
      maintenance: round10(maintenance),
      target: round10(target),
      proteinLow: Math.round(w * 1.8),
      proteinHigh: Math.round(w * 2.2),
      weekly,
      goal,
    });
  };

  const receiveByEmail = () => {
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError(t.emailError);
      return;
    }
    setError(null);
    captureLead({
      name: email.split("@")[0],
      email,
      goal: goals.find((g) => g.key === goal)?.label[lang] ?? goal,
      source: "Calorie calculator",
    });
    setSent(true);
    toast(t.toastTitle, t.toastBody, "success");
  };

  const weeklyLabel = result
    ? Math.abs(result.weekly) < 0.05
      ? t.stable
      : `${result.weekly > 0 ? "+" : "−"}${Math.abs(result.weekly).toFixed(1)} ${t.perWeek}`
    : "";

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      {/* Form */}
      <GlassCard variant="solid" as="form" onSubmit={calculate} className="p-6 sm:p-8">
        <div className="space-y-5">
          <div>
            <span className={labelCls}>{t.sex}</span>
            <div className="mt-1.5 inline-flex rounded-full border border-line p-0.5">
              {(["Female", "Male"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSex(s)}
                  className={cn(
                    "rounded-full px-5 py-2 text-sm font-medium transition-colors",
                    sex === s ? "bg-accent text-accent-ink" : "text-muted hover:text-ink",
                  )}
                >
                  {s === "Female" ? t.female : t.male}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <label className="block">
              <span className={labelCls}>{t.age}</span>
              <input className={cn(inputCls, "mt-1.5")} inputMode="numeric" value={age} onChange={(e) => setAge(e.target.value)} placeholder="32" />
            </label>
            <label className="block">
              <span className={labelCls}>{t.height}</span>
              <input className={cn(inputCls, "mt-1.5")} inputMode="numeric" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="cm" />
            </label>
            <label className="block">
              <span className={labelCls}>{t.weight}</span>
              <input className={cn(inputCls, "mt-1.5")} inputMode="numeric" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="kg" />
            </label>
          </div>

          <label className="block">
            <span className={labelCls}>{t.activityLevel}</span>
            <select className={cn(inputCls, "mt-1.5")} value={activity} onChange={(e) => setActivity(e.target.value)}>
              {activityLevels.map((a) => (
                <option key={a.key} value={a.key}>{a.label[lang]}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className={labelCls}>{t.primaryGoal}</span>
            <select className={cn(inputCls, "mt-1.5")} value={goal} onChange={(e) => setGoal(e.target.value as GoalKey)}>
              {goals.map((g) => (
                <option key={g.key} value={g.key}>{g.label[lang]}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className={labelCls}>{t.emailLabel}</span>
            <input className={cn(inputCls, "mt-1.5")} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
          </label>

          {error && <p className="text-sm font-medium text-danger">{error}</p>}

          <button type="submit" className="btn btn-primary w-full">
            {t.calculate}
          </button>
        </div>
      </GlassCard>

      {/* Result */}
      <div>
        {result ? (
          <GlassCard variant="standard" className="p-6 sm:p-8">
            <p className="eyebrow">{t.resultEyebrow}</p>
            <div className="mt-5 grid grid-cols-2 gap-4">
              <ResultStat label={t.maintenanceLabel} value={`${result.maintenance.toLocaleString(numLocale)}`} unit="kcal" />
              <ResultStat label={t.targetLabel} value={`${result.target.toLocaleString(numLocale)}`} unit="kcal" accent />
              <ResultStat label={t.proteinLabel} value={`${result.proteinLow}–${result.proteinHigh}`} unit="g" />
              <ResultStat label={t.weeklyLabel} value={weeklyLabel} />
            </div>

            <p className="mt-5 text-sm leading-relaxed text-muted">{t.resultNote}</p>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <button
                onClick={receiveByEmail}
                disabled={sent}
                className="btn btn-primary flex-1 disabled:opacity-60"
              >
                <Mail className="size-4" strokeWidth={1.9} />
                {sent ? t.sent : t.receive}
              </button>
              <button onClick={() => setShowEmail(true)} className="btn btn-secondary">
                {t.previewEmail}
              </button>
            </div>
            <DemoDisclosure className="mt-4">{t.disclosure}</DemoDisclosure>
          </GlassCard>
        ) : (
          <GlassCard variant="solid" className="grid h-full place-items-center p-10 text-center">
            <div>
              <p className="text-muted">{t.empty}</p>
            </div>
          </GlassCard>
        )}
      </div>

      {/* Email preview modal */}
      <AnimatePresence>
        {showEmail && result && (
          <motion.div
            className="fixed inset-0 z-[95] grid place-items-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowEmail(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="glass glass-dense relative w-full max-w-md rounded-hero p-6"
            >
              <button onClick={() => setShowEmail(false)} className="absolute right-4 top-4 text-faint hover:text-ink" aria-label={t.close}>
                <X className="size-5" />
              </button>
              <p className="eyebrow">{t.modalEyebrow}</p>
              <p className="mt-3 font-heading text-lg font-bold">{t.modalTitle}</p>
              <div className="mt-4 space-y-2 text-sm text-muted">
                <p>{t.greeting(email ? email.split("@")[0] : t.thereFallback)}</p>
                <p>{t.modalIntro}</p>
                <p className="tnum text-ink">{t.modalMaintenance(result.maintenance.toLocaleString(numLocale))}</p>
                <p className="tnum text-ink">{t.modalTarget(result.target.toLocaleString(numLocale))}</p>
                <p className="tnum text-ink">{t.modalProtein(result.proteinLow, result.proteinHigh)}</p>
                <p>{t.modalNote1}</p>
                <p>{t.modalNote2}</p>
                <p className="font-medium text-ink">{t.brand}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ResultStat({
  label,
  value,
  unit,
  accent,
}: {
  label: string;
  value: string;
  unit?: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-md border border-line bg-surface/60 p-4">
      <p className="text-[0.68rem] font-semibold uppercase tracking-wide text-muted">{label}</p>
      <p className={cn("tnum mt-1 font-heading text-2xl font-bold", accent && "text-accent")}>
        {value}
        {unit && <span className="ml-1 text-sm font-medium text-muted">{unit}</span>}
      </p>
    </div>
  );
}
