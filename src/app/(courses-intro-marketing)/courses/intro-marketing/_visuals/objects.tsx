/* ==========================================================================
   Introduction to Marketing — shared glyphs and objects
   --------------------------------------------------------------------------
   People, products, places and marks drawn on more than one week's plates,
   built on ./broadsheet. Where weeks drew the same thing differently, every
   drawing is kept and numbered (Person1, Person2, ...), in the order the
   weeks first used them, so each plate renders exactly as before.

   Weeks import from here and ./broadsheet, never from another week.
   ========================================================================== */

import React from "react";
import {
  COUNTER,
  headAlong1,
  headAlong2,
  INK,
  INK3,
  Key,
  PAPER,
  PAPER2,
  r2,
  SIGNAL,
  SIGNAL_TINT,
} from "./broadsheet";

/** A straight arrow from (x1, y1) to (x2, y2). */
export function Arrow1({
  x1,
  y1,
  x2,
  y2,
  tone = INK,
  width = 1.5,
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
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={tone} strokeWidth={width} strokeDasharray={dash} />
      <path d={headAlong1(x2, y2, x2 - x1, y2 - y1)} fill="none" stroke={tone} strokeWidth={width} />
    </g>
  );
}

/** A straight arrow from (x1, y1) to (x2, y2). */
export function Arrow2({
  x1,
  y1,
  x2,
  y2,
  tone = INK,
  width = 1.5,
  dash,
  size = 8,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  tone?: string;
  width?: number;
  dash?: string;
  size?: number;
}) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={tone} strokeWidth={width} strokeDasharray={dash} />
      <path d={headAlong1(x2, y2, x2 - x1, y2 - y1, size)} fill="none" stroke={tone} strokeWidth={width} />
    </g>
  );
}

/** A straight arrow from (x1, y1) to (x2, y2). */
export function Arrow3({
  x1,
  y1,
  x2,
  y2,
  tone = INK,
  width = 1.5,
  dash,
  size = 8,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  tone?: string;
  width?: number;
  dash?: string;
  size?: number;
}) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={tone} strokeWidth={width} strokeDasharray={dash} />
      <path d={headAlong2(x2, y2, x2 - x1, y2 - y1, size)} fill="none" stroke={tone} strokeWidth={width} />
    </g>
  );
}

export function Bottle1({ x, y, tone = INK, fill = PAPER }: { x: number; y: number; tone?: string; fill?: string }) {
  return (
    <g strokeLinejoin="round">
      <path d={`M${x - 16} ${y} V${y - 62} Q${x - 16} ${y - 76} ${x - 6} ${y - 82} V${y - 94} H${x + 6} V${y - 82} Q${x + 16} ${y - 76} ${x + 16} ${y - 62} V${y} Z`} fill={fill} stroke={tone} strokeWidth={1.5} />
      <rect x={x - 8} y={y - 104} width={16} height={10} fill={tone} />
    </g>
  );
}

/** A bottle standing on (x, y): the invented product. */
export function Bottle2({ x, y, tone = SIGNAL, fill = SIGNAL_TINT }: { x: number; y: number; tone?: string; fill?: string }) {
  return (
    <path
      d={`M${x - 16} ${y}V${y - 34}Q${x - 16} ${y - 44} ${x - 6} ${y - 48}V${y - 58}H${x + 6}V${y - 48}Q${x + 16} ${y - 44} ${x + 16} ${y - 34}V${y}Z`}
      fill={fill}
      stroke={tone}
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
  );
}

/** A speech bubble whose box starts at (x, y), tail at the bottom. */
export function Bubble1({
  x,
  y,
  w,
  h,
  tone = INK,
  fill = PAPER,
  tail = "left",
  dash,
  width = 1.5,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  tone?: string;
  fill?: string;
  tail?: "left" | "right";
  dash?: string;
  width?: number;
}) {
  const b = y + h;
  const l = tail === "left" ? x + 10 : x + w - 20;
  const t = tail === "left" ? `M${l} ${b}L${x + 6} ${b + 9}L${l + 10} ${b}` : `M${l} ${b}L${x + w - 6} ${b + 9}L${l + 10} ${b}`;
  return (
    <g strokeLinejoin="round">
      <rect x={x} y={y} width={w} height={h} rx={6} fill={fill} stroke={tone} strokeWidth={width} strokeDasharray={dash} />
      <path d={t} fill={fill} stroke={tone} strokeWidth={width} strokeDasharray={dash} />
      {/* open the box where the tail joins it */}
      <line x1={l + 1.5} y1={b} x2={l + 8.5} y2={b} stroke={fill === "none" ? PAPER : fill} strokeWidth={width + 0.8} />
    </g>
  );
}

/** A speech bubble whose box starts at (x, y), tail at the bottom. */
export function Bubble2({
  x,
  y,
  w,
  h,
  tone = INK,
  fill = PAPER,
  tail = "left",
  dash,
  width = 1.5,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  tone?: string;
  fill?: string;
  tail?: "left" | "right";
  dash?: string;
  width?: number;
}) {
  const b = y + h;
  const l = tail === "left" ? x + 8 : x + w - 18;
  const t =
    tail === "left"
      ? `M${l} ${b}L${x + 4} ${b + 8}L${l + 10} ${b}`
      : `M${l} ${b}L${x + w - 4} ${b + 8}L${l + 10} ${b}`;
  return (
    <g strokeLinejoin="round">
      <rect x={x} y={y} width={w} height={h} rx={Math.min(6, h / 3)} fill={fill} stroke={tone} strokeWidth={width} strokeDasharray={dash} />
      <path d={t} fill={fill} stroke={tone} strokeWidth={width} strokeDasharray={dash} />
      <line x1={l + 1.5} y1={b} x2={l + 8.5} y2={b} stroke={fill === "none" ? PAPER : fill} strokeWidth={width + 0.8} />
    </g>
  );
}

/** A speech bubble with its box at (x, y), tail under its left or right end. */
export function Bubble3({
  x,
  y,
  w,
  h,
  tone = INK,
  fill = PAPER,
  tail = "left",
  dash,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  tone?: string;
  fill?: string;
  tail?: "left" | "right";
  dash?: string;
}) {
  const b = y + h;
  const r = 6;
  const t = tail === "left" ? x + 14 : x + w - 14;
  const d = tail === "left" ? -8 : 8;
  return (
    <path
      d={`M${x + r} ${y}H${x + w - r}Q${x + w} ${y} ${x + w} ${y + r}V${b - r}Q${x + w} ${b} ${x + w - r} ${b}H${Math.max(t, t + d) }L${t + (tail === "left" ? -4 : 4)} ${b + 10}L${Math.min(t, t + d)} ${b}H${x + r}Q${x} ${b} ${x} ${b - r}V${y + r}Q${x} ${y} ${x + r} ${y}Z`}
      fill={fill}
      stroke={tone}
      strokeWidth={1.5}
      strokeLinejoin="round"
      strokeDasharray={dash}
    />
  );
}

