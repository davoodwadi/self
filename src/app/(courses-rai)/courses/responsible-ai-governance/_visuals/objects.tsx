/* ==========================================================================
   Shared objects: Isometric Tabletop Diorama pieces built on ./kit.
   Every scene sits on a 3D bevelled mineral board (`IsoBase`) with 3D
   sculpted figures (`IsoPerson`), 3D blocks (`IsoBlock`), houses (`IsoHouse`),
   coin stacks (`IsoCoinStack`), and translucent glass cubes (`GlassCube`)
   for AI systems and algorithms.
   ========================================================================== */

import React from "react";
import { INK, PAPER, PAL, r2 } from "./kit";

/** A 3D axonometric tabletop base slab that every diorama scene sits on. */
export function IsoBase({ w = 400 }: { w?: 400 | 800 }) {
  if (w === 800) {
    return (
      <g stroke={PAL.ink} strokeWidth="1.4" strokeLinejoin="round">
        <polygon points="40,156 120,104 760,104 680,156" fill={PAL.slabTop} />
        <polygon points="40,156 680,156 680,170 40,170" fill={PAL.slabLeft} />
        <polygon points="680,156 760,104 760,118 680,170" fill={PAL.slabRight} />
      </g>
    );
  }
  return (
    <g stroke={PAL.ink} strokeWidth="1.4" strokeLinejoin="round">
      <polygon points="24,162 84,112 376,112 316,162" fill={PAL.slabTop} />
      <polygon points="24,162 316,162 316,176 24,176" fill={PAL.slabLeft} />
      <polygon points="316,162 376,112 376,126 316,176" fill={PAL.slabRight} />
    </g>
  );
}

/** A 3D isometric box (building, shield wall, desk, pedestal) with front, right, and top faces. */
export function IsoBlock({
  x,
  y,
  w,
  d,
  h,
  topFill = PAL.paper,
  leftFill = PAL.slabLeft,
  rightFill = PAL.slabRight,
  stroke = PAL.ink,
}: {
  x: number;
  y: number;
  w: number;
  d: number;
  h: number;
  topFill?: string;
  leftFill?: string;
  rightFill?: string;
  stroke?: string;
}) {
  const dx = r2(d * 0.72);
  const dy = r2(d * 0.52);
  return (
    <g stroke={stroke} strokeWidth="1.4" strokeLinejoin="round">
      <polygon points={`${x},${y} ${x + w},${y} ${x + w},${y - h} ${x},${y - h}`} fill={leftFill} />
      <polygon
        points={`${x + w},${y} ${x + w + dx},${y - dy} ${x + w + dx},${y - dy - h} ${x + w},${y - h}`}
        fill={rightFill}
      />
      <polygon
        points={`${x},${y - h} ${x + w},${y - h} ${x + w + dx},${y - dy - h} ${x + dx},${y - dy - h}`}
        fill={topFill}
      />
    </g>
  );
}

/**
 * GlassCube: the course's signature container for an AI model or algorithm.
 * Draws dashed back edges, renders `children` inside the cube, then overlays
 * the translucent front/side/top glass planes, and finally renders `outside`
 * (e.g. an exit port + mechanical arm) on top so no cube edge crosses it.
 */
