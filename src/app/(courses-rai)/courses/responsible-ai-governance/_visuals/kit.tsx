/* ==========================================================================
   Shared kit: the building blocks every week draws and lays out with —
   colours and type, the plate frame and label helpers, geometry helpers
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
export const SIGNAL_TINT = "rgba(200, 62, 29, 0.12)";
export const COUNTER_TINT = "rgba(27, 94, 75, 0.13)";

/* --------------------------------------------------------------------------
   Patent drawing: the course style (see the course CLAUDE.md).
   -------------------------------------------------------------------------- */

/** Patent-drawing palette: white sheet, black line and stipple, examiner's red. */
export const PAT = {
  paper: "#FFFFFF",
  ink: "#141414",
  ink3: "#666666",
  signal: "#B8321F",
  counter: "#1F5747",
} as const;

/** Line weights: outlines, hairlines (text lines, hidden edges) and emphasis. */
export const LINE = { outline: 0.9, hair: 0.6, bold: 1.3 } as const;

/** Centre line (long dash, short dash) for axes, dividers and alignment. */
export const CENTRE_DASH = "14 3 2 3";

/** The stipple fills. `id` prefixes keep several plates on one page apart. */
export const stip = (id: string, tone: "dense" | "light" | "signal" | "counter") => `url(#${id}-${tone})`;

/**
 * Stipple pattern defs. Render once inside each plate's <Frame>, then fill
 * shaded faces with `stip(id, "dense")` (side faces, shadows), `stip(id,
 * "light")` (top faces), and `stip(id, "signal")` for the one finding.
 */
export function PatentDefs({ id }: { id: string }) {
  const dot = (tone: string, colour: string, size: number, r: [number, number]) => (
    <pattern id={`${id}-${tone}`} width={size} height={size} patternUnits="userSpaceOnUse">
      <circle cx={1} cy={1} r={r[0]} fill={colour} />
      <circle cx={r2(size * 0.72)} cy={r2(size * 0.66)} r={r[1]} fill={colour} />
    </pattern>
  );
  return (
    <defs>
      {dot("dense", PAT.ink, 3, [0.55, 0.45])}
      {dot("light", PAT.ink, 5, [0.5, 0.4])}
      {dot("signal", PAT.signal, 3, [0.6, 0.5])}
      {dot("counter", PAT.counter, 3, [0.6, 0.5])}
    </defs>
  );
}

/**
 * A box in oblique projection: white front face, stippled top and side.
 * (x, y) is the front face's top-left; the depth runs up and right by (dx, dy).
 */
export function ObliqueBox({
  id,
  x,
  y,
  w,
  h,
  dx = 10,
  dy = 6,
  front = PAT.paper,
  top,
  side,
  stroke = PAT.ink,
}: {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  dx?: number;
  dy?: number;
  front?: string;
  top?: string;
  side?: string;
  stroke?: string;
}) {
  const s = { stroke, strokeWidth: LINE.outline, strokeLinejoin: "round" as const };
  return (
    <g>
      <path d={`M${x} ${y}L${r2(x + dx)} ${r2(y - dy)}H${r2(x + w + dx)}L${r2(x + w)} ${y}Z`} fill={top ?? stip(id, "light")} {...s} />
      <path
        d={`M${r2(x + w)} ${y}L${r2(x + w + dx)} ${r2(y - dy)}V${r2(y + h - dy)}L${r2(x + w)} ${r2(y + h)}Z`}
        fill={side ?? stip(id, "dense")}
        {...s}
      />
      <rect x={x} y={y} width={w} height={h} fill={front} {...s} />
    </g>
  );
}

/** FIG. numbering under a figure, in Caslon italic: `FIG. 2 — <concept from the slide>`. */
export function Fig({
  x,
  y,
  n,
  children,
  anchor = "middle",
  size = 12,
}: {
  x: number;
  y: number;
  n: number | string;
  children?: React.ReactNode;
  anchor?: Anchor;
  size?: number;
}) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontFamily={SERIF} fontStyle="italic" fontSize={size} fill={PAT.ink}>
      FIG. {n}
      {children ? <> — {children}</> : null}
    </text>
  );
}

/** Tracked Caslon capitals for a concept name set on or beside a drawn part. */
export function PatentKey({
  x,
  y,
  children,
  anchor = "middle",
  fill = PAT.ink,
  size = 11,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  anchor?: Anchor;
  fill?: string;
  size?: number;
}) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontFamily={SERIF} fontSize={size} letterSpacing="0.22em" fill={fill}>
      {children}
    </text>
  );
}

/**
 * Legacy palette of the earlier Isometric Tabletop style. Week 2 still uses
 * it until its plates are redrawn in patent drawing; new plates use PAT.
 */
