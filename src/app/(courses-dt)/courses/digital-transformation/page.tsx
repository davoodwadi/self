"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const COURSE_WEEKS = [
  {
    week: "WEEK 01",
    title: "Introduction to Digital Transformation",
    subtitle: "Fundamentally changing how businesses operate and deliver value to customers by integrating digital technology into all areas.",
    href: "/courses/digital-transformation/week-1"
  },
  {
    week: "WEEK 02",
    title: "Big Data, Porter's Value Chain, and Socio-Technical Systems",
    subtitle: "Exploring data structures, Big Data concepts, and organizational frameworks.",
    href: "/courses/digital-transformation/week-2"
  },
  {
    week: "WEEK 03",
    title: "Change Management & Agile Methodologies",
    subtitle: "Exploring data-driven strategies, frameworks for organizational change, and iterative agile processes like Scrum.",
    href: "/courses/digital-transformation/week-3"
  },
  {
    week: "WEEK 04",
    title: "Technology Acceptance Models & Emerging Paradigms",
    subtitle: "Understanding TAM, UTAUT, IoT, Cloud, Edge, and Fog Computing",
    href: "/courses/digital-transformation/week-4"
  },
  {
    week: "WEEK 05",
    title: "Cloud, Fog, and Edge Computing",
    subtitle: "Understanding modern computing infrastructures and service models",
    href: "/courses/digital-transformation/week-5"
  },
  {
    week: "WEEK 06",
    title: "AI & Machine Learning",
    subtitle: "Understanding Intelligence, ML Algorithms, and Learning Paradigms",
    href: "/courses/digital-transformation/week-6"
  },
  {
    week: "WEEK 07",
    title: "Blockchain Technology",
    subtitle: "Exploring Blockchain, Smart Contracts, and Business Applications",
    href: "/courses/digital-transformation/week-7"
  },
  {
    week: "WEEK 08",
    title: "Immersive Technologies & Gamification",
    subtitle: "Exploring AR, VR, Game Mechanics, and Their Ethical Implications in Business",
    href: "/courses/digital-transformation/week-8"
  },
  {
    week: "WEEK 09",
    title: "Industry 4.0",
    subtitle: "From the First Industrial Revolution to the Digital Age",
    href: "/courses/digital-transformation/week-9"
  },
  {
    week: "WEEK 10",
    title: "Cyber Security, Ethics and Social Issues",
    subtitle: "Navigating the complex landscape of digital transformation risks, ethical AI, and environmental impacts.",
    href: "/courses/digital-transformation/week-10"
  }
];

export default function DigitalTransformationLanding() {
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
    <div ref={containerRef} className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] font-body py-24 px-6 md:px-12 lg:px-24">
      
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto mb-20 text-center">
        <h2 className="hero-text text-label mb-6 tracking-[0.3em] opacity-80">Course Curriculum</h2>
        <h1 className="hero-text text-display font-heading font-light mb-8 text-[var(--highlight)]">
          Digital Transformation
        </h1>
        <p className="hero-text text-body max-w-2xl mx-auto text-[var(--text-secondary)] text-lg md:text-xl font-light leading-relaxed">
          The intersection of business strategy, human systems, and emerging technologies. 
          A ten-week course from foundations to the future of industry.
        </p>
      </div>

      {/* Grid of Weeks */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {COURSE_WEEKS.map((week, idx) => (
          <Link href={week.href} key={idx} className="course-card block group h-full">
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-sm p-8 h-full flex flex-col justify-between transition-all duration-500 hover:border-[var(--accent1)] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(229,9,20,0.15)] relative overflow-hidden">
              
              {/* Subtle hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--glow)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10">
                <span className="text-label block mb-4 text-[var(--accent1)] font-accent font-bold">
                  {week.week}
                </span>
                <h3 className="text-h2 font-heading mb-4 text-[var(--text-primary)] transition-colors duration-300">
                  {week.title}
                </h3>
                <p className="text-body text-[var(--text-secondary)] text-sm md:text-base leading-relaxed opacity-80">
                  {week.subtitle}
                </p>
              </div>

              <div className="relative z-10 mt-8 pt-6 border-t border-[var(--border)] flex items-center justify-between">
                <span className="text-[var(--text-muted)] text-xs uppercase tracking-widest font-accent group-hover:text-[var(--text-primary)] transition-colors duration-300">
                  Explore Chapter
                </span>
                <svg 
                  className="w-5 h-5 text-[var(--accent1)] transform group-hover:translate-x-2 transition-transform duration-300" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
