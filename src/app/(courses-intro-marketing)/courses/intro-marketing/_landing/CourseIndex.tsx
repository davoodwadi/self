"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Week } from "./weeks";

type Row = Week & { href: string; available: boolean };

export default function CourseIndex({ weeks }: { weeks: Row[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".masthead-item",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", stagger: 0.1 },
      );

      gsap.fromTo(
        ".index-row",
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.045,
          ease: "power2.out",
          delay: 0.35,
          scrollTrigger: { trigger: ".index-list", start: "top 90%" },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen">
      <div className="mx-auto w-full max-w-[var(--slide-max)] px-5 md:px-10 lg:px-16">
        {/* ---------------------------------------------------------------
            Masthead
            --------------------------------------------------------------- */}
        <header className="pt-24 pb-16 md:pt-36 md:pb-24">
          <div className="masthead-item flex items-center gap-3 mb-8">
            <span className="h-px w-7 bg-[var(--signal)]" aria-hidden />
            <span className="type-label">Bachelor&apos;s · 12 Weeks</span>
          </div>

          <h1 className="masthead-item type-display max-w-[14ch]">
            Introduction to Marketing
          </h1>

          <p className="masthead-item type-lead mt-8 max-w-[60ch]">
            This course introduces the fundamental concepts, theories, and
            practices of modern marketing. Students will explore how
            organizations create, communicate, and deliver value to target
            customers while achieving business objectives.
          </p>

          <div className="masthead-item mt-12 pt-6 border-t border-[var(--rule)] flex flex-wrap gap-x-12 gap-y-4">
            <div>
              <div className="type-caption mb-1">Instructor</div>
              <div className="type-body !text-[var(--ink)]">
                Davood Wadi, PhD
              </div>
            </div>
          </div>
        </header>

        {/* ---------------------------------------------------------------
            Index — a ruled contents list, not a grid of identical boxes.
            Weeks whose deck is still being written are listed but inert.
            --------------------------------------------------------------- */}
        <nav aria-label="Course weeks" className="index-list pb-4">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="type-label">Contents</h2>
            <span className="type-caption">Weekly Breakdown</span>
          </div>

          <ul className="border-t border-[var(--rule)]">
            {weeks.map((week, idx) => (
              <li
                key={week.slug}
                className="index-row border-b border-[var(--rule)]"
              >
                {week.available ? (
                  <Link
                    href={week.href}
                    className="group grid grid-cols-[2.75rem_1fr] md:grid-cols-[5rem_minmax(0,22rem)_1fr] gap-x-4 md:gap-x-8 gap-y-2 py-7 md:py-8 items-baseline transition-colors duration-200 hover:bg-[var(--paper-2)] -mx-3 px-3"
                  >
                    <span className="type-caption tabular-nums group-hover:text-[var(--signal)] transition-colors">
                      {String(idx + 1).padStart(2, "0")}
                    </span>

                    <h3 className="type-h2 col-start-2 group-hover:text-[var(--signal)] transition-colors">
                      {week.title}
                    </h3>

                    <ul className="type-body !text-[1rem] col-start-2 md:col-start-3 max-w-[58ch] space-y-1">
                      {week.topics.map((topic) => (
                        <li key={topic}>{topic}</li>
                      ))}
                    </ul>
                  </Link>
                ) : (
                  <div
                    aria-disabled="true"
                    className="grid grid-cols-[2.75rem_1fr] md:grid-cols-[5rem_minmax(0,22rem)_1fr] gap-x-4 md:gap-x-8 gap-y-2 py-7 md:py-8 items-baseline cursor-default -mx-3 px-3"
                  >
                    <span className="type-caption tabular-nums opacity-55">
                      {String(idx + 1).padStart(2, "0")}
                    </span>

                    <h3 className="type-h2 col-start-2 !text-[var(--ink-3)]">
                      {week.title}
                    </h3>

                    <div className="col-start-2 md:col-start-3 max-w-[58ch]">
                      <ul className="type-body !text-[1rem] space-y-1 opacity-70">
                        {week.topics.map((topic) => (
                          <li key={topic}>{topic}</li>
                        ))}
                      </ul>
                      <p className="type-label mt-3 flex items-center gap-2 !text-[var(--ink-3)]">
                        <span
                          aria-hidden
                          className="size-1.5 rounded-full border border-current"
                        />
                        In preparation
                      </p>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* ---------------------------------------------------------------
            Back to the course index.
            --------------------------------------------------------------- */}
        <div className="pb-24 pt-10">
          <Link
            href="/courses"
            className="group inline-flex items-center gap-3 type-label transition-colors hover:text-[var(--signal)]"
          >
            <ArrowLeft
              aria-hidden
              className="size-4 transition-transform duration-200 group-hover:-translate-x-1"
            />
            All courses
          </Link>
        </div>
      </div>
    </div>
  );
}
