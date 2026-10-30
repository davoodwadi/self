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
  Head1,
  MICRO,
  ModulePlate1,
  SVG_LABEL,
  Verdict,
} from "../_visuals/kit";

// ============================================================================
// WEEK 02: APPLICATIONS OF AI IN MARKETING AND CONSUMER BEHAVIOR
// ============================================================================
// Same deck grammar as Week 01: every slide is hand-composed for its own
// argument, with hairlines instead of boxes and crimson marking one thing.
//
// Sentences are transcribed verbatim from content.md. Figures carry only words
// that already appear in the slide's sentences.
//
// Quizzes: `Slide` renders `quizData` BEFORE its section. content.md marks the
// topic to be tested with [quiz], so each quiz is attached to the slide that
// FOLLOWS that topic and only tests material the student has already passed.
// ============================================================================

const quiz = createCourseQuizLookup(quizzes as CourseQuiz[]);

export default function Week02Marketing() {
  return (
    <SlideDeck>
      <ScrollProgress label="Week 02" />

      {/* ==================================================================
          01. TITLE: masthead with the four verbs of the framing sentence
          set as a closed loop beneath the standfirst.
      ================================================================== */}
      <Slide id="title" align="left" className="relative overflow-hidden">
        <div>
          <div
            className={`${MICRO} flex items-center gap-4 text-[var(--champagne)]`}
          >
            <span className="h-px w-10 bg-[var(--crimson)]" />
            Week 02 in Applications of AI in Business
          </div>
        </div>

        <div>
          <h1 className="mt-6 max-w-5xl font-serif text-[clamp(2.25rem,5.5vw,4.5rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-[var(--charcoal)]">
            Applications of AI in Marketing and
            <br />
            <span className="text-[var(--crimson)]">Consumer Behavior</span>
          </h1>
        </div>

        <div className="w-full">
          <div className="mt-7 h-px w-full bg-[var(--charcoal)]/15" />
          <p className="mt-5 max-w-3xl font-serif text-xl font-light italic leading-relaxed text-[var(--charcoal-light)] md:text-[1.625rem]">
            Framing marketing as a coordinated system of sensing, deciding,
            acting, and learning
          </p>
          <svg
            role="img"
            aria-label="Coordinated system loop linking sensing, deciding, acting, and learning, with a feedback arrow returning from learning to sensing."
            viewBox="0 0 800 84"
            className="mt-6 w-full max-w-4xl"
            fill="none"
          >
            <title>
              Coordinated system loop linking sensing, deciding, acting, and
              learning, with a feedback arrow returning from learning to
              sensing.
            </title>
            {[
              { x: 16, label: "SENSING", active: false },
              { x: 224, label: "DECIDING", active: false },
              { x: 432, label: "ACTING", active: false },
              { x: 640, label: "LEARNING", active: true },
            ].map((stage, i) => (
              <g key={stage.label}>
                <rect
                  x={stage.x}
                  y="10"
                  width="144"
                  height="38"
                  fill={stage.active ? "var(--crimson)" : "none"}
                  fillOpacity={stage.active ? "0.06" : undefined}
                  stroke={stage.active ? "var(--crimson)" : "var(--charcoal)"}
                  strokeOpacity={stage.active ? "1" : "0.28"}
                  strokeWidth={stage.active ? "1.5" : "1"}
                />
                <text
                  {...SVG_LABEL}
                  x={stage.x + 72}
                  y="33"
                  textAnchor="middle"
                  fill={stage.active ? "var(--crimson)" : "var(--charcoal)"}
                  fillOpacity={stage.active ? "1" : "0.75"}
                >
                  {stage.label}
                </text>
                {i < 3 && (
                  <g>
                    <path
                      d={`M${stage.x + 144} 29H${stage.x + 208}`}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.35"
                    />
                    <path
                      d={`M${stage.x + 201} 24L${stage.x + 208} 29L${stage.x + 201} 34`}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.5"
                    />
                  </g>
                )}
              </g>
            ))}
            <path
              d="M712 48V72H88V48"
              stroke="var(--crimson)"
              strokeWidth="1.25"
            />
            <path
              d="M83 55L88 48L93 55"
              stroke="var(--crimson)"
              strokeWidth="1.25"
            />
          </svg>
        </div>

        <div className="w-full">
          <div className="mt-8 flex w-full flex-wrap items-baseline justify-between gap-4 border-t border-[var(--charcoal)]/12 pt-5">
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
          02. WHY MARKETING BECAME AN ML DOMAIN: six data sources converge
          on one rule. The four machine methods sit in a ruled row. The
          strategic question closes as a signed verdict.
      ================================================================== */}
      <Slide id="why-marketing-ml" border align="left">
        <Head1 eyebrow="Opening">
          Why Marketing Became a Machine Learning Domain
        </Head1>

        <div className="w-full">
          <div className="mt-8 grid w-full max-w-5xl items-center gap-8 md:grid-cols-[1fr_minmax(0,22rem)] md:gap-12">
            <p className={BODY}>
              Modern marketing generates granular data from search, commerce,
              media, CRM, service, and product usage.
            </p>
            <svg
              role="img"
              aria-label="Six marketing streams from search, commerce, media, CRM, service, and product usage converging into granular data."
              viewBox="0 0 400 140"
              className="w-full"
              fill="none"
            >
              <title>
                Six marketing streams from search, commerce, media, CRM,
                service, and product usage converging into granular data.
              </title>
              {[
                "SEARCH",
                "COMMERCE",
                "MEDIA",
                "CRM",
                "SERVICE",
                "PRODUCT USAGE",
              ].map((src, i) => {
                const y = 15 + i * 22;
                return (
                  <g key={src}>
                    <text
                      {...SVG_LABEL}
                      x="118"
                      y={y + 3.5}
                      textAnchor="end"
                      fill="var(--charcoal)"
                      fillOpacity="0.65"
                    >
                      {src}
                    </text>
                    <path
                      d={`M126 ${y}H196`}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.2"
                    />
                    {[0, 1, 2, 3, 4].map((t) => {
                      const tx = 134 + t * 13 + ((i * 3 + t * 2) % 4);
                      return (
                        <path
                          key={t}
                          d={`M${tx} ${y - 3}v6`}
                          stroke="var(--charcoal)"
                          strokeOpacity="0.45"
                        />
                      );
                    })}
                    <path
                      d={`M196 ${y} C 232 ${y}, 244 70, 276 70`}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.28"
                    />
                  </g>
                );
              })}
              <path
                d="M276 70H292"
                stroke="var(--crimson)"
                strokeWidth="1.5"
              />
              <path
                d="M286 65L292 70L286 75"
                stroke="var(--crimson)"
                strokeWidth="1.5"
              />
              <rect
                x="292"
                y="44"
                width="104"
                height="52"
                fill="var(--crimson)"
                fillOpacity="0.06"
                stroke="var(--crimson)"
                strokeWidth="1.5"
              />
              <text
                {...SVG_LABEL}
                x="344"
                y="67"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                GRANULAR
              </text>
              <text
                {...SVG_LABEL}
                x="344"
                y="81"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                DATA
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-8 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-6">
            <p className={`${BODY} max-w-3xl`}>
              Many marketing choices are repeated allocation decisions, making
              them suitable for prediction, ranking, optimization, and
              experimentation.
            </p>
            <svg
              role="img"
              aria-label="Four panels showing prediction, ranking, optimization, and experimentation applied to repeated allocation decisions."
              viewBox="0 0 800 104"
              className="mt-5 w-full"
              fill="none"
            >
              <title>
                Four panels showing prediction, ranking, optimization, and
                experimentation applied to repeated allocation decisions.
              </title>
              {/* Panel 1: Prediction */}
              <path
                d="M16 26V72H176"
                stroke="var(--charcoal)"
                strokeOpacity="0.22"
              />
              {[
                [30, 62],
                [52, 54],
                [74, 58],
                [96, 46],
                [118, 40],
              ].map(([x, y]) => (
                <circle
                  key={`${x}-${y}`}
                  cx={x}
                  cy={y}
                  r="2.5"
                  fill="var(--charcoal)"
                  fillOpacity="0.45"
                />
              ))}
              <path
                d="M30 62L118 40"
                stroke="var(--charcoal)"
                strokeOpacity="0.45"
              />
              <path
                d="M118 40L158 28"
                stroke="var(--crimson)"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              <circle cx="158" cy="28" r="3.5" fill="var(--crimson)" />
              <text
                {...SVG_LABEL}
                x="96"
                y="94"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                PREDICTION
              </text>

              {/* Divider 1 */}
              <path
                d="M200 16V96"
                stroke="var(--charcoal)"
                strokeOpacity="0.12"
              />

              {/* Panel 2: Ranking */}
              {[
                { y: 28, w: 124, top: true },
                { y: 42, w: 94, top: false },
                { y: 56, w: 66, top: false },
                { y: 70, w: 40, top: false },
              ].map((b) => (
                <rect
                  key={b.y}
                  x="228"
                  y={b.y - 4}
                  width={b.w}
                  height="7"
                  fill={b.top ? "var(--crimson)" : "var(--charcoal)"}
                  fillOpacity={b.top ? "0.85" : "0.22"}
                />
              ))}
              <text
                {...SVG_LABEL}
                x="300"
                y="94"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                RANKING
              </text>

              {/* Divider 2 */}
              <path
                d="M400 16V96"
                stroke="var(--charcoal)"
                strokeOpacity="0.12"
              />

              {/* Panel 3: Optimization */}
              <path
                d="M424 72H576"
                stroke="var(--charcoal)"
                strokeOpacity="0.22"
              />
              <path
                d="M432 68 C 464 22, 512 22, 568 68"
                stroke="var(--charcoal)"
                strokeOpacity="0.45"
                strokeWidth="1.25"
              />
              <path
                d="M494 33V72"
                stroke="var(--crimson)"
                strokeOpacity="0.45"
                strokeDasharray="2 3"
              />
              <circle cx="494" cy="33" r="4" fill="var(--crimson)" />
              <text
                {...SVG_LABEL}
                x="500"
                y="94"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                OPTIMIZATION
              </text>

              {/* Divider 3 */}
              <path
                d="M600 16V96"
                stroke="var(--charcoal)"
                strokeOpacity="0.12"
              />

              {/* Panel 4: Experimentation */}
              <path
                d="M636 72H764"
                stroke="var(--charcoal)"
                strokeOpacity="0.22"
              />
              <rect
                x="658"
                y="44"
                width="32"
                height="28"
                fill="var(--charcoal)"
                fillOpacity="0.2"
              />
              <rect
                x="710"
                y="44"
                width="32"
                height="28"
                fill="var(--charcoal)"
                fillOpacity="0.2"
              />
              <rect
                x="710"
                y="26"
                width="32"
                height="18"
                fill="var(--crimson)"
              />
              <text
                {...SVG_LABEL}
                x="700"
                y="94"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                EXPERIMENTATION
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <figure className="mt-8 max-w-4xl border-l-2 border-[var(--crimson)] pl-6 md:pl-8">
            <div className={`${MICRO} text-[var(--champagne)]`}>
              The strategic question
            </div>
            <blockquote className="mt-2 font-serif text-[1.25rem] font-medium leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[1.75rem]">
              The strategic question is not where to &quot;use AI&quot; in
              isolation, but which customer and budget decisions should be
              machine-assisted.
            </blockquote>
          </figure>
        </div>
      </Slide>

      {/* ==================================================================
          03. CUSTOMER LIFECYCLE: six stages as a numbered chain, then the
          four things a firm must define before AI can help at any stage.
                                          [quiz: why-marketing-ml]
      ================================================================== */}
      <Slide
        id="customer-lifecycle"
        border
        align="left"
        quizData={quiz["customer-lifecycle"]}
      >
        <Head1 eyebrow="A chain of decisions">
          The Customer Lifecycle as a Decision Chain
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-8 max-w-3xl`}>
            Marketing spans awareness, consideration, conversion, retention,
            expansion, and advocacy.
          </p>
          <svg
            role="img"
            aria-label="Six connected lifecycle stages from awareness, consideration, conversion, retention, expansion, to advocacy."
            viewBox="0 0 800 84"
            className="mt-6 w-full max-w-5xl"
            fill="none"
          >
            <title>
              Six connected lifecycle stages from awareness, consideration,
              conversion, retention, expansion, to advocacy.
            </title>
            {[
              "AWARENESS",
              "CONSIDERATION",
              "CONVERSION",
              "RETENTION",
              "EXPANSION",
              "ADVOCACY",
            ].map((stage, i) => {
              const x = +(8 + i * 133).toFixed(2);
              const mark = i === 2;
              return (
                <g key={stage}>
                  <rect
                    x={x}
                    y="16"
                    width="116"
                    height="48"
                    fill={mark ? "var(--crimson)" : "none"}
                    fillOpacity={mark ? "0.06" : undefined}
                    stroke={mark ? "var(--crimson)" : "var(--charcoal)"}
                    strokeOpacity={mark ? "1" : "0.28"}
                    strokeWidth={mark ? "1.5" : "1"}
                  />
                  <text
                    {...SVG_LABEL}
                    x={+(x + 10).toFixed(2)}
                    y="33"
                    fill={mark ? "var(--crimson)" : "var(--champagne)"}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </text>
                  <text
                    {...SVG_LABEL}
                    x={+(x + 10).toFixed(2)}
                    y="51"
                    fill={mark ? "var(--crimson)" : "var(--charcoal)"}
                    fillOpacity={mark ? "1" : "0.8"}
                  >
                    {stage}
                  </text>
                  {i < 5 && (
                    <g>
                      <path
                        d={`M${+(x + 116).toFixed(2)} 40H${+(x + 133).toFixed(2)}`}
                        stroke="var(--charcoal)"
                        strokeOpacity="0.35"
                      />
                      <path
                        d={`M${+(x + 128).toFixed(2)} 36L${+(x + 133).toFixed(2)} 40L${+(x + 128).toFixed(2)} 44`}
                        stroke="var(--charcoal)"
                        strokeOpacity="0.5"
                      />
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        <div className="w-full">
          <div className="mt-10 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-7">
            <p className={`${BODY} max-w-3xl`}>
              AI can support each stage only when firms define the decision, the
              data, the action, and the success metric.
            </p>
            <svg
              role="img"
              aria-label="Four definitions required at each stage: the decision, the data, the action, and the success metric."
              viewBox="0 0 800 76"
              className="mt-5 w-full"
              fill="none"
            >
              <title>
                Four definitions required at each stage: the decision, the data,
                the action, and the success metric.
              </title>
              {[
                { label: "THE DECISION", x: 8, mark: false },
                { label: "THE DATA", x: 210, mark: false },
                { label: "THE ACTION", x: 412, mark: false },
                { label: "THE SUCCESS METRIC", x: 614, mark: true },
              ].map((item, i) => (
                <g key={item.label}>
                  <rect
                    x={item.x}
                    y="14"
                    width="178"
                    height="46"
                    fill={item.mark ? "var(--crimson)" : "none"}
                    fillOpacity={item.mark ? "0.06" : undefined}
                    stroke={item.mark ? "var(--crimson)" : "var(--charcoal)"}
                    strokeOpacity={item.mark ? "1" : "0.28"}
                    strokeWidth={item.mark ? "1.5" : "1"}
                  />
                  <text
                    {...SVG_LABEL}
                    x={item.x + 89}
                    y="41"
                    textAnchor="middle"
                    fill={item.mark ? "var(--crimson)" : "var(--charcoal)"}
                    fillOpacity={item.mark ? "1" : "0.75"}
                  >
                    {item.label}
                  </text>
                  {i < 3 && (
                    <g>
                      <path
                        d={`M${item.x + 178} 37H${item.x + 202}`}
                        stroke="var(--charcoal)"
                        strokeOpacity="0.35"
                      />
                      <path
                        d={`M${item.x + 196} 33L${item.x + 202} 37L${item.x + 196} 41`}
                        stroke="var(--charcoal)"
                        strokeOpacity="0.5"
                      />
                    </g>
                  )}
                </g>
              ))}
            </svg>
          </div>
        </div>

        <Verdict>
          This lifecycle view prevents leaders from reducing AI to content
          generation alone.
        </Verdict>
      </Slide>

      <ModulePlate1
        id="module-1"
        numeral="I"
        title="Sensing Demand and Consumers"
        lines={[
          "This section focuses on how firms infer needs, patterns, and heterogeneous customer value.",
          "The core managerial issue is signal quality: which data should guide segmentation, targeting, and positioning decisions.",
        ]}
      />

      {/* ==================================================================
          05. CONSUMER INSIGHT: the survey form beside the loose slips of
          what firms now read. Then noise passing through a lens into four
          clean readings. Then the say/do gap as two unequal rules.
      ================================================================== */}
      <Slide id="consumer-insight" border align="left">
        <Head1 eyebrow="Listening at scale">
          Consumer Insight from Unstructured Signals
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-8 max-w-4xl`}>
            Firms now learn from reviews, search queries, clickstreams, call
            transcripts, chat logs, and social conversation rather than only
            from surveys.
          </p>
          <svg
            role="img"
            aria-label="Comparison between structured surveys on the left and six unstructured signal sources on the right: reviews, search queries, clickstreams, call transcripts, chat logs, and social conversation."
            viewBox="0 0 800 108"
            className="mt-5 w-full max-w-5xl"
            fill="none"
          >
            <title>
              Comparison between structured surveys on the left and six
              unstructured signal sources on the right: reviews, search queries,
              clickstreams, call transcripts, chat logs, and social
              conversation.
            </title>
            {/* Left: Surveys */}
            <text
              {...SVG_LABEL}
              x="16"
              y="18"
              fill="var(--charcoal)"
              fillOpacity="0.55"
            >
              SURVEYS
            </text>
            <rect
              x="16"
              y="28"
              width="176"
              height="68"
              stroke="var(--charcoal)"
              strokeOpacity="0.25"
            />
            {[42, 62, 82].map((y) => (
              <g key={y}>
                <rect
                  x="30"
                  y={y - 4}
                  width="8"
                  height="8"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.4"
                />
                <path
                  d={`M48 ${y}H172`}
                  stroke="var(--charcoal)"
                  strokeOpacity="0.22"
                />
              </g>
            ))}

            {/* Divider */}
            <path
              d="M228 10V98"
              stroke="var(--charcoal)"
              strokeOpacity="0.14"
            />

            {/* Right: Unstructured signal sources */}
            {[
              { label: "REVIEWS", x: 260, y: 28 },
              { label: "SEARCH QUERIES", x: 524, y: 28 },
              { label: "CLICKSTREAMS", x: 260, y: 54 },
              { label: "CALL TRANSCRIPTS", x: 524, y: 54 },
              { label: "CHAT LOGS", x: 260, y: 80 },
              { label: "SOCIAL CONVERSATION", x: 524, y: 80 },
            ].map((item, idx) => {
              const mark = idx === 0;
              return (
                <g key={item.label}>
                  <rect
                    x={item.x}
                    y={item.y - 12}
                    width="244"
                    height="20"
                    fill={mark ? "var(--crimson)" : "none"}
                    fillOpacity={mark ? "0.06" : undefined}
                    stroke={mark ? "var(--crimson)" : "var(--charcoal)"}
                    strokeOpacity={mark ? "1" : "0.28"}
                    strokeWidth={mark ? "1.25" : "1"}
                  />
                  <text
                    {...SVG_LABEL}
                    x={item.x + 12}
                    y={item.y + 2}
                    fill={mark ? "var(--crimson)" : "var(--charcoal)"}
                    fillOpacity={mark ? "1" : "0.75"}
                  >
                    {item.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="w-full">
          <div className="mt-8 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-6">
            <p className={`${BODY} max-w-3xl`}>
              AI helps convert noisy text, image, and behavioral data into
              themes, sentiment patterns, emerging needs, and friction points.
            </p>
            <svg
              role="img"
              aria-label="Noisy text, image, and behavioral data converging through AI into themes, sentiment patterns, emerging needs, and friction points."
              viewBox="0 0 800 132"
              className="mt-5 w-full"
              fill="none"
            >
              <title>
                Noisy text, image, and behavioral data converging through AI
                into themes, sentiment patterns, emerging needs, and friction
                points.
              </title>
              {[
                { label: "TEXT", y: 30 },
                { label: "IMAGE", y: 66 },
                { label: "BEHAVIORAL DATA", y: 102 },
              ].map((inp) => (
                <g key={inp.label}>
                  <text
                    {...SVG_LABEL}
                    x="140"
                    y={inp.y + 3.5}
                    textAnchor="end"
                    fill="var(--charcoal)"
                    fillOpacity="0.6"
                  >
                    {inp.label}
                  </text>
                  <path
                    d={`M150 ${inp.y}L168 ${inp.y - 6}L184 ${inp.y + 5}L202 ${inp.y - 4}L220 ${inp.y + 6}L238 ${inp.y - 5}L256 ${inp.y}`}
                    stroke="var(--charcoal)"
                    strokeOpacity="0.38"
                  />
                  <path
                    d={`M256 ${inp.y} C 296 ${inp.y}, 316 66, 352 66`}
                    stroke="var(--charcoal)"
                    strokeOpacity="0.25"
                  />
                </g>
              ))}
              <rect
                x="352"
                y="46"
                width="64"
                height="40"
                fill="var(--crimson)"
                fillOpacity="0.06"
                stroke="var(--crimson)"
                strokeWidth="1.5"
              />
              <text
                {...SVG_LABEL}
                x="384"
                y="70"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                AI
              </text>
              {[
                "THEMES",
                "SENTIMENT PATTERNS",
                "EMERGING NEEDS",
                "FRICTION POINTS",
              ].map((label, i) => {
                const y = 21 + i * 30;
                const mark = i === 3;
                return (
                  <g key={label}>
                    <path
                      d={`M416 66 C 456 66, 468 ${y}, 508 ${y}`}
                      stroke={mark ? "var(--crimson)" : "var(--charcoal)"}
                      strokeOpacity={mark ? "0.7" : "0.28"}
                    />
                    <path
                      d={`M508 ${y}H548`}
                      stroke={mark ? "var(--crimson)" : "var(--charcoal)"}
                      strokeWidth={mark ? "1.5" : "1"}
                      strokeOpacity={mark ? "1" : "0.45"}
                    />
                    <text
                      {...SVG_LABEL}
                      x="558"
                      y={y + 3.5}
                      fill={mark ? "var(--crimson)" : "var(--charcoal)"}
                      fillOpacity={mark ? "1" : "0.7"}
                    >
                      {label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-8 grid w-full max-w-5xl items-center gap-8 border-l border-[var(--charcoal)]/25 pl-6 md:grid-cols-[1fr_22rem] md:gap-12">
            <p className="font-serif text-lg leading-[1.6] text-[var(--charcoal-light)] md:text-[1.25rem]">
              Insight quality still depends on sampling logic, data provenance,
              and the difference between what consumers say and what they
              actually do.
            </p>
            <svg
              role="img"
              aria-label="Bar comparison showing the difference between what consumers say and what they actually do."
              viewBox="0 0 400 84"
              className="w-full"
              fill="none"
            >
              <title>
                Bar comparison showing the difference between what consumers say
                and what they actually do.
              </title>
              <text
                {...SVG_LABEL}
                x="164"
                y="29"
                textAnchor="end"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                WHAT CONSUMERS SAY
              </text>
              <rect
                x="174"
                y="19"
                width="210"
                height="12"
                fill="var(--charcoal)"
                fillOpacity="0.22"
              />
              <text
                {...SVG_LABEL}
                x="164"
                y="59"
                textAnchor="end"
                fill="var(--crimson)"
              >
                WHAT THEY ACTUALLY DO
              </text>
              <rect
                x="174"
                y="49"
                width="116"
                height="12"
                fill="var(--crimson)"
              />
              <path
                d="M290 49H384V61H290"
                stroke="var(--crimson)"
                strokeOpacity="0.5"
                strokeDasharray="3 3"
              />
              <text
                {...SVG_LABEL}
                x="337"
                y="76"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                DIFFERENCE
              </text>
            </svg>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          06. SEGMENTATION: the same customers cut two ways. Left: even
          demographic bands that ignore where people actually sit. Right:
          clusters drawn around the people.            [quiz topic]
      ================================================================== */}
      <Slide id="segmentation" border align="left">
        <Head1 eyebrow="Who belongs together">
          Segmentation Beyond Static Demographics
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-8 max-w-4xl`}>
            AI-based segmentation groups customers using behavior, value, needs,
            responsiveness, or risk instead of relying only on age or income.
          </p>
        </div>

        <div className="mt-6 grid w-full max-w-5xl gap-8 md:grid-cols-2 md:gap-0">
          {[
            {
              key: "static",
              label: "Age or income",
              tone: "text-[var(--charcoal-light)]/50",
              pad: "md:pr-12",
              title:
                "Static demographic bands cutting through natural customer clusters along age or income.",
            },
            {
              key: "behavioral",
              label: "Behavior, value, needs, responsiveness, or risk",
              tone: "text-[var(--crimson)]",
              pad: "md:border-l md:border-[var(--charcoal)]/12 md:pl-12",
              title:
                "AI-based segmentation grouping customers into three natural clusters with one high-priority cluster marked in crimson.",
            },
          ].map((panel, p) => (
            <div key={panel.key} className={panel.pad}>
              <div className={`${MICRO} ${panel.tone}`}>{panel.label}</div>
              <svg
                role="img"
                aria-label={panel.title}
                viewBox="0 0 400 148"
                className="mt-4 w-full"
                fill="none"
              >
                <title>{panel.title}</title>
                <rect
                  x="8"
                  y="8"
                  width="384"
                  height="132"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.18"
                />
                {p === 0 ? (
                  [104, 200, 296].map((x) => (
                    <path
                      key={x}
                      d={`M${x} 8V140`}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.28"
                      strokeDasharray="3 4"
                    />
                  ))
                ) : (
                  <>
                    <ellipse
                      cx="92"
                      cy="50"
                      rx="60"
                      ry="32"
                      stroke="var(--charcoal)"
                      strokeOpacity="0.45"
                    />
                    <ellipse
                      cx="286"
                      cy="46"
                      rx="68"
                      ry="30"
                      fill="var(--crimson)"
                      fillOpacity="0.06"
                      stroke="var(--crimson)"
                      strokeWidth="1.5"
                    />
                    <ellipse
                      cx="196"
                      cy="108"
                      rx="70"
                      ry="24"
                      stroke="var(--charcoal)"
                      strokeOpacity="0.45"
                    />
                  </>
                )}
                {[
                  [52, 42, 0],
                  [72, 64, 0],
                  [84, 34, 0],
                  [124, 56, 0],
                  [64, 52, 0],
                  [134, 42, 0],
                  [238, 42, 1],
                  [262, 30, 1],
                  [278, 54, 1],
                  [318, 40, 1],
                  [334, 56, 1],
                  [312, 28, 1],
                  [146, 108, 2],
                  [172, 100, 2],
                  [184, 118, 2],
                  [220, 106, 2],
                  [242, 114, 2],
                  [216, 118, 2],
                ].map(([x, y, c]) => {
                  const mark = p === 1 && c === 1;
                  return (
                    <circle
                      key={`${x}-${y}`}
                      cx={x}
                      cy={y}
                      r="3.5"
                      fill={mark ? "var(--crimson)" : "var(--charcoal)"}
                      fillOpacity={mark ? 0.9 : 0.4}
                    />
                  );
                })}
              </svg>
            </div>
          ))}
        </div>

        <div className="w-full">
          <div className="mt-8 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-6">
            <p className={`${BODY} max-w-3xl`}>
              Useful segments are stable enough to act on, distinct enough to
              prioritize, and explainable enough for managers to deploy.
            </p>
            <div className="mt-5 grid grid-cols-3 gap-4 md:max-w-xl">
              {["Stable", "Distinct", "Explainable"].map((test, i) => (
                <div
                  key={test}
                  className="border-t-2 border-[var(--crimson)]/60 pt-3"
                >
                  <span className={`${MICRO} text-[var(--champagne)]`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-1 block font-serif text-[1rem] font-medium tracking-normal text-[var(--charcoal)]">
                    {test}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-8 grid w-full max-w-5xl items-center gap-8 border-t border-[var(--charcoal)]/10 pt-6 md:grid-cols-[1fr_22rem] md:gap-12">
            <p className="font-serif text-[1.25rem] font-medium leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[1.625rem]">
              More segments are not always better. Excessive granularity can
              raise complexity without improving decisions.
            </p>
            <figure>
              <svg
                role="img"
                aria-label="Chart showing complexity rising steeply in crimson while decision quality plateaus as more segments are added."
                viewBox="0 0 400 124"
                className="w-full"
                fill="none"
              >
                <title>
                  Chart showing complexity rising steeply in crimson while
                  decision quality plateaus as more segments are added.
                </title>
                <path
                  d="M16 10v90h256"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.25"
                />
                <path
                  d="M16 96 C 112 92, 200 66, 264 16"
                  stroke="var(--crimson)"
                  strokeWidth="1.5"
                />
                <path
                  d="M16 96 C 64 58, 136 52, 264 50"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.55"
                  strokeWidth="1.25"
                />
                <text {...SVG_LABEL} x="276" y="20" fill="var(--crimson)">
                  COMPLEXITY
                </text>
                <text
                  {...SVG_LABEL}
                  x="276"
                  y="54"
                  fill="var(--charcoal)"
                  fillOpacity="0.65"
                >
                  DECISIONS
                </text>
                <text
                  {...SVG_LABEL}
                  x="272"
                  y="116"
                  textAnchor="end"
                  fill="var(--charcoal)"
                  fillOpacity="0.5"
                >
                  MORE SEGMENTS →
                </text>
              </svg>
            </figure>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          07. TARGETING: one audience pool ranked three times, once per
          objective, so the ranking visibly changes with the goal. Then the
          rule revised along a signal timeline.     [quiz: segmentation]
      ================================================================== */}
      <Slide
        id="targeting"
        border
        align="left"
        quizData={quiz["targeting"]}
      >
        <Head1 eyebrow="Who sees what">
          Targeting and Next-Best-Audience Decisions
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-8 max-w-4xl`}>
            Targeting systems estimate which audience is most likely to respond
            under a given objective such as reach, conversion, or retention.
          </p>
          <svg
            role="img"
            aria-label="Three panels showing audience response rankings under reach, conversion, and retention objectives, with the top audience marked in crimson."
            viewBox="0 0 800 112"
            className="mt-5 w-full max-w-5xl"
            fill="none"
          >
            <title>
              Three panels showing audience response rankings under reach,
              conversion, and retention objectives, with the top audience marked
              in crimson.
            </title>
            {[
              {
                objective: "REACH",
                x: 16,
                bars: [188, 136, 92, 54],
                winner: 0,
                mark: false,
              },
              {
                objective: "CONVERSION",
                x: 292,
                bars: [108, 64, 180, 84],
                winner: 2,
                mark: true,
              },
              {
                objective: "RETENTION",
                x: 568,
                bars: [48, 88, 124, 176],
                winner: 3,
                mark: false,
              },
            ].map((col, idx) => (
              <g key={col.objective}>
                {idx > 0 && (
                  <path
                    d={`M${col.x - 24} 12V100`}
                    stroke="var(--charcoal)"
                    strokeOpacity="0.14"
                  />
                )}
                <text
                  {...SVG_LABEL}
                  x={col.x}
                  y="20"
                  fill={col.mark ? "var(--crimson)" : "var(--champagne)"}
                >
                  {col.objective}
                </text>
                {col.bars.map((w, r) => {
                  const y = 36 + r * 18;
                  const top = r === col.winner;
                  const lit = top && col.mark;
                  return (
                    <g key={r}>
                      <text
                        {...SVG_LABEL}
                        x={col.x}
                        y={y + 6}
                        fill={lit ? "var(--crimson)" : "var(--charcoal)"}
                        fillOpacity={lit ? "1" : top ? "0.8" : "0.45"}
                      >
                        {String(r + 1).padStart(2, "0")}
                      </text>
                      <rect
                        x={col.x + 26}
                        y={y - 2}
                        width={w}
                        height="8"
                        fill={lit ? "var(--crimson)" : "var(--charcoal)"}
                        fillOpacity={lit ? "0.9" : top ? "0.55" : "0.18"}
                      />
                    </g>
                  );
                })}
              </g>
            ))}
          </svg>
        </div>

        <div className="w-full">
          <div className="mt-8 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-6">
            <p className={`${BODY} max-w-3xl`}>
              The practical output is often a next-best-audience rule that
              updates as new signals arrive.
            </p>
            <svg
              role="img"
              aria-label="Timeline showing a next-best-audience rule that updates as new signals arrive."
              viewBox="0 0 800 84"
              className="mt-5 w-full"
              fill="none"
            >
              <title>
                Timeline showing a next-best-audience rule that updates as new
                signals arrive.
              </title>
              <path
                d="M16 42H784"
                stroke="var(--charcoal)"
                strokeOpacity="0.22"
              />
              {[180, 220, 260, 460, 500, 540].map((x) => (
                <path
                  key={x}
                  d={`M${x} 34v16`}
                  stroke="var(--charcoal)"
                  strokeOpacity="0.4"
                />
              ))}
              <text
                {...SVG_LABEL}
                x="220"
                y="22"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.55"
              >
                NEW SIGNALS
              </text>
              <text
                {...SVG_LABEL}
                x="500"
                y="22"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.55"
              >
                NEW SIGNALS
              </text>
              {[
                { x: 80, label: "RULE", active: false },
                { x: 360, label: "UPDATES", active: false },
                { x: 660, label: "NEXT-BEST-AUDIENCE RULE", active: true },
              ].map((r) => (
                <g key={r.x}>
                  <rect
                    x={r.x - 6}
                    y="36"
                    width="12"
                    height="12"
                    fill={r.active ? "var(--crimson)" : "var(--surface)"}
                    stroke={r.active ? "var(--crimson)" : "var(--charcoal)"}
                    strokeOpacity={r.active ? "1" : "0.55"}
                    strokeWidth="1.5"
                  />
                  <text
                    {...SVG_LABEL}
                    x={r.x}
                    y="70"
                    textAnchor="middle"
                    fill={r.active ? "var(--crimson)" : "var(--charcoal)"}
                    fillOpacity={r.active ? "1" : "0.65"}
                  >
                    {r.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-8 max-w-4xl border border-[var(--crimson)]/45 p-6 md:p-8">
            <div className={`${MICRO} text-[var(--crimson)]`}>Test it</div>
            <p className="mt-3 font-serif text-xl leading-[1.4] text-[var(--charcoal)] md:text-[1.5rem]">
              Managers should test whether algorithmic targeting improves
              business value or merely shifts exposure toward already active
              customers.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          08. POSITIONING: a resonance grid of claims, benefits and proof
          points. Then the line between what models detect and what
          leadership decides.
      ================================================================== */}
      <Slide id="positioning" border align="left">
        <Head1 eyebrow="What resonates">
          Positioning Intelligence and Message-Market Fit
        </Head1>

        <div className="mt-8 grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1fr_22rem] md:gap-14">
          <div>
            <p className={BODY}>
              AI can surface which claims, benefits, or proof points resonate
              across segments, channels, and contexts.
            </p>
          </div>
          <div>
            <svg
              role="img"
              aria-label="Resonance matrix of claims, benefits, and proof points across segments, channels, and contexts, with the strongest cell marked in crimson."
              viewBox="0 0 400 136"
              className="w-full"
              fill="none"
            >
              <title>
                Resonance matrix of claims, benefits, and proof points across
                segments, channels, and contexts, with the strongest cell marked
                in crimson.
              </title>
              {[
                { label: "SEGMENTS", x: 168 },
                { label: "CHANNELS", x: 258 },
                { label: "CONTEXTS", x: 348 },
              ].map((col) => (
                <text
                  key={col.label}
                  {...SVG_LABEL}
                  x={col.x}
                  y="20"
                  textAnchor="middle"
                  fill="var(--charcoal)"
                  fillOpacity="0.55"
                >
                  {col.label}
                </text>
              ))}
              {[
                { row: "CLAIMS", y: 32, cells: [0.14, 0.38, 0.22] },
                { row: "BENEFITS", y: 66, cells: [0.28, 1, 0.18] },
                { row: "PROOF POINTS", y: 100, cells: [0.2, 0.12, 0.44] },
              ].map((r, ri) => (
                <g key={r.row}>
                  <text
                    {...SVG_LABEL}
                    x="114"
                    y={r.y + 16}
                    textAnchor="end"
                    fill={ri === 1 ? "var(--crimson)" : "var(--charcoal)"}
                    fillOpacity={ri === 1 ? "1" : "0.65"}
                  >
                    {r.row}
                  </text>
                  {r.cells.map((v, ci) => {
                    const cx = 128 + ci * 90;
                    const mark = ri === 1 && ci === 1;
                    return (
                      <rect
                        key={ci}
                        x={cx}
                        y={r.y}
                        width="80"
                        height="24"
                        fill={mark ? "var(--crimson)" : "var(--charcoal)"}
                        fillOpacity={mark ? 0.85 : v}
                        stroke={mark ? "var(--crimson)" : "var(--charcoal)"}
                        strokeOpacity={mark ? 1 : 0.2}
                      />
                    );
                  })}
                </g>
              ))}
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-8 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-6">
            <p className={`${BODY} max-w-3xl`}>
              This supports faster refinement of value propositions, creative
              briefs, and channel-specific narratives.
            </p>
            <svg
              role="img"
              aria-label="Refinement chain linking value propositions, creative briefs, and channel-specific narratives."
              viewBox="0 0 800 76"
              className="mt-5 w-full"
              fill="none"
            >
              <title>
                Refinement chain linking value propositions, creative briefs,
                and channel-specific narratives.
              </title>
              {[
                { label: "VALUE PROPOSITIONS", x: 16, mark: false },
                { label: "CREATIVE BRIEFS", x: 288, mark: false },
                { label: "CHANNEL-SPECIFIC NARRATIVES", x: 560, mark: true },
              ].map((box, i) => (
                <g key={box.label}>
                  <rect
                    x={box.x}
                    y="16"
                    width="224"
                    height="44"
                    fill={box.mark ? "var(--crimson)" : "none"}
                    fillOpacity={box.mark ? "0.06" : undefined}
                    stroke={box.mark ? "var(--crimson)" : "var(--charcoal)"}
                    strokeOpacity={box.mark ? "1" : "0.28"}
                    strokeWidth={box.mark ? "1.5" : "1"}
                  />
                  <text
                    {...SVG_LABEL}
                    x={box.x + 112}
                    y="42"
                    textAnchor="middle"
                    fill={box.mark ? "var(--crimson)" : "var(--charcoal)"}
                    fillOpacity={box.mark ? "1" : "0.75"}
                  >
                    {box.label}
                  </text>
                  {i < 2 && (
                    <g>
                      <path
                        d={`M${box.x + 224} 38H${box.x + 272}`}
                        stroke="var(--charcoal)"
                        strokeOpacity="0.35"
                      />
                      <path
                        d={`M${box.x + 266} 34L${box.x + 272} 38L${box.x + 266} 42`}
                        stroke="var(--charcoal)"
                        strokeOpacity="0.5"
                      />
                    </g>
                  )}
                </g>
              ))}
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-8 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-6">
            <p className="max-w-4xl font-serif text-[1.25rem] font-medium leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[1.75rem]">
              Positioning remains a strategic choice. Models can detect
              patterns, but leadership must decide what the brand should stand
              for.
            </p>
            <div
              aria-hidden
              className="mt-5 grid max-w-3xl grid-cols-2 border-b border-[var(--charcoal)]/15 pb-3"
            >
              <span className={`${MICRO} text-[var(--charcoal-light)]/55`}>
                Models | detect patterns
              </span>
              <span
                className={`${MICRO} border-l border-[var(--crimson)]/40 pl-6 text-[var(--crimson)]`}
              >
                Leadership | must decide
              </span>
            </div>
          </div>
        </div>
      </Slide>

      <ModulePlate1
        id="module-2"
        numeral="II"
        title="Personalization and Commercial Engines"
        lines={[
          "This section moves from insight generation to individual-level treatment decisions in commerce and promotion.",
          "The central issue is balancing relevance, revenue, and brand coherence across millions of interactions.",
        ]}
      />

      {/* ==================================================================
          10. PERSONALIZATION AS POLICY: the merge-field greeting set faint
          and struck, against four policy dials. The stop conditions as a
          rule list. The trust curve that rises and then turns over.
      ================================================================== */}
      <Slide id="personalization" border align="left">
        <Head1 eyebrow="A policy, not a mail merge">
          Personalization as a Managed Policy
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-7 max-w-4xl`}>
            Personalization is not just inserting a name into a message. It is
            choosing which offer, content, timing, and channel best fit a
            customer state.
          </p>
          <svg
            role="img"
            aria-label="Struck-through name into a message contrasted with choosing offer, content, timing, and channel to fit a customer state."
            viewBox="0 0 800 84"
            className="mt-4 w-full max-w-5xl"
            fill="none"
          >
            <title>
              Struck-through name into a message contrasted with choosing offer,
              content, timing, and channel to fit a customer state.
            </title>
            {/* Left: dashed box for name into a message */}
            <rect
              x="16"
              y="18"
              width="196"
              height="48"
              stroke="var(--charcoal)"
              strokeOpacity="0.22"
              strokeDasharray="3 3"
            />
            <text
              {...SVG_LABEL}
              x="114"
              y="46"
              textAnchor="middle"
              fill="var(--charcoal)"
              fillOpacity="0.45"
            >
              NAME INTO A MESSAGE
            </text>

            <path
              d="M236 10V74"
              stroke="var(--charcoal)"
              strokeOpacity="0.14"
            />

            {/* Right: Customer state -> Offer, Content, Timing, Channel */}
            <rect
              x="260"
              y="18"
              width="140"
              height="48"
              fill="var(--crimson)"
              fillOpacity="0.06"
              stroke="var(--crimson)"
              strokeWidth="1.5"
            />
            <text
              {...SVG_LABEL}
              x="330"
              y="46"
              textAnchor="middle"
              fill="var(--crimson)"
            >
              CUSTOMER STATE
            </text>
            <path
              d="M400 42H436"
              stroke="var(--crimson)"
              strokeWidth="1.25"
            />
            <path
              d="M430 38L436 42L430 46"
              stroke="var(--crimson)"
              strokeWidth="1.25"
            />
            {[
              { dial: "OFFER", x: 444, pick: 1 },
              { dial: "CONTENT", x: 532, pick: 2 },
              { dial: "TIMING", x: 620, pick: 0 },
              { dial: "CHANNEL", x: 708, pick: 1 },
            ].map((d) => (
              <g key={d.dial}>
                <text
                  {...SVG_LABEL}
                  x={d.x + 38}
                  y="24"
                  textAnchor="middle"
                  fill="var(--charcoal)"
                  fillOpacity="0.65"
                >
                  {d.dial}
                </text>
                {[0, 1, 2].map((o) => {
                  const bx = d.x + o * 26;
                  const chosen = o === d.pick;
                  return (
                    <rect
                      key={o}
                      x={bx}
                      y="34"
                      width="22"
                      height="24"
                      fill={chosen ? "var(--charcoal)" : "none"}
                      fillOpacity={chosen ? "0.7" : undefined}
                      stroke="var(--charcoal)"
                      strokeOpacity={chosen ? "0.8" : "0.25"}
                    />
                  );
                })}
              </g>
            ))}
          </svg>
        </div>

        <div className="mt-7 grid w-full max-w-5xl gap-10 border-t border-[var(--charcoal)]/10 pt-6 md:grid-cols-2 md:gap-0">
          <div className="md:pr-10">
            <div className={`${MICRO} text-[var(--crimson)]`}>
              When not to personalize
            </div>
            <p className={`${BODY} mt-3`}>
              Effective personalization requires rules for when not to
              personalize, especially when data is sparse, sensitive, or likely
              to overfit recent behavior.
            </p>
            <svg
              role="img"
              aria-label="Three stop rules blocking personalization when data is sparse, sensitive, or likely to overfit recent behavior."
              viewBox="0 0 400 96"
              className="mt-4 w-full"
              fill="none"
            >
              <title>
                Three stop rules blocking personalization when data is sparse,
                sensitive, or likely to overfit recent behavior.
              </title>
              {[
                { label: "SPARSE", y: 20 },
                { label: "SENSITIVE", y: 48 },
                { label: "OVERFIT RECENT BEHAVIOR", y: 76 },
              ].map((c) => (
                <g key={c.label}>
                  <text
                    {...SVG_LABEL}
                    x="204"
                    y={c.y + 4}
                    textAnchor="end"
                    fill="var(--charcoal)"
                    fillOpacity="0.7"
                  >
                    {c.label}
                  </text>
                  <path
                    d={`M214 ${c.y}H268`}
                    stroke="var(--charcoal)"
                    strokeOpacity="0.3"
                    strokeDasharray="3 3"
                  />
                </g>
              ))}
              <path
                d="M268 10V86"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <text
                {...SVG_LABEL}
                x="282"
                y="45"
                fill="var(--crimson)"
              >
                WHEN NOT TO
              </text>
              <text
                {...SVG_LABEL}
                x="282"
                y="59"
                fill="var(--crimson)"
              >
                PERSONALIZE
              </text>
            </svg>
          </div>

          <div className="md:border-l md:border-[var(--charcoal)]/12 md:pl-10">
            <div className={`${MICRO} text-[var(--charcoal-light)]/55`}>
              Over-personalization
            </div>
            <p className={`${BODY} mt-3`}>
              Over-personalization can feel intrusive, narrow exploration, and
              erode trust if consumers perceive manipulation.
            </p>
            <figure className="mt-4">
              <svg
                role="img"
                aria-label="Curve showing trust rising with helpful personalization and then eroding in crimson when over-personalization feels intrusive."
                viewBox="0 0 400 96"
                className="w-full"
                fill="none"
              >
                <title>
                  Curve showing trust rising with helpful personalization and
                  then eroding in crimson when over-personalization feels
                  intrusive.
                </title>
                <path
                  d="M16 10v64h368"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.22"
                />
                <path
                  d="M16 68 C 84 26, 148 16, 200 20"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.55"
                  strokeWidth="1.5"
                />
                <path
                  d="M200 20 C 264 26, 316 54, 372 70"
                  stroke="var(--crimson)"
                  strokeWidth="1.75"
                />
                <path
                  d="M200 12V74"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.22"
                  strokeDasharray="2 3"
                />
                <text
                  {...SVG_LABEL}
                  x="28"
                  y="24"
                  fill="var(--charcoal)"
                  fillOpacity="0.55"
                >
                  TRUST
                </text>
                <text
                  {...SVG_LABEL}
                  x="372"
                  y="32"
                  textAnchor="end"
                  fill="var(--crimson)"
                >
                  INTRUSIVE
                </text>
                <text
                  {...SVG_LABEL}
                  x="384"
                  y="90"
                  textAnchor="end"
                  fill="var(--charcoal)"
                  fillOpacity="0.5"
                >
                  OVER-PERSONALIZATION →
                </text>
              </svg>
            </figure>
          </div>
        </div>

        <Discussion1>
          Where should a firm draw the line between helpful relevance and
          surveillance-like personalization in its category?
        </Discussion1>
      </Slide>

      {/* ==================================================================
          11. RECOMMENDATION SYSTEMS: a ranked shelf where constraints
          reorder the list. The objective left as an open choice for
          leaders. Three failure modes struck through.   [quiz topic]
      ================================================================== */}
      <Slide id="recommendation-systems" border align="left">
        <Head1 eyebrow="Ranking under constraints">
          Recommendation Systems in Commerce
        </Head1>

        <div className="mt-8 grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1fr_22rem] md:gap-14">
          <div>
            <p className={BODY}>
              Recommendation systems rank products, services, or content by
              expected relevance under business constraints such as inventory,
              margin, or strategic assortment.
            </p>
          </div>
          <div>
            <svg
              role="img"
              aria-label="Ranked list of products, services, and content by expected relevance adjusted for inventory, margin, and strategic assortment constraints."
              viewBox="0 0 400 140"
              className="w-full"
              fill="none"
            >
              <title>
                Ranked list of products, services, and content by expected
                relevance adjusted for inventory, margin, and strategic
                assortment constraints.
              </title>
              <text
                {...SVG_LABEL}
                x="12"
                y="18"
                fill="var(--charcoal)"
                fillOpacity="0.55"
              >
                EXPECTED RELEVANCE
              </text>
              <text
                {...SVG_LABEL}
                x="388"
                y="18"
                textAnchor="end"
                fill="var(--charcoal)"
                fillOpacity="0.55"
              >
                BUSINESS CONSTRAINTS
              </text>
              {[
                {
                  rank: "01",
                  item: "PRODUCTS",
                  w: 120,
                  constraint: "INVENTORY",
                  blocked: true,
                  chosen: false,
                },
                {
                  rank: "02",
                  item: "SERVICES",
                  w: 102,
                  constraint: "MARGIN",
                  blocked: false,
                  chosen: true,
                },
                {
                  rank: "03",
                  item: "CONTENT",
                  w: 84,
                  constraint: "",
                  blocked: false,
                  chosen: false,
                },
                {
                  rank: "04",
                  item: "PRODUCTS",
                  w: 62,
                  constraint: "STRATEGIC ASSORTMENT",
                  blocked: false,
                  chosen: false,
                },
              ].map((row, i) => {
                const y = 38 + i * 26;
                return (
                  <g key={row.rank}>
                    <text
                      {...SVG_LABEL}
                      x="12"
                      y={y + 4}
                      fill={
                        row.chosen ? "var(--crimson)" : "var(--champagne)"
                      }
                      fillOpacity={row.blocked ? "0.4" : "1"}
                    >
                      {row.rank}
                    </text>
                    <text
                      {...SVG_LABEL}
                      x="38"
                      y={y + 4}
                      fill={row.chosen ? "var(--crimson)" : "var(--charcoal)"}
                      fillOpacity={
                        row.blocked ? "0.35" : row.chosen ? "1" : "0.7"
                      }
                    >
                      {row.item}
                    </text>
                    <rect
                      x="118"
                      y={y - 4}
                      width={row.w}
                      height="8"
                      fill={
                        row.blocked
                          ? "none"
                          : row.chosen
                            ? "var(--crimson)"
                            : "var(--charcoal)"
                      }
                      fillOpacity={row.chosen ? "0.9" : "0.22"}
                      stroke={row.blocked ? "var(--charcoal)" : "none"}
                      strokeOpacity={row.blocked ? "0.3" : undefined}
                      strokeDasharray={row.blocked ? "2 2" : undefined}
                    />
                    {row.constraint && (
                      <text
                        {...SVG_LABEL}
                        x="388"
                        y={y + 4}
                        textAnchor="end"
                        fill={
                          row.chosen ? "var(--crimson)" : "var(--charcoal)"
                        }
                        fillOpacity={
                          row.blocked ? "0.4" : row.chosen ? "1" : "0.6"
                        }
                      >
                        {row.constraint}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-8 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-6">
            <p className={`${BODY} max-w-3xl`}>
              In practice, leaders must decide whether the system should
              maximize immediate conversion, long-term value, basket size, or
              discovery.
            </p>
            <svg
              role="img"
              aria-label="Four candidate recommender objectives: immediate conversion, long-term value selected in crimson, basket size, and discovery."
              viewBox="0 0 800 72"
              className="mt-5 w-full"
              fill="none"
            >
              <title>
                Four candidate recommender objectives: immediate conversion,
                long-term value selected in crimson, basket size, and discovery.
              </title>
              {[
                { label: "IMMEDIATE CONVERSION", x: 8, mark: false },
                { label: "LONG-TERM VALUE", x: 210, mark: true },
                { label: "BASKET SIZE", x: 412, mark: false },
                { label: "DISCOVERY", x: 614, mark: false },
              ].map((obj) => (
                <g key={obj.label}>
                  <rect
                    x={obj.x}
                    y="14"
                    width="178"
                    height="44"
                    fill={obj.mark ? "var(--crimson)" : "none"}
                    fillOpacity={obj.mark ? "0.06" : undefined}
                    stroke={obj.mark ? "var(--crimson)" : "var(--charcoal)"}
                    strokeOpacity={obj.mark ? "1" : "0.28"}
                    strokeWidth={obj.mark ? "1.5" : "1"}
                  />
                  <text
                    {...SVG_LABEL}
                    x={obj.x + 89}
                    y="40"
                    textAnchor="middle"
                    fill={obj.mark ? "var(--crimson)" : "var(--charcoal)"}
                    fillOpacity={obj.mark ? "1" : "0.7"}
                  >
                    {obj.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-8 max-w-4xl border-l-2 border-[var(--crimson)] pl-6 md:pl-8">
            <p className="font-serif text-xl leading-[1.4] text-[var(--charcoal)] md:text-[1.5rem]">
              Poorly designed recommenders can create filter bubbles,
              over-promote familiar items, and suppress strategic new offerings.
            </p>
            <div
              aria-hidden
              className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-serif text-[0.9375rem] italic tracking-normal text-[var(--crimson)]"
            >
              <span>filter bubbles</span>
              <span>|</span>
              <span>over-promote familiar items</span>
              <span>|</span>
              <span>suppress strategic new offerings</span>
            </div>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          12. CREATIVE SYSTEMS: one master fanning into variants. Then the
          same generator drawn twice: isolated on the left, tethered to its
          three anchors on the right.    [quiz: recommendation-systems]
      ================================================================== */}
      <Slide
        id="creative-systems"
        border
        align="left"
        quizData={quiz["creative-systems"]}
      >
        <Head1 eyebrow="Content operations">
          Creative Systems and Content Operations
        </Head1>

        <div className="mt-8 grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1fr_22rem] md:gap-14">
          <div>
            <p className={BODY}>
              Generative tools can accelerate variant creation, copy testing,
              image adaptation, and localization across campaigns.
            </p>
          </div>
          <div>
            <svg
              role="img"
              aria-label="Generative tools fanning out into variant creation, copy testing, image adaptation, and localization."
              viewBox="0 0 400 124"
              className="w-full"
              fill="none"
            >
              <title>
                Generative tools fanning out into variant creation, copy
                testing, image adaptation, and localization.
              </title>
              <rect
                x="12"
                y="42"
                width="132"
                height="40"
                fill="var(--crimson)"
                fillOpacity="0.06"
                stroke="var(--crimson)"
                strokeWidth="1.5"
              />
              <text
                {...SVG_LABEL}
                x="78"
                y="60"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                GENERATIVE
              </text>
              <text
                {...SVG_LABEL}
                x="78"
                y="73"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                TOOLS
              </text>
              {[
                { label: "VARIANT CREATION", y: 20 },
                { label: "COPY TESTING", y: 48 },
                { label: "IMAGE ADAPTATION", y: 76 },
                { label: "LOCALIZATION", y: 104 },
              ].map((item) => (
                <g key={item.label}>
                  <path
                    d={`M144 62 C 180 62, 188 ${item.y}, 220 ${item.y}`}
                    stroke="var(--charcoal)"
                    strokeOpacity="0.32"
                  />
                  <circle
                    cx="220"
                    cy={item.y}
                    r="2.5"
                    fill="var(--charcoal)"
                    fillOpacity="0.55"
                  />
                  <text
                    {...SVG_LABEL}
                    x="232"
                    y={item.y + 3.5}
                    fill="var(--charcoal)"
                    fillOpacity="0.75"
                  >
                    {item.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-8 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-6">
            <p className={`${BODY} max-w-4xl`}>
              The real value comes when creative generation is tied to response
              data, brand guidelines, and workflow review rather than treated as
              an isolated production tool.
            </p>
            <svg
              role="img"
              aria-label="Isolated production tool on the left contrasted with creative generation tied to response data, brand guidelines, and workflow review on the right."
              viewBox="0 0 800 116"
              className="mt-5 w-full"
              fill="none"
            >
              <title>
                Isolated production tool on the left contrasted with creative
                generation tied to response data, brand guidelines, and workflow
                review on the right.
              </title>
              {/* Left: Isolated production tool */}
              <rect
                x="24"
                y="34"
                width="176"
                height="48"
                stroke="var(--charcoal)"
                strokeOpacity="0.25"
                strokeDasharray="3 3"
              />
              <text
                {...SVG_LABEL}
                x="112"
                y="55"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.45"
              >
                ISOLATED
              </text>
              <text
                {...SVG_LABEL}
                x="112"
                y="69"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.45"
              >
                PRODUCTION TOOL
              </text>

              <path
                d="M236 12V104"
                stroke="var(--charcoal)"
                strokeOpacity="0.14"
              />

              {/* Right: Creative generation tied to three anchors */}
              <rect
                x="268"
                y="34"
                width="184"
                height="48"
                fill="var(--crimson)"
                fillOpacity="0.06"
                stroke="var(--crimson)"
                strokeWidth="1.5"
              />
              <text
                {...SVG_LABEL}
                x="360"
                y="55"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                CREATIVE
              </text>
              <text
                {...SVG_LABEL}
                x="360"
                y="69"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                GENERATION
              </text>

              {[
                { label: "RESPONSE DATA", y: 24 },
                { label: "BRAND GUIDELINES", y: 58 },
                { label: "WORKFLOW REVIEW", y: 92 },
              ].map((anchor) => (
                <g key={anchor.label}>
                  <path
                    d={`M452 58 C 496 58, 508 ${anchor.y}, 548 ${anchor.y}`}
                    stroke="var(--crimson)"
                    strokeOpacity="0.55"
                    strokeWidth="1.25"
                  />
                  <rect
                    x="548"
                    y={anchor.y - 13}
                    width="220"
                    height="26"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.32"
                  />
                  <text
                    {...SVG_LABEL}
                    x="658"
                    y={anchor.y + 3.5}
                    textAnchor="middle"
                    fill="var(--charcoal)"
                    fillOpacity="0.75"
                  >
                    {anchor.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        <div className="w-full">
          <figure className="mt-8 max-w-4xl border-l-2 border-[var(--crimson)] pl-6 md:pl-8">
            <div className={`${MICRO} text-[var(--champagne)]`}>
              Marketing leadership owns
            </div>
            <blockquote className="mt-2 font-serif text-[1.25rem] font-medium leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[1.75rem]">
              Marketing leadership still owns taste, positioning discipline, and
              the decision about which ideas deserve distribution.
            </blockquote>
          </figure>
        </div>
      </Slide>

      {/* ==================================================================
          13. PRICING AND PROMOTION: the tradeoff drawn as a triangle with
          the chosen point inside it. Four promotional levers. Three effects
          set on one time ruler because they differ in horizon.
      ================================================================== */}
      <Slide id="pricing-promotion" border align="left">
        <Head1 eyebrow="Price and promotion">
          Pricing and Promotional Optimization
        </Head1>

        <div className="mt-10 grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1fr_18rem] md:gap-14">
          <div>
            <p className={BODY}>
              AI can support pricing by forecasting demand, detecting
              responsiveness, and estimating tradeoffs across volume, margin,
              and channel behavior.
            </p>
          </div>
          <div>
            <svg aria-hidden viewBox="0 0 320 200" className="w-full max-w-[18rem]" fill="none">
              <path d="M160 26L30 172H290Z" stroke="var(--charcoal)" strokeOpacity="0.25" />
              <path d="M160 26L148 118M30 172L148 118M290 172L148 118" stroke="var(--crimson)" strokeOpacity="0.3" />
              <circle cx="148" cy="118" r="5" fill="var(--crimson)" />
              <text {...SVG_LABEL} x="160" y="14" textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.6">VOLUME</text>
              <text {...SVG_LABEL} x="14" y="192" fill="var(--charcoal)" fillOpacity="0.6">MARGIN</text>
              <text {...SVG_LABEL} x="306" y="192" textAnchor="end" fill="var(--charcoal)" fillOpacity="0.6">CHANNEL BEHAVIOR</text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-8">
            <p className={`${BODY} max-w-3xl`}>
              Promotional systems help decide discount depth, offer sequencing,
              coupon targeting, and timing.
            </p>
            <div aria-hidden className="mt-6 grid grid-cols-2 border-t border-[var(--charcoal)]/12 md:grid-cols-4">
              {["discount depth", "offer sequencing", "coupon targeting", "timing"].map(
                (lever, i) => (
                  <div
                    key={lever}
                    className={`py-4 ${i > 0 ? "md:border-l md:border-[var(--charcoal)]/12 md:pl-5" : ""}`}
                  >
                    <span className={`${MICRO} text-[var(--champagne)]`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-2 block font-serif text-[0.9375rem] italic tracking-normal text-[var(--charcoal-light)]/70">
                      {lever}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <div aria-hidden className="space-y-4">
              {[
                { label: "Short-term lift", w: 18, tone: "bg-[var(--charcoal)]/35", text: "text-[var(--charcoal-light)]/60" },
                { label: "Long-term willingness to pay", w: 62, tone: "bg-[var(--crimson)]", text: "text-[var(--crimson)]" },
                { label: "Brand effects", w: 100, tone: "bg-[var(--charcoal)]/15", text: "text-[var(--charcoal-light)]/60" },
              ].map((span) => (
                <div key={span.label}>
                  <div className={`${MICRO} ${span.text}`}>{span.label}</div>
                  <div className="mt-2 h-px w-full bg-[var(--charcoal)]/8">
                    <div className={`h-[3px] -translate-y-px ${span.tone}`} style={{ width: `${span.w}%` }} />
                  </div>
                </div>
              ))}
              <div className={`${MICRO} text-[var(--charcoal-light)]/40`}>
                Time →
              </div>
            </div>
            <p className="mt-8 max-w-4xl font-serif text-[1.375rem] font-medium leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[1.875rem]">
              These systems are most useful when firms distinguish between
              short-term lift, long-term willingness to pay, and brand effects.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          14. DYNAMIC PRICING: a stepped price line, each step pinned to
          the condition that moved it. Then the two readings of the same
          variation, set against each other across one rule.
      ================================================================== */}
      <Slide id="dynamic-pricing" border align="left">
        <Head1 eyebrow="Prices that move" signal>
          Revenue Lift, Brand Risk, and Dynamic Pricing
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Dynamic pricing changes offers in response to demand conditions,
            customer context, capacity, or competitive moves.
          </p>
          <figure aria-hidden className="mt-6 w-full max-w-5xl">
            <svg viewBox="0 0 800 130" className="w-full" fill="none">
              <path d="M10 124h780" stroke="var(--charcoal)" strokeOpacity="0.2" />
              <path
                d="M10 96H150V64H330V84H500V44H660V74H790"
                stroke="var(--crimson)"
                strokeWidth="1.5"
              />
              {[
                { x: 150, y: 64, label: "DEMAND CONDITIONS" },
                { x: 330, y: 64, label: "CUSTOMER CONTEXT" },
                { x: 500, y: 44, label: "CAPACITY" },
                { x: 660, y: 44, label: "COMPETITIVE MOVES" },
              ].map((t) => (
                <g key={t.label}>
                  <path d={`M${t.x} 26V${t.y}`} stroke="var(--charcoal)" strokeOpacity="0.2" strokeDasharray="2 3" />
                  <text {...SVG_LABEL} x={t.x} y="18" textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.55">
                    {t.label}
                  </text>
                </g>
              ))}
            </svg>
          </figure>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-8">
            <div aria-hidden className="grid grid-cols-2">
              <span className={`${MICRO} text-[var(--charcoal-light)]/55`}>
                Allocation efficiency
              </span>
              <span className={`${MICRO} border-l border-[var(--crimson)]/40 pl-6 text-[var(--crimson)]`}>
                Unfair or opportunistic
              </span>
            </div>
            <p className={`${BODY} mt-5 max-w-4xl`}>
              It can improve allocation efficiency, but consumers may interpret
              frequent price variation as unfair or opportunistic.
            </p>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 max-w-4xl border border-[var(--crimson)]/45 p-7 md:p-9">
            <div className={`${MICRO} text-[var(--crimson)]`}>
              The managerial challenge
            </div>
            <p className="mt-4 font-serif text-xl leading-[1.4] text-[var(--charcoal)] md:text-[1.625rem]">
              The managerial challenge is to separate economically rational price
              adaptation from practices that damage trust or invite regulatory
              scrutiny.
            </p>
          </div>
        </div>

        <Discussion1>
          In which categories does dynamic pricing strengthen value capture, and
          in which categories does it undermine customer relationships?
        </Discussion1>
      </Slide>

      <ModulePlate1
        id="module-3"
        numeral="III"
        title="Measurement and Learning"
        lines={[
          "This section addresses how firms learn which actions actually caused performance changes.",
          "The executive problem is not data scarcity, but false certainty from dashboards that confuse correlation with causal lift.",
        ]}
      />

      {/* ==================================================================
          16. CAMPAIGN OPTIMIZATION: five channel lanes on one clock, so
          timing and sequencing read as a score. Then the local-versus-total
          conflict as two opposed arrows.
      ================================================================== */}
      <Slide id="campaign-optimization" border align="left">
        <Head1 eyebrow="One score, many channels">
          Campaign Optimization Across Channels
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            AI can coordinate campaign timing, sequencing, audience exposure,
            and creative rotation across email, search, social, retail media,
            and direct channels.
          </p>
          <svg aria-hidden viewBox="0 0 800 170" className="mt-7 w-full max-w-5xl" fill="none">
            {[
              { lane: "EMAIL", marks: [160, 400, 640] },
              { lane: "SEARCH", marks: [220, 260, 300, 520, 560] },
              { lane: "SOCIAL", marks: [180, 340, 460, 700] },
              { lane: "RETAIL MEDIA", marks: [380, 600] },
              { lane: "DIRECT", marks: [480, 740] },
            ].map((l, i) => {
              const y = 18 + i * 32;
              return (
                <g key={l.lane}>
                  <text {...SVG_LABEL} x="0" y={y + 3} fill="var(--charcoal)" fillOpacity="0.5">
                    {l.lane}
                  </text>
                  <path d={`M140 ${y}H790`} stroke="var(--charcoal)" strokeOpacity="0.12" />
                  {l.marks.map((x, m) => (
                    <rect
                      key={x}
                      x={x}
                      y={y - 5}
                      width="26"
                      height="10"
                      fill={m === 0 && i === 0 ? "var(--crimson)" : "var(--charcoal)"}
                      fillOpacity={m === 0 && i === 0 ? 1 : 0.28}
                    />
                  ))}
                </g>
              );
            })}
          </svg>
        </div>

        <div className="w-full">
          <div className="mt-12 grid w-full max-w-5xl items-center gap-8 border-t border-[var(--charcoal)]/10 pt-8 md:grid-cols-[1fr_15rem] md:gap-12">
            <p className={BODY}>
              Optimization works best when channel objectives are aligned.
              Otherwise one system can improve its local metric while hurting
              total performance.
            </p>
            <div aria-hidden className="space-y-4">
              <div className="flex items-center justify-between border-b border-[var(--charcoal)]/10 pb-3">
                <span className={`${MICRO} text-[var(--charcoal-light)]/55`}>Local metric</span>
                <span className="font-serif text-2xl text-[var(--charcoal)]/50">↑</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`${MICRO} text-[var(--crimson)]`}>Total performance</span>
                <span className="font-serif text-2xl text-[var(--crimson)]">↓</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 max-w-4xl border-l-2 border-[var(--crimson)] pl-6 md:pl-8">
            <div
              aria-hidden
              className="flex flex-wrap gap-x-5 gap-y-2 font-serif text-[0.9375rem] italic tracking-normal text-[var(--charcoal-light)]/55"
            >
              <span>frequency</span>
              <span>|</span>
              <span>exclusions</span>
              <span>|</span>
              <span>diminishing returns</span>
            </div>
            <p className="mt-4 font-serif text-xl leading-[1.4] text-[var(--charcoal)] md:text-[1.625rem]">
              Cross-channel orchestration requires governance over frequency,
              exclusions, and diminishing returns.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          17. BUDGET, BIDDING, PACING: a spend curve against even pacing.
          Then the visibility trade drawn literally: readable rules beside a
          sealed box. Then the three conditions for the control model.
      ================================================================== */}
      <Slide id="budget-bidding" border align="left">
        <Head1 eyebrow="Spend decisions">Budget Allocation, Bidding, and Pacing</Head1>

        <div className="mt-10 grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1fr_20rem] md:gap-14">
          <div>
            <p className={BODY}>
              Media systems continuously decide how much to spend, where to
              spend it, and how quickly to deploy budget over time.
            </p>
            <div
              aria-hidden
              className="mt-5 flex flex-wrap gap-x-3 gap-y-2 font-serif text-[0.9375rem] italic tracking-normal text-[var(--charcoal-light)]/50"
            >
              <span>how much</span>
              <span>|</span>
              <span>where</span>
              <span>|</span>
              <span>how quickly</span>
            </div>
          </div>
          <div>
            <figure aria-hidden>
              <svg viewBox="0 0 320 150" className="w-full" fill="none">
                <path d="M30 20H290" stroke="var(--charcoal)" strokeOpacity="0.2" strokeDasharray="3 4" />
                <path d="M30 8v124h260" stroke="var(--charcoal)" strokeOpacity="0.25" />
                <path d="M30 132L290 20" stroke="var(--charcoal)" strokeOpacity="0.3" />
                <path
                  d="M30 132 C 70 126, 100 96, 140 90 C 180 84, 200 40, 290 22"
                  stroke="var(--crimson)"
                  strokeWidth="1.5"
                />
                <text {...SVG_LABEL} x="34" y="14" fill="var(--charcoal)" fillOpacity="0.5">BUDGET</text>
                <text {...SVG_LABEL} x="290" y="146" textAnchor="end" fill="var(--charcoal)" fillOpacity="0.45">TIME →</text>
              </svg>
            </figure>
          </div>
        </div>

        <div className="mt-12 grid w-full max-w-5xl gap-10 border-t border-[var(--charcoal)]/10 pt-8 md:grid-cols-[14rem_1fr] md:gap-12">
          <div>
            <div aria-hidden className="grid grid-cols-2 gap-4">
              <div>
                <div className={`${MICRO} text-[var(--charcoal-light)]/55`}>Manual rules</div>
                <div className="mt-3 space-y-1 font-mono text-[9px] leading-relaxed text-[var(--charcoal-light)]/55">
                  <div className="border-l border-[var(--charcoal)]/20 pl-2">IF …</div>
                  <div className="border-l border-[var(--charcoal)]/20 pl-2">THEN …</div>
                  <div className="border-l border-[var(--charcoal)]/20 pl-2">ELSE …</div>
                </div>
              </div>
              <div>
                <div className={`${MICRO} text-[var(--crimson)]`}>Automated</div>
                <div className="mt-3 h-[52px] bg-[var(--charcoal)]" />
              </div>
            </div>
          </div>
          <div>
            <p className={BODY}>
              Automated bidding can outperform manual rules in volatile
              environments, but it also makes logic less visible to managers.
            </p>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <div aria-hidden className="grid grid-cols-3 gap-4 md:max-w-2xl">
              {["Market speed", "Data quality", "Cost of overspending"].map((f, i) => (
                <div key={f} className="border-t-2 border-[var(--crimson)]/60 pt-3">
                  <span className={`${MICRO} text-[var(--champagne)]`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-1 block font-serif text-[1rem] font-medium tracking-normal text-[var(--charcoal)]">
                    {f}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-4xl font-serif text-[1.375rem] font-medium leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[1.875rem]">
              The right control model depends on market speed, data quality, and
              the cost of overspending on weak signals.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          18. EXPERIMENTATION: control and treatment stood side by side.
          Only the crimson increment is what the campaign caused. [quiz topic]
      ================================================================== */}
      <Slide id="experimentation" border align="left">
        <Head1 eyebrow="What actually caused it">
          Experimentation and Incrementality
        </Head1>

        <div className="mt-10 grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1fr_20rem] md:gap-14">
          <div>
            <p className={BODY}>
              Experiments remain the cleanest way to estimate whether a
              campaign, offer, or message caused additional behavior rather than
              simply capturing existing demand.
            </p>
          </div>
          <div>
            <figure aria-hidden>
              <svg viewBox="0 0 340 200" className="w-full" fill="none">
                <path d="M20 172H250" stroke="var(--charcoal)" strokeOpacity="0.3" />
                <rect x="50" y="62" width="70" height="110" fill="var(--charcoal)" fillOpacity="0.16" />
                <rect x="160" y="62" width="70" height="110" fill="var(--charcoal)" fillOpacity="0.16" />
                <rect x="160" y="22" width="70" height="40" fill="var(--crimson)" />
                <path d="M50 62H230" stroke="var(--charcoal)" strokeOpacity="0.35" strokeDasharray="3 3" />
                <path d="M242 22v40M238 22h8M238 62h8" stroke="var(--crimson)" />
                <text {...SVG_LABEL} x="254" y="38" fill="var(--crimson)">ADDITIONAL</text>
                <text {...SVG_LABEL} x="254" y="51" fill="var(--crimson)">BEHAVIOR</text>
                <text {...SVG_LABEL} x="254" y="112" fill="var(--charcoal)" fillOpacity="0.5">EXISTING</text>
                <text {...SVG_LABEL} x="254" y="125" fill="var(--charcoal)" fillOpacity="0.5">DEMAND</text>
                <text {...SVG_LABEL} x="85" y="190" textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.5">CONTROL</text>
                <text {...SVG_LABEL} x="195" y="190" textAnchor="middle" fill="var(--charcoal)">TREATMENT</text>
              </svg>
            </figure>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-8">
            <div aria-hidden className="grid grid-cols-3 gap-4 md:max-w-xl">
              {["Who to test", "Which treatments", "When to act"].map((q, i) => (
                <div key={q} className="border-t border-[var(--charcoal)]/25 pt-3">
                  <span className={`${MICRO} text-[var(--champagne)]`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-1 block font-serif text-[1rem] font-medium tracking-normal text-[var(--charcoal)]">
                    {q}
                  </span>
                </div>
              ))}
            </div>
            <p className={`${BODY} mt-6 max-w-3xl`}>
              AI can help identify who to test, which treatments to compare, and
              when results are strong enough to act on.
            </p>
          </div>
        </div>

        <Verdict>
          Organizations that skip experimentation often mistake optimized
          delivery for genuine value creation.
        </Verdict>

        <Discussion1>
          When should a marketing team slow down automation in order to preserve
          a credible learning agenda?
        </Discussion1>
      </Slide>

      {/* ==================================================================
          19. CAUSAL INFERENCE: the three reasons a clean test is blocked.
          Then the observed series against its dashed counterfactual, the
          gap between them being the lift.        [quiz: experimentation]
      ================================================================== */}
      <Slide
        id="causal-inference"
        border
        align="left"
        quizData={quiz["causal-inference"]}
      >
        <Head1 eyebrow="When a clean test is not possible">
          Causal Inference Without Clean Randomization
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Many important questions cannot be answered with perfect experiments
            because of cost, channel constraints, or operational disruption.
          </p>
          <div aria-hidden className="mt-6 grid w-full max-w-3xl grid-cols-3 gap-3">
            {["cost", "channel constraints", "operational disruption"].map((b) => (
              <span
                key={b}
                className="border-l-2 border-[var(--crimson)] bg-[var(--charcoal)]/[0.03] px-3 py-3 font-serif text-[0.9375rem] italic tracking-normal text-[var(--charcoal-light)]/70"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-8">
            <p className={`${BODY} max-w-3xl`}>
              In those cases, teams use quasi-experimental logic, holdout
              designs, uplift modeling, and careful counterfactual assumptions.
            </p>
            <figure aria-hidden className="mt-6">
              <svg viewBox="0 0 800 150" className="w-full" fill="none">
                <path d="M10 136H790" stroke="var(--charcoal)" strokeOpacity="0.2" />
                <path d="M420 10V136" stroke="var(--charcoal)" strokeOpacity="0.25" strokeDasharray="3 4" />
                <path
                  d="M10 104 C 120 98, 240 96, 420 88 C 540 82, 640 42, 690 36"
                  stroke="var(--crimson)"
                  strokeWidth="1.5"
                />
                <path
                  d="M420 88 C 540 84, 620 80, 690 78"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.5"
                  strokeDasharray="5 4"
                />
                <path d="M700 36v42M696 36h8M696 78h8" stroke="var(--charcoal)" strokeOpacity="0.5" />
                <text {...SVG_LABEL} x="708" y="40" fill="var(--crimson)">OBSERVED</text>
                <text {...SVG_LABEL} x="708" y="60" fill="var(--charcoal)" fillOpacity="0.6">LIFT</text>
                <text {...SVG_LABEL} x="708" y="86" fill="var(--charcoal)" fillOpacity="0.5">COUNTER-</text>
                <text {...SVG_LABEL} x="708" y="100" fill="var(--charcoal)" fillOpacity="0.5">FACTUAL</text>
              </svg>
            </figure>
          </div>
        </div>

        <div className="w-full">
          <figure className="mt-12 max-w-4xl border-l-2 border-[var(--crimson)] pl-6 md:pl-8">
            <div className={`${MICRO} text-[var(--champagne)]`}>
              What managers need to ask
            </div>
            <blockquote className="mt-3 font-serif text-[1.375rem] font-medium leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[1.875rem]">
              Managers do not need to master the statistics, but they do need to
              ask what assumptions make the estimated lift believable.
            </blockquote>
          </figure>
        </div>
      </Slide>

      {/* ==================================================================
          20. ATTRIBUTION AND MMM: two instruments drawn side by side: a
          touchpoint path with credit split along it, and an aggregate series
          over time. Closed by three overlapping lenses.
      ================================================================== */}
      <Slide id="attribution-mmm" border align="left">
        <Head1 eyebrow="Two instruments">
          Attribution, Marketing Mix Models, and Their Limits
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Attribution assigns credit for observed outcomes across touchpoints,
            while marketing mix models estimate broader channel effects from
            aggregate variation over time.
          </p>
        </div>

        <div
          aria-hidden
          className="mt-9 grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-0"
        >
          <div className="md:pr-12">
            <div className={`${MICRO} text-[var(--charcoal-light)]/55`}>Attribution</div>
            <svg viewBox="0 0 340 110" className="mt-4 w-full" fill="none">
              <path d="M20 40H300" stroke="var(--charcoal)" strokeOpacity="0.25" />
              {[
                { x: 20, credit: 20 },
                { x: 100, credit: 34 },
                { x: 180, credit: 12 },
                { x: 260, credit: 48 },
              ].map((t) => (
                <g key={t.x}>
                  <circle cx={t.x} cy="40" r="5" fill="var(--surface)" stroke="var(--charcoal)" strokeOpacity="0.55" />
                  <rect x={t.x - 8} y={100 - t.credit} width="16" height={t.credit} fill="var(--charcoal)" fillOpacity="0.25" />
                </g>
              ))}
              <circle cx="316" cy="40" r="7" fill="var(--crimson)" />
              <text {...SVG_LABEL} x="20" y="16" fill="var(--charcoal)" fillOpacity="0.45">TOUCHPOINTS</text>
              <text {...SVG_LABEL} x="334" y="16" textAnchor="end" fill="var(--crimson)">OUTCOME</text>
            </svg>
          </div>
          <div className="md:border-l md:border-[var(--charcoal)]/12 md:pl-12">
            <div className={`${MICRO} text-[var(--crimson)]`}>Marketing mix models</div>
            <svg viewBox="0 0 340 110" className="mt-4 w-full" fill="none">
              {[46, 52, 40, 62, 70, 58, 76, 84, 66, 90, 96, 80, 72, 88].map((h, i) => (
                <rect key={i} x={8 + i * 23} y={100 - h * 0.75} width="14" height={h * 0.75} fill="var(--crimson)" fillOpacity="0.22" />
              ))}
              <path d="M4 100H336" stroke="var(--charcoal)" strokeOpacity="0.3" />
              <text {...SVG_LABEL} x="336" y="12" textAnchor="end" fill="var(--charcoal)" fillOpacity="0.45">OVER TIME →</text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-8">
            <p className={`${BODY} max-w-3xl`}>
              Each method answers a different question and carries different
              biases, time horizons, and data requirements.
            </p>
            <div aria-hidden className="mt-6 max-w-xl">
              {["biases", "time horizons", "data requirements"].map((row) => (
                <div
                  key={row}
                  className="grid grid-cols-[1fr_2rem_1fr] items-center border-b border-[var(--charcoal)]/8 py-2 font-serif text-[0.9375rem] italic tracking-normal text-[var(--charcoal-light)]/60"
                >
                  <span>{row}</span>
                  <span className="text-center text-[var(--crimson)]">≠</span>
                  <span className="text-right">{row}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 grid w-full max-w-5xl items-center gap-8 md:grid-cols-[10rem_1fr] md:gap-12">
            <svg aria-hidden viewBox="0 0 160 110" className="w-full max-w-[10rem]" fill="none">
              <circle cx="58" cy="44" r="36" stroke="var(--charcoal)" strokeOpacity="0.35" />
              <circle cx="102" cy="44" r="36" stroke="var(--charcoal)" strokeOpacity="0.35" />
              <circle cx="80" cy="72" r="36" stroke="var(--crimson)" strokeWidth="1.5" />
            </svg>
            <p className="font-serif text-[1.375rem] font-medium leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[1.875rem]">
              Mature organizations use measurement as a portfolio of lenses
              rather than insisting that one model resolve every disagreement.
            </p>
          </div>
        </div>

        <Discussion1>
          If attribution and marketing mix models point to different budget
          decisions, which one should leadership trust and why?
        </Discussion1>
      </Slide>

      <ModulePlate1
        id="module-4"
        numeral="IV"
        title="Relationship Systems and Governance"
        lines={[
          "This section shifts from acquisition to customer relationship management, service, and institutional safeguards.",
          "The main question is how to automate relationship decisions without weakening trust or accountability.",
        ]}
      />

      {/* ==================================================================
          22. CRM ORCHESTRATION: four decisions. Then the same customer
          journey drawn twice, once broken into campaigns and once as one
          line. Then the three foundations holding up the beam.
      ================================================================== */}
      <Slide id="crm-orchestration" border align="left">
        <Head1 eyebrow="Across the journey">CRM Orchestration Across the Journey</Head1>

        <div className="mt-10 grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1fr_1fr] md:gap-14">
          <div>
            <p className={BODY}>
              CRM systems increasingly use AI to determine next best action,
              next best offer, message timing, and suppression rules.
            </p>
          </div>
          <div>
            <div aria-hidden className="grid grid-cols-2 gap-px bg-[var(--charcoal)]/10">
              {["next best action", "next best offer", "message timing", "suppression rules"].map(
                (d, i) => (
                  <div key={d} className="bg-[var(--background)] px-4 py-4">
                    <span className={`${MICRO} text-[var(--champagne)]`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-2 block font-serif text-[0.9375rem] italic tracking-normal text-[var(--charcoal-light)]/70">
                      {d}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-8">
            <svg aria-hidden viewBox="0 0 800 130" className="w-full" fill="none">
              <text {...SVG_LABEL} x="0" y="14" fill="var(--charcoal)" fillOpacity="0.45">
                DISCONNECTED CAMPAIGNS
              </text>
              {[
                [20, 40, 120],
                [170, 30, 250],
                [300, 48, 380],
                [450, 34, 520],
                [580, 44, 680],
                [720, 30, 790],
              ].map(([x1, y, x2]) => (
                <path key={x1} d={`M${x1} ${y}H${x2}`} stroke="var(--charcoal)" strokeOpacity="0.35" strokeWidth="1.5" />
              ))}
              <text {...SVG_LABEL} x="0" y="84" fill="var(--crimson)">CONTINUITY</text>
              <path d="M20 108 C 200 100, 320 116, 460 106 S 700 100, 790 106" stroke="var(--crimson)" strokeWidth="1.5" />
              {[120, 300, 460, 640].map((x) => (
                <circle key={x} cx={x} cy={x === 460 ? 106 : x < 300 ? 104 : x === 300 ? 110 : 103} r="4" fill="var(--surface)" stroke="var(--crimson)" />
              ))}
            </svg>
            <p className={`${BODY} mt-6 max-w-4xl`}>
              The goal is to coordinate journeys across channels so that
              customers experience continuity rather than disconnected
              campaigns.
            </p>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <div aria-hidden className="md:max-w-2xl">
              <div className="h-[3px] w-full bg-[var(--crimson)]" />
              <div className="grid grid-cols-3 gap-3">
                {["clean event data", "identity resolution", "explicit business priorities"].map(
                  (f) => (
                    <div key={f} className="border-x border-b border-[var(--charcoal)]/15 px-3 pb-3 pt-6">
                      <span className="font-serif text-[0.9375rem] italic tracking-normal text-[var(--charcoal-light)]/70">
                        {f}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
            <p className={`${BODY} mt-7 max-w-4xl`}>
              Orchestration quality depends on clean event data, identity
              resolution, and explicit business priorities such as retention,
              cross-sell, or service recovery.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          23. RETENTION AND CLV: risk against worth, with one quadrant
          marked. Then a prediction drawn dashed and flat with the path it
          can still take, because the danger is reading it as fixed.
                                                        [quiz topic]
      ================================================================== */}
      <Slide id="retention-clv" border align="left">
        <Head1 eyebrow="Who to keep">
          Retention, Churn, and Customer Lifetime Value
        </Head1>

        <div className="mt-10 grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1fr_17rem] md:gap-14">
          <div>
            <p className={BODY}>
              Retention models help identify who is at risk, who is worth
              saving, and which intervention is economically justified.
            </p>
          </div>
          <div>
            <figure aria-hidden>
              <svg viewBox="0 0 260 220" className="w-full max-w-[17rem]" fill="none">
                <rect x="140" y="10" width="110" height="90" fill="var(--crimson)" fillOpacity="0.08" stroke="var(--crimson)" />
                <path d="M30 10V190H250" stroke="var(--charcoal)" strokeOpacity="0.3" />
                <path d="M140 10V190M30 100H250" stroke="var(--charcoal)" strokeOpacity="0.12" />
                {[
                  [60, 150], [90, 130], [70, 60], [110, 40], [170, 160], [210, 130],
                  [180, 60], [220, 36], [196, 84], [120, 170], [50, 120], [160, 120],
                ].map(([x, y]) => (
                  <circle
                    key={`${x}-${y}`}
                    cx={x}
                    cy={y}
                    r="3.5"
                    fill={x > 140 && y < 100 ? "var(--crimson)" : "var(--charcoal)"}
                    fillOpacity={x > 140 && y < 100 ? 1 : 0.3}
                  />
                ))}
                <text {...SVG_LABEL} x="250" y="208" textAnchor="end" fill="var(--charcoal)" fillOpacity="0.5">AT RISK →</text>
                <text {...SVG_LABEL} x="0" y="0" transform="translate(18 190) rotate(-90)" fill="var(--charcoal)" fillOpacity="0.5">WORTH SAVING →</text>
              </svg>
            </figure>
          </div>
        </div>

        <div className="mt-12 grid w-full max-w-5xl gap-10 border-t border-[var(--charcoal)]/10 pt-8 md:grid-cols-[14rem_1fr] md:gap-12">
          <div>
            <div aria-hidden className="flex items-center gap-4">
              <span className="border border-[var(--charcoal)]/15 px-3 py-4 font-serif text-[0.9375rem] italic tracking-normal text-[var(--charcoal-light)]/35 [text-decoration-line:line-through]">
                CLV
              </span>
              <span className="text-[var(--crimson)]">→</span>
              <div className="flex-1 space-y-1.5">
                {[80, 50, 30].map((w) => (
                  <span key={w} className="block h-2 bg-[var(--crimson)]" style={{ width: `${w}%`, opacity: w / 100 + 0.2 }} />
                ))}
              </div>
            </div>
          </div>
          <div>
            <p className={BODY}>
              Customer lifetime value is most useful when it informs resource
              allocation, not when it becomes a decorative dashboard metric.
            </p>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 grid w-full max-w-5xl items-center gap-8 md:grid-cols-[1fr_20rem] md:gap-12">
            <div className="border-l-2 border-[var(--crimson)] pl-6 md:pl-8">
              <div className={`${MICRO} text-[var(--crimson)]`}>The managerial danger</div>
              <p className="mt-3 font-serif text-xl leading-[1.4] text-[var(--charcoal)] md:text-[1.625rem]">
                The managerial danger is treating predicted value as destiny and
                underinvesting in customers whose future potential can still be
                shaped.
              </p>
            </div>
            <figure aria-hidden>
              <svg viewBox="0 0 320 120" className="w-full" fill="none">
                <path d="M10 104H310" stroke="var(--charcoal)" strokeOpacity="0.2" />
                <path d="M10 84H120" stroke="var(--charcoal)" strokeOpacity="0.6" strokeWidth="1.5" />
                <path d="M120 84H230" stroke="var(--charcoal)" strokeOpacity="0.4" strokeDasharray="5 4" />
                <path d="M120 84 C 160 80, 190 40, 230 26" stroke="var(--crimson)" strokeWidth="1.5" />
                <path d="M230 26l-9 0M230 26l-5 7" stroke="var(--crimson)" strokeWidth="1.5" />
                <text {...SVG_LABEL} x="238" y="30" fill="var(--crimson)">SHAPED</text>
                <text {...SVG_LABEL} x="238" y="88" fill="var(--charcoal)" fillOpacity="0.5">DESTINY</text>
              </svg>
            </figure>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          24. CONVERSATIONAL COMMERCE: a conversation column carrying the
          four jobs. The escalation path drawn as a handoff. Then two trays
          for intents, one for the machine and one for people.
                                                   [quiz: retention-clv]
      ================================================================== */}
      <Slide
        id="conversational-commerce"
        border
        align="left"
        quizData={quiz["conversational-commerce"]}
      >
        <Head1 eyebrow="Chat, voice, messaging">
          Conversational Commerce and Service Automation
        </Head1>

        <div className="mt-10 grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1fr_17rem] md:gap-14">
          <div>
            <p className={BODY}>
              Conversational systems now support discovery, service triage,
              order updates, and guided selling across chat, voice, and
              messaging channels.
            </p>
            <div
              aria-hidden
              className="mt-5 flex flex-wrap gap-x-3 gap-y-2 font-serif text-[0.9375rem] italic tracking-normal text-[var(--charcoal-light)]/50"
            >
              <span>chat</span>
              <span>|</span>
              <span>voice</span>
              <span>|</span>
              <span>messaging</span>
            </div>
          </div>
          <div>
            <div aria-hidden className="space-y-2.5">
              {["discovery", "service triage", "order updates", "guided selling"].map(
                (job, i) => (
                  <div key={job} className={`flex ${i % 2 ? "justify-end" : "justify-start"}`}>
                    <span
                      className={`rounded-[10px] border px-3 py-2 font-serif text-[0.9375rem] italic tracking-normal ${
                        i % 2
                          ? "rounded-br-none border-[var(--crimson)]/40 text-[var(--crimson)]"
                          : "rounded-bl-none border-[var(--charcoal)]/20 text-[var(--charcoal-light)]/70"
                      }`}
                    >
                      {job}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-8">
            <svg aria-hidden viewBox="0 0 800 70" className="w-full" fill="none">
              <circle cx="40" cy="36" r="7" fill="var(--charcoal)" fillOpacity="0.55" />
              <path d="M52 36H700" stroke="var(--charcoal)" strokeOpacity="0.3" />
              <path d="M420 36 C 470 36, 480 14, 540 14 H700" stroke="var(--crimson)" strokeWidth="1.5" />
              <circle cx="712" cy="14" r="7" fill="var(--crimson)" />
              <circle cx="712" cy="36" r="5" stroke="var(--charcoal)" strokeOpacity="0.5" />
              <text {...SVG_LABEL} x="40" y="64" textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.5">SYSTEM</text>
              <text {...SVG_LABEL} x="470" y="62" textAnchor="middle" fill="var(--crimson)">ESCALATION PATH</text>
            </svg>
            <p className={`${BODY} mt-5 max-w-4xl`}>
              Their value comes from reducing friction while preserving a
              coherent brand voice and reliable escalation path.
            </p>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <div aria-hidden className="grid max-w-2xl grid-cols-2 gap-6">
              {[
                { tray: "Resolved safely", n: 3, tone: "border-[var(--charcoal)]/20 text-[var(--charcoal-light)]/60", head: "text-[var(--charcoal-light)]/55" },
                { tray: "Require human judgment", n: 2, tone: "border-[var(--crimson)]/45 text-[var(--crimson)]", head: "text-[var(--crimson)]" },
              ].map((t) => (
                <div key={t.tray} className="border-t border-[var(--charcoal)]/15 pt-3">
                  <div className={`${MICRO} ${t.head}`}>{t.tray}</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {Array.from({ length: t.n }).map((_, i) => (
                      <span key={i} className={`border px-2 py-1 font-serif text-[0.9375rem] italic tracking-normal ${t.tone}`}>
                        intent
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-4xl font-serif text-[1.375rem] font-medium leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[1.875rem]">
              Full automation is rarely the objective. The better design question
              is which intents can be resolved safely and which require human
              judgment.
            </p>
          </div>
        </div>

        <Discussion1>
          Which customer moments in your organization should remain human-led
          even if conversational AI becomes fast and accurate?
        </Discussion1>
      </Slide>

      {/* ==================================================================
          25. PRIVACY AND TRUST ARCHITECTURE: governance drawn as the slab
          the three data dependencies stand on. The four decisions as ruled
          clauses. Three strategic capabilities.          [quiz topic]
      ================================================================== */}
      <Slide id="privacy-consent" border align="left">
        <Head1 eyebrow="Trust architecture">
          Privacy, Consent, and Trust Architecture
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Marketing AI depends on customer data, identity linkage, and
            behavioral inference, making governance a core design requirement
            rather than a legal afterthought.
          </p>
        </div>

        <div className="w-full">
          <div aria-hidden className="mt-8 w-full max-w-3xl">
            <div className="grid grid-cols-3 gap-3">
              {["customer data", "identity linkage", "behavioral inference"].map((b) => (
                <div
                  key={b}
                  className="border border-b-0 border-[var(--charcoal)]/15 px-3 py-5 font-serif text-[0.9375rem] italic tracking-normal text-[var(--charcoal-light)]/70"
                >
                  {b}
                </div>
              ))}
            </div>
            <div className={`${MICRO} bg-[var(--crimson)] px-4 py-3 text-[var(--surface)]`}>
              Governance | core design requirement
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-8">
            <p className={`${BODY} max-w-4xl`}>
              Leaders must decide what data is appropriate to collect, how
              consent is expressed, how models are audited, and when data use
              becomes reputationally unacceptable.
            </p>
            <div aria-hidden className="mt-6 grid grid-cols-2 border-t border-[var(--charcoal)]/12 md:grid-cols-4">
              {["collect", "consent", "audit", "unacceptable"].map((c, i) => (
                <div
                  key={c}
                  className={`flex items-baseline gap-3 py-3 ${i > 0 ? "md:border-l md:border-[var(--charcoal)]/12 md:pl-5" : ""}`}
                >
                  <span className="font-serif text-sm lowercase tracking-[0.1em] text-[var(--champagne)]">
                    {["i", "ii", "iii", "iv"][i]}
                  </span>
                  <span className="font-serif text-[0.9375rem] italic tracking-normal text-[var(--charcoal-light)]/65">
                    {c}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <div aria-hidden className="grid gap-6 md:grid-cols-3">
              {["Privacy-preserving measurement", "Data minimization", "Transparent value exchange"].map(
                (cap, i) => (
                  <div key={cap} className="border-t-2 border-[var(--crimson)]/50 pt-4">
                    <div className="font-serif text-[1.75rem] font-black leading-none text-[var(--charcoal)]/15">
                      {["I", "II", "III"][i]}
                    </div>
                    <div className={`${MICRO} mt-3 text-[var(--charcoal-light)]/60`}>{cap}</div>
                  </div>
                ),
              )}
            </div>
            <p className="mt-8 max-w-4xl font-serif text-[1.375rem] font-medium leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[1.875rem]">
              Privacy-preserving measurement, data minimization, and transparent
              value exchange are increasingly strategic capabilities.
            </p>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          26. MANIPULATION AND BIAS: four harms struck in crimson. The
          pipeline with two entry points for bias, the data and the
          objective. Guardrails drawn as rails.  [quiz: privacy-consent]
      ================================================================== */}
      <Slide
        id="manipulation-bias"
        border
        align="left"
        quizData={quiz["manipulation-bias"]}
      >
        <Head1 eyebrow="Consumer welfare" signal>
          Manipulation, Bias, and Consumer Welfare
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            AI systems can unintentionally reinforce exclusion, price
            discrimination, dark patterns, or exploitative targeting of
            vulnerable consumers.
          </p>
          <div aria-hidden className="mt-6 flex flex-wrap gap-3">
            {["exclusion", "price discrimination", "dark patterns", "exploitative targeting"].map(
              (h) => (
                <span
                  key={h}
                  className="border border-[var(--crimson)]/40 px-3 py-2 font-serif text-[0.9375rem] italic tracking-normal text-[var(--crimson)]"
                >
                  {h}
                </span>
              ),
            )}
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-8">
            <svg aria-hidden viewBox="0 0 800 92" className="w-full" fill="none">
              <path d="M80 44H700" stroke="var(--charcoal)" strokeOpacity="0.25" />
              {[
                { x: 80, label: "TRAINING DATA", warn: true },
                { x: 280, label: "MODEL", warn: false },
                { x: 480, label: "OBJECTIVES", warn: true },
                { x: 700, label: "DOWNSTREAM HARM", warn: false },
              ].map((n) => (
                <g key={n.label}>
                  <rect
                    x={n.x - 7}
                    y="37"
                    width="14"
                    height="14"
                    fill={n.warn ? "var(--crimson)" : "var(--surface)"}
                    stroke={n.warn ? "var(--crimson)" : "var(--charcoal)"}
                    strokeOpacity={n.warn ? 1 : 0.45}
                  />
                  <text
                    {...SVG_LABEL}
                    x={n.x}
                    y="80"
                    textAnchor="middle"
                    fill={n.warn ? "var(--crimson)" : "var(--charcoal)"}
                    fillOpacity={n.warn ? 1 : 0.5}
                  >
                    {n.label}
                  </text>
                  {n.warn && (
                    <text {...SVG_LABEL} x={n.x} y="22" textAnchor="middle" fill="var(--crimson)">
                      BIAS
                    </text>
                  )}
                </g>
              ))}
            </svg>
            <p className={`${BODY} mt-6 max-w-4xl`}>
              Bias in marketing is not limited to training data. It can also
              arise from objectives that reward short-term conversion without
              regard for downstream harm.
            </p>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <div aria-hidden className="grid grid-cols-2 border-y-2 border-[var(--crimson)] md:grid-cols-4">
              {["objectives", "audience exclusions", "escalation", "review"].map((g, i) => (
                <span
                  key={g}
                  className={`px-4 py-3 font-serif text-[0.9375rem] italic tracking-normal text-[var(--charcoal-light)]/70 ${
                    i > 0 ? "md:border-l md:border-[var(--crimson)]/30" : ""
                  }`}
                >
                  {g}
                </span>
              ))}
            </div>
            <p className="mt-7 max-w-4xl font-serif text-[1.375rem] font-medium leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[1.875rem]">
              Responsible marketing requires explicit guardrails on objectives,
              audience exclusions, escalation, and review.
            </p>
          </div>
        </div>

        <Discussion1>
          Should a model be considered successful if it increases conversion by
          exploiting behavioral vulnerability that a human marketer would judge
          inappropriate?
        </Discussion1>
      </Slide>

      <ModulePlate1
        id="module-5"
        numeral="V"
        title="Organizational Implications"
        lines={[
          "The final section considers the operating model required to deploy AI across marketing responsibly.",
          "Technology decisions matter, but organizational design usually determines whether promised value is realized.",
        ]}
      />

      {/* ==================================================================
          28. OPERATING MODEL: six teams arranged around one shared centre.
          Then decisions placed along the centralized-decentralized axis.
                                                        [quiz topic]
      ================================================================== */}
      <Slide id="operating-model" border align="left">
        <Head1 eyebrow="How the work is organized">
          Marketing Operating Model for AI
        </Head1>

        <div className="mt-10 grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1fr_24rem] md:gap-14">
          <div>
            <p className={BODY}>
              High-performing firms pair marketing, analytics, data engineering,
              product, legal, and service teams around shared customer outcomes.
            </p>
          </div>
          <div>
            <svg aria-hidden viewBox="0 0 460 260" className="w-full" fill="none">
              {[
                { a: -90, label: "MARKETING", lx: 230, ly: 20, anchor: "middle" as const },
                { a: -30, label: "ANALYTICS", lx: 326, ly: 80, anchor: "start" as const },
                { a: 30, label: "DATA ENGINEERING", lx: 326, ly: 186, anchor: "start" as const },
                { a: 90, label: "PRODUCT", lx: 230, ly: 250, anchor: "middle" as const },
                { a: 150, label: "LEGAL", lx: 134, ly: 186, anchor: "end" as const },
                { a: 210, label: "SERVICE", lx: 134, ly: 80, anchor: "end" as const },
              ].map((t) => {
                const rad = (t.a * Math.PI) / 180;
                const x = (230 + 95 * Math.cos(rad)).toFixed(2);
                const y = (130 + 95 * Math.sin(rad)).toFixed(2);
                const sx = (230 + 50 * Math.cos(rad)).toFixed(2);
                const sy = (130 + 50 * Math.sin(rad)).toFixed(2);
                const ex = (230 + 86 * Math.cos(rad)).toFixed(2);
                const ey = (130 + 86 * Math.sin(rad)).toFixed(2);
                return (
                  <g key={t.label}>
                    <path d={`M${sx} ${sy}L${ex} ${ey}`} stroke="var(--crimson)" strokeOpacity="0.4" />
                    <circle cx={x} cy={y} r="6" fill="var(--surface)" stroke="var(--charcoal)" strokeOpacity="0.5" />
                    <text {...SVG_LABEL} x={t.lx} y={t.ly} textAnchor={t.anchor} fill="var(--charcoal)" fillOpacity="0.6">
                      {t.label}
                    </text>
                  </g>
                );
              })}
              <text {...SVG_LABEL} x="230" y="128" textAnchor="middle" fill="var(--crimson)">SHARED CUSTOMER</text>
              <text {...SVG_LABEL} x="230" y="141" textAnchor="middle" fill="var(--crimson)">OUTCOMES</text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-8">
            <div aria-hidden className="max-w-3xl">
              <div className="flex justify-between">
                <span className={`${MICRO} text-[var(--charcoal-light)]/60`}>
                  Centralized | governance
                </span>
                <span className={`${MICRO} text-right text-[var(--crimson)]`}>
                  Decentralized | speed and domain expertise
                </span>
              </div>
              <div className="relative mt-4 h-4">
                <span className="absolute inset-x-0 top-1/2 h-px bg-[var(--charcoal)]/25" />
                <span className="absolute left-0 top-0 h-4 w-px bg-[var(--charcoal)]/50" />
                <span className="absolute right-0 top-0 h-4 w-px bg-[var(--crimson)]" />
                {[12, 30, 58, 84].map((p) => (
                  <span
                    key={p}
                    className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-[var(--charcoal)]/60 bg-[var(--background)]"
                    style={{ left: `${p}%` }}
                  />
                ))}
              </div>
            </div>
            <p className={`${BODY} mt-7 max-w-4xl`}>
              The key design choice is where decisions should be centralized for
              governance and where they should be decentralized for speed and
              domain expertise.
            </p>
          </div>
        </div>

        <Verdict>
          AI maturity in marketing is ultimately an operating model question,
          not only a tooling question.
        </Verdict>
      </Slide>

      {/* ==================================================================
          29. BUILD, BUY, OR PARTNER: the stack as three tiers narrowing
          toward the few capabilities worth building. Five decision factors.
          The vendor trade set as one gain against three losses.
                                                  [quiz: operating-model]
      ================================================================== */}
      <Slide
        id="build-buy-partner"
        border
        align="left"
        quizData={quiz["build-buy-partner"]}
      >
        <Head1 eyebrow="The stack question">
          Build, Buy, or Partner: The Stack Question
        </Head1>

        <div className="mt-10 grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1fr_22rem] md:gap-14">
          <div>
            <p className={BODY}>
              Some capabilities should be purchased as platforms, some
              configured as workflows, and a smaller set may justify internal
              development.
            </p>
          </div>
          <div>
            <div aria-hidden className="flex flex-col items-center gap-1.5">
              {[
                { tier: "Internal development", w: "40%", tone: "bg-[var(--crimson)] text-[var(--surface)]" },
                { tier: "Configured as workflows", w: "70%", tone: "bg-[var(--charcoal)]/15 text-[var(--charcoal)]" },
                { tier: "Purchased as platforms", w: "100%", tone: "bg-[var(--charcoal)]/[0.07] text-[var(--charcoal-light)]" },
              ].map((t) => (
                <div
                  key={t.tier}
                  className={`${MICRO} whitespace-nowrap px-2 py-3 text-center text-[9px] tracking-[0.14em] ${t.tone}`}
                  style={{ width: t.w, minWidth: "fit-content" }}
                >
                  {t.tier}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-8">
            <p className={`${BODY} max-w-4xl`}>
              The decision depends on strategic differentiation, data uniqueness,
              integration burden, talent availability, and governance needs.
            </p>
            <div aria-hidden className="mt-6 grid grid-cols-2 gap-px bg-[var(--charcoal)]/10 md:grid-cols-5">
              {[
                "strategic differentiation",
                "data uniqueness",
                "integration burden",
                "talent availability",
                "governance needs",
              ].map((f, i) => (
                <div key={f} className="bg-[var(--background)] px-3 py-4">
                  <span className={`${MICRO} text-[var(--champagne)]`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-2 block font-serif text-[0.9375rem] italic tracking-normal text-[var(--charcoal-light)]/70">
                    {f}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <div aria-hidden className="grid max-w-3xl grid-cols-[1fr_2fr] border-b border-[var(--charcoal)]/15 pb-3">
              <span className={`${MICRO} text-[var(--charcoal-light)]/60`}>
                ↑ Adoption
              </span>
              <span className={`${MICRO} border-l border-[var(--crimson)]/40 pl-6 text-[var(--crimson)]`}>
                ↓ Transparency | portability | bargaining power
              </span>
            </div>
            <p className="mt-6 max-w-4xl font-serif text-xl leading-[1.4] text-[var(--charcoal)] md:text-[1.625rem]">
              Vendor dependence can accelerate adoption, but it may also reduce
              transparency, portability, and bargaining power.
            </p>
          </div>
        </div>

        <Discussion1>
          Which marketing AI capabilities should remain proprietary in your
          firm, and which are better treated as infrastructure?
        </Discussion1>
      </Slide>

      {/* ==================================================================
          30. SYNTHESIS: the six parts of the week joined into one chain,
          then the three actions set as display statements, then the
          colophon.
      ================================================================== */}
      <Slide id="synthesis" border align="left" className="relative overflow-hidden">
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-10 right-0 select-none font-serif text-[24vw] font-black leading-none text-[var(--charcoal)]/[0.03]"
        >
          02
        </span>

        <Head1 eyebrow="What to carry forward">Synthesis and Managerial Action</Head1>

        <div className="w-full">
          <ol
            aria-hidden
            className="mt-11 grid w-full max-w-5xl grid-cols-2 gap-y-5 sm:grid-cols-3 md:grid-cols-6"
          >
            {[
              "insight",
              "targeting",
              "personalization",
              "measurement",
              "relationship management",
              "governance",
            ].map((part, i) => (
              <li key={part} className="relative border-t-2 border-[var(--crimson)]/70 pr-3 pt-3">
                <span className={`${MICRO} block text-[var(--champagne)]`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mt-1 block font-serif text-[0.9375rem] italic tracking-normal text-[var(--charcoal-light)]/70">
                  {part}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <ol className="mt-10 w-full max-w-4xl">
          {[
            "Treat AI in marketing as a connected decision system across insight, targeting, personalization, measurement, relationship management, and governance.",
            "Start with a narrow set of high-value decisions, define success in business terms, and build the data and accountability needed to learn.",
            "The managerial task is not to automate every interaction, but to decide where intelligence, judgment, and trust create durable advantage.",
          ].map((line, i) => (
            <li key={line} className="block">
              <div className="grid grid-cols-[4ch_1fr] gap-6 border-t border-[var(--charcoal)]/12 py-7 md:grid-cols-[5ch_1fr] md:gap-10">
                <span className={`${MICRO} pt-3 text-[var(--crimson)]`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-serif text-xl font-medium leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[1.75rem]">
                  {line}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="w-full">
          <div className="mt-12 flex w-full max-w-4xl flex-wrap items-baseline justify-between gap-4 border-t border-[var(--charcoal)]/12 pt-5">
            <span className={`${MICRO} text-[var(--champagne)]`}>
              End of Week 02
            </span>
            <span className={`${MICRO} font-normal text-[var(--charcoal-light)]/55`}>
              Davood Wadi, PhD | BUSI 654
            </span>
          </div>
        </div>
      </Slide>
    </SlideDeck>
  );
}
