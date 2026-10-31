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

/** Filled zones inside a plate: plates sit on --paper-2 wells. */
export const PAPER3 = "var(--paper-3)";

export const SIGNAL_TINT = "rgba(178, 58, 21, 0.09)";

export const COUNTER_TINT = "rgba(34, 87, 91, 0.09)";

export const LABEL = "var(--font-label)";

export const BODY = "var(--font-body)";

export const SERIF = "var(--font-sans)";

export type Anchor = "start" | "middle" | "end";

const ACRONYMS = new Set([
  "AI", "B2B", "B2C", "CRM", "CSR", "STP", "SEO", "SEM", "ROI", "PR",
  "IMC", "PLC", "NPD", "PESTLE", "SWOT", "CLV", "R&D", "4PS", "FMCG",
  "KPI", "API", "GPS", "RFID", "ERP", "VMS", "TV", "US", "EU", "UK",
  "UN", "WTO", "NAFTA", "USMCA", "GDP", "VALS", "ELM", "EKB", "WOM",
  "CPG", "SKU", "UX", "UI", "A", "B", "C", "D", "X", "Y", "I", "II",
  "III", "IV", "V", "PPC", "CTR", "CPA", "CPM", "LTV", "CAC", "NPS",
]);

function normalizeSvgLabel(node: React.ReactNode): React.ReactNode {
  if (typeof node !== "string") return node;
  const trimmed = node.trim();
  const letters = trimmed.replace(/[^A-Za-z]/g, "");
  if (letters.length < 2 || letters !== letters.toUpperCase()) return node;
  if (ACRONYMS.has(trimmed)) return node;
  const words = trimmed.split(/(\s+|-|\/|:)/);
  let firstWordDone = false;
  return words
    .map((part) => {
      if (!/[A-Za-z]/.test(part)) return part;
      const upper = part.toUpperCase();
      if (ACRONYMS.has(upper)) {
        firstWordDone = true;
        return upper === "4PS" ? "4Ps" : upper;
      }
      const lower = part.toLowerCase();
      if (!firstWordDone) {
        firstWordDone = true;
        return lower.charAt(0).toUpperCase() + lower.slice(1);
      }
      return lower;
    })
    .join("");
}

export function Key({
  x,
  y,
  children,
  anchor = "start",
  fill = INK3,
  size = 11,
  weight = 500,
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
    >
      {normalizeSvgLabel(children)}
    </text>
  );
}

export function Note({
  x,
  y,
  children,
  anchor = "start",
  fill = INK2,
  size = 12.5,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  anchor?: Anchor;
  fill?: string;
  size?: number;
  italic?: boolean;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily={BODY}
      fontSize={size}
      fill={fill}
    >
      {children}
    </text>
  );
}

/** Display numeral or word inside a plate. */
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
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily={SERIF}
      fontSize={size}
      fontWeight={600}
      fill={fill}
    >
      {children}
    </text>
  );
}

export function Frame({
  height,
  label,
  children,
  width = 800,
}: {
  height: number;
  label: string;
  children: React.ReactNode;
  width?: number;
}) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-auto block"
      role="img"
      aria-label={label}
    >
      <title>{label}</title>
      {children}
    </svg>
  );
}

/** Open chevron arrowheads whose tip sits at (x, y). */
export const head1 = {
  right: (x: number, y: number) => `M${x - 8} ${y - 5}L${x} ${y}L${x - 8} ${y + 5}`,
  left: (x: number, y: number) => `M${x + 8} ${y - 5}L${x} ${y}L${x + 8} ${y + 5}`,
  down: (x: number, y: number) => `M${x - 5} ${y - 8}L${x} ${y}L${x + 5} ${y - 8}`,
  up: (x: number, y: number) => `M${x - 5} ${y + 8}L${x} ${y}L${x + 5} ${y + 8}`,
};

/** Arrowhead pointing along the direction (dx, dy), tip at (x, y). */
export function headAlong1(x: number, y: number, dx: number, dy: number, s = 8) {
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const bx = x - ux * s;
  const by = y - uy * s;
  const px = -uy * (s * 0.62);
  const py = ux * (s * 0.62);
  return `M${(bx + px).toFixed(2)} ${(by + py).toFixed(2)}L${x.toFixed(2)} ${y.toFixed(2)}L${(bx - px).toFixed(2)} ${(by - py).toFixed(2)}`;
}


