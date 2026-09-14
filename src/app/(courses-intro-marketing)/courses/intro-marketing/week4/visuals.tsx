/* ==========================================================================
   Week 04 — figures
   --------------------------------------------------------------------------
   Hand-drawn SVG plates, one grammar per idea: a forked flow of what
   organizations do with what they buy, a split lane that demand crosses, a
   sign-off sheet, a decision tree, a checklist with a stamp, interlocking
   rings, a descending supply-chain cascade, an org chart with a buying
   center pulled across it, a radiating fan of roles, a many-to-one role map,
   three purchase loops, a podium, a rope thickening over a foundation,
   bars under a lifetime bracket, merging circles, a magnifying lens, a core
   process loop, share bars, and three small benefit plates.

   Conventions carried over from earlier weeks:
     · viewBox width 800 (400 or 360 for column plates), flat fills,
       hairline rules, no shadows or gradients
     · INK carries the neutral case, SIGNAL the operative one, COUNTER the
       contrast or outward-looking state
     · every label reuses words from the slide the plate sits on
     · anything that implies a quantity the content does not give is marked
       SCHEMATIC
   ========================================================================== */

import React from "react";
import {
  Key,
  Note,
  Display,
  Frame,
  Schematic,
  INK,
  INK3,
  RULE,
  RULE2,
  SIGNAL,
  COUNTER,
  PAPER,
  SIGNAL_TINT,
  COUNTER_TINT,
} from "../week1/visuals";

/** Open chevron arrowhead pointing along (dx, dy), tip at (x, y). */
function headAlong(x: number, y: number, dx: number, dy: number, s = 8) {
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const bx = x - ux * s;
  const by = y - uy * s;
  const px = -uy * (s * 0.62);
  const py = ux * (s * 0.62);
  return `M${(bx + px).toFixed(2)} ${(by + py).toFixed(2)}L${x.toFixed(2)} ${y.toFixed(2)}L${(bx - px).toFixed(2)} ${(by - py).toFixed(2)}`;
}

const head = {
  right: (x: number, y: number) => headAlong(x, y, 1, 0),
  left: (x: number, y: number) => headAlong(x, y, -1, 0),
  down: (x: number, y: number) => headAlong(x, y, 0, 1),
  up: (x: number, y: number) => headAlong(x, y, 0, -1),
};

/** A person glyph standing on (x, y). k scales it; 1 is 34 units tall. */
function Person({
  x,
  y,
  k = 1,
  stroke = INK,
  fill = PAPER,
  width = 1.5,
  dashed = false,
}: {
  x: number;
  y: number;
  k?: number;
  stroke?: string;
  fill?: string;
  width?: number;
  dashed?: boolean;
}) {
  const w = 10 * k;
  const top = y - 21 * k;
  const shoulder = y - 12 * k;
  const dash = dashed ? "3 3" : undefined;
  return (
    <g>
      <circle cx={x} cy={y - 28 * k} r={6 * k} fill={fill} stroke={stroke} strokeWidth={width} strokeDasharray={dash} />
      <path
        d={`M${x - w} ${y}V${shoulder}Q${x - w} ${top} ${x} ${top}Q${x + w} ${top} ${x + w} ${shoulder}V${y}Z`}
        fill={fill}
        stroke={stroke}
        strokeWidth={width}
        strokeLinejoin="round"
        strokeDasharray={dash}
      />
    </g>
  );
}

/** A gear of radius r centred on (x, y). */
function Gear({ x, y, r, stroke = INK, width = 1.5 }: { x: number; y: number; r: number; stroke?: string; width?: number }) {
  const teeth = r > 10 ? 8 : 6;
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={PAPER} stroke={stroke} strokeWidth={width} />
      <circle cx={x} cy={y} r={r * 0.35} fill="none" stroke={stroke} strokeWidth={width} />
      {Array.from({ length: teeth }, (_, i) => (
        <rect
          key={i}
          x={x - r * 0.16}
          y={y - r - r * 0.34}
          width={r * 0.32}
          height={r * 0.36}
          fill={stroke}
          transform={`rotate(${(360 / teeth) * i} ${x} ${y})`}
        />
      ))}
    </g>
  );
}

/** A small factory: box with a sawtooth roof, centred on x, standing on y. */
function Factory({ x, y, w = 56, h = 36, stroke = INK, fill = PAPER }: { x: number; y: number; w?: number; h?: number; stroke?: string; fill?: string }) {
  const left = x - w / 2;
  const step = w / 3;
  const top = y - h;
  const roof = Array.from({ length: 3 }, (_, i) => `L${left + step * i} ${top - 12}L${left + step * (i + 1)} ${top}`).join("");
  return (
    <g>
      <path d={`M${left} ${top}${roof}Z`} fill={fill} stroke={stroke} strokeWidth={1.5} strokeLinejoin="round" />
      <rect x={left} y={top} width={w} height={h} fill={fill} stroke={stroke} strokeWidth={1.5} />
    </g>
  );
}

/* ==========================================================================
   1 · FORKED FLOW — what organizations do with what they buy
   ========================================================================== */

