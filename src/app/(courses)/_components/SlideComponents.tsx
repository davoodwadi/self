"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowLeft, CircleSmall } from "lucide-react";

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

// ============================================================================
// SLIDE STRUCTURE COMPONENTS
// ============================================================================
// These components form the backbone of the slide deck layout and animations

/**
 * SlideDeck - Root container for cinematic slide presentations
 *
 * PURPOSE:
 * - Wraps entire slide presentation and applies global animations
 * - Manages GSAP animations for all child slides and reveal elements
 * - Provides navigation back to course hub
 * - Applies consistent styling and dark theme
 *
 * WHEN TO USE:
 * - Required as the outermost wrapper for every course page
 * - Use once per page.tsx
 * - Wraps all Slide components
 *
 * ANIMATION BEHAVIOR:
 * - Automatically animates elements with .gsap-reveal class
 * - Staggered fade-in on scroll (y: 60 to 0, opacity 0 to 1, blur offset)
 * - Triggers when section comes into view (75% of viewport)
 *
 * PROPS:
 * @param children - All Slide components
 * @param background - Optional: Custom background component (e.g., Backgrounds.tsx)
 *
 * EXAMPLE:
 * <SlideDeck background={<Backgrounds.ParticleEffect />}>
 *   <Slide><Title>Welcome</Title></Slide>
 *   <Slide><Heading>Section Title</Heading></Slide>
 * </SlideDeck>
 */
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

/**
 * Slide - Individual full-height slide section
 *
 * PURPOSE:
 * - Container for a single slide/section in the presentation
 * - Enforces consistent spacing and vertical centering
 * - Optional: Add decorative top border between sections
 *
 * WHEN TO USE:
 * - Wrap each major section/topic in its own Slide
 * - Use for: title slides, concept introductions, discussion prompts, conclusions
 * - One Slide per main content unit
 *
 * PROPS:
 * @param children - Content for the slide (Title, Heading, text, cards, etc.)
 * @param className - Additional Tailwind classes
 * @param border - Boolean: Add subtle top border (useful for visual separation)
 * @param id - Optional: Anchor link ID for navigation (e.g., id="methods")
 *
 * EXAMPLE:
 * <Slide border id="methodology">
 *   <Heading>Research Methodology</Heading>
 *   <Subtitle>How we conducted this study</Subtitle>
 * </Slide>
 */
export function Slide({
  children,
  className = "",
  border = false,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  border?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`slide-section relative min-h-screen flex flex-col items-center text-center justify-center py-20 ${border ? "border-t border-[var(--charcoal)]/10" : ""} ${className}`}
    >
      {children}
    </section>
  );
}

// ============================================================================
// LAYOUT & COMPOSITION COMPONENTS
// ============================================================================
// Use these to structure content within slides

