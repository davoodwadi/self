/* ==========================================================================
   Consumer Behavior · Week 02 — figures
   --------------------------------------------------------------------------
   Hand-drawn SVG plates for perception and sensory marketing. The drawing
   system (Frame, Key, Note, Display, Person, the palette) comes from Week 01
   so both weeks read as one book.

   Fixed cast for this week:
     · SenseGlyph: eye (sight), notes (sound), perfume bottle (smell), open
       hand (touch), mouth and tongue (taste). Every plate that names a sense
       uses the same glyph for it.
     · Person: every human.
     · Stimulus marks (dot, square, triangle, arc): raw sensations before the
       mind has done anything with them.

   INK is the neutral case, SIGNAL what gets through (noticed, detected,
   chosen), COUNTER the other view. Labels reuse the words of the slide.
   ========================================================================== */

import React from "react";
import {
  Frame,
  Key,
  Note,
  Display,
  Person,
  INK,
  INK2,
  INK3,
  RULE,
  RULE2,
  SIGNAL,
  COUNTER,
  PAPER,
  PAPER2,
  SIGNAL_TINT,
  COUNTER_TINT,
} from "../week1/visuals";

const r2 = (n: number) => Math.round(n * 100) / 100;

/** Deterministic scatter in [0, 1), rounded so server and client agree. */
function hash(i: number, salt = 0) {
  const n = Math.sin((i + 1) * 12.9898 + salt * 78.233) * 43758.5453;
  return Math.round((n - Math.floor(n)) * 1e4) / 1e4;
}

/** Point on a circle, rounded (Node and Chromium differ in the last digits). */
function polar(cx: number, cy: number, r: number, deg: number) {
  const a = (deg * Math.PI) / 180;
  return { x: r2(cx + r * Math.cos(a)), y: r2(cy + r * Math.sin(a)) };
}

/** Open arrowhead pointing along (dx, dy), tip at (x, y). */
function headAlong(x: number, y: number, dx: number, dy: number, s = 8) {
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const bx = x - ux * s;
  const by = y - uy * s;
  const px = -uy * (s * 0.62);
  const py = ux * (s * 0.62);
  return `M${r2(bx + px)} ${r2(by + py)}L${r2(x)} ${r2(y)}L${r2(bx - px)} ${r2(by - py)}`;
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  stroke = INK,
  width = 1.5,
  dash,
  opacity,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stroke?: string;
  width?: number;
  dash?: string;
  opacity?: number;
}) {
  return (
    <g fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" opacity={opacity}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} strokeDasharray={dash} />
      <path d={headAlong(x2, y2, x2 - x1, y2 - y1)} />
    </g>
  );
}

/** Smooth curve through points (Catmull-Rom as cubic Béziers). */
function smooth(pts: [number, number][]) {
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = r2(p1[0] + (p2[0] - p0[0]) / 6);
    const c1y = r2(p1[1] + (p2[1] - p0[1]) / 6);
    const c2x = r2(p2[0] - (p3[0] - p1[0]) / 6);
    const c2y = r2(p2[1] - (p3[1] - p1[1]) / 6);
    d += `C${c1x} ${c1y} ${c2x} ${c2y} ${p2[0]} ${p2[1]}`;
  }
  return d;
}

function Heart({ x, y, s = 1, fill = SIGNAL }: { x: number; y: number; s?: number; fill?: string }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0 9C-4 5-12 1-12-5A6 6 0 0 1 0-8A6 6 0 0 1 12-5C12 1 4 5 0 9Z"
      fill={fill}
    />
  );
}

function starPath(cx: number, cy: number, R: number) {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const p = polar(cx, cy, i % 2 === 0 ? R : R * 0.45, -90 + i * 36);
    pts.push(`${p.x} ${p.y}`);
  }
  return `M${pts.join("L")}Z`;
}

function Star({ x, y, R = 10, fill = SIGNAL }: { x: number; y: number; R?: number; fill?: string }) {
  return <path d={starPath(x, y, R)} fill={fill} stroke={fill} strokeWidth={1.2} strokeLinejoin="round" />;
}

/** Thought bubble: a cloud-ish ellipse with two trailing dots toward (tx, ty). */
function Thought({
  x,
  y,
  rx = 44,
  ry = 30,
  tx,
  ty,
  stroke = INK,
}: {
  x: number;
  y: number;
  rx?: number;
  ry?: number;
  tx: number;
  ty: number;
  stroke?: string;
}) {
  const ax = r2(x + (tx - x) * 0.55);
  const ay = r2(y + (ty - y) * 0.55);
  const bx = r2(x + (tx - x) * 0.8);
  const by = r2(y + (ty - y) * 0.8);
  return (
    <g fill={PAPER} stroke={stroke} strokeWidth={1.6}>
      <ellipse cx={x} cy={y} rx={rx} ry={ry} />
      <circle cx={ax} cy={ay} r={5} />
      <circle cx={bx} cy={by} r={3} />
    </g>
  );
}

/* -- the five senses ----------------------------------------------------- */

export type Sense = "sight" | "sound" | "smell" | "touch" | "taste";
export const SENSES: Sense[] = ["sight", "sound", "smell", "touch", "taste"];

/** Musical notes: two beamed quavers. (x, y) is the centre. */
function Notes({ x, y, s = 1, fill = INK }: { x: number; y: number; s?: number; fill?: string }) {
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

/** A sense glyph on its own, for the rows of a slide. */
export function SenseMark({ kind, tone = INK }: { kind: Sense; tone?: string }) {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16 shrink-0" aria-hidden>
      <SenseGlyph kind={kind} x={32} y={32} s={1.1} tone={tone} />
    </svg>
  );
}

/* -- raw stimulus marks ---------------------------------------------------- */

type Mk = 0 | 1 | 2 | 3;

function Stim({ x, y, k, fill, r = 6, opacity }: { x: number; y: number; k: Mk; fill: string; r?: number; opacity?: number }) {
  if (k === 0) return <circle cx={x} cy={y} r={r} fill={fill} opacity={opacity} />;
  if (k === 1)
    return <rect x={r2(x - r * 0.85)} y={r2(y - r * 0.85)} width={r2(r * 1.7)} height={r2(r * 1.7)} fill={fill} opacity={opacity} />;
  if (k === 2)
    return <path d={`M${x} ${r2(y - r)}L${r2(x + r)} ${r2(y + r * 0.8)}H${r2(x - r)}Z`} fill={fill} opacity={opacity} />;
  return (
    <path
      d={`M${r2(x - r)} ${r2(y + r * 0.4)}Q${x} ${r2(y - r * 1.2)} ${r2(x + r)} ${r2(y + r * 0.4)}`}
      fill="none"
      stroke={fill}
      strokeWidth={2.2}
      strokeLinecap="round"
      opacity={opacity}
    />
  );
}

/* ==========================================================================
   TITLE · the same cup, before and after the filters
   ========================================================================== */

function Mug({ x, y, stroke = INK, fill = PAPER }: { x: number; y: number; stroke?: string; fill?: string }) {
  return (
    <g stroke={stroke} strokeWidth={2.2} strokeLinejoin="round">
      <path
        d={`M${x + 30} ${y - 19}Q${x + 48} ${y - 19} ${x + 48} ${y - 3}Q${x + 48} ${y + 11} ${x + 30} ${y + 11}`}
        fill="none"
      />
      <path
        d={`M${x - 30} ${y - 29}H${x + 30}V${y + 9}Q${x + 30} ${y + 29} ${x + 10} ${y + 29}H${x - 10}Q${x - 30} ${y + 29} ${x - 30} ${y + 9}Z`}
        fill={fill}
      />
    </g>
  );
}

