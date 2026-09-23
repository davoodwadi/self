/* ==========================================================================
   Consumer Behavior · Week 03 — figures
   --------------------------------------------------------------------------
   Hand-drawn SVG plates for learning and memory. The drawing system (Frame,
   Key, Note, Display, Person, the palette) comes from Week 01 and the sense
   glyphs from Week 02, so the three weeks read as one book.

   Fixed cast for this week:
     · BrandMark: one teal badge is "the brand" on every plate, from the
       conditioning panels to the shelf to the forgetting curve.
     · Heart: the positive feeling a brand is paired with.
     · Node: a circle in the memory web. Lit nodes are SIGNAL.
     · Head: one profile, used on the title and wherever memory is inside
       the buyer.
     · Person: every human.

   INK is the neutral case, SIGNAL what is learned, lit or recalled, COUNTER
   the brand itself. Labels reuse the words of the slide they sit on.
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
import { SenseGlyph } from "../week2/visuals";

const GREEN = "var(--affirm)";
/** Plates sit in paper-2 wells, so a filled zone needs the next step down. */
const PAPER3 = "var(--paper-3)";
const SERIF = "var(--font-heading)";
const BODY = "var(--font-body)";

const r2 = (n: number) => Math.round(n * 100) / 100;

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

/** Quadratic arrow from (x1, y1) to (x2, y2) bending through control (cx, cy). */
function CurveArrow({
  x1,
  y1,
  cx,
  cy,
  x2,
  y2,
  stroke = INK,
  width = 1.8,
  dash,
}: {
  x1: number;
  y1: number;
  cx: number;
  cy: number;
  x2: number;
  y2: number;
  stroke?: string;
  width?: number;
  dash?: string;
}) {
  return (
    <g fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round">
      <path d={`M${x1} ${y1}Q${cx} ${cy} ${x2} ${y2}`} strokeDasharray={dash} />
      <path d={headAlong(x2, y2, x2 - cx, y2 - cy, 9)} />
    </g>
  );
}

function Heart({ x, y, s = 1, fill = SIGNAL, opacity }: { x: number; y: number; s?: number; fill?: string; opacity?: number }) {
  // (x, y) is the centre; 24 units wide at s = 1.
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0 9C-4 5-12 1-12-5A6 6 0 0 1 0-8A6 6 0 0 1 12-5C12 1 4 5 0 9Z"
      fill={fill}
      opacity={opacity}
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

/** Thought bubble with two trailing dots toward (tx, ty). */
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
  const ax = r2(x + (tx - x) * 0.62);
  const ay = r2(y + (ty - y) * 0.62);
  const bx = r2(x + (tx - x) * 0.84);
  const by = r2(y + (ty - y) * 0.84);
  return (
    <g fill={PAPER} stroke={stroke} strokeWidth={1.6}>
      <ellipse cx={x} cy={y} rx={rx} ry={ry} />
      <circle cx={ax} cy={ay} r={5} />
      <circle cx={bx} cy={by} r={3} />
    </g>
  );
}

/* -- the cast ------------------------------------------------------------ */

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

/** The brand mark on its own, for the rows of a slide. */
export function BrandBadge() {
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14 shrink-0" aria-hidden>
      <BrandMark x={32} y={32} s={1.3} />
    </svg>
  );
}

/** A carton on a shelf. (x, bottom) is the centre of its base. */
function Pack({
  x,
  bottom,
  w = 44,
  h = 60,
  fill = PAPER2,
  stroke = RULE2,
  mark = false,
  opacity,
}: {
  x: number;
  bottom: number;
  w?: number;
  h?: number;
  fill?: string;
  stroke?: string;
  mark?: boolean;
  opacity?: number;
}) {
  return (
    <g opacity={opacity}>
      <rect x={r2(x - w / 2)} y={bottom - h} width={w} height={h} rx={3} fill={fill} stroke={stroke} strokeWidth={1.6} />
      {mark ? <BrandMark x={x} y={r2(bottom - h / 2)} s={r2((w * 0.55) / 36)} fill={PAPER} /> : null}
      {mark ? (
        <path
          d={`M${r2(x - w * 0.18)} ${r2(bottom - h / 2 + w * 0.03)}q${r2(w * 0.09)} ${r2(-w * 0.18)} ${r2(w * 0.18)} 0t${r2(w * 0.18)} ${r2(-w * 0.09)}`}
          fill="none"
          stroke={fill}
          strokeWidth={r2(w * 0.07)}
          strokeLinecap="round"
        />
      ) : null}
    </g>
  );
}

/** A memory node. */
function Node({
  x,
  y,
  r = 7,
  lit = false,
  fill,
  opacity,
}: {
  x: number;
  y: number;
  r?: number;
  lit?: boolean;
  fill?: string;
  opacity?: number;
}) {
  return (
    <g opacity={opacity}>
      {lit ? <circle cx={x} cy={y} r={r2(r * 2.1)} fill={SIGNAL_TINT} /> : null}
      <circle cx={x} cy={y} r={r} fill={fill ?? (lit ? SIGNAL : PAPER)} stroke={lit ? SIGNAL : INK3} strokeWidth={1.6} />
    </g>
  );
}

/** A head in profile, facing right. Drawn in a 360 × 400 box. */
const HEAD =
  "M118 392C112 340 74 300 72 222C70 118 146 52 222 56C292 60 322 116 314 166L340 214Q344 222 334 224L318 226L322 244L314 252L320 266Q318 296 266 300L256 334L258 392Z";

function Head({
  x = 0,
  y = 0,
  s = 1,
  stroke = INK,
  fill = PAPER,
}: {
  x?: number;
  y?: number;
  s?: number;
  stroke?: string;
  fill?: string;
}) {
  return (
    <path
      d={HEAD}
      transform={`translate(${x} ${y}) scale(${s})`}
      fill={fill}
      stroke={stroke}
      strokeWidth={r2(2.4 / s)}
      strokeLinejoin="round"
    />
  );
}

/** A smiling, calm or frowning face. */
function Face({
  x,
  y,
  r = 18,
  mood,
  stroke = INK,
  fill = PAPER,
}: {
  x: number;
  y: number;
  r?: number;
  mood: "happy" | "sad";
  stroke?: string;
  fill?: string;
}) {
  const m = mood === "happy" ? `M${r2(x - r * 0.45)} ${r2(y + r * 0.2)}Q${x} ${r2(y + r * 0.7)} ${r2(x + r * 0.45)} ${r2(y + r * 0.2)}` : `M${r2(x - r * 0.42)} ${r2(y + r * 0.55)}Q${x} ${r2(y + r * 0.12)} ${r2(x + r * 0.42)} ${r2(y + r * 0.55)}`;
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={fill} stroke={stroke} strokeWidth={2} />
      <circle cx={r2(x - r * 0.35)} cy={r2(y - r * 0.2)} r={r2(r * 0.1)} fill={stroke} />
      <circle cx={r2(x + r * 0.35)} cy={r2(y - r * 0.2)} r={r2(r * 0.1)} fill={stroke} />
      <path d={m} fill="none" stroke={stroke} strokeWidth={2} strokeLinecap="round" />
    </g>
  );
}

/** Upbeat music: Week 02's sound glyph. */
function Music({ x, y, s = 1, tone = INK }: { x: number; y: number; s?: number; tone?: string }) {
  return <SenseGlyph kind="sound" x={x} y={y} s={s} tone={tone} />;
}

/* ==========================================================================
   TITLE · the brand lives in the head
   ========================================================================== */

const TITLE_NODES: [number, number][] = [
  [196, 178],
  [140, 140],
  [150, 222],
  [214, 110],
  [262, 150],
  [250, 226],
  [110, 184],
  [186, 258],
  [276, 196],
];
const TITLE_LINKS: [number, number][] = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 5],
  [1, 6],
  [2, 6],
  [2, 7],
  [5, 7],
  [4, 8],
  [5, 8],
  [1, 3],
  [3, 4],
];

export function BrainBrands() {
  return (
    <Frame
      width={360}
      height={400}
      label="A head in profile. Inside it, a web of connected memory nodes, with the teal brand badge at the centre and the links around it lit."
    >
      <Head />
      {TITLE_LINKS.map(([a, b]) => {
        const lit = a === 0;
        return (
          <line
            key={`${a}-${b}`}
            x1={TITLE_NODES[a][0]}
            y1={TITLE_NODES[a][1]}
            x2={TITLE_NODES[b][0]}
            y2={TITLE_NODES[b][1]}
            stroke={lit ? SIGNAL : RULE2}
            strokeWidth={lit ? 2 : 1.4}
          />
        );
      })}
      {TITLE_NODES.slice(1).map(([x, y], i) => (
        <Node key={i} x={x} y={y} r={7} lit={i < 5} />
      ))}
      <BrandMark x={TITLE_NODES[0][0]} y={TITLE_NODES[0][1]} s={1.05} />
    </Frame>
  );
}

/* ==========================================================================
   WHAT IS CONSUMER LEARNING?
   ========================================================================== */