/**
 * Row - Horizontal flex layout container
 *
 * PURPOSE:
 * - Create responsive side-by-side layouts for text, images, or cards
 * - Stacks vertically on mobile, horizontally on tablet/desktop
 * - Control alignment and spacing
 *
 * WHEN TO USE:
 * - Side-by-side content (two-column layouts)
 * - Image + text combinations
 * - Multiple cards in a row
 * - Do NOT use for vertical lists (use Column or AnimatedList instead)
 *
 * PROPS:
 * @param children - Column components or content blocks
 * @param gap - Spacing between items: "small" (gap-4) | "medium" (gap-8) | "large" (gap-12) | "xlarge" (gap-16)
 * @param items - Vertical alignment: "start" | "center" | "end" | "stretch"
 * @param className - Additional Tailwind classes
 *
 * EXAMPLE:
 * <Row gap="large" items="center">
 *   <Column spanRatio="1/2">
 *     <MediaBlock src="/image.jpg" alt="Chart" />
 *   </Column>
 *   <Column spanRatio="1/2">
 *     <Heading>Key Finding</Heading>
 *     <ContentText>Description...</ContentText>
 *   </Column>
 * </Row>
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

/**
 * Column - Vertical flex container with width control
 *
 * PURPOSE:
 * - Define width and layout within Row containers
 * - Control horizontal/vertical alignment of child elements
 * - Responsive width handling (full mobile, constrained on desktop)
 *
 * WHEN TO USE:
 * - As children of Row component
 * - To define column widths in multi-column layouts
 * - When you need specific width ratios (1/3, 2/3, 1/4, etc.)
 *
 * PROPS:
 * @param children - Content
 * @param spanRatio - Width on desktop: "1/2" | "1/3" | "2/3" | "1/4" | "3/4" | "full"
 *                    (always full width on mobile, these apply to md+ breakpoints)
 * @param justify - Vertical alignment: "start" | "center" | "end" | "between"
 * @param align - Horizontal alignment: "start" | "center" | "end" | "stretch"
 * @param className - Additional Tailwind classes
 *
 * EXAMPLE:
 * <Row>
 *   <Column spanRatio="1/3" align="center">
 *     <Metric value="72%" label="Improvement" />
 *   </Column>
 *   <Column spanRatio="2/3">
 *     <ContentText>Details about the metric...</ContentText>
 *   </Column>
 * </Row>
 */
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

// ============================================================================
// TYPOGRAPHY & TEXT COMPONENTS
// ============================================================================
// Semantic text styling for different content hierarchies

/**
 * Title - Large hero title for slide opening
 *
 * PURPOSE:
 * - Eye-catching main heading for title slides or major section breaks
 * - Maximum visual hierarchy and impact
 * - Animated on scroll with GSAP
 *
 * WHEN TO USE:
 * - First slide of course or major sections
 * - Standalone emphasis statements
 * - Title slides only (not for section headings - use Heading instead)
 *
 * STYLING:
 * - Large serif font (8xl on lg screens)
 * - Black weight, tight tracking
 * - Charcoal color
 * - Animated entry with .gsap-reveal
 *
 * PROPS:
 * @param children - Title text
 * @param className - Additional Tailwind classes
 *
 * EXAMPLE:
 * <Slide>
 *   <Title>The Future of AI</Title>
 *   <Subtitle variant="hero">An evidence-based perspective</Subtitle>
 * </Slide>
 */
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

/**
 * Citation - Superscript reference link for academic citations
 *
 * PURPOSE:
 * - Add academic citations to content
 * - Link directly to source URLs
 * - Show attribution for claims/quotes
 *
 * WHEN TO USE:
 * - After factual claims in ContentText or quotes
 * - In sentences where you cite research
 * - Multiple citations on same sentence allowed
 *
 * PROPS:
 * @param ids - Array of citation ID numbers to look up in course citations mapping, e.g., [1, 2, 5]
 *              Creates linked superscript like: [1] [2] [5]
 *              Resolved from CitationProvider when available
 * @param urls - Alternative: Array of URLs to link to directly, e.g., ["https://example.com", "https://paper.org"]
 * @param getCitationUrls - Optional explicit function to map IDs to URLs (override)
 *
 * EXAMPLE (with provider-based ID lookup):
 * <CitationProvider value={{ getCitation, getCitations, getCitationUrls }}>
 *   <ContentText>
 *     AI systems show 72% improvement in accuracy.
 *     <Citation ids={[1, 2]} />
 *   </ContentText>
 * </CitationProvider>
 *
 * EXAMPLE (with explicit override):
 * <ContentText>
 *   AI systems show 72% improvement in accuracy.
 *   <Citation ids={[1, 2]} getCitationUrls={getCitationUrls} />
 * </ContentText>
 *
 * EXAMPLE (with direct URLs):
 * <ContentText>
 *   AI systems show 72% improvement in accuracy.
 *   <Citation urls={["https://arxiv.org/paper1", "https://arxiv.org/paper2"]} />
 * </ContentText>
 */
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

  // Explicit props take precedence, then provider-backed ID resolution.
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
            className="text-[var(--crimson)] font-bold ml-0.5 opacity-80 hover:opacity-100 transition-opacity"
          >
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
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

