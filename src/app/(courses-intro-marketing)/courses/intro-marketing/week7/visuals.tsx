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
   ========================================================================== */

import React from "react";
import { Basket, Gift, Wrench } from "@phosphor-icons/react";
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
  r2,
  RULE,
  RULE2,
  SIGNAL,
  SIGNAL_TINT,
} from "../_visuals/kit";
import {
  Arrow1,
  Bottle1,
  Bulb2,
  Coins2,
  Company1,
  Factory3,
  Head2,
  NS,
  Pack2,
  Person3,
  Star1,
  Store2,
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
      {/* event: a ticket, notched on both ends */}
      <g>
        <path d={`M${cols[2] - 30} 70 H${cols[2] + 30} V82 A6 6 0 0 0 ${cols[2] + 30} 94 V106 H${cols[2] - 30} V94 A6 6 0 0 0 ${cols[2] - 30} 82 Z`} fill={PAPER} stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
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
      <Bulb2 x={cols[6]} y={84} k={1.45} tone={INK} fill={PAPER} />

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
      <path d="M44 52 C46 34 64 32 64 46 C64 60 48 58 52 42 C56 28 76 28 76 44 C76 60 58 58 62 42 C66 28 88 30 88 46 C88 58 72 60 72 50 M40 58 L50 50 M86 40 L98 34" fill="none" stroke={INK3} strokeWidth={1.5} strokeLinecap="round" />
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
    <Frame width={400} height={204} label="A shop, then a person carrying a bag away from it, then a house with the product inside: bought by final consumers for personal consumption.">
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
    <Frame width={400} height={262} label="Toothpaste. Along a time line, seven tubes bought one after another: purchased frequently. Below, one tube goes straight into a shopping basket: minimal comparison.">
      <TubeGlyph x={200} y={96} s={1.2} />
      <Key x={20} y={124} fill={INK} size={10.5}>
        PURCHASED FREQUENTLY
      </Key>
      {Array.from({ length: 7 }, (_, i) => (
        <TubeGlyph key={i} x={44 + i * 50} y={160} s={0.38} tone={SIGNAL} fill={SIGNAL_TINT} />
      ))}
      <line x1={16} y1={164} x2={380} y2={164} stroke={INK3} strokeWidth={1.25} />
      <path d={head2.right(382, 164)} fill="none" stroke={INK3} strokeWidth={1.25} />

      <Key x={20} y={198} fill={INK} size={10.5}>
        MINIMAL COMPARISON
      </Key>
      <TubeGlyph x={80} y={250} s={0.6} tone={SIGNAL} fill={SIGNAL_TINT} />
      <Arrow1 x1={126} y1={232} x2={250} y2={232} tone={SIGNAL} width={1.75} />
      <Basket x={268} y={198} size={60} weight="duotone" color={SIGNAL} />
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
    <Frame width={400} height={250} label="Two sofas side by side, one in ink and one in teal. Below, three comparison rows, quality, price, and style, each with a dot for each sofa at a different place.">
      <SofaGlyph x={118} y={96} s={1.05} />
      <SofaGlyph x={282} y={96} s={1.05} tone={COUNTER} />
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
      <path d="M64 198 C140 252 150 112 200 152 C244 188 214 100 250 100" fill="none" stroke={SIGNAL} strokeWidth={1.75} strokeDasharray="6 5" />
      <path d={headAlong1(254, 100, 1, 0, 9)} fill="none" stroke={SIGNAL} strokeWidth={1.75} />
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
      <Key x={316} y={206} anchor="middle" fill={SIGNAL} size={9.5}>
        DO NOT NORMALLY
      </Key>
      <Key x={316} y={221} anchor="middle" fill={SIGNAL} size={9.5}>
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
    { x: 250, a: "CONVENIENCE", glyph: <TubeGlyph x={250} y={92} s={0.9} /> },
    { x: 400, a: "SHOPPING", glyph: <SofaGlyph x={400} y={92} s={0.85} /> },
    { x: 550, a: "SPECIALTY", glyph: <CarGlyph x={550} y={92} s={0.9} /> },
    { x: 700, a: "UNSOUGHT", glyph: <PolicyGlyph x={700} y={92} s={0.9} /> },
  ];
  return (
    <Frame height={262} label="Four columns: convenience goods, shopping goods, specialty goods, and unsought goods. Under each sits its own megaphone for marketing and its own price tag for pricing, each drawn differently and lit: a distinct marketing and pricing strategy.">
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
          <Key x={c.x} y={116} anchor="middle" fill={INK} size={9.5}>
            {c.a}
          </Key>
          <Key x={c.x} y={130} anchor="middle" fill={INK} size={9.5}>
            GOODS
          </Key>
          <Megaphone x={c.x - 8} y={172} waves={i + 1} tone={SIGNAL} />
          <PriceTag x={c.x + 2} y={228} tone={SIGNAL} variant={i} />
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
            <rect x={x} y={y} width={196} height={40} fill={PAPER} stroke={INK} strokeWidth={1.5} />
            <Display x={x + 14} y={y + 28} fill={SIGNAL} size={20}>
              {`0${i + 1}`}
            </Display>
            <Key x={x + 50} y={y + 25} fill={INK} size={12}>
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
    <Frame height={330} label="The product life cycle as a chart over time. A sales curve stays at zero through development, rises slowly in introduction, fast in growth, flattens in maturity, and falls in decline. A profits curve dips below zero through development and introduction, rises in growth, levels off in maturity, and drops in decline.">
      {PLC_BOUNDS.slice(1, -1).map((x) => (
        <line key={x} x1={x} y1={42} x2={x} y2={290} stroke={RULE2} strokeWidth={1} strokeDasharray="3 4" />
      ))}
      {PLC_STAGES.map((s, i) => (
        <Key key={s} x={(PLC_BOUNDS[i] + PLC_BOUNDS[i + 1]) / 2} y={36} anchor="middle" fill={INK} size={9}>
          {s}
        </Key>
      ))}
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
    <Frame width={400} height={188} label="Two panels. Left, the life cycle as a dashed curve that rises, levels, and falls: a useful framework. Right, two real products with other shapes: one rises and holds, one shoots up and falls quickly. Not all products follow it strictly.">
      <line x1={20} y1={132} x2={184} y2={132} stroke={INK3} strokeWidth={1.25} />
      <path d="M22 132 C54 130 70 70 102 56 C134 44 154 96 182 124" fill="none" stroke={COUNTER} strokeWidth={2} strokeDasharray="6 4" />
      <Key x={102} y={158} anchor="middle" fill={COUNTER} size={10}>
        USEFUL
      </Key>
      <Key x={102} y={172} anchor="middle" fill={COUNTER} size={10}>
        FRAMEWORK
      </Key>

      <line x1={200} y1={24} x2={200} y2={176} stroke={RULE} strokeWidth={1} />

      <line x1={216} y1={132} x2={380} y2={132} stroke={INK3} strokeWidth={1.25} />
      <path d="M218 132 C252 130 264 64 310 58 H380" fill="none" stroke={INK} strokeWidth={2} />
      <path d="M218 132 C236 132 240 30 258 30 C276 30 280 132 300 132" fill="none" stroke={INK} strokeWidth={2} />
      <Key x={298} y={158} anchor="middle" fill={INK} size={10}>
        NOT ALL PRODUCTS
      </Key>
      <Key x={298} y={172} anchor="middle" fill={INK} size={10}>
        FOLLOW IT STRICTLY
      </Key>
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

/** Sales and profits heights at the middle of each stage, in PLC plot units. */
const STAGE_MID: Record<number, [number, number, number]> = {
  1: [240, 210.9, 252.8],
  2: [375, 114.4, 168],
  3: [545, 60, 121.3],
  4: [700, 114.6, 180.7],
};

export function StageWindow({ stage }: { stage: 1 | 2 | 3 | 4 }) {
  const sx = (x: number) => Math.round((20 + (x - 80) * (360 / 680)) * 100) / 100;
  const sy = (y: number) => Math.round((60 + (y - 40) * 0.55) * 100) / 100;
  const x0 = sx(PLC_BOUNDS[stage]);
  const x1 = sx(PLC_BOUNDS[stage + 1]);
  const clip = `w7-stage-${stage}`;
  const plot = "translate(20 60) scale(0.5294 0.55) translate(-80 -40)";
  const [sales, profits] = STAGE_NOTES[stage];
  const [mx, ms, mp] = STAGE_MID[stage];
  const cx = sx(mx);
  /** Centre a label near the band, kept inside the canvas. */
  const at = (text: string) => {
    const half = (text.length * 8.2) / 2;
    return Math.round(Math.min(Math.max(cx, 20 + half), 380 - half));
  };
  return (
    <Frame width={400} height={250} label={`The product life cycle in miniature with the ${PLC_STAGES[stage].toLowerCase()} stage lit. Above, a leader points to the lit sales curve: ${sales.toLowerCase()}. Below, a leader points to the lit profits curve: ${profits.toLowerCase()}.`}>
      <defs>
        <clipPath id={clip}>
          <rect x={x0} y={48} width={r2(x1 - x0)} height={158} />
        </clipPath>
      </defs>
      <rect x={x0} y={48} width={r2(x1 - x0)} height={158} fill={SIGNAL_TINT} />
      {PLC_BOUNDS.slice(1, -1).map((x) => (
        <line key={x} x1={sx(x)} y1={48} x2={sx(x)} y2={206} stroke={RULE2} strokeWidth={1} strokeDasharray="3 4" />
      ))}
      <line x1={20} y1={sy(220)} x2={382} y2={sy(220)} stroke={INK3} strokeWidth={1} />

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

      <Key x={cx} y={16} anchor="middle" fill={SIGNAL} size={10.5}>
        {PLC_STAGES[stage]}
      </Key>
      <Key x={at(sales)} y={38} anchor="middle" fill={INK} size={10.5}>
        {sales}
      </Key>
      <line x1={cx} y1={43} x2={cx} y2={r2(sy(ms) - 5)} stroke={INK} strokeWidth={1} />
      <Key x={at(profits)} y={240} anchor="middle" fill={SIGNAL} size={10.5}>
        {profits}
      </Key>
      <line x1={cx} y1={229} x2={cx} y2={r2(sy(mp) + 5)} stroke={SIGNAL} strokeWidth={1} />
    </Frame>
  );
}

/* ==========================================================================
   13 · AWARENESS AND TRIAL — the introduction goal (400)
   ========================================================================== */

export function AwarenessTrial() {
  return (
    <Frame width={400} height={150} label="A new product, then an eye that sees it: product awareness. Then a person holding it: trial.">
      <g transform="translate(0 -44)">
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
      </g>
    </Frame>
  );
}

/* ==========================================================================
   14 · SHARE AND ENTRANTS — growth: maximize share as competitors arrive (400)
   ========================================================================== */

export function ShareGrowth() {
  const rivals = [277, 318, 359];
  return (
    <Frame width={400} height={186} label="A market drawn as a bar. The firm, a building below it, fills a large share from the left and an arrow pushes it further: maximizing market share. Three competitor buildings arrive from below and each takes a small slice at the right: competition enters.">
      <Key x={20} y={22} fill={INK} size={10}>
        THE MARKET
      </Key>
      <rect x={20} y={32} width={360} height={40} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <rect x={20.75} y={32.75} width={200} height={38.5} fill={SIGNAL} />
      <line x1={36} y1={52} x2={204} y2={52} stroke={PAPER} strokeWidth={1.75} />
      <path d={head2.right(206, 52)} fill="none" stroke={PAPER} strokeWidth={1.75} />
      {rivals.map((x) => (
        <g key={x}>
          <rect x={x - 17} y={36} width={34} height={32} fill="var(--paper-3)" stroke={INK3} strokeWidth={1.25} />
          <Arrow1 x1={x} y1={120} x2={x} y2={78} tone={INK3} width={1.25} />
          <Company1 cx={x} base={156} w={26} h={22} tone={INK3} />
        </g>
      ))}
      <Arrow1 x1={50} y1={120} x2={50} y2={78} tone={SIGNAL} width={1.5} />
      <Company1 cx={50} base={156} w={34} h={26} tone={INK} lit />
      <Key x={82} y={136} fill={SIGNAL} size={10}>
        MAXIMIZING
      </Key>
      <Key x={82} y={150} fill={SIGNAL} size={10}>
        MARKET SHARE
      </Key>
      <Key x={380} y={178} anchor="end" fill={INK3} size={10}>
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
    <Frame width={400} height={214} label="A product under a protective dome. Two competitor buildings aim arrows at the dome from the left and the right: competition. Beside the dome, three stacks of coins grow taller: increased marketing outlays.">
      <Key x={200} y={24} anchor="middle" fill={INK3} size={10}>
        COMPETITION
      </Key>
      <Company1 cx={44} base={64} w={36} h={28} tone={INK3} />
      <Company1 cx={356} base={64} w={36} h={28} tone={INK3} />
      <Arrow1 x1={72} y1={62} x2={148} y2={100} tone={INK3} width={1.75} />
      <Arrow1 x1={328} y1={62} x2={252} y2={100} tone={INK3} width={1.75} />
      <path d="M150 160 V110 Q220 50 290 110 V160" fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={3} strokeLinejoin="round" />
      <Pack2 x={220} y={160} w={52} h={50} tone={INK} />
      <line x1={20} y1={160} x2={380} y2={160} stroke={INK} strokeWidth={1.25} />
      <Coins2 x={46} y={159} n={2} w={26} tone={SIGNAL} />
      <Coins2 x={80} y={159} n={4} w={26} tone={SIGNAL} />
      <Coins2 x={114} y={159} n={6} w={26} tone={SIGNAL} />
      <Key x={20} y={190} fill={SIGNAL} size={10}>
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
    <Frame height={226} label="A declining sales line ends at a product. From it, three routes fan out. Maintain: the line carries on level to the product. Harvest: the line turns dashed while stacks of coins are collected along it. Drop: the line stops at a cross and the product falls away.">
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

      <Key x={444} y={46} fill={COUNTER} size={10.5}>
        MAINTAIN
      </Key>
      <line x1={444} y1={60} x2={720} y2={60} stroke={COUNTER} strokeWidth={2.5} />
      <Pack2 x={746} y={76} w={32} h={30} tone={COUNTER} />

      <Key x={444} y={116} fill={SIGNAL} size={10.5}>
        HARVEST
      </Key>
      <line x1={444} y1={130} x2={770} y2={130} stroke={INK3} strokeWidth={1.5} strokeDasharray="6 6" />
      {[560, 640, 720].map((x) => (
        <Coins2 key={x} x={x} y={124} n={3} w={26} tone={SIGNAL} />
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
        <Company1 key={x} cx={x} base={238} w={24} h={20} tone={COUNTER} />
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
      <Coins2 x={470} y={120} n={5} w={28} tone={SIGNAL} />
      <Coins2 x={504} y={120} n={3} w={28} tone={SIGNAL} />
      <Wrench x={614} y={62} size={52} weight="duotone" color={INK} />
      <line x1={610} y1={58} x2={670} y2={118} stroke={SIGNAL} strokeWidth={2.25} />
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
    <Frame height={236} label="Three life cycle curves in a row over time. Each new one rises while the one before it declines, so sales carry on as products are replaced.">
      <line x1={20} y1={196} x2={790} y2={196} stroke={INK3} strokeWidth={1.25} />
      <path d={head2.right(792, 196)} fill="none" stroke={INK3} strokeWidth={1.25} />
      <Key x={790} y={220} anchor="end" fill={INK3} size={9}>
        TIME
      </Key>
      <path d={hump(26)} fill="none" stroke={INK3} strokeWidth={2.25} />
      <path d={hump(226)} fill="none" stroke={INK} strokeWidth={2.25} />
      <path d={hump(426)} fill="none" stroke={SIGNAL} strokeWidth={2.5} />
      <Key x={196} y={46} anchor="middle" fill={INK3} size={9.5}>
        DECLINING PRODUCT
      </Key>
      <Key x={596} y={46} anchor="middle" fill={SIGNAL} size={9.5}>
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
  const base = 124;
  /** The product before the change, faint, left of centre. */
  const before = (cx: number) => <Pack2 x={cx - 46} y={base} w={46} h={54} tone={INK3} />;
  const arrow = (cx: number) => <Arrow1 x1={cx - 16} y1={97} x2={cx + 12} y2={97} tone={INK3} width={1.25} />;
  const ax = (cx: number) => cx + 46;
  return (
    <Frame height={150} label="Four panels, each a before and after. Original products: from an empty dashed outline to a brand-new package with a star. Improvements: a package becomes the same package with a plus badge. Modifications: a package becomes one with a changed, slanted top. New brands: a package becomes the same package with a new brand tag.">
      <g transform="translate(0 -44)">
      {[200, 400, 600].map((x) => (
        <line key={x} x1={x} y1={58} x2={x} y2={176} stroke={RULE} strokeWidth={1} />
      ))}
      {/* original: from nothing */}
      <rect x={cols[0] - 69} y={base - 54} width={46} height={54} fill="none" stroke={INK3} strokeWidth={1.25} strokeDasharray="4 3" />
      {arrow(cols[0])}
      <Pack2 x={ax(cols[0])} y={base} w={46} h={54} tone={SIGNAL} fill={SIGNAL_TINT} />
      <Star1 x={ax(cols[0])} y={101} k={0.62} />
      {/* improvement: the same product, made better */}
      {before(cols[1])}
      {arrow(cols[1])}
      <Pack2 x={ax(cols[1])} y={base} w={46} h={54} tone={INK} />
      <circle cx={ax(cols[1]) + 23} cy={base - 54} r={11} fill={SIGNAL} />
      <path d={`M${ax(cols[1]) + 17} ${base - 54} H${ax(cols[1]) + 29} M${ax(cols[1]) + 23} ${base - 60} V${base - 48}`} stroke={PAPER} strokeWidth={2.25} />
      {/* modification: the same product, its form changed */}
      {before(cols[2])}
      {arrow(cols[2])}
      <path d={`M${ax(cols[2]) - 23} ${base} V${base - 46} L${ax(cols[2]) + 23} ${base - 62} V${base} Z`} fill={PAPER} stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
      <path d={`M${ax(cols[2]) - 23} ${base - 46} L${ax(cols[2]) + 23} ${base - 62}`} stroke={SIGNAL} strokeWidth={3} />
      {/* new brand: the same product under a new brand */}
      {before(cols[3])}
      {arrow(cols[3])}
      <Pack2 x={ax(cols[3])} y={base} w={46} h={54} tone={INK} />
      <path d={`M${ax(cols[3]) + 14} ${base - 46} L${ax(cols[3]) + 26} ${base - 36}`} stroke={SIGNAL} strokeWidth={1.25} />
      <path d={`M${ax(cols[3]) + 20} ${base - 38} H${ax(cols[3]) + 42} L${ax(cols[3]) + 45} ${base - 12} H${ax(cols[3]) + 23} Z`} fill={SIGNAL} strokeLinejoin="round" />
      <Star1 x={ax(cols[3]) + 33} y={base - 25} k={0.36} fill={PAPER} />

      {[
        ["ORIGINAL", "PRODUCTS"],
        ["IMPROVEMENTS", ""],
        ["MODIFICATIONS", ""],
        ["NEW", "BRANDS"],
      ].map(([a, b], i) => (
        <g key={a}>
          <Key x={cols[i]} y={b ? 154 : 161} anchor="middle" fill={INK} size={10.5}>
            {a}
          </Key>
          {b ? (
            <Key x={cols[i]} y={169} anchor="middle" fill={INK} size={10.5}>
              {b}
            </Key>
          ) : null}
        </g>
      ))}
      </g>
    </Frame>
  );
}

/* ==========================================================================
   20 · LAUNCH LANES — many new products fail in the marketplace (400)
   ========================================================================== */

export function LaunchRisk() {
  const survivors = [2, 6];
  return (
    <Frame width={400} height={214} label="Nine new products, small packages, set off towards the marketplace. Seven stop at a cross before they reach it: many new products fail. Two make it into the marketplace.">
      <Key x={20} y={22} fill={INK} size={10}>
        NEW PRODUCTS
      </Key>
      <Key x={276} y={22} fill={INK} size={10}>
        MARKETPLACE
      </Key>
      <rect x={266} y={32} width={124} height={158} fill="var(--paper-3)" />
      <line x1={266} y1={32} x2={266} y2={190} stroke={INK} strokeWidth={1.75} />
      {Array.from({ length: 9 }, (_, i) => {
        const y = 42 + i * 18;
        const ok = survivors.includes(i);
        const stop = 196 + Math.round(hash2(i + 3) * 50);
        return ok ? (
          <g key={i}>
            <Pack2 x={28} y={y + 6} w={13} h={12} tone={INK} />
            <line x1={38} y1={y} x2={346} y2={y} stroke={INK} strokeWidth={1.25} />
            <Pack2 x={362} y={y + 6} w={15} h={13} tone={INK} />
          </g>
        ) : (
          <g key={i}>
            <Pack2 x={28} y={y + 6} w={13} h={12} tone={INK3} />
            <line x1={38} y1={y} x2={stop} y2={y} stroke={INK3} strokeWidth={1.25} />
            <path d={`M${stop + 3} ${y - 5} L${stop + 13} ${y + 5} M${stop + 13} ${y - 5} L${stop + 3} ${y + 5}`} stroke={SIGNAL} strokeWidth={1.75} />
          </g>
        );
      })}
      <Key x={20} y={208} fill={SIGNAL} size={10}>
        HIGH RISK
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   21 · NPD STAIRCASE — the eight steps as a cascading flow
   ========================================================================== */

export const NPD_STEPS = [
  ["Idea", "generation"],
  ["Idea", "screening"],
  ["Concept", "development", "and testing"],
  ["Marketing", "strategy", "development"],
  ["Business", "analysis"],
  ["Product", "development"],
  ["Test", "marketing"],
  ["Commercialization"],
];

export function NpdStaircase({ active }: { active: number[] }) {
  const names = NPD_STEPS.map((l) => l.join(" ").toLowerCase());
  return (
    <Frame height={150} label={`A cascading flow of eight steps, each a little lower than the one before: ${names.join(", ")}. Steps ${active.map((a) => a + 1).join(", ")} are lit.`}>
      {NPD_STEPS.map((lines, i) => {
        const x = 6 + i * 99;
        const y = 8 + i * 9;
        const on = active.includes(i);
        return (
          <g key={i}>
            <rect x={x} y={y} width={92} height={70} fill={on ? SIGNAL_TINT : PAPER} stroke={on ? SIGNAL : INK3} strokeWidth={on ? 1.75 : 1.25} />
            <Display x={x + 7} y={y + 20} fill={on ? SIGNAL : INK3} size={14}>
              {`0${i + 1}`}
            </Display>
            {lines.map((l, j) => (
              <Note key={l} x={x + 6} y={y + 38 + j * 12} fill={on ? INK : INK3} size={9.5}>
                {l}
              </Note>
            ))}
            {i < NPD_STEPS.length - 1 ? (
              <g>
                <line x1={x + 92} y1={y + 44} x2={x + 98} y2={y + 44} stroke={INK3} strokeWidth={1.25} />
                <path d={headAlong1(x + 99, y + 44, 1, 0, 5)} fill="none" stroke={INK3} strokeWidth={1.25} />
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
    x: Math.round(28 + (i % 4) * 27 + (hash2(i + 11) - 0.5) * 3),
    y: Math.round(58 + Math.floor(i / 4) * 38 + (hash2(i + 31) - 0.5) * 6),
  }));
  return (
    <Frame width={400} height={214} label="Twelve light bulbs, many ideas, pass into a funnel. Three drop out beneath it. Two come out the other side as new concepts.">
      {cluster.map((b, i) => (
        <Bulb2 key={i} x={b.x} y={b.y} k={0.7} tone={INK} fill={PAPER} />
      ))}
      <Arrow1 x1={124} y1={96} x2={146} y2={96} tone={INK3} />
      <path d="M154 40 L216 80 H250 V112 H216 L154 152 Z" fill="var(--paper-3)" stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
      <Arrow1 x1={256} y1={96} x2={284} y2={96} tone={SIGNAL} />
      <Bulb2 x={308} y={92} k={0.8} />
      <Bulb2 x={344} y={92} k={0.8} />
      {[
        [182, 168],
        [206, 176],
        [230, 168],
      ].map(([x, y]) => (
        <Bulb2 key={x} x={x} y={y} k={0.6} tone={RULE2} fill={PAPER} />
      ))}
      <Key x={70} y={204} anchor="middle" fill={INK} size={10}>
        SOURCING
      </Key>
      <Key x={206} y={204} anchor="middle" fill={INK} size={10}>
        FILTERING
      </Key>
      <Key x={326} y={204} anchor="middle" fill={SIGNAL} size={10}>
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
    <Frame width={400} height={190} label="A concept card, a sketched package and some lines of description, is shown to a group of four target consumers. Two respond with speech bubbles: a tick and a question mark.">
      <rect x={20} y={40} width={130} height={104} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <rect x={36} y={56} width={40} height={44} fill="none" stroke={SIGNAL} strokeWidth={1.5} strokeDasharray="4 3" />
      <path d="M88 62 H134 M88 76 H130 M88 90 H122 M36 118 H134 M36 130 H112" stroke={INK3} strokeWidth={1.25} />
      <Key x={85} y={176} anchor="middle" fill={INK} size={9.5}>
        THE IDEA
      </Key>
      <Arrow1 x1={160} y1={96} x2={196} y2={96} tone={INK3} />
      {[228, 268, 308, 348].map((x) => (
        <Person3 key={x} x={x} y={150} k={1.35} stroke={COUNTER} />
      ))}
      <rect x={210} y={38} width={40} height={30} rx={6} fill={PAPER} stroke={INK} strokeWidth={1.25} />
      <path d="M222 68 L226 78 L232 68" fill={PAPER} stroke={INK} strokeWidth={1.25} strokeLinejoin="round" />
      <path d="M221 53 L228 60 L240 46" fill="none" stroke={COUNTER} strokeWidth={2} />
      <rect x={330} y={38} width={40} height={30} rx={6} fill={PAPER} stroke={INK} strokeWidth={1.25} />
      <path d="M342 68 L346 78 L352 68" fill={PAPER} stroke={INK} strokeWidth={1.25} strokeLinejoin="round" />
      <Display x={350} y={62} anchor="middle" fill={INK} size={20}>
        ?
      </Display>
      <Key x={288} y={176} anchor="middle" fill={COUNTER} size={9.5}>
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
    <Frame width={400} height={200} label="A document headed with a solid bar and three outlined sections, the last one half written, with a pencil still writing it: the initial marketing strategy for the new product.">
      <rect x={110} y={16} width={170} height={150} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <rect x={110.75} y={16.75} width={168.5} height={20} fill={INK} />
      {[58, 94, 130].map((y, i) => (
        <g key={y}>
          <circle cx={130} cy={y} r={5} fill={SIGNAL} />
          <path d={i < 2 ? `M144 ${y - 3} H258 M144 ${y + 7} H226` : `M144 ${y - 3} H200 M144 ${y + 7} H190`} stroke={INK3} strokeWidth={1.25} />
        </g>
      ))}
      <g transform="translate(219.7 121) rotate(60)">
        <rect x={-6} y={-30} width={12} height={46} fill={PAPER} stroke={INK} strokeWidth={1.5} />
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
        <path d="M330 70 L352 50 V130 L330 150 Z" fill="var(--paper-3)" stroke={SIGNAL} strokeWidth={1.75} />
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
      <rect x={16} y={30} width={368} height={150} fill="none" stroke={INK3} strokeWidth={1.25} strokeDasharray="5 4" />
      <Key x={24} y={21} fill={INK} size={9.5}>
        REALISTIC MARKET SETTINGS
      </Key>
      <Megaphone x={146} y={56} waves={3} tone={SIGNAL} />
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
      <Key x={140} y={204} anchor="middle" fill={SIGNAL} size={9.5}>
        PRODUCT AND MARKETING PROGRAM
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   28 · LAUNCH — commercialization: into the market (400)
   ========================================================================== */

export function Launch() {
  const ox = 66;
  const oy = 118;
  const pins = [-30, -15, 0, 15, 30].map((deg) => {
    const c = Math.cos((deg * Math.PI) / 180);
    const n = Math.sin((deg * Math.PI) / 180);
    return {
      x: r2(ox + 250 * c),
      y: r2(oy + 160 * n),
      sx: r2(ox + 46 * c),
      sy: r2(oy + 46 * n),
      ex: r2(ox + 240 * c),
      ey: r2(oy + 153 * n),
    };
  });
  return (
    <Frame width={400} height={214} label="The new product at the left sends five dashed lines out to five map pins spread in an arc across the market.">
      <Pack2 x={66} y={154} w={70} h={72} tone={SIGNAL} fill={SIGNAL_TINT} />
      {pins.map((p) => (
        <g key={p.y}>
          <line x1={p.sx} y1={p.sy} x2={p.ex} y2={p.ey} stroke={INK3} strokeWidth={1} strokeDasharray="3 3" />
          <path d={`M${p.x} ${p.y} C${r2(p.x - 6)} ${r2(p.y - 8)} ${r2(p.x - 11)} ${r2(p.y - 13)} ${r2(p.x - 11)} ${r2(p.y - 19)} A11 11 0 0 1 ${r2(p.x + 11)} ${r2(p.y - 19)} C${r2(p.x + 11)} ${r2(p.y - 13)} ${r2(p.x + 6)} ${r2(p.y - 8)} ${p.x} ${p.y} Z`} fill={SIGNAL} />
          <circle cx={p.x} cy={r2(p.y - 19)} r={4} fill={PAPER} />
        </g>
      ))}
      <Key x={66} y={180} anchor="middle" fill={SIGNAL} size={9.5}>
        NEW PRODUCT
      </Key>
      <Key x={384} y={206} anchor="end" fill={INK} size={9.5}>
        THE MARKET
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
      <Star1 x={438} y={152} k={0.95} fill={COUNTER} />
      {[196, 210, 224].map((y) => (
        <path key={y} d={`M321 ${y} Q360 ${y - 10} 400 ${y} T479 ${y}`} fill="none" stroke={COUNTER} strokeWidth={1.75} />
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
      <path d="M652 230 V178 L682 160 V178 L712 160 V178 L742 160 V120 H762 V230 Z" fill="var(--paper-3)" stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
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
    <Frame height={256} label="A comparison. Two identical packages: one with its brand name hidden, one showing it. Beside each, a bar for customer response to the product or its marketing. The bar for the named package is longer; the gap between the bars is marked as the differential effect: brand equity.">
      <Key x={150} y={30} fill={INK} size={9.5}>
        CUSTOMER RESPONSE TO THE PRODUCT OR ITS MARKETING
      </Key>

      <line x1={390} y1={84} x2={390} y2={212} stroke={INK} strokeWidth={1} strokeDasharray="3 4" />
      <Pack2 x={80} y={126} w={62} h={70} tone={INK} />
      <path d="M62 94 H98 M62 106 H90" stroke={RULE2} strokeWidth={3} strokeLinecap="round" />
      <Key x={150} y={70} fill={INK3} size={9.5}>
        BRAND NAME HIDDEN
      </Key>
      <rect x={150} y={84} width={240} height={26} fill={INK3} />

      <Pack2 x={80} y={222} w={62} h={70} tone={INK} />
      <Display x={80} y={196} anchor="middle" fill={SIGNAL} size={14}>
        Brand
      </Display>
      <Key x={150} y={166} fill={SIGNAL} size={9.5}>
        KNOWING THE BRAND NAME
      </Key>
      <rect x={150} y={180} width={420} height={26} fill={SIGNAL} />

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
            <Key x={236} y={y + 4} fill={INK} size={10.5}>
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
  /** A package carrying its brand owner's mark. */
  const pack = (cx: number, base: number, mark: React.ReactNode) => (
    <g>
      <Pack2 x={cx} y={base} w={44} h={52} tone={INK} />
      {mark}
    </g>
  );
  return (
    <Frame width={400} height={232} label="Four cells. Manufacturer brand: a factory and a package carrying the factory's mark. Private brand: a store and a package carrying the store's mark. Licensed brand: a star character lent across to a package. Co-branding: one package carrying two different brand marks.">
      <line x1={200} y1={10} x2={200} y2={222} stroke={RULE} strokeWidth={1} />
      <line x1={10} y1={116} x2={390} y2={116} stroke={RULE} strokeWidth={1} />

      <Factory3 x={62} y={82} k={0.9} fill="var(--paper-3)" />
      <Arrow1 x1={92} y1={60} x2={112} y2={60} tone={INK3} width={1.25} />
      {pack(142, 82, <Factory3 x={141} y={72} k={0.38} tone={COUNTER} fill={COUNTER} />)}

      <Store2 x={256} y={82} k={0.95} fill="var(--paper-3)" />
      <Arrow1 x1={292} y1={60} x2={312} y2={60} tone={INK3} width={1.25} />
      {pack(342, 82, <Store2 x={342} y={73} k={0.4} tone={COUNTER} fill={COUNTER} />)}

      <circle cx={66} cy={164} r={20} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.5} />
      <Star1 x={66} y={165} k={0.7} fill={COUNTER} />
      <Arrow1 x1={92} y1={164} x2={112} y2={164} tone={INK3} width={1.25} />
      {pack(142, 192, <Star1 x={142} y={172} k={0.55} fill={COUNTER} />)}

      {pack(300, 192, (
        <g>
          <Star1 x={289} y={172} k={0.42} fill={COUNTER} />
          <path d="M311 164 L318 172 L311 180 L304 172 Z" fill={INK} />
        </g>
      ))}

      {[
        [100, 106, "MANUFACTURER BRAND"],
        [300, 106, "PRIVATE BRAND"],
        [100, 214, "LICENSED BRAND"],
        [300, 214, "CO-BRANDING"],
      ].map(([x, y, name]) => (
        <Key key={name as string} x={x as number} y={y as number} anchor="middle" fill={INK} size={9.5}>
          {name as string}
        </Key>
      ))}
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
        <path d="M340 60 L362 40 V160 L340 180 Z" fill="var(--paper-3)" stroke={SIGNAL} strokeWidth={1.75} />
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
    <Frame width={400} height={244} label="A jar with a label. Four callouts: the brand name identifies the product; a grade badge grades it; lines of text describe it; an attractive graphic promotes it.">
      <g transform="translate(-200 0)">
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
      <Key x={510} y={152} fill={INK} size={10.5}>
        GRADES
      </Key>
      <line x1={502} y1={148} x2={462} y2={148} stroke={INK3} strokeWidth={1} />
      <Key x={510} y={196} fill={INK} size={10.5}>
        PROMOTES
      </Key>
      <line x1={502} y1={192} x2={414} y2={188} stroke={INK3} strokeWidth={1} />
      </g>
    </Frame>
  );
}

/* ==========================================================================
   38 · WHAT IS SOLD — activities, benefits, satisfactions (400)
   ========================================================================== */

export function ServiceForms() {
  return (
    <Frame width={400} height={170} label="Three things offered for sale, gathered by a bracket over one price tag: an activity, a person in motion; a benefit, a gift; a satisfaction, a smiling face.">
      <g transform="translate(0 -44)">
        <path d="M40 80 H22 M44 96 H18 M40 112 H24" stroke={INK3} strokeWidth={1.5} strokeLinecap="round" />
        <Person3 x={70} y={124} k={1.8} />
        <Gift x={166} y={58} size={68} weight="duotone" color={COUNTER} />
        <circle cx={330} cy={92} r={30} fill={PAPER} stroke={INK} strokeWidth={1.75} />
        <circle cx={320} cy={84} r={3} fill={INK} />
        <circle cx={340} cy={84} r={3} fill={INK} />
        <path d="M314 100 Q330 116 346 100" fill="none" stroke={INK} strokeWidth={2.25} strokeLinecap="round" />
        {[
          [70, "ACTIVITIES"],
          [200, "BENEFITS"],
          [330, "SATISFACTIONS"],
        ].map(([x, k]) => (
          <Key key={k as string} x={x as number} y={150} anchor="middle" fill={INK} size={10}>
            {k as string}
          </Key>
        ))}
        <path d="M30 162 V170 H370 V162" fill="none" stroke={INK} strokeWidth={1.25} />
        <PriceTag x={150} y={196} tone={SIGNAL} variant={0} />
        <Key x={194} y={200} fill={SIGNAL} size={10}>
          OFFERED FOR SALE
        </Key>
      </g>
    </Frame>
  );
}

/* ==========================================================================
   39 · NOTHING TO TAKE HOME — services do not result in ownership
   ========================================================================== */

export function NoOwnership() {
  return (
    <Frame width={400} height={262} label="Two rows. A physical object: a package, then a person walking away carrying it, ownership. A service, a night in a hotel bed: the person walks away with empty hands and only a dashed outline where an object would be. Intangible; no ownership.">
      <Key x={20} y={22} fill={INK} size={9.5}>
        A PHYSICAL OBJECT
      </Key>
      <Pack2 x={72} y={108} w={60} h={60} tone={INK} fill={PAPER2} />
      <Arrow1 x1={116} y1={80} x2={170} y2={80} tone={INK3} />
      <Person3 x={220} y={108} k={2} />
      <Pack2 x={252} y={100} w={24} h={28} tone={INK} fill={PAPER2} />
      <Key x={288} y={84} fill={INK} size={9.5}>
        OWNERSHIP
      </Key>

      <line x1={20} y1={128} x2={380} y2={128} stroke={RULE} strokeWidth={1} />

      <Key x={20} y={152} fill={COUNTER} size={9.5}>
        A SERVICE
      </Key>
      <path d="M112 164 A13 13 0 1 0 124 184 A10 10 0 1 1 112 164 Z" fill={COUNTER} />
      <g strokeLinejoin="round">
        <path d="M26 236 V186" stroke={COUNTER} strokeWidth={2} />
        <rect x={26} y={210} width={96} height={14} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.5} />
        <rect x={33} y={198} width={26} height={12} rx={4} fill={PAPER} stroke={COUNTER} strokeWidth={1.5} />
        <path d="M122 224 V236 M26 224 H122" stroke={COUNTER} strokeWidth={2} />
      </g>
      <Key x={74} y={254} anchor="middle" fill={COUNTER} size={9.5}>
        INTANGIBLE
      </Key>
      <Arrow1 x1={136} y1={208} x2={170} y2={208} tone={INK3} />
      <Person3 x={220} y={236} k={2} />
      <rect x={240} y={200} width={24} height={28} fill="none" stroke={SIGNAL} strokeWidth={1.5} strokeDasharray="4 3" />
      <Key x={288} y={212} fill={SIGNAL} size={9.5}>
        NO OWNERSHIP
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   40 · SHARE OF THE ECONOMY — services growing and dominating (400)
   ========================================================================== */

export function ServiceEconomy() {
  const share = [0.3, 0.42, 0.54, 0.66, 0.78];
  return (
    <Frame width={400} height={196} label="Five columns along a time line, each an economy split into services and goods. In each, the services part is larger than in the one before, until services fill most of the column: growing rapidly and dominating.">
      <Key x={24} y={24} fill={COUNTER} size={10}>
        GROWING RAPIDLY
      </Key>
      {share.map((sh, i) => {
        const x = 24 + i * 54;
        const h = Math.round(120 * sh);
        return (
          <g key={x}>
            <rect x={x} y={40} width={40} height={120 - h} fill="var(--paper-3)" stroke={INK3} strokeWidth={1} />
            <rect x={x} y={160 - h} width={40} height={h} fill={COUNTER} />
          </g>
        );
      })}
      <line x1={16} y1={160.5} x2={272} y2={160.5} stroke={INK} strokeWidth={1.25} />
      <line x1={16} y1={176} x2={268} y2={176} stroke={INK3} strokeWidth={1} />
      <path d={head2.right(270, 176)} fill="none" stroke={INK3} strokeWidth={1} />
      <Key x={280} y={180} fill={INK3} size={9}>
        TIME
      </Key>
      <Key x={292} y={60} fill={INK3} size={10}>
        GOODS
      </Key>
      <Key x={292} y={120} fill={COUNTER} size={10}>
        SERVICES
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   41 · HUB AND SPOKES — the four characteristics of services
   ========================================================================== */

export function ServiceHub() {
  const nodes = [
    { x: 120, y: 80, name: "INTANGIBILITY", end: [159.35, 99.68], start: [264.55, 152.27] },
    { x: 520, y: 80, name: "INSEPARABILITY", end: [480.65, 99.68], start: [375.45, 152.27] },
    { x: 120, y: 280, name: "VARIABILITY", end: [159.35, 260.32], start: [264.55, 207.73] },
    { x: 520, y: 280, name: "PERISHABILITY", end: [480.65, 260.32], start: [375.45, 207.73] },
  ];
  /** One service outcome as a small face; `mood` bends the mouth. */
  const face = (x: number, mood: number) => (
    <g key={x}>
      <circle cx={x} cy={280} r={10} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <circle cx={x - 3.5} cy={277} r={1.4} fill={INK} />
      <circle cx={x + 3.5} cy={277} r={1.4} fill={INK} />
      <path d={`M${x - 5} ${284 - mood} Q${x} ${284 + mood * 2} ${x + 5} ${284 - mood}`} fill="none" stroke={INK} strokeWidth={1.4} strokeLinecap="round" />
    </g>
  );
  return (
    <Frame width={640} height={360} label="A hub labelled services with four spokes. Intangibility: an eye struck through. Inseparability: a provider and a customer joined. Variability: three faces, one pleased, one neutral, one unhappy. Perishability: an hourglass running out.">
      {nodes.map((n) => (
        <line key={n.name} x1={n.start[0]} y1={n.start[1]} x2={n.end[0]} y2={n.end[1]} stroke={SIGNAL} strokeWidth={1.75} />
      ))}
      <circle cx={320} cy={180} r={62} fill={SIGNAL} />
      <Key x={320} y={185} anchor="middle" fill={PAPER} size={12}>
        SERVICES
      </Key>
      {nodes.map((n, i) => (
        <g key={n.name}>
          <circle cx={n.x} cy={n.y} r={44} fill={PAPER} stroke={INK} strokeWidth={1.75} />
          <Key x={n.x} y={i < 2 ? 24 : 346} anchor="middle" fill={INK} size={11}>
            {n.name}
          </Key>
        </g>
      ))}

      <g transform="translate(-30 0)">
        {/* intangibility: an eye struck through */}
        <path d="M122 80 Q150 56 178 80 Q150 104 122 80 Z" fill="none" stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
        <circle cx={150} cy={80} r={7} fill={INK} />
        <line x1={128} y1={102} x2={172} y2={58} stroke={SIGNAL} strokeWidth={2.25} />

        {/* variability: the same service, three different results */}
        {face(126, -2.5)}
        {face(150, 0)}
        {face(174, 2.5)}
      </g>

      <g transform="translate(-130 0)">
        {/* inseparability: provider and customer joined */}
        <Person3 x={634} y={104} k={1.15} stroke={COUNTER} />
        <Person3 x={666} y={104} k={1.15} stroke={INK} />
        <rect x={640} y={86} width={20} height={6} fill={SIGNAL} />

        {/* perishability: an hourglass */}
        <path d="M634 256 H666 L650 280 L666 304 H634 L650 280 Z" fill={PAPER} stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
        <path d="M644 265 H656 L650 274 Z" fill={SIGNAL} />
        <path d="M638 302 Q650 290 662 302 Z" fill={SIGNAL} />
      </g>
    </Frame>
  );
}

/* ==========================================================================
   42 · ACROSS THE COUNTER — customer and frontline employee (400)
   ========================================================================== */

export function FrontlineInteraction() {
  return (
    <Frame width={400} height={140} label="A frontline employee and a customer face each other across a counter. A two-way arrow between them marks the interaction.">
      <g transform="translate(0 -66)">
      <Person3 x={110} y={172} k={2.2} stroke={COUNTER} />
      <Person3 x={290} y={172} k={2.2} />
      <rect x={160} y={124} width={80} height={48} fill="var(--paper-3)" stroke={INK} strokeWidth={1.5} />
      <line x1={140} y1={100} x2={260} y2={100} stroke={SIGNAL} strokeWidth={2} />
      <path d={head2.right(262, 100)} fill="none" stroke={SIGNAL} strokeWidth={2} />
      <path d={head2.left(138, 100)} fill="none" stroke={SIGNAL} strokeWidth={2} />
      <line x1={60} y1={172.5} x2={340} y2={172.5} stroke={INK} strokeWidth={1.25} />
      <Key x={200} y={88} anchor="middle" fill={SIGNAL} size={9.5}>
        INTERACTION
      </Key>
      <Key x={110} y={194} anchor="middle" fill={COUNTER} size={9.5}>
        FRONTLINE EMPLOYEE
      </Key>
      <Key x={290} y={194} anchor="middle" fill={INK} size={9.5}>
        CUSTOMER
      </Key>
      </g>
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
    <Frame width={400} height={164} label="The firm, a building, sends arrows to its customer-contact employees to orient and motivate them. The employees then face the customers.">
      <g transform="translate(0 -36)">
      <Company1 cx={60} base={142} w={64} h={52} tone={INK} />
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
      </g>
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
    <Frame height={296} label="A plane seen from above with 180 seats. Fifty of them are empty, drawn in outline, and a label points to one: 50 empty seats. Below, a timeline: now, then 24 hours until the plane takes off, after which the revenue from those seats is gone forever.">
      <Key x={112} y={30} fill={SIGNAL} size={10.5}>
        50 EMPTY SEATS
      </Key>
      <line x1={130} y1={36} x2={130} y2={72} stroke={SIGNAL} strokeWidth={1} />
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

      <Coins2 x={160} y={139} n={4} w={30} tone={SIGNAL} />
      <Coins2 x={198} y={139} n={3} w={30} tone={SIGNAL} />
      <PriceTag x={276} y={120} tone={SIGNAL} variant={0} />
      <Key x={220} y={176} anchor="middle" fill={SIGNAL} size={12}>
        IMMEDIATE NEED TO CAPTURE
      </Key>
      <Key x={220} y={194} anchor="middle" fill={SIGNAL} size={12}>
        PERISHABLE REVENUE
      </Key>

      <circle cx={540} cy={116} r={20} fill={PAPER} stroke={COUNTER} strokeWidth={1.75} />
      <path d="M540 104 V116 L549 122" fill="none" stroke={COUNTER} strokeWidth={1.75} strokeLinecap="round" />
      <PriceTag x={624} y={116} tone={COUNTER} variant={3} />
      <Key x={590} y={176} anchor="middle" fill={COUNTER} size={12}>
        LONG-TERM BRAND
      </Key>
      <Key x={590} y={194} anchor="middle" fill={COUNTER} size={12}>
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
