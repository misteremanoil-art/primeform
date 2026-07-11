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
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const goalOptions = [
  { en: "Lose body fat", ro: "Slăbire (pierdere de grăsime)" },
  { en: "Build muscle", ro: "Creștere musculară" },
  { en: "Improve strength", ro: "Îmbunătățirea forței" },
  { en: "Improve fitness", ro: "Îmbunătățirea condiției fizice" },
  { en: "Return to training", ro: "Revenire la antrenamente" },
  { en: "Build a consistent routine", ro: "Construirea unei rutine constante" },
  { en: "Other", ro: "Altceva" },
] as const;
const experienceOptions = [
  { en: "Complete beginner", ro: "Complet începător" },
  { en: "Less than one year", ro: "Mai puțin de un an" },
  { en: "One to three years", ro: "Între unu și trei ani" },
  { en: "More than three years", ro: "Peste trei ani" },
  { en: "Returning after a long break", ro: "Revenire după o pauză lungă" },
] as const;
const locationOptions = [
  { en: "Commercial gym", ro: "Sală comercială" },
  { en: "Home gym", ro: "Sală acasă" },
  { en: "Minimal home equipment", ro: "Echipament minim acasă" },
  { en: "Outdoors", ro: "În aer liber" },
  { en: "Not currently training", ro: "Momentan nu mă antrenez" },
] as const;
const challengeOptions = [
  { en: "I did not have a clear programme", ro: "Nu am avut un program clar" },
  { en: "I struggled with nutrition", ro: "M-am chinuit cu nutriția" },
  { en: "I lacked consistency", ro: "Mi-a lipsit consecvența" },
  { en: "My schedule changed frequently", ro: "Programul meu se schimba frecvent" },
  { en: "I did not know how to progress", ro: "Nu știam cum să progresez" },
  { en: "I lost motivation", ro: "Mi-am pierdut motivația" },
  { en: "Previous plans were too restrictive", ro: "Planurile anterioare erau prea restrictive" },
  { en: "Injury or physical limitation", ro: "Accidentare sau limitare fizică" },
  { en: "Other", ro: "Altceva" },
] as const;
const serviceOptions = [
  { en: "Online Coaching", ro: "Coaching online" },
  { en: "Personal Training", ro: "Antrenament personal" },
  { en: "Hybrid Coaching", ro: "Coaching hibrid" },
  { en: "I am not sure yet", ro: "Încă nu sunt sigur" },
] as const;
const startOptions = [
  { en: "As soon as possible", ro: "Cât mai curând posibil" },
  { en: "Within two weeks", ro: "În maximum două săptămâni" },
  { en: "Within one month", ro: "În maximum o lună" },
  { en: "I am currently researching", ro: "Momentan mă documentez" },
] as const;
const budgetOptions = [
  { en: "Under €100", ro: "Sub €100" },
  { en: "€100–€200", ro: "€100–€200" },
  { en: "€200–€350", ro: "€200–€350" },
  { en: "€350+", ro: "€350+" },
  { en: "I would like to discuss the options", ro: "Aș vrea să discutăm opțiunile" },
] as const;
const contactMethodOptions = [
  { en: "Email", ro: "E-mail" },
  { en: "Phone call", ro: "Apel telefonic" },
  { en: "WhatsApp", ro: "WhatsApp" },
  { en: "Instagram", ro: "Instagram" },
] as const;
const bestTimeOptions = [
  { en: "Morning", ro: "Dimineața" },
  { en: "Afternoon", ro: "După-amiaza" },
  { en: "Evening", ro: "Seara" },
] as const;

const steps = [
  { en: "Your goal", ro: "Obiectivul tău" },
  { en: "Your situation", ro: "Situația ta" },
  { en: "Your challenges", ro: "Provocările tale" },
  { en: "Coaching", ro: "Coaching" },
  { en: "Contact", ro: "Contact" },
] as const;

