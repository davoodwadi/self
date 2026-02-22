"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SlideDeck({
  children,
  background,
}: {
  children: React.ReactNode;
  background?: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // General staggered animation for all slides using .gsap-reveal
      const sections = gsap.utils.toArray<HTMLElement>(".slide-section");
      sections.forEach((section) => {
        const elements = section.querySelectorAll(".gsap-reveal");
        if (elements.length > 0) {
          gsap.fromTo(
            elements,
            { y: 60, opacity: 0, filter: "blur(10px)" },
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 1.2,
              stagger: 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 75%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative bg-[var(--background)] text-[var(--charcoal-light)] font-sans tracking-wide overflow-hidden min-h-screen selection:bg-[var(--crimson)] selection:text-[var(--surface)]"
    >
      {/* Navigation */}
      <Link
        href="/"
        className="fixed top-8 left-8 z-50 flex items-center justify-center w-12 h-12 text-[var(--charcoal-light)] hover:text-[var(--crimson)] hover:border-[var(--crimson)] hover:bg-[var(--crimson)]/5 transition-colors duration-300 group shadow-sm"
        aria-label="Back to Course Hub"
      >
        <ArrowLeft className="w-5 h-5" />
      </Link>

      {background}

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12">
        {children}
      </div>
    </div>
  );
}

export function Slide({
  children,
  className = "",
  border = true,
}: {
  children: React.ReactNode;
  className?: string;
  border?: boolean;
}) {
  return (
    <section
      className={`slide-section min-h-screen flex flex-col justify-center py-20 ${border ? "border-t border-[var(--charcoal)]/10" : ""} ${className}`}
    >
      {children}
    </section>
  );
}
