/* ==========================================================================
   Digital Transformation, kit (Flat Silhouette)
   --------------------------------------------------------------------------
   What every week builds with: the palette, the plate frame, drawing
   primitives (solid shapes, framed screens, arrows) and the deck's slide
   layout blocks. Clean academic layout: white ground, 1px ink hairlines,
   upright sans-serif typography, and SIGNAL red reserved for focal emphasis.
   Every coordinate is a literal or rounded, so server and client match.
   ========================================================================== */

import React from "react";
import Exercise from "@/components/exercises/Exercise";
import type { CourseExercise } from "@/lib/course-exercise";

export { DeckNav } from "./deck-nav";

export const WHITE = "#fffffe";
export const INK = "#1D1B1A";
export const SKIN = "#d7c9b1";
export const SIGNAL = "#A63A2C";
export const COUNTER = "#1F5FAF";
export const COUNTER_FILL = "#CFDDF0";

export const r2 = (n: number) => Math.round(n * 100) / 100;

/* -- frame ---------------------------------------------------------------- */

export function Plate({
  w = 400,
  h,
  title,
  children,
}: {
  w?: number;
  h: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      role="img"
      aria-label={title}
      className="block w-full h-auto select-none [&_*]:outline-none [&_*:focus]:outline-none [&_*:focus-visible]:outline-none"
      style={{ background: WHITE }}
    >
      <title>{title}</title>
      {children}
    </svg>
  );
}

/* A physical shape: solid ink, holes left as white gaps. */
export function Solid({
  outer,
  holes = "",
  tone = INK,
}: {
  outer: string;
  holes?: string;
  tone?: string;
}) {
  return <path d={`${outer} ${holes}`} fill={tone} fillRule="evenodd" />;
}

/* -- cast: Monitor (clean diagram container frame) ------------------------ */

export function Monitor({
  x,
  y,
  w,
  h,
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  children?: React.ReactNode;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill={INK}
        fillOpacity={0.03}
        stroke={INK}
        strokeOpacity={0.35}
        strokeWidth={1.5}
      />
      {children}
    </g>
  );
}

/* -- cast: Arrow ---------------------------------------------------------- */

export function Arrow({
  x1,
  x2,
  y,
  color = INK,
}: {
  x1: number;
  x2: number;
  y: number;
  color?: string;
}) {
  return (
    <g>
      <path d={`M ${x1} ${y} H ${x2 - 8}`} stroke={color} strokeWidth={2} />
      <path
        d={`M ${x2 - 10} ${y - 5.5} L ${x2} ${y} L ${x2 - 10} ${y + 5.5} Z`}
        fill={color}
      />
    </g>
  );
}

/* A straight arrow from (x1, y1) to its tip at (x2, y2), head along the line. */
export function Pointer({
  x1,
  y1,
  x2,
  y2,
  w = 2,
  color = INK,
  head,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  w?: number;
  color?: string;
  /** arrowhead length. Its half-width is a little over half of it */
  head?: number;
}) {
  const sw = Math.min(w, 2.25);
  const len = Math.hypot(x2 - x1, y2 - y1);
  const ux = (x2 - x1) / len;
  const uy = (y2 - y1) / len;
  const hl = Math.min(head ?? 9, 10);
  const hw = r2(hl * 0.55);
  const bx = x2 - ux * hl;
  const by = y2 - uy * hl;
  return (
    <g>
      <path
        d={`M ${x1} ${y1} L ${r2(bx + ux * 1.5)} ${r2(by + uy * 1.5)}`}
        stroke={color}
        strokeWidth={sw}
      />
      <path
        d={`M ${x2} ${y2} L ${r2(bx - uy * hw)} ${r2(by + ux * hw)} L ${r2(bx + uy * hw)} ${r2(by - ux * hw)} Z`}
        fill={color}
      />
    </g>
  );
}

/* -- MiniScreen: a compact diagram node frame (84 × 56) ------------------- */

export function MiniScreen({
  x,
  y,
  children,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
}) {
  const w = 84;
  const h = 56;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill={INK}
        fillOpacity={0.03}
        stroke={INK}
        strokeOpacity={0.35}
        strokeWidth={1.5}
      />
      {children}
    </g>
  );
}

/* -- Knob: a draggable handle on a track (for interactive plates) --------- */

/* A white handle with two arrowheads that moves along a track starting at
   (x, y) and running `len` units right (axis "x") or up (axis "y"). Drag it,
   or use the arrow keys. */