const copy = {
  en: {
    required: "This field is required.",
    emailError: "Enter a valid email address.",
    phoneError: "Enter a valid phone number.",
    stepLabel: (n: number, name: string) => `Step ${n} of 5 · ${name}`,
    goalQ: "What would you most like to achieve?",
    successQ: "What would make the next 12 weeks feel successful?",
    successPlaceholder: "Describe what success looks like for you…",
    age: "Age",
    height: "Height",
    weight: "Current weight",
    experience: "Training experience",
    selectExperience: "Select experience",
    location: "Training location",
    selectLocation: "Select location",
    weeklyActivity: "Current weekly activity",
    weeklyActivityPlaceholder: "e.g. 3 sessions",
    trainingDays: "Preferred training days",
    trainingDaysPlaceholder: "e.g. Mon, Wed, Fri",
    equipment: "Available equipment",
    equipmentPlaceholder: "e.g. dumbbells, bench, bands",
    challengesQ: "What has made progress difficult in the past?",
    triedQ: "What have you already tried?",
    triedPlaceholder: "Previous programmes, diets, apps…",
    serviceQ: "Which type of coaching interests you most?",
    startQ: "When would you ideally like to start?",
    budgetQ: "What monthly investment range are you comfortable with?",
    fullName: "Full name",
    fullNamePlaceholder: "Your name",
    emailLabel: "Email address",
    phoneLabel: "Phone number",
    instagram: "Instagram username",
    contactMethod: "Preferred contact method",
    selectMethod: "Select method",
    bestTime: "Best time to contact you",
    selectTime: "Select time",
    consent:
      "I agree that PRIMEFORM may contact me regarding my application and coaching options.",
    back: "Back",
    continue: "Continue",
    submit: "Submit My Application",
    doneTitle: "Your application has been received.",
    doneBody:
      "Thank you for sharing your details. The next step is to choose a suitable time for a short consultation.",
    bookCta: "Book Your Consultation",
    homeCta: "Return to Homepage",
    toastTitle: "Confirmation email sent — demo only",
    toastBody: "A new lead now appears in the coach dashboard.",
  },
  ro: {
    required: "Acest câmp este obligatoriu.",
    emailError: "Introdu o adresă de e-mail validă.",
    phoneError: "Introdu un număr de telefon valid.",
    stepLabel: (n: number, name: string) => `Pasul ${n} din 5 · ${name}`,
    goalQ: "Ce ți-ai dori cel mai mult să realizezi?",
    successQ: "Ce ar face ca următoarele 12 săptămâni să pară un succes?",
    successPlaceholder: "Descrie cum arată succesul pentru tine…",
    age: "Vârstă",
    height: "Înălțime",
    weight: "Greutate actuală",
    experience: "Experiență în antrenamente",
    selectExperience: "Alege experiența",
    location: "Locul de antrenament",
    selectLocation: "Alege locul",
    weeklyActivity: "Activitatea săptămânală actuală",
    weeklyActivityPlaceholder: "ex. 3 sesiuni",
    trainingDays: "Zile preferate de antrenament",
    trainingDaysPlaceholder: "ex. Lu, Mi, Vi",
    equipment: "Echipament disponibil",
    equipmentPlaceholder: "ex. gantere, bancă, benzi elastice",
    challengesQ: "Ce a făcut progresul dificil în trecut?",
    triedQ: "Ce ai încercat deja?",
    triedPlaceholder: "Programe, diete, aplicații anterioare…",
    serviceQ: "Ce tip de coaching te interesează cel mai mult?",
    startQ: "Când ai vrea, ideal, să începi?",
    budgetQ: "Ce interval de investiție lunară ți se pare confortabil?",
    fullName: "Nume complet",
    fullNamePlaceholder: "Numele tău",
    emailLabel: "Adresă de e-mail",
    phoneLabel: "Număr de telefon",
    instagram: "Utilizator Instagram",
    contactMethod: "Metodă de contact preferată",
    selectMethod: "Alege metoda",
    bestTime: "Cel mai bun moment pentru a te contacta",
    selectTime: "Alege momentul",
    consent:
      "Sunt de acord ca PRIMEFORM să mă contacteze în legătură cu aplicația mea și opțiunile de coaching.",
    back: "Înapoi",
    continue: "Continuă",
    submit: "Trimite aplicația",
    doneTitle: "Aplicația ta a fost primită.",
    doneBody:
      "Îți mulțumim că ne-ai împărtășit detaliile. Următorul pas este să alegi un moment potrivit pentru o scurtă consultație.",
    bookCta: "Programează consultația",
    homeCta: "Înapoi la pagina principală",
    toastTitle: "E-mail de confirmare trimis — doar demo",
    toastBody: "Un nou lead apare acum în panoul antrenorului.",
  },
} as const;

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

