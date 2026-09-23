import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SYLLABUS } from "../../(courses-ai)/courses/ai-in-business/_landing/syllabus";

// ============================================================================
// /courses — COURSE INDEX
// ============================================================================
// A junction page. Four courses, one screen, no scroll on desktop: people
// arrive here to leave, and each course already has its own syllabus.
//
// Deck counts are read from the filesystem when the page is built, so a week
// counts as open the moment its page.tsx lands — the numbers cannot go stale.
// ============================================================================

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Courses · Davood Wadi, PhD",
  description:
    "Course websites and lecture decks by Davood Wadi, PhD: Applications of AI in Business, Consumer Behavior, Digital Transformation, and Introduction to Marketing.",
};

const APP_DIR = path.join(/* turbopackIgnore: true */ process.cwd(), "src/app");

const MICRO = "text-[10px] font-semibold uppercase tracking-[0.24em]";

type Course = {
  slug: string;
  code: string | null;
  title: string;
  description: string;
  dir: string;
  /** Session folders, in teaching order. Derived from the folder when omitted. */
  sessions?: string[];
};

const COURSES: Course[] = [
  {
    slug: "ai-in-business",
    code: "BUSI 654",
    title: "Applications of AI in Business",
    description:
      "Hands-on course covering LLMs, prompt engineering, deep learning for NLP and computer vision, and how to evaluate AI tools for real business problems.",
    dir: "(courses-ai)/courses/ai-in-business",
    sessions: SYLLABUS.map((entry) => entry.slug),
  },
  {
    slug: "consumer-behavior",
    code: null,
    title: "Consumer Behavior",
    description:
      "Why people buy, use, and discard products. Perception, learning and memory, motivation, attitudes, decision-making, and the heuristics behind everyday choices.",
    dir: "(courses-cb)/courses/consumer-behavior",
  },
  {
    slug: "digital-transformation",
    code: "CMPT 641",
    title: "Digital Transformation",
    description:
      "Covers how organizations adopt new technologies, manage the transition, and measure outcomes. Platform business models, data-driven decisions, and adoption frameworks.",
    dir: "(courses-dt)/courses/digital-transformation",
  },
  {
    slug: "intro-marketing",
    code: null,
    title: "Introduction to Marketing",
    description:
      "What is marketing? How do we define a consumer? What strategies firms adopt to influence consumption decisions, from STP through the marketing mix.",
    dir: "(courses-intro-marketing)/courses/intro-marketing",
  },
];

type Row = Course & { href: string; total: number; open: number };

function readRow(course: Course): Row {
  const dir = path.join(APP_DIR, course.dir);

  const sessions =
    course.sessions ??
    readdirSync(dir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && !entry.name.startsWith("_"))
      .map((entry) => entry.name);

  const open = sessions.filter((session) =>
    existsSync(path.join(dir, session, "page.tsx")),
  ).length;

  return {
    ...course,
    href: `/courses/${course.slug}`,
    total: sessions.length,
    open,
  };
}

export default function CoursesIndex() {
  const rows = COURSES.map(readRow);

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <Link
        href="/"
        className="fixed top-8 left-8 z-50 flex items-center justify-center w-12 h-12 text-ink-2 transition-colors duration-300 hover:text-signal"
        aria-label="Back to Home Page"
      >
        <ArrowLeft className="w-5 h-5" />
      </Link>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 pt-24 pb-14 lg:px-10 lg:pb-16">
        <Masthead />

        <ul className="mt-10 grid gap-px overflow-hidden rounded-lg bg-rule md:grid-cols-2">
          {rows.map((row) => (
            <li key={row.slug} className="bg-paper-2">
              <CourseCard row={row} />
            </li>
          ))}
        </ul>
      </main>

      <footer className="border-t border-rule">
        <div className="mx-auto w-full max-w-6xl px-6 py-7 lg:px-10">
          <p className="text-sm text-ink-3">
            &copy; {new Date().getFullYear()} Davood Wadi, PhD
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ==========================================================================
   MASTHEAD — the title and a rule.
   ========================================================================== */

function Masthead() {
  return (
    <header className="border-b border-ink pb-8">
      <p className={`${MICRO} flex items-center gap-4 text-ink-3`}>
        <span className="h-px w-10 bg-signal" />
        Davood Wadi, PhD
      </p>
      <h1 className="mt-5 font-display text-5xl leading-none font-semibold tracking-tight text-ink sm:text-6xl lg:text-7xl">
        Courses
      </h1>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-2">
        Course websites and lecture decks, open to students and to anyone
        else who finds them useful.
      </p>
    </header>
  );
}

/* ==========================================================================
   COURSE CARD — the whole card is the link.
   ========================================================================== */

function CourseCard({ row }: { row: Row }) {
  const complete = row.open === row.total;

  return (
    <Link
      href={row.href}
      aria-label={`${row.title}: ${row.open} of ${row.total} decks open`}
      className="group flex h-full flex-col p-7 transition-colors hover:bg-paper lg:p-9"
    >
      <p className={`${MICRO} text-signal`}>{row.code ?? "Course"}</p>

      <h2 className="mt-4 font-display text-2xl leading-snug font-semibold text-ink lg:text-[1.75rem]">
        {row.title}
      </h2>

      <p className="mt-4 text-sm leading-relaxed text-ink-2">
        {row.description}
      </p>

      <div className="mt-auto flex items-end justify-between gap-6 pt-7">
        <p className={`${MICRO} text-ink-3`}>
          {complete
            ? `All ${row.total} decks open`
            : `${row.open} of ${row.total} decks open`}
        </p>

        <ArrowRight
          aria-hidden
          className="size-4 shrink-0 text-ink-3 transition-all group-hover:translate-x-1 group-hover:text-signal"
        />
      </div>
    </Link>
  );
}
