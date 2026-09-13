"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Slide,
  SlideDeck,
} from "@/app/(courses-ai)/_components/SlideComponents";
import { ScrollProgress } from "@/app/(courses-ai)/_components/Interactive";
import { createCourseQuizLookup, type CourseQuiz } from "@/lib/course-quiz";
import quizzes from "./quizzes.json";

// ============================================================================
// WEEK 02 — APPLICATIONS OF AI IN MARKETING AND CONSUMER BEHAVIOR
// ============================================================================
// Same deck grammar as Week 01: every slide is hand-composed for its own
// argument, with hairlines instead of boxes and crimson marking one thing.
//
// Sentences are transcribed verbatim from content.md. Figures carry only words
// that already appear in the slide's sentences; any shape that suggests a
// quantity is labelled SCHEMATIC because content.md gives no numbers.
//
// Quizzes: `Slide` renders `quizData` BEFORE its section. content.md marks the
// topic to be tested with [quiz], so each quiz is attached to the slide that
// FOLLOWS that topic and only tests material the student has already passed.
// ============================================================================

const quiz = createCourseQuizLookup(quizzes as CourseQuiz[]);

/** Small-caps label treatment used for every eyebrow, axis tick and numeral. */
const MICRO = "font-sans text-[10px] font-semibold uppercase tracking-[0.22em]";

/** The same small-caps treatment for SVG <text>. */
const SVG_LABEL = {
  fontSize: 9,
  letterSpacing: 2.2,
  fontFamily: "var(--font-sans), sans-serif",
  fontWeight: 600,
} as const;

/**
 * Reveal — the deck's single entrance. Opacity plus eight pixels of rise,
 * fired once when the element crosses into view. `delay` staggers siblings.
 */
