"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Slide,
  SlideDeck,
} from "@/app/(courses-ai)/_components/SlideComponents";
import { ScrollProgress } from "@/app/(courses-ai)/_components/Interactive";
import { createCourseQuizLookup, type CourseQuiz } from "@/lib/course-quiz";
import quizzes from "./quizzes.json";

// ============================================================================
// WEEK 06 — AI IN BUSINESS STRATEGY
// ============================================================================
// Same deck grammar as Weeks 01–05: every slide is hand-composed for its own
// argument, with hairlines instead of boxes and crimson marking one thing.
//
// Sentences are transcribed verbatim from content.md. Figures carry only words
// that already appear in the slide's sentences; any shape that suggests a
// quantity is labelled SCHEMATIC because content.md gives no numbers.
//
// Quizzes: `Slide` renders `quizData` BEFORE its section. A [quiz] tag in
// content.md marks the topic to test, so each quiz is attached to the slide
// that FOLLOWS its topic and only tests material the student has already
// passed. No [quiz] topic in this week is followed by a part plate.
// ============================================================================

const quiz = createCourseQuizLookup(quizzes as CourseQuiz[]);

/** Small-caps label treatment used for every eyebrow, axis tick and numeral. */
const MICRO = "font-sans text-[10px] font-semibold uppercase tracking-[0.22em]";

/** The same small-caps treatment for SVG <text>. */
const SVG_LABEL = {
  fontSize: 9,
  letterSpacing: 2.2,
  fontFamily: "var(--font-sans), sans-serif",
  fontWeight: 600,
} as const;

/** Body sentence at the deck's reading size. */
const BODY =
  "font-serif text-lg leading-[1.55] text-[var(--charcoal)] md:text-[1.3125rem]";

/** A sentence promoted to display weight inside a block. */
const DISPLAY =
  "font-serif text-[1.375rem] font-bold leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[1.875rem]";

/** A sentence one step below display, used inside rules and frames. */
const LEAD =
  "font-serif text-xl leading-[1.4] text-[var(--charcoal)] md:text-[1.625rem]";

/** Hairline that opens each later block of a slide. */
const RULED = "mt-12 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-8";

/** Mono tag treatment for words lifted out of a sentence. */
const TAG = "font-mono text-[10px] uppercase tracking-[0.1em]";

const pad = (n: number) => String(n).padStart(2, "0");

/** Deterministic 0–1 hash, so scattered marks match between server and client. */
const hash = (n: number) => {
  const v = Math.sin(n * 12.9898 + 78.233) * 43758.5453;
  return v - Math.floor(v);
};

/**
 * Reveal — the deck's single entrance. Opacity plus eight pixels of rise,
 * fired once when the element crosses into view. `delay` staggers siblings.
 */
