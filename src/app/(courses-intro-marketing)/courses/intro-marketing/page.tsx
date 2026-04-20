"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const COURSE_WEEKS = [
  {
    week: "WEEK 01",
    title: "Introduction & The Marketing Process",
    subtitle: "Understanding core concepts: needs, wants, and how firms create customer value.",
    href: "/courses/intro-marketing/week1"
  },
  {
    week: "WEEK 02",
    title: "The Marketing Environment & Ethics",
    subtitle: "Analyzing micro/macro environments and the role of corporate social responsibility.",
    href: "/courses/intro-marketing/week2"
  },
  {
    week: "WEEK 03",
    title: "Consumer Behavior",
    subtitle: "Psychological, social, and cultural influences driving consumer decision-making.",
    href: "/courses/intro-marketing/week3"
  },
  {
    week: "WEEK 04",
    title: "Business-to-Business (B2B) Marketing",
    subtitle: "Organizational buying behaviors, relationship marketing, and B2B dynamics.",
    href: "/courses/intro-marketing/week4"
  },
  {
    week: "WEEK 05",
    title: "Marketing Research & Analytics",
    subtitle: "Gathering primary/secondary data and leveraging analytics for strategic insights.",
    href: "/courses/intro-marketing/week5"
  },
  {
    week: "WEEK 06",
    title: "Segmentation, Targeting, and Positioning (STP)",
    subtitle: "Identifying profitable segments and crafting compelling value propositions.",
    href: "/courses/intro-marketing/week6"
  },
  {
    week: "WEEK 07",
    title: "Product and Service Strategies",
    subtitle: "The Product Life Cycle, branding, and new product development.",
    href: "/courses/intro-marketing/week7"
  },
  {
    week: "WEEK 08",
    title: "Pricing Strategies",
    subtitle: "Value-based pricing, cost constraints, and strategies for new offerings.",
    href: "/courses/intro-marketing/week8"
  },
  {
    week: "WEEK 09",
    title: "Distribution Channels (Place)",
    subtitle: "Supply chain management, retail logistics, and optimizing channel behavior.",
    href: "/courses/intro-marketing/week9"
  },
  {
    week: "WEEK 10",
    title: "Integrated Marketing Communications",
    subtitle: "Balancing Advertising, PR, Sales Promotion, and Personal Selling.",
    href: "/courses/intro-marketing/week10"
  },
  {
    week: "WEEK 11",
    title: "Digital & Social Media Marketing",
    subtitle: "SEO, content marketing, and building digital engagement architectures.",
    href: "/courses/intro-marketing/week11"
  },
  {
    week: "WEEK 12",
    title: "Global Marketing & Future Trends",
    subtitle: "Market entry strategies, globalization, AI in marketing, and sustainability.",
    href: "/courses/intro-marketing/week12"
  }
];

export default function IntroMarketingLanding() {
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
          Introduction to Marketing
        </h1>
        <p className="hero-text text-body max-w-2xl mx-auto text-[var(--text-secondary)] text-lg md:text-xl font-light leading-relaxed mb-6">
          Explore the strategic frameworks, consumer behaviors, and digital innovations that drive modern value creation and market success.
        </p>
        <div className="hero-text flex items-center justify-center space-x-4">
          <div className="text-center">
            <p className="text-[var(--text-primary)] font-accent font-bold text-sm tracking-wider">Davood Wadi, PhD</p>
            <p className="text-[var(--text-muted)] text-xs font-mono mt-1">Lecturer & Course Developer</p>
          </div>
        </div>
      </div>

      {/* Grid of Weeks */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {COURSE_WEEKS.map((week, idx) => (
          <Link href={week.href} key={idx} className="course-card block group h-full">
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