export function TwoUses() {
  return (
    <Frame height={240} label="A seller sells products and services to an organization, which uses them either to produce other goods or for its own operations.">
      <rect x={40} y={104} width={140} height={32} fill={PAPER} stroke={INK} strokeWidth={1.25} />
      <Key x={110} y={124} anchor="middle" fill={INK} size={10}>
        SELLER
      </Key>
      <line x1={184} y1={120} x2={276} y2={120} stroke={SIGNAL} strokeWidth={1.5} />
      <path d={head.right(278, 120)} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <Note x={230} y={160} anchor="middle" size={11.5} italic>
        products and services
      </Note>

      <rect x={280} y={100} width={160} height={40} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
      <Key x={360} y={124} anchor="middle" fill={SIGNAL} size={10}>
        ORGANIZATION
      </Key>

      {/* produce other goods */}
      <path d="M444 120 C500 120 510 64 562 64" fill="none" stroke={INK} strokeWidth={1.5} />
      <path d={head.right(564, 64)} fill="none" stroke={INK} strokeWidth={1.5} />
      <Factory x={610} y={84} w={80} h={40} />
      <line x1={654} y1={64} x2={690} y2={64} stroke={INK} strokeWidth={1.5} />
      <path d={head.right(692, 64)} fill="none" stroke={INK} strokeWidth={1.5} />
      {[698, 724, 750].map((x) => (
        <rect key={x} x={x} y={53} width={22} height={22} fill={PAPER} stroke={INK} strokeWidth={1.25} />
      ))}
      <Key x={670} y={22} anchor="middle" fill={INK} size={10}>
        PRODUCE OTHER GOODS
      </Key>

      {/* their own operations */}
      <path d="M444 120 C500 120 510 176 584 176" fill="none" stroke={COUNTER} strokeWidth={1.5} />
      <path d={head.right(586, 176)} fill="none" stroke={COUNTER} strokeWidth={1.5} />
      <Gear x={612} y={176} r={16} stroke={COUNTER} />
      <Gear x={646} y={194} r={10} stroke={COUNTER} />
      <Key x={620} y={230} anchor="middle" fill={COUNTER} size={10}>
        THEIR OWN OPERATIONS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   2 · SPLIT LANE — B2B vs B2C market characteristics
   ========================================================================== */

export function MarketSplitLane() {
  const calm = [0, -5, -2, -6, -1, -4, -3, -6, -2, -5, -3];
  const swing = [0, -22, 12, -26, 16, -10, 22, -24, 8, -18, 12];
  const spark = (base: number, ds: number[]) =>
    `M${ds.map((d, i) => `${600 + i * 16} ${base + d}`).join("L")}`;
  return (
    <Frame height={284} label="A split lane. Top, B2C: many small buyers, demand from the consumer, steadier over time. Bottom, B2B: fewer, much larger buyers, derived demand that comes down from consumer demand, fluctuating more rapidly.">
      <Schematic />
      <Key x={250} y={40} anchor="middle" fill={INK3} size={10}>
        BUYERS
      </Key>
      <Key x={460} y={40} anchor="middle" fill={INK3} size={10}>
        SOURCE OF DEMAND
      </Key>
      <Key x={680} y={40} anchor="middle" fill={INK3} size={10}>
        DEMAND OVER TIME
      </Key>

      <line x1={20} y1={56} x2={780} y2={56} stroke={RULE2} strokeWidth={1} />
      <rect x={20} y={168} width={760} height={96} fill={SIGNAL_TINT} />
      <line x1={20} y1={160} x2={780} y2={160} stroke={RULE} strokeWidth={1.5} />

      <Display x={64} y={114} anchor="middle" fill={COUNTER} size={22}>
        B2C
      </Display>
      <Display x={64} y={226} anchor="middle" fill={SIGNAL} size={22}>
        B2B
      </Display>

      {/* buyers */}
      {Array.from({ length: 30 }, (_, i) => (
        <circle key={i} cx={212 + (i % 6) * 15} cy={80 + Math.floor(i / 6) * 14} r={3.5} fill={PAPER} stroke={COUNTER} strokeWidth={1.25} />
      ))}
      {[
        [208, 216, 22],
        [262, 210, 28],
        [310, 222, 18],
      ].map(([x, y, r]) => (
        <circle key={x} cx={x} cy={y} r={r} fill={PAPER} stroke={SIGNAL} strokeWidth={1.75} />
      ))}

      {/* source of demand */}
      <Key x={460} y={80} anchor="middle" fill={COUNTER} size={10}>
        CONSUMER DEMAND
      </Key>
      <Person x={460} y={138} k={1.3} stroke={COUNTER} />
      <line x1={460} y1={142} x2={460} y2={196} stroke={SIGNAL} strokeWidth={1.5} />
      <path d={head.down(460, 198)} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <Note x={474} y={183} size={11.5} italic>
        comes from consumer demand
      </Note>
      <rect x={390} y={200} width={140} height={32} fill={PAPER} stroke={SIGNAL} strokeWidth={1.5} />
      <Key x={460} y={220} anchor="middle" fill={SIGNAL} size={10}>
        DERIVED DEMAND
      </Key>

      {/* demand over time */}
      <path d={spark(106, calm)} fill="none" stroke={COUNTER} strokeWidth={1.5} strokeLinejoin="round" />
      <path d={spark(216, swing)} fill="none" stroke={SIGNAL} strokeWidth={1.75} strokeLinejoin="round" />
      <Note x={680} y={256} anchor="middle" size={12} italic>
        fluctuates more rapidly
      </Note>
    </Frame>
  );
}

/* ==========================================================================
   3 · SIGN-OFF SHEET — more participants, a formal purchasing effort
   ========================================================================== */

export function SignOffSheet() {
  const rows = [110, 142, 174, 206, 238];
  return (
    <Frame height={300} label="Left: a B2C purchase made by one person. Right: a B2B purchase order that needs sign-off from several decision participants.">
      <Key x={170} y={36} anchor="middle" fill={INK3} size={10}>
        B2C PURCHASE
      </Key>
      <line x1={110} y1={230} x2={230} y2={230} stroke={RULE} strokeWidth={1} />
      <Person x={170} y={230} k={1.8} />

      <line x1={340} y1={30} x2={340} y2={280} stroke={RULE} strokeWidth={1} />

      <Key x={560} y={36} anchor="middle" fill={SIGNAL} size={10}>
        B2B PURCHASE
      </Key>
      <rect x={400} y={50} width={320} height={220} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <rect x={400.75} y={50.75} width={318.5} height={33} fill={SIGNAL_TINT} />
      <line x1={400} y1={84} x2={720} y2={84} stroke={SIGNAL} strokeWidth={1} />
      <Key x={560} y={72} anchor="middle" fill={SIGNAL} size={11}>
        PURCHASE ORDER
      </Key>
      {rows.map((r, i) => {
        const signed = i < 4;
        return (
          <g key={r}>
            <Person x={428} y={r + 10} k={0.6} stroke={INK3} width={1.25} />
            <line x1={450} y1={r + 8} x2={620} y2={r + 8} stroke={RULE2} strokeWidth={1.25} />
            {signed ? (
              <path d={`M458 ${r + 4} c 10 -12 16 10 26 -2 s 14 8 24 -4 s 12 6 30 0`} fill="none" stroke={INK} strokeWidth={1.25} />
            ) : null}
            <rect x={648} y={r - 7} width={18} height={18} fill={PAPER} stroke={INK3} strokeWidth={1.25} />
            {signed ? (
              <path d={`M651 ${r + 2} L656 ${r + 7} L664 ${r - 4}`} fill="none" stroke={SIGNAL} strokeWidth={2} />
            ) : null}
          </g>
        );
      })}
      <Key x={560} y={292} anchor="middle" fill={INK} size={10}>
        MORE DECISION PARTICIPANTS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   4a · DECISION TREE — more complex purchasing decisions (360 wide)
   ========================================================================== */

export function DecisionTree() {
  const l1 = [60, 160];
  const l2 = [35, 85, 135, 185];
  const l3 = [22, 48, 72, 98, 122, 148, 172, 198];
  const path = [60, 85, 98];
  const on = (a: number, b: number) =>
    (a === 110 && b === path[0]) || (a === path[0] && b === path[1]) || (a === path[1] && b === path[2]);
  const edges: [number, number, number, number][] = [];
  l1.forEach((y) => edges.push([40, 110, 130, y]));
  l2.forEach((y, i) => edges.push([130, l1[Math.floor(i / 2)], 220, y]));
  l3.forEach((y, i) => edges.push([220, l2[Math.floor(i / 2)], 310, y]));
  return (
    <Frame width={360} height={220} label="A branching decision tree with many possible paths, one of them traced through to a decision.">
      {edges.map(([x1, y1, x2, y2]) => (
        <line
          key={`${x1}-${y1}-${y2}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={on(y1, y2) && x1 < 310 ? SIGNAL : RULE2}
          strokeWidth={on(y1, y2) ? 2 : 1.25}
        />
      ))}
      <circle cx={40} cy={110} r={6} fill={SIGNAL} />
      {l1.map((y) => (
        <circle key={`a${y}`} cx={130} cy={y} r={4.5} fill={y === path[0] ? SIGNAL : PAPER} stroke={y === path[0] ? SIGNAL : INK3} strokeWidth={1.25} />
      ))}
      {l2.map((y) => (
        <circle key={`b${y}`} cx={220} cy={y} r={4.5} fill={y === path[1] ? SIGNAL : PAPER} stroke={y === path[1] ? SIGNAL : INK3} strokeWidth={1.25} />
      ))}
      {l3.map((y) => (
        <circle key={`c${y}`} cx={310} cy={y} r={y === path[2] ? 7 : 4} fill={y === path[2] ? SIGNAL : PAPER} stroke={y === path[2] ? SIGNAL : INK3} strokeWidth={1.25} />
      ))}
    </Frame>
  );
}

/* ==========================================================================
   4b · CHECKLIST AND STAMP — a highly formalized process (360 wide)
   ========================================================================== */

export function FormalChecklist() {
  const rows = [
    { y: 76, len: 110 },
    { y: 116, len: 90 },
    { y: 156, len: 100 },
  ];
  return (
    <Frame width={360} height={226} label="A clipboard checklist with every step ticked and an approved stamp.">
      <rect x={90} y={30} width={180} height={184} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <rect x={150} y={22} width={60} height={18} fill={INK} />
      {rows.map((r) => (
        <g key={r.y}>
          <rect x={110} y={r.y - 8} width={16} height={16} fill={PAPER} stroke={INK3} strokeWidth={1.25} />
          <path d={`M113 ${r.y} L117 ${r.y + 4} L124 ${r.y - 5}`} fill="none" stroke={SIGNAL} strokeWidth={2} />
          <line x1={140} y1={r.y} x2={140 + r.len} y2={r.y} stroke={RULE2} strokeWidth={3} />
        </g>
      ))}
      <g transform="rotate(-14 234 186)">
        <circle cx={234} cy={186} r={30} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={2} />
        <circle cx={234} cy={186} r={24} fill="none" stroke={SIGNAL} strokeWidth={1} />
        <Key x={234} y={190} anchor="middle" fill={SIGNAL} size={9}>
          APPROVED
        </Key>
      </g>
    </Frame>
  );
}

/* ==========================================================================
   4c · INTERLOCKING RINGS — buyers and sellers depend on each other (360)
   ========================================================================== */

export function Interlock() {
  return (
    <Frame width={360} height={220} label="Two interlocking rings, buyer and seller, that cannot be pulled apart.">
      <circle cx={140} cy={104} r={60} fill="none" stroke={COUNTER} strokeWidth={8} />
      <circle cx={220} cy={104} r={60} fill="none" stroke={SIGNAL} strokeWidth={8} />
      <path d="M165.4 49.6 A60 60 0 0 1 192 74" fill="none" stroke={PAPER} strokeWidth={14} />
      <path d="M165.4 49.6 A60 60 0 0 1 192 74" fill="none" stroke={COUNTER} strokeWidth={8} />
      <Key x={112} y={108} anchor="middle" fill={COUNTER} size={10}>
        BUYER
      </Key>
      <Key x={248} y={108} anchor="middle" fill={SIGNAL} size={10}>
        SELLER
      </Key>
      <Key x={180} y={204} anchor="middle" fill={INK3} size={10}>
        HIGHLY DEPENDENT
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   5 · CASCADE — a drop in consumer demand steps down the supply chain
   ========================================================================== */

export function EvCascade() {
  const tiers = [
    { label: "CONSUMER DEMAND", tone: COUNTER },
    { label: "EV MAKERS", tone: INK },
    { label: "BATTERY MANUFACTURERS", tone: INK },
    { label: "RAW MATERIAL SUPPLIERS", tone: INK },
  ];
  const w = 170;
  const h = 36;
  return (
    <Frame height={250} label="Consumer demand for electric vehicles drops, and the drop steps down the B2B supply chain to EV makers, battery manufacturers, and raw material suppliers, with open questions at the last two.">
      {tiers.map((t, i) => {
        const x = 30 + i * 190;
        const y = 40 + i * 52;
        const next = i < tiers.length - 1;
        const cx = x + 150;
        return (
          <g key={t.label}>
            {next ? (
              <>
                <path d={`M${cx} ${y + h} V${y + 52 + h / 2} H${x + 186}`} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
                <path d={head.right(x + 188, y + 52 + h / 2)} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
              </>
            ) : null}
            <rect x={x} y={y} width={w} height={h} fill={i === 0 ? COUNTER_TINT : PAPER} stroke={t.tone} strokeWidth={1.5} />
            <Key x={x + w / 2} y={y + 22} anchor="middle" fill={t.tone} size={9.5}>
              {t.label}
            </Key>
            {i === 0 ? (
              <>
                <circle cx={x + w} cy={y} r={13} fill={SIGNAL} />
                <path d={`M${x + w} ${y - 6} V${y + 6} M${x + w - 5} ${y + 1} L${x + w} ${y + 6} L${x + w + 5} ${y + 1}`} fill="none" stroke={PAPER} strokeWidth={2} />
                <Note x={x + 85} y={y + h + 18} anchor="middle" size={11.5} italic>
                  for electric vehicles
                </Note>
              </>
            ) : null}
            {i >= 2 ? (
              <>
                <circle cx={x + w} cy={y} r={13} fill={PAPER} stroke={SIGNAL} strokeWidth={1.5} />
                <Display x={x + w} y={y + 6} anchor="middle" fill={SIGNAL} size={16}>
                  ?
                </Display>
              </>
            ) : null}
          </g>
        );
      })}
      <Key x={30} y={236} fill={INK3} size={10}>
        B2B SUPPLY CHAIN
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   6 · ORG CHART — a buying center pulled across departments
   ========================================================================== */

export function BuyingCenterOrg() {
  const depts = [
    { c: 180, name: "FINANCE" },
    { c: 400, name: "OPERATIONS" },
    { c: 620, name: "IT" },
  ];
  const lit = new Set(["180:40", "400:-40", "400:40", "620:-40"]);
  const offsets = [-40, 0, 40];
  return (
    <Frame height={296} label="An organization chart with three departments. People from different departments are pulled together into the buying center, which cuts across the formal structure.">
      <rect x={330} y={24} width={140} height={30} fill={PAPER} stroke={INK} strokeWidth={1.25} />
      <Key x={400} y={44} anchor="middle" fill={INK} size={10}>
        ORGANIZATION
      </Key>
      <path d="M400 54 V76 M180 76 H620 M180 76 V96 M400 76 V96 M620 76 V96" fill="none" stroke={INK3} strokeWidth={1.25} />

      {depts.map((d) => (
        <g key={d.name}>
          <rect x={d.c - 70} y={96} width={140} height={28} fill={PAPER} stroke={INK3} strokeWidth={1.25} />
          <Key x={d.c} y={114} anchor="middle" fill={INK3} size={10}>
            {d.name}
          </Key>
          {offsets.map((o) => {
            const on = lit.has(`${d.c}:${o}`);
            return (
              <g key={o}>
                <line x1={d.c} y1={124} x2={d.c + o} y2={170} stroke={RULE2} strokeWidth={1} />
                <Person x={d.c + o} y={206} k={0.9} stroke={on ? SIGNAL : INK3} fill={on ? SIGNAL_TINT : PAPER} />
                {on ? (
                  <line
                    x1={d.c + o}
                    y1={212}
                    x2={400 + (d.c + o - 400) * 0.3}
                    y2={246}
                    stroke={SIGNAL}
                    strokeWidth={1.25}
                    strokeDasharray="4 4"
                  />
                ) : null}
              </g>
            );
          })}
        </g>
      ))}

      <ellipse cx={400} cy={262} rx={96} ry={18} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
      <Key x={400} y={266} anchor="middle" fill={SIGNAL} size={10.5}>
        BUYING CENTER
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   7 · RADIATING — roles within the buying center
   ========================================================================== */

type RoleIcon = "gear" | "ruler" | "contract" | "check" | "gate";

function RoleGlyph({ icon, x, y, tone }: { icon: RoleIcon; x: number; y: number; tone: string }) {
  if (icon === "gear") return <Gear x={x} y={y} r={7} stroke={tone} width={1.5} />;
  if (icon === "ruler")
    return (
      <g>
        <rect x={x - 12} y={y - 5} width={24} height={10} fill="none" stroke={tone} strokeWidth={1.5} />
        {[-7, -2, 3, 8].map((o, i) => (
          <line key={o} x1={x + o} y1={y - 5} x2={x + o} y2={y - (i % 2 ? 1 : -1)} stroke={tone} strokeWidth={1.25} />
        ))}
      </g>
    );
  if (icon === "contract")
    return (
      <g>
        <rect x={x - 8} y={y - 11} width={16} height={22} fill="none" stroke={tone} strokeWidth={1.5} />
        <line x1={x - 4} y1={y - 5} x2={x + 4} y2={y - 5} stroke={tone} strokeWidth={1.25} />
        <line x1={x - 4} y1={y - 1} x2={x + 4} y2={y - 1} stroke={tone} strokeWidth={1.25} />
        <path d={`M${x - 5} ${y + 6} c 3 -4 4 3 6 0 s 3 2 4 -1`} fill="none" stroke={tone} strokeWidth={1.25} />
      </g>
    );
  if (icon === "check")
    return <path d={`M${x - 9} ${y} L${x - 3} ${y + 6} L${x + 9} ${y - 7}`} fill="none" stroke={tone} strokeWidth={2.25} />;
  return (
    <path
      d={`M${x - 11} ${y - 9} H${x + 11} L${x + 3} ${y + 1} V${y + 10} H${x - 3} V${y + 1} Z`}
      fill="none"
      stroke={tone}
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
  );
}

export function RadiatingRoles({ phase }: { phase: "first" | "second" }) {
  const cx = 400;
  const cy = 250;
  const roles: { a: number; name: string; icon: RoleIcon }[] = [
    { a: 180, name: "USERS", icon: "gear" },
    { a: 135, name: "INFLUENCERS", icon: "ruler" },
    { a: 90, name: "BUYERS", icon: "contract" },
    { a: 45, name: "DECIDERS", icon: "check" },
    { a: 0, name: "GATEKEEPERS", icon: "gate" },
  ];
  const label =
    phase === "first"
      ? "Roles radiate from the buying center: users, influencers, and buyers are shown; two further roles are still to come."
      : "Roles radiate from the buying center: users, influencers, and buyers, now joined by deciders and gatekeepers.";
  return (
    <Frame height={300} label={label}>
      {roles.map((r, i) => {
        const t = (r.a * Math.PI) / 180;
        const x = cx + 260 * Math.cos(t);
        const y = cy - 180 * Math.sin(t);
        const state = phase === "first" ? (i < 3 ? "lit" : "future") : i < 3 ? "known" : "lit";
        const tone = state === "lit" ? SIGNAL : state === "known" ? INK3 : RULE2;
        const len = Math.hypot(x - cx, y - cy);
        const ux = (x - cx) / len;
        const uy = (y - cy) / len;
        const keyProps =
          r.a === 90
            ? { x, y: y - 34, anchor: "middle" as const }
            : r.a > 90
              ? { x: x - 34, y: y + 4, anchor: "end" as const }
              : { x: x + 34, y: y + 4, anchor: "start" as const };
        return (
          <g key={r.name}>
            <line
              x1={cx + ux * 38}
              y1={cy + uy * 38}
              x2={x - ux * 26}
              y2={y - uy * 26}
              stroke={tone}
              strokeWidth={state === "lit" ? 1.75 : 1}
              strokeDasharray={state === "future" ? "4 5" : undefined}
            />
            <circle
              cx={x}
              cy={y}
              r={24}
              fill={state === "lit" ? SIGNAL_TINT : PAPER}
              stroke={tone}
              strokeWidth={state === "lit" ? 1.75 : 1.25}
              strokeDasharray={state === "future" ? "4 4" : undefined}
            />
            {state !== "future" ? (
              <>
                <RoleGlyph icon={r.icon} x={x} y={y} tone={tone} />
                <Key {...keyProps} fill={state === "lit" ? SIGNAL : INK3} size={10.5}>
                  {r.name}
                </Key>
              </>
            ) : null}
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r={36} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <Key x={cx} y={cy - 2} anchor="middle" fill={INK} size={9.5}>
        BUYING
      </Key>
      <Key x={cx} y={cy + 13} anchor="middle" fill={INK} size={9.5}>
        CENTER
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   8 · ROLE MAP — one person, many roles; many people, one role
   ========================================================================== */

export function RoleMapping() {
  return (
    <Frame height={210} label="Left: one person linked to two roles, decider and buyer. Right: three people linked to the same role, influencer.">
      <Person x={110} y={168} k={1.8} />
      <line x1={132} y1={138} x2={218} y2={84} stroke={INK3} strokeWidth={1.25} />
      <line x1={132} y1={138} x2={218} y2={136} stroke={INK3} strokeWidth={1.25} />
      <rect x={220} y={70} width={130} height={28} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
      <Key x={285} y={88} anchor="middle" fill={SIGNAL} size={10}>
        DECIDER
      </Key>
      <rect x={220} y={122} width={130} height={28} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <Key x={285} y={140} anchor="middle" fill={INK} size={10}>
        BUYER
      </Key>
      <Key x={200} y={196} anchor="middle" fill={INK} size={10}>
        ONE PERSON, MULTIPLE ROLES
      </Key>

      <line x1={400} y1={30} x2={400} y2={180} stroke={RULE} strokeWidth={1} />

      {[70, 120, 170].map((feet) => (
        <g key={feet}>
          <Person x={480} y={feet} k={1} />
          <line x1={496} y1={feet - 17} x2={598} y2={120} stroke={INK3} strokeWidth={1.25} />
        </g>
      ))}
      <rect x={600} y={106} width={130} height={28} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.5} />
      <Key x={665} y={124} anchor="middle" fill={COUNTER} size={10}>
        INFLUENCER
      </Key>
      <Key x={600} y={196} anchor="middle" fill={INK} size={10}>
        MULTIPLE PEOPLE, SAME ROLE
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   9 · THREE LOOPS — straight rebuy, modified rebuy, new task
   ========================================================================== */

export function BuyingSituations() {
  const panels = [
    { cx: 140, name: "STRAIGHT REBUY", tone: INK, note: "reorders without modifications" },
    { cx: 400, name: "MODIFIED REBUY", tone: COUNTER, note: "modifies specs, prices, or suppliers" },
    { cx: 660, name: "NEW TASK", tone: SIGNAL, note: "purchases for the first time" },
  ];
  return (
    <Frame height={240} label="Three panels. Straight rebuy: the same order loops back to the same supplier. Modified rebuy: the loop is edited. New task: a single first arrow to an unknown supplier.">
      <line x1={270} y1={30} x2={270} y2={210} stroke={RULE} strokeWidth={1} />
      <line x1={530} y1={30} x2={530} y2={210} stroke={RULE} strokeWidth={1} />
      {panels.map((p, i) => {
        const { cx, tone } = p;
        return (
          <g key={p.name}>
            <Key x={cx} y={40} anchor="middle" fill={tone} size={11}>
              {p.name}
            </Key>
            <Person x={cx - 70} y={150} k={1.2} stroke={tone} />
            {i < 2 ? (
              <>
                <Factory x={cx + 50} y={148} stroke={tone} />
                <path d={`M${cx - 52} 112 Q${cx - 10} 70 ${cx + 16} 106`} fill="none" stroke={tone} strokeWidth={1.5} />
                <path d={headAlong(cx + 18, 108, 26, 36)} fill="none" stroke={tone} strokeWidth={1.5} />
                <path d={`M${cx + 18} 156 Q${cx - 10} 196 ${cx - 50} 158`} fill="none" stroke={tone} strokeWidth={1.5} />
                <path d={headAlong(cx - 52, 156, -40, -38)} fill="none" stroke={tone} strokeWidth={1.5} />
              </>
            ) : (
              <>
                <line x1={cx - 44} y1={132} x2={cx + 14} y2={132} stroke={tone} strokeWidth={1.5} />
                <path d={head.right(cx + 16, 132)} fill="none" stroke={tone} strokeWidth={1.5} />
                <rect x={cx + 22} y={112} width={56} height={40} fill={SIGNAL_TINT} stroke={tone} strokeWidth={1.5} strokeDasharray="4 4" />
                <Display x={cx + 50} y={141} anchor="middle" fill={tone} size={22}>
                  ?
                </Display>
                {[
                  [cx + 88, 104, cx + 96, 96],
                  [cx + 92, 124, cx + 102, 124],
                  [cx + 88, 144, cx + 96, 152],
                ].map(([x1, y1, x2, y2]) => (
                  <line key={`${x1}-${y1}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={tone} strokeWidth={1.5} />
                ))}
              </>
            )}
            {i === 1 ? (
              <g transform={`rotate(-40 ${cx - 14} 70)`}>
                <rect x={cx - 30} y={66} width={26} height={8} fill={PAPER} stroke={tone} strokeWidth={1.5} />
                <path d={`M${cx - 4} 66 L${cx + 6} 70 L${cx - 4} 74 Z`} fill={tone} />
              </g>
            ) : null}
            <Note x={cx} y={222} anchor="middle" size={12} italic>
              {p.note}
            </Note>
          </g>
        );
      })}
    </Frame>
  );
}

