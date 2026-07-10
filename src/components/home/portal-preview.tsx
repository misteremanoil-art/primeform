import Link from "next/link";
import {
  ArrowRight,
  Dumbbell,
  TrendingUp,
  ListChecks,
  MessageSquare,
  Play,
  ClipboardCheck,
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";
import { PlateProgressRing } from "@/components/fitness/plate-progress-ring";
import { DemoDisclosure } from "@/components/fitness/demo-disclosure";
import { SectionHeader } from "./section-header";

const features = [
  {
    icon: Dumbbell,
    title: "Today's workout",
    body: "See exercises, sets, repetitions, previous performance and coach instructions.",
  },
  {
    icon: TrendingUp,
    title: "Weekly progress",
    body: "Track body weight, measurements, workout completion and personal records.",
  },
  {
    icon: ListChecks,
    title: "Habits",
    body: "Log sleep, steps, hydration, protein and other daily targets.",
  },
  {
    icon: ClipboardCheck,
    title: "Check-ins",
    body: "Submit a structured weekly review and receive feedback from your coach.",
  },
  {
    icon: MessageSquare,
    title: "Messages",
    body: "Ask questions and receive support without losing important information in multiple apps.",
  },
];

function MiniDashboard() {
  return (
    <GlassCard variant="dense" className="w-full rounded-hero p-4 shadow-2xl">
      <p className="text-sm font-semibold">Good afternoon, Alex</p>
      <div className="mt-3 grid grid-cols-2 gap-2.5">
        {/* Today's workout */}
        <div className="surface-card col-span-2 flex items-center gap-3 p-3.5">
          <div className="min-w-0 flex-1">
            <p className="text-[0.58rem] font-bold uppercase tracking-widest text-accent">
              Today&rsquo;s Workout
            </p>
            <p className="truncate text-sm font-bold">Upper Body Strength</p>
            <p className="tnum text-xs text-muted">6 exercises · 58 min</p>
          </div>
          <span className="grid size-9 place-items-center rounded-full bg-accent text-accent-ink">
            <Play className="size-4 fill-current" strokeWidth={0} />
          </span>
        </div>
        {/* Week progress */}
        <div className="surface-card flex items-center gap-2 p-3">
          <PlateProgressRing value={91} size={52} strokeWidth={8} />
          <div>
            <p className="tnum text-lg font-bold leading-none">91%</p>
            <p className="text-[0.6rem] uppercase tracking-wide text-muted">Week 7</p>
          </div>
        </div>
        {/* Weight */}
        <div className="surface-card p-3">
          <p className="text-[0.58rem] font-bold uppercase tracking-widest text-muted">
            Weight
          </p>
          <p className="tnum text-lg font-bold text-olive">−6.6 kg</p>
          <p className="text-[0.6rem] text-muted">96.4 → 89.8</p>
        </div>
        {/* Habits */}
        <div className="surface-card p-3">
          <p className="text-[0.58rem] font-bold uppercase tracking-widest text-muted">
            Habits
          </p>
          <p className="tnum text-lg font-bold">4 / 5</p>
          <p className="text-[0.6rem] text-muted">today</p>
        </div>
        {/* Coach message */}
        <div className="surface-card p-3">
          <p className="text-[0.58rem] font-bold uppercase tracking-widest text-accent">
            Coach
          </p>
          <p className="mt-0.5 line-clamp-2 text-[0.66rem] leading-snug text-muted">
            Keep the same load and focus on control.
          </p>
        </div>
      </div>
    </GlassCard>
  );
}

export function PortalPreview() {
  return (
    <section className="relative overflow-hidden">
      {/* Orange glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 -z-0 size-[560px] -translate-y-1/2 translate-x-1/4 rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--glow-orange), transparent 68%)" }}
      />
      <div className="container-p section relative">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader
              eyebrow="Everything in one place"
              title="Your training, progress and communication — organised in one private portal."
            >
              No spreadsheets hidden in email threads. No searching through old
              messages for your workout. Your complete coaching experience is available
              in one simple dashboard.
            </SectionHeader>

            <div className="mt-8 grid gap-x-6 gap-y-4 sm:grid-cols-2">
              {features.map((f) => (
                <div key={f.title} className="flex gap-3">
                  <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-accent/12 text-accent">
                    <f.icon className="size-4" strokeWidth={1.7} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{f.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted">{f.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className="btn btn-primary">
                Try the Client Demo
                <ArrowRight className="size-4" strokeWidth={2} />
              </Link>
              <Link href="/login" className="btn btn-secondary">
                View the Coach Dashboard
              </Link>
            </div>
          </div>

          {/* Product composition */}
          <Reveal delay={0.1} className="relative">
            <div className="[perspective:1600px]">
              <div className="mx-auto max-w-[440px] lg:[transform:rotateY(-16deg)_rotateX(6deg)]">
                <MiniDashboard />
              </div>
            </div>
          </Reveal>
        </div>

        <DemoDisclosure className="mt-10">
          Portal data shown is fictional and for demonstration purposes.
        </DemoDisclosure>
      </div>
    </section>
  );
}
