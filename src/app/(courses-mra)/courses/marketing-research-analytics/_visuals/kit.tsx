/* ==========================================================================
   Shared kit: the building blocks every week draws and lays out with, colours and type, the plate frame and label helpers, geometry helpers
   and slide layout blocks. See "Shared pieces" in the root CLAUDE.md.
   ========================================================================== */

import React from "react";
import { cn } from "@/lib/utils";

export const INK = "var(--ink)";
export const INK2 = "var(--ink-2)";
export const INK3 = "var(--ink-3)";
export const RULE = "var(--rule)";
export const RULE2 = "var(--rule-2)";
export const SIGNAL = "var(--signal)";
export const COUNTER = "var(--counter)";
export const PAPER = "var(--paper)";
export const PAPER2 = "var(--paper-2)";
/** Filled zones inside a plate: plates sit on --paper or --paper-2 wells. */
export const PAPER3 = "var(--paper-3)";
export const SIGNAL_TINT = "rgba(44, 74, 140, 0.12)";
export const COUNTER_TINT = "rgba(165, 98, 27, 0.13)";

export const LABEL = "var(--font-label)";
export const BODY = "var(--font-body)";
/** The heading face. The course sets it to Plex Sans. The talks that borrow this kit may set their own. */
export const SERIF = "var(--font-heading)";

export type Anchor = "start" | "middle" | "end";

/** Round a computed coordinate, so server and client render identical markup. */
export const r2 = (n: number) => Math.round(n * 100) / 100;

/** Sentence-case key: concept names, quantities, axis names. */
export function Key({
  x,
  y,
  children,
  anchor = "start",
  fill = INK3,
  size = 11,
  weight = 600,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  anchor?: Anchor;
  fill?: string;
  size?: number;
  weight?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily={LABEL}
      fontSize={size}
      fontWeight={weight}
      fill={fill}
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {children}
    </text>
  );
}

/** Sentence-case note in the body face. */
export function Note({
  x,
  y,
  children,
  anchor = "start",
  fill = INK2,
  size = 13,
  italic = false,
  weight = 400,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  anchor?: Anchor;
  fill?: string;
  size?: number;
  italic?: boolean;
  weight?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily={BODY}
      fontSize={size}
      fontWeight={weight}
      fontStyle={italic ? "italic" : undefined}
      fill={fill}
    >
      {children}
    </text>
  );
}

/** A larger numeral or word in the body face, for the few places a plate needs weight. */
export function Display({
  x,
  y,
  children,
  anchor = "start",
  fill = INK,
  size = 28,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  anchor?: Anchor;
  fill?: string;
  size?: number;
}) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontFamily={BODY} fontSize={size} fontWeight={600} fill={fill} style={{ fontVariantNumeric: "tabular-nums" }}>
      {children}
    </text>
  );
}

/** The plate: a responsive SVG with its title and aria-label. */
export function Frame({
  height,
  label,
  children,
  width = 800,
  className = "",
  svgProps,
}: {
  height: number;
  label: string;
  children: React.ReactNode;
  width?: number;
  className?: string;
  /** Extra attributes for an interactive plate, such as pointer handlers. */
  svgProps?: React.SVGProps<SVGSVGElement>;
}) {
  return (
    <svg
      {...svgProps}
      viewBox={`0 0 ${width} ${height}`}
      className={cn("block h-auto w-full", className)}
      role="img"
      aria-label={label}
    >
      <title>{label}</title>
      {children}
    </svg>
  );
}

/** Arrowhead pointing along (dx, dy), tip at (x, y). */
export function headAlong(x: number, y: number, dx: number, dy: number, s = 8) {
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const bx = x - ux * s;
  const by = y - uy * s;
  const px = -uy * (s * 0.62);
  const py = ux * (s * 0.62);
  return `M${r2(bx + px)} ${r2(by + py)}L${r2(x)} ${r2(y)}L${r2(bx - px)} ${r2(by - py)}`;
}

export const head = {
  right: (x: number, y: number, s = 8) => headAlong(x, y, 1, 0, s),
  left: (x: number, y: number, s = 8) => headAlong(x, y, -1, 0, s),
  down: (x: number, y: number, s = 8) => headAlong(x, y, 0, 1, s),
  up: (x: number, y: number, s = 8) => headAlong(x, y, 0, -1, s),
};

