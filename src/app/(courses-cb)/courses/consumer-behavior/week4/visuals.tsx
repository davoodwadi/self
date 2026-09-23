/* ==========================================================================
   Consumer Behavior · Week 04 — figures
   --------------------------------------------------------------------------
   Hand-drawn SVG plates for motivation, needs and values. The drawing system
   (Frame, Key, Note, Display, Person, the palette) comes from Week 01 and the
   brand badge from Week 03, so the weeks read as one book.

   Fixed cast for this week:
     · Gauge: a vertical tube that fills with SIGNAL. It is tension, the
       drive, hunger or thirst, conflict: whatever pushes the buyer to act.
     · Ghost: a dashed outline of the Person, the desired state they reach for.
     · BrandMark (Week 03): the offer.
     · Person: every human.

   INK is the neutral case, SIGNAL what the consumer wants or reaches for,
   COUNTER the offer and the marketer. Labels reuse the words of the slide
   they sit on.
   ========================================================================== */

import React from "react";
import {
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
  Key,
  Display,
  Frame,
  Person,
  BrandMark,
} from "../_visuals/flat";

const GREEN = "var(--affirm)";

const r2 = (n: number) => Math.round(n * 100) / 100;

/* -- drawing helpers ----------------------------------------------------- */

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

export function Arrow({
  x1,
  y1,
  x2,
  y2,
  stroke = INK,
  width = 1.6,
  dash,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stroke?: string;
  width?: number;
  dash?: string;
}) {
  return (
    <g fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round">
      <line x1={x1} y1={y1} x2={x2} y2={y2} strokeDasharray={dash} />
      <path d={headAlong(x2, y2, x2 - x1, y2 - y1)} />
    </g>
  );
}

/** Quadratic arrow from (x1, y1) to (x2, y2) bending through control (cx, cy). */
export function CurveArrow({
  x1,
  y1,
  cx,
  cy,
  x2,
  y2,
  stroke = INK,
  width = 1.8,
  dash,
  head = true,
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
  head?: boolean;
}) {
  return (
    <g fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round">
      <path d={`M${x1} ${y1}Q${cx} ${cy} ${x2} ${y2}`} strokeDasharray={dash} />
      {head ? <path d={headAlong(x2, y2, x2 - cx, y2 - cy, 9)} /> : null}
    </g>
  );
}

export function Heart({ x, y, s = 1, fill = SIGNAL }: { x: number; y: number; s?: number; fill?: string }) {
  // (x, y) is the centre; 24 units wide at s = 1.
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
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 === 0 ? R : R * 0.45;
    pts.push(`${r2(cx + rr * Math.cos(a))} ${r2(cy + rr * Math.sin(a))}`);
  }
  return `M${pts.join("L")}Z`;
}

export function Star({ x, y, R = 10, fill = SIGNAL }: { x: number; y: number; R?: number; fill?: string }) {
  return <path d={starPath(x, y, R)} fill={fill} stroke={fill} strokeWidth={1.2} strokeLinejoin="round" />;
}

/** A four-point sparkle. */
export function Sparkle({ x, y, r = 10, fill = SIGNAL }: { x: number; y: number; r?: number; fill?: string }) {
  const k = r2(r * 0.22);
  return (
    <path
      d={`M${x} ${r2(y - r)}Q${r2(x + k)} ${r2(y - k)} ${r2(x + r)} ${y}Q${r2(x + k)} ${r2(y + k)} ${x} ${r2(y + r)}Q${r2(x - k)} ${r2(y + k)} ${r2(x - r)} ${y}Q${r2(x - k)} ${r2(y - k)} ${x} ${r2(y - r)}Z`}
      fill={fill}
    />
  );
}

export function Check({ x, y, s = 1, stroke = SIGNAL }: { x: number; y: number; s?: number; stroke?: string }) {
  return (
    <path
      d={`M${r2(x - 6 * s)} ${y}l${r2(4 * s)} ${r2(4.5 * s)}l${r2(8.5 * s)} ${r2(-10 * s)}`}
      fill="none"
      stroke={stroke}
      strokeWidth={r2(2.6 * s)}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

export function Cross({ x, y, s = 1, stroke = INK3 }: { x: number; y: number; s?: number; stroke?: string }) {
  const d = r2(5 * s);
  return (
    <g stroke={stroke} strokeWidth={r2(2.4 * s)} strokeLinecap="round">
      <line x1={x - d} y1={y - d} x2={x + d} y2={y + d} />
      <line x1={x - d} y1={y + d} x2={x + d} y2={y - d} />
    </g>
  );
}

/** Thought bubble with two trailing dots toward (tx, ty). */
export function Thought({
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
  const ax = r2(x + (tx - x) * 0.66);
  const ay = r2(y + (ty - y) * 0.66);
  const bx = r2(x + (tx - x) * 0.86);
  const by = r2(y + (ty - y) * 0.86);
  return (
    <g fill={PAPER} stroke={stroke} strokeWidth={1.6}>
      <ellipse cx={x} cy={y} rx={rx} ry={ry} />
      <circle cx={ax} cy={ay} r={5} />
      <circle cx={bx} cy={by} r={3} />
    </g>
  );
}

/* -- the cast ------------------------------------------------------------ */

/**
 * The tension tube. `top` is its upper end, `level` the share filled from
 * the bottom. Everything that pushes a buyer to act is drawn as this gauge.
 */
export function Gauge({
  x,
  top,
  h = 130,
  w = 34,
  level,
  label,
  labelFill = INK,
}: {
  x: number;
  top: number;
  h?: number;
  w?: number;
  level: number;
  label?: string;
  labelFill?: string;
}) {
  const inset = 5;
  const inner = h - inset * 2;
  const fh = r2(Math.max(inner * level, w - inset * 2));
  const iw = w - inset * 2;
  return (
    <g>
      <rect x={r2(x - w / 2)} y={top} width={w} height={h} rx={r2(w / 2)} fill={PAPER} stroke={INK} strokeWidth={2} />
      <rect
        x={r2(x - iw / 2)}
        y={r2(top + h - inset - fh)}
        width={iw}
        height={fh}
        rx={r2(iw / 2)}
        fill={SIGNAL}
        opacity={level < 0.3 ? 0.55 : 1}
      />
      {[0.25, 0.5, 0.75].map((f) => (
        <line
          key={f}
          x1={r2(x + w / 2 + 4)}
          y1={r2(top + h * (1 - f))}
          x2={r2(x + w / 2 + 11)}
          y2={r2(top + h * (1 - f))}
          stroke={INK3}
          strokeWidth={1.4}
        />
      ))}
      {label ? (
        <Key x={x} y={top + h + 24} anchor="middle" fill={labelFill}>
          {label}
        </Key>
      ) : null}
    </g>
  );
}

/** The Person glyph drawn as a dashed outline: the state someone reaches for. */
export function Ghost({ x, y, s = 1, stroke = SIGNAL }: { x: number; y: number; s?: number; stroke?: string }) {
  const w = 13 * s;
  const shoulder = y - 33 * s;
  const hr = 8 * s;
  const hy = y - 46 * s - 3 * s - hr;
  return (
    <g fill={SIGNAL_TINT} stroke={stroke} strokeWidth={2} strokeDasharray="5 4">
      <path
        d={`M${r2(x - w)} ${r2(y)}V${r2(shoulder)}A${r2(w)} ${r2(w)} 0 0 1 ${r2(x + w)} ${r2(shoulder)}V${r2(y)}Z`}
      />
      <circle cx={r2(x)} cy={r2(hy)} r={r2(hr)} />
    </g>
  );
}

/** Shopping bag with two handles, centred on (x, y). */
export function Bag({ x, y, w = 40, stroke = INK, fill = PAPER }: { x: number; y: number; w?: number; stroke?: string; fill?: string }) {
  const h = w * 0.95;
  return (
    <g stroke={stroke} strokeWidth={2.2} strokeLinejoin="round">
      <path
        d={`M${r2(x - w / 2)} ${r2(y - h / 2)}H${r2(x + w / 2)}L${r2(x + w / 2 + 3)} ${r2(y + h / 2)}H${r2(x - w / 2 - 3)}Z`}
        fill={fill}
      />
      <path
        d={`M${r2(x - w * 0.22)} ${r2(y - h / 2)}V${r2(y - h / 2 - 6)}A${r2(w * 0.22)} ${r2(w * 0.22)} 0 0 1 ${r2(x + w * 0.22)} ${r2(y - h / 2 - 6)}V${r2(y - h / 2)}`}
        fill="none"
      />
    </g>
  );
}

/** A carton. (x, bottom) is the centre of its base. */
export function Pack({
  x,
  bottom,
  w = 44,
  h = 60,
  fill = PAPER2,
  stroke = RULE2,
  mark = false,
  dash,
}: {
  x: number;
  bottom: number;
  w?: number;
  h?: number;
  fill?: string;
  stroke?: string;
  mark?: boolean;
  dash?: string;
}) {
  return (
    <g>
      <rect
        x={r2(x - w / 2)}
        y={bottom - h}
        width={w}
        height={h}
        rx={3}
        fill={fill}
        stroke={stroke}
        strokeWidth={1.6}
        strokeDasharray={dash}
      />
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

/** A smartphone, centred on (x, y). */
export function Phone({ x, y, s = 1, fill = INK, screen = PAPER2 }: { x: number; y: number; s?: number; fill?: string; screen?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-20} y={-36} width={40} height={72} rx={7} fill={fill} />
      <rect x={-15} y={-28} width={30} height={52} rx={2} fill={screen} />
      <circle cy={30} r={2.4} fill={screen} />
    </g>
  );
}

/** A running shoe in side view, toe to the right; (x, y) is the sole centre. */
export function Shoe({ x, y, s = 1, fill = INK }: { x: number; y: number; s?: number; fill?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-26 -4L-24 -24Q-16 -28 -10 -20Q-2 -14 8 -12Q22 -10 26 -2L26 0H-26Z" fill={fill} />
      <rect x={-27} y={-1} width={55} height={7} rx={3.5} fill={PAPER} stroke={fill} strokeWidth={2} />
      {[-6, 0, 6].map((dx) => (
        <line
          key={dx}
          x1={dx - 4}
          y1={r2(-17 + dx * 0.3)}
          x2={dx + 2}
          y2={r2(-12 + dx * 0.3)}
          stroke={PAPER}
          strokeWidth={1.8}
          strokeLinecap="round"
        />
      ))}
    </g>
  );
}

/** A trophy; (x, y) is the centre of the cup's rim. */
export function Trophy({ x, y, s = 1, fill = SIGNAL }: { x: number; y: number; s?: number; fill?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-30 0Q-54 0 -50 22Q-46 40 -20 42" fill="none" stroke={fill} strokeWidth={6} strokeLinecap="round" />
      <path d="M30 0Q54 0 50 22Q46 40 20 42" fill="none" stroke={fill} strokeWidth={6} strokeLinecap="round" />
      <path d="M-34 -4H34Q34 52 0 58Q-34 52 -34 -4Z" fill={fill} />
      <rect x={-6} y={56} width={12} height={20} fill={fill} />
      <rect x={-26} y={74} width={52} height={12} rx={3} fill={fill} />
      <Star x={0} y={24} R={11} fill={PAPER} />
    </g>
  );
}

/** A burger in side view, centred on (x, y); 100 units wide at s = 1. */
function Burger({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} strokeLinejoin="round">
      <path d="M-50 -8Q-50 -52 0 -52Q50 -52 50 -8Z" fill={PAPER2} stroke={INK} strokeWidth={2.2} />
      {[
        [-22, -32],
        [0, -40],
        [20, -30],
        [-6, -24],
      ].map(([sx, sy]) => (
        <ellipse key={`${sx}`} cx={sx} cy={sy} rx={3.4} ry={1.8} fill={INK3} />
      ))}
      <path
        d="M-54 -4Q-45 4 -36 -4T-18 -4T0 -4T18 -4T36 -4T54 -4"
        fill="none"
        stroke={GREEN}
        strokeWidth={5}
        strokeLinecap="round"
      />
      <rect x={-50} y={2} width={100} height={18} rx={9} fill={INK} />
      <path d="M-48 26H48Q48 46 30 46H-30Q-48 46 -48 26Z" fill={PAPER2} stroke={INK} strokeWidth={2.2} />
    </g>
  );
}

/** A bowl of rice with chopsticks, centred on the rim at (x, y). */
function RiceBowl({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} strokeLinejoin="round">
      <line x1={8} y1={-18} x2={58} y2={-62} stroke={INK} strokeWidth={4} strokeLinecap="round" />
      <line x1={18} y1={-14} x2={66} y2={-52} stroke={INK} strokeWidth={4} strokeLinecap="round" />
      <path d="M-40 0Q-32 -34 0 -34Q32 -34 40 0Z" fill={PAPER} stroke={INK3} strokeWidth={1.6} />
      <path d="M-50 0H50A50 44 0 0 1 -50 0Z" fill={COUNTER} />
      <line x1={-50} y1={0} x2={50} y2={0} stroke={INK} strokeWidth={2.4} strokeLinecap="round" />
    </g>
  );
}

/** A slice of pizza pointing down, centred on (x, y). */
function Pizza({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} strokeLinejoin="round">
      <path d="M-46 -34Q0 -46 46 -34L0 50Z" fill={PAPER2} stroke={INK} strokeWidth={2.2} />
      <path d="M-46 -34Q0 -46 46 -34" fill="none" stroke={INK} strokeWidth={9} strokeLinecap="round" />
      {[
        [-16, -16, 7],
        [14, -12, 6.5],
        [-2, 12, 6],
        [2, -26, 4],
      ].map(([cx, cy, rr]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={rr} fill={SIGNAL} />
      ))}
    </g>
  );
}

/** A bowl of hot food on its rim at (x, y). */
function FoodBowl({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} strokeLinejoin="round">
      {[-16, 0, 16].map((dx) => (
        <path
          key={dx}
          d={`M${dx} -40q-7 -9 0 -18t0 -18`}
          fill="none"
          stroke={INK3}
          strokeWidth={2.2}
          strokeLinecap="round"
        />
      ))}
      <path d="M-40 0Q-30 -30 0 -30Q30 -30 40 0Z" fill={SIGNAL} />
      <path d="M-50 0H50A50 44 0 0 1 -50 0Z" fill={PAPER2} stroke={INK} strokeWidth={2.2} />
    </g>
  );
}

