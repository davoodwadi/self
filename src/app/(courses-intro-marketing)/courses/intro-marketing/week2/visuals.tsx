/* ==========================================================================
   Week 02 — figures
   --------------------------------------------------------------------------
   Hand-drawn SVG plates for The Marketing Environment and Ethics. Each idea
   gets its own grammar: nested rings, a supply chain between two bands, a
   hub and spokes, a corridor, a threshold, strata, a branching stem, a
   canopy, a two-way exchange, a weave, a gap, a price tag, a checklist, a
   time curve, cut-short lifespans and a widening band.

   Conventions are Week 01's, and the type primitives are imported from it:
     · viewBox width 800 for full-width plates, 400 for plates that sit in a
       column (their keys are sized up so they read at the same scale)
     · INK carries the neutral case, SIGNAL the operative one, COUNTER the
       contrast or the outward-looking state
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
  head1,
  headAlong1,
  INK,
  INK2,
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
import { Cpu } from "@phosphor-icons/react";
import { Factory1, Gift1, Pack1, Person1, Store2 } from "../_visuals/objects";

const INK_TINT = "rgba(23, 22, 15, 0.06)";

const f2 = (n: number) => +n.toFixed(2);

/* ==========================================================================
   1 · NESTED RINGS — the environment around marketing
   ========================================================================== */

