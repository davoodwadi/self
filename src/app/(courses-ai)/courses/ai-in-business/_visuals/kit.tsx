/* ==========================================================================
   Shared kit: the building blocks every week draws and lays out with, colours and type, the plate frame and label helpers, geometry helpers
   and slide layout blocks. See "Shared pieces" in the root CLAUDE.md.
   ========================================================================== */

import React from "react";
import { Slide } from "@/app/(courses-ai)/_components/SlideComponents";
import { type CourseQuiz } from "@/lib/course-quiz";

/** Academic rubric label treatment used for axis ticks, step indices, and metadata. */
export const MICRO =
  "font-sans text-[0.875rem] font-medium tracking-normal [font-variant-numeric:tabular-nums]";

/** The academic label treatment for SVG <text>. */
export const SVG_LABEL = {
  fontSize: 9.5,
  letterSpacing: 0.2,
  fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
  fontWeight: 500,
} as const;

/** Body sentence at the deck's reading size. */
export const BODY =
  "font-sans text-lg leading-[1.6] text-[var(--ink)] md:text-[1.1875rem]";

/** A sentence promoted to display weight inside a block. */
export const DISPLAY =
  "font-sans text-[1.25rem] font-semibold leading-[1.4] tracking-[-0.01em] text-[var(--ink)] md:text-[1.625rem]";

/** A sentence one step below display, used inside rules and frames. */
export const LEAD =
  "font-sans text-xl leading-[1.5] text-[var(--ink)] md:text-[1.375rem]";

/** Hairline that opens each later block of a slide. */
export const RULED = "mt-12 w-full max-w-5xl border-t border-[var(--ink)]/10 pt-8";

/** Academic tag treatment for words lifted out of a sentence. */
export const TAG = "font-sans text-[0.875rem] font-medium tracking-normal";

export const pad = (n: number) => String(n);

/** Deterministic 0 to 1 hash, so scattered marks match between server and client. */
export const hash = (n: number) => {
  const v = Math.sin(n * 12.9898 + 78.233) * 43758.5453;
  return v - Math.floor(v);
};

/** Right-pointing open arrowhead whose tip sits at (x, y). */
export const headRight = (x: number, y: number) => `M${x - 8} ${y - 5}l8 5l-8 5`;

/** Two sentences side by side under one hairline. */
export const PAIR =
  "mt-12 grid w-full max-w-5xl gap-10 border-t border-[var(--ink)]/10 pt-8 md:grid-cols-2 md:gap-14";

/** The divider a second column takes inside PAIR. */
export const COL_RULE = "md:border-l md:border-[var(--ink)]/10 md:pl-14";

/** Sources listed on the closing Sources slide, by their content.md number. */
export const LISTED = new Set([1, 2, 4, 6, 11, 19, 29, 34, 48]);

export const headLeft = (x: number, y: number) => `M${x + 8} ${y - 5}l-8 5l8 5`;

export const headDown = (x: number, y: number) => `M${x - 5} ${y - 8}l5 8l5-8`;

export const headUp = (x: number, y: number) => `M${x - 5} ${y + 8}l5-8l5 8`;

/** A [cite: N] marker from content.md, set as superscript source numbers. */
export function Cite1({ n }: { n: number[] }) {
  return (
    <sup className="ml-1 whitespace-nowrap font-sans text-[0.6em] font-medium not-italic tracking-normal text-[var(--ink-2)]/75 [font-variant-numeric:tabular-nums]">
      {n.map((k, i) => (
        <React.Fragment key={k}>
          {i > 0 && ", "}
          {LISTED.has(k) ? (
            <a
              href={`#source-${k}`}
              className="underline decoration-[var(--ink-2)]/40 underline-offset-2 hover:text-[var(--accent)]"
            >
              {k}
            </a>
          ) : (
            k
          )}
        </React.Fragment>
      ))}
    </sup>
  );
}

/** A [cite: N] marker from content.md, set as superscript source numbers. */
export function Cite2({ n }: { n: number[] }) {
  return (
    <sup className="ml-1 whitespace-nowrap font-sans text-[0.6em] font-medium not-italic tracking-normal text-[var(--ink-2)]/75 [font-variant-numeric:tabular-nums]">
      {n.join(", ")}
    </sup>
  );
}

