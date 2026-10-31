/* ==========================================================================
   Shared kit: the building blocks every week draws and lays out with, colours and type, the plate frame and label helpers, geometry helpers
   and slide layout blocks. See "Shared pieces" in the root CLAUDE.md.
   ========================================================================== */

import React, { createContext, useContext } from "react";

/** The palette. Use about five per plate. Never anything outside it. */
export const SK = {
  paper: "#FBF7F0", // warm cream: paper objects, the sheet
  ink: "#2E2624", // all lines and all text
  camel: "#C9955B", // main clothing, warm objects
  tan: "#8E6232", // shadow sides, belts, trims
  brown: "#4A2E22", // hair, dark objects
  leather: "#6B3F2A", // shoes, bags, wood
  skin: "#E5B08E", // skin (vary tones per person, see CLAUDE.md)
  teal: "#5E9C94", // the one cool accent: what is chosen, learned, lit
  ochre: "#E8B84A", // small highlights, badges, logos
  charcoal: "#3E3A4A", // trousers, dark fabric
  stone: "#D0C7B5", // the default background wash: a quiet warm neutral
  blush: "#F2C9B0", // the here and now, set against a sky wash. Warm details
  sky: "#BFD6DF", // glass, background wash
  earth: "#C9B8A6", // ground wash
  pencil: "#6F7785", // anything unreal, imagined, dashed
} as const;

export type Pt = [number, number];
type Anchor = "start" | "middle" | "end";

const LABEL = "var(--font-label)";
const SERIF = "var(--font-heading)";

export const r2 = (n: number) => Math.round(n * 100) / 100;

/** Deterministic noise (mulberry32), so server and client draw the same wobble. */
export function seeded(seed: number) {
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

/** A hand-drawn path through `pts`: subdivided, nudged sideways, smoothed. */
export function wobble(
  pts: Pt[],
  seed: number,
  amp = 0.8,
  step = 16,
  closed = false,
) {
  const rnd = seeded(seed);
  const src = closed ? [...pts, pts[0]] : pts;
  const out: Pt[] = [];
  for (let i = 0; i < src.length - 1; i++) {
    const [x0, y0] = src[i];
    const [x1, y1] = src[i + 1];
    const len = Math.hypot(x1 - x0, y1 - y0) || 1;
    const n = Math.max(1, Math.round(len / step));
    const nx = -(y1 - y0) / len;
    const ny = (x1 - x0) / len;
    for (let k = 0; k < n; k++) {
      const t = k / n;
      const j = (rnd() - 0.5) * 2 * amp;
      out.push([x0 + (x1 - x0) * t + nx * j, y0 + (y1 - y0) * t + ny * j]);
    }
  }
  const last = src[src.length - 1];
  out.push([last[0] + (rnd() - 0.5) * amp, last[1] + (rnd() - 0.5) * amp]);
  let d = `M${r2(out[0][0])} ${r2(out[0][1])}`;
  for (let i = 1; i < out.length - 1; i++) {
    const mx = (out[i][0] + out[i + 1][0]) / 2;
    const my = (out[i][1] + out[i + 1][1]) / 2;
    d += `Q${r2(out[i][0])} ${r2(out[i][1])} ${r2(mx)} ${r2(my)}`;
  }
  d += `L${r2(out[out.length - 1][0])} ${r2(out[out.length - 1][1])}`;
  return closed ? `${d}Z` : d;
}

/** Points round an ellipse with a ragged radius: for blobs, heads, washes. */
export function blobPts(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  seed: number,
  n = 14,
  jitter = 0.16,
): Pt[] {
  const rnd = seeded(seed);
  return Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    const k = 1 - jitter / 2 + rnd() * jitter;
    return [cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k] as Pt;
  });
}

/* -- the sheet ------------------------------------------------------------ */

const SheetId = createContext("sk");

/**
 * The SVG for one plate. `id` must be unique on the page: it prefixes the
 * bleed and grain filters that Wash and Paper use.
 */
export function SketchFrame({
  id,
  width,
  height,
  label,
  children,
  className = "block h-auto w-full",
  decorative = false,
}: {
  id: string;
  width: number;
  height: number;
  /** What is drawn. Unused (and hidden from readers) when `decorative`. */
  label: string;
  children: React.ReactNode;
  className?: string;
  /** A small row marker beside text that already says it: aria-hidden. */
  decorative?: boolean;
}) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      {...(decorative ? { "aria-hidden": true } : { role: "img", "aria-label": label })}
    >
      {decorative ? null : <title>{label}</title>}
      <defs>
        <filter id={`${id}-bleed`} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.035"
            numOctaves={3}
            seed={3}
          />
          <feDisplacementMap in="SourceGraphic" scale={9} />
        </filter>
        <filter id={`${id}-grain`} x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves={2}
            seed={8}
          />
          <feColorMatrix values="0 0 0 0 0.35  0 0 0 0 0.28  0 0 0 0 0.2  0 0 0 0.14 0" />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
      </defs>
      <SheetId.Provider value={id}>{children}</SheetId.Provider>
    </svg>
  );
}

