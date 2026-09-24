/* ==========================================================================
   Week 12 — figures
   --------------------------------------------------------------------------
   Hand-drawn SVG plates, one grammar per idea. The week crosses borders, so
   a fixed cast carries it: a dashed vertical line is a national border, a
   small flag on a pole is a country (solid for home, patterned for foreign),
   a globe is the world market, a price tag is price, a chip marked AI is
   artificial intelligence and a leaf is sustainability. Producer, store,
   person, pack and truck are the Week 9 glyphs, so a channel reads the same
   here as it did there.

   Colour code for the week:
     · entry modes: exporting INK, joint venturing COUNTER, direct
       investment SIGNAL (the deepest commitment)
     · the mix: standardization COUNTER, adaptation SIGNAL
     · otherwise SIGNAL marks the operative case, COUNTER the risk or cost

   Conventions carried over from earlier weeks:
     · viewBox width 800 (400 for column plates), flat fills, hairline rules
     · every label reuses words from the slide the plate sits on
     · anything implying a quantity the content does not give is SCHEMATIC
     · trig results rounded, so server and client render the same markup
   ========================================================================== */

import React from "react";
import {
  COUNTER,
  COUNTER_TINT,
  Display,
  Frame,
  hash2,
  headAlong1,
  INK,
  INK3,
  Key,
  PAPER,
  PAPER2,
  r2,
  RULE,
  RULE2,
  Schematic,
  SIGNAL,
  SIGNAL_TINT,
} from "../_visuals/kit";
import {
  Arrow2,
  Bottle2,
  Bubble3,
  Chip2,
  Coins2,
  CurveArrow2,
  Factory3,
  Flag2,
  FlagPattern,
  GlyphFrame,
  Magnifier2,
  Mark2,
  Pack4,
  Person3,
  Phone3,
  Sheet,
  Star3,
  Store2,
  Tag2,
  Truck2,
  Warehouse,
} from "../_visuals/objects";

/* -- geometry helpers ------------------------------------------------------ */

/* -- the cast of the week -------------------------------------------------- */

/** A national border: a dashed vertical line. */
export function Border({
  x,
  y1,
  y2,
  tone = INK3,
}: {
  x: number;
  y1: number;
  y2: number;
  tone?: string;
}) {
  return <line x1={x} y1={y1} x2={x} y2={y2} stroke={tone} strokeWidth={1.5} strokeDasharray="6 5" />;
}

/** The world: a globe of meridians and parallels centred on (x, y). */
export function Globe({
  x,
  y,
  r,
  tone = INK,
  fill = PAPER,
  width = 1.5,
}: {
  x: number;
  y: number;
  r: number;
  tone?: string;
  fill?: string;
  width?: number;
}) {
  const c = r2(r * 0.87);
  const p = r2(r * 0.5);
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={fill} stroke={tone} strokeWidth={width} />
      <ellipse cx={x} cy={y} rx={r2(r * 0.5)} ry={r} fill="none" stroke={tone} strokeWidth={width * 0.6} />
      <ellipse cx={x} cy={y} rx={r2(r * 0.85)} ry={r} fill="none" stroke={tone} strokeWidth={width * 0.45} strokeOpacity={0.6} />
      <line x1={x} y1={y - r} x2={x} y2={y + r} stroke={tone} strokeWidth={width * 0.6} />
      <line x1={x - r} y1={y} x2={x + r} y2={y} stroke={tone} strokeWidth={width * 0.6} />
      <line x1={r2(x - c)} y1={r2(y - p)} x2={r2(x + c)} y2={r2(y - p)} stroke={tone} strokeWidth={width * 0.45} />
      <line x1={r2(x - c)} y1={r2(y + p)} x2={r2(x + c)} y2={r2(y + p)} stroke={tone} strokeWidth={width * 0.45} />
    </g>
  );
}

/** Sustainability: a leaf with a midrib, stem at (x, y), s tall. */
export function Leaf({
  x,
  y,
  s = 30,
  tone = SIGNAL,
  fill = SIGNAL_TINT,
}: {
  x: number;
  y: number;
  s?: number;
  tone?: string;
  fill?: string;
}) {
  const t = y - s;
  const w = r2(s * 0.42);
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path
        d={`M${x} ${y}Q${r2(x - w * 1.5)} ${r2(y - s * 0.55)} ${x} ${t}Q${r2(x + w * 1.5)} ${r2(y - s * 0.55)} ${x} ${y}Z`}
        fill={fill}
        stroke={tone}
        strokeWidth={1.5}
      />
      <line x1={x} y1={r2(y + s * 0.18)} x2={x} y2={r2(t + s * 0.18)} stroke={tone} strokeWidth={1.1} />
    </g>
  );
}

/** Government: a pediment on four columns, standing on (x, y). */
export function Government({
  x,
  y,
  k = 1,
  tone = INK,
  fill = PAPER,
}: {
  x: number;
  y: number;
  k?: number;
  tone?: string;
  fill?: string;
}) {
  const X = (d: number) => r2(x + d * k);
  const Y = (d: number) => r2(y + d * k);
  return (
    <g strokeLinejoin="round">
      <rect x={X(-28)} y={Y(-6)} width={r2(56 * k)} height={r2(6 * k)} fill={fill} stroke={tone} strokeWidth={1.5} />
      {[-19, -7, 7, 19].map((d) => (
        <rect key={d} x={X(d - 3)} y={Y(-30)} width={r2(6 * k)} height={r2(24 * k)} fill={fill} stroke={tone} strokeWidth={1.25} />
      ))}
      <rect x={X(-28)} y={Y(-36)} width={r2(56 * k)} height={r2(6 * k)} fill={fill} stroke={tone} strokeWidth={1.5} />
      <path d={`M${X(-30)} ${Y(-36)}L${X(0)} ${Y(-52)}L${X(30)} ${Y(-36)}Z`} fill={fill} stroke={tone} strokeWidth={1.5} />
    </g>
  );
}

/** A warning: a triangle with an exclamation mark, centred on (x, y). */
export function Warning({ x, y, s = 26, tone = COUNTER }: { x: number; y: number; s?: number; tone?: string }) {
  const h = r2(s * 0.87);
  return (
    <g>
      <path
        d={`M${x} ${r2(y - h / 2)}L${r2(x + s / 2)} ${r2(y + h / 2)}H${r2(x - s / 2)}Z`}
        fill={PAPER}
        stroke={tone}
        strokeWidth={1.75}
        strokeLinejoin="round"
      />
      <line x1={x} y1={r2(y - h / 2 + s * 0.3)} x2={x} y2={r2(y + h / 2 - s * 0.3)} stroke={tone} strokeWidth={2} strokeLinecap="round" />
      <circle cx={x} cy={r2(y + h / 2 - s * 0.16)} r={1.4} fill={tone} />
    </g>
  );
}

/** A tick, centred on (x, y). */
function Tick({ x, y, s = 10, tone = SIGNAL, width = 2 }: { x: number; y: number; s?: number; tone?: string; width?: number }) {
  return (
    <path
      d={`M${r2(x - s)} ${y}L${r2(x - s * 0.3)} ${r2(y + s * 0.7)}L${r2(x + s)} ${r2(y - s * 0.8)}`}
      fill="none"
      stroke={tone}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

/** A cross, centred on (x, y). */
function Cross({ x, y, s = 9, tone = COUNTER, width = 2 }: { x: number; y: number; s?: number; tone?: string; width?: number }) {
  return (
    <path
      d={`M${x - s} ${y - s}L${x + s} ${y + s}M${x + s} ${y - s}L${x - s} ${y + s}`}
      stroke={tone}
      strokeWidth={width}
      strokeLinecap="round"
    />
  );
}

/** A thought bubble whose box is at (x, y), trailing dots toward (tx, ty). */
function Thought({
  x,
  y,
  w,
  h,
  tx,
  ty,
  tone = INK,
  fill = PAPER,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  tx: number;
  ty: number;
  tone?: string;
  fill?: string;
}) {
  const bx = x + w / 2;
  const by = y + h;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={Math.round(h / 2)} fill={fill} stroke={tone} strokeWidth={1.5} />
      <circle cx={r2(bx + (tx - bx) * 0.4)} cy={r2(by + (ty - by) * 0.4)} r={3} fill={fill} stroke={tone} strokeWidth={1.2} />
      <circle cx={r2(bx + (tx - bx) * 0.75)} cy={r2(by + (ty - by) * 0.75)} r={2} fill={fill} stroke={tone} strokeWidth={1.1} />
    </g>
  );
}

/** Rising signal bars: level 1–3 of three, standing on (x, y). */
function Level({ x, y, level, tone = INK }: { x: number; y: number; level: number; tone?: string }) {
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={x + i * 11}
          y={y - 10 - i * 8}
          width={8}
          height={10 + i * 8}
          fill={i < level ? tone : PAPER}
          stroke={i < level ? tone : RULE2}
          strokeWidth={1.1}
        />
      ))}
    </g>
  );
}

/* -- the three entry modes as one glyph each ------------------------------- */

export type Mode = "export" | "jv" | "di";

export const MODES: { kind: Mode; name: string; tone: string; fill: string }[] = [
  { kind: "export", name: "EXPORTING", tone: INK, fill: PAPER2 },
  { kind: "jv", name: "JOINT VENTURING", tone: COUNTER, fill: COUNTER_TINT },
  { kind: "di", name: "DIRECT INVESTMENT", tone: SIGNAL, fill: SIGNAL_TINT },
];

/**
 * An entry mode, drawn across a border at x. Exporting sends goods over the
 * border; joint venturing joins a foreign company over it; direct investment
 * puts the company's own plant on the far side. About 120 wide, 50 tall.
 */
export function EntryMode({
  kind,
  x,
  y,
  k = 1,
  tone,
}: {
  kind: Mode;
  x: number;
  y: number;
  k?: number;
  tone?: string;
}) {
  const m = MODES.find((d) => d.kind === kind)!;
  const c = tone ?? m.tone;
  const X = (d: number) => r2(x + d * k);
  return (
    <g>
      <Border x={x} y1={r2(y - 52 * k)} y2={r2(y + 4 * k)} />
      {kind === "export" ? (
        <g>
          <Factory3 x={X(-34)} y={y} k={r2(0.7 * k)} tone={c} />
          <Arrow2 x1={X(-10)} y1={r2(y - 14 * k)} x2={X(22)} y2={r2(y - 14 * k)} tone={c} width={1.5} size={6} />
          <Pack4 x={X(38)} y={y} w={r2(20 * k)} h={r2(18 * k)} tone={c} />
        </g>
      ) : null}
      {kind === "jv" ? (
        <g>
          <Factory3 x={X(-34)} y={y} k={r2(0.7 * k)} tone={INK} />
          <Factory3 x={X(40)} y={y} k={r2(0.7 * k)} tone={c} fill={tone ? PAPER : COUNTER_TINT} />
          <path
            d={`M${X(-26)} ${r2(y + 8 * k)}V${r2(y + 13 * k)}H${X(34)}V${r2(y + 8 * k)}`}
            fill="none"
            stroke={c}
            strokeWidth={2}
          />
        </g>
      ) : null}
      {kind === "di" ? (
        <g>
          <Flag2 x={X(-44)} y={y} h={r2(30 * k)} tone={INK} />
          <Factory3 x={X(40)} y={y} k={r2(0.8 * k)} tone={c} fill={tone ? PAPER : SIGNAL_TINT} />
        </g>
      ) : null}
    </g>
  );
}

/** One entry mode as a small inline glyph for the wayfinding strip. */
export function EntryGlyph({ kind, lit, size = 96 }: { kind: Mode; lit: boolean; size?: number }) {
  return (
    <svg viewBox="0 0 130 72" width={size} height={Math.round((size * 72) / 130)} aria-hidden className="block shrink-0">
      <EntryMode kind={kind} x={60} y={60} tone={lit ? undefined : INK3} />
    </svg>
  );
}

/** A target: rings with a centre dot. */
function Target({ x, y, r = 12, tone = SIGNAL }: { x: number; y: number; r?: number; tone?: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={PAPER} stroke={tone} strokeWidth={1.5} />
      <circle cx={x} cy={y} r={r2(r * 0.55)} fill={PAPER} stroke={tone} strokeWidth={1.5} />
      <circle cx={x} cy={y} r={r2(r * 0.2)} fill={tone} />
    </g>
  );
}

/** A jar with a lid, standing on (x, y). */
function Jar({ x, y, tone = INK, fill = PAPER }: { x: number; y: number; tone?: string; fill?: string }) {
  return (
    <g>
      <rect x={x - 14} y={y - 30} width={28} height={30} rx={8} fill={fill} stroke={tone} strokeWidth={1.5} />
      <rect x={x - 10} y={y - 37} width={20} height={7} fill={fill} stroke={tone} strokeWidth={1.5} />
    </g>
  );
}

/* ==========================================================================
   WHAT IS GLOBAL MARKETING?
   ========================================================================== */

const WORLD_TARGETS = [
  [318, 96],
  [452, 84],
  [262, 196],
  [402, 176],
  [520, 214],
  [356, 272],
];

/** The globe with targets set on markets all over it. */
export function WorldTargets() {
  return (
    <Frame
      height={340}
      label="A globe drawn with meridians and parallels. Six target rings sit on it at places spread across the world."
    >
      <Globe x={400} y={170} r={150} width={1.75} />
      {WORLD_TARGETS.map(([x, y]) => (
        <Target key={`${x}-${y}`} x={x} y={y} r={14} />
      ))}
    </Frame>
  );
}

const GREETINGS = ["Hello", "Bonjour", "Hola"];

/** Three countries side by side: a different language, a different wealth. */
export function CultureEconomy() {
  const cols = [170, 262, 354];
  const pats: FlagPattern[] = ["tri", "band", "disc"];
  const coins = [2, 7, 4];
  return (
    <Frame
      width={400}
      height={270}
      label="Three countries separated by borders, each under its own flag. In the cultural row each says a different greeting: Hello, Bonjour, Hola. In the economic row each has a coin stack of a different height."
    >
      <Border x={216} y1={24} y2={252} />
      <Border x={308} y1={24} y2={252} />
      <Key x={16} y={124} fill={INK} size={9.5}>
        CULTURAL
      </Key>
      <Key x={16} y={222} fill={INK} size={9.5}>
        ECONOMIC
      </Key>
      <line x1={16} y1={160} x2={392} y2={160} stroke={RULE} strokeWidth={1} />
      {cols.map((cx, i) => (
        <g key={cx}>
          <Flag2 x={cx - 12} y={70} pattern={pats[i]} />
          <Bubble3 x={cx - 38} y={92} w={76} h={28} />
          <text x={cx} y={111} textAnchor="middle" fontFamily="var(--font-body)" fontSize={13} fill={INK}>
            {GREETINGS[i]}
          </text>
          <Coins2 x={cx} y={240} n={coins[i]} w={30} />
        </g>
      ))}
    </Frame>
  );
}

/** A route winding from the company to a foreign store around government and rules. */
export function Navigate() {
  return (
    <Frame
      width={400}
      height={270}
      label="A company on the left and a store on the right. Between them stand a government building, labelled political, and a pile of rule sheets, labelled regulatory. The route hops over one and then the other to reach the store."
    >
      <line x1={12} y1={238} x2={388} y2={238} stroke={RULE2} strokeWidth={1} />
      <Factory3 x={46} y={238} />
      <Store2 x={352} y={238} />
      <Government x={140} y={238} k={0.9} />
      <Key x={140} y={258} anchor="middle" fill={INK} size={9.5}>
        POLITICAL
      </Key>
      <Sheet x={246} y={216} w={34} h={44} />
      <Sheet x={256} y={212} w={34} h={44} />
      <Sheet x={266} y={208} w={34} h={44} />
      <Key x={256} y={258} anchor="middle" fill={INK} size={9.5}>
        REGULATORY
      </Key>
      <path d="M80 214Q140 120 198 214Q258 110 318 214" fill="none" stroke={SIGNAL} strokeWidth={2} strokeDasharray="7 5" />
      <path d={headAlong1(320, 214, 320 - 258, 214 - 110, 8)} fill="none" stroke={SIGNAL} strokeWidth={2} />
    </Frame>
  );
}

/* ==========================================================================
   THE GLOBAL MARKETING ENVIRONMENT
   ========================================================================== */

const TRADE_NODES: { x: number; y: number; p: FlagPattern }[] = [
  { x: 120, y: 160, p: "home" },
  { x: 300, y: 70, p: "tri" },
  { x: 500, y: 90, p: "cross" },
  { x: 680, y: 180, p: "disc" },
  { x: 390, y: 230, p: "band" },
];
const TRADE_EDGES = [
  [0, 1],
  [1, 2],
  [2, 3],
  [0, 4],
  [4, 3],
  [1, 4],
  [2, 4],
];

