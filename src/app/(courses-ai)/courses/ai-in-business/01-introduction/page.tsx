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
// WEEK 01 — INTRODUCTION TO AI IN BUSINESS
// ============================================================================
// Every slide below is hand-composed. There is no shared "content block"
// component: each section gets a layout drawn for its own argument — a ledger,
// a decaying cost curve, a balance beam, a flywheel, a vault, a masthead.
//
// The only things shared across slides are the deck chrome (SlideDeck, Slide,
// ScrollProgress) and two motion/typography atoms below, because motion and
// small-caps tracking must be identical everywhere or the deck stops feeling
// like one object.
//
// House rules, inherited from the deck:
//   • Ink on cream. Hairlines, never boxes. Crimson marks exactly one thing.
//   • Champagne is for small-caps labels and numerals only.
//   • Motion is opacity plus a few pixels. Nothing scales, blurs, or springs.
//
// Sentences are transcribed verbatim from content.md.
// Knowledge checks render immediately BEFORE the slide they are attached to,
// so each quiz only tests material from slides the student has already passed.
// ============================================================================

const quiz = createCourseQuizLookup(quizzes as CourseQuiz[]);

/** Small-caps label treatment used for every eyebrow, axis tick and numeral. */
const MICRO = "font-sans text-[10px] font-semibold uppercase tracking-[0.22em]";

