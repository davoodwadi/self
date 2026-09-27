/* ==========================================================================
   Shared objects: the people, products, places and marks the weeks draw,
   built on ./kit. See "Shared pieces" in the root CLAUDE.md.
   ========================================================================== */

import React from "react";
import { Key, INK, INK3, RULE2, PAPER, r2 } from "./kit";

/**
 * Person1: the course's one glyph for a human (respondent, member, manager).
 * Stands on (x, y); k scales it, and 1 is 34 units tall. Repeated to show
 * counts, so it stays a plain outline that takes a fill for a group.
 */
export function Person1({
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
  const w = r2(10 * k);
  const top = r2(y - 21 * k);
  const shoulder = r2(y - 12 * k);
  return (
    <g>
      <circle cx={x} cy={r2(y - 28 * k)} r={r2(6 * k)} fill={fill} stroke={stroke} strokeWidth={width} />
      <path
        d={`M${r2(x - w)} ${y}V${shoulder}Q${r2(x - w)} ${top} ${x} ${top}Q${r2(x + w)} ${top} ${r2(x + w)} ${shoulder}V${y}Z`}
        fill={fill}
        stroke={stroke}
        strokeWidth={width}
        strokeLinejoin="round"
      />
    </g>
  );
}

/**
 * AiMark1: the course's symbol for an AI tool, a four-point spark centred on
 * (cx, cy). s is its full height. One symbol for AI on every plate.
 */
export function AiMark1({
  cx,
  cy,
  s = 24,
  fill = INK,
}: {
  cx: number;
  cy: number;
  s?: number;
  fill?: string;
}) {
  const h = s / 2;
  const n = s * 0.13;
  const d = `M${r2(cx)} ${r2(cy - h)}Q${r2(cx + n)} ${r2(cy - n)} ${r2(cx + h)} ${r2(cy)}Q${r2(cx + n)} ${r2(cy + n)} ${r2(cx)} ${r2(cy + h)}Q${r2(cx - n)} ${r2(cy + n)} ${r2(cx - h)} ${r2(cy)}Q${r2(cx - n)} ${r2(cy - n)} ${r2(cx)} ${r2(cy - h)}Z`;
  return <path d={d} fill={fill} />;
}

/**
 * Cup1: a takeaway coffee cup standing on (x, y); k scales it, and 1 is 22
 * units tall. Repeated in rows to count coffee sold.
 */
export function Cup1({
  x,
  y,
  k = 1,
  stroke = INK,
  fill = PAPER,
  width = 1.25,
}: {
  x: number;
  y: number;
  k?: number;
  stroke?: string;
  fill?: string;
  width?: number;
}) {
  const s = (n: number) => r2(n * k);
  return (
    <g>
      <path
        d={`M${r2(x - s(6))} ${y}L${r2(x - s(8))} ${r2(y - s(17))}H${r2(x + s(8))}L${r2(x + s(6))} ${y}Z`}
        fill={fill}
        stroke={stroke}
        strokeWidth={width}
        strokeLinejoin="round"
      />
      <rect x={r2(x - s(9.5))} y={r2(y - s(21.5))} width={s(19)} height={s(4.5)} rx={s(1.5)} fill={stroke} />
      <line x1={r2(x - s(7.3))} y1={r2(y - s(11))} x2={r2(x + s(7.3))} y2={r2(y - s(11))} stroke={stroke} strokeWidth={width} />
    </g>
  );
}

/**
 * Store1: a shop front (awning, walls, door) centred on (cx, cy); k scales
 * it, and 1 is 18 units wide and 16 tall. Drawn at two sizes to show small
 * and large stores, so the size of the glyph carries the size of the store.
 */
export function Store1({
  cx,
  cy,
  k = 1,
  stroke = INK,
  fill = PAPER,
  width = 1.25,
}: {
  cx: number;
  cy: number;
  k?: number;
  stroke?: string;
  fill?: string;
  width?: number;
}) {
  const s = (n: number) => r2(n * k);
  const top = r2(cy - s(8));
  const eave = r2(cy - s(3));
  const base = r2(cy + s(8));
  return (
    <g>
      <rect x={r2(cx - s(7.5))} y={eave} width={s(15)} height={r2(base - eave)} fill={fill} stroke={stroke} strokeWidth={width} strokeLinejoin="round" />
      <path
        d={`M${r2(cx - s(9))} ${eave}L${r2(cx - s(7))} ${top}H${r2(cx + s(7))}L${r2(cx + s(9))} ${eave}Z`}
        fill={stroke}
        stroke={stroke}
        strokeWidth={width}
        strokeLinejoin="round"
      />
      <rect x={r2(cx - s(2.2))} y={r2(cy + s(1.5))} width={s(4.4)} height={r2(base - cy - s(1.5))} fill={stroke} />
    </g>
  );
}

/**
 * RatingRow1: a row of rating boxes from 1 to n, the chosen one filled; the item's
 * wording above it is drawn as a hairline bar, since the procedure, not the
 * words, is the point.
 */
export function RatingRow1({
  x,
  y,
  n = 7,
  pick,
  box = 24,
  gap = 4,
  tone = INK,
  stem,
  numbers = true,
}: {
  x: number;
  y: number;
  n?: number;
  /** 1-based chosen category, or none. */
  pick?: number;
  box?: number;
  gap?: number;
  tone?: string;
  /** Length of the hairline bar standing for the item's wording. */
  stem?: number;
  numbers?: boolean;
}) {
  return (
    <g>
      {stem ? (
        <line x1={x + 2} y1={y - 12} x2={x + stem} y2={y - 12} stroke={RULE2} strokeWidth={4} strokeLinecap="round" />
      ) : null}
      {Array.from({ length: n }, (_, i) => {
        const bx = x + i * (box + gap);
        const on = pick === i + 1;
        return (
          <g key={i}>
            <rect x={bx} y={y} width={box} height={box} fill={on ? tone : PAPER} stroke={on ? tone : INK3} strokeWidth={1.25} />
            {numbers ? (
              <Key x={r2(bx + box / 2)} y={r2(y + box / 2 + 4)} anchor="middle" fill={on ? PAPER : INK3} size={10.5} weight={on ? 700 : 500}>
                {i + 1}
              </Key>
            ) : null}
          </g>
        );
      })}
    </g>
  );
}

/** Tick1: a tick inside a box or circle centred on (cx, cy). */
export function Tick1({ cx, cy, s = 5, stroke = PAPER }: { cx: number; cy: number; s?: number; stroke?: string }) {
  return (
    <path
      d={`M${r2(cx - s)} ${r2(cy)}L${r2(cx - s * 0.3)} ${r2(cy + s * 0.7)}L${r2(cx + s)} ${r2(cy - s * 0.8)}`}
      fill="none"
      stroke={stroke}
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}
