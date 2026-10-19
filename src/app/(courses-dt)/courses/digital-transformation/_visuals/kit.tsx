/* ==========================================================================
   Digital Transformation — kit (Flat Silhouette)
   --------------------------------------------------------------------------
   What every week builds with: the palette, the plate frame, drawing
   primitives (solid shapes, framed screens, arrows) and the deck's slide
   layout blocks. Poster-like page pieces: warm cream ground, heavy ink rules
   with a thin inner rule, small ink diamonds as the only ornament, SIGNAL red
   for the kicker and numerals. Flat colour only.
   Every coordinate is a literal or rounded, so server and client match.
   ========================================================================== */

import React from "react";
import Exercise from "@/components/exercises/Exercise";
import type { CourseExercise } from "@/lib/course-exercise";

export { DeckNav } from "./deck-nav";

export const CREAM = "#EFEBE3";
export const INK = "#1D1B1A";
export const SKIN = "#DCCFB8";
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
      style={{ background: CREAM }}
    >
      <title>{title}</title>
      {children}
    </svg>
  );
}

/* A physical shape: solid ink, holes left as cream gaps. */
export function Solid({ outer, holes = "", tone = INK }: { outer: string; holes?: string; tone?: string }) {
  return <path d={`${outer} ${holes}`} fill={tone} fillRule="evenodd" />;
}

/* -- cast: Monitor (heavy frame, thin inner rule, stand) ------------------ */

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
  const cx = r2(x + w / 2);
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={INK} strokeWidth={8} />
      <rect
        x={x + 9}
        y={y + 9}
        width={w - 18}
        height={h - 18}
        fill="none"
        stroke={INK}
        strokeWidth={1.5}
      />
      <path d={`M ${cx - 10} ${y + h + 4} H ${cx + 10} V ${y + h + 22} H ${cx - 10} Z`} fill={INK} />
      <path d={`M ${cx - 40} ${y + h + 22} H ${cx + 40} V ${y + h + 30} H ${cx - 40} Z`} fill={INK} />
      {children}
    </g>
  );
}

/* -- cast: Arrow ---------------------------------------------------------- */

export function Arrow({ x1, x2, y, color = INK }: { x1: number; x2: number; y: number; color?: string }) {
  return (
    <g>
      <path d={`M ${x1} ${y} H ${x2 - 14}`} stroke={color} strokeWidth={6} />
      <path d={`M ${x2 - 18} ${y - 12} L ${x2} ${y} L ${x2 - 18} ${y + 12} Z`} fill={color} />
    </g>
  );
}

/* A straight arrow from (x1, y1) to its tip at (x2, y2), head along the line. */
export function Pointer({
  x1,
  y1,
  x2,
  y2,
  w = 4,
  color = INK,
  head,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  w?: number;
  color?: string;
  /** arrowhead length; its half-width is a little over half of it */
  head?: number;
}) {
  const len = Math.hypot(x2 - x1, y2 - y1);
  const ux = (x2 - x1) / len;
  const uy = (y2 - y1) / len;
  const hl = head ?? 14 + w * 2;
  const hw = head ? r2(head * 0.6) : 8 + w;
  const bx = x2 - ux * hl;
  const by = y2 - uy * hl;
  return (
    <g>
      <path d={`M ${x1} ${y1} L ${r2(bx + ux * 2)} ${r2(by + uy * 2)}`} stroke={color} strokeWidth={w} />
      <path
        d={`M ${x2} ${y2} L ${r2(bx - uy * hw)} ${r2(by + ux * hw)} L ${r2(bx + uy * hw)} ${r2(by - ux * hw)} Z`}
        fill={color}
      />
    </g>
  );
}

/* -- MiniScreen: a small screen (heavy frame, thin inner rule, short stand) holding one glyph -- */

