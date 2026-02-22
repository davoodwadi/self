"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SlideDeck({ children, background }: { children: React.ReactNode, background?: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // General staggered animation for all slides using .gsap-reveal
      const sections = gsap.utils.toArray<HTMLElement>('.slide-section');
      sections.forEach((section) => {
        const elements = section.querySelectorAll('.gsap-reveal');
        if (elements.length > 0) {
          gsap.fromTo(elements, 
            { y: 60, opacity: 0, filter: "blur(10px)" },
            {
              y: 0, opacity: 1, filter: "blur(0px)",
              duration: 1.2, stagger: 0.15, ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 75%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative bg-neutral-950 text-neutral-50 font-sans tracking-wide overflow-hidden min-h-screen selection:bg-indigo-500 selection:text-white">
      {/* Navigation */}
      <Link href="/" className="fixed top-8 left-8 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-transparent border border-white/10 backdrop-blur-sm text-neutral-400 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all group shadow-lg" aria-label="Back to Course Hub">
        <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
      </Link>

      {background}

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12">
        {children}
      </div>
    </div>
  );
}

export function Slide({ children, className = "", border = true }: { children: React.ReactNode, className?: string, border?: boolean }) {
  return (
    <section className={`slide-section min-h-screen flex flex-col justify-center py-20 ${border ? 'border-t border-white/5' : ''} ${className}`}>
      {children}
    </section>
  );
}