/** A permanent change in behaviour: picks wander, then lock onto one brand. */
export function ExperienceChanges() {
  const rows = [96, 150, 204];
  const before = [2, 1, 2, 1, 2, 1];
  const bx = before.map((_, i) => 150 + i * 44);
  const ax = Array.from({ length: 7 }, (_, i) => 470 + i * 46);
  const path = (xs: number[], rs: number[]) => xs.map((x, i) => `${i ? "L" : "M"}${x} ${rows[rs[i]]}`).join("");
  return (
    <Frame
      height={290}
      label="A chart of shopping trips over time with three product rows; the top row is the teal brand. Before the experience, each trip's pick jumps between the two grey products. At a line marked experience, with a heart, the picks move to the brand and stay there for every trip after."
    >
      <Key x={276} y={36} anchor="middle" fill={INK3}>
        BEFORE
      </Key>
      <Key x={608} y={36} anchor="middle" fill={SIGNAL}>
        AFTER
      </Key>
      {rows.map((y) => (
        <line key={y} x1={110} y1={y} x2={770} y2={y} stroke={RULE} strokeDasharray="2 5" />
      ))}
      <BrandMark x={60} y={rows[0]} s={0.9} />
      <Pack x={60} bottom={rows[1] + 20} w={30} h={40} />
      <Pack x={60} bottom={rows[2] + 20} w={30} h={40} fill={PAPER} />

      <path d={path(bx, before)} fill="none" stroke={INK3} strokeWidth={1.4} />
      {bx.map((x, i) => (
        <Pack key={x} x={x} bottom={rows[before[i]] + 13} w={18} h={26} fill={before[i] === 1 ? PAPER2 : PAPER} stroke={INK3} />
      ))}

      <line x1={420} y1={88} x2={420} y2={236} stroke={INK} strokeWidth={1.6} />
      <Heart x={420} y={70} s={1.3} />
      <Key x={420} y={258} anchor="middle" fill={INK}>
        EXPERIENCE
      </Key>
      <path d={`M${bx[bx.length - 1] + 12} ${rows[1] - 6}L${ax[0] - 14} ${rows[0] + 4}`} fill="none" stroke={INK3} strokeWidth={1.4} strokeDasharray="3 4" />

      <line x1={ax[0]} y1={rows[0]} x2={ax[ax.length - 1]} y2={rows[0]} stroke={SIGNAL} strokeWidth={2.4} />
      {ax.map((x) => (
        <BrandMark key={x} x={x} y={rows[0]} s={0.5} />
      ))}

      <Arrow x1={110} y1={278} x2={770} y2={278} stroke={INK3} width={1.2} />
      <Key x={770} y={268} anchor="end" fill={INK3}>
        TIME
      </Key>
    </Frame>
  );
}

/** A snack packet, pillow-shaped with crimped ends; (x, y) is its centre. */
function Snack({ x, y, s = 1, fill = COUNTER }: { x: number; y: number; s?: number; fill?: string }) {
  const teeth = (from: number, dir: 1 | -1, yy: number, tip: number) =>
    Array.from({ length: 6 }, (_, i) => `L${r2(from + dir * (i * 7.2 + 3.6))} ${tip}L${r2(from + dir * (i + 1) * 7.2)} ${yy}`).join("");
  const d = `M-18 -24${teeth(-18, 1, -24, -30)}Q23 0 18 24${teeth(18, -1, 24, 30)}Q-23 0 -18 -24Z`;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d={d} fill={fill} stroke={fill} strokeWidth={1.5} strokeLinejoin="round" />
      <line x1={-17} y1={-17} x2={17} y2={-17} stroke={PAPER} strokeWidth={1.2} opacity={0.5} />
      <line x1={-17} y1={17} x2={17} y2={17} stroke={PAPER} strokeWidth={1.2} opacity={0.5} />
      <circle r={9} fill={PAPER} />
      <path d="M-5 2Q-2.5 -5 0 0T5 -2.5" fill="none" stroke={fill} strokeWidth={2.2} strokeLinecap="round" />
    </g>
  );
}

/** Direct experience: you try the snack and like it. */
export function DirectTry() {
  return (
    <Frame width={400} height={220} label="A person holds up a snack packet they are eating from; a heart floats between their head and the packet.">
      <Key x={24} y={30} fill={SIGNAL}>
        DIRECT
      </Key>
      <Person x={160} y={204} s={1.6} />
      <line x1={176} y1={150} x2={214} y2={128} stroke={INK} strokeWidth={9} strokeLinecap="round" />
      <Snack x={236} y={118} s={1.15} />
      <Heart x={206} y={56} s={1.4} />
      <line x1={20} y1={204} x2={380} y2={204} stroke={RULE2} />
    </Frame>
  );
}

/** A running shoe in side view, toe to the right; (x, y) is the sole centre. */
function Shoe({ x, y, s = 1, fill = INK }: { x: number; y: number; s?: number; fill?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-26 -4L-24 -24Q-16 -28 -10 -20Q-2 -14 8 -12Q22 -10 26 -2L26 0H-26Z" fill={fill} />
      <rect x={-27} y={-1} width={55} height={7} rx={3.5} fill={PAPER} stroke={fill} strokeWidth={2} />
      {[-6, 0, 6].map((dx) => (
        <line key={dx} x1={dx - 4} y1={-17 + dx * 0.3} x2={dx + 2} y2={-12 + dx * 0.3} stroke={PAPER} strokeWidth={1.8} strokeLinecap="round" />
      ))}
    </g>
  );
}

/** Indirect experience: an ad on a screen, a friend with new running shoes. */
export function IndirectWatch() {
  return (
    <Frame
      width={400}
      height={220}
      label="A person in the middle watches two things: on the left, a screen showing an ad for a running shoe; on the right, a friend holding up a new running shoe. Dashed sight lines run to both."
    >
      <Key x={24} y={30} fill={SIGNAL}>
        INDIRECT
      </Key>
      {/* the ad */}
      <rect x={24} y={60} width={110} height={74} rx={5} fill={INK} />
      <Shoe x={79} y={108} s={1.2} fill={PAPER} />
      <rect x={71} y={134} width={16} height={20} fill={INK} />
      <rect x={52} y={152} width={54} height={5} rx={2} fill={INK} />
      {/* the viewer */}
      <Person x={200} y={204} s={1.5} />
      <line x1={186} y1={100} x2={140} y2={98} stroke={INK3} strokeWidth={1.4} strokeDasharray="3 4" />
      <line x1={214} y1={100} x2={290} y2={112} stroke={INK3} strokeWidth={1.4} strokeDasharray="3 4" />
      {/* the friend */}
      <Person x={344} y={204} s={1.5} fill={COUNTER} />
      <line x1={330} y1={150} x2={312} y2={132} stroke={COUNTER} strokeWidth={8} strokeLinecap="round" />
      <Shoe x={306} y={122} s={1} fill={SIGNAL} />
      <line x1={20} y1={204} x2={380} y2={204} stroke={RULE2} />
    </Frame>
  );
}

/** Ongoing: a new product slots into what the consumer already knows. */
export function UpdateLoop() {
  return (
    <Frame
      width={400}
      height={220}
      label="A person with a thought bubble holding three familiar products and one empty dashed slot. From the shelf on the right, a new orange product tagged new moves up into the empty slot."
    >
      <Person x={62} y={204} s={1.5} />
      <g fill={PAPER} stroke={INK} strokeWidth={1.6}>
        <ellipse cx={224} cy={74} rx={112} ry={48} />
        <circle cx={104} cy={114} r={5} />
        <circle cx={88} cy={124} r={3} />
      </g>
      <Pack x={150} bottom={94} w={30} h={40} />
      <BrandMark x={194} y={74} s={0.82} />
      <Pack x={238} bottom={94} w={30} h={40} fill={PAPER} />
      <rect x={267} y={54} width={34} height={40} rx={3} fill="none" stroke={SIGNAL} strokeWidth={1.6} strokeDasharray="4 3" />
      {/* the new product */}
      <line x1={300} y1={204} x2={380} y2={204} stroke={INK} strokeWidth={2} />
      <Pack x={344} bottom={204} w={34} h={46} fill={SIGNAL} stroke={SIGNAL} />
      <rect x={322} y={140} width={44} height={16} rx={3} fill={INK} />
      <Key x={344} y={152} anchor="middle" fill={PAPER} size={9} weight={700}>
        NEW
      </Key>
      <CurveArrow x1={346} y1={134} cx={336} cy={104} x2={308} y2={92} stroke={SIGNAL} />
      <line x1={20} y1={204} x2={290} y2={204} stroke={RULE2} />
    </Frame>
  );
}

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

/** An automatic habit: seven days, the same pick. */
export function HabitWeek() {
  return (
    <Frame
      height={170}
      label="Seven columns, Monday to Sunday. Each shows the same small shelf of three products, and every day the teal brand in the middle is the one ticked."
    >
      {DAYS.map((d, i) => {
        const x = 70 + i * 110;
        return (
          <g key={d}>
            <Key x={x} y={30} anchor="middle" fill={INK3}>
              {d}
            </Key>
            <Pack x={x - 32} bottom={108} w={26} h={40} />
            <Pack x={x + 32} bottom={108} w={26} h={40} fill={PAPER} />
            <BrandMark x={x} y={86} s={0.9} />
            <line x1={x - 50} y1={109} x2={x + 50} y2={109} stroke={INK} strokeWidth={1.8} />
            <path d={`M${x - 9} ${136}l6 7l13 -15`} fill="none" stroke={SIGNAL} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );
      })}
    </Frame>
  );
}

/* ==========================================================================
   CLASSICAL CONDITIONING
   ========================================================================== */

/** A hand bell; (x, y) is the centre of the mouth. */
function Bell({ x, y, s = 1, fill = INK }: { x: number; y: number; s?: number; fill?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-4} y={-58} width={8} height={16} rx={3} fill={fill} />
      <path d="M-24 0Q-22 -44 0 -44Q22 -44 24 0Z" fill={fill} />
      <rect x={-28} y={-3} width={56} height={6} rx={3} fill={fill} />
      <circle cy={9} r={5.5} fill={fill} />
    </g>
  );
}