/** Countries linked by trade lanes, a crate travelling on each. */
export function TradeSystem() {
  const R = 30;
  return (
    <Frame
      height={290}
      label="Five countries, each a circle holding its flag, linked by seven trade lanes. A crate sits on every lane, travelling between them."
    >
      {TRADE_EDGES.map(([a, b]) => {
        const A = TRADE_NODES[a];
        const B = TRADE_NODES[b];
        const len = Math.hypot(B.x - A.x, B.y - A.y);
        const ux = (B.x - A.x) / len;
        const uy = (B.y - A.y) / len;
        const mx = Math.round((A.x + B.x) / 2);
        const my = Math.round((A.y + B.y) / 2);
        return (
          <g key={`${a}-${b}`}>
            <line
              x1={r2(A.x + ux * (R + 4))}
              y1={r2(A.y + uy * (R + 4))}
              x2={r2(B.x - ux * (R + 4))}
              y2={r2(B.y - uy * (R + 4))}
              stroke={INK3}
              strokeWidth={1.5}
            />
            <Pack4 x={mx} y={my + 8} w={20} h={16} />
          </g>
        );
      })}
      {TRADE_NODES.map((n) => (
        <g key={n.x}>
          <circle cx={n.x} cy={n.y} r={R} fill={PAPER2} stroke={INK} strokeWidth={1.5} />
          <Flag2 x={n.x - 9} y={n.y + 16} pattern={n.p} h={30} />
        </g>
      ))}
    </Frame>
  );
}

/** Three country cards with economic charts; a lens over one of them. */
export function AssessEconomy() {
  const cards = [28, 146, 264];
  const bars = [
    [16, 22, 18, 26],
    [22, 34, 44, 58],
    [30, 18, 12, 8],
  ];
  const pats: FlagPattern[] = ["tri", "band", "disc"];
  return (
    <Frame
      width={400}
      height={250}
      label="Three country cards, each with its flag and a small bar chart of its economy. A magnifying glass rests over the middle card, examining its chart."
    >
      <Key x={200} y={34} anchor="middle" fill={INK} size={9.5}>
        ECONOMIC CONDITIONS
      </Key>
      {cards.map((x, i) => {
        const lit = i === 1;
        return (
          <g key={x}>
            <rect x={x} y={56} width={108} height={160} fill={lit ? SIGNAL_TINT : PAPER} stroke={lit ? SIGNAL : INK} strokeWidth={1.5} />
            <Flag2 x={x + 12} y={96} pattern={pats[i]} h={30} />
            <line x1={x + 14} y1={202} x2={x + 94} y2={202} stroke={INK3} strokeWidth={1} />
            {bars[i].map((h, j) => (
              <rect key={j} x={x + 20 + j * 18} y={202 - h} width={12} height={h} fill={lit ? SIGNAL : INK} />
            ))}
          </g>
        );
      })}
      <Magnifier2 x={200} y={170} r={38} />
    </Frame>
  );
}

/** Two cultures facing the same shelf pick different products. */
export function CultureChoice() {
  return (
    <Frame
      width={400}
      height={260}
      label="Two countries separated by a border, each with the same two products on a shelf: a jar and a box. The shopper on the left reaches for the jar; the shopper on the right reaches for the box."
    >
      <Border x={200} y1={20} y2={250} />
      <Flag2 x={20} y={56} pattern="tri" />
      <Flag2 x={356} y={56} pattern="disc" />
      {[0, 1].map((side) => {
        const o = side * 200;
        const pickJar = side === 0;
        return (
          <g key={side}>
            <line x1={o + 36} y1={140} x2={o + 164} y2={140} stroke={INK} strokeWidth={1.5} />
            <Jar x={o + 70} y={140} tone={pickJar ? SIGNAL : INK3} fill={pickJar ? SIGNAL_TINT : PAPER} />
            <Pack4 x={o + 130} y={140} w={32} h={32} tone={pickJar ? INK3 : SIGNAL} fill={pickJar ? PAPER : SIGNAL_TINT} />
            <Person3 x={o + 100} y={246} k={1.2} />
            <Arrow2
              x1={o + 100}
              y1={196}
              x2={pickJar ? o + 76 : o + 124}
              y2={150}
              tone={SIGNAL}
              width={1.5}
              size={7}
            />
          </g>
        );
      })}
    </Frame>
  );
}

/* ==========================================================================
   ASSESSING THE GLOBAL ENVIRONMENT
   ========================================================================== */

/** Tariff: the price tag grows at the border. Quota: only some crates pass. */
export function TradeBarriers() {
  return (
    <Frame
      height={260}
      label="Two panels. Tariff: a crate with a small price tag crosses a border and arrives with a longer tag, the added part marked plus. Quota: three crates have crossed the border; three more wait behind a closed barrier."
    >
      <line x1={400} y1={20} x2={400} y2={240} stroke={RULE} strokeWidth={1} />
      {/* Tariff */}
      <Key x={200} y={36} anchor="middle" fill={INK} size={11}>
        TARIFF
      </Key>
      <Border x={200} y1={60} y2={226} />
      <line x1={70} y1={150} x2={80} y2={174} stroke={INK} strokeWidth={1} />
      <Tag2 x={60} y={150} w={60} />
      <Pack4 x={86} y={210} w={40} h={36} />
      <Arrow2 x1={116} y1={192} x2={276} y2={192} tone={INK} width={1.5} />
      <line x1={272} y1={150} x2={302} y2={174} stroke={INK} strokeWidth={1} />
      <Tag2 x={262} y={150} w={120}>
        <rect x={322} y={136} width={60} height={28} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.5} />
        <Display x={352} y={159} anchor="middle" fill={COUNTER} size={22}>
          +
        </Display>
      </Tag2>
      <Pack4 x={312} y={210} w={40} h={36} />
      {/* Quota */}
      <Key x={600} y={36} anchor="middle" fill={INK} size={11}>
        QUOTA
      </Key>
      <Border x={600} y1={60} y2={226} />
      {[450, 500, 550].map((x) => (
        <Pack4 key={x} x={x} y={210} w={36} h={34} tone={COUNTER} dash="4 3" />
      ))}
      <rect x={594} y={150} width={12} height={64} fill={COUNTER} />
      {[650, 700, 750].map((x) => (
        <Pack4 key={x} x={x} y={210} w={36} h={34} />
      ))}
    </Frame>
  );
}

const GDP = [62, 112, 44, 158, 86, 128];
const GDP_FLAGS: FlagPattern[] = ["tri", "band", "cross", "disc", "diag", "home"];

/** GDP bars for six countries; the tallest is circled as the market selected. */
export function GdpSelection() {
  const base = 206;
  const top = GDP.indexOf(Math.max(...GDP));
  return (
    <Frame
      height={270}
      label="Bars for six countries, each above its flag, showing GDP. The tallest bar is lit, with a target above it labelled market selection."
    >
      <Schematic />
      <Key x={40} y={base - 70} anchor="middle" fill={INK} size={10}>
        GDP
      </Key>
      <line x1={76} y1={base} x2={760} y2={base} stroke={INK} strokeWidth={1.5} />
      {GDP.map((h, i) => {
        const x = 130 + i * 116;
        const lit = i === top;
        return (
          <g key={i}>
            <rect x={x - 28} y={base - h} width={56} height={h} fill={lit ? SIGNAL : PAPER2} stroke={lit ? SIGNAL : INK} strokeWidth={1.25} />
            <Flag2 x={x - 12} y={256} pattern={GDP_FLAGS[i]} h={34} />
          </g>
        );
      })}
      <Target x={130 + top * 116} y={base - GDP[top] - 24} r={12} />
      <Key x={130 + top * 116 + 22} y={base - GDP[top] - 20} fill={SIGNAL} size={10}>
        MARKET SELECTION
      </Key>
    </Frame>
  );
}

/** One product and message goes to two cultures: accepted in one, rejected in the other. */
export function Acceptance() {
  return (
    <Frame
      width={400}
      height={260}
      label="A product with its advertising message at the top. Arrows carry it to two countries. The group on the left answers with a tick; the group on the right with a cross."
    >
      <Pack4 x={176} y={82} w={36} h={40} />
      <Bubble3 x={204} y={30} w={64} h={30} tail="left" />
      <line x1={214} y1={41} x2={258} y2={41} stroke={INK3} strokeWidth={1.25} />
      <line x1={214} y1={50} x2={246} y2={50} stroke={INK3} strokeWidth={1.25} />
      <Arrow2 x1={170} y1={96} x2={112} y2={146} tone={INK} width={1.5} />
      <Arrow2 x1={230} y1={96} x2={288} y2={146} tone={INK} width={1.5} />
      <Tick x={100} y={166} s={11} />
      <Cross x={300} y={168} s={9} />
      {[70, 100, 130].map((x) => (
        <Person3 key={x} x={x} y={244} k={0.9} />
      ))}
      {[270, 300, 330].map((x) => (
        <Person3 key={x} x={x} y={244} k={0.9} />
      ))}
      <Flag2 x={20} y={244} pattern="tri" />
      <Flag2 x={356} y={244} pattern="band" />
    </Frame>
  );
}

