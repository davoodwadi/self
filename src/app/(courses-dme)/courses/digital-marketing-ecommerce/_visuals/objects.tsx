/* ==========================================================================
   Shared objects: what the weeks draw, built on ./kit. See "Shared pieces"
   in the root CLAUDE.md and the course CLAUDE.md for the catalogue style.
   ========================================================================== */

import React from "react";
import { CAT, CatKey, Numeral, Price, Tile, ht, r2 } from "./kit";

/** Cursor outline at unit scale, tip at (0, 0): about 10 wide and 15 tall. */
const CURSOR = "M0 0V13L3.5 9.8L6 15L8 14L5.6 9H10Z";

/**
 * A click: a solid ink cursor, tip at (x, y). `tone="amber"` marks the key
 * idea (amber with an ink outline); `tone="purple"` is the contrast case.
 */
export function Cursor({
  x,
  y,
  scale = 1.25,
  tone = "ink",
}: {
  x: number;
  y: number;
  scale?: number;
  tone?: "ink" | "amber" | "purple";
}) {
  const fill = { ink: CAT.ink, amber: CAT.amber, purple: CAT.purple }[tone];
  const stroke = tone === "purple" ? CAT.purple : CAT.ink;
  return (
    <path
      transform={`translate(${r2(x)} ${r2(y)}) scale(${scale})`}
      d={CURSOR}
      fill={fill}
      stroke={stroke}
      strokeWidth={tone === "amber" ? 0.75 : 0.55}
      strokeLinejoin="round"
    />
  );
}

/** A rating star centred on (cx, cy), filled in ink or left open. */
export function Star({ cx, cy, r = 5.5, on = true }: { cx: number; cy: number; r?: number; on?: boolean }) {
  let d = "";
  for (let j = 0; j < 10; j++) {
    const a = -Math.PI / 2 + (j * Math.PI) / 5;
    const q = j % 2 ? r * 0.45 : r;
    d += `${j ? "L" : "M"}${r2(cx + q * Math.cos(a))} ${r2(cy + q * Math.sin(a))}`;
  }
  return <path d={`${d}Z`} fill={on ? CAT.ink : "none"} stroke={CAT.ink} strokeWidth={0.9} strokeLinejoin="round" />;
}

/**
 * The engraved mug, centred on (cx, cy): halftone body, dense shaded side,
 * white rim and a handle with a white inner line. About 46 wide and 45 tall
 * at the default scale. Needs <HalftoneDefs id> in the same plate.
 */
export function Mug({ id, cx, cy, scale = 1.5 }: { id: string; cx: number; cy: number; scale?: number }) {
  const handle = "M9 -8C21 -8 21 7 9 7";
  return (
    <g transform={`translate(${r2(cx)} ${r2(cy)}) scale(${scale})`}>
      <path d={handle} fill="none" stroke={CAT.ink} strokeWidth={3.2} />
      <path d={handle} fill="none" stroke={CAT.tile} strokeWidth={1.4} />
      <path d="M-15 -15H10V8Q10 15 3 15H-8Q-15 15 -15 8Z" fill={ht(id, "light")} stroke={CAT.ink} strokeWidth={1.1} />
      <path d="M2 -15H10V8Q10 15 3 15Z" fill={ht(id, "dense")} />
      <ellipse cx={-2.5} cy={-15} rx={12.5} ry={2.4} fill={CAT.tile} stroke={CAT.ink} strokeWidth={1} />
    </g>
  );
}

/**
 * A complete listing: a 104 × 104 tile at (x, y) with its position numeral,
 * the engraved mug, two name lines and the price. `sponsored` prints the
 * SPONSORED key in the top-right corner.
 */
export function Listing({
  id,
  x,
  y,
  n,
  price,
  sponsored = false,
}: {
  id: string;
  x: number;
  y: number;
  n: number;
  price: string;
  sponsored?: boolean;
}) {
  const w = 104;
  return (
    <g>
      <Tile x={x} y={y} w={w} h={w} />
      <Mug id={id} cx={x + w / 2} cy={y + 46} />
      <Numeral x={x + 11} y={y + 20}>
        {n}
      </Numeral>
      {sponsored ? (
        <CatKey x={x + w - 10} y={y + 17} size={6.5} anchor="end">
          SPONSORED
        </CatKey>
      ) : null}
      <line x1={x + 14} y1={y + 78} x2={x + 72} y2={y + 78} stroke={CAT.ink} strokeWidth={0.5} />
      <line x1={x + 14} y1={y + 82} x2={x + 58} y2={y + 82} stroke={CAT.ink} strokeWidth={0.5} />
      <Price x={x + 14} y={y + 96}>
        {price}
      </Price>
    </g>
  );
}