/** Discussion prompt, set apart in the deck's one ruled frame. The slide heading names it. */
export function Discussion1({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <aside className="mt-12 max-w-3xl border border-[var(--ink)]/15 p-6 md:p-8">
        <p className="font-sans text-lg font-normal leading-relaxed text-[var(--ink)] md:text-[1.1875rem]">
          {children}
        </p>
      </aside>
    </div>
  );
}

/**
 * Discussion prompt, set apart in the deck's one ruled frame. `figure` sits
 * under the prompt when the question itself carries something to draw.
 */
export function Discussion2({
  children,
  figure,
}: {
  children: React.ReactNode;
  figure?: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <aside className="mt-12 max-w-3xl border border-[var(--ink)]/15 p-6 md:p-8">
        <p className="font-sans text-lg font-normal leading-relaxed text-[var(--ink)] md:text-[1.1875rem]">
          {children}
        </p>
        {figure && <div className="mt-6">{figure}</div>}
      </aside>
    </div>
  );
}

/** Slide heading, the masthead every content slide opens with. */
export function Head1({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="max-w-4xl font-sans text-[1.75rem] font-bold leading-[1.2] tracking-[-0.015em] text-[var(--ink)] md:text-[2.375rem]">
        {children}
      </h2>
    </div>
  );
}

/**
 * Slide heading. When a heading opens with a "Label:" prefix, it is rendered
 * inline inside the same h2 so the heading reads as one sentence.
 */
export function Head2({
  kicker,
  children,
}: {
  kicker?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="max-w-4xl font-sans text-[1.75rem] font-bold leading-[1.2] tracking-[-0.015em] text-[var(--ink)] md:text-[2.375rem]">
        {kicker ? `${kicker} ` : ""}
        {children}
      </h2>
    </div>
  );
}

/** Slide heading. */
export function Head3({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="max-w-4xl font-sans text-[1.75rem] font-bold leading-[1.2] tracking-[-0.015em] text-[var(--ink)] md:text-[2.375rem]">
        {children}
      </h2>
    </div>
  );
}

/** One numbered measure: numeral, its sentence, and its own small figure. */
export function Measure({
  n,
  figure,
  children,
}: {
  n: number;
  figure: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li className="block">
      <div className="grid gap-5 border-t border-[var(--ink)]/12 py-8 md:grid-cols-[4ch_1fr_17rem] md:items-center md:gap-10">
        <span className={`${MICRO} text-[var(--accent)] md:self-start md:pt-2`}>
          {pad(n)}
        </span>
        <div>{children}</div>
        <div aria-hidden className="w-full max-w-[17rem]">
          {figure}
        </div>
      </div>
    </li>
  );
}

/** Module divider: clean section header with module number, title, and overview lines. */
export function ModulePlate1({
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
      <div className="w-full max-w-4xl">
        <div className={`${MICRO} font-semibold text-[var(--accent)]`}>
          Module {numeral}
        </div>
        <h2 className="mt-3 font-sans text-[2rem] font-bold leading-[1.15] tracking-[-0.015em] text-[var(--ink)] md:text-[2.75rem]">
          {title}
        </h2>
        <div className="mt-6 h-px w-full bg-[var(--ink)]/15" />
        {lines.map((line, i) => (
          <p
            key={line}
            className={`${
              i === 0 ? "mt-6" : "mt-3"
            } max-w-3xl font-sans text-lg font-normal leading-relaxed text-[var(--ink-2)] md:text-xl`}
          >
            {line}
          </p>
        ))}
      </div>
    </Slide>
  );
}

/** Module divider: clean section header with module number, title, and overview lines. */
export function ModulePlate2({
  id,
  numeral,
  title,
  lines,
  quizData,
}: {
  id: string;
  numeral: string;
  title: string;
  lines: string[];
  quizData?: CourseQuiz;
}) {
  return (
    <Slide id={id} border align="left" quizData={quizData}>
      <div className="w-full max-w-4xl">
        <div className={`${MICRO} font-semibold text-[var(--accent)]`}>
          Module {numeral}
        </div>
        <h2 className="mt-3 font-sans text-[2rem] font-bold leading-[1.15] tracking-[-0.015em] text-[var(--ink)] md:text-[2.75rem]">
          {title}
        </h2>
        <div className="mt-6 h-px w-full bg-[var(--ink)]/15" />
        {lines.map((line, i) => (
          <p
            key={line}
            className={`${
              i === 0 ? "mt-6" : "mt-3"
            } max-w-3xl font-sans text-lg font-normal leading-relaxed text-[var(--ink-2)] md:text-xl`}
          >
            {line}
          </p>
        ))}
      </div>
    </Slide>
  );
}

