import Link from "next/link";
import { Camera, MessageCircle } from "lucide-react";
import { Logo } from "@/components/site/logo";

const columns = [
  {
    title: "Coaching",
    links: [
      { label: "Online Coaching", href: "/coaching" },
      { label: "Personal Training", href: "/personal-training" },
      { label: "Hybrid Coaching", href: "/coaching#hybrid" },
      { label: "Apply", href: "/apply" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Results", href: "/results" },
      { label: "Calorie Calculator", href: "/calculator" },
      { label: "About", href: "/about" },
      { label: "Client Login", href: "/login" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/legal" },
      { label: "Terms and Conditions", href: "/legal" },
      { label: "Cookie Policy", href: "/legal" },
      { label: "Health Disclaimer", href: "/health-disclaimer" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-line">
      <div className="container-p pb-28 pt-16 sm:pb-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <div className="flex items-center gap-2">
              <Logo className="size-8" animate />
              <span className="font-heading text-xl font-extrabold tracking-tight">
                PRIMEFORM
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Personalised fitness coaching built around clear training, flexible
              nutrition and measurable progress.
            </p>
            <div className="mt-5 flex items-center gap-3 text-sm text-muted">
              <a
                href="#"
                className="grid size-9 place-items-center rounded-full border border-line transition-colors hover:text-ink"
                aria-label="Instagram"
              >
                <Camera className="size-4" strokeWidth={1.7} />
              </a>
              <a
                href="#"
                className="grid size-9 place-items-center rounded-full border border-line transition-colors hover:text-ink"
                aria-label="WhatsApp"
              >
                <MessageCircle className="size-4" strokeWidth={1.7} />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="eyebrow">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted transition-colors hover:text-ink"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 grid gap-6 border-t border-line pt-8 text-sm text-muted sm:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="font-medium text-ink">Contact</p>
            <p className="mt-2">hello@primeform.demo</p>
            <p>Bucharest, Romania</p>
          </div>
          <div className="rounded-card border border-line bg-surface/50 p-4 text-xs leading-relaxed">
            <p>
              PRIMEFORM is a fictional business created by Emanoil Studio to
              demonstrate a complete fitness coaching website and client management
              platform.
            </p>
            <p className="mt-2">
              All names, images, statistics, qualifications, testimonials, prices and
              results are fictional.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} PRIMEFORM Coaching · Demo</p>
          <a
            href="https://emanoil.studio"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-ink transition-colors hover:text-accent"
          >
            Designed and developed by Emanoil Studio
          </a>
        </div>
      </div>
    </footer>
  );
}
