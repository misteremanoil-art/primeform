import { Users, Activity, Star, CalendarRange } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { AnimatedNumber } from "@/components/fitness/animated-number";
import { DemoDisclosure } from "@/components/fitness/demo-disclosure";

const stats = [
  { icon: Users, value: 300, suffix: "+", label: "coaching journeys" },
  { icon: Activity, value: 91, suffix: "%", label: "average workout completion" },
  { icon: Star, value: 4.9, decimals: 1, suffix: "/5", label: "average client rating" },
  { icon: CalendarRange, value: 12, suffix: "-week", label: "structured programmes" },
];

export function TrustStrip() {
  return (
    <section className="container-p pb-6 pt-4">
      <Reveal className="surface-card overflow-hidden rounded-section p-6 sm:p-8">
        <p className="text-center text-sm font-medium text-muted">
          A coaching system designed around real life.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-6 sm:gap-4 lg:grid-cols-4">
          {stats.map(({ icon: Icon, value, suffix, decimals, label }) => (
            <div key={label} className="flex flex-col items-center text-center">
              <Icon className="mb-2 size-5 text-accent" strokeWidth={1.7} />
              <span className="font-heading text-3xl font-bold sm:text-4xl">
                <AnimatedNumber value={value} decimals={decimals ?? 0} suffix={suffix} />
              </span>
              <span className="mt-1 text-xs font-medium uppercase tracking-wide text-muted">
                {label}
              </span>
            </div>
          ))}
        </div>
        <DemoDisclosure className="mt-6 w-full justify-center" />
      </Reveal>
    </section>
  );
}
