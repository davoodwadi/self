"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft } from "lucide-react";
import type { CourseQuiz } from "@/lib/course-quiz";
import InlineQuiz from "./InlineQuiz";
import { cn } from "@/lib/utils";

/* ==========================================================================
   BROADSHEET slide system
   --------------------------------------------------------------------------
   Every colour here resolves against the tokens declared in the course's
   globals.css. Nothing is hard-coded, so retheming the course is a matter of
   editing that one palette block.

   Layout principle: content is LEFT-ALIGNED against a single strong margin,
   with hairline rules carrying the structure. Centring is reserved for the
   title slide, where it earns its keep.
   ========================================================================== */

export interface CourseCitation {
  id: number;
  title: string;
  url: string;
}

export interface CitationResolver {
  getCitation?: (id: number) => CourseCitation | undefined;
  getCitations?: (ids: number[]) => CourseCitation[];
  getCitationUrls?: (ids: number[]) => string[];
}

const CitationContext = createContext<CitationResolver | null>(null);
let hasWarnedMissingCitationProvider = false;

export function CitationProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: CitationResolver;
}) {
  return (
    <CitationContext.Provider value={value}>
      {children}
    </CitationContext.Provider>
  );
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ============================================================================
// DECK SHELL
// ============================================================================

/**
 * SlideDeck - Root container for a lecture.
 *
 * Provides the reading rail (progress rule + slide index), the return control,
 * and the scroll-linked reveal animation shared by every child slide.
 *
 * Children are expected to be <Slide> elements; each is handed its position in
 * the deck so it can print its own folio number.
 */
export function SlideDeck({
  children,
  background,
  label,
}: {
  children: React.ReactNode;
  background?: React.ReactNode;
  /** Short deck label shown in the top rail, e.g. "Week 01". */
  label?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(".slide-section");
      sections.forEach((section) => {
        const elements = section.querySelectorAll(".gsap-reveal");
        if (!elements.length) return;

        gsap.fromTo(
          elements,
          { y: 14, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Reading progress for the top rail.
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const pathname = usePathname();
  const router = useRouter();
  const parentPath = pathname.split("/").slice(0, -1).join("/") || "/";

  // Hand each slide its folio number.
  const slides = React.Children.toArray(children).filter(
    React.isValidElement,
  ) as React.ReactElement<SlideProps>[];
  const numbered = slides.map((child, i) =>
    React.cloneElement(child, { __index: i + 1, __total: slides.length }),
  );

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-[var(--paper)] text-[var(--ink-2)] font-[family-name:var(--font-body)]"
    >
      {/* Reading rail */}
      <div className="fixed inset-x-0 top-0 z-50 h-px bg-[var(--rule)]">
        <div
          className="h-full bg-[var(--signal)] origin-left transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-4 md:px-8 md:py-5 mix-blend-multiply">
        <button
          onClick={() => router.push(parentPath)}
          className="group flex items-center gap-2 text-[var(--ink-3)] hover:text-[var(--signal)] transition-colors duration-200"
          aria-label="Back to course contents"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
          <span className="type-caption hidden sm:inline">Contents</span>
        </button>

        {label ? (
          <span className="type-caption text-[var(--ink-3)]">{label}</span>
        ) : null}
      </header>

      {background}

      <div className="relative z-10">{numbered}</div>
    </div>
  );
}

interface SlideProps {
  children: React.ReactNode;
  className?: string;
  border?: boolean;
  id?: string;
  quizData?: CourseQuiz;
  /** Vertical centring. Title slides use "center"; content slides read better left. */
  align?: "left" | "center";
  /** Injected by SlideDeck. */
  __index?: number;
  __total?: number;
}

/**
 * Slide - One section of the lecture.
 *
 * Prints its own folio number in the left margin on wide screens, which gives
 * the deck a sense of place while scrolling.
 */
export function Slide({
  children,
  className = "",
  border = false,
  id,
  quizData,
  align = "left",
  __index,
  __total,
}: SlideProps) {
  return (
    <>
      <section
        id={id}
        className={cn(
          "slide-section relative mx-auto w-full max-w-[var(--slide-max)]",
          "flex flex-col justify-center px-5 md:px-10 lg:px-16",
          "min-h-screen py-[var(--slide-pad-y)]",
          align === "center" ? "items-center text-center" : "items-start",
          border && "border-t border-[var(--rule)]",
          className,
        )}
      >
        {/* Folio — sits in the outer margin on large screens only. */}
        {__index && __index > 1 ? (
          <span
            aria-hidden
            className="type-caption absolute left-5 bottom-8 md:left-10 lg:left-16 select-none text-[var(--ink-3)]/50 tabular-nums"
          >
            {String(__index).padStart(2, "0")}
            <span className="opacity-45">
              {" "}
              / {String(__total).padStart(2, "0")}
            </span>
          </span>
        ) : null}

        <div
          className={cn(
            "w-full",
            align === "center" && "flex flex-col items-center",
          )}
        >
          {children}
        </div>
      </section>

      {/* The quiz follows its slide. It is labelled "Knowledge Check" and every
          week's questions are written against the content of the slide they are
          attached to — week 3 even opens one with "according to the context on
          Information Search". Rendering it ahead of that section asked all
          twelve weeks of students to answer before they had been taught. */}
      {quizData && (
        <div className="mx-auto w-full max-w-[var(--slide-max)] px-5 md:px-10 lg:px-16 py-16 md:py-24">
          <InlineQuiz quizData={quizData} />
        </div>
      )}
    </>
  );
}

// ============================================================================
// LAYOUT
// ============================================================================

/**
 * Row - Responsive horizontal band. Stacks on mobile, splits from md upward.
 */
export function Row({
  children,
  className = "",
  gap = "large",
  items = "stretch",
}: {
  children: React.ReactNode;
  className?: string;
  gap?: "small" | "medium" | "large" | "xlarge";
  items?: "start" | "center" | "end" | "stretch";
}) {
  const gapClass = {
    small: "gap-5",
    medium: "gap-8 lg:gap-12",
    large: "gap-10 lg:gap-16",
    xlarge: "gap-12 lg:gap-24",
  }[gap];

  const itemsClass = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
  }[items];

  return (
    <div
      className={cn(
        "w-full flex flex-col md:flex-row my-10",
        gapClass,
        itemsClass,
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * Column - Width-controlled child of Row.
 *
 * Note: columns align their content to the START by default. Text that is
 * centred inside a two-column split reads as decoration rather than argument.
 */
export function Column({
  children,
  className = "",
  spanRatio = "1/2",
  justify = "start",
  align = "stretch",
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

  const widthClass =
    {
      "1/2": "w-full md:w-1/2",
      "1/3": "w-full md:w-1/3",
      "2/3": "w-full md:w-2/3",
      "1/4": "w-full md:w-1/4",
      "3/4": "w-full md:w-3/4",
      "2/5": "w-full md:w-2/5",
      "3/5": "w-full md:w-3/5",
      full: "w-full",
    }[spanRatio] || "w-full md:w-1/2";

  return (
    <div
      className={cn(
        "flex flex-col min-w-0",
        widthClass,
        justifyClass,
        alignClass,
        className,
      )}
    >
      {children}
    </div>
  );
}

// ============================================================================
// TYPOGRAPHY
// ============================================================================

/** Title - Hero title. One per deck, on the opening slide. */
export function Title({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1 className={cn("gsap-reveal type-display max-w-[18ch] mb-6", className)}>
      {children}
    </h1>
  );
}

/**
 * Heading - Section heading.
 *
 * Sets a hairline rule beneath itself, which is what actually separates
 * sections in this system — not boxes, not shadows.
 */
export function Heading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("gsap-reveal w-full mb-8 md:mb-12", className)}>
      <h2 className="type-h1 max-w-[22ch]">{children}</h2>
      <div className="mt-6 h-px w-full bg-[var(--rule)]" />
    </div>
  );
}

/**
 * Highlight - Emphasis on a key term.
 *
 * Uses colour plus a weighted underline set below the baseline, so emphasis
 * survives being projected or printed in greyscale.
 */
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
        className={cn(
          "text-[var(--signal)] [text-decoration:underline] decoration-[var(--signal-line)]",
          "decoration-[0.08em] underline-offset-[0.14em]",
          className,
        )}
      >
        {children}
      </span>
    </>
  );
}

/** Subtitle - Supporting line under a Title ("hero") or Heading ("section"). */
export function Subtitle({
  children,
  className = "",
  variant = "hero",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "hero" | "section";
}) {
  if (variant === "hero") {
    return (
      <p
        className={cn(
          "gsap-reveal type-label !text-[var(--ink-3)] mt-2",
          className,
        )}
      >
        {children}
      </p>
    );
  }

  return (
    <p
      className={cn(
        "gsap-reveal type-lead max-w-[var(--measure)] -mt-6 mb-10",
        className,
      )}
    >
      {children}
    </p>
  );
}

/**
 * ContentText - Body copy.
 *
 * "prose" is the default running text. "base" is a quieter aside, marked by a
 * rule in the margin rather than a filled box.
 */
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
      ? cn(
          "type-body space-y-5 max-w-[var(--measure)]",
          "[&_strong]:text-[var(--ink)] [&_strong]:font-semibold",
          "[&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2",
          "[&>ul>li::marker]:text-[var(--signal)]",
        )
      : cn(
          "type-body max-w-[var(--measure)]",
          "border-l-2 border-[var(--signal-line)] pl-5 py-1",
        );

  return (
    <div className={cn("text-left w-full", layoutClass, className)}>
      {children}
    </div>
  );
}

/**
 * Tag - Eyebrow label above a heading.
 *
 * Sits in the flow of the slide rather than floating absolutely, so it stays
 * attached to the heading it labels at every viewport height.
 */
export function Tag({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("gsap-reveal flex items-center gap-3 mb-5", className)}>
      <span className="h-px w-7 bg-[var(--signal)]" aria-hidden />
      <span className="type-label">{children}</span>
    </div>
  );
}

/** Citation - Superscript source reference. */
export function Citation({
  ids,
  urls,
  getCitationUrls,
}: {
  ids?: number[];
  urls?: string[];
  getCitationUrls?: (ids: number[]) => string[];
}) {
  const citationResolver = useContext(CitationContext);

  const resolvedCitations =
    ids && citationResolver
      ? citationResolver.getCitations?.(ids) ||
        ids
          .map((id) => citationResolver.getCitation?.(id))
          .filter((citation): citation is CourseCitation => !!citation)
      : [];

  const citationUrls =
    urls ||
    (ids
      ? getCitationUrls?.(ids) ||
        citationResolver?.getCitationUrls?.(ids) ||
        resolvedCitations.map((citation) => citation.url)
      : []);

  if (
    ids &&
    !urls &&
    citationUrls.length === 0 &&
    process.env.NODE_ENV !== "production" &&
    !hasWarnedMissingCitationProvider
  ) {
    hasWarnedMissingCitationProvider = true;
    console.warn(
      "Citation lookup failed. Wrap your course page with CitationProvider and pass local citation helpers.",
    );
  }

  return (
    <>
      {citationUrls.map((url, index) => {
        const citationId =
          resolvedCitations[index]?.id || ids?.[index] || index + 1;
        return (
          <sup
            key={index}
            className="ml-0.5 font-[family-name:var(--font-label)] text-[0.6em]"
          >
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--signal)] hover:underline"
              title={resolvedCitations[index]?.title}
              aria-label={resolvedCitations[index]?.title}
            >
              [{citationId}]
            </a>
          </sup>
        );
      })}
    </>
  );
}

