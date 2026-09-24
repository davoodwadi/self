"use client";

import React from "react";
import {
  Slide,
  SlideDeck,
} from "@/app/(courses-ai)/_components/SlideComponents";
import { ScrollProgress } from "@/app/(courses-ai)/_components/Interactive";
import { createCourseQuizLookup, type CourseQuiz } from "@/lib/course-quiz";
import quizzes from "./quizzes.json";
import {
  BODY,
  Discussion2,
  DISPLAY,
  hash,
  Head2,
  headRight,
  LEAD,
  Measure,
  MICRO,
  RULED,
  Schematic,
  Split1,
  Steps,
  SVG_LABEL,
  Terms,
} from "../_visuals/kit";

// ============================================================================
// WEEK 07 — EDII IN AI
// ============================================================================
// Same deck grammar as Weeks 01–06: every slide is hand-composed for its own
// argument, with hairlines instead of boxes and crimson marking one thing.
//
// Sentences are transcribed verbatim from content.md. Figures carry only words
// that already appear on their slide; any shape that suggests a quantity
// content.md does not give is labelled SCHEMATIC.
//
// Quizzes: `Slide` renders `quizData` BEFORE its section. content.md for this
// week carries no [quiz] tags and has five topics, so each topic gets one quiz.
// Each quiz is attached to the slide that FOLLOWS its topic and only tests
// material the student has already passed; the last one sits on the closing
// plate, which adds no new content.
// ============================================================================

const quiz = createCourseQuizLookup(quizzes as CourseQuiz[]);

const EDII = ["Equity", "Diversity", "Inclusion", "Indigeneity"];

/**
 * An acronym spelled out: each initial in display weight over the word it
 * stands for, in a hairline grid. `mark` turns one letter crimson.
 */
function Unfold({
  words,
  mark,
  className = "",
}: {
  words: string[];
  mark?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`grid grid-cols-2 gap-px bg-[var(--charcoal)]/10 md:grid-cols-4 ${className}`}
    >
      {words.map((word, i) => (
        <div key={word} className="bg-[var(--background)] px-4 pb-4 pt-3">
          <div
            className={`font-serif text-[2.75rem] font-black leading-none tracking-[-0.04em] md:text-[3.75rem] ${
              i === mark ? "text-[var(--crimson)]" : "text-[var(--charcoal)]"
            }`}
          >
            {word[0]}
          </div>
          <div
            className={`${MICRO} mt-3 ${
              i === mark
                ? "text-[var(--crimson)]"
                : "text-[var(--charcoal-light)]/60"
            }`}
          >
            {word}
          </div>
        </div>
      ))}
    </div>
  );
}

