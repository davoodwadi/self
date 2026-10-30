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
// WEEK 04: APPLICATIONS OF AI IN HUMAN RESOURCES
// ============================================================================
// Same deck grammar as Weeks 01 to 03: every slide is hand-composed for its own
// argument, with hairlines instead of boxes and crimson marking one thing.
//
// Sentences are transcribed verbatim from content.md. Figures carry only words
// that already appear in the slide's sentences.
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
          01. TITLE: masthead with the five things the subtitle says
          intelligent systems reshape, set in a ruled row.
      ================================================================== */}
      <Slide id="title" align="left" className="relative overflow-hidden">

        <div>
          <div
            className={`${MICRO} flex items-center gap-4 text-[var(--champagne)]`}
          >
            Week 04 in Applications of AI in Business
          </div>
        </div>

        <div>
          <h1 className="mt-4 max-w-4xl font-sans text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.15] tracking-[-0.015em] text-[var(--charcoal)]">
            Applications of AI in{" "}
            Human Resources
          </h1>
        </div>

        <div className="w-full">
          <div className="mt-6 h-px w-full bg-[var(--charcoal)]/15" />
          <p className="mt-6 max-w-3xl font-sans text-lg font-normal leading-relaxed text-[var(--charcoal-light)] md:text-[1.375rem]">
            How intelligent systems reshape talent acquisition, workforce
            planning, development, governance, and employee experience
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
          02. WHY HR BECAME AN AI DOMAIN: the six repeated decisions as a
          ruled row. Five digital traces drawn as dense tick lanes. The
          three improvements AI must bring, bounded by fairness and trust.
                                                        [quiz topic]
      ================================================================== */}
      <Slide id="why-hr-ai" border align="left">
        <Head1>Why HR Became an AI Domain</Head1>

        <div className="w-full">
          <p className={`${BODY} mt-7 max-w-4xl`}>
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
            className="mt-4 max-w-5xl"
          />
        </div>

        <div className="w-full">
          <div className="mt-8 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-6">
            <p className={`${BODY} max-w-4xl`}>
              Digital HR systems now capture recruiting activity, learning
              records, collaboration traces, employee feedback, and workflow
              histories at scale.
            </p>
            <figure className="mt-5 w-full max-w-5xl">
              <svg
                role="img"
                aria-label="Five parallel digital trace streams for recruiting activity, learning records, collaboration traces, employee feedback, and workflow histories captured at scale."
                viewBox="0 0 800 164"
                className="w-full"
                fill="none"
              >
                <title>
                  Five parallel digital trace streams for recruiting activity,
                  learning records, collaboration traces, employee feedback, and
                  workflow histories captured at scale.
                </title>
                {[
                  "RECRUITING ACTIVITY",
                  "LEARNING RECORDS",
                  "COLLABORATION TRACES",
                  "EMPLOYEE FEEDBACK",
                  "WORKFLOW HISTORIES",
                ].map((lane, l) => {
                  const y = 20 + l * 30;
                  return (
                    <g key={lane}>
                      <text
                        {...SVG_LABEL}
                        x="12"
                        y={y + 3}
                        fill="var(--charcoal)"
                        fillOpacity="0.6"
                      >
                        {lane}
                      </text>
                      <path
                        d={`M204 ${y}H688`}
                        stroke="var(--charcoal)"
                        strokeOpacity="0.12"
                      />
                      {Array.from({ length: 62 }).map((_, i) => {
                        const x = +(208 + i * 7.8).toFixed(2);
                        const heights = [3, 7, 4, 9, 2, 6, 8, 3, 5, 9, 4, 7, 3];
                        const h = heights[(i * 3 + l * 5) % heights.length];
                        const active = i >= 52;
                        return (
                          <path
                            key={i}
                            d={`M${x} ${y - h}v${h * 2}`}
                            stroke={active ? "var(--crimson)" : "var(--charcoal)"}
                            strokeOpacity={active ? "0.85" : "0.35"}
                            strokeWidth={active ? "1.25" : "1"}
                          />
                        );
                      })}
                    </g>
                  );
                })}
                <path
                  d="M706 12H714V148H706"
                  stroke="var(--crimson)"
                  strokeWidth="1.5"
                />
                <text
                  {...SVG_LABEL}
                  x="724"
                  y="84"
                  fill="var(--crimson)"
                >
                  AT SCALE
                </text>
              </svg>
            </figure>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-8 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-6">
            <p className={`${DISPLAY} max-w-4xl`}>
              AI matters in HR when it improves judgment quality, operating
              speed, or organizational consistency without weakening fairness
              or trust.
            </p>
            <div
              aria-hidden
              className="mt-5 grid max-w-4xl gap-6 md:grid-cols-[1fr_14rem] md:items-end"
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
                <div className="mt-2 grid grid-cols-2 border-y-2 border-[var(--crimson)]">
                  {["fairness", "trust"].map((b, i) => (
                    <span
                      key={b}
                      className={`${TAG} px-4 py-2.5 text-[var(--charcoal-light)]/70 ${
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
      </Slide>

      {/* ==================================================================
          03. DECISION ARCHITECTURE: strategy fanning out through six
          subfunctions into people decisions. Fragments converted into three
          outputs. Augmentation set against human review.
                                                     [quiz: why-hr-ai]
      ================================================================== */}
      <Slide
        id="decision-architecture"
        border
        align="left"
        quizData={quiz["decision-architecture"]}
      >
        <Head1>
          The HR Function as a Decision Architecture
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            HR connects strategy to people decisions across recruiting,
            workforce design, development, rewards, employee relations, and
            culture.
          </p>
          <svg
            role="img"
            aria-label="HR connecting strategy to people decisions across recruiting, workforce design, development, rewards, employee relations, and culture."
            viewBox="0 0 800 220"
            className="mt-5 w-full max-w-5xl"
            fill="none"
          >
            <title>
              HR connecting strategy to people decisions across recruiting,
              workforce design, development, rewards, employee relations, and
              culture.
            </title>
            <rect
              x="16"
              y="98"
              width="96"
              height="36"
              fill="var(--charcoal)"
              fillOpacity="0.06"
              stroke="var(--charcoal)"
              strokeOpacity="0.55"
            />
            <text
              {...SVG_LABEL}
              x="64"
              y="120"
              textAnchor="middle"
              fill="var(--charcoal)"
              fillOpacity="0.8"
            >
              STRATEGY
            </text>
            <text
              {...SVG_LABEL}
              x="712"
              y="16"
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
              const y = 36 + i * 32;
              return (
                <g key={fn}>
                  <path
                    d={`M112 116 C 176 116, 196 ${y}, 256 ${y}`}
                    stroke="var(--charcoal)"
                    strokeOpacity="0.28"
                  />
                  <rect
                    x="256"
                    y={y - 12}
                    width="216"
                    height="24"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.28"
                  />
                  <text
                    {...SVG_LABEL}
                    x="364"
                    y={y + 3.5}
                    textAnchor="middle"
                    fill="var(--charcoal)"
                    fillOpacity="0.75"
                  >
                    {fn}
                  </text>
                  <path
                    d={`M472 ${y}H704`}
                    stroke="var(--crimson)"
                    strokeOpacity="0.45"
                  />
                  <path
                    d={`M697 ${y - 4}l7 4l-7 4`}
                    stroke="var(--crimson)"
                    strokeOpacity="0.65"
                  />
                  <rect
                    x="706"
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
          <div className="mt-8 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-6">
            <p className={`${BODY} max-w-4xl`}>
              Each subfunction converts fragmented workforce information into
              recommendations, approvals, or interventions.
            </p>
            <svg
              role="img"
              aria-label="Fragmented workforce information converging into a subfunction and converting into recommendations, approvals, or interventions."
              viewBox="0 0 800 116"
              className="mt-5 w-full max-w-5xl"
              fill="none"
            >
              <title>
                Fragmented workforce information converging into a subfunction
                and converting into recommendations, approvals, or
                interventions.
              </title>
              <text
                {...SVG_LABEL}
                x="16"
                y="16"
                fill="var(--charcoal)"
                fillOpacity="0.55"
              >
                FRAGMENTED WORKFORCE INFORMATION
              </text>
              {[
                [24, 28, 28],
                [136, 39, 22],
                [56, 51, 24],
                [148, 62, 26],
                [32, 75, 22],
                [116, 88, 28],
              ].map(([x, y, w], i) => {
                const ty = 48 + i * 5;
                return (
                  <g key={i}>
                    <rect
                      x={x}
                      y={y}
                      width={w}
                      height="6"
                      fill="var(--charcoal)"
                      fillOpacity="0.22"
                      stroke="var(--charcoal)"
                      strokeOpacity="0.45"
                    />
                    <path
                      d={`M${x + w} ${y + 3} C 228 ${y + 3}, 256 ${ty}, 296 ${ty}`}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.22"
                    />
                  </g>
                );
              })}
              <rect
                x="296"
                y="42"
                width="148"
                height="38"
                fill="var(--charcoal)"
                fillOpacity="0.05"
                stroke="var(--charcoal)"
                strokeOpacity="0.55"
              />
              <text
                {...SVG_LABEL}
                x="370"
                y="65.5"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.8"
              >
                SUBFUNCTION
              </text>
              {[
                { y: 28, label: "RECOMMENDATIONS" },
                { y: 62, label: "APPROVALS" },
                { y: 96, label: "INTERVENTIONS" },
              ].map((o) => (
                <g key={o.label}>
                  <path
                    d={`M444 62 C 492 62, 508 ${o.y}, 556 ${o.y}`}
                    stroke="var(--crimson)"
                    strokeOpacity="0.55"
                  />
                  <rect
                    x="556"
                    y={o.y - 5}
                    width="10"
                    height="10"
                    fill="var(--crimson)"
                  />
                  <text
                    {...SVG_LABEL}
                    x="578"
                    y={o.y + 3.5}
                    fill="var(--charcoal)"
                    fillOpacity="0.75"
                  >
                    {o.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-8 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-6">
            <p className={`${DISPLAY} max-w-4xl`}>
              The managerial issue is deciding which judgments can be augmented
              reliably and which require human review because the social cost
              of error is high.
            </p>
            <div className="mt-5 max-w-4xl">
              <Split1
                left="Augmented reliably"
                right="Require human review | social cost of error is high"
              />
            </div>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          04. VALUE CREATION: value, cost and risk as three ruled rows,
          each carrying its own sources of gain.
      ================================================================== */}
      <Slide id="value-creation" border align="left">
        <Head1>
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
                    className={`mt-2 block font-sans text-[2.25rem] font-black leading-none tracking-[-0.03em] ${
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
          06. HR DATA AND SIGNAL QUALITY: seven core inputs as a ruled
          table. One record split across four places. Context set ahead of
          model complexity.
      ================================================================== */}
      <Slide id="hr-data-signal" border align="left">
        <Head1>
          HR Data, Signal Quality, and Context
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-6 max-w-4xl`}>
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
            className="mt-4 max-w-5xl"
          />
        </div>

        <div className="w-full">
          <div className="mt-7 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-5">
            <p className={`${BODY} max-w-4xl`}>
              Useful signals are rarely complete because HR data is fragmented
              across systems, managers, vendors, and informal work practices.
            </p>
            <svg
              role="img"
              aria-label="A six-part workforce record fragmented across systems, managers, vendors, and informal work practices, with missing dashed slots in each source."
              viewBox="0 0 800 108"
              className="mt-5 w-full max-w-5xl"
              fill="none"
            >
              <title>
                A six-part workforce record fragmented across systems, managers,
                vendors, and informal work practices, with missing dashed slots
                in each source.
              </title>
              {[
                { label: "SYSTEMS", x0: 16, have: [0, 1] },
                { label: "MANAGERS", x0: 214, have: [2] },
                { label: "VENDORS", x0: 412, have: [3, 4] },
                { label: "INFORMAL WORK PRACTICES", x0: 610, have: [5] },
              ].map((part) => (
                <g key={part.label}>
                  <path
                    d={`M${part.x0} 18H${part.x0 + 174}`}
                    stroke="var(--charcoal)"
                    strokeOpacity="0.22"
                  />
                  {[0, 1, 2, 3, 4, 5].map((k) => {
                    const bx = part.x0 + k * 29.6;
                    const present = part.have.includes(k);
                    return (
                      <rect
                        key={k}
                        x={bx.toFixed(2)}
                        y="32"
                        width="25"
                        height="22"
                        fill={present ? "var(--crimson)" : "none"}
                        fillOpacity={present ? "0.18" : undefined}
                        stroke={present ? "var(--crimson)" : "var(--charcoal)"}
                        strokeOpacity={present ? "0.85" : "0.25"}
                        strokeDasharray={present ? undefined : "3 3"}
                      />
                    );
                  })}
                  <text
                    {...SVG_LABEL}
                    x={part.x0}
                    y="78"
                    fill="var(--charcoal)"
                    fillOpacity="0.7"
                  >
                    {part.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-7 grid w-full max-w-5xl items-center gap-8 border-t border-[var(--charcoal)]/10 pt-5 md:grid-cols-[1fr_18rem]">
            <p className={DISPLAY}>
              In people decisions, definitions, data lineage, and context often
              matter more than model complexity because labels are noisy and
              outcomes evolve over time.
            </p>
            <div
              aria-hidden
              className="flex flex-wrap items-center gap-x-6 gap-y-2 border-l border-[var(--crimson)]/35 pl-6"
            >
              <div className="space-y-1">
                {["definitions", "data lineage", "context"].map((d) => (
                  <div
                    key={d}
                    className="font-sans text-[0.9375rem] tracking-normal text-[var(--crimson)]"
                  >
                    {d}
                  </div>
                ))}
              </div>
              <span className="font-sans text-3xl font-light text-[var(--charcoal)]/35">
                &gt;
              </span>
              <span className="font-sans text-[0.9375rem] tracking-normal text-[var(--charcoal-light)]/45">
                model complexity
              </span>
            </div>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          07. MATCHING METHOD TO TASK: three method families as ruled rows,
          each with the tasks it supports. Generative systems carry the one
          struck tag.                                       [quiz topic]
      ================================================================== */}
      <Slide id="method-to-task" border align="left">
        <Head1>
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
                  <span className="mt-2 block font-sans text-2xl font-bold leading-tight tracking-[-0.015em] text-[var(--charcoal)]">
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
          08. HUMAN JUDGMENT: one employment decision branching into the
          four things it affects. The three conditions for oversight. The
          three design rules set against automation as the objective.
                                                  [quiz: method-to-task]
      ================================================================== */}
      <Slide
        id="human-judgment"
        border
        align="left"
        quizData={quiz["human-judgment"]}
      >
        <Head1>
          Human Judgment in High-Stakes People Decisions
        </Head1>

        <div className="mt-9 grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1fr_25rem] md:gap-14">
          <div>
            <p className={BODY}>
              Employment decisions affect livelihoods, legal exposure,
              managerial legitimacy, and the credibility of the HR function.
            </p>
          </div>
          <div>
            <svg
              role="img"
              aria-label="Employment decisions branching into livelihoods, legal exposure, managerial legitimacy, and the credibility of the HR function."
              viewBox="0 0 400 144"
              className="w-full"
              fill="none"
            >
              <title>
                Employment decisions branching into livelihoods, legal exposure,
                managerial legitimacy, and the credibility of the HR function.
              </title>
              <rect
                x="8"
                y="48"
                width="104"
                height="48"
                fill="var(--charcoal)"
                fillOpacity="0.05"
                stroke="var(--charcoal)"
                strokeOpacity="0.55"
              />
              <text
                {...SVG_LABEL}
                x="60"
                y="68"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.8"
              >
                EMPLOYMENT
              </text>
              <text
                {...SVG_LABEL}
                x="60"
                y="83"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.8"
              >
                DECISIONS
              </text>
              {[
                { y: 20, label: "LIVELIHOODS" },
                { y: 55, label: "LEGAL EXPOSURE" },
                { y: 90, label: "MANAGERIAL LEGITIMACY" },
                { y: 125, label: "CREDIBILITY OF THE HR FUNCTION" },
              ].map((c) => (
                <g key={c.label}>
                  <path
                    d={`M112 72 C 136 72, 142 ${c.y}, 164 ${c.y}`}
                    stroke="var(--crimson)"
                    strokeOpacity="0.5"
                  />
                  <circle cx="168" cy={c.y} r="4" fill="var(--crimson)" />
                  <text
                    {...SVG_LABEL}
                    x="180"
                    y={c.y + 3.5}
                    fill="var(--charcoal)"
                    fillOpacity="0.75"
                  >
                    {c.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-8 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-6">            <p className={`${BODY} mt-3 max-w-4xl`}>
              Human oversight is most important when evidence is incomplete,
              context is sensitive, or the decision can materially alter a
              person&apos;s trajectory.
            </p>
            <ul
              aria-hidden
              className="mt-5 grid gap-3 font-sans text-[0.9375rem] tracking-normal text-[var(--charcoal-light)]/70 md:grid-cols-3"
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
          <div className="mt-8 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-6">
            <p className={`${DISPLAY} max-w-4xl`}>
              Good system design clarifies escalation, documentation, and
              override rules instead of assuming automation is the objective.
            </p>
            <div
              aria-hidden
              className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-4"
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
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          09. MEASURING SUCCESS: faster processing as one measure among
          five. Three ways an apparent gain turns into later cost.
          Transactional throughput set against enterprise outcomes.
      ================================================================== */}
      <Slide id="measuring-success" border align="left">
        <Head1>
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
          <div className="mt-10 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-6">
            <p className={`${DISPLAY} max-w-4xl`}>
              Executives need metrics that connect HR automation to enterprise
              outcomes rather than only transactional throughput.
            </p>
            <div className="mt-5 max-w-4xl">
              <Split1
                left="Transactional throughput"
                right="Enterprise outcomes"
                strikeLeft
              />
            </div>
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
          11. SOURCING: four talent pools converging on the recruiter.
          A candidate who sits between traditional job titles. More
          applicants set against better access.
      ================================================================== */}
      <Slide id="sourcing" border align="left">
        <Head1>Sourcing and Candidate Discovery</Head1>

        <div className="mt-9 grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1fr_25rem] md:gap-14">
          <div>
            <p className={BODY}>
              AI can help identify likely candidates across internal databases,
              external platforms, alumni networks, and adjacent talent pools.
            </p>
          </div>
          <div>
            <svg
              role="img"
              aria-label="Four sources (internal databases, external platforms, alumni networks, and adjacent talent pools) converging to identify likely candidates."
              viewBox="0 0 400 140"
              className="w-full"
              fill="none"
            >
              <title>
                Four sources (internal databases, external platforms, alumni
                networks, and adjacent talent pools) converging to identify
                likely candidates.
              </title>
              {[
                "INTERNAL DATABASES",
                "EXTERNAL PLATFORMS",
                "ALUMNI NETWORKS",
                "ADJACENT TALENT POOLS",
              ].map((src, i) => {
                const y = 20 + i * 33;
                return (
                  <g key={src}>
                    <rect
                      x="8"
                      y={y - 11}
                      width="176"
                      height="22"
                      stroke="var(--charcoal)"
                      strokeOpacity="0.28"
                    />
                    <text
                      {...SVG_LABEL}
                      x="96"
                      y={y + 3.5}
                      textAnchor="middle"
                      fill="var(--charcoal)"
                      fillOpacity="0.7"
                    >
                      {src}
                    </text>
                    <path
                      d={`M184 ${y} C 224 ${y}, 236 69.5, 268 69.5`}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.28"
                    />
                  </g>
                );
              })}
              <path
                d="M268 69.5H284"
                stroke="var(--crimson)"
                strokeWidth="1.5"
              />
              <path
                d="M277 65.5L284 69.5L277 73.5"
                stroke="var(--crimson)"
                strokeWidth="1.5"
              />
              <rect
                x="286"
                y="45.5"
                width="106"
                height="48"
                fill="var(--crimson)"
                fillOpacity="0.05"
                stroke="var(--crimson)"
                strokeWidth="1.5"
              />
              <text
                {...SVG_LABEL}
                x="339"
                y="66"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                LIKELY
              </text>
              <text
                {...SVG_LABEL}
                x="339"
                y="81"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                CANDIDATES
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-8 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-6">
            <p className={`${BODY} max-w-4xl`}>
              Better discovery expands recruiter reach and helps surface
              candidates whose experience does not map neatly to traditional
              job titles.
            </p>
            <div aria-hidden className="mt-6 max-w-4xl">
              <div className={`${MICRO} text-[var(--charcoal-light)]/55`}>
                Traditional job titles
              </div>
              <div className="relative mt-3 grid grid-cols-4 gap-3">
                {[0, 1, 2, 3].map((k) => (
                  <span
                    key={k}
                    className="block h-11 border border-[var(--charcoal)]/20"
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
          <div className="mt-8 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-6">
            <p className={`${DISPLAY} max-w-4xl`}>
              The strategic gain is not merely more applicants, but better
              access to relevant talent in constrained labor markets.
            </p>
            <div className="mt-5 max-w-4xl">
              <Split1
                left="More applicants"
                right="Better access to relevant talent"
                strikeLeft
              />
            </div>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          12. RESUME SCREENING: a profile compared against four references.
          Three conditions that decide usefulness. Gatekeeper set against
          structured review.                                 [quiz topic]
      ================================================================== */}
      <Slide id="resume-screening" border align="left">
        <Head1>Resume Screening and Candidate Matching</Head1>

        <div className="w-full">
          <p className={`${BODY} mt-7 max-w-4xl`}>
            Matching systems compare applicant profiles to role requirements,
            inferred skills, prior outcomes, and hiring patterns.
          </p>
          <svg
            role="img"
            aria-label="Matching systems comparing applicant profiles to role requirements, inferred skills, prior outcomes, and hiring patterns."
            viewBox="0 0 800 132"
            className="mt-5 w-full max-w-5xl"
            fill="none"
          >
            <title>
              Matching systems comparing applicant profiles to role
              requirements, inferred skills, prior outcomes, and hiring
              patterns.
            </title>
            {/* Applicant profile document on the left */}
            <rect
              x="28"
              y="18"
              width="124"
              height="76"
              fill="var(--charcoal)"
              fillOpacity="0.03"
              stroke="var(--charcoal)"
              strokeOpacity="0.55"
            />
            <path
              d="M44 36H120M44 50H136M44 64H112M44 78H128"
              stroke="var(--charcoal)"
              strokeOpacity="0.4"
              strokeWidth="1.5"
            />
            <text
              {...SVG_LABEL}
              x="90"
              y="114"
              textAnchor="middle"
              fill="var(--charcoal)"
              fillOpacity="0.65"
            >
              APPLICANT PROFILES
            </text>

            {/* Connector into Matching Systems / Compare */}
            <path
              d="M152 56H248"
              stroke="var(--crimson)"
              strokeWidth="1.5"
            />
            <path
              d="M241 52L248 56L241 60"
              stroke="var(--crimson)"
              strokeWidth="1.5"
            />

            {/* Central comparator */}
            <rect
              x="250"
              y="34"
              width="148"
              height="44"
              fill="var(--crimson)"
              fillOpacity="0.05"
              stroke="var(--crimson)"
              strokeWidth="1.5"
            />
            <text
              {...SVG_LABEL}
              x="324"
              y="53"
              textAnchor="middle"
              fill="var(--crimson)"
            >
              MATCHING SYSTEMS
            </text>
            <text
              {...SVG_LABEL}
              x="324"
              y="68"
              textAnchor="middle"
              fill="var(--crimson)"
            >
              COMPARE
            </text>

            {/* Four reference criteria on the right */}
            {[
              { y: 20, label: "ROLE REQUIREMENTS", bar: 82 },
              { y: 48, label: "INFERRED SKILLS", bar: 68 },
              { y: 76, label: "PRIOR OUTCOMES", bar: 74 },
              { y: 104, label: "HIRING PATTERNS", bar: 58 },
            ].map((r) => (
              <g key={r.label}>
                <path
                  d={`M398 56 C 444 56, 460 ${r.y}, 504 ${r.y}`}
                  stroke="var(--crimson)"
                  strokeOpacity="0.45"
                />
                <rect
                  x="504"
                  y={r.y - 10}
                  width="268"
                  height="20"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.24"
                />
                <rect
                  x="504"
                  y={r.y - 10}
                  width="6"
                  height="20"
                  fill="var(--crimson)"
                />
                <text
                  {...SVG_LABEL}
                  x="522"
                  y={r.y + 3.5}
                  fill="var(--charcoal)"
                  fillOpacity="0.75"
                >
                  {r.label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="w-full">
          <div className="mt-8 grid w-full max-w-5xl items-center gap-8 border-t border-[var(--charcoal)]/10 pt-6 md:grid-cols-[1fr_20rem] md:gap-12">
            <div className="border border-[var(--crimson)]/45 p-6 md:p-7">              <p className={`${LEAD} mt-3`}>
                Their usefulness depends on whether job requirements are
                current, outcome labels are reliable, and the model is not
                simply replicating historical preference.
              </p>
            </div>
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
                  <span className="font-sans text-lg text-[var(--crimson)]">
                    ?
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-8 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-6">
            <p className={`${DISPLAY} max-w-4xl`}>
              Screening tools should support prioritization and structured
              review rather than serving as hidden gatekeepers.
            </p>
            <div className="mt-5 max-w-4xl">
              <Split1
                left="Hidden gatekeepers"
                right="Prioritization and structured review"
                strikeLeft
              />
            </div>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          13. INTERVIEW INTELLIGENCE: three supports. Scattered ratings
          pulled into agreement by structure. Evidence set against fluency,
          confidence and polish.               [quiz: resume-screening]
      ================================================================== */}
      <Slide
        id="interview-intelligence"
        border
        align="left"
        quizData={quiz["interview-intelligence"]}
      >
        <Head1>
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
          <div className="mt-8 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-6">
            <p className={`${BODY} max-w-4xl`}>
              Structured evaluation is often more valuable than prediction
              alone because it reduces noise across interviewers and hiring
              teams.
            </p>
            <figure className="mt-5 max-w-4xl">
              <svg
                role="img"
                aria-label="Two panels comparing wide rating noise across interviewers with tightly aligned structured evaluation."
                viewBox="0 0 800 144"
                className="w-full"
                fill="none"
              >
                <title>
                  Two panels comparing wide rating noise across interviewers
                  with tightly aligned structured evaluation.
                </title>
                {[
                  { x0: 32, label: "NOISE ACROSS INTERVIEWERS", spread: 1 },
                  { x0: 448, label: "STRUCTURED EVALUATION", spread: 0 },
                ].map((panel) => {
                  const offsets = [-110, 60, -40, 120];
                  const xs = [0, 1, 2, 3].map(
                    (row) =>
                      panel.x0 +
                      160 +
                      (panel.spread ? offsets[row] : row % 2 ? 6 : -6),
                  );
                  const minX = Math.min(...xs);
                  const maxX = Math.max(...xs);
                  return (
                    <g key={panel.label}>
                      <text
                        {...SVG_LABEL}
                        x={panel.x0}
                        y="18"
                        fill={
                          panel.spread ? "var(--charcoal)" : "var(--crimson)"
                        }
                        fillOpacity={panel.spread ? 0.6 : 1}
                      >
                        {panel.label}
                      </text>
                      <rect
                        x={minX}
                        y="32"
                        width={maxX - minX}
                        height="90"
                        fill={
                          panel.spread ? "var(--charcoal)" : "var(--crimson)"
                        }
                        fillOpacity={panel.spread ? 0.04 : 0.08}
                      />
                      {[0, 1, 2, 3].map((row) => {
                        const y = 42 + row * 24;
                        const cx = xs[row];
                        return (
                          <g key={row}>
                            <path
                              d={`M${panel.x0} ${y}H${panel.x0 + 320}`}
                              stroke="var(--charcoal)"
                              strokeOpacity="0.14"
                            />
                            <circle
                              cx={cx}
                              cy={y}
                              r="5"
                              fill={
                                panel.spread
                                  ? "var(--charcoal)"
                                  : "var(--crimson)"
                              }
                              fillOpacity={panel.spread ? 0.5 : 1}
                            />
                          </g>
                        );
                      })}
                      <path
                        d={`M${minX} 126V132H${maxX}V126`}
                        stroke={
                          panel.spread ? "var(--charcoal)" : "var(--crimson)"
                        }
                        strokeOpacity={panel.spread ? 0.35 : 0.85}
                      />
                    </g>
                  );
                })}
                <path
                  d="M400 20V132"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.14"
                />
              </svg>
            </figure>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-8 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-6">
            <p className={`${DISPLAY} max-w-4xl`}>
              Systems should reinforce evidence-based assessment rather than
              reward fluency, confidence, or résumé polish unrelated to job
              performance.
            </p>
            <div
              aria-hidden
              className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3"
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
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          14. CANDIDATE EXPERIENCE: four recruiting tasks. Candidate
          experience fanning out to three outcomes. Uncertainty set against
          accountability.
      ================================================================== */}
      <Slide id="candidate-experience" border align="left">
        <Head1>
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
          <div className="mt-8 grid w-full max-w-5xl items-center gap-10 border-t border-[var(--charcoal)]/10 pt-6 md:grid-cols-[1fr_25rem] md:gap-14">
            <p className={LEAD}>
              Operational improvements matter because candidate experience
              affects acceptance rates, employer brand, and recruiter
              productivity.
            </p>
            <svg
              role="img"
              aria-label="Candidate experience branching to affect acceptance rates, employer brand, and recruiter productivity."
              viewBox="0 0 400 120"
              className="w-full"
              fill="none"
            >
              <title>
                Candidate experience branching to affect acceptance rates,
                employer brand, and recruiter productivity.
              </title>
              <rect
                x="8"
                y="36"
                width="108"
                height="48"
                fill="var(--crimson)"
                fillOpacity="0.05"
                stroke="var(--crimson)"
                strokeWidth="1.5"
              />
              <text
                {...SVG_LABEL}
                x="62"
                y="56"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                CANDIDATE
              </text>
              <text
                {...SVG_LABEL}
                x="62"
                y="71"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                EXPERIENCE
              </text>
              {[
                { y: 22, label: "ACCEPTANCE RATES" },
                { y: 60, label: "EMPLOYER BRAND" },
                { y: 98, label: "RECRUITER PRODUCTIVITY" },
              ].map((n) => (
                <g key={n.label}>
                  <path
                    d={`M116 60 C 146 60, 154 ${n.y}, 182 ${n.y}`}
                    stroke="var(--crimson)"
                    strokeOpacity="0.5"
                  />
                  <circle
                    cx="188"
                    cy={n.y}
                    r="5"
                    fill="var(--surface)"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.6"
                  />
                  <text
                    {...SVG_LABEL}
                    x="202"
                    y={n.y + 3.5}
                    fill="var(--charcoal)"
                    fillOpacity="0.75"
                  >
                    {n.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-8 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-6">
            <p className={`${DISPLAY} max-w-4xl`}>
              Automation should reduce uncertainty for candidates, not increase
              the sense that nobody is accountable for the process.
            </p>
            <div className="mt-5 max-w-4xl">
              <Split1
                left="Nobody is accountable"
                right="Reduce uncertainty for candidates"
                strikeLeft
              />
            </div>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          15. FAIRNESS AND HIRING GOVERNANCE: the three gates a hiring model
          influences. What governance tests for. Model logic from the vendor,
          employment risk kept by the employer.              [quiz topic]
      ================================================================== */}
      <Slide id="fairness-hiring" border align="left">
        <Head1>
          Fairness, Adverse Impact, and Hiring Governance
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-6 max-w-4xl`}>
            Hiring models require scrutiny because they influence who gets
            seen, who advances, and which qualifications are treated as signals
            of merit.
          </p>
          <svg
            role="img"
            aria-label="Hiring funnel narrowing from sixteen candidates who get seen, to eight who advance, to three treated as signals of merit."
            viewBox="0 0 800 108"
            className="mt-4 w-full max-w-5xl"
            fill="none"
          >
            <title>
              Hiring funnel narrowing from sixteen candidates who get seen, to
              eight who advance, to three treated as signals of merit.
            </title>
            {[
              { label: "WHO GETS SEEN", y: 22, n: 16, mark: false },
              { label: "WHO ADVANCES", y: 54, n: 8, mark: false },
              { label: "SIGNALS OF MERIT", y: 86, n: 3, mark: true },
            ].map((stage) => (
              <g key={stage.label}>
                <text
                  {...SVG_LABEL}
                  x="16"
                  y={stage.y + 3.5}
                  fill={stage.mark ? "var(--crimson)" : "var(--charcoal)"}
                  fillOpacity={stage.mark ? 1 : 0.65}
                >
                  {stage.label}
                </text>
                <path
                  d={`M184 ${stage.y - 10}V${stage.y + 10}`}
                  stroke="var(--charcoal)"
                  strokeOpacity="0.22"
                />
                {Array.from({ length: stage.n }).map((_, k) => (
                  <circle
                    key={k}
                    cx={210 + k * 24}
                    cy={stage.y}
                    r="6"
                    fill={stage.mark ? "var(--crimson)" : "var(--charcoal)"}
                    fillOpacity={stage.mark ? 0.9 : 0.32}
                  />
                ))}
              </g>
            ))}
          </svg>
        </div>

        <div className="mt-6 grid w-full max-w-5xl gap-8 border-t border-[var(--charcoal)]/10 pt-5 md:grid-cols-2 md:gap-12">
          <div>
            <p className={BODY}>
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
              className="mt-4"
            />
          </div>
          <div className="md:border-l md:border-[var(--charcoal)]/12 md:pl-12">
            <p className={BODY}>
              Clear documentation is essential when vendors supply the model
              logic but the employer carries the employment risk.
            </p>
            <div aria-hidden className="mt-4 space-y-2.5">
              <div className="grid grid-cols-[6.5rem_1fr] items-center gap-3">
                <span className={`${MICRO} text-[var(--charcoal-light)]/55`}>
                  Vendors
                </span>
                <span className="flex items-center gap-3">
                  <span className="h-px flex-1 bg-[var(--charcoal)]/30" />
                  <span className="text-[var(--charcoal)]/40">→</span>
                  <span
                    className={`${TAG} border border-[var(--charcoal)]/15 px-3 py-1.5 text-[var(--charcoal-light)]/60`}
                  >
                    model logic
                  </span>
                </span>
              </div>
              <div className="grid grid-cols-[6.5rem_1fr] items-center gap-3">
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
          </div>
        </div>

        <Discussion1>
          Should an employer accept a materially faster recruiting process if the scoring logic remains only partially explainable to candidates, managers, and legal reviewers?
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
          17. WORKFORCE DEMAND FORECASTING: two inputs combining into four
          estimates. Four things a good model reflects. A forecast knocked
          off course by three shocks.
      ================================================================== */}
      <Slide id="workforce-forecasting" border align="left">
        <Head1>Workforce Demand Forecasting</Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            AI can estimate hiring needs, overtime pressure, capacity gaps, and
            role demand by combining business forecasts with historical labor
            patterns.
          </p>
          <svg
            role="img"
            aria-label="Business forecasts and historical labor patterns combining to estimate hiring needs, overtime pressure, capacity gaps, and role demand."
            viewBox="0 0 800 136"
            className="mt-5 w-full max-w-5xl"
            fill="none"
          >
            <title>
              Business forecasts and historical labor patterns combining to
              estimate hiring needs, overtime pressure, capacity gaps, and role
              demand.
            </title>
            {[
              { y: 40, label: "BUSINESS FORECASTS" },
              { y: 96, label: "HISTORICAL LABOR PATTERNS" },
            ].map((src) => (
              <g key={src.label}>
                <rect
                  x="16"
                  y={src.y - 14}
                  width="216"
                  height="28"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.28"
                />
                <text
                  {...SVG_LABEL}
                  x="124"
                  y={src.y + 3.5}
                  textAnchor="middle"
                  fill="var(--charcoal)"
                  fillOpacity="0.7"
                >
                  {src.label}
                </text>
                <path
                  d={`M232 ${src.y} C 290 ${src.y}, 306 68, 351 68`}
                  stroke="var(--charcoal)"
                  strokeOpacity="0.3"
                />
              </g>
            ))}
            <circle cx="358" cy="68" r="7" fill="var(--crimson)" />
            {[
              { y: 18, label: "HIRING NEEDS" },
              { y: 52, label: "OVERTIME PRESSURE" },
              { y: 86, label: "CAPACITY GAPS" },
              { y: 120, label: "ROLE DEMAND" },
            ].map((o) => (
              <g key={o.label}>
                <path
                  d={`M365 68 C 430 68, 442 ${o.y}, 500 ${o.y}`}
                  stroke="var(--crimson)"
                  strokeOpacity="0.5"
                />
                <rect
                  x="500"
                  y={o.y - 5}
                  width="10"
                  height="10"
                  fill="var(--crimson)"
                />
                <text
                  {...SVG_LABEL}
                  x="522"
                  y={o.y + 3.5}
                  fill="var(--charcoal)"
                  fillOpacity="0.75"
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
          <div className="mt-8 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-6">
            <p className={`${DISPLAY} max-w-4xl`}>
              Leaders should treat workforce forecasts as decision support
              because restructuring, policy shifts, and macro shocks can quickly
              change the picture.
            </p>
            <figure className="mt-5 w-full">
              <svg
                role="img"
                aria-label="Dashed workforce forecasts baseline disrupted at three vertical shock markers for restructuring, policy shifts, and macro shocks."
                viewBox="0 0 800 132"
                className="w-full"
                fill="none"
              >
                <title>
                  Dashed workforce forecasts baseline disrupted at three
                  vertical shock markers for restructuring, policy shifts, and
                  macro shocks.
                </title>
                <path
                  d="M20 70 C 120 60, 180 78, 260 66 S 420 58, 520 64 S 700 60, 780 62"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.45"
                  strokeDasharray="4 4"
                  strokeWidth="1.5"
                />
                <path
                  d="M20 70 C 120 60, 180 78, 240 68 V 34 C 296 40, 336 30, 410 36 V 92 C 476 96, 540 84, 610 90 V 20 C 676 26, 730 16, 780 22"
                  stroke="var(--crimson)"
                  strokeWidth="1.75"
                />
                {[
                  { x: 240, cy: 34, label: "RESTRUCTURING" },
                  { x: 410, cy: 92, label: "POLICY SHIFTS" },
                  { x: 610, cy: 20, label: "MACRO SHOCKS" },
                ].map((s) => (
                  <g key={s.label}>
                    <path
                      d={`M${s.x} 10V104`}
                      stroke="var(--crimson)"
                      strokeOpacity="0.28"
                      strokeDasharray="3 3"
                    />
                    <circle cx={s.x} cy={s.cy} r="4" fill="var(--crimson)" />
                    <text
                      {...SVG_LABEL}
                      x={s.x}
                      y="120"
                      textAnchor="middle"
                      fill="var(--crimson)"
                    >
                      {s.label}
                    </text>
                  </g>
                ))}
                <text
                  {...SVG_LABEL}
                  x="780"
                  y="82"
                  textAnchor="end"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  WORKFORCE FORECASTS
                </text>
              </svg>
            </figure>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          18. SKILLS GRAPHS: five kinds of evidence joined into one view of
          capability. Three strategic opportunities. The three conditions for
          trust.                                             [quiz topic]
      ================================================================== */}
      <Slide id="skills-graphs" border align="left">
        <Head1>
          Skills Graphs and the Internal Labor Market
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-7 max-w-4xl`}>
            Skills inference systems connect roles, experiences, credentials,
            projects, and learning history into a dynamic view of
            organizational capability.
          </p>
          <svg
            role="img"
            aria-label="Skills inference graph connecting roles, experiences, credentials, projects, and learning history into a central view of organizational capability."
            viewBox="0 0 800 184"
            className="mt-5 w-full max-w-4xl"
            fill="none"
          >
            <title>
              Skills inference graph connecting roles, experiences, credentials,
              projects, and learning history into a central view of
              organizational capability.
            </title>
            {(() => {
              const nodes = [
                { x: 140, y: 34, label: "ROLES", ly: 17, hx: 304, hy: 86 },
                { x: 400, y: 34, label: "CREDENTIALS", ly: 17, hx: 400, hy: 76 },
                { x: 660, y: 34, label: "LEARNING HISTORY", ly: 17, hx: 496, hy: 86 },
                { x: 560, y: 150, label: "PROJECTS", ly: 172, hx: 496, hy: 102 },
                { x: 240, y: 150, label: "EXPERIENCES", ly: 172, hx: 304, hy: 102 },
              ];
              const ring = [
                [0, 1],
                [1, 2],
                [2, 3],
                [3, 4],
                [4, 0],
              ];
              return (
                <>
                  {ring.map(([a, b]) => (
                    <path
                      key={`${a}-${b}`}
                      d={`M${nodes[a].x} ${nodes[a].y}L${nodes[b].x} ${nodes[b].y}`}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.2"
                    />
                  ))}
                  {nodes.map((n) => (
                    <path
                      key={`spoke-${n.label}`}
                      d={`M${n.x} ${n.y}L${n.hx} ${n.hy}`}
                      stroke="var(--crimson)"
                      strokeOpacity="0.45"
                    />
                  ))}
                  <rect
                    x="304"
                    y="76"
                    width="192"
                    height="36"
                    fill="var(--crimson)"
                    fillOpacity="0.05"
                    stroke="var(--crimson)"
                    strokeWidth="1.5"
                  />
                  <text
                    {...SVG_LABEL}
                    x="400"
                    y="97.5"
                    textAnchor="middle"
                    fill="var(--crimson)"
                  >
                    ORGANIZATIONAL CAPABILITY
                  </text>
                  {nodes.map((n) => (
                    <g key={n.label}>
                      <circle
                        cx={n.x}
                        cy={n.y}
                        r="7"
                        fill="var(--surface)"
                        stroke="var(--charcoal)"
                        strokeOpacity="0.65"
                        strokeWidth="1.25"
                      />
                      <text
                        {...SVG_LABEL}
                        x={n.x}
                        y={n.ly}
                        textAnchor="middle"
                        fill="var(--charcoal)"
                        fillOpacity="0.7"
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

        <div className="mt-5 grid w-full max-w-5xl gap-8 border-t border-[var(--charcoal)]/10 pt-5 md:grid-cols-2 md:gap-12">
          <div>
            <p className={BODY}>
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
              className="mt-4"
            />
          </div>

          <div className="md:border-l md:border-[var(--charcoal)]/12 md:pl-12">
            <p className={BODY}>
              Skills systems are only useful when employees and managers trust
              that inferred skills are current, relevant, and not silently
              punitive.
            </p>
            <div className={`${MICRO} mt-4 text-[var(--crimson)]`}>
              Trust that inferred skills are
            </div>
            <ul
              aria-hidden
              className="mt-2.5 grid gap-3 font-sans text-[0.9375rem] tracking-normal text-[var(--charcoal-light)]/70 sm:grid-cols-3"
            >
              {["current", "relevant", "not silently punitive"].map((c) => (
                <li
                  key={c}
                  className="flex items-start gap-2.5 border-t border-[var(--charcoal)]/12 pt-2"
                >
                  <span className="mt-[3px] h-2.5 w-2.5 shrink-0 bg-[var(--crimson)]" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Discussion1>
          Should firms rely on inferred skills data to shape promotion and mobility opportunities when many high-value capabilities are still informal, relational, or poorly documented?
        </Discussion1>
      </Slide>

      {/* ==================================================================
          19. SCHEDULING AND STAFFING: staffing steps traced against service
          demand. Labor supply matched to customer volume. The four limits an
          optimizer must respect.                  [quiz: skills-graphs]
      ================================================================== */}
      <Slide
        id="scheduling-staffing"
        border
        align="left"
        quizData={quiz["scheduling-staffing"]}
      >
        <Head1>
          Scheduling, Staffing, and Frontline Allocation
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            In labor-intensive settings, AI can optimize schedules, shift
            coverage, location staffing, and contingency plans against service
            demand.
          </p>
          <figure className="mt-6 w-full max-w-5xl">
            <svg
              role="img"
              aria-label="Stepped shift coverage blocks tracking a continuous service demand curve across the day."
              viewBox="0 0 800 132"
              className="w-full"
              fill="none"
            >
              <title>
                Stepped shift coverage blocks tracking a continuous service
                demand curve across the day.
              </title>
              <path
                d="M20 94H110V52H160V32H250V58H320V74H400V44H460V24H600V56H680V84H780V110H20Z"
                fill="var(--crimson)"
                fillOpacity="0.05"
              />
              <path
                d="M20 110H780"
                stroke="var(--charcoal)"
                strokeOpacity="0.25"
              />
              <path
                d="M20 96 C 90 90, 130 40, 200 36 S 300 80, 360 76 S 470 20, 560 26 S 700 88, 780 92"
                stroke="var(--charcoal)"
                strokeOpacity="0.55"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <path
                d="M20 94H110V52H160V32H250V58H320V74H400V44H460V24H600V56H680V84H780"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <text
                {...SVG_LABEL}
                x="360"
                y="96"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                SERVICE DEMAND
              </text>
              <text
                {...SVG_LABEL}
                x="530"
                y="16"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                SHIFT COVERAGE
              </text>
            </svg>
          </figure>
        </div>

        <div className="w-full">
          <div className="mt-8 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-6">
            <p className={`${BODY} max-w-4xl`}>
              Operational gains come from matching labor supply to customer
              volume while reducing understaffing, overtime, and avoidable
              churn.
            </p>
            <div
              aria-hidden
              className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3"
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
          <div className="mt-8 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-6">
            <p className={`${LEAD} max-w-4xl`}>
              Optimization should respect legal constraints, fatigue, fairness,
              and employee autonomy rather than treating labor as a purely
              mathematical input.
            </p>
            <div
              aria-hidden
              className="mt-5 grid max-w-4xl gap-6 md:grid-cols-[14rem_1fr] md:items-end"
            >
              <div>
                <div className={`${MICRO} text-[var(--charcoal-light)]/55`}>
                  Not
                </div>
                <div
                  className={`${TAG} mt-2 border border-[var(--charcoal)]/15 px-4 py-2.5 text-[var(--charcoal-light)]/45 [text-decoration-line:line-through]`}
                >
                  purely mathematical input
                </div>
              </div>
              <div>
                <div className={`${MICRO} text-[var(--crimson)]`}>Respect</div>
                <div className="mt-2 grid grid-cols-2 border-y-2 border-[var(--crimson)] sm:grid-cols-4">
                  {[
                    "legal constraints",
                    "fatigue",
                    "fairness",
                    "employee autonomy",
                  ].map((b, i) => (
                    <span
                      key={b}
                      className={`${TAG} px-4 py-2.5 text-[var(--charcoal-light)]/70 ${
                        i > 0 ? "sm:border-l sm:border-[var(--crimson)]/30" : ""
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
      </Slide>

      {/* ==================================================================
          20. ATTRITION RISK: the model's flag arriving before turnover is
          visible to managers. What an intervention can change. The three
          tests for a legitimate action.
      ================================================================== */}
      <Slide id="attrition-risk" border align="left">
        <Head1>Attrition Risk and Retention Intervention</Head1>

        <div className="w-full">
          <p className={`${BODY} mt-7 max-w-4xl`}>
            Retention models aim to identify employees or segments with
            elevated exit risk before turnover becomes visible in manager
            reporting.
          </p>
          <svg
            role="img"
            aria-label="Timeline showing retention models identifying elevated exit risk well before turnover becomes visible in manager reporting."
            viewBox="0 0 800 112"
            className="mt-5 w-full max-w-5xl"
            fill="none"
          >
            <title>
              Timeline showing retention models identifying elevated exit risk
              well before turnover becomes visible in manager reporting.
            </title>
            {/* Shaded lead-time window between model flag and manager reporting */}
            <path
              d="M260 48 C 380 34, 520 30, 640 26 V 78 H 260 Z"
              fill="var(--crimson)"
              fillOpacity="0.06"
            />
            {/* Time axis */}
            <path
              d="M24 78H776"
              stroke="var(--charcoal)"
              strokeOpacity="0.25"
            />
            <path
              d="M768 74L776 78L768 82"
              stroke="var(--charcoal)"
              strokeOpacity="0.45"
            />
            {/* Rising exit-risk trajectory */}
            <path
              d="M32 72 C 130 70, 200 56, 260 48 C 380 34, 520 30, 640 26 L 756 24"
              stroke="var(--crimson)"
              strokeWidth="1.75"
            />
            {/* Early flag: Elevated Exit Risk */}
            <path
              d="M260 26V78"
              stroke="var(--crimson)"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
            <circle cx="260" cy="48" r="6" fill="var(--crimson)" />
            <text
              {...SVG_LABEL}
              x="260"
              y="17"
              textAnchor="middle"
              fill="var(--crimson)"
            >
              ELEVATED EXIT RISK
            </text>
            {/* Late threshold: Visible in Manager Reporting */}
            <path
              d="M640 20V84"
              stroke="var(--charcoal)"
              strokeOpacity="0.65"
              strokeWidth="2"
            />
            <circle
              cx="640"
              cy="26"
              r="5"
              fill="var(--surface)"
              stroke="var(--charcoal)"
              strokeOpacity="0.75"
              strokeWidth="1.5"
            />
            <text
              {...SVG_LABEL}
              x="640"
              y="100"
              textAnchor="middle"
              fill="var(--charcoal)"
              fillOpacity="0.65"
            >
              VISIBLE IN MANAGER REPORTING
            </text>
          </svg>
        </div>

        <div className="mt-5 grid w-full max-w-5xl gap-8 border-t border-[var(--charcoal)]/10 pt-5 md:grid-cols-2 md:gap-12">
          <div>
            <p className={BODY}>
              High-performing systems still require care because the
              intervention may change behavior, expectations, or employee trust.
            </p>
            <div
              aria-hidden
              className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2.5"
            >
              <span
                className={`${TAG} bg-[var(--crimson)] px-3 py-1.5 text-[var(--surface)]`}
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

          <div className="md:border-l md:border-[var(--charcoal)]/12 md:pl-12">
            <p className={BODY}>
              The relevant question is not only who may leave, but which
              actions are legitimate, effective, and ethically defensible.
            </p>
            <div className="mt-4">
              <Split1 left="Who may leave" right="Which actions" />
              <Steps
                items={["legitimate", "effective", "ethically defensible"]}
                cols="grid-cols-3"
                className="mt-3"
              />
            </div>
          </div>
        </div>

        <Discussion1>
          When does predictive retention become a strategic advantage, and when does it become an intrusive practice that changes the employment relationship for the worse?
        </Discussion1>
      </Slide>

      {/* ==================================================================
          21. ORGANIZATIONAL NETWORK ANALYSIS: two teams joined through one
          overloaded connector, an isolated team and a hidden dependency.
          Four uses. Visibility tipping into surveillance.
      ================================================================== */}
      <Slide id="network-analysis" border align="left">
        <Head1>
          Organizational Network Analysis and Collaboration Patterns
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-7 max-w-4xl`}>
            Digital collaboration traces can reveal bottlenecks, overloaded
            connectors, isolated teams, and hidden dependencies across the
            organization.
          </p>
          <svg
            role="img"
            aria-label="Organizational network showing two team clusters funneled through one overloaded connector hub, a dashed hidden dependency arc below, and an isolated team cluster on the right."
            viewBox="0 0 800 196"
            className="mt-5 w-full max-w-5xl"
            fill="none"
          >
            <title>
              Organizational network showing two team clusters funneled through
              one overloaded connector hub, a dashed hidden dependency arc
              below, and an isolated team cluster on the right.
            </title>
            {(() => {
              const left = [
                [140, 32],
                [68, 56],
                [168, 78],
                [68, 104],
                [148, 130],
              ];
              const right = [
                [500, 32],
                [572, 56],
                [472, 78],
                [572, 104],
                [492, 130],
              ];
              const isolated = [
                [692, 122],
                [752, 122],
                [722, 164],
              ];
              const hub = [320, 90];
              const clusterEdges = [
                [0, 1],
                [1, 3],
                [3, 4],
                [4, 2],
                [2, 0],
                [1, 2],
                [2, 3],
              ];
              return (
                <>
                  {clusterEdges.map(([a, b], i) => (
                    <React.Fragment key={`ce-${i}`}>
                      <path
                        d={`M${left[a][0]} ${left[a][1]}L${left[b][0]} ${left[b][1]}`}
                        stroke="var(--charcoal)"
                        strokeOpacity="0.18"
                      />
                      <path
                        d={`M${right[a][0]} ${right[a][1]}L${right[b][0]} ${right[b][1]}`}
                        stroke="var(--charcoal)"
                        strokeOpacity="0.18"
                      />
                    </React.Fragment>
                  ))}
                  {[
                    [0, 1],
                    [1, 2],
                    [2, 0],
                  ].map(([a, b], i) => (
                    <path
                      key={`iso-${i}`}
                      d={`M${isolated[a][0]} ${isolated[a][1]}L${isolated[b][0]} ${isolated[b][1]}`}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.22"
                    />
                  ))}
                  {[...left, ...right].map(([x, y], i) => (
                    <path
                      key={`h-${i}`}
                      d={`M${hub[0]} ${hub[1]}L${x} ${y}`}
                      stroke="var(--crimson)"
                      strokeOpacity="0.4"
                    />
                  ))}
                  <path
                    d="M148 130 C 236 178, 404 178, 492 130"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.5"
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
                      strokeOpacity="0.6"
                      strokeWidth="1.25"
                    />
                  ))}
                  <circle cx={hub[0]} cy={hub[1]} r="11" fill="var(--crimson)" />
                  <text
                    {...SVG_LABEL}
                    x={hub[0]}
                    y="38"
                    textAnchor="middle"
                    fill="var(--crimson)"
                  >
                    OVERLOADED CONNECTORS
                  </text>
                  <text
                    {...SVG_LABEL}
                    x={hub[0]}
                    y="184"
                    textAnchor="middle"
                    fill="var(--charcoal)"
                    fillOpacity="0.6"
                  >
                    HIDDEN DEPENDENCIES
                  </text>
                  <text
                    {...SVG_LABEL}
                    x="722"
                    y="102"
                    textAnchor="middle"
                    fill="var(--charcoal)"
                    fillOpacity="0.6"
                  >
                    ISOLATED TEAMS
                  </text>
                </>
              );
            })()}
          </svg>
        </div>

        <div className="w-full">
          <div className="mt-8 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-6">
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
              className="mt-5 max-w-4xl"
            />
          </div>
        </div>

        <div className="w-full">
          <div className="mt-8 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-6">
            <p className={`${DISPLAY} max-w-4xl`}>
              Network analytics must be handled carefully because behavioral
              visibility can quickly be perceived as surveillance if governance
              is weak.
            </p>
            <div className="mt-5 max-w-4xl">
              <Split1
                left="Behavioral visibility"
                right="Perceived as surveillance"
              />
            </div>
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
          23. PERSONALIZED LEARNING: four inputs shaping one pathway. A
          flood of suggestions set against a relevant few. Development
          carried through to real opportunities.
      ================================================================== */}
      <Slide id="personalized-learning" border align="left">
        <Head1>
          Personalized Learning and Capability Building
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-7 max-w-4xl`}>
            AI can recommend learning pathways based on role requirements,
            career goals, adjacent skills, and current performance gaps.
          </p>
          <svg
            role="img"
            aria-label="Role requirements, career goals, adjacent skills, and current performance gaps converging into a stepped progression of learning pathways."
            viewBox="0 0 800 132"
            className="mt-5 w-full max-w-5xl"
            fill="none"
          >
            <title>
              Role requirements, career goals, adjacent skills, and current
              performance gaps converging into a stepped progression of learning
              pathways.
            </title>
            {[
              "ROLE REQUIREMENTS",
              "CAREER GOALS",
              "ADJACENT SKILLS",
              "CURRENT PERFORMANCE GAPS",
            ].map((src, i) => {
              const y = 20 + i * 30;
              return (
                <g key={src}>
                  <rect
                    x="16"
                    y={y - 11}
                    width="224"
                    height="22"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.28"
                  />
                  <text
                    {...SVG_LABEL}
                    x="128"
                    y={y + 3.5}
                    textAnchor="middle"
                    fill="var(--charcoal)"
                    fillOpacity="0.7"
                  >
                    {src}
                  </text>
                  <path
                    d={`M240 ${y} C 296 ${y}, 312 80, 356 80`}
                    stroke="var(--charcoal)"
                    strokeOpacity="0.28"
                  />
                </g>
              );
            })}
            <path
              d="M356 80H444V60H544V40H644V22H752"
              stroke="var(--crimson)"
              strokeWidth="2"
            />
            {[
              [444, 60],
              [544, 40],
              [644, 22],
            ].map(([x, y]) => (
              <circle key={x} cx={x} cy={y} r="4.5" fill="var(--crimson)" />
            ))}
            <path
              d="M744 17l9 5l-9 5"
              stroke="var(--crimson)"
              strokeWidth="2"
            />
            <text
              {...SVG_LABEL}
              x="560"
              y="108"
              textAnchor="middle"
              fill="var(--crimson)"
            >
              LEARNING PATHWAYS
            </text>
          </svg>
        </div>

        <div className="w-full">
          <div className="mt-8 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-6">
            <p className={`${BODY} max-w-4xl`}>
              Personalization is useful when it increases relevance and
              completion, not when it overwhelms employees with automated
              content suggestions.
            </p>
            <div
              aria-hidden
              className="mt-5 grid max-w-4xl gap-8 md:grid-cols-2 md:gap-0"
            >
              <div className="md:pr-10">
                <div
                  className={`${MICRO} text-[var(--charcoal-light)]/55 [text-decoration-line:line-through]`}
                >
                  Overwhelms employees
                </div>
                <div className="mt-3 grid grid-cols-9 gap-1.5">
                  {Array.from({ length: 27 }).map((_, k) => (
                    <span
                      key={k}
                      className="block h-3.5 border border-[var(--charcoal)]/15 bg-[var(--charcoal)]/[0.04]"
                    />
                  ))}
                </div>
              </div>
              <div className="md:border-l md:border-[var(--charcoal)]/12 md:pl-10">
                <div className={`${MICRO} text-[var(--crimson)]`}>
                  Relevance and completion
                </div>
                <div className="mt-3 flex gap-1.5">
                  {[0, 1, 2].map((k) => (
                    <span
                      key={k}
                      className="block h-3.5 w-12 bg-[var(--crimson)]"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-8 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-6">
            <p className={`${DISPLAY} max-w-4xl`}>
              Learning systems should connect development activity to real
              internal opportunities so capability building is tied to mobility
              and business need.
            </p>
            <div
              aria-hidden
              className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3"
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
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          24. MANAGER COPILOTS: four things managers need fast. One copilot
          serving a dispersed population. The conditions that decide value,
          with ambiguity escalated to people.
      ================================================================== */}
      <Slide id="manager-copilots" border align="left">
        <Head1>
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
          <div className="mt-8 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-6">
            <p className={`${BODY} max-w-4xl`}>
              Retrieval-based copilots can improve consistency and reduce
              routine administrative burden across dispersed management
              populations.
            </p>
            <svg
              role="img"
              aria-label="Central retrieval-based copilots hub serving dispersed management populations across the organization."
              viewBox="0 0 800 152"
              className="mt-5 w-full max-w-5xl"
              fill="none"
            >
              <title>
                Central retrieval-based copilots hub serving dispersed
                management populations across the organization.
              </title>
              {[
                { x: 140, y: 24, hx: 304, hy: 60 },
                { x: 64, y: 54, hx: 304, hy: 68 },
                { x: 156, y: 88, hx: 304, hy: 76 },
                { x: 84, y: 118, hx: 304, hy: 84 },
                { x: 660, y: 24, hx: 496, hy: 60 },
                { x: 736, y: 54, hx: 496, hy: 68 },
                { x: 644, y: 88, hx: 496, hy: 76 },
                { x: 716, y: 118, hx: 496, hy: 84 },
              ].map((pt, i) => (
                <g key={i}>
                  <path
                    d={`M${pt.hx} ${pt.hy}L${pt.x} ${pt.y}`}
                    stroke="var(--crimson)"
                    strokeOpacity="0.4"
                  />
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="5.5"
                    fill="var(--surface)"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.65"
                    strokeWidth="1.25"
                  />
                </g>
              ))}
              <rect
                x="304"
                y="54"
                width="192"
                height="36"
                fill="var(--crimson)"
                fillOpacity="0.05"
                stroke="var(--crimson)"
                strokeWidth="1.5"
              />
              <text
                {...SVG_LABEL}
                x="400"
                y="75.5"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                RETRIEVAL-BASED COPILOTS
              </text>
              <text
                {...SVG_LABEL}
                x="400"
                y="138"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                DISPERSED MANAGEMENT POPULATIONS
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-8 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-6">
            <p className={`${DISPLAY} max-w-4xl`}>
              Their value depends on source quality, access controls, and
              whether ambiguous issues are escalated to qualified HR partners.
            </p>
            <div
              aria-hidden
              className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3"
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
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          25. PERFORMANCE MANAGEMENT: three supports. A stack of reviews
          with three kinds flagged. Support set against replacing manager
          accountability.
      ================================================================== */}
      <Slide id="performance-management" border align="left">
        <Head1>
          Performance Management and Goal Calibration
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-6 max-w-4xl`}>
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
            className="mt-4 max-w-4xl"
          />
        </div>

        <div className="w-full">
          <div className="mt-7 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-5">
            <p className={`${BODY} max-w-4xl`}>
              The benefit is stronger calibration and earlier identification of
              inflated, missing, or weakly evidenced reviews.
            </p>
            <svg
              role="img"
              aria-label="Review calibration chart comparing evaluation bars against a stronger calibration benchmark and flagging inflated, missing, and weakly evidenced reviews."
              viewBox="0 0 800 136"
              className="mt-4 w-full max-w-4xl"
              fill="none"
            >
              <title>
                Review calibration chart comparing evaluation bars against a
                stronger calibration benchmark and flagging inflated, missing,
                and weakly evidenced reviews.
              </title>
              <path
                d="M360 12V114"
                stroke="var(--charcoal)"
                strokeOpacity="0.35"
                strokeDasharray="4 3"
              />
              <text
                {...SVG_LABEL}
                x="360"
                y="128"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.55"
              >
                STRONGER CALIBRATION
              </text>
              {[
                { y: 20, w: 324, flag: "" },
                { y: 40, w: 500, flag: "INFLATED" },
                { y: 60, w: 332, flag: "" },
                { y: 80, w: 0, flag: "MISSING" },
                { y: 100, w: 112, flag: "WEAKLY EVIDENCED" },
              ].map((r, i) => (
                <g key={i}>
                  <path
                    d={`M24 ${r.y + 13}H776`}
                    stroke="var(--charcoal)"
                    strokeOpacity="0.08"
                  />
                  {r.w > 0 ? (
                    <rect
                      x="24"
                      y={r.y}
                      width={r.w}
                      height="8"
                      fill={r.flag ? "var(--crimson)" : "var(--charcoal)"}
                      fillOpacity={r.flag ? 0.75 : 0.25}
                    />
                  ) : (
                    <rect
                      x="24"
                      y={r.y}
                      width="336"
                      height="8"
                      stroke="var(--crimson)"
                      strokeOpacity="0.65"
                      strokeDasharray="4 3"
                    />
                  )}
                  {r.flag && (
                    <text
                      {...SVG_LABEL}
                      x="556"
                      y={r.y + 7.5}
                      fill="var(--crimson)"
                    >
                      {r.flag}
                    </text>
                  )}
                </g>
              ))}
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-7 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-5">
            <p className={`${DISPLAY} max-w-4xl`}>
              Performance systems should support better judgment, not replace
              manager accountability for coaching, context, and difficult
              conversations.
            </p>
            <div className="mt-4 max-w-4xl">
              <Split1
                left="Replace manager accountability"
                right="Support better judgment"
                strikeLeft
              />
              <Terms
                items={["coaching", "context", "difficult conversations"]}
                className="mt-3"
              />
            </div>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          26. REWARDS AND PAY EQUITY: two comparable groups with an
          unexplained gap. Episodic review set against ongoing monitoring.
          The three sensitive decisions.                     [quiz topic]
      ================================================================== */}
      <Slide id="pay-equity" border align="left">
        <Head1>
          Rewards, Promotion, and Pay Equity Analytics
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-7 max-w-4xl`}>
            AI can surface unexplained pay variation, promotion bottlenecks, and
            inconsistent reward outcomes across comparable employee groups.
          </p>
          <figure className="mt-5 w-full max-w-5xl">
            <svg
              role="img"
              aria-label="Two comparable employee groups plotted on parallel pay scales with an unexplained pay variation gap between their group medians."
              viewBox="0 0 800 132"
              className="w-full"
              fill="none"
            >
              <title>
                Two comparable employee groups plotted on parallel pay scales
                with an unexplained pay variation gap between their group
                medians.
              </title>
              <text
                {...SVG_LABEL}
                x="20"
                y="18"
                fill="var(--charcoal)"
                fillOpacity="0.55"
              >
                COMPARABLE EMPLOYEE GROUPS
              </text>
              {[
                { y: 44, center: 560, tone: "var(--charcoal)" },
                { y: 78, center: 430, tone: "var(--crimson)" },
              ].map((g, gi) => (
                <g key={gi}>
                  <path
                    d={`M20 ${g.y}H780`}
                    stroke="var(--charcoal)"
                    strokeOpacity="0.12"
                  />
                  {[-105, -75, -45, -15, 15, 45, 75, 105].map((dx, k) => (
                    <circle
                      key={k}
                      cx={g.center + dx}
                      cy={g.y}
                      r="5"
                      fill={g.tone}
                      fillOpacity={gi === 0 ? 0.4 : 0.85}
                    />
                  ))}
                  <path
                    d={`M${g.center} ${g.y - 10}V${g.y + 10}`}
                    stroke={g.tone}
                    strokeWidth="2"
                  />
                </g>
              ))}
              <path
                d="M430 92V102H560V92"
                stroke="var(--crimson)"
                strokeWidth="1.5"
              />
              <text
                {...SVG_LABEL}
                x="495"
                y="120"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                UNEXPLAINED PAY VARIATION
              </text>
            </svg>
          </figure>
        </div>

        <div className="mt-5 grid w-full max-w-5xl gap-8 border-t border-[var(--charcoal)]/10 pt-5 md:grid-cols-2 md:gap-12">
          <div>
            <p className={BODY}>
              These tools help move equity analysis from episodic review to
              ongoing monitoring tied to actual decision processes.
            </p>
            <svg
              role="img"
              aria-label="Comparison between sparse episodic review ticks and continuous ongoing monitoring tied to actual decision processes."
              viewBox="0 0 400 84"
              className="mt-4 w-full"
              fill="none"
            >
              <title>
                Comparison between sparse episodic review ticks and continuous
                ongoing monitoring tied to actual decision processes.
              </title>
              <text
                {...SVG_LABEL}
                x="8"
                y="24"
                fill="var(--charcoal)"
                fillOpacity="0.55"
              >
                EPISODIC REVIEW
              </text>
              <path
                d="M172 20H392"
                stroke="var(--charcoal)"
                strokeOpacity="0.14"
              />
              {[204, 294, 384].map((x) => (
                <path
                  key={x}
                  d={`M${x} 10V30`}
                  stroke="var(--charcoal)"
                  strokeOpacity="0.55"
                  strokeWidth="2"
                />
              ))}
              <text {...SVG_LABEL} x="8" y="64" fill="var(--crimson)">
                ONGOING MONITORING
              </text>
              <path
                d="M172 60H392"
                stroke="var(--crimson)"
                strokeWidth="2.5"
              />
              {Array.from({ length: 12 }).map((_, i) => {
                const x = +(180 + i * 18.5).toFixed(2);
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy="60"
                    r="2.75"
                    fill="var(--surface)"
                    stroke="var(--crimson)"
                    strokeWidth="1.5"
                  />
                );
              })}
            </svg>
          </div>

          <div className="md:border-l md:border-[var(--charcoal)]/12 md:pl-12">
            <p className={BODY}>
              Governance is essential because salary, promotion, and bonus
              decisions are socially sensitive and legally consequential.
            </p>
            <div aria-hidden className="mt-4">
              <div className="grid grid-cols-3 gap-2">
                {["salary", "promotion", "bonus"].map((p) => (
                  <div
                    key={p}
                    className={`${TAG} border border-b-0 border-[var(--charcoal)]/15 px-2.5 py-2.5 text-[var(--charcoal-light)]/70`}
                  >
                    {p}
                  </div>
                ))}
              </div>
              <div
                className={`${MICRO} bg-[var(--crimson)] px-3 py-2 text-[var(--surface)]`}
              >
                Socially sensitive | legally consequential
              </div>
            </div>
          </div>
        </div>

        <Discussion1>
          Should firms use algorithmic recommendations in promotion and compensation cycles if doing so improves consistency but may narrow managerial discretion and contextual judgment?
        </Discussion1>
      </Slide>

      {/* ==================================================================
          27. PRODUCTIVITY ANALYTICS: three data streams combined into three
          estimates. The same tools used well and used poorly, side by side.
                                                     [quiz: pay-equity]
      ================================================================== */}
      <Slide
        id="productivity-analytics"
        border
        align="left"
        quizData={quiz["productivity-analytics"]}
      >
        <Head1>
          Productivity Analytics and Responsible Monitoring
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Organizations can combine workflow data, output data, and
            collaboration data to estimate capacity constraints, workload
            patterns, and process bottlenecks.
          </p>
          <svg
            role="img"
            aria-label="Workflow data, output data, and collaboration data combining to estimate capacity constraints, workload patterns, and process bottlenecks."
            viewBox="0 0 800 112"
            className="mt-5 w-full max-w-5xl"
            fill="none"
          >
            <title>
              Workflow data, output data, and collaboration data combining to
              estimate capacity constraints, workload patterns, and process
              bottlenecks.
            </title>
            {["WORKFLOW DATA", "OUTPUT DATA", "COLLABORATION DATA"].map(
              (src, i) => {
                const y = 20 + i * 36;
                return (
                  <g key={src}>
                    <rect
                      x="16"
                      y={y - 12}
                      width="192"
                      height="24"
                      stroke="var(--charcoal)"
                      strokeOpacity="0.28"
                    />
                    <text
                      {...SVG_LABEL}
                      x="112"
                      y={y + 3.5}
                      textAnchor="middle"
                      fill="var(--charcoal)"
                      fillOpacity="0.7"
                    >
                      {src}
                    </text>
                    <path
                      d={`M208 ${y} C 266 ${y}, 280 56, 331 56`}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.3"
                    />
                  </g>
                );
              },
            )}
            <circle cx="338" cy="56" r="7" fill="var(--crimson)" />
            {[
              "CAPACITY CONSTRAINTS",
              "WORKLOAD PATTERNS",
              "PROCESS BOTTLENECKS",
            ].map((o, i) => {
              const y = 20 + i * 36;
              return (
                <g key={o}>
                  <path
                    d={`M345 56 C 402 56, 416 ${y}, 474 ${y}`}
                    stroke="var(--crimson)"
                    strokeOpacity="0.5"
                  />
                  <rect
                    x="474"
                    y={y - 5}
                    width="10"
                    height="10"
                    fill="var(--crimson)"
                  />
                  <text
                    {...SVG_LABEL}
                    x="496"
                    y={y + 3.5}
                    fill="var(--charcoal)"
                    fillOpacity="0.75"
                  >
                    {o}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="mt-6 grid w-full max-w-5xl gap-8 border-t border-[var(--charcoal)]/10 pt-5 md:grid-cols-2 md:gap-0">
          <div className="md:pr-10">            <p className={`${BODY} mt-2.5`}>
              Used well, productivity analytics can support redesign of work,
              team staffing, and manager coaching rather than individual
              policing.
            </p>
            <div aria-hidden className="mt-4 flex flex-wrap gap-2">
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
          <div className="md:border-l md:border-[var(--charcoal)]/12 md:pl-10">            <p className={`${BODY} mt-2.5`}>
              Used poorly, the same tools can create fear, gaming behavior, and
              degraded trust across the workforce.
            </p>
            <div aria-hidden className="mt-4 flex flex-wrap gap-2">
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
          Where is the boundary between legitimate operational analytics and unacceptable employee surveillance in knowledge-intensive work?
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
          29. EMPLOYEE LISTENING: four sources condensed into themes and
          concerns. A local issue set against an enterprise-wide pattern.
          What distorts what employees choose to say.
      ================================================================== */}
      <Slide id="employee-listening" border align="left">
        <Head1>
          Employee Listening and Sentiment Interpretation
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-7 max-w-4xl`}>
            AI can summarize survey comments, open-text feedback, exit
            interviews, and service-center narratives into recurring themes and
            emerging concerns.
          </p>
          <svg
            role="img"
            aria-label="Survey comments, open-text feedback, exit interviews, and service-center narratives summarized into recurring themes and emerging concerns."
            viewBox="0 0 800 132"
            className="mt-5 w-full max-w-5xl"
            fill="none"
          >
            <title>
              Survey comments, open-text feedback, exit interviews, and
              service-center narratives summarized into recurring themes and
              emerging concerns.
            </title>
            {[
              "SURVEY COMMENTS",
              "OPEN-TEXT FEEDBACK",
              "EXIT INTERVIEWS",
              "SERVICE-CENTER NARRATIVES",
            ].map((src, i) => {
              const y = 20 + i * 30;
              return (
                <g key={src}>
                  <rect
                    x="16"
                    y={y - 11}
                    width="224"
                    height="22"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.28"
                  />
                  <text
                    {...SVG_LABEL}
                    x="128"
                    y={y + 3.5}
                    textAnchor="middle"
                    fill="var(--charcoal)"
                    fillOpacity="0.7"
                  >
                    {src}
                  </text>
                  <path
                    d={`M240 ${y} C 300 ${y}, 316 65, 373 65`}
                    stroke="var(--charcoal)"
                    strokeOpacity="0.28"
                  />
                </g>
              );
            })}
            <circle cx="380" cy="65" r="7" fill="var(--crimson)" />
            {[
              { y: 42, label: "RECURRING THEMES" },
              { y: 88, label: "EMERGING CONCERNS" },
            ].map((o) => (
              <g key={o.label}>
                <path
                  d={`M387 65 C 446 65, 464 ${o.y}, 524 ${o.y}`}
                  stroke="var(--crimson)"
                  strokeOpacity="0.5"
                />
                <rect
                  x="524"
                  y={o.y - 5}
                  width="10"
                  height="10"
                  fill="var(--crimson)"
                />
                <text
                  {...SVG_LABEL}
                  x="546"
                  y={o.y + 3.5}
                  fill="var(--charcoal)"
                  fillOpacity="0.75"
                >
                  {o.label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="w-full">
          <div className="mt-8 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-6">
            <p className={`${BODY} max-w-4xl`}>
              The value lies in scale and speed, especially when leaders need to
              distinguish local operational issues from enterprise-wide cultural
              patterns.
            </p>
            <div
              aria-hidden
              className="mt-6 grid max-w-4xl gap-8 md:grid-cols-2 md:gap-12"
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
                        className={`block h-6 ${
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
          <div className="mt-8 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-6">
            <p className={`${DISPLAY} max-w-4xl`}>
              Sentiment outputs should be treated as directional evidence
              because silence, fear, and context can distort what employees
              choose to say.
            </p>
            <div
              aria-hidden
              className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3"
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
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          30. DEI ANALYTICS: five measures tracked across groups. A flat
          aggregate hiding one group's drop. A gap that does not reveal its
          cause or its remedy.                               [quiz topic]
      ================================================================== */}
      <Slide id="dei-analytics" border align="left">
        <Head1>
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
          <div className="mt-8 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-6">
            <p className={`${BODY} max-w-4xl`}>
              These analyses help identify structural barriers that may not be
              visible in aggregate workforce dashboards.
            </p>
            <figure className="mt-5 w-full max-w-5xl">
              <svg
                role="img"
                aria-label="Comparison showing a flat trend in aggregate workforce dashboards versus disaggregated trajectories across groups revealing structural barriers."
                viewBox="0 0 800 136"
                className="w-full"
                fill="none"
              >
                <title>
                  Comparison showing a flat trend in aggregate workforce
                  dashboards versus disaggregated trajectories across groups
                  revealing structural barriers.
                </title>
                <text
                  {...SVG_LABEL}
                  x="24"
                  y="18"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  AGGREGATE WORKFORCE DASHBOARDS
                </text>
                <path
                  d="M24 30V108H364"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.22"
                />
                <path
                  d="M36 52 C 120 55, 220 58, 356 62"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.65"
                  strokeWidth="2"
                />

                <path
                  d="M400 16V122"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.14"
                />

                <text {...SVG_LABEL} x="436" y="18" fill="var(--crimson)">
                  ACROSS GROUPS
                </text>
                <path
                  d="M436 30V108H776"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.22"
                />
                <path
                  d="M448 56 C 556 56, 656 58, 768 60 L 768 98 C 604 94, 556 62, 448 56 Z"
                  fill="var(--crimson)"
                  fillOpacity="0.06"
                />
                <path
                  d="M448 46 C 556 46, 656 48, 768 50"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.45"
                />
                <path
                  d="M448 54 C 556 54, 656 56, 768 58"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.45"
                />
                <path
                  d="M448 56 C 556 62, 604 94, 768 98"
                  stroke="var(--crimson)"
                  strokeWidth="2"
                />
                <circle cx="768" cy="98" r="3.5" fill="var(--crimson)" />
                <text
                  {...SVG_LABEL}
                  x="776"
                  y="126"
                  textAnchor="end"
                  fill="var(--crimson)"
                >
                  STRUCTURAL BARRIERS
                </text>
              </svg>
            </figure>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-8 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-6">
            <p className={`${DISPLAY} max-w-4xl`}>
              Leaders still need careful interpretation because representation
              gaps do not automatically reveal causality or the right
              intervention.
            </p>
            <div
              aria-hidden
              className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3"
            >
              <span
                className={`${TAG} bg-[var(--crimson)] px-3 py-2 text-[var(--surface)]`}
              >
                representation gaps
              </span>
              <span className="font-sans text-2xl text-[var(--charcoal)]/40">
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
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          31. CASE TRIAGE: incoming cases sorted and routed to the right
          specialist. The four matters where delay falls. AI held to workflow
          discipline, not final judgment.          [quiz: dei-analytics]
      ================================================================== */}
      <Slide
        id="case-triage"
        border
        align="left"
        quizData={quiz["case-triage"]}
      >
        <Head1>
          Employee Relations, Case Triage, and Policy Guidance
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-7 max-w-4xl`}>
            HR teams can use AI to classify cases, summarize documents, surface
            policy precedents, and route matters to the right specialist more
            quickly.
          </p>
          <svg
            role="img"
            aria-label="Incoming HR cases classified and routed across three specialist lanes to reach the right specialist."
            viewBox="0 0 800 136"
            className="mt-5 w-full max-w-5xl"
            fill="none"
          >
            <title>
              Incoming HR cases classified and routed across three specialist
              lanes to reach the right specialist.
            </title>
            <text
              {...SVG_LABEL}
              x="24"
              y="16"
              fill="var(--charcoal)"
              fillOpacity="0.55"
            >
              CASES
            </text>
            {[
              [28, 30],
              [92, 48],
              [40, 68],
              [104, 88],
              [32, 108],
            ].map(([x, y], i) => {
              const ty = 54 + i * 6;
              return (
                <g key={i}>
                  <rect
                    x={x}
                    y={y - 7}
                    width="22"
                    height="14"
                    fill="var(--charcoal)"
                    fillOpacity="0.04"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.55"
                  />
                  <path
                    d={`M${x + 22} ${y} C 196 ${y}, 236 ${ty}, 288 ${ty}`}
                    stroke="var(--charcoal)"
                    strokeOpacity="0.22"
                  />
                </g>
              );
            })}
            <rect
              x="288"
              y="46"
              width="136"
              height="40"
              fill="var(--crimson)"
              fillOpacity="0.05"
              stroke="var(--crimson)"
              strokeWidth="1.5"
            />
            <text
              {...SVG_LABEL}
              x="356"
              y="69.5"
              textAnchor="middle"
              fill="var(--crimson)"
            >
              CLASSIFY CASES
            </text>
            {[
              { y: 26, on: false },
              { y: 66, on: true },
              { y: 106, on: false },
            ].map((lane) => (
              <g key={lane.y}>
                <path
                  d={`M424 66 C 476 66, 496 ${lane.y}, 556 ${lane.y}H604`}
                  stroke={lane.on ? "var(--crimson)" : "var(--charcoal)"}
                  strokeOpacity={lane.on ? 1 : 0.22}
                  strokeWidth={lane.on ? 1.75 : 1}
                />
                {lane.on && (
                  <path
                    d={`M597 ${lane.y - 4}L604 ${lane.y}L597 ${lane.y + 4}`}
                    stroke="var(--crimson)"
                    strokeWidth="1.5"
                  />
                )}
                <circle
                  cx="618"
                  cy={lane.y}
                  r="7"
                  fill={lane.on ? "var(--crimson)" : "var(--surface)"}
                  stroke="var(--charcoal)"
                  strokeOpacity={lane.on ? 0 : 0.45}
                />
              </g>
            ))}
            <text {...SVG_LABEL} x="638" y="69.5" fill="var(--crimson)">
              THE RIGHT SPECIALIST
            </text>
          </svg>
        </div>

        <div className="mt-7 grid w-full max-w-5xl grid-cols-1 gap-8 border-t border-[var(--charcoal)]/10 pt-6 md:grid-cols-2">
          <div>
            <p className={BODY}>
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
              cols="grid-cols-2"
              className="mt-4"
            />
          </div>

          <div className="md:border-l md:border-[var(--charcoal)]/12 md:pl-8">
            <p className={DISPLAY}>
              Because cases may involve trauma, legal exposure, or power
              imbalance, AI should support workflow discipline rather than final
              judgment.
            </p>
            <div aria-hidden className="mt-4 flex flex-wrap gap-2">
              {["trauma", "legal exposure", "power imbalance"].map((o) => (
                <span
                  key={o}
                  className={`${TAG} border border-[var(--crimson)]/40 px-2.5 py-1.5 text-[var(--crimson)]`}
                >
                  {o}
                </span>
              ))}
            </div>
            <div className="mt-4">
              <Split1
                left="Final judgment"
                right="Workflow discipline"
                strikeLeft
              />
            </div>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          32. PRIVACY AND EMPLOYMENT LAW: five sensitive categories held
          inside strict access control. Five legal boundaries. Acceptable
          analysis drawn inside what is technically possible.
      ================================================================== */}
      <Slide id="privacy-law" border align="left">
        <Head1>
          Privacy, Consent, and Employment Law Boundaries
        </Head1>

        <div className="mt-6 grid w-full max-w-5xl gap-8 md:grid-cols-2 md:gap-12">
          <div>
            <p className={BODY}>
              HR data often includes health information, compensation details,
              identity attributes, grievances, and performance records that
              require strict access control.
            </p>
            <div
              aria-hidden
              className="mt-4 border-2 border-[var(--crimson)] p-2.5"
            >
              <div className={`${MICRO} px-1 pb-2 text-[var(--crimson)]`}>
                Strict access control
              </div>
              <Terms
                items={[
                  "health information",
                  "compensation details",
                  "identity attributes",
                  "grievances",
                  "performance records",
                ]}
                className="mt-0 px-1"
              />
            </div>
          </div>

          <div className="md:border-l md:border-[var(--charcoal)]/12 md:pl-12">
            <p className={BODY}>
              AI programs must be designed around employment law, labor
              standards, privacy obligations, records retention, and
              cross-border data handling rules.
            </p>
            <Terms
              items={[
                "employment law",
                "labor standards",
                "privacy obligations",
                "records retention",
                "cross-border data handling rules",
              ]}
              className="mt-4"
            />
          </div>
        </div>

        <div className="w-full">
          <div className="mt-6 grid w-full max-w-5xl items-center gap-10 border-t border-[var(--charcoal)]/10 pt-5 md:grid-cols-[1fr_25rem] md:gap-14">
            <p className={DISPLAY}>
              Leaders should assume that technically possible analysis is often
              broader than legally or ethically acceptable analysis.
            </p>
            <svg
              role="img"
              aria-label="A broad dashed rectangle for technically possible analysis containing a smaller crimson-bordered boundary for legally or ethically acceptable analysis."
              viewBox="0 0 400 116"
              className="w-full"
              fill="none"
            >
              <title>
                A broad dashed rectangle for technically possible analysis
                containing a smaller crimson-bordered boundary for legally or
                ethically acceptable analysis.
              </title>
              <rect
                x="8"
                y="8"
                width="384"
                height="100"
                stroke="var(--charcoal)"
                strokeOpacity="0.35"
                strokeDasharray="4 4"
              />
              <text
                {...SVG_LABEL}
                x="24"
                y="28"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                TECHNICALLY POSSIBLE ANALYSIS
              </text>
              <rect
                x="24"
                y="42"
                width="264"
                height="52"
                fill="var(--crimson)"
                fillOpacity="0.05"
                stroke="var(--crimson)"
                strokeWidth="1.5"
              />
              <text
                {...SVG_LABEL}
                x="38"
                y="64"
                fill="var(--crimson)"
              >
                LEGALLY OR ETHICALLY
              </text>
              <text
                {...SVG_LABEL}
                x="38"
                y="79"
                fill="var(--crimson)"
              >
                ACCEPTABLE ANALYSIS
              </text>
            </svg>
          </div>
        </div>

        <Discussion1>
          Which categories of workforce data should remain off-limits for predictive modeling even if they would improve forecast accuracy or managerial control?
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
          34. GOVERNANCE ACROSS THE LIFECYCLE: seven stages in order. The
          four "who" questions governance must answer. An inventory whose
          value lives in the columns linked to it.           [quiz topic]
      ================================================================== */}
      <Slide id="governance-lifecycle" border align="left">
        <Head1>AI Governance for HR Across the Lifecycle</Head1>

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

        <div className="mt-6 grid w-full max-w-5xl gap-8 border-t border-[var(--charcoal)]/10 pt-5 md:grid-cols-2 md:gap-12">
          <div>
            <p className={BODY}>
              Governance should clarify who owns the use case, who reviews legal
              risk, who validates outcomes, and who has authority to stop
              deployment.
            </p>
            <ul aria-hidden className="mt-4 border-t border-[var(--charcoal)]/15">
              {[
                "owns the use case",
                "reviews legal risk",
                "validates outcomes",
                "has authority to stop deployment",
              ].map((q, i) => (
                <li
                  key={q}
                  className="grid grid-cols-[3.5rem_1fr_1.5rem] items-baseline gap-3 border-b border-[var(--charcoal)]/10 py-2"
                >
                  <span
                    className={`${MICRO} ${
                      i === 3
                        ? "text-[var(--crimson)]"
                        : "text-[var(--champagne)]"
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
                  <span className="text-right font-sans text-lg text-[var(--crimson)]">
                    ?
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:border-l md:border-[var(--charcoal)]/12 md:pl-12">
            <p className={BODY}>
              A model inventory is valuable only when it is linked to decisions,
              review cadence, and documented accountability.
            </p>
            <div
              aria-hidden
              className="mt-4 overflow-x-auto border-t border-[var(--charcoal)]/30"
            >
              <div>
                <div className="grid grid-cols-4 border-b border-[var(--charcoal)]/15">
                  <span
                    className={`${TAG} px-2.5 py-2 text-[var(--charcoal-light)]/60`}
                  >
                    model inventory
                  </span>
                  {[
                    "decisions",
                    "review cadence",
                    "documented accountability",
                  ].map((h) => (
                    <span
                      key={h}
                      className={`${TAG} border-l border-[var(--crimson)]/30 px-2.5 py-2 text-[var(--crimson)]`}
                    >
                      {h}
                    </span>
                  ))}
                </div>
                {[0, 1, 2].map((r) => (
                  <div
                    key={r}
                    className="grid grid-cols-4 border-b border-[var(--charcoal)]/8"
                  >
                    {[0, 1, 2, 3].map((c) => (
                      <span
                        key={c}
                        className={`px-2.5 py-2.5 ${
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
                          style={{
                            width: `${45 + ((r * 4 + c * 3) % 5) * 11}%`,
                          }}
                        />
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          35. BUILD, BUY, OR PARTNER: vendor sourcing beside internal
          design. Five decision factors. The purchase leaving the firm while
          accountability stays.             [quiz: governance-lifecycle]
      ================================================================== */}
      <Slide
        id="build-buy-partner"
        border
        align="left"
        quizData={quiz["build-buy-partner"]}
      >
        <Head1>
          Build, Buy, or Partner in the HR Technology Stack
        </Head1>

        <div className="mt-6 grid w-full max-w-5xl gap-8 md:grid-cols-2 md:gap-12">
          <div>
            <p className={BODY}>
              Some capabilities can be sourced from established HR vendors,
              while others require internal design because workflows, labor
              strategy, or risk tolerance are distinctive.
            </p>
            <div aria-hidden className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="border-t border-[var(--charcoal)]/25 pt-3">
                <div className={`${MICRO} text-[var(--charcoal-light)]/60`}>
                  Established HR vendors
                </div>
              </div>
              <div className="border-t-2 border-[var(--crimson)] pt-3">
                <div className={`${MICRO} text-[var(--crimson)]`}>
                  Internal design
                </div>
                <Terms
                  items={["workflows", "labor strategy", "risk tolerance"]}
                  className="mt-2"
                />
              </div>
            </div>
          </div>

          <div className="md:border-l md:border-[var(--charcoal)]/12 md:pl-12">
            <p className={BODY}>
              The choice depends on integration burden, vendor transparency,
              configurability, data portability, and internal capability.
            </p>
            <Terms
              items={[
                "integration burden",
                "vendor transparency",
                "configurability",
                "data portability",
                "internal capability",
              ]}
              className="mt-4"
            />
          </div>
        </div>

        <div className="w-full">
          <div className="mt-6 grid w-full max-w-5xl items-center gap-8 border-t border-[var(--charcoal)]/10 pt-5 md:grid-cols-[1fr_22rem]">
            <p className={DISPLAY}>
              Purchasing software does not transfer accountability for
              employment outcomes, fairness concerns, or regulatory exposure.
            </p>
            <div aria-hidden className="space-y-2.5">
              <div className="grid grid-cols-[6.5rem_1fr] items-center gap-3">
                <span className={`${MICRO} text-[var(--charcoal-light)]/55`}>
                  Software
                </span>
                <span className="flex items-center gap-2.5">
                  <span className="h-px flex-1 bg-[var(--charcoal)]/30" />
                  <span className="text-[var(--charcoal)]/40">→</span>
                  <span
                    className={`${TAG} border border-[var(--charcoal)]/15 px-2.5 py-1 text-[var(--charcoal-light)]/60`}
                  >
                    purchasing
                  </span>
                </span>
              </div>
              <div className="grid grid-cols-[6.5rem_1fr] items-center gap-3">
                <span className={`${MICRO} text-[var(--crimson)]`}>
                  Accountability
                </span>
                <span className="flex items-center gap-2.5">
                  <span className="h-2.5 w-2.5 shrink-0 bg-[var(--crimson)]" />
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
          </div>
        </div>

        <Discussion1>
          Which HR AI capabilities should be treated as strategic internal assets, and which are mature enough to buy as standardized infrastructure?
        </Discussion1>
      </Slide>

      {/* ==================================================================
          36. CHANGE MANAGEMENT AND TRUST: the four groups whose trust an
          accurate tool still needs. Four adoption moves. Visible governance
          set against claims of objectivity.
      ================================================================== */}
      <Slide id="change-trust" border align="left">
        <Head1>Change Management and Workforce Trust</Head1>

        <div className="w-full">
          <p className={`${BODY} mt-7 max-w-4xl`}>
            Even accurate tools fail when employees, managers, works councils,
            or HR partners do not trust how the system is used.
          </p>
          <svg
            role="img"
            aria-label="Accurate tools disconnected by a severed trust gap from employees, managers, works councils, and HR partners."
            viewBox="0 0 800 136"
            className="mt-5 w-full max-w-5xl"
            fill="none"
          >
            <title>
              Accurate tools disconnected by a severed trust gap from employees,
              managers, works councils, and HR partners.
            </title>
            <rect
              x="24"
              y="50"
              width="148"
              height="36"
              fill="var(--charcoal)"
              fillOpacity="0.05"
              stroke="var(--charcoal)"
              strokeOpacity="0.55"
            />
            <text
              {...SVG_LABEL}
              x="98"
              y="71.5"
              textAnchor="middle"
              fill="var(--charcoal)"
              fillOpacity="0.8"
            >
              ACCURATE TOOLS
            </text>
            <text
              {...SVG_LABEL}
              x="376"
              y="14"
              textAnchor="middle"
              fill="var(--crimson)"
            >
              DO NOT TRUST
            </text>
            {[
              { y: 32, label: "EMPLOYEES" },
              { y: 56, label: "MANAGERS" },
              { y: 80, label: "WORKS COUNCILS" },
              { y: 104, label: "HR PARTNERS" },
            ].map((g) => (
              <g key={g.label}>
                <path
                  d={`M172 68 C 244 68, 272 ${g.y}, 352 ${g.y}`}
                  stroke="var(--crimson)"
                  strokeOpacity="0.55"
                  strokeDasharray="4 4"
                />
                <path
                  d={`M352 ${g.y - 5}V${g.y + 5}M400 ${g.y - 5}V${g.y + 5}`}
                  stroke="var(--crimson)"
                  strokeWidth="1.5"
                />
                <path
                  d={`M400 ${g.y}H436`}
                  stroke="var(--charcoal)"
                  strokeOpacity="0.3"
                  strokeDasharray="3 3"
                />
                <circle
                  cx="444"
                  cy={g.y}
                  r="5.5"
                  fill="var(--surface)"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.6"
                  strokeWidth="1.25"
                />
                <text
                  {...SVG_LABEL}
                  x="462"
                  y={g.y + 3.5}
                  fill="var(--charcoal)"
                  fillOpacity="0.75"
                >
                  {g.label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="w-full">
          <div className="mt-8 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-6">
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
              className="mt-5 max-w-4xl"
            />
          </div>
        </div>

        <div className="w-full">
          <div className="mt-8 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-6">
            <p className={`${DISPLAY} max-w-4xl`}>
              Trust is built through visible governance, not through claims that
              the technology is objective or inevitable.
            </p>
            <div className="mt-5 max-w-4xl">
              <Split1
                left="Claims | objective or inevitable"
                right="Visible governance"
                strikeLeft
              />
            </div>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          37. TALENT STRATEGY: the five capabilities in the mix. Shared
          fluency joining three groups. AI literacy moved from side project
          to managerial capability.
      ================================================================== */}
      <Slide id="talent-strategy" border align="left">
        <Head1>
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
          <div className="mt-8 grid w-full max-w-5xl items-center gap-10 border-t border-[var(--charcoal)]/10 pt-6 md:grid-cols-[1fr_24rem] md:gap-14">
            <div>
              <p className={LEAD}>
                The capability challenge is not hiring a few specialists alone,
                but building shared fluency between HR practitioners, business
                leaders, and technical teams.
              </p>
              <div
                aria-hidden
                className={`${TAG} mt-4 inline-block border border-[var(--charcoal)]/15 px-3 py-1.5 text-[var(--charcoal-light)]/45 [text-decoration-line:line-through]`}
              >
                hiring a few specialists alone
              </div>
            </div>
            <svg
              role="img"
              aria-label="Triangle of shared fluency connecting HR practitioners, business leaders, and technical teams."
              viewBox="0 0 400 204"
              className="w-full"
              fill="none"
            >
              <title>
                Triangle of shared fluency connecting HR practitioners, business
                leaders, and technical teams.
              </title>
              <path
                d="M200 36L68 162H332Z"
                fill="var(--crimson)"
                fillOpacity="0.04"
                stroke="var(--crimson)"
                strokeWidth="1.75"
                strokeOpacity="0.85"
              />
              {[
                { x: 200, y: 36 },
                { x: 68, y: 162 },
                { x: 332, y: 162 },
              ].map((p) => (
                <circle
                  key={`${p.x}-${p.y}`}
                  cx={p.x}
                  cy={p.y}
                  r="7.5"
                  fill="var(--surface)"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.65"
                  strokeWidth="1.25"
                />
              ))}
              <text
                {...SVG_LABEL}
                x="200"
                y="18"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.7"
              >
                HR PRACTITIONERS
              </text>
              <text
                {...SVG_LABEL}
                x="68"
                y="188"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.7"
              >
                BUSINESS LEADERS
              </text>
              <text
                {...SVG_LABEL}
                x="332"
                y="188"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.7"
              >
                TECHNICAL TEAMS
              </text>
              <text
                {...SVG_LABEL}
                x="200"
                y="124"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                SHARED FLUENCY
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-8 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-6">
            <p className={`${DISPLAY} max-w-4xl`}>
              A mature HR function treats AI literacy as part of managerial
              capability, not as a side project owned by a small innovation
              team.
            </p>
            <div className="mt-5 max-w-4xl">
              <Split1
                left="Side project | small innovation team"
                right="Part of managerial capability"
                strikeLeft
              />
            </div>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          38. STRATEGIC OPERATING MODEL: five functions linked in one chain.
          Four prioritization criteria. Five common standards spanning every
          HR domain.
      ================================================================== */}
      <Slide id="operating-model" border align="left">
        <Head1>
          Strategic Operating Model for Enterprise HR AI
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-7 max-w-4xl`}>
            The most durable model links business priorities, HR process
            ownership, data governance, legal review, and product management.
          </p>
          <svg
            role="img"
            aria-label="Five linked stations in a durable operating model: business priorities, HR process ownership, data governance, legal review, and product management."
            viewBox="0 0 800 84"
            className="mt-5 w-full max-w-5xl"
            fill="none"
          >
            <title>
              Five linked stations in a durable operating model: business
              priorities, HR process ownership, data governance, legal review,
              and product management.
            </title>
            <path d="M84 28H716" stroke="var(--crimson)" strokeWidth="2" />
            {[
              { x: 84, label: "BUSINESS PRIORITIES" },
              { x: 242, label: "HR PROCESS OWNERSHIP" },
              { x: 400, label: "DATA GOVERNANCE" },
              { x: 558, label: "LEGAL REVIEW" },
              { x: 716, label: "PRODUCT MANAGEMENT" },
            ].map((n) => (
              <g key={n.label}>
                <path
                  d={`M${n.x} 36V50`}
                  stroke="var(--charcoal)"
                  strokeOpacity="0.22"
                />
                <rect
                  x={n.x - 8}
                  y="20"
                  width="16"
                  height="16"
                  fill="var(--surface)"
                  stroke="var(--crimson)"
                  strokeWidth="2"
                />
                <text
                  {...SVG_LABEL}
                  x={n.x}
                  y="64"
                  textAnchor="middle"
                  fill="var(--charcoal)"
                  fillOpacity="0.7"
                >
                  {n.label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="w-full">
          <div className="mt-8 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-6">
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
              className="mt-5 max-w-4xl"
            />
          </div>
        </div>

        <div className="w-full">
          <div className="mt-8 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-6">
            <p className={`${DISPLAY} max-w-4xl`}>
              Enterprise scale requires common standards for data, evaluation,
              monitoring, vendor review, and exception handling across HR
              domains.
            </p>
            <div aria-hidden className="mt-5 max-w-4xl">
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
                    className={`${TAG} border border-b-0 border-[var(--charcoal)]/15 px-3 py-3.5 text-[var(--charcoal-light)]/70`}
                  >
                    {p}
                  </div>
                ))}
              </div>
              <div
                className={`${MICRO} bg-[var(--crimson)] px-4 py-2.5 text-[var(--surface)]`}
              >
                Common standards | across HR domains
              </div>
            </div>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          39. CONCLUSION: the three closing statements in display weight,
          the three things AI should strengthen, then the colophon.
      ================================================================== */}
      <Slide
        id="conclusion"
        border
        align="left"
        className="relative overflow-hidden"
      >

        <Head1>
          Conclusion: HR as a Strategic Intelligence Function
        </Head1>

        <ol className="mt-8 w-full max-w-4xl">
          {[
            "The strongest HR applications combine prediction, automation, and human judgment around clearly owned people decisions.",
            "Competitive advantage comes from using AI to improve talent quality, workforce resilience, and managerial consistency without weakening legitimacy.",
            "The executive task is not to automate HR wholesale, but to decide where intelligent systems strengthen capability, fairness, and organizational trust.",
          ].map((line, i) => (
            <li key={line} className="block">
              <div className="grid grid-cols-[4ch_1fr] gap-6 border-t border-[var(--charcoal)]/12 py-5 md:grid-cols-[5ch_1fr] md:gap-10">
                <span className={`${MICRO} pt-2 text-[var(--crimson)]`}>
                  {pad(i + 1)}
                </span>
                <p className="font-sans text-xl font-medium leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[1.75rem]">
                  {line}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="w-full">
          <ol
            aria-hidden
            className="mt-6 grid w-full max-w-3xl grid-cols-3 gap-y-4"
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
                  <span className="mt-1 block font-sans text-[0.9375rem] tracking-normal text-[var(--charcoal-light)]/70">
                    {area}
                  </span>
                </li>
              ),
            )}
          </ol>
        </div>

        <div className="w-full">
          <div className="mt-8 flex w-full max-w-4xl flex-wrap items-baseline justify-between gap-4 border-t border-[var(--charcoal)]/12 pt-5">
            <span className={`${MICRO} text-[var(--champagne)]`}>
              End of Week 04
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
