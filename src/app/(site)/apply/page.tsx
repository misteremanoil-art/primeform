import type { Metadata } from "next";
import { ApplyContent } from "./apply-content";

export const metadata: Metadata = {
  title: "Apply for Coaching",
  description:
    "A short application to help determine whether PRIMEFORM is the right coaching option for your goal. Submitting does not create a payment or commitment.",
};

export default function ApplyPage() {
  return <ApplyContent />;
}