/** Normal density curve sampled as an SVG path, rounded for hydration. */
export function bellPath({
  x0,
  x1,
  base,
  mean,
  sd,
  peak,
  steps = 80,
  close = false,
}: {
  x0: number;
  x1: number;
  base: number;
  mean: number;
  sd: number;
  /** Height in units of the curve's highest point. */
  peak: number;
  steps?: number;
  close?: boolean;
}) {
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = x0 + ((x1 - x0) * i) / steps;
    const y = base - peak * Math.exp(-((x - mean) ** 2) / (2 * sd * sd));
    pts.push(`${i === 0 ? "M" : "L"}${r2(x)} ${r2(y)}`);
  }
  return pts.join("") + (close ? `L${r2(x1)} ${base}L${r2(x0)} ${base}Z` : "");
}

/**
 * A quiet control under an interactive plate: a small key, a
 * hairline track with a small ink thumb, and the current value in tabular
 * numerals. It stays secondary to the plate it drives. The plate's
 * default value is the state the slide shows before anyone touches it.
 */
export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  showValue = true,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  /** Hide the number when the plate itself shows the position (a time cursor). */
  showValue?: boolean;
}) {
  const id = React.useId();
  return (
    <div className="mt-2 flex items-center gap-3 px-1">
      <label
        htmlFor={id}
        className="shrink-0 text-[10px] font-medium text-[var(--ink-3)]"
        style={{ fontFamily: LABEL }}
      >
        {label}
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={cn(
          "h-4 min-w-0 flex-1 cursor-pointer appearance-none bg-transparent focus-visible:outline-none",
          "[&::-webkit-slider-runnable-track]:h-px [&::-webkit-slider-runnable-track]:bg-[var(--rule-2)]",
          "[&::-webkit-slider-thumb]:-mt-[4.5px] [&::-webkit-slider-thumb]:size-2.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--ink-3)]",
          "[&::-moz-range-track]:h-px [&::-moz-range-track]:bg-[var(--rule-2)]",
          "[&::-moz-range-thumb]:size-2.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-[var(--ink-3)]",
          "hover:[&::-webkit-slider-thumb]:bg-[var(--ink)] focus-visible:[&::-webkit-slider-thumb]:bg-[var(--ink)] focus-visible:[&::-webkit-slider-thumb]:ring-2 focus-visible:[&::-webkit-slider-thumb]:ring-[var(--rule-2)]",
          "hover:[&::-moz-range-thumb]:bg-[var(--ink)] focus-visible:[&::-moz-range-thumb]:bg-[var(--ink)]",
        )}
      />
      {showValue ? (
        <output
          htmlFor={id}
          className="w-[3.5ch] shrink-0 text-right text-[12px] font-medium text-[var(--ink-3)]"
          style={{ fontFamily: LABEL, fontVariantNumeric: "tabular-nums" }}
        >
          {value}
        </output>
      ) : null}
    </div>
  );
}

/**
 * A quiet action under an interactive plate: one small outlined button in the
 * key face, for plates whose action is a discrete event (draw a new sample)
 * rather than a value to set.
 */
export function PlateButton({
  children,
  onClick,
  icon,
  className = "",
}: {
  children: React.ReactNode;
  onClick: () => void;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 border border-[var(--rule-2)] bg-[var(--paper)] px-3 py-1.5",
        "text-[11px] font-semibold text-[var(--ink-2)]",
        "transition-colors hover:border-[var(--ink-3)] hover:text-[var(--ink)] active:bg-[var(--paper-3)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rule-2)]",
        className,
      )}
      style={{ fontFamily: LABEL }}
    >
      {icon}
      {children}
    </button>
  );
}

/**
 * A row of choices under an interactive plate, one pressed at a time: for
 * plates that compare a few named views of the same data.
 */