/** Pavlov's set-up: a dog, a bowl of meat powder, a bell. */
export function Pavlov() {
  return (
    <Frame
      width={400}
      height={230}
      label="A dog stands facing a bowl of meat powder, drooling. Above the bowl a bell is ringing."
    >
      <Bell x={96} y={96} s={0.9} />
      {[0, 1].map((i) => (
        <path
          key={i}
          d={`M${128 + i * 10} ${52 - i * 4}q${10 + i * 4} ${16 + i * 4} 0 ${36 + i * 8}`}
          fill="none"
          stroke={SIGNAL}
          strokeWidth={2}
          strokeLinecap="round"
        />
      ))}

      {/* bowl */}
      <path d="M68 196Q92 186 116 196Z" fill={SIGNAL} />
      <path d="M62 196H122Q118 214 92 214Q66 214 62 196Z" fill={PAPER} stroke={INK} strokeWidth={2} strokeLinejoin="round" />

      {/* dog, facing left */}
      <g fill={INK}>
        <path d="M312 140Q350 128 346 98" fill="none" stroke={INK} strokeWidth={7} strokeLinecap="round" />
        <ellipse cx={270} cy={150} rx={56} ry={24} />
        <path d="M222 148L200 100L232 94L248 136Z" />
        <circle cx={208} cy={98} r={21} />
        <rect x={166} y={96} width={36} height={22} rx={9} />
        {[226, 244, 296, 314].map((x) => (
          <rect key={x} x={x - 5} y={160} width={10} height={54} rx={4} />
        ))}
      </g>
      <path d="M212 82Q232 82 228 124Q220 124 214 104Z" fill={INK} stroke={PAPER} strokeWidth={1.6} strokeLinejoin="round" />
      <circle cx={202} cy={92} r={2.8} fill={PAPER} />
      <path d="M178 120Q184 132 178 138Q172 132 178 120Z" fill={SIGNAL} />
      <line x1={20} y1={214} x2={380} y2={214} stroke={RULE2} />
    </Frame>
  );
}

