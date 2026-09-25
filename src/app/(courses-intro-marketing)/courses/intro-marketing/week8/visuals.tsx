/* ==========================================================================
   Week 08 — figures
   --------------------------------------------------------------------------
   Hand-drawn SVG plates, one grammar per idea: bars above and below a zero
   line for revenue and costs, a company wall with the price tag set into it,
   a floor and a ceiling for price, demand and elasticity charts, three lanes
   for the pricing approaches, two reversed chains, a stacked cost build-up,
   a field of view, a layered market for skimming and penetration, a price
   staircase for product lines, a puzzle fit for captive products, a bundle,
   and a fork for the coffee-pod dilemma.

   Conventions carried over from earlier weeks:
     · viewBox width 800 (400 for column plates), flat fills, hairline rules,
       no shadows or gradients
     · INK carries the neutral case, SIGNAL the operative one, COUNTER the
       contrast or outward-looking state
     · every label reuses words from the slide the plate sits on
     · integer coordinates only, so server and client render the same markup
   ========================================================================== */

import React from "react";
import {
  COUNTER,
  COUNTER_TINT,
  Display,
  Frame,
  glyphProps,
  headAlong1,
  INK,
  INK3,
  Key,
  PAPER,
  PAPER2,
  RULE,
  RULE2,
  SIGNAL,
  SIGNAL_TINT,
} from "../_visuals/kit";
import {
  Arrow1,
  Coins1,
  Eye1,
  Factory2,
  Flag1,
  Gift1,
  Head3,
  Laptop1,
  Pack3,
  Person3,
  Star1,
  Store1,
  Tag1,
  Truck1,
} from "../_visuals/objects";

/* -- shared glyphs --------------------------------------------------------- */

/** A service bell, centred on x, bottom at y. */
function Bell({ x, y, tone = INK }: { x: number; y: number; tone?: string }) {
  return (
    <g>
      <path d={`M${x - 18} ${y - 6} A18 18 0 0 1 ${x + 18} ${y - 6} Z`} fill={PAPER} stroke={tone} strokeWidth={1.5} />
      <rect x={x - 24} y={y - 6} width={48} height={6} fill={tone} />
      <path d={`M${x} ${y - 24} V${y - 30} M${x - 5} ${y - 30} H${x + 5}`} stroke={tone} strokeWidth={1.75} />
    </g>
  );
}

/* ==========================================================================
   0 · TITLE — price, the bottom line, and customer perception (600)
   ========================================================================== */

