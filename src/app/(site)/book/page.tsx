import type { Metadata } from "next";
import { BookingForm } from "@/components/book/booking-form";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description:
    "Choose a time for a short consultation about your goal, current routine and the coaching option that may fit you best.",
};

export default function BookPage() {
  return (
    <section className="container-p section">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <p className="eyebrow">Booking</p>
        <h1 className="mt-3 text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.05]">
          Choose a time for your consultation.
        </h1>
        <p className="mt-5 text-muted">
          Select a suitable date and time for a short conversation about your goal,
          current routine and the coaching option that may fit you best.
        </p>
      </div>
      <BookingForm />
    </section>
  );
}