/**
 * Heading - Section heading for content within slides
 *
 * PURPOSE:
 * - Secondary-level heading for sections, topics, or concepts
 * - Animated entry with scroll trigger
 * - Semantic h2 element for accessibility
 *
 * WHEN TO USE:
 * - Major topics within a Slide
 * - Before content sections
 * - Second-level information hierarchy (use Title for level 1)
 *
 * STYLING:
 * - Large serif font (6xl on md+)
 * - Bold weight
 * - Charcoal color
 * - Animated with GSAP
 *
 * PROPS:
 * @param children - Heading text
 * @param className - Additional Tailwind classes
 *
 * EXAMPLE:
 * <Heading>Key Findings from Research</Heading>
 * <ContentText>The study revealed...</ContentText>
 */
export function Heading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`gsap-reveal mb-8 md:mb-16 ${className}`}>
      <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-[var(--charcoal)] font-serif">
        {children}
      </h2>
    </div>
  );
}

/**
 * Highlight - Emphasize key words or phrases with color
 *
 * PURPOSE:
 * - Draw attention to critical terms or concepts
 * - Inline or block-level emphasis with crimson color/gradient
 * - Improve content readability and focus
 *
 * WHEN TO USE:
 * - Within Title, Heading, or ContentText components
 * - For key terminology, important findings, or concepts
 * - Use sparingly to maintain impact
 * - In prose text for emphasis
 *
 * STYLING:
 * - Inline: Gradient background (crimson to crimson-light) with text-clip
 * - Block: Solid crimson text color
 *
 * PROPS:
 * @param children - Text to highlight
 * @param block - If true: solid crimson text (block-level), if false: gradient fill with text-clip
 * @param className - Additional Tailwind classes
 *
 * EXAMPLE:
 * <Title>The Future of <Highlight>Artificial Intelligence</Highlight></Title>
 *
 * <ContentText>
 *   This research shows <Highlight>72% improvement</Highlight> in accuracy.
 * </ContentText>
 *
 * <Highlight block>Key Point:</Highlight> Understanding this concept is critical.
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
        className={`${block ? "text-[var(--crimson)]" : "text-transparent bg-clip-text bg-gradient-to-r from-[var(--crimson)] to-[var(--crimson-light)]"} ${className}`}
      >
        {children}
      </span>
    </>
  );
}

/**
 * Subtitle - Secondary descriptive text
 *
 * PURPOSE:
 * - Provide context, subtitle, or tagline below titles
 * - Two variants: hero (for title slides) and section (for content sections)
 * - Italic styling for emphasis through typography
 *
 * WHEN TO USE:
 * - Directly after Title (use variant="hero")
 * - Below Heading to add context (use variant="section")
 * - Maximum width constraint (max-w-4xl) maintains readability
 *
 * PROPS:
 * @param children - Subtitle text
 * @param variant - "hero" (animated, 3xl text) | "section" (2xl with border)
 * @param className - Additional Tailwind classes
 *
 * EXAMPLE:
 * <Slide>
 *   <Title>The Future of AI</Title>
 *   <Subtitle variant="hero">An evidence-based perspective</Subtitle>
 * </Slide>
 *
 * <Slide>
 *   <Heading>Historical Context</Heading>
 *   <Subtitle variant="section">The evolution of machine learning</Subtitle>
 * </Slide>
 */
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