/** A road runs past the local customs sign and off the edge into failure. */
export function CustomsIgnored() {
  return (
    <Frame
      width={400}
      height={260}
      label="A road runs from the left past a roadside sign reading local customs, carries straight on without stopping, and turns down into a cross marked failure."
    >
      <rect x={106} y={70} width={128} height={28} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <Key x={170} y={88} anchor="middle" fill={INK} size={9}>
        LOCAL CUSTOMS
      </Key>
      <line x1={170} y1={98} x2={170} y2={148} stroke={INK} strokeWidth={1.5} />
      <path d="M20 150H240Q286 150 296 204" fill="none" stroke={COUNTER} strokeWidth={2.5} />
      <path d={headAlong1(297, 212, 1, 8, 9)} fill="none" stroke={COUNTER} strokeWidth={2.5} />
      <Cross x={300} y={232} s={10} width={2.5} />
      <Key x={320} y={236} fill={COUNTER} size={10}>
        FAILURE
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   DISCUSSION: THE CULTURAL TRAP
   ========================================================================== */

function Burger({ x, y, k = 1, tone = INK }: { x: number; y: number; k?: number; tone?: string }) {
  const X = (d: number) => r2(x + d * k);
  const Y = (d: number) => r2(y + d * k);
  return (
    <g strokeLinejoin="round">
      <path d={`M${X(-40)} ${Y(-30)}Q${X(-40)} ${Y(-64)} ${X(0)} ${Y(-64)}Q${X(40)} ${Y(-64)} ${X(40)} ${Y(-30)}Z`} fill={PAPER} stroke={tone} strokeWidth={1.5} />
      <path d={`M${X(-44)} ${Y(-30)}H${X(44)}`} stroke={tone} strokeWidth={1.5} strokeDasharray="6 4" />
      <rect x={X(-42)} y={Y(-26)} width={r2(84 * k)} height={r2(12 * k)} rx={r2(5 * k)} fill={tone} />
      <path d={`M${X(-40)} ${Y(-10)}H${X(40)}V${Y(-4)}Q${X(40)} ${Y(0)} ${X(34)} ${Y(0)}H${X(-34)}Q${X(-40)} ${Y(0)} ${X(-40)} ${Y(-4)}Z`} fill={PAPER} stroke={tone} strokeWidth={1.5} />
    </g>
  );
}

/** The same burger in two markets: a tall sales bar at home, a stub and uproar in India. */
export function BurgerBacklash() {
  return (
    <Frame
      height={270}
      label="Two markets divided by a border. In the US the burger stands beside a tall sales bar. In India the same burger stands beside a tiny sales bar, with three speech bubbles of exclamation marks above it: public backlash."
    >
      <Border x={400} y1={20} y2={250} />
      <Key x={40} y={40} fill={INK} size={12}>
        US
      </Key>
      <Key x={440} y={40} fill={INK} size={12}>
        INDIA
      </Key>
      <Burger x={150} y={220} k={1.2} />
      <rect x={262} y={70} width={48} height={150} fill={SIGNAL} />
      <line x1={230} y1={220} x2={340} y2={220} stroke={INK} strokeWidth={1.5} />
      <Key x={286} y={244} anchor="middle" size={9.5}>
        SALES
      </Key>
      <Burger x={550} y={220} k={1.2} />
      <rect x={662} y={208} width={48} height={12} fill={COUNTER} />
      <line x1={630} y1={220} x2={740} y2={220} stroke={INK} strokeWidth={1.5} />
      <Key x={686} y={244} anchor="middle" size={9.5}>
        SALES
      </Key>
      {[
        [496, 70],
        [592, 52],
        [690, 84],
      ].map(([x, y]) => (
        <g key={x}>
          <Bubble3 x={x} y={y} w={46} h={32} tone={COUNTER} tail={x > 600 ? "left" : "right"} />
          <Display x={x + 23} y={y + 25} anchor="middle" fill={COUNTER} size={22}>
            !
          </Display>
        </g>
      ))}
      <Key x={760} y={40} anchor="end" fill={COUNTER} size={9.5}>
        PUBLIC BACKLASH
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   DECIDING WHETHER TO GO GLOBAL
   ========================================================================== */

/** A domestic market packed full; arrows push out across its border to foreign flags. */
export function Saturated() {
  const cx = 240;
  const cy = 156;
  const R = 112;
  const dots: [number, number][] = [];
  for (let row = -7; row <= 7; row++) {
    for (let col = -8; col <= 8; col++) {
      const x = col * 15 + (row % 2 ? 7.5 : 0);
      const y = row * 13;
      if (Math.hypot(x, y) < R - 12) dots.push([cx + x, cy + y]);
    }
  }
  const outs = [-26, 0, 26].map((deg) => {
    const a = (deg * Math.PI) / 180;
    return {
      x1: r2(cx + (R + 8) * Math.cos(a)),
      y1: r2(cy + (R + 8) * Math.sin(a)),
      x2: r2(cx + 236 * Math.cos(a)),
      y2: r2(cy + 236 * Math.sin(a)),
    };
  });
  const pats: FlagPattern[] = ["tri", "disc", "cross"];
  return (
    <Frame
      height={310}
      label="A domestic market drawn as a circle ringed by a dashed border, packed edge to edge with the company's customers. Three arrows push outward across the border toward three foreign flags."
    >
      <circle cx={cx} cy={cy} r={R} fill={SIGNAL_TINT} stroke={INK3} strokeWidth={1.5} strokeDasharray="6 5" />
      {dots.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={4.5} fill={SIGNAL} />
      ))}
      <Key x={cx} y={296} anchor="middle" fill={INK} size={10}>
        DOMESTIC MARKET
      </Key>
      {outs.map((o, i) => (
        <g key={i}>
          <Arrow2 x1={o.x1} y1={o.y1} x2={o.x2} y2={o.y2} tone={SIGNAL} width={2} size={9} />
          <Flag2 x={Math.round(o.x2 + 20 * Math.cos((([-26, 0, 26][i]) * Math.PI) / 180)) - 4} y={Math.round(o.y2 + 20 * Math.sin((([-26, 0, 26][i]) * Math.PI) / 180)) + 17} pattern={pats[i]} />
        </g>
      ))}
    </Frame>
  );
}

/** Unit cost falls as volume grows: economies of scale. */
export function ScaleCurve() {
  return (
    <Frame
      width={400}
      height={260}
      label="A curve of cost per unit falling as volume grows. A dot early on the curve is marked domestic; a dot far along it, where cost per unit is lower, is marked global."
    >
      <Schematic x={392} />
      <Key x={372} y={44} anchor="end" fill={INK} size={9.5}>
        ECONOMIES OF SCALE
      </Key>
      <path d="M50 30V222H374" fill="none" stroke={INK} strokeWidth={1.5} />
      <text x={36} y={126} textAnchor="middle" transform="rotate(-90 36 126)" fontFamily="var(--font-label)" fontSize={9} fontWeight={600} letterSpacing="0.14em" fill={INK3}>
        COST PER UNIT
      </text>
      <Key x={374} y={244} anchor="end" size={9}>
        VOLUME
      </Key>
      <path d="M60 50Q120 190 360 200" fill="none" stroke={SIGNAL} strokeWidth={2} />
      <circle cx={101} cy={112} r={5} fill={PAPER} stroke={INK} strokeWidth={1.75} />
      <Key x={112} y={106} fill={INK} size={9}>
        DOMESTIC
      </Key>
      <circle cx={271} cy={191} r={5} fill={SIGNAL} />
      <Key x={271} y={176} anchor="middle" fill={SIGNAL} size={9}>
        GLOBAL
      </Key>
    </Frame>
  );
}

/** Profit coins: a short domestic stack, a tall global one. */
export function HigherProfits() {
  return (
    <Frame
      width={400}
      height={260}
      label="Two coin stacks labelled higher profits: a short stack marked domestic and a much taller stack marked global."
    >
      <Schematic x={392} />
      <Key x={200} y={44} anchor="middle" fill={INK} size={9.5}>
        HIGHER PROFITS
      </Key>
      <line x1={60} y1={212} x2={340} y2={212} stroke={INK} strokeWidth={1.5} />
      <Coins2 x={130} y={212} n={3} w={64} />
      <Coins2 x={270} y={212} n={10} w={64} tone={SIGNAL} fill={SIGNAL_TINT} />
      <Key x={130} y={236} anchor="middle" fill={INK} size={9}>
        DOMESTIC
      </Key>
      <Key x={270} y={236} anchor="middle" fill={SIGNAL} size={9}>
        GLOBAL
      </Key>
    </Frame>
  );
}

/** Financial risk: savings drop. Operational risk: the truck is blocked. */
export function OperatingRisks() {
  return (
    <Frame
      height={250}
      label="Two panels under warning signs. Financial risks: a coin stack with a jagged arrow plunging downward beside it. Operational risks: a delivery truck stopped by a barrier across its road."
    >
      <line x1={400} y1={24} x2={400} y2={226} stroke={RULE} strokeWidth={1} />
      <Warning x={90} y={64} s={32} />
      <Coins2 x={150} y={196} n={6} w={56} />
      <path d="M214 76L246 118L232 126L274 184" fill="none" stroke={COUNTER} strokeWidth={2.25} strokeLinejoin="round" />
      <path d={headAlong1(276, 188, 2, 4, 10)} fill="none" stroke={COUNTER} strokeWidth={2.25} />
      <line x1={100} y1={196} x2={320} y2={196} stroke={INK} strokeWidth={1.5} />
      <Key x={200} y={232} anchor="middle" fill={COUNTER} size={10}>
        FINANCIAL RISKS
      </Key>
      <Warning x={490} y={64} s={32} />
      <line x1={450} y1={196} x2={760} y2={196} stroke={INK} strokeWidth={1.5} />
      <Truck2 x={550} y={196} k={1.3} />
      <rect x={614} y={120} width={10} height={76} fill={COUNTER} />
      <rect x={624} y={128} width={96} height={12} fill={PAPER} stroke={COUNTER} strokeWidth={1.5} />
      {[642, 666, 690].map((x) => (
        <path key={x} d={`M${x} 140L${x + 10} 128`} stroke={COUNTER} strokeWidth={4} />
      ))}
      <Key x={600} y={232} anchor="middle" fill={COUNTER} size={10}>
        OPERATIONAL RISKS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   MARKET ENTRY STRATEGIES — cascading flow of risk and control
   ========================================================================== */

/** Three entry modes cascading downward; risk, control and profit potential rise with each. */
export function EntryCascade() {
  const w = 280;
  const h = 96;
  const at = (i: number) => ({ x: 84 + i * 118, y: 44 + i * 128 });
  const cols = [
    { x: 640, top: "RISK" },
    { x: 702, top: "CONTROL" },
    { x: 764, top: "PROFIT", bottom: "POTENTIAL" },
  ];
  return (
    <Frame
      height={430}
      label="Three entry modes cascade from top left to bottom right: exporting, joint venturing, direct investment. Each block feeds the next. Beside each, three signal-strength meters for risk, control and profit potential fill one bar, two bars and three bars in turn. An arrow down the left edge runs from low to high risk tolerance."
    >
      {cols.map((c) => (
        <g key={c.x}>
          <Key x={c.x} y={c.bottom ? 18 : 30} anchor="middle" fill={INK} size={9}>
            {c.top}
          </Key>
          {c.bottom ? (
            <Key x={c.x} y={30} anchor="middle" fill={INK} size={9}>
              {c.bottom}
            </Key>
          ) : null}
        </g>
      ))}
      <Arrow2 x1={40} y1={62} x2={40} y2={386} tone={INK3} width={1.5} />
      <Key x={40} y={52} anchor="middle" size={8.5}>
        LOW
      </Key>
      <Key x={40} y={404} anchor="middle" size={8.5}>
        HIGH
      </Key>
      <text x={26} y={224} textAnchor="middle" transform="rotate(-90 26 224)" fontFamily="var(--font-label)" fontSize={9} fontWeight={600} letterSpacing="0.14em" fill={INK3}>
        RISK TOLERANCE
      </text>
      {MODES.map((m, i) => {
        const { x, y } = at(i);
        const next = at(i + 1);
        return (
          <g key={m.kind}>
            {i < MODES.length - 1 ? (
              <g>
                <path d={`M${x + 44} ${y + h}V${next.y + h / 2}H${next.x - 4}`} fill="none" stroke={INK} strokeWidth={1.5} />
                <path d={headAlong1(next.x - 2, next.y + h / 2, 1, 0, 7)} fill="none" stroke={INK} strokeWidth={1.5} />
              </g>
            ) : null}
            <rect x={x} y={y} width={w} height={h} fill={m.fill} stroke={m.tone} strokeWidth={1.5} />
            <EntryMode kind={m.kind} x={x + 74} y={y + 78} k={0.95} />
            <Key x={x + 142} y={y + 52} fill={m.tone} size={10}>
              {m.name}
            </Key>
            <line x1={x + w + 6} y1={y + h / 2} x2={618} y2={y + h / 2} stroke={RULE2} strokeWidth={1} strokeDasharray="2 3" />
            {cols.map((c) => (
              <Level key={c.x} x={c.x - 15} y={y + h / 2 + 14} level={i + 1} tone={m.tone} />
            ))}
          </g>
        );
      })}
    </Frame>
  );
}

/* ==========================================================================
   MARKET ENTRY: EXPORTING
   ========================================================================== */

/** One straight arrow from the home plant over the border to a foreign store. */
export function SimplestRoute() {
  return (
    <Frame
      height={220}
      label="A home factory under its flag on the left, a foreign store under another flag on the right, a border between them. One straight arrow runs from the factory across the border to the store."
    >
      <Border x={400} y1={30} y2={196} />
      <Flag2 x={50} y={180} />
      <Factory3 x={140} y={180} k={1.2} />
      <Store2 x={650} y={180} k={1.2} />
      <Flag2 x={726} y={180} pattern="tri" />
      <Arrow2 x1={180} y1={150} x2={604} y2={150} tone={SIGNAL} width={2.25} size={10} />
      <Key x={110} y={206} anchor="middle" fill={INK} size={9.5}>
        HOME
      </Key>
      <Key x={680} y={206} anchor="middle" fill={INK} size={9.5}>
        FOREIGN MARKET
      </Key>
    </Frame>
  );
}

/** Factory → independent intermediary → border → foreign store. */
export function IndirectExport() {
  return (
    <Frame
      width={400}
      height={230}
      label="The company's factory hands its goods to an independent intermediary, drawn as a separate warehouse, which carries them across the border to a foreign store."
    >
      <Border x={262} y1={50} y2={196} />
      <Key x={130} y={36} anchor="middle" size={9}>
        HOME
      </Key>
      <Key x={330} y={36} anchor="middle" size={9}>
        FOREIGN
      </Key>
      <Factory3 x={46} y={180} k={0.9} />
      <Arrow2 x1={78} y1={156} x2={118} y2={156} tone={INK} width={1.5} size={6} />
      <Warehouse x={160} y={180} tone={COUNTER} fill={COUNTER_TINT} />
      <Arrow2 x1={198} y1={156} x2={302} y2={156} tone={COUNTER} width={1.75} size={7} />
      <Store2 x={346} y={180} k={0.9} />
      <Key x={160} y={202} anchor="middle" fill={COUNTER} size={9}>
        INTERMEDIARY
      </Key>
      <Key x={160} y={118} anchor="middle" fill={COUNTER} size={8.5}>
        INDEPENDENT
      </Key>
    </Frame>
  );
}

/** Factory and its own truck carry the goods across the border. */
export function DirectExport() {
  return (
    <Frame
      width={400}
      height={230}
      label="The company's factory loads its own truck, both in the company's colour and bracketed together, and the truck carries the goods across the border to a foreign store."
    >
      <Border x={262} y1={50} y2={196} />
      <Key x={130} y={36} anchor="middle" size={9}>
        HOME
      </Key>
      <Key x={330} y={36} anchor="middle" size={9}>
        FOREIGN
      </Key>
      <Factory3 x={46} y={180} k={0.9} tone={SIGNAL} fill={SIGNAL_TINT} />
      <Truck2 x={170} y={180} k={1.1} tone={SIGNAL} />
      <Arrow2 x1={208} y1={156} x2={302} y2={156} tone={SIGNAL} width={1.75} size={7} />
      <Store2 x={346} y={180} k={0.9} />
      <path d="M20 190V196H206V190" fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <Key x={113} y={214} anchor="middle" fill={SIGNAL} size={9}>
        YOUR OWN EXPORTS
      </Key>
    </Frame>
  );
}

/** The same product line on both sides of the border. */
export function SameLine() {
  const home = [96, 146, 196, 246];
  const away = [554, 604, 654, 704];
  const shapes = [44, 34, 52, 40];
  return (
    <Frame
      height={210}
      label="A product line of four packs at home and the identical four packs in the foreign market across the border, joined by an arrow marked least change."
    >
      <Border x={400} y1={92} y2={176} />
      <Key x={400} y={64} anchor="middle" fill={SIGNAL} size={10}>
        LEAST CHANGE
      </Key>
      <Arrow2 x1={290} y1={110} x2={510} y2={110} tone={SIGNAL} width={1.75} />
      {home.map((x, i) => (
        <Pack4 key={x} x={x} y={160} w={34} h={shapes[i]} />
      ))}
      {away.map((x, i) => (
        <Pack4 key={x} x={x} y={160} w={34} h={shapes[i]} />
      ))}
      <line x1={70} y1={160} x2={272} y2={160} stroke={INK3} strokeWidth={1} />
      <line x1={528} y1={160} x2={730} y2={160} stroke={INK3} strokeWidth={1} />
      <Key x={171} y={188} anchor="middle" fill={INK} size={9.5}>
        HOME
      </Key>
      <Key x={629} y={188} anchor="middle" fill={INK} size={9.5}>
        FOREIGN MARKET
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   MARKET ENTRY: JOINT VENTURING
   ========================================================================== */

/** Home company and foreign company, joined by a bracket across the border. */
export function JoinForeign() {
  return (
    <Frame
      height={250}
      label="A home company's factory on one side of a border and a foreign company's factory on the other, joined underneath by one bracket across the border labelled joint venture."
    >
      <Border x={400} y1={30} y2={200} />
      <Flag2 x={170} y={190} />
      <Factory3 x={290} y={190} k={1.2} />
      <Factory3 x={520} y={190} k={1.2} tone={COUNTER} fill={COUNTER_TINT} />
      <Flag2 x={606} y={190} pattern="disc" tone={COUNTER} />
      <Key x={280} y={110} anchor="middle" fill={INK} size={9.5}>
        HOME COMPANY
      </Key>
      <Key x={516} y={110} anchor="middle" fill={COUNTER} size={9.5}>
        FOREIGN COMPANY
      </Key>
      <path d="M250 202V214H550V202" fill="none" stroke={COUNTER} strokeWidth={2.5} />
      <Key x={400} y={236} anchor="middle" fill={COUNTER} size={10}>
        JOINT VENTURE
      </Key>
    </Frame>
  );
}

/** Licensing, contract manufacturing and joint ownership, side by side. */
export function JvTypes() {
  return (
    <Frame
      height={290}
      label="Three panels, each split by a border. Licensing: a home factory passes a sheet bearing its brand seal across the border to a foreign factory. Contract manufacturing: the home factory sends a contract across the border, and a foreign factory turns out packs that carry the home brand's seal. Joint ownership: one factory straddles the border, half home-coloured and half foreign-coloured."
    >
      <defs>
        <clipPath id="w12-own-home">
          <rect x={560} y={0} width={105} height={290} />
        </clipPath>
        <clipPath id="w12-own-foreign">
          <rect x={665} y={0} width={135} height={290} />
        </clipPath>
      </defs>
      <line x1={267} y1={30} x2={267} y2={240} stroke={RULE} strokeWidth={1} />
      <line x1={533} y1={30} x2={533} y2={240} stroke={RULE} strokeWidth={1} />
      {/* Licensing */}
      <Border x={135} y1={50} y2={214} />
      <Factory3 x={70} y={206} k={0.95} />
      <Factory3 x={206} y={206} k={0.95} tone={COUNTER} fill={COUNTER_TINT} />
      <Arrow2 x1={50} y1={124} x2={216} y2={124} tone={INK} width={1.5} size={7} />
      <Sheet x={135} y={118} w={34} h={44} lines={2} />
      <Mark2 x={135} y={130} r={7} tone={INK} />
      {/* Contract manufacturing */}
      <Border x={372} y1={50} y2={214} />
      <Factory3 x={310} y={206} k={0.8} />
      <Arrow2 x1={290} y1={124} x2={404} y2={124} tone={INK} width={1.5} size={7} />
      <Sheet x={346} y={118} w={30} h={40} lines={3} />
      <Factory3 x={432} y={206} k={1.1} tone={COUNTER} fill={COUNTER_TINT} />
      <Pack4 x={484} y={206} w={28} h={34} />
      <Mark2 x={484} y={188} r={6} tone={INK} />
      <Pack4 x={515} y={206} w={28} h={34} />
      <Mark2 x={515} y={188} r={6} tone={INK} />
      {/* Joint ownership */}
      <Border x={665} y1={50} y2={214} />
      <Flag2 x={574} y={206} />
      <Flag2 x={728} y={206} pattern="disc" tone={COUNTER} />
      <g clipPath="url(#w12-own-home)">
        <Factory3 x={668} y={206} k={1.35} fill={PAPER2} />
      </g>
      <g clipPath="url(#w12-own-foreign)">
        <Factory3 x={668} y={206} k={1.35} tone={COUNTER} fill={COUNTER_TINT} />
      </g>
      <Key x={135} y={262} anchor="middle" fill={INK} size={10}>
        LICENSING
      </Key>
      <Key x={400} y={262} anchor="middle" fill={INK} size={10}>
        CONTRACT MANUFACTURING
      </Key>
      <Key x={665} y={262} anchor="middle" fill={INK} size={10}>
        JOINT OWNERSHIP
      </Key>
    </Frame>
  );
}

/** Risk and control, each split between the two partners. */
export function RiskControlSplit() {
  const x0 = 214;
  const w = 400;
  const rows = [
    { key: "FINANCIAL RISK", y: 92, verdict: "SHARED", tone: SIGNAL },
    { key: "MANAGEMENT CONTROL", y: 172, verdict: "REDUCED", tone: COUNTER },
  ];
  return (
    <Frame
      height={240}
      label="Two bars, each split in half between the home company and the foreign company. The financial risk bar is marked shared; the management control bar is marked reduced."
    >
      <Schematic />
      <rect x={x0} y={30} width={14} height={14} fill={INK} />
      <Key x={x0 + 22} y={42} fill={INK} size={9.5}>
        HOME COMPANY
      </Key>
      <rect x={x0 + 180} y={30} width={14} height={14} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.25} />
      <Key x={x0 + 202} y={42} fill={COUNTER} size={9.5}>
        FOREIGN COMPANY
      </Key>
      {rows.map((r) => (
        <g key={r.key}>
          <Key x={20} y={r.y + 20} fill={INK} size={10}>
            {r.key}
          </Key>
          <rect x={x0} y={r.y} width={w / 2} height={30} fill={INK} />
          <rect x={x0 + w / 2} y={r.y} width={w / 2} height={30} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.25} />
          <Key x={x0 + w + 22} y={r.y + 20} fill={r.tone} size={11}>
            {r.verdict}
          </Key>
        </g>
      ))}
    </Frame>
  );
}

/* ==========================================================================
   MARKET ENTRY: DIRECT INVESTMENT
   ========================================================================== */

/** The company's own plant on foreign soil, supplying local stores and buyers. */
export function OwnPlantAbroad() {
  return (
    <Frame
      height={250}
      label="At home, a small factory under the home flag. Across the border, a large factory in the company's colour with the home flag planted beside it, supplying a local store and local buyers."
    >
      <Border x={300} y1={40} y2={220} />
      <Key x={150} y={30} anchor="middle" size={9.5}>
        HOME
      </Key>
      <Key x={550} y={30} anchor="middle" size={9.5}>
        FOREIGN MARKET
      </Key>
      <line x1={20} y1={210} x2={780} y2={210} stroke={RULE2} strokeWidth={1} />
      <Flag2 x={60} y={210} />
      <Factory3 x={170} y={210} />
      <Flag2 x={324} y={210} pattern="tri" />
      <Factory3 x={440} y={210} k={1.55} tone={SIGNAL} fill={SIGNAL_TINT} />
      <Flag2 x={496} y={210} h={62} />
      <Arrow2 x1={530} y1={186} x2={590} y2={186} tone={SIGNAL} width={1.5} size={7} />
      <Store2 x={630} y={210} />
      <Person3 x={700} y={210} />
      <Person3 x={736} y={210} />
    </Frame>
  );
}

/** One row per entry mode, a bar or coins showing how much of the metric it takes. */
export function ModeMeter({ metric }: { metric: "control" | "capital" }) {
  const title = metric === "control" ? "CONTROL" : "CAPITAL COMMITMENT";
  const amounts = metric === "control" ? [80, 160, 250] : [2, 5, 10];
  return (
    <Frame
      width={400}
      height={250}
      label={
        metric === "control"
          ? "Control for each entry mode: a short bar for exporting, a longer one for joint venturing and the longest for direct investment."
          : "Capital commitment for each entry mode: two coins for exporting, five for joint venturing and ten for direct investment."
      }
    >
      <Schematic x={392} />
      <Key x={20} y={30} fill={INK} size={10}>
        {title}
      </Key>
      {MODES.map((m, i) => {
        const cy = 84 + i * 64;
        return (
          <g key={m.kind}>
            <EntryMode kind={m.kind} x={60} y={cy + 20} k={0.62} />
            <Key x={120} y={cy - 8} fill={m.tone} size={8.5}>
              {m.name}
            </Key>
            {metric === "control" ? (
              <rect x={120} y={cy} width={amounts[i]} height={16} fill={m.fill} stroke={m.tone} strokeWidth={1.5} />
            ) : (
              Array.from({ length: amounts[i] }, (_, j) => (
                <circle key={j} cx={128 + j * 25} cy={cy + 9} r={9} fill={m.fill} stroke={m.tone} strokeWidth={1.4} />
              ))
            )}
          </g>
        );
      })}
    </Frame>
  );
}

/** Two currencies trading at a jagged, shifting rate. */
export function CurrencyRisk() {
  return (
    <Frame
      width={400}
      height={230}
      label="A dollar coin and a euro coin joined by a jagged two-way line whose swings grow as it goes: currency risks."
    >
      <circle cx={70} cy={110} r={34} fill={PAPER} stroke={INK} strokeWidth={1.75} />
      <Display x={70} y={122} anchor="middle" size={32}>
        $
      </Display>
      <circle cx={330} cy={110} r={34} fill={PAPER} stroke={INK} strokeWidth={1.75} />
      <Display x={330} y={122} anchor="middle" size={32}>
        €
      </Display>
      <path
        d="M112 110L128 102L142 118L158 96L174 124L192 88L210 134L228 80L246 140L262 78L278 136L288 110"
        fill="none"
        stroke={COUNTER}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <path d={headAlong1(292, 110, 1, 0, 8)} fill="none" stroke={COUNTER} strokeWidth={2} />
      <path d={headAlong1(108, 110, -1, 0, 8)} fill="none" stroke={COUNTER} strokeWidth={2} />
      <Key x={200} y={200} anchor="middle" fill={COUNTER} size={10}>
        CURRENCY RISKS
      </Key>
    </Frame>
  );
}

/** A government building tilting on cracked ground, under a warning sign. */
export function PoliticalRisk() {
  return (
    <Frame
      width={400}
      height={230}
      label="A government building tilted off its level on cracked ground, a warning sign beside it: political instability."
    >
      <path d="M60 180H180L190 172L200 186L212 176L222 180H340" fill="none" stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
      <g transform="rotate(-7 200 180)">
        <Government x={200} y={180} k={1.6} />
      </g>
      <Warning x={318} y={80} s={36} />
      <Key x={200} y={212} anchor="middle" fill={COUNTER} size={10}>
        POLITICAL INSTABILITY
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   DISCUSSION: SELECTING THE RIGHT ENTRY MODE
   ========================================================================== */

function Cup({ x, y, tone = INK }: { x: number; y: number; tone?: string }) {
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d={`M${x - 30} ${y - 64}H${x + 30}L${x + 24} ${y}H${x - 24}Z`} fill={PAPER} stroke={tone} strokeWidth={1.75} />
      <path d={`M${x + 28} ${y - 50}Q${x + 50} ${y - 48} ${x + 44} ${y - 30}Q${x + 40} ${y - 20} ${x + 25} ${y - 18}`} fill="none" stroke={tone} strokeWidth={1.75} />
      <path d={`M${x - 40} ${y + 6}H${x + 40}`} stroke={tone} strokeWidth={1.75} />
      {[-12, 0, 12].map((d) => (
        <path key={d} d={`M${x + d} ${y - 74}Q${x + d - 6} ${y - 82} ${x + d} ${y - 90}Q${x + d + 6} ${y - 98} ${x + d} ${y - 104}`} fill="none" stroke={INK3} strokeWidth={1.25} />
      ))}
    </g>
  );
}

/** A coffee brand at a fork: licensing or direct investment into a regulated market. */
export function CoffeeCrossroads() {
  return (
    <Frame
      height={290}
      label="A coffee cup carrying a large brand seal, with only a small coin stack beneath it. From the cup a path splits at a question mark into two routes, licensing above and direct investment below, both heading for a foreign market across a border that is stacked with rule sheets."
    >
      <Key x={110} y={40} anchor="middle" fill={INK} size={9}>
        BRAND IDENTITY
      </Key>
      <Cup x={110} y={178} />
      <Mark2 x={110} y={146} r={16} tone={SIGNAL} />
      <Coins2 x={110} y={246} n={2} w={34} />
      <Key x={110} y={272} anchor="middle" fill={INK} size={9}>
        LIMITED CAPITAL
      </Key>
      <line x1={166} y1={150} x2={290} y2={150} stroke={INK} strokeWidth={1.75} />
      <Display x={290} y={132} anchor="middle" size={28} fill={INK}>
        ?
      </Display>
      <path d="M290 150Q360 80 566 80" fill="none" stroke={COUNTER} strokeWidth={2} />
      <path d={headAlong1(570, 80, 1, 0, 8)} fill="none" stroke={COUNTER} strokeWidth={2} />
      <path d="M290 150Q360 220 566 220" fill="none" stroke={SIGNAL} strokeWidth={2} />
      <path d={headAlong1(570, 220, 1, 0, 8)} fill="none" stroke={SIGNAL} strokeWidth={2} />
      <Key x={452} y={68} anchor="middle" fill={COUNTER} size={10}>
        LICENSING
      </Key>
      <Key x={452} y={244} anchor="middle" fill={SIGNAL} size={10}>
        DIRECT INVESTMENT
      </Key>
      <Border x={590} y1={30} y2={270} />
      <Key x={690} y={48} anchor="middle" fill={INK} size={9}>
        HIGHLY REGULATED
      </Key>
      <Sheet x={664} y={112} w={36} h={46} />
      <Sheet x={686} y={106} w={36} h={46} />
      <Sheet x={708} y={100} w={36} h={46} />
      <Store2 x={680} y={250} />
      <Flag2 x={730} y={250} pattern="disc" />
    </Frame>
  );
}

/* ==========================================================================
   STANDARDIZED VS. ADAPTED MARKETING MIX
   ========================================================================== */

type ShapeKind = "circle" | "square" | "triangle" | "diamond";

function Shape({
  kind,
  x,
  y,
  r = 6,
  tone = INK,
  fill = PAPER,
}: {
  kind: ShapeKind;
  x: number;
  y: number;
  r?: number;
  tone?: string;
  fill?: string;
}) {
  if (kind === "circle") return <circle cx={x} cy={y} r={r} fill={fill} stroke={tone} strokeWidth={1.4} />;
  if (kind === "square") return <rect x={x - r} y={y - r} width={r * 2} height={r * 2} fill={fill} stroke={tone} strokeWidth={1.4} />;
  if (kind === "triangle")
    return <path d={`M${x} ${y - r - 1}L${x + r + 1} ${y + r}H${x - r - 1}Z`} fill={fill} stroke={tone} strokeWidth={1.4} strokeLinejoin="round" />;
  return <path d={`M${x} ${y - r - 1}L${x + r + 1} ${y}L${x} ${y + r + 1}L${x - r - 1} ${y}Z`} fill={fill} stroke={tone} strokeWidth={1.4} strokeLinejoin="round" />;
}

const ADAPTED: ShapeKind[][] = [
  ["circle", "triangle", "diamond", "square"],
  ["triangle", "triangle", "circle", "diamond"],
  ["diamond", "circle", "square", "circle"],
  ["square", "diamond", "triangle", "triangle"],
];

/** A marketing mix as a card of four cells, centred on (x, y). */
function MixCard({
  x,
  y,
  cells,
  tone,
}: {
  x: number;
  y: number;
  cells: ShapeKind[];
  tone: string;
}) {
  const fill = tone === SIGNAL ? SIGNAL_TINT : tone === COUNTER ? COUNTER_TINT : PAPER2;
  return (
    <g>
      <rect x={x - 26} y={y - 26} width={52} height={52} fill={PAPER} stroke={tone} strokeWidth={1.5} />
      <path d={`M${x} ${y - 26}V${y + 26}M${x - 26} ${y}H${x + 26}`} stroke={tone} strokeWidth={0.75} />
      {cells.map((c, i) => (
        <Shape key={i} kind={c} x={x + (i % 2 ? 13 : -13)} y={y + (i < 2 ? -13 : 13)} r={6} tone={tone} fill={fill} />
      ))}
    </g>
  );
}

/** One mix sent to four countries: copied unchanged, or reworked for each. */
export function MixSpread({ mode }: { mode: "standardized" | "adapted" }) {
  const tone = mode === "standardized" ? COUNTER : SIGNAL;
  const xs = [62, 154, 246, 338];
  const pats: FlagPattern[] = ["tri", "band", "disc", "cross"];
  const same: ShapeKind[] = ["square", "square", "square", "square"];
  return (
    <Frame
      width={400}
      height={260}
      label={
        mode === "standardized"
          ? "One marketing mix card at the top, sent to four countries. Every country receives an identical card."
          : "One marketing mix card at the top, sent to four countries. Each country's card has a different arrangement of shapes."
      }
    >
      <MixCard x={200} y={48} cells={same} tone={INK} />
      {xs.map((x, i) => (
        <g key={x}>
          <Arrow2 x1={200} y1={80} x2={x} y2={138} tone={tone} width={1.4} size={7} />
          <MixCard x={x} y={172} cells={mode === "standardized" ? same : ADAPTED[i]} tone={tone} />
          <Flag2 x={x - 12} y={250} pattern={pats[i]} h={32} />
        </g>
      ))}
    </Frame>
  );
}

/** Costs and local relevance for each approach, as paired bars. */
export function CostRelevance() {
  const base = 206;
  const groups = [
    { key: "COSTS", x: 250, std: 60, adp: 140 },
    { key: "LOCAL RELEVANCE", x: 550, std: 52, adp: 150 },
  ];
  return (
    <Frame
      height={250}
      label="Paired bars. For costs, standardization's bar is short and adaptation's is tall. For local relevance, standardization's bar is short and adaptation's is tall."
    >
      <Schematic />
      <rect x={40} y={24} width={14} height={14} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.25} />
      <Key x={62} y={36} fill={COUNTER} size={9.5}>
        STANDARDIZATION
      </Key>
      <rect x={232} y={24} width={14} height={14} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.25} />
      <Key x={254} y={36} fill={SIGNAL} size={9.5}>
        ADAPTATION
      </Key>
      <line x1={120} y1={base} x2={680} y2={base} stroke={INK} strokeWidth={1.5} />
      {groups.map((g) => (
        <g key={g.key}>
          <rect x={g.x - 84} y={base - g.std} width={76} height={g.std} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.5} />
          <rect x={g.x + 8} y={base - g.adp} width={76} height={g.adp} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
          <Key x={g.x} y={base + 26} anchor="middle" fill={INK} size={10}>
            {g.key}
          </Key>
        </g>
      ))}
    </Frame>
  );
}

/* ==========================================================================
   PRODUCT ADAPTATION STRATEGIES
   ========================================================================== */

/** Home product crossing the border: unchanged, altered, or replaced by something new. */
export function ProductRow({ kind }: { kind: "extension" | "adaptation" | "invention" }) {
  return (
    <Frame
      width={400}
      height={140}
      label={
        kind === "extension"
          ? "A pack at home crosses the border and arrives unchanged."
          : kind === "adaptation"
            ? "A pack at home crosses the border and arrives altered: the same pack, reshaped and relabelled."
            : "A pack at home; across the border stands something new, a bottle made for that market."
      }
    >
      <Border x={200} y1={14} y2={130} />
      <Key x={100} y={22} anchor="middle" size={8.5}>
        HOME
      </Key>
      <Key x={300} y={22} anchor="middle" size={8.5}>
        FOREIGN MARKET
      </Key>
      <Pack4 x={100} y={120} w={44} h={60} tone={kind === "invention" ? INK3 : INK} />
      <Arrow2 x1={138} y1={92} x2={258} y2={92} tone={kind === "extension" ? INK : SIGNAL} width={1.5} size={7} />
      {kind === "extension" ? <Pack4 x={300} y={120} w={44} h={60} /> : null}
      {kind === "adaptation" ? (
        <g>
          <Pack4 x={300} y={120} w={58} h={44} tone={SIGNAL} />
          <rect x={271} y={94} width={58} height={16} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.25} />
        </g>
      ) : null}
      {kind === "invention" ? (
        <g>
          <Bottle2 x={300} y={120} />
          <path d="M330 56V70M323 63H337M340 80V88M336 84H344" stroke={SIGNAL} strokeWidth={1.5} strokeLinecap="round" />
        </g>
      ) : null}
    </Frame>
  );
}

/** Local tastes and infrastructure feed into the choice among the three strategies. */
export function TastesInfrastructure() {
  const options = [
    { y: 70, name: "STRAIGHT EXTENSION" },
    { y: 140, name: "PRODUCT ADAPTATION" },
    { y: 210, name: "PRODUCT INVENTION" },
  ];
  return (
    <Frame
      height={270}
      label="Two inputs on the left, local tastes (a person thinking of a bowl with chopsticks) and infrastructure (a wall socket), feed arrows into one junction. From it a solid arrow selects product adaptation; dashed lines lead to straight extension and product invention."
    >
      <Person3 x={60} y={130} k={1.2} />
      <Thought x={92} y={30} w={76} h={40} tx={66} ty={92} />
      <path d="M108 48H152Q150 64 130 64Q110 64 108 48Z" fill={PAPER2} stroke={INK} strokeWidth={1.25} strokeLinejoin="round" />
      <path d="M134 46L150 36M140 46L156 38" stroke={INK} strokeWidth={1.25} strokeLinecap="round" />
      <Key x={96} y={156} anchor="middle" fill={INK} size={9.5}>
        LOCAL TASTES
      </Key>
      <rect x={72} y={186} width={48} height={48} rx={8} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <rect x={85} y={198} width={5} height={14} rx={1.5} fill={INK} />
      <rect x={102} y={198} width={5} height={14} rx={1.5} fill={INK} />
      <circle cx={96} cy={222} r={3} fill={INK} />
      <Key x={96} y={256} anchor="middle" fill={INK} size={9.5}>
        INFRASTRUCTURE
      </Key>
      <Arrow2 x1={180} y1={100} x2={364} y2={140} tone={INK} width={1.5} />
      <Arrow2 x1={140} y1={210} x2={364} y2={154} tone={INK} width={1.5} />
      <circle cx={380} cy={147} r={12} fill={SIGNAL} />
      {options.map((o, i) => {
        const lit = i === 1;
        return (
          <g key={o.name}>
            {lit ? (
              <Arrow2 x1={394} y1={145} x2={500} y2={o.y + 2} tone={SIGNAL} width={2} />
            ) : (
              <line x1={392} y1={147} x2={500} y2={o.y + 2} stroke={INK3} strokeWidth={1.25} strokeDasharray="4 4" />
            )}
            <rect x={504} y={o.y - 22} width={264} height={46} fill={lit ? SIGNAL_TINT : PAPER} stroke={lit ? SIGNAL : RULE2} strokeWidth={1.5} />
            <Key x={636} y={o.y + 5} anchor="middle" fill={lit ? SIGNAL : INK3} size={10.5}>
              {o.name}
            </Key>
          </g>
        );
      })}
    </Frame>
  );
}

/* ==========================================================================
   PROMOTION ADAPTATION
   ========================================================================== */

/** An advertisement card; the layout number sets how its picture and words sit. */
function AdCard({
  x,
  y,
  w,
  h,
  layout,
  tone = INK,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  layout: 0 | 1 | 2 | 3;
  tone?: string;
}) {
  const tint = tone === SIGNAL ? SIGNAL_TINT : PAPER2;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={PAPER} stroke={tone} strokeWidth={1.5} />
      {layout === 0 ? (
        <g>
          <rect x={x + 6} y={y + 6} width={r2(w * 0.42)} height={h - 12} fill={tint} stroke={tone} strokeWidth={0.8} />
          {[0.3, 0.5, 0.7].map((f) => (
            <line key={f} x1={r2(x + w * 0.56)} y1={r2(y + h * f)} x2={x + w - 8} y2={r2(y + h * f)} stroke={tone} strokeWidth={f === 0.3 ? 3 : 1.2} />
          ))}
        </g>
      ) : null}
      {layout === 1 ? (
        <g>
          <rect x={x + 8} y={y + 8} width={w - 16} height={r2(h * 0.14)} fill={tone} />
          <circle cx={r2(x + w * 0.72)} cy={r2(y + h * 0.64)} r={r2(h * 0.22)} fill={tint} stroke={tone} strokeWidth={0.8} />
          <line x1={x + 8} y1={r2(y + h * 0.56)} x2={r2(x + w * 0.44)} y2={r2(y + h * 0.56)} stroke={tone} strokeWidth={1.2} />
          <line x1={x + 8} y1={r2(y + h * 0.72)} x2={r2(x + w * 0.38)} y2={r2(y + h * 0.72)} stroke={tone} strokeWidth={1.2} />
        </g>
      ) : null}
      {layout === 2 ? (
        <g>
          <rect x={x + 6} y={y + 6} width={w - 12} height={r2(h * 0.56)} fill={tint} stroke={tone} strokeWidth={0.8} />
          <line x1={r2(x + w * 0.22)} y1={r2(y + h * 0.8)} x2={r2(x + w * 0.78)} y2={r2(y + h * 0.8)} stroke={tone} strokeWidth={3} />
        </g>
      ) : null}
      {layout === 3 ? (
        <g>
          <path
            d={`M${x + 8} ${y + h - 8}L${r2(x + w * 0.4)} ${r2(y + h * 0.3)}L${r2(x + w * 0.6)} ${r2(y + h * 0.58)}L${r2(x + w * 0.74)} ${r2(y + h * 0.42)}L${x + w - 8} ${y + h - 8}Z`}
            fill={tint}
            stroke={tone}
            strokeWidth={0.8}
            strokeLinejoin="round"
          />
          <line x1={r2(x + w * 0.6)} y1={y + 12} x2={x + w - 10} y2={y + 12} stroke={tone} strokeWidth={3} />
        </g>
      ) : null}
    </g>
  );
}

