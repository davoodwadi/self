"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowLeft, CircleSmall } from "lucide-react";

// Slides
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
        href="/courses"
        className="fixed top-8 left-8 z-50 flex items-center justify-center w-12 h-12 text-[var(--charcoal-light)] hover:text-[var(--crimson)] hover:border-[var(--crimson)] hover:bg-[var(--crimson)]/5 transition-colors duration-300 group "
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
  border = false,
}: {
  children: React.ReactNode;
  className?: string;
  border?: boolean;
}) {
  return (
    <section
      className={`slide-section relative min-h-screen flex flex-col items-center text-center justify-center py-20 ${border ? "border-t border-[var(--charcoal)]/10" : ""} ${className}`}
    >
      {children}
    </section>
  );
}

// === Layout Wrappers & Utilities ===

export function Row({
  children,
  className = "",
  gap = "large",
  items = "start",
}: {
  children: React.ReactNode;
  className?: string;
  gap?: "small" | "medium" | "large" | "xlarge";
  items?: "start" | "center" | "end" | "stretch";
}) {
  const gapClass = {
    small: "gap-4",
    medium: "gap-8",
    large: "gap-12 lg:gap-24",
    xlarge: "gap-16 lg:gap-32",
  }[gap];

  const itemsClass = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
  }[items];

  // Map column count to Tailwind grid classes or flex basis if we stick to flex.
  // The original component used flex, but standard Grids are usually CSS grid.
  // Let's use CSS grid for a true grid if columns are specified.
  const flexClass = `flex flex-col md:flex-row`;

  return (
    <div
      className={`w-full ${flexClass} ${gapClass} ${itemsClass} ${className}`}
    >
      {children}
    </div>
  );
}

export function Column({
  children,
  className = "",
  spanRatio = "1/2",
  justify = "center",
  align = "center",
}: {
  children: React.ReactNode;
  className?: string;
  spanRatio?: string;
  justify?: "start" | "center" | "end" | "between";
  align?: "start" | "center" | "end" | "stretch";
}) {
  const justifyClass = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
  }[justify];

  const alignClass = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
  }[align];

  // Support both old spanRatio and new span
  // const widthClass = `basis-${spanRatio}`;
  // const widthClass = `md:w-${spanRatio}`;
  const widthClass =
    {
      "1/2": "w-full md:w-1/2",
      "1/3": "w-full md:w-1/3",
      "2/3": "w-full md:w-2/3",
      "1/4": "w-full md:w-1/4",
      "3/4": "w-full md:w-3/4",
      full: "w-full",
    }[spanRatio] || "w-full md:w-1/2"; // fallback
  return (
    <div className={`${widthClass} ${justifyClass} ${alignClass} ${className}`}>
      {children}
    </div>
  );
}

// === Typography Elements ===

export function Title({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={`gsap-reveal text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight mb-6 text-[var(--charcoal)] font-serif ${className}`}
    >
      {children}
    </h1>
  );
}

export function Heading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`gsap-reveal mb-8 ${className}`}>
      <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-[var(--charcoal)] font-serif">
        {children}
      </h2>
    </div>
  );
}

export function Highlight({
  children,
  className = "",
  block = false,
}: {
  children: React.ReactNode;
  className?: string;
  block?: boolean;
}) {
  return (
    <>
      {block && <br />}
      <span
        className={`${block ? "text-[var(--crimson)]" : "text-transparent bg-clip-text bg-gradient-to-r from-[var(--crimson)] to-[var(--crimson-light)]"} ${className}`}
      >
        {children}
      </span>
    </>
  );
}

export function Subtitle({
  children,
  className = "",
  variant = "hero",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "hero" | "section";
}) {
  const baseClass =
    "text-[var(--charcoal-light)] font-light italic leading-relaxed max-w-4xl";
  const variantClass =
    variant === "hero"
      ? "gsap-reveal text-xl md:text-3xl"
      : "text-xl md:text-2xl -mt-4 mb-12 border-b-2";

  return (
    <p className={`${baseClass} ${variantClass} ${className}`}>{children}</p>
  );
}

export function ContentText({
  children,
  className = "",
  layout = "prose",
}: {
  children: React.ReactNode;
  className?: string;
  layout?: "prose" | "base";
}) {
  const layoutClass =
    layout === "prose"
      ? "mt-8 text-xl md:text-2xl text-[var(--charcoal-light)] font-light leading-relaxed space-y-6 [&>p>strong]:text-[var(--crimson)] [&>p>strong]:font-semibold [&>ul]:list-disc [&>ul]:pl-6 [&>ul>li::marker]:text-[var(--crimson)]"
      : "text-xl md:text-2xl text-[var(--charcoal-light)] font-light leading-relaxed mb-4 border-l-4 border-[var(--crimson)]/20 pl-6 py-2";

  return (
    <div className={`text-left w-full ${layoutClass} ${className}`}>
      {children}
    </div>
  );
}

export function Tag({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`gsap-reveal absolute top-12 left-1/2 -translate-x-1/2 text-[var(--charcoal-light)] text-xs md:text-sm font-bold tracking-[0.2em] uppercase ${className}`}
    >
      {children}
    </div>
  );
}

// === Interactive / Card Elements ===

export function Card({
  title,
  subtitle,
  children,
  className = "",
}: {
  title?: string;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`p-8 my-8 shadow-sm border-t-2 border-t-[var(--crimson)] ${className}`}
    >
      {title ? (
        <h4 className="font-bold text-[var(--crimson)] mb-2 uppercase tracking-wider text-sm">
          {title}
        </h4>
      ) : null}

      {subtitle ? (
        <p className="text-[var(--charcoal-light)] text-sm mb-4">{subtitle}</p>
      ) : null}
      <div className="text-xl text-[var(--charcoal)] font-medium leading-relaxed">
        {children}
      </div>
    </div>
  );
}

