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
  hash,
  Head1,
  LEAD,
  MICRO,
  pad,
  PartPlate1,
  RULED,
  Split1,
  Steps,
  SVG_LABEL,
  TAG,
  Terms,
} from "../_visuals/kit";

// ============================================================================
// WEEK 06: AI IN BUSINESS STRATEGY
// ============================================================================
// Same deck grammar as Weeks 01 to 05: every slide is hand-composed for its own
// argument, with hairlines instead of boxes and crimson marking one thing.
//
// Sentences are transcribed verbatim from content.md. Figures carry only words
// that already appear in the slide's sentences.
//
// Quizzes: `Slide` renders `quizData` BEFORE its section. A [quiz] tag in
// content.md marks the topic to test, so each quiz is attached to the slide
// that FOLLOWS its topic and only tests material the student has already
// passed. No [quiz] topic in this week is followed by a part plate.
// ============================================================================

const quiz = createCourseQuizLookup(quizzes as CourseQuiz[]);

export default function Week06BusinessStrategy() {
  return (
    <SlideDeck>
      <ScrollProgress label="Week 06" />

      {/* ==================================================================
          01. TITLE: masthead. Artificial intelligence joined into
          competitive advantage. Implementation set beside alignment.
      ================================================================== */}
      <Slide id="title" align="left" className="relative overflow-hidden">
        <div>
          <div
            className={`${MICRO} flex items-center gap-4 text-[var(--champagne)]`}
          >
            Week 06
          </div>
        </div>

        <div>
          <h1 className="mt-4 max-w-4xl font-sans text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.15] tracking-[-0.015em] text-[var(--charcoal)]">
            AI in Business{" "}
            Strategy
          </h1>
        </div>

        <div className="w-full">
          <div className="mt-6 h-px w-full bg-[var(--charcoal)]/15" />
          <p className="mt-6 max-w-3xl font-sans text-lg font-normal leading-relaxed text-[var(--charcoal-light)] md:text-[1.375rem]">
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
        </div>

        <div className="w-full">
          <p className="mt-10 max-w-3xl font-sans text-lg font-normal leading-relaxed text-[var(--charcoal-light)] md:text-[1.375rem]">
            Moving beyond technological implementation to strategic alignment
          </p>
          <div aria-hidden className="mt-6 max-w-3xl">
            <Split1
              left="Technological implementation"
              right="Strategic alignment"
            />
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

      <PartPlate1
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
          03. NEW STRATEGIC LANDSCAPE: one market drawn twice: inside a
          fixed boundary, then with the boundary redrawn. Reactive struck
          for proactive. Decisions arriving faster and faster.
                                                          [quiz topic]
      ================================================================== */}
      <Slide id="strategic-landscape" border align="left">
        <Head1>The New Strategic Landscape</Head1>

        <div className="mt-10 grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-14">
          <div>            <p className={`${BODY} mt-4`}>
              Traditional strategy relied on static industry analysis and slow
              adaptation.
            </p>
            <svg
              role="img"
              aria-label="Rigid industry boundary divided into fixed sectors with a slow, step-by-step adaptation line."
              viewBox="0 0 400 156"
              className="mt-6 w-full"
              fill="none"
            >
              <title>
                Rigid industry boundary divided into fixed sectors with a slow,
                step-by-step adaptation line.
              </title>
              <rect
                x="16"
                y="14"
                width="368"
                height="104"
                fill="var(--charcoal)"
                fillOpacity="0.03"
                stroke="var(--charcoal)"
                strokeOpacity="0.6"
                strokeWidth="1.5"
              />
              <path
                d="M44 92H144V70H256V48H356"
                stroke="var(--charcoal)"
                strokeOpacity="0.55"
                strokeWidth="1.75"
              />
              {[
                [44, 92],
                [144, 70],
                [256, 48],
                [356, 48],
              ].map(([x, y]) => (
                <circle
                  key={`${x}-${y}`}
                  cx={x}
                  cy={y}
                  r="3.5"
                  fill="var(--surface)"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.7"
                  strokeWidth="1.5"
                />
              ))}
              <text
                {...SVG_LABEL}
                x="16"
                y="142"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                STATIC INDUSTRY ANALYSIS
              </text>
              <text
                {...SVG_LABEL}
                x="384"
                y="142"
                textAnchor="end"
                fill="var(--charcoal)"
                fillOpacity="0.5"
              >
                SLOW ADAPTATION
              </text>
            </svg>
          </div>

          <div>            <p className={`${BODY} mt-4`}>
              AI introduces dynamic, predictive capabilities that reshape market
              boundaries.
            </p>
            <svg
              role="img"
              aria-label="Former static market boundary expanding outward into a reshaped crimson market boundary driven by predictive capabilities."
              viewBox="0 0 400 156"
              className="mt-6 w-full"
              fill="none"
            >
              <title>
                Former static market boundary expanding outward into a reshaped
                crimson market boundary driven by predictive capabilities.
              </title>
              <path
                d="M16 40C16 20 88 12 200 14C312 16 384 22 384 44V90C384 110 312 118 200 116C88 114 16 108 16 88Z"
                fill="var(--crimson)"
                fillOpacity="0.05"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <rect
                x="68"
                y="34"
                width="220"
                height="64"
                stroke="var(--charcoal)"
                strokeOpacity="0.32"
                strokeDasharray="4 4"
              />
              {[
                { x1: 68, y1: 66, x2: 18, y2: 66, head: "M25 61l-7 5l7 5" },
                { x1: 288, y1: 50, x2: 382, y2: 50, head: "M375 45l7 5l-7 5" },
                { x1: 288, y1: 82, x2: 382, y2: 82, head: "M375 77l7 5l-7 5" },
              ].map((a, i) => (
                <g key={i}>
                  <path
                    d={`M${a.x1} ${a.y1}H${a.x2}`}
                    stroke="var(--crimson)"
                    strokeOpacity="0.7"
                    strokeWidth="1.5"
                  />
                  <path
                    d={a.head}
                    stroke="var(--crimson)"
                    strokeWidth="1.5"
                  />
                </g>
              ))}
              <text {...SVG_LABEL} x="16" y="142" fill="var(--crimson)">
                RESHAPE MARKET BOUNDARIES
              </text>
              <text
                {...SVG_LABEL}
                x="384"
                y="142"
                textAnchor="end"
                fill="var(--charcoal)"
                fillOpacity="0.55"
              >
                PREDICTIVE CAPABILITIES
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Organizations must transition from reactive planning to proactive
              foresight.
            </p>
            <div className="mt-5 max-w-4xl">
              <Split1
                left="Reactive planning"
                right="Proactive foresight"
                strikeLeft
              />
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-10 w-full max-w-5xl">
            <p className={`${DISPLAY} max-w-4xl`}>
              The velocity of strategic decision making accelerates
              significantly.
            </p>
            <figure className="mt-6 w-full">
              <svg
                role="img"
                aria-label="Decision cadence intervals compressing from wide spacing on the left to rapid crimson pulses on the right as velocity accelerates."
                viewBox="0 0 800 88"
                className="w-full"
                fill="none"
              >
                <title>
                  Decision cadence intervals compressing from wide spacing on
                  the left to rapid crimson pulses on the right as velocity
                  accelerates.
                </title>
                <text
                  {...SVG_LABEL}
                  x="16"
                  y="20"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  VELOCITY OF STRATEGIC DECISION MAKING
                </text>
                <text
                  {...SVG_LABEL}
                  x="784"
                  y="20"
                  textAnchor="end"
                  fill="var(--crimson)"
                >
                  ACCELERATES SIGNIFICANTLY
                </text>
                <path
                  d="M16 70H784"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.25"
                />
                <path
                  d="M776 65l8 5l-8 5"
                  stroke="var(--crimson)"
                  strokeWidth="1.5"
                />
                {(() => {
                  const ticks: number[] = [];
                  for (
                    let x = 24, g = 92;
                    x <= 760;
                    x += g, g = Math.max(g * 0.81, 7.5)
                  )
                    ticks.push(Math.round(x));
                  return ticks.map((x) => {
                    const ratio = (x - 24) / 736;
                    return (
                      <path
                        key={x}
                        d={`M${x} 36V70`}
                        stroke={ratio > 0.45 ? "var(--crimson)" : "var(--charcoal)"}
                        strokeOpacity={(0.3 + 0.7 * ratio).toFixed(2)}
                        strokeWidth={ratio > 0.65 ? "2" : "1.5"}
                      />
                    );
                  });
                })()}
              </svg>
            </figure>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          04. AI AS A STRATEGIC ASSET: data alone stopping short of
          advantage. Unique data training the crimson capability. A moat
          ring holding outsiders off a strategic position.
                                          [quiz: strategic-landscape]
      ================================================================== */}
      <Slide
        id="strategic-asset"
        border
        align="left"
        quizData={quiz["strategic-asset"]}
      >
        <Head1>AI as a Strategic Asset</Head1>

        <div className="mt-10 grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <p className={BODY}>
              Data alone is insufficient for competitive advantage.
            </p>
            <svg
              role="img"
              aria-label="A cylinder of raw data extending along a path that is blocked by a crimson barrier short of reaching competitive advantage."
              viewBox="0 0 400 150"
              className="mt-6 w-full"
              fill="none"
            >
              <title>
                A cylinder of raw data extending along a path that is blocked by
                a crimson barrier short of reaching competitive advantage.
              </title>
              <ellipse
                cx="52"
                cy="54"
                rx="36"
                ry="8"
                stroke="var(--charcoal)"
                strokeOpacity="0.6"
                strokeWidth="1.5"
              />
              <path
                d="M16 54V98A36 8 0 0 0 88 98V54M16 76A36 8 0 0 0 88 76"
                stroke="var(--charcoal)"
                strokeOpacity="0.6"
                strokeWidth="1.5"
              />
              <path
                d="M88 76H236"
                stroke="var(--charcoal)"
                strokeOpacity="0.45"
                strokeWidth="1.5"
              />
              <path
                d="M236 56V96"
                stroke="var(--crimson)"
                strokeWidth="2.5"
              />
              <circle
                cx="332"
                cy="76"
                r="18"
                stroke="var(--charcoal)"
                strokeOpacity="0.32"
                strokeWidth="1.5"
                strokeDasharray="3 4"
              />
              <text
                {...SVG_LABEL}
                x="52"
                y="134"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                DATA ALONE
              </text>
              <text
                {...SVG_LABEL}
                x="236"
                y="118"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                INSUFFICIENT
              </text>
              <text
                {...SVG_LABEL}
                x="384"
                y="38"
                textAnchor="end"
                fill="var(--charcoal)"
                fillOpacity="0.5"
              >
                COMPETITIVE ADVANTAGE
              </text>
            </svg>
          </div>

          <div>
            <p className={BODY}>
              The true asset is the proprietary algorithmic capability trained
              on unique data.
            </p>
            <svg
              role="img"
              aria-label="Unique data feeding directly into a crimson proprietary algorithmic capability network, marked as the true asset."
              viewBox="0 0 400 150"
              className="mt-6 w-full"
              fill="none"
            >
              <title>
                Unique data feeding directly into a crimson proprietary
                algorithmic capability network, marked as the true asset.
              </title>
              <ellipse
                cx="52"
                cy="54"
                rx="36"
                ry="8"
                stroke="var(--charcoal)"
                strokeOpacity="0.6"
                strokeWidth="1.5"
              />
              <path
                d="M16 54V98A36 8 0 0 0 88 98V54M16 76A36 8 0 0 0 88 76"
                stroke="var(--charcoal)"
                strokeOpacity="0.6"
                strokeWidth="1.5"
              />
              <path
                d="M88 76H198"
                stroke="var(--crimson)"
                strokeOpacity="0.75"
                strokeWidth="1.75"
              />
              <path
                d="M190 71l8 5l-8 5"
                stroke="var(--crimson)"
                strokeWidth="1.75"
              />
              <text
                {...SVG_LABEL}
                x="143"
                y="62"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.55"
              >
                TRAINED ON
              </text>
              <rect
                x="198"
                y="46"
                width="64"
                height="60"
                fill="var(--crimson)"
                fillOpacity="0.08"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <path
                d="M214 62L246 76M214 90L246 76"
                stroke="var(--crimson)"
                strokeOpacity="0.6"
                strokeWidth="1.25"
              />
              <circle cx="214" cy="62" r="3.5" fill="var(--crimson)" />
              <circle cx="214" cy="90" r="3.5" fill="var(--crimson)" />
              <circle cx="246" cy="76" r="4" fill="var(--crimson)" />
              {["PROPRIETARY", "ALGORITHMIC", "CAPABILITY"].map((word, i) => (
                <text
                  key={word}
                  {...SVG_LABEL}
                  x="276"
                  y={62 + i * 17}
                  fill="var(--charcoal)"
                  fillOpacity="0.75"
                >
                  {word}
                </text>
              ))}
              <text
                {...SVG_LABEL}
                x="52"
                y="134"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                UNIQUE DATA
              </text>
              <text
                {...SVG_LABEL}
                x="230"
                y="134"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                THE TRUE ASSET
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${DISPLAY} max-w-4xl`}>
              Organizations must build defensible data moats to protect their
              strategic position.
            </p>
            <svg
              role="img"
              aria-label="A central crimson strategic position surrounded by a double-ringed defensible data moat that blocks external arrows on both sides."
              viewBox="0 0 800 160"
              className="mt-6 w-full"
              fill="none"
            >
              <title>
                A central crimson strategic position surrounded by a
                double-ringed defensible data moat that blocks external arrows
                on both sides.
              </title>
              <rect
                x="256"
                y="18"
                width="288"
                height="96"
                rx="48"
                fill="var(--charcoal)"
                fillOpacity="0.04"
                stroke="var(--charcoal)"
                strokeOpacity="0.45"
                strokeWidth="1.5"
              />
              <rect
                x="272"
                y="32"
                width="256"
                height="68"
                rx="34"
                fill="var(--surface)"
                stroke="var(--charcoal)"
                strokeOpacity="0.45"
                strokeWidth="1.5"
              />
              <rect
                x="306"
                y="46"
                width="188"
                height="40"
                fill="var(--crimson)"
                fillOpacity="0.08"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <text
                {...SVG_LABEL}
                x="400"
                y="70"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                STRATEGIC POSITION
              </text>
              {[
                { c: 120, x1: 126, x2: 256, head: "M248 61l8 5l-8 5" },
                { c: 680, x1: 674, x2: 544, head: "M552 61l-8 5l8 5" },
              ].map((a) => (
                <g key={a.c}>
                  <circle
                    cx={a.c}
                    cy="66"
                    r="6"
                    fill="var(--surface)"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.55"
                    strokeWidth="1.5"
                  />
                  <path
                    d={`M${a.x1} 66H${a.x2}`}
                    stroke="var(--charcoal)"
                    strokeOpacity="0.4"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  <path
                    d={a.head}
                    stroke="var(--charcoal)"
                    strokeOpacity="0.55"
                    strokeWidth="1.5"
                  />
                </g>
              ))}
              <text
                {...SVG_LABEL}
                x="400"
                y="142"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.7"
              >
                DEFENSIBLE DATA MOATS
              </text>
            </svg>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          05. RETHINKING THE VALUE CHAIN: primary and support activities
          side by side, then the whole chain with AI in every activity and
          the margin arrow carrying the compound benefits.
      ================================================================== */}
      <Slide id="value-chain" border align="left">
        <Head1>Rethinking the Value Chain</Head1>

        <div className="mt-10 grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-14">
          <div>            <p className={`${BODY} mt-4`}>
              AI transforms primary activities, from inbound logistics to
              customer service.
            </p>
          </div>
          <div>            <p className={`${BODY} mt-4`}>
              Support activities like human resources and procurement become
              intelligent and predictive.
            </p>
            <Terms items={["intelligent", "predictive"]} />
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${DISPLAY} max-w-4xl`}>
              The integration of AI across the value chain creates compound
              strategic benefits.
            </p>
            <svg
              role="img"
              aria-label="A value chain diagram where AI nodes are integrated across support activities (human resources, procurement) and primary activities (from inbound logistics to customer service), converging into a crimson margin wedge of compound strategic benefits."
              viewBox="0 0 800 248"
              className="mt-7 w-full"
              fill="none"
            >
              <title>
                A value chain diagram where AI nodes are integrated across
                support activities (human resources, procurement) and primary
                activities (from inbound logistics to customer service),
                converging into a crimson margin wedge of compound strategic
                benefits.
              </title>
              <text
                {...SVG_LABEL}
                x="12"
                y="20"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                SUPPORT ACTIVITIES
              </text>
              <text
                {...SVG_LABEL}
                x="692"
                y="20"
                textAnchor="end"
                fill="var(--crimson)"
              >
                INTEGRATION OF AI ACROSS THE VALUE CHAIN
              </text>

              {[
                { y: 30, label: "HUMAN RESOURCES" },
                { y: 74, label: "PROCUREMENT" },
              ].map((band) => (
                <g key={band.label}>
                  <rect
                    x="12"
                    y={band.y}
                    width="680"
                    height="38"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.38"
                  />
                  <text
                    {...SVG_LABEL}
                    x="26"
                    y={band.y + 23}
                    fill="var(--charcoal)"
                    fillOpacity="0.7"
                  >
                    {band.label}
                  </text>
                  <path
                    d={`M356 ${band.y + 19}H484M492 ${band.y + 19}H620`}
                    stroke="var(--crimson)"
                    strokeOpacity="0.35"
                  />
                  {[352, 488, 624].map((x) => (
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
                const x = 12 + i * 136;
                const tail = i === 0 ? "Z" : `L${x + 14} 156Z`;
                return (
                  <g key={i}>
                    <path
                      d={`M${x} 122H${x + 122}L${x + 136} 156L${x + 122} 190H${x}${tail}`}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.45"
                    />
                    <circle
                      cx={x + 68}
                      cy="156"
                      r="4.5"
                      fill="var(--crimson)"
                    />
                  </g>
                );
              })}

              <path
                d="M700 30L788 110L700 190Z"
                fill="var(--crimson)"
                fillOpacity="0.12"
                stroke="var(--crimson)"
                strokeWidth="2"
              />

              <text
                {...SVG_LABEL}
                x="12"
                y="212"
                fill="var(--charcoal)"
                fillOpacity="0.7"
              >
                INBOUND LOGISTICS
              </text>
              <text
                {...SVG_LABEL}
                x="676"
                y="212"
                textAnchor="end"
                fill="var(--charcoal)"
                fillOpacity="0.7"
              >
                CUSTOMER SERVICE
              </text>
              <text
                {...SVG_LABEL}
                x="12"
                y="236"
                fill="var(--charcoal)"
                fillOpacity="0.55"
              >
                PRIMARY ACTIVITIES
              </text>
              <text
                {...SVG_LABEL}
                x="788"
                y="236"
                textAnchor="end"
                fill="var(--crimson)"
              >
                COMPOUND STRATEGIC BENEFITS
              </text>
            </svg>
          </div>
        </div>

        <Discussion1>
          Which segment of the traditional value chain is most vulnerable to
          commoditization by AI competitors?
        </Discussion1>
      </Slide>

      {/* ==================================================================
          06. FALLACY OF PLUG AND PLAY: the same square tool docked on three
          different firms. A crimson piece cut to interlock with one firm's
          uneven edge. Strategy and architecture joined at every seam.
      ================================================================== */}
      <Slide id="plug-and-play" border align="left">
        <Head1>
          The Fallacy of Plug and Play
        </Head1>

        <div className="mt-10 grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <p className={BODY}>
              Implementing off-the-shelf AI tools does not confer long-term
              advantage.
            </p>
            <svg
              role="img"
              aria-label="A flat, generic off-the-shelf AI tool block resting on top of an uneven organizational process profile, leaving gaps where it fails to fit."
              viewBox="0 0 400 176"
              className="mt-6 w-full"
              fill="none"
            >
              <title>
                A flat, generic off-the-shelf AI tool block resting on top of an
                uneven organizational process profile, leaving gaps where it
                fails to fit.
              </title>
              <text
                {...SVG_LABEL}
                x="40"
                y="26"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                OFF-THE-SHELF AI TOOLS
              </text>
              <rect
                x="40"
                y="38"
                width="320"
                height="42"
                fill="var(--charcoal)"
                fillOpacity="0.06"
                stroke="var(--charcoal)"
                strokeOpacity="0.55"
                strokeWidth="1.5"
              />
              {(() => {
                const depths = [4, 30, 10, 38, 18, 34, 6, 24];
                const edge = depths
                  .map((d, i) => `H${40 + i * 40}V${90 + d}H${80 + i * 40}`)
                  .join("");
                const org = `M40 148V${90 + depths[0]}${edge}V148Z`;
                return (
                  <path
                    d={org}
                    fill="var(--charcoal)"
                    fillOpacity="0.03"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.55"
                    strokeWidth="1.5"
                  />
                );
              })()}
              <text
                {...SVG_LABEL}
                x="40"
                y="168"
                fill="var(--charcoal)"
                fillOpacity="0.55"
              >
                DOES NOT CONFER LONG-TERM ADVANTAGE
              </text>
            </svg>
          </div>

          <div>
            <p className={BODY}>
              Strategic value requires deep integration with unique
              organizational processes.
            </p>
            <svg
              role="img"
              aria-label="A custom-shaped crimson AI layer interlocking with every slot of a unique organizational process profile."
              viewBox="0 0 400 176"
              className="mt-6 w-full"
              fill="none"
            >
              <title>
                A custom-shaped crimson AI layer interlocking with every slot of
                a unique organizational process profile.
              </title>
              {(() => {
                const depths = [4, 30, 10, 38, 18, 34, 6, 24];
                const edge = (offset: number) =>
                  depths
                    .map(
                      (d, i) =>
                        `H${40 + i * 40}V${90 + d + offset}H${80 + i * 40}`,
                    )
                    .join("");
                const org = `M40 148V${90 + depths[0]}${edge(0)}V148Z`;
                const piece = `M40 38V${86 + depths[0]}${edge(-4)}V38Z`;
                return (
                  <g>
                    <path
                      d={piece}
                      fill="var(--crimson)"
                      fillOpacity="0.12"
                      stroke="var(--crimson)"
                      strokeWidth="1.75"
                    />
                    <path
                      d={org}
                      fill="var(--charcoal)"
                      fillOpacity="0.03"
                      stroke="var(--charcoal)"
                      strokeOpacity="0.55"
                      strokeWidth="1.5"
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
                y="168"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                UNIQUE ORGANIZATIONAL PROCESSES
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${DISPLAY} max-w-4xl`}>
              The alignment between business strategy and AI architecture is
              paramount.
            </p>
            <svg
              role="img"
              aria-label="Four modules of business strategy aligned one-to-one with four corresponding modules of AI architecture via vertical crimson links."
              viewBox="0 0 800 116"
              className="mt-6 w-full"
              fill="none"
            >
              <title>
                Four modules of business strategy aligned one-to-one with four
                corresponding modules of AI architecture via vertical crimson
                links.
              </title>
              <text
                {...SVG_LABEL}
                x="16"
                y="34"
                fill="var(--charcoal)"
                fillOpacity="0.7"
              >
                BUSINESS STRATEGY
              </text>
              <text
                {...SVG_LABEL}
                x="16"
                y="94"
                fill="var(--charcoal)"
                fillOpacity="0.7"
              >
                AI ARCHITECTURE
              </text>
              <text
                {...SVG_LABEL}
                x="16"
                y="64"
                fill="var(--crimson)"
              >
                ALIGNMENT
              </text>
              {[200, 350, 500, 650].map((x) => (
                <g key={x}>
                  <rect
                    x={x}
                    y="18"
                    width="130"
                    height="24"
                    fill="var(--charcoal)"
                    fillOpacity="0.06"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.45"
                  />
                  <rect
                    x={x}
                    y="78"
                    width="130"
                    height="24"
                    fill="var(--charcoal)"
                    fillOpacity="0.06"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.45"
                  />
                  <path
                    d={`M${x + 65} 42V78`}
                    stroke="var(--crimson)"
                    strokeWidth="2"
                  />
                  <circle cx={x + 65} cy="42" r="3" fill="var(--crimson)" />
                  <circle cx={x + 65} cy="78" r="3" fill="var(--crimson)" />
                </g>
              ))}
            </svg>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          07. LEADERSHIP IMPERATIVE: strategy held at the top of the chart,
          the hand-off to IT struck out. A spread of probabilistic outcomes.
          Initiatives lined up across functions toward business goals.
      ================================================================== */}
      <Slide id="leadership" border align="left">
        <Head1>The Leadership Imperative</Head1>

        <div className="w-full">
          <p className={`${LEAD} mt-9 max-w-4xl`}>
            Executive leadership must own the AI strategy, not delegate it to
            the IT department.
          </p>
          <svg
            role="img"
            aria-label="An organizational chart where executive leadership at the top holds the crimson AI strategy, while a dashed delegation path toward the IT department is blocked by a crimson barrier."
            viewBox="0 0 800 156"
            className="mt-7 w-full max-w-5xl"
            fill="none"
          >
            <title>
              An organizational chart where executive leadership at the top
              holds the crimson AI strategy, while a dashed delegation path
              toward the IT department is blocked by a crimson barrier.
            </title>
            <path
              d="M400 40V72H200V104M400 72V104M400 72H600V104"
              stroke="var(--charcoal)"
              strokeOpacity="0.32"
              strokeWidth="1.5"
            />
            <rect
              x="386"
              y="12"
              width="28"
              height="28"
              fill="var(--crimson)"
              fillOpacity="0.12"
              stroke="var(--crimson)"
              strokeWidth="2"
            />
            <circle cx="400" cy="26" r="4.5" fill="var(--crimson)" />
            <text
              {...SVG_LABEL}
              x="372"
              y="22"
              textAnchor="end"
              fill="var(--charcoal)"
              fillOpacity="0.75"
            >
              EXECUTIVE LEADERSHIP
            </text>
            <text
              {...SVG_LABEL}
              x="372"
              y="38"
              textAnchor="end"
              fill="var(--crimson)"
            >
              OWN THE AI STRATEGY
            </text>
            {[200, 400, 600].map((x) => (
              <rect
                key={x}
                x={x - 12}
                y="104"
                width="24"
                height="24"
                fill="var(--surface)"
                stroke="var(--charcoal)"
                strokeOpacity="0.55"
                strokeWidth="1.5"
              />
            ))}
            <text
              {...SVG_LABEL}
              x="600"
              y="146"
              textAnchor="middle"
              fill="var(--charcoal)"
              fillOpacity="0.65"
            >
              IT DEPARTMENT
            </text>
            <path
              d="M414 26C548 26 644 42 644 82"
              stroke="var(--charcoal)"
              strokeOpacity="0.38"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <path
              d="M628 82H660"
              stroke="var(--crimson)"
              strokeWidth="2.5"
            />
            <text {...SVG_LABEL} x="670" y="86" fill="var(--crimson)">
              NOT DELEGATE
            </text>
          </svg>
        </div>

        <div className="mt-12 grid w-full max-w-5xl gap-10 border-t border-[var(--charcoal)]/10 pt-8 md:grid-cols-2 md:gap-14">
          <div>
            <p className={BODY}>
              Cultivating an organizational mindset that embraces probabilistic
              outcomes.
            </p>
            <figure className="mt-6 w-full">
              <svg
                role="img"
                aria-label="A smooth probability density curve with a shaded central interval representing probabilistic outcomes."
                viewBox="0 0 400 140"
                className="w-full"
                fill="none"
              >
                <title>
                  A smooth probability density curve with a shaded central
                  interval representing probabilistic outcomes.
                </title>
                <path
                  d={`${Array.from({ length: 23 })
                    .map((_, i) => {
                      const x = 156 + i * 4;
                      const y = 100 - 80 * Math.exp(-(((x - 200) / 62) ** 2));
                      return `${i === 0 ? "M156 100L" : "L"}${x} ${y.toFixed(1)}`;
                    })
                    .join("")}L244 100Z`}
                  fill="var(--crimson)"
                  fillOpacity="0.08"
                />
                <path
                  d="M156 49V100M244 49V100"
                  stroke="var(--crimson)"
                  strokeOpacity="0.35"
                  strokeDasharray="3 3"
                />
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
                <path
                  d="M20 100H380"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.35"
                />
                <text
                  {...SVG_LABEL}
                  x="20"
                  y="126"
                  fill="var(--charcoal)"
                  fillOpacity="0.65"
                >
                  PROBABILISTIC OUTCOMES
                </text>
              </svg>
            </figure>
          </div>

          <div>
            <p className={BODY}>
              Fostering cross-functional collaboration to align AI initiatives
              with business goals.
            </p>
            <svg
              role="img"
              aria-label="Four functional units linked in sequence through their crimson AI initiatives to reach a shared business goals target."
              viewBox="0 0 400 140"
              className="mt-6 w-full"
              fill="none"
            >
              <title>
                Four functional units linked in sequence through their crimson
                AI initiatives to reach a shared business goals target.
              </title>
              {[36, 106, 176, 246].map((x) => (
                <g key={x}>
                  <rect
                    x={x}
                    y="26"
                    width="40"
                    height="76"
                    fill="var(--charcoal)"
                    fillOpacity="0.03"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.4"
                  />
                  <circle cx={x + 20} cy="64" r="4.5" fill="var(--crimson)" />
                </g>
              ))}
              <path
                d="M76 64H106M146 64H176M216 64H246M286 64H336"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <path
                d="M328 58l8 6l-8 6"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <circle
                cx="356"
                cy="64"
                r="20"
                stroke="var(--crimson)"
                strokeWidth="1.5"
              />
              <circle cx="356" cy="64" r="7" fill="var(--crimson)" />
              <text
                {...SVG_LABEL}
                x="384"
                y="22"
                textAnchor="end"
                fill="var(--crimson)"
              >
                BUSINESS GOALS
              </text>
              <text
                {...SVG_LABEL}
                x="36"
                y="126"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                CROSS-FUNCTIONAL COLLABORATION
              </text>
            </svg>
          </div>
        </div>
      </Slide>

      <PartPlate1
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
          09. DIMENSIONS OF VALUE CREATION: three numbered columns: costs
          stepping down, revenue stepping up, a new stream branching off.
          Then the three set against strategic return.     [quiz topic]
      ================================================================== */}
      <Slide id="value-dimensions" border align="left">
        <Head1>Dimensions of Value Creation</Head1>

        <div className="mt-10 grid w-full max-w-5xl gap-10 md:grid-cols-3 md:gap-10">
          <div>
            <div className={`${MICRO} text-[var(--crimson)]`}>01</div>
            <p className={`${BODY} mt-3`}>
              Cost reduction through intelligent automation and process
              optimization.
            </p>
            <figure className="mt-6 w-full">
              <svg
                role="img"
                aria-label="Five bars stepping downward from left to right, ending in a low crimson bar representing cost reduction."
                viewBox="0 0 400 130"
                className="w-full"
                fill="none"
              >
                <title>
                  Five bars stepping downward from left to right, ending in a
                  low crimson bar representing cost reduction.
                </title>
                <text
                  {...SVG_LABEL}
                  x="16"
                  y="20"
                  fill="var(--charcoal)"
                  fillOpacity="0.65"
                >
                  COST REDUCTION
                </text>
                {[78, 64, 52, 42, 32].map((h, i) => (
                  <rect
                    key={h}
                    x={20 + i * 76}
                    y={116 - h}
                    width="48"
                    height={h}
                    fill={i === 4 ? "var(--crimson)" : "var(--charcoal)"}
                    fillOpacity={i === 4 ? 1 : 0.16 + i * 0.05}
                  />
                ))}
                <path
                  d="M16 116H384"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.3"
                />
              </svg>
            </figure>
            <Terms items={["intelligent automation", "process optimization"]} />
          </div>

          <div>
            <div className={`${MICRO} text-[var(--crimson)]`}>02</div>
            <p className={`${BODY} mt-3`}>
              Revenue growth via hyper-personalization and predictive
              cross-selling.
            </p>
            <figure className="mt-6 w-full">
              <svg
                role="img"
                aria-label="Five bars stepping upward from left to right, culminating in a tall crimson bar representing revenue growth."
                viewBox="0 0 400 130"
                className="w-full"
                fill="none"
              >
                <title>
                  Five bars stepping upward from left to right, culminating in a
                  tall crimson bar representing revenue growth.
                </title>
                <text
                  {...SVG_LABEL}
                  x="16"
                  y="20"
                  fill="var(--charcoal)"
                  fillOpacity="0.65"
                >
                  REVENUE GROWTH
                </text>
                {[32, 42, 52, 64, 78].map((h, i) => (
                  <rect
                    key={h}
                    x={20 + i * 76}
                    y={116 - h}
                    width="48"
                    height={h}
                    fill={i === 4 ? "var(--crimson)" : "var(--charcoal)"}
                    fillOpacity={i === 4 ? 1 : 0.16 + i * 0.05}
                  />
                ))}
                <path
                  d="M16 116H384"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.3"
                />
              </svg>
            </figure>
            <Terms
              items={["hyper-personalization", "predictive cross-selling"]}
            />
          </div>

          <div>
            <div className={`${MICRO} text-[var(--crimson)]`}>03</div>
            <p className={`${BODY} mt-3`}>
              Business model innovation enabling entirely new revenue streams.
            </p>
            <svg
              role="img"
              aria-label="Two new crimson revenue streams branching upward from an existing baseline line through business model innovation."
              viewBox="0 0 400 130"
              className="mt-6 w-full"
              fill="none"
            >
              <title>
                Two new crimson revenue streams branching upward from an
                existing baseline line through business model innovation.
              </title>
              <text
                {...SVG_LABEL}
                x="16"
                y="20"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                BUSINESS MODEL INNOVATION
              </text>
              <path
                d="M16 108H384"
                stroke="var(--charcoal)"
                strokeOpacity="0.45"
                strokeWidth="2"
              />
              {[52, 80].map((y) => (
                <g key={y}>
                  <path
                    d={`M110 108C180 108 210 ${y} 380 ${y}`}
                    stroke="var(--crimson)"
                    strokeWidth="2"
                  />
                  <path
                    d={`M372 ${y - 5}l8 5l-8 5`}
                    stroke="var(--crimson)"
                    strokeWidth="2"
                  />
                </g>
              ))}
              <circle cx="110" cy="108" r="4.5" fill="var(--crimson)" />
              <text
                {...SVG_LABEL}
                x="384"
                y="38"
                textAnchor="end"
                fill="var(--crimson)"
              >
                NEW REVENUE STREAMS
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${DISPLAY} max-w-4xl`}>
              The highest strategic return often comes from business model
              innovation.
            </p>
            <figure className="mt-7 w-full">
              <svg
                role="img"
                aria-label="Horizontal bar chart comparing strategic return across cost reduction, revenue growth, and business model innovation, with business model innovation extending furthest in crimson."
                viewBox="0 0 800 148"
                className="w-full"
                fill="none"
              >
                <title>
                  Horizontal bar chart comparing strategic return across cost
                  reduction, revenue growth, and business model innovation, with
                  business model innovation extending furthest in crimson.
                </title>
                {[
                  { y: 24, w: 240, label: "COST REDUCTION" },
                  { y: 60, w: 330, label: "REVENUE GROWTH" },
                  { y: 96, w: 510, label: "BUSINESS MODEL INNOVATION" },
                ].map((row, i) => (
                  <g key={row.label}>
                    <text
                      {...SVG_LABEL}
                      x="16"
                      y={row.y + 4}
                      fill={i === 2 ? "var(--crimson)" : "var(--charcoal)"}
                      fillOpacity={i === 2 ? 1 : 0.65}
                    >
                      {row.label}
                    </text>
                    <rect
                      x="256"
                      y={row.y - 8}
                      width={row.w}
                      height="16"
                      fill={i === 2 ? "var(--crimson)" : "var(--charcoal)"}
                      fillOpacity={i === 2 ? 1 : 0.2}
                    />
                  </g>
                ))}
                <path
                  d="M256 120H784"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.35"
                />
                <path
                  d="M776 115l8 5l-8 5"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.5"
                />
                <text
                  {...SVG_LABEL}
                  x="784"
                  y="138"
                  textAnchor="end"
                  fill="var(--charcoal)"
                  fillOpacity="0.65"
                >
                  HIGHEST STRATEGIC RETURN
                </text>
              </svg>
            </figure>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          10. PRODUCT AND SERVICE TRANSFORMATION: a product with two
          crimson additions. Separate sales against one continuous service
          line. Static struck for learning.       [quiz: value-dimensions]
      ================================================================== */}
      <Slide
        id="product-service"
        border
        align="left"
        quizData={quiz["product-service"]}
      >
        <Head1>
          Product and Service Transformation
        </Head1>

        <div className="mt-10 grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <p className={BODY}>
              Augmenting existing products with predictive maintenance and
              intelligent features.
            </p>
            <svg
              role="img"
              aria-label="An existing product unit augmented by two connected crimson modules for predictive maintenance and intelligent features."
              viewBox="0 0 400 144"
              className="mt-6 w-full"
              fill="none"
            >
              <title>
                An existing product unit augmented by two connected crimson
                modules for predictive maintenance and intelligent features.
              </title>
              <rect
                x="16"
                y="20"
                width="84"
                height="84"
                fill="var(--charcoal)"
                fillOpacity="0.04"
                stroke="var(--charcoal)"
                strokeOpacity="0.6"
                strokeWidth="1.5"
              />
              <rect
                x="34"
                y="38"
                width="48"
                height="48"
                stroke="var(--charcoal)"
                strokeOpacity="0.3"
              />
              {[
                { y: 24, label: "PREDICTIVE MAINTENANCE" },
                { y: 68, label: "INTELLIGENT FEATURES" },
              ].map((a) => (
                <g key={a.label}>
                  <path
                    d={`M100 ${a.y + 16}H140`}
                    stroke="var(--crimson)"
                    strokeWidth="1.75"
                  />
                  <path
                    d={`M133 ${a.y + 11}l7 5l-7 5`}
                    stroke="var(--crimson)"
                    strokeWidth="1.5"
                  />
                  <rect
                    x="140"
                    y={a.y}
                    width="244"
                    height="32"
                    fill="var(--crimson)"
                    fillOpacity="0.06"
                    stroke="var(--crimson)"
                    strokeWidth="1.5"
                  />
                  <text
                    {...SVG_LABEL}
                    x="154"
                    y={a.y + 20}
                    fill="var(--crimson)"
                  >
                    {a.label}
                  </text>
                </g>
              ))}
              <text
                {...SVG_LABEL}
                x="16"
                y="128"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                EXISTING PRODUCTS
              </text>
            </svg>
          </div>

          <div>
            <p className={BODY}>
              Shifting from selling discrete products to offering continuous,
              AI-enhanced services.
            </p>
            <svg
              role="img"
              aria-label="Four separate discrete product boxes contrasted with a continuous crimson service stream."
              viewBox="0 0 400 144"
              className="mt-6 w-full"
              fill="none"
            >
              <title>
                Four separate discrete product boxes contrasted with a
                continuous crimson service stream.
              </title>
              <text
                {...SVG_LABEL}
                x="16"
                y="20"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                DISCRETE PRODUCTS
              </text>
              {[0, 1, 2, 3].map((i) => (
                <rect
                  key={i}
                  x={16 + i * 114}
                  y="32"
                  width="24"
                  height="24"
                  fill="var(--charcoal)"
                  fillOpacity="0.04"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.6"
                  strokeWidth="1.5"
                />
              ))}
              <path
                d="M16 88H376V96H16Z"
                fill="var(--crimson)"
                fillOpacity="0.1"
              />
              <path
                d="M16 92H382"
                stroke="var(--crimson)"
                strokeWidth="2.5"
              />
              <path
                d="M374 86l8 6l-8 6"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <text {...SVG_LABEL} x="16" y="128" fill="var(--crimson)">
                CONTINUOUS, AI-ENHANCED SERVICES
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${DISPLAY} max-w-4xl`}>
              The transition from static offerings to learning, evolving
              solutions.
            </p>
            <div className="mt-6 max-w-4xl">
              <Split1
                left="Static offerings"
                right="Learning, evolving solutions"
                strikeLeft
              />
            </div>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          11. ECONOMICS OF AI: one tall step of fixed cost then a nearly flat
          line. Two falling cost curves, the network-effect one steeper.
          Returns that flatten with volume but keep rising with quality.
                                                          [quiz topic]
      ================================================================== */}
      <Slide id="ai-economics" border align="left">
        <Head1>The Economics of AI</Head1>

        <div className="mt-10 grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <p className={BODY}>
              High fixed costs of model development paired with near-zero
              marginal costs of deployment.
            </p>
            <figure className="mt-6 w-full">
              <svg
                role="img"
                aria-label="A cost curve with a tall upfront crimson step for high fixed costs of model development followed by a nearly flat slope for near-zero marginal costs of deployment."
                viewBox="0 0 400 176"
                className="w-full"
                fill="none"
              >
                <title>
                  A cost curve with a tall upfront crimson step for high fixed
                  costs of model development followed by a nearly flat slope for
                  near-zero marginal costs of deployment.
                </title>
                <path
                  d="M24 14V144H384"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.35"
                />
                <rect
                  x="24"
                  y="48"
                  width="24"
                  height="96"
                  fill="var(--crimson)"
                  fillOpacity="0.1"
                />
                <path
                  d="M48 144V48"
                  stroke="var(--crimson)"
                  strokeWidth="2.5"
                />
                <path
                  d="M48 48L384 36"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.7"
                  strokeWidth="2"
                />
                <text {...SVG_LABEL} x="62" y="80" fill="var(--crimson)">
                  HIGH FIXED COSTS
                </text>
                <text
                  {...SVG_LABEL}
                  x="62"
                  y="98"
                  fill="var(--charcoal)"
                  fillOpacity="0.55"
                >
                  MODEL DEVELOPMENT
                </text>
                <text
                  {...SVG_LABEL}
                  x="384"
                  y="24"
                  textAnchor="end"
                  fill="var(--charcoal)"
                  fillOpacity="0.7"
                >
                  NEAR-ZERO MARGINAL COSTS
                </text>
                <text
                  {...SVG_LABEL}
                  x="384"
                  y="164"
                  textAnchor="end"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  DEPLOYMENT
                </text>
              </svg>
            </figure>
          </div>

          <div>
            <p className={BODY}>
              Economies of scale are amplified by network effects in data
              accumulation.
            </p>
            <figure className="mt-6 w-full">
              <svg
                role="img"
                aria-label="Two falling unit-cost curves over data accumulation, where the crimson curve with network effects drops much more steeply than standard economies of scale."
                viewBox="0 0 400 176"
                className="w-full"
                fill="none"
              >
                <title>
                  Two falling unit-cost curves over data accumulation, where the
                  crimson curve with network effects drops much more steeply
                  than standard economies of scale.
                </title>
                <path
                  d="M24 14V144H384"
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
                        const y = 144 - 96 / (1 + t * c.k);
                        return `${i === 0 ? "M" : "L"}${24 + t * 360} ${y.toFixed(1)}`;
                      })
                      .join("")}
                    stroke={c.stroke}
                    strokeOpacity={c.opacity}
                    strokeWidth="2"
                  />
                ))}
                <text
                  {...SVG_LABEL}
                  x="34"
                  y="22"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  COSTS
                </text>
                <text
                  {...SVG_LABEL}
                  x="210"
                  y="78"
                  fill="var(--charcoal)"
                  fillOpacity="0.65"
                >
                  ECONOMIES OF SCALE
                </text>
                <text {...SVG_LABEL} x="54" y="136" fill="var(--crimson)">
                  NETWORK EFFECTS
                </text>
                <text
                  {...SVG_LABEL}
                  x="384"
                  y="164"
                  textAnchor="end"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  DATA ACCUMULATION
                </text>
              </svg>
            </figure>
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${LEAD} max-w-4xl`}>
              Understanding the diminishing returns of data volume versus data
              quality.
            </p>
            <figure className="mt-7 w-full">
              <svg
                role="img"
                aria-label="Two side-by-side return curves: returns to data volume flattening into diminishing returns on the left, while returns to data quality continue climbing in crimson on the right."
                viewBox="0 0 800 176"
                className="w-full"
                fill="none"
              >
                <title>
                  Two side-by-side return curves: returns to data volume
                  flattening into diminishing returns on the left, while returns
                  to data quality continue climbing in crimson on the right.
                </title>
                {[
                  { x0: 24, label: "DATA VOLUME", crimson: false },
                  { x0: 444, label: "DATA QUALITY", crimson: true },
                ].map((p) => (
                  <g key={p.label}>
                    <path
                      d={`M${p.x0} 14V144H${p.x0 + 340}`}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.35"
                    />
                    <path
                      d={Array.from({ length: 35 })
                        .map((_, i) => {
                          const t = i / 34;
                          const r = p.crimson ? t * 0.96 : 1 - Math.exp(-4 * t);
                          return `${i === 0 ? "M" : "L"}${p.x0 + t * 340} ${(144 - 104 * r).toFixed(1)}`;
                        })
                        .join("")}
                      stroke={p.crimson ? "var(--crimson)" : "var(--charcoal)"}
                      strokeOpacity={p.crimson ? 1 : 0.65}
                      strokeWidth="2"
                    />
                    <text
                      {...SVG_LABEL}
                      x={p.x0 + 10}
                      y="22"
                      fill="var(--charcoal)"
                      fillOpacity="0.6"
                    >
                      RETURNS
                    </text>
                    <text
                      {...SVG_LABEL}
                      x={p.x0 + 340}
                      y="164"
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
                  x="364"
                  y="30"
                  textAnchor="end"
                  fill="var(--charcoal)"
                  fillOpacity="0.65"
                >
                  DIMINISHING RETURNS
                </text>
              </svg>
            </figure>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          12. CAPTURING VALUE FROM ECOSYSTEMS: one lone firm beside a
          crimson hub wired to its partners. Data passing both ways across
          an agreement.                                [quiz: ai-economics]
      ================================================================== */}
      <Slide
        id="ecosystems"
        border
        align="left"
        quizData={quiz["ecosystems"]}
      >
        <Head1>Capturing Value from Ecosystems</Head1>

        <div className="w-full">
          <p className={`${LEAD} mt-9 max-w-4xl`}>
            Competing as an ecosystem orchestrator rather than a standalone
            firm.
          </p>
          <svg
            role="img"
            aria-label="A standalone firm square on the left contrasted with a crimson ecosystem orchestrator square connected symmetrically to six partner nodes on the right."
            viewBox="0 0 800 164"
            className="mt-7 w-full max-w-5xl"
            fill="none"
          >
            <title>
              A standalone firm square on the left contrasted with a crimson
              ecosystem orchestrator square connected symmetrically to six
              partner nodes on the right.
            </title>
            <rect
              x="188"
              y="58"
              width="24"
              height="24"
              fill="var(--charcoal)"
              fillOpacity="0.04"
              stroke="var(--charcoal)"
              strokeOpacity="0.6"
              strokeWidth="1.5"
            />
            <text
              {...SVG_LABEL}
              x="200"
              y="150"
              textAnchor="middle"
              fill="var(--charcoal)"
              fillOpacity="0.6"
            >
              STANDALONE FIRM
            </text>
            <path
              d="M400 12V140"
              stroke="var(--charcoal)"
              strokeOpacity="0.2"
              strokeDasharray="3 5"
            />
            {Array.from({ length: 6 }).map((_, k) => {
              const a = (k / 6) * Math.PI * 2 - Math.PI / 2;
              const x = +(600 + Math.cos(a) * 56).toFixed(2);
              const y = +(70 + Math.sin(a) * 56).toFixed(2);
              return (
                <g key={k}>
                  <path
                    d={`M600 70L${x} ${y}`}
                    stroke="var(--crimson)"
                    strokeOpacity="0.45"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r="6"
                    fill="var(--surface)"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.65"
                    strokeWidth="1.5"
                  />
                </g>
              );
            })}
            <rect x="588" y="58" width="24" height="24" fill="var(--crimson)" />
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
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Leveraging AI to optimize partner interactions and platform
              dynamics.
            </p>
            <Terms items={["partner interactions", "platform dynamics"]} />
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <p className={`${DISPLAY} max-w-4xl`}>
              Data sharing agreements become critical strategic assets.
            </p>
            <svg
              role="img"
              aria-label="Two partner firms exchanging bidirectional data streams through a central crimson data sharing agreement document."
              viewBox="0 0 800 112"
              className="mt-6 w-full"
              fill="none"
            >
              <title>
                Two partner firms exchanging bidirectional data streams through
                a central crimson data sharing agreement document.
              </title>
              {[180, 620].map((x) => (
                <rect
                  key={x}
                  x={x - 14}
                  y="30"
                  width="28"
                  height="28"
                  fill="var(--charcoal)"
                  fillOpacity="0.04"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.6"
                  strokeWidth="1.5"
                />
              ))}
              <path
                d="M194 36H374M426 36H606"
                stroke="var(--charcoal)"
                strokeOpacity="0.5"
                strokeWidth="1.5"
              />
              <path
                d="M598 31l8 5l-8 5"
                stroke="var(--charcoal)"
                strokeOpacity="0.65"
                strokeWidth="1.5"
              />
              <path
                d="M606 52H426M374 52H194"
                stroke="var(--charcoal)"
                strokeOpacity="0.5"
                strokeWidth="1.5"
              />
              <path
                d="M202 47l-8 5l8 5"
                stroke="var(--charcoal)"
                strokeOpacity="0.65"
                strokeWidth="1.5"
              />
              <path
                d="M374 14H414L426 26V74H374Z"
                fill="var(--surface)"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <path
                d="M414 14V26H426"
                stroke="var(--crimson)"
                strokeOpacity="0.6"
                strokeWidth="1.5"
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
                y="98"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                DATA SHARING AGREEMENTS
              </text>
            </svg>
          </div>
        </div>

        <Discussion1>
          How should a firm balance data sharing for ecosystem growth against
          the risk of leaking competitive advantage?
        </Discussion1>
      </Slide>

      {/* ==================================================================
          13. PRICING STRATEGY: a flat price beside a crimson price that
          moves. Willingness to pay as bars, the surplus above one fixed price
          shaded, then each bar priced at its own height. The risks named.
      ================================================================== */}
      <Slide id="pricing" border align="left">
        <Head1>Pricing Strategy in the AI Era</Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Moving from fixed pricing to dynamic, algorithmic pricing models.
          </p>
          <figure className="mt-7 w-full max-w-5xl">
            <svg
              role="img"
              aria-label="A flat fixed pricing line on the left transitioning via an arrow to a step-varying crimson dynamic, algorithmic pricing line on the right."
              viewBox="0 0 800 100"
              className="w-full"
              fill="none"
            >
              <title>
                A flat fixed pricing line on the left transitioning via an arrow
                to a step-varying crimson dynamic, algorithmic pricing line on
                the right.
              </title>
              <text
                {...SVG_LABEL}
                x="16"
                y="20"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                FIXED PRICING
              </text>
              <path
                d="M16 62H356"
                stroke="var(--charcoal)"
                strokeOpacity="0.6"
                strokeWidth="2"
              />
              <path
                d="M376 62H420"
                stroke="var(--charcoal)"
                strokeOpacity="0.45"
                strokeWidth="1.5"
              />
              <path
                d="M412 56l8 6l-8 6"
                stroke="var(--charcoal)"
                strokeOpacity="0.6"
                strokeWidth="1.5"
              />
              <text
                {...SVG_LABEL}
                x="784"
                y="20"
                textAnchor="end"
                fill="var(--crimson)"
              >
                DYNAMIC, ALGORITHMIC PRICING
              </text>
              <path
                d={Array.from({ length: 10 })
                  .map((_, i) => {
                    const y = +(62 + (hash(i + 4) - 0.5) * 48).toFixed(1);
                    const x0 = 444 + i * 34;
                    const x1 = x0 + 34;
                    return `${i === 0 ? `M${x0} ${y}` : `V${y}`}H${x1}`;
                  })
                  .join("")}
                stroke="var(--crimson)"
                strokeWidth="2"
              />
            </svg>
          </figure>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Capturing consumer surplus through personalized pricing based on
              willingness to pay.
            </p>
            <figure className="mt-7 w-full">
              <svg
                role="img"
                aria-label="Left panel showing willingness-to-pay bars with shaded consumer surplus above a single price line; right panel showing personalized pricing capturing the full height of each bar in crimson."
                viewBox="0 0 800 188"
                className="w-full"
                fill="none"
              >
                <title>
                  Left panel showing willingness-to-pay bars with shaded
                  consumer surplus above a single price line; right panel
                  showing personalized pricing capturing the full height of each
                  bar in crimson.
                </title>
                {[16, 424].map((x0) => {
                  const personalized = x0 > 100;
                  return (
                    <g key={x0}>
                      {[116, 104, 92, 80, 68, 56, 44, 32].map((h, i) => {
                        const x = x0 + 8 + i * 44;
                        const top = 152 - h;
                        const above = Math.max(0, 88 - top);
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
                                fillOpacity="0.25"
                              />
                            )}
                            {personalized && (
                              <path
                                d={`M${x} ${top}H${x + 34}`}
                                stroke="var(--crimson)"
                                strokeWidth="3"
                              />
                            )}
                          </g>
                        );
                      })}
                      <path
                        d={`M${x0} 152H${x0 + 360}`}
                        stroke="var(--charcoal)"
                        strokeOpacity="0.35"
                      />
                    </g>
                  );
                })}
                <path
                  d="M16 88H376"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.75"
                  strokeWidth="1.75"
                  strokeDasharray="6 5"
                />
                <text
                  {...SVG_LABEL}
                  x="24"
                  y="22"
                  fill="var(--charcoal)"
                  fillOpacity="0.7"
                >
                  CONSUMER SURPLUS
                </text>
                <text
                  {...SVG_LABEL}
                  x="432"
                  y="22"
                  fill="var(--crimson)"
                >
                  CAPTURING CONSUMER SURPLUS
                </text>
                <text
                  {...SVG_LABEL}
                  x="24"
                  y="174"
                  fill="var(--charcoal)"
                  fillOpacity="0.65"
                >
                  WILLINGNESS TO PAY
                </text>
                <text {...SVG_LABEL} x="432" y="174" fill="var(--crimson)">
                  PERSONALIZED PRICING
                </text>
              </svg>
            </figure>
          </div>
        </div>

        <div className="w-full">
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
        </div>
      </Slide>

      {/* ==================================================================
          14. METRICS FOR AI STRATEGY: the same rise drawn twice, financial
          metrics lagging the leading indicators. The three new KPIs. Project
          arrows, some reaching the objectives and some drifting off.
      ================================================================== */}
      <Slide id="metrics" border align="left">
        <Head1>Metrics for AI Strategy</Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Traditional financial metrics lag behind the leading indicators of
            AI success.
          </p>
          <figure className="mt-7 w-full max-w-5xl">
            <svg
              role="img"
              aria-label="Two S-curves over time where the crimson curve for leading indicators rises first and the charcoal curve for traditional financial metrics rises later after a lag."
              viewBox="0 0 800 132"
              className="w-full"
              fill="none"
            >
              <title>
                Two S-curves over time where the crimson curve for leading
                indicators rises first and the charcoal curve for traditional
                financial metrics rises later after a lag.
              </title>
              <path
                d="M16 120H784"
                stroke="var(--charcoal)"
                strokeOpacity="0.22"
              />
              {[
                { c: 300, stroke: "var(--crimson)", opacity: 1 },
                { c: 500, stroke: "var(--charcoal)", opacity: 0.6 },
              ].map((s) => (
                <path
                  key={s.c}
                  d={Array.from({ length: 77 })
                    .map((_, i) => {
                      const x = 16 + i * 10;
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
          </figure>
        </div>

        <div className="w-full">
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
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <p className={`${DISPLAY} max-w-4xl`}>
              Measuring the strategic alignment of AI projects with core
              business objectives.
            </p>
            <svg
              role="img"
              aria-label="Five AI project trajectories launched from the left, with three crimson aligned projects hitting the core business objectives target on the right and two unaligned dashed trajectories drifting wide."
              viewBox="0 0 800 144"
              className="mt-6 w-full"
              fill="none"
            >
              <title>
                Five AI project trajectories launched from the left, with three
                crimson aligned projects hitting the core business objectives
                target on the right and two unaligned dashed trajectories
                drifting wide.
              </title>
              <text
                {...SVG_LABEL}
                x="16"
                y="72"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                AI PROJECTS
              </text>
              {[36, 22, 8].map((r, i) => (
                <circle
                  key={r}
                  cx="680"
                  cy="68"
                  r={r}
                  stroke="var(--crimson)"
                  strokeOpacity={0.4 + i * 0.25}
                  strokeWidth="1.5"
                  fill={i === 2 ? "var(--crimson)" : "none"}
                />
              ))}
              {[
                { y: 20, end: [540, 12], hit: false, head: "" },
                { y: 44, end: [646, 56], hit: true, head: "M638 51l8 5l-8 5" },
                { y: 68, end: [644, 68], hit: true, head: "M636 63l8 5l-8 5" },
                { y: 92, end: [646, 80], hit: true, head: "M638 75l8 5l-8 5" },
                { y: 116, end: [540, 124], hit: false, head: "" },
              ].map((p) => (
                <g key={p.y}>
                  <path
                    d={`M136 ${p.y}L${p.end[0]} ${p.end[1]}`}
                    stroke={p.hit ? "var(--crimson)" : "var(--charcoal)"}
                    strokeOpacity={p.hit ? 0.75 : 0.32}
                    strokeWidth={p.hit ? 1.75 : 1.25}
                    strokeDasharray={p.hit ? undefined : "4 4"}
                  />
                  {p.hit && (
                    <path
                      d={p.head}
                      stroke="var(--crimson)"
                      strokeWidth="1.5"
                    />
                  )}
                  <circle
                    cx="132"
                    cy={p.y}
                    r="4"
                    fill="var(--surface)"
                    stroke={p.hit ? "var(--crimson)" : "var(--charcoal)"}
                    strokeOpacity={p.hit ? 0.85 : 0.55}
                    strokeWidth="1.5"
                  />
                </g>
              ))}
              <text
                {...SVG_LABEL}
                x="784"
                y="132"
                textAnchor="end"
                fill="var(--crimson)"
              >
                CORE BUSINESS OBJECTIVES
              </text>
            </svg>
          </div>
        </div>
      </Slide>

      <PartPlate1
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
          16. DATA MOAT FALLACY: a big field of grey data. The same pattern
          turning up in datasets bought and synthesized. Crimson data tethered
          to each step of a proprietary workflow.          [quiz topic]
      ================================================================== */}
      <Slide id="data-moat" border align="left">
        <Head1>
          The Data Moat Fallacy
        </Head1>

        <div className="mt-10 grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <p className={BODY}>
              Accumulating massive volumes of generic data does not guarantee a
              durable advantage.
            </p>
            <svg
              role="img"
              aria-label="An unenclosed field of uniform grey dots representing massive volumes of generic data without a protective boundary."
              viewBox="0 0 400 156"
              className="mt-6 w-full"
              fill="none"
            >
              <title>
                An unenclosed field of uniform grey dots representing massive
                volumes of generic data without a protective boundary.
              </title>
              <rect
                x="16"
                y="14"
                width="368"
                height="104"
                stroke="var(--charcoal)"
                strokeOpacity="0.22"
                strokeDasharray="3 4"
              />
              {Array.from({ length: 78 }).map((_, i) => {
                const col = i % 13;
                const row = Math.floor(i / 13);
                const cx = +(32 + col * 28 + (hash(i + 400) - 0.5) * 6).toFixed(2);
                const cy = +(28 + row * 15 + (hash(i + 900) - 0.5) * 4).toFixed(2);
                return (
                  <circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r="2.2"
                    fill="var(--charcoal)"
                    fillOpacity="0.35"
                  />
                );
              })}
              <text
                {...SVG_LABEL}
                x="16"
                y="142"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                MASSIVE VOLUMES OF GENERIC DATA
              </text>
            </svg>
          </div>

          <div>
            <p className={BODY}>
              Competitors can often purchase or synthesize similar datasets.
            </p>
            <svg
              role="img"
              aria-label="Three side-by-side dataset boxes containing the same pattern of data points: generic data, purchase, and synthesize."
              viewBox="0 0 400 156"
              className="mt-6 w-full"
              fill="none"
            >
              <title>
                Three side-by-side dataset boxes containing the same pattern of
                data points: generic data, purchase, and synthesize.
              </title>
              <text
                {...SVG_LABEL}
                x="200"
                y="20"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                SIMILAR DATASETS
              </text>
              {[
                { x0: 16, label: "GENERIC DATA", crimson: false },
                { x0: 150, label: "PURCHASE", crimson: true },
                { x0: 284, label: "SYNTHESIZE", crimson: true },
              ].map((p) => (
                <g key={p.label}>
                  <rect
                    x={p.x0}
                    y="32"
                    width="100"
                    height="86"
                    fill={p.crimson ? "var(--crimson)" : "var(--charcoal)"}
                    fillOpacity={p.crimson ? 0.04 : 0.02}
                    stroke={p.crimson ? "var(--crimson)" : "var(--charcoal)"}
                    strokeOpacity={p.crimson ? 0.55 : 0.35}
                  />
                  {[
                    [20, 20],
                    [44, 16],
                    [72, 22],
                    [84, 38],
                    [28, 42],
                    [54, 38],
                    [66, 56],
                    [18, 64],
                    [42, 68],
                    [80, 68],
                  ].map(([dx, dy], i) => (
                    <circle
                      key={i}
                      cx={p.x0 + dx}
                      cy={32 + dy}
                      r="2.4"
                      fill={p.crimson ? "var(--crimson)" : "var(--charcoal)"}
                      fillOpacity={p.crimson ? 0.65 : 0.45}
                    />
                  ))}
                  <text
                    {...SVG_LABEL}
                    x={p.x0 + 50}
                    y="142"
                    textAnchor="middle"
                    fill={p.crimson ? "var(--crimson)" : "var(--charcoal)"}
                    fillOpacity={p.crimson ? 1 : 0.65}
                  >
                    {p.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${DISPLAY} max-w-4xl`}>
              True advantage stems from exclusive, domain-specific data tied to
              proprietary workflows.
            </p>
            <svg
              role="img"
              aria-label="Four sequential proprietary workflow stages connected by arrows, each tethered directly to its own crimson capsule of exclusive, domain-specific data."
              viewBox="0 0 800 156"
              className="mt-6 w-full"
              fill="none"
            >
              <title>
                Four sequential proprietary workflow stages connected by arrows,
                each tethered directly to its own crimson capsule of exclusive,
                domain-specific data.
              </title>
              <text
                {...SVG_LABEL}
                x="16"
                y="20"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                PROPRIETARY WORKFLOWS
              </text>
              {[0, 1, 2, 3].map((i) => {
                const x = 16 + i * 204;
                return (
                  <g key={i}>
                    <rect
                      x={x}
                      y="32"
                      width="156"
                      height="32"
                      fill="var(--charcoal)"
                      fillOpacity="0.03"
                      stroke="var(--charcoal)"
                      strokeOpacity="0.6"
                      strokeWidth="1.5"
                    />
                    <text
                      {...SVG_LABEL}
                      x={x + 14}
                      y="52"
                      fill="var(--charcoal)"
                      fillOpacity="0.55"
                    >
                      {pad(i + 1)}
                    </text>
                    {i < 3 && (
                      <>
                        <path
                          d={`M${x + 156} 48H${x + 204}`}
                          stroke="var(--charcoal)"
                          strokeOpacity="0.45"
                          strokeWidth="1.5"
                        />
                        <path
                          d={`M${x + 196} 43l8 5l-8 5`}
                          stroke="var(--charcoal)"
                          strokeOpacity="0.6"
                          strokeWidth="1.5"
                        />
                      </>
                    )}
                    <path
                      d={`M${x + 78} 64V88`}
                      stroke="var(--crimson)"
                      strokeOpacity="0.7"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                    />
                    <rect
                      x={x + 30}
                      y="88"
                      width="96"
                      height="26"
                      rx="4"
                      fill="var(--crimson)"
                      fillOpacity="0.08"
                      stroke="var(--crimson)"
                      strokeWidth="1.5"
                    />
                    {[-22, 0, 22].map((dx) => (
                      <circle
                        key={dx}
                        cx={x + 78 + dx}
                        cy="101"
                        r="3"
                        fill="var(--crimson)"
                      />
                    ))}
                  </g>
                );
              })}
              <text {...SVG_LABEL} x="16" y="142" fill="var(--crimson)">
                EXCLUSIVE, DOMAIN-SPECIFIC DATA
              </text>
            </svg>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          17. ALGORITHMIC NETWORK EFFECTS: the three-step cycle drawn as a
          loop with the refining step in crimson. A challenger stopped at the
          edge of an established loop.                    [quiz: data-moat]
      ================================================================== */}
      <Slide
        id="network-effects"
        border
        align="left"
        quizData={quiz["network-effects"]}
      >
        <Head1>Algorithmic Network Effects</Head1>

        <div className="mt-10 grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <p className={BODY}>
              The cycle where better algorithms attract more users, generating
              better data.
            </p>
          </div>
          <div>
            <p className={BODY}>
              This improved data further refines the algorithms, creating a
              virtuous cycle.
            </p>
          </div>
        </div>

        <div className="w-full">
          <svg
            role="img"
            aria-label="A three-node virtuous cycle where better algorithms attract more users, generating better data, which in crimson refines the algorithms."
            viewBox="0 0 800 284"
            className="mt-8 w-full max-w-5xl"
            fill="none"
          >
            <title>
              A three-node virtuous cycle where better algorithms attract more
              users, generating better data, which in crimson refines the
              algorithms.
            </title>
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
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${DISPLAY} max-w-4xl`}>
              Breaking into markets dominated by established algorithmic network
              effects is exceptionally difficult.
            </p>
            <svg
              role="img"
              aria-label="A crimson challenger attempting to break into a market, stopped by a vertical barrier outside an established algorithmic network effects loop."
              viewBox="0 0 800 132"
              className="mt-6 w-full"
              fill="none"
            >
              <title>
                A crimson challenger attempting to break into a market, stopped
                by a vertical barrier outside an established algorithmic network
                effects loop.
              </title>
              <circle cx="180" cy="54" r="7" fill="var(--crimson)" />
              <path
                d="M187 54H488"
                stroke="var(--crimson)"
                strokeOpacity="0.65"
                strokeWidth="1.75"
                strokeDasharray="5 4"
              />
              <path
                d="M480 49l8 5l-8 5"
                stroke="var(--crimson)"
                strokeOpacity="0.8"
                strokeWidth="1.5"
              />
              <path
                d="M488 32V76"
                stroke="var(--charcoal)"
                strokeOpacity="0.75"
                strokeWidth="2.5"
              />
              <circle
                cx="580"
                cy="54"
                r="38"
                stroke="var(--charcoal)"
                strokeOpacity="0.18"
                strokeWidth="10"
              />
              <path
                d="M618 54A38 38 0 1 1 580 16"
                stroke="var(--charcoal)"
                strokeOpacity="0.6"
                strokeWidth="1.75"
              />
              <path
                d="M573 11l8 5l-8 5"
                stroke="var(--charcoal)"
                strokeOpacity="0.7"
                strokeWidth="1.5"
              />
              <text
                {...SVG_LABEL}
                x="173"
                y="32"
                fill="var(--crimson)"
              >
                BREAKING INTO MARKETS
              </text>
              <text
                {...SVG_LABEL}
                x="580"
                y="118"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                ESTABLISHED ALGORITHMIC NETWORK EFFECTS
              </text>
            </svg>
          </div>
        </div>

        <Discussion1>
          If a competitor has a five-year head start on algorithmic network
          effects, what asymmetric strategies can a challenger employ?
        </Discussion1>
      </Slide>

      {/* ==================================================================
          18. STRATEGIC POSITIONING: cost leadership and differentiation as
          axes, the traditional trade-off curve between them, and the crimson
          point beyond it that has both. One narrow crimson segment in a row.
      ================================================================== */}
      <Slide id="positioning" border align="left">
        <Head1>Strategic Positioning</Head1>

        <div className="mt-10 grid w-full max-w-5xl items-center gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <div>
              <p className={BODY}>
                Choosing between competing on cost leadership or
                differentiation using AI.
              </p>
            </div>
            <div>
              <p className={`${LEAD} mt-8`}>
                AI can uniquely enable firms to pursue both simultaneously,
                breaking traditional strategic trade-offs.
              </p>
            </div>
          </div>

          <div>
            <figure className="w-full">
              <svg
                role="img"
                aria-label="A strategic frontier curve between differentiation and cost leadership, with a crimson point breaking outward beyond the curve to achieve both simultaneously."
                viewBox="0 0 400 320"
                className="w-full"
                fill="none"
              >
                <title>
                  A strategic frontier curve between differentiation and cost
                  leadership, with a crimson point breaking outward beyond the
                  curve to achieve both simultaneously.
                </title>
                <path
                  d="M36 16V282H384"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.4"
                />
                <path
                  d="M31 23l5 -7l5 7M377 277l7 5l-7 5"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.5"
                />
                <path
                  d="M54 80C216 90 324 164 358 268"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.6"
                  strokeWidth="2"
                />
                {[
                  [54, 80],
                  [358, 268],
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
                  d="M258 138L339 74"
                  stroke="var(--crimson)"
                  strokeOpacity="0.65"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <circle cx="348" cy="68" r="9" fill="var(--crimson)" />
                <text
                  {...SVG_LABEL}
                  x="384"
                  y="42"
                  textAnchor="end"
                  fill="var(--crimson)"
                >
                  BOTH SIMULTANEOUSLY
                </text>
                <text
                  {...SVG_LABEL}
                  x="236"
                  y="162"
                  textAnchor="end"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  TRADITIONAL
                </text>
                <text
                  {...SVG_LABEL}
                  x="236"
                  y="180"
                  textAnchor="end"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  STRATEGIC TRADE-OFFS
                </text>
                <text
                  {...SVG_LABEL}
                  x="48"
                  y="24"
                  fill="var(--charcoal)"
                  fillOpacity="0.65"
                >
                  DIFFERENTIATION
                </text>
                <text
                  {...SVG_LABEL}
                  x="384"
                  y="306"
                  textAnchor="end"
                  fill="var(--charcoal)"
                  fillOpacity="0.65"
                >
                  COST LEADERSHIP
                </text>
              </svg>
            </figure>
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              The emergence of the &quot;smart niche&quot; strategy tailored to
              highly specific customer segments.
            </p>
            <svg
              role="img"
              aria-label="Thirty-eight narrow customer segment bars in a row, with one specific segment highlighted in solid crimson as a smart niche."
              viewBox="0 0 800 108"
              className="mt-6 w-full max-w-5xl"
              fill="none"
            >
              <title>
                Thirty-eight narrow customer segment bars in a row, with one
                specific segment highlighted in solid crimson as a smart niche.
              </title>
              {Array.from({ length: 38 }).map((_, i) => (
                <rect
                  key={i}
                  x={16 + i * 20.2}
                  y="40"
                  width="15.5"
                  height="32"
                  fill={i === 26 ? "var(--crimson)" : "none"}
                  stroke={i === 26 ? "var(--crimson)" : "var(--charcoal)"}
                  strokeOpacity={i === 26 ? 1 : 0.32}
                />
              ))}
              <path
                d="M535 32V26H563V32"
                stroke="var(--crimson)"
                strokeOpacity="0.8"
                strokeWidth="1.5"
              />
              <text
                {...SVG_LABEL}
                x="549"
                y="18"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                SMART NICHE
              </text>
              <text
                {...SVG_LABEL}
                x="16"
                y="96"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                HIGHLY SPECIFIC CUSTOMER SEGMENTS
              </text>
            </svg>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          19. BUILD VERSUS BUY: a plus-and-minus ledger for each side. A map
          of competencies with the core ones marked crimson and built, the
          rest bought.                                     [quiz topic]
      ================================================================== */}
      <Slide id="build-buy" border align="left">
        <Head1>The Build versus Buy Dilemma</Head1>

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
          ].map((side) => (
            <div key={side.label}>              <p className={`${BODY} mt-4`}>{side.sentence}</p>
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
            </div>
          ))}
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${LEAD} max-w-4xl`}>
              Organizations must map their core competencies to determine where
              to build and where to buy.
            </p>
            <svg
              role="img"
              aria-label="A grid of twelve organizational competencies where the four core competencies on the left are marked in crimson under Build, and the remaining eight competencies on the right are marked in charcoal under Buy."
              viewBox="0 0 800 156"
              className="mt-7 w-full max-w-5xl"
              fill="none"
            >
              <title>
                A grid of twelve organizational competencies where the four core
                competencies on the left are marked in crimson under Build, and
                the remaining eight competencies on the right are marked in
                charcoal under Buy.
              </title>
              <text {...SVG_LABEL} x="16" y="20" fill="var(--crimson)">
                BUILD
              </text>
              <path
                d="M16 34V28H254V34"
                stroke="var(--crimson)"
                strokeOpacity="0.75"
                strokeWidth="1.5"
              />
              <text
                {...SVG_LABEL}
                x="276"
                y="20"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                BUY
              </text>
              <path
                d="M276 34V28H774V34"
                stroke="var(--charcoal)"
                strokeOpacity="0.4"
                strokeWidth="1.5"
              />
              {[0, 1].map((row) =>
                [0, 1, 2, 3, 4, 5].map((col) => {
                  const core = col < 2;
                  return (
                    <rect
                      key={`${row}-${col}`}
                      x={16 + col * 130}
                      y={42 + row * 44}
                      width="108"
                      height="34"
                      fill={core ? "var(--crimson)" : "var(--charcoal)"}
                      fillOpacity={core ? 0.12 : 0.02}
                      stroke={core ? "var(--crimson)" : "var(--charcoal)"}
                      strokeOpacity={core ? 1 : 0.35}
                      strokeWidth={core ? 1.5 : 1}
                    />
                  );
                }),
              )}
              <text {...SVG_LABEL} x="16" y="142" fill="var(--crimson)">
                CORE COMPETENCIES
              </text>
            </svg>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          20. OPEN SOURCE STRATEGY: a firm taking from and giving back to
          the open source commons, one column for each direction. The firm
          resting on an ecosystem it does not control.      [quiz: build-buy]
      ================================================================== */}
      <Slide
        id="open-source"
        border
        align="left"
        quizData={quiz["open-source"]}
      >
        <Head1>Open Source Strategy</Head1>

        <div className="mt-10 grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-14">
          <div>            <p className={`${BODY} mt-4`}>
              Leveraging open source models accelerates development and reduces
              fixed costs.
            </p>
            <Terms items={["accelerates development", "reduces fixed costs"]} />
          </div>
          <div>            <p className={`${BODY} mt-4`}>
              Contributing to open source can attract top talent and establish
              industry standards.
            </p>
            <Terms
              items={["attract top talent", "establish industry standards"]}
            />
          </div>
        </div>

        <div className="w-full">
          <svg
            role="img"
            aria-label="An open source community network on the left and a crimson firm square on the right connected by a top arc for leveraging and a bottom arc for contributing."
            viewBox="0 0 800 144"
            className="mt-8 w-full max-w-5xl"
            fill="none"
          >
            <title>
              An open source community network on the left and a crimson firm
              square on the right connected by a top arc for leveraging and a
              bottom arc for contributing.
            </title>
            <circle
              cx="190"
              cy="72"
              r="38"
              stroke="var(--charcoal)"
              strokeOpacity="0.45"
              strokeDasharray="3 4"
            />
            {Array.from({ length: 6 }).map((_, i) => {
              const a = (i / 6) * Math.PI * 2;
              const x = +(190 + Math.cos(a) * 22).toFixed(2);
              const y = +(72 + Math.sin(a) * 22).toFixed(2);
              return (
                <g key={i}>
                  <path
                    d={`M190 72L${x} ${y}`}
                    stroke="var(--charcoal)"
                    strokeOpacity="0.28"
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r="2.8"
                    fill="var(--charcoal)"
                    fillOpacity="0.55"
                  />
                </g>
              );
            })}
            <circle
              cx="190"
              cy="72"
              r="3.2"
              fill="var(--charcoal)"
              fillOpacity="0.65"
            />
            <rect x="590" y="54" width="36" height="36" fill="var(--crimson)" />
            <path
              d="M225 56C325 22 490 22 590 56"
              stroke="var(--crimson)"
              strokeOpacity="0.7"
              strokeWidth="1.5"
            />
            <path
              d="M580 48l10 8l-12 2"
              stroke="var(--crimson)"
              strokeOpacity="0.8"
              strokeWidth="1.5"
            />
            <path
              d="M590 88C490 122 325 122 225 88"
              stroke="var(--charcoal)"
              strokeOpacity="0.55"
              strokeWidth="1.5"
            />
            <path
              d="M235 96l-10 -8l12 -2"
              stroke="var(--charcoal)"
              strokeOpacity="0.65"
              strokeWidth="1.5"
            />
            <text
              {...SVG_LABEL}
              x="408"
              y="22"
              textAnchor="middle"
              fill="var(--crimson)"
            >
              LEVERAGING
            </text>
            <text
              {...SVG_LABEL}
              x="408"
              y="132"
              textAnchor="middle"
              fill="var(--charcoal)"
              fillOpacity="0.65"
            >
              CONTRIBUTING
            </text>
            <text
              {...SVG_LABEL}
              x="136"
              y="76"
              textAnchor="end"
              fill="var(--charcoal)"
              fillOpacity="0.7"
            >
              OPEN SOURCE
            </text>
            <text {...SVG_LABEL} x="642" y="76" fill="var(--crimson)">
              THE FIRM
            </text>
          </svg>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${DISPLAY} max-w-4xl`}>
              The strategic risk involves reliance on external ecosystems that
              the firm does not control.
            </p>
            <svg
              role="img"
              aria-label="A crimson firm block supported by a single vertical stem resting on a dashed box labeled external ecosystems that the firm does not control."
              viewBox="0 0 800 132"
              className="mt-6 w-full"
              fill="none"
            >
              <title>
                A crimson firm block supported by a single vertical stem resting
                on a dashed box labeled external ecosystems that the firm does
                not control.
              </title>
              <rect x="382" y="14" width="36" height="36" fill="var(--crimson)" />
              <text {...SVG_LABEL} x="432" y="36" fill="var(--crimson)">
                THE FIRM
              </text>
              <path d="M400 50V78" stroke="var(--crimson)" strokeWidth="2" />
              <text
                {...SVG_LABEL}
                x="412"
                y="68"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                RELIANCE
              </text>
              <rect
                x="160"
                y="78"
                width="480"
                height="40"
                fill="var(--charcoal)"
                fillOpacity="0.03"
                stroke="var(--charcoal)"
                strokeOpacity="0.5"
                strokeDasharray="5 5"
              />
              <text
                {...SVG_LABEL}
                x="400"
                y="102"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.7"
              >
                EXTERNAL ECOSYSTEMS
              </text>
              <text
                {...SVG_LABEL}
                x="656"
                y="102"
                fill="var(--charcoal)"
                fillOpacity="0.55"
              >
                DOES NOT CONTROL
              </text>
            </svg>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          21. DISRUPTIVE AI INNOVATION: a tall wall of scale drawn as a
          ghost, a low crimson wall in its place, and new competitors hopping
          over into the market. What incumbents hold in defence.
      ================================================================== */}
      <Slide id="disruption" border align="left">
        <Head1>Disruptive AI Innovation</Head1>

        <div className="mt-10 grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <p className={BODY}>
              Anticipating how AI enables non-traditional competitors to enter
              the market.
            </p>
            <svg
              role="img"
              aria-label="Non-traditional competitors represented as crimson circles on the left entering a market boundary populated by incumbent squares on the right."
              viewBox="0 0 400 156"
              className="mt-6 w-full"
              fill="none"
            >
              <title>
                Non-traditional competitors represented as crimson circles on
                the left entering a market boundary populated by incumbent
                squares on the right.
              </title>
              <text
                {...SVG_LABEL}
                x="16"
                y="22"
                fill="var(--crimson)"
              >
                NON-TRADITIONAL COMPETITORS
              </text>
              {[36, 84].map((x) => (
                <circle
                  key={x}
                  cx={x}
                  cy="78"
                  r="7"
                  fill="var(--crimson)"
                  fillOpacity="0.12"
                  stroke="var(--crimson)"
                  strokeWidth="2"
                />
              ))}
              <path
                d="M91 78H236"
                stroke="var(--crimson)"
                strokeWidth="2"
                strokeDasharray="5 4"
              />
              <path
                d="M228 72l8 6l-8 6"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <rect
                x="196"
                y="34"
                width="188"
                height="88"
                fill="var(--charcoal)"
                fillOpacity="0.03"
              />
              <path
                d="M196 60V34H384V122H196V96"
                stroke="var(--charcoal)"
                strokeOpacity="0.45"
                strokeWidth="1.5"
              />
              <circle
                cx="248"
                cy="78"
                r="7"
                fill="var(--crimson)"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              {[
                [292, 50],
                [332, 50],
                [360, 68],
                [292, 92],
                [340, 96],
              ].map(([x, y]) => (
                <rect
                  key={`${x}-${y}`}
                  x={x}
                  y={y}
                  width="12"
                  height="12"
                  fill="var(--charcoal)"
                  fillOpacity="0.35"
                />
              ))}
              <text
                {...SVG_LABEL}
                x="384"
                y="142"
                textAnchor="end"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                ENTER THE MARKET
              </text>
            </svg>
          </div>
          <div>
            <p className={BODY}>
              AI lowers the barriers to entry in industries traditionally
              protected by scale.
            </p>
            <svg
              role="img"
              aria-label="A tall barrier labeled protected by scale on the left stepping down via an arrow to a low crimson barrier labeled barriers to entry on the right."
              viewBox="0 0 400 156"
              className="mt-6 w-full"
              fill="none"
            >
              <title>
                A tall barrier labeled protected by scale on the left stepping
                down via an arrow to a low crimson barrier labeled barriers to
                entry on the right.
              </title>
              <path
                d="M16 122H384"
                stroke="var(--charcoal)"
                strokeOpacity="0.3"
              />
              <rect
                x="76"
                y="24"
                width="44"
                height="98"
                fill="var(--charcoal)"
                fillOpacity="0.06"
                stroke="var(--charcoal)"
                strokeOpacity="0.55"
                strokeWidth="1.5"
              />
              <path
                d="M148 56H236"
                stroke="var(--crimson)"
                strokeOpacity="0.7"
                strokeWidth="1.75"
              />
              <path
                d="M228 50l8 6l-8 6"
                stroke="var(--crimson)"
                strokeWidth="1.75"
              />
              <rect
                x="268"
                y="24"
                width="44"
                height="98"
                stroke="var(--charcoal)"
                strokeOpacity="0.25"
                strokeDasharray="3 4"
              />
              <rect
                x="268"
                y="92"
                width="44"
                height="30"
                fill="var(--crimson)"
                fillOpacity="0.16"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <text
                {...SVG_LABEL}
                x="98"
                y="142"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                PROTECTED BY SCALE
              </text>
              <text
                {...SVG_LABEL}
                x="290"
                y="142"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                BARRIERS TO ENTRY
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>            <p className={`${DISPLAY} mt-4 max-w-4xl`}>
              Incumbents must leverage their existing customer base and domain
              expertise defensively.
            </p>
            <Terms
              items={["existing customer base", "domain expertise"]}
              className="mt-6"
            />
          </div>
        </div>
      </Slide>

      <PartPlate1
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
          23. AI OPERATING MODEL: the same people sorted into three silos,
          then regrouped into mixed crimson squads. The three roles named. A
          coil that loops quickly while climbing.            [quiz topic]
      ================================================================== */}
      <Slide id="operating-model" border align="left">
        <Head1>The AI Operating Model</Head1>

        {(() => {
          const glyph = (kind: number, x: number, y: number, stroke: string) => {
            if (kind === 0)
              return (
                <circle
                  cx={x}
                  cy={y}
                  r="7"
                  fill="var(--surface)"
                  stroke={stroke}
                  strokeWidth="1.5"
                />
              );
            if (kind === 1)
              return (
                <rect
                  x={x - 6.5}
                  y={y - 6.5}
                  width="13"
                  height="13"
                  fill="var(--surface)"
                  stroke={stroke}
                  strokeWidth="1.5"
                />
              );
            return (
              <path
                d={`M${x} ${y - 8}L${x + 8} ${y}L${x} ${y + 8}L${x - 8} ${y}Z`}
                fill="var(--surface)"
                stroke={stroke}
                strokeWidth="1.5"
              />
            );
          };

          return (
            <div className="w-full">
              <p className={`${BODY} mt-7 max-w-4xl`}>
                Shifting from siloed departments to cross-functional,
                product-oriented squads.
              </p>
              <svg
                role="img"
                aria-label="Three vertical siloed departments on the left reorganizing into three crimson cross-functional, product-oriented squads on the right, each integrating all three role types."
                viewBox="0 0 800 160"
                className="mt-5 w-full max-w-5xl"
                fill="none"
              >
                <title>
                  Three vertical siloed departments on the left reorganizing
                  into three crimson cross-functional, product-oriented squads
                  on the right, each integrating all three role types.
                </title>
                {[0, 1, 2].map((kind) => {
                  const x0 = 16 + kind * 112;
                  return (
                    <g key={kind}>
                      <rect
                        x={x0}
                        y="12"
                        width="96"
                        height="116"
                        fill="var(--charcoal)"
                        fillOpacity="0.04"
                        stroke="var(--charcoal)"
                        strokeOpacity="0.45"
                      />
                      {[0, 1, 2, 3, 4, 5].map((k) => (
                        <g key={k}>
                          {glyph(
                            kind,
                            x0 + 28 + (k % 2) * 40,
                            32 + Math.floor(k / 2) * 38,
                            "var(--charcoal)",
                          )}
                        </g>
                      ))}
                    </g>
                  );
                })}
                <text
                  {...SVG_LABEL}
                  x="16"
                  y="148"
                  fill="var(--charcoal)"
                  fillOpacity="0.65"
                >
                  SILOED DEPARTMENTS
                </text>

                <path
                  d="M366 70H418"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.45"
                  strokeWidth="1.5"
                />
                <path
                  d="M410 64l8 6l-8 6"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.6"
                  strokeWidth="1.5"
                />

                {[0, 1, 2].map((s) => {
                  const x0 = 444 + s * 118;
                  return (
                    <g key={s}>
                      <rect
                        x={x0}
                        y="28"
                        width="104"
                        height="84"
                        rx="6"
                        fill="var(--crimson)"
                        fillOpacity="0.05"
                        stroke="var(--crimson)"
                        strokeWidth="1.5"
                      />
                      <path
                        d={`M${x0 + 30} 52H${x0 + 74}L${x0 + 52} 88Z`}
                        stroke="var(--crimson)"
                        strokeOpacity="0.3"
                      />
                      {glyph(0, x0 + 30, 52, "var(--charcoal)")}
                      {glyph(1, x0 + 74, 52, "var(--charcoal)")}
                      {glyph(2, x0 + 52, 88, "var(--crimson)")}
                    </g>
                  );
                })}
                <text
                  {...SVG_LABEL}
                  x="784"
                  y="148"
                  textAnchor="end"
                  fill="var(--crimson)"
                >
                  CROSS-FUNCTIONAL, PRODUCT-ORIENTED SQUADS
                </text>
              </svg>
            </div>
          );
        })()}

        <div className="w-full">
          <div className="mt-8 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-6">
            <p className={`${BODY} max-w-4xl`}>
              Integrating data engineering, data science, and business strategy
              roles.
            </p>
            <Steps
              items={["data engineering", "data science", "business strategy"]}
              cols="md:grid-cols-3"
              mark={2}
              className="mt-4 max-w-4xl"
            />
          </div>
        </div>

        <div className="w-full">
          <div className="mt-8 w-full max-w-5xl">
            <p className={`${DISPLAY} max-w-4xl`}>
              The operating model must optimize for rapid iteration and
              continuous learning.
            </p>
            <figure className="mt-5 w-full">
              <svg
                role="img"
                aria-label="Five rapid iteration cycles arranged along an ascending staircase of continuous learning."
                viewBox="0 0 800 124"
                className="w-full"
                fill="none"
              >
                <title>
                  Five rapid iteration cycles arranged along an ascending
                  staircase of continuous learning.
                </title>
                <path
                  d="M24 102H152V86H288V70H424V54H560V38H776"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.32"
                  strokeWidth="1.5"
                />
                <path
                  d="M768 33l8 5l-8 5"
                  stroke="var(--crimson)"
                  strokeWidth="1.75"
                />
                {[0, 1, 2, 3, 4].map((i) => {
                  const cx = 88 + i * 136;
                  const cy = 82 - i * 16;
                  const r = 12;
                  const active = i >= 3;
                  return (
                    <g key={i}>
                      <path
                        d={`M${cx + r} ${cy}A${r} ${r} 0 1 1 ${cx} ${cy - r}`}
                        stroke={active ? "var(--crimson)" : "var(--charcoal)"}
                        strokeOpacity={active ? 0.95 : 0.55}
                        strokeWidth={active ? 2 : 1.5}
                      />
                      <path
                        d={`M${cx - 4} ${cy - r - 4}l5 4l-5 4`}
                        stroke={active ? "var(--crimson)" : "var(--charcoal)"}
                        strokeOpacity={active ? 0.95 : 0.65}
                        strokeWidth="1.5"
                      />
                    </g>
                  );
                })}
                <text
                  {...SVG_LABEL}
                  x="24"
                  y="118"
                  fill="var(--charcoal)"
                  fillOpacity="0.65"
                >
                  RAPID ITERATION
                </text>
                <text
                  {...SVG_LABEL}
                  x="776"
                  y="62"
                  textAnchor="end"
                  fill="var(--crimson)"
                >
                  CONTINUOUS LEARNING
                </text>
              </svg>
            </figure>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          24. CENTRALIZED VERSUS DECENTRALIZED: one crimson hub wired to
          every unit, against units that each hold their own crimson
          capability. A level balance resting on the hybrid.
                                              [quiz: operating-model]
      ================================================================== */}
      <Slide
        id="centralized"
        border
        align="left"
        quizData={quiz["centralized"]}
      >
        <Head1>Centralized versus Decentralized AI</Head1>

        <div className="mt-10 grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-14">
          <div>            <p className={`${BODY} mt-4`}>
              Centralized centers of excellence ensure standard practices and
              resource efficiency.
            </p>
            <svg
              role="img"
              aria-label="A central crimson center of excellence square wired symmetrically to six surrounding business unit squares."
              viewBox="0 0 400 176"
              className="mt-6 w-full"
              fill="none"
            >
              <title>
                A central crimson center of excellence square wired
                symmetrically to six surrounding business unit squares.
              </title>
              {Array.from({ length: 6 }).map((_, k) => {
                const a = (k / 6) * Math.PI * 2 - Math.PI / 2;
                const x = +(200 + Math.cos(a) * 66).toFixed(2);
                const y = +(76 + Math.sin(a) * 58).toFixed(2);
                return (
                  <g key={k}>
                    <path
                      d={`M200 76L${x} ${y}`}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.35"
                    />
                    <rect
                      x={+(x - 9).toFixed(2)}
                      y={+(y - 9).toFixed(2)}
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
                y="162"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                CENTERS OF EXCELLENCE
              </text>
            </svg>
            <Terms items={["standard practices", "resource efficiency"]} />
          </div>

          <div>            <p className={`${BODY} mt-4`}>
              Decentralized teams embed AI capabilities directly into business
              units for faster execution.
            </p>
            <svg
              role="img"
              aria-label="Six business unit squares arranged in a grid, each containing its own embedded crimson AI capability node."
              viewBox="0 0 400 176"
              className="mt-6 w-full"
              fill="none"
            >
              <title>
                Six business unit squares arranged in a grid, each containing
                its own embedded crimson AI capability node.
              </title>
              {[110, 200, 290].map((x) =>
                [46, 110].map((y) => (
                  <g key={`${x}-${y}`}>
                    <rect
                      x={x - 22}
                      y={y - 22}
                      width="44"
                      height="44"
                      fill="var(--charcoal)"
                      fillOpacity="0.03"
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
                y="162"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                BUSINESS UNITS
              </text>
            </svg>
            <Terms items={["faster execution"]} />
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${DISPLAY} max-w-4xl`}>
              A hybrid approach often balances governance with agility.
            </p>
            <svg
              role="img"
              aria-label="A level balance beam resting on a central crimson hybrid approach fulcrum, balancing governance on the left pan and agility on the right pan."
              viewBox="0 0 800 140"
              className="mt-6 w-full max-w-4xl"
              fill="none"
            >
              <title>
                A level balance beam resting on a central crimson hybrid
                approach fulcrum, balancing governance on the left pan and
                agility on the right pan.
              </title>
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
              <path d="M400 50L424 102H376Z" fill="var(--crimson)" />
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
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          25. TALENT STRATEGY: four crimson marks in a wide grey field.
          Upskilling set equal to hiring. A crimson bridge across the gap
          between technical and business teams.
      ================================================================== */}
      <Slide id="talent" border align="left">
        <Head1>Talent Strategy and Acquisition</Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            The scarcity of specialized AI talent requires innovative
            recruitment and retention strategies.
          </p>
          <svg
            role="img"
            aria-label="A wide array of talent nodes where only four rare nodes are highlighted in crimson as specialized AI talent."
            viewBox="0 0 800 108"
            className="mt-7 w-full max-w-5xl"
            fill="none"
          >
            <title>
              A wide array of talent nodes where only four rare nodes are
              highlighted in crimson as specialized AI talent.
            </title>
            {Array.from({ length: 104 }).map((_, i) => {
              const col = i % 26;
              const row = Math.floor(i / 26);
              const cx = 24 + col * 30;
              const cy = 18 + row * 16;
              const rare =
                (col === 4 && row === 1) ||
                (col === 12 && row === 2) ||
                (col === 18 && row === 0) ||
                (col === 23 && row === 2);
              return (
                <circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r={rare ? "4.8" : "2.2"}
                  fill={rare ? "var(--crimson)" : "var(--charcoal)"}
                  fillOpacity={rare ? "1" : "0.24"}
                />
              );
            })}
            <text {...SVG_LABEL} x="16" y="96" fill="var(--crimson)">
              SPECIALIZED AI TALENT
            </text>
          </svg>
          <Terms items={["recruitment", "retention"]} />
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${LEAD} max-w-4xl`}>
              Upskilling the existing workforce is as critical as hiring new
              experts.
            </p>
            <div
              aria-hidden
              className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-3"
            >
              <span className="font-sans text-[0.9375rem] tracking-normal text-[var(--crimson)]">
                upskilling the existing workforce
              </span>
              <span className="font-sans text-4xl font-light text-[var(--charcoal)]/35">
                =
              </span>
              <span className="font-sans text-[0.9375rem] tracking-normal text-[var(--charcoal-light)]/60">
                hiring new experts
              </span>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <p className={`${BODY} max-w-4xl`}>
              Building a culture that bridges the communication gap between
              technical and business teams.
            </p>
            <svg
              role="img"
              aria-label="A crimson arch bridge spanning the communication gap between technical teams on the left bank and business teams on the right bank."
              viewBox="0 0 800 128"
              className="mt-6 w-full"
              fill="none"
            >
              <title>
                A crimson arch bridge spanning the communication gap between
                technical teams on the left bank and business teams on the right
                bank.
              </title>
              <path
                d="M16 70H260V116M784 70H540V116"
                stroke="var(--charcoal)"
                strokeOpacity="0.55"
                strokeWidth="1.5"
              />
              <path
                d="M16 70H260V116H16ZM540 70H784V116H540Z"
                fill="var(--charcoal)"
                fillOpacity="0.06"
              />
              <path
                d="M260 70Q400 8 540 70"
                stroke="var(--crimson)"
                strokeWidth="2.5"
              />
              <path d="M260 70H540" stroke="var(--crimson)" strokeWidth="1.5" />
              {[306, 353, 400, 447, 494].map((x) => {
                const t = (x - 260) / 280;
                const y = +(
                  (1 - t) * (1 - t) * 70 +
                  2 * (1 - t) * t * 8 +
                  t * t * 70
                ).toFixed(2);
                return (
                  <path
                    key={x}
                    d={`M${x} ${y}V70`}
                    stroke="var(--crimson)"
                    strokeOpacity="0.5"
                  />
                );
              })}
              <text
                {...SVG_LABEL}
                x="16"
                y="56"
                fill="var(--charcoal)"
                fillOpacity="0.7"
              >
                TECHNICAL TEAMS
              </text>
              <text
                {...SVG_LABEL}
                x="784"
                y="56"
                textAnchor="end"
                fill="var(--charcoal)"
                fillOpacity="0.7"
              >
                BUSINESS TEAMS
              </text>
              <text
                {...SVG_LABEL}
                x="400"
                y="104"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.55"
              >
                COMMUNICATION GAP
              </text>
            </svg>
          </div>
        </div>

        <Discussion1>
          Should business units have their own data scientists, or should they
          request resources from a central pool, and how does this impact
          strategic alignment?
        </Discussion1>
      </Slide>

      {/* ==================================================================
          26. AGILE AI DEVELOPMENT: a fixed waterfall beside a fan of
          uncertain paths. A quick run of prototypes, several struck, the
          last one crimson. A small square growing to full scale.
      ================================================================== */}
      <Slide id="agile" border align="left">
        <Head1>Agile AI Development</Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Traditional software development methodologies are insufficient for
            probabilistic AI projects.
          </p>
          <svg
            role="img"
            aria-label="A rigid four-step waterfall diagram for traditional software development methodologies on the left contrasted with a branching crimson fan of probabilistic AI projects on the right."
            viewBox="0 0 800 156"
            className="mt-7 w-full max-w-5xl"
            fill="none"
          >
            <title>
              A rigid four-step waterfall diagram for traditional software
              development methodologies on the left contrasted with a branching
              crimson fan of probabilistic AI projects on the right.
            </title>
            {[0, 1, 2, 3].map((i) => (
              <g key={i}>
                <rect
                  x={16 + i * 80}
                  y={12 + i * 24}
                  width="70"
                  height="16"
                  fill="var(--charcoal)"
                  fillOpacity="0.03"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.55"
                />
                {i < 3 && (
                  <path
                    d={`M${86 + i * 80} ${20 + i * 24}H${121 + i * 80}V${36 + i * 24}`}
                    stroke="var(--charcoal)"
                    strokeOpacity="0.45"
                  />
                )}
              </g>
            ))}
            <text
              {...SVG_LABEL}
              x="16"
              y="124"
              fill="var(--charcoal)"
              fillOpacity="0.65"
            >
              TRADITIONAL SOFTWARE
            </text>
            <text
              {...SVG_LABEL}
              x="16"
              y="142"
              fill="var(--charcoal)"
              fillOpacity="0.65"
            >
              DEVELOPMENT METHODOLOGIES
            </text>

            <path
              d="M400 12V116"
              stroke="var(--charcoal)"
              strokeOpacity="0.18"
              strokeDasharray="3 5"
            />

            <circle cx="452" cy="60" r="5" fill="var(--crimson)" />
            {[16, 32, 46, 60, 74, 88, 104].map((y, k) => (
              <path
                key={y}
                d={`M457 60C560 60 640 ${(60 + (y - 60) * 0.4).toFixed(1)} 784 ${y}`}
                stroke="var(--crimson)"
                strokeOpacity={(0.32 + hash(k + 500) * 0.58).toFixed(2)}
                strokeWidth="1.5"
              />
            ))}
            <text
              {...SVG_LABEL}
              x="784"
              y="142"
              textAnchor="end"
              fill="var(--crimson)"
            >
              PROBABILISTIC AI PROJECTS
            </text>
          </svg>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Embracing experimentation, failure, and rapid prototyping.
            </p>
            <svg
              role="img"
              aria-label="Seven sequential prototype squares connected by arrows, with three crossed out as failures and the final square in solid crimson representing rapid prototyping."
              viewBox="0 0 800 100"
              className="mt-6 w-full max-w-5xl"
              fill="none"
            >
              <title>
                Seven sequential prototype squares connected by arrows, with
                three crossed out as failures and the final square in solid
                crimson representing rapid prototyping.
              </title>
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
                      fill={last ? "var(--crimson)" : "var(--charcoal)"}
                      fillOpacity={last ? 1 : 0.03}
                      stroke={last ? "var(--crimson)" : "var(--charcoal)"}
                      strokeOpacity={last ? 1 : failed ? 0.35 : 0.6}
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
                          d={`M${x + 30} 39H${x + 120}`}
                          stroke="var(--charcoal)"
                          strokeOpacity="0.35"
                        />
                        <path
                          d={`M${x + 113} 35l7 4l-7 4`}
                          stroke="var(--charcoal)"
                          strokeOpacity="0.5"
                        />
                      </>
                    )}
                  </g>
                );
              })}
              <text
                {...SVG_LABEL}
                x="20"
                y="86"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                EXPERIMENTATION
              </text>
              <text
                {...SVG_LABEL}
                x="395"
                y="86"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                FAILURE
              </text>
              <text
                {...SVG_LABEL}
                x="770"
                y="86"
                textAnchor="end"
                fill="var(--crimson)"
              >
                RAPID PROTOTYPING
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <p className={`${DISPLAY} max-w-4xl`}>
              Managing the lifecycle from proof of concept to enterprise scale
              deployment.
            </p>
            <figure className="mt-6 w-full">
              <svg
                role="img"
                aria-label="Five squares growing progressively larger from a small proof of concept square on the left to a large crimson enterprise scale deployment square on the right."
                viewBox="0 0 800 124"
                className="w-full"
                fill="none"
              >
                <title>
                  Five squares growing progressively larger from a small proof
                  of concept square on the left to a large crimson enterprise
                  scale deployment square on the right.
                </title>
                {[
                  { x: 20, s: 16 },
                  { x: 170, s: 26 },
                  { x: 330, s: 40 },
                  { x: 500, s: 58 },
                  { x: 690, s: 78 },
                ].map((b, i, all) => (
                  <g key={b.x}>
                    <rect
                      x={b.x}
                      y={112 - b.s}
                      width={b.s}
                      height={b.s}
                      fill={i === 4 ? "var(--crimson)" : "var(--charcoal)"}
                      fillOpacity={i === 4 ? 0.14 : 0.03}
                      stroke={i === 4 ? "var(--crimson)" : "var(--charcoal)"}
                      strokeOpacity={i === 4 ? 1 : 0.4 + i * 0.1}
                      strokeWidth={i === 4 ? 2 : 1.25}
                    />
                    {i < 4 && (
                      <>
                        <path
                          d={`M${b.x + b.s} 104H${all[i + 1].x}`}
                          stroke="var(--charcoal)"
                          strokeOpacity="0.35"
                        />
                        <path
                          d={`M${all[i + 1].x - 7} 100l7 4l-7 4`}
                          stroke="var(--charcoal)"
                          strokeOpacity="0.5"
                        />
                      </>
                    )}
                  </g>
                ))}
                <text
                  {...SVG_LABEL}
                  x="20"
                  y="82"
                  fill="var(--charcoal)"
                  fillOpacity="0.65"
                >
                  PROOF OF CONCEPT
                </text>
                <text
                  {...SVG_LABEL}
                  x="768"
                  y="22"
                  textAnchor="end"
                  fill="var(--crimson)"
                >
                  ENTERPRISE SCALE DEPLOYMENT
                </text>
              </svg>
            </figure>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          27. DATA GOVERNANCE AS STRATEGY: compliance set beside enabler.
          One data asset traced back to its source, checked, and opened to
          the organization. Every asset with its own crimson owner.
      ================================================================== */}
      <Slide id="governance" border align="left">
        <Head1>Data Governance as Strategy</Head1>

        <div className="w-full">
          <div className="mt-10 w-full max-w-5xl">
            <p className={`${LEAD} max-w-4xl`}>
              Data governance is no longer just a compliance function. It is a
              strategic enabler.
            </p>
            <div className="mt-6 max-w-4xl">
              <Split1
                left="Just a compliance function"
                right="Strategic enabler"
                strikeLeft
              />
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Ensuring data quality, lineage, and accessibility across the
              organization.
            </p>
            <svg
              role="img"
              aria-label="A data source cylinder on the left connected along a crimson lineage chain with three checkpoint nodes to a data quality verification box, which fans out to five accessible organizational nodes on the right."
              viewBox="0 0 800 136"
              className="mt-6 w-full max-w-5xl"
              fill="none"
            >
              <title>
                A data source cylinder on the left connected along a crimson
                lineage chain with three checkpoint nodes to a data quality
                verification box, which fans out to five accessible
                organizational nodes on the right.
              </title>
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
              <path d="M70 62H552" stroke="var(--crimson)" strokeWidth="2" />
              {[190, 310, 430].map((x) => (
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
                x="310"
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
                fill="var(--charcoal)"
                fillOpacity="0.03"
                stroke="var(--charcoal)"
                strokeOpacity="0.7"
                strokeWidth="1.5"
              />
              <path
                d="M563 62l6 6l12 -12"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <text
                {...SVG_LABEL}
                x="572"
                y="28"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.7"
              >
                DATA QUALITY
              </text>
              {[18, 40, 62, 84, 106].map((y) => (
                <g key={y}>
                  <path
                    d={`M592 62L735 ${y}`}
                    stroke="var(--charcoal)"
                    strokeOpacity="0.32"
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
                x="784"
                y="126"
                textAnchor="end"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                ACCESSIBILITY
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <p className={`${DISPLAY} max-w-4xl`}>
              Establishing clear ownership and accountability for data assets.
            </p>
            <svg
              role="img"
              aria-label="Five data asset cylinders, each tethered directly to its own dedicated crimson owner node above it."
              viewBox="0 0 800 120"
              className="mt-6 w-full"
              fill="none"
            >
              <title>
                Five data asset cylinders, each tethered directly to its own
                dedicated crimson owner node above it.
              </title>
              <text {...SVG_LABEL} x="16" y="30" fill="var(--crimson)">
                CLEAR OWNERSHIP
              </text>
              <text
                {...SVG_LABEL}
                x="16"
                y="92"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                DATA ASSETS
              </text>
              {[220, 355, 490, 625, 760].map((x) => (
                <g key={x}>
                  <circle cx={x} cy="26" r="7" fill="var(--crimson)" />
                  <path
                    d={`M${x} 33V65`}
                    stroke="var(--crimson)"
                    strokeOpacity="0.55"
                    strokeWidth="1.5"
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
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          28. CULTIVATING AN AI CULTURE: one certain spike against a crimson
          spread of outcomes. A crimson mark on every tier of the hierarchy.
          An automated decision passing through a wall of resistance.
      ================================================================== */}
      <Slide id="culture" border align="left">
        <Head1>Cultivating an AI Culture</Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Shifting the organizational mindset from deterministic rules to
            probabilistic outcomes.
          </p>
          <figure className="mt-7 w-full max-w-5xl">
            <svg
              role="img"
              aria-label="A single vertical spike for deterministic rules on the left shifting via an arrow to a smooth crimson bell curve for probabilistic outcomes on the right."
              viewBox="0 0 800 132"
              className="w-full"
              fill="none"
            >
              <title>
                A single vertical spike for deterministic rules on the left
                shifting via an arrow to a smooth crimson bell curve for
                probabilistic outcomes on the right.
              </title>
              <path
                d="M20 96H340"
                stroke="var(--charcoal)"
                strokeOpacity="0.3"
              />
              <path
                d="M180 96V18"
                stroke="var(--charcoal)"
                strokeOpacity="0.7"
                strokeWidth="2"
              />
              <circle
                cx="180"
                cy="18"
                r="5"
                fill="var(--charcoal)"
                fillOpacity="0.7"
              />
              <text
                {...SVG_LABEL}
                x="20"
                y="120"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                DETERMINISTIC RULES
              </text>

              <path
                d="M376 58H424"
                stroke="var(--charcoal)"
                strokeOpacity="0.45"
              />
              <path
                d="M416 52l8 6l-8 6"
                stroke="var(--charcoal)"
                strokeOpacity="0.6"
              />

              <path
                d="M460 96H780"
                stroke="var(--charcoal)"
                strokeOpacity="0.3"
              />
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
                y="120"
                textAnchor="end"
                fill="var(--crimson)"
              >
                PROBABILISTIC OUTCOMES
              </text>
            </svg>
          </figure>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Encouraging data-driven decision making at all levels of the
              hierarchy.
            </p>
            <svg
              role="img"
              aria-label="An organizational pyramid divided into four horizontal tiers, with a crimson data-driven decision node centered in every tier."
              viewBox="0 0 800 140"
              className="mt-6 w-full max-w-5xl"
              fill="none"
            >
              <title>
                An organizational pyramid divided into four horizontal tiers,
                with a crimson data-driven decision node centered in every tier.
              </title>
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
              {[26, 54, 83, 113].map((y) => (
                <circle key={y} cx="400" cy={y} r="5" fill="var(--crimson)" />
              ))}
              <text
                {...SVG_LABEL}
                x="16"
                y="72"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                ALL LEVELS OF THE HIERARCHY
              </text>
              <text
                {...SVG_LABEL}
                x="784"
                y="72"
                textAnchor="end"
                fill="var(--crimson)"
              >
                DATA-DRIVEN DECISION MAKING
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <p className={`${DISPLAY} max-w-4xl`}>
              Overcoming institutional resistance to automated decision
              systems.
            </p>
            <svg
              role="img"
              aria-label="A crimson automated decision systems arrow passing cleanly through a parted barrier of institutional resistance."
              viewBox="0 0 800 112"
              className="mt-6 w-full"
              fill="none"
            >
              <title>
                A crimson automated decision systems arrow passing cleanly
                through a parted barrier of institutional resistance.
              </title>
              <rect
                x="356"
                y="10"
                width="88"
                height="24"
                fill="var(--charcoal)"
                fillOpacity="0.06"
                stroke="var(--charcoal)"
                strokeOpacity="0.5"
              />
              <rect
                x="356"
                y="62"
                width="88"
                height="24"
                fill="var(--charcoal)"
                fillOpacity="0.06"
                stroke="var(--charcoal)"
                strokeOpacity="0.5"
              />
              <path
                d="M16 48H780"
                stroke="var(--crimson)"
                strokeWidth="2.5"
              />
              <path
                d="M770 41l10 7l-10 7"
                stroke="var(--crimson)"
                strokeWidth="2.5"
              />
              <text {...SVG_LABEL} x="16" y="32" fill="var(--crimson)">
                AUTOMATED DECISION SYSTEMS
              </text>
              <text
                {...SVG_LABEL}
                x="400"
                y="104"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                INSTITUTIONAL RESISTANCE
              </text>
            </svg>
          </div>
        </div>
      </Slide>

      <PartPlate1
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
          30. THE EXECUTION GAP: eight pilots, two arcing across to
          production and six dropping into the gap. A deployment whose teeth
          miss the legacy system's slots. The two things execution needs.
                                                          [quiz topic]
      ================================================================== */}
      <Slide id="execution-gap" border align="left">
        <Head1>
          The Execution Gap
        </Head1>

        <div className="w-full">
          <p className={`${LEAD} mt-9 max-w-4xl`}>
            Many AI strategies fail during the transition from pilot to
            production.
          </p>
          <figure className="mt-7 w-full max-w-5xl">
            <svg
              role="img"
              aria-label="Six pilot nodes on a left ledge where two crimson trajectories arc cleanly across the gap to the production ledge on the right, while four dashed trajectories drop into the gap and fail."
              viewBox="0 0 800 176"
              className="w-full"
              fill="none"
            >
              <title>
                Six pilot nodes on a left ledge where two crimson trajectories
                arc cleanly across the gap to the production ledge on the right,
                while four dashed trajectories drop into the gap and fail.
              </title>
              <path
                d="M16 64H296V168M784 64H504V168"
                stroke="var(--charcoal)"
                strokeOpacity="0.5"
                strokeWidth="1.5"
              />
              <path
                d="M16 64H296V168H16ZM504 64H784V168H504Z"
                fill="var(--charcoal)"
                fillOpacity="0.05"
              />
              {[
                {
                  x: 108,
                  made: true,
                  target: 684,
                  d: "M108 50C220 -2 570 -2 684 50",
                },
                {
                  x: 142,
                  made: true,
                  target: 572,
                  d: "M142 50C236 18 486 18 572 50",
                },
                {
                  x: 176,
                  made: false,
                  target: 0,
                  d: "M176 50C256 28 432 42 464 138",
                },
                {
                  x: 210,
                  made: false,
                  target: 0,
                  d: "M210 50C272 34 396 48 424 138",
                },
                {
                  x: 244,
                  made: false,
                  target: 0,
                  d: "M244 50C288 40 360 54 384 138",
                },
                {
                  x: 278,
                  made: false,
                  target: 0,
                  d: "M278 50C304 46 330 60 344 138",
                },
              ].map((p) => (
                <g key={p.x}>
                  <path
                    d={p.d}
                    stroke={p.made ? "var(--crimson)" : "var(--charcoal)"}
                    strokeOpacity={p.made ? 0.9 : 0.35}
                    strokeWidth={p.made ? 2 : 1.25}
                    strokeDasharray={p.made ? undefined : "3 4"}
                  />
                  <circle
                    cx={p.x}
                    cy="54"
                    r="4"
                    fill={p.made ? "var(--crimson)" : "var(--charcoal)"}
                    fillOpacity={p.made ? 1 : 0.55}
                  />
                  {p.made && (
                    <circle
                      cx={p.target}
                      cy="54"
                      r="5"
                      fill="var(--crimson)"
                    />
                  )}
                </g>
              ))}
              <text
                {...SVG_LABEL}
                x="28"
                y="92"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                PILOT
              </text>
              <text
                {...SVG_LABEL}
                x="772"
                y="92"
                textAnchor="end"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                PRODUCTION
              </text>
              <text
                {...SVG_LABEL}
                x="400"
                y="162"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                FAIL
              </text>
            </svg>
          </figure>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Lack of integration with legacy systems often stalls deployment.
            </p>
            <svg
              role="img"
              aria-label="A deployment connector on the left whose two prongs fail to align with the recessed slots of a legacy systems block on the right, stalling deployment."
              viewBox="0 0 800 120"
              className="mt-6 w-full max-w-5xl"
              fill="none"
            >
              <title>
                A deployment connector on the left whose two prongs fail to
                align with the recessed slots of a legacy systems block on the
                right, stalling deployment.
              </title>
              <text
                {...SVG_LABEL}
                x="60"
                y="42"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                DEPLOYMENT
              </text>
              <path
                d="M60 58H420M420 42V74M420 48H434M420 68H434"
                stroke="var(--crimson)"
                strokeOpacity="0.85"
                strokeWidth="2"
              />
              <path
                d="M444 28H644V88H444V82H456V74H444V42H456V34H444Z"
                fill="var(--charcoal)"
                fillOpacity="0.06"
                stroke="var(--charcoal)"
                strokeOpacity="0.6"
                strokeWidth="1.5"
              />
              <text
                {...SVG_LABEL}
                x="550"
                y="62"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.7"
              >
                LEGACY SYSTEMS
              </text>
              <text
                {...SVG_LABEL}
                x="438"
                y="20"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                STALLS
              </text>
              <text
                {...SVG_LABEL}
                x="438"
                y="108"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                LACK OF INTEGRATION
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
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
        </div>
      </Slide>

      {/* ==================================================================
          31. MANAGING ALGORITHMIC RISK: the environment shifts and the
          model line starts to sink. Drift caught where it crosses a
          threshold. A crimson fallback routed around a failed system.
                                                [quiz: execution-gap]
      ================================================================== */}
      <Slide
        id="algorithmic-risk"
        border
        align="left"
        quizData={quiz["algorithmic-risk"]}
      >
        <Head1>Managing Algorithmic Risk</Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            AI models can degrade over time as the external environment changes.
          </p>
          <figure className="mt-7 w-full max-w-5xl">
            <svg
              role="img"
              aria-label="An external environment line shifting at a vertical dashed boundary while the AI models line below it begins to degrade over time in crimson."
              viewBox="0 0 800 150"
              className="w-full"
              fill="none"
            >
              <title>
                An external environment line shifting at a vertical dashed
                boundary while the AI models line below it begins to degrade
                over time in crimson.
              </title>
              <path
                d={Array.from({ length: 77 })
                  .map((_, i) => {
                    const x = 16 + i * 10;
                    const y = 34 + 24 / (1 + Math.exp(-(x - 380) / 14));
                    return `${i === 0 ? "M" : "L"}${x} ${y.toFixed(1)}`;
                  })
                  .join("")}
                stroke="var(--charcoal)"
                strokeOpacity="0.6"
                strokeWidth="2"
              />
              <path
                d="M16 96H360"
                stroke="var(--charcoal)"
                strokeOpacity="0.6"
                strokeWidth="2"
              />
              <path
                d={Array.from({ length: 43 })
                  .map((_, i) => {
                    const x = 360 + i * 10;
                    const t = (x - 360) / 424;
                    const y = 96 + 40 * t * t * (3 - 2 * t);
                    return `${i === 0 ? "M" : "L"}${Math.min(x, 784)} ${y.toFixed(1)}`;
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
                x="16"
                y="22"
                fill="var(--charcoal)"
                fillOpacity="0.65"
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
                x="16"
                y="84"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                AI MODELS
              </text>
              <text {...SVG_LABEL} x="560" y="96" fill="var(--crimson)">
                DEGRADE OVER TIME
              </text>
            </svg>
          </figure>
        </div>

        <div className="mt-12 grid w-full max-w-5xl gap-10 border-t border-[var(--charcoal)]/10 pt-8 md:grid-cols-2 md:gap-14">
          <div>
            <p className={BODY}>
              Implementing robust monitoring systems to detect model drift and
              data bias.
            </p>
            <svg
              role="img"
              aria-label="A model performance line crossing a dashed monitoring threshold where a crimson circle detects the drift."
              viewBox="0 0 400 130"
              className="mt-6 w-full"
              fill="none"
            >
              <title>
                A model performance line crossing a dashed monitoring threshold
                where a crimson circle detects the drift.
              </title>
              <path
                d="M16 70H384"
                stroke="var(--charcoal)"
                strokeOpacity="0.45"
                strokeDasharray="6 5"
              />
              <path
                d="M16 40L120 42L220 52L300 76L384 98"
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
                x="16"
                y="92"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                MONITORING SYSTEMS
              </text>
            </svg>
            <Terms items={["model drift", "data bias"]} />
          </div>

          <div>
            <p className={BODY}>
              Establishing fallback mechanisms when automated systems fail.
            </p>
            <svg
              role="img"
              aria-label="An automated system path interrupted by a failure mark, with a crimson fallback mechanism routing cleanly around the failure."
              viewBox="0 0 400 130"
              className="mt-6 w-full"
              fill="none"
            >
              <title>
                An automated system path interrupted by a failure mark, with a
                crimson fallback mechanism routing cleanly around the failure.
              </title>
              <path
                d="M16 70H178M222 70H384"
                stroke="var(--charcoal)"
                strokeOpacity="0.55"
                strokeWidth="2"
              />
              <path
                d="M376 64l8 6l-8 6"
                stroke="var(--charcoal)"
                strokeOpacity="0.6"
                strokeWidth="2"
              />
              <path
                d="M190 58l20 24M210 58l-20 24"
                stroke="var(--charcoal)"
                strokeOpacity="0.7"
                strokeWidth="2"
              />
              <path
                d="M120 70V34H280V70"
                stroke="var(--crimson)"
                strokeWidth="2.5"
              />
              <path
                d="M274 62l6 8l6 -8"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <text
                {...SVG_LABEL}
                x="200"
                y="22"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                FALLBACK MECHANISMS
              </text>
              <text
                {...SVG_LABEL}
                x="16"
                y="100"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                AUTOMATED SYSTEMS
              </text>
              <text
                {...SVG_LABEL}
                x="200"
                y="100"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                FAIL
              </text>
            </svg>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          32. STRATEGIC AGILITY: a crimson course that turns sharply above
          a quickening market. A sensing sweep catching one competitor move.
          Resources shifted from one bar to another.
      ================================================================== */}
      <Slide id="agility" border align="left">
        <Head1>Strategic Agility</Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            AI accelerates market dynamics, requiring firms to rapidly pivot
            their strategies.
          </p>
          <svg
            role="img"
            aria-label="A crimson strategy trajectory making three sharp pivots at decision nodes above an accelerating market dynamics wave."
            viewBox="0 0 800 120"
            className="mt-7 w-full max-w-5xl"
            fill="none"
          >
            <title>
              A crimson strategy trajectory making three sharp pivots at
              decision nodes above an accelerating market dynamics wave.
            </title>
            <path
              d="M16 70H150L210 30H330L380 76H520L570 38H784"
              stroke="var(--crimson)"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path
              d="M776 32l8 6l-8 6"
              stroke="var(--crimson)"
              strokeWidth="2.5"
            />
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
              d={Array.from({ length: 127 })
                .map((_, i) => {
                  const x = 154 + i * 5;
                  const u = (x - 154) / 630;
                  const y = 100 + 5 * Math.sin(u * u * 90);
                  return `${i === 0 ? "M" : "L"}${x} ${y.toFixed(1)}`;
                })
                .join("")}
              stroke="var(--charcoal)"
              strokeOpacity="0.35"
            />
            <text
              {...SVG_LABEL}
              x="16"
              y="104"
              fill="var(--charcoal)"
              fillOpacity="0.65"
            >
              MARKET DYNAMICS
            </text>
          </svg>
        </div>

        <div className="mt-12 grid w-full max-w-5xl gap-10 border-t border-[var(--charcoal)]/10 pt-8 md:grid-cols-2 md:gap-14">
          <div>
            <p className={BODY}>
              Building continuous sensing capabilities to monitor competitive
              movements.
            </p>
            <svg
              role="img"
              aria-label="A semicircular continuous sensing radar sweep detecting competitive movements across three concentric range rings."
              viewBox="0 0 400 180"
              className="mt-6 w-full"
              fill="none"
            >
              <title>
                A semicircular continuous sensing radar sweep detecting
                competitive movements across three concentric range rings.
              </title>
              <path
                d="M60 150H340"
                stroke="var(--charcoal)"
                strokeOpacity="0.3"
              />
              {[40, 80, 120].map((r) => (
                <path
                  key={r}
                  d={`M${200 - r} 150A${r} ${r} 0 0 1 ${200 + r} 150`}
                  stroke="var(--charcoal)"
                  strokeOpacity="0.25"
                />
              ))}
              <path
                d="M200 150L260 46.08A120 120 0 0 0 200 30Z"
                fill="var(--crimson)"
                fillOpacity="0.08"
              />
              <path
                d="M200 150L260 46.08"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              {[
                [120, 96],
                [296, 118],
                [150, 128],
                [284, 86],
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
              <circle cx="246" cy="70.3" r="5" fill="var(--crimson)" />
              <text {...SVG_LABEL} x="16" y="20" fill="var(--crimson)">
                CONTINUOUS SENSING
              </text>
              <text
                {...SVG_LABEL}
                x="384"
                y="170"
                textAnchor="end"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                COMPETITIVE MOVEMENTS
              </text>
            </svg>
          </div>

          <div>
            <p className={BODY}>
              The capacity to reallocate resources dynamically based on
              predictive insights.
            </p>
            <figure className="mt-6 w-full">
              <svg
                role="img"
                aria-label="Four resource allocation bars where resources are dynamically reallocated via a dashed crimson arc from the first bar into the third bar based on predictive insights."
                viewBox="0 0 400 180"
                className="w-full"
                fill="none"
              >
                <title>
                  Four resource allocation bars where resources are dynamically
                  reallocated via a dashed crimson arc from the first bar into
                  the third bar based on predictive insights.
                </title>
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
                      fillOpacity={i === 2 ? 0.16 : 0.14}
                      stroke={i === 2 ? "var(--crimson)" : "var(--charcoal)"}
                      strokeOpacity={i === 2 ? 1 : 0.45}
                      strokeWidth={i === 2 ? 2 : 1.25}
                    />
                  </g>
                ))}
                <path
                  d="M20 140H380"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.35"
                />
                <path
                  d="M65 50C120 12 190 10 245 34"
                  stroke="var(--crimson)"
                  strokeOpacity="0.85"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <path
                  d="M235 27l10 7l-12 3"
                  stroke="var(--crimson)"
                  strokeWidth="1.5"
                />
                <text
                  {...SVG_LABEL}
                  x="20"
                  y="166"
                  fill="var(--charcoal)"
                  fillOpacity="0.65"
                >
                  REALLOCATE RESOURCES
                </text>
                <text
                  {...SVG_LABEL}
                  x="380"
                  y="20"
                  textAnchor="end"
                  fill="var(--crimson)"
                >
                  PREDICTIVE INSIGHTS
                </text>
              </svg>
            </figure>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          33. REGULATORY STRATEGY: the two things being navigated. A firm
          engaging policymakers both ways and shaping the standard that comes
          out. Constraint struck for differentiator.
      ================================================================== */}
      <Slide id="regulatory" border align="left">
        <Head1>Regulatory Strategy</Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Navigating the evolving landscape of global AI regulations and
            compliance standards.
          </p>
          <Terms items={["global AI regulations", "compliance standards"]} />
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Proactively engaging with policymakers to shape industry
              standards.
            </p>
            <svg
              role="img"
              aria-label="A firm proactively engaging in two-way dialogue with policymakers at the center, who in turn shape the crimson industry standards document on the right."
              viewBox="0 0 800 112"
              className="mt-6 w-full max-w-5xl"
              fill="none"
            >
              <title>
                A firm proactively engaging in two-way dialogue with
                policymakers at the center, who in turn shape the crimson
                industry standards document on the right.
              </title>
              <rect
                x="96"
                y="34"
                width="32"
                height="32"
                fill="var(--charcoal)"
                fillOpacity="0.06"
                stroke="var(--charcoal)"
                strokeOpacity="0.7"
                strokeWidth="1.5"
              />
              <path
                d="M128 43H364M364 57H128"
                stroke="var(--charcoal)"
                strokeOpacity="0.5"
                strokeWidth="1.5"
              />
              <path
                d="M356 38l8 5l-8 5"
                stroke="var(--charcoal)"
                strokeOpacity="0.65"
                strokeWidth="1.5"
              />
              <path
                d="M136 52l-8 5l8 5"
                stroke="var(--charcoal)"
                strokeOpacity="0.65"
                strokeWidth="1.5"
              />
              <text
                {...SVG_LABEL}
                x="246"
                y="26"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                PROACTIVELY ENGAGING
              </text>
              <rect
                x="364"
                y="24"
                width="84"
                height="52"
                fill="var(--charcoal)"
                fillOpacity="0.03"
                stroke="var(--charcoal)"
                strokeOpacity="0.4"
              />
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
                y="96"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                POLICYMAKERS
              </text>
              <path d="M448 50H664" stroke="var(--crimson)" strokeWidth="2" />
              <path
                d="M656 44l8 6l-8 6"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <text
                {...SVG_LABEL}
                x="556"
                y="36"
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
                fill="var(--crimson)"
                fillOpacity="0.08"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              {[38, 50, 62].map((y) => (
                <path
                  key={y}
                  d={`M674 ${y}H${y === 62 ? 700 : 718}`}
                  stroke="var(--crimson)"
                  strokeOpacity="0.7"
                  strokeWidth="1.5"
                />
              ))}
              <text
                {...SVG_LABEL}
                x="696"
                y="96"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                INDUSTRY STANDARDS
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <p className={`${DISPLAY} max-w-4xl`}>
              Treating privacy and ethical compliance as a competitive
              differentiator rather than a constraint.
            </p>
            <div className="mt-6 max-w-4xl">
              <Split1
                left="Constraint"
                right="Competitive differentiator"
                strikeLeft
              />
            </div>
            <Terms items={["privacy", "ethical compliance"]} className="mt-6" />
          </div>
        </div>

        <Discussion1>
          If a new regulation heavily restricts your primary algorithmic
          advantage, how do you pivot the corporate strategy without losing
          market share?
        </Discussion1>
      </Slide>

      {/* ==================================================================
          34. AI AND CORPORATE SOCIAL RESPONSIBILITY: the three ethical
          implications. The AI strategy laid across three ESG pillars. An
          open, see-through system linked to customers and stakeholders.
      ================================================================== */}
      <Slide id="csr" border align="left">
        <Head1>
          AI and Corporate Social Responsibility
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            The ethical implications of AI deployment, including bias, fairness,
            and job displacement.
          </p>
          <Steps
            items={["bias", "fairness", "job displacement"]}
            cols="md:grid-cols-3"
            className="mt-6 max-w-4xl"
          />
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Aligning the AI strategy with the broader environmental, social,
              and governance goals.
            </p>
            <svg
              role="img"
              aria-label="A crimson AI strategy lintel resting directly across three supporting pillars labeled environmental, social, and governance."
              viewBox="0 0 800 146"
              className="mt-6 w-full max-w-5xl"
              fill="none"
            >
              <title>
                A crimson AI strategy lintel resting directly across three
                supporting pillars labeled environmental, social, and
                governance.
              </title>
              <text
                {...SVG_LABEL}
                x="400"
                y="20"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                AI STRATEGY
              </text>
              <rect
                x="130"
                y="30"
                width="540"
                height="12"
                fill="var(--crimson)"
                fillOpacity="0.16"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
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
                    strokeOpacity="0.55"
                    strokeWidth="1.25"
                  />
                  <text
                    {...SVG_LABEL}
                    x={p.x + 50}
                    y="132"
                    textAnchor="middle"
                    fill="var(--charcoal)"
                    fillOpacity="0.7"
                  >
                    {p.label}
                  </text>
                </g>
              ))}
              <path
                d="M110 112H690"
                stroke="var(--charcoal)"
                strokeOpacity="0.4"
              />
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <p className={`${DISPLAY} max-w-4xl`}>
              Building trust with customers and stakeholders through transparent
              AI practices.
            </p>
            <svg
              role="img"
              aria-label="A central transparent AI practices glass box revealing its internal model network, connected by crimson trust arrows to customers on the left and stakeholders on the right."
              viewBox="0 0 800 140"
              className="mt-6 w-full"
              fill="none"
            >
              <title>
                A central transparent AI practices glass box revealing its
                internal model network, connected by crimson trust arrows to
                customers on the left and stakeholders on the right.
              </title>
              <text
                {...SVG_LABEL}
                x="400"
                y="18"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                BUILDING TRUST
              </text>
              <rect
                x="24"
                y="48"
                width="132"
                height="40"
                fill="var(--charcoal)"
                fillOpacity="0.04"
                stroke="var(--charcoal)"
                strokeOpacity="0.5"
                strokeWidth="1.25"
              />
              <text
                {...SVG_LABEL}
                x="90"
                y="72"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.75"
              >
                CUSTOMERS
              </text>
              <rect
                x="644"
                y="48"
                width="132"
                height="40"
                fill="var(--charcoal)"
                fillOpacity="0.04"
                stroke="var(--charcoal)"
                strokeOpacity="0.5"
                strokeWidth="1.25"
              />
              <text
                {...SVG_LABEL}
                x="710"
                y="72"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.75"
              >
                STAKEHOLDERS
              </text>
              <rect
                x="340"
                y="28"
                width="120"
                height="80"
                fill="var(--charcoal)"
                fillOpacity="0.03"
                stroke="var(--charcoal)"
                strokeOpacity="0.45"
                strokeWidth="1.25"
              />
              <path
                d="M370 48L400 68L430 48M370 88L400 68L430 88M370 48V88M430 48V88"
                stroke="var(--charcoal)"
                strokeOpacity="0.4"
              />
              {[
                [370, 48],
                [430, 48],
                [400, 68],
                [370, 88],
                [430, 88],
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
              <path
                d="M340 68H156M460 68H644"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <path
                d="M164 62l-8 6l8 6M636 62l8 6l-8 6"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <text
                {...SVG_LABEL}
                x="400"
                y="128"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                TRANSPARENT AI PRACTICES
              </text>
            </svg>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          35. THE FUTURE STRATEGIC HORIZON: the three closing statements in
          display weight, collaboration struck for autonomous units, then
          the colophon.
      ================================================================== */}
      <Slide
        id="horizon"
        border
        align="left"
        className="relative overflow-hidden"
      >
        <Head1>
          The Future Strategic Horizon
        </Head1>

        <ol className="mt-10 w-full max-w-4xl">
          {[
            "Preparing for the integration of generative AI and autonomous agents into core strategy.",
            "The shift from human-machine collaboration to autonomous organizational units.",
            "Sustaining strategic advantage in a completely AI-saturated market.",
          ].map((line, i) => (
            <li key={line} className="block">
              <div className="grid grid-cols-[4ch_1fr] gap-6 border-t border-[var(--charcoal)]/12 py-7 md:grid-cols-[5ch_1fr] md:gap-10">
                <span className={`${MICRO} pt-3 text-[var(--crimson)]`}>
                  {pad(i + 1)}
                </span>
                <div>
                  <p className="font-sans text-xl font-medium leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[1.75rem]">
                    {line}
                  </p>
                  {i === 1 && (
                    <div className="mt-5 max-w-3xl">
                      <Split1
                        left="Human-machine collaboration"
                        right="Autonomous organizational units"
                        strikeLeft
                      />
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="w-full">
          <div className="mt-12 flex w-full max-w-4xl flex-wrap items-baseline justify-between gap-4 border-t border-[var(--charcoal)]/12 pt-5">
            <span className={`${MICRO} text-[var(--champagne)]`}>
              End of Week 06
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