/**
 * ContentText - Main body text with semantic markdown styling
 *
 * PURPOSE:
 * - Display article/course content with rich text formatting
 * - Two layouts: prose (standard content) or base (highlighted/bordered)
 * - Auto-styling for bold, lists, etc. via Tailwind prose modifiers
 * - Supports markdown structure: paragraphs, lists, strong text
 *
 * WHEN TO USE:
 * - For all body text content in slides
 * - When content includes multiple paragraphs, lists, or emphasis
 * - Left-aligned, readable typography
 * - For text-heavy content blocks
 *
 * LAYOUT VARIANTS:
 * - "prose": Standard readable body text (default)
 *   * Bold text automatically crimson colored
 *   * Bullet points with crimson dots
 *   * Space between paragraphs
 *
 * - "base": Highlighted callout style
 *   * Left border in crimson
 *   * Indented with padding
 *   * Good for important statements
 *
 * PROPS:
 * @param children - HTML or text content (typically JSX with <p>, <strong>, <ul>, <li>)
 * @param layout - "prose" (default) | "base"
 * @param className - Additional Tailwind classes
 *
 * EXAMPLE:
 * <ContentText>
 *   <p>Artificial intelligence is transforming industries across the globe.</p>
 *   <p>Key applications include:</p>
 *   <ul>
 *     <li><strong>Healthcare</strong>: diagnostic imaging and drug discovery</li>
 *     <li><strong>Finance</strong>: fraud detection and risk analysis</li>
 *   </ul>
 * </ContentText>
 *
 * <ContentText layout="base">
 *   <strong>Critical Finding:</strong> The results represent a 72% improvement over previous methods.
 * </ContentText>
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
      ? "mt-8 text-xl md:text-2xl text-[var(--charcoal-light)] font-light leading-relaxed space-y-6 [&>p>strong]:text-[var(--crimson)] [&>p>strong]:font-semibold [&>ul]:list-disc [&>ul]:pl-6 [&>ul>li::marker]:text-[var(--crimson)]"
      : "text-xl md:text-2xl text-[var(--charcoal-light)] font-light leading-relaxed mb-4 border-l-4 border-[var(--crimson)]/20 pl-6 py-2";

  return (
    <div className={`text-left w-full ${layoutClass} ${className}`}>
      {children}
    </div>
  );
}

/**
 * Tag - Small label positioned absolutely at top of slide
 *
 * PURPOSE:
 * - Add context label for slides (e.g., "CHAPTER 3", "DISCUSSION PROMPT")
 * - Small uppercase text centered above slide content
 * - Animated entry with GSAP
 *
 * WHEN TO USE:
 * - Optional: For section headers that need a category label
 * - Positioned above Title or Heading
 * - Use for slide taxonomy/organization
 * - Not required for every slide
 *
 * STYLING:
 * - Uppercase, bold, tracking-widest
 * - Positioned absolutely at top center
 * - Animated with GSAP
 * - Light charcoal color
 *
 * PROPS:
 * @param children - Label text (e.g., "SECTION 2", "CASE STUDY")
 * @param className - Additional Tailwind classes
 *
 * EXAMPLE:
 * <Slide>
 *   <Tag>Chapter 3</Tag>
 *   <Title>Advanced Concepts</Title>
 * </Slide>
 */
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

// ============================================================================
// CARDS & INTERACTIVE COMPONENTS
// ============================================================================
// Structured content containers with specific purposes