export function Bulb1({ x, y, tone, dashed = false }: { x: number; y: number; tone: string; dashed?: boolean }) {
  return (
    <g strokeDasharray={dashed ? "2 2" : undefined}>
      <circle cx={x} cy={y} r={8} fill={PAPER} stroke={tone} strokeWidth={1.5} />
      <rect x={x - 4} y={y + 8} width={8} height={5} fill={tone} />
    </g>
  );
}

/** A lightbulb, centred on (x, y): an insight. */
export function Bulb2({ x, y, k = 1, tone = SIGNAL, fill = SIGNAL_TINT }: { x: number; y: number; k?: number; tone?: string; fill?: string }) {
  const X = (d: number) => r2(x + d * k);
  const Y = (d: number) => r2(y + d * k);
  return (
    <g strokeLinejoin="round">
      <path d={`M${X(-6)} ${Y(10)}Q${X(-6)} ${Y(4)} ${X(-10)} ${Y(0)}A${r2(13 * k)} ${r2(13 * k)} 0 1 1 ${X(10)} ${Y(0)}Q${X(6)} ${Y(4)} ${X(6)} ${Y(10)}Z`} fill={fill} stroke={tone} strokeWidth={1.5} />
      <path d={`M${X(-5)} ${Y(14)}H${X(5)}M${X(-4)} ${Y(18)}H${X(4)}`} stroke={tone} strokeWidth={1.5} strokeLinecap="round" />
    </g>
  );
}

export function Chip1({
  x,
  y,
  w,
  label,
  tone = INK,
  fill = PAPER,
}: {
  x: number;
  y: number;
  w: number;
  label: string;
  tone?: string;
  fill?: string;
}) {
  return (
    <g>
      <rect x={x} y={y - 17} width={w} height={28} fill={fill} stroke={tone} strokeWidth={1.25} />
      <Key x={x + w / 2} y={y + 1} anchor="middle" fill={tone} size={10.5}>
        {label}
      </Key>
    </g>
  );
}

/** Artificial intelligence: a chip with pins, marked AI, centred on (x, y). */
export function Chip2({
  x,
  y,
  s = 44,
  tone = SIGNAL,
  fill = SIGNAL_TINT,
}: {
  x: number;
  y: number;
  s?: number;
  tone?: string;
  fill?: string;
}) {
  const h = s / 2;
  const pins = [-0.28, 0, 0.28];
  const pin = r2(s * 0.16);
  return (
    <g>
      {pins.map((d) => {
        const o = r2(d * s);
        return (
          <g key={d} stroke={tone} strokeWidth={1.5}>
            <line x1={x + o} y1={y - h - pin} x2={x + o} y2={y - h} />
            <line x1={x + o} y1={y + h} x2={x + o} y2={y + h + pin} />
            <line x1={x - h - pin} y1={y + o} x2={x - h} y2={y + o} />
            <line x1={x + h} y1={y + o} x2={x + h + pin} y2={y + o} />
          </g>
        );
      })}
      <rect x={x - h} y={y - h} width={s} height={s} rx={r2(s * 0.12)} fill={fill} stroke={tone} strokeWidth={1.75} />
      <text
        x={x}
        y={r2(y + s * 0.15)}
        textAnchor="middle"
        fontFamily="var(--font-heading)"
        fontWeight={600}
        fontSize={r2(s * 0.42)}
        fill={tone}
      >
        AI
      </text>
    </g>
  );
}

/** A stack of coins centred on x, bottom coin at y. */
export function Coins1({ x, y, n = 4, rx = 13, tone = INK }: { x: number; y: number; n?: number; rx?: number; tone?: string }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <ellipse key={i} cx={x} cy={y - i * 7} rx={rx} ry={4.5} fill={PAPER} stroke={tone} strokeWidth={1.25} />
      ))}
    </g>
  );
}

/** A stack of coins standing on y: spending. */
export function Coins2({
  x,
  y,
  n,
  tone = INK,
  fill = PAPER,
  w = 28,
}: {
  x: number;
  y: number;
  n: number;
  tone?: string;
  fill?: string;
  w?: number;
}) {
  const h = 6;
  const top = y - n * h;
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <rect key={i} x={x - w / 2} y={y - (i + 1) * h} width={w} height={h} rx={3} fill={fill} stroke={tone} strokeWidth={1.2} />
      ))}
      <ellipse cx={x} cy={top} rx={w / 2} ry={3.5} fill={PAPER} stroke={tone} strokeWidth={1.2} />
    </g>
  );
}

/** An arrow along a quadratic curve through control point (cx, cy). */
export function CurveArrow1({
  x1,
  y1,
  cx,
  cy,
  x2,
  y2,
  tone = INK,
  width = 1.5,
  dash,
  size = 8,
}: {
  x1: number;
  y1: number;
  cx: number;
  cy: number;
  x2: number;
  y2: number;
  tone?: string;
  width?: number;
  dash?: string;
  size?: number;
}) {
  return (
    <g>
      <path d={`M${x1} ${y1}Q${cx} ${cy} ${x2} ${y2}`} fill="none" stroke={tone} strokeWidth={width} strokeDasharray={dash} />
      <path d={headAlong2(x2, y2, x2 - cx, y2 - cy, size)} fill="none" stroke={tone} strokeWidth={width} />
    </g>
  );
}

/** An arrow along a quadratic curve from (x1, y1) through control (cx, cy). */
export function CurveArrow2({
  x1,
  y1,
  cx,
  cy,
  x2,
  y2,
  tone = INK,
  width = 1.5,
  dash,
  size = 8,
}: {
  x1: number;
  y1: number;
  cx: number;
  cy: number;
  x2: number;
  y2: number;
  tone?: string;
  width?: number;
  dash?: string;
  size?: number;
}) {
  return (
    <g>
      <path d={`M${x1} ${y1}Q${cx} ${cy} ${x2} ${y2}`} fill="none" stroke={tone} strokeWidth={width} strokeDasharray={dash} />
      <path d={headAlong1(x2, y2, x2 - cx, y2 - cy, size)} fill="none" stroke={tone} strokeWidth={width} />
    </g>
  );
}

/** An eye, centred on (x, y). */
export function Eye1({ x, y, k = 1, tone = COUNTER }: { x: number; y: number; k?: number; tone?: string }) {
  return (
    <g>
      <path d={`M${x - 26 * k} ${y} Q${x} ${y - 24 * k} ${x + 26 * k} ${y} Q${x} ${y + 24 * k} ${x - 26 * k} ${y} Z`} fill={PAPER} stroke={tone} strokeWidth={1.75} strokeLinejoin="round" />
      <circle cx={x} cy={y} r={9 * k} fill={tone} />
      <circle cx={x} cy={y} r={3 * k} fill={PAPER} />
    </g>
  );
}

