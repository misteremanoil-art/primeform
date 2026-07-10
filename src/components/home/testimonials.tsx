import { Quote } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";
import { DemoDisclosure } from "@/components/fitness/demo-disclosure";
import { SectionHeader } from "./section-header";

const testimonials = [
  {
    quote:
      "The plan was detailed, but never overwhelming. I always knew what I had to do next.",
    name: "Elena M.",
    service: "Online Coaching",
  },
  {
    quote:
      "My programme changed when my schedule changed. That made the difference between quitting and continuing.",
    name: "Radu P.",
    service: "Hybrid Coaching",
  },
  {
    quote:
      "The weekly check-in kept me honest without making me feel judged.",
    name: "Andreea T.",
    service: "Online Coaching",
  },
  {
    quote:
      "I became stronger, but the biggest result was finally feeling confident inside a gym.",
    name: "Mihai C.",
    service: "Personal Training",
  },
];

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("");
  return (
    <span
      className="grid size-10 shrink-0 place-items-center rounded-full text-sm font-bold text-accent-ink"
      style={{
        background:
          "linear-gradient(135deg, var(--accent), color-mix(in oklab, var(--gold) 70%, var(--accent)))",
      }}
      aria-hidden
    >
      {initials}
    </span>
  );
}

export function Testimonials() {
  return (
    <section className="section">
      <div className="container-p">
        <SectionHeader title="Support that continues after the programme is delivered." />
      </div>

      <Reveal className="mt-10">
        <div className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-[max(1.15rem,calc((100vw-1200px)/2+1.15rem))] pb-4">
          {testimonials.map((t) => (
            <GlassCard
              key={t.name}
              variant="standard"
              className="flex w-[300px] shrink-0 snap-start flex-col p-6 sm:w-[360px]"
            >
              <Quote className="size-6 text-accent/50" strokeWidth={1.6} />
              <p className="mt-3 flex-1 text-[0.98rem] leading-relaxed">“{t.quote}”</p>
              <div className="mt-5 flex items-center gap-3">
                <Avatar name={t.name} />
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted">{t.service}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </Reveal>

      <div className="container-p mt-4">
        <DemoDisclosure>
          Testimonials are fictional and included to demonstrate the platform
          experience.
        </DemoDisclosure>
      </div>
    </section>
  );
}
