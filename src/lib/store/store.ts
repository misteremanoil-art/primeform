import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  AttentionItem,
  Booking,
  BookingStatus,
  CheckIn,
  Client,
  CookieConsent,
  Habit,
  Lead,
  LeadStatus,
  Message,
  Notification,
  NutritionTargets,
  ProgramTemplate,
  ProgressEntry,
  Role,
  SetLog,
  Workout,
} from "./types";
import {
  seedAttention,
  seedBookings,
  seedCheckIns,
  seedClients,
  seedHabits,
  seedLeads,
  seedMessages,
  seedNotifications,
  seedNutrition,
  seedProgress,
  seedPrograms,
  seedWorkout,
} from "./seed";

let counter = 0;
const uid = (prefix: string) => {
  counter += 1;
  return `${prefix}-${Date.now().toString(36)}-${counter}`;
};

const clone = <T>(value: T): T =>
  typeof structuredClone === "function"
    ? structuredClone(value)
    : JSON.parse(JSON.stringify(value));

export interface ApplicationInput {
  fullName: string;
  email: string;
  phone?: string;
  goal: string;
  service: string;
  startTimeframe: string;
  budget: string;
}

export interface BookingInput {
  name: string;
  email: string;
  phone?: string;
  method: string;
  when: string;
  notes?: string;
}

export interface CheckInInput {
  overall: number;
  workoutsCompleted: string;
  nutrition: number;
  energy: number;
  sleep: number;
  stress: number;
  wentWell: string;
  challenge: string;
  changes: string;
  discomfort: "No" | "Yes";
  discomfortDetail: string;
}

export interface ReviewInput {
  coachResponse: string;
  programmeAdjustment: boolean;
  nutritionAdjustment: boolean;
  followUp: boolean;
  nextPriority: string;
}

interface PrimeState {
  role: Role;

  workout: Workout;
  habits: Habit[];
  nutrition: NutritionTargets;
  messages: Message[];
  progress: ProgressEntry[];

  clients: Client[];
  leads: Lead[];
  bookings: Booking[];
  checkIns: CheckIn[];
  programs: ProgramTemplate[];
  attention: AttentionItem[];
  notifications: Notification[];

  cookieConsent: CookieConsent;

  // actions
  setRole: (role: Role) => void;

  logSet: (exerciseId: string, index: number, patch: Partial<SetLog>) => void;
  completeWorkout: () => void;

  updateHabit: (id: string, today: number) => void;
  saveHabits: () => void;

  addProgressEntry: (entry: Omit<ProgressEntry, "id">) => void;

  submitCheckIn: (input: CheckInInput) => void;
  reviewCheckIn: (id: string, input: ReviewInput) => void;

  sendMessage: (text: string) => void;

  submitApplication: (input: ApplicationInput) => string;
  captureLead: (input: {
    name: string;
    email: string;
    goal: string;
    source: string;
    interest?: Lead["interest"];
  }) => string;
  createBooking: (input: BookingInput) => string;

  updateLeadStatus: (id: string, status: LeadStatus) => void;
  addLeadNote: (id: string, note: string) => void;
  convertLeadToClient: (id: string) => void;

  updateBookingStatus: (id: string, status: BookingStatus) => void;

  updateClientNote: (id: string, note: string) => void;
  updateClientStatus: (id: string, status: Client["status"]) => void;

  saveProgram: (program: ProgramTemplate) => void;

  markNotificationsRead: (audience: "client" | "coach") => void;
  setCookieConsent: (consent: CookieConsent) => void;

  resetDemo: () => void;
}

const buildSeed = () => ({
  workout: clone(seedWorkout),
  habits: clone(seedHabits),
  nutrition: clone(seedNutrition),
  messages: clone(seedMessages),
  progress: clone(seedProgress),
  clients: clone(seedClients),
  leads: clone(seedLeads),
  bookings: clone(seedBookings),
  checkIns: clone(seedCheckIns),
  programs: clone(seedPrograms),
  attention: clone(seedAttention),
  notifications: clone(seedNotifications),
});

const notify = (
  list: Notification[],
  audience: "client" | "coach",
  text: string,
): Notification[] => [
  { id: uid("n"), audience, text, read: false, order: -Date.now() },
  ...list,
];