/** An eye, centred on (x, y): watching. */
export function Eye2({ x, y, k = 1, tone = COUNTER }: { x: number; y: number; k?: number; tone?: string }) {
  const X = (d: number) => r2(x + d * k);
  const Y = (d: number) => r2(y + d * k);
  return (
    <g>
      <path d={`M${X(-18)} ${Y(0)}Q${X(0)} ${Y(-16)} ${X(18)} ${Y(0)}Q${X(0)} ${Y(16)} ${X(-18)} ${Y(0)}Z`} fill={PAPER} stroke={tone} strokeWidth={1.5} />
      <circle cx={x} cy={y} r={r2(6 * k)} fill={tone} />
      <circle cx={X(2)} cy={Y(-2)} r={r2(1.6 * k)} fill={PAPER} />
    </g>
  );
}

/** A small factory: box with a sawtooth roof, centred on x, standing on y. */
export function Factory1({ x, y, w = 56, h = 36, stroke = INK, fill = PAPER }: { x: number; y: number; w?: number; h?: number; stroke?: string; fill?: string }) {
  const left = x - w / 2;
  const step = w / 3;
  const top = y - h;
  const roof = Array.from({ length: 3 }, (_, i) => `L${left + step * i} ${top - 12}L${left + step * (i + 1)} ${top}`).join("");
  return (
    <g>
      <path d={`M${left} ${top}${roof}Z`} fill={fill} stroke={stroke} strokeWidth={1.5} strokeLinejoin="round" />
      <rect x={left} y={top} width={w} height={h} fill={fill} stroke={stroke} strokeWidth={1.5} />
    </g>
  );
}

/** A factory, centred on x, bottom at y. About 46 wide. */
export function Factory2({ x, y, tone = INK }: { x: number; y: number; tone?: string }) {
  return (
    <path
      d={`M${x - 26} ${y} V${y - 24} L${x - 13} ${y - 34} V${y - 24} L${x} ${y - 34} V${y - 24} L${x + 10} ${y - 34} V${y - 48} H${x + 20} V${y} Z`}
      fill={PAPER}
      stroke={tone}
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
  );
}

/** A factory, centred on x, standing on y. About 58 wide, 50 tall. */
export function Factory3({
  x,
  y,
  tone = INK,
  fill = PAPER,
  k = 1,
  dash,
}: {
  x: number;
  y: number;
  tone?: string;
  fill?: string;
  k?: number;
  dash?: string;
}) {
  return (
    <path
      d={`M${x - 29 * k} ${y} V${y - 26 * k} L${x - 14 * k} ${y - 37 * k} V${y - 26 * k} L${x + 1 * k} ${y - 37 * k} V${y - 26 * k} L${x + 12 * k} ${y - 37 * k} V${y - 52 * k} H${x + 23 * k} V${y} Z`}
      fill={fill}
      stroke={tone}
      strokeWidth={1.5}
      strokeLinejoin="round"
      strokeDasharray={dash}
    />
  );
}

/** A flag on a pole, the pole foot at (x, y). */
export function Flag1({ x, y, tone = SIGNAL, k = 1 }: { x: number; y: number; tone?: string; k?: number }) {
  return (
    <g>
      <line x1={x} y1={y} x2={x} y2={y - 44 * k} stroke={INK} strokeWidth={1.75} />
      <path d={`M${x} ${y - 44 * k} H${x + 34 * k} L${x + 25 * k} ${y - 34 * k} L${x + 34 * k} ${y - 24 * k} H${x} Z`} fill={tone} />
    </g>
  );
}

/**
 * A country: a flag on a pole standing on (x, y). The home country flies a
 * solid flag; each foreign country has its own pattern.
 */
export function Flag2({
  x,
  y,
  pattern = "home",
  tone = INK,
  h = 34,
}: {
  x: number;
  y: number;
  pattern?: FlagPattern;
  tone?: string;
  h?: number;
}) {
  const top = y - h;
  const w = 24;
  const fh = 16;
  return (
    <g>
      <line x1={x} y1={y} x2={x} y2={top - 2} stroke={tone} strokeWidth={1.5} strokeLinecap="round" />
      <rect x={x} y={top} width={w} height={fh} fill={pattern === "home" ? tone : PAPER} stroke={tone} strokeWidth={1.25} />
      {pattern === "tri" ? <rect x={x} y={top} width={8} height={fh} fill={tone} /> : null}
      {pattern === "tri" ? <rect x={x + 16} y={top} width={8} height={fh} fill={tone} /> : null}
      {pattern === "band" ? <rect x={x} y={top + 5} width={w} height={6} fill={tone} /> : null}
      {pattern === "disc" ? <circle cx={x + 12} cy={top + 8} r={4.5} fill={tone} /> : null}
      {pattern === "cross" ? (
        <path d={`M${x + 8} ${top}V${top + fh}M${x} ${top + 8}H${x + w}`} stroke={tone} strokeWidth={3} />
      ) : null}
      {pattern === "diag" ? (
        <path d={`M${x} ${top + fh}L${x + w} ${top}`} stroke={tone} strokeWidth={4} />
      ) : null}
    </g>
  );
}

export type FlagPattern = "home" | "tri" | "band" | "disc" | "cross" | "diag";

/** A gear of radius r centred on (x, y). */
export function Gear1({ x, y, r, stroke = INK, width = 1.5 }: { x: number; y: number; r: number; stroke?: string; width?: number }) {
  const teeth = r > 10 ? 8 : 6;
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={PAPER} stroke={stroke} strokeWidth={width} />
      <circle cx={x} cy={y} r={r * 0.35} fill="none" stroke={stroke} strokeWidth={width} />
      {Array.from({ length: teeth }, (_, i) => (
        <rect
          key={i}
          x={x - r * 0.16}
          y={y - r - r * 0.34}
          width={r * 0.32}
          height={r * 0.36}
          fill={stroke}
          transform={`rotate(${(360 / teeth) * i} ${x} ${y})`}
        />
      ))}
    </g>
  );
}

/** A cog, centred on (x, y): technical adjustment and automation. */
export function Gear2({ x, y, r = 13, tone = INK }: { x: number; y: number; r?: number; tone?: string }) {
  return (
    <g>
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * 45 * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={r2(x + (r - 1) * Math.cos(a))}
            y1={r2(y + (r - 1) * Math.sin(a))}
            x2={r2(x + (r + 5) * Math.cos(a))}
            y2={r2(y + (r + 5) * Math.sin(a))}
            stroke={tone}
            strokeWidth={r / 3.2}
          />
        );
      })}
      <circle cx={x} cy={y} r={r} fill={PAPER} stroke={tone} strokeWidth={1.75} />
      <circle cx={x} cy={y} r={r2(r * 0.32)} fill={tone} />
    </g>
  );
}

export function Gift1({ x, y, w, h, tone = SIGNAL }: { x: number; y: number; w: number; h: number; tone?: string }) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={SIGNAL_TINT} stroke={tone} strokeWidth={2} />
      <path d={`M${cx} ${y} V${y + h} M${x} ${cy} H${x + w}`} stroke={tone} strokeWidth={3} />
      <path d={`M${cx} ${y} C${cx - 20} ${y - 20} ${cx - 30} ${y - 4} ${cx} ${y} C${cx + 30} ${y - 4} ${cx + 20} ${y - 20} ${cx} ${y}`} fill="none" stroke={tone} strokeWidth={2} />
    </g>
  );
}

