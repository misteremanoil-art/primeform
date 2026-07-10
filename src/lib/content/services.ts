export interface Service {
  id: string;
  name: string;
  tagline: string;
  includes: string[];
  ctaLabel: string;
  href: string;
  highlighted?: boolean;
}

export const services: Service[] = [
  {
    id: "online",
    name: "Online Coaching",
    tagline:
      "A complete remote coaching system for clients who want structure, flexibility and direct support.",
    includes: [
      "personalised training programme",
      "weekly check-in",
      "nutrition targets",
      "progress dashboard",
      "exercise demonstrations",
      "direct messaging",
      "monthly programme review",
    ],
    ctaLabel: "Explore Online Coaching",
    href: "/coaching",
  },
  {
    id: "hybrid",
    name: "Hybrid Coaching",
    tagline:
      "In-person sessions combined with a complete online plan for the rest of the week.",
    includes: [
      "scheduled personal training sessions",
      "additional online workouts",
      "weekly check-ins",
      "nutrition guidance",
      "full progress tracking",
      "support between sessions",
    ],
    ctaLabel: "Explore Hybrid Coaching",
    href: "/coaching#hybrid",
    highlighted: true,
  },
  {
    id: "personal",
    name: "Personal Training",
    tagline:
      "Private coaching sessions focused on technique, confidence and measurable progression.",
    includes: [
      "one-to-one sessions",
      "movement and technique guidance",
      "personalised session planning",
      "strength and performance tracking",
      "supplementary home or gym programme",
    ],
    ctaLabel: "Explore Personal Training",
    href: "/personal-training",
  },
];
