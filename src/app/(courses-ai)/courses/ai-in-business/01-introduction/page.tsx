"use client";

import React from "react";
import {
  Slide,
  SlideDeck,
} from "@/app/(courses-ai)/_components/SlideComponents";
import { ScrollProgress } from "@/app/(courses-ai)/_components/Interactive";
import { createCourseQuizLookup, type CourseQuiz } from "@/lib/course-quiz";
import quizzes from "./quizzes.json";
import { MICRO } from "../_visuals/kit";

// ============================================================================
// WEEK 01: INTRODUCTION TO AI IN BUSINESS
// ============================================================================
// Every slide below is hand-composed. There is no shared "content block"
// component: each section gets a layout drawn for its own argument, a ledger,
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

export default function Week01Introduction() {
  return (
    <SlideDeck>
      <ScrollProgress label="Week 01" />

      {/* ==================================================================
          01. TITLE: a broadsheet masthead. Ghost week numeral behind the
          type, folio rails in both margins, the subtitle set as a standfirst
          beneath a full-measure rule.
      ================================================================== */}
      <Slide id="title" align="left" className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 hidden h-full w-px bg-[var(--charcoal)]/8 lg:block"
        />

        <div>
          <div
            className={`${MICRO} flex items-center gap-4 text-[var(--champagne)]`}
          >
            <span className="h-px w-10 bg-[var(--crimson)]" />
            Week 01: Course Overview and Foundations
          </div>
        </div>

        <div>
          <h1 className="mt-10 max-w-5xl font-serif text-[clamp(2.75rem,9vw,6.5rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-[var(--charcoal)]">
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
            <span
              className={`${MICRO} font-normal text-[var(--charcoal-light)]/60`}
            >
              BUSI 654. Applications of AI in Business
            </span>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          02. WHY LEADERS: the argument is a subtraction, so the slide is
          built as one: the struck line on the left, the kept line on the
          right, and the strategic goal set apart as a signed verdict.
      ================================================================== */}
      <Slide id="why-leaders" border align="left">
        <div>
          <div className={`${MICRO} text-[var(--champagne)]`}>Opening</div>
          <h2 className="mt-5 max-w-4xl font-serif text-[2rem] font-semibold leading-[1.04] tracking-[-0.02em] text-[var(--charcoal)] md:text-[3rem]">
            Why Business Leaders Must Understand AI
          </h2>
        </div>

        <div className="w-full">
          <div className="mt-8 grid max-w-5xl gap-x-14 gap-y-8 border-t border-[var(--charcoal)]/10 pt-7 md:grid-cols-2">
            <div className="flex flex-col justify-between">
              <p className="font-serif text-lg leading-[1.6] text-[var(--charcoal)] md:text-[1.3125rem]">
                Artificial intelligence has moved from research labs into core
                business operations.
              </p>
              <svg
                role="img"
                aria-label="Artificial intelligence moving from dashed research labs into solid core business operations."
                viewBox="0 0 400 88"
                className="mt-5 w-full"
                fill="none"
              >
                <title>
                  Artificial intelligence moving from dashed research labs into
                  solid core business operations.
                </title>
                <rect
                  x="4"
                  y="12"
                  width="148"
                  height="64"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.28"
                  strokeDasharray="3 3"
                />
                <text
                  x="78"
                  y="41"
                  fill="var(--charcoal)"
                  fillOpacity="0.5"
                  fontSize="9"
                  letterSpacing="0.4"
                  textAnchor="middle"
                  fontFamily="var(--font-serif), Georgia, serif"
                  fontWeight="600"
                >
                  RESEARCH
                </text>
                <text
                  x="78"
                  y="55"
                  fill="var(--charcoal)"
                  fillOpacity="0.5"
                  fontSize="9"
                  letterSpacing="0.4"
                  textAnchor="middle"
                  fontFamily="var(--font-serif), Georgia, serif"
                  fontWeight="600"
                >
                  LABS
                </text>
                <path
                  d="M152 44H224"
                  stroke="var(--crimson)"
                  strokeWidth="1.25"
                />
                <path
                  d="M216 39L224 44L216 49"
                  stroke="var(--crimson)"
                  strokeWidth="1.25"
                />
                <rect
                  x="224"
                  y="12"
                  width="172"
                  height="64"
                  fill="var(--crimson)"
                  fillOpacity="0.05"
                  stroke="var(--crimson)"
                  strokeWidth="1.5"
                />
                <text
                  x="310"
                  y="41"
                  fill="var(--crimson)"
                  fontSize="9"
                  letterSpacing="0.4"
                  textAnchor="middle"
                  fontFamily="var(--font-serif), Georgia, serif"
                  fontWeight="600"
                >
                  CORE BUSINESS
                </text>
                <text
                  x="310"
                  y="55"
                  fill="var(--crimson)"
                  fontSize="9"
                  letterSpacing="0.4"
                  textAnchor="middle"
                  fontFamily="var(--font-serif), Georgia, serif"
                  fontWeight="600"
                >
                  OPERATIONS
                </text>
              </svg>
            </div>

            <div className="flex flex-col justify-between">
              <p className="font-serif text-lg leading-[1.6] text-[var(--charcoal-light)] md:text-[1.3125rem]">
                Modern companies process massive volumes of customer,
                transaction, and operational data every second.
              </p>
              <svg
                role="img"
                aria-label="Three high-frequency pulse streams for customer, transaction, and operational data processed every second."
                viewBox="0 0 400 88"
                className="mt-5 w-full"
                fill="none"
              >
                <title>
                  Three high-frequency pulse streams for customer, transaction,
                  and operational data processed every second.
                </title>
                {[
                  { label: "CUSTOMER", y: 18, seed: 1 },
                  { label: "TRANSACTION", y: 40, seed: 2 },
                  { label: "OPERATIONAL", y: 62, seed: 3 },
                ].map((lane) => (
                  <g key={lane.label}>
                    <text
                      x="4"
                      y={lane.y + 3}
                      fill="var(--charcoal)"
                      fillOpacity="0.6"
                      fontSize="9"
                      letterSpacing="0.4"
                      fontFamily="var(--font-serif), Georgia, serif"
                      fontWeight="600"
                    >
                      {lane.label}
                    </text>
                    <path
                      d={`M124 ${lane.y}H396`}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.14"
                    />
                    {Array.from({ length: 34 }).map((_, i) => {
                      const x = +(128 + i * 7.8).toFixed(2);
                      const h = 3 + ((i * 7 + lane.seed * 5) % 5);
                      const recent = i >= 29;
                      return (
                        <path
                          key={i}
                          d={`M${x} ${lane.y - h}v${h * 2}`}
                          stroke={recent ? "var(--crimson)" : "var(--charcoal)"}
                          strokeOpacity={recent ? "0.85" : "0.38"}
                          strokeWidth={recent ? "1.25" : "1"}
                        />
                      );
                    })}
                  </g>
                ))}
                <text
                  x="396"
                  y="82"
                  fill="var(--champagne)"
                  fontSize="9"
                  letterSpacing="0.4"
                  textAnchor="end"
                  fontFamily="var(--font-serif), Georgia, serif"
                  fontWeight="600"
                >
                  EVERY SECOND →
                </text>
              </svg>
            </div>
          </div>
        </div>

        <div className="w-full">
          <figure className="mt-10 max-w-4xl border-l-2 border-[var(--crimson)] pl-6 md:pl-8">
            <div className={`${MICRO} text-[var(--champagne)]`}>
              The strategic goal
            </div>
            <blockquote className="mt-2 font-serif text-[1.375rem] font-medium leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[1.875rem]">
              The primary strategic goal is knowing which business decisions can
              be improved with machine assistance.
            </blockquote>
          </figure>
        </div>
      </Slide>

      {/* ==================================================================
          03. BUSINESS AS DECISIONS: a decision ledger. Three functions,
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
          <h2 className="mt-5 max-w-4xl font-serif text-[2rem] font-semibold leading-[1.04] tracking-[-0.02em] text-[var(--charcoal)] md:text-[3rem]">
            Business as a Series of Decisions
          </h2>
          <p className="mt-7 max-w-3xl font-serif text-xl leading-[1.6] text-[var(--charcoal-light)] md:text-[1.5rem]">
            Every business runs on repeated decisions made under uncertainty.
          </p>
        </div>

        <div className="mt-10 w-full max-w-5xl">
          <div>
            <div
              className={`${MICRO} grid grid-cols-1 gap-2 border-b border-[var(--charcoal)]/15 pb-3 text-[var(--charcoal-light)]/45 md:grid-cols-[10rem_1fr_19rem] md:gap-8`}
            >
              <span>Function</span>
              <span>The choice, made again and again</span>
              <span className="hidden md:block">Operational choice</span>
            </div>
          </div>

          {[
            {
              n: "01",
              who: "Marketers",
              line: "Marketers choose which audience to target and which message to show.",
              figure: (
                <svg
                  role="img"
                  aria-label="Three audience segments where one target audience is selected in crimson and matched to a message."
                  viewBox="0 0 400 104"
                  className="w-full"
                  fill="none"
                >
                  <title>
                    Three audience segments where one target audience is
                    selected in crimson and matched to a message.
                  </title>
                  <text
                    x="8"
                    y="16"
                    fill="var(--charcoal)"
                    fillOpacity="0.55"
                    fontSize="10"
                    letterSpacing="0.4"
                    fontFamily="var(--font-serif), Georgia, serif"
                    fontWeight="600"
                  >
                    AUDIENCE
                  </text>
                  {[
                    { y: 34, target: false },
                    { y: 58, target: true },
                    { y: 82, target: false },
                  ].map((seg, i) => (
                    <g key={i}>
                      {[0, 1, 2].map((p) => (
                        <circle
                          key={p}
                          cx={18 + p * 18}
                          cy={seg.y}
                          r="5"
                          fill={
                            seg.target ? "var(--crimson)" : "var(--charcoal)"
                          }
                          fillOpacity={seg.target ? "0.2" : "0.12"}
                          stroke={
                            seg.target ? "var(--crimson)" : "var(--charcoal)"
                          }
                          strokeOpacity={seg.target ? "1" : "0.35"}
                          strokeWidth={seg.target ? "1.5" : "1"}
                        />
                      ))}
                    </g>
                  ))}
                  <text
                    x="74"
                    y="61"
                    fill="var(--crimson)"
                    fontSize="10"
                    letterSpacing="0.4"
                    fontFamily="var(--font-serif), Georgia, serif"
                    fontWeight="600"
                  >
                    TARGET
                  </text>
                  <path
                    d="M146 58H246"
                    stroke="var(--crimson)"
                    strokeWidth="1.25"
                  />
                  <path
                    d="M238 53L246 58L238 63"
                    stroke="var(--crimson)"
                    strokeWidth="1.25"
                  />
                  <rect
                    x="246"
                    y="28"
                    width="146"
                    height="60"
                    fill="var(--crimson)"
                    fillOpacity="0.05"
                    stroke="var(--crimson)"
                    strokeWidth="1.5"
                  />
                  <text
                    x="319"
                    y="54"
                    fill="var(--crimson)"
                    fontSize="10"
                    letterSpacing="0.4"
                    textAnchor="middle"
                    fontFamily="var(--font-serif), Georgia, serif"
                    fontWeight="600"
                  >
                    MESSAGE
                  </text>
                  <path
                    d="M272 68H366M286 76H352"
                    stroke="var(--crimson)"
                    strokeOpacity="0.45"
                  />
                </svg>
              ),
            },
            {
              n: "02",
              who: "Financial managers",
              line: "Financial managers decide which loans to approve and which transactions to review for fraud.",
              figure: (
                <svg
                  role="img"
                  aria-label="Loans routed to approve and flagged transactions routed to review for fraud."
                  viewBox="0 0 400 104"
                  className="w-full"
                  fill="none"
                >
                  <title>
                    Loans routed to approve and flagged transactions routed to
                    review for fraud.
                  </title>
                  <rect
                    x="8"
                    y="16"
                    width="128"
                    height="30"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.35"
                  />
                  <text
                    x="72"
                    y="35"
                    fill="var(--charcoal)"
                    fillOpacity="0.65"
                    fontSize="10"
                    letterSpacing="0.4"
                    textAnchor="middle"
                    fontFamily="var(--font-serif), Georgia, serif"
                    fontWeight="600"
                  >
                    LOANS
                  </text>
                  <path
                    d="M136 31H224"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.4"
                  />
                  <path
                    d="M216 26L224 31L216 36"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.5"
                  />
                  <text
                    x="236"
                    y="35"
                    fill="var(--charcoal)"
                    fillOpacity="0.65"
                    fontSize="10"
                    letterSpacing="0.4"
                    fontFamily="var(--font-serif), Georgia, serif"
                    fontWeight="600"
                  >
                    APPROVE
                  </text>

                  <rect
                    x="8"
                    y="58"
                    width="128"
                    height="30"
                    fill="var(--crimson)"
                    fillOpacity="0.05"
                    stroke="var(--crimson)"
                    strokeWidth="1.25"
                  />
                  <text
                    x="72"
                    y="77"
                    fill="var(--crimson)"
                    fontSize="10"
                    letterSpacing="0.4"
                    textAnchor="middle"
                    fontFamily="var(--font-serif), Georgia, serif"
                    fontWeight="600"
                  >
                    TRANSACTIONS
                  </text>
                  <path
                    d="M136 73H224"
                    stroke="var(--crimson)"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M216 68L224 73L216 78"
                    stroke="var(--crimson)"
                    strokeWidth="1.5"
                  />
                  <text
                    x="236"
                    y="77"
                    fill="var(--crimson)"
                    fontSize="10"
                    letterSpacing="0.4"
                    fontFamily="var(--font-serif), Georgia, serif"
                    fontWeight="600"
                  >
                    REVIEW FOR FRAUD
                  </text>
                </svg>
              ),
            },
            {
              n: "03",
              who: "Supply chain teams",
              line: "Supply chain teams estimate how much inventory to order and when to replenish stock.",
              figure: (
                <svg
                  role="img"
                  aria-label="Inventory level falling to a threshold and triggering an order to replenish stock."
                  viewBox="0 0 400 104"
                  className="w-full"
                  fill="none"
                >
                  <title>
                    Inventory level falling to a threshold and triggering an
                    order to replenish stock.
                  </title>
                  <text
                    x="8"
                    y="16"
                    fill="var(--charcoal)"
                    fillOpacity="0.55"
                    fontSize="10"
                    letterSpacing="0.4"
                    fontFamily="var(--font-serif), Georgia, serif"
                    fontWeight="600"
                  >
                    INVENTORY
                  </text>
                  <path
                    d="M8 92H392"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.2"
                  />
                  <path
                    d="M8 72H392"
                    stroke="var(--crimson)"
                    strokeOpacity="0.35"
                    strokeDasharray="3 3"
                  />
                  <path
                    d="M12 28L128 72V28L244 72"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.45"
                    strokeWidth="1.25"
                  />
                  <path
                    d="M244 72V26"
                    stroke="var(--crimson)"
                    strokeWidth="1.75"
                  />
                  <path
                    d="M239 34L244 26L249 34"
                    stroke="var(--crimson)"
                    strokeWidth="1.5"
                  />
                  <circle cx="244" cy="72" r="3.5" fill="var(--crimson)" />
                  <text
                    x="258"
                    y="54"
                    fill="var(--crimson)"
                    fontSize="10"
                    letterSpacing="0.4"
                    fontFamily="var(--font-serif), Georgia, serif"
                    fontWeight="600"
                  >
                    REPLENISH STOCK
                  </text>
                </svg>
              ),
            },
          ].map((row) => (
            <div key={row.n}>
              <div className="grid grid-cols-1 items-center gap-4 border-b border-[var(--charcoal)]/8 py-5 md:grid-cols-[10rem_1fr_19rem] md:gap-8">
                <div className="flex items-baseline gap-3 md:block">
                  <span
                    className={`${MICRO} text-[var(--champagne)] md:block`}
                    aria-hidden
                  >
                    {row.n}
                  </span>
                  <span className="font-serif text-[1rem] font-medium tracking-normal text-[var(--charcoal)] md:mt-2 md:block">
                    {row.who}
                  </span>
                </div>
                <p className="font-serif text-lg leading-[1.6] text-[var(--charcoal)] md:text-[1.3125rem]">
                  {row.line}
                </p>
                <div className="w-full max-w-[19rem]">{row.figure}</div>
              </div>
            </div>
          ))}

          <div>
            <div className="mt-8">
              <p className="max-w-3xl font-serif text-[1.375rem] font-medium leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[1.875rem]">
                AI creates business value by improving the speed, accuracy, and
                consistency of these operational choices.
              </p>
            </div>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          04. MODULE I: the module plates are the deck's punctuation: a
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
            <h2 className="font-serif text-[2.25rem] font-semibold leading-[1.02] tracking-[-0.025em] text-[var(--charcoal)] md:text-[3.75rem]">
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
          05. DEFINING AI: the definition on top. Below it the two
          machines drawn as what they are. Left: literal rules, monospaced
          and rigid. Right: a scatter of data with a fitted line.
      ================================================================== */}
      <Slide id="defining-ai" border align="left">
        <div>
          <div className={`${MICRO} text-[var(--champagne)]`}>Definition</div>
          <h2 className="mt-5 max-w-4xl font-serif text-[2rem] font-semibold leading-[1.04] tracking-[-0.02em] text-[var(--charcoal)] md:text-[3rem]">
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

        <div className="mt-12 grid w-full max-w-5xl gap-12 border-t border-[var(--charcoal)]/10 pt-10 md:grid-cols-2 md:gap-0">
          <div className="flex flex-col justify-between md:pr-14">
            <div>
              <div className={`${MICRO} text-[var(--charcoal-light)]/55`}>
                Traditional software
              </div>
              <p className="mt-4 font-serif text-lg leading-[1.55] text-[var(--charcoal-light)] md:text-[1.375rem]">
                Traditional software follows rigid rules written directly by
                human programmers.
              </p>
            </div>
            <svg
              role="img"
              aria-label="Human programmers writing rigid step-function rules for traditional software."
              viewBox="0 0 400 124"
              className="mt-7 w-full"
              fill="none"
            >
              <title>
                Human programmers writing rigid step-function rules for
                traditional software.
              </title>
              <path
                d="M16 12V98H388"
                stroke="var(--charcoal)"
                strokeOpacity="0.22"
              />
              {/* Rigid orthogonal step rules */}
              <path
                d="M28 84H116V58H208V34H304V20H376"
                stroke="var(--charcoal)"
                strokeOpacity="0.65"
                strokeWidth="1.5"
              />
              {[
                [116, 84],
                [116, 58],
                [208, 58],
                [208, 34],
                [304, 34],
                [304, 20],
              ].map(([x, y], i) => (
                <rect
                  key={i}
                  x={x - 2.5}
                  y={y - 2.5}
                  width="5"
                  height="5"
                  fill="var(--surface)"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.65"
                />
              ))}
              <text
                x="32"
                y="26"
                fill="var(--charcoal)"
                fillOpacity="0.55"
                fontSize="10"
                letterSpacing="0.4"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                RIGID RULES
              </text>
              <text
                x="384"
                y="115"
                fill="var(--charcoal)"
                fillOpacity="0.45"
                fontSize="9"
                letterSpacing="0.4"
                textAnchor="end"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                HUMAN PROGRAMMERS
              </text>
            </svg>
          </div>

          <div className="flex flex-col justify-between md:border-l md:border-[var(--charcoal)]/12 md:pl-14">
            <div>
              <div className={`${MICRO} text-[var(--crimson)]`}>
                Modern AI systems
              </div>
              <p className="mt-4 font-serif text-lg leading-[1.55] text-[var(--charcoal)] md:text-[1.375rem]">
                Modern AI systems learn patterns directly from historical data.
              </p>
            </div>
            <svg
              role="img"
              aria-label="Modern AI systems fitting a smooth crimson pattern curve directly through scattered historical data points."
              viewBox="0 0 400 124"
              className="mt-7 w-full"
              fill="none"
            >
              <title>
                Modern AI systems fitting a smooth crimson pattern curve
                directly through scattered historical data points.
              </title>
              <path
                d="M16 12V98H388"
                stroke="var(--charcoal)"
                strokeOpacity="0.22"
              />
              {[
                [36, 86],
                [58, 78],
                [76, 88],
                [98, 70],
                [122, 76],
                [146, 60],
                [168, 66],
                [194, 50],
                [218, 56],
                [242, 40],
                [268, 46],
                [294, 30],
                [320, 36],
                [346, 22],
                [370, 26],
              ].map(([x, y]) => (
                <circle
                  key={`${x}-${y}`}
                  cx={x}
                  cy={y}
                  r="3"
                  fill="var(--charcoal)"
                  fillOpacity="0.38"
                />
              ))}
              <path
                d="M28 88 C 128 78, 244 44, 378 18"
                stroke="var(--crimson)"
                strokeWidth="1.75"
              />
              <text
                x="32"
                y="26"
                fill="var(--crimson)"
                fontSize="10"
                letterSpacing="0.4"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                PATTERNS
              </text>
              <text
                x="384"
                y="115"
                fill="var(--charcoal)"
                fillOpacity="0.5"
                fontSize="9"
                letterSpacing="0.4"
                textAnchor="end"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                HISTORICAL DATA
              </text>
            </svg>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          06. AI / ML / DL: containment drawn as containment: three nested
          frames, each label tied to its frame by a leader line.      [quiz]
      ================================================================== */}
      <Slide id="ai-ml-dl" border align="left" quizData={quiz["ai-ml-dl"]}>
        <div>
          <div className={`${MICRO} text-[var(--champagne)]`}>
            Three nested terms
          </div>
          <h2 className="mt-5 max-w-4xl font-serif text-[1.75rem] font-semibold leading-[1.06] tracking-[-0.02em] text-[var(--charcoal)] md:text-[2.75rem]">
            Artificial Intelligence, Machine Learning, and Deep Learning
          </h2>
        </div>

        <div className="mt-10 grid w-full max-w-5xl items-center gap-12 md:grid-cols-[1fr_minmax(0,23rem)] md:gap-14">
          <div className="space-y-7">
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
                <p className="mt-2.5 max-w-xl font-serif text-lg leading-[1.55] text-[var(--charcoal)] md:text-[1.3125rem]">
                  {layer.line}
                </p>
              </div>
            ))}
          </div>

          <div>
            <svg
              role="img"
              aria-label="Three nested frames showing Artificial Intelligence containing Machine Learning, which contains Deep Learning with a multi-layered neural network inside."
              viewBox="0 0 400 280"
              className="w-full"
              fill="none"
            >
              <title>
                Three nested frames showing Artificial Intelligence containing
                Machine Learning, which contains Deep Learning with a
                multi-layered neural network inside.
              </title>
              {/* Outer frame: Artificial Intelligence */}
              <rect
                x="4"
                y="4"
                width="392"
                height="272"
                stroke="var(--charcoal)"
                strokeOpacity="0.28"
              />
              <text
                x="18"
                y="24"
                fill="var(--charcoal)"
                fillOpacity="0.6"
                fontSize="10"
                letterSpacing="0.4"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                ARTIFICIAL INTELLIGENCE
              </text>

              {/* Middle frame: Machine Learning */}
              <rect
                x="32"
                y="40"
                width="336"
                height="216"
                stroke="var(--champagne)"
                strokeOpacity="0.65"
              />
              <text
                x="46"
                y="60"
                fill="var(--champagne)"
                fontSize="10"
                letterSpacing="0.4"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                MACHINE LEARNING
              </text>

              {/* Inner frame: Deep Learning */}
              <rect
                x="64"
                y="76"
                width="272"
                height="160"
                fill="var(--crimson)"
                fillOpacity="0.04"
                stroke="var(--crimson)"
                strokeWidth="1.5"
              />
              <text
                x="78"
                y="96"
                fill="var(--crimson)"
                fontSize="10"
                letterSpacing="0.4"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                DEEP LEARNING
              </text>

              {/* Multi-layered neural network inside Deep Learning */}
              {[124, 156, 188].map((y1) =>
                [116, 142, 168, 194].map((y2) => (
                  <line
                    key={`l1-${y1}-${y2}`}
                    x1="126"
                    y1={y1}
                    x2="200"
                    y2={y2}
                    stroke="var(--crimson)"
                    strokeOpacity="0.28"
                  />
                )),
              )}
              {[116, 142, 168, 194].map((y1) =>
                [140, 172].map((y2) => (
                  <line
                    key={`l2-${y1}-${y2}`}
                    x1="200"
                    y1={y1}
                    x2="274"
                    y2={y2}
                    stroke="var(--crimson)"
                    strokeOpacity="0.28"
                  />
                )),
              )}
              {[124, 156, 188].map((y) => (
                <circle
                  key={`in-${y}`}
                  cx="126"
                  cy={y}
                  r="4.5"
                  fill="var(--surface)"
                  stroke="var(--crimson)"
                  strokeWidth="1.5"
                />
              ))}
              {[116, 142, 168, 194].map((y) => (
                <circle
                  key={`hid-${y}`}
                  cx="200"
                  cy={y}
                  r="4.5"
                  fill="var(--crimson)"
                />
              ))}
              {[140, 172].map((y) => (
                <circle
                  key={`out-${y}`}
                  cx="274"
                  cy={y}
                  r="4.5"
                  fill="var(--surface)"
                  stroke="var(--crimson)"
                  strokeWidth="1.5"
                />
              ))}
              <text
                x="200"
                y="222"
                fill="var(--crimson)"
                fontSize="9"
                letterSpacing="0.4"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                MULTI-LAYERED NEURAL NETWORKS
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-14 max-w-4xl border-t border-[var(--crimson)]/40 pt-6">
            <div className={`${MICRO} text-[var(--crimson)]`}>
              Why it matters
            </div>
            <p className="mt-3 font-serif text-xl leading-[1.45] text-[var(--charcoal)] md:text-[1.625rem]">
              Deep learning works exceptionally well on complex data such as
              images, audio, and free-form text.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          07. PREDICTIVE vs GENERATIVE: one time axis. Predictive reads
          backwards from the present. Generative writes forward from it. The
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
          <h2 className="mt-5 max-w-4xl font-serif text-[2rem] font-semibold leading-[1.04] tracking-[-0.02em] text-[var(--charcoal)] md:text-[3rem]">
            Predictive AI Versus Generative AI
          </h2>
        </div>

        <div className="mt-10 grid w-full max-w-5xl gap-12 border-t border-[var(--charcoal)]/10 pt-8 md:grid-cols-2 md:gap-0">
          <div className="flex flex-col justify-between md:pr-12">
            <div>
              <div className={`${MICRO} text-[var(--charcoal-light)]/60`}>
                Predictive AI
              </div>
              <p className="mt-4 font-serif text-lg leading-[1.55] text-[var(--charcoal)] md:text-[1.3125rem]">
                Predictive AI analyzes past data to forecast future events,
                estimate numbers, or classify items into categories.
              </p>
              <p className="mt-4 font-serif text-base leading-[1.6] text-[var(--charcoal-light)] md:text-lg">
                Common predictive examples include credit risk scoring, fraud
                detection, and customer churn forecasting.
              </p>
            </div>

            <svg
              role="img"
              aria-label="Predictive AI reading a solid series of past data to project a forecast fan of future events."
              viewBox="0 0 400 128"
              className="mt-7 w-full"
              fill="none"
            >
              <title>
                Predictive AI reading a solid series of past data to project a
                forecast fan of future events.
              </title>
              <path
                d="M16 12V98H388"
                stroke="var(--charcoal)"
                strokeOpacity="0.22"
              />
              {/* Divider between past data and future events */}
              <path
                d="M220 12V98"
                stroke="var(--charcoal)"
                strokeOpacity="0.28"
                strokeDasharray="3 3"
              />
              {/* Past data trajectory */}
              <path
                d="M28 82L68 72L106 78L144 58L182 64L220 44"
                stroke="var(--charcoal)"
                strokeOpacity="0.7"
                strokeWidth="1.5"
              />
              {[
                [28, 82],
                [68, 72],
                [106, 78],
                [144, 58],
                [182, 64],
                [220, 44],
              ].map(([x, y]) => (
                <circle
                  key={`${x}-${y}`}
                  cx={x}
                  cy={y}
                  r="3"
                  fill="var(--charcoal)"
                  fillOpacity="0.65"
                />
              ))}
              {/* Forecast fan */}
              <path
                d="M220 44L372 18L372 64Z"
                fill="var(--crimson)"
                fillOpacity="0.08"
              />
              <path
                d="M220 44L372 18M220 44L372 64"
                stroke="var(--crimson)"
                strokeOpacity="0.35"
                strokeDasharray="3 3"
              />
              <path
                d="M220 44L372 38"
                stroke="var(--crimson)"
                strokeWidth="1.75"
                strokeDasharray="5 3"
              />
              <circle cx="372" cy="38" r="3.5" fill="var(--crimson)" />
              <text
                x="118"
                y="116"
                fill="var(--charcoal)"
                fillOpacity="0.55"
                fontSize="9"
                letterSpacing="0.4"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                PAST DATA
              </text>
              <text
                x="304"
                y="116"
                fill="var(--crimson)"
                fontSize="9"
                letterSpacing="0.4"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                FUTURE EVENTS
              </text>
            </svg>
          </div>

          <div className="flex flex-col justify-between md:border-l md:border-[var(--charcoal)]/12 md:pl-12">
            <div>
              <div className={`${MICRO} text-[var(--crimson)]`}>
                Generative AI
              </div>
              <p className="mt-4 font-serif text-lg leading-[1.55] text-[var(--charcoal)] md:text-[1.3125rem]">
                Generative AI creates new content such as text, images, audio,
                or computer code based on learned patterns.
              </p>
            </div>

            <svg
              role="img"
              aria-label="Generative AI transforming learned patterns into new content: text, images, audio, and computer code."
              viewBox="0 0 400 128"
              className="mt-7 w-full"
              fill="none"
            >
              <title>
                Generative AI transforming learned patterns into new content:
                text, images, audio, and computer code.
              </title>
              {/* Learned patterns block on the left */}
              <rect
                x="12"
                y="22"
                width="108"
                height="68"
                stroke="var(--charcoal)"
                strokeOpacity="0.32"
              />
              {[36, 66, 96].map((cx) =>
                [40, 56, 72].map((cy) => (
                  <circle
                    key={`${cx}-${cy}`}
                    cx={cx}
                    cy={cy}
                    r="2.5"
                    fill="var(--charcoal)"
                    fillOpacity="0.45"
                  />
                )),
              )}
              <path
                d="M36 40L66 56L96 40M36 72L66 56L96 72"
                stroke="var(--charcoal)"
                strokeOpacity="0.28"
              />
              <text
                x="66"
                y="116"
                fill="var(--charcoal)"
                fillOpacity="0.55"
                fontSize="9"
                letterSpacing="0.4"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                LEARNED PATTERNS
              </text>

              {/* Branching to new content */}
              <path
                d="M120 56H146M146 32V80M146 32H174M146 80H174"
                stroke="var(--crimson)"
                strokeWidth="1.25"
              />
              <path
                d="M166 27L174 32L166 37M166 75L174 80L166 85"
                stroke="var(--crimson)"
                strokeWidth="1.25"
              />

              {/* 2x2 grid of created new content */}
              {[
                { label: "TEXT", x: 174, y: 14, w: 102 },
                { label: "IMAGES", x: 284, y: 14, w: 108 },
                { label: "AUDIO", x: 174, y: 62, w: 102 },
                { label: "CODE", x: 284, y: 62, w: 108 },
              ].map((card) => (
                <g key={card.label}>
                  <rect
                    x={card.x}
                    y={card.y}
                    width={card.w}
                    height="36"
                    fill="var(--crimson)"
                    fillOpacity="0.05"
                    stroke="var(--crimson)"
                    strokeWidth="1.25"
                  />
                  <text
                    x={card.x + card.w / 2}
                    y={card.y + 22}
                    fill="var(--crimson)"
                    fontSize="9"
                    letterSpacing="0.4"
                    textAnchor="middle"
                    fontFamily="var(--font-serif), Georgia, serif"
                    fontWeight="600"
                  >
                    {card.label}
                  </text>
                </g>
              ))}
              <text
                x="283"
                y="116"
                fill="var(--crimson)"
                fontSize="9"
                letterSpacing="0.4"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                NEW CONTENT
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <div className="h-px w-full bg-[var(--charcoal)]/15" />
            <p className="mt-6 max-w-4xl font-serif text-[1.375rem] font-medium leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[1.875rem]">
              Most business value comes from combining predictive analysis with
              generative capabilities.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          08. CHATBOTS TO AGENTS: an ascending stair. Each tread steps
          right and down the page, autonomy rising with it. The last tread
          carries the warning and is the only one marked in crimson.
      ================================================================== */}
      <Slide id="chatbots-to-agents" border align="left">
        <div>
          <div className={`${MICRO} text-[var(--champagne)]`}>
            The autonomy staircase
          </div>
          <h2 className="mt-4 max-w-4xl font-serif text-[2rem] font-semibold leading-[1.04] tracking-[-0.02em] text-[var(--charcoal)] md:text-[2.75rem]">
            From Chatbots to Autonomous Agents
          </h2>
        </div>

        <div className="mt-6 grid w-full max-w-5xl items-center gap-8 md:grid-cols-[1fr_minmax(0,24rem)] md:gap-12">
          <ol className="w-full">
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
            ].map((step) => (
              <li key={step.n} className="block">
                <div
                  className="border-t py-2.5"
                  style={{
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
                  <p className="mt-1 max-w-2xl font-serif text-base leading-[1.5] text-[var(--charcoal)] md:text-[1.0625rem]">
                    {step.line}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div>
            <svg
              role="img"
              aria-label="Comparison between chatbots answering one prompt at a time and agentic AI executing a multi-step loop of planning steps, querying databases, using software tools, and reviewing output inside safety boundaries."
              viewBox="0 0 400 284"
              className="w-full"
              fill="none"
            >
              <title>
                Comparison between chatbots answering one prompt at a time and
                agentic AI executing a multi-step loop of planning steps,
                querying databases, using software tools, and reviewing output
                inside safety boundaries.
              </title>
              {/* Top: Chatbots: one prompt at a time */}
              <text
                x="12"
                y="18"
                fill="var(--charcoal)"
                fillOpacity="0.55"
                fontSize="9"
                letterSpacing="0.4"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                ONE PROMPT AT A TIME
              </text>
              <rect
                x="12"
                y="28"
                width="104"
                height="34"
                stroke="var(--charcoal)"
                strokeOpacity="0.32"
              />
              <text
                x="64"
                y="49"
                fill="var(--charcoal)"
                fillOpacity="0.65"
                fontSize="9"
                letterSpacing="0.4"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                PROMPT
              </text>
              <path
                d="M116 45H156"
                stroke="var(--charcoal)"
                strokeOpacity="0.4"
              />
              <path
                d="M148 40L156 45L148 50"
                stroke="var(--charcoal)"
                strokeOpacity="0.5"
              />
              <rect
                x="156"
                y="28"
                width="108"
                height="34"
                stroke="var(--charcoal)"
                strokeOpacity="0.4"
              />
              <text
                x="210"
                y="49"
                fill="var(--charcoal)"
                fillOpacity="0.7"
                fontSize="9"
                letterSpacing="0.4"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                CHATBOTS
              </text>
              <path
                d="M264 45H304"
                stroke="var(--charcoal)"
                strokeOpacity="0.4"
              />
              <path
                d="M296 40L304 45L296 50"
                stroke="var(--charcoal)"
                strokeOpacity="0.5"
              />
              <rect
                x="304"
                y="28"
                width="84"
                height="34"
                stroke="var(--charcoal)"
                strokeOpacity="0.32"
              />
              <text
                x="346"
                y="49"
                fill="var(--charcoal)"
                fillOpacity="0.65"
                fontSize="9"
                letterSpacing="0.4"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                OUTPUT
              </text>

              {/* Bottom: Agentic AI multi-step loop inside safety boundaries */}
              <rect
                x="12"
                y="84"
                width="376"
                height="192"
                stroke="var(--crimson)"
                strokeWidth="1.5"
                strokeDasharray="5 4"
              />
              <text
                x="26"
                y="104"
                fill="var(--crimson)"
                fontSize="9"
                letterSpacing="0.4"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                AGENTIC AI
              </text>
              <text
                x="374"
                y="104"
                fill="var(--crimson)"
                fontSize="9"
                letterSpacing="0.4"
                textAnchor="end"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                SAFETY BOUNDARIES
              </text>

              {/* 4 steps of the agent loop */}
              {[
                { label: "PLAN STEPS", x: 28, y: 120, w: 146 },
                { label: "QUERY DATABASES", x: 226, y: 120, w: 146 },
                { label: "REVIEW OUTPUT", x: 28, y: 204, w: 146 },
                { label: "SOFTWARE TOOLS", x: 226, y: 204, w: 146 },
              ].map((box) => (
                <g key={box.label}>
                  <rect
                    x={box.x}
                    y={box.y}
                    width={box.w}
                    height="44"
                    fill="var(--crimson)"
                    fillOpacity="0.04"
                    stroke="var(--crimson)"
                    strokeWidth="1.25"
                  />
                  <text
                    x={box.x + box.w / 2}
                    y={box.y + 26}
                    fill="var(--charcoal)"
                    fontSize="9"
                    letterSpacing="0.4"
                    textAnchor="middle"
                    fontFamily="var(--font-serif), Georgia, serif"
                    fontWeight="600"
                  >
                    {box.label}
                  </text>
                </g>
              ))}

              {/* Clockwise arrows connecting the 4 agent boxes */}
              {/* Top: PLAN STEPS -> QUERY DATABASES */}
              <path
                d="M174 142H226"
                stroke="var(--crimson)"
                strokeWidth="1.25"
              />
              <path
                d="M218 137L226 142L218 147"
                stroke="var(--crimson)"
                strokeWidth="1.25"
              />
              {/* Right: QUERY DATABASES -> SOFTWARE TOOLS */}
              <path
                d="M299 164V204"
                stroke="var(--crimson)"
                strokeWidth="1.25"
              />
              <path
                d="M294 196L299 204L304 196"
                stroke="var(--crimson)"
                strokeWidth="1.25"
              />
              {/* Bottom: SOFTWARE TOOLS -> REVIEW OUTPUT */}
              <path
                d="M226 226H174"
                stroke="var(--crimson)"
                strokeWidth="1.25"
              />
              <path
                d="M182 221L174 226L182 231"
                stroke="var(--crimson)"
                strokeWidth="1.25"
              />
              {/* Left: REVIEW OUTPUT -> PLAN STEPS */}
              <path
                d="M101 204V164"
                stroke="var(--crimson)"
                strokeWidth="1.25"
              />
              <path
                d="M96 172L101 164L106 172"
                stroke="var(--crimson)"
                strokeWidth="1.25"
              />
            </svg>
          </div>
        </div>

        <div className="w-full">
          <aside className="mt-5 max-w-4xl border border-[var(--charcoal)]/12 p-4 md:p-5">
            <div className={`${MICRO} text-[var(--champagne)]`}>Discussion</div>
            <p className="mt-1.5 font-serif text-base font-light italic leading-relaxed text-[var(--charcoal)] md:text-[1.1875rem]">
              Think of a multi-step task you do regularly. What risks might
              arise if an autonomous software agent did that task without your
              supervision?
            </p>
          </aside>
        </div>
      </Slide>

      {/* ==================================================================
          09. MODULE II
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
            <h2 className="font-serif text-[2.25rem] font-semibold leading-[1.02] tracking-[-0.025em] text-[var(--charcoal)] md:text-[3.75rem]">
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
          10. COST OF PREDICTION: a price curve falling toward zero, with
          the three cheapened inputs marked as stations along it. The chart
          carries the argument. The prose annotates the chart.
      ================================================================== */}
      <Slide id="cost-of-prediction" border align="left">
        <div>
          <div className={`${MICRO} text-[var(--champagne)]`}>
            A familiar economic pattern
          </div>
          <h2 className="mt-5 max-w-4xl font-serif text-[2rem] font-semibold leading-[1.04] tracking-[-0.02em] text-[var(--charcoal)] md:text-[3rem]">
            The Cost of Prediction Drops to Zero
          </h2>
          <p className="mt-7 max-w-3xl font-serif text-lg leading-[1.6] text-[var(--charcoal-light)] md:text-[1.3125rem]">
            In economics, technological breakthroughs often make a specific,
            valuable input cheap and abundant.
          </p>
        </div>

        <div className="mt-8 grid w-full max-w-5xl gap-8 border-t border-[var(--charcoal)]/10 pt-7 md:grid-cols-3 md:gap-10">
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
          <figure className="mt-7 w-full max-w-5xl">
            <svg
              role="img"
              aria-label="Three parallel cost curves showing computers making arithmetic cheap, the internet making information distribution cheap, and machine learning making prediction cheap."
              viewBox="0 0 800 148"
              className="w-full"
              fill="none"
            >
              <title>
                Three parallel cost curves showing computers making arithmetic
                cheap, the internet making information distribution cheap, and
                machine learning making prediction cheap.
              </title>
              {[
                {
                  x0: 4,
                  label: "ARITHMETIC",
                  now: false,
                },
                {
                  x0: 280,
                  label: "INFORMATION DISTRIBUTION",
                  now: false,
                },
                {
                  x0: 556,
                  label: "PREDICTION",
                  now: true,
                },
              ].map((panel, idx) => {
                const x1 = panel.x0 + 236;
                const stroke = panel.now ? "var(--crimson)" : "var(--charcoal)";
                return (
                  <g key={panel.label}>
                    <text
                      x={panel.x0}
                      y="16"
                      fill={panel.now ? "var(--crimson)" : "var(--charcoal)"}
                      fillOpacity={panel.now ? "1" : "0.55"}
                      fontSize="9"
                      letterSpacing="0.4"
                      fontFamily="var(--font-serif), Georgia, serif"
                      fontWeight="600"
                    >
                      {panel.label}
                    </text>
                    <path
                      d={`M${panel.x0} 26V124H${x1}`}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.22"
                    />
                    {idx === 0 && (
                      <>
                        <text
                          x={panel.x0 + 10}
                          y="40"
                          fill="var(--charcoal)"
                          fillOpacity="0.45"
                          fontSize="9"
                          letterSpacing="0.4"
                          fontFamily="var(--font-serif), Georgia, serif"
                          fontWeight="600"
                        >
                          COST
                        </text>
                        <text
                          x={panel.x0 + 10}
                          y="116"
                          fill="var(--charcoal)"
                          fillOpacity="0.45"
                          fontSize="9"
                          letterSpacing="0.4"
                          fontFamily="var(--font-serif), Georgia, serif"
                          fontWeight="600"
                        >
                          CHEAP
                        </text>
                      </>
                    )}
                    <path
                      d={`M${panel.x0 + 10} 48 C ${panel.x0 + 64} 52, ${
                        panel.x0 + 104
                      } 112, ${x1 - 8} 120`}
                      stroke={stroke}
                      strokeOpacity={panel.now ? "1" : "0.5"}
                      strokeWidth={panel.now ? "1.75" : "1.25"}
                    />
                    <circle
                      cx={x1 - 8}
                      cy="120"
                      r={panel.now ? "3.5" : "3"}
                      fill={stroke}
                      fillOpacity={panel.now ? "1" : "0.5"}
                    />
                  </g>
                );
              })}
            </svg>
          </figure>
        </div>

        <div className="w-full">
          <p className="mt-10 max-w-4xl font-serif text-[1.375rem] font-medium leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[1.875rem]">
            When prediction becomes cheap, companies start applying it to
            problems that were never treated as prediction tasks before.
          </p>
        </div>
      </Slide>

      {/* ==================================================================
          11. PREDICTION vs JUDGMENT: a balance beam. The machine pan sinks
          as prediction gets cheap. The human pan rises, which is precisely
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
          <h2 className="mt-5 max-w-4xl font-serif text-[2rem] font-semibold leading-[1.04] tracking-[-0.02em] text-[var(--charcoal)] md:text-[3rem]">
            Prediction Versus Judgment
          </h2>
        </div>

        <div className="mt-8 grid w-full max-w-5xl gap-10 border-t border-[var(--charcoal)]/10 pt-7 md:grid-cols-2 md:gap-0">
          <div className="md:pr-12">
            <div className={`${MICRO} text-[var(--charcoal-light)]/55`}>
              Prediction
            </div>
            <p className="mt-3 font-serif text-lg leading-[1.55] text-[var(--charcoal)] md:text-[1.3125rem]">
              A prediction is an estimate of what is likely to happen when
              information is incomplete.
            </p>
          </div>
          <div className="md:border-l md:border-[var(--charcoal)]/12 md:pl-12">
            <div className={`${MICRO} text-[var(--crimson)]`}>Judgment</div>
            <p className="mt-3 font-serif text-lg leading-[1.55] text-[var(--charcoal)] md:text-[1.3125rem]">
              A judgment is an evaluation of what outcome matters most, what is
              fair, and what risk is acceptable.
            </p>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-8 max-w-4xl border-l border-[var(--charcoal)]/25 pl-6">
            <div className={`${MICRO} text-[var(--charcoal-light)]/50`}>
              The limit
            </div>
            <p className="mt-2 font-serif text-lg leading-[1.55] text-[var(--charcoal-light)] md:text-[1.1875rem]">
              Machines handle prediction at scale, but they do not possess moral
              principles, business ethics, or context.
            </p>
          </div>
        </div>

        <div className="w-full">
          <p className="mt-8 max-w-4xl font-serif text-[1.375rem] font-medium leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[1.875rem]">
            As machine prediction becomes cheaper and faster, the economic value
            of human judgment goes up.
          </p>

          <figure className="mt-6 w-full max-w-5xl">
            <svg
              role="img"
              aria-label="Prediction estimating what is likely to happen before human judgment evaluates what is fair and acceptable, while falling machine prediction cost drives the economic value of human judgment up."
              viewBox="0 0 800 132"
              className="w-full"
              fill="none"
            >
              <title>
                Prediction estimating what is likely to happen before human
                judgment evaluates what is fair and acceptable, while falling
                machine prediction cost drives the economic value of human
                judgment up.
              </title>
              {/* Left panel: Prediction -> Judgment handoff */}
              <rect
                x="8"
                y="24"
                width="164"
                height="84"
                stroke="var(--charcoal)"
                strokeOpacity="0.32"
              />
              <text
                x="90"
                y="54"
                fill="var(--charcoal)"
                fillOpacity="0.65"
                fontSize="10"
                letterSpacing="0.4"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                PREDICTION
              </text>
              <text
                x="90"
                y="76"
                fill="var(--charcoal)"
                fillOpacity="0.5"
                fontSize="8.5"
                letterSpacing="1.8"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                WHAT IS LIKELY
              </text>

              <path
                d="M172 66H216"
                stroke="var(--crimson)"
                strokeWidth="1.25"
              />
              <path
                d="M208 61L216 66L208 71"
                stroke="var(--crimson)"
                strokeWidth="1.25"
              />

              <rect
                x="216"
                y="24"
                width="172"
                height="84"
                fill="var(--crimson)"
                fillOpacity="0.05"
                stroke="var(--crimson)"
                strokeWidth="1.5"
              />
              <text
                x="302"
                y="54"
                fill="var(--crimson)"
                fontSize="10"
                letterSpacing="0.4"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                JUDGMENT
              </text>
              <text
                x="302"
                y="76"
                fill="var(--crimson)"
                fontSize="8.5"
                letterSpacing="1.8"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                WHAT IS FAIR
              </text>

              {/* Right panel: Diverging curves (prediction cost down, judgment value up) */}
              <path
                d="M436 16V116H788"
                stroke="var(--charcoal)"
                strokeOpacity="0.22"
              />
              {/* Falling curve: machine prediction cost */}
              <path
                d="M448 34 C 488 38, 512 106, 776 106"
                stroke="var(--charcoal)"
                strokeOpacity="0.45"
                strokeWidth="1.25"
                strokeDasharray="4 3"
              />
              <circle
                cx="776"
                cy="106"
                r="3"
                fill="var(--charcoal)"
                fillOpacity="0.5"
              />
              <text
                x="764"
                y="88"
                fill="var(--charcoal)"
                fillOpacity="0.55"
                fontSize="9"
                letterSpacing="0.4"
                textAnchor="end"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                MACHINE PREDICTION ↓
              </text>

              {/* Rising curve: economic value of human judgment */}
              <path
                d="M448 102 C 528 96, 612 38, 776 26"
                stroke="var(--crimson)"
                strokeWidth="1.75"
              />
              <circle cx="776" cy="26" r="3.5" fill="var(--crimson)" />
              <text
                x="764"
                y="20"
                fill="var(--crimson)"
                fontSize="9"
                letterSpacing="0.4"
                textAnchor="end"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                VALUE OF HUMAN JUDGMENT ↑
              </text>
            </svg>
          </figure>
        </div>
      </Slide>

      {/* ==================================================================
          12. THREE SOURCES OF VALUE: a triptych under one bracket. Three
          equal columns, display numerals, and a rule that closes them into
          a single mandate at the foot.
      ================================================================== */}
      <Slide id="three-sources-of-value" border align="left">
        <div>
          <div className={`${MICRO} text-[var(--champagne)]`}>
            Where the money is
          </div>
          <h2 className="mt-5 max-w-4xl font-serif text-[2rem] font-semibold leading-[1.04] tracking-[-0.02em] text-[var(--charcoal)] md:text-[3rem]">
            The Three Sources of Business Value
          </h2>
        </div>

        <div className="mt-10 grid w-full max-w-5xl gap-10 md:grid-cols-3 md:gap-0">
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
            <div
              key={col.n}
              className={
                i === 0
                  ? "md:pr-10"
                  : "md:border-l md:border-[var(--charcoal)]/12 md:px-10"
              }
            >
              <div className="font-serif text-[2.75rem] font-black leading-none tracking-[-0.04em] text-[var(--charcoal)]/12 md:text-[3.5rem]">
                {col.n}
              </div>
              <div className={`${MICRO} mt-4 text-[var(--champagne)]`}>
                {col.tag}
              </div>
              <p className="mt-3 font-serif text-base leading-[1.6] text-[var(--charcoal)] md:text-[1.0625rem]">
                {col.line}
              </p>
            </div>
          ))}
        </div>

        <div className="w-full">
          <div className="mt-8 w-full max-w-5xl">
            <figure className="w-full">
              <svg
                role="img"
                aria-label="Three panels showing cost reduction dropping operating costs, revenue growth lifting sales, and risk management capping exposure, united under one crimson bracket for all three areas."
                viewBox="0 0 800 132"
                className="w-full"
                fill="none"
              >
                <title>
                  Three panels showing cost reduction dropping operating costs,
                  revenue growth lifting sales, and risk management capping
                  exposure, united under one crimson bracket for all three
                  areas.
                </title>
                {/* 01 Cost reduction: step down */}
                <path
                  d="M4 14V88H236"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.22"
                />
                <rect
                  x="28"
                  y="28"
                  width="56"
                  height="60"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.35"
                  strokeDasharray="3 3"
                />
                <rect
                  x="136"
                  y="56"
                  width="56"
                  height="32"
                  fill="var(--charcoal)"
                  fillOpacity="0.08"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.65"
                />
                <path
                  d="M84 36H164V56"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.5"
                />
                <path
                  d="M159 48L164 56L169 48"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.6"
                />
                <text
                  x="120"
                  y="18"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                  fontSize="9"
                  letterSpacing="0.4"
                  textAnchor="middle"
                  fontFamily="var(--font-serif), Georgia, serif"
                  fontWeight="600"
                >
                  COST REDUCTION ↓
                </text>

                {/* 02 Revenue growth: ascending steps */}
                <path
                  d="M282 14V88H514"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.22"
                />
                {[
                  { x: 306, y: 62, h: 26 },
                  { x: 374, y: 46, h: 42 },
                  { x: 442, y: 28, h: 60 },
                ].map((b, idx) => (
                  <rect
                    key={idx}
                    x={b.x}
                    y={b.y}
                    width="44"
                    height={b.h}
                    fill="var(--charcoal)"
                    fillOpacity="0.08"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.65"
                  />
                ))}
                <text
                  x="398"
                  y="18"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                  fontSize="9"
                  letterSpacing="0.4"
                  textAnchor="middle"
                  fontFamily="var(--font-serif), Georgia, serif"
                  fontWeight="600"
                >
                  REVENUE GROWTH ↑
                </text>

                {/* 03 Risk management: spikes caught at threshold */}
                <path
                  d="M560 14V88H792"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.22"
                />
                <path
                  d="M560 44H792"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.4"
                  strokeDasharray="3 3"
                />
                <path
                  d="M572 74L604 72L624 44L644 74L684 70L704 44L724 72L776 72"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.65"
                  strokeWidth="1.25"
                />
                <circle cx="624" cy="44" r="3" fill="var(--charcoal)" />
                <circle cx="704" cy="44" r="3" fill="var(--charcoal)" />
                <text
                  x="676"
                  y="18"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                  fontSize="9"
                  letterSpacing="0.4"
                  textAnchor="middle"
                  fontFamily="var(--font-serif), Georgia, serif"
                  fontWeight="600"
                >
                  RISK MANAGEMENT
                </text>

                {/* Unifying crimson bracket: target all three areas */}
                <path
                  d="M4 98V108H792V98"
                  stroke="var(--crimson)"
                  strokeWidth="1.5"
                />
                <text
                  x="398"
                  y="124"
                  fill="var(--crimson)"
                  fontSize="9"
                  letterSpacing="0.4"
                  textAnchor="middle"
                  fontFamily="var(--font-serif), Georgia, serif"
                  fontWeight="600"
                >
                  TARGET ALL THREE AREAS
                </text>
              </svg>
            </figure>
            <p className="mt-6 max-w-4xl font-serif text-xl font-medium leading-[1.4] text-[var(--charcoal)] md:text-[1.625rem]">
              Successful firms{" "}
              <span className="text-[var(--crimson)]">
                target all three areas
              </span>{" "}
              instead of focusing on headcount reduction alone.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          13. PLUG AND PLAY: commoditisation shown as repetition: nine
          identical tiles anyone can buy, and one tile that is yours. The
          grid is the argument.
      ================================================================== */}
      <Slide id="plug-and-play" border align="left">
        <div>
          <div className={`${MICRO} text-[var(--champagne)]`}>
            The commoditisation trap
          </div>
          <h2 className="mt-4 max-w-4xl font-serif text-[2rem] font-semibold leading-[1.04] tracking-[-0.02em] text-[var(--charcoal)] md:text-[2.875rem]">
            The Fallacy of Plug and Play
          </h2>
          <p className="mt-6 max-w-4xl font-serif text-[1.375rem] font-medium leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[1.75rem]">
            Buying an off-the-shelf AI tool does not guarantee a lasting
            competitive edge.
          </p>
        </div>

        <div className="mt-8 grid w-full max-w-5xl gap-10 border-t border-[var(--charcoal)]/10 pt-7 md:grid-cols-2 md:gap-0">
          <div className="flex flex-col justify-between md:pr-12">
            <div>
              <div className={`${MICRO} text-[var(--charcoal-light)]/50`}>
                Public models and subscriptions
              </div>
              <p className="mt-3 font-serif text-lg leading-[1.55] text-[var(--charcoal-light)] md:text-[1.25rem]">
                Anyone can purchase the same public models and software
                subscriptions.
              </p>
            </div>
            <svg
              role="img"
              aria-label="Three identical public model subscription boxes available to anyone, offering no differentiation."
              viewBox="0 0 400 112"
              className="mt-6 w-full"
              fill="none"
            >
              <title>
                Three identical public model subscription boxes available to
                anyone, offering no differentiation.
              </title>
              {[12, 146, 280].map((x) => (
                <g key={x}>
                  <rect
                    x={x}
                    y="16"
                    width="108"
                    height="64"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.32"
                  />
                  <text
                    x={x + 54}
                    y="44"
                    fill="var(--charcoal)"
                    fillOpacity="0.55"
                    fontSize="8.5"
                    letterSpacing="2"
                    textAnchor="middle"
                    fontFamily="var(--font-serif), Georgia, serif"
                    fontWeight="600"
                  >
                    PUBLIC
                  </text>
                  <text
                    x={x + 54}
                    y="58"
                    fill="var(--charcoal)"
                    fillOpacity="0.55"
                    fontSize="8.5"
                    letterSpacing="2"
                    textAnchor="middle"
                    fontFamily="var(--font-serif), Georgia, serif"
                    fontWeight="600"
                  >
                    MODELS
                  </text>
                </g>
              ))}
              <text
                x="200"
                y="102"
                fill="var(--charcoal)"
                fillOpacity="0.5"
                fontSize="9"
                letterSpacing="0.4"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                SOFTWARE SUBSCRIPTIONS
              </text>
            </svg>
          </div>

          <div className="flex flex-col justify-between md:border-l md:border-[var(--charcoal)]/12 md:pl-12">
            <div>
              <div className={`${MICRO} text-[var(--crimson)]`}>
                Unique workflows and proprietary data
              </div>
              <p className="mt-3 font-serif text-lg leading-[1.55] text-[var(--charcoal)] md:text-[1.25rem]">
                Real business advantage comes from connecting AI directly to
                unique business workflows and high-quality proprietary data.
              </p>
            </div>
            <svg
              role="img"
              aria-label="AI connected directly to proprietary data and unique workflows to create real business advantage."
              viewBox="0 0 400 112"
              className="mt-6 w-full"
              fill="none"
            >
              <title>
                AI connected directly to proprietary data and unique workflows
                to create real business advantage.
              </title>
              {/* Left: Proprietary data */}
              <rect
                x="8"
                y="16"
                width="124"
                height="64"
                fill="var(--crimson)"
                fillOpacity="0.04"
                stroke="var(--crimson)"
                strokeWidth="1.25"
              />
              <text
                x="70"
                y="44"
                fill="var(--crimson)"
                fontSize="8.5"
                letterSpacing="2"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                PROPRIETARY
              </text>
              <text
                x="70"
                y="58"
                fill="var(--crimson)"
                fontSize="8.5"
                letterSpacing="2"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                DATA
              </text>

              <path
                d="M132 48H164"
                stroke="var(--crimson)"
                strokeWidth="1.25"
              />
              <path
                d="M156 43L164 48L156 53"
                stroke="var(--crimson)"
                strokeWidth="1.25"
              />

              {/* Center: AI */}
              <rect
                x="164"
                y="24"
                width="72"
                height="48"
                fill="var(--crimson)"
                fillOpacity="0.08"
                stroke="var(--crimson)"
                strokeWidth="1.5"
              />
              <text
                x="200"
                y="52"
                fill="var(--crimson)"
                fontSize="10"
                letterSpacing="0.4"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                AI
              </text>

              <path
                d="M236 48H268"
                stroke="var(--crimson)"
                strokeWidth="1.25"
              />
              <path
                d="M260 43L268 48L260 53"
                stroke="var(--crimson)"
                strokeWidth="1.25"
              />

              {/* Right: Unique workflows */}
              <rect
                x="268"
                y="16"
                width="124"
                height="64"
                fill="var(--crimson)"
                fillOpacity="0.04"
                stroke="var(--crimson)"
                strokeWidth="1.25"
              />
              <text
                x="330"
                y="44"
                fill="var(--crimson)"
                fontSize="8.5"
                letterSpacing="2"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                UNIQUE
              </text>
              <text
                x="330"
                y="58"
                fill="var(--crimson)"
                fontSize="8.5"
                letterSpacing="2"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                WORKFLOWS
              </text>

              <text
                x="200"
                y="102"
                fill="var(--crimson)"
                fontSize="9"
                letterSpacing="0.4"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                REAL BUSINESS ADVANTAGE
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <aside className="mt-8 max-w-3xl border border-[var(--charcoal)]/12 p-6 md:p-7">
            <div className={`${MICRO} text-[var(--champagne)]`}>Discussion</div>
            <p className="mt-3 font-serif text-lg font-light italic leading-relaxed text-[var(--charcoal)] md:text-[1.25rem]">
              If every firm in your industry uses the same commercial AI models,
              where will your competitive advantage come from?
            </p>
          </aside>
        </div>
      </Slide>

      {/* ==================================================================
          14. MODULE III
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
            <h2 className="font-serif text-[2.25rem] font-semibold leading-[1.02] tracking-[-0.025em] text-[var(--charcoal)] md:text-[3.75rem]">
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
          15. FRONT OFFICE: the customer side of the counter. Content sits
          to the right of a heavy vertical rule standing in for the shop
          window. Each team is a pane in it.                          [quiz]
      ================================================================== */}
      <Slide
        id="front-office"
        border
        align="left"
        quizData={quiz["front-office"]}
      >
        <div>
          <div className={`${MICRO} text-[var(--crimson)]`}>
            Front office | the customer sees this
          </div>
          <h2 className="mt-5 max-w-4xl font-serif text-[1.875rem] font-semibold leading-[1.05] tracking-[-0.02em] text-[var(--charcoal)] md:text-[2.875rem]">
            Front-Office Applications: Customer Engagement
          </h2>
        </div>

        <div className="mt-10 grid w-full max-w-5xl items-center gap-10 border-l-2 border-[var(--crimson)]/70 pl-7 md:grid-cols-[1fr_minmax(0,23rem)] md:gap-12 md:pl-10">
          <div>
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
                  className={`py-5 ${
                    i > 0 ? "border-t border-[var(--charcoal)]/8" : "pt-0"
                  }`}
                >
                  <div className={`${MICRO} text-[var(--champagne)]`}>
                    {pane.tag}
                  </div>
                  <p className="mt-2.5 max-w-2xl font-serif text-lg leading-[1.55] text-[var(--charcoal)] md:text-[1.25rem]">
                    {pane.line}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <svg
              role="img"
              aria-label="Front-office customer engagement workflows: answering common questions or routing complex issues to human agents, segmenting audiences for promotional messages, and recommendation engines suggesting products."
              viewBox="0 0 400 244"
              className="w-full"
              fill="none"
            >
              <title>
                Front-office customer engagement workflows: answering common
                questions or routing complex issues to human agents, segmenting
                audiences for promotional messages, and recommendation engines
                suggesting products.
              </title>
              {/* Lane 1: Customer service teams */}
              <rect
                x="8"
                y="12"
                width="148"
                height="28"
                stroke="var(--charcoal)"
                strokeOpacity="0.32"
              />
              <text
                x="82"
                y="30"
                fill="var(--charcoal)"
                fillOpacity="0.65"
                fontSize="8.5"
                letterSpacing="1.8"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                COMMON QUESTIONS
              </text>
              <path
                d="M156 26H216"
                stroke="var(--crimson)"
                strokeWidth="1.25"
              />
              <path
                d="M208 21L216 26L208 31"
                stroke="var(--crimson)"
                strokeWidth="1.25"
              />
              <rect
                x="216"
                y="12"
                width="176"
                height="28"
                fill="var(--crimson)"
                fillOpacity="0.05"
                stroke="var(--crimson)"
                strokeWidth="1.25"
              />
              <text
                x="304"
                y="30"
                fill="var(--crimson)"
                fontSize="8.5"
                letterSpacing="1.8"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                AI: ANSWER
              </text>

              <rect
                x="8"
                y="48"
                width="148"
                height="28"
                stroke="var(--charcoal)"
                strokeOpacity="0.32"
              />
              <text
                x="82"
                y="66"
                fill="var(--charcoal)"
                fillOpacity="0.65"
                fontSize="8.5"
                letterSpacing="1.8"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                COMPLEX ISSUES
              </text>
              <path
                d="M156 62H216"
                stroke="var(--charcoal)"
                strokeOpacity="0.45"
              />
              <path
                d="M208 57L216 62L208 67"
                stroke="var(--charcoal)"
                strokeOpacity="0.55"
              />
              <rect
                x="216"
                y="48"
                width="176"
                height="28"
                stroke="var(--charcoal)"
                strokeOpacity="0.35"
              />
              <text
                x="304"
                y="66"
                fill="var(--charcoal)"
                fillOpacity="0.65"
                fontSize="8.5"
                letterSpacing="1.8"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                HUMAN AGENTS
              </text>

              <path
                d="M8 92H392"
                stroke="var(--charcoal)"
                strokeOpacity="0.12"
              />

              {/* Lane 2: Marketing teams */}
              <rect
                x="8"
                y="108"
                width="148"
                height="34"
                stroke="var(--charcoal)"
                strokeOpacity="0.32"
              />
              <text
                x="82"
                y="129"
                fill="var(--charcoal)"
                fillOpacity="0.65"
                fontSize="8.5"
                letterSpacing="1.8"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                SEGMENT AUDIENCES
              </text>
              <path
                d="M156 125H216"
                stroke="var(--crimson)"
                strokeWidth="1.25"
              />
              <path
                d="M208 120L216 125L208 130"
                stroke="var(--crimson)"
                strokeWidth="1.25"
              />
              <rect
                x="216"
                y="108"
                width="176"
                height="34"
                fill="var(--crimson)"
                fillOpacity="0.05"
                stroke="var(--crimson)"
                strokeWidth="1.25"
              />
              <text
                x="304"
                y="129"
                fill="var(--crimson)"
                fontSize="8.5"
                letterSpacing="1.8"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                PROMOTIONAL MESSAGES
              </text>

              <path
                d="M8 158H392"
                stroke="var(--charcoal)"
                strokeOpacity="0.12"
              />

              {/* Lane 3: E-commerce platforms */}
              <rect
                x="8"
                y="174"
                width="148"
                height="34"
                stroke="var(--charcoal)"
                strokeOpacity="0.32"
              />
              <text
                x="82"
                y="195"
                fill="var(--charcoal)"
                fillOpacity="0.65"
                fontSize="8.5"
                letterSpacing="1.8"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                SHOPPER INTERESTS
              </text>
              <path
                d="M156 191H216"
                stroke="var(--crimson)"
                strokeWidth="1.25"
              />
              <path
                d="M208 186L216 191L208 196"
                stroke="var(--crimson)"
                strokeWidth="1.25"
              />
              <rect
                x="216"
                y="174"
                width="176"
                height="34"
                fill="var(--crimson)"
                fillOpacity="0.05"
                stroke="var(--crimson)"
                strokeWidth="1.25"
              />
              <text
                x="304"
                y="195"
                fill="var(--crimson)"
                fontSize="8.5"
                letterSpacing="1.8"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                SUGGEST PRODUCTS
              </text>

              <text
                x="200"
                y="234"
                fill="var(--crimson)"
                fontSize="9"
                letterSpacing="0.4"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                REDUCING CUSTOMER FRICTION
              </text>
            </svg>
          </div>
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
          16. BACK OFFICE: deliberately the mirror of slide 15: the rule
          moves to the right edge, the labels align right, the palette drops
          to ink. Nobody outside the firm sees this work.
      ================================================================== */}
      <Slide id="back-office" border align="left">
        <div>
          <div className={`${MICRO} text-[var(--champagne)]`}>
            Back office | internal workflows
          </div>
          <h2 className="mt-5 max-w-4xl font-serif text-[1.875rem] font-semibold leading-[1.05] tracking-[-0.02em] text-[var(--charcoal)] md:text-[2.875rem]">
            Back-Office Applications: Operations and Finance
          </h2>
        </div>

        <div className="mt-10 grid w-full max-w-5xl items-center gap-10 border-l border-[var(--charcoal)]/25 pl-7 md:grid-cols-[1fr_minmax(0,24rem)] md:gap-12 md:pl-10">
          <div>
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
                  className={`py-5 ${
                    i > 0 ? "border-t border-[var(--charcoal)]/8" : "pt-0"
                  }`}
                >
                  <div className={`${MICRO} text-[var(--champagne)]`}>
                    {row.tag}
                  </div>
                  <p className="mt-2.5 max-w-2xl font-serif text-lg leading-[1.55] text-[var(--charcoal)] md:text-[1.25rem]">
                    {row.line}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <svg
              role="img"
              aria-label="Back-office internal workflows across operations, finance, and human resources converging to cut operating costs."
              viewBox="0 0 400 244"
              className="w-full"
              fill="none"
            >
              <title>
                Back-office internal workflows across operations, finance, and
                human resources converging to cut operating costs.
              </title>
              {[
                {
                  team: "OPERATIONS TEAMS",
                  y: 12,
                  tasks: [
                    "FORECAST DEMAND",
                    "PREVENT BREAKDOWNS",
                    "DELIVERY ROUTES",
                  ],
                },
                {
                  team: "FINANCE TEAMS",
                  y: 78,
                  tasks: ["SCORE LOANS", "DETECT FRAUD", "RECONCILE RECORDS"],
                },
                {
                  team: "HUMAN RESOURCES TEAMS",
                  y: 144,
                  tasks: [
                    "JOB DESCRIPTIONS",
                    "SORT RESUMES",
                    "TRAINING PROGRAMS",
                  ],
                },
              ].map((unit) => (
                <g key={unit.team}>
                  <text
                    x="8"
                    y={unit.y + 10}
                    fill="var(--charcoal)"
                    fillOpacity="0.55"
                    fontSize="8.5"
                    letterSpacing="2"
                    fontFamily="var(--font-serif), Georgia, serif"
                    fontWeight="600"
                  >
                    {unit.team}
                  </text>
                  {unit.tasks.map((task, idx) => {
                    const x = 8 + idx * 130;
                    return (
                      <g key={task}>
                        <rect
                          x={x}
                          y={unit.y + 18}
                          width="124"
                          height="32"
                          stroke="var(--charcoal)"
                          strokeOpacity="0.32"
                        />
                        {idx < 2 && (
                          <path
                            d={`M${x + 124} ${unit.y + 34}H${x + 130}`}
                            stroke="var(--charcoal)"
                            strokeOpacity="0.35"
                          />
                        )}
                        <text
                          x={x + 62}
                          y={unit.y + 37}
                          fill="var(--charcoal)"
                          fillOpacity="0.7"
                          fontSize="7.5"
                          letterSpacing="1.4"
                          textAnchor="middle"
                          fontFamily="var(--font-serif), Georgia, serif"
                          fontWeight="600"
                        >
                          {task}
                        </text>
                      </g>
                    );
                  })}
                </g>
              ))}

              {/* Unifying crimson bracket at the bottom */}
              <path
                d="M8 206V216H392V206"
                stroke="var(--crimson)"
                strokeWidth="1.5"
              />
              <text
                x="200"
                y="234"
                fill="var(--crimson)"
                fontSize="9"
                letterSpacing="0.4"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                CUTS OPERATING COSTS
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-10 max-w-4xl border-t border-[var(--crimson)]/40 pt-6">
            <p className="font-serif text-[1.375rem] font-medium leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[1.875rem]">
              Back-office automation{" "}
              <span className="text-[var(--crimson)]">
                cuts operating costs
              </span>{" "}
              and speeds up internal workflows.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          17. HUMAN IN THE LOOP: one continuous stakes gauge. The two
          definitions sit above it. The two regimes are placed on the arc at
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
          <h2 className="mt-4 max-w-4xl font-serif text-[2rem] font-semibold leading-[1.04] tracking-[-0.02em] text-[var(--charcoal)] md:text-[2.875rem]">
            Human in the Loop Versus Full Autonomy
          </h2>
        </div>

        <div className="mt-8 grid w-full max-w-5xl gap-10 border-t border-[var(--charcoal)]/10 pt-7 md:grid-cols-2 md:gap-0">
          <div className="flex flex-col justify-between md:pr-12">
            <div>
              <div className={`${MICRO} text-[var(--charcoal-light)]/55`}>
                Full autonomy
              </div>
              <p className="mt-3 font-serif text-lg leading-[1.55] text-[var(--charcoal)] md:text-[1.25rem]">
                Full autonomy means the computer makes the decision and takes
                action without waiting for human approval.
              </p>
              <p className="mt-3 font-serif text-base leading-[1.6] text-[var(--charcoal-light)] md:text-[1.0625rem]">
                Low-stakes decisions with low cost of error can be automated
                safely, such as product recommendations.
              </p>
            </div>
            <svg
              role="img"
              aria-label="Full autonomy pipeline where the computer makes the decision and takes action directly for low-stakes decisions with low cost of error."
              viewBox="0 0 400 104"
              className="mt-6 w-full"
              fill="none"
            >
              <title>
                Full autonomy pipeline where the computer makes the decision and
                takes action directly for low-stakes decisions with low cost of
                error.
              </title>
              <rect
                x="8"
                y="18"
                width="108"
                height="48"
                stroke="var(--charcoal)"
                strokeOpacity="0.35"
              />
              <text
                x="62"
                y="46"
                fill="var(--charcoal)"
                fillOpacity="0.65"
                fontSize="8.5"
                letterSpacing="2"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                COMPUTER
              </text>
              <path
                d="M116 42H148"
                stroke="var(--charcoal)"
                strokeOpacity="0.4"
              />
              <path
                d="M140 37L148 42L140 47"
                stroke="var(--charcoal)"
                strokeOpacity="0.5"
              />

              <rect
                x="148"
                y="18"
                width="104"
                height="48"
                stroke="var(--charcoal)"
                strokeOpacity="0.35"
              />
              <text
                x="200"
                y="46"
                fill="var(--charcoal)"
                fillOpacity="0.65"
                fontSize="8.5"
                letterSpacing="2"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                DECISION
              </text>
              <path
                d="M252 42H284"
                stroke="var(--charcoal)"
                strokeOpacity="0.4"
              />
              <path
                d="M276 37L284 42L276 47"
                stroke="var(--charcoal)"
                strokeOpacity="0.5"
              />

              <rect
                x="284"
                y="18"
                width="108"
                height="48"
                stroke="var(--charcoal)"
                strokeOpacity="0.35"
              />
              <text
                x="338"
                y="40"
                fill="var(--charcoal)"
                fillOpacity="0.65"
                fontSize="8.5"
                letterSpacing="2"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                TAKES
              </text>
              <text
                x="338"
                y="54"
                fill="var(--charcoal)"
                fillOpacity="0.65"
                fontSize="8.5"
                letterSpacing="2"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                ACTION
              </text>

              <text
                x="200"
                y="92"
                fill="var(--charcoal)"
                fillOpacity="0.55"
                fontSize="9"
                letterSpacing="0.4"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                LOW COST OF ERROR
              </text>
            </svg>
          </div>

          <div className="flex flex-col justify-between md:border-l md:border-[var(--charcoal)]/12 md:pl-12">
            <div>
              <div className={`${MICRO} text-[var(--crimson)]`}>
                Human-in-the-loop
              </div>
              <p className="mt-3 font-serif text-lg leading-[1.55] text-[var(--charcoal)] md:text-[1.25rem]">
                Human-in-the-loop means a person must review and approve the
                machine recommendation before it takes effect.
              </p>
              <p className="mt-3 font-serif text-base leading-[1.6] text-[var(--charcoal-light)] md:text-[1.0625rem]">
                High-stakes decisions that affect jobs, credit, health, or legal
                liability require human sign-off and review.
              </p>
            </div>
            <svg
              role="img"
              aria-label="Human-in-the-loop pipeline where a machine recommendation must pass through a crimson human sign-off and review checkpoint before it takes effect."
              viewBox="0 0 400 104"
              className="mt-6 w-full"
              fill="none"
            >
              <title>
                Human-in-the-loop pipeline where a machine recommendation must
                pass through a crimson human sign-off and review checkpoint
                before it takes effect.
              </title>
              <rect
                x="8"
                y="18"
                width="108"
                height="48"
                stroke="var(--charcoal)"
                strokeOpacity="0.35"
              />
              <text
                x="62"
                y="40"
                fill="var(--charcoal)"
                fillOpacity="0.65"
                fontSize="8.5"
                letterSpacing="1.8"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                MACHINE
              </text>
              <text
                x="62"
                y="54"
                fill="var(--charcoal)"
                fillOpacity="0.65"
                fontSize="7.5"
                letterSpacing="1.2"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                RECOMMENDATION
              </text>

              <path
                d="M116 42H142"
                stroke="var(--crimson)"
                strokeWidth="1.25"
              />
              <path
                d="M134 37L142 42L134 47"
                stroke="var(--crimson)"
                strokeWidth="1.25"
              />

              {/* Human sign-off gate */}
              <rect
                x="142"
                y="14"
                width="116"
                height="56"
                fill="var(--crimson)"
                fillOpacity="0.06"
                stroke="var(--crimson)"
                strokeWidth="1.5"
              />
              <text
                x="200"
                y="38"
                fill="var(--crimson)"
                fontSize="8.5"
                letterSpacing="1.8"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                HUMAN SIGN-OFF
              </text>
              <text
                x="200"
                y="52"
                fill="var(--crimson)"
                fontSize="8.5"
                letterSpacing="1.8"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                AND REVIEW
              </text>

              <path
                d="M258 42H284"
                stroke="var(--crimson)"
                strokeWidth="1.25"
              />
              <path
                d="M276 37L284 42L276 47"
                stroke="var(--crimson)"
                strokeWidth="1.25"
              />

              <rect
                x="284"
                y="18"
                width="108"
                height="48"
                stroke="var(--charcoal)"
                strokeOpacity="0.35"
              />
              <text
                x="338"
                y="40"
                fill="var(--charcoal)"
                fillOpacity="0.65"
                fontSize="8.5"
                letterSpacing="2"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                TAKES
              </text>
              <text
                x="338"
                y="54"
                fill="var(--charcoal)"
                fillOpacity="0.65"
                fontSize="8.5"
                letterSpacing="2"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                EFFECT
              </text>

              <text
                x="200"
                y="92"
                fill="var(--crimson)"
                fontSize="9"
                letterSpacing="0.4"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                HIGH COST OF ERROR
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <aside className="mt-8 max-w-3xl border border-[var(--charcoal)]/12 p-6 md:p-7">
            <div className={`${MICRO} text-[var(--champagne)]`}>Discussion</div>
            <p className="mt-3 font-serif text-lg font-light italic leading-relaxed text-[var(--charcoal)] md:text-[1.25rem]">
              In your view, which business decisions should always require human
              approval, even if an algorithm is 99 percent accurate?
            </p>
          </aside>
        </div>
      </Slide>

      {/* ==================================================================
          18. MODULE IV
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
            <h2 className="font-serif text-[2rem] font-semibold leading-[1.02] tracking-[-0.025em] text-[var(--charcoal)] md:text-[3.25rem]">
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
          19. DATA IS THE RAW MATERIAL: the two kinds of data are drawn in
          their own grammar. Structured: a ruled table. Unstructured: loose
          overlapping slips at broken angles.
      ================================================================== */}
      <Slide id="data-raw-material" border align="left">
        <div>
          <div className={`${MICRO} text-[var(--champagne)]`}>Raw material</div>
          <h2 className="mt-5 max-w-4xl font-serif text-[2rem] font-semibold leading-[1.04] tracking-[-0.02em] text-[var(--charcoal)] md:text-[3rem]">
            Data Is the Raw Material of AI
          </h2>
          <p className="mt-8 font-serif text-[1.5rem] font-medium leading-[1.2] tracking-[-0.02em] text-[var(--charcoal)] md:text-[2.5rem]">
            An algorithm cannot learn without data.
          </p>
        </div>

        <div className="mt-10 grid w-full max-w-5xl gap-12 border-t border-[var(--charcoal)]/10 pt-8 md:grid-cols-2 md:gap-0">
          <div className="flex flex-col justify-between md:pr-12">
            <div>
              <div className={`${MICRO} text-[var(--charcoal-light)]/55`}>
                Structured data
              </div>
              <p className="mt-3 font-serif text-lg leading-[1.55] text-[var(--charcoal)] md:text-[1.3125rem]">
                Structured data includes numbers, dates, and clear tables like
                spreadsheet rows or SQL databases.
              </p>
            </div>
            <svg
              role="img"
              aria-label="Structured data organized into clear table columns for dates and numbers across spreadsheet rows in SQL databases."
              viewBox="0 0 400 124"
              className="mt-6 w-full"
              fill="none"
            >
              <title>
                Structured data organized into clear table columns for dates and
                numbers across spreadsheet rows in SQL databases.
              </title>
              <rect
                x="12"
                y="12"
                width="376"
                height="84"
                stroke="var(--charcoal)"
                strokeOpacity="0.32"
              />
              <path
                d="M12 36H388M12 56H388M12 76H388M136 12V96M262 12V96"
                stroke="var(--charcoal)"
                strokeOpacity="0.2"
              />
              <text
                x="74"
                y="28"
                fill="var(--charcoal)"
                fillOpacity="0.65"
                fontSize="9"
                letterSpacing="1.6"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                DATES
              </text>
              <text
                x="199"
                y="28"
                fill="var(--charcoal)"
                fillOpacity="0.65"
                fontSize="9"
                letterSpacing="1.6"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                NUMBERS
              </text>
              <text
                x="325"
                y="28"
                fill="var(--charcoal)"
                fillOpacity="0.65"
                fontSize="9"
                letterSpacing="1.6"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                CLEAR TABLES
              </text>
              {[46, 66, 86].map((y, rIdx) => (
                <g key={y}>
                  <path
                    d={`M36 ${y}H112M162 ${y}H236M288 ${y}H362`}
                    stroke="var(--charcoal)"
                    strokeOpacity={rIdx === 0 ? "0.45" : "0.28"}
                    strokeWidth="1.5"
                  />
                </g>
              ))}
              <text
                x="200"
                y="115"
                fill="var(--charcoal)"
                fillOpacity="0.55"
                fontSize="9.5"
                letterSpacing="1.8"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                SPREADSHEET ROWS | SQL DATABASES
              </text>
            </svg>
          </div>

          <div className="flex flex-col justify-between md:border-l md:border-[var(--charcoal)]/12 md:pl-12">
            <div>
              <div className={`${MICRO} text-[var(--crimson)]`}>
                Unstructured data
              </div>
              <p className="mt-3 font-serif text-lg leading-[1.55] text-[var(--charcoal)] md:text-[1.3125rem]">
                Unstructured data includes emails, video footage, audio
                recordings, customer reviews, and scanned PDFs.
              </p>
            </div>
            <svg
              role="img"
              aria-label="Unstructured data slips for emails, video footage, audio recordings, customer reviews, and scanned PDFs."
              viewBox="0 0 400 124"
              className="mt-6 w-full"
              fill="none"
            >
              <title>
                Unstructured data slips for emails, video footage, audio
                recordings, customer reviews, and scanned PDFs.
              </title>
              {[
                { label: "EMAILS", x: 14, y: 14, w: 96, rot: -2.5 },
                { label: "VIDEO FOOTAGE", x: 126, y: 12, w: 132, rot: 2 },
                { label: "SCANNED PDFS", x: 274, y: 16, w: 112, rot: -1.8 },
                { label: "AUDIO RECORDINGS", x: 32, y: 58, w: 154, rot: 1.8 },
                { label: "CUSTOMER REVIEWS", x: 206, y: 56, w: 162, rot: -2 },
              ].map((slip) => {
                const cx = slip.x + slip.w / 2;
                const cy = slip.y + 15;
                return (
                  <g
                    key={slip.label}
                    transform={`rotate(${slip.rot} ${cx} ${cy})`}
                  >
                    <rect
                      x={slip.x}
                      y={slip.y}
                      width={slip.w}
                      height="30"
                      fill="var(--crimson)"
                      fillOpacity="0.04"
                      stroke="var(--crimson)"
                      strokeWidth="1.25"
                    />
                    <text
                      x={cx}
                      y={slip.y + 19}
                      fill="var(--crimson)"
                      fontSize="8.5"
                      letterSpacing="1.6"
                      textAnchor="middle"
                      fontFamily="var(--font-serif), Georgia, serif"
                      fontWeight="600"
                    >
                      {slip.label}
                    </text>
                  </g>
                );
              })}
              <text
                x="200"
                y="115"
                fill="var(--crimson)"
                fontSize="9.5"
                letterSpacing="1.8"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                UNSTRUCTURED DATA
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-14 max-w-4xl border-t border-[var(--crimson)]/40 pt-6">
            <div className={`${MICRO} text-[var(--crimson)]`}>
              Why it matters
            </div>
            <p className="mt-3 font-serif text-xl leading-[1.45] text-[var(--charcoal)] md:text-[1.625rem]">
              Modern deep learning allows companies to extract clear business
              insights from unstructured data for the first time.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          20. DATA QUALITY: garbage in, garbage out, drawn as a pipe with
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
          <h2 className="mt-5 max-w-4xl font-serif text-[1.875rem] font-semibold leading-[1.05] tracking-[-0.02em] text-[var(--charcoal)] md:text-[2.875rem]">
            Data Quality, Bias, and the Garbage-In Principle
          </h2>
          <p className="mt-6 font-serif text-[1.375rem] font-medium leading-[1.2] tracking-[-0.02em] text-[var(--charcoal)] md:text-[2rem]">
            A model is only as good as the data used to train it.
          </p>
        </div>

        <div className="mt-8 grid w-full max-w-5xl gap-8 md:grid-cols-2 md:gap-0">
          <div className="md:pr-12">
            <div className={`${MICRO} text-[var(--champagne)]`}>
              Past human biases
            </div>
            <p className="mt-3 font-serif text-lg leading-[1.55] text-[var(--charcoal)] md:text-[1.25rem]">
              If historical data contains past human biases or missing records,
              the model will learn and repeat those errors.
            </p>
          </div>
          <div className="md:border-l md:border-[var(--charcoal)]/12 md:pl-12">
            <div className={`${MICRO} text-[var(--champagne)]`}>
              Incomplete records and bad labels
            </div>
            <p className="mt-3 font-serif text-lg leading-[1.55] text-[var(--charcoal)] md:text-[1.25rem]">
              Incomplete records and bad labels create noisy forecasts that
              mislead decision makers.
            </p>
          </div>
        </div>

        <div className="mt-8 w-full max-w-5xl">
          <svg
            role="img"
            aria-label="Diagram showing past human biases and missing records or incomplete records and bad labels entering a model and producing repeated errors and noisy forecasts."
            viewBox="0 0 800 128"
            className="w-full"
            fill="none"
          >
            <title>
              Diagram showing past human biases and missing records or
              incomplete records and bad labels entering a model and producing
              repeated errors and noisy forecasts.
            </title>
            {/* Top inlet: Past human biases / missing records */}
            <rect
              x="16"
              y="14"
              width="244"
              height="42"
              fill="var(--crimson)"
              fillOpacity="0.04"
              stroke="var(--crimson)"
              strokeWidth="1.25"
            />
            <text
              x="138"
              y="32"
              fill="var(--crimson)"
              fontSize="8.5"
              letterSpacing="1.5"
              textAnchor="middle"
              fontFamily="var(--font-serif), Georgia, serif"
              fontWeight="600"
            >
              PAST HUMAN BIASES
            </text>
            <text
              x="138"
              y="46"
              fill="var(--charcoal)"
              fillOpacity="0.65"
              fontSize="7.5"
              letterSpacing="1.3"
              textAnchor="middle"
              fontFamily="var(--font-serif), Georgia, serif"
              fontWeight="600"
            >
              MISSING RECORDS
            </text>

            {/* Bottom inlet: Incomplete records / bad labels */}
            <rect
              x="16"
              y="72"
              width="244"
              height="42"
              fill="var(--crimson)"
              fillOpacity="0.04"
              stroke="var(--crimson)"
              strokeWidth="1.25"
            />
            <text
              x="138"
              y="90"
              fill="var(--crimson)"
              fontSize="8.5"
              letterSpacing="1.5"
              textAnchor="middle"
              fontFamily="var(--font-serif), Georgia, serif"
              fontWeight="600"
            >
              INCOMPLETE RECORDS
            </text>
            <text
              x="138"
              y="104"
              fill="var(--charcoal)"
              fillOpacity="0.65"
              fontSize="7.5"
              letterSpacing="1.3"
              textAnchor="middle"
              fontFamily="var(--font-serif), Georgia, serif"
              fontWeight="600"
            >
              BAD LABELS
            </text>

            {/* Inlet arrows to MODEL */}
            <path d="M260 35h54" stroke="var(--crimson)" strokeWidth="1.25" />
            <path d="M320 35l-6-3.5v7z" fill="var(--crimson)" />
            <path
              d="M260 93h54"
              stroke="var(--crimson)"
              strokeWidth="1.25"
              strokeDasharray="4 3"
            />
            <path d="M320 93l-6-3.5v7z" fill="var(--crimson)" />

            {/* Center: MODEL */}
            <rect
              x="320"
              y="14"
              width="160"
              height="100"
              fill="var(--surface)"
              stroke="var(--charcoal)"
              strokeOpacity="0.45"
              strokeWidth="1.25"
            />
            <text
              x="400"
              y="58"
              fill="var(--charcoal)"
              fontSize="10"
              letterSpacing="2"
              textAnchor="middle"
              fontFamily="var(--font-serif), Georgia, serif"
              fontWeight="600"
            >
              MODEL
            </text>
            <text
              x="400"
              y="76"
              fill="var(--charcoal)"
              fillOpacity="0.55"
              fontSize="7.5"
              letterSpacing="1.4"
              textAnchor="middle"
              fontFamily="var(--font-serif), Georgia, serif"
              fontWeight="600"
            >
              HISTORICAL DATA
            </text>
            <line
              x1="336"
              y1="35"
              x2="464"
              y2="35"
              stroke="var(--crimson)"
              strokeOpacity="0.25"
              strokeDasharray="3 3"
            />
            <line
              x1="336"
              y1="93"
              x2="464"
              y2="93"
              stroke="var(--crimson)"
              strokeOpacity="0.25"
              strokeDasharray="3 3"
            />

            {/* Outlet arrows from MODEL */}
            <path d="M480 35h54" stroke="var(--crimson)" strokeWidth="1.25" />
            <path d="M540 35l-6-3.5v7z" fill="var(--crimson)" />
            <path
              d="M480 93h54"
              stroke="var(--crimson)"
              strokeWidth="1.25"
              strokeDasharray="4 3"
            />
            <path d="M540 93l-6-3.5v7z" fill="var(--crimson)" />

            {/* Top outlet: Repeat those errors */}
            <rect
              x="540"
              y="14"
              width="244"
              height="42"
              fill="var(--crimson)"
              fillOpacity="0.06"
              stroke="var(--crimson)"
              strokeWidth="1.5"
            />
            <text
              x="662"
              y="39"
              fill="var(--crimson)"
              fontSize="8.5"
              letterSpacing="1.5"
              textAnchor="middle"
              fontFamily="var(--font-serif), Georgia, serif"
              fontWeight="600"
            >
              REPEAT THOSE ERRORS
            </text>

            {/* Bottom outlet: Noisy forecasts / Mislead decision makers */}
            <rect
              x="540"
              y="72"
              width="244"
              height="42"
              fill="var(--crimson)"
              fillOpacity="0.06"
              stroke="var(--crimson)"
              strokeWidth="1.5"
            />
            <text
              x="662"
              y="90"
              fill="var(--crimson)"
              fontSize="8.5"
              letterSpacing="1.5"
              textAnchor="middle"
              fontFamily="var(--font-serif), Georgia, serif"
              fontWeight="600"
            >
              NOISY FORECASTS
            </text>
            <text
              x="662"
              y="104"
              fill="var(--charcoal)"
              fillOpacity="0.65"
              fontSize="7.5"
              letterSpacing="1.3"
              textAnchor="middle"
              fontFamily="var(--font-serif), Georgia, serif"
              fontWeight="600"
            >
              MISLEAD DECISION MAKERS
            </text>
          </svg>
        </div>

        <div className="w-full">
          <figure className="mt-8 max-w-4xl border-l-2 border-[var(--crimson)] pl-6 md:pl-8">
            <blockquote className="font-serif text-xl leading-[1.4] text-[var(--charcoal)] md:text-[1.5rem]">
              High data quality and careful verification matter far more than
              using a trendy model architecture.
            </blockquote>
          </figure>
        </div>
      </Slide>

      {/* ==================================================================
          21. THE FLYWHEEL: a closed ring, because the point is that it has
          no end. Four stages sit on the circumference. The arrowhead shows
          the direction of travel.
      ================================================================== */}
      <Slide id="flywheel" border align="left">
        <div>
          <div className={`${MICRO} text-[var(--champagne)]`}>
            A cycle, not a launch
          </div>
          <h2 className="mt-5 max-w-4xl font-serif text-[2rem] font-semibold leading-[1.04] tracking-[-0.02em] text-[var(--charcoal)] md:text-[3rem]">
            The Feedback Loop and Data Flywheel
          </h2>
        </div>

        <div className="mt-10 grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1fr_minmax(0,25rem)] md:gap-12">
          <ol className="space-y-6">
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
                    <p className="mt-1.5 max-w-xl font-serif text-base leading-[1.55] text-[var(--charcoal)] md:text-[1.1875rem]">
                      {stage.line}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div>
            <svg
              role="img"
              aria-label="Four-stage virtuous learning cycle connecting deployment, customer actions, retraining, and better predictions."
              viewBox="0 0 400 260"
              className="w-full max-w-[25rem]"
              fill="none"
            >
              <title>
                Four-stage virtuous learning cycle connecting deployment,
                customer actions, retraining, and better predictions.
              </title>
              {/* Outer guide ring */}
              <circle
                cx="200"
                cy="130"
                r="64"
                stroke="var(--charcoal)"
                strokeOpacity="0.18"
                strokeWidth="1.25"
              />

              {/* Clockwise arcs along r=64 */}
              {/* Q1: Top (200,66) to Right (264,130) */}
              <path
                d="M214 67.5 A 64 64 0 0 1 262.5 116"
                stroke="var(--charcoal)"
                strokeOpacity="0.45"
                strokeWidth="1.25"
              />
              <path
                d="M262.8 118l-4-6.5 6.8-1.2z"
                fill="var(--charcoal)"
                fillOpacity="0.55"
              />

              {/* Q2: Right (264,130) to Bottom (200,194) */}
              <path
                d="M262.5 144 A 64 64 0 0 1 214 192.5"
                stroke="var(--charcoal)"
                strokeOpacity="0.45"
                strokeWidth="1.25"
              />
              <path
                d="M212 192.8l6.5-4 1.2 6.8z"
                fill="var(--charcoal)"
                fillOpacity="0.55"
              />

              {/* Q3: Bottom (200,194) to Left (136,130) */}
              <path
                d="M186 192.5 A 64 64 0 0 1 137.5 144"
                stroke="var(--crimson)"
                strokeWidth="1.5"
              />
              <path d="M137.2 142l4 6.5-6.8 1.2z" fill="var(--crimson)" />

              {/* Q4: Left (136,130) to Top (200,66) */}
              <path
                d="M137.5 116 A 64 64 0 0 1 186 67.5"
                stroke="var(--crimson)"
                strokeWidth="1.75"
              />
              <path d="M188 67.2l-6.5 4-1.2-6.8z" fill="var(--crimson)" />

              {/* Four cardinal nodes on the ring */}
              <circle
                cx="200"
                cy="66"
                r="4"
                fill="var(--surface)"
                stroke="var(--charcoal)"
                strokeOpacity="0.55"
                strokeWidth="1.25"
              />
              <circle
                cx="264"
                cy="130"
                r="4"
                fill="var(--surface)"
                stroke="var(--charcoal)"
                strokeOpacity="0.55"
                strokeWidth="1.25"
              />
              <circle
                cx="200"
                cy="194"
                r="4"
                fill="var(--surface)"
                stroke="var(--charcoal)"
                strokeOpacity="0.55"
                strokeWidth="1.25"
              />
              <circle cx="136" cy="130" r="4.5" fill="var(--crimson)" />

              {/* Center label */}
              <text
                x="200"
                y="126"
                fill="var(--crimson)"
                fontSize="8"
                letterSpacing="1.4"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                VIRTUOUS
              </text>
              <text
                x="200"
                y="139"
                fill="var(--crimson)"
                fontSize="8"
                letterSpacing="1.4"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                LEARNING CYCLE
              </text>

              {/* 01 Top: DEPLOYMENT */}
              <rect
                x="126"
                y="12"
                width="148"
                height="36"
                fill="var(--surface)"
                stroke="var(--charcoal)"
                strokeOpacity="0.3"
              />
              <text
                x="200"
                y="27"
                fill="var(--champagne)"
                fontSize="7.5"
                letterSpacing="1.5"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                01
              </text>
              <text
                x="200"
                y="40"
                fill="var(--charcoal)"
                fontSize="8.5"
                letterSpacing="1.5"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                DEPLOYMENT
              </text>

              {/* 02 Right: CUSTOMER ACTIONS */}
              <rect
                x="278"
                y="108"
                width="114"
                height="44"
                fill="var(--surface)"
                stroke="var(--charcoal)"
                strokeOpacity="0.3"
              />
              <text
                x="335"
                y="121"
                fill="var(--champagne)"
                fontSize="7.5"
                letterSpacing="1.5"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                02
              </text>
              <text
                x="335"
                y="133"
                fill="var(--charcoal)"
                fontSize="8"
                letterSpacing="1.3"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                CUSTOMER
              </text>
              <text
                x="335"
                y="144"
                fill="var(--charcoal)"
                fontSize="8"
                letterSpacing="1.3"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                ACTIONS
              </text>

              {/* 03 Bottom: RETRAINING */}
              <rect
                x="126"
                y="212"
                width="148"
                height="36"
                fill="var(--surface)"
                stroke="var(--charcoal)"
                strokeOpacity="0.3"
              />
              <text
                x="200"
                y="227"
                fill="var(--champagne)"
                fontSize="7.5"
                letterSpacing="1.5"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                03
              </text>
              <text
                x="200"
                y="240"
                fill="var(--charcoal)"
                fontSize="8.5"
                letterSpacing="1.5"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                RETRAINING
              </text>

              {/* 04 Left: BETTER PREDICTIONS (highlighted in crimson) */}
              <rect
                x="8"
                y="108"
                width="114"
                height="44"
                fill="var(--crimson)"
                fillOpacity="0.05"
                stroke="var(--crimson)"
                strokeWidth="1.5"
              />
              <text
                x="65"
                y="121"
                fill="var(--crimson)"
                fontSize="7.5"
                letterSpacing="1.5"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                04
              </text>
              <text
                x="65"
                y="133"
                fill="var(--crimson)"
                fontSize="8"
                letterSpacing="1.3"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                BETTER
              </text>
              <text
                x="65"
                y="144"
                fill="var(--crimson)"
                fontSize="8"
                letterSpacing="1.3"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                PREDICTIONS
              </text>
            </svg>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          22. MODULE V
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
            <h2 className="font-serif text-[2.25rem] font-semibold leading-[1.02] tracking-[-0.025em] text-[var(--charcoal)] md:text-[3.75rem]">
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
          23. WHY PROJECTS FAIL: a post-mortem sheet. Three failure causes
          ruled in a column and struck through by a fracture line. The
          remedy is set apart and is the only unstruck panel.          [quiz]
      ================================================================== */}
      <Slide
        id="why-projects-fail"
        border
        align="left"
        quizData={quiz["why-projects-fail"]}
      >
        <div>
          <div className={`${MICRO} text-[var(--champagne)]`}>Post-mortem</div>
          <h2 className="mt-5 max-w-4xl font-serif text-[2rem] font-semibold leading-[1.04] tracking-[-0.02em] text-[var(--charcoal)] md:text-[3rem]">
            Why Business AI Projects Fail
          </h2>
        </div>

        <div className="mt-8 grid w-full max-w-5xl gap-8 md:grid-cols-3 md:gap-8">
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
            <div
              key={cause.n}
              className="border-t border-[var(--charcoal)]/15 pt-5"
            >
              <div className="flex items-baseline gap-3">
                <span className={`${MICRO} text-[var(--champagne)]`}>
                  {cause.n}
                </span>
                <span className={`${MICRO} text-[var(--charcoal-light)]/60`}>
                  {cause.tag}
                </span>
              </div>
              <p className="mt-3 font-serif text-base leading-[1.55] text-[var(--charcoal)] md:text-[1.125rem]">
                {cause.line}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-7 w-full max-w-5xl border-l-2 border-[var(--crimson)] pl-6">
          <div className={`${MICRO} text-[var(--crimson)]`}>
            What adoption actually requires
          </div>
          <p className="mt-2 max-w-4xl font-serif text-lg leading-[1.45] text-[var(--charcoal)] md:text-[1.4375rem]">
            Clear executive sponsorship, realistic timelines, and change
            management are essential for adoption.
          </p>
        </div>

        <div className="mt-7 w-full max-w-5xl">
          <svg
            role="img"
            aria-label="Diagram contrasting the three causes why AI projects fail against the foundations required for adoption."
            viewBox="0 0 800 120"
            className="w-full"
            fill="none"
          >
            <title>
              Diagram contrasting the three causes why AI projects fail against
              the foundations required for adoption.
            </title>
            {/* Top row: Three fractured links leading to PROJECTS FAIL */}
            <rect
              x="16"
              y="12"
              width="172"
              height="36"
              stroke="var(--charcoal)"
              strokeOpacity="0.28"
              strokeDasharray="4 3"
            />
            <text
              x="102"
              y="33"
              fill="var(--charcoal)"
              fillOpacity="0.65"
              fontSize="8"
              letterSpacing="1.3"
              textAnchor="middle"
              fontFamily="var(--font-serif), Georgia, serif"
              fontWeight="600"
            >
              EXCITING TECHNOLOGY
            </text>

            <rect
              x="212"
              y="12"
              width="172"
              height="36"
              stroke="var(--charcoal)"
              strokeOpacity="0.28"
              strokeDasharray="4 3"
            />
            <text
              x="298"
              y="33"
              fill="var(--charcoal)"
              fillOpacity="0.65"
              fontSize="8"
              letterSpacing="1.3"
              textAnchor="middle"
              fontFamily="var(--font-serif), Georgia, serif"
              fontWeight="600"
            >
              POOR DATA QUALITY
            </text>

            <rect
              x="408"
              y="12"
              width="172"
              height="36"
              stroke="var(--charcoal)"
              strokeOpacity="0.28"
              strokeDasharray="4 3"
            />
            <text
              x="494"
              y="33"
              fill="var(--charcoal)"
              fillOpacity="0.65"
              fontSize="8"
              letterSpacing="1.3"
              textAnchor="middle"
              fontFamily="var(--font-serif), Georgia, serif"
              fontWeight="600"
            >
              EMPLOYEE RESISTANCE
            </text>

            {/* Broken connectors between top boxes */}
            <line
              x1="188"
              y1="30"
              x2="212"
              y2="30"
              stroke="var(--charcoal)"
              strokeOpacity="0.3"
              strokeDasharray="2 2"
            />
            <line
              x1="384"
              y1="30"
              x2="408"
              y2="30"
              stroke="var(--charcoal)"
              strokeOpacity="0.3"
              strokeDasharray="2 2"
            />
            <line
              x1="580"
              y1="30"
              x2="626"
              y2="30"
              stroke="var(--charcoal)"
              strokeOpacity="0.35"
              strokeDasharray="3 3"
            />
            {/* Terminal stop bar */}
            <line
              x1="626"
              y1="21"
              x2="626"
              y2="39"
              stroke="var(--charcoal)"
              strokeOpacity="0.55"
              strokeWidth="1.5"
            />

            <rect
              x="636"
              y="12"
              width="148"
              height="36"
              stroke="var(--charcoal)"
              strokeOpacity="0.35"
            />
            <text
              x="710"
              y="33"
              fill="var(--charcoal)"
              fillOpacity="0.65"
              fontSize="8"
              letterSpacing="1.4"
              textAnchor="middle"
              fontFamily="var(--font-serif), Georgia, serif"
              fontWeight="600"
            >
              PROJECTS FAIL
            </text>

            {/* Bottom row: Connected path to ADOPTION */}
            <rect
              x="16"
              y="72"
              width="172"
              height="36"
              fill="var(--crimson)"
              fillOpacity="0.04"
              stroke="var(--crimson)"
              strokeWidth="1.25"
            />
            <text
              x="102"
              y="93"
              fill="var(--crimson)"
              fontSize="7.5"
              letterSpacing="1.2"
              textAnchor="middle"
              fontFamily="var(--font-serif), Georgia, serif"
              fontWeight="600"
            >
              EXECUTIVE SPONSORSHIP
            </text>

            <rect
              x="212"
              y="72"
              width="172"
              height="36"
              fill="var(--crimson)"
              fillOpacity="0.04"
              stroke="var(--crimson)"
              strokeWidth="1.25"
            />
            <text
              x="298"
              y="93"
              fill="var(--crimson)"
              fontSize="7.5"
              letterSpacing="1.2"
              textAnchor="middle"
              fontFamily="var(--font-serif), Georgia, serif"
              fontWeight="600"
            >
              REALISTIC TIMELINES
            </text>

            <rect
              x="408"
              y="72"
              width="172"
              height="36"
              fill="var(--crimson)"
              fillOpacity="0.04"
              stroke="var(--crimson)"
              strokeWidth="1.25"
            />
            <text
              x="494"
              y="93"
              fill="var(--crimson)"
              fontSize="7.5"
              letterSpacing="1.2"
              textAnchor="middle"
              fontFamily="var(--font-serif), Georgia, serif"
              fontWeight="600"
            >
              CHANGE MANAGEMENT
            </text>

            {/* Solid crimson connectors to ADOPTION */}
            <line
              x1="188"
              y1="90"
              x2="212"
              y2="90"
              stroke="var(--crimson)"
              strokeWidth="1.25"
            />
            <line
              x1="384"
              y1="90"
              x2="408"
              y2="90"
              stroke="var(--crimson)"
              strokeWidth="1.25"
            />
            <path d="M580 90h50" stroke="var(--crimson)" strokeWidth="1.5" />
            <path d="M636 90l-6-3.5v7z" fill="var(--crimson)" />

            <rect
              x="636"
              y="72"
              width="148"
              height="36"
              fill="var(--crimson)"
              fillOpacity="0.08"
              stroke="var(--crimson)"
              strokeWidth="1.5"
            />
            <text
              x="710"
              y="93"
              fill="var(--crimson)"
              fontSize="8.5"
              letterSpacing="1.6"
              textAnchor="middle"
              fontFamily="var(--font-serif), Georgia, serif"
              fontWeight="600"
            >
              ADOPTION
            </text>
          </svg>
        </div>
      </Slide>

      {/* ==================================================================
          24. HALLUCINATIONS & THE BLACK BOX: two failures of trust, drawn
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
          <h2 className="mt-5 max-w-4xl font-serif text-[1.875rem] font-semibold leading-[1.05] tracking-[-0.02em] text-[var(--charcoal)] md:text-[2.875rem]">
            Hallucinations, Accuracy, and the Black Box Problem
          </h2>
        </div>

        <div className="mt-8 grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-0">
          <div className="flex flex-col justify-between md:pr-12">
            <div>
              <div className={`${MICRO} text-[var(--crimson)]`}>
                Hallucinations
              </div>
              <p className="mt-3 font-serif text-lg leading-[1.55] text-[var(--charcoal)] md:text-[1.25rem]">
                Generative models can produce convincing answers that are
                factually wrong, known as hallucinations.
              </p>
            </div>
            <svg
              role="img"
              aria-label="Generative models producing convincing answers that are factually wrong, known as hallucinations."
              viewBox="0 0 400 112"
              className="mt-6 w-full max-w-[400px]"
              fill="none"
            >
              <title>
                Generative models producing convincing answers that are
                factually wrong, known as hallucinations.
              </title>
              <rect
                x="12"
                y="18"
                width="144"
                height="48"
                fill="var(--surface)"
                stroke="var(--charcoal)"
                strokeOpacity="0.35"
              />
              <text
                x="84"
                y="39"
                fill="var(--charcoal)"
                fontSize="8"
                letterSpacing="1.4"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                GENERATIVE
              </text>
              <text
                x="84"
                y="52"
                fill="var(--charcoal)"
                fontSize="8"
                letterSpacing="1.4"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                MODELS
              </text>

              <path d="M156 42h34" stroke="var(--crimson)" strokeWidth="1.25" />
              <path d="M196 42l-6-3.5v7z" fill="var(--crimson)" />

              <rect
                x="196"
                y="12"
                width="192"
                height="60"
                fill="var(--crimson)"
                fillOpacity="0.05"
                stroke="var(--crimson)"
                strokeWidth="1.5"
              />
              <text
                x="292"
                y="31"
                fill="var(--charcoal)"
                fontSize="8"
                letterSpacing="1.4"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                CONVINCING ANSWERS
              </text>
              <line
                x1="216"
                y1="41"
                x2="368"
                y2="41"
                stroke="var(--crimson)"
                strokeOpacity="0.3"
                strokeDasharray="3 3"
              />
              <text
                x="292"
                y="58"
                fill="var(--crimson)"
                fontSize="8.5"
                letterSpacing="1.5"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                FACTUALLY WRONG
              </text>

              <text
                x="200"
                y="98"
                fill="var(--crimson)"
                fontSize="9"
                letterSpacing="1.8"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                HALLUCINATIONS
              </text>
            </svg>
          </div>

          <div className="flex flex-col justify-between md:border-l md:border-[var(--charcoal)]/12 md:pl-12">
            <div>
              <div className={`${MICRO} text-[var(--charcoal-light)]/55`}>
                Black boxes
              </div>
              <p className="mt-3 font-serif text-lg leading-[1.55] text-[var(--charcoal)] md:text-[1.25rem]">
                Many deep learning models are black boxes, meaning humans cannot
                easily trace how the system reached a conclusion.
              </p>
            </div>
            <svg
              role="img"
              aria-label="Black box deep learning model where humans cannot easily trace how the system reached a conclusion."
              viewBox="0 0 400 112"
              className="mt-6 w-full max-w-[400px]"
              fill="none"
            >
              <title>
                Black box deep learning model where humans cannot easily trace
                how the system reached a conclusion.
              </title>
              {/* Input arrow into black box */}
              <path
                d="M12 42h30"
                stroke="var(--charcoal)"
                strokeOpacity="0.45"
                strokeWidth="1.25"
              />
              <path
                d="M48 42l-6-3.5v7z"
                fill="var(--charcoal)"
                fillOpacity="0.55"
              />

              {/* Opaque/veiled Black Box frame */}
              <rect
                x="48"
                y="12"
                width="184"
                height="60"
                fill="var(--charcoal)"
                fillOpacity="0.06"
                stroke="var(--charcoal)"
                strokeOpacity="0.55"
                strokeWidth="1.5"
              />
              {/* Broken internal trace lines */}
              <line
                x1="64"
                y1="24"
                x2="216"
                y2="24"
                stroke="var(--charcoal)"
                strokeOpacity="0.22"
                strokeDasharray="4 4"
              />
              <line
                x1="64"
                y1="60"
                x2="216"
                y2="60"
                stroke="var(--charcoal)"
                strokeOpacity="0.22"
                strokeDasharray="4 4"
              />
              <text
                x="140"
                y="38"
                fill="var(--charcoal)"
                fontSize="8.5"
                letterSpacing="1.6"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                BLACK BOXES
              </text>
              <text
                x="140"
                y="52"
                fill="var(--charcoal)"
                fillOpacity="0.65"
                fontSize="7.5"
                letterSpacing="1.2"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                CANNOT EASILY TRACE
              </text>

              {/* Output arrow to CONCLUSION */}
              <path
                d="M232 42h30"
                stroke="var(--charcoal)"
                strokeOpacity="0.45"
                strokeWidth="1.25"
              />
              <path
                d="M268 42l-6-3.5v7z"
                fill="var(--charcoal)"
                fillOpacity="0.55"
              />

              <rect
                x="268"
                y="18"
                width="120"
                height="48"
                fill="var(--surface)"
                stroke="var(--charcoal)"
                strokeOpacity="0.35"
              />
              <text
                x="328"
                y="45"
                fill="var(--charcoal)"
                fontSize="8"
                letterSpacing="1.4"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                CONCLUSION
              </text>

              <text
                x="200"
                y="98"
                fill="var(--charcoal)"
                fillOpacity="0.65"
                fontSize="9"
                letterSpacing="1.6"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                EXPLAIN THE EXACT LOGIC
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-8 max-w-4xl border-l border-[var(--charcoal)]/25 pl-6">
            <div className={`${MICRO} text-[var(--charcoal-light)]/50`}>
              Regulated industries
            </div>
            <p className="mt-2 font-serif text-lg leading-[1.55] text-[var(--charcoal-light)] md:text-[1.1875rem]">
              In regulated fields like banking and healthcare, companies must be
              able to explain the exact logic behind their decisions.
            </p>
          </div>
        </div>

        <div className="w-full">
          <p className="mt-8 max-w-4xl font-serif text-[1.25rem] font-medium leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[1.75rem]">
            Leaders must test system outputs and build guardrails before
            deploying customer-facing AI.
          </p>
        </div>
      </Slide>

      {/* ==================================================================
          25. PRIVACY, SECURITY, IP: three exposures held in three ruled
          vault panels, each with its own tally mark. The obligation closes
          the slide as a single ruled line.
      ================================================================== */}
      <Slide id="privacy-security-ip" border align="left">
        <div>
          <div className={`${MICRO} text-[var(--champagne)]`}>
            Three exposures
          </div>
          <h2 className="mt-4 max-w-4xl font-serif text-[1.875rem] font-semibold leading-[1.05] tracking-[-0.02em] text-[var(--charcoal)] md:text-[2.75rem]">
            Privacy, Security, and Intellectual Property
          </h2>
        </div>

        <div className="mt-7 grid w-full max-w-5xl gap-6 md:grid-cols-3 md:gap-6">
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
              <div className="h-full border-t border-[var(--charcoal)]/20 pt-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-[1.25rem] font-black leading-none text-[var(--champagne)]">
                    {panel.n}
                  </span>
                  <span className={`${MICRO} text-[var(--charcoal-light)]/60`}>
                    {panel.tag}
                  </span>
                </div>
                <p className="mt-2.5 font-serif text-base leading-[1.55] text-[var(--charcoal)] md:text-[1.0625rem]">
                  {panel.line}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 w-full max-w-5xl border-l-2 border-[var(--crimson)] pl-6">
          <p className="max-w-4xl font-serif text-lg leading-[1.45] text-[var(--charcoal)] md:text-[1.375rem]">
            Organizations need strict data handling policies and secure
            infrastructure to protect sensitive information.
          </p>
        </div>

        <div className="mt-6 w-full max-w-5xl">
          <svg
            role="img"
            aria-label="Secure infrastructure and strict data handling policies protecting customer records, financial figures, and trade secrets from exposure to public AI tools."
            viewBox="0 0 800 96"
            className="w-full"
            fill="none"
          >
            <title>
              Secure infrastructure and strict data handling policies protecting
              customer records, financial figures, and trade secrets from
              exposure to public AI tools.
            </title>
            {/* Protected perimeter: SECURE INFRASTRUCTURE | STRICT DATA HANDLING POLICIES */}
            <rect
              x="16"
              y="10"
              width="484"
              height="76"
              fill="var(--crimson)"
              fillOpacity="0.04"
              stroke="var(--crimson)"
              strokeWidth="1.5"
            />
            <text
              x="258"
              y="26"
              fill="var(--crimson)"
              fontSize="8"
              letterSpacing="1.5"
              textAnchor="middle"
              fontFamily="var(--font-serif), Georgia, serif"
              fontWeight="600"
            >
              SECURE INFRASTRUCTURE | STRICT DATA HANDLING POLICIES
            </text>

            {/* Three protected assets inside */}
            <rect
              x="32"
              y="38"
              width="140"
              height="34"
              fill="var(--surface)"
              stroke="var(--charcoal)"
              strokeOpacity="0.3"
            />
            <text
              x="102"
              y="58"
              fill="var(--charcoal)"
              fontSize="7.5"
              letterSpacing="1.2"
              textAnchor="middle"
              fontFamily="var(--font-serif), Georgia, serif"
              fontWeight="600"
            >
              CUSTOMER RECORDS
            </text>

            <rect
              x="188"
              y="38"
              width="140"
              height="34"
              fill="var(--surface)"
              stroke="var(--charcoal)"
              strokeOpacity="0.3"
            />
            <text
              x="258"
              y="58"
              fill="var(--charcoal)"
              fontSize="7.5"
              letterSpacing="1.2"
              textAnchor="middle"
              fontFamily="var(--font-serif), Georgia, serif"
              fontWeight="600"
            >
              FINANCIAL FIGURES
            </text>

            <rect
              x="344"
              y="38"
              width="140"
              height="34"
              fill="var(--surface)"
              stroke="var(--charcoal)"
              strokeOpacity="0.3"
            />
            <text
              x="414"
              y="58"
              fill="var(--charcoal)"
              fontSize="7.5"
              letterSpacing="1.2"
              textAnchor="middle"
              fontFamily="var(--font-serif), Georgia, serif"
              fontWeight="600"
            >
              TRADE SECRETS
            </text>

            {/* Blocked exposure to PUBLIC AI TOOLS */}
            <line
              x1="500"
              y1="48"
              x2="556"
              y2="48"
              stroke="var(--charcoal)"
              strokeOpacity="0.4"
              strokeDasharray="4 3"
            />
            {/* Gate block bar */}
            <line
              x1="556"
              y1="34"
              x2="556"
              y2="62"
              stroke="var(--crimson)"
              strokeWidth="2"
            />

            {/* Outside: PUBLIC AI TOOLS & LEGAL AND FINANCIAL LIABILITY */}
            <rect
              x="576"
              y="14"
              width="208"
              height="30"
              stroke="var(--charcoal)"
              strokeOpacity="0.3"
              strokeDasharray="4 3"
            />
            <text
              x="680"
              y="32"
              fill="var(--charcoal)"
              fillOpacity="0.65"
              fontSize="7.5"
              letterSpacing="1.3"
              textAnchor="middle"
              fontFamily="var(--font-serif), Georgia, serif"
              fontWeight="600"
            >
              PUBLIC AI TOOLS
            </text>

            <rect
              x="576"
              y="52"
              width="208"
              height="30"
              stroke="var(--charcoal)"
              strokeOpacity="0.3"
              strokeDasharray="4 3"
            />
            <text
              x="680"
              y="70"
              fill="var(--charcoal)"
              fillOpacity="0.65"
              fontSize="7.5"
              letterSpacing="1.3"
              textAnchor="middle"
              fontFamily="var(--font-serif), Georgia, serif"
              fontWeight="600"
            >
              LEGAL AND FINANCIAL LIABILITY
            </text>
          </svg>
        </div>

        <div className="w-full">
          <aside className="mt-6 max-w-4xl border border-[var(--charcoal)]/12 p-5 md:p-6">
            <div className={`${MICRO} text-[var(--champagne)]`}>Discussion</div>
            <p className="mt-2 font-serif text-base font-light italic leading-relaxed text-[var(--charcoal)] md:text-[1.25rem]">
              How should a company respond if an employee accidentally uploads
              confidential client data into a public chatbot to save time on a
              report?
            </p>
          </aside>
        </div>
      </Slide>

      {/* ==================================================================
          26. GOVERNANCE: an accountability sheet. The verdict sits at the
          top in display type. The three duties are ruled beneath it like
          clauses, and the slide closes on a signature line.
      ================================================================== */}
      <Slide id="governance" border align="left">
        <div>
          <div className={`${MICRO} text-[var(--champagne)]`}>
            Who is answerable
          </div>
          <h2 className="mt-5 max-w-4xl font-serif text-[2rem] font-semibold leading-[1.04] tracking-[-0.02em] text-[var(--charcoal)] md:text-[3rem]">
            Governance and Executive Accountability
          </h2>
        </div>

        <div className="w-full">
          <p className="mt-6 max-w-4xl font-serif text-[1.375rem] font-medium leading-[1.25] tracking-[-0.02em] text-[var(--charcoal)] md:text-[2.125rem]">
            Business executives, not data scientists alone, are legally and
            ethically responsible for automated decisions.
          </p>
        </div>

        <div className="mt-10 grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1fr_minmax(0,25rem)] md:gap-12">
          <div>
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
                <div className="grid grid-cols-[3ch_1fr] gap-4 border-t border-[var(--charcoal)]/12 py-5">
                  <span className="pt-1 font-serif text-sm lowercase tracking-[0.1em] text-[var(--champagne)]">
                    {clause.n}
                  </span>
                  <p className="font-serif text-base leading-[1.55] text-[var(--charcoal)] md:text-[1.1875rem]">
                    {clause.line}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <svg
              role="img"
              aria-label="Governance hierarchy showing business executives responsible for model deployment approval, accuracy monitoring, customer complaints, and regular audits that protect customer trust."
              viewBox="0 0 400 240"
              className="w-full max-w-[25rem]"
              fill="none"
            >
              <title>
                Governance hierarchy showing business executives responsible for
                model deployment approval, accuracy monitoring, customer
                complaints, and regular audits that protect customer trust.
              </title>
              {/* Top: BUSINESS EXECUTIVES */}
              <rect
                x="12"
                y="10"
                width="376"
                height="44"
                fill="var(--crimson)"
                fillOpacity="0.05"
                stroke="var(--crimson)"
                strokeWidth="1.5"
              />
              <text
                x="200"
                y="28"
                fill="var(--crimson)"
                fontSize="8.5"
                letterSpacing="1.6"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                BUSINESS EXECUTIVES
              </text>
              <text
                x="200"
                y="42"
                fill="var(--crimson)"
                fontSize="7.5"
                letterSpacing="1.2"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                LEGALLY AND ETHICALLY RESPONSIBLE
              </text>

              {/* Connectors to three governance roles */}
              <line
                x1="72"
                y1="54"
                x2="72"
                y2="74"
                stroke="var(--charcoal)"
                strokeOpacity="0.35"
              />
              <line
                x1="200"
                y1="54"
                x2="200"
                y2="74"
                stroke="var(--charcoal)"
                strokeOpacity="0.35"
              />
              <line
                x1="328"
                y1="54"
                x2="328"
                y2="74"
                stroke="var(--charcoal)"
                strokeOpacity="0.35"
              />

              {/* Three clear rules */}
              <rect
                x="12"
                y="74"
                width="120"
                height="42"
                fill="var(--surface)"
                stroke="var(--charcoal)"
                strokeOpacity="0.3"
              />
              <text
                x="72"
                y="92"
                fill="var(--charcoal)"
                fontSize="7"
                letterSpacing="1.1"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                APPROVES MODEL
              </text>
              <text
                x="72"
                y="104"
                fill="var(--charcoal)"
                fontSize="7"
                letterSpacing="1.1"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                DEPLOYMENT
              </text>

              <rect
                x="140"
                y="74"
                width="120"
                height="42"
                fill="var(--surface)"
                stroke="var(--charcoal)"
                strokeOpacity="0.3"
              />
              <text
                x="200"
                y="92"
                fill="var(--charcoal)"
                fontSize="7"
                letterSpacing="1.1"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                MONITORS
              </text>
              <text
                x="200"
                y="104"
                fill="var(--charcoal)"
                fontSize="7"
                letterSpacing="1.1"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                ACCURACY
              </text>

              <rect
                x="268"
                y="74"
                width="120"
                height="42"
                fill="var(--surface)"
                stroke="var(--charcoal)"
                strokeOpacity="0.3"
              />
              <text
                x="328"
                y="92"
                fill="var(--charcoal)"
                fontSize="7"
                letterSpacing="1.1"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                HANDLES CUSTOMER
              </text>
              <text
                x="328"
                y="104"
                fill="var(--charcoal)"
                fontSize="7"
                letterSpacing="1.1"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                COMPLAINTS
              </text>

              {/* Connectors to REGULAR AUDITS */}
              <line
                x1="72"
                y1="116"
                x2="72"
                y2="136"
                stroke="var(--charcoal)"
                strokeOpacity="0.35"
              />
              <line
                x1="200"
                y1="116"
                x2="200"
                y2="136"
                stroke="var(--charcoal)"
                strokeOpacity="0.35"
              />
              <line
                x1="328"
                y1="116"
                x2="328"
                y2="136"
                stroke="var(--charcoal)"
                strokeOpacity="0.35"
              />

              {/* Regular audits bar */}
              <rect
                x="12"
                y="136"
                width="376"
                height="42"
                fill="var(--surface)"
                stroke="var(--charcoal)"
                strokeOpacity="0.35"
              />
              <text
                x="200"
                y="153"
                fill="var(--charcoal)"
                fontSize="8"
                letterSpacing="1.5"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                REGULAR AUDITS
              </text>
              <text
                x="200"
                y="167"
                fill="var(--charcoal)"
                fillOpacity="0.65"
                fontSize="6.75"
                letterSpacing="0.9"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                ALGORITHMIC BIAS | PERFORMANCE DECLINE | COMPLIANCE ISSUES
              </text>

              {/* Connector to bottom outcome */}
              <path
                d="M200 178v14"
                stroke="var(--charcoal)"
                strokeOpacity="0.45"
                strokeWidth="1.25"
              />
              <path
                d="M200 196l-3.5-5h7z"
                fill="var(--charcoal)"
                fillOpacity="0.55"
              />

              {/* Bottom outcome */}
              <rect
                x="12"
                y="196"
                width="376"
                height="34"
                fill="var(--surface)"
                stroke="var(--charcoal)"
                strokeOpacity="0.35"
              />
              <text
                x="200"
                y="216"
                fill="var(--charcoal)"
                fontSize="8"
                letterSpacing="1.3"
                textAnchor="middle"
                fontFamily="var(--font-serif), Georgia, serif"
                fontWeight="600"
              >
                PROTECTS CUSTOMER TRUST | LONG-TERM REPUTATION
              </text>
            </svg>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          27. MODULE VI
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
            <h2 className="font-serif text-[2.25rem] font-semibold leading-[1.02] tracking-[-0.025em] text-[var(--charcoal)] md:text-[3.75rem]">
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
          28. ROADMAP: a semester timetable. Two ruled columns of weeks,
          each week's numeral set large in the margin so the term can be
          read at a glance rather than scrolled.
      ================================================================== */}
      <Slide id="roadmap" border align="left">
        <div>
          <div className={`${MICRO} text-[var(--champagne)]`}>
            Eight weeks ahead
          </div>
          <h2 className="mt-5 max-w-4xl font-serif text-[1.875rem] font-semibold leading-[1.05] tracking-[-0.02em] text-[var(--charcoal)] md:text-[2.875rem]">
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
          29. SUMMARY: the colophon. Four principles set as display
          statements rather than list items, because they are what the
          student should leave holding.
      ================================================================== */}
      <Slide id="summary" border align="left">
        <div>
          <div className={`${MICRO} text-[var(--champagne)]`}>
            Four things to carry forward
          </div>
          <h2 className="mt-4 max-w-4xl font-serif text-[1.875rem] font-semibold leading-[1.05] tracking-[-0.02em] text-[var(--charcoal)] md:text-[2.75rem]">
            Summary and Core Principles for Leaders
          </h2>
        </div>

        <ol className="mt-8 w-full max-w-4xl">
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
              <div className="grid grid-cols-[4ch_1fr] gap-6 border-t border-[var(--charcoal)]/12 py-5 md:grid-cols-[5ch_1fr] md:gap-8">
                <span className={`${MICRO} pt-2 text-[var(--champagne)]`}>
                  {p.n}
                </span>
                <p className="font-serif text-lg font-medium leading-[1.35] tracking-[-0.015em] text-[var(--charcoal)] md:text-[1.5rem]">
                  {p.line}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="w-full">
          <div className="mt-8 flex w-full max-w-4xl flex-wrap items-baseline justify-between gap-4 border-t border-[var(--charcoal)]/12 pt-5">
            <span className={`${MICRO} text-[var(--champagne)]`}>
              End of Week 01
            </span>
            <span
              className={`${MICRO} font-normal text-[var(--charcoal-light)]/55`}
            >
              Davood Wadi, PhD | BUSI 654
            </span>
          </div>
        </div>
      </Slide>
    </SlideDeck>
  );
}
