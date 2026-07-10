import type {
  AttentionItem,
  Booking,
  CheckIn,
  Client,
  Exercise,
  Habit,
  Lead,
  Message,
  Notification,
  NutritionTargets,
  ProgramTemplate,
  ProgressEntry,
  Workout,
} from "./types";

/* All values below are transcribed verbatim from docs/CONTENT_BRIEF.md so the
   same numbers appear identically across hero, portal preview, results,
   client portal and coach dashboard. One source, zero drift. */

const emptyLogs = (sets: number) =>
  Array.from({ length: sets }, () => ({
    weight: "",
    reps: "",
    difficulty: "",
    notes: "",
    done: false,
  }));

export const seedExercises: Exercise[] = [
  {
    id: "ex-1",
    name: "Incline Dumbbell Press",
    sets: 4,
    reps: "8–10 repetitions",
    rest: "90 seconds rest",
    tempo: "3–1–1",
    previousWeight: "26 kg",
    cue: "Keep your shoulder blades stable and avoid rushing the lowering phase.",
    logs: emptyLogs(4),
  },
  {
    id: "ex-2",
    name: "Chest-Supported Row",
    sets: 4,
    reps: "10 repetitions",
    rest: "90 seconds rest",
    previousWeight: "60 kg",
    cue: "Pull your elbows towards your hips and pause briefly at the top.",
    logs: emptyLogs(4),
  },
  {
    id: "ex-3",
    name: "Seated Dumbbell Shoulder Press",
    sets: 3,
    reps: "8–12 repetitions",
    rest: "75 seconds rest",
    previousWeight: "20 kg",
    logs: emptyLogs(3),
  },
  {
    id: "ex-4",
    name: "Lat Pulldown",
    sets: 3,
    reps: "10–12 repetitions",
    rest: "75 seconds rest",
    previousWeight: "57 kg",
    logs: emptyLogs(3),
  },
  {
    id: "ex-5",
    name: "Cable Lateral Raise",
    sets: 3,
    reps: "12–15 repetitions",
    rest: "60 seconds rest",
    logs: emptyLogs(3),
  },
  {
    id: "ex-6",
    name: "Rope Triceps Pressdown",
    sets: 3,
    reps: "12–15 repetitions",
    rest: "60 seconds rest",
    logs: emptyLogs(3),
  },
];

export const seedWorkout: Workout = {
  id: "wk7-s3",
  title: "Upper Body Strength",
  week: 7,
  session: 3,
  durationMin: 58,
  coachNote:
    "Focus on controlled repetitions today. Stop each set with approximately two good repetitions still available.",
  exercises: seedExercises,
  completed: false,
};

export const seedHabits: Habit[] = [
  {
    id: "h-steps",
    label: "8,000 daily steps",
    targetLabel: "Steps",
    unit: "steps",
    today: 6240,
    target: 8000,
    weeklyCompleted: 5,
    weeklyTotal: 7,
  },
  {
    id: "h-water",
    label: "2.5 litres of water",
    targetLabel: "Water",
    unit: "L",
    today: 1.8,
    target: 2.5,
    weeklyCompleted: 6,
    weeklyTotal: 7,
  },
  {
    id: "h-protein",
    label: "Protein target",
    targetLabel: "Protein",
    unit: "g",
    today: 170,
    target: 170,
    weeklyCompleted: 5,
    weeklyTotal: 7,
  },
  {
    id: "h-sleep",
    label: "7.5 hours of sleep",
    targetLabel: "Sleep",
    unit: "h",
    today: 6.8,
    target: 7.5,
    weeklyCompleted: 3,
    weeklyTotal: 7,
  },
  {
    id: "h-mobility",
    label: "10 minutes of mobility",
    targetLabel: "Mobility",
    unit: "min",
    today: 0,
    target: 10,
    weeklyCompleted: 4,
    weeklyTotal: 7,
  },
];