/** Deterministic 0 to 1 hash, so scattered marks match on server and client. */
export const hash1 = (n: number) => {
  const v = Math.sin(n * 12.9898 + 78.233) * 43758.5453;
  return v - Math.floor(v);
};

export const head2 = {
  right: (x: number, y: number) => headAlong1(x, y, 1, 0),
  left: (x: number, y: number) => headAlong1(x, y, -1, 0),
  down: (x: number, y: number) => headAlong1(x, y, 0, 1),
  up: (x: number, y: number) => headAlong1(x, y, 0, -1),
};

export const glyphProps = {
  width: 64,
  height: 40,
  viewBox: "0 0 64 40",
  fill: "none",
  "aria-hidden": true,
} as const;

/**
 * Deterministic 0 to 1 hash, so scattered marks match on server and client.
 * Rounded to four places: Node and the browser disagree on Math.sin in the
 * last few digits, which the big multiplier would push into the attributes.
 */
export const hash2 = (n: number) => {
  const v = Math.sin(n * 12.9898 + 78.233) * 43758.5453;
  return Math.round((v - Math.floor(v)) * 1e4) / 1e4;
};

/** Round a computed coordinate, for the same server/client reason. */
export const r2 = (n: number) => Math.round(n * 100) / 100;

export function headAlong2(x: number, y: number, dx: number, dy: number, s = 8) {
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const bx = x - ux * s;
  const by = y - uy * s;
  const px = -uy * (s * 0.62);
  const py = ux * (s * 0.62);
  return `M${r2(bx + px)} ${r2(by + py)}L${r2(x)} ${r2(y)}L${r2(bx - px)} ${r2(by - py)}`;
}

/* --------------------------------------------------------------------------
   Interactive plates
   A plate's untouched state is the complete picture the slide shows on a
   projector. These pieces let students move one thing and watch the result.
   -------------------------------------------------------------------------- */

/**
 * A knob the student drags along one axis of the plate it sits in: a paper
 * disc with an open chevron either side, so the way it moves is visible
 * before anyone touches it. `value` is in the plate's own units. Arrow keys
 * move it too.
 */
export function DragKnob({
  x,
  y,
  value,
  min,
  max,
  onChange,
  label,
  axis = "x",
  tone = INK,
  step = 1,
}: {
  /** The fixed coordinate of the knob's track (y for a horizontal knob, x for a vertical one). */
  x?: number;
  y?: number;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  label: string;
  axis?: "x" | "y";
  tone?: string;
  step?: number;
}) {
  const cx = axis === "x" ? value : (x ?? 0);
  const cy = axis === "x" ? (y ?? 0) : value;
  const clamp = (v: number) => Math.min(max, Math.max(min, Math.round(v / step) * step));
  const toPlate = (e: React.PointerEvent<SVGGElement>) => {
    const svg = e.currentTarget.ownerSVGElement;
    const m = svg?.getScreenCTM();
    if (!svg || !m) return value;
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse());
    return axis === "x" ? p.x : p.y;
  };
  const a = 7;
  const chevrons =
    axis === "x"
      ? [headAlong2(cx - 15, cy, -1, 0, 5), headAlong2(cx + 15, cy, 1, 0, 5)]
      : [headAlong2(cx, cy - 15, 0, -1, 5), headAlong2(cx, cy + 15, 0, 1, 5)];
  return (
    <g
      role="slider"
      tabIndex={0}
      aria-label={label}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={Math.round(value)}
      aria-orientation={axis === "x" ? "horizontal" : "vertical"}
      className="outline-none [&:focus-visible_.knob]:stroke-[3]"
      style={{ cursor: axis === "x" ? "ew-resize" : "ns-resize", touchAction: "none", userSelect: "none" }}
      onPointerDown={(e) => {
        e.preventDefault();
        e.currentTarget.setPointerCapture(e.pointerId);
        onChange(clamp(toPlate(e)));
      }}
      onPointerMove={(e) => {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) onChange(clamp(toPlate(e)));
      }}
      onKeyDown={(e) => {
        const d =
          e.key === "ArrowRight" || e.key === "ArrowUp"
            ? 1
            : e.key === "ArrowLeft" || e.key === "ArrowDown"
              ? -1
              : 0;
        if (!d) return;
        e.preventDefault();
        onChange(clamp(value + d * step * 5 * (axis === "y" ? -1 : 1)));
      }}
    >
      <circle cx={cx} cy={cy} r={20} fill="transparent" />
      {chevrons.map((d) => (
        <path key={d} d={d} fill="none" stroke={tone} strokeWidth={1.5} />
      ))}
      <circle className="knob" cx={cx} cy={cy} r={a} fill={PAPER} stroke={tone} strokeWidth={2} />
    </g>
  );
}

