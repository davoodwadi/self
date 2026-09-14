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
// WEEK 09 — AI IN PRODUCT DEVELOPMENT
// ============================================================================
// Same deck grammar as Weeks 01–08: every slide is hand-composed for its own
// argument, with hairlines instead of boxes and crimson marking one thing.
//
// Sentences are transcribed verbatim from content.md, and each topic closes on
// its own Discussion prompt. The [cite: N] markers are set as superscript
// source numbers. content.md lists no sources for them (its References slide
// points to deepResearch.md), so they are not linked. Figures carry only words
// that already appear on their slide; any shape that suggests a quantity is
// labelled SCHEMATIC, except where content.md gives the number ("up to 12
// months") and the figure is drawn to it.
//
// Quizzes: `Slide` renders `quizData` BEFORE its section. content.md tags two
// topics [quiz] (The Paradigm Shift; Divergent vs. Convergent Thinking), so
// each quiz is attached to the slide that FOLLOWS its topic and only tests
// material the student has already passed.
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

/** Body sentence at the deck's reading size. */
const BODY =
  "font-serif text-lg leading-[1.55] text-[var(--charcoal)] md:text-[1.3125rem]";

/** A sentence promoted to display weight inside a block. */
const DISPLAY =
  "font-serif text-[1.375rem] font-bold leading-[1.3] tracking-[-0.015em] text-[var(--charcoal)] md:text-[1.875rem]";

/** A sentence one step below display, used inside rules and frames. */
const LEAD =
  "font-serif text-xl leading-[1.4] text-[var(--charcoal)] md:text-[1.625rem]";

/** Hairline that opens each later block of a slide. */
const RULED = "mt-12 w-full max-w-5xl border-t border-[var(--charcoal)]/10 pt-8";

/** Two sentences side by side under one hairline. */
const PAIR =
  "mt-12 grid w-full max-w-5xl gap-10 border-t border-[var(--charcoal)]/10 pt-8 md:grid-cols-2 md:gap-14";

/** The divider a second column takes inside PAIR. */
const COL_RULE = "md:border-l md:border-[var(--charcoal)]/10 md:pl-14";

const pad = (n: number) => String(n).padStart(2, "0");

/** Deterministic 0–1 hash, so scattered marks match between server and client. */
const hash = (n: number) => {
  const v = Math.sin(n * 12.9898 + 78.233) * 43758.5453;
  return v - Math.floor(v);
};

/** Open arrowheads whose tip sits at (x, y). */
const headRight = (x: number, y: number) => `M${x - 8} ${y - 5}l8 5l-8 5`;
const headLeft = (x: number, y: number) => `M${x + 8} ${y - 5}l-8 5l8 5`;
const headDown = (x: number, y: number) => `M${x - 5} ${y - 8}l5 8l5-8`;

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

/** Eyebrow plus slide heading. */
function Head({
  eyebrow,
  children,
}: {
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <div className={`${MICRO} text-[var(--champagne)]`}>{eyebrow}</div>
      <h2 className="mt-5 max-w-4xl font-serif text-[1.875rem] font-bold leading-[1.05] tracking-[-0.02em] text-[var(--charcoal)] md:text-[2.875rem]">
        {children}
      </h2>
    </Reveal>
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

/** A [cite: N] marker from content.md, set as superscript source numbers. */
function Cite({ n }: { n: number[] }) {
  return (
    <sup className="ml-1 whitespace-nowrap font-mono text-[0.5em] font-normal not-italic tracking-normal text-[var(--champagne)]">
      {n.join(", ")}
    </sup>
  );
}

/**
 * A bullet written as "Label: sentence". The label is set as a crimson italic
 * kicker on its own line, inside the same paragraph so it still reads as one.
 */
function Labelled({
  label,
  children,
  className = BODY,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={className}>
      <span className="mb-1.5 block font-serif text-[1.125rem] italic leading-snug text-[var(--crimson)] md:text-[1.3125rem]">
        {label}
      </span>{" "}
      {children}
    </p>
  );
}

/**
 * A number lifted from the sentence under it, set at display size with its
 * unit in small caps. `mark` turns the number crimson.
 */
function Stat({
  value,
  unit,
  mark = false,
}: {
  value: string;
  unit: string;
  mark?: boolean;
}) {
  return (
    <div aria-hidden className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
      <span
        // Headings take their family from globals.css, which Tailwind's
        // font-serif does not match; borrow it so figures echo the h2s.
        style={{ fontFamily: "var(--font-serif), serif" }}
        className={`text-[3.5rem] font-black leading-none tracking-[-0.04em] md:text-[4.75rem] ${
          mark ? "text-[var(--crimson)]" : "text-[var(--charcoal)]"
        }`}
      >
        {value}
      </span>
      <span className={`${MICRO} text-[var(--charcoal-light)]/65`}>{unit}</span>
    </div>
  );
}

/** Two labels set against each other across one rule; the right one is marked. */
function Split({
  left,
  right,
  strikeLeft = false,
}: {
  left: string;
  right: string;
  strikeLeft?: boolean;
}) {
  return (
    <div
      aria-hidden
      className="grid grid-cols-2 border-b border-[var(--charcoal)]/15 pb-3"
    >
      <span
        className={`${MICRO} pr-4 text-[var(--charcoal-light)]/55 ${
          strikeLeft ? "[text-decoration-line:line-through]" : ""
        }`}
      >
        {left}
      </span>
      <span
        className={`${MICRO} border-l border-[var(--crimson)]/40 pl-6 text-[var(--crimson)]`}
      >
        {right}
      </span>
    </div>
  );
}

/** Caption for any figure whose proportions are illustrative only. */
function Schematic({ className = "mt-1" }: { className?: string }) {
  return (
    <figcaption
      className={`${MICRO} ${className} text-[var(--charcoal-light)]/40`}
    >
      Schematic
    </figcaption>
  );
}

/** One numbered measure: numeral, its sentence, and its own small figure. */
function Measure({
  n,
  delay,
  figure,
  children,
}: {
  n: number;
  delay: number;
  figure: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Reveal as="li" delay={delay} className="block">
      <div className="grid gap-5 border-t border-[var(--charcoal)]/12 py-8 md:grid-cols-[4ch_1fr_17rem] md:items-center md:gap-10">
        <span className={`${MICRO} text-[var(--crimson)] md:self-start md:pt-2`}>
          {pad(n)}
        </span>
        <div>{children}</div>
        <div aria-hidden className="w-full max-w-[17rem]">
          {figure}
        </div>
      </div>
    </Reveal>
  );
}

/**
 * Part divider: display numeral against a ruled margin, then the part's own
 * discussion prompt. The visible label and numeral are decorative; the h2
 * carries the full "Part N: Title" heading for assistive technology.
 */
function PartPlate({
  id,
  numeral,
  title,
  lines,
  discussion,
  quizData,
}: {
  id: string;
  numeral: string;
  title: string;
  lines: React.ReactNode[];
  discussion: string;
  quizData?: CourseQuiz;
}) {
  return (
    <Slide id={id} border align="left" quizData={quizData}>
      <div className="grid w-full items-end gap-10 md:grid-cols-[minmax(0,10rem)_1fr] md:gap-16">
        <Reveal>
          <div aria-hidden>
            <div className={`${MICRO} text-[var(--champagne)]`}>Part</div>
            <div className="font-serif text-[6rem] font-black leading-[0.8] tracking-[-0.04em] text-[var(--crimson)] md:text-[9rem]">
              {numeral}
            </div>
          </div>
        </Reveal>

        <Reveal
          delay={140}
          className="md:border-l md:border-[var(--charcoal)]/12 md:pl-16"
        >
          <h2 className="font-serif text-[2.25rem] font-bold leading-[1.02] tracking-[-0.025em] text-[var(--charcoal)] md:text-[3.5rem]">
            <span className="sr-only">{`Part ${numeral}: `}</span>
            {title}
          </h2>
          <div className="mt-8 h-px w-24 bg-[var(--charcoal)]/20" />
          {lines.map((line, i) => (
            <p
              key={i}
              className={`${
                i === 0 ? "mt-8" : "mt-4"
              } max-w-2xl font-serif text-lg font-light italic leading-relaxed text-[var(--charcoal-light)] md:text-2xl`}
            >
              {line}
            </p>
          ))}
        </Reveal>
      </div>

      <div className="w-full md:pl-[14rem]">
        <Discussion delay={280}>{discussion}</Discussion>
      </div>
    </Slide>
  );
}

/**
 * Title-slide ground: a rounded product form, turned toward the viewer, drawn
 * as bare wireframe on its left that fills in to a shaded solid on its right.
 * It drifts very slowly. Texture only; nothing to read.
 */
function Wireframe() {
  const N = 10;
  const yaw = (36 * Math.PI) / 180;
  const pitch = (26 * Math.PI) / 180;
  const light = [-0.35, 0.8, 0.48];
  const dims = [1.3, 0.46, 0.9];

  // A cube's face grids pushed out onto a rounded box (the unit ball of the
  // 4-norm), so the mesh has no poles; then turned toward the viewer.
  const vertex = (face: number, i: number, j: number) => {
    const axis = face % 3;
    const c = [0, 0, 0];
    c[axis] = face < 3 ? 1 : -1;
    c[(axis + 1) % 3] = -1 + (2 * i) / N;
    c[(axis + 2) % 3] = -1 + (2 * j) / N;
    const norm = (c[0] ** 4 + c[1] ** 4 + c[2] ** 4) ** 0.25;
    const [x0, y0, z0] = c.map((k, a) => (k / norm) * dims[a]);
    const z1 = -x0 * Math.sin(yaw) + z0 * Math.cos(yaw);
    return [
      x0 * Math.cos(yaw) + z0 * Math.sin(yaw),
      y0 * Math.cos(pitch) - z1 * Math.sin(pitch),
      y0 * Math.sin(pitch) + z1 * Math.cos(pitch),
    ];
  };
  const sx = (p: number[]) => 600 + p[0] * 180;
  const sy = (p: number[]) => 380 - p[1] * 180;
  const pt = (p: number[]) => `${sx(p).toFixed(1)} ${sy(p).toFixed(1)}`;

  const faces: { z: number; d: string; fill: number; stroke: number }[] = [];
  for (let face = 0; face < 6; face++) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        const a = vertex(face, i, j);
        const b = vertex(face, i + 1, j);
        const c = vertex(face, i + 1, j + 1);
        const d = vertex(face, i, j + 1);
        const p = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
        const q = [d[0] - b[0], d[1] - b[1], d[2] - b[2]];
        let n = [
          p[1] * q[2] - p[2] * q[1],
          p[2] * q[0] - p[0] * q[2],
          p[0] * q[1] - p[1] * q[0],
        ];
        const len = Math.hypot(n[0], n[1], n[2]);
        const m = [0, 1, 2].map((k) => (a[k] + b[k] + c[k] + d[k]) / 4);
        n = n.map((k) => k / len);
        if (n[0] * m[0] + n[1] * m[1] + n[2] * m[2] < 0) n = n.map((k) => -k);
        if (n[2] <= 0) continue;

        const along = Math.min(1, Math.max(0, (sx(m) - 380) / 440));
        const t = along * along * (3 - 2 * along);
        const lambert = Math.max(
          0,
          n[0] * light[0] + n[1] * light[1] + n[2] * light[2],
        );
        faces.push({
          z: m[2],
          d: `M${pt(a)}L${pt(b)}L${pt(c)}L${pt(d)}Z`,
          fill: t * (0.012 + 0.07 * (1 - lambert)),
          stroke: 0.12 * (1 - 0.8 * t),
        });
      }
    }
  }
  faces.sort((f, g) => f.z - g.z);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_right,transparent_20%,black_65%)]"
    >
      <style>
        {
          "@keyframes w9-drift{from{transform:translate3d(0,0,0) rotate(0deg)}to{transform:translate3d(-2%,1.2%,0) rotate(-1.2deg)}}"
        }
      </style>
      <svg
        viewBox="0 0 1000 720"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full motion-safe:[animation:w9-drift_52s_ease-in-out_infinite_alternate]"
      >
        {faces.map((f, k) => (
          <path
            key={k}
            d={f.d}
            fill="var(--charcoal)"
            fillOpacity={f.fill.toFixed(3)}
            stroke="var(--charcoal)"
            strokeOpacity={f.stroke.toFixed(3)}
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
        ))}
      </svg>
    </div>
  );
}

