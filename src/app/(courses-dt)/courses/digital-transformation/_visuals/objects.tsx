/* ==========================================================================
   Digital Transformation — objects (Flat Silhouette)
   --------------------------------------------------------------------------
   The course's fixed cast, built on ./kit:
     · Shop     — the business
     · Doc      — information (a paper page)
     · Person   — every human (bust in profile)
     · Coins    — revenue (SIGNAL: what is gained)
   ========================================================================== */

import React from "react";
import { CREAM, INK, SKIN, SIGNAL, r2, Solid, Plate } from "./kit";

/* -- cast: Shop (160 × 150, origin top-left) ------------------------------ */

const SHOP_SIGN = "M 0 0 H 160 V 26 H 0 Z";
const SHOP_AWNING = (() => {
  // straight top edge, six scallops along the bottom
  const n = 6;
  const left = -8;
  const width = 176;
  const step = width / n;
  let d = `M ${left} 34 H ${left + width} V 50`;
  for (let i = n - 1; i >= 0; i--) {
    const x0 = r2(left + step * i);
    d += ` A ${r2(step / 2)} ${r2(step / 2)} 0 0 1 ${x0} 50`;
  }
  return d + " Z";
})();
const SHOP_BODY = "M 6 70 H 154 V 150 H 136 V 90 H 102 V 150 H 6 Z";
const SHOP_HOLES = "M 22 88 H 84 V 124 H 22 Z";
const SHOP_OUTER = `${SHOP_SIGN} ${SHOP_AWNING} ${SHOP_BODY}`;

export function Shop({
  x,
  y,
  k = 1,
  tone,
}: {
  x: number;
  y: number;
  k?: number;
  tone?: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`}>
      <Solid outer={SHOP_OUTER} holes={SHOP_HOLES} tone={tone} />
    </g>
  );
}

/* -- cast: Doc (90 × 116, origin top-left) -------------------------------- */

const DOC_SHEET = "M 0 0 H 56 V 34 H 90 V 116 H 0 Z";
const DOC_FOLD = "M 62 0 L 90 28 H 62 Z";
const DOC_LINES =
  "M 14 48 H 76 V 55 H 14 Z M 14 64 H 76 V 71 H 14 Z M 14 80 H 76 V 87 H 14 Z M 14 96 H 52 V 103 H 14 Z";

export function Doc({
  x,
  y,
  k = 1,
}: {
  x: number;
  y: number;
  k?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`}>
      <Solid outer={`${DOC_SHEET} ${DOC_FOLD}`} holes={DOC_LINES} />
    </g>
  );
}

/* -- cast: Coins (stack of n, bottom-centre at x, y) ---------------------- */

export function Coins({ x, y, n = 4 }: { x: number; y: number; n?: number }) {
  const w = 46;
  const t = 11;
  const gap = 3;
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <rect
          key={i}
          x={x - w / 2}
          y={y - (i + 1) * (t + gap) + gap}
          width={w}
          height={t}
          rx={5.5}
          fill={SIGNAL}
        />
      ))}
      <ellipse cx={x} cy={y - n * (t + gap) - 5} rx={w / 2} ry={8} fill={SIGNAL} />
    </g>
  );
}

/* -- cast: Person (bust in profile, facing right; 100 tall, bottom-centre) -- */

export type Hair = "bob" | "crop" | "bun";

const HAIR: Record<Hair, string> = {
  bob: "M -25 52 C -30 30 -22 8 -2 5 C 12 3 23 11 24 23 C 16 20 9 22 5 27 C 1 35 -1 45 -3 54 Z",
  crop: "M -25 40 C -27 18 -13 3 3 3 C 16 3 24 11 25 22 C 15 18 5 19 -3 23 C -8 27 -10 33 -10 42 C -16 46 -22 45 -25 40 Z",
  bun: "M -25 40 C -27 18 -13 3 3 3 C 16 3 24 11 25 22 C 15 18 5 19 -3 23 C -8 27 -10 33 -10 42 C -16 46 -22 45 -25 40 Z M -30 14 A 11 11 0 1 1 -29.9 14.1 Z",
};

export function Person({
  x,
  y,
  k = 1,
  hair = "bob",
  flip,
  gap,
}: {
  x: number;
  y: number;
  k?: number;
  hair?: Hair;
  flip?: boolean;
  /** a thin cream gap around the body, for a figure standing in front of another */
  gap?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -k : k} ${k})`}>
      <path
        d="M -8 60 V 46 C -20 42 -24 32 -22 24 C -20 12 -10 7 2 7 C 14 7 22 15 22 25 L 22 29 L 28 37 L 22 39 L 22 43 C 22 47 18 49 14 49 L 7 49 V 60 Z"
        fill={SKIN}
        stroke={INK}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <path d="M 10 27.5 Q 14 24.5 18 27.5 Q 14 30 10 27.5 Z" fill={INK} />
      <path d={HAIR[hair]} fill={INK} />
      <path
        d="M -40 100 C -40 76 -28 62 -8 60 H 8 C 28 62 40 76 40 100 Z"
        fill={INK}
        stroke={gap ? CREAM : undefined}
        strokeWidth={gap ? r2(3 / k) : undefined}
      />
    </g>
  );
}

/* ==========================================================================
   Class discussion — two people face each other
   ========================================================================== */

export function Conversation() {
  return (
    <Plate
      h={246}
      title="Two people in profile face each other, each with a speech bubble, in conversation"
    >
      <ellipse cx={164} cy={36} rx={32} ry={21} fill={INK} />
      <path d="M 160 54 L 172 80 L 176 52 Z" fill={INK} />
      <ellipse cx={236} cy={56} rx={32} ry={21} fill={INK} />
      <path d="M 224 72 L 222 96 L 238 75 Z" fill={INK} />
      <Person x={128} y={86} k={1.4} hair="bob" />
      <Person x={272} y={86} k={1.4} hair="crop" flip />
    </Plate>
  );
}


