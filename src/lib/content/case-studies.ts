import type { Localized } from "@/lib/i18n";

export interface CaseMetric {
  label: Localized;
  value: string;
}

export interface CaseStudy {
  slug: string;
  name: string;
  focus: Localized;
  duration: Localized;
  headline: CaseMetric; // the standout metric
  metrics: CaseMetric[];
  achievement: Localized;
  quote: Localized;
  relatedService: Localized;
  relatedHref: string;
  filters: string[]; // stable English keys used only for filtering
  // Detail-page content (§7 structure)
  profile: Localized;
  startingSituation: Localized;
  obstacles: Localized[];
  approach: Localized;
  programme: Localized;
  timeline: { marker: Localized; detail: Localized }[];
  lessons: Localized[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "alex",
    name: "Alex",
    focus: { en: "Fat Loss and Consistency", ro: "Slăbire și consecvență" },
    duration: { en: "12 weeks", ro: "12 săptămâni" },
    headline: {
      label: { en: "body weight", ro: "greutate corporală" },
      value: "−6.6 kg",
    },
    metrics: [
      { label: { en: "Starting weight", ro: "Greutate inițială" }, value: "96.4 kg" },
      { label: { en: "Current weight", ro: "Greutate actuală" }, value: "89.8 kg" },
      { label: { en: "Workouts completed", ro: "Antrenamente finalizate" }, value: "91%" },
    ],
    achievement: {
      en: "Built a repeatable training routine around a full-time job.",
      ro: "Și-a construit o rutină de antrenament repetabilă în jurul unui job cu normă întreagă.",
    },
    quote: {
      en: "I stopped looking for the perfect week and started following a plan I could actually maintain.",
      ro: "Am încetat să caut săptămâna perfectă și am început să urmez un plan pe care chiar îl pot menține.",
    },
    relatedService: { en: "Online Coaching", ro: "Coaching online" },
    relatedHref: "/coaching",
    filters: ["Fat Loss", "Lifestyle", "8–12 Weeks"],
    profile: {
      en: "A full-time professional who trained regularly but without a clear direction, and wanted fat loss without an extreme approach.",
      ro: "Un profesionist cu normă întreagă care se antrena regulat, dar fără o direcție clară, și își dorea să slăbească fără o abordare extremă.",
    },
    startingSituation: {
      en: "Training three to four times a week with inconsistent nutrition and no structured way to know whether the work was moving towards the goal.",
      ro: "Se antrena de trei-patru ori pe săptămână, cu o nutriție inconstantă și fără o modalitate structurată de a ști dacă efortul îl apropia de obiectiv.",
    },
    obstacles: [
      {
        en: "A demanding work schedule that changed week to week.",
        ro: "Un program de lucru solicitant, care se schimba de la o săptămână la alta.",
      },
      {
        en: "Nutrition that felt strict for a few days and then unravelled.",
        ro: "O nutriție care părea strictă câteva zile, apoi se destrăma.",
      },
      {
        en: "No feedback loop to adjust the plan when progress slowed.",
        ro: "Lipsa unui feedback constant pentru a ajusta planul când progresul încetinea.",
      },
    ],
    approach: {
      en: "A sustainable calorie target with a protein focus, four flexible training days and a weekly check-in used to make small, timely adjustments rather than large corrections.",
      ro: "Un target caloric sustenabil, cu accent pe proteine, patru zile de antrenament flexibile și un check-in săptămânal folosit pentru ajustări mici și la timp, în locul unor corecții mari.",
    },
    programme: {
      en: "12-Week Fat Loss Foundation · four weekly sessions",
      ro: "Fundație de slăbire pe 12 săptămâni · patru sesiuni pe săptămână",
    },
    timeline: [
      {
        marker: { en: "Weeks 0–1", ro: "Săptămânile 0–1" },
        detail: {
          en: "Assessment, baseline measurements and first training week.",
          ro: "Evaluare, măsurători inițiale și prima săptămână de antrenament.",
        },
      },
      {
        marker: { en: "Weeks 2–4", ro: "Săptămânile 2–4" },
        detail: {
          en: "Routine established; early obstacles identified and removed.",
          ro: "Rutină stabilită; obstacolele timpurii identificate și eliminate.",
        },
      },
      {
        marker: { en: "Weeks 5–8", ro: "Săptămânile 5–8" },
        detail: {
          en: "Volume and nutrition adjusted using check-in data.",
          ro: "Volum și nutriție ajustate pe baza datelor din check-in.",
        },
      },
      {
        marker: { en: "Weeks 9–12", ro: "Săptămânile 9–12" },
        detail: {
          en: "Consolidation and planning of the next phase.",
          ro: "Consolidare și planificarea etapei următoare.",
        },
      },
    ],
    lessons: [
      {
        en: "Consistency over intensity produced the most reliable progress.",
        ro: "Consecvența, mai mult decât intensitatea, a adus cel mai constant progres.",
      },
      {
        en: "Weekly reviews kept small problems from becoming lost months.",
        ro: "Analizele săptămânale au împiedicat problemele mici să devină luni pierdute.",
      },
    ],
  },
  {
    slug: "maria",
    name: "Maria",
    focus: { en: "Strength and Recomposition", ro: "Forță și recompoziție corporală" },
    duration: { en: "16 weeks", ro: "16 săptămâni" },
    headline: { label: { en: "strength", ro: "forță" }, value: "+32%" },
    metrics: [
      { label: { en: "Strength increase", ro: "Creștere a forței" }, value: "+32%" },
      { label: { en: "Waist reduction", ro: "Reducere talie" }, value: "7 cm" },
      { label: { en: "Workouts completed", ro: "Antrenamente finalizate" }, value: "94%" },
    ],
    achievement: {
      en: "Improved strength while maintaining a flexible social life.",
      ro: "Și-a îmbunătățit forța păstrând o viață socială flexibilă.",
    },
    quote: {
      en: "For the first time, I understood why I was doing each exercise and how to progress it.",
      ro: "Pentru prima dată am înțeles de ce fac fiecare exercițiu și cum să progresez la el.",
    },
    relatedService: { en: "Online Coaching", ro: "Coaching online" },
    relatedHref: "/coaching",
    filters: ["Strength", "Lifestyle", "12+ Weeks"],
    profile: {
      en: "An experienced trainee who wanted to get meaningfully stronger and improve body composition without giving up a busy social calendar.",
      ro: "O persoană cu experiență în antrenamente, care voia să devină semnificativ mai puternică și să-și îmbunătățească compoziția corporală fără să renunțe la o agendă socială încărcată.",
    },
    startingSituation: {
      en: "Training consistently but repeating the same sessions, with progress that had plateaued and little understanding of how to progress each lift.",
      ro: "Se antrena constant, dar repeta aceleași sesiuni, cu un progres stagnat și cu puține repere despre cum să progreseze la fiecare exercițiu.",
    },
    obstacles: [
      {
        en: "A plateau from repeating the same workouts.",
        ro: "Un platou cauzat de repetarea acelorași antrenamente.",
      },
      {
        en: "Uncertainty about how and when to add load.",
        ro: "Incertitudine legată de cum și când să adauge greutate.",
      },
      {
        en: "A social schedule that made rigid plans hard to keep.",
        ro: "Un program social care făcea greu de respectat planurile rigide.",
      },
    ],
    approach: {
      en: "A progressive strength programme with clear progression rules, flexible nutrition targets that fit social events and a weekly review to confirm the next step.",
      ro: "Un program progresiv de forță, cu reguli clare de progresie, targeturi nutriționale flexibile care se potriveau cu evenimentele sociale și o analiză săptămânală pentru a confirma pasul următor.",
    },
    programme: {
      en: "Strength and Recomposition · four weekly sessions",
      ro: "Forță și recompoziție · patru sesiuni pe săptămână",
    },
    timeline: [
      {
        marker: { en: "Weeks 0–2", ro: "Săptămânile 0–2" },
        detail: {
          en: "Movement review and baseline strength testing.",
          ro: "Evaluarea mișcărilor și testarea inițială a forței.",
        },
      },
      {
        marker: { en: "Weeks 3–8", ro: "Săptămânile 3–8" },
        detail: {
          en: "Progressive overload with structured deloads.",
          ro: "Suprasarcină progresivă, cu descărcări (deload) structurate.",
        },
      },
      {
        marker: { en: "Weeks 9–14", ro: "Săptămânile 9–14" },
        detail: {
          en: "Refinement of technique and load management.",
          ro: "Rafinarea tehnicii și gestionarea încărcăturii.",
        },
      },
      {
        marker: { en: "Weeks 15–16", ro: "Săptămânile 15–16" },
        detail: {
          en: "Retest and next-phase planning.",
          ro: "Retestare și planificarea etapei următoare.",
        },
      },
    ],
    lessons: [
      {
        en: "Understanding the why behind each exercise improved adherence.",
        ro: "Înțelegerea motivului din spatele fiecărui exercițiu a îmbunătățit aderența.",
      },
      {
        en: "Flexibility around social life made the plan sustainable.",
        ro: "Flexibilitatea față de viața socială a făcut planul sustenabil.",
      },
    ],
  },
  {
    slug: "vlad",
    name: "Vlad",
    focus: { en: "Muscle Gain", ro: "Creștere musculară" },
    duration: { en: "20 weeks", ro: "20 de săptămâni" },
    headline: {
      label: { en: "body weight", ro: "greutate corporală" },
      value: "+5.1 kg",
    },
    metrics: [
      { label: { en: "Body weight increase", ro: "Creștere a greutății corporale" }, value: "5.1 kg" },
      { label: { en: "Training consistency", ro: "Consecvența antrenamentelor" }, value: "88%" },
    ],
    achievement: {
      en: "Added structure and progression to years of inconsistent training.",
      ro: "A adus structură și progresie după ani de antrenamente inconstante.",
    },
    quote: {
      en: "The biggest difference was having someone review the details before small problems became lost months.",
      ro: "Cea mai mare diferență a fost să am pe cineva care analizează detaliile înainte ca problemele mici să devină luni pierdute.",
    },
    relatedService: { en: "Hybrid Coaching", ro: "Coaching hibrid" },
    relatedHref: "/coaching",
    filters: ["Muscle Gain", "12+ Weeks"],
    profile: {
      en: "A long-time gym-goer with years of unstructured training who wanted to finally build muscle with a clear plan.",
      ro: "Un practicant vechi de sală, cu ani de antrenamente nestructurate, care voia în sfârșit să pună masă musculară cu un plan clar.",
    },
    startingSituation: {
      en: "Frequent training with little progression and no record of what worked, leading to slow and unpredictable results.",
      ro: "Antrenamente frecvente, cu progresie redusă și fără o evidență a ceea ce funcționa, ceea ce ducea la rezultate lente și imprevizibile.",
    },
    obstacles: [
      {
        en: "Years of training without structure or progression.",
        ro: "Ani de antrenamente fără structură sau progresie.",
      },
      {
        en: "No tracking to inform decisions.",
        ro: "Lipsa monitorizării pentru a fundamenta deciziile.",
      },
      {
        en: "Difficulty eating enough to support muscle gain.",
        ro: "Dificultatea de a mânca suficient pentru a susține creșterea musculară.",
      },
    ],
    approach: {
      en: "A higher-frequency programme with tracked progression, a calorie surplus built around practical meals and regular check-ins to keep the details on track.",
      ro: "Un program cu frecvență mai mare, cu progresie monitorizată, un surplus caloric construit în jurul unor mese practice și check-in-uri regulate pentru a ține detaliile sub control.",
    },
    programme: {
      en: "Lean Muscle Build · five weekly sessions",
      ro: "Construcție de masă musculară de calitate · cinci sesiuni pe săptămână",
    },
    timeline: [
      {
        marker: { en: "Weeks 0–2", ro: "Săptămânile 0–2" },
        detail: {
          en: "Baseline, nutrition setup and programme introduction.",
          ro: "Evaluare inițială, configurarea nutriției și introducerea programului.",
        },
      },
      {
        marker: { en: "Weeks 3–10", ro: "Săptămânile 3–10" },
        detail: {
          en: "Progressive volume with consistent tracking.",
          ro: "Volum progresiv, cu monitorizare constantă.",
        },
      },
      {
        marker: { en: "Weeks 11–18", ro: "Săptămânile 11–18" },
        detail: {
          en: "Continued progression and recovery management.",
          ro: "Progresie continuă și gestionarea recuperării.",
        },
      },
      {
        marker: { en: "Weeks 19–20", ro: "Săptămânile 19–20" },
        detail: {
          en: "Review of gains and next-block design.",
          ro: "Analiza câștigurilor și proiectarea blocului următor.",
        },
      },
    ],
    lessons: [
      {
        en: "Tracking turned guesswork into steady progression.",
        ro: "Monitorizarea a transformat presupunerile într-o progresie constantă.",
      },
      {
        en: "Reviewing the details early prevented long stalls.",
        ro: "Analiza timpurie a detaliilor a prevenit stagnările lungi.",
      },
    ],
  },
];

export const getCaseStudy = (slug: string) =>
  caseStudies.find((c) => c.slug === slug);

export const resultFilters = [
  { key: "All Results", label: { en: "All Results", ro: "Toate rezultatele" } },
  { key: "Fat Loss", label: { en: "Fat Loss", ro: "Slăbire" } },
  { key: "Muscle Gain", label: { en: "Muscle Gain", ro: "Creștere musculară" } },
  { key: "Strength", label: { en: "Strength", ro: "Forță" } },
  { key: "Beginners", label: { en: "Beginners", ro: "Începători" } },
  { key: "Lifestyle", label: { en: "Lifestyle", ro: "Stil de viață" } },
  { key: "8–12 Weeks", label: { en: "8–12 Weeks", ro: "8–12 săptămâni" } },
  { key: "12+ Weeks", label: { en: "12+ Weeks", ro: "12+ săptămâni" } },
] as const;