function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "p" | "span" | "figure";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(8px)",
        transition: `opacity 700ms ease-out ${delay}ms, transform 700ms ease-out ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}

/** Eyebrow plus slide heading, the masthead every content slide opens with. */
function Head({
  eyebrow,
  children,
  signal = false,
}: {
  eyebrow: string;
  children: React.ReactNode;
  signal?: boolean;
}) {
  return (
    <Reveal>
      <div
        className={`${MICRO} ${
          signal ? "text-[var(--crimson)]" : "text-[var(--champagne)]"
        }`}
      >
        {eyebrow}
      </div>
      <h2 className="mt-5 max-w-4xl font-serif text-[1.875rem] font-bold leading-[1.05] tracking-[-0.02em] text-[var(--charcoal)] md:text-[2.875rem]">
        {children}
      </h2>
    </Reveal>
  );
}


/**
 * Part divider: display numeral against a ruled margin. The visible label and
 * numeral are decorative; the h2 carries the full "Part N: Title" heading for
 * assistive technology.
 */
function PartPlate({
  id,
  numeral,
  title,
  lines,
  quizData,
}: {
  id: string;
  numeral: string;
  title: string;
  lines: string[];
  quizData?: CourseQuiz;
}) {
  return (
    <Slide id={id} border align="left" quizData={quizData}>
      <div className="grid w-full items-end gap-10 md:grid-cols-[minmax(0,10rem)_1fr] md:gap-16">
        <Reveal>
          <div aria-hidden>
            <div className={`${MICRO} text-[var(--champagne)]`}>Part</div>
            <div className="font-serif text-[6rem] font-black leading-[0.8] tracking-[-0.04em] text-[var(--crimson)] md:text-[9rem]">
              {numeral}
            </div>
          </div>
        </Reveal>

        <Reveal
          delay={140}
          className="md:border-l md:border-[var(--charcoal)]/12 md:pl-16"
        >
          <h2 className="font-serif text-[2.25rem] font-bold leading-[1.02] tracking-[-0.025em] text-[var(--charcoal)] md:text-[3.5rem]">
            <span className="sr-only">{`Part ${numeral}: `}</span>
            {title}
          </h2>
          <div className="mt-8 h-px w-24 bg-[var(--charcoal)]/20" />
          {lines.map((line, i) => (
            <p
              key={line}
              className={`${
                i === 0 ? "mt-8" : "mt-4"
              } max-w-2xl font-serif text-lg font-light italic leading-relaxed text-[var(--charcoal-light)] md:text-2xl`}
            >
              {line}
            </p>
          ))}
        </Reveal>
      </div>
    </Slide>
  );
}


/** Discussion prompt, set apart in the deck's one ruled frame. */
function Discussion({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <Reveal delay={delay} className="w-full">
      <aside className="mt-14 max-w-3xl border border-[var(--charcoal)]/12 p-7 md:p-9">
        <div className={`${MICRO} text-[var(--champagne)]`}>Discussion</div>
        <p className="mt-4 font-serif text-lg font-light italic leading-relaxed text-[var(--charcoal)] md:text-[1.375rem]">
          {children}
        </p>
      </aside>
    </Reveal>
  );
}

/** A sentence's own list, set as middot-separated mono words. */
function Terms({
  items,
  className = "mt-5",
}: {
  items: string[];
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`${className} flex flex-wrap gap-x-3 gap-y-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--charcoal-light)]/55`}
    >
      {items.map((item, i) => (
        <React.Fragment key={item}>
          {i > 0 && <span>·</span>}
          <span>{item}</span>
        </React.Fragment>
      ))}
    </div>
  );
}

/**
 * Numbered cells in a hairline grid. `cols` carries the responsive column
 * classes; `mark` turns one cell crimson.
 */
function Steps({
  items,
  cols,
  mark,
  className = "mt-6",
}: {
  items: string[];
  cols: string;
  mark?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`${className} grid grid-cols-2 gap-px bg-[var(--charcoal)]/10 ${cols}`}
    >
      {items.map((item, i) => (
        <div key={item} className="bg-[var(--background)] px-4 py-4">
          <span
            className={`${MICRO} ${
              i === mark ? "text-[var(--crimson)]" : "text-[var(--champagne)]"
            }`}
          >
            {pad(i + 1)}
          </span>
          <span
            className={`mt-2 block font-mono text-[11px] uppercase tracking-[0.1em] ${
              i === mark
                ? "text-[var(--crimson)]"
                : "text-[var(--charcoal-light)]/70"
            }`}
          >
            {item}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Two labels set against each other across one rule; the right one is marked. */
function Split({
  left,
  right,
  strikeLeft = false,
  cols = "grid-cols-2",
}: {
  left: string;
  right: string;
  strikeLeft?: boolean;
  cols?: string;
}) {
  return (
    <div
      aria-hidden
      className={`grid ${cols} border-b border-[var(--charcoal)]/15 pb-3`}
    >
      <span
        className={`${MICRO} pr-4 text-[var(--charcoal-light)]/55 ${
          strikeLeft ? "[text-decoration-line:line-through]" : ""
        }`}
      >
        {left}
      </span>
      <span
        className={`${MICRO} border-l border-[var(--crimson)]/40 pl-6 text-[var(--crimson)]`}
      >
        {right}
      </span>
    </div>
  );
}

/** Caption for any figure whose proportions are illustrative only. */
function Schematic({ className = "mt-1" }: { className?: string }) {
  return (
    <figcaption
      className={`${MICRO} ${className} text-[var(--charcoal-light)]/40`}
    >
      Schematic
    </figcaption>
  );
}


export default function Week06BusinessStrategy() {
  return (
    <SlideDeck>
      <ScrollProgress label="Week 06" />

      {/* ==================================================================
          01 · TITLE — masthead; artificial intelligence joined into
          competitive advantage; implementation set beside alignment.
      ================================================================== */}
      <Slide id="title" align="left" className="relative overflow-hidden">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 select-none font-serif text-[36vw] font-black leading-none text-[var(--charcoal)]/[0.035] md:text-[28vw]"
        >
          06
        </span>

        <Reveal>
          <div
            className={`${MICRO} flex items-center gap-4 text-[var(--champagne)]`}
          >
            <span className="h-px w-10 bg-[var(--crimson)]" />
            Week 06
          </div>
        </Reveal>

        <Reveal delay={120}>
          <h1 className="mt-10 max-w-5xl font-serif text-[clamp(2.5rem,7.5vw,5.75rem)] font-black leading-[0.92] tracking-[-0.035em] text-[var(--charcoal)]">
            AI in Business{" "}
            <span className="text-[var(--crimson)]">Strategy</span>
          </h1>
        </Reveal>

        <Reveal delay={240} className="w-full">
          <div className="mt-12 h-px w-full bg-[var(--charcoal)]/15" />
          <p className="mt-6 max-w-3xl font-serif text-xl font-light italic leading-relaxed text-[var(--charcoal-light)] md:text-[1.75rem]">
            Integrating Artificial Intelligence into Competitive Advantage
          </p>
          <div
            aria-hidden
            className="mt-6 flex max-w-3xl flex-wrap items-center gap-x-5 gap-y-2"
          >
            <span className={`${MICRO} text-[var(--charcoal-light)]/55`}>
              Artificial Intelligence
            </span>
            <span className="h-px w-16 bg-[var(--crimson)]/60" />
            <span className="size-2 rotate-45 border-r border-t border-[var(--crimson)] -ml-6" />
            <span className={`${MICRO} text-[var(--crimson)]`}>
              Competitive Advantage
            </span>
          </div>
        </Reveal>

        <Reveal delay={360} className="w-full">
          <p className="mt-10 max-w-3xl font-serif text-xl font-light italic leading-relaxed text-[var(--charcoal-light)] md:text-[1.75rem]">
            Moving beyond technological implementation to strategic alignment
          </p>
          <div aria-hidden className="mt-6 max-w-3xl">
            <Split
              left="Technological implementation"
              right="Strategic alignment"
            />
          </div>
        </Reveal>

        <Reveal delay={480} className="w-full">
          <div className="mt-14 flex w-full flex-wrap items-baseline justify-between gap-4 border-t border-[var(--charcoal)]/12 pt-5">
            <span className={`${MICRO} text-[var(--champagne)]`}>
              Davood Wadi, PhD
            </span>
            <span
              className={`${MICRO} font-normal text-[var(--charcoal-light)]/60`}
            >
              BUSI 654 · Applications of AI in Business
            </span>
          </div>
        </Reveal>
      </Slide>

      <PartPlate
        id="part-1"
        numeral="1"
        title="The Strategic Imperative of AI"
        lines={[
          "Redefining the boundaries of corporate strategy",
          "The shift from operational efficiency to strategic differentiation",
          "Understanding AI as a general-purpose technology",
        ]}
      />

      {/* ==================================================================
          03 · NEW STRATEGIC LANDSCAPE — one market drawn twice: inside a
          fixed boundary, then with the boundary redrawn; reactive struck
          for proactive; decisions arriving faster and faster.
                                                          [quiz topic]
      ================================================================== */}
      <Slide id="strategic-landscape" border align="left">
        <Head eyebrow="Opening">The New Strategic Landscape</Head>

        <div className="mt-10 grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-14">
          <Reveal delay={140}>
            <div className={`${MICRO} text-[var(--champagne)]`}>
              Traditional strategy
            </div>
            <p className={`${BODY} mt-4`}>
              Traditional strategy relied on static industry analysis and slow
              adaptation.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 400 164"
              className="mt-6 w-full"
              fill="none"
            >
              <rect
                x="20"
                y="10"
                width="360"
                height="120"
                stroke="var(--charcoal)"
                strokeOpacity="0.6"
                strokeWidth="1.5"
              />
              {Array.from({ length: 28 }).map((_, i) => (
                <circle
                  key={i}
                  cx={(40 + hash(i) * 320).toFixed(1)}
                  cy={(24 + hash(i + 50) * 92).toFixed(1)}
                  r="3"
                  fill="var(--charcoal)"
                  fillOpacity="0.35"
                />
              ))}
              <text
                {...SVG_LABEL}
                x="20"
                y="158"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                STATIC INDUSTRY ANALYSIS
              </text>
            </svg>
          </Reveal>

          <Reveal delay={260}>
            <div className={`${MICRO} text-[var(--crimson)]`}>AI</div>
            <p className={`${BODY} mt-4`}>
              AI introduces dynamic, predictive capabilities that reshape market
              boundaries.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 400 164"
              className="mt-6 w-full"
              fill="none"
            >
              <rect
                x="20"
                y="10"
                width="360"
                height="120"
                stroke="var(--charcoal)"
                strokeOpacity="0.2"
                strokeDasharray="3 5"
              />
              <path
                d="M12 70 C 10 24, 90 4, 170 16 C 250 28, 300 2, 370 18 C 396 26, 396 96, 380 118 C 360 140, 250 122, 190 134 C 120 146, 30 140, 16 112 C 8 98, 14 84, 12 70 Z"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              {Array.from({ length: 28 }).map((_, i) => (
                <circle
                  key={i}
                  cx={(40 + hash(i) * 320).toFixed(1)}
                  cy={(24 + hash(i + 50) * 92).toFixed(1)}
                  r="3"
                  fill="var(--charcoal)"
                  fillOpacity="0.35"
                />
              ))}
              <text {...SVG_LABEL} x="20" y="158" fill="var(--crimson)">
                RESHAPE MARKET BOUNDARIES
              </text>
            </svg>
          </Reveal>
        </div>

        <Reveal delay={400} className="w-full">
          <div className={RULED}>
            <Split
              left="Reactive planning"
              right="Proactive foresight"
              strikeLeft
            />
            <p className={`${BODY} mt-6 max-w-4xl`}>
              Organizations must transition from reactive planning to proactive
              foresight.
            </p>
          </div>
        </Reveal>

        <Reveal delay={540} className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <figure aria-hidden className="w-full">
              <svg viewBox="0 0 800 84" className="w-full" fill="none">
                <text
                  {...SVG_LABEL}
                  x="0"
                  y="12"
                  fill="var(--charcoal)"
                  fillOpacity="0.55"
                >
                  VELOCITY OF STRATEGIC DECISION MAKING
                </text>
                <text
                  {...SVG_LABEL}
                  x="800"
                  y="12"
                  textAnchor="end"
                  fill="var(--crimson)"
                >
                  ACCELERATES
                </text>
                <path
                  d="M0 56H790"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.2"
                />
                <path
                  d="M782 51l8 5l-8 5"
                  stroke="var(--crimson)"
                  strokeOpacity="0.8"
                />
                {(() => {
                  const ticks: number[] = [];
                  for (let x = 8, g = 96; x < 770; x += g, g = Math.max(g * 0.8, 7))
                    ticks.push(Math.round(x));
                  return ticks.map((x) => (
                    <path
                      key={x}
                      d={`M${x} 40V72`}
                      stroke="var(--crimson)"
                      strokeOpacity={(0.2 + 0.8 * (x / 770)).toFixed(2)}
                      strokeWidth="2"
                    />
                  ));
                })()}
              </svg>
              <Schematic />
            </figure>
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              The velocity of strategic decision making accelerates
              significantly.
            </p>
          </div>
        </Reveal>
      </Slide>

      {/* ==================================================================
          04 · AI AS A STRATEGIC ASSET — data alone stopping short of
          advantage; unique data training the crimson capability; a moat
          ring holding outsiders off a strategic position.
                                          [quiz: strategic-landscape]
      ================================================================== */}
      <Slide
        id="strategic-asset"
        border
        align="left"
        quizData={quiz["strategic-asset"]}
      >
        <Head eyebrow="The true asset">AI as a Strategic Asset</Head>

        <div className="mt-10 grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-14">
          <Reveal delay={140}>
            <p className={BODY}>
              Data alone is insufficient for competitive advantage.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 400 150"
              className="mt-6 w-full"
              fill="none"
            >
              <ellipse
                cx="45"
                cy="58"
                rx="35"
                ry="8"
                stroke="var(--charcoal)"
                strokeOpacity="0.6"
              />
              <path
                d="M10 58V102A35 8 0 0 0 80 102V58M10 80A35 8 0 0 0 80 80"
                stroke="var(--charcoal)"
                strokeOpacity="0.6"
              />
              <path
                d="M92 80H250"
                stroke="var(--charcoal)"
                strokeOpacity="0.45"
              />
              <path
                d="M262 62V98"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <circle
                cx="350"
                cy="80"
                r="16"
                stroke="var(--charcoal)"
                strokeOpacity="0.3"
                strokeDasharray="3 4"
              />
              <text
                {...SVG_LABEL}
                x="398"
                y="34"
                textAnchor="end"
                fill="var(--charcoal)"
                fillOpacity="0.45"
              >
                COMPETITIVE ADVANTAGE
              </text>
              <text
                {...SVG_LABEL}
                x="10"
                y="136"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                DATA ALONE
              </text>
              <text
                {...SVG_LABEL}
                x="262"
                y="124"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                INSUFFICIENT
              </text>
            </svg>
          </Reveal>

          <Reveal delay={260}>
            <p className={BODY}>
              The true asset is the proprietary algorithmic capability trained
              on unique data.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 400 150"
              className="mt-6 w-full"
              fill="none"
            >
              <ellipse
                cx="45"
                cy="58"
                rx="35"
                ry="8"
                stroke="var(--charcoal)"
                strokeOpacity="0.6"
              />
              <path
                d="M10 58V102A35 8 0 0 0 80 102V58M10 80A35 8 0 0 0 80 80"
                stroke="var(--charcoal)"
                strokeOpacity="0.6"
              />
              <path
                d="M92 80H200"
                stroke="var(--crimson)"
                strokeOpacity="0.6"
              />
              <path
                d="M192 75l8 5l-8 5"
                stroke="var(--crimson)"
                strokeOpacity="0.8"
              />
              <text
                {...SVG_LABEL}
                x="146"
                y="66"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.5"
              >
                TRAINED ON
              </text>
              <rect
                x="212"
                y="52"
                width="56"
                height="56"
                fill="var(--crimson)"
              />
              {["PROPRIETARY", "ALGORITHMIC", "CAPABILITY"].map((word, i) => (
                <text
                  key={word}
                  {...SVG_LABEL}
                  x="282"
                  y={70 + i * 14}
                  fill="var(--charcoal)"
                  fillOpacity="0.7"
                >
                  {word}
                </text>
              ))}
              <text
                {...SVG_LABEL}
                x="10"
                y="136"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                UNIQUE DATA
              </text>
              <text
                {...SVG_LABEL}
                x="240"
                y="136"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                THE TRUE ASSET
              </text>
            </svg>
          </Reveal>
        </div>

        <Reveal delay={420} className="w-full">
          <div className={RULED}>
            <svg
              aria-hidden
              viewBox="0 0 800 170"
              className="w-full"
              fill="none"
            >
              <circle
                cx="400"
                cy="92"
                r="66"
                stroke="var(--charcoal)"
                strokeOpacity="0.08"
                strokeWidth="16"
              />
              {[58, 74].map((r) => (
                <circle
                  key={r}
                  cx="400"
                  cy="92"
                  r={r}
                  stroke="var(--charcoal)"
                  strokeOpacity="0.45"
                />
              ))}
              <rect
                x="382"
                y="74"
                width="36"
                height="36"
                fill="var(--crimson)"
              />
              {[
                { from: 200, to: 312, head: "M304 87l8 5l-8 5" },
                { from: 600, to: 488, head: "M496 87l-8 5l8 5" },
              ].map((a) => (
                <g key={a.from}>
                  <circle
                    cx={a.from}
                    cy="92"
                    r="5"
                    fill="var(--surface)"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.55"
                  />
                  <path
                    d={`M${a.from + (a.to > a.from ? 10 : -10)} 92H${a.to}`}
                    stroke="var(--charcoal)"
                    strokeOpacity="0.35"
                    strokeDasharray="4 4"
                  />
                  <path d={a.head} stroke="var(--charcoal)" strokeOpacity="0.5" />
                </g>
              ))}
              <path
                d="M184 22L344 40"
                stroke="var(--charcoal)"
                strokeOpacity="0.25"
              />
              <text
                {...SVG_LABEL}
                x="0"
                y="25"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                DEFENSIBLE DATA MOATS
              </text>
              <path
                d="M636 22L420 72"
                stroke="var(--crimson)"
                strokeOpacity="0.35"
              />
              <text
                {...SVG_LABEL}
                x="800"
                y="25"
                textAnchor="end"
                fill="var(--crimson)"
              >
                STRATEGIC POSITION
              </text>
            </svg>
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              Organizations must build defensible data moats to protect their
              strategic position.
            </p>
          </div>
        </Reveal>
      </Slide>

      {/* ==================================================================
          05 · RETHINKING THE VALUE CHAIN — primary and support activities
          side by side, then the whole chain with AI in every activity and
          the margin arrow carrying the compound benefits.
      ================================================================== */}
      <Slide id="value-chain" border align="left">
        <Head eyebrow="Across the chain">Rethinking the Value Chain</Head>

        <div className="mt-10 grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-14">
          <Reveal delay={140}>
            <div className={`${MICRO} text-[var(--champagne)]`}>
              Primary activities
            </div>
            <p className={`${BODY} mt-4`}>
              AI transforms primary activities, from inbound logistics to
              customer service.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className={`${MICRO} text-[var(--champagne)]`}>
              Support activities
            </div>
            <p className={`${BODY} mt-4`}>
              Support activities like human resources and procurement become
              intelligent and predictive.
            </p>
            <Terms items={["intelligent", "predictive"]} />
          </Reveal>
        </div>

        <Reveal delay={400} className="w-full">
          <div className={RULED}>
            <svg
              aria-hidden
              viewBox="0 0 800 232"
              className="w-full"
              fill="none"
            >
              <text
                {...SVG_LABEL}
                x="0"
                y="11"
                fill="var(--charcoal)"
                fillOpacity="0.55"
              >
                SUPPORT ACTIVITIES
              </text>
              <circle cx="396" cy="8" r="4" fill="var(--crimson)" />
              <text
                {...SVG_LABEL}
                x="700"
                y="11"
                textAnchor="end"
                fill="var(--crimson)"
              >
                INTEGRATION OF AI ACROSS THE VALUE CHAIN
              </text>

              {[
                { y: 22, label: "HUMAN RESOURCES" },
                { y: 66, label: "PROCUREMENT" },
              ].map((band) => (
                <g key={band.label}>
                  <rect
                    x="0"
                    y={band.y}
                    width="700"
                    height="38"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.35"
                  />
                  <text
                    {...SVG_LABEL}
                    x="14"
                    y={band.y + 22}
                    fill="var(--charcoal)"
                    fillOpacity="0.65"
                  >
                    {band.label}
                  </text>
                  {[280, 420, 560].map((x) => (
                    <circle
                      key={x}
                      cx={x}
                      cy={band.y + 19}
                      r="4"
                      fill="var(--crimson)"
                    />
                  ))}
                </g>
              ))}

              {[0, 1, 2, 3, 4].map((i) => {
                const x = i * 140;
                const tail = i === 0 ? "Z" : `L${x + 16} 150Z`;
                return (
                  <g key={i}>
                    <path
                      d={`M${x} 114H${x + 124}L${x + 140} 150L${x + 124} 186H${x}${tail}`}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.45"
                    />
                    <circle
                      cx={x + 70}
                      cy="150"
                      r="4"
                      fill="var(--crimson)"
                    />
                  </g>
                );
              })}

              <path d="M708 22L796 104L708 186Z" fill="var(--crimson)" />

              <text
                {...SVG_LABEL}
                x="0"
                y="206"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                INBOUND LOGISTICS
              </text>
              <text
                {...SVG_LABEL}
                x="684"
                y="206"
                textAnchor="end"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                CUSTOMER SERVICE
              </text>
              <text
                {...SVG_LABEL}
                x="0"
                y="228"
                fill="var(--charcoal)"
                fillOpacity="0.55"
              >
                PRIMARY ACTIVITIES
              </text>
              <text
                {...SVG_LABEL}
                x="800"
                y="228"
                textAnchor="end"
                fill="var(--crimson)"
              >
                COMPOUND STRATEGIC BENEFITS
              </text>
            </svg>
            <p className={`${DISPLAY} mt-8 max-w-4xl`}>
              The integration of AI across the value chain creates compound
              strategic benefits.
            </p>
          </div>
        </Reveal>

        <Discussion delay={560}>
          Which segment of the traditional value chain is most vulnerable to
          commoditization by AI competitors?
        </Discussion>
      </Slide>

      {/* ==================================================================
          06 · FALLACY OF PLUG AND PLAY — the same square tool docked on three
          different firms; a crimson piece cut to interlock with one firm's
          uneven edge; strategy and architecture joined at every seam.
      ================================================================== */}
      <Slide id="plug-and-play" border align="left">
        <Head eyebrow="Off the shelf" signal>
          The Fallacy of Plug and Play
        </Head>

        <div className="mt-10 grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-14">
          <Reveal delay={140}>
            <p className={BODY}>
              Implementing off-the-shelf AI tools does not confer long-term
              advantage.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 400 176"
              className="mt-6 w-full"
              fill="none"
            >
              <text
                {...SVG_LABEL}
                x="200"
                y="12"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                OFF-THE-SHELF AI TOOLS
              </text>
              <circle
                cx="70"
                cy="118"
                r="46"
                stroke="var(--charcoal)"
                strokeOpacity="0.5"
              />
              <rect
                x="150"
                y="72"
                width="100"
                height="92"
                rx="10"
                stroke="var(--charcoal)"
                strokeOpacity="0.5"
              />
              <path
                d="M330 72L384 104L372 164H288L276 104Z"
                stroke="var(--charcoal)"
                strokeOpacity="0.5"
              />
              {[
                [61, 50],
                [191, 52],
                [321, 52],
              ].map(([x, y]) => (
                <rect
                  key={x}
                  x={x}
                  y={y}
                  width="18"
                  height="18"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                />
              ))}
            </svg>
          </Reveal>

          <Reveal delay={260}>
            <p className={BODY}>
              Strategic value requires deep integration with unique
              organizational processes.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 400 176"
              className="mt-6 w-full"
              fill="none"
            >
              {(() => {
                const depths = [4, 30, 10, 38, 18, 34, 6, 24];
                const edge = (offset: number) =>
                  depths
                    .map((d, i) => `H${40 + i * 40}V${90 + d + offset}H${80 + i * 40}`)
                    .join("");
                const org = `M40 150V${90 + depths[0]}${edge(0)}V150Z`;
                const piece = `M40 36V${87 + depths[0]}${edge(-3)}V36Z`;
                return (
                  <g>
                    <path d={piece} fill="var(--crimson)" />
                    <path
                      d={org}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.55"
                    />
                  </g>
                );
              })()}
              <text {...SVG_LABEL} x="40" y="26" fill="var(--crimson)">
                DEEP INTEGRATION
              </text>
              <text
                {...SVG_LABEL}
                x="40"
                y="170"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                UNIQUE ORGANIZATIONAL PROCESSES
              </text>
            </svg>
          </Reveal>
        </div>

        <Reveal delay={420} className="w-full">
          <div className={RULED}>
            <svg
              aria-hidden
              viewBox="0 0 800 110"
              className="w-full"
              fill="none"
            >
              <text
                {...SVG_LABEL}
                x="0"
                y="42"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                BUSINESS STRATEGY
              </text>
              <text
                {...SVG_LABEL}
                x="0"
                y="92"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                AI ARCHITECTURE
              </text>
              {(() => {
                const seams = [190, 330, 470, 650, 800];
                return (
                  <g>
                    {seams.slice(0, -1).map((x, i) => (
                      <g key={x}>
                        <rect
                          x={x + 2}
                          y="28"
                          width={seams[i + 1] - x - 4}
                          height="18"
                          fill="var(--charcoal)"
                          fillOpacity="0.1"
                          stroke="var(--charcoal)"
                          strokeOpacity="0.4"
                        />
                        <rect
                          x={x + 2}
                          y="78"
                          width={seams[i + 1] - x - 4}
                          height="18"
                          fill="var(--charcoal)"
                          fillOpacity="0.1"
                          stroke="var(--charcoal)"
                          strokeOpacity="0.4"
                        />
                      </g>
                    ))}
                    {seams.slice(1, -1).map((x) => (
                      <path
                        key={x}
                        d={`M${x} 46V78`}
                        stroke="var(--crimson)"
                        strokeWidth="2"
                      />
                    ))}
                  </g>
                );
              })()}
              <text
                {...SVG_LABEL}
                x="400"
                y="66"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                ALIGNMENT
              </text>
            </svg>
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              The alignment between business strategy and AI architecture is
              paramount.
            </p>
          </div>
        </Reveal>
      </Slide>

      {/* ==================================================================
          07 · LEADERSHIP IMPERATIVE — strategy held at the top of the chart,
          the hand-off to IT struck out; a spread of probabilistic outcomes;
          initiatives lined up across functions toward business goals.
      ================================================================== */}
      <Slide id="leadership" border align="left">
        <Head eyebrow="Who owns it">The Leadership Imperative</Head>

        <Reveal delay={140} className="w-full">
          <p className={`${LEAD} mt-9 max-w-4xl`}>
            Executive leadership must own the AI strategy, not delegate it to
            the IT department.
          </p>
          <svg
            aria-hidden
            viewBox="0 0 800 150"
            className="mt-7 w-full max-w-5xl"
            fill="none"
          >
            <path
              d="M400 36V70H200V104M400 70V104M400 70H600V104"
              stroke="var(--charcoal)"
              strokeOpacity="0.3"
            />
            <rect x="388" y="12" width="24" height="24" fill="var(--crimson)" />
            <text
              {...SVG_LABEL}
              x="376"
              y="28"
              textAnchor="end"
              fill="var(--crimson)"
            >
              OWN THE AI STRATEGY
            </text>
            <text
              {...SVG_LABEL}
              x="424"
              y="28"
              fill="var(--charcoal)"
              fillOpacity="0.7"
            >
              EXECUTIVE LEADERSHIP
            </text>
            {[200, 400, 600].map((x) => (
              <rect
                key={x}
                x={x - 9}
                y="104"
                width="18"
                height="18"
                fill="var(--surface)"
                stroke="var(--charcoal)"
                strokeOpacity="0.55"
              />
            ))}
            <text
              {...SVG_LABEL}
              x="600"
              y="144"
              textAnchor="middle"
              fill="var(--charcoal)"
              fillOpacity="0.6"
            >
              IT DEPARTMENT
            </text>
            <path
              d="M620 26C720 26 740 70 624 108"
              stroke="var(--charcoal)"
              strokeOpacity="0.35"
              strokeDasharray="4 4"
            />
            <path
              d="M630 99l-7 9l11 1"
              stroke="var(--charcoal)"
              strokeOpacity="0.45"
            />
            <path
              d="M698 44l18 18M716 44l-18 18"
              stroke="var(--crimson)"
              strokeWidth="2"
            />
            <text {...SVG_LABEL} x="726" y="57" fill="var(--crimson)">
              DELEGATE
            </text>
          </svg>
        </Reveal>

        <div className="mt-12 grid w-full max-w-5xl gap-10 border-t border-[var(--charcoal)]/10 pt-8 md:grid-cols-2 md:gap-14">
          <Reveal delay={300}>
            <p className={BODY}>
              Cultivating an organizational mindset that embraces probabilistic
              outcomes.
            </p>
            <figure aria-hidden className="mt-6 w-full">
              <svg viewBox="0 0 400 132" className="w-full" fill="none">
                <path
                  d={Array.from({ length: 73 })
                    .map((_, i) => {
                      const x = 20 + i * 5;
                      const y = 100 - 80 * Math.exp(-(((x - 200) / 62) ** 2));
                      return `${i === 0 ? "M" : "L"}${x} ${y.toFixed(1)}`;
                    })
                    .join("")}
                  stroke="var(--crimson)"
                  strokeWidth="2"
                />
                <path d="M20 100H380" stroke="var(--charcoal)" strokeOpacity="0.3" />
                {Array.from({ length: 24 }).map((_, i) => {
                  const u = (hash(i + 7) + hash(i + 31) + hash(i + 59)) / 3;
                  return (
                    <circle
                      key={i}
                      cx={(60 + u * 280).toFixed(1)}
                      cy={(106 + hash(i + 90) * 6).toFixed(1)}
                      r="2"
                      fill="var(--charcoal)"
                      fillOpacity="0.45"
                    />
                  );
                })}
                <text
                  {...SVG_LABEL}
                  x="20"
                  y="128"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  PROBABILISTIC OUTCOMES
                </text>
              </svg>
              <Schematic />
            </figure>
          </Reveal>

          <Reveal delay={420}>
            <p className={BODY}>
              Fostering cross-functional collaboration to align AI initiatives
              with business goals.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 400 132"
              className="mt-6 w-full"
              fill="none"
            >
              {[40, 110, 180, 250].map((x) => (
                <rect
                  key={x}
                  x={x}
                  y="26"
                  width="40"
                  height="80"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.35"
                />
              ))}
              <path d="M20 66H326" stroke="var(--crimson)" strokeWidth="2" />
              <path d="M318 60l8 6l-8 6" stroke="var(--crimson)" strokeWidth="2" />
              {[60, 130, 200, 270].map((x) => (
                <circle key={x} cx={x} cy="66" r="4" fill="var(--crimson)" />
              ))}
              <circle cx="358" cy="66" r="20" stroke="var(--crimson)" />
              <circle cx="358" cy="66" r="8" fill="var(--crimson)" />
              <text
                {...SVG_LABEL}
                x="398"
                y="16"
                textAnchor="end"
                fill="var(--crimson)"
              >
                BUSINESS GOALS
              </text>
              <text
                {...SVG_LABEL}
                x="20"
                y="128"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                CROSS-FUNCTIONAL COLLABORATION
              </text>
            </svg>
          </Reveal>
        </div>
      </Slide>

      <PartPlate
        id="part-2"
        numeral="2"
        title="Value Creation and Capture"
        lines={[
          "Mechanisms of AI-driven value generation",
          "Reimagining products, services, and customer experiences",
          "Capturing the economic surplus generated by artificial intelligence",
        ]}
      />

      {/* ==================================================================
          09 · DIMENSIONS OF VALUE CREATION — three numbered columns: costs
          stepping down, revenue stepping up, a new stream branching off;
          then the three set against strategic return.     [quiz topic]
      ================================================================== */}
      <Slide id="value-dimensions" border align="left">
        <Head eyebrow="Three dimensions">Dimensions of Value Creation</Head>

        <div className="mt-10 grid w-full max-w-5xl gap-10 md:grid-cols-3 md:gap-10">
          <Reveal delay={140}>
            <div className={`${MICRO} text-[var(--crimson)]`}>01</div>
            <p className={`${BODY} mt-3`}>
              Cost reduction through intelligent automation and process
              optimization.
            </p>
            <figure aria-hidden className="mt-6 w-full">
              <svg viewBox="0 0 300 110" className="w-full" fill="none">
                <text
                  {...SVG_LABEL}
                  x="0"
                  y="10"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  COST REDUCTION
                </text>
                {[78, 64, 52, 42, 34].map((h, i) => (
                  <rect
                    key={h}
                    x={10 + i * 58}
                    y={106 - h}
                    width="36"
                    height={h}
                    fill={i === 4 ? "var(--crimson)" : "var(--charcoal)"}
                    fillOpacity={i === 4 ? 1 : 0.15 + i * 0.05}
                  />
                ))}
              </svg>
              <Schematic />
            </figure>
            <Terms items={["intelligent automation", "process optimization"]} />
          </Reveal>

          <Reveal delay={260}>
            <div className={`${MICRO} text-[var(--crimson)]`}>02</div>
            <p className={`${BODY} mt-3`}>
              Revenue growth via hyper-personalization and predictive
              cross-selling.
            </p>
            <figure aria-hidden className="mt-6 w-full">
              <svg viewBox="0 0 300 110" className="w-full" fill="none">
                <text
                  {...SVG_LABEL}
                  x="0"
                  y="10"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  REVENUE GROWTH
                </text>
                {[34, 42, 52, 64, 78].map((h, i) => (
                  <rect
                    key={h}
                    x={10 + i * 58}
                    y={106 - h}
                    width="36"
                    height={h}
                    fill={i === 4 ? "var(--crimson)" : "var(--charcoal)"}
                    fillOpacity={i === 4 ? 1 : 0.15 + i * 0.05}
                  />
                ))}
              </svg>
              <Schematic />
            </figure>
            <Terms
              items={["hyper-personalization", "predictive cross-selling"]}
            />
          </Reveal>

          <Reveal delay={380}>
            <div className={`${MICRO} text-[var(--crimson)]`}>03</div>
            <p className={`${BODY} mt-3`}>
              Business model innovation enabling entirely new revenue streams.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 300 110"
              className="mt-6 w-full"
              fill="none"
            >
              <text
                {...SVG_LABEL}
                x="0"
                y="10"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                BUSINESS MODEL INNOVATION
              </text>
              <path
                d="M0 96H296"
                stroke="var(--charcoal)"
                strokeOpacity="0.45"
                strokeWidth="2"
              />
              {[36, 62].map((y) => (
                <path
                  key={y}
                  d={`M90 96C150 96 170 ${y} 296 ${y}`}
                  stroke="var(--crimson)"
                  strokeWidth="2"
                />
              ))}
              <circle cx="90" cy="96" r="4" fill="var(--crimson)" />
              <text
                {...SVG_LABEL}
                x="296"
                y="26"
                textAnchor="end"
                fill="var(--crimson)"
              >
                NEW REVENUE STREAMS
              </text>
            </svg>
          </Reveal>
        </div>

        <Reveal delay={520} className="w-full">
          <div className={RULED}>
            <figure aria-hidden className="w-full">
              <svg viewBox="0 0 800 140" className="w-full" fill="none">
                {[
                  { y: 20, w: 250, label: "COST REDUCTION" },
                  { y: 56, w: 330, label: "REVENUE GROWTH" },
                  { y: 92, w: 520, label: "BUSINESS MODEL INNOVATION" },
                ].map((row, i) => (
                  <g key={row.label}>
                    <text
                      {...SVG_LABEL}
                      x="0"
                      y={row.y + 4}
                      fill={i === 2 ? "var(--crimson)" : "var(--charcoal)"}
                      fillOpacity={i === 2 ? 1 : 0.6}
                    >
                      {row.label}
                    </text>
                    <rect
                      x="250"
                      y={row.y - 8}
                      width={row.w}
                      height="16"
                      fill={i === 2 ? "var(--crimson)" : "var(--charcoal)"}
                      fillOpacity={i === 2 ? 1 : 0.2}
                    />
                  </g>
                ))}
                <path
                  d="M250 116H790"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.35"
                />
                <path
                  d="M782 111l8 5l-8 5"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.5"
                />
                <text
                  {...SVG_LABEL}
                  x="790"
                  y="136"
                  textAnchor="end"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  HIGHEST STRATEGIC RETURN
                </text>
              </svg>
              <Schematic />
            </figure>
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              The highest strategic return often comes from business model
              innovation.
            </p>
          </div>
        </Reveal>
      </Slide>

      {/* ==================================================================
          10 · PRODUCT AND SERVICE TRANSFORMATION — a product with two
          crimson additions; separate sales against one continuous service
          line; static struck for learning.       [quiz: value-dimensions]
      ================================================================== */}
      <Slide
        id="product-service"
        border
        align="left"
        quizData={quiz["product-service"]}
      >
        <Head eyebrow="From product to service">
          Product and Service Transformation
        </Head>

        <div className="mt-10 grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-14">
          <Reveal delay={140}>
            <p className={BODY}>
              Augmenting existing products with predictive maintenance and
              intelligent features.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 400 140"
              className="mt-6 w-full"
              fill="none"
            >
              <rect
                x="20"
                y="28"
                width="84"
                height="84"
                stroke="var(--charcoal)"
                strokeOpacity="0.6"
                strokeWidth="1.5"
              />
              {[
                { y: 48, label: "PREDICTIVE MAINTENANCE" },
                { y: 92, label: "INTELLIGENT FEATURES" },
              ].map((a) => (
                <g key={a.label}>
                  <path
                    d={`M104 ${a.y}H132`}
                    stroke="var(--crimson)"
                    strokeOpacity="0.6"
                  />
                  <circle cx="104" cy={a.y} r="6" fill="var(--crimson)" />
                  <text
                    {...SVG_LABEL}
                    x="140"
                    y={a.y + 3}
                    fill="var(--charcoal)"
                    fillOpacity="0.7"
                  >
                    {a.label}
                  </text>
                </g>
              ))}
              <text
                {...SVG_LABEL}
                x="20"
                y="134"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                EXISTING PRODUCTS
              </text>
            </svg>
          </Reveal>

          <Reveal delay={260}>
            <p className={BODY}>
              Shifting from selling discrete products to offering continuous,
              AI-enhanced services.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 400 140"
              className="mt-6 w-full"
              fill="none"
            >
              <text
                {...SVG_LABEL}
                x="0"
                y="14"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                DISCRETE PRODUCTS
              </text>
              {[0, 1, 2, 3].map((i) => (
                <rect
                  key={i}
                  x={4 + i * 104}
                  y="30"
                  width="18"
                  height="18"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.6"
                />
              ))}
              <path
                d="M0 96H390"
                stroke="var(--crimson)"
                strokeWidth="3"
              />
              <path
                d="M382 90l8 6l-8 6"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <text {...SVG_LABEL} x="0" y="130" fill="var(--crimson)">
                CONTINUOUS, AI-ENHANCED SERVICES
              </text>
            </svg>
          </Reveal>
        </div>

        <Reveal delay={420} className="w-full">
          <div className="mt-14 w-full max-w-5xl">
            <Split
              left="Static offerings"
              right="Learning, evolving solutions"
              strikeLeft
            />
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              The transition from static offerings to learning, evolving
              solutions.
            </p>
          </div>
        </Reveal>
      </Slide>

      {/* ==================================================================
          11 · ECONOMICS OF AI — one tall step of fixed cost then a nearly flat
          line; two falling cost curves, the network-effect one steeper;
          returns that flatten with volume but keep rising with quality.
                                                          [quiz topic]
      ================================================================== */}
      <Slide id="ai-economics" border align="left">
        <Head eyebrow="Cost curves">The Economics of AI</Head>

        <div className="mt-10 grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-14">
          <Reveal delay={140}>
            <p className={BODY}>
              High fixed costs of model development paired with near-zero
              marginal costs of deployment.
            </p>
            <figure aria-hidden className="mt-6 w-full">
              <svg viewBox="0 0 400 170" className="w-full" fill="none">
                <path
                  d="M30 10V146H390"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.35"
                />
                <path
                  d="M30 146H44V50"
                  stroke="var(--crimson)"
                  strokeWidth="3"
                />
                <path
                  d="M44 50L390 38"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.7"
                  strokeWidth="2"
                />
                <text {...SVG_LABEL} x="56" y="80" fill="var(--crimson)">
                  HIGH FIXED COSTS
                </text>
                <text
                  {...SVG_LABEL}
                  x="56"
                  y="94"
                  fill="var(--charcoal)"
                  fillOpacity="0.55"
                >
                  MODEL DEVELOPMENT
                </text>
                <text
                  {...SVG_LABEL}
                  x="390"
                  y="24"
                  textAnchor="end"
                  fill="var(--charcoal)"
                  fillOpacity="0.7"
                >
                  NEAR-ZERO MARGINAL COSTS
                </text>
                <text
                  {...SVG_LABEL}
                  x="390"
                  y="164"
                  textAnchor="end"
                  fill="var(--charcoal)"
                  fillOpacity="0.55"
                >
                  DEPLOYMENT
                </text>
              </svg>
              <Schematic />
            </figure>
          </Reveal>

          <Reveal delay={260}>
            <p className={BODY}>
              Economies of scale are amplified by network effects in data
              accumulation.
            </p>
            <figure aria-hidden className="mt-6 w-full">
              <svg viewBox="0 0 400 170" className="w-full" fill="none">
                <path
                  d="M30 10V146H390"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.35"
                />
                {[
                  { k: 2, stroke: "var(--charcoal)", opacity: 0.6 },
                  { k: 9, stroke: "var(--crimson)", opacity: 1 },
                ].map((c) => (
                  <path
                    key={c.k}
                    d={Array.from({ length: 37 })
                      .map((_, i) => {
                        const t = i / 36;
                        const y = 146 - 100 / (1 + t * c.k);
                        return `${i === 0 ? "M" : "L"}${30 + t * 360} ${y.toFixed(1)}`;
                      })
                      .join("")}
                    stroke={c.stroke}
                    strokeOpacity={c.opacity}
                    strokeWidth="2"
                  />
                ))}
                <text
                  {...SVG_LABEL}
                  x="36"
                  y="12"
                  fill="var(--charcoal)"
                  fillOpacity="0.55"
                >
                  COSTS
                </text>
                <text
                  {...SVG_LABEL}
                  x="220"
                  y="80"
                  fill="var(--charcoal)"
                  fillOpacity="0.65"
                >
                  ECONOMIES OF SCALE
                </text>
                <text {...SVG_LABEL} x="56" y="140" fill="var(--crimson)">
                  NETWORK EFFECTS
                </text>
                <text
                  {...SVG_LABEL}
                  x="390"
                  y="164"
                  textAnchor="end"
                  fill="var(--charcoal)"
                  fillOpacity="0.55"
                >
                  DATA ACCUMULATION
                </text>
              </svg>
              <Schematic />
            </figure>
          </Reveal>
        </div>

        <Reveal delay={420} className="w-full">
          <div className={RULED}>
            <p className={`${LEAD} max-w-4xl`}>
              Understanding the diminishing returns of data volume versus data
              quality.
            </p>
            <figure aria-hidden className="mt-7 w-full">
              <svg viewBox="0 0 800 170" className="w-full" fill="none">
                {[
                  { x0: 30, label: "DATA VOLUME", crimson: false },
                  { x0: 450, label: "DATA QUALITY", crimson: true },
                ].map((p) => (
                  <g key={p.label}>
                    <path
                      d={`M${p.x0} 10V146H${p.x0 + 340}`}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.35"
                    />
                    <path
                      d={Array.from({ length: 35 })
                        .map((_, i) => {
                          const t = i / 34;
                          const r = p.crimson ? t * 0.98 : 1 - Math.exp(-4 * t);
                          return `${i === 0 ? "M" : "L"}${p.x0 + t * 340} ${(146 - 110 * r).toFixed(1)}`;
                        })
                        .join("")}
                      stroke={p.crimson ? "var(--crimson)" : "var(--charcoal)"}
                      strokeOpacity={p.crimson ? 1 : 0.65}
                      strokeWidth="2"
                    />
                    <text
                      {...SVG_LABEL}
                      x={p.x0 + 6}
                      y="12"
                      fill="var(--charcoal)"
                      fillOpacity="0.55"
                    >
                      RETURNS
                    </text>
                    <text
                      {...SVG_LABEL}
                      x={p.x0 + 340}
                      y="166"
                      textAnchor="end"
                      fill={p.crimson ? "var(--crimson)" : "var(--charcoal)"}
                      fillOpacity={p.crimson ? 1 : 0.65}
                    >
                      {p.label}
                    </text>
                  </g>
                ))}
                <text
                  {...SVG_LABEL}
                  x="370"
                  y="24"
                  textAnchor="end"
                  fill="var(--charcoal)"
                  fillOpacity="0.65"
                >
                  DIMINISHING RETURNS
                </text>
              </svg>
              <Schematic />
            </figure>
          </div>
        </Reveal>
      </Slide>

      {/* ==================================================================
          12 · CAPTURING VALUE FROM ECOSYSTEMS — one lone firm beside a
          crimson hub wired to its partners; data passing both ways across
          an agreement.                                [quiz: ai-economics]
      ================================================================== */}
      <Slide
        id="ecosystems"
        border
        align="left"
        quizData={quiz["ecosystems"]}
      >
        <Head eyebrow="Beyond the firm">Capturing Value from Ecosystems</Head>

        <Reveal delay={140} className="w-full">
          <p className={`${LEAD} mt-9 max-w-4xl`}>
            Competing as an ecosystem orchestrator rather than a standalone
            firm.
          </p>
          <svg
            aria-hidden
            viewBox="0 0 800 156"
            className="mt-7 w-full max-w-5xl"
            fill="none"
          >
            <rect
              x="148"
              y="58"
              width="24"
              height="24"
              stroke="var(--charcoal)"
              strokeOpacity="0.6"
              strokeWidth="1.5"
            />
            <text
              {...SVG_LABEL}
              x="160"
              y="150"
              textAnchor="middle"
              fill="var(--charcoal)"
              fillOpacity="0.55"
            >
              STANDALONE FIRM
            </text>
            <path
              d="M400 8V140"
              stroke="var(--charcoal)"
              strokeOpacity="0.2"
              strokeDasharray="3 5"
            />
            {Array.from({ length: 7 }).map((_, k) => {
              const a = (k / 7) * Math.PI * 2 - Math.PI / 2;
              const x = (600 + Math.cos(a) * 58).toFixed(1);
              const y = (70 + Math.sin(a) * 58).toFixed(1);
              return (
                <g key={k}>
                  <path
                    d={`M600 70L${x} ${y}`}
                    stroke="var(--crimson)"
                    strokeOpacity="0.45"
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r="6"
                    fill="var(--surface)"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.6"
                  />
                </g>
              );
            })}
            <circle cx="600" cy="70" r="12" fill="var(--crimson)" />
            <text
              {...SVG_LABEL}
              x="600"
              y="150"
              textAnchor="middle"
              fill="var(--crimson)"
            >
              ECOSYSTEM ORCHESTRATOR
            </text>
          </svg>
        </Reveal>

        <Reveal delay={300} className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Leveraging AI to optimize partner interactions and platform
              dynamics.
            </p>
            <Terms items={["partner interactions", "platform dynamics"]} />
          </div>
        </Reveal>

        <Reveal delay={440} className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <svg
              aria-hidden
              viewBox="0 0 800 100"
              className="w-full"
              fill="none"
            >
              {[180, 620].map((x) => (
                <rect
                  key={x}
                  x={x - 12}
                  y="32"
                  width="24"
                  height="24"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.6"
                  strokeWidth="1.5"
                />
              ))}
              <path
                d="M200 36H362M438 36H600"
                stroke="var(--charcoal)"
                strokeOpacity="0.45"
              />
              <path d="M592 31l8 5l-8 5" stroke="var(--charcoal)" strokeOpacity="0.6" />
              <path
                d="M600 52H438M362 52H200"
                stroke="var(--charcoal)"
                strokeOpacity="0.45"
              />
              <path d="M208 47l-8 5l8 5" stroke="var(--charcoal)" strokeOpacity="0.6" />
              <path
                d="M374 14H414L426 26V74H374Z"
                fill="var(--surface)"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              {[36, 46, 56, 64].map((y) => (
                <path
                  key={y}
                  d={`M382 ${y}H${y === 64 ? 402 : 418}`}
                  stroke="var(--crimson)"
                  strokeOpacity="0.6"
                />
              ))}
              <text
                {...SVG_LABEL}
                x="400"
                y="96"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                DATA SHARING AGREEMENTS
              </text>
            </svg>
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              Data sharing agreements become critical strategic assets.
            </p>
          </div>
        </Reveal>

        <Discussion delay={560}>
          How should a firm balance data sharing for ecosystem growth against
          the risk of leaking competitive advantage?
        </Discussion>
      </Slide>

      {/* ==================================================================
          13 · PRICING STRATEGY — a flat price beside a crimson price that
          moves; willingness to pay as bars, the surplus above one fixed price
          shaded, then each bar priced at its own height; the risks named.
      ================================================================== */}
      <Slide id="pricing" border align="left">
        <Head eyebrow="Price">Pricing Strategy in the AI Era</Head>

        <Reveal delay={140} className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Moving from fixed pricing to dynamic, algorithmic pricing models.
          </p>
          <figure aria-hidden className="mt-7 w-full max-w-5xl">
            <svg viewBox="0 0 800 92" className="w-full" fill="none">
              <text
                {...SVG_LABEL}
                x="0"
                y="12"
                fill="var(--charcoal)"
                fillOpacity="0.55"
              >
                FIXED PRICING
              </text>
              <text
                {...SVG_LABEL}
                x="800"
                y="12"
                textAnchor="end"
                fill="var(--crimson)"
              >
                DYNAMIC, ALGORITHMIC PRICING
              </text>
              <path
                d="M0 56H800"
                stroke="var(--charcoal)"
                strokeOpacity="0.45"
                strokeDasharray="6 5"
              />
              <path
                d={Array.from({ length: 20 })
                  .map((_, i) => {
                    const y = (56 + (hash(i + 3) - 0.5) * 56).toFixed(1);
                    return `${i === 0 ? `M0 ${y}` : `V${y}`}H${(i + 1) * 40}`;
                  })
                  .join("")}
                stroke="var(--crimson)"
                strokeWidth="2"
              />
            </svg>
            <Schematic />
          </figure>
        </Reveal>

        <Reveal delay={300} className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Capturing consumer surplus through personalized pricing based on
              willingness to pay.
            </p>
            <figure aria-hidden className="mt-7 w-full">
              <svg viewBox="0 0 800 180" className="w-full" fill="none">
                {[0, 420].map((x0) => {
                  const personalized = x0 > 0;
                  return (
                    <g key={x0}>
                      {[120, 108, 96, 84, 72, 60, 48, 36].map((h, i) => {
                        const x = x0 + 20 + i * 44;
                        const top = 150 - h;
                        const above = Math.max(0, 84 - top);
                        return (
                          <g key={h}>
                            <rect
                              x={x}
                              y={top}
                              width="34"
                              height={h}
                              fill={personalized ? "var(--crimson)" : "none"}
                              fillOpacity={personalized ? 0.14 : 1}
                              stroke="var(--charcoal)"
                              strokeOpacity="0.45"
                            />
                            {!personalized && above > 0 && (
                              <rect
                                x={x}
                                y={top}
                                width="34"
                                height={above}
                                fill="var(--charcoal)"
                                fillOpacity="0.28"
                              />
                            )}
                            {personalized && (
                              <path
                                d={`M${x - 3} ${top}H${x + 37}`}
                                stroke="var(--crimson)"
                                strokeWidth="3"
                              />
                            )}
                          </g>
                        );
                      })}
                      <path
                        d={`M${x0} 150H${x0 + 380}`}
                        stroke="var(--charcoal)"
                        strokeOpacity="0.35"
                      />
                    </g>
                  );
                })}
                <path
                  d="M10 84H372"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.8"
                  strokeWidth="2"
                  strokeDasharray="6 5"
                />
                <text
                  {...SVG_LABEL}
                  x="380"
                  y="60"
                  textAnchor="end"
                  fill="var(--charcoal)"
                  fillOpacity="0.7"
                >
                  CONSUMER SURPLUS
                </text>
                <text
                  {...SVG_LABEL}
                  x="20"
                  y="172"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  WILLINGNESS TO PAY
                </text>
                <text {...SVG_LABEL} x="440" y="172" fill="var(--crimson)">
                  PERSONALIZED PRICING
                </text>
              </svg>
              <Schematic />
            </figure>
          </div>
        </Reveal>

        <Reveal delay={440} className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <p className={`${DISPLAY} max-w-4xl`}>
              Managing the ethical and regulatory risks of algorithmic price
              discrimination.
            </p>
            <Terms
              items={["ethical", "regulatory", "algorithmic price discrimination"]}
              className="mt-6"
            />
          </div>
        </Reveal>
      </Slide>

      {/* ==================================================================
          14 · METRICS FOR AI STRATEGY — the same rise drawn twice, financial
          metrics lagging the leading indicators; the three new KPIs; project
          arrows, some reaching the objectives and some drifting off.
      ================================================================== */}
      <Slide id="metrics" border align="left">
        <Head eyebrow="Measuring">Metrics for AI Strategy</Head>

        <Reveal delay={140} className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Traditional financial metrics lag behind the leading indicators of
            AI success.
          </p>
          <figure aria-hidden className="mt-7 w-full max-w-5xl">
            <svg viewBox="0 0 800 130" className="w-full" fill="none">
              <path d="M0 120H800" stroke="var(--charcoal)" strokeOpacity="0.2" />
              {[
                { c: 300, stroke: "var(--crimson)", opacity: 1 },
                { c: 500, stroke: "var(--charcoal)", opacity: 0.6 },
              ].map((s) => (
                <path
                  key={s.c}
                  d={Array.from({ length: 81 })
                    .map((_, i) => {
                      const x = i * 10;
                      const y = 116 - 90 / (1 + Math.exp(-(x - s.c) / 40));
                      return `${i === 0 ? "M" : "L"}${x} ${y.toFixed(1)}`;
                    })
                    .join("")}
                  stroke={s.stroke}
                  strokeOpacity={s.opacity}
                  strokeWidth="2"
                />
              ))}
              <path
                d="M306 71H494M306 65V77M494 65V77"
                stroke="var(--charcoal)"
                strokeOpacity="0.45"
              />
              <text
                {...SVG_LABEL}
                x="400"
                y="62"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.7"
              >
                LAG
              </text>
              <text
                {...SVG_LABEL}
                x="282"
                y="54"
                textAnchor="end"
                fill="var(--crimson)"
              >
                LEADING INDICATORS
              </text>
              <text
                {...SVG_LABEL}
                x="524"
                y="104"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                TRADITIONAL FINANCIAL METRICS
              </text>
            </svg>
            <Schematic />
          </figure>
        </Reveal>

        <Reveal delay={300} className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              New KPIs must focus on algorithmic accuracy, data acquisition
              rates, and model deployment speed.
            </p>
            <Steps
              items={[
                "algorithmic accuracy",
                "data acquisition rates",
                "model deployment speed",
              ]}
              cols="md:grid-cols-3"
              className="mt-6 max-w-4xl"
            />
          </div>
        </Reveal>

        <Reveal delay={440} className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <svg
              aria-hidden
              viewBox="0 0 800 132"
              className="w-full"
              fill="none"
            >
              <text
                {...SVG_LABEL}
                x="0"
                y="69"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                AI PROJECTS
              </text>
              {[40, 24, 8].map((r, i) => (
                <circle
                  key={r}
                  cx="700"
                  cy="66"
                  r={r}
                  stroke="var(--crimson)"
                  strokeOpacity={0.35 + i * 0.25}
                  fill={i === 2 ? "var(--crimson)" : "none"}
                />
              ))}
              {[
                { y: 18, end: [560, 4], hit: false },
                { y: 42, end: [684, 62], hit: true },
                { y: 66, end: [684, 66], hit: true },
                { y: 90, end: [684, 70], hit: true },
                { y: 114, end: [560, 128], hit: false },
              ].map((p) => (
                <g key={p.y}>
                  <path
                    d={`M124 ${p.y}L${p.end[0]} ${p.end[1]}`}
                    stroke={p.hit ? "var(--crimson)" : "var(--charcoal)"}
                    strokeOpacity={p.hit ? 0.7 : 0.3}
                    strokeDasharray={p.hit ? undefined : "4 4"}
                  />
                  <circle
                    cx="124"
                    cy={p.y}
                    r="4"
                    fill="var(--surface)"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.6"
                  />
                </g>
              ))}
              <text
                {...SVG_LABEL}
                x="800"
                y="128"
                textAnchor="end"
                fill="var(--crimson)"
              >
                CORE BUSINESS OBJECTIVES
              </text>
            </svg>
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              Measuring the strategic alignment of AI projects with core
              business objectives.
            </p>
          </div>
        </Reveal>
      </Slide>

      <PartPlate
        id="part-3"
        numeral="3"
        title="Competitive Advantage in the AI Era"
        lines={[
          "Sustaining leadership in rapidly evolving markets",
          "The role of proprietary data and algorithmic network effects",
          "Navigating the build versus buy strategic dilemma",
        ]}
      />

      {/* ==================================================================
          16 · DATA MOAT FALLACY — a big field of grey data; the same pattern
          turning up in datasets bought and synthesized; crimson data tethered
          to each step of a proprietary workflow.          [quiz topic]
      ================================================================== */}
      <Slide id="data-moat" border align="left">
        <Head eyebrow="Not all data is a moat" signal>
          The Data Moat Fallacy
        </Head>

        <div className="mt-10 grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-14">
          <Reveal delay={140}>
            <p className={BODY}>
              Accumulating massive volumes of generic data does not guarantee a
              durable advantage.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 400 150"
              className="mt-6 w-full"
              fill="none"
            >
              {Array.from({ length: 150 }).map((_, i) => (
                <circle
                  key={i}
                  cx={(8 + hash(i + 400) * 384).toFixed(1)}
                  cy={(6 + hash(i + 900) * 112).toFixed(1)}
                  r="2.2"
                  fill="var(--charcoal)"
                  fillOpacity="0.3"
                />
              ))}
              <text
                {...SVG_LABEL}
                x="0"
                y="144"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                MASSIVE VOLUMES OF GENERIC DATA
              </text>
            </svg>
          </Reveal>

          <Reveal delay={260}>
            <p className={BODY}>
              Competitors can often purchase or synthesize similar datasets.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 400 150"
              className="mt-6 w-full"
              fill="none"
            >
              <text
                {...SVG_LABEL}
                x="200"
                y="12"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                SIMILAR DATASETS
              </text>
              {[
                { x0: 0, label: "GENERIC DATA", crimson: false },
                { x0: 145, label: "PURCHASE", crimson: true },
                { x0: 290, label: "SYNTHESIZE", crimson: true },
              ].map((p, k) => (
                <g key={p.label}>
                  <rect
                    x={p.x0 + 0.5}
                    y="24"
                    width="109"
                    height="92"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.3"
                  />
                  {Array.from({ length: 22 }).map((_, i) => (
                    <circle
                      key={i}
                      cx={(p.x0 + 10 + hash(i + 400) * 90 + (hash(i + k * 97) - 0.5) * 4 * k).toFixed(1)}
                      cy={(32 + hash(i + 900) * 76 + (hash(i + k * 61) - 0.5) * 4 * k).toFixed(1)}
                      r="2.2"
                      fill="var(--charcoal)"
                      fillOpacity="0.4"
                    />
                  ))}
                  <text
                    {...SVG_LABEL}
                    x={p.x0 + 55}
                    y="138"
                    textAnchor="middle"
                    fill={p.crimson ? "var(--crimson)" : "var(--charcoal)"}
                    fillOpacity={p.crimson ? 1 : 0.6}
                  >
                    {p.label}
                  </text>
                </g>
              ))}
            </svg>
          </Reveal>
        </div>

        <Reveal delay={420} className="w-full">
          <div className={RULED}>
            <svg
              aria-hidden
              viewBox="0 0 800 146"
              className="w-full"
              fill="none"
            >
              <text
                {...SVG_LABEL}
                x="0"
                y="12"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                PROPRIETARY WORKFLOWS
              </text>
              {[0, 1, 2, 3].map((i) => {
                const x = i * 210;
                return (
                  <g key={i}>
                    <rect
                      x={x + 0.5}
                      y="24"
                      width="120"
                      height="30"
                      stroke="var(--charcoal)"
                      strokeOpacity="0.6"
                      strokeWidth="1.5"
                    />
                    <text
                      {...SVG_LABEL}
                      x={x + 12}
                      y="43"
                      fill="var(--charcoal)"
                      fillOpacity="0.5"
                    >
                      {pad(i + 1)}
                    </text>
                    {i < 3 && (
                      <>
                        <path
                          d={`M${x + 124} 39H${x + 204}`}
                          stroke="var(--charcoal)"
                          strokeOpacity="0.4"
                        />
                        <path
                          d={`M${x + 197} 34l7 5l-7 5`}
                          stroke="var(--charcoal)"
                          strokeOpacity="0.5"
                        />
                      </>
                    )}
                    <path
                      d={`M${x + 60} 56V80`}
                      stroke="var(--crimson)"
                      strokeOpacity="0.6"
                      strokeDasharray="2 3"
                    />
                    {Array.from({ length: 9 }).map((_, k) => (
                      <circle
                        key={k}
                        cx={(x + 22 + hash(k * 3 + i * 17) * 76).toFixed(1)}
                        cy={(90 + hash(k * 5 + i * 29) * 20).toFixed(1)}
                        r="3"
                        fill="var(--crimson)"
                      />
                    ))}
                  </g>
                );
              })}
              <text {...SVG_LABEL} x="0" y="140" fill="var(--crimson)">
                EXCLUSIVE, DOMAIN-SPECIFIC DATA
              </text>
            </svg>
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              True advantage stems from exclusive, domain-specific data tied to
              proprietary workflows.
            </p>
          </div>
        </Reveal>
      </Slide>

      {/* ==================================================================
          17 · ALGORITHMIC NETWORK EFFECTS — the three-step cycle drawn as a
          loop with the refining step in crimson; a challenger stopped at the
          edge of an established loop.                    [quiz: data-moat]
      ================================================================== */}
      <Slide
        id="network-effects"
        border
        align="left"
        quizData={quiz["network-effects"]}
      >
        <Head eyebrow="Virtuous cycle">Algorithmic Network Effects</Head>

        <div className="mt-10 grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-14">
          <Reveal delay={140}>
            <p className={BODY}>
              The cycle where better algorithms attract more users, generating
              better data.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <p className={BODY}>
              This improved data further refines the algorithms, creating a
              virtuous cycle.
            </p>
          </Reveal>
        </div>

        <Reveal delay={380} className="w-full">
          <svg
            aria-hidden
            viewBox="0 0 800 284"
            className="mt-8 w-full max-w-5xl"
            fill="none"
          >
            <defs>
              <marker
                id="w6-head"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path d="M1 1L9 5L1 9" fill="none" stroke="var(--charcoal)" strokeOpacity="0.6" strokeWidth="1.4" />
              </marker>
              <marker
                id="w6-head-crimson"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path d="M1 1L9 5L1 9" fill="none" stroke="var(--crimson)" strokeWidth="1.6" />
              </marker>
            </defs>
            {(() => {
              const cx = 400;
              const cy = 142;
              const r = 100;
              const pt = (deg: number, rad = r) => {
                const a = (deg * Math.PI) / 180;
                return [
                  (cx + Math.cos(a) * rad).toFixed(1),
                  (cy + Math.sin(a) * rad).toFixed(1),
                ];
              };
              const arcs = [
                { from: -76, to: 16, crimson: false },
                { from: 44, to: 136, crimson: false },
                { from: 164, to: 256, crimson: true },
              ];
              return (
                <g>
                  {arcs.map((a) => {
                    const [x1, y1] = pt(a.from);
                    const [x2, y2] = pt(a.to);
                    return (
                      <path
                        key={a.from}
                        d={`M${x1} ${y1}A${r} ${r} 0 0 1 ${x2} ${y2}`}
                        stroke={a.crimson ? "var(--crimson)" : "var(--charcoal)"}
                        strokeOpacity={a.crimson ? 1 : 0.5}
                        strokeWidth={a.crimson ? 2.5 : 1.5}
                        markerEnd={`url(#${a.crimson ? "w6-head-crimson" : "w6-head"})`}
                      />
                    );
                  })}
                  {[-90, 30, 150].map((deg) => {
                    const [x, y] = pt(deg);
                    return (
                      <circle
                        key={deg}
                        cx={x}
                        cy={y}
                        r="8"
                        fill="var(--surface)"
                        stroke="var(--charcoal)"
                        strokeOpacity="0.7"
                        strokeWidth="1.5"
                      />
                    );
                  })}
                </g>
              );
            })()}
            <text
              {...SVG_LABEL}
              x="400"
              y="24"
              textAnchor="middle"
              fill="var(--charcoal)"
              fillOpacity="0.75"
            >
              BETTER ALGORITHMS
            </text>
            <text
              {...SVG_LABEL}
              x="506"
              y="196"
              fill="var(--charcoal)"
              fillOpacity="0.75"
            >
              MORE USERS
            </text>
            <text
              {...SVG_LABEL}
              x="294"
              y="196"
              textAnchor="end"
              fill="var(--charcoal)"
              fillOpacity="0.75"
            >
              BETTER DATA
            </text>
            <text
              {...SVG_LABEL}
              x="512"
              y="80"
              fill="var(--charcoal)"
              fillOpacity="0.5"
            >
              ATTRACT
            </text>
            <text
              {...SVG_LABEL}
              x="400"
              y="270"
              textAnchor="middle"
              fill="var(--charcoal)"
              fillOpacity="0.5"
            >
              GENERATING
            </text>
            <text
              {...SVG_LABEL}
              x="288"
              y="80"
              textAnchor="end"
              fill="var(--crimson)"
            >
              REFINES
            </text>
            <text
              {...SVG_LABEL}
              x="400"
              y="146"
              textAnchor="middle"
              fill="var(--crimson)"
            >
              VIRTUOUS CYCLE
            </text>
          </svg>
        </Reveal>

        <Reveal delay={500} className="w-full">
          <div className={RULED}>
            <svg
              aria-hidden
              viewBox="0 0 800 112"
              className="w-full"
              fill="none"
            >
              <circle cx="200" cy="52" r="7" fill="var(--crimson)" />
              <path
                d="M214 52H488"
                stroke="var(--crimson)"
                strokeOpacity="0.6"
                strokeDasharray="5 4"
              />
              <path d="M500 32V72" stroke="var(--charcoal)" strokeOpacity="0.7" strokeWidth="2" />
              <circle
                cx="580"
                cy="52"
                r="42"
                stroke="var(--charcoal)"
                strokeOpacity="0.22"
                strokeWidth="12"
              />
              <path
                d="M622 52A42 42 0 0 1 580 94"
                stroke="var(--charcoal)"
                strokeOpacity="0.6"
                strokeWidth="2"
                markerEnd="url(#w6-head)"
              />
              <text
                {...SVG_LABEL}
                x="200"
                y="30"
                fill="var(--crimson)"
              >
                BREAKING INTO MARKETS
              </text>
              <text
                {...SVG_LABEL}
                x="800"
                y="110"
                textAnchor="end"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                ESTABLISHED ALGORITHMIC NETWORK EFFECTS
              </text>
            </svg>
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              Breaking into markets dominated by established algorithmic network
              effects is exceptionally difficult.
            </p>
          </div>
        </Reveal>

        <Discussion delay={620}>
          If a competitor has a five-year head start on algorithmic network
          effects, what asymmetric strategies can a challenger employ?
        </Discussion>
      </Slide>

      {/* ==================================================================
          18 · STRATEGIC POSITIONING — cost leadership and differentiation as
          axes, the traditional trade-off curve between them, and the crimson
          point beyond it that has both; one narrow crimson segment in a row.
      ================================================================== */}
      <Slide id="positioning" border align="left">
        <Head eyebrow="Positioning">Strategic Positioning</Head>

        <div className="mt-10 grid w-full max-w-5xl items-center gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <Reveal delay={140}>
              <p className={BODY}>
                Choosing between competing on cost leadership or
                differentiation using AI.
              </p>
            </Reveal>
            <Reveal delay={260}>
              <p className={`${LEAD} mt-8`}>
                AI can uniquely enable firms to pursue both simultaneously,
                breaking traditional strategic trade-offs.
              </p>
            </Reveal>
          </div>

          <Reveal delay={380}>
            <figure aria-hidden className="w-full">
              <svg viewBox="0 0 400 312" className="w-full" fill="none">
                <path
                  d="M40 8V280H392"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.4"
                />
                <path
                  d="M35 15l5 -7l5 7M385 275l7 5l-7 5"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.5"
                />
                <path
                  d="M56 74C220 84 330 160 364 268"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.6"
                  strokeWidth="2"
                />
                {[
                  [58, 74],
                  [363, 264],
                ].map(([x, y]) => (
                  <circle
                    key={x}
                    cx={x}
                    cy={y}
                    r="6"
                    fill="var(--surface)"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.7"
                    strokeWidth="1.5"
                  />
                ))}
                <path
                  d="M262 134L344 70"
                  stroke="var(--crimson)"
                  strokeOpacity="0.6"
                  strokeDasharray="4 4"
                />
                <circle cx="352" cy="64" r="9" fill="var(--crimson)" />
                <text
                  {...SVG_LABEL}
                  x="392"
                  y="36"
                  textAnchor="end"
                  fill="var(--crimson)"
                >
                  BOTH SIMULTANEOUSLY
                </text>
                <text
                  {...SVG_LABEL}
                  x="240"
                  y="160"
                  textAnchor="end"
                  fill="var(--charcoal)"
                  fillOpacity="0.55"
                >
                  TRADITIONAL
                </text>
                <text
                  {...SVG_LABEL}
                  x="240"
                  y="174"
                  textAnchor="end"
                  fill="var(--charcoal)"
                  fillOpacity="0.55"
                >
                  STRATEGIC TRADE-OFFS
                </text>
                <text
                  {...SVG_LABEL}
                  x="50"
                  y="16"
                  fill="var(--charcoal)"
                  fillOpacity="0.65"
                >
                  DIFFERENTIATION
                </text>
                <text
                  {...SVG_LABEL}
                  x="392"
                  y="304"
                  textAnchor="end"
                  fill="var(--charcoal)"
                  fillOpacity="0.65"
                >
                  COST LEADERSHIP
                </text>
              </svg>
            </figure>
          </Reveal>
        </div>

        <Reveal delay={500} className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              The emergence of the &quot;smart niche&quot; strategy tailored to
              highly specific customer segments.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 800 96"
              className="mt-6 w-full max-w-5xl"
              fill="none"
            >
              {Array.from({ length: 40 }).map((_, i) => (
                <rect
                  key={i}
                  x={i * 20 + 2}
                  y="34"
                  width="16"
                  height="32"
                  fill={i === 27 ? "var(--crimson)" : "none"}
                  stroke={i === 27 ? "var(--crimson)" : "var(--charcoal)"}
                  strokeOpacity={i === 27 ? 1 : 0.3}
                />
              ))}
              <path
                d="M536 26V20H564V26"
                stroke="var(--crimson)"
                strokeOpacity="0.8"
              />
              <text
                {...SVG_LABEL}
                x="550"
                y="12"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                SMART NICHE
              </text>
              <text
                {...SVG_LABEL}
                x="0"
                y="90"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                HIGHLY SPECIFIC CUSTOMER SEGMENTS
              </text>
            </svg>
          </div>
        </Reveal>
      </Slide>

      {/* ==================================================================
          19 · BUILD VERSUS BUY — a plus-and-minus ledger for each side; a map
          of competencies with the core ones marked crimson and built, the
          rest bought.                                     [quiz topic]
      ================================================================== */}
      <Slide id="build-buy" border align="left">
        <Head eyebrow="The dilemma">The Build versus Buy Dilemma</Head>

        <div className="mt-10 grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-14">
          {[
            {
              label: "Buy",
              sentence:
                "Purchasing AI solutions offers speed to market but limits strategic differentiation.",
              ledger: [
                { sign: "+", text: "speed to market" },
                { sign: "−", text: "limits strategic differentiation" },
              ],
            },
            {
              label: "Build",
              sentence:
                "Building custom models requires significant capital and talent but secures proprietary advantage.",
              ledger: [
                { sign: "−", text: "significant capital and talent" },
                { sign: "+", text: "secures proprietary advantage" },
              ],
            },
          ].map((side, i) => (
            <Reveal key={side.label} delay={140 + i * 120}>
              <div className={`${MICRO} text-[var(--champagne)]`}>
                {side.label}
              </div>
              <p className={`${BODY} mt-4`}>{side.sentence}</p>
              <div aria-hidden className="mt-6 border-b border-[var(--charcoal)]/12">
                {side.ledger.map((row) => (
                  <div
                    key={row.text}
                    className="grid grid-cols-[2rem_1fr] items-baseline border-t border-[var(--charcoal)]/12 py-3"
                  >
                    <span
                      className={`font-mono text-lg leading-none ${
                        row.sign === "+"
                          ? "text-[var(--crimson)]"
                          : "text-[var(--charcoal-light)]/50"
                      }`}
                    >
                      {row.sign}
                    </span>
                    <span
                      className={`${TAG} ${
                        row.sign === "+"
                          ? "text-[var(--charcoal)]/80"
                          : "text-[var(--charcoal-light)]/55"
                      }`}
                    >
                      {row.text}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={420} className="w-full">
          <div className={RULED}>
            <p className={`${LEAD} max-w-4xl`}>
              Organizations must map their core competencies to determine where
              to build and where to buy.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 800 136"
              className="mt-7 w-full max-w-5xl"
              fill="none"
            >
              <text {...SVG_LABEL} x="0" y="10" fill="var(--crimson)">
                BUILD
              </text>
              <path d="M0 26V20H240V26" stroke="var(--crimson)" strokeOpacity="0.7" />
              <text
                {...SVG_LABEL}
                x="260"
                y="10"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                BUY
              </text>
              <path
                d="M260 26V20H760V26"
                stroke="var(--charcoal)"
                strokeOpacity="0.4"
              />
              {[0, 1].map((row) =>
                [0, 1, 2, 3, 4, 5].map((col) => {
                  const core = col < 2;
                  return (
                    <rect
                      key={`${row}-${col}`}
                      x={col * 130 + 0.5}
                      y={34 + row * 46}
                      width="110"
                      height="36"
                      fill={core ? "var(--crimson)" : "none"}
                      stroke={core ? "var(--crimson)" : "var(--charcoal)"}
                      strokeOpacity={core ? 1 : 0.35}
                    />
                  );
                }),
              )}
              <text {...SVG_LABEL} x="0" y="134" fill="var(--crimson)">
                CORE COMPETENCIES
              </text>
            </svg>
          </div>
        </Reveal>
      </Slide>

      {/* ==================================================================
          20 · OPEN SOURCE STRATEGY — a firm taking from and giving back to
          the open source commons, one column for each direction; the firm
          resting on an ecosystem it does not control.      [quiz: build-buy]
      ================================================================== */}
      <Slide
        id="open-source"
        border
        align="left"
        quizData={quiz["open-source"]}
      >
        <Head eyebrow="Taking and giving">Open Source Strategy</Head>

        <Reveal delay={140} className="w-full">
          <svg
            aria-hidden
            viewBox="0 0 800 124"
            className="mt-9 w-full max-w-5xl"
            fill="none"
          >
            <circle
              cx="190"
              cy="62"
              r="40"
              stroke="var(--charcoal)"
              strokeOpacity="0.45"
              strokeDasharray="3 4"
            />
            {Array.from({ length: 14 }).map((_, i) => {
              const a = hash(i + 210) * Math.PI * 2;
              const d = Math.sqrt(hash(i + 330)) * 28;
              return (
                <circle
                  key={i}
                  cx={(190 + Math.cos(a) * d).toFixed(1)}
                  cy={(62 + Math.sin(a) * d).toFixed(1)}
                  r="2.5"
                  fill="var(--charcoal)"
                  fillOpacity="0.45"
                />
              );
            })}
            <rect x="590" y="44" width="36" height="36" fill="var(--crimson)" />
            <path
              d="M240 44C330 8 480 8 578 44"
              stroke="var(--charcoal)"
              strokeOpacity="0.5"
            />
            <path d="M567 36l11 8l-13 3" stroke="var(--charcoal)" strokeOpacity="0.6" />
            <path
              d="M578 80C480 116 330 116 240 80"
              stroke="var(--charcoal)"
              strokeOpacity="0.5"
            />
            <path d="M251 88l-11 -8l13 -3" stroke="var(--charcoal)" strokeOpacity="0.6" />
            <text
              {...SVG_LABEL}
              x="409"
              y="14"
              textAnchor="middle"
              fill="var(--charcoal)"
              fillOpacity="0.6"
            >
              LEVERAGING
            </text>
            <text
              {...SVG_LABEL}
              x="409"
              y="120"
              textAnchor="middle"
              fill="var(--charcoal)"
              fillOpacity="0.6"
            >
              CONTRIBUTING
            </text>
            <text
              {...SVG_LABEL}
              x="130"
              y="66"
              textAnchor="end"
              fill="var(--charcoal)"
              fillOpacity="0.7"
            >
              OPEN SOURCE
            </text>
            <text {...SVG_LABEL} x="640" y="66" fill="var(--crimson)">
              THE FIRM
            </text>
          </svg>
        </Reveal>

        <div className="mt-10 grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-14">
          <Reveal delay={260}>
            <div className={`${MICRO} text-[var(--champagne)]`}>Leveraging</div>
            <p className={`${BODY} mt-4`}>
              Leveraging open source models accelerates development and reduces
              fixed costs.
            </p>
            <Terms items={["accelerates development", "reduces fixed costs"]} />
          </Reveal>
          <Reveal delay={380}>
            <div className={`${MICRO} text-[var(--champagne)]`}>
              Contributing
            </div>
            <p className={`${BODY} mt-4`}>
              Contributing to open source can attract top talent and establish
              industry standards.
            </p>
            <Terms
              items={["attract top talent", "establish industry standards"]}
            />
          </Reveal>
        </div>

        <Reveal delay={520} className="w-full">
          <div className={RULED}>
            <svg
              aria-hidden
              viewBox="0 0 800 124"
              className="w-full"
              fill="none"
            >
              <rect x="382" y="10" width="36" height="36" fill="var(--crimson)" />
              <text {...SVG_LABEL} x="432" y="32" fill="var(--crimson)">
                THE FIRM
              </text>
              <path d="M400 46V74" stroke="var(--crimson)" strokeWidth="2" />
              <rect
                x="160"
                y="76"
                width="480"
                height="40"
                stroke="var(--charcoal)"
                strokeOpacity="0.5"
                strokeDasharray="5 5"
              />
              <text
                {...SVG_LABEL}
                x="400"
                y="100"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                EXTERNAL ECOSYSTEMS
              </text>
              <text
                {...SVG_LABEL}
                x="656"
                y="100"
                fill="var(--charcoal)"
                fillOpacity="0.5"
              >
                DOES NOT CONTROL
              </text>
            </svg>
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              The strategic risk involves reliance on external ecosystems that
              the firm does not control.
            </p>
          </div>
        </Reveal>
      </Slide>

      {/* ==================================================================
          21 · DISRUPTIVE AI INNOVATION — a tall wall of scale drawn as a
          ghost, a low crimson wall in its place, and new competitors hopping
          over into the market; what incumbents hold in defence.
      ================================================================== */}
      <Slide id="disruption" border align="left">
        <Head eyebrow="New entrants">Disruptive AI Innovation</Head>

        <div className="mt-10 grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-14">
          <Reveal delay={140}>
            <p className={BODY}>
              Anticipating how AI enables non-traditional competitors to enter
              the market.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <p className={BODY}>
              AI lowers the barriers to entry in industries traditionally
              protected by scale.
            </p>
          </Reveal>
        </div>

        <Reveal delay={380} className="w-full">
          <svg
            aria-hidden
            viewBox="0 0 800 176"
            className="mt-8 w-full max-w-5xl"
            fill="none"
          >
            <rect
              x="460"
              y="16"
              width="20"
              height="134"
              stroke="var(--charcoal)"
              strokeOpacity="0.35"
              strokeDasharray="3 4"
            />
            <text
              {...SVG_LABEL}
              x="448"
              y="24"
              textAnchor="end"
              fill="var(--charcoal)"
              fillOpacity="0.5"
            >
              PROTECTED BY SCALE
            </text>
            <path
              d="M500 34V104"
              stroke="var(--charcoal)"
              strokeOpacity="0.4"
            />
            <path d="M495 96l5 8l5 -8" stroke="var(--charcoal)" strokeOpacity="0.5" />
            <rect x="460" y="118" width="20" height="32" fill="var(--crimson)" />
            <path d="M0 150H800" stroke="var(--charcoal)" strokeOpacity="0.25" />
            <text
              {...SVG_LABEL}
              x="470"
              y="170"
              textAnchor="middle"
              fill="var(--crimson)"
            >
              BARRIERS TO ENTRY
            </text>

            <rect
              x="560"
              y="44"
              width="240"
              height="106"
              stroke="var(--charcoal)"
              strokeOpacity="0.3"
            />
            <text
              {...SVG_LABEL}
              x="800"
              y="34"
              textAnchor="end"
              fill="var(--charcoal)"
              fillOpacity="0.6"
            >
              ENTER THE MARKET
            </text>
            {Array.from({ length: 12 }).map((_, i) => (
              <rect
                key={i}
                x={(574 + hash(i + 70) * 200).toFixed(1)}
                y={(60 + hash(i + 140) * 70).toFixed(1)}
                width="9"
                height="9"
                fill="var(--charcoal)"
                fillOpacity="0.4"
              />
            ))}

            <text
              {...SVG_LABEL}
              x="0"
              y="104"
              fill="var(--charcoal)"
              fillOpacity="0.65"
            >
              NON-TRADITIONAL COMPETITORS
            </text>
            {[120, 200, 280].map((x, i) => (
              <g key={x}>
                <circle
                  cx={x}
                  cy="136"
                  r="7"
                  stroke="var(--crimson)"
                  strokeWidth="2"
                />
                {i === 2 && (
                  <>
                    <path
                      d="M292 130C380 60 540 60 596 112"
                      stroke="var(--crimson)"
                      strokeOpacity="0.7"
                      strokeDasharray="5 4"
                    />
                    <path
                      d="M584 108l12 4l-3 -12"
                      stroke="var(--crimson)"
                      strokeOpacity="0.8"
                    />
                    <circle
                      cx="610"
                      cy="120"
                      r="7"
                      stroke="var(--crimson)"
                      strokeWidth="2"
                    />
                  </>
                )}
              </g>
            ))}
          </svg>
        </Reveal>

        <Reveal delay={500} className="w-full">
          <div className={RULED}>
            <div className={`${MICRO} text-[var(--champagne)]`}>Incumbents</div>
            <p className={`${DISPLAY} mt-4 max-w-4xl`}>
              Incumbents must leverage their existing customer base and domain
              expertise defensively.
            </p>
            <Terms
              items={["existing customer base", "domain expertise"]}
              className="mt-6"
            />
          </div>
        </Reveal>
      </Slide>

      <PartPlate
        id="part-4"
        numeral="4"
        title="AI Operating Models and Organization"
        lines={[
          "Structuring the firm for AI readiness",
          "Aligning talent, technology, and organizational design",
          "Fostering an AI-native corporate culture",
        ]}
      />

      {/* ==================================================================
          23 · AI OPERATING MODEL — the same people sorted into three silos,
          then regrouped into mixed crimson squads; the three roles named; a
          coil that loops quickly while climbing.            [quiz topic]
      ================================================================== */}
      <Slide id="operating-model" border align="left">
        <Head eyebrow="Operating model">The AI Operating Model</Head>

        {(() => {
          const glyph = (kind: number, x: number, y: number, stroke: string) => {
            if (kind === 0)
              return <circle cx={x} cy={y} r="7" stroke={stroke} strokeWidth="1.5" />;
            if (kind === 1)
              return (
                <rect
                  x={x - 6.5}
                  y={y - 6.5}
                  width="13"
                  height="13"
                  stroke={stroke}
                  strokeWidth="1.5"
                />
              );
            return (
              <path
                d={`M${x} ${y - 8}L${x + 8} ${y}L${x} ${y + 8}L${x - 8} ${y}Z`}
                stroke={stroke}
                strokeWidth="1.5"
              />
            );
          };

          return (
            <>
              <Reveal delay={140} className="w-full">
                <p className={`${BODY} mt-9 max-w-4xl`}>
                  Shifting from siloed departments to cross-functional,
                  product-oriented squads.
                </p>
                <svg
                  aria-hidden
                  viewBox="0 0 800 176"
                  className="mt-7 w-full max-w-5xl"
                  fill="none"
                >
                  {[0, 1, 2].map((kind) => (
                    <g key={kind}>
                      <rect
                        x={kind * 115 + 0.5}
                        y="8"
                        width="100"
                        height="136"
                        fill="var(--charcoal)"
                        fillOpacity="0.04"
                        stroke="var(--charcoal)"
                        strokeOpacity="0.45"
                      />
                      {[0, 1, 2, 3, 4, 5].map((k) => (
                        <g key={k}>
                          {glyph(
                            kind,
                            kind * 115 + 30 + (k % 2) * 40,
                            30 + Math.floor(k / 2) * 44,
                            "var(--charcoal)",
                          )}
                        </g>
                      ))}
                    </g>
                  ))}
                  <text
                    {...SVG_LABEL}
                    x="0"
                    y="168"
                    fill="var(--charcoal)"
                    fillOpacity="0.6"
                  >
                    SILOED DEPARTMENTS
                  </text>

                  <path d="M370 76H420" stroke="var(--charcoal)" strokeOpacity="0.45" />
                  <path d="M412 70l8 6l-8 6" stroke="var(--charcoal)" strokeOpacity="0.6" />

                  {[0, 1, 2].map((s) => {
                    const x0 = 452 + s * 118;
                    return (
                      <g key={s}>
                        <rect
                          x={x0 + 0.5}
                          y="36"
                          width="104"
                          height="80"
                          rx="6"
                          stroke="var(--crimson)"
                          strokeWidth="1.5"
                        />
                        {glyph(0, x0 + 30, 60, "var(--charcoal)")}
                        {glyph(1, x0 + 74, 60, "var(--charcoal)")}
                        {glyph(2, x0 + 52, 94, "var(--charcoal)")}
                      </g>
                    );
                  })}
                  <text
                    {...SVG_LABEL}
                    x="800"
                    y="168"
                    textAnchor="end"
                    fill="var(--crimson)"
                  >
                    CROSS-FUNCTIONAL, PRODUCT-ORIENTED SQUADS
                  </text>
                </svg>
              </Reveal>

              <Reveal delay={300} className="w-full">
                <div className={RULED}>
                  <p className={`${BODY} max-w-4xl`}>
                    Integrating data engineering, data science, and business
                    strategy roles.
                  </p>
                  <svg
                    aria-hidden
                    viewBox="0 0 800 28"
                    className="mt-6 w-full max-w-4xl"
                    fill="none"
                  >
                    {["DATA ENGINEERING", "DATA SCIENCE", "BUSINESS STRATEGY"].map(
                      (role, kind) => (
                        <g key={role}>
                          {glyph(kind, kind * 270 + 10, 14, "var(--charcoal)")}
                          <text
                            {...SVG_LABEL}
                            x={kind * 270 + 30}
                            y="18"
                            fill="var(--charcoal)"
                            fillOpacity="0.65"
                          >
                            {role}
                          </text>
                        </g>
                      ),
                    )}
                  </svg>
                </div>
              </Reveal>
            </>
          );
        })()}

        <Reveal delay={440} className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <figure aria-hidden className="w-full">
              <svg viewBox="0 0 800 120" className="w-full" fill="none">
                <path
                  d={Array.from({ length: 481 })
                    .map((_, i) => {
                      const t = i / 480;
                      const w = 2 * Math.PI * 8 * t;
                      const x = 30 + 730 * t - 22 * Math.sin(w);
                      const y = 86 - 52 * t - 18 * Math.cos(w);
                      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
                    })
                    .join("")}
                  stroke="var(--crimson)"
                  strokeWidth="1.75"
                />
                <text
                  {...SVG_LABEL}
                  x="0"
                  y="116"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  RAPID ITERATION
                </text>
                <text
                  {...SVG_LABEL}
                  x="800"
                  y="10"
                  textAnchor="end"
                  fill="var(--crimson)"
                >
                  CONTINUOUS LEARNING
                </text>
              </svg>
              <Schematic />
            </figure>
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              The operating model must optimize for rapid iteration and
              continuous learning.
            </p>
          </div>
        </Reveal>
      </Slide>

      {/* ==================================================================
          24 · CENTRALIZED VERSUS DECENTRALIZED — one crimson hub wired to
          every unit, against units that each hold their own crimson
          capability; a level balance resting on the hybrid.
                                              [quiz: operating-model]
      ================================================================== */}
      <Slide
        id="centralized"
        border
        align="left"
        quizData={quiz["centralized"]}
      >
        <Head eyebrow="Where AI sits">Centralized versus Decentralized AI</Head>

        <div className="mt-10 grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-14">
          <Reveal delay={140}>
            <div className={`${MICRO} text-[var(--champagne)]`}>Centralized</div>
            <p className={`${BODY} mt-4`}>
              Centralized centers of excellence ensure standard practices and
              resource efficiency.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 400 170"
              className="mt-6 w-full"
              fill="none"
            >
              {Array.from({ length: 6 }).map((_, k) => {
                const a = (k / 6) * Math.PI * 2 - Math.PI / 2;
                const x = 200 + Math.cos(a) * 66;
                const y = 76 + Math.sin(a) * 60;
                return (
                  <g key={k}>
                    <path
                      d={`M200 76L${x.toFixed(1)} ${y.toFixed(1)}`}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.35"
                    />
                    <rect
                      x={(x - 9).toFixed(1)}
                      y={(y - 9).toFixed(1)}
                      width="18"
                      height="18"
                      fill="var(--surface)"
                      stroke="var(--charcoal)"
                      strokeOpacity="0.6"
                    />
                  </g>
                );
              })}
              <rect x="188" y="64" width="24" height="24" fill="var(--crimson)" />
              <text
                {...SVG_LABEL}
                x="200"
                y="164"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                CENTERS OF EXCELLENCE
              </text>
            </svg>
            <Terms items={["standard practices", "resource efficiency"]} />
          </Reveal>

          <Reveal delay={260}>
            <div className={`${MICRO} text-[var(--champagne)]`}>
              Decentralized
            </div>
            <p className={`${BODY} mt-4`}>
              Decentralized teams embed AI capabilities directly into business
              units for faster execution.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 400 170"
              className="mt-6 w-full"
              fill="none"
            >
              {[110, 200, 290].map((x) =>
                [46, 110].map((y) => (
                  <g key={`${x}-${y}`}>
                    <rect
                      x={x - 22}
                      y={y - 22}
                      width="44"
                      height="44"
                      stroke="var(--charcoal)"
                      strokeOpacity="0.55"
                    />
                    <circle cx={x} cy={y} r="6" fill="var(--crimson)" />
                  </g>
                )),
              )}
              <text
                {...SVG_LABEL}
                x="200"
                y="164"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                BUSINESS UNITS
              </text>
            </svg>
            <Terms items={["faster execution"]} />
          </Reveal>
        </div>

        <Reveal delay={420} className="w-full">
          <div className={RULED}>
            <svg
              aria-hidden
              viewBox="0 0 800 134"
              className="w-full max-w-4xl"
              fill="none"
            >
              <path
                d="M180 50H620"
                stroke="var(--charcoal)"
                strokeOpacity="0.7"
                strokeWidth="2"
              />
              {[180, 620].map((x) => (
                <path
                  key={x}
                  d={`M${x} 50L${x - 28} 86M${x} 50L${x + 28} 86M${x - 36} 86H${x + 36}`}
                  stroke="var(--charcoal)"
                  strokeOpacity="0.55"
                />
              ))}
              <path d="M400 52L424 104H376Z" fill="var(--crimson)" />
              <text
                {...SVG_LABEL}
                x="180"
                y="108"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.7"
              >
                GOVERNANCE
              </text>
              <text
                {...SVG_LABEL}
                x="620"
                y="108"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.7"
              >
                AGILITY
              </text>
              <text
                {...SVG_LABEL}
                x="400"
                y="126"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                HYBRID APPROACH
              </text>
            </svg>
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              A hybrid approach often balances governance with agility.
            </p>
          </div>
        </Reveal>
      </Slide>

      {/* ==================================================================
          25 · TALENT STRATEGY — four crimson marks in a wide grey field;
          upskilling set equal to hiring; a crimson bridge across the gap
          between technical and business teams.
      ================================================================== */}
      <Slide id="talent" border align="left">
        <Head eyebrow="Talent">Talent Strategy and Acquisition</Head>

        <Reveal delay={140} className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            The scarcity of specialized AI talent requires innovative
            recruitment and retention strategies.
          </p>
          <svg
            aria-hidden
            viewBox="0 0 800 98"
            className="mt-7 w-full max-w-5xl"
            fill="none"
          >
            {Array.from({ length: 220 }).map((_, i) => (
              <circle
                key={i}
                cx={(6 + hash(i + 1200) * 788).toFixed(1)}
                cy={(6 + hash(i + 1700) * 64).toFixed(1)}
                r="2"
                fill="var(--charcoal)"
                fillOpacity="0.22"
              />
            ))}
            {[
              [130, 30],
              [410, 52],
              [566, 16],
              [724, 44],
            ].map(([x, y]) => (
              <circle key={x} cx={x} cy={y} r="5" fill="var(--crimson)" />
            ))}
            <text {...SVG_LABEL} x="0" y="94" fill="var(--crimson)">
              SPECIALIZED AI TALENT
            </text>
          </svg>
          <Terms items={["recruitment", "retention"]} />
        </Reveal>

        <Reveal delay={300} className="w-full">
          <div className={RULED}>
            <div
              aria-hidden
              className="flex flex-wrap items-center gap-x-8 gap-y-3"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--crimson)]">
                upskilling the existing workforce
              </span>
              <span className="font-serif text-4xl font-light text-[var(--charcoal)]/35">
                =
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--charcoal-light)]/60">
                hiring new experts
              </span>
            </div>
            <p className={`${LEAD} mt-6 max-w-4xl`}>
              Upskilling the existing workforce is as critical as hiring new
              experts.
            </p>
          </div>
        </Reveal>

        <Reveal delay={440} className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <p className={`${BODY} max-w-4xl`}>
              Building a culture that bridges the communication gap between
              technical and business teams.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 800 124"
              className="mt-6 w-full"
              fill="none"
            >
              <path
                d="M0 70H260V120M800 70H540V120"
                stroke="var(--charcoal)"
                strokeOpacity="0.55"
                strokeWidth="1.5"
              />
              <path d="M0 70H260V124H0ZM540 70H800V124H540Z" fill="var(--charcoal)" fillOpacity="0.06" />
              <path
                d="M252 70Q400 4 548 70"
                stroke="var(--crimson)"
                strokeWidth="2.5"
              />
              <path d="M252 70H548" stroke="var(--crimson)" strokeWidth="1.5" />
              {[300, 350, 400, 450, 500].map((x) => {
                const t = (x - 252) / 296;
                const y = (1 - t) * (1 - t) * 70 + 2 * (1 - t) * t * 4 + t * t * 70;
                return (
                  <path
                    key={x}
                    d={`M${x} ${y.toFixed(1)}V70`}
                    stroke="var(--crimson)"
                    strokeOpacity="0.5"
                  />
                );
              })}
              <text
                {...SVG_LABEL}
                x="0"
                y="58"
                fill="var(--charcoal)"
                fillOpacity="0.7"
              >
                TECHNICAL TEAMS
              </text>
              <text
                {...SVG_LABEL}
                x="800"
                y="58"
                textAnchor="end"
                fill="var(--charcoal)"
                fillOpacity="0.7"
              >
                BUSINESS TEAMS
              </text>
              <text
                {...SVG_LABEL}
                x="400"
                y="108"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.5"
              >
                COMMUNICATION GAP
              </text>
            </svg>
          </div>
        </Reveal>

        <Discussion delay={560}>
          Should business units have their own data scientists, or should they
          request resources from a central pool, and how does this impact
          strategic alignment?
        </Discussion>
      </Slide>

      {/* ==================================================================
          26 · AGILE AI DEVELOPMENT — a fixed waterfall beside a fan of
          uncertain paths; a quick run of prototypes, several struck, the
          last one crimson; a small square growing to full scale.
      ================================================================== */}
      <Slide id="agile" border align="left">
        <Head eyebrow="Method">Agile AI Development</Head>

        <Reveal delay={140} className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Traditional software development methodologies are insufficient for
            probabilistic AI projects.
          </p>
          <svg
            aria-hidden
            viewBox="0 0 800 144"
            className="mt-7 w-full max-w-5xl"
            fill="none"
          >
            {[0, 1, 2, 3].map((i) => (
              <g key={i}>
                <rect
                  x={10 + i * 80}
                  y={8 + i * 24}
                  width="70"
                  height="16"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.55"
                />
                {i < 3 && (
                  <path
                    d={`M${80 + i * 80} ${16 + i * 24}H${90 + i * 80 + 25}V${32 + i * 24}`}
                    stroke="var(--charcoal)"
                    strokeOpacity="0.4"
                  />
                )}
              </g>
            ))}
            <text
              {...SVG_LABEL}
              x="0"
              y="124"
              fill="var(--charcoal)"
              fillOpacity="0.6"
            >
              TRADITIONAL SOFTWARE
            </text>
            <text
              {...SVG_LABEL}
              x="0"
              y="138"
              fill="var(--charcoal)"
              fillOpacity="0.6"
            >
              DEVELOPMENT METHODOLOGIES
            </text>

            <path
              d="M400 8V110"
              stroke="var(--charcoal)"
              strokeOpacity="0.15"
              strokeDasharray="3 5"
            />

            <circle cx="452" cy="58" r="5" fill="var(--crimson)" />
            {[12, 30, 46, 58, 72, 88, 106].map((y, k) => (
              <path
                key={y}
                d={`M456 58C560 58 640 ${(58 + (y - 58) * 0.4).toFixed(1)} 790 ${y}`}
                stroke="var(--crimson)"
                strokeOpacity={(0.3 + hash(k + 500) * 0.6).toFixed(2)}
              />
            ))}
            <text
              {...SVG_LABEL}
              x="800"
              y="138"
              textAnchor="end"
              fill="var(--crimson)"
            >
              PROBABILISTIC AI PROJECTS
            </text>
          </svg>
        </Reveal>

        <Reveal delay={300} className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Embracing experimentation, failure, and rapid prototyping.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 800 92"
              className="mt-6 w-full max-w-5xl"
              fill="none"
            >
              {Array.from({ length: 7 }).map((_, i) => {
                const x = 20 + i * 120;
                const failed = [1, 3, 4].includes(i);
                const last = i === 6;
                return (
                  <g key={i}>
                    <rect
                      x={x}
                      y="24"
                      width="30"
                      height="30"
                      fill={last ? "var(--crimson)" : "none"}
                      stroke={last ? "var(--crimson)" : "var(--charcoal)"}
                      strokeOpacity={last ? 1 : failed ? 0.3 : 0.6}
                    />
                    {failed && (
                      <path
                        d={`M${x + 7} 31l16 16M${x + 23} 31l-16 16`}
                        stroke="var(--charcoal)"
                        strokeOpacity="0.55"
                      />
                    )}
                    {i < 6 && (
                      <>
                        <path
                          d={`M${x + 38} 39H${x + 110}`}
                          stroke="var(--charcoal)"
                          strokeOpacity="0.3"
                        />
                        <path
                          d={`M${x + 104} 35l6 4l-6 4`}
                          stroke="var(--charcoal)"
                          strokeOpacity="0.45"
                        />
                      </>
                    )}
                  </g>
                );
              })}
              <text
                {...SVG_LABEL}
                x="20"
                y="84"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                EXPERIMENTATION
              </text>
              <text
                {...SVG_LABEL}
                x="395"
                y="84"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                FAILURE
              </text>
              <text
                {...SVG_LABEL}
                x="770"
                y="84"
                textAnchor="end"
                fill="var(--crimson)"
              >
                RAPID PROTOTYPING
              </text>
            </svg>
          </div>
        </Reveal>

        <Reveal delay={440} className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <figure aria-hidden className="w-full">
              <svg viewBox="0 0 800 104" className="w-full" fill="none">
                {[
                  { x: 20, s: 14 },
                  { x: 170, s: 24 },
                  { x: 330, s: 38 },
                  { x: 500, s: 56 },
                  { x: 680, s: 80 },
                ].map((b, i, all) => (
                  <g key={b.x}>
                    <rect
                      x={b.x}
                      y={96 - b.s}
                      width={b.s}
                      height={b.s}
                      fill={i === 4 ? "var(--crimson)" : "none"}
                      stroke={i === 4 ? "var(--crimson)" : "var(--charcoal)"}
                      strokeOpacity={i === 4 ? 1 : 0.35 + i * 0.1}
                    />
                    {i < 4 && (
                      <>
                        <path
                          d={`M${b.x + b.s + 10} 84H${all[i + 1].x - 10}`}
                          stroke="var(--charcoal)"
                          strokeOpacity="0.3"
                        />
                        <path
                          d={`M${all[i + 1].x - 16} 80l6 4l-6 4`}
                          stroke="var(--charcoal)"
                          strokeOpacity="0.45"
                        />
                      </>
                    )}
                  </g>
                ))}
                <text
                  {...SVG_LABEL}
                  x="0"
                  y="68"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  PROOF OF CONCEPT
                </text>
                <text
                  {...SVG_LABEL}
                  x="800"
                  y="10"
                  textAnchor="end"
                  fill="var(--crimson)"
                >
                  ENTERPRISE SCALE DEPLOYMENT
                </text>
              </svg>
              <Schematic />
            </figure>
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              Managing the lifecycle from proof of concept to enterprise scale
              deployment.
            </p>
          </div>
        </Reveal>
      </Slide>

      {/* ==================================================================
          27 · DATA GOVERNANCE AS STRATEGY — compliance set beside enabler;
          one data asset traced back to its source, checked, and opened to
          the organization; every asset with its own crimson owner.
      ================================================================== */}
      <Slide id="governance" border align="left">
        <Head eyebrow="Governance">Data Governance as Strategy</Head>

        <Reveal delay={140} className="w-full">
          <div className="mt-10 w-full max-w-5xl">
            <Split left="Just a compliance function" right="Strategic enabler" />
            <p className={`${LEAD} mt-6 max-w-4xl`}>
              Data governance is no longer just a compliance function; it is a
              strategic enabler.
            </p>
          </div>
        </Reveal>

        <Reveal delay={300} className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Ensuring data quality, lineage, and accessibility across the
              organization.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 800 124"
              className="mt-6 w-full max-w-5xl"
              fill="none"
            >
              <ellipse
                cx="45"
                cy="44"
                rx="25"
                ry="6"
                stroke="var(--charcoal)"
                strokeOpacity="0.6"
              />
              <path
                d="M20 44V80A25 6 0 0 0 70 80V44"
                stroke="var(--charcoal)"
                strokeOpacity="0.6"
              />
              <path d="M82 62H548" stroke="var(--crimson)" strokeWidth="2" />
              {[200, 320, 440].map((x) => (
                <circle
                  key={x}
                  cx={x}
                  cy="62"
                  r="6"
                  fill="var(--surface)"
                  stroke="var(--crimson)"
                  strokeWidth="2"
                />
              ))}
              <text
                {...SVG_LABEL}
                x="320"
                y="42"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                LINEAGE
              </text>
              <rect
                x="552"
                y="42"
                width="40"
                height="40"
                stroke="var(--charcoal)"
                strokeOpacity="0.7"
                strokeWidth="1.5"
              />
              <path
                d="M562 22l6 6l12 -12"
                stroke="var(--charcoal)"
                strokeOpacity="0.7"
                strokeWidth="2"
              />
              <text
                {...SVG_LABEL}
                x="586"
                y="26"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                DATA QUALITY
              </text>
              {[14, 36, 58, 80, 102].map((y) => (
                <g key={y}>
                  <path
                    d={`M596 62L734 ${y}`}
                    stroke="var(--charcoal)"
                    strokeOpacity="0.3"
                  />
                  <circle
                    cx="740"
                    cy={y}
                    r="5"
                    fill="var(--surface)"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.6"
                  />
                </g>
              ))}
              <text
                {...SVG_LABEL}
                x="800"
                y="122"
                textAnchor="end"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                ACCESSIBILITY
              </text>
            </svg>
          </div>
        </Reveal>

        <Reveal delay={440} className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <svg
              aria-hidden
              viewBox="0 0 800 110"
              className="w-full"
              fill="none"
            >
              <text {...SVG_LABEL} x="0" y="26" fill="var(--crimson)">
                CLEAR OWNERSHIP
              </text>
              <text
                {...SVG_LABEL}
                x="0"
                y="92"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                DATA ASSETS
              </text>
              {[220, 360, 500, 640, 780].map((x) => (
                <g key={x}>
                  <circle cx={x} cy="22" r="7" fill="var(--crimson)" />
                  <path
                    d={`M${x} 30V64`}
                    stroke="var(--crimson)"
                    strokeOpacity="0.5"
                  />
                  <ellipse
                    cx={x}
                    cy="70"
                    rx="18"
                    ry="5"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.6"
                  />
                  <path
                    d={`M${x - 18} 70V96A18 5 0 0 0 ${x + 18} 96V70`}
                    stroke="var(--charcoal)"
                    strokeOpacity="0.6"
                  />
                </g>
              ))}
            </svg>
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              Establishing clear ownership and accountability for data assets.
            </p>
          </div>
        </Reveal>
      </Slide>

      {/* ==================================================================
          28 · CULTIVATING AN AI CULTURE — one certain spike against a crimson
          spread of outcomes; a crimson mark on every tier of the hierarchy;
          an automated decision passing through a wall of resistance.
      ================================================================== */}
      <Slide id="culture" border align="left">
        <Head eyebrow="Culture">Cultivating an AI Culture</Head>

        <Reveal delay={140} className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Shifting the organizational mindset from deterministic rules to
            probabilistic outcomes.
          </p>
          <figure aria-hidden className="mt-7 w-full max-w-5xl">
            <svg viewBox="0 0 800 128" className="w-full" fill="none">
              <path d="M20 96H340" stroke="var(--charcoal)" strokeOpacity="0.3" />
              <path
                d="M180 96V18"
                stroke="var(--charcoal)"
                strokeOpacity="0.7"
                strokeWidth="2"
              />
              <circle cx="180" cy="18" r="5" fill="var(--charcoal)" fillOpacity="0.7" />
              <text
                {...SVG_LABEL}
                x="20"
                y="122"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                DETERMINISTIC RULES
              </text>

              <path d="M376 58H424" stroke="var(--charcoal)" strokeOpacity="0.45" />
              <path d="M416 52l8 6l-8 6" stroke="var(--charcoal)" strokeOpacity="0.6" />

              <path d="M460 96H780" stroke="var(--charcoal)" strokeOpacity="0.3" />
              <path
                d={Array.from({ length: 65 })
                  .map((_, i) => {
                    const x = 460 + i * 5;
                    const y = 96 - 78 * Math.exp(-(((x - 620) / 58) ** 2));
                    return `${i === 0 ? "M" : "L"}${x} ${y.toFixed(1)}`;
                  })
                  .join("")}
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <text
                {...SVG_LABEL}
                x="780"
                y="122"
                textAnchor="end"
                fill="var(--crimson)"
              >
                PROBABILISTIC OUTCOMES
              </text>
            </svg>
            <Schematic />
          </figure>
        </Reveal>

        <Reveal delay={300} className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Encouraging data-driven decision making at all levels of the
              hierarchy.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 800 140"
              className="mt-6 w-full max-w-5xl"
              fill="none"
            >
              <path
                d="M400 8L570 128H230Z"
                stroke="var(--charcoal)"
                strokeOpacity="0.55"
                strokeWidth="1.5"
              />
              {[38, 68, 98].map((y) => {
                const w = ((y - 8) / 120) * 170;
                return (
                  <path
                    key={y}
                    d={`M${(400 - w).toFixed(1)} ${y}H${(400 + w).toFixed(1)}`}
                    stroke="var(--charcoal)"
                    strokeOpacity="0.35"
                  />
                );
              })}
              {[28, 55, 84, 114].map((y) => (
                <circle key={y} cx="400" cy={y} r="5" fill="var(--crimson)" />
              ))}
              <text
                {...SVG_LABEL}
                x="0"
                y="72"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                ALL LEVELS OF THE HIERARCHY
              </text>
              <text
                {...SVG_LABEL}
                x="800"
                y="72"
                textAnchor="end"
                fill="var(--crimson)"
              >
                DATA-DRIVEN DECISION MAKING
              </text>
            </svg>
          </div>
        </Reveal>

        <Reveal delay={440} className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <svg
              aria-hidden
              viewBox="0 0 800 100"
              className="w-full"
              fill="none"
            >
              <rect
                x="360"
                y="10"
                width="80"
                height="70"
                fill="var(--charcoal)"
                fillOpacity="0.06"
                stroke="var(--charcoal)"
                strokeOpacity="0.5"
              />
              {Array.from({ length: 9 }).map((_, k) => (
                <path
                  key={k}
                  d={`M${368 + k * 8} 10V80`}
                  stroke="var(--charcoal)"
                  strokeOpacity="0.2"
                />
              ))}
              <path d="M60 45H744" stroke="var(--crimson)" strokeWidth="2.5" />
              <path d="M736 38l10 7l-10 7" stroke="var(--crimson)" strokeWidth="2.5" />
              <text {...SVG_LABEL} x="0" y="30" fill="var(--crimson)">
                AUTOMATED DECISION SYSTEMS
              </text>
              <text
                {...SVG_LABEL}
                x="400"
                y="96"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                INSTITUTIONAL RESISTANCE
              </text>
            </svg>
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              Overcoming institutional resistance to automated decision
              systems.
            </p>
          </div>
        </Reveal>
      </Slide>

      <PartPlate
        id="part-5"
        numeral="5"
        title="Strategy Execution and Risk Management"
        lines={[
          "Translating AI strategy into operational reality",
          "Navigating the ethical, legal, and operational risks",
          "Ensuring long-term strategic resilience",
        ]}
      />

      {/* ==================================================================
          30 · THE EXECUTION GAP — eight pilots, two arcing across to
          production and six dropping into the gap; a deployment whose teeth
          miss the legacy system's slots; the two things execution needs.
                                                          [quiz topic]
      ================================================================== */}
      <Slide id="execution-gap" border align="left">
        <Head eyebrow="Pilot to production" signal>
          The Execution Gap
        </Head>

        <Reveal delay={140} className="w-full">
          <p className={`${LEAD} mt-9 max-w-4xl`}>
            Many AI strategies fail during the transition from pilot to
            production.
          </p>
          <figure aria-hidden className="mt-7 w-full max-w-5xl">
            <svg viewBox="0 0 800 172" className="w-full" fill="none">
              <path
                d="M0 60H300V172M800 60H500V172"
                stroke="var(--charcoal)"
                strokeOpacity="0.5"
                strokeWidth="1.5"
              />
              <path
                d="M0 60H300V172H0ZM500 60H800V172H500Z"
                fill="var(--charcoal)"
                fillOpacity="0.05"
              />
              {Array.from({ length: 8 }).map((_, i) => {
                const x = 40 + i * 34;
                const k = [2, 6].indexOf(i);
                const made = k >= 0;
                const target = 580 + k * 110;
                return (
                  <g key={i}>
                    <path
                      d={
                        made
                          ? `M${x} 52C${x + 150} 4 ${target - 150} 4 ${target} 52`
                          : `M${x} 52C${x + 140} 24 ${330 + i * 18} 70 ${322 + i * 22} 146`
                      }
                      stroke={made ? "var(--crimson)" : "var(--charcoal)"}
                      strokeOpacity={made ? 0.9 : 0.3}
                      strokeWidth={made ? 2 : 1}
                      strokeDasharray={made ? undefined : "3 4"}
                    />
                    <circle
                      cx={x}
                      cy="52"
                      r="4"
                      fill={made ? "var(--crimson)" : "var(--charcoal)"}
                      fillOpacity={made ? 1 : 0.5}
                    />
                    {made && (
                      <circle cx={target} cy="52" r="5" fill="var(--crimson)" />
                    )}
                  </g>
                );
              })}
              <text
                {...SVG_LABEL}
                x="12"
                y="88"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                PILOT
              </text>
              <text
                {...SVG_LABEL}
                x="788"
                y="88"
                textAnchor="end"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                PRODUCTION
              </text>
              <text
                {...SVG_LABEL}
                x="400"
                y="166"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                FAIL
              </text>
            </svg>
            <Schematic />
          </figure>
        </Reveal>

        <Reveal delay={300} className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Lack of integration with legacy systems often stalls deployment.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 800 104"
              className="mt-6 w-full max-w-5xl"
              fill="none"
            >
              <text
                {...SVG_LABEL}
                x="60"
                y="36"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                DEPLOYMENT
              </text>
              <path
                d="M60 50H420M420 34V66M420 40H434M420 60H434"
                stroke="var(--charcoal)"
                strokeOpacity="0.7"
                strokeWidth="2"
              />
              <path
                d="M440 20H640V80H440V74H452V66H440V34H452V26H440Z"
                fill="var(--charcoal)"
                fillOpacity="0.06"
                stroke="var(--charcoal)"
                strokeOpacity="0.6"
                strokeWidth="1.5"
              />
              <text
                {...SVG_LABEL}
                x="546"
                y="54"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.7"
              >
                LEGACY SYSTEMS
              </text>
              <path
                d="M430 86V98"
                stroke="var(--crimson)"
                strokeOpacity="0.6"
              />
              <text
                {...SVG_LABEL}
                x="428"
                y="12"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                STALLS
              </text>
              <text
                {...SVG_LABEL}
                x="440"
                y="100"
                fill="var(--crimson)"
              >
                LACK OF INTEGRATION
              </text>
            </svg>
          </div>
        </Reveal>

        <Reveal delay={440} className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <p className={`${DISPLAY} max-w-4xl`}>
              Successful execution requires rigorous change management and
              stakeholder alignment.
            </p>
            <Steps
              items={["rigorous change management", "stakeholder alignment"]}
              cols="md:grid-cols-2"
              mark={1}
              className="mt-6 max-w-2xl"
            />
          </div>
        </Reveal>
      </Slide>

      {/* ==================================================================
          31 · MANAGING ALGORITHMIC RISK — the environment shifts and the
          model line starts to sink; drift caught where it crosses a
          threshold; a crimson fallback routed around a failed system.
                                                [quiz: execution-gap]
      ================================================================== */}
      <Slide
        id="algorithmic-risk"
        border
        align="left"
        quizData={quiz["algorithmic-risk"]}
      >
        <Head eyebrow="Model drift">Managing Algorithmic Risk</Head>

        <Reveal delay={140} className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            AI models can degrade over time as the external environment changes.
          </p>
          <figure aria-hidden className="mt-7 w-full max-w-5xl">
            <svg viewBox="0 0 800 150" className="w-full" fill="none">
              <path
                d={Array.from({ length: 81 })
                  .map((_, i) => {
                    const x = i * 10;
                    const y = 34 + 24 / (1 + Math.exp(-(x - 380) / 14));
                    return `${i === 0 ? "M" : "L"}${x} ${y.toFixed(1)}`;
                  })
                  .join("")}
                stroke="var(--charcoal)"
                strokeOpacity="0.6"
                strokeWidth="2"
              />
              <path
                d="M0 96H360"
                stroke="var(--charcoal)"
                strokeOpacity="0.6"
                strokeWidth="2"
              />
              <path
                d={Array.from({ length: 45 })
                  .map((_, i) => {
                    const x = 360 + i * 10;
                    const t = (x - 360) / 440;
                    const y = 96 + 40 * t * t * (3 - 2 * t);
                    return `${i === 0 ? "M" : "L"}${Math.min(x, 800)} ${y.toFixed(1)}`;
                  })
                  .join("")}
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <path
                d="M380 8V142"
                stroke="var(--charcoal)"
                strokeOpacity="0.25"
                strokeDasharray="3 4"
              />
              <text
                {...SVG_LABEL}
                x="0"
                y="22"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                EXTERNAL ENVIRONMENT
              </text>
              <text
                {...SVG_LABEL}
                x="392"
                y="22"
                fill="var(--charcoal)"
                fillOpacity="0.75"
              >
                CHANGES
              </text>
              <text
                {...SVG_LABEL}
                x="0"
                y="84"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                AI MODELS
              </text>
              <text
                {...SVG_LABEL}
                x="560"
                y="96"
                fill="var(--crimson)"
              >
                DEGRADE OVER TIME
              </text>
            </svg>
            <Schematic />
          </figure>
        </Reveal>

        <div className="mt-12 grid w-full max-w-5xl gap-10 border-t border-[var(--charcoal)]/10 pt-8 md:grid-cols-2 md:gap-14">
          <Reveal delay={300}>
            <p className={BODY}>
              Implementing robust monitoring systems to detect model drift and
              data bias.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 400 130"
              className="mt-6 w-full"
              fill="none"
            >
              <path
                d="M0 70H400"
                stroke="var(--charcoal)"
                strokeOpacity="0.45"
                strokeDasharray="6 5"
              />
              <path
                d="M0 40L120 42L220 52L300 76L400 100"
                stroke="var(--charcoal)"
                strokeOpacity="0.7"
                strokeWidth="2"
              />
              <circle
                cx="280"
                cy="70"
                r="13"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <text {...SVG_LABEL} x="298" y="54" fill="var(--crimson)">
                DETECT
              </text>
              <text
                {...SVG_LABEL}
                x="0"
                y="90"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                MONITORING SYSTEMS
              </text>
            </svg>
            <Terms items={["model drift", "data bias"]} />
          </Reveal>

          <Reveal delay={420}>
            <p className={BODY}>
              Establishing fallback mechanisms when automated systems fail.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 400 130"
              className="mt-6 w-full"
              fill="none"
            >
              <path
                d="M0 70H178M222 70H390"
                stroke="var(--charcoal)"
                strokeOpacity="0.55"
                strokeWidth="2"
              />
              <path d="M382 64l8 6l-8 6" stroke="var(--charcoal)" strokeOpacity="0.6" strokeWidth="2" />
              <path
                d="M190 58l20 24M210 58l-20 24"
                stroke="var(--charcoal)"
                strokeOpacity="0.7"
                strokeWidth="2"
              />
              <path
                d="M120 70V30H280V70"
                stroke="var(--crimson)"
                strokeWidth="2.5"
              />
              <path d="M274 62l6 8l6 -8" stroke="var(--crimson)" strokeWidth="2" />
              <text
                {...SVG_LABEL}
                x="200"
                y="18"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                FALLBACK MECHANISMS
              </text>
              <text
                {...SVG_LABEL}
                x="0"
                y="100"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                AUTOMATED SYSTEMS
              </text>
              <text
                {...SVG_LABEL}
                x="200"
                y="100"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                FAIL
              </text>
            </svg>
          </Reveal>
        </div>
      </Slide>

      {/* ==================================================================
          32 · STRATEGIC AGILITY — a crimson course that turns sharply above
          a quickening market; a sensing sweep catching one competitor move;
          resources shifted from one bar to another.
      ================================================================== */}
      <Slide id="agility" border align="left">
        <Head eyebrow="Agility">Strategic Agility</Head>

        <Reveal delay={140} className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            AI accelerates market dynamics, requiring firms to rapidly pivot
            their strategies.
          </p>
          <svg
            aria-hidden
            viewBox="0 0 800 112"
            className="mt-7 w-full max-w-5xl"
            fill="none"
          >
            <path
              d="M0 70H150L210 30H330L380 76H520L570 38H786"
              stroke="var(--crimson)"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path d="M778 32l8 6l-8 6" stroke="var(--crimson)" strokeWidth="2.5" />
            {[
              [150, 70],
              [330, 30],
              [520, 76],
            ].map(([x, y]) => (
              <circle
                key={x}
                cx={x}
                cy={y}
                r="4.5"
                fill="var(--surface)"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
            ))}
            <text {...SVG_LABEL} x="214" y="18" fill="var(--crimson)">
              RAPIDLY PIVOT
            </text>
            <path
              d={Array.from({ length: 131 })
                .map((_, i) => {
                  const x = 150 + i * 5;
                  const u = (x - 150) / 650;
                  const y = 100 + 5 * Math.sin(u * u * 90);
                  return `${i === 0 ? "M" : "L"}${x} ${y.toFixed(1)}`;
                })
                .join("")}
              stroke="var(--charcoal)"
              strokeOpacity="0.35"
            />
            <text
              {...SVG_LABEL}
              x="0"
              y="104"
              fill="var(--charcoal)"
              fillOpacity="0.6"
            >
              MARKET DYNAMICS
            </text>
          </svg>
        </Reveal>

        <div className="mt-12 grid w-full max-w-5xl gap-10 border-t border-[var(--charcoal)]/10 pt-8 md:grid-cols-2 md:gap-14">
          <Reveal delay={300}>
            <p className={BODY}>
              Building continuous sensing capabilities to monitor competitive
              movements.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 400 172"
              className="mt-6 w-full"
              fill="none"
            >
              <path d="M60 150H340" stroke="var(--charcoal)" strokeOpacity="0.3" />
              {[40, 80, 120].map((r) => (
                <path
                  key={r}
                  d={`M${200 - r} 150A${r} ${r} 0 0 1 ${200 + r} 150`}
                  stroke="var(--charcoal)"
                  strokeOpacity="0.25"
                />
              ))}
              <path
                d="M200 150L265 37.4A130 130 0 0 0 200 20Z"
                fill="var(--crimson)"
                fillOpacity="0.08"
              />
              <path d="M200 150L265 37.4" stroke="var(--crimson)" strokeWidth="2" />
              {[
                [120, 96],
                [300, 118],
                [150, 128],
                [322, 76],
              ].map(([x, y]) => (
                <circle
                  key={x}
                  cx={x}
                  cy={y}
                  r="4"
                  fill="var(--charcoal)"
                  fillOpacity="0.45"
                />
              ))}
              <circle cx="246" cy="66" r="5" fill="var(--crimson)" />
              <text
                {...SVG_LABEL}
                x="0"
                y="14"
                fill="var(--crimson)"
              >
                CONTINUOUS SENSING
              </text>
              <text
                {...SVG_LABEL}
                x="400"
                y="170"
                textAnchor="end"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                COMPETITIVE MOVEMENTS
              </text>
            </svg>
          </Reveal>

          <Reveal delay={420}>
            <p className={BODY}>
              The capacity to reallocate resources dynamically based on
              predictive insights.
            </p>
            <figure aria-hidden className="mt-6 w-full">
              <svg viewBox="0 0 400 172" className="w-full" fill="none">
                {[
                  { x: 40, before: 90, after: 40 },
                  { x: 130, before: 60, after: 60 },
                  { x: 220, before: 40, after: 100 },
                  { x: 310, before: 70, after: 60 },
                ].map((b, i) => (
                  <g key={b.x}>
                    <rect
                      x={b.x}
                      y={140 - b.before}
                      width="50"
                      height={b.before}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.3"
                      strokeDasharray="3 3"
                    />
                    <rect
                      x={b.x}
                      y={140 - b.after}
                      width="50"
                      height={b.after}
                      fill={i === 2 ? "var(--crimson)" : "var(--charcoal)"}
                      fillOpacity={i === 2 ? 1 : 0.18}
                    />
                  </g>
                ))}
                <path d="M20 140H380" stroke="var(--charcoal)" strokeOpacity="0.35" />
                <path
                  d="M65 44C120 10 190 6 240 28"
                  stroke="var(--crimson)"
                  strokeOpacity="0.8"
                  strokeDasharray="4 4"
                />
                <path d="M229 20l11 8l-13 3" stroke="var(--crimson)" strokeOpacity="0.9" />
                <text
                  {...SVG_LABEL}
                  x="0"
                  y="164"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  REALLOCATE RESOURCES
                </text>
                <text
                  {...SVG_LABEL}
                  x="400"
                  y="12"
                  textAnchor="end"
                  fill="var(--crimson)"
                >
                  PREDICTIVE INSIGHTS
                </text>
              </svg>
              <Schematic />
            </figure>
          </Reveal>
        </div>
      </Slide>

      {/* ==================================================================
          33 · REGULATORY STRATEGY — the two things being navigated; a firm
          engaging policymakers both ways and shaping the standard that comes
          out; constraint struck for differentiator.
      ================================================================== */}
      <Slide id="regulatory" border align="left">
        <Head eyebrow="Regulation">Regulatory Strategy</Head>

        <Reveal delay={140} className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Navigating the evolving landscape of global AI regulations and
            compliance standards.
          </p>
          <Terms items={["global AI regulations", "compliance standards"]} />
        </Reveal>

        <Reveal delay={300} className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Proactively engaging with policymakers to shape industry
              standards.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 800 100"
              className="mt-6 w-full max-w-5xl"
              fill="none"
            >
              <rect x="100" y="36" width="28" height="28" fill="var(--crimson)" />
              <path
                d="M140 44H352M352 58H140"
                stroke="var(--charcoal)"
                strokeOpacity="0.45"
              />
              <path d="M344 39l8 5l-8 5" stroke="var(--charcoal)" strokeOpacity="0.6" />
              <path d="M148 53l-8 5l8 5" stroke="var(--charcoal)" strokeOpacity="0.6" />
              <text
                {...SVG_LABEL}
                x="150"
                y="28"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                PROACTIVELY ENGAGING
              </text>
              {[
                [384, 42],
                [406, 58],
                [428, 42],
              ].map(([x, y]) => (
                <circle
                  key={x}
                  cx={x}
                  cy={y}
                  r="8"
                  fill="var(--surface)"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.65"
                  strokeWidth="1.5"
                />
              ))}
              <text
                {...SVG_LABEL}
                x="406"
                y="94"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                POLICYMAKERS
              </text>
              <path d="M450 50H650" stroke="var(--crimson)" strokeWidth="2" />
              <path d="M642 44l8 6l-8 6" stroke="var(--crimson)" strokeWidth="2" />
              <text
                {...SVG_LABEL}
                x="550"
                y="38"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                SHAPE
              </text>
              <rect
                x="664"
                y="24"
                width="64"
                height="52"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              {[38, 50, 62].map((y) => (
                <path
                  key={y}
                  d={`M674 ${y}H${y === 62 ? 700 : 718}`}
                  stroke="var(--crimson)"
                  strokeOpacity="0.6"
                />
              ))}
              <text
                {...SVG_LABEL}
                x="800"
                y="94"
                textAnchor="end"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                INDUSTRY STANDARDS
              </text>
            </svg>
          </div>
        </Reveal>

        <Reveal delay={440} className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <Split
              left="Constraint"
              right="Competitive differentiator"
              strikeLeft
            />
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              Treating privacy and ethical compliance as a competitive
              differentiator rather than a constraint.
            </p>
            <Terms items={["privacy", "ethical compliance"]} className="mt-6" />
          </div>
        </Reveal>

        <Discussion delay={560}>
          If a new regulation heavily restricts your primary algorithmic
          advantage, how do you pivot the corporate strategy without losing
          market share?
        </Discussion>
      </Slide>

      {/* ==================================================================
          34 · AI AND CORPORATE SOCIAL RESPONSIBILITY — the three ethical
          implications; the AI strategy laid across three ESG pillars; an
          open, see-through system linked to customers and stakeholders.
      ================================================================== */}
      <Slide id="csr" border align="left">
        <Head eyebrow="Responsibility">
          AI and Corporate Social Responsibility
        </Head>

        <Reveal delay={140} className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            The ethical implications of AI deployment, including bias, fairness,
            and job displacement.
          </p>
          <Steps
            items={["bias", "fairness", "job displacement"]}
            cols="md:grid-cols-3"
            className="mt-6 max-w-4xl"
          />
        </Reveal>

        <Reveal delay={300} className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Aligning the AI strategy with the broader environmental, social,
              and governance goals.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 800 136"
              className="mt-6 w-full max-w-5xl"
              fill="none"
            >
              <text
                {...SVG_LABEL}
                x="400"
                y="14"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                AI STRATEGY
              </text>
              <rect x="130" y="24" width="540" height="12" fill="var(--crimson)" />
              {[
                { x: 150, label: "ENVIRONMENTAL" },
                { x: 350, label: "SOCIAL" },
                { x: 550, label: "GOVERNANCE" },
              ].map((p) => (
                <g key={p.label}>
                  <rect
                    x={p.x}
                    y="42"
                    width="100"
                    height="70"
                    fill="var(--charcoal)"
                    fillOpacity="0.05"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.5"
                  />
                  <text
                    {...SVG_LABEL}
                    x={p.x + 50}
                    y="132"
                    textAnchor="middle"
                    fill="var(--charcoal)"
                    fillOpacity="0.65"
                  >
                    {p.label}
                  </text>
                </g>
              ))}
              <path d="M110 112H690" stroke="var(--charcoal)" strokeOpacity="0.4" />
            </svg>
          </div>
        </Reveal>

        <Reveal delay={440} className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <svg
              aria-hidden
              viewBox="0 0 800 124"
              className="w-full"
              fill="none"
            >
              <text
                {...SVG_LABEL}
                x="400"
                y="12"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                BUILDING TRUST
              </text>
              <rect
                x="340"
                y="22"
                width="120"
                height="80"
                fill="var(--charcoal)"
                fillOpacity="0.03"
                stroke="var(--charcoal)"
                strokeOpacity="0.35"
              />
              <path
                d="M370 42L400 62L430 42M370 82L400 62L430 82M370 42V82M430 42V82"
                stroke="var(--charcoal)"
                strokeOpacity="0.4"
              />
              {[
                [370, 42],
                [430, 42],
                [400, 62],
                [370, 82],
                [430, 82],
              ].map(([x, y]) => (
                <circle
                  key={`${x}-${y}`}
                  cx={x}
                  cy={y}
                  r="4"
                  fill="var(--surface)"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.7"
                />
              ))}
              <path d="M330 62H130M470 62H670" stroke="var(--crimson)" strokeWidth="2" />
              <path d="M138 56l-8 6l8 6M662 56l8 6l-8 6" stroke="var(--crimson)" strokeWidth="2" />
              <text
                {...SVG_LABEL}
                x="0"
                y="66"
                fill="var(--charcoal)"
                fillOpacity="0.7"
              >
                CUSTOMERS
              </text>
              <text
                {...SVG_LABEL}
                x="800"
                y="66"
                textAnchor="end"
                fill="var(--charcoal)"
                fillOpacity="0.7"
              >
                STAKEHOLDERS
              </text>
              <text
                {...SVG_LABEL}
                x="400"
                y="120"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                TRANSPARENT AI PRACTICES
              </text>
            </svg>
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              Building trust with customers and stakeholders through transparent
              AI practices.
            </p>
          </div>
        </Reveal>
      </Slide>

      {/* ==================================================================
          35 · THE FUTURE STRATEGIC HORIZON — collaboration struck for
          autonomous units, then the three closing statements in display
          weight, then the colophon.
      ================================================================== */}
      <Slide
        id="horizon"
        border
        align="left"
        className="relative overflow-hidden"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-10 right-0 select-none font-serif text-[24vw] font-black leading-none text-[var(--charcoal)]/[0.03]"
        >
          06
        </span>

        <Head eyebrow="What to carry forward">
          The Future Strategic Horizon
        </Head>

        <Reveal delay={140} className="w-full">
          <div aria-hidden className="mt-11 w-full max-w-3xl">
            <Split
              left="Human-machine collaboration"
              right="Autonomous organizational units"
              strikeLeft
            />
          </div>
        </Reveal>

        <ol className="mt-10 w-full max-w-4xl">
          {[
            "Preparing for the integration of generative AI and autonomous agents into core strategy.",
            "The shift from human-machine collaboration to autonomous organizational units.",
            "Sustaining strategic advantage in a completely AI-saturated market.",
          ].map((line, i) => (
            <Reveal key={line} as="li" delay={280 + i * 130} className="block">
              <div className="grid grid-cols-[4ch_1fr] gap-6 border-t border-[var(--charcoal)]/12 py-7 md:grid-cols-[5ch_1fr] md:gap-10">
                <span className={`${MICRO} pt-3 text-[var(--crimson)]`}>
                  {pad(i + 1)}
                </span>
                <p className="font-serif text-xl font-bold leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[1.75rem]">
                  {line}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={700} className="w-full">
          <div className="mt-12 flex w-full max-w-4xl flex-wrap items-baseline justify-between gap-4 border-t border-[var(--charcoal)]/12 pt-5">
            <span className={`${MICRO} text-[var(--champagne)]`}>
              End of Week 06
            </span>
            <span
              className={`${MICRO} font-normal text-[var(--charcoal-light)]/55`}
            >
              Davood Wadi, PhD · BUSI 654
            </span>
          </div>
        </Reveal>
      </Slide>
    </SlideDeck>
  );
}
