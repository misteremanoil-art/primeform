# PRIMEFORM — Fitness Coaching Platform Demo

A complete, deployable **fictional** fitness-coaching demo built for the Emanoil
Studio portfolio. It shows how a personal trainer can run marketing, lead
generation, onboarding and coaching delivery from **one connected platform** —
a public marketing website, a client portal and a coach dashboard, all in a
single Next.js app.

> All names, images, statistics, qualifications, testimonials, prices and
> results are fictional and used for demonstration purposes only.

Design direction: **Warm Glass Performance** — a warm, cinematic premium look
with integrated product UI (progress rings, workout logging, set trackers,
weekly habits, coach messaging). Light and dark modes are designed separately.

## Stack

- **Next.js 16** (App Router) + **TypeScript** (strict)
- **Tailwind CSS v4** (CSS-first tokens) + custom design system
- **Framer Motion** for motion (respects `prefers-reduced-motion`)
- **next-themes** for light/dark (class strategy)
- **Zustand** + `persist` (localStorage) as the entire mock "backend"
- **lucide-react** icons, **Recharts** for the weight-trend chart
- No database, auth provider, email service or payments — everything is mocked
  in the store; emails/payments surface as demo toasts and previews.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # eslint (zero errors)
```

## Two demo entries

Open **/login** and choose one of the pre-filled demo accounts:

- **Enter as Alex** → the **client portal** (`/portal`): today's workout, set
  logging, progress, weekly check-in, nutrition, habits, coach messages.
- **Enter as Coach** → the **coach dashboard** (`/coach`): overview + attention
  feed, leads, clients, client profiles, check-in review, bookings, programmes.

> Changes made inside the public demo are stored in your browser (localStorage)
> and can be reset at any time.

## The connected demo moment

The one thing this demo proves: **an action completed in the client portal
appears immediately in the coach dashboard.** Five flows are wired end-to-end
through the shared store:

1. **Complete a workout** (client) → coach *attention feed* + client row update.
2. **Submit a weekly check-in** (client) → appears in the coach *check-in review
   queue*; the coach *sends feedback* → it appears in the client's *messages*.
3. **Submit the coaching application** (public) → new *lead* in the coach leads
   table.
4. **Book a consultation** (public) → appears in the coach *bookings* list.
5. **Log a progress entry** (client) → the coach sees it on the *client profile*.

### Walkthrough

**Public visitor** → open the homepage → explore coaching options → use the
calorie calculator → complete the application → book a consultation → enter the
client demo.

**Client (Alex)** → view the week → open today's workout → record performance →
complete the workout → update a habit → add a progress entry → submit a
check-in → send a coach message.

**Coach (Daniel)** → open the dashboard → see the new lead and booking → open
Alex's profile → review the completed workout → read the submitted check-in →
send feedback → change a lead status → assign a programme.

## Reset demo data

Use **Reset demo data** in the client portal or coach dashboard sidebar (or the
reset icon in the top bar). It clears your local changes back to the seed state.

## Deploy to Vercel

```bash
npm i -g vercel
vercel          # first run: link/create the project
vercel --prod   # production deploy
```

Suggested project name: **`primeform-demo`**. No environment variables are
required — the app is fully client-side with a mocked store.

---

**Designed and developed by [Emanoil Studio](https://emanoil.studio).**
