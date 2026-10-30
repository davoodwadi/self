import path from "node:path";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { isDeckBuilt } from "@/lib/course-status";
import { DECK_THEME } from "./_visuals/kit";

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

type Row = (typeof COURSE_WEEKS)[number] & { href: string; available: boolean };

function BackLink() {
  return (
    <Link
      href="/courses"
      className="fixed top-8 left-8 z-50 flex items-center justify-center w-12 h-12 transition-colors duration-200 text-[var(--ink-3)] hover:text-[var(--dt-signal)] hover:bg-[var(--dt-signal)]/5"
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
        className={`font-sans font-medium pt-0.5 text-[0.9375rem] leading-[1.4] tabular-nums transition-colors ${
          on
            ? "text-[var(--ink-3)]/80 group-hover:text-[var(--dt-signal)]"
            : "text-[var(--ink-3)]/50"
        }`}
      >
        {n}
      </span>
      <div className="min-w-0">
        <h3
          className={`font-sans font-semibold text-[1.0625rem] leading-[1.35] tracking-normal transition-colors ${
            on
              ? "text-[var(--dt-ink)] group-hover:text-[var(--dt-signal)]"
              : "text-[var(--ink-3)]/70"
          }`}
        >
          {week.title}
        </h3>
        <p
          className={`font-sans mt-1 max-w-2xl text-[0.9375rem] leading-[1.55] text-[var(--ink-3)] ${
            on ? "" : "opacity-75"
          }`}
        >
          {week.subtitle}
        </p>
        {on ? null : (
          <p className="font-sans mt-2 text-xs font-normal text-[var(--ink-3)]/70">
            In preparation
          </p>
        )}
      </div>
      {on ? (
        <ArrowRight
          aria-hidden
          className="mt-1 size-4 text-[var(--dt-ink)]/40 transition-[color,transform] duration-150 group-hover:translate-x-0.5 group-hover:text-[var(--dt-signal)]"
        />
      ) : (
        <span aria-hidden />
      )}
    </>
  );
}

const ROW =
  "grid grid-cols-[2.25rem_minmax(0,1fr)_auto] gap-x-4 md:gap-x-5 py-5";

export default function DigitalTransformationLanding() {
  const weeks: Row[] = COURSE_WEEKS.map((week) => ({
    ...week,
    href: `/courses/digital-transformation/${week.slug}`,
    available: isDeckBuilt(COURSE_DIR, week.slug),
  }));

  return (
    <div
      style={DECK_THEME}
      className="min-h-screen bg-[var(--dt-white)] text-[var(--dt-ink)] font-sans overflow-x-clip"
    >
      <BackLink />
      <div className="mx-auto grid w-full max-w-7xl gap-x-16 px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:px-12">
        {/* Masthead: stays in view beside the curriculum on wide screens. */}
        <header className="pt-20 pb-12 md:pt-28 lg:sticky lg:top-0 lg:flex lg:h-svh lg:flex-col lg:justify-center lg:py-16">
          <h1 className="font-sans font-bold text-[clamp(2rem,3.2vw,2.75rem)] leading-[1.15] tracking-[-0.015em] text-[var(--dt-ink)]">
            Digital Transformation
          </h1>

          <p className="mt-4 max-w-[42ch] font-sans text-[1.0625rem] font-normal leading-[1.6] text-[var(--ink-3)]">
            The intersection of business strategy, human systems, and emerging
            technologies. A ten-week course from foundations to the future of
            industry.
          </p>

          <p className="mt-6 border-t border-[var(--dt-ink)]/15 pt-4 font-sans text-[0.9375rem] font-medium leading-[1.4] text-[var(--dt-ink)]">
            Davood Wadi, PhD
          </p>
        </header>

        {/* Curriculum */}
        <nav aria-label="Course weeks" className="pb-10 lg:py-20">
          <div className="mb-3">
            <h2 className="font-sans text-[0.875rem] font-semibold leading-[1.4] text-[var(--ink-3)]">
              Curriculum
            </h2>
          </div>

          <ol className="border-t border-[var(--dt-ink)]/20">
            {weeks.map((week, idx) => (
              <li
                key={week.slug}
                className="border-b border-[var(--dt-ink)]/12"
              >
                {week.available ? (
                  <Link
                    href={week.href}
                    className={`group ${ROW} block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--dt-signal)]`}
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