export function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { id: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 px-1" role="group" aria-label={label}>
      <span
        className="shrink-0 text-[10px] font-medium text-[var(--ink-3)]"
        style={{ fontFamily: LABEL }}
      >
        {label}
      </span>
      <div className="flex flex-wrap border border-[var(--rule-2)]">
        {options.map((o) => {
          const on = o.id === value;
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(o.id)}
              className={cn(
                "border-l border-[var(--rule-2)] px-3 py-1.5 first:border-l-0",
                "text-[11px] font-semibold transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--rule-2)]",
                on
                  ? "bg-[var(--ink)] text-[var(--paper)]"
                  : "bg-[var(--paper)] text-[var(--ink-2)] hover:bg-[var(--paper-3)]",
              )}
              style={{ fontFamily: LABEL }}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * A row of independent on/off choices under an interactive plate: for plates
 * that combine several named inputs (data sources, conditions) rather than
 * switching between views. At least one stays on, unless `allowNone` is set
 * for plates whose options are additions to a plain baseline.
 */
export function Toggles<T extends string>({
  label,
  options,
  value,
  onChange,
  allowNone = false,
}: {
  label: string;
  options: { id: T; label: string }[];
  value: T[];
  onChange: (value: T[]) => void;
  allowNone?: boolean;
}) {
  return (
    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 px-1" role="group" aria-label={label}>
      <span
        className="shrink-0 text-[10px] font-medium text-[var(--ink-3)]"
        style={{ fontFamily: LABEL }}
      >
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = value.includes(o.id);
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={on}
              onClick={() => {
                if (on && value.length === 1 && !allowNone) return;
                onChange(on ? value.filter((v) => v !== o.id) : options.map((x) => x.id).filter((id) => id === o.id || value.includes(id)));
              }}
              className={cn(
                "inline-flex items-center gap-1.5 border px-3 py-1.5",
                "text-[11px] font-semibold transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rule-2)]",
                on
                  ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
                  : "border-dashed border-[var(--ink-3)] bg-[var(--paper)] text-[var(--ink-2)] hover:border-solid hover:bg-[var(--paper-3)]",
              )}
              style={{ fontFamily: LABEL }}
            >
              <span aria-hidden>{on ? "\u2713" : "+"}</span>
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** A seeded pseudo-random stream, so a plate's first render is identical on server and client. */
export function seeded(seed: number) {
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

/* --------------------------------------------------------------------------
   Slide layout blocks
   -------------------------------------------------------------------------- */

/** A plate that lives in a column: a figure well without the 680px floor. */
export function Plate({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("figure-well w-full min-w-0 p-3 sm:p-5", className)}>{children}</div>;
}

/** One verbatim sentence at reading size. */
export function P({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("type-body max-w-[var(--measure)] [&_strong]:font-semibold", className)}>{children}</p>;
}

/** A sentence promoted to lead size. */
export function Lead({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("type-lead max-w-[52ch]", className)}>{children}</p>;
}

/** A sentence set as a large statement: the line a slide rests on. */
export function Statement({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("type-quote max-w-[32ch]", className)}>{children}</p>;
}

/** A term inside a sentence, set in bold ink. */
export function Term({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-[var(--ink)]">{children}</strong>;
}

/** A block under a hairline rule, the ledger's basic cell. */
export function Ruled({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("min-w-0 border-t border-[var(--rule-2)] pt-4", className)}>{children}</div>;
}

/** Section heading with a hairline beneath. */
export function SlideHeading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("mb-7 w-full", className)}>
      <h2 className="type-h1 max-w-[34ch] !text-[clamp(1.9rem,3.6vw,3rem)]">
        {children}
      </h2>
      <div className="mt-5 h-px w-full bg-[var(--rule)]" />
    </div>
  );
}

/** Numbered ledger item: a small tabular numeral above its text. */
export function Numbered({ n, children, className = "" }: { n: number; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("min-w-0", className)}>
      <span aria-hidden className="mb-2 block text-[0.875rem] font-medium tabular-nums text-[var(--ink-3)]">
        {n}
      </span>
      {children}
    </div>
  );
}

/** Part opener head: "Part n:" and its title. */
export function PartHead({ n, title, className = "" }: { n: number; title: string; className?: string }) {
  return (
    <div className={cn("w-full", className)}>
      <h2 className="type-display max-w-[22ch] !text-[clamp(2.1rem,4vw,3.4rem)]">{`Part ${n}: ${title}`}</h2>
      <div className="mt-6 h-px w-full bg-[var(--rule)]" />
    </div>
  );
}

/** A discussion case under its "Discussion:" heading, set like any body slide: the scenario, then the question in bold. */
export function Discussion({
  scenario,
  question,
  className = "",
}: {
  scenario: string;
  question: string;
  className?: string;
}) {
  const line = "type-h2 max-w-[56ch] !font-normal !text-[clamp(1.2rem,1.7vw,1.45rem)] !leading-snug";
  return (
    <div className={cn("w-full", className)}>
      <p className={line}>{scenario}</p>
      <p className={cn(line, "mt-6 !font-semibold")}>{question}</p>
    </div>
  );
}
