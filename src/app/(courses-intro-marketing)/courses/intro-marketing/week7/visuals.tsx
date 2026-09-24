/* ==========================================================================
   Week 07 — figures
   --------------------------------------------------------------------------
   Hand-drawn SVG plates, one grammar per idea: seven kinds of offering, a
   problem turned into value, the four kinds of consumer goods, a cascade and
   a curve for the product life cycle, a window onto each stage, a three-way
   fork for decline, successive curves, an eight-step staircase for new
   product development, a package with its brand elements, a label and its
   callouts, a hub of service characteristics, a chain of satisfaction, and a
   plane with empty seats.

   Conventions carried over from earlier weeks:
     · viewBox width 800 (400 for column plates), flat fills, hairline rules,
       no shadows or gradients
     · INK carries the neutral case, SIGNAL the operative one, COUNTER the
       contrast or outward-looking state
     · every label reuses words from the slide the plate sits on
     · anything that implies a quantity the content does not give is marked
       SCHEMATIC
   ========================================================================== */

import React from "react";
import {
  COUNTER,
  COUNTER_TINT,
  Display,
  Frame,
  glyphProps,
  hash2,
  head2,
  headAlong1,
  INK,
  INK3,
  Key,
  Note,
  PAPER,
  PAPER2,
  RULE,
  RULE2,
  Schematic,
  SIGNAL,
  SIGNAL_TINT,
} from "../_visuals/kit";
import {
  Arrow1,
  Bottle1,
  Bulb1,
  Coins1,
  Head2,
  NS,
  Pack2,
  Person3,
  Star1,
} from "../_visuals/objects";

/* -- shared glyphs --------------------------------------------------------- */

type GlyphProps = { x: number; y: number; s?: number; tone?: string; fill?: string };

/** A tube of toothpaste. Centred on x, bottom at y. About 96 wide. */
function TubeGlyph({ x, y, s = 1, tone = INK, fill = PAPER }: GlyphProps) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} strokeLinejoin="round">
      <path d="M-48 -46 L32 -50 V-6 L-48 -10 Z" fill={fill} stroke={tone} strokeWidth={1.5} {...NS} />
      <path d="M-42 -44 V-12 M-36 -45 V-11" stroke={tone} strokeWidth={1} {...NS} />
      <path d="M-18 -36 H20 M-18 -20 H10" stroke={tone} strokeWidth={1} {...NS} />
      <rect x={32} y={-38} width={16} height={24} fill={tone} />
    </g>
  );
}

/** A sofa. Centred on x, feet at y. About 110 wide. */
function SofaGlyph({ x, y, s = 1, tone = INK, fill = PAPER }: GlyphProps) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-45} y={-56} width={90} height={28} rx={4} fill={fill} stroke={tone} strokeWidth={1.5} {...NS} />
      <rect x={-49} y={-30} width={98} height={18} fill={fill} stroke={tone} strokeWidth={1.5} {...NS} />
      <rect x={-55} y={-44} width={12} height={34} rx={3} fill={fill} stroke={tone} strokeWidth={1.5} {...NS} />
      <rect x={43} y={-44} width={12} height={34} rx={3} fill={fill} stroke={tone} strokeWidth={1.5} {...NS} />
      <path d="M-46 -10 V0 M46 -10 V0 M0 -56 V-30" stroke={tone} strokeWidth={1.5} {...NS} />
    </g>
  );
}

/** A luxury car. Centred on x, wheels on y. About 110 wide. */
function CarGlyph({ x, y, s = 1, tone = INK, fill = PAPER }: GlyphProps) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} strokeLinejoin="round">
      <path d="M-56 -12 V-26 Q-54 -34 -40 -36 L-20 -52 H22 L42 -36 Q56 -34 56 -24 V-12 Z" fill={fill} stroke={tone} strokeWidth={1.5} {...NS} />
      <path d="M-14 -48 H18 L32 -36 H-28 Z" fill="none" stroke={tone} strokeWidth={1} {...NS} />
      <circle cx={-32} cy={-9} r={9} fill={PAPER} stroke={tone} strokeWidth={1.5} {...NS} />
      <circle cx={34} cy={-9} r={9} fill={PAPER} stroke={tone} strokeWidth={1.5} {...NS} />
    </g>
  );
}

/** A life insurance policy: a document with an umbrella. Centred on x, bottom at y. */
function PolicyGlyph({ x, y, s = 1, tone = INK, fill = PAPER }: GlyphProps) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} strokeLinejoin="round">
      <path d="M-30 0 V-70 H18 L30 -58 V0 Z" fill={fill} stroke={tone} strokeWidth={1.5} {...NS} />
      <path d="M18 -70 V-58 H30" fill="none" stroke={tone} strokeWidth={1} {...NS} />
      <path d="M-16 -40 A16 16 0 0 1 16 -40 Z" fill={tone} />
      <path d="M0 -40 V-28 Q0 -24 -4 -26" fill="none" stroke={tone} strokeWidth={1.25} {...NS} />
      <path d="M-20 -16 H20 M-20 -8 H12" stroke={tone} strokeWidth={1} {...NS} />
    </g>
  );
}

/* ==========================================================================
   1 · SEVEN KINDS OF OFFERING — anything offered to a market
   ========================================================================== */

export function OfferingKinds() {
  const cols = [60, 173, 286, 399, 512, 625, 738];
  const names = [
    ["PHYSICAL", "OBJECTS"],
    ["SERVICES"],
    ["EVENTS"],
    ["PERSONS"],
    ["PLACES"],
    ["ORGANIZATIONS"],
    ["IDEAS"],
  ];
  const chips = ["ATTENTION", "ACQUISITION", "USE", "CONSUMPTION"];
  return (
    <Frame height={296} label="Seven kinds of product in a row: physical objects, services, events, persons, places, organizations, and ideas. A bracket gathers them and an arrow leads down to a market, where each can be offered for attention, acquisition, use, or consumption.">
      <Key x={400} y={28} anchor="middle" fill={SIGNAL} size={10.5}>
        ANYTHING THAT CAN BE OFFERED
      </Key>

      {/* physical object */}
      <g strokeLinejoin="round">
        <rect x={38} y={72} width={40} height={40} fill={PAPER} stroke={INK} strokeWidth={1.5} />
        <path d="M38 72 L50 60 H90 L78 72 Z M78 72 L90 60 V100 L78 112" fill={PAPER2} stroke={INK} strokeWidth={1.5} />
      </g>
      {/* service: a bell */}
      <path d={`M${cols[1] - 24} 104 A24 24 0 0 1 ${cols[1] + 24} 104 Z`} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <rect x={cols[1] - 32} y={104} width={64} height={7} fill={INK} />
      <path d={`M${cols[1]} 80 V72 M${cols[1] - 7} 72 H${cols[1] + 7}`} stroke={INK} strokeWidth={1.75} />
      {/* event: a ticket */}
      <g>
        <rect x={cols[2] - 30} y={70} width={60} height={36} fill={PAPER} stroke={INK} strokeWidth={1.5} />
        <circle cx={cols[2] - 30} cy={88} r={6} fill={PAPER} stroke={INK} strokeWidth={1.5} />
        <circle cx={cols[2] + 30} cy={88} r={6} fill={PAPER} stroke={INK} strokeWidth={1.5} />
        <rect x={cols[2] - 37} y={80} width={6.25} height={16} fill={PAPER} />
        <rect x={cols[2] + 31} y={80} width={6.25} height={16} fill={PAPER} />
        <line x1={cols[2] + 12} y1={72} x2={cols[2] + 12} y2={104} stroke={INK3} strokeWidth={1} strokeDasharray="3 3" />
        <Star1 x={cols[2] - 6} y={88} k={0.5} fill={INK} />
      </g>
      {/* person */}
      <Person3 x={cols[3]} y={112} k={1.4} />
      {/* place: a pin */}
      <path d={`M${cols[4]} 112 C${cols[4] - 10} 99 ${cols[4] - 18} 90 ${cols[4] - 18} 80 A18 18 0 0 1 ${cols[4] + 18} 80 C${cols[4] + 18} 90 ${cols[4] + 10} 99 ${cols[4]} 112 Z`} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <circle cx={cols[4]} cy={80} r={6} fill={INK} />
      {/* organization: a building */}
      <g strokeLinejoin="round">
        <path d={`M${cols[5] - 28} 70 L${cols[5]} 54 L${cols[5] + 28} 70 Z`} fill={PAPER} stroke={INK} strokeWidth={1.5} />
        <rect x={cols[5] - 24} y={70} width={48} height={42} fill={PAPER} stroke={INK} strokeWidth={1.5} />
        <path d={`M${cols[5] - 12} 76 V106 M${cols[5]} 76 V106 M${cols[5] + 12} 76 V106`} stroke={INK} strokeWidth={1.5} />
      </g>
      {/* idea: a bulb */}
      <circle cx={cols[6]} cy={78} r={18} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <path d={`M${cols[6] - 8} 94 V106 H${cols[6] + 8} V94 M${cols[6] - 8} 100 H${cols[6] + 8}`} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <path d={`M${cols[6] - 6} 84 L${cols[6] - 2} 72 L${cols[6] + 2} 82 L${cols[6] + 6} 70`} fill="none" stroke={INK} strokeWidth={1.25} />

      {names.map((n, i) =>
        n.map((line, j) => (
          <Key key={line} x={cols[i]} y={(n.length === 1 ? 150 : 143) + j * 14} anchor="middle" fill={INK} size={9.5}>
            {line}
          </Key>
        )),
      )}

      <path d="M24 170 V178 H776 V170" fill="none" stroke={INK} strokeWidth={1.25} />
      <Arrow1 x1={400} y1={178} x2={400} y2={212} tone={INK} />

      <rect x={24} y={220} width={752} height={60} fill={PAPER2} stroke={INK} strokeWidth={1.25} />
      <Key x={44} y={254} fill={INK} size={10.5}>
        A MARKET
      </Key>
      {chips.map((c, i) => {
        const cx = 250 + i * 146;
        return (
          <g key={c}>
            <rect x={cx - 64} y={235} width={128} height={30} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.25} />
            <Key x={cx} y={254} anchor="middle" fill={SIGNAL} size={9.5}>
              {c}
            </Key>
          </g>
        );
      })}
    </Frame>
  );
}

/* ==========================================================================
   2 · PROBLEM TO VALUE — products solve problems and deliver value (400)
   ========================================================================== */

