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
  Schematic,
  Split1,
  Steps,
  SVG_LABEL,
  TAG,
  Terms,
  Verdict,
} from "../_visuals/kit";

// ============================================================================
// WEEK 04 — APPLICATIONS OF AI IN HUMAN RESOURCES
// ============================================================================
// Same deck grammar as Weeks 01–03: every slide is hand-composed for its own
// argument, with hairlines instead of boxes and crimson marking one thing.
//
// Sentences are transcribed verbatim from content.md. Figures carry only words
// that already appear in the slide's sentences; any shape that suggests a
// quantity is labelled SCHEMATIC because content.md gives no numbers.
//
// Quizzes: `Slide` renders `quizData` BEFORE its section. content.md for this
// week carries no [quiz] tags, so the tested topics follow Week 03's density
// (one or two per module). Each quiz is attached to the slide that FOLLOWS its
// topic and only tests material the student has already passed. Where the
// following slide is a module plate, the plate carries the quiz.
// ============================================================================

const quiz = createCourseQuizLookup(quizzes as CourseQuiz[]);

export default function Week04HumanResources() {
  return (
    <SlideDeck>
      <ScrollProgress label="Week 04" />

      {/* ==================================================================
          01 · TITLE — masthead with the five things the subtitle says
          intelligent systems reshape, set in a ruled row.
      ================================================================== */}
      <Slide id="title" align="left" className="relative overflow-hidden">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 select-none font-serif text-[36vw] font-black leading-none text-[var(--charcoal)]/[0.035] md:text-[28vw]"
        >
          04
        </span>

        <div>
          <div
            className={`${MICRO} flex items-center gap-4 text-[var(--champagne)]`}
          >
            <span className="h-px w-10 bg-[var(--crimson)]" />
            Week 04 in Applications of AI in Business
          </div>
        </div>

        <div>
          <h1 className="mt-10 max-w-5xl font-serif text-[clamp(2.5rem,7.5vw,5.75rem)] font-black leading-[0.92] tracking-[-0.035em] text-[var(--charcoal)]">
            Applications of AI in{" "}
            <span className="text-[var(--crimson)]">Human Resources</span>
          </h1>
        </div>

        <div className="w-full">
          <div className="mt-12 h-px w-full bg-[var(--charcoal)]/15" />
          <p className="mt-6 max-w-3xl font-serif text-xl font-light italic leading-relaxed text-[var(--charcoal-light)] md:text-[1.75rem]">
            How intelligent systems reshape talent acquisition, workforce
            planning, development, governance, and employee experience
          </p>
          <div
            aria-hidden
            className="mt-8 grid max-w-4xl grid-cols-2 border-l border-[var(--charcoal)]/12 sm:grid-cols-3 md:grid-cols-5"
          >
            {[
              "talent acquisition",
              "workforce planning",
              "development",
              "governance",
              "employee experience",
            ].map((domain, i) => (
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

      {/* ==================================================================
          02 · WHY HR BECAME AN AI DOMAIN — the six repeated decisions as a
          ruled row; five digital traces drawn as dense tick lanes; the
          three improvements AI must bring, bounded by fairness and trust.
                                                        [quiz topic]
      ================================================================== */}
      <Slide id="why-hr-ai" border align="left">
        <Head1 eyebrow="Opening">Why HR Became an AI Domain</Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Human resources manages repeated decisions about hiring, staffing,
            development, performance, retention, and compliance under
            uncertainty.
          </p>
          <Steps
            items={[
              "hiring",
              "staffing",
              "development",
              "performance",
              "retention",
              "compliance",
            ]}
            cols="sm:grid-cols-3 md:grid-cols-6"
            className="mt-6 max-w-5xl"
          />
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Digital HR systems now capture recruiting activity, learning
              records, collaboration traces, employee feedback, and workflow
              histories at scale.
            </p>
            <figure aria-hidden className="mt-6 w-full">
              <svg viewBox="0 0 800 170" className="w-full" fill="none">
                {[
                  "RECRUITING ACTIVITY",
                  "LEARNING RECORDS",
                  "COLLABORATION TRACES",
                  "EMPLOYEE FEEDBACK",
                  "WORKFLOW HISTORIES",
                ].map((lane, l) => {
                  const y = 16 + l * 34;
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
              <Schematic />
            </figure>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <div
              aria-hidden
              className="grid max-w-4xl gap-6 md:grid-cols-[1fr_14rem] md:items-end"
            >
              <Steps
                items={[
                  "judgment quality",
                  "operating speed",
                  "organizational consistency",
                ]}
                cols="grid-cols-3"
                className=""
              />
              <div>
                <div className={`${MICRO} text-[var(--crimson)]`}>
                  Without weakening
                </div>
                <div className="mt-3 grid grid-cols-2 border-y-2 border-[var(--crimson)]">
                  {["fairness", "trust"].map((b, i) => (
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
            <p className={`${DISPLAY} mt-7 max-w-4xl`}>
              AI matters in HR when it improves judgment quality, operating
              speed, or organizational consistency without weakening fairness
              or trust.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          03 · DECISION ARCHITECTURE — strategy fanning out through six
          subfunctions into people decisions; fragments converted into three
          outputs; augmentation set against human review.
                                                     [quiz: why-hr-ai]
      ================================================================== */}
      <Slide
        id="decision-architecture"
        border
        align="left"
        quizData={quiz["decision-architecture"]}
      >
        <Head1 eyebrow="Strategy into people decisions">
          The HR Function as a Decision Architecture
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            HR connects strategy to people decisions across recruiting,
            workforce design, development, rewards, employee relations, and
            culture.
          </p>
          <svg
            aria-hidden
            viewBox="0 0 800 232"
            className="mt-7 w-full max-w-5xl"
            fill="none"
          >
            <rect
              x="20"
              y="108"
              width="16"
              height="16"
              fill="var(--charcoal)"
              fillOpacity="0.75"
            />
            <text
              {...SVG_LABEL}
              x="0"
              y="148"
              fill="var(--charcoal)"
              fillOpacity="0.55"
            >
              STRATEGY
            </text>
            <text
              {...SVG_LABEL}
              x="720"
              y="12"
              textAnchor="middle"
              fill="var(--crimson)"
            >
              PEOPLE DECISIONS
            </text>
            {[
              "RECRUITING",
              "WORKFORCE DESIGN",
              "DEVELOPMENT",
              "REWARDS",
              "EMPLOYEE RELATIONS",
              "CULTURE",
            ].map((fn, i) => {
              const y = 36 + i * 36;
              return (
                <g key={fn}>
                  <path
                    d={`M40 116 C 120 116, 150 ${y}, 236 ${y}`}
                    stroke="var(--charcoal)"
                    strokeOpacity="0.22"
                  />
                  <circle
                    cx="244"
                    cy={y}
                    r="4"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.45"
                  />
                  <text
                    {...SVG_LABEL}
                    x="260"
                    y={y + 3}
                    fill="var(--charcoal)"
                    fillOpacity="0.6"
                  >
                    {fn}
                  </text>
                  <path
                    d={`M450 ${y}H706`}
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
            })}
          </svg>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Each subfunction converts fragmented workforce information into
              recommendations, approvals, or interventions.
            </p>
            <svg
              aria-hidden
              viewBox="0 -8 800 118"
              className="mt-6 w-full max-w-5xl"
              fill="none"
            >
              {[
                [30, 22],
                [74, 60],
                [22, 88],
                [120, 30],
                [150, 84],
                [96, 100],
                [180, 50],
                [60, 14],
                [200, 96],
              ].map(([x, y], i) => (
                <rect
                  key={i}
                  x={x}
                  y={y}
                  width={10 + ((i * 7) % 12)}
                  height="4"
                  fill="var(--charcoal)"
                  fillOpacity="0.28"
                />
              ))}
              <text
                {...SVG_LABEL}
                x="0"
                y="6"
                fill="var(--charcoal)"
                fillOpacity="0.45"
              >
                FRAGMENTED WORKFORCE INFORMATION
              </text>
              <path d="M250 58H420" stroke="var(--charcoal)" strokeOpacity="0.3" />
              <path d="M413 54l7 4l-7 4" stroke="var(--charcoal)" strokeOpacity="0.5" />
              {[
                { y: 22, label: "RECOMMENDATIONS" },
                { y: 58, label: "APPROVALS" },
                { y: 94, label: "INTERVENTIONS" },
              ].map((o) => (
                <g key={o.label}>
                  <path
                    d={`M430 58 C 470 58, 480 ${o.y}, 520 ${o.y}`}
                    stroke="var(--crimson)"
                    strokeOpacity="0.5"
                  />
                  <rect
                    x="526"
                    y={o.y - 5}
                    width="10"
                    height="10"
                    fill="var(--crimson)"
                  />
                  <text
                    {...SVG_LABEL}
                    x="548"
                    y={o.y + 3}
                    fill="var(--charcoal)"
                    fillOpacity="0.7"
                  >
                    {o.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-14 w-full max-w-5xl">
            <Split1
              left="Augmented reliably"
              right="Require human review"
            />
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              The managerial issue is deciding which judgments can be augmented
              reliably and which require human review because the social cost
              of error is high.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          04 · VALUE CREATION — value, cost and risk as three ruled rows,
          each carrying its own sources of gain.
      ================================================================== */}
      <Slide id="value-creation" border align="left">
        <Head1 eyebrow="Where the value comes from">
          Value Creation in AI-Enabled HR
        </Head1>

        <ol className="mt-10 w-full max-w-5xl">
          {[
            {
              word: "Value",
              line: "Value can come from faster hiring, better workforce allocation, stronger internal mobility, more targeted development, and lower regretted attrition.",
              terms: [
                "faster hiring",
                "better workforce allocation",
                "stronger internal mobility",
                "more targeted development",
                "lower regretted attrition",
              ],
            },
            {
              word: "Cost",
              line: "Cost gains often come from automation in screening, scheduling, document handling, policy support, and case triage.",
              terms: [
                "screening",
                "scheduling",
                "document handling",
                "policy support",
                "case triage",
              ],
            },
            {
              word: "Risk",
              line: "Risk reduction comes from earlier detection of compliance gaps, pay inequities, burnout signals, and inconsistent manager behavior.",
              terms: [
                "compliance gaps",
                "pay inequities",
                "burnout signals",
                "inconsistent manager behavior",
              ],
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
          "This module frames HR as a domain of classification, prediction, optimization, summarization, and governed judgment.",
          "The aim is to separate genuinely high-value applications from uses that create administrative speed but strategic harm.",
        ]}
      />

      {/* ==================================================================
          06 · HR DATA AND SIGNAL QUALITY — seven core inputs as a ruled
          table; one record split across four places; context set ahead of
          model complexity.
      ================================================================== */}
      <Slide id="hr-data-signal" border align="left">
        <Head1 eyebrow="What the models read">
          HR Data, Signal Quality, and Context
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Core inputs include applicant records, job histories, skills
            inventories, learning activity, engagement data, compensation
            records, and policy cases.
          </p>
          <Terms
            items={[
              "applicant records",
              "job histories",
              "skills inventories",
              "learning activity",
              "engagement data",
              "compensation records",
              "policy cases",
            ]}
            className="mt-6 max-w-5xl"
          />
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Useful signals are rarely complete because HR data is fragmented
              across systems, managers, vendors, and informal work practices.
            </p>
            <div
              aria-hidden
              className="mt-7 grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4"
            >
              {[
                { label: "systems", have: [0, 1] },
                { label: "managers", have: [2] },
                { label: "vendors", have: [3, 4] },
                { label: "informal work practices", have: [5] },
              ].map((part) => (
                <div
                  key={part.label}
                  className="border-t border-[var(--charcoal)]/15 pt-4"
                >
                  <div className="flex gap-1">
                    {[0, 1, 2, 3, 4, 5].map((k) => (
                      <span
                        key={k}
                        className={`block h-5 flex-1 ${
                          part.have.includes(k)
                            ? "bg-[var(--charcoal)]/35"
                            : "border border-dashed border-[var(--charcoal)]/15"
                        }`}
                      />
                    ))}
                  </div>
                  <span
                    className={`${TAG} mt-3 block text-[var(--charcoal-light)]/70`}
                  >
                    {part.label}
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
                {["definitions", "data lineage", "context"].map((d) => (
                  <div
                    key={d}
                    className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--crimson)]"
                  >
                    {d}
                  </div>
                ))}
              </div>
              <span className="font-serif text-4xl font-light text-[var(--charcoal)]/35">
                &gt;
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--charcoal-light)]/45">
                model complexity
              </span>
            </div>
            <p className={`${DISPLAY} mt-7 max-w-4xl`}>
              In people decisions, definitions, data lineage, and context often
              matter more than model complexity because labels are noisy and
              outcomes evolve over time.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          07 · MATCHING METHOD TO TASK — three method families as ruled rows,
          each with the tasks it supports; generative systems carry the one
          struck tag.                                       [quiz topic]
      ================================================================== */}
      <Slide id="method-to-task" border align="left">
        <Head1 eyebrow="The right tool for the task">
          Matching AI Method to the HR Task
        </Head1>

        <ol className="mt-10 w-full max-w-5xl">
          {[
            {
              method: "Supervised learning",
              line: "Supervised learning supports attrition prediction, candidate ranking, workforce demand forecasting, and case classification when outcomes are labeled.",
              tasks: [
                "attrition prediction",
                "candidate ranking",
                "workforce demand forecasting",
                "case classification",
              ],
              not: "",
            },
            {
              method: "Unsupervised methods",
              line: "Unsupervised methods help identify skill clusters, unusual workforce patterns, or emerging segments when categories are not yet known.",
              tasks: [
                "skill clusters",
                "unusual workforce patterns",
                "emerging segments",
              ],
              not: "",
            },
            {
              method: "Generative systems",
              line: "Generative systems are strongest in summarization, drafting, retrieval, and manager support rather than autonomous people decisions.",
              tasks: ["summarization", "drafting", "retrieval", "manager support"],
              not: "autonomous people decisions",
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
          08 · HUMAN JUDGMENT — one employment decision branching into the
          four things it affects; the three conditions for oversight; the
          three design rules set against automation as the objective.
                                                  [quiz: method-to-task]
      ================================================================== */}
      <Slide
        id="human-judgment"
        border
        align="left"
        quizData={quiz["human-judgment"]}
      >
        <Head1 eyebrow="High stakes" signal>
          Human Judgment in High-Stakes People Decisions
        </Head1>

        <div className="mt-10 grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1fr_32rem] md:gap-14">
          <div>
            <p className={BODY}>
              Employment decisions affect livelihoods, legal exposure,
              managerial legitimacy, and the credibility of the HR function.
            </p>
          </div>
          <div>
            <svg
              aria-hidden
              viewBox="0 0 520 136"
              className="w-full"
              fill="none"
            >
              {[
                { y: 16, label: "LIVELIHOODS" },
                { y: 50, label: "LEGAL EXPOSURE" },
                { y: 84, label: "MANAGERIAL LEGITIMACY" },
                { y: 118, label: "CREDIBILITY OF THE HR FUNCTION" },
              ].map((c) => (
                <g key={c.label}>
                  <path
                    d={`M62 67 C 140 67, 160 ${c.y}, 230 ${c.y}`}
                    stroke="var(--crimson)"
                    strokeOpacity="0.45"
                  />
                  <circle cx="236" cy={c.y} r="4" fill="var(--crimson)" />
                  <text
                    {...SVG_LABEL}
                    x="250"
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
                y="59"
                width="16"
                height="16"
                fill="var(--charcoal)"
                fillOpacity="0.75"
              />
              <text
                {...SVG_LABEL}
                x="52"
                y="98"
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
              Human oversight is most important when evidence is incomplete,
              context is sensitive, or the decision can materially alter a
              person&apos;s trajectory.
            </p>
            <ul
              aria-hidden
              className="mt-5 grid gap-3 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--charcoal-light)]/70 md:grid-cols-3"
            >
              {[
                "evidence is incomplete",
                "context is sensitive",
                "materially alter a person's trajectory",
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
            <div
              aria-hidden
              className="flex flex-wrap items-center gap-x-6 gap-y-4"
            >
              <Steps
                items={["escalation", "documentation", "override rules"]}
                cols="grid-cols-3"
                mark={0}
                className="w-full max-w-xl"
              />
              <span
                className={`${TAG} border border-[var(--charcoal)]/15 px-3 py-2 text-[var(--charcoal-light)]/45 [text-decoration-line:line-through]`}
              >
                automation is the objective
              </span>
            </div>
            <p className={`${DISPLAY} mt-7 max-w-4xl`}>
              Good system design clarifies escalation, documentation, and
              override rules instead of assuming automation is the objective.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          09 · MEASURING SUCCESS — faster processing as one measure among
          five; three ways an apparent gain turns into later cost;
          transactional throughput set against enterprise outcomes.
      ================================================================== */}
      <Slide id="measuring-success" border align="left">
        <Head1 eyebrow="What counts as success">
          Measuring Success Beyond Efficiency
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Faster processing is useful, but HR value should also be measured
            through quality of hire, internal fill rates, retention, capability
            growth, and manager adoption.
          </p>
          <div
            aria-hidden
            className="mt-7 grid w-full max-w-5xl gap-6 md:grid-cols-[12rem_1fr] md:items-end"
          >
            <div>
              <div className={`${MICRO} text-[var(--charcoal-light)]/55`}>
                Useful
              </div>
              <div
                className={`${TAG} mt-3 border border-[var(--charcoal)]/15 px-4 py-3 text-[var(--charcoal-light)]/70`}
              >
                faster processing
              </div>
            </div>
            <div>
              <div className={`${MICRO} text-[var(--crimson)]`}>
                Also measured through
              </div>
              <Steps
                items={[
                  "quality of hire",
                  "internal fill rates",
                  "retention",
                  "capability growth",
                  "manager adoption",
                ]}
                cols="sm:grid-cols-3 md:grid-cols-5"
                className="mt-3"
              />
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Some apparent gains are misleading if they reduce candidate
              quality, intensify bias, or create compliance rework later.
            </p>
            <div
              aria-hidden
              className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3"
            >
              <span
                className={`${TAG} border border-[var(--charcoal)]/15 px-3 py-2 text-[var(--charcoal-light)]/55`}
              >
                apparent gains
              </span>
              <span className="text-[var(--charcoal)]/35">→</span>
              {[
                "↓ candidate quality",
                "↑ bias",
                "compliance rework later",
              ].map((c) => (
                <span
                  key={c}
                  className={`${TAG} border border-[var(--crimson)]/45 px-3 py-2 text-[var(--crimson)]`}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-14 w-full max-w-5xl">
            <Split1
              left="Transactional throughput"
              right="Enterprise outcomes"
              strikeLeft
            />
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              Executives need metrics that connect HR automation to enterprise
              outcomes rather than only transactional throughput.
            </p>
          </div>
        </div>
      </Slide>

      <ModulePlate2
        id="module-2"
        numeral="II"
        title="Recruiting and Talent Access"
        lines={[
          "This module examines how AI changes sourcing, screening, interviews, and recruiting operations.",
          "The central challenge is improving speed and fit while preserving fairness, transparency, and labor-market credibility.",
        ]}
      />

      {/* ==================================================================
          11 · SOURCING — four talent pools converging on the recruiter;
          a candidate who sits between traditional job titles; more
          applicants set against better access.
      ================================================================== */}
      <Slide id="sourcing" border align="left">
        <Head1 eyebrow="Finding talent">Sourcing and Candidate Discovery</Head1>

        <div className="mt-10 grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1fr_22rem] md:gap-14">
          <div>
            <p className={BODY}>
              AI can help identify likely candidates across internal databases,
              external platforms, alumni networks, and adjacent talent pools.
            </p>
          </div>
          <div>
            <svg
              aria-hidden
              viewBox="0 0 352 104"
              className="w-full max-w-[22rem]"
              fill="none"
            >
              {[
                "INTERNAL DATABASES",
                "EXTERNAL PLATFORMS",
                "ALUMNI NETWORKS",
                "ADJACENT TALENT POOLS",
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
                      d={`M220 ${y} C 262 ${y}, 270 51, 300 51`}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.22"
                    />
                  </g>
                );
              })}
              <path d="M300 51h36" stroke="var(--crimson)" strokeWidth="1.5" />
              <circle cx="340" cy="51" r="4" fill="var(--crimson)" />
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Better discovery expands recruiter reach and helps surface
              candidates whose experience does not map neatly to traditional
              job titles.
            </p>
            <div aria-hidden className="mt-7 max-w-4xl">
              <div className={`${MICRO} text-[var(--charcoal-light)]/55`}>
                Traditional job titles
              </div>
              <div className="relative mt-3 grid grid-cols-4 gap-3">
                {[0, 1, 2, 3].map((k) => (
                  <span
                    key={k}
                    className="block h-12 border border-[var(--charcoal)]/20"
                  />
                ))}
                <span className="absolute left-[37.5%] top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center">
                  <span className="block h-5 w-5 rounded-full bg-[var(--crimson)]" />
                </span>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <span className="block h-2.5 w-2.5 rounded-full bg-[var(--crimson)]" />
                <span className={`${TAG} text-[var(--crimson)]`}>
                  does not map neatly
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-14 w-full max-w-5xl">
            <Split1
              left="More applicants"
              right="Better access to relevant talent"
              strikeLeft
            />
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              The strategic gain is not merely more applicants, but better
              access to relevant talent in constrained labor markets.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          12 · RESUME SCREENING — a profile compared against four references;
          three conditions that decide usefulness; gatekeeper set against
          structured review.                                 [quiz topic]
      ================================================================== */}
      <Slide id="resume-screening" border align="left">
        <Head1 eyebrow="Matching">Resume Screening and Candidate Matching</Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Matching systems compare applicant profiles to role requirements,
            inferred skills, prior outcomes, and hiring patterns.
          </p>
          <svg
            aria-hidden
            viewBox="0 0 800 120"
            className="mt-7 w-full max-w-5xl"
            fill="none"
          >
            <rect
              x="20"
              y="34"
              width="44"
              height="52"
              stroke="var(--charcoal)"
              strokeOpacity="0.5"
            />
            <path
              d="M28 46H56M28 56H50M28 66H54M28 76H44"
              stroke="var(--charcoal)"
              strokeOpacity="0.35"
            />
            <text
              {...SVG_LABEL}
              x="0"
              y="108"
              fill="var(--charcoal)"
              fillOpacity="0.55"
            >
              APPLICANT PROFILES
            </text>
            {[
              { x: 290, label: "ROLE REQUIREMENTS" },
              { x: 450, label: "INFERRED SKILLS" },
              { x: 600, label: "PRIOR OUTCOMES" },
              { x: 740, label: "HIRING PATTERNS" },
            ].map((r) => (
              <g key={r.label}>
                <path
                  d={`M74 60 C 160 60, 200 60, ${r.x - 10} 60`}
                  stroke="var(--charcoal)"
                  strokeOpacity="0.12"
                />
                <path
                  d={`M${r.x} 44V76`}
                  stroke="var(--crimson)"
                  strokeWidth="2"
                />
                <text
                  {...SVG_LABEL}
                  x={r.x}
                  y="30"
                  textAnchor="middle"
                  fill="var(--charcoal)"
                  fillOpacity="0.65"
                >
                  {r.label}
                </text>
              </g>
            ))}
            <text
              {...SVG_LABEL}
              x="520"
              y="104"
              textAnchor="middle"
              fill="var(--crimson)"
            >
              COMPARE
            </text>
          </svg>
        </div>

        <div className="w-full">
          <div className="mt-12 grid w-full max-w-5xl gap-8 border-t border-[var(--charcoal)]/10 pt-8 md:grid-cols-[18rem_1fr] md:gap-12">
            <ul aria-hidden className="border-t border-[var(--charcoal)]/15">
              {[
                "job requirements are current",
                "outcome labels are reliable",
                "not simply replicating historical preference",
              ].map((q) => (
                <li
                  key={q}
                  className="flex items-baseline justify-between gap-4 border-b border-[var(--charcoal)]/10 py-2.5"
                >
                  <span className={`${TAG} text-[var(--charcoal-light)]/70`}>
                    {q}
                  </span>
                  <span className="font-serif text-lg text-[var(--crimson)]">
                    ?
                  </span>
                </li>
              ))}
            </ul>
            <div className="border border-[var(--crimson)]/45 p-7 md:p-8">
              <div className={`${MICRO} text-[var(--crimson)]`}>
                Usefulness depends on
              </div>
              <p className={`${LEAD} mt-4`}>
                Their usefulness depends on whether job requirements are
                current, outcome labels are reliable, and the model is not
                simply replicating historical preference.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-14 w-full max-w-5xl">
            <Split1
              left="Hidden gatekeepers"
              right="Prioritization and structured review"
              strikeLeft
            />
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              Screening tools should support prioritization and structured
              review rather than serving as hidden gatekeepers.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          13 · INTERVIEW INTELLIGENCE — three supports; scattered ratings
          pulled into agreement by structure; evidence set against fluency,
          confidence and polish.               [quiz: resume-screening]
      ================================================================== */}
      <Slide
        id="interview-intelligence"
        border
        align="left"
        quizData={quiz["interview-intelligence"]}
      >
        <Head1 eyebrow="Assessment">
          Interview Intelligence and Structured Assessment
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            AI can help generate interview guides, summarize interview notes,
            and identify whether assessments cover the intended competencies
            consistently.
          </p>
          <Steps
            items={[
              "generate interview guides",
              "summarize interview notes",
              "cover the intended competencies",
            ]}
            cols="grid-cols-3"
            className="mt-6 max-w-3xl"
          />
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Structured evaluation is often more valuable than prediction
              alone because it reduces noise across interviewers and hiring
              teams.
            </p>
            <figure aria-hidden className="mt-6 max-w-4xl">
              <svg viewBox="0 0 800 132" className="w-full" fill="none">
                {[
                  { x0: 40, label: "NOISE ACROSS INTERVIEWERS", spread: 1 },
                  { x0: 440, label: "STRUCTURED EVALUATION", spread: 0 },
                ].map((panel) => (
                  <g key={panel.label}>
                    <text
                      {...SVG_LABEL}
                      x={panel.x0}
                      y="12"
                      fill={panel.spread ? "var(--charcoal)" : "var(--crimson)"}
                      fillOpacity={panel.spread ? 0.5 : 1}
                    >
                      {panel.label}
                    </text>
                    {[0, 1, 2, 3].map((row) => {
                      const y = 36 + row * 24;
                      const offsets = [-110, 60, -40, 130];
                      const cx =
                        panel.x0 +
                        160 +
                        (panel.spread ? offsets[row] : (row % 2 ? 6 : -6));
                      return (
                        <g key={row}>
                          <path
                            d={`M${panel.x0} ${y}H${panel.x0 + 320}`}
                            stroke="var(--charcoal)"
                            strokeOpacity="0.12"
                          />
                          <circle
                            cx={cx}
                            cy={y}
                            r="5"
                            fill={panel.spread ? "var(--charcoal)" : "var(--crimson)"}
                            fillOpacity={panel.spread ? 0.45 : 1}
                          />
                        </g>
                      );
                    })}
                  </g>
                ))}
                <path
                  d="M400 24V120"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.12"
                />
              </svg>
              <Schematic />
            </figure>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <div
              aria-hidden
              className="flex flex-wrap items-center gap-x-4 gap-y-3"
            >
              <span
                className={`${TAG} bg-[var(--crimson)] px-3 py-2 text-[var(--surface)]`}
              >
                evidence-based assessment
              </span>
              {["fluency", "confidence", "résumé polish"].map((c) => (
                <span
                  key={c}
                  className={`${TAG} border border-[var(--charcoal)]/15 px-3 py-2 text-[var(--charcoal-light)]/45 [text-decoration-line:line-through]`}
                >
                  {c}
                </span>
              ))}
            </div>
            <p className={`${DISPLAY} mt-7 max-w-4xl`}>
              Systems should reinforce evidence-based assessment rather than
              reward fluency, confidence, or résumé polish unrelated to job
              performance.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          14 · CANDIDATE EXPERIENCE — four recruiting tasks; candidate
          experience fanning out to three outcomes; uncertainty set against
          accountability.
      ================================================================== */}
      <Slide id="candidate-experience" border align="left">
        <Head1 eyebrow="Recruiting operations">
          Candidate Experience and Recruiting Operations
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Recruiting teams use AI to schedule interviews, answer routine
            candidate questions, draft communications, and track process
            bottlenecks.
          </p>
          <Steps
            items={[
              "schedule interviews",
              "answer routine candidate questions",
              "draft communications",
              "track process bottlenecks",
            ]}
            cols="md:grid-cols-4"
            className="mt-6 max-w-5xl"
          />
        </div>

        <div className="w-full">
          <div className="mt-12 grid w-full max-w-5xl items-center gap-10 border-t border-[var(--charcoal)]/10 pt-8 md:grid-cols-[1fr_24rem] md:gap-14">
            <p className={LEAD}>
              Operational improvements matter because candidate experience
              affects acceptance rates, employer brand, and recruiter
              productivity.
            </p>
            <svg aria-hidden viewBox="0 0 400 128" className="w-full" fill="none">
              {[
                { y: 16, label: "ACCEPTANCE RATES" },
                { y: 56, label: "EMPLOYER BRAND" },
                { y: 96, label: "RECRUITER PRODUCTIVITY" },
              ].map((n) => (
                <g key={n.label}>
                  <path
                    d={`M30 56L166 ${n.y}`}
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
              <circle cx="24" cy="56" r="6" fill="var(--crimson)" />
              <text {...SVG_LABEL} x="0" y="124" fill="var(--crimson)">
                CANDIDATE EXPERIENCE
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <Split1
              left="Nobody is accountable"
              right="Reduce uncertainty for candidates"
              strikeLeft
            />
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              Automation should reduce uncertainty for candidates, not increase
              the sense that nobody is accountable for the process.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          15 · FAIRNESS AND HIRING GOVERNANCE — the three gates a hiring model
          influences; what governance tests for; model logic from the vendor,
          employment risk kept by the employer.              [quiz topic]
      ================================================================== */}
      <Slide id="fairness-hiring" border align="left">
        <Head1 eyebrow="Under scrutiny" signal>
          Fairness, Adverse Impact, and Hiring Governance
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Hiring models require scrutiny because they influence who gets
            seen, who advances, and which qualifications are treated as signals
            of merit.
          </p>
          <figure aria-hidden className="mt-7 max-w-4xl space-y-3">
            {[
              { label: "who gets seen", n: 16 },
              { label: "who advances", n: 8 },
              { label: "signals of merit", n: 3 },
            ].map((stage, i) => (
              <div
                key={stage.label}
                className="grid grid-cols-[9rem_1fr] items-center gap-4 md:grid-cols-[11rem_1fr]"
              >
                <span
                  className={`${TAG} ${
                    i === 2
                      ? "text-[var(--crimson)]"
                      : "text-[var(--charcoal-light)]/70"
                  }`}
                >
                  {stage.label}
                </span>
                <span className="flex gap-1.5 border-l border-[var(--charcoal)]/20 pl-4">
                  {Array.from({ length: stage.n }).map((_, k) => (
                    <span
                      key={k}
                      className={`block h-3 w-3 rounded-full ${
                        i === 2
                          ? "bg-[var(--crimson)]"
                          : "bg-[var(--charcoal)]/30"
                      }`}
                    />
                  ))}
                </span>
              </div>
            ))}
            <Schematic className="pt-1" />
          </figure>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Governance should test for disparate outcomes, unstable proxies,
              and role-specific assumptions that no longer fit the labor
              market.
            </p>
            <Steps
              items={[
                "disparate outcomes",
                "unstable proxies",
                "role-specific assumptions",
              ]}
              cols="grid-cols-3"
              className="mt-6 max-w-3xl"
            />
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <div aria-hidden className="max-w-3xl space-y-4">
              <div className="grid grid-cols-[8rem_1fr] items-center gap-4 md:grid-cols-[10rem_1fr]">
                <span className={`${MICRO} text-[var(--charcoal-light)]/55`}>
                  Vendors
                </span>
                <span className="flex items-center gap-3">
                  <span className="h-px flex-1 bg-[var(--charcoal)]/30" />
                  <span className="text-[var(--charcoal)]/40">→</span>
                  <span
                    className={`${TAG} border border-[var(--charcoal)]/15 px-3 py-2 text-[var(--charcoal-light)]/60`}
                  >
                    model logic
                  </span>
                </span>
              </div>
              <div className="grid grid-cols-[8rem_1fr] items-center gap-4 md:grid-cols-[10rem_1fr]">
                <span className={`${MICRO} text-[var(--crimson)]`}>
                  Employer
                </span>
                <span className="flex items-center gap-3">
                  <span className="h-3 w-3 shrink-0 bg-[var(--crimson)]" />
                  <span className={`${TAG} text-[var(--crimson)]`}>
                    employment risk
                  </span>
                </span>
              </div>
            </div>
            <p className={`${LEAD} mt-8 max-w-4xl`}>
              Clear documentation is essential when vendors supply the model
              logic but the employer carries the employment risk.
            </p>
          </div>
        </div>

        <Discussion1>
          Should an employer accept a materially faster recruiting process if
          the scoring logic remains only partially explainable to candidates,
          managers, and legal reviewers?
        </Discussion1>
      </Slide>

      <ModulePlate2
        id="module-3"
        numeral="III"
        title="Workforce Planning and Organizational Design"
        lines={[
          "This module focuses on how AI supports workforce forecasting, staffing, skills visibility, and retention planning.",
          "The managerial objective is to align labor supply, capability needs, and organizational resilience under changing business conditions.",
        ]}
        quizData={quiz["module-3"]}
      />

      {/* ==================================================================
          17 · WORKFORCE DEMAND FORECASTING — two inputs combining into four
          estimates; four things a good model reflects; a forecast knocked
          off course by three shocks.
      ================================================================== */}
      <Slide id="workforce-forecasting" border align="left">
        <Head1 eyebrow="Labor demand">Workforce Demand Forecasting</Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            AI can estimate hiring needs, overtime pressure, capacity gaps, and
            role demand by combining business forecasts with historical labor
            patterns.
          </p>
          <svg
            aria-hidden
            viewBox="0 0 800 136"
            className="mt-7 w-full max-w-5xl"
            fill="none"
          >
            {[
              { y: 40, label: "BUSINESS FORECASTS" },
              { y: 96, label: "HISTORICAL LABOR PATTERNS" },
            ].map((src) => (
              <g key={src.label}>
                <text
                  {...SVG_LABEL}
                  x="0"
                  y={src.y + 3}
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  {src.label}
                </text>
                <path
                  d={`M236 ${src.y} C 290 ${src.y}, 300 68, 350 68`}
                  stroke="var(--charcoal)"
                  strokeOpacity="0.3"
                />
              </g>
            ))}
            <circle cx="358" cy="68" r="7" fill="var(--crimson)" />
            {[
              { y: 14, label: "HIRING NEEDS" },
              { y: 50, label: "OVERTIME PRESSURE" },
              { y: 86, label: "CAPACITY GAPS" },
              { y: 122, label: "ROLE DEMAND" },
            ].map((o) => (
              <g key={o.label}>
                <path
                  d={`M366 68 C 430 68, 440 ${o.y}, 500 ${o.y}`}
                  stroke="var(--crimson)"
                  strokeOpacity="0.45"
                />
                <rect
                  x="506"
                  y={o.y - 5}
                  width="10"
                  height="10"
                  fill="var(--crimson)"
                />
                <text
                  {...SVG_LABEL}
                  x="528"
                  y={o.y + 3}
                  fill="var(--charcoal)"
                  fillOpacity="0.7"
                >
                  {o.label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Forecast quality improves when models reflect seasonality,
              business-unit strategy, productivity assumptions, and external
              labor constraints.
            </p>
            <Steps
              items={[
                "seasonality",
                "business-unit strategy",
                "productivity assumptions",
                "external labor constraints",
              ]}
              cols="md:grid-cols-4"
              className="mt-6 max-w-4xl"
            />
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <figure aria-hidden>
              <svg viewBox="0 0 800 126" className="w-full" fill="none">
                <path
                  d="M20 70 C 120 60, 180 78, 260 66 S 420 58, 520 64 S 700 60, 780 62"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.4"
                  strokeDasharray="4 4"
                />
                <path
                  d="M20 70 C 120 60, 180 78, 230 68 L 250 34 C 300 40, 330 30, 400 36 L 420 92 C 480 96, 540 84, 600 90 L 620 20 C 680 26, 730 16, 780 22"
                  stroke="var(--crimson)"
                  strokeWidth="1.5"
                />
                {[
                  { x: 240, label: "RESTRUCTURING" },
                  { x: 410, label: "POLICY SHIFTS" },
                  { x: 610, label: "MACRO SHOCKS" },
                ].map((s) => (
                  <g key={s.label}>
                    <path
                      d={`M${s.x} 8V104`}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.15"
                    />
                    <text
                      {...SVG_LABEL}
                      x={s.x}
                      y="118"
                      textAnchor="middle"
                      fill="var(--crimson)"
                    >
                      {s.label}
                    </text>
                  </g>
                ))}
                <text
                  {...SVG_LABEL}
                  x="20"
                  y="96"
                  fill="var(--charcoal)"
                  fillOpacity="0.45"
                >
                  WORKFORCE FORECASTS
                </text>
              </svg>
              <Schematic />
            </figure>
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              Leaders should treat workforce forecasts as decision support
              because restructuring, policy shifts, and macro shocks can quickly
              change the picture.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          18 · SKILLS GRAPHS — five kinds of evidence joined into one view of
          capability; three strategic opportunities; the three conditions for
          trust.                                             [quiz topic]
      ================================================================== */}
      <Slide id="skills-graphs" border align="left">
        <Head1 eyebrow="Internal labor market">
          Skills Graphs and the Internal Labor Market
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Skills inference systems connect roles, experiences, credentials,
            projects, and learning history into a dynamic view of
            organizational capability.
          </p>
          <svg
            aria-hidden
            viewBox="0 0 800 190"
            className="mt-7 w-full max-w-4xl"
            fill="none"
          >
            {(() => {
              const nodes = [
                { x: 90, y: 40, label: "ROLES", anchor: "middle" as const, ly: 22 },
                { x: 250, y: 150, label: "EXPERIENCES", anchor: "middle" as const, ly: 178 },
                { x: 400, y: 46, label: "CREDENTIALS", anchor: "middle" as const, ly: 26 },
                { x: 550, y: 150, label: "PROJECTS", anchor: "middle" as const, ly: 178 },
                { x: 710, y: 40, label: "LEARNING HISTORY", anchor: "middle" as const, ly: 22 },
              ];
              const edges = [
                [0, 1],
                [0, 2],
                [1, 2],
                [1, 3],
                [2, 3],
                [2, 4],
                [3, 4],
                [0, 3],
                [1, 4],
              ];
              return (
                <>
                  {edges.map(([a, b]) => (
                    <path
                      key={`${a}-${b}`}
                      d={`M${nodes[a].x} ${nodes[a].y}L${nodes[b].x} ${nodes[b].y}`}
                      stroke="var(--crimson)"
                      strokeOpacity="0.3"
                    />
                  ))}
                  {nodes.map((n) => (
                    <g key={n.label}>
                      <circle
                        cx={n.x}
                        cy={n.y}
                        r="8"
                        fill="var(--surface)"
                        stroke="var(--charcoal)"
                        strokeOpacity="0.6"
                      />
                      <text
                        {...SVG_LABEL}
                        x={n.x}
                        y={n.ly}
                        textAnchor={n.anchor}
                        fill="var(--charcoal)"
                        fillOpacity="0.65"
                      >
                        {n.label}
                      </text>
                    </g>
                  ))}
                </>
              );
            })()}
          </svg>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              The strategic opportunity is better internal mobility, smarter
              succession planning, and reduced dependence on external hiring for
              every capability gap.
            </p>
            <Steps
              items={[
                "better internal mobility",
                "smarter succession planning",
                "reduced dependence on external hiring",
              ]}
              cols="grid-cols-3"
              className="mt-6 max-w-4xl"
            />
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <div className={`${MICRO} text-[var(--crimson)]`}>Trust that inferred skills are</div>
            <ul
              aria-hidden
              className="mt-4 grid max-w-3xl gap-3 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--charcoal-light)]/70 md:grid-cols-3"
            >
              {["current", "relevant", "not silently punitive"].map((c) => (
                <li
                  key={c}
                  className="flex items-start gap-3 border-t border-[var(--charcoal)]/12 pt-3"
                >
                  <span className="mt-[3px] h-2.5 w-2.5 shrink-0 bg-[var(--crimson)]" />
                  {c}
                </li>
              ))}
            </ul>
            <p className={`${DISPLAY} mt-7 max-w-4xl`}>
              Skills systems are only useful when employees and managers trust
              that inferred skills are current, relevant, and not silently
              punitive.
            </p>
          </div>
        </div>

        <Discussion1>
          Should firms rely on inferred skills data to shape promotion and
          mobility opportunities when many high-value capabilities are still
          informal, relational, or poorly documented?
        </Discussion1>
      </Slide>

      {/* ==================================================================
          19 · SCHEDULING AND STAFFING — staffing steps traced against service
          demand; labor supply matched to customer volume; the four limits an
          optimizer must respect.                  [quiz: skills-graphs]
      ================================================================== */}
      <Slide
        id="scheduling-staffing"
        border
        align="left"
        quizData={quiz["scheduling-staffing"]}
      >
        <Head1 eyebrow="Frontline allocation">
          Scheduling, Staffing, and Frontline Allocation
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            In labor-intensive settings, AI can optimize schedules, shift
            coverage, location staffing, and contingency plans against service
            demand.
          </p>
          <figure aria-hidden className="mt-7 w-full max-w-5xl">
            <svg viewBox="0 0 800 130" className="w-full" fill="none">
              <path d="M20 110H780" stroke="var(--charcoal)" strokeOpacity="0.25" />
              <path
                d="M20 96 C 90 90, 130 40, 200 36 S 300 80, 360 76 S 470 20, 560 26 S 700 88, 780 92"
                stroke="var(--charcoal)"
                strokeOpacity="0.45"
                strokeWidth="1.5"
              />
              <path
                d="M20 94H110V52H160V32H250V58H320V74H400V44H460V24H600V56H680V84H780"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <text
                {...SVG_LABEL}
                x="200"
                y="18"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.55"
              >
                SERVICE DEMAND
              </text>
              <text
                {...SVG_LABEL}
                x="530"
                y="14"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                SHIFT COVERAGE
              </text>
            </svg>
            <Schematic />
          </figure>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Operational gains come from matching labor supply to customer
              volume while reducing understaffing, overtime, and avoidable
              churn.
            </p>
            <div
              aria-hidden
              className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3"
            >
              <span
                className={`${TAG} border border-[var(--charcoal)]/15 px-3 py-2 text-[var(--charcoal-light)]/70`}
              >
                labor supply
              </span>
              <span className="text-[var(--crimson)]">⇄</span>
              <span
                className={`${TAG} border border-[var(--charcoal)]/15 px-3 py-2 text-[var(--charcoal-light)]/70`}
              >
                customer volume
              </span>
              <span className="mx-2 h-6 w-px bg-[var(--charcoal)]/15" />
              {["understaffing", "overtime", "avoidable churn"].map((c) => (
                <span
                  key={c}
                  className={`${TAG} text-[var(--crimson)]`}
                >
                  ↓ {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <div
              aria-hidden
              className="grid max-w-4xl gap-6 md:grid-cols-[14rem_1fr] md:items-end"
            >
              <div>
                <div className={`${MICRO} text-[var(--charcoal-light)]/55`}>
                  Not
                </div>
                <div
                  className={`${TAG} mt-3 border border-[var(--charcoal)]/15 px-4 py-3 text-[var(--charcoal-light)]/45 [text-decoration-line:line-through]`}
                >
                  purely mathematical input
                </div>
              </div>
              <div>
                <div className={`${MICRO} text-[var(--crimson)]`}>Respect</div>
                <div className="mt-3 grid grid-cols-2 border-y-2 border-[var(--crimson)] sm:grid-cols-4">
                  {["legal constraints", "fatigue", "fairness", "employee autonomy"].map(
                    (b, i) => (
                      <span
                        key={b}
                        className={`${TAG} px-4 py-3 text-[var(--charcoal-light)]/70 ${
                          i > 0 ? "sm:border-l sm:border-[var(--crimson)]/30" : ""
                        }`}
                      >
                        {b}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>
            <p className={`${LEAD} mt-7 max-w-4xl`}>
              Optimization should respect legal constraints, fatigue, fairness,
              and employee autonomy rather than treating labor as a purely
              mathematical input.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          20 · ATTRITION RISK — the model's flag arriving before turnover is
          visible to managers; what an intervention can change; the three
          tests for a legitimate action.
      ================================================================== */}
      <Slide id="attrition-risk" border align="left">
        <Head1 eyebrow="Before exit">Attrition Risk and Retention Intervention</Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Retention models aim to identify employees or segments with
            elevated exit risk before turnover becomes visible in manager
            reporting.
          </p>
          <svg
            aria-hidden
            viewBox="0 0 800 96"
            className="mt-7 w-full max-w-5xl"
            fill="none"
          >
            <path d="M20 48H780" stroke="var(--charcoal)" strokeOpacity="0.25" />
            <path d="M771 44l9 4l-9 4" stroke="var(--charcoal)" strokeOpacity="0.4" />
            <circle cx="260" cy="48" r="8" fill="var(--crimson)" />
            <text
              {...SVG_LABEL}
              x="260"
              y="26"
              textAnchor="middle"
              fill="var(--crimson)"
            >
              ELEVATED EXIT RISK
            </text>
            <path
              d="M268 48H600"
              stroke="var(--crimson)"
              strokeWidth="3"
              strokeOpacity="0.25"
            />
            <path d="M640 32V64" stroke="var(--charcoal)" strokeOpacity="0.6" strokeWidth="2" />
            <text
              {...SVG_LABEL}
              x="640"
              y="84"
              textAnchor="middle"
              fill="var(--charcoal)"
              fillOpacity="0.55"
            >
              VISIBLE IN MANAGER REPORTING
            </text>
          </svg>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              High-performing systems still require care because the
              intervention may change behavior, expectations, or employee trust.
            </p>
            <div
              aria-hidden
              className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3"
            >
              <span
                className={`${TAG} bg-[var(--crimson)] px-3 py-2 text-[var(--surface)]`}
              >
                the intervention
              </span>
              <span className="text-[var(--crimson)]">→</span>
              <Terms
                items={["behavior", "expectations", "employee trust"]}
                className=""
              />
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <Split1 left="Who may leave" right="Which actions" />
            <Steps
              items={["legitimate", "effective", "ethically defensible"]}
              cols="grid-cols-3"
              className="mt-5 max-w-2xl"
            />
            <p className={`${DISPLAY} mt-7 max-w-4xl`}>
              The relevant question is not only who may leave, but which
              actions are legitimate, effective, and ethically defensible.
            </p>
          </div>
        </div>

        <Discussion1>
          When does predictive retention become a strategic advantage, and when
          does it become an intrusive practice that changes the employment
          relationship for the worse?
        </Discussion1>
      </Slide>

      {/* ==================================================================
          21 · ORGANIZATIONAL NETWORK ANALYSIS — two teams joined through one
          overloaded connector, an isolated team and a hidden dependency;
          four uses; visibility tipping into surveillance.
      ================================================================== */}
      <Slide id="network-analysis" border align="left">
        <Head1 eyebrow="How work flows">
          Organizational Network Analysis and Collaboration Patterns
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Digital collaboration traces can reveal bottlenecks, overloaded
            connectors, isolated teams, and hidden dependencies across the
            organization.
          </p>
          <svg
            aria-hidden
            viewBox="0 0 800 200"
            className="mt-7 w-full max-w-5xl"
            fill="none"
          >
            {(() => {
              const left = [
                [60, 70],
                [110, 40],
                [140, 100],
                [80, 130],
                [180, 60],
              ];
              const right = [
                [460, 60],
                [520, 40],
                [540, 110],
                [480, 130],
                [590, 80],
              ];
              const isolated = [
                [720, 150],
                [760, 130],
                [750, 175],
              ];
              const hub = [320, 90];
              const mesh = (pts: number[][], key: string) =>
                pts.flatMap((a, i) =>
                  pts.slice(i + 1).map((b, j) => (
                    <path
                      key={`${key}-${i}-${j}`}
                      d={`M${a[0]} ${a[1]}L${b[0]} ${b[1]}`}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.14"
                    />
                  )),
                );
              return (
                <>
                  {mesh(left, "l")}
                  {mesh(right, "r")}
                  {mesh(isolated, "i")}
                  {[...left, ...right].map(([x, y], i) => (
                    <path
                      key={`h-${i}`}
                      d={`M${hub[0]} ${hub[1]}L${x} ${y}`}
                      stroke="var(--crimson)"
                      strokeOpacity="0.35"
                    />
                  ))}
                  <path
                    d="M80 130 C 220 200, 420 200, 540 110"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.45"
                    strokeDasharray="4 4"
                  />
                  {[...left, ...right, ...isolated].map(([x, y], i) => (
                    <circle
                      key={`n-${i}`}
                      cx={x}
                      cy={y}
                      r="6"
                      fill="var(--surface)"
                      stroke="var(--charcoal)"
                      strokeOpacity="0.55"
                    />
                  ))}
                  <circle cx={hub[0]} cy={hub[1]} r="11" fill="var(--crimson)" />
                  <text
                    {...SVG_LABEL}
                    x={hub[0]}
                    y="22"
                    textAnchor="middle"
                    fill="var(--crimson)"
                  >
                    OVERLOADED CONNECTORS
                  </text>
                  <text
                    {...SVG_LABEL}
                    x="310"
                    y="196"
                    textAnchor="middle"
                    fill="var(--charcoal)"
                    fillOpacity="0.55"
                  >
                    HIDDEN DEPENDENCIES
                  </text>
                  <text
                    {...SVG_LABEL}
                    x="780"
                    y="108"
                    textAnchor="end"
                    fill="var(--charcoal)"
                    fillOpacity="0.55"
                  >
                    ISOLATED TEAMS
                  </text>
                </>
              );
            })()}
          </svg>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              These insights can improve succession planning, team design,
              integration after restructuring, and leadership visibility into
              how work actually flows.
            </p>
            <Steps
              items={[
                "succession planning",
                "team design",
                "integration after restructuring",
                "leadership visibility",
              ]}
              cols="md:grid-cols-4"
              className="mt-6 max-w-4xl"
            />
          </div>
        </div>

        <div className="w-full">
          <div className="mt-14 w-full max-w-5xl">
            <Split1
              left="Behavioral visibility"
              right="Perceived as surveillance"
            />
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              Network analytics must be handled carefully because behavioral
              visibility can quickly be perceived as surveillance if governance
              is weak.
            </p>
          </div>
        </div>
      </Slide>

      <ModulePlate2
        id="module-4"
        numeral="IV"
        title="Learning, Development, and Performance"
        lines={[
          "This module examines how AI supports capability building, managerial coaching, performance review quality, and reward decisions.",
          "The strategic theme is moving from generic HR programs to more targeted workforce development without reducing people to narrow metrics.",
        ]}
      />

      {/* ==================================================================
          23 · PERSONALIZED LEARNING — four inputs shaping one pathway; a
          flood of suggestions set against a relevant few; development
          carried through to real opportunities.
      ================================================================== */}
      <Slide id="personalized-learning" border align="left">
        <Head1 eyebrow="Capability building">
          Personalized Learning and Capability Building
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            AI can recommend learning pathways based on role requirements,
            career goals, adjacent skills, and current performance gaps.
          </p>
          <svg
            aria-hidden
            viewBox="0 0 800 112"
            className="mt-7 w-full max-w-5xl"
            fill="none"
          >
            {[
              "ROLE REQUIREMENTS",
              "CAREER GOALS",
              "ADJACENT SKILLS",
              "CURRENT PERFORMANCE GAPS",
            ].map((src, i) => {
              const y = 14 + i * 28;
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
                    d={`M236 ${y} C 290 ${y}, 300 56, 350 56`}
                    stroke="var(--charcoal)"
                    strokeOpacity="0.22"
                  />
                </g>
              );
            })}
            <path
              d="M350 56H440V36H540V56H630V30H760"
              stroke="var(--crimson)"
              strokeWidth="2"
            />
            {[
              [440, 36],
              [540, 56],
              [630, 30],
            ].map(([x, y]) => (
              <circle key={x} cx={x} cy={y} r="4" fill="var(--crimson)" />
            ))}
            <path d="M752 25l9 5l-9 5" stroke="var(--crimson)" strokeWidth="2" />
            <text
              {...SVG_LABEL}
              x="560"
              y="96"
              textAnchor="middle"
              fill="var(--crimson)"
            >
              LEARNING PATHWAYS
            </text>
          </svg>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <div
              aria-hidden
              className="grid max-w-4xl gap-8 md:grid-cols-2 md:gap-0"
            >
              <div className="md:pr-10">
                <div
                  className={`${MICRO} text-[var(--charcoal-light)]/55 [text-decoration-line:line-through]`}
                >
                  Overwhelms employees
                </div>
                <div className="mt-4 grid grid-cols-9 gap-1.5">
                  {Array.from({ length: 27 }).map((_, k) => (
                    <span
                      key={k}
                      className="block h-4 border border-[var(--charcoal)]/15 bg-[var(--charcoal)]/[0.04]"
                    />
                  ))}
                </div>
              </div>
              <div className="md:border-l md:border-[var(--charcoal)]/12 md:pl-10">
                <div className={`${MICRO} text-[var(--crimson)]`}>
                  Relevance and completion
                </div>
                <div className="mt-4 flex gap-1.5">
                  {[0, 1, 2].map((k) => (
                    <span key={k} className="block h-4 w-12 bg-[var(--crimson)]" />
                  ))}
                </div>
              </div>
            </div>
            <p className={`${BODY} mt-7 max-w-4xl`}>
              Personalization is useful when it increases relevance and
              completion, not when it overwhelms employees with automated
              content suggestions.
            </p>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <div
              aria-hidden
              className="flex flex-wrap items-center gap-x-4 gap-y-3"
            >
              <span
                className={`${TAG} border border-[var(--charcoal)]/15 px-3 py-2 text-[var(--charcoal-light)]/60`}
              >
                development activity
              </span>
              <span className="text-[var(--charcoal)]/35">→</span>
              <span
                className={`${TAG} bg-[var(--crimson)] px-3 py-2 text-[var(--surface)]`}
              >
                real internal opportunities
              </span>
              <span className="text-[var(--crimson)]">→</span>
              <Terms items={["mobility", "business need"]} className="" />
            </div>
            <p className={`${DISPLAY} mt-7 max-w-4xl`}>
              Learning systems should connect development activity to real
              internal opportunities so capability building is tied to mobility
              and business need.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          24 · MANAGER COPILOTS — four things managers need fast; one copilot
          serving a dispersed population; the conditions that decide value,
          with ambiguity escalated to people.
      ================================================================== */}
      <Slide id="manager-copilots" border align="left">
        <Head1 eyebrow="Manager support">
          Knowledge Retrieval and Manager Copilots
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            HR and people managers increasingly need fast access to policy
            guidance, coaching templates, job architectures, and process rules.
          </p>
          <Steps
            items={[
              "policy guidance",
              "coaching templates",
              "job architectures",
              "process rules",
            ]}
            cols="md:grid-cols-4"
            className="mt-6 max-w-4xl"
          />
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Retrieval-based copilots can improve consistency and reduce
              routine administrative burden across dispersed management
              populations.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 800 150"
              className="mt-6 w-full max-w-5xl"
              fill="none"
            >
              {[
                [80, 40],
                [150, 110],
                [230, 30],
                [300, 120],
                [520, 28],
                [580, 118],
                [660, 50],
                [730, 110],
                [60, 120],
                [740, 30],
              ].map(([x, y], i) => (
                <g key={i}>
                  <path
                    d={`M400 76L${x} ${y}`}
                    stroke="var(--crimson)"
                    strokeOpacity="0.3"
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r="5"
                    fill="var(--surface)"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.55"
                  />
                </g>
              ))}
              <rect x="388" y="64" width="24" height="24" fill="var(--crimson)" />
              <text
                {...SVG_LABEL}
                x="400"
                y="110"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                RETRIEVAL-BASED COPILOTS
              </text>
              <text
                {...SVG_LABEL}
                x="400"
                y="146"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.5"
              >
                DISPERSED MANAGEMENT POPULATIONS
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <div
              aria-hidden
              className="flex flex-wrap items-center gap-x-4 gap-y-3"
            >
              {["source quality", "access controls"].map((c) => (
                <span
                  key={c}
                  className={`${TAG} border border-[var(--charcoal)]/15 px-3 py-2 text-[var(--charcoal-light)]/70`}
                >
                  {c}
                </span>
              ))}
              <span className="mx-2 h-6 w-px bg-[var(--charcoal)]/15" />
              <span
                className={`${TAG} border border-dashed border-[var(--crimson)]/55 px-3 py-2 text-[var(--crimson)]`}
              >
                ambiguous issues
              </span>
              <span className="text-[var(--crimson)]">→</span>
              <span
                className={`${TAG} bg-[var(--crimson)] px-3 py-2 text-[var(--surface)]`}
              >
                qualified HR partners
              </span>
            </div>
            <p className={`${DISPLAY} mt-7 max-w-4xl`}>
              Their value depends on source quality, access controls, and
              whether ambiguous issues are escalated to qualified HR partners.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          25 · PERFORMANCE MANAGEMENT — three supports; a stack of reviews
          with three kinds flagged; support set against replacing manager
          accountability.
      ================================================================== */}
      <Slide id="performance-management" border align="left">
        <Head1 eyebrow="Calibration">
          Performance Management and Goal Calibration
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            AI can help summarize feedback, detect inconsistency in manager
            narratives, and compare evaluation patterns across teams or job
            families.
          </p>
          <Steps
            items={[
              "summarize feedback",
              "detect inconsistency in manager narratives",
              "compare evaluation patterns",
            ]}
            cols="grid-cols-3"
            className="mt-6 max-w-4xl"
          />
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              The benefit is stronger calibration and earlier identification of
              inflated, missing, or weakly evidenced reviews.
            </p>
            <div
              aria-hidden
              className="mt-6 max-w-3xl border-t border-[var(--charcoal)]/25"
            >
              {[
                { w: 64, flag: "" },
                { w: 96, flag: "inflated" },
                { w: 58, flag: "" },
                { w: 0, flag: "missing" },
                { w: 70, flag: "" },
                { w: 22, flag: "weakly evidenced" },
              ].map((r, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[1fr_10rem] items-center gap-4 border-b border-[var(--charcoal)]/8 py-2"
                >
                  {r.w > 0 ? (
                    <span
                      className={`block h-1.5 ${
                        r.flag ? "bg-[var(--crimson)]/60" : "bg-[var(--charcoal)]/15"
                      }`}
                      style={{ width: `${r.w}%` }}
                    />
                  ) : (
                    <span className="block h-1.5 w-full border border-dashed border-[var(--crimson)]/50" />
                  )}
                  <span
                    className={`${TAG} ${
                      r.flag ? "text-[var(--crimson)]" : "text-transparent"
                    }`}
                  >
                    {r.flag || "·"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <Split1
              left="Replace manager accountability"
              right="Support better judgment"
              strikeLeft
            />
            <Terms
              items={["coaching", "context", "difficult conversations"]}
              className="mt-4"
            />
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              Performance systems should support better judgment, not replace
              manager accountability for coaching, context, and difficult
              conversations.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          26 · REWARDS AND PAY EQUITY — two comparable groups with an
          unexplained gap; episodic review set against ongoing monitoring;
          the three sensitive decisions.                     [quiz topic]
      ================================================================== */}
      <Slide id="pay-equity" border align="left">
        <Head1 eyebrow="Rewards" signal>
          Rewards, Promotion, and Pay Equity Analytics
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            AI can surface unexplained pay variation, promotion bottlenecks, and
            inconsistent reward outcomes across comparable employee groups.
          </p>
          <figure aria-hidden className="mt-7 w-full max-w-5xl">
            <svg viewBox="0 0 800 126" className="w-full" fill="none">
              <text
                {...SVG_LABEL}
                x="0"
                y="12"
                fill="var(--charcoal)"
                fillOpacity="0.45"
              >
                COMPARABLE EMPLOYEE GROUPS
              </text>
              {[
                { y: 44, shift: 0, tone: "var(--charcoal)" },
                { y: 84, shift: -120, tone: "var(--crimson)" },
              ].map((g, gi) => (
                <g key={gi}>
                  <path
                    d={`M20 ${g.y}H780`}
                    stroke="var(--charcoal)"
                    strokeOpacity="0.1"
                  />
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => (
                    <circle
                      key={k}
                      cx={440 + g.shift + k * 30 + ((k * 13) % 9)}
                      cy={g.y}
                      r="5"
                      fill={g.tone}
                      fillOpacity={gi === 0 ? 0.35 : 0.85}
                    />
                  ))}
                </g>
              ))}
              <path
                d="M560 58V70M440 58V70M440 64H560"
                stroke="var(--crimson)"
              />
              <text
                {...SVG_LABEL}
                x="600"
                y="118"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                UNEXPLAINED PAY VARIATION
              </text>
              <path d="M500 64V102" stroke="var(--crimson)" strokeOpacity="0.3" strokeDasharray="2 3" />
            </svg>
            <Schematic />
          </figure>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              These tools help move equity analysis from episodic review to
              ongoing monitoring tied to actual decision processes.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 800 84"
              className="mt-6 w-full max-w-5xl"
              fill="none"
            >
              <text
                {...SVG_LABEL}
                x="0"
                y="23"
                fill="var(--charcoal)"
                fillOpacity="0.5"
              >
                EPISODIC REVIEW
              </text>
              <path d="M220 20H780" stroke="var(--charcoal)" strokeOpacity="0.1" />
              {[260, 520, 770].map((x) => (
                <path
                  key={x}
                  d={`M${x} 10V30`}
                  stroke="var(--charcoal)"
                  strokeOpacity="0.5"
                  strokeWidth="2"
                />
              ))}
              <text {...SVG_LABEL} x="0" y="67" fill="var(--crimson)">
                ONGOING MONITORING
              </text>
              <path d="M220 64H780" stroke="var(--crimson)" strokeWidth="3" />
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <div aria-hidden className="max-w-3xl">
              <div className="grid grid-cols-3 gap-3">
                {["salary", "promotion", "bonus"].map((p) => (
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
                Socially sensitive · legally consequential
              </div>
            </div>
            <p className={`${DISPLAY} mt-7 max-w-4xl`}>
              Governance is essential because salary, promotion, and bonus
              decisions are socially sensitive and legally consequential.
            </p>
          </div>
        </div>

        <Discussion1>
          Should firms use algorithmic recommendations in promotion and
          compensation cycles if doing so improves consistency but may narrow
          managerial discretion and contextual judgment?
        </Discussion1>
      </Slide>

      {/* ==================================================================
          27 · PRODUCTIVITY ANALYTICS — three data streams combined into three
          estimates; the same tools used well and used poorly, side by side.
                                                     [quiz: pay-equity]
      ================================================================== */}
      <Slide
        id="productivity-analytics"
        border
        align="left"
        quizData={quiz["productivity-analytics"]}
      >
        <Head1 eyebrow="Monitoring">
          Productivity Analytics and Responsible Monitoring
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Organizations can combine workflow data, output data, and
            collaboration data to estimate capacity constraints, workload
            patterns, and process bottlenecks.
          </p>
          <svg
            aria-hidden
            viewBox="0 0 800 104"
            className="mt-7 w-full max-w-5xl"
            fill="none"
          >
            {["WORKFLOW DATA", "OUTPUT DATA", "COLLABORATION DATA"].map(
              (src, i) => {
                const y = 16 + i * 36;
                return (
                  <g key={src}>
                    <text
                      {...SVG_LABEL}
                      x="0"
                      y={y + 3}
                      fill="var(--charcoal)"
                      fillOpacity="0.6"
                    >
                      {src}
                    </text>
                    <path
                      d={`M200 ${y} C 260 ${y}, 270 52, 330 52`}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.3"
                    />
                  </g>
                );
              },
            )}
            <circle cx="338" cy="52" r="7" fill="var(--crimson)" />
            {["CAPACITY CONSTRAINTS", "WORKLOAD PATTERNS", "PROCESS BOTTLENECKS"].map(
              (o, i) => {
                const y = 16 + i * 36;
                return (
                  <g key={o}>
                    <path
                      d={`M346 52 C 400 52, 410 ${y}, 470 ${y}`}
                      stroke="var(--crimson)"
                      strokeOpacity="0.45"
                    />
                    <rect
                      x="476"
                      y={y - 5}
                      width="10"
                      height="10"
                      fill="var(--crimson)"
                    />
                    <text
                      {...SVG_LABEL}
                      x="498"
                      y={y + 3}
                      fill="var(--charcoal)"
                      fillOpacity="0.7"
                    >
                      {o}
                    </text>
                  </g>
                );
              },
            )}
          </svg>
        </div>

        <div className="mt-12 grid w-full max-w-5xl gap-10 border-t border-[var(--charcoal)]/10 pt-8 md:grid-cols-2 md:gap-0">
          <div className="md:pr-12">
            <div className={`${MICRO} text-[var(--champagne)]`}>Used well</div>
            <p className={`${BODY} mt-4`}>
              Used well, productivity analytics can support redesign of work,
              team staffing, and manager coaching rather than individual
              policing.
            </p>
            <div aria-hidden className="mt-5 flex flex-wrap gap-2">
              {["redesign of work", "team staffing", "manager coaching"].map(
                (u) => (
                  <span
                    key={u}
                    className={`${TAG} border border-[var(--charcoal)]/15 px-2.5 py-1.5 text-[var(--charcoal-light)]/70`}
                  >
                    {u}
                  </span>
                ),
              )}
              <span
                className={`${TAG} border border-[var(--charcoal)]/15 px-2.5 py-1.5 text-[var(--charcoal-light)]/45 [text-decoration-line:line-through]`}
              >
                individual policing
              </span>
            </div>
          </div>
          <div className="md:border-l md:border-[var(--charcoal)]/12 md:pl-12">
            <div className={`${MICRO} text-[var(--crimson)]`}>Used poorly</div>
            <p className={`${BODY} mt-4`}>
              Used poorly, the same tools can create fear, gaming behavior, and
              degraded trust across the workforce.
            </p>
            <div aria-hidden className="mt-5 flex flex-wrap gap-2">
              {["fear", "gaming behavior", "degraded trust"].map((u) => (
                <span
                  key={u}
                  className={`${TAG} border border-[var(--crimson)]/45 px-2.5 py-1.5 text-[var(--crimson)]`}
                >
                  {u}
                </span>
              ))}
            </div>
          </div>
        </div>

        <Discussion1>
          Where is the boundary between legitimate operational analytics and
          unacceptable employee surveillance in knowledge-intensive work?
        </Discussion1>
      </Slide>

      <ModulePlate2
        id="module-5"
        numeral="V"
        title="Employee Listening, DEI, and Compliance"
        lines={[
          "This module addresses employee sentiment, inclusion analytics, case management, and legal boundaries.",
          "The challenge is interpreting workforce signals responsibly without overclaiming what the data actually means.",
        ]}
      />

      {/* ==================================================================
          29 · EMPLOYEE LISTENING — four sources condensed into themes and
          concerns; a local issue set against an enterprise-wide pattern;
          what distorts what employees choose to say.
      ================================================================== */}
      <Slide id="employee-listening" border align="left">
        <Head1 eyebrow="Listening at scale">
          Employee Listening and Sentiment Interpretation
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            AI can summarize survey comments, open-text feedback, exit
            interviews, and service-center narratives into recurring themes and
            emerging concerns.
          </p>
          <svg
            aria-hidden
            viewBox="0 0 800 112"
            className="mt-7 w-full max-w-5xl"
            fill="none"
          >
            {[
              "SURVEY COMMENTS",
              "OPEN-TEXT FEEDBACK",
              "EXIT INTERVIEWS",
              "SERVICE-CENTER NARRATIVES",
            ].map((src, i) => {
              const y = 14 + i * 28;
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
                    d={`M236 ${y} C 300 ${y}, 310 56, 380 56`}
                    stroke="var(--charcoal)"
                    strokeOpacity="0.22"
                  />
                </g>
              );
            })}
            <path d="M380 56H440" stroke="var(--crimson)" strokeWidth="1.5" />
            {[
              { y: 34, label: "RECURRING THEMES" },
              { y: 78, label: "EMERGING CONCERNS" },
            ].map((o) => (
              <g key={o.label}>
                <path
                  d={`M440 56 C 480 56, 490 ${o.y}, 530 ${o.y}`}
                  stroke="var(--crimson)"
                  strokeOpacity="0.5"
                />
                <rect
                  x="536"
                  y={o.y - 5}
                  width="10"
                  height="10"
                  fill="var(--crimson)"
                />
                <text
                  {...SVG_LABEL}
                  x="558"
                  y={o.y + 3}
                  fill="var(--charcoal)"
                  fillOpacity="0.7"
                >
                  {o.label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              The value lies in scale and speed, especially when leaders need to
              distinguish local operational issues from enterprise-wide cultural
              patterns.
            </p>
            <div
              aria-hidden
              className="mt-7 grid max-w-4xl gap-8 md:grid-cols-2 md:gap-12"
            >
              {[
                { label: "Local operational issues", lit: [5] },
                {
                  label: "Enterprise-wide cultural patterns",
                  lit: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                },
              ].map((panel) => (
                <div key={panel.label}>
                  <div className={`${MICRO} text-[var(--champagne)]`}>
                    {panel.label}
                  </div>
                  <div className="mt-3 grid grid-cols-6 gap-1.5">
                    {Array.from({ length: 12 }).map((_, k) => (
                      <span
                        key={k}
                        className={`block h-7 ${
                          panel.lit.includes(k)
                            ? "bg-[var(--crimson)]/70"
                            : "border border-[var(--charcoal)]/15"
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
          <div className="mt-12 w-full max-w-5xl">
            <div
              aria-hidden
              className="flex flex-wrap items-center gap-x-4 gap-y-3"
            >
              <span
                className={`${TAG} border border-[var(--charcoal)]/15 px-3 py-2 text-[var(--charcoal-light)]/60`}
              >
                what employees choose to say
              </span>
              {["silence", "fear", "context"].map((c) => (
                <span
                  key={c}
                  className={`${TAG} border-l-2 border-[var(--crimson)] px-3 py-2 text-[var(--crimson)]`}
                >
                  {c}
                </span>
              ))}
              <span className="text-[var(--charcoal)]/35">→</span>
              <span
                className={`${TAG} border border-dashed border-[var(--charcoal)]/30 px-3 py-2 text-[var(--charcoal-light)]/70`}
              >
                directional evidence
              </span>
            </div>
            <p className={`${DISPLAY} mt-7 max-w-4xl`}>
              Sentiment outputs should be treated as directional evidence
              because silence, fear, and context can distort what employees
              choose to say.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          30 · DEI ANALYTICS — five measures tracked across groups; a flat
          aggregate hiding one group's drop; a gap that does not reveal its
          cause or its remedy.                               [quiz topic]
      ================================================================== */}
      <Slide id="dei-analytics" border align="left">
        <Head1 eyebrow="Inclusion analytics" signal>
          DEI Analytics and Representation Risk
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            AI-enabled analytics can track representation patterns, funnel
            drop-off, promotion velocity, pay dispersion, and program
            participation across groups.
          </p>
          <Steps
            items={[
              "representation patterns",
              "funnel drop-off",
              "promotion velocity",
              "pay dispersion",
              "program participation",
            ]}
            cols="sm:grid-cols-3 md:grid-cols-5"
            className="mt-6 max-w-5xl"
          />
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              These analyses help identify structural barriers that may not be
              visible in aggregate workforce dashboards.
            </p>
            <figure aria-hidden className="mt-6 w-full max-w-5xl">
              <svg viewBox="0 0 800 130" className="w-full" fill="none">
                <text
                  {...SVG_LABEL}
                  x="0"
                  y="12"
                  fill="var(--charcoal)"
                  fillOpacity="0.5"
                >
                  AGGREGATE WORKFORCE DASHBOARDS
                </text>
                <path d="M0 110H340" stroke="var(--charcoal)" strokeOpacity="0.2" />
                <path
                  d="M10 50 C 100 54, 200 58, 330 64"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.6"
                  strokeWidth="2"
                />
                <path d="M400 20V120" stroke="var(--charcoal)" strokeOpacity="0.1" />
                <text {...SVG_LABEL} x="440" y="12" fill="var(--crimson)">
                  ACROSS GROUPS
                </text>
                <path d="M440 110H790" stroke="var(--charcoal)" strokeOpacity="0.2" />
                <path
                  d="M450 44 C 560 44, 660 46, 780 50"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.45"
                />
                <path
                  d="M450 52 C 560 52, 660 54, 780 58"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.45"
                />
                <path
                  d="M450 56 C 560 62, 600 96, 780 100"
                  stroke="var(--crimson)"
                  strokeWidth="2"
                />
                <text
                  {...SVG_LABEL}
                  x="780"
                  y="124"
                  textAnchor="end"
                  fill="var(--crimson)"
                >
                  STRUCTURAL BARRIERS
                </text>
              </svg>
              <Schematic />
            </figure>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <div
              aria-hidden
              className="flex flex-wrap items-center gap-x-4 gap-y-3"
            >
              <span
                className={`${TAG} bg-[var(--crimson)] px-3 py-2 text-[var(--surface)]`}
              >
                representation gaps
              </span>
              <span className="font-serif text-2xl text-[var(--charcoal)]/40">
                ≠
              </span>
              {["causality", "the right intervention"].map((c) => (
                <span
                  key={c}
                  className={`${TAG} border border-[var(--charcoal)]/15 px-3 py-2 text-[var(--charcoal-light)]/60`}
                >
                  {c}
                </span>
              ))}
            </div>
            <p className={`${DISPLAY} mt-7 max-w-4xl`}>
              Leaders still need careful interpretation because representation
              gaps do not automatically reveal causality or the right
              intervention.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          31 · CASE TRIAGE — incoming cases sorted and routed to the right
          specialist; the four matters where delay falls; AI held to workflow
          discipline, not final judgment.          [quiz: dei-analytics]
      ================================================================== */}
      <Slide
        id="case-triage"
        border
        align="left"
        quizData={quiz["case-triage"]}
      >
        <Head1 eyebrow="Employee relations">
          Employee Relations, Case Triage, and Policy Guidance
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            HR teams can use AI to classify cases, summarize documents, surface
            policy precedents, and route matters to the right specialist more
            quickly.
          </p>
          <svg
            aria-hidden
            viewBox="0 0 800 130"
            className="mt-7 w-full max-w-5xl"
            fill="none"
          >
            {[
              [20, 30],
              [50, 64],
              [30, 98],
              [80, 44],
              [96, 86],
              [130, 60],
            ].map(([x, y], i) => (
              <g key={i}>
                <rect
                  x={x}
                  y={y - 7}
                  width="18"
                  height="14"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.5"
                />
                <path
                  d={`M${x + 18} ${y} C ${x + 120} ${y}, 230 65, 300 65`}
                  stroke="var(--charcoal)"
                  strokeOpacity="0.15"
                />
              </g>
            ))}
            <text
              {...SVG_LABEL}
              x="0"
              y="126"
              fill="var(--charcoal)"
              fillOpacity="0.5"
            >
              CASES
            </text>
            <rect x="300" y="49" width="32" height="32" fill="var(--crimson)" />
            {[
              { y: 22, on: false },
              { y: 65, on: true },
              { y: 108, on: false },
            ].map((lane) => (
              <g key={lane.y}>
                <path
                  d={`M332 65 C 400 65, 420 ${lane.y}, 520 ${lane.y}H640`}
                  stroke={lane.on ? "var(--crimson)" : "var(--charcoal)"}
                  strokeOpacity={lane.on ? 1 : 0.2}
                  strokeWidth={lane.on ? 1.5 : 1}
                />
                <circle
                  cx="652"
                  cy={lane.y}
                  r="7"
                  fill={lane.on ? "var(--crimson)" : "var(--surface)"}
                  stroke="var(--charcoal)"
                  strokeOpacity={lane.on ? 0 : 0.4}
                />
              </g>
            ))}
            <text
              {...SVG_LABEL}
              x="672"
              y="68"
              fill="var(--crimson)"
            >
              THE RIGHT
            </text>
            <text
              {...SVG_LABEL}
              x="672"
              y="81"
              fill="var(--crimson)"
            >
              SPECIALIST
            </text>
          </svg>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              This can reduce administrative delay in investigations, leave
              management, accommodation requests, and misconduct response.
            </p>
            <Steps
              items={[
                "investigations",
                "leave management",
                "accommodation requests",
                "misconduct response",
              ]}
              cols="md:grid-cols-4"
              className="mt-6 max-w-4xl"
            />
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <div aria-hidden className="flex flex-wrap gap-3">
              {["trauma", "legal exposure", "power imbalance"].map((o) => (
                <span
                  key={o}
                  className={`${TAG} border border-[var(--crimson)]/40 px-3 py-2 text-[var(--crimson)]`}
                >
                  {o}
                </span>
              ))}
            </div>
            <div className="mt-8">
              <Split1
                left="Final judgment"
                right="Workflow discipline"
                strikeLeft
              />
            </div>
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              Because cases may involve trauma, legal exposure, or power
              imbalance, AI should support workflow discipline rather than final
              judgment.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          32 · PRIVACY AND EMPLOYMENT LAW — five sensitive categories held
          inside strict access control; five legal boundaries; acceptable
          analysis drawn inside what is technically possible.
      ================================================================== */}
      <Slide id="privacy-law" border align="left">
        <Head1 eyebrow="Legal boundaries" signal>
          Privacy, Consent, and Employment Law Boundaries
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            HR data often includes health information, compensation details,
            identity attributes, grievances, and performance records that
            require strict access control.
          </p>
          <div aria-hidden className="mt-7 max-w-4xl border-2 border-[var(--crimson)] p-3">
            <div className={`${MICRO} px-1 pb-3 text-[var(--crimson)]`}>
              Strict access control
            </div>
            <div className="grid grid-cols-2 gap-px bg-[var(--charcoal)]/10 sm:grid-cols-3 md:grid-cols-5">
              {[
                "health information",
                "compensation details",
                "identity attributes",
                "grievances",
                "performance records",
              ].map((c) => (
                <span
                  key={c}
                  className={`${TAG} bg-[var(--background)] px-3 py-4 text-[var(--charcoal-light)]/70`}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              AI programs must be designed around employment law, labor
              standards, privacy obligations, records retention, and
              cross-border data handling rules.
            </p>
            <Steps
              items={[
                "employment law",
                "labor standards",
                "privacy obligations",
                "records retention",
                "cross-border data handling rules",
              ]}
              cols="sm:grid-cols-3 md:grid-cols-5"
              className="mt-6 max-w-5xl"
            />
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 grid w-full max-w-5xl items-center gap-10 md:grid-cols-[22rem_1fr] md:gap-14">
            <div
              aria-hidden
              className="border border-dashed border-[var(--charcoal)]/30 p-4 pb-5"
            >
              <div className={`${MICRO} text-[var(--charcoal-light)]/55`}>
                Technically possible analysis
              </div>
              <div className="mt-6 w-3/5 border-2 border-[var(--crimson)] p-3">
                <div className={`${MICRO} text-[var(--crimson)]`}>
                  Legally or ethically acceptable analysis
                </div>
              </div>
            </div>
            <p className={DISPLAY}>
              Leaders should assume that technically possible analysis is often
              broader than legally or ethically acceptable analysis.
            </p>
          </div>
        </div>

        <Discussion1>
          Which categories of workforce data should remain off-limits for
          predictive modeling even if they would improve forecast accuracy or
          managerial control?
        </Discussion1>
      </Slide>

      <ModulePlate2
        id="module-6"
        numeral="VI"
        title="Governance and the Strategic Operating Model"
        lines={[
          "This final module focuses on how organizations scale HR AI responsibly across policy, technology, operating model, and trust.",
          "The strategic differentiator is disciplined governance and adoption, not isolated pilots with impressive demonstrations.",
        ]}
      />

      {/* ==================================================================
          34 · GOVERNANCE ACROSS THE LIFECYCLE — seven stages in order; the
          four "who" questions governance must answer; an inventory whose
          value lives in the columns linked to it.           [quiz topic]
      ================================================================== */}
      <Slide id="governance-lifecycle" border align="left">
        <Head1 eyebrow="Controls">AI Governance for HR Across the Lifecycle</Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            HR AI requires controls for problem definition, data selection,
            validation, deployment, monitoring, incident handling, and
            retirement.
          </p>
          <Steps
            items={[
              "problem definition",
              "data selection",
              "validation",
              "deployment",
              "monitoring",
              "incident handling",
              "retirement",
            ]}
            cols="sm:grid-cols-4 lg:grid-cols-7"
            className="mt-6 max-w-5xl"
          />
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Governance should clarify who owns the use case, who reviews legal
              risk, who validates outcomes, and who has authority to stop
              deployment.
            </p>
            <ul aria-hidden className="mt-6 max-w-3xl border-t border-[var(--charcoal)]/15">
              {[
                "owns the use case",
                "reviews legal risk",
                "validates outcomes",
                "has authority to stop deployment",
              ].map((q, i) => (
                <li
                  key={q}
                  className="grid grid-cols-[4rem_1fr_2rem] items-baseline gap-4 border-b border-[var(--charcoal)]/10 py-2.5"
                >
                  <span
                    className={`${MICRO} ${
                      i === 3 ? "text-[var(--crimson)]" : "text-[var(--champagne)]"
                    }`}
                  >
                    Who
                  </span>
                  <span
                    className={`${TAG} ${
                      i === 3
                        ? "text-[var(--crimson)]"
                        : "text-[var(--charcoal-light)]/70"
                    }`}
                  >
                    {q}
                  </span>
                  <span className="text-right font-serif text-lg text-[var(--crimson)]">
                    ?
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <div
              aria-hidden
              className="max-w-3xl overflow-x-auto border-t border-[var(--charcoal)]/30"
            >
              <div className="min-w-[30rem]">
                <div className="grid grid-cols-4 border-b border-[var(--charcoal)]/15">
                  <span
                    className={`${TAG} px-3 py-2.5 text-[var(--charcoal-light)]/60`}
                  >
                    model inventory
                  </span>
                  {["decisions", "review cadence", "documented accountability"].map(
                    (h) => (
                      <span
                        key={h}
                        className={`${TAG} border-l border-[var(--crimson)]/30 px-3 py-2.5 text-[var(--crimson)]`}
                      >
                        {h}
                      </span>
                    ),
                  )}
                </div>
                {[0, 1, 2].map((r) => (
                  <div
                    key={r}
                    className="grid grid-cols-4 border-b border-[var(--charcoal)]/8"
                  >
                    {[0, 1, 2, 3].map((c) => (
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
            <p className={`${DISPLAY} mt-7 max-w-4xl`}>
              A model inventory is valuable only when it is linked to decisions,
              review cadence, and documented accountability.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          35 · BUILD, BUY, OR PARTNER — vendor sourcing beside internal
          design; five decision factors; the purchase leaving the firm while
          accountability stays.             [quiz: governance-lifecycle]
      ================================================================== */}
      <Slide
        id="build-buy-partner"
        border
        align="left"
        quizData={quiz["build-buy-partner"]}
      >
        <Head1 eyebrow="Sourcing capability">
          Build, Buy, or Partner in the HR Technology Stack
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Some capabilities can be sourced from established HR vendors, while
            others require internal design because workflows, labor strategy, or
            risk tolerance are distinctive.
          </p>
          <div aria-hidden className="mt-7 grid max-w-4xl gap-6 md:grid-cols-2">
            <div className="border-t border-[var(--charcoal)]/25 pt-4">
              <div className={`${MICRO} text-[var(--charcoal-light)]/60`}>
                Established HR vendors
              </div>
            </div>
            <div className="border-t-2 border-[var(--crimson)] pt-4">
              <div className={`${MICRO} text-[var(--crimson)]`}>
                Internal design
              </div>
              <Terms
                items={["workflows", "labor strategy", "risk tolerance"]}
                className="mt-3"
              />
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              The choice depends on integration burden, vendor transparency,
              configurability, data portability, and internal capability.
            </p>
            <Steps
              items={[
                "integration burden",
                "vendor transparency",
                "configurability",
                "data portability",
                "internal capability",
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
                  Software
                </span>
                <span className="flex items-center gap-3">
                  <span className="h-px flex-1 bg-[var(--charcoal)]/30" />
                  <span className="text-[var(--charcoal)]/40">→</span>
                  <span
                    className={`${TAG} border border-[var(--charcoal)]/15 px-3 py-2 text-[var(--charcoal-light)]/60`}
                  >
                    purchasing
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
                    items={[
                      "employment outcomes",
                      "fairness concerns",
                      "regulatory exposure",
                    ]}
                    className=""
                  />
                </span>
              </div>
            </div>
            <p className={`${DISPLAY} mt-8 max-w-4xl`}>
              Purchasing software does not transfer accountability for
              employment outcomes, fairness concerns, or regulatory exposure.
            </p>
          </div>
        </div>

        <Discussion1>
          Which HR AI capabilities should be treated as strategic internal
          assets, and which are mature enough to buy as standardized
          infrastructure?
        </Discussion1>
      </Slide>

      {/* ==================================================================
          36 · CHANGE MANAGEMENT AND TRUST — the four groups whose trust an
          accurate tool still needs; four adoption moves; visible governance
          set against claims of objectivity.
      ================================================================== */}
      <Slide id="change-trust" border align="left">
        <Head1 eyebrow="Adoption">Change Management and Workforce Trust</Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Even accurate tools fail when employees, managers, works councils,
            or HR partners do not trust how the system is used.
          </p>
          <svg
            aria-hidden
            viewBox="0 0 800 120"
            className="mt-7 w-full max-w-5xl"
            fill="none"
          >
            <rect
              x="20"
              y="44"
              width="24"
              height="24"
              fill="var(--charcoal)"
              fillOpacity="0.7"
            />
            <text
              {...SVG_LABEL}
              x="0"
              y="92"
              fill="var(--charcoal)"
              fillOpacity="0.55"
            >
              ACCURATE TOOLS
            </text>
            {[
              { y: 14, label: "EMPLOYEES" },
              { y: 42, label: "MANAGERS" },
              { y: 70, label: "WORKS COUNCILS" },
              { y: 98, label: "HR PARTNERS" },
            ].map((g) => (
              <g key={g.label}>
                <path
                  d={`M52 56 C 200 56, 260 ${g.y}, 420 ${g.y}`}
                  stroke="var(--crimson)"
                  strokeOpacity="0.5"
                  strokeDasharray="4 5"
                />
                <path
                  d={`M370 ${g.y - 5}l10 10M380 ${g.y - 5}l-10 10`}
                  stroke="var(--crimson)"
                  strokeWidth="1.5"
                />
                <circle
                  cx="432"
                  cy={g.y}
                  r="6"
                  fill="var(--surface)"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.55"
                />
                <text
                  {...SVG_LABEL}
                  x="450"
                  y={g.y + 3}
                  fill="var(--charcoal)"
                  fillOpacity="0.7"
                >
                  {g.label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Adoption improves when organizations explain use cases clearly,
              define limits, train managers, and create credible appeal paths.
            </p>
            <Steps
              items={[
                "explain use cases clearly",
                "define limits",
                "train managers",
                "create credible appeal paths",
              ]}
              cols="md:grid-cols-4"
              className="mt-6 max-w-4xl"
            />
          </div>
        </div>

        <div className="w-full">
          <div className="mt-14 w-full max-w-5xl">
            <Split1
              left="Claims · objective or inevitable"
              right="Visible governance"
              strikeLeft
            />
          </div>
        </div>
        <Verdict>
          Trust is built through visible governance, not through claims that the
          technology is objective or inevitable.
        </Verdict>
      </Slide>

      {/* ==================================================================
          37 · TALENT STRATEGY — the five capabilities in the mix; shared
          fluency joining three groups; AI literacy moved from side project
          to managerial capability.
      ================================================================== */}
      <Slide id="talent-strategy" border align="left">
        <Head1 eyebrow="People and skills">
          Talent Strategy for an AI-Enabled HR Function
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            HR teams need a mix of domain expertise, data literacy, process
            design, change leadership, and legal awareness.
          </p>
          <Steps
            items={[
              "domain expertise",
              "data literacy",
              "process design",
              "change leadership",
              "legal awareness",
            ]}
            cols="sm:grid-cols-3 md:grid-cols-5"
            className="mt-6 max-w-5xl"
          />
        </div>

        <div className="w-full">
          <div className="mt-12 grid w-full max-w-5xl items-center gap-10 border-t border-[var(--charcoal)]/10 pt-8 md:grid-cols-[1fr_24rem] md:gap-14">
            <div>
              <div
                aria-hidden
                className={`${TAG} text-[var(--charcoal-light)]/45 [text-decoration-line:line-through]`}
              >
                hiring a few specialists alone
              </div>
              <p className={`${LEAD} mt-4`}>
                The capability challenge is not hiring a few specialists alone,
                but building shared fluency between HR practitioners, business
                leaders, and technical teams.
              </p>
            </div>
            <svg aria-hidden viewBox="0 0 400 210" className="w-full" fill="none">
              <path
                d="M200 34L60 170H340Z"
                stroke="var(--crimson)"
                strokeWidth="2"
                strokeOpacity="0.8"
              />
              {[
                { x: 200, y: 34 },
                { x: 60, y: 170 },
                { x: 340, y: 170 },
              ].map((p) => (
                <circle
                  key={`${p.x}-${p.y}`}
                  cx={p.x}
                  cy={p.y}
                  r="8"
                  fill="var(--surface)"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.6"
                />
              ))}
              <text
                {...SVG_LABEL}
                x="200"
                y="16"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                HR PRACTITIONERS
              </text>
              <text
                {...SVG_LABEL}
                x="10"
                y="200"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                BUSINESS LEADERS
              </text>
              <text
                {...SVG_LABEL}
                x="390"
                y="200"
                textAnchor="end"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                TECHNICAL TEAMS
              </text>
              <text
                {...SVG_LABEL}
                x="200"
                y="130"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                SHARED FLUENCY
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-14 w-full max-w-5xl">
            <Split1
              left="Side project · small innovation team"
              right="Part of managerial capability"
              strikeLeft
            />
            <p className={`${DISPLAY} mt-6 max-w-4xl`}>
              A mature HR function treats AI literacy as part of managerial
              capability, not as a side project owned by a small innovation
              team.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          38 · STRATEGIC OPERATING MODEL — five functions linked in one chain;
          four prioritization criteria; five common standards spanning every
          HR domain.
      ================================================================== */}
      <Slide id="operating-model" border align="left">
        <Head1 eyebrow="At enterprise scale">
          Strategic Operating Model for Enterprise HR AI
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            The most durable model links business priorities, HR process
            ownership, data governance, legal review, and product management.
          </p>
          <svg
            aria-hidden
            viewBox="0 0 800 84"
            className="mt-7 w-full max-w-5xl"
            fill="none"
          >
            <path d="M80 30H720" stroke="var(--crimson)" strokeWidth="2" />
            {[
              { x: 80, label: "BUSINESS PRIORITIES", y: 62 },
              { x: 240, label: "HR PROCESS OWNERSHIP", y: 78 },
              { x: 400, label: "DATA GOVERNANCE", y: 62 },
              { x: 560, label: "LEGAL REVIEW", y: 78 },
              { x: 720, label: "PRODUCT MANAGEMENT", y: 62 },
            ].map((n) => (
              <g key={n.label}>
                <path
                  d={`M${n.x} 40V${n.y - 12}`}
                  stroke="var(--charcoal)"
                  strokeOpacity="0.2"
                />
                <rect
                  x={n.x - 8}
                  y="22"
                  width="16"
                  height="16"
                  fill="var(--surface)"
                  stroke="var(--crimson)"
                  strokeWidth="2"
                />
                <text
                  {...SVG_LABEL}
                  x={n.x}
                  y={n.y}
                  textAnchor="middle"
                  fill="var(--charcoal)"
                  fillOpacity="0.65"
                >
                  {n.label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Use cases should be prioritized by business value, implementation
              readiness, workforce impact, and governance complexity.
            </p>
            <Steps
              items={[
                "business value",
                "implementation readiness",
                "workforce impact",
                "governance complexity",
              ]}
              cols="md:grid-cols-4"
              className="mt-6 max-w-4xl"
            />
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <div aria-hidden className="max-w-4xl">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                {[
                  "data",
                  "evaluation",
                  "monitoring",
                  "vendor review",
                  "exception handling",
                ].map((p) => (
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
                Common standards · across HR domains
              </div>
            </div>
            <p className={`${DISPLAY} mt-7 max-w-4xl`}>
              Enterprise scale requires common standards for data, evaluation,
              monitoring, vendor review, and exception handling across HR
              domains.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          39 · CONCLUSION — the three things AI should strengthen, then the
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
          04
        </span>

        <Head1 eyebrow="What to carry forward">
          Conclusion: HR as a Strategic Intelligence Function
        </Head1>

        <div className="w-full">
          <ol
            aria-hidden
            className="mt-11 grid w-full max-w-3xl grid-cols-3 gap-y-5"
          >
            {["capability", "fairness", "organizational trust"].map(
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
            "The strongest HR applications combine prediction, automation, and human judgment around clearly owned people decisions.",
            "Competitive advantage comes from using AI to improve talent quality, workforce resilience, and managerial consistency without weakening legitimacy.",
            "The executive task is not to automate HR wholesale, but to decide where intelligent systems strengthen capability, fairness, and organizational trust.",
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
              End of Week 04
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
