/* ==========================================================================
   Consumer Behavior — the flat Broadsheet kit (legacy)
   --------------------------------------------------------------------------
   The helpers the Week 2–4 plates are still drawn with (Week 1 is converted): CSS-variable
   palette, Frame, Key/Note/Display text, the capsule Person, the five
   SenseGlyphs and the teal BrandMark. New and converted plates use
   ./sketch and ./sketch-cast instead (see ../CLAUDE.md); this file goes
   once Weeks 2–4 are in Editorial Sketch.

   Weeks import from here, never from another week.
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
export const SIGNAL_TINT = "rgba(192, 74, 38, 0.10)";
export const COUNTER_TINT = "rgba(30, 78, 82, 0.10)";


const LABEL = "var(--font-label)";
const BODY = "var(--font-body)";
const SERIF = "var(--font-heading)";

const r2 = (n: number) => Math.round(n * 100) / 100;

type Anchor = "start" | "middle" | "end";

export function Key({
  x,
  y,
  children,
  anchor = "start",
  fill = INK3,
  size = 10.5,
  weight = 600,
  transform,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  anchor?: Anchor;
  fill?: string;
  size?: number;
  weight?: number;
  transform?: string;
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
      transform={transform}
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
      fontWeight={500}
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
      className="block h-auto w-full"
      role="img"
      aria-label={label}
    >
      <title>{label}</title>
      {children}
    </svg>
  );
}

/**
 * One person. (x, y) is the point between the feet; `s` scales the figure
 * (s = 1 is 64 units tall). `head` enlarges the head for a child or a baby.
 */
export function Person({
  x,
  y,
  s = 1,
  fill = INK,
  head = 1,
  opacity,
}: {
  x: number;
  y: number;
  s?: number;
  fill?: string;
  head?: number;
  opacity?: number;
}) {
  const w = 13 * s;
  const shoulder = y - 33 * s;
  const hr = 8 * s * head;
  const hy = y - 46 * s - 3 * s - hr;
  return (
    <g fill={fill} opacity={opacity}>
      <path
        d={`M${r2(x - w)} ${r2(y)}V${r2(shoulder)}A${r2(w)} ${r2(w)} 0 0 1 ${r2(x + w)} ${r2(shoulder)}V${r2(y)}Z`}
      />
      <circle cx={r2(x)} cy={r2(hy)} r={r2(hr)} />
    </g>
  );
}

export type Sense = "sight" | "sound" | "smell" | "touch" | "taste";
export const SENSES: Sense[] = ["sight", "sound", "smell", "touch", "taste"];

/** Musical notes: two beamed quavers. (x, y) is the centre. */
export function Notes({ x, y, s = 1, fill = INK }: { x: number; y: number; s?: number; fill?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={fill}>
      <ellipse cx={-10} cy={13} rx={7} ry={5} transform="rotate(-20 -10 13)" />
      <ellipse cx={12} cy={9} rx={7} ry={5} transform="rotate(-20 12 9)" />
      <rect x={-5} y={-16} width={2.6} height={29} />
      <rect x={17} y={-20} width={2.6} height={29} />
      <path d="M-5 -16L19.6 -20V-13L-5 -9Z" />
    </g>
  );
}

/** One glyph per sense, centred on (x, y), about 48 units across at s = 1. */
export function SenseGlyph({
  kind,
  x,
  y,
  s = 1,
  tone = INK,
}: {
  kind: Sense;
  x: number;
  y: number;
  s?: number;
  tone?: string;
}) {
  const t = `translate(${x} ${y}) scale(${s})`;
  if (kind === "sight")
    return (
      <g transform={t}>
        <path d="M-23 0Q0 -24 23 0Q0 24 -23 0Z" fill={PAPER} stroke={tone} strokeWidth={2.4} strokeLinejoin="round" />
        <circle r={8.5} fill={tone} />
        <circle r={3.4} fill={PAPER} />
      </g>
    );
  if (kind === "sound") return <Notes x={x} y={y} s={s} fill={tone} />;
  if (kind === "smell")
    return (
      <g transform={t}>
        <rect x={-18} y={-2} width={24} height={24} rx={5} fill={PAPER} stroke={tone} strokeWidth={2.4} />
        <rect x={-10} y={-9} width={8} height={7} fill={tone} />
        <rect x={-13} y={-16} width={14} height={7} rx={2} fill={tone} />
        {[0, 8, 16].map((dx) => (
          <path
            key={dx}
            d={`M${6 + dx * 0.55} ${-6 - dx * 0.2}q5 -5 0 -10t0 -10`}
            fill="none"
            stroke={tone}
            strokeWidth={2}
            strokeLinecap="round"
            transform={`translate(${dx * 0.5} 0)`}
          />
        ))}
      </g>
    );
  if (kind === "touch")
    return (
      <g transform={t} fill={tone}>
        <rect x={-12} y={-1} width={24} height={23} rx={7} />
        {[
          { x: -12, h: 20 },
          { x: -5.6, h: 24 },
          { x: 0.8, h: 23 },
          { x: 7.2, h: 18 },
        ].map((f) => (
          <rect key={f.x} x={f.x} y={3 - f.h} width={5} height={f.h} rx={2.5} />
        ))}
        <rect x={-22} y={4} width={5.4} height={17} rx={2.7} transform="rotate(-38 -19 13)" />
      </g>
    );
  // taste: lips with the tongue out
  return (
    <g transform={t}>
      <path d="M-24 -4Q-14 -18 -4 -13Q0 -11 4 -13Q14 -18 24 -4Q0 -2 -24 -4Z" fill={tone} />
      <path d="M-24 -4Q0 0 24 -4Q14 12 0 12Q-14 12 -24 -4Z" fill={tone} />
      <path d="M-10 -1H10V14Q10 25 0 25Q-10 25 -10 14Z" fill={PAPER} stroke={tone} strokeWidth={2.4} strokeLinejoin="round" />
      <line x1={0} y1={2} x2={0} y2={14} stroke={tone} strokeWidth={1.8} strokeLinecap="round" />
    </g>
  );
}

/** The brand: a teal badge with a wave. Centred on (x, y), 36 units at s = 1. */
export function BrandMark({
  x,
  y,
  s = 1,
  fill = COUNTER,
  opacity,
}: {
  x: number;
  y: number;
  s?: number;
  fill?: string;
  opacity?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={opacity}>
      <rect x={-18} y={-18} width={36} height={36} rx={9} fill={fill} />
      <path d="M-10 5Q-5 -10 0 0T10 -5" fill="none" stroke={PAPER} strokeWidth={3.8} strokeLinecap="round" />
    </g>
  );
}
