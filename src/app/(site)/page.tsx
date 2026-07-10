import { Hero } from "@/components/home/hero";
import { TrustStrip } from "@/components/home/trust-strip";
import { ProblemSection } from "@/components/home/problem-section";
import { CoachingSystem } from "@/components/home/coaching-system";
import { HowItWorks } from "@/components/home/how-it-works";
import { PortalPreview } from "@/components/home/portal-preview";
import { ResultsSection } from "@/components/home/results-section";
import { ServicesSection } from "@/components/home/services-section";
import { CoachSection } from "@/components/home/coach-section";
import { Testimonials } from "@/components/home/testimonials";
import { Faq } from "@/components/home/faq";
import { FinalCta } from "@/components/home/final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ProblemSection />
      <CoachingSystem />
      <HowItWorks />
      <PortalPreview />
      <ResultsSection />
      <ServicesSection />
      <CoachSection />
      <Testimonials />
      <Faq />
      <FinalCta />
    </>
  );
}