/**
 * Part divider: clean section header with part number, title, and overview lines.
 */
export function PartPlate1({
  id,
  numeral,
  title,
  lines,
  quizData,
}: {
  id: string;
  numeral: string;
  title: string;
  lines: string[];
  quizData?: CourseQuiz;
}) {
  return (
    <Slide id={id} border align="left" quizData={quizData}>
      <div className="w-full max-w-4xl">
        <div aria-hidden className={`${MICRO} font-semibold text-[var(--accent)]`}>
          Part {numeral}
        </div>
        <h2 className="mt-3 font-sans text-[2rem] font-bold leading-[1.15] tracking-[-0.015em] text-[var(--ink)] md:text-[2.75rem]">
          <span className="sr-only">{`Part ${numeral}: `}</span>
          {title}
        </h2>
        <div className="mt-6 h-px w-full bg-[var(--ink)]/15" />
        {lines.map((line, i) => (
          <p
            key={line}
            className={`${
              i === 0 ? "mt-6" : "mt-3"
            } max-w-3xl font-sans text-lg font-normal leading-relaxed text-[var(--ink-2)] md:text-xl`}
          >
            {line}
          </p>
        ))}
      </div>
    </Slide>
  );
}

/**
 * Part divider: clean section header with part number, title, overview lines,
 * and the part's discussion prompt.
 */
export function PartPlate2({
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
  lines: string[];
  discussion: string;
  quizData?: CourseQuiz;
}) {
  return (
    <Slide id={id} border align="left" quizData={quizData}>
      <div className="w-full max-w-4xl">
        <div aria-hidden className={`${MICRO} font-semibold text-[var(--accent)]`}>
          Part {numeral}
        </div>
        <h2 className="mt-3 font-sans text-[2rem] font-bold leading-[1.15] tracking-[-0.015em] text-[var(--ink)] md:text-[2.75rem]">
          <span className="sr-only">{`Part ${numeral}: `}</span>
          {title}
        </h2>
        <div className="mt-6 h-px w-full bg-[var(--ink)]/15" />
        {lines.map((line, i) => (
          <p
            key={line}
            className={`${
              i === 0 ? "mt-6" : "mt-3"
            } max-w-3xl font-sans text-lg font-normal leading-relaxed text-[var(--ink-2)] md:text-xl`}
          >
            {line}
          </p>
        ))}
      </div>

      <div className="w-full max-w-4xl">
        <Discussion1>{discussion}</Discussion1>
      </div>
    </Slide>
  );
}

/**
 * Part divider: clean section header with part number, title, overview lines,
 * and the part's discussion prompt.
 */
export function PartPlate3({
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
      <div className="w-full max-w-4xl">
        <div aria-hidden className={`${MICRO} font-semibold text-[var(--accent)]`}>
          Part {numeral}
        </div>
        <h2 className="mt-3 font-sans text-[2rem] font-bold leading-[1.15] tracking-[-0.015em] text-[var(--ink)] md:text-[2.75rem]">
          <span className="sr-only">{`Part ${numeral}: `}</span>
          {title}
        </h2>
        <div className="mt-6 h-px w-full bg-[var(--ink)]/15" />
        {lines.map((line, i) => (
          <p
            key={i}
            className={`${
              i === 0 ? "mt-6" : "mt-3"
            } max-w-3xl font-sans text-lg font-normal leading-relaxed text-[var(--ink-2)] md:text-xl`}
          >
            {line}
          </p>
        ))}
      </div>

      <div className="w-full max-w-4xl">
        <Discussion1>{discussion}</Discussion1>
      </div>
    </Slide>
  );
}