/* ==========================================================================
   10 · PODIUM — which role wields the most actual power?
   ========================================================================== */

export function PowerPodium() {
  const chips = ["USERS", "INFLUENCERS", "BUYERS", "DECIDERS", "GATEKEEPERS"];
  return (
    <Frame height={248} label="An empty three-step podium with question marks, and the five buying-center roles waiting below to be ranked by power.">
      <Key x={400} y={32} anchor="middle" fill={INK3} size={10}>
        WHO WIELDS THE MOST ACTUAL POWER?
      </Key>
      <rect x={350} y={90} width={100} height={80} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
      <rect x={250} y={120} width={100} height={50} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <rect x={450} y={140} width={100} height={30} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <Display x={400} y={142} anchor="middle" fill={SIGNAL} size={30}>
        1
      </Display>
      <Display x={300} y={156} anchor="middle" fill={INK3} size={22}>
        2
      </Display>
      <Display x={500} y={163} anchor="middle" fill={INK3} size={18}>
        3
      </Display>
      <Display x={400} y={80} anchor="middle" fill={SIGNAL} size={28}>
        ?
      </Display>
      <Display x={300} y={110} anchor="middle" fill={INK3} size={22}>
        ?
      </Display>
      <Display x={500} y={130} anchor="middle" fill={INK3} size={20}>
        ?
      </Display>
      <line x1={200} y1={170} x2={600} y2={170} stroke={RULE} strokeWidth={1} />
      {chips.map((c, i) => {
        const x = 120 + i * 140;
        return (
          <g key={c}>
            <rect x={x - 58} y={200} width={116} height={28} fill={PAPER} stroke={INK3} strokeWidth={1.25} />
            <Key x={x} y={218} anchor="middle" fill={INK} size={9.5}>
              {c}
            </Key>
          </g>
        );
      })}
    </Frame>
  );
}

