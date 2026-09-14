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
  Note,
  Display,
  Frame,
  Schematic,
} from "../week1/visuals";

const AFFIRM = "var(--affirm)";
const AFFIRM_TINT = "rgba(46, 90, 43, 0.1)";
const INK_TINT = "rgba(23, 22, 15, 0.06)";

/** Open chevron arrowheads whose tip sits at (x, y). */
const head = {
  right: (x: number, y: number) => `M${x - 8} ${y - 5}L${x} ${y}L${x - 8} ${y + 5}`,
  left: (x: number, y: number) => `M${x + 8} ${y - 5}L${x} ${y}L${x + 8} ${y + 5}`,
  down: (x: number, y: number) => `M${x - 5} ${y - 8}L${x} ${y}L${x + 5} ${y - 8}`,
  up: (x: number, y: number) => `M${x - 5} ${y + 8}L${x} ${y}L${x + 5} ${y + 8}`,
};

/** Arrowhead pointing along the direction (dx, dy), tip at (x, y). */
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

const f2 = (n: number) => +n.toFixed(2);

/** A small standing figure, feet at (x, y). */
function Person({ x, y, s = 1, tone = INK }: { x: number; y: number; s?: number; tone?: string }) {
  return (
    <g>
      <circle cx={x} cy={y - 26 * s} r={5 * s} fill={tone} />
      <path
        d={`M${x - 8 * s} ${y} L${x - 8 * s} ${y - 10 * s} Q${x - 8 * s} ${y - 18 * s} ${x} ${y - 18 * s} Q${x + 8 * s} ${y - 18 * s} ${x + 8 * s} ${y - 10 * s} L${x + 8 * s} ${y} Z`}
        fill={tone}
      />
    </g>
  );
}

/* ==========================================================================
   1 · NESTED RINGS — the environment around marketing
   ========================================================================== */