/** A small wrapped gift, bottom at y. */
export function Gift2({ x, y, s = 14, tone = SIGNAL }: { x: number; y: number; s?: number; tone?: string }) {
  const h = s / 2;
  return (
    <g strokeLinejoin="round">
      <rect x={x - h} y={y - s} width={s} height={s} fill={PAPER} stroke={tone} strokeWidth={1.3} />
      <path d={`M${x} ${y - s}V${y}M${x - h} ${y - h}H${x + h}`} stroke={tone} strokeWidth={1.1} />
      <path d={`M${x} ${y - s}Q${x - h} ${y - s - h} ${x - 2} ${y - s}M${x} ${y - s}Q${x + h} ${y - s - h} ${x + 2} ${y - s}`} fill="none" stroke={tone} strokeWidth={1.2} />
    </g>
  );
}

export function GlyphFrame({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 72 56" width={72} height={56} aria-hidden className="block shrink-0">
      {children}
    </svg>
  );
}

export function Head1({
  x,
  y,
  k = 1,
  faceRight = false,
  tone = INK,
  fill = "none",
}: {
  x: number;
  y: number;
  k?: number;
  faceRight?: boolean;
  tone?: string;
  fill?: string;
}) {
  const t = faceRight ? `translate(${x + 200 * k} ${y}) scale(${-k} ${k})` : `translate(${x} ${y}) scale(${k})`;
  return (
    <g transform={t}>
      <path d={HEAD_PATH} fill={fill} stroke={tone} strokeWidth={1.75 / k} strokeLinejoin="round" strokeLinecap="round" />
    </g>
  );
}

export function Head2({
  x,
  y,
  k = 1,
  faceRight = false,
  tone = INK,
  fill = "none",
}: {
  x: number;
  y: number;
  k?: number;
  faceRight?: boolean;
  tone?: string;
  fill?: string;
}) {
  const t = faceRight ? `translate(${x + 200 * k} ${y}) scale(${-k} ${k})` : `translate(${x} ${y}) scale(${k})`;
  return (
    <g transform={t}>
      <path d={HEAD_PATH} fill={fill} stroke={tone} strokeWidth={1.75} strokeLinejoin="round" strokeLinecap="round" {...NS} />
    </g>
  );
}

/** A head in profile inside a 200 × 220 box at (x, y); faces left unless faceRight. */
export function Head3({
  x,
  y,
  k = 1,
  faceRight = false,
  tone = INK,
  fill = "none",
}: {
  x: number;
  y: number;
  k?: number;
  faceRight?: boolean;
  tone?: string;
  fill?: string;
}) {
  const t = faceRight ? `translate(${x + 200 * k} ${y}) scale(${-k} ${k})` : `translate(${x} ${y}) scale(${k})`;
  return (
    <g transform={t}>
      <path d={HEAD_PATH} fill={fill} stroke={tone} strokeWidth={1.75} strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </g>
  );
}

/** A head in profile, facing left, inside a 200 × 220 box. */
export const HEAD_PATH =
  "M150 205 C150 190 175 170 185 140 C200 95 190 40 140 15 C95 -5 40 5 25 55 C20 70 22 85 20 95 L2 128 L18 136 L16 150 L22 158 L18 170 C22 186 40 190 62 186 L68 205";

export function Laptop1({ cx, top, k = 1, tone = INK }: { cx: number; top: number; k?: number; tone?: string }) {
  const w = 60 * k;
  const h = 74 * k;
  return (
    <g strokeLinejoin="round">
      <rect x={cx - w} y={top} width={2 * w} height={h} fill={PAPER} stroke={tone} strokeWidth={1.75} />
      <rect x={cx - w + 8 * k} y={top + 8 * k} width={2 * w - 16 * k} height={h - 16 * k} fill={PAPER2} />
      <path d={`M${cx - w - 14 * k} ${top + h} H${cx + w + 14 * k} L${cx + w + 24 * k} ${top + h + 12 * k} H${cx - w - 24 * k} Z`} fill={PAPER} stroke={tone} strokeWidth={1.75} />
    </g>
  );
}

/** A laptop, centred on x, base on y. About 70 wide at k = 1. */
export function Laptop2({ x, y, k = 1, tone = INK }: { x: number; y: number; k?: number; tone?: string }) {
  const X = (d: number) => r2(x + d * k);
  const Y = (d: number) => r2(y + d * k);
  return (
    <g strokeLinejoin="round">
      <rect x={X(-26)} y={Y(-40)} width={r2(52 * k)} height={r2(34 * k)} rx={2} fill={PAPER} stroke={tone} strokeWidth={1.5} />
      <rect x={X(-21)} y={Y(-35)} width={r2(42 * k)} height={r2(24 * k)} fill={PAPER2} stroke={tone} strokeWidth={0.75} />
      <path d={`M${X(-34)} ${Y(0)}L${X(-28)} ${Y(-6)}H${X(28)}L${X(34)} ${Y(0)}Z`} fill={PAPER} stroke={tone} strokeWidth={1.5} />
    </g>
  );
}

/** A magnifying glass, lens centred on (x, y). */
export function Magnifier1({
  x,
  y,
  r = 12,
  tone = INK,
  fill = PAPER,
}: {
  x: number;
  y: number;
  r?: number;
  tone?: string;
  fill?: string;
}) {
  const d = r2(r * 0.72);
  return (
    <g>
      <line x1={r2(x + d)} y1={r2(y + d)} x2={r2(x + d + r * 0.8)} y2={r2(y + d + r * 0.8)} stroke={tone} strokeWidth={3} strokeLinecap="round" />
      <circle cx={x} cy={y} r={r} fill={fill} stroke={tone} strokeWidth={1.75} />
    </g>
  );
}

/** A magnifying glass whose lens is centred on (x, y). */
export function Magnifier2({ x, y, r = 22, tone = SIGNAL }: { x: number; y: number; r?: number; tone?: string }) {
  const d = r2(r * 0.71);
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="none" stroke={tone} strokeWidth={2.25} />
      <line x1={r2(x + d)} y1={r2(y + d)} x2={r2(x + d + r * 0.7)} y2={r2(y + d + r * 0.7)} stroke={tone} strokeWidth={4} strokeLinecap="round" />
    </g>
  );
}

/**
 * A buyer mark. Four kinds stand for four different sets of needs,
 * characteristics, or behaviors: circle, square, triangle, diamond.
 */