export function ApplyForm() {
  const { lang } = useI18n();
  const t = copy[lang];
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
      if (!data.goal) e.goal = t.required;
      if (!data.goalSuccess.trim()) e.goalSuccess = t.required;
    }
    if (step === 1) {
      if (!data.age) e.age = t.required;
      if (!data.height) e.height = t.required;
      if (!data.weight) e.weight = t.required;
      if (!data.experience) e.experience = t.required;
      if (!data.location) e.location = t.required;
    }
    if (step === 2) {
      if (data.challenges.length === 0) e.challenges = t.required;
    }
    if (step === 3) {
      if (!data.service) e.service = t.required;
      if (!data.startTimeframe) e.startTimeframe = t.required;
      if (!data.budget) e.budget = t.required;
    }
    if (step === 4) {
      if (!data.fullName.trim()) e.fullName = t.required;
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email))
        e.email = t.emailError;
      if (!/^[+()\-\d\s]{7,}$/.test(data.phone))
        e.phone = t.phoneError;
      if (!data.contactMethod) e.contactMethod = t.required;
      if (!data.consent) e.consent = t.required;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validateStep()) return;
    if (step < 4) {
      setStep((s) => s + 1);
    } else {
      const notSure = serviceOptions[serviceOptions.length - 1][lang];
      submitApplication({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        goal: data.goal,
        service: data.service === notSure ? "Unsure" : data.service,
        startTimeframe: data.startTimeframe,
        budget: data.budget,
      });
      toast(t.toastTitle, t.toastBody, "success");
      setDone(true);
    }
  };

  if (done) {
    return (
      <GlassCard variant="standard" className="mx-auto max-w-xl rounded-hero p-8 text-center sm:p-12">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-olive/15 text-olive">
          <PartyPopper className="size-7" strokeWidth={1.7} />
        </span>
        <h2 className="mt-6 text-3xl sm:text-4xl">{t.doneTitle}</h2>
        <p className="mt-4 text-muted">{t.doneBody}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/book" className="btn btn-primary">
            {t.bookCta}
            <ArrowRight className="size-4" strokeWidth={2} />
          </Link>
          <Link href="/" className="btn btn-secondary">
            {t.homeCta}
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
            <div key={s.en} className="flex flex-1 items-center gap-2">
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
          {t.stepLabel(step + 1, steps[step][lang])}
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
                <Field label={t.goalQ} error={errors.goal}>
                  <RadioCards options={goalOptions.map((o) => o[lang])} value={data.goal} onChange={(v) => set("goal", v)} />
                </Field>
                <Field
                  label={t.successQ}
                  error={errors.goalSuccess}
                >
                  <TextArea value={data.goalSuccess} onChange={(e) => set("goalSuccess", e.target.value)} placeholder={t.successPlaceholder} />
                </Field>
              </>
            )}

            {step === 1 && (
              <>
                <div className="grid grid-cols-3 gap-3">
                  <Field label={t.age} error={errors.age}>
                    <TextInput inputMode="numeric" value={data.age} onChange={(e) => set("age", e.target.value)} placeholder="32" />
                  </Field>
                  <Field label={t.height} error={errors.height}>
                    <TextInput value={data.height} onChange={(e) => set("height", e.target.value)} placeholder="cm" />
                  </Field>
                  <Field label={t.weight} error={errors.weight}>
                    <TextInput value={data.weight} onChange={(e) => set("weight", e.target.value)} placeholder="kg" />
                  </Field>
                </div>
                <Field label={t.experience} error={errors.experience}>
                  <SelectInput options={experienceOptions.map((o) => o[lang])} placeholder={t.selectExperience} value={data.experience} onChange={(e) => set("experience", e.target.value)} />
                </Field>
                <Field label={t.location} error={errors.location}>
                  <SelectInput options={locationOptions.map((o) => o[lang])} placeholder={t.selectLocation} value={data.location} onChange={(e) => set("location", e.target.value)} />
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label={t.weeklyActivity} optional>
                    <TextInput value={data.weeklyActivity} onChange={(e) => set("weeklyActivity", e.target.value)} placeholder={t.weeklyActivityPlaceholder} />
                  </Field>
                  <Field label={t.trainingDays} optional>
                    <TextInput value={data.trainingDays} onChange={(e) => set("trainingDays", e.target.value)} placeholder={t.trainingDaysPlaceholder} />
                  </Field>
                </div>
                <Field label={t.equipment} optional>
                  <TextInput value={data.equipment} onChange={(e) => set("equipment", e.target.value)} placeholder={t.equipmentPlaceholder} />
                </Field>
              </>
            )}

            {step === 2 && (
              <>
                <Field label={t.challengesQ} error={errors.challenges}>
                  <CheckboxCards options={challengeOptions.map((o) => o[lang])} value={data.challenges} onChange={(v) => set("challenges", v)} />
                </Field>
                <Field label={t.triedQ} optional>
                  <TextArea value={data.alreadyTried} onChange={(e) => set("alreadyTried", e.target.value)} placeholder={t.triedPlaceholder} />
                </Field>
              </>
            )}

            {step === 3 && (
              <>
                <Field label={t.serviceQ} error={errors.service}>
                  <RadioCards options={serviceOptions.map((o) => o[lang])} value={data.service} onChange={(v) => set("service", v)} />
                </Field>
                <Field label={t.startQ} error={errors.startTimeframe}>
                  <RadioCards options={startOptions.map((o) => o[lang])} value={data.startTimeframe} onChange={(v) => set("startTimeframe", v)} />
                </Field>
                <Field label={t.budgetQ} error={errors.budget}>
                  <RadioCards options={budgetOptions.map((o) => o[lang])} value={data.budget} onChange={(v) => set("budget", v)} columns={1} />
                </Field>
              </>
            )}

            {step === 4 && (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label={t.fullName} error={errors.fullName}>
                    <TextInput value={data.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder={t.fullNamePlaceholder} />
                  </Field>
                  <Field label={t.emailLabel} error={errors.email}>
                    <TextInput type="email" value={data.email} onChange={(e) => set("email", e.target.value)} placeholder="you@email.com" />
                  </Field>
                  <Field label={t.phoneLabel} error={errors.phone}>
                    <TextInput value={data.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+40 …" />
                  </Field>
                  <Field label={t.instagram} optional>
                    <TextInput value={data.instagram} onChange={(e) => set("instagram", e.target.value)} placeholder="@handle" />
                  </Field>
                  <Field label={t.contactMethod} error={errors.contactMethod}>
                    <SelectInput options={contactMethodOptions.map((o) => o[lang])} placeholder={t.selectMethod} value={data.contactMethod} onChange={(e) => set("contactMethod", e.target.value)} />
                  </Field>
                  <Field label={t.bestTime} optional>
                    <SelectInput options={bestTimeOptions.map((o) => o[lang])} placeholder={t.selectTime} value={data.bestTime} onChange={(e) => set("bestTime", e.target.value)} />
                  </Field>
                </div>
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={data.consent}
                    onChange={(e) => set("consent", e.target.checked)}
                    className="mt-0.5 size-4 accent-[var(--accent)]"
                  />
                  <span className="text-sm text-muted">{t.consent}</span>
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
            {t.back}
          </button>
          <button type="button" onClick={next} className="btn btn-primary">
            {step === 4 ? t.submit : t.continue}
            <ArrowRight className="size-4" strokeWidth={2} />
          </button>
        </div>
      </GlassCard>
    </div>
  );
}