/**
 * Card - General-purpose content card with optional title
 *
 * PURPOSE:
 * - Frame related content as a distinct block
 * - Add crisp visual structure with border and shadow
 * - Optional title bar (small-capped, crimson)
 * - For grouping related information
 *
 * WHEN TO USE:
 * - When you want to visually separate content
 * - Multi-card layouts (often in Row/Column)
 * - Statistics, findings, or concept explanation
 * - NOT for discussion prompts (use DiscussionCard instead)
 * - NOT for callouts (use Callout instead)
 *
 * STYLING:
 * - Top border in crimson
 * - Subtle shadow
 * - White background (surface color)
 * - Padding on all sides
 *
 * PROPS:
 * @param title - Optional: Small-capped title at top
 * @param subtitle - Optional: Secondary text below title
 * @param children - Card content
 * @param className - Additional Tailwind classes
 *
 * EXAMPLE:
 * <Row gap="large">
 *   <Column spanRatio="1/3">
 *     <Card title="Finding 1">
 *       72% improvement in accuracy compared to baseline methods.
 *     </Card>
 *   </Column>
 * </Row>
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

/**
 * ContentTitle - Secondary title (h3) for content sections
 *
 * PURPOSE:
 * - Smaller heading for subsections or content blocks
 * - Semantic h3 element
 * - Used within Card or content blocks
 *
 * WHEN TO USE:
 * - Inside Card or MediaBlock for nested titles
 * - For sub-headings within larger content
 * - Lower in hierarchy than Heading (h2)
 *
 * STYLING:
 * - Medium size (2xl)
 * - Bold, charcoal color
 * - Tight spacing
 *
 * PROPS:
 * @param children - Title text
 *
 * EXAMPLE:
 * <Card>
 *   <ContentTitle>Research Methodology</ContentTitle>
 *   <ContentDescription>Our approach to conducting this study...</ContentDescription>
 * </Card>
 */
export function ContentTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-2xl font-bold mb-3 text-[var(--charcoal)]">
      {children}
    </h3>
  );
}

/**
 * ContentDescription - Body text for content blocks
 *
 * PURPOSE:
 * - Descriptive text within cards or grouped content
 * - Less prominent than ContentText but more structured
 * - Light font weight for readability
 *
 * WHEN TO USE:
 * - Inside Card with ContentTitle
 * - Supporting text for concepts
 * - Paired with ContentTitle for structured content
 * - When you need lighter text than ContentText
 *
 * STYLING:
 * - Light font weight
 * - Charcoal-light color
 * - Relax line height
 *
 * PROPS:
 * @param children - Description text or JSX
 *
 * EXAMPLE:
 * <Card>
 *   <ContentTitle>Case Study</ContentTitle>
 *   <ContentDescription>
 *     This organization implemented AI-driven analytics
 *     and saw immediate improvements in efficiency.
 *   </ContentDescription>
 * </Card>
 */
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

/**
 * DiscussionCard - Interactive reveal card for discussion prompts
 *
 * PURPOSE:
 * - Engage learners with reflective questions
 * - Click-to-reveal interaction hides answer until engaged
 * - Visual distinction with gold-colored border and icon
 * - Maintains slide height while transitioning between states
 *
 * BEHAVIOR:
 * - Default state: Shows prompt with discussion icon and title
 * - Click state: Reveals full content with smooth transition
 * - Hover effects: Border and background color change
 * - Animated with Tailwind transitions (smooth reveal/blur)
 *
 * WHEN TO USE:
 * - REQUIRED: On every course slide (per course-content-generation skill)
 * - At end of major topics for reflection
 * - For formative assessment and engagement
 * - To encourage critical thinking
 *
 * STYLING:
 * - Gold color scheme (distinct from crimson)
 * - Large clickable area (min-h-500px)
 * - Subtle shadow
 * - Pulse animation on icon
 * - Smooth transitions and blur effects
 *
 * PROPS:
 * @param title - Optional: Label shown in overlay (default: "Discussion Prompt")
 * @param children - The discussion question/prompt text
 * @param className - Additional Tailwind classes
 *
 * EXAMPLE:
 * <DiscussionCard title="Reflection">
 *   How would you apply these principles to your own work?
 *   Consider both technical and ethical implications.
 * </DiscussionCard>
 *
 * IMPORTANT NOTES:
 * - One DiscussionCard per slide is recommended
 * - Content should be a thoughtful question, not a long essay
 * - Use in Slide but not repeated excessively
 * - Provides engagement metric point for learners
 */
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

// ============================================================================
// MEDIA & DATA VISUALIZATION COMPONENTS
// ============================================================================
// Display images, charts, quotes, metrics, and other data

