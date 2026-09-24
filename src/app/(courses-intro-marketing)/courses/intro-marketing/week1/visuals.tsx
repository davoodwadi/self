/* ==========================================================================
   Week 01 — figures
   --------------------------------------------------------------------------
   Hand-drawn SVG plates, one grammar per idea, so the deck changes shape as
   the argument does: an iceberg, an exchange loop, two lanes, a triangle, a
   field of view, a split lane, a rosette, a gauge, a staircase, a partitioned
   field, a cycle, a network, a income stream, a ledger across "now", and a
   quadrant.

   Conventions, so the set reads as one system:
     · viewBox width 800, flat fills, hairline rules, no shadows or gradients
     · INK carries the neutral case, SIGNAL the operative one, COUNTER the
       contrast or the outward-looking state
     · every label reuses words from the slide the plate sits on
     · anything that implies a quantity the content does not give is marked
       SCHEMATIC
     · keys are set in the body grotesque, uppercase and tracked (no mono)
   ========================================================================== */

import React from "react";
import {
  Anchor,
  COUNTER,
  COUNTER_TINT,
  Display,
  Frame,
  hash1,
  head1,
  headAlong1,
  INK,
  INK2,
  INK3,
  Key,
  Note,
  PAPER,
  RULE,
  RULE2,
  Schematic,
  SIGNAL,
  SIGNAL_TINT,
} from "../_visuals/kit";
import { Chip1 } from "../_visuals/objects";

/* -- small typographic helpers ------------------------------------------- */

/* ==========================================================================
   1 · ICEBERG — selling is the visible tip
   ========================================================================== */

