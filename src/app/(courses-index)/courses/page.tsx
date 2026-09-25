import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

// ============================================================================
// /courses — COURSE INDEX
// ============================================================================
// A junction page. Five courses, one screen, no scroll on desktop: people
// arrive here to leave, and each course already has its own syllabus.
// ============================================================================

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Courses · Davood Wadi, PhD",
  description:
    "Course websites and lecture decks by Davood Wadi, PhD: Applications of AI in Business, Consumer Behavior, Digital Transformation, Introduction to Marketing, and Marketing Research & Analytics.",
};

const MICRO = "text-[10px] font-semibold uppercase tracking-[0.24em]";

type Course = {
  slug: string;
  code: string | null;
  title: string;
  description: string;
};

const COURSES: Course[] = [
  {
    slug: "ai-in-business",
    code: "BUSI 654",
    title: "Applications of AI in Business",
    description:
      "Hands-on course covering LLMs, prompt engineering, deep learning for NLP and computer vision, and how to evaluate AI tools for real business problems.",
  },
  {
    slug: "consumer-behavior",
    code: null,
    title: "Consumer Behavior",
    description:
      "Why people buy, use, and discard products. Perception, learning and memory, motivation, attitudes, decision-making, and the heuristics behind everyday choices.",
  },
  {
    slug: "digital-transformation",
    code: "CMPT 641",
    title: "Digital Transformation",
    description:
      "Covers how organizations adopt new technologies, manage the transition, and measure outcomes. Platform business models, data-driven decisions, and adoption frameworks.",
  },
  {
    slug: "intro-marketing",
    code: null,
    title: "Introduction to Marketing",
    description:
      "What is marketing? How do we define a consumer? What strategies firms adopt to influence consumption decisions, from STP through the marketing mix.",
  },
  {
    slug: "marketing-research-analytics",
    code: null,
    title: "Marketing Research & Analytics",
    description:
      "Examines the design and conduct of marketing research in support of managerial decision-making. Topics include research design, measurement, sampling, experimentation, and multivariate and predictive analysis, with attention to the role of artificial intelligence in the research process.",
  },
];

export default function CoursesIndex() {
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

        <ul className="mt-10 grid gap-px overflow-hidden rounded-lg bg-rule md:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((course) => (
            <li key={course.slug} className="bg-paper-2 md:last:odd:col-span-2">
              <CourseCard course={course} />
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

function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group flex h-full flex-col p-7 transition-colors hover:bg-paper lg:p-9"
    >
      <p className={`${MICRO} text-signal`}>{course.code ?? "Course"}</p>

      <h2 className="mt-4 font-display text-2xl leading-snug font-semibold text-ink lg:text-[1.75rem]">
        {course.title}
      </h2>

      <p className="mt-4 text-sm leading-relaxed text-ink-2">
        {course.description}
      </p>

      <div className="mt-auto flex justify-end pt-7">
        <ArrowRight
          aria-hidden
          className="size-4 shrink-0 text-ink-3 transition-all group-hover:translate-x-1 group-hover:text-signal"
        />
      </div>
    </Link>
  );
}
