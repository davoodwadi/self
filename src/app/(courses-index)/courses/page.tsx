import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CB_DIR, DME_DIR, IM_DIR, MRA_DIR, RAI_DIR, readCurriculum } from "@/lib/curriculum";

// ============================================================================
// /courses: COURSE INDEX
// ============================================================================
// A junction page. The masthead stays in view on the left while the course
// directory lists on the right, matching the layout of individual course hubs.
// ============================================================================

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Courses | Davood Wadi, PhD",
  description:
    "Course websites and lecture decks by Davood Wadi, PhD: Applications of AI in Business, Consumer Behavior, Digital Marketing & E-Commerce, Digital Transformation, Introduction to Marketing, Marketing Research & Analytics, and Responsible AI & Algorithmic Governance.",
};

type Course = {
  slug: string;
  code: string | null;
  title: string;
  subtitle?: string;
  description: string;
};

// Course text that has a curriculum.md is read from it, not written here.
const CB = readCurriculum(CB_DIR);
const DME = readCurriculum(DME_DIR);
const IM = readCurriculum(IM_DIR);
const MRA = readCurriculum(MRA_DIR);
const RAI = readCurriculum(RAI_DIR);

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
    title: CB.title,
    subtitle: CB.subtitle,
    description: CB.summary,
  },
  {
    slug: "digital-marketing-ecommerce",
    code: null,
    title: DME.title,
    subtitle: DME.subtitle,
    description: DME.summary,
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
    title: IM.title,
    subtitle: IM.subtitle,
    description: IM.summary,
  },
  {
    slug: "marketing-research-analytics",
    code: null,
    title: MRA.title,
    subtitle: MRA.subtitle,
    description: MRA.summary,
  },
  {
    slug: "responsible-ai-governance",
    code: null,
    title: RAI.title,
    subtitle: RAI.subtitle,
    description: RAI.summary,
  },
];

export default function CoursesIndex() {
  return (
    <div className="min-h-screen bg-paper text-ink font-sans">
      <Link
        href="/"
        className="fixed top-8 left-8 z-50 flex items-center justify-center w-12 h-12 text-ink-2 transition-colors duration-200 hover:text-signal hover:bg-signal/5"
        aria-label="Back to Home Page"
      >
        <ArrowLeft className="w-5 h-5" />
      </Link>

      <div className="mx-auto grid w-full max-w-7xl gap-x-16 px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:px-12">
        {/* Masthead: stays in view beside the course list on wide screens. */}
        <header className="pt-20 pb-12 md:pt-28 lg:sticky lg:top-0 lg:flex lg:h-svh lg:flex-col lg:justify-center lg:py-16">
          <h1 className="font-sans text-4xl md:text-5xl font-bold leading-[1.12] tracking-[-0.02em] text-ink">
            Courses
          </h1>

          <p className="mt-4 max-w-[42ch] text-lg leading-[1.55] text-ink-2">
            Course websites and lecture decks, open to students and to anyone
            else who finds them useful.
          </p>

          <p className="mt-6 border-t border-ink/15 pt-4 text-sm text-ink-3">
            Davood Wadi, PhD
          </p>
        </header>

        {/* Course directory */}
        <nav aria-label="Courses" className="pb-14 lg:py-20">
          <div className="mb-3">
            <h2 className="text-sm font-semibold text-ink-3">Directory</h2>
          </div>

          <ol className="border-t border-ink/20">
            {COURSES.map((course, i) => (
              <li key={course.slug} className="border-b border-ink/12">
                <CourseRow course={course} index={i + 1} />
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
}

/* ==========================================================================
   COURSE ROW: tabular number, title, optional code/subtitle, and summary.
   ========================================================================== */

function CourseRow({ course, index }: { course: Course; index: number }) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group grid grid-cols-[2.25rem_minmax(0,1fr)_auto] gap-x-4 py-5 md:gap-x-5 -mx-3 px-3 transition-colors hover:bg-ink/[0.025]"
    >
      <span
        aria-hidden
        className="pt-0.5 text-[0.9375rem] font-medium leading-[1.4] text-ink-3/80 tabular-nums transition-colors group-hover:text-signal"
      >
        {String(index).padStart(2, "0")}
      </span>

      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-sans text-[1.125rem] font-semibold leading-[1.35] text-ink transition-colors group-hover:text-signal">
            {course.title}
          </h3>
          {course.code && (
            <span className="text-xs font-medium text-ink-3 tabular-nums">
              {course.code}
            </span>
          )}
        </div>

        <p className="mt-1 max-w-2xl text-[0.9375rem] leading-[1.55] text-ink-3">
          {course.description}
        </p>
      </div>

      <ArrowRight
        aria-hidden
        className="mt-1 size-4 shrink-0 text-ink-3/70 transition-all duration-200 group-hover:translate-x-1 group-hover:text-signal"
      />
    </Link>
  );
}