export function BottomLinePerception() {
  return (
    <Frame width={600} height={116} label="A price tag in the middle. An arrow to the left leads to a ledger with a double-ruled bottom line. An arrow to the right leads to an eye: customer perception.">
      <rect x={100} y={14} width={72} height={68} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <path d="M112 28 H160 M112 38 H160 M112 48 H150" stroke={INK3} strokeWidth={1} />
      <path d="M112 60 H160 M112 64 H160" stroke={INK} strokeWidth={1.25} />
      <line x1={126} y1={73} x2={160} y2={73} stroke={SIGNAL} strokeWidth={3} />
      <Arrow1 x1={244} y1={48} x2={190} y2={48} tone={INK3} />
      <Tag1 x={300} y={48} w={92} h={46} tone={SIGNAL} fill={SIGNAL_TINT} label="PRICE" size={11} width={2} />
      <Arrow1 x1={356} y1={48} x2={410} y2={48} tone={INK3} />
      <Eye1 x={466} y={48} k={1.2} />
      <Key x={136} y={106} anchor="middle" fill={INK} size={10.5}>
        THE BOTTOM LINE
      </Key>
      <Key x={466} y={106} anchor="middle" fill={COUNTER} size={10.5}>
        CUSTOMER PERCEPTION
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   1 · REVENUE AND COSTS — the only element of the mix that produces revenue
   ========================================================================== */

export function RevenueAndCosts() {
  const cols = [
    { x: 130, name: "Product" },
    { x: 310, name: "Price" },
    { x: 490, name: "Place" },
    { x: 670, name: "Promotion" },
  ];
  return (
    <Frame height={310} label="The four elements of the marketing mix as bars around a zero line. Price is the only bar that rises above the line, as revenue. Product, place, and promotion all fall below it, as costs.">
      <Display x={44} y={112} anchor="middle" fill={SIGNAL} size={26}>
        +
      </Display>
      <Display x={44} y={214} anchor="middle" fill={INK3} size={26}>
        −
      </Display>
      {cols.map((c) => {
        const isPrice = c.name === "Price";
        return (
          <g key={c.name}>
            {isPrice ? (
              <g>
                <rect x={c.x - 55} y={66} width={110} height={94} fill={SIGNAL} />
                <Key x={c.x} y={118} anchor="middle" fill={PAPER} size={10.5}>
                  REVENUE
                </Key>
                <Coins1 x={c.x} y={50} n={3} rx={14} tone={SIGNAL} />
              </g>
            ) : (
              <g>
                <rect x={c.x - 55} y={160} width={110} height={76} fill={PAPER2} stroke={INK3} strokeWidth={1.25} />
                <Key x={c.x} y={203} anchor="middle" fill={INK3} size={10.5}>
                  COSTS
                </Key>
              </g>
            )}
            <Display x={c.x} y={284} anchor="middle" fill={isPrice ? SIGNAL : INK} size={20}>
              {c.name}
            </Display>
          </g>
        );
      })}
      <line x1={64} y1={160} x2={766} y2={160} stroke={INK} strokeWidth={1.75} />
    </Frame>
  );
}

/* ==========================================================================
   2 · TIME TO CHANGE — price changes quickly, features and channels do not
   ========================================================================== */

export function ChangeSpeed() {
  const lanes = [
    { y: 72, name: "PRICE", w: 22, tone: SIGNAL },
    { y: 132, name: "PRODUCT FEATURES", w: 250, tone: INK },
    { y: 192, name: "CHANNEL COMMITMENTS", w: 490, tone: INK3 },
  ];
  return (
    <Frame height={250} label="Three lanes, each with a bar for how long a change takes. Price: a sliver, changed quickly. Product features: a long bar. Channel commitments: the longest bar.">
      {lanes.map((l) => (
        <g key={l.name}>
          <Key x={30} y={l.y + 4} fill={l.tone === INK3 ? INK : l.tone} size={10}>
            {l.name}
          </Key>
          <line x1={250} y1={l.y + 20} x2={766} y2={l.y + 20} stroke={RULE} strokeWidth={1} />
          <rect x={250} y={l.y - 10} width={l.w} height={24} fill={l.tone} />
        </g>
      ))}
      <Tag1 x={340} y={74} w={58} h={26} tone={INK3} label="$$$" size={9.5} strike />
      <Arrow1 x1={376} y1={74} x2={404} y2={74} tone={SIGNAL} width={1.25} />
      <Tag1 x={442} y={74} w={58} h={26} tone={SIGNAL} fill={SIGNAL_TINT} label="$$" size={9.5} />
      <Key x={486} y={78} fill={SIGNAL} size={9.5}>
        CHANGED QUICKLY
      </Key>
      <line x1={250} y1={226} x2={766} y2={226} stroke={INK3} strokeWidth={1.25} />
      <path d={headAlong1(768, 226, 1, 0)} fill="none" stroke={INK3} strokeWidth={1.25} />
      <line x1={250} y1={40} x2={250} y2={230} stroke={INK} strokeWidth={1.25} />
      <Key x={766} y={244} anchor="end" fill={INK3} size={9}>
        TIME TO CHANGE
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   3 · CHOICE AND SHARE — price decides buyer choice and market share (400)
   ========================================================================== */

export function ChoiceShare() {
  return (
    <Frame width={400} height={250} label="Two products with price tags. A buyer below chooses one of them. A bar at the bottom shows that product's market share.">
      <Tag1 x={120} y={24} w={58} h={26} tone={SIGNAL} fill={SIGNAL_TINT} label="$$" size={9.5} />
      <Pack3 x={120} y={96} w={52} h={50} tone={SIGNAL} fill={SIGNAL_TINT} />
      <Tag1 x={280} y={24} w={58} h={26} tone={INK3} label="$$$" size={9.5} />
      <Pack3 x={280} y={96} w={52} h={50} tone={INK3} />
      <Arrow1 x1={188} y1={132} x2={134} y2={104} tone={SIGNAL} width={1.75} />
      <line x1={212} y1={132} x2={268} y2={104} stroke={INK3} strokeWidth={1.25} strokeDasharray="4 4" />
      <Person3 x={200} y={172} k={1.3} />
      <Key x={200} y={194} anchor="middle" fill={INK} size={9.5}>
        BUYER CHOICE
      </Key>
      <rect x={20} y={206} width={360} height={18} fill={PAPER2} stroke={INK} strokeWidth={1.25} />
      <rect x={20.6} y={206.6} width={230} height={16.8} fill={SIGNAL} />
      <Key x={20} y={243} fill={SIGNAL} size={9.5}>
        MARKET SHARE
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   4 · THE COMPANY WALL — internal capabilities, external realities
   ========================================================================== */

export function InsideOutside() {
  return (
    <Frame height={300} label="A company drawn as a walled room inside a wider world. Inside: marketing objectives and costs. Outside: market demand and competitor behavior. A price tag sits in the wall between them, with arrows reaching it from both sides.">
      <rect x={16} y={16} width={768} height={268} fill="none" stroke={RULE2} strokeWidth={1.25} strokeDasharray="5 5" />
      <Key x={764} y={44} anchor="end" fill={COUNTER} size={10.5}>
        EXTERNAL
      </Key>
      <rect x={40} y={60} width={360} height={200} fill={PAPER2} stroke={INK} strokeWidth={2} />
      <Key x={60} y={88} fill={INK} size={10.5}>
        INTERNAL
      </Key>

      <Flag1 x={86} y={166} />
      <Key x={138} y={152} fill={INK} size={10}>
        MARKETING OBJECTIVES
      </Key>
      <Coins1 x={98} y={232} n={4} rx={13} tone={INK} />
      <Key x={138} y={226} fill={INK} size={10}>
        COSTS
      </Key>
      <Arrow1 x1={300} y1={148} x2={346} y2={172} tone={INK} />
      <Arrow1 x1={200} y1={222} x2={346} y2={196} tone={INK} />

      <Person3 x={690} y={170} k={0.9} stroke={COUNTER} />
      <Person3 x={716} y={170} k={0.9} stroke={COUNTER} />
      <Person3 x={742} y={170} k={0.9} stroke={COUNTER} />
      <Key x={664} y={152} anchor="end" fill={COUNTER} size={10}>
        MARKET DEMAND
      </Key>
      <Pack3 x={700} y={238} w={26} h={28} tone={COUNTER} />
      <Pack3 x={736} y={238} w={26} h={28} tone={COUNTER} />
      <Key x={664} y={226} anchor="end" fill={COUNTER} size={10}>
        COMPETITOR BEHAVIOR
      </Key>
      <Arrow1 x1={500} y1={148} x2={456} y2={172} tone={COUNTER} />
      <Arrow1 x1={500} y1={222} x2={456} y2={196} tone={COUNTER} />

      <rect x={344} y={158} width={112} height={52} fill={PAPER} />
      <Tag1 x={400} y={184} w={112} h={52} tone={SIGNAL} fill={SIGNAL_TINT} label="PRICE" size={12} width={2.25} />
    </Frame>
  );
}

/* ==========================================================================
   5 · ALIGNMENT — pricing strategies line up with company goals (400)
   ========================================================================== */

export function AlignGoals() {
  return (
    <Frame width={400} height={160} label="A broad arrow for broader company goals, with a thinner arrow for pricing strategies running exactly alongside it in the same direction.">
      <line x1={30} y1={22} x2={30} y2={132} stroke={RULE2} strokeWidth={1} strokeDasharray="3 4" />
      <line x1={375} y1={22} x2={375} y2={132} stroke={RULE2} strokeWidth={1} strokeDasharray="3 4" />
      <path d="M30 40 H340 V28 L375 56 L340 84 V72 H30 Z" fill={INK} />
      <Key x={46} y={60} fill={PAPER} size={10}>
        BROADER COMPANY GOALS
      </Key>
      <line x1={30} y1={112} x2={372} y2={112} stroke={SIGNAL} strokeWidth={3} />
      <path d={headAlong1(375, 112, 1, 0, 11)} fill="none" stroke={SIGNAL} strokeWidth={3} />
      <Key x={30} y={146} fill={SIGNAL} size={10}>
        PRICING STRATEGIES
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   6 · FOUR OBJECTIVES — shown two at a time (400)
   ========================================================================== */

function ObjectiveCard({ cx, lines, children }: { cx: number; lines: string[]; children: React.ReactNode }) {
  return (
    <g>
      <rect x={cx - 86} y={10} width={172} height={176} fill={PAPER} stroke={INK} strokeWidth={1.25} />
      {children}
      {lines.map((t, i) => (
        <Key key={t} x={cx} y={(lines.length === 1 ? 162 : 152) + i * 16} anchor="middle" fill={INK} size={9.5}>
          {t}
        </Key>
      ))}
    </g>
  );
}

export function Objectives({ pair }: { pair: "first" | "second" }) {
  if (pair === "first") {
    return (
      <Frame width={400} height={196} label="Two objective cards. Survival: a life ring. Current profit maximization: coin stacks rising as high as they can go.">
        <ObjectiveCard cx={105} lines={["SURVIVAL"]}>
          <circle cx={105} cy={78} r={32} fill="none" stroke={SIGNAL} strokeWidth={13} />
          <circle cx={105} cy={78} r={32} fill="none" stroke={PAPER} strokeWidth={13} strokeDasharray="16 34.27" strokeDashoffset={8} />
          <circle cx={105} cy={78} r={38.5} fill="none" stroke={INK} strokeWidth={1} />
          <circle cx={105} cy={78} r={25.5} fill="none" stroke={INK} strokeWidth={1} />
          <path d="M40 128 Q56 120 72 128 T104 128 T136 128 T168 128" fill="none" stroke={INK3} strokeWidth={1.25} />
        </ObjectiveCard>
        <ObjectiveCard cx={295} lines={["CURRENT PROFIT", "MAXIMIZATION"]}>
          <Coins1 x={250} y={124} n={2} rx={13} tone={SIGNAL} />
          <Coins1 x={290} y={124} n={5} rx={13} tone={SIGNAL} />
          <Coins1 x={330} y={124} n={9} rx={13} tone={SIGNAL} />
          <line x1={228} y1={130} x2={362} y2={130} stroke={INK} strokeWidth={1.25} />
          <line x1={228} y1={32} x2={362} y2={32} stroke={SIGNAL} strokeWidth={1} strokeDasharray="3 3" />
        </ObjectiveCard>
      </Frame>
    );
  }
  return (
    <Frame width={400} height={196} label="Two objective cards. Market share leadership: a pie where one slice holds most of the market. Product quality leadership: a medal with a star.">
      <ObjectiveCard cx={105} lines={["MARKET SHARE", "LEADERSHIP"]}>
        <circle cx={105} cy={80} r={40} fill={PAPER2} stroke={INK} strokeWidth={1.5} />
        <path d="M105 80 L105 40 A40 40 0 1 1 65 80 Z" fill={SIGNAL} stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
      </ObjectiveCard>
      <ObjectiveCard cx={295} lines={["PRODUCT QUALITY", "LEADERSHIP"]}>
        <path d="M280 94 L268 132 L281 126 L287 138 L296 102 Z M310 94 L322 132 L309 126 L303 138 L294 102 Z" fill={PAPER} stroke={INK} strokeWidth={1.25} strokeLinejoin="round" />
        <circle cx={295} cy={72} r={34} fill={PAPER} stroke={INK} strokeWidth={1.5} />
        <circle cx={295} cy={72} r={27} fill="none" stroke={INK} strokeWidth={1} />
        <Star1 x={295} y={73} k={1.05} fill={SIGNAL} />
      </ObjectiveCard>
    </Frame>
  );
}

/* ==========================================================================
   7 · SPOTLIGHT — a clear objective guides the initial pricing range
   ========================================================================== */

export function ObjectiveRange() {
  return (
    <Frame height={206} label="A flag marked clear objective casts a beam down onto a price scale from low to high, lighting one band of it: the initial pricing range.">
      <path d="M450 72 L360 142 H540 Z" fill={SIGNAL_TINT} />
      <line x1={450} y1={72} x2={360} y2={142} stroke={SIGNAL} strokeWidth={1} strokeDasharray="4 4" />
      <line x1={450} y1={72} x2={540} y2={142} stroke={SIGNAL} strokeWidth={1} strokeDasharray="4 4" />
      <Flag1 x={450} y={66} />
      <Key x={498} y={36} fill={INK} size={10.5}>
        CLEAR OBJECTIVE
      </Key>

      <Key x={60} y={132} fill={INK3} size={9.5}>
        PRICE
      </Key>
      <line x1={60} y1={154} x2={740} y2={154} stroke={INK} strokeWidth={1.5} />
      {Array.from({ length: 18 }, (_, i) => (
        <line key={i} x1={60 + i * 40} y1={148} x2={60 + i * 40} y2={160} stroke={INK3} strokeWidth={1} />
      ))}
      <rect x={360} y={142} width={180} height={24} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={2} />
      <Key x={60} y={184} fill={INK3} size={9.5}>
        LOW
      </Key>
      <Key x={740} y={184} anchor="end" fill={INK3} size={9.5}>
        HIGH
      </Key>
      <Key x={450} y={190} anchor="middle" fill={SIGNAL} size={10.5}>
        INITIAL PRICING RANGE
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   8 · THE FLOOR — costs set the absolute floor for price (400)
   ========================================================================== */

export function CostFloor() {
  return (
    <Frame width={400} height={250} label="A price tag standing on a solid floor labelled costs. An arrow above it shows the price can rise. Below the floor, a dashed price tag is struck out: no price below costs.">
      <Arrow1 x1={330} y1={140} x2={330} y2={34} tone={INK3} width={1.25} />
      <Key x={342} y={50} fill={INK3} size={9.5}>
        PRICE
      </Key>
      <Tag1 x={220} y={128} w={96} h={40} tone={SIGNAL} fill={SIGNAL_TINT} label="PRICE" size={10.5} width={2} />
      <rect x={20} y={150} width={360} height={34} fill={INK} />
      <Key x={36} y={172} fill={PAPER} size={10.5}>
        COSTS · THE ABSOLUTE FLOOR
      </Key>
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1={20 + i * 32} y1={240} x2={52 + i * 32} y2={190} stroke={RULE} strokeWidth={1} />
      ))}
      <rect x={172} y={198} width={96} height={36} fill={PAPER} />
      <Tag1 x={220} y={216} w={88} h={32} tone={INK3} dash="4 3" strike />
    </Frame>
  );
}

/* ==========================================================================
   9 · FIXED AND VARIABLE — two cost lines against production level (400)
   ========================================================================== */

export function CostLine({ kind }: { kind: "fixed" | "variable" }) {
  const fixed = kind === "fixed";
  return (
    <Frame
      width={400}
      height={230}
      label={
        fixed
          ? "A chart of cost against production level. Fixed costs are a flat line: they do not vary as production rises."
          : "A chart of cost against production level. Variable costs are a line rising from zero: they vary directly with production."
      }
    >
      <line x1={50} y1={30} x2={50} y2={182} stroke={INK3} strokeWidth={1.25} />
      <line x1={50} y1={182} x2={372} y2={182} stroke={INK3} strokeWidth={1.25} />
      <path d={headAlong1(374, 182, 1, 0)} fill="none" stroke={INK3} strokeWidth={1.25} />
      <path d={headAlong1(50, 28, 0, -1)} fill="none" stroke={INK3} strokeWidth={1.25} />
      <Key x={60} y={36} fill={INK3} size={9}>
        COSTS
      </Key>
      <Key x={372} y={208} anchor="end" fill={INK3} size={9}>
        PRODUCTION LEVEL
      </Key>
      {fixed ? (
        <g>
          <line x1={50} y1={110} x2={360} y2={110} stroke={INK} strokeWidth={3} />
          <Key x={360} y={98} anchor="end" fill={INK} size={10.5}>
            FIXED COSTS
          </Key>
          <Factory2 x={120} y={170} tone={INK3} />
        </g>
      ) : (
        <g>
          <line x1={50} y1={182} x2={360} y2={52} stroke={COUNTER} strokeWidth={3} />
          <Key x={250} y={150} fill={COUNTER} size={10.5}>
            VARIABLE COSTS
          </Key>
        </g>
      )}
    </Frame>
  );
}

/* ==========================================================================
   10 · TOTAL COSTS — fixed plus variable, and revenue that covers them
   ========================================================================== */

export function TotalCosts() {
  return (
    <Frame height={290} label="Left: a chart where a flat band of fixed costs and a rising wedge of variable costs stack into total costs. Right: a revenue bar that reaches above the total costs bar, and a long arrow: long-term viability.">
      <rect x={60} y={160} width={340} height={40} fill={PAPER2} stroke={INK3} strokeWidth={1} />
      <path d="M60 160 L400 60 V160 Z" fill={COUNTER_TINT} />
      <line x1={60} y1={160} x2={400} y2={60} stroke={INK} strokeWidth={2.5} />
      <Key x={230} y={185} anchor="middle" fill={INK} size={9.5}>
        FIXED
      </Key>
      <Key x={330} y={144} anchor="middle" fill={COUNTER} size={9.5}>
        VARIABLE
      </Key>
      <Key x={180} y={104} anchor="end" fill={INK} size={10}>
        TOTAL COSTS
      </Key>
      <line x1={60} y1={44} x2={60} y2={200} stroke={INK3} strokeWidth={1.25} />
      <line x1={60} y1={200} x2={404} y2={200} stroke={INK3} strokeWidth={1.25} />
      <Key x={68} y={50} fill={INK3} size={9}>
        COSTS
      </Key>
      <Key x={400} y={222} anchor="end" fill={INK3} size={9}>
        PRODUCTION LEVEL
      </Key>

      <Arrow1 x1={430} y1={130} x2={472} y2={130} tone={INK3} />

      <rect x={520} y={160} width={80} height={40} fill={PAPER2} stroke={INK3} strokeWidth={1} />
      <rect x={520} y={96} width={80} height={64} fill={COUNTER_TINT} stroke={INK3} strokeWidth={1} />
      <rect x={650} y={70} width={80} height={130} fill={SIGNAL} />
      <line x1={500} y1={96} x2={756} y2={96} stroke={INK} strokeWidth={1.25} strokeDasharray="5 4" />
      <line x1={500} y1={200} x2={756} y2={200} stroke={INK} strokeWidth={1.25} />
      <Key x={560} y={222} anchor="middle" fill={INK} size={9.5}>
        TOTAL COSTS
      </Key>
      <Key x={690} y={222} anchor="middle" fill={SIGNAL} size={9.5}>
        REVENUE
      </Key>
      <Key x={690} y={58} anchor="middle" fill={SIGNAL} size={9.5}>
        COVERED
      </Key>

      <line x1={500} y1={262} x2={760} y2={262} stroke={SIGNAL} strokeWidth={2} />
      <path d={headAlong1(764, 262, 1, 0)} fill="none" stroke={SIGNAL} strokeWidth={2} />
      <Key x={500} y={250} fill={SIGNAL} size={9.5}>
        LONG-TERM VIABILITY
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   11 · FLOOR AND CEILING — costs below, the market above
   ========================================================================== */

export function FloorCeiling() {
  return (
    <Frame height={270} label="A room for price. The ceiling is the market, the upper limit. The floor is costs, the lower limit. A price tag floats between them, free to move up or down.">
      <rect x={20} y={16} width={760} height={34} fill={COUNTER} />
      <Key x={40} y={38} fill={PAPER} size={10.5}>
        THE MARKET · UPPER LIMIT
      </Key>
      {[560, 600, 640, 680, 720].map((x) => (
        <Person3 key={x} x={x} y={46} k={0.75} stroke={PAPER} fill={COUNTER} />
      ))}
      <rect x={20} y={50} width={760} height={170} fill={PAPER2} />
      <rect x={20} y={220} width={760} height={34} fill={INK} />
      <Key x={40} y={242} fill={PAPER} size={10.5}>
        COSTS · LOWER LIMIT
      </Key>
      <Tag1 x={400} y={135} w={110} h={48} tone={SIGNAL} fill={PAPER} label="PRICE" size={12} width={2.25} />
      <line x1={500} y1={64} x2={500} y2={206} stroke={INK3} strokeWidth={1.25} strokeDasharray="4 4" />
      <path d={headAlong1(500, 60, 0, -1)} fill="none" stroke={INK3} strokeWidth={1.25} />
      <path d={headAlong1(500, 210, 0, 1)} fill="none" stroke={INK3} strokeWidth={1.25} />
    </Frame>
  );
}

/* ==========================================================================
   12 · DEMAND CURVE — the relationship between price and demand (400)
   ========================================================================== */

export function DemandCurve() {
  return (
    <Frame width={400} height={240} label="A demand curve sloping down. At a high price, demand is low. At a low price, demand is high.">
      <line x1={60} y1={30} x2={60} y2={200} stroke={INK3} strokeWidth={1.25} />
      <line x1={60} y1={200} x2={372} y2={200} stroke={INK3} strokeWidth={1.25} />
      <path d={headAlong1(60, 28, 0, -1)} fill="none" stroke={INK3} strokeWidth={1.25} />
      <path d={headAlong1(374, 200, 1, 0)} fill="none" stroke={INK3} strokeWidth={1.25} />
      <Key x={70} y={36} fill={INK3} size={9}>
        PRICE
      </Key>
      <Key x={372} y={224} anchor="end" fill={INK3} size={9}>
        DEMAND
      </Key>
      <line x1={80} y1={40} x2={360} y2={190} stroke={INK} strokeWidth={2.5} />
      <path d="M60 80 H155 V200" fill="none" stroke={SIGNAL} strokeWidth={1.25} strokeDasharray="4 3" />
      <path d="M60 150 H285 V200" fill="none" stroke={COUNTER} strokeWidth={1.25} strokeDasharray="4 3" />
      <circle cx={155} cy={80} r={6} fill={SIGNAL} />
      <circle cx={285} cy={150} r={6} fill={COUNTER} />
      <Key x={172} y={74} fill={SIGNAL} size={9.5}>
        HIGH PRICE
      </Key>
      <Key x={300} y={142} fill={COUNTER} size={9.5}>
        LOW PRICE
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   13 · FOUR MARKETS — sellers and pricing freedom
   ========================================================================== */

export function MarketStructures() {
  const panels = [
    { t: ["PURE", "COMPETITION"], f: 0.12 },
    { t: ["MONOPOLISTIC", "COMPETITION"], f: 0.4 },
    { t: ["OLIGOPOLY"], f: 0.64 },
    { t: ["PURE", "MONOPOLY"], f: 0.92 },
  ];
  return (
    <Frame height={250} label="Four markets side by side. Pure competition: many identical sellers. Monopolistic competition: many different sellers. Oligopoly: a few large sellers. Pure monopoly: one seller. Under each, a bar for pricing freedom grows from nearly empty to nearly full.">
      {panels.map((p, i) => {
        const x = 16 + i * 196;
        const cx = x + 90;
        return (
          <g key={p.t.join()}>
            {p.t.map((line, j) => (
              <Key key={line} x={cx} y={(p.t.length === 1 ? 44 : 30) + j * 14} anchor="middle" fill={INK} size={9.5}>
                {line}
              </Key>
            ))}
            <rect x={x} y={56} width={180} height={130} fill={PAPER2} stroke={RULE2} strokeWidth={1} />
            {i < 2
              ? Array.from({ length: 15 }, (_, k) => {
                  const c = k % 5;
                  const r = Math.floor(k / 5);
                  const sx = cx - 60 + c * 30;
                  const sy = 91 + r * 30;
                  const shape = i === 0 ? 1 : (r * 2 + c) % 3;
                  return shape === 0 ? (
                    <circle key={k} cx={sx} cy={sy} r={8} fill={INK} />
                  ) : shape === 1 ? (
                    <rect key={k} x={sx - 7} y={sy - 7} width={14} height={14} fill={INK} />
                  ) : (
                    <path key={k} d={`M${sx} ${sy - 9} L${sx + 9} ${sy + 7} H${sx - 9} Z`} fill={INK} />
                  );
                })
              : i === 2
                ? [-52, 0, 52].map((dx) => <rect key={dx} x={cx + dx - 20} y={101} width={40} height={40} fill={INK} />)
                : <rect x={cx - 32} y={89} width={64} height={64} fill={INK} />}
            <rect x={x + 15} y={222} width={150} height={14} fill={PAPER} stroke={INK} strokeWidth={1.25} />
            <rect x={x + 15.6} y={222.6} width={Math.round(149 * p.f)} height={12.8} fill={SIGNAL} />
          </g>
        );
      })}
      <Key x={16} y={212} fill={SIGNAL} size={9.5}>
        PRICING FREEDOM
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   14 · ELASTICITY — the same price change, two demand responses (400)
   ========================================================================== */

export function Elasticity({ kind, title }: { kind: "inelastic" | "elastic"; title?: string }) {
  const inelastic = kind === "inelastic";
  // Inelastic: steep line (190,40)→(230,200); crosses y=90 at 202.5, y=120 at 210.
  // Elastic: flat line (80,70)→(360,140); crosses y=90 at 160, y=120 at 280.
  const q0 = inelastic ? 202 : 160;
  const q1 = inelastic ? 210 : 280;
  const heading = title ?? (inelastic ? "INELASTIC DEMAND" : "ELASTIC DEMAND");
  return (
    <Frame
      width={400}
      height={250}
      label={
        inelastic
          ? "A steep demand line. A change in price moves demand only a sliver: demand hardly changes."
          : "A flat demand line. The same change in price moves demand a long way: demand changes greatly."
      }
    >
      <rect x={60} y={90} width={312} height={30} fill={SIGNAL_TINT} />
      <line x1={60} y1={30} x2={60} y2={210} stroke={INK3} strokeWidth={1.25} />
      <line x1={60} y1={210} x2={372} y2={210} stroke={INK3} strokeWidth={1.25} />
      <path d={headAlong1(60, 28, 0, -1)} fill="none" stroke={INK3} strokeWidth={1.25} />
      <path d={headAlong1(374, 210, 1, 0)} fill="none" stroke={INK3} strokeWidth={1.25} />
      <Key x={70} y={36} fill={INK3} size={9}>
        PRICE
      </Key>
      <Key x={372} y={202} anchor="end" fill={INK3} size={9}>
        DEMAND
      </Key>
      <Key x={372} y={36} anchor="end" fill={INK} size={10}>
        {heading}
      </Key>
      <line x1={60} y1={90} x2={60} y2={120} stroke={SIGNAL} strokeWidth={5} />
      <Key x={68} y={138} fill={SIGNAL} size={9}>
        CHANGE IN PRICE
      </Key>
      {inelastic ? (
        <line x1={190} y1={40} x2={230} y2={200} stroke={INK} strokeWidth={2.5} />
      ) : (
        <line x1={80} y1={70} x2={360} y2={140} stroke={INK} strokeWidth={2.5} />
      )}
      <line x1={q0} y1={90} x2={q0} y2={210} stroke={COUNTER} strokeWidth={1.25} strokeDasharray="4 3" />
      <line x1={q1} y1={120} x2={q1} y2={210} stroke={COUNTER} strokeWidth={1.25} strokeDasharray="4 3" />
      <line x1={q0} y1={210} x2={q1} y2={210} stroke={COUNTER} strokeWidth={6} />
      <Key x={(q0 + q1) / 2} y={236} anchor="middle" fill={COUNTER} size={9.5}>
        {inelastic ? "DEMAND HARDLY CHANGES" : "DEMAND CHANGES GREATLY"}
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   15 · FORECAST — the same price increase, two revenue forecasts
   ========================================================================== */

export function RevenueForecast() {
  return (
    <Frame height={262} label="Revenues over time. At a price increase the line forks into a forecast. If demand is inelastic, revenues rise. If demand is elastic, revenues fall.">
      <rect x={400} y={44} width={364} height={192} fill={PAPER2} />
      <Key x={410} y={228} fill={INK3} size={9}>
        FORECAST
      </Key>
      <line x1={60} y1={40} x2={60} y2={236} stroke={INK3} strokeWidth={1.25} />
      <line x1={60} y1={236} x2={766} y2={236} stroke={INK3} strokeWidth={1.25} />
      <path d={headAlong1(768, 236, 1, 0)} fill="none" stroke={INK3} strokeWidth={1.25} />
      <Key x={70} y={46} fill={INK3} size={9}>
        REVENUES
      </Key>
      <Key x={766} y={254} anchor="end" fill={INK3} size={9}>
        TIME
      </Key>
      <path d="M60 150 C160 148 260 142 400 140" fill="none" stroke={INK} strokeWidth={2.5} />
      <line x1={400} y1={30} x2={400} y2={236} stroke={SIGNAL} strokeWidth={1.5} strokeDasharray="5 4" />
      <Key x={392} y={36} anchor="end" fill={SIGNAL} size={10}>
        PRICE INCREASE
      </Key>
      <path d="M400 140 C520 130 640 104 740 84" fill="none" stroke={COUNTER} strokeWidth={2.5} strokeDasharray="7 5" />
      <path d="M400 140 C520 152 640 180 740 200" fill="none" stroke={SIGNAL} strokeWidth={2.5} strokeDasharray="7 5" />
      <circle cx={400} cy={140} r={5} fill={INK} />
      <Key x={740} y={70} anchor="end" fill={COUNTER} size={10}>
        IF DEMAND IS INELASTIC
      </Key>
      <Key x={740} y={222} anchor="end" fill={SIGNAL} size={10}>
        IF DEMAND IS ELASTIC
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   16 · THREE LANES — the three core pricing approaches (split lane)
   ========================================================================== */

export function ApproachLanes() {
  const lanes = [
    { c: 56, name: "CUSTOMER VALUE-BASED PRICING", tone: SIGNAL, tint: SIGNAL_TINT },
    { c: 160, name: "COST-BASED PRICING", tone: INK, tint: PAPER2 },
    { c: 264, name: "COMPETITION-BASED PRICING", tone: COUNTER, tint: COUNTER_TINT },
  ];
  return (
    <Frame height={320} label="One box, select a pricing approach, splits into three lanes that each end in a price tag. Customer value-based pricing starts from a customer. Cost-based pricing starts from costs. Competition-based pricing starts from competitors' price tags.">
      <rect x={20} y={128} width={170} height={64} fill={PAPER2} stroke={INK} strokeWidth={1.5} />
      <Key x={105} y={156} anchor="middle" fill={INK} size={9.5}>
        SELECT A
      </Key>
      <Key x={105} y={172} anchor="middle" fill={INK} size={9.5}>
        PRICING APPROACH
      </Key>
      {lanes.map((l) => (
        <g key={l.name}>
          <path d={`M190 160 C222 160 218 ${l.c} 250 ${l.c}`} fill="none" stroke={INK3} strokeWidth={1.5} />
          <rect x={250} y={l.c - 38} width={452} height={76} fill={l.tint} />
          <rect x={250} y={l.c - 38} width={4} height={76} fill={l.tone} />
          <Key x={350} y={l.c + 4} fill={l.tone} size={10}>
            {l.name}
          </Key>
          <Arrow1 x1={610} y1={l.c} x2={694} y2={l.c} tone={l.tone} />
          <Tag1 x={744} y={l.c} w={76} h={34} tone={l.tone} fill={PAPER} label="PRICE" size={9.5} />
        </g>
      ))}
      <Person3 x={294} y={76} k={1.1} stroke={SIGNAL} />
      <Star1 x={316} y={36} k={0.5} fill={SIGNAL} />
      <Coins1 x={300} y={178} n={4} rx={13} tone={INK} />
      <Tag1 x={296} y={252} w={42} h={18} tone={COUNTER} />
      <Tag1 x={308} y={276} w={42} h={18} tone={COUNTER} />
    </Frame>
  );
}

/* ==========================================================================
   17 · THE KEY TO PRICING — buyers' perceptions of value (400)
   ========================================================================== */

export function ValueKey() {
  return (
    <Frame width={400} height={196} label="A buyer's head with a star inside it, their perception of value. An arrow leads from it to a price tag: the key to pricing.">
      <Head3 x={16} y={20} k={0.6} faceRight tone={INK} fill={PAPER} />
      <Star1 x={74} y={78} k={0.9} fill={SIGNAL} />
      <Arrow1 x1={152} y1={90} x2={214} y2={90} tone={SIGNAL} width={1.75} />
      <Tag1 x={292} y={90} w={112} h={46} tone={SIGNAL} fill={SIGNAL_TINT} label="PRICE" size={11} width={2} />
      <Key x={292} y={140} anchor="middle" fill={SIGNAL} size={9.5}>
        THE KEY TO PRICING
      </Key>
      <Key x={16} y={186} fill={INK} size={9.5}>
        BUYERS&apos; PERCEPTIONS OF VALUE
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   18 · ALL AT ONCE — price with the other mix variables, then the program
   ========================================================================== */

export function MixTogether() {
  const tiles = ["Product", "Price", "Place", "Promotion"];
  return (
    <Frame height={150} label="The four Ps side by side inside one dashed frame, price among them, all considered together. An arrow leads from the frame to a locked box: the marketing program is set.">
      <Key x={320} y={30} anchor="middle" fill={INK3} size={9.5}>
        CONSIDERED ALONG WITH ALL OTHER MARKETING MIX VARIABLES
      </Key>
      <rect x={36} y={44} width={568} height={88} fill="none" stroke={INK3} strokeWidth={1.25} strokeDasharray="5 4" />
      {tiles.map((t, i) => {
        const cx = 110 + i * 140;
        const on = t === "Price";
        return (
          <g key={t}>
            <rect x={cx - 60} y={58} width={120} height={60} fill={on ? SIGNAL_TINT : PAPER} stroke={on ? SIGNAL : INK} strokeWidth={on ? 2 : 1.25} />
            <Display x={cx} y={94} anchor="middle" fill={on ? SIGNAL : INK} size={18}>
              {t}
            </Display>
          </g>
        );
      })}
      <Arrow1 x1={612} y1={88} x2={648} y2={88} tone={INK} />
      <rect x={654} y={44} width={132} height={96} fill={PAPER2} stroke={INK} strokeWidth={1.5} />
      <path d="M708 72 V64 A12 12 0 0 1 732 64 V72" fill="none" stroke={INK} strokeWidth={2.5} />
      <rect x={702} y={72} width={36} height={24} fill={INK} />
      <Key x={720} y={116} anchor="middle" fill={INK} size={9}>
        MARKETING
      </Key>
      <Key x={720} y={130} anchor="middle" fill={INK} size={9}>
        PROGRAM SET
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   19 · REVERSED CHAINS — value-based runs the cost-based chain backwards
   ========================================================================== */

export function ReverseChains() {
  const valueRow = ["CUSTOMERS", "VALUE", "PRICE", "COSTS", "PRODUCT"];
  const costRow = [...valueRow].reverse();
  const box = (i: number) => 40 + i * 154;
  return (
    <Frame height={226} label="Two chains of five boxes. Customer value-based pricing: customers, value, price, costs, product, with customers and value lit as the first step. Cost-based pricing runs the same chain in reverse: product, costs, price, value, customers.">
      <Key x={40} y={26} fill={SIGNAL} size={10.5}>
        CUSTOMER VALUE-BASED PRICING
      </Key>
      {valueRow.map((t, i) => (
        <g key={`v-${t}`}>
          <rect x={box(i)} y={40} width={118} height={48} fill={i < 2 ? SIGNAL : PAPER} stroke={SIGNAL} strokeWidth={1.5} />
          <Key x={box(i) + 59} y={68} anchor="middle" fill={i < 2 ? PAPER : INK} size={9.5}>
            {t}
          </Key>
          {i < 4 ? <Arrow1 x1={box(i) + 122} y1={64} x2={box(i + 1) - 4} y2={64} tone={SIGNAL} /> : null}
        </g>
      ))}
      <path d="M40 96 V102 H312 V96" fill="none" stroke={SIGNAL} strokeWidth={1.25} />
      <Key x={176} y={118} anchor="middle" fill={SIGNAL} size={9}>
        FIRST
      </Key>

      <Key x={40} y={150} fill={INK3} size={10.5}>
        COST-BASED PRICING
      </Key>
      {costRow.map((t, i) => (
        <g key={`c-${t}`}>
          <rect x={box(i)} y={164} width={118} height={48} fill={PAPER} stroke={INK3} strokeWidth={1.25} />
          <Key x={box(i) + 59} y={192} anchor="middle" fill={INK3} size={9.5}>
            {t}
          </Key>
          {i < 4 ? <Arrow1 x1={box(i) + 122} y1={188} x2={box(i + 1) - 4} y2={188} tone={INK3} /> : null}
        </g>
      ))}
    </Frame>
  );
}

/* ==========================================================================
   20 · GOOD VALUE — quality and good service balanced by a fair price (400)
   ========================================================================== */

export function GoodValueBalance() {
  return (
    <Frame width={400} height={180} label="A level balance beam. On one side, a star for quality and a bell for good service. On the other, a price tag: a fair price. The right combination.">
      <Key x={200} y={22} anchor="middle" fill={SIGNAL} size={10}>
        THE RIGHT COMBINATION
      </Key>
      <Star1 x={96} y={78} k={0.95} fill={SIGNAL} />
      <Bell x={150} y={95} tone={INK} />
      <Tag1 x={290} y={79} w={76} h={32} tone={SIGNAL} fill={SIGNAL_TINT} label="$$" size={10} />
      <line x1={50} y1={97} x2={350} y2={97} stroke={INK} strokeWidth={3} />
      <path d="M200 99 L222 136 H178 Z" fill={PAPER2} stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
      <line x1={160} y1={136.5} x2={240} y2={136.5} stroke={INK} strokeWidth={1.5} />
      <Key x={116} y={164} anchor="middle" fill={INK} size={9.5}>
        QUALITY AND GOOD SERVICE
      </Key>
      <Key x={292} y={164} anchor="middle" fill={SIGNAL} size={9.5}>
        FAIR PRICE
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   21 · A CHEAPER VERSION — of an established brand-name product (400)
   ========================================================================== */

export function LessExpensiveVersion() {
  return (
    <Frame width={400} height={214} label="A large package of an established brand-name product with a high price tag. An arrow leads to a smaller, simpler package with the same star mark and a lower price tag: a less expensive version.">
      <Tag1 x={120} y={40} w={72} h={28} tone={INK} label="$$$" size={10} />
      <Pack3 x={120} y={170} w={96} h={104} tone={INK} />
      <Star1 x={120} y={124} k={0.9} fill={INK} />
      <Arrow1 x1={184} y1={140} x2={248} y2={140} tone={SIGNAL} width={1.75} />
      <Tag1 x={300} y={82} w={54} h={26} tone={SIGNAL} fill={SIGNAL_TINT} label="$" size={10} />
      <rect x={270} y={106} width={60} height={64} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
      <Star1 x={300} y={140} k={0.55} fill={SIGNAL} />
      <Key x={120} y={192} anchor="middle" fill={INK} size={9}>
        ESTABLISHED
      </Key>
      <Key x={120} y={206} anchor="middle" fill={INK} size={9}>
        BRAND-NAME PRODUCT
      </Key>
      <Key x={300} y={192} anchor="middle" fill={SIGNAL} size={9}>
        LESS EXPENSIVE
      </Key>
      <Key x={300} y={206} anchor="middle" fill={SIGNAL} size={9}>
        VERSION
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   22 · VALUE ADDED — features attached to differentiate the offer (400)
   ========================================================================== */

export function ValueAddedFeatures() {
  const chips = [
    { x: 290, y: 44, lx1: 290, ly1: 55, lx2: 290, ly2: 70 },
    { x: 358, y: 104, lx1: 347, ly1: 104, lx2: 326, ly2: 104 },
    { x: 222, y: 104, lx1: 233, ly1: 104, lx2: 254, ly2: 104 },
  ];
  return (
    <Frame width={400} height={190} label="Three plain competitor packages in a row. Beside them, one package with three feature modules plugged into it: value-added features that differentiate the offer.">
      {[45, 95, 145].map((x) => (
        <Pack3 key={x} x={x} y={150} w={40} h={52} tone={INK3} />
      ))}
      <Key x={95} y={176} anchor="middle" fill={INK3} size={9.5}>
        COMPETITORS
      </Key>
      <Pack3 x={290} y={150} w={72} h={80} tone={COUNTER} fill={COUNTER_TINT} />
      {chips.map((c) => (
        <g key={`${c.x}-${c.y}`}>
          <line x1={c.lx1} y1={c.ly1} x2={c.lx2} y2={c.ly2} stroke={COUNTER} strokeWidth={2} />
          <rect x={c.x - 11} y={c.y - 11} width={22} height={22} fill={COUNTER} />
          <path d={`M${c.x - 6} ${c.y} H${c.x + 6} M${c.x} ${c.y - 6} V${c.y + 6}`} stroke={PAPER} strokeWidth={2} />
        </g>
      ))}
      <Key x={290} y={176} anchor="middle" fill={COUNTER} size={9.5}>
        VALUE-ADDED FEATURES
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   23 · UP, NOT DOWN — charge more instead of cutting to match (400)
   ========================================================================== */

export function HigherNotCut() {
  return (
    <Frame width={400} height={220} label="A price tag with two routes. Up: to a higher price tag with a star, charge higher prices. Down, dashed and struck out: cutting prices to match competitors.">
      <Key x={30} y={40} fill={COUNTER} size={9.5}>
        CHARGE HIGHER PRICES
      </Key>
      <Tag1 x={70} y={120} w={70} h={30} tone={INK} label="$$" size={10} />
      <Arrow1 x1={110} y1={106} x2={270} y2={60} tone={COUNTER} width={2} />
      <Tag1 x={320} y={52} w={80} h={34} tone={COUNTER} fill={COUNTER_TINT} label="$$$" size={10} />
      <Star1 x={372} y={22} k={0.5} fill={COUNTER} />
      <Arrow1 x1={110} y1={134} x2={270} y2={180} tone={INK3} width={1.5} dash="5 4" />
      <Tag1 x={320} y={188} w={70} h={30} tone={INK3} dash="4 3" label="$" size={10} strike />
      <Key x={30} y={196} fill={INK3} size={9}>
        CUTTING PRICES
      </Key>
      <Key x={30} y={210} fill={INK3} size={9}>
        TO MATCH COMPETITORS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   24 · COST BUILD-UP — producing, distributing, selling, plus a fair return
   ========================================================================== */

export function CostBuildUp() {
  const segs = [
    { a: 40, b: 230, t: "PRODUCING" },
    { a: 230, b: 390, t: "DISTRIBUTING" },
    { a: 390, b: 530, t: "SELLING" },
    { a: 530, b: 700, t: "FAIR RATE OF RETURN" },
  ];
  return (
    <Frame height={212} label="A price built up as one bar: the costs of producing, distributing, and selling the product, plus a fair rate of return for effort and risk. The bar ends in a price tag.">
      <Factory2 x={135} y={96} />
      <Truck1 x={310} y={96} />
      <Store1 x={460} y={96} />
      <Coins1 x={615} y={90} n={4} rx={14} tone={SIGNAL} />
      {segs.map((s, i) => {
        const last = i === segs.length - 1;
        return (
          <g key={s.t}>
            <rect x={s.a} y={110} width={s.b - s.a} height={50} fill={last ? SIGNAL_TINT : PAPER} stroke={last ? SIGNAL : INK} strokeWidth={1.5} />
            <Key x={(s.a + s.b) / 2} y={139} anchor="middle" fill={last ? SIGNAL : INK} size={9.5}>
              {s.t}
            </Key>
          </g>
        );
      })}
      <path d="M40 172 V180 H530 V172" fill="none" stroke={INK3} strokeWidth={1.25} />
      <Key x={285} y={200} anchor="middle" fill={INK} size={9.5}>
        COSTS
      </Key>
      <Key x={615} y={182} anchor="middle" fill={SIGNAL} size={9.5}>
        FOR EFFORT AND RISK
      </Key>
      <Arrow1 x1={706} y1={135} x2={726} y2={135} tone={INK} />
      <Tag1 x={762} y={135} w={68} h={34} tone={INK} label="PRICE" size={9.5} />
    </Frame>
  );
}

/* ==========================================================================
   25 · COST-PLUS — cost, plus something on top, makes the price (400)
   ========================================================================== */

export function CostPlus() {
  return (
    <Frame width={400} height={200} label="Cost-plus pricing: a block of cost with a small block added on top, which together make the price.">
      <Key x={30} y={30} fill={INK} size={10}>
        COST-PLUS PRICING
      </Key>
      <rect x={30} y={80} width={180} height={56} fill={PAPER2} stroke={INK} strokeWidth={1.5} />
      <Key x={120} y={112} anchor="middle" fill={INK} size={10}>
        COST
      </Key>
      <rect x={210} y={80} width={58} height={56} fill={SIGNAL} />
      <path d="M229 108 H249 M239 98 V118" stroke={PAPER} strokeWidth={3} />
      <Arrow1 x1={280} y1={108} x2={314} y2={108} tone={INK} />
      <Tag1 x={354} y={108} w={72} h={36} tone={SIGNAL} fill={SIGNAL_TINT} label="PRICE" size={9.5} />
    </Frame>
  );
}

/* ==========================================================================
   26 · BREAK-EVEN — where revenue meets total costs (400)
   ========================================================================== */

export function BreakEven() {
  return (
    <Frame width={400} height={240} label="Break-even pricing: a chart with a total costs line that starts above zero and a revenue line that starts at zero and rises faster. They cross at the break-even point.">
      <line x1={60} y1={22} x2={80} y2={22} stroke={SIGNAL} strokeWidth={2.5} />
      <Key x={88} y={26} fill={SIGNAL} size={9}>
        REVENUE
      </Key>
      <line x1={60} y1={42} x2={80} y2={42} stroke={INK} strokeWidth={2.5} />
      <Key x={88} y={46} fill={INK} size={9}>
        TOTAL COSTS
      </Key>
      <line x1={50} y1={60} x2={50} y2={200} stroke={INK3} strokeWidth={1.25} />
      <line x1={50} y1={200} x2={372} y2={200} stroke={INK3} strokeWidth={1.25} />
      <path d={headAlong1(374, 200, 1, 0)} fill="none" stroke={INK3} strokeWidth={1.25} />
      <Key x={372} y={224} anchor="end" fill={INK3} size={9}>
        SALES VOLUME
      </Key>
      <line x1={50} y1={140} x2={370} y2={60} stroke={INK} strokeWidth={2.5} />
      <line x1={50} y1={200} x2={370} y2={30} stroke={SIGNAL} strokeWidth={2.5} />
      <line x1={263} y1={87} x2={263} y2={200} stroke={SIGNAL} strokeWidth={1.25} strokeDasharray="4 3" />
      <circle cx={263} cy={87} r={6} fill={PAPER} stroke={SIGNAL} strokeWidth={2.5} />
      <Key x={276} y={114} fill={SIGNAL} size={10}>
        BREAK-EVEN
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   27 · FIELD OF VIEW — cost-based pricing sees costs, not demand or rivals
   ========================================================================== */

export function Blinkers() {
  return (
    <Frame height={240} label="A head looking along a narrow beam that holds only costs. Outside the beam, greyed and dashed, sit demand and competitors' prices.">
      <path d="M156 94 L500 40 V150 Z" fill={PAPER2} />
      <line x1={156} y1={94} x2={500} y2={40} stroke={INK3} strokeWidth={1} strokeDasharray="4 4" />
      <line x1={156} y1={94} x2={500} y2={150} stroke={INK3} strokeWidth={1} strokeDasharray="4 4" />
      <Head3 x={24} y={30} k={0.8} faceRight tone={INK} fill={PAPER} />
      <Key x={104} y={230} anchor="middle" fill={INK} size={9.5}>
        COST-BASED PRICING
      </Key>
      <Coins1 x={420} y={106} n={5} rx={15} tone={INK} />
      <Key x={420} y={130} anchor="middle" fill={INK} size={10}>
        COSTS
      </Key>

      <Tag1 x={604} y={40} w={56} h={24} tone={INK3} dash="4 3" label="$$" size={9} />
      <Tag1 x={680} y={40} w={56} h={24} tone={INK3} dash="4 3" label="$" size={9} />
      <Tag1 x={756} y={40} w={56} h={24} tone={INK3} dash="4 3" label="$$$" size={9} />
      <Key x={680} y={78} anchor="middle" fill={INK3} size={9.5}>
        COMPETITORS&apos; PRICES
      </Key>
      <line x1={570} y1={130} x2={570} y2={206} stroke={INK3} strokeWidth={1} strokeDasharray="3 3" />
      <line x1={570} y1={206} x2={740} y2={206} stroke={INK3} strokeWidth={1} strokeDasharray="3 3" />
      <line x1={584} y1={140} x2={730} y2={198} stroke={INK3} strokeWidth={2} strokeDasharray="6 4" />
      <Key x={656} y={228} anchor="middle" fill={INK3} size={9.5}>
        DEMAND
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   28 · THE RIVAL FILE — strategies, prices, costs, and market offerings
   ========================================================================== */

export function CompetitorReadings() {
  const rows = [
    { y: 88, t: "STRATEGIES" },
    { y: 124, t: "PRICES" },
    { y: 160, t: "COSTS" },
    { y: 196, t: "MARKET OFFERINGS" },
  ];
  return (
    <Frame height={230} label="A file on competitors with four entries: strategies, prices, costs, and market offerings. Lines from all four converge on one price tag: prices are set.">
      <rect x={40} y={20} width={260} height={196} fill={PAPER2} stroke={INK} strokeWidth={1.5} />
      <Key x={60} y={48} fill={INK} size={10.5}>
        COMPETITORS&apos;
      </Key>
      <line x1={60} y1={60} x2={280} y2={60} stroke={RULE2} strokeWidth={1} />
      <Flag1 x={70} y={rows[0].y + 12} k={0.5} tone={INK} />
      <Tag1 x={78} y={rows[1].y} w={36} h={18} tone={INK} />
      <Coins1 x={78} y={rows[2].y + 8} n={3} rx={10} tone={INK} />
      <Pack3 x={78} y={rows[3].y + 11} w={24} h={22} tone={INK} />
      {rows.map((r) => (
        <g key={r.t}>
          <Key x={112} y={r.y + 4} fill={INK} size={9.5}>
            {r.t}
          </Key>
          <path d={`M300 ${r.y} C420 ${r.y} 470 118 560 118`} fill="none" stroke={COUNTER} strokeWidth={1.25} />
        </g>
      ))}
      <Arrow1 x1={560} y1={118} x2={612} y2={118} tone={COUNTER} width={1.75} />
      <Tag1 x={684} y={118} w={120} h={50} tone={COUNTER} fill={COUNTER_TINT} label="PRICE" size={11} width={2} />
      <Key x={684} y={170} anchor="middle" fill={COUNTER} size={9.5}>
        PRICES ARE SET
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   29 · THE SHELF — consumers judge value by competitors' prices
   ========================================================================== */

export function ValueJudged() {
  return (
    <Frame height={244} label="Consumers stand before a shelf. Three competitor products carry their price tags. A product at the end has a question mark on its tag: its value is judged from the prices that competitors charge.">
      <Person3 x={60} y={150} k={1.8} />
      <Key x={60} y={176} anchor="middle" fill={INK} size={9.5}>
        CONSUMERS
      </Key>
      {[200, 340, 480].map((x, i) => (
        <g key={x}>
          <Pack3 x={x} y={150} w={70} h={76} tone={INK} />
          <Tag1 x={x} y={176} w={64} h={26} tone={INK} label={["$$", "$$$", "$$"][i]} size={9.5} />
        </g>
      ))}
      <Pack3 x={690} y={150} w={70} h={76} tone={COUNTER} fill={COUNTER_TINT} />
      <Tag1 x={690} y={176} w={64} h={26} tone={COUNTER} fill={COUNTER_TINT} label="?" size={11} />
      <line x1={110} y1={150} x2={770} y2={150} stroke={INK} strokeWidth={2} />
      <Arrow1 x1={524} y1={176} x2={648} y2={176} tone={COUNTER} dash="5 4" />
      <path d="M165 200 V208 H515 V200" fill="none" stroke={INK3} strokeWidth={1.25} />
      <Key x={340} y={230} anchor="middle" fill={INK} size={9.5}>
        PRICES THAT COMPETITORS CHARGE
      </Key>
      <Key x={690} y={230} anchor="middle" fill={COUNTER} size={9.5}>
        A PRODUCT&apos;S VALUE
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   30 · GREATER VALUE, HIGHER PRICE — comparing the offer to competitors (400)
   ========================================================================== */

export function ValueJustifies() {
  return (
    <Frame width={400} height={236} label="Two bars of customer value, each with a price tag above it. The competitors' bar is shorter. Our offer's bar is taller, greater value, and its price tag sits higher.">
      <rect x={20} y={14} width={12} height={12} fill={COUNTER} />
      <Key x={40} y={24} fill={INK} size={9}>
        CUSTOMER VALUE
      </Key>
      <Tag1 x={28} y={44} w={22} h={14} tone={INK} />
      <Key x={44} y={48} fill={INK} size={9}>
        PRICE
      </Key>
      <rect x={85} y={120} width={70} height={80} fill={INK3} />
      <Tag1 x={124} y={100} w={60} h={26} tone={INK} label="$$" size={9.5} />
      <rect x={245} y={80} width={70} height={120} fill={COUNTER} />
      <Tag1 x={284} y={60} w={60} h={26} tone={COUNTER} fill={COUNTER_TINT} label="$$$" size={9.5} />
      <line x1={155} y1={120} x2={330} y2={120} stroke={INK3} strokeWidth={1.25} strokeDasharray="4 3" />
      <line x1={50} y1={200} x2={380} y2={200} stroke={INK} strokeWidth={1.5} />
      <Key x={324} y={100} fill={COUNTER} size={9}>
        GREATER
      </Key>
      <Key x={324} y={112} fill={COUNTER} size={9}>
        VALUE
      </Key>
      <Key x={322} y={58} fill={COUNTER} size={9}>
        HIGHER
      </Key>
      <Key x={322} y={70} fill={COUNTER} size={9}>
        PRICE
      </Key>
      <Key x={120} y={222} anchor="middle" fill={INK3} size={9.5}>
        COMPETITORS
      </Key>
      <Key x={280} y={222} anchor="middle" fill={COUNTER} size={9.5}>
        OUR OFFER
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   31 · A CROWDED MARKET — giants with big libraries, a newcomer with an edge
   ========================================================================== */

export function StreamingMarket() {
  return (
    <Frame height={260} label="A crowded streaming market. Three established giants, each a large screen above a big grid of content tiles. Beside them, a new streaming platform: a smaller screen with a recommendation network lit inside it, and only three content tiles.">
      <rect x={12} y={12} width={776} height={236} fill="none" stroke={RULE2} strokeWidth={1.25} strokeDasharray="5 5" />
      <line x1={540} y1={30} x2={540} y2={230} stroke={RULE2} strokeWidth={1} strokeDasharray="3 4" />
      {[110, 270, 430].map((cx) => (
        <g key={cx}>
          <rect x={cx - 60} y={40} width={120} height={78} fill={PAPER} stroke={INK} strokeWidth={2} />
          <path d={`M${cx - 8} 66 L${cx + 12} 79 L${cx - 8} 92 Z`} fill={INK} />
          <rect x={cx - 24} y={122} width={48} height={4} fill={INK} />
          {Array.from({ length: 20 }, (_, k) => (
            <rect key={k} x={cx - 53 + (k % 5) * 22} y={140 + Math.floor(k / 5) * 16} width={18} height={12} fill={INK3} />
          ))}
        </g>
      ))}
      <Key x={270} y={230} anchor="middle" fill={INK} size={9.5}>
        ESTABLISHED GIANTS
      </Key>

      <Key x={660} y={40} anchor="middle" fill={SIGNAL} size={9.5}>
        NEW STREAMING PLATFORM
      </Key>
      <rect x={615} y={54} width={90} height={60} fill={PAPER} stroke={SIGNAL} strokeWidth={2} />
      <path d="M640 98 L660 72 L684 92 Z M660 72 V100" fill="none" stroke={SIGNAL} strokeWidth={1.25} />
      {[
        [640, 98],
        [660, 72],
        [684, 92],
        [660, 100],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={4} fill={SIGNAL} />
      ))}
      <rect x={645} y={118} width={30} height={4} fill={SIGNAL} />
      <Key x={660} y={144} anchor="middle" fill={SIGNAL} size={9}>
        UNIQUE RECOMMENDATION
      </Key>
      <Key x={660} y={158} anchor="middle" fill={SIGNAL} size={9}>
        ALGORITHM
      </Key>
      {[627, 651, 675].map((x) => (
        <rect key={x} x={x - 9} y={174} width={18} height={12} fill={INK3} />
      ))}
      <Key x={660} y={210} anchor="middle" fill={INK} size={9}>
        SMALLER CONTENT LIBRARY
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   32 · CASCADE — from skimming to penetration across the life cycle
   ========================================================================== */

export function SkimToPenetrate() {
  const bounds = [180, 300, 450, 640, 760];
  const stages = ["INTRODUCTION", "GROWTH", "MATURITY", "DECLINE"];
  const steps = [
    { a: 192, b: 288, y: 70, tone: SIGNAL },
    { a: 312, b: 438, y: 120, tone: INK },
    { a: 462, b: 628, y: 170, tone: INK },
    { a: 652, b: 748, y: 220, tone: COUNTER },
  ];
  return (
    <Frame height={300} label="Price over the product life cycle, with a faint sales curve behind. Price starts high in introduction, labelled market skimming, and cascades down one step per stage through growth and maturity to a low price in decline, labelled market penetration.">
      {bounds.slice(1, -1).map((x) => (
        <line key={x} x1={x} y1={42} x2={x} y2={280} stroke={RULE2} strokeWidth={1} strokeDasharray="3 4" />
      ))}
      {stages.map((s, i) => (
        <Key key={s} x={(bounds[i] + bounds[i + 1]) / 2} y={34} anchor="middle" fill={INK} size={9}>
          {s}
        </Key>
      ))}
      <path d="M180 270 C230 268 270 255 300 230 C360 180 400 130 470 116 C540 106 600 108 640 126 C690 150 730 190 760 220" fill="none" stroke={RULE2} strokeWidth={2} />
      <Key x={540} y={98} anchor="middle" fill={INK3} size={9}>
        SALES
      </Key>
      <line x1={170} y1={44} x2={170} y2={280} stroke={INK3} strokeWidth={1.25} />
      <line x1={170} y1={280} x2={766} y2={280} stroke={INK3} strokeWidth={1.25} />
      <path d={headAlong1(768, 280, 1, 0)} fill="none" stroke={INK3} strokeWidth={1.25} />
      <Key x={160} y={56} anchor="end" fill={INK3} size={9}>
        PRICE
      </Key>
      {steps.map((s, i) => (
        <g key={s.a}>
          <rect x={s.a} y={s.y - 7} width={s.b - s.a} height={14} fill={s.tone} />
          {i < steps.length - 1 ? (
            <g>
              <path d={`M${s.b - 14} ${s.y + 7} V${steps[i + 1].y} H${steps[i + 1].a - 6}`} fill="none" stroke={INK3} strokeWidth={1.25} />
              <path d={headAlong1(steps[i + 1].a - 4, steps[i + 1].y, 1, 0, 7)} fill="none" stroke={INK3} strokeWidth={1.25} />
            </g>
          ) : null}
        </g>
      ))}
      <Key x={192} y={56} fill={SIGNAL} size={10}>
        MARKET SKIMMING
      </Key>
      <Key x={748} y={250} anchor="end" fill={COUNTER} size={10}>
        MARKET PENETRATION
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   33 · THE LAYERED MARKET — skimming layer by layer, or penetrating deeply
   ========================================================================== */

export function MarketLayers({ mode }: { mode: "skim" | "penetrate" }) {
  const skim = mode === "skim";
  const hw = (y: number) => Math.round(0.75 * (y - 30));
  const layers = [0, 1, 2, 3, 4].map((k) => {
    const top = 30 + k * 48;
    const bot = top + 48;
    return { k, top, bot, row: top + 30 };
  });
  return (
    <Frame
      height={290}
      label={
        skim
          ? "The market as a pyramid of five layers of buyers, one buyer at the top and more in each layer below. Beside each layer, a price tag steps down from the highest price at the top: the company skims layer by layer, starting with the top layer."
          : "The market as a pyramid of five layers of buyers, every layer lit at once. A long arrow runs from top to bottom beside it, quickly and deeply, down to one low initial price tag."
      }
    >
      <Key x={20} y={24} fill={INK3} size={9.5}>
        THE MARKET
      </Key>
      {layers.map(({ k, top, bot, row }) => {
        const lit = skim ? k === 0 : true;
        const tone = skim ? (lit ? SIGNAL : INK) : COUNTER;
        const tint = skim ? (lit ? SIGNAL_TINT : PAPER2) : COUNTER_TINT;
        return (
          <g key={k}>
            <path
              d={`M${220 - hw(top)} ${top} H${220 + hw(top)} L${220 + hw(bot)} ${bot} H${220 - hw(bot)} Z`}
              fill={tint}
              stroke={tone}
              strokeWidth={lit ? 2 : 1.25}
              strokeLinejoin="round"
            />
            {Array.from({ length: 2 * k + 1 }, (_, j) => (
              <circle key={j} cx={220 + (j - k) * 14} cy={row} r={4} fill={tone} />
            ))}
          </g>
        );
      })}
      {skim ? (
        <g>
          {layers.map(({ k, row }) => (
            <g key={k}>
              <line x1={220 + hw(row) + 12} y1={row} x2={470} y2={row} stroke={k === 0 ? SIGNAL : INK3} strokeWidth={1} strokeDasharray="3 4" />
              <Tag1 x={520} y={row} w={84} h={28} tone={k === 0 ? SIGNAL : INK} fill={k === 0 ? SIGNAL_TINT : PAPER} label={"$".repeat(5 - k)} size={10} />
            </g>
          ))}
          <line x1={590} y1={66} x2={590} y2={244} stroke={SIGNAL} strokeWidth={2} />
          <path d={headAlong1(590, 248, 0, 1)} fill="none" stroke={SIGNAL} strokeWidth={2} />
          <Key x={606} y={64} fill={SIGNAL} size={10}>
            HIGH PRICE
          </Key>
          <Key x={606} y={160} fill={SIGNAL} size={10}>
            LAYER BY LAYER
          </Key>
        </g>
      ) : (
        <g>
          <line x1={470} y1={34} x2={470} y2={238} stroke={COUNTER} strokeWidth={4} />
          <path d={headAlong1(470, 246, 0, 1, 12)} fill="none" stroke={COUNTER} strokeWidth={4} />
          <Key x={492} y={140} fill={COUNTER} size={10}>
            QUICKLY AND DEEPLY
          </Key>
          <line x1={220 + hw(252) + 12} y1={252} x2={440} y2={252} stroke={COUNTER} strokeWidth={1} strokeDasharray="3 4" />
          <Tag1 x={540} y={252} w={84} h={28} tone={COUNTER} fill={COUNTER_TINT} label="$" size={10} />
          <Key x={596} y={256} fill={COUNTER} size={10}>
            LOW INITIAL PRICE
          </Key>
        </g>
      )}
    </Frame>
  );
}

/* ==========================================================================
   34 · FEWER, BUT MORE PROFITABLE — three sales, each with a tall stack (400)
   ========================================================================== */

export function FewerProfitable() {
  return (
    <Frame width={400} height={220} label="Only three buyers, but each one stands beside a tall stack of coins: fewer but more profitable sales.">
      {[50, 170, 290].map((x) => (
        <g key={x}>
          <Person3 x={x} y={170} k={1.5} />
          <Coins1 x={x + 44} y={166} n={7} rx={12} tone={SIGNAL} />
        </g>
      ))}
      <line x1={20} y1={172} x2={380} y2={172} stroke={INK} strokeWidth={1.25} />
      <Key x={200} y={202} anchor="middle" fill={SIGNAL} size={10}>
        <tspan fill={INK}>FEWER</tspan> BUT MORE PROFITABLE SALES
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   35 · PILLARS — product quality and image hold up the high price (400)
   ========================================================================== */

export function QualityImagePillars() {
  return (
    <Frame width={400} height={224} label="A high price tag resting on a lintel held up by two pillars: product quality, marked with a star, and image, marked with an eye.">
      <Tag1 x={200} y={34} w={150} h={44} tone={SIGNAL} fill={SIGNAL_TINT} label="HIGH PRICE" size={10.5} width={2} />
      <rect x={80} y={62} width={240} height={14} fill={INK} />
      {[134, 266].map((cx) => (
        <g key={cx}>
          <rect x={cx - 30} y={76} width={60} height={100} fill={PAPER} stroke={INK} strokeWidth={1.5} />
          <path d={`M${cx - 18} 150 V168 M${cx + 18} 150 V168 M${cx - 18} 84 V96 M${cx + 18} 84 V96`} stroke={RULE2} strokeWidth={1} />
        </g>
      ))}
      <Star1 x={134} y={122} k={0.8} fill={INK} />
      <Eye1 x={266} y={122} k={0.8} tone={INK} />
      <rect x={80} y={176} width={240} height={14} fill={INK} />
      <Key x={134} y={212} anchor="middle" fill={INK} size={9.5}>
        PRODUCT QUALITY
      </Key>
      <Key x={266} y={212} anchor="middle" fill={INK} size={9.5}>
        IMAGE
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   36 · THE WALL — competitors cannot easily enter and undercut (400)
   ========================================================================== */

export function NoUndercut() {
  return (
    <Frame width={400} height={210} label="A market behind a wall holds a high price tag. Outside the wall, a competitor with a lower, dashed price tag pushes toward it and is stopped by the wall.">
      <rect x={172} y={30} width={208} height={160} fill={SIGNAL_TINT} />
      <rect x={158} y={20} width={14} height={180} fill={INK} />
      {[40, 60, 80, 100, 120, 140, 160, 180].map((y) => (
        <line key={y} x1={158} y1={y} x2={172} y2={y} stroke={PAPER} strokeWidth={1.25} />
      ))}
      <Tag1 x={282} y={96} w={116} h={44} tone={SIGNAL} fill={PAPER} label="HIGH PRICE" size={10} width={2} />
      <Key x={282} y={172} anchor="middle" fill={INK} size={9.5}>
        THE MARKET
      </Key>
      <Tag1 x={70} y={76} w={56} h={26} tone={INK3} dash="4 3" label="$" size={10} />
      <Pack3 x={70} y={150} w={44} h={50} tone={INK3} />
      <Arrow1 x1={104} y1={124} x2={150} y2={124} tone={INK3} />
      <path d="M122 98 L136 112 M136 98 L122 112" stroke={SIGNAL} strokeWidth={2.5} />
      <Key x={70} y={176} anchor="middle" fill={INK3} size={9.5}>
        COMPETITORS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   37 · MANY BUYERS, QUICKLY — a crowd, a stopwatch, a large share (400)
   ========================================================================== */

export function ManyBuyersShare() {
  return (
    <Frame width={400} height={216} label="A crowd of thirty buyers beside a stopwatch: a large number of buyers, quickly. Below, a bar filled almost to the end: a large market share.">
      <Key x={20} y={24} fill={COUNTER} size={9.5}>
        LARGE NUMBER OF BUYERS
      </Key>
      {Array.from({ length: 30 }, (_, i) => (
        <Person3 key={i} x={30 + (i % 10) * 22} y={62 + Math.floor(i / 10) * 34} k={0.62} stroke={COUNTER} width={1.25} />
      ))}
      <circle cx={330} cy={86} r={28} fill={PAPER} stroke={COUNTER} strokeWidth={2} />
      <rect x={324} y={50} width={12} height={7} fill={COUNTER} />
      <path d="M330 86 V66 M330 86 L344 94" stroke={COUNTER} strokeWidth={2} strokeLinecap="round" />
      <Key x={330} y={136} anchor="middle" fill={COUNTER} size={9.5}>
        QUICKLY
      </Key>
      <rect x={20} y={160} width={360} height={24} fill={PAPER2} stroke={INK} strokeWidth={1.25} />
      <rect x={20.6} y={160.6} width={280} height={22.8} fill={COUNTER} />
      <Key x={20} y={206} fill={COUNTER} size={9.5}>
        LARGE MARKET SHARE
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   38 · COSTS FALL — production and distribution costs with volume (400)
   ========================================================================== */

export function CostsFall() {
  return (
    <Frame width={400} height={230} label="A chart of costs against sales volume. Production and distribution costs start high and fall as sales volume increases.">
      <line x1={50} y1={30} x2={50} y2={190} stroke={INK3} strokeWidth={1.25} />
      <line x1={50} y1={190} x2={372} y2={190} stroke={INK3} strokeWidth={1.25} />
      <path d={headAlong1(50, 28, 0, -1)} fill="none" stroke={INK3} strokeWidth={1.25} />
      <path d={headAlong1(374, 190, 1, 0)} fill="none" stroke={INK3} strokeWidth={1.25} />
      <Key x={60} y={36} fill={INK3} size={9}>
        COSTS
      </Key>
      <Key x={372} y={214} anchor="end" fill={INK3} size={9}>
        SALES VOLUME
      </Key>
      <path d="M60 50 C120 140 200 168 360 176" fill="none" stroke={COUNTER} strokeWidth={3} />
      <Key x={372} y={50} anchor="end" fill={COUNTER} size={9}>
        PRODUCTION AND
      </Key>
      <Key x={372} y={64} anchor="end" fill={COUNTER} size={9}>
        DISTRIBUTION COSTS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   39 · PART OF A MIX — one product, then the same product among others (400)
   ========================================================================== */

export function AloneVsMix() {
  const nodes: [number, number][] = [
    [232, 66],
    [332, 66],
    [232, 128],
    [332, 128],
  ];
  return (
    <Frame width={400} height={190} label="A product on its own. An arrow leads to the same product sitting inside a product mix, linked to three other products.">
      <Pack3 x={70} y={130} w={56} h={64} tone={SIGNAL} fill={SIGNAL_TINT} />
      <Arrow1 x1={116} y1={98} x2={166} y2={98} tone={INK3} />
      <rect x={180} y={30} width={204} height={130} fill="none" stroke={INK3} strokeWidth={1.25} strokeDasharray="5 4" />
      <path d="M232 66 H332 V128 H232 Z M232 66 L332 128" fill="none" stroke={INK3} strokeWidth={1.25} />
      {nodes.map(([x, y], i) => (
        <Pack3 key={`${x}-${y}`} x={x} y={y + 22} w={40} h={44} tone={i === 2 ? SIGNAL : INK} fill={i === 2 ? SIGNAL_TINT : PAPER} />
      ))}
      <Key x={282} y={182} anchor="middle" fill={INK} size={9.5}>
        PRODUCT MIX
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   40 · THE TOTAL MIX — a set of prices, profits summed across products
   ========================================================================== */

export function TotalMixProfit() {
  const profits = [40, -24, 72, 32];
  return (
    <Frame height={276} label="Four products, each with its own price tag, together a set of prices. Their profit bars differ, and one sits below zero. They add up to one tall bar: profits on the total mix.">
      <path d="M118 34 V28 H542 V34" fill="none" stroke={SIGNAL} strokeWidth={1.25} />
      <Key x={330} y={20} anchor="middle" fill={SIGNAL} size={10}>
        A SET OF PRICES
      </Key>
      <Key x={40} y={190} fill={INK3} size={9.5}>
        PROFITS
      </Key>
      {profits.map((p, i) => {
        const x = 150 + i * 120;
        return (
          <g key={x}>
            <Tag1 x={x} y={52} w={56} h={24} tone={INK} label={["$$", "$", "$$$", "$$"][i]} size={9} />
            {p > 0 ? (
              <rect x={x - 32} y={200 - p} width={64} height={p} fill={INK} />
            ) : (
              <rect x={x - 32} y={200} width={64} height={-p} fill={PAPER2} stroke={INK3} strokeWidth={1.25} />
            )}
            <Pack3 x={x} y={262} w={26} h={22} tone={INK} />
          </g>
        );
      })}
      <line x1={100} y1={200} x2={760} y2={200} stroke={INK} strokeWidth={1.5} />
      <Display x={590} y={150} anchor="middle" fill={INK3} size={30}>
        =
      </Display>
      <rect x={630} y={80} width={100} height={120} fill={SIGNAL} />
      <Key x={680} y={226} anchor="middle" fill={SIGNAL} size={9.5}>
        PROFITS ON
      </Key>
      <Key x={680} y={240} anchor="middle" fill={SIGNAL} size={9.5}>
        THE TOTAL MIX
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   41 · RELATED DEMAND — change one price and the others move too (400)
   ========================================================================== */

export function RelatedDemand() {
  const nodes: [number, number][] = [
    [200, 60],
    [80, 128],
    [320, 128],
    [200, 170],
  ];
  return (
    <Frame width={400} height={222} label="Four linked products. One product's price tag drops, and the links carry the change to the other three, each now marked with a question mark: related demand and costs.">
      {nodes.map(([x1, y1], i) =>
        nodes.slice(i + 1).map(([x2, y2]) => (
          <line key={`${x1}-${y1}-${x2}-${y2}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={i === 0 ? SIGNAL : RULE2} strokeWidth={i === 0 ? 1.75 : 1.25} />
        )),
      )}
      {nodes.map(([x, y], i) => (
        <g key={`${x}-${y}`}>
          <Pack3 x={x} y={y + 18} w={44} h={36} tone={i === 0 ? SIGNAL : INK} fill={i === 0 ? SIGNAL_TINT : PAPER} />
          {i > 0 ? (
            <Display x={x + (x < 200 ? -34 : 34)} y={y + 8} anchor="middle" fill={INK3} size={18}>
              ?
            </Display>
          ) : null}
        </g>
      ))}
      <Tag1 x={264} y={48} w={50} h={22} tone={SIGNAL} fill={PAPER} label="$" size={9.5} />
      <Arrow1 x1={302} y1={34} x2={302} y2={62} tone={SIGNAL} width={1.75} />
      <Key x={200} y={214} anchor="middle" fill={INK} size={9.5}>
        RELATED DEMAND AND COSTS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   42 · PRICE STEPS — products in a line, priced on a staircase
   ========================================================================== */

export function PriceSteps() {
  const items = [
    { a: 80, b: 300, top: 190, w: 50, h: 50, tag: "$", tx: 250 },
    { a: 300, b: 520, top: 140, w: 60, h: 60, tag: "$$", tx: 475 },
    { a: 520, b: 740, top: 90, w: 70, h: 60, tag: "$$$", tx: 700 },
  ];
  return (
    <Frame height={244} label="Three products in a line, small, medium, and large, standing on a staircase. Each has a higher price tag than the one before, and the rise between each step is marked as a price step.">
      <Key x={80} y={30} fill={INK} size={10}>
        VARIOUS PRODUCTS IN A LINE
      </Key>
      {items.map((it) => {
        const cx = it.a + 110;
        return (
          <g key={it.a}>
            <rect x={it.a} y={it.top} width={it.b - it.a} height={230 - it.top} fill={PAPER2} stroke={INK} strokeWidth={1.5} />
            <Pack3 x={cx} y={it.top} w={it.w} h={it.h} tone={INK} />
            <Tag1 x={it.tx} y={it.top - 24} w={Math.max(50, 18 + it.tag.length * 12)} h={24} tone={SIGNAL} fill={SIGNAL_TINT} label={it.tag} size={9.5} />
          </g>
        );
      })}
      {[
        { x: 290, y1: 144, y2: 186, ky: 128 },
        { x: 510, y1: 94, y2: 136, ky: 78 },
      ].map((d) => (
        <g key={d.x}>
          <line x1={d.x} y1={d.y1} x2={d.x} y2={d.y2} stroke={SIGNAL} strokeWidth={1.5} />
          <path d={headAlong1(d.x, d.y1, 0, -1, 6)} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
          <path d={headAlong1(d.x, d.y2, 0, 1, 6)} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
          <Key x={d.x} y={d.ky} anchor="middle" fill={SIGNAL} size={9}>
            PRICE STEP
          </Key>
        </g>
      ))}
    </Frame>
  );
}

/* ==========================================================================
   43 · WHAT SETS A STEP — costs, feature evaluations, competitors' prices
   ========================================================================== */

export function StepInputs() {
  return (
    <Frame height={226} label="Three inputs feed into the price steps: cost differences, shown as two coin stacks of different heights; customer evaluations of features, shown as a customer with a star rating; and competitors' prices, shown as their price tags.">
      {[140, 400, 660].map((cx) => (
        <rect key={cx} x={cx - 115} y={16} width={230} height={108} fill={PAPER} stroke={INK} strokeWidth={1.25} />
      ))}
      <Coins1 x={116} y={82} n={3} rx={14} tone={INK} />
      <Coins1 x={164} y={82} n={7} rx={14} tone={INK} />
      <Key x={140} y={110} anchor="middle" fill={INK} size={9.5}>
        COST DIFFERENCES
      </Key>

      <Person3 x={352} y={84} k={1.25} />
      {[0, 1, 2, 3].map((i) => (
        <Star1 key={i} x={392 + i * 22} y={56} k={0.55} fill={i < 3 ? SIGNAL : RULE2} />
      ))}
      <Key x={400} y={104} anchor="middle" fill={INK} size={9}>
        CUSTOMER EVALUATIONS
      </Key>
      <Key x={400} y={117} anchor="middle" fill={INK} size={9}>
        OF FEATURES
      </Key>

      <Tag1 x={632} y={52} w={54} h={24} tone={INK3} label="$$" size={9} />
      <Tag1 x={692} y={74} w={54} h={24} tone={INK3} label="$" size={9} />
      <Key x={660} y={110} anchor="middle" fill={INK} size={9.5}>
        COMPETITORS&apos; PRICES
      </Key>

      <Arrow1 x1={160} y1={130} x2={366} y2={172} tone={INK3} />
      <Arrow1 x1={400} y1={130} x2={400} y2={170} tone={INK3} />
      <Arrow1 x1={640} y1={130} x2={434} y2={172} tone={INK3} />
      <path d="M350 216 H380 V200 H410 V184 H440 V216 Z" fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={2} strokeLinejoin="round" />
      <Key x={456} y={210} fill={SIGNAL} size={9.5}>
        PRICE STEPS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   44 · OPTIONS — a main product with accessories priced alongside (400)
   ========================================================================== */

function Mouse({ x, y, tone = INK, dash }: { x: number; y: number; tone?: string; dash?: string }) {
  return (
    <g>
      <ellipse cx={x} cy={y} rx={11} ry={16} fill={PAPER} stroke={tone} strokeWidth={1.5} strokeDasharray={dash} />
      <line x1={x} y1={y - 16} x2={x} y2={y - 4} stroke={tone} strokeWidth={1.25} />
    </g>
  );
}

function Sleeve({ x, y, w = 60, h = 32, tone = INK, dash }: { x: number; y: number; w?: number; h?: number; tone?: string; dash?: string }) {
  return (
    <g>
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={4} fill={PAPER} stroke={tone} strokeWidth={1.5} strokeDasharray={dash} />
      <line x1={x - w / 2 + 6} y1={y - h / 2 + 8} x2={x + w / 2 - 6} y2={y - h / 2 + 8} stroke={tone} strokeWidth={1} strokeDasharray="2 2" />
    </g>
  );
}

function Charger({ x, y, tone = INK }: { x: number; y: number; tone?: string }) {
  return (
    <g>
      <rect x={x - 12} y={y - 12} width={24} height={24} rx={3} fill={PAPER} stroke={tone} strokeWidth={1.5} />
      <path d={`M${x - 6} ${y - 12} V${y - 22} M${x + 6} ${y - 12} V${y - 22}`} stroke={tone} strokeWidth={1.75} />
    </g>
  );
}

export function OptionalProducts() {
  return (
    <Frame width={400} height={232} label="A laptop, the main product, with its own price tag. Dashed lines lead to three accessories below it, a mouse, a sleeve, and a charger, each with its own small price tag: optional or accessory products.">
      <Key x={200} y={28} anchor="middle" fill={INK} size={9.5}>
        MAIN PRODUCT
      </Key>
      <Laptop1 cx={200} top={42} />
      <Tag1 x={312} y={70} w={58} h={24} tone={INK} label="$$$" size={9} />
      <line x1={150} y1={132} x2={82} y2={160} stroke={INK3} strokeWidth={1.25} strokeDasharray="4 3" />
      <line x1={200} y1={132} x2={200} y2={160} stroke={INK3} strokeWidth={1.25} strokeDasharray="4 3" />
      <line x1={250} y1={132} x2={322} y2={160} stroke={INK3} strokeWidth={1.25} strokeDasharray="4 3" />
      <Mouse x={70} y={182} tone={SIGNAL} />
      <Sleeve x={200} y={182} tone={SIGNAL} />
      <Charger x={330} y={186} tone={SIGNAL} />
      <Tag1 x={106} y={170} w={32} h={16} tone={SIGNAL} label="$" size={8} />
      <Tag1 x={254} y={168} w={32} h={16} tone={SIGNAL} label="$" size={8} />
      <Tag1 x={366} y={176} w={32} h={16} tone={SIGNAL} label="$" size={8} />
      <Key x={200} y={224} anchor="middle" fill={SIGNAL} size={9.5}>
        OPTIONAL OR ACCESSORY PRODUCTS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   45 · BASE OR OPTION — sorting items into the base price or the options (400)
   ========================================================================== */

export function BaseOrOptions() {
  return (
    <Frame width={400} height={226} label="An item with a question mark over it, with arrows to two boxes. The base price box holds the laptop and its charger. The options box holds a sleeve and a mouse.">
      <Display x={200} y={22} anchor="middle" fill={INK} size={20}>
        ?
      </Display>
      <Pack3 x={200} y={58} w={30} h={26} tone={INK} />
      <Arrow1 x1={180} y1={52} x2={122} y2={74} tone={INK3} />
      <Arrow1 x1={220} y1={52} x2={278} y2={74} tone={INK3} />
      <rect x={16} y={80} width={176} height={136} fill={PAPER2} stroke={INK} strokeWidth={1.5} />
      <Key x={104} y={102} anchor="middle" fill={INK} size={10}>
        BASE PRICE
      </Key>
      <Laptop1 cx={90} top={130} k={0.5} />
      <Charger x={164} y={178} />
      <rect x={208} y={80} width={176} height={136} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.5} strokeDasharray="5 4" />
      <Key x={296} y={102} anchor="middle" fill={COUNTER} size={10}>
        OPTIONS
      </Key>
      <Sleeve x={260} y={164} w={56} h={30} tone={COUNTER} />
      <Mouse x={334} y={166} tone={COUNTER} />
    </Frame>
  );
}

/* ==========================================================================
   46 · THE FIT — a captive product must be used with the main product (400)
   ========================================================================== */

export function CaptiveFit() {
  return (
    <Frame width={400} height={180} label="A main product with a notch cut into it, and a second piece whose tab is shaped to fit only that notch, sliding toward it: a product that must be used along with the main product.">
      <path d="M30 50 H200 V80 H170 V110 H200 V140 H30 Z" fill={PAPER2} stroke={INK} strokeWidth={1.75} strokeLinejoin="round" />
      <path d="M250 60 H360 V130 H250 V110 H222 V80 H250 Z" fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={2} strokeLinejoin="round" />
      <Arrow1 x1={330} y1={40} x2={270} y2={40} tone={SIGNAL} />
      <Key x={115} y={166} anchor="middle" fill={INK} size={9.5}>
        MAIN PRODUCT
      </Key>
      <Key x={296} y={160} anchor="middle" fill={SIGNAL} size={9}>
        MUST BE USED ALONG WITH
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   47 · EXAMPLES — a razor and its blades, a console and its games
   ========================================================================== */

export function CaptiveExamples() {
  return (
    <Frame height={190} label="Two examples side by side. A razor with three replacement blades. A video game console with three games.">
      <rect x={60} y={96} width={180} height={16} rx={8} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <rect x={240} y={70} width={22} height={68} fill={INK} />
      {[310, 346, 382].map((x) => (
        <g key={x}>
          <rect x={x - 13} y={82} width={26} height={44} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
          <path d={`M${x - 8} 94 H${x + 8} M${x - 8} 104 H${x + 8} M${x - 8} 114 H${x + 8}`} stroke={SIGNAL} strokeWidth={1} />
        </g>
      ))}
      <Key x={160} y={170} anchor="middle" fill={INK} size={10}>
        RAZOR
      </Key>
      <Key x={346} y={170} anchor="middle" fill={SIGNAL} size={10}>
        BLADES
      </Key>

      <line x1={430} y1={30} x2={430} y2={170} stroke={RULE2} strokeWidth={1} strokeDasharray="3 4" />

      <rect x={470} y={80} width={160} height={54} rx={8} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <path d="M490 98 H560" stroke={INK} strokeWidth={2} />
      <circle cx={608} cy={118} r={4} fill={INK} />
      {[686, 722, 758].map((x) => (
        <g key={x}>
          <rect x={x - 14} y={82} width={28} height={42} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
          <circle cx={x} cy={103} r={7} fill="none" stroke={SIGNAL} strokeWidth={1.25} />
        </g>
      ))}
      <Key x={550} y={170} anchor="middle" fill={INK} size={10}>
        VIDEO GAME CONSOLE
      </Key>
      <Key x={722} y={170} anchor="middle" fill={SIGNAL} size={10}>
        GAMES
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   48 · MARKUPS — main product priced low, captive supplies marked up high
   ========================================================================== */

export function CaptiveMarkups() {
  return (
    <Frame height={266} label="Price bars split into cost and markup. The main product's bar is almost all cost with a sliver of markup: priced low. Five captive supplies each have a small cost and a large markup: high markups.">
      <rect x={600} y={40} width={12} height={12} fill={PAPER2} stroke={INK3} strokeWidth={1} />
      <Key x={620} y={50} fill={INK} size={9}>
        COST
      </Key>
      <rect x={680} y={40} width={12} height={12} fill={SIGNAL} />
      <Key x={700} y={50} fill={INK} size={9}>
        MARKUP
      </Key>
      <rect x={80} y={150} width={120} height={60} fill={PAPER2} stroke={INK3} strokeWidth={1} />
      <rect x={80} y={145} width={120} height={5} fill={SIGNAL} />
      {[0, 1, 2, 3, 4].map((i) => {
        const x = 320 + i * 84;
        return (
          <g key={x}>
            <rect x={x} y={190} width={60} height={20} fill={PAPER2} stroke={INK3} strokeWidth={1} />
            <rect x={x} y={120} width={60} height={70} fill={SIGNAL} />
          </g>
        );
      })}
      <line x1={50} y1={210} x2={770} y2={210} stroke={INK} strokeWidth={1.5} />
      <Key x={140} y={234} anchor="middle" fill={INK} size={9.5}>
        MAIN PRODUCT
      </Key>
      <Key x={140} y={250} anchor="middle" fill={INK3} size={9.5}>
        PRICED LOW
      </Key>
      <Key x={518} y={234} anchor="middle" fill={INK} size={9.5}>
        CAPTIVE SUPPLIES
      </Key>
      <Key x={518} y={250} anchor="middle" fill={SIGNAL} size={9.5}>
        HIGH MARKUPS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   49 · THE STREAM — one purchase, then revenue that keeps coming
   ========================================================================== */

export function OngoingStream() {
  return (
    <Frame height={180} label="A timeline. At the start, one initial purchase of a console. After it, a steady run of games along the line, each with a coin: ongoing revenue streams.">
      <line x1={40} y1={140} x2={762} y2={140} stroke={INK} strokeWidth={1.5} />
      <path d={headAlong1(764, 140, 1, 0)} fill="none" stroke={INK} strokeWidth={1.5} />
      <rect x={56} y={100} width={68} height={28} rx={6} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <path d="M68 111 H98" stroke={INK} strokeWidth={1.5} />
      <circle cx={90} cy={140} r={6} fill={INK} />
      <Key x={90} y={166} anchor="middle" fill={INK} size={9.5}>
        INITIAL PURCHASE
      </Key>
      <path d="M200 88 V82 H680 V88" fill="none" stroke={SIGNAL} strokeWidth={1.25} />
      <Key x={440} y={70} anchor="middle" fill={SIGNAL} size={10}>
        ONGOING REVENUE STREAMS
      </Key>
      {Array.from({ length: 7 }, (_, i) => {
        const x = 200 + i * 80;
        return (
          <g key={x}>
            <rect x={x - 9} y={98} width={18} height={24} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.25} />
            <circle cx={x} cy={140} r={6} fill={SIGNAL} />
          </g>
        );
      })}
      <Key x={762} y={166} anchor="end" fill={INK3} size={9}>
        TIME
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   50 · THE BUNDLE — several products for less than their separate prices
   ========================================================================== */

export function BundleReduced() {
  return (
    <Frame height={210} label="Three products, each with its own price tag, added together. An arrow leads to one wrapped bundle. The sum of the separate prices is struck out, and the bundle carries a reduced price.">
      {[90, 210, 330].map((x) => (
        <g key={x}>
          <Tag1 x={x} y={62} w={58} h={26} tone={INK} label="$$" size={9.5} />
          <Pack3 x={x} y={160} w={60} h={64} tone={INK} />
        </g>
      ))}
      <Display x={150} y={138} anchor="middle" fill={INK3} size={24}>
        +
      </Display>
      <Display x={270} y={138} anchor="middle" fill={INK3} size={24}>
        +
      </Display>
      <Key x={210} y={192} anchor="middle" fill={INK} size={9.5}>
        SEVERAL PRODUCTS
      </Key>
      <Arrow1 x1={400} y1={124} x2={470} y2={124} tone={SIGNAL} width={1.75} />
      <Gift1 x={500} y={84} w={220} h={86} />
      <Tag1 x={556} y={36} w={88} h={26} tone={INK3} dash="4 3" label="$$$$$$" size={9} strike />
      <Tag1 x={672} y={36} w={78} h={30} tone={SIGNAL} fill={SIGNAL_TINT} label="$$$$" size={10} width={2} />
      <Key x={790} y={66} anchor="end" fill={SIGNAL} size={9.5}>
        REDUCED PRICE
      </Key>
      <Key x={610} y={196} anchor="middle" fill={SIGNAL} size={9.5}>
        THE BUNDLE
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   51 · ALONG FOR THE RIDE — a product consumers might not otherwise buy (400)
   ========================================================================== */

export function BundleRideAlong() {
  return (
    <Frame width={400} height={210} label="A bundle holding three products. Two are drawn in ink. The third is lit: a product consumers might not otherwise buy, now sold as part of the bundle.">
      <Key x={40} y={38} fill={INK} size={9.5}>
        THE BUNDLE
      </Key>
      <rect x={40} y={50} width={320} height={110} fill={PAPER2} stroke={INK} strokeWidth={1.5} />
      <Pack3 x={110} y={150} w={56} h={70} tone={INK} />
      <Pack3 x={200} y={150} w={56} h={70} tone={INK} />
      <Pack3 x={290} y={150} w={56} h={70} tone={SIGNAL} fill={SIGNAL_TINT} />
      <Key x={290} y={186} anchor="middle" fill={SIGNAL} size={9}>
        PRODUCTS CONSUMERS
      </Key>
      <Key x={290} y={200} anchor="middle" fill={SIGNAL} size={9}>
        MIGHT NOT OTHERWISE BUY
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   52 · LOW ENOUGH — the combined price under the line that gets a purchase (400)
   ========================================================================== */

export function BundleThreshold() {
  return (
    <Frame width={400} height={222} label="A price scale with a dashed line marked low enough. The bundle's combined price tag sits below the line, and an arrow leads to a buyer with a check mark: they buy the bundle.">
      <line x1={40} y1={30} x2={40} y2={192} stroke={INK3} strokeWidth={1.25} />
      <path d={headAlong1(40, 28, 0, -1)} fill="none" stroke={INK3} strokeWidth={1.25} />
      <Key x={50} y={36} fill={INK3} size={9}>
        PRICE
      </Key>
      <line x1={40} y1={90} x2={380} y2={90} stroke={COUNTER} strokeWidth={1.75} strokeDasharray="6 4" />
      <Key x={380} y={80} anchor="end" fill={COUNTER} size={9.5}>
        LOW ENOUGH
      </Key>
      <Tag1 x={140} y={130} w={96} h={36} tone={SIGNAL} fill={SIGNAL_TINT} label="$$$$" size={10} width={2} />
      <Key x={140} y={172} anchor="middle" fill={SIGNAL} size={9.5}>
        THE COMBINED PRICE
      </Key>
      <Arrow1 x1={196} y1={134} x2={274} y2={150} tone={COUNTER} />
      <Person3 x={310} y={192} k={1.7} />
      <path d="M292 116 L302 126 L322 104" fill="none" stroke={COUNTER} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      <Key x={310} y={214} anchor="middle" fill={COUNTER} size={9.5}>
        BUY THE BUNDLE
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   53 · CLEARING STOCK — excess inventory leaves as bundles that give value (400)
   ========================================================================== */

export function ClearInventory() {
  const remaining = new Set([9, 10, 11]);
  return (
    <Frame width={400} height={200} label="A shelf of excess inventory, most of its boxes now dashed outlines because they have been cleared out. An arrow leads to two wrapped bundles under a star: value.">
      {Array.from({ length: 12 }, (_, i) => {
        const c = i % 4;
        const r = Math.floor(i / 4);
        const on = remaining.has(i);
        return (
          <rect
            key={i}
            x={30 + c * 34}
            y={62 + r * 34}
            width={30}
            height={30}
            fill={on ? PAPER : "none"}
            stroke={on ? INK : INK3}
            strokeWidth={on ? 1.5 : 1}
            strokeDasharray={on ? undefined : "3 3"}
          />
        );
      })}
      <line x1={24} y1={164.5} x2={166} y2={164.5} stroke={INK} strokeWidth={2} />
      <Key x={97} y={188} anchor="middle" fill={INK} size={9.5}>
        EXCESS INVENTORY
      </Key>
      <Arrow1 x1={182} y1={112} x2={226} y2={112} tone={INK3} />
      <Gift1 x={242} y={104} w={58} h={58} />
      <Gift1 x={312} y={104} w={58} h={58} />
      <Star1 x={306} y={46} k={0.8} fill={COUNTER} />
      <Key x={306} y={188} anchor="middle" fill={COUNTER} size={9.5}>
        VALUE
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   54 · THE POD DILEMMA — price the machine low, or keep it premium
   ========================================================================== */

function Pod({ x, y, tone = SIGNAL }: { x: number; y: number; tone?: string }) {
  return (
    <g strokeLinejoin="round">
      <rect x={x - 12} y={y - 22} width={24} height={4} fill={tone} />
      <path d={`M${x - 10} ${y - 18} H${x + 10} L${x + 6} ${y} H${x - 6} Z`} fill={SIGNAL_TINT} stroke={tone} strokeWidth={1.5} />
    </g>
  );
}

export function PodDilemma() {
  return (
    <Frame height={276} label="A premium coffee machine with proprietary pods that only fit this machine. From a question mark, two routes. Price the machine low, with a low price tag followed by a long run of pods: sell more pods. Or price the machine high, with a high price tag and a star: a premium brand image.">
      <Pod x={120} y={34} />
      <rect x={60} y={44} width={120} height={30} fill={PAPER2} stroke={INK} strokeWidth={1.5} />
      <rect x={72} y={74} width={96} height={146} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <rect x={112} y={74} width={16} height={18} fill={INK} />
      <Star1 x={120} y={132} k={0.7} fill={INK} />
      <path d="M100 184 H140 L136 220 H104 Z" fill={PAPER} stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
      <rect x={56} y={220} width={128} height={12} fill={INK} />
      <Key x={120} y={256} anchor="middle" fill={INK} size={9.5}>
        PREMIUM COFFEE MACHINE
      </Key>
      {[
        [236, 200],
        [266, 200],
        [296, 200],
        [251, 172],
        [281, 172],
      ].map(([x, y]) => (
        <Pod key={`${x}-${y}`} x={x} y={y} />
      ))}
      <Key x={266} y={228} anchor="middle" fill={SIGNAL} size={9}>
        PROPRIETARY PODS
      </Key>
      <Key x={266} y={242} anchor="middle" fill={SIGNAL} size={9}>
        ONLY FIT THIS MACHINE
      </Key>

      <Display x={370} y={150} anchor="middle" fill={INK3} size={30}>
        ?
      </Display>
      <line x1={390} y1={126} x2={456} y2={76} stroke={INK3} strokeWidth={1.5} />
      <line x1={390} y1={148} x2={456} y2={204} stroke={INK3} strokeWidth={1.5} />

      <Tag1 x={504} y={70} w={60} h={30} tone={SIGNAL} fill={SIGNAL_TINT} label="$" size={10} width={2} />
      {Array.from({ length: 6 }, (_, i) => (
        <Pod key={i} x={580 + i * 34} y={84} />
      ))}
      <Key x={470} y={118} fill={SIGNAL} size={10}>
        PRICE THE MACHINE LOW
      </Key>
      <Key x={470} y={134} fill={SIGNAL} size={9.5}>
        SELL MORE PODS
      </Key>

      <Tag1 x={514} y={204} w={80} h={30} tone={COUNTER} fill={COUNTER_TINT} label="$$$$" size={10} width={2} />
      <Star1 x={590} y={204} k={0.85} fill={COUNTER} />
      <Key x={470} y={246} fill={COUNTER} size={10}>
        PRICE THE MACHINE HIGH
      </Key>
      <Key x={470} y={262} fill={COUNTER} size={9.5}>
        PREMIUM BRAND IMAGE
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   Conclusion glyphs — each echoes a plate already seen
   ========================================================================== */

export function GlyphRevenue() {
  return (
    <svg {...glyphProps}>
      <rect x="4" y="22" width="10" height="12" fill="var(--ink-3)" />
      <rect x="18" y="5" width="10" height="17" fill="var(--signal)" />
      <rect x="32" y="22" width="10" height="12" fill="var(--ink-3)" />
      <rect x="46" y="22" width="10" height="12" fill="var(--ink-3)" />
      <path d="M1 22 H61" stroke="var(--ink)" strokeWidth="1.5" />
    </svg>
  );
}

export function GlyphWall() {
  return (
    <svg {...glyphProps}>
      <rect x="2" y="2" width="60" height="36" stroke="var(--rule-2)" strokeWidth="1" strokeDasharray="3 3" />
      <rect x="6" y="8" width="28" height="24" fill="var(--paper-2)" stroke="var(--ink)" strokeWidth="1.5" />
      <path d="M24 20 L30 13 H46 V27 H30 Z" fill="var(--paper)" stroke="var(--signal)" strokeWidth="1.75" strokeLinejoin="round" />
    </svg>
  );
}

export function GlyphLanes() {
  return (
    <svg {...glyphProps}>
      <path d="M2 20 C12 20 10 7 20 7 H50" stroke="var(--signal)" strokeWidth="1.75" />
      <path d="M2 20 H50" stroke="var(--ink)" strokeWidth="1.75" />
      <path d="M2 20 C12 20 10 33 20 33 H50" stroke="var(--counter)" strokeWidth="1.75" />
      {[7, 20, 33].map((y) => (
        <path key={y} d={`M52 ${y} L56 ${y - 4} H62 V${y + 4} H56 Z`} fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.25" />
      ))}
    </svg>
  );
}

export function GlyphLayers() {
  return (
    <svg {...glyphProps}>
      <path d="M32 3 L39 14 H25 Z" fill="var(--signal)" />
      <path d="M24 16 H40 L47 27 H17 Z" fill="var(--paper-2)" stroke="var(--ink)" strokeWidth="1.25" strokeLinejoin="round" />
      <path d="M16 29 H48 L54 38 H10 Z" fill="var(--paper-2)" stroke="var(--ink)" strokeWidth="1.25" strokeLinejoin="round" />
    </svg>
  );
}
