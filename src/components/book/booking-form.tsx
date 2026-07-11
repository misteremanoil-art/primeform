"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CalendarCheck, Clock, Globe, Phone, Video, MessageCircle, CalendarPlus, ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Field, TextInput, TextArea } from "@/components/ui/form";
import { usePrimeStore } from "@/lib/store/store";
import { toast } from "@/lib/store/hooks";
import { useMounted } from "@/lib/use-mounted";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const methods = [
  { value: "google-meet", label: { en: "Google Meet", ro: "Google Meet" }, icon: Video },
  { value: "phone", label: { en: "Phone call", ro: "Apel telefonic" }, icon: Phone },
  { value: "whatsapp", label: { en: "WhatsApp call", ro: "Apel WhatsApp" }, icon: MessageCircle },
] as const;
const times = ["09:00", "10:30", "12:00", "14:00", "16:30", "18:00"];
const TIMEZONE = "Europe/Bucharest (EET)";

const copy = {
  en: {
    consultationTitle: "Coaching Consultation",
    duration: "Duration: 30 minutes",
    callMethod: "Call method",
    selectDate: "Select a date",
    selectTime: "Select a time",
    yourDetails: "Your details",
    fullName: "Full name",
    yourName: "Your name",
    emailLabel: "Email address",
    phoneLabel: "Phone number",
    notesLabel: "Additional notes",
    notesPlaceholder: "Anything you'd like your coach to know",
    confirm: "Confirm Booking",
    requiredError: "This field is required.",
    timeError: "This time is no longer available.",
    emailError: "Enter a valid email address.",
    phoneError: "Enter a valid phone number.",
    bookedTitle: "Your consultation is booked.",
    bookedBody:
      "A confirmation has been sent to your email address. You can use the link inside the email to reschedule or cancel.",
    dateRow: "Date",
    timeRow: "Time",
    timezoneRow: "Time zone",
    methodRow: "Call method",
    addToCalendar: "Add to Calendar",
    enterDemo: "Enter the Demo",
    icsSummary: "PRIMEFORM Coaching Consultation",
    icsDescription: (method: string) => `30-minute consultation via ${method}. Demo booking.`,
    toastTitle: "Confirmation email sent — demo only",
    toastBody: "The booking now appears in the coach dashboard.",
  },
  ro: {
    consultationTitle: "Consultație de coaching",
    duration: "Durată: 30 de minute",
    callMethod: "Metodă de apel",
    selectDate: "Alege o dată",
    selectTime: "Alege o oră",
    yourDetails: "Datele tale",
    fullName: "Nume complet",
    yourName: "Numele tău",
    emailLabel: "Adresă de e-mail",
    phoneLabel: "Număr de telefon",
    notesLabel: "Note suplimentare",
    notesPlaceholder: "Orice ai vrea să știe antrenorul tău",
    confirm: "Confirmă programarea",
    requiredError: "Acest câmp este obligatoriu.",
    timeError: "Această oră nu mai este disponibilă.",
    emailError: "Introdu o adresă de e-mail validă.",
    phoneError: "Introdu un număr de telefon valid.",
    bookedTitle: "Consultația ta este programată.",
    bookedBody:
      "O confirmare a fost trimisă pe adresa ta de e-mail. Poți folosi linkul din e-mail pentru a reprograma sau anula.",
    dateRow: "Data",
    timeRow: "Ora",
    timezoneRow: "Fus orar",
    methodRow: "Metodă de apel",
    addToCalendar: "Adaugă în calendar",
    enterDemo: "Intră în demo",
    icsSummary: "Consultație de coaching PRIMEFORM",
    icsDescription: (method: string) => `Consultație de 30 de minute prin ${method}. Programare demo.`,
    toastTitle: "E-mail de confirmare trimis — doar demo",
    toastBody: "Programarea apare acum în panoul antrenorului.",
  },
} as const;

interface Day {
  key: string;
  label: string;
  weekday: string;
  dayNum: string;
  month: string;
  iso: string; // YYYYMMDD
}