export function GlassCube({
  x,
  y,
  w = 60,
  d = 44,
  h = 60,
  children,
  outside,
}: {
  x: number;
  y: number;
  w?: number;
  d?: number;
  h?: number;
  children?: React.ReactNode;
  outside?: React.ReactNode;
}) {
  const dx = r2(d * 0.72);
  const dy = r2(d * 0.52);
  return (
    <g stroke={PAL.ink} strokeWidth="1.4" strokeLinejoin="round">
      {/* Dashed back edges visible through the glass */}
      <line x1={x} y1={y} x2={x + dx} y2={y - dy} stroke={PAL.ink3} strokeDasharray="3 3" />
      <line x1={x + dx} y1={y - dy} x2={x + w + dx} y2={y - dy} stroke={PAL.ink3} strokeDasharray="3 3" />
      <line x1={x + dx} y1={y - dy} x2={x + dx} y2={y - dy - h} stroke={PAL.ink3} strokeDasharray="3 3" />

      {/* Internal mechanism */}
      {children}

      {/* Translucent glass faces */}
      <polygon points={`${x},${y} ${x + w},${y} ${x + w},${y - h} ${x},${y - h}`} fill={PAL.paper} fillOpacity="0.45" />
      <polygon
        points={`${x + w},${y} ${x + w + dx},${y - dy} ${x + w + dx},${y - dy - h} ${x + w},${y - h}`}
        fill={PAL.slabLeft}
        fillOpacity="0.45"
      />
      <polygon
        points={`${x},${y - h} ${x + w},${y - h} ${x + w + dx},${y - dy - h} ${x + dx},${y - dy - h}`}
        fill={PAL.paper}
        fillOpacity="0.65"
      />

      {/* External port / arm emerging from the cube */}
      {outside}
    </g>
  );
}

/** A sculpted 3D tabletop figure standing on the diorama board at (x, y). */
export function IsoPerson({
  x,
  y,
  scale = 1,
  coat = PAL.counter,
  coatShade = PAL.counterMid,
  skin = PAL.skin1,
  flip = false,
  reach = false,
  behindBack = false,
}: {
  x: number;
  y: number;
  scale?: number;
  coat?: string;
  coatShade?: string;
  skin?: string;
  flip?: boolean;
  reach?: boolean;
  behindBack?: boolean;
}) {
  const sx = flip ? -scale : scale;
  return (
    <g
      transform={`translate(${r2(x)} ${r2(y)}) scale(${r2(sx)} ${r2(scale)})`}
      stroke={PAL.ink}
      strokeWidth={r2(1.35 / scale)}
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <ellipse cx="2" cy="0" rx="13" ry="4.5" fill={PAL.slabRight} stroke="none" opacity="0.7" />
      <path d="M -8 -28 V -3 H -2 V -28 Z" fill={PAL.ink2} />
      <path d="M 2 -28 V -3 H 8 V -28 Z" fill={PAL.ink} />
      <path d="M -9 -4 H -1 L 1 0 H -9 Z" fill={PAL.ink} />
      <path d="M 1 -4 H 9 L 12 0 H 1 Z" fill={PAL.ink} />

      {behindBack && (
        <g>
          <path d="M -8 -56 L -22 -48 L -28 -52" fill="none" stroke={coatShade} strokeWidth="5.5" />
          <circle cx="-32" cy="-54" r="4.5" fill="none" stroke={PAL.signal} strokeWidth="2" />
          <line x1="-28" y1="-51" x2="-18" y2="-43" stroke={PAL.signal} strokeWidth="2.2" />
        </g>
      )}

      <path d="M -12 -26 L -10 -66 H 6 L 8 -26 Z" fill={coat} />
      <path d="M 6 -66 L 12 -62 L 13 -24 L 8 -26 Z" fill={coatShade} />
      <polygon points="-3,-66 2,-54 6,-66" fill={PAL.paper} />

      {reach ? (
        <g>
          <path d="M 4 -60 L 18 -50 L 30 -52" fill="none" stroke={PAL.ink} strokeWidth="6" />
          <path d="M 4 -60 L 18 -50 L 30 -52" fill="none" stroke={coat} strokeWidth="4" />
          <circle cx="32" cy="-52" r="3.2" fill={skin} />
        </g>
      ) : (
        <g>
          <path d="M -7 -60 L -11 -42 L -6 -34" fill="none" stroke={PAL.ink} strokeWidth="5.5" />
          <path d="M -7 -60 L -11 -42 L -6 -34" fill="none" stroke={coat} strokeWidth="3.6" />
          <circle cx="-5.5" cy="-33" r="2.8" fill={skin} />
        </g>
      )}

      <rect x="-2.5" y="-72" width="6" height="7" fill={skin} />
      <path d="M -7 -84 C -7 -91, 8 -91, 9 -83 L 12 -79 L 9 -77 C 9 -71, -7 -71, -7 -78 Z" fill={skin} />
      <circle cx="4.5" cy="-82" r="1.1" fill={PAL.ink} stroke="none" />
      <path d="M -8 -77 C -10 -86, -5 -93, 4 -92 C 9 -92, 10 -87, 8 -85 C 3 -86, -2 -85, -5 -80 Z" fill={PAL.ink} />
    </g>
  );
}

