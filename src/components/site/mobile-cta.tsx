"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";

/** Public-site mobile sticky CTA — never shown in the portal or coach dashboard. */
export function MobileCta() {
  const pathname = usePathname();
  // Hide on the application flow itself.
  if (pathname.startsWith("/apply")) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 p-3 sm:hidden">
      <Link
        href="/apply"
        className="btn btn-primary pointer-events-auto flex w-full shadow-xl"
      >
        Start Your Application
        <ArrowRight className="size-4" strokeWidth={2} />
      </Link>
    </div>
  );
}
