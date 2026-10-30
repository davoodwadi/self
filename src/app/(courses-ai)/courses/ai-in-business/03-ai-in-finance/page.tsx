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
  Discussion1,
  DISPLAY,
  Head1,
  LEAD,
  MICRO,
  ModulePlate2,
  pad,
  RULED,
  Split1,
  Steps,
  SVG_LABEL,
  TAG,
  Terms,
  Verdict,
} from "../_visuals/kit";

// ============================================================================
// WEEK 03: APPLICATIONS OF AI IN FINANCE
// ============================================================================
// Same deck grammar as Weeks 01 and 02: every slide is hand-composed for its
// own argument, with hairlines instead of boxes and crimson marking one thing.
//
// Sentences are transcribed verbatim from content.md. Figures carry only words
// that already appear in the slide's sentences.
//
// Quizzes: `Slide` renders `quizData` BEFORE its section. content.md marks the
// topic to be tested with [quiz], so each quiz is attached to the slide that
// FOLLOWS that topic and only tests material the student has already passed.
// Where the following slide is a module plate, the plate carries the quiz.
// ============================================================================

const quiz = createCourseQuizLookup(quizzes as CourseQuiz[]);

export default function Week03Finance() {
  return (
    <SlideDeck>
      <ScrollProgress label="Week 03" />

      {/* ==================================================================
          01. TITLE: masthead with the five things the subtitle says
          intelligent systems reshape, set in a ruled row.
      ================================================================== */}
      <Slide id="title" align="left" className="relative overflow-hidden">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 select-none font-serif text-[36vw] font-black leading-none text-[var(--charcoal)]/[0.035] md:text-[28vw]"
        >
          03
        </span>

        <div>
          <div
            className={`${MICRO} flex items-center gap-4 text-[var(--champagne)]`}
          >
            <span className="h-px w-10 bg-[var(--crimson)]" />
            Week 03 in Applications of AI in Business
          </div>
        </div>

        <div>
          <h1 className="mt-10 max-w-5xl font-serif text-[clamp(2.5rem,7.5vw,5.75rem)] font-semibold leading-[0.92] tracking-[-0.035em] text-[var(--charcoal)]">
            Applications of AI in{" "}
            <span className="text-[var(--crimson)]">Finance</span>
          </h1>
        </div>

        <div className="w-full">
          <div className="mt-12 h-px w-full bg-[var(--charcoal)]/15" />
          <p className="mt-6 max-w-3xl font-serif text-xl font-light italic leading-relaxed text-[var(--charcoal-light)] md:text-[1.75rem]">
            How intelligent systems reshape credit, control, markets,
            operations, and governance
          </p>
          <div
            aria-hidden
            className="mt-8 grid max-w-3xl grid-cols-2 border-l border-[var(--charcoal)]/12 sm:grid-cols-3 md:grid-cols-5"
          >
            {["credit", "control", "markets", "operations", "governance"].map(
              (domain, i) => (
                <span
                  key={domain}
                  className="border-b border-r border-[var(--charcoal)]/12 px-4 py-3"
                >
                  <span className={`${MICRO} block text-[var(--crimson)]`}>
                    {pad(i + 1)}
                  </span>
                  <span
                    className={`${TAG} mt-1 block text-[var(--charcoal-light)]/65`}
                  >
                    {domain}
                  </span>
                </span>
              ),
            )}
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
              BUSI 654. Applications of AI in Business
            </span>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          02. WHY FINANCE BECAME AN AI DOMAIN: the six repeated decisions
          as a ruled row. Three signal sources drawn as dense tick lanes.
          One small error fanning out to what it is linked to.
                                                        [quiz topic]
      ================================================================== */}
      <Slide id="why-finance-ai" border align="left">
        <Head1 eyebrow="Opening">Why Finance Became an AI Domain</Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Finance runs on repeated decisions under uncertainty: approve,
            price, monitor, flag, hedge, and allocate.
          </p>
          <Steps
            items={["approve", "price", "monitor", "flag", "hedge", "allocate"]}
            cols="sm:grid-cols-3 md:grid-cols-6"
            className="mt-6 max-w-5xl"
          />
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-3xl`}>
              Digital channels, machine-readable records, and high-frequency
              workflows create dense operational signals.
            </p>
            <figure className="mt-6 w-full">
              <svg
                role="img"
                aria-label="Digital channels, machine-readable records, and high-frequency workflows generating dense operational signals."
                viewBox="0 0 800 116"
                className="w-full"
                fill="none"
              >
                <title>
                  Digital channels, machine-readable records, and high-frequency
                  workflows generating dense operational signals.
                </title>
                {[
                  "DIGITAL CHANNELS",
                  "MACHINE-READABLE RECORDS",
                  "HIGH-FREQUENCY WORKFLOWS",
                ].map((lane, l) => {
                  const y = 24 + l * 34;
                  return (
                    <g key={lane}>
                      <text
                        {...SVG_LABEL}
                        x="4"
                        y={y + 3.5}
                        fill="var(--charcoal)"
                        fillOpacity="0.6"
                      >
                        {lane}
                      </text>
                      <path
                        d={`M228 ${y}H594`}
                        stroke="var(--charcoal)"
                        strokeOpacity="0.14"
                      />
                      {Array.from({ length: 46 }).map((_, i) => {
                        const x = +(232 + i * 7.8).toFixed(2);
                        const h = [4, 8, 3, 9, 5, 7, 4, 6][(i + l * 3) % 8];
                        const active = i >= 38;
                        return (
                          <path
                            key={i}
                            d={`M${x} ${y - h}v${h * 2}`}
                            stroke={active ? "var(--crimson)" : "var(--charcoal)"}
                            strokeOpacity={active ? "0.8" : "0.35"}
                            strokeWidth={active ? "1.25" : "1"}
                          />
                        );
                      })}
                      <path
                        d={`M594 ${y} C 614 ${y}, 618 58, 636 58`}
                        stroke="var(--crimson)"
                        strokeOpacity="0.55"
                      />
                    </g>
                  );
                })}
                <path
                  d="M636 58H656"
                  stroke="var(--crimson)"
                  strokeWidth="1.5"
                />
                <path
                  d="M648 53L656 58L648 63"
                  stroke="var(--crimson)"
                  strokeWidth="1.5"
                />
                <rect
                  x="656"
                  y="30"
                  width="140"
                  height="56"
                  fill="var(--crimson)"
                  fillOpacity="0.06"
                  stroke="var(--crimson)"
                  strokeWidth="1.25"
                />
                <text
                  {...SVG_LABEL}
                  x="726"
                  y="54"
                  textAnchor="middle"
                  fill="var(--crimson)"
                >
                  DENSE OPERATIONAL
                </text>
                <text
                  {...SVG_LABEL}
                  x="726"
                  y="69"
                  textAnchor="middle"
                  fill="var(--crimson)"
                >
                  SIGNALS
                </text>
              </svg>
            </figure>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 grid w-full max-w-5xl items-center gap-8 md:grid-cols-[1fr_24rem] md:gap-12">
            <p className={DISPLAY}>
              Small model errors can scale quickly because financial systems
              are linked to capital, compliance, and customer trust.
            </p>
            <svg
              role="img"
              aria-label="Small model errors scaling quickly across financial systems linked to capital, compliance, and customer trust."
              viewBox="0 0 400 148"
              className="w-full max-w-[24rem]"
              fill="none"
            >
              <title>
                Small model errors scaling quickly across financial systems
                linked to capital, compliance, and customer trust.
              </title>
              <path
                d="M62 74 C 124 74, 156 28, 224 28 V120 C 156 120, 124 74, 62 74 Z"
                fill="var(--crimson)"
                fillOpacity="0.05"
              />
              {[
                { y: 28, label: "CAPITAL" },
                { y: 74, label: "COMPLIANCE" },
                { y: 120, label: "CUSTOMER TRUST" },
              ].map((n) => (
                <g key={n.label}>
                  <path
                    d={`M62 74 C 124 74, 156 ${n.y}, 224 ${n.y}`}
                    stroke="var(--crimson)"
                    strokeOpacity="0.65"
                    strokeWidth="1.25"
                  />
                  <path
                    d={`M217 ${n.y - 4}L224 ${n.y}L217 ${n.y + 4}`}
                    stroke="var(--crimson)"
                    strokeWidth="1.25"
                  />
                  <circle
                    cx="234"
                    cy={n.y}
                    r="8"
                    fill="var(--crimson)"
                    fillOpacity="0.12"
                    stroke="var(--crimson)"
                    strokeWidth="1.5"
                  />
                  <text
                    {...SVG_LABEL}
                    x="252"
                    y={n.y + 3.5}
                    fill="var(--charcoal)"
                    fillOpacity="0.75"
                  >
                    {n.label}
                  </text>
                </g>
              ))}
              <circle
                cx="54"
                cy="74"
                r="8"
                stroke="var(--crimson)"
                strokeOpacity="0.4"
                strokeDasharray="2 2"
              />
              <circle cx="54" cy="74" r="3.5" fill="var(--crimson)" />
              <text
                {...SVG_LABEL}
                x="54"
                y="102"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                SMALL MODEL
              </text>
              <text
                {...SVG_LABEL}
                x="54"
                y="116"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                ERRORS
              </text>
            </svg>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          03. DECISION ARCHITECTURE: five functions, each a lane turning
          information into decisions. Three tests for AI. Judgment set
          against opacity.                        [quiz: why-finance-ai]
      ================================================================== */}
      <Slide
        id="decision-architecture"
        border
        align="left"
        quizData={quiz["decision-architecture"]}
      >
        <Head1 eyebrow="Information into decisions">
          The Financial Firm as a Decision Architecture
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Front office, risk, operations, compliance, and finance each
            transform information into decisions.
          </p>
          <svg
            role="img"
            aria-label="Front office, risk, operations, compliance, and finance each transforming incoming information into decisions."
            viewBox="0 0 800 204"
            className="mt-7 w-full max-w-5xl"
            fill="none"
          >
            <title>
              Front office, risk, operations, compliance, and finance each
              transforming incoming information into decisions.
            </title>
            <text
              {...SVG_LABEL}
              x="84"
              y="14"
              textAnchor="middle"
              fill="var(--charcoal)"
              fillOpacity="0.5"
            >
              INFORMATION
            </text>
            <text
              {...SVG_LABEL}
              x="400"
              y="14"
              textAnchor="middle"
              fill="var(--charcoal)"
              fillOpacity="0.5"
            >
              TRANSFORM
            </text>
            <text
              {...SVG_LABEL}
              x="706"
              y="14"
              textAnchor="middle"
              fill="var(--crimson)"
            >
              DECISIONS
            </text>
            {["FRONT OFFICE", "RISK", "OPERATIONS", "COMPLIANCE", "FINANCE"].map(
              (fn, i) => {
                const y = 44 + i * 36;
                return (
                  <g key={fn}>
                    {/* Incoming information signals */}
                    {[0, 1, 2].map((d) => (
                      <circle
                        key={d}
                        cx={52 + d * 16}
                        cy={y}
                        r="3"
                        fill="var(--charcoal)"
                        fillOpacity={0.25 + d * 0.15}
                      />
                    ))}
                    <path
                      d={`M100 ${y}H296`}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.25"
                    />
                    <path
                      d={`M289 ${y - 4}L296 ${y}L289 ${y + 4}`}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.45"
                    />
                    {/* Function node */}
                    <rect
                      x="296"
                      y={y - 13}
                      width="208"
                      height="26"
                      fill="var(--surface)"
                      stroke="var(--charcoal)"
                      strokeOpacity="0.35"
                    />
                    <text
                      {...SVG_LABEL}
                      x="400"
                      y={y + 3.5}
                      textAnchor="middle"
                      fill="var(--charcoal)"
                      fillOpacity="0.8"
                    >
                      {fn}
                    </text>
                    {/* Transformed into decision */}
                    <path
                      d={`M504 ${y}H698`}
                      stroke="var(--crimson)"
                      strokeOpacity="0.55"
                      strokeWidth="1.25"
                    />
                    <path
                      d={`M691 ${y - 4}L698 ${y}L691 ${y + 4}`}
                      stroke="var(--crimson)"
                      strokeWidth="1.25"
                    />
                    <rect
                      x="698"
                      y={y - 7}
                      width="14"
                      height="14"
                      fill="var(--crimson)"
                    />
                  </g>
                );
              },
            )}
          </svg>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-3xl`}>
              AI matters when it improves the speed, consistency, or quality of
              those decisions.
            </p>
            <Steps
              items={["speed", "consistency", "quality"]}
              cols="grid-cols-3"
              className="mt-6 max-w-2xl"
            />
          </div>
        </div>

        <div className="w-full">
          <div className="mt-14 w-full max-w-5xl">
            <p className={`${DISPLAY} max-w-4xl`}>
              The strategic question is where machine assistance strengthens
              judgment and where it creates unacceptable opacity.
            </p>
            <div className="mt-6">
              <Split1
                left="Strengthens judgment"
                right="Unacceptable opacity"
              />
            </div>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          04. VALUE CREATION: revenue, cost and risk as three ruled rows,
          each carrying its own sources of gain.
      ================================================================== */}
      <Slide id="value-creation" border align="left">
        <Head1 eyebrow="Where the value comes from">
          Value Creation in Finance
        </Head1>

        <ol className="mt-10 w-full max-w-5xl">
          {[
            {
              word: "Revenue",
              line: "Revenue gains come from better pricing, cross-sell, retention, and portfolio construction.",
              terms: ["pricing", "cross-sell", "retention", "portfolio construction"],
            },
            {
              word: "Cost",
              line: "Cost gains come from automation in onboarding, servicing, reconciliation, and investigation workflows.",
              terms: ["onboarding", "servicing", "reconciliation", "investigation workflows"],
            },
            {
              word: "Risk",
              line: "Risk gains come from earlier detection of fraud, credit deterioration, model drift, and control failures.",
              terms: ["fraud", "credit deterioration", "model drift", "control failures"],
            },
          ].map((row, i) => (
            <li key={row.word} className="block">
              <div className="grid gap-4 border-t border-[var(--charcoal)]/12 py-8 md:grid-cols-[12rem_1fr] md:gap-12">
                <div aria-hidden>
                  <span className={`${MICRO} block text-[var(--champagne)]`}>
                    {pad(i + 1)}
                  </span>
                  <span
                    className={`mt-2 block font-serif text-[2.25rem] font-black leading-none tracking-[-0.03em] ${
                      i === 2
                        ? "text-[var(--crimson)]"
                        : "text-[var(--charcoal)]"
                    }`}
                  >
                    {row.word}
                  </span>
                </div>
                <div>
                  <p className={BODY}>{row.line}</p>
                  <Terms items={row.terms} />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Slide>

      <ModulePlate2
        id="module-1"
        numeral="I"
        title="Foundations"
        lines={[
          "This module frames finance as a prediction, classification, optimization, and documentation domain.",
          "The goal is to distinguish promising use cases from cases where AI adds complexity without improving decisions.",
        ]}
      />

      {/* ==================================================================
          06. DATA TYPES AND SIGNAL QUALITY: the structured table. Four
          richer forms drawn as glyphs. Then the three data disciplines set
          ahead of model novelty.
      ================================================================== */}
      <Slide id="data-signal-quality" border align="left">
        <Head1 eyebrow="What the models read">
          Data Types and Signal Quality in Financial Services
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Structured records such as transactions, bureau files, contracts,
            claims, and market data remain foundational.
          </p>
          <div
            aria-hidden
            className="mt-7 grid w-full max-w-5xl grid-cols-2 border-l border-t border-[var(--charcoal)]/20 sm:grid-cols-3 md:grid-cols-5"
          >
            {[
              "transactions",
              "bureau files",
              "contracts",
              "claims",
              "market data",
            ].map((col, c) => (
              <div
                key={col}
                className="border-b border-r border-[var(--charcoal)]/15 px-3.5 py-3"
              >
                <span className={`${TAG} block text-[var(--charcoal-light)]/80`}>
                  {col}
                </span>
                <div className="mt-3 space-y-2">
                  {[0, 1, 2].map((r) => (
                    <span
                      key={r}
                      className="block h-1.5 bg-[var(--charcoal)]/15"
                      style={{ width: `${45 + ((r * 3 + c * 5) % 5) * 11}%` }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-3xl`}>
              Text, voice, document images, and relationship graphs expand what
              firms can monitor and automate.
            </p>
            <figure className="mt-7 w-full max-w-5xl">
              <svg
                role="img"
                aria-label="Text, voice, document images, and relationship graphs expanding what financial firms can monitor and automate."
                viewBox="0 0 800 132"
                className="w-full"
                fill="none"
              >
                <title>
                  Text, voice, document images, and relationship graphs
                  expanding what financial firms can monitor and automate.
                </title>
                {/* Panel 1: Text */}
                <rect
                  x="8"
                  y="14"
                  width="124"
                  height="74"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.25"
                />
                {[88, 72, 96, 56].map((w, i) => (
                  <path
                    key={i}
                    d={`M22 ${30 + i * 13}H${22 + w}`}
                    stroke="var(--charcoal)"
                    strokeOpacity="0.55"
                    strokeWidth="1.25"
                  />
                ))}
                <text
                  {...SVG_LABEL}
                  x="70"
                  y="112"
                  textAnchor="middle"
                  fill="var(--charcoal)"
                  fillOpacity="0.7"
                >
                  TEXT
                </text>

                {/* Panel 2: Voice */}
                <rect
                  x="152"
                  y="14"
                  width="124"
                  height="74"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.25"
                />
                {[8, 16, 28, 12, 36, 22, 10, 30, 38, 14, 24, 10, 18, 8].map(
                  (h, i) => {
                    const x = +(168 + i * 6.8).toFixed(2);
                    return (
                      <path
                        key={i}
                        d={`M${x} ${51 - h / 2}v${h}`}
                        stroke="var(--charcoal)"
                        strokeOpacity="0.6"
                        strokeWidth="1.25"
                      />
                    );
                  },
                )}
                <text
                  {...SVG_LABEL}
                  x="214"
                  y="112"
                  textAnchor="middle"
                  fill="var(--charcoal)"
                  fillOpacity="0.7"
                >
                  VOICE
                </text>

                {/* Panel 3: Document images */}
                <rect
                  x="296"
                  y="14"
                  width="124"
                  height="74"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.25"
                />
                <rect
                  x="332"
                  y="24"
                  width="52"
                  height="54"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.55"
                />
                <rect
                  x="339"
                  y="31"
                  width="38"
                  height="20"
                  fill="var(--charcoal)"
                  fillOpacity="0.18"
                />
                <path
                  d="M339 59H377M339 67H366"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.45"
                />
                <text
                  {...SVG_LABEL}
                  x="358"
                  y="112"
                  textAnchor="middle"
                  fill="var(--charcoal)"
                  fillOpacity="0.7"
                >
                  DOCUMENT IMAGES
                </text>

                {/* Panel 4: Relationship graphs */}
                <rect
                  x="440"
                  y="14"
                  width="124"
                  height="74"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.25"
                />
                <path
                  d="M466 66L496 30L538 48L510 70L466 66M496 30L510 70"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.45"
                />
                {[
                  [466, 66],
                  [496, 30],
                  [538, 48],
                  [510, 70],
                ].map(([x, y]) => (
                  <circle
                    key={`${x}-${y}`}
                    cx={x}
                    cy={y}
                    r="4"
                    fill="var(--surface)"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.65"
                  />
                ))}
                <text
                  {...SVG_LABEL}
                  x="502"
                  y="112"
                  textAnchor="middle"
                  fill="var(--charcoal)"
                  fillOpacity="0.7"
                >
                  RELATIONSHIP GRAPHS
                </text>

                {/* Expansion arrow into Monitor and Automate */}
                <path
                  d="M578 24H590V78H578M590 51H632"
                  stroke="var(--crimson)"
                  strokeWidth="1.5"
                />
                <path
                  d="M625 46L632 51L625 56"
                  stroke="var(--crimson)"
                  strokeWidth="1.5"
                />
                <rect
                  x="632"
                  y="20"
                  width="160"
                  height="62"
                  fill="var(--crimson)"
                  fillOpacity="0.06"
                  stroke="var(--crimson)"
                  strokeWidth="1.5"
                />
                <text
                  {...SVG_LABEL}
                  x="712"
                  y="47"
                  textAnchor="middle"
                  fill="var(--crimson)"
                >
                  MONITOR AND
                </text>
                <text
                  {...SVG_LABEL}
                  x="712"
                  y="63"
                  textAnchor="middle"
                  fill="var(--crimson)"
                >
                  AUTOMATE
                </text>
              </svg>
            </figure>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <p className={`${DISPLAY} max-w-4xl`}>
              In finance, data lineage, timestamp quality, and entity
              resolution often matter more than model novelty.
            </p>
            <div
              aria-hidden
              className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3"
            >
              <div className="space-y-1.5">
                {["data lineage", "timestamp quality", "entity resolution"].map(
                  (d) => (
                    <div
                      key={d}
                      className="font-serif text-[0.9375rem] italic tracking-normal text-[var(--crimson)]"
                    >
                      {d}
                    </div>
                  ),
                )}
              </div>
              <span className="font-serif text-4xl font-light text-[var(--charcoal)]/35">
                &gt;
              </span>
              <span className="font-serif text-[0.9375rem] italic tracking-normal text-[var(--charcoal-light)]/45">
                model novelty
              </span>
            </div>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          07. MATCHING METHOD TO TASK: three method families as ruled rows,
          each with the tasks it supports. Generative models carry the one
          struck tag.                                     [quiz topic]
      ================================================================== */}
      <Slide id="method-to-task" border align="left">
        <Head1 eyebrow="The right tool for the task">
          Matching Method to Financial Task
        </Head1>

        <ol className="mt-10 w-full max-w-5xl">
          {[
            {
              method: "Supervised learning",
              line: "Supervised learning supports default prediction, fraud scoring, churn estimation, and document classification.",
              tasks: [
                "default prediction",
                "fraud scoring",
                "churn estimation",
                "document classification",
              ],
              not: "",
            },
            {
              method: "Unsupervised methods",
              line: "Unsupervised methods help surface anomalies, clusters, and unusual network behavior when labels are weak.",
              tasks: ["anomalies", "clusters", "unusual network behavior"],
              not: "",
            },
            {
              method: "Generative models",
              line: "Generative models support summarization, drafting, extraction, scenario narration, and analyst copilots rather than final authority.",
              tasks: [
                "summarization",
                "drafting",
                "extraction",
                "scenario narration",
                "analyst copilots",
              ],
              not: "final authority",
            },
          ].map((row, i) => (
            <li key={row.method} className="block">
              <div className="grid gap-4 border-t border-[var(--charcoal)]/12 py-8 md:grid-cols-[13rem_1fr] md:gap-12">
                <div aria-hidden>
                  <span className={`${MICRO} block text-[var(--champagne)]`}>
                    {pad(i + 1)}
                  </span>
                  <span className="mt-2 block font-serif text-2xl font-bold leading-tight tracking-[-0.015em] text-[var(--charcoal)]">
                    {row.method}
                  </span>
                </div>
                <div>
                  <p className={BODY}>{row.line}</p>
                  <div aria-hidden className="mt-5 flex flex-wrap gap-2">
                    {row.tasks.map((t) => (
                      <span
                        key={t}
                        className={`${TAG} border border-[var(--charcoal)]/15 px-2.5 py-1.5 text-[var(--charcoal-light)]/70`}
                      >
                        {t}
                      </span>
                    ))}
                    {row.not && (
                      <span
                        className={`${TAG} border border-[var(--crimson)]/45 px-2.5 py-1.5 text-[var(--crimson)] [text-decoration-line:line-through]`}
                      >
                        {row.not}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Slide>

      {/* ==================================================================
          08. HUMAN JUDGMENT: one decision branching into its three
          consequences. The three conditions for oversight. Automation with
          the escalation path drawn off it.        [quiz: method-to-task]
      ================================================================== */}
      <Slide
        id="human-judgment"
        border
        align="left"
        quizData={quiz["human-judgment"]}
      >
        <Head1 eyebrow="High stakes" signal>
          Human Judgment in High-Stakes Finance
        </Head1>

        <div className="mt-10 grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1fr_22rem] md:gap-14">
          <div>
            <p className={BODY}>
              High-value financial decisions are rarely one-shot predictions.
              They carry legal, reputational, and capital consequences.
            </p>
          </div>
          <div>
            <svg
              role="img"
              aria-label="High-value financial decisions branching into legal, reputational, and capital consequences."
              viewBox="0 0 400 120"
              className="w-full"
              fill="none"
            >
              <title>
                High-value financial decisions branching into legal,
                reputational, and capital consequences.
              </title>
              <text
                {...SVG_LABEL}
                x="284"
                y="16"
                fill="var(--charcoal)"
                fillOpacity="0.5"
              >
                CONSEQUENCES
              </text>
              {[
                { y: 40, label: "LEGAL" },
                { y: 72, label: "REPUTATIONAL" },
                { y: 104, label: "CAPITAL" },
              ].map((c) => (
                <g key={c.label}>
                  <path
                    d={`M108 72 C 168 72, 196 ${c.y}, 264 ${c.y}`}
                    stroke="var(--crimson)"
                    strokeOpacity="0.6"
                    strokeWidth="1.25"
                  />
                  <path
                    d={`M257 ${c.y - 4}L264 ${c.y}L257 ${c.y + 4}`}
                    stroke="var(--crimson)"
                    strokeWidth="1.25"
                  />
                  <circle cx="270" cy={c.y} r="5" fill="var(--crimson)" />
                  <text
                    {...SVG_LABEL}
                    x="284"
                    y={c.y + 3.5}
                    fill="var(--charcoal)"
                    fillOpacity="0.75"
                  >
                    {c.label}
                  </text>
                </g>
              ))}
              <rect
                x="12"
                y="52"
                width="96"
                height="40"
                fill="var(--surface)"
                stroke="var(--charcoal)"
                strokeOpacity="0.55"
              />
              <text
                {...SVG_LABEL}
                x="60"
                y="69"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.75"
              >
                HIGH-VALUE
              </text>
              <text
                {...SVG_LABEL}
                x="60"
                y="83"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.75"
              >
                DECISIONS
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <div className={`${MICRO} text-[var(--crimson)]`}>
              Human oversight
            </div>
            <p className={`${BODY} mt-4 max-w-4xl`}>
              Human oversight is most important when exceptions are novel,
              customers are vulnerable, or adverse outcomes are hard to
              reverse.
            </p>
            <ul
              aria-hidden
              className="mt-5 grid gap-3 font-serif text-[0.9375rem] italic tracking-normal text-[var(--charcoal-light)]/70 md:grid-cols-3"
            >
              {[
                "exceptions are novel",
                "customers are vulnerable",
                "adverse outcomes are hard to reverse",
              ].map((c) => (
                <li
                  key={c}
                  className="flex items-start gap-3 border-t border-[var(--charcoal)]/12 pt-3"
                >
                  <span className="mt-[3px] h-2.5 w-2.5 shrink-0 bg-[var(--crimson)]" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <p className={`${DISPLAY} max-w-4xl`}>
              Effective design clarifies escalation paths instead of assuming
              automation is the objective.
            </p>
            <svg
              role="img"
              aria-label="Effective design clarifying crimson escalation paths branching from a routine automation lane."
              viewBox="0 0 800 96"
              className="mt-7 w-full"
              fill="none"
            >
              <title>
                Effective design clarifying crimson escalation paths branching
                from a routine automation lane.
              </title>
              <circle
                cx="30"
                cy="64"
                r="6"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              />
              <path
                d="M36 64H746"
                stroke="var(--charcoal)"
                strokeOpacity="0.3"
                strokeDasharray="4 4"
              />
              <path
                d="M739 59L746 64L739 69"
                stroke="var(--charcoal)"
                strokeOpacity="0.45"
              />
              <circle
                cx="752"
                cy="64"
                r="6"
                stroke="var(--charcoal)"
                strokeOpacity="0.55"
              />
              <circle cx="340" cy="64" r="4" fill="var(--crimson)" />
              <path
                d="M340 64 C 396 64, 412 28, 468 28 H744"
                stroke="var(--crimson)"
                strokeWidth="1.5"
              />
              <path
                d="M737 23L744 28L737 33"
                stroke="var(--crimson)"
                strokeWidth="1.5"
              />
              <circle cx="752" cy="28" r="7" fill="var(--crimson)" />
              <text
                {...SVG_LABEL}
                x="180"
                y="84"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.55"
              >
                AUTOMATION
              </text>
              <text
                {...SVG_LABEL}
                x="596"
                y="18"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                ESCALATION PATHS
              </text>
            </svg>
          </div>
        </div>
      </Slide>

      <ModulePlate2
        id="module-2"
        numeral="II"
        title="Credit and Lending"
        lines={[
          "This module examines how AI changes origination, underwriting, portfolio monitoring, and collections.",
          "The managerial issue is balancing growth, default control, fairness, and explainability.",
        ]}
      />

      {/* ==================================================================
          10. CREDIT SCORING: a static scorecard beside three richer
          pattern layers. Applicants ordered by risk and cut into approve,
          review and decline. Three conditions on predictive power.
                                                        [quiz topic]
      ================================================================== */}
      <Slide id="credit-scoring" border align="left">
        <Head1 eyebrow="Beyond the scorecard">
          Credit Scoring Beyond Static Rules
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Modern scoring systems can incorporate richer behavioral,
            transactional, and application-level patterns than traditional
            scorecards alone.
          </p>
        </div>

        <div className="mt-9 grid w-full max-w-5xl gap-10 md:grid-cols-[16rem_1fr] md:gap-0">
          <div aria-hidden className="md:pr-12">
            <div className={`${MICRO} text-[var(--charcoal-light)]/55`}>
              Traditional scorecards
            </div>
            <div className="mt-4 border-t border-[var(--charcoal)]/25">
              {[62, 48, 74, 40, 56].map((w, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[1fr_2.25rem] items-center gap-3 border-b border-[var(--charcoal)]/8 py-2"
                >
                  <span
                    className="block h-1.5 bg-[var(--charcoal)]/15"
                    style={{ width: `${w}%` }}
                  />
                  <span className="block h-4 border border-[var(--charcoal)]/20" />
                </div>
              ))}
            </div>
          </div>
          <div className="md:border-l md:border-[var(--charcoal)]/12 md:pl-12">
            <div className={`${MICRO} text-[var(--crimson)]`}>
              Modern scoring systems
            </div>
            <svg
              role="img"
              aria-label="Modern scoring systems incorporating behavioral, transactional, and application-level patterns."
              viewBox="0 0 400 124"
              className="mt-4 w-full"
              fill="none"
            >
              <title>
                Modern scoring systems incorporating behavioral, transactional,
                and application-level patterns.
              </title>
              {["BEHAVIORAL", "TRANSACTIONAL", "APPLICATION-LEVEL"].map(
                (layer, l) => {
                  const y = 22 + l * 40;
                  return (
                    <g key={layer}>
                      <text
                        {...SVG_LABEL}
                        x="4"
                        y={y + 3.5}
                        fill="var(--charcoal)"
                        fillOpacity="0.65"
                      >
                        {layer}
                      </text>
                      {l === 0 && (
                        <path
                          d={`M180 ${y}${[0, 1, 2, 3, 4, 5, 6]
                            .map(
                              (k) =>
                                ` Q ${194 + k * 28} ${y + (k % 2 ? 11 : -11)}, ${208 + k * 28} ${y}`,
                            )
                            .join("")}`}
                          stroke="var(--crimson)"
                          strokeWidth="1.5"
                        />
                      )}
                      {l === 1 &&
                        Array.from({ length: 26 }).map((_, i) => {
                          const x = +(180 + i * 7.8).toFixed(2);
                          const h = [4, 8, 3, 9, 5, 7, 4, 6][i % 8];
                          return (
                            <path
                              key={i}
                              d={`M${x} ${y - h}v${h * 2}`}
                              stroke="var(--crimson)"
                              strokeOpacity="0.75"
                              strokeWidth="1.25"
                            />
                          );
                        })}
                      {l === 2 &&
                        Array.from({ length: 9 }).map((_, i) => {
                          const h = 6 + ((i * 5) % 9);
                          const yTop = +(y - h / 2).toFixed(2);
                          return (
                            <rect
                              key={i}
                              x={180 + i * 22}
                              y={yTop}
                              width="15"
                              height={h}
                              fill="var(--crimson)"
                              fillOpacity="0.45"
                            />
                          );
                        })}
                    </g>
                  );
                },
              )}
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-3xl`}>
              Their value lies in better rank ordering of risk and better
              segmentation of approve, review, and decline decisions.
            </p>
            <figure className="mt-6">
              <svg
                role="img"
                aria-label="Rank ordering of risk across applicants segmented into approve, review, and decline decisions."
                viewBox="0 0 800 112"
                className="w-full"
                fill="none"
              >
                <title>
                  Rank ordering of risk across applicants segmented into
                  approve, review, and decline decisions.
                </title>
                {[
                  { a: 24, b: 376, label: "APPROVE", tone: 0.55 },
                  { a: 404, b: 576, label: "REVIEW", tone: 0.75 },
                  { a: 604, b: 776, label: "DECLINE", tone: 1 },
                ].map((s, i) => (
                  <g key={s.label}>
                    <path
                      d={`M${s.a} 38V28H${s.b}V38`}
                      stroke={i === 2 ? "var(--crimson)" : "var(--charcoal)"}
                      strokeOpacity={i === 2 ? 1 : 0.4}
                      strokeWidth={i === 2 ? "1.5" : "1"}
                    />
                    <text
                      {...SVG_LABEL}
                      x={(s.a + s.b) / 2}
                      y="18"
                      textAnchor="middle"
                      fill={i === 2 ? "var(--crimson)" : "var(--charcoal)"}
                      fillOpacity={s.tone}
                    >
                      {s.label}
                    </text>
                  </g>
                ))}
                <path
                  d="M390 28V76M590 28V76"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.25"
                  strokeDasharray="3 3"
                />
                {[
                  ...Array.from({ length: 12 }, (_, i) => ({
                    x: +(36 + i * 29.82).toFixed(2),
                    zone: 0,
                  })),
                  ...Array.from({ length: 6 }, (_, i) => ({
                    x: +(416 + i * 29.6).toFixed(2),
                    zone: 1,
                  })),
                  ...Array.from({ length: 6 }, (_, i) => ({
                    x: +(616 + i * 29.6).toFixed(2),
                    zone: 2,
                  })),
                ].map((d) => (
                  <circle
                    key={d.x}
                    cx={d.x}
                    cy="58"
                    r="4.5"
                    fill={d.zone === 2 ? "var(--crimson)" : "var(--charcoal)"}
                    fillOpacity={d.zone === 0 ? 0.25 : d.zone === 1 ? 0.55 : 0.9}
                  />
                ))}
                <path
                  d="M24 82H776"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.3"
                />
                <path
                  d="M769 77L776 82L769 87"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.45"
                />
                <text
                  {...SVG_LABEL}
                  x="400"
                  y="102"
                  textAnchor="middle"
                  fill="var(--charcoal)"
                  fillOpacity="0.55"
                >
                  RANK ORDERING OF RISK
                </text>
              </svg>
            </figure>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <p className={`${DISPLAY} max-w-4xl`}>
              More predictive power is useful only if the institution can
              explain, govern, and operationalize the result.
            </p>
            <Steps
              items={["explain", "govern", "operationalize"]}
              cols="grid-cols-3"
              className="mt-6 max-w-2xl"
            />
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          11. UNDERWRITING: four signal sources converging on the lender.
          The three groups broader signals can reach. Three open questions
          about new inputs.                          [quiz: credit-scoring]
      ================================================================== */}
      <Slide
        id="underwriting"
        border
        align="left"
        quizData={quiz["underwriting"]}
      >
        <Head1 eyebrow="Broader signals">Underwriting with Broader Signals</Head1>

        <div className="mt-10 grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1fr_24rem] md:gap-14">
          <div>
            <p className={BODY}>
              Lenders increasingly combine internal history, verified cash
              flow, collateral information, and contextual business data.
            </p>
          </div>
          <div>
            <svg
              role="img"
              aria-label="Lenders combining internal history, verified cash flow, collateral information, and contextual business data."
              viewBox="0 0 400 124"
              className="w-full max-w-[24rem]"
              fill="none"
            >
              <title>
                Lenders combining internal history, verified cash flow,
                collateral information, and contextual business data.
              </title>
              {[
                "INTERNAL HISTORY",
                "VERIFIED CASH FLOW",
                "COLLATERAL INFORMATION",
                "CONTEXTUAL BUSINESS DATA",
              ].map((src, i) => {
                const y = 18 + i * 28;
                return (
                  <g key={src}>
                    <text
                      {...SVG_LABEL}
                      x="200"
                      y={y + 3.5}
                      textAnchor="end"
                      fill="var(--charcoal)"
                      fillOpacity="0.65"
                    >
                      {src}
                    </text>
                    <circle
                      cx="210"
                      cy={y}
                      r="3"
                      fill="var(--charcoal)"
                      fillOpacity="0.45"
                    />
                    <path
                      d={`M213 ${y} C 244 ${y}, 252 60, 278 60`}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.3"
                    />
                  </g>
                );
              })}
              <path d="M278 60H300" stroke="var(--crimson)" strokeWidth="1.5" />
              <path
                d="M293 55L300 60L293 65"
                stroke="var(--crimson)"
                strokeWidth="1.5"
              />
              <rect
                x="300"
                y="40"
                width="92"
                height="40"
                fill="var(--crimson)"
                fillOpacity="0.06"
                stroke="var(--crimson)"
                strokeWidth="1.25"
              />
              <text
                {...SVG_LABEL}
                x="346"
                y="63.5"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                LENDERS
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-3xl`}>
              Broader signals can improve coverage for thin-file applicants,
              small businesses, or newer customers.
            </p>
            <div
              aria-hidden
              className="mt-6 inline-flex flex-wrap items-center gap-2 border border-dashed border-[var(--crimson)]/55 p-3"
            >
              <span className={`${MICRO} mr-2 text-[var(--crimson)]`}>
                Coverage
              </span>
              {["thin-file applicants", "small businesses", "newer customers"].map(
                (g) => (
                  <span
                    key={g}
                    className={`${TAG} border border-[var(--charcoal)]/15 bg-[var(--surface)] px-2.5 py-1.5 text-[var(--charcoal-light)]/75`}
                  >
                    {g}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 grid w-full max-w-5xl items-center gap-8 md:grid-cols-[1fr_18rem] md:gap-12">
            <div className="border border-[var(--crimson)]/45 p-7 md:p-8">
              <div className={`${MICRO} text-[var(--crimson)]`}>New inputs</div>
              <p className={`${LEAD} mt-4`}>
                New inputs also raise questions about relevance, stability, and
                whether the model is learning structural disadvantage rather
                than true risk.
              </p>
            </div>
            <ul aria-hidden className="border-t border-[var(--charcoal)]/15">
              {[
                "relevance",
                "stability",
                "structural disadvantage rather than true risk",
              ].map((q) => (
                <li
                  key={q}
                  className="flex items-baseline justify-between gap-4 border-b border-[var(--charcoal)]/10 py-2.5"
                >
                  <span
                    className={`${TAG} text-[var(--charcoal-light)]/70`}
                  >
                    {q}
                  </span>
                  <span className="font-serif text-lg text-[var(--crimson)]">
                    ?
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          12. PRICING, LIMITS, PROFITABILITY: approval as the first stop on
          a longer line. Three quantities held on one rule. Margin set
          against what it can worsen.
      ================================================================== */}
      <Slide id="pricing-limits" border align="left">
        <Head1 eyebrow="After approval">
          Pricing, Limit Setting, and Profitability
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Credit decisions do not end at approval. Institutions also set
            limits, pricing, covenants, and review intensity.
          </p>
          <svg
            role="img"
            aria-label="Credit decisions continuing after approval to set limits, pricing, covenants, and review intensity."
            viewBox="0 0 800 96"
            className="mt-7 w-full max-w-5xl"
            fill="none"
          >
            <title>
              Credit decisions continuing after approval to set limits, pricing,
              covenants, and review intensity.
            </title>
            <circle
              cx="68"
              cy="44"
              r="7"
              fill="var(--surface)"
              stroke="var(--charcoal)"
              strokeOpacity="0.65"
              strokeWidth="1.5"
            />
            <text
              {...SVG_LABEL}
              x="68"
              y="78"
              textAnchor="middle"
              fill="var(--charcoal)"
              fillOpacity="0.65"
            >
              APPROVAL
            </text>
            {[
              [75, 227],
              [243, 392],
              [408, 557],
              [573, 712],
            ].map(([x1, x2]) => (
              <g key={x1}>
                <path
                  d={`M${x1} 44H${x2}`}
                  stroke="var(--crimson)"
                  strokeOpacity="0.55"
                  strokeWidth="1.25"
                />
                <path
                  d={`M${x2 - 6} 40L${x2} 44L${x2 - 6} 48`}
                  stroke="var(--crimson)"
                  strokeWidth="1.25"
                />
              </g>
            ))}
            {[
              { x: 235, label: "LIMITS" },
              { x: 400, label: "PRICING" },
              { x: 565, label: "COVENANTS" },
              { x: 720, label: "REVIEW INTENSITY" },
            ].map((s) => (
              <g key={s.label}>
                <rect
                  x={s.x - 8}
                  y="36"
                  width="16"
                  height="16"
                  fill="var(--crimson)"
                  fillOpacity="0.12"
                  stroke="var(--crimson)"
                  strokeWidth="1.5"
                />
                <text
                  {...SVG_LABEL}
                  x={s.x}
                  y="78"
                  textAnchor="middle"
                  fill="var(--crimson)"
                >
                  {s.label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-3xl`}>
              AI can help align expected loss, expected revenue, and capital
              usage at a more granular level.
            </p>
            <div aria-hidden className="mt-7 max-w-3xl">
              <div className="relative h-4">
                <span className="absolute inset-x-0 top-1/2 h-px bg-[var(--crimson)]" />
                {[16.67, 50, 83.33].map((p) => (
                  <span
                    key={p}
                    className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[var(--crimson)]"
                    style={{ left: `${p}%` }}
                  />
                ))}
              </div>
              <div className="mt-3 grid grid-cols-3 text-center">
                {["expected loss", "expected revenue", "capital usage"].map(
                  (q) => (
                    <span
                      key={q}
                      className={`${TAG} text-[var(--charcoal-light)]/70`}
                    >
                      {q}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-14 w-full max-w-5xl">
            <p className={`${LEAD} max-w-4xl`}>
              Poorly governed pricing models can optimize short-term margin
              while worsening adverse selection or customer trust.
            </p>
            <div className="mt-6">
              <Split1
                left="Optimize | short-term margin"
                right="Worsening | adverse selection or customer trust"
                cols="grid-cols-[1fr_1.6fr]"
              />
            </div>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          13. EARLY WARNING: five signals arriving on a line ahead of formal
          default. Prediction handing on to intervention. The two things
          response teams need.
      ================================================================== */}
      <Slide id="early-warning" border align="left">
        <Head1 eyebrow="Before default">
          Early Warning Systems and Portfolio Surveillance
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Portfolio models monitor delinquency signals, payment behavior,
            sector weakness, covenant breaches, or utilization changes before
            formal default.
          </p>
          <svg
            role="img"
            aria-label="Portfolio models monitoring delinquency signals, payment behavior, sector weakness, covenant breaches, and utilization changes on a timeline before formal default."
            viewBox="0 0 800 120"
            className="mt-7 w-full max-w-5xl"
            fill="none"
          >
            <title>
              Portfolio models monitoring delinquency signals, payment behavior,
              sector weakness, covenant breaches, and utilization changes on a
              timeline before formal default.
            </title>
            <path d="M24 58H716" stroke="var(--charcoal)" strokeOpacity="0.3" />
            <path
              d="M709 53L716 58L709 63"
              stroke="var(--charcoal)"
              strokeOpacity="0.45"
            />
            {[
              { x: 100, label: "DELINQUENCY SIGNALS", up: true },
              { x: 228, label: "PAYMENT BEHAVIOR", up: false },
              { x: 356, label: "SECTOR WEAKNESS", up: true },
              { x: 484, label: "COVENANT BREACHES", up: false },
              { x: 606, label: "UTILIZATION CHANGES", up: true },
            ].map((s) => (
              <g key={s.label}>
                <path
                  d={s.up ? `M${s.x} 34V54` : `M${s.x} 62V82`}
                  stroke="var(--charcoal)"
                  strokeOpacity="0.45"
                />
                <circle
                  cx={s.x}
                  cy="58"
                  r="4"
                  fill="var(--surface)"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.7"
                  strokeWidth="1.25"
                />
                <text
                  {...SVG_LABEL}
                  x={s.x}
                  y={s.up ? 24 : 98}
                  textAnchor="middle"
                  fill="var(--charcoal)"
                  fillOpacity="0.7"
                >
                  {s.label}
                </text>
              </g>
            ))}
            <path d="M718 28V88" stroke="var(--crimson)" strokeWidth="3" />
            <text
              {...SVG_LABEL}
              x="718"
              y="108"
              textAnchor="middle"
              fill="var(--crimson)"
            >
              FORMAL DEFAULT
            </text>
          </svg>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-3xl`}>
              The goal is not only prediction, but earlier intervention through
              restructuring, outreach, or exposure management.
            </p>
            <div
              aria-hidden
              className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3"
            >
              <span
                className={`${TAG} border border-[var(--charcoal)]/15 px-3 py-2 text-[var(--charcoal-light)]/55`}
              >
                prediction
              </span>
              <span className="text-[var(--charcoal)]/35">→</span>
              <span
                className={`${TAG} bg-[var(--crimson)] px-3 py-2 text-[var(--surface)]`}
              >
                earlier intervention
              </span>
              <span className="text-[var(--crimson)]">→</span>
              <Terms
                items={["restructuring", "outreach", "exposure management"]}
                className=""
              />
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <p className={`${DISPLAY} max-w-4xl`}>
              Early warning is only valuable when response teams have clear
              playbooks and authority to act.
            </p>
            <Steps
              items={["clear playbooks", "authority to act"]}
              cols="grid-cols-2"
              className="mt-6 max-w-md"
            />
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          14. COLLECTIONS: four treatment dials. The best treatment as a
          balance point between three pulls. Prioritization held inside
          policy boundaries.
      ================================================================== */}
      <Slide id="collections" border align="left">
        <Head1 eyebrow="Treatment design">
          Collections Strategy and Treatment Design
        </Head1>

        <div className="mt-10 grid w-full max-w-5xl items-center gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <p className={BODY}>
              Collections systems estimate which account, channel, timing, or
              hardship option is most likely to recover value.
            </p>
          </div>
          <div>
            <div aria-hidden className="grid grid-cols-2 gap-6">
              {[
                { dial: "Account", pick: 2 },
                { dial: "Channel", pick: 0 },
                { dial: "Timing", pick: 1 },
                { dial: "Hardship option", pick: 2 },
              ].map((d) => (
                <div key={d.dial}>
                  <div className={`${MICRO} text-[var(--champagne)]`}>
                    {d.dial}
                  </div>
                  <div className="mt-3 flex gap-1.5">
                    {[0, 1, 2].map((o) => (
                      <span
                        key={o}
                        className={`block h-6 flex-1 border ${
                          o === d.pick
                            ? "border-[var(--crimson)] bg-[var(--crimson)]"
                            : "border-[var(--charcoal)]/15"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 grid w-full max-w-5xl items-center gap-10 border-t border-[var(--charcoal)]/10 pt-8 md:grid-cols-[1fr_22rem] md:gap-14">
            <p className={LEAD}>
              The best treatment is not always the most aggressive. It must
              balance recovery, customer outcome, and regulatory expectations.
            </p>
            <svg
              role="img"
              aria-label="The best treatment balancing recovery, customer outcome, and regulatory expectations at the center of a triangle."
              viewBox="0 0 400 204"
              className="w-full"
              fill="none"
            >
              <title>
                The best treatment balancing recovery, customer outcome, and
                regulatory expectations at the center of a triangle.
              </title>
              <path
                d="M200 30L56 168H344Z"
                fill="var(--charcoal)"
                fillOpacity="0.02"
                stroke="var(--charcoal)"
                strokeOpacity="0.28"
              />
              <path
                d="M200 34V108M60 166L194 116M340 166L206 116"
                stroke="var(--crimson)"
                strokeOpacity="0.45"
                strokeDasharray="3 3"
              />
              {[
                [200, 30],
                [56, 168],
                [344, 168],
              ].map(([cx, cy]) => (
                <circle
                  key={`${cx}-${cy}`}
                  cx={cx}
                  cy={cy}
                  r="4"
                  fill="var(--surface)"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.65"
                />
              ))}
              <circle
                cx="200"
                cy="114"
                r="6"
                fill="var(--crimson)"
              />
              <text
                {...SVG_LABEL}
                x="200"
                y="156"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                BEST TREATMENT
              </text>
              <text
                {...SVG_LABEL}
                x="200"
                y="16"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.7"
              >
                RECOVERY
              </text>
              <text
                {...SVG_LABEL}
                x="12"
                y="192"
                fill="var(--charcoal)"
                fillOpacity="0.7"
              >
                CUSTOMER OUTCOME
              </text>
              <text
                {...SVG_LABEL}
                x="388"
                y="192"
                textAnchor="end"
                fill="var(--charcoal)"
                fillOpacity="0.7"
              >
                REGULATORY EXPECTATIONS
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <p className={`${BODY} max-w-4xl`}>
              AI can improve prioritization, but firms still need policy
              boundaries for hardship, vulnerability, and escalation.
            </p>
            <div
              aria-hidden
              className="mt-6 grid max-w-4xl gap-6 md:grid-cols-[12rem_1fr] md:items-end"
            >
              <div>
                <div className={`${MICRO} text-[var(--charcoal-light)]/55`}>
                  AI
                </div>
                <div
                  className={`${TAG} mt-3 border border-[var(--charcoal)]/15 px-4 py-3 text-[var(--charcoal-light)]/70`}
                >
                  prioritization
                </div>
              </div>
              <div>
                <div className={`${MICRO} text-[var(--crimson)]`}>
                  Policy boundaries
                </div>
                <div className="mt-3 grid grid-cols-3 border-y-2 border-[var(--crimson)]">
                  {["hardship", "vulnerability", "escalation"].map((b, i) => (
                    <span
                      key={b}
                      className={`${TAG} px-4 py-3 text-[var(--charcoal-light)]/70 ${
                        i > 0 ? "border-l border-[var(--crimson)]/30" : ""
                      }`}
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Discussion1>
          When should a lender optimize for recovery efficiency, and when should
          it prioritize longer-term relationship preservation even at lower
          near-term cash recovery?
        </Discussion1>
      </Slide>

      {/* ==================================================================
          15. EXPLAINABILITY AND FAIRNESS: the three adverse outcomes. The
          audiences an explanation must reach. The governance question held
          across segments, outcomes and contexts.          [quiz topic]
      ================================================================== */}
      <Slide id="explainability-fairness" border align="left">
        <Head1 eyebrow="Under scrutiny" signal>
          Explainability, Fairness, and Adverse Action
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Lending models operate under scrutiny because affected customers
            may be denied credit, priced differently, or sent to manual review.
          </p>
          <div aria-hidden className="mt-6 flex flex-wrap gap-3">
            {["denied credit", "priced differently", "sent to manual review"].map(
              (o) => (
                <span
                  key={o}
                  className={`${TAG} border border-[var(--crimson)]/40 px-3 py-2 text-[var(--crimson)]`}
                >
                  {o}
                </span>
              ),
            )}
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Institutions need explanations that are meaningful to risk
              managers, regulators, and customers, not only to data scientists.
            </p>
            <div
              aria-hidden
              className="mt-6 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4"
            >
              {[
                { who: "data scientists", on: false },
                { who: "risk managers", on: true },
                { who: "regulators", on: true },
                { who: "customers", on: true },
              ].map((a) => (
                <div
                  key={a.who}
                  className={`border-t-2 pt-3 ${
                    a.on
                      ? "border-[var(--crimson)]"
                      : "border-[var(--charcoal)]/15"
                  }`}
                >
                  <span
                    className={`${MICRO} block ${
                      a.on
                        ? "text-[var(--champagne)]"
                        : "text-[var(--charcoal-light)]/45"
                    }`}
                  >
                    {a.on ? "Meaningful to" : "Not only"}
                  </span>
                  <span
                    className={`${TAG} mt-2 block ${
                      a.on
                        ? "text-[var(--charcoal)]"
                        : "text-[var(--charcoal-light)]/50"
                    }`}
                  >
                    {a.who}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full">
          <figure className="mt-12 max-w-4xl border-l-2 border-[var(--crimson)] pl-6 md:pl-8">
            <div className={`${MICRO} text-[var(--champagne)]`}>
              The core governance question
            </div>
            <blockquote className={`${DISPLAY} mt-4`}>
              The core governance question is whether a model&apos;s
              performance is acceptable across segments, outcomes, and decision
              contexts.
            </blockquote>
            <Terms
              items={["segments", "outcomes", "decision contexts"]}
              className="mt-4"
            />
          </figure>
        </div>

        <Discussion1>
          Should a lender use a more predictive model if its logic is materially
          harder to explain to customers and examiners?
        </Discussion1>
      </Slide>

      <ModulePlate2
        id="module-3"
        numeral="III"
        title="Fraud, AML, and Compliance"
        lines={[
          "This module focuses on adversarial behavior, financial crime detection, and regulatory control systems.",
          "The central challenge is reducing losses and false positives at the same time.",
        ]}
        quizData={quiz["module-3"]}
      />

      {/* ==================================================================
          17. FRAUD AS AN ADVERSARIAL PROBLEM: detection and change drawn
          as a loop. Five inputs joined. Static rules decaying over time.
                                                        [quiz topic]
      ================================================================== */}
      <Slide id="fraud-adversarial" border align="left">
        <Head1 eyebrow="An opponent that adapts">
          Fraud Detection as an Adversarial Problem
        </Head1>

        <div className="mt-10 grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1fr_24rem] md:gap-14">
          <div>
            <p className={BODY}>
              Fraud is adaptive: once a pattern is detected, attackers change
              timing, identity, channel, or transaction structure.
            </p>
            <Terms
              items={["timing", "identity", "channel", "transaction structure"]}
            />
          </div>
          <div>
            <svg
              role="img"
              aria-label="Adversarial loop where once a pattern is detected, attackers change their behavior."
              viewBox="0 0 400 152"
              className="w-full max-w-[24rem]"
              fill="none"
            >
              <title>
                Adversarial loop where once a pattern is detected, attackers
                change their behavior.
              </title>
              <rect
                x="104"
                y="16"
                width="192"
                height="34"
                fill="var(--surface)"
                stroke="var(--charcoal)"
                strokeOpacity="0.45"
              />
              <text
                {...SVG_LABEL}
                x="200"
                y="36.5"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.75"
              >
                PATTERN DETECTED
              </text>

              <rect
                x="104"
                y="102"
                width="192"
                height="34"
                fill="var(--crimson)"
                fillOpacity="0.06"
                stroke="var(--crimson)"
                strokeWidth="1.5"
              />
              <text
                {...SVG_LABEL}
                x="200"
                y="122.5"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                ATTACKERS CHANGE
              </text>

              {/* Right arc: Pattern detected -> Attackers change */}
              <path
                d="M296 33 C 352 33, 352 119, 296 119"
                stroke="var(--crimson)"
                strokeWidth="1.5"
              />
              <path
                d="M303 114L296 119L303 124"
                stroke="var(--crimson)"
                strokeWidth="1.5"
              />

              {/* Left arc: Attackers change -> Pattern detected */}
              <path
                d="M104 119 C 48 119, 48 33, 104 33"
                stroke="var(--charcoal)"
                strokeOpacity="0.45"
                strokeWidth="1.25"
              />
              <path
                d="M97 28L104 33L97 38"
                stroke="var(--charcoal)"
                strokeOpacity="0.55"
                strokeWidth="1.25"
              />
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Effective systems combine historical patterns with device
              signals, behavioral context, network relationships, and case
              feedback.
            </p>
            <div
              aria-hidden
              className="mt-6 flex flex-wrap items-center gap-x-2.5 gap-y-3"
            >
              {[
                "historical patterns",
                "device signals",
                "behavioral context",
                "network relationships",
                "case feedback",
              ].map((input, i) => (
                <React.Fragment key={input}>
                  {i > 0 && (
                    <span className="font-serif text-lg text-[var(--crimson)]">
                      +
                    </span>
                  )}
                  <span
                    className={`${TAG} border px-3 py-2 ${
                      i === 0
                        ? "border-[var(--charcoal)]/35 text-[var(--charcoal)]"
                        : "border-[var(--charcoal)]/15 text-[var(--charcoal-light)]/70"
                    }`}
                  >
                    {input}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 grid w-full max-w-5xl items-center gap-8 md:grid-cols-[1fr_24rem] md:gap-12">
            <p className={DISPLAY}>
              Static rules remain useful, but they degrade quickly when
              adversaries learn the thresholds.
            </p>
            <figure>
              <svg
                role="img"
                aria-label="Static rules remaining useful initially before degrading quickly once adversaries learn the thresholds."
                viewBox="0 0 400 140"
                className="w-full max-w-[24rem]"
                fill="none"
              >
                <title>
                  Static rules remaining useful initially before degrading
                  quickly once adversaries learn the thresholds.
                </title>
                <path
                  d="M28 16V118H384"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.25"
                />
                <path
                  d="M172 20V118"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.35"
                  strokeDasharray="3 3"
                />
                <text
                  {...SVG_LABEL}
                  x="172"
                  y="134"
                  textAnchor="middle"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  LEARN THE THRESHOLDS
                </text>
                <path
                  d="M28 38H172"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.65"
                  strokeWidth="1.5"
                />
                <path
                  d="M172 38 C 204 38, 224 104, 372 108"
                  stroke="var(--crimson)"
                  strokeWidth="1.75"
                />
                <circle cx="172" cy="38" r="4" fill="var(--crimson)" />
                <text
                  {...SVG_LABEL}
                  x="100"
                  y="28"
                  textAnchor="middle"
                  fill="var(--charcoal)"
                  fillOpacity="0.65"
                >
                  STATIC RULES | USEFUL
                </text>
                <text
                  {...SVG_LABEL}
                  x="308"
                  y="64"
                  textAnchor="middle"
                  fill="var(--crimson)"
                >
                  DEGRADE QUICKLY
                </text>
              </svg>
            </figure>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          18. TRANSACTION MONITORING AND AML: a ledger with the rows that
          merit investigation marked. Three things AI adds. The credibility
          beam resting on three supports.        [quiz: fraud-adversarial]
      ================================================================== */}
      <Slide
        id="transaction-monitoring"
        border
        align="left"
        quizData={quiz["transaction-monitoring"]}
      >
        <Head1 eyebrow="Financial crime">
          Transaction Monitoring and Anti-Money Laundering
        </Head1>

        <div className="mt-10 grid w-full max-w-5xl items-center gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <p className={BODY}>
              Transaction monitoring seeks suspicious flows, counterparties,
              geographies, or transaction patterns that merit investigation.
            </p>
          </div>
          <div>
            <div aria-hidden className="border-t border-[var(--charcoal)]/30">
              <div className="grid grid-cols-4 border-b border-[var(--charcoal)]/15">
                {["flows", "counterparties", "geographies", "transaction patterns"].map(
                  (c) => (
                    <span
                      key={c}
                      className="px-2 py-2 font-serif text-[0.9375rem] italic tracking-normal text-[var(--charcoal-light)]/70"
                    >
                      {c}
                    </span>
                  ),
                )}
              </div>
              {[0, 1, 2, 3, 4, 5].map((r) => {
                const flagged = r === 1 || r === 4;
                return (
                  <div
                    key={r}
                    className={`grid grid-cols-4 border-b border-[var(--charcoal)]/8 ${
                      flagged
                        ? "border-l-2 border-l-[var(--crimson)] bg-[var(--crimson)]/[0.05]"
                        : ""
                    }`}
                  >
                    {[0, 1, 2, 3].map((c) => (
                      <span key={c} className="px-2 py-2.5">
                        <span
                          className={`block h-1.5 ${
                            flagged
                              ? "bg-[var(--crimson)]/50"
                              : "bg-[var(--charcoal)]/12"
                          }`}
                          style={{
                            width: `${45 + ((r * 5 + c * 3) % 5) * 12}%`,
                          }}
                        />
                      </span>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-3xl`}>
              AI can prioritize alerts, cluster related activity, and surface
              patterns that rules alone may miss.
            </p>
            <Steps
              items={[
                "prioritize alerts",
                "cluster related activity",
                "surface patterns",
              ]}
              cols="md:grid-cols-3"
              className="mt-6 max-w-3xl"
            />
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <p className={`${LEAD} max-w-4xl`}>
              The system is only as credible as its documentation, investigator
              workflow, and escalation discipline.
            </p>
            <div aria-hidden className="mt-6 md:max-w-2xl">
              <div className="h-[3px] w-full bg-[var(--crimson)]" />
              <div className="grid grid-cols-3 gap-3">
                {[
                  "documentation",
                  "investigator workflow",
                  "escalation discipline",
                ].map((f) => (
                  <div
                    key={f}
                    className="border-x border-b border-[var(--charcoal)]/15 px-3 pb-3 pt-6"
                  >
                    <span
                      className={`${TAG} text-[var(--charcoal-light)]/70`}
                    >
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          19. GRAPH ANALYTICS AND ENTITY RESOLUTION: the same entities as
          separate table rows, then connected through shared addresses and
          phones. Broken links and weak links drawn side by side.
      ================================================================== */}
      <Slide id="graph-entity" border align="left">
        <Head1 eyebrow="Connecting the network">
          Graph Analytics and Entity Resolution
        </Head1>

        <div className="mt-10 grid w-full max-w-5xl gap-10 md:grid-cols-[17rem_1fr] md:gap-0">
          <div className="md:pr-12">
            <p className={BODY}>
              Financial crime often spans accounts, merchants, devices, shell
              entities, and synthetic identities that appear unrelated in
              tabular views.
            </p>
            <div aria-hidden className="mt-6">
              <div className={`${MICRO} text-[var(--charcoal-light)]/55`}>
                Tabular views
              </div>
              <div className="mt-3 border-t border-[var(--charcoal)]/25">
                {[
                  "account",
                  "merchant",
                  "device",
                  "shell entity",
                  "synthetic identity",
                ].map((e, i) => (
                  <div
                    key={e}
                    className="grid grid-cols-[8.5rem_1fr] items-center gap-3 border-b border-[var(--charcoal)]/8 py-2"
                  >
                    <span
                      className={`${TAG} text-[var(--charcoal-light)]/65`}
                    >
                      {e}
                    </span>
                    <span
                      className="block h-1.5 bg-[var(--charcoal)]/12"
                      style={{ width: `${[70, 45, 60, 35, 55][i]}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:border-l md:border-[var(--charcoal)]/12 md:pl-12">
            <p className={BODY}>
              Graph methods help connect shared addresses, phones,
              counterparties, and transaction paths into investigable networks.
            </p>
            <div className="mt-6">
              <div className={`${MICRO} text-[var(--crimson)]`}>
                Investigable networks
              </div>
              <svg
                role="img"
                aria-label="Graph methods connecting accounts, shell entities, synthetic identities, merchants, and devices through shared addresses and phones into investigable networks."
                viewBox="0 0 400 184"
                className="mt-3 w-full"
                fill="none"
              >
                <title>
                  Graph methods connecting accounts, shell entities, synthetic
                  identities, merchants, and devices through shared addresses
                  and phones into investigable networks.
                </title>
                {[
                  [216, 62, 146, 36],
                  [216, 62, 146, 92],
                  [216, 62, 286, 62],
                  [216, 122, 146, 92],
                  [216, 122, 146, 148],
                  [216, 122, 286, 122],
                ].map(([x1, y1, x2, y2]) => (
                  <path
                    key={`${x1}-${y1}-${x2}-${y2}`}
                    d={`M${x1} ${y1}L${x2} ${y2}`}
                    stroke="var(--crimson)"
                    strokeOpacity="0.55"
                    strokeWidth="1.25"
                  />
                ))}
                {[
                  { x: 146, y: 36, label: "ACCOUNTS", side: "end" as const },
                  { x: 146, y: 92, label: "SHELL ENTITIES", side: "end" as const },
                  { x: 146, y: 148, label: "SYNTHETIC IDENTITIES", side: "end" as const },
                  { x: 286, y: 62, label: "MERCHANTS", side: "start" as const },
                  { x: 286, y: 122, label: "DEVICES", side: "start" as const },
                ].map((n) => (
                  <g key={n.label}>
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r="5.5"
                      fill="var(--surface)"
                      stroke="var(--charcoal)"
                      strokeOpacity="0.65"
                      strokeWidth="1.25"
                    />
                    <text
                      {...SVG_LABEL}
                      x={n.side === "end" ? n.x - 12 : n.x + 12}
                      y={n.y + 3.5}
                      textAnchor={n.side}
                      fill="var(--charcoal)"
                      fillOpacity="0.7"
                    >
                      {n.label}
                    </text>
                  </g>
                ))}
                {[
                  { y: 62, label: "SHARED ADDRESSES", ly: 18, l1: 24, l2: 55 },
                  { y: 122, label: "PHONES", ly: 172, l1: 129, l2: 158 },
                ].map((s) => (
                  <g key={s.label}>
                    <path
                      d={`M216 ${s.l1}V${s.l2}`}
                      stroke="var(--crimson)"
                      strokeOpacity="0.4"
                      strokeDasharray="2 2"
                    />
                    <rect
                      x="209"
                      y={s.y - 7}
                      width="14"
                      height="14"
                      fill="var(--crimson)"
                    />
                    <text
                      {...SVG_LABEL}
                      x="216"
                      y={s.ly}
                      textAnchor="middle"
                      fill="var(--crimson)"
                    >
                      {s.label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${DISPLAY} max-w-4xl`}>
              Entity resolution quality is a control issue because broken
              links can hide risk and weak links can create noise.
            </p>
            <svg
              role="img"
              aria-label="Comparison showing how broken links between entities hide risk while weak links create noise."
              viewBox="0 0 800 92"
              className="mt-7 w-full"
              fill="none"
            >
              <title>
                Comparison showing how broken links between entities hide risk
                while weak links create noise.
              </title>
              {[
                { y: 28, label: "BROKEN LINKS", result: "HIDE RISK", broken: true },
                { y: 68, label: "WEAK LINKS", result: "CREATE NOISE", broken: false },
              ].map((row) => (
                <g key={row.label}>
                  <text
                    {...SVG_LABEL}
                    x="4"
                    y={row.y + 3.5}
                    fill={row.broken ? "var(--crimson)" : "var(--charcoal)"}
                    fillOpacity={row.broken ? 1 : 0.65}
                  >
                    {row.label}
                  </text>
                  {row.broken ? (
                    <>
                      <path
                        d={`M176 ${row.y}H390M430 ${row.y}H644`}
                        stroke="var(--charcoal)"
                        strokeOpacity="0.55"
                        strokeWidth="1.5"
                      />
                      <path
                        d={`M386 ${row.y - 6}l8 12M426 ${row.y - 6}l8 12`}
                        stroke="var(--crimson)"
                        strokeWidth="1.5"
                      />
                    </>
                  ) : (
                    <path
                      d={`M176 ${row.y}H644`}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.45"
                      strokeDasharray="2 5"
                      strokeWidth="1.25"
                    />
                  )}
                  <circle
                    cx="170"
                    cy={row.y}
                    r="5"
                    fill="var(--surface)"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.65"
                  />
                  <circle
                    cx="650"
                    cy={row.y}
                    r="5"
                    fill="var(--surface)"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.65"
                  />
                  <text
                    {...SVG_LABEL}
                    x="674"
                    y={row.y + 3.5}
                    fill={row.broken ? "var(--crimson)" : "var(--charcoal)"}
                    fillOpacity={row.broken ? 1 : 0.65}
                  >
                    {row.result}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          20. FALSE POSITIVES AND INCLUSION: three harms of oversensitive
          detection. The two costs set on one beam. The overlap where some
          groups are caught.
      ================================================================== */}
      <Slide id="false-positives" border align="left">
        <Head1 eyebrow="The cost of caution">
          False Positives, Customer Friction, and Inclusion
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Overly sensitive detection systems block legitimate customers,
            delay payments, and erode trust at critical moments.
          </p>
          <div aria-hidden className="mt-6 flex flex-wrap gap-3">
            {["block legitimate customers", "delay payments", "erode trust"].map(
              (h) => (
                <span
                  key={h}
                  className={`${TAG} border border-[var(--crimson)]/40 px-3 py-2 text-[var(--crimson)]`}
                >
                  {h}
                </span>
              ),
            )}
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-3xl`}>
              Institutions must weigh the cost of friction against the cost of
              missed fraud and regulatory failure.
            </p>
            <div aria-hidden className="mt-8 max-w-3xl">
              <div className="grid grid-cols-2 gap-10">
                <span className={`${MICRO} text-[var(--charcoal-light)]/60`}>
                  Cost of friction
                </span>
                <span className={`${MICRO} text-right text-[var(--crimson)]`}>
                  Cost of missed fraud and regulatory failure
                </span>
              </div>
              <div className="relative mt-4 h-[2px] bg-[var(--charcoal)]/40">
                <span className="absolute -top-[5px] left-0 h-3 w-3 bg-[var(--charcoal)]/40" />
                <span className="absolute -top-[5px] right-0 h-3 w-3 bg-[var(--crimson)]" />
              </div>
              <span className="mx-auto block h-0 w-0 border-x-[9px] border-b-[14px] border-x-transparent border-b-[var(--charcoal)]/40" />
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <p className={`${LEAD} max-w-4xl`}>
              Some groups may be disproportionately affected when proxies for
              unusual behavior overlap with non-standard but legitimate
              financial lives.
            </p>
            <figure className="mt-6 max-w-4xl">
              <svg
                role="img"
                aria-label="Venn diagram showing proxies for unusual behavior overlapping with non-standard but legitimate financial lives, disproportionately affecting some groups."
                viewBox="0 0 800 184"
                className="w-full"
                fill="none"
              >
                <title>
                  Venn diagram showing proxies for unusual behavior overlapping
                  with non-standard but legitimate financial lives,
                  disproportionately affecting some groups.
                </title>
                <defs>
                  <clipPath id="w3-proxy-circle">
                    <circle cx="352" cy="80" r="64" />
                  </clipPath>
                </defs>
                <circle
                  cx="448"
                  cy="80"
                  r="64"
                  fill="var(--crimson)"
                  fillOpacity="0.22"
                  clipPath="url(#w3-proxy-circle)"
                />
                <circle
                  cx="352"
                  cy="80"
                  r="64"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.5"
                  strokeWidth="1.25"
                />
                <circle
                  cx="448"
                  cy="80"
                  r="64"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.5"
                  strokeWidth="1.25"
                />
                <text
                  {...SVG_LABEL}
                  x="272"
                  y="76"
                  textAnchor="end"
                  fill="var(--charcoal)"
                  fillOpacity="0.7"
                >
                  PROXIES FOR
                </text>
                <text
                  {...SVG_LABEL}
                  x="272"
                  y="92"
                  textAnchor="end"
                  fill="var(--charcoal)"
                  fillOpacity="0.7"
                >
                  UNUSUAL BEHAVIOR
                </text>
                <text
                  {...SVG_LABEL}
                  x="528"
                  y="68"
                  fill="var(--charcoal)"
                  fillOpacity="0.7"
                >
                  NON-STANDARD BUT
                </text>
                <text
                  {...SVG_LABEL}
                  x="528"
                  y="84"
                  fill="var(--charcoal)"
                  fillOpacity="0.7"
                >
                  LEGITIMATE
                </text>
                <text
                  {...SVG_LABEL}
                  x="528"
                  y="100"
                  fill="var(--charcoal)"
                  fillOpacity="0.7"
                >
                  FINANCIAL LIVES
                </text>
                <path
                  d="M400 124V148"
                  stroke="var(--crimson)"
                  strokeWidth="1.25"
                />
                <text
                  {...SVG_LABEL}
                  x="400"
                  y="164"
                  textAnchor="middle"
                  fill="var(--crimson)"
                >
                  SOME GROUPS | DISPROPORTIONATELY AFFECTED
                </text>
              </svg>
            </figure>
          </div>
        </div>

        <Discussion1>
          How much customer friction is acceptable in exchange for a meaningful
          reduction in fraud and financial crime exposure?
        </Discussion1>
      </Slide>

      {/* ==================================================================
          21. COMPLIANCE COPILOTS: four tasks ending at the right reviewer.
          Leverage set against autonomous judgment. Three controls standing
          in front of the formal record.
      ================================================================== */}
      <Slide id="compliance-copilots" border align="left">
        <Head1 eyebrow="Investigator support">
          Compliance Copilots and Case Productivity
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Generative and retrieval systems can summarize alerts, assemble
            evidence, draft narratives, and route cases to the right reviewer.
          </p>
          <Steps
            items={[
              "summarize alerts",
              "assemble evidence",
              "draft narratives",
              "route cases",
              "the right reviewer",
            ]}
            cols="sm:grid-cols-3 md:grid-cols-5"
            mark={4}
            className="mt-6 max-w-5xl"
          />
        </div>

        <div className="w-full">
          <div className="mt-14 w-full max-w-5xl">
            <p className={`${LEAD} max-w-4xl`}>
              Their value is operational leverage for investigators, not
              autonomous compliance judgment.
            </p>
            <div className="mt-6">
              <Split1
                left="Operational leverage for investigators"
                right="Not autonomous compliance judgment"
              />
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${DISPLAY} max-w-4xl`}>
              Firms need controls over hallucination, source traceability, and
              what content can enter the formal record.
            </p>
            <div
              aria-hidden
              className="mt-7 grid max-w-4xl items-center gap-4 md:grid-cols-[1fr_auto_12rem]"
            >
              <div className="space-y-2">
                {[
                  "hallucination",
                  "source traceability",
                  "what content can enter",
                ].map((c) => (
                  <div
                    key={c}
                    className={`${TAG} flex items-center gap-3 border-l-2 border-[var(--crimson)] bg-[var(--charcoal)]/[0.03] px-3 py-2.5 text-[var(--charcoal-light)]/75`}
                  >
                    {c}
                  </div>
                ))}
              </div>
              <span className="hidden font-serif text-2xl text-[var(--crimson)] md:block">
                →
              </span>
              <div
                className={`${MICRO} border-2 border-[var(--charcoal)]/70 px-4 py-6 text-center text-[var(--charcoal)]`}
              >
                The formal record
              </div>
            </div>
          </div>
        </div>
      </Slide>

      <ModulePlate2
        id="module-4"
        numeral="IV"
        title="Markets, Treasury, and Risk"
        lines={[
          "This module examines forecasting, trading support, balance sheet decisions, and risk management.",
          "The recurring issue is that more data does not remove uncertainty, especially in regime shifts.",
        ]}
      />

      {/* ==================================================================
          23. MARKET FORECASTING: six streams converging. Certainty struck
          against signal extraction. The same points read once as structure
          and once as overfit noise.
      ================================================================== */}
      <Slide id="market-forecasting" border align="left">
        <Head1 eyebrow="Reading the market">
          Market Forecasting and Signal Extraction
        </Head1>

        <div className="mt-10 grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1fr_24rem] md:gap-14">
          <div>
            <p className={BODY}>
              AI can process prices, volumes, news, filings, macro releases,
              and alternative text streams faster than human analysts.
            </p>
          </div>
          <div>
            <svg
              role="img"
              aria-label="AI processing prices, volumes, news, filings, macro releases, and alternative text streams in parallel."
              viewBox="0 0 400 148"
              className="w-full max-w-[24rem]"
              fill="none"
            >
              <title>
                AI processing prices, volumes, news, filings, macro releases,
                and alternative text streams in parallel.
              </title>
              {[
                "PRICES",
                "VOLUMES",
                "NEWS",
                "FILINGS",
                "MACRO RELEASES",
                "ALTERNATIVE TEXT STREAMS",
              ].map((src, i) => {
                const y = 14 + i * 24;
                return (
                  <g key={src}>
                    <text
                      {...SVG_LABEL}
                      x="212"
                      y={y + 3.5}
                      textAnchor="end"
                      fill="var(--charcoal)"
                      fillOpacity="0.65"
                    >
                      {src}
                    </text>
                    <circle
                      cx="222"
                      cy={y}
                      r="2.5"
                      fill="var(--charcoal)"
                      fillOpacity="0.45"
                    />
                    <path
                      d={`M225 ${y} C 258 ${y}, 266 74, 290 74`}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.28"
                    />
                  </g>
                );
              })}
              <path d="M290 74H312" stroke="var(--crimson)" strokeWidth="1.5" />
              <path
                d="M305 69L312 74L305 79"
                stroke="var(--crimson)"
                strokeWidth="1.5"
              />
              <rect
                x="312"
                y="54"
                width="76"
                height="40"
                fill="var(--crimson)"
                fillOpacity="0.06"
                stroke="var(--crimson)"
                strokeWidth="1.25"
              />
              <text
                {...SVG_LABEL}
                x="350"
                y="77.5"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                AI
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-14 w-full max-w-5xl">
            <p className={`${LEAD} max-w-4xl`}>
              The task is rarely to predict markets with certainty. It is to
              improve signal extraction and decision support under uncertainty.
            </p>
            <div className="mt-6">
              <Split1
                left="Predict markets with certainty"
                right="Signal extraction and decision support under uncertainty"
                strikeLeft
                cols="grid-cols-[1fr_1.6fr]"
              />
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Leaders should distinguish between models that identify
              persistent structure and models that overfit recent noise.
            </p>
            <figure className="mt-7">
              <div className="grid gap-10 md:grid-cols-2 md:gap-0">
                {[
                  {
                    label: "Persistent structure",
                    fit: "line",
                    aria: "Model fitting a smooth line to identify persistent structure across market observations.",
                  },
                  {
                    label: "Overfit recent noise",
                    fit: "trace",
                    aria: "Model zig-zagging through every point to overfit recent noise.",
                  },
                ].map((panel, p) => {
                  const points = [104, 82, 92, 76, 88, 62, 68, 48, 63, 43, 47].map(
                    (y, i) => [+(28 + i * 34.4).toFixed(2), y] as const,
                  );
                  return (
                    <div
                      key={panel.label}
                      className={
                        p === 0
                          ? "md:pr-12"
                          : "md:border-l md:border-[var(--charcoal)]/12 md:pl-12"
                      }
                    >
                      <div
                        className={`${MICRO} ${
                          p === 0
                            ? "text-[var(--charcoal-light)]/60"
                            : "text-[var(--crimson)]"
                        }`}
                      >
                        {panel.label}
                      </div>
                      <svg
                        role="img"
                        aria-label={panel.aria}
                        viewBox="0 0 400 132"
                        className="mt-4 w-full"
                        fill="none"
                      >
                        <title>{panel.aria}</title>
                        <path
                          d="M16 16V118H384"
                          stroke="var(--charcoal)"
                          strokeOpacity="0.22"
                        />
                        {panel.fit === "line" ? (
                          <path
                            d="M28 98L372 44"
                            stroke="var(--charcoal)"
                            strokeOpacity="0.75"
                            strokeWidth="1.5"
                          />
                        ) : (
                          <path
                            d={`M${points.map(([x, y]) => `${x} ${y}`).join(" L")}`}
                            stroke="var(--crimson)"
                            strokeWidth="1.5"
                          />
                        )}
                        {points.map(([x, y]) => (
                          <circle
                            key={x}
                            cx={x}
                            cy={y}
                            r="3.5"
                            fill="var(--charcoal)"
                            fillOpacity="0.45"
                          />
                        ))}
                      </svg>
                    </div>
                  );
                })}
              </div>
            </figure>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          24. PORTFOLIO CONSTRUCTION: four things the tools help with. The
          assumptions drawn dashed because they are assumptions. The
          default route to decision support and the gated route to
          automated execution.                              [quiz topic]
      ================================================================== */}
      <Slide id="portfolio-construction" border align="left">
        <Head1 eyebrow="Decision support">
          Portfolio Construction and Decision Support
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Portfolio tools can help rank opportunities, estimate correlations,
            rebalance exposures, and test scenarios under changing constraints.
          </p>
          <Steps
            items={[
              "rank opportunities",
              "estimate correlations",
              "rebalance exposures",
              "test scenarios",
            ]}
            cols="md:grid-cols-4"
            className="mt-6 max-w-5xl"
          />
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-3xl`}>
              Their usefulness depends on assumptions about liquidity,
              turnover, transaction costs, and risk appetite.
            </p>
            <div aria-hidden className="mt-6 max-w-4xl">
              <div className={`${MICRO} text-[var(--charcoal-light)]/55`}>
                Assumptions
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
                {["liquidity", "turnover", "transaction costs", "risk appetite"].map(
                  (a) => (
                    <div
                      key={a}
                      className={`${TAG} border border-dashed border-[var(--charcoal)]/40 px-4 py-4 text-[var(--charcoal-light)]/75`}
                    >
                      {a}
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <p className={`${DISPLAY} max-w-4xl`}>
              Portfolio recommendations should be treated as decision support
              unless governance explicitly permits automated execution.
            </p>
            <svg
              role="img"
              aria-label="Portfolio recommendations routed by default to decision support, with a governance gate controlling the branch to automated execution."
              viewBox="0 0 800 136"
              className="mt-7 w-full"
              fill="none"
            >
              <title>
                Portfolio recommendations routed by default to decision support,
                with a governance gate controlling the branch to automated
                execution.
              </title>
              <circle
                cx="30"
                cy="42"
                r="6"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              />
              <text
                {...SVG_LABEL}
                x="24"
                y="22"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                PORTFOLIO RECOMMENDATIONS
              </text>
              <path
                d="M36 42H732"
                stroke="var(--crimson)"
                strokeWidth="1.5"
              />
              <path
                d="M725 37L732 42L725 47"
                stroke="var(--crimson)"
                strokeWidth="1.5"
              />
              <rect x="732" y="35" width="14" height="14" fill="var(--crimson)" />
              <text
                {...SVG_LABEL}
                x="716"
                y="28"
                textAnchor="end"
                fill="var(--crimson)"
              >
                DECISION SUPPORT
              </text>
              <path
                d="M220 42 C 260 42, 260 92, 300 92 H428M452 92H732"
                stroke="var(--charcoal)"
                strokeOpacity="0.45"
                strokeDasharray="5 5"
              />
              <path
                d="M725 87L732 92L725 97"
                stroke="var(--charcoal)"
                strokeOpacity="0.55"
              />
              <rect
                x="732"
                y="85"
                width="14"
                height="14"
                stroke="var(--charcoal)"
                strokeOpacity="0.55"
              />
              <text
                {...SVG_LABEL}
                x="716"
                y="78"
                textAnchor="end"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                AUTOMATED EXECUTION
              </text>
              <rect
                x="434"
                y="76"
                width="12"
                height="32"
                fill="var(--crimson)"
                fillOpacity="0.12"
                stroke="var(--crimson)"
                strokeWidth="1.5"
              />
              <text
                {...SVG_LABEL}
                x="440"
                y="124"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                GOVERNANCE
              </text>
            </svg>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          25. MODEL RISK: three series that shift abruptly. Performance
          that holds in one regime and falls at the break. Four disciplines
          of model risk management.        [quiz: portfolio-construction]
      ================================================================== */}
      <Slide
        id="model-risk"
        border
        align="left"
        quizData={quiz["model-risk"]}
      >
        <Head1 eyebrow="When the world shifts" signal>
          Model Risk in Non-Stationary Environments
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Financial markets, customer behavior, and macro conditions change,
            sometimes abruptly.
          </p>
          <figure className="mt-6 w-full max-w-5xl">
            <svg
              role="img"
              aria-label="Time series for financial markets, customer behavior, and macro conditions shifting abruptly at crimson step points."
              viewBox="0 0 800 144"
              className="w-full"
              fill="none"
            >
              <title>
                Time series for financial markets, customer behavior, and macro
                conditions shifting abruptly at crimson step points.
              </title>
              {[
                { label: "FINANCIAL MARKETS", at: 460, dy: 14 },
                { label: "CUSTOMER BEHAVIOR", at: 610, dy: -16 },
                { label: "MACRO CONDITIONS", at: 370, dy: -16 },
              ].map((lane, i) => {
                const y = 32 + i * 44;
                const jitter = (k: number) => ((k * 7 + i * 3) % 5) - 2;
                const stepK = (lane.at - 190) / 30;
                const d = Array.from({ length: 21 }, (_, k) => {
                  const x = 190 + k * 30;
                  const base = y + jitter(k);
                  if (x === lane.at) return `${x} ${base} L${x} ${base + lane.dy}`;
                  return `${x} ${x > lane.at ? base + lane.dy : base}`;
                }).join(" L");
                const jumpY = y + jitter(stepK);
                return (
                  <g key={lane.label}>
                    <text
                      {...SVG_LABEL}
                      x="4"
                      y={y + 3.5}
                      fill="var(--charcoal)"
                      fillOpacity="0.65"
                    >
                      {lane.label}
                    </text>
                    <path
                      d={`M${d}`}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.45"
                      strokeWidth="1.25"
                    />
                    <path
                      d={`M${lane.at} ${jumpY}v${lane.dy}`}
                      stroke="var(--crimson)"
                      strokeWidth="2.5"
                    />
                    <circle
                      cx={lane.at}
                      cy={jumpY + lane.dy}
                      r="3.5"
                      fill="var(--crimson)"
                    />
                  </g>
                );
              })}
            </svg>
          </figure>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              A model that performs well in one regime can fail precisely when
              volatility or structural breaks matter most.
            </p>
            <figure className="mt-6">
              <svg
                role="img"
                aria-label="A model performing well in one regime and failing after structural breaks."
                viewBox="0 0 800 132"
                className="w-full"
                fill="none"
              >
                <title>
                  A model performing well in one regime and failing after
                  structural breaks.
                </title>
                <rect
                  x="20"
                  y="28"
                  width="440"
                  height="90"
                  fill="var(--charcoal)"
                  fillOpacity="0.04"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.12"
                />
                <path
                  d="M460 24V120"
                  stroke="var(--crimson)"
                  strokeOpacity="0.55"
                  strokeDasharray="4 4"
                  strokeWidth="1.25"
                />
                <text
                  {...SVG_LABEL}
                  x="460"
                  y="16"
                  textAnchor="middle"
                  fill="var(--crimson)"
                >
                  STRUCTURAL BREAKS
                </text>
                <path
                  d="M20 56 C 120 52, 300 60, 460 54"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.7"
                  strokeWidth="1.5"
                />
                <path
                  d="M460 54 C 520 56, 560 100, 640 108"
                  stroke="var(--crimson)"
                  strokeWidth="1.75"
                />
                <circle cx="460" cy="54" r="4" fill="var(--crimson)" />
                <text
                  {...SVG_LABEL}
                  x="34"
                  y="44"
                  fill="var(--charcoal)"
                  fillOpacity="0.65"
                >
                  PERFORMS WELL
                </text>
                <text
                  {...SVG_LABEL}
                  x="34"
                  y="106"
                  fill="var(--charcoal)"
                  fillOpacity="0.55"
                >
                  ONE REGIME
                </text>
                <text {...SVG_LABEL} x="654" y="111" fill="var(--crimson)">
                  FAIL
                </text>
              </svg>
            </figure>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <p className={`${DISPLAY} max-w-4xl`}>
              Model risk management requires monitoring drift, challenger
              models, override policies, and disciplined retirement of stale
              systems.
            </p>
            <Steps
              items={[
                "monitoring drift",
                "challenger models",
                "override policies",
                "disciplined retirement of stale systems",
              ]}
              cols="md:grid-cols-4"
              mark={3}
              className="mt-6 max-w-5xl"
            />
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          26. STRESS TESTING: the band of severe but plausible shocks. Four
          tasks AI can accelerate. Exact prediction struck against surfacing
          what matters before a crisis.
      ================================================================== */}
      <Slide id="stress-testing" border align="left">
        <Head1 eyebrow="Severe but plausible">
          Stress Testing and Scenario Analysis
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Stress testing asks how portfolios and business lines behave under
            severe but plausible shocks.
          </p>
          <figure className="mt-6 w-full max-w-5xl">
            <svg
              role="img"
              aria-label="Shock severity scale highlighting the crimson band of severe but plausible shocks."
              viewBox="0 0 800 96"
              className="w-full"
              fill="none"
            >
              <title>
                Shock severity scale highlighting the crimson band of severe but
                plausible shocks.
              </title>
              <path d="M20 52H700" stroke="var(--charcoal)" strokeOpacity="0.3" />
              <path
                d="M700 52H780"
                stroke="var(--charcoal)"
                strokeOpacity="0.28"
                strokeDasharray="3 4"
              />
              <path
                d="M773 47L780 52L773 57"
                stroke="var(--charcoal)"
                strokeOpacity="0.45"
              />
              {Array.from({ length: 18 }).map((_, i) => (
                <path
                  key={i}
                  d={`M${20 + i * 40} 48v8`}
                  stroke="var(--charcoal)"
                  strokeOpacity="0.3"
                />
              ))}
              <rect
                x="520"
                y="46"
                width="180"
                height="12"
                fill="var(--crimson)"
                fillOpacity="0.22"
                stroke="var(--crimson)"
                strokeOpacity="0.55"
              />
              <path
                d="M520 38V30H700V38"
                stroke="var(--crimson)"
                strokeWidth="1.5"
              />
              <text
                {...SVG_LABEL}
                x="610"
                y="20"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                SEVERE BUT PLAUSIBLE
              </text>
              <text
                {...SVG_LABEL}
                x="400"
                y="82"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.55"
              >
                SHOCKS
              </text>
            </svg>
          </figure>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-3xl`}>
              AI can accelerate scenario construction, loss estimation,
              narrative generation, and sensitivity analysis.
            </p>
            <Steps
              items={[
                "scenario construction",
                "loss estimation",
                "narrative generation",
                "sensitivity analysis",
              ]}
              cols="md:grid-cols-4"
              className="mt-6 max-w-5xl"
            />
          </div>
        </div>

        <div className="w-full">
          <div className="mt-14 w-full max-w-5xl">
            <p className={`${DISPLAY} max-w-4xl`}>
              The point is not to predict the future exactly, but to surface
              concentrations, vulnerabilities, and management actions before
              crisis conditions emerge.
            </p>
            <div className="mt-6">
              <Split1
                left="Predict the future exactly"
                right="Before crisis conditions emerge"
                strikeLeft
              />
            </div>
            <Terms
              items={["concentrations", "vulnerabilities", "management actions"]}
              className="mt-4"
            />
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          27. TREASURY AND LIQUIDITY: five forecasts. The balance sheet as a
          grid with one cell out of place. Explicit limits drawn as a hard
          rule over what they are intertwined with.
      ================================================================== */}
      <Slide id="treasury-liquidity" border align="left">
        <Head1 eyebrow="The balance sheet">
          Treasury, Liquidity, and Balance Sheet Management
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Treasury teams need forecasts of cash flows, deposit stability,
            funding needs, collateral usage, and interest-rate sensitivity.
          </p>
          <Steps
            items={[
              "cash flows",
              "deposit stability",
              "funding needs",
              "collateral usage",
              "interest-rate sensitivity",
            ]}
            cols="sm:grid-cols-3 md:grid-cols-5"
            className="mt-6 max-w-5xl"
          />
        </div>

        <div className="w-full">
          <div className="mt-12 grid w-full max-w-5xl items-center gap-10 border-t border-[var(--charcoal)]/10 pt-8 md:grid-cols-[1fr_16rem] md:gap-14">
            <p className={BODY}>
              AI can improve forecasting granularity and anomaly detection
              across a complex balance sheet.
            </p>
            <div aria-hidden>
              <div className={`${MICRO} text-[var(--charcoal-light)]/55`}>
                Balance sheet
              </div>
              <div className="mt-3 grid grid-cols-8 gap-1">
                {Array.from({ length: 40 }).map((_, i) => (
                  <span
                    key={i}
                    className={`block aspect-square ${
                      i === 21
                        ? "bg-[var(--crimson)]"
                        : "bg-[var(--charcoal)]/[0.1]"
                    }`}
                    style={
                      i === 21
                        ? undefined
                        : { opacity: 0.55 + ((i * 7) % 5) * 0.1 }
                    }
                  />
                ))}
              </div>
              <div className={`${MICRO} mt-3 text-[var(--crimson)]`}>
                Anomaly detection
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <p className={`${DISPLAY} max-w-4xl`}>
              Managers still need explicit limits because liquidity decisions
              are intertwined with regulation, confidence, and market access.
            </p>
            <div aria-hidden className="mt-6 max-w-3xl">
              <div className="flex items-center gap-4">
                <span className={`${MICRO} shrink-0 text-[var(--crimson)]`}>
                  Explicit limits
                </span>
                <span className="h-[3px] flex-1 bg-[var(--crimson)]" />
              </div>
              <Terms
                items={["regulation", "confidence", "market access"]}
                className="mt-4"
              />
            </div>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          28. PRICING, HEDGING, LIMITS OF AUTOMATION: continuous
          optimization set against what full automation amplifies. The
          evaluation checklist with local accuracy marked as not enough.
      ================================================================== */}
      <Slide id="pricing-hedging" border align="left">
        <Head1 eyebrow="Where automation stops">
          Pricing, Hedging, and the Limits of Automation
        </Head1>

        <div className="w-full">
          <div className="mt-10 w-full max-w-5xl">
            <p className={`${LEAD} max-w-4xl`}>
              Some financial decisions can be optimized continuously, but full
              automation can amplify feedback loops and hidden assumptions.
            </p>
            <div className="mt-6">
              <Split1
                left="Optimized continuously"
                right="Full automation | feedback loops and hidden assumptions"
                cols="grid-cols-[1fr_1.6fr]"
              />
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Pricing and hedging systems should be evaluated not only by local
              accuracy, but by their behavior under stress and low-liquidity
              conditions.
            </p>
            <ul
              aria-hidden
              className="mt-6 max-w-2xl border-t border-[var(--charcoal)]/15"
            >
              {[
                { test: "local accuracy", on: false },
                { test: "behavior under stress", on: true },
                { test: "low-liquidity conditions", on: true },
              ].map((row) => (
                <li
                  key={row.test}
                  className="flex items-center justify-between gap-4 border-b border-[var(--charcoal)]/10 py-3"
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`h-3 w-3 shrink-0 border ${
                        row.on
                          ? "border-[var(--crimson)] bg-[var(--crimson)]"
                          : "border-[var(--charcoal)]/35"
                      }`}
                    />
                    <span
                      className={`${TAG} ${
                        row.on
                          ? "text-[var(--charcoal)]"
                          : "text-[var(--charcoal-light)]/55"
                      }`}
                    >
                      {row.test}
                    </span>
                  </span>
                  {!row.on && (
                    <span
                      className={`${MICRO} text-[var(--charcoal-light)]/45`}
                    >
                      Not only
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Discussion1>
          Which market or treasury decisions should remain human-approved even
          if an automated system is usually faster and more consistent?
        </Discussion1>
      </Slide>

      <ModulePlate2
        id="module-5"
        numeral="V"
        title="Operations and Client Service"
        lines={[
          "This module shifts from high-stakes analytics to the operational backbone of finance.",
          "Much of the near-term value in AI comes from process redesign rather than frontier modeling.",
        ]}
      />

      {/* ==================================================================
          30. INTELLIGENT DOCUMENT PROCESSING: seven stacked document
          types. A form with one missing field. OCR struck against the
          benefit that matters.
      ================================================================== */}
      <Slide id="document-processing" border align="left">
        <Head1 eyebrow="Documents at scale">Intelligent Document Processing</Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Financial firms handle applications, income documents, contracts,
            invoices, statements, policies, and regulatory forms at scale.
          </p>
          <div aria-hidden className="mt-8 flex flex-wrap gap-x-5 gap-y-6">
            {[
              "applications",
              "income documents",
              "contracts",
              "invoices",
              "statements",
              "policies",
              "regulatory forms",
            ].map((doc) => (
              <div key={doc} className="w-[5.75rem]">
                <div className="relative h-24 w-[4.5rem]">
                  <span className="absolute left-2 top-2 h-full w-full border border-[var(--charcoal)]/12 bg-[var(--surface)]" />
                  <span className="absolute left-1 top-1 h-full w-full border border-[var(--charcoal)]/20 bg-[var(--surface)]" />
                  <span className="absolute left-0 top-0 flex h-full w-full flex-col gap-2 border border-[var(--charcoal)]/35 bg-[var(--surface)] p-2.5">
                    {[80, 60, 90, 50, 70].map((w) => (
                      <span
                        key={w}
                        className="block h-px bg-[var(--charcoal)]/30"
                        style={{ width: `${w}%` }}
                      />
                    ))}
                  </span>
                </div>
                <span className="mt-4 block font-serif text-[0.9375rem] italic tracking-normal text-[var(--charcoal-light)]/70">
                  {doc}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 grid w-full max-w-5xl items-center gap-10 border-t border-[var(--charcoal)]/10 pt-8 md:grid-cols-[1fr_11rem] md:gap-12">
            <div>
              <p className={BODY}>
                AI can extract fields, compare documents, identify missing
                items, and route exceptions for review.
              </p>
              <Steps
                items={[
                  "extract fields",
                  "compare documents",
                  "identify missing items",
                  "route exceptions",
                ]}
                cols="md:grid-cols-4"
                mark={2}
              />
            </div>
            <div
              aria-hidden
              className="w-40 border border-[var(--charcoal)]/35 bg-[var(--surface)] p-4"
            >
              {[
                { w: "w-6", missing: false },
                { w: "w-8", missing: false },
                { w: "w-5", missing: true },
                { w: "w-7", missing: false },
              ].map((field, i) => (
                <div key={i} className="mb-3 flex items-center gap-2 last:mb-0">
                  <span
                    className={`h-1.5 shrink-0 bg-[var(--charcoal)]/30 ${field.w}`}
                  />
                  <span
                    className={`h-3.5 flex-1 ${
                      field.missing
                        ? "border border-dashed border-[var(--crimson)]"
                        : "border-b border-[var(--charcoal)]/35"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-14 w-full max-w-5xl">
            <p className={`${DISPLAY} max-w-4xl`}>
              The managerial benefit is shorter cycle time and cleaner
              downstream data, not merely optical character recognition.
            </p>
            <div className="mt-6">
              <Split1
                left="Merely optical character recognition"
                right="Shorter cycle time | cleaner downstream data"
                strikeLeft
                cols="grid-cols-[1fr_1.3fr]"
              />
            </div>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          31. RECONCILIATION AND EXCEPTIONS: records matched across two
          systems with one break. Three things machine learning adds.
          Prompts set against hidden rules.
      ================================================================== */}
      <Slide id="reconciliation" border align="left">
        <Head1 eyebrow="Control rooms">
          Reconciliation, Exceptions, and Control Rooms
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Many finance operations revolve around matching records across
            systems, identifying breaks, and resolving root causes quickly.
          </p>
          <svg
            role="img"
            aria-label="Matching records across two systems with four matched rows and one crimson row identifying breaks."
            viewBox="0 0 800 156"
            className="mt-7 w-full max-w-5xl"
            fill="none"
          >
            <title>
              Matching records across two systems with four matched rows and one
              crimson row identifying breaks.
            </title>
            <text
              {...SVG_LABEL}
              x="152"
              y="16"
              textAnchor="middle"
              fill="var(--charcoal)"
              fillOpacity="0.55"
            >
              RECORDS
            </text>
            <text
              {...SVG_LABEL}
              x="400"
              y="16"
              textAnchor="middle"
              fill="var(--charcoal)"
              fillOpacity="0.55"
            >
              MATCHING RECORDS ACROSS SYSTEMS
            </text>
            <text
              {...SVG_LABEL}
              x="648"
              y="16"
              textAnchor="middle"
              fill="var(--charcoal)"
              fillOpacity="0.55"
            >
              SYSTEMS
            </text>
            {[0, 1, 2, 3, 4].map((i) => {
              const y = 38 + i * 26;
              const broken = i === 2;
              return (
                <g key={i}>
                  <rect
                    x="32"
                    y={y - 7}
                    width="240"
                    height="14"
                    fill={broken ? "var(--crimson)" : "var(--charcoal)"}
                    fillOpacity={broken ? 0.08 : 0.04}
                    stroke={broken ? "var(--crimson)" : "var(--charcoal)"}
                    strokeOpacity={broken ? 0.7 : 0.25}
                  />
                  <rect
                    x="42"
                    y={y - 2}
                    width={130 + ((i * 37) % 60)}
                    height="4"
                    fill={broken ? "var(--crimson)" : "var(--charcoal)"}
                    fillOpacity={broken ? 0.55 : 0.25}
                  />
                  <rect
                    x="528"
                    y={y - 7}
                    width="240"
                    height="14"
                    fill={broken ? "var(--crimson)" : "var(--charcoal)"}
                    fillOpacity={broken ? 0.08 : 0.04}
                    stroke={broken ? "var(--crimson)" : "var(--charcoal)"}
                    strokeOpacity={broken ? 0.7 : 0.25}
                  />
                  <rect
                    x="538"
                    y={y - 2}
                    width={130 + ((i * 23) % 60)}
                    height="4"
                    fill={broken ? "var(--crimson)" : "var(--charcoal)"}
                    fillOpacity={broken ? 0.55 : 0.25}
                  />
                  {broken ? (
                    <>
                      <path
                        d={`M272 ${y}H352M448 ${y}H528`}
                        stroke="var(--crimson)"
                        strokeWidth="1.5"
                      />
                      <path
                        d={`M348 ${y - 5}l8 10M444 ${y - 5}l8 10`}
                        stroke="var(--crimson)"
                        strokeWidth="1.5"
                      />
                      <text
                        {...SVG_LABEL}
                        x="400"
                        y={y + 3.5}
                        textAnchor="middle"
                        fill="var(--crimson)"
                      >
                        BREAKS
                      </text>
                    </>
                  ) : (
                    <path
                      d={`M272 ${y}H528`}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.3"
                    />
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Machine learning can prioritize exceptions, detect unusual break
              patterns, and learn which cases need experienced reviewers.
            </p>
            <Steps
              items={[
                "prioritize exceptions",
                "detect unusual break patterns",
                "learn which cases need experienced reviewers",
              ]}
              cols="md:grid-cols-3"
              className="mt-6 max-w-4xl"
            />
          </div>
        </div>

        <div className="w-full">
          <div className="mt-14 w-full max-w-5xl">
            <p className={`${DISPLAY} max-w-4xl`}>
              Control quality depends on audit trails, override reason codes,
              and whether teams use AI outputs as prompts rather than hidden
              rules.
            </p>
            <div className="mt-6">
              <Split1 left="AI outputs as prompts" right="Hidden rules" />
            </div>
            <Terms
              items={["audit trails", "override reason codes"]}
              className="mt-4"
            />
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          32. CUSTOMER SERVICE AND ADVICE: three assistant jobs. Three
          sectors resting on suitability and fiduciary expectations. Two
          trays for interactions.
      ================================================================== */}
      <Slide id="customer-service" border align="left">
        <Head1 eyebrow="Relationship support">
          Customer Service, Advice, and Relationship Support
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            AI assistants can handle routine inquiries, summarize relationship
            history, and help staff prepare for conversations.
          </p>
          <Steps
            items={[
              "routine inquiries",
              "relationship history",
              "prepare for conversations",
            ]}
            cols="md:grid-cols-3"
            className="mt-6 max-w-3xl"
          />
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              In wealth management, insurance, or banking, suitability and
              fiduciary expectations shape what may be automated.
            </p>
            <div aria-hidden className="mt-7 w-full max-w-3xl">
              <div className="grid grid-cols-3 gap-3">
                {["wealth management", "insurance", "banking"].map((s) => (
                  <div
                    key={s}
                    className={`${TAG} border border-b-0 border-[var(--charcoal)]/15 px-3 py-5 text-[var(--charcoal-light)]/70`}
                  >
                    {s}
                  </div>
                ))}
              </div>
              <div
                className={`${MICRO} bg-[var(--crimson)] px-4 py-3 text-[var(--surface)]`}
              >
                Suitability and fiduciary expectations
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <p className={`${DISPLAY} max-w-4xl`}>
              The right design question is which interactions benefit from
              speed and consistency, and which require contextual human trust.
            </p>
            <div aria-hidden className="mt-6 grid max-w-2xl grid-cols-2 gap-6">
              {[
                {
                  tray: "Speed and consistency",
                  n: 3,
                  tone: "border-[var(--charcoal)]/20 text-[var(--charcoal-light)]/60",
                  head: "text-[var(--charcoal-light)]/55",
                },
                {
                  tray: "Contextual human trust",
                  n: 2,
                  tone: "border-[var(--crimson)]/45 text-[var(--crimson)]",
                  head: "text-[var(--crimson)]",
                },
              ].map((t) => (
                <div
                  key={t.tray}
                  className="border-t border-[var(--charcoal)]/15 pt-3"
                >
                  <div className={`${MICRO} ${t.head}`}>{t.tray}</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {Array.from({ length: t.n }).map((_, i) => (
                      <span
                        key={i}
                        className={`border px-2 py-1 font-serif text-[0.9375rem] italic tracking-normal ${t.tone}`}
                      >
                        interactions
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          33. PERSONALIZATION AND CONDUCT RISK: four things firms tailor.
          A nudge crossing from relevance into manipulation or mis-selling.
          Four guardrails drawn as rails.
      ================================================================== */}
      <Slide id="conduct-risk" border align="left">
        <Head1 eyebrow="Conduct" signal>
          Personalization, Suitability, and Conduct Risk
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Financial firms increasingly tailor offers, reminders, education,
            or next-best actions to customer context.
          </p>
          <div
            aria-hidden
            className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-3"
          >
            {["offers", "reminders", "education", "next-best actions"].map(
              (o) => (
                <span
                  key={o}
                  className={`${TAG} border border-[var(--charcoal)]/15 px-3 py-2 text-[var(--charcoal-light)]/70`}
                >
                  {o}
                </span>
              ),
            )}
            <span className="text-[var(--crimson)]">→</span>
            <span className={`${MICRO} text-[var(--crimson)]`}>
              Customer context
            </span>
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Personalization can improve relevance, but unsuitable nudges may
              cross into manipulation or mis-selling.
            </p>
            <svg
              role="img"
              aria-label="Personalization improving relevance within bounds while unsuitable nudges cross the boundary into manipulation or mis-selling."
              viewBox="0 0 800 108"
              className="mt-6 w-full"
              fill="none"
            >
              <title>
                Personalization improving relevance within bounds while
                unsuitable nudges cross the boundary into manipulation or
                mis-selling.
              </title>
              <rect
                x="20"
                y="14"
                width="480"
                height="62"
                fill="var(--charcoal)"
                fillOpacity="0.03"
                stroke="var(--charcoal)"
                strokeOpacity="0.15"
              />
              <rect
                x="500"
                y="14"
                width="280"
                height="62"
                fill="var(--crimson)"
                fillOpacity="0.06"
                stroke="var(--crimson)"
                strokeOpacity="0.35"
              />
              <path
                d="M500 8V82"
                stroke="var(--crimson)"
                strokeOpacity="0.7"
                strokeDasharray="4 4"
                strokeWidth="1.5"
              />
              <circle
                cx="64"
                cy="48"
                r="4"
                fill="var(--charcoal)"
                fillOpacity="0.55"
              />
              <path
                d="M68 48H340"
                stroke="var(--charcoal)"
                strokeOpacity="0.45"
                strokeWidth="1.25"
              />
              <circle
                cx="340"
                cy="48"
                r="4.5"
                fill="var(--crimson)"
              />
              <path
                d="M344.5 48H664"
                stroke="var(--crimson)"
                strokeWidth="1.75"
              />
              <path
                d="M656 42L664 48L656 54"
                stroke="var(--crimson)"
                strokeWidth="1.75"
              />
              <text
                {...SVG_LABEL}
                x="204"
                y="36"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                PERSONALIZATION
              </text>
              <text
                {...SVG_LABEL}
                x="420"
                y="36"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                UNSUITABLE NUDGES
              </text>
              <text
                {...SVG_LABEL}
                x="260"
                y="96"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                RELEVANCE
              </text>
              <text
                {...SVG_LABEL}
                x="640"
                y="96"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                MANIPULATION OR MIS-SELLING
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <p className={`${DISPLAY} max-w-4xl`}>
              Managers need guardrails on objectives, product eligibility,
              vulnerability signals, and escalation when AI-generated guidance
              becomes too prescriptive.
            </p>
            <div
              aria-hidden
              className="mt-6 grid grid-cols-2 border-y-2 border-[var(--crimson)] md:grid-cols-4"
            >
              {[
                "objectives",
                "product eligibility",
                "vulnerability signals",
                "escalation",
              ].map((g, i) => (
                <span
                  key={g}
                  className={`${TAG} px-4 py-3 text-[var(--charcoal-light)]/70 ${
                    i > 0 ? "md:border-l md:border-[var(--crimson)]/30" : ""
                  }`}
                >
                  {g}
                </span>
              ))}
            </div>
          </div>
        </div>

        <Discussion1>
          At what point does personalized financial guidance become a conduct
          risk rather than a service improvement?
        </Discussion1>
      </Slide>

      <ModulePlate2
        id="module-6"
        numeral="VI"
        title="Governance and Strategy"
        lines={[
          "This final module addresses the institutional capabilities required to scale AI responsibly in finance.",
          "The real differentiator is disciplined governance, not isolated pilot activity.",
        ]}
      />

      {/* ==================================================================
          35. MODEL GOVERNANCE: six lifecycle stages as a chain. Four
          questions left as blanks to fill. The inventory table with the two
          columns that make it useful.                      [quiz topic]
      ================================================================== */}
      <Slide id="model-governance" border align="left">
        <Head1 eyebrow="Across the lifecycle">
          Model Governance Across the Lifecycle
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Financial institutions need controls for data sourcing,
            development, validation, deployment, monitoring, and retirement.
          </p>
        </div>

        <ol
          aria-hidden
          className="mt-8 grid w-full max-w-5xl grid-cols-2 gap-y-6 sm:grid-cols-3 md:grid-cols-6"
        >
          {[
            "Data sourcing",
            "Development",
            "Validation",
            "Deployment",
            "Monitoring",
            "Retirement",
          ].map((stage, i) => (
            <li key={stage} className="block">
              <div className="relative border-t border-[var(--charcoal)]/20 pr-3 pt-4">
                <span className="absolute -top-[4px] left-0 h-[7px] w-[7px] rounded-full bg-[var(--crimson)]" />
                <span className={`${MICRO} block text-[var(--champagne)]`}>
                  {pad(i + 1)}
                </span>
                <span className="mt-2 block font-serif text-[1rem] font-medium tracking-normal text-[var(--charcoal)]">
                  {stage}
                </span>
              </div>
            </li>
          ))}
        </ol>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Governance must clarify who approves use, who challenges
              assumptions, who owns incidents, and how exceptions are
              documented.
            </p>
            <div
              aria-hidden
              className="mt-6 grid max-w-4xl gap-x-10 gap-y-5 md:grid-cols-2"
            >
              {[
                "who approves use",
                "who challenges assumptions",
                "who owns incidents",
                "how exceptions are documented",
              ].map((q) => (
                <div key={q} className="flex items-end gap-4">
                  <span
                    className={`${TAG} shrink-0 text-[var(--charcoal-light)]/75`}
                  >
                    {q}
                  </span>
                  <span className="mb-1 h-0 min-w-8 flex-1 border-b border-dashed border-[var(--crimson)]/70" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <p className={`${DISPLAY} max-w-4xl`}>
              A model inventory is useful only if it is tied to actual decision
              rights and review cadence.
            </p>
            <div
              aria-hidden
              className="mt-6 max-w-3xl border-t border-[var(--charcoal)]/30"
            >
              <div className="grid grid-cols-3 border-b border-[var(--charcoal)]/15">
                <span
                  className={`${TAG} px-3 py-2.5 text-[var(--charcoal-light)]/60`}
                >
                  model inventory
                </span>
                {["decision rights", "review cadence"].map((h) => (
                  <span
                    key={h}
                    className={`${TAG} border-l border-[var(--crimson)]/30 px-3 py-2.5 text-[var(--crimson)]`}
                  >
                    {h}
                  </span>
                ))}
              </div>
              {[0, 1, 2].map((r) => (
                <div
                  key={r}
                  className="grid grid-cols-3 border-b border-[var(--charcoal)]/8"
                >
                  {[0, 1, 2].map((c) => (
                    <span
                      key={c}
                      className={`px-3 py-3 ${
                        c > 0
                          ? "border-l border-[var(--crimson)]/20 bg-[var(--crimson)]/[0.04]"
                          : ""
                      }`}
                    >
                      <span
                        className={`block h-1.5 ${
                          c > 0
                            ? "bg-[var(--crimson)]/40"
                            : "bg-[var(--charcoal)]/15"
                        }`}
                        style={{ width: `${45 + ((r * 4 + c * 3) % 5) * 11}%` }}
                      />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          36. DATA GOVERNANCE AND SECURITY: three properties of finance data
          on the governance slab. Six things to manage. Attackers aimed at
          both the institution and the models it depends on.
                                               [quiz: model-governance]
      ================================================================== */}
      <Slide
        id="data-governance"
        border
        align="left"
        quizData={quiz["data-governance"]}
      >
        <Head1 eyebrow="Control function">
          Data Governance, Privacy, and Cybersecurity
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Finance data is sensitive, connected, and valuable, making data
            governance a strategic control function.
          </p>
          <div aria-hidden className="mt-8 w-full max-w-3xl">
            <div className="grid grid-cols-3 gap-3">
              {["sensitive", "connected", "valuable"].map((p) => (
                <div
                  key={p}
                  className={`${TAG} border border-b-0 border-[var(--charcoal)]/15 px-3 py-5 text-[var(--charcoal-light)]/70`}
                >
                  {p}
                </div>
              ))}
            </div>
            <div
              className={`${MICRO} bg-[var(--crimson)] px-4 py-3 text-[var(--surface)]`}
            >
              Data governance | strategic control function
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Institutions must manage access, retention, lineage, consent,
              vendor exposure, and prompt or model leakage risks.
            </p>
            <Steps
              items={[
                "access",
                "retention",
                "lineage",
                "consent",
                "vendor exposure",
                "prompt or model leakage risks",
              ]}
              cols="md:grid-cols-3"
              className="mt-6 max-w-4xl"
            />
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <p className={`${DISPLAY} max-w-4xl`}>
              Security design is part of AI strategy because attackers may
              target both the institution and the models it depends on.
            </p>
            <svg
              role="img"
              aria-label="Attackers targeting both the institution and the models it depends on."
              viewBox="0 0 800 124"
              className="mt-7 w-full"
              fill="none"
            >
              <title>
                Attackers targeting both the institution and the models it
                depends on.
              </title>
              <circle cx="64" cy="62" r="8" fill="var(--crimson)" />
              <text
                {...SVG_LABEL}
                x="64"
                y="94"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                ATTACKERS
              </text>
              <path
                d="M72 62 C 196 62, 272 34, 412 34"
                stroke="var(--crimson)"
                strokeOpacity="0.7"
                strokeWidth="1.5"
              />
              <path
                d="M405 29L412 34L405 39"
                stroke="var(--crimson)"
                strokeWidth="1.5"
              />
              <path
                d="M72 62 C 196 62, 272 90, 412 90"
                stroke="var(--crimson)"
                strokeOpacity="0.7"
                strokeWidth="1.5"
              />
              <path
                d="M405 85L412 90L405 95"
                stroke="var(--crimson)"
                strokeWidth="1.5"
              />
              <path
                d="M420 42V82"
                stroke="var(--charcoal)"
                strokeOpacity="0.4"
                strokeDasharray="3 3"
              />
              {[
                { y: 34, label: "THE INSTITUTION" },
                { y: 90, label: "THE MODELS IT DEPENDS ON" },
              ].map((t) => (
                <g key={t.label}>
                  <circle
                    cx="420"
                    cy={t.y}
                    r="8"
                    fill="var(--surface)"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.65"
                    strokeWidth="1.5"
                  />
                  <text
                    {...SVG_LABEL}
                    x="442"
                    y={t.y + 3.5}
                    fill="var(--charcoal)"
                    fillOpacity="0.75"
                  >
                    {t.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          37. BUILD, BUY, OR PARTNER: vendor sourcing beside internal
          development. Five decision factors. Execution leaving the firm
          while accountability stays.
      ================================================================== */}
      <Slide id="build-buy-partner" border align="left">
        <Head1 eyebrow="Sourcing capability">Build, Buy, or Partner</Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Some AI capabilities are better sourced from vendors with proven
            tooling, while others justify internal development because data,
            workflows, or risk appetite are unique.
          </p>
          <div aria-hidden className="mt-7 grid max-w-4xl gap-6 md:grid-cols-2">
            <div className="border-t border-[var(--charcoal)]/25 pt-4">
              <div className={`${MICRO} text-[var(--charcoal-light)]/60`}>
                Sourced from vendors
              </div>
              <Terms items={["proven tooling"]} className="mt-3" />
            </div>
            <div className="border-t-2 border-[var(--crimson)] pt-4">
              <div className={`${MICRO} text-[var(--crimson)]`}>
                Internal development
              </div>
              <Terms
                items={["data", "workflows", "risk appetite"]}
                className="mt-3"
              />
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              The decision depends on differentiation, integration burden,
              vendor transparency, speed, and supervisory comfort.
            </p>
            <Steps
              items={[
                "differentiation",
                "integration burden",
                "vendor transparency",
                "speed",
                "supervisory comfort",
              ]}
              cols="sm:grid-cols-3 md:grid-cols-5"
              className="mt-6 max-w-5xl"
            />
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <p className={`${DISPLAY} max-w-4xl`}>
              Outsourcing execution does not outsource accountability for
              customer outcomes or control failures.
            </p>
            <div aria-hidden className="mt-7 max-w-3xl space-y-4">
              <div className="grid grid-cols-[8rem_1fr] items-center gap-4 md:grid-cols-[10rem_1fr]">
                <span className={`${MICRO} text-[var(--charcoal-light)]/55`}>
                  Execution
                </span>
                <span className="flex items-center gap-3">
                  <span className="h-px flex-1 bg-[var(--charcoal)]/30" />
                  <span className="text-[var(--charcoal)]/40">→</span>
                  <span
                    className={`${TAG} border border-[var(--charcoal)]/15 px-3 py-2 text-[var(--charcoal-light)]/60`}
                  >
                    outsourcing
                  </span>
                </span>
              </div>
              <div className="grid grid-cols-[8rem_1fr] items-center gap-4 md:grid-cols-[10rem_1fr]">
                <span className={`${MICRO} text-[var(--crimson)]`}>
                  Accountability
                </span>
                <span className="flex items-center gap-3">
                  <span className="h-3 w-3 shrink-0 bg-[var(--crimson)]" />
                  <Terms
                    items={["customer outcomes", "control failures"]}
                    className=""
                  />
                </span>
              </div>
            </div>
          </div>
        </div>

        <Discussion1>
          Which finance AI capabilities should remain proprietary, and which
          should be treated as infrastructure?
        </Discussion1>
      </Slide>

      {/* ==================================================================
          38. GENERATIVE AI: USES AND RED LINES: strongest and weakest set
          side by side. The red line drawn before experimentation fans out
          across teams.                                     [quiz topic]
      ================================================================== */}
      <Slide id="genai-red-lines" border align="left">
        <Head1 eyebrow="Generative AI" signal>
          Generative AI in Finance: High-Value Uses and Red Lines
        </Head1>

        <div className="mt-10 grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-0">
          <div className="md:pr-12">
            <div className={`${MICRO} text-[var(--champagne)]`}>Strongest</div>
            <p className={`${BODY} mt-4`}>
              Generative systems are strongest in summarization, knowledge
              retrieval, drafting, coding assistance, and analyst support.
            </p>
            <div aria-hidden className="mt-5 flex flex-wrap gap-2">
              {[
                "summarization",
                "knowledge retrieval",
                "drafting",
                "coding assistance",
                "analyst support",
              ].map((u) => (
                <span
                  key={u}
                  className={`${TAG} border border-[var(--charcoal)]/15 px-2.5 py-1.5 text-[var(--charcoal-light)]/70`}
                >
                  {u}
                </span>
              ))}
            </div>
          </div>
          <div className="md:border-l md:border-[var(--charcoal)]/12 md:pl-12">
            <div className={`${MICRO} text-[var(--crimson)]`}>Weakest</div>
            <p className={`${BODY} mt-4`}>
              They are weakest when used as unchecked authorities for regulated
              advice, formal disclosures, or final risk approval.
            </p>
            <div aria-hidden className="mt-5 flex flex-wrap gap-2">
              {["regulated advice", "formal disclosures", "final risk approval"].map(
                (u) => (
                  <span
                    key={u}
                    className={`${TAG} border border-[var(--crimson)]/45 px-2.5 py-1.5 text-[var(--crimson)]`}
                  >
                    {u}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${DISPLAY} max-w-4xl`}>
              Institutions should define explicit red lines for autonomous use
              before experimentation spreads across teams.
            </p>
            <svg
              role="img"
              aria-label="Defining explicit red lines for autonomous use first, before experimentation spreads across teams."
              viewBox="0 0 800 136"
              className="mt-7 w-full"
              fill="none"
            >
              <title>
                Defining explicit red lines for autonomous use first, before
                experimentation spreads across teams.
              </title>
              <rect
                x="24"
                y="46"
                width="176"
                height="40"
                fill="var(--crimson)"
                fillOpacity="0.06"
                stroke="var(--crimson)"
                strokeWidth="1.5"
              />
              <text
                {...SVG_LABEL}
                x="112"
                y="63"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                EXPLICIT RED LINES
              </text>
              <text
                {...SVG_LABEL}
                x="112"
                y="77"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                AUTONOMOUS USE
              </text>

              <path
                d="M244 22V110"
                stroke="var(--crimson)"
                strokeWidth="3"
              />
              <path
                d="M200 66H242"
                stroke="var(--crimson)"
                strokeWidth="1.5"
              />

              <circle
                cx="276"
                cy="66"
                r="4.5"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              />
              {[28, 47, 66, 85, 104].map((y) => (
                <g key={y}>
                  <path
                    d={`M280.5 66 C 400 66, 480 ${y}, 756 ${y}`}
                    stroke="var(--charcoal)"
                    strokeOpacity="0.32"
                    strokeWidth="1.25"
                  />
                  <path
                    d={`M749 ${y - 4}L756 ${y}L749 ${y + 4}`}
                    stroke="var(--charcoal)"
                    strokeOpacity="0.45"
                  />
                  <circle
                    cx="762"
                    cy={y}
                    r="3.5"
                    fill="var(--surface)"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.55"
                  />
                </g>
              ))}
              <text
                {...SVG_LABEL}
                x="520"
                y="124"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                EXPERIMENTATION SPREADS ACROSS TEAMS
              </text>
            </svg>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          39. OPERATING MODEL, TALENT, CHANGE: seven groups around durable
          adoption. The bridge of shared fluency. The two front-line
          conditions.                              [quiz: genai-red-lines]
      ================================================================== */}
      <Slide
        id="operating-model"
        border
        align="left"
        quizData={quiz["operating-model"]}
      >
        <Head1 eyebrow="People and process">
          Operating Model, Talent, and Change Management
        </Head1>

        <div className="mt-9 grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1fr_25rem] md:gap-14">
          <div>
            <p className={BODY}>
              Durable adoption requires collaboration among business leaders,
              risk, compliance, operations, data teams, model validators, and
              legal partners.
            </p>
          </div>
          <div>
            <svg
              role="img"
              aria-label="Collaboration wheel uniting business leaders, risk, compliance, operations, data teams, model validators, and legal partners around durable adoption."
              viewBox="0 0 400 200"
              className="w-full max-w-[25rem]"
              fill="none"
            >
              <title>
                Collaboration wheel uniting business leaders, risk, compliance,
                operations, data teams, model validators, and legal partners
                around durable adoption.
              </title>
              <circle
                cx="208"
                cy="104"
                r="38"
                fill="var(--crimson)"
                fillOpacity="0.06"
                stroke="var(--crimson)"
                strokeWidth="1.25"
              />
              {[
                { label: "BUSINESS LEADERS", lx: 208, ly: 20, anchor: "middle" as const },
                { label: "RISK", lx: 278, ly: 58, anchor: "start" as const },
                { label: "COMPLIANCE", lx: 292, ly: 122, anchor: "start" as const },
                { label: "OPERATIONS", lx: 254, ly: 186, anchor: "start" as const },
                { label: "DATA TEAMS", lx: 162, ly: 186, anchor: "end" as const },
                { label: "MODEL VALIDATORS", lx: 124, ly: 122, anchor: "end" as const },
                { label: "LEGAL PARTNERS", lx: 138, ly: 58, anchor: "end" as const },
              ].map((g, i) => {
                const rad = ((-90 + (i * 360) / 7) * Math.PI) / 180;
                const at = (r: number) =>
                  [
                    +(208 + r * Math.cos(rad)).toFixed(2),
                    +(104 + r * Math.sin(rad)).toFixed(2),
                  ] as const;
                const [x, y] = at(68);
                const [sx, sy] = at(38);
                const [ex, ey] = at(62);
                return (
                  <g key={g.label}>
                    <path
                      d={`M${sx} ${sy}L${ex} ${ey}`}
                      stroke="var(--crimson)"
                      strokeOpacity="0.55"
                      strokeWidth="1.25"
                    />
                    <circle
                      cx={x}
                      cy={y}
                      r="6"
                      fill="var(--surface)"
                      stroke="var(--charcoal)"
                      strokeOpacity="0.65"
                      strokeWidth="1.25"
                    />
                    <text
                      {...SVG_LABEL}
                      x={g.lx}
                      y={g.ly}
                      textAnchor={g.anchor}
                      fill="var(--charcoal)"
                      fillOpacity="0.7"
                    >
                      {g.label}
                    </text>
                  </g>
                );
              })}
              <text
                {...SVG_LABEL}
                x="208"
                y="101"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                DURABLE
              </text>
              <text
                {...SVG_LABEL}
                x="208"
                y="114"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                ADOPTION
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Talent strategy is less about hiring only specialists and more
              about building shared fluency between domain experts and
              technical teams.
            </p>
            <div aria-hidden className="mt-7 max-w-3xl">
              <div
                className={`${TAG} text-[var(--charcoal-light)]/45 [text-decoration-line:line-through]`}
              >
                hiring only specialists
              </div>
              <div className="mt-9 grid grid-cols-[1fr_minmax(6rem,1.2fr)_1fr] items-center">
                <div
                  className={`${TAG} border border-[var(--charcoal)]/25 px-3 py-4 text-center text-[var(--charcoal)]`}
                >
                  domain experts
                </div>
                <div className="relative">
                  <span className="block h-[3px] bg-[var(--crimson)]" />
                  <span
                    className={`${MICRO} absolute inset-x-0 -top-6 whitespace-nowrap text-center text-[var(--crimson)]`}
                  >
                    Shared fluency
                  </span>
                </div>
                <div
                  className={`${TAG} border border-[var(--charcoal)]/25 px-3 py-4 text-center text-[var(--charcoal)]`}
                >
                  technical teams
                </div>
              </div>
            </div>
          </div>
        </div>

        <Verdict>
          Change management matters because even accurate models fail when
          front-line staff do not trust the workflow or understand escalation.
        </Verdict>
        <div className="w-full">
          <Terms
            items={["trust the workflow", "understand escalation"]}
            className="mt-5"
          />
        </div>
      </Slide>

      {/* ==================================================================
          40. CONCLUSION: the five areas AI is embedded into, then the
          three closing statements in display weight, then the colophon.
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
          03
        </span>

        <Head1 eyebrow="What to carry forward">
          Conclusion: AI in Finance as Institutional Capability
        </Head1>

        <ol className="mt-10 w-full max-w-4xl">
          {[
            "The strongest finance applications combine prediction, automation, and governance around clearly owned decisions.",
            "Competitive advantage comes from embedding AI into credit, control, markets, service, and operations without weakening trust.",
            "The executive task is not to automate finance wholesale, but to decide where machine intelligence improves judgment, resilience, and accountability.",
          ].map((line, i) => (
            <li key={line} className="block">
              <div className="grid grid-cols-[4ch_1fr] gap-6 border-t border-[var(--charcoal)]/12 py-7 md:grid-cols-[5ch_1fr] md:gap-10">
                <span className={`${MICRO} pt-3 text-[var(--crimson)]`}>
                  {pad(i + 1)}
                </span>
                <div>
                  <p className="font-serif text-xl font-medium leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[1.75rem]">
                    {line}
                  </p>
                  {i === 1 && (
                    <ol
                      aria-hidden
                      className="mt-6 grid w-full grid-cols-2 gap-y-4 sm:grid-cols-3 md:grid-cols-5"
                    >
                      {[
                        "credit",
                        "control",
                        "markets",
                        "service",
                        "operations",
                      ].map((area, j) => (
                        <li
                          key={area}
                          className="relative border-t-2 border-[var(--crimson)]/70 pr-3 pt-3"
                        >
                          <span
                            className={`${MICRO} block text-[var(--champagne)]`}
                          >
                            {pad(j + 1)}
                          </span>
                          <span className="mt-1 block font-serif text-[0.9375rem] italic tracking-normal text-[var(--charcoal-light)]/70">
                            {area}
                          </span>
                        </li>
                      ))}
                    </ol>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="w-full">
          <div className="mt-12 flex w-full max-w-4xl flex-wrap items-baseline justify-between gap-4 border-t border-[var(--charcoal)]/12 pt-5">
            <span className={`${MICRO} text-[var(--champagne)]`}>
              End of Week 03
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