/** A 3D cylindrical stack of coins on the diorama board. */
export function IsoCoinStack({
  x,
  y,
  n = 4,
  signal = false,
}: {
  x: number;
  y: number;
  n?: number;
  signal?: boolean;
}) {
  const fillSide = signal ? PAL.signal : PAL.counter;
  const fillTop = signal ? PAL.signalLight : PAL.counterLight;
  return (
    <g stroke={PAL.ink} strokeWidth="1.2">
      {Array.from({ length: n }, (_, i) => {
        const cy = y - i * 6;
        return (
          <g key={i}>
            <path d={`M ${x - 11} ${cy - 6} V ${cy} A 11 4.2 0 0 0 ${x + 11} ${cy} V ${cy - 6} Z`} fill={fillSide} />
            <ellipse cx={x} cy={cy - 6} rx="11" ry="4.2" fill={fillTop} />
          </g>
        );
      })}
    </g>
  );
}

/** A 3D isometric house with pitched roof and optional floating rate placard. */
export function IsoHouse({
  x,
  y,
  rate,
  penalized = false,
}: {
  x: number;
  y: number;
  rate?: string;
  penalized?: boolean;
}) {
  const roofFront = penalized ? PAL.signal : PAL.counter;
  const roofSide = penalized ? PAL.signalMid : PAL.counterMid;
  return (
    <g stroke={PAL.ink} strokeWidth="1.4" strokeLinejoin="round">
      <polygon points={`${x},${y} ${x + 56},${y} ${x + 56},${y - 44} ${x},${y - 44}`} fill={PAL.paper} />
      <polygon
        points={`${x + 56},${y} ${r2(x + 84.8)},${r2(y - 20.8)} ${r2(x + 84.8)},${r2(y - 64.8)} ${x + 56},${y - 44}`}
        fill={PAL.slabLeft}
      />
      <rect x={x + 18} y={y - 28} width="16" height="28" fill={roofFront} />
      <polygon points={`${x - 4},${y - 44} ${x + 28},${y - 72} ${x + 60},${y - 44}`} fill={roofFront} />
      <polygon
        points={`${x + 28},${y - 72} ${r2(x + 56.8)},${r2(y - 92.8)} ${r2(x + 88.8)},${r2(y - 64.8)} ${x + 60},${y - 44}`}
        fill={roofSide}
      />
      {rate && (
        <>
          <line x1={x + 42} y1={y - 78} x2={x + 42} y2={y - 96} stroke={PAL.ink} strokeWidth="1.4" />
          <rect
            x={x + 8}
            y={y - 122}
            width="68"
            height="26"
            rx="3"
            fill={penalized ? PAL.signal : PAL.paper}
            stroke={penalized ? PAL.signal : PAL.ink}
            strokeWidth="1.6"
          />
          <text
            x={x + 42}
            y={y - 104}
            textAnchor="middle"
            fontSize="14.5"
            fontWeight="700"
            fill={penalized ? PAL.paper : PAL.ink}
            stroke="none"
          >
            {rate}
          </text>
        </>
      )}
    </g>
  );
}

/** Legacy compatibility exports for Person1 and AiMark1. */
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