export const usePrimeStore = create<PrimeState>()(
  persist(
    (set, get) => ({
      role: "visitor",
      ...buildSeed(),
      cookieConsent: null,

      setRole: (role) => set({ role }),

      logSet: (exerciseId, index, patch) =>
        set((state) => ({
          workout: {
            ...state.workout,
            exercises: state.workout.exercises.map((ex) =>
              ex.id === exerciseId
                ? {
                    ...ex,
                    logs: ex.logs.map((log, i) =>
                      i === index ? { ...log, ...patch } : log,
                    ),
                  }
                : ex,
            ),
          },
        })),

      completeWorkout: () =>
        set((state) => {
          const alexAttention: AttentionItem = {
            id: uid("at"),
            name: "Alex Popescu",
            detail: "Completed today's workout — Upper Body Strength.",
            action: "Review Workout",
            href: "/coach/clients/alex",
            tone: "olive",
          };
          return {
            workout: { ...state.workout, completed: true, completedAt: "Today" },
            clients: state.clients.map((c) =>
              c.id === "alex" ? { ...c, lastWorkout: "Today" } : c,
            ),
            attention: [alexAttention, ...state.attention],
            notifications: notify(
              state.notifications,
              "coach",
              "Alex completed today's workout.",
            ),
          };
        }),

      updateHabit: (id, today) =>
        set((state) => ({
          habits: state.habits.map((h) => (h.id === id ? { ...h, today } : h)),
        })),

      saveHabits: () =>
        set((state) => ({
          notifications: notify(
            state.notifications,
            "coach",
            "Alex updated today's habits.",
          ),
        })),

      addProgressEntry: (entry) =>
        set((state) => {
          const newEntry: ProgressEntry = { ...entry, id: uid("p") };
          return {
            progress: [newEntry, ...state.progress],
            clients: state.clients.map((c) =>
              c.id === "alex" ? { ...c, currentWeight: entry.weight } : c,
            ),
            attention: [
              {
                id: uid("at"),
                name: "Alex Popescu",
                detail: `Logged a new progress entry — ${entry.weight} kg.`,
                action: "Review Progress",
                href: "/coach/clients/alex",
                tone: "accent",
              },
              ...state.attention,
            ],
            notifications: notify(
              state.notifications,
              "coach",
              "Alex logged new progress data.",
            ),
          };
        }),

      submitCheckIn: (input) =>
        set((state) => {
          const exists = state.checkIns.find((c) => c.clientId === "alex");
          const updated: CheckIn = {
            id: exists?.id ?? uid("ci"),
            clientId: "alex",
            clientName: "Alex Popescu",
            weekLabel: "Submitted today",
            status: "Needs Review",
            submittedLabel: "Submitted today",
            overall: input.overall,
            workoutsCompleted: input.workoutsCompleted,
            nutrition: input.nutrition,
            energy: input.energy,
            sleep: input.sleep,
            stress: input.stress,
            wentWell: input.wentWell,
            challenge: input.challenge,
            changes: input.changes,
            discomfort: input.discomfort,
            discomfortDetail: input.discomfortDetail,
          };
          return {
            checkIns: exists
              ? state.checkIns.map((c) => (c.clientId === "alex" ? updated : c))
              : [updated, ...state.checkIns],
            clients: state.clients.map((c) =>
              c.id === "alex" ? { ...c, checkIn: "Submitted" } : c,
            ),
            attention: [
              {
                id: uid("at"),
                name: "Alex Popescu",
                detail: "Submitted the weekly check-in — needs review.",
                action: "Review Check-In",
                href: "/coach/checkins",
                tone: "accent",
              },
              ...state.attention,
            ],
            notifications: notify(
              state.notifications,
              "coach",
              "Alex submitted the weekly check-in.",
            ),
          };
        }),

      reviewCheckIn: (id, input) =>
        set((state) => {
          const target = state.checkIns.find((c) => c.id === id);
          const isAlex = target?.clientId === "alex";
          return {
            checkIns: state.checkIns.map((c) =>
              c.id === id
                ? {
                    ...c,
                    status: "Reviewed",
                    coachResponse: input.coachResponse,
                    programmeAdjustment: input.programmeAdjustment,
                    nutritionAdjustment: input.nutritionAdjustment,
                    followUp: input.followUp,
                    nextPriority: input.nextPriority,
                  }
                : c,
            ),
            clients: state.clients.map((c) =>
              c.id === target?.clientId ? { ...c, checkIn: "Reviewed" } : c,
            ),
            messages: isAlex
              ? [
                  ...state.messages,
                  {
                    id: uid("m"),
                    from: "coach",
                    text: input.coachResponse,
                    time: "Just now",
                  },
                ]
              : state.messages,
            notifications: isAlex
              ? notify(
                  state.notifications,
                  "client",
                  "Your coach has reviewed your check-in.",
                )
              : state.notifications,
          };
        }),

      sendMessage: (text) =>
        set((state) => ({
          messages: [
            ...state.messages,
            { id: uid("m"), from: "client", text, time: "Just now" },
          ],
          notifications: notify(
            state.notifications,
            "coach",
            "Alex sent you a message.",
          ),
        })),

      submitApplication: (input) => {
        const id = uid("l");
        set((state) => ({
          leads: [
            {
              id,
              name: input.fullName,
              goal: input.goal,
              source: "Homepage application",
              interest: (input.service as Lead["interest"]) ?? "Unsure",
              applied: "Just now",
              appliedOrder: -Date.now(),
              consultation: "Not booked",
              status: "New",
              email: input.email,
              phone: input.phone,
              startTimeframe: input.startTimeframe,
              budget: input.budget,
            },
            ...state.leads,
          ],
          notifications: notify(
            state.notifications,
            "coach",
            `New coaching application from ${input.fullName}.`,
          ),
        }));
        return id;
      },

      captureLead: (input) => {
        const id = uid("l");
        set((state) => ({
          leads: [
            {
              id,
              name: input.name,
              goal: input.goal,
              source: input.source,
              interest: input.interest ?? "Unsure",
              applied: "Just now",
              appliedOrder: -Date.now(),
              consultation: "Not booked",
              status: "New",
              email: input.email,
            },
            ...state.leads,
          ],
          notifications: notify(
            state.notifications,
            "coach",
            `New lead from the ${input.source.toLowerCase()}: ${input.name}.`,
          ),
        }));
        return id;
      },

      createBooking: (input) => {
        const id = uid("b");
        set((state) => ({
          bookings: [
            {
              id,
              name: input.name,
              when: input.when,
              order: -Date.now(),
              type: "Coaching Consultation",
              method: input.method,
              status: "Scheduled",
              email: input.email,
              phone: input.phone,
              notes: input.notes,
            },
            ...state.bookings,
          ],
          leads: state.leads.map((l) =>
            l.email && input.email && l.email === input.email
              ? { ...l, consultation: input.when, status: "Booked" }
              : l,
          ),
          notifications: notify(
            state.notifications,
            "coach",
            `New consultation booked with ${input.name}.`,
          ),
        }));
        return id;
      },

      updateLeadStatus: (id, status) =>
        set((state) => ({
          leads: state.leads.map((l) => (l.id === id ? { ...l, status } : l)),
        })),

      addLeadNote: (id, note) =>
        set((state) => ({
          leads: state.leads.map((l) => (l.id === id ? { ...l, note } : l)),
        })),

      convertLeadToClient: (id) =>
        set((state) => {
          const lead = state.leads.find((l) => l.id === id);
          if (!lead) return {};
          const newClient: Client = {
            id: uid("c"),
            name: lead.name,
            programme: "12-Week Fat Loss Foundation",
            currentWeek: 1,
            totalWeeks: 12,
            lastWorkout: "Not started",
            checkIn: "Not due",
            completion: 0,
            status: "Active",
            service:
              lead.interest === "Unsure" ? "Online Coaching" : lead.interest,
            goal: lead.goal,
          };
          return {
            leads: state.leads.map((l) =>
              l.id === id ? { ...l, status: "Won" } : l,
            ),
            clients: [newClient, ...state.clients],
            notifications: notify(
              state.notifications,
              "coach",
              `${lead.name} converted to an active client.`,
            ),
          };
        }),

      updateBookingStatus: (id, status) =>
        set((state) => ({
          bookings: state.bookings.map((b) =>
            b.id === id ? { ...b, status } : b,
          ),
        })),

      updateClientNote: (id, note) =>
        set((state) => ({
          clients: state.clients.map((c) =>
            c.id === id ? { ...c, privateNote: note } : c,
          ),
        })),

      updateClientStatus: (id, status) =>
        set((state) => ({
          clients: state.clients.map((c) =>
            c.id === id ? { ...c, status } : c,
          ),
        })),

      saveProgram: (program) =>
        set((state) => {
          const exists = state.programs.some((p) => p.id === program.id);
          return {
            programs: exists
              ? state.programs.map((p) => (p.id === program.id ? program : p))
              : [{ ...program, custom: true }, ...state.programs],
          };
        }),

      markNotificationsRead: (audience) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.audience === audience ? { ...n, read: true } : n,
          ),
        })),

      setCookieConsent: (consent) => set({ cookieConsent: consent }),

      resetDemo: () =>
        set((state) => ({
          ...buildSeed(),
          // keep role + cookie choice so the demo doesn't bounce the user out
          role: state.role,
          cookieConsent: state.cookieConsent,
        })),
    }),
    {
      name: "primeform-demo-v1",
      version: 1,
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? window.localStorage
          : {
              getItem: () => null,
              setItem: () => undefined,
              removeItem: () => undefined,
            },
      ),
      partialize: (state) => {
        // Persist everything except transient/derived; functions are dropped by JSON anyway.
        const { ...rest } = state;
        return rest;
      },
    },
  ),
);
