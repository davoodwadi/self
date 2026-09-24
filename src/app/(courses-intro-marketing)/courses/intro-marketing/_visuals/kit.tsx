/* ==========================================================================
   Shared kit: the building blocks every week draws and lays out with —
   colours and type, the plate frame and label helpers, geometry helpers
   and slide layout blocks. See "Shared pieces" in the root CLAUDE.md.
   ========================================================================== */

import React from "react";

export const INK = "var(--ink)";

export const INK2 = "var(--ink-2)";

export const INK3 = "var(--ink-3)";

export const RULE = "var(--rule)";

export const RULE2 = "var(--rule-2)";

export const SIGNAL = "var(--signal)";

export const COUNTER = "var(--counter)";

export const PAPER = "var(--paper)";

export const PAPER2 = "var(--paper-2)";

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

export function Schematic({ x = 792, y = 18 }: { x?: number; y?: number }) {
  return (
    <Key x={x} y={y} anchor="end" size={9} fill={INK3}>
      SCHEMATIC
    </Key>
  );
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