/** An advertisement above a slider from same message to fully altered; the knob is a question. */
export function HowMuchToAdapt() {
  return (
    <Frame
      height={230}
      label="A billboard advertisement stands above a slider running from same message to fully altered. The slider's knob sits in the middle, marked with a question mark."
    >
      <line x1={340} y1={124} x2={340} y2={156} stroke={INK} strokeWidth={2} />
      <line x1={460} y1={124} x2={460} y2={156} stroke={INK} strokeWidth={2} />
      <AdCard x={290} y={24} w={220} h={100} layout={0} />
      <line x1={160} y1={180} x2={640} y2={180} stroke={INK} strokeWidth={2} />
      <line x1={160} y1={172} x2={160} y2={188} stroke={INK} strokeWidth={2} />
      <line x1={640} y1={172} x2={640} y2={188} stroke={INK} strokeWidth={2} />
      <circle cx={400} cy={180} r={15} fill={PAPER} stroke={SIGNAL} strokeWidth={2} />
      <Display x={400} y={187} anchor="middle" fill={SIGNAL} size={19}>
        ?
      </Display>
      <Key x={160} y={212} fill={INK} size={9.5}>
        SAME MESSAGE
      </Key>
      <Key x={640} y={212} anchor="end" fill={SIGNAL} size={9.5}>
        FULLY ALTERED
      </Key>
    </Frame>
  );
}

