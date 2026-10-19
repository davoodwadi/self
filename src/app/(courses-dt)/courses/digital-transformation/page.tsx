import path from "node:path";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { isDeckBuilt } from "@/lib/course-status";
import { DECK_THEME, Diamond } from "./_visuals/kit";

// The course masthead stays in view on the left while the curriculum scrolls
// on the right, the same layout as the other course landings, styled in the
// course's Flat Silhouette poster palette and typography. A week links out
// only once its deck has been built.

export const dynamic = "force-static";

const COURSE_DIR = path.join(
  /* turbopackIgnore: true */ process.cwd(),
  "src/app/(courses-dt)/courses/digital-transformation",
);

const COURSE_WEEKS = [
  {
    slug: "week-1",
    title: "Introduction to Digital Transformation",
    subtitle:
      "Fundamentally changing how businesses operate and deliver value to customers by integrating digital technology into all areas.",
  },
  {
    slug: "week-2",
    title: "Big Data, Porter's Value Chain, and Socio-Technical Systems",
    subtitle:
      "Exploring data structures, Big Data concepts, and organizational frameworks.",
  },
  {
    slug: "week-3",
    title: "Change Management & Agile Methodologies",
    subtitle:
      "Exploring data-driven strategies, frameworks for organizational change, and iterative agile processes like Scrum.",
  },
  {
    slug: "week-4",
    title: "Technology Acceptance Models & Emerging Paradigms",
    subtitle: "Understanding TAM, UTAUT, IoT, Cloud, Edge, and Fog Computing",
  },
  {
    slug: "week-5",
    title: "Cloud, Fog, and Edge Computing",
    subtitle:
      "Understanding modern computing infrastructures and service models",
  },
  {
    slug: "week-6",
    title: "AI & Machine Learning",
    subtitle:
      "Understanding Intelligence, ML Algorithms, and Learning Paradigms",
  },
  {
    slug: "week-7",
    title: "Blockchain Technology",
    subtitle:
      "Exploring Blockchain, Smart Contracts, and Business Applications",
  },
  {
    slug: "week-8",
    title: "Immersive Technologies & Gamification",
    subtitle:
      "Exploring AR, VR, Game Mechanics, and Their Ethical Implications in Business",
  },
  {
    slug: "week-9",
    title: "Industry 4.0",
    subtitle: "From the First Industrial Revolution to the Digital Age",
  },
  {
    slug: "week-10",
    title: "Cyber Security, Ethics and Social Issues",
    subtitle:
      "Navigating the complex landscape of digital transformation risks, ethical AI, and environmental impacts.",
  },
];

const LABEL =
  "font-accent text-[0.7rem] font-bold uppercase tracking-[0.25em]";

type Row = (typeof COURSE_WEEKS)[number] & { href: string; available: boolean };

function BackLink() {
  return (
    <Link
      href="/courses"
      className="fixed top-8 left-8 z-50 flex items-center justify-center w-12 h-12 transition-colors duration-300 text-[var(--ink-3)] hover:text-[var(--dt-signal)]"
      aria-label="Back to all courses"
    >
      <ArrowLeft className="w-5 h-5" />
    </Link>
  );
}

/** Week number, title and subtitle: the same row whether it links or not. */
function RowBody({ week, n }: { week: Row; n: number }) {
  const on = week.available;
  return (
    <>
      <span
        className={`font-heading font-bold pt-0.5 text-lg tabular-nums transition-colors ${
          on
            ? "text-[var(--dt-ink)] group-hover:text-[var(--dt-signal)]"
            : "text-[var(--ink-3)] opacity-60"
        }`}
      >
        {String(n).padStart(2, "0")}
      </span>
      <div className="min-w-0">
        <h3
          className={`font-heading font-bold text-[clamp(1.2rem,1.7vw,1.45rem)] leading-snug tracking-[-0.01em] transition-colors ${
            on
              ? "text-[var(--dt-ink)] group-hover:text-[var(--dt-signal)]"
              : "text-[var(--ink-3)]"
          }`}
        >
          {week.title}
        </h3>
        <p
          className={`font-body mt-1.5 max-w-[62ch] text-[0.98rem] leading-relaxed text-[var(--ink-3)] ${
            on ? "" : "opacity-70"
          }`}
        >
          {week.subtitle}
        </p>
        {on ? null : (
          <p className={`${LABEL} mt-2.5 !text-[0.65rem] text-[var(--ink-3)]`}>
            In preparation
          </p>
        )}
      </div>
      {on ? (
        <ArrowRight
          aria-hidden
          className="mt-1.5 size-4 text-[var(--dt-ink)] transition-[color,transform] duration-200 group-hover:translate-x-1 group-hover:text-[var(--dt-signal)]"
        />
      ) : (
        <span aria-hidden />
      )}
    </>
  );
}

