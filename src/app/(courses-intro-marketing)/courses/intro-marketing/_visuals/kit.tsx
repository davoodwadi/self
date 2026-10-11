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

/** Filled zones inside a plate: plates sit on --paper-2 wells. */
export const PAPER3 = "var(--paper-3)";

export const SIGNAL_TINT = "rgba(178, 58, 21, 0.09)";

export const COUNTER_TINT = "rgba(34, 87, 91, 0.09)";

export const LABEL = "var(--font-label)";

export const BODY = "var(--font-body)";

export const SERIF = "var(--font-heading)";

export type Anchor = "start" | "middle" | "end";

export function Key({
  x,
  y,
  children,
  anchor = "start",
  fill = INK3,
  size = 10.5,
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
      letterSpacing="0.14em"
      fill={fill}
    >
      {children}
    </text>
  );
}

export function Note({
  x,
  y,
  children,
  anchor = "start",
  fill = INK2,
  size = 13,
  italic = false,
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
      fontStyle={italic ? "italic" : undefined}
      fill={fill}
    >
      {children}
    </text>
  );
}

/** Display numeral or word in Fraunces, for the few places a plate shouts. */
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


/** Deterministic 0–1 hash, so scattered marks match on server and client. */
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
 * Deterministic 0–1 hash, so scattered marks match on server and client.
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
   projector; these pieces let students move one thing and watch the result.
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
      <span className="type-label shrink-0 !text-[0.66rem] !text-[var(--ink-3)]">{label}</span>
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
                "type-label border-l border-[var(--rule-2)] px-3 py-1.5 !text-[0.68rem] first:border-l-0 transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--rule-2)]",
                on
                  ? "bg-[var(--ink)] !text-[var(--paper)]"
                  : "bg-[var(--paper)] !text-[var(--ink-2)] hover:bg-[var(--paper-3)]",
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
      <span className="type-label shrink-0 !text-[0.66rem] !text-[var(--ink-3)]">{label}</span>
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
                "type-label inline-flex items-center gap-1.5 border px-3 py-1.5 !text-[0.68rem] transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rule-2)]",
                on
                  ? "border-[var(--ink)] bg-[var(--ink)] !text-[var(--paper)]"
                  : "border-dashed border-[var(--ink-3)] bg-[var(--paper)] !text-[var(--ink-2)] hover:border-solid hover:bg-[var(--paper-3)]",
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

/** A plate that lives in a column: a figure well without the 680px floor. */
export function Plate({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("figure-well w-full min-w-0 p-3 sm:p-5", className)}>
      {children}
    </div>
  );
}