/** Music + logo, paired until the logo alone brings the feeling. */
export function ConditioningFlow() {
  const cy = 168;
  return (
    <Frame
      height={340}
      label="Three panels over time. One: upbeat music leads naturally to a heart, a positive feeling. Two: a card showing the music plus the teal brand logo, stacked three deep for repetition, leads to the heart. Three: the brand logo alone leads to the heart; this is the conditioned response."
    >
      {[270, 530].map((x) => (
        <line key={x} x1={x} y1={20} x2={x} y2={270} stroke={RULE} strokeDasharray="3 5" />
      ))}
      {[
        { x: 140, n: "1", t: "UNCONDITIONED STIMULUS" },
        { x: 400, n: "2", t: "PAIRED, REPEATEDLY" },
        { x: 660, n: "3", t: "CONDITIONED RESPONSE" },
      ].map((h) => (
        <g key={h.n}>
          <Display x={h.x} y={46} anchor="middle" size={24} fill={h.n === "3" ? SIGNAL : INK}>
            {h.n}
          </Display>
          <Key x={h.x} y={72} anchor="middle" fill={h.n === "3" ? SIGNAL : INK3}>
            {h.t}
          </Key>
        </g>
      ))}

      {/* 1 · music → feeling */}
      <Music x={70} y={cy} s={1.35} />
      <Note x={138} y={cy - 14} anchor="middle" size={12} italic fill={INK3}>
        naturally
      </Note>
      <Arrow x1={110} y1={cy} x2={166} y2={cy} />
      <Heart x={206} y={cy} s={1.5} />

      {/* 2 · music + logo, repeated */}
      {[2, 1].map((k) => (
        <rect key={k} x={290 + k * 8} y={cy - 44 - k * 8} width={130} height={88} rx={8} fill={PAPER} stroke={RULE2} strokeWidth={1.4} />
      ))}
      <rect x={290} y={cy - 44} width={130} height={88} rx={8} fill={PAPER} stroke={INK} strokeWidth={1.6} />
      <Music x={324} y={cy} s={0.95} />
      <Display x={356} y={cy + 9} anchor="middle" size={24} fill={INK3}>
        +
      </Display>
      <BrandMark x={388} y={cy} s={0.95} />
      <Arrow x1={434} y1={cy} x2={460} y2={cy} />
      <Heart x={492} y={cy} s={1.5} />
      <Key x={355} y={236} anchor="middle" fill={INK3}>
        × MANY TIMES
      </Key>

      {/* 3 · logo alone → feeling */}
      <BrandMark x={592} y={cy} s={1.35} />
      <Arrow x1={626} y1={cy} x2={684} y2={cy} stroke={SIGNAL} width={2.2} />
      <Heart x={724} y={cy} s={1.5} />

      <Arrow x1={40} y1={304} x2={760} y2={304} stroke={INK3} width={1.2} />
      <Key x={400} y={328} anchor="middle" fill={INK3}>
        OVER TIME
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   REPETITION AND STIMULUS GENERALIZATION
   ========================================================================== */

/** Link strength across repeated exposures: builds, then wears out. */
function repetitionPath() {
  const x0 = 100;
  const dx = 56;
  const y = (L: number) => r2(262 - L * 190);
  let L = 0;
  let d = `M${x0} ${y(0)}`;
  const peaks: { x: number; y: number }[] = [];
  for (let i = 0; i < 12; i++) {
    const x = x0 + i * dx;
    const worn = i >= 7;
    const peak = worn ? L + 0.04 : L + 0.38 * (1 - L);
    const keep = worn ? 0.86 : 0.9;
    d += `L${x} ${y(peak)}`;
    peaks.push({ x, y: y(peak) });
    for (let t = 1; t <= 5; t++) {
      const f = t / 5;
      d += `L${r2(x + f * dx)} ${y(peak * (1 - (1 - keep) * Math.sqrt(f)))}`;
    }
    L = peak * keep;
  }
  return { d, peaks };
}

export function RepetitionCurve() {
  const { d, peaks } = repetitionPath();
  const decay = Array.from({ length: 13 }, (_, i) => {
    const f = i / 12;
    return `${i ? "L" : "M"}${r2(100 + f * 260)} ${r2(262 - 0.38 * 190 * Math.pow(1 - f, 2))}`;
  }).join("");
  const wear = 100 + 7 * 56 - 14;
  return (
    <Frame
      height={320}
      label="A line of link strength over repeated exposures. Each exposure bumps the line up and it sags between them; the bumps build the line higher. A dashed line after only one exposure sinks back to nothing: memory decay. Past the seventh exposure, a shaded zone marked wear-out: the bumps barely register and the line falls."
    >
      <rect x={wear} y={40} width={770 - wear} height={222} fill={PAPER3} />
      <Key x={wear + 16} y={62} fill={COUNTER}>
        WEAR-OUT
      </Key>
      <Note x={wear + 16} y={82} size={12} italic fill={INK3}>
        tune out, get annoyed
      </Note>
      <Key x={110} y={62} fill={SIGNAL}>
        STRENGTHEN THE LINK
      </Key>

      <line x1={80} y1={262} x2={770} y2={262} stroke={INK} strokeWidth={1.4} />
      <path d={decay} fill="none" stroke={INK3} strokeWidth={1.6} strokeDasharray="4 4" />
      <Key x={112} y={254} fill={INK3} size={9.5}>
        MEMORY DECAY
      </Key>
      <path d={d} fill="none" stroke={SIGNAL} strokeWidth={2.4} strokeLinejoin="round" />
      {peaks.map((p, i) => (
        <rect key={i} x={p.x - 5} y={272} width={10} height={14} rx={2} fill={i >= 7 ? INK3 : INK} />
      ))}
      <Key x={100} y={308} fill={INK3}>
        REPEATED EXPOSURES →
      </Key>
    </Frame>
  );
}

/** A cereal box with a band, a wordmark and a bowl. */
function Box({
  x,
  bottom,
  w = 96,
  h = 130,
  body,
  band,
  word,
  font = SERIF,
  italic = false,
  wordFill = PAPER,
  stroke,
  seal = false,
  bowl = PAPER,
  dots,
}: {
  x: number;
  bottom: number;
  w?: number;
  h?: number;
  bowl?: string;
  dots?: string;
  body: string;
  band: string;
  word: string;
  font?: string;
  italic?: boolean;
  wordFill?: string;
  stroke?: string;
  seal?: boolean;
}) {
  const left = x - w / 2;
  const top = bottom - h;
  return (
    <g>
      <rect x={left} y={top} width={w} height={h} rx={3} fill={body} stroke={stroke ?? body} strokeWidth={1.6} />
      <rect x={left} y={top + 14} width={w} height={34} fill={band} />
      <text
        x={x}
        y={top + 38}
        textAnchor="middle"
        fontFamily={font}
        fontSize={font === SERIF ? 20 : 18}
        fontWeight={font === SERIF ? 700 : 500}
        fontStyle={italic ? "italic" : undefined}
        fill={wordFill}
      >
        {word}
      </text>
      <path
        d={`M${r2(x - w * 0.3)} ${bottom - 40}H${r2(x + w * 0.3)}Q${r2(x + w * 0.28)} ${bottom - 14} ${x} ${bottom - 14}Q${r2(x - w * 0.28)} ${bottom - 14} ${r2(x - w * 0.3)} ${bottom - 40}Z`}
        fill={bowl}
        opacity={0.9}
      />
      {[-0.16, 0, 0.16].map((f) => (
        <circle key={f} cx={r2(x + w * f)} cy={bottom - 46} r={6} fill={dots ?? band} />
      ))}
      {seal ? (
        <g>
          <circle cx={r2(left + w - 14)} cy={top - 2} r={14} fill={PAPER} stroke={band} strokeWidth={2} />
          <Star x={r2(left + w - 14)} y={top - 2} R={8} fill={band} />
        </g>
      ) : null}
    </g>
  );
}

/** Similar packaging, similar response: a generalization gradient. */
export function GeneralizationChart() {
  const packs = [
    { body: SIGNAL, band: INK, word: "Crisp", font: SERIF, wordFill: PAPER },
    { body: SIGNAL, band: INK, word: "Crispy", font: SERIF, wordFill: PAPER },
    { body: SIGNAL, band: PAPER, word: "Oaty", font: BODY, wordFill: INK, dots: INK3 },
    { body: COUNTER, band: PAPER, word: "Oaty", font: BODY, wordFill: COUNTER, dots: INK3 },
    { body: PAPER, band: PAPER3, word: "oats", font: BODY, wordFill: INK3, stroke: RULE2, bowl: PAPER3, dots: RULE2 },
  ];
  const resp = [1, 0.86, 0.52, 0.24, 0.07];
  const xs = [100, 250, 400, 550, 700];
  return (
    <Frame
      height={400}
      label="Five cereal boxes in a row, from the national brand leader to a box that looks nothing like it. The store brand next to the leader copies its colours and font. A bar above each box shows how strongly it triggers the same learned response: full for the leader, nearly full for the store brand, then shrinking as the boxes look less similar."
    >
      <Key x={40} y={30} fill={SIGNAL}>
        SAME LEARNED RESPONSE
      </Key>
      <line x1={40} y1={172} x2={760} y2={172} stroke={RULE2} />
      {xs.map((x, i) => {
        const h = r2(resp[i] * 124);
        return (
          <g key={x}>
            <rect x={x - 22} y={r2(172 - h)} width={44} height={h} fill={SIGNAL} opacity={i < 2 ? 1 : 0.55} />
            <Box x={x} bottom={330} {...packs[i]} />
          </g>
        );
      })}
      <line x1={40} y1={331} x2={760} y2={331} stroke={INK} strokeWidth={1.6} />
      <Key x={100} y={354} anchor="middle" fill={INK}>
        NATIONAL
      </Key>
      <Key x={100} y={370} anchor="middle" fill={INK}>
        BRAND LEADER
      </Key>
      <Key x={250} y={354} anchor="middle" fill={SIGNAL}>
        STORE BRAND
      </Key>
      <Arrow x1={330} y1={362} x2={760} y2={362} stroke={INK3} width={1.2} />
      <Key x={545} y={386} anchor="middle" fill={INK3}>
        LESS SIMILAR
      </Key>
    </Frame>
  );
}

/** The store brand copies the leader's package colours and fonts. */
export function CopyCat() {
  return (
    <Frame
      width={400}
      height={250}
      label="The national brand's cereal box and the store brand's box side by side. Dashed lines join their matching colours and their matching fonts."
    >
      <Box x={80} bottom={212} body={SIGNAL} band={INK} word="Crisp" />
      <Box x={320} bottom={212} body={SIGNAL} band={INK} word="Crispy" />
      <Key x={80} y={236} anchor="middle" fill={INK} size={9.5}>
        NATIONAL BRAND
      </Key>
      <Key x={320} y={236} anchor="middle" fill={SIGNAL} size={9.5}>
        STORE BRAND
      </Key>
      <line x1={134} y1={113} x2={266} y2={113} stroke={INK} strokeWidth={1.4} strokeDasharray="3 4" />
      <Key x={200} y={105} anchor="middle" fill={INK}>
        FONTS
      </Key>
      <line x1={134} y1={170} x2={266} y2={170} stroke={SIGNAL} strokeWidth={1.4} strokeDasharray="3 4" />
      <Key x={200} y={162} anchor="middle" fill={SIGNAL}>
        COLORS
      </Key>
    </Frame>
  );
}

/** Discrimination: the leader teaches you its one unique difference. */
export function SpotTheDifference() {
  return (
    <Frame
      width={400}
      height={250}
      label="The same two boxes, but the national brand's box carries a star seal on its corner that the store brand lacks. A magnifying glass circles the seal."
    >
      <Box x={80} bottom={212} body={SIGNAL} band={INK} word="Crisp" seal />
      <Box x={320} bottom={212} body={SIGNAL} band={INK} word="Crispy" />
      <circle cx={114} cy={80} r={25} fill="none" stroke={COUNTER} strokeWidth={3} />
      <line x1={132} y1={98} x2={152} y2={118} stroke={COUNTER} strokeWidth={6} strokeLinecap="round" />
      <circle cx={354} cy={80} r={14} fill="none" stroke={COUNTER} strokeWidth={1.6} strokeDasharray="3 3" />
      <Key x={200} y={60} anchor="middle" fill={COUNTER}>
        UNIQUE
      </Key>
      <Key x={200} y={76} anchor="middle" fill={COUNTER}>
        DIFFERENCE
      </Key>
      <Key x={80} y={236} anchor="middle" fill={INK} size={9.5}>
        NATIONAL BRAND
      </Key>
      <Key x={320} y={236} anchor="middle" fill={INK3} size={9.5}>
        STORE BRAND
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   INSTRUMENTAL CONDITIONING
   ========================================================================== */

/** A round outcome token with a plus or a minus. */
function Outcome({ x, y, good }: { x: number; y: number; good: boolean }) {
  return (
    <g>
      <circle cx={x} cy={y} r={22} fill={good ? SIGNAL : INK} />
      <line x1={x - 10} y1={y} x2={x + 10} y2={y} stroke={PAPER} strokeWidth={4} strokeLinecap="round" />
      {good ? <line x1={x} y1={y - 10} x2={x} y2={y + 10} stroke={PAPER} strokeWidth={4} strokeLinecap="round" /> : null}
    </g>
  );
}

/** Behaviour → outcome → what is learned. */
export function InstrumentalMatrix() {
  const rows = [
    { y: 92, good: true, tint: SIGNAL_TINT },
    { y: 212, good: false, tint: PAPER3 },
  ];
  return (
    <Frame
      height={280}
      label="Two rows. Top: a person's behaviour leads to a plus sign, a positive outcome, and the word perform. Bottom: the same behaviour leads to a minus sign, a negative outcome, and the word avoid."
    >
      {[
        { x: 110, t: "BEHAVIOR" },
        { x: 380, t: "OUTCOME" },
        { x: 640, t: "LEARNED" },
      ].map((h) => (
        <Key key={h.t} x={h.x} y={28} anchor="middle" fill={INK3}>
          {h.t}
        </Key>
      ))}
      {rows.map((r) => (
        <g key={r.y}>
          <rect x={30} y={r.y - 50} width={740} height={100} rx={6} fill={r.tint} />
          <Person x={110} y={r.y + 44} s={1.35} />
          <Arrow x1={160} y1={r.y} x2={330} y2={r.y} />
          <Outcome x={380} y={r.y} good={r.good} />
          <Arrow x1={430} y1={r.y} x2={560} y2={r.y} stroke={r.good ? SIGNAL : INK} />
          <Display x={640} y={r.y + 10} anchor="middle" size={30} fill={r.good ? SIGNAL : INK}>
            {r.good ? "Perform" : "Avoid"}
          </Display>
        </g>
      ))}
    </Frame>
  );
}

/** Positive reinforcement: a loyalty card filling up and a thank-you discount. */
export function LoyaltyPoints() {
  return (
    <Frame
      width={400}
      height={200}
      label="A loyalty card with eight stamp spots, six filled with stars, next to a thank-you tag reading minus ten per cent."
    >
      <rect x={24} y={38} width={210} height={124} rx={10} fill={PAPER} stroke={INK} strokeWidth={2} />
      <BrandMark x={52} y={68} s={0.62} />
      <rect x={76} y={62} width={90} height={8} rx={4} fill={RULE2} />
      {Array.from({ length: 8 }, (_, i) => {
        const x = 52 + (i % 4) * 50;
        const y = 108 + Math.floor(i / 4) * 34;
        return i < 6 ? (
          <Star key={i} x={x} y={y} R={11} />
        ) : (
          <circle key={i} cx={x} cy={y} r={11} fill="none" stroke={RULE2} strokeWidth={1.6} strokeDasharray="3 3" />
        );
      })}
      {/* tag */}
      <path d="M266 84L296 50H382V118H296Z" fill={SIGNAL} />
      <circle cx={284} cy={84} r={5} fill={PAPER} />
      <Key x={340} y={76} anchor="middle" fill={PAPER} size={9}>
        THANK YOU
      </Key>
      <Display x={340} y={104} anchor="middle" size={22} fill={PAPER}>
        −10%
      </Display>
    </Frame>
  );
}

/** Negative reinforcement: medicine removes the headache. */
export function HeadacheGone() {
  const zig = (cx: number, cy: number) =>
    [-1, 1].map((side) => (
      <path
        key={side}
        d={`M${cx + side * 18} ${cy - 20}l${side * 8} -8l${side * 2} 10l${side * 8} -8`}
        fill="none"
        stroke={SIGNAL}
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ));
  return (
    <Frame
      width={400}
      height={200}
      label="On the left a person with jagged pain lines at the head. An arrow passes through a pill to the same person on the right, calm, with the pain lines gone."
    >
      <Person x={70} y={186} s={1.5} />
      {zig(70, 98)}
      <Arrow x1={120} y1={126} x2={278} y2={126} />
      <g transform="translate(200 126) rotate(-30)">
        <rect x={-26} y={-12} width={52} height={24} rx={12} fill={PAPER} stroke={INK} strokeWidth={2} />
        <path d="M0 -12H-14A12 12 0 0 0 -14 12H0Z" fill={COUNTER} />
        <rect x={-26} y={-12} width={52} height={24} rx={12} fill="none" stroke={INK} strokeWidth={2} />
      </g>
      <Person x={330} y={186} s={1.5} />
      <line x1={20} y1={186} x2={380} y2={186} stroke={RULE2} />
    </Frame>
  );
}

/** Punishment: a late fee lands after the due date. */
export function LateFee() {
  return (
    <Frame
      width={400}
      height={200}
      label="A calendar page with the due date circled and the next days crossed off, and a bill with a stamp that reads late fee, plus twenty-five dollars."
    >
      <rect x={30} y={34} width={140} height={140} rx={6} fill={PAPER} stroke={INK} strokeWidth={2} />
      <rect x={30} y={34} width={140} height={28} rx={6} fill={INK} />
      <Key x={100} y={53} anchor="middle" fill={PAPER} size={9}>
        DUE
      </Key>
      {Array.from({ length: 12 }, (_, i) => {
        const x = 52 + (i % 4) * 32;
        const y = 86 + Math.floor(i / 4) * 30;
        const due = i === 5;
        const late = i > 5;
        return (
          <g key={i}>
            <Note x={x} y={y + 5} anchor="middle" size={13} fill={late ? INK3 : INK2}>
              {String(i + 10)}
            </Note>
            {due ? <circle cx={x} cy={y} r={12} fill="none" stroke={INK} strokeWidth={1.8} /> : null}
            {late ? <line x1={x - 9} y1={y + 7} x2={x + 9} y2={y - 7} stroke={SIGNAL} strokeWidth={1.8} /> : null}
          </g>
        );
      })}
      <rect x={210} y={40} width={150} height={134} rx={4} fill={PAPER} stroke={INK} strokeWidth={2} />
      {[64, 80, 96].map((y) => (
        <rect key={y} x={226} y={y} width={y === 96 ? 70 : 110} height={7} rx={3.5} fill={RULE2} />
      ))}
      <g transform="translate(286 138) rotate(-10)">
        <rect x={-62} y={-24} width={124} height={48} rx={4} fill="none" stroke={SIGNAL} strokeWidth={2.6} />
        <Key x={0} y={-5} anchor="middle" fill={SIGNAL} size={10} weight={700}>
          LATE FEE
        </Key>
        <Display x={0} y={17} anchor="middle" size={18} fill={SIGNAL}>
          +$25
        </Display>
      </g>
    </Frame>
  );
}

/* ==========================================================================
   OBSERVATIONAL LEARNING
   ========================================================================== */

/** Learning from your own reward, and from watching someone else's. */
export function LearnByWatching() {
  return (
    <Frame
      height={250}
      label="Left: a person receives a star themselves: a personal reward. Right: a person stands to one side and watches another person receive the star, a dashed sight line between them."
    >
      <line x1={400} y1={20} x2={400} y2={236} stroke={RULE} strokeDasharray="3 5" />
      <Key x={200} y={32} anchor="middle" fill={INK3}>
        PERSONAL REWARDS
      </Key>
      <Key x={600} y={32} anchor="middle" fill={SIGNAL}>
        WATCHING OTHER PEOPLE
      </Key>
      {[200, 680].map((x) => (
        <g key={x}>
          <Star x={x} y={66} R={18} />
          <Arrow x1={x} y1={90} x2={x} y2={104} stroke={SIGNAL} />
        </g>
      ))}
      <Person x={200} y={236} s={2} />
      <Person x={680} y={236} s={2} fill={SIGNAL} />
      <Person x={510} y={236} s={2} />
      <line x1={528} y1={120} x2={656} y2={116} stroke={INK3} strokeWidth={1.6} strokeDasharray="4 4" />
      <line x1={20} y1={236} x2={380} y2={236} stroke={RULE2} />
      <line x1={420} y1={236} x2={780} y2={236} stroke={RULE2} />
    </Frame>
  );
}

/** A T-shirt; (x, y) is its centre. */
function Shirt({ x, y, s = 1, fill = SIGNAL }: { x: number; y: number; s?: number; fill?: string }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M-10 -22Q0 -15 10 -22L28 -12L20 2L14 -2V24H-14V-2L-20 2L-28 -12Z"
      fill={fill}
      stroke={fill}
      strokeWidth={1.6}
      strokeLinejoin="round"
    />
  );
}

/** First: attention to an attractive, credible model. */
export function AttendModel() {
  return (
    <Frame
      width={400}
      height={220}
      label="A model in an orange outfit stands in a spotlight. A consumer on the left looks at the model along a dashed sight line."
    >
      <path d="M260 10L200 204H340Z" fill={SIGNAL_TINT} />
      <Person x={270} y={204} s={1.8} fill={SIGNAL} />
      <Person x={80} y={204} s={1.35} />
      <line x1={94} y1={118} x2={250} y2={104} stroke={INK3} strokeWidth={1.6} strokeDasharray="4 4" />
      <line x1={20} y1={204} x2={380} y2={204} stroke={RULE2} />
    </Frame>
  );
}

/** Second: the consumer remembers what the model wore. */
export function RememberModel() {
  return (
    <Frame
      width={400}
      height={220}
      label="The consumer, now alone, with a thought bubble holding the model's orange shirt."
    >
      <Person x={110} y={204} s={1.5} />
      <Thought x={250} y={76} rx={70} ry={52} tx={124} ty={100} />
      <Shirt x={250} y={78} s={1.2} />
      <line x1={20} y1={204} x2={380} y2={204} stroke={RULE2} />
    </Frame>
  );
}

/** A shopping bag. (x, y) is its centre. */
function Bag({ x, y, w = 40, stroke = INK, fill = PAPER }: { x: number; y: number; w?: number; stroke?: string; fill?: string }) {
  const h = w * 0.95;
  return (
    <g stroke={stroke} strokeWidth={2.2} strokeLinejoin="round">
      <path d={`M${x - w / 2} ${y - h / 2}H${x + w / 2}L${x + w / 2 + 3} ${y + h / 2}H${x - w / 2 - 3}Z`} fill={fill} />
      <path
        d={`M${r2(x - w * 0.22)} ${y - h / 2}V${y - h / 2 - 6}A${r2(w * 0.22)} ${r2(w * 0.22)} 0 0 1 ${r2(x + w * 0.22)} ${y - h / 2 - 6}V${y - h / 2}`}
        fill="none"
      />
    </g>
  );
}

/** Third: the memory becomes a purchase. */
export function CopyPurchase() {
  return (
    <Frame
      width={400}
      height={220}
      label="The consumer now wears the same orange outfit and carries a shopping bag."
    >
      <Person x={180} y={204} s={1.8} fill={SIGNAL} />
      <line x1={202} y1={150} x2={226} y2={160} stroke={SIGNAL} strokeWidth={9} strokeLinecap="round" />
      <Bag x={244} y={172} w={44} />
      <Shirt x={244} y={176} s={0.55} fill={SIGNAL} />
      <line x1={20} y1={204} x2={380} y2={204} stroke={RULE2} />
    </Frame>
  );
}

/* ==========================================================================
   THE MEMORY SYSTEM
   ========================================================================== */

export function MemoryStorageFlow() {
  const sensory = Array.from({ length: 22 }, (_, i) => ({
    x: 50 + (i % 6) * 30 + (Math.floor(i / 6) % 2) * 15,
    y: 120 + Math.floor(i / 6) * 34,
  }));
  const lt: [number, number][] = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) lt.push([586 + c * 32, 122 + r * 32]);
  return (
    <Frame
      height={330}
      label="Three stores from left to right. Sensory memory: a wide field of many faint marks, held for a few seconds; one orange mark gets attention and moves on. Short-term memory: a small box with room for only a few items, held for about twenty seconds, with a loop arrow of elaborative rehearsal. Long-term memory: a large grid of many connected items, held for days, months or years."
    >
      {[
        { x: 130, t: "Sensory", time: "A FEW SECONDS" },
        { x: 400, t: "Short-term", time: "ABOUT 20 SECONDS" },
        { x: 666, t: "Long-term", time: "DAYS · MONTHS · YEARS" },
      ].map((h, i) => (
        <g key={h.t}>
          <Display x={h.x} y={46} anchor="middle" size={22} fill={i === 2 ? SIGNAL : INK}>
            {h.t}
          </Display>
          <Key x={h.x} y={306} anchor="middle" fill={i === 2 ? SIGNAL : INK3}>
            {h.time}
          </Key>
        </g>
      ))}

      {/* sensory: a wide open field */}
      <rect x={34} y={96} width={200} height={170} rx={10} fill="none" stroke={RULE2} strokeWidth={1.4} strokeDasharray="4 5" />
      {sensory.map((p, i) =>
        i === 11 ? null : i === 10 ? (
          <circle key={i} cx={p.x} cy={p.y} r={7} fill={SIGNAL} />
        ) : (
          <circle key={i} cx={p.x} cy={p.y} r={5} fill={RULE2} />
        ),
      )}
      <Arrow x1={198} y1={156} x2={318} y2={176} stroke={SIGNAL} width={1.8} />
      <Key x={272} y={150} anchor="middle" fill={SIGNAL} size={9.5}>
        ATTENTION
      </Key>

      {/* short-term: a small box, few slots */}
      <rect x={330} y={156} width={140} height={48} rx={8} fill={PAPER} stroke={INK} strokeWidth={1.8} />
      {[0, 1, 2, 3].map((i) => (
        <circle key={i} cx={352 + i * 32} cy={180} r={i < 3 ? 6 : 7} fill={i < 3 ? INK : SIGNAL} />
      ))}
      {/* dropping out */}
      {[0, 1].map((i) => (
        <circle key={i} cx={376 + i * 48} cy={244 + i * 12} r={5} fill={RULE2} />
      ))}
      <Arrow x1={400} y1={212} x2={400} y2={250} stroke={RULE2} dash="3 3" />

      <Arrow x1={478} y1={180} x2={560} y2={180} stroke={SIGNAL} width={1.8} />
      <Key x={521} y={206} anchor="middle" fill={SIGNAL} size={8.5}>
        ELABORATIVE
      </Key>
      <Key x={521} y={220} anchor="middle" fill={SIGNAL} size={8.5}>
        REHEARSAL
      </Key>

      {/* long-term: a big connected archive */}
      <rect x={568} y={100} width={196} height={160} rx={10} fill={PAPER} stroke={INK} strokeWidth={1.8} />
      {lt.map(([x, y], i) => (
        <g key={i}>
          {i % 6 < 5 ? <line x1={x} y1={y} x2={x + 32} y2={y} stroke={RULE} /> : null}
          {i < 18 ? <line x1={x} y1={y} x2={x} y2={y + 32} stroke={RULE} /> : null}
        </g>
      ))}
      {lt.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={5.5} fill={i === 14 ? SIGNAL : INK} />
      ))}
    </Frame>
  );
}