export function Knob({
  x,
  y,
  value,
  min,
  max,
  onChange,
  label,
  tone = INK,
  len = 240,
  axis = "x",
  step = 5,
}: {
  x: number;
  y: number;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  label: string;
  tone?: string;
  len?: number;
  axis?: "x" | "y";
  /** how far one arrow-key press moves the value */
  step?: number;
}) {
  const clamp = (v: number) => Math.min(max, Math.max(min, Math.round(v)));
  const toVal = (e: React.PointerEvent<SVGGElement>) => {
    const svg = e.currentTarget.ownerSVGElement;
    const m = svg?.getScreenCTM();
    if (!svg || !m) return value;
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse());
    const frac = axis === "x" ? (p.x - x) / len : (y - p.y) / len;
    return clamp(min + frac * (max - min));
  };
  const t = (value - min) / (max - min);
  const kx = axis === "x" ? r2(x + t * len) : x;
  const ky = axis === "x" ? y : r2(y - t * len);
  const arrows =
    axis === "x"
      ? [
          `M ${r2(kx - 5)} ${ky} L ${r2(kx - 1)} ${r2(ky - 4)} V ${r2(ky + 4)} Z`,
          `M ${r2(kx + 5)} ${ky} L ${r2(kx + 1)} ${r2(ky - 4)} V ${r2(ky + 4)} Z`,
        ]
      : [
          `M ${kx} ${r2(ky - 5)} L ${r2(kx - 4)} ${r2(ky - 1)} H ${r2(kx + 4)} Z`,
          `M ${kx} ${r2(ky + 5)} L ${r2(kx - 4)} ${r2(ky + 1)} H ${r2(kx + 4)} Z`,
        ];
  return (
    <g
      role="slider"
      tabIndex={0}
      aria-label={label}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-orientation={axis === "x" ? "horizontal" : "vertical"}
      className="outline-none"
      style={{
        cursor: axis === "x" ? "ew-resize" : "ns-resize",
        touchAction: "none",
        userSelect: "none",
      }}
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
      <circle cx={kx} cy={ky} r={20} fill="transparent" />
      <circle
        cx={kx}
        cy={ky}
        r={11}
        fill={WHITE}
        stroke={tone}
        strokeWidth={3.5}
      />
      <path d={arrows[0]} fill={tone} />
      <path d={arrows[1]} fill={tone} />
    </g>
  );
}

/* ==========================================================================
   Deck layout
   ========================================================================== */

/* Theme tokens for the shared ProgressBar / FloatingNav, scoped to the deck. */
export const DECK_THEME = {
  "--background": WHITE,
  "--background-alt": "#f5f4f0",
  "--card": WHITE,
  "--border": "#d9d6cf",
  "--text-primary": INK,
  "--text-secondary": "#2d2b29",
  "--text-muted": "#5e5850",
  "--accent1": SIGNAL,
  "--accent2": SIGNAL,
  "--highlight": SIGNAL,
  "--glow": "transparent",
  "--dt-white": WHITE,
  "--dt-ink": INK,
  "--dt-signal": SIGNAL,
  /* tokens the shared exercises read (src/components/exercises) */
  "--paper": WHITE,
  "--paper-2": "#f5f4f0",
  "--ink": INK,
  "--ink-2": "#2d2b29",
  "--ink-3": "#5e5850",
  "--rule": "#e2dfd9",
  "--rule-2": "#c8c3ba",
  "--signal": SIGNAL,
  "--signal-tint": "rgba(166, 58, 44, 0.08)",
  "--counter": COUNTER,
  "--affirm": COUNTER,
  "--affirm-tint": "rgba(31, 95, 175, 0.08)",
  background: WHITE,
  color: INK,
} as React.CSSProperties;

export const MICRO =
  "font-sans text-[0.875rem] font-medium tracking-normal text-[var(--ink-3)] [font-variant-numeric:tabular-nums]";

/* -- small marks ---------------------------------------------------------- */

export function Kicker({
  children,
  light,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <p
      className={`font-sans text-[0.875rem] font-medium tracking-normal [font-variant-numeric:tabular-nums] ${
        light ? "text-[var(--dt-white)]/80" : "text-[var(--ink-3)]"
      }`}
    >
      {children}
    </p>
  );
}

/* -- frame and plate wrapper ---------------------------------------------- */

export function Frame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
  inner?: string;
}) {
  return <div className={className}>{children}</div>;
}

export function PlateWell({ children }: { children: React.ReactNode }) {
  return <div className="w-full">{children}</div>;
}

/* -- hero ----------------------------------------------------------------- */

