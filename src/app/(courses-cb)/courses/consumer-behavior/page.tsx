"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const COURSE_WEEKS = [
  {
    title: "Introduction to Consumer Behavior",
    blurb:
      "Why people buy, use, and discard products. You will study the three stages of consumption and see why businesses fail when they treat buyers as cold calculators.",
    href: "/courses/consumer-behavior/week1",
  },
  {
    title: "Perception & Sensory Marketing",
    blurb:
      "Sight, sound, smell, touch, and taste shape what we notice. You will explore sensory thresholds, Weber's law, and how marketers guide attention through sensory cues.",
    href: "/courses/consumer-behavior/week2",
  },
  {
    title: "Learning & Memory",
    blurb:
      "Conditioning creates consumer habits. Memory stores brand associations. Learn how brand cues help buyers retrieve products from memory when shopping.",
    href: "/courses/consumer-behavior/week3",
  },
  {
    title: "Motivation, Needs & Values",
    blurb:
      "All buying begins with an unsatisfied drive. Learn Maslow's hierarchy in everyday markets, three types of motivational conflicts, and why involvement changes consumer effort.",
    href: "/courses/consumer-behavior/week4",
  },
  {
    title: "Personality, Self-Concept & Lifestyles",
    blurb:
      "People buy goods to express who they are or who they want to become. You will examine the actual versus ideal self, brand personality, and lifestyle psychographics.",
    href: "/courses/consumer-behavior/week5",
  },
  {
    title: "Attitudes & Persuasion",
    blurb:
      "Attitudes combine thoughts, feelings, and actions. You will study how consumers form opinions, what makes a spokesperson believable, and how message framing changes choices.",
    href: "/courses/consumer-behavior/week6",
  },
  {
    title: "Consumer Decision-Making Process",
    blurb:
      "The classic five steps: need recognition, search, alternative evaluation, purchase, and post-purchase. Learn why most everyday decisions skip steps to save time.",
    href: "/courses/consumer-behavior/week7",
  },
  {
    title: "Behavioral Economics, Heuristics & Biases",
    blurb:
      "Human brains take shortcuts. Explore System 1 and System 2 thinking, anchoring, loss aversion, status quo bias, and how choice architecture nudges consumer decisions.",
    href: "/courses/consumer-behavior/week8",
  },
  {
    title: "Post-Purchase Behavior, Satisfaction & Loyalty",
    blurb:
      "The sale is not the end. Understand cognitive dissonance, buyer's remorse, product disposal, and what builds genuine brand loyalty instead of habit.",
    href: "/courses/consumer-behavior/week9",
  },
  {
    title: "Social Influences & Reference Groups",
    blurb:
      "People look to peers before choosing. Discover aspirational and dissociative groups, word-of-mouth dynamics, and how influencers create social proof.",
    href: "/courses/consumer-behavior/week10",
  },
  {
    title: "Culture, Subcultures & Social Class",
    blurb:
      "Culture sets the unspoken rules of consumption. Explore cultural rituals, generational subcultures, and how social class shapes status signals and buying habits.",
    href: "/courses/consumer-behavior/week11",
  },
  {
    title: "Digital Consumption & Future Trends",
    blurb:
      "Algorithms, AI shopping assistants, and social commerce change how consumers discover products. The week concludes with privacy, dark patterns, and sustainability.",
    href: "/courses/consumer-behavior/week12",
  },
];

export default function ConsumerBehaviorLanding() {
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
        {/* Masthead */}
        <header className="pt-24 pb-16 md:pt-36 md:pb-24">
          <div className="masthead-item flex items-center gap-3 mb-8">
            <span className="h-px w-7 bg-[var(--signal)]" aria-hidden />
            <span className="type-label">Undergraduate · 12 weeks</span>
          </div>

          <h1 className="masthead-item type-display max-w-[14ch]">
            Consumer Behavior
          </h1>

          <p className="masthead-item type-lead mt-8 max-w-[52ch]">
            Why do people buy what they buy? This course explores the
            psychological, social, and cultural forces behind consumer
            decisions. You will study how people perceive products, form
            attitudes, take mental shortcuts, and interact with brands in modern
            markets.
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
                Interactive lecture decks &amp; case discussions
              </div>
            </div>
          </div>
        </header>

        {/* Index List */}
        <nav aria-label="Course weeks" className="index-list pb-32">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="type-label">Curriculum Index</h2>
            <span className="type-caption">Twelve sessions</span>
          </div>

          <ul className="border-t border-[var(--rule)]">
            {COURSE_WEEKS.map((week, idx) => (
              <li
                key={week.title}
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
