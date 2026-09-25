/* ==========================================================================
   Week 09 — figures
   --------------------------------------------------------------------------
   Hand-drawn SVG plates, one grammar per idea. The week is about movement,
   so most plates read left to right along a chain: a factory at one end, a
   buyer at the other, and whatever sits between them as the subject of the
   slide. Where the idea is not a chain the grammar changes on purpose — a
   bridge over a gap, a hub with spokes, nested rings of goals, two crossed
   lines for control against complexity, a sorting table for assortments, a
   balance for service against cost.

   Conventions carried over from earlier weeks:
     · viewBox width 800 (400 for column plates), flat fills, hairline rules,
       no shadows or gradients
     · INK carries the neutral case, SIGNAL the operative one, COUNTER the
       contrast or the outward-looking state
     · every label reuses words from the slide the plate sits on
     · integer coordinates only, so server and client render the same markup
   ========================================================================== */

import React from "react";
import {
  COUNTER,
  COUNTER_TINT,
  Display,
  Frame,
  headAlong1,
  INK,
  INK3,
  Key,
  Note,
  PAPER,
  PAPER2,
  RULE,
  RULE2,
  SIGNAL,
  SIGNAL_TINT,
} from "../_visuals/kit";
import {
  Arrow2,
  Coins1,
  Factory3,
  Pack4,
  Person3,
  Sheet,
  Store2,
  Truck2,
  TwoWay1,
  Warehouse,
} from "../_visuals/objects";

/* -- geometry helpers ------------------------------------------------------ */

/* -- the cast of the week -------------------------------------------------- */
/* The same five glyphs stand for the same five parties on every plate: a
   factory is the producer, a warehouse the wholesaler, a crate the jobber's
   broken bulk, a shopfront the retailer, a person the final consumer. */

/** A clash: two short strokes meeting at a struck point. */
export function Clash({ x, y, k = 1, tone = SIGNAL }: { x: number; y: number; k?: number; tone?: string }) {
  return (
    <path
      d={`M${x - 14 * k} ${y - 14 * k} L${x + 14 * k} ${y + 14 * k} M${x + 14 * k} ${y - 14 * k} L${x - 14 * k} ${y + 14 * k} M${x} ${y - 19 * k} V${y + 19 * k} M${x - 19 * k} ${y} H${x + 19 * k}`}
      stroke={tone}
      strokeWidth={2}
      strokeLinecap="round"
    />
  );
}

/** A standing caption under a glyph. */
export function Under({
  x,
  y,
  children,
  fill = INK,
  size = 10,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  fill?: string;
  size?: number;
}) {
  return (
    <Key x={x} y={y} anchor="middle" fill={fill} size={size}>
      {children}
    </Key>
  );
}

/* ==========================================================================
   0 · TITLE — from production to consumption (600)
   ========================================================================== */