/**
 * MediaBlock - Responsive image container with optional caption
 *
 * PURPOSE:
 * - Display images, diagrams, charts, or visual content
 * - Maintains aspect ratio and responsive behavior
 * - Optional caption text below image
 * - Consistent styling with borders and shadows
 *
 * WHEN TO USE:
 * - For course diagrams, charts, or illustrative images
 * - When image needs a caption or attribution
 * - Inside Column or Row for side-by-side layouts
 * - For visual examples or explanations
 *
 * BEHAVIOR:
 * - Lazy loaded for performance
 * - Aspect ratio maintained (video aspect 16:9)
 * - Animated entry with GSAP reveal
 *
 * PROPS:
 * @param src - Image path or URL
 * @param alt - Alt text for accessibility (required)
 * @param caption - Optional: Caption text displayed below
 * @param className - Additional Tailwind classes
 *
 * EXAMPLE:
 * <MediaBlock
 *   src="/charts/market-analysis.png"
 *   alt="Market analysis chart showing growth trends"
 *   caption="Figure 1: Global AI market growth 2020-2026"
 * />
 */
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

/**
 * Quote - Formatted blockquote with attribution
 *
 * PURPOSE:
 * - Display testimonials, expert quotes, or key statements
 * - Large, prominent styling for emphasis
 * - Attribution footer with optional role/title
 * - Animated entry with GSAP
 *
 * WHEN TO USE:
 * - Expert opinions or research findings
 * - Testimonials from practitioners
 * - Key statements that deserve emphasis
 * - Starting evidence for arguments
 * - Sparingly for maximum impact
 *
 * STYLING:
 * - Left crimson border
 * - Italic serif text
 * - Large size (3xl base, 5xl on lg)
 * - Author attribution in smaller text below
 * - Animated reveal
 *
 * PROPS:
 * @param children - Quote text (no quotes needed, automatically formatted)
 * @param author - Optional: Name of speaker/author
 * @param role - Optional: Title or role of author
 * @param className - Additional Tailwind classes
 *
 * EXAMPLE:
 * <Quote
 *   author="Dr. Jane Smith"
 *   role="AI Research Director, Tech Corp"
 * >
 *   The future of AI is not about replacing humans,
 *   but about augmenting human capability.
 * </Quote>
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

/**
 * Metric - Large statistics or data point display
 *
 * PURPOSE:
 * - Showcase key metrics, numbers, or statistics
 * - Maximum visual emphasis on numerical findings
 * - Used in multi-metric layouts or highlighted findings
 * - Animated entry with GSAP
 *
 * WHEN TO USE:
 * - Research findings: "72% improvement"
 * - Statistics: "3.2B users affected"
 * - Key percentages or counts
 * - Usually displayed in Row with multiple Columns
 * - For impact statements that are data-driven
 *
 * STYLING:
 * - Huge serif number (8xl on md+)
 * - Crimson color for the metric
 * - Gold border and subtle background
 * - Uppercase label below
 * - Animated reveal
 *
 * PROPS:
 * @param value - The metric number/value to display (e.g., "72%")
 * @param label - Human-readable label for the metric (e.g., "Improvement")
 * @param className - Additional Tailwind classes
 *
 * EXAMPLE:
 * <Row gap="large">
 *   <Column spanRatio="1/3">
 *     <Metric value="72%" label="Accuracy Improvement" />
 *   </Column>
 *   <Column spanRatio="1/3">
 *     <Metric value="3.2B" label="Total Users" />
 *   </Column>
 *   <Column spanRatio="1/3">
 *     <Metric value="12x" label="Faster Processing" />
 *   </Column>
 * </Row>
 */
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
      <div className="text-4xl md:text-6xl font-black font-serif text-[var(--crimson)] mb-4 tracking-tighter">
        {value}
      </div>
      <div className="text-xl md:text-2xl font-medium tracking-wide text-[var(--charcoal)] text-center uppercase">
        {label}
      </div>
    </div>
  );
}

