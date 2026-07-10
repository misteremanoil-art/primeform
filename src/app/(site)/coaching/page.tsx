import type { Metadata } from "next";
import { Check, Dumbbell, PlayCircle, Utensils, ClipboardCheck, TrendingUp, MessageSquare } from "lucide-react";
import { PageIntro } from "@/components/site/page-intro";
import { SectionHeader } from "@/components/home/section-header";
import { PricingCard } from "@/components/site/pricing-card";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";
import { BarbellTimeline } from "@/components/fitness/barbell-timeline";
import { DemoDisclosure } from "@/components/fitness/demo-disclosure";

export const metadata: Metadata = {
  title: "Online Coaching",
  description:
    "A complete online coaching system: structured workouts, nutrition guidance, weekly reviews and direct access to your coach.",
};

const suitableWhen = [
  "you want a personalised plan rather than a downloadable template;",
  "you can train independently but need structure;",
  "you want regular feedback and accountability;",
  "your schedule changes from week to week;",
  "you want your programme adjusted using real progress data.",
];

const included = [
  { icon: Dumbbell, title: "Personalised training", body: "A programme adapted to your goal, experience, schedule and equipment." },
  { icon: PlayCircle, title: "Exercise guidance", body: "Videos, written cues, rest periods, tempo and progression targets." },
  { icon: Utensils, title: "Nutrition targets", body: "Practical calorie, protein and meal-structure guidance based on your goal." },
  { icon: ClipboardCheck, title: "Weekly check-in", body: "A structured review covering training, nutrition, sleep, stress and recovery." },
  { icon: TrendingUp, title: "Progress tracking", body: "Weight, measurements, photos, completed sessions and strength data." },
  { icon: MessageSquare, title: "Direct support", body: "Private messaging for questions, updates and programme guidance." },
];

const timeline = [
  { marker: "Week 0 — Assessment", title: "Assessment", detail: "Onboarding form, movement history, goal setting, measurements and equipment review." },
  { marker: "Week 1 — Foundation", title: "Foundation", detail: "Start your training plan, nutrition targets and initial daily habits." },
  { marker: "Weeks 2–4 — Consistency", title: "Consistency", detail: "Build routine, improve exercise confidence and identify early obstacles." },
  { marker: "Weeks 5–8 — Progression", title: "Progression", detail: "Adjust volume, intensity, nutrition and habits based on your data." },
  { marker: "Weeks 9–12 — Consolidation", title: "Consolidation", detail: "Review results, reinforce progress and create the next phase." },
];

export default function CoachingPage() {
  return (
    <>
      <PageIntro
        eyebrow="Online Coaching"
        title="Personalised coaching, wherever you train."
        cta={{ label: "Apply for Online Coaching", href: "/apply" }}
        secondary={{ label: "Explore the Client Portal", href: "/login" }}
      >
        A complete online system combining structured workouts, nutrition guidance,
        weekly reviews and direct access to your coach.
      </PageIntro>

      {/* Who it is for */}
      <section className="container-p section">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeader eyebrow="Who it is for" title="Online Coaching may be suitable for you when:" />
          <Reveal className="space-y-3">
            {suitableWhen.map((s) => (
              <div key={s} className="flex items-start gap-3 rounded-md border border-line bg-surface/50 p-4">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-olive/15 text-olive">
                  <Check className="size-3" strokeWidth={2.5} />
                </span>
                <span className="text-sm leading-relaxed first-letter:uppercase">{s}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* What is included */}
      <section className="bg-bg-2/50">
        <div className="container-p section">
          <SectionHeader eyebrow="What is included" title="Everything the online system covers." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {included.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.06}>
                <GlassCard variant="solid" className="h-full p-6">
                  <span className="grid size-10 place-items-center rounded-full bg-accent/12 text-accent">
                    <f.icon className="size-5" strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Programme timeline */}
      <section className="container-p section">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader eyebrow="Programme timeline" title="A structured twelve-week arc.">
            Every phase has a clear purpose, from assessment to consolidation.
          </SectionHeader>
          <Reveal>
            <BarbellTimeline items={timeline} />
          </Reveal>
        </div>
      </section>

      {/* Pricing + Hybrid comparison */}
      <section id="hybrid" className="scroll-mt-24 bg-bg-2/50">
        <div className="container-p section">
          <SectionHeader eyebrow="Pricing" title="Choose online, or add in-person sessions." align="center" />
          <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-2">
            <PricingCard
              name="Online Coaching"
              price="From €149"
              per="per month"
              description="Final pricing depends on the required support level and programme structure."
              includes={[
                "custom training plan",
                "nutrition guidance",
                "weekly check-in",
                "progress tracking",
                "direct messaging",
                "monthly programme review",
              ]}
              cta={{ label: "Apply for Coaching", href: "/apply" }}
              note="Submitting an application does not create a payment or commitment."
            />
            <PricingCard
              highlighted
              badge="Most complete"
              name="Hybrid Coaching"
              price="From €249"
              per="per month"
              description="In-person sessions combined with a complete online plan for the rest of the week."
              includes={[
                "scheduled personal training sessions",
                "additional online workouts",
                "weekly check-ins",
                "nutrition guidance",
                "full progress tracking",
                "support between sessions",
              ]}
              cta={{ label: "Explore Hybrid Coaching", href: "/apply" }}
              note="Pricing is fictional and used only to demonstrate service presentation."
            />
          </div>
          <DemoDisclosure className="mx-auto mt-8 w-full justify-center">
            Pricing is fictional and used only to demonstrate service presentation.
          </DemoDisclosure>
        </div>
      </section>
    </>
  );
}