export function ProblemValue() {
  return (
    <Frame width={400} height={190} label="Three figures in a row. A consumer with a tangled problem above their head; a product; the same consumer with a star above them: value.">
      <path d="M52 50 C60 30 84 30 88 46 C92 62 62 66 60 50 C58 36 82 34 84 52 C86 66 54 64 54 46" fill="none" stroke={INK3} strokeWidth={1.5} />
      <Person3 x={70} y={140} k={1.6} stroke={INK3} />
      <Arrow1 x1={108} y1={112} x2={152} y2={112} />
      <Pack2 x={200} y={140} w={56} h={52} tone={SIGNAL} fill={SIGNAL_TINT} />
      <Arrow1 x1={248} y1={112} x2={292} y2={112} />
      <Star1 x={330} y={50} k={1} fill={COUNTER} />
      <Person3 x={330} y={140} k={1.6} stroke={COUNTER} />
      <Key x={70} y={174} anchor="middle" fill={INK3} size={9.5}>
        PROBLEM
      </Key>
      <Key x={200} y={174} anchor="middle" fill={SIGNAL} size={9.5}>
        PRODUCT
      </Key>
      <Key x={330} y={174} anchor="middle" fill={COUNTER} size={9.5}>
        VALUE
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   3 · CONSUMER GOODS — bought by final consumers for personal use (400)
   ========================================================================== */

export function FinalConsumer() {
  return (
    <Frame width={400} height={196} label="A shop, then a person carrying a bag away from it, then a house with the product inside: bought by final consumers for personal consumption.">
      <g strokeLinejoin="round">
        <rect x={30} y={70} width={100} height={84} fill={PAPER} stroke={INK} strokeWidth={1.5} />
        <path d="M24 70 L36 44 H124 L136 70 Z" fill={PAPER2} stroke={INK} strokeWidth={1.5} />
        <path d="M58 44 L54 70 M80 44 V70 M102 44 L106 70" stroke={INK} strokeWidth={1} />
        <rect x={66} y={112} width={28} height={42} fill={PAPER} stroke={INK} strokeWidth={1.25} />
      </g>
      <Arrow1 x1={142} y1={120} x2={176} y2={120} tone={INK3} />
      <Person3 x={200} y={154} k={1.8} />
      <Pack2 x={226} y={148} w={18} h={22} tone={SIGNAL} fill={SIGNAL_TINT} />
      <Arrow1 x1={244} y1={120} x2={280} y2={120} tone={INK3} />
      <path d="M292 154 V100 L332 66 L372 100 V154 Z" fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.5} strokeLinejoin="round" />
      <Pack2 x={332} y={154} w={30} h={30} tone={SIGNAL} fill={SIGNAL_TINT} />
      <Key x={200} y={180} anchor="middle" fill={INK} size={9}>
        FINAL CONSUMERS
      </Key>
      <Key x={332} y={180} anchor="middle" fill={COUNTER} size={9}>
        PERSONAL
      </Key>
      <Key x={332} y={193} anchor="middle" fill={COUNTER} size={9}>
        CONSUMPTION
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   4 · CONVENIENCE GOODS — frequent, minimal comparison (400)
   ========================================================================== */

export function ConvenienceGood() {
  return (
    <Frame width={400} height={262} label="Toothpaste. Along a line, fifteen small tubes in a row: purchased frequently. Below, one tube goes straight into a basket: minimal comparison.">
      <TubeGlyph x={200} y={96} s={1.2} />
      <Key x={20} y={124} fill={INK} size={9.5}>
        PURCHASED FREQUENTLY
      </Key>
      {Array.from({ length: 15 }, (_, i) => (
        <rect key={i} x={24 + i * 24} y={136} width={10} height={18} rx={2} fill={SIGNAL} />
      ))}
      <line x1={16} y1={154.5} x2={384} y2={154.5} stroke={INK} strokeWidth={1.25} />

      <Key x={20} y={190} fill={INK} size={9.5}>
        MINIMAL COMPARISON
      </Key>
      <TubeGlyph x={80} y={250} s={0.6} />
      <Arrow1 x1={126} y1={232} x2={250} y2={232} tone={SIGNAL} width={1.75} />
      <path d="M264 214 H344 L334 250 H274 Z" fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} strokeLinejoin="round" />
      <path d="M278 214 Q304 190 330 214" fill="none" stroke={SIGNAL} strokeWidth={1.5} />
    </Frame>
  );
}

/* ==========================================================================
   5 · SHOPPING GOODS — planning and comparison (400)
   ========================================================================== */

export function ShoppingGood() {
  const rows = [
    { name: "QUALITY", a: 210, b: 330 },
    { name: "PRICE", a: 320, b: 190 },
    { name: "STYLE", a: 170, b: 350 },
  ];
  return (
    <Frame width={400} height={262} label="Two sofas side by side, one in ink and one in teal. Below, three comparison rows, quality, price, and style, each with a dot for each sofa at a different place.">
      <SofaGlyph x={118} y={96} s={1.05} />
      <SofaGlyph x={282} y={96} s={1.05} tone={COUNTER} fill={COUNTER_TINT} />
      <Key x={20} y={124} fill={INK} size={9.5}>
        MORE PLANNING AND COMPARISON
      </Key>
      {rows.map((r, i) => {
        const y = 160 + i * 36;
        return (
          <g key={r.name}>
            <Key x={20} y={y + 4} fill={INK3} size={9}>
              {r.name}
            </Key>
            <line x1={110} y1={y} x2={384} y2={y} stroke={RULE2} strokeWidth={1} />
            <line x1={r.a} y1={y} x2={r.b} y2={y} stroke={INK3} strokeWidth={1} strokeDasharray="2 3" />
            <circle cx={r.a} cy={y} r={6} fill={INK} />
            <circle cx={r.b} cy={y} r={6} fill={COUNTER} />
          </g>
        );
      })}
    </Frame>
  );
}

/* ==========================================================================
   6 · SPECIALTY GOODS — a long way to one particular car (400)
   ========================================================================== */

export function SpecialtyGood() {
  return (
    <Frame width={400} height={256} label="A buyer at the bottom left. A long winding path leads up to a single luxury car marked with a star: special purchase effort.">
      <Person3 x={46} y={216} k={1.5} />
      <path d="M62 196 C150 250 150 120 220 170 C280 212 260 120 318 142" fill="none" stroke={SIGNAL} strokeWidth={1.75} strokeDasharray="6 5" />
      <path d={headAlong1(320, 143, 8, 3, 9)} fill="none" stroke={SIGNAL} strokeWidth={1.75} />
      <CarGlyph x={320} y={124} s={1.05} tone={SIGNAL} fill={SIGNAL_TINT} />
      <Star1 x={320} y={46} k={0.8} />
      <Key x={200} y={246} anchor="middle" fill={SIGNAL} size={9.5}>
        SPECIAL PURCHASE EFFORT
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   7 · UNSOUGHT GOODS — not in the buyer's thoughts (400)
   ========================================================================== */

export function UnsoughtGood() {
  return (
    <Frame width={400} height={256} label="A consumer thinking about a coffee, a phone, and a shopping bag. Outside the thought bubble, faint and dashed, a life insurance policy: products consumers do not normally think of buying.">
      <ellipse cx={112} cy={84} rx={96} ry={54} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <circle cx={118} cy={150} r={5} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <circle cx={112} cy={164} r={3.5} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      {/* cup */}
      <path d="M44 72 H76 L72 108 H48 Z M76 80 Q88 82 86 92 Q84 100 74 100" fill={PAPER} stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
      {/* phone */}
      <rect x={102} y={58} width={24} height={50} rx={4} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <line x1={110} y1={64} x2={118} y2={64} stroke={INK} strokeWidth={1.25} />
      {/* bag */}
      <path d="M144 76 H184 L180 110 H148 Z" fill={PAPER} stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
      <path d="M154 76 Q164 58 174 76" fill="none" stroke={INK} strokeWidth={1.5} />
      <Person3 x={112} y={236} k={1.8} />

      <g strokeDasharray="4 4" opacity={0.85}>
        <PolicyGlyph x={316} y={176} s={1.25} tone={SIGNAL} fill={PAPER} />
      </g>
      <Key x={316} y={200} anchor="middle" fill={SIGNAL} size={9.5}>
        LIFE INSURANCE
      </Key>
      <Key x={316} y={226} anchor="middle" fill={INK3} size={9}>
        DO NOT NORMALLY
      </Key>
      <Key x={316} y={240} anchor="middle" fill={INK3} size={9}>
        THINK OF BUYING
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   8 · FOUR CATEGORIES — each with its own marketing and pricing
   ========================================================================== */

function Megaphone({ x, y, waves, tone }: { x: number; y: number; waves: number; tone: string }) {
  return (
    <g strokeLinejoin="round">
      <path d={`M${x - 26} ${y - 6} H${x - 14} L${x + 6} ${y - 18} V${y + 18} L${x - 14} ${y + 6} H${x - 26} Z`} fill={PAPER} stroke={tone} strokeWidth={1.5} />
      {Array.from({ length: waves }, (_, i) => {
        const r = 10 + i * 7;
        return <path key={i} d={`M${x + 10 + i * 7} ${y - r * 0.8} Q${x + 10 + i * 7 + r * 0.5} ${y} ${x + 10 + i * 7} ${y + r * 0.8}`} fill="none" stroke={tone} strokeWidth={1.5} />;
      })}
    </g>
  );
}

function PriceTag({ x, y, tone, variant }: { x: number; y: number; tone: string; variant: number }) {
  const hole =
    variant === 0 ? (
      <circle cx={x - 20} cy={y} r={4} fill={tone} />
    ) : variant === 1 ? (
      <rect x={x - 24} y={y - 4} width={8} height={8} fill={tone} />
    ) : variant === 2 ? (
      <path d={`M${x - 20} ${y - 5} L${x - 15} ${y + 4} H${x - 25} Z`} fill={tone} />
    ) : (
      <path d={`M${x - 20} ${y - 6} L${x - 15} ${y} L${x - 20} ${y + 6} L${x - 25} ${y} Z`} fill={tone} />
    );
  return (
    <g>
      <path d={`M${x - 34} ${y} L${x - 20} ${y - 16} H${x + 30} V${y + 16} H${x - 20} Z`} fill={PAPER} stroke={tone} strokeWidth={1.5} strokeLinejoin="round" />
      {hole}
      <path d={`M${x - 6} ${y - 5} H${x + 20} M${x - 6} ${y + 5} H${x + 12}`} stroke={tone} strokeWidth={1.25} />
    </g>
  );
}

export function FourCategories() {
  const cols = [
    { x: 250, a: "CONVENIENCE", tone: INK, glyph: <TubeGlyph x={250} y={92} s={0.9} /> },
    { x: 400, a: "SHOPPING", tone: COUNTER, glyph: <SofaGlyph x={400} y={92} s={0.85} tone={COUNTER} /> },
    { x: 550, a: "SPECIALTY", tone: SIGNAL, glyph: <CarGlyph x={550} y={92} s={0.9} tone={SIGNAL} /> },
    { x: 700, a: "UNSOUGHT", tone: INK3, glyph: <PolicyGlyph x={700} y={92} s={0.9} tone={INK3} /> },
  ];
  return (
    <Frame height={262} label="Four columns: convenience goods, shopping goods, specialty goods, and unsought goods. Under each sits its own megaphone for marketing and its own price tag for pricing, each drawn differently: a distinct marketing and pricing strategy.">
      {[325, 475, 625].map((x) => (
        <line key={x} x1={x} y1={20} x2={x} y2={250} stroke={RULE} strokeWidth={1} />
      ))}
      <line x1={20} y1={144} x2={780} y2={144} stroke={RULE} strokeWidth={1} />
      <line x1={20} y1={200} x2={780} y2={200} stroke={RULE} strokeWidth={1} />
      <Key x={20} y={176} fill={INK} size={9.5}>
        MARKETING
      </Key>
      <Key x={20} y={232} fill={INK} size={9.5}>
        PRICING
      </Key>
      {cols.map((c, i) => (
        <g key={c.a}>
          {c.glyph}
          <Key x={c.x} y={116} anchor="middle" fill={c.tone} size={9.5}>
            {c.a}
          </Key>
          <Key x={c.x} y={130} anchor="middle" fill={c.tone} size={9.5}>
            GOODS
          </Key>
          <Megaphone x={c.x - 8} y={172} waves={i + 1} tone={c.tone} />
          <PriceTag x={c.x + 2} y={228} tone={c.tone} variant={i} />
        </g>
      ))}
    </Frame>
  );
}

/* ==========================================================================
   9 · PLC CASCADE — five stages, each flowing into the next
   ========================================================================== */

export const PLC_STAGES = ["DEVELOPMENT", "INTRODUCTION", "GROWTH", "MATURITY", "DECLINE"];

export function PlcCascade() {
  return (
    <Frame height={236} label="A cascading flow of five boxes stepping down to the right: development, introduction, growth, maturity, and decline.">
      {PLC_STAGES.map((s, i) => {
        const x = 20 + i * 142;
        const y = 16 + i * 42;
        return (
          <g key={s}>
            <rect x={x} y={y} width={196} height={40} fill={i === 0 ? PAPER2 : PAPER} stroke={INK} strokeWidth={1.5} />
            <rect x={x} y={y} width={5} height={40} fill={SIGNAL} />
            <Display x={x + 18} y={y + 27} fill={SIGNAL} size={17}>
              {`0${i + 1}`}
            </Display>
            <Key x={x + 50} y={y + 25} fill={INK} size={10}>
              {s}
            </Key>
            {i < PLC_STAGES.length - 1 ? (
              <g>
                <path d={`M${x + 32} ${y + 40} V${y + 62} H${x + 140}`} fill="none" stroke={INK3} strokeWidth={1.25} />
                <path d={head2.right(x + 141, y + 62)} fill="none" stroke={INK3} strokeWidth={1.25} />
              </g>
            ) : null}
          </g>
        );
      })}
    </Frame>
  );
}

/* ==========================================================================
   10 · PLC CURVE — sales and profits over a product's lifetime
   ========================================================================== */

const PLC_BOUNDS = [80, 180, 300, 450, 640, 760];
const SALES_PATH = "M80 220 H180 C230 218 270 205 300 180 C360 130 400 80 470 66 C540 56 600 58 640 76 C690 100 730 140 760 170";
const PROFIT_PATH = "M80 220 C120 232 160 250 190 256 C240 262 280 240 320 212 C370 170 420 130 470 120 C530 112 590 128 640 150 C690 172 730 200 760 214";

export function PlcCurve() {
  return (
    <Frame height={330} label="The product life cycle as a schematic chart over time. A sales curve stays at zero through development, rises slowly in introduction, fast in growth, flattens in maturity, and falls in decline. A profits curve dips below zero through development and introduction, rises in growth, levels off in maturity, and drops in decline.">
      <Schematic x={792} y={16} />
      {PLC_BOUNDS.slice(1, -1).map((x) => (
        <line key={x} x1={x} y1={42} x2={x} y2={290} stroke={RULE2} strokeWidth={1} strokeDasharray="3 4" />
      ))}
      {PLC_STAGES.map((s, i) => (
        <Key key={s} x={(PLC_BOUNDS[i] + PLC_BOUNDS[i + 1]) / 2} y={36} anchor="middle" fill={INK} size={9}>
          {s}
        </Key>
      ))}
      <rect x={80} y={220} width={220} height={70} fill={SIGNAL_TINT} />
      <line x1={80} y1={220} x2={764} y2={220} stroke={INK3} strokeWidth={1} />
      <Key x={72} y={224} anchor="end" fill={INK3} size={9}>
        0
      </Key>
      <line x1={80} y1={42} x2={80} y2={290} stroke={INK3} strokeWidth={1.25} />
      <line x1={80} y1={300} x2={764} y2={300} stroke={INK3} strokeWidth={1.25} />
      <path d={head2.right(766, 300)} fill="none" stroke={INK3} strokeWidth={1.25} />
      <Key x={764} y={320} anchor="end" fill={INK3} size={9}>
        TIME
      </Key>

      <path d={SALES_PATH} fill="none" stroke={INK} strokeWidth={2.5} />
      <path d={PROFIT_PATH} fill="none" stroke={SIGNAL} strokeWidth={2.5} />
      <Key x={722} y={110} fill={INK} size={10.5}>
        SALES
      </Key>
      <Key x={545} y={150} anchor="middle" fill={SIGNAL} size={10.5}>
        PROFITS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   11 · NOT STRICTLY — the cycle as a framework, other shapes exist (400)
   ========================================================================== */

export function NotStrict() {
  return (
    <Frame width={400} height={214} label="A dashed life cycle curve, labelled a useful framework, and two solid curves with other shapes: one rises and holds, one rises and falls quickly. Not all products follow this cycle strictly.">
      <Schematic x={392} y={16} />
      <line x1={30} y1={24} x2={62} y2={24} stroke={INK3} strokeWidth={1.75} strokeDasharray="5 4" />
      <Key x={72} y={28} fill={INK3} size={9}>
        USEFUL FRAMEWORK
      </Key>
      <line x1={30} y1={44} x2={46} y2={44} stroke={SIGNAL} strokeWidth={2} />
      <line x1={48} y1={44} x2={62} y2={44} stroke={COUNTER} strokeWidth={2} />
      <Key x={72} y={48} fill={INK} size={9}>
        NOT ALL PRODUCTS FOLLOW IT STRICTLY
      </Key>

      <line x1={30} y1={196} x2={382} y2={196} stroke={INK3} strokeWidth={1.25} />
      <path d="M30 196 C90 194 120 146 170 106 C220 76 270 86 310 126 C340 156 360 176 380 186" fill="none" stroke={INK3} strokeWidth={1.75} strokeDasharray="5 4" />
      <path d="M30 196 C80 194 110 116 170 96 H380" fill="none" stroke={COUNTER} strokeWidth={2} />
      <path d="M30 196 C60 196 70 70 100 70 C130 70 140 196 180 196" fill="none" stroke={SIGNAL} strokeWidth={2} />
    </Frame>
  );
}

/* ==========================================================================
   12 · STAGE WINDOW — the life cycle with one stage lit (400)
   ========================================================================== */

const STAGE_NOTES: Record<number, [string, string]> = {
  1: ["SALES ARE SLOW", "PROFITS ARE NONEXISTENT"],
  2: ["RAPID MARKET ACCEPTANCE", "INCREASING PROFITS"],
  3: ["SLOWDOWN IN SALES GROWTH", "PROFITS LEVEL OFF OR DECLINE"],
  4: ["SALES FALL OFF", "PROFITS DROP"],
};

export function StageWindow({ stage }: { stage: 1 | 2 | 3 | 4 }) {
  const sx = (x: number) => Math.round((20 + (x - 80) * (360 / 680)) * 100) / 100;
  const x0 = sx(PLC_BOUNDS[stage]);
  const x1 = sx(PLC_BOUNDS[stage + 1]);
  const clip = `w7-stage-${stage}`;
  const plot = "translate(20 40) scale(0.5294 0.55) translate(-80 -40)";
  const [sales, profits] = STAGE_NOTES[stage];
  return (
    <Frame width={400} height={230} label={`The product life cycle in miniature with the ${PLC_STAGES[stage].toLowerCase()} stage lit. Sales: ${sales.toLowerCase()}. Profits: ${profits.toLowerCase()}.`}>
      <defs>
        <clipPath id={clip}>
          <rect x={x0} y={30} width={x1 - x0} height={150} />
        </clipPath>
      </defs>
      <rect x={x0} y={30} width={x1 - x0} height={150} fill={SIGNAL_TINT} />
      {PLC_BOUNDS.slice(1, -1).map((x) => (
        <line key={x} x1={sx(x)} y1={30} x2={sx(x)} y2={180} stroke={RULE2} strokeWidth={1} strokeDasharray="3 4" />
      ))}
      <Key x={(x0 + x1) / 2} y={22} anchor="middle" fill={SIGNAL} size={9.5}>
        {PLC_STAGES[stage]}
      </Key>
      <line x1={20} y1={139} x2={382} y2={139} stroke={INK3} strokeWidth={1} />

      <g transform={plot}>
        <path d={SALES_PATH} fill="none" stroke={RULE2} strokeWidth={1.5} {...NS} />
        <path d={PROFIT_PATH} fill="none" stroke={RULE2} strokeWidth={1.5} {...NS} />
      </g>
      <g clipPath={`url(#${clip})`}>
        <g transform={plot}>
          <path d={SALES_PATH} fill="none" stroke={INK} strokeWidth={3} {...NS} />
          <path d={PROFIT_PATH} fill="none" stroke={SIGNAL} strokeWidth={3} {...NS} />
        </g>
      </g>

      <line x1={20} y1={200} x2={44} y2={200} stroke={INK} strokeWidth={3} />
      <Key x={54} y={204} fill={INK} size={9}>
        {sales}
      </Key>
      <line x1={20} y1={220} x2={44} y2={220} stroke={SIGNAL} strokeWidth={3} />
      <Key x={54} y={224} fill={SIGNAL} size={9}>
        {profits}
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   13 · AWARENESS AND TRIAL — the introduction goal (400)
   ========================================================================== */

export function AwarenessTrial() {
  return (
    <Frame width={400} height={196} label="A new product, then an eye that sees it: product awareness. Then a person holding it: trial.">
      <Pack2 x={60} y={130} w={60} h={58} tone={SIGNAL} fill={SIGNAL_TINT} />
      <Arrow1 x1={100} y1={100} x2={140} y2={100} tone={INK3} />
      <path d="M150 100 Q190 64 230 100 Q190 136 150 100 Z" fill={PAPER} stroke={COUNTER} strokeWidth={1.75} strokeLinejoin="round" />
      <circle cx={190} cy={100} r={13} fill={COUNTER} />
      <circle cx={190} cy={100} r={4.5} fill={PAPER} />
      <Arrow1 x1={240} y1={100} x2={280} y2={100} tone={INK3} />
      <Person3 x={318} y={150} k={1.8} />
      <Pack2 x={352} y={142} w={20} h={24} tone={SIGNAL} fill={SIGNAL_TINT} />
      <Key x={190} y={178} anchor="middle" fill={COUNTER} size={9.5}>
        PRODUCT AWARENESS
      </Key>
      <Key x={326} y={178} anchor="middle" fill={SIGNAL} size={9.5}>
        TRIAL
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   14 · SHARE AND ENTRANTS — growth: maximize share as competitors arrive (400)
   ========================================================================== */

export function ShareGrowth() {
  return (
    <Frame width={400} height={196} label="A market drawn as a bar. The firm's share fills it from the left and an arrow pushes it further: maximizing market share. From below, three competitors arrive and take places at the right: competition enters.">
      <Key x={20} y={52} fill={INK} size={9.5}>
        THE MARKET
      </Key>
      <rect x={20} y={62} width={360} height={40} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <rect x={20.75} y={62.75} width={190} height={38.5} fill={SIGNAL} />
      <line x1={36} y1={82} x2={194} y2={82} stroke={PAPER} strokeWidth={1.75} />
      <path d={head2.right(196, 82)} fill="none" stroke={PAPER} strokeWidth={1.75} />
      {[
        [270, 0],
        [314, 1],
        [356, 2],
      ].map(([x, kind]) => (
        <g key={x}>
          <rect x={x - 17} y={68} width={34} height={28} fill={PAPER2} stroke={INK3} strokeWidth={1.25} />
          {kind === 0 ? (
            <circle cx={x} cy={82} r={6} fill={INK3} />
          ) : kind === 1 ? (
            <rect x={x - 5.5} y={76.5} width={11} height={11} fill={INK3} />
          ) : (
            <path d={`M${x} 75 L${x + 7} 88 H${x - 7} Z`} fill={INK3} />
          )}
          <Arrow1 x1={x} y1={150} x2={x} y2={108} tone={INK3} width={1.25} />
        </g>
      ))}
      <Key x={20} y={130} fill={SIGNAL} size={9.5}>
        MAXIMIZING MARKET SHARE
      </Key>
      <Key x={380} y={176} anchor="end" fill={INK3} size={9.5}>
        COMPETITION ENTERS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   15 · SHIELD — maturity: marketing outlays defend against competition (400)
   ========================================================================== */

export function DefendOutlays() {
  return (
    <Frame width={400} height={214} label="A product under a protective dome. Competitors' arrows strike the dome from the left, the right, and above. Beside it, stacks of coins grow taller: increased marketing outlays.">
      <Key x={380} y={24} anchor="end" fill={INK3} size={9.5}>
        COMPETITION
      </Key>
      <path d="M140 160 V104 Q220 40 300 104 V160" fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={3} strokeLinejoin="round" />
      <Pack2 x={220} y={160} w={56} h={54} tone={INK} />
      <line x1={120} y1={160} x2={320} y2={160} stroke={INK} strokeWidth={1.25} />
      <Arrow1 x1={60} y1={58} x2={136} y2={94} tone={INK3} width={1.75} />
      <Arrow1 x1={380} y1={58} x2={304} y2={94} tone={INK3} width={1.75} />
      <Arrow1 x1={220} y1={20} x2={220} y2={64} tone={INK3} width={1.75} />
      <Coins1 x={30} y={196} n={2} rx={11} tone={SIGNAL} />
      <Coins1 x={60} y={196} n={4} rx={11} tone={SIGNAL} />
      <Coins1 x={90} y={196} n={6} rx={11} tone={SIGNAL} />
      <Key x={120} y={200} fill={SIGNAL} size={9.5}>
        INCREASED MARKETING OUTLAYS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   16 · THREE ROUTES — maintain, harvest, or drop the declining product
   ========================================================================== */

export function MaintainHarvestDrop() {
  return (
    <Frame height={226} label="A declining sales line ends at a product. From it, three routes fan out. Maintain: the line carries on level. Harvest: the line turns dashed while coins are collected along it. Drop: the line stops at a cross and the product falls away.">
      <Key x={30} y={28} fill={INK3} size={10}>
        THE DECLINING PRODUCT
      </Key>
      <path d="M30 56 C100 60 160 100 244 128" fill="none" stroke={INK3} strokeWidth={2} />
      <Pack2 x={264} y={146} w={34} h={32} tone={INK} />

      <path d="M284 128 C340 128 350 60 426 60" fill="none" stroke={INK} strokeWidth={1.5} />
      <path d={head2.right(428, 60)} fill="none" stroke={INK} strokeWidth={1.5} />
      <path d="M284 130 H426" fill="none" stroke={INK} strokeWidth={1.5} />
      <path d={head2.right(428, 130)} fill="none" stroke={INK} strokeWidth={1.5} />
      <path d="M284 132 C340 132 350 196 426 196" fill="none" stroke={INK} strokeWidth={1.5} />
      <path d={head2.right(428, 196)} fill="none" stroke={INK} strokeWidth={1.5} />

      <Key x={444} y={46} fill={INK} size={10.5}>
        MAINTAIN
      </Key>
      <line x1={444} y1={60} x2={720} y2={60} stroke={INK} strokeWidth={2.5} />
      <Pack2 x={746} y={76} w={32} h={30} tone={INK} />

      <Key x={444} y={116} fill={SIGNAL} size={10.5}>
        HARVEST
      </Key>
      <line x1={444} y1={130} x2={770} y2={130} stroke={INK3} strokeWidth={1.5} strokeDasharray="6 6" />
      {[560, 640, 720].map((x) => (
        <Coins1 key={x} x={x} y={124} n={3} rx={11} tone={SIGNAL} />
      ))}

      <Key x={444} y={182} fill={INK} size={10.5}>
        DROP
      </Key>
      <line x1={444} y1={196} x2={520} y2={196} stroke={INK3} strokeWidth={1.5} />
      <path d="M528 186 L548 206 M548 186 L528 206" stroke={SIGNAL} strokeWidth={2.25} />
      <g transform="translate(596 204) rotate(28)" opacity={0.55}>
        <rect x={-15} y={-26} width={30} height={26} fill={PAPER} stroke={INK3} strokeWidth={1.5} />
      </g>
    </Frame>
  );
}

/* ==========================================================================
   17 · LEGACY DECISION — harvest or gracefully retire?
   ========================================================================== */

function Building({ x, y, tone }: { x: number; y: number; tone: string }) {
  return (
    <g>
      <rect x={x - 10} y={y - 26} width={20} height={26} fill={PAPER} stroke={tone} strokeWidth={1.25} />
      <path d={`M${x - 5} ${y - 20} V${y - 4} M${x + 5} ${y - 20} V${y - 4}`} stroke={tone} strokeWidth={1.25} />
    </g>
  );
}

export function LegacyDecision() {
  return (
    <Frame height={300} label="Left: a legacy software product's user numbers fall steadily towards a band where a core group of businesses still rely on it. Right: the line forks. Up, harvest the remaining profits: coins, and a wrench struck through for cutting all support. Down, gracefully retire: an arrow from the legacy system to a new system, forcing migration.">
      <Key x={40} y={24} fill={INK} size={9.5}>
        USER NUMBERS
      </Key>
      <line x1={40} y1={36} x2={40} y2={244} stroke={INK3} strokeWidth={1.25} />
      <line x1={40} y1={244} x2={372} y2={244} stroke={INK3} strokeWidth={1.25} />
      <rect x={41} y={194} width={330} height={49} fill={COUNTER_TINT} />
      {[90, 150, 210, 270, 330].map((x) => (
        <Building key={x} x={x} y={236} tone={COUNTER} />
      ))}
      <path d="M44 56 C140 66 240 126 368 182" fill="none" stroke={INK} strokeWidth={2.5} />
      <Note x={204} y={96} size={12.5} italic>
        steadily declining
      </Note>
      <Key x={40} y={268} fill={COUNTER} size={9.5}>
        A CORE GROUP OF BUSINESSES STILL RELY ON IT
      </Key>

      <path d="M372 180 C400 180 404 64 430 64" fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <path d={head2.right(432, 64)} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <path d="M372 184 C400 184 404 214 430 214" fill="none" stroke={COUNTER} strokeWidth={1.5} />
      <path d={head2.right(432, 214)} fill="none" stroke={COUNTER} strokeWidth={1.5} />
      <Display x={432} y={160} anchor="middle" fill={INK3} size={30}>
        ?
      </Display>

      <Key x={444} y={40} fill={SIGNAL} size={10}>
        HARVEST THE REMAINING PROFITS
      </Key>
      <Coins1 x={466} y={112} n={4} rx={13} tone={SIGNAL} />
      <Coins1 x={500} y={112} n={3} rx={13} tone={SIGNAL} />
      <g transform="translate(640 88) rotate(-45)">
        <rect x={-30} y={-4} width={46} height={8} rx={3} fill={PAPER} stroke={INK} strokeWidth={1.5} />
        <path d="M16 -12 A13 13 0 1 1 16 12 L22 4 V-4 Z" fill={PAPER} stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
      </g>
      <line x1={606} y1={56} x2={674} y2={120} stroke={SIGNAL} strokeWidth={2.25} />
      <Key x={640} y={144} anchor="middle" fill={INK} size={9}>
        CUT ALL SUPPORT
      </Key>

      <Key x={444} y={190} fill={COUNTER} size={10}>
        GRACEFULLY RETIRE THE PRODUCT
      </Key>
      <rect x={444} y={206} width={110} height={50} fill={PAPER} stroke={INK3} strokeWidth={1.5} strokeDasharray="5 4" />
      <Key x={499} y={235} anchor="middle" fill={INK3} size={9}>
        LEGACY
      </Key>
      <Arrow1 x1={562} y1={231} x2={636} y2={231} tone={COUNTER} width={1.75} />
      <rect x={646} y={206} width={130} height={50} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.5} />
      <Key x={711} y={235} anchor="middle" fill={COUNTER} size={9}>
        NEW SYSTEM
      </Key>
      <Key x={600} y={284} anchor="middle" fill={COUNTER} size={9}>
        FORCE MIGRATION
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   18 · SUCCESSIVE CURVES — new products replace declining ones
   ========================================================================== */

export function SuccessiveCurves() {
  const hump = (s: number) => `M${s} 196 C${s + 60} 194 ${s + 100} 66 ${s + 170} 62 C${s + 240} 58 ${s + 280} 156 ${s + 340} 196`;
  return (
    <Frame height={236} label="Three schematic life cycle curves in a row over time. Each new one rises while the one before it declines, so sales carry on as products are replaced.">
      <Schematic x={792} y={16} />
      <line x1={30} y1={196} x2={776} y2={196} stroke={INK3} strokeWidth={1.25} />
      <path d={head2.right(778, 196)} fill="none" stroke={INK3} strokeWidth={1.25} />
      <Key x={776} y={220} anchor="end" fill={INK3} size={9}>
        TIME
      </Key>
      <path d={hump(36)} fill="none" stroke={INK3} strokeWidth={2.25} />
      <path d={hump(236)} fill="none" stroke={INK} strokeWidth={2.25} />
      <path d={hump(436)} fill="none" stroke={SIGNAL} strokeWidth={2.5} />
      <Key x={206} y={46} anchor="middle" fill={INK3} size={9.5}>
        DECLINING PRODUCT
      </Key>
      <Key x={606} y={46} anchor="middle" fill={SIGNAL} size={9.5}>
        NEW PRODUCT
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   19 · FOUR KINDS OF NEW PRODUCT
   ========================================================================== */

export function NewProductKinds() {
  const cols = [100, 300, 500, 700];
  return (
    <Frame height={194} label="Four panels. Original products: a new package with a star. Improvements: a package with an arrow pointing up. Modifications: a package with one corner piece changed. New brands: the same package with a new tag.">
      {[200, 400, 600].map((x) => (
        <line key={x} x1={x} y1={20} x2={x} y2={180} stroke={RULE} strokeWidth={1} />
      ))}
      {/* original */}
      <Pack2 x={cols[0]} y={124} w={64} h={70} tone={SIGNAL} fill={SIGNAL_TINT} />
      <Star1 x={cols[0]} y={98} k={0.9} />
      {/* improvement */}
      <Pack2 x={cols[1] - 12} y={124} w={64} h={70} tone={INK} />
      <Arrow1 x1={cols[1] + 40} y1={120} x2={cols[1] + 40} y2={56} tone={SIGNAL} width={2} />
      {/* modification */}
      <Pack2 x={cols[2] - 6} y={124} w={64} h={70} tone={INK} />
      <rect x={cols[2] + 8} y={36} width={32} height={26} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.75} transform={`rotate(-14 ${cols[2] + 24} 49)`} />
      {/* new brand */}
      <Pack2 x={cols[3] - 12} y={124} w={64} h={70} tone={INK3} />
      <path d={`M${cols[3] + 20} 70 L${cols[3] + 36} 84`} stroke={SIGNAL} strokeWidth={1.25} />
      <path d={`M${cols[3] + 30} 80 L${cols[3] + 58} 80 L${cols[3] + 62} 112 L${cols[3] + 34} 112 Z`} fill={SIGNAL} strokeLinejoin="round" />
      <Star1 x={cols[3] + 46} y={97} k={0.42} fill={PAPER} />

      {[
        ["ORIGINAL", "PRODUCTS"],
        ["IMPROVEMENTS", ""],
        ["MODIFICATIONS", ""],
        ["NEW", "BRANDS"],
      ].map(([a, b], i) => (
        <g key={a}>
          <Key x={cols[i]} y={b ? 154 : 161} anchor="middle" fill={INK} size={10}>
            {a}
          </Key>
          {b ? (
            <Key x={cols[i]} y={169} anchor="middle" fill={INK} size={10}>
              {b}
            </Key>
          ) : null}
        </g>
      ))}
    </Frame>
  );
}

/* ==========================================================================
   20 · LAUNCH LANES — many new products fail in the marketplace (400)
   ========================================================================== */

export function LaunchRisk() {
  const survivors = [2, 6];
  return (
    <Frame width={400} height={214} label="Nine new products set off towards the marketplace. Seven stop at a cross before it. Two make it through.">
      <Key x={20} y={22} fill={INK} size={9}>
        NEW PRODUCTS
      </Key>
      <Key x={272} y={22} fill={INK} size={9}>
        MARKETPLACE
      </Key>
      <rect x={266} y={32} width={124} height={158} fill={PAPER2} />
      <line x1={266} y1={32} x2={266} y2={190} stroke={INK} strokeWidth={1.75} />
      {Array.from({ length: 9 }, (_, i) => {
        const y = 42 + i * 18;
        const ok = survivors.includes(i);
        const stop = 200 + Math.round(hash2(i + 3) * 50);
        return ok ? (
          <g key={i}>
            <circle cx={28} cy={y} r={4.5} fill={SIGNAL} />
            <line x1={34} y1={y} x2={356} y2={y} stroke={SIGNAL} strokeWidth={1.5} />
            <circle cx={366} cy={y} r={6} fill={SIGNAL} />
          </g>
        ) : (
          <g key={i}>
            <circle cx={28} cy={y} r={4.5} fill={INK3} />
            <line x1={34} y1={y} x2={stop} y2={y} stroke={INK3} strokeWidth={1.25} />
            <path d={`M${stop + 3} ${y - 5} L${stop + 13} ${y + 5} M${stop + 13} ${y - 5} L${stop + 3} ${y + 5}`} stroke={INK} strokeWidth={1.5} />
          </g>
        );
      })}
      <Key x={20} y={208} fill={SIGNAL} size={9}>
        HIGH RISK
      </Key>
      <Schematic x={392} y={208} />
    </Frame>
  );
}

/* ==========================================================================
   21 · NPD STAIRCASE — the eight steps as a cascading flow
   ========================================================================== */

export const NPD_STEPS = [
  "IDEA GENERATION",
  "IDEA SCREENING",
  "CONCEPT DEVELOPMENT AND TESTING",
  "MARKETING STRATEGY DEVELOPMENT",
  "BUSINESS ANALYSIS",
  "PRODUCT DEVELOPMENT",
  "TEST MARKETING",
  "COMMERCIALIZATION",
];

export function NpdStaircase({ active }: { active: number[] }) {
  return (
    <Frame height={340} label={`A cascading flow of eight steps stepping down to the right: idea generation, idea screening, concept development and testing, marketing strategy development, business analysis, product development, test marketing, and commercialization. Steps ${active.map((a) => a + 1).join(", ")} are lit.`}>
      {NPD_STEPS.map((s, i) => {
        const x = 20 + i * 64;
        const y = 12 + i * 40;
        const on = active.includes(i);
        return (
          <g key={s}>
            <rect x={x} y={y} width={300} height={34} fill={on ? SIGNAL_TINT : PAPER} stroke={on ? SIGNAL : INK3} strokeWidth={on ? 1.75 : 1.25} />
            <Display x={x + 14} y={y + 23} fill={on ? SIGNAL : INK3} size={15}>
              {`0${i + 1}`}
            </Display>
            <Key x={x + 46} y={y + 21} fill={on ? INK : INK3} size={9}>
              {s}
            </Key>
            {i < NPD_STEPS.length - 1 ? (
              <g>
                <path d={`M${x + 24} ${y + 34} V${y + 57} H${x + 63}`} fill="none" stroke={INK3} strokeWidth={1.25} />
                <path d={head2.right(x + 64, y + 57)} fill="none" stroke={INK3} strokeWidth={1.25} />
              </g>
            ) : null}
          </g>
        );
      })}
    </Frame>
  );
}

/* ==========================================================================
   22 · IDEA FUNNEL — sourcing and filtering new concepts (400)
   ========================================================================== */

export function IdeaFunnel() {
  const cluster = Array.from({ length: 12 }, (_, i) => ({
    x: Math.round(34 + (i % 4) * 26 + (hash2(i + 11) - 0.5) * 8),
    y: Math.round(58 + Math.floor(i / 4) * 32 + (hash2(i + 31) - 0.5) * 8),
  }));
  return (
    <Frame width={400} height={210} label="Twelve light bulbs, many ideas, pass into a funnel. Some drop out beneath it. Two come out the other side.">
      {cluster.map((b, i) => (
        <Bulb1 key={i} x={b.x} y={b.y} tone={INK} />
      ))}
      <Arrow1 x1={130} y1={96} x2={150} y2={96} tone={INK3} />
      <path d="M158 40 L222 80 H256 V112 H222 L158 152 Z" fill={PAPER2} stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
      <Arrow1 x1={262} y1={96} x2={296} y2={96} tone={SIGNAL} />
      <Bulb1 x={320} y={90} tone={SIGNAL} />
      <Bulb1 x={354} y={90} tone={SIGNAL} />
      {[
        [190, 166],
        [214, 176],
        [238, 166],
      ].map(([x, y]) => (
        <Bulb1 key={x} x={x} y={y} tone={RULE2} dashed />
      ))}
      <Key x={74} y={200} anchor="middle" fill={INK} size={9}>
        SOURCING
      </Key>
      <Key x={206} y={204} anchor="middle" fill={INK} size={9}>
        FILTERING
      </Key>
      <Key x={337} y={200} anchor="middle" fill={SIGNAL} size={9}>
        NEW CONCEPTS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   23 · CONCEPT TEST — the idea shown to target consumers (400)
   ========================================================================== */

export function ConceptTest() {
  return (
    <Frame width={400} height={200} label="A concept card, a sketched package and some lines of description, is shown to a group of four target consumers. Two respond with speech bubbles: a tick and a question mark.">
      <rect x={20} y={40} width={130} height={104} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <rect x={36} y={56} width={40} height={44} fill="none" stroke={SIGNAL} strokeWidth={1.5} strokeDasharray="4 3" />
      <path d="M88 62 H134 M88 76 H130 M88 90 H122 M36 118 H134 M36 130 H112" stroke={INK3} strokeWidth={1.25} />
      <Key x={85} y={168} anchor="middle" fill={INK} size={9}>
        THE IDEA
      </Key>
      <Arrow1 x1={160} y1={96} x2={196} y2={96} tone={INK3} />
      {[228, 268, 308, 348].map((x) => (
        <Person3 key={x} x={x} y={150} k={1.35} stroke={COUNTER} />
      ))}
      <rect x={210} y={38} width={40} height={30} rx={6} fill={PAPER} stroke={INK} strokeWidth={1.25} />
      <path d="M222 68 L226 78 L232 68" fill={PAPER} stroke={INK} strokeWidth={1.25} strokeLinejoin="round" />
      <path d="M221 53 L228 60 L240 46" fill="none" stroke={SIGNAL} strokeWidth={2} />
      <rect x={330} y={38} width={40} height={30} rx={6} fill={PAPER} stroke={INK} strokeWidth={1.25} />
      <path d="M342 68 L346 78 L352 68" fill={PAPER} stroke={INK} strokeWidth={1.25} strokeLinejoin="round" />
      <Display x={350} y={62} anchor="middle" fill={INK} size={20}>
        ?
      </Display>
      <Key x={288} y={176} anchor="middle" fill={COUNTER} size={9}>
        TARGET CONSUMERS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   24 · STRATEGY OUTLINE — the initial marketing strategy (400)
   ========================================================================== */

export function StrategyOutline() {
  return (
    <Frame width={400} height={200} label="A document headed with a solid bar, three outlined sections, and a pencil still writing it: the initial marketing strategy for the new product.">
      <rect x={110} y={16} width={170} height={150} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <rect x={110.75} y={16.75} width={168.5} height={20} fill={INK} />
      {[58, 94, 130].map((y) => (
        <g key={y}>
          <circle cx={130} cy={y} r={5} fill={SIGNAL} />
          <path d={`M144 ${y - 3} H258 M144 ${y + 7} H226`} stroke={INK3} strokeWidth={1.25} />
        </g>
      ))}
      <path d="M232 130 L226 150 L240 138" fill="none" stroke={INK3} strokeWidth={1} />
      <g transform="translate(300 88) rotate(40)">
        <rect x={-6} y={-46} width={12} height={62} fill={PAPER} stroke={INK} strokeWidth={1.5} />
        <path d="M-6 16 L0 32 L6 16 Z" fill={SIGNAL} />
      </g>
      <Key x={195} y={190} anchor="middle" fill={SIGNAL} size={9}>
        INITIAL MARKETING STRATEGY
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   25 · GAUGE — business analysis weighs attractiveness (400)
   ========================================================================== */

export function AttractivenessGauge() {
  return (
    <Frame width={400} height={200} label="A proposal document beside a gauge. The needle points towards the high end: the business attractiveness of the proposal.">
      <rect x={30} y={50} width={90} height={110} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <path d="M44 70 H106 M44 84 H100 M44 98 H106 M44 112 H90 M44 136 H80" stroke={INK3} strokeWidth={1.25} />
      <Key x={75} y={184} anchor="middle" fill={INK} size={9}>
        PROPOSAL
      </Key>
      <Arrow1 x1={130} y1={110} x2={172} y2={110} tone={INK3} />
      <path d="M190 140 A80 80 0 0 1 270 60" fill="none" stroke={RULE2} strokeWidth={10} />
      <path d="M270 60 A80 80 0 0 1 350 140" fill="none" stroke={SIGNAL} strokeWidth={10} />
      <line x1={270} y1={140} x2={317.5} y2={100.2} stroke={INK} strokeWidth={2.5} strokeLinecap="round" />
      <circle cx={270} cy={140} r={6} fill={INK} />
      <line x1={180} y1={140} x2={360} y2={140} stroke={INK} strokeWidth={1.25} />
      <Key x={270} y={184} anchor="middle" fill={SIGNAL} size={9}>
        BUSINESS ATTRACTIVENESS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   26 · SKETCH TO OBJECT — product development builds the prototype (400)
   ========================================================================== */

export function SketchToPrototype() {
  return (
    <Frame width={400} height={212} label="A dashed sketch of a package, the concept, becomes a solid three-dimensional box with a dimension line under it: a physical and testable prototype.">
      <rect x={40} y={70} width={90} height={80} fill="none" stroke={INK3} strokeWidth={1.5} strokeDasharray="5 4" />
      <path d="M40 78 H130" stroke={INK3} strokeWidth={1} strokeDasharray="5 4" />
      <Key x={85} y={190} anchor="middle" fill={INK3} size={9}>
        THE CONCEPT
      </Key>
      <Arrow1 x1={146} y1={110} x2={214} y2={110} tone={SIGNAL} width={1.75} />
      <g strokeLinejoin="round">
        <rect x={240} y={70} width={90} height={80} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.75} />
        <path d="M240 70 L262 50 H352 L330 70 Z" fill={PAPER} stroke={SIGNAL} strokeWidth={1.75} />
        <path d="M330 70 L352 50 V130 L330 150 Z" fill={PAPER2} stroke={SIGNAL} strokeWidth={1.75} />
      </g>
      <path d="M240 166 H330 M240 160 V172 M330 160 V172" stroke={INK} strokeWidth={1.25} />
      <Key x={296} y={190} anchor="middle" fill={SIGNAL} size={9}>
        PHYSICAL AND TESTABLE
      </Key>
      <Key x={296} y={204} anchor="middle" fill={SIGNAL} size={9}>
        PROTOTYPE
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   27 · A REAL SHELF — test marketing (400)
   ========================================================================== */

export function TestMarketShelf() {
  return (
    <Frame width={400} height={214} label="A store: shelves with competing products, the new product among them, a megaphone above it for its marketing program, and a shopper walking past. Realistic market settings.">
      <rect x={16} y={34} width={368} height={146} fill="none" stroke={INK3} strokeWidth={1.25} strokeDasharray="5 4" />
      <Key x={24} y={24} fill={INK} size={9}>
        REALISTIC MARKET SETTINGS
      </Key>
      <Megaphone x={146} y={62} waves={3} tone={SIGNAL} />
      {[60, 100, 180, 220].map((x) => (
        <Pack2 key={x} x={x} y={122} w={28} h={32} tone={INK3} />
      ))}
      <Pack2 x={140} y={122} w={32} h={38} tone={SIGNAL} fill={SIGNAL_TINT} />
      <line x1={36} y1={123} x2={250} y2={123} stroke={INK} strokeWidth={2} />
      {[60, 100, 140, 180, 220].map((x) => (
        <Pack2 key={x} x={x} y={170} w={28} h={32} tone={INK3} />
      ))}
      <line x1={36} y1={171} x2={250} y2={171} stroke={INK} strokeWidth={2} />
      <Person3 x={322} y={170} k={1.9} />
      <Key x={140} y={204} anchor="middle" fill={SIGNAL} size={9}>
        PRODUCT AND MARKETING PROGRAM
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   28 · LAUNCH — commercialization: into the market (400)
   ========================================================================== */

export function Launch() {
  const pins: [number, number][] = [
    [236, 62],
    [306, 44],
    [370, 76],
    [258, 128],
    [336, 128],
    [296, 176],
  ];
  return (
    <Frame width={400} height={214} label="The new product at the left sends arrows out to six map pins spread across the market.">
      <Pack2 x={70} y={142} w={70} h={72} tone={SIGNAL} fill={SIGNAL_TINT} />
      {pins.map(([x, y]) => {
        const dx = x - 110;
        const dy = y - 12 - 106;
        const len = Math.hypot(dx, dy);
        const ex = Math.round((110 + dx * (1 - 26 / len)) * 100) / 100;
        const ey = Math.round((106 + dy * (1 - 26 / len)) * 100) / 100;
        return (
          <g key={`${x}-${y}`}>
            <line x1={110} y1={106} x2={ex} y2={ey} stroke={INK3} strokeWidth={1} strokeDasharray="3 3" />
            <path d={`M${x} ${y} C${x - 6} ${y - 8} ${x - 11} ${y - 13} ${x - 11} ${y - 19} A11 11 0 0 1 ${x + 11} ${y - 19} C${x + 11} ${y - 13} ${x + 6} ${y - 8} ${x} ${y} Z`} fill={SIGNAL} />
            <circle cx={x} cy={y - 19} r={4} fill={PAPER} />
          </g>
        );
      })}
      <Key x={70} y={170} anchor="middle" fill={SIGNAL} size={9}>
        NEW PRODUCT
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   29 · BRAND ELEMENTS — name, term, sign, symbol, design identify the maker
   ========================================================================== */

export function BrandElements() {
  return (
    <Frame height={264} label="A package carrying a brand. Callouts point to its name, a term, a sign, a symbol, and its design. An arrow leads from the package to a factory: it identifies the maker or seller.">
      <rect x={320} y={36} width={160} height={200} fill={PAPER} stroke={INK} strokeWidth={1.75} />
      <Display x={400} y={90} anchor="middle" fill={INK} size={30}>
        Brand
      </Display>
      <line x1={352} y1={108} x2={448} y2={108} stroke={INK3} strokeWidth={3} strokeLinecap="round" />
      <circle cx={362} cy={152} r={17} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.75} />
      <path d="M354 152 L360 158 L371 145" fill="none" stroke={COUNTER} strokeWidth={2} />
      <Star1 x={438} y={152} k={0.95} />
      {[196, 210, 224].map((y) => (
        <path key={y} d={`M321 ${y} Q360 ${y - 10} 400 ${y} T479 ${y}`} fill="none" stroke={SIGNAL} strokeWidth={1.75} />
      ))}

      {[
        { k: "NAME", y: 84, x2: 344 },
        { k: "TERM", y: 112, x2: 346 },
        { k: "SIGN", y: 156, x2: 340 },
      ].map((c) => (
        <g key={c.k}>
          <Key x={276} y={c.y + 4} anchor="end" fill={INK} size={10.5}>
            {c.k}
          </Key>
          <line x1={284} y1={c.y} x2={c.x2} y2={c.y - (c.k === "SIGN" ? 4 : c.k === "TERM" ? 4 : 0)} stroke={INK3} strokeWidth={1} />
        </g>
      ))}
      <Key x={524} y={138} fill={INK} size={10.5}>
        SYMBOL
      </Key>
      <line x1={516} y1={134} x2={458} y2={148} stroke={INK3} strokeWidth={1} />
      <Key x={524} y={224} fill={INK} size={10.5}>
        DESIGN
      </Key>
      <line x1={516} y1={220} x2={482} y2={212} stroke={INK3} strokeWidth={1} />

      <Arrow1 x1={492} y1={180} x2={640} y2={180} tone={SIGNAL} width={1.75} />
      <Note x={566} y={170} anchor="middle" size={12.5} italic>
        identifies
      </Note>
      <path d="M652 230 V178 L682 160 V178 L712 160 V178 L742 160 V120 H762 V230 Z" fill={PAPER2} stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
      <Key x={707} y={254} anchor="middle" fill={INK} size={9.5}>
        MAKER OR SELLER
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   30 · IN THE HEAD — perceptions and feelings about the product (400)
   ========================================================================== */

export function BrandPerceptions() {
  return (
    <Frame width={400} height={222} label="A consumer's head in profile, facing a product. Inside the head, a heart and a row of stars: the consumer's perceptions and feelings about the product and its performance.">
      <Head2 x={20} y={8} k={0.9} faceRight tone={INK} fill={PAPER} />
      <path d="M104 94 C88 84 82 74 88 66 C94 58 102 60 104 68 C106 60 114 58 120 66 C126 74 120 84 104 94 Z" fill={SIGNAL} />
      {[74, 94, 114, 134].map((x, i) => (
        <Star1 key={x} x={x} y={126} k={0.45} fill={i < 3 ? SIGNAL : RULE2} />
      ))}
      <line x1={204} y1={100} x2={280} y2={108} stroke={INK3} strokeWidth={1} strokeDasharray="4 4" />
      <Pack2 x={320} y={150} w={60} h={62} tone={INK} />
      <Key x={320} y={176} anchor="middle" fill={INK} size={9}>
        PRODUCT AND
      </Key>
      <Key x={320} y={190} anchor="middle" fill={INK} size={9}>
        ITS PERFORMANCE
      </Key>
      <Key x={110} y={214} anchor="middle" fill={SIGNAL} size={9}>
        PERCEPTIONS AND FEELINGS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   31 · BRAND EQUITY — the differential effect of knowing the name
   ========================================================================== */

export function BrandEquity() {
  return (
    <Frame height={256} label="A schematic comparison. Two identical packages: one with its brand name hidden, one showing it. Beside each, a bar for customer response to the product or its marketing. The bar for the named package is longer; the gap between the bars is marked as the differential effect: brand equity.">
      <Schematic x={792} y={16} />
      <Key x={150} y={30} fill={INK} size={9.5}>
        CUSTOMER RESPONSE TO THE PRODUCT OR ITS MARKETING
      </Key>

      <Pack2 x={80} y={126} w={62} h={70} tone={INK3} />
      <path d="M62 94 H98 M62 106 H90" stroke={RULE2} strokeWidth={3} />
      <Key x={150} y={70} fill={INK3} size={9.5}>
        BRAND NAME HIDDEN
      </Key>
      <rect x={150} y={84} width={240} height={26} fill={INK3} />

      <Pack2 x={80} y={222} w={62} h={70} tone={SIGNAL} fill={SIGNAL_TINT} />
      <Display x={80} y={196} anchor="middle" fill={SIGNAL} size={14}>
        Brand
      </Display>
      <Key x={150} y={166} fill={SIGNAL} size={9.5}>
        KNOWING THE BRAND NAME
      </Key>
      <rect x={150} y={180} width={420} height={26} fill={SIGNAL} />

      <line x1={390} y1={84} x2={390} y2={212} stroke={INK} strokeWidth={1} strokeDasharray="3 4" />
      <path d="M390 218 V226 H570 V218" fill="none" stroke={INK} strokeWidth={1.25} />
      <Key x={480} y={246} anchor="middle" fill={INK} size={9.5}>
        DIFFERENTIAL EFFECT
      </Key>
      <Display x={590} y={200} fill={SIGNAL} size={22}>
        = brand equity
      </Display>
    </Frame>
  );
}

/* ==========================================================================
   32 · FLAG IN THE MIND — brand positioning (400)
   ========================================================================== */

export function BrandFlag() {
  return (
    <Frame width={400} height={202} label="A flag planted inside a consumer's head: the brand's mission and vision, established in the consumer's mind.">
      <Head2 x={20} y={4} k={0.8} faceRight tone={INK} fill={PAPER} />
      <line x1={78} y1={144} x2={78} y2={54} stroke={INK} strokeWidth={2} />
      <path d="M78 54 H130 L120 68 L130 82 H78 Z" fill={SIGNAL} strokeLinejoin="round" />
      <path d="M62 144 H94" stroke={INK} strokeWidth={2} />
      <Key x={236} y={82} fill={SIGNAL} size={9.5}>
        MISSION
      </Key>
      <Key x={236} y={98} fill={SIGNAL} size={9.5}>
        AND VISION
      </Key>
      <line x1={228} y1={84} x2={140} y2={70} stroke={INK3} strokeWidth={1} />
      <Key x={100} y={194} anchor="middle" fill={INK} size={9}>
        THE CONSUMER&apos;S MIND
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   33 · NAME CHECKLIST — benefits, pronounceable, distinctive (400)
   ========================================================================== */

export function NameChecklist() {
  return (
    <Frame width={400} height={180} label="A card with a brand name on it, beside a checklist of three ticks: suggests benefits, easy to pronounce, distinctive.">
      <rect x={20} y={36} width={160} height={100} rx={8} fill={PAPER} stroke={INK} strokeWidth={1.75} />
      <Display x={100} y={98} anchor="middle" fill={INK} size={30}>
        Name
      </Display>
      <line x1={56} y1={112} x2={144} y2={112} stroke={SIGNAL} strokeWidth={2} />
      {["SUGGESTS BENEFITS", "EASY TO PRONOUNCE", "DISTINCTIVE"].map((c, i) => {
        const y = 52 + i * 38;
        return (
          <g key={c}>
            <rect x={208} y={y - 11} width={18} height={18} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
            <path d={`M212 ${y - 2} L216 ${y + 3} L223 ${y - 7}`} fill="none" stroke={SIGNAL} strokeWidth={2} />
            <Key x={236} y={y + 3} fill={INK} size={9}>
              {c}
            </Key>
          </g>
        );
      })}
    </Frame>
  );
}

/* ==========================================================================
   34 · SPONSORSHIP — four ways to put a brand on a product (400)
   ========================================================================== */

export function SponsorshipOptions() {
  const cell = (cx: number, top: number) => ({ cx, top });
  const a = cell(100, 10);
  const b = cell(300, 10);
  const c = cell(100, 120);
  const d = cell(300, 120);
  return (
    <Frame width={400} height={232} label="Four cells. Manufacturer brand: a factory and its own branded package. Private brand: a store and its own branded package. Licensed brand: a star character lent to a package. Co-branding: two brand circles overlapping.">
      <line x1={200} y1={10} x2={200} y2={222} stroke={RULE} strokeWidth={1} />
      <line x1={10} y1={116} x2={390} y2={116} stroke={RULE} strokeWidth={1} />

      <path d={`M${a.cx - 50} ${a.top + 72} V${a.top + 46} L${a.cx - 36} ${a.top + 36} V${a.top + 46} L${a.cx - 22} ${a.top + 36} V${a.top + 22} H${a.cx - 12} V${a.top + 72} Z`} fill={PAPER2} stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
      <Pack2 x={a.cx + 28} y={a.top + 72} w={34} h={40} tone={SIGNAL} fill={SIGNAL_TINT} />

      <path d={`M${b.cx - 54} ${b.top + 38} L${b.cx - 46} ${b.top + 24} H${b.cx - 6} L${b.cx + 2} ${b.top + 38} Z`} fill={PAPER2} stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
      <rect x={b.cx - 50} y={b.top + 38} width={48} height={34} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <Pack2 x={b.cx + 32} y={b.top + 72} w={34} h={40} tone={SIGNAL} fill={SIGNAL_TINT} />

      <circle cx={c.cx - 34} cy={c.top + 48} r={20} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.5} />
      <Star1 x={c.cx - 34} y={c.top + 49} k={0.7} fill={COUNTER} />
      <Arrow1 x1={c.cx - 10} y1={c.top + 48} x2={c.cx + 10} y2={c.top + 48} tone={INK3} width={1.25} />
      <Pack2 x={c.cx + 34} y={c.top + 72} w={34} h={40} tone={INK} />
      <Star1 x={c.cx + 34} y={c.top + 53} k={0.5} fill={COUNTER} />

      <circle cx={d.cx - 14} cy={d.top + 46} r={24} fill="none" stroke={INK} strokeWidth={1.75} />
      <circle cx={d.cx + 14} cy={d.top + 46} r={24} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.75} />

      {[
        [a, "MANUFACTURER BRAND"],
        [b, "PRIVATE BRAND"],
        [c, "LICENSED BRAND"],
        [d, "CO-BRANDING"],
      ].map(([p, name]) => {
        const pt = p as { cx: number; top: number };
        return (
          <Key key={name as string} x={pt.cx} y={pt.top + 96} anchor="middle" fill={INK} size={9}>
            {name as string}
          </Key>
        );
      })}
    </Frame>
  );
}

/* ==========================================================================
   35 · CONTAINER — the product inside its package (400)
   ========================================================================== */

export function ContainerWrapper() {
  return (
    <Frame width={400} height={210} label="A bottle on its own, the product. An arrow leads to the same bottle inside a box: the container or wrapper.">
      <Bottle1 x={90} y={170} />
      <Key x={90} y={198} anchor="middle" fill={INK} size={9}>
        PRODUCT
      </Key>
      <Arrow1 x1={130} y1={120} x2={206} y2={120} tone={INK3} />
      <g strokeLinejoin="round">
        <path d="M230 60 L252 40 H362 L340 60 Z" fill={PAPER} stroke={SIGNAL} strokeWidth={1.75} />
        <path d="M340 60 L362 40 V160 L340 180 Z" fill={PAPER2} stroke={SIGNAL} strokeWidth={1.75} />
        <rect x={230} y={60} width={110} height={120} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.75} />
      </g>
      <g opacity={0.5}>
        <Bottle1 x={285} y={172} tone={INK} fill="none" />
      </g>
      <Key x={296} y={198} anchor="middle" fill={SIGNAL} size={9}>
        CONTAINER OR WRAPPER
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   36 · THREE PACKAGE FUNCTIONS — protect, attract, describe
   ========================================================================== */

export function PackageFunctions() {
  const rays: [number, number][] = [
    [0.7071, -0.7071],
    [0, -1],
    [-0.7071, -0.7071],
  ];
  return (
    <Frame height={220} label="Three panels of the same package. Protecting the product: blows strike the package from three sides and stop at its wall. Attracting attention: among plain grey packages on a shelf, it shines. Describing the product: a magnifier over lines of text on its side.">
      <line x1={266} y1={20} x2={266} y2={200} stroke={RULE} strokeWidth={1} />
      <line x1={533} y1={20} x2={533} y2={200} stroke={RULE} strokeWidth={1} />

      {/* protecting */}
      <rect x={93} y={70} width={80} height={90} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={3} />
      <g transform="translate(133 154) scale(0.72)" opacity={0.45}>
        <Bottle1 x={0} y={0} />
      </g>
      <Arrow1 x1={30} y1={80} x2={86} y2={104} tone={INK} width={1.75} />
      <Arrow1 x1={236} y1={80} x2={180} y2={104} tone={INK} width={1.75} />
      <Arrow1 x1={133} y1={20} x2={133} y2={62} tone={INK} width={1.75} />

      {/* attracting attention */}
      {[320, 356, 444, 480].map((x) => (
        <Pack2 key={x} x={x} y={160} w={30} h={46} tone={INK3} fill={PAPER2} />
      ))}
      <Pack2 x={400} y={160} w={40} h={62} tone={SIGNAL} fill={SIGNAL_TINT} />
      {rays.map(([ux, uy], i) => (
        <line key={i} x1={Math.round((400 + ux * 44) * 100) / 100} y1={Math.round((128 + uy * 44) * 100) / 100} x2={Math.round((400 + ux * 58) * 100) / 100} y2={Math.round((128 + uy * 58) * 100) / 100} stroke={SIGNAL} strokeWidth={2} strokeLinecap="round" />
      ))}
      <line x1={296} y1={161} x2={504} y2={161} stroke={INK} strokeWidth={2} />

      {/* describing */}
      <rect x={612} y={50} width={96} height={116} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.75} />
      {[72, 86, 100, 114, 128, 142].map((y, i) => (
        <line key={y} x1={626} y1={y} x2={i % 2 ? 680 : 694} y2={y} stroke={INK} strokeWidth={1.5} />
      ))}
      <circle cx={700} cy={122} r={24} fill={PAPER} fillOpacity={0.7} stroke={INK} strokeWidth={2} />
      <line x1={717} y1={139} x2={738} y2={160} stroke={INK} strokeWidth={4} strokeLinecap="round" />

      {[
        [133, "PROTECTING THE PRODUCT"],
        [400, "ATTRACTING ATTENTION"],
        [667, "DESCRIBING THE PRODUCT"],
      ].map(([x, k]) => (
        <Key key={k as string} x={x as number} y={198} anchor="middle" fill={INK} size={10}>
          {k as string}
        </Key>
      ))}
    </Frame>
  );
}

/* ==========================================================================
   37 · LABEL CALLOUTS — identifies, grades, describes, promotes
   ========================================================================== */

export function LabelCallouts() {
  return (
    <Frame height={244} label="A jar with a label. Four callouts: the brand name identifies the product; a grade badge grades it; lines of text describe it; an attractive graphic promotes it.">
      <rect x={340} y={24} width={120} height={22} rx={3} fill={INK} />
      <rect x={326} y={46} width={148} height={184} rx={20} fill={PAPER} stroke={INK} strokeWidth={1.75} />
      <rect x={326.9} y={84} width={146.2} height={120} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
      <Display x={400} y={114} anchor="middle" fill={INK} size={20}>
        Brand
      </Display>
      <path d="M344 136 H400 M344 148 H394 M344 160 H400" stroke={INK} strokeWidth={1.5} />
      <circle cx={444} cy={148} r={15} fill={COUNTER} />
      <Display x={444} y={154} anchor="middle" fill={PAPER} size={16}>
        A
      </Display>
      <circle cx={400} cy={186} r={12} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <Star1 x={400} y={186} k={0.55} />

      <Key x={290} y={112} anchor="end" fill={INK} size={10.5}>
        IDENTIFIES
      </Key>
      <line x1={298} y1={108} x2={350} y2={106} stroke={INK3} strokeWidth={1} />
      <Key x={290} y={152} anchor="end" fill={INK} size={10.5}>
        DESCRIBES
      </Key>
      <line x1={298} y1={148} x2={338} y2={148} stroke={INK3} strokeWidth={1} />
      <Key x={510} y={152} fill={COUNTER} size={10.5}>
        GRADES
      </Key>
      <line x1={502} y1={148} x2={462} y2={148} stroke={INK3} strokeWidth={1} />
      <Key x={510} y={196} fill={SIGNAL} size={10.5}>
        PROMOTES
      </Key>
      <line x1={502} y1={192} x2={414} y2={188} stroke={INK3} strokeWidth={1} />
    </Frame>
  );
}

/* ==========================================================================
   38 · WHAT IS SOLD — activities, benefits, satisfactions (400)
   ========================================================================== */

export function ServiceForms() {
  return (
    <Frame width={400} height={206} label="Three things offered for sale under one price tag: an activity, a person in motion; a benefit, a star; a satisfaction, a smiling face.">
      <path d="M40 80 H22 M44 96 H18 M40 112 H24" stroke={INK3} strokeWidth={1.5} strokeLinecap="round" />
      <Person3 x={70} y={124} k={1.8} />
      <Star1 x={200} y={92} k={1.55} fill={COUNTER} />
      <circle cx={330} cy={92} r={30} fill={PAPER} stroke={INK} strokeWidth={1.75} />
      <circle cx={320} cy={84} r={3} fill={INK} />
      <circle cx={340} cy={84} r={3} fill={INK} />
      <path d="M314 100 Q330 116 346 100" fill="none" stroke={SIGNAL} strokeWidth={2.25} strokeLinecap="round" />
      {[
        [70, "ACTIVITIES"],
        [200, "BENEFITS"],
        [330, "SATISFACTIONS"],
      ].map(([x, k]) => (
        <Key key={k as string} x={x as number} y={150} anchor="middle" fill={INK} size={9.5}>
          {k as string}
        </Key>
      ))}
      <path d="M30 162 V170 H370 V162" fill="none" stroke={INK} strokeWidth={1.25} />
      <PriceTag x={150} y={190} tone={SIGNAL} variant={0} />
      <Key x={194} y={194} fill={SIGNAL} size={9.5}>
        OFFERED FOR SALE
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   39 · NOTHING TO TAKE HOME — services do not result in ownership
   ========================================================================== */

export function NoOwnership() {
  return (
    <Frame height={246} label="Left, a physical object: a person walks away carrying it. Right, a service, a night in a hotel bed: the person walks away with empty hands and only a dashed outline where an object would be. Intangible; no ownership.">
      <line x1={400} y1={20} x2={400} y2={226} stroke={RULE} strokeWidth={1} />
      <Key x={30} y={30} fill={INK} size={10}>
        A PHYSICAL OBJECT
      </Key>
      <Pack2 x={100} y={170} w={70} h={74} tone={INK} fill={PAPER2} />
      <Arrow1 x1={150} y1={130} x2={206} y2={130} tone={INK3} />
      <Person3 x={270} y={176} k={2.1} />
      <Pack2 x={304} y={166} w={28} h={32} tone={INK} fill={PAPER2} />
      <Key x={270} y={210} anchor="middle" fill={INK} size={10}>
        OWNERSHIP
      </Key>

      <Key x={430} y={30} fill={COUNTER} size={10}>
        A SERVICE
      </Key>
      <path d="M520 64 A18 18 0 1 0 536 92 A13 13 0 1 1 520 64 Z" fill={COUNTER} />
      <g strokeLinejoin="round">
        <path d="M444 176 V116" stroke={COUNTER} strokeWidth={2} />
        <rect x={444} y={146} width={110} height={16} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.5} />
        <rect x={452} y={132} width={30} height={14} rx={4} fill={PAPER} stroke={COUNTER} strokeWidth={1.5} />
        <path d="M554 162 V176 M444 162 H554" stroke={COUNTER} strokeWidth={2} />
      </g>
      <Key x={499} y={210} anchor="middle" fill={COUNTER} size={10}>
        INTANGIBLE
      </Key>
      <Arrow1 x1={574} y1={130} x2={630} y2={130} tone={INK3} />
      <Person3 x={690} y={176} k={2.1} />
      <rect x={710} y={134} width={28} height={32} fill="none" stroke={SIGNAL} strokeWidth={1.5} strokeDasharray="4 3" />
      <Key x={700} y={210} anchor="middle" fill={SIGNAL} size={10}>
        NO OWNERSHIP
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   40 · SHARE OF THE ECONOMY — services growing and dominating (400)
   ========================================================================== */

export function ServiceEconomy() {
  const share = [0.3, 0.42, 0.54, 0.66, 0.76];
  return (
    <Frame width={400} height={204} label="A schematic chart of five columns over time. In each, the services part is larger than in the one before, until services fill most of the column.">
      <Key x={40} y={24} fill={SIGNAL} size={9.5}>
        GROWING RAPIDLY
      </Key>
      {share.map((s, i) => {
        const x = 40 + i * 64;
        const h = Math.round(120 * s);
        return (
          <g key={x}>
            <rect x={x} y={40} width={44} height={120 - h} fill={PAPER2} stroke={INK3} strokeWidth={1} />
            <rect x={x} y={160 - h} width={44} height={h} fill={COUNTER} />
          </g>
        );
      })}
      <line x1={30} y1={160.5} x2={352} y2={160.5} stroke={INK} strokeWidth={1.25} />
      <Arrow1 x1={62} y1={116} x2={318} y2={60} tone={SIGNAL} width={1.75} />
      <rect x={40} y={176} width={12} height={12} fill={COUNTER} />
      <Key x={58} y={186} fill={INK} size={9}>
        SERVICES
      </Key>
      <rect x={146} y={176} width={12} height={12} fill={PAPER2} stroke={INK3} strokeWidth={1} />
      <Key x={164} y={186} fill={INK} size={9}>
        GOODS
      </Key>
      <Schematic x={392} y={186} />
    </Frame>
  );
}

/* ==========================================================================
   41 · HUB AND SPOKES — the four characteristics of services
   ========================================================================== */

export function ServiceHub() {
  const nodes = [
    { x: 150, y: 80, name: "INTANGIBILITY", end: [190.85, 96.34], start: [342.44, 156.97] },
    { x: 650, y: 80, name: "INSEPARABILITY", end: [609.15, 96.34], start: [457.56, 156.97] },
    { x: 150, y: 280, name: "VARIABILITY", end: [190.85, 263.66], start: [342.44, 203.03] },
    { x: 650, y: 280, name: "PERISHABILITY", end: [609.15, 263.66], start: [457.56, 203.03] },
  ];
  return (
    <Frame height={360} label="A hub labelled services with four spokes. Intangibility: an eye struck through. Inseparability: a provider and a customer joined. Variability: three bars of different heights. Perishability: an hourglass running out.">
      {nodes.map((n) => (
        <line key={n.name} x1={n.start[0]} y1={n.start[1]} x2={n.end[0]} y2={n.end[1]} stroke={SIGNAL} strokeWidth={1.75} />
      ))}
      <circle cx={400} cy={180} r={62} fill={SIGNAL} />
      <Key x={400} y={185} anchor="middle" fill={PAPER} size={12}>
        SERVICES
      </Key>
      {nodes.map((n, i) => (
        <g key={n.name}>
          <circle cx={n.x} cy={n.y} r={44} fill={PAPER} stroke={INK} strokeWidth={1.75} />
          <Key x={n.x} y={i < 2 ? 24 : 346} anchor="middle" fill={INK} size={10.5}>
            {n.name}
          </Key>
        </g>
      ))}

      {/* intangibility: an eye struck through */}
      <path d="M122 80 Q150 56 178 80 Q150 104 122 80 Z" fill="none" stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
      <circle cx={150} cy={80} r={7} fill={INK} />
      <line x1={128} y1={102} x2={172} y2={58} stroke={SIGNAL} strokeWidth={2.25} />

      {/* inseparability: provider and customer joined */}
      <Person3 x={634} y={104} k={1.15} stroke={COUNTER} />
      <Person3 x={666} y={104} k={1.15} stroke={INK} />
      <rect x={640} y={86} width={20} height={6} fill={SIGNAL} />

      {/* variability: uneven bars */}
      {[
        [130, 34],
        [150, 14],
        [170, 26],
      ].map(([x, h]) => (
        <rect key={x} x={x - 7} y={298 - h} width={14} height={h} fill={x === 150 ? SIGNAL : INK} />
      ))}
      <line x1={118} y1={298.5} x2={182} y2={298.5} stroke={INK} strokeWidth={1.25} />

      {/* perishability: an hourglass */}
      <path d="M634 256 H666 L650 280 L666 304 H634 L650 280 Z" fill={PAPER} stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
      <path d="M644 265 H656 L650 274 Z" fill={SIGNAL} />
      <path d="M638 302 Q650 290 662 302 Z" fill={SIGNAL} />
    </Frame>
  );
}

/* ==========================================================================
   42 · ACROSS THE COUNTER — customer and frontline employee (400)
   ========================================================================== */

export function FrontlineInteraction() {
  return (
    <Frame width={400} height={204} label="A frontline employee and a customer face each other across a counter. A two-way arrow between them marks the interaction.">
      <Person3 x={110} y={172} k={2.2} stroke={COUNTER} />
      <Person3 x={290} y={172} k={2.2} />
      <rect x={160} y={124} width={80} height={48} fill={PAPER2} stroke={INK} strokeWidth={1.5} />
      <line x1={140} y1={100} x2={260} y2={100} stroke={SIGNAL} strokeWidth={2} />
      <path d={head2.right(262, 100)} fill="none" stroke={SIGNAL} strokeWidth={2} />
      <path d={head2.left(138, 100)} fill="none" stroke={SIGNAL} strokeWidth={2} />
      <line x1={60} y1={172.5} x2={340} y2={172.5} stroke={INK} strokeWidth={1.25} />
      <Key x={200} y={88} anchor="middle" fill={SIGNAL} size={9}>
        INTERACTION
      </Key>
      <Key x={110} y={194} anchor="middle" fill={COUNTER} size={9}>
        FRONTLINE EMPLOYEE
      </Key>
      <Key x={300} y={194} anchor="middle" fill={INK} size={9}>
        CUSTOMER
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   43 · CHAIN — employee satisfaction, customer satisfaction, profits
   ========================================================================== */

export function ProfitChain() {
  const links = [
    { x: 20, tone: COUNTER, name: "EMPLOYEE SATISFACTION" },
    { x: 260, tone: INK, name: "CUSTOMER SATISFACTION" },
    { x: 500, tone: SIGNAL, name: "SERVICE FIRM PROFITS" },
  ];
  return (
    <Frame height={166} label="Three interlocking chain links: employee satisfaction, customer satisfaction, and service firm profits.">
      {links.map((l) => (
        <g key={l.name}>
          <rect x={l.x} y={36} width={280} height={84} rx={42} fill="none" stroke={l.tone} strokeWidth={7} />
          <Key x={l.x + 140} y={82} anchor="middle" fill={l.tone} size={9.5}>
            {l.name}
          </Key>
        </g>
      ))}
      {/* re-draw the left edge of each link over the one before, so they interlock */}
      {links.slice(1).map((l) => (
        <path key={l.x} d={`M${l.x + 42} 36 A42 42 0 0 0 ${l.x} 78`} fill="none" stroke={l.tone} strokeWidth={7} />
      ))}
      <Key x={400} y={152} anchor="middle" fill={INK3} size={9.5}>
        SERVICE PROFIT CHAIN
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   44 · FACING INWARD FIRST — internal marketing (400)
   ========================================================================== */

export function InternalMarketing() {
  return (
    <Frame width={400} height={200} label="The firm, a building, sends arrows to its customer-contact employees to orient and motivate them. The employees then face the customers.">
      <g strokeLinejoin="round">
        <path d="M24 72 L60 50 L96 72 Z" fill={PAPER} stroke={INK} strokeWidth={1.5} />
        <rect x={28} y={72} width={64} height={70} fill={PAPER} stroke={INK} strokeWidth={1.5} />
        <path d="M44 80 V134 M60 80 V134 M76 80 V134" stroke={INK} strokeWidth={1.5} />
      </g>
      <Arrow1 x1={106} y1={104} x2={160} y2={104} tone={SIGNAL} width={1.75} />
      <Note x={133} y={94} anchor="middle" size={11.5} italic>
        orient
      </Note>
      <Note x={133} y={124} anchor="middle" size={11.5} italic>
        motivate
      </Note>
      <Person3 x={190} y={142} k={1.5} stroke={COUNTER} />
      <Person3 x={226} y={142} k={1.5} stroke={COUNTER} />
      <Arrow1 x1={252} y1={118} x2={296} y2={118} tone={INK3} dash="4 3" />
      <Person3 x={328} y={142} k={1.5} stroke={INK3} />
      <Person3 x={362} y={142} k={1.5} stroke={INK3} />
      <line x1={20} y1={142.5} x2={384} y2={142.5} stroke={INK} strokeWidth={1.25} />
      <Key x={60} y={168} anchor="middle" fill={INK} size={9}>
        THE FIRM
      </Key>
      <Key x={208} y={168} anchor="middle" fill={COUNTER} size={9}>
        CUSTOMER-CONTACT
      </Key>
      <Key x={208} y={182} anchor="middle" fill={COUNTER} size={9}>
        EMPLOYEES
      </Key>
      <Key x={345} y={168} anchor="middle" fill={INK3} size={9}>
        CUSTOMERS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   45 · FIFTY EMPTY SEATS — perishable revenue on a flight
   ========================================================================== */

export function EmptySeats() {
  const empty = new Set(
    Array.from({ length: 180 }, (_, i) => i)
      .sort((a, b) => hash2(a + 7) - hash2(b + 7))
      .slice(0, 50),
  );
  const rows = [80, 98, 116, 146, 164, 182];
  return (
    <Frame height={296} label="A plane seen from above with 180 seats. Fifty of them are empty, drawn in outline. Below, a timeline: now, then 24 hours until the plane takes off, after which the revenue from those seats is gone forever.">
      <rect x={30} y={18} width={14} height={12} fill={PAPER} stroke={SIGNAL} strokeWidth={1.5} />
      <Key x={52} y={28} fill={SIGNAL} size={10}>
        50 EMPTY SEATS
      </Key>
      <path d="M70 58 H690 Q782 76 782 131 Q782 186 690 204 H70 Q30 204 30 131 Q30 58 70 58 Z" fill={PAPER} stroke={INK} strokeWidth={1.75} />
      <path d="M716 104 Q744 110 752 131 Q744 152 716 158" fill="none" stroke={INK3} strokeWidth={1.25} />
      {Array.from({ length: 30 }, (_, c) =>
        rows.map((y, r) => {
          const i = c * 6 + r;
          const x = 70 + c * 20;
          const isEmpty = empty.has(i);
          return (
            <rect
              key={i}
              x={x - 7}
              y={y - 6}
              width={14}
              height={12}
              rx={2}
              fill={isEmpty ? PAPER : INK}
              stroke={isEmpty ? SIGNAL : "none"}
              strokeWidth={1.5}
            />
          );
        }),
      )}

      <line x1={40} y1={250} x2={770} y2={250} stroke={INK} strokeWidth={1.5} />
      <path d={head2.right(772, 250)} fill="none" stroke={INK} strokeWidth={1.5} />
      <rect x={600} y={240} width={166} height={20} fill={SIGNAL_TINT} />
      <line x1={60} y1={242} x2={60} y2={258} stroke={INK} strokeWidth={2} />
      <line x1={600} y1={238} x2={600} y2={262} stroke={SIGNAL} strokeWidth={2.5} />
      <Key x={60} y={280} anchor="middle" fill={INK} size={9.5}>
        NOW
      </Key>
      <Note x={330} y={240} anchor="middle" size={12.5} italic>
        24 hours
      </Note>
      <Key x={600} y={280} anchor="middle" fill={INK} size={9.5}>
        TAKES OFF
      </Key>
      <Key x={764} y={280} anchor="end" fill={SIGNAL} size={9.5}>
        GONE FOREVER
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   46 · BALANCE — perishable revenue now against pricing power later
   ========================================================================== */

export function PricingBalance() {
  return (
    <Frame height={140} label="A balance beam on a pivot marked with a question mark. On the left, coins and a discount tag: the immediate need to capture perishable revenue. On the right, a price tag and a clock: long-term brand pricing power.">
      <g transform="translate(0 -66)">
      <Display x={400} y={104} anchor="middle" fill={INK3} size={32}>
        ?
      </Display>
      <path d="M400 142 L428 190 H372 Z" fill={PAPER2} stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
      <line x1={110} y1={141} x2={690} y2={141} stroke={INK} strokeWidth={3} />
      <line x1={330} y1={190.5} x2={470} y2={190.5} stroke={INK} strokeWidth={1.5} />

      <Coins1 x={160} y={132} n={4} rx={16} tone={SIGNAL} />
      <Coins1 x={200} y={132} n={3} rx={16} tone={SIGNAL} />
      <PriceTag x={276} y={120} tone={SIGNAL} variant={0} />
      <Key x={220} y={176} anchor="middle" fill={SIGNAL} size={9.5}>
        IMMEDIATE NEED TO CAPTURE
      </Key>
      <Key x={220} y={192} anchor="middle" fill={SIGNAL} size={9.5}>
        PERISHABLE REVENUE
      </Key>

      <circle cx={540} cy={116} r={20} fill={PAPER} stroke={COUNTER} strokeWidth={1.75} />
      <path d="M540 104 V116 L549 122" fill="none" stroke={COUNTER} strokeWidth={1.75} strokeLinecap="round" />
      <PriceTag x={624} y={116} tone={COUNTER} variant={3} />
      <Key x={590} y={176} anchor="middle" fill={COUNTER} size={9.5}>
        LONG-TERM BRAND
      </Key>
      <Key x={590} y={192} anchor="middle" fill={COUNTER} size={9.5}>
        PRICING POWER
      </Key>
      </g>
    </Frame>
  );
}

/* ==========================================================================
   Conclusion glyphs — each echoes a plate already seen
   ========================================================================== */

export function GlyphLifeCycle() {
  return (
    <svg {...glyphProps}>
      <path d="M2 36 H60" stroke="var(--ink-3)" strokeWidth="1" />
      <path d="M2 34 C14 34 18 8 32 6 C46 4 52 24 62 30" stroke="var(--signal)" strokeWidth="2" />
    </svg>
  );
}

export function GlyphStaircase() {
  return (
    <svg {...glyphProps}>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={2 + i * 13} y={3 + i * 9} width="22" height="6" stroke={i === 3 ? "var(--signal)" : "var(--ink)"} strokeWidth="1.25" />
      ))}
    </svg>
  );
}

export function GlyphBrand() {
  return (
    <svg {...glyphProps}>
      <rect x="18" y="4" width="28" height="34" stroke="var(--ink)" strokeWidth="1.5" />
      <path d="M18 12 H46" stroke="var(--ink)" strokeWidth="1" />
      <path d="M32 18 L34 23 L39 23 L35 26 L37 31 L32 28 L27 31 L29 26 L25 23 L30 23 Z" fill="var(--signal)" />
    </svg>
  );
}

export function GlyphServiceHub() {
  return (
    <svg {...glyphProps}>
      <path d="M32 20 L8 6 M32 20 L56 6 M32 20 L8 34 M32 20 L56 34" stroke="var(--signal)" strokeWidth="1.25" />
      {[
        [8, 6],
        [56, 6],
        [8, 34],
        [56, 34],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="4.5" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.25" />
      ))}
      <circle cx="32" cy="20" r="7" fill="var(--signal)" />
    </svg>
  );
}
