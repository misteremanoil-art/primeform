"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, User, LayoutDashboard, TriangleAlert } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Field, TextInput } from "@/components/ui/form";
import { usePrimeStore } from "@/lib/store/store";
import { useI18n } from "@/lib/i18n";

const copy = {
  en: {
    eyebrow: "Demo access",
    welcome: "Welcome back.",
    intro: "Access your training plan, progress, check-ins and coach messages.",
    clientTitle: "Try the Client Experience",
    clientBody: "View a pre-filled client account with workouts, progress and check-ins.",
    enterAlex: "Enter as Alex",
    coachTitle: "Try the Coach Experience",
    coachBody: "Explore leads, clients, bookings and programme management.",
    enterCoach: "Enter as Coach",
    resetNotice: "Changes made inside the public demo may be reset periodically.",
    loginHeading: "Log in to your account",
    emailLabel: "Email address",
    passwordLabel: "Password",
    loginError: "The email address or password is incorrect.",
    logIn: "Log In",
    forgot: "Forgot password?",
    magicLink: "Use a magic link",
    demoHintBefore: "This is a demo. Use",
    demoHintOr: "or",
    demoHintAfter: "to explore.",
    newHere: "New to PRIMEFORM?",
    apply: "Apply for coaching",
  },
  ro: {
    eyebrow: "Acces demo",
    welcome: "Bine ai revenit.",
    intro: "Accesează-ți planul de antrenament, progresul, check-in-urile și mesajele de la antrenor.",
    clientTitle: "Încearcă experiența clientului",
    clientBody: "Vezi un cont de client precompletat, cu antrenamente, progres și check-in-uri.",
    enterAlex: "Intră ca Alex",
    coachTitle: "Încearcă experiența antrenorului",
    coachBody: "Explorează lead-uri, clienți, programări și gestionarea programelor.",
    enterCoach: "Intră ca antrenor",
    resetNotice: "Modificările făcute în demo-ul public pot fi resetate periodic.",
    loginHeading: "Autentifică-te în contul tău",
    emailLabel: "Adresă de e-mail",
    passwordLabel: "Parolă",
    loginError: "Adresa de e-mail sau parola este incorectă.",
    logIn: "Autentificare",
    forgot: "Ai uitat parola?",
    magicLink: "Folosește un magic link",
    demoHintBefore: "Acesta este un demo. Folosește",
    demoHintOr: "sau",
    demoHintAfter: "pentru a explora.",
    newHere: "Nou pe PRIMEFORM?",
    apply: "Aplică pentru coaching",
  },
} as const;

export default function LoginPage() {
  const router = useRouter();
  const { lang } = useI18n();
  const t = copy[lang];
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
          <p className="eyebrow">{t.eyebrow}</p>
          <h1 className="mt-3 text-4xl sm:text-5xl">{t.welcome}</h1>
          <p className="mt-4 max-w-md text-muted">{t.intro}</p>

          <div className="mt-8 space-y-4">
            <GlassCard variant="solid" className="p-5">
              <div className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent/12 text-accent">
                  <User className="size-5" strokeWidth={1.7} />
                </span>
                <div className="flex-1">
                  <p className="font-semibold">{t.clientTitle}</p>
                  <p className="mt-0.5 text-sm text-muted">{t.clientBody}</p>
                  <button onClick={() => enterAs("client")} className="btn btn-primary mt-4 h-10 min-h-0 px-4 py-0 text-sm">
                    {t.enterAlex}
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
                  <p className="font-semibold">{t.coachTitle}</p>
                  <p className="mt-0.5 text-sm text-muted">{t.coachBody}</p>
                  <button onClick={() => enterAs("coach")} className="btn btn-secondary mt-4 h-10 min-h-0 px-4 py-0 text-sm">
                    {t.enterCoach}
                    <ArrowRight className="size-4" strokeWidth={2} />
                  </button>
                </div>
              </div>
            </GlassCard>
          </div>

          <div className="mt-5 flex items-start gap-2 rounded-md border border-clay/25 bg-clay/8 p-3 text-sm text-clay">
            <TriangleAlert className="mt-0.5 size-4 shrink-0" strokeWidth={1.8} />
            <span>{t.resetNotice}</span>
          </div>
        </div>

        {/* Standard login (demo) */}
        <GlassCard variant="solid" className="h-fit p-6 sm:p-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setError(t.loginError);
            }}
            className="space-y-4"
          >
            <p className="text-lg font-bold">{t.loginHeading}</p>
            <Field label={t.emailLabel}>
              <TextInput type="email" placeholder="you@email.com" />
            </Field>
            <Field label={t.passwordLabel} error={error ?? undefined}>
              <TextInput type="password" placeholder="••••••••" />
            </Field>
            <button type="submit" className="btn btn-primary w-full">
              {t.logIn}
            </button>
            <div className="flex items-center justify-between text-sm text-muted">
              <button type="button" className="hover:text-ink">{t.forgot}</button>
              <button type="button" className="hover:text-ink">{t.magicLink}</button>
            </div>
            <p className="border-t border-line pt-4 text-center text-xs text-faint">
              {t.demoHintBefore}{" "}
              <span className="font-semibold text-muted">{t.enterAlex}</span> {t.demoHintOr}{" "}
              <span className="font-semibold text-muted">{t.enterCoach}</span> {t.demoHintAfter}
            </p>
          </form>
        </GlassCard>
      </div>

      <p className="mt-10 text-center text-sm text-muted">
        {t.newHere}{" "}
        <Link href="/apply" className="font-semibold text-accent hover:text-ink">
          {t.apply}
        </Link>
      </p>
    </section>
  );
}