export function MiniScreen({ x, y, children }: { x: number; y: number; children: React.ReactNode }) {
  const w = 84;
  const h = 56;
  const cx = x + w / 2;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={INK} strokeWidth={5} />
      <rect x={x + 6} y={y + 6} width={w - 12} height={h - 12} fill="none" stroke={INK} strokeWidth={1} />
      <path d={`M ${cx - 5} ${y + h + 2.5} H ${cx + 5} V ${y + h + 10} H ${cx - 5} Z`} fill={INK} />
      <path d={`M ${cx - 20} ${y + h + 10} H ${cx + 20} V ${y + h + 14} H ${cx - 20} Z`} fill={INK} />
      {children}
    </g>
  );
}

/* -- Knob: a draggable handle on a track (for interactive plates) --------- */

/* A cream handle with two arrowheads that moves along a track starting at
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
      style={{ cursor: axis === "x" ? "ew-resize" : "ns-resize", touchAction: "none", userSelect: "none" }}
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
          e.key === "ArrowRight" || e.key === "ArrowUp" ? step : e.key === "ArrowLeft" || e.key === "ArrowDown" ? -step : 0;
        if (!d) return;
        e.preventDefault();
        onChange(clamp(value + d));
      }}
    >
      <circle cx={kx} cy={ky} r={20} fill="transparent" />
      <circle cx={kx} cy={ky} r={11} fill={CREAM} stroke={tone} strokeWidth={3.5} />
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
  "--background": CREAM,
  "--background-alt": CREAM,
  "--card": CREAM,
  "--border": INK,
  "--text-primary": INK,
  "--text-secondary": INK,
  "--text-muted": INK,
  "--accent1": SIGNAL,
  "--accent2": SIGNAL,
  "--highlight": SIGNAL,
  "--glow": "transparent",
  "--dt-cream": CREAM,
  "--dt-ink": INK,
  "--dt-signal": SIGNAL,
  /* tokens the shared exercises read (src/components/exercises) */
  "--paper": CREAM,
  "--paper-2": "#E5E0D6",
  "--ink": INK,
  "--ink-2": INK,
  "--ink-3": "#5E5850",
  "--rule": "#D1CBBF",
  "--rule-2": "#9C9384",
  "--signal": SIGNAL,
  "--signal-tint": "rgba(166, 58, 44, 0.1)",
  "--counter": COUNTER,
  "--affirm": COUNTER,
  "--affirm-tint": "rgba(31, 95, 175, 0.1)",
  background: CREAM,
  color: INK,
} as React.CSSProperties;

/* -- small marks ---------------------------------------------------------- */