/* -- marks ---------------------------------------------------------------- */

/** Ink line, gone over twice so the edge looks faintly doubled. */
export function InkLine({
  pts,
  seed,
  width = 1.3,
  color = SK.ink,
  amp = 0.8,
  closed = false,
}: {
  pts: Pt[];
  seed: number;
  width?: number;
  color?: string;
  amp?: number;
  closed?: boolean;
}) {
  return (
    <g fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round">
      <path d={wobble(pts, seed, amp, 16, closed)} strokeWidth={width} />
      <path
        d={wobble(pts, seed + 97, amp * 1.6, 22, closed)}
        strokeWidth={width * 0.6}
        opacity={0.55}
      />
    </g>
  );
}

/** Unfinished pencil: the same drawing, fainter, dashed, uncoloured. */
export function PencilLine({
  pts,
  seed,
  width = 0.9,
  dash = "4 5",
  closed = false,
}: {
  pts: Pt[];
  seed: number;
  width?: number;
  dash?: string;
  closed?: boolean;
}) {
  return (
    <path
      d={wobble(pts, seed, 0.6, 16, closed)}
      fill="none"
      stroke={SK.pencil}
      strokeWidth={width}
      strokeDasharray={dash}
      strokeLinecap="round"
      opacity={0.8}
    />
  );
}

/** A loose watercolour wash: ragged edge, shifted off the line. */
export function Wash({
  pts,
  seed,
  fill,
  opacity = 0.6,
  dx = 3,
  dy = 2,
}: {
  pts: Pt[];
  seed: number;
  fill: string;
  opacity?: number;
  dx?: number;
  dy?: number;
}) {
  const id = useContext(SheetId);
  return (
    <path
      d={wobble(
        pts.map(([x, y]) => [x + dx, y + dy] as Pt),
        seed,
        2.4,
        18,
        true,
      )}
      fill={fill}
      opacity={opacity}
      filter={`url(#${id}-bleed)`}
    />
  );
}

/** A paper object (a receipt, a card, a sign): cream fill with faint grain. */
export function Paper({ pts, seed }: { pts: Pt[]; seed: number }) {
  const id = useContext(SheetId);
  const d = wobble(pts, seed, 0.5, 20, true);
  return (
    <>
      <path d={d} fill={SK.paper} />
      <path d={d} fill={SK.paper} filter={`url(#${id}-grain)`} />
    </>
  );
}

/** Crisp small ink text, so the sketchy wobble never costs legibility. */
export function SketchText({
  x,
  y,
  children,
  anchor = "start",
  fill = SK.ink,
  size = 13,
  serif = false,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  anchor?: Anchor;
  fill?: string;
  size?: number;
  serif?: boolean;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily={serif ? SERIF : LABEL}
      fontSize={size}
      fontWeight={500}
      fill={fill}
    >
      {children}
    </text>
  );
}

/**
 * A quiet action under an interactive plate: one small outlined button in the
 * label face, for plates whose action is a discrete event (ask again, draw
 * again) rather than a value to set.
 */
export function PlateButton({
  children,
  onClick,
  icon,
}: {
  children: React.ReactNode;
  onClick: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 border border-[var(--rule-2)] bg-[var(--paper)] px-3 py-1.5 text-xs font-medium text-[var(--ink-2)] transition-colors hover:border-[var(--ink-3)] hover:text-[var(--ink)] active:bg-[var(--paper-3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rule-2)]"
      style={{ fontFamily: LABEL }}
    >
      {icon}
      {children}
    </button>
  );
}

/* -- a quiet segmented control under an interactive plate ------------------- */

