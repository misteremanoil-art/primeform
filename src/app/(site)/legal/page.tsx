import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/site/page-intro";
import { GlassCard } from "@/components/ui/glass-card";

export const metadata: Metadata = {
  title: "Legal & Privacy",
  description:
    "Privacy summary, terms and cookie information for the PRIMEFORM demo by Emanoil Studio.",
};

const collected = [
  "name",
  "email",
  "telephone number",
  "fitness goals",
  "booking details",
  "demo progress information",
];

export default function LegalPage() {
  return (
    <>
      <PageIntro eyebrow="Legal" title="Privacy, terms & cookies.">
        PRIMEFORM is a fictional demo. This page summarises how the demo handles the
        limited test information it collects.
      </PageIntro>

      <section className="container-p section pt-4">
        <div className="max-w-2xl space-y-6">
          <GlassCard variant="solid" className="p-6 sm:p-8">
            <h2 className="text-xl font-bold">Privacy summary</h2>
            <p className="mt-3 text-muted">
              The demo may collect test information submitted through forms, including:
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
              {collected.map((c) => (
                <li key={c} className="flex items-center gap-2 text-muted">
                  <span className="size-1.5 rounded-full bg-accent" />
                  <span className="capitalize">{c}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-3 border-t border-line pt-4 text-muted">
              <p>Public visitors should be informed not to submit sensitive medical information.</p>
              <p>Demo data may be periodically deleted or reset.</p>
              <p>
                The production version of the platform would require a complete privacy
                policy, cookie policy, data-processing agreements and data-retention
                rules appropriate to the client&rsquo;s business.
              </p>
            </div>
          </GlassCard>

          <GlassCard variant="solid" className="p-6 sm:p-8">
            <h2 className="text-xl font-bold">Cookies</h2>
            <p className="mt-3 text-muted">
              We use essential cookies to operate this demo and optional analytics
              cookies to understand how it is used. You can accept or reject optional
              cookies from the banner. Cookie categories: Essential, Analytics,
              Marketing.
            </p>
          </GlassCard>

          <GlassCard variant="solid" className="p-6 sm:p-8">
            <h2 className="text-xl font-bold">Terms</h2>
            <p className="mt-3 text-muted">
              This site is a portfolio demonstration. All names, images, statistics,
              qualifications, testimonials, prices and results are fictional and provided
              only to demonstrate a complete coaching platform. See the{" "}
              <Link href="/health-disclaimer" className="font-semibold text-accent hover:text-ink">
                health disclaimer
              </Link>{" "}
              for guidance on exercise and nutrition information.
            </p>
          </GlassCard>
        </div>
      </section>
    </>
  );
}