// ============================================================================
// CONTAINERS
// ============================================================================

/**
 * Card - A bounded block of related content.
 *
 * Flat on the paper: hairline border, tinted ground, a single signal rule at
 * the top edge. No drop shadows — nothing in this system floats.
 */
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
      className={cn(
        "flex flex-col h-full p-6 md:p-7",
        "bg-[var(--paper-2)] border border-[var(--rule)] border-t-2 border-t-[var(--signal)]",
        className,
      )}
    >
      {title ? <h4 className="type-label mb-2">{title}</h4> : null}
      {subtitle ? <p className="type-caption mb-4">{subtitle}</p> : null}
      <div className="flex-1 type-body text-[var(--ink-2)]">{children}</div>
    </div>
  );
}

/** ContentTitle - Sub-heading inside a Card or block. */
export function ContentTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <h3 className={cn("type-h2 mb-2.5", className)}>{children}</h3>;
}

/** ContentDescription - Supporting copy beneath a ContentTitle. */
export function ContentDescription({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="type-body">{children}</div>;
}

/**
 * Callout - Emphasised aside.
 *
 * "primary" carries the signal colour for the argument being made;
 * "secondary" uses the cool counterweight for caveats and contrasts.
 */
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

  return (
    <div
      className={cn(
        "gsap-reveal w-full p-6 md:p-7 border-l-2",
        isPrimary
          ? "border-[var(--signal)] bg-[var(--signal-tint)]"
          : "border-[var(--counter)] bg-[var(--counter-tint)]",
        className,
      )}
    >
      <h4
        className={cn(
          "type-label mb-3",
          !isPrimary && "!text-[var(--counter)]",
        )}
      >
        {title}
      </h4>
      <div className="type-lead !text-[var(--ink-2)]">{children}</div>
    </div>
  );
}

