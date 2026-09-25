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
// WEEK 03 — APPLICATIONS OF AI IN FINANCE
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
          01 · TITLE — masthead with the five things the subtitle says
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
          <h1 className="mt-10 max-w-5xl font-serif text-[clamp(2.5rem,7.5vw,5.75rem)] font-black leading-[0.92] tracking-[-0.035em] text-[var(--charcoal)]">
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
              BUSI 654 · Applications of AI in Business
            </span>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          02 · WHY FINANCE BECAME AN AI DOMAIN — the six repeated decisions
          as a ruled row; three signal sources drawn as dense tick lanes;
          one small error fanning out to what it is linked to.
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
            <figure aria-hidden className="mt-6 w-full">
              <svg viewBox="0 0 800 104" className="w-full" fill="none">
                {[
                  "DIGITAL CHANNELS",
                  "MACHINE-READABLE RECORDS",
                  "HIGH-FREQUENCY WORKFLOWS",
                ].map((lane, l) => {
                  const y = 18 + l * 34;
                  return (
                    <g key={lane}>
                      <text
                        {...SVG_LABEL}
                        x="0"
                        y={y + 3}
                        fill="var(--charcoal)"
                        fillOpacity="0.5"
                      >
                        {lane}
                      </text>
                      <path
                        d={`M236 ${y}H790`}
                        stroke="var(--charcoal)"
                        strokeOpacity="0.1"
                      />
                      {Array.from({ length: 70 }).map((_, i) => {
                        const x = 240 + i * 7.8 + ((i * 7 + l * 3) % 4);
                        const h = 2 + (((i * 37 + l * 11) ^ (i * 5)) % 9);
                        return (
                          <path
                            key={i}
                            d={`M${x.toFixed(1)} ${y - h}v${h * 2}`}
                            stroke="var(--charcoal)"
                            strokeOpacity="0.35"
                          />
                        );
                      })}
                    </g>
                  );
                })}
              </svg>
            </figure>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 grid w-full max-w-5xl items-center gap-8 md:grid-cols-[1fr_20rem] md:gap-12">
            <p className={DISPLAY}>
              Small model errors can scale quickly because financial systems
              are linked to capital, compliance, and customer trust.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 320 140"
              className="w-full max-w-[20rem]"
              fill="none"
            >
              {[
                { y: 24, label: "CAPITAL" },
                { y: 70, label: "COMPLIANCE" },
                { y: 116, label: "CUSTOMER TRUST" },
              ].map((n) => (
                <g key={n.label}>
                  <path
                    d={`M30 70L166 ${n.y}`}
                    stroke="var(--crimson)"
                    strokeOpacity="0.5"
                  />
                  <circle
                    cx="172"
                    cy={n.y}
                    r="5"
                    fill="var(--surface)"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.55"
                  />
                  <text
                    {...SVG_LABEL}
                    x="186"
                    y={n.y + 3}
                    fill="var(--charcoal)"
                    fillOpacity="0.65"
                  >
                    {n.label}
                  </text>
                </g>
              ))}
              <circle cx="26" cy="70" r="3" fill="var(--crimson)" />
              <text {...SVG_LABEL} x="0" y="134" fill="var(--crimson)">
                SMALL MODEL ERRORS
              </text>
            </svg>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          03 · DECISION ARCHITECTURE — five functions, each a lane turning
          information into decisions; three tests for AI; judgment set
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
            aria-hidden
            viewBox="0 0 800 196"
            className="mt-7 w-full max-w-5xl"
            fill="none"
          >
            <text
              {...SVG_LABEL}
              x="260"
              y="12"
              textAnchor="middle"
              fill="var(--charcoal)"
              fillOpacity="0.45"
            >
              INFORMATION
            </text>
            <text
              {...SVG_LABEL}
              x="720"
              y="12"
              textAnchor="middle"
              fill="var(--crimson)"
            >
              DECISIONS
            </text>
            {["FRONT OFFICE", "RISK", "OPERATIONS", "COMPLIANCE", "FINANCE"].map(
              (fn, i) => {
                const y = 40 + i * 36;
                return (
                  <g key={fn}>
                    <text
                      {...SVG_LABEL}
                      x="0"
                      y={y + 3}
                      fill="var(--charcoal)"
                      fillOpacity="0.6"
                    >
                      {fn}
                    </text>
                    <circle
                      cx="260"
                      cy={y}
                      r="4"
                      stroke="var(--charcoal)"
                      strokeOpacity="0.45"
                    />
                    <path
                      d={`M268 ${y}H706`}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.18"
                    />
                    <path
                      d={`M699 ${y - 4}l7 4l-7 4`}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.4"
                    />
                    <rect
                      x="714"
                      y={y - 6}
                      width="12"
                      height="12"
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
            <Split1
              left="Strengthens judgment"
              right="Unacceptable opacity"
            />
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              The strategic question is where machine assistance strengthens
              judgment and where it creates unacceptable opacity.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          04 · VALUE CREATION — revenue, cost and risk as three ruled rows,
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
          06 · DATA TYPES AND SIGNAL QUALITY — the structured table; four
          richer forms drawn as glyphs; then the three data disciplines set
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
          <div aria-hidden className="mt-7 w-full max-w-5xl overflow-x-auto">
            <div className="min-w-[34rem] border-t border-[var(--charcoal)]/30">
              <div className="grid grid-cols-5 border-b border-[var(--charcoal)]/15">
                {[
                  "transactions",
                  "bureau files",
                  "contracts",
                  "claims",
                  "market data",
                ].map((col) => (
                  <span
                    key={col}
                    className={`${TAG} px-3 py-2.5 text-[var(--charcoal-light)]/75`}
                  >
                    {col}
                  </span>
                ))}
              </div>
              {[0, 1, 2].map((r) => (
                <div
                  key={r}
                  className="grid grid-cols-5 border-b border-[var(--charcoal)]/8"
                >
                  {[0, 1, 2, 3, 4].map((c) => (
                    <span key={c} className="px-3 py-3">
                      <span
                        className="block h-1.5 bg-[var(--charcoal)]/15"
                        style={{ width: `${40 + ((r * 3 + c * 5) % 6) * 10}%` }}
                      />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-3xl`}>
              Text, voice, document images, and relationship graphs expand what
              firms can monitor and automate.
            </p>
            <div
              aria-hidden
              className="mt-7 grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4"
            >
              {[
                {
                  label: "text",
                  glyph: [52, 44, 58, 30].map((w, i) => (
                    <path
                      key={i}
                      d={`M4 ${7 + i * 9}H${w}`}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.5"
                    />
                  )),
                },
                {
                  label: "voice",
                  glyph: [6, 14, 24, 10, 30, 18, 8, 26, 32, 12, 20, 6, 16, 8].map(
                    (h, i) => (
                      <path
                        key={i}
                        d={`M${4 + i * 4.2} ${20 - h / 2}v${h}`}
                        stroke="var(--crimson)"
                        strokeOpacity="0.75"
                      />
                    ),
                  ),
                },
                {
                  label: "document images",
                  glyph: (
                    <>
                      <rect
                        x="14"
                        y="2"
                        width="36"
                        height="36"
                        stroke="var(--charcoal)"
                        strokeOpacity="0.5"
                      />
                      <rect
                        x="19"
                        y="7"
                        width="26"
                        height="14"
                        fill="var(--charcoal)"
                        fillOpacity="0.2"
                      />
                      <path
                        d="M19 27H45M19 32H37"
                        stroke="var(--charcoal)"
                        strokeOpacity="0.4"
                      />
                    </>
                  ),
                },
                {
                  label: "relationship graphs",
                  glyph: (
                    <>
                      <path
                        d="M8 30L28 8L54 22L34 34L8 30M28 8L34 34"
                        stroke="var(--charcoal)"
                        strokeOpacity="0.4"
                      />
                      {[
                        [8, 30],
                        [28, 8],
                        [54, 22],
                        [34, 34],
                      ].map(([x, y]) => (
                        <circle
                          key={`${x}-${y}`}
                          cx={x}
                          cy={y}
                          r="3.5"
                          fill="var(--surface)"
                          stroke="var(--charcoal)"
                          strokeOpacity="0.6"
                        />
                      ))}
                    </>
                  ),
                },
              ].map((form) => (
                <div
                  key={form.label}
                  className="border-t border-[var(--charcoal)]/15 pt-4"
                >
                  <svg viewBox="0 0 64 40" className="h-10 w-16" fill="none">
                    {form.glyph}
                  </svg>
                  <span
                    className={`${TAG} mt-3 block text-[var(--charcoal-light)]/70`}
                  >
                    {form.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-14 w-full max-w-5xl">
            <div
              aria-hidden
              className="flex flex-wrap items-center gap-x-8 gap-y-3"
            >
              <div className="space-y-1.5">
                {["data lineage", "timestamp quality", "entity resolution"].map(
                  (d) => (
                    <div
                      key={d}
                      className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--crimson)]"
                    >
                      {d}
                    </div>
                  ),
                )}
              </div>
              <span className="font-serif text-4xl font-light text-[var(--charcoal)]/35">
                &gt;
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--charcoal-light)]/45">
                model novelty
              </span>
            </div>
            <p className={`${DISPLAY} mt-7 max-w-4xl`}>
              In finance, data lineage, timestamp quality, and entity
              resolution often matter more than model novelty.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          07 · MATCHING METHOD TO TASK — three method families as ruled rows,
          each with the tasks it supports; generative models carry the one
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
          08 · HUMAN JUDGMENT — one decision branching into its three
          consequences; the three conditions for oversight; automation with
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
              High-value financial decisions are rarely one-shot predictions;
              they carry legal, reputational, and capital consequences.
            </p>
          </div>
          <div>
            <svg
              aria-hidden
              viewBox="0 0 400 104"
              className="w-full"
              fill="none"
            >
              <text
                {...SVG_LABEL}
                x="290"
                y="12"
                fill="var(--charcoal)"
                fillOpacity="0.45"
              >
                CONSEQUENCES
              </text>
              {[
                { y: 36, label: "LEGAL" },
                { y: 66, label: "REPUTATIONAL" },
                { y: 96, label: "CAPITAL" },
              ].map((c) => (
                <g key={c.label}>
                  <path
                    d={`M62 66 C 150 66, 180 ${c.y}, 270 ${c.y}`}
                    stroke="var(--crimson)"
                    strokeOpacity="0.45"
                  />
                  <circle cx="276" cy={c.y} r="4" fill="var(--crimson)" />
                  <text
                    {...SVG_LABEL}
                    x="290"
                    y={c.y + 3}
                    fill="var(--charcoal)"
                    fillOpacity="0.7"
                  >
                    {c.label}
                  </text>
                </g>
              ))}
              <rect
                x="44"
                y="58"
                width="16"
                height="16"
                fill="var(--charcoal)"
                fillOpacity="0.75"
              />
              <text
                {...SVG_LABEL}
                x="52"
                y="96"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.5"
              >
                DECISION
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
              className="mt-5 grid gap-3 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--charcoal-light)]/70 md:grid-cols-3"
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
            <svg aria-hidden viewBox="0 0 800 76" className="w-full" fill="none">
              <circle
                cx="30"
                cy="52"
                r="6"
                fill="var(--charcoal)"
                fillOpacity="0.55"
              />
              <path
                d="M42 52H740"
                stroke="var(--charcoal)"
                strokeOpacity="0.28"
              />
              <path
                d="M360 52 C 410 52, 420 18, 480 18 H740"
                stroke="var(--crimson)"
                strokeWidth="1.5"
              />
              <circle cx="752" cy="18" r="7" fill="var(--crimson)" />
              <circle
                cx="752"
                cy="52"
                r="5"
                stroke="var(--charcoal)"
                strokeOpacity="0.5"
              />
              <text
                {...SVG_LABEL}
                x="100"
                y="72"
                fill="var(--charcoal)"
                fillOpacity="0.5"
              >
                AUTOMATION
              </text>
              <text
                {...SVG_LABEL}
                x="600"
                y="10"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                ESCALATION PATHS
              </text>
            </svg>
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              Effective design clarifies escalation paths instead of assuming
              automation is the objective.
            </p>
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
          10 · CREDIT SCORING — a static scorecard beside three richer
          pattern layers; applicants ordered by risk and cut into approve,
          review and decline; three conditions on predictive power.
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

        <div
          aria-hidden
          className="mt-9 grid w-full max-w-5xl gap-10 md:grid-cols-[16rem_1fr] md:gap-0"
        >
          <div className="md:pr-12">
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
            <svg viewBox="0 0 320 120" className="mt-4 w-full" fill="none">
              {["BEHAVIORAL", "TRANSACTIONAL", "APPLICATION-LEVEL"].map(
                (layer, l) => {
                  const y = 20 + l * 40;
                  return (
                    <g key={layer}>
                      <text
                        {...SVG_LABEL}
                        x="0"
                        y={y + 3}
                        fill="var(--charcoal)"
                        fillOpacity="0.6"
                      >
                        {layer}
                      </text>
                      {l === 0 && (
                        <path
                          d={`M160 ${y}${[0, 1, 2, 3, 4, 5]
                            .map(
                              (k) =>
                                ` Q ${173 + k * 26} ${y + (k % 2 ? 10 : -10)}, ${186 + k * 26} ${y}`,
                            )
                            .join("")}`}
                          stroke="var(--crimson)"
                          strokeWidth="1.25"
                        />
                      )}
                      {l === 1 &&
                        Array.from({ length: 22 }).map((_, i) => {
                          const h = 3 + ((i * 29) % 7);
                          return (
                            <path
                              key={i}
                              d={`M${162 + i * 7} ${y - h}v${h * 2}`}
                              stroke="var(--crimson)"
                              strokeOpacity="0.7"
                            />
                          );
                        })}
                      {l === 2 &&
                        Array.from({ length: 8 }).map((_, i) => {
                          const h = 6 + ((i * 5) % 9);
                          return (
                            <rect
                              key={i}
                              x={160 + i * 20}
                              y={y - h / 2}
                              width="14"
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
            <figure aria-hidden className="mt-6">
              <svg viewBox="0 0 800 108" className="w-full" fill="none">
                {[
                  { a: 20, b: 380, label: "APPROVE", tone: 0.5 },
                  { a: 400, b: 580, label: "REVIEW", tone: 0.7 },
                  { a: 600, b: 780, label: "DECLINE", tone: 1 },
                ].map((s, i) => (
                  <g key={s.label}>
                    <path
                      d={`M${s.a} 36V28H${s.b}V36`}
                      stroke={i === 2 ? "var(--crimson)" : "var(--charcoal)"}
                      strokeOpacity={i === 2 ? 1 : 0.35}
                    />
                    <text
                      {...SVG_LABEL}
                      x={(s.a + s.b) / 2}
                      y="16"
                      textAnchor="middle"
                      fill={i === 2 ? "var(--crimson)" : "var(--charcoal)"}
                      fillOpacity={s.tone}
                    >
                      {s.label}
                    </text>
                  </g>
                ))}
                {Array.from({ length: 26 }).map((_, i) => {
                  const x = 30 + i * 29.2;
                  const zone = x < 390 ? 0 : x < 590 ? 1 : 2;
                  return (
                    <circle
                      key={i}
                      cx={x.toFixed(1)}
                      cy="58"
                      r="4"
                      fill={zone === 2 ? "var(--crimson)" : "var(--charcoal)"}
                      fillOpacity={zone === 0 ? 0.25 : zone === 1 ? 0.5 : 1}
                    />
                  );
                })}
                <path
                  d="M20 80H780"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.25"
                />
                <text
                  {...SVG_LABEL}
                  x="780"
                  y="100"
                  textAnchor="end"
                  fill="var(--charcoal)"
                  fillOpacity="0.5"
                >
                  RISK →
                </text>
              </svg>
            </figure>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <Steps
              items={["explain", "govern", "operationalize"]}
              cols="grid-cols-3"
              className="max-w-2xl"
            />
            <p className={`${DISPLAY} mt-7 max-w-4xl`}>
              More predictive power is useful only if the institution can
              explain, govern, and operationalize the result.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          11 · UNDERWRITING — four signal sources converging on the lender;
          the three groups broader signals can reach; three open questions
          about new inputs.                          [quiz: credit-scoring]
      ================================================================== */}
      <Slide
        id="underwriting"
        border
        align="left"
        quizData={quiz["underwriting"]}
      >
        <Head1 eyebrow="Broader signals">Underwriting with Broader Signals</Head1>

        <div className="mt-10 grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1fr_20rem] md:gap-14">
          <div>
            <p className={BODY}>
              Lenders increasingly combine internal history, verified cash
              flow, collateral information, and contextual business data.
            </p>
          </div>
          <div>
            <svg
              aria-hidden
              viewBox="0 0 320 104"
              className="w-full max-w-[20rem]"
              fill="none"
            >
              {[
                "INTERNAL HISTORY",
                "VERIFIED CASH FLOW",
                "COLLATERAL INFORMATION",
                "CONTEXTUAL BUSINESS DATA",
              ].map((src, i) => {
                const y = 12 + i * 26;
                return (
                  <g key={src}>
                    <text
                      {...SVG_LABEL}
                      x="0"
                      y={y + 3}
                      fill="var(--charcoal)"
                      fillOpacity="0.55"
                    >
                      {src}
                    </text>
                    <path
                      d={`M220 ${y} C 250 ${y}, 256 51, 280 51`}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.22"
                    />
                  </g>
                );
              })}
              <path d="M280 51h30" stroke="var(--crimson)" strokeWidth="1.5" />
              <circle cx="313" cy="51" r="3" fill="var(--crimson)" />
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
          <div className="mt-12 grid w-full max-w-5xl gap-8 md:grid-cols-[16rem_1fr] md:gap-12">
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
            <div className="border border-[var(--crimson)]/45 p-7 md:p-8">
              <div className={`${MICRO} text-[var(--crimson)]`}>New inputs</div>
              <p className={`${LEAD} mt-4`}>
                New inputs also raise questions about relevance, stability, and
                whether the model is learning structural disadvantage rather
                than true risk.
              </p>
            </div>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          12 · PRICING, LIMITS, PROFITABILITY — approval as the first stop on
          a longer line; three quantities held on one rule; margin set
          against what it can worsen.
      ================================================================== */}
      <Slide id="pricing-limits" border align="left">
        <Head1 eyebrow="After approval">
          Pricing, Limit Setting, and Profitability
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Credit decisions do not end at approval; institutions also set
            limits, pricing, covenants, and review intensity.
          </p>
          <svg
            aria-hidden
            viewBox="0 0 800 84"
            className="mt-7 w-full max-w-5xl"
            fill="none"
          >
            <path d="M40 30H720" stroke="var(--charcoal)" strokeOpacity="0.25" />
            <circle
              cx="40"
              cy="30"
              r="8"
              fill="var(--charcoal)"
              fillOpacity="0.7"
            />
            <text
              {...SVG_LABEL}
              x="40"
              y="66"
              textAnchor="middle"
              fill="var(--charcoal)"
              fillOpacity="0.6"
            >
              APPROVAL
            </text>
            {[
              { x: 220, label: "LIMITS" },
              { x: 380, label: "PRICING" },
              { x: 540, label: "COVENANTS" },
              { x: 710, label: "REVIEW INTENSITY" },
            ].map((s) => (
              <g key={s.label}>
                <rect
                  x={s.x - 6}
                  y="24"
                  width="12"
                  height="12"
                  fill="var(--crimson)"
                />
                <text
                  {...SVG_LABEL}
                  x={s.x}
                  y="66"
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
            <Split1
              left="Optimize · short-term margin"
              right="Worsening · adverse selection or customer trust"
              cols="grid-cols-[1fr_1.6fr]"
            />
            <p className={`${LEAD} mt-6 max-w-4xl`}>
              Poorly governed pricing models can optimize short-term margin
              while worsening adverse selection or customer trust.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          13 · EARLY WARNING — five signals arriving on a line ahead of formal
          default; prediction handing on to intervention; the two things
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
            aria-hidden
            viewBox="0 0 800 112"
            className="mt-7 w-full max-w-5xl"
            fill="none"
          >
            <path d="M20 56H700" stroke="var(--charcoal)" strokeOpacity="0.25" />
            {[
              { x: 100, label: "DELINQUENCY SIGNALS", up: true },
              { x: 240, label: "PAYMENT BEHAVIOR", up: false },
              { x: 380, label: "SECTOR WEAKNESS", up: true },
              { x: 500, label: "COVENANT BREACHES", up: false },
              { x: 600, label: "UTILIZATION CHANGES", up: true },
            ].map((s) => (
              <g key={s.label}>
                <path
                  d={s.up ? `M${s.x} 36V56` : `M${s.x} 56V76`}
                  stroke="var(--charcoal)"
                  strokeOpacity="0.45"
                />
                <circle
                  cx={s.x}
                  cy="56"
                  r="3.5"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                />
                <text
                  {...SVG_LABEL}
                  x={s.x}
                  y={s.up ? 26 : 94}
                  textAnchor="middle"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  {s.label}
                </text>
              </g>
            ))}
            <path d="M720 30V82" stroke="var(--crimson)" strokeWidth="3" />
            <text
              {...SVG_LABEL}
              x="720"
              y="104"
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
            <Steps
              items={["clear playbooks", "authority to act"]}
              cols="grid-cols-2"
              className="max-w-md"
            />
            <p className={`${DISPLAY} mt-7 max-w-4xl`}>
              Early warning is only valuable when response teams have clear
              playbooks and authority to act.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          14 · COLLECTIONS — four treatment dials; the best treatment as a
          balance point between three pulls; prioritization held inside
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
              The best treatment is not always the most aggressive; it must
              balance recovery, customer outcome, and regulatory expectations.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 400 200"
              className="w-full"
              fill="none"
            >
              <path
                d="M200 26L50 172H350Z"
                stroke="var(--charcoal)"
                strokeOpacity="0.25"
              />
              <path
                d="M200 26L200 123M50 172L200 123M350 172L200 123"
                stroke="var(--crimson)"
                strokeOpacity="0.3"
              />
              <circle cx="200" cy="123" r="5" fill="var(--crimson)" />
              <text
                {...SVG_LABEL}
                x="200"
                y="14"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                RECOVERY
              </text>
              <text
                {...SVG_LABEL}
                x="10"
                y="192"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                CUSTOMER OUTCOME
              </text>
              <text
                {...SVG_LABEL}
                x="390"
                y="192"
                textAnchor="end"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                REGULATORY EXPECTATIONS
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <div
              aria-hidden
              className="grid max-w-4xl gap-6 md:grid-cols-[12rem_1fr] md:items-end"
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
            <p className={`${BODY} mt-7 max-w-4xl`}>
              AI can improve prioritization, but firms still need policy
              boundaries for hardship, vulnerability, and escalation.
            </p>
          </div>
        </div>

        <Discussion1>
          When should a lender optimize for recovery efficiency, and when should
          it prioritize longer-term relationship preservation even at lower
          near-term cash recovery?
        </Discussion1>
      </Slide>

      {/* ==================================================================
          15 · EXPLAINABILITY AND FAIRNESS — the three adverse outcomes; the
          audiences an explanation must reach; the governance question held
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
            <Terms
              items={["segments", "outcomes", "decision contexts"]}
              className="mt-3"
            />
            <blockquote className={`${DISPLAY} mt-4`}>
              The core governance question is whether a model&apos;s
              performance is acceptable across segments, outcomes, and decision
              contexts.
            </blockquote>
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
          17 · FRAUD AS AN ADVERSARIAL PROBLEM — detection and change drawn
          as a loop; five inputs joined; static rules decaying over time.
                                                        [quiz topic]
      ================================================================== */}
      <Slide id="fraud-adversarial" border align="left">
        <Head1 eyebrow="An opponent that adapts">
          Fraud Detection as an Adversarial Problem
        </Head1>

        <div className="mt-10 grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1fr_18rem] md:gap-14">
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
              aria-hidden
              viewBox="0 0 280 150"
              className="w-full max-w-[18rem]"
              fill="none"
            >
              <path
                d="M70 25 A50 50 0 0 1 70 125"
                stroke="var(--charcoal)"
                strokeOpacity="0.35"
              />
              <path
                d="M70 125 A50 50 0 0 1 70 25"
                stroke="var(--crimson)"
                strokeOpacity="0.6"
              />
              <path
                d="M115 69l5 7l5 -7"
                stroke="var(--charcoal)"
                strokeOpacity="0.5"
              />
              <path d="M15 81l5 -7l5 7" stroke="var(--crimson)" />
              <circle
                cx="70"
                cy="25"
                r="6"
                fill="var(--charcoal)"
                fillOpacity="0.7"
              />
              <circle cx="70" cy="125" r="6" fill="var(--crimson)" />
              <text
                {...SVG_LABEL}
                x="136"
                y="29"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                PATTERN DETECTED
              </text>
              <text {...SVG_LABEL} x="136" y="129" fill="var(--crimson)">
                ATTACKERS CHANGE
              </text>
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
          <div className="mt-12 grid w-full max-w-5xl items-center gap-8 md:grid-cols-[1fr_20rem] md:gap-12">
            <p className={DISPLAY}>
              Static rules remain useful, but they degrade quickly when
              adversaries learn the thresholds.
            </p>
            <figure aria-hidden>
              <svg viewBox="0 0 320 130" className="w-full" fill="none">
                <path
                  d="M24 8v100h280"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.25"
                />
                <path
                  d="M24 24 C 70 24, 110 30, 150 62 C 190 94, 240 100, 300 102"
                  stroke="var(--crimson)"
                  strokeWidth="1.5"
                />
                <text {...SVG_LABEL} x="34" y="16" fill="var(--crimson)">
                  STATIC RULES
                </text>
                <text
                  {...SVG_LABEL}
                  x="0"
                  y="0"
                  transform="translate(14 108) rotate(-90)"
                  fill="var(--charcoal)"
                  fillOpacity="0.45"
                >
                  USEFUL →
                </text>
                <text
                  {...SVG_LABEL}
                  x="304"
                  y="124"
                  textAnchor="end"
                  fill="var(--charcoal)"
                  fillOpacity="0.45"
                >
                  TIME →
                </text>
              </svg>
            </figure>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          18 · TRANSACTION MONITORING AND AML — a ledger with the rows that
          merit investigation marked; three things AI adds; the credibility
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
                      className="px-2 py-2 font-mono text-[9px] uppercase leading-snug tracking-[0.08em] text-[var(--charcoal-light)]/70"
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
            <div aria-hidden className="md:max-w-2xl">
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
            <p className={`${LEAD} mt-7 max-w-4xl`}>
              The system is only as credible as its documentation, investigator
              workflow, and escalation discipline.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          19 · GRAPH ANALYTICS AND ENTITY RESOLUTION — the same entities as
          separate table rows, then connected through shared addresses and
          phones; broken links and weak links drawn side by side.
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
            <div aria-hidden className="mt-6">
              <div className={`${MICRO} text-[var(--crimson)]`}>
                Investigable networks
              </div>
              <svg viewBox="0 28 520 142" className="mt-3 w-full" fill="none">
                {[
                  [260, 60, 170, 40],
                  [260, 60, 170, 100],
                  [260, 60, 350, 60],
                  [260, 60, 350, 140],
                  [260, 140, 170, 100],
                  [260, 140, 170, 160],
                  [260, 140, 350, 140],
                ].map(([x1, y1, x2, y2]) => (
                  <path
                    key={`${x1}-${y1}-${x2}-${y2}`}
                    d={`M${x1} ${y1}L${x2} ${y2}`}
                    stroke="var(--crimson)"
                    strokeOpacity="0.45"
                  />
                ))}
                {[
                  { x: 170, y: 40, label: "ACCOUNT", side: "end" as const },
                  { x: 170, y: 100, label: "SHELL ENTITY", side: "end" as const },
                  { x: 170, y: 160, label: "SYNTHETIC IDENTITY", side: "end" as const },
                  { x: 350, y: 60, label: "MERCHANT", side: "start" as const },
                  { x: 350, y: 140, label: "DEVICE", side: "start" as const },
                ].map((n) => (
                  <g key={n.label}>
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r="6"
                      fill="var(--surface)"
                      stroke="var(--charcoal)"
                      strokeOpacity="0.6"
                    />
                    <text
                      {...SVG_LABEL}
                      x={n.side === "end" ? n.x - 14 : n.x + 14}
                      y={n.y + 3}
                      textAnchor={n.side}
                      fill="var(--charcoal)"
                      fillOpacity="0.65"
                    >
                      {n.label}
                    </text>
                  </g>
                ))}
                {[
                  { y: 60, label: "ADDRESS", ly: 44 },
                  { y: 140, label: "PHONE", ly: 164 },
                ].map((s) => (
                  <g key={s.label}>
                    <rect
                      x="254"
                      y={s.y - 6}
                      width="12"
                      height="12"
                      fill="var(--crimson)"
                    />
                    <text
                      {...SVG_LABEL}
                      x="260"
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
            <svg aria-hidden viewBox="0 0 800 84" className="w-full" fill="none">
              {[
                { y: 24, label: "BROKEN LINKS", result: "HIDE RISK", broken: true },
                { y: 64, label: "WEAK LINKS", result: "CREATE NOISE", broken: false },
              ].map((row) => (
                <g key={row.label}>
                  <text
                    {...SVG_LABEL}
                    x="0"
                    y={row.y + 3}
                    fill={row.broken ? "var(--crimson)" : "var(--charcoal)"}
                    fillOpacity={row.broken ? 1 : 0.55}
                  >
                    {row.label}
                  </text>
                  {row.broken ? (
                    <>
                      <path
                        d={`M176 ${row.y}H390M430 ${row.y}H644`}
                        stroke="var(--charcoal)"
                        strokeOpacity="0.5"
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
                      strokeDasharray="1 5"
                    />
                  )}
                  <circle
                    cx="170"
                    cy={row.y}
                    r="5"
                    fill="var(--surface)"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.6"
                  />
                  <circle
                    cx="650"
                    cy={row.y}
                    r="5"
                    fill="var(--surface)"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.6"
                  />
                  <text
                    {...SVG_LABEL}
                    x="676"
                    y={row.y + 3}
                    fill={row.broken ? "var(--crimson)" : "var(--charcoal)"}
                    fillOpacity={row.broken ? 1 : 0.55}
                  >
                    {row.result}
                  </text>
                </g>
              ))}
            </svg>
            <p className={`${DISPLAY} mt-7 max-w-4xl`}>
              Entity resolution quality is a control issue because broken
              links can hide risk and weak links can create noise.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          20 · FALSE POSITIVES AND INCLUSION — three harms of oversensitive
          detection; the two costs set on one beam; the overlap where some
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
              <svg viewBox="0 0 20 16" className="mx-auto h-4 w-5">
                <path d="M10 0L20 16H0Z" fill="var(--charcoal)" fillOpacity="0.4" />
              </svg>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <figure aria-hidden className="max-w-3xl">
              <svg viewBox="0 0 640 172" className="w-full" fill="none">
                <defs>
                  <clipPath id="w3-proxy-circle">
                    <circle cx="280" cy="84" r="64" />
                  </clipPath>
                </defs>
                <circle
                  cx="360"
                  cy="84"
                  r="64"
                  fill="var(--crimson)"
                  fillOpacity="0.7"
                  clipPath="url(#w3-proxy-circle)"
                />
                <circle
                  cx="280"
                  cy="84"
                  r="64"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.45"
                />
                <circle
                  cx="360"
                  cy="84"
                  r="64"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.45"
                />
                <text
                  {...SVG_LABEL}
                  x="204"
                  y="80"
                  textAnchor="end"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  PROXIES FOR
                </text>
                <text
                  {...SVG_LABEL}
                  x="204"
                  y="94"
                  textAnchor="end"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  UNUSUAL BEHAVIOR
                </text>
                <text
                  {...SVG_LABEL}
                  x="436"
                  y="72"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  NON-STANDARD BUT
                </text>
                <text
                  {...SVG_LABEL}
                  x="436"
                  y="86"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  LEGITIMATE
                </text>
                <text
                  {...SVG_LABEL}
                  x="436"
                  y="100"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  FINANCIAL LIVES
                </text>
                <path d="M320 138V150" stroke="var(--crimson)" />
                <text
                  {...SVG_LABEL}
                  x="320"
                  y="166"
                  textAnchor="middle"
                  fill="var(--crimson)"
                >
                  SOME GROUPS
                </text>
              </svg>
            </figure>
            <p className={`${LEAD} mt-6 max-w-4xl`}>
              Some groups may be disproportionately affected when proxies for
              unusual behavior overlap with non-standard but legitimate
              financial lives.
            </p>
          </div>
        </div>

        <Discussion1>
          How much customer friction is acceptable in exchange for a meaningful
          reduction in fraud and financial crime exposure?
        </Discussion1>
      </Slide>

      {/* ==================================================================
          21 · COMPLIANCE COPILOTS — four tasks ending at the right reviewer;
          leverage set against autonomous judgment; three controls standing
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
            <Split1
              left="Operational leverage for investigators"
              right="Not autonomous compliance judgment"
            />
            <p className={`${LEAD} mt-6 max-w-4xl`}>
              Their value is operational leverage for investigators, not
              autonomous compliance judgment.
            </p>
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <div
              aria-hidden
              className="grid max-w-4xl items-center gap-4 md:grid-cols-[1fr_auto_12rem]"
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
            <p className={`${DISPLAY} mt-8 max-w-4xl`}>
              Firms need controls over hallucination, source traceability, and
              what content can enter the formal record.
            </p>
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
          23 · MARKET FORECASTING — six streams converging; certainty struck
          against signal extraction; the same points read once as structure
          and once as overfit noise.
      ================================================================== */}
      <Slide id="market-forecasting" border align="left">
        <Head1 eyebrow="Reading the market">
          Market Forecasting and Signal Extraction
        </Head1>

        <div className="mt-10 grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1fr_19rem] md:gap-14">
          <div>
            <p className={BODY}>
              AI can process prices, volumes, news, filings, macro releases,
              and alternative text streams faster than human analysts.
            </p>
          </div>
          <div>
            <svg
              aria-hidden
              viewBox="0 0 300 140"
              className="w-full max-w-[19rem]"
              fill="none"
            >
              {[
                "PRICES",
                "VOLUMES",
                "NEWS",
                "FILINGS",
                "MACRO RELEASES",
                "ALTERNATIVE TEXT STREAMS",
              ].map((src, i) => {
                const y = 10 + i * 24;
                return (
                  <g key={src}>
                    <text
                      {...SVG_LABEL}
                      x="0"
                      y={y + 3}
                      fill="var(--charcoal)"
                      fillOpacity="0.5"
                    >
                      {src}
                    </text>
                    <path
                      d={`M214 ${y} C 244 ${y}, 250 70, 270 70`}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.2"
                    />
                  </g>
                );
              })}
              <path d="M270 70h22" stroke="var(--crimson)" strokeWidth="1.5" />
              <circle cx="295" cy="70" r="3" fill="var(--crimson)" />
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-14 w-full max-w-5xl">
            <Split1
              left="Predict markets with certainty"
              right="Signal extraction and decision support under uncertainty"
              strikeLeft
              cols="grid-cols-[1fr_1.6fr]"
            />
            <p className={`${LEAD} mt-6 max-w-4xl`}>
              The task is rarely to predict markets with certainty; it is to
              improve signal extraction and decision support under uncertainty.
            </p>
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Leaders should distinguish between models that identify
              persistent structure and models that overfit recent noise.
            </p>
            <figure aria-hidden className="mt-7">
              <div className="grid gap-10 md:grid-cols-2 md:gap-0">
                {[
                  { label: "Persistent structure", fit: "line" },
                  { label: "Overfit recent noise", fit: "trace" },
                ].map((panel, p) => {
                  const points = [100, 80, 89, 74, 85, 60, 66, 47, 61, 42, 46].map(
                    (y, i) => [20 + i * 28, y] as const,
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
                      <svg viewBox="0 0 320 120" className="mt-4 w-full" fill="none">
                        <path
                          d="M10 114H310"
                          stroke="var(--charcoal)"
                          strokeOpacity="0.2"
                        />
                        {panel.fit === "line" ? (
                          <path
                            d="M20 96L300 44"
                            stroke="var(--charcoal)"
                            strokeOpacity="0.7"
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
                            r="3"
                            fill="var(--charcoal)"
                            fillOpacity="0.4"
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
          24 · PORTFOLIO CONSTRUCTION — four things the tools help with; the
          assumptions drawn dashed because they are assumptions; the
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
            <svg aria-hidden viewBox="0 0 800 124" className="w-full" fill="none">
              <circle
                cx="30"
                cy="40"
                r="6"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              />
              <text
                {...SVG_LABEL}
                x="20"
                y="18"
                fill="var(--charcoal)"
                fillOpacity="0.55"
              >
                PORTFOLIO RECOMMENDATIONS
              </text>
              <path
                d="M36 40H732"
                stroke="var(--charcoal)"
                strokeOpacity="0.55"
                strokeWidth="1.5"
              />
              <rect x="734" y="33" width="14" height="14" fill="var(--crimson)" />
              <text
                {...SVG_LABEL}
                x="720"
                y="26"
                textAnchor="end"
                fill="var(--crimson)"
              >
                DECISION SUPPORT
              </text>
              <path
                d="M220 40 C 260 40, 260 92, 300 92 H732"
                stroke="var(--charcoal)"
                strokeOpacity="0.4"
                strokeDasharray="5 5"
              />
              <rect
                x="734"
                y="85"
                width="14"
                height="14"
                stroke="var(--charcoal)"
                strokeOpacity="0.5"
              />
              <text
                {...SVG_LABEL}
                x="720"
                y="80"
                textAnchor="end"
                fill="var(--charcoal)"
                fillOpacity="0.55"
              >
                AUTOMATED EXECUTION
              </text>
              <path d="M440 78V106" stroke="var(--crimson)" strokeWidth="3" />
              <text
                {...SVG_LABEL}
                x="440"
                y="120"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                GOVERNANCE
              </text>
            </svg>
            <p className={`${DISPLAY} mt-7 max-w-4xl`}>
              Portfolio recommendations should be treated as decision support
              unless governance explicitly permits automated execution.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          25 · MODEL RISK — three series that shift abruptly; performance
          that holds in one regime and falls at the break; four disciplines
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
          <figure aria-hidden className="mt-6 w-full max-w-5xl">
            <svg viewBox="0 0 800 136" className="w-full" fill="none">
              {[
                { label: "FINANCIAL MARKETS", at: 460, dy: 14 },
                { label: "CUSTOMER BEHAVIOR", at: 610, dy: -16 },
                { label: "MACRO CONDITIONS", at: 370, dy: -16 },
              ].map((lane, i) => {
                const y = 24 + i * 48;
                const jitter = (k: number) => ((k * 7 + i * 3) % 5) - 2;
                const stepK = (lane.at - 190) / 30;
                const d = Array.from({ length: 21 }, (_, k) => {
                  const x = 190 + k * 30;
                  const base = y + jitter(k);
                  if (x === lane.at) return `${x} ${base} L${x} ${base + lane.dy}`;
                  return `${x} ${x > lane.at ? base + lane.dy : base}`;
                }).join(" L");
                return (
                  <g key={lane.label}>
                    <text
                      {...SVG_LABEL}
                      x="0"
                      y={y + 3}
                      fill="var(--charcoal)"
                      fillOpacity="0.55"
                    >
                      {lane.label}
                    </text>
                    <path
                      d={`M${d}`}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.45"
                    />
                    <path
                      d={`M${lane.at} ${y + jitter(stepK)}v${lane.dy}`}
                      stroke="var(--crimson)"
                      strokeWidth="2.5"
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
            <figure aria-hidden className="mt-6">
              <svg viewBox="0 0 800 124" className="w-full" fill="none">
                <rect
                  x="20"
                  y="24"
                  width="440"
                  height="88"
                  fill="var(--charcoal)"
                  fillOpacity="0.04"
                />
                <path
                  d="M460 20V112"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.4"
                  strokeDasharray="3 4"
                />
                <text
                  {...SVG_LABEL}
                  x="460"
                  y="12"
                  textAnchor="middle"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  STRUCTURAL BREAK
                </text>
                <path
                  d="M20 50 C 120 46, 300 54, 460 48"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.65"
                  strokeWidth="1.5"
                />
                <path
                  d="M460 48 C 520 50, 560 94, 640 102"
                  stroke="var(--crimson)"
                  strokeWidth="1.5"
                />
                <text
                  {...SVG_LABEL}
                  x="32"
                  y="38"
                  fill="var(--charcoal)"
                  fillOpacity="0.55"
                >
                  PERFORMS WELL
                </text>
                <text
                  {...SVG_LABEL}
                  x="32"
                  y="102"
                  fill="var(--charcoal)"
                  fillOpacity="0.45"
                >
                  ONE REGIME
                </text>
                <text {...SVG_LABEL} x="652" y="106" fill="var(--crimson)">
                  FAIL
                </text>
              </svg>
            </figure>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <Steps
              items={[
                "monitoring drift",
                "challenger models",
                "override policies",
                "disciplined retirement of stale systems",
              ]}
              cols="md:grid-cols-4"
              mark={3}
              className="max-w-5xl"
            />
            <p className={`${DISPLAY} mt-7 max-w-4xl`}>
              Model risk management requires monitoring drift, challenger
              models, override policies, and disciplined retirement of stale
              systems.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          26 · STRESS TESTING — the band of severe but plausible shocks; four
          tasks AI can accelerate; exact prediction struck against surfacing
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
          <figure aria-hidden className="mt-6 w-full max-w-5xl">
            <svg viewBox="0 0 800 84" className="w-full" fill="none">
              <path d="M20 52H700" stroke="var(--charcoal)" strokeOpacity="0.3" />
              <path
                d="M700 52H780"
                stroke="var(--charcoal)"
                strokeOpacity="0.25"
                strokeDasharray="3 4"
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
                y="47"
                width="180"
                height="10"
                fill="var(--crimson)"
                fillOpacity="0.25"
              />
              <path
                d="M520 40V32H700V40"
                stroke="var(--crimson)"
                strokeWidth="1.5"
              />
              <text
                {...SVG_LABEL}
                x="610"
                y="22"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                SEVERE BUT PLAUSIBLE
              </text>
              <text
                {...SVG_LABEL}
                x="780"
                y="78"
                textAnchor="end"
                fill="var(--charcoal)"
                fillOpacity="0.5"
              >
                SHOCKS →
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
            <Split1
              left="Predict the future exactly"
              right="Before crisis conditions emerge"
              strikeLeft
            />
            <Terms
              items={["concentrations", "vulnerabilities", "management actions"]}
              className="mt-4"
            />
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              The point is not to predict the future exactly, but to surface
              concentrations, vulnerabilities, and management actions before
              crisis conditions emerge.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          27 · TREASURY AND LIQUIDITY — five forecasts; the balance sheet as a
          grid with one cell out of place; explicit limits drawn as a hard
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
            <div aria-hidden className="max-w-3xl">
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
            <p className={`${DISPLAY} mt-7 max-w-4xl`}>
              Managers still need explicit limits because liquidity decisions
              are intertwined with regulation, confidence, and market access.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          28 · PRICING, HEDGING, LIMITS OF AUTOMATION — continuous
          optimization set against what full automation amplifies; the
          evaluation checklist with local accuracy marked as not enough.
      ================================================================== */}
      <Slide id="pricing-hedging" border align="left">
        <Head1 eyebrow="Where automation stops">
          Pricing, Hedging, and the Limits of Automation
        </Head1>

        <div className="w-full">
          <div className="mt-10 w-full max-w-5xl">
            <Split1
              left="Optimized continuously"
              right="Full automation · feedback loops and hidden assumptions"
              cols="grid-cols-[1fr_1.6fr]"
            />
            <p className={`${LEAD} mt-6 max-w-4xl`}>
              Some financial decisions can be optimized continuously, but full
              automation can amplify feedback loops and hidden assumptions.
            </p>
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
          30 · INTELLIGENT DOCUMENT PROCESSING — seven stacked document
          types; a form with one missing field; OCR struck against the
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
                <span className="mt-4 block font-mono text-[9px] uppercase leading-snug tracking-[0.08em] text-[var(--charcoal-light)]/70">
                  {doc}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 grid w-full max-w-5xl items-center gap-10 border-t border-[var(--charcoal)]/10 pt-8 md:grid-cols-[11rem_1fr] md:gap-12">
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
          </div>
        </div>

        <div className="w-full">
          <div className="mt-14 w-full max-w-5xl">
            <Split1
              left="Merely optical character recognition"
              right="Shorter cycle time · cleaner downstream data"
              strikeLeft
              cols="grid-cols-[1fr_1.3fr]"
            />
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              The managerial benefit is shorter cycle time and cleaner
              downstream data, not merely optical character recognition.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          31 · RECONCILIATION AND EXCEPTIONS — records matched across two
          systems with one break; three things machine learning adds;
          prompts set against hidden rules.
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
            aria-hidden
            viewBox="0 0 800 140"
            className="mt-7 w-full max-w-5xl"
            fill="none"
          >
            {[0, 1, 2, 3, 4].map((i) => {
              const y = 18 + i * 26;
              const broken = i === 2;
              return (
                <g key={i}>
                  <rect
                    x="40"
                    y={y - 5}
                    width={200 + ((i * 37) % 40)}
                    height="10"
                    fill={broken ? "var(--crimson)" : "var(--charcoal)"}
                    fillOpacity={broken ? 0.3 : 0.12}
                  />
                  <rect
                    x="520"
                    y={y - 5}
                    width={200 + ((i * 23) % 40)}
                    height="10"
                    fill={broken ? "var(--crimson)" : "var(--charcoal)"}
                    fillOpacity={broken ? 0.3 : 0.12}
                  />
                  {broken ? (
                    <>
                      <path
                        d={`M284 ${y}H368M432 ${y}H516`}
                        stroke="var(--crimson)"
                        strokeWidth="1.5"
                      />
                      <text
                        {...SVG_LABEL}
                        x="400"
                        y={y + 3}
                        textAnchor="middle"
                        fill="var(--crimson)"
                      >
                        BREAK
                      </text>
                    </>
                  ) : (
                    <path
                      d={`M284 ${y}H516`}
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
            <Split1 left="AI outputs as prompts" right="Hidden rules" />
            <Terms
              items={["audit trails", "override reason codes"]}
              className="mt-4"
            />
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              Control quality depends on audit trails, override reason codes,
              and whether teams use AI outputs as prompts rather than hidden
              rules.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          32 · CUSTOMER SERVICE AND ADVICE — three assistant jobs; three
          sectors resting on suitability and fiduciary expectations; two
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
            <div aria-hidden className="grid max-w-2xl grid-cols-2 gap-6">
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
                        className={`border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.1em] ${t.tone}`}
                      >
                        interaction
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className={`${DISPLAY} mt-8 max-w-4xl`}>
              The right design question is which interactions benefit from
              speed and consistency, and which require contextual human trust.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          33 · PERSONALIZATION AND CONDUCT RISK — four things firms tailor;
          a nudge crossing from relevance into manipulation or mis-selling;
          four guardrails drawn as rails.
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
              aria-hidden
              viewBox="0 0 800 96"
              className="mt-6 w-full"
              fill="none"
            >
              <rect
                x="520"
                y="10"
                width="270"
                height="60"
                fill="var(--crimson)"
                fillOpacity="0.07"
              />
              <path
                d="M520 6V74"
                stroke="var(--crimson)"
                strokeOpacity="0.6"
                strokeDasharray="4 4"
              />
              <path
                d="M20 50H500"
                stroke="var(--charcoal)"
                strokeOpacity="0.2"
              />
              <path
                d="M360 50H660"
                stroke="var(--crimson)"
                strokeWidth="1.5"
              />
              <path d="M652 44l8 6l-8 6" stroke="var(--crimson)" strokeWidth="1.5" />
              <circle
                cx="360"
                cy="50"
                r="4"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              />
              <text
                {...SVG_LABEL}
                x="440"
                y="36"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                UNSUITABLE NUDGES
              </text>
              <text
                {...SVG_LABEL}
                x="20"
                y="90"
                fill="var(--charcoal)"
                fillOpacity="0.5"
              >
                RELEVANCE
              </text>
              <text {...SVG_LABEL} x="540" y="90" fill="var(--crimson)">
                MANIPULATION OR MIS-SELLING
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <div
              aria-hidden
              className="grid grid-cols-2 border-y-2 border-[var(--crimson)] md:grid-cols-4"
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
            <p className={`${DISPLAY} mt-7 max-w-4xl`}>
              Managers need guardrails on objectives, product eligibility,
              vulnerability signals, and escalation when AI-generated guidance
              becomes too prescriptive.
            </p>
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
          35 · MODEL GOVERNANCE — six lifecycle stages as a chain; four
          questions left as blanks to fill; the inventory table with the two
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
                <span className="mt-2 block font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--charcoal)]">
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
            <div
              aria-hidden
              className="max-w-3xl border-t border-[var(--charcoal)]/30"
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
            <p className={`${DISPLAY} mt-7 max-w-4xl`}>
              A model inventory is useful only if it is tied to actual decision
              rights and review cadence.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          36 · DATA GOVERNANCE AND SECURITY — three properties of finance data
          on the governance slab; six things to manage; attackers aimed at
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
              Data governance · strategic control function
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
            <svg aria-hidden viewBox="0 0 800 112" className="w-full" fill="none">
              <path
                d="M72 56L406 31"
                stroke="var(--crimson)"
                strokeOpacity="0.6"
              />
              <path
                d="M72 64L406 89"
                stroke="var(--crimson)"
                strokeOpacity="0.6"
              />
              <path d="M395 27L407 31L396 37" stroke="var(--crimson)" />
              <path d="M396 83L407 89L395 93" stroke="var(--crimson)" />
              <circle cx="60" cy="60" r="9" fill="var(--crimson)" />
              <text
                {...SVG_LABEL}
                x="60"
                y="94"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                ATTACKERS
              </text>
              <path
                d="M420 38V82"
                stroke="var(--charcoal)"
                strokeOpacity="0.4"
                strokeDasharray="3 3"
              />
              {[
                { y: 30, label: "THE INSTITUTION" },
                { y: 90, label: "THE MODELS IT DEPENDS ON" },
              ].map((t) => (
                <g key={t.label}>
                  <circle
                    cx="420"
                    cy={t.y}
                    r="7"
                    fill="var(--surface)"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.6"
                  />
                  <text
                    {...SVG_LABEL}
                    x="440"
                    y={t.y + 3}
                    fill="var(--charcoal)"
                    fillOpacity="0.7"
                  >
                    {t.label}
                  </text>
                </g>
              ))}
            </svg>
            <p className={`${DISPLAY} mt-7 max-w-4xl`}>
              Security design is part of AI strategy because attackers may
              target both the institution and the models it depends on.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          37 · BUILD, BUY, OR PARTNER — vendor sourcing beside internal
          development; five decision factors; execution leaving the firm
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
            <div aria-hidden className="max-w-3xl space-y-4">
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
            <p className={`${DISPLAY} mt-8 max-w-4xl`}>
              Outsourcing execution does not outsource accountability for
              customer outcomes or control failures.
            </p>
          </div>
        </div>

        <Discussion1>
          Which finance AI capabilities should remain proprietary, and which
          should be treated as infrastructure?
        </Discussion1>
      </Slide>

      {/* ==================================================================
          38 · GENERATIVE AI: USES AND RED LINES — strongest and weakest set
          side by side; the red line drawn before experimentation fans out
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
            <svg aria-hidden viewBox="0 0 800 120" className="w-full" fill="none">
              <text
                {...SVG_LABEL}
                x="20"
                y="61"
                fill="var(--charcoal)"
                fillOpacity="0.5"
              >
                AUTONOMOUS USE
              </text>
              {[24, 40, 56, 72, 88].map((y) => (
                <path
                  key={y}
                  d={`M270 56 C 400 56, 500 ${y}, 780 ${y}`}
                  stroke="var(--charcoal)"
                  strokeOpacity="0.25"
                />
              ))}
              <circle
                cx="270"
                cy="56"
                r="4"
                fill="var(--charcoal)"
                fillOpacity="0.5"
              />
              <path d="M240 20V96" stroke="var(--crimson)" strokeWidth="4" />
              <text
                {...SVG_LABEL}
                x="240"
                y="12"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                EXPLICIT RED LINES
              </text>
              <text
                {...SVG_LABEL}
                x="780"
                y="114"
                textAnchor="end"
                fill="var(--charcoal)"
                fillOpacity="0.5"
              >
                EXPERIMENTATION SPREADS ACROSS TEAMS
              </text>
            </svg>
            <p className={`${DISPLAY} mt-7 max-w-4xl`}>
              Institutions should define explicit red lines for autonomous use
              before experimentation spreads across teams.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          39 · OPERATING MODEL, TALENT, CHANGE — seven groups around durable
          adoption; the bridge of shared fluency; the two front-line
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

        <div className="mt-9 w-full max-w-5xl">
          <div>
            <p className={`${BODY} max-w-4xl`}>
              Durable adoption requires collaboration among business leaders,
              risk, compliance, operations, data teams, model validators, and
              legal partners.
            </p>
          </div>
          <div>
            <svg
              aria-hidden
              viewBox="12 22 448 226"
              className="mt-6 w-full max-w-xl"
              fill="none"
            >
              {[
                { label: "BUSINESS LEADERS", lx: 260, ly: 36, anchor: "middle" as const },
                { label: "RISK", lx: 344, ly: 80, anchor: "start" as const },
                { label: "COMPLIANCE", lx: 362, ly: 164, anchor: "start" as const },
                { label: "OPERATIONS", lx: 312, ly: 240, anchor: "start" as const },
                { label: "DATA TEAMS", lx: 208, ly: 240, anchor: "end" as const },
                { label: "MODEL VALIDATORS", lx: 158, ly: 164, anchor: "end" as const },
                { label: "LEGAL PARTNERS", lx: 176, ly: 80, anchor: "end" as const },
              ].map((g, i) => {
                const rad = ((-90 + (i * 360) / 7) * Math.PI) / 180;
                const at = (r: number) =>
                  [
                    (260 + r * Math.cos(rad)).toFixed(2),
                    (140 + r * Math.sin(rad)).toFixed(2),
                  ] as const;
                const [x, y] = at(90);
                const [sx, sy] = at(46);
                const [ex, ey] = at(82);
                return (
                  <g key={g.label}>
                    <path
                      d={`M${sx} ${sy}L${ex} ${ey}`}
                      stroke="var(--crimson)"
                      strokeOpacity="0.4"
                    />
                    <circle
                      cx={x}
                      cy={y}
                      r="6"
                      fill="var(--surface)"
                      stroke="var(--charcoal)"
                      strokeOpacity="0.5"
                    />
                    <text
                      {...SVG_LABEL}
                      x={g.lx}
                      y={g.ly}
                      textAnchor={g.anchor}
                      fill="var(--charcoal)"
                      fillOpacity="0.6"
                    >
                      {g.label}
                    </text>
                  </g>
                );
              })}
              <text
                {...SVG_LABEL}
                x="260"
                y="138"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                DURABLE
              </text>
              <text
                {...SVG_LABEL}
                x="260"
                y="151"
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

        <div className="w-full">
          <Terms
            items={["trust the workflow", "understand escalation"]}
            className="mt-14"
          />
        </div>
        <Verdict>
          Change management matters because even accurate models fail when
          front-line staff do not trust the workflow or understand escalation.
        </Verdict>
      </Slide>

      {/* ==================================================================
          40 · CONCLUSION — the five areas AI is embedded into, then the
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

        <div className="w-full">
          <ol
            aria-hidden
            className="mt-11 grid w-full max-w-4xl grid-cols-2 gap-y-5 sm:grid-cols-3 md:grid-cols-5"
          >
            {["credit", "control", "markets", "service", "operations"].map(
              (area, i) => (
                <li
                  key={area}
                  className="relative border-t-2 border-[var(--crimson)]/70 pr-3 pt-3"
                >
                  <span className={`${MICRO} block text-[var(--champagne)]`}>
                    {pad(i + 1)}
                  </span>
                  <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--charcoal-light)]/70">
                    {area}
                  </span>
                </li>
              ),
            )}
          </ol>
        </div>

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
              End of Week 03
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