export const seedNutrition: NutritionTargets = {
  calories: 2150,
  protein: 170,
  carbs: 215,
  fat: 65,
  fibre: "28–35 g",
  water: 2.5,
  coachNote:
    "Your calorie target remains unchanged this week. Focus on reaching your protein target and planning your evening meal before the day becomes busy.",
};

export const seedMessages: Message[] = [
  {
    id: "m-1",
    from: "coach",
    text: "Welcome to week seven. Your consistency has been excellent so far.",
    time: "Mon 09:12",
  },
  {
    id: "m-2",
    from: "client",
    text: "Thank you. The only exercise that still feels uncertain is the Romanian deadlift.",
    time: "Mon 09:40",
  },
  {
    id: "m-3",
    from: "coach",
    text: "Send me a short video from the side during your next lower-body session. I will review your setup and range of motion.",
    time: "Mon 10:05",
  },
  {
    id: "m-4",
    from: "client",
    text: "Perfect. I will send it tomorrow.",
    time: "Mon 10:07",
  },
  {
    id: "m-5",
    from: "coach",
    text: "Your lower-body numbers improved again this week. Keep the same weight for the final set and focus on control.",
    time: "Wed 18:22",
  },
];

// Body weight trend: 96.4 → 89.8 kg over the programme (−6.6 kg). Waist −8 cm.
export const seedProgress: ProgressEntry[] = [
  { id: "p-8", date: "10 Jul", weight: 89.8, waist: 84, chest: 104, hips: 98, notes: "Felt strong on upper body." },
  { id: "p-7", date: "03 Jul", weight: 90.5, waist: 85, chest: 104, hips: 98 },
  { id: "p-6", date: "26 Jun", weight: 91.3, waist: 86, chest: 105, hips: 99 },
  { id: "p-5", date: "19 Jun", weight: 92.4, waist: 87, chest: 105, hips: 99 },
  { id: "p-4", date: "12 Jun", weight: 93.1, waist: 88, chest: 106, hips: 100 },
  { id: "p-3", date: "05 Jun", weight: 94.3, waist: 89, chest: 106, hips: 100 },
  { id: "p-2", date: "29 May", weight: 95.2, waist: 91, chest: 107, hips: 101 },
  { id: "p-1", date: "22 May", weight: 96.4, waist: 92, chest: 108, hips: 102, notes: "Programme start." },
];

export const seedClients: Client[] = [
  {
    id: "alex",
    name: "Alex Popescu",
    programme: "12-Week Fat Loss Foundation",
    currentWeek: 7,
    totalWeeks: 12,
    lastWorkout: "Today",
    checkIn: "Due Sunday",
    completion: 91,
    status: "Active",
    service: "Online Coaching",
    goal: "Reach 86 kg while maintaining strength",
    startWeight: 96.4,
    currentWeight: 89.8,
    privateNote:
      "Alex responds well to clear weekly priorities. Avoid adding unnecessary volume during high-stress work periods. Review calorie target after the next two weigh-ins.",
  },
  {
    id: "maria",
    name: "Maria Stan",
    programme: "Strength and Recomposition",
    currentWeek: 11,
    totalWeeks: 16,
    lastWorkout: "Yesterday",
    checkIn: "Submitted",
    completion: 94,
    status: "Active",
    service: "Online Coaching",
    goal: "Improve strength while maintaining a flexible social life",
  },
  {
    id: "vlad",
    name: "Vlad Munteanu",
    programme: "Lean Muscle Build",
    currentWeek: 14,
    totalWeeks: 20,
    lastWorkout: "Two days ago",
    checkIn: "Reviewed",
    completion: 88,
    status: "Active",
    service: "Hybrid Coaching",
    goal: "Add structure and progression to years of inconsistent training",
  },
  {
    id: "ioana",
    name: "Ioana Radu",
    programme: "Beginner Gym Confidence",
    currentWeek: 3,
    totalWeeks: 12,
    lastWorkout: "Yesterday",
    checkIn: "Due tomorrow",
    completion: 83,
    status: "Active",
    service: "Personal Training",
    goal: "Learn foundational movements and build a sustainable gym routine",
  },
  {
    id: "andrei",
    name: "Andrei Pavel",
    programme: "Return to Training",
    currentWeek: 5,
    totalWeeks: 12,
    lastWorkout: "Eight days ago",
    checkIn: "Overdue",
    completion: 61,
    status: "Needs Attention",
    service: "Online Coaching",
    goal: "Rebuild a consistent training routine after a long break",
  },
];

