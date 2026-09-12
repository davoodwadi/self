"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const COURSE_WEEKS = [
  {
    title: "What Marketing Actually Is",
    blurb:
      "Why the discipline is about value exchange, not persuasion — and the five-step process that follows from that.",
    href: "/courses/intro-marketing/week1",
  },
  {
    title: "Environment & Ethics",
    blurb:
      "The forces a firm can influence, the forces it can only read, and where the line between the two keeps moving.",
    href: "/courses/intro-marketing/week2",
  },
  {
    title: "Consumer Behaviour",
    blurb:
      "How culture, reference groups and memory shape a purchase long before anyone compares prices.",
    href: "/courses/intro-marketing/week3",
  },
  {
    title: "Business-to-Business Marketing",
    blurb:
      "Buying centres, switching costs, and why a sale with six signatories behaves nothing like a sale with one.",
    href: "/courses/intro-marketing/week4",
  },
  {
    title: "Research & Analytics",
    blurb:
      "Turning a business problem into a research question, and knowing which evidence can actually answer it.",
    href: "/courses/intro-marketing/week5",
  },
  {
    title: "Segmentation, Targeting, Positioning",
    blurb:
      "Choosing who not to serve, and earning a defensible sentence in the customer's head.",
    href: "/courses/intro-marketing/week6",
  },
  {
    title: "Product & Brand",
    blurb:
      "What a customer is really buying, how brands accumulate equity, and why most new products fail.",
    href: "/courses/intro-marketing/week7",
  },
  {
    title: "Pricing",
    blurb:
      "The only P that brings money in. Costs set the floor, perceived value sets the ceiling, competitors set the nerves.",
    href: "/courses/intro-marketing/week8",
  },
  {
    title: "Channels & Distribution",
    blurb:
      "Getting the offer within reach — and the conflict that follows when partners want the same margin.",
    href: "/courses/intro-marketing/week9",
  },
  {
    title: "Marketing Communications",
    blurb:
      "Advertising, PR, promotion and sales as one message, budgeted against what each is good at.",
    href: "/courses/intro-marketing/week10",
  },
  {
    title: "Digital & Social",
    blurb:
      "Owned, paid and earned media; search, content and the measurement that keeps it honest.",
    href: "/courses/intro-marketing/week11",
  },
  {
    title: "Global Markets & What's Next",
    blurb:
      "Entry modes, how much to adapt, and the shifts — AI, privacy, sustainability — already reshaping the job.",
    href: "/courses/intro-marketing/week12",
  },
];

export default function IntroMarketingLanding() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
            <span className="type-label">Undergraduate · 12 weeks</span>
          </div>

          <h1 className="masthead-item type-display max-w-[14ch]">
            Introduction to Marketing
          </h1>

          <p className="masthead-item type-lead mt-8 max-w-[52ch]">
            Marketing is the discipline of deciding who you are for, what you
            are worth to them, and how that judgement gets made. Twelve weeks
            on how firms create value — and how they capture it back.
          </p>

          <div className="masthead-item mt-12 pt-6 border-t border-[var(--rule)] flex flex-wrap gap-x-12 gap-y-4">
            <div>
              <div className="type-caption mb-1">Instructor</div>
              <div className="type-body !text-[var(--ink)]">
                Davood Wadi, PhD
              </div>
            </div>
            <div>
              <div className="type-caption mb-1">Format</div>
              <div className="type-body !text-[var(--ink)]">
                Lecture decks with knowledge checks
              </div>
            </div>
          </div>
        </header>

        {/* ---------------------------------------------------------------
            Index — a ruled contents list, not a grid of identical boxes.
            --------------------------------------------------------------- */}
        <nav aria-label="Course weeks" className="index-list pb-32">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="type-label">Contents</h2>
            <span className="type-caption">Twelve sessions</span>
          </div>

          <ul className="border-t border-[var(--rule)]">
            {COURSE_WEEKS.map((week, idx) => (
              <li key={week.href} className="index-row border-b border-[var(--rule)]">
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

                  <p className="type-body !text-[1rem] col-start-2 md:col-start-3 max-w-[58ch]">
                    {week.blurb}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
