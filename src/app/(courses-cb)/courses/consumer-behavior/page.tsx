"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Set `href` once a week's slide deck exists. Weeks without an href render as
// upcoming and are not clickable, so the grid never links to a 404.
const COURSE_WEEKS = [
  {
    week: "WEEK 01",
    title: "Introduction to Consumer Behavior",
    subtitle: "What consumers do, why the field exists, and how consumption shapes identity and markets.",
    href: "/courses/consumer-behavior/week1"
  },
  {
    week: "WEEK 02",
    title: "Perception",
    subtitle: "Sensory thresholds, attention, and how consumers interpret marketing stimuli."
  },
  {
    week: "WEEK 03",
    title: "Learning and Memory",
    subtitle: "Conditioning, observational learning, and how brand associations are stored and retrieved."
  },
  {
    week: "WEEK 04",
    title: "Motivation and Affect",
    subtitle: "Needs, goals, involvement, and the role of emotion in consumption decisions."
  },
  {
    week: "WEEK 05",
    title: "The Self and Identity",
    subtitle: "Self-concept, symbolic consumption, body image, and the extended self."
  },
  {
    week: "WEEK 06",
    title: "Personality, Lifestyles, and Values",
    subtitle: "Trait approaches, psychographics, VALS, and value systems as segmentation bases."
  },
  {
    week: "WEEK 07",
    title: "Attitudes and Persuasion",
    subtitle: "Attitude models, the Elaboration Likelihood Model, and designing persuasive appeals."
  },
  {
    week: "WEEK 08",
    title: "Decision Making",
    subtitle: "Problem recognition, search, evaluation, heuristics, and behavioral biases."
  },
  {
    week: "WEEK 09",
    title: "Buying, Using, and Disposing",
    subtitle: "Situational effects, the shopping experience, satisfaction, and product disposal."
  },
  {
    week: "WEEK 10",
    title: "Group Influence and Social Media",
    subtitle: "Reference groups, conformity, word of mouth, opinion leaders, and online communities."
  },
  {
    week: "WEEK 11",
    title: "Income, Social Class, and Subcultures",
    subtitle: "Status, taste, and how demographic and ethnic subcultures shape consumption."
  },
  {
    week: "WEEK 12",
    title: "Culture and Consumer Ethics",
    subtitle: "Rituals, sacred and profane consumption, cross-cultural differences, and dark-side behaviors."
  }
];

export default function ConsumerBehaviorLanding() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-text",
        { y: 20, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out", stagger: 0.15 }
      );

      gsap.fromTo(
        ".course-card",
        { y: 30, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.4 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen text-[var(--text-primary)] font-body py-24 px-6 md:px-12 lg:px-24">

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto mb-20 text-center">
        <h2 className="hero-text text-label mb-6 tracking-[0.3em] opacity-80 uppercase font-bold text-[var(--accent1)]">Course Curriculum</h2>
        <h1 className="hero-text text-display font-heading font-light mb-8 text-[var(--highlight)] text-5xl md:text-7xl">
          Consumer Behavior
        </h1>
        <p className="hero-text text-body max-w-2xl mx-auto text-[var(--text-secondary)] text-lg md:text-xl font-light leading-relaxed mb-6">
          How people select, buy, use, and dispose of products &mdash; and what perception, memory, identity, and culture reveal about why they do it.
        </p>
        <div className="hero-text flex items-center justify-center space-x-4">
          <div className="text-center">
            <p className="text-[var(--text-primary)] font-accent font-bold text-sm tracking-wider">Davood Wadi, PhD</p>
            <p className="text-[var(--text-muted)] text-xs font-mono mt-1">Lecturer &amp; Course Developer</p>
          </div>
        </div>
      </div>

      {/* Grid of Weeks */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {COURSE_WEEKS.map((week, idx) => {
          const card = (
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-sm p-8 h-full flex flex-col justify-between transition-all duration-500 hover:border-[var(--accent1)] hover:shadow-[0_10px_30px_rgba(var(--accent-rgb),0.15)] relative overflow-hidden">

              {/* Subtle hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--glow)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10">
                <span className="text-label block mb-4 text-[var(--accent1)] font-accent font-bold tracking-widest text-xs">
                  {week.week}
                </span>
                <h3 className="text-h2 font-heading font-bold text-xl md:text-2xl mb-4 text-[var(--text-primary)] transition-colors duration-300">
                  {week.title}
                </h3>
                <p className="text-body text-[var(--text-secondary)] text-sm md:text-base leading-relaxed opacity-80">
                  {week.subtitle}
                </p>
              </div>

              <div className="relative z-10 mt-8 pt-6 border-t border-[var(--border)] flex items-center justify-between">
                <span className="text-[var(--text-muted)] text-xs uppercase tracking-widest font-accent font-bold group-hover:text-[var(--text-primary)] transition-colors duration-300">
                  {week.href ? "Explore Chapter" : "Coming Soon"}
                </span>
                {week.href && (
                  <svg
                    className="w-5 h-5 text-[var(--accent1)] transform group-hover:translate-x-2 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                )}
              </div>
            </div>
          );

          if (!week.href) {
            return (
              <div key={idx} className="course-card block h-full opacity-50 cursor-default">
                {card}
              </div>
            );
          }

          return (
            <Link href={week.href} key={idx} className="course-card block group h-full">
              {card}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