export function Mark1({
  kind,
  x,
  y,
  s = 5,
  fill,
  stroke,
  width = 1.25,
}: {
  kind: number;
  x: number;
  y: number;
  s?: number;
  fill: string;
  stroke?: string;
  width?: number;
}) {
  const common = { fill, stroke: stroke ?? "none", strokeWidth: stroke ? width : 0 };
  if (kind === 0) return <circle cx={x} cy={y} r={s} {...common} />;
  if (kind === 1) return <rect x={r2(x - s * 0.9)} y={r2(y - s * 0.9)} width={r2(s * 1.8)} height={r2(s * 1.8)} {...common} />;
  if (kind === 2)
    return <path d={`M${x} ${r2(y - s * 1.1)}L${r2(x + s * 1.05)} ${r2(y + s * 0.8)}L${r2(x - s * 1.05)} ${r2(y + s * 0.8)}Z`} {...common} strokeLinejoin="round" />;
  return <path d={`M${x} ${r2(y - s * 1.2)}L${r2(x + s)} ${y}L${x} ${r2(y + s * 1.2)}L${r2(x - s)} ${y}Z`} {...common} strokeLinejoin="round" />;
}

/** The brand message: a ring with a diamond. Same seal = same message. */
export function Mark2({
  x,
  y,
  r = 10,
  tone = SIGNAL,
  fill = PAPER,
}: {
  x: number;
  y: number;
  r?: number;
  tone?: string;
  fill?: string;
}) {
  const d = r2(r * 0.55);
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={fill} stroke={tone} strokeWidth={1.5} />
      <path d={`M${x} ${r2(y - d)}L${r2(x + d)} ${y}L${x} ${r2(y + d)}L${r2(x - d)} ${y}Z`} fill={tone} />
    </g>
  );
}

/** Keep strokes at their drawn width inside a scaled group. */
export const NS = { vectorEffect: "non-scaling-stroke" } as const;

/** A small package (a product or an offer), centred on x, bottom at y. */
export function Pack1({
  x,
  y,
  w = 34,
  h = 30,
  tone = INK,
  fill = PAPER,
  kind,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  tone?: string;
  fill?: string;
  kind?: number;
}) {
  return (
    <g>
      <rect x={x - w / 2} y={y - h} width={w} height={h} fill={fill} stroke={tone} strokeWidth={1.5} />
      <path d={`M${x - w / 2} ${y - h + 8}H${x + w / 2}`} stroke={tone} strokeWidth={1} />
      {kind !== undefined ? <Mark1 kind={kind} x={x} y={y - h / 2 + 4} s={4.5} fill={tone} /> : null}
    </g>
  );
}

/** A small package, centred on x, bottom at y. */
export function Pack2({
  x,
  y,
  w = 34,
  h = 30,
  tone = INK,
  fill = PAPER,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  tone?: string;
  fill?: string;
}) {
  return (
    <g>
      <rect x={x - w / 2} y={y - h} width={w} height={h} fill={fill} stroke={tone} strokeWidth={1.5} />
      <path d={`M${x - w / 2} ${y - h + 8}H${x + w / 2}`} stroke={tone} strokeWidth={1} />
    </g>
  );
}

/** A small package, centred on x, bottom at y. */
export function Pack3({
  x,
  y,
  w = 34,
  h = 30,
  tone = INK,
  fill = PAPER,
  dash,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  tone?: string;
  fill?: string;
  dash?: string;
}) {
  return (
    <g>
      <rect x={x - w / 2} y={y - h} width={w} height={h} fill={fill} stroke={tone} strokeWidth={1.5} strokeDasharray={dash} />
      <path d={`M${x - w / 2} ${y - h + 8}H${x + w / 2}`} stroke={tone} strokeWidth={1} strokeDasharray={dash} />
    </g>
  );
}

/** A crate or carton, centred on x, bottom at y. */
export function Pack4({
  x,
  y,
  w = 34,
  h = 30,
  tone = INK,
  fill = PAPER,
  dash,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  tone?: string;
  fill?: string;
  dash?: string;
}) {
  return (
    <g>
      <rect x={x - w / 2} y={y - h} width={w} height={h} fill={fill} stroke={tone} strokeWidth={1.5} strokeDasharray={dash} />
      <path d={`M${x - w / 2} ${y - h + Math.round(h / 4)}H${x + w / 2}`} stroke={tone} strokeWidth={1} strokeDasharray={dash} />
    </g>
  );
}

/** A small standing figure, feet at (x, y). */
export function Person1({ x, y, s = 1, tone = INK }: { x: number; y: number; s?: number; tone?: string }) {
  return (
    <g>
      <circle cx={x} cy={y - 26 * s} r={5 * s} fill={tone} />
      <path
        d={`M${x - 8 * s} ${y} L${x - 8 * s} ${y - 10 * s} Q${x - 8 * s} ${y - 18 * s} ${x} ${y - 18 * s} Q${x + 8 * s} ${y - 18 * s} ${x + 8 * s} ${y - 10 * s} L${x + 8 * s} ${y} Z`}
        fill={tone}
      />
    </g>
  );
}

/** A person glyph standing on (x, y). k scales it; 1 is 34 units tall. */
export function Person2({
  x,
  y,
  k = 1,
  stroke = INK,
  fill = PAPER,
  width = 1.5,
  dashed = false,
}: {
  x: number;
  y: number;
  k?: number;
  stroke?: string;
  fill?: string;
  width?: number;
  dashed?: boolean;
}) {
  const w = 10 * k;
  const top = y - 21 * k;
  const shoulder = y - 12 * k;
  const dash = dashed ? "3 3" : undefined;
  return (
    <g>
      <circle cx={x} cy={y - 28 * k} r={6 * k} fill={fill} stroke={stroke} strokeWidth={width} strokeDasharray={dash} />
      <path
        d={`M${x - w} ${y}V${shoulder}Q${x - w} ${top} ${x} ${top}Q${x + w} ${top} ${x + w} ${shoulder}V${y}Z`}
        fill={fill}
        stroke={stroke}
        strokeWidth={width}
        strokeLinejoin="round"
        strokeDasharray={dash}
      />
    </g>
  );
}

/** A person glyph standing on (x, y). k scales it; 1 is 34 units tall. */
export function Person3({
  x,
  y,
  k = 1,
  stroke = INK,
  fill = PAPER,
  width = 1.5,
}: {
  x: number;
  y: number;
  k?: number;
  stroke?: string;
  fill?: string;
  width?: number;
}) {
  const w = 10 * k;
  const top = y - 21 * k;
  const shoulder = y - 12 * k;
  return (
    <g>
      <circle cx={x} cy={y - 28 * k} r={6 * k} fill={fill} stroke={stroke} strokeWidth={width} />
      <path
        d={`M${x - w} ${y}V${shoulder}Q${x - w} ${top} ${x} ${top}Q${x + w} ${top} ${x + w} ${shoulder}V${y}Z`}
        fill={fill}
        stroke={stroke}
        strokeWidth={width}
        strokeLinejoin="round"
      />
    </g>
  );
}

/** A smartphone, top-left at (x, y). */
export function Phone1({ x, y, w = 70, h = 128, tone = INK, fill = PAPER }: { x: number; y: number; w?: number; h?: number; tone?: string; fill?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill={fill} stroke={tone} strokeWidth={1.75} />
      <rect x={x + 6} y={y + 14} width={w - 12} height={h - 30} rx={2} fill={PAPER} stroke={tone} strokeWidth={1} />
      <line x1={x + w / 2 - 8} y1={y + 7} x2={x + w / 2 + 8} y2={y + 7} stroke={tone} strokeWidth={1.5} strokeLinecap="round" />
      <circle cx={x + w / 2} cy={y + h - 8} r={3} fill="none" stroke={tone} strokeWidth={1.25} />
    </g>
  );
}