export default function Week01Introduction() {
  return (
    <SlideDeck>
      <ScrollProgress label="Week 01" />

      {/* ==================================================================
          01 · TITLE — a broadsheet masthead. Ghost week numeral behind the
          type, folio rails in both margins, the subtitle set as a standfirst
          beneath a full-measure rule.
      ================================================================== */}
      <Slide id="title" align="left" className="relative overflow-hidden">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 select-none font-serif text-[36vw] font-black leading-none text-[var(--charcoal)]/[0.035] md:text-[28vw]"
        >
          01
        </span>

        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 hidden h-full w-px bg-[var(--charcoal)]/8 lg:block"
        />

        <div>
          <div className={`${MICRO} flex items-center gap-4 text-[var(--champagne)]`}>
            <span className="h-px w-10 bg-[var(--crimson)]" />
            Week 01: Course Overview and Foundations
          </div>
        </div>

        <div>
          <h1 className="mt-10 max-w-5xl font-serif text-[clamp(2.75rem,9vw,6.5rem)] font-black leading-[0.9] tracking-[-0.035em] text-[var(--charcoal)]">
            Applications of
            <br />
            AI in <span className="text-[var(--crimson)]">Business</span>
          </h1>
        </div>

        <div className="w-full">
          <div className="mt-12 h-px w-full bg-[var(--charcoal)]/15" />
          <p className="mt-6 max-w-3xl font-serif text-xl font-light italic leading-relaxed text-[var(--charcoal-light)] md:text-[1.75rem]">
            Understanding how modern intelligent systems create value, change
            decisions, and require human leadership
          </p>
        </div>

        <div className="w-full">
          <div className="mt-14 flex w-full flex-wrap items-baseline justify-between gap-4 border-t border-[var(--charcoal)]/12 pt-5">
            <span className={`${MICRO} text-[var(--champagne)]`}>
              Davood Wadi, PhD
            </span>
            <span className={`${MICRO} font-normal text-[var(--charcoal-light)]/60`}>
              BUSI 654 · Applications of AI in Business
            </span>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          02 · WHY LEADERS — the argument is a subtraction, so the slide is
          built as one: the struck line on the left, the kept line on the
          right, and the strategic goal set apart as a signed verdict.
      ================================================================== */}
      <Slide id="why-leaders" border align="left">
        <div>
          <div className={`${MICRO} text-[var(--champagne)]`}>Opening</div>
          <h2 className="mt-5 max-w-4xl font-serif text-[2rem] font-bold leading-[1.04] tracking-[-0.02em] text-[var(--charcoal)] md:text-[3rem]">
            Why Business Leaders Must Understand AI
          </h2>
        </div>

        <div className="w-full">
          <div className="mt-10 grid gap-x-14 gap-y-6 border-t border-[var(--charcoal)]/10 pt-8 md:grid-cols-2">
            <p className="font-serif text-lg leading-[1.65] text-[var(--charcoal)] md:text-[1.375rem]">
              Artificial intelligence has moved from research labs into core
              business operations.
            </p>
            <p className="font-serif text-lg leading-[1.65] text-[var(--charcoal-light)] md:text-[1.375rem]">
              Modern companies process massive volumes of customer, transaction,
              and operational data every second.
            </p>
          </div>
        </div>

        <div className="mt-14 grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-0">
          <div className="md:pr-12">
            <div className={`${MICRO} text-[var(--charcoal-light)]/45`}>
              Leaders do not need
            </div>
            <p className="mt-4 font-serif text-xl leading-[1.5] text-[var(--charcoal-light)]/45 [text-decoration-line:line-through] [text-decoration-thickness:1px] md:text-[1.625rem]">
              Leaders do not need to write raw code.
            </p>
          </div>

          <div className="md:border-l md:border-[var(--charcoal)]/12 md:pl-12">
            <div className={`${MICRO} text-[var(--crimson)]`}>
              Leaders do need
            </div>
            <p className="mt-4 font-serif text-xl leading-[1.5] text-[var(--charcoal)] md:text-[1.625rem]">
              Leaders do need to understand what AI can and cannot do well.
            </p>
          </div>
        </div>

        <div className="w-full">
          <figure className="mt-16 max-w-4xl border-l-2 border-[var(--crimson)] pl-6 md:pl-8">
            <div className={`${MICRO} text-[var(--champagne)]`}>
              The strategic goal
            </div>
            <blockquote className="mt-3 font-serif text-[1.375rem] font-bold leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[2rem]">
              The primary strategic goal is knowing which business decisions can
              be improved with machine assistance.
            </blockquote>
          </figure>
        </div>
      </Slide>

      {/* ==================================================================
          03 · BUSINESS AS DECISIONS — a decision ledger. Three functions,
          three recurring choices, ruled like an account book, converging on
          one bottom line.                                          [quiz]
      ================================================================== */}
      <Slide
        id="business-decisions"
        border
        align="left"
        quizData={quiz["business-decisions"]}
      >
        <div>
          <div className={`${MICRO} text-[var(--champagne)]`}>
            The unit of value
          </div>
          <h2 className="mt-5 max-w-4xl font-serif text-[2rem] font-bold leading-[1.04] tracking-[-0.02em] text-[var(--charcoal)] md:text-[3rem]">
            Business as a Series of Decisions
          </h2>
          <p className="mt-7 max-w-3xl font-serif text-xl leading-[1.6] text-[var(--charcoal-light)] md:text-[1.5rem]">
            Every business runs on repeated decisions made under uncertainty.
          </p>
        </div>

        <div className="mt-12 w-full max-w-5xl">
          <div>
            <div
              className={`${MICRO} grid grid-cols-1 gap-2 border-b border-[var(--charcoal)]/15 pb-3 text-[var(--charcoal-light)]/45 md:grid-cols-[12rem_1fr] md:gap-10`}
            >
              <span>Function</span>
              <span>The choice, made again and again</span>
            </div>
          </div>

          {[
            {
              n: "01",
              who: "Marketers",
              line: "Marketers choose which audience to target and which message to show.",
            },
            {
              n: "02",
              who: "Financial managers",
              line: "Financial managers decide which loans to approve and which transactions to review for fraud.",
            },
            {
              n: "03",
              who: "Supply chain teams",
              line: "Supply chain teams estimate how much inventory to order and when to replenish stock.",
            },
          ].map((row) => (
            <div key={row.n}>
              <div className="grid grid-cols-1 items-baseline gap-2 border-b border-[var(--charcoal)]/8 py-6 md:grid-cols-[12rem_1fr] md:gap-10">
                <div className="flex items-baseline gap-3 md:block">
                  <span
                    className={`${MICRO} text-[var(--champagne)] md:block`}
                    aria-hidden
                  >
                    {row.n}
                  </span>
                  <span className="font-sans text-xs font-semibold uppercase leading-[1.4] tracking-[0.14em] text-[var(--charcoal)] md:mt-2 md:block">
                    {row.who}
                  </span>
                </div>
                <p className="font-serif text-lg leading-[1.6] text-[var(--charcoal)] md:text-[1.375rem]">
                  {row.line}
                </p>
              </div>
            </div>
          ))}

          <div>
            <div className="mt-10">
              <svg
                aria-hidden
                viewBox="0 0 160 34"
                className="h-[34px] w-[160px] text-[var(--crimson)]"
                fill="none"
              >
                <path
                  d="M4 2v8c0 6 5 8 12 8h60M80 2v16M156 2v8c0 6-5 8-12 8H80M80 18v12"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeOpacity="0.4"
                />
                <circle cx="80" cy="31" r="3" fill="currentColor" />
              </svg>
              <p className="mt-5 max-w-3xl font-serif text-[1.375rem] font-bold leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[2rem]">
                AI creates business value by improving the speed, accuracy, and
                consistency of these operational choices.
              </p>
            </div>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          04 · MODULE I — the module plates are the deck's punctuation: a
          roman numeral set at display scale against a ruled left margin.
      ================================================================== */}
      <Slide id="module-1" border align="left" className="relative">
        <div className="grid w-full items-end gap-10 md:grid-cols-[minmax(0,10rem)_1fr] md:gap-16">
          <div>
            <div className={`${MICRO} text-[var(--champagne)]`}>Module</div>
            <div className="font-serif text-[6rem] font-black leading-[0.8] tracking-[-0.04em] text-[var(--crimson)] md:text-[9rem]">
              I
            </div>
          </div>

          <div className="md:border-l md:border-[var(--charcoal)]/12 md:pl-16">
            <h2 className="font-serif text-[2.25rem] font-bold leading-[1.02] tracking-[-0.025em] text-[var(--charcoal)] md:text-[3.75rem]">
              What Is Artificial Intelligence?
            </h2>
            <div className="mt-8 h-px w-24 bg-[var(--charcoal)]/20" />
            <p className="mt-8 max-w-2xl font-serif text-lg font-light italic leading-relaxed text-[var(--charcoal-light)] md:text-2xl">
              This section defines the core ideas behind artificial intelligence
              in simple terms.
            </p>
            <p className="mt-4 max-w-2xl font-serif text-lg font-light italic leading-relaxed text-[var(--charcoal-light)] md:text-2xl">
              We will look at the differences between artificial intelligence,
              machine learning, and deep learning.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          05 · DEFINING AI — the definition on top; below it the two
          machines drawn as what they are. Left: literal rules, monospaced
          and rigid. Right: a scatter of data with a fitted line.
      ================================================================== */}
      <Slide id="defining-ai" border align="left">
        <div>
          <div className={`${MICRO} text-[var(--champagne)]`}>Definition</div>
          <h2 className="mt-5 max-w-4xl font-serif text-[2rem] font-bold leading-[1.04] tracking-[-0.02em] text-[var(--charcoal)] md:text-[3rem]">
            Defining Artificial Intelligence
          </h2>
        </div>

        <div className="w-full">
          <p className="mt-9 max-w-4xl font-serif text-xl leading-[1.55] text-[var(--charcoal)] md:text-[1.75rem]">
            Artificial intelligence refers to computer systems designed to
            perform tasks that once required human intelligence.
          </p>
          <p className="mt-5 max-w-3xl font-serif text-lg leading-[1.6] text-[var(--charcoal-light)] md:text-[1.25rem]">
            These tasks include recognizing patterns, understanding text, making
            forecasts, and solving problems.
          </p>
        </div>

        <div className="mt-14 grid w-full max-w-5xl gap-12 border-t border-[var(--charcoal)]/10 pt-10 md:grid-cols-2 md:gap-0">
          <div className="md:pr-14">
            <div className={`${MICRO} text-[var(--charcoal-light)]/55`}>
              Traditional software
            </div>
            <div
              aria-hidden
              className="mt-6 space-y-1.5 font-mono text-[11px] leading-relaxed text-[var(--charcoal-light)]/50"
            >
              <div className="border-l border-[var(--charcoal)]/20 pl-3">
                IF score &lt; 600 THEN decline
              </div>
              <div className="border-l border-[var(--charcoal)]/20 pl-3">
                IF amount &gt; 5000 THEN review
              </div>
              <div className="border-l border-[var(--charcoal)]/20 pl-3">
                ELSE approve
              </div>
            </div>
            <p className="mt-7 font-serif text-lg leading-[1.55] text-[var(--charcoal-light)] md:text-[1.375rem]">
              Traditional software follows rigid rules written directly by human
              programmers.
            </p>
          </div>

          <div className="md:border-l md:border-[var(--charcoal)]/12 md:pl-14">
            <div className={`${MICRO} text-[var(--crimson)]`}>
              Modern AI systems
            </div>
            <svg
              aria-hidden
              viewBox="0 0 220 74"
              className="mt-6 w-full max-w-[220px] text-[var(--crimson)]"
              fill="none"
            >
              {[
                [12, 58],
                [34, 50],
                [46, 61],
                [62, 41],
                [80, 46],
                [96, 33],
                [112, 38],
                [130, 24],
                [148, 30],
                [166, 18],
                [186, 22],
                [206, 11],
              ].map(([x, y]) => (
                <circle
                  key={`${x}-${y}`}
                  cx={x}
                  cy={y}
                  r="2.5"
                  fill="currentColor"
                  fillOpacity="0.45"
                />
              ))}
              <path
                d="M8 62 C 70 54, 150 28, 212 10"
                stroke="currentColor"
                strokeWidth="1.25"
              />
            </svg>
            <p className="mt-7 font-serif text-lg leading-[1.55] text-[var(--charcoal)] md:text-[1.375rem]">
              Modern AI systems learn patterns directly from historical data.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          06 · AI / ML / DL — containment drawn as containment: three nested
          frames, each label tied to its frame by a leader line.      [quiz]
      ================================================================== */}
      <Slide id="ai-ml-dl" border align="left" quizData={quiz["ai-ml-dl"]}>
        <div>
          <div className={`${MICRO} text-[var(--champagne)]`}>
            Three nested terms
          </div>
          <h2 className="mt-5 max-w-4xl font-serif text-[1.75rem] font-bold leading-[1.06] tracking-[-0.02em] text-[var(--charcoal)] md:text-[2.75rem]">
            Artificial Intelligence, Machine Learning, and Deep Learning
          </h2>
        </div>

        <div className="mt-12 grid w-full max-w-5xl items-center gap-12 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-16">
          <div>
            <svg
              aria-hidden
              viewBox="0 0 260 260"
              className="w-full max-w-[20rem]"
              fill="none"
            >
              <rect
                x="1"
                y="1"
                width="258"
                height="258"
                stroke="var(--charcoal)"
                strokeOpacity="0.22"
              />
              <rect
                x="41"
                y="41"
                width="178"
                height="178"
                stroke="var(--champagne)"
                strokeOpacity="0.6"
              />
              <rect
                x="86"
                y="86"
                width="88"
                height="88"
                stroke="var(--crimson)"
                strokeWidth="1.5"
              />
              <text
                x="12"
                y="24"
                fill="var(--charcoal)"
                fillOpacity="0.5"
                fontSize="9"
                letterSpacing="2.4"
                fontFamily="var(--font-sans), sans-serif"
                fontWeight="600"
              >
                AI
              </text>
              <text
                x="52"
                y="64"
                fill="var(--champagne)"
                fontSize="9"
                letterSpacing="2.4"
                fontFamily="var(--font-sans), sans-serif"
                fontWeight="600"
              >
                ML
              </text>
              <text
                x="97"
                y="109"
                fill="var(--crimson)"
                fontSize="9"
                letterSpacing="2.4"
                fontFamily="var(--font-sans), sans-serif"
                fontWeight="600"
              >
                DL
              </text>
            </svg>
          </div>

          <div className="space-y-8">
            {[
              {
                tag: "Artificial Intelligence",
                tone: "text-[var(--charcoal)]",
                rule: "bg-[var(--charcoal)]/25",
                line: "Artificial intelligence is the broad umbrella term for all intelligent computer behavior.",
              },
              {
                tag: "Machine Learning",
                tone: "text-[var(--champagne)]",
                rule: "bg-[var(--champagne)]/60",
                line: "Machine learning is a specific subfield of AI where algorithms find patterns in data on their own.",
              },
              {
                tag: "Deep Learning",
                tone: "text-[var(--crimson)]",
                rule: "bg-[var(--crimson)]",
                line: "Deep learning is a specialized branch of machine learning based on multi-layered neural networks.",
              },
            ].map((layer) => (
              <div key={layer.tag}>
                <div className="flex items-center gap-3">
                  <span className={`h-px w-8 shrink-0 ${layer.rule}`} />
                  <span className={`${MICRO} ${layer.tone}`}>{layer.tag}</span>
                </div>
                <p className="mt-3 max-w-xl font-serif text-lg leading-[1.55] text-[var(--charcoal)] md:text-[1.3125rem]">
                  {layer.line}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full">
          <div className="mt-14 max-w-4xl border-t border-[var(--crimson)]/40 pt-6">
            <div className={`${MICRO} text-[var(--crimson)]`}>Why it matters</div>
            <p className="mt-3 font-serif text-xl leading-[1.45] text-[var(--charcoal)] md:text-[1.625rem]">
              Deep learning works exceptionally well on complex data such as
              images, audio, and free-form text.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          07 · PREDICTIVE vs GENERATIVE — one time axis. Predictive reads
          backwards from the present; generative writes forward from it. The
          closing line is placed on the axis itself, where they meet.  [quiz]
      ================================================================== */}
      <Slide
        id="predictive-generative"
        border
        align="left"
        quizData={quiz["predictive-generative"]}
      >
        <div>
          <div className={`${MICRO} text-[var(--champagne)]`}>Two families</div>
          <h2 className="mt-5 max-w-4xl font-serif text-[2rem] font-bold leading-[1.04] tracking-[-0.02em] text-[var(--charcoal)] md:text-[3rem]">
            Predictive AI Versus Generative AI
          </h2>
        </div>

        <div className="mt-12 grid w-full max-w-5xl gap-12 md:grid-cols-2 md:gap-0">
          <div className="md:pr-12 md:text-right">
            <div className={`${MICRO} text-[var(--charcoal-light)]/60`}>
              Predictive AI · reads the past
            </div>
            <svg
              aria-hidden
              viewBox="0 0 200 16"
              className="mt-5 ml-auto w-full max-w-[200px] text-[var(--charcoal)]"
              fill="none"
            >
              <path d="M196 8H10" stroke="currentColor" strokeOpacity="0.3" />
              <path
                d="M10 8l7-4M10 8l7 4"
                stroke="currentColor"
                strokeOpacity="0.55"
              />
            </svg>
            <p className="mt-6 font-serif text-lg leading-[1.55] text-[var(--charcoal)] md:text-[1.3125rem]">
              Predictive AI analyzes past data to forecast future events,
              estimate numbers, or classify items into categories.
            </p>
            <p className="mt-5 font-serif text-base leading-[1.6] text-[var(--charcoal-light)] md:text-lg">
              Common predictive examples include credit risk scoring, fraud
              detection, and customer churn forecasting.
            </p>
          </div>

          <div className="md:border-l md:border-[var(--charcoal)]/12 md:pl-12">
            <div className={`${MICRO} text-[var(--crimson)]`}>
              Generative AI · writes something new
            </div>
            <svg
              aria-hidden
              viewBox="0 0 200 16"
              className="mt-5 w-full max-w-[200px] text-[var(--crimson)]"
              fill="none"
            >
              <path d="M4 8h186" stroke="currentColor" strokeOpacity="0.4" />
              <path d="M190 8l-7-4M190 8l-7 4" stroke="currentColor" />
            </svg>
            <p className="mt-6 font-serif text-lg leading-[1.55] text-[var(--charcoal)] md:text-[1.3125rem]">
              Generative AI creates new content such as text, images, audio, or
              computer code based on learned patterns.
            </p>
            <div
              aria-hidden
              className="mt-5 flex flex-wrap gap-x-3 gap-y-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--charcoal-light)]/45"
            >
              <span>text</span>
              <span>·</span>
              <span>images</span>
              <span>·</span>
              <span>audio</span>
              <span>·</span>
              <span>code</span>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-16 w-full max-w-5xl">
            <div className="h-px w-full bg-[var(--charcoal)]/15" />
            <p className="mt-7 max-w-4xl font-serif text-[1.375rem] font-bold leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[2rem]">
              Most business value comes from combining predictive analysis with
              generative capabilities.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          08 · CHATBOTS TO AGENTS — an ascending stair. Each tread steps
          right and down the page, autonomy rising with it; the last tread
          carries the warning and is the only one marked in crimson.
      ================================================================== */}
      <Slide id="chatbots-to-agents" border align="left">
        <div>
          <div className={`${MICRO} text-[var(--champagne)]`}>
            The autonomy staircase
          </div>
          <h2 className="mt-5 max-w-4xl font-serif text-[2rem] font-bold leading-[1.04] tracking-[-0.02em] text-[var(--charcoal)] md:text-[3rem]">
            From Chatbots to Autonomous Agents
          </h2>
        </div>

        <ol className="mt-12 w-full max-w-5xl">
          {[
            {
              n: "01",
              tag: "Chatbots",
              line: "Early AI assistants acted like simple conversational chatbots that answered one prompt at a time.",
              warn: false,
            },
            {
              n: "02",
              tag: "Agentic AI",
              line: "The latest frontier is agentic AI, where systems can pursue multi-step goals with minimal human supervision.",
              warn: false,
            },
            {
              n: "03",
              tag: "An AI agent",
              line: "An AI agent can plan steps, query databases, use software tools, and review its own output for errors.",
              warn: false,
            },
            {
              n: "04",
              tag: "Autonomous execution",
              line: "Autonomous execution increases operating speed, but it also demands clear safety boundaries.",
              warn: true,
            },
          ].map((step, i) => (
            <li key={step.n} className="block">
              <div
                className="border-t py-7 md:py-8"
                style={{
                  marginLeft: `calc(${i} * 3.5vw)`,
                  borderColor: step.warn
                    ? "var(--crimson)"
                    : "rgba(26,26,29,0.12)",
                }}
              >
                <div className="flex items-baseline gap-4">
                  <span
                    className={`${MICRO} ${
                      step.warn
                        ? "text-[var(--crimson)]"
                        : "text-[var(--champagne)]"
                    }`}
                  >
                    {step.n}
                  </span>
                  <span
                    className={`${MICRO} ${
                      step.warn
                        ? "text-[var(--crimson)]"
                        : "text-[var(--charcoal-light)]/60"
                    }`}
                  >
                    {step.tag}
                  </span>
                </div>
                <p className="mt-3 max-w-3xl font-serif text-lg leading-[1.55] text-[var(--charcoal)] md:text-[1.4375rem]">
                  {step.line}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="w-full">
          <aside className="mt-14 max-w-3xl border border-[var(--charcoal)]/12 p-7 md:p-9">
            <div className={`${MICRO} text-[var(--champagne)]`}>Discussion</div>
            <p className="mt-4 font-serif text-lg font-light italic leading-relaxed text-[var(--charcoal)] md:text-[1.375rem]">
              Think of a multi-step task you do regularly. What risks might
              arise if an autonomous software agent did that task without your
              supervision?
            </p>
          </aside>
        </div>
      </Slide>

      {/* ==================================================================
          09 · MODULE II
      ================================================================== */}
      <Slide id="module-2" border align="left">
        <div className="grid w-full items-end gap-10 md:grid-cols-[minmax(0,10rem)_1fr] md:gap-16">
          <div>
            <div className={`${MICRO} text-[var(--champagne)]`}>Module</div>
            <div className="font-serif text-[6rem] font-black leading-[0.8] tracking-[-0.04em] text-[var(--crimson)] md:text-[9rem]">
              II
            </div>
          </div>

          <div className="md:border-l md:border-[var(--charcoal)]/12 md:pl-16">
            <h2 className="font-serif text-[2.25rem] font-bold leading-[1.02] tracking-[-0.025em] text-[var(--charcoal)] md:text-[3.75rem]">
              The Economics of Prediction
            </h2>
            <div className="mt-8 h-px w-24 bg-[var(--charcoal)]/20" />
            <p className="mt-8 max-w-2xl font-serif text-lg font-light italic leading-relaxed text-[var(--charcoal-light)] md:text-2xl">
              This section explains how artificial intelligence affects business
              economics and operational costs.
            </p>
            <p className="mt-4 max-w-2xl font-serif text-lg font-light italic leading-relaxed text-[var(--charcoal-light)] md:text-2xl">
              We examine how falling prediction costs change the value of human
              judgment.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          10 · COST OF PREDICTION — a price curve falling toward zero, with
          the three cheapened inputs marked as stations along it. The chart
          carries the argument; the prose annotates the chart.
      ================================================================== */}
      <Slide id="cost-of-prediction" border align="left">
        <div>
          <div className={`${MICRO} text-[var(--champagne)]`}>
            A familiar economic pattern
          </div>
          <h2 className="mt-5 max-w-4xl font-serif text-[2rem] font-bold leading-[1.04] tracking-[-0.02em] text-[var(--charcoal)] md:text-[3rem]">
            The Cost of Prediction Drops to Zero
          </h2>
          <p className="mt-7 max-w-3xl font-serif text-lg leading-[1.6] text-[var(--charcoal-light)] md:text-[1.3125rem]">
            In economics, technological breakthroughs often make a specific,
            valuable input cheap and abundant.
          </p>
        </div>

        <div className="w-full">
          <figure className="mt-12 w-full max-w-5xl">
            <svg
              aria-hidden
              viewBox="0 0 640 220"
              className="w-full"
              fill="none"
            >
              {/* axes */}
              <path
                d="M56 8v182h568"
                stroke="var(--charcoal)"
                strokeOpacity="0.25"
              />
              {/* decay curve */}
              <path
                d="M56 26 C 190 40, 250 128, 360 158 C 456 182, 540 188, 624 189"
                stroke="var(--crimson)"
                strokeWidth="1.5"
              />
              {/* stations */}
              {[
                { x: 140, y: 58, label: "Arithmetic" },
                { x: 340, y: 152, label: "Information" },
                { x: 556, y: 189, label: "Prediction" },
              ].map((s) => (
                <g key={s.label}>
                  <path
                    d={`M${s.x} ${s.y}V190`}
                    stroke="var(--charcoal)"
                    strokeOpacity="0.14"
                  />
                  <circle cx={s.x} cy={s.y} r="3.5" fill="var(--crimson)" />
                  <text
                    x={s.x}
                    y={s.y - 12}
                    fill="var(--champagne)"
                    fontSize="9"
                    letterSpacing="2.2"
                    textAnchor="middle"
                    fontFamily="var(--font-sans), sans-serif"
                    fontWeight="600"
                  >
                    {s.label.toUpperCase()}
                  </text>
                </g>
              ))}
              <text
                x="46"
                y="22"
                fill="var(--charcoal)"
                fillOpacity="0.45"
                fontSize="9"
                letterSpacing="2.2"
                textAnchor="end"
                fontFamily="var(--font-sans), sans-serif"
                fontWeight="600"
              >
                COST
              </text>
              <text
                x="46"
                y="193"
                fill="var(--charcoal)"
                fillOpacity="0.45"
                fontSize="9"
                letterSpacing="2.2"
                textAnchor="end"
                fontFamily="var(--font-sans), sans-serif"
                fontWeight="600"
              >
                ZERO
              </text>
            </svg>
          </figure>
        </div>

        <div className="mt-10 grid w-full max-w-5xl gap-8 border-t border-[var(--charcoal)]/10 pt-8 md:grid-cols-3 md:gap-10">
          {[
            {
              tag: "Computers",
              line: "Computers made arithmetic cheap.",
              now: false,
            },
            {
              tag: "The internet",
              line: "The internet made information distribution cheap.",
              now: false,
            },
            {
              tag: "Machine learning",
              line: "Modern machine learning makes prediction cheap and accessible across every industry.",
              now: true,
            },
          ].map((era) => (
            <div key={era.tag}>
              <div
                className={`${MICRO} ${
                  era.now
                    ? "text-[var(--crimson)]"
                    : "text-[var(--charcoal-light)]/50"
                }`}
              >
                {era.tag}
              </div>
              <p
                className={`mt-3 font-serif leading-[1.55] ${
                  era.now
                    ? "text-[1.125rem] text-[var(--charcoal)] md:text-[1.25rem]"
                    : "text-base text-[var(--charcoal-light)] md:text-[1.0625rem]"
                }`}
              >
                {era.line}
              </p>
            </div>
          ))}
        </div>

        <div className="w-full">
          <p className="mt-14 max-w-4xl font-serif text-[1.375rem] font-bold leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[2rem]">
            When prediction becomes cheap, companies start applying it to
            problems that were never treated as prediction tasks before.
          </p>
        </div>
      </Slide>

      {/* ==================================================================
          11 · PREDICTION vs JUDGMENT — a balance beam. The machine pan sinks
          as prediction gets cheap; the human pan rises, which is precisely
          the slide's conclusion.                                     [quiz]
      ================================================================== */}
      <Slide
        id="prediction-judgment"
        border
        align="left"
        quizData={quiz["prediction-judgment"]}
      >
        <div>
          <div className={`${MICRO} text-[var(--champagne)]`}>
            What machines cannot do
          </div>
          <h2 className="mt-5 max-w-4xl font-serif text-[2rem] font-bold leading-[1.04] tracking-[-0.02em] text-[var(--charcoal)] md:text-[3rem]">
            Prediction Versus Judgment
          </h2>
        </div>

        <div className="w-full">
          <svg
            aria-hidden
            viewBox="0 0 620 120"
            className="mt-12 w-full max-w-4xl"
            fill="none"
          >
            {/* beam, tilted: machine side low, human side high */}
            <path
              d="M70 76 L550 40"
              stroke="var(--charcoal)"
              strokeOpacity="0.3"
              strokeWidth="1.25"
            />
            <path d="M310 58V104" stroke="var(--charcoal)" strokeOpacity="0.3" />
            <path
              d="M286 106h48"
              stroke="var(--charcoal)"
              strokeOpacity="0.3"
            />
            {/* machine pan */}
            <path d="M70 76v14" stroke="var(--charcoal)" strokeOpacity="0.25" />
            <path
              d="M40 90h60"
              stroke="var(--charcoal)"
              strokeOpacity="0.35"
            />
            {/* human pan, crimson: the rising side */}
            <path d="M550 40v14" stroke="var(--crimson)" strokeOpacity="0.5" />
            <path d="M520 54h60" stroke="var(--crimson)" strokeWidth="1.5" />
            <path
              d="M550 26l-5 7h10z"
              fill="var(--crimson)"
            />
            <text
              x="70"
              y="112"
              fill="var(--charcoal)"
              fillOpacity="0.45"
              fontSize="9"
              letterSpacing="2.2"
              textAnchor="middle"
              fontFamily="var(--font-sans), sans-serif"
              fontWeight="600"
            >
              MACHINE
            </text>
            <text
              x="550"
              y="76"
              fill="var(--crimson)"
              fontSize="9"
              letterSpacing="2.2"
              textAnchor="middle"
              fontFamily="var(--font-sans), sans-serif"
              fontWeight="600"
            >
              HUMAN
            </text>
          </svg>
        </div>

        <div className="mt-10 grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-0">
          <div className="md:pr-12">
            <div className={`${MICRO} text-[var(--charcoal-light)]/55`}>
              Prediction
            </div>
            <p className="mt-4 font-serif text-lg leading-[1.55] text-[var(--charcoal)] md:text-[1.4375rem]">
              A prediction is an estimate of what is likely to happen when
              information is incomplete.
            </p>
          </div>
          <div className="md:border-l md:border-[var(--charcoal)]/12 md:pl-12">
            <div className={`${MICRO} text-[var(--crimson)]`}>Judgment</div>
            <p className="mt-4 font-serif text-lg leading-[1.55] text-[var(--charcoal)] md:text-[1.4375rem]">
              A judgment is an evaluation of what outcome matters most, what is
              fair, and what risk is acceptable.
            </p>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 max-w-4xl border-l border-[var(--charcoal)]/25 pl-6">
            <div className={`${MICRO} text-[var(--charcoal-light)]/50`}>
              The limit
            </div>
            <p className="mt-3 font-serif text-lg leading-[1.6] text-[var(--charcoal-light)] md:text-[1.25rem]">
              Machines handle prediction at scale, but they do not possess moral
              principles, business ethics, or context.
            </p>
          </div>
        </div>

        <div className="w-full">
          <p className="mt-12 max-w-4xl font-serif text-[1.375rem] font-bold leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[2rem]">
            As machine prediction becomes cheaper and faster, the economic value
            of human judgment goes up.
          </p>
        </div>
      </Slide>

      {/* ==================================================================
          12 · THREE SOURCES OF VALUE — a triptych under one bracket. Three
          equal columns, display numerals, and a rule that closes them into
          a single mandate at the foot.
      ================================================================== */}
      <Slide id="three-sources-of-value" border align="left">
        <div>
          <div className={`${MICRO} text-[var(--champagne)]`}>
            Where the money is
          </div>
          <h2 className="mt-5 max-w-4xl font-serif text-[2rem] font-bold leading-[1.04] tracking-[-0.02em] text-[var(--charcoal)] md:text-[3rem]">
            The Three Sources of Business Value
          </h2>
        </div>

        <div className="mt-14 grid w-full max-w-5xl gap-12 md:grid-cols-3 md:gap-0">
          {[
            {
              n: "01",
              tag: "Cost reduction",
              line: "Cost reduction comes from automating repetitive tasks in document processing, customer intake, and reporting.",
            },
            {
              n: "02",
              tag: "Revenue growth",
              line: "Revenue growth comes from better recommendations, personalized pricing, and faster product discovery.",
            },
            {
              n: "03",
              tag: "Risk management",
              line: "Risk management comes from catching fraud early, forecasting cash shortfalls, and monitoring compliance gaps.",
            },
          ].map((col, i) => (
            <div key={col.n} className={
                i === 0
                  ? "md:pr-10"
                  : "md:border-l md:border-[var(--charcoal)]/12 md:px-10"
              }>
              <div className="font-serif text-[3.5rem] font-black leading-none tracking-[-0.04em] text-[var(--charcoal)]/12 md:text-[4.5rem]">
                {col.n}
              </div>
              <div className={`${MICRO} mt-5 text-[var(--crimson)]`}>
                {col.tag}
              </div>
              <p className="mt-4 font-serif text-base leading-[1.6] text-[var(--charcoal)] md:text-[1.125rem]">
                {col.line}
              </p>
            </div>
          ))}
        </div>

        <div className="w-full">
          <div className="mt-14 w-full max-w-5xl">
            <svg
              aria-hidden
              viewBox="0 0 600 22"
              className="w-full text-[var(--charcoal)]"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M2 2v8h296v10M598 2v8H302v10"
                stroke="currentColor"
                strokeOpacity="0.2"
              />
            </svg>
            <p className="mt-6 max-w-4xl font-serif text-xl leading-[1.45] text-[var(--charcoal)] md:text-[1.625rem]">
              Successful firms target all three areas instead of focusing on
              headcount reduction alone.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          13 · PLUG AND PLAY — commoditisation shown as repetition: nine
          identical tiles anyone can buy, and one tile that is yours. The
          grid is the argument.
      ================================================================== */}
      <Slide id="plug-and-play" border align="left">
        <div>
          <div className={`${MICRO} text-[var(--champagne)]`}>
            The commoditisation trap
          </div>
          <h2 className="mt-5 max-w-4xl font-serif text-[2rem] font-bold leading-[1.04] tracking-[-0.02em] text-[var(--charcoal)] md:text-[3rem]">
            The Fallacy of Plug and Play
          </h2>
          <p className="mt-8 max-w-4xl font-serif text-[1.375rem] font-bold leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[2rem]">
            Buying an off-the-shelf AI tool does not guarantee a lasting
            competitive edge.
          </p>
        </div>

        <div className="mt-14 grid w-full max-w-5xl gap-12 md:grid-cols-2 md:gap-0">
          <div className="md:pr-12">
            <div className={`${MICRO} text-[var(--charcoal-light)]/50`}>
              Public models and subscriptions
            </div>
            <div aria-hidden className="mt-6 grid max-w-[240px] grid-cols-3 gap-2">
              {Array.from({ length: 9 }).map((_, i) => (
                <span
                  key={i}
                  className="block h-12 border border-[var(--charcoal)]/15"
                />
              ))}
            </div>
            <p className="mt-7 font-serif text-lg leading-[1.55] text-[var(--charcoal-light)] md:text-[1.3125rem]">
              Anyone can purchase the same public models and software
              subscriptions.
            </p>
          </div>

          <div className="md:border-l md:border-[var(--charcoal)]/12 md:pl-12">
            <div className={`${MICRO} text-[var(--crimson)]`}>
              Unique workflows and proprietary data
            </div>
            <div aria-hidden className="mt-6 grid max-w-[240px] grid-cols-3 gap-2">
              <span className="col-span-2 row-span-2 block h-[104px] border-[1.5px] border-[var(--crimson)]" />
              <span className="block h-12 border border-[var(--charcoal)]/10" />
              <span className="block h-12 border border-[var(--charcoal)]/10" />
            </div>
            <p className="mt-7 font-serif text-lg leading-[1.55] text-[var(--charcoal)] md:text-[1.3125rem]">
              Real business advantage comes from connecting AI directly to
              unique business workflows and high-quality proprietary data.
            </p>
          </div>
        </div>

        <div className="w-full">
          <aside className="mt-14 max-w-3xl border border-[var(--charcoal)]/12 p-7 md:p-9">
            <div className={`${MICRO} text-[var(--champagne)]`}>Discussion</div>
            <p className="mt-4 font-serif text-lg font-light italic leading-relaxed text-[var(--charcoal)] md:text-[1.375rem]">
              If every firm in your industry uses the same commercial AI models,
              where will your competitive advantage come from?
            </p>
          </aside>
        </div>
      </Slide>

      {/* ==================================================================
          14 · MODULE III
      ================================================================== */}
      <Slide id="module-3" border align="left">
        <div className="grid w-full items-end gap-10 md:grid-cols-[minmax(0,10rem)_1fr] md:gap-16">
          <div>
            <div className={`${MICRO} text-[var(--champagne)]`}>Module</div>
            <div className="font-serif text-[6rem] font-black leading-[0.8] tracking-[-0.04em] text-[var(--crimson)] md:text-[9rem]">
              III
            </div>
          </div>

          <div className="md:border-l md:border-[var(--charcoal)]/12 md:pl-16">
            <h2 className="font-serif text-[2.25rem] font-bold leading-[1.02] tracking-[-0.025em] text-[var(--charcoal)] md:text-[3.75rem]">
              How Companies Apply AI
            </h2>
            <div className="mt-8 h-px w-24 bg-[var(--charcoal)]/20" />
            <p className="mt-8 max-w-2xl font-serif text-lg font-light italic leading-relaxed text-[var(--charcoal-light)] md:text-2xl">
              This section maps the main ways companies deploy machine learning
              across business units.
            </p>
            <p className="mt-4 max-w-2xl font-serif text-lg font-light italic leading-relaxed text-[var(--charcoal-light)] md:text-2xl">
              We divide applications into customer-facing front office tasks and
              internal back office workflows.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          15 · FRONT OFFICE — the customer side of the counter. Content sits
          to the right of a heavy vertical rule standing in for the shop
          window; each team is a pane in it.                          [quiz]
      ================================================================== */}
      <Slide
        id="front-office"
        border
        align="left"
        quizData={quiz["front-office"]}
      >
        <div>
          <div className={`${MICRO} text-[var(--crimson)]`}>
            Front office · the customer sees this
          </div>
          <h2 className="mt-5 max-w-4xl font-serif text-[1.875rem] font-bold leading-[1.05] tracking-[-0.02em] text-[var(--charcoal)] md:text-[2.875rem]">
            Front-Office Applications: Customer Engagement
          </h2>
        </div>

        <div className="mt-12 w-full max-w-5xl border-l-2 border-[var(--crimson)]/70 pl-7 md:pl-12">
          {[
            {
              tag: "Customer service teams",
              line: "Customer service teams use AI to answer common questions and route complex issues to human agents.",
            },
            {
              tag: "Marketing teams",
              line: "Marketing teams use machine learning to segment audiences and personalize promotional messages.",
            },
            {
              tag: "E-commerce platforms",
              line: "E-commerce platforms use recommendation engines to suggest products that match individual shopper interests.",
            },
          ].map((pane, i) => (
            <div key={pane.tag}>
              <div
                className={`py-7 ${
                  i > 0 ? "border-t border-[var(--charcoal)]/8" : "pt-0"
                }`}
              >
                <div className={`${MICRO} text-[var(--champagne)]`}>
                  {pane.tag}
                </div>
                <p className="mt-3 max-w-3xl font-serif text-lg leading-[1.55] text-[var(--charcoal)] md:text-[1.4375rem]">
                  {pane.line}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full">
          <div className="mt-12 max-w-4xl border-t border-[var(--crimson)]/40 pt-6">
            <div className={`${MICRO} text-[var(--crimson)]`}>The goal</div>
            <p className="mt-3 font-serif text-xl leading-[1.45] text-[var(--charcoal)] md:text-[1.625rem]">
              The goal is reducing customer friction while maintaining a
              consistent and trustworthy brand image.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          16 · BACK OFFICE — deliberately the mirror of slide 15: the rule
          moves to the right edge, the labels align right, the palette drops
          to ink. Nobody outside the firm sees this work.
      ================================================================== */}
      <Slide id="back-office" border align="left">
        <div className="w-full">
          <div className="w-full max-w-5xl md:text-right">
            <div className={`${MICRO} text-[var(--charcoal-light)]/55`}>
              Back office · nobody outside sees this
            </div>
            <h2 className="mt-5 font-serif text-[1.875rem] font-bold leading-[1.05] tracking-[-0.02em] text-[var(--charcoal)] md:text-[2.875rem]">
              Back-Office Applications: Operations and Finance
            </h2>
          </div>
        </div>

        <div className="mt-12 w-full max-w-5xl border-[var(--charcoal)]/25 pr-0 md:border-r-2 md:pr-12 md:text-right">
          {[
            {
              tag: "Operations teams",
              line: "Operations teams use predictive models to forecast demand, prevent factory breakdowns, and plan delivery routes.",
            },
            {
              tag: "Finance teams",
              line: "Finance teams use machine learning to score loan applications, detect fraudulent charges, and reconcile records.",
            },
            {
              tag: "Human resources teams",
              line: "Human resources teams use AI to draft job descriptions, sort resumes, and match employees with training programs.",
            },
          ].map((row, i) => (
            <div key={row.tag}>
              <div
                className={`py-7 ${
                  i > 0 ? "border-t border-[var(--charcoal)]/8" : "pt-0"
                }`}
              >
                <div className={`${MICRO} text-[var(--charcoal-light)]/50`}>
                  {row.tag}
                </div>
                <p className="mt-3 font-serif text-lg leading-[1.55] text-[var(--charcoal)] md:ml-auto md:max-w-3xl md:text-[1.4375rem]">
                  {row.line}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full">
          <div className="w-full max-w-5xl md:text-right">
            <p className="mt-12 font-serif text-[1.375rem] font-bold leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:ml-auto md:max-w-3xl md:text-[2rem]">
              Back-office automation cuts operating costs and speeds up internal
              workflows.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          17 · HUMAN IN THE LOOP — one continuous stakes gauge. The two
          definitions sit above it; the two regimes are placed on the arc at
          the point where each applies.                              [quiz]
      ================================================================== */}
      <Slide
        id="human-in-the-loop"
        border
        align="left"
        quizData={quiz["human-in-the-loop"]}
      >
        <div>
          <div className={`${MICRO} text-[var(--champagne)]`}>
            Where the human sits
          </div>
          <h2 className="mt-5 max-w-4xl font-serif text-[2rem] font-bold leading-[1.04] tracking-[-0.02em] text-[var(--charcoal)] md:text-[3rem]">
            Human in the Loop Versus Full Autonomy
          </h2>
        </div>

        <div className="mt-11 grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-0">
          <div className="md:pr-12">
            <div className={`${MICRO} text-[var(--charcoal-light)]/55`}>
              Full autonomy
            </div>
            <p className="mt-4 font-serif text-lg leading-[1.55] text-[var(--charcoal)] md:text-[1.3125rem]">
              Full autonomy means the computer makes the decision and takes
              action without waiting for human approval.
            </p>
          </div>
          <div className="md:border-l md:border-[var(--charcoal)]/12 md:pl-12">
            <div className={`${MICRO} text-[var(--crimson)]`}>
              Human-in-the-loop
            </div>
            <p className="mt-4 font-serif text-lg leading-[1.55] text-[var(--charcoal)] md:text-[1.3125rem]">
              Human-in-the-loop means a person must review and approve the
              machine recommendation before it takes effect.
            </p>
          </div>
        </div>

        <div className="w-full">
          <figure className="mt-14 w-full max-w-4xl">
            <svg aria-hidden viewBox="0 0 560 150" className="w-full" fill="none">
              <path
                d="M40 138 A 240 240 0 0 1 520 138"
                stroke="var(--charcoal)"
                strokeOpacity="0.32"
                strokeWidth="1.25"
              />
              <path
                d="M300 44 A 240 240 0 0 1 520 138"
                stroke="var(--crimson)"
                strokeWidth="1.75"
              />
              <circle cx="40" cy="138" r="3" fill="var(--charcoal)" fillOpacity="0.4" />
              <circle cx="520" cy="138" r="3.5" fill="var(--crimson)" />
              <text
                x="40"
                y="150"
                fill="var(--charcoal)"
                fillOpacity="0.45"
                fontSize="9"
                letterSpacing="2.2"
                fontFamily="var(--font-sans), sans-serif"
                fontWeight="600"
              >
                LOW COST OF ERROR
              </text>
              <text
                x="520"
                y="150"
                fill="var(--crimson)"
                fontSize="9"
                letterSpacing="2.2"
                textAnchor="end"
                fontFamily="var(--font-sans), sans-serif"
                fontWeight="600"
              >
                HIGH COST OF ERROR
              </text>
            </svg>

            <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-14">
              <div>
                <div className={`${MICRO} text-[var(--charcoal-light)]/50`}>
                  Automate safely
                </div>
                <p className="mt-3 font-serif text-base leading-[1.6] text-[var(--charcoal-light)] md:text-[1.0625rem]">
                  Low-stakes decisions with low cost of error can be automated
                  safely, such as product recommendations.
                </p>
              </div>
              <div className="md:border-l md:border-[var(--crimson)]/30 md:pl-10">
                <div className={`${MICRO} text-[var(--crimson)]`}>
                  Human sign-off
                </div>
                <p className="mt-3 font-serif text-base leading-[1.6] text-[var(--charcoal)] md:text-[1.0625rem]">
                  High-stakes decisions that affect jobs, credit, health, or
                  legal liability require human sign-off and review.
                </p>
              </div>
            </div>
          </figure>
        </div>

        <div className="w-full">
          <aside className="mt-14 max-w-3xl border border-[var(--charcoal)]/12 p-7 md:p-9">
            <div className={`${MICRO} text-[var(--champagne)]`}>Discussion</div>
            <p className="mt-4 font-serif text-lg font-light italic leading-relaxed text-[var(--charcoal)] md:text-[1.375rem]">
              In your view, which business decisions should always require human
              approval, even if an algorithm is 99 percent accurate?
            </p>
          </aside>
        </div>
      </Slide>

      {/* ==================================================================
          18 · MODULE IV
      ================================================================== */}
      <Slide id="module-4" border align="left">
        <div className="grid w-full items-end gap-10 md:grid-cols-[minmax(0,10rem)_1fr] md:gap-16">
          <div>
            <div className={`${MICRO} text-[var(--champagne)]`}>Module</div>
            <div className="font-serif text-[6rem] font-black leading-[0.8] tracking-[-0.04em] text-[var(--crimson)] md:text-[9rem]">
              IV
            </div>
          </div>

          <div className="md:border-l md:border-[var(--charcoal)]/12 md:pl-16">
            <h2 className="font-serif text-[2rem] font-bold leading-[1.02] tracking-[-0.025em] text-[var(--charcoal)] md:text-[3.25rem]">
              Data and the Machine Learning Pipeline
            </h2>
            <div className="mt-8 h-px w-24 bg-[var(--charcoal)]/20" />
            <p className="mt-8 max-w-2xl font-serif text-lg font-light italic leading-relaxed text-[var(--charcoal-light)] md:text-2xl">
              This section covers the raw material of artificial intelligence:
              organizational data.
            </p>
            <p className="mt-4 max-w-2xl font-serif text-lg font-light italic leading-relaxed text-[var(--charcoal-light)] md:text-2xl">
              We will look at how data is collected, cleaned, and used to
              continuously improve business models.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          19 · DATA IS THE RAW MATERIAL — the two kinds of data are drawn in
          their own grammar. Structured: a ruled table. Unstructured: loose
          overlapping slips at broken angles.
      ================================================================== */}
      <Slide id="data-raw-material" border align="left">
        <div>
          <div className={`${MICRO} text-[var(--champagne)]`}>Raw material</div>
          <h2 className="mt-5 max-w-4xl font-serif text-[2rem] font-bold leading-[1.04] tracking-[-0.02em] text-[var(--charcoal)] md:text-[3rem]">
            Data Is the Raw Material of AI
          </h2>
          <p className="mt-8 font-serif text-[1.5rem] font-black leading-[1.2] tracking-[-0.02em] text-[var(--charcoal)] md:text-[2.5rem]">
            An algorithm cannot learn without data.
          </p>
        </div>

        <div className="mt-14 grid w-full max-w-5xl gap-14 md:grid-cols-2 md:gap-0">
          <div className="md:pr-12">
            <div className={`${MICRO} text-[var(--charcoal-light)]/55`}>
              Structured data
            </div>
            <div
              aria-hidden
              className="mt-6 max-w-[300px] border border-[var(--charcoal)]/15 font-mono text-[10px] text-[var(--charcoal-light)]/60"
            >
              {[
                ["2024-01-08", "1,482"],
                ["2024-01-09", "1,399"],
                ["2024-01-10", "1,610"],
              ].map(([d, v]) => (
                <div
                  key={d}
                  className="flex items-center justify-between border-b border-[var(--charcoal)]/10 px-3 py-2 last:border-b-0"
                >
                  <span>{d}</span>
                  <span className="border-l border-[var(--charcoal)]/10 pl-3 tabular-nums">
                    {v}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-7 font-serif text-lg leading-[1.55] text-[var(--charcoal)] md:text-[1.3125rem]">
              Structured data includes numbers, dates, and clear tables like
              spreadsheet rows or SQL databases.
            </p>
          </div>

          <div className="md:border-l md:border-[var(--charcoal)]/12 md:pl-12">
            <div className={`${MICRO} text-[var(--crimson)]`}>
              Unstructured data
            </div>
            <div aria-hidden className="relative mt-6 h-[124px] max-w-[320px]">
              {[
                { t: "emails", x: 0, y: 2, r: -3 },
                { t: "video footage", x: 78, y: 6, r: 2.5 },
                { t: "audio recordings", x: 4, y: 46, r: 1.5 },
                { t: "customer reviews", x: 152, y: 52, r: -2 },
                { t: "scanned PDFs", x: 46, y: 92, r: 3 },
              ].map((slip) => (
                <span
                  key={slip.t}
                  className="absolute whitespace-nowrap border border-[var(--crimson)]/35 bg-[var(--surface)] px-2 py-1 font-mono text-[10px] text-[var(--charcoal-light)]/70"
                  style={{
                    left: slip.x,
                    top: slip.y,
                    transform: `rotate(${slip.r}deg)`,
                  }}
                >
                  {slip.t}
                </span>
              ))}
            </div>
            <p className="mt-7 font-serif text-lg leading-[1.55] text-[var(--charcoal)] md:text-[1.3125rem]">
              Unstructured data includes emails, video footage, audio
              recordings, customer reviews, and scanned PDFs.
            </p>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-14 max-w-4xl border-t border-[var(--crimson)]/40 pt-6">
            <div className={`${MICRO} text-[var(--crimson)]`}>Why it matters</div>
            <p className="mt-3 font-serif text-xl leading-[1.45] text-[var(--charcoal)] md:text-[1.625rem]">
              Modern deep learning allows companies to extract clear business
              insights from unstructured data for the first time.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          20 · DATA QUALITY — garbage in, garbage out, drawn as a pipe with
          the same defect entering and leaving. The two failure modes are
          placed at the inlet.                                        [quiz]
      ================================================================== */}
      <Slide
        id="data-quality"
        border
        align="left"
        quizData={quiz["data-quality"]}
      >
        <div>
          <div className={`${MICRO} text-[var(--champagne)]`}>
            Garbage in, garbage out
          </div>
          <h2 className="mt-5 max-w-4xl font-serif text-[1.875rem] font-bold leading-[1.05] tracking-[-0.02em] text-[var(--charcoal)] md:text-[2.875rem]">
            Data Quality, Bias, and the Garbage-In Principle
          </h2>
          <p className="mt-8 font-serif text-[1.5rem] font-black leading-[1.2] tracking-[-0.02em] text-[var(--charcoal)] md:text-[2.5rem]">
            A model is only as good as the data used to train it.
          </p>
        </div>

        <div className="w-full">
          <svg
            aria-hidden
            viewBox="0 0 600 96"
            className="mt-12 w-full max-w-4xl"
            fill="none"
          >
            {/* inlet stream */}
            <path
              d="M6 30h190M6 48h190M6 66h190"
              stroke="var(--crimson)"
              strokeOpacity="0.35"
            />
            {/* the model, a plain box that changes nothing about quality */}
            <rect
              x="216"
              y="18"
              width="168"
              height="60"
              stroke="var(--charcoal)"
              strokeOpacity="0.3"
            />
            <text
              x="300"
              y="53"
              fill="var(--charcoal)"
              fillOpacity="0.5"
              fontSize="9"
              letterSpacing="2.4"
              textAnchor="middle"
              fontFamily="var(--font-sans), sans-serif"
              fontWeight="600"
            >
              MODEL
            </text>
            {/* outlet stream, identical defects */}
            <path
              d="M404 30h188M404 48h188M404 66h188"
              stroke="var(--crimson)"
              strokeOpacity="0.35"
            />
            <path d="M592 48l-8-4v8z" fill="var(--crimson)" />
          </svg>
        </div>

        <div className="mt-10 grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-0">
          <div className="md:pr-12">
            <div className={`${MICRO} text-[var(--crimson)]`}>
              Past human biases
            </div>
            <p className="mt-4 font-serif text-lg leading-[1.55] text-[var(--charcoal)] md:text-[1.3125rem]">
              If historical data contains past human biases or missing records,
              the model will learn and repeat those errors.
            </p>
          </div>
          <div className="md:border-l md:border-[var(--charcoal)]/12 md:pl-12">
            <div className={`${MICRO} text-[var(--crimson)]`}>
              Incomplete records and bad labels
            </div>
            <p className="mt-4 font-serif text-lg leading-[1.55] text-[var(--charcoal)] md:text-[1.3125rem]">
              Incomplete records and bad labels create noisy forecasts that
              mislead decision makers.
            </p>
          </div>
        </div>

        <div className="w-full">
          <figure className="mt-14 max-w-4xl border-l-2 border-[var(--crimson)] pl-6 md:pl-8">
            <blockquote className="font-serif text-xl leading-[1.4] text-[var(--charcoal)] md:text-[1.75rem]">
              High data quality and careful verification matter far more than
              using a trendy model architecture.
            </blockquote>
          </figure>
        </div>
      </Slide>

      {/* ==================================================================
          21 · THE FLYWHEEL — a closed ring, because the point is that it has
          no end. Four stages sit on the circumference; the arrowhead shows
          the direction of travel.
      ================================================================== */}
      <Slide id="flywheel" border align="left">
        <div>
          <div className={`${MICRO} text-[var(--champagne)]`}>
            A cycle, not a launch
          </div>
          <h2 className="mt-5 max-w-4xl font-serif text-[2rem] font-bold leading-[1.04] tracking-[-0.02em] text-[var(--charcoal)] md:text-[3rem]">
            The Feedback Loop and Data Flywheel
          </h2>
        </div>

        <div className="mt-12 grid w-full max-w-5xl items-center gap-12 md:grid-cols-[minmax(0,17rem)_1fr] md:gap-16">
          <div>
            <svg
              aria-hidden
              viewBox="0 0 220 220"
              className="w-full max-w-[17rem]"
              fill="none"
            >
              <circle
                cx="110"
                cy="110"
                r="88"
                stroke="var(--charcoal)"
                strokeOpacity="0.18"
              />
              <circle
                cx="110"
                cy="110"
                r="60"
                stroke="var(--charcoal)"
                strokeOpacity="0.08"
              />
              <path
                d="M110 22 A 88 88 0 0 1 198 110"
                stroke="var(--crimson)"
                strokeWidth="1.75"
              />
              <path d="M198 110l-4.5-8h9z" fill="var(--crimson)" />
              {[
                { x: 110, y: 22, n: "01", tx: 110, ty: 10, anchor: "middle" as const },
                { x: 198, y: 110, n: "02", tx: 212, ty: 113, anchor: "end" as const },
                { x: 110, y: 198, n: "03", tx: 110, ty: 215, anchor: "middle" as const },
                { x: 22, y: 110, n: "04", tx: 8, ty: 113, anchor: "start" as const },
              ].map((p) => (
                <g key={p.n}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="4"
                    fill="var(--surface)"
                    stroke="var(--champagne)"
                  />
                  <text
                    x={p.tx}
                    y={p.ty}
                    fill="var(--champagne)"
                    fontSize="9"
                    letterSpacing="2.2"
                    textAnchor={p.anchor}
                    fontFamily="var(--font-sans), sans-serif"
                    fontWeight="600"
                  >
                    {p.n}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <ol className="space-y-8">
            {[
              {
                n: "01",
                tag: "Deployment",
                line: "A successful AI deployment is never finished on day one.",
              },
              {
                n: "02",
                tag: "Customer actions",
                line: "When customers use the product, their actions generate fresh behavioral signals and performance data.",
              },
              {
                n: "03",
                tag: "Retraining",
                line: "This new data is fed back into the system to retrain models and improve predictions.",
              },
              {
                n: "04",
                tag: "Better predictions",
                line: "Better predictions attract more users, which generates more data and creates a virtuous learning cycle.",
              },
            ].map((stage) => (
              <li key={stage.n} className="block">
                <div className="grid grid-cols-[3ch_1fr] gap-5">
                  <span className={`${MICRO} pt-1.5 text-[var(--champagne)]`}>
                    {stage.n}
                  </span>
                  <div>
                    <div className={`${MICRO} text-[var(--charcoal-light)]/55`}>
                      {stage.tag}
                    </div>
                    <p className="mt-2 max-w-xl font-serif text-base leading-[1.6] text-[var(--charcoal)] md:text-[1.1875rem]">
                      {stage.line}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Slide>

      {/* ==================================================================
          22 · MODULE V
      ================================================================== */}
      <Slide id="module-5" border align="left">
        <div className="grid w-full items-end gap-10 md:grid-cols-[minmax(0,10rem)_1fr] md:gap-16">
          <div>
            <div className={`${MICRO} text-[var(--champagne)]`}>Module</div>
            <div className="font-serif text-[6rem] font-black leading-[0.8] tracking-[-0.04em] text-[var(--crimson)] md:text-[9rem]">
              V
            </div>
          </div>

          <div className="md:border-l md:border-[var(--charcoal)]/12 md:pl-16">
            <h2 className="font-serif text-[2.25rem] font-bold leading-[1.02] tracking-[-0.025em] text-[var(--charcoal)] md:text-[3.75rem]">
              Risks, Ethics, and Governance
            </h2>
            <div className="mt-8 h-px w-24 bg-[var(--charcoal)]/20" />
            <p className="mt-8 max-w-2xl font-serif text-lg font-light italic leading-relaxed text-[var(--charcoal-light)] md:text-2xl">
              This section examines the operational, legal, and reputational
              risks of deploying AI.
            </p>
            <p className="mt-4 max-w-2xl font-serif text-lg font-light italic leading-relaxed text-[var(--charcoal-light)] md:text-2xl">
              We review why AI initiatives fail and how business leaders can
              manage these risks.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          23 · WHY PROJECTS FAIL — a post-mortem sheet. Three failure causes
          ruled in a column and struck through by a fracture line; the
          remedy is set apart and is the only unstruck panel.          [quiz]
      ================================================================== */}
      <Slide
        id="why-projects-fail"
        border
        align="left"
        quizData={quiz["why-projects-fail"]}
      >
        <div>
          <div className={`${MICRO} text-[var(--crimson)]`}>Post-mortem</div>
          <h2 className="mt-5 max-w-4xl font-serif text-[2rem] font-bold leading-[1.04] tracking-[-0.02em] text-[var(--charcoal)] md:text-[3rem]">
            Why Business AI Projects Fail
          </h2>
        </div>

        <div className="mt-12 w-full max-w-5xl">
          {[
            {
              n: "01",
              tag: "Exciting technology first",
              line: "Many AI projects fail because teams start with exciting technology instead of an urgent business problem.",
            },
            {
              n: "02",
              tag: "Poor data quality",
              line: "Poor data quality, messy databases, and disconnected systems prevent models from working reliably.",
            },
            {
              n: "03",
              tag: "Employee resistance",
              line: "Employees often resist new tools if they do not trust the recommendations or fear losing their jobs.",
            },
          ].map((cause) => (
            <div key={cause.n}>
              <div className="grid grid-cols-[3ch_1fr] gap-5 border-t border-[var(--charcoal)]/10 py-7 md:grid-cols-[4ch_1fr] md:gap-8">
                <span className={`${MICRO} pt-2 text-[var(--crimson)]`}>
                  {cause.n}
                </span>
                <div>
                  <div className={`${MICRO} text-[var(--charcoal-light)]/50`}>
                    {cause.tag}
                  </div>
                  <p className="mt-3 max-w-3xl font-serif text-lg leading-[1.55] text-[var(--charcoal)] md:text-[1.375rem]">
                    {cause.line}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div>
            <div className="mt-10 border border-[var(--crimson)]/45 p-7 md:p-9">
              <div className={`${MICRO} text-[var(--crimson)]`}>
                What adoption actually requires
              </div>
              <p className="mt-4 max-w-3xl font-serif text-xl leading-[1.4] text-[var(--charcoal)] md:text-[1.75rem]">
                Clear executive sponsorship, realistic timelines, and change
                management are essential for adoption.
              </p>
            </div>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          24 · HALLUCINATIONS & THE BLACK BOX — two failures of trust, drawn
          as two failures of sight. Left: confident text dissolving. Right:
          a box whose interior is genuinely opaque.                    [quiz]
      ================================================================== */}
      <Slide
        id="hallucinations"
        border
        align="left"
        quizData={quiz["hallucinations"]}
      >
        <div>
          <div className={`${MICRO} text-[var(--champagne)]`}>
            Two failures of trust
          </div>
          <h2 className="mt-5 max-w-4xl font-serif text-[1.875rem] font-bold leading-[1.05] tracking-[-0.02em] text-[var(--charcoal)] md:text-[2.875rem]">
            Hallucinations, Accuracy, and the Black Box Problem
          </h2>
        </div>

        <div className="mt-12 grid w-full max-w-5xl gap-12 md:grid-cols-2 md:gap-0">
          <div className="md:pr-12">
            <div className={`${MICRO} text-[var(--crimson)]`}>Hallucinations</div>
            <div aria-hidden className="mt-6 max-w-[280px] space-y-2">
              {[1, 0.6, 0.34, 0.16, 0.07].map((o, i) => (
                <span
                  key={i}
                  className="block h-1.5 bg-[var(--charcoal)]"
                  style={{ opacity: o, width: `${100 - i * 9}%` }}
                />
              ))}
            </div>
            <p className="mt-7 font-serif text-lg leading-[1.55] text-[var(--charcoal)] md:text-[1.3125rem]">
              Generative models can produce convincing answers that are
              factually wrong, known as hallucinations.
            </p>
          </div>

          <div className="md:border-l md:border-[var(--charcoal)]/12 md:pl-12">
            <div className={`${MICRO} text-[var(--charcoal-light)]/55`}>
              Black boxes
            </div>
            <svg
              aria-hidden
              viewBox="0 0 280 92"
              className="mt-6 w-full max-w-[280px]"
              fill="none"
            >
              <path d="M2 46h44" stroke="var(--charcoal)" strokeOpacity="0.35" />
              <path d="M46 46l-7-4v8z" fill="var(--charcoal)" fillOpacity="0.45" />
              <rect x="54" y="6" width="172" height="80" fill="var(--charcoal)" />
              <path
                d="M234 46h44"
                stroke="var(--charcoal)"
                strokeOpacity="0.35"
              />
              <path d="M278 46l-7-4v8z" fill="var(--charcoal)" fillOpacity="0.45" />
              <text
                x="140"
                y="54"
                fill="var(--surface)"
                fillOpacity="0.6"
                fontSize="24"
                textAnchor="middle"
                fontFamily="var(--font-serif), serif"
              >
                ?
              </text>
            </svg>
            <p className="mt-7 font-serif text-lg leading-[1.55] text-[var(--charcoal)] md:text-[1.3125rem]">
              Many deep learning models are black boxes, meaning humans cannot
              easily trace how the system reached a conclusion.
            </p>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 max-w-4xl border-l border-[var(--charcoal)]/25 pl-6">
            <div className={`${MICRO} text-[var(--charcoal-light)]/50`}>
              Regulated industries
            </div>
            <p className="mt-3 font-serif text-lg leading-[1.6] text-[var(--charcoal-light)] md:text-[1.25rem]">
              In regulated fields like banking and healthcare, companies must be
              able to explain the exact logic behind their decisions.
            </p>
          </div>
        </div>

        <div className="w-full">
          <p className="mt-12 max-w-4xl font-serif text-[1.375rem] font-bold leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[2rem]">
            Leaders must test system outputs and build guardrails before
            deploying customer-facing AI.
          </p>
        </div>
      </Slide>

      {/* ==================================================================
          25 · PRIVACY, SECURITY, IP — three exposures held in three ruled
          vault panels, each with its own tally mark. The obligation closes
          the slide as a single ruled line.
      ================================================================== */}
      <Slide id="privacy-security-ip" border align="left">
        <div>
          <div className={`${MICRO} text-[var(--champagne)]`}>Three exposures</div>
          <h2 className="mt-5 max-w-4xl font-serif text-[1.875rem] font-bold leading-[1.05] tracking-[-0.02em] text-[var(--charcoal)] md:text-[2.875rem]">
            Privacy, Security, and Intellectual Property
          </h2>
        </div>

        <div className="mt-12 grid w-full max-w-5xl gap-8 md:grid-cols-3 md:gap-6">
          {[
            {
              n: "I",
              tag: "Public AI tools",
              line: "Using public AI tools can accidentally expose proprietary customer records, financial figures, or trade secrets.",
            },
            {
              n: "II",
              tag: "Data privacy laws",
              line: "Businesses must follow data privacy laws and obtain proper customer consent before training models.",
            },
            {
              n: "III",
              tag: "Copyrighted materials",
              line: "Training models on copyrighted materials creates growing legal and financial liability.",
            },
          ].map((panel) => (
            <div key={panel.n}>
              <div className="h-full border-t-2 border-[var(--crimson)]/50 pt-6">
                <div className="font-serif text-[1.75rem] font-black leading-none text-[var(--charcoal)]/15">
                  {panel.n}
                </div>
                <div className={`${MICRO} mt-4 text-[var(--charcoal-light)]/55`}>
                  {panel.tag}
                </div>
                <p className="mt-3 font-serif text-base leading-[1.6] text-[var(--charcoal)] md:text-[1.0625rem]">
                  {panel.line}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl border-t border-[var(--charcoal)]/15 pt-6">
            <p className="max-w-4xl font-serif text-xl leading-[1.45] text-[var(--charcoal)] md:text-[1.625rem]">
              Organizations need strict data handling policies and secure
              infrastructure to protect sensitive information.
            </p>
          </div>
        </div>

        <div className="w-full">
          <aside className="mt-12 max-w-3xl border border-[var(--charcoal)]/12 p-7 md:p-9">
            <div className={`${MICRO} text-[var(--champagne)]`}>Discussion</div>
            <p className="mt-4 font-serif text-lg font-light italic leading-relaxed text-[var(--charcoal)] md:text-[1.375rem]">
              How should a company respond if an employee accidentally uploads
              confidential client data into a public chatbot to save time on a
              report?
            </p>
          </aside>
        </div>
      </Slide>

      {/* ==================================================================
          26 · GOVERNANCE — an accountability sheet. The verdict sits at the
          top in display type; the three duties are ruled beneath it like
          clauses, and the slide closes on a signature line.
      ================================================================== */}
      <Slide id="governance" border align="left">
        <div>
          <div className={`${MICRO} text-[var(--champagne)]`}>
            Who is answerable
          </div>
          <h2 className="mt-5 max-w-4xl font-serif text-[2rem] font-bold leading-[1.04] tracking-[-0.02em] text-[var(--charcoal)] md:text-[3rem]">
            Governance and Executive Accountability
          </h2>
        </div>

        <div className="w-full">
          <p className="mt-9 max-w-4xl font-serif text-[1.5rem] font-black leading-[1.2] tracking-[-0.02em] text-[var(--charcoal)] md:text-[2.5rem]">
            Business executives, not data scientists alone, are legally and
            ethically responsible for automated decisions.
          </p>
        </div>

        <div className="mt-14 w-full max-w-5xl">
          {[
            {
              n: "i",
              line: "Leaders must set clear rules for who approves model deployment, who monitors accuracy, and who handles customer complaints.",
            },
            {
              n: "ii",
              line: "Regular audits are needed to check for algorithmic bias, performance decline, and compliance issues over time.",
            },
            {
              n: "iii",
              line: "Good governance protects customer trust and preserves the long-term reputation of the enterprise.",
            },
          ].map((clause) => (
            <div key={clause.n}>
              <div className="grid grid-cols-[3ch_1fr] gap-5 border-t border-[var(--charcoal)]/10 py-7 md:grid-cols-[4ch_1fr] md:gap-8">
                <span className="pt-1 font-serif text-sm lowercase tracking-[0.1em] text-[var(--champagne)]">
                  {clause.n}
                </span>
                <p className="max-w-3xl font-serif text-lg leading-[1.55] text-[var(--charcoal)] md:text-[1.375rem]">
                  {clause.line}
                </p>
              </div>
            </div>
          ))}

          <div>
            <div className="mt-10 flex max-w-sm flex-col gap-2">
              <span className="h-px w-full bg-[var(--charcoal)]/25" />
              <span className={`${MICRO} text-[var(--charcoal-light)]/40`}>
                Accountable executive
              </span>
            </div>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          27 · MODULE VI
      ================================================================== */}
      <Slide id="module-6" border align="left">
        <div className="grid w-full items-end gap-10 md:grid-cols-[minmax(0,10rem)_1fr] md:gap-16">
          <div>
            <div className={`${MICRO} text-[var(--champagne)]`}>Module</div>
            <div className="font-serif text-[6rem] font-black leading-[0.8] tracking-[-0.04em] text-[var(--crimson)] md:text-[9rem]">
              VI
            </div>
          </div>

          <div className="md:border-l md:border-[var(--charcoal)]/12 md:pl-16">
            <h2 className="font-serif text-[2.25rem] font-bold leading-[1.02] tracking-[-0.025em] text-[var(--charcoal)] md:text-[3.75rem]">
              The Course Roadmap
            </h2>
            <div className="mt-8 h-px w-24 bg-[var(--charcoal)]/20" />
            <p className="mt-8 max-w-2xl font-serif text-lg font-light italic leading-relaxed text-[var(--charcoal-light)] md:text-2xl">
              This final section outlines the upcoming weeks of the semester in
              BUSI 654.
            </p>
            <p className="mt-4 max-w-2xl font-serif text-lg font-light italic leading-relaxed text-[var(--charcoal-light)] md:text-2xl">
              We will explore how AI applies across each major business
              discipline.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          28 · ROADMAP — a semester timetable. Two ruled columns of weeks,
          each week's numeral set large in the margin so the term can be
          read at a glance rather than scrolled.
      ================================================================== */}
      <Slide id="roadmap" border align="left">
        <div>
          <div className={`${MICRO} text-[var(--champagne)]`}>
            Eight weeks ahead
          </div>
          <h2 className="mt-5 max-w-4xl font-serif text-[1.875rem] font-bold leading-[1.05] tracking-[-0.02em] text-[var(--charcoal)] md:text-[2.875rem]">
            Semester Roadmap: Applications of AI in Business
          </h2>
        </div>

        <div className="mt-12 grid w-full max-w-5xl gap-x-14 md:grid-cols-2">
          {[
            {
              n: "02",
              line: "Week 02 explores marketing, demand sensing, dynamic personalization, and consumer behavior.",
            },
            {
              n: "03",
              line: "Week 03 covers finance, credit scoring, algorithmic risk management, and fraud prevention.",
            },
            {
              n: "04",
              line: "Week 04 examines human resources, talent acquisition, workforce planning, and organizational analytics.",
            },
            {
              n: "05",
              line: "Week 05 focuses on operations, logistics, demand forecasting, and supply chain visibility.",
            },
            {
              n: "06",
              line: "Week 06 analyzes corporate strategy, competitive advantage, and data moats.",
            },
            {
              n: "07",
              line: "Week 07 addresses equity, diversity, inclusion, and algorithmic fairness.",
            },
            {
              n: "08",
              line: "Week 08 covers sustainability and the environmental footprint of computing.",
            },
            {
              n: "09",
              line: "Week 09 examines product development and modern agentic engineering workflows.",
            },
          ].map((stop) => (
            <div key={stop.n}>
              <div className="grid grid-cols-[3.5rem_1fr] items-baseline gap-5 border-t border-[var(--charcoal)]/10 py-6">
                <span className="font-serif text-[1.75rem] font-black leading-none tracking-[-0.03em] text-[var(--charcoal)]/18">
                  {stop.n}
                </span>
                <p className="font-serif text-base leading-[1.55] text-[var(--charcoal)] md:text-[1.0625rem]">
                  {stop.line}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Slide>

      {/* ==================================================================
          29 · SUMMARY — the colophon. Four principles set as display
          statements rather than list items, because they are what the
          student should leave holding.
      ================================================================== */}
      <Slide id="summary" border align="left" className="relative overflow-hidden">
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-10 right-0 select-none font-serif text-[24vw] font-black leading-none text-[var(--charcoal)]/[0.03]"
        >
          01
        </span>

        <div>
          <div className={`${MICRO} text-[var(--champagne)]`}>
            Four things to carry forward
          </div>
          <h2 className="mt-5 max-w-4xl font-serif text-[1.875rem] font-bold leading-[1.05] tracking-[-0.02em] text-[var(--charcoal)] md:text-[2.875rem]">
            Summary and Core Principles for Leaders
          </h2>
        </div>

        <ol className="mt-14 w-full max-w-4xl">
          {[
            {
              n: "01",
              line: "View artificial intelligence as an engine that lowers the cost of prediction.",
            },
            {
              n: "02",
              line: "Focus on specific, high-value business decisions rather than generic technology trends.",
            },
            {
              n: "03",
              line: "Build clean data foundations and establish ongoing governance for every deployed system.",
            },
            {
              n: "04",
              line: "Remember that human judgment, ethical standards, and strategic vision remain irreplaceable.",
            },
          ].map((p) => (
            <li key={p.n} className="block">
              <div className="grid grid-cols-[4ch_1fr] gap-6 border-t border-[var(--charcoal)]/12 py-8 md:grid-cols-[5ch_1fr] md:gap-10">
                <span className={`${MICRO} pt-3 text-[var(--crimson)]`}>
                  {p.n}
                </span>
                <p className="font-serif text-xl font-bold leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[1.875rem]">
                  {p.line}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="w-full">
          <div className="mt-14 flex w-full max-w-4xl flex-wrap items-baseline justify-between gap-4 border-t border-[var(--charcoal)]/12 pt-5">
            <span className={`${MICRO} text-[var(--champagne)]`}>
              End of Week 01
            </span>
            <span className={`${MICRO} font-normal text-[var(--charcoal-light)]/55`}>
              Davood Wadi, PhD · BUSI 654
            </span>
          </div>
        </div>
      </Slide>
    </SlideDeck>
  );
}