/**
 * Callout - Highlighted box for key takeaways and important notes
 *
 * PURPOSE:
 * - Emphasize critical information, warnings, or key points
 * - Two variants: primary (crimson) and secondary (charcoal)
 * - Left border design for visual hierarchy
 * - Animated entry with GSAP
 *
 * WHEN TO USE:
 * - For critical information that needs emphasis
 * - Summary boxes with "Key Takeaway" or similar
 * - Important methodology notes
 * - Limitations or important caveats
 * - Use primary for most cases, secondary for warnings/alternate notes
 *
 * STYLING:
 * - Primary: Crimson border + light crimson background
 * - Secondary: Charcoal border + light charcoal background
 * - Left-aligned border accent
 * - Padding and spacing for readability
 *
 * PROPS:
 * @param title - Label for callout (default: "Key Takeaway")
 * @param children - Callout content
 * @param variant - "primary" (crimson) | "secondary" (charcoal)
 * @param className - Additional Tailwind classes
 *
 * EXAMPLE:
 * <Callout title="Important Finding" variant="primary">
 *   The research shows that early intervention
 *   is critical for optimal outcomes.
 * </Callout>
 *
 * <Callout title="Methodology Note" variant="secondary">
 *   This study was limited to participants aged 18-65
 *   and may not generalize to other populations.
 * </Callout>
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

// ============================================================================
// LIST & ENUMERATION COMPONENTS
// ============================================================================
// Structured lists with animation and styling

/**
 * AnimatedList - Container for animated list items
 *
 * PURPOSE:
 * - Display bulleted lists with staggered animations
 * - Left border accent in crimson
 * - Paired with ListItem children for proper styling
 *
 * WHEN TO USE:
 * - For enumerated content (key points, steps, features)
 * - Always use with ListItem children
 * - When you want animated stagger on scroll
 * - For readability of grouped information
 * - NOT for inline lists (use ContentText with <ul> instead)
 *
 * STYLING:
 * - Left crimson border
 * - Space between items (space-y-6)
 * - Left-aligned
 * - Children are ListItem components
 *
 * PROPS:
 * @param children - Must be ListItem components
 * @param className - Additional Tailwind classes
 *
 * EXAMPLE:
 * <AnimatedList>
 *   <ListItem>First key point about the topic</ListItem>
 *   <ListItem>Second important consideration</ListItem>
 *   <ListItem>Third related concept</ListItem>
 * </AnimatedList>
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
      className={`text-left w-full space-y-6 p-4 border-l-2 border-l-[var(--crimson)] ${className}`}
    >
      {children}
    </ul>
  );
}

/**
 * ListItem - Individual list item with animated bullet
 *
 * PURPOSE:
 * - Child component of AnimatedList
 * - Renders with crimson bullet point
 * - Animated entry with GSAP stagger
 * - Semantic <li> element
 *
 * BEHAVIOR:
 * - Bullet animates in with staggered timing
 * - Parent AnimatedList stagger controls animation speed
 * - Bullet is small circle (CircleSmall icon)
 * - Content flows beside bullet point
 *
 * WHEN TO USE:
 * - ONLY as children of AnimatedList
 * - One ListItem per bullet point
 * - For key points, steps, or enumerated content
 *
 * STYLING:
 * - Crimson bullet (CircleSmall icon) on left
 * - Light charcoal text
 * - Flex layout for bullet + content alignment
 * - Animated reveal
 *
 * PROPS:
 * @param children - Content of the list item (text or JSX)
 * @param className - Additional Tailwind classes
 *
 * EXAMPLE:
 * <AnimatedList>
 *   <ListItem>
 *     <strong>Model Training:</strong> Process of teaching the system
 *   </ListItem>
 *   <ListItem>Validation against test datasets</ListItem>
 *   <ListItem>Deployment and monitoring</ListItem>
 * </AnimatedList>
 *
 * NOTE: ListItem can contain <strong> or other inline elements
 */
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