function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "p" | "span" | "figure";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(8px)",
        transition: `opacity 700ms ease-out ${delay}ms, transform 700ms ease-out ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}

/** Eyebrow plus slide heading, the masthead every content slide opens with. */
function Head({
  eyebrow,
  children,
  signal = false,
}: {
  eyebrow: string;
  children: React.ReactNode;
  signal?: boolean;
}) {
  return (
    <Reveal>
      <div
        className={`${MICRO} ${
          signal ? "text-[var(--crimson)]" : "text-[var(--champagne)]"
        }`}
      >
        {eyebrow}
      </div>
      <h2 className="mt-5 max-w-4xl font-serif text-[1.875rem] font-bold leading-[1.05] tracking-[-0.02em] text-[var(--charcoal)] md:text-[2.875rem]">
        {children}
      </h2>
    </Reveal>
  );
}

/** Module divider: display roman numeral against a ruled margin. */
function ModulePlate({
  id,
  numeral,
  title,
  lines,
}: {
  id: string;
  numeral: string;
  title: string;
  lines: string[];
}) {
  return (
    <Slide id={id} border align="left">
      <div className="grid w-full items-end gap-10 md:grid-cols-[minmax(0,10rem)_1fr] md:gap-16">
        <Reveal>
          <div className={`${MICRO} text-[var(--champagne)]`}>Module</div>
          <div className="font-serif text-[6rem] font-black leading-[0.8] tracking-[-0.04em] text-[var(--crimson)] md:text-[9rem]">
            {numeral}
          </div>
        </Reveal>

        <Reveal
          delay={140}
          className="md:border-l md:border-[var(--charcoal)]/12 md:pl-16"
        >
          <h2 className="font-serif text-[2.25rem] font-bold leading-[1.02] tracking-[-0.025em] text-[var(--charcoal)] md:text-[3.5rem]">
            {title}
          </h2>
          <div className="mt-8 h-px w-24 bg-[var(--charcoal)]/20" />
          {lines.map((line, i) => (
            <p
              key={line}
              className={`${
                i === 0 ? "mt-8" : "mt-4"
              } max-w-2xl font-serif text-lg font-light italic leading-relaxed text-[var(--charcoal-light)] md:text-2xl`}
            >
              {line}
            </p>
          ))}
        </Reveal>
      </div>
    </Slide>
  );
}

/** Discussion prompt, set apart in the deck's one ruled frame. */
function Discussion({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <Reveal delay={delay} className="w-full">
      <aside className="mt-14 max-w-3xl border border-[var(--charcoal)]/12 p-7 md:p-9">
        <div className={`${MICRO} text-[var(--champagne)]`}>Discussion</div>
        <p className="mt-4 font-serif text-lg font-light italic leading-relaxed text-[var(--charcoal)] md:text-[1.375rem]">
          {children}
        </p>
      </aside>
    </Reveal>
  );
}

/** Closing statement in display weight. */
function Verdict({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <Reveal delay={delay} className="w-full">
      <p className="mt-14 max-w-4xl font-serif text-[1.375rem] font-bold leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[2rem]">
        {children}
      </p>
    </Reveal>
  );
}

/** Body sentence at the deck's reading size. */
const BODY =
  "font-serif text-lg leading-[1.55] text-[var(--charcoal)] md:text-[1.3125rem]";

export default function Week02Marketing() {
  return (
    <SlideDeck>
      <ScrollProgress label="Week 02" />

      {/* ==================================================================
          01 · TITLE — masthead with the four verbs of the framing sentence
          set as a closed loop beneath the standfirst.
      ================================================================== */}
      <Slide id="title" align="left" className="relative overflow-hidden">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 select-none font-serif text-[36vw] font-black leading-none text-[var(--charcoal)]/[0.035] md:text-[28vw]"
        >
          02
        </span>

        <Reveal>
          <div
            className={`${MICRO} flex items-center gap-4 text-[var(--champagne)]`}
          >
            <span className="h-px w-10 bg-[var(--crimson)]" />
            Week 02 in Applications of AI in Business
          </div>
        </Reveal>

        <Reveal delay={120}>
          <h1 className="mt-10 max-w-5xl font-serif text-[clamp(2.5rem,7.5vw,5.75rem)] font-black leading-[0.92] tracking-[-0.035em] text-[var(--charcoal)]">
            Applications of AI in Marketing and{" "}
            <span className="text-[var(--crimson)]">Consumer Behavior</span>
          </h1>
        </Reveal>

        <Reveal delay={240} className="w-full">
          <div className="mt-12 h-px w-full bg-[var(--charcoal)]/15" />
          <p className="mt-6 max-w-3xl font-serif text-xl font-light italic leading-relaxed text-[var(--charcoal-light)] md:text-[1.75rem]">
            Framing marketing as a coordinated system of sensing, deciding,
            acting, and learning
          </p>
          <div
            aria-hidden
            className={`${MICRO} mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-[var(--charcoal-light)]/55`}
          >
            {["sensing", "deciding", "acting", "learning"].map((verb) => (
              <React.Fragment key={verb}>
                <span>{verb}</span>
                <span className="text-[var(--crimson)]">→</span>
              </React.Fragment>
            ))}
            <span className="text-[var(--crimson)]">↺</span>
          </div>
        </Reveal>

        <Reveal delay={360} className="w-full">
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
        </Reveal>
      </Slide>

      {/* ==================================================================
          02 · WHY MARKETING BECAME AN ML DOMAIN — six data sources converge
          on one rule; the four machine methods sit in a ruled row; the
          strategic question closes as a signed verdict.
      ================================================================== */}
      <Slide id="why-marketing-ml" border align="left">
        <Head eyebrow="Opening">
          Why Marketing Became a Machine Learning Domain
        </Head>

        <Reveal delay={140} className="w-full">
          <div className="mt-11 grid w-full max-w-5xl items-center gap-8 md:grid-cols-[1fr_minmax(0,18rem)] md:gap-14">
            <p className={BODY}>
              Modern marketing generates granular data from search, commerce,
              media, CRM, service, and product usage.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 280 132"
              className="w-full max-w-[18rem]"
              fill="none"
            >
              {[
                "SEARCH",
                "COMMERCE",
                "MEDIA",
                "CRM",
                "SERVICE",
                "PRODUCT USAGE",
              ].map((src, i) => {
                const y = 10 + i * 22;
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
                      d={`M122 ${y} C 180 ${y}, 196 66, 244 66`}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.2"
                    />
                  </g>
                );
              })}
              <path d="M244 66h30" stroke="var(--crimson)" strokeWidth="1.5" />
              <circle cx="276" cy="66" r="3" fill="var(--crimson)" />
            </svg>
          </div>
        </Reveal>

        <Reveal delay={280} className="w-full">
          <div className="mt-12 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-8">
            <p className={`${BODY} max-w-3xl`}>
              Many marketing choices are repeated allocation decisions, making
              them suitable for prediction, ranking, optimization, and
              experimentation.
            </p>
            <div
              aria-hidden
              className="mt-6 grid grid-cols-2 border-l border-[var(--charcoal)]/12 md:grid-cols-4"
            >
              {["prediction", "ranking", "optimization", "experimentation"].map(
                (m) => (
                  <span
                    key={m}
                    className="border-b border-r border-[var(--charcoal)]/12 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--charcoal-light)]/65"
                  >
                    {m}
                  </span>
                ),
              )}
            </div>
          </div>
        </Reveal>

        <Reveal delay={420} className="w-full">
          <figure className="mt-14 max-w-4xl border-l-2 border-[var(--crimson)] pl-6 md:pl-8">
            <div className={`${MICRO} text-[var(--champagne)]`}>
              The strategic question
            </div>
            <blockquote className="mt-3 font-serif text-[1.375rem] font-bold leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[2rem]">
              The strategic question is not where to &quot;use AI&quot; in
              isolation, but which customer and budget decisions should be
              machine-assisted.
            </blockquote>
          </figure>
        </Reveal>
      </Slide>

      {/* ==================================================================
          03 · CUSTOMER LIFECYCLE — six stages as a numbered chain, then the
          four things a firm must define before AI can help at any stage.
                                          [quiz: why-marketing-ml]
      ================================================================== */}
      <Slide
        id="customer-lifecycle"
        border
        align="left"
        quizData={quiz["customer-lifecycle"]}
      >
        <Head eyebrow="A chain of decisions">
          The Customer Lifecycle as a Decision Chain
        </Head>

        <Reveal delay={140} className="w-full">
          <p className={`${BODY} mt-9 max-w-3xl`}>
            Marketing spans awareness, consideration, conversion, retention,
            expansion, and advocacy.
          </p>
        </Reveal>

        <ol
          aria-hidden
          className="mt-8 grid w-full max-w-5xl grid-cols-2 gap-y-6 sm:grid-cols-3 md:grid-cols-6"
        >
          {[
            "Awareness",
            "Consideration",
            "Conversion",
            "Retention",
            "Expansion",
            "Advocacy",
          ].map((stage, i) => (
            <Reveal key={stage} as="li" delay={220 + i * 70} className="block">
              <div className="relative border-t border-[var(--charcoal)]/20 pr-3 pt-4">
                <span className="absolute -top-[4px] left-0 h-[7px] w-[7px] rounded-full bg-[var(--crimson)]" />
                <span className={`${MICRO} block text-[var(--champagne)]`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mt-2 block font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--charcoal)]">
                  {stage}
                </span>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={700} className="w-full">
          <div className="mt-14 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-8">
            <p className={`${BODY} max-w-3xl`}>
              AI can support each stage only when firms define the decision, the
              data, the action, and the success metric.
            </p>
            <div
              aria-hidden
              className="mt-6 grid grid-cols-2 gap-px bg-[var(--charcoal)]/10 md:grid-cols-4"
            >
              {["the decision", "the data", "the action", "the success metric"].map(
                (item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 bg-[var(--background)] px-4 py-4"
                  >
                    <span className="h-3 w-3 shrink-0 border border-[var(--crimson)]" />
                    <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--charcoal-light)]/70">
                      {item}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </Reveal>

        <Verdict delay={820}>
          This lifecycle view prevents leaders from reducing AI to content
          generation alone.
        </Verdict>
      </Slide>

      <ModulePlate
        id="module-1"
        numeral="I"
        title="Sensing Demand and Consumers"
        lines={[
          "This section focuses on how firms infer needs, patterns, and heterogeneous customer value.",
          "The core managerial issue is signal quality: which data should guide segmentation, targeting, and positioning decisions.",
        ]}
      />

      {/* ==================================================================
          05 · CONSUMER INSIGHT — the survey form beside the loose slips of
          what firms now read; then noise passing through a lens into four
          clean readings; then the say/do gap as two unequal rules.
      ================================================================== */}
      <Slide id="consumer-insight" border align="left">
        <Head eyebrow="Listening at scale">
          Consumer Insight from Unstructured Signals
        </Head>

        <Reveal delay={140} className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Firms now learn from reviews, search queries, clickstreams, call
            transcripts, chat logs, and social conversation rather than only
            from surveys.
          </p>
        </Reveal>

        <Reveal delay={260} className="w-full">
          <div
            aria-hidden
            className="mt-8 grid w-full max-w-5xl gap-8 md:grid-cols-[10rem_1fr] md:gap-12"
          >
            <div>
              <div className={`${MICRO} text-[var(--charcoal-light)]/50`}>
                Surveys
              </div>
              <div className="mt-4 space-y-2.5 border border-[var(--charcoal)]/15 p-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 border border-[var(--charcoal)]/30" />
                    <span className="h-px flex-1 bg-[var(--charcoal)]/20" />
                  </div>
                ))}
              </div>
            </div>
            <div className="md:border-l md:border-[var(--charcoal)]/12 md:pl-12">
              <div className={`${MICRO} text-[var(--crimson)]`}>
                Unstructured signals
              </div>
              <div className="relative mt-4 h-[96px] max-w-[440px]">
                {[
                  { t: "reviews", x: 0, y: 0, r: -3 },
                  { t: "search queries", x: 84, y: 4, r: 2 },
                  { t: "clickstreams", x: 214, y: 0, r: -1.5 },
                  { t: "call transcripts", x: 18, y: 38, r: 1.5 },
                  { t: "chat logs", x: 164, y: 44, r: -2.5 },
                  { t: "social conversation", x: 90, y: 70, r: 2.5 },
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
            </div>
          </div>
        </Reveal>

        <Reveal delay={400} className="w-full">
          <div className="mt-12 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-8">
            <p className={`${BODY} max-w-3xl`}>
              AI helps convert noisy text, image, and behavioral data into
              themes, sentiment patterns, emerging needs, and friction points.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 800 140"
              className="mt-6 w-full"
              fill="none"
            >
              {[
                [14, 22], [48, 64], [30, 108], [76, 36], [96, 96], [122, 14],
                [140, 70], [168, 118], [184, 42], [210, 88], [232, 20],
                [252, 60], [270, 112], [58, 128], [110, 50], [196, 132],
              ].map(([x, y], i) => (
                <path
                  key={`${x}-${y}`}
                  d={`M${x} ${y}l${i % 2 ? 9 : 7} ${i % 3 ? -4 : 5}`}
                  stroke="var(--charcoal)"
                  strokeOpacity="0.3"
                />
              ))}
              <path
                d="M300 8 C 340 8, 360 62, 400 70 M300 132 C 340 132, 360 78, 400 70"
                stroke="var(--charcoal)"
                strokeOpacity="0.2"
              />
              <circle cx="410" cy="70" r="10" stroke="var(--crimson)" strokeWidth="1.5" />
              {["THEMES", "SENTIMENT PATTERNS", "EMERGING NEEDS", "FRICTION POINTS"].map(
                (label, i) => {
                  const y = 22 + i * 32;
                  return (
                    <g key={label}>
                      <path
                        d={`M420 70 C 450 70, 450 ${y}, 480 ${y}`}
                        stroke="var(--crimson)"
                        strokeOpacity="0.35"
                      />
                      <path d={`M480 ${y}h36`} stroke="var(--crimson)" strokeWidth="1.25" />
                      <text {...SVG_LABEL} x="528" y={y + 3} fill="var(--charcoal)">
                        {label}
                      </text>
                    </g>
                  );
                },
              )}
            </svg>
          </div>
        </Reveal>

        <Reveal delay={540} className="w-full">
          <div className="mt-12 grid w-full max-w-5xl items-center gap-8 border-l border-[var(--charcoal)]/25 pl-6 md:grid-cols-[1fr_14rem] md:gap-12">
            <p className="font-serif text-lg leading-[1.6] text-[var(--charcoal-light)] md:text-[1.25rem]">
              Insight quality still depends on sampling logic, data provenance,
              and the difference between what consumers say and what they
              actually do.
            </p>
            <div aria-hidden className="space-y-3">
              <div className="flex items-center gap-3">
                <span className={`${MICRO} w-8 text-[var(--charcoal-light)]/50`}>
                  Say
                </span>
                <span className="h-[3px] w-[85%] bg-[var(--charcoal)]/30" />
              </div>
              <div className="flex items-center gap-3">
                <span className={`${MICRO} w-8 text-[var(--crimson)]`}>Do</span>
                <span className="h-[3px] w-[48%] bg-[var(--crimson)]" />
              </div>
            </div>
          </div>
        </Reveal>
      </Slide>

      {/* ==================================================================
          06 · SEGMENTATION — the same customers cut two ways. Left: even
          demographic bands that ignore where people actually sit. Right:
          clusters drawn around the people.            [quiz topic]
      ================================================================== */}
      <Slide id="segmentation" border align="left">
        <Head eyebrow="Who belongs together">
          Segmentation Beyond Static Demographics
        </Head>

        <Reveal delay={140} className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            AI-based segmentation groups customers using behavior, value, needs,
            responsiveness, or risk instead of relying only on age or income.
          </p>
        </Reveal>

        <div
          aria-hidden
          className="mt-10 grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-0"
        >
          {[
            {
              key: "static",
              label: "Age or income",
              tone: "text-[var(--charcoal-light)]/50",
              pad: "md:pr-12",
            },
            {
              key: "behavioral",
              label: "Behavior, value, needs, responsiveness, or risk",
              tone: "text-[var(--crimson)]",
              pad: "md:border-l md:border-[var(--charcoal)]/12 md:pl-12",
            },
          ].map((panel, p) => (
            <Reveal key={panel.key} delay={240 + p * 140} className={panel.pad}>
              <div className={`${MICRO} ${panel.tone}`}>{panel.label}</div>
              <svg viewBox="0 0 320 160" className="mt-5 w-full" fill="none">
                {p === 0 ? (
                  [80, 160, 240].map((x) => (
                    <path
                      key={x}
                      d={`M${x} 4V156`}
                      stroke="var(--charcoal)"
                      strokeOpacity="0.22"
                      strokeDasharray="3 4"
                    />
                  ))
                ) : (
                  <>
                    <ellipse cx="70" cy="52" rx="52" ry="38" stroke="var(--crimson)" strokeOpacity="0.6" />
                    <ellipse cx="226" cy="44" rx="62" ry="34" stroke="var(--crimson)" strokeOpacity="0.6" />
                    <ellipse cx="160" cy="120" rx="70" ry="30" stroke="var(--crimson)" strokeOpacity="0.6" />
                  </>
                )}
                {[
                  [44, 40], [62, 70], [86, 34], [96, 60], [52, 58], [78, 48],
                  [190, 40], [212, 28], [238, 52], [262, 38], [224, 60], [250, 24],
                  [110, 120], [140, 110], [166, 132], [196, 118], [214, 128], [150, 128],
                ].map(([x, y]) => (
                  <circle
                    key={`${x}-${y}`}
                    cx={x}
                    cy={y}
                    r="3.5"
                    fill={p === 0 ? "var(--charcoal)" : "var(--crimson)"}
                    fillOpacity={p === 0 ? 0.35 : 0.75}
                  />
                ))}
              </svg>
            </Reveal>
          ))}
        </div>

        <Reveal delay={540} className="w-full">
          <div className="mt-12 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-8">
            <div
              aria-hidden
              className="grid grid-cols-3 gap-4 md:max-w-xl"
            >
              {["Stable", "Distinct", "Explainable"].map((test, i) => (
                <div key={test} className="border-t-2 border-[var(--crimson)]/60 pt-3">
                  <span className={`${MICRO} text-[var(--champagne)]`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-1 block font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--charcoal)]">
                    {test}
                  </span>
                </div>
              ))}
            </div>
            <p className={`${BODY} mt-6 max-w-3xl`}>
              Useful segments are stable enough to act on, distinct enough to
              prioritize, and explainable enough for managers to deploy.
            </p>
          </div>
        </Reveal>

        <Reveal delay={680} className="w-full">
          <div className="mt-12 grid w-full max-w-5xl items-center gap-8 md:grid-cols-[1fr_20rem] md:gap-12">
            <p className="font-serif text-[1.375rem] font-bold leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[1.75rem]">
              More segments are not always better; excessive granularity can
              raise complexity without improving decisions.
            </p>
            <figure aria-hidden>
              <svg viewBox="0 0 320 124" className="w-full" fill="none">
                <path d="M10 6v100h210" stroke="var(--charcoal)" strokeOpacity="0.25" />
                <path d="M10 100 C 90 96, 170 70, 216 14" stroke="var(--crimson)" strokeWidth="1.5" />
                <path d="M10 100 C 50 62, 110 56, 216 54" stroke="var(--charcoal)" strokeOpacity="0.55" strokeWidth="1.25" />
                <text {...SVG_LABEL} x="226" y="17" fill="var(--crimson)">COMPLEXITY</text>
                <text {...SVG_LABEL} x="226" y="57" fill="var(--charcoal)" fillOpacity="0.6">DECISIONS</text>
                <text {...SVG_LABEL} x="220" y="120" textAnchor="end" fill="var(--charcoal)" fillOpacity="0.45">MORE SEGMENTS →</text>
              </svg>
              <figcaption className={`${MICRO} mt-2 text-[var(--charcoal-light)]/40`}>
                Schematic
              </figcaption>
            </figure>
          </div>
        </Reveal>
      </Slide>

      {/* ==================================================================
          07 · TARGETING — one audience pool ranked three times, once per
          objective, so the ranking visibly changes with the goal; then the
          rule revised along a signal timeline.     [quiz: segmentation]
      ================================================================== */}
      <Slide
        id="targeting"
        border
        align="left"
        quizData={quiz["targeting"]}
      >
        <Head eyebrow="Who sees what">
          Targeting and Next-Best-Audience Decisions
        </Head>

        <Reveal delay={140} className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Targeting systems estimate which audience is most likely to respond
            under a given objective such as reach, conversion, or retention.
          </p>
        </Reveal>

        <div
          aria-hidden
          className="mt-10 grid w-full max-w-5xl gap-10 md:grid-cols-3 md:gap-0"
        >
          {[
            { objective: "Reach", ranks: [["A", 92], ["B", 70], ["C", 46], ["D", 28]] },
            { objective: "Conversion", ranks: [["C", 86], ["A", 60], ["D", 42], ["B", 24]] },
            { objective: "Retention", ranks: [["D", 80], ["C", 58], ["B", 38], ["A", 20]] },
          ].map((col, i) => (
            <Reveal
              key={col.objective}
              delay={240 + i * 120}
              className={
                i === 0 ? "md:pr-10" : "md:border-l md:border-[var(--charcoal)]/12 md:px-10"
              }
            >
              <div className={`${MICRO} text-[var(--champagne)]`}>
                {col.objective}
              </div>
              <div className="mt-4 space-y-2.5">
                {col.ranks.map(([aud, w], r) => (
                  <div key={aud} className="flex items-center gap-3">
                    <span className="w-3 font-mono text-[11px] text-[var(--charcoal-light)]/60">
                      {aud}
                    </span>
                    <span
                      className={`h-2 ${
                        r === 0 ? "bg-[var(--crimson)]" : "bg-[var(--charcoal)]/20"
                      }`}
                      style={{ width: `${w}%` }}
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={600}>
          <div className={`${MICRO} mt-4 text-[var(--charcoal-light)]/40`}>
            Schematic
          </div>
        </Reveal>

        <Reveal delay={660} className="w-full">
          <div className="mt-12 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-8">
            <p className={`${BODY} max-w-3xl`}>
              The practical output is often a next-best-audience rule that
              updates as new signals arrive.
            </p>
            <svg aria-hidden viewBox="0 0 800 72" className="mt-6 w-full" fill="none">
              <path d="M8 34h784" stroke="var(--charcoal)" strokeOpacity="0.2" />
              {[70, 110, 150, 230, 290, 330, 410, 470, 520, 610, 660, 700].map((x) => (
                <path key={x} d={`M${x} 28v12`} stroke="var(--charcoal)" strokeOpacity="0.35" />
              ))}
              {[
                { x: 30, label: "RULE V1" },
                { x: 360, label: "RULE V2" },
                { x: 740, label: "RULE V3" },
              ].map((r) => (
                <g key={r.label}>
                  <rect x={r.x - 5} y="29" width="10" height="10" fill="var(--crimson)" />
                  <text {...SVG_LABEL} x={r.x} y="60" textAnchor="middle" fill="var(--crimson)">
                    {r.label}
                  </text>
                </g>
              ))}
              <text {...SVG_LABEL} x="190" y="16" textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.45">
                NEW SIGNALS
              </text>
            </svg>
          </div>
        </Reveal>

        <Reveal delay={780} className="w-full">
          <div className="mt-12 max-w-4xl border border-[var(--crimson)]/45 p-7 md:p-9">
            <div className={`${MICRO} text-[var(--crimson)]`}>Test it</div>
            <p className="mt-4 font-serif text-xl leading-[1.4] text-[var(--charcoal)] md:text-[1.625rem]">
              Managers should test whether algorithmic targeting improves
              business value or merely shifts exposure toward already active
              customers.
            </p>
          </div>
        </Reveal>
      </Slide>

      {/* ==================================================================
          08 · POSITIONING — a resonance grid of claims, benefits and proof
          points; then the line between what models detect and what
          leadership decides.
      ================================================================== */}
      <Slide id="positioning" border align="left">
        <Head eyebrow="What resonates">
          Positioning Intelligence and Message-Market Fit
        </Head>

        <div className="mt-10 grid w-full max-w-5xl items-start gap-10 md:grid-cols-[1fr_1fr] md:gap-14">
          <Reveal delay={140}>
            <p className={BODY}>
              AI can surface which claims, benefits, or proof points resonate
              across segments, channels, and contexts.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <figure aria-hidden>
              <div className={`${MICRO} mb-3 pl-[7.5rem] text-[var(--charcoal-light)]/45`}>
                Segments · channels · contexts
              </div>
              {[
                { row: "Claims", cells: [0.15, 0.7, 0.3, 0.1, 0.55, 0.2] },
                { row: "Benefits", cells: [0.6, 0.2, 0.9, 0.35, 0.15, 0.5] },
                { row: "Proof points", cells: [0.25, 0.45, 0.1, 0.8, 0.4, 0.65] },
              ].map((r) => (
                <div key={r.row} className="flex items-center gap-2 py-1">
                  <span className={`${MICRO} w-[7rem] shrink-0 text-[var(--charcoal-light)]/60`}>
                    {r.row}
                  </span>
                  {r.cells.map((o, c) => (
                    <span
                      key={c}
                      className="block h-7 flex-1 border border-[var(--charcoal)]/8"
                      style={{ backgroundColor: `rgba(139, 0, 0, ${o})` }}
                    />
                  ))}
                </div>
              ))}
              <figcaption className={`${MICRO} mt-3 text-[var(--charcoal-light)]/40`}>
                Schematic
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <Reveal delay={400} className="w-full">
          <div className="mt-12 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-8">
            <p className={`${BODY} max-w-3xl`}>
              This supports faster refinement of value propositions, creative
              briefs, and channel-specific narratives.
            </p>
            <div
              aria-hidden
              className="mt-5 flex flex-wrap gap-x-3 gap-y-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--charcoal-light)]/50"
            >
              <span>value propositions</span>
              <span>·</span>
              <span>creative briefs</span>
              <span>·</span>
              <span>channel-specific narratives</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={540} className="w-full">
          <div className="mt-14 w-full max-w-5xl">
            <div aria-hidden className="grid grid-cols-2 border-b border-[var(--charcoal)]/15 pb-3">
              <span className={`${MICRO} text-[var(--charcoal-light)]/50`}>
                Models · detect patterns
              </span>
              <span className={`${MICRO} border-l border-[var(--crimson)]/40 pl-6 text-[var(--crimson)]`}>
                Leadership · must decide
              </span>
            </div>
            <p className="mt-6 max-w-4xl font-serif text-[1.375rem] font-bold leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[2rem]">
              Positioning remains a strategic choice; models can detect
              patterns, but leadership must decide what the brand should stand
              for.
            </p>
          </div>
        </Reveal>
      </Slide>

      <ModulePlate
        id="module-2"
        numeral="II"
        title="Personalization and Commercial Engines"
        lines={[
          "This section moves from insight generation to individual-level treatment decisions in commerce and promotion.",
          "The central issue is balancing relevance, revenue, and brand coherence across millions of interactions.",
        ]}
      />

      {/* ==================================================================
          10 · PERSONALIZATION AS POLICY — the merge-field greeting set faint
          and struck, against four policy dials; the stop conditions as a
          rule list; the trust curve that rises and then turns over.
      ================================================================== */}
      <Slide id="personalization" border align="left">
        <Head eyebrow="A policy, not a mail merge">
          Personalization as a Managed Policy
        </Head>

        <Reveal delay={140} className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Personalization is not just inserting a name into a message; it is
            choosing which offer, content, timing, and channel best fit a
            customer state.
          </p>
        </Reveal>

        <Reveal delay={260} className="w-full">
          <div
            aria-hidden
            className="mt-9 grid w-full max-w-5xl items-end gap-8 md:grid-cols-[12rem_1fr] md:gap-12"
          >
            <div className="font-mono text-[12px] text-[var(--charcoal-light)]/40 [text-decoration-line:line-through]">
              Hi {"{name}"}, …
            </div>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:border-l md:border-[var(--charcoal)]/12 md:pl-12">
              {[
                { dial: "Offer", pick: 1 },
                { dial: "Content", pick: 2 },
                { dial: "Timing", pick: 0 },
                { dial: "Channel", pick: 1 },
              ].map((d) => (
                <div key={d.dial}>
                  <div className={`${MICRO} text-[var(--champagne)]`}>{d.dial}</div>
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
        </Reveal>

        <div className="mt-12 grid w-full max-w-5xl gap-12 border-t border-[var(--charcoal)]/10 pt-8 md:grid-cols-2 md:gap-0">
          <Reveal delay={400} className="md:pr-12">
            <div className={`${MICRO} text-[var(--crimson)]`}>
              When not to personalize
            </div>
            <p className={`${BODY} mt-4`}>
              Effective personalization requires rules for when not to
              personalize, especially when data is sparse, sensitive, or likely
              to overfit recent behavior.
            </p>
            <ul
              aria-hidden
              className="mt-5 space-y-2 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--charcoal-light)]/60"
            >
              {["sparse", "sensitive", "overfit recent behavior"].map((c) => (
                <li key={c} className="flex items-center gap-3">
                  <span className="relative h-3 w-3 border border-[var(--crimson)]">
                    <span className="absolute left-1/2 top-[-2px] h-[15px] w-px -translate-x-1/2 rotate-45 bg-[var(--crimson)]" />
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal
            delay={520}
            className="md:border-l md:border-[var(--charcoal)]/12 md:pl-12"
          >
            <div className={`${MICRO} text-[var(--charcoal-light)]/55`}>
              Over-personalization
            </div>
            <p className={`${BODY} mt-4`}>
              Over-personalization can feel intrusive, narrow exploration, and
              erode trust if consumers perceive manipulation.
            </p>
            <figure aria-hidden className="mt-5">
              <svg viewBox="0 0 320 118" className="w-full max-w-[20rem]" fill="none">
                <path d="M10 6v84h300" stroke="var(--charcoal)" strokeOpacity="0.22" />
                <path
                  d="M10 84 C 70 30, 130 18, 170 22 C 220 28, 260 60, 300 86"
                  stroke="var(--crimson)"
                  strokeWidth="1.5"
                />
                <text {...SVG_LABEL} x="18" y="106" fill="var(--charcoal)" fillOpacity="0.45">
                  RELEVANCE
                </text>
                <text {...SVG_LABEL} x="306" y="106" textAnchor="end" fill="var(--crimson)">
                  INTRUSIVE
                </text>
                <text {...SVG_LABEL} x="178" y="12" textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.45">
                  TRUST
                </text>
              </svg>
              <figcaption className={`${MICRO} mt-1 text-[var(--charcoal-light)]/40`}>
                Schematic
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <Discussion delay={660}>
          Where should a firm draw the line between helpful relevance and
          surveillance-like personalization in its category?
        </Discussion>
      </Slide>

      {/* ==================================================================
          11 · RECOMMENDATION SYSTEMS — a ranked shelf where constraints
          reorder the list; the objective left as an open choice for
          leaders; three failure modes struck through.   [quiz topic]
      ================================================================== */}
      <Slide id="recommendation-systems" border align="left">
        <Head eyebrow="Ranking under constraints">
          Recommendation Systems in Commerce
        </Head>

        <div className="mt-10 grid w-full max-w-5xl items-start gap-10 md:grid-cols-2 md:gap-14">
          <Reveal delay={140}>
            <p className={BODY}>
              Recommendation systems rank products, services, or content by
              expected relevance under business constraints such as inventory,
              margin, or strategic assortment.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <ol aria-hidden className="border-t border-[var(--charcoal)]/15">
              {[
                { item: "product", rel: 94, tag: "inventory", blocked: true },
                { item: "service", rel: 88, tag: "", blocked: false },
                { item: "content", rel: 81, tag: "", blocked: false },
                { item: "product", rel: 74, tag: "margin", blocked: false },
                { item: "product", rel: 52, tag: "strategic assortment", blocked: false },
              ].map((row, i) => (
                <li
                  key={i}
                  className={`grid grid-cols-[2ch_5rem_1fr] items-center gap-4 border-b border-[var(--charcoal)]/8 py-2.5 ${
                    row.blocked ? "opacity-40" : ""
                  }`}
                >
                  <span className={`${MICRO} text-[var(--champagne)]`}>{i + 1}</span>
                  <span
                    className={`font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--charcoal-light)]/70 ${
                      row.blocked ? "[text-decoration-line:line-through]" : ""
                    }`}
                  >
                    {row.item}
                  </span>
                  <span className="flex items-center gap-3">
                    <span
                      className="h-1.5 bg-[var(--charcoal)]/25"
                      style={{ width: `${row.rel * 0.6}%` }}
                    />
                    {row.tag && (
                      <span className="whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--crimson)]">
                        {row.tag}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <Reveal delay={400} className="w-full">
          <div className="mt-12 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-8">
            <p className={`${BODY} max-w-3xl`}>
              In practice, leaders must decide whether the system should
              maximize immediate conversion, long-term value, basket size, or
              discovery.
            </p>
            <div aria-hidden className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
              {["immediate conversion", "long-term value", "basket size", "discovery"].map(
                (obj) => (
                  <span
                    key={obj}
                    className="flex items-center gap-3 border border-[var(--charcoal)]/15 px-3 py-3 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--charcoal-light)]/70"
                  >
                    <span className="h-3 w-3 shrink-0 rounded-full border border-[var(--crimson)]" />
                    {obj}
                  </span>
                ),
              )}
            </div>
          </div>
        </Reveal>

        <Reveal delay={540} className="w-full">
          <div className="mt-12 max-w-4xl border-l-2 border-[var(--crimson)] pl-6 md:pl-8">
            <div
              aria-hidden
              className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--crimson)]"
            >
              <span>filter bubbles</span>
              <span>over-promote familiar items</span>
              <span>suppress strategic new offerings</span>
            </div>
            <p className="mt-4 font-serif text-xl leading-[1.4] text-[var(--charcoal)] md:text-[1.625rem]">
              Poorly designed recommenders can create filter bubbles,
              over-promote familiar items, and suppress strategic new offerings.
            </p>
          </div>
        </Reveal>
      </Slide>

      {/* ==================================================================
          12 · CREATIVE SYSTEMS — one master fanning into variants; then the
          same generator drawn twice: isolated on the left, tethered to its
          three anchors on the right.    [quiz: recommendation-systems]
      ================================================================== */}
      <Slide
        id="creative-systems"
        border
        align="left"
        quizData={quiz["creative-systems"]}
      >
        <Head eyebrow="Content operations">
          Creative Systems and Content Operations
        </Head>

        <div className="mt-10 grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1fr_16rem] md:gap-14">
          <Reveal delay={140}>
            <p className={BODY}>
              Generative tools can accelerate variant creation, copy testing,
              image adaptation, and localization across campaigns.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div aria-hidden className="flex items-center gap-4">
              <span className="block h-20 w-16 shrink-0 border-[1.5px] border-[var(--crimson)]" />
              <span className="h-px w-6 bg-[var(--charcoal)]/25" />
              <div className="grid grid-cols-4 gap-1.5">
                {Array.from({ length: 12 }).map((_, i) => (
                  <span
                    key={i}
                    className="block h-7 w-6 border border-[var(--charcoal)]/20"
                    style={{ opacity: 1 - (i % 4) * 0.18 }}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={400} className="w-full">
          <div className="mt-12 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-8">
            <svg aria-hidden viewBox="0 0 800 164" className="w-full" fill="none">
              <circle cx="100" cy="72" r="8" stroke="var(--charcoal)" strokeOpacity="0.4" />
              <text {...SVG_LABEL} x="100" y="108" textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.45">
                ISOLATED
              </text>
              <text {...SVG_LABEL} x="100" y="122" textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.45">
                PRODUCTION TOOL
              </text>
              <path d="M250 6v152" stroke="var(--charcoal)" strokeOpacity="0.15" strokeDasharray="3 4" />
              {[
                { x: 380, y: 30, label: "RESPONSE DATA", ly: 16 },
                { x: 680, y: 30, label: "BRAND GUIDELINES", ly: 16 },
                { x: 520, y: 140, label: "WORKFLOW REVIEW", ly: 159 },
              ].map((a) => (
                <g key={a.label}>
                  <path d={`M520 80L${a.x} ${a.y}`} stroke="var(--crimson)" strokeOpacity="0.45" />
                  <rect x={a.x - 4} y={a.y - 4} width="8" height="8" fill="var(--charcoal)" fillOpacity="0.6" />
                  <text {...SVG_LABEL} x={a.x} y={a.ly} textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.6">
                    {a.label}
                  </text>
                </g>
              ))}
              <circle cx="520" cy="80" r="8" fill="var(--crimson)" />
              <text {...SVG_LABEL} x="540" y="104" fill="var(--crimson)">
                CREATIVE GENERATION
              </text>
            </svg>
            <p className={`${BODY} mt-6 max-w-4xl`}>
              The real value comes when creative generation is tied to response
              data, brand guidelines, and workflow review rather than treated as
              an isolated production tool.
            </p>
          </div>
        </Reveal>

        <Reveal delay={540} className="w-full">
          <figure className="mt-14 max-w-4xl border-l-2 border-[var(--crimson)] pl-6 md:pl-8">
            <div className={`${MICRO} text-[var(--champagne)]`}>
              Marketing leadership owns
            </div>
            <blockquote className="mt-3 font-serif text-[1.375rem] font-bold leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[2rem]">
              Marketing leadership still owns taste, positioning discipline, and
              the decision about which ideas deserve distribution.
            </blockquote>
          </figure>
        </Reveal>
      </Slide>

      {/* ==================================================================
          13 · PRICING AND PROMOTION — the tradeoff drawn as a triangle with
          the chosen point inside it; four promotional levers; three effects
          set on one time ruler because they differ in horizon.
      ================================================================== */}
      <Slide id="pricing-promotion" border align="left">
        <Head eyebrow="Price and promotion">
          Pricing and Promotional Optimization
        </Head>

        <div className="mt-10 grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1fr_18rem] md:gap-14">
          <Reveal delay={140}>
            <p className={BODY}>
              AI can support pricing by forecasting demand, detecting
              responsiveness, and estimating tradeoffs across volume, margin,
              and channel behavior.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <svg aria-hidden viewBox="0 0 320 200" className="w-full max-w-[18rem]" fill="none">
              <path d="M160 26L30 172H290Z" stroke="var(--charcoal)" strokeOpacity="0.25" />
              <path d="M160 26L148 118M30 172L148 118M290 172L148 118" stroke="var(--crimson)" strokeOpacity="0.3" />
              <circle cx="148" cy="118" r="5" fill="var(--crimson)" />
              <text {...SVG_LABEL} x="160" y="14" textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.6">VOLUME</text>
              <text {...SVG_LABEL} x="14" y="192" fill="var(--charcoal)" fillOpacity="0.6">MARGIN</text>
              <text {...SVG_LABEL} x="306" y="192" textAnchor="end" fill="var(--charcoal)" fillOpacity="0.6">CHANNEL BEHAVIOR</text>
            </svg>
          </Reveal>
        </div>

        <Reveal delay={400} className="w-full">
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
                    <span className="mt-2 block font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--charcoal-light)]/70">
                      {lever}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </Reveal>

        <Reveal delay={540} className="w-full">
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
                Schematic · time →
              </div>
            </div>
            <p className="mt-8 max-w-4xl font-serif text-[1.375rem] font-bold leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[1.875rem]">
              These systems are most useful when firms distinguish between
              short-term lift, long-term willingness to pay, and brand effects.
            </p>
          </div>
        </Reveal>
      </Slide>

      {/* ==================================================================
          14 · DYNAMIC PRICING — a stepped price line, each step pinned to
          the condition that moved it; then the two readings of the same
          variation, set against each other across one rule.
      ================================================================== */}
      <Slide id="dynamic-pricing" border align="left">
        <Head eyebrow="Prices that move" signal>
          Revenue Lift, Brand Risk, and Dynamic Pricing
        </Head>

        <Reveal delay={140} className="w-full">
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
            <figcaption className={`${MICRO} mt-1 text-[var(--charcoal-light)]/40`}>
              Schematic
            </figcaption>
          </figure>
        </Reveal>

        <Reveal delay={300} className="w-full">
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
        </Reveal>

        <Reveal delay={440} className="w-full">
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
        </Reveal>

        <Discussion delay={560}>
          In which categories does dynamic pricing strengthen value capture, and
          in which categories does it undermine customer relationships?
        </Discussion>
      </Slide>

      <ModulePlate
        id="module-3"
        numeral="III"
        title="Measurement and Learning"
        lines={[
          "This section addresses how firms learn which actions actually caused performance changes.",
          "The executive problem is not data scarcity, but false certainty from dashboards that confuse correlation with causal lift.",
        ]}
      />

      {/* ==================================================================
          16 · CAMPAIGN OPTIMIZATION — five channel lanes on one clock, so
          timing and sequencing read as a score; then the local-versus-total
          conflict as two opposed arrows.
      ================================================================== */}
      <Slide id="campaign-optimization" border align="left">
        <Head eyebrow="One score, many channels">
          Campaign Optimization Across Channels
        </Head>

        <Reveal delay={140} className="w-full">
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
        </Reveal>

        <Reveal delay={300} className="w-full">
          <div className="mt-12 grid w-full max-w-5xl items-center gap-8 border-t border-[var(--charcoal)]/10 pt-8 md:grid-cols-[1fr_15rem] md:gap-12">
            <p className={BODY}>
              Optimization works best when channel objectives are aligned;
              otherwise one system can improve its local metric while hurting
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
        </Reveal>

        <Reveal delay={440} className="w-full">
          <div className="mt-12 max-w-4xl border-l-2 border-[var(--crimson)] pl-6 md:pl-8">
            <div
              aria-hidden
              className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--charcoal-light)]/55"
            >
              <span>frequency</span>
              <span>·</span>
              <span>exclusions</span>
              <span>·</span>
              <span>diminishing returns</span>
            </div>
            <p className="mt-4 font-serif text-xl leading-[1.4] text-[var(--charcoal)] md:text-[1.625rem]">
              Cross-channel orchestration requires governance over frequency,
              exclusions, and diminishing returns.
            </p>
          </div>
        </Reveal>
      </Slide>

      {/* ==================================================================
          17 · BUDGET, BIDDING, PACING — a spend curve against even pacing;
          then the visibility trade drawn literally: readable rules beside a
          sealed box; then the three conditions for the control model.
      ================================================================== */}
      <Slide id="budget-bidding" border align="left">
        <Head eyebrow="Spend decisions">Budget Allocation, Bidding, and Pacing</Head>

        <div className="mt-10 grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1fr_20rem] md:gap-14">
          <Reveal delay={140}>
            <p className={BODY}>
              Media systems continuously decide how much to spend, where to
              spend it, and how quickly to deploy budget over time.
            </p>
            <div
              aria-hidden
              className="mt-5 flex flex-wrap gap-x-3 gap-y-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--charcoal-light)]/50"
            >
              <span>how much</span>
              <span>·</span>
              <span>where</span>
              <span>·</span>
              <span>how quickly</span>
            </div>
          </Reveal>
          <Reveal delay={260}>
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
              <figcaption className={`${MICRO} mt-1 text-[var(--charcoal-light)]/40`}>
                Schematic
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <div className="mt-12 grid w-full max-w-5xl gap-10 border-t border-[var(--charcoal)]/10 pt-8 md:grid-cols-[14rem_1fr] md:gap-12">
          <Reveal delay={400}>
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
          </Reveal>
          <Reveal delay={520}>
            <p className={BODY}>
              Automated bidding can outperform manual rules in volatile
              environments, but it also makes logic less visible to managers.
            </p>
          </Reveal>
        </div>

        <Reveal delay={640} className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <div aria-hidden className="grid grid-cols-3 gap-4 md:max-w-2xl">
              {["Market speed", "Data quality", "Cost of overspending"].map((f, i) => (
                <div key={f} className="border-t-2 border-[var(--crimson)]/60 pt-3">
                  <span className={`${MICRO} text-[var(--champagne)]`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-1 block font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--charcoal)]">
                    {f}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-4xl font-serif text-[1.375rem] font-bold leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[1.875rem]">
              The right control model depends on market speed, data quality, and
              the cost of overspending on weak signals.
            </p>
          </div>
        </Reveal>
      </Slide>

      {/* ==================================================================
          18 · EXPERIMENTATION — control and treatment stood side by side;
          only the crimson increment is what the campaign caused. [quiz topic]
      ================================================================== */}
      <Slide id="experimentation" border align="left">
        <Head eyebrow="What actually caused it">
          Experimentation and Incrementality
        </Head>

        <div className="mt-10 grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1fr_20rem] md:gap-14">
          <Reveal delay={140}>
            <p className={BODY}>
              Experiments remain the cleanest way to estimate whether a
              campaign, offer, or message caused additional behavior rather than
              simply capturing existing demand.
            </p>
          </Reveal>
          <Reveal delay={260}>
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
              <figcaption className={`${MICRO} mt-1 text-[var(--charcoal-light)]/40`}>
                Schematic
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <Reveal delay={400} className="w-full">
          <div className="mt-12 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-8">
            <div aria-hidden className="grid grid-cols-3 gap-4 md:max-w-xl">
              {["Who to test", "Which treatments", "When to act"].map((q, i) => (
                <div key={q} className="border-t border-[var(--charcoal)]/25 pt-3">
                  <span className={`${MICRO} text-[var(--champagne)]`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-1 block font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--charcoal)]">
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
        </Reveal>

        <Verdict delay={540}>
          Organizations that skip experimentation often mistake optimized
          delivery for genuine value creation.
        </Verdict>

        <Discussion delay={660}>
          When should a marketing team slow down automation in order to preserve
          a credible learning agenda?
        </Discussion>
      </Slide>

      {/* ==================================================================
          19 · CAUSAL INFERENCE — the three reasons a clean test is blocked;
          then the observed series against its dashed counterfactual, the
          gap between them being the lift.        [quiz: experimentation]
      ================================================================== */}
      <Slide
        id="causal-inference"
        border
        align="left"
        quizData={quiz["causal-inference"]}
      >
        <Head eyebrow="When a clean test is not possible">
          Causal Inference Without Clean Randomization
        </Head>

        <Reveal delay={140} className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Many important questions cannot be answered with perfect experiments
            because of cost, channel constraints, or operational disruption.
          </p>
          <div aria-hidden className="mt-6 grid w-full max-w-3xl grid-cols-3 gap-3">
            {["cost", "channel constraints", "operational disruption"].map((b) => (
              <span
                key={b}
                className="border-l-2 border-[var(--crimson)] bg-[var(--charcoal)]/[0.03] px-3 py-3 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--charcoal-light)]/70"
              >
                {b}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={300} className="w-full">
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
              <figcaption className={`${MICRO} mt-1 text-[var(--charcoal-light)]/40`}>
                Schematic
              </figcaption>
            </figure>
          </div>
        </Reveal>

        <Reveal delay={440} className="w-full">
          <figure className="mt-12 max-w-4xl border-l-2 border-[var(--crimson)] pl-6 md:pl-8">
            <div className={`${MICRO} text-[var(--champagne)]`}>
              What managers need to ask
            </div>
            <blockquote className="mt-3 font-serif text-[1.375rem] font-bold leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[1.875rem]">
              Managers do not need to master the statistics, but they do need to
              ask what assumptions make the estimated lift believable.
            </blockquote>
          </figure>
        </Reveal>
      </Slide>

      {/* ==================================================================
          20 · ATTRIBUTION AND MMM — two instruments drawn side by side: a
          touchpoint path with credit split along it, and an aggregate series
          over time; closed by three overlapping lenses.
      ================================================================== */}
      <Slide id="attribution-mmm" border align="left">
        <Head eyebrow="Two instruments">
          Attribution, Marketing Mix Models, and Their Limits
        </Head>

        <Reveal delay={140} className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Attribution assigns credit for observed outcomes across touchpoints,
            while marketing mix models estimate broader channel effects from
            aggregate variation over time.
          </p>
        </Reveal>

        <div
          aria-hidden
          className="mt-9 grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-0"
        >
          <Reveal delay={260} className="md:pr-12">
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
          </Reveal>
          <Reveal
            delay={380}
            className="md:border-l md:border-[var(--charcoal)]/12 md:pl-12"
          >
            <div className={`${MICRO} text-[var(--crimson)]`}>Marketing mix models</div>
            <svg viewBox="0 0 340 110" className="mt-4 w-full" fill="none">
              {[46, 52, 40, 62, 70, 58, 76, 84, 66, 90, 96, 80, 72, 88].map((h, i) => (
                <rect key={i} x={8 + i * 23} y={100 - h * 0.75} width="14" height={h * 0.75} fill="var(--crimson)" fillOpacity="0.22" />
              ))}
              <path d="M4 100H336" stroke="var(--charcoal)" strokeOpacity="0.3" />
              <text {...SVG_LABEL} x="336" y="12" textAnchor="end" fill="var(--charcoal)" fillOpacity="0.45">OVER TIME →</text>
            </svg>
          </Reveal>
        </div>
        <Reveal delay={440}>
          <div className={`${MICRO} mt-3 text-[var(--charcoal-light)]/40`}>Schematic</div>
        </Reveal>

        <Reveal delay={500} className="w-full">
          <div className="mt-12 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-8">
            <p className={`${BODY} max-w-3xl`}>
              Each method answers a different question and carries different
              biases, time horizons, and data requirements.
            </p>
            <div aria-hidden className="mt-6 max-w-xl">
              {["biases", "time horizons", "data requirements"].map((row) => (
                <div
                  key={row}
                  className="grid grid-cols-[1fr_2rem_1fr] items-center border-b border-[var(--charcoal)]/8 py-2 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--charcoal-light)]/60"
                >
                  <span>{row}</span>
                  <span className="text-center text-[var(--crimson)]">≠</span>
                  <span className="text-right">{row}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={620} className="w-full">
          <div className="mt-12 grid w-full max-w-5xl items-center gap-8 md:grid-cols-[10rem_1fr] md:gap-12">
            <svg aria-hidden viewBox="0 0 160 110" className="w-full max-w-[10rem]" fill="none">
              <circle cx="58" cy="44" r="36" stroke="var(--charcoal)" strokeOpacity="0.35" />
              <circle cx="102" cy="44" r="36" stroke="var(--charcoal)" strokeOpacity="0.35" />
              <circle cx="80" cy="72" r="36" stroke="var(--crimson)" strokeWidth="1.5" />
            </svg>
            <p className="font-serif text-[1.375rem] font-bold leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[1.875rem]">
              Mature organizations use measurement as a portfolio of lenses
              rather than insisting that one model resolve every disagreement.
            </p>
          </div>
        </Reveal>

        <Discussion delay={740}>
          If attribution and marketing mix models point to different budget
          decisions, which one should leadership trust and why?
        </Discussion>
      </Slide>

      <ModulePlate
        id="module-4"
        numeral="IV"
        title="Relationship Systems and Governance"
        lines={[
          "This section shifts from acquisition to customer relationship management, service, and institutional safeguards.",
          "The main question is how to automate relationship decisions without weakening trust or accountability.",
        ]}
      />

      {/* ==================================================================
          22 · CRM ORCHESTRATION — four decisions; then the same customer
          journey drawn twice, once broken into campaigns and once as one
          line; then the three foundations holding up the beam.
      ================================================================== */}
      <Slide id="crm-orchestration" border align="left">
        <Head eyebrow="Across the journey">CRM Orchestration Across the Journey</Head>

        <div className="mt-10 grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1fr_1fr] md:gap-14">
          <Reveal delay={140}>
            <p className={BODY}>
              CRM systems increasingly use AI to determine next best action,
              next best offer, message timing, and suppression rules.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div aria-hidden className="grid grid-cols-2 gap-px bg-[var(--charcoal)]/10">
              {["next best action", "next best offer", "message timing", "suppression rules"].map(
                (d, i) => (
                  <div key={d} className="bg-[var(--background)] px-4 py-4">
                    <span className={`${MICRO} text-[var(--champagne)]`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-2 block font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--charcoal-light)]/70">
                      {d}
                    </span>
                  </div>
                ),
              )}
            </div>
          </Reveal>
        </div>

        <Reveal delay={400} className="w-full">
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
        </Reveal>

        <Reveal delay={540} className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <div aria-hidden className="md:max-w-2xl">
              <div className="h-[3px] w-full bg-[var(--crimson)]" />
              <div className="grid grid-cols-3 gap-3">
                {["clean event data", "identity resolution", "explicit business priorities"].map(
                  (f) => (
                    <div key={f} className="border-x border-b border-[var(--charcoal)]/15 px-3 pb-3 pt-6">
                      <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--charcoal-light)]/70">
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
        </Reveal>
      </Slide>

      {/* ==================================================================
          23 · RETENTION AND CLV — risk against worth, with one quadrant
          marked; then a prediction drawn dashed and flat with the path it
          can still take, because the danger is reading it as fixed.
                                                        [quiz topic]
      ================================================================== */}
      <Slide id="retention-clv" border align="left">
        <Head eyebrow="Who to keep">
          Retention, Churn, and Customer Lifetime Value
        </Head>

        <div className="mt-10 grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1fr_17rem] md:gap-14">
          <Reveal delay={140}>
            <p className={BODY}>
              Retention models help identify who is at risk, who is worth
              saving, and which intervention is economically justified.
            </p>
          </Reveal>
          <Reveal delay={260}>
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
              <figcaption className={`${MICRO} mt-1 text-[var(--charcoal-light)]/40`}>
                Schematic
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <div className="mt-12 grid w-full max-w-5xl gap-10 border-t border-[var(--charcoal)]/10 pt-8 md:grid-cols-[14rem_1fr] md:gap-12">
          <Reveal delay={400}>
            <div aria-hidden className="flex items-center gap-4">
              <span className="border border-[var(--charcoal)]/15 px-3 py-4 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--charcoal-light)]/35 [text-decoration-line:line-through]">
                CLV
              </span>
              <span className="text-[var(--crimson)]">→</span>
              <div className="flex-1 space-y-1.5">
                {[80, 50, 30].map((w) => (
                  <span key={w} className="block h-2 bg-[var(--crimson)]" style={{ width: `${w}%`, opacity: w / 100 + 0.2 }} />
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={520}>
            <p className={BODY}>
              Customer lifetime value is most useful when it informs resource
              allocation, not when it becomes a decorative dashboard metric.
            </p>
          </Reveal>
        </div>

        <Reveal delay={640} className="w-full">
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
              <figcaption className={`${MICRO} mt-1 text-[var(--charcoal-light)]/40`}>
                Schematic
              </figcaption>
            </figure>
          </div>
        </Reveal>
      </Slide>

      {/* ==================================================================
          24 · CONVERSATIONAL COMMERCE — a conversation column carrying the
          four jobs; the escalation path drawn as a handoff; then two trays
          for intents, one for the machine and one for people.
                                                   [quiz: retention-clv]
      ================================================================== */}
      <Slide
        id="conversational-commerce"
        border
        align="left"
        quizData={quiz["conversational-commerce"]}
      >
        <Head eyebrow="Chat, voice, messaging">
          Conversational Commerce and Service Automation
        </Head>

        <div className="mt-10 grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1fr_17rem] md:gap-14">
          <Reveal delay={140}>
            <p className={BODY}>
              Conversational systems now support discovery, service triage,
              order updates, and guided selling across chat, voice, and
              messaging channels.
            </p>
            <div
              aria-hidden
              className="mt-5 flex flex-wrap gap-x-3 gap-y-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--charcoal-light)]/50"
            >
              <span>chat</span>
              <span>·</span>
              <span>voice</span>
              <span>·</span>
              <span>messaging</span>
            </div>
          </Reveal>
          <Reveal delay={260}>
            <div aria-hidden className="space-y-2.5">
              {["discovery", "service triage", "order updates", "guided selling"].map(
                (job, i) => (
                  <div key={job} className={`flex ${i % 2 ? "justify-end" : "justify-start"}`}>
                    <span
                      className={`rounded-[10px] border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.1em] ${
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
          </Reveal>
        </div>

        <Reveal delay={400} className="w-full">
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
        </Reveal>

        <Reveal delay={540} className="w-full">
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
                      <span key={i} className={`border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.1em] ${t.tone}`}>
                        intent
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-4xl font-serif text-[1.375rem] font-bold leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[1.875rem]">
              Full automation is rarely the objective; the better design question
              is which intents can be resolved safely and which require human
              judgment.
            </p>
          </div>
        </Reveal>

        <Discussion delay={660}>
          Which customer moments in your organization should remain human-led
          even if conversational AI becomes fast and accurate?
        </Discussion>
      </Slide>

      {/* ==================================================================
          25 · PRIVACY AND TRUST ARCHITECTURE — governance drawn as the slab
          the three data dependencies stand on; the four decisions as ruled
          clauses; three strategic capabilities.          [quiz topic]
      ================================================================== */}
      <Slide id="privacy-consent" border align="left">
        <Head eyebrow="Trust architecture">
          Privacy, Consent, and Trust Architecture
        </Head>

        <Reveal delay={140} className="w-full">
          <p className={`${BODY} mt-9 max-w-4xl`}>
            Marketing AI depends on customer data, identity linkage, and
            behavioral inference, making governance a core design requirement
            rather than a legal afterthought.
          </p>
        </Reveal>

        <Reveal delay={260} className="w-full">
          <div aria-hidden className="mt-8 w-full max-w-3xl">
            <div className="grid grid-cols-3 gap-3">
              {["customer data", "identity linkage", "behavioral inference"].map((b) => (
                <div
                  key={b}
                  className="border border-b-0 border-[var(--charcoal)]/15 px-3 py-5 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--charcoal-light)]/70"
                >
                  {b}
                </div>
              ))}
            </div>
            <div className={`${MICRO} bg-[var(--crimson)] px-4 py-3 text-[var(--surface)]`}>
              Governance · core design requirement
            </div>
          </div>
        </Reveal>

        <Reveal delay={400} className="w-full">
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
                  <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--charcoal-light)]/65">
                    {c}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={540} className="w-full">
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
            <p className="mt-8 max-w-4xl font-serif text-[1.375rem] font-bold leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[1.875rem]">
              Privacy-preserving measurement, data minimization, and transparent
              value exchange are increasingly strategic capabilities.
            </p>
          </div>
        </Reveal>
      </Slide>

      {/* ==================================================================
          26 · MANIPULATION AND BIAS — four harms struck in crimson; the
          pipeline with two entry points for bias, the data and the
          objective; guardrails drawn as rails.  [quiz: privacy-consent]
      ================================================================== */}
      <Slide
        id="manipulation-bias"
        border
        align="left"
        quizData={quiz["manipulation-bias"]}
      >
        <Head eyebrow="Consumer welfare" signal>
          Manipulation, Bias, and Consumer Welfare
        </Head>

        <Reveal delay={140} className="w-full">
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
                  className="border border-[var(--crimson)]/40 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--crimson)]"
                >
                  {h}
                </span>
              ),
            )}
          </div>
        </Reveal>

        <Reveal delay={300} className="w-full">
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
              Bias in marketing is not limited to training data; it can also
              arise from objectives that reward short-term conversion without
              regard for downstream harm.
            </p>
          </div>
        </Reveal>

        <Reveal delay={440} className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <div aria-hidden className="grid grid-cols-2 border-y-2 border-[var(--crimson)] md:grid-cols-4">
              {["objectives", "audience exclusions", "escalation", "review"].map((g, i) => (
                <span
                  key={g}
                  className={`px-4 py-3 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--charcoal-light)]/70 ${
                    i > 0 ? "md:border-l md:border-[var(--crimson)]/30" : ""
                  }`}
                >
                  {g}
                </span>
              ))}
            </div>
            <p className="mt-7 max-w-4xl font-serif text-[1.375rem] font-bold leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[1.875rem]">
              Responsible marketing requires explicit guardrails on objectives,
              audience exclusions, escalation, and review.
            </p>
          </div>
        </Reveal>

        <Discussion delay={560}>
          Should a model be considered successful if it increases conversion by
          exploiting behavioral vulnerability that a human marketer would judge
          inappropriate?
        </Discussion>
      </Slide>

      <ModulePlate
        id="module-5"
        numeral="V"
        title="Organizational Implications"
        lines={[
          "The final section considers the operating model required to deploy AI across marketing responsibly.",
          "Technology decisions matter, but organizational design usually determines whether promised value is realized.",
        ]}
      />

      {/* ==================================================================
          28 · OPERATING MODEL — six teams arranged around one shared centre;
          then decisions placed along the centralized–decentralized axis.
                                                        [quiz topic]
      ================================================================== */}
      <Slide id="operating-model" border align="left">
        <Head eyebrow="How the work is organized">
          Marketing Operating Model for AI
        </Head>

        <div className="mt-10 grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1fr_24rem] md:gap-14">
          <Reveal delay={140}>
            <p className={BODY}>
              High-performing firms pair marketing, analytics, data engineering,
              product, legal, and service teams around shared customer outcomes.
            </p>
          </Reveal>
          <Reveal delay={260}>
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
          </Reveal>
        </div>

        <Reveal delay={400} className="w-full">
          <div className="mt-12 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-8">
            <div aria-hidden className="max-w-3xl">
              <div className="flex justify-between">
                <span className={`${MICRO} text-[var(--charcoal-light)]/60`}>
                  Centralized · governance
                </span>
                <span className={`${MICRO} text-right text-[var(--crimson)]`}>
                  Decentralized · speed and domain expertise
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
        </Reveal>

        <Verdict delay={540}>
          AI maturity in marketing is ultimately an operating model question,
          not only a tooling question.
        </Verdict>
      </Slide>

      {/* ==================================================================
          29 · BUILD, BUY, OR PARTNER — the stack as three tiers narrowing
          toward the few capabilities worth building; five decision factors;
          the vendor trade set as one gain against three losses.
                                                  [quiz: operating-model]
      ================================================================== */}
      <Slide
        id="build-buy-partner"
        border
        align="left"
        quizData={quiz["build-buy-partner"]}
      >
        <Head eyebrow="The stack question">
          Build, Buy, or Partner: The Stack Question
        </Head>

        <div className="mt-10 grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1fr_22rem] md:gap-14">
          <Reveal delay={140}>
            <p className={BODY}>
              Some capabilities should be purchased as platforms, some
              configured as workflows, and a smaller set may justify internal
              development.
            </p>
          </Reveal>
          <Reveal delay={260}>
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
          </Reveal>
        </div>

        <Reveal delay={400} className="w-full">
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
                  <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--charcoal-light)]/70">
                    {f}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={540} className="w-full">
          <div className="mt-12 w-full max-w-5xl">
            <div aria-hidden className="grid max-w-3xl grid-cols-[1fr_2fr] border-b border-[var(--charcoal)]/15 pb-3">
              <span className={`${MICRO} text-[var(--charcoal-light)]/60`}>
                ↑ Adoption
              </span>
              <span className={`${MICRO} border-l border-[var(--crimson)]/40 pl-6 text-[var(--crimson)]`}>
                ↓ Transparency · portability · bargaining power
              </span>
            </div>
            <p className="mt-6 max-w-4xl font-serif text-xl leading-[1.4] text-[var(--charcoal)] md:text-[1.625rem]">
              Vendor dependence can accelerate adoption, but it may also reduce
              transparency, portability, and bargaining power.
            </p>
          </div>
        </Reveal>

        <Discussion delay={660}>
          Which marketing AI capabilities should remain proprietary in your
          firm, and which are better treated as infrastructure?
        </Discussion>
      </Slide>

      {/* ==================================================================
          30 · SYNTHESIS — the six parts of the week joined into one chain,
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

        <Head eyebrow="What to carry forward">Synthesis and Managerial Action</Head>

        <Reveal delay={140} className="w-full">
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
                <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--charcoal-light)]/70">
                  {part}
                </span>
              </li>
            ))}
          </ol>
        </Reveal>

        <ol className="mt-10 w-full max-w-4xl">
          {[
            "Treat AI in marketing as a connected decision system across insight, targeting, personalization, measurement, relationship management, and governance.",
            "Start with a narrow set of high-value decisions, define success in business terms, and build the data and accountability needed to learn.",
            "The managerial task is not to automate every interaction, but to decide where intelligence, judgment, and trust create durable advantage.",
          ].map((line, i) => (
            <Reveal key={line} as="li" delay={280 + i * 130} className="block">
              <div className="grid grid-cols-[4ch_1fr] gap-6 border-t border-[var(--charcoal)]/12 py-7 md:grid-cols-[5ch_1fr] md:gap-10">
                <span className={`${MICRO} pt-3 text-[var(--crimson)]`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-serif text-xl font-bold leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[1.75rem]">
                  {line}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={700} className="w-full">
          <div className="mt-12 flex w-full max-w-4xl flex-wrap items-baseline justify-between gap-4 border-t border-[var(--charcoal)]/12 pt-5">
            <span className={`${MICRO} text-[var(--champagne)]`}>
              End of Week 02
            </span>
            <span className={`${MICRO} font-normal text-[var(--charcoal-light)]/55`}>
              Davood Wadi, PhD · BUSI 654
            </span>
          </div>
        </Reveal>
      </Slide>
    </SlideDeck>
  );
}