export function Filters() {
  const rays = [-20, -10, 0, 10, 20];
  return (
    <Frame
      width={360}
      height={470}
      label="A plain cup at the top, marked as it is. Lines of sight run down through a band of the five senses (an eye, notes, a perfume bottle, a hand, a tongue) and then through three overlapping coloured lenses marked personal filters. Below the lenses the lines turn orange, and the cup at the bottom is tilted, tinted orange and carries a heart: as we see it."
    >
      <Key x={180} y={24} anchor="middle" fill={INK3} size={11}>
        AS IT IS
      </Key>
      <Mug x={172} y={78} />

      {/* lines of sight: plain above the filters, tinted below */}
      {rays.map((d) => (
        <g key={d}>
          <line x1={172 + d} y1={116} x2={172 + d * 1.3} y2={300} stroke={INK3} strokeWidth={1.2} strokeDasharray="3 4" />
          <line x1={172 + d * 1.3} y1={300} x2={180 + d * 1.6} y2={352} stroke={SIGNAL} strokeWidth={1.6} strokeDasharray="3 4" />
        </g>
      ))}

      {/* our senses */}
      <rect x={118} y={133} width={124} height={18} fill={PAPER} />
      <Key x={180} y={146} anchor="middle" fill={INK} size={11}>
        OUR SENSES
      </Key>
      <rect x={34} y={156} width={292} height={50} rx={25} fill={PAPER} stroke={INK} strokeWidth={1.6} />
      {SENSES.map((k, i) => (
        <SenseGlyph key={k} kind={k} x={78 + i * 51} y={181} s={0.52} />
      ))}

      {/* personal filters */}
      <rect x={100} y={225} width={160} height={18} fill={PAPER} />
      <Key x={180} y={238} anchor="middle" fill={INK} size={11}>
        PERSONAL FILTERS
      </Key>
      <circle cx={140} cy={276} r={28} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.6} />
      <circle cx={180} cy={276} r={28} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.6} />
      <circle cx={220} cy={276} r={28} fill="rgba(24, 22, 19, 0.06)" stroke={INK} strokeWidth={1.6} />

      <g transform="rotate(-7 180 392)">
        <Mug x={172} y={392} stroke={SIGNAL} fill={SIGNAL_TINT} />
        <Heart x={172} y={393} s={0.9} />
      </g>
      <Key x={180} y={458} anchor="middle" fill={SIGNAL} size={11}>
        AS WE SEE IT
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   WHAT IS PERCEPTION?
   ========================================================================== */

// Twenty raw sensations. The seven dots (k = 0) are the ones that get picked.
const SCATTER: [number, number, Mk][] = [
  [-58, -58, 1], [-24, -62, 0], [14, -52, 2], [54, -60, 3],
  [-46, -26, 0], [-6, -22, 3], [34, -30, 0], [62, -8, 1],
  [-62, 4, 2], [-26, 10, 0], [10, 4, 1], [44, 16, 0],
  [-50, 40, 3], [-14, 44, 2], [24, 40, 0], [60, 48, 2],
  [-60, 66, 1], [-22, 70, 3], [18, 68, 1], [54, 72, 0],
];
// Where the seven picked dots go when they are organized: two eyes, a smile.
const FACE: [number, number][] = [
  [-22, -22], [22, -22], [-34, 14], [-18, 28], [0, 32], [18, 28], [34, 14],
];

export function SelectOrganizeInterpret() {
  const cx = [110, 310, 510, 700];
  const cy = 128;
  const picked = SCATTER.map((p, i) => (p[2] === 0 ? i : -1)).filter((i) => i >= 0);
  const labels = ["SENSATIONS", "SELECTING", "ORGANIZING", "INTERPRETING"];
  return (
    <Frame
      height={260}
      label="Four panels left to right. Sensations: twenty grey marks of mixed shapes scattered at random. Selecting: the same scatter with seven dots lit orange and the rest faded. Organizing: the seven dots rearranged into two eyes and a smile. Interpreting: a solid smiling face."
    >
      {cx.slice(0, 3).map((x) => (
        <Arrow key={x} x1={x + 88} y1={cy} x2={x + 112} y2={cy} stroke={INK3} />
      ))}

      {/* sensations */}
      {SCATTER.map(([dx, dy, k], i) => (
        <Stim key={i} x={cx[0] + dx} y={cy + dy - 4} k={k} fill={INK3} />
      ))}

      {/* selecting */}
      {SCATTER.map(([dx, dy, k], i) => (
        <Stim
          key={i}
          x={cx[1] + dx}
          y={cy + dy - 4}
          k={k}
          fill={k === 0 ? SIGNAL : RULE2}
          opacity={k === 0 ? 1 : 0.55}
        />
      ))}

      {/* organizing */}
      {picked.map((_, j) => (
        <Stim key={j} x={cx[2] + FACE[j][0]} y={cy + FACE[j][1]} k={0} fill={SIGNAL} />
      ))}

      {/* interpreting */}
      <circle cx={cx[3]} cy={cy} r={62} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={2} />
      <circle cx={cx[3] - 22} cy={cy - 20} r={7} fill={SIGNAL} />
      <circle cx={cx[3] + 22} cy={cy - 20} r={7} fill={SIGNAL} />
      <path
        d={`M${cx[3] - 34} ${cy + 12}Q${cx[3]} ${cy + 52} ${cx[3] + 34} ${cy + 12}`}
        fill="none"
        stroke={SIGNAL}
        strokeWidth={6}
        strokeLinecap="round"
      />

      {labels.map((t, i) => (
        <Key key={t} x={cx[i]} y={234} anchor="middle" fill={i === 0 ? INK3 : SIGNAL} size={11}>
          {t}
        </Key>
      ))}
    </Frame>
  );
}

/** Colour swatches: something to see. */
function Swatches({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x - 22} y={y - 16} width={22} height={22} fill={SIGNAL} />
      <rect x={x - 8} y={y - 8} width={22} height={22} fill={COUNTER} />
      <rect x={x + 6} y={y - 20} width={18} height={18} fill={INK} />
    </g>
  );
}

/** A wrapped sweet: something to taste. */
function Sweet({ x, y }: { x: number; y: number }) {
  return (
    <g fill={INK}>
      <ellipse cx={x} cy={y} rx={14} ry={11} />
      <path d={`M${x - 12} ${y}L${x - 26} ${y - 10}V${y + 10}Z`} />
      <path d={`M${x + 12} ${y}L${x + 26} ${y - 10}V${y + 10}Z`} />
      <path d={`M${x - 6} ${y - 8}Q${x + 4} ${y} ${x - 6} ${y + 8}`} fill="none" stroke={PAPER} strokeWidth={2} />
    </g>
  );
}

/** A woven patch: something to feel. */
function Weave({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x - 22} y={y - 18} width={44} height={36} rx={4} fill={PAPER} stroke={INK} strokeWidth={1.8} />
      {[-10, 0, 10].map((dy) => (
        <path
          key={dy}
          d={`M${x - 18} ${y + dy}l6 -4l6 4l6 -4l6 4l6 -4l6 4`}
          fill="none"
          stroke={INK}
          strokeWidth={1.6}
          strokeLinejoin="round"
        />
      ))}
    </g>
  );
}

function Wisps({ x, y, stroke = INK }: { x: number; y: number; stroke?: string }) {
  return (
    <g fill="none" stroke={stroke} strokeWidth={2.2} strokeLinecap="round">
      {[-14, 0, 14].map((dx) => (
        <path key={dx} d={`M${x + dx} ${y + 18}q7 -7 0 -14t0 -14t0 -14`} />
      ))}
    </g>
  );
}

export function SensoryFlood() {
  const head = { x: 400, y: 186 };
  const src = [
    { x: 80, label: "SIGHTS" },
    { x: 240, label: "SOUNDS" },
    { x: 400, label: "SMELLS" },
    { x: 560, label: "TASTES" },
    { x: 720, label: "TEXTURES" },
  ];
  const iy = 64;
  return (
    <Frame
      height={320}
      label="Five kinds of input across the top: sights (colour swatches), sounds (sound waves), smells (rising wisps), tastes (a wrapped sweet) and textures (a woven patch). Three arrows from each, fifteen in all, pour down onto one person's head."
    >
      <Swatches x={80} y={iy} />
      <Notes x={240} y={iy} />
      <Wisps x={400} y={iy - 4} />
      <Sweet x={560} y={iy} />
      <Weave x={720} y={iy} />
      {src.map((s) => (
        <Key key={s.label} x={s.x} y={24} anchor="middle" fill={INK} size={11}>
          {s.label}
        </Key>
      ))}
      {src.flatMap((s, i) =>
        [-18, 0, 18].map((d) => {
          const x1 = s.x + d;
          const y1 = iy + 34;
          const dx = head.x - x1;
          const dy = head.y - y1;
          const len = Math.hypot(dx, dy);
          const stop = 30;
          return (
            <Arrow
              key={`${i}${d}`}
              x1={x1}
              y1={y1}
              x2={r2(head.x - (dx / len) * stop + d * 0.3)}
              y2={r2(head.y - (dy / len) * stop)}
              stroke={SIGNAL}
              width={1.3}
              opacity={0.85}
            />
          );
        }),
      )}
      <Person x={400} y={306} s={1.75} fill={INK} />
      <line x1={250} y1={306} x2={550} y2={306} stroke={RULE2} />
    </Frame>
  );
}