export function PosterHero({
  category,
  title,
  subtitle,
  author,
  date,
  institution,
  plate,
  agenda,
}: {
  category: string;
  title: React.ReactNode;
  subtitle?: string;
  author: string;
  date?: string;
  institution: string;
  plate: React.ReactNode;
  /** The lecture's agenda, listed under the subtitle. */
  agenda?: string[];
}) {
  return (
    <section
      data-slide
      id="hero"
      className="min-h-svh flex items-center px-6 lg:px-12 py-10 md:py-12"
    >
      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">
        <div>
          <div className={MICRO}>{category}</div>
          <h1 className="mt-4 font-sans font-bold text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.15] tracking-[-0.015em] text-[var(--dt-ink)]">
            {title}
          </h1>
          <div className="mt-6 h-px w-full bg-[var(--dt-ink)]/15" />
          {subtitle && (
            <p className="mt-6 font-sans text-lg md:text-[1.25rem] font-normal leading-relaxed text-[var(--ink-2)] max-w-2xl">
              {subtitle}
            </p>
          )}
          {agenda && (
            <div className="mt-6 max-w-2xl">
              <p className="font-sans text-[0.875rem] font-semibold tracking-normal text-[var(--ink-3)]">
                Agenda
              </p>
              <ol
                className={`mt-2 ${agenda.length > 4 ? "sm:grid sm:grid-flow-col sm:gap-x-8" : ""}`}
                style={
                  agenda.length > 4
                    ? {
                        gridTemplateRows: `repeat(${Math.ceil(agenda.length / 2)}, auto)`,
                      }
                    : undefined
                }
              >
                {agenda.map((item, i) => (
                  <li
                    key={item}
                    className={`flex items-baseline gap-3.5 py-2 border-t border-[var(--dt-ink)]/12 first:border-t-0 ${
                      agenda.length > 4 && i === Math.ceil(agenda.length / 2)
                        ? "sm:border-t-0"
                        : ""
                    }`}
                  >
                    <span className={`${MICRO} w-6 shrink-0`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-sans font-medium text-base leading-snug text-[var(--dt-ink)]">
                      {item}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}
          <div className="mt-10 flex w-full flex-wrap items-baseline justify-between gap-4 border-t border-[var(--dt-ink)]/12 pt-5">
            <span className={MICRO}>{author}</span>
            <span className="font-sans text-[0.875rem] font-normal text-[var(--ink-3)]/80">
              {date ? `${date} | ${institution}` : institution}
            </span>
          </div>
        </div>
        <div className="w-full max-w-xl mx-auto">{plate}</div>
      </div>
    </section>
  );
}

/* -- chapter band --------------------------------------------------------- */

export function ChapterBand({
  id,
  number,
  title,
  description,
}: {
  id: string;
  number: string;
  title: string;
  description?: string;
}) {
  return (
    <section
      data-slide
      id={id}
      className="border-t border-[var(--dt-ink)]/10 px-6 lg:px-12 py-10 md:py-12 min-h-svh flex items-center"
    >
      <div className="max-w-6xl w-full mx-auto">
        <div className="w-full max-w-4xl">
          <div className="font-sans text-[0.875rem] font-semibold tracking-normal text-[var(--dt-signal)] [font-variant-numeric:tabular-nums]">
            Part {number}
          </div>
          <h2 className="mt-3 font-sans font-bold text-[2rem] md:text-[2.75rem] leading-[1.15] tracking-[-0.015em] text-[var(--dt-ink)]">
            {title}
          </h2>
          <div className="mt-6 h-px w-full bg-[var(--dt-ink)]/15" />
          {description && (
            <p className="mt-6 font-sans text-lg md:text-xl font-normal leading-relaxed text-[var(--ink-2)] max-w-3xl">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

/* -- slide and beats ------------------------------------------------------ */

export function Slide({
  id,
  title,
  exercise,
  exerciseArt,
  children,
}: {
  id?: string;
  label?: string;
  title?: string;
  /** The exercise that follows this slide, on its own screen (any type). */
  exercise?: CourseExercise;
  /** Drawings for the exercise's cards, keyed by card or pair id. */
  exerciseArt?: Record<string, React.ReactNode>;
  children: React.ReactNode;
}) {
  return (
    <>
      <section
        data-slide
        id={id}
        className="min-h-svh flex flex-col justify-center border-t border-[var(--dt-ink)]/10 px-6 lg:px-12 py-10 md:py-12"
      >
        <div className="max-w-6xl w-full mx-auto">
          {title && (
            <header className="mb-6 md:mb-8">
              <h2 className="max-w-4xl font-sans font-bold text-[1.75rem] md:text-[2.375rem] leading-[1.2] tracking-[-0.015em] text-[var(--dt-ink)]">
                {title}
              </h2>
              <div className="h-px w-full bg-[var(--dt-ink)]/12 mt-5" />
            </header>
          )}
          <div className="flex flex-col gap-6 md:gap-8">{children}</div>
        </div>
      </section>
      {/* The exercise follows its slide on a screen of its own, from a fixed top
        so the prompt stays put while cards move and feedback opens below. */}
      {exercise && (
        <section
          data-slide
          aria-label="Exercise"
          className="min-h-svh flex flex-col justify-start border-t border-[var(--dt-ink)]/10 px-6 lg:px-12 pt-[14svh] pb-16 bg-[var(--paper-2)]"
        >
          <div className="max-w-6xl w-full mx-auto">
            <Exercise data={exercise} art={exerciseArt} />
          </div>
        </section>
      )}
    </>
  );
}

/* A row of cells. `cols` sets the wide-screen split. Phones stack in order. */
export function Row({
  children,
  cols = "lg:grid-cols-2",
  className = "",
}: {
  children: React.ReactNode;
  cols?: string;
  className?: string;
}) {
  return (
    <div className={`grid gap-6 md:gap-8 items-center ${cols} ${className}`}>
      {children}
    </div>
  );
}

/* -- class discussion ----------------------------------------------------- */

export function DiscussionSlide({
  quote,
  author,
  plate,
}: {
  quote: string;
  author: string;
  plate?: React.ReactNode;
}) {
  return (
    <section
      data-slide
      className="border-t border-[var(--dt-ink)]/10 px-6 lg:px-12 py-10 md:py-12 min-h-svh flex items-center"
    >
      <div
        className={`max-w-6xl w-full mx-auto ${
          plate ? "grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-14 items-center" : ""
        }`}
      >
        <aside className="max-w-4xl border border-[var(--dt-ink)]/15 p-6 md:p-8">
          <div className={MICRO}>{author || "Discussion"}</div>
          <p className="mt-3 font-sans text-xl md:text-[1.5rem] font-semibold leading-[1.4] tracking-[-0.01em] text-[var(--dt-ink)]">
            {quote}
          </p>
        </aside>
        {plate && <div className="max-w-sm w-full mx-auto">{plate}</div>}
      </div>
    </section>
  );
}

/* -- summary -------------------------------------------------------------- */

export function Summary({
  id,
  title,
  summary,
  takeaways,
}: {
  id: string;
  title: string;
  summary?: string;
  takeaways: string[];
}) {
  return (
    <section
      data-slide
      id={id}
      className="min-h-svh flex flex-col justify-center border-t border-[var(--dt-ink)]/10 px-6 lg:px-12 py-10 md:py-12"
    >
      <div className="w-full max-w-6xl mx-auto">
        <header className="mb-6 md:mb-8">
          <div className={MICRO}>Summary</div>
          <h2 className="mt-2 max-w-4xl font-sans font-bold text-[1.75rem] md:text-[2.375rem] leading-[1.2] tracking-[-0.015em] text-[var(--dt-ink)]">
            {title}
          </h2>
          {summary && (
            <p className="mt-4 font-sans text-lg leading-[1.6] text-[var(--ink-2)] max-w-3xl">
              {summary}
            </p>
          )}
        </header>
        <div className="border-t border-[var(--dt-ink)]/15 pt-6">
          <h3 className={MICRO}>Key takeaways</h3>
          <ol className="mt-4">
            {takeaways.map((t, i) => (
              <li
                key={t}
                className="flex items-baseline gap-5 py-4 border-t border-[var(--dt-ink)]/12 first:border-t-0 first:pt-0 last:pb-0"
              >
                <span className="font-sans text-[0.875rem] font-semibold text-[var(--dt-signal)] w-6 shrink-0 [font-variant-numeric:tabular-nums]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-sans text-lg leading-[1.6] text-[var(--dt-ink)]">
                  {t}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* -- class discussion: several questions, numbered ------------------------ */

export function DiscussionList({
  id,
  questions,
  plate,
}: {
  id?: string;
  questions: string[];
  plate?: React.ReactNode;
}) {
  return (
    <section
      data-slide
      id={id}
      className="min-h-svh flex items-center border-t border-[var(--dt-ink)]/10 px-6 lg:px-12 py-10 md:py-12"
    >
      <div
        className={`max-w-6xl w-full mx-auto ${
          plate ? "grid lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-16 items-center" : ""
        }`}
      >
        <aside className="max-w-4xl border border-[var(--dt-ink)]/15 p-6 md:p-8">
          <div className={MICRO}>Discussion</div>
          <ol className="mt-4">
            {questions.map((q, i) => (
              <li
                key={q}
                className="flex items-baseline gap-4 py-4 border-t border-[var(--dt-ink)]/12 first:border-t-0 first:pt-0 last:pb-0"
              >
                <span className="font-sans text-[0.875rem] font-semibold text-[var(--ink-3)] w-6 shrink-0 [font-variant-numeric:tabular-nums]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-sans text-lg md:text-[1.1875rem] font-normal leading-relaxed text-[var(--dt-ink)]">
                  {q}
                </span>
              </li>
            ))}
          </ol>
        </aside>
        {plate && <div className="max-w-sm w-full mx-auto">{plate}</div>}
      </div>
    </section>
  );
}

/* -- a defined term: bold ink name, then its sentence --------------------- */

export function Term({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <p>
      <strong className="font-sans font-semibold text-[var(--dt-ink)]">{name}</strong>: {children}
    </p>
  );
}