/** Chunking: ten digits become three groups. */
export function Chunking() {
  const digits = "5145550199".split("");
  const chunks = ["514", "555", "0199"];
  return (
    <Frame
      width={400}
      height={220}
      label="Ten separate digit tiles, 5 1 4 5 5 5 0 1 9 9, become three tiles: 514, 555, 0199."
    >
      <Key x={20} y={30} fill={INK3}>
        10 ITEMS
      </Key>
      {digits.map((d, i) => (
        <g key={i}>
          <rect x={20 + i * 36} y={42} width={30} height={40} rx={4} fill={PAPER} stroke={RULE2} strokeWidth={1.4} />
          <text x={35 + i * 36} y={70} textAnchor="middle" fontFamily={BODY} fontSize={18} fill={INK2}>
            {d}
          </text>
        </g>
      ))}
      <Arrow x1={200} y1={96} x2={200} y2={124} stroke={SIGNAL} width={1.8} />
      <Key x={20} y={146} fill={SIGNAL}>
        3 CHUNKS
      </Key>
      {chunks.map((c, i) => {
        const x = [20, 128, 236][i];
        const w = c.length * 36 - 6;
        return (
          <g key={c + i}>
            <rect x={x} y={158} width={w} height={48} rx={6} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={2} />
            <text x={x + w / 2} y={190} textAnchor="middle" fontFamily={BODY} fontSize={24} fontWeight={600} letterSpacing="0.06em" fill={INK}>
              {c}
            </text>
          </g>
        );
      })}
    </Frame>
  );
}

