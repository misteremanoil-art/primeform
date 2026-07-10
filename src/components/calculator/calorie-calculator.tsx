"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, X } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { DemoDisclosure } from "@/components/fitness/demo-disclosure";
import { usePrimeStore } from "@/lib/store/store";
import { toast } from "@/lib/store/hooks";
import { cn } from "@/lib/utils";

const activityLevels: Record<string, number> = {
  "Mostly sedentary": 1.2,
  "Lightly active": 1.375,
  "Moderately active": 1.55,
  "Very active": 1.725,
  "Highly active": 1.9,
};

const goals = ["Lose body fat", "Maintain weight", "Build muscle"] as const;

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
  const captureLead = usePrimeStore((s) => s.captureLead);

  const [sex, setSex] = useState<"Female" | "Male">("Male");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("Moderately active");
  const [goal, setGoal] = useState<(typeof goals)[number]>("Lose body fat");
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
      setError("This field is required.");
      return;
    }
    setError(null);
    const bmr = 10 * w + 6.25 * h - 5 * a + (sex === "Male" ? 5 : -161);
    const maintenance = bmr * activityLevels[activity];
    const target =
      goal === "Lose body fat"
        ? maintenance * 0.82
        : goal === "Build muscle"
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
      setError("Enter a valid email address.");
      return;
    }
    setError(null);
    captureLead({
      name: email.split("@")[0],
      email,
      goal,
      source: "Calorie calculator",
    });
    setSent(true);
    toast(
      "Confirmation email sent — demo only",
      "A new lead now appears in the coach dashboard.",
      "success",
    );
  };

  const weeklyLabel = result
    ? Math.abs(result.weekly) < 0.05
      ? "Approximately stable"
      : `${result.weekly > 0 ? "+" : "−"}${Math.abs(result.weekly).toFixed(1)} kg / week`
    : "";

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      {/* Form */}
      <GlassCard variant="solid" as="form" onSubmit={calculate} className="p-6 sm:p-8">
        <div className="space-y-5">
          <div>
            <span className={labelCls}>Sex</span>
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
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <label className="block">
              <span className={labelCls}>Age</span>
              <input className={cn(inputCls, "mt-1.5")} inputMode="numeric" value={age} onChange={(e) => setAge(e.target.value)} placeholder="32" />
            </label>
            <label className="block">
              <span className={labelCls}>Height</span>
              <input className={cn(inputCls, "mt-1.5")} inputMode="numeric" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="cm" />
            </label>
            <label className="block">
              <span className={labelCls}>Weight</span>
              <input className={cn(inputCls, "mt-1.5")} inputMode="numeric" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="kg" />
            </label>
          </div>

          <label className="block">
            <span className={labelCls}>Activity level</span>
            <select className={cn(inputCls, "mt-1.5")} value={activity} onChange={(e) => setActivity(e.target.value)}>
              {Object.keys(activityLevels).map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className={labelCls}>Primary goal</span>
            <select className={cn(inputCls, "mt-1.5")} value={goal} onChange={(e) => setGoal(e.target.value as typeof goal)}>
              {goals.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className={labelCls}>Email address</span>
            <input className={cn(inputCls, "mt-1.5")} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
          </label>

          {error && <p className="text-sm font-medium text-danger">{error}</p>}

          <button type="submit" className="btn btn-primary w-full">
            Calculate My Target
          </button>
        </div>
      </GlassCard>

      {/* Result */}
      <div>
        {result ? (
          <GlassCard variant="standard" className="p-6 sm:p-8">
            <p className="eyebrow">Your estimated daily target</p>
            <div className="mt-5 grid grid-cols-2 gap-4">
              <ResultStat label="Estimated maintenance calories" value={`${result.maintenance.toLocaleString("en-GB")}`} unit="kcal" />
              <ResultStat label="Suggested daily target" value={`${result.target.toLocaleString("en-GB")}`} unit="kcal" accent />
              <ResultStat label="Suggested protein range" value={`${result.proteinLow}–${result.proteinHigh}`} unit="g" />
              <ResultStat label="Estimated weekly change" value={weeklyLabel} />
            </div>

            <p className="mt-5 text-sm leading-relaxed text-muted">
              These values are estimates and should be adjusted using real progress,
              energy levels and professional guidance.
            </p>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <button
                onClick={receiveByEmail}
                disabled={sent}
                className="btn btn-primary flex-1 disabled:opacity-60"
              >
                <Mail className="size-4" strokeWidth={1.9} />
                {sent ? "Results sent" : "Receive Your Results by Email"}
              </button>
              <button onClick={() => setShowEmail(true)} className="btn btn-secondary">
                Preview email
              </button>
            </div>
            <DemoDisclosure className="mt-4" />
          </GlassCard>
        ) : (
          <GlassCard variant="solid" className="grid h-full place-items-center p-10 text-center">
            <div>
              <p className="text-muted">
                Enter your details and calculate to see an estimated daily target.
              </p>
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
              <button onClick={() => setShowEmail(false)} className="absolute right-4 top-4 text-faint hover:text-ink" aria-label="Close">
                <X className="size-5" />
              </button>
              <p className="eyebrow">Email preview · demo only</p>
              <p className="mt-3 font-heading text-lg font-bold">Your estimated daily calorie target</p>
              <div className="mt-4 space-y-2 text-sm text-muted">
                <p>Hi {email ? email.split("@")[0] : "there"},</p>
                <p>Based on the information you provided, your estimated daily calorie figures are:</p>
                <p className="tnum text-ink">Maintenance calories: {result.maintenance.toLocaleString("en-GB")}</p>
                <p className="tnum text-ink">Suggested target: {result.target.toLocaleString("en-GB")}</p>
                <p className="tnum text-ink">Protein range: {result.proteinLow}–{result.proteinHigh} g</p>
                <p>These values are estimates and should be adjusted using real progress, energy and professional guidance.</p>
                <p>This information is educational and does not replace medical or clinical advice.</p>
                <p className="font-medium text-ink">PRIMEFORM Coaching</p>
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