/** A glass of water; (x, y) is its base centre. */
function Glass({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} strokeLinejoin="round">
      <path d="M-30.8 -90H30.8L25 0H-25Z" fill={COUNTER} opacity={0.28} />
      <path d="M-34 -120H34L26 0H-26Z" fill="none" stroke={INK} strokeWidth={2.4} />
      <path d="M-30.8 -90H30.8" stroke={COUNTER} strokeWidth={2} />
      <path d="M-12 -70q-6 10 0 14q6 -4 0 -14Z" fill={PAPER} />
    </g>
  );
}

/** A wallet, centred on (x, y). */
export function Wallet({ x, y, s = 1, coins = 2 }: { x: number; y: number; s?: number; coins?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {Array.from({ length: coins }, (_, i) => (
        <g key={i}>
          <circle cx={-12 + i * 20} cy={-28} r={11} fill={SIGNAL} />
          <circle cx={-12 + i * 20} cy={-28} r={6} fill="none" stroke={PAPER} strokeWidth={1.6} />
        </g>
      ))}
      <rect x={-36} y={-24} width={72} height={50} rx={7} fill={COUNTER} />
      <rect x={10} y={-8} width={30} height={20} rx={5} fill={PAPER} stroke={COUNTER} strokeWidth={2} />
      <circle cx={20} cy={2} r={3} fill={COUNTER} />
    </g>
  );
}

/** A dumbbell, centred on (x, y). */
export function Dumbbell({ x, y, s = 1, fill = INK }: { x: number; y: number; s?: number; fill?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={fill}>
      <rect x={-34} y={-3} width={68} height={6} rx={3} />
      <rect x={-34} y={-15} width={10} height={30} rx={3} />
      <rect x={24} y={-15} width={10} height={30} rx={3} />
      <rect x={-42} y={-10} width={8} height={20} rx={2} />
      <rect x={34} y={-10} width={8} height={20} rx={2} />
    </g>
  );
}

/** A car in side view; (x, y) is the ground under its centre. */
export function Car({ x, y, s = 1, fill = SIGNAL }: { x: number; y: number; s?: number; fill?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-80 -12V-30Q-78 -40 -60 -42H-40L-22 -64H30L52 -42H70Q80 -40 80 -26V-12Z" fill={fill} />
      <path d="M-32 -44L-18 -58H2V-44Z" fill={PAPER} />
      <path d="M10 -44V-58H26L40 -44Z" fill={PAPER} />
      {[-48, 48].map((wx) => (
        <g key={wx}>
          <circle cx={wx} cy={-12} r={15} fill={INK} stroke={PAPER} strokeWidth={3} />
          <circle cx={wx} cy={-12} r={5} fill={PAPER2} />
        </g>
      ))}
    </g>
  );
}