/** A row of choices under an interactive plate, one pressed at a time. */
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
    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 px-1" role="group" aria-label={label}>
      <span className="shrink-0 font-sans text-xs font-medium text-[var(--ink-3)]">{label}</span>
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
                "border-l border-[var(--rule-2)] px-3 py-1.5 font-sans text-xs font-medium first:border-l-0 transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--rule-2)]",
                on
                  ? "bg-[var(--ink)] text-[var(--paper)]"
                  : "bg-[var(--paper)] text-[var(--ink-2)] hover:bg-[var(--paper-3)]",
              )}
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
 * A row of independent on/off choices under an interactive plate, for plates
 * that combine several named inputs rather than switching between views.
 */
export function Toggles<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { id: T; label: string }[];
  value: T[];
  onChange: (value: T[]) => void;
}) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 px-1" role="group" aria-label={label}>
      <span className="shrink-0 font-sans text-xs font-medium text-[var(--ink-3)]">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = value.includes(o.id);
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={on}
              onClick={() =>
                onChange(on ? value.filter((v) => v !== o.id) : options.map((x) => x.id).filter((id) => id === o.id || value.includes(id)))
              }
              className={cn(
                "inline-flex items-center gap-1.5 border px-3 py-1.5 font-sans text-xs font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rule-2)]",
                on
                  ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
                  : "border-dashed border-[var(--ink-3)] bg-[var(--paper)] text-[var(--ink-2)] hover:border-solid hover:bg-[var(--paper-3)]",
              )}
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

/* --------------------------------------------------------------------------
   Slide layout blocks
   -------------------------------------------------------------------------- */

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
  return <p className={`type-lead max-w-3xl ${className}`.trim()}>{children}</p>;
}

/** A sentence set at quote/statement size. */
export function Statement({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`type-quote max-w-3xl ${className}`.trim()}>{children}</p>;
}

/** A sentence set at body size. */
export function Big({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`type-body max-w-[var(--measure)] ${className}`.trim()}>{children}</p>;
}

/** Defined term inside a sentence in bold ink. */
export function Term({ children }: { children: React.ReactNode; tone?: Tone }) {
  return <strong className="font-semibold text-[var(--ink)]">{children}</strong>;
}

/** Inline phrase inside a sentence in normal weight. */
export function Tint({ children }: { children: React.ReactNode; tone?: Tone }) {
  return <>{children}</>;
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
      className={cn(
        "figure-well w-full min-w-0 p-2",
        wide && "overflow-x-auto",
        className,
      )}
    >
      {wide ? <div className="min-w-[480px] lg:min-w-0">{children}</div> : children}
    </div>
  );
}

/** Slide heading with an optional kicker prefix. */
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
      <h2 className="type-h1 max-w-4xl">
        {kicker ? `${kicker} ` : null}
        {children}
      </h2>
    </div>
  );
}

/** Part opener heading with a non-zero-padded label and hairline rule. */
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
      <div className="type-label mb-3 block text-[var(--ink-3)]">
        {`Part ${n}`}
      </div>
      <h2 className="type-display max-w-4xl">
        {title}
      </h2>
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
    <aside
      className={`w-full max-w-3xl border border-[var(--rule-2)] p-6 md:p-8 ${className}`.trim()}
    >
      <p className="type-body max-w-none">
        {children}
      </p>
    </aside>
  );
}