export function Diamond({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-block w-2 h-2 rotate-45 shrink-0 bg-[var(--dt-ink)] ${className}`}
    />
  );
}

export function Kicker({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className={`flex items-start gap-3 font-accent font-bold uppercase tracking-[0.25em] text-[0.7rem] ${
        light ? "text-[var(--dt-cream)]" : "text-[var(--dt-signal)]"
      }`}
    >
      <span aria-hidden className="inline-block w-2 h-2 mt-[0.2em] rotate-45 shrink-0 bg-[var(--dt-signal)]" />
      {children}
    </p>
  );
}

/* -- frame: heavy ink rule, thin inner rule, corner diamonds -------------- */

export function Frame({
  children,
  className = "",
  inner = "bg-[var(--dt-cream)]",
}: {
  children: React.ReactNode;
  className?: string;
  inner?: string;
}) {
  return (
    <div className={`relative border-[5px] border-[var(--dt-ink)] p-[6px] ${className}`}>
      <div className={`border border-[var(--dt-ink)] ${inner}`}>{children}</div>
      {["-top-[7px] -left-[7px]", "-top-[7px] -right-[7px]", "-bottom-[7px] -left-[7px]", "-bottom-[7px] -right-[7px]"].map(
        (pos) => (
          <span
            key={pos}
            aria-hidden
            className={`absolute ${pos} w-[9px] h-[9px] rotate-45 bg-[var(--dt-cream)] border-2 border-[var(--dt-ink)]`}
          />
        ),
      )}
    </div>
  );
}

export function PlateWell({ children }: { children: React.ReactNode }) {
  return (
    <Frame>
      <div className="p-3 sm:p-4">{children}</div>
    </Frame>
  );
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
    <section data-slide id="hero" className="min-h-svh flex items-center px-4 sm:px-8 md:px-16 py-10">
      <Frame className="w-full max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center p-6 sm:p-10 md:p-12">
          <div>
            <Kicker>{category}</Kicker>
            <h1 className="font-heading font-bold text-[clamp(2.4rem,5vw,4.4rem)] leading-[1.02] tracking-[-0.02em] mt-6 mb-6">
              {title}
            </h1>
            <div className="h-[5px] w-24 bg-[var(--dt-signal)] mb-6" />
            {subtitle && <p className="font-body text-lg md:text-xl leading-relaxed max-w-xl">{subtitle}</p>}
            {agenda && (
              <div className="mt-6 max-w-xl">
                <p className="font-accent font-bold uppercase tracking-[0.25em] text-[0.7rem]">Agenda</p>
                {/* a long agenda runs down two columns, so the hero stays one screen */}
                <ol
                  className={`mt-3 ${agenda.length > 4 ? "sm:grid sm:grid-flow-col sm:gap-x-8" : ""}`}
                  style={agenda.length > 4 ? { gridTemplateRows: `repeat(${Math.ceil(agenda.length / 2)}, auto)` } : undefined}
                >
                  {agenda.map((item, i) => (
                    <li
                      key={item}
                      className={`flex items-baseline gap-4 py-2 border-t-[3px] border-[var(--dt-ink)] first:border-t-0 ${
                        agenda.length > 4 && i === Math.ceil(agenda.length / 2) ? "sm:border-t-0" : ""
                      }`}
                    >
                      <span className="font-heading font-bold text-lg w-5 shrink-0">{i + 1}</span>
                      <span className="font-heading font-bold text-lg leading-snug">{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-accent text-sm">
              <span className="font-bold">{author}</span>
              {date && (
                <span className="flex items-center gap-4">
                  <Diamond />
                  {date}
                </span>
              )}
              <span className="flex items-center gap-4">
                <Diamond />
                {institution}
              </span>
            </div>
          </div>
          <div className="border-t-[5px] lg:border-t-0 border-[var(--dt-ink)] pt-10 lg:pt-0">
            <div className="max-w-xl mx-auto">{plate}</div>
          </div>
        </div>
      </Frame>
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
    <section data-slide
      id={id}
      className="bg-[var(--dt-ink)] text-[var(--dt-cream)] px-4 sm:px-8 md:px-16 py-28 md:py-36 min-h-svh flex items-center"
    >
      <div className="max-w-6xl w-full mx-auto grid md:grid-cols-[auto_1fr] gap-8 md:gap-16 items-end">
        <p
          aria-hidden
          className="font-heading font-bold leading-[0.8] text-[clamp(6rem,18vw,13rem)] text-[var(--dt-signal)]"
        >
          {number}
        </p>
        <div>
          <Kicker light>CHAPTER {number}</Kicker>
          <div className="h-px w-full bg-[var(--dt-cream)] opacity-40 my-6" />
          <h2 className="font-heading font-bold text-[clamp(2.2rem,5vw,4rem)] leading-[1.05] mb-6">{title}</h2>
          {description && (
            <p className="font-body text-lg md:text-xl leading-relaxed max-w-2xl opacity-90">{description}</p>
          )}
        </div>
      </div>
    </section>
  );
}

/* -- slide and beats ------------------------------------------------------ */

export function Slide({
  id,
  label,
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
    <section data-slide
      id={id}
      className="min-h-svh flex flex-col justify-center px-4 sm:px-8 md:px-16 py-10 md:py-12"
    >
      <div className="max-w-6xl w-full mx-auto">
        {(label || title) && (
          <header className="mb-6 md:mb-8">
            {label && <Kicker>{label}</Kicker>}
            {title && (
              <h3 className="font-heading font-bold text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.08] mt-3">{title}</h3>
            )}
            <div className="h-[4px] w-full bg-[var(--dt-ink)] mt-5" />
            <div className="h-px w-full bg-[var(--dt-ink)] mt-[4px]" />
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
        className="min-h-svh flex flex-col justify-start px-4 sm:px-8 md:px-16 pt-[14svh] pb-16 bg-[var(--paper-2)]"
      >
        <div className="max-w-6xl w-full mx-auto">
          <Exercise data={exercise} art={exerciseArt} />
        </div>
      </section>
    )}
    </>
  );
}

/* A row of cells; `cols` sets the wide-screen split. Phones stack in order. */
export function Row({
  children,
  cols = "lg:grid-cols-2",
  className = "",
}: {
  children: React.ReactNode;
  cols?: string;
  className?: string;
}) {
  return <div className={`grid gap-6 md:gap-8 items-center ${cols} ${className}`}>{children}</div>;
}

/* -- class discussion ----------------------------------------------------- */

export function DiscussionSlide({
  quote,
  author,
  plate,
}: {
  quote: string;
  author: string;
  plate: React.ReactNode;
}) {
  return (
    <section data-slide className="px-4 sm:px-8 md:px-16 py-24 md:py-32 min-h-svh flex items-center">
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-heading font-bold text-[clamp(1.7rem,3.6vw,2.9rem)] leading-[1.25]">{quote}</p>
        <div className="flex items-center justify-center gap-4 mt-10">
          <span className="h-[3px] w-12 bg-[var(--dt-ink)]" />
          <Kicker>{author}</Kicker>
          <span className="h-[3px] w-12 bg-[var(--dt-ink)]" />
        </div>
        <div className="max-w-sm mx-auto mt-12">{plate}</div>
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
    <section data-slide id={id} className="min-h-svh flex flex-col justify-center px-4 sm:px-8 md:px-16 py-12 md:py-14">
      <Frame className="w-full max-w-5xl mx-auto">
        <div className="p-6 sm:p-8 md:p-10">
          <Kicker>CONCLUSION</Kicker>
          <h2 className="font-heading font-bold text-[clamp(2.2rem,4.5vw,3.4rem)] leading-none mt-4 mb-6">{title}</h2>
          {summary && <p className="font-body text-lg leading-[1.7] max-w-3xl">{summary}</p>}
          <div className="mt-8 bg-[var(--dt-ink)] text-[var(--dt-cream)] p-6 sm:p-7 md:p-8">
            <h4 className="font-accent font-bold uppercase tracking-[0.25em] text-[0.7rem] text-[var(--dt-cream)]">
              KEY TAKEAWAYS
            </h4>
            <ol className="mt-4">
              {takeaways.map((t, i) => (
                <li
                  key={t}
                  className="flex items-start gap-5 py-4 border-t border-[var(--dt-cream)]/30 first:border-t-0 first:pt-0 last:pb-0"
                >
                  <span className="font-heading font-bold text-3xl leading-none text-[var(--dt-signal)] w-8 shrink-0">
                    {i + 1}
                  </span>
                  <span className="font-body text-lg leading-relaxed">{t}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Frame>
    </section>
  );
}

/* -- class discussion: several questions, numbered, beside a plate -------- */

export function DiscussionList({
  id,
  questions,
  plate,
}: {
  id?: string;
  questions: string[];
  plate: React.ReactNode;
}) {
  return (
    <section data-slide id={id} className="min-h-svh flex items-center px-4 sm:px-8 md:px-16 py-12">
      <div className="max-w-6xl w-full mx-auto grid lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-16 items-center">
        <div>
          <Kicker>CLASS DISCUSSION</Kicker>
          <ol className="mt-6">
            {questions.map((q, i) => (
              <li key={q} className="flex items-start gap-5 py-5 border-t-[3px] border-[var(--dt-ink)] first:border-t-0">
                <span className="font-heading font-bold text-4xl leading-none w-8 shrink-0">{i + 1}</span>
                <span className="font-heading font-bold text-[clamp(1.3rem,2.3vw,1.9rem)] leading-[1.25]">{q}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="max-w-sm w-full mx-auto">{plate}</div>
      </div>
    </section>
  );
}

/* -- a defined term: bold ink name, then its sentence --------------------- */

export function Term({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <p>
      <strong className="font-heading font-bold">{name}</strong>: {children}
    </p>
  );
}
