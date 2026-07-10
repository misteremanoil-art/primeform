"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, User, LayoutDashboard, TriangleAlert } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Field, TextInput } from "@/components/ui/form";
import { usePrimeStore } from "@/lib/store/store";

export default function LoginPage() {
  const router = useRouter();
  const setRole = usePrimeStore((s) => s.setRole);
  const [error, setError] = useState<string | null>(null);

  const enterAs = (role: "client" | "coach") => {
    setRole(role);
    router.push(role === "client" ? "/portal" : "/coach");
  };

  return (
    <section className="container-p section">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_1fr]">
        {/* Demo entry */}
        <div className="order-first">
          <p className="eyebrow">Demo access</p>
          <h1 className="mt-3 text-4xl sm:text-5xl">Welcome back.</h1>
          <p className="mt-4 max-w-md text-muted">
            Access your training plan, progress, check-ins and coach messages.
          </p>

          <div className="mt-8 space-y-4">
            <GlassCard variant="solid" className="p-5">
              <div className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent/12 text-accent">
                  <User className="size-5" strokeWidth={1.7} />
                </span>
                <div className="flex-1">
                  <p className="font-semibold">Try the Client Experience</p>
                  <p className="mt-0.5 text-sm text-muted">
                    View a pre-filled client account with workouts, progress and
                    check-ins.
                  </p>
                  <button onClick={() => enterAs("client")} className="btn btn-primary mt-4 h-10 min-h-0 px-4 py-0 text-sm">
                    Enter as Alex
                    <ArrowRight className="size-4" strokeWidth={2} />
                  </button>
                </div>
              </div>
            </GlassCard>

            <GlassCard variant="solid" className="p-5">
              <div className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gold/15 text-[color:var(--gold)]">
                  <LayoutDashboard className="size-5" strokeWidth={1.7} />
                </span>
                <div className="flex-1">
                  <p className="font-semibold">Try the Coach Experience</p>
                  <p className="mt-0.5 text-sm text-muted">
                    Explore leads, clients, bookings and programme management.
                  </p>
                  <button onClick={() => enterAs("coach")} className="btn btn-secondary mt-4 h-10 min-h-0 px-4 py-0 text-sm">
                    Enter as Coach
                    <ArrowRight className="size-4" strokeWidth={2} />
                  </button>
                </div>
              </div>
            </GlassCard>
          </div>

          <div className="mt-5 flex items-start gap-2 rounded-md border border-clay/25 bg-clay/8 p-3 text-sm text-clay">
            <TriangleAlert className="mt-0.5 size-4 shrink-0" strokeWidth={1.8} />
            <span>Changes made inside the public demo may be reset periodically.</span>
          </div>
        </div>

        {/* Standard login (demo) */}
        <GlassCard variant="solid" className="h-fit p-6 sm:p-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setError("The email address or password is incorrect.");
            }}
            className="space-y-4"
          >
            <p className="text-lg font-bold">Log in to your account</p>
            <Field label="Email address">
              <TextInput type="email" placeholder="you@email.com" />
            </Field>
            <Field label="Password" error={error ?? undefined}>
              <TextInput type="password" placeholder="••••••••" />
            </Field>
            <button type="submit" className="btn btn-primary w-full">
              Log In
            </button>
            <div className="flex items-center justify-between text-sm text-muted">
              <button type="button" className="hover:text-ink">Forgot password?</button>
              <button type="button" className="hover:text-ink">Use a magic link</button>
            </div>
            <p className="border-t border-line pt-4 text-center text-xs text-faint">
              This is a demo. Use{" "}
              <span className="font-semibold text-muted">Enter as Alex</span> or{" "}
              <span className="font-semibold text-muted">Enter as Coach</span> to explore.
            </p>
          </form>
        </GlassCard>
      </div>

      <p className="mt-10 text-center text-sm text-muted">
        New to PRIMEFORM?{" "}
        <Link href="/apply" className="font-semibold text-accent hover:text-ink">
          Apply for coaching
        </Link>
      </p>
    </section>
  );
}