/* ==========================================================================
   11 · ROPE ON A FOUNDATION — a transaction thickens into a partnership
   ========================================================================== */

export function RelationshipRope() {
  const strands = Array.from({ length: 6 }, (_, i) => {
    const x0 = 80 + i * 95;
    const y = (x: number) => 118 + 9 * Math.sin(x / 32 + i * 1.05);
    const pts: string[] = [];
    for (let x = x0; x <= 740; x += 6) pts.push(`${x} ${y(x).toFixed(1)}`);
    return { i, x0, y0: y(x0), d: `M${pts.join("L")}` };
  });
  return (
    <Frame height={236} label="A single thread starting at the first transaction gains strands with each new transaction until it becomes a thick long term partnership, resting on a foundation of trust and mutual benefit.">
      {[270, 440, 610].map((x) => (
        <line key={x} x1={x} y1={134} x2={x} y2={184} stroke={RULE2} strokeWidth={1} />
      ))}
      {strands.map((s) => (
        <path key={s.i} d={s.d} fill="none" stroke={s.i === 0 ? INK : SIGNAL} strokeWidth={1.5} />
      ))}
      <path d={head.right(756, 118)} fill="none" stroke={SIGNAL} strokeWidth={1.75} />
      {strands.map((s) => (
        <circle key={`d${s.i}`} cx={s.x0} cy={s.y0} r={4.5} fill={s.i === 0 ? INK : PAPER} stroke={s.i === 0 ? INK : SIGNAL} strokeWidth={1.5} />
      ))}
      <Key x={64} y={160} fill={INK} size={10}>
        FIRST TRANSACTION
      </Key>
      <Key x={740} y={80} anchor="end" fill={SIGNAL} size={11}>
        LONG TERM PARTNERSHIP
      </Key>

      <rect x={60} y={184} width={338} height={36} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.5} />
      <rect x={402} y={184} width={338} height={36} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.5} />
      <Key x={229} y={207} anchor="middle" fill={COUNTER} size={11}>
        TRUST
      </Key>
      <Key x={571} y={207} anchor="middle" fill={COUNTER} size={11}>
        MUTUAL BENEFIT
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   12 · BARS UNDER A BRACKET — one transaction, or lifetime value
   ========================================================================== */

