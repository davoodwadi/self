"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const COURSE_WEEKS = [
  {
    title: "Introduction to Marketing & The Marketing Process",
    topics: [
      "Definition and evolution of marketing.",
      "Needs, wants, and demands.",
      "The marketing process and creating customer value.",
    ],
    href: "/courses/intro-marketing/week1",
  },
  {
    title: "The Marketing Environment and Ethics",
    topics: [
      "Micro and macro-environmental factors (PESTLE).",
      "Corporate Social Responsibility (CSR).",
      "Ethical considerations in marketing practices.",
    ],
    href: "/courses/intro-marketing/week2",
  },
  {
    title: "Consumer Behavior",
    topics: [
      "The consumer decision-making process.",
      "Psychological, social, and cultural influences on buying behavior.",
      "B2C vs B2B purchasing differences.",
    ],
    href: "/courses/intro-marketing/week3",
  },
  {
    title: "Business-to-Business (B2B) Marketing",
    topics: [
      "Characteristics of B2B markets.",
      "The organizational buying center.",
      "Relationship marketing and key account management.",
    ],
    href: "/courses/intro-marketing/week4",
  },
  {
    title: "Marketing Research and Data Analytics",
    topics: [
      "The marketing research process.",
      "Primary vs. secondary data.",
      "The role of data analytics and customer insights in decision making.",
    ],
    href: "/courses/intro-marketing/week5",
  },
  {
    title: "Segmentation, Targeting, and Positioning (STP)",
    topics: [
      "Bases for segmenting consumer and business markets.",
      "Evaluating and selecting target markets.",
      "Developing a compelling value proposition and positioning strategy.",
    ],
    href: "/courses/intro-marketing/week6",
  },
  {
    title: "Product and Service Strategies (The First P)",
    topics: [
      "Product classifications and the product life cycle (PLC).",
      "New product development process.",
      "Branding, packaging, and the unique characteristics of services.",
    ],
    href: "/courses/intro-marketing/week7",
  },
  {
    title: "Pricing Strategies (The Second P)",
    topics: [
      "Factors affecting pricing decisions.",
      "Cost-based, value-based, and competition-based pricing.",
      "Pricing strategies for new products and product mixes.",
    ],
    href: "/courses/intro-marketing/week8",
  },
  {
    title: "Supply Chain and Distribution Channels (The Third P)",
    topics: [
      "The nature and importance of marketing channels.",
      "Channel behavior and organization.",
      "Retailing, wholesaling, and logistics management.",
    ],
    href: "/courses/intro-marketing/week9",
  },
  {
    title: "Integrated Marketing Communications (The Fourth P)",
    topics: [
      "The promotion mix: Advertising, PR, Sales Promotion, Personal Selling.",
      "Designing an integrated marketing communications (IMC) strategy.",
      "Setting the promotional budget and measuring effectiveness.",
    ],
    href: "/courses/intro-marketing/week10",
  },
  {
    title: "Digital and Social Media Marketing",
    topics: [
      "The shift from traditional to digital marketing.",
      "SEO, SEM, content marketing, and email marketing.",
      "Leveraging social media platforms for customer engagement.",
    ],
    href: "/courses/intro-marketing/week11",
  },
  {
    title: "Global Marketing and the Future of Marketing",
    topics: [
      "Deciding whether to go global and market entry strategies.",
      "Standardized vs. adapted global marketing mixes.",
      "Emerging trends: AI in marketing, sustainability, and immersive experiences.",
    ],
    href: "/courses/intro-marketing/week12",
  },
];

export default function IntroMarketingLanding() {
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
            --------------------------------------------------------------- */}
        <nav aria-label="Course weeks" className="index-list pb-4">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="type-label">Contents</h2>
            <span className="type-caption">Weekly Breakdown</span>
          </div>

          <ul className="border-t border-[var(--rule)]">
            {COURSE_WEEKS.map((week, idx) => (
              <li
                key={week.href}
                className="index-row border-b border-[var(--rule)]"
              >
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