/** One advertisement, two viewers, two different impressions. */
export function SameAdTwoImpressions() {
  const g = 300;
  return (
    <Frame
      height={320}
      label="One billboard advertisement in the middle, showing a product and a star. Two people look at it from either side. One thinks of a heart; the other thinks of a frowning face."
    >
      {/* the billboard */}
      <line x1={350} y1={150} x2={350} y2={g} stroke={INK} strokeWidth={3} />
      <line x1={450} y1={150} x2={450} y2={g} stroke={INK} strokeWidth={3} />
      <rect x={290} y={40} width={220} height={112} rx={4} fill={PAPER} stroke={INK} strokeWidth={2} />
      <rect x={316} y={62} width={48} height={70} rx={6} fill={SIGNAL} />
      <rect x={326} y={82} width={28} height={16} rx={2} fill={PAPER} />
      <Star x={404} y={80} R={13} fill={INK} />
      <rect x={384} y={104} width={104} height={7} rx={3} fill={RULE2} />
      <rect x={384} y={118} width={72} height={7} rx={3} fill={RULE2} />
      <Key x={400} y={28} anchor="middle" fill={INK3} size={11}>
        THE EXACT SAME ADVERTISEMENT
      </Key>

      {/* sight lines */}
      <line x1={196} y1={214} x2={286} y2={130} stroke={INK3} strokeDasharray="3 4" />
      <line x1={604} y1={214} x2={514} y2={130} stroke={INK3} strokeDasharray="3 4" />

      {/* left viewer: loves it */}
      <Person x={180} y={g} s={1.45} fill={SIGNAL} />
      <Thought x={96} y={104} rx={48} ry={34} tx={162} ty={196} stroke={SIGNAL} />
      <Heart x={96} y={105} s={1.35} />

      {/* right viewer: does not */}
      <Person x={620} y={g} s={1.45} fill={COUNTER} />
      <Thought x={704} y={104} rx={48} ry={34} tx={638} ty={196} stroke={COUNTER} />
      <g fill="none" stroke={COUNTER} strokeWidth={2.2} strokeLinecap="round">
        <circle cx={704} cy={104} r={19} />
        <path d="M694 116Q704 106 714 116" />
      </g>
      <circle cx={697} cy={98} r={2} fill={COUNTER} />
      <circle cx={711} cy={98} r={2} fill={COUNTER} />

      <line x1={60} y1={g} x2={740} y2={g} stroke={RULE2} />
    </Frame>
  );
}

/* ==========================================================================
   THE THREE STAGES OF PERCEPTION
   ========================================================================== */

export const STAGES = ["Exposure", "Attention", "Interpretation"];

export function PerceptionFunnel() {
  const c = 180;
  // funnel edges: wide at exposure, narrower at attention, a tube at interpretation
  const top = (x: number) => (x <= 300 ? 70 + ((x - 40) / 260) * 40 : x <= 540 ? 110 + ((x - 300) / 240) * 50 : 160);
  const half = (x: number) => c - top(x);

  const exposure = Array.from({ length: 36 }, (_, i) => {
    const col = i % 6;
    const row = Math.floor(i / 6);
    const x = r2(66 + col * 38 + (hash(i, 1) - 0.5) * 14);
    const h = half(x) - 12;
    const y = r2(c + ((row - 2.5) / 2.5) * h * 0.92 + (hash(i, 2) - 0.5) * 8);
    return { x, y, k: (i * 7) % 4 as Mk };
  });
  const attention = [
    [340, 166], [364, 190], [392, 170], [420, 188], [448, 172], [476, 190], [500, 176], [522, 186],
  ];
  const heap1 = Array.from({ length: 16 }, (_, i) => ({ x: 70 + i * 13 + (hash(i, 3) - 0.5) * 6, y: 322 - (i % 2) * 8 }));
  const heap2 = Array.from({ length: 8 }, (_, i) => ({ x: 360 + i * 20, y: 322 - (i % 2) * 8 }));

  const xs = [170, 420, 650];
  return (
    <Frame
      height={380}
      label="A funnel lying on its side. Stage 1, Exposure, is the wide mouth holding thirty-six grey marks. Stage 2, Attention, is narrower and holds eight dark dots. Stage 3, Interpretation, is a thin tube holding one orange dot. Under the first two stages, marks drop out of the funnel into piles marked filtered out."
    >
      {xs.map((x, i) => (
        <g key={x}>
          <Key x={x} y={24} anchor="middle" fill={SIGNAL}>
            {`STAGE ${i + 1}`}
          </Key>
          <Display x={x} y={52} anchor="middle" size={22}>
            {STAGES[i]}
          </Display>
        </g>
      ))}

      <path
        d="M40 70L300 110L540 160H760V200H540L300 250L40 290Z"
        fill={PAPER}
        stroke={INK}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
      <line x1={300} y1={112} x2={300} y2={248} stroke={RULE2} strokeDasharray="3 5" />
      <line x1={540} y1={162} x2={540} y2={198} stroke={RULE2} strokeDasharray="3 5" />

      {exposure.map((p, i) => (
        <Stim key={i} x={p.x} y={p.y} k={p.k} fill={INK3} r={5.5} />
      ))}
      {attention.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={5.5} fill={INK} />
      ))}
      <circle cx={650} cy={c} r={11} fill={SIGNAL} />
      <Arrow x1={676} y1={c} x2={740} y2={c} stroke={SIGNAL} width={2} />

      {/* what falls out */}
      <Arrow x1={170} y1={284} x2={170} y2={304} stroke={INK3} dash="3 3" />
      <Arrow x1={430} y1={238} x2={430} y2={304} stroke={INK3} dash="3 3" />
      {heap1.map((p, i) => (
        <circle key={i} cx={r2(p.x)} cy={p.y} r={4.5} fill={RULE2} />
      ))}
      {heap2.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={4.5} fill={RULE2} />
      ))}
      <Key x={170} y={356} anchor="middle" fill={INK3}>
        FILTERED OUT
      </Key>
      <Key x={430} y={356} anchor="middle" fill={INK3}>
        FILTERED OUT
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   SENSORY MARKETING
   ========================================================================== */

const SENSE_WORD: Record<Sense, string> = {
  sight: "SIGHT",
  sound: "SOUND",
  smell: "SMELL",
  touch: "TOUCH",
  taste: "TASTE",
};

function sector(cx: number, cy: number, r0: number, r1: number, a0: number, a1: number) {
  const p0 = polar(cx, cy, r1, a0);
  const p1 = polar(cx, cy, r1, a1);
  const p2 = polar(cx, cy, r0, a1);
  const p3 = polar(cx, cy, r0, a0);
  return `M${p0.x} ${p0.y}A${r1} ${r1} 0 0 1 ${p1.x} ${p1.y}L${p2.x} ${p2.y}A${r0} ${r0} 0 0 0 ${p3.x} ${p3.y}Z`;
}

