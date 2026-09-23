"use client";

import React from "react";
import {
  Slide,
  SlideDeck,
} from "@/app/(courses-ai)/_components/SlideComponents";
import { ScrollProgress } from "@/app/(courses-ai)/_components/Interactive";
import { createCourseQuizLookup, type CourseQuiz } from "@/lib/course-quiz";
import quizzes from "./quizzes.json";

// ============================================================================
// WEEK 05 — AI IN OPERATIONS AND SUPPLY CHAIN
// ============================================================================
// Same deck grammar as Weeks 01–04: every slide is hand-composed for its own
// argument, with hairlines instead of boxes and crimson marking one thing.
//
// Sentences are transcribed verbatim from content.md. Figures carry only words
// that already appear in the slide's sentences; any shape that suggests a
// quantity is labelled SCHEMATIC because content.md gives no numbers.
//
// Quizzes: `Slide` renders `quizData` BEFORE its section. A [quiz] tag in
// content.md marks the topic to test, so each quiz is attached to the slide
// that FOLLOWS its topic and only tests material the student has already
// passed. Where the following slide is a part plate, the plate carries it.
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
    <div>
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
    </div>
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
        <div>
          <div aria-hidden>
            <div className={`${MICRO} text-[var(--champagne)]`}>Part</div>
            <div className="font-serif text-[6rem] font-black leading-[0.8] tracking-[-0.04em] text-[var(--crimson)] md:text-[9rem]">
              {numeral}
            </div>
          </div>
        </div>

        <div className="md:border-l md:border-[var(--charcoal)]/12 md:pl-16">
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
        </div>
      </div>
    </Slide>
  );
}