/** One home advertisement becomes three entirely different local ones. */
export function CommAdaptation() {
  const ys = [16, 108, 200];
  const pats: FlagPattern[] = ["tri", "band", "disc"];
  const layouts: (1 | 2 | 3)[] = [1, 2, 3];
  return (
    <Frame
      height={300}
      label="A home advertisement on the left. Arrows lead to three local advertisements on the right, one per country flag, each with a completely different layout of picture and words."
    >
      <AdCard x={40} y={110} w={140} h={84} layout={0} />
      <Flag2 x={98} y={256} />
      {ys.map((y, i) => (
        <g key={y}>
          <Arrow2 x1={190} y1={152} x2={512} y2={y + 42} tone={SIGNAL} width={1.5} />
          <AdCard x={520} y={y} w={140} h={84} layout={layouts[i]} tone={SIGNAL} />
          <Flag2 x={678} y={y + 84} pattern={pats[i]} />
        </g>
      ))}
    </Frame>
  );
}

/** A tagline translated from English to French, then checked under a lens for cultural context. */
export function TaglineVetting() {
  return (
    <Frame
      height={230}
      label="An English tagline in a speech bubble is translated into a French one. A magnifying glass examines the French tagline, labelled cultural context, and a tick marked vetted follows."
    >
      <Bubble3 x={40} y={70} w={180} h={64} />
      <Key x={54} y={90} fill={INK} size={10}>
        EN
      </Key>
      <line x1={90} y1={98} x2={204} y2={98} stroke={INK} strokeWidth={3} />
      <line x1={90} y1={114} x2={180} y2={114} stroke={INK3} strokeWidth={1.25} />
      <Key x={272} y={84} anchor="middle" size={8.5}>
        TRANSLATED
      </Key>
      <Arrow2 x1={232} y1={100} x2={310} y2={100} tone={INK} width={1.5} />
      <Bubble3 x={320} y={70} w={180} h={64} />
      <Key x={334} y={90} fill={INK} size={10}>
        FR
      </Key>
      <line x1={370} y1={98} x2={484} y2={98} stroke={INK} strokeWidth={3} />
      <line x1={370} y1={114} x2={460} y2={114} stroke={INK3} strokeWidth={1.25} />
      <Magnifier2 x={430} y={104} r={30} />
      <Key x={430} y={186} anchor="middle" fill={SIGNAL} size={9.5}>
        CULTURAL CONTEXT
      </Key>
      <Arrow2 x1={516} y1={102} x2={606} y2={102} tone={SIGNAL} width={1.5} />
      <circle cx={648} cy={102} r={28} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.75} />
      <Tick x={648} y={104} s={11} width={2.5} />
      <Key x={648} y={156} anchor="middle" fill={SIGNAL} size={9.5}>
        VETTED
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   PRICING IN GLOBAL MARKETS
   ========================================================================== */

/** Transportation, tariffs and intermediary margins, added one to the next. */
export function CostsAdded() {
  return (
    <Frame
      width={400}
      height={230}
      label="Three costs joined by plus signs: a truck for transportation, a coin stack sitting on a border for tariffs, and a warehouse marked with a percent sign for intermediary margins."
    >
      <Truck2 x={70} y={160} k={1.1} />
      <Display x={136} y={150} anchor="middle" fill={INK3} size={26}>
        +
      </Display>
      <Border x={200} y1={84} y2={172} />
      <Coins2 x={200} y={160} n={3} w={40} tone={COUNTER} fill={COUNTER_TINT} />
      <Display x={264} y={150} anchor="middle" fill={INK3} size={26}>
        +
      </Display>
      <Warehouse x={330} y={160} />
      <Display x={330} y={104} anchor="middle" fill={COUNTER} size={22}>
        %
      </Display>
      <Key x={70} y={196} anchor="middle" fill={INK} size={9}>
        TRANSPORTATION
      </Key>
      <Key x={200} y={196} anchor="middle" fill={INK} size={9}>
        TARIFFS
      </Key>
      <Key x={330} y={196} anchor="middle" fill={INK} size={9}>
        INTERMEDIARY
      </Key>
      <Key x={330} y={210} anchor="middle" fill={INK} size={9}>
        MARGINS
      </Key>
    </Frame>
  );
}

/** A waterfall: home price plus each added cost climbs to a far higher foreign price. */
export function PriceEscalation() {
  const base = 250;
  const steps = [
    { key: "HOME PRICE", x: 110, from: 180, to: base, kind: "home" },
    { key: "TRANSPORTATION", x: 250, from: 144, to: 180, kind: "add" },
    { key: "TARIFFS", x: 390, from: 100, to: 144, kind: "add" },
    { key: "INTERMEDIARY MARGINS", x: 530, from: 50, to: 100, kind: "add" },
    { key: "FOREIGN PRICE", x: 660, from: 50, to: base, kind: "foreign" },
  ];
  return (
    <Frame
      height={300}
      label="A waterfall chart. The home price is a short bar. Transportation, tariffs and intermediary margins each add a step on top. The foreign price at the end is a bar several times taller, and the gap between the two is marked price escalation."
    >
      <Schematic x={600} />
      <line x1={50} y1={base} x2={720} y2={base} stroke={INK} strokeWidth={1.5} />
      {steps.map((s, i) => {
        const next = steps[i + 1];
        return (
          <g key={s.key}>
            <rect
              x={s.x - 40}
              y={s.from}
              width={80}
              height={s.to - s.from}
              fill={s.kind === "home" ? PAPER2 : s.kind === "add" ? COUNTER_TINT : COUNTER}
              stroke={s.kind === "home" ? INK : COUNTER}
              strokeWidth={1.5}
            />
            {s.kind === "add" ? (
              <Display x={s.x} y={Math.round((s.from + s.to) / 2) + 8} anchor="middle" fill={COUNTER} size={20}>
                +
              </Display>
            ) : null}
            {next && next.kind === "add" ? (
              <line x1={s.x + 40} y1={s.from} x2={next.x - 40} y2={s.from} stroke={INK3} strokeWidth={1} strokeDasharray="3 3" />
            ) : null}
            <Key x={s.x} y={base + 24} anchor="middle" fill={s.kind === "home" ? INK : COUNTER} size={9}>
              {s.key}
            </Key>
          </g>
        );
      })}
      <line x1={570} y1={50} x2={620} y2={50} stroke={INK3} strokeWidth={1} strokeDasharray="3 3" />
      <Tag2 x={84} y={158} w={52} h={24} />
      <path d="M704 180H722M704 50H722" stroke={INK3} strokeWidth={1} />
      <line x1={716} y1={176} x2={716} y2={56} stroke={COUNTER} strokeWidth={1.75} />
      <path d={headAlong1(716, 54, 0, -1, 8)} fill="none" stroke={COUNTER} strokeWidth={1.75} />
      <text
        x={744}
        y={116}
        textAnchor="middle"
        transform="rotate(-90 744 116)"
        fontFamily="var(--font-label)"
        fontSize={9.5}
        fontWeight={600}
        letterSpacing="0.14em"
        fill={COUNTER}
      >
        PRICE ESCALATION
      </text>
      <line x1={620} y1={180} x2={704} y2={180} stroke={INK3} strokeWidth={1} strokeDasharray="3 3" />
    </Frame>
  );
}

const COSTS = [80, 145, 55, 170, 110];
const PRICE = 120;

/** One price line laid across five markets whose costs differ: in two, cost breaks through it. */
export function UniformPrice() {
  const base = 216;
  const pats: FlagPattern[] = ["tri", "band", "disc", "cross", "diag"];
  return (
    <Frame
      height={280}
      label="Cost bars for five markets under one dashed line marked uniform price. In three markets the cost sits below the line; in two the cost bar breaks through it, and the part above the line is shaded."
    >
      <Schematic />
      <rect x={96} y={20} width={14} height={14} fill={PAPER2} stroke={INK} strokeWidth={1.25} />
      <Key x={118} y={32} fill={INK} size={9.5}>
        COST
      </Key>
      <line x1={80} y1={base} x2={760} y2={base} stroke={INK} strokeWidth={1.5} />
      {COSTS.map((c, i) => {
        const x = 150 + i * 132;
        const under = Math.min(c, PRICE);
        return (
          <g key={i}>
            <rect x={x - 32} y={base - under} width={64} height={under} fill={PAPER2} stroke={INK} strokeWidth={1.25} />
            {c > PRICE ? (
              <rect x={x - 32} y={base - c} width={64} height={c - PRICE} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.5} />
            ) : null}
            <Flag2 x={x - 12} y={base + 50} pattern={pats[i]} h={32} />
          </g>
        );
      })}
      <line x1={70} y1={base - PRICE} x2={780} y2={base - PRICE} stroke={INK} strokeWidth={2} strokeDasharray="8 5" />
      <Tag2 x={16} y={base - PRICE} w={46} h={26} />
      <Key x={780} y={base - PRICE - 10} anchor="end" fill={INK} size={9.5}>
        UNIFORM PRICE
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   DISTRIBUTION CHANNELS
   ========================================================================== */

const FRAG = Array.from({ length: 4 }, (_, z) =>
  Array.from({ length: 7 }, (_, j) => ({
    x: Math.round(z * 200 + 26 + hash2(z * 17 + j * 3 + 1) * 148),
    y: Math.round(40 + hash2(z * 31 + j * 7 + 5) * 170),
    sq: (j + z) % 3 === 0,
  })),
);

/** Four countries, each with its own tangle of outlets; links across borders break. */
export function Fragmented() {
  return (
    <Frame
      height={250}
      label="Four countries divided by borders. Inside each, small outlets are linked in a dense tangle of lines. The few links that reach across a border break off at it."
    >
      {[200, 400, 600].map((x) => (
        <Border key={x} x={x} y1={16} y2={236} />
      ))}
      {FRAG.map((zone, z) => (
        <g key={z}>
          {zone.map((n, j) =>
            [1, 3].map((d) => {
              const m = zone[(j + d) % zone.length];
              return <line key={`${j}-${d}`} x1={n.x} y1={n.y} x2={m.x} y2={m.y} stroke={INK3} strokeWidth={1} />;
            }),
          )}
        </g>
      ))}
      {[0, 1, 2].map((z) => {
        const a = FRAG[z][2];
        const b = FRAG[z + 1][4];
        const bx = (z + 1) * 200;
        const t1 = (bx - 12 - a.x) / (b.x - a.x);
        const t2 = (bx + 12 - a.x) / (b.x - a.x);
        return (
          <g key={z}>
            <line x1={a.x} y1={a.y} x2={bx - 12} y2={r2(a.y + (b.y - a.y) * t1)} stroke={COUNTER} strokeWidth={1.5} />
            <line x1={bx + 12} y1={r2(a.y + (b.y - a.y) * t2)} x2={b.x} y2={b.y} stroke={COUNTER} strokeWidth={1.5} />
          </g>
        );
      })}
      {FRAG.flat().map((n, i) =>
        n.sq ? (
          <rect key={i} x={n.x - 6} y={n.y - 6} width={12} height={12} fill={PAPER} stroke={INK} strokeWidth={1.5} />
        ) : (
          <circle key={i} cx={n.x} cy={n.y} r={6} fill={PAPER} stroke={INK} strokeWidth={1.5} />
        ),
      )}
    </Frame>
  );
}

/** A ship carrying containers. */
function Ship({ x, y, tone = INK }: { x: number; y: number; tone?: string }) {
  return (
    <g strokeLinejoin="round">
      <path d={`M${x - 50} ${y - 16}H${x + 50}L${x + 38} ${y}H${x - 42}Z`} fill={PAPER} stroke={tone} strokeWidth={1.5} />
      {[-38, -20, -2].map((d) => (
        <rect key={d} x={x + d} y={y - 30} width={16} height={14} fill={PAPER2} stroke={tone} strokeWidth={1.25} />
      ))}
      <rect x={x + 22} y={y - 38} width={16} height={22} fill={PAPER} stroke={tone} strokeWidth={1.25} />
    </g>
  );
}

/** Seller to border, then border to final buyers; one half lit. */
export function WholeChannel({ phase }: { phase: "between" | "within" }) {
  const a = phase === "between" ? SIGNAL : INK3;
  const b = phase === "within" ? SIGNAL : INK3;
  return (
    <Frame
      height={260}
      label={
        phase === "between"
          ? "A channel drawn end to end. The first half is lit: from the seller's factory, a ship carries goods up to the border. After the border, a warehouse, a store and the final buyers are drawn faintly."
          : "A channel drawn end to end. The second half is lit: from the border, a warehouse passes goods to a store and on to the final buyers. The seller's factory and ship before the border are drawn faintly."
      }
    >
      <Border x={400} y1={62} y2={226} />
      <Key x={400} y={50} anchor="middle" fill={INK} size={9.5}>
        BORDER
      </Key>
      <path d="M36 112V104H388V112" fill="none" stroke={a} strokeWidth={1.75} />
      <Key x={212} y={92} anchor="middle" fill={a} size={9.5}>
        CHANNEL BETWEEN NATIONS
      </Key>
      <path d="M412 112V104H780V112" fill="none" stroke={b} strokeWidth={1.75} />
      <Key x={596} y={92} anchor="middle" fill={b} size={9.5}>
        CHANNEL WITHIN NATIONS
      </Key>
      <Factory3 x={74} y={206} tone={a} fill={phase === "between" ? SIGNAL_TINT : PAPER} />
      <Arrow2 x1={108} y1={188} x2={160} y2={188} tone={a} width={1.5} size={7} />
      <Ship x={228} y={206} tone={a} />
      <Arrow2 x1={290} y1={188} x2={390} y2={188} tone={a} width={1.75} size={8} />
      <Arrow2 x1={410} y1={188} x2={440} y2={188} tone={b} width={1.5} size={7} />
      <Warehouse x={478} y={206} tone={b} fill={phase === "within" ? SIGNAL_TINT : PAPER} />
      <Arrow2 x1={516} y1={188} x2={560} y2={188} tone={b} width={1.5} size={7} />
      <Store2 x={600} y={206} tone={b} />
      <Arrow2 x1={634} y1={188} x2={670} y2={188} tone={b} width={1.5} size={7} />
      <Person3 x={696} y={206} stroke={b} />
      <Person3 x={726} y={206} stroke={b} />
      <Person3 x={756} y={206} stroke={b} />
      <Key x={726} y={232} anchor="middle" fill={b} size={9}>
        FINAL BUYERS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   DISCUSSION: THE COST OF ADAPTATION
   ========================================================================== */

/** A phone whose screen lists four features, each ticked. */
function FeaturePhone({ x, y, tone }: { x: number; y: number; tone: string }) {
  return (
    <g>
      <Phone3 x={x} y={y} k={1.8} tone={tone} />
      {[-36, -12, 12, 36].map((d) => (
        <g key={d}>
          <Tick x={x - 16} y={y + d - 4} s={5} tone={tone} width={1.75} />
          <line x1={x - 4} y1={y + d - 4} x2={x + 20} y2={y + d - 4} stroke={tone} strokeWidth={1.5} />
        </g>
      ))}
    </g>
  );
}

/** Flagship and local rival: the same four features, the rival's price bar half as tall. */
export function PhoneRivals() {
  return (
    <Frame
      height={280}
      label="Two phones whose screens show the same four ticked features. Beside the flagship stands a tall price bar; beside the local competitor, a price bar exactly half as tall."
    >
      <FeaturePhone x={150} y={140} tone={INK} />
      <rect x={244} y={60} width={40} height={160} fill={INK} />
      <line x1={230} y1={220} x2={298} y2={220} stroke={INK} strokeWidth={1.5} />
      <FeaturePhone x={500} y={140} tone={COUNTER} />
      <rect x={594} y={140} width={40} height={80} fill={COUNTER} />
      <line x1={580} y1={220} x2={648} y2={220} stroke={INK} strokeWidth={1.5} />
      <line x1={284} y1={60} x2={634} y2={60} stroke={RULE2} strokeWidth={1} strokeDasharray="4 4" />
      <path d="M594 60V140" stroke={RULE2} strokeWidth={1} strokeDasharray="4 4" />
      <Display x={666} y={188} anchor="middle" fill={COUNTER} size={26}>
        ½
      </Display>
      <Key x={150} y={250} anchor="middle" fill={INK} size={9.5}>
        FLAGSHIP
      </Key>
      <Key x={264} y={250} anchor="middle" size={9}>
        PRICE
      </Key>
      <Key x={500} y={250} anchor="middle" fill={COUNTER} size={9.5}>
        LOCAL COMPETITOR
      </Key>
      <Key x={614} y={250} anchor="middle" size={9}>
        PRICE
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   EMERGING TRENDS IN MARKETING
   ========================================================================== */

type MediaKind = "news" | "radio" | "tv" | "computer" | "phone" | "ai";

function Media({ kind, x, y, tone = INK }: { kind: MediaKind; x: number; y: number; tone?: string }) {
  if (kind === "news") {
    return (
      <g>
        <rect x={x - 18} y={y - 18} width={36} height={36} fill={PAPER} stroke={tone} strokeWidth={1.5} />
        <rect x={x - 13} y={y - 13} width={26} height={6} fill={tone} />
        {[-1, 5, 11].map((d) => (
          <path key={d} d={`M${x - 13} ${y + d}H${x - 2}M${x + 2} ${y + d}H${x + 13}`} stroke={tone} strokeWidth={1} />
        ))}
      </g>
    );
  }
  if (kind === "radio") {
    return (
      <g>
        <line x1={x + 8} y1={y - 8} x2={x + 18} y2={y - 22} stroke={tone} strokeWidth={1.5} strokeLinecap="round" />
        <rect x={x - 21} y={y - 8} width={42} height={26} rx={4} fill={PAPER} stroke={tone} strokeWidth={1.5} />
        <circle cx={x - 8} cy={y + 5} r={8} fill={PAPER2} stroke={tone} strokeWidth={1.25} />
        <path d={`M${x + 5} ${y}H${x + 15}M${x + 5} ${y + 6}H${x + 15}M${x + 5} ${y + 12}H${x + 15}`} stroke={tone} strokeWidth={1} />
      </g>
    );
  }
  if (kind === "tv") {
    return (
      <g>
        <path d={`M${x - 10} ${y + 10}L${x - 14} ${y + 19}M${x + 10} ${y + 10}L${x + 14} ${y + 19}`} stroke={tone} strokeWidth={1.5} strokeLinecap="round" />
        <path d={`M${x - 6} ${y - 24}L${x} ${y - 16}L${x + 6} ${y - 24}`} fill="none" stroke={tone} strokeWidth={1.25} />
        <rect x={x - 22} y={y - 16} width={44} height={28} rx={3} fill={PAPER} stroke={tone} strokeWidth={1.5} />
        <rect x={x - 17} y={y - 12} width={30} height={20} rx={2} fill={PAPER2} stroke={tone} strokeWidth={0.8} />
      </g>
    );
  }
  if (kind === "computer") {
    return (
      <g>
        <rect x={x - 22} y={y - 20} width={44} height={30} rx={2} fill={PAPER} stroke={tone} strokeWidth={1.5} />
        <rect x={x - 18} y={y - 16} width={36} height={22} fill={PAPER2} stroke={tone} strokeWidth={0.8} />
        <path d={`M${x - 5} ${y + 10}V${y + 15}M${x + 5} ${y + 10}V${y + 15}M${x - 14} ${y + 16}H${x + 14}`} stroke={tone} strokeWidth={1.5} />
      </g>
    );
  }
  if (kind === "phone") return <Phone3 x={x} y={y} k={0.52} tone={tone} />;
  return <Chip2 x={x} y={y} s={28} />;
}

const EVO_XS = [80, 300, 470, 590, 675, 742];
const EVO_KINDS: MediaKind[] = ["news", "radio", "tv", "computer", "phone", "ai"];
const evo = (x: number) => {
  const t = (x - 40) / 720;
  return r2(200 - (170 * (Math.exp(3 * t) - 1)) / (Math.exp(3) - 1));
};
const EVO_PATH = Array.from({ length: 49 }, (_, i) => {
  const x = 40 + i * 15;
  return `${i ? "L" : "M"}${x} ${evo(x)}`;
}).join("");

/** Marketing media along a curve that climbs faster and faster: the gaps shrink. */
export function RapidEvolution() {
  return (
    <Frame
      height={270}
      label="A curve that starts nearly flat and climbs ever more steeply. Along it sit marketing media in the order they arrived: a newspaper, a radio, a television, a computer, a phone and an AI chip. Each gap between them is shorter than the last."
    >
      <path d={EVO_PATH} fill="none" stroke={SIGNAL} strokeWidth={2} />
      {EVO_XS.map((x, i) => (
        <g key={x}>
          <circle cx={x} cy={evo(x)} r={4.5} fill={SIGNAL} />
          <Media kind={EVO_KINDS[i]} x={x} y={Math.round(evo(x)) + 42} />
        </g>
      ))}
    </Frame>
  );
}

/** A consumer expecting two things: a leaf and a see-through box. */
export function Expectations() {
  return (
    <Frame
      width={400}
      height={250}
      label="A consumer with two thought bubbles. One holds a leaf, labelled sustainability. The other holds a see-through box with the product visible inside, labelled transparency."
    >
      <Person3 x={90} y={240} k={1.4} />
      <Key x={190} y={22} anchor="middle" fill={SIGNAL} size={9.5}>
        SUSTAINABILITY
      </Key>
      <Thought x={140} y={32} w={100} h={64} tx={100} ty={188} />
      <Leaf x={190} y={86} s={42} />
      <Key x={310} y={114} anchor="middle" fill={SIGNAL} size={9.5}>
        TRANSPARENCY
      </Key>
      <Thought x={260} y={124} w={100} h={64} tx={104} ty={192} />
      <rect x={284} y={136} width={52} height={40} fill="none" stroke={INK} strokeWidth={1.25} strokeDasharray="3 3" />
      <Pack4 x={310} y={172} w={26} h={24} tone={SIGNAL} fill={SIGNAL_TINT} />
    </Frame>
  );
}

const NET_CX = 200;
const NET_CY = 125;
const NET = [
  ...Array.from({ length: 6 }, (_, i) => ({ ring: 0.36, a: i * 60 + 15 })),
  ...Array.from({ length: 9 }, (_, i) => ({ ring: 0.66, a: i * 40 + 5 })),
  ...Array.from({ length: 12 }, (_, i) => ({ ring: 0.94, a: i * 30 + 12 })),
].map((n, i) => {
  const a = ((n.a + hash2(i + 3) * 14) * Math.PI) / 180;
  return {
    x: Math.round(NET_CX + 180 * n.ring * Math.cos(a)),
    y: Math.round(NET_CY + 108 * n.ring * Math.sin(a)),
  };
});
const NET_EDGES = NET.flatMap((p, i) =>
  NET.map((q, j) => ({ j, d: Math.hypot(p.x - q.x, p.y - q.y) }))
    .filter((e) => e.j > i)
    .sort((m, n) => m.d - n.d)
    .slice(0, 3)
    .map((e) => [i, e.j]),
);

/** Everyone linked to everyone, the brand at the centre of the web. */
export function HyperConnected() {
  return (
    <Frame
      width={400}
      height={250}
      label="A dense web of people linked to one another, with the brand seal at its centre connected into it."
    >
      {NET_EDGES.map(([i, j]) => (
        <line key={`${i}-${j}`} x1={NET[i].x} y1={NET[i].y} x2={NET[j].x} y2={NET[j].y} stroke={INK3} strokeWidth={1} />
      ))}
      {NET.slice(0, 6).map((p, i) => (
        <line key={i} x1={NET_CX} y1={NET_CY} x2={p.x} y2={p.y} stroke={SIGNAL} strokeWidth={1.5} />
      ))}
      {NET.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={5} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      ))}
      <Mark2 x={NET_CX} y={NET_CY} r={16} />
    </Frame>
  );
}

/* ==========================================================================
   AI IN MARKETING — hub and spoke
   ========================================================================== */

type AiUse = "data" | "insight" | "predict" | "chat" | "auto";

function AiUseGlyph({ kind, x, y, tone = INK }: { kind: AiUse; x: number; y: number; tone?: string }) {
  if (kind === "data") {
    return (
      <g>
        <line x1={x - 16} y1={y + 14} x2={x + 16} y2={y + 14} stroke={tone} strokeWidth={1.25} />
        {[10, 18, 14, 24].map((h, i) => (
          <rect key={i} x={x - 14 + i * 8} y={y + 14 - h} width={5} height={h} fill={tone} />
        ))}
      </g>
    );
  }
  if (kind === "insight") {
    return (
      <g>
        <circle cx={x} cy={y - 4} r={11} fill={SIGNAL_TINT} stroke={tone} strokeWidth={1.5} />
        <path d={`M${x - 5} ${y + 9}H${x + 5}M${x - 4} ${y + 13}H${x + 4}`} stroke={tone} strokeWidth={1.5} strokeLinecap="round" />
        <path d={`M${x - 3} ${y}L${x} ${y - 6}L${x + 3} ${y}`} fill="none" stroke={tone} strokeWidth={1} />
      </g>
    );
  }
  if (kind === "predict") {
    return (
      <g fill="none" strokeLinejoin="round">
        <path d={`M${x - 18} ${y + 10}L${x - 10} ${y + 4}L${x - 3} ${y + 8}L${x + 3} ${y - 1}`} stroke={tone} strokeWidth={1.75} />
        <path d={`M${x + 3} ${y - 1}L${x + 17} ${y - 13}`} stroke={SIGNAL} strokeWidth={1.75} strokeDasharray="3 2" />
        <circle cx={x + 3} cy={y - 1} r={2.5} fill={tone} />
      </g>
    );
  }
  if (kind === "chat") {
    return (
      <g>
        <rect x={x - 18} y={y - 14} width={22} height={14} rx={4} fill={PAPER} stroke={tone} strokeWidth={1.4} />
        <rect x={x - 4} y={y + 2} width={22} height={14} rx={4} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.4} />
      </g>
    );
  }
  return (
    <g>
      {[0, 45, 90, 135].map((a) => (
        <rect key={a} x={x - 3} y={y - 15} width={6} height={30} fill={tone} transform={`rotate(${a} ${x} ${y})`} />
      ))}
      <circle cx={x} cy={y} r={11} fill={PAPER} stroke={tone} strokeWidth={2} />
      <circle cx={x} cy={y} r={4} fill={PAPER} stroke={tone} strokeWidth={1.5} />
    </g>
  );
}

const AI_USES: { kind: AiUse; lines: string[] }[] = [
  { kind: "data", lines: ["DATA ANALYSIS"] },
  { kind: "insight", lines: ["CONSUMER", "INSIGHTS"] },
  { kind: "predict", lines: ["PREDICTIVE", "MODELING"] },
  { kind: "chat", lines: ["CHATBOTS"] },
  { kind: "auto", lines: ["AUTOMATED", "SYSTEMS"] },
];

/** AI at the hub; five uses in marketing around it. */
export function AiHub() {
  const cx = 400;
  const cy = 214;
  const nodes = AI_USES.map((u, i) => {
    const a = ((-90 + i * 72) * Math.PI) / 180;
    const ux = Math.cos(a);
    const uy = Math.sin(a);
    return { ...u, ux, uy, x: Math.round(cx + 236 * ux), y: Math.round(cy + 150 * uy) };
  });
  return (
    <Frame
      height={430}
      label="A hub and five spokes. At the hub, a chip marked AI. Arrows run out to five uses around it: data analysis, consumer insights, predictive modeling, chatbots and automated systems."
    >
      {nodes.map((n) => {
        const len = Math.hypot(n.x - cx, n.y - cy);
        const dx = (n.x - cx) / len;
        const dy = (n.y - cy) / len;
        return (
          <Arrow2
            key={n.kind}
            x1={Math.round(cx + dx * 60)}
            y1={Math.round(cy + dy * 60)}
            x2={Math.round(n.x - dx * 42)}
            y2={Math.round(n.y - dy * 42)}
            tone={SIGNAL}
            width={1.5}
          />
        );
      })}
      <circle cx={cx} cy={cy} r={54} fill={PAPER} stroke={SIGNAL} strokeWidth={1.5} strokeDasharray="4 4" />
      <Chip2 x={cx} y={cy} s={56} />
      {nodes.map((n, i) => {
        const side = i === 0 ? "top" : i === 1 ? "right" : i === 4 ? "left" : "bottom";
        const lx = side === "right" ? n.x + 48 : side === "left" ? n.x - 48 : n.x;
        const ly0 = side === "top" ? n.y - 48 - (n.lines.length - 1) * 14 : side === "bottom" ? n.y + 56 : n.y - (n.lines.length - 1) * 7 + 4;
        const anchor = side === "right" ? "start" : side === "left" ? "end" : "middle";
        return (
          <g key={n.kind}>
            <circle cx={n.x} cy={n.y} r={34} fill={PAPER} stroke={INK} strokeWidth={1.5} />
            <AiUseGlyph kind={n.kind} x={n.x} y={n.y} />
            {n.lines.map((l, j) => (
              <Key key={l} x={lx} y={ly0 + j * 14} anchor={anchor} fill={INK} size={10}>
                {l}
              </Key>
            ))}
          </g>
        );
      })}
    </Frame>
  );
}

/* ==========================================================================
   AI PERSONALIZATION AND ANALYTICS
   ========================================================================== */

const USER_SHAPES: ShapeKind[] = ["circle", "square", "triangle", "diamond"];

/** AI sends each user a different piece of content that matches that user's own mark. */
export function HyperPersonal() {
  const ys = [52, 116, 180, 244];
  return (
    <Frame
      height={290}
      label="An AI chip on the left sends content to four users on the right. Each user carries a different shape, and the content card travelling to each user carries that same shape."
    >
      <Key x={470} y={30} anchor="middle" fill={SIGNAL} size={9.5}>
        HYPER-PERSONALIZED CONTENT
      </Key>
      <Chip2 x={110} y={148} s={64} />
      {ys.map((y, i) => {
        const t = (470 - 156) / (626 - 156);
        const cardY = r2(148 + (y - 12 - 148) * t);
        return (
          <g key={y}>
            <Arrow2 x1={156} y1={148} x2={626} y2={y - 12} tone={SIGNAL} width={1.25} size={7} />
            <rect x={444} y={cardY - 15} width={52} height={30} fill={PAPER} stroke={SIGNAL} strokeWidth={1.5} />
            <Shape kind={USER_SHAPES[i]} x={460} y={cardY} r={7} tone={SIGNAL} fill={SIGNAL_TINT} />
            <line x1={474} y1={cardY - 4} x2={488} y2={cardY - 4} stroke={SIGNAL} strokeWidth={1.25} />
            <line x1={474} y1={cardY + 4} x2={484} y2={cardY + 4} stroke={SIGNAL} strokeWidth={1.25} />
            <Person3 x={652} y={y + 14} k={0.9} />
            <Shape kind={USER_SHAPES[i]} x={690} y={y - 4} r={9} tone={INK} fill={PAPER2} />
          </g>
        );
      })}
    </Frame>
  );
}

/** A repeating pattern of purchases up to now, continued as a dashed forecast. */
export function PredictPattern() {
  const base = 196;
  const now = 460;
  return (
    <Frame
      height={250}
      label="Shopping bags along a time line: small, small, large, repeating, up to a dashed line marked now. After it, the same pattern continues in dashed outline as the forecast of future buying patterns."
    >
      <Schematic />
      <line x1={40} y1={base} x2={764} y2={base} stroke={INK} strokeWidth={1.5} />
      <path d={headAlong1(770, base, 1, 0, 8)} fill="none" stroke={INK} strokeWidth={1.5} />
      <line x1={now} y1={46} x2={now} y2={206} stroke={SIGNAL} strokeWidth={1.5} strokeDasharray="5 4" />
      <Key x={now} y={36} anchor="middle" fill={SIGNAL} size={10}>
        NOW
      </Key>
      {Array.from({ length: 12 }, (_, i) => {
        const x = 70 + i * 60;
        const h = i % 3 === 2 ? 58 : 32;
        const future = x > now;
        const top = base - h;
        return (
          <g key={i}>
            <path
              d={`M${x - 6} ${top}Q${x - 6} ${top - 12} ${x} ${top - 12}Q${x + 6} ${top - 12} ${x + 6} ${top}`}
              fill="none"
              stroke={future ? SIGNAL : INK}
              strokeWidth={1.5}
              strokeDasharray={future ? "3 3" : undefined}
            />
            <rect
              x={x - 13}
              y={top}
              width={26}
              height={h}
              fill={future ? SIGNAL_TINT : PAPER2}
              stroke={future ? SIGNAL : INK}
              strokeWidth={1.5}
              strokeDasharray={future ? "4 3" : undefined}
            />
          </g>
        );
      })}
      <Key x={250} y={226} anchor="middle" fill={INK} size={9.5}>
        PAST BEHAVIOR
      </Key>
      <Key x={612} y={226} anchor="middle" fill={SIGNAL} size={9.5}>
        FUTURE BUYING PATTERNS
      </Key>
    </Frame>
  );
}

/** Spend moves, live, from the ads that are not working to the one that is. */
export function RealTimeSpend() {
  const rows = [
    { y: 64, n: 2, trend: "M236 72L276 70L316 74L356 76" },
    { y: 134, n: 7, trend: "M236 150L276 138L316 122L356 102" },
    { y: 204, n: 2, trend: "M236 208L276 212L316 210L356 216" },
  ];
  const layouts: (0 | 1 | 2)[] = [0, 1, 2];
  return (
    <Frame
      width={400}
      height={250}
      label="Three ads, each with its coin stack and a small results line. The middle ad's results climb; the other two stay flat. Curved arrows move coins from the top and bottom stacks into the middle one, under a live dot marked real-time."
    >
      <Key x={20} y={24} fill={INK} size={9.5}>
        AD SPEND
      </Key>
      <circle cx={294} cy={20} r={4.5} fill={SIGNAL} />
      <Key x={304} y={24} fill={SIGNAL} size={9.5}>
        REAL-TIME
      </Key>
      {rows.map((r, i) => (
        <g key={r.y}>
          <AdCard x={20} y={r.y - 22} w={66} h={44} layout={layouts[i]} tone={i === 1 ? SIGNAL : INK} />
          <Coins2 x={140} y={r.y + 18} n={r.n} w={32} tone={i === 1 ? SIGNAL : INK} fill={i === 1 ? SIGNAL_TINT : PAPER} />
          <path d={r.trend} fill="none" stroke={i === 1 ? SIGNAL : INK3} strokeWidth={1.75} strokeLinejoin="round" />
        </g>
      ))}
      <CurveArrow2 x1={162} y1={74} cx={206} cy={92} x2={166} y2={118} tone={SIGNAL} width={1.5} size={7} />
      <CurveArrow2 x1={162} y1={214} cx={206} cy={190} x2={166} y2={156} tone={SIGNAL} width={1.5} size={7} />
    </Frame>
  );
}

/** A personal profile, an open padlock and a watching eye. */
export function PrivacyConcern() {
  return (
    <Frame
      width={400}
      height={250}
      label="A personal data card with a face and lines of details. Beside it a padlock hangs open, and an eye looks on: data privacy."
    >
      <rect x={36} y={70} width={184} height={120} rx={6} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <circle cx={80} cy={116} r={20} fill={PAPER2} stroke={INK} strokeWidth={1.5} />
      <path d="M62 160Q80 140 98 160" fill={PAPER2} stroke={INK} strokeWidth={1.5} />
      {[100, 118, 136, 154].map((y, i) => (
        <line key={y} x1={116} y1={y} x2={i % 2 ? 180 : 202} y2={y} stroke={INK3} strokeWidth={2} />
      ))}
      <path d="M268 148V124Q268 106 286 106Q304 106 304 124V128" fill="none" stroke={COUNTER} strokeWidth={3} strokeLinecap="round" />
      <rect x={256} y={148} width={44} height={36} rx={4} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.75} />
      <circle cx={278} cy={163} r={3.5} fill={COUNTER} />
      <line x1={278} y1={166} x2={278} y2={174} stroke={COUNTER} strokeWidth={2} />
      <path d="M314 66Q344 40 374 66Q344 92 314 66Z" fill={PAPER} stroke={COUNTER} strokeWidth={1.5} />
      <circle cx={344} cy={66} r={8} fill={COUNTER} />
      <Key x={200} y={226} anchor="middle" fill={COUNTER} size={10}>
        DATA PRIVACY
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   SUSTAINABILITY AND PURPOSE-DRIVEN MARKETING
   ========================================================================== */

/** Three moments: the crowd at the leaf-marked pack grows, the crowd at the plain one shrinks. */
export function GreenPreference() {
  const panels = [
    { cx: 140, plain: 5, leaf: 1 },
    { cx: 400, plain: 3, leaf: 3 },
    { cx: 660, plain: 1, leaf: 5 },
  ];
  return (
    <Frame
      height={270}
      label="Three moments in time, left to right. In each, a plain pack and a pack with a leaf stand on a shelf with shoppers below them. Over time the shoppers at the plain pack drop from five to one and the shoppers at the leaf pack rise from one to five."
    >
      <Schematic />
      <line x1={270} y1={40} x2={270} y2={214} stroke={RULE} strokeWidth={1} />
      <line x1={530} y1={40} x2={530} y2={214} stroke={RULE} strokeWidth={1} />
      {panels.map((p) => (
        <g key={p.cx}>
          <line x1={p.cx - 96} y1={110} x2={p.cx + 96} y2={110} stroke={INK} strokeWidth={1.5} />
          <Pack4 x={p.cx - 46} y={110} w={38} h={48} />
          <Pack4 x={p.cx + 46} y={110} w={38} h={48} tone={SIGNAL} fill={SIGNAL_TINT} />
          <Leaf x={p.cx + 46} y={104} s={24} />
          {Array.from({ length: p.plain }, (_, j) => (
            <Person3 key={`p${j}`} x={Math.round(p.cx - 46 + (j - (p.plain - 1) / 2) * 17)} y={200} k={0.72} />
          ))}
          {Array.from({ length: p.leaf }, (_, j) => (
            <Person3
              key={`l${j}`}
              x={Math.round(p.cx + 46 + (j - (p.leaf - 1) / 2) * 17)}
              y={200}
              k={0.72}
              stroke={SIGNAL}
              fill={SIGNAL_TINT}
            />
          ))}
        </g>
      ))}
      <Arrow2 x1={40} y1={240} x2={760} y2={240} tone={INK3} width={1.5} />
    </Frame>
  );
}

/** Business goals and social impact converge on one target. */
export function AlignedGoals() {
  return (
    <Frame
      width={400}
      height={250}
      label="Two arrows, business goals and social impact, start apart and converge on the same target."
    >
      <Key x={30} y={80} fill={INK} size={9.5}>
        BUSINESS GOALS
      </Key>
      <CurveArrow2 x1={30} y1={94} cx={210} cy={94} x2={290} y2={118} tone={INK} width={2.25} size={9} />
      <Key x={30} y={186} fill={SIGNAL} size={9.5}>
        SOCIAL IMPACT
      </Key>
      <CurveArrow2 x1={30} y1={164} cx={210} cy={164} x2={290} y2={140} tone={SIGNAL} width={2.25} size={9} />
      <Target x={336} y={129} r={34} tone={SIGNAL} />
    </Frame>
  );
}

/** A leaf-labelled pack fronting a smoking factory; the brand's stars fall away. */
export function Greenwash() {
  return (
    <Frame
      width={400}
      height={250}
      label="A pack printed with a large leaf stands in front of a factory whose chimney pours smoke. An arrow leads to a row of five reputation stars, only two of them still filled: brand reputation."
    >
      <Factory3 x={176} y={216} k={1.3} />
      {[
        [192, 132, 7],
        [202, 114, 9],
        [216, 92, 11],
      ].map(([x, y, r]) => (
        <circle key={y} cx={x} cy={y} r={r} fill={PAPER2} stroke={INK3} strokeWidth={1.25} />
      ))}
      <Pack4 x={100} y={216} w={100} h={140} />
      <Leaf x={100} y={196} s={70} />
      <Arrow2 x1={222} y1={186} x2={262} y2={150} tone={COUNTER} width={1.75} size={8} />
      {[0, 1, 2, 3, 4].map((i) => (
        <Star3 key={i} x={258 + i * 28} y={124} r={12} fill={i < 2 ? COUNTER : PAPER} tone={i < 2 ? COUNTER : RULE2} />
      ))}
      <Key x={314} y={100} anchor="middle" fill={COUNTER} size={9}>
        BRAND REPUTATION
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   THE CIRCULAR ECONOMY
   ========================================================================== */

function Bin({ x, y, fillLevel = 0, overflow = false, tone = INK }: { x: number; y: number; fillLevel?: number; overflow?: boolean; tone?: string }) {
  return (
    <g strokeLinejoin="round">
      {overflow ? (
        <g>
          <Pack4 x={x - 12} y={y - 50} w={18} h={16} tone={tone} />
          <circle cx={x + 8} cy={y - 58} r={8} fill={PAPER} stroke={tone} strokeWidth={1.25} />
          <path d={`M${x - 4} ${y - 66}L${x + 4} ${y - 78}L${x + 12} ${y - 66}Z`} fill={PAPER} stroke={tone} strokeWidth={1.25} />
        </g>
      ) : null}
      <path d={`M${x - 22} ${y - 48}H${x + 22}L${x + 18} ${y}H${x - 18}Z`} fill={PAPER} stroke={tone} strokeWidth={1.5} />
      {fillLevel > 0 ? <rect x={x - 17} y={y - fillLevel - 1} width={34} height={fillLevel} fill={COUNTER_TINT} /> : null}
      <rect x={x - 26} y={y - 54} width={52} height={6} rx={2} fill={PAPER} stroke={tone} strokeWidth={1.5} />
      <path d={`M${x - 7} ${y - 38}V${y - 8}M${x + 7} ${y - 38}V${y - 8}`} stroke={RULE2} strokeWidth={1} />
    </g>
  );
}

/** Design, use and reuse around one loop; the waste bin beside it is nearly empty. */
export function ReuseLoop() {
  const cx = 400;
  const cy = 162;
  const R = 96;
  const angles = [-90, 30, 150];
  const pt = (deg: number, r = R) => {
    const a = (deg * Math.PI) / 180;
    return { x: r2(cx + r * Math.cos(a)), y: r2(cy + r * Math.sin(a)) };
  };
  return (
    <Frame
      height={300}
      label="A closed loop of three stations joined by clockwise arrows: design, use and reuse. A leaf sits in the middle of the loop. Off to the side stands a waste bin with almost nothing in it."
    >
      {angles.map((a) => {
        const s = pt(a + 24);
        const e = pt(a + 96);
        const t = ((a + 96) * Math.PI) / 180;
        return (
          <g key={a}>
            <path d={`M${s.x} ${s.y}A${R} ${R} 0 0 1 ${e.x} ${e.y}`} fill="none" stroke={SIGNAL} strokeWidth={2} />
            <path d={headAlong1(e.x, e.y, -Math.sin(t), Math.cos(t), 9)} fill="none" stroke={SIGNAL} strokeWidth={2} />
          </g>
        );
      })}
      <Leaf x={cx} y={cy + 20} s={40} />
      {angles.map((a, i) => {
        const p = pt(a);
        return (
          <g key={a}>
            <circle cx={p.x} cy={p.y} r={32} fill={PAPER} stroke={SIGNAL} strokeWidth={1.75} />
            {i === 0 ? <Pack4 x={p.x} y={p.y + 14} w={28} h={28} tone={SIGNAL} dash="3 2" /> : null}
            {i === 1 ? <Person3 x={p.x} y={p.y + 20} k={0.95} /> : null}
            {i === 2 ? <Pack4 x={p.x} y={p.y + 14} w={28} h={28} tone={SIGNAL} fill={SIGNAL_TINT} /> : null}
          </g>
        );
      })}
      <Key x={cx} y={26} anchor="middle" fill={SIGNAL} size={10}>
        DESIGN
      </Key>
      <Key x={pt(30).x + 44} y={pt(30).y + 4} fill={SIGNAL} size={10}>
        USE
      </Key>
      <Key x={pt(150).x - 44} y={pt(150).y + 4} anchor="end" fill={SIGNAL} size={10}>
        REUSE
      </Key>
      <Bin x={680} y={256} fillLevel={5} />
      <Key x={680} y={282} anchor="middle" size={9.5}>
        WASTE
      </Key>
    </Frame>
  );
}

/** Take, make, dispose in a straight line; a new arrow bends the end back to the start. */
export function TakeMakeDispose() {
  return (
    <Frame
      height={270}
      label="A straight line of three stations: take, shown as a tree; make, a factory; dispose, an overflowing bin. A curved arrow runs underneath from the bin back to the tree, bending the line into a loop."
    >
      <rect x={124} y={130} width={12} height={34} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <circle cx={130} cy={108} r={28} fill={PAPER2} stroke={INK} strokeWidth={1.5} />
      <Factory3 x={396} y={164} k={1.25} />
      <Bin x={640} y={164} overflow tone={COUNTER} />
      <Arrow2 x1={176} y1={142} x2={344} y2={142} tone={COUNTER} width={1.75} dash="6 4" />
      <Arrow2 x1={440} y1={142} x2={604} y2={142} tone={COUNTER} width={1.75} dash="6 4" />
      <Key x={130} y={190} anchor="middle" fill={INK} size={10}>
        TAKE
      </Key>
      <Key x={390} y={190} anchor="middle" fill={INK} size={10}>
        MAKE
      </Key>
      <Key x={640} y={190} anchor="middle" fill={COUNTER} size={10}>
        DISPOSE
      </Key>
      <CurveArrow2 x1={660} y1={204} cx={400} cy={300} x2={150} y2={206} tone={SIGNAL} width={2.25} size={10} />
    </Frame>
  );
}

/** A product's life drawn as a bar, lengthened by repair and then recycling. */
export function LifeExtended() {
  return (
    <Frame
      height={200}
      label="A bar for a product's life, then two more segments added to its end: repair, then recycling. A bracket under the added segments reads extended."
    >
      <Schematic />
      <rect x={60} y={80} width={320} height={36} fill={PAPER2} stroke={INK} strokeWidth={1.5} />
      <rect x={380} y={80} width={160} height={36} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
      <rect x={540} y={80} width={180} height={36} fill={SIGNAL} stroke={SIGNAL} strokeWidth={1.5} />
      <Key x={220} y={68} anchor="middle" fill={INK} size={10}>
        PRODUCT LIFE CYCLE
      </Key>
      <Key x={460} y={68} anchor="middle" fill={SIGNAL} size={10}>
        REPAIR
      </Key>
      <Key x={630} y={68} anchor="middle" fill={SIGNAL} size={10}>
        RECYCLING
      </Key>
      <path d="M380 128V138H720V128" fill="none" stroke={SIGNAL} strokeWidth={1.75} />
      <Key x={550} y={160} anchor="middle" fill={SIGNAL} size={10}>
        EXTENDED
      </Key>
    </Frame>
  );
}

/** Environmental impact: the take-make-dispose bar towers over the circular one. */
export function ImpactDown() {
  return (
    <Frame
      width={400}
      height={240}
      label="Environmental impact as two bars: a tall bar for take-make-dispose and a short bar for the circular model."
    >
      <Schematic x={392} />
      <Key x={200} y={40} anchor="middle" fill={INK} size={9.5}>
        ENVIRONMENTAL IMPACT
      </Key>
      <line x1={60} y1={196} x2={340} y2={196} stroke={INK} strokeWidth={1.5} />
      <rect x={90} y={60} width={80} height={136} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.5} />
      <rect x={230} y={150} width={80} height={46} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
      <Key x={130} y={218} anchor="middle" fill={COUNTER} size={8.5}>
        TAKE-MAKE-DISPOSE
      </Key>
      <Key x={270} y={218} anchor="middle" fill={SIGNAL} size={8.5}>
        CIRCULAR
      </Key>
    </Frame>
  );
}

/** Two new storefronts: a repair shop and a recycling business. */
export function Opportunities() {
  return (
    <Frame
      width={400}
      height={240}
      label="Two new storefronts under the words new business opportunities: one with a wrench above it for repair, one with circling arrows above it for recycling."
    >
      <Key x={200} y={32} anchor="middle" fill={SIGNAL} size={9.5}>
        NEW BUSINESS OPPORTUNITIES
      </Key>
      <Store2 x={120} y={196} k={1.4} tone={SIGNAL} fill={SIGNAL_TINT} />
      <Store2 x={280} y={196} k={1.4} tone={SIGNAL} fill={SIGNAL_TINT} />
      <g transform="rotate(45 120 98)">
        <rect x={116} y={100} width={8} height={30} rx={3} fill={PAPER} stroke={INK} strokeWidth={1.75} />
        <path d="M114 101Q106 96 106 86Q106 76 114 72V84H126V72Q134 76 134 86Q134 96 126 101Z" fill={PAPER} stroke={INK} strokeWidth={1.75} strokeLinejoin="round" />
      </g>
      {[0, 120, 240].map((a) => {
        const s = ((a - 70) * Math.PI) / 180;
        const e = ((a + 20) * Math.PI) / 180;
        const sx = r2(280 + 16 * Math.cos(s));
        const sy = r2(98 + 16 * Math.sin(s));
        const ex = r2(280 + 16 * Math.cos(e));
        const ey = r2(98 + 16 * Math.sin(e));
        return (
          <g key={a}>
            <path d={`M${sx} ${sy}A16 16 0 0 1 ${ex} ${ey}`} fill="none" stroke={INK} strokeWidth={1.75} />
            <path d={headAlong1(ex, ey, -Math.sin(e), Math.cos(e), 6)} fill="none" stroke={INK} strokeWidth={1.75} />
          </g>
        );
      })}
      <Key x={120} y={222} anchor="middle" fill={INK} size={9.5}>
        REPAIR
      </Key>
      <Key x={280} y={222} anchor="middle" fill={INK} size={9.5}>
        RECYCLING
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   IMMERSIVE EXPERIENCES: AR AND VR
   ========================================================================== */

function Sofa({
  x,
  y,
  k = 1,
  tone = INK,
  fill = PAPER,
  dash,
}: {
  x: number;
  y: number;
  k?: number;
  tone?: string;
  fill?: string;
  dash?: string;
}) {
  const X = (d: number) => r2(x + d * k);
  const Y = (d: number) => r2(y + d * k);
  const W = (d: number) => r2(d * k);
  return (
    <g strokeDasharray={dash} strokeLinejoin="round">
      <rect x={X(-54)} y={Y(-50)} width={W(108)} height={W(28)} rx={W(5)} fill={fill} stroke={tone} strokeWidth={1.5} />
      <rect x={X(-56)} y={Y(-24)} width={W(112)} height={W(16)} fill={fill} stroke={tone} strokeWidth={1.5} />
      <rect x={X(-66)} y={Y(-36)} width={W(14)} height={W(30)} rx={W(4)} fill={fill} stroke={tone} strokeWidth={1.5} />
      <rect x={X(52)} y={Y(-36)} width={W(14)} height={W(30)} rx={W(4)} fill={fill} stroke={tone} strokeWidth={1.5} />
      <path d={`M${X(-50)} ${Y(-6)}V${Y(0)}M${X(50)} ${Y(-6)}V${Y(0)}`} stroke={tone} strokeWidth={1.5} />
    </g>
  );
}

/** A phone held up in an empty room shows the sofa standing there. */
export function ArPreview() {
  return (
    <Frame
      width={400}
      height={260}
      label="An empty room with a dashed outline where a sofa could stand. A phone held up to the room shows the sofa, solid, in that very spot, before purchase."
    >
      <path d="M20 30V214H380" fill="none" stroke={INK} strokeWidth={1.5} />
      <rect x={60} y={56} width={54} height={66} fill={PAPER2} stroke={INK} strokeWidth={1.25} />
      <path d="M87 56V122M60 89H114" stroke={INK} strokeWidth={1} />
      <Sofa x={140} y={212} tone={INK3} dash="4 3" />
      <line x1={268} y1={112} x2={206} y2={160} stroke={RULE2} strokeWidth={1} strokeDasharray="3 3" />
      <line x1={268} y1={186} x2={206} y2={212} stroke={RULE2} strokeWidth={1} strokeDasharray="3 3" />
      <Phone3 x={300} y={150} k={1.6} />
      <line x1={275} y1={176} x2={325} y2={176} stroke={INK3} strokeWidth={1} />
      <Sofa x={300} y={176} k={0.34} tone={SIGNAL} fill={SIGNAL_TINT} />
      <Key x={200} y={244} anchor="middle" fill={SIGNAL} size={9.5}>
        BEFORE PURCHASE
      </Key>
    </Frame>
  );
}

/** A person in a headset, wholly surrounded by the brand's world. */
export function VrWorld() {
  const marks = Array.from({ length: 8 }, (_, i) => {
    const a = ((i * 45 + 22) * Math.PI) / 180;
    return { x: r2(200 + 150 * Math.cos(a)), y: r2(138 + 96 * Math.sin(a)) };
  });
  return (
    <Frame
      width={400}
      height={270}
      label="A person wearing a headset stands at the centre of a shaded oval world that surrounds them completely, its edge lined with the brand's seal all the way round."
    >
      <ellipse cx={200} cy={138} rx={180} ry={120} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
      <ellipse cx={200} cy={138} rx={150} ry={96} fill="none" stroke={SIGNAL} strokeWidth={1} strokeDasharray="3 4" />
      {marks.map((m) => (
        <Mark2 key={`${m.x}-${m.y}`} x={m.x} y={m.y} r={11} />
      ))}
      <Person3 x={200} y={200} k={1.8} />
      <rect x={185} y={144} width={30} height={11} rx={3} fill={INK} />
      <path d="M185 149Q174 149 176 140" fill="none" stroke={INK} strokeWidth={1.5} />
    </Frame>
  );
}

/** A bridge labelled AR and VR spans the gap between physical and digital. */
export function PhysicalDigitalBridge() {
  return (
    <Frame
      height={250}
      label="Two cliffs with a gap between. On the left cliff stands a store, labelled physical; on the right, a phone and a computer, labelled digital. A bridge whose two spans read AR and VR crosses the gap."
    >
      <path d="M0 150H236L216 250H0Z" fill={PAPER2} stroke={INK} strokeWidth={1.5} />
      <path d="M800 150H564L584 250H800Z" fill={PAPER2} stroke={INK} strokeWidth={1.5} />
      <Store2 x={120} y={150} k={1.4} />
      <Key x={120} y={186} anchor="middle" fill={INK} size={10}>
        PHYSICAL
      </Key>
      <Media kind="computer" x={660} y={126} />
      <Phone3 x={722} y={122} k={0.62} />
      <Key x={680} y={186} anchor="middle" fill={INK} size={10}>
        DIGITAL
      </Key>
      <path d="M236 150Q318 214 400 150Q482 214 564 150" fill="none" stroke={SIGNAL} strokeWidth={1.75} />
      {[268, 300, 336, 464, 500, 532].map((x) => {
        const local = x < 400 ? (x - 236) / 164 : (x - 400) / 164;
        const y = r2(150 + 2 * local * (1 - local) * 64);
        return <line key={x} x1={x} y1={150} x2={x} y2={y} stroke={SIGNAL} strokeWidth={1} />;
      })}
      <line x1={230} y1={150} x2={570} y2={150} stroke={SIGNAL} strokeWidth={4} />
      <Display x={318} y={136} anchor="middle" fill={SIGNAL} size={24}>
        AR
      </Display>
      <Display x={482} y={136} anchor="middle" fill={SIGNAL} size={24}>
        VR
      </Display>
    </Frame>
  );
}

/* ==========================================================================
   OMNICHANNEL AND SEAMLESS JOURNEYS
   ========================================================================== */

type Touch = "store" | "web" | "app" | "email" | "social" | "ad";

function TouchGlyph({ kind, x, y, tone = INK }: { kind: Touch; x: number; y: number; tone?: string }) {
  if (kind === "store") return <Store2 x={x} y={y + 14} k={0.62} tone={tone} />;
  if (kind === "app") return <Phone3 x={x} y={y} k={0.5} tone={tone} />;
  if (kind === "web") {
    return (
      <g>
        <rect x={x - 20} y={y - 14} width={40} height={28} rx={2} fill={PAPER} stroke={tone} strokeWidth={1.5} />
        <line x1={x - 20} y1={y - 7} x2={x + 20} y2={y - 7} stroke={tone} strokeWidth={1} />
        <circle cx={x - 16} cy={y - 10.5} r={1.3} fill={tone} />
        <circle cx={x - 12} cy={y - 10.5} r={1.3} fill={tone} />
        <rect x={x - 15} y={y - 2} width={14} height={11} fill={PAPER2} stroke={tone} strokeWidth={0.8} />
        <path d={`M${x + 2} ${y}H${x + 15}M${x + 2} ${y + 5}H${x + 12}`} stroke={tone} strokeWidth={1} />
      </g>
    );
  }
  if (kind === "email") {
    return (
      <g>
        <rect x={x - 19} y={y - 13} width={38} height={26} fill={PAPER} stroke={tone} strokeWidth={1.5} />
        <path d={`M${x - 19} ${y - 13}L${x} ${y + 2}L${x + 19} ${y - 13}`} fill="none" stroke={tone} strokeWidth={1.25} />
      </g>
    );
  }
  if (kind === "social") {
    return (
      <g>
        <Bubble3 x={x - 18} y={y - 15} w={30} h={20} tone={tone} />
        <circle cx={x + 10} cy={y + 8} r={7} fill={PAPER2} stroke={tone} strokeWidth={1.25} />
      </g>
    );
  }
  return (
    <g>
      <line x1={x} y1={y + 4} x2={x} y2={y + 16} stroke={tone} strokeWidth={1.5} />
      <AdCard x={x - 20} y={y - 14} w={40} h={20} layout={0} tone={tone} />
    </g>
  );
}

const TOUCHES: Touch[] = ["store", "web", "app", "email", "social", "ad"];

/** Six touchpoints around one customer, each bearing the same brand seal. */
export function UnifiedTouchpoints() {
  const cx = 400;
  const cy = 156;
  return (
    <Frame
      height={300}
      label="A customer at the centre of an oval ring of six touchpoints: a store, a website, an app, an email, a social post and a billboard. Every touchpoint carries the same brand seal."
    >
      <ellipse cx={cx} cy={cy} rx={300} ry={108} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <Person3 x={cx} y={cy + 34} k={2} />
      {TOUCHES.map((t, i) => {
        const a = ((-90 + i * 60) * Math.PI) / 180;
        const x = Math.round(cx + 300 * Math.cos(a));
        const y = Math.round(cy + 108 * Math.sin(a));
        return (
          <g key={t}>
            <circle cx={x} cy={y} r={32} fill={PAPER} stroke={SIGNAL} strokeWidth={1.5} />
            <TouchGlyph kind={t} x={x} y={y} />
            <Mark2 x={x + 24} y={y - 24} r={8} />
          </g>
        );
      })}
    </Frame>
  );
}

/** One unbroken path weaving between the online and offline lanes. */
export function SeamlessJourney() {
  return (
    <Frame
      height={250}
      label="Two lanes, online above and offline below. A single unbroken path weaves between them: from a phone online, to a store offline, to a computer online, to a store offline, and on to the customer."
    >
      <rect x={0} y={28} width={800} height={84} fill={PAPER2} />
      <line x1={0} y1={140} x2={800} y2={140} stroke={RULE} strokeWidth={1} />
      <line x1={0} y1={224} x2={800} y2={224} stroke={RULE} strokeWidth={1} />
      <Key x={16} y={48} fill={INK} size={10}>
        ONLINE
      </Key>
      <Key x={16} y={160} fill={INK} size={10}>
        OFFLINE
      </Key>
      <path d="M130 70C210 70 230 184 300 184S400 70 470 70S560 184 640 184H716" fill="none" stroke={SIGNAL} strokeWidth={2.5} />
      <path d={headAlong1(722, 184, 1, 0, 9)} fill="none" stroke={SIGNAL} strokeWidth={2.5} />
      <Phone3 x={130} y={70} k={0.6} />
      <Store2 x={300} y={206} />
      <Media kind="computer" x={470} y={72} />
      <Store2 x={640} y={206} />
      <Person3 x={752} y={206} />
    </Frame>
  );
}

/** Data from every touchpoint flows into one store of data and out as one journey. */
export function DataIntegration() {
  const inputs: { kind: Touch; y: number }[] = [
    { kind: "store", y: 46 },
    { kind: "app", y: 108 },
    { kind: "web", y: 170 },
    { kind: "email", y: 226 },
  ];
  return (
    <Frame
      height={270}
      label="Four touchpoints on the left, a store, an app, a website and an email, each send a line of data into one database. From it a single line runs right through four steps of the customer journey to the customer."
    >
      {inputs.map((p) => (
        <g key={p.kind}>
          <TouchGlyph kind={p.kind} x={84} y={p.y} />
          <CurveArrow2 x1={124} y1={p.y} cx={260} cy={p.y} x2={336} y2={136} tone={INK3} width={1.25} size={6} />
        </g>
      ))}
      <path d="M344 104V166A36 11 0 0 0 416 166V104" fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.75} />
      <ellipse cx={380} cy={104} rx={36} ry={11} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.75} />
      <path d="M344 126A36 11 0 0 0 416 126M344 146A36 11 0 0 0 416 146" fill="none" stroke={SIGNAL} strokeWidth={1} />
      <Key x={380} y={206} anchor="middle" fill={SIGNAL} size={9.5}>
        DATA INTEGRATION
      </Key>
      <Arrow2 x1={424} y1={136} x2={700} y2={136} tone={SIGNAL} width={2.25} size={9} />
      {[480, 540, 600, 660].map((x, i) => (
        <g key={x}>
          <circle cx={x} cy={136} r={9} fill={PAPER} stroke={SIGNAL} strokeWidth={1.75} />
          <text x={x} y={140} textAnchor="middle" fontFamily="var(--font-label)" fontSize={9} fontWeight={600} fill={SIGNAL}>
            {i + 1}
          </text>
        </g>
      ))}
      <Key x={570} y={112} anchor="middle" fill={SIGNAL} size={9.5}>
        CUSTOMER JOURNEY
      </Key>
      <Person3 x={740} y={156} k={1.1} />
    </Frame>
  );
}

/* ==========================================================================
   DISCUSSION: THE ETHICS OF HYPER-PERSONALIZATION
   ========================================================================== */

/** A baby-bottle ad on a phone; beside it, a scale from helpful to invasive with the line unset. */
export function WhereTheLine() {
  return (
    <Frame
      height={270}
      label="A phone showing an ad with a baby bottle. Beside it, a line running from helpful personalization to invasive surveillance, watched by an eye at the far end. A dashed divider stands on the line with a question mark over it."
    >
      <Phone3 x={120} y={140} k={1.9} />
      <rect x={112} y={112} width={16} height={8} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.25} />
      <path d="M115 112Q115 100 120 98Q125 100 125 112" fill={PAPER} stroke={SIGNAL} strokeWidth={1.25} />
      <rect x={110} y={120} width={20} height={40} rx={5} fill={PAPER} stroke={SIGNAL} strokeWidth={1.5} />
      <path d="M110 134H118M110 144H118" stroke={SIGNAL} strokeWidth={1} />
      <line x1={100} y1={172} x2={140} y2={172} stroke={INK3} strokeWidth={2} />
      <line x1={272} y1={160} x2={764} y2={160} stroke={INK} strokeWidth={2} />
      <circle cx={272} cy={160} r={7} fill={SIGNAL} />
      <circle cx={764} cy={160} r={7} fill={COUNTER} />
      <line x1={520} y1={112} x2={520} y2={186} stroke={INK} strokeWidth={1.75} strokeDasharray="5 4" />
      <Display x={520} y={100} anchor="middle" fill={INK} size={30}>
        ?
      </Display>
      <path d="M734 110Q754 92 774 110Q754 128 734 110Z" fill={PAPER} stroke={COUNTER} strokeWidth={1.5} />
      <circle cx={754} cy={110} r={6} fill={COUNTER} />
      <Key x={272} y={200} fill={SIGNAL} size={9.5}>
        HELPFUL PERSONALIZATION
      </Key>
      <Key x={764} y={200} anchor="end" fill={COUNTER} size={9.5}>
        INVASIVE SURVEILLANCE
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   CONCLUSION — small glyphs for the three takeaways
   ========================================================================== */

export function GlyphGlobal() {
  return (
    <GlyphFrame>
      <Globe x={25} y={30} r={19} width={1.4} />
      <Flag2 x={47} y={50} h={32} pattern="home" tone={SIGNAL} />
    </GlyphFrame>
  );
}

export function GlyphFuture() {
  return (
    <GlyphFrame>
      <Chip2 x={17} y={30} s={20} />
      <Leaf x={38} y={44} s={26} />
      <rect x={50} y={24} width={20} height={11} rx={3} fill={SIGNAL} />
      <path d="M50 29Q46 29 47 23" fill="none" stroke={SIGNAL} strokeWidth={1.25} />
    </GlyphFrame>
  );
}

export function GlyphBalance() {
  return (
    <GlyphFrame>
      <line x1={36} y1={10} x2={36} y2={50} stroke={INK} strokeWidth={1.5} />
      <line x1={24} y1={50} x2={48} y2={50} stroke={INK} strokeWidth={1.5} />
      <line x1={10} y1={16} x2={62} y2={16} stroke={INK} strokeWidth={1.5} />
      <path d="M10 16L4 32H16Z" fill="none" stroke={INK} strokeWidth={1.1} />
      <path d="M62 16L56 32H68Z" fill="none" stroke={INK} strokeWidth={1.1} />
      <path d="M2 32H18" stroke={INK} strokeWidth={1.5} />
      <path d="M54 32H70" stroke={INK} strokeWidth={1.5} />
      <rect x={5} y={24} width={10} height={8} fill={SIGNAL} />
      <circle cx={62} cy={28} r={4} fill={COUNTER} />
    </GlyphFrame>
  );
}