export function LifetimeBracket() {
  const hs = [60, 52, 70, 64, 78, 72, 86, 80, 92, 88, 98, 104];
  const base = 190;
  return (
    <Frame height={230} label="A row of purchases over time. One bar alone is a single transaction; a bracket over all of them is customer lifetime value.">
      <Schematic />
      <line x1={80} y1={56} x2={726} y2={56} stroke={SIGNAL} strokeWidth={1.5} />
      <line x1={80} y1={56} x2={80} y2={66} stroke={SIGNAL} strokeWidth={1.5} />
      <line x1={726} y1={56} x2={726} y2={66} stroke={SIGNAL} strokeWidth={1.5} />
      <Key x={403} y={44} anchor="middle" fill={SIGNAL} size={11}>
        CUSTOMER LIFETIME VALUE
      </Key>
      {hs.map((h, i) => (
        <rect
          key={i}
          x={80 + i * 56}
          y={base - h}
          width={30}
          height={h}
          fill={i === 0 ? PAPER : SIGNAL_TINT}
          stroke={i === 0 ? INK : SIGNAL}
          strokeWidth={1.5}
        />
      ))}
      <Key x={80} y={112} fill={INK} size={10}>
        SINGLE TRANSACTION
      </Key>
      <line x1={60} y1={base} x2={756} y2={base} stroke={INK3} strokeWidth={1.25} />
      <path d={head.right(758, base)} fill="none" stroke={INK3} strokeWidth={1.25} />
      <Key x={756} y={212} anchor="end" fill={INK3} size={10}>
        TIME
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   13 · MERGING CIRCLES — from seller to strategic partner (400 wide)
   ========================================================================== */

export function StrategicPartners() {
  return (
    <Frame width={400} height={234} label="Top: a seller and a customer kept apart, joined by a single arrow. Bottom: the two circles overlap as strategic partners.">
      <circle cx={110} cy={50} r={24} fill={PAPER} stroke={INK3} strokeWidth={1.5} />
      <circle cx={290} cy={50} r={24} fill={PAPER} stroke={INK3} strokeWidth={1.5} />
      <line x1={136} y1={50} x2={262} y2={50} stroke={INK3} strokeWidth={1.25} />
      <path d={head.right(264, 50)} fill="none" stroke={INK3} strokeWidth={1.25} />
      <Key x={110} y={92} anchor="middle" fill={INK3} size={10}>
        SELLER
      </Key>
      <Key x={290} y={92} anchor="middle" fill={INK3} size={10}>
        CUSTOMER
      </Key>
      <line x1={200} y1={98} x2={200} y2={114} stroke={INK3} strokeWidth={1.25} />
      <path d={head.down(200, 116)} fill="none" stroke={INK3} strokeWidth={1.25} />
      <circle cx={172} cy={162} r={40} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
      <circle cx={228} cy={162} r={40} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.5} />
      <Key x={200} y={224} anchor="middle" fill={SIGNAL} size={10.5}>
        STRATEGIC PARTNERS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   14 · LENS — deep understanding of the customer's business (400 wide)
   ========================================================================== */

export function DeepUnderstanding() {
  const lx = 236;
  const ly = 140;
  const dots: [number, number][] = [];
  for (let x = 120; x <= 290; x += 17)
    for (let y = 108; y <= 172; y += 16) if (Math.hypot(x - lx, y - ly) > 40) dots.push([x, y]);
  return (
    <Frame width={400} height={220} label="An industry box containing the customer's business, with a magnifying lens looking closely into it.">
      <rect x={24} y={20} width={352} height={186} fill="none" stroke={INK3} strokeWidth={1.25} />
      <Key x={40} y={42} fill={INK3} size={10}>
        INDUSTRY
      </Key>
      <rect x={96} y={64} width={208} height={120} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.5} />
      <Key x={112} y={86} fill={COUNTER} size={10}>
        CUSTOMER&apos;S BUSINESS
      </Key>
      {dots.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={1.8} fill={COUNTER} opacity={0.5} />
      ))}
      <line x1={259} y1={163} x2={292} y2={196} stroke={SIGNAL} strokeWidth={5} strokeLinecap="round" />
      <circle cx={lx} cy={ly} r={32} fill={PAPER} stroke={SIGNAL} strokeWidth={2.5} />
      {[
        [222, 16],
        [234, 26],
        [246, 12],
      ].map(([x, h]) => (
        <rect key={x} x={x - 4} y={154 - h} width={8} height={h} fill={SIGNAL} />
      ))}
    </Frame>
  );
}