/** The five senses around the consumer; the three beyond sight and sound lit. */
export function SensoryWheel() {
  const cx = 400;
  const cy = 206;
  return (
    <Frame
      height={420}
      label="A wheel of five segments around a person: sight, sound, smell, touch and taste, each with its icon. Sight and sound are drawn in grey; smell, touch and taste, the senses beyond sight and sound, are drawn in orange."
    >
      {SENSES.map((k, i) => {
        const a = -90 + i * 72;
        const beyond = i >= 2;
        const g = polar(cx, cy, 125, a);
        const l = polar(cx, cy, 186, a);
        const anchor = Math.abs(l.x - cx) < 20 ? "middle" : l.x > cx ? "start" : "end";
        const ly = Math.abs(l.x - cx) < 20 ? (l.y < cy ? l.y + 4 : l.y + 12) : l.y + 4;
        return (
          <g key={k}>
            <path
              d={sector(cx, cy, 82, 168, a - 34, a + 34)}
              fill={beyond ? SIGNAL_TINT : PAPER2}
              stroke={beyond ? SIGNAL : RULE2}
              strokeWidth={1.6}
              strokeLinejoin="round"
            />
            <SenseGlyph kind={k} x={g.x} y={g.y} s={1.05} tone={beyond ? SIGNAL : INK3} />
            <Key x={l.x} y={ly} anchor={anchor} fill={beyond ? SIGNAL : INK3} size={12}>
              {SENSE_WORD[k]}
            </Key>
            {k === "touch" ? (
              <Note x={l.x - 2} y={ly + 20} anchor={anchor} fill={INK3} size={12} italic>
                haptics
              </Note>
            ) : null}
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r={70} fill={PAPER} stroke={INK} strokeWidth={1.6} />
      <Person x={cx} y={cy + 36} s={1.05} fill={INK} />
    </Frame>
  );
}

/** Sight: plain packages on a shelf; one is picked out by colour alone. */
export function SightVignette() {
  const packs = [0, 1, 2, 3, 4];
  const lit = 3;
  return (
    <Frame width={400} height={200} label="An eye on the left; a sight line runs past four grey boxes on a shelf to the one orange box, which carries no words at all.">
      <SenseGlyph kind="sight" x={48} y={96} s={1.1} tone={SIGNAL} />
      {packs.map((i) => {
        const x = 140 + i * 50;
        const on = i === lit;
        return (
          <g key={i}>
            <rect x={x - 17} y={70} width={34} height={70} rx={4} fill={on ? SIGNAL : PAPER2} stroke={on ? SIGNAL : RULE2} strokeWidth={1.6} />
            <circle cx={x} cy={96} r={8} fill={on ? PAPER : RULE} />
          </g>
        );
      })}
      <line x1={112} y1={140} x2={372} y2={140} stroke={INK} strokeWidth={2.4} />
      <path d={`M76 94Q220 36 ${140 + lit * 50} 64`} fill="none" stroke={SIGNAL} strokeWidth={1.6} strokeDasharray="4 4" />
      <path d={headAlong(140 + lit * 50, 64, 1, 0.35)} fill="none" stroke={SIGNAL} strokeWidth={1.6} strokeLinecap="round" />
    </Frame>
  );
}

/** Sound: a jingle plays, and the shopper carries it away in memory. */
export function SoundVignette() {
  return (
    <Frame width={400} height={200} label="A loudspeaker plays notes; the same notes sit in a thought bubble above a shopper pushing a trolley.">
      {/* speaker */}
      <g fill={INK}>
        <rect x={26} y={84} width={18} height={32} rx={2} />
        <path d="M44 84L74 60V140L44 116Z" />
      </g>
      <g fill="none" stroke={INK3} strokeWidth={2} strokeLinecap="round">
        <path d="M86 84Q96 100 86 116" />
        <path d="M98 74Q114 100 98 126" />
      </g>
      <Notes x={148} y={92} s={0.8} fill={SIGNAL} />
      <Arrow x1={176} y1={100} x2={218} y2={100} stroke={INK3} dash="3 4" />
      {/* shopper remembering the jingle */}
      <Person x={270} y={186} s={1.2} fill={INK} />
      <Thought x={330} y={52} rx={40} ry={28} tx={282} ty={96} stroke={SIGNAL} />
      <Notes x={330} y={52} s={0.72} fill={SIGNAL} />
      <g fill="none" stroke={INK} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M286 142H300L308 170H350L358 150H304" />
        <circle cx={314} cy={180} r={3.2} fill={INK} />
        <circle cx={344} cy={180} r={3.2} fill={INK} />
      </g>
      <line x1={20} y1={186} x2={380} y2={186} stroke={RULE2} />
    </Frame>
  );
}

/** Smell: the scent goes straight in, to a heart. */
export function SmellVignette() {
  const profile = smooth([
    [318, 186], [316, 158], [336, 132], [338, 96], [322, 56], [284, 34], [240, 38],
    [206, 60], [196, 90], [178, 116], [194, 124], [190, 138], [200, 152], [218, 156], [222, 186],
  ]);
  return (
    <Frame width={400} height={200} label="A perfume bottle gives off a scent that drifts into the nose of a head in profile, and a line runs from the nose straight to a heart inside the head, marked limbic system.">
      <SenseGlyph kind="smell" x={64} y={112} s={1.25} tone={SIGNAL} />
      <path d={profile} fill={PAPER} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
      <path d="M96 84Q130 70 150 96T176 116" fill="none" stroke={SIGNAL} strokeWidth={1.8} strokeDasharray="4 4" strokeLinecap="round" />
      <path d="M186 114Q222 104 256 94" fill="none" stroke={SIGNAL} strokeWidth={2.2} strokeLinecap="round" />
      <Heart x={272} y={92} s={1.2} />
      <Key x={274} y={134} anchor="middle" fill={SIGNAL} size={9.5}>
        LIMBIC SYSTEM
      </Key>
    </Frame>
  );
}

/** Touch: holding it makes it feel like yours. */
export function TouchVignette() {
  return (
    <Frame width={400} height={200} label="A shopper holds a product in both hands; a tag hanging from it reads mine.">
      <Person x={150} y={188} s={1.9} fill={INK} />
      <path d="M126 118L168 128M174 118L184 126" stroke={INK} strokeWidth={8} strokeLinecap="round" />
      <rect x={176} y={96} width={62} height={52} rx={5} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={2} />
      <line x1={176} y1={110} x2={238} y2={110} stroke={SIGNAL} strokeWidth={1.8} />
      <SenseGlyph kind="touch" x={180} y={126} s={0.62} tone={INK} />
      {/* the tag */}
      <path d="M238 104Q262 100 270 116" fill="none" stroke={INK3} strokeWidth={1.4} />
      <path d="M270 110L346 110L358 126L346 142H270Z" fill={PAPER} stroke={SIGNAL} strokeWidth={2} strokeLinejoin="round" />
      <circle cx={280} cy={126} r={3.5} fill="none" stroke={SIGNAL} strokeWidth={1.6} />
      <Key x={316} y={131} anchor="middle" fill={SIGNAL} size={13} weight={700}>
        MINE
      </Key>
      <line x1={40} y1={188} x2={380} y2={188} stroke={RULE2} />
    </Frame>
  );
}

function Can({ x, y, fill = SIGNAL }: { x: number; y: number; fill?: string }) {
  // (x, y) is the base centre
  return (
    <g>
      <rect x={x - 15} y={y - 54} width={30} height={54} rx={5} fill={fill} />
      <rect x={x - 12} y={y - 58} width={24} height={6} rx={2} fill={INK} />
      <path d={`M${x - 15} ${y - 32}Q${x} ${y - 22} ${x + 15} ${y - 32}`} fill="none" stroke={PAPER} strokeWidth={2.5} />
    </g>
  );
}

/** Taste: the same flavour, bought again and again. */
export function TasteVignette() {
  return (
    <Frame width={400} height={200} label="A shopper beside a row of five identical orange cans of the same drink, each one ticked; a looping arrow runs back from the last can to the first.">
      <Person x={52} y={170} s={1.3} fill={INK} />
      {[0, 1, 2, 3, 4].map((i) => {
        const x = 130 + i * 58;
        return (
          <g key={i}>
            <Can x={x} y={170} />
            <path d={`M${x - 7} ${96}L${x - 2} ${101}L${x + 8} ${89}`} fill="none" stroke={SIGNAL} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );
      })}
      <path d="M362 70Q362 36 246 36T130 70" fill="none" stroke={INK3} strokeWidth={1.6} strokeDasharray="4 4" />
      <path d={headAlong(130, 72, 0, 1)} fill="none" stroke={INK3} strokeWidth={1.6} strokeLinecap="round" />
      <line x1={20} y1={170} x2={380} y2={170} stroke={RULE2} />
    </Frame>
  );
}

/* ==========================================================================
   SENSORY THRESHOLDS
   ========================================================================== */

/** Eight stimuli of rising strength; only those above the line are detected. */
export function AbsoluteThreshold() {
  const base = 230;
  const line = 150;
  const heights = [14, 30, 48, 66, 92, 118, 146, 172];
  return (
    <Frame
      height={290}
      label="Eight bars rising in height from left to right, marked stimulation. A dashed line across them is the absolute threshold. The four bars that stop below the line are faded and marked not detected; the four that cross it are orange and marked detected."
    >
      <Arrow x1={96} y1={base} x2={96} y2={36} stroke={INK3} />
      <Key x={0} y={0} fill={INK3} transform={`translate(80 ${base - 60}) rotate(-90)`}>
        STIMULATION
      </Key>
      {heights.map((h, i) => {
        const x = 150 + i * 72;
        const on = base - h < line;
        return (
          <rect
            key={i}
            x={x - 20}
            y={base - h}
            width={40}
            height={h}
            rx={2}
            fill={on ? SIGNAL : PAPER2}
            stroke={on ? SIGNAL : RULE2}
            strokeWidth={1.4}
            strokeDasharray={on ? undefined : "3 3"}
          />
        );
      })}
      <line x1={112} y1={line} x2={760} y2={line} stroke={INK} strokeWidth={1.6} strokeDasharray="7 5" />
      <Key x={116} y={line - 10} fill={INK}>
        ABSOLUTE THRESHOLD
      </Key>
      <line x1={112} y1={base} x2={760} y2={base} stroke={INK} strokeWidth={1.4} />
      <path d={`M130 ${base + 14}V${base + 22}H386V${base + 14}`} fill="none" stroke={INK3} strokeWidth={1.2} />
      <Key x={258} y={base + 44} anchor="middle" fill={INK3}>
        NOT DETECTED
      </Key>
      <path d={`M418 ${base + 14}V${base + 22}H674V${base + 14}`} fill="none" stroke={SIGNAL} strokeWidth={1.2} />
      <Key x={546} y={base + 44} anchor="middle" fill={SIGNAL}>
        DETECTED
      </Key>
    </Frame>
  );
}

/** From the driver's seat, the far billboard's text is too small to read. */
export function FarBillboard() {
  return (
    <Frame width={400} height={260} label="The view through a car windscreen: a highway runs to the horizon, and a billboard stands far off beside it, its lines of text too small to read. A question mark hangs over it.">
      {/* windscreen */}
      <path d="M26 30Q200 6 374 30L390 216H10Z" fill={COUNTER_TINT} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
      {/* ground and road */}
      <path d="M17 134H383L390 216H10Z" fill={PAPER2} />
      <line x1={17} y1={134} x2={383} y2={134} stroke={INK3} strokeWidth={1.2} />
      <path d="M150 216L196 134H204L250 216Z" fill={RULE} />
      {[0, 1, 2].map((i) => (
        <line key={i} x1={200} y1={206 - i * 26} x2={200} y2={196 - i * 26 + i * 4} stroke={PAPER} strokeWidth={3 - i * 0.8} />
      ))}
      {/* the far billboard */}
      <line x1={282} y1={120} x2={282} y2={136} stroke={INK} strokeWidth={1.2} />
      <line x1={298} y1={120} x2={298} y2={136} stroke={INK} strokeWidth={1.2} />
      <rect x={274} y={106} width={32} height={16} fill={PAPER} stroke={INK} strokeWidth={1.2} />
      {[110.5, 114, 117.5].map((y, i) => (
        <line key={y} x1={277} y1={y} x2={i === 2 ? 292 : 303} y2={y} stroke={INK3} strokeWidth={0.8} />
      ))}
      <Display x={290} y={96} anchor="middle" fill={SIGNAL} size={26}>
        ?
      </Display>
      {/* dashboard and wheel */}
      <path d="M0 216H400V260H0Z" fill={INK} />
      <path d="M92 260A62 40 0 0 1 216 260" fill="none" stroke={INK3} strokeWidth={6} />
    </Frame>
  );
}

/** Pairs of bars with a growing difference: the first one noticed is the JND. */
export function JndLadder() {
  const diffs = [2, 6, 14, 28];
  const noticed = (d: number) => d >= 14;
  const x0 = 150;
  const L = 300;
  return (
    <Frame
      height={330}
      label="Four rows, each comparing two bars. The top bar is always the same length; the bottom bar is longer by a small orange piece that grows from row to row. The first two rows are marked same; the last two are marked different. The first row marked different is bracketed as the just noticeable difference, JND."
    >
      <Key x={x0} y={30} fill={INK3}>
        TWO STIMULI
      </Key>
      <Key x={700} y={30} anchor="middle" fill={INK3}>
        DETECTED?
      </Key>
      {diffs.map((d, i) => {
        const y = 62 + i * 66;
        const on = noticed(d);
        return (
          <g key={d}>
            <rect x={x0} y={y} width={L} height={14} fill={INK} />
            <rect x={x0} y={y + 20} width={L} height={14} fill={INK} />
            <rect x={x0 + L} y={y + 20} width={d} height={14} fill={SIGNAL} />
            <Key x={x0 - 20} y={y + 11} anchor="end" fill={INK3}>
              A
            </Key>
            <Key x={x0 - 20} y={y + 31} anchor="end" fill={INK3}>
              B
            </Key>
            <Key x={700} y={y + 22} anchor="middle" fill={on ? SIGNAL : INK3} size={12}>
              {on ? "DIFFERENT" : "SAME"}
            </Key>
            <line x1={500} y1={y + 17} x2={630} y2={y + 17} stroke={RULE} strokeDasharray="1 5" strokeLinecap="round" strokeWidth={1.6} />
          </g>
        );
      })}
      {/* the first difference that gets noticed */}
      <path d={`M${x0 + L} ${62 + 2 * 66 + 42}V${62 + 2 * 66 + 50}H${x0 + L + 14}V${62 + 2 * 66 + 42}`} fill="none" stroke={SIGNAL} strokeWidth={1.6} />
      <line x1={x0 + L + 7} y1={62 + 2 * 66 + 50} x2={x0 + L + 7} y2={62 + 2 * 66 + 58} stroke={SIGNAL} strokeWidth={1.6} />
      <Key x={x0 + L + 20} y={62 + 2 * 66 + 64} fill={SIGNAL} size={12}>
        JND
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   WEBER'S LAW
   ========================================================================== */

/** The same ten per cent looks bigger the stronger the starting point. */
export function ProportionBars() {
  const bars = [70, 150, 280];
  return (
    <Frame width={400} height={240} label="Three bars of rising length, marked initial stimulus. Each ends in an orange piece that is one tenth of its length, marked plus ten per cent, so the orange piece grows as the bar grows.">
      <Key x={30} y={30} fill={INK3}>
        INITIAL STIMULUS
      </Key>
      <Key x={30} y={46} fill={SIGNAL}>
        + CHANGE NEEDED
      </Key>
      {bars.map((w, i) => {
        const y = 76 + i * 52;
        return (
          <g key={w}>
            <rect x={30} y={y} width={w} height={24} fill={INK} />
            <rect x={30 + w} y={y} width={w * 0.1} height={24} fill={SIGNAL} />
            <Key x={30 + w * 1.1 + 10} y={y + 17} fill={SIGNAL} size={12}>
              +10%
            </Key>
          </g>
        );
      })}
    </Frame>
  );
}

function CandyBar({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path d={`M${x - 34} ${y - 12}L${x - 42} ${y - 16}V${y + 16}L${x - 34} ${y + 12}Z`} fill={INK3} />
      <path d={`M${x + 34} ${y - 12}L${x + 42} ${y - 16}V${y + 16}L${x + 34} ${y + 12}Z`} fill={INK3} />
      <rect x={x - 34} y={y - 13} width={68} height={26} rx={3} fill={SIGNAL} />
      <rect x={x - 14} y={y - 7} width={28} height={14} rx={2} fill={PAPER} />
    </g>
  );
}

function Laptop({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x - 30} y={y - 24} width={60} height={38} rx={3} fill={PAPER} stroke={INK} strokeWidth={2.2} />
      <rect x={x - 24} y={y - 18} width={48} height={26} fill={COUNTER_TINT} />
      <path d={`M${x - 40} ${y + 16}H${x + 40}L${x + 34} ${y + 24}H${x - 34}Z`} fill={INK} />
    </g>
  );
}

export function WebersLawScale() {
  const x0 = 150;
  const L = 330;
  const rows = [
    { y: 100, from: "$1.00", to: "$1.10", pct: "+10%", ext: L * 0.1, verdict: "NOTICEABLE RIGHT AWAY", on: true },
    { y: 244, from: "$1,000.00", to: "$1,000.10", pct: "+0.01%", ext: L * 0.0001, verdict: "COMPLETELY UNNOTICED", on: false },
  ];
  return (
    <Frame
      height={320}
      label="Two price rises of the same ten cents. Top: a candy bar goes from one dollar to one dollar ten; its price bar grows by an orange tenth, marked plus ten per cent, noticeable right away. Bottom: a laptop goes from one thousand dollars to one thousand dollars and ten cents; its price bar grows by a sliver too thin to see, marked plus 0.01 per cent, completely unnoticed."
    >
      <Key x={x0} y={28} fill={INK3}>
        THE SAME TEN-CENT INCREASE
      </Key>
      {rows.map((r, i) => (
        <g key={r.from}>
          {i === 0 ? <CandyBar x={70} y={r.y} /> : <Laptop x={70} y={r.y} />}
          <Display x={x0} y={r.y - 22} size={22}>
            {r.from} <tspan fill={INK3}>→</tspan> <tspan fill={r.on ? SIGNAL : INK}>{r.to}</tspan>
          </Display>
          <rect x={x0} y={r.y - 8} width={L} height={26} fill={INK} />
          {r.on ? (
            <rect x={x0 + L} y={r.y - 8} width={r.ext} height={26} fill={SIGNAL} />
          ) : (
            <line x1={x0 + L + 0.5} y1={r.y - 8} x2={x0 + L + 0.5} y2={r.y + 18} stroke={SIGNAL} strokeWidth={0.6} />
          )}
          <Key x={x0 + L + (r.on ? r.ext : 0) + 12} y={r.y + 10} fill={SIGNAL} size={12}>
            {r.pct}
          </Key>
          <Key x={x0} y={r.y + 44} fill={r.on ? SIGNAL : INK3} size={12}>
            {r.verdict}
          </Key>
        </g>
      ))}
      <line x1={40} y1={172} x2={760} y2={172} stroke={RULE} />
    </Frame>
  );
}

/** A meter with the JND marked and a pointer below or above it. */
function JndMeter({ y, at, tone }: { y: number; at: number; tone: string }) {
  return (
    <g>
      <rect x={40} y={y} width={320} height={10} rx={5} fill={PAPER2} stroke={RULE2} />
      <rect x={200} y={y} width={160} height={10} rx={0} fill={SIGNAL_TINT} />
      <line x1={200} y1={y - 8} x2={200} y2={y + 18} stroke={INK} strokeWidth={2} />
      <Key x={200} y={y + 36} anchor="middle" fill={INK}>
        JND
      </Key>
      <path d={`M${at} ${y - 2}L${at - 7} ${y - 14}H${at + 7}Z`} fill={tone} />
    </g>
  );
}

/** Staying below: the pack shrinks a little inside its old outline. */
export function StayBelow() {
  return (
    <Frame width={400} height={250} label="A snack pack drawn inside the dashed outline of its old, slightly bigger size, beside a price tag that has crept up by a few cents. Below, a meter shows the change sitting just short of the JND mark.">
      <rect x={70} y={26} width={118} height={140} rx={6} fill="none" stroke={INK3} strokeWidth={1.4} strokeDasharray="4 4" />
      <rect x={76} y={34} width={106} height={126} rx={6} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={2} />
      <rect x={92} y={64} width={74} height={34} rx={4} fill={COUNTER} />
      <rect x={92} y={110} width={50} height={6} rx={3} fill={COUNTER} opacity={0.5} />
      <g transform="rotate(8 290 94)">
        <path d="M232 70H330L346 94L330 118H232Z" fill={PAPER} stroke={COUNTER} strokeWidth={2} strokeLinejoin="round" />
        <circle cx={332} cy={94} r={3.5} fill="none" stroke={COUNTER} strokeWidth={1.6} />
        <Display x={278} y={102} anchor="middle" fill={COUNTER} size={20}>
          $4.09
        </Display>
      </g>
      <JndMeter y={200} at={176} tone={COUNTER} />
    </Frame>
  );
}

function Burst({ x, y, R = 40, fill = SIGNAL }: { x: number; y: number; R?: number; fill?: string }) {
  const pts: string[] = [];
  for (let i = 0; i < 24; i++) {
    const p = polar(x, y, i % 2 === 0 ? R : R * 0.8, i * 15);
    pts.push(`${p.x} ${p.y}`);
  }
  return <path d={`M${pts.join("L")}Z`} fill={fill} />;
}

/** Exceeding: a bold new pack and a big discount nobody can miss. */
export function Exceed() {
  return (
    <Frame width={400} height={250} label="A small grey old pack beside a redesigned pack in bold orange stripes, with a big starburst reading minus forty per cent. Below, a meter shows the change far past the JND mark.">
      <rect x={28} y={86} width={56} height={70} rx={4} fill={PAPER2} stroke={RULE2} strokeWidth={1.6} />
      <rect x={38} y={102} width={36} height={16} rx={3} fill={RULE2} />
      <Arrow x1={94} y1={122} x2={126} y2={122} stroke={INK3} />
      <rect x={138} y={26} width={118} height={140} rx={6} fill={SIGNAL} />
      {[52, 76, 100].map((y) => (
        <rect key={y} x={138} y={y} width={118} height={10} fill={PAPER} opacity={0.9} />
      ))}
      <rect x={156} y={122} width={82} height={30} rx={4} fill={INK} />
      <Key x={197} y={142} anchor="middle" fill={PAPER} size={12} weight={700}>
        NEW
      </Key>
      <Burst x={318} y={84} R={52} />
      <Display x={318} y={93} anchor="middle" fill={PAPER} size={24}>
        −40%
      </Display>
      <JndMeter y={200} at={330} tone={SIGNAL} />
    </Frame>
  );
}

/* ==========================================================================
   ATTENTION
   ========================================================================== */

type Card = { x: number; y: number; w: number; h: number; kind: "ad" | "phone" | "badge" | "sign"; n?: string; tone?: string };

const CLUTTER: Card[] = [
  { x: 24, y: 20, w: 120, h: 72, kind: "ad", tone: SIGNAL },
  { x: 160, y: 40, w: 44, h: 80, kind: "phone", n: "12" },
  { x: 222, y: 14, w: 96, h: 58, kind: "ad", tone: COUNTER },
  { x: 36, y: 118, w: 92, h: 60, kind: "sign", n: "SALE" },
  { x: 142, y: 146, w: 110, h: 64, kind: "ad", tone: INK },
  { x: 40, y: 204, w: 44, h: 72, kind: "phone", n: "99+" },
  { x: 100, y: 228, w: 120, h: 52, kind: "ad", tone: SIGNAL },
  { x: 236, y: 226, w: 84, h: 54, kind: "sign", n: "NEW" },
  { x: 482, y: 16, w: 104, h: 62, kind: "ad", tone: INK },
  { x: 600, y: 32, w: 44, h: 80, kind: "phone", n: "7" },
  { x: 660, y: 18, w: 116, h: 70, kind: "ad", tone: COUNTER },
  { x: 552, y: 104, w: 104, h: 58, kind: "sign", n: "−50%" },
  { x: 672, y: 112, w: 100, h: 62, kind: "ad", tone: SIGNAL },
  { x: 486, y: 178, w: 116, h: 60, kind: "ad", tone: COUNTER },
  { x: 618, y: 196, w: 44, h: 80, kind: "phone", n: "34" },
  { x: 680, y: 206, w: 96, h: 70, kind: "sign", n: "BUY" },
  { x: 338, y: 14, w: 124, h: 66, kind: "ad", tone: SIGNAL },
  { x: 272, y: 92, w: 44, h: 80, kind: "phone", n: "5" },
  { x: 372, y: 96, w: 92, h: 50, kind: "sign", n: "HOT" },
];

function ClutterCard({ c }: { c: Card }) {
  if (c.kind === "phone")
    return (
      <g>
        <rect x={c.x} y={c.y} width={c.w} height={c.h} rx={7} fill={PAPER} stroke={INK} strokeWidth={1.6} />
        <rect x={c.x + 5} y={c.y + 10} width={c.w - 10} height={c.h - 22} fill={COUNTER_TINT} />
        <circle cx={c.x + c.w - 2} cy={c.y + 2} r={11} fill={SIGNAL} />
        <Key x={c.x + c.w - 2} y={c.y + 5.5} anchor="middle" fill={PAPER} size={c.n && c.n.length > 2 ? 7.5 : 9} weight={700}>
          {c.n}
        </Key>
      </g>
    );
  if (c.kind === "sign")
    return (
      <g>
        <rect x={c.x} y={c.y} width={c.w} height={c.h} rx={4} fill={INK} />
        <Key x={c.x + c.w / 2} y={c.y + c.h / 2 + 5} anchor="middle" fill={PAPER} size={13} weight={700}>
          {c.n}
        </Key>
      </g>
    );
  return (
    <g>
      <rect x={c.x} y={c.y} width={c.w} height={c.h} rx={3} fill={PAPER} stroke={INK} strokeWidth={1.4} />
      <rect x={c.x + 8} y={c.y + 8} width={c.h - 16} height={c.h - 16} rx={3} fill={c.tone} />
      <rect x={c.x + c.h} y={c.y + 12} width={c.w - c.h - 10} height={6} rx={3} fill={RULE2} />
      <rect x={c.x + c.h} y={c.y + 24} width={(c.w - c.h - 10) * 0.6} height={6} rx={3} fill={RULE2} />
    </g>
  );
}

export function Overload() {
  return (
    <Frame height={300} label="A shopper stands in a gap surrounded on both sides by a wall of ads, store signs reading sale, new, buy and minus fifty per cent, and phones whose red notification badges read 7, 12, 34 and 99-plus.">
      {CLUTTER.map((c, i) => (
        <ClutterCard key={i} c={c} />
      ))}
      <Person x={400} y={284} s={1.7} fill={INK} />
      <line x1={20} y1={284} x2={780} y2={284} stroke={RULE2} />
    </Frame>
  );
}

/** Selective exposure: the viewer skips the ad. */
export function SkipAd() {
  return (
    <Frame width={400} height={220} label="A video player showing an ad, with a skip ad button in the corner and a pointer about to press it.">
      <rect x={40} y={20} width={320} height={180} rx={8} fill={INK} />
      <rect x={60} y={44} width={70} height={100} rx={8} fill={SIGNAL} />
      <rect x={146} y={60} width={130} height={9} rx={4} fill={INK3} />
      <rect x={146} y={80} width={90} height={9} rx={4} fill={INK3} />
      <Key x={60} y={36} fill={INK3} size={9}>
        AD
      </Key>
      <rect x={60} y={176} width={280} height={4} rx={2} fill={INK2} />
      <rect x={60} y={176} width={40} height={4} rx={2} fill={SIGNAL} />
      <rect x={236} y={122} width={112} height={36} rx={4} fill={PAPER} />
      <Key x={292} y={145} anchor="middle" fill={INK} size={12} weight={700}>
        SKIP AD ›
      </Key>
      {/* pointer */}
      <path d="M312 150L312 184L321 176L328 192L335 189L328 173L340 173Z" fill={PAPER} stroke={INK} strokeWidth={1.8} strokeLinejoin="round" />
    </Frame>
  );
}

function ForkKnife({ x, y, s = 1, fill = INK }: { x: number; y: number; s?: number; fill?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={fill}>
      <rect x={-12} y={-16} width={3} height={12} rx={1} />
      <rect x={-7.5} y={-16} width={3} height={12} rx={1} />
      <rect x={-3} y={-16} width={3} height={12} rx={1} />
      <rect x={-12} y={-6} width={12} height={5} rx={2} />
      <rect x={-7.5} y={-2} width={3} height={20} rx={1.5} />
      <path d="M7 -16Q14 -8 12 4H8Z" />
      <rect x={8} y={2} width={3.4} height={16} rx={1.5} />
    </g>
  );
}

/** Perceptual vigilance: the hungry person sees the restaurant sign. */
export function Vigilance() {
  const signs = [
    { x: 116, kind: "a" },
    { x: 216, kind: "food" },
    { x: 316, kind: "b" },
  ];
  return (
    <Frame width={400} height={220} label="A hungry person, thinking of a fork and knife, looks up at three shop signs. Two plain signs are grey; the restaurant sign with a fork and knife is orange and a sight line runs to it.">
      {signs.map((s) => {
        const on = s.kind === "food";
        return (
          <g key={s.x}>
            <line x1={s.x} y1={78} x2={s.x} y2={204} stroke={on ? INK : RULE2} strokeWidth={2} />
            <rect x={s.x - 34} y={26} width={68} height={52} rx={5} fill={on ? SIGNAL : PAPER2} stroke={on ? SIGNAL : RULE2} strokeWidth={1.6} />
            {on ? (
              <ForkKnife x={s.x} y={52} s={1.1} fill={PAPER} />
            ) : s.kind === "a" ? (
              <rect x={s.x - 14} y={40} width={28} height={24} fill={RULE2} />
            ) : (
              <circle cx={s.x} cy={52} r={13} fill={RULE2} />
            )}
          </g>
        );
      })}
      <Person x={50} y={204} s={1.2} fill={INK} />
      <Thought x={40} y={60} rx={26} ry={20} tx={48} ty={112} stroke={INK} />
      <ForkKnife x={41} y={60} s={0.75} fill={INK} />
      <line x1={62} y1={128} x2={176} y2={70} stroke={SIGNAL} strokeWidth={1.6} strokeDasharray="4 4" />
      <line x1={20} y1={204} x2={380} y2={204} stroke={RULE2} />
    </Frame>
  );
}

/** Perceptual defense: the warning is screened out before it lands. */
export function Defense() {
  return (
    <Frame width={400} height={220} label="A cigarette pack with a large warning label on the right. On the left a person holds up a curved shield, and the lines coming from the warning bounce off it.">
      <Person x={70} y={204} s={1.5} fill={INK} />
      <path d="M118 70Q146 116 118 162" fill="none" stroke={SIGNAL} strokeWidth={5} strokeLinecap="round" />
      {[86, 116, 146].map((y, i) => (
        <g key={y}>
          <line x1={250} y1={y} x2={140} y2={y} stroke={INK3} strokeWidth={1.4} strokeDasharray="4 4" />
          <path d={`M140 ${y}L166 ${y + (i - 1) * 16 - 18}`} fill="none" stroke={INK3} strokeWidth={1.4} strokeDasharray="4 4" />
        </g>
      ))}
      {/* the pack */}
      <rect x={256} y={38} width={96} height={150} rx={4} fill={PAPER} stroke={INK} strokeWidth={2} />
      <rect x={256} y={38} width={96} height={30} rx={4} fill={INK} />
      <rect x={264} y={84} width={80} height={90} fill={INK} />
      <path d="M304 96L324 130H284Z" fill="none" stroke={PAPER} strokeWidth={2.4} strokeLinejoin="round" />
      <line x1={304} y1={106} x2={304} y2={118} stroke={PAPER} strokeWidth={2.4} strokeLinecap="round" />
      <circle cx={304} cy={124} r={1.6} fill={PAPER} />
      <Key x={304} y={156} anchor="middle" fill={PAPER} size={11} weight={700}>
        WARNING
      </Key>
      <line x1={20} y1={204} x2={380} y2={204} stroke={RULE2} />
    </Frame>
  );
}

/** Adaptation: the same sign, noticed less and less. */
export function Adaptation() {
  const xs = [70, 200, 330];
  const fade = [1, 0.45, 0.16];
  return (
    <Frame width={400} height={220} label="The same billboard drawn three times along an arrow marked with time: when new it is bright orange with an open eye above it; when familiar it is faded; at the end it has almost disappeared.">
      {xs.map((x, i) => (
        <g key={x} opacity={fade[i]}>
          <rect x={x - 46} y={70} width={92} height={60} rx={3} fill={SIGNAL} />
          <Star x={x - 20} y={100} R={12} fill={PAPER} />
          <rect x={x} y={90} width={34} height={6} rx={3} fill={PAPER} />
          <rect x={x} y={104} width={24} height={6} rx={3} fill={PAPER} />
          <line x1={x} y1={130} x2={x} y2={156} stroke={INK} strokeWidth={2} />
          <SenseGlyph kind="sight" x={x} y={40} s={0.8} tone={INK} />
        </g>
      ))}
      <Arrow x1={30} y1={180} x2={372} y2={180} stroke={INK3} />
      <Key x={70} y={204} anchor="middle" fill={INK}>
        NEW
      </Key>
      <Key x={200} y={204} anchor="middle" fill={INK3}>
        FAMILIAR
      </Key>
      <Key x={330} y={204} anchor="middle" fill={INK3}>
        WITH TIME
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   GESTALT PRINCIPLES
   ========================================================================== */

/** Separate dots that the eye reads as one whole heart. */
export function WholeFromParts() {
  const heart = (t: number) => {
    // parametric heart, t in [0, 2π)
    const x = 16 * Math.sin(t) ** 3;
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    return { x: r2(200 + x * 6.4), y: r2(116 - y * 6.4) };
  };
  const n = 22;
  const dense = Array.from({ length: 721 }, (_, i) => heart((i / 720) * Math.PI * 2));
  const acc = [0];
  for (let i = 1; i < dense.length; i++) acc.push(acc[i - 1] + Math.hypot(dense[i].x - dense[i - 1].x, dense[i].y - dense[i - 1].y));
  const total = acc[acc.length - 1];
  const dots = Array.from({ length: n }, (_, k) => dense[acc.findIndex((a) => a >= (k / n) * total)]);
  return (
    <Frame width={400} height={240} label="Twenty-two separate dots with gaps between them, laid out so that together they read as one heart.">
      {dots.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={7} fill={i % 2 === 0 ? SIGNAL : INK} />
      ))}
    </Frame>
  );
}

/** Closure: a logo made of broken shapes still reads as complete. */
export function Closure() {
  const pts = [
    { x: 200, y: 58 },
    { x: 258, y: 158 },
    { x: 142, y: 158 },
  ];
  const R = 36;
  // each disc has a wedge cut out, pointing at the centroid
  const cx = 200;
  const cy = 124.67;
  return (
    <Frame width={400} height={260} label="A badge logo: three orange discs, each with a wedge cut out, placed so the cut-outs line up into a white triangle that is never drawn. Two bars beneath stand in for the brand name.">
      <rect x={96} y={16} width={208} height={190} rx={22} fill={PAPER2} stroke={RULE2} strokeWidth={1.4} />
      {pts.map((p, i) => {
        const a = (Math.atan2(cy - p.y, cx - p.x) * 180) / Math.PI;
        const s = polar(p.x, p.y, R, a - 30);
        const e = polar(p.x, p.y, R, a + 30);
        return <path key={i} d={`M${p.x} ${p.y}L${s.x} ${s.y}A${R} ${R} 0 1 0 ${e.x} ${e.y}Z`} fill={SIGNAL} />;
      })}
      <rect x={140} y={224} width={120} height={9} rx={4} fill={INK} />
      <rect x={160} y={241} width={80} height={7} rx={3} fill={RULE2} />
    </Frame>
  );
}

/** Similarity: evenly spaced packs group by shared colour and shape. */
export function Similarity() {
  const cols = 8;
  const rows = 3;
  const group = (c: number) => (c < 3 ? 0 : c < 5 ? 1 : 2);
  const tone = [SIGNAL, INK, COUNTER];
  return (
    <Frame width={400} height={260} label="A shelf of twenty-four packs in three rows, all evenly spaced. The three left columns are orange boxes, the middle two are dark round tins, the right three are teal tall bottles, so the eye sees three brand blocks.">
      {Array.from({ length: rows }, (_, r) => (
        <g key={r}>
          <line x1={24} y1={84 + r * 72} x2={376} y2={84 + r * 72} stroke={INK} strokeWidth={2.4} />
          {Array.from({ length: cols }, (_, c) => {
            const x = 44 + c * 44;
            const g = group(c);
            const base = 82 + r * 72;
            if (g === 0) return <rect key={c} x={x - 15} y={base - 50} width={30} height={50} rx={3} fill={tone[g]} />;
            if (g === 1) return <ellipse key={c} cx={x} cy={base - 18} rx={16} ry={18} fill={tone[g]} />;
            return <path key={c} d={`M${x - 11} ${base}V${base - 38}Q${x - 11} ${base - 46} ${x - 4} ${base - 50}V${base - 58}H${x + 4}V${base - 50}Q${x + 11} ${base - 46} ${x + 11} ${base - 38}V${base}Z`} fill={tone[g]} />;
          })}
        </g>
      ))}
    </Frame>
  );
}

/** Figure-ground: a vase, or two faces. */
export function FigureGround() {
  // the right-hand profile (a face looking left); the left side mirrors it
  const edge: [number, number][] = [
    [72, 22], [66, 64], [58, 90], [64, 104], [30, 132], [48, 146], [38, 160],
    [52, 174], [42, 194], [64, 212], [72, 240],
  ];
  const cx = 200;
  const right = edge.map(([dx, y]) => [cx + dx, y] as [number, number]);
  const left = [...edge].reverse().map(([dx, y]) => [cx - dx, y] as [number, number]);
  const d = `${smooth(right)}L${left[0][0]} ${left[0][1]}${smooth(left).replace(/^M[^C]+/, "")}Z`;
  return (
    <Frame width={400} height={260} label="The classic vase-and-faces picture: an orange vase in the middle whose two edges are also the profiles of two pale faces looking at each other.">
      <rect x={90} y={22} width={220} height={218} fill={PAPER2} stroke={RULE2} strokeWidth={1.4} />
      <path d={d} fill={SIGNAL} />
    </Frame>
  );
}

/* ==========================================================================
   SEMIOTICS
   ========================================================================== */

function Watch({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x - 12} y={y - 44} width={24} height={88} rx={6} fill={INK} />
      <circle cx={x} cy={y} r={25} fill={PAPER} stroke={INK} strokeWidth={4} />
      <circle cx={x} cy={y} r={19} fill="none" stroke={RULE2} strokeWidth={1} />
      <path d={`M${x} ${y}V${y - 14}M${x} ${y}L${x + 10} ${y + 5}`} stroke={INK} strokeWidth={2.2} strokeLinecap="round" />
      <rect x={x + 24} y={y - 4} width={6} height={8} rx={1.5} fill={INK} />
      <circle cx={x} cy={y} r={2} fill={SIGNAL} />
    </g>
  );
}

function Eagle({ x, y, fill = INK }: { x: number; y: number; fill?: string }) {
  // a bird in flight, wings raised, seen from the front
  return (
    <g transform={`translate(${x} ${y})`} fill={fill}>
      <path d="M-6 -6C-20 -14 -34 -26 -48 -32L-58 -32L-49 -27L-60 -22L-49 -19L-57 -12L-44 -11C-32 -5 -20 3 -6 6Z" />
      <path d="M6 -6C20 -14 34 -26 48 -32L58 -32L49 -27L60 -22L49 -19L57 -12L44 -11C32 -5 20 3 6 6Z" />
      <ellipse cx={0} cy={4} rx={8} ry={14} />
      <path d="M-5 14L-13 32L-4 29L0 34L4 29L13 32L5 14Z" />
      <circle cx={0} cy={-16} r={7} />
      <path d="M-2 -14L0 -6L3 -13Z" fill={SIGNAL} />
    </g>
  );
}

export function SemioticTriangle() {
  const obj = { x: 160, y: 290 };
  const sign = { x: 400, y: 100 };
  const intp = { x: 640, y: 290 };
  const R = 64;
  const edge = (a: { x: number; y: number }, b: { x: number; y: number }) => {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.hypot(dx, dy);
    return {
      x1: r2(a.x + (dx / len) * (R + 8)),
      y1: r2(a.y + (dy / len) * (R + 8)),
      x2: r2(b.x - (dx / len) * (R + 8)),
      y2: r2(b.y - (dy / len) * (R + 8)),
    };
  };
  return (
    <Frame
      height={420}
      label="A triangle of three circles. Bottom left, the object: a luxury watch. Top, the sign: an eagle in flight. Bottom right, the interpretant: a person, with freedom and prestige written beneath. Arrows run from the object up to the sign and from the sign down to the person; a dashed line joins the watch and the person."
    >
      <Arrow {...edge(obj, sign)} stroke={INK} />
      <Arrow {...edge(sign, intp)} stroke={SIGNAL} />
      <line {...edge(obj, intp)} stroke={RULE2} strokeWidth={1.4} strokeDasharray="4 5" />

      <circle cx={obj.x} cy={obj.y} r={R} fill={PAPER} stroke={INK} strokeWidth={1.8} />
      <Watch x={obj.x} y={obj.y} />
      <Key x={obj.x} y={obj.y + R + 28} anchor="middle" fill={INK} size={12}>
        OBJECT
      </Key>
      <Note x={obj.x} y={obj.y + R + 50} anchor="middle" fill={INK3}>
        the luxury watch
      </Note>

      <circle cx={sign.x} cy={sign.y} r={R} fill={PAPER} stroke={COUNTER} strokeWidth={1.8} />
      <Eagle x={sign.x} y={sign.y + 4} fill={COUNTER} />
      <Key x={sign.x + R + 20} y={sign.y - 4} fill={COUNTER} size={12}>
        SIGN
      </Key>
      <Note x={sign.x + R + 20} y={sign.y + 18} fill={INK3}>
        an image of an eagle
      </Note>

      <circle cx={intp.x} cy={intp.y} r={R} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.8} />
      <Person x={intp.x} y={intp.y + 36} s={1.05} fill={SIGNAL} />
      <Key x={intp.x} y={intp.y + R + 28} anchor="middle" fill={SIGNAL} size={12}>
        INTERPRETANT
      </Key>
      <Note x={intp.x} y={intp.y + R + 50} anchor="middle" fill={INK3}>
        freedom and prestige
      </Note>
    </Frame>
  );
}

/* ==========================================================================
   DISCUSSION
   ========================================================================== */

function ShapedBottle({ x, y, fill = COUNTER }: { x: number; y: number; fill?: string }) {
  // (x, y) is the base centre; a waisted, contoured bottle
  return (
    <path
      d={`M${x - 16} ${y}Q${x - 20} ${y - 22} ${x - 12} ${y - 36}Q${x - 6} ${y - 46} ${x - 14} ${y - 58}Q${x - 18} ${y - 70} ${x - 6} ${y - 82}V${y - 96}H${x + 6}V${y - 82}Q${x + 18} ${y - 70} ${x + 14} ${y - 58}Q${x + 6} ${y - 46} ${x + 12} ${y - 36}Q${x + 20} ${y - 22} ${x + 16} ${y}Z`}
      fill={fill}
    />
  );
}

export function SensorySignatures() {
  const card = { x: 400, y: 150, w: 190, h: 130 };
  const cues = [
    { x: 120, y: 78, label: "SIGNATURE SCENT" },
    { x: 120, y: 236, label: "DISTINCT JINGLE" },
    { x: 680, y: 78, label: "UNIQUE BOTTLE SHAPE" },
    { x: 680, y: 236, label: "SPECIFIC COLOR" },
  ];
  return (
    <Frame
      height={320}
      label="A blank brand card in the middle holding only a question mark: no name and no logo. Four cues point to it: a signature scent (a perfume bottle), a distinct jingle (notes), a unique bottle shape (a contoured bottle) and a specific color (a swatch)."
    >
      {cues.map((c) => {
        const toRight = c.x < card.x;
        const x1 = toRight ? c.x + 100 : c.x - 100;
        const x2 = toRight ? card.x - card.w / 2 - 12 : card.x + card.w / 2 + 12;
        const y2 = card.y + (c.y < card.y ? -24 : 24);
        return <Arrow key={c.label} x1={x1} y1={c.y - 4} x2={x2} y2={y2} stroke={COUNTER} dash="4 4" />;
      })}
      <SenseGlyph kind="smell" x={120} y={52} s={1.2} tone={COUNTER} />
      <SenseGlyph kind="sound" x={120} y={210} s={1.1} tone={COUNTER} />
      <ShapedBottle x={680} y={76} />
      <rect x={652} y={188} width={56} height={40} rx={4} fill={SIGNAL} />
      {cues.map((c) => (
        <Key key={c.label} x={c.x} y={c.y + (c.y < 150 ? 22 : 28) + (c.label === "UNIQUE BOTTLE SHAPE" ? 4 : 0)} anchor="middle" fill={INK} size={11}>
          {c.label}
        </Key>
      ))}

      <rect x={card.x - card.w / 2} y={card.y - card.h / 2} width={card.w} height={card.h} rx={10} fill={PAPER} stroke={INK} strokeWidth={2} />
      <rect x={card.x - card.w / 2 + 18} y={card.y + 34} width={card.w - 36} height={8} rx={4} fill={RULE} />
      <Display x={card.x} y={card.y + 18} anchor="middle" fill={COUNTER} size={64}>
        ?
      </Display>
      <Key x={card.x} y={card.y + card.h / 2 + 28} anchor="middle" fill={COUNTER} size={11}>
        BRAND RECALL
      </Key>
    </Frame>
  );
}