export function BookingForm() {
  const { lang } = useI18n();
  const t = copy[lang];
  const createBooking = usePrimeStore((s) => s.createBooking);

  const mounted = useMounted();
  const [method, setMethod] = useState<string>("google-meet");
  const [dayKey, setDayKey] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [booked, setBooked] = useState<null | {
    dateLabel: string;
    time: string;
    method: string;
    iso: string;
  }>(null);

  // Compute the next 7 days on the client only (avoids SSR/CSR date drift) —
  // done during render via useMemo, never via setState in an effect.
  const days = useMemo<Day[]>(() => {
    if (!mounted) return [];
    const locale = lang === "ro" ? "ro-RO" : "en-GB";
    const out: Day[] = [];
    const base = new Date();
    for (let i = 1; i <= 7; i++) {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      out.push({
        key: `${yyyy}-${mm}-${dd}`,
        label: d.toLocaleDateString(locale, { weekday: "short", day: "numeric", month: "short" }),
        weekday: d.toLocaleDateString(locale, { weekday: "short" }),
        dayNum: String(d.getDate()),
        month: d.toLocaleDateString(locale, { month: "short" }),
        iso: `${yyyy}${mm}${dd}`,
      });
    }
    return out;
  }, [mounted, lang]);

  // Selected day defaults to the first available day until the user picks one.
  const activeKey = dayKey || days[0]?.key || "";
  const selectedDay = days.find((d) => d.key === activeKey);
  const methodLabel = methods.find((m) => m.value === method)?.label[lang] ?? method;

  const confirm = () => {
    const e: Record<string, string> = {};
    if (!method) e.method = t.requiredError;
    if (!dayKey) e.day = t.requiredError;
    if (!time) e.time = t.timeError;
    if (!name.trim()) e.name = t.requiredError;
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) e.email = t.emailError;
    if (!/^[+()\-\d\s]{7,}$/.test(phone)) e.phone = t.phoneError;
    setErrors(e);
    if (Object.keys(e).length > 0 || !selectedDay) return;

    const when = `${selectedDay.label}, ${time}`;
    createBooking({ name, email, phone, method: methodLabel, when, notes });
    toast(t.toastTitle, t.toastBody, "success");
    setBooked({ dateLabel: selectedDay.label, time, method: methodLabel, iso: selectedDay.iso });
  };

  const downloadIcs = () => {
    if (!booked) return;
    const [h, m] = booked.time.split(":");
    const start = `${booked.iso}T${h}${m}00`;
    const endMin = (parseInt(m) + 30) % 60;
    const endHour = parseInt(h) + (parseInt(m) + 30 >= 60 ? 1 : 0);
    const end = `${booked.iso}T${String(endHour).padStart(2, "0")}${String(endMin).padStart(2, "0")}00`;
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//PRIMEFORM//Demo//EN",
      "BEGIN:VEVENT",
      `UID:${booked.iso}-${h}${m}@primeform.demo`,
      `DTSTART:${start}`,
      `DTEND:${end}`,
      `SUMMARY:${t.icsSummary}`,
      `DESCRIPTION:${t.icsDescription(booked.method)}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "primeform-consultation.ics";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (booked) {
    return (
      <GlassCard variant="standard" className="mx-auto max-w-lg rounded-hero p-8 text-center sm:p-10">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-olive/15 text-olive">
          <CalendarCheck className="size-7" strokeWidth={1.7} />
        </span>
        <h2 className="mt-6 text-3xl">{t.bookedTitle}</h2>
        <p className="mt-3 text-muted">{t.bookedBody}</p>
        <div className="surface-card mt-7 space-y-3 p-5 text-left text-sm">
          <Row label={t.dateRow} value={booked.dateLabel} />
          <Row label={t.timeRow} value={booked.time} />
          <Row label={t.timezoneRow} value={TIMEZONE} />
          <Row label={t.methodRow} value={booked.method} />
        </div>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <button onClick={downloadIcs} className="btn btn-primary">
            <CalendarPlus className="size-4" strokeWidth={1.9} />
            {t.addToCalendar}
          </button>
          <Link href="/login" className="btn btn-secondary">
            {t.enterDemo}
            <ArrowRight className="size-4" strokeWidth={2} />
          </Link>
        </div>
      </GlassCard>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <GlassCard variant="solid" className="p-6 sm:p-8">
        {/* Booking type */}
        <div className="flex items-center gap-4 rounded-md border border-line bg-bg/40 p-4">
          <span className="grid size-11 place-items-center rounded-full bg-accent/12 text-accent">
            <CalendarCheck className="size-5" strokeWidth={1.7} />
          </span>
          <div>
            <p className="font-semibold">{t.consultationTitle}</p>
            <p className="flex items-center gap-1.5 text-sm text-muted">
              <Clock className="size-3.5" strokeWidth={1.8} /> {t.duration}
            </p>
          </div>
        </div>

        {/* Method */}
        <p className="mt-6 text-[0.72rem] font-semibold uppercase tracking-wide text-muted">{t.callMethod}</p>
        <div className="mt-2 grid grid-cols-3 gap-2.5">
          {methods.map((m) => (
            <button
              key={m.value}
              type="button"
              onClick={() => setMethod(m.value)}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-md border px-2 py-3 text-xs font-medium transition-colors",
                method === m.value ? "border-accent bg-accent/8 text-ink" : "border-line text-muted hover:text-ink",
              )}
            >
              <m.icon className="size-4.5" strokeWidth={1.7} />
              {m.label[lang]}
            </button>
          ))}
        </div>

        {/* Date */}
        <p className="mt-6 text-[0.72rem] font-semibold uppercase tracking-wide text-muted">{t.selectDate}</p>
        <div className="no-scrollbar mt-2 flex gap-2 overflow-x-auto pb-1">
          {days.length === 0 ? (
            <div className="h-16 w-full animate-pulse rounded-md bg-ink/5" />
          ) : (
            days.map((d) => (
              <button
                key={d.key}
                type="button"
                onClick={() => setDayKey(d.key)}
                className={cn(
                  "flex shrink-0 flex-col items-center rounded-md border px-3.5 py-2.5 transition-colors",
                  activeKey === d.key ? "border-accent bg-accent text-accent-ink" : "border-line text-muted hover:text-ink",
                )}
              >
                <span className="text-[0.62rem] font-semibold uppercase">{d.weekday}</span>
                <span className="tnum text-lg font-bold">{d.dayNum}</span>
                <span className="text-[0.62rem]">{d.month}</span>
              </button>
            ))
          )}
        </div>

        {/* Time */}
        <p className="mt-6 text-[0.72rem] font-semibold uppercase tracking-wide text-muted">{t.selectTime}</p>
        <div className="mt-2 grid grid-cols-3 gap-2.5 sm:grid-cols-6">
          {times.map((tm) => (
            <button
              key={tm}
              type="button"
              onClick={() => setTime(tm)}
              className={cn(
                "tnum rounded-md border py-2 text-sm font-medium transition-colors",
                time === tm ? "border-accent bg-accent/8 text-ink" : "border-line text-muted hover:text-ink",
              )}
            >
              {tm}
            </button>
          ))}
        </div>
        {errors.time && <p className="mt-2 text-xs font-medium text-danger">{errors.time}</p>}
      </GlassCard>

      {/* Contact */}
      <GlassCard variant="solid" className="h-fit p-6 sm:p-8">
        <p className="text-lg font-bold">{t.yourDetails}</p>
        <div className="mt-4 space-y-4">
          <Field label={t.fullName} error={errors.name}>
            <TextInput value={name} onChange={(e) => setName(e.target.value)} placeholder={t.yourName} />
          </Field>
          <Field label={t.emailLabel} error={errors.email}>
            <TextInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
          </Field>
          <Field label={t.phoneLabel} error={errors.phone}>
            <TextInput value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+40 …" />
          </Field>
          <Field label={t.notesLabel} optional>
            <TextArea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={t.notesPlaceholder} />
          </Field>
          <div className="flex items-center gap-2 text-xs text-muted">
            <Globe className="size-3.5" strokeWidth={1.8} />
            {TIMEZONE}
          </div>
          <button onClick={confirm} className="btn btn-primary w-full">
            {t.confirm}
          </button>
        </div>
      </GlassCard>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