/** Two labels set against each other across one rule. The right one is marked. */
export function Split1({
  left,
  right,
  strikeLeft = false,
  cols = "grid-cols-2",
}: {
  left: string;
  right: string;
  strikeLeft?: boolean;
  cols?: string;
}) {
  return (
    <div
      aria-hidden
      className={`grid ${cols} border-b border-[var(--ink)]/15 pb-3`}
    >
      <span
        className={`${MICRO} pr-4 text-[var(--ink-2)]/55 ${
          strikeLeft ? "[text-decoration-line:line-through]" : ""
        }`}
      >
        {left}
      </span>
      <span
        className={`${MICRO} border-l border-[var(--accent)]/40 pl-6 text-[var(--accent)]`}
      >
        {right}
      </span>
    </div>
  );
}

/** Two labels set against each other across one rule. The right one is marked. */
export function Split2({
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
      className="grid grid-cols-2 border-b border-[var(--ink)]/15 pb-3"
    >
      <span
        className={`${MICRO} pr-4 text-[var(--ink-2)]/55 ${
          strikeLeft ? "[text-decoration-line:line-through]" : ""
        }`}
      >
        {left}
      </span>
      <span
        className={`${MICRO} border-l border-[var(--accent)]/40 pl-6 text-[var(--accent)]`}
      >
        {right}
      </span>
    </div>
  );
}

/**
 * A number lifted from the sentence under it, set at display size with its
 * unit label. `mark` turns the number accent.
 */
export function Stat1({
  value,
  unit,
  mark = false,
  size = "lg",
}: {
  value: string;
  unit: string;
  mark?: boolean;
  size?: "lg" | "md";
}) {
  return (
    <div aria-hidden className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
      <span
        className={`font-sans font-bold leading-none tracking-[-0.02em] tabular-nums ${
          size === "lg"
            ? "text-[2.75rem] md:text-[3.5rem]"
            : "text-[2.25rem] md:text-[2.75rem]"
        } ${mark ? "text-[var(--accent)]" : "text-[var(--ink)]"}`}
      >
        {value}
      </span>
      <span className={`${MICRO} text-[var(--ink-2)]/65`}>{unit}</span>
    </div>
  );
}

/**
 * A number lifted from the sentence under it, set at display size with its
 * unit label. `mark` turns the number accent.
 */
export function Stat2({
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
        className={`font-sans text-[2.75rem] font-bold leading-none tracking-[-0.02em] tabular-nums md:text-[3.5rem] ${
          mark ? "text-[var(--accent)]" : "text-[var(--ink)]"
        }`}
      >
        {value}
      </span>
      <span className={`${MICRO} text-[var(--ink-2)]/65`}>{unit}</span>
    </div>
  );
}

/**
 * Numbered cells in a hairline grid. `cols` carries the responsive column
 * classes. `mark` turns one cell accent.
 */
export function Steps({
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
      className={`${className} grid grid-cols-2 gap-px bg-[var(--ink)]/10 ${cols}`}
    >
      {items.map((item, i) => (
        <div key={item} className="bg-[var(--background)] px-4 py-4">
          <span
            className={`${MICRO} ${
              i === mark ? "text-[var(--accent)]" : "text-[var(--ink-2)]"
            }`}
          >
            {pad(i + 1)}
          </span>
          <span
            className={`mt-2 block font-sans text-[0.9375rem] leading-snug ${
              i === mark
                ? "text-[var(--accent)]"
                : "text-[var(--ink-2)]/85"
            }`}
          >
            {item}
          </span>
        </div>
      ))}
    </div>
  );
}

/** A sentence's own list, set as vertical-bar-separated academic terms. */
export function Terms({
  items,
  className = "mt-5",
}: {
  items: string[];
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`${className} flex flex-wrap gap-x-3 gap-y-2 font-sans text-[0.875rem] font-medium text-[var(--ink-2)]/75`}
    >
      {items.map((item, i) => (
        <React.Fragment key={item}>
          {i > 0 && <span>|</span>}
          <span>{item}</span>
        </React.Fragment>
      ))}
    </div>
  );
}

/** Closing statement in display weight. */
export function Verdict({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <p className="mt-12 max-w-4xl font-sans text-[1.25rem] font-semibold leading-[1.4] tracking-[-0.01em] text-[var(--ink)] md:text-[1.625rem]">
        {children}
      </p>
    </div>
  );
}