/**
 * DiscussionCard - Click-to-reveal prompt.
 *
 * Previously this set a border colour but never a border width, so no border
 * ever rendered, and a fixed 500px floor left most prompts swimming in space.
 */
export function DiscussionCard({
  title = "Discussion",
  children,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setIsRevealed((v) => !v)}
      aria-expanded={isRevealed}
      className={cn(
        "gsap-reveal group relative w-full max-w-4xl text-left",
        "border-2 border-[var(--counter)]/35 bg-[var(--counter-tint)]",
        "p-8 md:p-12 cursor-pointer transition-colors duration-300",
        "hover:border-[var(--counter)]/70",
        className,
      )}
    >
      {/* The prompt is always in the document; it is blurred rather than
          removed, so the panel is sized by its real content and the reader can
          see that a question is waiting. */}
      <div
        className={cn(
          "transition-all duration-500 ease-out",
          isRevealed
            ? "opacity-100 blur-none"
            : "opacity-30 blur-[7px] select-none",
        )}
      >
        <span className="type-label !text-[var(--counter)] block mb-5">
          {title}
        </span>
        <div className="type-quote !text-[var(--ink)] max-w-[30ch] md:max-w-[38ch]">
          {children}
        </div>
      </div>

      {/* Reveal affordance */}
      <div
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center gap-3",
          "transition-opacity duration-300",
          isRevealed ? "opacity-0 pointer-events-none" : "opacity-100",
        )}
      ></div>
    </button>
  );
}