/** A two-column ledger line list: costs carry a minus, returns a crimson plus. */
function Ledger({
  items,
  gain = false,
}: {
  items: string[];
  gain?: boolean;
}) {
  const tone = gain ? "text-[var(--crimson)]" : "text-[var(--charcoal-light)]/60";
  return (
    <ul
      aria-hidden
      className="mt-6 border-t border-[var(--charcoal)]/20"
    >
      {items.map((item) => (
        <li
          key={item}
          className="grid grid-cols-[2ch_1fr] items-baseline gap-4 border-b border-[var(--charcoal)]/10 py-3"
        >
          <span className={`font-mono text-base leading-none ${tone}`}>
            {gain ? "+" : "−"}
          </span>
          <span
            className={`font-mono text-[11px] uppercase tracking-[0.1em] ${tone}`}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function Week07Edii() {
  return (
    <SlideDeck>
      <ScrollProgress label="Week 07" />

      {/* ==================================================================
          01 · TITLE — masthead; the four words behind the acronym spelled
          out under it.
      ================================================================== */}
      <Slide id="title" align="left" className="relative overflow-hidden">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 select-none font-serif text-[36vw] font-black leading-none text-[var(--charcoal)]/[0.035] md:text-[28vw]"
        >
          07
        </span>

        <div>
          <h1 className="max-w-5xl font-serif text-[clamp(2.75rem,9vw,6.5rem)] font-black leading-[0.92] tracking-[-0.035em] text-[var(--charcoal)]">
            <span
              className={`${MICRO} mb-10 flex items-center gap-4 font-sans tracking-[0.22em] text-[var(--champagne)]`}
            >
              <span aria-hidden className="h-px w-10 bg-[var(--crimson)]" />
              Week 7:
            </span>{" "}
            <span className="text-[var(--crimson)]">EDII</span> in AI
          </h1>
        </div>

        <div className="w-full">
          <div className="mt-12 h-px w-full bg-[var(--charcoal)]/15" />
          <p className="mt-6 max-w-3xl font-serif text-xl font-light italic leading-relaxed text-[var(--charcoal-light)] md:text-[1.75rem]">
            Equity, Diversity, Inclusion, and Indigeneity in AI systems
          </p>
        </div>

        <div className="w-full">
          <Unfold words={EDII} className="mt-8 w-full max-w-4xl" />
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

      {/* ==================================================================
          02 · THE PROBLEM — the vacuum struck for historical data; one
          unequal pattern carried through AI: replicated, amplified, then
          repeated at scale; the four risks.                  [quiz topic]
      ================================================================== */}
      <Slide id="mirror" border align="left">
        <Head2 eyebrow="01 / 05" kicker="The Problem:">
          AI as a Mirror of Society
        </Head2>

        <div className="w-full">
          <p className={`${LEAD} mt-9 max-w-4xl`}>
            Artificial Intelligence learns from historical data rather than
            operating in a vacuum.
          </p>
          <div aria-hidden className="mt-7 max-w-3xl">
            <Split1
              left="Operating in a vacuum"
              right="Historical data"
              strikeLeft
            />
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              When data contains societal bias, prejudice, and systemic
              inequality, AI can replicate and amplify those patterns at scale.
            </p>
            <Terms
              items={["societal bias", "prejudice", "systemic inequality"]}
            />
            <figure aria-hidden className="mt-8 w-full">
              <svg viewBox="0 0 800 176" className="w-full" fill="none">
                {/* data */}
                <rect x="46" y="70" width="22" height="70" fill="var(--charcoal)" fillOpacity="0.55" />
                <rect x="72" y="100" width="22" height="40" fill="var(--crimson)" />
                {/* AI */}
                <path d="M130 105H196" stroke="var(--charcoal)" strokeOpacity="0.45" />
                <path d={headRight(196, 105)} stroke="var(--charcoal)" strokeOpacity="0.6" />
                <text {...SVG_LABEL} x="163" y="92" textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.75">
                  AI
                </text>
                {/* replicate */}
                <rect x="236" y="70" width="22" height="70" fill="var(--charcoal)" fillOpacity="0.55" />
                <rect x="262" y="100" width="22" height="40" fill="var(--crimson)" />
                <path d="M320 105H386" stroke="var(--charcoal)" strokeOpacity="0.45" />
                <path d={headRight(386, 105)} stroke="var(--charcoal)" strokeOpacity="0.6" />
                {/* amplify */}
                <rect x="426" y="40" width="22" height="100" fill="var(--charcoal)" fillOpacity="0.55" />
                <rect x="452" y="124" width="22" height="16" fill="var(--crimson)" />
                <path d="M510 105H576" stroke="var(--charcoal)" strokeOpacity="0.45" />
                <path d={headRight(576, 105)} stroke="var(--charcoal)" strokeOpacity="0.6" />
                {/* at scale */}
                {Array.from({ length: 15 }).map((_, i) => {
                  const x = 610 + (i % 5) * 38;
                  const base = 72 + Math.floor(i / 5) * 34;
                  return (
                    <g key={i}>
                      <rect x={x} y={base - 26} width="6" height="26" fill="var(--charcoal)" fillOpacity="0.55" />
                      <rect x={x + 8} y={base - 4} width="6" height="4" fill="var(--crimson)" />
                    </g>
                  );
                })}
                {[
                  { x: 70, label: "DATA" },
                  { x: 260, label: "REPLICATE" },
                  { x: 450, label: "AMPLIFY" },
                  { x: 693, label: "AT SCALE" },
                ].map((s) => (
                  <text
                    key={s.label}
                    {...SVG_LABEL}
                    x={s.x}
                    y="170"
                    textAnchor="middle"
                    fill={s.label === "AT SCALE" ? "var(--crimson)" : "var(--charcoal)"}
                    fillOpacity={s.label === "AT SCALE" ? 1 : 0.6}
                  >
                    {s.label}
                  </text>
                ))}
              </svg>
              <Schematic />
            </figure>
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              For business leaders, biased AI creates ethical, operational,
              reputational, and regulatory risk.
            </p>
            <Steps
              items={["ethical", "operational", "reputational", "regulatory"]}
              cols="md:grid-cols-4"
              className="mt-6 max-w-4xl"
            />
          </div>
        </div>

        <Discussion2>
          Can you think of a time a brand suffered a major PR crisis due to an
          automated system or algorithm making a biased decision? How did it
          impact their bottom line?
        </Discussion2>
      </Slide>

      {/* ==================================================================
          03 · HOW ALGORITHMS LEARN BIAS — three ways in, the loop drawn
          back into the input; records teaching a model that group means
          success; a fit that serves the aggregate and misses the edge
          cases; the two fairness concepts; 99 of 100 against 4 of 10.
                                          [quiz: mirror] [quiz topic]
      ================================================================== */}
      <Slide
        id="learn-bias"
        border
        align="left"
        quizData={quiz["learn-bias"]}
      >
        <Head2 eyebrow="02 / 05" kicker="Technical Concept:">
          How Algorithms Learn Bias
        </Head2>

        <div className="w-full">
          <p className={`${LEAD} mt-9 max-w-4xl`}>
            Bias enters AI through training data bias, algorithmic bias, and
            self-reinforcing feedback loops.
          </p>
          <svg
            aria-hidden
            viewBox="0 0 800 132"
            className="mt-8 w-full max-w-5xl"
            fill="none"
          >
            <path d="M20 100H292" stroke="var(--charcoal)" strokeOpacity="0.5" />
            <path d={headRight(292, 100)} stroke="var(--charcoal)" strokeOpacity="0.6" />
            <rect x="300" y="76" width="200" height="48" stroke="var(--charcoal)" strokeOpacity="0.55" />
            <path d="M500 100H772" stroke="var(--charcoal)" strokeOpacity="0.5" />
            <path d={headRight(772, 100)} stroke="var(--charcoal)" strokeOpacity="0.6" />
            <path d="M700 100V44H100V92" stroke="var(--crimson)" strokeWidth="1.5" />
            <path d="M95 85l5 8l5-8" stroke="var(--crimson)" strokeWidth="1.5" />
            <text {...SVG_LABEL} x="400" y="34" textAnchor="middle" fill="var(--crimson)">
              SELF-REINFORCING FEEDBACK LOOPS
            </text>
            <text {...SVG_LABEL} x="20" y="124" fill="var(--charcoal)" fillOpacity="0.65">
              TRAINING DATA BIAS
            </text>
            <text {...SVG_LABEL} x="400" y="104" textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.75">
              ALGORITHMIC BIAS
            </text>
          </svg>
        </div>

        <div className="mt-12 grid w-full max-w-5xl gap-10 border-t border-[var(--charcoal)]/10 pt-8 md:grid-cols-2 md:gap-14">
          <div>
            <p className={BODY}>
              Training data bias can teach a model that historically dominant
              groups are predictors of success.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 400 168"
              className="mt-6 w-full"
              fill="none"
            >
              <text {...SVG_LABEL} x="20" y="12" fill="var(--charcoal)" fillOpacity="0.6">
                TRAINING DATA
              </text>
              {[true, true, false, true, false, true].map((dominant, i) => {
                const y = 26 + i * 19;
                return (
                  <g key={i}>
                    {dominant ? (
                      <rect x="20" y={y} width="11" height="11" fill="var(--charcoal)" fillOpacity="0.7" />
                    ) : (
                      <rect x="20.5" y={y + 0.5} width="10" height="10" stroke="var(--charcoal)" strokeOpacity="0.5" />
                    )}
                    <path d={`M38 ${y + 5.5}H104`} stroke="var(--charcoal)" strokeOpacity="0.15" />
                    {dominant ? (
                      <path d={`M112 ${y + 5}l4 4l8-9`} stroke="var(--charcoal)" strokeOpacity="0.7" strokeWidth="1.5" />
                    ) : (
                      <path d={`M112 ${y + 5.5}h12`} stroke="var(--charcoal)" strokeOpacity="0.3" />
                    )}
                  </g>
                );
              })}
              <path d="M136 79H184" stroke="var(--charcoal)" strokeOpacity="0.45" />
              <path d={headRight(184, 79)} stroke="var(--charcoal)" strokeOpacity="0.6" />
              <rect x="190" y="58" width="64" height="42" stroke="var(--charcoal)" strokeOpacity="0.55" />
              <text {...SVG_LABEL} x="222" y="83" textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.75">
                MODEL
              </text>
              <path d="M256 79H290" stroke="var(--crimson)" strokeOpacity="0.6" />
              <path d={headRight(290, 79)} stroke="var(--crimson)" strokeOpacity="0.8" />
              <rect x="300" y="73" width="12" height="12" fill="var(--crimson)" />
              <path d="M322 79l4 4l8-9" stroke="var(--crimson)" strokeWidth="2" />
              <text {...SVG_LABEL} x="300" y="108" fill="var(--crimson)">
                PREDICTORS
              </text>
              <text {...SVG_LABEL} x="300" y="122" fill="var(--crimson)">
                OF SUCCESS
              </text>
              <rect x="20" y="146" width="10" height="10" fill="var(--charcoal)" fillOpacity="0.7" />
              <text {...SVG_LABEL} x="38" y="155" fill="var(--charcoal)" fillOpacity="0.6">
                HISTORICALLY DOMINANT GROUPS
              </text>
            </svg>
          </div>

          <div>
            <p className={BODY}>
              Algorithmic bias often emerges when optimization favors aggregate
              accuracy while ignoring minority edge cases.
            </p>
            <figure aria-hidden className="mt-6 w-full">
              <svg viewBox="0 0 400 182" className="w-full" fill="none">
                {Array.from({ length: 34 }).map((_, i) => {
                  const x = 30 + hash(i + 400) * 250;
                  const y = 140 - (x - 20) * (100 / 360) + (hash(i + 470) - 0.5) * 34;
                  return (
                    <circle
                      key={i}
                      cx={x.toFixed(1)}
                      cy={y.toFixed(1)}
                      r="2.5"
                      fill="var(--charcoal)"
                      fillOpacity="0.4"
                    />
                  );
                })}
                <path d="M20 140L380 40" stroke="var(--charcoal)" strokeOpacity="0.75" strokeWidth="1.5" />
                <text {...SVG_LABEL} x="392" y="26" textAnchor="end" fill="var(--charcoal)" fillOpacity="0.65">
                  AGGREGATE ACCURACY
                </text>
                {[
                  [-8, -6],
                  [6, -9],
                  [10, 4],
                  [-3, 8],
                  [-12, 5],
                  [2, -1],
                ].map(([dx, dy]) => (
                  <circle
                    key={`${dx}-${dy}`}
                    cx={330 + dx}
                    cy={130 + dy}
                    r="2.5"
                    stroke="var(--crimson)"
                    strokeWidth="1.5"
                  />
                ))}
                <circle cx="330" cy="130" r="22" stroke="var(--crimson)" strokeDasharray="3 4" />
                <text {...SVG_LABEL} x="398" y="176" textAnchor="end" fill="var(--crimson)">
                  MINORITY EDGE CASES
                </text>
              </svg>
              <Schematic />
            </figure>
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Fairness can be assessed through concepts like demographic parity
              and equal opportunity.
            </p>
            <Steps
              items={["demographic parity", "equal opportunity"]}
              cols=""
              className="mt-6 max-w-2xl"
            />
          </div>
        </div>

        <Discussion2
          figure={
            <svg
              aria-hidden
              viewBox="0 0 600 146"
              className="w-full"
              fill="none"
            >
              {Array.from({ length: 100 }).map((_, i) => (
                <rect
                  key={i}
                  x={(i % 10) * 11}
                  y={Math.floor(i / 10) * 11}
                  width="8"
                  height="8"
                  fill={i === 99 ? "var(--crimson)" : "var(--charcoal)"}
                  fillOpacity={i === 99 ? 1 : 0.25}
                />
              ))}
              <text {...SVG_LABEL} x="0" y="126" fill="var(--charcoal)" fillOpacity="0.7">
                99 PERCENT OVERALL ACCURACY
              </text>
              {Array.from({ length: 10 }).map((_, i) => (
                <rect
                  key={i}
                  x={330 + i * 11}
                  y="99"
                  width="8"
                  height="8"
                  fill={i >= 6 ? "var(--crimson)" : "var(--charcoal)"}
                  fillOpacity={i >= 6 ? 1 : 0.25}
                />
              ))}
              <text {...SVG_LABEL} x="330" y="126" fill="var(--crimson)">
                40 PERCENT ERROR RATE
              </text>
              <text {...SVG_LABEL} x="330" y="140" fill="var(--charcoal)" fillOpacity="0.6">
                SPECIFIC MINORITY DEMOGRAPHIC
              </text>
            </svg>
          }
        >
          If an AI model achieves 99 percent overall accuracy but has a 40
          percent error rate for a specific minority demographic, is the model
          ready for deployment? Who makes that call in your organization?
        </Discussion2>
      </Slide>

      {/* ==================================================================
          04 · THE ROI OF INCLUSIVE AI — checkbox set against advantage; a
          ledger of costs and returns; a steady audited line through
          real-world conditions beside an erratic one.
                                     [quiz: learn-bias] [quiz topic]
      ================================================================== */}
      <Slide id="roi" border align="left" quizData={quiz["roi"]}>
        <Head2 eyebrow="03 / 05" kicker="Business Impact:">
          The ROI of Inclusive AI
        </Head2>

        <div className="w-full">
          <div aria-hidden className="mt-11 max-w-3xl">
            <Split1 left="Compliance checkbox" right="Competitive advantage" />
          </div>
          <p className={`${DISPLAY} mt-6 max-w-4xl`}>
            EDII in AI is not just a compliance checkbox, it is a competitive
            advantage.
          </p>
        </div>

        <div className="mt-12 grid w-full max-w-5xl gap-10 border-t border-[var(--charcoal)]/10 pt-8 md:grid-cols-2 md:gap-14">
          <div>
            <p className={BODY}>
              The cost of bias includes regulatory fines, lawsuits, customer
              distrust, and long-term brand damage.
            </p>
            <Ledger
              items={[
                "regulatory fines",
                "lawsuits",
                "customer distrust",
                "long-term brand damage",
              ]}
            />
          </div>

          <div>
            <p className={BODY}>
              The ROI of inclusion comes from stronger products, more resilient
              models, and access to underserved markets.
            </p>
            <Ledger
              gain
              items={[
                "stronger products",
                "more resilient models",
                "access to underserved markets",
              ]}
            />
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <figure aria-hidden className="w-full">
              <svg viewBox="0 0 800 158" className="w-full" fill="none">
                {(() => {
                  const xs = Array.from({ length: 33 }, (_, i) => i * 25);
                  const line = (ys: number[]) =>
                    ys
                      .map((y, i) => `${i ? "L" : "M"}${xs[i]} ${y.toFixed(1)}`)
                      .join("");
                  const steady = xs.map((_, i) => 46 + (hash(i + 3) - 0.5) * 6);
                  const erratic = xs.map(
                    (_, i) => 88 + (hash(i + 211) - 0.5) * 60,
                  );
                  return (
                    <g>
                      <path
                        d={line(erratic)}
                        stroke="var(--charcoal)"
                        strokeOpacity="0.35"
                        strokeWidth="1.5"
                      />
                      <path
                        d={line(steady)}
                        stroke="var(--crimson)"
                        strokeWidth="2"
                      />
                    </g>
                  );
                })()}
                <text {...SVG_LABEL} x="800" y="26" textAnchor="end" fill="var(--crimson)">
                  AUDITED FOR FAIRNESS
                </text>
                <path d="M0 132H800" stroke="var(--charcoal)" strokeOpacity="0.2" />
                <text {...SVG_LABEL} x="0" y="152" fill="var(--charcoal)" fillOpacity="0.6">
                  REAL-WORLD CONDITIONS
                </text>
              </svg>
              <Schematic />
            </figure>
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              Algorithms audited for fairness often perform more reliably in
              real-world conditions.
            </p>
          </div>
        </div>

        <Discussion2>
          How would you measure the ROI of investing in an AI ethics and
          diversity board for a mid-sized tech company? What KPIs would you
          track?
        </Discussion2>
      </Slide>

      {/* ==================================================================
          05 · INDIGENEITY AND DATA SOVEREIGNTY — the last I of EDII marked;
          data carried one way out of a community with the return struck;
          OCAP spelled out; raw fuel set against people.
                                            [quiz: roi] [quiz topic]
      ================================================================== */}
      <Slide
        id="data-sovereignty"
        border
        align="left"
        quizData={quiz["data-sovereignty"]}
      >
        <Head2 eyebrow="04 / 05">Indigeneity and Data Sovereignty</Head2>

        <div className="w-full">
          <Unfold words={EDII} mark={3} className="mt-10 w-full max-w-4xl" />
          <p className={`${BODY} mt-6 max-w-4xl`}>
            Indigeneity is a critical dimension of EDII, especially when AI
            systems rely on cultural or community data.
          </p>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Data colonialism occurs when data is extracted from Indigenous
              communities without consent or reciprocal benefit.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 800 148"
              className="mt-8 w-full"
              fill="none"
            >
              <circle cx="100" cy="66" r="46" stroke="var(--charcoal)" strokeOpacity="0.5" />
              <circle cx="100" cy="66" r="4" fill="var(--charcoal)" fillOpacity="0.55" />
              {Array.from({ length: 6 }).map((_, i) => {
                const a = (i / 6) * Math.PI * 2;
                return (
                  <circle
                    key={i}
                    cx={(100 + 22 * Math.cos(a)).toFixed(1)}
                    cy={(66 + 22 * Math.sin(a)).toFixed(1)}
                    r="4"
                    fill="var(--charcoal)"
                    fillOpacity="0.55"
                  />
                );
              })}
              <text {...SVG_LABEL} x="100" y="140" textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.65">
                INDIGENOUS COMMUNITIES
              </text>

              <path d="M160 50H640" stroke="var(--charcoal)" strokeOpacity="0.5" />
              <path d={headRight(640, 50)} stroke="var(--charcoal)" strokeOpacity="0.6" />
              {[240, 360, 480, 570].map((x) => (
                <rect key={x} x={x} y="44" width="12" height="12" fill="var(--charcoal)" fillOpacity="0.6" />
              ))}
              <text {...SVG_LABEL} x="400" y="34" textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.75">
                EXTRACTED WITHOUT CONSENT
              </text>

              {Array.from({ length: 9 }).map((_, i) => (
                <rect
                  key={i}
                  x={670 + (i % 3) * 18}
                  y={40 + Math.floor(i / 3) * 18}
                  width="12"
                  height="12"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                />
              ))}
              <text {...SVG_LABEL} x="691" y="140" textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.65">
                DATA
              </text>

              <path d="M640 86H160" stroke="var(--charcoal)" strokeOpacity="0.35" strokeDasharray="4 5" />
              <path d="M168 81l-8 5l8 5" stroke="var(--charcoal)" strokeOpacity="0.45" />
              <path d="M390 76l20 20M410 76l-20 20" stroke="var(--crimson)" strokeWidth="2" />
              <text {...SVG_LABEL} x="400" y="118" textAnchor="middle" fill="var(--crimson)">
                RECIPROCAL BENEFIT
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <div className={`${MICRO} text-[var(--champagne)]`}>OCAP</div>
            <Unfold
              words={["Ownership", "Control", "Access", "Possession"]}
              className="mt-5 w-full max-w-4xl"
            />
            <p className={`${BODY} mt-6 max-w-4xl`}>
              OCAP principles, Ownership, Control, Access, and Possession,
              establish that First Nations must control how their data is
              collected and used.
            </p>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <Split1
              left="Raw fuel for models"
              right="People, cultures, and sovereign rights"
            />
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              Business leaders must recognize that data represents people,
              cultures, and sovereign rights, not just raw fuel for models.
            </p>
          </div>
        </div>

        <Discussion2>
          If your company wants to train an LLM on historical cultural texts,
          including Indigenous knowledge, how do you navigate data scraping
          versus data sovereignty?
        </Discussion2>
      </Slide>

      {/* ==================================================================
          06 · MITIGATION FOR BUSINESS LEADERS — four numbered measures, each
          with its own figure: an edge case caught before release; review
          ticked as fully as the books; a human on the decision loop; an
          escalation path. The vendor's black box closes the slide.
                                [quiz: data-sovereignty] [quiz topic]
      ================================================================== */}
      <Slide
        id="mitigation"
        border
        align="left"
        quizData={quiz["mitigation"]}
      >
        <Head2 eyebrow="05 / 05" kicker="Strategy:">
          Mitigation for Business Leaders
        </Head2>

        <ol className="mt-10 w-full max-w-5xl">
          <Measure
            n={1}
            figure={
              <svg viewBox="0 0 280 104" className="w-full" fill="none">
                <circle cx="22" cy="44" r="9" stroke="var(--charcoal)" strokeOpacity="0.6" />
                <rect x="42" y="35" width="18" height="18" stroke="var(--charcoal)" strokeOpacity="0.6" />
                <path d="M81 35L91 53H71Z" stroke="var(--charcoal)" strokeOpacity="0.6" />
                <path d="M110 34L120 44L110 54L100 44Z" stroke="var(--charcoal)" strokeOpacity="0.6" />
                <path d="M130 44H160" stroke="var(--charcoal)" strokeOpacity="0.35" strokeDasharray="3 3" />
                <path d="M154 40l6 4l-6 4" stroke="var(--charcoal)" strokeOpacity="0.45" />
                <circle cx="180" cy="44" r="3" fill="var(--crimson)" />
                <circle cx="180" cy="44" r="12" stroke="var(--crimson)" />
                <path d="M242 24V78" stroke="var(--charcoal)" strokeOpacity="0.45" strokeDasharray="3 3" />
                <text {...SVG_LABEL} x="242" y="14" textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.6">
                  RELEASE
                </text>
                <text {...SVG_LABEL} x="0" y="96" fill="var(--charcoal)" fillOpacity="0.6">
                  DIVERSE TEAMS
                </text>
                <text {...SVG_LABEL} x="180" y="96" textAnchor="middle" fill="var(--crimson)">
                  EDGE CASES
                </text>
              </svg>
            }
          >
            <p className={BODY}>
              Mandate diverse teams so edge cases are more likely to be
              identified before release.
            </p>
          </Measure>

          <Measure
            n={2}
            figure={
              <svg viewBox="0 0 280 96" className="w-full" fill="none">
                <text {...SVG_LABEL} x="0" y="38" fill="var(--charcoal)" fillOpacity="0.6">
                  FINANCIAL AUDITING
                </text>
                <path d="M0 56H280" stroke="var(--charcoal)" strokeOpacity="0.1" />
                <text {...SVG_LABEL} x="0" y="80" fill="var(--crimson)">
                  ALGORITHMIC REVIEW
                </text>
                {[176, 202, 228, 254].map((x) => (
                  <g key={x}>
                    <path d={`M${x} 32l4 4l8-9`} stroke="var(--charcoal)" strokeOpacity="0.6" strokeWidth="1.5" />
                    <path d={`M${x} 74l4 4l8-9`} stroke="var(--crimson)" strokeWidth="1.5" />
                  </g>
                ))}
              </svg>
            }
          >
            <p className={BODY}>
              Implement independent AI audits and treat algorithmic review as
              seriously as financial auditing.
            </p>
          </Measure>

          <Measure
            n={3}
            figure={
              <svg viewBox="0 0 280 112" className="w-full" fill="none">
                <rect x="30" y="20" width="220" height="60" rx="30" stroke="var(--charcoal)" strokeOpacity="0.45" />
                <path d="M245 46l5 7l5-7" stroke="var(--charcoal)" strokeOpacity="0.6" />
                <path d="M25 54l5-7l5 7" stroke="var(--charcoal)" strokeOpacity="0.6" />
                <circle cx="140" cy="20" r="13" fill="var(--background)" />
                <circle cx="140" cy="15" r="4" fill="var(--crimson)" />
                <path d="M131 28a9 8 0 0 1 18 0Z" fill="var(--crimson)" />
                <rect x="134" y="74" width="12" height="12" fill="var(--charcoal)" fillOpacity="0.7" />
                <text {...SVG_LABEL} x="140" y="54" textAnchor="middle" fill="var(--crimson)">
                  HUMANS IN THE LOOP
                </text>
                <text {...SVG_LABEL} x="140" y="106" textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.6">
                  HIGH-STAKES DECISIONS
                </text>
              </svg>
            }
          >
            <p className={BODY}>
              Keep humans in the loop for high-stakes decisions in hiring,
              lending, healthcare, and public services.
            </p>
            <Terms
              items={["hiring", "lending", "healthcare", "public services"]}
            />
          </Measure>

          <Measure
            n={4}
            figure={
              <svg viewBox="0 0 280 114" className="w-full" fill="none">
                <path d="M24 82H80V56H150V30H222" stroke="var(--crimson)" strokeWidth="2" />
                <path d={headRight(230, 30)} stroke="var(--crimson)" strokeWidth="2" />
                <text {...SVG_LABEL} x="0" y="110" fill="var(--crimson)">
                  ESCALATION PATHS
                </text>
              </svg>
            }
          >
            <p className={BODY}>
              Establish transparent governance with clear accountability,
              escalation paths, and ethical review standards.
            </p>
            <Terms
              items={[
                "clear accountability",
                "escalation paths",
                "ethical review standards",
              ]}
            />
          </Measure>
        </ol>

        <Discussion2
          figure={
            <svg
              aria-hidden
              viewBox="0 0 300 76"
              className="w-full max-w-[300px]"
              fill="none"
            >
              <rect x="0" y="6" width="64" height="64" fill="var(--charcoal)" />
              <text
                x="32"
                y="52"
                textAnchor="middle"
                fontSize="38"
                fontFamily="var(--font-serif), serif"
                fontWeight="700"
                fill="var(--crimson)"
              >
                ?
              </text>
              <text {...SVG_LABEL} x="84" y="34" fill="var(--charcoal)" fillOpacity="0.75">
                BLACK-BOX AI SOLUTION
              </text>
              <text {...SVG_LABEL} x="84" y="52" fill="var(--charcoal)" fillOpacity="0.5">
                HR DEPARTMENT
              </text>
            </svg>
          }
        >
          As a future business leader, what is the very first question you will
          ask a vendor selling you a black-box AI solution for your HR
          department?
        </Discussion2>
      </Slide>

      {/* ==================================================================
          07 · CLOSE — the title and its acronym again, then the colophon.
          Holds the quiz on the mitigation strategies.  [quiz: mitigation]
      ================================================================== */}
      <Slide
        id="close"
        border
        align="left"
        className="relative overflow-hidden"
        quizData={quiz["close"]}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-10 right-0 select-none font-serif text-[24vw] font-black leading-none text-[var(--charcoal)]/[0.03]"
        >
          07
        </span>

        <div>
          <div
            className={`${MICRO} flex items-center gap-4 text-[var(--champagne)]`}
          >
            <span className="h-px w-10 bg-[var(--crimson)]" />
            End of Week 07
          </div>
        </div>

        <div>
          <p
            aria-hidden
            // Headings take their family from globals.css, which Tailwind's
            // font-serif does not match; borrow it so this echoes the h1.
            style={{ fontFamily: "var(--font-serif), serif" }}
            className="mt-10 text-[clamp(2.5rem,7vw,5rem)] font-black leading-[0.92] tracking-[-0.035em] text-[var(--charcoal)]"
          >
            <span className="text-[var(--crimson)]">EDII</span> in AI
          </p>
        </div>

        <div className="w-full">
          <Unfold words={EDII} className="mt-10 w-full max-w-4xl" />
        </div>

        <div className="w-full">
          <div className="mt-14 flex w-full max-w-4xl flex-wrap items-baseline justify-between gap-4 border-t border-[var(--charcoal)]/12 pt-5">
            <span className={`${MICRO} text-[var(--champagne)]`}>
              Davood Wadi, PhD
            </span>
            <span
              className={`${MICRO} font-normal text-[var(--charcoal-light)]/55`}
            >
              BUSI 654 · Applications of AI in Business
            </span>
          </div>
        </div>
      </Slide>
    </SlideDeck>
  );
}