export const PAL = {
  paper: "#F2F5F4",
  well: "#E5ECEA",
  slabTop: "#E8EFED",
  slabLeft: "#CEDAD7",
  slabRight: "#B4C4C0",
  ink: "#101820",
  ink2: "#2B3742",
  ink3: "#586773",
  rule: "#C4D1CE",
  signal: "#C83E1D",
  signalLight: "#F2D2C9",
  signalMid: "#DF7A61",
  counter: "#1B5E4B",
  counterLight: "#CBE0DA",
  counterMid: "#4C8C79",
  skin1: "#E4C0A4",
  skin2: "#C28E6C",
  skin3: "#8D5D3F",
} as const;

export const LABEL = "var(--font-label)";
export const BODY = "var(--font-body)";
export const SERIF = "var(--font-heading)";

export type Anchor = "start" | "middle" | "end";

/** Round a computed coordinate, so server and client render identical markup. */
export const r2 = (n: number) => Math.round(n * 100) / 100;

/** Uppercase tracked key: concept names, quantities, axis names. */
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
      letterSpacing="0.12em"
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

/** Display numeral or word in Libre Caslon, for the few places a plate needs weight. */
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
    <text x={x} y={y} textAnchor={anchor} fontFamily={SERIF} fontSize={size} fontWeight={500} fill={fill}>
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

/**
 * A quiet control under an interactive plate: a small uppercase key, a
 * hairline track with a small ink thumb, and the current value in tabular
 * numerals. It stays secondary to the plate it drives. The plate's
 * default value is the state the slide shows before anyone touches it.
 */
/* Controls under a plate speak the plate's language: Caslon tracked capitals
   in ink (as PatentKey) and hairline ink rules; the chosen option is marked
   by a filled ring, never by a flat block of fill. */
const CONTROL_KEY = "shrink-0 text-[11px] font-normal uppercase tracking-[0.22em] text-[var(--ink)]";
const CONTROL_TEXT = "text-[11.5px] font-normal uppercase tracking-[0.14em] text-[var(--ink)]";

export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  showValue = true,
  formatValue,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  showValue?: boolean;
  formatValue?: (value: number) => string;
}) {
  const id = React.useId();
  return (
    <div className="mt-2.5 flex items-center gap-3 px-1">
      <label
        htmlFor={id}
        className={CONTROL_KEY}
        style={{ fontFamily: SERIF }}
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
          "[&::-webkit-slider-runnable-track]:h-px [&::-webkit-slider-runnable-track]:bg-[var(--ink)]",
          "[&::-webkit-slider-thumb]:-mt-[5px] [&::-webkit-slider-thumb]:size-[11px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-[var(--ink)] [&::-webkit-slider-thumb]:bg-[var(--paper)]",
          "[&::-moz-range-track]:h-px [&::-moz-range-track]:bg-[var(--ink)]",
          "[&::-moz-range-thumb]:size-[11px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-[var(--ink)] [&::-moz-range-thumb]:bg-[var(--paper)]",
          "hover:[&::-webkit-slider-thumb]:border-[1.5px] focus-visible:[&::-webkit-slider-thumb]:border-[1.5px] focus-visible:[&::-webkit-slider-thumb]:ring-2 focus-visible:[&::-webkit-slider-thumb]:ring-[var(--rule-2)]",
          "hover:[&::-moz-range-thumb]:border-[1.5px] focus-visible:[&::-moz-range-thumb]:border-[1.5px]",
        )}
      />
      {showValue ? (
        <output
          htmlFor={id}
          className="min-w-[3.5ch] shrink-0 text-right text-[14px] font-normal text-[var(--ink)]"
          style={{ fontFamily: SERIF, fontVariantNumeric: "lining-nums tabular-nums" }}
        >
          {formatValue ? formatValue(value) : value}
        </output>
      ) : null}
    </div>
  );
}

/**
 * A quiet action under an interactive plate: one small outlined button in the
 * key face, for plates whose action is a discrete event rather than a value.
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
        "inline-flex items-center gap-2 border border-[var(--ink)] bg-[var(--paper)] px-3 py-1.5",
        CONTROL_TEXT,
        "transition-[border-width] hover:shadow-[inset_0_0_0_0.5px_var(--ink)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rule-2)]",
        className,
      )}
      style={{ fontFamily: SERIF }}
    >
      {icon}
      {children}
    </button>
  );
}

/**
 * A row of choices under an interactive plate, one pressed at a time: for
 * plates that compare a few named views or regimes on the same 3D board.
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
    <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-2 px-1" role="group" aria-label={label}>
      <span className={CONTROL_KEY} style={{ fontFamily: SERIF }}>
        {label}
      </span>
      <div className="flex flex-wrap pl-px pt-px">
        {options.map((o) => {
          const on = o.id === value;
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(o.id)}
              className={cn(
                "-ml-px -mt-px inline-flex items-center gap-2 border border-[var(--ink)] bg-[var(--paper)] px-3 py-1.5",
                CONTROL_TEXT,
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--rule-2)]",
              )}
              style={{ fontFamily: SERIF }}
            >
              <span
                aria-hidden
                className={cn(
                  "inline-block size-[8px] shrink-0 rounded-full border border-[var(--ink)]",
                  on ? "bg-[var(--ink)]" : "bg-[var(--paper)]",
                )}
              />
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

/** A sentence set as a serif statement: the line a slide rests on. */
export function Statement({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("type-quote max-w-[32ch]", className)}>{children}</p>;
}

