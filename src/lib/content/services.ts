export interface Service {
  id: string;
  name: { en: string; ro: string };
  tagline: { en: string; ro: string };
  includes: { en: string; ro: string }[];
  ctaLabel: { en: string; ro: string };
  href: string;
  highlighted?: boolean;
}

export const services: Service[] = [
  {
    id: "online",
    name: { en: "Online Coaching", ro: "Coaching online" },
    tagline: {
      en: "A complete remote coaching system for clients who want structure, flexibility and direct support.",
      ro: "Un sistem complet de coaching la distanță pentru cei care vor structură, flexibilitate și sprijin direct.",
    },
    includes: [
      { en: "personalised training programme", ro: "program de antrenament personalizat" },
      { en: "weekly check-in", ro: "check-in săptămânal" },
      { en: "nutrition targets", ro: "obiective de nutriție" },
      { en: "progress dashboard", ro: "panou de progres" },
      { en: "exercise demonstrations", ro: "demonstrații pentru exerciții" },
      { en: "direct messaging", ro: "mesagerie directă" },
      { en: "monthly programme review", ro: "revizuire lunară a programului" },
    ],
    ctaLabel: { en: "Explore Online Coaching", ro: "Descoperă coaching-ul online" },
    href: "/coaching",
  },
  {
    id: "hybrid",
    name: { en: "Hybrid Coaching", ro: "Coaching hibrid" },
    tagline: {
      en: "In-person sessions combined with a complete online plan for the rest of the week.",
      ro: "Ședințe față în față combinate cu un plan online complet pentru restul săptămânii.",
    },
    includes: [
      { en: "scheduled personal training sessions", ro: "ședințe programate de antrenament personal" },
      { en: "additional online workouts", ro: "antrenamente online suplimentare" },
      { en: "weekly check-ins", ro: "check-in-uri săptămânale" },
      { en: "nutrition guidance", ro: "îndrumare în nutriție" },
      { en: "full progress tracking", ro: "monitorizare completă a progresului" },
      { en: "support between sessions", ro: "sprijin între ședințe" },
    ],
    ctaLabel: { en: "Explore Hybrid Coaching", ro: "Descoperă coaching-ul hibrid" },
    href: "/coaching#hybrid",
    highlighted: true,
  },
  {
    id: "personal",
    name: { en: "Personal Training", ro: "Antrenament personal" },
    tagline: {
      en: "Private coaching sessions focused on technique, confidence and measurable progression.",
      ro: "Ședințe private de coaching axate pe tehnică, încredere și progres măsurabil.",
    },
    includes: [
      { en: "one-to-one sessions", ro: "ședințe individuale" },
      { en: "movement and technique guidance", ro: "îndrumare pentru mișcare și tehnică" },
      { en: "personalised session planning", ro: "planificare personalizată a ședințelor" },
      { en: "strength and performance tracking", ro: "monitorizarea forței și a performanței" },
      { en: "supplementary home or gym programme", ro: "program suplimentar acasă sau la sală" },
    ],
    ctaLabel: { en: "Explore Personal Training", ro: "Descoperă antrenamentul personal" },
    href: "/personal-training",
  },
];