/** Discussion prompt, set apart in the deck's one ruled frame. */
function Discussion({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <aside className="mt-14 max-w-3xl border border-[var(--charcoal)]/12 p-7 md:p-9">
        <div className={`${MICRO} text-[var(--champagne)]`}>Discussion</div>
        <p className="mt-4 font-serif text-lg font-light italic leading-relaxed text-[var(--charcoal)] md:text-[1.375rem]">
          {children}
        </p>
      </aside>
    </div>
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


export default function Week05OperationsSupplyChain() {
  return (
    <SlideDeck>
      <ScrollProgress label="Week 05" />

      {/* ==================================================================
          01 · TITLE — masthead, the reactive-to-predictive subtitle, and the
          three qualities of the supply networks being built.
      ================================================================== */}
      <Slide id="title" align="left" className="relative overflow-hidden">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 select-none font-serif text-[36vw] font-black leading-none text-[var(--charcoal)]/[0.035] md:text-[28vw]"
        >
          05
        </span>

        <div>
          <div
            className={`${MICRO} flex items-center gap-4 text-[var(--champagne)]`}
          >
            <span className="h-px w-10 bg-[var(--crimson)]" />
            Week 05
          </div>
        </div>

        <div>
          <h1 className="mt-10 max-w-5xl font-serif text-[clamp(2.5rem,7.5vw,5.75rem)] font-black leading-[0.92] tracking-[-0.035em] text-[var(--charcoal)]">
            AI in Operations and{" "}
            <span className="text-[var(--crimson)]">Supply Chain</span>
          </h1>
        </div>

        <div className="w-full">
          <div className="mt-12 h-px w-full bg-[var(--charcoal)]/15" />
          <p className="mt-6 max-w-3xl font-serif text-xl font-light italic leading-relaxed text-[var(--charcoal-light)] md:text-[1.75rem]">
            Moving from reactive logistics to predictive network optimization.
          </p>
          <div aria-hidden className="mt-6 max-w-3xl">
            <Split
              left="Reactive logistics"
              right="Predictive network optimization"
              strikeLeft
            />
          </div>
        </div>

        <div className="w-full">
          <p className="mt-10 max-w-3xl font-serif text-xl font-light italic leading-relaxed text-[var(--charcoal-light)] md:text-[1.75rem]">
            Building resilient, efficient, and autonomous supply networks.
          </p>
          <div
            aria-hidden
            className="mt-6 grid max-w-2xl grid-cols-3 border-l border-[var(--charcoal)]/12"
          >
            {["resilient", "efficient", "autonomous"].map((quality, i) => (
              <span
                key={quality}
                className="border-b border-r border-[var(--charcoal)]/12 px-4 py-3"
              >
                <span className={`${MICRO} block text-[var(--crimson)]`}>
                  {pad(i + 1)}
                </span>
                <span
                  className={`${TAG} mt-1 block text-[var(--charcoal-light)]/65`}
                >
                  {quality}
                </span>
              </span>
            ))}
          </div>
        </div>

        <div className="w-full">
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
        </div>
      </Slide>

      <PartPlate
        id="part-1"
        numeral="1"
        title="The Modern Supply Chain Context"
        lines={[
          "Exploring the foundations of global operational complexity.",
          "Identifying the limitations of traditional planning systems.",
          "Defining the role of artificial intelligence in physical logistics.",
        ]}
      />

      {/* ==================================================================
          03 · COMPLEXITY OF GLOBAL OPERATIONS — a network spanning zones; a
          small spreadsheet beside a field of variables; one disruption
          cascading down a chain; simplified assumptions struck.
                                                          [quiz topic]
      ================================================================== */}
      <Slide id="global-complexity" border align="left">
        <Head eyebrow="Opening">The Complexity of Global Operations</Head>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Modern supply chains are highly interconnected networks spanning
            multiple continents and regulatory zones.
          </p>
          <svg
            aria-hidden
            viewBox="0 0 800 150"
            className="mt-7 w-full max-w-5xl"
            fill="none"
          >
            <text
              {...SVG_LABEL}
              x="0"
              y="10"
              fill="var(--charcoal)"
              fillOpacity="0.5"
            >
              MULTIPLE CONTINENTS AND REGULATORY ZONES
            </text>
            {[270, 530].map((x) => (
              <path
                key={x}
                d={`M${x} 26V146`}
                stroke="var(--charcoal)"
                strokeOpacity="0.25"
                strokeDasharray="3 5"
              />
            ))}
            {(() => {
              const nodes = [
                [50, 70],
                [120, 124],
                [170, 50],
                [230, 104],
                [320, 60],
                [380, 124],
                [440, 42],
                [490, 96],
                [580, 72],
                [640, 126],
                [700, 46],
                [760, 102],
              ];
              const links = [
                [0, 1], [0, 2], [2, 3], [1, 3],
                [4, 5], [4, 6], [6, 7], [5, 7],
                [8, 9], [8, 10], [10, 11], [9, 11],
                [3, 4], [2, 6], [7, 8], [1, 5], [5, 9], [6, 10], [3, 8],
              ];
              return (
                <g>
                  {links.map(([a, b]) => (
                    <path
                      key={`${a}-${b}`}
                      d={`M${nodes[a][0]} ${nodes[a][1]}L${nodes[b][0]} ${nodes[b][1]}`}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.2"
                    />
                  ))}
                  {nodes.map(([x, y]) => (
                    <circle
                      key={`${x}-${y}`}
                      cx={x}
                      cy={y}
                      r="5"
                      fill="var(--surface)"
                      stroke="var(--charcoal)"
                      strokeOpacity="0.55"
                    />
                  ))}
                </g>
              );
            })()}
          </svg>
        </div>

        <div className="w-full">
          <div className="mt-12 grid w-full max-w-5xl gap-10 border-t border-[var(--charcoal)]/10 pt-8 md:grid-cols-2 md:gap-14">
            <div>
              <p className={BODY}>
                Traditional spreadsheet-based planning cannot process the
                volume of variables required for global optimization.
              </p>
              <svg
                aria-hidden
                viewBox="0 0 400 150"
                className="mt-6 w-full"
                fill="none"
              >
                <rect
                  x="2"
                  y="30"
                  width="84"
                  height="72"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.6"
                />
                {[48, 66, 84].map((y) => (
                  <path
                    key={y}
                    d={`M2 ${y}H86`}
                    stroke="var(--charcoal)"
                    strokeOpacity="0.3"
                  />
                ))}
                {[30, 58].map((x) => (
                  <path
                    key={x}
                    d={`M${x} 30V102`}
                    stroke="var(--charcoal)"
                    strokeOpacity="0.3"
                  />
                ))}
                {Array.from({ length: 22 * 9 }).map((_, k) => {
                  const col = k % 22;
                  const row = Math.floor(k / 22);
                  return (
                    <circle
                      key={k}
                      cx={124 + col * 12.5}
                      cy={14 + row * 12}
                      r="1.8"
                      fill="var(--charcoal)"
                      fillOpacity={0.18 + ((col * 7 + row * 5) % 5) * 0.08}
                    />
                  );
                })}
                <text
                  {...SVG_LABEL}
                  x="0"
                  y="124"
                  fill="var(--charcoal)"
                  fillOpacity="0.55"
                >
                  SPREADSHEET
                </text>
                <text
                  {...SVG_LABEL}
                  x="398"
                  y="124"
                  textAnchor="end"
                  fill="var(--crimson)"
                >
                  VOLUME OF VARIABLES
                </text>
              </svg>
            </div>

            <div>
              <p className={BODY}>
                Disruptions cascade rapidly through the system due to lean
                inventory practices and just-in-time manufacturing.
              </p>
              <svg
                aria-hidden
                viewBox="0 0 400 90"
                className="mt-6 w-full"
                fill="none"
              >
                {[0, 1, 2, 3, 4].map((i) => {
                  const x = 20 + i * 90;
                  return (
                    <g key={i}>
                      {i < 4 && (
                        <>
                          <path
                            d={`M${x + 12} 36H${x + 76}`}
                            stroke="var(--crimson)"
                            strokeOpacity="0.55"
                          />
                          <path
                            d={`M${x + 70} 32l6 4l-6 4`}
                            stroke="var(--crimson)"
                            strokeOpacity="0.7"
                          />
                        </>
                      )}
                      <circle
                        cx={x}
                        cy="36"
                        r="8"
                        fill={i === 0 ? "var(--crimson)" : "var(--surface)"}
                        stroke="var(--crimson)"
                        strokeOpacity={1 - i * 0.12}
                        strokeWidth="2"
                      />
                    </g>
                  );
                })}
                <text
                  {...SVG_LABEL}
                  x="12"
                  y="74"
                  fill="var(--crimson)"
                >
                  DISRUPTIONS
                </text>
                <text
                  {...SVG_LABEL}
                  x="392"
                  y="74"
                  textAnchor="end"
                  fill="var(--charcoal)"
                  fillOpacity="0.55"
                >
                  CASCADE
                </text>
              </svg>
              <Terms
                items={["lean inventory practices", "just-in-time manufacturing"]}
              />
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-14 w-full max-w-5xl">
            <Split
              left="Simplified assumptions"
              right="Model this complexity"
              strikeLeft
            />
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              Machine learning provides the capability to model this complexity
              without relying on simplified assumptions.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          04 · AI VS. TRADITIONAL OPTIMIZATION — a fixed constraint line
          beside one that re-sets with each batch of new data; a straight fit
          missing a curved pattern that deep learning follows.
                                              [quiz: global-complexity]
      ================================================================== */}
      <Slide
        id="ai-vs-traditional"
        border
        align="left"
        quizData={quiz["ai-vs-traditional"]}
      >
        <Head eyebrow="Two ways to optimize">
          AI vs. Traditional Optimization
        </Head>

        <div className="mt-10 grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <div className={`${MICRO} text-[var(--champagne)]`}>
              Traditional operations research
            </div>
            <p className={`${BODY} mt-4`}>
              Traditional operations research relies on static constraints and
              linear programming models.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 360 110"
              className="mt-6 w-full"
              fill="none"
            >
              <text
                {...SVG_LABEL}
                x="0"
                y="18"
                fill="var(--charcoal)"
                fillOpacity="0.55"
              >
                STATIC CONSTRAINTS
              </text>
              <path
                d="M0 44H360"
                stroke="var(--charcoal)"
                strokeOpacity="0.65"
                strokeWidth="2"
              />
              <path
                d="M0 86H360"
                stroke="var(--charcoal)"
                strokeOpacity="0.15"
              />
            </svg>
          </div>

          <div>
            <div className={`${MICRO} text-[var(--crimson)]`}>AI systems</div>
            <p className={`${BODY} mt-4`}>
              AI systems continuously learn from new data, dynamically adjusting
              operational constraints in real time.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 360 114"
              className="mt-6 w-full"
              fill="none"
            >
              <text {...SVG_LABEL} x="0" y="18" fill="var(--crimson)">
                ADJUSTING IN REAL TIME
              </text>
              <path
                d="M0 50H40V36H100V58H160V42H220V30H280V52H340V40H360"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <path
                d="M0 86H360"
                stroke="var(--charcoal)"
                strokeOpacity="0.15"
              />
              {[40, 100, 160, 220, 280, 340].map((x) => (
                <path
                  key={x}
                  d={`M${x} 80V92`}
                  stroke="var(--charcoal)"
                  strokeOpacity="0.5"
                />
              ))}
              <text
                {...SVG_LABEL}
                x="360"
                y="108"
                textAnchor="end"
                fill="var(--charcoal)"
                fillOpacity="0.5"
              >
                NEW DATA
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 grid w-full max-w-5xl items-center gap-10 border-t border-[var(--charcoal)]/10 pt-8 md:grid-cols-[1fr_30rem] md:gap-14">
            <p className={LEAD}>
              Deep learning handles non-linear relationships that traditional
              statistical models often miss.
            </p>
            <figure aria-hidden className="w-full">
              <svg viewBox="0 0 460 180" className="w-full" fill="none">
                {(() => {
                  const f = (x: number) =>
                    166 - 136 / (1 + Math.exp(-(x - 240) / 36));
                  const jitter = [5, -6, 2, -4, 6, -2];
                  const points = Array.from({ length: 16 }).map((_, i) => {
                    const x = 24 + i * 28;
                    return [x, f(x) + jitter[i % jitter.length]];
                  });
                  const curve = Array.from({ length: 45 })
                    .map((_, i) => {
                      const x = 10 + i * 10;
                      return `${i === 0 ? "M" : "L"}${x} ${f(x).toFixed(1)}`;
                    })
                    .join("");
                  return (
                    <g>
                      <path
                        d="M10 156L450 40"
                        stroke="var(--charcoal)"
                        strokeOpacity="0.5"
                        strokeDasharray="5 5"
                      />
                      <path d={curve} stroke="var(--crimson)" strokeWidth="2" />
                      {points.map(([x, y]) => (
                        <circle
                          key={x}
                          cx={x}
                          cy={y.toFixed(1)}
                          r="3"
                          fill="var(--charcoal)"
                          fillOpacity="0.45"
                        />
                      ))}
                    </g>
                  );
                })()}
                <path
                  d="M0 10H24"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.5"
                  strokeDasharray="5 5"
                />
                <text
                  {...SVG_LABEL}
                  x="34"
                  y="13"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  TRADITIONAL STATISTICAL MODELS
                </text>
                <path d="M0 30H24" stroke="var(--crimson)" strokeWidth="2" />
                <text {...SVG_LABEL} x="34" y="33" fill="var(--crimson)">
                  DEEP LEARNING
                </text>
              </svg>
              <Schematic />
            </figure>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          05 · REACTIVE TO PREDICTIVE — one disruption on a timeline: the
          reactive lane moves after it, the predictive lane reads leading
          indicators and moves weeks before; crisis management struck.
      ================================================================== */}
      <Slide id="reactive-to-predictive" border align="left">
        <Head eyebrow="A change of posture">
          The Shift from Reactive to Predictive
        </Head>

        <div className="mt-10 grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <div className={`${MICRO} text-[var(--champagne)]`}>Reactive</div>
            <p className={`${BODY} mt-4`}>
              Historical supply chains focused on reacting quickly to
              disruptions after they occurred.
            </p>
          </div>
          <div>
            <div className={`${MICRO} text-[var(--crimson)]`}>Predictive</div>
            <p className={`${BODY} mt-4`}>
              Predictive models analyze leading indicators to forecast
              disruptions weeks before they impact operations.
            </p>
          </div>
        </div>

        <div className="w-full">
          <figure aria-hidden className="mt-10 w-full max-w-5xl">
            <svg viewBox="0 0 800 160" className="w-full" fill="none">
              <path
                d="M530 8V134"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <text
                {...SVG_LABEL}
                x="530"
                y="154"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                DISRUPTION
              </text>

              <text
                {...SVG_LABEL}
                x="0"
                y="47"
                fill="var(--charcoal)"
                fillOpacity="0.55"
              >
                REACTIVE
              </text>
              <path
                d="M120 44H520"
                stroke="var(--charcoal)"
                strokeOpacity="0.15"
                strokeDasharray="3 5"
              />
              <path
                d="M542 44H716"
                stroke="var(--charcoal)"
                strokeOpacity="0.65"
                strokeWidth="2"
              />
              <path
                d="M708 38l8 6l-8 6"
                stroke="var(--charcoal)"
                strokeOpacity="0.65"
                strokeWidth="2"
              />
              <text
                {...SVG_LABEL}
                x="544"
                y="30"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                AFTER THEY OCCURRED
              </text>

              <text
                {...SVG_LABEL}
                x="0"
                y="107"
                fill="var(--crimson)"
              >
                PREDICTIVE
              </text>
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <path
                  key={i}
                  d={`M${160 + i * 12} ${104 - (i % 3) * 3 - 4}V${104 + (i % 3) * 3 + 4}`}
                  stroke="var(--charcoal)"
                  strokeOpacity="0.5"
                />
              ))}
              <text
                {...SVG_LABEL}
                x="156"
                y="84"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                LEADING INDICATORS
              </text>
              <path
                d="M262 104H518"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <path
                d="M510 98l8 6l-8 6"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <text
                {...SVG_LABEL}
                x="420"
                y="84"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                WEEKS BEFORE
              </text>
            </svg>
            <Schematic />
          </figure>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <Split
              left="Crisis management"
              right="Strategic scenario planning"
              strikeLeft
            />
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              Operations teams are transitioning from crisis management to
              strategic scenario planning.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          06 · DATA — the requirement in lead weight; four sources converging
          on the models; departments walled off from each other.
      ================================================================== */}
      <Slide id="data-core" border align="left">
        <Head eyebrow="What the models run on">
          Data: The Core of Operations AI
        </Head>

        <div className="w-full">
          <p className={`${LEAD} mt-9 max-w-4xl`}>
            Machine learning models require vast amounts of high-quality data
            to optimize supply chains effectively.
          </p>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Sources include IoT sensors, ERP systems, supplier portals, and
              external market signals.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 800 150"
              className="mt-6 w-full max-w-5xl"
              fill="none"
            >
              {[
                { y: 18, label: "IOT SENSORS" },
                { y: 56, label: "ERP SYSTEMS" },
                { y: 94, label: "SUPPLIER PORTALS" },
                { y: 132, label: "EXTERNAL MARKET SIGNALS" },
              ].map((s) => (
                <g key={s.label}>
                  <text
                    {...SVG_LABEL}
                    x="0"
                    y={s.y + 3}
                    fill="var(--charcoal)"
                    fillOpacity="0.6"
                  >
                    {s.label}
                  </text>
                  <circle
                    cx="226"
                    cy={s.y}
                    r="4"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.5"
                  />
                  <path
                    d={`M232 ${s.y} C 360 ${s.y}, 420 75, 540 75`}
                    stroke="var(--charcoal)"
                    strokeOpacity="0.25"
                  />
                </g>
              ))}
              <path
                d="M533 71l7 4l-7 4"
                stroke="var(--charcoal)"
                strokeOpacity="0.5"
              />
              <rect
                x="548"
                y="63"
                width="24"
                height="24"
                fill="var(--crimson)"
              />
              <text
                {...SVG_LABEL}
                x="586"
                y="78"
                fill="var(--charcoal)"
                fillOpacity="0.7"
              >
                MACHINE LEARNING MODELS
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <div aria-hidden className="grid max-w-4xl grid-cols-4">
              {[0, 1, 2, 3].map((d) => (
                <div
                  key={d}
                  className={`flex h-16 flex-wrap content-center gap-1.5 border-y border-[var(--charcoal)]/15 px-4 ${
                    d > 0 ? "border-l-[3px] border-l-[var(--crimson)]" : ""
                  }`}
                >
                  {Array.from({ length: 10 }).map((_, k) => (
                    <span
                      key={k}
                      className="block h-1.5 w-1.5 rounded-full bg-[var(--charcoal)]"
                      style={{ opacity: 0.2 + ((k * 3 + d * 5) % 4) * 0.1 }}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div
              aria-hidden
              className={`${MICRO} mt-3 text-[var(--crimson)]`}
            >
              Data silos · between different departments
            </div>
            <p className={`${DISPLAY} mt-7 max-w-4xl`}>
              Data silos between different departments remain the primary
              barrier to successful AI implementation.
            </p>
          </div>
        </div>

        <Discussion>
          When supply chain partners refuse to share their operational data, how
          can a lead firm build accurate predictive models?
        </Discussion>
      </Slide>

      <PartPlate
        id="part-2"
        numeral="2"
        title="Demand Sensing and Forecasting"
        lines={[
          "Moving beyond historical sales averages.",
          "Incorporating external variables into demand models.",
          "Addressing systemic supply chain phenomena using algorithms.",
        ]}
      />

      {/* ==================================================================
          08 · BEYOND HISTORICAL AVERAGES — the two traditional inputs set
          against three real-time signals; a subtle shift in behaviour caught
          long before it reaches the sales ledger.            [quiz topic]
      ================================================================== */}
      <Slide id="beyond-averages" border align="left">
        <Head eyebrow="Demand sensing">Beyond Historical Averages</Head>

        <div className="mt-10 grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <div className={`${MICRO} text-[var(--champagne)]`}>
              Traditional forecasting
            </div>
            <p className={`${BODY} mt-4`}>
              Traditional forecasting relies heavily on historical sales data
              and seasonal trends.
            </p>
            <Terms items={["historical sales data", "seasonal trends"]} />
          </div>
          <div>
            <div className={`${MICRO} text-[var(--crimson)]`}>
              AI-driven demand sensing
            </div>
            <p className={`${BODY} mt-4`}>
              AI-driven demand sensing incorporates real-time signals like
              social media sentiment, weather forecasts, and economic
              indicators.
            </p>
            <Terms
              items={[
                "social media sentiment",
                "weather forecasts",
                "economic indicators",
              ]}
            />
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${LEAD} max-w-4xl`}>
              Neural networks can detect subtle patterns in consumer behavior
              that indicate a shift in demand long before it hits the sales
              ledger.
            </p>
            <figure aria-hidden className="mt-7 w-full">
              <svg viewBox="0 0 800 160" className="w-full" fill="none">
                <text
                  {...SVG_LABEL}
                  x="0"
                  y="51"
                  fill="var(--charcoal)"
                  fillOpacity="0.55"
                >
                  CONSUMER BEHAVIOR
                </text>
                <path
                  d={Array.from({ length: 63 })
                    .map((_, i) => {
                      const x = 170 + i * 10;
                      const drift = x > 400 ? (x - 400) * 0.05 : 0;
                      const y = 48 - drift + Math.sin(x / 13) * 2;
                      return `${i === 0 ? "M" : "L"}${x} ${y.toFixed(1)}`;
                    })
                    .join("")}
                  stroke="var(--charcoal)"
                  strokeOpacity="0.55"
                />
                <circle cx="404" cy="48" r="5" fill="var(--crimson)" />
                <text
                  {...SVG_LABEL}
                  x="404"
                  y="22"
                  textAnchor="middle"
                  fill="var(--crimson)"
                >
                  SUBTLE PATTERNS
                </text>

                <text
                  {...SVG_LABEL}
                  x="0"
                  y="121"
                  fill="var(--charcoal)"
                  fillOpacity="0.55"
                >
                  SALES LEDGER
                </text>
                <path
                  d="M170 118H640V100H790"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.55"
                />
                <circle
                  cx="640"
                  cy="109"
                  r="5"
                  fill="var(--surface)"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.7"
                />
                <text
                  {...SVG_LABEL}
                  x="640"
                  y="148"
                  textAnchor="middle"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  SHIFT IN DEMAND
                </text>

                <path
                  d="M404 58V76M640 76V94"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.25"
                  strokeDasharray="2 3"
                />
                <path
                  d="M408 76H636"
                  stroke="var(--crimson)"
                  strokeOpacity="0.7"
                />
                <path
                  d="M416 71l-8 5l8 5"
                  stroke="var(--crimson)"
                  strokeOpacity="0.7"
                />
                <text
                  {...SVG_LABEL}
                  x="522"
                  y="94"
                  textAnchor="middle"
                  fill="var(--crimson)"
                >
                  LONG BEFORE
                </text>
              </svg>
              <Schematic />
            </figure>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          09 · BULLWHIP EFFECT — a small wiggle at retail swelling into large
          swings upstream; one real-time signal reaching every tier at once;
          short-term spikes separated from a structural shift.
                                  [quiz: beyond-averages] [quiz topic]
      ================================================================== */}
      <Slide
        id="bullwhip"
        border
        align="left"
        quizData={quiz["bullwhip"]}
      >
        <Head eyebrow="Amplification upstream" signal>
          Mitigating the Bullwhip Effect
        </Head>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            The bullwhip effect occurs when small fluctuations in retail demand
            cause progressively larger fluctuations upstream.
          </p>
          <figure aria-hidden className="mt-7 w-full max-w-5xl">
            <svg viewBox="0 0 800 146" className="w-full" fill="none">
              <path
                d="M0 14H784"
                stroke="var(--charcoal)"
                strokeOpacity="0.35"
              />
              <path
                d="M776 9l8 5l-8 5"
                stroke="var(--charcoal)"
                strokeOpacity="0.5"
              />
              <text
                {...SVG_LABEL}
                x="790"
                y="34"
                textAnchor="end"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                UPSTREAM
              </text>
              {[4, 11, 21, 34].map((amp, p) => {
                const x0 = p * 206;
                const d = Array.from({ length: 46 })
                  .map((_, i) => {
                    const x = x0 + i * 4;
                    const y = 80 - amp * Math.sin((i / 45) * Math.PI * 5);
                    return `${i === 0 ? "M" : "L"}${x} ${y.toFixed(1)}`;
                  })
                  .join("");
                return (
                  <g key={amp}>
                    <path
                      d={`M${x0} 80H${x0 + 180}`}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.1"
                    />
                    <path
                      d={d}
                      stroke={p === 3 ? "var(--crimson)" : "var(--charcoal)"}
                      strokeOpacity={p === 3 ? 1 : 0.6}
                      strokeWidth={p === 3 ? 2 : 1.5}
                    />
                  </g>
                );
              })}
              <text
                {...SVG_LABEL}
                x="0"
                y="140"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                RETAIL DEMAND
              </text>
            </svg>
            <Schematic />
          </figure>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              AI algorithms can share real-time demand signals across all tiers
              of the supply network simultaneously.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 800 100"
              className="mt-6 w-full max-w-5xl"
              fill="none"
            >
              <text {...SVG_LABEL} x="0" y="10" fill="var(--crimson)">
                REAL-TIME DEMAND SIGNALS
              </text>
              <path d="M0 24H800" stroke="var(--crimson)" strokeWidth="2" />
              {[100, 300, 500, 700].map((x) => (
                <g key={x}>
                  <path
                    d={`M${x} 24V54`}
                    stroke="var(--crimson)"
                    strokeOpacity="0.6"
                  />
                  <path
                    d={`M${x - 4} 48l4 6l4 -6`}
                    stroke="var(--crimson)"
                    strokeOpacity="0.8"
                  />
                  <rect
                    x={x - 9}
                    y="58"
                    width="18"
                    height="18"
                    fill="var(--surface)"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.6"
                  />
                </g>
              ))}
              <text
                {...SVG_LABEL}
                x="400"
                y="96"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                ALL TIERS · SIMULTANEOUSLY
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <figure aria-hidden className="w-full">
              <svg viewBox="0 0 800 100" className="w-full" fill="none">
                <path
                  d={Array.from({ length: 101 })
                    .map((_, i) => {
                      const x = i * 8;
                      const base = x < 500 ? 72 : 44;
                      const spike =
                        x === 216 ? -50 : x === 208 || x === 224 ? -22 : 0;
                      const y = base + ((i * 37) % 7) * 1.4 - 4 + spike;
                      return `${i === 0 ? "M" : "L"}${x} ${y.toFixed(1)}`;
                    })
                    .join("")}
                  stroke="var(--charcoal)"
                  strokeOpacity="0.45"
                />
                <path
                  d="M0 72H500V44H800"
                  stroke="var(--crimson)"
                  strokeWidth="2"
                />
                <text
                  {...SVG_LABEL}
                  x="232"
                  y="22"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  SHORT-TERM SPIKES · NOISE
                </text>
                <text
                  {...SVG_LABEL}
                  x="790"
                  y="20"
                  textAnchor="end"
                  fill="var(--crimson)"
                >
                  STRUCTURAL SHIFTS
                </text>
              </svg>
              <Schematic />
            </figure>
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              Predictive analytics prevent manufacturers from overreacting to
              short-term spikes by separating noise from structural shifts.
            </p>
          </div>
        </div>

        <Discussion>
          How does algorithmic demand visibility reshape the balance of power
          between mega-retailers and tier-two suppliers?
        </Discussion>
      </Slide>

      {/* ==================================================================
          10 · DYNAMIC INVENTORY — a flat safety-stock line against demand,
          its gaps shaded as stockouts and excess; a crimson target that
          follows demand instead; every echelon balanced at once.
                                                     [quiz: bullwhip]
      ================================================================== */}
      <Slide
        id="dynamic-inventory"
        border
        align="left"
        quizData={quiz["dynamic-inventory"]}
      >
        <Head eyebrow="Stock that moves">Dynamic Inventory Optimization</Head>

        <div className="mt-10 grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <div className={`${MICRO} text-[var(--champagne)]`}>Static</div>
            <p className={`${BODY} mt-4`}>
              Maintaining static safety stock levels leads to either excess
              holding costs or stockouts.
            </p>
            <figure aria-hidden className="mt-6 w-full">
              <svg viewBox="0 0 400 156" className="w-full" fill="none">
                {(() => {
                  const y = (x: number) =>
                    75 - 36 * Math.sin((2 * Math.PI * x) / 400);
                  const half = (from: number) =>
                    `M${from} 75` +
                    Array.from({ length: 21 })
                      .map((_, i) => {
                        const x = from + i * 10;
                        return `L${x} ${y(x).toFixed(1)}`;
                      })
                      .join("") +
                    `L${from + 200} 75Z`;
                  const curve = Array.from({ length: 41 })
                    .map((_, i) => `${i === 0 ? "M" : "L"}${i * 10} ${y(i * 10).toFixed(1)}`)
                    .join("");
                  return (
                    <g>
                      <path d={half(0)} fill="var(--crimson)" fillOpacity="0.12" />
                      <path d={half(200)} fill="var(--charcoal)" fillOpacity="0.08" />
                      <path
                        d="M0 75H400"
                        stroke="var(--charcoal)"
                        strokeOpacity="0.7"
                        strokeWidth="2"
                      />
                      <path d={curve} stroke="var(--charcoal)" strokeOpacity="0.5" />
                    </g>
                  );
                })()}
                <text
                  {...SVG_LABEL}
                  x="100"
                  y="26"
                  textAnchor="middle"
                  fill="var(--charcoal)"
                  fillOpacity="0.55"
                >
                  DEMAND
                </text>
                <text
                  {...SVG_LABEL}
                  x="100"
                  y="67"
                  textAnchor="middle"
                  fill="var(--crimson)"
                >
                  STOCKOUTS
                </text>
                <text
                  {...SVG_LABEL}
                  x="398"
                  y="66"
                  textAnchor="end"
                  fill="var(--charcoal)"
                  fillOpacity="0.7"
                >
                  STATIC SAFETY STOCK
                </text>
                <text
                  {...SVG_LABEL}
                  x="300"
                  y="146"
                  textAnchor="middle"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  EXCESS HOLDING COSTS
                </text>
              </svg>
              <Schematic />
            </figure>
          </div>

          <div>
            <div className={`${MICRO} text-[var(--crimson)]`}>Dynamic</div>
            <p className={`${BODY} mt-4`}>
              AI dynamically adjusts optimal inventory targets based on
              real-time demand probabilities and supplier lead times.
            </p>
            <figure aria-hidden className="mt-6 w-full">
              <svg viewBox="0 0 400 156" className="w-full" fill="none">
                {(() => {
                  const y = (x: number) =>
                    75 - 36 * Math.sin((2 * Math.PI * x) / 400);
                  const curve = Array.from({ length: 41 })
                    .map((_, i) => `${i === 0 ? "M" : "L"}${i * 10} ${y(i * 10).toFixed(1)}`)
                    .join("");
                  const target = Array.from({ length: 16 })
                    .map((_, i) => {
                      const x = i * 25;
                      const t = (y(x + 12.5) - 10).toFixed(1);
                      return `${i === 0 ? "M" : "H"}${x}${i === 0 ? ` ${t}` : `V${t}`}`;
                    })
                    .join("");
                  return (
                    <g>
                      <path d={curve} stroke="var(--charcoal)" strokeOpacity="0.5" />
                      <path
                        d={`${target}H400`}
                        stroke="var(--crimson)"
                        strokeWidth="2"
                      />
                    </g>
                  );
                })()}
                <text
                  {...SVG_LABEL}
                  x="100"
                  y="16"
                  textAnchor="middle"
                  fill="var(--charcoal)"
                  fillOpacity="0.55"
                >
                  DEMAND
                </text>
                <text
                  {...SVG_LABEL}
                  x="398"
                  y="146"
                  textAnchor="end"
                  fill="var(--crimson)"
                >
                  OPTIMAL INVENTORY TARGETS
                </text>
              </svg>
              <Schematic />
            </figure>
            <Terms
              items={["real-time demand probabilities", "supplier lead times"]}
            />
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <svg
              aria-hidden
              viewBox="0 0 800 170"
              className="w-full max-w-5xl"
              fill="none"
            >
              <text
                {...SVG_LABEL}
                x="0"
                y="10"
                fill="var(--crimson)"
              >
                STOCK LEVELS · ENTIRE DISTRIBUTION NETWORK
              </text>
              {(() => {
                const root = { x: 60, y: 95 };
                const mid = [50, 95, 140].map((y) => ({ x: 330, y }));
                const leaves = [34, 58, 82, 108, 132, 156].map((y) => ({
                  x: 620,
                  y,
                }));
                const gauge = (n: { x: number; y: number }, k: string) => (
                  <g key={k}>
                    <rect
                      x={n.x}
                      y={n.y - 6}
                      width="48"
                      height="12"
                      fill="var(--surface)"
                      stroke="var(--charcoal)"
                      strokeOpacity="0.5"
                    />
                    <rect
                      x={n.x + 2}
                      y={n.y - 4}
                      width="28"
                      height="8"
                      fill="var(--crimson)"
                    />
                  </g>
                );
                return (
                  <g>
                    {mid.map((m) => (
                      <path
                        key={`r-${m.y}`}
                        d={`M${root.x + 48} ${root.y} C 220 ${root.y}, 230 ${m.y}, ${m.x} ${m.y}`}
                        stroke="var(--charcoal)"
                        strokeOpacity="0.22"
                      />
                    ))}
                    {leaves.map((l, i) => {
                      const m = mid[Math.min(2, Math.floor(i / 2))];
                      return (
                        <path
                          key={`m-${l.y}`}
                          d={`M${m.x + 48} ${m.y} C 500 ${m.y}, 510 ${l.y}, ${l.x} ${l.y}`}
                          stroke="var(--charcoal)"
                          strokeOpacity="0.22"
                        />
                      );
                    })}
                    {gauge(root, "root")}
                    {mid.map((m) => gauge(m, `mid-${m.y}`))}
                    {leaves.map((l) => gauge(l, `leaf-${l.y}`))}
                  </g>
                );
              })()}
            </svg>
            <p className={`${DISPLAY} mt-7 max-w-4xl`}>
              Multi-echelon inventory optimization models balance stock levels
              across the entire distribution network simultaneously.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          11 · DEEP LEARNING FOR TIME SERIES — a sequence and its predicted
          continuation; two related SKUs pulling apart and moving together;
          a fit that re-sets its slope at a structural break.
      ================================================================== */}
      <Slide id="time-series" border align="left">
        <Head eyebrow="Under the hood">Deep Learning for Time-Series Data</Head>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Recurrent Neural Networks and Transformer architectures excel at
            predicting sequential time-series data.
          </p>
          <Terms
            items={["Recurrent Neural Networks", "Transformer architectures"]}
          />
          <figure aria-hidden className="mt-6 w-full max-w-5xl">
            <svg viewBox="0 0 800 120" className="w-full" fill="none">
              {Array.from({ length: 34 }).map((_, i) => {
                const forecast = i >= 27;
                const h =
                  34 + 22 * Math.sin(i / 2.2) + ((i * 17) % 9) + i * 0.6;
                return (
                  <rect
                    key={i}
                    x={i * 23.5}
                    y={96 - h}
                    width="13"
                    height={h}
                    fill={forecast ? "var(--surface)" : "var(--charcoal)"}
                    fillOpacity={forecast ? 1 : 0.28}
                    stroke={forecast ? "var(--crimson)" : "none"}
                    strokeDasharray={forecast ? "3 2" : undefined}
                  />
                );
              })}
              <path
                d="M628 6V100"
                stroke="var(--crimson)"
                strokeOpacity="0.4"
              />
              <text
                {...SVG_LABEL}
                x="0"
                y="116"
                fill="var(--charcoal)"
                fillOpacity="0.55"
              >
                SEQUENTIAL TIME-SERIES DATA
              </text>
              <text
                {...SVG_LABEL}
                x="800"
                y="116"
                textAnchor="end"
                fill="var(--crimson)"
              >
                PREDICTING
              </text>
            </svg>
            <Schematic />
          </figure>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              These models can forecast multiple related SKUs simultaneously,
              capturing cannibalization and halo effects between products.
            </p>
            <div
              aria-hidden
              className="mt-7 grid max-w-4xl gap-8 md:grid-cols-2 md:gap-12"
            >
              {[
                {
                  label: "Cannibalization",
                  b: "M0 40C120 40 150 40 190 42S280 80 340 84",
                },
                {
                  label: "Halo effects",
                  b: "M0 84C120 84 150 84 190 80S280 52 340 50",
                },
              ].map((panel) => (
                <figure key={panel.label}>
                  <div className={`${MICRO} text-[var(--champagne)]`}>
                    {panel.label}
                  </div>
                  <svg viewBox="0 0 400 110" className="mt-3 w-full" fill="none">
                    <path
                      d="M0 70C120 70 150 70 190 66S280 22 340 18"
                      stroke="var(--crimson)"
                      strokeWidth="2"
                    />
                    <path
                      d={panel.b}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.6"
                      strokeWidth="1.5"
                    />
                    <text
                      {...SVG_LABEL}
                      x="350"
                      y={21}
                      fill="var(--crimson)"
                    >
                      SKU
                    </text>
                    <text
                      {...SVG_LABEL}
                      x="350"
                      y={panel.label === "Cannibalization" ? 87 : 58}
                      fill="var(--charcoal)"
                      fillOpacity="0.6"
                    >
                      SKU
                    </text>
                    <path
                      d="M0 104H400"
                      stroke="var(--charcoal)"
                      strokeOpacity="0.12"
                    />
                  </svg>
                  <Schematic />
                </figure>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <figure aria-hidden className="w-full">
              <svg viewBox="0 0 800 120" className="w-full" fill="none">
                {Array.from({ length: 40 }).map((_, i) => {
                  const x = 10 + i * 20;
                  const trend = x < 440 ? 90 - x * 0.08 : 55 + (x - 440) * 0.12;
                  const y = trend + ((i * 29) % 11) - 5;
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y.toFixed(1)}
                      r="2.5"
                      fill="var(--charcoal)"
                      fillOpacity="0.4"
                    />
                  );
                })}
                <path
                  d="M440 4V116"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.4"
                  strokeDasharray="3 4"
                />
                <text
                  {...SVG_LABEL}
                  x="452"
                  y="14"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  STRUCTURAL MARKET BREAK
                </text>
                <path
                  d="M10 89.2L440 54.8L790 96.8"
                  stroke="var(--crimson)"
                  strokeWidth="2"
                />
              </svg>
              <Schematic />
            </figure>
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              Advanced models automatically adjust their parameters when
              structural market breaks occur.
            </p>
          </div>
        </div>
      </Slide>

      <PartPlate
        id="part-3"
        numeral="3"
        title="Logistics and Network Optimization"
        lines={[
          "Solving complex routing challenges at a massive scale.",
          "Utilizing real-time data for dynamic transport adaptability.",
          "The impact of predictive maintenance on fleet operations.",
        ]}
      />

      {/* ==================================================================
          13 · ROUTING AT SCALE — six stops beside thousands; three inputs
          producing routes in seconds; a route re-optimized around a road
          closure and a new order while the vehicle is in transit.
                                                          [quiz topic]
      ================================================================== */}
      <Slide id="routing-at-scale" border align="left">
        <Head eyebrow="Routing">Solving Complex Routing at Scale</Head>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            The Traveling Salesperson Problem becomes exponentially harder with
            thousands of deliveries and dynamic constraints.
          </p>
          <figure aria-hidden className="mt-7 w-full max-w-5xl">
            <svg viewBox="0 0 800 166" className="w-full" fill="none">
              {(() => {
                const stops = [
                  [30, 40],
                  [110, 22],
                  [170, 70],
                  [140, 128],
                  [60, 136],
                  [18, 92],
                ];
                const loop =
                  stops
                    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y}`)
                    .join("") + "Z";
                return (
                  <g>
                    <path d={loop} stroke="var(--charcoal)" strokeOpacity="0.55" />
                    {stops.map(([x, y]) => (
                      <circle
                        key={`${x}-${y}`}
                        cx={x}
                        cy={y}
                        r="4.5"
                        fill="var(--surface)"
                        stroke="var(--charcoal)"
                        strokeOpacity="0.7"
                      />
                    ))}
                  </g>
                );
              })()}
              <path
                d="M214 80H330"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <path
                d="M322 74l8 6l-8 6"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <text
                {...SVG_LABEL}
                x="272"
                y="66"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                EXPONENTIALLY
              </text>
              <text
                {...SVG_LABEL}
                x="272"
                y="100"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                HARDER
              </text>
              {Array.from({ length: 340 }).map((_, i) => (
                <circle
                  key={i}
                  cx={(372 + hash(i) * 420).toFixed(1)}
                  cy={(12 + hash(i + 1000) * 124).toFixed(1)}
                  r="1.8"
                  fill="var(--charcoal)"
                  fillOpacity="0.35"
                />
              ))}
              <text
                {...SVG_LABEL}
                x="0"
                y="162"
                fill="var(--charcoal)"
                fillOpacity="0.55"
              >
                TRAVELING SALESPERSON PROBLEM
              </text>
              <text
                {...SVG_LABEL}
                x="792"
                y="162"
                textAnchor="end"
                fill="var(--charcoal)"
                fillOpacity="0.55"
              >
                THOUSANDS OF DELIVERIES
              </text>
            </svg>
            <Schematic />
          </figure>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              AI algorithms process traffic patterns, vehicle capacities, and
              delivery windows to generate optimal routes in seconds.
            </p>
            <Steps
              items={[
                "traffic patterns",
                "vehicle capacities",
                "delivery windows",
                "optimal routes in seconds",
              ]}
              cols="md:grid-cols-4"
              mark={3}
              className="mt-6 max-w-4xl"
            />
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <svg
              aria-hidden
              viewBox="0 0 800 140"
              className="w-full"
              fill="none"
            >
              <path
                d="M60 70L220 30L380 30L540 30L740 70"
                stroke="var(--charcoal)"
                strokeOpacity="0.3"
                strokeDasharray="4 5"
              />
              <path
                d="M140 50L220 30L380 30L460 110L540 30L740 70"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              {[
                [60, 70],
                [220, 30],
                [380, 30],
                [540, 30],
                [740, 70],
              ].map(([x, y]) => (
                <circle
                  key={x}
                  cx={x}
                  cy={y}
                  r="5"
                  fill="var(--surface)"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.7"
                />
              ))}
              <path
                d="M452 22l16 16M468 22l-16 16"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <text
                {...SVG_LABEL}
                x="460"
                y="12"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                ROAD CLOSURES
              </text>
              <circle cx="460" cy="110" r="6" fill="var(--crimson)" />
              <text
                {...SVG_LABEL}
                x="476"
                y="114"
                fill="var(--crimson)"
              >
                NEW ORDERS
              </text>
              <rect
                x="132"
                y="42"
                width="16"
                height="16"
                fill="var(--charcoal)"
                fillOpacity="0.8"
              />
              <text
                {...SVG_LABEL}
                x="140"
                y="82"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                IN TRANSIT
              </text>
            </svg>
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              Continuous re-optimization allows fleets to adapt to new orders or
              road closures while vehicles are already in transit.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          14 · LAST MILE — the supply chain as segments with the final one
          marked; two methods enabling two kinds of vehicle; a hub serving
          its near neighbourhood continuously.     [quiz: routing-at-scale]
      ================================================================== */}
      <Slide
        id="last-mile"
        border
        align="left"
        quizData={quiz["last-mile"]}
      >
        <Head eyebrow="The final stretch">
          Autonomous Vehicles and Last-Mile Delivery
        </Head>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            The &quot;last mile&quot; represents the most expensive and
            inefficient segment of the supply chain.
          </p>
          <svg
            aria-hidden
            viewBox="0 0 800 70"
            className="mt-7 w-full max-w-5xl"
            fill="none"
          >
            {[0, 1, 2, 3].map((i) => (
              <path
                key={i}
                d={`M${20 + i * 150} 24H${160 + i * 150}`}
                stroke="var(--charcoal)"
                strokeOpacity="0.4"
                strokeWidth="2"
              />
            ))}
            <path
              d="M620 24H780"
              stroke="var(--crimson)"
              strokeWidth="8"
            />
            {[20, 170, 320, 470, 620, 780].map((x, i) => (
              <circle
                key={x}
                cx={x}
                cy="24"
                r="6"
                fill="var(--surface)"
                stroke={i >= 4 ? "var(--crimson)" : "var(--charcoal)"}
                strokeOpacity={i >= 4 ? 1 : 0.6}
                strokeWidth="2"
              />
            ))}
            <text
              {...SVG_LABEL}
              x="20"
              y="60"
              fill="var(--charcoal)"
              fillOpacity="0.55"
            >
              SUPPLY CHAIN
            </text>
            <text
              {...SVG_LABEL}
              x="700"
              y="60"
              textAnchor="middle"
              fill="var(--crimson)"
            >
              LAST MILE
            </text>
          </svg>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Computer vision and reinforcement learning are enabling autonomous
              delivery drones and sidewalk robots.
            </p>
            <div
              aria-hidden
              className="mt-6 grid max-w-3xl grid-cols-[1fr_auto_1fr] items-center gap-6"
            >
              <div className="space-y-2 border-l border-[var(--charcoal)]/15 pl-4">
                {["computer vision", "reinforcement learning"].map((m) => (
                  <div
                    key={m}
                    className={`${TAG} text-[var(--charcoal-light)]/70`}
                  >
                    {m}
                  </div>
                ))}
              </div>
              <span className="font-serif text-3xl font-light text-[var(--crimson)]">
                →
              </span>
              <div className="space-y-2 border-l border-[var(--crimson)]/40 pl-4">
                {["autonomous delivery drones", "sidewalk robots"].map((v) => (
                  <div key={v} className={`${TAG} text-[var(--crimson)]`}>
                    {v}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1fr_22rem] md:gap-14">
            <div>
              <Steps
                items={[
                  "reduce labor costs",
                  "hyper-local",
                  "continuous delivery networks",
                ]}
                cols="grid-cols-3"
                className=""
              />
              <p className={`${DISPLAY} mt-6`}>
                These technologies promise to reduce labor costs and enable
                hyper-local, continuous delivery networks.
              </p>
            </div>
            <svg
              aria-hidden
              viewBox="0 0 320 220"
              className="w-full"
              fill="none"
            >
              <circle
                cx="160"
                cy="104"
                r="86"
                stroke="var(--crimson)"
                strokeOpacity="0.5"
                strokeDasharray="4 6"
              />
              {Array.from({ length: 10 }).map((_, i) => {
                const a = (i / 10) * Math.PI * 2;
                const r = 46 + ((i * 7) % 3) * 12;
                const x = 160 + r * Math.cos(a);
                const y = 104 + r * Math.sin(a);
                return (
                  <g key={i}>
                    <path
                      d={`M160 104L${x.toFixed(1)} ${y.toFixed(1)}`}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.25"
                    />
                    <circle
                      cx={x.toFixed(1)}
                      cy={y.toFixed(1)}
                      r="4"
                      fill="var(--surface)"
                      stroke="var(--charcoal)"
                      strokeOpacity="0.6"
                    />
                  </g>
                );
              })}
              <rect
                x="151"
                y="95"
                width="18"
                height="18"
                fill="var(--crimson)"
              />
              <text
                {...SVG_LABEL}
                x="160"
                y="214"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                HYPER-LOCAL
              </text>
            </svg>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          15 · PREDICTIVE MAINTENANCE — evenly spaced service stops; three
          sensor lanes, one drifting and flagged before its failure; downtime
          struck against a longer lifespan.                   [quiz topic]
      ================================================================== */}
      <Slide id="predictive-maintenance" border align="left">
        <Head eyebrow="Keeping the fleet moving">
          Predictive Maintenance in Fleet Management
        </Head>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Traditional fleet maintenance relies on fixed schedules based on
            mileage or time.
          </p>
          <svg
            aria-hidden
            viewBox="0 0 800 64"
            className="mt-6 w-full max-w-5xl"
            fill="none"
          >
            <text
              {...SVG_LABEL}
              x="0"
              y="10"
              fill="var(--charcoal)"
              fillOpacity="0.55"
            >
              FIXED SCHEDULES
            </text>
            <path d="M0 34H800" stroke="var(--charcoal)" strokeOpacity="0.2" />
            {[40, 200, 360, 520, 680].map((x) => (
              <rect
                key={x}
                x={x - 6}
                y="28"
                width="12"
                height="12"
                fill="var(--charcoal)"
                fillOpacity="0.5"
              />
            ))}
            <text
              {...SVG_LABEL}
              x="800"
              y="60"
              textAnchor="end"
              fill="var(--charcoal)"
              fillOpacity="0.5"
            >
              MILEAGE OR TIME
            </text>
          </svg>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              AI analyzes IoT sensor data from engines, brakes, and transmissions
              to predict component failures before they happen.
            </p>
            <figure aria-hidden className="mt-6 w-full max-w-5xl">
              <svg viewBox="0 0 800 170" className="w-full" fill="none">
                {[
                  { y: 30, label: "ENGINES", drift: false },
                  { y: 90, label: "BRAKES", drift: true },
                  { y: 140, label: "TRANSMISSIONS", drift: false },
                ].map((lane, l) => {
                  const d = Array.from({ length: 65 })
                    .map((_, i) => {
                      const x = 150 + i * 10;
                      const up =
                        lane.drift && x > 450 ? Math.min(x, 740) - 450 : 0;
                      const y =
                        lane.y - up * 0.06 + (((i * 31 + l * 7) % 7) - 3);
                      return `${i === 0 ? "M" : "L"}${x} ${y.toFixed(1)}`;
                    })
                    .join("");
                  return (
                    <g key={lane.label}>
                      <text
                        {...SVG_LABEL}
                        x="0"
                        y={lane.y + 3}
                        fill="var(--charcoal)"
                        fillOpacity="0.6"
                      >
                        {lane.label}
                      </text>
                      <path
                        d={d}
                        stroke="var(--charcoal)"
                        strokeOpacity={lane.drift ? 0.7 : 0.35}
                      />
                    </g>
                  );
                })}
                <circle cx="600" cy="81" r="6" fill="var(--crimson)" />
                <text
                  {...SVG_LABEL}
                  x="600"
                  y="116"
                  textAnchor="middle"
                  fill="var(--crimson)"
                >
                  BEFORE THEY HAPPEN
                </text>
                <path
                  d="M734 66l12 12M746 66l-12 12"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.7"
                  strokeWidth="2"
                />
                <text
                  {...SVG_LABEL}
                  x="790"
                  y="56"
                  textAnchor="end"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  COMPONENT FAILURES
                </text>
              </svg>
              <Schematic />
            </figure>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <Split
              left="Unplanned downtime"
              right="Operational lifespan"
              strikeLeft
            />
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              This approach minimizes unplanned downtime and extends the
              operational lifespan of expensive capital assets.
            </p>
          </div>
        </div>
      </Slide>

      <PartPlate
        id="part-4"
        numeral="4"
        title="Intelligent Procurement"
        lines={[
          "Automating supplier evaluation and spend analysis.",
          "Enhancing visibility deep into the supplier network.",
          "Proactively managing global supply risks.",
        ]}
        quizData={quiz["part-4"]}
      />

      {/* ==================================================================
          17 · SUPPLIER RISK — an annual audit lane against a continuous
          monitoring lane that flags emerging risks; unstructured text with
          risk indicators lifted out.                         [quiz topic]
      ================================================================== */}
      <Slide id="supplier-risk" border align="left">
        <Head eyebrow="Procurement risk">
          Proactive Supplier Risk Management
        </Head>

        <div className="mt-10 grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <div className={`${MICRO} text-[var(--champagne)]`}>
              Traditionally
            </div>
            <p className={`${BODY} mt-4`}>
              Procurement teams traditionally assess supplier risk through
              annual audits and financial reviews.
            </p>
          </div>
          <div>
            <div className={`${MICRO} text-[var(--crimson)]`}>
              Continuously
            </div>
            <p className={`${BODY} mt-4`}>
              AI systems continuously monitor global news, geopolitical events,
              and financial filings to flag emerging supplier risks.
            </p>
            <Terms
              items={["global news", "geopolitical events", "financial filings"]}
            />
          </div>
        </div>

        <div className="w-full">
          <svg
            aria-hidden
            viewBox="0 0 800 120"
            className="mt-10 w-full max-w-5xl"
            fill="none"
          >
            <text
              {...SVG_LABEL}
              x="0"
              y="12"
              fill="var(--charcoal)"
              fillOpacity="0.55"
            >
              ANNUAL AUDITS
            </text>
            <path d="M0 32H800" stroke="var(--charcoal)" strokeOpacity="0.2" />
            {[40, 760].map((x) => (
              <rect
                key={x}
                x={x - 6}
                y="24"
                width="12"
                height="16"
                fill="var(--charcoal)"
                fillOpacity="0.55"
              />
            ))}

            <text {...SVG_LABEL} x="0" y="74" fill="var(--crimson)">
              CONTINUOUSLY MONITOR
            </text>
            <text
              {...SVG_LABEL}
              x="800"
              y="74"
              textAnchor="end"
              fill="var(--crimson)"
            >
              EMERGING SUPPLIER RISKS
            </text>
            <path d="M0 100H800" stroke="var(--charcoal)" strokeOpacity="0.2" />
            {Array.from({ length: 100 }).map((_, i) => {
              const x = 4 + i * 8;
              const flag = i === 38 || i === 64 || i === 81;
              return (
                <path
                  key={i}
                  d={`M${x} ${flag ? 84 : 94}V${flag ? 116 : 106}`}
                  stroke={flag ? "var(--crimson)" : "var(--charcoal)"}
                  strokeOpacity={flag ? 1 : 0.35}
                  strokeWidth={flag ? 2.5 : 1}
                />
              );
            })}
          </svg>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <div
              aria-hidden
              className="grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3"
            >
              {[0, 1, 2].map((doc) => (
                <div
                  key={doc}
                  className="space-y-2 border-t border-[var(--charcoal)]/15 pt-4"
                >
                  {[0, 1, 2, 3, 4].map((line) => {
                    const hit = (doc * 3 + line * 2) % 7 === 1;
                    return (
                      <div key={line} className="flex gap-1.5">
                        {[0, 1, 2, 3].map((w) => (
                          <span
                            key={w}
                            className={`block h-1.5 ${
                              hit && w === 1
                                ? "bg-[var(--crimson)]"
                                : "bg-[var(--charcoal)]/20"
                            }`}
                            style={{
                              width: `${14 + ((doc * 5 + line * 7 + w * 11) % 5) * 6}%`,
                            }}
                          />
                        ))}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            <div
              aria-hidden
              className="mt-4 flex max-w-4xl flex-wrap justify-between gap-3"
            >
              <span className={`${MICRO} text-[var(--charcoal-light)]/55`}>
                Unstructured data sources
              </span>
              <span className={`${MICRO} text-[var(--crimson)]`}>
                Risk indicators
              </span>
            </div>
            <p className={`${DISPLAY} mt-7 max-w-4xl`}>
              Natural Language Processing extracts risk indicators from
              unstructured data sources across multiple languages.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          18 · NLP FOR CONTRACTS AND SPEND — a scatter of unstandardized
          contracts; one PDF yielding three extracted fields; purchasing data
          sorted into categories with maverick spend and a consolidation.
                                                  [quiz: supplier-risk]
      ================================================================== */}
      <Slide
        id="nlp-contracts"
        border
        align="left"
        quizData={quiz["nlp-contracts"]}
      >
        <Head eyebrow="Reading the paperwork">
          NLP for Contract and Spend Analysis
        </Head>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Large organizations often have thousands of unstandardized supplier
            contracts spread across different regions.
          </p>
          <svg
            aria-hidden
            viewBox="0 0 800 96"
            className="mt-6 w-full max-w-5xl"
            fill="none"
          >
            {Array.from({ length: 46 }).map((_, i) => {
              const x = +(8 + hash(i + 2000) * 764).toFixed(1);
              const y = +(6 + hash(i + 3000) * 62).toFixed(1);
              const w = 12 + ((i * 7) % 4) * 3;
              const r = ((i * 23) % 31) - 15;
              return (
                <rect
                  key={i}
                  x={x}
                  y={y}
                  width={w}
                  height={w * 1.3}
                  transform={`rotate(${r} ${x + w / 2} ${y + w * 0.65})`}
                  fill="var(--surface)"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.4"
                />
              );
            })}
          </svg>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              AI extracts key terms, compliance clauses, and pricing structures
              from PDF contracts automatically.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 800 130"
              className="mt-6 w-full max-w-5xl"
              fill="none"
            >
              <path
                d="M20 10H96L116 30V122H20Z"
                fill="var(--surface)"
                stroke="var(--charcoal)"
                strokeOpacity="0.6"
              />
              <path
                d="M96 10V30H116"
                stroke="var(--charcoal)"
                strokeOpacity="0.6"
              />
              {[44, 58, 72, 86, 100].map((y, i) => (
                <path
                  key={y}
                  d={`M32 ${y}H${i % 2 ? 90 : 104}`}
                  stroke={i === 1 || i === 3 ? "var(--crimson)" : "var(--charcoal)"}
                  strokeOpacity={i === 1 || i === 3 ? 0.8 : 0.25}
                  strokeWidth="3"
                />
              ))}
              <text
                {...SVG_LABEL}
                x="68"
                y="24"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                PDF
              </text>
              {[
                { y: 26, label: "KEY TERMS" },
                { y: 66, label: "COMPLIANCE CLAUSES" },
                { y: 106, label: "PRICING STRUCTURES" },
              ].map((f) => (
                <g key={f.label}>
                  <path
                    d={`M132 66 C 220 66, 240 ${f.y}, 330 ${f.y}`}
                    stroke="var(--crimson)"
                    strokeOpacity="0.5"
                  />
                  <rect
                    x="338"
                    y={f.y - 12}
                    width="300"
                    height="24"
                    fill="var(--surface)"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.2"
                  />
                  <rect
                    x="338"
                    y={f.y - 12}
                    width="4"
                    height="24"
                    fill="var(--crimson)"
                  />
                  <text
                    {...SVG_LABEL}
                    x="356"
                    y={f.y + 3}
                    fill="var(--charcoal)"
                    fillOpacity="0.7"
                  >
                    {f.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <svg
              aria-hidden
              viewBox="0 0 800 150"
              className="w-full"
              fill="none"
            >
              {Array.from({ length: 30 }).map((_, i) => (
                <circle
                  key={i}
                  cx={10 + ((i * 41) % 170)}
                  cy={18 + ((i * 67) % 104)}
                  r="3"
                  fill="var(--charcoal)"
                  fillOpacity="0.35"
                />
              ))}
              <text
                {...SVG_LABEL}
                x="0"
                y="146"
                fill="var(--charcoal)"
                fillOpacity="0.55"
              >
                PURCHASING DATA
              </text>
              <path
                d="M204 70H300"
                stroke="var(--charcoal)"
                strokeOpacity="0.35"
              />
              <path
                d="M293 65l7 5l-7 5"
                stroke="var(--charcoal)"
                strokeOpacity="0.5"
              />
              {[24, 58, 92].map((y, r) => (
                <g key={y}>
                  <path
                    d={`M330 ${y}H620`}
                    stroke="var(--charcoal)"
                    strokeOpacity="0.15"
                  />
                  {Array.from({ length: 9 - r * 2 }).map((_, k) => (
                    <circle
                      key={k}
                      cx={344 + k * 28}
                      cy={y}
                      r="3"
                      fill="var(--charcoal)"
                      fillOpacity="0.5"
                    />
                  ))}
                </g>
              ))}
              <path
                d="M632 58V92"
                stroke="var(--charcoal)"
                strokeOpacity="0.55"
              />
              <path
                d="M626 58H632M626 92H632"
                stroke="var(--charcoal)"
                strokeOpacity="0.55"
              />
              <text
                {...SVG_LABEL}
                x="644"
                y="72"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                CONSOLIDATION
              </text>
              <text
                {...SVG_LABEL}
                x="644"
                y="86"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                OPPORTUNITIES
              </text>
              <circle cx="480" cy="128" r="5" fill="var(--crimson)" />
              <text {...SVG_LABEL} x="496" y="132" fill="var(--crimson)">
                MAVERICK SPEND
              </text>
            </svg>
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              Automated spend analysis categorizes purchasing data to identify
              maverick spend and consolidation opportunities.
            </p>
          </div>
        </div>

        <Discussion>
          If an AI flags a critical supplier as high risk based on unverified
          news sentiment, should procurement immediately halt orders?
        </Discussion>
      </Slide>

      {/* ==================================================================
          19 · MULTI-TIER VISIBILITY — company, three tiers, visibility ending
          at tier one; three tier-one suppliers traced through tier two to
          one tier-three factory, the hidden choke point.
      ================================================================== */}
      <Slide id="multi-tier" border align="left">
        <Head eyebrow="Seeing past tier one" signal>
          Multi-Tier Supply Chain Visibility
        </Head>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Most companies only have visibility into their direct tier-one
            suppliers.
          </p>
          <svg
            aria-hidden
            viewBox="0 0 800 240"
            className="mt-7 w-full max-w-5xl"
            fill="none"
          >
            {(() => {
              const t1 = [54, 101, 148, 195].map((y) => [290, y]);
              const t2 = [44, 84, 124, 164, 204].map((y) => [520, y]);
              const t3 = [64, 124, 188].map((y) => [740, y]);
              const curve = (a: number[], b: number[]) =>
                `M${a[0] + 8} ${a[1]} C ${(a[0] + b[0]) / 2} ${a[1]}, ${(a[0] + b[0]) / 2} ${b[1]}, ${b[0] - 8} ${b[1]}`;
              const faint: [number[], number[]][] = [
                [t1[1], t2[1]],
                [t1[2], t2[3]],
                [t1[3], t2[3]],
                [t1[1], t2[0]],
                [t2[1], t3[0]],
                [t2[0], t3[0]],
                [t2[3], t3[2]],
              ];
              const hot: [number[], number[]][] = [
                [t1[0], t2[0]],
                [t1[2], t2[2]],
                [t1[3], t2[4]],
                [t2[0], t3[1]],
                [t2[2], t3[1]],
                [t2[4], t3[1]],
              ];
              return (
                <g>
                  <rect
                    x="0"
                    y="26"
                    width="382"
                    height="214"
                    fill="var(--charcoal)"
                    fillOpacity="0.035"
                  />
                  <text
                    {...SVG_LABEL}
                    x="10"
                    y="232"
                    fill="var(--charcoal)"
                    fillOpacity="0.5"
                  >
                    VISIBILITY
                  </text>
                  {[
                    { x: 60, label: "COMPANY" },
                    { x: 290, label: "TIER ONE" },
                    { x: 520, label: "TIER TWO" },
                    { x: 740, label: "TIER THREE" },
                  ].map((h) => (
                    <text
                      key={h.label}
                      {...SVG_LABEL}
                      x={h.x}
                      y="14"
                      textAnchor="middle"
                      fill="var(--charcoal)"
                      fillOpacity="0.6"
                    >
                      {h.label}
                    </text>
                  ))}
                  {t1.map(([x, y]) => (
                    <path
                      key={`c-${y}`}
                      d={`M72 124 C 180 124, 180 ${y}, ${x - 8} ${y}`}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.4"
                    />
                  ))}
                  {faint.map(([a, b]) => (
                    <path
                      key={`f-${a.join()}-${b.join()}`}
                      d={curve(a, b)}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.2"
                      strokeDasharray="3 4"
                    />
                  ))}
                  {hot.map(([a, b]) => (
                    <path
                      key={`h-${a.join()}-${b.join()}`}
                      d={curve(a, b)}
                      stroke="var(--crimson)"
                      strokeOpacity="0.75"
                      strokeWidth="1.5"
                    />
                  ))}
                  <rect
                    x="52"
                    y="116"
                    width="16"
                    height="16"
                    fill="var(--charcoal)"
                    fillOpacity="0.8"
                  />
                  {t1.map(([x, y]) => (
                    <circle
                      key={`t1-${y}`}
                      cx={x}
                      cy={y}
                      r="7"
                      fill="var(--surface)"
                      stroke="var(--charcoal)"
                      strokeOpacity="0.7"
                      strokeWidth="1.5"
                    />
                  ))}
                  {[...t2, t3[0], t3[2]].map(([x, y]) => (
                    <circle
                      key={`h-${x}-${y}`}
                      cx={x}
                      cy={y}
                      r="7"
                      fill="var(--surface)"
                      stroke="var(--charcoal)"
                      strokeOpacity="0.4"
                      strokeDasharray="2 2"
                    />
                  ))}
                  <circle cx="740" cy="124" r="10" fill="var(--crimson)" />
                  <text
                    {...SVG_LABEL}
                    x="740"
                    y="152"
                    textAnchor="middle"
                    fill="var(--crimson)"
                  >
                    CHOKE POINT
                  </text>
                </g>
              );
            })()}
          </svg>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              AI maps complex sub-tier supplier networks by analyzing shipping
              manifests, public records, and payment flows.
            </p>
            <Terms
              items={["shipping manifests", "public records", "payment flows"]}
            />
          </div>
        </div>

        <div className="w-full">
          <p className={`${DISPLAY} mt-12 max-w-4xl`}>
            Graph neural networks identify hidden choke points where multiple
            tier-one suppliers rely on the same tier-three component factory.
          </p>
        </div>
      </Slide>

      <PartPlate
        id="part-5"
        numeral="5"
        title="Warehouse Automation and Vision"
        lines={[
          "The transition to AI-powered distribution centers.",
          "Implementing computer vision for automated quality control.",
          "The synergy between human workers and collaborative robotics.",
        ]}
      />

      {/* ==================================================================
          21 · AI-POWERED DISTRIBUTION CENTER — three lanes kept in step;
          products ordered together slotted side by side; a loop between
          order profiles and layout rules.
      ================================================================== */}
      <Slide id="distribution-center" border align="left">
        <Head eyebrow="Inside the building">
          The AI-Powered Distribution Center
        </Head>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Modern warehouses use AI to orchestrate the movement of goods,
            robots, and human workers simultaneously.
          </p>
          <svg
            aria-hidden
            viewBox="0 0 800 130"
            className="mt-7 w-full max-w-5xl"
            fill="none"
          >
            {[
              { y: 20, label: "GOODS" },
              { y: 56, label: "ROBOTS" },
              { y: 92, label: "HUMAN WORKERS" },
            ].map((lane, l) => (
              <g key={lane.label}>
                <text
                  {...SVG_LABEL}
                  x="0"
                  y={lane.y + 3}
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  {lane.label}
                </text>
                <path
                  d={`M150 ${lane.y}H800`}
                  stroke="var(--charcoal)"
                  strokeOpacity="0.15"
                />
                {Array.from({ length: 11 }).map((_, i) => {
                  const x = 170 + i * 60 + ((i * 13 + l * 17) % 20);
                  return (
                    <rect
                      key={i}
                      x={x - 4}
                      y={lane.y - 4}
                      width="8"
                      height="8"
                      fill="var(--charcoal)"
                      fillOpacity="0.35"
                    />
                  );
                })}
              </g>
            ))}
            {[320, 520, 720].map((x) => (
              <g key={x}>
                <path
                  d={`M${x} 8V104`}
                  stroke="var(--crimson)"
                  strokeOpacity="0.7"
                />
                {[20, 56, 92].map((y) => (
                  <circle key={y} cx={x} cy={y} r="4" fill="var(--crimson)" />
                ))}
              </g>
            ))}
            <text
              {...SVG_LABEL}
              x="800"
              y="126"
              textAnchor="end"
              fill="var(--crimson)"
            >
              SIMULTANEOUSLY
            </text>
          </svg>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Algorithms optimize slotting by predicting which products will be
              ordered together and placing them in proximity.
            </p>
            <div aria-hidden className="mt-6 max-w-4xl">
              <div className="grid grid-cols-12 gap-1">
                {Array.from({ length: 36 }).map((_, i) => {
                  const pair = [13, 14, 27, 28].includes(i);
                  return (
                    <span
                      key={i}
                      className={`block h-7 ${
                        pair
                          ? "bg-[var(--crimson)]"
                          : "border border-[var(--charcoal)]/15"
                      }`}
                    />
                  );
                })}
              </div>
              <div className={`${MICRO} mt-3 text-[var(--crimson)]`}>
                Ordered together · in proximity
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1fr_22rem] md:gap-14">
            <p className={DISPLAY}>
              Reinforcement learning models continuously refine warehouse layout
              rules based on evolving order profiles.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 320 210"
              className="w-full"
              fill="none"
            >
              <path
                d="M90 100A70 70 0 0 1 230 100"
                stroke="var(--charcoal)"
                strokeOpacity="0.45"
                strokeWidth="1.5"
              />
              <path
                d="M224 91l6 9l6 -9"
                stroke="var(--charcoal)"
                strokeOpacity="0.6"
                strokeWidth="1.5"
              />
              <path
                d="M230 112A70 70 0 0 1 90 112"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <path
                d="M84 121l6 -9l6 9"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <text
                {...SVG_LABEL}
                x="160"
                y="20"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                EVOLVING ORDER PROFILES
              </text>
              <text
                {...SVG_LABEL}
                x="160"
                y="200"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                WAREHOUSE LAYOUT RULES
              </text>
              <text
                {...SVG_LABEL}
                x="160"
                y="108"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.45"
              >
                CONTINUOUSLY
              </text>
            </svg>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          22 · COMPUTER VISION FOR QUALITY CONTROL — the three failings of
          manual inspection struck; a conveyor under a vision frame with one
          defect caught; three checks done in milliseconds.   [quiz topic]
      ================================================================== */}
      <Slide id="cv-quality" border align="left">
        <Head eyebrow="Inspection at speed">
          Computer Vision for Quality Control
        </Head>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Manual quality inspection is slow, expensive, and prone to human
            fatigue.
          </p>
          <div aria-hidden className="mt-5 flex flex-wrap gap-2">
            {["slow", "expensive", "prone to human fatigue"].map((t) => (
              <span
                key={t}
                className={`${TAG} border border-[var(--charcoal)]/15 px-2.5 py-1.5 text-[var(--charcoal-light)]/55 [text-decoration-line:line-through]`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Computer vision models inspect products moving on high-speed
              conveyors with sub-millimeter precision.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 800 150"
              className="mt-6 w-full max-w-5xl"
              fill="none"
            >
              <path
                d="M470 20H530M500 20V34"
                stroke="var(--charcoal)"
                strokeOpacity="0.6"
                strokeWidth="1.5"
              />
              <path
                d="M500 36L466 72M500 36L534 72"
                stroke="var(--crimson)"
                strokeOpacity="0.35"
                strokeDasharray="3 3"
              />
              <text
                {...SVG_LABEL}
                x="545"
                y="24"
                fill="var(--crimson)"
              >
                COMPUTER VISION
              </text>
              <path
                d="M0 108H800M0 116H800"
                stroke="var(--charcoal)"
                strokeOpacity="0.4"
              />
              {Array.from({ length: 21 }).map((_, i) => (
                <circle
                  key={i}
                  cx={i * 40}
                  cy="112"
                  r="3"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.35"
                />
              ))}
              {[60, 180, 300, 500, 620, 740].map((x) => {
                const defect = x === 500;
                return (
                  <g key={x}>
                    <rect
                      x={x - 22}
                      y="82"
                      width="44"
                      height="26"
                      fill="var(--surface)"
                      stroke={defect ? "var(--crimson)" : "var(--charcoal)"}
                      strokeOpacity={defect ? 1 : 0.55}
                      strokeWidth={defect ? 2 : 1}
                    />
                    {defect && (
                      <circle cx={x + 8} cy="92" r="2.5" fill="var(--crimson)" />
                    )}
                  </g>
                );
              })}
              <path
                d="M466 72H474M466 72V80M534 72H526M534 72V80"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              {[0, 1, 2].map((i) => (
                <path
                  key={i}
                  d={`M${120 + i * 14} 66l8 4l-8 4`}
                  stroke="var(--charcoal)"
                  strokeOpacity={0.25 + i * 0.2}
                />
              ))}
              <text
                {...SVG_LABEL}
                x="0"
                y="142"
                fill="var(--charcoal)"
                fillOpacity="0.55"
              >
                HIGH-SPEED CONVEYORS
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <Steps
              items={[
                "microscopic defects",
                "labeling compliance",
                "packaging integrity",
                "in milliseconds",
              ]}
              cols="md:grid-cols-4"
              mark={3}
              className="max-w-4xl"
            />
            <p className={`${DISPLAY} mt-7 max-w-4xl`}>
              These systems detect microscopic defects, verify labeling
              compliance, and ensure packaging integrity in milliseconds.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          23 · COLLABORATIVE ROBOTICS — replacement struck against working
          alongside; robot and picker lanes meeting at hand-offs; strain
          down and efficiency up.                        [quiz: cv-quality]
      ================================================================== */}
      <Slide id="cobots" border align="left" quizData={quiz["cobots"]}>
        <Head eyebrow="Working side by side">
          Collaborative Robotics and Human Synergy
        </Head>

        <div className="w-full">
          <div className="mt-10 w-full max-w-5xl">
            <Split
              left="Replacing them entirely"
              right="Alongside human warehouse associates"
              strikeLeft
            />
            <p className={`${BODY} mt-6 max-w-4xl`}>
              Cobots are designed to work safely alongside human warehouse
              associates rather than replacing them entirely.
            </p>
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              AI coordinates the hand-off between autonomous mobile robots and
              human pickers to maximize throughput.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 800 130"
              className="mt-6 w-full max-w-5xl"
              fill="none"
            >
              <text
                {...SVG_LABEL}
                x="0"
                y="22"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                AUTONOMOUS MOBILE ROBOTS
              </text>
              <text
                {...SVG_LABEL}
                x="0"
                y="108"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                HUMAN PICKERS
              </text>
              <path
                d="M220 40H760M220 90H760"
                stroke="var(--charcoal)"
                strokeOpacity="0.3"
              />
              <path
                d="M752 35l8 5l-8 5M752 85l8 5l-8 5"
                stroke="var(--charcoal)"
                strokeOpacity="0.5"
              />
              {[320, 480, 640].map((x) => (
                <g key={x}>
                  <path
                    d={`M${x} 40V90`}
                    stroke="var(--crimson)"
                    strokeWidth="2"
                  />
                  <circle cx={x} cy="40" r="5" fill="var(--crimson)" />
                  <circle cx={x} cy="90" r="5" fill="var(--crimson)" />
                </g>
              ))}
              <text
                {...SVG_LABEL}
                x="480"
                y="68"
                dx="10"
                fill="var(--crimson)"
              >
                HAND-OFF
              </text>
              <text
                {...SVG_LABEL}
                x="800"
                y="126"
                textAnchor="end"
                fill="var(--charcoal)"
                fillOpacity="0.55"
              >
                THROUGHPUT
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <div
              aria-hidden
              className="grid max-w-md grid-cols-2 border-y border-[var(--charcoal)]/15"
            >
              {[
                { label: "Physical strain", glyph: "↓" },
                { label: "Efficiency", glyph: "↑" },
              ].map((m, i) => (
                <div
                  key={m.label}
                  className={`flex items-baseline gap-3 px-4 py-3 ${
                    i > 0 ? "border-l border-[var(--charcoal)]/15" : ""
                  }`}
                >
                  <span className="font-serif text-3xl text-[var(--crimson)]">
                    {m.glyph}
                  </span>
                  <span className={`${MICRO} text-[var(--charcoal-light)]/70`}>
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
            <p className={`${DISPLAY} mt-7 max-w-4xl`}>
              Wearable devices and algorithmic task assignment reduce physical
              strain on workers while improving efficiency.
            </p>
            <Terms
              items={["wearable devices", "algorithmic task assignment"]}
            />
          </div>
        </div>

        <Discussion>
          Does algorithmic task assignment turn human warehouse workers into
          mechanical extensions of the AI, and what are the ethical
          implications?
        </Discussion>
      </Slide>

      {/* ==================================================================
          24 · DIGITAL TWINS — a physical floor plan and its virtual mirror
          joined by real-time IoT data, the same bottleneck in both, the twin
          adding its predicted impact.                        [quiz topic]
      ================================================================== */}
      <Slide id="digital-twins" border align="left">
        <Head eyebrow="Test before you change">
          Digital Twins for Facility Layouts
        </Head>

        <div className="w-full">
          <p className={`${LEAD} mt-9 max-w-4xl`}>
            A digital twin is a virtual simulation of a physical warehouse or
            factory.
          </p>
          <svg
            aria-hidden
            viewBox="0 0 800 226"
            className="mt-8 w-full max-w-5xl"
            fill="none"
          >
            {[
              { x0: 0, label: "PHYSICAL WAREHOUSE", virtual: false },
              { x0: 500, label: "VIRTUAL SIMULATION", virtual: true },
            ].map((plan) => {
              const tone = plan.virtual ? "var(--crimson)" : "var(--charcoal)";
              const dash = plan.virtual ? "4 3" : undefined;
              const bx = plan.x0 + 197.5;
              return (
                <g key={plan.label}>
                  <text
                    {...SVG_LABEL}
                    x={plan.x0 + 150}
                    y="16"
                    textAnchor="middle"
                    fill={tone}
                    fillOpacity={plan.virtual ? 1 : 0.65}
                  >
                    {plan.label}
                  </text>
                  <rect
                    x={plan.x0 + 2}
                    y="30"
                    width="296"
                    height="140"
                    stroke={tone}
                    strokeOpacity={plan.virtual ? 0.7 : 0.55}
                    strokeDasharray={dash}
                  />
                  {[48, 84, 120, 146].map((y) =>
                    [20, 115, 210].map((x) => (
                      <rect
                        key={`${x}-${y}`}
                        x={plan.x0 + x}
                        y={y}
                        width="70"
                        height="12"
                        fill={tone}
                        fillOpacity={plan.virtual ? 0.1 : 0.14}
                        stroke={tone}
                        strokeOpacity={plan.virtual ? 0.5 : 0}
                        strokeDasharray={dash}
                      />
                    )),
                  )}
                  {[
                    [-6, -3],
                    [4, -4],
                    [-2, 3],
                    [7, 2],
                    [0, 0],
                  ].map(([dx, dy], k) => (
                    <circle
                      key={k}
                      cx={bx + dx}
                      cy={109 + dy}
                      r="2.2"
                      fill="var(--crimson)"
                    />
                  ))}
                  {plan.virtual && (
                    <circle
                      cx={bx}
                      cy="109"
                      r="20"
                      stroke="var(--crimson)"
                      strokeDasharray="2 3"
                    />
                  )}
                  <path
                    d={`M${bx} ${plan.virtual ? 131 : 116}V198`}
                    stroke="var(--crimson)"
                    strokeOpacity="0.45"
                  />
                  <text
                    {...SVG_LABEL}
                    x={bx}
                    y="214"
                    textAnchor="middle"
                    fill="var(--crimson)"
                  >
                    BOTTLENECKS
                  </text>
                </g>
              );
            })}
            <path d="M318 100H478" stroke="var(--crimson)" strokeWidth="2" />
            <path d="M470 94l8 6l-8 6" stroke="var(--crimson)" strokeWidth="2" />
            <text
              {...SVG_LABEL}
              x="398"
              y="86"
              textAnchor="middle"
              fill="var(--charcoal)"
              fillOpacity="0.65"
            >
              REAL-TIME IOT DATA
            </text>
          </svg>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <Split
              left="Disrupting actual operations"
              right="Test new layouts and processes"
              strikeLeft
            />
            <p className={`${BODY} mt-6 max-w-4xl`}>
              Operations managers use these AI-driven simulations to test new
              layouts and processes without disrupting actual operations.
            </p>
          </div>
        </div>

        <div className="w-full">
          <p className={`${DISPLAY} mt-12 max-w-4xl`}>
            The twin ingests real-time IoT data to accurately mirror the current
            state and predict the impact of bottlenecks.
          </p>
        </div>
      </Slide>

      <PartPlate
        id="part-6"
        numeral="6"
        title="Sustainability and Circularity"
        lines={[
          "Leveraging algorithms to reduce the environmental impact of operations.",
          "Managing the complexities of reverse logistics.",
          "Driving the transition toward a circular economy.",
        ]}
        quizData={quiz["part-6"]}
      />

      {/* ==================================================================
          26 · CARBON FOOTPRINT — total emissions as one bar, supply chains
          taking most of it; routing objective widened to fuel; sourcing
          scenarios compared on carbon impact before the decision.
      ================================================================== */}
      <Slide id="carbon-footprint" border align="left">
        <Head eyebrow="Emissions">Optimizing the Carbon Footprint</Head>

        <div className="w-full">
          <p className={`${LEAD} mt-9 max-w-4xl`}>
            Supply chains account for the vast majority of a modern
            corporation&apos;s total carbon emissions.
          </p>
          <figure aria-hidden className="mt-7 w-full max-w-4xl">
            <div className={`${MICRO} text-[var(--charcoal-light)]/55`}>
              Total carbon emissions
            </div>
            <div className="mt-3 flex h-10 w-full border border-[var(--charcoal)]/20">
              <div className="flex h-full w-[82%] items-center bg-[var(--crimson)] px-4">
                <span className={`${MICRO} text-[var(--surface)]`}>
                  Supply chains
                </span>
              </div>
              <div className="h-full flex-1 bg-[var(--charcoal)]/10" />
            </div>
            <Schematic className="mt-2" />
          </figure>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Route optimization algorithms explicitly minimize fuel consumption
              rather than just delivery time.
            </p>
            <div aria-hidden className="mt-6 max-w-3xl">
              <Split left="Just delivery time" right="Fuel consumption" />
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <figure aria-hidden className="max-w-4xl">
              <div className="grid grid-cols-[8rem_1fr] items-end gap-4 border-b border-[var(--charcoal)]/15 pb-2">
                <span className={`${MICRO} text-[var(--charcoal-light)]/55`}>
                  Sourcing scenarios
                </span>
                <span className={`${MICRO} text-[var(--charcoal-light)]/55`}>
                  Carbon impact
                </span>
              </div>
              {[
                { w: "78%", pick: false },
                { w: "36%", pick: true },
                { w: "58%", pick: false },
              ].map((s, i) => (
                <div
                  key={s.w}
                  className="grid grid-cols-[8rem_1fr] items-center gap-4 border-b border-[var(--charcoal)]/8 py-3"
                >
                  <span
                    className={`${MICRO} ${
                      s.pick
                        ? "text-[var(--crimson)]"
                        : "text-[var(--champagne)]"
                    }`}
                  >
                    {pad(i + 1)}
                  </span>
                  <span
                    className={`block h-3 ${
                      s.pick
                        ? "bg-[var(--crimson)]"
                        : "bg-[var(--charcoal)]/25"
                    }`}
                    style={{ width: s.w }}
                  />
                </div>
              ))}
              <div className="mt-3 flex items-center justify-end gap-3">
                <span className={`${MICRO} text-[var(--crimson)]`}>
                  Before making purchasing decisions
                </span>
              </div>
              <Schematic className="mt-2" />
            </figure>
            <p className={`${DISPLAY} mt-7 max-w-4xl`}>
              AI models help procurement teams evaluate the carbon impact of
              different sourcing scenarios before making purchasing decisions.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          27 · REVERSE LOGISTICS — returned goods assessed for condition and
          routed three ways; forecast return volumes with capacity set to
          meet them.                                          [quiz topic]
      ================================================================== */}
      <Slide id="reverse-logistics" border align="left">
        <Head eyebrow="Goods coming back">
          AI in Reverse Logistics and Returns
        </Head>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Processing product returns is a highly complex, labor-intensive
            operational challenge.
          </p>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Computer vision systems automatically assess the condition of
              returned goods to determine if they should be restocked,
              refurbished, or recycled.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 800 140"
              className="mt-6 w-full max-w-5xl"
              fill="none"
            >
              {[0, 1, 2].map((i) => (
                <rect
                  key={i}
                  x={10 + i * 30}
                  y={58 - (i % 2) * 8}
                  width="24"
                  height="24"
                  fill="var(--surface)"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.55"
                />
              ))}
              <text
                {...SVG_LABEL}
                x="0"
                y="112"
                fill="var(--charcoal)"
                fillOpacity="0.55"
              >
                RETURNED GOODS
              </text>
              <path
                d="M120 70H268"
                stroke="var(--charcoal)"
                strokeOpacity="0.35"
              />
              <path
                d="M261 65l7 5l-7 5"
                stroke="var(--charcoal)"
                strokeOpacity="0.5"
              />
              <path
                d="M284 50H294M284 50V60M340 50H330M340 50V60M284 90H294M284 90V80M340 90H330M340 90V80"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <rect
                x="300"
                y="58"
                width="24"
                height="24"
                fill="var(--surface)"
                stroke="var(--charcoal)"
                strokeOpacity="0.55"
              />
              <text
                {...SVG_LABEL}
                x="312"
                y="112"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                CONDITION
              </text>
              {[
                { y: 24, label: "RESTOCKED" },
                { y: 70, label: "REFURBISHED" },
                { y: 116, label: "RECYCLED" },
              ].map((b) => (
                <g key={b.label}>
                  <path
                    d={`M356 70 C 440 70, 460 ${b.y}, 560 ${b.y}`}
                    stroke="var(--crimson)"
                    strokeOpacity="0.55"
                  />
                  <rect
                    x="568"
                    y={b.y - 6}
                    width="12"
                    height="12"
                    fill="var(--crimson)"
                  />
                  <text
                    {...SVG_LABEL}
                    x="594"
                    y={b.y + 3}
                    fill="var(--charcoal)"
                    fillOpacity="0.7"
                  >
                    {b.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <figure aria-hidden className="w-full">
              <svg viewBox="0 0 800 130" className="w-full" fill="none">
                {Array.from({ length: 24 }).map((_, i) => {
                  const h = 30 + 34 * Math.max(0, Math.sin((i / 23) * Math.PI * 2 - 0.6)) + ((i * 13) % 7);
                  const forecast = i >= 18;
                  return (
                    <rect
                      key={i}
                      x={i * 33 + 4}
                      y={106 - h}
                      width="20"
                      height={h}
                      fill={forecast ? "var(--surface)" : "var(--charcoal)"}
                      fillOpacity={forecast ? 1 : 0.25}
                      stroke={forecast ? "var(--charcoal)" : "none"}
                      strokeOpacity="0.5"
                      strokeDasharray={forecast ? "3 2" : undefined}
                    />
                  );
                })}
                <path
                  d={Array.from({ length: 24 })
                    .map((_, i) => {
                      const h = 30 + 34 * Math.max(0, Math.sin((i / 23) * Math.PI * 2 - 0.6)) + ((i * 13) % 7);
                      const y = (106 - h - 8).toFixed(1);
                      return `${i === 0 ? "M" : "H"}${i * 33}${i === 0 ? ` ${y}` : `V${y}`}`;
                    })
                    .join("") + "H800"}
                  stroke="var(--crimson)"
                  strokeWidth="2"
                />
                <text
                  {...SVG_LABEL}
                  x="0"
                  y="124"
                  fill="var(--charcoal)"
                  fillOpacity="0.55"
                >
                  RETURN VOLUMES
                </text>
                <text
                  {...SVG_LABEL}
                  x="800"
                  y="124"
                  textAnchor="end"
                  fill="var(--crimson)"
                >
                  REVERSE NETWORK CAPACITY
                </text>
              </svg>
              <Schematic />
            </figure>
            <Terms items={["product characteristics", "seasonal trends"]} />
            <p className={`${DISPLAY} mt-7 max-w-4xl`}>
              Predictive models anticipate return volumes based on product
              characteristics and seasonal trends, optimizing reverse network
              capacity.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          28 · WASTE REDUCTION — production against demand, the excess shaded
          as overproduction; the same pair under precision forecasting with
          little left unsold; spoilage struck.   [quiz: reverse-logistics]
      ================================================================== */}
      <Slide
        id="waste-reduction"
        border
        align="left"
        quizData={quiz["waste-reduction"]}
      >
        <Head eyebrow="Less left over">
          Waste Reduction via Precision Forecasting
        </Head>

        <div className="mt-10 grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-14">
          {[
            {
              line: "Overproduction in manufacturing leads to significant material waste and energy consumption.",
              excess: "38%",
              excessLabel: "Overproduction",
              terms: ["material waste", "energy consumption"],
            },
            {
              line: "Precision demand forecasting directly reduces the amount of unsold inventory that ends up in landfills.",
              excess: "8%",
              excessLabel: "Unsold inventory",
              terms: ["landfills"],
            },
          ].map((panel, p) => (
            <div key={panel.excessLabel}>
              <p className={BODY}>{panel.line}</p>
              <figure aria-hidden className="mt-6">
                {p === 1 && (
                  <div className={`${MICRO} mb-3 text-[var(--crimson)]`}>
                    Precision demand forecasting
                  </div>
                )}
                {p === 0 && (
                  <div className={`${MICRO} mb-3 text-[var(--champagne)]`}>
                    Manufacturing
                  </div>
                )}
                <div className="grid grid-cols-[6.5rem_1fr] items-center gap-x-3 gap-y-2">
                  <span className={`${MICRO} text-[var(--charcoal-light)]/60`}>
                    Production
                  </span>
                  <div className="flex h-5 w-full">
                    <span
                      className="block h-full bg-[var(--charcoal)]/30"
                      style={{ width: "54%" }}
                    />
                    <span
                      className="block h-full border border-[var(--crimson)] bg-[repeating-linear-gradient(135deg,var(--crimson)_0_2px,transparent_2px_7px)] opacity-80"
                      style={{ width: panel.excess }}
                    />
                  </div>
                  <span className={`${MICRO} text-[var(--charcoal-light)]/60`}>
                    Demand
                  </span>
                  <div className="flex h-5 w-full">
                    <span
                      className="block h-full bg-[var(--charcoal)]/30"
                      style={{ width: "54%" }}
                    />
                  </div>
                </div>
                <div className={`${MICRO} mt-3 text-right text-[var(--crimson)]`}>
                  {panel.excessLabel}
                </div>
                <Schematic className="mt-1" />
              </figure>
              <Terms items={panel.terms} />
            </div>
          ))}
        </div>

        <div className="w-full">
          <div className="mt-14 w-full max-w-5xl">
            <Split
              left="Spoilage"
              right="Flow of perishable goods"
              strikeLeft
            />
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              In the food and beverage industry, AI tracking algorithms minimize
              spoilage by optimizing the flow of perishable goods.
            </p>
          </div>
        </div>
      </Slide>

      <PartPlate
        id="part-7"
        numeral="7"
        title="Risks and Implementation Strategies"
        lines={[
          "Addressing the operational challenges of AI adoption.",
          "Overcoming data silos and legacy infrastructure.",
          "Navigating the cybersecurity landscape of connected networks.",
        ]}
      />

      {/* ==================================================================
          30 · BLACK BOX — inputs vanishing into an opaque model that emits a
          recommendation; planners' hesitation; explainable AI as the bridge
          between operators and systems.                      [quiz topic]
      ================================================================== */}
      <Slide id="black-box" border align="left">
        <Head eyebrow="Trust" signal>
          The Black Box Problem in Operations
        </Head>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Deep learning models often lack transparency in how they arrive at
            specific operational recommendations.
          </p>
          <svg
            aria-hidden
            viewBox="0 0 800 130"
            className="mt-7 w-full max-w-5xl"
            fill="none"
          >
            {[20, 50, 80, 110].map((y) => (
              <path
                key={y}
                d={`M0 ${y} C 150 ${y}, 200 65, 310 65`}
                stroke="var(--charcoal)"
                strokeOpacity="0.25"
              />
            ))}
            <rect
              x="310"
              y="20"
              width="180"
              height="90"
              fill="var(--charcoal)"
              fillOpacity="0.9"
            />
            <text
              {...SVG_LABEL}
              x="400"
              y="126"
              textAnchor="middle"
              fill="var(--charcoal)"
              fillOpacity="0.6"
            >
              DEEP LEARNING MODELS
            </text>
            <path d="M490 65H570" stroke="var(--charcoal)" strokeOpacity="0.45" />
            <path
              d="M563 60l7 5l-7 5"
              stroke="var(--charcoal)"
              strokeOpacity="0.6"
            />
            <rect x="580" y="57" width="16" height="16" fill="var(--crimson)" />
            <text
              {...SVG_LABEL}
              x="608"
              y="62"
              fill="var(--charcoal)"
              fillOpacity="0.7"
            >
              OPERATIONAL
            </text>
            <text
              {...SVG_LABEL}
              x="608"
              y="76"
              fill="var(--charcoal)"
              fillOpacity="0.7"
            >
              RECOMMENDATIONS
            </text>
          </svg>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${LEAD} max-w-4xl`}>
              Supply chain planners hesitate to execute multi-million dollar
              inventory decisions without understanding the underlying
              rationale.
            </p>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <svg
              aria-hidden
              viewBox="0 0 800 70"
              className="w-full"
              fill="none"
            >
              <circle
                cx="60"
                cy="30"
                r="10"
                fill="var(--surface)"
                stroke="var(--charcoal)"
                strokeOpacity="0.7"
                strokeWidth="1.5"
              />
              <text
                {...SVG_LABEL}
                x="0"
                y="64"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                HUMAN OPERATORS
              </text>
              <rect
                x="730"
                y="20"
                width="20"
                height="20"
                fill="var(--charcoal)"
                fillOpacity="0.85"
              />
              <text
                {...SVG_LABEL}
                x="800"
                y="64"
                textAnchor="end"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                ALGORITHMIC SYSTEMS
              </text>
              <path d="M76 30H724" stroke="var(--crimson)" strokeWidth="2" />
              <text
                {...SVG_LABEL}
                x="400"
                y="18"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                EXPLAINABLE AI · TRUST
              </text>
            </svg>
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              Explainable AI techniques are critical for building trust between
              human operators and algorithmic systems.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          31 · DATA SILOS AND LEGACY SYSTEMS — an ERP that cannot reach the
          AI platform; messy records cleaned into rows; the same gap closed
          by a middleware layer.                          [quiz: black-box]
      ================================================================== */}
      <Slide
        id="legacy-systems"
        border
        align="left"
        quizData={quiz["legacy-systems"]}
      >
        <Head eyebrow="Plumbing first">
          Overcoming Data Silos and Legacy Systems
        </Head>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Many organizations rely on decades-old ERP systems that cannot
            integrate easily with modern AI platforms.
          </p>
          <svg
            aria-hidden
            viewBox="0 0 800 60"
            className="mt-6 w-full max-w-5xl"
            fill="none"
          >
            <rect
              x="1"
              y="8"
              width="230"
              height="44"
              stroke="var(--charcoal)"
              strokeOpacity="0.5"
            />
            <text
              {...SVG_LABEL}
              x="116"
              y="34"
              textAnchor="middle"
              fill="var(--charcoal)"
              fillOpacity="0.7"
            >
              DECADES-OLD ERP SYSTEMS
            </text>
            <rect
              x="569"
              y="8"
              width="230"
              height="44"
              stroke="var(--charcoal)"
              strokeOpacity="0.5"
            />
            <text
              {...SVG_LABEL}
              x="684"
              y="34"
              textAnchor="middle"
              fill="var(--charcoal)"
              fillOpacity="0.7"
            >
              MODERN AI PLATFORMS
            </text>
            <path
              d="M240 30H370M430 30H560"
              stroke="var(--charcoal)"
              strokeOpacity="0.35"
              strokeDasharray="4 4"
            />
            <path
              d="M390 20l20 20M410 20l-20 20"
              stroke="var(--crimson)"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Master data management is a prerequisite for AI, requiring massive
              efforts to clean and standardize supply chain records.
            </p>
            <div
              aria-hidden
              className="mt-6 grid max-w-3xl grid-cols-[1fr_auto_1fr] items-center gap-6"
            >
              <div className="space-y-2">
                {[
                  [8, 62],
                  [0, 40],
                  [22, 70],
                  [4, 30],
                  [14, 55],
                ].map(([offset, width], i) => (
                  <span
                    key={i}
                    className="block h-2 bg-[var(--charcoal)]/25"
                    style={{ marginLeft: `${offset}%`, width: `${width}%` }}
                  />
                ))}
              </div>
              <span className="font-serif text-3xl font-light text-[var(--crimson)]">
                →
              </span>
              <div className="space-y-2">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className="flex h-2 gap-1"
                  >
                    <span className="block h-full w-1/4 bg-[var(--crimson)]/70" />
                    <span className="block h-full w-1/2 bg-[var(--charcoal)]/25" />
                    <span className="block h-full w-1/4 bg-[var(--charcoal)]/15" />
                  </span>
                ))}
              </div>
            </div>
            <div
              aria-hidden
              className="mt-3 grid max-w-3xl grid-cols-[1fr_auto_1fr] gap-6"
            >
              <span className={`${MICRO} text-[var(--charcoal-light)]/55`}>
                Supply chain records
              </span>
              <span className="w-[1.5ch]" />
              <span className={`${MICRO} text-[var(--crimson)]`}>
                Clean and standardize
              </span>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <svg
              aria-hidden
              viewBox="0 0 800 60"
              className="w-full"
              fill="none"
            >
              <rect
                x="1"
                y="8"
                width="230"
                height="44"
                stroke="var(--charcoal)"
                strokeOpacity="0.5"
              />
              <text
                {...SVG_LABEL}
                x="116"
                y="34"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.7"
              >
                LEGACY DATABASES
              </text>
              <rect x="285" y="8" width="230" height="44" fill="var(--crimson)" />
              <text
                {...SVG_LABEL}
                x="400"
                y="34"
                textAnchor="middle"
                fill="var(--surface)"
              >
                MIDDLEWARE LAYER
              </text>
              <rect
                x="569"
                y="8"
                width="230"
                height="44"
                stroke="var(--charcoal)"
                strokeOpacity="0.5"
              />
              <text
                {...SVG_LABEL}
                x="684"
                y="34"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.7"
              >
                CLOUD-BASED AI
              </text>
              <path
                d="M231 30H285M515 30H569"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
            </svg>
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              Successful implementations often require a middleware layer to
              bridge the gap between legacy databases and cloud-based AI.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          32 · CYBERSECURITY — exposure rising as networks connect; one
          anomalous burst caught in steady traffic; an adversarial attack
          aimed at the model itself.
      ================================================================== */}
      <Slide id="cybersecurity" border align="left">
        <Head eyebrow="Connected and exposed">
          Cybersecurity in Connected Networks
        </Head>

        <div className="w-full">
          <div className="mt-10 grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1fr_24rem] md:gap-14">
            <p className={BODY}>
              As supply chains become more interconnected and automated, their
              vulnerability to cyberattacks increases exponentially.
            </p>
            <figure aria-hidden className="w-full">
              <svg viewBox="0 0 360 190" className="w-full" fill="none">
                <path
                  d="M20 20V160H350"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.35"
                />
                <path
                  d={Array.from({ length: 34 })
                    .map((_, i) => {
                      const x = 20 + i * 10;
                      const y = 158 - 3 * (Math.exp((i / 33) * 3.8) - 1);
                      return `${i === 0 ? "M" : "L"}${x} ${y.toFixed(1)}`;
                    })
                    .join("")}
                  stroke="var(--crimson)"
                  strokeWidth="2"
                />
                <text
                  {...SVG_LABEL}
                  x="30"
                  y="14"
                  fill="var(--crimson)"
                >
                  VULNERABILITY
                </text>
                <text
                  {...SVG_LABEL}
                  x="350"
                  y="182"
                  textAnchor="end"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  INTERCONNECTED · AUTOMATED
                </text>
              </svg>
              <Schematic />
            </figure>
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              AI systems are used to detect anomalous network traffic and
              prevent supply chain ransomware attacks.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 800 90"
              className="mt-6 w-full max-w-5xl"
              fill="none"
            >
              <path d="M0 56H800" stroke="var(--charcoal)" strokeOpacity="0.15" />
              {Array.from({ length: 100 }).map((_, i) => {
                const x = 4 + i * 8;
                const burst = i >= 58 && i <= 62;
                const h = burst ? 22 + ((i * 5) % 3) * 6 : 3 + ((i * 7) % 5);
                return (
                  <path
                    key={i}
                    d={`M${x} ${56 - h}V${56 + h}`}
                    stroke={burst ? "var(--crimson)" : "var(--charcoal)"}
                    strokeOpacity={burst ? 1 : 0.35}
                    strokeWidth={burst ? 2 : 1}
                  />
                );
              })}
              <circle
                cx="484"
                cy="56"
                r="34"
                stroke="var(--crimson)"
                strokeDasharray="3 3"
              />
              <text
                {...SVG_LABEL}
                x="530"
                y="16"
                fill="var(--crimson)"
              >
                ANOMALOUS NETWORK TRAFFIC
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <svg
              aria-hidden
              viewBox="0 0 800 110"
              className="w-full"
              fill="none"
            >
              <text {...SVG_LABEL} x="0" y="59" fill="var(--crimson)">
                ADVERSARIAL ATTACKS
              </text>
              <path
                d="M170 55H300"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <path
                d="M292 49l8 6l-8 6"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <rect
                x="310"
                y="25"
                width="160"
                height="60"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <text
                {...SVG_LABEL}
                x="390"
                y="59"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.75"
              >
                AI MODELS
              </text>
              {[
                { y: 28, label: "FORECASTING" },
                { y: 82, label: "ROUTING DATA" },
              ].map((o) => (
                <g key={o.label}>
                  <path
                    d={`M470 55 C 520 55, 540 ${o.y}, 590 ${o.y}`}
                    stroke="var(--crimson)"
                    strokeOpacity="0.6"
                    strokeDasharray="4 4"
                  />
                  <text
                    {...SVG_LABEL}
                    x="604"
                    y={o.y + 3}
                    fill="var(--charcoal)"
                    fillOpacity="0.7"
                  >
                    {o.label}
                  </text>
                </g>
              ))}
            </svg>
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              However, the AI models themselves can be targeted by adversarial
              attacks designed to manipulate forecasting or routing data.
            </p>
          </div>
        </div>

        <Discussion>
          Who is liable when a third-party AI optimization tool is breached,
          causing a systemic shutdown of your logistics network?
        </Discussion>
      </Slide>

      {/* ==================================================================
          33 · HUMAN-AI TRANSITION — planner struck for algorithm manager;
          three investments; change management weighed above technology.
      ================================================================== */}
      <Slide id="human-ai-transition" border align="left">
        <Head eyebrow="People">The Human-AI Transition in Operations</Head>

        <div className="w-full">
          <div className="mt-10 w-full max-w-5xl">
            <Split
              left="Manual planner"
              right="Algorithm manager"
              strikeLeft
            />
            <p className={`${LEAD} mt-6 max-w-4xl`}>
              The role of the supply chain professional is shifting from manual
              planner to algorithm manager.
            </p>
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Organizations must invest heavily in upskilling their workforce to
              interpret AI outputs and manage exceptions.
            </p>
            <Steps
              items={[
                "upskilling their workforce",
                "interpret AI outputs",
                "manage exceptions",
              ]}
              cols="md:grid-cols-3"
              className="mt-6 max-w-4xl"
            />
          </div>
        </div>

        <div className="w-full">
          <div className="mt-14 w-full max-w-5xl">
            <div
              aria-hidden
              className="flex flex-wrap items-center gap-x-8 gap-y-3"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--crimson)]">
                change management
              </span>
              <span className="font-serif text-4xl font-light text-[var(--charcoal)]/35">
                &gt;
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--charcoal-light)]/45">
                underlying technology
              </span>
            </div>
            <p className={`${DISPLAY} mt-7 max-w-4xl`}>
              Change management is often a larger barrier to AI success than the
              underlying technology itself.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          34 · CONCLUSION — the four things a self-driving supply chain does,
          then the three closing statements in display weight, then the
          colophon.
      ================================================================== */}
      <Slide
        id="conclusion"
        border
        align="left"
        className="relative overflow-hidden"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-10 right-0 select-none font-serif text-[24vw] font-black leading-none text-[var(--charcoal)]/[0.03]"
        >
          05
        </span>

        <Head eyebrow="What to carry forward">
          Conclusion: The Autonomous Supply Chain
        </Head>

        <div className="w-full">
          <ol
            aria-hidden
            className="mt-11 grid w-full max-w-3xl grid-cols-2 gap-y-5 sm:grid-cols-4"
          >
            {["forecast", "procure", "manufacture", "deliver"].map(
              (step, i) => (
                <li
                  key={step}
                  className="relative border-t-2 border-[var(--crimson)]/70 pr-3 pt-3"
                >
                  <span className={`${MICRO} block text-[var(--champagne)]`}>
                    {pad(i + 1)}
                  </span>
                  <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--charcoal-light)]/70">
                    {step}
                  </span>
                </li>
              ),
            )}
          </ol>
        </div>

        <ol className="mt-10 w-full max-w-4xl">
          {[
            "The ultimate goal is a self-driving supply chain that can forecast, procure, manufacture, and deliver with minimal human intervention.",
            "While fully autonomous operations are years away, targeted AI deployments are already creating massive competitive advantages.",
            "Operations management is fundamentally transitioning from an execution discipline to a data science discipline.",
          ].map((line, i) => (
            <li key={line} className="block">
              <div className="grid grid-cols-[4ch_1fr] gap-6 border-t border-[var(--charcoal)]/12 py-7 md:grid-cols-[5ch_1fr] md:gap-10">
                <span className={`${MICRO} pt-3 text-[var(--crimson)]`}>
                  {pad(i + 1)}
                </span>
                <p className="font-serif text-xl font-bold leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[1.75rem]">
                  {line}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="w-full">
          <div className="mt-12 flex w-full max-w-4xl flex-wrap items-baseline justify-between gap-4 border-t border-[var(--charcoal)]/12 pt-5">
            <span className={`${MICRO} text-[var(--champagne)]`}>
              End of Week 05
            </span>
            <span
              className={`${MICRO} font-normal text-[var(--charcoal-light)]/55`}
            >
              Davood Wadi, PhD · BUSI 654
            </span>
          </div>
        </div>
      </Slide>
    </SlideDeck>
  );
}