/** Pack of gum; centred on its base at (x, y). */
function Gum({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s}) translate(${-x} ${-y})`}>
      <rect x={x - 26} y={y - 18} width={52} height={18} rx={3} fill={PAPER2} stroke={INK3} strokeWidth={1.6} />
      <line x1={x - 10} y1={y - 18} x2={x - 10} y2={y} stroke={INK3} strokeWidth={1.2} />
    </g>
  );
}

/** A magnifying glass, centred on its lens. */
export function Magnifier({ x, y, r = 16, stroke = INK }: { x: number; y: number; r?: number; stroke?: string }) {
  const d = r * 0.707;
  return (
    <g fill="none" stroke={stroke} strokeWidth={2.5} strokeLinecap="round">
      <circle cx={x} cy={y} r={r} fill={PAPER} />
      <line x1={r2(x - d)} y1={r2(y + d)} x2={r2(x - d - r * 0.8)} y2={r2(y + d + r * 0.8)} strokeWidth={4.5} />
    </g>
  );
}

/** A small five-tier pyramid; `lit` tiers (0 = base) fill SIGNAL. */
function MiniPyramid({
  x,
  base,
  w = 200,
  h = 200,
  lit = [],
}: {
  x: number;
  base: number;
  w?: number;
  h?: number;
  lit?: number[];
}) {
  const th = h / 5;
  const half = (yy: number) => (w / 2) * ((yy - (base - h)) / h);
  return (
    <g>
      {Array.from({ length: 5 }, (_, i) => {
        const yb = base - i * th;
        const yt = yb - th;
        const hb = half(yb);
        const ht = half(yt);
        const on = lit.includes(i);
        return (
          <path
            key={i}
            d={`M${r2(x - hb)} ${r2(yb)}H${r2(x + hb)}L${r2(x + ht)} ${r2(yt)}H${r2(x - ht)}Z`}
            fill={on ? SIGNAL : PAPER2}
            stroke={on ? PAPER : RULE2}
            strokeWidth={1.4}
            strokeLinejoin="round"
          />
        );
      })}
    </g>
  );
}

/* ==========================================================================
   TITLE · from a current state to a better one
   ========================================================================== */

export function CurrentToBetter() {
  return (
    <Frame
      width={360}
      height={400}
      label="A person stands on a low block marked current state. A dashed arc carries a shopping bag up and across to a higher block marked a better one, where a dashed outline of the same person waits."
    >
      <rect x={20} y={300} width={120} height={84} fill={PAPER2} />
      <line x1={20} y1={300} x2={140} y2={300} stroke={INK} strokeWidth={2.4} />
      <rect x={220} y={150} width={120} height={234} fill={SIGNAL_TINT} />
      <line x1={220} y1={150} x2={340} y2={150} stroke={SIGNAL} strokeWidth={2.4} />
      <Key x={80} y={336} anchor="middle" fill={INK3} size={10}>
        CURRENT STATE
      </Key>
      <Key x={280} y={186} anchor="middle" fill={SIGNAL} size={10}>
        A BETTER ONE
      </Key>
      <Person x={80} y={300} s={1.35} />
      <Ghost x={280} y={150} s={1.35} />
      <CurveArrow x1={108} y1={222} cx={176} cy={40} x2={252} y2={104} stroke={SIGNAL} width={2} dash="5 5" />
      <Bag x={176} y={104} w={40} fill={PAPER} />
    </Frame>
  );
}

/* ==========================================================================
   WHAT IS CONSUMER MOTIVATION?
   ========================================================================== */

/** The gap between where a consumer is and where they want to be. */
export function MotivationGap() {
  return (
    <Frame
      height={300}
      label="A person stands on a low level marked current state. Higher up and to the right, a dashed outline of the same person stands on a level marked desired state. A bracket between the two levels is marked gap, and an arrow marked act crosses it."
    >
      <line x1={40} y1={260} x2={400} y2={260} stroke={INK} strokeWidth={2.4} />
      <line x1={400} y1={130} x2={760} y2={130} stroke={SIGNAL} strokeWidth={2.4} />
      <line x1={400} y1={260} x2={760} y2={260} stroke={RULE} strokeDasharray="3 5" />
      <line x1={40} y1={130} x2={400} y2={130} stroke={RULE} strokeDasharray="3 5" />
      <Key x={40} y={286} fill={INK3}>
        CURRENT STATE
      </Key>
      <Key x={760} y={156} anchor="end" fill={SIGNAL}>
        DESIRED STATE
      </Key>

      {/* the gap */}
      <g stroke={SIGNAL} strokeWidth={2} strokeLinecap="round">
        <line x1={400} y1={134} x2={400} y2={256} />
        <line x1={392} y1={134} x2={408} y2={134} />
        <line x1={392} y1={256} x2={408} y2={256} />
      </g>
      <Key x={414} y={232} fill={SIGNAL} size={12}>
        GAP
      </Key>

      <Person x={200} y={260} s={1.4} />
      <Ghost x={600} y={130} s={1.4} />
      <Arrow x1={250} y1={210} x2={556} y2={112} stroke={INK} width={2} />
      <Key x={470} y={124} anchor="middle" fill={INK}>
        ACT
      </Key>
    </Frame>
  );
}

/** A need fills the tube; action empties it. */
export function TensionAction() {
  return (
    <Frame
      width={400}
      height={230}
      label="Two tension gauges. On the left, under the word need, the gauge is nearly full. An arrow marked action leads to the right, where the same gauge is nearly empty."
    >
      <Key x={80} y={26} anchor="middle" fill={SIGNAL}>
        NEED
      </Key>
      <Gauge x={80} top={40} h={140} level={0.9} label="TENSION" />
      <Arrow x1={134} y1={110} x2={262} y2={110} stroke={SIGNAL} width={2.2} />
      <Key x={198} y={96} anchor="middle" fill={INK}>
        ACTION
      </Key>
      <Gauge x={318} top={40} h={140} level={0.12} label="TENSION" labelFill={INK3} />
    </Frame>
  );
}

/** One gym membership, three motives. */
export function GymMotives() {
  const people = [
    { x: 150, key: "HEALTH" },
    { x: 400, key: "BELONGING" },
    { x: 650, key: "STATUS" },
  ];
  return (
    <Frame
      height={350}
      label="One gym membership card at the top. Dashed lines run from it to three people. Above the first person is a heart, marked health; above the second, a small group of people, marked belonging; above the third, a star, marked status."
    >
      {people.map((p) => (
        <line
          key={p.key}
          x1={400}
          y1={118}
          x2={p.x}
          y2={176}
          stroke={INK3}
          strokeWidth={1.4}
          strokeDasharray="4 5"
        />
      ))}
      <rect x={315} y={22} width={170} height={96} rx={10} fill={COUNTER} />
      <Dumbbell x={362} y={70} s={0.62} fill={PAPER} />
      <Key x={398} y={66} fill={PAPER} size={11}>
        GYM
      </Key>
      <Key x={398} y={84} fill={PAPER} size={9}>
        MEMBERSHIP
      </Key>

      {people.map((p, i) => (
        <g key={p.key}>
          <circle cx={p.x} cy={202} r={27} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.6} />
          {i === 0 ? <Heart x={p.x} y={203} s={1.25} /> : null}
          {i === 1 ? (
            <>
              <Person x={p.x - 11} y={220} s={0.44} fill={SIGNAL} />
              <Person x={p.x + 11} y={220} s={0.44} fill={SIGNAL} />
              <Person x={p.x} y={224} s={0.5} fill={SIGNAL} />
            </>
          ) : null}
          {i === 2 ? <Star x={p.x} y={204} R={15} /> : null}
          <Person x={p.x} y={320} s={1.2} />
          <Key x={p.x} y={344} anchor="middle" fill={INK} size={11}>
            {p.key}
          </Key>
        </g>
      ))}
    </Frame>
  );
}

/** The marketer's job: tie the offer to a goal the consumer holds. */
export function ConnectOffer() {
  return (
    <Frame
      width={400}
      height={250}
      label="On the left, a teal product marked offer. On the right, a person thinking of a target marked goal. An orange line connects the offer to the goal."
    >
      <Pack x={78} bottom={206} w={64} h={90} fill={COUNTER} stroke={COUNTER} mark />
      <Key x={78} y={232} anchor="middle" fill={COUNTER}>
        OFFER
      </Key>
      <Person x={330} y={226} s={1.4} />
      <Thought x={248} y={78} rx={58} ry={44} tx={316} ty={138} />
      {[24, 16, 8].map((rr, i) => (
        <circle key={rr} cx={248} cy={78} r={rr} fill={i % 2 === 0 ? SIGNAL : PAPER} />
      ))}
      <Key x={248} y={22} anchor="middle" fill={SIGNAL}>
        GOAL
      </Key>
      <path d="M112 150Q150 70 188 80" fill="none" stroke={SIGNAL} strokeWidth={2.6} strokeLinecap="round" />
      <circle cx={112} cy={150} r={4.5} fill={SIGNAL} />
      <circle cx={188} cy={80} r={4.5} fill={SIGNAL} />
    </Frame>
  );
}

/* ==========================================================================
   DRIVE THEORY
   ========================================================================== */

/** Tension over time: an unmet need, a drive, action, a return to balance. */
export function DriveCurve() {
  const curve = "M80 230L160 230C260 230 330 70 420 70C480 70 520 230 600 230L770 230";
  return (
    <Frame
      height={290}
      label="A line of tension over time. It sits on a dashed balanced-state line, starts rising at an unmet need, peaks as the drive at the moment of action, then tension falls back down to the balanced state."
    >
      <line x1={80} y1={36} x2={80} y2={250} stroke={INK} strokeWidth={1.4} />
      <line x1={80} y1={230} x2={770} y2={230} stroke={INK3} strokeWidth={1.4} strokeDasharray="4 5" />
      <path d={`${curve}Z`} fill={SIGNAL_TINT} />
      <path d={curve} fill="none" stroke={SIGNAL} strokeWidth={2.8} strokeLinejoin="round" />
      <Key x={0} y={0} anchor="end" fill={INK3} transform="translate(64 40) rotate(-90)">
        TENSION
      </Key>

      <circle cx={160} cy={230} r={6} fill={SIGNAL} />
      <Key x={160} y={258} anchor="middle" fill={INK}>
        UNMET NEED
      </Key>

      <Key x={420} y={54} anchor="middle" fill={SIGNAL} size={12}>
        DRIVE
      </Key>
      <line x1={420} y1={78} x2={420} y2={230} stroke={INK} strokeWidth={1.4} strokeDasharray="2 4" />
      <Bag x={420} y={176} w={34} />
      <Key x={420} y={258} anchor="middle" fill={INK}>
        ACTION
      </Key>

      <Arrow x1={528} y1={112} x2={566} y2={178} stroke={INK2} width={1.4} />
      <Key x={536} y={104} fill={INK2}>
        TENSION FALLS
      </Key>
      <Key x={770} y={216} anchor="end" fill={INK3}>
        BALANCED STATE
      </Key>
    </Frame>
  );
}

function NeedToItem({ kind }: { kind: "hunger" | "thirst" }) {
  const hunger = kind === "hunger";
  return (
    <Frame
      width={400}
      height={230}
      label={
        hunger
          ? "A nearly full gauge marked hunger. An arrow marked drive points to a steaming bowl of food."
          : "A nearly full gauge marked thirst. An arrow marked drive points to a glass of water."
      }
    >
      <Gauge x={70} top={30} h={150} level={0.86} label={hunger ? "HUNGER" : "THIRST"} />
      <Arrow x1={118} y1={106} x2={226} y2={106} stroke={SIGNAL} width={2.2} />
      <Key x={172} y={92} anchor="middle" fill={SIGNAL}>
        DRIVE
      </Key>
      {hunger ? <FoodBowl x={300} y={128} s={0.95} /> : <Glass x={300} y={176} s={1.05} />}
      <Key x={300} y={204} anchor="middle" fill={INK}>
        {hunger ? "FOOD" : "A DRINK"}
      </Key>
    </Frame>
  );
}

export function HungerFood() {
  return <NeedToItem kind="hunger" />;
}

export function ThirstDrink() {
  return <NeedToItem kind="thirst" />;
}

/** Marketing pushes the curve up (remind) or brings it down (reduce). */
export function MarketingDrive() {
  return (
    <Frame
      width={400}
      height={250}
      label="A small tension curve. On its rising side, an ad on a screen, marked remind, points into the rise. On its falling side, a teal product, marked reduce, points into the fall."
    >
      <line x1={24} y1={206} x2={384} y2={206} stroke={INK3} strokeWidth={1.2} strokeDasharray="4 5" />
      <path
        d="M24 206L90 206C150 206 170 90 220 90C260 90 290 206 350 206L384 206Z"
        fill={SIGNAL_TINT}
      />
      <path
        d="M24 206L90 206C150 206 170 90 220 90C260 90 290 206 350 206L384 206"
        fill="none"
        stroke={SIGNAL}
        strokeWidth={2.4}
      />
      {/* remind */}
      <rect x={34} y={74} width={74} height={50} rx={5} fill={INK} />
      <BrandMark x={71} y={99} s={0.72} />
      <rect x={66} y={124} width={10} height={10} fill={INK} />
      <Key x={71} y={60} anchor="middle" fill={INK}>
        REMIND
      </Key>
      <Arrow x1={112} y1={126} x2={150} y2={146} stroke={INK} width={1.8} />
      {/* reduce */}
      <Pack x={342} bottom={152} w={42} h={58} fill={COUNTER} stroke={COUNTER} mark />
      <Key x={342} y={80} anchor="middle" fill={COUNTER}>
        REDUCE
      </Key>
      <Arrow x1={318} y1={128} x2={286} y2={146} stroke={COUNTER} width={1.8} />
      <Key x={220} y={76} anchor="middle" fill={SIGNAL} size={10}>
        DRIVE
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   EXPECTANCY THEORY
   ========================================================================== */

export function ExpectancyChain() {
  return (
    <Frame
      height={290}
      label="Three stations left to right. Effort: a person lifting a dumbbell. Performance: three rising bars. Outcome: a trophy with three hearts above it marked valence. The arrow from effort to performance is marked expectancy; the arrow from performance to outcome is marked instrumentality."
    >
      {/* effort */}
      <line x1={117} y1={176} x2={104} y2={104} stroke={INK} strokeWidth={7} strokeLinecap="round" />
      <line x1={143} y1={176} x2={156} y2={104} stroke={INK} strokeWidth={7} strokeLinecap="round" />
      <Dumbbell x={130} y={100} s={1.1} />
      <Person x={130} y={216} s={1.3} />
      <path d="M160 132q-5 8 0 11q5 -3 0 -11Z" fill={INK3} />
      <path d="M100 138q-4 7 0 9q4 -2 0 -9Z" fill={INK3} />

      {/* performance */}
      {[
        { x: 364, h: 40 },
        { x: 400, h: 72 },
        { x: 436, h: 108 },
      ].map((b, i) => (
        <rect key={b.x} x={b.x - 14} y={216 - b.h} width={28} height={b.h} rx={2} fill={i === 2 ? SIGNAL : INK3} />
      ))}
      <line x1={336} y1={216} x2={464} y2={216} stroke={INK} strokeWidth={1.6} />

      {/* outcome */}
      <Trophy x={670} y={116} s={1.15} />
      <Key x={670} y={34} anchor="middle" fill={SIGNAL}>
        VALENCE
      </Key>
      {[-26, 0, 26].map((dx) => (
        <Heart key={dx} x={670 + dx} y={62} s={0.78} />
      ))}

      {/* links */}
      <Arrow x1={196} y1={156} x2={328} y2={156} stroke={INK} width={1.8} />
      <Key x={262} y={142} anchor="middle" fill={SIGNAL}>
        EXPECTANCY
      </Key>
      <Arrow x1={476} y1={156} x2={596} y2={156} stroke={INK} width={1.8} />
      <Key x={536} y={142} anchor="middle" fill={SIGNAL}>
        INSTRUMENTALITY
      </Key>

      {[
        { x: 130, t: "EFFORT" },
        { x: 400, t: "PERFORMANCE" },
        { x: 670, t: "OUTCOME" },
      ].map((k) => (
        <Key key={k.t} x={k.x} y={250} anchor="middle" fill={INK} size={12}>
          {k.t}
        </Key>
      ))}
    </Frame>
  );
}

/** Three beliefs, each filling a third of the motivation bar. */
export function MoreMotivated() {
  const cols = [150, 400, 650];
  const seg = [90, 296.67, 503.33, 710].map(r2);
  return (
    <Frame
      height={290}
      label="Three conditions side by side, each ticked: a small hill with a flag marked goal seems possible, a teal product marked product seems useful, and a trophy marked result feels valuable. Arrows run down from each into one bar, filling a third of it each, marked more motivated."
    >
      {/* possible */}
      <path d="M100 104Q150 24 200 104Z" fill={PAPER2} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
      <line x1={150} y1={64} x2={150} y2={34} stroke={INK} strokeWidth={2} />
      <path d="M150 34H172L166 41L172 48H150Z" fill={SIGNAL} />
      {/* useful */}
      <Pack x={400} bottom={104} w={46} h={66} fill={COUNTER} stroke={COUNTER} mark />
      {/* valuable */}
      <Trophy x={650} y={42} s={0.66} />

      {[
        ["GOAL SEEMS", "POSSIBLE"],
        ["PRODUCT SEEMS", "USEFUL"],
        ["RESULT FEELS", "VALUABLE"],
      ].map(([a, b], i) => (
        <g key={a}>
          <Key x={cols[i]} y={134} anchor="middle" fill={INK}>
            {a}
          </Key>
          <Key x={cols[i]} y={150} anchor="middle" fill={INK}>
            {b}
          </Key>
          <circle cx={cols[i]} cy={174} r={11} fill={SIGNAL_TINT} />
          <Check x={cols[i] - 1} y={175} s={0.9} />
          <Arrow x1={cols[i]} y1={190} x2={cols[i]} y2={210} stroke={INK3} width={1.4} />
          <rect
            x={seg[i]}
            y={216}
            width={r2(seg[i + 1] - seg[i])}
            height={28}
            fill={SIGNAL}
            opacity={[0.5, 0.75, 1][i]}
          />
        </g>
      ))}
      <rect x={90} y={216} width={620} height={28} fill="none" stroke={INK} strokeWidth={1.6} />
      <Key x={400} y={274} anchor="middle" fill={SIGNAL} size={12}>
        MORE MOTIVATED
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   NEEDS, WANTS, AND DEMAND
   ========================================================================== */

export function NeedWantDemand() {
  return (
    <Frame
      height={290}
      label="Three stations. Need: a nearly full gauge marked hunger. Want: a burger, marked a specific product. Demand: the burger plus a wallet with coins, marked ability and willingness to pay."
    >
      <Gauge x={140} top={50} h={130} level={0.86} />
      <Burger x={400} y={128} s={0.95} />
      <Burger x={610} y={128} s={0.72} />
      <Display x={666} y={138} anchor="middle" size={26} fill={INK3}>
        +
      </Display>
      <Wallet x={716} y={136} s={0.9} />
      <Arrow x1={196} y1={120} x2={320} y2={120} stroke={INK} width={1.8} />
      <Arrow x1={476} y1={120} x2={552} y2={120} stroke={INK} width={1.8} />

      {[
        { x: 140, t: "NEED", k: "HUNGER", tone: INK },
        { x: 400, t: "WANT", k: "A SPECIFIC PRODUCT", tone: INK },
        { x: 660, t: "DEMAND", k: "ABILITY + WILLINGNESS TO PAY", tone: SIGNAL },
      ].map((s) => (
        <g key={s.t}>
          <Display x={s.x} y={234} anchor="middle" size={28} fill={s.tone}>
            {s.t}
          </Display>
          <Key x={s.x} y={262} anchor="middle" fill={INK3}>
            {s.k}
          </Key>
        </g>
      ))}
    </Frame>
  );
}

/** One need, three wants: culture, personality and past experience. */
export function ShapedWants() {
  const ends = [
    { y: 60, key: "CULTURE", food: <RiceBowl x={612} y={74} s={0.62} /> },
    { y: 150, key: "PERSONALITY", food: <Burger x={612} y={160} s={0.62} /> },
    { y: 240, key: "PAST EXPERIENCE", food: <Pizza x={612} y={242} s={0.66} /> },
  ];
  return (
    <Frame
      height={300}
      label="One nearly full gauge marked hunger on the left. Three curved arrows fan out from it to three different foods: a bowl of rice, a burger and a slice of pizza. The arrows are marked culture, personality and past experience."
    >
      <Gauge x={110} top={70} h={130} level={0.86} label="HUNGER" />
      {ends.map((e) => (
        <g key={e.key}>
          <CurveArrow x1={150} y1={135} cx={330} cy={e.y} x2={540} y2={e.y} stroke={SIGNAL} width={2} />
          <Key x={462} y={e.y - (e.y > 200 ? 22 : 12)} anchor="middle" fill={INK}>
            {e.key}
          </Key>
          {e.food}
        </g>
      ))}
    </Frame>
  );
}

/** Demand needs both: the ability and the willingness to pay. */
export function DemandTest() {
  const cols = [
    { x: 380, able: false, willing: true },
    { x: 530, able: true, willing: false },
    { x: 680, able: true, willing: true },
  ];
  return (
    <Frame
      height={290}
      label="Three people all thinking of the same phone. Two rows below them: ability to pay and willingness to pay. The first person is willing but not able; the second is able but not willing; the third is both, and only that column is marked demand. The other two are marked want."
    >
      <rect x={612} y={10} width={136} height={274} rx={8} fill={SIGNAL_TINT} />
      <Key x={40} y={206} fill={INK}>
        ABILITY TO PAY
      </Key>
      <Key x={40} y={238} fill={INK}>
        WILLINGNESS TO PAY
      </Key>
      <line x1={40} y1={184} x2={760} y2={184} stroke={RULE} />
      <line x1={40} y1={218} x2={760} y2={218} stroke={RULE} />
      <line x1={40} y1={250} x2={760} y2={250} stroke={RULE} />
      {cols.map((c) => {
        const demand = c.able && c.willing;
        return (
          <g key={c.x}>
            <Person x={c.x} y={172} s={1.1} fill={demand ? SIGNAL : INK} />
            <Thought x={c.x + 36} y={52} rx={30} ry={30} tx={c.x + 8} ty={96} />
            <Phone x={c.x + 36} y={52} s={0.52} />
            {c.able ? <Check x={c.x} y={202} /> : <Cross x={c.x} y={201} />}
            {c.willing ? <Check x={c.x} y={234} /> : <Cross x={c.x} y={233} />}
            <Key x={c.x} y={274} anchor="middle" fill={demand ? SIGNAL : INK3} size={demand ? 12 : 10.5}>
              {demand ? "DEMAND" : "WANT"}
            </Key>
          </g>
        );
      })}
    </Frame>
  );
}

/** A bottle outline; (x, bottom) is its base centre. */
function Bottle({ x, bottom, dash }: { x: number; bottom: number; dash?: string }) {
  return (
    <path
      d={`M${x - 18} ${bottom}V${bottom - 50}Q${x - 18} ${bottom - 62} ${x - 8} ${bottom - 66}V${bottom - 80}H${x + 8}V${bottom - 66}Q${x + 18} ${bottom - 62} ${x + 18} ${bottom - 50}V${bottom}Z`}
      fill="none"
      stroke={INK3}
      strokeWidth={1.8}
      strokeDasharray={dash}
      strokeLinejoin="round"
    />
  );
}

/** Marketers shape the want above ground; the need beneath is not theirs to make. */
export function ShapeNotCreate() {
  return (
    <Frame
      width={400}
      height={260}
      label="Above ground, marked want: a teal product between two dashed alternatives, a bottle and a can, with an orange arc over them marked can shape. Below, a solid dark band marked need, with a padlock and the words cannot create."
    >
      <CurveArrow x1={96} y1={86} cx={200} cy={0} x2={304} y2={86} stroke={SIGNAL} width={2.2} />
      <Key x={200} y={34} anchor="middle" fill={SIGNAL}>
        CAN SHAPE
      </Key>
      <Bottle x={104} bottom={176} dash="4 4" />
      <Pack x={200} bottom={176} w={52} h={80} fill={COUNTER} stroke={COUNTER} mark />
      <rect x={278} y={122} width={40} height={54} rx={5} fill="none" stroke={INK3} strokeWidth={1.8} strokeDasharray="4 4" />
      <line x1={278} y1={132} x2={318} y2={132} stroke={INK3} strokeWidth={1.4} strokeDasharray="4 4" />
      <Key x={24} y={170} fill={INK}>
        WANT
      </Key>

      <rect x={20} y={180} width={360} height={62} rx={4} fill={INK} />
      <Key x={40} y={216} fill={PAPER} size={12}>
        NEED
      </Key>
      <Key x={316} y={216} anchor="end" fill={RULE2}>
        CANNOT CREATE
      </Key>
      {/* padlock */}
      <path d="M340 206v-8a9 9 0 0 1 18 0v8" fill="none" stroke={PAPER} strokeWidth={3} />
      <rect x={334} y={205} width={30} height={22} rx={3} fill={PAPER} />
      <circle cx={349} cy={215} r={3} fill={INK} />
    </Frame>
  );
}

/* ==========================================================================
   MASLOW
   ========================================================================== */

const TIERS = ["PHYSIOLOGICAL", "SAFETY", "BELONGING", "ESTEEM", "SELF-ACTUALIZATION"];
const TIER_FILL = [PAPER2, PAPER2, COUNTER_TINT, COUNTER_TINT, SIGNAL_TINT];

export function MaslowPyramid() {
  const apex = 330;
  const top = 30;
  const base = 400;
  const halfBase = 260;
  const th = (base - top) / 5;
  const half = (y: number) => (halfBase * (y - top)) / (base - top);
  return (
    <Frame
      height={420}
      label="Maslow's pyramid in five tiers, from basic needs at the bottom to higher-order needs at the top. Physiological: a bowl, a water drop and a moon. Safety: a shield. Belonging: two people. Esteem: a star. Self-actualization: a sprout."
    >
      {/* basic → higher-order */}
      <line x1={30} y1={396} x2={30} y2={44} stroke={INK3} strokeWidth={1.4} />
      <path d={headAlong(30, 40, 0, -1, 9)} fill="none" stroke={INK3} strokeWidth={1.4} />
      <Key x={0} y={0} fill={INK3} transform="translate(20 398) rotate(-90)">
        BASIC
      </Key>
      <Key x={0} y={0} anchor="end" fill={SIGNAL} transform="translate(20 56) rotate(-90)">
        HIGHER-ORDER
      </Key>

      {TIERS.map((name, i) => {
        const yb = base - i * th;
        const yt = yb - th;
        const mid = r2((yb + yt) / 2);
        const hb = half(yb);
        const ht = half(yt);
        const edge = r2(apex + half(mid));
        return (
          <g key={name}>
            <path
              d={`M${r2(apex - hb)} ${r2(yb)}H${r2(apex + hb)}L${r2(apex + ht)} ${r2(yt)}H${r2(apex - ht)}Z`}
              fill={TIER_FILL[i]}
              stroke={INK}
              strokeWidth={1.6}
              strokeLinejoin="round"
            />
            <line x1={edge + 12} y1={mid} x2={608} y2={mid} stroke={RULE2} strokeDasharray="2 4" />
            <Key x={618} y={mid + 4} fill={i === 4 ? SIGNAL : INK} size={11.5}>
              {name}
            </Key>
          </g>
        );
      })}

      {/* physiological: food, water, sleep */}
      <FoodBowl x={258} y={362} s={0.34} />
      <path d="M330 346q-12 16 -12 24a12 12 0 0 0 24 0q0 -8 -12 -24Z" fill={COUNTER} />
      <path d="M404 350a14 14 0 1 0 12 20a11 11 0 1 1 -12 -20Z" fill={INK} />
      {/* safety: a shield */}
      <path d="M330 268l20 7v12c0 12 -8 20 -20 25c-12 -5 -20 -13 -20 -25v-12Z" fill={INK} />
      <Check x={329} y={289} s={0.9} stroke={PAPER} />
      {/* belonging */}
      <Person x={318} y={236} s={0.56} fill={COUNTER} />
      <Person x={342} y={236} s={0.56} fill={COUNTER} />
      {/* esteem */}
      <Star x={330} y={144} R={17} fill={COUNTER} />
      {/* self-actualization: a sprout */}
      <path d="M330 94V66" stroke={SIGNAL} strokeWidth={3} strokeLinecap="round" />
      <path d="M330 72q-14 -2 -16 -14q14 0 16 14Z" fill={SIGNAL} />
      <path d="M330 78q12 -2 14 -12q-12 0 -14 12Z" fill={SIGNAL} />
    </Frame>
  );
}

/** A tiny pyramid for a row of text: which tiers the line is about. */
export function TierMark({ lit }: { lit: number[] }) {
  return (
    <svg viewBox="0 0 64 54" className="h-12 w-14 shrink-0" aria-hidden>
      <MiniPyramid x={32} base={50} w={60} h={46} lit={lit} />
    </svg>
  );
}

/** Several tiers at once from one bag. */
export function SeveralLevels() {
  const base = 230;
  const h = 200;
  const w = 200;
  const cx = 120;
  const mid = (i: number) => base - (i + 0.5) * (h / 5);
  const edge = (i: number) => r2(cx + (w / 2) * ((mid(i) - (base - h)) / h));
  const lit = [0, 2, 4];
  return (
    <Frame
      width={400}
      height={260}
      label="A small five-tier pyramid. One shopping bag on the right has orange lines running to three different tiers at once, the bottom, middle and top tiers, which are lit. Marked at the same time."
    >
      <MiniPyramid x={cx} base={base} w={w} h={h} lit={lit} />
      {lit.map((i) => (
        <g key={i}>
          <line x1={edge(i) + 6} y1={mid(i)} x2={318} y2={130} stroke={SIGNAL} strokeWidth={2} />
          <circle cx={edge(i) + 6} cy={mid(i)} r={3.5} fill={SIGNAL} />
        </g>
      ))}
      <Bag x={338} y={132} w={44} />
      <Key x={338} y={196} anchor="middle" fill={SIGNAL}>
        AT THE SAME
      </Key>
      <Key x={338} y={212} anchor="middle" fill={SIGNAL}>
        TIME
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   MOTIVATIONAL CONFLICTS
   ========================================================================== */

/** An option: a disc marked + (attractive), − (unwanted), or split in two. */
function Option({ x, y, r = 32, kind }: { x: number; y: number; r?: number; kind: "plus" | "minus" | "both" }) {
  const bar = r * 0.42;
  if (kind === "both") {
    return (
      <g>
        <path d={`M${x} ${y - r}A${r} ${r} 0 0 0 ${x} ${y + r}Z`} fill={SIGNAL} />
        <path d={`M${x} ${y - r}A${r} ${r} 0 0 1 ${x} ${y + r}Z`} fill={INK} />
        <g stroke={PAPER} strokeWidth={3.4} strokeLinecap="round">
          <line x1={r2(x - r / 2 - bar / 2)} y1={y} x2={r2(x - r / 2 + bar / 2)} y2={y} />
          <line x1={r2(x - r / 2)} y1={r2(y - bar / 2)} x2={r2(x - r / 2)} y2={r2(y + bar / 2)} />
          <line x1={r2(x + r / 2 - bar / 2)} y1={y} x2={r2(x + r / 2 + bar / 2)} y2={y} />
        </g>
      </g>
    );
  }
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={kind === "plus" ? SIGNAL : INK} />
      <g stroke={PAPER} strokeWidth={3.6} strokeLinecap="round">
        <line x1={r2(x - bar)} y1={y} x2={r2(x + bar)} y2={y} />
        {kind === "plus" ? <line x1={x} y1={r2(y - bar)} x2={x} y2={r2(y + bar)} /> : null}
      </g>
    </g>
  );
}

function ConflictPlate({ kind }: { kind: "aa" | "av" | "vv" }) {
  const labels = {
    aa: "A person between two attractive options, each marked plus. Orange arrows pull the person toward both.",
    av: "A person facing one option that is half plus and half minus. An orange arrow pulls the person toward it; a dark arrow pushes them back.",
    vv: "A person between two unwanted options, each marked minus. Dark arrows push the person away from both.",
  };
  return (
    <Frame width={400} height={220} label={labels[kind]}>
      <line x1={20} y1={206} x2={380} y2={206} stroke={RULE2} />
      {kind === "av" ? (
        <>
          <Person x={112} y={206} s={1.3} />
          <Option x={300} y={100} r={36} kind="both" />
          <Arrow x1={138} y1={118} x2={254} y2={92} stroke={SIGNAL} width={2.4} />
          <Arrow x1={256} y1={126} x2={140} y2={152} stroke={INK} width={2.4} />
        </>
      ) : (
        <>
          <Person x={200} y={206} s={1.3} />
          <Option x={66} y={96} kind={kind === "aa" ? "plus" : "minus"} />
          <Option x={334} y={96} kind={kind === "aa" ? "plus" : "minus"} />
          {kind === "aa" ? (
            <>
              <Arrow x1={176} y1={128} x2={106} y2={106} stroke={SIGNAL} width={2.4} />
              <Arrow x1={224} y1={128} x2={294} y2={106} stroke={SIGNAL} width={2.4} />
            </>
          ) : (
            <>
              <Arrow x1={104} y1={112} x2={172} y2={134} stroke={INK} width={2.4} />
              <Arrow x1={296} y1={112} x2={228} y2={134} stroke={INK} width={2.4} />
            </>
          )}
        </>
      )}
    </Frame>
  );
}

export function ApproachApproach() {
  return <ConflictPlate kind="aa" />;
}

export function ApproachAvoidance() {
  return <ConflictPlate kind="av" />;
}

export function AvoidanceAvoidance() {
  return <ConflictPlate kind="vv" />;
}

/** A suitcase, centred on (x, y). */
function Suitcase({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-16 -40v-10a6 6 0 0 1 6 -6h20a6 6 0 0 1 6 6v10" fill="none" stroke={INK} strokeWidth={5} />
      <rect x={-56} y={-40} width={112} height={80} rx={10} fill={SIGNAL} />
      <line x1={-30} y1={-40} x2={-30} y2={40} stroke={PAPER} strokeWidth={4} />
      <line x1={30} y1={-40} x2={30} y2={40} stroke={PAPER} strokeWidth={4} />
      <circle cx={-38} cy={46} r={5} fill={INK} />
      <circle cx={38} cy={46} r={5} fill={INK} />
    </g>
  );
}

/** Two attractive options; the budget allows one. */
export function PhoneOrTrip() {
  return (
    <Frame
      height={300}
      label="A new phone on the left and a suitcase for a weekend trip on the right, both marked plus. In the middle, above a person, a wallet with a single coin, marked budget, with dashed arrows to both and the word or between them."
    >
      <Phone x={150} y={124} s={1.4} fill={INK} screen={SIGNAL_TINT} />
      <Option x={196} y={60} r={16} kind="plus" />
      <Suitcase x={650} y={130} s={0.95} />
      <Option x={712} y={70} r={16} kind="plus" />
      <Key x={150} y={216} anchor="middle" fill={INK}>
        A NEW PHONE
      </Key>
      <Key x={650} y={216} anchor="middle" fill={INK}>
        A WEEKEND TRIP
      </Key>

      <Wallet x={400} y={112} s={1} coins={1} />
      <Key x={400} y={162} anchor="middle" fill={COUNTER}>
        BUDGET
      </Key>
      <CurveArrow x1={352} y1={104} cx={280} cy={70} x2={210} y2={100} stroke={INK3} width={1.8} dash="5 5" />
      <CurveArrow x1={448} y1={104} cx={520} cy={70} x2={582} y2={100} stroke={INK3} width={1.8} dash="5 5" />
      <Display x={400} y={52} anchor="middle" size={24} fill={INK3}>
        or
      </Display>
      <Person x={400} y={290} s={1.4} />
    </Frame>
  );
}

/** A strong brand spells out benefits and cost; the conflict gauge drops. */
export function ClearerChoice() {
  return (
    <Frame
      height={260}
      label="Two panels. Left: a vague offer card with smudged grey lines and question marks, beside a nearly full gauge marked conflict. Right: a strong brand's card with the brand badge, three ticked benefits and a clear cost, beside a nearly empty conflict gauge."
    >
      <line x1={400} y1={20} x2={400} y2={236} stroke={RULE} strokeDasharray="3 5" />

      {/* vague */}
      <rect x={60} y={36} width={200} height={170} rx={8} fill={PAPER} stroke={INK3} strokeWidth={1.8} />
      <rect x={80} y={54} width={34} height={34} rx={8} fill={RULE2} />
      {[108, 134, 160].map((y, i) => (
        <g key={y}>
          <path
            d={`M80 ${y}q20 -6 40 0t40 0t40 0`}
            fill="none"
            stroke={RULE2}
            strokeWidth={6}
            strokeLinecap="round"
            opacity={1 - i * 0.2}
          />
        </g>
      ))}
      <line x1={80} y1={184} x2={150} y2={184} stroke={RULE2} strokeWidth={6} strokeLinecap="round" />
      <Display x={236} y={84} anchor="middle" size={28} fill={INK3}>
        ?
      </Display>
      <Display x={236} y={194} anchor="middle" size={28} fill={INK3}>
        ?
      </Display>
      <Gauge x={320} top={50} h={140} level={0.86} label="CONFLICT" />

      {/* clear */}
      <rect x={440} y={36} width={200} height={170} rx={8} fill={PAPER} stroke={COUNTER} strokeWidth={2} />
      <BrandMark x={476} y={71} s={0.9} />
      <Key x={504} y={76} fill={COUNTER}>
        BENEFITS
      </Key>
      {[108, 128, 148].map((y, i) => (
        <g key={y}>
          <Check x={466} y={y} s={0.85} />
          <rect x={482} y={y - 4} width={[120, 96, 108][i]} height={7} rx={3.5} fill={INK2} />
        </g>
      ))}
      <line x1={460} y1={166} x2={620} y2={166} stroke={RULE} />
      <Key x={460} y={192} fill={INK}>
        COST
      </Key>
      <Display x={620} y={196} anchor="end" size={22} fill={INK}>
        $29
      </Display>
      <Gauge x={720} top={50} h={140} level={0.14} label="CONFLICT" labelFill={INK3} />
    </Frame>
  );
}

/* ==========================================================================
   CONSUMER INVOLVEMENT
   ========================================================================== */

/** A LOW–HIGH track with a marker at `level`. */
function Meter({ x1, x2, y, level, tone = SIGNAL }: { x1: number; x2: number; y: number; level: number; tone?: string }) {
  const mx = r2(x1 + (x2 - x1) * level);
  return (
    <g>
      <line x1={x1} y1={y} x2={x2} y2={y} stroke={RULE2} strokeWidth={6} strokeLinecap="round" />
      <line x1={x1} y1={y} x2={mx} y2={y} stroke={tone} strokeWidth={6} strokeLinecap="round" />
      <circle cx={mx} cy={y} r={8} fill={PAPER} stroke={tone} strokeWidth={3} />
      <Key x={x1 - 14} y={y + 4} anchor="end" fill={INK3} size={9}>
        LOW
      </Key>
      <Key x={x2 + 14} y={y + 4} fill={INK3} size={9}>
        HIGH
      </Key>
    </g>
  );
}

/** Personal importance: gum, shoes, a car along one axis. */
export function InvolvementScale() {
  return (
    <Frame
      height={220}
      label="A horizontal axis marked involvement, running from low to high. Along it: a pack of gum near low, a running shoe in the middle, and a car near high."
    >
      <line x1={80} y1={176} x2={716} y2={176} stroke={INK} strokeWidth={1.6} />
      <path d={headAlong(722, 176, 1, 0, 10)} fill="none" stroke={INK} strokeWidth={1.6} />
      <Key x={80} y={206} fill={INK3}>
        LOW
      </Key>
      <Key x={722} y={206} anchor="end" fill={SIGNAL}>
        HIGH
      </Key>
      <Key x={400} y={206} anchor="middle" fill={INK}>
        INVOLVEMENT
      </Key>
      {[
        { x: 170, g: <Gum x={170} y={152} s={1.5} /> },
        { x: 400, g: <Shoe x={400} y={144} s={2.6} fill={INK} /> },
        { x: 630, g: <Car x={630} y={160} s={1.45} /> },
      ].map((it) => (
        <g key={it.x}>
          <line x1={it.x} y1={162} x2={it.x} y2={176} stroke={INK3} strokeWidth={1.2} />
          <circle cx={it.x} cy={176} r={4.5} fill={it.x > 600 ? SIGNAL : INK} />
          {it.g}
        </g>
      ))}
    </Frame>
  );
}

/** Product involvement: identity, risk, daily life. */
export function ProductInvolvement() {
  const tags = [
    { x: 76, y: 56, t: "IDENTITY" },
    { x: 324, y: 56, t: "RISK" },
    { x: 200, y: 186, t: "DAILY LIFE" },
  ];
  return (
    <Frame
      width={400}
      height={250}
      label="A phone in the centre with three tags linked to it: identity, risk and daily life. Below, a meter from low to high sits near high."
    >
      {tags.map((t) => (
        <line key={t.t} x1={200} y1={100} x2={t.x} y2={t.y} stroke={SIGNAL} strokeWidth={1.6} />
      ))}
      <Phone x={200} y={100} s={1.1} />
      {tags.map((t) => {
        const w = t.t.length * 9 + 22;
        return (
          <g key={t.t}>
            <rect x={r2(t.x - w / 2)} y={t.y - 14} width={w} height={26} rx={13} fill={PAPER} stroke={SIGNAL} strokeWidth={1.6} />
            <Key x={t.x} y={t.y + 4} anchor="middle" fill={SIGNAL} size={10}>
              {t.t}
            </Key>
          </g>
        );
      })}
      <Meter x1={100} x2={300} y={230} level={0.88} />
    </Frame>
  );
}

/** Message involvement: close attention to the words of an ad. */
export function MessageInvolvement() {
  return (
    <Frame
      width={400}
      height={250}
      label="A person leans toward an ad and reads it closely: four orange sight lines run to the lines of text on the ad. Below, a meter from low to high sits near high."
    >
      <rect x={210} y={20} width={150} height={174} rx={6} fill={PAPER} stroke={INK} strokeWidth={2} />
      <BrandMark x={240} y={50} s={0.8} />
      {[84, 106, 128, 150, 172].map((y, i) => (
        <rect key={y} x={228} y={y - 4} width={[112, 96, 116, 84, 64][i]} height={7} rx={3.5} fill={INK2} />
      ))}
      <g transform="rotate(10 110 194)">
        <Person x={110} y={194} s={1.4} />
      </g>
      {[84, 106, 128, 150].map((y) => (
        <line key={y} x1={138} y1={128} x2={222} y2={y} stroke={SIGNAL} strokeWidth={1.4} strokeDasharray="3 3" />
      ))}
      <line x1={20} y1={196} x2={380} y2={196} stroke={RULE2} />
      <Meter x1={100} x2={300} y={230} level={0.86} />
    </Frame>
  );
}

/** A clock face, centred on (x, y). */
function Clock({ x, y, r = 22 }: { x: number; y: number; r?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={PAPER} stroke={INK} strokeWidth={2.4} />
      <line x1={x} y1={y} x2={x} y2={r2(y - r * 0.7)} stroke={INK} strokeWidth={2.4} strokeLinecap="round" />
      <line x1={x} y1={y} x2={r2(x + r * 0.5)} y2={r2(y + r * 0.2)} stroke={SIGNAL} strokeWidth={2.4} strokeLinecap="round" />
      <rect x={x - 5} y={r2(y - r - 8)} width={10} height={6} rx={2} fill={INK} />
    </g>
  );
}

/** Purchase-situation involvement: time pressure, social setting, perceived risk. */
export function SituationInvolvement() {
  return (
    <Frame
      width={400}
      height={250}
      label="Three icons: a clock marked time pressure, a group of people marked social setting, a warning triangle marked perceived risk. Arrows run down from each to a meter whose marker moves both ways."
    >
      <Clock x={70} y={80} />
      <Person x={184} y={104} s={0.7} fill={INK3} />
      <Person x={216} y={104} s={0.7} fill={INK3} />
      <Person x={200} y={108} s={0.8} />
      <path d="M330 56L356 102H304Z" fill={SIGNAL} stroke={SIGNAL} strokeWidth={4} strokeLinejoin="round" />
      <line x1={330} y1={70} x2={330} y2={86} stroke={PAPER} strokeWidth={3.4} strokeLinecap="round" />
      <circle cx={330} cy={94} r={2.2} fill={PAPER} />
      {[
        [70, "TIME", "PRESSURE"],
        [200, "SOCIAL", "SETTING"],
        [330, "PERCEIVED", "RISK"],
      ].map(([x, a, b]) => (
        <g key={a as string}>
          <Key x={x as number} y={132} anchor="middle" fill={INK} size={9.5}>
            {a}
          </Key>
          <Key x={x as number} y={146} anchor="middle" fill={INK} size={9.5}>
            {b}
          </Key>
          <Arrow x1={x as number} y1={156} x2={r2(200 + ((x as number) - 200) * 0.3)} y2={196} stroke={INK3} width={1.3} />
        </g>
      ))}
      <Meter x1={100} x2={300} y={224} level={0.55} />
      <path d="M186 206h28" stroke={SIGNAL} strokeWidth={1.6} />
      <path d={headAlong(182, 206, -1, 0, 6)} fill="none" stroke={SIGNAL} strokeWidth={1.6} />
      <path d={headAlong(218, 206, 1, 0, 6)} fill="none" stroke={SIGNAL} strokeWidth={1.6} />
    </Frame>
  );
}

/** High involvement compares carefully; low involvement grabs the familiar pack. */
export function HighVsLow() {
  return (
    <Frame
      height={320}
      label="Two panels. High involvement: a person holds a magnifying glass up to three products, each with its own checklist of ticks and crosses beneath. Low involvement: a person reaches straight for the one familiar teal pack on a shelf."
    >
      <line x1={400} y1={16} x2={400} y2={300} stroke={RULE} strokeDasharray="3 5" />
      <Key x={24} y={30} fill={SIGNAL} size={11.5}>
        HIGH INVOLVEMENT
      </Key>
      <Key x={424} y={30} fill={INK3} size={11.5}>
        LOW INVOLVEMENT
      </Key>

      {/* high: careful comparison */}
      <Person x={66} y={260} s={1.4} />
      <line x1={86} y1={206} x2={112} y2={160} stroke={INK} strokeWidth={7} strokeLinecap="round" />
      <Magnifier x={124} y={138} r={18} />
      {[200, 270, 340].map((x, i) => (
        <g key={x}>
          <line x1={140} y1={132} x2={x - 22} y2={98} stroke={INK3} strokeWidth={1.2} strokeDasharray="2 4" />
          <Pack
            x={x}
            bottom={136}
            w={44}
            h={64}
            fill={[PAPER2, COUNTER, PAPER][i]}
            stroke={[RULE2, COUNTER, INK3][i]}
            mark={i === 1}
          />
          <rect x={x - 28} y={150} width={56} height={92} rx={4} fill={PAPER} stroke={RULE2} strokeWidth={1.4} />
          {[0, 1, 2, 3].map((r) => {
            const ok = (i + r) % 3 !== 0;
            const y = 168 + r * 20;
            return (
              <g key={r}>
                {ok ? <Check x={x - 15} y={y} s={0.6} /> : <Cross x={x - 15} y={y} s={0.6} />}
                <rect x={x - 6} y={y - 3} width={26} height={5} rx={2.5} fill={RULE2} />
              </g>
            );
          })}
        </g>
      ))}
      <line x1={20} y1={260} x2={380} y2={260} stroke={RULE2} />
      <Key x={200} y={290} anchor="middle" fill={INK}>
        MORE EFFORT · CAREFUL COMPARISON
      </Key>

      {/* low: habit and simple cues */}
      {[118, 196].map((y, r) => (
        <g key={y}>
          {[530, 580, 630, 680, 730].map((x, c) => {
            const mine = r === 1 && c === 2;
            return (
              <Pack
                key={x}
                x={x}
                bottom={y}
                w={36}
                h={52}
                fill={mine ? COUNTER : PAPER2}
                stroke={mine ? COUNTER : RULE2}
                mark={mine}
              />
            );
          })}
          <line x1={500} y1={y + 1} x2={760} y2={y + 1} stroke={INK} strokeWidth={1.8} />
        </g>
      ))}
      <circle cx={630} cy={170} r={36} fill="none" stroke={SIGNAL} strokeWidth={1.6} strokeDasharray="4 4" />
      <Person x={450} y={260} s={1.3} />
      <line x1={466} y1={214} x2={560} y2={176} stroke={INK} strokeWidth={7} strokeLinecap="round" />
      <Arrow x1={572} y1={172} x2={604} y2={170} stroke={SIGNAL} width={2.2} />
      <line x1={420} y1={260} x2={780} y2={260} stroke={RULE2} />
      <Key x={600} y={290} anchor="middle" fill={INK}>
        HABIT · SIMPLE CUES
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   VALUES
   ========================================================================== */

/** Functional value: performance, convenience, reliability. */
export function FunctionalValue() {
  return (
    <Frame
      width={400}
      height={230}
      label="A running shoe with three ticks beneath it: performance, convenience, reliability."
    >
      <Shoe x={200} y={96} s={2.6} fill={INK} />
      <line x1={100} y1={116} x2={300} y2={116} stroke={RULE2} />
      {["PERFORMANCE", "CONVENIENCE", "RELIABILITY"].map((t, i) => (
        <g key={t}>
          <Check x={136} y={148 + i * 28} />
          <Key x={154} y={152 + i * 28} fill={INK}>
            {t}
          </Key>
        </g>
      ))}
    </Frame>
  );
}

/** Social value: belonging, recognition, how others see you. */
export function SocialValue() {
  return (
    <Frame
      width={400}
      height={230}
      label="A person in orange running shoes stands in the centre. Two people on either side look at them along dashed sight lines. A star floats above the person in the centre."
    >
      <Person x={70} y={206} s={1.15} fill={INK3} />
      <Person x={330} y={206} s={1.15} fill={INK3} />
      <line x1={82} y1={124} x2={176} y2={112} stroke={INK3} strokeWidth={1.4} strokeDasharray="3 4" />
      <line x1={318} y1={124} x2={224} y2={112} stroke={INK3} strokeWidth={1.4} strokeDasharray="3 4" />
      <Person x={200} y={200} s={1.45} />
      <Shoe x={190} y={200} s={0.5} fill={SIGNAL} />
      <Shoe x={212} y={200} s={0.5} fill={SIGNAL} />
      <Star x={200} y={34} R={16} />
      <line x1={20} y1={206} x2={380} y2={206} stroke={RULE2} />
    </Frame>
  );
}

/** Experiential value: pleasure, excitement, comfort, meaning. */
export function ExperientialValue() {
  return (
    <Frame
      width={400}
      height={230}
      label="A person with arms raised in joy, wearing orange running shoes, surrounded by sparkles and a heart."
    >
      <line x1={187} y1={146} x2={160} y2={84} stroke={INK} strokeWidth={8} strokeLinecap="round" />
      <line x1={213} y1={146} x2={240} y2={84} stroke={INK} strokeWidth={8} strokeLinecap="round" />
      <Person x={200} y={200} s={1.45} />
      <Shoe x={190} y={200} s={0.5} fill={SIGNAL} />
      <Shoe x={212} y={200} s={0.5} fill={SIGNAL} />
      <Heart x={200} y={40} s={1.3} />
      <Sparkle x={120} y={70} r={12} />
      <Sparkle x={284} y={62} r={9} />
      <Sparkle x={290} y={130} r={13} />
      <Sparkle x={108} y={142} r={8} />
      <line x1={20} y1={206} x2={380} y2={206} stroke={RULE2} />
    </Frame>
  );
}

/** The one that fits their values, not the one with the most features. */
export function FitsValues() {
  return (
    <Frame
      height={300}
      label="A consumer thinking of a heart. Two products: one with a long list of eight ticked features, marked most features; one with four ticks and the same heart on it, marked fits their values. A dashed orange line joins the heart in the consumer's thought to the heart on the second product."
    >
      <Person x={100} y={270} s={1.5} />
      <Thought x={170} y={82} rx={40} ry={32} tx={112} ty={170} />
      <Heart x={170} y={84} s={1.3} />
      <CurveArrow x1={212} y1={70} cx={430} cy={-12} x2={622} y2={74} stroke={SIGNAL} width={2} dash="5 5" />

      {/* most features */}
      <rect x={330} y={44} width={140} height={200} rx={8} fill={PAPER} stroke={INK3} strokeWidth={1.8} />
      {Array.from({ length: 8 }, (_, i) => (
        <g key={i}>
          <Check x={352} y={68 + i * 22} s={0.75} stroke={INK3} />
          <rect x={366} y={64 + i * 22} width={[80, 66, 74, 58, 82, 62, 70, 54][i]} height={7} rx={3.5} fill={RULE2} />
        </g>
      ))}
      <Key x={400} y={272} anchor="middle" fill={INK3}>
        MOST FEATURES
      </Key>

      {/* fits their values */}
      <rect x={570} y={44} width={140} height={200} rx={8} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={2.2} />
      <circle cx={640} cy={94} r={26} fill={PAPER} stroke={SIGNAL} strokeWidth={1.6} />
      <Heart x={640} y={96} s={1.3} />
      {Array.from({ length: 4 }, (_, i) => (
        <g key={i}>
          <Check x={592} y={148 + i * 22} s={0.75} />
          <rect x={606} y={144 + i * 22} width={[80, 66, 74, 58][i]} height={7} rx={3.5} fill={INK2} />
        </g>
      ))}
      <Key x={640} y={272} anchor="middle" fill={SIGNAL}>
        FITS THEIR VALUES
      </Key>
      <line x1={20} y1={270} x2={220} y2={270} stroke={RULE2} />
    </Frame>
  );
}

/* ==========================================================================
   DISCUSSION · find the motive
   ========================================================================== */

/** The four theories as small glyphs, for the wayfinding and discussion. */
export function TheoryGlyph({ kind }: { kind: 0 | 1 | 2 | 3 }) {
  return (
    <svg viewBox="0 0 80 64" className="h-10 w-12 shrink-0" aria-hidden>
      <TheoryDrawing kind={kind} x={40} y={32} s={0.8} />
    </svg>
  );
}

function TheoryDrawing({ kind, x, y, s = 1 }: { kind: 0 | 1 | 2 | 3; x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {kind === 0 ? (
        <>
          <Gauge x={-12} top={-34} h={68} w={24} level={0.2} />
          <path d="M16 -24V20" stroke={SIGNAL} strokeWidth={3} strokeLinecap="round" />
          <path d={headAlong(16, 24, 0, 1, 9)} fill="none" stroke={SIGNAL} strokeWidth={3} strokeLinecap="round" />
        </>
      ) : null}
      {kind === 1 ? (
        <>
          {[-34, 0, 34].map((dx, i) => (
            <circle key={dx} cx={dx} cy={0} r={9} fill={i === 2 ? SIGNAL : INK} />
          ))}
          <path d={`M-22 0H-12${headAlong(-12, 0, 1, 0, 6)}`} fill="none" stroke={INK} strokeWidth={2} />
          <path d={`M12 0H22${headAlong(22, 0, 1, 0, 6)}`} fill="none" stroke={INK} strokeWidth={2} />
        </>
      ) : null}
      {kind === 2 ? <MiniPyramid x={0} base={34} w={80} h={68} lit={[4]} /> : null}
      {kind === 3 ? (
        <>
          <Option x={-34} y={-8} r={13} kind="plus" />
          <Option x={34} y={-8} r={13} kind="plus" />
          <Person x={0} y={34} s={0.7} />
        </>
      ) : null}
    </g>
  );
}

export function FindTheMotive() {
  const spots: { kind: 0 | 1 | 2 | 3; x: number; y: number; t: string }[] = [
    { kind: 0, x: 140, y: 80, t: "DRIVE REDUCTION" },
    { kind: 1, x: 660, y: 80, t: "EXPECTANCY" },
    { kind: 2, x: 140, y: 240, t: "HIERARCHY OF NEEDS" },
    { kind: 3, x: 660, y: 240, t: "MOTIVATIONAL CONFLICT" },
  ];
  const teeth = 8;
  const left = 344;
  const right = 456;
  const bottom = 262;
  const step = (right - left) / teeth;
  let zig = `M${left} 58H${right}V${bottom}`;
  for (let i = 0; i < teeth; i++) {
    const x0 = right - i * step;
    zig += `L${r2(x0 - step / 2)} ${bottom - 8}L${r2(x0 - step)} ${bottom}`;
  }
  zig += "Z";
  return (
    <Frame
      height={330}
      label="A receipt for a recent purchase with a large question mark on it. Dashed lines run from it to four small drawings: a falling tension gauge marked drive reduction, three linked dots marked expectancy, a pyramid marked hierarchy of needs, and a person between two options marked motivational conflict."
    >
      {spots.map((s) => (
        <line
          key={s.t}
          x1={s.x < 400 ? left : right}
          y1={s.y < 160 ? 110 : 210}
          x2={s.x < 400 ? s.x + 70 : s.x - 70}
          y2={s.y}
          stroke={COUNTER}
          strokeWidth={1.6}
          strokeDasharray="5 5"
        />
      ))}
      <path d={zig} fill={PAPER} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
      {[80, 96].map((y) => (
        <rect key={y} x={362} y={y} width={y === 80 ? 76 : 52} height={6} rx={3} fill={RULE2} />
      ))}
      <Display x={400} y={196} anchor="middle" size={76} fill={SIGNAL}>
        ?
      </Display>
      <line x1={362} y1={226} x2={438} y2={226} stroke={RULE2} strokeDasharray="2 3" />
      {spots.map((s) => (
        <g key={s.t}>
          <TheoryDrawing kind={s.kind} x={s.x} y={s.y} s={1.1} />
          <Key x={s.x} y={s.y + 62} anchor="middle" fill={INK}>
            {s.t}
          </Key>
        </g>
      ))}
    </Frame>
  );
}