/** A smartphone, centred on (x, y). About 26 by 44 at k = 1. */
export function Phone2({
  x,
  y,
  k = 1,
  tone = INK,
  fill = PAPER,
  screen = PAPER2,
}: {
  x: number;
  y: number;
  k?: number;
  tone?: string;
  fill?: string;
  screen?: string;
}) {
  const w = r2(13 * k);
  const h = r2(22 * k);
  return (
    <g>
      <rect x={r2(x - w)} y={r2(y - h)} width={r2(w * 2)} height={r2(h * 2)} rx={r2(4 * k)} fill={fill} stroke={tone} strokeWidth={1.5} />
      <rect x={r2(x - w + 3 * k)} y={r2(y - h + 5 * k)} width={r2(w * 2 - 6 * k)} height={r2(h * 2 - 12 * k)} fill={screen} stroke={tone} strokeWidth={0.75} />
      <circle cx={x} cy={r2(y + h - 3.5 * k)} r={r2(1.2 * k)} fill={tone} />
    </g>
  );
}

/** A phone with a screen; its centre at (x, y), k = 1 is 40 by 72. */
export function Phone3({
  x,
  y,
  k = 1,
  tone = INK,
  fill = PAPER,
  screen = PAPER2,
}: {
  x: number;
  y: number;
  k?: number;
  tone?: string;
  fill?: string;
  screen?: string;
}) {
  const w = r2(40 * k);
  const h = r2(72 * k);
  return (
    <g>
      <rect x={r2(x - w / 2)} y={r2(y - h / 2)} width={w} height={h} rx={r2(6 * k)} fill={fill} stroke={tone} strokeWidth={1.5} />
      <rect x={r2(x - w / 2 + 4 * k)} y={r2(y - h / 2 + 8 * k)} width={r2(w - 8 * k)} height={r2(h - 18 * k)} fill={screen} stroke={tone} strokeWidth={0.8} />
      <circle cx={x} cy={r2(y + h / 2 - 5 * k)} r={r2(1.6 * k)} fill={tone} />
    </g>
  );
}

/** A sheet of paper with ruled lines: a contract, an order, a report. */
export function Sheet({
  x,
  y,
  w = 38,
  h = 48,
  tone = INK,
  fill = PAPER,
  lines = 4,
  seal,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  tone?: string;
  fill?: string;
  lines?: number;
  seal?: string;
}) {
  const l = x - w / 2;
  const t = y - h / 2;
  return (
    <g>
      <rect x={l} y={t} width={w} height={h} fill={fill} stroke={tone} strokeWidth={1.5} />
      {Array.from({ length: lines }, (_, i) => (
        <line key={i} x1={l + 6} y1={t + 10 + i * 8} x2={l + w - 6} y2={t + 10 + i * 8} stroke={INK3} strokeWidth={1} />
      ))}
      {seal ? <circle cx={x + w / 2 - 9} cy={y + h / 2 - 9} r={5} fill={seal} /> : null}
    </g>
  );
}

/** Five-point star path, centred on 0,0, about 34 units across. */
export const STAR = "M0 -16 L5 -5 L17 -4 L8 4 L11 16 L0 10 L-11 16 L-8 4 L-17 -4 L-5 -5 Z";

export function Star1({ x, y, k = 1, fill = SIGNAL }: { x: number; y: number; k?: number; fill?: string }) {
  return <path d={STAR} transform={`translate(${x} ${y}) scale(${k})`} fill={fill} />;
}

/** A five-point star, centred on (x, y): a review. */
export function Star2({
  x,
  y,
  r = 8,
  tone = COUNTER,
  fill,
}: {
  x: number;
  y: number;
  r?: number;
  tone?: string;
  fill?: string;
}) {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = ((-90 + i * 36) * Math.PI) / 180;
    const rr = i % 2 === 0 ? r : r * 0.45;
    return `${r2(x + rr * Math.cos(a))} ${r2(y + rr * Math.sin(a))}`;
  });
  return <path d={`M${pts.join("L")}Z`} fill={fill ?? tone} stroke={tone} strokeWidth={1} strokeLinejoin="round" />;
}

export function Star3({ x, y, r, fill, tone }: { x: number; y: number; r: number; fill: string; tone: string }) {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = ((-90 + i * 36) * Math.PI) / 180;
    const rr = i % 2 ? r * 0.45 : r;
    return `${r2(x + rr * Math.cos(a))} ${r2(y + rr * Math.sin(a))}`;
  });
  return <path d={`M${pts.join("L")}Z`} fill={fill} stroke={tone} strokeWidth={1.25} strokeLinejoin="round" />;
}

/** A shopfront with an awning, centred on x, bottom at y. */
export function Store1({ x, y, tone = INK }: { x: number; y: number; tone?: string }) {
  return (
    <g strokeLinejoin="round">
      <rect x={x - 24} y={y - 30} width={48} height={30} fill={PAPER} stroke={tone} strokeWidth={1.5} />
      <path d={`M${x - 28} ${y - 44} H${x + 28} L${x + 32} ${y - 30} H${x - 32} Z`} fill={PAPER2} stroke={tone} strokeWidth={1.5} />
      <rect x={x - 7} y={y - 18} width={14} height={18} fill={PAPER} stroke={tone} strokeWidth={1.25} />
    </g>
  );
}

/** A shopfront with an awning, centred on x, standing on y. About 62 wide. */
export function Store2({
  x,
  y,
  tone = INK,
  fill = PAPER,
  k = 1,
  dash,
}: {
  x: number;
  y: number;
  tone?: string;
  fill?: string;
  k?: number;
  dash?: string;
}) {
  return (
    <g strokeLinejoin="round" strokeDasharray={dash}>
      <rect x={x - 24 * k} y={y - 30 * k} width={48 * k} height={30 * k} fill={fill} stroke={tone} strokeWidth={1.5} />
      <path
        d={`M${x - 28 * k} ${y - 44 * k} H${x + 28 * k} L${x + 31 * k} ${y - 30 * k} H${x - 31 * k} Z`}
        fill={PAPER2}
        stroke={tone}
        strokeWidth={1.5}
      />
      <rect x={x - 7 * k} y={y - 18 * k} width={14 * k} height={18 * k} fill={PAPER2} stroke={tone} strokeWidth={1.25} />
    </g>
  );
}

/**
 * A price tag centred on (x, y), its point to the left, with a punched hole.
 * `label` is set inside it in the tracked label face.
 */
