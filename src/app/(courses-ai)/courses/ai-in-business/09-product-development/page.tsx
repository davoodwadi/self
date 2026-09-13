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
const headUp = (x: number, y: number) => `M${x - 5} ${y + 8}l5-8l5 8`;

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

/**
 * Numbered cells in a hairline grid. `cols` carries the responsive column
 * classes; `mark` turns one cell crimson.
 */
function Steps({
  items,
  cols,
  mark,
  className = "mt-6",
}: {
  items: string[];
  cols: string;
  mark?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`${className} grid grid-cols-2 gap-px bg-[var(--charcoal)]/10 ${cols}`}
    >
      {items.map((item, i) => (
        <div key={item} className="bg-[var(--background)] px-4 py-4">
          <span
            className={`${MICRO} ${
              i === mark ? "text-[var(--crimson)]" : "text-[var(--champagne)]"
            }`}
          >
            {pad(i + 1)}
          </span>
          <span
            className={`mt-2 block font-mono text-[11px] uppercase tracking-[0.1em] ${
              i === mark
                ? "text-[var(--crimson)]"
                : "text-[var(--charcoal-light)]/70"
            }`}
          >
            {item}
          </span>
        </div>
      ))}
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
        title="Generative Design &amp; Engineering"
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
    </SlideDeck>
  );
}