export default function Week09ProductDevelopment() {
  return (
    <SlideDeck>
      <ScrollProgress label="Week 09" />

      {/* ==================================================================
          01 · TITLE — masthead over a faint wireframe that fills in to a
          solid; the arrival term of the subtitle marked.
      ================================================================== */}
      <Slide id="title" align="left" className="relative overflow-hidden">
        <Wireframe />

        <Reveal className="relative">
          <div
            className={`${MICRO} flex items-center gap-4 text-[var(--champagne)]`}
          >
            <span className="h-px w-10 bg-[var(--crimson)]" />
            Week 09
          </div>
        </Reveal>

        <Reveal delay={120} className="relative">
          <h1 className="mt-10 max-w-4xl font-serif text-[clamp(2.25rem,6.2vw,4.75rem)] font-black leading-[0.95] tracking-[-0.035em] text-[var(--charcoal)]">
            The Evolution of Product Development
          </h1>
        </Reveal>

        <Reveal delay={240} className="relative w-full">
          <div className="mt-12 h-px w-full bg-[var(--charcoal)]/15" />
          <p className="mt-6 max-w-3xl font-serif text-xl font-light italic leading-relaxed text-[var(--charcoal-light)] md:text-[1.75rem]">
            From Computer-Aided Design to{" "}
            <span className="text-[var(--crimson)]">
              Computer-Augmented Invention
            </span>
          </p>
        </Reveal>

        <Reveal delay={360} className="relative w-full">
          <div className="mt-16 flex w-full flex-wrap items-baseline justify-between gap-4 border-t border-[var(--charcoal)]/12 pt-5">
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
          02 · THE PARADIGM SHIFT — isolated tasks gathered onto one
          lifecycle loop; a band that starts as a scatter at ideation and
          firms up toward regulatory compliance.              [quiz topic]
      ================================================================== */}
      <Slide id="paradigm-shift" border align="left">
        <Head eyebrow="Opening">The Paradigm Shift</Head>

        <Reveal delay={140} className="w-full">
          <p className={`${DISPLAY} mt-9 max-w-4xl`}>
            Product development is undergoing a fundamental transformation.
          </p>
        </Reveal>

        <div className={PAIR}>
          <Reveal delay={260}>
            <p className={BODY}>
              Moving from isolated tasks to a reshaped lifecycle.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 400 150"
              className="mt-7 w-full max-w-[25rem]"
              fill="none"
            >
              {[
                [30, 40],
                [76, 28],
                [50, 82],
                [98, 70],
              ].map(([x, y]) => (
                <rect
                  key={`${x}-${y}`}
                  x={x - 5.5}
                  y={y - 5.5}
                  width="11"
                  height="11"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.6"
                />
              ))}
              <text {...SVG_LABEL} x="10" y="136" fill="var(--charcoal)" fillOpacity="0.65">
                ISOLATED TASKS
              </text>

              <path d="M140 60H182" stroke="var(--charcoal)" strokeOpacity="0.45" />
              <path d={headRight(190, 60)} stroke="var(--charcoal)" strokeOpacity="0.6" />

              <circle cx="296" cy="62" r="44" stroke="var(--crimson)" strokeWidth="1.5" />
              <path d={headRight(0, 0)} transform="translate(327.1 30.9) rotate(45)" stroke="var(--crimson)" strokeWidth="1.5" />
              <path d={headRight(0, 0)} transform="translate(264.9 93.1) rotate(225)" stroke="var(--crimson)" strokeWidth="1.5" />
              {[
                [296, 18],
                [340, 62],
                [296, 106],
                [252, 62],
              ].map(([x, y]) => (
                <rect
                  key={`${x}-${y}`}
                  x={x - 5.5}
                  y={y - 5.5}
                  width="11"
                  height="11"
                  fill="var(--background)"
                  stroke="var(--charcoal)"
                  strokeOpacity="0.6"
                />
              ))}
              <text {...SVG_LABEL} x="296" y="136" textAnchor="middle" fill="var(--crimson)">
                RESHAPED LIFECYCLE
              </text>
            </svg>
          </Reveal>

          <Reveal delay={380} className={COL_RULE}>
            <p className={BODY}>
              Covers the &quot;fuzzy front end&quot; of ideation to regulatory
              compliance.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 400 150"
              className="mt-7 w-full max-w-[25rem]"
              fill="none"
            >
              <text {...SVG_LABEL} x="10" y="36" fill="var(--charcoal)" fillOpacity="0.65">
                FUZZY FRONT END
              </text>
              {Array.from({ length: 110 }, (_, k) => (
                <circle
                  key={k}
                  cx={(10 + 122 * Math.sqrt(hash(k + 11))).toFixed(1)}
                  cy={(49 + 24 * hash(k + 57)).toFixed(1)}
                  r="1.2"
                  fill="var(--charcoal)"
                  fillOpacity="0.45"
                />
              ))}
              <rect x="132" y="48" width="236" height="26" fill="var(--charcoal)" fillOpacity="0.16" />
              <rect x="370" y="48" width="20" height="26" fill="var(--crimson)" />
              <text {...SVG_LABEL} x="10" y="100" fill="var(--charcoal)" fillOpacity="0.65">
                IDEATION
              </text>
              <text {...SVG_LABEL} x="390" y="100" textAnchor="end" fill="var(--crimson)">
                REGULATORY COMPLIANCE
              </text>
            </svg>
          </Reveal>
        </div>

        <Discussion delay={500}>
          How does &quot;augmented invention&quot; differ from traditional
          &quot;aided design&quot; in your view?
        </Discussion>
      </Slide>

      {/* ==================================================================
          03 · THREE TRANSFORMATIVE SHIFTS — three columns: a model that
          feeds back into itself; mainstream reaching past the additive edge;
          code lines each checked.                  [quiz: paradigm shift]
      ================================================================== */}
      <Slide
        id="three-shifts"
        border
        align="left"
        quizData={quiz["three-shifts"]}
      >
        <Head eyebrow="Opening">Three Transformative Shifts</Head>

        <ol className="mt-11 grid w-full max-w-5xl gap-12 md:grid-cols-3 md:gap-0">
          <Reveal as="li" delay={140} className="block md:pr-8">
            <span className={`${MICRO} text-[var(--crimson)]`}>01</span>
            <svg
              aria-hidden
              viewBox="0 0 280 116"
              className="mt-5 w-full max-w-[17.5rem]"
              fill="none"
            >
              <rect x="10.5" y="40.5" width="74" height="40" stroke="var(--charcoal)" strokeOpacity="0.55" />
              <text {...SVG_LABEL} x="47.5" y="64" textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.65">
                MODEL
              </text>
              <path d="M98 60.5H146" stroke="var(--charcoal)" strokeOpacity="0.45" />
              <path d={headRight(154, 60.5)} stroke="var(--charcoal)" strokeOpacity="0.6" />
              <rect x="170.5" y="40.5" width="74" height="40" stroke="var(--charcoal)" strokeOpacity="0.55" />
              <text {...SVG_LABEL} x="207.5" y="64" textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.65">
                MODEL
              </text>
              <path d="M226 40C226 12 188 12 188 36" stroke="var(--crimson)" strokeWidth="1.5" />
              <path d={headDown(188, 40)} stroke="var(--crimson)" strokeWidth="1.5" />
              <text {...SVG_LABEL} x="47.5" y="106" textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.65">
                SIMULATION
              </text>
              <text {...SVG_LABEL} x="207.5" y="106" textAnchor="middle" fill="var(--crimson)">
                EMULATION
              </text>
            </svg>
            <Labelled
              label="From Simulation to Emulation:"
              className="mt-6 font-serif text-lg leading-[1.55] text-[var(--charcoal)]"
            >
              Dynamic, self-learning models.
            </Labelled>
          </Reveal>

          <Reveal
            as="li"
            delay={260}
            className="block md:border-l md:border-[var(--charcoal)]/10 md:px-8"
          >
            <span className={`${MICRO} text-[var(--crimson)]`}>02</span>
            <figure aria-hidden className="mt-5 w-full max-w-[17.5rem]">
              <svg viewBox="0 0 280 116" className="w-full" fill="none">
                <text {...SVG_LABEL} x="10" y="26" fill="var(--charcoal)" fillOpacity="0.65">
                  ADDITIVE
                </text>
                <text {...SVG_LABEL} x="102" y="26" fill="var(--charcoal)" fillOpacity="0.45">
                  3D PRINTING
                </text>
                <rect x="10" y="36" width="84" height="12" fill="var(--charcoal)" fillOpacity="0.4" />
                <text {...SVG_LABEL} x="10" y="78" fill="var(--crimson)">
                  MAINSTREAM
                </text>
                <rect x="10" y="88" width="260" height="12" fill="var(--crimson)" />
                <path d="M94.5 14V110" stroke="var(--charcoal)" strokeOpacity="0.4" strokeDasharray="2 3" />
              </svg>
              <Schematic />
            </figure>
            <Labelled
              label="From Additive to Mainstream Generative Engineering:"
              className="mt-6 font-serif text-lg leading-[1.55] text-[var(--charcoal)]"
            >
              Beyond 3D printing.
            </Labelled>
          </Reveal>

          <Reveal
            as="li"
            delay={380}
            className="block md:border-l md:border-[var(--charcoal)]/10 md:pl-8"
          >
            <span className={`${MICRO} text-[var(--crimson)]`}>03</span>
            <svg
              aria-hidden
              viewBox="0 0 280 116"
              className="mt-5 w-full max-w-[17.5rem]"
              fill="none"
            >
              {[
                [10, 120],
                [26, 96],
                [26, 150],
                [42, 84],
                [10, 60],
              ].map(([x, w], k) => (
                <g key={k}>
                  <path d={`M${x} ${18 + k * 16}H${x + w}`} stroke="var(--charcoal)" strokeOpacity="0.45" strokeWidth="2" />
                  <path d={`M232 ${18 + k * 16}l4 4l9-9`} stroke="var(--crimson)" strokeWidth="1.5" />
                </g>
              ))}
              <text {...SVG_LABEL} x="10" y="108" fill="var(--charcoal)" fillOpacity="0.65">
                CODE-LEVEL GOVERNANCE
              </text>
            </svg>
            <Labelled
              label="The Rise of Autonomous Compliance:"
              className="mt-6 font-serif text-lg leading-[1.55] text-[var(--charcoal)]"
            >
              Automated, code-level governance.
            </Labelled>
          </Reveal>
        </ol>

        <Discussion delay={500}>
          Which of these three shifts poses the greatest challenge to legacy
          organizations?
        </Discussion>
      </Slide>

      <PartPlate
        id="part-1"
        numeral="1"
        title="AI-Driven Ideation"
        lines={[
          'Focusing on the "divergent" phase of design.',
          'Large Language Models (LLMs) as "ideation engines".',
          "Generating novel combinations rather than just retrieving information.",
        ]}
        discussion="Can LLMs truly be creative, or are they just recombining existing concepts?"
      />

      {/* ==================================================================
          05 · DIVERGENT VS. CONVERGENT THINKING — one point fanning out to
          the solution space and back in, the divergent half marked; small
          ideas held, the big one dashed; a worn loop broken out of.
                                                              [quiz topic]
      ================================================================== */}
      <Slide id="divergent-convergent" border align="left">
        <Head eyebrow="Part 1 · 01 / 05">Divergent vs. Convergent Thinking</Head>

        <Reveal delay={140} className="w-full">
          <p className={`${DISPLAY} mt-9 max-w-4xl`}>
            LLMs excel at expanding the solution space (&quot;persistence&quot;
            and &quot;flexibility&quot;)
            <Cite n={[1, 2]} />.
          </p>
          <svg
            aria-hidden
            viewBox="0 0 800 184"
            className="mt-8 w-full max-w-5xl"
            fill="none"
          >
            <path d="M400 6V168" stroke="var(--charcoal)" strokeOpacity="0.18" strokeDasharray="2 4" />
            {[16, 40, 64, 88, 112, 136, 160].map((y) => (
              <g key={y}>
                <path d={`M40 88L400 ${y}`} stroke="var(--crimson)" strokeOpacity="0.75" />
                <path d={`M400 ${y}L760 88`} stroke="var(--charcoal)" strokeOpacity="0.3" />
                <circle cx="400" cy={y} r="3" fill="var(--crimson)" />
              </g>
            ))}
            <circle cx="40" cy="88" r="4" fill="var(--charcoal)" fillOpacity="0.6" />
            <circle cx="760" cy="88" r="4" fill="var(--charcoal)" fillOpacity="0.6" />
            <text {...SVG_LABEL} x="40" y="20" fill="var(--crimson)">
              DIVERGENT
            </text>
            <text {...SVG_LABEL} x="760" y="20" textAnchor="end" fill="var(--charcoal)" fillOpacity="0.65">
              CONVERGENT
            </text>
            <text {...SVG_LABEL} x="400" y="180" textAnchor="middle" fill="var(--crimson)">
              SOLUTION SPACE
            </text>
          </svg>
        </Reveal>

        <div className={PAIR}>
          <Reveal delay={280}>
            <p className={BODY}>
              Better at &quot;small ideas&quot; (incremental) than &quot;big
              ideas&quot; (paradigm shifts)
              <Cite n={[2]} />.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 400 128"
              className="mt-7 w-full max-w-[25rem]"
              fill="none"
            >
              {Array.from({ length: 12 }, (_, k) => (
                <circle
                  key={k}
                  cx={24 + (k % 4) * 22}
                  cy={34 + Math.floor(k / 4) * 22}
                  r="4"
                  fill="var(--crimson)"
                />
              ))}
              <text {...SVG_LABEL} x="20" y="118" fill="var(--crimson)">
                SMALL IDEAS
              </text>
              <circle cx="280" cy="56" r="44" stroke="var(--charcoal)" strokeOpacity="0.45" strokeDasharray="4 4" />
              <text {...SVG_LABEL} x="280" y="118" textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.65">
                BIG IDEAS
              </text>
            </svg>
          </Reveal>

          <Reveal delay={400} className={COL_RULE}>
            <p className={BODY}>
              Acting as co-creators to disrupt habitual thought patterns.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 400 128"
              className="mt-7 w-full max-w-[25rem]"
              fill="none"
            >
              {[
                [70, 34],
                [65, 30],
                [75, 38],
              ].map(([rx, ry]) => (
                <ellipse key={rx} cx="96" cy="56" rx={rx} ry={ry} stroke="var(--charcoal)" strokeOpacity="0.3" />
              ))}
              <path d="M166 56C168 26 260 18 372 18" stroke="var(--crimson)" strokeWidth="1.5" />
              <path d={headRight(380, 18)} stroke="var(--crimson)" strokeWidth="1.5" />
              <text {...SVG_LABEL} x="380" y="46" textAnchor="end" fill="var(--crimson)">
                CO-CREATORS
              </text>
              <text {...SVG_LABEL} x="22" y="118" fill="var(--charcoal)" fillOpacity="0.65">
                HABITUAL THOUGHT PATTERNS
              </text>
            </svg>
          </Reveal>
        </div>

        <Discussion delay={520}>
          Where should human designers intervene in the LLM ideation process?
        </Discussion>
      </Slide>

      {/* ==================================================================
          06 · PERSONA SIMULATION — six personas pressing on one concept,
          the skeptical CTO marked; a live web app passed into stacked
          memory; an interface laid on its design-system grid.
                                            [quiz: divergent vs. convergent]
      ================================================================== */}
      <Slide
        id="persona-simulation"
        border
        align="left"
        quizData={quiz["persona-simulation"]}
      >
        <Head eyebrow="Part 1 · 02 / 05">Persona Simulation</Head>

        <Reveal delay={140} className="w-full">
          <p className={`${LEAD} mt-9 max-w-4xl`}>
            Simulating diverse user personas to stress-test concepts (e.g.,
            &quot;skeptical CTO&quot;).
          </p>
          <svg
            aria-hidden
            viewBox="0 0 800 176"
            className="mt-8 w-full max-w-5xl"
            fill="none"
          >
            <rect x="345.5" y="66.5" width="109" height="40" stroke="var(--charcoal)" strokeOpacity="0.6" />
            <text {...SVG_LABEL} x="401" y="90" textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.75">
              CONCEPT
            </text>
            {[
              [190, 30, -1],
              [140, 86, -1],
              [190, 142, -1],
              [610, 30, 1],
              [660, 86, 1],
              [610, 142, 1],
            ].map(([x, y, side]) => {
              const marked = x === 660;
              const tone = marked ? "var(--crimson)" : "var(--charcoal)";
              const opacity = marked ? 1 : 0.55;
              const end = 86 + (y - 86) * 0.3;
              const start = x - side * 16;
              const d =
                side < 0
                  ? `M${start} ${y}C${start + 40} ${y} 300 ${end} 337 ${end}`
                  : `M${start} ${y}C${start - 40} ${y} 500 ${end} 463 ${end}`;
              return (
                <g key={`${x}-${y}`}>
                  <circle cx={x} cy={y - 5} r="5" stroke={tone} strokeOpacity={opacity} strokeWidth={marked ? 1.5 : 1} />
                  <path d={`M${x - 9} ${y + 11}A9 9 0 0 1 ${x + 9} ${y + 11}`} stroke={tone} strokeOpacity={opacity} strokeWidth={marked ? 1.5 : 1} />
                  <path d={d} stroke={tone} strokeOpacity={marked ? 1 : 0.35} />
                  <path
                    d={side < 0 ? headRight(345, end) : headLeft(455, end)}
                    stroke={tone}
                    strokeOpacity={marked ? 1 : 0.5}
                  />
                </g>
              );
            })}
            <text {...SVG_LABEL} x="682" y="90" fill="var(--crimson)">
              SKEPTICAL CTO
            </text>
            <text {...SVG_LABEL} x="40" y="170" fill="var(--charcoal)" fillOpacity="0.65">
              DIVERSE USER PERSONAS
            </text>
          </svg>
        </Reveal>

        <div className={PAIR}>
          <Reveal delay={280}>
            <p className={BODY}>
              Tools like Figr parse live web apps to build context-aware memory
              <Cite n={[3, 4]} />.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 400 120"
              className="mt-7 w-full max-w-[25rem]"
              fill="none"
            >
              <rect x="0.5" y="18.5" width="128" height="78" stroke="var(--charcoal)" strokeOpacity="0.55" />
              <path d="M0.5 32.5H128.5" stroke="var(--charcoal)" strokeOpacity="0.4" />
              {[10, 18, 26].map((x) => (
                <circle key={x} cx={x} cy="25.5" r="1.8" fill="var(--charcoal)" fillOpacity="0.45" />
              ))}
              {[
                [50, 76],
                [62, 98],
                [74, 56],
              ].map(([y, w]) => (
                <path key={y} d={`M14 ${y}H${14 + w}`} stroke="var(--charcoal)" strokeOpacity="0.25" strokeWidth="2" />
              ))}
              <text {...SVG_LABEL} x="0" y="114" fill="var(--charcoal)" fillOpacity="0.65">
                LIVE WEB APPS
              </text>
              <path d="M142 57H186" stroke="var(--charcoal)" strokeOpacity="0.45" />
              <path d={headRight(194, 57)} stroke="var(--charcoal)" strokeOpacity="0.6" />
              {[26.5, 46.5, 66.5].map((y) => (
                <rect key={y} x="214.5" y={y} width="120" height="14" stroke="var(--crimson)" />
              ))}
              <text {...SVG_LABEL} x="214" y="114" fill="var(--crimson)">
                CONTEXT-AWARE MEMORY
              </text>
            </svg>
          </Reveal>

          <Reveal delay={400} className={COL_RULE}>
            <p className={BODY}>
              Suggesting UX improvements grounded in specific design systems.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 400 120"
              className="mt-7 w-full max-w-[25rem]"
              fill="none"
            >
              {[20, 110, 200, 290, 380].map((x) => (
                <path key={x} d={`M${x} 4V98`} stroke="var(--charcoal)" strokeOpacity="0.14" strokeDasharray="2 3" />
              ))}
              <rect x="20" y="10" width="360" height="12" fill="var(--charcoal)" fillOpacity="0.16" />
              <rect x="20.5" y="32.5" width="179" height="42" stroke="var(--charcoal)" strokeOpacity="0.45" />
              <rect x="200.5" y="32.5" width="179" height="42" stroke="var(--charcoal)" strokeOpacity="0.45" />
              <path d="M34 46H120M34 58H96M214 46H310M214 58H270" stroke="var(--charcoal)" strokeOpacity="0.25" strokeWidth="2" />
              <rect x="290" y="84" width="90" height="12" fill="var(--crimson)" />
              <text {...SVG_LABEL} x="20" y="116" fill="var(--charcoal)" fillOpacity="0.65">
                DESIGN SYSTEMS
              </text>
            </svg>
          </Reveal>
        </div>

        <Discussion delay={520}>
          What are the risks of relying on simulated personas instead of real
          users?
        </Discussion>
      </Slide>

      {/* ==================================================================
          07 · PREDICTIVE MARKET TRENDS — a record that runs up to one
          point and continues as a dashed forecast; a scatter of data with
          one open region ringed; twelve months set large.
      ================================================================== */}
      <Slide id="market-trends" border align="left">
        <Head eyebrow="Part 1 · 03 / 05">Predictive Market Trends</Head>

        <Reveal delay={140} className="w-full">
          <p className={`${DISPLAY} mt-9 max-w-4xl`}>
            Moving from reactive analytics to predictive forecasting.
          </p>
          <figure aria-hidden className="mt-8 w-full max-w-5xl">
            <svg viewBox="0 0 800 136" className="w-full" fill="none">
              <path d="M20 110H780" stroke="var(--charcoal)" strokeOpacity="0.25" />
              <path d="M400 10V110" stroke="var(--charcoal)" strokeOpacity="0.3" strokeDasharray="2 4" />
              <path d="M400 62L780 14V70Z" fill="var(--crimson)" fillOpacity="0.07" />
              <path d="M20 88C80 78 120 96 180 80S300 56 400 62" stroke="var(--charcoal)" strokeOpacity="0.6" strokeWidth="1.5" />
              <path d="M400 62C470 66 560 40 780 38" stroke="var(--crimson)" strokeWidth="1.5" strokeDasharray="6 5" />
              <circle cx="400" cy="62" r="3.5" fill="var(--charcoal)" />
              <text {...SVG_LABEL} x="20" y="130" fill="var(--charcoal)" fillOpacity="0.65">
                REACTIVE ANALYTICS
              </text>
              <text {...SVG_LABEL} x="780" y="130" textAnchor="end" fill="var(--crimson)">
                PREDICTIVE FORECASTING
              </text>
            </svg>
            <Schematic />
          </figure>
        </Reveal>

        <div className={PAIR}>
          <Reveal delay={280}>
            <p className={BODY}>
              Identifying &quot;white space&quot; opportunities through
              unstructured data analysis.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 400 120"
              className="mt-7 w-full max-w-[25rem]"
              fill="none"
            >
              {Array.from({ length: 240 }, (_, k) => {
                const x = 8 + 384 * hash(k + 301);
                const y = 8 + 104 * hash(k + 613);
                if (((x - 250) / 80) ** 2 + ((y - 60) / 40) ** 2 < 1) return null;
                return (
                  <circle
                    key={k}
                    cx={x.toFixed(1)}
                    cy={y.toFixed(1)}
                    r="1.6"
                    fill="var(--charcoal)"
                    fillOpacity="0.4"
                  />
                );
              })}
              <ellipse cx="250" cy="60" rx="70" ry="31" stroke="var(--crimson)" strokeDasharray="4 4" />
              <text {...SVG_LABEL} x="251" y="64" textAnchor="middle" fill="var(--crimson)">
                WHITE SPACE
              </text>
            </svg>
          </Reveal>

          <Reveal delay={400} className={COL_RULE}>
            <Stat value="12" unit="months in advance" mark />
            <svg
              aria-hidden
              viewBox="0 0 400 28"
              className="mt-5 w-full max-w-[25rem]"
              fill="none"
            >
              {Array.from({ length: 13 }, (_, k) => (
                <path
                  key={k}
                  d={`M${(10 + k * 31.5).toFixed(1)} ${k % 12 === 0 ? 4 : 9}V24`}
                  stroke="var(--charcoal)"
                  strokeOpacity={k % 12 === 0 ? 0.6 : 0.3}
                />
              ))}
              <path d="M10 16.5H388" stroke="var(--crimson)" strokeWidth="2" />
            </svg>
            <p className={`${BODY} mt-6`}>
              Tools like Glimpse track trends up to 12 months in advance
              <Cite n={[5]} />.
            </p>
          </Reveal>
        </div>

        <Discussion delay={520}>
          How can companies distinguish between a temporary fad and a
          sustainable trend using AI?
        </Discussion>
      </Slide>

      {/* ==================================================================
          08 · UNCOVERING LATENT NEEDS — a dense field of conversations
          read onto one sentiment scale; a preference line that turns after
          the last focus group; product and market cut to fit.
      ================================================================== */}
      <Slide id="latent-needs" border align="left">
        <Head eyebrow="Part 1 · 04 / 05">Uncovering Latent Needs</Head>

        <Reveal delay={140} className="w-full">
          <p className={`${LEAD} mt-9 max-w-4xl`}>
            Sentiment analysis on millions of conversations (Brandwatch,
            Sprinklr)
            <Cite n={[6]} />.
          </p>
          <figure aria-hidden className="mt-8 w-full max-w-5xl">
            <svg viewBox="0 0 800 150" className="w-full" fill="none">
              {Array.from({ length: 520 }, (_, k) => (
                <circle
                  key={k}
                  cx={(20 + 340 * hash(k + 1201)).toFixed(1)}
                  cy={(12 + 100 * hash(k + 1777)).toFixed(1)}
                  r="1"
                  fill="var(--charcoal)"
                  fillOpacity="0.35"
                />
              ))}
              <path d="M382 62H436" stroke="var(--charcoal)" strokeOpacity="0.45" />
              <path d={headRight(444, 62)} stroke="var(--charcoal)" strokeOpacity="0.6" />
              <path d="M470 62H770M470 54V70M770 54V70" stroke="var(--charcoal)" strokeOpacity="0.5" />
              {[530, 590, 650, 710].map((x) => (
                <path key={x} d={`M${x} 58V66`} stroke="var(--charcoal)" strokeOpacity="0.25" />
              ))}
              <text x="470" y="96" textAnchor="middle" fontSize="18" fontFamily="var(--font-serif), serif" fill="var(--charcoal)" fillOpacity="0.6">
                −
              </text>
              <text x="770" y="96" textAnchor="middle" fontSize="18" fontFamily="var(--font-serif), serif" fill="var(--charcoal)" fillOpacity="0.6">
                +
              </text>
              <path d="M683 40H697L690 52Z" fill="var(--crimson)" />
              <text {...SVG_LABEL} x="20" y="140" fill="var(--charcoal)" fillOpacity="0.65">
                MILLIONS OF CONVERSATIONS
              </text>
              <text {...SVG_LABEL} x="770" y="140" textAnchor="end" fill="var(--crimson)">
                SENTIMENT ANALYSIS
              </text>
            </svg>
            <Schematic />
          </figure>
        </Reveal>

        <div className={PAIR}>
          <Reveal delay={280}>
            <p className={BODY}>
              Detecting shifts in consumer preference missed by focus groups.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 400 130"
              className="mt-7 w-full max-w-[25rem]"
              fill="none"
            >
              <text {...SVG_LABEL} x="10" y="16" fill="var(--charcoal)" fillOpacity="0.65">
                CONSUMER PREFERENCE
              </text>
              <path d="M10 88L230 80C270 78 300 40 390 22" stroke="var(--charcoal)" strokeOpacity="0.55" strokeWidth="1.5" />
              {[40, 100, 160].map((x) => {
                const y = 88 - (8 * (x - 10)) / 220;
                return (
                  <rect
                    key={x}
                    x={x - 4.5}
                    y={(y - 4.5).toFixed(1)}
                    width="9"
                    height="9"
                    fill="var(--background)"
                    stroke="var(--charcoal)"
                    strokeOpacity="0.65"
                  />
                );
              })}
              <circle cx="230" cy="80" r="5" fill="var(--background)" stroke="var(--crimson)" strokeWidth="1.5" />
              <text {...SVG_LABEL} x="231" y="104" textAnchor="middle" fill="var(--crimson)">
                SHIFT
              </text>
              <text {...SVG_LABEL} x="40" y="124" fill="var(--charcoal)" fillOpacity="0.65">
                FOCUS GROUPS
              </text>
            </svg>
          </Reveal>

          <Reveal delay={400} className={COL_RULE}>
            <p className={BODY}>
              Validating &quot;product-market fit&quot; using synthetic data
              <Cite n={[7]} />.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 400 110"
              className="mt-7 w-full max-w-[25rem]"
              fill="none"
            >
              {/* two blocks sharing one puzzle-cut edge, the cut marked */}
              <path d="M0.5 14.5H200V32A10 10 0 0 1 200 52V69.5H0.5Z" fill="var(--charcoal)" fillOpacity="0.05" stroke="var(--charcoal)" strokeOpacity="0.6" />
              <path d="M200 14.5H399.5V69.5H200V52A10 10 0 0 0 200 32Z" stroke="var(--charcoal)" strokeOpacity="0.6" />
              <path d="M200 14.5V32A10 10 0 0 1 200 52V69.5" stroke="var(--crimson)" strokeWidth="2" />
              <text {...SVG_LABEL} x="98" y="45" textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.75">
                PRODUCT
              </text>
              <text {...SVG_LABEL} x="304" y="45" textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.75">
                MARKET
              </text>
              <text {...SVG_LABEL} x="201" y="98" textAnchor="middle" fill="var(--crimson)">
                PRODUCT-MARKET FIT
              </text>
            </svg>
          </Reveal>
        </div>

        <Discussion delay={520}>
          Is synthetic data a valid substitute for real-world consumer
          behavior?
        </Discussion>
      </Slide>

      {/* ==================================================================
          09 · AUTOMATED COMPETITOR ANALYSIS — manual battlecards struck for
          autonomous agents; three sources scraped as broken lines that
          gather into one marked block of intelligence.
      ================================================================== */}
      <Slide id="competitor-analysis" border align="left">
        <Head eyebrow="Part 1 · 05 / 05">Automated Competitor Analysis</Head>

        <Reveal delay={140} className="w-full">
          <p className={`${DISPLAY} mt-9 max-w-4xl`}>
            Autonomous agents replacing manual &quot;battlecards&quot;.
          </p>
          <div aria-hidden className="mt-7 max-w-3xl">
            <Split
              left='Manual "battlecards"'
              right="Autonomous agents"
              strikeLeft
            />
          </div>
        </Reveal>

        <Reveal delay={280} className="w-full">
          <div className={RULED}>
            <div className="grid gap-8 md:grid-cols-2 md:gap-14">
              <p className={BODY}>
                Real-time scraping of documentation, pricing, and release notes
                (Crayon, Klue)
                <Cite n={[8, 9]} />.
              </p>
              <p className={BODY}>
                Synthesizing fragmented data into actionable intelligence.
              </p>
            </div>
            <svg
              aria-hidden
              viewBox="0 0 800 136"
              className="mt-9 w-full"
              fill="none"
            >
              {(
                [
                  ["DOCUMENTATION", 22],
                  ["PRICING", 68],
                  ["RELEASE NOTES", 114],
                ] as const
              ).map(([label, y]) => (
                <g key={label}>
                  <path
                    d={`M20.5 ${y - 12.5}H34L40.5 ${y - 6}V${y + 12.5}H20.5Z`}
                    stroke="var(--charcoal)"
                    strokeOpacity="0.6"
                  />
                  <text {...SVG_LABEL} x="54" y={y + 3.5} fill="var(--charcoal)" fillOpacity="0.7">
                    {label}
                  </text>
                  <path
                    d={`M190 ${y}C360 ${y} 420 68 564 68`}
                    stroke="var(--charcoal)"
                    strokeOpacity="0.45"
                    strokeDasharray="3 5"
                  />
                </g>
              ))}
              <path d={headRight(572, 68)} stroke="var(--charcoal)" strokeOpacity="0.6" />
              <rect x="584.5" y="48.5" width="195" height="39" stroke="var(--crimson)" strokeWidth="1.5" />
              <path d="M600 62H704M600 74H662" stroke="var(--crimson)" strokeOpacity="0.5" strokeWidth="2" />
              <text {...SVG_LABEL} x="682" y="110" textAnchor="middle" fill="var(--crimson)">
                ACTIONABLE INTELLIGENCE
              </text>
            </svg>
          </div>
        </Reveal>

        <Discussion delay={420}>
          How does real-time competitive intelligence change strategic planning
          cycles?
        </Discussion>
      </Slide>

      <PartPlate
        id="part-2"
        numeral="2"
        title="Generative Design & Engineering"
        lines={[
          "Transitioning from passive tools to active participants in physics.",
          "AI-driven Topology Optimization (TO) solving computational hurdles.",
          <>
            Reducing optimization time from days to minutes (Diabatix
            ColdStream)
            <Cite n={[11, 12]} />.
          </>,
        ]}
        discussion="What happens to the role of the engineer when AI optimizes the geometry?"
      />

      {/* ==================================================================
          11 · MAINSTREAM MANUFACTURABILITY — four processes in a row: the
          additive cell bracketed above, all four bracketed and marked
          below.
      ================================================================== */}
      <Slide id="manufacturability" border align="left">
        <Head eyebrow="Part 2 · 01 / 04">Mainstream Manufacturability</Head>

        <Reveal delay={140} className="w-full">
          <p className={`${DISPLAY} mt-9 max-w-4xl`}>
            Shifting from &quot;design for additive&quot; to &quot;design for
            all&quot;.
          </p>
        </Reveal>

        <Reveal delay={280} className="w-full">
          <div className={RULED}>
            <p className={`${BODY} max-w-4xl`}>
              Optimizing for traditional processes: casting, molding, machining
              <Cite n={[13, 14]} />.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 800 128"
              className="mt-9 w-full"
              fill="none"
            >
              <path d="M20 40V30H200V40" stroke="var(--charcoal)" strokeOpacity="0.5" />
              <text {...SVG_LABEL} x="20" y="20" fill="var(--charcoal)" fillOpacity="0.6">
                DESIGN FOR ADDITIVE
              </text>
              {["ADDITIVE", "CASTING", "MOLDING", "MACHINING"].map((label, k) => (
                <g key={label}>
                  <rect
                    x={20.5 + k * 190}
                    y="50.5"
                    width="179"
                    height="34"
                    fill={k === 0 ? "var(--charcoal)" : "none"}
                    fillOpacity={k === 0 ? 0.07 : undefined}
                    stroke="var(--charcoal)"
                    strokeOpacity="0.45"
                  />
                  <text {...SVG_LABEL} x={110 + k * 190} y="71" textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.75">
                    {label}
                  </text>
                </g>
              ))}
              <path d="M20 94V104H770V94" stroke="var(--crimson)" strokeWidth="1.5" />
              <text {...SVG_LABEL} x="396" y="122" textAnchor="middle" fill="var(--crimson)">
                DESIGN FOR ALL
              </text>
            </svg>
          </div>
        </Reveal>

        <Reveal delay={420} className="w-full">
          <div className={RULED}>
            <p className={`${LEAD} max-w-4xl`}>
              Platforms like InfinitForm ensuring physical producibility.
            </p>
          </div>
        </Reveal>

        <Discussion delay={540}>
          Why has generative design historically been limited to 3D printing?
        </Discussion>
      </Slide>

      {/* ==================================================================
          12 · PHYSICS-INFORMED NEURAL NETWORKS (PINNs) — a network held
          inside a frame of physical laws; one smooth prediction through
          four sparse points; the solver's long wait against real time.
      ================================================================== */}
      <Slide id="pinns" border align="left">
        <Head eyebrow="Part 2 · 02 / 04">
          Physics-Informed Neural Networks (PINNs)
        </Head>

        <Reveal delay={140} className="w-full">
          <p className={`${LEAD} mt-9 max-w-4xl`}>
            Embedding physical laws (Navier-Stokes) into neural networks
            <Cite n={[15, 16]} />.
          </p>
          <svg
            aria-hidden
            viewBox="0 0 800 164"
            className="mt-8 w-full max-w-5xl"
            fill="none"
          >
            {(() => {
              const layers = [
                [300, 3],
                [400, 5],
                [500, 5],
                [600, 2],
              ];
              const at = layers.map(([x, n]) =>
                Array.from({ length: n }, (_, i) => [x, 82 + (i - (n - 1) / 2) * 28]),
              );
              return (
                <>
                  {at.slice(1).map((col, l) =>
                    col.flatMap(([x2, y2]) =>
                      at[l].map(([x1, y1]) => (
                        <path
                          key={`${x1}-${y1}-${x2}-${y2}`}
                          d={`M${x1} ${y1}L${x2} ${y2}`}
                          stroke="var(--charcoal)"
                          strokeOpacity="0.15"
                        />
                      )),
                    ),
                  )}
                  {at.flat().map(([x, y]) => (
                    <circle
                      key={`${x}-${y}`}
                      cx={x}
                      cy={y}
                      r="6"
                      fill="var(--background)"
                      stroke="var(--charcoal)"
                      strokeOpacity="0.6"
                    />
                  ))}
                </>
              );
            })()}
            <rect x="262.5" y="8.5" width="375" height="148" rx="14" stroke="var(--crimson)" strokeWidth="1.5" />
            <path d="M144 82H262" stroke="var(--crimson)" />
            <text {...SVG_LABEL} x="20" y="78" fill="var(--crimson)">
              PHYSICAL LAWS
            </text>
            <text {...SVG_LABEL} x="20" y="98" fill="var(--charcoal)" fillOpacity="0.55">
              NAVIER-STOKES
            </text>
            <text {...SVG_LABEL} x="780" y="86" textAnchor="end" fill="var(--charcoal)" fillOpacity="0.65">
              NEURAL NETWORKS
            </text>
          </svg>
        </Reveal>

        <div className={PAIR}>
          <Reveal delay={280}>
            <p className={BODY}>
              Constraining AI to &quot;obey physics&quot; for accurate
              predictions with sparse data
              <Cite n={[17]} />.
            </p>
            <figure aria-hidden className="mt-7 w-full max-w-[25rem]">
              <svg viewBox="0 0 400 134" className="w-full" fill="none">
                <path d="M10 112H390" stroke="var(--charcoal)" strokeOpacity="0.25" />
                <path d="M10 96C80 90 120 40 200 44S320 88 390 30" stroke="var(--crimson)" strokeWidth="2" />
                {[
                  [66.8, 81.4],
                  [156.2, 47.3],
                  [298.8, 60.3],
                  [369.8, 44.6],
                ].map(([x, y]) => (
                  <circle key={x} cx={x} cy={y} r="4" fill="var(--charcoal)" fillOpacity="0.75" />
                ))}
                <text {...SVG_LABEL} x="390" y="14" textAnchor="end" fill="var(--crimson)">
                  ACCURATE PREDICTIONS
                </text>
                <text {...SVG_LABEL} x="10" y="129" fill="var(--charcoal)" fillOpacity="0.65">
                  SPARSE DATA
                </text>
              </svg>
              <Schematic />
            </figure>
          </Reveal>

          <Reveal delay={400} className={COL_RULE}>
            <p className={BODY}>
              Enabling &quot;real-time simulation&quot; without waiting for FEA
              solvers
              <Cite n={[18]} />.
            </p>
            <figure aria-hidden className="mt-7 w-full max-w-[25rem]">
              <svg viewBox="0 0 400 104" className="w-full" fill="none">
                <text {...SVG_LABEL} x="0" y="14" fill="var(--charcoal)" fillOpacity="0.65">
                  FEA SOLVERS
                </text>
                <rect x="0" y="22" width="390" height="12" fill="var(--charcoal)" fillOpacity="0.35" />
                <text {...SVG_LABEL} x="390" y="50" textAnchor="end" fill="var(--charcoal)" fillOpacity="0.5">
                  WAITING
                </text>
                <text {...SVG_LABEL} x="0" y="76" fill="var(--crimson)">
                  REAL-TIME SIMULATION
                </text>
                <rect x="0" y="84" width="14" height="12" fill="var(--crimson)" />
              </svg>
              <Schematic />
            </figure>
          </Reveal>
        </div>

        <Discussion delay={520}>
          How do PINNs bridge the gap between data science and mechanical
          engineering?
        </Discussion>
      </Slide>

      {/* ==================================================================
          13 · SYNTHETIC DATA FOR ENGINEERING — collection set against
          generation; generated points filling a distribution's outline;
          the same outline with both tails marked.
      ================================================================== */}
      <Slide id="synthetic-engineering" border align="left">
        <Head eyebrow="Part 2 · 03 / 04">Synthetic Data for Engineering</Head>

        <Reveal delay={140} className="w-full">
          <p className={`${DISPLAY} mt-9 max-w-4xl`}>
            Generating data when real-world collection is expensive or
            dangerous.
          </p>
          <div aria-hidden className="mt-7 max-w-3xl">
            <Split left="Real-world collection" right="Generating data" />
          </div>
        </Reveal>

        {(() => {
          const curve = (x: number) => 110 - 90 * Math.exp(-(((x - 200) / 62) ** 2) / 2);
          const outline = Array.from({ length: 77 }, (_, k) => {
            const x = 10 + k * 5;
            return `${k === 0 ? "M" : "L"}${x} ${curve(x).toFixed(1)}`;
          }).join("");
          const tail = (from: number, to: number) =>
            `M${from} 110` +
            Array.from({ length: (to - from) / 5 + 1 }, (_, k) => {
              const x = from + k * 5;
              return `L${x} ${curve(x).toFixed(1)}`;
            }).join("") +
            `L${to} 110Z`;
          return (
            <div className={PAIR}>
              <Reveal delay={280}>
                <p className={BODY}>
                  Using GANs and VAEs for statistically accurate datasets
                  <Cite n={[19, 20]} />.
                </p>
                <figure aria-hidden className="mt-7 w-full max-w-[25rem]">
                  <svg viewBox="0 0 400 134" className="w-full" fill="none">
                    {Array.from({ length: 900 }, (_, k) => {
                      const x = 10 + 380 * hash(k + 2001);
                      const y = 20 + 90 * hash(k + 2503);
                      if (y < curve(x) + 2) return null;
                      return (
                        <circle
                          key={k}
                          cx={x.toFixed(1)}
                          cy={y.toFixed(1)}
                          r="1.4"
                          fill="var(--crimson)"
                          fillOpacity="0.7"
                        />
                      );
                    })}
                    <path d="M10 110H390" stroke="var(--charcoal)" strokeOpacity="0.3" />
                    <path d={outline} stroke="var(--charcoal)" strokeOpacity="0.6" strokeWidth="1.5" />
                    <text {...SVG_LABEL} x="200" y="129" textAnchor="middle" fill="var(--crimson)">
                      STATISTICALLY ACCURATE DATASETS
                    </text>
                  </svg>
                  <Schematic />
                </figure>
              </Reveal>

              <Reveal delay={400} className={COL_RULE}>
                <p className={BODY}>
                  Training computer vision and simulating edge cases.
                </p>
                <figure aria-hidden className="mt-7 w-full max-w-[25rem]">
                  <svg viewBox="0 0 400 134" className="w-full" fill="none">
                    <path d={tail(10, 95)} fill="var(--crimson)" />
                    <path d={tail(305, 390)} fill="var(--crimson)" />
                    <path d="M10 110H390" stroke="var(--charcoal)" strokeOpacity="0.3" />
                    <path d={outline} stroke="var(--charcoal)" strokeOpacity="0.6" strokeWidth="1.5" />
                    <text {...SVG_LABEL} x="10" y="129" fill="var(--crimson)">
                      EDGE CASES
                    </text>
                    <text {...SVG_LABEL} x="390" y="129" textAnchor="end" fill="var(--crimson)">
                      EDGE CASES
                    </text>
                  </svg>
                  <Schematic />
                </figure>
              </Reveal>
            </div>
          );
        })()}

        <Discussion delay={520}>
          In what scenarios is synthetic data superior to real-world data?
        </Discussion>
      </Slide>

      {/* ==================================================================
          14 · DATA PRIVACY AND SPEED — a dataset crossing a border while the
          locked IP stays behind; GDPR on its document; development cycles
          shortening one after another.
      ================================================================== */}
      <Slide id="privacy-speed" border align="left">
        <Head eyebrow="Part 2 · 04 / 04">Data Privacy and Speed</Head>

        <Reveal delay={140} className="w-full">
          <p className={`${LEAD} mt-9 max-w-4xl`}>
            Sharing datasets across borders without exposing IP.
          </p>
          <svg
            aria-hidden
            viewBox="0 0 800 140"
            className="mt-8 w-full max-w-5xl"
            fill="none"
          >
            <path d="M400 6V134" stroke="var(--charcoal)" strokeOpacity="0.35" strokeDasharray="6 5" />
            <text {...SVG_LABEL} x="412" y="130" fill="var(--charcoal)" fillOpacity="0.55">
              BORDERS
            </text>

            <rect x="70.5" y="66.5" width="20" height="16" stroke="var(--charcoal)" strokeOpacity="0.65" />
            <path d="M74.5 66.5V60a6 6 0 0 1 12 0V66.5" stroke="var(--charcoal)" strokeOpacity="0.65" />
            <text {...SVG_LABEL} letterSpacing={1} x="80.5" y="102" textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.65">
              IP
            </text>

            {[120.5, 590.5].map((x) => {
              const tone = x > 400 ? "var(--crimson)" : "var(--charcoal)";
              const o = x > 400 ? 1 : 0.55;
              return (
                <g key={x}>
                  <rect x={x} y="40.5" width="100" height="60" stroke={tone} strokeOpacity={o} />
                  <path
                    d={`M${x} 55.5H${x + 100}M${x} 70.5H${x + 100}M${x} 85.5H${x + 100}M${x + 33.3} 40.5V100.5M${x + 66.7} 40.5V100.5`}
                    stroke={tone}
                    strokeOpacity={o * 0.45}
                  />
                  <text {...SVG_LABEL} x={x + 50} y="124" textAnchor="middle" fill={tone} fillOpacity={x > 400 ? 1 : 0.65}>
                    DATASETS
                  </text>
                </g>
              );
            })}
            <path d="M236 70H564" stroke="var(--crimson)" strokeWidth="1.5" />
            <path d={headRight(572, 70)} stroke="var(--crimson)" strokeWidth="1.5" />
          </svg>
        </Reveal>

        <div className={PAIR}>
          <Reveal delay={280}>
            <p className={BODY}>
              Compliant with privacy regulations like GDPR
              <Cite n={[21]} />.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 400 104"
              className="mt-7 w-full max-w-[25rem]"
              fill="none"
            >
              <path d="M0.5 6.5H70L84.5 21V97.5H0.5Z" stroke="var(--charcoal)" strokeOpacity="0.6" />
              <path d="M70 6.5V21H84.5" stroke="var(--charcoal)" strokeOpacity="0.4" />
              <text x="42.5" y="60" textAnchor="middle" fontSize="16" fontFamily="var(--font-serif), serif" fontWeight="700" fill="var(--crimson)">
                GDPR
              </text>
              <text {...SVG_LABEL} x="112" y="56" fill="var(--charcoal)" fillOpacity="0.65">
                PRIVACY REGULATIONS
              </text>
            </svg>
          </Reveal>

          <Reveal delay={400} className={COL_RULE}>
            <p className={BODY}>
              Accelerating development cycles through easier data access.
            </p>
            <figure aria-hidden className="mt-7 w-full max-w-[25rem]">
              <svg viewBox="0 0 400 104" className="w-full" fill="none">
                <path d="M10 80H390" stroke="var(--charcoal)" strokeOpacity="0.2" />
                {(() => {
                  let x = 10;
                  return [120, 84, 58, 40, 28, 20, 14].map((w, k) => {
                    const d = `M${x} 80A${w / 2} ${w / 2} 0 0 1 ${x + w} 80`;
                    x += w;
                    return (
                      <path
                        key={w}
                        d={d}
                        stroke={k < 3 ? "var(--charcoal)" : "var(--crimson)"}
                        strokeOpacity={k < 3 ? 0.5 : 1}
                        strokeWidth="1.5"
                      />
                    );
                  });
                })()}
                <text {...SVG_LABEL} x="10" y="100" fill="var(--charcoal)" fillOpacity="0.65">
                  DEVELOPMENT CYCLES
                </text>
              </svg>
              <Schematic />
            </figure>
          </Reveal>
        </div>

        <Discussion delay={520}>
          How does synthetic data mitigate privacy risks in global engineering
          teams?
        </Discussion>
      </Slide>

      <PartPlate
        id="part-3"
        numeral="3"
        title="Prototyping & Digital Twins"
        lines={[
          "Bridging the physical-digital gap.",
          "AI-guided rapid prototyping in Additive Manufacturing.",
          <>
            In-process correction using computer vision to reduce waste
            <Cite n={[22, 23]} />.
          </>,
        ]}
        discussion="What is the economic impact of self-correcting 3D printers?"
      />

      {/* ==================================================================
          16 · PARAMETER OPTIMIZATION — a log of past prints passed to a
          bank of sliders set at their optimum; failed attempts struck
          through before one clean part; one mark repeated at every site.
      ================================================================== */}
      <Slide id="parameter-optimization" border align="left">
        <Head eyebrow="Part 3 · 01 / 03">Parameter Optimization</Head>

        <Reveal delay={140} className="w-full">
          <p className={`${LEAD} mt-9 max-w-4xl`}>
            Analyzing historical print data to suggest optimal slicing
            parameters
            <Cite n={[24]} />.
          </p>
          <svg
            aria-hidden
            viewBox="0 0 800 150"
            className="mt-8 w-full max-w-5xl"
            fill="none"
          >
            {Array.from({ length: 9 }, (_, r) => (
              <g key={r}>
                <rect x="20.5" y={16.5 + r * 12} width="6" height="6" stroke="var(--charcoal)" strokeOpacity="0.4" />
                <path
                  d={`M36 ${19.5 + r * 12}H${(120 + 170 * hash(r + 3101)).toFixed(0)}`}
                  stroke="var(--charcoal)"
                  strokeOpacity="0.3"
                  strokeWidth="2"
                />
              </g>
            ))}
            <text {...SVG_LABEL} x="20" y="142" fill="var(--charcoal)" fillOpacity="0.65">
              HISTORICAL PRINT DATA
            </text>
            <path d="M330 68H396" stroke="var(--charcoal)" strokeOpacity="0.45" />
            <path d={headRight(404, 68)} stroke="var(--charcoal)" strokeOpacity="0.6" />
            {[520, 690, 600, 470].map((x, r) => (
              <g key={r}>
                <path d={`M440 ${26 + r * 28}H760`} stroke="var(--charcoal)" strokeOpacity="0.3" strokeWidth="2" />
                <circle cx={x} cy={26 + r * 28} r="6.5" fill="var(--crimson)" />
              </g>
            ))}
            <text {...SVG_LABEL} x="760" y="142" textAnchor="end" fill="var(--crimson)">
              OPTIMAL SLICING PARAMETERS
            </text>
          </svg>
        </Reveal>

        <div className={PAIR}>
          <Reveal delay={280}>
            <p className={BODY}>
              Removing &quot;trial and error&quot; from complex part printing.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 400 96"
              className="mt-7 w-full max-w-[25rem]"
              fill="none"
            >
              {[10, 70, 130].map((x) => (
                <rect key={x} x={x + 0.5} y="14.5" width="40" height="40" stroke="var(--charcoal)" strokeOpacity="0.4" strokeDasharray="3 3" />
              ))}
              <path d="M2 34.5H178" stroke="var(--crimson)" strokeWidth="2" />
              <text {...SVG_LABEL} x="10" y="84" fill="var(--charcoal)" fillOpacity="0.6">
                &quot;TRIAL AND ERROR&quot;
              </text>
              <rect x="250.5" y="14.5" width="40" height="40" stroke="var(--charcoal)" strokeOpacity="0.7" />
              <path d="M262 35l6 6l12-12" stroke="var(--charcoal)" strokeOpacity="0.8" strokeWidth="1.5" />
            </svg>
          </Reveal>

          <Reveal delay={400} className={COL_RULE}>
            <p className={BODY}>
              Ensuring consistent quality across distributed manufacturing.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 400 112"
              className="mt-7 w-full max-w-[25rem]"
              fill="none"
            >
              <path d="M40 30L130 62L220 24L300 70L370 34" stroke="var(--charcoal)" strokeOpacity="0.25" strokeDasharray="3 4" />
              {[
                [40, 30],
                [130, 62],
                [220, 24],
                [300, 70],
                [370, 34],
              ].map(([x, y]) => (
                <g key={x}>
                  <rect x={x - 11.5} y={y - 11.5} width="23" height="23" fill="var(--background)" stroke="var(--charcoal)" strokeOpacity="0.55" />
                  <rect x={x - 4} y={y - 4} width="8" height="8" fill="var(--crimson)" />
                </g>
              ))}
              <text {...SVG_LABEL} x="10" y="106" fill="var(--charcoal)" fillOpacity="0.65">
                DISTRIBUTED MANUFACTURING
              </text>
            </svg>
          </Reveal>
        </div>

        <Discussion delay={520}>
          How does this capability enable decentralized manufacturing?
        </Discussion>
      </Slide>

      {/* ==================================================================
          17 · COGNITIVE DIGITAL TWINS — an object and its dashed replica,
          then the same pair with a reasoning network inside the twin; a
          network growing along time; a declining line caught before its
          failure line.
      ================================================================== */}
      <Slide id="cognitive-twins" border align="left">
        <Head eyebrow="Part 3 · 02 / 03">Cognitive Digital Twins</Head>

        <Reveal delay={140} className="w-full">
          <p className={`${DISPLAY} mt-9 max-w-4xl`}>
            Beyond static virtual replicas to semantic, reasoning models
            <Cite n={[25, 26]} />.
          </p>
          <svg
            aria-hidden
            viewBox="0 0 800 140"
            className="mt-8 w-full max-w-5xl"
            fill="none"
          >
            {[40, 500].map((x) => (
              <g key={x}>
                <rect x={x + 0.5} y="24.5" width="90" height="60" fill="var(--charcoal)" fillOpacity="0.1" stroke="var(--charcoal)" strokeOpacity="0.6" />
                <path d={`M${x + 91} 54.5H${x + 129}`} stroke="var(--charcoal)" strokeOpacity="0.35" strokeDasharray="2 3" />
              </g>
            ))}
            <rect x="170.5" y="24.5" width="90" height="60" stroke="var(--charcoal)" strokeOpacity="0.5" strokeDasharray="4 4" />
            <text {...SVG_LABEL} x="40" y="120" fill="var(--charcoal)" fillOpacity="0.65">
              STATIC VIRTUAL REPLICAS
            </text>

            <path d="M292 54.5H452" stroke="var(--charcoal)" strokeOpacity="0.45" />
            <path d={headRight(460, 54.5)} stroke="var(--charcoal)" strokeOpacity="0.6" />

            <rect x="630.5" y="24.5" width="130" height="60" stroke="var(--crimson)" strokeDasharray="4 4" />
            <path
              d="M656 42L698 55M684 70L698 55M712 40L698 55M738 68L698 55M656 42L684 70M712 40L738 68"
              stroke="var(--crimson)"
              strokeOpacity="0.5"
            />
            {[
              [656, 42],
              [684, 70],
              [712, 40],
              [738, 68],
              [698, 55],
            ].map(([x, y]) => (
              <circle key={x} cx={x} cy={y} r="3.5" fill="var(--crimson)" />
            ))}
            <text {...SVG_LABEL} x="760" y="120" textAnchor="end" fill="var(--crimson)">
              SEMANTIC, REASONING MODELS
            </text>
          </svg>
        </Reveal>

        <div className={PAIR}>
          <Reveal delay={280}>
            <p className={BODY}>
              Using reinforcement learning to evolve over time.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 400 120"
              className="mt-7 w-full max-w-[25rem]"
              fill="none"
            >
              <path d="M10 96H380" stroke="var(--charcoal)" strokeOpacity="0.3" />
              <path d={headRight(388, 96)} stroke="var(--charcoal)" strokeOpacity="0.45" />
              {[
                [50, 2, 12],
                [150, 3, 16],
                [250, 5, 20],
                [340, 7, 24],
              ].map(([cx, n, radius], s) => {
                const tone = s === 3 ? "var(--crimson)" : "var(--charcoal)";
                const pts = Array.from({ length: n }, (_, i) => {
                  const a = (i / n) * Math.PI * 2 + s;
                  return [cx + radius * Math.cos(a), 50 + radius * Math.sin(a)];
                });
                return (
                  <g key={cx}>
                    <path
                      d={pts
                        .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`)
                        .join("") + (n > 2 ? "Z" : "")}
                      stroke={tone}
                      strokeOpacity={s === 3 ? 0.6 : 0.3}
                    />
                    {pts.map(([x, y], i) => (
                      <circle key={i} cx={x.toFixed(1)} cy={y.toFixed(1)} r="3" fill={tone} fillOpacity={s === 3 ? 1 : 0.55} />
                    ))}
                  </g>
                );
              })}
              <text {...SVG_LABEL} x="10" y="116" fill="var(--charcoal)" fillOpacity="0.65">
                REINFORCEMENT LEARNING
              </text>
              <text {...SVG_LABEL} x="388" y="116" textAnchor="end" fill="var(--charcoal)" fillOpacity="0.5">
                OVER TIME
              </text>
            </svg>
          </Reveal>

          <Reveal delay={400} className={COL_RULE}>
            <p className={BODY}>
              Predicting failure modes and autonomously suggesting maintenance
              <Cite n={[25]} />.
            </p>
            <figure aria-hidden className="mt-7 w-full max-w-[25rem]">
              <svg viewBox="0 0 400 118" className="w-full" fill="none">
                <path d="M10 92H390" stroke="var(--charcoal)" strokeOpacity="0.35" strokeDasharray="4 4" />
                <path d="M10 42C110 44 190 50 250 64" stroke="var(--charcoal)" strokeOpacity="0.6" strokeWidth="1.5" />
                <path d="M250 64C300 76 340 86 368 92" stroke="var(--charcoal)" strokeOpacity="0.45" strokeWidth="1.5" strokeDasharray="5 4" />
                <circle cx="372" cy="92" r="4" fill="var(--background)" stroke="var(--charcoal)" strokeOpacity="0.6" />
                <circle cx="250" cy="64" r="5" fill="var(--crimson)" />
                <text {...SVG_LABEL} x="251" y="38" textAnchor="middle" fill="var(--crimson)">
                  MAINTENANCE
                </text>
                <text {...SVG_LABEL} x="390" y="112" textAnchor="end" fill="var(--charcoal)" fillOpacity="0.6">
                  FAILURE MODES
                </text>
              </svg>
              <Schematic />
            </figure>
          </Reveal>
        </div>

        <Discussion delay={520}>
          At what point does a &quot;twin&quot; become an autonomous operator?
        </Discussion>
      </Slide>

      {/* ==================================================================
          18 · VR AND AI-ASSISTED UX — a dashed stand-in user in a marked
          headset reaching into an interface; a gaze path beside a pulse
          trace; testing placed on the line before physical prototyping.
      ================================================================== */}
      <Slide id="vr-ux" border align="left">
        <Head eyebrow="Part 3 · 03 / 03">VR and AI-Assisted UX</Head>

        <Reveal delay={140} className="w-full">
          <p className={`${LEAD} mt-9 max-w-4xl`}>
            Simulating user interactions in VR without human subjects.
          </p>
          <svg
            aria-hidden
            viewBox="0 0 800 144"
            className="mt-8 w-full max-w-5xl"
            fill="none"
          >
            <circle cx="160" cy="44" r="14" stroke="var(--charcoal)" strokeOpacity="0.6" strokeDasharray="3 3" />
            <path d="M132 94A28 28 0 0 1 188 94" stroke="var(--charcoal)" strokeOpacity="0.6" strokeDasharray="3 3" />
            <rect x="144.5" y="37.5" width="31" height="13" rx="4" fill="var(--crimson)" />
            <text {...SVG_LABEL} letterSpacing={1} x="160" y="128" textAnchor="middle" fill="var(--crimson)">
              VR
            </text>

            <path d="M178 44L596 88M178 44L512 52" stroke="var(--crimson)" strokeOpacity="0.55" strokeDasharray="4 4" />

            <path d="M430.5 16.5L700.5 32.5V106.5L430.5 122.5Z" stroke="var(--charcoal)" strokeOpacity="0.5" />
            <path d="M456 46L566 50M456 62L536 65" stroke="var(--charcoal)" strokeOpacity="0.3" strokeWidth="2" />
            <path d="M596 82L672 84V98L596 99Z" fill="var(--charcoal)" fillOpacity="0.2" />
            <text {...SVG_LABEL} x="566" y="140" textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.65">
              USER INTERACTIONS
            </text>
          </svg>
        </Reveal>

        <div className={PAIR}>
          <Reveal delay={280}>
            <p className={BODY}>
              Analyzing gaze patterns and biometrics to predict cognitive load
              <Cite n={[27]} />.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 400 118"
              className="mt-7 w-full max-w-[25rem]"
              fill="none"
            >
              <rect x="10.5" y="10.5" width="190" height="80" stroke="var(--charcoal)" strokeOpacity="0.45" />
              <path d="M40 34L92 28L150 48L112 70L58 64" stroke="var(--crimson)" strokeOpacity="0.55" />
              {[
                [40, 34, 6],
                [92, 28, 10],
                [150, 48, 7],
                [112, 70, 12],
                [58, 64, 5],
              ].map(([x, y, r]) => (
                <circle key={x} cx={x} cy={y} r={r} fill="var(--crimson)" fillOpacity="0.12" stroke="var(--crimson)" />
              ))}
              <path
                d="M220 50H256l6-22l8 44l7-30l5 8H322l6-22l8 44l7-30l5 8H390"
                stroke="var(--charcoal)"
                strokeOpacity="0.6"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <text {...SVG_LABEL} x="10" y="112" fill="var(--crimson)">
                GAZE PATTERNS
              </text>
              <text {...SVG_LABEL} x="220" y="112" fill="var(--charcoal)" fillOpacity="0.65">
                BIOMETRICS
              </text>
            </svg>
          </Reveal>

          <Reveal delay={400} className={COL_RULE}>
            <p className={BODY}>
              Testing ergonomics and UI flows before physical prototyping.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 400 92"
              className="mt-7 w-full max-w-[25rem]"
              fill="none"
            >
              <path d="M10 50H382" stroke="var(--charcoal)" strokeOpacity="0.3" />
              <path d={headRight(390, 50)} stroke="var(--charcoal)" strokeOpacity="0.45" />
              <rect x="10" y="42" width="170" height="16" fill="var(--crimson)" />
              <rect x="190" y="42" width="180" height="16" fill="var(--charcoal)" fillOpacity="0.22" />
              <text {...SVG_LABEL} x="10" y="30" fill="var(--crimson)">
                ERGONOMICS AND UI FLOWS
              </text>
              <text {...SVG_LABEL} x="190" y="80" fill="var(--charcoal)" fillOpacity="0.65">
                PHYSICAL PROTOTYPING
              </text>
            </svg>
          </Reveal>
        </div>

        <Discussion delay={520}>
          Can VR testing completely replace physical ergonomic testing?
        </Discussion>
      </Slide>

      <PartPlate
        id="part-4"
        numeral="4"
        title="DfM & Supply Chain Integration"
        lines={[
          "Moving DfM from a final checkpoint to a continuous process.",
          <>
            AI-automated DfM checks (CoLab, DFMPro) flagging risks
            <Cite n={[28, 29]} />.
          </>,
          <>
            Learning from historical data to prevent recurring failures
            <Cite n={[30]} />.
          </>,
        ]}
        discussion='How does "continuous DfM" alter the engineering workflow?'
      />

      {/* ==================================================================
          20 · SUSTAINABLE MATERIAL SELECTION — a field of candidate cells
          with a few marked; emission bars with one dropping below the
          line; an LCA store feeding a shorter footprint.
      ================================================================== */}
      <Slide id="sustainable-materials" border align="left">
        <Head eyebrow="Part 4 · 01 / 02">Sustainable Material Selection</Head>

        <Reveal delay={140} className="w-full">
          <p className={`${DISPLAY} mt-9 max-w-4xl`}>
            AI discovery of new materials (Materials Nexus)
            <Cite n={[31, 32]} />.
          </p>
          <figure aria-hidden className="mt-8 w-full max-w-5xl">
            <svg viewBox="0 0 800 144" className="w-full" fill="none">
              {Array.from({ length: 44 * 6 }, (_, k) => {
                const hit = hash(k + 4001) > 0.975;
                return (
                  <rect
                    key={k}
                    x={26 + (k % 44) * 17}
                    y={10 + Math.floor(k / 44) * 17}
                    width="12"
                    height="12"
                    fill={hit ? "var(--crimson)" : "var(--charcoal)"}
                    fillOpacity={hit ? 1 : 0.1}
                  />
                );
              })}
              <text {...SVG_LABEL} x="26" y="138" fill="var(--crimson)">
                NEW MATERIALS
              </text>
            </svg>
            <Schematic />
          </figure>
        </Reveal>

        <div className={PAIR}>
          <Reveal delay={280}>
            <p className={BODY}>
              Identifying rare-earth-free or carbon-negative compositions.
            </p>
            <figure aria-hidden className="mt-7 w-full max-w-[25rem]">
              <svg viewBox="0 0 400 118" className="w-full" fill="none">
                {[
                  [30, 40],
                  [90, 28],
                  [150, 50],
                  [210, 22],
                ].map(([x, h]) => (
                  <rect key={x} x={x} y={64 - h} width="36" height={h} fill="var(--charcoal)" fillOpacity="0.28" />
                ))}
                <rect x="290" y="64" width="36" height="30" fill="var(--crimson)" />
                <path d="M10 64H390" stroke="var(--charcoal)" strokeOpacity="0.45" />
                <text {...SVG_LABEL} x="309" y="112" textAnchor="middle" fill="var(--crimson)">
                  CARBON-NEGATIVE
                </text>
              </svg>
              <Schematic />
            </figure>
          </Reveal>

          <Reveal delay={400} className={COL_RULE}>
            <p className={BODY}>
              Integrating with LCA databases for lower carbon footprints
              <Cite n={[33]} />.
            </p>
            <figure aria-hidden className="mt-7 w-full max-w-[25rem]">
              <svg viewBox="0 0 400 118" className="w-full" fill="none">
                <ellipse cx="50" cy="20" rx="40" ry="10" stroke="var(--charcoal)" strokeOpacity="0.6" />
                <path d="M10 20V84A40 10 0 0 0 90 84V20" stroke="var(--charcoal)" strokeOpacity="0.6" />
                <text x="50" y="62" textAnchor="middle" fontSize="16" fontFamily="var(--font-serif), serif" fontWeight="700" fill="var(--crimson)">
                  LCA
                </text>
                <text {...SVG_LABEL} x="10" y="112" fill="var(--charcoal)" fillOpacity="0.65">
                  LCA DATABASES
                </text>
                <path d="M108 54H146" stroke="var(--charcoal)" strokeOpacity="0.45" />
                <path d={headRight(154, 54)} stroke="var(--charcoal)" strokeOpacity="0.6" />
                <rect x="170" y="34" width="210" height="12" fill="var(--charcoal)" fillOpacity="0.3" />
                <rect x="170" y="60" width="120" height="12" fill="var(--crimson)" />
                <text {...SVG_LABEL} x="170" y="94" fill="var(--crimson)">
                  LOWER CARBON FOOTPRINTS
                </text>
              </svg>
              <Schematic />
            </figure>
          </Reveal>
        </div>

        <Discussion delay={520}>
          How critical is AI in achieving aggressive sustainability targets?
        </Discussion>
      </Slide>

      {/* ==================================================================
          21 · SUPPLY CHAIN RESILIENCE — three tiers mapped back from one
          node, a flagged supplier's path marked through to it; two
          warnings; a price record running on into a forecast.
      ================================================================== */}
      <Slide id="supply-resilience" border align="left">
        <Head eyebrow="Part 4 · 02 / 02">Supply Chain Resilience</Head>

        <Reveal delay={140} className="w-full">
          <p className={`${LEAD} mt-9 max-w-4xl`}>
            Mapping multi-tier supply chains with AI (SCM Globe, Resilinc)
            <Cite n={[34, 35]} />.
          </p>
          <svg
            aria-hidden
            viewBox="0 0 800 180"
            className="mt-8 w-full max-w-5xl"
            fill="none"
          >
            {(() => {
              const root = [740, 85];
              const t1 = [40, 85, 130].map((y) => [540, y]);
              const t2 = Array.from({ length: 6 }, (_, k) => [340, 16 + k * 27.6]);
              const t3 = Array.from({ length: 9 }, (_, k) => [140, 10 + k * 18]);
              const up2 = (k: number) => Math.floor(k / 2);
              const up3 = (k: number) => Math.floor((k * 6) / 9);
              const flagged = 3;
              const edges: [number[], number[], boolean][] = [
                ...t1.map((p, k): [number[], number[], boolean] => [p, root, k === up2(up3(flagged))]),
                ...t2.map((p, k): [number[], number[], boolean] => [p, t1[up2(k)], k === up3(flagged)]),
                ...t3.map((p, k): [number[], number[], boolean] => [p, t2[up3(k)], k === flagged]),
              ];
              return (
                <>
                  {edges.map(([a, b, hot], i) => (
                    <path
                      key={i}
                      d={`M${a[0]} ${a[1].toFixed(1)}C${a[0] + 100} ${a[1].toFixed(1)} ${b[0] - 100} ${b[1].toFixed(1)} ${b[0]} ${b[1].toFixed(1)}`}
                      stroke={hot ? "var(--crimson)" : "var(--charcoal)"}
                      strokeOpacity={hot ? 1 : 0.22}
                      strokeWidth={hot ? 1.5 : 1}
                    />
                  ))}
                  {[...t1, ...t2, ...t3].map(([x, y]) => (
                    <circle key={`${x}-${y}`} cx={x} cy={y.toFixed(1)} r="5" fill="var(--background)" stroke="var(--charcoal)" strokeOpacity="0.6" />
                  ))}
                  <circle cx={t3[flagged][0]} cy={t3[flagged][1]} r="5" fill="var(--crimson)" />
                  <circle cx={t3[flagged][0]} cy={t3[flagged][1]} r="11" stroke="var(--crimson)" strokeOpacity="0.5" />
                  <circle cx={root[0]} cy={root[1]} r="8" fill="var(--charcoal)" fillOpacity="0.7" />
                </>
              );
            })()}
            {[
              ["TIER 3", 140],
              ["TIER 2", 340],
              ["TIER 1", 540],
            ].map(([label, x]) => (
              <text key={label} {...SVG_LABEL} x={x} y="176" textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.65">
                {label}
              </text>
            ))}
          </svg>
        </Reveal>

        <div className={PAIR}>
          <Reveal delay={280}>
            <p className={BODY}>
              Alerting on obsolescence risks and geopolitical instability.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 400 92"
              className="mt-7 w-full max-w-[25rem]"
              fill="none"
            >
              {(
                [
                  ["OBSOLESCENCE RISKS", 26],
                  ["GEOPOLITICAL INSTABILITY", 70],
                ] as const
              ).map(([label, y]) => (
                <g key={label}>
                  <path d={`M20 ${y - 14}L34 ${y + 10}H6Z`} stroke="var(--crimson)" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d={`M20 ${y - 5}V${y + 2}`} stroke="var(--crimson)" strokeWidth="1.5" />
                  <circle cx="20" cy={y + 6} r="1" fill="var(--crimson)" />
                  <text {...SVG_LABEL} x="52" y={y + 3.5} fill="var(--charcoal)" fillOpacity="0.7">
                    {label}
                  </text>
                </g>
              ))}
            </svg>
          </Reveal>

          <Reveal delay={400} className={COL_RULE}>
            <p className={BODY}>
              Predicting lead times and price fluctuations
              <Cite n={[36]} />.
            </p>
            <figure aria-hidden className="mt-7 w-full max-w-[25rem]">
              <svg viewBox="0 0 400 124" className="w-full" fill="none">
                <path d="M220 10V64" stroke="var(--charcoal)" strokeOpacity="0.25" strokeDasharray="2 4" />
                <path d="M10 50L40 38L70 56L100 30L130 44L160 26L190 48L220 34" stroke="var(--charcoal)" strokeOpacity="0.6" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M220 34L250 46L280 30L310 42L340 28" stroke="var(--crimson)" strokeWidth="1.5" strokeDasharray="5 4" strokeLinejoin="round" />
                <text {...SVG_LABEL} x="10" y="78" fill="var(--charcoal)" fillOpacity="0.65">
                  PRICE FLUCTUATIONS
                </text>
                <rect x="10" y="92" width="210" height="8" fill="var(--charcoal)" fillOpacity="0.3" />
                <path d="M220 88V104M220 96H330M330 88V104" stroke="var(--crimson)" strokeWidth="1.5" strokeDasharray="0" />
                <text {...SVG_LABEL} x="10" y="119" fill="var(--charcoal)" fillOpacity="0.65">
                  LEAD TIMES
                </text>
              </svg>
              <Schematic />
            </figure>
          </Reveal>
        </div>

        <Discussion delay={520}>
          How should design teams weigh technical performance against supply
          chain risk?
        </Discussion>
      </Slide>

      <PartPlate
        id="part-5"
        numeral="5"
        title="Personalization & User-Centricity"
        lines={[
          'Achieving "mass customization" at scale.',
          <>
            Autonomous configuration for &quot;Lot Size 1&quot; manufacturing
            <Cite n={[37, 38]} />.
          </>,
          "Adjusting tooling and assembly for individual units.",
        ]}
        discussion='Is "Lot Size 1" a realistic goal for all industries?'
      />

      {/* ==================================================================
          23 · GENERATIVE CUSTOMIZATION — six soles, each with its own
          pattern, one marked; designs held inside a dashed boundary, a
          stray one brought back in; one person in the process, then many.
      ================================================================== */}
      <Slide id="generative-customization" border align="left">
        <Head eyebrow="Part 5 · 01 / 02">Generative Customization</Head>

        <Reveal delay={140} className="w-full">
          <p className={`${LEAD} mt-9 max-w-4xl`}>
            Co-designing products with customers (e.g., custom shoe soles)
            <Cite n={[39]} />.
          </p>
          <svg
            aria-hidden
            viewBox="0 0 800 160"
            className="mt-8 w-full max-w-5xl"
            fill="none"
          >
            {Array.from({ length: 6 }, (_, k) => {
              const x = 50 + k * 124;
              const sole = `M${x + 30} 6C${x + 52} 6 ${x + 60} 28 ${x + 58} 54C${x + 56} 76 ${x + 48} 88 ${x + 50} 106C${x + 52} 124 ${x + 44} 136 ${x + 30} 136C${x + 16} 136 ${x + 8} 124 ${x + 10} 106C${x + 12} 88 ${x + 4} 76 ${x + 2} 54C${x} 28 ${x + 8} 6 ${x + 30} 6Z`;
              const marked = k === 3;
              const tone = marked ? "var(--crimson)" : "var(--charcoal)";
              const ink = marked ? 0.75 : 0.3;
              let pattern: React.ReactNode;
              if (k % 3 === 0) {
                const step = 8 + k;
                pattern = Array.from({ length: Math.ceil(134 / step) }, (_, r) => (
                  <path
                    key={r}
                    d={`M${x - 2} ${8 + r * step}q7.5 ${-2 - (k % 2) * 2} 15 0t15 0t15 0t15 0t15 0`}
                    stroke={tone}
                    strokeOpacity={ink}
                  />
                ));
              } else if (k % 3 === 1) {
                pattern = Array.from({ length: 7 * 15 }, (_, i) => (
                  <circle
                    key={i}
                    cx={x + 4 + (i % 7) * 9 + (Math.floor(i / 7) % 2) * 4.5}
                    cy={8 + Math.floor(i / 7) * 9}
                    r={(1 + hash(i + k * 97) * 1.6).toFixed(1)}
                    fill={tone}
                    fillOpacity={ink}
                  />
                ));
              } else {
                pattern = Array.from({ length: 18 }, (_, r) => (
                  <path
                    key={r}
                    d={`M${x - 60 + r * (6 + k)} 0l80 140`}
                    stroke={tone}
                    strokeOpacity={ink}
                  />
                ));
              }
              return (
                <g key={k}>
                  <defs>
                    <clipPath id={`w9-sole-${k}`}>
                      <path d={sole} />
                    </clipPath>
                  </defs>
                  <g clipPath={`url(#w9-sole-${k})`}>{pattern}</g>
                  <path d={sole} stroke={tone} strokeOpacity={marked ? 1 : 0.55} strokeWidth={marked ? 1.5 : 1} />
                </g>
              );
            })}
            <text {...SVG_LABEL} x="50" y="156" fill="var(--charcoal)" fillOpacity="0.65">
              CUSTOM SHOE SOLES
            </text>
          </svg>
        </Reveal>

        <div className={PAIR}>
          <Reveal delay={280}>
            <p className={BODY}>
              AI ensuring user designs remain within manufacturable bounds.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 400 118"
              className="mt-7 w-full max-w-[25rem]"
              fill="none"
            >
              <rect x="60.5" y="12.5" width="250" height="76" rx="10" stroke="var(--crimson)" strokeDasharray="5 4" />
              {Array.from({ length: 14 }, (_, k) => (
                <circle
                  key={k}
                  cx={(78 + 200 * hash(k + 5101)).toFixed(1)}
                  cy={(26 + 50 * hash(k + 5303)).toFixed(1)}
                  r="3"
                  fill="var(--charcoal)"
                  fillOpacity="0.6"
                />
              ))}
              <circle cx="358" cy="38" r="3.5" stroke="var(--charcoal)" strokeOpacity="0.5" strokeDasharray="2 2" />
              <path d="M352 43C342 50 326 52 306 52" stroke="var(--charcoal)" strokeOpacity="0.5" />
              <path d={headLeft(298, 52)} stroke="var(--charcoal)" strokeOpacity="0.6" />
              <text {...SVG_LABEL} x="60" y="110" fill="var(--crimson)">
                MANUFACTURABLE BOUNDS
              </text>
              <text {...SVG_LABEL} x="390" y="110" textAnchor="end" fill="var(--charcoal)" fillOpacity="0.65">
                USER DESIGNS
              </text>
            </svg>
          </Reveal>

          <Reveal delay={400} className={COL_RULE}>
            <p className={BODY}>Democratizing the design process.</p>
            <svg
              aria-hidden
              viewBox="0 0 400 118"
              className="mt-7 w-full max-w-[25rem]"
              fill="none"
            >
              {(
                [
                  [55.5, "var(--charcoal)", 0.6],
                  ...Array.from({ length: 7 }, (_, k) => [205 + k * 27, "var(--crimson)", 1] as const),
                ] as const
              ).map(([x, tone, o]) => (
                <g key={x}>
                  <circle cx={x} cy="42" r="4.5" stroke={tone} strokeOpacity={o} />
                  <path d={`M${x - 8} 62A8 8 0 0 1 ${x + 8} 62`} stroke={tone} strokeOpacity={o} />
                </g>
              ))}
              <rect x="10.5" y="20.5" width="90" height="60" stroke="var(--charcoal)" strokeOpacity="0.45" />
              <path d="M116 50.5H158" stroke="var(--charcoal)" strokeOpacity="0.45" />
              <path d={headRight(166, 50.5)} stroke="var(--charcoal)" strokeOpacity="0.6" />
              <rect x="180.5" y="20.5" width="210" height="60" stroke="var(--crimson)" />
              <text {...SVG_LABEL} x="201" y="108" textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.65">
                DESIGN PROCESS
              </text>
            </svg>
          </Reveal>
        </div>

        <Discussion delay={520}>
          What are the brand implications of allowing customers to co-design?
        </Discussion>
      </Slide>

      {/* ==================================================================
          24 · IOT FEEDBACK LOOPS (VERSION 2.0) — one loop through usage
          telemetry, R&D and Version 2.0, the telemetry-to-R&D arc marked;
          usage patterns feeding an iteration ring; a friction snag marked
          on an otherwise straight path.
      ================================================================== */}
      <Slide id="iot-loops" border align="left">
        <Head eyebrow="Part 5 · 02 / 02">IoT Feedback Loops (Version 2.0)</Head>

        <Reveal delay={140} className="w-full">
          <p className={`${DISPLAY} mt-9 max-w-4xl`}>
            Closing the loop from usage telemetry to R&amp;D.
          </p>
          <svg
            aria-hidden
            viewBox="0 0 800 176"
            className="mt-8 w-full max-w-5xl"
            fill="none"
          >
            <path d="M660 85A260 60 0 0 0 140 85" stroke="var(--crimson)" strokeWidth="1.5" />
            <path d="M140 85A260 60 0 0 0 660 85" stroke="var(--charcoal)" strokeOpacity="0.4" strokeWidth="1.5" />
            <path d={headLeft(392, 25)} stroke="var(--crimson)" strokeWidth="1.5" />
            <path d={headRight(0, 0)} transform="translate(550 134) rotate(-9.3)" stroke="var(--charcoal)" strokeOpacity="0.6" strokeWidth="1.5" />
            <path d={headRight(0, 0)} transform="translate(250 134) rotate(9.3)" stroke="var(--charcoal)" strokeOpacity="0.6" strokeWidth="1.5" />
            <circle cx="660" cy="85" r="7" fill="var(--background)" stroke="var(--charcoal)" strokeOpacity="0.7" strokeWidth="1.5" />
            <circle cx="140" cy="85" r="7" fill="var(--background)" stroke="var(--charcoal)" strokeOpacity="0.7" strokeWidth="1.5" />
            <circle cx="400" cy="145" r="7" fill="var(--charcoal)" fillOpacity="0.7" />
            <text {...SVG_LABEL} x="678" y="88.5" fill="var(--charcoal)" fillOpacity="0.75">
              USAGE TELEMETRY
            </text>
            <text {...SVG_LABEL} letterSpacing={1.5} x="122" y="88.5" textAnchor="end" fill="var(--charcoal)" fillOpacity="0.75">
              R&amp;D
            </text>
            <text {...SVG_LABEL} x="401" y="172" textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.75">
              VERSION 2.0
            </text>
          </svg>
        </Reveal>

        <div className={PAIR}>
          <Reveal delay={280}>
            <p className={BODY}>
              Evidence-based iteration analyzing real-world patterns
              <Cite n={[40, 41]} />.
            </p>
            <figure aria-hidden className="mt-7 w-full max-w-[25rem]">
              <svg viewBox="0 0 400 112" className="w-full" fill="none">
                {Array.from({ length: 12 }, (_, k) => {
                  const h = 10 + 50 * hash(k + 6101);
                  return (
                    <rect key={k} x={10 + k * 14} y={(80 - h).toFixed(1)} width="9" height={h.toFixed(1)} fill="var(--charcoal)" fillOpacity="0.3" />
                  );
                })}
                <path d="M10 80H180" stroke="var(--charcoal)" strokeOpacity="0.35" />
                <path d="M192 50H236" stroke="var(--charcoal)" strokeOpacity="0.45" />
                <path d={headRight(244, 50)} stroke="var(--charcoal)" strokeOpacity="0.6" />
                <circle cx="310" cy="50" r="30" stroke="var(--crimson)" strokeWidth="1.5" />
                <path d={headRight(0, 0)} transform="translate(314 20)" stroke="var(--crimson)" strokeWidth="1.5" />
                <path d={headRight(0, 0)} transform="translate(306 80) rotate(180)" stroke="var(--crimson)" strokeWidth="1.5" />
                <text {...SVG_LABEL} x="10" y="104" fill="var(--charcoal)" fillOpacity="0.65">
                  REAL-WORLD PATTERNS
                </text>
                <text {...SVG_LABEL} x="311" y="104" textAnchor="middle" fill="var(--crimson)">
                  ITERATION
                </text>
              </svg>
              <Schematic />
            </figure>
          </Reveal>

          <Reveal delay={400} className={COL_RULE}>
            <p className={BODY}>
              Autonomously addressing friction points in software or hardware.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 400 104"
              className="mt-7 w-full max-w-[25rem]"
              fill="none"
            >
              <path d="M10 44H150M186 44H390" stroke="var(--charcoal)" strokeOpacity="0.55" strokeWidth="1.5" />
              <path d="M150 44l6-10l8 20l8-20l8 20l6-10" stroke="var(--crimson)" strokeWidth="2" strokeLinejoin="round" />
              {[10, 80, 260, 390].map((x) => (
                <circle key={x} cx={x === 10 ? 14.5 : x === 390 ? 385.5 : x} cy="44" r="4.5" fill="var(--background)" stroke="var(--charcoal)" strokeOpacity="0.6" />
              ))}
              <text {...SVG_LABEL} x="169" y="78" textAnchor="middle" fill="var(--crimson)">
                FRICTION POINTS
              </text>
              <text {...SVG_LABEL} x="10" y="100" fill="var(--charcoal)" fillOpacity="0.55">
                SOFTWARE OR HARDWARE
              </text>
            </svg>
          </Reveal>
        </div>

        <Discussion delay={520}>
          How do we balance data-driven design with user privacy?
        </Discussion>
      </Slide>

      <PartPlate
        id="part-6"
        numeral="6"
        title="Ethics, Compliance & Standards"
        lines={[
          "Safety and ethics as paramount in physical AI.",
          <>
            Addressing ergonomic bias in historical datasets
            <Cite n={[27, 42]} />.
          </>,
          "Using diverse virtual mannequins for inclusive design.",
        ]}
        discussion="Who is responsible when a biased dataset leads to a physical product failure?"
      />

      {/* ==================================================================
          26 · MITIGATION TOOLS — a lens over a lopsided dataset; a level
          balance; a checklist whose last line is algorithmic fairness.
      ================================================================== */}
      <Slide id="mitigation-tools" border align="left">
        <Head eyebrow="Part 6 · 01 / 02">Mitigation Tools</Head>

        <Reveal delay={140} className="w-full">
          <p className={`${LEAD} mt-9 max-w-4xl`}>
            Identifying bias in training datasets (Credo AI, IBM)
            <Cite n={[43, 44]} />.
          </p>
          <svg
            aria-hidden
            viewBox="0 0 800 150"
            className="mt-8 w-full max-w-5xl"
            fill="none"
          >
            {Array.from({ length: 36 * 6 }, (_, k) => {
              const x = 20 + (k % 36) * 14;
              const y = 20 + Math.floor(k / 36) * 18;
              return hash(k + 7001) > 0.1 ? (
                <circle key={k} cx={x} cy={y} r="3.2" fill="var(--charcoal)" fillOpacity="0.35" />
              ) : (
                <circle key={k} cx={x} cy={y} r="2.7" stroke="var(--charcoal)" strokeOpacity="0.5" />
              );
            })}
            {Array.from({ length: 9 }, (_, i) => {
              const x = 602 + (i % 3) * 18;
              const y = 52 + Math.floor(i / 3) * 18;
              return i === 5 ? (
                <circle key={i} cx={x} cy={y} r="3.6" stroke="var(--crimson)" strokeWidth="1.5" />
              ) : (
                <circle key={i} cx={x} cy={y} r="4" fill="var(--charcoal)" fillOpacity="0.55" />
              );
            })}
            <circle cx="620" cy="70" r="40" stroke="var(--crimson)" strokeWidth="1.5" />
            <path d="M649 99L680 130" stroke="var(--crimson)" strokeWidth="3.5" strokeLinecap="round" />
            <text {...SVG_LABEL} x="682" y="66" fill="var(--crimson)">
              BIAS
            </text>
            <text {...SVG_LABEL} x="20" y="144" fill="var(--charcoal)" fillOpacity="0.65">
              TRAINING DATASETS
            </text>
          </svg>
        </Reveal>

        <div className={PAIR}>
          <Reveal delay={280}>
            <p className={BODY}>
              Ensuring equitable outcomes in generative design.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 400 118"
              className="mt-7 w-full max-w-[25rem]"
              fill="none"
            >
              <path d="M200 30V98M172 98H228" stroke="var(--charcoal)" strokeOpacity="0.6" />
              <path d="M104 26L86 66M104 26L122 66M296 26L278 66M296 26L314 66" stroke="var(--charcoal)" strokeOpacity="0.4" />
              <path d="M80 66Q104 80 128 66M272 66Q296 80 320 66" stroke="var(--charcoal)" strokeOpacity="0.6" />
              <path d="M96 26H304" stroke="var(--crimson)" strokeWidth="2" />
              <path d="M193 34L200 22L207 34Z" fill="var(--charcoal)" fillOpacity="0.6" />
              <text {...SVG_LABEL} x="201" y="114" textAnchor="middle" fill="var(--charcoal)" fillOpacity="0.65">
                EQUITABLE OUTCOMES
              </text>
            </svg>
          </Reveal>

          <Reveal delay={400} className={COL_RULE}>
            <p className={BODY}>Algorithmic fairness as a core quality metric.</p>
            <svg
              aria-hidden
              viewBox="0 0 400 104"
              className="mt-7 w-full max-w-[25rem]"
              fill="none"
            >
              {[150, 120, 170].map((w, r) => {
                const y = 16 + r * 24;
                return (
                  <g key={r}>
                    <rect x="10.5" y={y - 5.5} width="11" height="11" stroke="var(--charcoal)" strokeOpacity="0.5" />
                    <path d={`M13 ${y}l3 3l6-6`} stroke="var(--charcoal)" strokeOpacity="0.6" />
                    <path d={`M36 ${y}H${36 + w}`} stroke="var(--charcoal)" strokeOpacity="0.28" strokeWidth="2" />
                  </g>
                );
              })}
              <rect x="10.5" y="82.5" width="11" height="11" stroke="var(--crimson)" />
              <path d="M13 88l3 3l6-6" stroke="var(--crimson)" strokeWidth="1.5" />
              <text {...SVG_LABEL} x="36" y="91.5" fill="var(--crimson)">
                ALGORITHMIC FAIRNESS
              </text>
            </svg>
          </Reveal>
        </div>

        <Discussion delay={520}>
          Should AI fairness be a standard engineering requirement?
        </Discussion>
      </Slide>

      {/* ==================================================================
          27 · COMPLIANCE AUTOMATION — the Act's scale with its high-risk end
          marked; two documents filling themselves in; one lineage traced
          back through a graph to ISO/IEC 42001.
      ================================================================== */}
      <Slide id="compliance-automation" border align="left">
        <Head eyebrow="Part 6 · 02 / 02">Compliance Automation</Head>

        <Reveal delay={140} className="w-full">
          <p className={`${DISPLAY} mt-9 max-w-4xl`}>
            Navigating the EU AI Act for &quot;high-risk&quot; systems.
          </p>
          <svg
            aria-hidden
            viewBox="0 0 800 72"
            className="mt-8 w-full max-w-5xl"
            fill="none"
          >
            <text {...SVG_LABEL} x="20" y="14" fill="var(--charcoal)" fillOpacity="0.6">
              EU AI ACT
            </text>
            {[0.08, 0.16, 0.26].map((o, k) => (
              <rect key={k} x={20 + k * 192} y="26" width="184" height="14" fill="var(--charcoal)" fillOpacity={o} />
            ))}
            <rect x="596" y="26" width="184" height="14" fill="var(--crimson)" />
            <text {...SVG_LABEL} x="780" y="64" textAnchor="end" fill="var(--crimson)">
              HIGH-RISK
            </text>
          </svg>
        </Reveal>

        <div className={PAIR}>
          <Reveal delay={280}>
            <Labelled label="Automating documentation:">
              model cards, risk assessments (Vanta, Monitaur)
              <Cite n={[45, 46]} />.
            </Labelled>
            <svg
              aria-hidden
              viewBox="0 0 400 118"
              className="mt-7 w-full max-w-[25rem]"
              fill="none"
            >
              {[10, 160].map((x0) => (
                <g key={x0}>
                  <path d={`M${x0 + 0.5} 8.5H${x0 + 86}L${x0 + 100.5} 23V92.5H${x0 + 0.5}Z`} stroke="var(--charcoal)" strokeOpacity="0.6" />
                  <path d={`M${x0 + 86} 8.5V23H${x0 + 100.5}`} stroke="var(--charcoal)" strokeOpacity="0.4" />
                  {[60, 72, 48, 66].map((w, r) => (
                    <path key={r} d={`M${x0 + 14} ${36 + r * 12}H${x0 + 14 + w}`} stroke="var(--crimson)" strokeOpacity="0.6" strokeWidth="2" />
                  ))}
                </g>
              ))}
              <text {...SVG_LABEL} x="10" y="112" fill="var(--charcoal)" fillOpacity="0.65">
                MODEL CARDS
              </text>
              <text {...SVG_LABEL} x="160" y="112" fill="var(--charcoal)" fillOpacity="0.65">
                RISK ASSESSMENTS
              </text>
            </svg>
          </Reveal>

          <Reveal delay={400} className={COL_RULE}>
            <p className={BODY}>
              Tracing lineage for ISO/IEC 42001 compliance
              <Cite n={[47]} />.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 400 112"
              className="mt-7 w-full max-w-[25rem]"
              fill="none"
            >
              <path
                d="M20 56L100 28L180 56L260 28L350 56M100 28L100 84M260 28L260 84M20 56L100 84M180 56L260 84"
                stroke="var(--charcoal)"
                strokeOpacity="0.22"
              />
              <path d="M20 56L100 84L180 56L260 84L350 56" stroke="var(--crimson)" strokeWidth="1.5" />
              {[
                [20, 56, true],
                [100, 28, false],
                [100, 84, true],
                [180, 56, true],
                [260, 28, false],
                [260, 84, true],
                [350, 56, true],
              ].map(([x, y, hot]) => (
                <circle
                  key={`${x}-${y}`}
                  cx={x as number}
                  cy={y as number}
                  r="5"
                  fill="var(--background)"
                  stroke={hot ? "var(--crimson)" : "var(--charcoal)"}
                  strokeOpacity={hot ? 1 : 0.55}
                />
              ))}
              <text {...SVG_LABEL} x="10" y="108" fill="var(--charcoal)" fillOpacity="0.65">
                LINEAGE
              </text>
              <text {...SVG_LABEL} x="390" y="108" textAnchor="end" fill="var(--crimson)">
                ISO/IEC 42001
              </text>
            </svg>
          </Reveal>
        </div>

        <Discussion delay={520}>
          How will regulation impact the speed of AI adoption in product
          development?
        </Discussion>
      </Slide>

      {/* ==================================================================
          28 · SUMMARY OF FINDINGS — three findings as numbered measures: a
          scribble straightened; AI set inside CAD and PLM; a floating,
          unbuildable piece struck from a design.
      ================================================================== */}
      <Slide id="summary" border align="left">
        <Head eyebrow="Closing · 01 / 04">Summary of Findings</Head>

        <ol className="mt-10 w-full max-w-5xl">
          <Measure
            n={1}
            delay={140}
            figure={
              <svg viewBox="0 0 280 96" className="w-full" fill="none">
                <path d="M8 46C18 18 30 70 40 40S58 20 62 48S80 70 90 36" stroke="var(--charcoal)" strokeOpacity="0.5" strokeWidth="1.5" />
                <path d="M104 46H136" stroke="var(--charcoal)" strokeOpacity="0.45" />
                <path d={headRight(144, 46)} stroke="var(--charcoal)" strokeOpacity="0.6" />
                <path d="M160 46H272" stroke="var(--crimson)" strokeWidth="2" />
                <text {...SVG_LABEL} x="0" y="80" fill="var(--charcoal)" fillOpacity="0.65">
                  EXPERIMENTAL
                </text>
                <text {...SVG_LABEL} x="0" y="93" fill="var(--charcoal)" fillOpacity="0.65">
                  CREATIVITY
                </text>
                <text {...SVG_LABEL} x="160" y="80" fill="var(--crimson)">
                  INDUSTRIAL
                </text>
                <text {...SVG_LABEL} x="160" y="93" fill="var(--crimson)">
                  RELIABILITY
                </text>
              </svg>
            }
          >
            <p className={LEAD}>
              AI maturing from experimental creativity to industrial
              reliability.
            </p>
          </Measure>

          <Measure
            n={2}
            delay={240}
            figure={
              <svg viewBox="0 0 280 92" className="w-full" fill="none">
                {[
                  [0, "CAD PHYSICS"],
                  [160, "PLM LOGIC"],
                ].map(([x, label]) => (
                  <g key={label}>
                    <rect x={(x as number) + 0.5} y="10.5" width="118" height="54" stroke="var(--charcoal)" strokeOpacity="0.55" />
                    <rect x={(x as number) + 45.5} y="23.5" width="28" height="28" fill="var(--crimson)" />
                    <text {...SVG_LABEL} letterSpacing={1} x={(x as number) + 60} y="40.5" textAnchor="middle" fill="var(--background)">
                      AI
                    </text>
                    <text {...SVG_LABEL} x={x} y="86" fill="var(--charcoal)" fillOpacity="0.65">
                      {label}
                    </text>
                  </g>
                ))}
              </svg>
            }
          >
            <p className={LEAD}>
              Integration embedding into CAD physics and PLM logic.
            </p>
          </Measure>

          <Measure
            n={3}
            delay={340}
            figure={
              <svg viewBox="0 0 280 92" className="w-full" fill="none">
                <path d="M0 78H130" stroke="var(--charcoal)" strokeOpacity="0.35" />
                <path d="M14 78V54C14 38 34 32 50 40L70 50V78Z" fill="var(--charcoal)" fillOpacity="0.08" stroke="var(--charcoal)" strokeOpacity="0.55" />
                <path d="M84 24C96 16 116 20 118 34C120 46 104 52 92 46Z" stroke="var(--charcoal)" strokeOpacity="0.45" strokeDasharray="3 3" />
                <path d="M92 22l22 22m0-22l-22 22" stroke="var(--crimson)" strokeWidth="1.5" />
                <text {...SVG_LABEL} x="150" y="34" fill="var(--crimson)">
                  UNBUILDABLE
                </text>
                <text {...SVG_LABEL} x="150" y="50" fill="var(--charcoal)" fillOpacity="0.65">
                  GENERATIVE
                </text>
                <text {...SVG_LABEL} x="150" y="66" fill="var(--charcoal)" fillOpacity="0.65">
                  DESIGNS
                </text>
              </svg>
            }
          >
            <p className={LEAD}>
              Manufacturing awareness preventing unbuildable generative
              designs.
            </p>
          </Measure>
        </ol>

        <Discussion delay={460}>
          Which of these maturation signs is most visible in your industry?
        </Discussion>
      </Slide>

      {/* ==================================================================
          29 · SPEED + SAFETY — simulation and compliance converging into
          one marked line; checks running the length of a timeline; the
          conjunction set at display weight and marked.
      ================================================================== */}
      <Slide id="speed-safety" border align="left">
        <Head eyebrow="Closing · 02 / 04">Speed + Safety</Head>

        <Reveal delay={140} className="w-full">
          <p className={`${LEAD} mt-9 max-w-4xl`}>
            Convergence of rapid simulation and automated compliance.
          </p>
          <svg
            aria-hidden
            viewBox="0 0 800 130"
            className="mt-8 w-full max-w-5xl"
            fill="none"
          >
            <path d="M20 24C300 24 460 64 600 64M20 104C300 104 460 64 600 64" stroke="var(--charcoal)" strokeOpacity="0.55" strokeWidth="1.5" />
            <path d="M600 64H770" stroke="var(--crimson)" strokeWidth="2.5" />
            <path d={headRight(778, 64)} stroke="var(--crimson)" strokeWidth="2.5" />
            <circle cx="600" cy="64" r="5" fill="var(--crimson)" />
            <text {...SVG_LABEL} x="20" y="12" fill="var(--charcoal)" fillOpacity="0.65">
              RAPID SIMULATION
            </text>
            <text {...SVG_LABEL} x="20" y="126" fill="var(--charcoal)" fillOpacity="0.65">
              AUTOMATED COMPLIANCE
            </text>
            <text {...SVG_LABEL} x="770" y="48" textAnchor="end" fill="var(--crimson)">
              SPEED + SAFETY
            </text>
          </svg>
        </Reveal>

        <Reveal delay={280} className="w-full">
          <div className={`${RULED} grid items-center gap-8 md:grid-cols-[1fr_25rem] md:gap-14`}>
            <p className={BODY}>Regulatory checks occurring in real-time.</p>
            <svg aria-hidden viewBox="0 0 400 70" className="w-full" fill="none">
              <path d="M10 40H382" stroke="var(--charcoal)" strokeOpacity="0.3" />
              <path d={headRight(390, 40)} stroke="var(--charcoal)" strokeOpacity="0.45" />
              {Array.from({ length: 9 }, (_, k) => (
                <path key={k} d={`M${25 + k * 42} 36l4 4l8-8`} stroke="var(--crimson)" strokeWidth="1.5" />
              ))}
              <text {...SVG_LABEL} x="10" y="64" fill="var(--charcoal)" fillOpacity="0.65">
                REGULATORY CHECKS
              </text>
              <text {...SVG_LABEL} x="390" y="64" textAnchor="end" fill="var(--crimson)">
                REAL-TIME
              </text>
            </svg>
          </div>
        </Reveal>

        <Reveal delay={420} className="w-full">
          <div className="mt-12 w-full max-w-5xl border-y border-[var(--charcoal)]/30 py-9">
            <p className={DISPLAY}>
              Products developed faster{" "}
              <span className="text-[var(--crimson)]">AND</span> safer.
            </p>
          </div>
        </Reveal>

        <Discussion delay={540}>
          Can we truly have both speed and safety, or is there always a
          trade-off?
        </Discussion>
      </Slide>

      {/* ==================================================================
          30 · FUTURE DIRECTIONS — three measures: a detect-and-fix loop;
          different tools joined by one identical format; a grid with only
          three failure cells.
      ================================================================== */}
      <Slide id="future" border align="left">
        <Head eyebrow="Closing · 03 / 04">Future Directions</Head>

        <ol className="mt-10 w-full max-w-5xl">
          <Measure
            n={1}
            delay={140}
            figure={
              <svg viewBox="0 0 280 92" className="w-full" fill="none">
                <circle cx="140" cy="46" r="30" stroke="var(--charcoal)" strokeOpacity="0.4" strokeWidth="1.5" />
                <path d={headRight(144, 16)} stroke="var(--charcoal)" strokeOpacity="0.6" strokeWidth="1.5" />
                <path d={headLeft(136, 76)} stroke="var(--charcoal)" strokeOpacity="0.6" strokeWidth="1.5" />
                <circle cx="110" cy="46" r="4.5" fill="var(--charcoal)" fillOpacity="0.7" />
                <circle cx="170" cy="46" r="4.5" fill="var(--crimson)" />
                <text {...SVG_LABEL} x="98" y="49.5" textAnchor="end" fill="var(--charcoal)" fillOpacity="0.65">
                  DETECTION
                </text>
                <text {...SVG_LABEL} x="182" y="49.5" fill="var(--crimson)">
                  FIXING
                </text>
              </svg>
            }
          >
            <Labelled label='The "Self-Healing" Design Loop:'>
              Autonomous detection and fixing.
            </Labelled>
          </Measure>

          <Measure
            n={2}
            delay={240}
            figure={
              <svg viewBox="0 0 280 92" className="w-full" fill="none">
                {[0, 105, 210].map((x) => (
                  <rect key={x} x={x + 0.5} y="10.5" width="69" height="40" stroke="var(--charcoal)" strokeOpacity="0.55" />
                ))}
                <path d="M70 30.5H105M175 30.5H210" stroke="var(--charcoal)" strokeOpacity="0.4" />
                <rect x="82.5" y="25.5" width="10" height="10" fill="var(--crimson)" />
                <rect x="187.5" y="25.5" width="10" height="10" fill="var(--crimson)" />
                <text {...SVG_LABEL} x="0" y="80" fill="var(--charcoal)" fillOpacity="0.65">
                  STANDARDIZED DATA FORMATS
                </text>
              </svg>
            }
          >
            <Labelled label="Interoperable AI Standards:">
              Standardized data formats
              <Cite n={[48]} />.
            </Labelled>
          </Measure>

          <Measure
            n={3}
            delay={340}
            figure={
              <svg viewBox="0 0 280 92" className="w-full" fill="none">
                {Array.from({ length: 14 * 4 }, (_, k) => {
                  const c = k % 14;
                  const r = Math.floor(k / 14);
                  const hit = (c === 2 && r === 1) || (c === 9 && r === 3) || (c === 12 && r === 0);
                  return (
                    <rect
                      key={k}
                      x={1 + c * 18.5}
                      y={6 + r * 16}
                      width="12"
                      height="12"
                      fill={hit ? "var(--crimson)" : "var(--charcoal)"}
                      fillOpacity={hit ? 1 : 0.08}
                    />
                  );
                })}
                <text {...SVG_LABEL} x="0" y="88" fill="var(--charcoal)" fillOpacity="0.65">
                  SPARSE FAILURE DATA
                </text>
              </svg>
            }
          >
            <Labelled label="Small Data Engineering:">
              Robust models from sparse failure data
              <Cite n={[19]} />.
            </Labelled>
          </Measure>
        </ol>

        <Discussion delay={460}>
          What are the barriers to achieving the &quot;Self-Healing&quot;
          Design Loop?
        </Discussion>
      </Slide>

      {/* ==================================================================
          31 · ACTIONABLE INSIGHTS — three measures: a document marked up in
          review; compliance placed at the start of the line; a small
          network held inside its physics frame.
      ================================================================== */}
      <Slide id="insights" border align="left">
        <Head eyebrow="Closing · 04 / 04">Actionable Insights</Head>

        <ol className="mt-10 w-full max-w-5xl">
          <Measure
            n={1}
            delay={140}
            figure={
              <svg viewBox="0 0 280 92" className="w-full" fill="none">
                <path d="M0.5 4.5H86L100.5 19V87.5H0.5Z" stroke="var(--charcoal)" strokeOpacity="0.6" />
                <path d="M14 30H80M14 42H72M14 54H84M14 66H60" stroke="var(--charcoal)" strokeOpacity="0.28" strokeWidth="2" />
                <ellipse cx="46" cy="42" rx="36" ry="8" stroke="var(--crimson)" strokeWidth="1.5" />
                <path d="M84 42H128" stroke="var(--crimson)" />
                <text {...SVG_LABEL} x="136" y="40" fill="var(--crimson)">
                  AI-AUGMENTED
                </text>
                <text {...SVG_LABEL} x="136" y="55" fill="var(--charcoal)" fillOpacity="0.65">
                  REVIEWS
                </text>
              </svg>
            }
          >
            <p className={LEAD}>
              Adopt &quot;AI-Augmented&quot; Reviews (CoLab)
              <Cite n={[28]} />.
            </p>
          </Measure>

          <Measure
            n={2}
            delay={240}
            figure={
              <svg viewBox="0 0 280 92" className="w-full" fill="none">
                <path d="M0 50H262" stroke="var(--charcoal)" strokeOpacity="0.3" />
                <path d={headRight(270, 50)} stroke="var(--charcoal)" strokeOpacity="0.45" />
                <path d="M70 46V54M130 46V54M190 46V54" stroke="var(--charcoal)" strokeOpacity="0.3" />
                <rect x="0" y="40" width="8" height="20" fill="var(--crimson)" />
                <rect x="240.5" y="40.5" width="8" height="19" stroke="var(--charcoal)" strokeOpacity="0.35" strokeDasharray="2 2" />
                <text {...SVG_LABEL} x="0" y="28" fill="var(--crimson)">
                  COMPLIANCE
                </text>
                <text {...SVG_LABEL} x="0" y="80" fill="var(--charcoal)" fillOpacity="0.65">
                  EARLY
                </text>
              </svg>
            }
          >
            <p className={LEAD}>
              Integrate Compliance Early (Credo AI)
              <Cite n={[47]} />.
            </p>
          </Measure>

          <Measure
            n={3}
            delay={340}
            figure={
              <svg viewBox="0 0 280 92" className="w-full" fill="none">
                {(() => {
                  const at = [
                    [30, 2],
                    [75, 3],
                    [120, 2],
                  ].map(([x, n]) =>
                    Array.from({ length: n }, (_, i) => [x, 46 + (i - (n - 1) / 2) * 22]),
                  );
                  return (
                    <>
                      {at.slice(1).map((col, l) =>
                        col.flatMap(([x2, y2]) =>
                          at[l].map(([x1, y1]) => (
                            <path key={`${x1}-${y1}-${x2}-${y2}`} d={`M${x1} ${y1}L${x2} ${y2}`} stroke="var(--charcoal)" strokeOpacity="0.2" />
                          )),
                        ),
                      )}
                      {at.flat().map(([x, y]) => (
                        <circle key={`${x}-${y}`} cx={x} cy={y} r="4.5" fill="var(--background)" stroke="var(--charcoal)" strokeOpacity="0.6" />
                      ))}
                    </>
                  );
                })()}
                <rect x="0.5" y="6.5" width="150" height="80" rx="10" stroke="var(--crimson)" strokeWidth="1.5" />
                <text {...SVG_LABEL} x="170" y="40" fill="var(--charcoal)" fillOpacity="0.65">
                  PHYSICAL AI
                </text>
                <text {...SVG_LABEL} x="170" y="56" fill="var(--crimson)">
                  PINNS
                </text>
              </svg>
            }
          >
            <p className={LEAD}>
              Invest in &quot;Physical AI&quot; Skills (PINNs context)
              <Cite n={[15, 42]} />.
            </p>
          </Measure>
        </ol>

        <Discussion delay={460}>
          Which insight will you prioritize for your organization?
        </Discussion>
      </Slide>

      {/* ==================================================================
          32 · REFERENCES — the forty-eight citation numbers the deck's
          superscripts point to, set as a quiet grid.
      ================================================================== */}
      <Slide id="references" border align="left">
        <Head eyebrow="Sources">References</Head>

        <Reveal delay={140} className="w-full">
          <p className={`${LEAD} mt-9 max-w-4xl`}>
            Comprehensive list of sources.
          </p>
          <p className={`${BODY} mt-4 max-w-4xl text-[var(--charcoal-light)]`}>
            Citations 1-48 as referenced in deepResearch.md.
          </p>
        </Reveal>

        <Reveal delay={280} className="w-full">
          <div
            aria-hidden
            className="mt-10 grid w-full max-w-5xl grid-cols-6 gap-px border border-[var(--charcoal)]/10 bg-[var(--charcoal)]/10 md:grid-cols-12"
          >
            {Array.from({ length: 48 }, (_, i) => (
              <span
                key={i}
                className="bg-[var(--background)] px-3 py-3 font-mono text-[11px] tracking-[0.1em] text-[var(--champagne)]"
              >
                {pad(i + 1)}
              </span>
            ))}
          </div>
        </Reveal>

        <Discussion delay={420}>
          Which source or paper are you most interested in reading further?
        </Discussion>
      </Slide>
    </SlideDeck>
  );
}