// ============================================================================
// MEDIA & DATA
// ============================================================================

/**
 * Figure - Framed well for a diagram, flow chart or embedded visual.
 *
 * Use this instead of hand-rolling a `bg-white/80` div: it inherits the paper
 * tint so diagrams sit on the page rather than punching a hole in it.
 */
export function Figure({
  children,
  caption,
  height = "md",
  className = "",
}: {
  children: React.ReactNode;
  caption?: string;
  /** "auto" lets the child set its own height — use it for scaling SVG. */
  height?: "sm" | "md" | "lg" | "auto";
  className?: string;
}) {
  const heightClass = {
    sm: "h-[260px] sm:h-[300px]",
    md: "h-[320px] sm:h-[360px] md:h-[400px]",
    lg: "h-[380px] sm:h-[440px] md:h-[520px]",
    auto: "h-auto p-5 sm:p-7 md:p-9",
  }[height];

  // Auto-height figures hold drawn plates whose labels are sized for the
  // 800-unit viewBox. Letting those shrink to a 340px phone renders the
  // annotation at about 5px, so the plate keeps a legible minimum width and
  // the well scrolls instead. On anything above ~700px this is inert.
  const isPlate = height === "auto";

  return (
    <figure className={cn("gsap-reveal w-full my-10", className)}>
      <div
        className={cn(
          "figure-well w-full",
          isPlate ? "overflow-x-auto" : "overflow-hidden",
          heightClass,
        )}
      >
        {isPlate ? <div className="min-w-[680px]">{children}</div> : children}
      </div>
      {caption ? (
        <figcaption className="type-caption mt-3">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

/** MediaBlock - Image with optional caption. */
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
    <figure className={cn("gsap-reveal w-full", className)}>
      <div className="relative w-full aspect-video overflow-hidden figure-well">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      {caption && (
        <figcaption className="type-caption mt-3">{caption}</figcaption>
      )}
    </figure>
  );
}

/**
 * Quote - Pull quote.
 *
 * The opening mark hangs into the left margin so the first character of the
 * quotation optically aligns with the text above it.
 */
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
    <blockquote className={cn("gsap-reveal w-full my-8", className)}>
      <div className="h-px w-12 bg-[var(--signal)] mb-6" aria-hidden />
      <p className="type-quote quote-hang max-w-[24ch]">
        &ldquo;{children}&rdquo;
      </p>
      {author && (
        <footer className="mt-6 type-caption">
          {author}
          {role && <span className="block opacity-70 mt-0.5">{role}</span>}
        </footer>
      )}
    </blockquote>
  );
}