export function MarketingIceberg() {
  const water = 118;
  const below = [
    { y: 178, text: "CREATING VALUE" },
    { y: 208, text: "DELIVERING VALUE" },
    { y: 238, text: "COMMUNICATING VALUE" },
    { y: 276, text: "STRONG, PROFITABLE CUSTOMER RELATIONSHIPS" },
    { y: 306, text: "CAPTURING VALUE IN RETURN" },
  ];

  return (
    <Frame
      height={380}
      label="An iceberg. Selling is the small visible tip above the waterline; creating, delivering and communicating value, customer relationships and capturing value sit in the far larger mass below."
    >
      {/* water */}
      <rect x={0} y={water} width={800} height={262} fill={COUNTER_TINT} />
      <line
        x1={0}
        y1={water}
        x2={800}
        y2={water}
        stroke={COUNTER}
        strokeWidth={1}
      />

      {/* the tip */}
      <path
        d={`M338 ${water} L372 70 L392 44 L414 62 L446 ${water} Z`}
        fill={SIGNAL_TINT}
        stroke={SIGNAL}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <line x1={420} y1={70} x2={500} y2={58} stroke={SIGNAL} strokeWidth={1} />
      <Key x={508} y={56} fill={SIGNAL} size={12}>
        SELLING
      </Key>
      <Note x={508} y={74} size={12.5} fill={INK2}>
        the visible tip
      </Note>

      {/* the mass */}
      <path
        d={`M338 ${water} L250 150 L150 222 L118 300 L196 352 L400 368 L604 350 L684 292 L650 208 L556 150 L446 ${water} Z`}
        fill={PAPER}
        stroke={COUNTER}
        strokeWidth={1.25}
        strokeLinejoin="round"
      />
      {below.map((b) => (
        <Key key={b.text} x={400} y={b.y} anchor="middle" fill={INK} size={11}>
          {b.text}
        </Key>
      ))}
      <line
        x1={330}
        y1={254}
        x2={470}
        y2={254}
        stroke={RULE2}
        strokeWidth={1}
      />

      {/* margin keys */}
      <Key x={24} y={water - 12} fill={INK3}>
        VISIBLE
      </Key>
      <Key x={24} y={water + 24} fill={COUNTER}>
        MODERN MARKETING
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   2 · EXCHANGE LOOP — create value, capture value in return
   ========================================================================== */

export function ValueExchange() {
  return (
    <Frame
      height={210}
      label="A company creates customer value for customers, and captures value from customers in return."
    >
      {/* company */}
      <rect
        x={30}
        y={45}
        width={190}
        height={120}
        fill={PAPER}
        stroke={INK}
        strokeWidth={1.25}
      />
      <Key x={125} y={110} anchor="middle" fill={INK} size={12.5}>
        COMPANY
      </Key>

      {/* customers */}
      <rect
        x={580}
        y={45}
        width={190}
        height={120}
        fill={PAPER}
        stroke={INK}
        strokeWidth={1.25}
      />
      <Key x={675} y={110} anchor="middle" fill={INK} size={12.5}>
        CUSTOMERS
      </Key>

      {/* create → */}
      <line
        x1={232}
        y1={82}
        x2={566}
        y2={82}
        stroke={COUNTER}
        strokeWidth={2}
      />
      <path
        d={head1.right(568, 82)}
        fill="none"
        stroke={COUNTER}
        strokeWidth={2}
      />
      <Key x={400} y={68} anchor="middle" fill={COUNTER} size={11}>
        CREATE CUSTOMER VALUE
      </Key>

      {/* ← capture */}
      <line
        x1={234}
        y1={128}
        x2={568}
        y2={128}
        stroke={SIGNAL}
        strokeWidth={2}
      />
      <path
        d={head1.left(232, 128)}
        fill="none"
        stroke={SIGNAL}
        strokeWidth={2}
      />
      <Key x={400} y={152} anchor="middle" fill={SIGNAL} size={11}>
        CAPTURE VALUE IN RETURN
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   3 · ATTRACT / KEEP — the dual goal
   ========================================================================== */

export function AttractKeep() {
  const cx = [200, 600];
  const cy = 92;
  const r = 52;
  // A loop arrow that runs around most of the ring.
  const a0 = (-60 * Math.PI) / 180;
  const a1 = (230 * Math.PI) / 180;
  const rr = r - 14;
  const sx = cx[1] + rr * Math.cos(a0);
  const sy = cy + rr * Math.sin(a0);
  const ex = cx[1] + rr * Math.cos(a1);
  const ey = cy + rr * Math.sin(a1);

  return (
    <Frame
      height={200}
      label="Two goals. Attract new customers: an arrow enters the circle from outside. Keep current customers: an arrow circles inside it."
    >
      {/* attract */}
      <circle
        cx={cx[0]}
        cy={cy}
        r={r}
        fill={PAPER}
        stroke={INK3}
        strokeWidth={1}
      />
      <line
        x1={40}
        y1={cy}
        x2={cx[0] - 6}
        y2={cy}
        stroke={COUNTER}
        strokeWidth={2}
      />
      <path
        d={head1.right(cx[0] - 4, cy)}
        fill="none"
        stroke={COUNTER}
        strokeWidth={2}
      />
      <circle cx={40} cy={cy} r={5} fill={COUNTER} />
      <Key x={cx[0]} y={180} anchor="middle" fill={COUNTER} size={17}>
        ATTRACT NEW
      </Key>

      {/* keep */}
      <circle
        cx={cx[1]}
        cy={cy}
        r={r}
        fill={PAPER}
        stroke={INK3}
        strokeWidth={1}
      />
      <path
        d={`M${sx.toFixed(2)} ${sy.toFixed(2)} A${rr} ${rr} 0 1 1 ${ex.toFixed(2)} ${ey.toFixed(2)}`}
        fill="none"
        stroke={SIGNAL}
        strokeWidth={2}
      />
      <path
        d={headAlong1(ex, ey, -Math.sin(a1), Math.cos(a1))}
        fill="none"
        stroke={SIGNAL}
        strokeWidth={2}
      />
      <Key x={cx[1]} y={180} anchor="middle" fill={SIGNAL} size={17}>
        KEEP CURRENT
      </Key>

      <line x1={400} y1={36} x2={400} y2={160} stroke={RULE} strokeWidth={1} />
    </Frame>
  );
}

/* ==========================================================================
   4 · INWARD / OUTWARD — the danger shared by production and product
   ========================================================================== */

export function InwardOutward() {
  const panels = [
    { cx: 200, inward: true },
    { cx: 600, inward: false },
  ];
  const cy = 150;
  const ring = 108;
  const angles = [0, 45, 90, 135, 180, 225, 270, 315];

  return (
    <Frame
      height={320}
      label="Left: attention arrows turn back onto operations while the ring of customer needs goes unwatched. Right: arrows run out from operations to customer needs."
    >
      {panels.map(({ cx, inward }) => {
        const tone = inward ? SIGNAL : COUNTER;
        return (
          <g key={cx}>
            <circle
              cx={cx}
              cy={cy}
              r={ring}
              fill="none"
              stroke={inward ? RULE2 : COUNTER}
              strokeWidth={inward ? 1 : 1.5}
              strokeDasharray={inward ? "3 5" : undefined}
            />
            <rect
              x={cx - 52}
              y={cy - 18}
              width={104}
              height={36}
              fill={PAPER}
              stroke={INK}
              strokeWidth={1.25}
            />
            <Key x={cx} y={cy + 4} anchor="middle" fill={INK} size={9.5}>
              OPERATIONS
            </Key>
            {angles.map((deg) => {
              const t = (deg * Math.PI) / 180;
              const dx = Math.cos(t);
              const dy = Math.sin(t);
              // start/end radii measured from the centre
              const near = 44;
              const far = inward ? 76 : ring - 6;
              const [r0, r1] = inward ? [far, near] : [near, far];
              const x0 = cx + dx * r0 * 1.15;
              const y0 = cy + dy * r0 * 0.9;
              const x1 = cx + dx * r1 * 1.15;
              const y1 = cy + dy * r1 * 0.9;
              const clampX = (v: number) =>
                Math.max(cx - ring + 8, Math.min(cx + ring - 8, v));
              const X0 = clampX(x0);
              const X1 = clampX(x1);
              return (
                <g key={deg}>
                  <line
                    x1={X0}
                    y1={y0}
                    x2={X1}
                    y2={y1}
                    stroke={tone}
                    strokeWidth={1.5}
                  />
                  <path
                    d={headAlong1(X1, y1, X1 - X0, y1 - y0, 6)}
                    fill="none"
                    stroke={tone}
                    strokeWidth={1.5}
                  />
                </g>
              );
            })}
            <Key
              x={cx}
              y={cy - ring - 12}
              anchor="middle"
              fill={inward ? INK3 : COUNTER}
              size={10}
            >
              CUSTOMER NEEDS
            </Key>
            <Key
              x={cx}
              y={cy + ring + 28}
              anchor="middle"
              fill={tone}
              size={12}
            >
              {inward ? "INWARD" : "OUTWARD"}
            </Key>
          </g>
        );
      })}
      <line x1={400} y1={40} x2={400} y2={290} stroke={RULE} strokeWidth={1} />
    </Frame>
  );
}

/* ==========================================================================
   5 · TWO LANES — inside-out selling, outside-in marketing
   ========================================================================== */

function DirectionGlyph({
  cx,
  cy,
  outward,
  tone,
}: {
  cx: number;
  cy: number;
  outward: boolean;
  tone: string;
}) {
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  return (
    <g>
      <rect
        x={cx - 13}
        y={cy - 13}
        width={26}
        height={26}
        fill={PAPER}
        stroke={INK}
        strokeWidth={1.25}
      />
      {dirs.map(([dx, dy]) => {
        const [r0, r1] = outward ? [18, 38] : [42, 21];
        const x0 = cx + dx * r0;
        const y0 = cy + dy * r0;
        const x1 = cx + dx * r1;
        const y1 = cy + dy * r1;
        return (
          <g key={`${dx}${dy}`}>
            <line
              x1={x0}
              y1={y0}
              x2={x1}
              y2={y1}
              stroke={tone}
              strokeWidth={1.75}
            />
            <path
              d={headAlong1(x1, y1, dx * (r1 - r0), dy * (r1 - r0), 6)}
              fill="none"
              stroke={tone}
              strokeWidth={1.75}
            />
          </g>
        );
      })}
    </g>
  );
}

export function SellingVersusMarketing() {
  const xs = [190, 338, 486, 634];
  const heads = ["STARTING POINT", "FOCUS", "MEANS", "ENDS"];
  const lanes = [
    {
      top: 66,
      name: "SELLING",
      dir: "INSIDE-OUT",
      tone: SIGNAL,
      outward: true,
      stages: [
        ["Factory"],
        ["Existing", "products"],
        ["Heavy selling"],
        ["Sales volume"],
      ],
    },
    {
      top: 206,
      name: "MARKETING",
      dir: "OUTSIDE-IN",
      tone: COUNTER,
      outward: false,
      stages: [
        ["Well-defined", "market"],
        ["Customer needs"],
        ["Integrating all", "marketing", "activities"],
        ["Profits through", "customer", "satisfaction"],
      ],
    },
  ];

  return (
    <Frame
      height={336}
      label="Two lanes. Selling runs inside-out: factory, existing products, heavy selling, sales volume. Marketing runs outside-in: well-defined market, customer needs, integrating all marketing activities, profits through customer satisfaction."
    >
      {heads.map((h, i) => (
        <Key key={h} x={xs[i]} y={34} fill={INK3} size={9.5}>
          {h}
        </Key>
      ))}
      <line x1={20} y1={46} x2={780} y2={46} stroke={RULE2} strokeWidth={1} />
      <line x1={20} y1={190} x2={780} y2={190} stroke={RULE} strokeWidth={1} />

      {lanes.map((lane) => (
        <g key={lane.name}>
          <Key x={82} y={lane.top + 10} anchor="middle" fill={INK} size={11}>
            {lane.name}
          </Key>
          <DirectionGlyph
            cx={82}
            cy={lane.top + 60}
            outward={lane.outward}
            tone={lane.tone}
          />
          <Key
            x={82}
            y={lane.top + 118}
            anchor="middle"
            fill={lane.tone}
            size={10}
          >
            {lane.dir}
          </Key>

          {lane.stages.map((lines, i) => (
            <g key={i}>
              <line
                x1={xs[i]}
                y1={lane.top + 14}
                x2={xs[i] + 118}
                y2={lane.top + 14}
                stroke={lane.tone}
                strokeWidth={i === 3 ? 3 : 1.5}
              />
              {lines.map((l, j) => (
                <Note
                  key={j}
                  x={xs[i]}
                  y={lane.top + 42 + j * 19}
                  size={14.5}
                  fill={INK}
                >
                  {l}
                </Note>
              ))}
              {i < 3 ? (
                <path
                  d={head1.right(xs[i] + 140, lane.top + 14)}
                  fill="none"
                  stroke={lane.tone}
                  strokeWidth={1.5}
                />
              ) : null}
            </g>
          ))}
        </g>
      ))}
    </Frame>
  );
}

/* ==========================================================================
   6 · TRIANGLE — the three considerations in balance
   ========================================================================== */

export function SocietalTriangle() {
  const T = { x: 400, y: 84 };
  const L = { x: 160, y: 318 };
  const R = { x: 640, y: 318 };

  return (
    <Frame
      height={380}
      label="A triangle with company profits, consumer wants and public interest at its corners, and sustainable marketing balanced at the centre."
    >
      <path
        d={`M${T.x} ${T.y} L${R.x} ${R.y} L${L.x} ${L.y} Z`}
        fill={SIGNAL_TINT}
        stroke={INK}
        strokeWidth={1.25}
        strokeLinejoin="round"
      />
      {[T, L, R].map((p) => (
        <circle key={`${p.x}`} cx={p.x} cy={p.y} r={6} fill={INK} />
      ))}

      <Key x={T.x} y={T.y - 22} anchor="middle" fill={INK} size={12}>
        PUBLIC INTEREST
      </Key>
      <Key x={L.x} y={L.y + 34} anchor="middle" fill={INK} size={12}>
        CONSUMER WANTS
      </Key>
      <Key x={R.x} y={R.y + 34} anchor="middle" fill={INK} size={12}>
        COMPANY PROFITS
      </Key>

      <Key x={400} y={236} anchor="middle" fill={SIGNAL} size={12}>
        SUSTAINABLE
      </Key>
      <Key x={400} y={254} anchor="middle" fill={SIGNAL} size={12}>
        MARKETING
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   7 · FIELD OF VIEW — myopia is a narrow beam
   ========================================================================== */

export function MyopiaView() {
  return (
    <Frame
      height={300}
      label="An eye looking out. A narrow beam reaches only the railroad business, the products they offer. A wide beam takes in the transportation business, the underlying customer needs."
    >
      {/* wide beam */}
      <path
        d="M126 150 L776 34 L776 266 Z"
        fill={COUNTER_TINT}
        stroke={COUNTER}
        strokeWidth={1}
      />
      {/* narrow beam */}
      <path
        d="M126 150 L776 128 L776 172 Z"
        fill={SIGNAL_TINT}
        stroke={SIGNAL}
        strokeWidth={1.25}
      />

      {/* eye */}
      <path
        d="M36 150 Q80 112 124 150 Q80 188 36 150 Z"
        fill={PAPER}
        stroke={INK}
        strokeWidth={1.5}
      />
      <circle cx={80} cy={150} r={11} fill={INK} />
      <circle cx={84} cy={146} r={3} fill={PAPER} />

      <Key x={760} y={155} anchor="end" fill={SIGNAL} size={11}>
        RAILROAD BUSINESS
      </Key>
      <Note x={760} y={200} anchor="end" size={13} fill={INK2}>
        the specific products they offer
      </Note>

      <Key x={760} y={96} anchor="end" fill={COUNTER} size={11}>
        TRANSPORTATION BUSINESS
      </Key>
      <Note x={760} y={115} anchor="end" size={13} fill={INK2}>
        the underlying customer needs
      </Note>
    </Frame>
  );
}

/* ==========================================================================
   8 · SPLIT LANE — comparing needs, wants, and demands
   Three lanes stacked in the order one becomes the next. The spine on the
   left says what each is; the lane to the right shows it happening.
   ========================================================================== */

export function NeedsWantsDemandsLanes() {
  const spine = 36;
  const lane = 250;
  const rows = { need: 62, want: 196, demand: 330 };

  return (
    <Frame
      height={392}
      label="Comparing needs, wants, and demands. Needs are physical, social and individual. Shaped by culture and individual personality, a hungry person wants a hamburger in one culture and rice and fish in another. A want backed by buying power becomes a demand."
    >
      {/* lane rules */}
      <line x1={20} y1={122} x2={780} y2={122} stroke={RULE} strokeWidth={1} />
      <line x1={20} y1={258} x2={780} y2={258} stroke={RULE} strokeWidth={1} />
      <line x1={226} y1={24} x2={226} y2={372} stroke={RULE} strokeWidth={1} />

      {/* ---- spine ---- */}
      <Display x={spine} y={rows.need} size={27} fill={INK3}>
        Needs
      </Display>
      <Display x={spine} y={rows.want} size={27} fill={COUNTER}>
        Wants
      </Display>
      <Display x={spine} y={rows.demand} size={27} fill={SIGNAL}>
        Demands
      </Display>

      {/* transformers down the spine */}
      {[
        {
          y0: 76,
          y1: 170,
          a: "SHAPED BY CULTURE",
          b: "AND PERSONALITY",
          tone: COUNTER,
        },
        { y0: 210, y1: 304, a: "BACKED BY", b: "BUYING POWER", tone: SIGNAL },
      ].map((t) => (
        <g key={t.a}>
          <line
            x1={spine + 8}
            y1={t.y0}
            x2={spine + 8}
            y2={t.y1 - 2}
            stroke={t.tone}
            strokeWidth={1.75}
          />
          <path
            d={head1.down(spine + 8, t.y1)}
            fill="none"
            stroke={t.tone}
            strokeWidth={1.75}
          />
          <Key x={spine + 22} y={t.y0 + 64} fill={t.tone} size={9.5}>
            {t.a}
          </Key>
          <Key x={spine + 22} y={t.y0 + 79} fill={t.tone} size={9.5}>
            {t.b}
          </Key>
        </g>
      ))}

      {/* ---- lane 1: the three kinds of need ---- */}
      {[
        { x: lane, k: "PHYSICAL", n: "food, clothing, warmth" },
        { x: lane + 180, k: "SOCIAL", n: "belonging, affection" },
        { x: lane + 360, k: "INDIVIDUAL", n: "knowledge, self-expression" },
      ].map((c) => (
        <g key={c.k}>
          <line
            x1={c.x}
            y1={40}
            x2={c.x + 150}
            y2={40}
            stroke={INK3}
            strokeWidth={1.25}
          />
          <Key x={c.x} y={62} fill={INK} size={10.5}>
            {c.k}
          </Key>
          <Note x={c.x} y={84} size={13.5} fill={INK2}>
            {c.n}
          </Note>
        </g>
      ))}

      {/* ---- lane 2: one need, two cultures ---- */}
      <Chip1 x={lane} y={196} w={150} label="A HUNGRY PERSON" tone={INK} />
      <path
        d={`M${lane + 150} 190 C${lane + 200} 190 ${lane + 200} 160 ${lane + 262} 160`}
        fill="none"
        stroke={COUNTER}
        strokeWidth={1.5}
      />
      <path
        d={`M${lane + 150} 190 C${lane + 200} 190 ${lane + 200} 220 ${lane + 262} 220`}
        fill="none"
        stroke={COUNTER}
        strokeWidth={1.5}
      />
      <path
        d={head1.right(lane + 268, 160)}
        fill="none"
        stroke={COUNTER}
        strokeWidth={1.5}
      />
      <path
        d={head1.right(lane + 268, 220)}
        fill="none"
        stroke={COUNTER}
        strokeWidth={1.5}
      />
      <Key x={lane + 280} y={152} fill={INK3} size={9.5}>
        IN ONE CULTURE
      </Key>
      <Note x={lane + 280} y={170} size={15} fill={COUNTER}>
        a hamburger
      </Note>
      <Key x={lane + 280} y={212} fill={INK3} size={9.5}>
        IN ANOTHER
      </Key>
      <Note x={lane + 280} y={230} size={15} fill={COUNTER}>
        rice and fish
      </Note>

      {/* ---- lane 3: the word equation ---- */}
      <Chip1
        x={lane}
        y={330}
        w={120}
        label="WANT"
        tone={COUNTER}
        fill={COUNTER_TINT}
      />
      <Display x={lane + 142} y={338} size={24} anchor="middle" fill={INK3}>
        +
      </Display>
      <Chip1 x={lane + 164} y={330} w={150} label="BUYING POWER" tone={INK} />
      <Display x={lane + 336} y={338} size={24} anchor="middle" fill={INK3}>
        =
      </Display>
      <Chip1
        x={lane + 358}
        y={330}
        w={150}
        label="DEMAND"
        tone={SIGNAL}
        fill={SIGNAL_TINT}
      />
    </Frame>
  );
}

/* ==========================================================================
   9 · ROSETTE — an offering is a combination
   ========================================================================== */

export function OfferingRosette() {
  const c = { x: 262, y: 162 };
  const d = 46;
  const r = 74;
  const lobes = [
    { dx: -1, dy: -1, label: "PRODUCTS", tone: INK },
    { dx: 1, dy: -1, label: "SERVICES", tone: INK },
    { dx: -1, dy: 1, label: "INFORMATION", tone: INK },
    { dx: 1, dy: 1, label: "EXPERIENCES", tone: SIGNAL },
  ];

  return (
    <Frame
      height={330}
      label="Four overlapping circles, products, services, information and experiences, combine into one market offering aimed at a need or want."
    >
      {lobes.map((l) => (
        <circle
          key={l.label}
          cx={c.x + l.dx * d}
          cy={c.y + l.dy * d}
          r={r}
          fill={l.tone === SIGNAL ? SIGNAL_TINT : COUNTER_TINT}
          stroke={l.tone === SIGNAL ? SIGNAL : COUNTER}
          strokeWidth={1.25}
        />
      ))}
      {lobes.map((l) => (
        <Key
          key={l.label}
          x={c.x + l.dx * 62}
          y={c.y + l.dy * 74 + 4}
          anchor="middle"
          fill={l.tone === SIGNAL ? SIGNAL : INK}
          size={9}
        >
          {l.label}
        </Key>
      ))}
      <circle cx={c.x} cy={c.y} r={5} fill={INK} />

      {/* the offering, named */}
      <Key x={c.x} y={24} anchor="middle" fill={INK} size={11}>
        A MARKET OFFERING
      </Key>

      {/* aimed at the need */}
      <line
        x1={c.x + d + r + 18}
        y1={c.y}
        x2={604}
        y2={c.y}
        stroke={INK}
        strokeWidth={1.5}
      />
      <path
        d={head1.right(606, c.y)}
        fill="none"
        stroke={INK}
        strokeWidth={1.5}
      />
      <Key
        x={(c.x + d + r + 18 + 604) / 2}
        y={c.y - 12}
        anchor="middle"
        fill={INK3}
        size={9.5}
      >
        TO SATISFY
      </Key>
      {[58, 40, 22].map((rr, i) => (
        <circle
          key={rr}
          cx={676}
          cy={c.y}
          r={rr}
          fill={i === 2 ? SIGNAL : "none"}
          stroke={i === 2 ? SIGNAL : RULE2}
          strokeWidth={1.25}
        />
      ))}
      <Key x={676} y={c.y + 88} anchor="middle" fill={INK} size={11}>
        A NEED OR WANT
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   10 · BENEFITS LESS COSTS — perceived value, relative to competing offers
   ========================================================================== */

export function PerceivedValueBars() {
  const base = 226;
  const groups = [
    { x: 110, b: 150, c: 62, name: "THIS OFFER", on: true },
    { x: 350, b: 132, c: 104, name: "COMPETING OFFER", on: false },
    { x: 590, b: 96, c: 60, name: "COMPETING OFFER", on: false },
  ];
  const w = 42;

  return (
    <Frame
      height={290}
      label="Schematic. Three offers, each with a benefits bar and a costs bar. The gap between them is perceived value, and this offer's gap is compared with the competing offers."
    >
      <Schematic />
      <line x1={40} y1={base} x2={780} y2={base} stroke={INK} strokeWidth={1} />

      {/* legend */}
      <rect x={40} y={16} width={11} height={11} fill={COUNTER} />
      <Key x={58} y={26} fill={INK} size={10}>
        ALL THE BENEFITS
      </Key>
      <rect x={200} y={16} width={11} height={11} fill={RULE2} />
      <Key x={218} y={26} fill={INK} size={10}>
        ALL THE COSTS
      </Key>

      {groups.map((g) => {
        const top = base - g.b;
        const ctop = base - g.c;
        const bx = g.x + w + 10 + w / 2;
        const tone = g.on ? SIGNAL : INK3;
        return (
          <g key={g.x}>
            <rect
              x={g.x}
              y={top}
              width={w}
              height={g.b}
              fill={g.on ? COUNTER : "rgba(34, 87, 91, 0.45)"}
            />
            <rect
              x={g.x + w + 10}
              y={ctop}
              width={w}
              height={g.c}
              fill={RULE2}
            />
            <line
              x1={g.x}
              y1={top}
              x2={g.x + 2 * w + 10}
              y2={top}
              stroke={tone}
              strokeWidth={1}
              strokeDasharray="3 3"
            />
            <line
              x1={bx}
              y1={top + 3}
              x2={bx}
              y2={ctop - 3}
              stroke={tone}
              strokeWidth={g.on ? 2 : 1.25}
            />
            <path
              d={head1.up(bx, top + 2)}
              fill="none"
              stroke={tone}
              strokeWidth={g.on ? 2 : 1.25}
            />
            <path
              d={head1.down(bx, ctop - 2)}
              fill="none"
              stroke={tone}
              strokeWidth={g.on ? 2 : 1.25}
            />
            {g.on ? (
              <>
                <Key
                  x={g.x + 2 * w + 24}
                  y={(top + ctop) / 2 - 2}
                  fill={SIGNAL}
                  size={10.5}
                >
                  PERCEIVED
                </Key>
                <Key
                  x={g.x + 2 * w + 24}
                  y={(top + ctop) / 2 + 14}
                  fill={SIGNAL}
                  size={10.5}
                >
                  VALUE
                </Key>
              </>
            ) : null}
            <Key
              x={g.x + w + 5}
              y={base + 24}
              anchor="middle"
              fill={g.on ? INK : INK3}
              size={10}
            >
              {g.name}
            </Key>
          </g>
        );
      })}
    </Frame>
  );
}

/* ==========================================================================
   11 · GAUGE — performance measured against expectations
   ========================================================================== */

export function SatisfactionGauge() {
  const y = 118;
  const zones = [
    {
      x0: 50,
      x1: 340,
      k: "FALLS SHORT",
      v: "DISSATISFIED",
      fill: "rgba(23, 22, 15, 0.07)",
      tone: INK3,
    },
    {
      x0: 340,
      x1: 460,
      k: "MATCHES",
      v: "SATISFIED",
      fill: COUNTER_TINT,
      tone: COUNTER,
    },
    {
      x0: 460,
      x1: 750,
      k: "EXCEEDS",
      v: "DELIGHTED",
      fill: SIGNAL_TINT,
      tone: SIGNAL,
    },
  ];

  return (
    <Frame
      height={220}
      label="Perceived performance on a line, with the buyer's expectations marked in the middle. Falling short means dissatisfied; matching means satisfied; exceeding means delighted."
    >
      {zones.map((z) => (
        <g key={z.k}>
          <rect
            x={z.x0}
            y={y - 22}
            width={z.x1 - z.x0}
            height={44}
            fill={z.fill}
          />
          <Key
            x={(z.x0 + z.x1) / 2}
            y={y + 5}
            anchor="middle"
            fill={z.tone}
            size={10}
          >
            {z.k}
          </Key>
          <Key
            x={(z.x0 + z.x1) / 2}
            y={y + 58}
            anchor="middle"
            fill={z.tone}
            size={12.5}
          >
            {z.v}
          </Key>
        </g>
      ))}

      {/* expectations marker: stops at the band so it never crosses a key */}
      <line
        x1={400}
        y1={46}
        x2={400}
        y2={y - 22}
        stroke={INK}
        strokeWidth={2}
      />
      <line
        x1={400}
        y1={y + 22}
        x2={400}
        y2={y + 34}
        stroke={INK}
        strokeWidth={2}
      />
      <path d="M392 46 L408 46 L400 58 Z" fill={INK} />
      <Key x={400} y={34} anchor="middle" fill={INK} size={10.5}>
        EXPECTATIONS
      </Key>

      {/* performance axis */}
      <line
        x1={50}
        y1={y + 96}
        x2={742}
        y2={y + 96}
        stroke={INK3}
        strokeWidth={1}
      />
      <path
        d={head1.right(750, y + 96)}
        fill="none"
        stroke={INK3}
        strokeWidth={1}
      />
      <Key x={750} y={y + 88} anchor="end" fill={INK3} size={9}>
        PERCEIVED PERFORMANCE
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   12 · FOUR PLUS ONE — create, create, create, create, capture
   ========================================================================== */

export function FourPlusOne() {
  const x0 = 40;
  const pitch = 148;
  const w = 136;

  return (
    <Frame
      height={236}
      label="Five numbered steps. A bracket under steps one to four reads create value for customers; a bracket under step five reads capture value in return."
    >
      <Key x={x0} y={34} fill={INK3} size={9.5}>
        RESEARCH
      </Key>
      <line
        x1={x0 + 84}
        y1={30}
        x2={752}
        y2={30}
        stroke={RULE2}
        strokeWidth={1}
      />
      <path
        d={head1.right(760, 30)}
        fill="none"
        stroke={RULE2}
        strokeWidth={1}
      />
      <Key x={760} y={52} anchor="end" fill={INK3} size={9.5}>
        VALUE CAPTURE
      </Key>

      {[0, 1, 2, 3, 4].map((i) => {
        const last = i === 4;
        return (
          <g key={i}>
            <rect
              x={x0 + i * pitch}
              y={66}
              width={w}
              height={84}
              fill={last ? SIGNAL_TINT : COUNTER_TINT}
              stroke={last ? SIGNAL : COUNTER}
              strokeWidth={1.25}
            />
            <Display
              x={x0 + i * pitch + w / 2}
              y={124}
              anchor="middle"
              size={40}
              fill={last ? SIGNAL : COUNTER}
            >
              {i + 1}
            </Display>
          </g>
        );
      })}

      {/* brackets */}
      <path
        d={`M${x0} 164 L${x0} 174 L${x0 + 3 * pitch + w} 174 L${x0 + 3 * pitch + w} 164`}
        fill="none"
        stroke={COUNTER}
        strokeWidth={1.5}
      />
      <Key
        x={x0 + (3 * pitch + w) / 2}
        y={202}
        anchor="middle"
        fill={COUNTER}
        size={11.5}
      >
        CREATE VALUE FOR CUSTOMERS
      </Key>
      <path
        d={`M${x0 + 4 * pitch} 164 L${x0 + 4 * pitch} 174 L${x0 + 4 * pitch + w} 174 L${x0 + 4 * pitch + w} 164`}
        fill="none"
        stroke={SIGNAL}
        strokeWidth={1.5}
      />
      <Key
        x={x0 + 4 * pitch + w / 2}
        y={202}
        anchor="middle"
        fill={SIGNAL}
        size={11.5}
      >
        CAPTURE VALUE
      </Key>
      <Key
        x={x0 + 4 * pitch + w / 2}
        y={220}
        anchor="middle"
        fill={SIGNAL}
        size={11.5}
      >
        IN RETURN
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   13 · PARTITIONED FIELD — segmentation, then targeting
   ========================================================================== */

export function SegmentTarget() {
  const field = { x: 30, y: 62, w: 330, h: 190 };
  const vx1 = 30 + 110;
  const vx2 = 30 + 228;
  const hy1 = 62 + 88;
  const hy2 = 62 + 98;

  // Which of five regions a point falls in; region 3 is the target.
  const region = (px: number, py: number) => {
    if (px < vx1) return py < hy1 ? 0 : 1;
    if (py >= hy2) return 4;
    return px < vx2 ? 2 : 3;
  };

  const dots = Array.from({ length: 120 }, (_, i) => {
    const px = field.x + 8 + hash1(i + 1) * (field.w - 16);
    const py = field.y + 8 + hash1(i + 401) * (field.h - 16);
    return { px: +px.toFixed(1), py: +py.toFixed(1), r: region(px, py) };
  });

  const panel = (ox: number, targeted: boolean) => (
    <g transform={`translate(${ox} 0)`}>
      {targeted ? (
        <rect
          x={vx2}
          y={field.y}
          width={field.x + field.w - vx2}
          height={hy2 - field.y}
          fill={SIGNAL_TINT}
        />
      ) : null}
      <rect
        x={field.x}
        y={field.y}
        width={field.w}
        height={field.h}
        fill="none"
        stroke={INK}
        strokeWidth={1.25}
      />
      <line
        x1={vx1}
        y1={field.y}
        x2={vx1}
        y2={field.y + field.h}
        stroke={INK}
        strokeWidth={1}
      />
      <line
        x1={field.x}
        y1={hy1}
        x2={vx1}
        y2={hy1}
        stroke={INK}
        strokeWidth={1}
      />
      <line
        x1={vx1}
        y1={hy2}
        x2={field.x + field.w}
        y2={hy2}
        stroke={INK}
        strokeWidth={1}
      />
      <line
        x1={vx2}
        y1={field.y}
        x2={vx2}
        y2={hy2}
        stroke={INK}
        strokeWidth={1}
      />
      {targeted ? (
        <rect
          x={vx2}
          y={field.y}
          width={field.x + field.w - vx2}
          height={hy2 - field.y}
          fill="none"
          stroke={SIGNAL}
          strokeWidth={2.5}
        />
      ) : null}
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={d.px}
          cy={d.py}
          r={3}
          fill={targeted ? (d.r === 3 ? SIGNAL : RULE2) : INK3}
        />
      ))}
    </g>
  );

  return (
    <Frame
      height={300}
      label="Two panels of the same market. Segmentation divides the dots into five segments; targeting selects one segment to enter and fades the rest."
    >
      <Key x={field.x} y={30} fill={INK} size={11}>
        SEGMENTATION
      </Key>
      <Note x={field.x} y={49} size={13} fill={INK2}>
        dividing the market
      </Note>
      {panel(0, false)}

      <line
        x1={field.x + field.w + 12}
        y1={157}
        x2={field.x + field.w + 60}
        y2={157}
        stroke={INK}
        strokeWidth={1.5}
      />
      <path
        d={head1.right(field.x + field.w + 62, 157)}
        fill="none"
        stroke={INK}
        strokeWidth={1.5}
      />

      <Key x={field.x + 410} y={30} fill={SIGNAL} size={11}>
        TARGETING
      </Key>
      <Note x={field.x + 410} y={49} size={13} fill={INK2}>
        selecting segments to enter
      </Note>
      {panel(410, true)}
    </Frame>
  );
}

/* ==========================================================================
   14 · CYCLE + NETWORK — relationships, managed two ways
   ========================================================================== */

export function RelationshipCycle() {
  const c = { x: 214, y: 172 };
  const r = 104;
  const gap = 14; // degrees trimmed from each end of an arc
  const stages = [
    {
      from: -90,
      label: "ACQUIRING",
      lx: c.x,
      ly: c.y - r - 22,
      anchor: "middle" as Anchor,
    },
    {
      from: 0,
      label: "ENGAGING",
      lx: c.x + r + 18,
      ly: c.y + 4,
      anchor: "start" as Anchor,
    },
    {
      from: 90,
      label: "KEEPING",
      lx: c.x,
      ly: c.y + r + 32,
      anchor: "middle" as Anchor,
    },
    {
      from: 180,
      label: "GROWING",
      lx: c.x - r - 18,
      ly: c.y + 4,
      anchor: "end" as Anchor,
    },
  ];

  const pt = (deg: number) => {
    const t = (deg * Math.PI) / 180;
    return { x: c.x + r * Math.cos(t), y: c.y + r * Math.sin(t), t };
  };

  // network
  const n = { x: 624, y: 172 };
  const nr = 112;
  const people = [0, 60, 120, 180, 240, 300].map((deg) => {
    const t = ((deg - 90) * Math.PI) / 180;
    return {
      x: +(n.x + nr * Math.cos(t)).toFixed(2),
      y: +(n.y + nr * Math.sin(t)).toFixed(2),
    };
  });

  return (
    <Frame
      height={330}
      label="Left: a cycle of acquiring, engaging, keeping and growing customers around all company touchpoints. Right: a brand at the centre, linked to consumers who are also linked to each other."
    >
      {/* ---- cycle ---- */}
      {stages.map((s, i) => {
        const a = pt(s.from + gap);
        const b = pt(s.from + 90 - gap);
        const tone = i === 0 ? SIGNAL : COUNTER;
        return (
          <g key={s.label}>
            <path
              d={`M${a.x.toFixed(2)} ${a.y.toFixed(2)} A${r} ${r} 0 0 1 ${b.x.toFixed(2)} ${b.y.toFixed(2)}`}
              fill="none"
              stroke={tone}
              strokeWidth={3}
            />
            <path
              d={headAlong1(b.x, b.y, -Math.sin(b.t), Math.cos(b.t), 9)}
              fill="none"
              stroke={tone}
              strokeWidth={2.5}
            />
            <Key x={s.lx} y={s.ly} anchor={s.anchor} fill={INK} size={11}>
              {s.label}
            </Key>
          </g>
        );
      })}
      <Key x={c.x} y={c.y - 4} anchor="middle" fill={INK3} size={9.5}>
        ALL COMPANY
      </Key>
      <Key x={c.x} y={c.y + 12} anchor="middle" fill={INK3} size={9.5}>
        TOUCHPOINTS
      </Key>

      <line x1={424} y1={30} x2={424} y2={310} stroke={RULE} strokeWidth={1} />

      {/* ---- network ---- */}
      {people.map((p, i) => {
        const q = people[(i + 1) % people.length];
        const q2 = people[(i + 2) % people.length];
        return (
          <g key={`e${i}`}>
            <line
              x1={n.x}
              y1={n.y}
              x2={p.x}
              y2={p.y}
              stroke={SIGNAL}
              strokeWidth={1.5}
            />
            <line
              x1={p.x}
              y1={p.y}
              x2={q.x}
              y2={q.y}
              stroke={COUNTER}
              strokeWidth={1.25}
              strokeDasharray="4 4"
            />
            {i % 2 === 0 ? (
              <line
                x1={p.x}
                y1={p.y}
                x2={q2.x}
                y2={q2.y}
                stroke={COUNTER}
                strokeWidth={1}
                strokeDasharray="2 5"
              />
            ) : null}
          </g>
        );
      })}
      {people.map((p, i) => (
        <circle
          key={`p${i}`}
          cx={p.x}
          cy={p.y}
          r={14}
          fill={PAPER}
          stroke={COUNTER}
          strokeWidth={1.5}
        />
      ))}
      <rect x={n.x - 36} y={n.y - 18} width={72} height={36} fill={SIGNAL} />
      <Key x={n.x} y={n.y + 4} anchor="middle" fill={PAPER} size={11}>
        BRAND
      </Key>
      <Key x={n.x} y={316} anchor="middle" fill={COUNTER} size={10}>
        CONSUMERS CONNECT WITH BRANDS AND EACH OTHER
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   15 · INCOME STREAM — a single sale versus a lifetime of patronage
   ========================================================================== */

export function LifetimeStream() {
  const base = 178;
  const cut = 6;
  const bars = Array.from({ length: 24 }, (_, i) => ({
    x: 74 + i * 28,
    h: Math.round(30 + hash1(i + 11) * 36),
  }));
  const last = bars[bars.length - 1];
  const w = 16;

  return (
    <Frame
      height={250}
      label="Schematic. One customer's purchases as a row of bars over a lifetime of patronage. At the point the customer is lost, one bar is a single sale; every bar after it is the entire future income stream."
    >
      <Schematic />
      <line x1={50} y1={base} x2={762} y2={base} stroke={INK} strokeWidth={1} />
      <path
        d={head1.right(770, base)}
        fill="none"
        stroke={INK}
        strokeWidth={1}
      />
      <Key x={770} y={base + 24} anchor="end" fill={INK3} size={9.5}>
        A LIFETIME OF PATRONAGE
      </Key>

      {bars.map((b, i) => {
        const y = base - b.h;
        if (i < cut)
          return (
            <rect key={i} x={b.x} y={y} width={w} height={b.h} fill={INK3} />
          );
        if (i === cut)
          return (
            <rect key={i} x={b.x} y={y} width={w} height={b.h} fill={SIGNAL} />
          );
        return (
          <rect
            key={i}
            x={b.x + 0.75}
            y={y + 0.75}
            width={w - 1.5}
            height={b.h - 1.5}
            fill={SIGNAL_TINT}
            stroke={SIGNAL}
            strokeWidth={1}
            strokeDasharray="3 2"
          />
        );
      })}

      {/* the cut */}
      <line
        x1={bars[cut].x - 6}
        y1={48}
        x2={bars[cut].x - 6}
        y2={base + 10}
        stroke={INK}
        strokeWidth={1.25}
        strokeDasharray="4 3"
      />
      <Key x={bars[cut].x - 14} y={60} anchor="end" fill={INK} size={10.5}>
        CUSTOMER LOST
      </Key>

      {/* single sale */}
      <Key
        x={bars[cut].x + w / 2}
        y={base + 24}
        anchor="middle"
        fill={SIGNAL}
        size={10}
      >
        A SINGLE SALE
      </Key>

      {/* future stream */}
      <path
        d={`M${bars[cut + 1].x} 92 L${bars[cut + 1].x} 82 L${last.x + w} 82 L${last.x + w} 92`}
        fill="none"
        stroke={SIGNAL}
        strokeWidth={1.5}
      />
      <Key
        x={(bars[cut + 1].x + last.x + w) / 2}
        y={70}
        anchor="middle"
        fill={SIGNAL}
        size={11}
      >
        THE ENTIRE FUTURE INCOME STREAM
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   16 · ONE BAR — share of customer
   ========================================================================== */

export function ShareOfCustomer() {
  const x0 = 50;
  const x1 = 750;
  const split = 300;
  return (
    <Frame
      height={140}
      label="Schematic. One bar is all of a customer's purchasing in a product category. The company's portion is marked as share of customer."
    >
      <Key x={x1} y={24} anchor="end" fill={INK3} size={9.5}>
        {"THE CUSTOMER'S PURCHASING IN THE CATEGORY"}
      </Key>
      <rect x={x0} y={42} width={x1 - x0} height={40} fill={RULE} />
      <rect x={x0} y={42} width={split - x0} height={40} fill={SIGNAL} />
      <Key x={x0 + 14} y={67} fill={PAPER} size={10.5}>
        THE COMPANY
      </Key>
      <path
        d={`M${x0} 94 L${x0} 104 L${split} 104 L${split} 94`}
        fill="none"
        stroke={SIGNAL}
        strokeWidth={1.5}
      />
      <Key x={(x0 + split) / 2} y={128} anchor="middle" fill={SIGNAL} size={11}>
        SHARE OF CUSTOMER
      </Key>
      <Schematic x={x1} y={128} />
    </Frame>
  );
}

/* ==========================================================================
   17 · LEDGER ACROSS "NOW" — the past, and the future value of the firm
   ========================================================================== */

export function EquityLedger() {
  const now = 300;
  const x0 = now + 14;
  const rows = [
    ...[0, 1, 2, 3].map((i) => ({
      y: 76 + i * 24,
      len: Math.round(150 + hash1(i + 71) * 230),
      potential: false,
    })),
    ...[0, 1, 2].map((i) => ({
      y: 188 + i * 24,
      len: Math.round(110 + hash1(i + 91) * 200),
      potential: true,
    })),
  ];

  return (
    <Frame
      height={320}
      label="Schematic. A line marks now. To the left, sales and market share reflect the past. To the right, lifetime value streams from current and potential customers add up to customer equity."
    >
      <Schematic />

      {/* now */}
      <line x1={now} y1={50} x2={now} y2={270} stroke={INK} strokeWidth={1.5} />
      <Key x={now} y={40} anchor="middle" fill={INK} size={10.5}>
        NOW
      </Key>

      {/* the past */}
      <Key x={160} y={40} anchor="middle" fill={INK3} size={10}>
        REFLECT THE PAST
      </Key>
      <rect x={130} y={100} width={now - 136} height={16} fill={RULE2} />
      <Key x={120} y={112} anchor="end" fill={INK} size={10}>
        SALES
      </Key>
      <rect x={170} y={150} width={now - 176} height={16} fill={RULE2} />
      <Key x={160} y={162} anchor="end" fill={INK} size={10}>
        MARKET SHARE
      </Key>

      {/* the future */}
      <Key x={520} y={40} anchor="middle" fill={COUNTER} size={10}>
        SUGGESTS THE FUTURE
      </Key>
      {rows.map((r, i) => (
        <rect
          key={i}
          x={x0 + (r.potential ? 0.75 : 0)}
          y={r.y + (r.potential ? 0.75 : 0)}
          width={r.len - (r.potential ? 1.5 : 0)}
          height={r.potential ? 12.5 : 14}
          fill={r.potential ? "none" : COUNTER}
          stroke={r.potential ? COUNTER : "none"}
          strokeWidth={1.25}
          strokeDasharray={r.potential ? "4 3" : undefined}
        />
      ))}
      <path
        d="M698 72 L706 72 L706 162 L698 162"
        fill="none"
        stroke={COUNTER}
        strokeWidth={1.25}
      />
      <Key x={714} y={121} fill={COUNTER} size={10}>
        CURRENT
      </Key>
      <path
        d="M698 184 L706 184 L706 250 L698 250"
        fill="none"
        stroke={COUNTER}
        strokeWidth={1.25}
      />
      <Key x={714} y={221} fill={COUNTER} size={10}>
        POTENTIAL
      </Key>

      <path
        d={`M${x0} 270 L${x0} 280 L704 280 L704 270`}
        fill="none"
        stroke={SIGNAL}
        strokeWidth={1.5}
      />
      <Key x={(x0 + 704) / 2} y={304} anchor="middle" fill={SIGNAL} size={12}>
        CUSTOMER EQUITY
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   18 · QUADRANT — strangers, butterflies, true friends, barnacles
   ========================================================================== */

export function RelationshipGroups() {
  const g = { x: 170, y: 30, w: 560, h: 280 };
  const mx = g.x + g.w / 2;
  const my = g.y + g.h / 2;
  const cells = [
    { x: g.x, y: g.y, name: "Butterflies", fill: COUNTER_TINT, tone: COUNTER },
    { x: mx, y: g.y, name: "True friends", fill: SIGNAL_TINT, tone: SIGNAL },
    {
      x: g.x,
      y: my,
      name: "Strangers",
      fill: "rgba(23, 22, 15, 0.04)",
      tone: INK3,
    },
    {
      x: mx,
      y: my,
      name: "Barnacles",
      fill: "rgba(23, 22, 15, 0.08)",
      tone: INK,
    },
  ];

  return (
    <Frame
      height={370}
      label="A two-by-two grid. Potential profitability runs up, projected loyalty runs right. High profitability with low loyalty: butterflies. High with high: true friends. Low with low: strangers. Low profitability with high loyalty: barnacles."
    >
      {cells.map((c) => (
        <g key={c.name}>
          <rect
            x={c.x}
            y={c.y}
            width={g.w / 2}
            height={g.h / 2}
            fill={c.fill}
            stroke={PAPER}
            strokeWidth={2}
          />
          <Display
            x={c.x + g.w / 4}
            y={c.y + g.h / 4 + 10}
            anchor="middle"
            size={30}
            fill={c.tone}
          >
            {c.name}
          </Display>
        </g>
      ))}
      <rect
        x={g.x}
        y={g.y}
        width={g.w}
        height={g.h}
        fill="none"
        stroke={INK}
        strokeWidth={1.25}
      />

      {/* y axis */}
      <line
        x1={g.x - 20}
        y1={g.y + g.h}
        x2={g.x - 20}
        y2={g.y + 8}
        stroke={INK3}
        strokeWidth={1}
      />
      <path
        d={head1.up(g.x - 20, g.y + 2)}
        fill="none"
        stroke={INK3}
        strokeWidth={1}
      />
      <Key x={g.x - 32} y={g.y + 12} anchor="end" fill={INK3} size={9.5}>
        HIGH
      </Key>
      <Key x={g.x - 32} y={g.y + g.h} anchor="end" fill={INK3} size={9.5}>
        LOW
      </Key>
      <g transform={`translate(${g.x - 60} ${my}) rotate(-90)`}>
        <Key x={0} y={0} anchor="middle" fill={INK} size={10.5}>
          POTENTIAL PROFITABILITY
        </Key>
      </g>

      {/* x axis */}
      <line
        x1={g.x}
        y1={g.y + g.h + 20}
        x2={g.x + g.w - 8}
        y2={g.y + g.h + 20}
        stroke={INK3}
        strokeWidth={1}
      />
      <path
        d={head1.right(g.x + g.w - 2, g.y + g.h + 20)}
        fill="none"
        stroke={INK3}
        strokeWidth={1}
      />
      <Key x={g.x} y={g.y + g.h + 44} fill={INK3} size={9.5}>
        LOW
      </Key>
      <Key x={g.x + g.w} y={g.y + g.h + 44} anchor="end" fill={INK3} size={9.5}>
        HIGH
      </Key>
      <Key x={mx} y={g.y + g.h + 44} anchor="middle" fill={INK} size={10.5}>
        PROJECTED LOYALTY
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   19 · FIVE TO ONE — the reported cost of acquiring versus retaining
   Drawn to the ratio the discussion itself gives.
   ========================================================================== */

export function AcquireRetain() {
  const x0 = 280;
  const w = 82;
  const pitch = 90;
  return (
    <Frame
      height={176}
      label="Five equal blocks to acquire a new customer, one block to retain an existing one."
    >
      <Key x={x0 - 24} y={62} anchor="end" fill={INK} size={10.5}>
        ACQUIRE A NEW CUSTOMER
      </Key>
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x={x0 + i * pitch}
          y={38}
          width={w}
          height={36}
          fill={SIGNAL}
        />
      ))}
      <Display x={x0 + 5 * pitch + 10} y={68} size={30} fill={SIGNAL}>
        5×
      </Display>

      <Key x={x0 - 24} y={134} anchor="end" fill={INK} size={10.5}>
        RETAIN AN EXISTING ONE
      </Key>
      <rect x={x0} y={110} width={w} height={36} fill={COUNTER} />
      <Display x={x0 + pitch + 10} y={140} size={30} fill={COUNTER}>
        1×
      </Display>
    </Frame>
  );
}
