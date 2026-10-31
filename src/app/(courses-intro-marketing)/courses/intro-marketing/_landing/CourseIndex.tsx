import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Curriculum, CurriculumWeek } from "@/lib/curriculum";

type Row = CurriculumWeek & { href: string; available: boolean };

type Masthead = Omit<Curriculum, "weeks">;

/** Week number, title and summary: the same row whether it links or not. */
function RowBody({ week, n }: { week: Row; n: number }) {
  const on = week.available;
  return (
    <>
      <span
        className={`font-sans font-medium pt-0.5 text-[0.9375rem] leading-[1.4] tabular-nums transition-colors ${
          on
            ? "text-[var(--ink-3)]/80 group-hover:text-[var(--signal)]"
            : "text-[var(--ink-3)]/50"
        }`}
      >
        {n}
      </span>
      <div className="min-w-0">
        <h3
          className={`font-sans font-semibold text-[1.0625rem] leading-[1.35] tracking-normal transition-colors ${
            on
              ? "text-[var(--ink)] group-hover:text-[var(--signal)]"
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
          {week.summary}
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
          className="mt-1 size-4 text-[var(--ink)]/40 transition-[color,transform] duration-150 group-hover:translate-x-0.5 group-hover:text-[var(--signal)]"
        />
      ) : (
        <span aria-hidden />
      )}
    </>
  );
}

function BackLink() {
  return (
    <Link
      href="/courses"
      className="fixed top-8 left-8 z-50 flex items-center justify-center w-12 h-12 transition-colors duration-200 text-[var(--ink-3)] hover:text-[var(--signal)] hover:bg-[var(--signal)]/5"
      aria-label="Back to all courses"
    >
      <ArrowLeft className="w-5 h-5" />
    </Link>
  );
}

const ROW =
  "grid grid-cols-[2.25rem_minmax(0,1fr)_auto] gap-x-4 md:gap-x-5 py-5";

export default function CourseIndex({
  course,
  weeks,
}: {
  course: Masthead;
  weeks: Row[];
}) {
  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)] font-sans overflow-x-clip">
      <BackLink />
      <div className="mx-auto grid w-full max-w-7xl gap-x-16 px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:px-12">
        {/* Masthead: stays in view beside the curriculum on wide screens. */}
        <header className="pt-20 pb-12 md:pt-28 lg:sticky lg:top-0 lg:flex lg:h-svh lg:flex-col lg:justify-center lg:py-16">
          <p className="font-sans text-[0.875rem] font-medium leading-[1.4] text-[var(--ink-3)] [font-variant-numeric:tabular-nums]">
            {[course.level, course.program, course.duration]
              .filter((item): item is string => Boolean(item))
              .join(" | ")}
          </p>

          <h1 className="mt-3 font-sans font-bold text-[clamp(2rem,3.2vw,2.75rem)] leading-[1.15] tracking-[-0.015em] text-[var(--ink)]">
            {course.title}
          </h1>
          <p className="mt-2 font-sans text-[1.125rem] font-medium leading-[1.4] text-[var(--ink-2)]">
            {course.subtitle}
          </p>

          <p className="mt-4 max-w-[46ch] font-sans text-[1.0625rem] font-normal leading-[1.6] text-[var(--ink-3)]">
            {course.overview}
          </p>

          <p className="mt-6 border-t border-[var(--ink)]/15 pt-4 font-sans text-[0.9375rem] font-medium leading-[1.4] text-[var(--ink)]">
            {course.instructor}
          </p>
        </header>

        {/* Curriculum */}
        <nav aria-label="Course weeks" className="pb-10 lg:py-20">
          <div className="mb-3">
            <h2 className="font-sans text-[0.875rem] font-semibold leading-[1.4] text-[var(--ink-3)]">
              Curriculum
            </h2>
          </div>

          <ol className="border-t border-[var(--ink)]/20">
            {weeks.map((week, idx) => (
              <li key={week.slug} className="border-b border-[var(--ink)]/12">
                {week.available ? (
                  <Link
                    href={week.href}
                    className={`group ${ROW} block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--signal)]`}
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