/**
 * HardwareLifecycle - Cinematic hardware lifecycle flow diagram
 *
 * PURPOSE:
 * - Visualize the full lifecycle of AI hardware with weighted animations
 * - Replace Mermaid diagrams with bespoke cinematic component
 * - Interactive hover states and smooth animations
 *
 * WHEN TO USE:
 * - When showing linear flow/process diagrams
 * - For lifecycle, pipeline, or sequential process visualization
 * - Alternative to Mermaid for simpler linear flows
 *
 * STYLING:
 * - Responsive: Vertical on mobile, horizontal on desktop
 * - Glassmorphic cards with hover effects
 * - Animated arrows with pulse effect
 * - Crimson accent colors on hover
 *
 * PROPS:
 * @param caption - Optional caption displayed below the diagram
 * @param className - Additional Tailwind classes
 *
 * EXAMPLE:
 * <HardwareLifecycle caption="The full lifecycle of AI hardware" />
 */
export function HardwareLifecycle({
  caption,
  className = "",
}: {
  caption?: string;
  className?: string;
}) {
  const stages = [
    { label: "Extraction", icon: "⛏️" },
    { label: "Manufacturing", icon: "🏭" },
    { label: "Use", icon: "💻" },
    { label: "Disposal", icon: "♻️" },
  ];

  return (
    <div className={`w-full ${className}`}>
      {/* Lifecycle Flow */}
      <div className="gsap-reveal flex flex-col md:flex-row items-center justify-center gap-0 md:gap-4 py-8">
        {stages.map((stage, index) => (
          <React.Fragment key={stage.label}>
            {/* Stage Box */}
            <div
              className="gsap-reveal group relative"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Connecting Line (Mobile - Vertical) */}
              {index > 0 && (
                <div className="md:hidden absolute left-1/2 -top-8 w-0.5 h-8 bg-gradient-to-b from-[var(--crimson)]/40 to-[var(--crimson)]" />
              )}

              <div className="relative flex flex-col items-center justify-center min-w-[140px] h-[140px] bg-[var(--surface)] border-2 border-[var(--charcoal)]/10 rounded-lg shadow-lg transition-all duration-500 hover:border-[var(--crimson)] hover:shadow-[0_0_30px_rgba(139,0,0,0.15)] hover:-translate-y-1">
                {/* Icon */}
                <div className="text-4xl mb-2 transition-transform duration-500 group-hover:scale-110">
                  {stage.icon}
                </div>

                {/* Label */}
                <div className="text-base font-serif font-semibold text-[var(--charcoal)] text-center px-2">
                  {stage.label}
                </div>

                {/* Subtle noise overlay */}
                <div
                  className="absolute inset-0 rounded-lg opacity-[0.02] pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  }}
                />
              </div>
            </div>

            {/* Arrow (Desktop - Horizontal) */}
            {index < stages.length - 1 && (
              <div
                className="hidden md:block gsap-reveal"
                style={{ animationDelay: `${index * 0.2 + 0.1}s` }}
              >
                <svg
                  width="60"
                  height="24"
                  viewBox="0 0 60 24"
                  fill="none"
                  className="transition-all duration-500"
                >
                  {/* Arrow Line */}
                  <line
                    x1="0"
                    y1="12"
                    x2="45"
                    y2="12"
                    stroke="var(--crimson)"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                    className="animate-pulse"
                  />
                  {/* Arrow Head */}
                  <polygon
                    points="45,6 45,18 60,12"
                    fill="var(--crimson)"
                    className="transition-transform duration-500 hover:translate-x-1"
                  />
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Caption */}
      {caption && (
        <p className="gsap-reveal text-sm text-[var(--charcoal-light)]/70 italic text-center mt-6 font-serif">
          {caption}
        </p>
      )}
    </div>
  );
}
