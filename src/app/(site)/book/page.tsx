import type { Metadata } from "next";
import { BookContent } from "./book-content";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description:
    "Choose a time for a short consultation about your goal, current routine and the coaching option that may fit you best.",
};

export default function BookPage() {
  return <BookContent />;
}
