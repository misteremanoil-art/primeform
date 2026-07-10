import type { Metadata } from "next";
import { ApplyForm } from "@/components/apply/apply-form";

export const metadata: Metadata = {
  title: "Apply for Coaching",
  description:
    "A short application to help determine whether PRIMEFORM is the right coaching option for your goal. Submitting does not create a payment or commitment.",
};

export default function ApplyPage() {
  return (
    <section className="container-p section">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <p className="eyebrow">Application</p>
        <h1 className="mt-3 text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.05]">
          Tell us where you are now and where you want to go.
        </h1>
        <p className="mt-5 text-muted">
          The application takes approximately three minutes. Your answers help
          determine whether PRIMEFORM is the right coaching option for your goal.
          Submitting the form does not create a payment or commitment.
        </p>
      </div>
      <ApplyForm />
    </section>
  );
}