/* ==========================================================================
   ASSOCIATIVE NETWORKS
   ========================================================================== */

/** A spider web whose knots are concepts, brands and feelings. */
export function SpiderWeb() {
  const cx = 200;
  const cy = 124;
  const spokes = Array.from({ length: 8 }, (_, i) => -90 + i * 45);
  const rings = [36, 70, 102];
  const ring = (r: number) =>
    spokes.map((a, i) => {
      const p = polar(cx, cy, r, a);
      return `${i ? "L" : "M"}${p.x} ${p.y}`;
    }).join("") + "Z";
  const knots = [
    { r: 70, a: -135, k: "concept" },
    { r: 36, a: 0, k: "concept" },
    { r: 102, a: 45, k: "concept" },
    { r: 70, a: 90, k: "brand" },
    { r: 102, a: -45, k: "feeling" },
    { r: 36, a: 180, k: "feeling" },
    { r: 102, a: 180, k: "concept" },
  ];
  return (
    <Frame
      width={400}
      height={250}
      label="A spider web. At its knots sit three kinds of node: plain circles for concepts, the teal badge for a brand, and hearts for feelings."
    >
      {spokes.map((a) => {
        const p = polar(cx, cy, 116, a);
        return <line key={a} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke={RULE2} strokeWidth={1.2} />;
      })}
      {rings.map((r) => (
        <path key={r} d={ring(r)} fill="none" stroke={RULE2} strokeWidth={1.2} />
      ))}
      {knots.map((n, i) => {
        const p = polar(cx, cy, n.r, n.a);
        if (n.k === "brand") return <BrandMark key={i} x={p.x} y={p.y} s={0.7} />;
        if (n.k === "feeling") return <Heart key={i} x={p.x} y={p.y} s={0.95} />;
        return <Node key={i} x={p.x} y={p.y} r={8} fill={INK} />;
      })}
      <Key x={82} y={128} anchor="end" fill={INK}>
        CONCEPT
      </Key>
      <Key x={290} y={48} fill={SIGNAL}>
        FEELING
      </Key>
    </Frame>
  );
}

/** Nike and the nodes that light up around it. */
export function BrandAssociativeNetwork() {
  const cx = 400;
  const cy = 206;
  const first = [
    { a: -148, t: "running", r: 200 },
    { a: -32, t: "sneakers", r: 200 },
    { a: 148, t: "athletes", r: 200 },
    { a: 32, t: "Just Do It", r: 200 },
  ];
  const outer = [
    { a: -176, r: 300, p: 0 },
    { a: -128, r: 250, p: 0 },
    { a: -64, r: 190, p: 1 },
    { a: -8, r: 316, p: 1 },
    { a: 16, r: 290, p: 3 },
    { a: 64, r: 184, p: 3 },
    { a: 124, r: 250, p: 2 },
    { a: 174, r: 306, p: 2 },
    { a: 100, r: 170, p: 2 },
    { a: -100, r: 170, p: 0 },
  ];
  const pts = first.map((f) => ({ ...f, ...polar(cx, cy, f.r, f.a) }));
  return (
    <Frame
      height={420}
      label="A memory network. The central node reads Nike. Four lit nodes are linked to it: running, sneakers, athletes, and Just Do It. Further out, unlit grey nodes connect to them with thin lines."
    >
      {outer.map((o, i) => {
        const p = polar(cx, cy, o.r * 0.95, o.a);
        const q = pts[o.p];
        return (
          <g key={i}>
            <line x1={q.x} y1={q.y} x2={p.x} y2={p.y} stroke={RULE} strokeWidth={1.2} />
            <circle cx={p.x} cy={p.y} r={7} fill={PAPER} stroke={RULE2} strokeWidth={1.6} />
          </g>
        );
      })}
      {pts.map((p) => (
        <line key={p.t} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke={SIGNAL} strokeWidth={3} />
      ))}
      <circle cx={cx} cy={cy} r={92} fill={SIGNAL_TINT} />
      <circle cx={cx} cy={cy} r={56} fill={INK} />
      <text x={cx} y={cy + 10} textAnchor="middle" fontFamily={SERIF} fontSize={30} fontWeight={600} fill={PAPER}>
        Nike
      </text>
      {pts.map((p) => {
        const w = p.t.length * 10.5 + 36;
        return (
          <g key={p.t}>
            <rect x={r2(p.x - w / 2 - 8)} y={p.y - 30} width={w + 16} height={60} rx={30} fill={SIGNAL_TINT} />
            <rect x={r2(p.x - w / 2)} y={p.y - 22} width={w} height={44} rx={22} fill={PAPER} stroke={SIGNAL} strokeWidth={2} />
            <text x={p.x} y={p.y + 6} textAnchor="middle" fontFamily={BODY} fontSize={17} fontWeight={600} fill={SIGNAL}>
              {p.t}
            </text>
          </g>
        );
      })}
    </Frame>
  );
}

const SPREAD_NODES: [number, number][] = [
  [0, 0],
  [-52, -30],
  [50, -34],
  [8, 54],
  [-100, 20],
  [-70, -80],
  [104, 4],
  [70, -88],
  [-40, 90],
  [62, 84],
];
const SPREAD_LINKS: [number, number][] = [
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 4],
  [1, 5],
  [2, 6],
  [2, 7],
  [3, 8],
  [3, 9],
];
const RING = [0, 1, 1, 1, 2, 2, 2, 2, 2, 2];

/** Spreading activation in three beats. */
export function SpreadingActivation() {
  const frames = [140, 400, 660];
  return (
    <Frame
      height={260}
      label="The same small network drawn three times. First, only the centre node is lit. Second, the three nodes linked to it light up too. Third, the activation has spread to the outer nodes linked to those."
    >
      {frames.map((fx, f) => (
        <g key={fx}>
          <Display x={fx} y={34} anchor="middle" size={22} fill={f === 0 ? INK : SIGNAL}>
            {String(f + 1)}
          </Display>
          {SPREAD_LINKS.map(([a, b]) => {
            const lit = RING[b] <= f;
            return (
              <line
                key={`${a}-${b}`}
                x1={fx + SPREAD_NODES[a][0]}
                y1={140 + SPREAD_NODES[a][1]}
                x2={fx + SPREAD_NODES[b][0]}
                y2={140 + SPREAD_NODES[b][1]}
                stroke={lit ? SIGNAL : RULE2}
                strokeWidth={lit ? 2.4 : 1.4}
              />
            );
          })}
          {SPREAD_NODES.map(([x, y], i) => (
            <Node key={i} x={fx + x} y={140 + y} r={i === 0 ? 10 : 7} lit={RING[i] <= f} />
          ))}
          {f < 2 ? <Arrow x1={fx + 124} y1={140} x2={fx + 142} y2={140} stroke={INK3} /> : null}
        </g>
      ))}
    </Frame>
  );
}

/** Strong positive links make one brand easy to recall in the aisle. */
export function StrongLinks() {
  return (
    <Frame
      width={400}
      height={230}
      label="A shopper in a store aisle faces a shelf with two products. A thick orange line joins the shopper's head to the teal brand; only a thin dashed line reaches a grey product on the lower shelf."
    >
      <Person x={70} y={214} s={1.6} />
      <line x1={220} y1={120} x2={380} y2={120} stroke={INK} strokeWidth={2} />
      <line x1={220} y1={214} x2={380} y2={214} stroke={INK} strokeWidth={2} />
      <Pack x={260} bottom={120} w={46} h={66} fill={COUNTER} stroke={COUNTER} mark />
      <Pack x={336} bottom={120} w={46} h={66} />
      <Pack x={260} bottom={214} w={46} h={66} />
      <Pack x={336} bottom={214} w={46} h={66} fill={PAPER} />
      <path d="M84 104Q160 60 236 84" fill="none" stroke={SIGNAL} strokeWidth={6} strokeLinecap="round" />
      <Heart x={160} y={60} s={1} />
      <path d="M86 124Q170 170 234 176" fill="none" stroke={INK3} strokeWidth={1.2} strokeDasharray="3 5" />
      <line x1={20} y1={214} x2={210} y2={214} stroke={RULE2} />
    </Frame>
  );
}

/* ==========================================================================
   RETRIEVAL
   ========================================================================== */

