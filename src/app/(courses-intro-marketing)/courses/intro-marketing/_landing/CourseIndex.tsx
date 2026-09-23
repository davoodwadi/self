"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Week } from "./weeks";

type Row = Week & { href: string; available: boolean };

/** Week number, title and topics: the same row whether it links or not. */
function RowBody({ week, n }: { week: Row; n: number }) {
  return (
    <>
      <span
        className={
          week.available
            ? "type-caption tabular-nums pt-1 group-hover:text-[var(--signal)] transition-colors"
            : "type-caption tabular-nums pt-1 opacity-55"
        }
      >
        {String(n).padStart(2, "0")}
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
        <ul
          className={
            week.available
              ? "type-body !text-[0.95rem] mt-1.5 max-w-[62ch] space-y-0.5"
              : "type-body !text-[0.95rem] mt-1.5 max-w-[62ch] space-y-0.5 opacity-70"
          }
        >
          {week.topics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
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

const ROW =
  "grid grid-cols-[2.25rem_minmax(0,1fr)_auto] gap-x-4 md:gap-x-6 py-5 -mx-3 px-3";

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

export default function CourseIndex({ weeks }: { weeks: Row[] }) {

  return (
    <div className="relative min-h-screen">
      <BackLink />
      <div className="mx-auto grid w-full max-w-[var(--slide-max)] gap-x-16 px-5 md:px-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:px-16">
        {/* Masthead: stays in view beside the curriculum on wide screens. */}
        <header className="pt-20 pb-12 md:pt-28 lg:sticky lg:top-0 lg:flex lg:h-svh lg:flex-col lg:justify-center lg:py-16">
          <div className="flex items-center gap-3 mb-7">
            <span className="h-px w-7 bg-[var(--signal)]" aria-hidden />
            <span className="type-label">Bachelor&apos;s · 12 Weeks</span>
          </div>

          <h1 className="type-display !text-[clamp(2.8rem,5vw,4.5rem)]">
            Introduction to Marketing
          </h1>

          <p className="type-lead mt-7 max-w-[46ch]">
            This course introduces the fundamental concepts, theories, and
            practices of modern marketing. Students will explore how
            organizations create, communicate, and deliver value to target
            customers while achieving business objectives.
          </p>

          <p className="type-body mt-8 border-t border-[var(--rule)] pt-5 !text-[var(--ink)]">
            Davood Wadi, PhD
          </p>

        </header>

        {/* Curriculum. Weeks whose deck is still being written are listed but inert. */}
        <nav aria-label="Course weeks" className="pb-10 lg:py-20">
          <div className="mb-4">
            <h2 className="type-label">Curriculum</h2>
          </div>

          <ol className="border-t border-[var(--rule)]">
            {weeks.map((week, idx) => (
              <li key={week.slug} className="border-b border-[var(--rule)]">
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