const ROW =
  "grid grid-cols-[2.25rem_minmax(0,1fr)_auto] gap-x-4 md:gap-x-6 py-5 -mx-3 px-3";

export default function DigitalTransformationLanding() {
  const weeks: Row[] = COURSE_WEEKS.map((week) => ({
    ...week,
    href: `/courses/digital-transformation/${week.slug}`,
    available: isDeckBuilt(COURSE_DIR, week.slug),
  }));

  return (
    <div
      style={DECK_THEME}
      className="min-h-screen bg-[var(--dt-cream)] text-[var(--dt-ink)] font-body"
    >
      <BackLink />
      <div className="mx-auto grid w-full max-w-6xl gap-x-16 px-6 md:px-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        {/* Masthead: stays in view beside the curriculum on wide screens. */}
        <header className="pt-20 pb-12 md:pt-28 lg:sticky lg:top-0 lg:flex lg:h-svh lg:flex-col lg:justify-center lg:py-16">
          <p className={`${LABEL} flex items-center gap-3 text-[var(--dt-signal)]`}>
            <span
              aria-hidden
              className="inline-block w-2 h-2 rotate-45 shrink-0 bg-[var(--dt-signal)]"
            />
            CMPT 641 · {weeks.length} Weeks
          </p>

          <h1 className="mt-5 font-heading font-bold text-[clamp(2.6rem,4.4vw,3.9rem)] leading-[1.02] tracking-[-0.02em] text-[var(--dt-ink)]">
            Digital Transformation
          </h1>

          <div className="mt-6 h-[5px] w-24 bg-[var(--dt-signal)]" />

          <p className="mt-6 max-w-[44ch] font-body text-lg leading-relaxed text-[var(--dt-ink)] md:text-xl">
            The intersection of business strategy, human systems, and emerging
            technologies. A ten-week course from foundations to the future of
            industry.
          </p>

          <div className="mt-8 border-t-[3px] border-[var(--dt-ink)] pt-5">
            <p className="flex items-center gap-3 font-accent text-sm font-bold tracking-wider text-[var(--dt-ink)]">
              <Diamond />
              Davood Wadi, PhD
            </p>
          </div>
        </header>

        {/* Curriculum */}
        <nav aria-label="Course weeks" className="pb-10 lg:py-20">
          <div className="mb-4">
            <h2 className={`${LABEL} flex items-center gap-3 text-[var(--dt-signal)]`}>
              <span
                aria-hidden
                className="inline-block w-2 h-2 rotate-45 shrink-0 bg-[var(--dt-signal)]"
              />
              Curriculum
            </h2>
          </div>

          <ol className="border-t-[4px] border-[var(--dt-ink)]">
            {weeks.map((week, idx) => (
              <li
                key={week.slug}
                className="border-b border-[var(--dt-ink)]/25 last:border-b-[3px] last:border-[var(--dt-ink)]"
              >
                {week.available ? (
                  <Link
                    href={week.href}
                    className={`group ${ROW} transition-colors duration-200 hover:bg-[var(--paper-2)]`}
                  >
                    <RowBody week={week} n={idx + 1} />
                  </Link>
                ) : (
                  <div aria-disabled="true" className={`${ROW} cursor-default`}>
                    <RowBody week={week} n={idx + 1} />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
}