/** Pulling the brand out of long-term memory at the shelf. */
export function Retrieve() {
  const grid: [number, number][] = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) grid.push([56 + c * 34, 96 + r * 34]);
  return (
    <Frame
      width={400}
      height={240}
      label="On the left, long-term memory: a box of stored items, one of them the teal brand badge. An orange arrow carries the badge out of the box to the shelf on the right, where the same brand sits at the point of purchase."
    >
      <Key x={107} y={52} anchor="middle" fill={INK3} size={9.5}>
        LONG-TERM MEMORY
      </Key>
      <rect x={30} y={70} width={154} height={120} rx={10} fill={PAPER} stroke={INK} strokeWidth={1.8} />
      {grid.map(([x, y], i) =>
        i === 6 ? (
          <rect key={i} x={x - 11} y={y - 11} width={22} height={22} rx={5} fill="none" stroke={SIGNAL} strokeDasharray="3 3" />
        ) : (
          <circle key={i} cx={x} cy={y} r={6} fill={INK} />
        ),
      )}
      <CurveArrow x1={124} y1={116} cx={210} cy={40} x2={284} y2={110} stroke={SIGNAL} width={2} />
      <BrandMark x={206} y={66} s={0.8} />
      <line x1={250} y1={190} x2={384} y2={190} stroke={INK} strokeWidth={2} />
      <Pack x={284} bottom={190} w={44} h={62} fill={COUNTER} stroke={COUNTER} mark />
      <Pack x={346} bottom={190} w={44} h={62} />
      <Key x={317} y={216} anchor="middle" fill={SIGNAL} size={9.5}>
        POINT OF PURCHASE
      </Key>
    </Frame>
  );
}

/** A bottle with a distinctive waisted shape; (x, bottom) is the base centre. */
function Bottle({ x, bottom, s = 1, stroke = INK, fill = "none" }: { x: number; bottom: number; s?: number; stroke?: string; fill?: string }) {
  return (
    <path
      transform={`translate(${x} ${bottom}) scale(${s})`}
      d="M-6 -96H6V-82Q6 -74 14 -64Q22 -54 20 -40Q16 -28 20 -14Q22 0 14 0H-14Q-22 0 -20 -14Q-16 -28 -20 -40Q-22 -54 -14 -64Q-6 -74 -6 -82Z"
      fill={fill}
      stroke={stroke}
      strokeWidth={r2(2.6 / s)}
      strokeLinejoin="round"
    />
  );
}

const CUES = [
  { t: "PACKAGING SHAPES", y: 50 },
  { t: "COLORS", y: 135 },
  { t: "LOGOS", y: 220 },
];

/** Shape, colour and logo each pull the same brand memory. */
export function RetrievalCues() {
  const s = 0.62;
  const hx = 540;
  const hy = 8;
  const mem = { x: r2(hx + 196 * s), y: r2(hy + 178 * s) };
  return (
    <Frame
      height={270}
      label="Three cues on the left: a distinctively shaped bottle outline, a teal colour swatch, and the brand logo. Orange lines run from all three into a head in profile, where the brand's memory node lights up."
    >
      <Head x={hx} y={hy} s={s} />
      {[
        [150, 150],
        [256, 140],
        [240, 220],
        [140, 214],
      ].map(([x, y], i) => (
        <g key={i}>
          <line x1={mem.x} y1={mem.y} x2={hx + x * s} y2={hy + y * s} stroke={RULE2} strokeWidth={1.2} />
          <circle cx={hx + x * s} cy={hy + y * s} r={5} fill={PAPER} stroke={INK3} strokeWidth={1.4} />
        </g>
      ))}
      {CUES.map((c) => (
        <path
          key={c.t}
          d={`M300 ${c.y}C420 ${c.y} ${r2(mem.x - 140)} ${mem.y} ${r2(mem.x - 30)} ${mem.y}`}
          fill="none"
          stroke={SIGNAL}
          strokeWidth={1.8}
          strokeDasharray="5 4"
        />
      ))}
      <circle cx={mem.x} cy={mem.y} r={30} fill={SIGNAL_TINT} />
      <BrandMark x={mem.x} y={mem.y} s={0.8} />

      <Bottle x={70} bottom={CUES[0].y + 32} s={0.66} stroke={INK} />
      <circle cx={70} cy={CUES[1].y} r={26} fill={COUNTER} />
      <BrandMark x={70} y={CUES[2].y} s={1.3} />
      {CUES.map((c) => (
        <Key key={c.t} x={124} y={c.y + 4} fill={INK}>
          {c.t}
        </Key>
      ))}
    </Frame>
  );
}

/** The ad's green box, and the same green box on a crowded shelf. */
export function GreenBox() {
  const fills = [PAPER2, INK3, PAPER, RULE2, PAPER2, COUNTER_TINT, INK3, PAPER];
  const green = { row: 0, col: 5 };
  return (
    <Frame
      height={300}
      label="Left: an ad on a screen showing a distinct green box. Right: a crowded two-row shelf of boxes in greys and muted colours; exactly one is the same green box, and a dashed line runs to it from the ad."
    >
      <rect x={30} y={40} width={230} height={150} rx={8} fill={INK} />
      <rect x={110} y={74} width={70} height={96} rx={4} fill={GREEN} />
      <rect x={110} y={92} width={70} height={16} fill={PAPER} opacity={0.9} />
      <rect x={133} y={190} width={24} height={26} fill={INK} />
      <rect x={100} y={214} width={90} height={7} rx={3} fill={INK} />

      {[0, 1].map((row) => (
        <g key={row}>
          {Array.from({ length: 8 }, (_, col) => {
            const x = 340 + col * 52;
            const bottom = 150 + row * 108;
            const isGreen = row === green.row && col === green.col;
            const h = 72 + ((col * 7 + row * 3) % 3) * 8;
            return (
              <g key={col}>
                <rect
                  x={x - 21}
                  y={bottom - h}
                  width={42}
                  height={h}
                  rx={3}
                  fill={isGreen ? GREEN : fills[(col + row * 3) % fills.length]}
                  stroke={isGreen ? GREEN : RULE2}
                  strokeWidth={1.4}
                />
                {isGreen ? <rect x={x - 21} y={bottom - h + 14} width={42} height={10} fill={PAPER} opacity={0.9} /> : null}
              </g>
            );
          })}
          <line x1={306} y1={151 + row * 108} x2={770} y2={151 + row * 108} stroke={INK} strokeWidth={2} />
        </g>
      ))}
      <path d="M186 96Q400 16 590 54" fill="none" stroke={SIGNAL} strokeWidth={1.8} strokeDasharray="5 5" />
      <path d={headAlong(590, 54, 590 - 400, 54 - 16)} fill="none" stroke={SIGNAL} strokeWidth={1.8} />
      <Key x={145} y={28} anchor="middle" fill={SIGNAL}>
        THE EXACT GREEN BOX
      </Key>
    </Frame>
  );
}

/** State-dependent retrieval: the ad sticks when the mood matches. */
export function MoodMatch() {
  const rows = [
    { y: 64, mood: "happy" as const, ok: true },
    { y: 164, mood: "sad" as const, ok: false },
  ];
  return (
    <Frame
      width={400}
      height={230}
      label="Two rows. Top: a happy buyer and an upbeat ad, with an equals sign between them; the brand is remembered clearly. Bottom: a sad buyer and the same upbeat ad, with a not-equal sign; the brand is only a faint dashed outline."
    >
      <Key x={326} y={22} anchor="middle" fill={INK3} size={9}>
        REMEMBERED
      </Key>
      {rows.map((r) => (
        <g key={r.y}>
          <Face x={60} y={r.y} r={24} mood={r.mood} />
          <Display x={120} y={r.y + 9} anchor="middle" size={28} fill={r.ok ? SIGNAL : INK3}>
            {r.ok ? "=" : "≠"}
          </Display>
          <rect x={148} y={r.y - 30} width={64} height={60} rx={6} fill={INK} />
          <Face x={180} y={r.y} r={17} mood="happy" stroke={PAPER} fill={INK} />
          <Arrow x1={228} y1={r.y} x2={284} y2={r.y} stroke={r.ok ? SIGNAL : INK3} dash={r.ok ? undefined : "3 4"} />
          {r.ok ? (
            <BrandMark x={326} y={r.y} s={1.2} />
          ) : (
            <rect x={304} y={r.y - 22} width={44} height={44} rx={11} fill="none" stroke={INK3} strokeWidth={1.6} strokeDasharray="4 4" />
          )}
        </g>
      ))}
    </Frame>
  );
}

/* ==========================================================================
   WHY CONSUMERS FORGET
   ========================================================================== */

/** Decay: the brand fades along a falling curve. */
export function ForgettingCurve() {
  const pts = Array.from({ length: 25 }, (_, i) => {
    const f = i / 24;
    return { x: r2(124 + f * 636), y: r2(236 - 160 * Math.exp(-3.2 * f)) };
  });
  const d = pts.map((p, i) => `${i ? "L" : "M"}${p.x} ${p.y}`).join("");
  const marks = [0, 4, 9, 15, 23];
  return (
    <Frame
      height={290}
      label="A memory trace falling over time along a smooth curve. Copies of the brand badge sit on the curve and fade: sharp at the start, paler and paler, almost invisible at the end."
    >
      <line x1={80} y1={240} x2={770} y2={240} stroke={INK} strokeWidth={1.4} />
      <line x1={80} y1={40} x2={80} y2={240} stroke={INK} strokeWidth={1.4} />
      <path d={d} fill="none" stroke={SIGNAL} strokeWidth={2.4} />
      {marks.map((m, i) => (
        <BrandMark key={m} x={pts[m].x} y={pts[m].y - 32} s={0.9} opacity={[1, 0.62, 0.36, 0.2, 0.09][i]} />
      ))}
      <Key x={770} y={266} anchor="end" fill={INK3}>
        TIME →
      </Key>
      <Key x={64} y={140} anchor="middle" fill={INK3} transform="rotate(-90 64 140)">
        MEMORY TRACE
      </Key>
      <Key x={250} y={196} fill={SIGNAL}>
        DECAY
      </Key>
    </Frame>
  );
}

