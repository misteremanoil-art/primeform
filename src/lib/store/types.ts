/* =========================================================================
   PRIMEFORM domain model — the entire "backend" is these types + the store.
   Status unions are taken verbatim from the Content Brief.
   ========================================================================= */

export type Role = "visitor" | "client" | "coach";

export type LeadStatus =
  | "New"
  | "Contacted"
  | "Qualified"
  | "Booked"
  | "Won"
  | "Lost";

export type ClientStatus = "Active" | "Needs Attention" | "Paused" | "Archived";

export type BookingStatus =
  | "Scheduled"
  | "Completed"
  | "Cancelled"
  | "Rescheduled"
  | "No Show";

export type CheckInStatus =
  | "Upcoming"
  | "Needs Review"
  | "Reviewed"
  | "Overdue"
  | "Submitted"
  | "Pending";

export type CoachingInterest =
  | "Online Coaching"
  | "Personal Training"
  | "Hybrid Coaching"
  | "Unsure";

export interface Lead {
  id: string;
  name: string;
  goal: string;
  source: string;
  interest: CoachingInterest;
  applied: string; // human label e.g. "Today"
  appliedOrder: number; // for stable sorting (0 = newest)
  consultation: string; // label e.g. "Today, 18:00" | "Not booked"
  status: LeadStatus;
  note?: string;
  email?: string;
  phone?: string;
  startTimeframe?: string;
  budget?: string;
}

export interface Client {
  id: string;
  name: string;
  programme: string;
  currentWeek: number;
  totalWeeks: number;
  lastWorkout: string; // label
  checkIn: string; // label
  completion: number; // %
  status: ClientStatus;
  service: string;
  goal: string;
  startWeight?: number;
  currentWeight?: number;
  privateNote?: string;
}

export interface ProgramTemplate {
  id: string;
  name: string;
  sessionsPerWeek: number;
  goal: string;
  description?: string;
  duration?: string;
  difficulty?: string;
  equipment?: string;
  notes?: string;
  custom?: boolean;
}

export interface SetLog {
  weight: string;
  reps: string;
  difficulty: string;
  notes: string;
  done: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: string;
  tempo?: string;
  previousWeight?: string;
  cue?: string;
  logs: SetLog[];
}

export interface Workout {
  id: string;
  title: string;
  week: number;
  session: number;
  durationMin: number;
  coachNote: string;
  exercises: Exercise[];
  completed: boolean;
  completedAt?: string;
}

export interface ProgressEntry {
  id: string;
  date: string; // ISO-ish display date
  weight: number;
  waist?: number;
  chest?: number;
  hips?: number;
  notes?: string;
}

export interface Habit {
  id: string;
  label: string;
  targetLabel: string;
  unit: string;
  today: number;
  target: number;
  weeklyCompleted: number;
  weeklyTotal: number;
}

export interface CheckIn {
  id: string;
  clientId: string;
  clientName: string;
  weekLabel: string; // e.g. "Submitted today" | "Due Sunday"
  status: CheckInStatus;
  overall?: number;
  nutrition?: number;
  energy?: number;
  sleep?: number;
  stress?: number;
  workoutsCompleted?: string;
  wentWell?: string;
  challenge?: string;
  changes?: string;
  discomfort?: "No" | "Yes";
  discomfortDetail?: string;
  submittedLabel?: string;
  coachResponse?: string;
  programmeAdjustment?: boolean;
  nutritionAdjustment?: boolean;
  followUp?: boolean;
  nextPriority?: string;
}

export interface Message {
  id: string;
  from: "coach" | "client";
  text: string;
  time: string;
}

export interface Booking {
  id: string;
  name: string;
  when: string; // label e.g. "Today, 18:00"
  order: number; // sort key, lower = sooner/newer
  type: string;
  method: string;
  status: BookingStatus;
  email?: string;
  phone?: string;
  notes?: string;
}

export interface AttentionItem {
  id: string;
  name: string;
  detail: string;
  action: string;
  href: string;
  tone: "accent" | "olive" | "clay" | "gold";
}

export interface Notification {
  id: string;
  audience: "client" | "coach";
  text: string;
  read: boolean;
  order: number;
}

export interface NutritionTargets {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fibre: string;
  water: number;
  coachNote: string;
}

export type CookieConsent = null | "accepted" | "rejected" | "custom";