/* ==========================================================================
   Plate primitives
   ========================================================================== */

/** Course palette for SVG plates, read from the theme tokens. */
export const C = {
  ink: "var(--ink)",
  ink2: "var(--ink-2)",
  ink3: "var(--ink-3)",
  rule: "var(--rule)",
  accent: "var(--accent)",
  tint: "rgba(44, 74, 140, 0.1)",
  grey: "rgba(103, 109, 119, 0.14)",
  paper: "var(--paper)",
} as const;

/** Round to two decimals, so SVG attributes match between server and client. */
export const r2 = (n: number) => Math.round(n * 100) / 100;

/** A plate label at a given size, from the course label treatment. */
export const label = (fontSize = 13, fontWeight = 500) =>
  ({ ...SVG_LABEL, fontSize, fontWeight, letterSpacing: 0 }) as const;

/** The SVG frame every plate draws in. `title` is read aloud in place of the drawing. */
export function Plate({
  w,
  h,
  title,
  className = "",
  children,
}: {
  w: number;
  h: number;
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      role="img"
      aria-label={title}
      className={`block h-auto w-full ${className}`}
    >
      {children}
    </svg>
  );
}

/** An arrow from (x1, y1) to (x2, y2) with an open head at the far end. */
export function Arrow({
  x1,
  y1,
  x2,
  y2,
  tone = C.ink,
  width = 1.6,
  dash,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  tone?: string;
  width?: number;
  dash?: string;
}) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const h = 8;
  const p1 = [x2 - h * Math.cos(a - 0.45), y2 - h * Math.sin(a - 0.45)];
  const p2 = [x2 - h * Math.cos(a + 0.45), y2 - h * Math.sin(a + 0.45)];
  return (
    <g stroke={tone} strokeWidth={width} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={`M${r2(x1)} ${r2(y1)}L${r2(x2)} ${r2(y2)}`} strokeDasharray={dash} />
      <path d={`M${r2(p1[0])} ${r2(p1[1])}L${r2(x2)} ${r2(y2)}L${r2(p2[0])} ${r2(p2[1])}`} />
    </g>
  );
}

/**
 * A draggable handle on a track, for plates where moving one value shows a
 * relationship. Works with pointer, touch and arrow keys.
 */
export function Knob({
  x,
  y,
  value,
  min,
  max,
  onChange,
  label: name,
  len = 240,
  step = 1,
  tone = C.accent,
}: {
  x: number;
  y: number;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  label: string;
  len?: number;
  step?: number;
  tone?: string;
}) {
  const clamp = (v: number) =>
    Math.min(max, Math.max(min, Math.round(v / step) * step));
  const toVal = (e: React.PointerEvent<SVGGElement>) => {
    const svg = e.currentTarget.ownerSVGElement;
    const m = svg?.getScreenCTM();
    if (!svg || !m) return value;
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse());
    return clamp(min + ((p.x - x) / len) * (max - min));
  };
  const kx = r2(x + ((value - min) / (max - min)) * len);
  return (
    <g
      role="slider"
      tabIndex={0}
      aria-label={name}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      className="outline-none"
      style={{ cursor: "ew-resize", touchAction: "none", userSelect: "none" }}
      onPointerDown={(e) => {
        e.preventDefault();
        e.currentTarget.setPointerCapture(e.pointerId);
        onChange(toVal(e));
      }}
      onPointerMove={(e) => {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) onChange(toVal(e));
      }}
      onKeyDown={(e) => {
        const d =
          e.key === "ArrowRight" || e.key === "ArrowUp"
            ? step
            : e.key === "ArrowLeft" || e.key === "ArrowDown"
              ? -step
              : 0;
        if (!d) return;
        e.preventDefault();
        onChange(clamp(value + d));
      }}
    >
      <rect x={x - 14} y={y - 16} width={len + 28} height={32} fill="transparent" />
      <line x1={x} y1={y} x2={x + len} y2={y} stroke={C.rule} strokeWidth={4} strokeLinecap="round" />
      <line x1={x} y1={y} x2={kx} y2={y} stroke={tone} strokeWidth={4} strokeLinecap="round" />
      <circle cx={kx} cy={y} r={10} fill={C.paper} stroke={tone} strokeWidth={3} />
    </g>
  );
}