export function ProductionToConsumption() {
  return (
    <Frame
      width={600}
      height={132}
      label="A factory on the left marked production, a truck and a shopfront between, and a person on the right marked consumption. An arrow runs the whole width."
    >
      <line x1={30} y1={112} x2={570} y2={112} stroke={RULE} strokeWidth={1.25} />
      <Factory3 x={72} y={112} />
      <Truck2 x={218} y={112} k={0.9} tone={SIGNAL} />
      <Store2 x={368} y={112} />
      <Person3 x={520} y={112} k={1.35} />
      <Arrow2 x1={110} y1={40} x2={488} y2={40} tone={SIGNAL} width={1.5} />
      <Under x={72} y={128} fill={INK}>
        PRODUCTION
      </Under>
      <Under x={520} y={128} fill={SIGNAL}>
        CONSUMPTION
      </Under>
      <Key x={299} y={28} anchor="middle" fill={INK3} size={9.5}>
        HOW PRODUCTS MOVE
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   1 · INTERDEPENDENT — a channel is a set of organizations, linked (400)
   ========================================================================== */

export function Interdependent() {
  const links = [
    { x: 92, tone: INK },
    { x: 172, tone: SIGNAL },
    { x: 252, tone: INK },
    { x: 332, tone: SIGNAL },
  ];
  return (
    <Frame
      width={400}
      height={190}
      label="Four chain links drawn overlapping so none can move without the others. A bracket beneath names them a set of interdependent organizations."
    >
      {links.map((l) => (
        <g key={l.x}>
          <rect x={l.x - 44} y={72} width={88} height={44} rx={22} fill="none" stroke={l.tone} strokeWidth={4} />
        </g>
      ))}
      <path d="M20 140 V150 H380 V140 M200 150 V160" stroke={INK3} strokeWidth={1.25} fill="none" />
      <Key x={200} y={176} anchor="middle" fill={INK} size={10}>
        INTERDEPENDENT ORGANIZATIONS
      </Key>
      <Key x={200} y={34} anchor="middle" fill={SIGNAL} size={10}>
        A SET
      </Key>
      <line x1={48} y1={44} x2={48} y2={60} stroke={RULE2} strokeWidth={1} />
      <line x1={352} y1={44} x2={352} y2={60} stroke={RULE2} strokeWidth={1} />
      <line x1={48} y1={44} x2={170} y2={44} stroke={RULE2} strokeWidth={1} />
      <line x1={230} y1={44} x2={352} y2={44} stroke={RULE2} strokeWidth={1} />
    </Frame>
  );
}

/* ==========================================================================
   2 · AVAILABLE FOR USE — the product within reach of the buyer (400)
   ========================================================================== */

export function MakeAvailable() {
  return (
    <Frame
      width={400}
      height={232}
      label="Above: the product finished at the plant, with the buyer far off across a dashed gap and nothing joining them. Below: the same product on a shelf the buyer is standing at, reaching for it."
    >
      <Factory3 x={52} y={88} k={0.72} tone={INK3} />
      <Pack4 x={112} y={88} w={34} h={30} tone={INK3} fill={PAPER2} />
      <line x1={24} y1={88} x2={140} y2={88} stroke={INK3} strokeWidth={1.75} />
      <Key x={82} y={108} anchor="middle" fill={INK3} size={9.5}>
        MADE
      </Key>
      <path d="M156 74 H310" stroke={RULE2} strokeWidth={1.25} strokeDasharray="5 5" />
      <Clash x={233} y={74} k={0.34} tone={RULE2} />
      <Person3 x={352} y={88} k={1.1} stroke={INK3} />
      <Key x={352} y={108} anchor="middle" fill={INK3} size={9.5}>
        A BUYER
      </Key>

      <line x1={20} y1={126} x2={380} y2={126} stroke={RULE} strokeWidth={1} />

      <Warehouse x={60} y={200} k={0.66} tone={SIGNAL} fill={SIGNAL_TINT} />
      <Store2 x={140} y={200} k={0.62} tone={SIGNAL} fill={SIGNAL_TINT} />
      <Arrow2 x1={92} y1={166} x2={116} y2={166} tone={SIGNAL} width={1.5} size={6} />
      <Key x={100} y={148} anchor="middle" fill={SIGNAL} size={9.5}>
        THESE ORGANIZATIONS
      </Key>
      <line x1={188} y1={200} x2={376} y2={200} stroke={INK} strokeWidth={2.5} />
      <Pack4 x={228} y={200} w={38} h={34} tone={SIGNAL} fill={SIGNAL_TINT} />
      <Arrow2 x1={176} y1={182} x2={206} y2={182} tone={SIGNAL} width={1.5} size={6} />
      <Person3 x={318} y={200} k={1.2} />
      {/* the buyer's arm, reaching from the shoulder to the product on the shelf */}
      <path d="M303 178 L256 186" stroke={INK} strokeWidth={2} strokeLinecap="round" />
      <Key x={282} y={224} anchor="middle" fill={SIGNAL} size={9.5}>
        MADE AVAILABLE FOR USE
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   3 · THE BRIDGE — the gap between producers and users, in three spans
   ========================================================================== */

export function ChannelSpan() {
  const piers = [
    { x: 260, name: "TIME", note: "made now, wanted later", drop: 270 },
    { x: 400, name: "PLACE", note: "made here, wanted there", drop: 292 },
    { x: 540, name: "POSSESSION", note: "owned by one, wanted by another", drop: 270 },
  ];
  return (
    <Frame
      height={362}
      label="A producer stands on the left bank and a user on the right bank, with a gap between them. A channel is drawn as a bridge across the gap, carried on three piers labelled time, place and possession."
    >
      <path d="M16 200 H150 V300 H16 Z" fill={PAPER2} stroke={INK3} strokeWidth={1.25} />
      <path d="M650 200 H784 V300 H650 Z" fill={PAPER2} stroke={INK3} strokeWidth={1.25} />
      <Factory3 x={82} y={198} />
      <Person3 x={716} y={198} k={1.4} />
      <Under x={82} y={222} fill={INK}>
        PRODUCERS
      </Under>
      <Under x={716} y={222} fill={INK}>
        USERS
      </Under>
      <path d="M150 322 H650" stroke={RULE2} strokeWidth={1.25} strokeDasharray="4 5" />
      <line x1={150} y1={314} x2={150} y2={330} stroke={RULE2} strokeWidth={1.25} />
      <line x1={650} y1={314} x2={650} y2={330} stroke={RULE2} strokeWidth={1.25} />
      <Key x={400} y={348} anchor="middle" fill={INK3} size={9.5}>
        THE GAP
      </Key>
      <rect x={150} y={150} width={500} height={16} fill={SIGNAL} />
      <Key x={400} y={138} anchor="middle" fill={SIGNAL} size={10.5}>
        THE MARKETING CHANNEL BRIDGES
      </Key>
      <Arrow2 x1={110} y1={158} x2={148} y2={158} tone={SIGNAL} width={1.5} />
      <Arrow2 x1={652} y1={158} x2={690} y2={158} tone={SIGNAL} width={1.5} />
      {piers.map((p) => (
        <g key={p.name}>
          <rect x={p.x - 7} y={166} width={14} height={62} fill={PAPER} stroke={SIGNAL} strokeWidth={1.5} />
          <Key x={p.x} y={248} anchor="middle" fill={SIGNAL} size={10.5}>
            {p.name}
          </Key>
          <line x1={p.x} y1={256} x2={p.x} y2={p.drop - 12} stroke={RULE2} strokeWidth={1} />
          <Note x={p.x} y={p.drop} anchor="middle" size={11} fill={INK3}>
            {p.note}
          </Note>
        </g>
      ))}
    </Frame>
  );
}

/* ==========================================================================
   4 · THE LARGER NETWORK — the channel is one part of a bigger whole
   ========================================================================== */

export function LargerNetwork() {
  return (
    <Frame
      height={250}
      label="A wide outlined band holding four parties. The marketing channel is one boxed group inside it, with suppliers standing before it and customers after it, so the band is visibly larger than the channel."
    >
      <rect x={16} y={20} width={768} height={212} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.5} />
      <Key x={38} y={46} fill={COUNTER} size={11}>
        A LARGER VALUE DELIVERY NETWORK
      </Key>
      <Pack4 x={92} y={166} w={44} h={38} />
      <Key x={92} y={192} anchor="middle" fill={INK} size={10}>
        SUPPLIERS
      </Key>
      <rect x={196} y={80} width={396} height={102} fill={PAPER} stroke={SIGNAL} strokeWidth={1.75} />
      <Key x={394} y={104} anchor="middle" fill={SIGNAL} size={10}>
        MARKETING CHANNELS
      </Key>
      <Factory3 x={272} y={166} k={0.7} tone={SIGNAL} />
      <Warehouse x={394} y={166} k={0.66} tone={SIGNAL} />
      <Store2 x={512} y={166} k={0.66} tone={SIGNAL} />
      <Arrow2 x1={124} y1={140} x2={190} y2={140} tone={COUNTER} width={1.5} size={7} />
      <Arrow2 x1={598} y1={140} x2={664} y2={140} tone={COUNTER} width={1.5} size={7} />
      <Person3 x={706} y={166} k={1.3} />
      <Key x={706} y={192} anchor="middle" fill={INK} size={10}>
        CUSTOMERS
      </Key>
      <Key x={394} y={216} anchor="middle" fill={COUNTER} size={10}>
        THE CHANNEL IS ONE PART OF IT
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   5 · WHO IS IN THE NETWORK — company, suppliers, distributors, customers
   ========================================================================== */

export function NetworkMembers() {
  const members = [
    { x: 104, name: "SUPPLIERS", glyph: "pack" },
    { x: 302, name: "THE COMPANY", glyph: "factory" },
    { x: 500, name: "DISTRIBUTORS", glyph: "warehouse" },
    { x: 698, name: "CUSTOMERS", glyph: "person" },
  ];
  return (
    <Frame
      height={230}
      label="Four members of the value delivery network in a row: suppliers, the company, distributors and customers, each joined to the next by a two-headed partnering arrow."
    >
      {members.map((m) => (
        <g key={m.name}>
          <rect x={m.x - 74} y={40} width={148} height={112} fill={PAPER} stroke={m.glyph === "factory" ? SIGNAL : INK} strokeWidth={m.glyph === "factory" ? 1.75 : 1.25} />
          {m.glyph === "pack" ? (
            <g>
              <Pack4 x={m.x - 18} y={124} w={34} h={30} />
              <Pack4 x={m.x + 20} y={124} w={34} h={44} />
            </g>
          ) : null}
          {m.glyph === "factory" ? <Factory3 x={m.x} y={124} tone={SIGNAL} fill={SIGNAL_TINT} /> : null}
          {m.glyph === "warehouse" ? <Warehouse x={m.x} y={124} /> : null}
          {m.glyph === "person" ? <Person3 x={m.x} y={124} k={1.5} /> : null}
          <Key x={m.x} y={172} anchor="middle" fill={m.glyph === "factory" ? SIGNAL : INK} size={10}>
            {m.name}
          </Key>
        </g>
      ))}
      <TwoWay1 x1={182} y1={96} x2={224} y2={96} tone={COUNTER} />
      <TwoWay1 x1={380} y1={96} x2={422} y2={96} tone={COUNTER} />
      <TwoWay1 x1={578} y1={96} x2={620} y2={96} tone={COUNTER} />
      <line x1={30} y1={198} x2={772} y2={198} stroke={COUNTER} strokeWidth={1.5} />
      <line x1={30} y1={192} x2={30} y2={204} stroke={COUNTER} strokeWidth={1.5} />
      <line x1={772} y1={192} x2={772} y2={204} stroke={COUNTER} strokeWidth={1.5} />
      <Key x={400} y={220} anchor="middle" fill={COUNTER} size={10}>
        EVERYONE PARTNERS
      </Key>
      <Key x={400} y={28} anchor="middle" fill={INK3} size={9.5}>
        THIS NETWORK INCLUDES
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   6 · WHOLE-SYSTEM PERFORMANCE — partnering lifts the system, not one part
   ========================================================================== */

export function SystemPerformance() {
  return (
    <Frame
      width={400}
      height={230}
      label="Four narrow bars, one per partner, standing under a single wide bar. The wide bar is the performance of the entire system, and it is lifted higher than any partner reaches alone."
    >
      <line x1={24} y1={180} x2={376} y2={180} stroke={INK} strokeWidth={1.5} />
      {[62, 132, 202, 272].map((x, i) => (
        <rect key={x} x={x} y={180 - (i === 1 ? 46 : 38)} width={44} height={i === 1 ? 46 : 38} fill={PAPER2} stroke={INK3} strokeWidth={1.25} />
      ))}
      <Key x={200} y={198} anchor="middle" fill={INK3} size={9.5}>
        EACH ON ITS OWN
      </Key>
      <rect x={62} y={62} width={254} height={34} fill={COUNTER} />
      <Key x={189} y={84} anchor="middle" fill={PAPER} size={10}>
        THE ENTIRE SYSTEM
      </Key>
      <Arrow2 x1={344} y1={140} x2={344} y2={70} tone={COUNTER} width={1.75} />
      <Key x={376} y={158} anchor="end" fill={COUNTER} size={9.5}>
        IMPROVE
      </Key>
      <line x1={62} y1={120} x2={316} y2={120} stroke={RULE2} strokeWidth={1} strokeDasharray="4 4" />
    </Frame>
  );
}

/* ==========================================================================
   7 · HUB AND SPOKE — information flowing through the channel
   [diagram: hub-and-spoke]
   ========================================================================== */

export function InformationHub() {
  const spokes = [
    { x: 150, y: 74, name: "PRODUCERS", glyph: "factory" },
    { x: 650, y: 74, name: "PRODUCERS", glyph: "factory" },
    { x: 150, y: 250, name: "CONSUMERS", glyph: "person" },
    { x: 650, y: 250, name: "CONSUMERS", glyph: "person" },
  ];
  return (
    <Frame
      height={340}
      label="Channel members at the hub in the centre. Spokes run out to producers above and consumers below, each spoke a two-headed arrow, because information flows both ways through the channel."
    >
      <circle cx={400} cy={162} r={76} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.75} />
      <Warehouse x={400} y={202} tone={SIGNAL} fill={PAPER} />
      <Key x={400} y={120} anchor="middle" fill={SIGNAL} size={10}>
        CHANNEL
      </Key>
      <Key x={400} y={136} anchor="middle" fill={SIGNAL} size={10}>
        MEMBERS
      </Key>
      {spokes.map((s, i) => {
        const dx = 400 - s.x;
        const dy = 162 - s.y;
        const len = Math.hypot(dx, dy);
        const ux = dx / len;
        const uy = dy / len;
        const ax = Math.round(s.x + ux * 66);
        const ay = Math.round(s.y + uy * 42);
        const bx = Math.round(400 - ux * 82);
        const by = Math.round(162 - uy * 82);
        return (
          <g key={i}>
            <TwoWay1 x1={ax} y1={ay} x2={bx} y2={by} tone={COUNTER} width={1.5} />
            {s.glyph === "factory" ? <Factory3 x={s.x} y={s.y + 26} /> : <Person3 x={s.x} y={s.y + 26} k={1.4} />}
            <Key x={s.x} y={s.y - 32} anchor="middle" fill={INK} size={10}>
              {s.name}
            </Key>
          </g>
        );
      })}
      <Key x={400} y={310} anchor="middle" fill={COUNTER} size={10.5}>
        INFORMATION FLOWS BOTH WAYS
      </Key>
      <line x1={244} y1={296} x2={556} y2={296} stroke={RULE} strokeWidth={1} />
    </Frame>
  );
}

/* ==========================================================================
   8 · ALONE OR WITH INTERMEDIARIES — how far the firm reaches (400)
   ========================================================================== */

export function MoreThanAlone() {
  const few = [56, 84, 112];
  const many = [40, 66, 92, 118, 144, 170, 196, 222];
  return (
    <Frame
      width={400}
      height={272}
      label="Above, the firm on its own runs a line to each of three buyers. Below, the same firm runs one line to an intermediary, which runs a line to each of sixteen."
    >
      <Factory3 x={50} y={98} k={0.78} tone={INK3} />
      <Key x={50} y={118} anchor="middle" fill={INK3} size={9.5}>
        ON ITS OWN
      </Key>
      {few.map((y) => (
        <line key={y} x1={82} y1={70} x2={142} y2={y} stroke={INK3} strokeWidth={1} />
      ))}
      {few.map((y) => (
        <Person3 key={y} x={158} y={y + 11} k={0.66} stroke={INK3} />
      ))}
      <line x1={20} y1={136} x2={380} y2={136} stroke={RULE} strokeWidth={1} />

      <Factory3 x={50} y={230} k={0.78} tone={SIGNAL} fill={SIGNAL_TINT} />
      <Key x={50} y={248} anchor="middle" fill={SIGNAL} size={9.5}>
        THROUGH THEM
      </Key>
      <Arrow2 x1={84} y1={200} x2={124} y2={200} tone={SIGNAL} width={1.75} size={7} />
      <Warehouse x={166} y={224} k={0.8} tone={SIGNAL} fill={SIGNAL_TINT} />
      {many.map((y) => (
        <line key={y} x1={200} y1={200} x2={252} y2={y + 11} stroke={SIGNAL} strokeWidth={0.9} />
      ))}
      {many.map((y) => (
        <Person3 key={y} x={268} y={y + 22} k={0.62} stroke={SIGNAL} />
      ))}
      {many.map((y) => (
        <Person3 key={`b${y}`} x={312} y={y + 22} k={0.62} stroke={SIGNAL} />
      ))}
      <Key x={376} y={266} anchor="end" fill={SIGNAL} size={9.5}>
        MORE THAN IT CAN ACHIEVE ALONE
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   9 · WHAT INTERMEDIARIES BRING — contacts, experience, specialization, scale
   ========================================================================== */

export function FourResources() {
  const items = [
    { x: 116, name: "CONTACTS" },
    { x: 310, name: "EXPERIENCE" },
    { x: 504, name: "SPECIALIZATION" },
    { x: 690, name: "SCALE OF OPERATION" },
  ];
  return (
    <Frame
      height={260}
      label="Four tiles, each drawing one thing an intermediary brings: a web of contacts, a stack of years of experience, a single sharpened specialization, and a scale of operation drawn as many crates."
    >
      {items.map((it, i) => (
        <g key={it.name}>
          <rect x={it.x - 88} y={30} width={176} height={150} fill={PAPER} stroke={i === 3 ? SIGNAL : INK} strokeWidth={1.25} />
          <Key x={it.x} y={206} anchor="middle" fill={i === 3 ? SIGNAL : INK} size={10}>
            {it.name}
          </Key>
        </g>
      ))}
      {/* contacts: one node joined out to six */}
      <g>
        {[
          [60, 62],
          [170, 62],
          [46, 106],
          [184, 106],
          [78, 150],
          [156, 150],
        ].map(([x, y], i) => (
          <g key={i}>
            <line x1={116} y1={106} x2={x} y2={y} stroke={INK3} strokeWidth={1} />
            <circle cx={x} cy={y} r={7} fill={PAPER} stroke={INK} strokeWidth={1.25} />
          </g>
        ))}
        <circle cx={116} cy={106} r={11} fill={INK} />
      </g>
      {/* experience: stacked layers, oldest at the bottom */}
      <g>
        {[0, 1, 2, 3, 4].map((i) => (
          <rect
            key={i}
            x={310 - 62 + i * 6}
            y={152 - i * 22}
            width={124 - i * 12}
            height={18}
            fill={i === 4 ? INK : PAPER2}
            stroke={INK}
            strokeWidth={1.25}
          />
        ))}
      </g>
      {/* specialization: many shapes, one kept and sharpened */}
      <g>
        {[
          [452, 62],
          [504, 62],
          [556, 62],
          [452, 150],
          [556, 150],
        ].map(([x, y], i) => (
          <rect key={i} x={x - 16} y={y - 16} width={32} height={32} fill="none" stroke={RULE2} strokeWidth={1.25} strokeDasharray="4 4" />
        ))}
        <path d="M504 82 L534 106 L504 130 L474 106 Z" fill={INK} />
      </g>
      {/* scale: a grid of crates */}
      <g>
        {[0, 1, 2, 3].map((r) =>
          [0, 1, 2, 3, 4].map((c) => (
            <rect
              key={`${r}-${c}`}
              x={620 + c * 30}
              y={54 + r * 30}
              width={24}
              height={24}
              fill={SIGNAL_TINT}
              stroke={SIGNAL}
              strokeWidth={1.25}
            />
          )),
        )}
      </g>
      <Key x={400} y={244} anchor="middle" fill={INK3} size={9.5}>
        WHAT INTERMEDIARIES OFFER THE FIRM
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   10 · ASSORTMENTS — what producers make, sorted into what consumers want
   ========================================================================== */

export function AssortmentTransform() {
  const made = [
    { x: 92, n: 5, tone: INK },
    { x: 152, n: 5, tone: INK },
    { x: 212, n: 5, tone: INK },
  ];
  const wanted = [598, 664, 730];
  return (
    <Frame
      height={300}
      label="On the left, three deep stacks: each producer makes many of one item. In the middle, a sorting table. On the right, three shallow baskets, each holding one of every item: the assortment a consumer wants."
    >
      <Key x={152} y={30} anchor="middle" fill={INK} size={10}>
        MADE BY PRODUCERS
      </Key>
      {made.map((m, ci) =>
        Array.from({ length: m.n }, (_, i) => (
          <rect
            key={`${ci}-${i}`}
            x={m.x - 22}
            y={214 - i * 32}
            width={44}
            height={28}
            fill={ci === 0 ? PAPER2 : ci === 1 ? SIGNAL_TINT : COUNTER_TINT}
            stroke={ci === 0 ? INK : ci === 1 ? SIGNAL : COUNTER}
            strokeWidth={1.25}
          />
        )),
      )}
      <line x1={60} y1={244} x2={244} y2={244} stroke={INK} strokeWidth={1.5} />
      <Note x={152} y={266} anchor="middle" size={11} fill={INK3}>
        many of one thing
      </Note>

      <rect x={300} y={106} width={200} height={104} fill={PAPER} stroke={SIGNAL} strokeWidth={1.75} />
      <Key x={400} y={142} anchor="middle" fill={SIGNAL} size={10}>
        THEY
      </Key>
      <Key x={400} y={160} anchor="middle" fill={SIGNAL} size={10}>
        TRANSFORM
      </Key>
      <Key x={400} y={186} anchor="middle" fill={SIGNAL} size={10}>
        THE ASSORTMENTS
      </Key>
      <Arrow2 x1={256} y1={158} x2={296} y2={158} tone={SIGNAL} width={1.75} />
      <Arrow2 x1={504} y1={158} x2={548} y2={158} tone={SIGNAL} width={1.75} />

      <Key x={664} y={30} anchor="middle" fill={INK} size={10}>
        WANTED BY CONSUMERS
      </Key>
      {wanted.map((x) => (
        <g key={x}>
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              x={x - 22}
              y={214 - i * 32}
              width={44}
              height={28}
              fill={i === 0 ? PAPER2 : i === 1 ? SIGNAL_TINT : COUNTER_TINT}
              stroke={i === 0 ? INK : i === 1 ? SIGNAL : COUNTER}
              strokeWidth={1.25}
            />
          ))}
        </g>
      ))}
      <line x1={566} y1={244} x2={762} y2={244} stroke={INK} strokeWidth={1.5} />
      <Note x={664} y={266} anchor="middle" size={11} fill={INK3}>
        one of each thing
      </Note>
    </Frame>
  );
}

/* ==========================================================================
   11–16 · THE SIX CHANNEL FUNCTIONS — one column plate each (400)
   The six share a frame height so the two rows of three sit level.
   ========================================================================== */

const FN_H = 210;

/** Information gathering about consumers and competitors. */
export function FnInformation() {
  return (
    <Frame
      width={400}
      height={FN_H}
      label="Two groups, one of consumers and one of competitors, each under its own magnifier. What both lenses find is collected into one report."
    >
      <rect x={20} y={48} width={144} height={96} fill={PAPER} stroke={INK} strokeWidth={1.25} />
      <Person3 x={56} y={130} k={0.88} />
      <Person3 x={92} y={130} k={0.88} />
      <Person3 x={128} y={130} k={0.88} />
      <Key x={92} y={70} anchor="middle" fill={INK} size={9.5}>
        CONSUMERS
      </Key>
      <g>
        <circle cx={92} cy={112} r={26} fill="none" stroke={SIGNAL} strokeWidth={2.25} />
        <line x1={110} y1={131} x2={124} y2={146} stroke={SIGNAL} strokeWidth={3} strokeLinecap="round" />
      </g>
      <rect x={186} y={48} width={126} height={96} fill={PAPER} stroke={COUNTER} strokeWidth={1.25} />
      <Factory3 x={222} y={134} k={0.6} tone={COUNTER} />
      <Factory3 x={276} y={134} k={0.6} tone={COUNTER} />
      <Key x={249} y={70} anchor="middle" fill={COUNTER} size={9.5}>
        COMPETITORS
      </Key>
      <g>
        <circle cx={249} cy={112} r={26} fill="none" stroke={SIGNAL} strokeWidth={2.25} />
        <line x1={267} y1={131} x2={281} y2={146} stroke={SIGNAL} strokeWidth={3} strokeLinecap="round" />
      </g>
      <Sheet x={358} y={96} w={48} h={62} tone={SIGNAL} lines={5} />
      <path d="M92 156 V170 H358 V132" fill="none" stroke={SIGNAL} strokeWidth={1.25} />
      <path d="M249 156 V170" fill="none" stroke={SIGNAL} strokeWidth={1.25} />
      <path d={headAlong1(358, 128, 0, -1)} fill="none" stroke={SIGNAL} strokeWidth={1.25} />
      <Key x={200} y={194} anchor="middle" fill={SIGNAL} size={10}>
        INFORMATION GATHERING
      </Key>
    </Frame>
  );
}

export function FnPromotion() {
  return (
    <Frame
      width={400}
      height={FN_H}
      label="An offer is drafted as a sheet, then carried outward by a megaphone whose sound reaches a spread of listeners."
    >
      <Sheet x={58} y={96} w={50} h={64} tone={INK} lines={5} seal={SIGNAL} />
      <Key x={58} y={150} anchor="middle" fill={INK} size={9.5}>
        AN OFFER
      </Key>
      <Arrow2 x1={92} y1={96} x2={116} y2={96} tone={INK3} width={1.25} size={7} />
      <path d="M134 78 H158 L196 52 V140 L158 114 H134 Z" fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.75} strokeLinejoin="round" />
      {[24, 42, 60].map((r, i) => (
        <path
          key={r}
          d={`M${210 + i * 22} ${96 - r} A${r} ${r} 0 0 1 ${210 + i * 22} ${96 + r}`}
          fill="none"
          stroke={SIGNAL}
          strokeWidth={1.5}
          opacity={1 - i * 0.22}
        />
      ))}
      {[62, 96, 130].map((y) => (
        <Person3 key={y} x={352} y={y + 14} k={0.72} stroke={INK} />
      ))}
      <Key x={200} y={186} anchor="middle" fill={SIGNAL} size={10}>
        DEVELOPMENT AND DISSEMINATION
      </Key>
    </Frame>
  );
}

/** Contacting prospective buyers and matching offers to their needs. */
export function FnContacting() {
  const pairs = [
    { oy: 70, by: 58, tone: SIGNAL },
    { oy: 110, by: 152, tone: COUNTER },
    { oy: 150, by: 105, tone: INK },
  ];
  return (
    <Frame
      width={400}
      height={FN_H}
      label="Three offers on the left and three prospective buyers on the right, each spaced clear of the next. A line runs from each offer to the buyer whose need it meets."
    >
      <Key x={76} y={40} anchor="middle" fill={INK} size={9.5}>
        OFFERS
      </Key>
      <Key x={324} y={40} anchor="middle" fill={INK} size={9.5}>
        PROSPECTIVE BUYERS
      </Key>
      {pairs.map((p, i) => (
        <g key={i}>
          <Pack4 x={76} y={p.oy + 16} w={40} h={32} tone={p.tone} fill={i === 0 ? SIGNAL_TINT : PAPER} />
          <Person3 x={324} y={p.by + 20} k={0.92} stroke={p.tone} />
          <path
            d={`M100 ${p.oy} C180 ${p.oy} 224 ${p.by} 300 ${p.by}`}
            fill="none"
            stroke={p.tone}
            strokeWidth={1.5}
            strokeDasharray={i === 0 ? undefined : "5 4"}
          />
        </g>
      ))}
      <Key x={200} y={194} anchor="middle" fill={SIGNAL} size={10}>
        MATCHING OFFERS TO BUYER NEEDS
      </Key>
    </Frame>
  );
}

export function FnNegotiating() {
  return (
    <Frame
      width={400}
      height={FN_H}
      label="Two parties face each other across a table holding price and terms. Once they agree, the title to the goods passes from one side to the other."
    >
      <Person3 x={56} y={112} k={1.15} />
      <Person3 x={344} y={112} k={1.15} stroke={COUNTER} />
      <rect x={112} y={54} width={176} height={58} fill={PAPER} stroke={INK} strokeWidth={1.25} />
      <Key x={200} y={76} anchor="middle" fill={INK} size={9.5}>
        PRICE
      </Key>
      <Key x={200} y={98} anchor="middle" fill={INK} size={9.5}>
        AND OTHER TERMS
      </Key>
      <TwoWay1 x1={90} y1={82} x2={108} y2={82} tone={INK3} />
      <TwoWay1 x1={292} y1={82} x2={310} y2={82} tone={INK3} />
      <line x1={24} y1={126} x2={376} y2={126} stroke={RULE} strokeWidth={1} />
      <Sheet x={140} y={152} w={38} h={44} tone={SIGNAL} lines={3} seal={SIGNAL} />
      <Arrow2 x1={168} y1={152} x2={246} y2={152} tone={SIGNAL} width={1.75} />
      <Key x={266} y={156} fill={SIGNAL} size={9.5}>
        OWNERSHIP
      </Key>
      <Key x={200} y={190} anchor="middle" fill={SIGNAL} size={10}>
        SO THAT IT CAN BE TRANSFERRED
      </Key>
    </Frame>
  );
}

/** Physical distribution of goods. */
export function FnPhysical() {
  return (
    <Frame
      width={400}
      height={FN_H}
      label="A warehouse, a crate, a truck and a shopfront standing along one road, with an arrow over them: the goods themselves being moved from one end to the other."
    >
      <Warehouse x={58} y={122} k={0.86} />
      <line x1={20} y1={122} x2={380} y2={122} stroke={INK} strokeWidth={1.75} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line key={i} x1={112 + i * 44} y1={132} x2={132 + i * 44} y2={132} stroke={RULE2} strokeWidth={2} />
      ))}
      <Pack4 x={124} y={122} w={30} h={26} tone={SIGNAL} fill={SIGNAL_TINT} />
      <Truck2 x={228} y={122} k={1.05} tone={SIGNAL} />
      <Store2 x={340} y={122} k={0.86} />
      <Arrow2 x1={110} y1={58} x2={300} y2={58} tone={SIGNAL} width={1.5} />
      <Key x={200} y={44} anchor="middle" fill={SIGNAL} size={9.5}>
        GOODS MOVE
      </Key>
      <Key x={200} y={186} anchor="middle" fill={SIGNAL} size={10}>
        PHYSICAL DISTRIBUTION
      </Key>
    </Frame>
  );
}

/** Financing the channel work and taking the risks of carrying it out. */
export function FnFinancing() {
  return (
    <Frame
      width={400}
      height={FN_H}
      label="Coins paid down to fund the channel's work, drawn as a beam the intermediary holds up while also carrying a block marked risk."
    >
      <Coins1 x={70} y={104} n={5} rx={22} tone={SIGNAL} />
      <Key x={70} y={126} anchor="middle" fill={SIGNAL} size={9.5}>
        FINANCING
      </Key>
      <Arrow2 x1={104} y1={82} x2={150} y2={82} tone={SIGNAL} width={1.5} size={7} />
      <rect x={162} y={64} width={126} height={38} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <Key x={225} y={88} anchor="middle" fill={INK} size={9.5}>
        CHANNEL WORK
      </Key>
      <Person3 x={225} y={152} k={1.2} />
      <rect x={300} y={54} width={76} height={48} fill={SIGNAL} />
      <Key x={338} y={82} anchor="middle" fill={PAPER} size={10}>
        RISKS
      </Key>
      <line x1={294} y1={54} x2={294} y2={102} stroke={INK} strokeWidth={1.25} />
      <line x1={162} y1={112} x2={376} y2={112} stroke={INK} strokeWidth={1.75} />
      <Key x={200} y={190} anchor="middle" fill={SIGNAL} size={10}>
        AND TAKING THE RISKS OF IT
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   17 · ONE LEVEL — a layer of intermediaries brings the product closer
   ========================================================================== */

export function LevelLayer() {
  return (
    <Frame
      height={250}
      label="A ruled line from the producer to the final buyer. A single layer of intermediaries sits across it, and the distance still to travel is shorter after it than before."
    >
      <Factory3 x={62} y={140} />
      <Under x={62} y={164} fill={INK}>
        PRODUCER
      </Under>
      <Person3 x={742} y={140} k={1.4} />
      <Under x={742} y={164} fill={INK}>
        THE FINAL BUYER
      </Under>
      <line x1={100} y1={112} x2={704} y2={112} stroke={RULE} strokeWidth={1.25} />
      <rect x={330} y={62} width={148} height={102} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.75} />
      <Warehouse x={404} y={160} k={0.7} tone={SIGNAL} fill={PAPER} />
      <Key x={404} y={82} anchor="middle" fill={SIGNAL} size={10}>
        A CHANNEL LEVEL
      </Key>
      <Note x={404} y={100} anchor="middle" size={11} fill={SIGNAL}>
        a layer of intermediaries
      </Note>
      <Arrow2 x1={488} y1={200} x2={700} y2={200} tone={SIGNAL} width={1.5} />
      <line x1={100} y1={194} x2={100} y2={206} stroke={INK3} strokeWidth={1.25} />
      <line x1={488} y1={194} x2={488} y2={206} stroke={SIGNAL} strokeWidth={1.25} />
      <line x1={100} y1={200} x2={326} y2={200} stroke={INK3} strokeWidth={1.25} strokeDasharray="5 4" />
      <Key x={594} y={226} anchor="middle" fill={SIGNAL} size={10}>
        CLOSER TO THE FINAL BUYER
      </Key>
      <Key x={400} y={36} anchor="middle" fill={INK3} size={9.5}>
        IT PERFORMS SOME OF THE WORK
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   18 · LENGTH — the number of levels is the length of the channel
   ========================================================================== */

export function ChannelLength() {
  const rows = [
    { y: 74, levels: 0, glyphs: [] as string[] },
    { y: 152, levels: 1, glyphs: ["store"] },
    { y: 230, levels: 2, glyphs: ["warehouse", "store"] },
  ];
  return (
    <Frame
      height={300}
      label="Three channels stacked. The first has no intermediary between producer and buyer, the second has one, the third has two. A count on the right shows the number of levels, which is the length of the channel."
    >
      <Key x={400} y={30} anchor="middle" fill={INK3} size={9.5}>
        THE NUMBER OF INTERMEDIARY LEVELS
      </Key>
      <line x1={664} y1={44} x2={664} y2={274} stroke={RULE} strokeWidth={1.25} />
      <Key x={724} y={48} anchor="middle" fill={INK} size={9.5}>
        LENGTH
      </Key>
      {rows.map((r) => (
        <g key={r.levels}>
          <Factory3 x={64} y={r.y + 24} k={0.62} />
          <Person3 x={608} y={r.y + 24} k={1} />
          <line x1={92} y1={r.y} x2={584} y2={r.y} stroke={RULE2} strokeWidth={1} />
          {r.glyphs.map((g, i) => {
            const x = 240 + i * 176;
            return (
              <g key={i}>
                <rect x={x - 62} y={r.y - 26} width={124} height={52} fill={PAPER} stroke={SIGNAL} strokeWidth={1.5} />
                {g === "warehouse" ? (
                  <Warehouse x={x - 34} y={r.y + 18} k={0.58} tone={SIGNAL} />
                ) : (
                  <Store2 x={x - 34} y={r.y + 18} k={0.58} tone={SIGNAL} />
                )}
                <Key x={x + 4} y={r.y + 4} fill={SIGNAL} size={9.5}>
                  LEVEL
                </Key>
              </g>
            );
          })}
          <Display x={724} y={r.y + 10} anchor="middle" fill={r.levels === 0 ? SIGNAL : INK} size={28}>
            {String(r.levels)}
          </Display>
        </g>
      ))}
      <Key x={164} y={94} anchor="middle" fill={SIGNAL} size={10}>
        DIRECT
      </Key>
      <Key x={400} y={290} anchor="middle" fill={INK3} size={9.5}>
        MORE LEVELS, A LONGER CHANNEL
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   19 · NO LEVELS — the direct marketing channel (400)
   ========================================================================== */

export function DirectChannel() {
  return (
    <Frame
      width={400}
      height={190}
      label="A producer joined straight to a buyer by one unbroken arrow. The space between them is empty and marked as having no intermediary levels."
    >
      <Factory3 x={62} y={116} />
      <Under x={62} y={140} fill={INK}>
        PRODUCER
      </Under>
      <Person3 x={338} y={116} k={1.4} />
      <Under x={338} y={140} fill={INK}>
        BUYER
      </Under>
      <Arrow2 x1={100} y1={88} x2={296} y2={88} tone={SIGNAL} width={2.5} />
      <rect x={128} y={38} width={140} height={34} fill="none" stroke={RULE2} strokeWidth={1.25} strokeDasharray="5 5" />
      <Key x={198} y={60} anchor="middle" fill={INK3} size={9.5}>
        NO LEVELS
      </Key>
      <Key x={200} y={172} anchor="middle" fill={SIGNAL} size={10}>
        DIRECT MARKETING CHANNEL
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   20 · ONE OR MORE — wholesalers, jobbers, retailers
   ========================================================================== */

export function IndirectLevels() {
  const rows = [
    { y: 82, stops: [{ x: 400, name: "RETAILER", g: "store" }] },
    {
      y: 176,
      stops: [
        { x: 296, name: "WHOLESALER", g: "warehouse" },
        { x: 504, name: "RETAILER", g: "store" },
      ],
    },
    {
      y: 270,
      stops: [
        { x: 244, name: "WHOLESALER", g: "warehouse" },
        { x: 400, name: "JOBBER", g: "pack" },
        { x: 556, name: "RETAILER", g: "store" },
      ],
    },
  ];
  return (
    <Frame
      height={340}
      label="Three indirect channels stacked. The first passes through a retailer, the second through a wholesaler then a retailer, the third through a wholesaler, a jobber and a retailer."
    >
      <Key x={400} y={28} anchor="middle" fill={INK3} size={9.5}>
        ONE OR MORE INTERMEDIARY LEVELS
      </Key>
      {rows.map((r, ri) => (
        <g key={ri}>
          <Factory3 x={56} y={r.y + 22} k={0.6} />
          <Person3 x={738} y={r.y + 22} k={1} />
          <line x1={84} y1={r.y} x2={712} y2={r.y} stroke={RULE} strokeWidth={1} />
          {r.stops.map((s) => (
            <g key={s.x}>
              <circle cx={s.x} cy={r.y} r={22} fill={PAPER} stroke={SIGNAL} strokeWidth={1.75} />
              {s.g === "warehouse" ? <Warehouse x={s.x} y={r.y + 12} k={0.46} tone={SIGNAL} /> : null}
              {s.g === "store" ? <Store2 x={s.x} y={r.y + 12} k={0.46} tone={SIGNAL} /> : null}
              {s.g === "pack" ? <Pack4 x={s.x} y={r.y + 11} w={22} h={20} tone={SIGNAL} fill={SIGNAL_TINT} /> : null}
              <Key x={s.x} y={r.y - 30} anchor="middle" fill={SIGNAL} size={9.5}>
                {s.name}
              </Key>
            </g>
          ))}
        </g>
      ))}
      <Key x={400} y={322} anchor="middle" fill={INK3} size={9.5}>
        COMMON LEVELS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   21 · CONTROL AND COMPLEXITY — they move opposite ways (400)
   ========================================================================== */

export function ControlComplexity() {
  return (
    <Frame
      width={400}
      height={250}
      label="A plot with the number of levels along the bottom. One line falls as levels are added: the producer's control. The other rises: channel complexity."
    >
      <line x1={56} y1={196} x2={376} y2={196} stroke={INK} strokeWidth={1.5} />
      <line x1={56} y1={40} x2={56} y2={196} stroke={INK} strokeWidth={1.5} />
      <path d="M72 62 L360 176" stroke={INK} strokeWidth={2} fill="none" />
      <path d="M72 176 L360 62" stroke={SIGNAL} strokeWidth={2} fill="none" />
      <Key x={356} y={166} anchor="end" fill={INK} size={9.5}>
        LESS CONTROL
      </Key>
      <Key x={356} y={52} anchor="end" fill={SIGNAL} size={9.5}>
        GREATER COMPLEXITY
      </Key>
      <Key x={216} y={222} anchor="middle" fill={INK3} size={9.5}>
        MORE LEVELS
      </Key>
      <Arrow2 x1={72} y1={214} x2={356} y2={214} tone={INK3} width={1.25} size={7} />
      {[72, 168, 264, 360].map((x) => (
        <line key={x} x1={x} y1={196} x2={x} y2={202} stroke={INK3} strokeWidth={1.25} />
      ))}
    </Frame>
  );
}

/* ==========================================================================
   22 · TWO ROUTES — the discussion fork for a new organic snack brand
   ========================================================================== */

export function TwoRoutes() {
  return (
    <Frame
      height={300}
      label="A new snack brand at a fork. The upper route goes straight to buyers through its own website. The lower route goes through a major grocery chain and reaches a much wider shelf."
    >
      <Pack4 x={72} y={170} w={56} h={52} tone={SIGNAL} fill={SIGNAL_TINT} />
      <Key x={72} y={194} anchor="middle" fill={SIGNAL} size={9.5}>
        A NEW BRAND
      </Key>
      <path d="M112 146 C190 146 196 78 268 78" fill="none" stroke={SIGNAL} strokeWidth={2} />
      <path d={headAlong1(272, 78, 1, 0)} fill="none" stroke={SIGNAL} strokeWidth={2} />
      <path d="M112 146 C190 146 196 232 268 232" fill="none" stroke={COUNTER} strokeWidth={2} />
      <path d={headAlong1(272, 232, 1, 0)} fill="none" stroke={COUNTER} strokeWidth={2} />

      <rect x={292} y={40} width={128} height={76} fill={PAPER} stroke={SIGNAL} strokeWidth={1.5} />
      <path d="M292 60 H420" stroke={SIGNAL} strokeWidth={1.25} />
      <circle cx={304} cy={50} r={3} fill={SIGNAL} />
      <circle cx={314} cy={50} r={3} fill={SIGNAL} />
      <Key x={356} y={92} anchor="middle" fill={SIGNAL} size={9.5}>
        YOUR WEBSITE
      </Key>
      <Arrow2 x1={428} y1={78} x2={492} y2={78} tone={SIGNAL} width={1.5} size={7} />
      <Person3 x={528} y={100} k={1.15} stroke={SIGNAL} />
      <Key x={528} y={122} anchor="middle" fill={INK3} size={9.5}>
        DIRECTLY
      </Key>

      <Store2 x={340} y={256} tone={COUNTER} />
      <Key x={340} y={278} anchor="middle" fill={COUNTER} size={9.5}>
        A MAJOR GROCERY CHAIN
      </Key>
      <Arrow2 x1={392} y1={224} x2={460} y2={224} tone={COUNTER} width={1.5} size={7} />
      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2, 3, 4].map((c) => (
          <Person3 key={`${r}-${c}`} x={498 + c * 56} y={196 + r * 34} k={0.56} stroke={COUNTER} />
        )),
      )}
      <line x1={476} y1={36} x2={476} y2={280} stroke={RULE} strokeWidth={1} strokeDasharray="5 5" />
    </Frame>
  );
}

/* ==========================================================================
   23 · A BEHAVIORAL SYSTEM — people and companies, not boxes and pipes
   ========================================================================== */

export function BehavioralSystem() {
  const firms = [
    { x: 144, g: "factory" },
    { x: 368, g: "warehouse" },
    { x: 592, g: "store" },
  ];
  return (
    <Frame
      height={250}
      label="Three firms in a row, each drawn with the people inside it. Two-headed arrows run between the people across firm boundaries, because the channel is a system of interaction."
    >
      <rect x={16} y={26} width={768} height={168} fill="none" stroke={COUNTER} strokeWidth={1.5} strokeDasharray="6 5" />
      <Key x={38} y={50} fill={COUNTER} size={10}>
        A COMPLEX BEHAVIORAL SYSTEM
      </Key>
      {firms.map((f) => (
        <g key={f.x}>
          <rect x={f.x - 78} y={66} width={156} height={110} fill={PAPER} stroke={INK} strokeWidth={1.25} />
          {f.g === "factory" ? <Factory3 x={f.x - 40} y={166} k={0.72} /> : null}
          {f.g === "warehouse" ? <Warehouse x={f.x - 40} y={166} k={0.68} /> : null}
          {f.g === "store" ? <Store2 x={f.x - 40} y={166} k={0.68} /> : null}
          <Person3 x={f.x + 24} y={166} k={1} stroke={SIGNAL} />
          <Person3 x={f.x + 54} y={166} k={1} stroke={SIGNAL} />
        </g>
      ))}
      <Person3 x={738} y={166} k={1.2} />
      <Under x={738} y={190} fill={INK}>
        CUSTOMER
      </Under>
      <TwoWay1 x1={224} y1={102} x2={286} y2={102} tone={SIGNAL} width={1.5} />
      <TwoWay1 x1={448} y1={102} x2={510} y2={102} tone={SIGNAL} width={1.5} />
      <TwoWay1 x1={672} y1={102} x2={716} y2={102} tone={SIGNAL} width={1.5} />
      <Key x={400} y={222} anchor="middle" fill={SIGNAL} size={10}>
        PEOPLE AND COMPANIES INTERACT
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   24 · THREE SETS OF GOALS — individual, company, channel
   ========================================================================== */

export function ThreeGoals() {
  return (
    <Frame
      height={278}
      label="Three nested rings. The innermost holds the individual's goals, the middle the company's, the outermost the channel's. All three are being pursued at once."
    >
      <circle cx={260} cy={124} r={104} fill={PAPER} stroke={COUNTER} strokeWidth={1.75} />
      <circle cx={260} cy={124} r={70} fill={PAPER2} stroke={INK} strokeWidth={1.5} />
      <circle cx={260} cy={124} r={34} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
      <Person3 x={260} y={138} k={0.8} stroke={SIGNAL} />
      <line x1={294} y1={124} x2={470} y2={124} stroke={SIGNAL} strokeWidth={1.25} />
      <line x1={330} y1={90} x2={470} y2={90} stroke={INK} strokeWidth={1.25} />
      <line x1={364} y1={52} x2={470} y2={52} stroke={COUNTER} strokeWidth={1.25} />
      <Key x={482} y={128} fill={SIGNAL} size={10.5}>
        INDIVIDUAL
      </Key>
      <Key x={482} y={94} fill={INK} size={10.5}>
        COMPANY
      </Key>
      <Key x={482} y={56} fill={COUNTER} size={10.5}>
        CHANNEL
      </Key>
      <Note x={482} y={148} size={12} fill={INK3}>
        goals, all at once
      </Note>
      <Key x={400} y={264} anchor="middle" fill={INK3} size={9.5}>
        WHAT THE INTERACTION IS MEANT TO ACCOMPLISH
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   25 · WORKING TOGETHER — the joint pull decides success (400)
   ========================================================================== */

export function WorkTogether() {
  return (
    <Frame
      width={400}
      height={210}
      label="Three channel members standing on one line, each with a hand on the same rope, pulling a load that is moving off to the right."
    >
      <line x1={24} y1={150} x2={376} y2={150} stroke={RULE} strokeWidth={1.25} />
      <Person3 x={58} y={150} k={1.05} stroke={SIGNAL} />
      <Person3 x={104} y={150} k={1.05} stroke={SIGNAL} />
      <Person3 x={150} y={150} k={1.05} stroke={SIGNAL} />
      {/* the rope runs at arm height, below every head */}
      <line x1={52} y1={130} x2={250} y2={130} stroke={SIGNAL} strokeWidth={2.5} />
      <rect x={254} y={106} width={56} height={44} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.75} />
      <Arrow2 x1={318} y1={128} x2={370} y2={128} tone={SIGNAL} width={2} />
      <Key x={200} y={72} anchor="middle" fill={INK3} size={9.5}>
        ONE ROPE, ONE DIRECTION
      </Key>
      <line x1={120} y1={82} x2={280} y2={82} stroke={RULE2} strokeWidth={1} />
      <Key x={200} y={188} anchor="middle" fill={SIGNAL} size={10}>
        HOW WELL THEY WORK TOGETHER
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   26 · THE THREE DISPUTES — goals, roles, rewards
   ========================================================================== */

export function GoalsRolesRewards() {
  const items = [
    { x: 208, name: "GOALS", note: "where we are going" },
    { x: 400, name: "ROLES", note: "who does what" },
    { x: 592, name: "REWARDS", note: "who gets what" },
  ];
  return (
    <Frame
      height={250}
      label="Two channel members face each other. Between them sit three contested items: goals, roles and rewards. Each is struck through with a clash mark."
    >
      <Person3 x={62} y={150} k={1.5} />
      <Person3 x={738} y={150} k={1.5} stroke={COUNTER} />
      <Under x={62} y={174} fill={INK}>
        MEMBER
      </Under>
      <Under x={738} y={174} fill={COUNTER}>
        MEMBER
      </Under>
      {items.map((it) => (
        <g key={it.name}>
          <rect x={it.x - 78} y={66} width={156} height={72} fill={PAPER} stroke={SIGNAL} strokeWidth={1.5} />
          <Key x={it.x} y={98} anchor="middle" fill={SIGNAL} size={11}>
            {it.name}
          </Key>
          <Note x={it.x} y={122} anchor="middle" size={11} fill={INK3}>
            {it.note}
          </Note>
          <Clash x={it.x} y={168} k={0.6} />
        </g>
      ))}
      <line x1={104} y1={102} x2={128} y2={102} stroke={INK3} strokeWidth={1.25} />
      <line x1={672} y1={102} x2={696} y2={102} stroke={INK3} strokeWidth={1.25} />
      <Key x={400} y={222} anchor="middle" fill={SIGNAL} size={10}>
        MEMBERS DISAGREE
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   27 · HORIZONTAL CONFLICT — among firms at the same level (400)
   ========================================================================== */

export function HorizontalConflict() {
  return (
    <Frame
      width={400}
      height={230}
      label="One producer above, feeding a row of three retailers on the same rung. The clash sits between two of those retailers, along the rung."
    >
      <Factory3 x={200} y={66} k={0.72} tone={INK3} />
      {[70, 200, 330].map((x) => (
        <line key={x} x1={200} y1={72} x2={x} y2={122} stroke={RULE2} strokeWidth={1} />
      ))}
      <line x1={30} y1={140} x2={370} y2={140} stroke={SIGNAL} strokeWidth={2} />
      {[70, 200, 330].map((x) => (
        <Store2 key={x} x={x} y={172} k={0.82} tone={SIGNAL} />
      ))}
      <Clash x={135} y={140} k={0.72} />
      <Clash x={265} y={140} k={0.72} />
      <Key x={200} y={210} anchor="middle" fill={SIGNAL} size={10}>
        THE SAME LEVEL OF THE CHANNEL
      </Key>
      <Key x={24} y={32} fill={INK3} size={9.5}>
        HORIZONTAL
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   28 · VERTICAL CONFLICT — between different levels of the same channel (400)
   ========================================================================== */

export function VerticalConflict() {
  return (
    <Frame
      width={400}
      height={230}
      label="A single channel drawn as a column: producer at the top, wholesaler in the middle, retailer at the foot. The clashes sit on the links between the levels."
    >
      <line x1={200} y1={40} x2={200} y2={206} stroke={COUNTER} strokeWidth={2} />
      <Factory3 x={200} y={62} k={0.68} tone={COUNTER} fill={PAPER} />
      <Warehouse x={200} y={140} k={0.62} tone={COUNTER} fill={PAPER} />
      <Store2 x={200} y={206} k={0.62} tone={COUNTER} fill={PAPER} />
      <Clash x={200} y={100} k={0.72} tone={COUNTER} />
      <Clash x={200} y={172} k={0.72} tone={COUNTER} />
      <Key x={242} y={46} fill={INK} size={9.5}>
        PRODUCER
      </Key>
      <Key x={242} y={126} fill={INK} size={9.5}>
        WHOLESALER
      </Key>
      <Key x={242} y={192} fill={INK} size={9.5}>
        RETAILER
      </Key>
      <line x1={52} y1={40} x2={52} y2={206} stroke={RULE} strokeWidth={1.25} />
      <line x1={52} y1={40} x2={62} y2={40} stroke={RULE} strokeWidth={1.25} />
      <line x1={52} y1={206} x2={62} y2={206} stroke={RULE} strokeWidth={1.25} />
      <Key x={68} y={126} fill={INK3} size={9.5}>
        ONE CHANNEL
      </Key>
      <Key x={24} y={32} fill={COUNTER} size={10}>
        DIFFERENT LEVELS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   29 · SEPARATE BUSINESSES — the conventional distribution system
   ========================================================================== */

export function SeparateBusinesses() {
  const firms = [
    { x: 162, g: "factory", name: "PRODUCERS" },
    { x: 400, g: "warehouse", name: "WHOLESALERS" },
    { x: 638, g: "store", name: "RETAILERS" },
  ];
  return (
    <Frame
      height={280}
      label="Three independent businesses standing apart, each in its own box with its own profit arrow rising. The links between them are broken, so no one controls the others."
    >
      {firms.map((f) => (
        <g key={f.x}>
          <rect x={f.x - 92} y={70} width={184} height={128} fill={PAPER} stroke={INK} strokeWidth={1.5} />
          {f.g === "factory" ? <Factory3 x={f.x - 26} y={180} /> : null}
          {f.g === "warehouse" ? <Warehouse x={f.x - 26} y={180} /> : null}
          {f.g === "store" ? <Store2 x={f.x - 26} y={180} /> : null}
          <Arrow2 x1={f.x + 52} y1={180} x2={f.x + 52} y2={98} tone={SIGNAL} width={1.75} />
          <Key x={f.x + 62} y={124} fill={SIGNAL} size={9.5}>
            ITS OWN
          </Key>
          <Key x={f.x + 62} y={138} fill={SIGNAL} size={9.5}>
            PROFITS
          </Key>
          <Key x={f.x} y={224} anchor="middle" fill={INK} size={10}>
            {f.name}
          </Key>
          <Note x={f.x} y={246} anchor="middle" size={11} fill={INK3}>
            a separate business
          </Note>
        </g>
      ))}
      <line x1={256} y1={134} x2={282} y2={134} stroke={RULE2} strokeWidth={1.5} />
      <line x1={326} y1={134} x2={306} y2={134} stroke={RULE2} strokeWidth={1.5} />
      <Clash x={294} y={134} k={0.4} tone={RULE2} />
      <line x1={494} y1={134} x2={520} y2={134} stroke={RULE2} strokeWidth={1.5} />
      <line x1={564} y1={134} x2={544} y2={134} stroke={RULE2} strokeWidth={1.5} />
      <Clash x={532} y={134} k={0.4} tone={RULE2} />
      <Key x={400} y={40} anchor="middle" fill={INK3} size={9.5}>
        NO MEMBER HAS MUCH CONTROL OVER THE OTHERS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   30 · THE VMS CASCADE — one unified system [diagram: cascading flow]
   ========================================================================== */

export function VmsCascade() {
  const steps = [
    { x: 150, y: 74, g: "factory", name: "PRODUCER" },
    { x: 400, y: 150, g: "warehouse", name: "WHOLESALER" },
    { x: 650, y: 226, g: "store", name: "RETAILER" },
  ];
  return (
    <Frame
      height={320}
      label="Producer, wholesaler and retailer set as three descending steps, with the flow cascading from each to the next. A single outline is drawn around all three: they act as one system."
    >
      <path
        d="M40 30 H760 V296 H40 Z"
        fill={SIGNAL_TINT}
        stroke={SIGNAL}
        strokeWidth={2}
      />
      <Key x={400} y={54} anchor="middle" fill={SIGNAL} size={11}>
        ACTING AS A UNIFIED SYSTEM
      </Key>
      {steps.map((s, i) => (
        <g key={s.name}>
          <rect x={s.x - 84} y={s.y} width={168} height={62} fill={PAPER} stroke={SIGNAL} strokeWidth={1.5} />
          {s.g === "factory" ? <Factory3 x={s.x - 44} y={s.y + 56} k={0.72} /> : null}
          {s.g === "warehouse" ? <Warehouse x={s.x - 44} y={s.y + 56} k={0.68} /> : null}
          {s.g === "store" ? <Store2 x={s.x - 44} y={s.y + 56} k={0.68} /> : null}
          <Key x={s.x + 76} y={s.y + 36} anchor="end" fill={INK} size={9.5}>
            {s.name}
          </Key>
          {i < steps.length - 1 ? (
            <path
              d={`M${s.x + 84} ${s.y + 31} H${s.x + 166} V${s.y + 96}`}
              fill="none"
              stroke={SIGNAL}
              strokeWidth={2}
            />
          ) : null}
          {i < steps.length - 1 ? (
            <path d={headAlong1(s.x + 166, s.y + 100, 0, 1)} fill="none" stroke={SIGNAL} strokeWidth={2} />
          ) : null}
        </g>
      ))}
      <Key x={400} y={312} anchor="middle" fill={INK3} size={9.5}>
        A VERTICAL MARKETING SYSTEM
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   31 · THREE WAYS ONE MEMBER HOLDS THE CHANNEL TOGETHER
   ========================================================================== */

export function ThreePowers() {
  const cols = [
    { x: 150, name: "OWNS THE OTHERS" },
    { x: 400, name: "HAS CONTRACTS" },
    { x: 650, name: "WIELDS POWER" },
  ];
  return (
    <Frame
      height={260}
      label="Three panels showing how one channel member can hold the rest together: by owning them, by contracting with them, or by being large enough that they all cooperate."
    >
      {cols.map((c, i) => (
        <g key={c.name}>
          <line x1={c.x - 110} y1={34} x2={c.x + 110} y2={34} stroke={i === 0 ? SIGNAL : i === 1 ? INK : COUNTER} strokeWidth={2} />
          <Key x={c.x} y={56} anchor="middle" fill={i === 0 ? SIGNAL : i === 1 ? INK : COUNTER} size={10}>
            {c.name}
          </Key>
        </g>
      ))}
      {/* owns: one box containing three */}
      <g>
        <rect x={62} y={86} width={176} height={100} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.75} />
        {[104, 150, 196].map((x) => (
          <rect key={x} x={x - 18} y={116} width={36} height={40} fill={PAPER} stroke={SIGNAL} strokeWidth={1.25} />
        ))}
      </g>
      {/* contracts: three boxes tied by signed sheets */}
      <g>
        {[330, 470].map((x) => (
          <rect key={x} x={x - 26} y={104} width={52} height={64} fill={PAPER} stroke={INK} strokeWidth={1.25} />
        ))}
        <Sheet x={400} y={136} w={40} h={52} tone={INK} lines={3} seal={SIGNAL} />
        <line x1={356} y1={136} x2={378} y2={136} stroke={INK} strokeWidth={1.5} />
        <line x1={422} y1={136} x2={444} y2={136} stroke={INK} strokeWidth={1.5} />
      </g>
      {/* power: one large node, the others small and drawn toward it */}
      <g>
        <circle cx={620} cy={136} r={42} fill={COUNTER} />
        {[
          [700, 100],
          [716, 146],
          [686, 184],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={13} fill={PAPER} stroke={COUNTER} strokeWidth={1.5} />
            <Arrow2 x1={x - 12} y1={y} x2={Math.round(620 + 48)} y2={Math.round(136 + (y - 136) / 3)} tone={COUNTER} width={1.25} size={6} />
          </g>
        ))}
      </g>
      <Key x={400} y={222} anchor="middle" fill={INK3} size={9.5}>
        SO THEY ALL COOPERATE
      </Key>
      <line x1={180} y1={204} x2={620} y2={204} stroke={RULE} strokeWidth={1} />
      <Key x={400} y={246} anchor="middle" fill={INK3} size={9.5}>
        ONE CHANNEL MEMBER HOLDS THE REST
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   32 · WHAT THE DESIGN IS FOR — economies down, impact up (400)
   ========================================================================== */

export function EconomiesImpact() {
  return (
    <Frame
      width={400}
      height={230}
      label="Costs and impact for a channel of separate firms, then for a unified one. Moving to the unified system the cost bar falls and the impact bar rises."
    >
      <line x1={40} y1={172} x2={370} y2={172} stroke={INK} strokeWidth={1.5} />
      <rect x={70} y={82} width={54} height={90} fill={PAPER2} stroke={INK3} strokeWidth={1.25} />
      <rect x={140} y={116} width={54} height={56} fill={SIGNAL} />
      <rect x={226} y={134} width={54} height={38} fill={PAPER2} stroke={INK3} strokeWidth={1.25} />
      <rect x={296} y={62} width={54} height={110} fill={SIGNAL} />
      <Key x={97} y={196} anchor="middle" fill={INK3} size={9.5}>
        COSTS
      </Key>
      <Key x={167} y={196} anchor="middle" fill={SIGNAL} size={9.5}>
        IMPACT
      </Key>
      <Key x={253} y={196} anchor="middle" fill={INK3} size={9.5}>
        COSTS
      </Key>
      <Key x={323} y={196} anchor="middle" fill={SIGNAL} size={9.5}>
        IMPACT
      </Key>
      <Key x={132} y={44} anchor="middle" fill={INK3} size={9.5}>
        SEPARATE
      </Key>
      <Key x={288} y={44} anchor="middle" fill={SIGNAL} size={9.5}>
        UNIFIED
      </Key>
      <line x1={210} y1={36} x2={210} y2={182} stroke={RULE} strokeWidth={1} strokeDasharray="5 5" />
      <Key x={200} y={220} anchor="middle" fill={INK3} size={9.5}>
        CHANNEL ECONOMIES AND MAXIMUM IMPACT
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   33–35 · THE THREE TYPES OF VMS — one column plate each (400)
   ========================================================================== */

const VMS_H = 220;

export function CorporateVms() {
  return (
    <Frame
      width={400}
      height={VMS_H}
      label="Successive stages of production and distribution drawn inside one solid boundary marked single ownership."
    >
      <rect x={24} y={44} width={352} height={112} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={2.5} />
      <Key x={200} y={70} anchor="middle" fill={SIGNAL} size={10.5}>
        SINGLE OWNERSHIP
      </Key>
      {[96, 200, 304].map((x, i) => (
        <g key={x}>
          <rect x={x - 38} y={88} width={76} height={54} fill={PAPER} stroke={SIGNAL} strokeWidth={1.25} />
          {i === 0 ? <Factory3 x={x} y={136} k={0.6} tone={SIGNAL} /> : null}
          {i === 1 ? <Warehouse x={x} y={136} k={0.56} tone={SIGNAL} /> : null}
          {i === 2 ? <Store2 x={x} y={136} k={0.56} tone={SIGNAL} /> : null}
          {i < 2 ? <Arrow2 x1={x + 40} y1={115} x2={x + 56} y2={115} tone={SIGNAL} width={1.25} size={6} /> : null}
        </g>
      ))}
      <Key x={200} y={186} anchor="middle" fill={INK} size={10}>
        SUCCESSIVE STAGES, INTEGRATED
      </Key>
    </Frame>
  );
}

export function ContractualVms() {
  const firms = [72, 200, 328];
  return (
    <Frame
      width={400}
      height={VMS_H}
      label="Three separately outlined firms at different levels of the channel, joined to one another below by two signed contracts."
    >
      {firms.map((x, i) => (
        <g key={x}>
          <rect x={x - 56} y={44} width={112} height={76} fill={PAPER} stroke={INK} strokeWidth={1.5} strokeDasharray="5 4" />
          {i === 0 ? <Factory3 x={x} y={114} k={0.64} /> : null}
          {i === 1 ? <Warehouse x={x} y={114} k={0.6} /> : null}
          {i === 2 ? <Store2 x={x} y={114} k={0.6} /> : null}
          <Key x={x} y={66} anchor="middle" fill={INK3} size={9.5}>
            INDEPENDENT
          </Key>
        </g>
      ))}
      <Sheet x={136} y={158} w={36} h={44} tone={SIGNAL} lines={3} seal={SIGNAL} />
      <Sheet x={264} y={158} w={36} h={44} tone={SIGNAL} lines={3} seal={SIGNAL} />
      <path d="M72 122 V158 H118" fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <path d="M200 122 V158 H154" fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <path d="M200 122 V158 H246" fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <path d="M328 122 V158 H282" fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <Key x={200} y={202} anchor="middle" fill={SIGNAL} size={10}>
        JOINING TOGETHER THROUGH CONTRACTS
      </Key>
    </Frame>
  );
}

export function AdministeredVms() {
  return (
    <Frame
      width={400}
      height={VMS_H}
      label="One party drawn far larger than the others. The smaller stages fall into line behind it, coordinated by its size and power rather than by ownership or contract."
    >
      <rect x={24} y={52} width={132} height={104} fill={COUNTER} />
      <Key x={90} y={98} anchor="middle" fill={PAPER} size={10.5}>
        SIZE
      </Key>
      <Key x={90} y={118} anchor="middle" fill={PAPER} size={10.5}>
        AND POWER
      </Key>
      {[212, 272, 332].map((x, i) => (
        <g key={x}>
          <rect x={x - 24} y={78} width={48} height={52} fill={PAPER} stroke={COUNTER} strokeWidth={1.25} />
          {i === 0 ? <Factory3 x={x} y={126} k={0.5} tone={COUNTER} /> : null}
          {i === 1 ? <Warehouse x={x} y={126} k={0.46} tone={COUNTER} /> : null}
          {i === 2 ? <Store2 x={x} y={126} k={0.46} tone={COUNTER} /> : null}
        </g>
      ))}
      <line x1={188} y1={60} x2={188} y2={148} stroke={COUNTER} strokeWidth={1.5} />
      <Arrow2 x1={160} y1={104} x2={184} y2={104} tone={COUNTER} width={1.5} size={7} />
      <Key x={200} y={186} anchor="middle" fill={COUNTER} size={10}>
        COORDINATES SUCCESSIVE STAGES
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   36 · TWO OR MORE CHANNELS — the multichannel distribution system
   ========================================================================== */

export function MultiChannels() {
  return (
    <Frame
      height={300}
      label="A single firm on the left with three channels leaving it: a direct one, one through a retailer, and one through a wholesaler and retailer. They lead to two customer segments on the right."
    >
      <rect x={20} y={110} width={140} height={84} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.75} />
      <Factory3 x={90} y={188} tone={SIGNAL} fill={PAPER} />
      <Key x={90} y={128} anchor="middle" fill={SIGNAL} size={10}>
        A SINGLE FIRM
      </Key>
      {[
        { y: 62, stops: [] as string[], label: "" },
        { y: 152, stops: ["store"], label: "" },
        { y: 244, stops: ["warehouse", "store"], label: "" },
      ].map((lane, li) => (
        <g key={li}>
          <path d={`M160 152 C210 152 210 ${lane.y} 262 ${lane.y}`} fill="none" stroke={SIGNAL} strokeWidth={1.75} />
          <path d={headAlong1(266, lane.y, 1, 0)} fill="none" stroke={SIGNAL} strokeWidth={1.75} />
          {lane.stops.map((g, i) => {
            const x = 320 + i * 120;
            return (
              <g key={i}>
                {g === "warehouse" ? <Warehouse x={x} y={lane.y + 22} k={0.6} tone={SIGNAL} /> : null}
                {g === "store" ? <Store2 x={x} y={lane.y + 22} k={0.6} tone={SIGNAL} /> : null}
                <line x1={x + 22} y1={lane.y} x2={x + 92} y2={lane.y} stroke={SIGNAL} strokeWidth={1.5} />
              </g>
            );
          })}
          <line x1={266} y1={lane.y} x2={lane.stops.length ? 298 : 560} y2={lane.y} stroke={SIGNAL} strokeWidth={1.5} />
        </g>
      ))}
      <rect x={570} y={30} width={210} height={112} fill={PAPER} stroke={COUNTER} strokeWidth={1.5} />
      <rect x={570} y={166} width={210} height={112} fill={PAPER} stroke={COUNTER} strokeWidth={1.5} />
      {[0, 1, 2].map((i) => (
        <Person3 key={`a${i}`} x={620 + i * 56} y={124} k={0.9} stroke={COUNTER} />
      ))}
      {[0, 1, 2].map((i) => (
        <Person3 key={`b${i}`} x={620 + i * 56} y={260} k={0.9} stroke={COUNTER} />
      ))}
      <Key x={675} y={54} anchor="middle" fill={COUNTER} size={10}>
        CUSTOMER SEGMENT
      </Key>
      <Key x={675} y={190} anchor="middle" fill={COUNTER} size={10}>
        CUSTOMER SEGMENT
      </Key>
      <Key x={400} y={292} anchor="middle" fill={SIGNAL} size={10}>
        TWO OR MORE MARKETING CHANNELS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   37 · LARGE AND COMPLEX MARKETS — where the advantage lies (400)
   ========================================================================== */

export function ComplexMarkets() {
  /* Four clusters of different size and make-up: a market that is both large
     (many buyers) and complex (no two groups alike). Fixed coordinates, so
     server and client render identical markup. */
  const clusters = [
    { x: 74, y: 62, cols: 4, rows: 2, tone: INK },
    { x: 232, y: 52, cols: 3, rows: 3, tone: SIGNAL },
    { x: 68, y: 126, cols: 3, rows: 2, tone: COUNTER },
    { x: 214, y: 132, cols: 5, rows: 2, tone: INK },
  ];
  return (
    <Frame
      width={400}
      height={220}
      label="One outlined market holding four clusters of buyers. The clusters differ in size, in shape and in kind, and together they fill the whole frame."
    >
      <rect x={28} y={34} width={344} height={140} fill="none" stroke={SIGNAL} strokeWidth={1.75} />
      {clusters.map((c, ci) =>
        Array.from({ length: c.rows }, (_, r) =>
          Array.from({ length: c.cols }, (_, k) => (
            <Person3
              key={`${ci}-${r}-${k}`}
              x={c.x + k * 26}
              y={c.y + r * 28}
              k={0.56}
              stroke={c.tone}
            />
          )),
        ),
      )}
      <Key x={200} y={202} anchor="middle" fill={SIGNAL} size={10}>
        LARGE AND COMPLEX MARKETS
      </Key>
      <Key x={200} y={24} anchor="middle" fill={INK3} size={9.5}>
        WHERE THE ADVANTAGE LIES
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   38 · WHAT IT BUYS AND WHAT IT COSTS — coverage against conflict
   ========================================================================== */

export function CoverageAndConflict() {
  return (
    <Frame
      height={286}
      label="On the left, market coverage grows from a small block to a large one and sales rise with it. On the right, two of the firm's own channels reach the same buyer and a clash appears where they overlap."
    >
      <rect x={44} y={128} width={56} height={62} fill={PAPER2} stroke={INK3} strokeWidth={1.25} />
      <Arrow2 x1={110} y1={158} x2={144} y2={158} tone={SIGNAL} width={1.5} size={7} />
      <rect x={156} y={62} width={144} height={128} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.75} />
      <Key x={228} y={130} anchor="middle" fill={SIGNAL} size={10}>
        SALES AND
      </Key>
      <Key x={228} y={148} anchor="middle" fill={SIGNAL} size={10}>
        MARKET COVERAGE
      </Key>
      <Key x={172} y={218} fill={SIGNAL} size={10}>
        EXPANDS
      </Key>
      <line x1={476} y1={238} x2={708} y2={238} stroke={RULE} strokeWidth={1} />
      <line x1={400} y1={40} x2={400} y2={224} stroke={RULE} strokeWidth={1} strokeDasharray="5 5" />

      <Factory3 x={492} y={110} k={0.78} tone={COUNTER} />
      <Store2 x={490} y={210} k={0.72} tone={COUNTER} />
      <Person3 x={706} y={168} k={1.4} stroke={COUNTER} />
      <path d="M522 92 C600 92 620 140 668 152" fill="none" stroke={COUNTER} strokeWidth={1.75} />
      <path d="M518 194 C600 194 622 182 668 172" fill="none" stroke={COUNTER} strokeWidth={1.75} />
      <Clash x={636} y={162} k={0.7} tone={COUNTER} />
      <Key x={592} y={262} anchor="middle" fill={COUNTER} size={10}>
        HARDER TO CONTROL, AND CONFLICT
      </Key>
      <Key x={228} y={40} anchor="middle" fill={INK3} size={9.5}>
        WHAT IT BUYS
      </Key>
      <Key x={592} y={40} anchor="middle" fill={INK3} size={9.5}>
        WHAT IT COSTS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   39 · CUTTING OUT THE MIDDLE — producers go directly to final buyers
   ========================================================================== */

export function CutOut() {
  return (
    <Frame
      height={260}
      label="The old chain runs producer, wholesaler, retailer, buyer. The two middle links are lifted out of the line and greyed. A new arrow runs straight from the producer to the final buyer."
    >
      <line x1={110} y1={92} x2={660} y2={92} stroke={RULE2} strokeWidth={1.25} strokeDasharray="6 5" />
      <Factory3 x={72} y={110} />
      <Under x={72} y={134} fill={INK}>
        PRODUCERS
      </Under>
      <Person3 x={716} y={110} k={1.4} />
      <Under x={716} y={134} fill={INK}>
        FINAL BUYERS
      </Under>
      <g opacity={0.45}>
        <rect x={252} y={30} width={130} height={62} fill={PAPER2} stroke={INK3} strokeWidth={1.25} strokeDasharray="5 4" />
        <Warehouse x={317} y={84} k={0.62} tone={INK3} />
        <rect x={418} y={30} width={130} height={62} fill={PAPER2} stroke={INK3} strokeWidth={1.25} strokeDasharray="5 4" />
        <Store2 x={483} y={84} k={0.62} tone={INK3} />
      </g>
      <Key x={400} y={22} anchor="middle" fill={INK3} size={9.5}>
        CUT OUT
      </Key>
      <Arrow2 x1={110} y1={182} x2={676} y2={182} tone={SIGNAL} width={2.5} />
      <Key x={393} y={210} anchor="middle" fill={SIGNAL} size={10.5}>
        GOING DIRECTLY TO FINAL BUYERS
      </Key>
      <line x1={110} y1={164} x2={110} y2={200} stroke={SIGNAL} strokeWidth={1.25} />
      <Key x={400} y={240} anchor="middle" fill={INK3} size={9.5}>
        DISINTERMEDIATION
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   40 · A NEW KIND OF INTERMEDIARY TAKES THE PLACE (400)
   ========================================================================== */

export function NewIntermediaries() {
  return (
    <Frame
      width={400}
      height={224}
      label="A line from the producer to the buyer with one place on it. The traditional reseller that used to stand there is drawn faded and grey, lifted clear of the line; the place it left is now held by a new type of intermediary."
    >
      <g opacity={0.5}>
        <Key x={200} y={34} anchor="middle" fill={INK3} size={9.5}>
          THE TRADITIONAL RESELLER
        </Key>
        <Store2 x={200} y={84} k={0.95} tone={INK3} />
      </g>
      <Key x={200} y={104} anchor="middle" fill={INK3} size={9.5}>
        DISPLACED
      </Key>

      <Factory3 x={44} y={156} k={0.66} />
      <Person3 x={362} y={156} k={1.15} />
      {/* the line stops at the vacated place, so nothing runs through a label */}
      <line x1={74} y1={134} x2={148} y2={134} stroke={INK} strokeWidth={1.75} />
      <line x1={252} y1={134} x2={334} y2={134} stroke={INK} strokeWidth={1.75} />
      <path d={headAlong1(334, 134, 1, 0)} fill="none" stroke={INK} strokeWidth={1.75} />
      <rect x={150} y={114} width={100} height={40} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.75} />
      <Key x={200} y={138} anchor="middle" fill={SIGNAL} size={9.5}>
        A NEW TYPE
      </Key>
      <Key x={200} y={206} anchor="middle" fill={SIGNAL} size={10}>
        A NEW TYPE OF INTERMEDIARY TAKES ITS PLACE
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   41 · TWO FACES — an opportunity and a strategic threat (400)
   ========================================================================== */

export function OpportunityThreat() {
  return (
    <Frame
      width={400}
      height={210}
      label="One event at the foot, splitting upward into two outcomes: an opportunity that rises and a strategic threat that falls."
    >
      <rect x={140} y={148} width={120} height={44} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <Key x={200} y={175} anchor="middle" fill={INK} size={10}>
        THE SAME TREND
      </Key>
      <path d="M200 148 C200 108 240 108 296 84" fill="none" stroke={SIGNAL} strokeWidth={2} />
      <path d={headAlong1(300, 82, 2, -1)} fill="none" stroke={SIGNAL} strokeWidth={2} />
      <path d="M200 148 C200 108 160 108 104 84" fill="none" stroke={COUNTER} strokeWidth={2} />
      <path d={headAlong1(100, 82, -2, -1)} fill="none" stroke={COUNTER} strokeWidth={2} />
      <Key x={312} y={66} anchor="end" fill={SIGNAL} size={10}>
        OPPORTUNITIES
      </Key>
      <Key x={88} y={66} fill={COUNTER} size={10}>
        THREATS
      </Key>
      <Key x={88} y={46} fill={COUNTER} size={10}>
        STRATEGIC
      </Key>
      <Key x={200} y={32} anchor="middle" fill={INK3} size={9.5}>
        BOTH, TO ESTABLISHED FIRMS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   42 · THE BYPASS — streaming services and the cable provider
   ========================================================================== */

export function StreamingBypass() {
  return (
    <Frame
      height={260}
      label="Programmes flow to viewers along two routes. The upper one passes through a cable provider. The lower one runs straight from the streaming service to the viewer, going around it."
    >
      <rect x={20} y={88} width={128} height={78} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <Key x={84} y={124} anchor="middle" fill={INK} size={10}>
        PROGRAMMES
      </Key>
      <Key x={84} y={142} anchor="middle" fill={INK} size={10}>
        AND SERVICES
      </Key>
      <path d="M148 110 C220 110 232 62 300 62" fill="none" stroke={INK3} strokeWidth={1.75} />
      <path d={headAlong1(304, 62, 1, 0)} fill="none" stroke={INK3} strokeWidth={1.75} />
      <rect x={312} y={30} width={172} height={64} fill={PAPER2} stroke={INK3} strokeWidth={1.5} />
      <Key x={398} y={68} anchor="middle" fill={INK3} size={10}>
        CABLE PROVIDERS
      </Key>
      <path d="M484 62 C560 62 580 104 640 116" fill="none" stroke={INK3} strokeWidth={1.75} strokeDasharray="5 4" />
      <path d={headAlong1(644, 117, 3, 1)} fill="none" stroke={INK3} strokeWidth={1.75} />

      <path d="M148 146 C240 146 240 202 300 202" fill="none" stroke={SIGNAL} strokeWidth={2} />
      <path d={headAlong1(304, 202, 1, 0)} fill="none" stroke={SIGNAL} strokeWidth={2} />
      <rect x={312} y={172} width={172} height={62} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.75} />
      <Key x={398} y={208} anchor="middle" fill={SIGNAL} size={10}>
        STREAMING SERVICES
      </Key>
      <path d="M484 202 C560 202 580 160 640 144" fill="none" stroke={SIGNAL} strokeWidth={2} />
      <path d={headAlong1(644, 143, 3, -1)} fill="none" stroke={SIGNAL} strokeWidth={2} />
      <Person3 x={716} y={154} k={1.5} />
      <Under x={716} y={180} fill={INK}>
        VIEWERS
      </Under>
      <Key x={398} y={128} anchor="middle" fill={SIGNAL} size={10}>
        BYPASSED
      </Key>
      <line x1={312} y1={112} x2={484} y2={112} stroke={RULE} strokeWidth={1} strokeDasharray="4 4" />
    </Frame>
  );
}

/* ==========================================================================
   43 · THE LAST THREE SUBJECTS — where each one sits on the chain
   ========================================================================== */

export function ThreeDomains() {
  return (
    <Frame
      height={260}
      label="The chain from producer to consumer, with two bands drawn over it. Wholesaling covers the stretch that sells for resale or business use. Retailing covers the last stretch to the final consumer. A band beneath the whole chain is logistics."
    >
      <line x1={70} y1={132} x2={744} y2={132} stroke={RULE} strokeWidth={1.25} />
      <Factory3 x={70} y={150} k={0.8} />
      <Warehouse x={294} y={150} k={0.8} />
      <Store2 x={520} y={150} k={0.8} />
      <Person3 x={730} y={150} k={1.3} />
      <rect x={196} y={62} width={272} height={40} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.5} />
      <Key x={332} y={88} anchor="middle" fill={COUNTER} size={10.5}>
        WHOLESALING
      </Key>
      <rect x={480} y={62} width={280} height={40} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
      <Key x={620} y={88} anchor="middle" fill={SIGNAL} size={10.5}>
        RETAILING
      </Key>
      <line x1={196} y1={110} x2={196} y2={126} stroke={COUNTER} strokeWidth={1.25} />
      <line x1={468} y1={110} x2={468} y2={126} stroke={COUNTER} strokeWidth={1.25} />
      <line x1={480} y1={110} x2={480} y2={126} stroke={SIGNAL} strokeWidth={1.25} />
      <line x1={760} y1={110} x2={760} y2={126} stroke={SIGNAL} strokeWidth={1.25} />
      <rect x={40} y={196} width={720} height={40} fill={PAPER2} stroke={INK} strokeWidth={1.5} />
      <Key x={400} y={222} anchor="middle" fill={INK} size={10.5}>
        LOGISTICS MANAGEMENT
      </Key>
      <Arrow2 x1={64} y1={216} x2={38} y2={216} tone={INK} width={1.25} size={7} />
      <Arrow2 x1={736} y1={216} x2={762} y2={216} tone={INK} width={1.25} size={7} />
      <Key x={400} y={34} anchor="middle" fill={INK3} size={9.5}>
        ALL THE ACTIVITIES INVOLVED
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   44 · SOLD TO WHOM — final consumers, or resale and business use (400)
   ========================================================================== */

export function SoldToWhom({ side }: { side: "retail" | "wholesale" }) {
  const retail = side === "retail";
  const tone = retail ? SIGNAL : COUNTER;
  const tint = retail ? SIGNAL_TINT : COUNTER_TINT;
  return (
    <Frame
      width={400}
      height={200}
      label={
        retail
          ? "Goods sold from a shopfront straight to a person who will use them: the final consumer."
          : "Goods sold from a warehouse to a shopfront that will resell them and to a factory that will use them in its business."
      }
    >
      {retail ? <Store2 x={72} y={126} tone={tone} fill={tint} /> : <Warehouse x={72} y={126} tone={tone} fill={tint} />}
      {retail ? (
        <g>
          <Arrow2 x1={116} y1={100} x2={252} y2={100} tone={tone} width={2} />
          <Person3 x={318} y={126} k={1.6} />
          <Key x={318} y={152} anchor="middle" fill={INK} size={9.5}>
            FINAL CONSUMERS
          </Key>
          <Key x={184} y={84} anchor="middle" fill={tone} size={9.5}>
            DIRECTLY
          </Key>
        </g>
      ) : (
        <g>
          <path d="M116 110 C170 110 176 62 226 62" fill="none" stroke={tone} strokeWidth={1.75} />
          <path d={headAlong1(230, 62, 1, 0)} fill="none" stroke={tone} strokeWidth={1.75} />
          <path d="M116 110 C170 110 176 158 226 158" fill="none" stroke={tone} strokeWidth={1.75} />
          <path d={headAlong1(230, 158, 1, 0)} fill="none" stroke={tone} strokeWidth={1.75} />
          <Store2 x={272} y={82} k={0.7} tone={INK} />
          <Key x={310} y={64} fill={INK} size={9.5}>
            RESALE
          </Key>
          <Factory3 x={272} y={176} k={0.7} tone={INK} />
          <Key x={310} y={158} fill={INK} size={9.5}>
            BUSINESS
          </Key>
          <Key x={310} y={174} fill={INK} size={9.5}>
            USE
          </Key>
        </g>
      )}
      <Key x={72} y={176} anchor="middle" fill={tone} size={9.5}>
        {retail ? "RETAILING" : "WHOLESALING"}
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   45 · THE EFFICIENT FLOW — materials in, final goods out (400)
   ========================================================================== */

export function EfficientFlow() {
  return (
    <Frame
      width={400}
      height={200}
      label="Materials enter a plant on the left, final goods leave it on the right, and the line through it is drawn unbroken and even: the flow is managed to stay efficient."
    >
      <rect x={140} y={64} width={120} height={78} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <Factory3 x={200} y={134} k={0.78} />
      <Pack4 x={48} y={116} w={34} h={30} tone={INK3} />
      <Pack4 x={48} y={84} w={34} h={28} tone={INK3} />
      <Key x={48} y={144} anchor="middle" fill={INK3} size={9.5}>
        MATERIALS
      </Key>
      <Arrow2 x1={78} y1={92} x2={134} y2={92} tone={SIGNAL} width={1.75} />
      <Arrow2 x1={266} y1={92} x2={322} y2={92} tone={SIGNAL} width={1.75} />
      <Pack4 x={352} y={116} w={38} h={34} tone={SIGNAL} fill={SIGNAL_TINT} />
      <Key x={352} y={144} anchor="middle" fill={SIGNAL} size={9.5}>
        FINAL GOODS
      </Key>
      <line x1={24} y1={168} x2={376} y2={168} stroke={SIGNAL} strokeWidth={2.5} />
      <Key x={200} y={190} anchor="middle" fill={SIGNAL} size={10}>
        AN EFFICIENT FLOW
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   46 · THE LAST STEPS — where the retailer stands
   ========================================================================== */

export function FinalSteps() {
  const steps = [
    { x: 120, name: "PRODUCER", g: "factory" },
    { x: 320, name: "WHOLESALER", g: "warehouse" },
    { x: 520, name: "RETAILER", g: "store" },
    { x: 700, name: "CONSUMER", g: "person" },
  ];
  return (
    <Frame
      height={250}
      label="The distribution process as four steps. The last two are enclosed and lit: the retailer standing between the brand and the consumer."
    >
      <rect x={444} y={44} width={314} height={142} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.75} />
      <Key x={601} y={70} anchor="middle" fill={SIGNAL} size={10.5}>
        THE FINAL STEPS
      </Key>
      <line x1={120} y1={118} x2={700} y2={118} stroke={RULE} strokeWidth={1.25} />
      {steps.map((s, i) => (
        <g key={s.name}>
          {s.g === "factory" ? <Factory3 x={s.x} y={160} /> : null}
          {s.g === "warehouse" ? <Warehouse x={s.x} y={160} /> : null}
          {s.g === "store" ? <Store2 x={s.x} y={160} tone={SIGNAL} fill={PAPER} /> : null}
          {s.g === "person" ? <Person3 x={s.x} y={160} k={1.5} /> : null}
          <Key x={s.x} y={210} anchor="middle" fill={i === 2 ? SIGNAL : INK} size={10}>
            {s.name}
          </Key>
          {i < 3 ? <Arrow2 x1={s.x + 44} y1={118} x2={steps[i + 1].x - 44} y2={118} tone={i === 2 ? SIGNAL : INK3} width={1.5} size={7} /> : null}
        </g>
      ))}
      <Key x={120} y={92} anchor="middle" fill={INK3} size={9.5}>
        THE BRAND
      </Key>
      <line x1={120} y1={100} x2={120} y2={112} stroke={RULE2} strokeWidth={1} />
      <Key x={400} y={234} anchor="middle" fill={INK3} size={9.5}>
        THE DISTRIBUTION PROCESS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   47 · SHOPPER TO BUYER — the whole process narrowed on the point of sale
   ========================================================================== */

export function ShopperToBuyer() {
  const inputs = ["PRODUCT", "PRICE", "PLACE", "PROMOTION"];
  return (
    <Frame
      height={280}
      label="The whole marketing process drawn as four streams converging on one point marked the point of sale. A shopper walks in on one side and leaves the other side as a buyer, carrying the goods."
    >
      {inputs.map((name, i) => {
        const y = 48 + i * 42;
        return (
          <g key={name}>
            <Key x={28} y={y + 4} fill={INK} size={10}>
              {name}
            </Key>
            <path d={`M148 ${y} C260 ${y} 280 132 352 132`} fill="none" stroke={INK3} strokeWidth={1.25} />
          </g>
        );
      })}
      <Key x={28} y={28} fill={INK3} size={9.5}>
        THE ENTIRE MARKETING PROCESS
      </Key>
      <rect x={356} y={92} width={116} height={80} fill={SIGNAL} />
      <Key x={414} y={126} anchor="middle" fill={PAPER} size={10}>
        THE POINT
      </Key>
      <Key x={414} y={146} anchor="middle" fill={PAPER} size={10}>
        OF SALE
      </Key>
      <Person3 x={310} y={246} k={1.4} />
      <Key x={310} y={270} anchor="middle" fill={INK} size={10}>
        SHOPPERS
      </Key>
      <Arrow2 x1={344} y1={220} x2={484} y2={220} tone={SIGNAL} width={2} />
      <line x1={414} y1={176} x2={414} y2={214} stroke={SIGNAL} strokeWidth={1.5} strokeDasharray="4 4" />
      <Person3 x={528} y={246} k={1.4} stroke={SIGNAL} />
      <Pack4 x={572} y={246} w={30} h={28} tone={SIGNAL} fill={SIGNAL_TINT} />
      <Key x={540} y={270} anchor="middle" fill={SIGNAL} size={10}>
        BUYERS
      </Key>
      <Key x={628} y={224} fill={SIGNAL} size={10}>
        TURNING ONE
      </Key>
      <Key x={628} y={242} fill={SIGNAL} size={10}>
        INTO THE OTHER
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   48 · TARGET AND POSITION — the two things a retailer must define (400)
   ========================================================================== */

export function TargetAndPositioning() {
  return (
    <Frame
      width={400}
      height={220}
      label="On the left, a target market cut out of a wider field of buyers. On the right, a position marked on a map of competing stores."
    >
      <rect x={24} y={48} width={160} height={124} fill="none" stroke={RULE2} strokeWidth={1.25} />
      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2, 3].map((c) => {
          const inTarget = r > 0 && r < 3 && c > 0 && c < 3;
          return (
            <Person3
              key={`${r}-${c}`}
              x={48 + c * 38}
              y={80 + r * 30}
              k={0.6}
              stroke={inTarget ? SIGNAL : RULE2}
            />
          );
        }),
      )}
      <rect x={58} y={76} width={92} height={62} fill="none" stroke={SIGNAL} strokeWidth={1.75} />
      <Key x={104} y={192} anchor="middle" fill={SIGNAL} size={9.5}>
        TARGET MARKETS
      </Key>

      <line x1={216} y1={160} x2={376} y2={160} stroke={INK} strokeWidth={1.25} />
      <line x1={296} y1={44} x2={296} y2={172} stroke={INK} strokeWidth={1.25} />
      {[
        [246, 76],
        [340, 66],
        [258, 132],
        [348, 128],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={7} fill={PAPER} stroke={INK3} strokeWidth={1.25} />
      ))}
      <circle cx={318} cy={100} r={11} fill={SIGNAL} />
      <Key x={296} y={192} anchor="middle" fill={SIGNAL} size={9.5}>
        POSITIONING
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   49 · BETTER OR CHEAPER — who should perform the channel function
   ========================================================================== */

export function BetterOrCheaper() {
  return (
    <Frame
      height={260}
      label="The same channel function costed twice: once performed by the producer and once by the wholesaler. The wholesaler's bar is shorter and its quality mark higher."
    >
      <line x1={140} y1={200} x2={744} y2={200} stroke={INK} strokeWidth={1.5} />
      <Key x={130} y={94} anchor="end" fill={INK3} size={9.5}>
        COST OF
      </Key>
      <Key x={130} y={110} anchor="end" fill={INK3} size={9.5}>
        PERFORMING IT
      </Key>
      <rect x={220} y={60} width={140} height={140} fill={PAPER2} stroke={INK3} strokeWidth={1.25} />
      <Factory3 x={290} y={196} k={0.72} tone={INK3} />
      <Key x={290} y={226} anchor="middle" fill={INK3} size={10}>
        PRODUCERS
      </Key>
      <rect x={520} y={128} width={140} height={72} fill={SIGNAL} />
      <Warehouse x={590} y={196} k={0.68} tone={PAPER} fill={SIGNAL} />
      <Key x={590} y={226} anchor="middle" fill={SIGNAL} size={10}>
        WHOLESALERS
      </Key>
      <line x1={220} y1={60} x2={660} y2={60} stroke={RULE2} strokeWidth={1} strokeDasharray="5 4" />
      <Arrow2 x1={440} y1={78} x2={440} y2={122} tone={SIGNAL} width={1.75} />
      <Key x={452} y={104} fill={SIGNAL} size={10}>
        MORE COST EFFECTIVELY
      </Key>
      <Key x={400} y={34} anchor="middle" fill={INK3} size={9.5}>
        THE SAME CHANNEL FUNCTIONS
      </Key>
      <Key x={400} y={250} anchor="middle" fill={SIGNAL} size={10}>
        WHOLESALERS ADD VALUE BY PERFORMING THEM BETTER
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   50 · MANY SMALL CUSTOMERS — with and without a wholesaler
   ========================================================================== */

export function ManySmallCustomers() {
  const targets = [50, 84, 118, 152, 186, 220];
  return (
    <Frame
      height={280}
      label="Above, a manufacturer runs a separate line to each of six small customers. Below, it runs one line to a wholesaler, which runs the six. The count of lines the manufacturer pays for falls from six to one."
    >
      <Factory3 x={62} y={132} k={0.8} tone={INK3} />
      <Key x={62} y={156} anchor="middle" fill={INK3} size={9.5}>
        MANUFACTURERS
      </Key>
      {targets.map((y) => (
        <line key={y} x1={92} y1={112} x2={244} y2={y} stroke={INK3} strokeWidth={1} />
      ))}
      {targets.map((y) => (
        <Person3 key={y} x={262} y={y + 12} k={0.62} stroke={INK3} />
      ))}
      <Key x={262} y={252} anchor="middle" fill={INK3} size={9.5}>
        SIX LINES TO KEEP
      </Key>
      <line x1={330} y1={30} x2={330} y2={250} stroke={RULE} strokeWidth={1} strokeDasharray="5 5" />

      <Factory3 x={392} y={132} k={0.8} tone={SIGNAL} />
      <Key x={392} y={156} anchor="middle" fill={SIGNAL} size={9.5}>
        MANUFACTURERS
      </Key>
      <Arrow2 x1={424} y1={112} x2={488} y2={112} tone={SIGNAL} width={2.5} />
      <Warehouse x={532} y={140} k={0.82} tone={SIGNAL} fill={SIGNAL_TINT} />
      <Key x={532} y={164} anchor="middle" fill={SIGNAL} size={9.5}>
        WHOLESALERS
      </Key>
      {targets.map((y) => (
        <line key={y} x1={570} y1={112} x2={700} y2={y} stroke={SIGNAL} strokeWidth={1} />
      ))}
      {targets.map((y) => (
        <Person3 key={y} x={718} y={y + 12} k={0.62} stroke={SIGNAL} />
      ))}
      <Key x={560} y={252} anchor="middle" fill={SIGNAL} size={9.5}>
        ONE LINE, AT A LOW COST
      </Key>
      <Key x={400} y={22} anchor="middle" fill={INK3} size={9.5}>
        REACHING MANY SMALL CUSTOMERS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   51 · WHO HOLDS THE STOCK — inventory moved off supplier and customer
   ========================================================================== */

export function HoldInventory() {
  return (
    <Frame
      height={260}
      label="A supplier on the left and a customer on the right, each holding only a little stock. Between them the wholesaler holds the tall stack, so the cost and the risk of carrying it sit with the wholesaler."
    >
      <Factory3 x={90} y={176} />
      <Key x={90} y={200} anchor="middle" fill={INK} size={10}>
        SUPPLIERS
      </Key>
      <Pack4 x={168} y={176} w={38} h={30} tone={INK3} />
      <Arrow2 x1={168} y1={122} x2={168} y2={148} tone={INK3} width={1.25} size={7} />
      <Key x={168} y={110} anchor="middle" fill={INK3} size={9.5}>
        REDUCED
      </Key>

      <rect x={266} y={40} width={268} height={166} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.75} />
      <Warehouse x={330} y={176} tone={SIGNAL} fill={PAPER} />
      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2].map((c) => (
          <rect
            key={`${r}-${c}`}
            x={392 + c * 42}
            y={166 - r * 34}
            width={34}
            height={28}
            fill={PAPER}
            stroke={SIGNAL}
            strokeWidth={1.25}
          />
        )),
      )}
      <Key x={400} y={62} anchor="middle" fill={SIGNAL} size={10}>
        THEY HOLD INVENTORIES
      </Key>

      <Pack4 x={632} y={176} w={38} h={30} tone={INK3} />
      <Arrow2 x1={632} y1={122} x2={632} y2={148} tone={INK3} width={1.25} size={7} />
      <Key x={632} y={110} anchor="middle" fill={INK3} size={9.5}>
        REDUCED
      </Key>
      <Person3 x={716} y={176} k={1.4} />
      <Key x={716} y={200} anchor="middle" fill={INK} size={10}>
        CUSTOMERS
      </Key>
      <line x1={40} y1={222} x2={760} y2={222} stroke={RULE} strokeWidth={1} />
      <Key x={400} y={244} anchor="middle" fill={INK3} size={9.5}>
        INVENTORY COSTS AND RISKS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   52 · PLAN, IMPLEMENT, CONTROL — the loop over the physical flow
   ========================================================================== */

export function PlanImplementControl() {
  const stages = [
    { x: 176, name: "PLANNING" },
    { x: 400, name: "IMPLEMENTING" },
    { x: 624, name: "CONTROLLING" },
  ];
  return (
    <Frame
      height={260}
      label="Planning, implementing and controlling drawn as three stages in a loop. Below them, the physical flow of goods they act on: a truck running from a plant to a store."
    >
      {stages.map((s, i) => (
        <g key={s.name}>
          <rect x={s.x - 88} y={40} width={176} height={58} fill={PAPER} stroke={SIGNAL} strokeWidth={1.5} />
          <Key x={s.x} y={76} anchor="middle" fill={SIGNAL} size={10.5}>
            {s.name}
          </Key>
          {i < 2 ? <Arrow2 x1={s.x + 90} y1={69} x2={s.x + 132} y2={69} tone={SIGNAL} width={1.5} size={7} /> : null}
        </g>
      ))}
      <path d="M712 69 H756 V126 H44 V69 H88" fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <path d={headAlong1(88, 69, 1, 0)} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <line x1={70} y1={196} x2={730} y2={196} stroke={INK} strokeWidth={1.75} />
      <Factory3 x={100} y={196} k={0.78} />
      <Truck2 x={400} y={196} />
      <Store2 x={696} y={196} k={0.82} />
      <Arrow2 x1={160} y1={158} x2={640} y2={158} tone={INK} width={1.5} />
      <Key x={400} y={146} anchor="middle" fill={INK} size={10}>
        THE PHYSICAL FLOW OF GOODS
      </Key>
      <Key x={400} y={228} anchor="middle" fill={INK3} size={9.5}>
        WHAT LOGISTICS PLANS, IMPLEMENTS AND CONTROLS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   53 · FOUR RIGHTS — product, customer, place, time, all at once
   ========================================================================== */

export function FourRights() {
  const dials = [
    { x: 118, name: "PRODUCT", y0: 44 },
    { x: 306, name: "CUSTOMER", y0: 44 },
    { x: 494, name: "PLACE", y0: 44 },
    { x: 682, name: "TIME", y0: 44 },
  ];
  return (
    <Frame
      height={240}
      label="Four dials, one each for product, customer, place and time. All four pointers are lined up on the same mark, because delivery is only right when all four are right together."
    >
      {dials.map((d) => (
        <g key={d.name}>
          <circle cx={d.x} cy={106} r={52} fill={PAPER} stroke={INK} strokeWidth={1.5} />
          <line x1={d.x} y1={106} x2={d.x} y2={62} stroke={SIGNAL} strokeWidth={2.5} />
          <circle cx={d.x} cy={106} r={5} fill={INK} />
          <path d={`M${d.x - 5} ${d.y0} L${d.x} ${d.y0 + 9} L${d.x + 5} ${d.y0} Z`} fill={SIGNAL} />
          <line x1={d.x - 44} y1={130} x2={d.x - 36} y2={124} stroke={RULE2} strokeWidth={1.5} />
          <line x1={d.x + 44} y1={130} x2={d.x + 36} y2={124} stroke={RULE2} strokeWidth={1.5} />
          <Key x={d.x} y={186} anchor="middle" fill={INK} size={10.5}>
            {d.name}
          </Key>
          <Key x={d.x} y={206} anchor="middle" fill={SIGNAL} size={9.5}>
            RIGHT
          </Key>
        </g>
      ))}
      <line x1={118} y1={30} x2={682} y2={30} stroke={SIGNAL} strokeWidth={1.25} strokeDasharray="5 4" />
      <Key x={400} y={222} anchor="middle" fill={INK3} size={9.5}>
        ALL FOUR, TOGETHER
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   54 · THREE DISTRIBUTIONS — inbound, outbound, reverse
   ========================================================================== */

export function ThreeDistributions() {
  return (
    <Frame
      height={280}
      label="The company as a box in the middle. Inbound distribution enters from the left, outbound distribution leaves to the right, and reverse distribution loops back from the customer along the bottom."
    >
      <rect x={300} y={92} width={200} height={104} fill={PAPER} stroke={INK} strokeWidth={1.75} />
      <Factory3 x={400} y={176} />
      <Key x={400} y={120} anchor="middle" fill={INK} size={10.5}>
        THE COMPANY
      </Key>
      <Pack4 x={80} y={158} w={40} h={34} tone={COUNTER} fill={COUNTER_TINT} />
      <Arrow2 x1={118} y1={130} x2={292} y2={130} tone={COUNTER} width={2} />
      <Key x={204} y={116} anchor="middle" fill={COUNTER} size={10.5}>
        INBOUND
      </Key>
      <Arrow2 x1={508} y1={130} x2={682} y2={130} tone={SIGNAL} width={2} />
      <Key x={596} y={116} anchor="middle" fill={SIGNAL} size={10.5}>
        OUTBOUND
      </Key>
      <Person3 x={732} y={158} k={1.4} stroke={SIGNAL} />
      <path d="M732 178 V236 H400 V206" fill="none" stroke={INK} strokeWidth={1.75} strokeDasharray="6 4" />
      <path d={headAlong1(400, 202, 0, -1)} fill="none" stroke={INK} strokeWidth={1.75} />
      <Key x={566} y={256} anchor="middle" fill={INK} size={10.5}>
        REVERSE
      </Key>
      <Key x={400} y={44} anchor="middle" fill={INK3} size={9.5}>
        MARKETING LOGISTICS INVOLVES ALL THREE
      </Key>
      <line x1={204} y1={60} x2={596} y2={60} stroke={RULE} strokeWidth={1} />
    </Frame>
  );
}

/* ==========================================================================
   55 · UPSTREAM AND DOWNSTREAM — value added along the way
   ========================================================================== */

export function UpstreamDownstream() {
  const stages = [
    { x: 116, name: "SUPPLIERS", g: "pack" },
    { x: 316, name: "THE COMPANY", g: "factory" },
    { x: 516, name: "RESELLERS", g: "store" },
    { x: 700, name: "CUSTOMERS", g: "person" },
  ];
  return (
    <Frame
      height={300}
      label="A chain of four stages. A band above it shows value being added as materials and final goods move downstream. A dashed band below shows information moving upstream, back the other way."
    >
      {stages.map((s) => (
        <g key={s.name}>
          {s.g === "pack" ? <Pack4 x={s.x} y={186} w={44} h={40} /> : null}
          {s.g === "factory" ? <Factory3 x={s.x} y={186} /> : null}
          {s.g === "store" ? <Store2 x={s.x} y={186} /> : null}
          {s.g === "person" ? <Person3 x={s.x} y={186} k={1.4} /> : null}
          <Key x={s.x} y={212} anchor="middle" fill={INK} size={10}>
            {s.name}
          </Key>
        </g>
      ))}
      <line x1={116} y1={148} x2={700} y2={148} stroke={RULE} strokeWidth={1.25} />
      {stages.map((st, i) => (
        <rect
          key={st.name}
          x={st.x - 58}
          y={104 - i * 14}
          width={116}
          height={26 + i * 14}
          fill={i % 2 ? SIGNAL_TINT : PAPER2}
          stroke={SIGNAL}
          strokeWidth={1.25}
        />
      ))}
      <Key x={58} y={68} fill={SIGNAL} size={10}>
        VALUE ADDED
      </Key>
      <Arrow2 x1={116} y1={250} x2={700} y2={250} tone={SIGNAL} width={2} />
      <Key x={408} y={238} anchor="middle" fill={SIGNAL} size={10.5}>
        DOWNSTREAM: MATERIALS AND FINAL GOODS
      </Key>
      <Arrow2 x1={700} y1={278} x2={116} y2={278} tone={COUNTER} width={2} dash="6 4" />
      <Key x={408} y={294} anchor="middle" fill={COUNTER} size={10.5}>
        UPSTREAM: RELATED INFORMATION
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   56 · SERVICE UP, COST DOWN — the two ends of the same decision (400)
   ========================================================================== */

export function ServiceAndCost() {
  return (
    <Frame
      width={400}
      height={230}
      label="Two opposed arrows on one axis. Customer service is pushed to its maximum at the top. Distribution costs are pushed to their minimum at the bottom."
    >
      <line x1={200} y1={40} x2={200} y2={196} stroke={RULE} strokeWidth={1.25} />
      <Arrow2 x1={140} y1={150} x2={140} y2={56} tone={SIGNAL} width={2.5} />
      <Key x={124} y={98} anchor="end" fill={SIGNAL} size={10}>
        CUSTOMER
      </Key>
      <Key x={124} y={116} anchor="end" fill={SIGNAL} size={10}>
        SERVICE
      </Key>
      <Key x={140} y={44} anchor="middle" fill={SIGNAL} size={9.5}>
        MAXIMIZE
      </Key>
      <Arrow2 x1={260} y1={86} x2={260} y2={180} tone={COUNTER} width={2.5} />
      <Key x={276} y={98} fill={COUNTER} size={10}>
        DISTRIBUTION
      </Key>
      <Key x={276} y={116} fill={COUNTER} size={10}>
        COSTS
      </Key>
      <Key x={260} y={198} anchor="middle" fill={COUNTER} size={9.5}>
        MINIMIZE
      </Key>
      <Key x={200} y={220} anchor="middle" fill={INK3} size={9.5}>
        ONE DECISION, TWO DIRECTIONS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   57 · THE MAJOR FUNCTIONS — the four things supply chains manage
   ========================================================================== */

export function SupplyFunctions() {
  const fns = [
    { x: 116, name: "WAREHOUSING" },
    { x: 306, name: "INVENTORY MANAGEMENT" },
    { x: 496, name: "TRANSPORTATION" },
    { x: 686, name: "LOGISTICS INFORMATION" },
  ];
  return (
    <Frame
      height={230}
      label="Four tiles, one per major supply chain function: a warehouse, a stock level on a gauge, a truck on a road, and a screen of logistics information."
    >
      {fns.map((f, i) => (
        <g key={f.name}>
          <rect x={f.x - 88} y={30} width={176} height={132} fill={PAPER} stroke={i === 3 ? COUNTER : INK} strokeWidth={1.25} />
          <Key x={f.x} y={190} anchor="middle" fill={i === 3 ? COUNTER : INK} size={10}>
            {f.name}
          </Key>
        </g>
      ))}
      <Warehouse x={116} y={136} k={1.1} />
      <g>
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={268} y={128 - i * 26} width={76} height={22} fill={i < 2 ? SIGNAL : PAPER2} stroke={i < 2 ? SIGNAL : INK3} strokeWidth={1.25} />
        ))}
        <line x1={256} y1={50} x2={256} y2={150} stroke={INK} strokeWidth={1.25} />
        <line x1={250} y1={76} x2={262} y2={76} stroke={INK} strokeWidth={1.25} />
      </g>
      <g>
        <line x1={412} y1={136} x2={580} y2={136} stroke={INK} strokeWidth={1.75} />
        <Truck2 x={496} y={136} />
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1={420 + i * 44} y1={148} x2={440 + i * 44} y2={148} stroke={RULE2} strokeWidth={2} />
        ))}
      </g>
      <g>
        <rect x={628} y={52} width={116} height={78} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.5} />
        {[68, 82, 96, 110].map((y, i) => (
          <line key={y} x1={642} y1={y} x2={642 + [86, 60, 74, 44][i]} y2={y} stroke={COUNTER} strokeWidth={1.75} />
        ))}
        <line x1={686} y1={130} x2={686} y2={144} stroke={COUNTER} strokeWidth={1.5} />
        <line x1={660} y1={144} x2={712} y2={144} stroke={COUNTER} strokeWidth={1.5} />
      </g>
      <Key x={400} y={214} anchor="middle" fill={INK3} size={9.5}>
        MAJOR FUNCTIONS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   58 · OUTSOURCED — the logistics functions move to a provider
   ========================================================================== */

export function OutsourceLogistics() {
  const fns = ["WAREHOUSING", "INVENTORY", "TRANSPORTATION"];
  return (
    <Frame
      height={260}
      label="Three logistics functions lifted out of the company box on the left and set down inside a third-party provider's box on the right."
    >
      <rect x={20} y={54} width={252} height={160} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <Key x={146} y={82} anchor="middle" fill={INK} size={10.5}>
        THE COMPANY
      </Key>
      {fns.map((f, i) => (
        <g key={f}>
          <rect x={48} y={100 + i * 36} width={196} height={28} fill={PAPER2} stroke={RULE2} strokeWidth={1.25} strokeDasharray="5 4" />
          <Key x={146} y={119 + i * 36} anchor="middle" fill={INK3} size={9.5}>
            {f}
          </Key>
        </g>
      ))}
      <Arrow2 x1={290} y1={134} x2={382} y2={134} tone={SIGNAL} width={2.5} />
      <Key x={336} y={118} anchor="middle" fill={SIGNAL} size={10}>
        OUTSOURCING
      </Key>
      <rect x={400} y={54} width={252} height={160} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.75} />
      <Key x={526} y={82} anchor="middle" fill={SIGNAL} size={10.5}>
        THIRD-PARTY PROVIDERS
      </Key>
      {fns.map((f, i) => (
        <g key={f}>
          <rect x={428} y={100 + i * 36} width={196} height={28} fill={PAPER} stroke={SIGNAL} strokeWidth={1.25} />
          <Key x={526} y={119 + i * 36} anchor="middle" fill={SIGNAL} size={9.5}>
            {f}
          </Key>
        </g>
      ))}
      <Key x={400} y={244} anchor="middle" fill={INK3} size={9.5}>
        LOGISTICS FUNCTIONS
      </Key>
      <line x1={146} y1={230} x2={654} y2={230} stroke={RULE} strokeWidth={1} />
    </Frame>
  );
}

/* ==========================================================================
   59 · WHAT THE COMPANY GETS BACK — money, service, focus
   ========================================================================== */

export function ThreeGains() {
  return (
    <Frame
      height={230}
      label="Three panels: a cost bar falling, a service bar rising, and the company's effort narrowed onto a single core."
    >
      <line x1={266} y1={34} x2={266} y2={186} stroke={RULE} strokeWidth={1} strokeDasharray="5 5" />
      <line x1={534} y1={34} x2={534} y2={186} stroke={RULE} strokeWidth={1} strokeDasharray="5 5" />
      <rect x={60} y={64} width={54} height={104} fill={PAPER2} stroke={INK3} strokeWidth={1.25} />
      <rect x={150} y={124} width={54} height={44} fill={SIGNAL} />
      <Arrow2 x1={132} y1={88} x2={132} y2={140} tone={SIGNAL} width={1.75} />
      <Key x={132} y={192} anchor="middle" fill={SIGNAL} size={10}>
        SAVE MONEY
      </Key>
      <rect x={330} y={124} width={54} height={44} fill={PAPER2} stroke={INK3} strokeWidth={1.25} />
      <rect x={420} y={64} width={54} height={104} fill={SIGNAL} />
      <Arrow2 x1={402} y1={140} x2={402} y2={88} tone={SIGNAL} width={1.75} />
      <Key x={402} y={192} anchor="middle" fill={SIGNAL} size={10}>
        IMPROVE SERVICE
      </Key>
      {[
        [606, 62],
        [686, 54],
        [744, 90],
      ].map(([x, y], i) => (
        <g key={i}>
          <rect x={x - 22} y={y - 16} width={44} height={32} fill="none" stroke={RULE2} strokeWidth={1.25} strokeDasharray="4 4" />
        </g>
      ))}
      <circle cx={666} cy={142} r={30} fill={SIGNAL} />
      <Key x={666} y={192} anchor="middle" fill={SIGNAL} size={10}>
        FOCUS ON CORE COMPETENCIES
      </Key>
      {[
        [606, 78],
        [686, 70],
        [738, 104],
      ].map(([x, y], i) => (
        <Arrow2 key={i} x1={x} y1={y} x2={Math.round(666 + (x - 666) / 4)} y2={Math.round(142 - 34 + (y - 108) / 4)} tone={RULE2} width={1.25} size={6} />
      ))}
      <Key x={400} y={216} anchor="middle" fill={INK3} size={9.5}>
        WHAT 3PL PROVIDERS CAN HELP COMPANIES DO
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   60 · A COMPLEX ENVIRONMENT — many routes, rules and modes at once (400)
   ========================================================================== */

export function ComplexEnvironment() {
  const nodes = [
    [70, 66],
    [160, 44],
    [250, 78],
    [330, 52],
    [96, 140],
    [190, 118],
    [286, 148],
    [350, 120],
    [130, 178],
    [244, 190],
  ] as const;
  const edges = [
    [0, 1],
    [1, 2],
    [2, 3],
    [0, 4],
    [1, 5],
    [4, 5],
    [5, 2],
    [5, 6],
    [6, 7],
    [3, 7],
    [4, 8],
    [8, 9],
    [9, 6],
    [8, 5],
    [2, 6],
  ] as const;
  return (
    <Frame
      width={400}
      height={230}
      label="A tangle of routes joining ten points, with no single clear path. One route through it is picked out in colour."
    >
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke={RULE2}
          strokeWidth={1.25}
        />
      ))}
      <path d="M70 66 L96 140 L190 118 L286 148 L350 120" fill="none" stroke={SIGNAL} strokeWidth={2.5} strokeLinejoin="round" />
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={6} fill={PAPER} stroke={INK3} strokeWidth={1.25} />
      ))}
      <Key x={200} y={216} anchor="middle" fill={SIGNAL} size={10}>
        INCREASINGLY COMPLEX LOGISTICS ENVIRONMENTS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   61–63 · CONCLUSION GLYPHS
   ========================================================================== */

export function GlyphLink() {
  return (
    <svg width={64} height={40} viewBox="0 0 64 40" aria-hidden className="block">
      <rect x={2} y={12} width={26} height={16} rx={8} fill="none" stroke={SIGNAL} strokeWidth={3} />
      <rect x={20} y={12} width={26} height={16} rx={8} fill="none" stroke={INK} strokeWidth={3} />
      <rect x={38} y={12} width={24} height={16} rx={8} fill="none" stroke={SIGNAL} strokeWidth={3} />
    </svg>
  );
}

export function GlyphBalance() {
  return (
    <svg width={64} height={40} viewBox="0 0 64 40" aria-hidden className="block">
      <line x1={32} y1={6} x2={32} y2={34} stroke={INK} strokeWidth={2} />
      <line x1={8} y1={14} x2={56} y2={22} stroke={SIGNAL} strokeWidth={2.5} />
      <rect x={2} y={16} width={14} height={10} fill="none" stroke={INK} strokeWidth={1.75} />
      <rect x={48} y={24} width={14} height={10} fill="none" stroke={INK} strokeWidth={1.75} />
      <line x1={22} y1={34} x2={42} y2={34} stroke={INK} strokeWidth={2} />
    </svg>
  );
}

export function GlyphAdvantage() {
  return (
    <svg width={64} height={40} viewBox="0 0 64 40" aria-hidden className="block">
      <line x1={4} y1={36} x2={60} y2={36} stroke={INK} strokeWidth={2} />
      <rect x={8} y={24} width={12} height={12} fill={INK} />
      <rect x={26} y={16} width={12} height={20} fill={INK} />
      <rect x={44} y={4} width={12} height={32} fill={SIGNAL} />
    </svg>
  );
}