export const seedLeads: Lead[] = [
  {
    id: "l-ioana-m",
    name: "Ioana Marinescu",
    goal: "Build consistency",
    source: "Calorie calculator",
    interest: "Online Coaching",
    applied: "Today",
    appliedOrder: 0,
    consultation: "Today, 18:00",
    status: "Booked",
  },
  {
    id: "l-george",
    name: "George Ene",
    goal: "Build muscle",
    source: "Homepage application",
    interest: "Hybrid Coaching",
    applied: "Yesterday",
    appliedOrder: 1,
    consultation: "Not booked",
    status: "New",
  },
  {
    id: "l-diana",
    name: "Diana Pop",
    goal: "Fat loss",
    source: "Instagram",
    interest: "Online Coaching",
    applied: "Two days ago",
    appliedOrder: 2,
    consultation: "Tomorrow, 11:00",
    status: "Qualified",
  },
  {
    id: "l-sorin",
    name: "Sorin Luca",
    goal: "Improve strength",
    source: "Referral",
    interest: "Personal Training",
    applied: "Four days ago",
    appliedOrder: 3,
    consultation: "Completed",
    status: "Won",
  },
  {
    id: "l-cristina",
    name: "Cristina Matei",
    goal: "Return to training",
    source: "Calorie calculator",
    interest: "Unsure",
    applied: "Six days ago",
    appliedOrder: 4,
    consultation: "Cancelled",
    status: "Contacted",
  },
];

export const seedBookings: Booking[] = [
  {
    id: "b-ioana-m",
    name: "Ioana Marinescu",
    when: "Today, 18:00",
    order: 0,
    type: "Online Coaching Consultation",
    method: "Google Meet",
    status: "Scheduled",
  },
  {
    id: "b-robert",
    name: "Robert Anghel",
    when: "Tomorrow, 11:30",
    order: 1,
    type: "Personal Training Consultation",
    method: "Phone call",
    status: "Scheduled",
  },
  {
    id: "b-diana",
    name: "Diana Pop",
    when: "Tomorrow, 16:00",
    order: 2,
    type: "Online Coaching Consultation",
    method: "WhatsApp",
    status: "Scheduled",
  },
  {
    id: "b-sorin",
    name: "Sorin Luca",
    when: "Yesterday, 17:30",
    order: 3,
    type: "Personal Training Consultation",
    method: "Google Meet",
    status: "Completed",
  },
];

export const seedCheckIns: CheckIn[] = [
  {
    id: "ci-maria",
    clientId: "maria",
    clientName: "Maria Stan",
    weekLabel: "Submitted today",
    status: "Needs Review",
    overall: 9,
    nutrition: 8,
    energy: 8,
    sleep: 7,
    stress: 4,
    workoutsCompleted: "4+",
    wentWell:
      "I kept every session even during a busy work week and hit new numbers on my presses.",
    challenge: "Evening meals were rushed on the two days I worked late.",
    changes: "Happy to keep the current structure.",
    discomfort: "No",
    submittedLabel: "Submitted today",
  },
  {
    id: "ci-alex",
    clientId: "alex",
    clientName: "Alex Popescu",
    weekLabel: "Due Sunday",
    status: "Upcoming",
  },
  {
    id: "ci-ioana",
    clientId: "ioana",
    clientName: "Ioana Radu",
    weekLabel: "Due tomorrow",
    status: "Upcoming",
  },
  {
    id: "ci-andrei",
    clientId: "andrei",
    clientName: "Andrei Pavel",
    weekLabel: "Overdue by four days",
    status: "Overdue",
  },
];