export function Tag1({
  x,
  y,
  w = 64,
  h = 30,
  tone = INK,
  fill = PAPER,
  label,
  size = 11,
  dash,
  strike = false,
  width = 1.5,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  tone?: string;
  fill?: string;
  label?: string;
  size?: number;
  dash?: string;
  strike?: boolean;
  width?: number;
}) {
  const l = x - w / 2;
  const r = x + w / 2;
  const t = y - h / 2;
  const b = y + h / 2;
  const n = Math.min(12, h / 2);
  return (
    <g>
      <path d={`M${l} ${y} L${l + n} ${t} H${r} V${b} H${l + n} Z`} fill={fill} stroke={tone} strokeWidth={width} strokeLinejoin="round" strokeDasharray={dash} />
      <circle cx={l + n} cy={y} r={2.5} fill={PAPER} stroke={tone} strokeWidth={1} />
      {label ? (
        <Key x={x + n / 2 + 1} y={y + Math.round(size * 0.36)} anchor="middle" fill={tone} size={size}>
          {label}
        </Key>
      ) : null}
      {strike ? <line x1={l + 4} y1={b - 3} x2={r - 3} y2={t + 3} stroke={SIGNAL} strokeWidth={2} /> : null}
    </g>
  );
}

/** A price tag, its point on the left at (x, y) centre-line. */
export function Tag2({
  x,
  y,
  w = 54,
  h = 28,
  tone = INK,
  fill = PAPER,
  children,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  tone?: string;
  fill?: string;
  children?: React.ReactNode;
}) {
  const t = y - h / 2;
  const b = y + h / 2;
  const p = Math.round(h / 2);
  return (
    <g>
      <path
        d={`M${x} ${y}L${x + p} ${t}H${x + w}V${b}H${x + p}Z`}
        fill={fill}
        stroke={tone}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <circle cx={x + p - 2} cy={y} r={2.6} fill={PAPER} stroke={tone} strokeWidth={1.1} />
      {children}
    </g>
  );
}

/**
 * One of the five promotion tools, centred on (x, y). About 44 wide and 32
 * tall at k = 1: megaphone, newspaper, coupon, two people, phone.
 */
export function Tool({
  kind,
  x,
  y,
  k = 1,
  tone = INK,
  fill = PAPER,
}: {
  kind: ToolKind;
  x: number;
  y: number;
  k?: number;
  tone?: string;
  fill?: string;
}) {
  const X = (d: number) => r2(x + d * k);
  const Y = (d: number) => r2(y + d * k);
  const sw = 1.5;
  if (kind === "ad") {
    return (
      <g strokeLinejoin="round" strokeLinecap="round">
        <rect x={X(-22)} y={Y(-5)} width={r2(6 * k)} height={r2(10 * k)} fill={fill} stroke={tone} strokeWidth={sw} />
        <path d={`M${X(-16)} ${Y(-5)}L${X(12)} ${Y(-15)}V${Y(15)}L${X(-16)} ${Y(5)}Z`} fill={fill} stroke={tone} strokeWidth={sw} />
        <path d={`M${X(-10)} ${Y(3)}L${X(-12)} ${Y(12)}H${X(-6)}L${X(-4)} ${Y(1)}`} fill={fill} stroke={tone} strokeWidth={sw} />
        <path
          d={`M${X(17)} ${Y(-7)}Q${X(21)} ${Y(0)} ${X(17)} ${Y(7)}M${X(21)} ${Y(-12)}Q${X(28)} ${Y(0)} ${X(21)} ${Y(12)}`}
          fill="none"
          stroke={tone}
          strokeWidth={1.25}
        />
      </g>
    );
  }
  if (kind === "pr") {
    return (
      <g strokeLinejoin="round">
        <rect x={X(-17)} y={Y(-15)} width={r2(34 * k)} height={r2(30 * k)} fill={fill} stroke={tone} strokeWidth={sw} />
        <rect x={X(-12)} y={Y(-10)} width={r2(24 * k)} height={r2(5 * k)} fill={tone} />
        <path
          d={[-1, 4, 9]
            .map((d) => `M${X(-12)} ${Y(d)}H${X(-2)}M${X(2)} ${Y(d)}H${X(12)}`)
            .join("")}
          stroke={tone}
          strokeWidth={1}
        />
      </g>
    );
  }
  if (kind === "sp") {
    const r = r2(4 * k);
    return (
      <g strokeLinejoin="round">
        <path
          d={`M${X(-22)} ${Y(-12)}H${X(22)}V${Y(-4)}A${r} ${r} 0 0 0 ${X(22)} ${Y(4)}V${Y(12)}H${X(-22)}V${Y(4)}A${r} ${r} 0 0 0 ${X(-22)} ${Y(-4)}Z`}
          fill={fill}
          stroke={tone}
          strokeWidth={sw}
        />
        <line x1={X(-9)} y1={Y(-12)} x2={X(-9)} y2={Y(12)} stroke={tone} strokeWidth={1} strokeDasharray="2 2" />
        <text
          x={X(6)}
          y={Y(6)}
          textAnchor="middle"
          fontFamily="var(--font-heading)"
          fontWeight={600}
          fontSize={r2(17 * k)}
          fill={tone}
        >
          %
        </text>
      </g>
    );
  }
  if (kind === "ps") {
    return (
      <g>
        <Person3 x={X(-10)} y={Y(16)} k={r2(0.75 * k)} stroke={tone} fill={tone === INK ? PAPER : fill} />
        <Person3 x={X(10)} y={Y(16)} k={r2(0.75 * k)} stroke={tone} fill={PAPER} />
        <path
          d={`M${X(-5)} ${Y(-20)}H${X(5)}Q${X(8)} ${Y(-20)} ${X(8)} ${Y(-17)}V${Y(-15)}Q${X(8)} ${Y(-12)} ${X(5)} ${Y(-12)}H${X(1)}L${X(-2)} ${Y(-9)}V${Y(-12)}H${X(-5)}Q${X(-8)} ${Y(-12)} ${X(-8)} ${Y(-15)}V${Y(-17)}Q${X(-8)} ${Y(-20)} ${X(-5)} ${Y(-20)}Z`}
          fill={PAPER}
          stroke={tone}
          strokeWidth={1.1}
          strokeLinejoin="round"
        />
      </g>
    );
  }
  // "dd" — a phone with a message on its screen
  return (
    <g strokeLinejoin="round">
      <rect x={X(-11)} y={Y(-17)} width={r2(22 * k)} height={r2(34 * k)} rx={r2(3 * k)} fill={fill} stroke={tone} strokeWidth={sw} />
      <rect x={X(-8)} y={Y(-13)} width={r2(16 * k)} height={r2(23 * k)} fill={PAPER2} stroke={tone} strokeWidth={0.75} />
      <rect x={X(-6)} y={Y(-10)} width={r2(9 * k)} height={r2(5 * k)} rx={r2(1.5 * k)} fill={tone} />
      <rect x={X(-3)} y={Y(-3)} width={r2(9 * k)} height={r2(5 * k)} rx={r2(1.5 * k)} fill={PAPER} stroke={tone} strokeWidth={0.9} />
      <circle cx={X(0)} cy={Y(13.5)} r={r2(1.3 * k)} fill={tone} />
    </g>
  );
}

