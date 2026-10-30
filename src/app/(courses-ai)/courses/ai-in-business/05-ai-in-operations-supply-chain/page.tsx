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
// WEEK 05: AI IN OPERATIONS AND SUPPLY CHAIN
// ============================================================================
// Same deck grammar as Weeks 01 to 04: every slide is hand-composed for its own
// argument, with hairlines instead of boxes and crimson marking one thing.
//
// Sentences are transcribed verbatim from content.md. Figures carry only words
// that already appear in the slide's sentences.
//
// Quizzes: `Slide` renders `quizData` BEFORE its section. A [quiz] tag in
// content.md marks the topic to test, so each quiz is attached to the slide
// that FOLLOWS its topic and only tests material the student has already
// passed. Where the following slide is a part plate, the plate carries it.
// ============================================================================

const quiz = createCourseQuizLookup(quizzes as CourseQuiz[]);

export default function Week05OperationsSupplyChain() {
  return (
    <SlideDeck>
      <ScrollProgress label="Week 05" />

      {/* ==================================================================
          01. TITLE: masthead, the reactive-to-predictive subtitle, and the
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
          <h1 className="mt-10 max-w-5xl font-serif text-[clamp(2.5rem,7.5vw,5.75rem)] font-semibold leading-[0.92] tracking-[-0.035em] text-[var(--charcoal)]">
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
            <Split1
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
              BUSI 654. Applications of AI in Business
            </span>
          </div>
        </div>
      </Slide>

      <PartPlate1
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
          03. COMPLEXITY OF GLOBAL OPERATIONS: a network spanning zones. A
          small spreadsheet beside a field of variables. One disruption
          cascading down a chain. Simplified assumptions struck.
                                                          [quiz topic]
      ================================================================== */}
      <Slide id="global-complexity" border align="left">
        <Head1 eyebrow="Opening">The Complexity of Global Operations</Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Modern supply chains are highly interconnected networks spanning
            multiple continents and regulatory zones.
          </p>
          <svg
            role="img"
            aria-label="Highly interconnected supply chain networks spanning three continents and regulatory zones separated by dashed borders."
            viewBox="0 0 800 148"
            className="mt-7 w-full max-w-5xl"
            fill="none"
          >
            <title>
              Highly interconnected supply chain networks spanning three
              continents and regulatory zones separated by dashed borders.
            </title>
            {/* Three continents / regulatory zones */}
            {[16, 282, 548].map((x) => (
              <rect
                key={x}
                x={x}
                y="24"
                width="236"
                height="98"
                fill="var(--charcoal)"
                fillOpacity="0.02"
                stroke="var(--charcoal)"
                strokeOpacity="0.24"
                strokeDasharray="4 4"
              />
            ))}
            <text
              {...SVG_LABEL}
              x="16"
              y="16"
              fill="var(--charcoal)"
              fillOpacity="0.6"
            >
              MULTIPLE CONTINENTS
            </text>
            <text
              {...SVG_LABEL}
              x="400"
              y="16"
              textAnchor="middle"
              fill="var(--charcoal)"
              fillOpacity="0.6"
            >
              REGULATORY ZONES
            </text>
            <text
              {...SVG_LABEL}
              x="784"
              y="140"
              textAnchor="end"
              fill="var(--crimson)"
            >
              HIGHLY INTERCONNECTED NETWORKS
            </text>
            {(() => {
              const nodes = [
                [56, 52],
                [56, 94],
                [148, 46],
                [148, 100],
                [216, 73],
                [322, 48],
                [322, 98],
                [400, 73],
                [478, 48],
                [478, 98],
                [584, 73],
                [652, 46],
                [652, 100],
                [744, 52],
                [744, 94],
              ];
              const localLinks = [
                [0, 1],
                [0, 2],
                [1, 3],
                [2, 4],
                [3, 4],
                [5, 6],
                [5, 7],
                [6, 7],
                [7, 8],
                [7, 9],
                [8, 9],
                [10, 11],
                [10, 12],
                [11, 13],
                [12, 14],
                [13, 14],
              ];
              const crossZoneLinks = [
                [2, 5],
                [4, 5],
                [4, 6],
                [3, 6],
                [8, 11],
                [8, 10],
                [9, 10],
                [9, 12],
              ];
              return (
                <g>
                  {localLinks.map(([a, b]) => (
                    <path
                      key={`l-${a}-${b}`}
                      d={`M${nodes[a][0]} ${nodes[a][1]}L${nodes[b][0]} ${nodes[b][1]}`}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.3"
                      strokeWidth="1.25"
                    />
                  ))}
                  {crossZoneLinks.map(([a, b]) => (
                    <path
                      key={`c-${a}-${b}`}
                      d={`M${nodes[a][0]} ${nodes[a][1]}L${nodes[b][0]} ${nodes[b][1]}`}
                      stroke="var(--crimson)"
                      strokeOpacity="0.7"
                      strokeWidth="1.5"
                    />
                  ))}
                  {nodes.map(([x, y], idx) => {
                    const isBorderNode = [
                      2, 3, 4, 5, 6, 8, 9, 10, 11, 12,
                    ].includes(idx);
                    return (
                      <circle
                        key={`${x}-${y}`}
                        cx={x}
                        cy={y}
                        r="5"
                        fill="var(--surface)"
                        stroke={
                          isBorderNode ? "var(--crimson)" : "var(--charcoal)"
                        }
                        strokeOpacity={isBorderNode ? "0.95" : "0.6"}
                        strokeWidth="1.5"
                      />
                    );
                  })}
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
                role="img"
                aria-label="Rigid spreadsheet-based planning grid blocked from processing a large volume of variables required for global optimization."
                viewBox="0 0 400 154"
                className="mt-6 w-full"
                fill="none"
              >
                <title>
                  Rigid spreadsheet-based planning grid blocked from processing
                  a large volume of variables required for global optimization.
                </title>
                <text
                  {...SVG_LABEL}
                  x="146"
                  y="18"
                  textAnchor="middle"
                  fill="var(--crimson)"
                >
                  CANNOT PROCESS
                </text>
                <rect
                  x="14"
                  y="32"
                  width="96"
                  height="72"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.55"
                />
                {[50, 68, 86].map((y) => (
                  <path
                    key={y}
                    d={`M14 ${y}H110`}
                    stroke="var(--charcoal)"
                    strokeOpacity="0.25"
                  />
                ))}
                {[46, 78].map((x) => (
                  <path
                    key={x}
                    d={`M${x} 32V104`}
                    stroke="var(--charcoal)"
                    strokeOpacity="0.25"
                  />
                ))}
                {/* Bottleneck / cannot process barrier */}
                <path
                  d="M118 68H168"
                  stroke="var(--crimson)"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
                <path
                  d="M138 60L150 76M150 60L138 76"
                  stroke="var(--crimson)"
                  strokeWidth="2"
                />
                <path
                  d="M176 28V108"
                  stroke="var(--crimson)"
                  strokeOpacity="0.55"
                  strokeWidth="1.5"
                />
                {Array.from({ length: 16 * 7 }).map((_, k) => {
                  const col = k % 16;
                  const row = Math.floor(k / 16);
                  return (
                    <circle
                      key={k}
                      cx={192 + col * 12.5}
                      cy={32 + row * 12}
                      r="2.2"
                      fill="var(--charcoal)"
                      fillOpacity={+(0.22 + ((col * 7 + row * 5) % 4) * 0.08).toFixed(2)}
                    />
                  );
                })}
                <text
                  {...SVG_LABEL}
                  x="14"
                  y="134"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  SPREADSHEET-BASED PLANNING
                </text>
                <text
                  {...SVG_LABEL}
                  x="386"
                  y="134"
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
                role="img"
                aria-label="A disruption at the first stage cascading rapidly across five tightly coupled supply chain stages with lean inventory."
                viewBox="0 0 400 108"
                className="mt-6 w-full"
                fill="none"
              >
                <title>
                  A disruption at the first stage cascading rapidly across five
                  tightly coupled supply chain stages with lean inventory.
                </title>
                {[0, 1, 2, 3, 4].map((i) => {
                  const x = 32 + i * 84;
                  return (
                    <g key={i}>
                      {i < 4 && (
                        <>
                          <path
                            d={`M${x + 11} 42H${x + 73}`}
                            stroke="var(--crimson)"
                            strokeOpacity="0.65"
                            strokeWidth="1.5"
                          />
                          <path
                            d={`M${x + 66} 37l7 5l-7 5`}
                            stroke="var(--crimson)"
                            strokeOpacity="0.8"
                            strokeWidth="1.5"
                          />
                        </>
                      )}
                      <circle
                        cx={x}
                        cy="42"
                        r="11"
                        fill={i === 0 ? "var(--crimson)" : "var(--surface)"}
                        stroke="var(--crimson)"
                        strokeOpacity={+(1 - i * 0.12).toFixed(2)}
                        strokeWidth="2"
                      />
                      {i > 0 && (
                        <circle
                          cx={x}
                          cy="42"
                          r="4"
                          fill="var(--crimson)"
                          fillOpacity={+(0.85 - i * 0.15).toFixed(2)}
                        />
                      )}
                    </g>
                  );
                })}
                <text {...SVG_LABEL} x="20" y="86" fill="var(--crimson)">
                  DISRUPTIONS
                </text>
                <text
                  {...SVG_LABEL}
                  x="380"
                  y="86"
                  textAnchor="end"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  CASCADE RAPIDLY
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
            <p className={`${DISPLAY} max-w-4xl`}>
              Machine learning provides the capability to model this complexity
              without relying on simplified assumptions.
            </p>
            <div className="mt-6">
              <Split1
                left="Simplified assumptions"
                right="Model this complexity"
                strikeLeft
              />
            </div>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          04. AI VS. TRADITIONAL OPTIMIZATION: a fixed constraint line
          beside one that re-sets with each batch of new data. A straight fit
          missing a curved pattern that deep learning follows.
                                              [quiz: global-complexity]
      ================================================================== */}
      <Slide
        id="ai-vs-traditional"
        border
        align="left"
        quizData={quiz["ai-vs-traditional"]}
      >
        <Head1 eyebrow="Two ways to optimize">
          AI vs. Traditional Optimization
        </Head1>

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
              role="img"
              aria-label="Static linear programming constraints bounding a fixed feasible region across time."
              viewBox="0 0 400 120"
              className="mt-6 w-full"
              fill="none"
            >
              <title>
                Static linear programming constraints bounding a fixed feasible
                region across time.
              </title>
              <text
                {...SVG_LABEL}
                x="24"
                y="20"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                STATIC CONSTRAINTS
              </text>
              <rect
                x="24"
                y="44"
                width="360"
                height="46"
                fill="var(--charcoal)"
                fillOpacity="0.05"
              />
              <path
                d="M24 44H384"
                stroke="var(--charcoal)"
                strokeOpacity="0.7"
                strokeWidth="2"
              />
              <path
                d="M24 28V90H384"
                stroke="var(--charcoal)"
                strokeOpacity="0.25"
              />
              <text
                {...SVG_LABEL}
                x="384"
                y="110"
                textAnchor="end"
                fill="var(--charcoal)"
                fillOpacity="0.55"
              >
                LINEAR PROGRAMMING MODELS
              </text>
            </svg>
          </div>

          <div>
            <div className={`${MICRO} text-[var(--crimson)]`}>AI systems</div>
            <p className={`${BODY} mt-4`}>
              AI systems continuously learn from new data, dynamically adjusting
              operational constraints in real time.
            </p>
            <svg
              role="img"
              aria-label="Operational constraints dynamically adjusting in real time at each arrival of new data."
              viewBox="0 0 400 120"
              className="mt-6 w-full"
              fill="none"
            >
              <title>
                Operational constraints dynamically adjusting in real time at
                each arrival of new data.
              </title>
              <text {...SVG_LABEL} x="24" y="20" fill="var(--crimson)">
                ADJUSTING IN REAL TIME
              </text>
              <path
                d="M24 54H74V38H134V62H194V44H254V32H314V56H384V90H24Z"
                fill="var(--crimson)"
                fillOpacity="0.06"
              />
              <path
                d="M24 54H74V38H134V62H194V44H254V32H314V56H384"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <path
                d="M24 28V90H384"
                stroke="var(--charcoal)"
                strokeOpacity="0.25"
              />
              {[74, 134, 194, 254, 314].map((x) => (
                <path
                  key={x}
                  d={`M${x} 84V96`}
                  stroke="var(--crimson)"
                  strokeOpacity="0.7"
                  strokeWidth="1.5"
                />
              ))}
              <text
                {...SVG_LABEL}
                x="384"
                y="110"
                textAnchor="end"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                NEW DATA
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 grid w-full max-w-5xl items-center gap-10 border-t border-[var(--charcoal)]/10 pt-8 md:grid-cols-[1fr_25rem] md:gap-14">
            <p className={LEAD}>
              Deep learning handles non-linear relationships that traditional
              statistical models often miss.
            </p>
            <figure className="w-full">
              <svg
                role="img"
                aria-label="Comparison of a dashed linear fit from traditional statistical models missing a curved non-linear relationship captured by deep learning."
                viewBox="0 0 400 180"
                className="w-full"
                fill="none"
              >
                <title>
                  Comparison of a dashed linear fit from traditional statistical
                  models missing a curved non-linear relationship captured by
                  deep learning.
                </title>
                <path
                  d="M20 14V162H384"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.22"
                />
                {(() => {
                  const f = (x: number) =>
                    150 - 116 / (1 + Math.exp(-(x - 200) / 32));
                  const jitter = [4, -5, 2, -4, 5, -2];
                  const points = Array.from({ length: 14 }).map((_, i) => {
                    const x = 34 + i * 25;
                    return [x, +(f(x) + jitter[i % jitter.length]).toFixed(2)];
                  });
                  const curve = Array.from({ length: 36 })
                    .map((_, i) => {
                      const x = 28 + i * 10;
                      return `${i === 0 ? "M" : "L"}${x} ${f(x).toFixed(2)}`;
                    })
                    .join("");
                  return (
                    <g>
                      <path
                        d="M28 140L378 44"
                        stroke="var(--charcoal)"
                        strokeOpacity="0.45"
                        strokeWidth="1.5"
                        strokeDasharray="5 5"
                      />
                      <path d={curve} stroke="var(--crimson)" strokeWidth="2" />
                      {points.map(([x, y]) => (
                        <circle
                          key={x}
                          cx={x}
                          cy={y}
                          r="3"
                          fill="var(--charcoal)"
                          fillOpacity="0.45"
                        />
                      ))}
                    </g>
                  );
                })()}
                <text
                  {...SVG_LABEL}
                  x="290"
                  y="24"
                  textAnchor="middle"
                  fill="var(--crimson)"
                >
                  DEEP LEARNING
                </text>
                <path
                  d="M320 62V124"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.3"
                  strokeDasharray="2 3"
                />
                <text
                  {...SVG_LABEL}
                  x="378"
                  y="140"
                  textAnchor="end"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  TRADITIONAL STATISTICAL MODELS
                </text>
              </svg>
            </figure>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          05. REACTIVE TO PREDICTIVE: one disruption on a timeline: the
          reactive lane moves after it, the predictive lane reads leading
          indicators and moves weeks before. Crisis management struck.
      ================================================================== */}
      <Slide id="reactive-to-predictive" border align="left">
        <Head1 eyebrow="A change of posture">
          The Shift from Reactive to Predictive
        </Head1>

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
          <figure className="mt-10 w-full max-w-5xl">
            <svg
              role="img"
              aria-label="Timeline comparing historical supply chains reacting to disruptions after they occurred versus predictive models analyzing leading indicators to forecast disruptions weeks before."
              viewBox="0 0 800 164"
              className="w-full"
              fill="none"
            >
              <title>
                Timeline comparing historical supply chains reacting to
                disruptions after they occurred versus predictive models
                analyzing leading indicators to forecast disruptions weeks
                before.
              </title>
              <path
                d="M540 12V132"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <text
                {...SVG_LABEL}
                x="540"
                y="152"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                DISRUPTIONS
              </text>

              <text
                {...SVG_LABEL}
                x="14"
                y="48"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                HISTORICAL SUPPLY CHAINS
              </text>
              <path
                d="M214 44H530"
                stroke="var(--charcoal)"
                strokeOpacity="0.2"
                strokeDasharray="3 5"
              />
              <path
                d="M552 44H746"
                stroke="var(--charcoal)"
                strokeOpacity="0.65"
                strokeWidth="2"
              />
              <path
                d="M738 38l8 6l-8 6"
                stroke="var(--charcoal)"
                strokeOpacity="0.65"
                strokeWidth="2"
              />
              <text
                {...SVG_LABEL}
                x="554"
                y="30"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                AFTER THEY OCCURRED
              </text>

              <text
                {...SVG_LABEL}
                x="14"
                y="108"
                fill="var(--crimson)"
              >
                PREDICTIVE MODELS
              </text>
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <path
                  key={i}
                  d={`M${214 + i * 12} ${104 - (i % 3) * 3 - 4}V${104 + (i % 3) * 3 + 4}`}
                  stroke="var(--charcoal)"
                  strokeOpacity="0.55"
                  strokeWidth="1.5"
                />
              ))}
              <text
                {...SVG_LABEL}
                x="214"
                y="84"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                LEADING INDICATORS
              </text>
              <path
                d="M312 104H528"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <path
                d="M520 98l8 6l-8 6"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <text
                {...SVG_LABEL}
                x="442"
                y="84"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                WEEKS BEFORE
              </text>
            </svg>
          </figure>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <p className={`${DISPLAY} max-w-4xl`}>
              Operations teams are transitioning from crisis management to
              strategic scenario planning.
            </p>
            <div className="mt-6">
              <Split1
                left="Crisis management"
                right="Strategic scenario planning"
                strikeLeft
              />
            </div>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          06. DATA: the requirement in lead weight. Four sources converging
          on the models. Departments walled off from each other.
      ================================================================== */}
      <Slide id="data-core" border align="left">
        <Head1 eyebrow="What the models run on">
          Data: The Core of Operations AI
        </Head1>

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
              role="img"
              aria-label="Four operational data sources (IoT sensors, ERP systems, supplier portals, and external market signals) converging into machine learning models."
              viewBox="0 0 800 156"
              className="mt-6 w-full max-w-5xl"
              fill="none"
            >
              <title>
                Four operational data sources (IoT sensors, ERP systems,
                supplier portals, and external market signals) converging into
                machine learning models.
              </title>
              {[
                { y: 22, label: "IOT SENSORS" },
                { y: 58, label: "ERP SYSTEMS" },
                { y: 94, label: "SUPPLIER PORTALS" },
                { y: 130, label: "EXTERNAL MARKET SIGNALS" },
              ].map((s) => (
                <g key={s.label}>
                  <text
                    {...SVG_LABEL}
                    x="14"
                    y={s.y + 3}
                    fill="var(--charcoal)"
                    fillOpacity="0.65"
                  >
                    {s.label}
                  </text>
                  <circle
                    cx="236"
                    cy={s.y}
                    r="4"
                    fill="var(--surface)"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.55"
                    strokeWidth="1.5"
                  />
                  <path
                    d={`M240 ${s.y} C 368 ${s.y}, 424 76, 548 76`}
                    stroke="var(--charcoal)"
                    strokeOpacity="0.3"
                    strokeWidth="1.25"
                  />
                </g>
              ))}
              <path
                d="M541 71l7 5l-7 5"
                stroke="var(--crimson)"
                strokeWidth="1.5"
              />
              <rect
                x="548"
                y="48"
                width="236"
                height="56"
                fill="var(--crimson)"
                fillOpacity="0.05"
                stroke="var(--crimson)"
                strokeWidth="1.5"
              />
              <text
                {...SVG_LABEL}
                x="666"
                y="79"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                MACHINE LEARNING MODELS
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <p className={`${DISPLAY} max-w-4xl`}>
              Data silos between different departments remain the primary
              barrier to successful AI implementation.
            </p>
            <svg
              role="img"
              aria-label="Four departments walled off by crimson data silos that block horizontal data flow as the primary barrier to AI implementation."
              viewBox="0 0 800 108"
              className="mt-6 w-full max-w-4xl"
              fill="none"
            >
              <title>
                Four departments walled off by crimson data silos that block
                horizontal data flow as the primary barrier to AI
                implementation.
              </title>
              {[0, 1, 2, 3].map((d) => {
                const x = 14 + d * 196;
                return (
                  <g key={d}>
                    <rect
                      x={x}
                      y="18"
                      width="180"
                      height="56"
                      fill="var(--charcoal)"
                      fillOpacity="0.025"
                      stroke="var(--charcoal)"
                      strokeOpacity="0.22"
                    />
                    {[0, 1, 2, 3, 4].map((c) =>
                      [0, 1].map((r) => (
                        <circle
                          key={`${c}-${r}`}
                          cx={x + 36 + c * 27}
                          cy={38 + r * 16}
                          r="2.5"
                          fill="var(--charcoal)"
                          fillOpacity={+(0.25 + ((c * 3 + d * 5 + r) % 4) * 0.1).toFixed(2)}
                        />
                      )),
                    )}
                    {d < 3 && (
                      <path
                        d={`M${x + 188} 10V82`}
                        stroke="var(--crimson)"
                        strokeWidth="3"
                      />
                    )}
                  </g>
                );
              })}
              <text
                {...SVG_LABEL}
                x="14"
                y="98"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                DIFFERENT DEPARTMENTS
              </text>
              <text
                {...SVG_LABEL}
                x="782"
                y="98"
                textAnchor="end"
                fill="var(--crimson)"
              >
                DATA SILOS | PRIMARY BARRIER
              </text>
            </svg>
          </div>
        </div>

        <Discussion1>
          When supply chain partners refuse to share their operational data, how
          can a lead firm build accurate predictive models?
        </Discussion1>
      </Slide>

      <PartPlate1
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
          08. BEYOND HISTORICAL AVERAGES: the two traditional inputs set
          against three real-time signals. A subtle shift in behaviour caught
          long before it reaches the sales ledger.            [quiz topic]
      ================================================================== */}
      <Slide id="beyond-averages" border align="left">
        <Head1 eyebrow="Demand sensing">Beyond Historical Averages</Head1>

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
            <figure className="mt-7 w-full max-w-5xl">
              <svg
                role="img"
                aria-label="Timeline showing subtle patterns in consumer behavior detected by neural networks long before the shift in demand hits the sales ledger."
                viewBox="0 0 800 164"
                className="w-full"
                fill="none"
              >
                <title>
                  Timeline showing subtle patterns in consumer behavior detected
                  by neural networks long before the shift in demand hits the
                  sales ledger.
                </title>
                <text
                  {...SVG_LABEL}
                  x="14"
                  y="55"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  CONSUMER BEHAVIOR
                </text>
                <path
                  d={Array.from({ length: 24 })
                    .map((_, i) => {
                      const x = 180 + i * 10;
                      const y = +(52 + Math.sin(x / 13) * 2).toFixed(2);
                      return `${i === 0 ? "M" : "L"}${x} ${y}`;
                    })
                    .join("")}
                  stroke="var(--charcoal)"
                  strokeOpacity="0.5"
                  strokeWidth="1.5"
                />
                <path
                  d={Array.from({ length: 38 })
                    .map((_, i) => {
                      const x = 410 + i * 10;
                      const drift = (x - 410) * 0.055;
                      const y = +(52 - drift + Math.sin(x / 13) * 2).toFixed(2);
                      return `${i === 0 ? "M" : "L"}${x} ${y}`;
                    })
                    .join("")}
                  stroke="var(--crimson)"
                  strokeWidth="2"
                />
                <circle cx="410" cy="52" r="5" fill="var(--crimson)" />
                <text
                  {...SVG_LABEL}
                  x="410"
                  y="24"
                  textAnchor="middle"
                  fill="var(--crimson)"
                >
                  SUBTLE PATTERNS
                </text>

                <text
                  {...SVG_LABEL}
                  x="14"
                  y="125"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  SALES LEDGER
                </text>
                <path
                  d="M180 122H640V102H780"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.6"
                  strokeWidth="1.5"
                />
                <circle
                  cx="640"
                  cy="112"
                  r="5"
                  fill="var(--surface)"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.75"
                  strokeWidth="1.5"
                />
                <text
                  {...SVG_LABEL}
                  x="640"
                  y="150"
                  textAnchor="middle"
                  fill="var(--charcoal)"
                  fillOpacity="0.65"
                >
                  SHIFT IN DEMAND
                </text>

                <path
                  d="M410 64V94M640 64V94"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.3"
                  strokeDasharray="2 3"
                />
                <path
                  d="M410 78H640"
                  stroke="var(--crimson)"
                  strokeOpacity="0.8"
                  strokeWidth="1.5"
                />
                <path
                  d="M418 73l-8 5l8 5M632 73l8 5l-8 5"
                  stroke="var(--crimson)"
                  strokeOpacity="0.8"
                  strokeWidth="1.5"
                />
                <text
                  {...SVG_LABEL}
                  x="525"
                  y="96"
                  textAnchor="middle"
                  fill="var(--crimson)"
                >
                  LONG BEFORE
                </text>
              </svg>
            </figure>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          09. BULLWHIP EFFECT: a small wiggle at retail swelling into large
          swings upstream. One real-time signal reaching every tier at once.
          Short-term spikes separated from a structural shift.
                                  [quiz: beyond-averages] [quiz topic]
      ================================================================== */}
      <Slide
        id="bullwhip"
        border
        align="left"
        quizData={quiz["bullwhip"]}
      >
        <Head1 eyebrow="Amplification upstream" signal>
          Mitigating the Bullwhip Effect
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            The bullwhip effect occurs when small fluctuations in retail demand
            cause progressively larger fluctuations upstream.
          </p>
          <figure className="mt-7 w-full max-w-5xl">
            <svg
              role="img"
              aria-label="Four supply chain stages showing small fluctuations in retail demand amplifying into progressively larger fluctuations upstream."
              viewBox="0 0 800 152"
              className="w-full"
              fill="none"
            >
              <title>
                Four supply chain stages showing small fluctuations in retail
                demand amplifying into progressively larger fluctuations
                upstream.
              </title>
              <path
                d="M16 20H784"
                stroke="var(--charcoal)"
                strokeOpacity="0.35"
              />
              <path
                d="M776 15l8 5l-8 5"
                stroke="var(--charcoal)"
                strokeOpacity="0.5"
              />
              {[4, 11, 21, 34].map((amp, p) => {
                const x0 = 16 + p * 198;
                const d = Array.from({ length: 44 })
                  .map((_, i) => {
                    const x = +(x0 + i * 4).toFixed(2);
                    const y = +(80 - amp * Math.sin((i / 43) * Math.PI * 5)).toFixed(2);
                    return `${i === 0 ? "M" : "L"}${x} ${y}`;
                  })
                  .join("");
                return (
                  <g key={amp}>
                    <path
                      d={`M${x0} 80H${x0 + 172}`}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.12"
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
                x="16"
                y="138"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                SMALL FLUCTUATIONS IN RETAIL DEMAND
              </text>
              <text
                {...SVG_LABEL}
                x="784"
                y="138"
                textAnchor="end"
                fill="var(--crimson)"
              >
                LARGER FLUCTUATIONS UPSTREAM
              </text>
            </svg>
          </figure>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              AI algorithms can share real-time demand signals across all tiers
              of the supply network simultaneously.
            </p>
            <svg
              role="img"
              aria-label="A single real-time demand signal broadcast simultaneously across all four tiers of the supply network."
              viewBox="0 0 800 118"
              className="mt-6 w-full max-w-5xl"
              fill="none"
            >
              <title>
                A single real-time demand signal broadcast simultaneously across
                all four tiers of the supply network.
              </title>
              <text {...SVG_LABEL} x="16" y="20" fill="var(--crimson)">
                REAL-TIME DEMAND SIGNALS
              </text>
              <path d="M16 34H784" stroke="var(--crimson)" strokeWidth="2" />
              {[110, 304, 496, 690].map((x, idx) => (
                <g key={x}>
                  {idx < 3 && (
                    <path
                      d={`M${x + 12} 74H${[110, 304, 496, 690][idx + 1] - 12}`}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.2"
                      strokeDasharray="3 4"
                    />
                  )}
                  <path
                    d={`M${x} 34V64`}
                    stroke="var(--crimson)"
                    strokeOpacity="0.7"
                    strokeWidth="1.5"
                  />
                  <path
                    d={`M${x - 4} 58l4 6l4 -6`}
                    stroke="var(--crimson)"
                    strokeWidth="1.5"
                  />
                  <rect
                    x={x - 12}
                    y="64"
                    width="24"
                    height="20"
                    fill="var(--surface)"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.65"
                    strokeWidth="1.5"
                  />
                </g>
              ))}
              <text
                {...SVG_LABEL}
                x="400"
                y="106"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                ALL TIERS OF THE SUPPLY NETWORK | SIMULTANEOUSLY
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <p className={`${DISPLAY} max-w-4xl`}>
              Predictive analytics prevent manufacturers from overreacting to
              short-term spikes by separating noise from structural shifts.
            </p>
            <figure className="mt-6 w-full">
              <svg
                role="img"
                aria-label="Time series separating noisy short-term spikes in charcoal from the underlying crimson step of a structural shift."
                viewBox="0 0 800 112"
                className="w-full"
                fill="none"
              >
                <title>
                  Time series separating noisy short-term spikes in charcoal
                  from the underlying crimson step of a structural shift.
                </title>
                <path
                  d={Array.from({ length: 97 })
                    .map((_, i) => {
                      const x = 16 + i * 8;
                      const base = x < 504 ? 80 : 50;
                      const spike =
                        x === 224 ? -52 : x === 216 || x === 232 ? -22 : 0;
                      const y = +(base + ((i * 37) % 7) * 1.4 - 4 + spike).toFixed(2);
                      return `${i === 0 ? "M" : "L"}${x} ${y}`;
                    })
                    .join("")}
                  stroke="var(--charcoal)"
                  strokeOpacity="0.45"
                  strokeWidth="1.25"
                />
                <path
                  d="M16 80H504V50H784"
                  stroke="var(--crimson)"
                  strokeWidth="2"
                />
                <text
                  {...SVG_LABEL}
                  x="244"
                  y="26"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  SHORT-TERM SPIKES | NOISE
                </text>
                <text
                  {...SVG_LABEL}
                  x="784"
                  y="32"
                  textAnchor="end"
                  fill="var(--crimson)"
                >
                  STRUCTURAL SHIFTS
                </text>
              </svg>
            </figure>
          </div>
        </div>

        <Discussion1>
          How does algorithmic demand visibility reshape the balance of power
          between mega-retailers and tier-two suppliers?
        </Discussion1>
      </Slide>

      {/* ==================================================================
          10. DYNAMIC INVENTORY: a flat safety-stock line against demand,
          its gaps shaded as stockouts and excess. A crimson target that
          follows demand instead. Every echelon balanced at once.
                                                     [quiz: bullwhip]
      ================================================================== */}
      <Slide
        id="dynamic-inventory"
        border
        align="left"
        quizData={quiz["dynamic-inventory"]}
      >
        <Head1 eyebrow="Stock that moves">Dynamic Inventory Optimization</Head1>

        <div className="mt-10 grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <div className={`${MICRO} text-[var(--champagne)]`}>Static</div>
            <p className={`${BODY} mt-4`}>
              Maintaining static safety stock levels leads to either excess
              holding costs or stockouts.
            </p>
            <figure className="mt-6 w-full">
              <svg
                role="img"
                aria-label="Flat static safety stock line against fluctuating demand, creating crimson stockouts when demand exceeds stock and excess holding costs when demand falls below."
                viewBox="0 0 400 156"
                className="w-full"
                fill="none"
              >
                <title>
                  Flat static safety stock line against fluctuating demand,
                  creating crimson stockouts when demand exceeds stock and
                  excess holding costs when demand falls below.
                </title>
                {(() => {
                  const y = (x: number) =>
                    80 - 34 * Math.sin((2 * Math.PI * (x - 16)) / 368);
                  const half = (from: number) =>
                    `M${from} 80` +
                    Array.from({ length: 19 })
                      .map((_, i) => {
                        const x = +(from + (i * 184) / 18).toFixed(2);
                        return `L${x} ${y(x).toFixed(2)}`;
                      })
                      .join("") +
                    `L${from + 184} 80Z`;
                  const curve = Array.from({ length: 37 })
                    .map((_, i) => {
                      const x = +(16 + (i * 368) / 36).toFixed(2);
                      return `${i === 0 ? "M" : "L"}${x} ${y(x).toFixed(2)}`;
                    })
                    .join("");
                  return (
                    <g>
                      <path
                        d={half(16)}
                        fill="var(--crimson)"
                        fillOpacity="0.12"
                      />
                      <path
                        d={half(200)}
                        fill="var(--charcoal)"
                        fillOpacity="0.08"
                      />
                      <path
                        d="M16 80H384"
                        stroke="var(--charcoal)"
                        strokeOpacity="0.7"
                        strokeWidth="2"
                      />
                      <path
                        d={curve}
                        stroke="var(--charcoal)"
                        strokeOpacity="0.5"
                        strokeWidth="1.5"
                      />
                    </g>
                  );
                })()}
                <text
                  {...SVG_LABEL}
                  x="108"
                  y="34"
                  textAnchor="middle"
                  fill="var(--charcoal)"
                  fillOpacity="0.55"
                >
                  DEMAND
                </text>
                <text
                  {...SVG_LABEL}
                  x="108"
                  y="72"
                  textAnchor="middle"
                  fill="var(--crimson)"
                >
                  STOCKOUTS
                </text>
                <text
                  {...SVG_LABEL}
                  x="384"
                  y="70"
                  textAnchor="end"
                  fill="var(--charcoal)"
                  fillOpacity="0.7"
                >
                  STATIC SAFETY STOCK
                </text>
                <text
                  {...SVG_LABEL}
                  x="292"
                  y="142"
                  textAnchor="middle"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  EXCESS HOLDING COSTS
                </text>
              </svg>
            </figure>
          </div>

          <div>
            <div className={`${MICRO} text-[var(--crimson)]`}>Dynamic</div>
            <p className={`${BODY} mt-4`}>
              AI dynamically adjusts optimal inventory targets based on
              real-time demand probabilities and supplier lead times.
            </p>
            <figure className="mt-6 w-full">
              <svg
                role="img"
                aria-label="Crimson optimal inventory targets stepping dynamically above the demand curve in real time."
                viewBox="0 0 400 156"
                className="w-full"
                fill="none"
              >
                <title>
                  Crimson optimal inventory targets stepping dynamically above
                  the demand curve in real time.
                </title>
                {(() => {
                  const y = (x: number) =>
                    80 - 34 * Math.sin((2 * Math.PI * (x - 16)) / 368);
                  const curve = Array.from({ length: 37 })
                    .map((_, i) => {
                      const x = +(16 + (i * 368) / 36).toFixed(2);
                      return `${i === 0 ? "M" : "L"}${x} ${y(x).toFixed(2)}`;
                    })
                    .join("");
                  const target = Array.from({ length: 16 })
                    .map((_, i) => {
                      const x = +(16 + i * 23).toFixed(2);
                      const t = (y(x + 11.5) - 10).toFixed(2);
                      return `${i === 0 ? "M" : "H"}${x}${i === 0 ? ` ${t}` : `V${t}`}`;
                    })
                    .join("");
                  return (
                    <g>
                      <path
                        d={curve}
                        stroke="var(--charcoal)"
                        strokeOpacity="0.5"
                        strokeWidth="1.5"
                      />
                      <path
                        d={`${target}H384`}
                        stroke="var(--crimson)"
                        strokeWidth="2"
                      />
                    </g>
                  );
                })()}
                <text
                  {...SVG_LABEL}
                  x="108"
                  y="22"
                  textAnchor="middle"
                  fill="var(--crimson)"
                >
                  OPTIMAL INVENTORY TARGETS
                </text>
                <text
                  {...SVG_LABEL}
                  x="292"
                  y="142"
                  textAnchor="middle"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  REAL-TIME DEMAND
                </text>
              </svg>
            </figure>
            <Terms
              items={["real-time demand probabilities", "supplier lead times"]}
            />
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${DISPLAY} max-w-4xl`}>
              Multi-echelon inventory optimization models balance stock levels
              across the entire distribution network simultaneously.
            </p>
            <svg
              role="img"
              aria-label="Multi-echelon distribution network with balanced stock level gauges across central, regional, and local nodes."
              viewBox="0 0 800 176"
              className="mt-7 w-full max-w-5xl"
              fill="none"
            >
              <title>
                Multi-echelon distribution network with balanced stock level
                gauges across central, regional, and local nodes.
              </title>
              <text {...SVG_LABEL} x="16" y="20" fill="var(--crimson)">
                STOCK LEVELS | ENTIRE DISTRIBUTION NETWORK
              </text>
              {(() => {
                const root = { x: 60, y: 100 };
                const mid = [56, 100, 144].map((y) => ({ x: 340, y }));
                const leaves = [40, 64, 88, 112, 136, 160].map((y) => ({
                  x: 640,
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
                      strokeOpacity="0.55"
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
                        d={`M${root.x + 48} ${root.y} C 224 ${root.y}, 236 ${m.y}, ${m.x} ${m.y}`}
                        stroke="var(--charcoal)"
                        strokeOpacity="0.25"
                        strokeWidth="1.25"
                      />
                    ))}
                    {leaves.map((l, i) => {
                      const m = mid[Math.min(2, Math.floor(i / 2))];
                      return (
                        <path
                          key={`m-${l.y}`}
                          d={`M${m.x + 48} ${m.y} C 510 ${m.y}, 524 ${l.y}, ${l.x} ${l.y}`}
                          stroke="var(--charcoal)"
                          strokeOpacity="0.25"
                          strokeWidth="1.25"
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
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          11. DEEP LEARNING FOR TIME SERIES: a sequence and its predicted
          continuation. Two related SKUs pulling apart and moving together.
          A fit that re-sets its slope at a structural break.
      ================================================================== */}
      <Slide id="time-series" border align="left">
        <Head1 eyebrow="Under the hood">Deep Learning for Time-Series Data</Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Recurrent Neural Networks and Transformer architectures excel at
            predicting sequential time-series data.
          </p>
          <Terms
            items={["Recurrent Neural Networks", "Transformer architectures"]}
          />
          <figure className="mt-6 w-full max-w-5xl">
            <svg
              role="img"
              aria-label="Bar chart of sequential time-series data in charcoal followed by dashed crimson bars predicting future sequence values."
              viewBox="0 0 800 132"
              className="w-full"
              fill="none"
            >
              <title>
                Bar chart of sequential time-series data in charcoal followed by
                dashed crimson bars predicting future sequence values.
              </title>
              {Array.from({ length: 34 }).map((_, i) => {
                const forecast = i >= 27;
                const h = +(
                  34 +
                  22 * Math.sin(i / 2.2) +
                  ((i * 17) % 9) +
                  i * 0.6
                ).toFixed(2);
                const x = +(16 + i * 22.4).toFixed(2);
                const y = +(94 - h).toFixed(2);
                return (
                  <rect
                    key={i}
                    x={x}
                    y={y}
                    width="13"
                    height={h}
                    fill={forecast ? "var(--surface)" : "var(--charcoal)"}
                    fillOpacity={forecast ? 1 : 0.28}
                    stroke={forecast ? "var(--crimson)" : "none"}
                    strokeWidth={forecast ? 1.5 : 0}
                    strokeDasharray={forecast ? "3 2" : undefined}
                  />
                );
              })}
              <path
                d="M616 10V98"
                stroke="var(--crimson)"
                strokeOpacity="0.45"
                strokeDasharray="3 3"
              />
              <text
                {...SVG_LABEL}
                x="16"
                y="118"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                SEQUENTIAL TIME-SERIES DATA
              </text>
              <text
                {...SVG_LABEL}
                x="784"
                y="118"
                textAnchor="end"
                fill="var(--crimson)"
              >
                PREDICTING
              </text>
            </svg>
          </figure>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              These models can forecast multiple related SKUs simultaneously,
              capturing cannibalization and halo effects between products.
            </p>
            <div className="mt-7 grid max-w-4xl gap-8 md:grid-cols-2 md:gap-12">
              {[
                {
                  label: "Cannibalization",
                  a: "M16 48C126 48 156 48 196 44S280 22 336 18",
                  b: "M16 62C126 62 156 62 196 66S280 86 336 90",
                  yA: 22,
                  yB: 93,
                  desc: "Two related SKUs diverging as one rises and cannibalizes the other.",
                },
                {
                  label: "Halo effects",
                  a: "M16 52C126 52 156 52 196 48S280 22 336 18",
                  b: "M16 84C126 84 156 84 196 80S280 56 336 52",
                  yA: 22,
                  yB: 56,
                  desc: "Two related SKUs rising together through halo effects between products.",
                },
              ].map((panel) => (
                <figure key={panel.label}>
                  <div className={`${MICRO} text-[var(--champagne)]`}>
                    {panel.label}
                  </div>
                  <svg
                    role="img"
                    aria-label={panel.desc}
                    viewBox="0 0 400 112"
                    className="mt-3 w-full"
                    fill="none"
                  >
                    <title>{panel.desc}</title>
                    <path d={panel.a} stroke="var(--crimson)" strokeWidth="2" />
                    <path
                      d={panel.b}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.6"
                      strokeWidth="1.5"
                    />
                    <text {...SVG_LABEL} x="348" y={panel.yA} fill="var(--crimson)">
                      SKU
                    </text>
                    <text
                      {...SVG_LABEL}
                      x="348"
                      y={panel.yB}
                      fill="var(--charcoal)"
                      fillOpacity="0.6"
                    >
                      SKU
                    </text>
                    <path
                      d="M16 102H384"
                      stroke="var(--charcoal)"
                      strokeOpacity="0.15"
                    />
                  </svg>
                </figure>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <p className={`${DISPLAY} max-w-4xl`}>
              Advanced models automatically adjust their parameters when
              structural market breaks occur.
            </p>
            <figure className="mt-6 w-full">
              <svg
                role="img"
                aria-label="Piecewise trend line automatically adjusting its slope at a dashed structural market break."
                viewBox="0 0 800 132"
                className="w-full"
                fill="none"
              >
                <title>
                  Piecewise trend line automatically adjusting its slope at a
                  dashed structural market break.
                </title>
                {Array.from({ length: 39 }).map((_, i) => {
                  const x = 20 + i * 20;
                  const trend =
                    x < 440 ? 96 - x * 0.08 : 60.8 + (x - 440) * 0.12;
                  const y = +(trend + ((i * 29) % 11) - 5).toFixed(2);
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="2.5"
                      fill="var(--charcoal)"
                      fillOpacity="0.4"
                    />
                  );
                })}
                <path
                  d="M440 12V118"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.4"
                  strokeDasharray="3 4"
                />
                <text
                  {...SVG_LABEL}
                  x="454"
                  y="24"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  STRUCTURAL MARKET BREAKS
                </text>
                <text
                  {...SVG_LABEL}
                  x="784"
                  y="118"
                  textAnchor="end"
                  fill="var(--crimson)"
                >
                  ADJUST THEIR PARAMETERS
                </text>
                <path
                  d="M20 94.4L440 60.8L780 101.6"
                  stroke="var(--crimson)"
                  strokeWidth="2"
                />
              </svg>
            </figure>
          </div>
        </div>
      </Slide>

      <PartPlate1
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
          13. ROUTING AT SCALE: six stops beside thousands. Three inputs
          producing routes in seconds. A route re-optimized around a road
          closure and a new order while the vehicle is in transit.
                                                          [quiz topic]
      ================================================================== */}
      <Slide id="routing-at-scale" border align="left">
        <Head1 eyebrow="Routing">Solving Complex Routing at Scale</Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            The Traveling Salesperson Problem becomes exponentially harder with
            thousands of deliveries and dynamic constraints.
          </p>
          <figure className="mt-7 w-full max-w-5xl">
            <svg
              role="img"
              aria-label="A simple six-stop Traveling Salesperson Problem loop contrasted with a dense field of thousands of deliveries where routing becomes exponentially harder."
              viewBox="0 0 800 172"
              className="w-full"
              fill="none"
            >
              <title>
                A simple six-stop Traveling Salesperson Problem loop contrasted
                with a dense field of thousands of deliveries where routing
                becomes exponentially harder.
              </title>
              {(() => {
                const stops = [
                  [34, 40],
                  [114, 22],
                  [174, 70],
                  [144, 124],
                  [64, 132],
                  [22, 88],
                ];
                const loop =
                  stops
                    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y}`)
                    .join("") + "Z";
                return (
                  <g>
                    <path
                      d={loop}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.55"
                      strokeWidth="1.5"
                    />
                    {stops.map(([x, y]) => (
                      <circle
                        key={`${x}-${y}`}
                        cx={x}
                        cy={y}
                        r="4.5"
                        fill="var(--surface)"
                        stroke="var(--charcoal)"
                        strokeOpacity="0.7"
                        strokeWidth="1.5"
                      />
                    ))}
                  </g>
                );
              })()}
              <path
                d="M214 78H330"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <path
                d="M322 72l8 6l-8 6"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <text
                {...SVG_LABEL}
                x="272"
                y="62"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                EXPONENTIALLY
              </text>
              <text
                {...SVG_LABEL}
                x="272"
                y="98"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                HARDER
              </text>
              {Array.from({ length: 340 }).map((_, i) => (
                <circle
                  key={i}
                  cx={(372 + hash(i) * 410).toFixed(2)}
                  cy={(14 + hash(i + 1000) * 118).toFixed(2)}
                  r="1.8"
                  fill="var(--charcoal)"
                  fillOpacity="0.35"
                />
              ))}
              <text
                {...SVG_LABEL}
                x="16"
                y="156"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                TRAVELING SALESPERSON PROBLEM
              </text>
              <text
                {...SVG_LABEL}
                x="784"
                y="156"
                textAnchor="end"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                THOUSANDS OF DELIVERIES
              </text>
            </svg>
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
            <p className={`${DISPLAY} max-w-4xl`}>
              Continuous re-optimization allows fleets to adapt to new orders or
              road closures while vehicles are already in transit.
            </p>
            <svg
              role="img"
              aria-label="A vehicle already in transit dynamically re-optimizing its route around road closures to serve new orders."
              viewBox="0 0 800 148"
              className="mt-6 w-full"
              fill="none"
            >
              <title>
                A vehicle already in transit dynamically re-optimizing its route
                around road closures to serve new orders.
              </title>
              <path
                d="M60 80L220 40L380 40L540 40L740 80"
                stroke="var(--charcoal)"
                strokeOpacity="0.3"
                strokeDasharray="4 5"
              />
              <path
                d="M140 60L220 40L380 40L460 118L540 40L740 80"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              {[
                [60, 80],
                [220, 40],
                [380, 40],
                [540, 40],
                [740, 80],
              ].map(([x, y]) => (
                <circle
                  key={x}
                  cx={x}
                  cy={y}
                  r="5"
                  fill="var(--surface)"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.7"
                  strokeWidth="1.5"
                />
              ))}
              <path
                d="M452 32l16 16M468 32l-16 16"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <text
                {...SVG_LABEL}
                x="460"
                y="20"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                ROAD CLOSURES
              </text>
              <circle cx="460" cy="118" r="6" fill="var(--crimson)" />
              <text {...SVG_LABEL} x="478" y="122" fill="var(--crimson)">
                NEW ORDERS
              </text>
              <rect
                x="132"
                y="52"
                width="16"
                height="16"
                fill="var(--charcoal)"
                fillOpacity="0.85"
              />
              <text
                {...SVG_LABEL}
                x="140"
                y="92"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                IN TRANSIT
              </text>
            </svg>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          14. LAST MILE: the supply chain as segments with the final one
          marked. Two methods enabling two kinds of vehicle. A hub serving
          its near neighbourhood continuously.     [quiz: routing-at-scale]
      ================================================================== */}
      <Slide
        id="last-mile"
        border
        align="left"
        quizData={quiz["last-mile"]}
      >
        <Head1 eyebrow="The final stretch">
          Autonomous Vehicles and Last-Mile Delivery
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            The &quot;last mile&quot; represents the most expensive and
            inefficient segment of the supply chain.
          </p>
          <svg
            role="img"
            aria-label="Five supply chain segments where the final last-mile segment is highlighted as a heavy crimson bar."
            viewBox="0 0 800 78"
            className="mt-7 w-full max-w-5xl"
            fill="none"
          >
            <title>
              Five supply chain segments where the final last-mile segment is
              highlighted as a heavy crimson bar.
            </title>
            <path
              d="M24 28H620"
              stroke="var(--charcoal)"
              strokeOpacity="0.4"
              strokeWidth="2"
            />
            <path d="M620 28H776" stroke="var(--crimson)" strokeWidth="8" />
            {[24, 173, 322, 471, 620, 776].map((x, i) => (
              <circle
                key={x}
                cx={x}
                cy="28"
                r="6"
                fill="var(--surface)"
                stroke={i >= 4 ? "var(--crimson)" : "var(--charcoal)"}
                strokeOpacity={i >= 4 ? 1 : 0.65}
                strokeWidth="2"
              />
            ))}
            <text
              {...SVG_LABEL}
              x="24"
              y="64"
              fill="var(--charcoal)"
              fillOpacity="0.6"
            >
              SUPPLY CHAIN
            </text>
            <text
              {...SVG_LABEL}
              x="698"
              y="64"
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
          <div className="mt-12 grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1fr_25rem] md:gap-14">
            <div>
              <p className={DISPLAY}>
                These technologies promise to reduce labor costs and enable
                hyper-local, continuous delivery networks.
              </p>
              <Steps
                items={[
                  "reduce labor costs",
                  "hyper-local",
                  "continuous delivery networks",
                ]}
                cols="grid-cols-3"
                className="mt-6"
              />
            </div>
            <svg
              role="img"
              aria-label="A central crimson hub radiating spokes to nearby neighborhood delivery points within a dashed hyper-local radius."
              viewBox="0 0 400 228"
              className="w-full"
              fill="none"
            >
              <title>
                A central crimson hub radiating spokes to nearby neighborhood
                delivery points within a dashed hyper-local radius.
              </title>
              <circle
                cx="200"
                cy="102"
                r="82"
                stroke="var(--crimson)"
                strokeOpacity="0.5"
                strokeDasharray="4 6"
              />
              {Array.from({ length: 10 }).map((_, i) => {
                const a = (i / 10) * Math.PI * 2;
                const r = 44 + ((i * 7) % 3) * 12;
                const x = +(200 + r * Math.cos(a)).toFixed(2);
                const y = +(102 + r * Math.sin(a)).toFixed(2);
                return (
                  <g key={i}>
                    <path
                      d={`M200 102L${x} ${y}`}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.28"
                    />
                    <circle
                      cx={x}
                      cy={y}
                      r="4"
                      fill="var(--surface)"
                      stroke="var(--charcoal)"
                      strokeOpacity="0.65"
                      strokeWidth="1.5"
                    />
                  </g>
                );
              })}
              <rect
                x="191"
                y="93"
                width="18"
                height="18"
                fill="var(--crimson)"
              />
              <text
                {...SVG_LABEL}
                x="200"
                y="210"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                HYPER-LOCAL | CONTINUOUS DELIVERY NETWORKS
              </text>
            </svg>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          15. PREDICTIVE MAINTENANCE: evenly spaced service stops. Three
          sensor lanes, one drifting and flagged before its failure. Downtime
          struck against a longer lifespan.                   [quiz topic]
      ================================================================== */}
      <Slide id="predictive-maintenance" border align="left">
        <Head1 eyebrow="Keeping the fleet moving">
          Predictive Maintenance in Fleet Management
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Traditional fleet maintenance relies on fixed schedules based on
            mileage or time.
          </p>
          <svg
            role="img"
            aria-label="Timeline of evenly spaced service stops on fixed schedules based on mileage or time."
            viewBox="0 0 800 80"
            className="mt-6 w-full max-w-5xl"
            fill="none"
          >
            <title>
              Timeline of evenly spaced service stops on fixed schedules based
              on mileage or time.
            </title>
            <text
              {...SVG_LABEL}
              x="16"
              y="20"
              fill="var(--charcoal)"
              fillOpacity="0.6"
            >
              FIXED SCHEDULES
            </text>
            <path d="M16 44H784" stroke="var(--charcoal)" strokeOpacity="0.22" />
            {[80, 240, 400, 560, 720].map((x) => (
              <rect
                key={x}
                x={x - 6}
                y="38"
                width="12"
                height="12"
                fill="var(--charcoal)"
                fillOpacity="0.55"
              />
            ))}
            <text
              {...SVG_LABEL}
              x="784"
              y="70"
              textAnchor="end"
              fill="var(--charcoal)"
              fillOpacity="0.55"
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
            <figure className="mt-6 w-full max-w-5xl">
              <svg
                role="img"
                aria-label="Three IoT sensor streams for engines, brakes, and transmissions where a drift in the brakes stream is flagged in crimson before component failures happen."
                viewBox="0 0 800 176"
                className="w-full"
                fill="none"
              >
                <title>
                  Three IoT sensor streams for engines, brakes, and
                  transmissions where a drift in the brakes stream is flagged in
                  crimson before component failures happen.
                </title>
                {[
                  { y: 34, label: "ENGINES", drift: false },
                  { y: 90, label: "BRAKES", drift: true },
                  { y: 146, label: "TRANSMISSIONS", drift: false },
                ].map((lane, l) => {
                  const pt = (i: number) => {
                    const x = 160 + i * 10;
                    const up =
                      lane.drift && x > 450 ? Math.min(x, 740) - 450 : 0;
                    const y = +(
                      lane.y -
                      up * 0.06 +
                      (((i * 31 + l * 7) % 7) - 3)
                    ).toFixed(2);
                    return [x, y] as const;
                  };
                  const fullPath = Array.from({ length: 63 })
                    .map((_, i) => {
                      const [x, y] = pt(i);
                      return `${i === 0 ? "M" : "L"}${x} ${y}`;
                    })
                    .join("");
                  const crimsonDrift = lane.drift
                    ? Array.from({ length: 16 })
                        .map((_, idx) => {
                          const [x, y] = pt(29 + idx);
                          return `${idx === 0 ? "M" : "L"}${x} ${y}`;
                        })
                        .join("")
                    : "";
                  return (
                    <g key={lane.label}>
                      <text
                        {...SVG_LABEL}
                        x="16"
                        y={lane.y + 3}
                        fill="var(--charcoal)"
                        fillOpacity="0.6"
                      >
                        {lane.label}
                      </text>
                      <path
                        d={fullPath}
                        stroke="var(--charcoal)"
                        strokeOpacity={lane.drift ? 0.45 : 0.35}
                        strokeWidth="1.25"
                      />
                      {lane.drift && (
                        <path
                          d={crimsonDrift}
                          stroke="var(--crimson)"
                          strokeWidth="2"
                        />
                      )}
                    </g>
                  );
                })}
                <circle cx="600" cy="81" r="6" fill="var(--crimson)" />
                <text
                  {...SVG_LABEL}
                  x="590"
                  y="62"
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
                  x="732"
                  y="104"
                  textAnchor="middle"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  COMPONENT FAILURES
                </text>
              </svg>
            </figure>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <p className={`${DISPLAY} max-w-4xl`}>
              This approach minimizes unplanned downtime and extends the
              operational lifespan of expensive capital assets.
            </p>
            <div className="mt-6">
              <Split1
                left="Unplanned downtime"
                right="Operational lifespan"
                strikeLeft
              />
            </div>
          </div>
        </div>
      </Slide>

      <PartPlate1
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
          17. SUPPLIER RISK: an annual audit lane against a continuous
          monitoring lane that flags emerging risks. Unstructured text with
          risk indicators lifted out.                         [quiz topic]
      ================================================================== */}
      <Slide id="supplier-risk" border align="left">
        <Head1 eyebrow="Procurement risk">
          Proactive Supplier Risk Management
        </Head1>

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
            role="img"
            aria-label="Comparison of two sparse annual audits on the top timeline versus continuous monitoring ticks on the bottom timeline that flag emerging supplier risks in crimson."
            viewBox="0 0 800 132"
            className="mt-10 w-full max-w-5xl"
            fill="none"
          >
            <title>
              Comparison of two sparse annual audits on the top timeline versus
              continuous monitoring ticks on the bottom timeline that flag
              emerging supplier risks in crimson.
            </title>
            <text
              {...SVG_LABEL}
              x="16"
              y="20"
              fill="var(--charcoal)"
              fillOpacity="0.6"
            >
              ANNUAL AUDITS
            </text>
            <path d="M16 40H784" stroke="var(--charcoal)" strokeOpacity="0.22" />
            {[48, 752].map((x) => (
              <rect
                key={x}
                x={x - 6}
                y="32"
                width="12"
                height="16"
                fill="var(--charcoal)"
                fillOpacity="0.55"
              />
            ))}

            <text {...SVG_LABEL} x="16" y="82" fill="var(--crimson)">
              CONTINUOUSLY MONITOR
            </text>
            <text
              {...SVG_LABEL}
              x="784"
              y="82"
              textAnchor="end"
              fill="var(--crimson)"
            >
              EMERGING SUPPLIER RISKS
            </text>
            <path
              d="M16 106H784"
              stroke="var(--charcoal)"
              strokeOpacity="0.22"
            />
            {Array.from({ length: 96 }).map((_, i) => {
              const x = 20 + i * 8;
              const flag = i === 36 || i === 62 || i === 80;
              return (
                <path
                  key={i}
                  d={`M${x} ${flag ? 90 : 100}V${flag ? 120 : 112}`}
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
            <p className={`${DISPLAY} max-w-4xl`}>
              Natural Language Processing extracts risk indicators from
              unstructured data sources across multiple languages.
            </p>
            <svg
              role="img"
              aria-label="Three unstructured text documents across multiple languages with crimson risk indicators highlighted and extracted."
              viewBox="0 0 800 116"
              className="mt-7 w-full max-w-4xl"
              fill="none"
            >
              <title>
                Three unstructured text documents across multiple languages with
                crimson risk indicators highlighted and extracted.
              </title>
              {[0, 1, 2].map((doc) => {
                const x0 = 16 + doc * 264;
                return (
                  <g key={doc}>
                    <rect
                      x={x0}
                      y="14"
                      width="240"
                      height="68"
                      fill="var(--charcoal)"
                      fillOpacity="0.02"
                      stroke="var(--charcoal)"
                      strokeOpacity="0.22"
                    />
                    {[0, 1, 2, 3].map((line) => {
                      const hit = line === (doc + 1) % 3;
                      const y = 26 + line * 13;
                      const w1 = 36 + ((doc * 11 + line * 7) % 3) * 10;
                      const w2 = 48 + ((doc * 5 + line * 13) % 3) * 12;
                      const w3 = 36 + ((doc * 7 + line * 3) % 3) * 10;
                      return (
                        <g key={line}>
                          <rect
                            x={x0 + 14}
                            y={y}
                            width={w1}
                            height="5"
                            fill="var(--charcoal)"
                            fillOpacity="0.22"
                          />
                          <rect
                            x={x0 + 22 + w1}
                            y={y}
                            width={w2}
                            height="5"
                            fill={hit ? "var(--crimson)" : "var(--charcoal)"}
                            fillOpacity={hit ? 0.9 : 0.22}
                          />
                          <rect
                            x={x0 + 30 + w1 + w2}
                            y={y}
                            width={w3}
                            height="5"
                            fill="var(--charcoal)"
                            fillOpacity="0.22"
                          />
                        </g>
                      );
                    })}
                  </g>
                );
              })}
              <text
                {...SVG_LABEL}
                x="16"
                y="102"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                UNSTRUCTURED DATA SOURCES | MULTIPLE LANGUAGES
              </text>
              <text
                {...SVG_LABEL}
                x="784"
                y="102"
                textAnchor="end"
                fill="var(--crimson)"
              >
                RISK INDICATORS
              </text>
            </svg>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          18. NLP FOR CONTRACTS AND SPEND: a scatter of unstandardized
          contracts. One PDF yielding three extracted fields. Purchasing data
          sorted into categories with maverick spend and a consolidation.
                                                  [quiz: supplier-risk]
      ================================================================== */}
      <Slide
        id="nlp-contracts"
        border
        align="left"
        quizData={quiz["nlp-contracts"]}
      >
        <Head1 eyebrow="Reading the paperwork">
          NLP for Contract and Spend Analysis
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Large organizations often have thousands of unstandardized supplier
            contracts spread across different regions.
          </p>
          <svg
            role="img"
            aria-label="Unstandardized supplier contract sheets of varying proportions and angles spread across three regional zones."
            viewBox="0 0 800 116"
            className="mt-6 w-full max-w-5xl"
            fill="none"
          >
            <title>
              Unstandardized supplier contract sheets of varying proportions and
              angles spread across three regional zones.
            </title>
            {[268, 532].map((x) => (
              <path
                key={x}
                d={`M${x} 10V86`}
                stroke="var(--charcoal)"
                strokeOpacity="0.22"
                strokeDasharray="3 4"
              />
            ))}
            {Array.from({ length: 24 }).map((_, i) => {
              const region = Math.floor(i / 8);
              const idx = i % 8;
              const col = idx % 4;
              const row = Math.floor(idx / 4);
              const x0 = 26 + region * 266 + col * 56 + (row % 2) * 8;
              const y0 = 12 + row * 38;
              const w = 15 + ((i * 7) % 3) * 2.5;
              const h = +(w * 1.3).toFixed(2);
              const r = ((i * 19) % 21) - 10;
              const cx = +(x0 + w / 2).toFixed(2);
              const cy = +(y0 + h / 2).toFixed(2);
              return (
                <rect
                  key={i}
                  x={x0}
                  y={y0}
                  width={w}
                  height={h}
                  transform={`rotate(${r} ${cx} ${cy})`}
                  fill="var(--surface)"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.45"
                />
              );
            })}
            <text
              {...SVG_LABEL}
              x="16"
              y="104"
              fill="var(--charcoal)"
              fillOpacity="0.6"
            >
              UNSTANDARDIZED SUPPLIER CONTRACTS
            </text>
            <text
              {...SVG_LABEL}
              x="784"
              y="104"
              textAnchor="end"
              fill="var(--charcoal)"
              fillOpacity="0.6"
            >
              DIFFERENT REGIONS
            </text>
          </svg>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              AI extracts key terms, compliance clauses, and pricing structures
              from PDF contracts automatically.
            </p>
            <svg
              role="img"
              aria-label="A PDF contract on the left with three highlighted lines extracted into structured rows for key terms, compliance clauses, and pricing structures."
              viewBox="0 0 800 132"
              className="mt-6 w-full max-w-5xl"
              fill="none"
            >
              <title>
                A PDF contract on the left with three highlighted lines
                extracted into structured rows for key terms, compliance
                clauses, and pricing structures.
              </title>
              <path
                d="M20 10H96L116 30V122H20Z"
                fill="var(--surface)"
                stroke="var(--charcoal)"
                strokeOpacity="0.6"
                strokeWidth="1.5"
              />
              <path
                d="M96 10V30H116"
                stroke="var(--charcoal)"
                strokeOpacity="0.6"
                strokeWidth="1.5"
              />
              {[44, 58, 72, 86, 100].map((y, i) => {
                const isExtracted = i === 0 || i === 2 || i === 4;
                return (
                  <path
                    key={y}
                    d={`M32 ${y}H${i % 2 ? 90 : 104}`}
                    stroke={isExtracted ? "var(--crimson)" : "var(--charcoal)"}
                    strokeOpacity={isExtracted ? 0.85 : 0.25}
                    strokeWidth="3"
                  />
                );
              })}
              <text
                {...SVG_LABEL}
                x="58"
                y="26"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                PDF
              </text>
              {[
                { sy: 44, y: 26, label: "KEY TERMS" },
                { sy: 72, y: 66, label: "COMPLIANCE CLAUSES" },
                { sy: 100, y: 106, label: "PRICING STRUCTURES" },
              ].map((f) => (
                <g key={f.label}>
                  <path
                    d={`M116 ${f.sy} C 216 ${f.sy}, 236 ${f.y}, 338 ${f.y}`}
                    stroke="var(--crimson)"
                    strokeOpacity="0.55"
                    strokeWidth="1.5"
                  />
                  <rect
                    x="338"
                    y={f.y - 12}
                    width="300"
                    height="24"
                    fill="var(--surface)"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.22"
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
                    fillOpacity="0.75"
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
            <p className={`${DISPLAY} max-w-4xl`}>
              Automated spend analysis categorizes purchasing data to identify
              maverick spend and consolidation opportunities.
            </p>
            <svg
              role="img"
              aria-label="Scattered purchasing data categorized into aligned rows, highlighting consolidation opportunities across categories and an outlier maverick spend in crimson."
              viewBox="0 0 800 156"
              className="mt-6 w-full"
              fill="none"
            >
              <title>
                Scattered purchasing data categorized into aligned rows,
                highlighting consolidation opportunities across categories and
                an outlier maverick spend in crimson.
              </title>
              {Array.from({ length: 28 }).map((_, i) => (
                <circle
                  key={i}
                  cx={+(20 + hash(i + 500) * 156).toFixed(2)}
                  cy={+(20 + hash(i + 600) * 92).toFixed(2)}
                  r="3"
                  fill="var(--charcoal)"
                  fillOpacity="0.4"
                />
              ))}
              <text
                {...SVG_LABEL}
                x="16"
                y="142"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                PURCHASING DATA
              </text>
              <path
                d="M204 70H300"
                stroke="var(--charcoal)"
                strokeOpacity="0.4"
                strokeWidth="1.5"
              />
              <path
                d="M293 65l7 5l-7 5"
                stroke="var(--charcoal)"
                strokeOpacity="0.55"
                strokeWidth="1.5"
              />
              {[28, 62, 96].map((y, r) => (
                <g key={y}>
                  <path
                    d={`M324 ${y}H576`}
                    stroke="var(--charcoal)"
                    strokeOpacity="0.15"
                  />
                  {Array.from({ length: 9 - r * 2 }).map((_, k) => (
                    <circle
                      key={k}
                      cx={338 + k * 26}
                      cy={y}
                      r="3"
                      fill="var(--charcoal)"
                      fillOpacity="0.5"
                    />
                  ))}
                </g>
              ))}
              <path
                d="M582 62H590V96H582"
                stroke="var(--charcoal)"
                strokeOpacity="0.55"
                strokeWidth="1.5"
              />
              <text
                {...SVG_LABEL}
                x="604"
                y="82"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                CONSOLIDATION OPPORTUNITIES
              </text>
              <circle cx="442" cy="134" r="5" fill="var(--crimson)" />
              <text {...SVG_LABEL} x="458" y="138" fill="var(--crimson)">
                MAVERICK SPEND
              </text>
            </svg>
          </div>
        </div>

        <Discussion1>
          If an AI flags a critical supplier as high risk based on unverified
          news sentiment, should procurement immediately halt orders?
        </Discussion1>
      </Slide>

      {/* ==================================================================
          19. MULTI-TIER VISIBILITY: company, three tiers, visibility ending
          at tier one. Three tier-one suppliers traced through tier two to
          one tier-three factory, the hidden choke point.
      ================================================================== */}
      <Slide id="multi-tier" border align="left">
        <Head1 eyebrow="Seeing past tier one" signal>
          Multi-Tier Supply Chain Visibility
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Most companies only have visibility into their direct tier-one
            suppliers.
          </p>
          <svg
            role="img"
            aria-label="Multi-tier supply network where direct visibility ends at tier-one suppliers and graph neural networks trace sub-tier links to a hidden choke point at a single tier-three component factory."
            viewBox="0 0 800 248"
            className="mt-7 w-full max-w-5xl"
            fill="none"
          >
            <title>
              Multi-tier supply network where direct visibility ends at tier-one
              suppliers and graph neural networks trace sub-tier links to a
              hidden choke point at a single tier-three component factory.
            </title>
            {(() => {
              const t1 = [60, 106, 152, 198].map((y) => [280, y]);
              const t2 = [48, 88, 128, 168, 208].map((y) => [504, y]);
              const t3 = [64, 128, 192].map((y) => [716, y]);
              const curve = (a: number[], b: number[], rB = 7) =>
                `M${a[0] + 7} ${a[1]} C ${(a[0] + b[0]) / 2} ${a[1]}, ${(a[0] + b[0]) / 2} ${b[1]}, ${b[0] - rB} ${b[1]}`;
              const faint: [number[], number[]][] = [
                [t1[0], t2[0]],
                [t2[0], t3[0]],
                [t1[3], t2[4]],
                [t2[4], t3[2]],
              ];
              const hot: [number[], number[], number][] = [
                [t1[0], t2[1], 7],
                [t1[1], t2[2], 7],
                [t1[2], t2[3], 7],
                [t2[1], t3[1], 10],
                [t2[2], t3[1], 10],
                [t2[3], t3[1], 10],
              ];
              return (
                <g>
                  <rect
                    x="14"
                    y="30"
                    width="354"
                    height="204"
                    fill="var(--charcoal)"
                    fillOpacity="0.035"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.18"
                    strokeDasharray="4 4"
                  />
                  <text
                    {...SVG_LABEL}
                    x="28"
                    y="222"
                    fill="var(--charcoal)"
                    fillOpacity="0.55"
                  >
                    VISIBILITY
                  </text>
                  {[
                    { x: 68, label: "COMPANIES" },
                    { x: 280, label: "TIER-ONE SUPPLIERS" },
                    { x: 504, label: "SUB-TIER" },
                    { x: 716, label: "TIER-THREE" },
                  ].map((h) => (
                    <text
                      key={h.label}
                      {...SVG_LABEL}
                      x={h.x}
                      y="20"
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
                      d={`M76 128 C 178 128, 178 ${y}, ${x - 7} ${y}`}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.4"
                      strokeWidth="1.25"
                    />
                  ))}
                  {faint.map(([a, b]) => (
                    <path
                      key={`f-${a.join()}-${b.join()}`}
                      d={curve(a, b)}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.25"
                      strokeDasharray="3 4"
                    />
                  ))}
                  {hot.map(([a, b, rB]) => (
                    <path
                      key={`h-${a.join()}-${b.join()}`}
                      d={curve(a, b, rB)}
                      stroke="var(--crimson)"
                      strokeOpacity="0.8"
                      strokeWidth="1.5"
                    />
                  ))}
                  <rect
                    x="60"
                    y="120"
                    width="16"
                    height="16"
                    fill="var(--charcoal)"
                    fillOpacity="0.85"
                  />
                  {t1.map(([x, y], idx) => (
                    <circle
                      key={`t1-${y}`}
                      cx={x}
                      cy={y}
                      r="7"
                      fill="var(--surface)"
                      stroke={idx < 3 ? "var(--crimson)" : "var(--charcoal)"}
                      strokeOpacity={idx < 3 ? 0.85 : 0.65}
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
                      strokeOpacity="0.45"
                      strokeDasharray="2 2"
                    />
                  ))}
                  <circle cx="716" cy="128" r="10" fill="var(--crimson)" />
                  <text
                    {...SVG_LABEL}
                    x="716"
                    y="156"
                    textAnchor="middle"
                    fill="var(--crimson)"
                  >
                    HIDDEN CHOKE POINTS
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

      <PartPlate1
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
          21. AI-POWERED DISTRIBUTION CENTER: three lanes kept in step.
          Products ordered together slotted side by side. A loop between
          order profiles and layout rules.
      ================================================================== */}
      <Slide id="distribution-center" border align="left">
        <Head1 eyebrow="Inside the building">
          The AI-Powered Distribution Center
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Modern warehouses use AI to orchestrate the movement of goods,
            robots, and human workers simultaneously.
          </p>
          <svg
            role="img"
            aria-label="Three parallel warehouse movement lanes for goods, robots, and human workers orchestrated simultaneously at crimson synchronization points."
            viewBox="0 0 800 138"
            className="mt-7 w-full max-w-5xl"
            fill="none"
          >
            <title>
              Three parallel warehouse movement lanes for goods, robots, and
              human workers orchestrated simultaneously at crimson
              synchronization points.
            </title>
            {[
              { y: 24, label: "GOODS" },
              { y: 60, label: "ROBOTS" },
              { y: 96, label: "HUMAN WORKERS" },
            ].map((lane, l) => (
              <g key={lane.label}>
                <text
                  {...SVG_LABEL}
                  x="16"
                  y={lane.y + 3}
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  {lane.label}
                </text>
                <path
                  d={`M164 ${lane.y}H784`}
                  stroke="var(--charcoal)"
                  strokeOpacity="0.16"
                />
                {[200, 260, 380, 440, 580, 640, 756].map((baseX, i) => {
                  const x = baseX + ((i * 5 + l * 7) % 3) * 4 - 4;
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
            {[320, 510, 700].map((x) => (
              <g key={x}>
                <path
                  d={`M${x} 12V108`}
                  stroke="var(--crimson)"
                  strokeOpacity="0.7"
                  strokeWidth="1.5"
                />
                {[24, 60, 96].map((y) => (
                  <circle key={y} cx={x} cy={y} r="4.5" fill="var(--crimson)" />
                ))}
              </g>
            ))}
            <text
              {...SVG_LABEL}
              x="784"
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
            <svg
              role="img"
              aria-label="Warehouse slotting grid of thirty-six bays where pairs of products predicted to be ordered together are placed side by side in crimson."
              viewBox="0 0 800 118"
              className="mt-6 w-full max-w-4xl"
              fill="none"
            >
              <title>
                Warehouse slotting grid of thirty-six bays where pairs of
                products predicted to be ordered together are placed side by
                side in crimson.
              </title>
              {Array.from({ length: 36 }).map((_, i) => {
                const col = i % 12;
                const row = Math.floor(i / 12);
                const x = 16 + col * 64.5;
                const y = 12 + row * 26;
                const pair = [13, 14, 27, 28].includes(i);
                return (
                  <rect
                    key={i}
                    x={x}
                    y={y}
                    width="58.5"
                    height="20"
                    fill={pair ? "var(--crimson)" : "var(--surface)"}
                    stroke={pair ? "var(--crimson)" : "var(--charcoal)"}
                    strokeOpacity={pair ? 1 : 0.2}
                  />
                );
              })}
              <text {...SVG_LABEL} x="16" y="106" fill="var(--crimson)">
                ORDERED TOGETHER | IN PROXIMITY
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1fr_25rem] md:gap-14">
            <p className={DISPLAY}>
              Reinforcement learning models continuously refine warehouse layout
              rules based on evolving order profiles.
            </p>
            <svg
              role="img"
              aria-label="Continuous reinforcement learning feedback loop between evolving order profiles at the top and warehouse layout rules at the bottom."
              viewBox="0 0 400 216"
              className="w-full"
              fill="none"
            >
              <title>
                Continuous reinforcement learning feedback loop between evolving
                order profiles at the top and warehouse layout rules at the
                bottom.
              </title>
              <path
                d="M130 102A70 70 0 0 1 270 102"
                stroke="var(--charcoal)"
                strokeOpacity="0.45"
                strokeWidth="1.5"
              />
              <path
                d="M264 93l6 9l6 -9"
                stroke="var(--charcoal)"
                strokeOpacity="0.6"
                strokeWidth="1.5"
              />
              <path
                d="M270 114A70 70 0 0 1 130 114"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <path
                d="M124 123l6 -9l6 9"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <text
                {...SVG_LABEL}
                x="200"
                y="20"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                EVOLVING ORDER PROFILES
              </text>
              <text
                {...SVG_LABEL}
                x="200"
                y="202"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                WAREHOUSE LAYOUT RULES
              </text>
              <text
                {...SVG_LABEL}
                x="200"
                y="111"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.5"
              >
                CONTINUOUSLY
              </text>
            </svg>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          22. COMPUTER VISION FOR QUALITY CONTROL: the three failings of
          manual inspection struck. A conveyor under a vision frame with one
          defect caught. Three checks done in milliseconds.   [quiz topic]
      ================================================================== */}
      <Slide id="cv-quality" border align="left">
        <Head1 eyebrow="Inspection at speed">
          Computer Vision for Quality Control
        </Head1>

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
              role="img"
              aria-label="Overhead computer vision sensor inspecting six evenly spaced products on a high-speed conveyor and framing a microscopic defect in crimson."
              viewBox="0 0 800 154"
              className="mt-6 w-full max-w-5xl"
              fill="none"
            >
              <title>
                Overhead computer vision sensor inspecting six evenly spaced
                products on a high-speed conveyor and framing a microscopic
                defect in crimson.
              </title>
              <path
                d="M422 20H482M452 20V34"
                stroke="var(--charcoal)"
                strokeOpacity="0.65"
                strokeWidth="1.5"
              />
              <path
                d="M452 36L418 72M452 36L486 72"
                stroke="var(--crimson)"
                strokeOpacity="0.4"
                strokeDasharray="3 3"
              />
              <text {...SVG_LABEL} x="498" y="24" fill="var(--crimson)">
                COMPUTER VISION MODELS
              </text>
              <path
                d="M16 108H784M16 116H784"
                stroke="var(--charcoal)"
                strokeOpacity="0.4"
              />
              {Array.from({ length: 19 }).map((_, i) => (
                <circle
                  key={i}
                  cx={32 + i * 40}
                  cy="112"
                  r="3"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.35"
                />
              ))}
              {[80, 204, 328, 452, 576, 700].map((x) => {
                const defect = x === 452;
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
                      strokeWidth={defect ? 2 : 1.25}
                    />
                    {defect && (
                      <circle cx={x + 8} cy="92" r="2.5" fill="var(--crimson)" />
                    )}
                  </g>
                );
              })}
              <path
                d="M418 72H426M418 72V80M486 72H478M486 72V80"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <text
                {...SVG_LABEL}
                x="16"
                y="140"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                HIGH-SPEED CONVEYORS
              </text>
              <text
                {...SVG_LABEL}
                x="784"
                y="140"
                textAnchor="end"
                fill="var(--crimson)"
              >
                SUB-MILLIMETER PRECISION
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <p className={`${DISPLAY} max-w-4xl`}>
              These systems detect microscopic defects, verify labeling
              compliance, and ensure packaging integrity in milliseconds.
            </p>
            <Steps
              items={[
                "microscopic defects",
                "labeling compliance",
                "packaging integrity",
                "in milliseconds",
              ]}
              cols="md:grid-cols-4"
              mark={3}
              className="mt-7 max-w-4xl"
            />
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          23. COLLABORATIVE ROBOTICS: replacement struck against working
          alongside. Robot and picker lanes meeting at hand-offs. Strain
          down and efficiency up.                        [quiz: cv-quality]
      ================================================================== */}
      <Slide id="cobots" border align="left" quizData={quiz["cobots"]}>
        <Head1 eyebrow="Working side by side">
          Collaborative Robotics and Human Synergy
        </Head1>

        <div className="w-full">
          <div className="mt-10 w-full max-w-5xl">
            <p className={`${BODY} max-w-4xl`}>
              Cobots are designed to work safely alongside human warehouse
              associates rather than replacing them entirely.
            </p>
            <div className="mt-6">
              <Split1
                left="Replacing them entirely"
                right="Alongside human warehouse associates"
                strikeLeft
              />
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              AI coordinates the hand-off between autonomous mobile robots and
              human pickers to maximize throughput.
            </p>
            <svg
              role="img"
              aria-label="Parallel lanes for autonomous mobile robots and human pickers connected by three synchronized crimson hand-off transfers that maximize throughput."
              viewBox="0 0 800 136"
              className="mt-6 w-full max-w-5xl"
              fill="none"
            >
              <title>
                Parallel lanes for autonomous mobile robots and human pickers
                connected by three synchronized crimson hand-off transfers that
                maximize throughput.
              </title>
              <text
                {...SVG_LABEL}
                x="16"
                y="43"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                AUTONOMOUS MOBILE ROBOTS
              </text>
              <text
                {...SVG_LABEL}
                x="16"
                y="101"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                HUMAN PICKERS
              </text>
              <path
                d="M236 40H672M236 98H672"
                stroke="var(--charcoal)"
                strokeOpacity="0.3"
              />
              <path
                d="M664 35l8 5l-8 5M664 93l8 5l-8 5"
                stroke="var(--charcoal)"
                strokeOpacity="0.5"
              />
              {[320, 460, 600].map((x) => (
                <g key={x}>
                  <rect
                    x={x - 10}
                    y="28"
                    width="20"
                    height="9"
                    fill="var(--surface)"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.65"
                  />
                  <circle cx={x - 5} cy="40" r="2.5" fill="var(--charcoal)" />
                  <circle cx={x + 5} cy="40" r="2.5" fill="var(--charcoal)" />
                  <path
                    d={`M${x} 46V86`}
                    stroke="var(--crimson)"
                    strokeWidth="2"
                  />
                  <path
                    d={`M${x - 4} 80l4 6l4-6`}
                    stroke="var(--crimson)"
                    strokeWidth="1.8"
                  />
                  <circle
                    cx={x}
                    cy="98"
                    r="5.5"
                    fill="var(--surface)"
                    stroke="var(--crimson)"
                    strokeWidth="2"
                  />
                </g>
              ))}
              <text
                {...SVG_LABEL}
                x="472"
                y="72"
                fill="var(--crimson)"
              >
                HAND-OFF
              </text>
              <text
                {...SVG_LABEL}
                x="784"
                y="72"
                textAnchor="end"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                THROUGHPUT
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <p className={`${DISPLAY} max-w-4xl`}>
              Wearable devices and algorithmic task assignment reduce physical
              strain on workers while improving efficiency.
            </p>
            <div
              aria-hidden
              className="mt-7 grid max-w-md grid-cols-2 border-y border-[var(--charcoal)]/15"
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
            <Terms
              items={["wearable devices", "algorithmic task assignment"]}
            />
          </div>
        </div>

        <Discussion1>
          Does algorithmic task assignment turn human warehouse workers into
          mechanical extensions of the AI, and what are the ethical
          implications?
        </Discussion1>
      </Slide>

      {/* ==================================================================
          24. DIGITAL TWINS: a physical floor plan and its virtual mirror
          joined by real-time IoT data, the same bottleneck in both, the twin
          adding its predicted impact.                        [quiz topic]
      ================================================================== */}
      <Slide id="digital-twins" border align="left">
        <Head1 eyebrow="Test before you change">
          Digital Twins for Facility Layouts
        </Head1>

        <div className="w-full">
          <p className={`${LEAD} mt-9 max-w-4xl`}>
            A digital twin is a virtual simulation of a physical warehouse or
            factory.
          </p>
          <svg
            role="img"
            aria-label="Physical warehouse floor plan connected by real-time IoT data to its virtual simulation mirror, isolating aisle bottlenecks before layout changes."
            viewBox="0 0 800 228"
            className="mt-8 w-full max-w-5xl"
            fill="none"
          >
            <title>
              Physical warehouse floor plan connected by real-time IoT data to
              its virtual simulation mirror, isolating aisle bottlenecks before
              layout changes.
            </title>
            {[
              { x0: 16, label: "PHYSICAL WAREHOUSE", virtual: false },
              { x0: 504, label: "VIRTUAL SIMULATION", virtual: true },
            ].map((plan) => {
              const tone = plan.virtual ? "var(--crimson)" : "var(--charcoal)";
              const dash = plan.virtual ? "4 3" : undefined;
              const bx = plan.x0 + 183.5;
              return (
                <g key={plan.label}>
                  <text
                    {...SVG_LABEL}
                    x={plan.x0 + 140}
                    y="18"
                    textAnchor="middle"
                    fill={tone}
                    fillOpacity={plan.virtual ? 1 : 0.65}
                  >
                    {plan.label}
                  </text>
                  <rect
                    x={plan.x0}
                    y="30"
                    width="280"
                    height="140"
                    stroke={tone}
                    strokeOpacity={plan.virtual ? 0.7 : 0.55}
                    strokeDasharray={dash}
                  />
                  {[46, 76, 122, 148].map((y) =>
                    [18, 105, 192].map((x) => (
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
                    [-5, -3],
                    [4, -3],
                    [-2, 3],
                    [5, 2],
                    [0, 0],
                  ].map(([dx, dy], k) => (
                    <circle
                      key={k}
                      cx={bx + dx}
                      cy={105 + dy}
                      r="2.2"
                      fill="var(--crimson)"
                    />
                  ))}
                  {plan.virtual && (
                    <circle
                      cx={bx}
                      cy="105"
                      r="12"
                      stroke="var(--crimson)"
                      strokeDasharray="2 3"
                    />
                  )}
                  <path
                    d={`M${bx} ${plan.virtual ? 119 : 112}V194`}
                    stroke="var(--crimson)"
                    strokeOpacity="0.45"
                  />
                  <text
                    {...SVG_LABEL}
                    x={bx}
                    y="210"
                    textAnchor="middle"
                    fill="var(--crimson)"
                  >
                    BOTTLENECKS
                  </text>
                </g>
              );
            })}
            <path d="M312 100H488" stroke="var(--crimson)" strokeWidth="2" />
            <path d="M480 94l8 6l-8 6" stroke="var(--crimson)" strokeWidth="2" />
            <text
              {...SVG_LABEL}
              x="400"
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
            <p className={`${BODY} max-w-4xl`}>
              Operations managers use these AI-driven simulations to test new
              layouts and processes without disrupting actual operations.
            </p>
            <div className="mt-6">
              <Split1
                left="Disrupting actual operations"
                right="Test new layouts and processes"
                strikeLeft
              />
            </div>
          </div>
        </div>

        <div className="w-full">
          <p className={`${DISPLAY} mt-12 max-w-4xl`}>
            The twin ingests real-time IoT data to accurately mirror the current
            state and predict the impact of bottlenecks.
          </p>
        </div>
      </Slide>

      <PartPlate1
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
          26. CARBON FOOTPRINT: total emissions as one bar, supply chains
          taking most of it. Routing objective widened to fuel. Sourcing
          scenarios compared on carbon impact before the decision.
      ================================================================== */}
      <Slide id="carbon-footprint" border align="left">
        <Head1 eyebrow="Emissions">Optimizing the Carbon Footprint</Head1>

        <div className="w-full">
          <p className={`${LEAD} mt-9 max-w-4xl`}>
            Supply chains account for the vast majority of a modern
            corporation&apos;s total carbon emissions.
          </p>
          <figure className="mt-7 w-full max-w-4xl">
            <svg
              role="img"
              aria-label="Proportion bar showing supply chains accounting for the vast majority of a modern corporation's total carbon emissions."
              viewBox="0 0 800 84"
              className="w-full"
              fill="none"
            >
              <title>
                Proportion bar showing supply chains accounting for the vast
                majority of a modern corporation&apos;s total carbon emissions.
              </title>
              <text
                {...SVG_LABEL}
                x="16"
                y="20"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                TOTAL CARBON EMISSIONS
              </text>
              <rect
                x="16"
                y="32"
                width="768"
                height="36"
                stroke="var(--charcoal)"
                strokeOpacity="0.25"
              />
              <rect
                x="16"
                y="32"
                width="630"
                height="36"
                fill="var(--crimson)"
              />
              <rect
                x="646"
                y="32"
                width="138"
                height="36"
                fill="var(--charcoal)"
                fillOpacity="0.1"
              />
              <text
                {...SVG_LABEL}
                x="32"
                y="54"
                fill="var(--surface)"
              >
                SUPPLY CHAINS
              </text>
            </svg>
          </figure>
        </div>

        <div className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Route optimization algorithms explicitly minimize fuel consumption
              rather than just delivery time.
            </p>
            <div aria-hidden className="mt-6 max-w-3xl">
              <Split1 left="Just delivery time" right="Fuel consumption" />
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <p className={`${DISPLAY} max-w-4xl`}>
              AI models help procurement teams evaluate the carbon impact of
              different sourcing scenarios before making purchasing decisions.
            </p>
            <figure className="mt-7 w-full max-w-4xl">
              <svg
                role="img"
                aria-label="Comparison of three sourcing scenarios evaluated by carbon impact before making purchasing decisions, highlighting the lowest-carbon option in crimson."
                viewBox="0 0 800 136"
                className="w-full"
                fill="none"
              >
                <title>
                  Comparison of three sourcing scenarios evaluated by carbon
                  impact before making purchasing decisions, highlighting the
                  lowest-carbon option in crimson.
                </title>
                <text
                  {...SVG_LABEL}
                  x="16"
                  y="20"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  SOURCING SCENARIOS
                </text>
                <text
                  {...SVG_LABEL}
                  x="220"
                  y="20"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  CARBON IMPACT
                </text>
                <path
                  d="M16 30H784"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.18"
                />
                {[
                  { num: "01", w: 440, pick: false, y: 48 },
                  { num: "02", w: 204, pick: true, y: 74 },
                  { num: "03", w: 328, pick: false, y: 100 },
                ].map((s) => (
                  <g key={s.num}>
                    <text
                      {...SVG_LABEL}
                      x="16"
                      y={s.y + 9}
                      fill={s.pick ? "var(--crimson)" : "var(--champagne)"}
                    >
                      {s.num}
                    </text>
                    <rect
                      x="220"
                      y={s.y}
                      width={s.w}
                      height="12"
                      fill={s.pick ? "var(--crimson)" : "var(--charcoal)"}
                      fillOpacity={s.pick ? 1 : 0.25}
                    />
                  </g>
                ))}
                <text
                  {...SVG_LABEL}
                  x="784"
                  y="83"
                  textAnchor="end"
                  fill="var(--crimson)"
                >
                  BEFORE MAKING PURCHASING DECISIONS
                </text>
              </svg>
            </figure>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          27. REVERSE LOGISTICS: returned goods assessed for condition and
          routed three ways. Forecast return volumes with capacity set to
          meet them.                                          [quiz topic]
      ================================================================== */}
      <Slide id="reverse-logistics" border align="left">
        <Head1 eyebrow="Goods coming back">
          AI in Reverse Logistics and Returns
        </Head1>

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
              role="img"
              aria-label="Returned goods inspected inside a crimson computer vision reticle to assess condition and routed into restocked, refurbished, or recycled streams."
              viewBox="0 0 800 148"
              className="mt-6 w-full max-w-5xl"
              fill="none"
            >
              <title>
                Returned goods inspected inside a crimson computer vision
                reticle to assess condition and routed into restocked,
                refurbished, or recycled streams.
              </title>
              {[0, 1, 2].map((i) => (
                <rect
                  key={i}
                  x={24 + i * 32}
                  y={60 - (i % 2) * 8}
                  width="24"
                  height="24"
                  fill="var(--surface)"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.55"
                />
              ))}
              <text
                {...SVG_LABEL}
                x="24"
                y="116"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                RETURNED GOODS
              </text>
              <path
                d="M136 72H276"
                stroke="var(--charcoal)"
                strokeOpacity="0.35"
              />
              <path
                d="M269 67l7 5l-7 5"
                stroke="var(--charcoal)"
                strokeOpacity="0.5"
              />
              <path
                d="M292 52H302M292 52V62M348 52H338M348 52V62M292 92H302M292 92V82M348 92H338M348 92V82"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <rect
                x="308"
                y="60"
                width="24"
                height="24"
                fill="var(--surface)"
                stroke="var(--charcoal)"
                strokeOpacity="0.55"
              />
              <text
                {...SVG_LABEL}
                x="320"
                y="116"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                CONDITION
              </text>
              {[
                { y: 26, label: "RESTOCKED" },
                { y: 72, label: "REFURBISHED" },
                { y: 118, label: "RECYCLED" },
              ].map((b) => (
                <g key={b.label}>
                  <path
                    d={`M360 72 C 448 72, 472 ${b.y}, 584 ${b.y}`}
                    stroke="var(--crimson)"
                    strokeOpacity="0.55"
                  />
                  <rect
                    x="584"
                    y={b.y - 6}
                    width="12"
                    height="12"
                    fill="var(--crimson)"
                  />
                  <text
                    {...SVG_LABEL}
                    x="608"
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
            <p className={`${DISPLAY} max-w-4xl`}>
              Predictive models anticipate return volumes based on product
              characteristics and seasonal trends, optimizing reverse network
              capacity.
            </p>
            <figure className="mt-7 w-full">
              <svg
                role="img"
                aria-label="Bar chart of historical and forecasted return volumes paired with a stepped crimson line showing optimized reverse network capacity."
                viewBox="0 0 800 140"
                className="w-full"
                fill="none"
              >
                <title>
                  Bar chart of historical and forecasted return volumes paired
                  with a stepped crimson line showing optimized reverse network
                  capacity.
                </title>
                {Array.from({ length: 24 }).map((_, i) => {
                  const h = Number(
                    (
                      30 +
                      34 * Math.max(0, Math.sin((i / 23) * Math.PI * 2 - 0.6)) +
                      ((i * 13) % 7)
                    ).toFixed(2),
                  );
                  const forecast = i >= 18;
                  return (
                    <rect
                      key={i}
                      x={24 + i * 32}
                      y={Number((102 - h).toFixed(2))}
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
                  d={
                    Array.from({ length: 24 })
                      .map((_, i) => {
                        const h =
                          30 +
                          34 *
                            Math.max(
                              0,
                              Math.sin((i / 23) * Math.PI * 2 - 0.6),
                            ) +
                          ((i * 13) % 7);
                        const y = (102 - h - 8).toFixed(1);
                        const x = 20 + i * 32;
                        return `${i === 0 ? "M" : "H"}${x}${i === 0 ? ` ${y}` : `V${y}`}`;
                      })
                      .join("") + "H780"
                  }
                  stroke="var(--crimson)"
                  strokeWidth="2"
                />
                <text
                  {...SVG_LABEL}
                  x="24"
                  y="124"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  RETURN VOLUMES
                </text>
                <text
                  {...SVG_LABEL}
                  x="780"
                  y="124"
                  textAnchor="end"
                  fill="var(--crimson)"
                >
                  REVERSE NETWORK CAPACITY
                </text>
              </svg>
            </figure>
            <Terms items={["product characteristics", "seasonal trends"]} />
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          28. WASTE REDUCTION: production against demand, the excess shaded
          as overproduction. The same pair under precision forecasting with
          little left unsold. Spoilage struck.   [quiz: reverse-logistics]
      ================================================================== */}
      <Slide
        id="waste-reduction"
        border
        align="left"
        quizData={quiz["waste-reduction"]}
      >
        <Head1 eyebrow="Less left over">
          Waste Reduction via Precision Forecasting
        </Head1>

        <div className="mt-10 grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-14">
          {[
            {
              line: "Overproduction in manufacturing leads to significant material waste and energy consumption.",
              kicker: "MANUFACTURING",
              kickerTone: "var(--champagne)",
              excessWidth: 100,
              excessLabel: "OVERPRODUCTION",
              aria: "Manufacturing production bar exceeding demand by a wide crimson-shaded overproduction margin.",
              terms: ["material waste", "energy consumption"],
            },
            {
              line: "Precision demand forecasting directly reduces the amount of unsold inventory that ends up in landfills.",
              kicker: "PRECISION DEMAND FORECASTING",
              kickerTone: "var(--crimson)",
              excessWidth: 22,
              excessLabel: "UNSOLD INVENTORY",
              aria: "Precision demand forecasting aligning production closely with demand, leaving only a thin sliver of unsold inventory.",
              terms: ["landfills"],
            },
          ].map((panel) => (
            <div key={panel.excessLabel}>
              <p className={BODY}>{panel.line}</p>
              <figure className="mt-6 w-full">
                <svg
                  role="img"
                  aria-label={panel.aria}
                  viewBox="0 0 400 124"
                  className="w-full"
                  fill="none"
                >
                  <title>{panel.aria}</title>
                  <text
                    {...SVG_LABEL}
                    x="16"
                    y="20"
                    fill={panel.kickerTone}
                  >
                    {panel.kicker}
                  </text>
                  <text
                    {...SVG_LABEL}
                    x="16"
                    y="52"
                    fill="var(--charcoal)"
                    fillOpacity="0.6"
                  >
                    PRODUCTION
                  </text>
                  <rect
                    x="116"
                    y="38"
                    width="148"
                    height="18"
                    fill="var(--charcoal)"
                    fillOpacity="0.3"
                  />
                  <rect
                    x="264"
                    y="38"
                    width={panel.excessWidth}
                    height="18"
                    fill="var(--crimson)"
                    fillOpacity="0.22"
                    stroke="var(--crimson)"
                    strokeWidth="1.5"
                  />
                  <text
                    {...SVG_LABEL}
                    x="16"
                    y="82"
                    fill="var(--charcoal)"
                    fillOpacity="0.6"
                  >
                    DEMAND
                  </text>
                  <rect
                    x="116"
                    y="68"
                    width="148"
                    height="18"
                    fill="var(--charcoal)"
                    fillOpacity="0.3"
                  />
                  <text
                    {...SVG_LABEL}
                    x={264 + panel.excessWidth}
                    y="108"
                    textAnchor="end"
                    fill="var(--crimson)"
                  >
                    {panel.excessLabel}
                  </text>
                </svg>
              </figure>
              <Terms items={panel.terms} />
            </div>
          ))}
        </div>

        <div className="w-full">
          <div className="mt-14 w-full max-w-5xl">
            <p className={`${DISPLAY} max-w-4xl`}>
              In the food and beverage industry, AI tracking algorithms minimize
              spoilage by optimizing the flow of perishable goods.
            </p>
            <div className="mt-6">
              <Split1
                left="Spoilage"
                right="Flow of perishable goods"
                strikeLeft
              />
            </div>
          </div>
        </div>
      </Slide>

      <PartPlate1
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
          30. BLACK BOX: inputs vanishing into an opaque model that emits a
          recommendation. Planners' hesitation. Explainable AI as the bridge
          between operators and systems.                      [quiz topic]
      ================================================================== */}
      <Slide id="black-box" border align="left">
        <Head1 eyebrow="Trust" signal>
          The Black Box Problem in Operations
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Deep learning models often lack transparency in how they arrive at
            specific operational recommendations.
          </p>
          <svg
            role="img"
            aria-label="Multiple input streams converging into an opaque charcoal deep learning block that emits a single crimson operational recommendation without showing internal logic."
            viewBox="0 0 800 142"
            className="mt-7 w-full max-w-5xl"
            fill="none"
          >
            <title>
              Multiple input streams converging into an opaque charcoal deep
              learning block that emits a single crimson operational
              recommendation without showing internal logic.
            </title>
            {[20, 50, 80, 110].map((y) => (
              <path
                key={y}
                d={`M24 ${y} C 160 ${y}, 210 65, 310 65`}
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
              y="128"
              textAnchor="middle"
              fill="var(--charcoal)"
              fillOpacity="0.6"
            >
              DEEP LEARNING MODELS
            </text>
            <path d="M490 65H576" stroke="var(--charcoal)" strokeOpacity="0.45" />
            <path
              d="M569 60l7 5l-7 5"
              stroke="var(--charcoal)"
              strokeOpacity="0.6"
            />
            <rect x="578" y="57" width="16" height="16" fill="var(--crimson)" />
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
            <p className={`${DISPLAY} max-w-4xl`}>
              Explainable AI techniques are critical for building trust between
              human operators and algorithmic systems.
            </p>
            <svg
              role="img"
              aria-label="Crimson explainable AI and trust bridge connecting human operators on the left to algorithmic systems on the right."
              viewBox="0 0 800 84"
              className="mt-6 w-full"
              fill="none"
            >
              <title>
                Crimson explainable AI and trust bridge connecting human
                operators on the left to algorithmic systems on the right.
              </title>
              <circle
                cx="84"
                cy="34"
                r="10"
                fill="var(--surface)"
                stroke="var(--charcoal)"
                strokeOpacity="0.7"
                strokeWidth="1.5"
              />
              <text
                {...SVG_LABEL}
                x="84"
                y="66"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                HUMAN OPERATORS
              </text>
              <rect
                x="706"
                y="24"
                width="20"
                height="20"
                fill="var(--charcoal)"
                fillOpacity="0.85"
              />
              <text
                {...SVG_LABEL}
                x="716"
                y="66"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.65"
              >
                ALGORITHMIC SYSTEMS
              </text>
              <path d="M94 34H706" stroke="var(--crimson)" strokeWidth="2" />
              <text
                {...SVG_LABEL}
                x="400"
                y="20"
                textAnchor="middle"
                fill="var(--crimson)"
              >
                EXPLAINABLE AI | TRUST
              </text>
            </svg>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          31. DATA SILOS AND LEGACY SYSTEMS: an ERP that cannot reach the
          AI platform. Messy records cleaned into rows. The same gap closed
          by a middleware layer.                          [quiz: black-box]
      ================================================================== */}
      <Slide
        id="legacy-systems"
        border
        align="left"
        quizData={quiz["legacy-systems"]}
      >
        <Head1 eyebrow="Plumbing first">
          Overcoming Data Silos and Legacy Systems
        </Head1>

        <div className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Many organizations rely on decades-old ERP systems that cannot
            integrate easily with modern AI platforms.
          </p>
          <svg
            role="img"
            aria-label="Decades-old ERP systems separated from modern AI platforms by a broken dashed link marked with a crimson cross."
            viewBox="0 0 800 72"
            className="mt-6 w-full max-w-5xl"
            fill="none"
          >
            <title>
              Decades-old ERP systems separated from modern AI platforms by a
              broken dashed link marked with a crimson cross.
            </title>
            <rect
              x="16"
              y="14"
              width="230"
              height="44"
              stroke="var(--charcoal)"
              strokeOpacity="0.5"
            />
            <text
              {...SVG_LABEL}
              x="131"
              y="40"
              textAnchor="middle"
              fill="var(--charcoal)"
              fillOpacity="0.7"
            >
              DECADES-OLD ERP SYSTEMS
            </text>
            <rect
              x="554"
              y="14"
              width="230"
              height="44"
              stroke="var(--charcoal)"
              strokeOpacity="0.5"
            />
            <text
              {...SVG_LABEL}
              x="669"
              y="40"
              textAnchor="middle"
              fill="var(--charcoal)"
              fillOpacity="0.7"
            >
              MODERN AI PLATFORMS
            </text>
            <path
              d="M246 36H376M424 36H554"
              stroke="var(--charcoal)"
              strokeOpacity="0.35"
              strokeDasharray="4 4"
            />
            <path
              d="M390 26l20 20M410 26l-20 20"
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
            <svg
              role="img"
              aria-label="Fragmented, misaligned supply chain records on the left transformed into clean and standardized tabular rows on the right."
              viewBox="0 0 800 124"
              className="mt-6 w-full max-w-4xl"
              fill="none"
            >
              <title>
                Fragmented, misaligned supply chain records on the left
                transformed into clean and standardized tabular rows on the
                right.
              </title>
              {[
                [24, 190],
                [0, 128],
                [64, 210],
                [14, 96],
                [42, 172],
              ].map(([offset, width], i) => (
                <rect
                  key={i}
                  x={16 + offset}
                  y={16 + i * 15}
                  width={width}
                  height="7"
                  fill="var(--charcoal)"
                  fillOpacity="0.25"
                />
              ))}
              <path
                d="M356 50H424"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <path
                d="M416 44l8 6l-8 6"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              {[0, 1, 2, 3, 4].map((i) => {
                const y = 16 + i * 15;
                return (
                  <g key={i}>
                    <rect
                      x="468"
                      y={y}
                      width="72"
                      height="7"
                      fill="var(--crimson)"
                      fillOpacity="0.75"
                    />
                    <rect
                      x="546"
                      y={y}
                      width="148"
                      height="7"
                      fill="var(--charcoal)"
                      fillOpacity="0.25"
                    />
                    <rect
                      x="700"
                      y={y}
                      width="84"
                      height="7"
                      fill="var(--charcoal)"
                      fillOpacity="0.15"
                    />
                  </g>
                );
              })}
              <text
                {...SVG_LABEL}
                x="16"
                y="108"
                fill="var(--charcoal)"
                fillOpacity="0.6"
              >
                SUPPLY CHAIN RECORDS
              </text>
              <text
                {...SVG_LABEL}
                x="468"
                y="108"
                fill="var(--crimson)"
              >
                CLEAN AND STANDARDIZE
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <p className={`${DISPLAY} max-w-4xl`}>
              Successful implementations often require a middleware layer to
              bridge the gap between legacy databases and cloud-based AI.
            </p>
            <svg
              role="img"
              aria-label="A crimson middleware layer bridging legacy databases on the left and cloud-based AI on the right."
              viewBox="0 0 800 72"
              className="mt-6 w-full"
              fill="none"
            >
              <title>
                A crimson middleware layer bridging legacy databases on the left
                and cloud-based AI on the right.
              </title>
              <rect
                x="16"
                y="14"
                width="220"
                height="44"
                stroke="var(--charcoal)"
                strokeOpacity="0.5"
              />
              <text
                {...SVG_LABEL}
                x="126"
                y="40"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.7"
              >
                LEGACY DATABASES
              </text>
              <rect x="290" y="14" width="220" height="44" fill="var(--crimson)" />
              <text
                {...SVG_LABEL}
                x="400"
                y="40"
                textAnchor="middle"
                fill="var(--surface)"
              >
                MIDDLEWARE LAYER
              </text>
              <rect
                x="564"
                y="14"
                width="220"
                height="44"
                stroke="var(--charcoal)"
                strokeOpacity="0.5"
              />
              <text
                {...SVG_LABEL}
                x="674"
                y="40"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.7"
              >
                CLOUD-BASED AI
              </text>
              <path
                d="M236 36H290M510 36H564"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          32. CYBERSECURITY: exposure rising as networks connect. One
          anomalous burst caught in steady traffic. An adversarial attack
          aimed at the model itself.
      ================================================================== */}
      <Slide id="cybersecurity" border align="left">
        <Head1 eyebrow="Connected and exposed">
          Cybersecurity in Connected Networks
        </Head1>

        <div className="w-full">
          <div className="mt-10 grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1fr_24rem] md:gap-14">
            <p className={BODY}>
              As supply chains become more interconnected and automated, their
              vulnerability to cyberattacks increases exponentially.
            </p>
            <figure className="w-full">
              <svg
                role="img"
                aria-label="Exponentially rising crimson curve showing vulnerability increasing as supply chains become more interconnected and automated."
                viewBox="0 0 400 200"
                className="w-full"
                fill="none"
              >
                <title>
                  Exponentially rising crimson curve showing vulnerability
                  increasing as supply chains become more interconnected and
                  automated.
                </title>
                <path
                  d="M28 28V160H380"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.35"
                />
                <path
                  d={Array.from({ length: 36 })
                    .map((_, i) => {
                      const x = 28 + i * 10;
                      const y = 158 - 3 * (Math.exp((i / 35) * 3.8) - 1);
                      return `${i === 0 ? "M" : "L"}${x} ${y.toFixed(1)}`;
                    })
                    .join("")}
                  stroke="var(--crimson)"
                  strokeWidth="2"
                />
                <text
                  {...SVG_LABEL}
                  x="40"
                  y="22"
                  fill="var(--crimson)"
                >
                  VULNERABILITY
                </text>
                <text
                  {...SVG_LABEL}
                  x="380"
                  y="182"
                  textAnchor="end"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                >
                  INTERCONNECTED | AUTOMATED
                </text>
              </svg>
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
              role="img"
              aria-label="Steady network traffic waveform with a sharp crimson burst circled as anomalous network traffic."
              viewBox="0 0 800 112"
              className="mt-6 w-full max-w-5xl"
              fill="none"
            >
              <title>
                Steady network traffic waveform with a sharp crimson burst
                circled as anomalous network traffic.
              </title>
              <path d="M24 58H776" stroke="var(--charcoal)" strokeOpacity="0.15" />
              {Array.from({ length: 95 }).map((_, i) => {
                const x = 24 + i * 8;
                const burst = i >= 56 && i <= 60;
                const h = burst ? 20 + ((i * 5) % 3) * 5 : 3 + ((i * 7) % 5);
                return (
                  <path
                    key={i}
                    d={`M${x} ${58 - h}V${58 + h}`}
                    stroke={burst ? "var(--crimson)" : "var(--charcoal)"}
                    strokeOpacity={burst ? 1 : 0.35}
                    strokeWidth={burst ? 2 : 1}
                  />
                );
              })}
              <circle
                cx="488"
                cy="58"
                r="32"
                stroke="var(--crimson)"
                strokeDasharray="3 3"
              />
              <text
                {...SVG_LABEL}
                x="532"
                y="24"
                fill="var(--crimson)"
              >
                ANOMALOUS NETWORK TRAFFIC
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <p className={`${DISPLAY} max-w-4xl`}>
              However, the AI models themselves can be targeted by adversarial
              attacks designed to manipulate forecasting or routing data.
            </p>
            <svg
              role="img"
              aria-label="Adversarial attacks striking the AI models block and distorting downstream forecasting and routing data."
              viewBox="0 0 800 116"
              className="mt-6 w-full"
              fill="none"
            >
              <title>
                Adversarial attacks striking the AI models block and distorting
                downstream forecasting and routing data.
              </title>
              <text {...SVG_LABEL} x="16" y="61" fill="var(--crimson)">
                ADVERSARIAL ATTACKS
              </text>
              <path
                d="M188 58H308"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <path
                d="M300 52l8 6l-8 6"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <rect
                x="310"
                y="28"
                width="160"
                height="60"
                stroke="var(--crimson)"
                strokeWidth="2"
              />
              <text
                {...SVG_LABEL}
                x="390"
                y="62"
                textAnchor="middle"
                fill="var(--charcoal)"
                fillOpacity="0.75"
              >
                AI MODELS
              </text>
              {[
                { y: 30, label: "FORECASTING" },
                { y: 86, label: "ROUTING DATA" },
              ].map((o) => (
                <g key={o.label}>
                  <path
                    d={`M470 58 C 520 58, 540 ${o.y}, 590 ${o.y}`}
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
          </div>
        </div>

        <Discussion1>
          Who is liable when a third-party AI optimization tool is breached,
          causing a systemic shutdown of your logistics network?
        </Discussion1>
      </Slide>

      {/* ==================================================================
          33. HUMAN-AI TRANSITION: planner struck for algorithm manager.
          Three investments. Change management weighed above technology.
      ================================================================== */}
      <Slide id="human-ai-transition" border align="left">
        <Head1 eyebrow="People">The Human-AI Transition in Operations</Head1>

        <div className="w-full">
          <div className="mt-10 w-full max-w-5xl">
            <p className={`${LEAD} max-w-4xl`}>
              The role of the supply chain professional is shifting from manual
              planner to algorithm manager.
            </p>
            <div className="mt-6">
              <Split1
                left="Manual planner"
                right="Algorithm manager"
                strikeLeft
              />
            </div>
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
            <p className={`${DISPLAY} max-w-4xl`}>
              Change management is often a larger barrier to AI success than the
              underlying technology itself.
            </p>
            <div
              aria-hidden
              className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3"
            >
              <span className="font-serif text-[0.9375rem] italic tracking-normal text-[var(--crimson)]">
                change management
              </span>
              <span className="font-serif text-4xl font-light text-[var(--charcoal)]/35">
                &gt;
              </span>
              <span className="font-serif text-[0.9375rem] italic tracking-normal text-[var(--charcoal-light)]/45">
                underlying technology
              </span>
            </div>
          </div>
        </div>
      </Slide>

      {/* ==================================================================
          34. CONCLUSION: the four things a self-driving supply chain does,
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

        <Head1 eyebrow="What to carry forward">
          Conclusion: The Autonomous Supply Chain
        </Head1>

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
                <div>
                  <p className="font-serif text-xl font-medium leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[1.75rem]">
                    {line}
                  </p>
                  {i === 0 && (
                    <ol
                      aria-hidden
                      className="mt-6 grid w-full max-w-3xl grid-cols-2 gap-y-5 sm:grid-cols-4"
                    >
                      {["forecast", "procure", "manufacture", "deliver"].map(
                        (step, k) => (
                          <li
                            key={step}
                            className="relative border-t-2 border-[var(--crimson)]/70 pr-3 pt-3"
                          >
                            <span
                              className={`${MICRO} block text-[var(--champagne)]`}
                            >
                              {pad(k + 1)}
                            </span>
                            <span className="mt-1 block font-serif text-[0.9375rem] italic tracking-normal text-[var(--charcoal-light)]/70">
                              {step}
                            </span>
                          </li>
                        ),
                      )}
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
              End of Week 05
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