export function EnvironmentRings() {
  const cx = 400;
  const cy = 176;
  const micro = { rx: 250, ry: 104 };
  const macro = { rx: 376, ry: 158 };

  const onEllipse = (e: { rx: number; ry: number }, deg: number) => {
    const t = (deg * Math.PI) / 180;
    return { x: cx + e.rx * Math.cos(t), y: cy + e.ry * Math.sin(t) };
  };
  const inward = (deg: number, outer: { rx: number; ry: number }, inner: { rx: number; ry: number }, tone: string) => {
    const a = onEllipse(outer, deg);
    const b = onEllipse(inner, deg);
    const x0 = a.x + (b.x - a.x) * 0.22;
    const y0 = a.y + (b.y - a.y) * 0.22;
    const x1 = a.x + (b.x - a.x) * 0.78;
    const y1 = a.y + (b.y - a.y) * 0.78;
    return (
      <g key={`${deg}-${inner.rx}`}>
        <line x1={f2(x0)} y1={f2(y0)} x2={f2(x1)} y2={f2(y1)} stroke={tone} strokeWidth={1.5} />
        <path d={headAlong(x1, y1, x1 - x0, y1 - y0, 7)} fill="none" stroke={tone} strokeWidth={1.5} />
      </g>
    );
  };
  const core = { rx: 150, ry: 44 };

  return (
    <Frame
      height={350}
      label="Two rings around marketing. The inner ring is the microenvironment, the outer ring the macroenvironment. At the centre, marketing management builds relationships with target customers, and arrows from both rings press in on that relationship."
    >
      <ellipse cx={cx} cy={cy} rx={macro.rx} ry={macro.ry} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.25} />
      <ellipse cx={cx} cy={cy} rx={micro.rx} ry={micro.ry} fill={PAPER} stroke={INK} strokeWidth={1.25} />

      <Key x={cx} y={cy - macro.ry + 30} anchor="middle" fill={COUNTER} size={12}>
        MACROENVIRONMENT
      </Key>
      <Key x={cx} y={cy - micro.ry + 28} anchor="middle" fill={INK} size={12}>
        MICROENVIRONMENT
      </Key>

      {[18, 162, 198, 342].map((d) => inward(d, macro, micro, COUNTER))}
      {[10, 170, 190, 350].map((d) => inward(d, micro, core, INK))}

      {/* the relationship at the centre */}
      <rect x={cx - 150} y={cy - 22} width={112} height={44} fill={SIGNAL} />
      <Key x={cx - 94} y={cy - 4} anchor="middle" fill={PAPER} size={9.5}>
        MARKETING
      </Key>
      <Key x={cx - 94} y={cy + 10} anchor="middle" fill={PAPER} size={9.5}>
        MANAGEMENT
      </Key>
      <rect x={cx + 38} y={cy - 22} width={112} height={44} fill={PAPER} stroke={SIGNAL} strokeWidth={1.5} />
      <Key x={cx + 94} y={cy - 4} anchor="middle" fill={SIGNAL} size={9.5}>
        TARGET
      </Key>
      <Key x={cx + 94} y={cy + 10} anchor="middle" fill={SIGNAL} size={9.5}>
        CUSTOMERS
      </Key>
      <line x1={cx - 36} y1={cy - 4} x2={cx + 36} y2={cy - 4} stroke={SIGNAL} strokeWidth={1.5} />
      <line x1={cx - 36} y1={cy + 4} x2={cx + 36} y2={cy + 4} stroke={SIGNAL} strokeWidth={1.5} />
      <Key x={cx} y={cy + 42} anchor="middle" fill={SIGNAL} size={9}>
        RELATIONSHIPS
      </Key>

      <Key x={16} y={24} fill={INK3} size={10}>
        ACTORS AND FORCES
      </Key>
      <Key x={16} y={40} fill={INK3} size={10}>
        OUTSIDE MARKETING
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   2 · CHAIN BETWEEN BANDS — the six actors of the microenvironment
   ========================================================================== */

export function MicroActors() {
  const row = 186;
  const boxes = [
    { x: 20, w: 140, lines: ["SUPPLIERS"] },
    { x: 440, w: 170, lines: ["MARKETING", "INTERMEDIARIES"] },
    { x: 650, w: 130, lines: ["CUSTOMER", "MARKETS"] },
  ];
  const company = { x: 200, y: 118, w: 200, h: 136 };
  const bandTop = { y: 30, h: 34 };
  const bandBottom = { y: 318, h: 34 };
  const ticks = [90, 250, 350, 525, 715];

  return (
    <Frame
      height={372}
      label="The microenvironment. Suppliers, the company itself, marketing intermediaries and customer markets form a chain. Inside the company, marketing sits among other company departments. Competitors run along the top of the chain and publics along the bottom."
    >
      {/* bands */}
      <rect x={20} y={bandTop.y} width={760} height={bandTop.h} fill={INK_TINT} />
      <Key x={400} y={bandTop.y + 22} anchor="middle" fill={INK} size={11}>
        COMPETITORS
      </Key>
      <rect x={20} y={bandBottom.y} width={760} height={bandBottom.h} fill={INK_TINT} />
      <Key x={400} y={bandBottom.y + 22} anchor="middle" fill={INK} size={11}>
        PUBLICS
      </Key>
      {ticks.map((x) => (
        <g key={x}>
          <line x1={x} y1={bandTop.y + bandTop.h} x2={x} y2={x > 200 && x < 400 ? company.y : row - 30} stroke={RULE2} strokeWidth={1} strokeDasharray="2 4" />
          <line x1={x} y1={x > 200 && x < 400 ? company.y + company.h : row + 30} x2={x} y2={bandBottom.y} stroke={RULE2} strokeWidth={1} strokeDasharray="2 4" />
        </g>
      ))}

      {/* external partners */}
      {boxes.map((b) => (
        <g key={b.lines[0]}>
          <rect x={b.x} y={row - 30} width={b.w} height={60} fill={PAPER} stroke={COUNTER} strokeWidth={1.25} />
          {b.lines.map((l, i) => (
            <Key key={l} x={b.x + b.w / 2} y={row + 4 + (i - (b.lines.length - 1) / 2) * 15} anchor="middle" fill={COUNTER} size={10.5}>
              {l}
            </Key>
          ))}
        </g>
      ))}

      {/* the company itself */}
      <rect x={company.x} y={company.y} width={company.w} height={company.h} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <Key x={company.x + company.w / 2} y={company.y + 22} anchor="middle" fill={INK} size={10.5}>
        THE COMPANY ITSELF
      </Key>
      {[0, 1].map((r) =>
        [0, 1].map((c) => {
          const x = company.x + 14 + c * 88;
          const y = company.y + 36 + r * 36;
          const on = r === 0 && c === 0;
          return (
            <g key={`${r}${c}`}>
              <rect x={x} y={y} width={84} height={32} fill={on ? SIGNAL : PAPER2} stroke={on ? SIGNAL : RULE2} strokeWidth={1} />
              {on ? (
                <Key x={x + 42} y={y + 20} anchor="middle" fill={PAPER} size={9}>
                  MARKETING
                </Key>
              ) : null}
            </g>
          );
        }),
      )}
      <Key x={company.x + company.w / 2} y={company.y + company.h - 12} anchor="middle" fill={INK3} size={8.5}>
        + OTHER COMPANY DEPARTMENTS
      </Key>

      {/* the chain */}
      {[
        [160, 200],
        [400, 440],
        [610, 650],
      ].map(([a, b]) => (
        <g key={a}>
          <line x1={a + 4} y1={row} x2={b - 4} y2={row} stroke={INK} strokeWidth={1.5} />
          <path d={head.right(b - 3, row)} fill="none" stroke={INK} strokeWidth={1.5} />
        </g>
      ))}
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
            <path d={headAlong(x1, y1, dx, dy, 8)} fill="none" stroke={COUNTER} strokeWidth={1.5} />
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
      label="A business moves along a corridor. The walls are laws. A narrow gate is a government agency. Pressure groups push down on the path and bend it. Together they influence or limit how a business can operate."
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

      {/* pressure groups: pushing down */}
      {[284, 306, 328].map((x) => (
        <g key={x}>
          <line x1={x} y1={top + 6} x2={x} y2={top + 30} stroke={SIGNAL} strokeWidth={2} />
          <path d={head.down(x, top + 32)} fill="none" stroke={SIGNAL} strokeWidth={2} />
        </g>
      ))}
      <Key x={306} y={top - 12} anchor="middle" fill={SIGNAL} size={12}>
        PRESSURE GROUPS
      </Key>

      {/* the business */}
      <path
        d={`M24 ${mid} L${gate + 40} ${mid} C${gate + 76} ${mid} ${gate + 86} ${mid + 30} ${gate + 120} ${mid + 30} L370 ${mid + 30}`}
        fill="none"
        stroke={SIGNAL}
        strokeWidth={2.5}
      />
      <path d={head.right(378, mid + 30)} fill="none" stroke={SIGNAL} strokeWidth={2.5} />
      <circle cx={24} cy={mid} r={6} fill={SIGNAL} />
      <Key x={36} y={mid - 14} fill={SIGNAL} size={11}>
        A BUSINESS
      </Key>
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
            <path d={head.right(x - 4, ty)} fill="none" stroke={INK} strokeWidth={1.25} />
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
  const root = { x: 70, y: 124 };
  const fork = { x: 150, y: 124 };
  const ends = [
    { y: 62, lines: ["NEW PRODUCT", "OPPORTUNITIES"] },
    { y: 186, lines: ["NEW MARKET", "OPPORTUNITIES"] },
  ];

  return (
    <Frame
      width={400}
      height={236}
      label="A stem grows from new technologies and forks into new product opportunities and new market opportunities, each budding into further shoots."
    >
      {/* the forces that create */}
      <line x1={20} y1={root.y} x2={root.x - 10} y2={root.y} stroke={INK3} strokeWidth={1.5} strokeDasharray="3 4" />
      <circle cx={root.x} cy={root.y} r={11} fill={SIGNAL} />
      <Key x={root.x - 50} y={root.y + 36} fill={SIGNAL} size={11.5}>
        NEW
      </Key>
      <Key x={root.x - 50} y={root.y + 52} fill={SIGNAL} size={11.5}>
        TECHNOLOGIES
      </Key>
      <line x1={root.x + 11} y1={root.y} x2={fork.x} y2={fork.y} stroke={SIGNAL} strokeWidth={2.5} />

      {ends.map((e, i) => {
        const tip = { x: 232, y: e.y };
        return (
          <g key={i}>
            <path d={`M${fork.x} ${fork.y} C${fork.x + 44} ${fork.y} ${tip.x - 50} ${tip.y} ${tip.x} ${tip.y}`} fill="none" stroke={COUNTER} strokeWidth={2.5} />
            {/* buds */}
            {[-22, 0, 22].map((d) => (
              <g key={d}>
                <path d={`M${tip.x} ${tip.y} C${tip.x + 18} ${tip.y} ${tip.x + 22} ${tip.y + d} ${tip.x + 40} ${tip.y + d}`} fill="none" stroke={COUNTER} strokeWidth={1.25} />
                <circle cx={tip.x + 44} cy={tip.y + d} r={4} fill={d === 0 ? COUNTER : PAPER} stroke={COUNTER} strokeWidth={1.25} />
              </g>
            ))}
            {e.lines.map((l, j) => (
              <Key key={l} x={tip.x + 58} y={tip.y + (j === 0 ? -1 : 15)} fill={COUNTER} size={11}>
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
        <Person key={d} x={cols[1] + d} y={ground} s={d === 0 ? 1.2 : 1} tone={COUNTER} />
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
      label="Natural resources on the left and marketers on the right. An upper arrow carries resources to marketers as inputs. A lower arrow runs back: resources are affected by marketing activities."
    >
      {/* natural resources: land, a tree, water */}
      <path d={`M${leftC - 58} 132 Q${leftC - 20} 78 ${leftC + 12} 104 Q${leftC + 36} 88 ${leftC + 58} 132 Z`} fill={AFFIRM_TINT} stroke={AFFIRM} strokeWidth={1.5} strokeLinejoin="round" />
      <line x1={leftC - 14} y1={104} x2={leftC - 14} y2={80} stroke={AFFIRM} strokeWidth={2} />
      <circle cx={leftC - 14} cy={70} r={14} fill={AFFIRM} />
      {[146, 158].map((y) => (
        <path key={y} d={`M${leftC - 54} ${y} q9 -6 18 0 t18 0 t18 0 t18 0 t18 0 t18 0`} fill="none" stroke={COUNTER} strokeWidth={1.5} />
      ))}
      <Key x={leftC} y={196} anchor="middle" fill={AFFIRM} size={11}>
        NATURAL
      </Key>
      <Key x={leftC} y={212} anchor="middle" fill={AFFIRM} size={11}>
        RESOURCES
      </Key>

      {/* marketers */}
      <rect x={rightC - 44} y={84} width={88} height={76} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <path d={`M${rightC - 52} 86 L${rightC} 58 L${rightC + 52} 86`} fill="none" stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
      <rect x={rightC - 12} y={124} width={24} height={36} fill={INK} />
      <Key x={rightC} y={196} anchor="middle" fill={INK} size={11}>
        MARKETERS
      </Key>

      {/* needed as inputs */}
      <line x1={leftC + 66} y1={92} x2={rightC - 58} y2={92} stroke={COUNTER} strokeWidth={2} />
      <path d={head.right(rightC - 56, 92)} fill="none" stroke={COUNTER} strokeWidth={2} />
      <Key x={200} y={80} anchor="middle" fill={COUNTER} size={10}>
        NEEDED AS INPUTS
      </Key>

      {/* affected by */}
      <line x1={leftC + 68} y1={140} x2={rightC - 58} y2={140} stroke={SIGNAL} strokeWidth={2} />
      <path d={head.left(leftC + 66, 140)} fill="none" stroke={SIGNAL} strokeWidth={2} />
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
  const top = 72;

  const strategy = (x: number, w: number) =>
    Array.from({ length: rows }, (_, r) => (
      <rect key={r} x={x} y={top + r * (rowH + gap)} width={w} height={rowH} fill={INK2} />
    ));

  const right = { x: 460, w: 300 };
  const threads = Array.from({ length: 6 }, (_, i) => right.x + 26 + i * 50);
  const bottom = top + rows * (rowH + gap) - gap;

  return (
    <Frame
      height={292}
      label="Left: a block of business strategy with philanthropy as a small box set apart from it, labelled just philanthropy and struck through. Right: CSR threads woven over and under every layer of the business strategy, labelled deeply integrated."
    >
      {/* ---- left: just philanthropy ---- */}
      <Key x={40} y={34} fill={INK3} size={11.5}>
        JUST PHILANTHROPY
      </Key>
      <line x1={36} y1={30} x2={196} y2={30} stroke={SIGNAL} strokeWidth={2} />
      {strategy(40, 220)}
      <rect x={290} y={top + 2 * (rowH + gap) - 10} width={60} height={40} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.25} />
      <circle cx={320} cy={top + 2 * (rowH + gap) + 10} r={5} fill={SIGNAL} />
      <Key x={320} y={top + 2 * (rowH + gap) + 52} anchor="middle" fill={SIGNAL} size={10}>
        PHILANTHROPY
      </Key>
      <Key x={150} y={bottom + 30} anchor="middle" fill={INK3} size={10}>
        BUSINESS STRATEGY
      </Key>

      <line x1={400} y1={24} x2={400} y2={270} stroke={RULE} strokeWidth={1} />

      {/* ---- right: woven in ---- */}
      <Key x={right.x} y={34} fill={SIGNAL} size={11.5}>
        DEEPLY INTEGRATED
      </Key>
      {threads.map((x) => (
        <line key={`t${x}`} x1={x} y1={top - 18} x2={x} y2={bottom + 18} stroke={SIGNAL} strokeWidth={6} />
      ))}
      {strategy(right.x, right.w)}
      {threads.map((x, i) =>
        Array.from({ length: rows }, (_, r) =>
          (i + r) % 2 === 0 ? (
            <rect key={`o${i}${r}`} x={x - 3} y={top + r * (rowH + gap) - 1} width={6} height={rowH + 2} fill={SIGNAL} stroke={PAPER} strokeWidth={1.5} />
          ) : null,
        ),
      )}
      <Key x={right.x + right.w / 2} y={bottom + 42} anchor="middle" fill={INK3} size={10}>
        BUSINESS STRATEGY
      </Key>
      <Key x={right.x + right.w} y={34} anchor="end" fill={SIGNAL} size={11}>
        CSR ↓
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   11 · GAP — more spent on claiming than on implementing
   ========================================================================== */

export function GreenwashingGap() {
  const x0 = 40;
  const claim = 700;
  const act = 250;
  const h = 44;
  const r1 = 72;
  const r2 = 158;

  return (
    <Frame
      height={262}
      label="Schematic. Two bars of time and money. The bar for claiming to be green is long and hollow. The bar for actually implementing business practices is short and solid. The difference between them is greenwashing."
    >
      <Schematic x={792} y={254} />

      <Key x={x0} y={r1 - 12} fill={AFFIRM} size={11.5}>
        {"CLAIMING TO BE “GREEN”"}
      </Key>
      <rect x={x0 + 1} y={r1 + 1} width={claim - x0 - 2} height={h - 2} fill={AFFIRM_TINT} stroke={AFFIRM} strokeWidth={2} strokeDasharray="7 5" />

      <Key x={x0} y={r2 - 12} fill={INK} size={11.5}>
        ACTUALLY IMPLEMENTING BUSINESS PRACTICES
      </Key>
      <rect x={x0} y={r2} width={act - x0} height={h} fill={INK} />

      {/* the gap */}
      <line x1={act} y1={r2 + h / 2} x2={claim - 8} y2={r2 + h / 2} stroke={SIGNAL} strokeWidth={1.5} strokeDasharray="3 4" />
      <line x1={claim} y1={r1 + h + 4} x2={claim} y2={r2 + h} stroke={SIGNAL} strokeWidth={1.5} strokeDasharray="3 4" />
      <path d={`M${act + 6} ${r2 + h + 12} L${act + 6} ${r2 + h + 22} L${claim} ${r2 + h + 22} L${claim} ${r2 + h + 12}`} fill="none" stroke={SIGNAL} strokeWidth={2} />
      <Key x={(act + claim) / 2} y={r2 + h + 46} anchor="middle" fill={SIGNAL} size={13}>
        GREENWASHING
      </Key>

      {/* axis */}
      <Key x={x0} y={r2 + h + 46} fill={INK3} size={10}>
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
  const base = 250;
  const w = 76;
  const cost = 96;
  const extra = 44;
  const price = 176;

  const column = (x: number, pass: boolean) => {
    const priceY = base - price - (pass ? extra : 0);
    return (
      <g>
        <rect x={x} y={base - cost} width={w} height={cost} fill={INK2} />
        <rect x={x + 0.75} y={base - cost - extra + 0.75} width={w - 1.5} height={extra - 1.5} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.25} strokeDasharray="4 3" />
        <Key x={x + w / 2} y={base - cost / 2 + 4} anchor="middle" fill={PAPER} size={10}>
          COST
        </Key>
        {pass ? (
          <line x1={x - 22} y1={base - price} x2={x + w + 22} y2={base - price} stroke={RULE2} strokeWidth={1.25} strokeDasharray="4 4" />
        ) : null}
        <line x1={x - 22} y1={priceY} x2={x + w + 22} y2={priceY} stroke={COUNTER} strokeWidth={3} />
        <Key x={x + w + 30} y={priceY + 4} fill={COUNTER} size={11}>
          PRICE
        </Key>
        {pass ? (
          <>
            <line x1={x + w + 12} y1={base - price - 4} x2={x + w + 12} y2={priceY + 8} stroke={COUNTER} strokeWidth={1.5} />
            <path d={head.up(x + w + 12, priceY + 6)} fill="none" stroke={COUNTER} strokeWidth={1.5} />
          </>
        ) : null}
      </g>
    );
  };

  return (
    <Frame
      height={320}
      label="Schematic. Fair-trade materials add to cost in two columns. In the first, the brand absorbs the cost and the price stays where it was. In the second, the brand passes it on to consumers and the price rises by the same amount."
    >
      <Schematic x={792} y={312} />

      {/* the commitment, keyed to the dashed block it adds to cost */}
      <rect x={40} y={134} width={36} height={28} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.25} strokeDasharray="4 3" />
      <Key x={90} y={145} fill={SIGNAL} size={10.5}>
        100% FAIR-TRADE
      </Key>
      <Key x={90} y={161} fill={SIGNAL} size={10.5}>
        MATERIALS
      </Key>

      {column(330, false)}
      {column(590, true)}

      <line x1={300} y1={base} x2={780} y2={base} stroke={INK} strokeWidth={1} />
      <line x1={500} y1={56} x2={500} y2={base} stroke={RULE} strokeWidth={1} />
      <Key x={368} y={base + 30} anchor="middle" fill={INK} size={11.5}>
        ABSORB THE COST
      </Key>
      <Key x={628} y={base + 30} anchor="middle" fill={INK} size={11.5}>
        PASS IT ON TO CONSUMERS
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
  const x0 = 70;
  const x1 = 760;
  const base = 196;
  const split = 250;

  // gains: a sharp early spike that falls away
  const gains = `M${x0} ${base} C120 ${base} 140 70 180 70 C216 70 226 ${base - 18} 270 ${base - 8} L${x1} ${base - 4}`;
  // relationships and reputation: steady, then sliding once the pressure lands
  const rel = `M${x0} 120 L200 120 C300 124 420 200 560 236 C640 256 700 262 ${x1} 266`;

  return (
    <Frame
      height={320}
      label="Schematic curves over time. Short-term gains spike early and fall away. Long-term relationships and reputation start steady and slide downward for the rest of the timeline."
    >
      <Schematic />
      <rect x={x0} y={34} width={split - x0} height={250} fill={SIGNAL_TINT} />
      <Key x={(x0 + split) / 2} y={28} anchor="middle" fill={SIGNAL} size={10}>
        SHORT TERM
      </Key>
      <Key x={(split + x1) / 2} y={28} anchor="middle" fill={COUNTER} size={10}>
        LONG TERM
      </Key>

      <line x1={x0} y1={base} x2={x1} y2={base} stroke={RULE2} strokeWidth={1} />
      <line x1={x0} y1={290} x2={x1 - 6} y2={290} stroke={INK3} strokeWidth={1} />
      <path d={head.right(x1, 290)} fill="none" stroke={INK3} strokeWidth={1} />
      <Key x={x1} y={310} anchor="end" fill={INK3} size={9.5}>
        TIME
      </Key>

      <path d={gains} fill="none" stroke={SIGNAL} strokeWidth={3} />
      <path d={rel} fill="none" stroke={COUNTER} strokeWidth={3} />

      <Key x={196} y={62} fill={SIGNAL} size={11.5}>
        SHORT-TERM GAINS
      </Key>
      <Key x={290} y={252} fill={COUNTER} size={11.5}>
        LONG-TERM RELATIONSHIPS
      </Key>
      <Key x={290} y={269} fill={COUNTER} size={11.5}>
        AND REPUTATION
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   16 · CUT-SHORT LIFESPANS — replaced before it needs replacement
   ========================================================================== */

export function ObsolescenceLifespans() {
  const x0 = 200;
  const need = 700;
  const r1 = 70;
  const r2 = 156;
  const h = 30;
  const spans = [
    { a: 200, b: 316 },
    { a: 324, b: 432 },
    { a: 440, b: 556 },
    { a: 564, b: 690 },
  ];

  return (
    <Frame
      height={272}
      label="Schematic. Top row: one product lasting until it actually needs replacement. Bottom row: over the same time, four products, each made obsolete early and replaced, drive frequent replacement sales and pile up at the end."
    >
      <Schematic x={120} y={264} />
      <Key x={792} y={238} anchor="end" fill={SIGNAL} size={10}>
        ENVIRONMENTAL
      </Key>
      <Key x={792} y={253} anchor="end" fill={SIGNAL} size={10}>
        CONCERNS
      </Key>

      <line x1={need} y1={36} x2={need} y2={216} stroke={INK} strokeWidth={1.5} strokeDasharray="5 4" />
      <Key x={need} y={30} anchor="middle" fill={INK} size={10}>
        ACTUALLY NEEDS REPLACEMENT
      </Key>

      <Key x={180} y={r1 + 20} anchor="end" fill={INK3} size={10.5}>
        NEEDED
      </Key>
      <rect x={x0} y={r1} width={need - x0} height={h} fill={COUNTER} />

      <Key x={180} y={r2 + 12} anchor="end" fill={SIGNAL} size={10.5}>
        PLANNED
      </Key>
      <Key x={180} y={r2 + 28} anchor="end" fill={SIGNAL} size={10.5}>
        OBSOLESCENCE
      </Key>
      {spans.map((s, i) => (
        <g key={i}>
          <rect x={s.a} y={r2} width={s.b - s.a} height={h} fill={i === 0 ? SIGNAL : SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.25} />
          {/* the break */}
          <path d={`M${s.b} ${r2 - 4} l-6 10 l8 6 l-6 10 l4 12`} fill="none" stroke={PAPER} strokeWidth={3} />
        </g>
      ))}
      <path d={`M${spans[0].a} ${r2 + h + 12} L${spans[0].a} ${r2 + h + 20} L${spans[3].b} ${r2 + h + 20} L${spans[3].b} ${r2 + h + 12}`} fill="none" stroke={SIGNAL} strokeWidth={1.25} />
      <Key x={(spans[0].a + spans[3].b) / 2} y={r2 + h + 42} anchor="middle" fill={SIGNAL} size={11}>
        FREQUENT REPLACEMENT SALES
      </Key>

      {/* what is left behind */}
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={722 + (i % 2) * 8}
          y={r2 + h - 10 - i * 12}
          width={50}
          height={10}
          fill={i === 3 ? SIGNAL_TINT : SIGNAL_TINT}
          stroke={SIGNAL}
          strokeWidth={1}
          transform={`rotate(${i % 2 === 0 ? -6 : 5} ${747 + (i % 2) * 8} ${r2 + h - 5 - i * 12})`}
        />
      ))}
    </Frame>
  );
}

/* ==========================================================================
   17 · WIDENING BAND — present needs met, future ability preserved
   ========================================================================== */

export function GenerationsBand() {
  const x0 = 60;
  const x1 = 760;
  const mid = 150;

  return (
    <Frame
      height={286}
      label="A band runs from the present to future generations and grows wider as it goes. On the left, consumers and businesses meet their present needs. On the right, future generations keep, or gain, the ability to meet their needs."
    >
      {/* the ability to meet needs */}
      <path
        d={`M${x0} ${mid - 22} C300 ${mid - 22} 520 ${mid - 44} ${x1} ${mid - 48} L${x1} ${mid + 48} C520 ${mid + 44} 300 ${mid + 22} ${x0} ${mid + 22} Z`}
        fill={COUNTER_TINT}
        stroke={COUNTER}
        strokeWidth={1.25}
      />
      <Key x={400} y={mid + 5} anchor="middle" fill={COUNTER} size={11.5}>
        THE ABILITY TO MEET THEIR NEEDS
      </Key>
      <Key x={x1} y={mid + 70} anchor="end" fill={COUNTER} size={10}>
        PRESERVES OR ENHANCES
      </Key>

      {/* present */}
      <Key x={x0} y={40} fill={INK} size={11}>
        THE PRESENT
      </Key>
      <Person x={x0 + 14} y={86} tone={INK} />
      <rect x={x0 + 40} y={60} width={30} height={26} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <path d={`M${x0 + 36} 62 L${x0 + 55} 48 L${x0 + 74} 62`} fill="none" stroke={INK} strokeWidth={1.5} />
      <Note x={x0} y={206} size={13} fill={INK2}>
        consumers and businesses
      </Note>

      {/* future generations */}
      <Key x={x1} y={40} anchor="end" fill={INK} size={11}>
        FUTURE GENERATIONS
      </Key>
      {[0, 1, 2, 3].map((i) => (
        <Person key={i} x={x1 - 14 - i * 22} y={86} s={i % 2 === 0 ? 1 : 0.8} tone={COUNTER} />
      ))}

      {/* time */}
      <line x1={x0} y1={244} x2={x1 - 6} y2={244} stroke={INK3} strokeWidth={1} />
      <path d={head.right(x1, 244)} fill="none" stroke={INK3} strokeWidth={1} />
      {[0.25, 0.5, 0.75].map((t) => (
        <line key={t} x1={x0 + (x1 - x0) * t} y1={240} x2={x0 + (x1 - x0) * t} y2={248} stroke={INK3} strokeWidth={1} />
      ))}
    </Frame>
  );
}