/* ==========================================================================
   15 · CORE PROCESS — the Key Account Management process
   ========================================================================== */

export function KamCore() {
  const cx = 400;
  const cy = 165;
  const rx = 250;
  const ry = 118;
  const stages = [
    { t: -90, name: "DEDICATED TEAM" },
    { t: 0, name: "CUSTOMIZED SOLUTIONS" },
    { t: 90, name: "EXCEPTIONAL SERVICE" },
    { t: 180, name: "LONG TERM RELATIONSHIP" },
  ];
  const pw = 196;
  const ph = 32;
  return (
    <Frame height={316} label="The Key Account Management process as a loop around a core of the most valuable customers: dedicated team, customized solutions, exceptional service, and long term relationship, repeating.">
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke={INK3} strokeWidth={1.5} />
      {[-45, 45, 135, 225].map((deg) => {
        const t = (deg * Math.PI) / 180;
        const x = cx + rx * Math.cos(t);
        const y = cy + ry * Math.sin(t);
        return <path key={deg} d={headAlong(x, y, -rx * Math.sin(t), ry * Math.cos(t), 10)} fill="none" stroke={INK3} strokeWidth={1.75} />;
      })}
      {[
        [cx, cy - 60, cx, cy - ry + ph / 2],
        [cx + 60, cy, cx + rx - pw / 2, cy],
        [cx, cy + 60, cx, cy + ry - ph / 2],
        [cx - 60, cy, cx - rx + pw / 2, cy],
      ].map(([x1, y1, x2, y2]) => (
        <line key={`${x1}-${y1}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={SIGNAL} strokeWidth={1} strokeDasharray="3 4" />
      ))}
      <circle cx={cx} cy={cy} r={60} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.75} />
      {["MOST", "VALUABLE", "CUSTOMERS"].map((w, i) => (
        <Key key={w} x={cx} y={cy - 10 + i * 16} anchor="middle" fill={SIGNAL} size={10}>
          {w}
        </Key>
      ))}
      {stages.map((s) => {
        const t = (s.t * Math.PI) / 180;
        const x = cx + rx * Math.cos(t);
        const y = cy + ry * Math.sin(t);
        return (
          <g key={s.name}>
            <rect x={x - pw / 2} y={y - ph / 2} width={pw} height={ph} rx={16} fill={PAPER} stroke={INK} strokeWidth={1.5} />
            <Key x={x} y={y + 4} anchor="middle" fill={INK} size={10}>
              {s.name}
            </Key>
          </g>
        );
      })}
    </Frame>
  );
}

/* ==========================================================================
   16 · SHARE BARS — key accounts contribute disproportionately (400 wide)
   ========================================================================== */

export function KeyAccountShare() {
  return (
    <Frame width={400} height={196} label="Two bars. Key accounts are a small share of customers but a large share of revenue and profit.">
      <Schematic x={392} />
      <Key x={20} y={40} fill={INK} size={10}>
        CUSTOMERS
      </Key>
      <rect x={20} y={50} width={360} height={26} fill={PAPER} stroke={INK3} strokeWidth={1.25} />
      <rect x={20} y={50} width={50} height={26} fill={SIGNAL} />
      <Key x={20} y={118} fill={INK} size={10}>
        REVENUE AND PROFIT
      </Key>
      <rect x={20} y={128} width={360} height={26} fill={PAPER} stroke={INK3} strokeWidth={1.25} />
      <rect x={20} y={128} width={260} height={26} fill={SIGNAL} />
      <line x1={70} y1={76} x2={280} y2={128} stroke={SIGNAL} strokeWidth={1.25} strokeDasharray="3 4" />
      <rect x={20} y={172} width={10} height={10} fill={SIGNAL} />
      <Key x={38} y={181} fill={SIGNAL} size={10}>
        KEY ACCOUNTS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   17 · BENEFIT PLATES — retention, barriers, joint innovation (400 wide)
   ========================================================================== */

export function RetentionLoop() {
  const cx = 200;
  const cy = 85;
  const at = (deg: number) => {
    const t = (deg * Math.PI) / 180;
    return [cx + 150 * Math.cos(t), cy + 55 * Math.sin(t)] as const;
  };
  const stops = [200, 245, 290, 335, 20];
  const [ax, ay] = at(40);
  const t40 = (40 * Math.PI) / 180;
  return (
    <Frame width={400} height={160} label="A customer returning around a loop again and again, labelled retention and loyalty.">
      <ellipse cx={cx} cy={cy} rx={150} ry={55} fill="none" stroke={INK3} strokeWidth={1.25} />
      {stops.map((d, i) => {
        const [x, y] = at(d);
        return <circle key={d} cx={x} cy={y} r={7} fill={SIGNAL} opacity={0.2 + i * 0.2} />;
      })}
      <path d={headAlong(ax, ay, -150 * Math.sin(t40), 55 * Math.cos(t40), 10)} fill="none" stroke={SIGNAL} strokeWidth={1.75} />
      <Key x={cx} y={cy - 2} anchor="middle" fill={COUNTER} size={11}>
        RETENTION
      </Key>
      <Key x={cx} y={cy + 16} anchor="middle" fill={COUNTER} size={11}>
        AND LOYALTY
      </Key>
    </Frame>
  );
}

export function BarrierWall() {
  return (
    <Frame width={400} height={160} label="A seller and customer overlapping as a strong relationship, protected by a wall that stops competitors' arrows.">
      <circle cx={80} cy={80} r={26} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
      <circle cx={118} cy={80} r={26} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.5} />
      <Key x={100} y={146} anchor="middle" fill={SIGNAL} size={9.5}>
        STRONG RELATIONSHIP
      </Key>
      <Key x={219} y={20} anchor="middle" fill={INK} size={9.5}>
        BARRIER
      </Key>
      <rect x={212} y={28} width={14} height={104} fill={INK} />
      {[50, 80, 110].map((y) => (
        <g key={y}>
          <line x1={372} y1={y} x2={236} y2={y} stroke={INK3} strokeWidth={1.25} />
          <path d={head.left(234, y)} fill="none" stroke={INK3} strokeWidth={1.25} />
        </g>
      ))}
      <Key x={304} y={146} anchor="middle" fill={INK3} size={9.5}>
        COMPETITORS
      </Key>
    </Frame>
  );
}

export function JointInnovation() {
  return (
    <Frame width={400} height={160} label="Two overlapping circles with a spark where they meet, labelled joint innovation, beside a cost line stepping down, labelled cost reductions.">
      <circle cx={80} cy={78} r={36} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
      <circle cx={126} cy={78} r={36} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.5} />
      <circle cx={103} cy={78} r={3} fill={INK} />
      {Array.from({ length: 8 }, (_, i) => {
        const t = (i * 45 * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={103 + 6 * Math.cos(t)}
            y1={78 + 6 * Math.sin(t)}
            x2={103 + 12 * Math.cos(t)}
            y2={78 + 12 * Math.sin(t)}
            stroke={INK}
            strokeWidth={1.5}
          />
        );
      })}
      <Key x={103} y={142} anchor="middle" fill={SIGNAL} size={9.5}>
        JOINT INNOVATION
      </Key>
      <path d="M220 40 H260 V70 H300 V100 H340 V116" fill="none" stroke={COUNTER} strokeWidth={1.75} strokeLinejoin="round" />
      <path d={head.down(340, 122)} fill="none" stroke={COUNTER} strokeWidth={1.75} />
      <Key x={290} y={142} anchor="middle" fill={COUNTER} size={9.5}>
        COST REDUCTIONS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   18 · PILLARS — resting on one key account
   ========================================================================== */

export function DependenceRisk() {
  return (
    <Frame height={250} label="Left: a supplier platform tilting on a single cracked column, one key account. Right: the same platform over dashed, undecided columns with a question of how to mitigate these risks.">
      <line x1={80} y1={210} x2={320} y2={210} stroke={RULE} strokeWidth={1} />
      <rect x={180} y={98} width={40} height={112} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
      <path d="M180 140 L192 146 L186 154 L200 160 L194 168 L220 176" fill="none" stroke={INK} strokeWidth={1.25} />
      <g transform="rotate(-5 200 83)">
        <rect x={100} y={70} width={200} height={26} fill={PAPER} stroke={INK} strokeWidth={1.5} />
        <Key x={200} y={88} anchor="middle" fill={INK} size={10}>
          SUPPLIER
        </Key>
      </g>
      <Key x={200} y={234} anchor="middle" fill={SIGNAL} size={10.5}>
        SINGLE KEY ACCOUNT
      </Key>

      <line x1={400} y1={40} x2={400} y2={230} stroke={RULE} strokeWidth={1} />

      <line x1={480} y1={210} x2={720} y2={210} stroke={RULE} strokeWidth={1} />
      {[520, 560, 600, 640, 680].map((x) => (
        <rect key={x} x={x - 11} y={98} width={22} height={112} fill="none" stroke={INK3} strokeWidth={1.25} strokeDasharray="4 4" />
      ))}
      <rect x={500} y={70} width={200} height={26} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <Key x={600} y={88} anchor="middle" fill={INK} size={10}>
        SUPPLIER
      </Key>
      <circle cx={600} cy={156} r={20} fill={PAPER} stroke={COUNTER} strokeWidth={1.5} />
      <Display x={600} y={166} anchor="middle" fill={COUNTER} size={26}>
        ?
      </Display>
      <Key x={600} y={234} anchor="middle" fill={COUNTER} size={10}>
        HOW TO MITIGATE THESE RISKS?
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   Conclusion glyphs — each echoes a plate already seen
   ========================================================================== */

const glyphProps = {
  width: 64,
  height: 40,
  viewBox: "0 0 64 40",
  fill: "none",
  "aria-hidden": true,
} as const;

export function GlyphSplitLane() {
  return (
    <svg {...glyphProps}>
      <line x1="4" y1="12" x2="60" y2="12" stroke="var(--counter)" strokeWidth="1.5" />
      <line x1="4" y1="20" x2="60" y2="20" stroke="var(--rule)" strokeWidth="1" strokeDasharray="2 3" />
      <path d="M4 30 L14 24 L22 34 L32 22 L42 34 L50 26 L60 30" stroke="var(--signal)" strokeWidth="1.5" />
    </svg>
  );
}

export function GlyphRadiate() {
  const pts = [180, 135, 90, 45, 0].map((d) => {
    const t = (d * Math.PI) / 180;
    return [+(32 + 24 * Math.cos(t)).toFixed(2), +(34 - 26 * Math.sin(t)).toFixed(2)];
  });
  return (
    <svg {...glyphProps}>
      {pts.map(([x, y], i) => (
        <g key={i}>
          <line x1="32" y1="34" x2={x} y2={y} stroke="var(--ink-3)" strokeWidth="1.25" />
          <circle cx={x} cy={y} r="3.5" fill="var(--paper)" stroke="var(--signal)" strokeWidth="1.5" />
        </g>
      ))}
      <circle cx="32" cy="34" r="5" fill="var(--ink)" />
    </svg>
  );
}

export function GlyphCore() {
  return (
    <svg {...glyphProps}>
      <ellipse cx="32" cy="20" rx="26" ry="15" stroke="var(--ink-3)" strokeWidth="1.25" />
      <circle cx="32" cy="20" r="6" fill="rgba(178, 58, 21, 0.09)" stroke="var(--signal)" strokeWidth="1.5" />
      {[
        [32, 5],
        [58, 20],
        [32, 35],
        [6, 20],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.25" />
      ))}
    </svg>
  );
}