export function ContentTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-2xl font-bold mb-3 text-[var(--charcoal)]">
      {children}
    </h3>
  );
}
export function ContentDescription({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="text-[var(--charcoal-light)] font-light leading-relaxed text-lg">
      {children}
    </div>
  );
}

export function DiscussionCard({
  title = "Discussion Prompt",
  children,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [isRevealed, setIsRevealed] = React.useState(false);

  return (
    <div
      onClick={() => setIsRevealed(!isRevealed)}
      className={`gsap-reveal relative p-8 min-h-[500px] flex flex-col justify-center shadow-[0_10px_30px_rgba(0,0,0,0.05)] overflow-hidden cursor-pointer transition-colors duration-500 hover:border-[var(--gold)] hover:bg-[var(--gold)]/5 ${isRevealed ? "border-[var(--gold)]/50" : "border-[var(--charcoal)]/10"} ${className}`}
    >
      {/* Default State Content (Overlay) */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 z-10 ${isRevealed ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"}`}
      >
        <div className="w-12 h-12 rounded-full border border-[var(--gold)]/30 flex items-center justify-center mb-4 text-[var(--gold)] animate-pulse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
            />
          </svg>
        </div>
        <h3 className="text-[var(--gold)] font-semibold tracking-widest uppercase text-lg mb-2 text-center">
          {title}
        </h3>
      </div>

      {/* Hover Reveal Content (Maintains Height) */}
      <div
        className={`transition-all duration-700 ease-out ${isRevealed ? "opacity-100 scale-100 blur-none" : "opacity-0 scale-95 filter blur-md"}`}
      >
        <h3 className="text-[var(--gold)] font-semibold mb-4 tracking-wider uppercase text-sm">
          {title}
        </h3>
        <div className="text-xl md:text-2xl font-medium leading-snug text-[var(--charcoal)]">
          {children}
        </div>
      </div>
    </div>
  );
}

// === Media & Data Display ===

export function MediaBlock({
  src,
  alt,
  caption,
  className = "",
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}) {
  return (
    <figure
      className={`gsap-reveal w-full overflow-hidden shadow-lg border border-[var(--charcoal)]/5 bg-[var(--surface)] ${className}`}
    >
      <div className="relative w-full aspect-video bg-[var(--charcoal)]/5">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      {caption && (
        <figcaption className="p-4 text-center text-sm md:text-base text-[var(--charcoal-light)]/80 italic border-t border-[var(--charcoal)]/5">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function Quote({
  children,
  author,
  role,
  className = "",
}: {
  children: React.ReactNode;
  author?: string;
  role?: string;
  className?: string;
}) {
  return (
    <blockquote
      className={`gsap-reveal my-12 border-l-4 border-[var(--crimson)] pl-8 py-2 ${className}`}
    >
      <p className="text-3xl md:text-4xl lg:text-5xl font-serif text-[var(--charcoal)] leading-snug italic mb-6">
        "{children}"
      </p>
      {author && (
        <footer className="text-lg md:text-xl text-[var(--charcoal-light)] font-medium">
          — {author}
          {role && (
            <span className="block text-base md:text-lg text-[var(--charcoal-light)]/70 font-light mt-1">
              {role}
            </span>
          )}
        </footer>
      )}
    </blockquote>
  );
}

export function Metric({
  value,
  label,
  className = "",
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`gsap-reveal flex flex-col items-center justify-center p-8 border border-[var(--gold)]/20 bg-[var(--gold)]/5 ${className}`}
    >
      <div className="text-6xl md:text-8xl font-black font-serif text-[var(--crimson)] mb-4 tracking-tighter">
        {value}
      </div>
      <div className="text-xl md:text-2xl font-medium tracking-wide text-[var(--charcoal)] text-center uppercase">
        {label}
      </div>
    </div>
  );
}

export function Callout({
  title = "Key Takeaway",
  children,
  className = "",
  variant = "primary",
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
}) {
  const isPrimary = variant === "primary";
  const bgClass = isPrimary
    ? "bg-[var(--crimson)]/5"
    : "bg-[var(--charcoal)]/5";
  const borderClass = isPrimary
    ? "border-[var(--crimson)]"
    : "border-[var(--charcoal)]/30";
  const titleColor = isPrimary
    ? "text-[var(--crimson)]"
    : "text-[var(--charcoal)]";

  return (
    <div
      className={`gsap-reveal p-8 my-4 border-l-4 ${borderClass} ${bgClass} ${className}`}
    >
      <h4
        className={`text-sm md:text-base font-bold tracking-[0.2em] uppercase mb-4 ${titleColor}`}
      >
        {title}
      </h4>
      <div className="text-xl md:text-2xl font-light leading-relaxed text-[var(--charcoal-light)]">
        {children}
      </div>
    </div>
  );
}

// === Lists ===

export function AnimatedList({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <ul
      className={`text-left w-full space-y-6 p-4 border-l-2 border-l-[var(--crimson)] ${className}`}
    >
      {children}
    </ul>
  );
}

export function ListItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <li
      className={`gsap-reveal flex items-start text-xl md:text-2xl text-[var(--charcoal-light)] font-light leading-relaxed ${className}`}
    >
      <span className="text-[var(--crimson)] mr-4 mt-2.5 flex-shrink-0">
        <CircleSmall />
      </span>
      <div>{children}</div>
    </li>
  );
}
