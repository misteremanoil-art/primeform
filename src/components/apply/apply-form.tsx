"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, PartyPopper } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import {
  Field,
  TextInput,
  TextArea,
  SelectInput,
  RadioCards,
  CheckboxCards,
} from "@/components/ui/form";
import { usePrimeStore } from "@/lib/store/store";
import { toast } from "@/lib/store/hooks";
import { cn } from "@/lib/utils";

const goalOptions = [
  "Lose body fat",
  "Build muscle",
  "Improve strength",
  "Improve fitness",
  "Return to training",
  "Build a consistent routine",
  "Other",
];
const experienceOptions = [
  "Complete beginner",
  "Less than one year",
  "One to three years",
  "More than three years",
  "Returning after a long break",
];
const locationOptions = [
  "Commercial gym",
  "Home gym",
  "Minimal home equipment",
  "Outdoors",
  "Not currently training",
];
const challengeOptions = [
  "I did not have a clear programme",
  "I struggled with nutrition",
  "I lacked consistency",
  "My schedule changed frequently",
  "I did not know how to progress",
  "I lost motivation",
  "Previous plans were too restrictive",
  "Injury or physical limitation",
  "Other",
];
const serviceOptions = [
  "Online Coaching",
  "Personal Training",
  "Hybrid Coaching",
  "I am not sure yet",
];
const startOptions = [
  "As soon as possible",
  "Within two weeks",
  "Within one month",
  "I am currently researching",
];
const budgetOptions = [
  "Under €100",
  "€100–€200",
  "€200–€350",
  "€350+",
  "I would like to discuss the options",
];
const contactMethodOptions = ["Email", "Phone call", "WhatsApp", "Instagram"];
const bestTimeOptions = ["Morning", "Afternoon", "Evening"];

const steps = ["Your goal", "Your situation", "Your challenges", "Coaching", "Contact"];

interface Data {
  goal: string;
  goalSuccess: string;
  age: string;
  height: string;
  weight: string;
  experience: string;
  weeklyActivity: string;
  location: string;
  equipment: string;
  trainingDays: string;
  challenges: string[];
  alreadyTried: string;
  service: string;
  startTimeframe: string;
  budget: string;
  fullName: string;
  email: string;
  phone: string;
  instagram: string;
  contactMethod: string;
  bestTime: string;
  consent: boolean;
}

const initial: Data = {
  goal: "",
  goalSuccess: "",
  age: "",
  height: "",
  weight: "",
  experience: "",
  weeklyActivity: "",
  location: "",
  equipment: "",
  trainingDays: "",
  challenges: [],
  alreadyTried: "",
  service: "",
  startTimeframe: "",
  budget: "",
  fullName: "",
  email: "",
  phone: "",
  instagram: "",
  contactMethod: "",
  bestTime: "",
  consent: false,
};

const REQUIRED = "This field is required.";