export function EnvironmentRings() {
  const cx = 200;
  const cy = 160;
  const micro = { rx: 136, ry: 100 };
  const macro = { rx: 188, ry: 150 };

  const onEllipse = (e: { rx: number; ry: number }, deg: number) => {
    const t = (deg * Math.PI) / 180;
    return { x: cx + e.rx * Math.cos(t), y: cy + e.ry * Math.sin(t) };
  };
  const inward = (deg: number) => {
    const a = onEllipse(macro, deg);
    const b = onEllipse(micro, deg);
    const x0 = a.x + (b.x - a.x) * 0.2;
    const y0 = a.y + (b.y - a.y) * 0.2;
    const x1 = a.x + (b.x - a.x) * 0.8;
    const y1 = a.y + (b.y - a.y) * 0.8;
    return (
      <g key={deg}>
        <line x1={f2(x0)} y1={f2(y0)} x2={f2(x1)} y2={f2(y1)} stroke={COUNTER} strokeWidth={1.5} />
        <path d={headAlong1(x1, y1, x1 - x0, y1 - y0, 7)} fill="none" stroke={COUNTER} strokeWidth={1.5} />
      </g>
    );
  };
  const box = { w: 100, h: 44 };
  const left = cx - 18 - box.w;
  const right = cx + 18;

  return (
    <Frame
      width={400}
      height={320}
      label="Two rings around marketing. The inner ring is the microenvironment, the outer ring the macroenvironment. At the centre, marketing management is joined to target customers by a relationship, and arrows from the outer ring press in on the inner one."
    >
      <ellipse cx={cx} cy={cy} rx={macro.rx} ry={macro.ry} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.25} />
      <ellipse cx={cx} cy={cy} rx={micro.rx} ry={micro.ry} fill={PAPER} stroke={INK} strokeWidth={1.25} />

      <Key x={cx} y={cy - macro.ry + 30} anchor="middle" fill={COUNTER} size={11.5}>
        MACROENVIRONMENT
      </Key>
      <Key x={cx} y={cy - micro.ry + 30} anchor="middle" fill={INK} size={11.5}>
        MICROENVIRONMENT
      </Key>

      {[28, 152, 208, 332].map(inward)}

      {/* the relationship at the centre */}
      <rect x={left} y={cy - box.h / 2} width={box.w} height={box.h} fill={SIGNAL} />
      <Key x={left + box.w / 2} y={cy - 3} anchor="middle" fill={PAPER} size={9.5}>
        MARKETING
      </Key>
      <Key x={left + box.w / 2} y={cy + 11} anchor="middle" fill={PAPER} size={9.5}>
        MANAGEMENT
      </Key>
      <rect x={right} y={cy - box.h / 2} width={box.w} height={box.h} fill={PAPER} stroke={SIGNAL} strokeWidth={1.5} />
      <Key x={right + box.w / 2} y={cy - 3} anchor="middle" fill={SIGNAL} size={9.5}>
        TARGET
      </Key>
      <Key x={right + box.w / 2} y={cy + 11} anchor="middle" fill={SIGNAL} size={9.5}>
        CUSTOMERS
      </Key>
      <line x1={cx - 16} y1={cy - 4} x2={cx + 16} y2={cy - 4} stroke={SIGNAL} strokeWidth={1.5} />
      <line x1={cx - 16} y1={cy + 4} x2={cx + 16} y2={cy + 4} stroke={SIGNAL} strokeWidth={1.5} />
      <Key x={cx} y={cy + 46} anchor="middle" fill={SIGNAL} size={9.5}>
        RELATIONSHIPS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   2 · CHAIN BETWEEN BANDS — the six actors of the microenvironment
   ========================================================================== */

/** A company as a building: a roof slab over a block of department windows. */
function Company({
  cx,
  base,
  w,
  h,
  tone,
  lit = false,
}: {
  cx: number;
  base: number;
  w: number;
  h: number;
  tone: string;
  lit?: boolean;
}) {
  const left = cx - w / 2;
  const pad = w * 0.08;
  const gap = w * 0.05;
  const ww = (w - 2 * pad - gap) / 2;
  const wh = (h - 2 * pad - gap) / 2;
  return (
    <g>
      <rect x={f2(left - 5)} y={f2(base - h - 8)} width={f2(w + 10)} height={8} fill={tone} />
      <rect x={f2(left)} y={f2(base - h)} width={w} height={h} fill={PAPER} stroke={tone} strokeWidth={1.5} />
      {[0, 1].map((r) =>
        [0, 1].map((c) => {
          const on = lit && r === 0 && c === 0;
          return (
            <rect
              key={`${r}${c}`}
              x={f2(left + pad + c * (ww + gap))}
              y={f2(base - h + pad + r * (wh + gap))}
              width={f2(ww)}
              height={f2(wh)}
              fill={on ? SIGNAL : "var(--paper-3)"}
              stroke={on ? SIGNAL : tone}
              strokeWidth={1}
            />
          );
        }),
      )}
    </g>
  );
}

export function MicroActors() {
  const base = 232;
  const flow = 196;
  const co = { cx: 350, w: 190, h: 100 };
  const chain: [number, number][] = [
    [138, co.cx - co.w / 2 - 8],
    [co.cx + co.w / 2 + 8, 500],
    [620, 664],
  ];

  return (
    <Frame
      height={380}
      label="The microenvironment. A supplier's factory, the company itself, a store that resells its goods and a group of customers form a chain from left to right. Inside the company building, the marketing window is lit among the other departments. Rival company buildings stand in a band along the top, and groups of people, the publics, in a band along the bottom."
    >
      {/* competitors: rival companies, drawn like the company itself */}
      <rect x={16} y={14} width={768} height={82} fill={INK_TINT} />
      <Key x={32} y={60} fill={INK} size={11.5}>
        COMPETITORS
      </Key>
      {[330, 450, 570].map((x) => (
        <Company key={x} cx={x} base={84} w={62} h={40} tone={INK3} />
      ))}

      {/* the chain */}
      <Factory1 x={90} y={base} w={84} h={52} stroke={COUNTER} />
      <Company cx={co.cx} base={base} w={co.w} h={co.h} tone={INK} lit />
      <Key x={f2(co.cx - co.w / 2 + co.w * 0.08 + (co.w * 0.79) / 4)} y={base - co.h + 34} anchor="middle" fill={PAPER} size={9.5}>
        MARKETING
      </Key>
      <Store2 x={560} y={base} k={1.6} tone={COUNTER} />
      {[680, 712, 744].map((x) => (
        <Person1 key={x} x={x} y={base} s={1.4} tone={COUNTER} />
      ))}
      {chain.map(([a, b]) => (
        <g key={a}>
          <line x1={a} y1={flow} x2={b - 2} y2={flow} stroke={INK} strokeWidth={1.5} />
          <path d={head1.right(b, flow)} fill="none" stroke={INK} strokeWidth={1.5} />
        </g>
      ))}

      <Key x={co.cx} y={110} anchor="middle" fill={INK} size={11}>
        THE COMPANY ITSELF
      </Key>
      <Key x={90} y={258} anchor="middle" fill={COUNTER} size={11}>
        SUPPLIERS
      </Key>
      <Key x={560} y={258} anchor="middle" fill={COUNTER} size={11}>
        MARKETING
      </Key>
      <Key x={560} y={274} anchor="middle" fill={COUNTER} size={11}>
        INTERMEDIARIES
      </Key>
      <Key x={712} y={258} anchor="middle" fill={COUNTER} size={11}>
        CUSTOMER
      </Key>
      <Key x={712} y={274} anchor="middle" fill={COUNTER} size={11}>
        MARKETS
      </Key>

      {/* publics: groups of people with a stake in the company */}
      <rect x={16} y={290} width={768} height={76} fill={INK_TINT} />
      <Key x={32} y={334} fill={INK} size={11.5}>
        PUBLICS
      </Key>
      {[300, 450, 600].map((g) =>
        [-22, 0, 22].map((d) => (
          <Person1 key={g + d} x={g + d} y={354} s={1.1} tone={INK3} />
        )),
      )}
    </Frame>
  );
}

/* ==========================================================================
   3 · HUB AND SPOKES — the PESTLE framework
   ========================================================================== */

export const PESTLE = [
  { letter: "P", name: "POLITICAL" },
  { letter: "E", name: "ECONOMIC" },
  { letter: "S", name: "SOCIAL" },
  { letter: "T", name: "TECHNOLOGICAL" },
  { letter: "L", name: "LEGAL" },
  { letter: "E", name: "ENVIRONMENTAL" },
];

export function PestleHub() {
  const cx = 400;
  const cy = 214;
  const hub = 74;
  const rx = 262;
  const ry = 150;
  const node = 30;
  const angles = [-150, -90, -30, 30, 90, 150];

  return (
    <Frame
      height={436}
      label="The PESTLE framework as a hub and spokes. Six forces, political, economic, social, technological, legal and environmental, sit on the ring of the macroenvironment, and each points in at the microenvironment at the centre."
    >
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke={COUNTER} strokeWidth={1} strokeDasharray="3 5" />

      {PESTLE.map((p, i) => {
        const t = (angles[i] * Math.PI) / 180;
        const nx = cx + rx * Math.cos(t);
        const ny = cy + ry * Math.sin(t);
        const dx = cx - nx;
        const dy = cy - ny;
        const len = Math.hypot(dx, dy);
        const ux = dx / len;
        const uy = dy / len;
        // hub edge along the spoke, allowing for the hub circle
        const x0 = nx + ux * (node + 6);
        const y0 = ny + uy * (node + 6);
        const x1 = cx - ux * (hub + 6);
        const y1 = cy - uy * (hub + 6);
        const side = Math.abs(Math.cos(t)) > 0.3;
        const lx = side ? nx + Math.sign(Math.cos(t)) * (node + 14) : nx;
        const ly = side ? ny + 5 : ny + Math.sign(Math.sin(t)) * (node + 22) + (Math.sin(t) > 0 ? 6 : 0);
        const anchor = side ? (Math.cos(t) > 0 ? "start" : "end") : "middle";
        return (
          <g key={i}>
            <line x1={f2(x0)} y1={f2(y0)} x2={f2(x1)} y2={f2(y1)} stroke={COUNTER} strokeWidth={1.5} />
            <path d={headAlong1(x1, y1, dx, dy, 8)} fill="none" stroke={COUNTER} strokeWidth={1.5} />
            <circle cx={f2(nx)} cy={f2(ny)} r={node} fill={PAPER} stroke={COUNTER} strokeWidth={1.5} />
            <Display x={f2(nx)} y={f2(ny + 11)} anchor="middle" size={32} fill={SIGNAL}>
              {p.letter}
            </Display>
            <Key x={f2(lx)} y={f2(ly)} anchor={anchor} fill={INK} size={11}>
              {p.name}
            </Key>
          </g>
        );
      })}

      <circle cx={cx} cy={cy} r={hub} fill={PAPER2} stroke={INK} strokeWidth={1.5} />
      <Key x={cx} y={cy - 2} anchor="middle" fill={INK} size={9.5}>
        MICRO-
      </Key>
      <Key x={cx} y={cy + 13} anchor="middle" fill={INK} size={9.5}>
        ENVIRONMENT
      </Key>

      <Key x={16} y={26} fill={COUNTER} size={11}>
        THE MACROENVIRONMENT
      </Key>
      <Note x={16} y={45} size={13} fill={INK2}>
        larger societal forces
      </Note>
    </Frame>
  );
}

/* ==========================================================================
   4 · CORRIDOR — political forces influence or limit how a business operates
   Column plate, viewBox 400.
   ========================================================================== */

export function PoliticalCorridor() {
  const top = 92;
  const bottom = 188;
  const mid = 140;
  const gate = 196;

  return (
    <Frame
      width={400}
      height={236}
      label="A company building sits at the start of a path that runs along a corridor. The walls are laws. A narrow gate is a government agency. A group of people above the wall, the pressure groups, push down on the path and bend it. Together they influence or limit how a business can operate."
    >
      {/* laws: the walls */}
      <line x1={20} y1={top} x2={380} y2={top} stroke={INK} strokeWidth={2.5} />
      <line x1={20} y1={bottom} x2={380} y2={bottom} stroke={INK} strokeWidth={2.5} />
      <Key x={20} y={top - 12} fill={INK} size={12}>
        LAWS
      </Key>

      {/* government agencies: the gate */}
      <line x1={gate} y1={top} x2={gate} y2={mid - 16} stroke={INK} strokeWidth={4} />
      <line x1={gate} y1={mid + 16} x2={gate} y2={bottom} stroke={INK} strokeWidth={4} />
      <Key x={gate} y={bottom + 24} anchor="middle" fill={INK} size={12}>
        GOVERNMENT AGENCIES
      </Key>

      {/* pressure groups: people above the wall, pushing down on the path */}
      {[284, 306, 328].map((x) => (
        <g key={x}>
          <Person1 x={x} y={top - 6} s={0.9} tone={SIGNAL} />
          <line x1={x} y1={top + 6} x2={x} y2={top + 30} stroke={SIGNAL} strokeWidth={2} />
          <path d={head1.down(x, top + 32)} fill="none" stroke={SIGNAL} strokeWidth={2} />
        </g>
      ))}
      <Key x={306} y={top - 46} anchor="middle" fill={SIGNAL} size={12}>
        PRESSURE GROUPS
      </Key>

      {/* the business and the path it can take */}
      <Company cx={54} base={mid + 18} w={44} h={32} tone={INK} />
      <path
        d={`M82 ${mid} L${gate + 40} ${mid} C${gate + 76} ${mid} ${gate + 86} ${mid + 30} ${gate + 120} ${mid + 30} L370 ${mid + 30}`}
        fill="none"
        stroke={SIGNAL}
        strokeWidth={2.5}
      />
      <path d={head1.right(378, mid + 30)} fill="none" stroke={SIGNAL} strokeWidth={2.5} />
    </Frame>
  );
}

/* ==========================================================================
   5 · THRESHOLD — economic forces decide whether consumers can afford it
   Column plate, viewBox 400.
   ========================================================================== */

export function EconomicThreshold() {
  const x0 = 20;
  const price = 262;
  const full = 350;
  const eroded = 196;
  const r1 = 80;
  const r2 = 162;
  const h = 26;

  return (
    <Frame
      width={400}
      height={236}
      label="Schematic. A bar of purchasing power reaches past the product's price. Below it, inflation and interest rates eat into the same bar, and what is left no longer reaches the price."
    >
      <Schematic x={392} y={228} />

      {/* the price line */}
      <line x1={price} y1={42} x2={price} y2={r2 + h + 6} stroke={INK} strokeWidth={1.5} strokeDasharray="5 4" />
      <Key x={price} y={32} anchor="middle" fill={INK} size={12}>
        {"THE PRODUCT'S PRICE"}
      </Key>

      {/* before */}
      <Key x={x0} y={r1 - 10} fill={COUNTER} size={11}>
        PURCHASING POWER
      </Key>
      <rect x={x0} y={r1} width={full - x0} height={h} fill={COUNTER} />

      {/* after */}
      <rect x={x0} y={r2} width={eroded - x0} height={h} fill={COUNTER} />
      <rect
        x={eroded + 0.75}
        y={r2 + 0.75}
        width={full - eroded - 1.5}
        height={h - 1.5}
        fill={SIGNAL_TINT}
        stroke={SIGNAL}
        strokeWidth={1.25}
        strokeDasharray="4 3"
      />
      <Key x={x0} y={r2 - 10} fill={COUNTER} size={11}>
        PURCHASING POWER
      </Key>
      <Key x={(eroded + full) / 2 + 8} y={r2 + h + 24} anchor="middle" fill={SIGNAL} size={11}>
        INFLATION · INTEREST RATES
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   6 · STRATA — social forces reach down to basic values
   Column plate, viewBox 400.
   ========================================================================== */

export function SocialStrata() {
  const x = 150;
  const w = 232;
  const y0 = 34;
  const lh = 42;
  const layers = [
    { k: "BEHAVIORS", fill: "rgba(34, 87, 91, 0.10)" },
    { k: "PREFERENCES", fill: "rgba(34, 87, 91, 0.18)" },
    { k: "PERCEPTIONS", fill: "rgba(34, 87, 91, 0.28)" },
    { k: "BASIC VALUES", fill: COUNTER },
  ];
  const bottom = y0 + layers.length * lh;

  return (
    <Frame
      width={400}
      height={236}
      label="A society drawn as four layers, from behaviors on top through preferences and perceptions down to basic values. Arrows from institutions and other forces reach into every layer."
    >
      {layers.map((l, i) => (
        <g key={l.k}>
          <rect x={x} y={y0 + i * lh} width={w} height={lh - 3} fill={l.fill} />
          <Key x={x + 16} y={y0 + i * lh + 25} fill={i === 3 ? PAPER : COUNTER} size={11.5}>
            {l.k}
          </Key>
        </g>
      ))}

      {/* institutions and other forces */}
      <g>
        <path d="M26 88 L66 70 L106 88 Z" fill="none" stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
        {[36, 54, 72, 90].map((cx) => (
          <line key={cx} x1={cx + 3} y1={94} x2={cx + 3} y2={120} stroke={INK} strokeWidth={2} />
        ))}
        <line x1={26} y1={126} x2={106} y2={126} stroke={INK} strokeWidth={2} />
      </g>
      {layers.map((_, i) => {
        const ty = y0 + i * lh + 19;
        return (
          <g key={i}>
            <path d={`M112 108 C128 108 128 ${ty} ${x - 8} ${ty}`} fill="none" stroke={INK} strokeWidth={1.25} />
            <path d={head1.right(x - 4, ty)} fill="none" stroke={INK} strokeWidth={1.25} />
          </g>
        );
      })}
      <Key x={20} y={152} fill={INK} size={10.5}>
        INSTITUTIONS
      </Key>
      <Key x={20} y={168} fill={INK} size={10.5}>
        AND OTHER
      </Key>
      <Key x={20} y={184} fill={INK} size={10.5}>
        FORCES
      </Key>
      <line x1={x} y1={bottom + 10} x2={x + w} y2={bottom + 10} stroke={RULE2} strokeWidth={1} />
    </Frame>
  );
}

/* ==========================================================================
   7 · BRANCHING STEM — technology opens products and markets
   Column plate, viewBox 400.
   ========================================================================== */

export function TechnologyBranches() {
  const root = { x: 54, y: 123 };
  const fork = { x: 140, y: 123 };
  const ends = [
    { y: 58, kind: "product", lines: ["NEW PRODUCT", "OPPORTUNITIES"] },
    { y: 188, kind: "market", lines: ["NEW MARKET", "OPPORTUNITIES"] },
  ] as const;
  const icon = 46;

  return (
    <Frame
      width={400}
      height={250}
      label="A microchip, new technologies, grows a stem that forks in two. One branch buds into three new product packs, new product opportunities. The other buds into three new pairs of people, new market opportunities."
    >
      <Cpu x={root.x - icon / 2} y={root.y - icon / 2} size={icon} weight="duotone" color={SIGNAL} />
      <Key x={16} y={root.y + 44} fill={SIGNAL} size={11.5}>
        NEW
      </Key>
      <Key x={16} y={root.y + 60} fill={SIGNAL} size={11.5}>
        TECHNOLOGIES
      </Key>
      <line x1={root.x + icon / 2 + 2} y1={root.y} x2={fork.x} y2={fork.y} stroke={SIGNAL} strokeWidth={2.5} />

      {ends.map((e) => {
        const tip = { x: 200, y: e.y };
        return (
          <g key={e.kind}>
            <path d={`M${fork.x} ${fork.y} C${fork.x + 40} ${fork.y} ${tip.x - 46} ${tip.y} ${tip.x} ${tip.y}`} fill="none" stroke={COUNTER} strokeWidth={2.5} />
            {[-34, 0, 34].map((d) => (
              <g key={d}>
                <path d={`M${tip.x} ${tip.y} C${tip.x + 14} ${tip.y} ${tip.x + 16} ${tip.y + d} ${tip.x + 30} ${tip.y + d}`} fill="none" stroke={COUNTER} strokeWidth={1.25} />
                {e.kind === "product" ? (
                  <Pack1 x={tip.x + 43} y={tip.y + d + 9} w={20} h={18} tone={COUNTER} />
                ) : (
                  <>
                    <Person1 x={tip.x + 40} y={tip.y + d + 11} s={0.72} tone={COUNTER} />
                    <Person1 x={tip.x + 55} y={tip.y + d + 11} s={0.72} tone={COUNTER} />
                  </>
                )}
              </g>
            ))}
            {e.lines.map((l, j) => (
              <Key key={l} x={tip.x + 74} y={tip.y + (j === 0 ? -2 : 14)} fill={COUNTER} size={10.5}>
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
   8 · CANOPY — the three things legislation protects
   Column plate, viewBox 400.
   ========================================================================== */

export function LegislationCanopy() {
  const cols = [70, 200, 330];
  const ground = 170;

  return (
    <Frame
      width={400}
      height={236}
      label="A canopy of specific legislation shelters three things: companies from each other, consumers, and the interests of society."
    >
      <path d="M16 96 Q200 8 384 96" fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={2} />
      <line x1={16} y1={96} x2={384} y2={96} stroke={SIGNAL} strokeWidth={1} />
      <Key x={200} y={72} anchor="middle" fill={SIGNAL} size={12}>
        SPECIFIC LEGISLATION
      </Key>
      {[120, 280].map((x) => (
        <line key={x} x1={x + 16} y1={98} x2={x + 16} y2={ground} stroke={RULE2} strokeWidth={1} />
      ))}

      {/* companies, from each other */}
      <rect x={cols[0] - 42} y={ground - 46} width={30} height={46} fill={PAPER} stroke={INK} strokeWidth={1.25} />
      <rect x={cols[0] + 12} y={ground - 46} width={30} height={46} fill={PAPER} stroke={INK} strokeWidth={1.25} />
      <line x1={cols[0]} y1={ground - 58} x2={cols[0]} y2={ground} stroke={SIGNAL} strokeWidth={3} />

      {/* consumers */}
      {[-24, 0, 24].map((d) => (
        <Person1 key={d} x={cols[1] + d} y={ground} s={d === 0 ? 1.2 : 1} tone={COUNTER} />
      ))}

      {/* society */}
      {[-30, 0, 30].map((d, i) => (
        <path
          key={d}
          d={`M${cols[2] + d - 13} ${ground} L${cols[2] + d - 13} ${ground - 22 - i * 4} L${cols[2] + d} ${ground - 34 - i * 4} L${cols[2] + d + 13} ${ground - 22 - i * 4} L${cols[2] + d + 13} ${ground} Z`}
          fill={PAPER}
          stroke={INK}
          strokeWidth={1.25}
          strokeLinejoin="round"
        />
      ))}

      <line x1={16} y1={ground} x2={384} y2={ground} stroke={INK} strokeWidth={1} />
      <Key x={cols[0]} y={ground + 24} anchor="middle" fill={INK} size={10.5}>
        COMPANIES
      </Key>
      <Key x={cols[0]} y={ground + 40} anchor="middle" fill={INK} size={10.5}>
        FROM EACH OTHER
      </Key>
      <Key x={cols[1]} y={ground + 24} anchor="middle" fill={INK} size={10.5}>
        CONSUMERS
      </Key>
      <Key x={cols[2]} y={ground + 24} anchor="middle" fill={INK} size={10.5}>
        THE INTERESTS
      </Key>
      <Key x={cols[2]} y={ground + 40} anchor="middle" fill={INK} size={10.5}>
        OF SOCIETY
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   9 · TWO-WAY EXCHANGE — resources in, effects out
   Column plate, viewBox 400.
   ========================================================================== */

export function ResourceExchange() {
  const leftC = 72;
  const rightC = 328;

  return (
    <Frame
      width={400}
      height={236}
      label="Natural resources on the left, drawn as land with a tree and water, and marketers on the right, drawn as a company building. An upper arrow carries resources to marketers as inputs. A lower arrow runs back: resources are affected by marketing activities."
    >
      {/* natural resources: land, a tree, water */}
      <path d={`M${leftC - 58} 132 Q${leftC - 20} 78 ${leftC + 12} 104 Q${leftC + 36} 88 ${leftC + 58} 132 Z`} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.5} strokeLinejoin="round" />
      <line x1={leftC - 14} y1={104} x2={leftC - 14} y2={80} stroke={COUNTER} strokeWidth={2} />
      <circle cx={leftC - 14} cy={70} r={14} fill={COUNTER} />
      {[146, 158].map((y) => (
        <path key={y} d={`M${leftC - 54} ${y} q9 -6 18 0 t18 0 t18 0 t18 0 t18 0 t18 0`} fill="none" stroke={COUNTER} strokeWidth={1.5} />
      ))}
      <Key x={leftC} y={196} anchor="middle" fill={COUNTER} size={11}>
        NATURAL
      </Key>
      <Key x={leftC} y={212} anchor="middle" fill={COUNTER} size={11}>
        RESOURCES
      </Key>

      {/* marketers: the company building used across the week */}
      <Company cx={rightC} base={160} w={96} h={70} tone={INK} lit />
      <Key x={rightC} y={196} anchor="middle" fill={INK} size={11}>
        MARKETERS
      </Key>

      {/* needed as inputs */}
      <line x1={leftC + 66} y1={104} x2={rightC - 60} y2={104} stroke={INK} strokeWidth={2} />
      <path d={head1.right(rightC - 58, 104)} fill="none" stroke={INK} strokeWidth={2} />
      <Key x={200} y={92} anchor="middle" fill={INK} size={10}>
        NEEDED AS INPUTS
      </Key>

      {/* affected by */}
      <line x1={leftC + 68} y1={140} x2={rightC - 60} y2={140} stroke={SIGNAL} strokeWidth={2} />
      <path d={head1.left(leftC + 66, 140)} fill="none" stroke={SIGNAL} strokeWidth={2} />
      <Key x={200} y={162} anchor="middle" fill={SIGNAL} size={10}>
        AFFECTED BY
      </Key>
      <Key x={200} y={177} anchor="middle" fill={SIGNAL} size={10}>
        MARKETING ACTIVITIES
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   10 · WEAVE — CSR runs through the business strategy
   ========================================================================== */

export function CsrWeave() {
  const rows = 5;
  const rowH = 20;
  const gap = 12;
  const top = 88;

  const strategy = (x: number, w: number) =>
    Array.from({ length: rows }, (_, r) => (
      <rect key={r} x={x} y={top + r * (rowH + gap)} width={w} height={rowH} fill={INK2} />
    ));

  const right = { x: 452, w: 316 };
  const threads = Array.from({ length: 6 }, (_, i) => right.x + 28 + i * 52);
  const bottom = top + rows * (rowH + gap) - gap;

  return (
    <Frame
      height={296}
      label="Left, struck through as just philanthropy: a block of business strategy with a gift box, philanthropy, set apart beside it. Right, deeply integrated: CSR threads woven over and under every layer of the business strategy."
    >
      {/* ---- left: just philanthropy ---- */}
      <Key x={32} y={38} fill={INK3} size={16}>
        JUST PHILANTHROPY
      </Key>
      <line x1={26} y1={32} x2={244} y2={32} stroke={SIGNAL} strokeWidth={2.5} />
      {strategy(32, 196)}
      <Gift1 x={292} y={top + 2 * (rowH + gap) - 12} w={48} h={40} />
      <Key x={316} y={bottom + 38} anchor="middle" fill={SIGNAL} size={14}>
        PHILANTHROPY
      </Key>
      <Key x={130} y={bottom + 38} anchor="middle" fill={INK3} size={14}>
        BUSINESS STRATEGY
      </Key>

      <line x1={400} y1={20} x2={400} y2={276} stroke={RULE} strokeWidth={1} />

      {/* ---- right: woven in ---- */}
      <Key x={right.x} y={38} fill={SIGNAL} size={16}>
        DEEPLY INTEGRATED
      </Key>
      <Key x={(threads[0] + threads[5]) / 2} y={60} anchor="middle" fill={SIGNAL} size={14}>
        CSR
      </Key>
      <path d={`M${threads[0]} ${top - 12} V${top - 18} H${threads[5]} V${top - 12}`} fill="none" stroke={SIGNAL} strokeWidth={1.25} />
      {threads.map((x) => (
        <line key={`t${x}`} x1={x} y1={top - 8} x2={x} y2={bottom + 12} stroke={SIGNAL} strokeWidth={6} />
      ))}
      {strategy(right.x, right.w)}
      {threads.map((x, i) =>
        Array.from({ length: rows }, (_, r) =>
          (i + r) % 2 === 0 ? (
            <rect key={`o${i}${r}`} x={x - 3} y={top + r * (rowH + gap) - 1} width={6} height={rowH + 2} fill={SIGNAL} stroke={PAPER} strokeWidth={1.5} />
          ) : null,
        ),
      )}
      <Key x={right.x + right.w / 2} y={bottom + 38} anchor="middle" fill={INK3} size={14}>
        BUSINESS STRATEGY
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   11 · GAP — more spent on claiming than on implementing
   ========================================================================== */

export function GreenwashingGap() {
  const x0 = 20;
  const claim = 376;
  const act = 138;
  const h = 40;
  const r1 = 62;
  const r2 = 142;

  return (
    <Frame
      width={400}
      height={262}
      label="Schematic. Two bars of time and money. The bar for claiming to be green is long and hollow. The bar for actually implementing business practices is short and solid. The difference between them is greenwashing."
    >
      <Schematic x={392} y={254} />

      <Key x={x0} y={r1 - 12} fill={COUNTER} size={11}>
        {"CLAIMING TO BE “GREEN”"}
      </Key>
      <rect x={x0 + 1} y={r1 + 1} width={claim - x0 - 2} height={h - 2} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={2} strokeDasharray="7 5" />

      <Key x={x0} y={r2 - 12} fill={INK} size={11}>
        ACTUALLY IMPLEMENTING BUSINESS PRACTICES
      </Key>
      <rect x={x0} y={r2} width={act - x0} height={h} fill={INK} />

      {/* the gap */}
      <line x1={act} y1={r2 + h / 2} x2={claim - 8} y2={r2 + h / 2} stroke={SIGNAL} strokeWidth={1.5} strokeDasharray="3 4" />
      <line x1={claim} y1={r1 + h + 4} x2={claim} y2={r2 + h} stroke={SIGNAL} strokeWidth={1.5} strokeDasharray="3 4" />
      <path d={`M${act + 6} ${r2 + h + 12} L${act + 6} ${r2 + h + 22} L${claim} ${r2 + h + 22} L${claim} ${r2 + h + 12}`} fill="none" stroke={SIGNAL} strokeWidth={2} />
      <Key x={(act + claim) / 2} y={r2 + h + 44} anchor="middle" fill={SIGNAL} size={12.5}>
        GREENWASHING
      </Key>

      {/* axis */}
      <Key x={x0} y={r2 + h + 44} fill={INK3} size={9.5}>
        TIME AND MONEY →
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   12 · TWO FUTURES — absorb the cost, or pass it on
   Drawn as a prompt, not an answer: both branches are shown the same size.
   ========================================================================== */

export function AbsorbOrPass() {
  const base = 262;
  const w = 80;
  const cost = 92;
  const extra = 44;
  const price = 190;
  const cols = [{ x: 60, pass: false }, { x: 262, pass: true }];

  return (
    <Frame
      width={400}
      height={330}
      label="Schematic. In two columns, a block of 100% fair-trade materials adds to the cost. In the first, the brand absorbs the cost and the price line stays where it was. In the second, the brand passes it on to consumers and the price line rises by the same amount."
    >
      <Schematic x={392} y={322} />
      <line x1={20} y1={base} x2={380} y2={base} stroke={INK} strokeWidth={1} />
      <line x1={200} y1={20} x2={200} y2={base} stroke={RULE} strokeWidth={1} />

      {cols.map(({ x, pass }) => {
        const priceY = base - price - (pass ? extra : 0);
        return (
          <g key={x}>
            <rect x={x} y={base - cost} width={w} height={cost} fill={INK2} />
            <Key x={x + w / 2} y={base - cost / 2 + 4} anchor="middle" fill={PAPER} size={10}>
              COST
            </Key>
            <rect x={x + 0.75} y={base - cost - extra + 0.75} width={w - 1.5} height={extra - 1.5} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.25} strokeDasharray="4 3" />
            {pass ? (
              <>
                <line x1={x - 22} y1={base - price} x2={x + w + 22} y2={base - price} stroke={RULE2} strokeWidth={1.25} strokeDasharray="4 4" />
                <line x1={x + w + 12} y1={base - price - 4} x2={x + w + 12} y2={priceY + 8} stroke={COUNTER} strokeWidth={1.5} />
                <path d={head1.up(x + w + 12, priceY + 6)} fill="none" stroke={COUNTER} strokeWidth={1.5} />
              </>
            ) : null}
            <line x1={x - 22} y1={priceY} x2={x + w + 22} y2={priceY} stroke={COUNTER} strokeWidth={3} />
            <Key x={x - 22} y={priceY - 9} fill={COUNTER} size={10.5}>
              PRICE
            </Key>
          </g>
        );
      })}

      {/* the commitment, named on the block it adds */}
      <Key x={cols[0].x + w / 2} y={base - cost - extra - 24} anchor="middle" fill={SIGNAL} size={9.5}>
        100% FAIR-TRADE
      </Key>
      <Key x={cols[0].x + w / 2} y={base - cost - extra - 11} anchor="middle" fill={SIGNAL} size={9.5}>
        MATERIALS
      </Key>

      <Key x={cols[0].x + w / 2} y={base + 26} anchor="middle" fill={INK} size={10.5}>
        ABSORB THE COST
      </Key>
      <Key x={cols[1].x + w / 2} y={base + 26} anchor="middle" fill={INK} size={10.5}>
        PASS IT ON
      </Key>
      <Key x={cols[1].x + w / 2} y={base + 41} anchor="middle" fill={INK} size={10.5}>
        TO CONSUMERS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   13 · PRICE TAG — a reduction from a phony high retail price
   Column plate, viewBox 400.
   ========================================================================== */

export function PhonyPriceTag() {
  return (
    <Frame
      width={400}
      height={250}
      label="Schematic. A price tag stamped factory price. A crossed-out was price sits above a lower now price; a note marks the was price as a phony high retail price."
    >
      <Schematic x={392} y={242} />
      <g transform="rotate(-4 140 130)">
        <path d="M40 60 L200 60 L240 130 L200 200 L40 200 Z" fill={PAPER} stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
        <circle cx={206} cy={130} r={7} fill="none" stroke={INK} strokeWidth={1.5} />
        <rect x={52} y={72} width={118} height={24} fill={SIGNAL} />
        <Key x={111} y={89} anchor="middle" fill={PAPER} size={10}>
          {"“FACTORY” PRICE"}
        </Key>
        <Key x={56} y={122} fill={INK3} size={10}>
          WAS
        </Key>
        <Display x={92} y={126} size={24} fill={INK3}>
          $240
        </Display>
        <line x1={88} y1={117} x2={160} y2={117} stroke={SIGNAL} strokeWidth={2.5} />
        <Key x={56} y={170} fill={INK} size={10}>
          NOW
        </Key>
        <Display x={92} y={180} size={44} fill={SIGNAL}>
          $99
        </Display>
      </g>
      <path d="M162 116 C210 90 244 60 270 60" fill="none" stroke={SIGNAL} strokeWidth={1.25} />
      <circle cx={162} cy={116} r={3} fill={SIGNAL} />
      <Key x={276} y={52} fill={SIGNAL} size={11}>
        A PHONY HIGH
      </Key>
      <Key x={276} y={68} fill={SIGNAL} size={11}>
        RETAIL PRICE
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   14 · CHECKLIST — what is promoted against what the product does
   Column plate, viewBox 400.
   ========================================================================== */

export function MisrepresentedChecklist() {
  const rows = ["FEATURE", "FEATURE", "FEATURE", "PERFORMANCE"];
  const colA = 232;
  const colB = 330;
  const y0 = 78;
  const lh = 38;
  const truth = [true, false, true, false];

  const tick = (x: number, y: number, tone: string) => (
    <path d={`M${x - 9} ${y} L${x - 3} ${y + 7} L${x + 10} ${y - 8}`} fill="none" stroke={tone} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
  );
  const cross = (x: number, y: number) => (
    <path d={`M${x - 8} ${y - 8} L${x + 8} ${y + 8} M${x + 8} ${y - 8} L${x - 8} ${y + 8}`} fill="none" stroke={SIGNAL} strokeWidth={2.5} strokeLinecap="round" />
  );

  return (
    <Frame
      width={400}
      height={250}
      label="A checklist in two columns. The advertised column ticks every feature and the product's performance. The product column ticks only some; the rows it fails are highlighted as misrepresented."
    >
      <Key x={colA} y={50} anchor="middle" fill={INK} size={11}>
        ADVERTISED
      </Key>
      <Key x={colB} y={50} anchor="middle" fill={INK} size={11}>
        THE PRODUCT
      </Key>
      <line x1={20} y1={60} x2={380} y2={60} stroke={INK} strokeWidth={1.25} />

      {rows.map((r, i) => {
        const y = y0 + i * lh;
        const ok = truth[i];
        return (
          <g key={i}>
            {!ok ? <rect x={20} y={y - 16} width={360} height={lh - 6} fill={SIGNAL_TINT} /> : null}
            <Key x={28} y={y + 5} fill={ok ? INK2 : SIGNAL} size={11}>
              {r}
            </Key>
            {tick(colA, y, INK)}
            {ok ? tick(colB, y, INK) : cross(colB, y)}
            <line x1={20} y1={y + lh - 22} x2={380} y2={y + lh - 22} stroke={RULE} strokeWidth={1} />
          </g>
        );
      })}
      <Key x={380} y={238} anchor="end" fill={SIGNAL} size={10.5}>
        MISREPRESENTING
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   15 · TIME CURVE — short-term gains, long-term damage
   ========================================================================== */

export function PressureOverTime() {
  const x0 = 30;
  const x1 = 380;
  const split = 130;
  const axis = 224;

  // gains: a sharp early spike that falls away
  const gains = `M${x0} 196 C52 196 60 62 84 62 C104 62 110 184 ${split + 4} 190 L${x1} 194`;
  // relationships and reputation: steady, then sliding once the pressure lands
  const rel = `M${x0} 76 L95 76 C145 79 205 118 275 136 C315 146 345 150 ${x1} 152`;

  return (
    <Frame
      width={400}
      height={246}
      label="Schematic curves over time. Short-term gains spike early and fall away. Long-term relationships and reputation start steady and slide downward for the rest of the timeline."
    >
      <Schematic x={392} y={18} />
      <rect x={x0} y={28} width={split - x0} height={axis - 36} fill={SIGNAL_TINT} />
      <Key x={(x0 + split) / 2} y={18} anchor="middle" fill={SIGNAL} size={9.5}>
        SHORT TERM
      </Key>
      <Key x={(split + x1) / 2 - 20} y={18} anchor="middle" fill={COUNTER} size={9.5}>
        LONG TERM
      </Key>

      <line x1={x0} y1={axis} x2={x1 - 6} y2={axis} stroke={INK3} strokeWidth={1} />
      <path d={head1.right(x1, axis)} fill="none" stroke={INK3} strokeWidth={1} />
      <Key x={x1} y={axis + 18} anchor="end" fill={INK3} size={9.5}>
        TIME
      </Key>

      <path d={gains} fill="none" stroke={SIGNAL} strokeWidth={2.5} />
      <path d={rel} fill="none" stroke={COUNTER} strokeWidth={2.5} />

      <Key x={96} y={58} fill={SIGNAL} size={10.5}>
        SHORT-TERM GAINS
      </Key>
      {["LONG-TERM", "RELATIONSHIPS", "AND REPUTATION"].map((l, i) => (
        <Key key={l} x={x1} y={96 + i * 14} anchor="end" fill={COUNTER} size={10.5}>
          {l}
        </Key>
      ))}
    </Frame>
  );
}

/* ==========================================================================
   16 · CUT-SHORT LIFESPANS — replaced before it needs replacement
   ========================================================================== */

export function ObsolescenceLifespans() {
  const x0 = 20;
  const need = 276;
  const r1 = 64;
  const r2 = 138;
  const h = 28;
  const gap = 6;
  const span = (need - x0 - 3 * gap) / 4;
  const spans = [0, 1, 2, 3].map((i) => ({ a: x0 + i * (span + gap), b: x0 + i * (span + gap) + span }));

  return (
    <Frame
      width={400}
      height={244}
      label="Schematic. Top row: one product lasting until it actually needs replacement. Bottom row, planned obsolescence: over the same time, four products, each made obsolete early and replaced, drive frequent replacement sales and pile up at the end, an environmental concern."
    >
      <Schematic x={392} y={236} />

      <Key x={need} y={24} anchor="middle" fill={INK} size={10}>
        ACTUALLY NEEDS
      </Key>
      <Key x={need} y={38} anchor="middle" fill={INK} size={10}>
        REPLACEMENT
      </Key>
      <line x1={need} y1={48} x2={need} y2={r2 + h + 6} stroke={INK} strokeWidth={1.5} strokeDasharray="5 4" />

      <rect x={x0} y={r1} width={need - x0} height={h} fill={COUNTER} />

      <Key x={x0} y={r2 - 12} fill={SIGNAL} size={10.5}>
        PLANNED OBSOLESCENCE
      </Key>
      {spans.map((sp, i) => (
        <rect key={i} x={f2(sp.a)} y={r2} width={f2(span)} height={h} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.25} />
      ))}
      <path d={`M${x0} ${r2 + h + 10} V${r2 + h + 18} H${f2(spans[3].b)} V${r2 + h + 10}`} fill="none" stroke={SIGNAL} strokeWidth={1.25} />
      <Key x={(x0 + spans[3].b) / 2} y={r2 + h + 40} anchor="middle" fill={SIGNAL} size={10}>
        FREQUENT REPLACEMENT SALES
      </Key>

      {/* what is left behind */}
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={318 + (i % 2) * 8}
          y={r2 + h - 10 - i * 12}
          width={44}
          height={10}
          fill={SIGNAL_TINT}
          stroke={SIGNAL}
          strokeWidth={1}
          transform={`rotate(${i % 2 === 0 ? -6 : 5} ${340 + (i % 2) * 8} ${r2 + h - 5 - i * 12})`}
        />
      ))}
      <Key x={344} y={r2 + h + 26} anchor="middle" fill={SIGNAL} size={9.5}>
        ENVIRONMENTAL
      </Key>
      <Key x={344} y={r2 + h + 40} anchor="middle" fill={SIGNAL} size={9.5}>
        CONCERNS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   17 · WIDENING BAND — present needs met, future ability preserved
   ========================================================================== */

export function GenerationsBand() {
  const x0 = 20;
  const x1 = 380;
  const mid = 152;
  const glyphs = 78;

  return (
    <Frame
      width={400}
      height={234}
      label="A band runs from the present, on the left, to future generations, on the right, and grows wider as it goes. On the left stand a person and a company building, consumers and businesses. On the right stand four people, future generations, whose ability to meet their needs is preserved or enhanced."
    >
      {/* the ability to meet needs */}
      <path
        d={`M${x0} ${mid - 22} C150 ${mid - 22} 260 ${mid - 44} ${x1} ${mid - 48} L${x1} ${mid + 48} C260 ${mid + 44} 150 ${mid + 22} ${x0} ${mid + 22} Z`}
        fill={COUNTER_TINT}
        stroke={COUNTER}
        strokeWidth={1.25}
      />
      <Key x={200} y={mid + 4} anchor="middle" fill={COUNTER} size={10.5}>
        THE ABILITY TO MEET THEIR NEEDS
      </Key>

      {/* present: consumers and businesses */}
      <Key x={x0} y={26} fill={INK} size={10.5}>
        THE PRESENT
      </Key>
      <Person1 x={x0 + 12} y={glyphs} tone={INK} />
      <Company cx={x0 + 50} base={glyphs} w={36} h={28} tone={INK} />
      <Key x={x0} y={glyphs + 22} fill={INK} size={10}>
        CONSUMERS AND BUSINESSES
      </Key>

      {/* future generations */}
      <Key x={x1} y={26} anchor="end" fill={COUNTER} size={10.5}>
        FUTURE GENERATIONS
      </Key>
      {[0, 1, 2, 3].map((i) => (
        <Person1 key={i} x={x1 - 10 - i * 22} y={glyphs} s={i % 2 === 0 ? 1 : 0.8} tone={COUNTER} />
      ))}
      <Key x={x1} y={mid + 70} anchor="end" fill={COUNTER} size={10}>
        PRESERVES OR ENHANCES
      </Key>
    </Frame>
  );
}
