export interface CaseMetric {
  label: string;
  value: string;
}

export interface CaseStudy {
  slug: string;
  name: string;
  focus: string;
  duration: string;
  headline: CaseMetric; // the standout metric
  metrics: CaseMetric[];
  achievement: string;
  quote: string;
  relatedService: string;
  relatedHref: string;
  filters: string[]; // which /results filters this belongs to
  // Detail-page content (§7 structure)
  profile: string;
  startingSituation: string;
  obstacles: string[];
  approach: string;
  programme: string;
  timeline: { marker: string; detail: string }[];
  lessons: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "alex",
    name: "Alex",
    focus: "Fat Loss and Consistency",
    duration: "12 weeks",
    headline: { label: "body weight", value: "−6.6 kg" },
    metrics: [
      { label: "Starting weight", value: "96.4 kg" },
      { label: "Current weight", value: "89.8 kg" },
      { label: "Workouts completed", value: "91%" },
    ],
    achievement: "Built a repeatable training routine around a full-time job.",
    quote:
      "I stopped looking for the perfect week and started following a plan I could actually maintain.",
    relatedService: "Online Coaching",
    relatedHref: "/coaching",
    filters: ["Fat Loss", "Lifestyle", "8–12 Weeks"],
    profile:
      "A full-time professional who trained regularly but without a clear direction, and wanted fat loss without an extreme approach.",
    startingSituation:
      "Training three to four times a week with inconsistent nutrition and no structured way to know whether the work was moving towards the goal.",
    obstacles: [
      "A demanding work schedule that changed week to week.",
      "Nutrition that felt strict for a few days and then unravelled.",
      "No feedback loop to adjust the plan when progress slowed.",
    ],
    approach:
      "A sustainable calorie target with a protein focus, four flexible training days and a weekly check-in used to make small, timely adjustments rather than large corrections.",
    programme: "12-Week Fat Loss Foundation · four weekly sessions",
    timeline: [
      { marker: "Weeks 0–1", detail: "Assessment, baseline measurements and first training week." },
      { marker: "Weeks 2–4", detail: "Routine established; early obstacles identified and removed." },
      { marker: "Weeks 5–8", detail: "Volume and nutrition adjusted using check-in data." },
      { marker: "Weeks 9–12", detail: "Consolidation and planning of the next phase." },
    ],
    lessons: [
      "Consistency over intensity produced the most reliable progress.",
      "Weekly reviews kept small problems from becoming lost months.",
    ],
  },
  {
    slug: "maria",
    name: "Maria",
    focus: "Strength and Recomposition",
    duration: "16 weeks",
    headline: { label: "strength", value: "+32%" },
    metrics: [
      { label: "Strength increase", value: "+32%" },
      { label: "Waist reduction", value: "7 cm" },
      { label: "Workouts completed", value: "94%" },
    ],
    achievement: "Improved strength while maintaining a flexible social life.",
    quote:
      "For the first time, I understood why I was doing each exercise and how to progress it.",
    relatedService: "Online Coaching",
    relatedHref: "/coaching",
    filters: ["Strength", "Lifestyle", "12+ Weeks"],
    profile:
      "An experienced trainee who wanted to get meaningfully stronger and improve body composition without giving up a busy social calendar.",
    startingSituation:
      "Training consistently but repeating the same sessions, with progress that had plateaued and little understanding of how to progress each lift.",
    obstacles: [
      "A plateau from repeating the same workouts.",
      "Uncertainty about how and when to add load.",
      "A social schedule that made rigid plans hard to keep.",
    ],
    approach:
      "A progressive strength programme with clear progression rules, flexible nutrition targets that fit social events and a weekly review to confirm the next step.",
    programme: "Strength and Recomposition · four weekly sessions",
    timeline: [
      { marker: "Weeks 0–2", detail: "Movement review and baseline strength testing." },
      { marker: "Weeks 3–8", detail: "Progressive overload with structured deloads." },
      { marker: "Weeks 9–14", detail: "Refinement of technique and load management." },
      { marker: "Weeks 15–16", detail: "Retest and next-phase planning." },
    ],
    lessons: [
      "Understanding the why behind each exercise improved adherence.",
      "Flexibility around social life made the plan sustainable.",
    ],
  },
  {
    slug: "vlad",
    name: "Vlad",
    focus: "Muscle Gain",
    duration: "20 weeks",
    headline: { label: "body weight", value: "+5.1 kg" },
    metrics: [
      { label: "Body weight increase", value: "5.1 kg" },
      { label: "Training consistency", value: "88%" },
    ],
    achievement: "Added structure and progression to years of inconsistent training.",
    quote:
      "The biggest difference was having someone review the details before small problems became lost months.",
    relatedService: "Hybrid Coaching",
    relatedHref: "/coaching",
    filters: ["Muscle Gain", "12+ Weeks"],
    profile:
      "A long-time gym-goer with years of unstructured training who wanted to finally build muscle with a clear plan.",
    startingSituation:
      "Frequent training with little progression and no record of what worked, leading to slow and unpredictable results.",
    obstacles: [
      "Years of training without structure or progression.",
      "No tracking to inform decisions.",
      "Difficulty eating enough to support muscle gain.",
    ],
    approach:
      "A higher-frequency programme with tracked progression, a calorie surplus built around practical meals and regular check-ins to keep the details on track.",
    programme: "Lean Muscle Build · five weekly sessions",
    timeline: [
      { marker: "Weeks 0–2", detail: "Baseline, nutrition setup and programme introduction." },
      { marker: "Weeks 3–10", detail: "Progressive volume with consistent tracking." },
      { marker: "Weeks 11–18", detail: "Continued progression and recovery management." },
      { marker: "Weeks 19–20", detail: "Review of gains and next-block design." },
    ],
    lessons: [
      "Tracking turned guesswork into steady progression.",
      "Reviewing the details early prevented long stalls.",
    ],
  },
];

export const getCaseStudy = (slug: string) =>
  caseStudies.find((c) => c.slug === slug);

export const resultFilters = [
  "All Results",
  "Fat Loss",
  "Muscle Gain",
  "Strength",
  "Beginners",
  "Lifestyle",
  "8–12 Weeks",
  "12+ Weeks",
] as const;
