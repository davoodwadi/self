"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Curriculum, CurriculumWeek } from "@/lib/curriculum";

type Row = CurriculumWeek & { href: string; available: boolean };

/** The masthead text, all of it read from curriculum.md. */
type Masthead = Omit<Curriculum, "weeks">;

/** Week number, title and blurb: the same row whether it links or not. */
function RowBody({ week, n }: { week: Row; n: number }) {
  return (
    <>
      <span
        aria-hidden
        className={
          week.available
            ? "select-none pt-0.5 text-[1.95rem] leading-[0.88] tabular-nums text-transparent [-webkit-text-stroke:1.25px_var(--ink)] transition-all group-hover:[-webkit-text-stroke:1.25px_var(--signal)]"
            : "select-none pt-0.5 text-[1.95rem] leading-[0.88] tabular-nums text-transparent [-webkit-text-stroke:1.1px_var(--ink-3)] opacity-50"
        }
        style={{ fontFamily: "var(--font-heading)", fontWeight: 500 }}
      >
        {n}
      </span>
      <div className="min-w-0">
        <h3
          className={
            week.available
              ? "type-h2 !text-[clamp(1.2rem,1.7vw,1.45rem)] group-hover:text-[var(--signal)] transition-colors"
              : "type-h2 !text-[clamp(1.2rem,1.7vw,1.45rem)] !text-[var(--ink-3)]"
          }
        >
          {week.title}
        </h3>
        <p
          className={
            week.available
              ? "type-body !text-[0.95rem] mt-1.5 max-w-[62ch]"
              : "type-body !text-[0.95rem] mt-1.5 max-w-[62ch] opacity-70"
          }
        >
          {week.summary}
        </p>
        {week.available ? null : (
          <p className="type-label mt-2.5 !text-[0.65rem] !text-[var(--ink-3)]">
            In preparation
          </p>
        )}
      </div>
      {week.available ? (
        <ArrowRight
          aria-hidden
          className="mt-1.5 size-4 text-[var(--ink-3)] transition-[color,transform] duration-200 group-hover:translate-x-1 group-hover:text-[var(--signal)]"
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
      className="fixed top-8 left-8 z-50 flex items-center justify-center w-12 h-12 transition-colors duration-300 text-[var(--ink-2)] hover:text-[var(--signal)]"
      aria-label="Back to all courses"
    >
      <ArrowLeft className="w-5 h-5" />
    </Link>
  );
}

const ROW =
  "grid grid-cols-[2.75rem_minmax(0,1fr)_auto] gap-x-4 md:gap-x-6 py-5 -mx-3 px-3";

export default function CourseIndex({
  course,
  weeks,
}: {
  course: Masthead;
  weeks: Row[];
}) {
  return (
    <div className="relative min-h-screen">
      <BackLink />
      <div className="mx-auto grid w-full max-w-[var(--slide-max)] gap-x-16 px-5 md:px-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:px-16">
        {/* Masthead: stays in view beside the index on wide screens. */}
        <header className="pt-20 pb-12 md:pt-28 lg:sticky lg:top-0 lg:flex lg:h-svh lg:flex-col lg:justify-center lg:py-12">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-7 bg-[var(--signal)]" aria-hidden />
            <span className="type-label">
              {[course.level, course.program, course.duration]
                .filter((item): item is string => Boolean(item))
                .map((item) => item.replaceAll(" ", "\u00a0"))
                .join(" | ")}
            </span>
          </div>

          <h1 className="type-display max-w-[15ch] !text-[clamp(2.3rem,3.8vw,3.5rem)] !leading-[1.03]">
            {course.title}
          </h1>
          <p className="type-subtitle mt-3.5">{course.subtitle}</p>

          <p className="type-lead mt-6 max-w-[52ch] border-t-2 border-[var(--ink)] pt-5 !text-[clamp(0.96rem,1.08vw,1.06rem)] !leading-[1.58]">
            {course.overview}
          </p>

          <p className="type-body mt-6 border-t border-[var(--rule)] pt-4 !text-[var(--ink)]">
            {course.instructor}
          </p>
        </header>

        {/* Index */}
        <nav aria-label="Course weeks" className="pb-10 lg:py-20">
          <div className="mb-4">
            <h2 className="type-label">Curriculum</h2>
          </div>

          <ol className="border-t-2 border-[var(--ink)]">
            {weeks.map((week, idx) => (
              <li
                key={week.slug}
                className="border-b border-[var(--rule)] last:border-b-2 last:border-[var(--ink)]"
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