/** An ad card with a brand badge. */
function AdCard({
  x,
  y,
  w = 96,
  h = 68,
  fill = PAPER,
  stroke = INK,
  mark = COUNTER,
  opacity,
  rotate = 0,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  fill?: string;
  stroke?: string;
  mark?: string;
  opacity?: number;
  rotate?: number;
}) {
  return (
    <g transform={`rotate(${rotate} ${x} ${y})`} opacity={opacity}>
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={6} fill={fill} stroke={stroke} strokeWidth={1.8} />
      <BrandMark x={x - w / 2 + 24} y={y} s={0.7} fill={mark} />
      <rect x={x - w / 2 + 46} y={y - 10} width={w - 58} height={7} rx={3.5} fill={RULE2} />
      <rect x={x - w / 2 + 46} y={y + 4} width={(w - 58) * 0.6} height={7} rx={3.5} fill={RULE2} />
    </g>
  );
}

/** Interference: new ads pile in and displace the older message. */
export function Interference() {
  return (
    <Frame
      width={400}
      height={230}
      label="An older brand message card, faded, is being covered and pushed aside by a pile of new ads for other brands coming in from the right."
    >
      <AdCard x={110} y={120} opacity={0.35} rotate={-8} />
      <Key x={110} y={200} anchor="middle" fill={INK3} size={9.5}>
        OLDER
      </Key>
      <AdCard x={200} y={104} mark={INK} rotate={6} />
      <AdCard x={250} y={132} mark={SIGNAL} rotate={-4} />
      <AdCard x={300} y={100} mark={INK3} rotate={3} />
      <Key x={264} y={200} anchor="middle" fill={SIGNAL} size={9.5}>
        NEW
      </Key>
      <Arrow x1={372} y1={60} x2={330} y2={60} stroke={SIGNAL} />
      <Arrow x1={372} y1={170} x2={330} y2={170} stroke={SIGNAL} />
    </Frame>
  );
}

/** Retroactive or proactive: which way the interference runs. */
function InterferenceDirection({ back }: { back: boolean }) {
  const oldX = 100;
  const newX = 300;
  return (
    <Frame
      width={400}
      height={220}
      label={
        back
          ? "A timeline with an old card on the left and a new card on the right. An orange arrow curves back from the new card to the old one, which is faded out."
          : "A timeline with an old habit on the left and a new brand name on the right. An orange arrow curves forward from the old habit to the new name, which is faded out."
      }
    >
      <Arrow x1={30} y1={176} x2={372} y2={176} stroke={INK3} width={1.2} />
      <AdCard x={oldX} y={120} mark={INK} opacity={back ? 0.28 : 1} />
      <AdCard x={newX} y={120} mark={COUNTER} opacity={back ? 1 : 0.28} />
      {back ? (
        <CurveArrow x1={newX - 10} y1={80} cx={200} cy={10} x2={oldX + 10} y2={80} stroke={SIGNAL} width={2.2} />
      ) : (
        <CurveArrow x1={oldX + 10} y1={80} cx={200} cy={10} x2={newX - 10} y2={80} stroke={SIGNAL} width={2.2} />
      )}
      <Key x={oldX} y={204} anchor="middle" fill={back ? INK3 : INK} size={9.5}>
        {back ? "OLD INFORMATION" : "OLDER HABIT"}
      </Key>
      <Key x={newX} y={204} anchor="middle" fill={back ? INK : INK3} size={9.5}>
        {back ? "NEW LEARNING" : "NEW BRAND NAME"}
      </Key>
    </Frame>
  );
}

export function Retroactive() {
  return <InterferenceDirection back />;
}

export function Proactive() {
  return <InterferenceDirection back={false} />;
}

/** Three defences: one identity everywhere, reminders, a clear spot on the shelf. */
export function FightForgetting() {
  const { d } = (() => {
    // a mini memory line kept high by regular reminders
    let L = 0.75;
    let path = "";
    const x0 = 300;
    for (let i = 0; i < 6; i++) {
      const x = x0 + i * 34;
      const peak = Math.min(0.92, L + 0.2);
      path += `${i ? "L" : "M"}${x} ${r2(160 - peak * 90)}`;
      L = peak * 0.8;
      path += `L${x + 34} ${r2(160 - L * 90)}`;
    }
    return { d: path };
  })();
  return (
    <Frame
      height={250}
      label="Three panels. Consistent visual identity: a cup, a bag and a box all carry the same teal brand badge. Reminder ads: the brand badge repeats at regular intervals, and each repeat lifts a memory line before it can fall far. Clear shelf placement: a shelf where the brand's facings sit together at eye level."
    >
      {[266, 534].map((x) => (
        <line key={x} x1={x} y1={20} x2={x} y2={200} stroke={RULE} strokeDasharray="3 5" />
      ))}
      {/* identity */}
      <path d="M40 150L46 92H90L84 150Z" fill={PAPER} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
      <BrandMark x={66} y={120} s={0.7} />
      <Bag x={134} y={122} w={52} />
      <BrandMark x={134} y={126} s={0.7} />
      <rect x={180} y={84} width={56} height={66} rx={3} fill={PAPER} stroke={INK} strokeWidth={2} />
      <BrandMark x={208} y={117} s={0.7} />
      <line x1={30} y1={151} x2={246} y2={151} stroke={RULE2} />

      {/* reminder ads */}
      
      {Array.from({ length: 6 }, (_, i) => (
        <g key={i}>
          <line x1={300 + i * 34} y1={174} x2={300 + i * 34} y2={80} stroke={RULE2} strokeDasharray="2 3" />
          <BrandMark x={300 + i * 34} y={188} s={0.6} />
        </g>
      ))}
      <path d={d} fill="none" stroke={SIGNAL} strokeWidth={2.2} strokeLinejoin="round" />

      {/* shelf placement */}
      {[80, 130, 180].map((y, r) => (
        <g key={y}>
          {Array.from({ length: 5 }, (_, c) => {
            const x = 572 + c * 40;
            const mine = r === 1 && c >= 1 && c <= 3;
            return <Pack key={c} x={x} bottom={y} w={30} h={38} fill={mine ? COUNTER : PAPER2} stroke={mine ? COUNTER : RULE2} mark={mine} />;
          })}
          <line x1={548} y1={y + 1} x2={772} y2={y + 1} stroke={INK} strokeWidth={1.6} />
        </g>
      ))}
      {[
        { x: 133, t: "CONSISTENT VISUAL IDENTITY" },
        { x: 400, t: "REMINDER ADS" },
        { x: 660, t: "CLEAR SHELF PLACEMENT" },
      ].map((k) => (
        <Key key={k.t} x={k.x} y={236} anchor="middle" fill={INK}>
          {k.t}
        </Key>
      ))}
    </Frame>
  );
}

/* ==========================================================================
   DISCUSSION · your brand web
   ========================================================================== */

export function YourBrandWeb() {
  const cx = 400;
  const cy = 136;
  const spots = [-150, -30, 30, 150].map((a, i) => ({ n: i + 1, ...polar(cx, cy, 180, a) }));
  return (
    <Frame
      height={380}
      label="An empty memory web. A dashed centre node for your brand, and four numbered empty nodes around it, each link marked with a question mark. Below, three ways the links might have been taught: conditioning, observation and personal experience."
    >
      {spots.map((s) => (
        <g key={s.n}>
          <line x1={cx} y1={cy} x2={s.x} y2={s.y} stroke={COUNTER} strokeWidth={1.8} strokeDasharray="5 5" />
          <circle cx={r2((cx + s.x) / 2)} cy={r2((cy + s.y) / 2)} r={13} fill={PAPER} />
          <Display x={r2((cx + s.x) / 2)} y={r2((cy + s.y) / 2 + 7)} anchor="middle" size={20} fill={SIGNAL}>
            ?
          </Display>
          <circle cx={s.x} cy={s.y} r={30} fill={PAPER} stroke={COUNTER} strokeWidth={2} strokeDasharray="4 4" />
          <Display x={s.x} y={s.y + 8} anchor="middle" size={22} fill={COUNTER}>
            {String(s.n)}
          </Display>
        </g>
      ))}
      <circle cx={cx} cy={cy} r={50} fill={PAPER} />
      <circle cx={cx} cy={cy} r={50} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={2} />
      <Key x={cx} y={cy - 4} anchor="middle" fill={COUNTER}>
        YOUR
      </Key>
      <Key x={cx} y={cy + 12} anchor="middle" fill={COUNTER}>
        BRAND
      </Key>

      <line x1={40} y1={272} x2={760} y2={272} stroke={RULE} />
      {/* conditioning */}
      <Music x={116} y={306} s={0.8} />
      <Display x={144} y={313} anchor="middle" size={20} fill={INK3}>
        +
      </Display>
      <BrandMark x={172} y={306} s={0.75} />
      <Key x={144} y={356} anchor="middle" fill={INK}>
        CONDITIONING
      </Key>
      {/* observation */}
      <Person x={378} y={334} s={0.8} />
      <Person x={430} y={334} s={0.8} fill={SIGNAL} />
      <line x1={386} y1={296} x2={422} y2={296} stroke={INK3} strokeWidth={1.4} strokeDasharray="3 3" />
      <Key x={404} y={356} anchor="middle" fill={INK}>
        OBSERVATION
      </Key>
      {/* personal experience */}
      <SenseGlyph kind="touch" x={630} y={310} s={0.85} tone={INK} />
      <Heart x={666} y={290} s={0.8} />
      <Key x={650} y={356} anchor="middle" fill={INK}>
        PERSONAL EXPERIENCE
      </Key>
    </Frame>
  );
}