type Tone = "signal" | "counter" | "ink";

/** A coloured term inside a sentence. */
export function Term({ children, tone = "signal" }: { children: React.ReactNode; tone?: Tone }) {
  const color = {
    signal: "text-[var(--signal)]",
    counter: "text-[var(--counter)]",
    ink: "text-[var(--ink)]",
  }[tone];
  return <strong className={cn("font-semibold", color)}>{children}</strong>;
}

/** A block under a hairline rule, the dossier's basic cell. */
export function Ruled({
  tone = "ink",
  weight = "thick",
  children,
  className = "",
}: {
  tone?: Tone;
  weight?: "thin" | "thick";
  children: React.ReactNode;
  className?: string;
}) {
  const border = {
    signal: "border-[var(--signal)]",
    counter: "border-[var(--counter)]",
    ink: "border-[var(--ink)]",
  }[tone];
  return (
    <div className={cn("min-w-0 pt-4", weight === "thick" ? "border-t-2" : "border-t", border, className)}>
      {children}
    </div>
  );
}

/** Section heading with a hairline beneath; an optional kicker ("Discussion:") sits above the words. */
export function SlideHeading({
  children,
  kicker,
  tone = "signal",
  className = "",
}: {
  children: React.ReactNode;
  kicker?: string;
  tone?: "signal" | "counter";
  className?: string;
}) {
  return (
    <div className={cn("mb-7 w-full", className)}>
      <h2 className="type-h1 max-w-[34ch] !text-[clamp(1.9rem,3.6vw,3rem)]">
        {kicker ? (
          <>
            <span
              className={cn("type-label mb-3 block !text-[0.8rem]", tone === "counter" && "!text-[var(--counter)]")}
            >
              {kicker}
            </span>{" "}
          </>
        ) : null}
        {children}
      </h2>
      <div className="mt-5 h-px w-full bg-[var(--rule)]" />
    </div>
  );
}

/** Numbered dossier item: a small tabular numeral above its text. */
export function Numbered({
  n,
  children,
  tone = "ink",
  className = "",
}: {
  n: number;
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  const color = {
    signal: "text-[var(--signal)]",
    counter: "text-[var(--counter)]",
    ink: "text-[var(--ink-3)]",
  }[tone];
  return (
    <div className={cn("min-w-0", className)}>
      <span aria-hidden className={cn("type-label mb-2 block tabular-nums", color)}>
        {String(n).padStart(2, "0")}
      </span>
      {children}
    </div>
  );
}

/** Part opener head: an outlined numeral beside "Part n:" and its title. */
export function PartHead({ n, title, className = "" }: { n: number; title: string; className?: string }) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-end gap-4 sm:gap-6 xl:gap-10">
        <div
          aria-hidden
          className="select-none text-[3.5rem] leading-[0.8] text-transparent [-webkit-text-stroke:1.5px_var(--signal)] sm:text-[5rem] xl:text-[7rem]"
          style={{ fontFamily: "var(--font-heading)", fontWeight: 500 }}
        >
          {String(n).padStart(2, "0")}
        </div>
        <h2 className="type-display max-w-[22ch] !text-[clamp(2.1rem,4vw,3.4rem)]">
          <span className="type-label mb-3 block !text-[0.8rem]">{`Part ${n}:`}</span> {title}
        </h2>
      </div>
      <div className="mt-6 h-px w-full bg-[var(--rule)]" />
    </div>
  );
}

/** Discussion prompt on a verdigris-tinted panel. "Discussion:" stays in the sentence as a kicker. */
export function Prompt({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "w-full border-l-2 border-[var(--counter)] bg-[var(--counter-tint)] px-7 py-7 md:px-11 md:py-9",
        className,
      )}
    >
      <p className="type-quote max-w-[44ch] !text-[clamp(1.3rem,2.1vw,1.85rem)]">
        <span className="type-label mb-5 block !text-[0.8rem] !leading-none !text-[var(--counter)]">Discussion:</span>{" "}
        {children}
      </p>
    </div>
  );
}