export const seedPrograms: ProgramTemplate[] = [
  {
    id: "pg-1",
    name: "12-Week Fat Loss Foundation",
    sessionsPerWeek: 4,
    goal: "Fat loss, strength maintenance and consistency.",
    difficulty: "Intermediate",
    duration: "12 weeks",
  },
  {
    id: "pg-2",
    name: "Strength and Recomposition",
    sessionsPerWeek: 4,
    goal: "Improve strength and body composition.",
    difficulty: "Intermediate",
    duration: "16 weeks",
  },
  {
    id: "pg-3",
    name: "Beginner Gym Confidence",
    sessionsPerWeek: 3,
    goal: "Learn foundational movements and build a sustainable gym routine.",
    difficulty: "Beginner",
    duration: "12 weeks",
  },
  {
    id: "pg-4",
    name: "Lean Muscle Build",
    sessionsPerWeek: 5,
    goal: "Increase muscle mass through progressive resistance training.",
    difficulty: "Advanced",
    duration: "20 weeks",
  },
];

export const seedAttention: AttentionItem[] = [
  {
    id: "at-alex",
    name: "Alex Popescu",
    detail: "Weekly check-in due in three days.",
    action: "View Client",
    href: "/coach/clients/alex",
    tone: "accent",
  },
  {
    id: "at-andrei",
    name: "Andrei Pavel",
    detail: "No workout recorded in eight days.",
    action: "Send Message",
    href: "/coach/clients/andrei",
    tone: "clay",
  },
  {
    id: "at-maria",
    name: "Maria Stan",
    detail: "Completed all scheduled workouts this week.",
    action: "Review Progress",
    href: "/coach/clients/maria",
    tone: "olive",
  },
  {
    id: "at-vlad",
    name: "Vlad Munteanu",
    detail: "Body weight has remained unchanged for 14 days.",
    action: "Review Nutrition",
    href: "/coach/clients/vlad",
    tone: "clay",
  },
  {
    id: "at-ana",
    name: "Ana Dobre",
    detail: "Subscription renewal due in three days.",
    action: "View Subscription",
    href: "/coach/clients",
    tone: "gold",
  },
  {
    id: "at-consult",
    name: "Coaching Consultation",
    detail: "Today at 18:00 with Ioana Marinescu.",
    action: "Open Booking",
    href: "/coach/bookings",
    tone: "accent",
  },
];

export const seedNotifications: Notification[] = [
  { id: "n-c1", audience: "client", text: "Your next workout is ready.", read: false, order: 0 },
  { id: "n-c2", audience: "client", text: "Your weekly check-in is due in three days.", read: false, order: 1 },
  { id: "n-c3", audience: "client", text: "Your coach has replied to your message.", read: true, order: 2 },
  { id: "n-k1", audience: "coach", text: "A new consultation was booked.", read: false, order: 0 },
  { id: "n-k2", audience: "coach", text: "Maria submitted her weekly check-in.", read: false, order: 1 },
  { id: "n-k3", audience: "coach", text: "Andrei has not trained in eight days.", read: true, order: 2 },
];

// Coach headline KPIs (Content Brief §14)
export const coachKpis = {
  activeClients: 18,
  newLeadsThisMonth: 27,
  newLeadsOverview: 7,
  upcomingConsultations: 6,
  consultationsThisWeek: 6,
  pendingCheckIns: 5,
  workoutCompletion: 87,
  monthlyRevenue: 4860,
};

// Homepage / hero demo statistics (Content Brief §4)
export const heroStats = {
  journeys: "300+",
  completion: "91%",
  rating: "4.9/5",
  programme: "12-week",
};

// Alex weekly consistency dots for the signature stats panel (6 of 7)
export const weekActivity = [true, true, true, true, true, true, false];
