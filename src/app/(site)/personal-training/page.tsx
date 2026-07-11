import type { Metadata } from "next";
import { PersonalTrainingContent } from "./personal-training-content";

export const metadata: Metadata = {
  title: "Personal Training",
  description:
    "Private one-to-one coaching sessions focused on technique, confidence and measurable progression.",
};

export default function PersonalTrainingPage() {
  return <PersonalTrainingContent />;
}
