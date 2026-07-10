import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "./section-header";

const steps = [
  {
    n: "01",
    title: "Apply",
    body:
      "Tell us about your goal, current routine, schedule and the challenges you have faced so far.",
  },
  {
    n: "02",
    title: "Speak with your coach",
    body:
      "Book a consultation to discuss your situation and decide whether the programme is a good fit.",
  },
  {
    n: "03",
    title: "Complete your assessment",
    body:
      "Share your training history, measurements, preferences and available equipment.",
  },
  {
    n: "04",
    title: "Receive your plan",
    body:
      "Your first training week, nutrition targets and habits are added to your private coaching portal.",
  },
  {
    n: "05",
    title: "Track and adjust",
    body:
      "Complete workouts, log progress and submit weekly check-ins so the plan can evolve with you.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-28 bg-bg-2/50">
      <div className="container-p section">
        <SectionHeader eyebrow="A clear process" title="From application to your first week of training." />

        <div className="mt-12 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06} className="relative">
              <span className="tnum font-heading text-4xl font-extrabold text-accent/25">
                {s.n}
              </span>
              <h3 className="mt-2 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-12">
          <Link href="/apply" className="btn btn-primary">
            Start Your Application
            <ArrowRight className="size-4" strokeWidth={2} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