/** A row of outlined buttons of which one is on: for plates that switch between a few states. */
export function PlateToggle<T extends string>({ options, value, onChange }: { options: { id: T; label: string }[]; value: T; onChange: (id: T) => void }) {
  return (
    <div className="mt-2 flex flex-wrap items-center gap-2 px-1" role="group">
      {options.map((o) => {
        const on = o.id === value;
        return (
          <button
            key={o.id}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(o.id)}
            className={
              "inline-flex items-center border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rule-2)] " +
              (on
                ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
                : "border-[var(--rule-2)] bg-[var(--paper)] text-[var(--ink-2)] hover:border-[var(--ink-3)] hover:text-[var(--ink)]")
            }
            style={{ fontFamily: "var(--font-label)" }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/* -- slide layout blocks ---------------------------------------------------- */

/** Content slides trim the section's 7rem padding so each topic fits one screen. */
export const TIGHT = "md:!py-14";

export type Tone = "signal" | "counter" | "ink";

const BORDER: Record<Tone, string> = {
  signal: "border-[var(--rule)]",
  counter: "border-[var(--rule)]",
  ink: "border-[var(--rule)]",
};

const TEXT: Record<Tone, string> = {
  signal: "text-[var(--ink)]",
  counter: "text-[var(--ink)]",
  ink: "text-[var(--ink)]",
};

/** One verbatim sentence at reading size. */
export function P({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`type-body max-w-[var(--measure)] ${className}`.trim()}>{children}</p>
  );
}

/** A sentence promoted to lead size. */
export function Lead({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`type-lead max-w-[54ch] ${className}`.trim()}>{children}</p>;
}

/** A sentence set at quote/statement size. */
export function Statement({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`type-quote max-w-[36ch] ${className}`.trim()}>{children}</p>;
}

/** A sentence set at h2 size. */
export function Big({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`type-h2 !font-normal ${className}`.trim()}>{children}</p>;
}

/** Defined term inside a sentence in bold ink. */
export function Term({ children, tone = "ink" }: { children: React.ReactNode; tone?: Tone }) {
  return <strong className={`font-semibold ${TEXT[tone]}`}>{children}</strong>;
}

/** Inline emphasis for a key phrase inside a sentence. */
export function Tint({ children, tone = "signal" }: { children: React.ReactNode; tone?: Tone }) {
  return <strong className={`font-semibold ${TEXT[tone]}`}>{children}</strong>;
}

/** Hairline-topped block. */
export function Ruled({
  tone = "ink",
  children,
  className = "",
}: {
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`min-w-0 border-t pt-4 ${BORDER[tone]} ${className}`.trim()}>
      {children}
    </div>
  );
}

/** A plate container that sits directly on the clean white slide surface. */
export function Plate({
  children,
  wide = false,
  className = "",
}: {
  children: React.ReactNode;
  wide?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`figure-well w-full min-w-0 p-2 ${wide ? "overflow-x-auto" : ""} ${className}`.trim()}
    >
      {wide ? <div className="min-w-[480px] lg:min-w-0">{children}</div> : children}
    </div>
  );
}

/** Slide heading with an optional kicker prefix and a hairline rule beneath. */
export function SlideHeading({
  kicker,
  children,
  className = "",
}: {
  kicker?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mb-7 w-full md:mb-8 ${className}`.trim()}>
      <h2 className="type-h1 max-w-[34ch]">
        {kicker ? (
          <>
            <span className="type-label mb-3 block !text-[0.8rem] !text-[var(--ink-3)]">
              {kicker}
            </span>{" "}
          </>
        ) : null}
        {children}
      </h2>
      <div className="mt-4 h-px w-full bg-[var(--rule)]" />
    </div>
  );
}

/** Part opener heading with a non-zero-padded numeral and hairline rule. */
export function PartHead({
  n,
  title,
  className = "",
}: {
  n: number;
  title: string;
  className?: string;
}) {
  return (
    <div className={`mb-8 w-full ${className}`.trim()}>
      <div className="flex items-baseline gap-5 sm:gap-7">
        <span
          aria-hidden
          className="select-none font-sans text-[3rem] font-bold leading-none text-[var(--ink-3)]/45 sm:text-[4rem]"
        >
          {n}
        </span>
        <h2 className="type-display max-w-[26ch]">
          <span className="type-label mb-2 block !text-[0.8rem] !text-[var(--ink-3)]">
            {`Part ${n}:`}
          </span>{" "}
          {title}
        </h2>
      </div>
      <div className="mt-5 h-px w-full bg-[var(--rule)]" />
    </div>
  );
}

/** Numbered item with a non-zero-padded tabular numeral above its content. */
export function Numbered({
  n,
  children,
  className = "",
}: {
  n: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`min-w-0 border-t border-[var(--rule)] pt-4 ${className}`.trim()}>
      <span
        aria-hidden
        className="type-label mb-2 block tabular-nums !text-[var(--ink-3)]"
      >
        {n}
      </span>
      {children}
    </div>
  );
}

/** Discussion prompt block in upright sans-serif. */
export function Prompt({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`w-full max-w-4xl border-l-2 border-[var(--rule-2)] py-2 pl-6 ${className}`.trim()}
    >
      <p className="type-quote max-w-[48ch] !text-[clamp(1.2rem,2vw,1.6rem)]">
        <span className="type-label mb-4 block !text-[0.8rem] !text-[var(--ink-3)]">
          Discussion:
        </span>{" "}
        {children}
      </p>
    </div>
  );
}