/** Metric - A single large figure with its label. */
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
      className={cn(
        "gsap-reveal flex flex-col justify-center h-full p-6 md:p-7",
        "border-t-2 border-t-[var(--signal)] bg-[var(--paper-2)]",
        className,
      )}
    >
      <div className="type-h1 !text-[var(--signal)] tabular-nums mb-2">
        {value}
      </div>
      <div className="type-caption">{label}</div>
    </div>
  );
}

// ============================================================================
// LISTS
// ============================================================================

/**
 * AnimatedList - Stack of points.
 *
 * The old version wrapped everything in a heavy left border. Here the rule is
 * carried by each item's marker instead, so nested lists don't compound.
 */
export function AnimatedList({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "text-left w-full space-y-4 max-w-[var(--measure)]",
        className,
      )}
    >
      {children}
    </ul>
  );
}

/** ListItem - One point, marked by a short signal rule. */
export function ListItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <li
      className={cn(
        "gsap-reveal grid grid-cols-[1.75rem_1fr] items-baseline type-body",
        className,
      )}
    >
      <span
        aria-hidden
        className="relative top-[-0.3em] h-px w-3.5 bg-[var(--signal)]"
      />
      <span>{children}</span>
    </li>
  );
}

// ============================================================================
// CHARTS
// ============================================================================

/** PieChart - Proportional breakdown with legend. */
export function PieChart({
  data,
  title,
  caption,
  size = 300,
  className = "",
}: {
  data: Array<{ label: string; value: number; color?: string }>;
  title?: string;
  caption?: string;
  size?: number;
  className?: string;
}) {
  const colors = [
    "var(--signal)",
    "var(--counter)",
    "var(--ink)",
    "var(--signal-deep)",
    "var(--counter-deep)",
    "var(--ink-3)",
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = -90;

  const segments = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    const radius = size / 2 - 20;
    const centerX = size / 2;
    const centerY = size / 2;

    // toFixed(4) keeps server and browser trig output byte-identical, which
    // prevents a hydration mismatch on these path strings.
    const x1 = (centerX + radius * Math.cos(startRad)).toFixed(4);
    const y1 = (centerY + radius * Math.sin(startRad)).toFixed(4);
    const x2 = (centerX + radius * Math.cos(endRad)).toFixed(4);
    const y2 = (centerY + radius * Math.sin(endRad)).toFixed(4);

    const largeArc = angle > 180 ? 1 : 0;
    const path = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

    currentAngle = endAngle;

    return {
      ...item,
      path,
      percentage,
      color: item.color || colors[index % colors.length],
    };
  });

  return (
    <div className={cn("w-full", className)}>
      {title && <h4 className="gsap-reveal type-h2 mb-6">{title}</h4>}

      <div className="gsap-reveal flex flex-col md:flex-row items-center gap-10">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="flex-shrink-0 max-w-full h-auto"
          role="img"
          aria-label={title || "Pie chart"}
        >
          {segments.map((segment, index) => (
            <path
              key={index}
              d={segment.path}
              fill={segment.color}
              stroke="var(--paper)"
              strokeWidth={1.5}
              className="transition-opacity duration-200 hover:opacity-80"
              aria-label={`${segment.label}: ${segment.percentage.toFixed(1)}%`}
            />
          ))}
        </svg>

        <ul className="flex flex-col gap-4 w-full">
          {segments.map((segment, index) => (
            <li key={index} className="flex items-baseline gap-3">
              <span
                aria-hidden
                className="w-3 h-3 flex-shrink-0 translate-y-0.5"
                style={{ backgroundColor: segment.color }}
              />
              <span className="flex-1 type-body !text-[var(--ink)]">
                {segment.label}
              </span>
              <span className="type-caption tabular-nums">
                {segment.percentage.toFixed(0)}%
              </span>
            </li>
          ))}
        </ul>
      </div>

      {caption && <p className="gsap-reveal type-caption mt-6">{caption}</p>}
    </div>
  );
}
