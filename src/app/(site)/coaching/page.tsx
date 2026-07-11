import type { Metadata } from "next";
import { CoachingContent } from "./coaching-content";

export const metadata: Metadata = {
  title: "Online Coaching",
  description:
    "A complete online coaching system: structured workouts, nutrition guidance, weekly reviews and direct access to your coach.",
};

export default function CoachingPage() {
  return <CoachingContent />;
}