export type ToolKind = "ad" | "pr" | "sp" | "ps" | "dd";

/** A delivery truck, centred on x, wheels on y. */
export function Truck1({ x, y, tone = INK }: { x: number; y: number; tone?: string }) {
  return (
    <g strokeLinejoin="round">
      <rect x={x - 32} y={y - 34} width={38} height={26} fill={PAPER} stroke={tone} strokeWidth={1.5} />
      <path d={`M${x + 6} ${y - 8} V${y - 26} H${x + 20} L${x + 30} ${y - 16} V${y - 8} Z`} fill={PAPER} stroke={tone} strokeWidth={1.5} />
      <circle cx={x - 20} cy={y - 5} r={5} fill={PAPER} stroke={tone} strokeWidth={1.5} />
      <circle cx={x + 18} cy={y - 5} r={5} fill={PAPER} stroke={tone} strokeWidth={1.5} />
    </g>
  );
}

/** A delivery truck, centred on x, wheels on y. About 70 wide. */
export function Truck2({ x, y, tone = INK, k = 1 }: { x: number; y: number; tone?: string; k?: number }) {
  return (
    <g strokeLinejoin="round">
      <rect x={x - 32 * k} y={y - 34 * k} width={38 * k} height={26 * k} fill={PAPER} stroke={tone} strokeWidth={1.5} />
      <path
        d={`M${x + 6 * k} ${y - 8 * k} V${y - 26 * k} H${x + 20 * k} L${x + 30 * k} ${y - 16 * k} V${y - 8 * k} Z`}
        fill={PAPER}
        stroke={tone}
        strokeWidth={1.5}
      />
      <circle cx={x - 20 * k} cy={y - 5 * k} r={5 * k} fill={PAPER} stroke={tone} strokeWidth={1.5} />
      <circle cx={x + 18 * k} cy={y - 5 * k} r={5 * k} fill={PAPER} stroke={tone} strokeWidth={1.5} />
    </g>
  );
}

/** A television set with its stand, centred on x, standing on y. */
export function Tv1({ x, y, k = 1, tone = INK }: { x: number; y: number; k?: number; tone?: string }) {
  const X = (d: number) => r2(x + d * k);
  const Y = (d: number) => r2(y + d * k);
  return (
    <g strokeLinejoin="round">
      <path d={`M${X(-12)} ${Y(-56)}L${X(0)} ${Y(-46)}L${X(12)} ${Y(-60)}`} fill="none" stroke={tone} strokeWidth={1.25} />
      <rect x={X(-38)} y={Y(-46)} width={r2(76 * k)} height={r2(40 * k)} rx={r2(3 * k)} fill={PAPER} stroke={tone} strokeWidth={1.5} />
      <rect x={X(-31)} y={Y(-40)} width={r2(62 * k)} height={r2(28 * k)} fill={PAPER2} stroke={tone} strokeWidth={0.9} />
      <path d={`M${X(-14)} ${Y(0)}L${X(-8)} ${Y(-6)}M${X(14)} ${Y(0)}L${X(8)} ${Y(-6)}`} stroke={tone} strokeWidth={1.5} />
    </g>
  );
}

/** A television set, centred on x, standing on y. */
export function Tv2({ x, y, k = 1, tone = INK }: { x: number; y: number; k?: number; tone?: string }) {
  const X = (d: number) => r2(x + d * k);
  const Y = (d: number) => r2(y + d * k);
  return (
    <g strokeLinejoin="round">
      <path d={`M${X(-10)} ${Y(-54)}L${X(0)} ${Y(-44)}L${X(10)} ${Y(-56)}`} fill="none" stroke={tone} strokeWidth={1.25} />
      <rect x={X(-34)} y={Y(-44)} width={r2(68 * k)} height={r2(38 * k)} rx={3} fill={PAPER} stroke={tone} strokeWidth={1.5} />
      <rect x={X(-28)} y={Y(-38)} width={r2(56 * k)} height={r2(26 * k)} fill={PAPER2} stroke={tone} strokeWidth={0.9} />
      <path d={`M${X(-12)} ${Y(0)}L${X(-7)} ${Y(-6)}M${X(12)} ${Y(0)}L${X(7)} ${Y(-6)}`} stroke={tone} strokeWidth={1.5} />
    </g>
  );
}

/** An arrow with a head at both ends — a two-way flow. */
export function TwoWay1({
  x1,
  y1,
  x2,
  y2,
  tone = INK3,
  width = 1.25,
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
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={tone} strokeWidth={width} strokeDasharray={dash} />
      <path d={headAlong1(x2, y2, x2 - x1, y2 - y1)} fill="none" stroke={tone} strokeWidth={width} />
      <path d={headAlong1(x1, y1, x1 - x2, y1 - y2)} fill="none" stroke={tone} strokeWidth={width} />
    </g>
  );
}

/** An arrow with a head at both ends — a two-way exchange. */
export function TwoWay2({
  x1,
  y1,
  x2,
  y2,
  tone = INK,
  width = 1.5,
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
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={tone} strokeWidth={width} strokeDasharray={dash} />
      <path d={headAlong1(x2, y2, x2 - x1, y2 - y1)} fill="none" stroke={tone} strokeWidth={width} />
      <path d={headAlong1(x1, y1, x1 - x2, y1 - y2)} fill="none" stroke={tone} strokeWidth={width} />
    </g>
  );
}

/** An arrow with a head at both ends: a two-way exchange. */
export function TwoWay3({
  x1,
  y1,
  x2,
  y2,
  tone = INK,
  width = 1.5,
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
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={tone} strokeWidth={width} strokeDasharray={dash} />
      <path d={headAlong2(x2, y2, x2 - x1, y2 - y1)} fill="none" stroke={tone} strokeWidth={width} />
      <path d={headAlong2(x1, y1, x1 - x2, y1 - y2)} fill="none" stroke={tone} strokeWidth={width} />
    </g>
  );
}

/** A warehouse with a shutter, centred on x, standing on y. About 64 wide. */
export function Warehouse({
  x,
  y,
  tone = INK,
  fill = PAPER,
  k = 1,
  dash,
}: {
  x: number;
  y: number;
  tone?: string;
  fill?: string;
  k?: number;
  dash?: string;
}) {
  return (
    <g strokeLinejoin="round" strokeDasharray={dash}>
      <path
        d={`M${x - 32 * k} ${y} V${y - 28 * k} L${x} ${y - 46 * k} L${x + 32 * k} ${y - 28 * k} V${y} Z`}
        fill={fill}
        stroke={tone}
        strokeWidth={1.5}
      />
      <rect x={x - 15 * k} y={y - 22 * k} width={30 * k} height={22 * k} fill={PAPER2} stroke={tone} strokeWidth={1.25} />
      <path
        d={`M${x - 15 * k} ${y - 16 * k} H${x + 15 * k} M${x - 15 * k} ${y - 10 * k} H${x + 15 * k}`}
        stroke={tone}
        strokeWidth={1}
      />
    </g>
  );
}