export function ApplyForm() {
  const submitApplication = usePrimeStore((s) => s.submitApplication);
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const set = <K extends keyof Data>(k: K, v: Data[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const validateStep = (): boolean => {
    const e: Record<string, string> = {};
    if (step === 0) {
      if (!data.goal) e.goal = REQUIRED;
      if (!data.goalSuccess.trim()) e.goalSuccess = REQUIRED;
    }
    if (step === 1) {
      if (!data.age) e.age = REQUIRED;
      if (!data.height) e.height = REQUIRED;
      if (!data.weight) e.weight = REQUIRED;
      if (!data.experience) e.experience = REQUIRED;
      if (!data.location) e.location = REQUIRED;
    }
    if (step === 2) {
      if (data.challenges.length === 0) e.challenges = REQUIRED;
    }
    if (step === 3) {
      if (!data.service) e.service = REQUIRED;
      if (!data.startTimeframe) e.startTimeframe = REQUIRED;
      if (!data.budget) e.budget = REQUIRED;
    }
    if (step === 4) {
      if (!data.fullName.trim()) e.fullName = REQUIRED;
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email))
        e.email = "Enter a valid email address.";
      if (!/^[+()\-\d\s]{7,}$/.test(data.phone))
        e.phone = "Enter a valid phone number.";
      if (!data.contactMethod) e.contactMethod = REQUIRED;
      if (!data.consent) e.consent = REQUIRED;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validateStep()) return;
    if (step < 4) {
      setStep((s) => s + 1);
    } else {
      submitApplication({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        goal: data.goal,
        service: data.service === "I am not sure yet" ? "Unsure" : data.service,
        startTimeframe: data.startTimeframe,
        budget: data.budget,
      });
      toast(
        "Confirmation email sent — demo only",
        "A new lead now appears in the coach dashboard.",
        "success",
      );
      setDone(true);
    }
  };

  if (done) {
    return (
      <GlassCard variant="standard" className="mx-auto max-w-xl rounded-hero p-8 text-center sm:p-12">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-olive/15 text-olive">
          <PartyPopper className="size-7" strokeWidth={1.7} />
        </span>
        <h2 className="mt-6 text-3xl sm:text-4xl">Your application has been received.</h2>
        <p className="mt-4 text-muted">
          Thank you for sharing your details. The next step is to choose a suitable
          time for a short consultation.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/book" className="btn btn-primary">
            Book Your Consultation
            <ArrowRight className="size-4" strokeWidth={2} />
          </Link>
          <Link href="/" className="btn btn-secondary">
            Return to Homepage
          </Link>
        </div>
      </GlassCard>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center gap-2">
          {steps.map((s, i) => (
            <div key={s} className="flex flex-1 items-center gap-2">
              <span
                className={cn(
                  "grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold transition-colors",
                  i < step
                    ? "bg-olive text-white"
                    : i === step
                      ? "bg-accent text-accent-ink"
                      : "border border-line text-faint",
                )}
              >
                {i < step ? <Check className="size-3.5" strokeWidth={3} /> : i + 1}
              </span>
              {i < steps.length - 1 && (
                <span
                  className={cn(
                    "h-0.5 flex-1 rounded-full",
                    i < step ? "bg-olive" : "bg-line",
                  )}
                />
              )}
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm font-medium text-muted">
          Step {step + 1} of 5 · {steps[step]}
        </p>
      </div>

      <GlassCard variant="solid" className="p-6 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.22 }}
            className="space-y-6"
          >
            {step === 0 && (
              <>
                <Field label="What would you most like to achieve?" error={errors.goal}>
                  <RadioCards options={goalOptions} value={data.goal} onChange={(v) => set("goal", v)} />
                </Field>
                <Field
                  label="What would make the next 12 weeks feel successful?"
                  error={errors.goalSuccess}
                >
                  <TextArea value={data.goalSuccess} onChange={(e) => set("goalSuccess", e.target.value)} placeholder="Describe what success looks like for you…" />
                </Field>
              </>
            )}

            {step === 1 && (
              <>
                <div className="grid grid-cols-3 gap-3">
                  <Field label="Age" error={errors.age}>
                    <TextInput inputMode="numeric" value={data.age} onChange={(e) => set("age", e.target.value)} placeholder="32" />
                  </Field>
                  <Field label="Height" error={errors.height}>
                    <TextInput value={data.height} onChange={(e) => set("height", e.target.value)} placeholder="cm" />
                  </Field>
                  <Field label="Current weight" error={errors.weight}>
                    <TextInput value={data.weight} onChange={(e) => set("weight", e.target.value)} placeholder="kg" />
                  </Field>
                </div>
                <Field label="Training experience" error={errors.experience}>
                  <SelectInput options={experienceOptions} placeholder="Select experience" value={data.experience} onChange={(e) => set("experience", e.target.value)} />
                </Field>
                <Field label="Training location" error={errors.location}>
                  <SelectInput options={locationOptions} placeholder="Select location" value={data.location} onChange={(e) => set("location", e.target.value)} />
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Current weekly activity" optional>
                    <TextInput value={data.weeklyActivity} onChange={(e) => set("weeklyActivity", e.target.value)} placeholder="e.g. 3 sessions" />
                  </Field>
                  <Field label="Preferred training days" optional>
                    <TextInput value={data.trainingDays} onChange={(e) => set("trainingDays", e.target.value)} placeholder="e.g. Mon, Wed, Fri" />
                  </Field>
                </div>
                <Field label="Available equipment" optional>
                  <TextInput value={data.equipment} onChange={(e) => set("equipment", e.target.value)} placeholder="e.g. dumbbells, bench, bands" />
                </Field>
              </>
            )}

            {step === 2 && (
              <>
                <Field label="What has made progress difficult in the past?" error={errors.challenges}>
                  <CheckboxCards options={challengeOptions} value={data.challenges} onChange={(v) => set("challenges", v)} />
                </Field>
                <Field label="What have you already tried?" optional>
                  <TextArea value={data.alreadyTried} onChange={(e) => set("alreadyTried", e.target.value)} placeholder="Previous programmes, diets, apps…" />
                </Field>
              </>
            )}

            {step === 3 && (
              <>
                <Field label="Which type of coaching interests you most?" error={errors.service}>
                  <RadioCards options={serviceOptions} value={data.service} onChange={(v) => set("service", v)} />
                </Field>
                <Field label="When would you ideally like to start?" error={errors.startTimeframe}>
                  <RadioCards options={startOptions} value={data.startTimeframe} onChange={(v) => set("startTimeframe", v)} />
                </Field>
                <Field label="What monthly investment range are you comfortable with?" error={errors.budget}>
                  <RadioCards options={budgetOptions} value={data.budget} onChange={(v) => set("budget", v)} columns={1} />
                </Field>
              </>
            )}

            {step === 4 && (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full name" error={errors.fullName}>
                    <TextInput value={data.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder="Your name" />
                  </Field>
                  <Field label="Email address" error={errors.email}>
                    <TextInput type="email" value={data.email} onChange={(e) => set("email", e.target.value)} placeholder="you@email.com" />
                  </Field>
                  <Field label="Phone number" error={errors.phone}>
                    <TextInput value={data.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+40 …" />
                  </Field>
                  <Field label="Instagram username" optional>
                    <TextInput value={data.instagram} onChange={(e) => set("instagram", e.target.value)} placeholder="@handle" />
                  </Field>
                  <Field label="Preferred contact method" error={errors.contactMethod}>
                    <SelectInput options={contactMethodOptions} placeholder="Select method" value={data.contactMethod} onChange={(e) => set("contactMethod", e.target.value)} />
                  </Field>
                  <Field label="Best time to contact you" optional>
                    <SelectInput options={bestTimeOptions} placeholder="Select time" value={data.bestTime} onChange={(e) => set("bestTime", e.target.value)} />
                  </Field>
                </div>
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={data.consent}
                    onChange={(e) => set("consent", e.target.checked)}
                    className="mt-0.5 size-4 accent-[var(--accent)]"
                  />
                  <span className="text-sm text-muted">
                    I agree that PRIMEFORM may contact me regarding my application and
                    coaching options.
                  </span>
                </label>
                {errors.consent && <p className="text-xs font-medium text-danger">{errors.consent}</p>}
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Nav */}
        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="btn btn-ghost h-11 min-h-0 px-3 py-0 disabled:invisible"
          >
            <ArrowLeft className="size-4" strokeWidth={2} />
            Back
          </button>
          <button type="button" onClick={next} className="btn btn-primary">
            {step === 4 ? "Submit My Application" : "Continue"}
            <ArrowRight className="size-4" strokeWidth={2} />
          </button>
        </div>
      </GlassCard>
    </div>
  );
}
