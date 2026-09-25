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
     · keys are set in the body grotesque, uppercase and tracked (no mono)
   ========================================================================== */

import React from "react";
import { Smiley, SmileySad, SmileyWink } from "@phosphor-icons/react";
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
  r2,
  RULE,
  RULE2,
  SIGNAL,
  SIGNAL_TINT,
} from "../_visuals/kit";
import { Chip1 } from "../_visuals/objects";

/* -- small typographic helpers ------------------------------------------- */

/* ==========================================================================
   1 · ICEBERG — selling is the visible tip
   ========================================================================== */

export function MarketingIceberg() {
  const water = 110;
  const below = [
    { y: 216, text: "CREATING VALUE" },
    { y: 242, text: "DELIVERING VALUE" },
    { y: 268, text: "COMMUNICATING VALUE" },
    { y: 310, text: "STRONG, PROFITABLE" },
    { y: 326, text: "CUSTOMER RELATIONSHIPS" },
    { y: 362, text: "CAPTURING VALUE IN RETURN" },
  ];

  return (
    <Frame
      width={400}
      height={430}
      label="An iceberg. Selling is the small visible tip above the waterline. Modern marketing is the far larger mass below: creating, delivering and communicating value, strong, profitable customer relationships, and capturing value in return."
    >
      {/* water */}
      <rect x={0} y={water} width={400} height={430 - water} fill={COUNTER_TINT} />
      <line
        x1={0}
        y1={water}
        x2={400}
        y2={water}
        stroke={COUNTER}
        strokeWidth={1}
      />

      {/* the tip */}
      <path
        d={`M154 ${water} L180 66 L198 44 L216 62 L246 ${water} Z`}
        fill={SIGNAL_TINT}
        stroke={SIGNAL}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <line x1={224} y1={72} x2={262} y2={60} stroke={SIGNAL} strokeWidth={1} />
      <Key x={268} y={58} fill={SIGNAL} size={12}>
        SELLING
      </Key>
      <Note x={268} y={76} size={12.5} fill={INK2}>
        the visible tip
      </Note>

      {/* the mass */}
      <path
        d={`M154 ${water} L118 158 L48 246 L32 330 L92 396 L200 414 L308 396 L368 330 L352 246 L282 158 L246 ${water} Z`}
        fill={PAPER}
        stroke={COUNTER}
        strokeWidth={1.25}
        strokeLinejoin="round"
      />
      <Key x={200} y={176} anchor="middle" fill={COUNTER} size={11}>
        MODERN MARKETING
      </Key>
      <line x1={160} y1={192} x2={240} y2={192} stroke={COUNTER} strokeWidth={1} />
      {below.map((b) => (
        <Key key={b.text} x={200} y={b.y} anchor="middle" fill={INK} size={11}>
          {b.text}
        </Key>
      ))}
      <line x1={150} y1={288} x2={250} y2={288} stroke={RULE2} strokeWidth={1} />
      <line x1={150} y1={342} x2={250} y2={342} stroke={RULE2} strokeWidth={1} />
    </Frame>
  );
}

/* ==========================================================================
   2 · EXCHANGE LOOP — create value, capture value in return
   ========================================================================== */

export function ValueExchange() {
  return (
    <Frame
      width={400}
      height={250}
      label="A company above, customers below. A teal arrow runs down from the company: create customer value. A persimmon arrow runs back up from customers: capture value in return."
    >
      {/* company */}
      <rect x={110} y={12} width={180} height={56} fill={PAPER} stroke={INK} strokeWidth={1.25} />
      <Key x={200} y={44} anchor="middle" fill={INK} size={12.5}>
        COMPANY
      </Key>

      {/* customers */}
      <rect x={110} y={182} width={180} height={56} fill={PAPER} stroke={INK} strokeWidth={1.25} />
      <Key x={200} y={214} anchor="middle" fill={INK} size={12.5}>
        CUSTOMERS
      </Key>

      {/* create, down */}
      <line x1={170} y1={76} x2={170} y2={172} stroke={COUNTER} strokeWidth={2} />
      <path d={head1.down(170, 174)} fill="none" stroke={COUNTER} strokeWidth={2} />
      <Key x={158} y={120} anchor="end" fill={COUNTER} size={11}>
        CREATE
      </Key>
      <Key x={158} y={136} anchor="end" fill={COUNTER} size={11}>
        CUSTOMER VALUE
      </Key>

      {/* capture, up */}
      <line x1={230} y1={78} x2={230} y2={174} stroke={SIGNAL} strokeWidth={2} />
      <path d={head1.up(230, 76)} fill="none" stroke={SIGNAL} strokeWidth={2} />
      <Key x={242} y={120} fill={SIGNAL} size={11}>
        CAPTURE VALUE
      </Key>
      <Key x={242} y={136} fill={SIGNAL} size={11}>
        IN RETURN
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   3 · ATTRACT / KEEP — the dual goal
   ========================================================================== */

export function AttractKeep() {
  const cx = [106, 294];
  const cy = 66;
  const r = 46;
  // A loop arrow that runs around most of the ring.
  const a0 = (-60 * Math.PI) / 180;
  const a1 = (230 * Math.PI) / 180;
  const rr = r - 12;
  const sx = r2(cx[1] + rr * Math.cos(a0));
  const sy = r2(cy + rr * Math.sin(a0));
  const ex = r2(cx[1] + rr * Math.cos(a1));
  const ey = r2(cy + rr * Math.sin(a1));

  return (
    <Frame
      width={400}
      height={160}
      label="Two goals. Attract new customers: an arrow enters the circle from outside. Keep current customers: an arrow circles inside it."
    >
      {/* attract */}
      <circle cx={cx[0]} cy={cy} r={r} fill={PAPER} stroke={INK3} strokeWidth={1} />
      <line x1={16} y1={cy} x2={cx[0] - 6} y2={cy} stroke={COUNTER} strokeWidth={2} />
      <path d={head1.right(cx[0] - 4, cy)} fill="none" stroke={COUNTER} strokeWidth={2} />
      <circle cx={16} cy={cy} r={5} fill={COUNTER} />
      <Key x={cx[0]} y={144} anchor="middle" fill={COUNTER} size={14}>
        ATTRACT NEW
      </Key>

      {/* keep */}
      <circle cx={cx[1]} cy={cy} r={r} fill={PAPER} stroke={INK3} strokeWidth={1} />
      <path
        d={`M${sx} ${sy} A${rr} ${rr} 0 1 1 ${ex} ${ey}`}
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
      <Key x={cx[1]} y={144} anchor="middle" fill={SIGNAL} size={14}>
        KEEP CURRENT
      </Key>

      <line x1={200} y1={16} x2={200} y2={124} stroke={RULE} strokeWidth={1} />
    </Frame>
  );
}

/* ==========================================================================
   4 · INWARD / OUTWARD — the danger shared by production and product
   ========================================================================== */

export function InwardOutward() {
  const panels = [
    { cx: 100, inward: true },
    { cx: 300, inward: false },
  ];
  const cy = 114;
  const ring = 80;
  const angles = [0, 45, 90, 135, 180, 225, 270, 315];

  return (
    <Frame
      width={400}
      height={230}
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
              x={cx - 42}
              y={cy - 15}
              width={84}
              height={30}
              fill={PAPER}
              stroke={INK}
              strokeWidth={1.25}
            />
            <Key x={cx} y={cy + 3.5} anchor="middle" fill={INK} size={9}>
              OPERATIONS
            </Key>
            {angles.map((deg) => {
              const t = (deg * Math.PI) / 180;
              const dx = Math.cos(t);
              const dy = Math.sin(t);
              // start/end radii measured from the centre
              const near = 36;
              const far = inward ? 60 : ring - 9;
              const [r0, r1] = inward ? [far, near] : [near, far];
              const x0 = cx + dx * r0 * 1.15;
              const y0 = r2(cy + dy * r0 * 0.9);
              const x1 = cx + dx * r1 * 1.15;
              const y1 = r2(cy + dy * r1 * 0.9);
              const clampX = (v: number) =>
                r2(Math.max(cx - ring + 6, Math.min(cx + ring - 6, v)));
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
              y={cy - ring - 10}
              anchor="middle"
              fill={inward ? INK3 : COUNTER}
              size={10}
            >
              CUSTOMER NEEDS
            </Key>
            <Key
              x={cx}
              y={cy + ring + 26}
              anchor="middle"
              fill={tone}
              size={12}
            >
              {inward ? "INWARD" : "OUTWARD"}
            </Key>
          </g>
        );
      })}
      <line x1={200} y1={24} x2={200} y2={212} stroke={RULE} strokeWidth={1} />
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
  const heads = ["STARTING POINT", "FOCUS", "MEANS", "ENDS"];
  const rowTop = (i: number) => 144 + i * 74;
  const lanes = [
    {
      cx: 188,
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
      cx: 328,
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
      width={400}
      height={432}
      label="Two columns. Selling runs inside-out, down from factory to existing products, heavy selling and sales volume. Marketing runs outside-in, down from well-defined market to customer needs, integrating all marketing activities and profits through customer satisfaction."
    >
      {heads.map((h, i) => (
        <Key key={h} x={8} y={rowTop(i) + 20} fill={INK3} size={9}>
          {h}
        </Key>
      ))}
      <line x1={8} y1={128} x2={392} y2={128} stroke={RULE2} strokeWidth={1} />
      <line x1={258} y1={10} x2={258} y2={422} stroke={RULE} strokeWidth={1} />

      {lanes.map((lane) => (
        <g key={lane.name}>
          <Key x={lane.cx} y={16} anchor="middle" fill={INK} size={11}>
            {lane.name}
          </Key>
          <DirectionGlyph
            cx={lane.cx}
            cy={64}
            outward={lane.outward}
            tone={lane.tone}
          />
          <Key x={lane.cx} y={118} anchor="middle" fill={lane.tone} size={10}>
            {lane.dir}
          </Key>

          {lane.stages.map((lines, i) => {
            const top = rowTop(i);
            return (
              <g key={i}>
                {i > 0 ? (
                  <path
                    d={head1.down(lane.cx, top - 2)}
                    fill="none"
                    stroke={lane.tone}
                    strokeWidth={1.5}
                  />
                ) : null}
                <line
                  x1={lane.cx - 50}
                  y1={top}
                  x2={lane.cx + 50}
                  y2={top}
                  stroke={lane.tone}
                  strokeWidth={i === 3 ? 3 : 1.5}
                />
                {lines.map((l, j) => (
                  <Note
                    key={j}
                    x={lane.cx}
                    y={top + 20 + j * 17}
                    size={13.5}
                    fill={INK}
                    anchor="middle"
                  >
                    {l}
                  </Note>
                ))}
              </g>
            );
          })}
        </g>
      ))}
    </Frame>
  );
}

/* ==========================================================================
   6 · TRIANGLE — the three considerations in balance
   ========================================================================== */

export function SocietalTriangle() {
  const T = { x: 200, y: 42 };
  const L = { x: 72, y: 248 };
  const R = { x: 328, y: 248 };

  return (
    <Frame
      width={400}
      height={290}
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

      <Key x={T.x} y={T.y - 18} anchor="middle" fill={INK} size={11.5}>
        PUBLIC INTEREST
      </Key>
      <Key x={L.x} y={L.y + 30} anchor="middle" fill={INK} size={11}>
        CONSUMER WANTS
      </Key>
      <Key x={R.x} y={R.y + 30} anchor="middle" fill={INK} size={11}>
        COMPANY PROFITS
      </Key>

      <Key x={200} y={176} anchor="middle" fill={SIGNAL} size={11.5}>
        SUSTAINABLE
      </Key>
      <Key x={200} y={194} anchor="middle" fill={SIGNAL} size={11.5}>
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
      width={400}
      height={240}
      label="An eye looking out. A narrow persimmon beam reaches only the railroad business. A wide teal beam takes in the transportation business."
    >
      {/* wide beam */}
      <path
        d="M70 120 L392 14 L392 226 Z"
        fill={COUNTER_TINT}
        stroke={COUNTER}
        strokeWidth={1}
      />
      {/* narrow beam */}
      <path
        d="M70 120 L392 106 L392 134 Z"
        fill={SIGNAL_TINT}
        stroke={SIGNAL}
        strokeWidth={1.25}
      />

      {/* eye */}
      <path
        d="M10 120 Q40 94 68 120 Q40 146 10 120 Z"
        fill={PAPER}
        stroke={INK}
        strokeWidth={1.5}
      />
      <circle cx={39} cy={120} r={8} fill={INK} />
      <circle cx={42} cy={117} r={2.2} fill={PAPER} />

      <Key x={382} y={90} anchor="end" fill={COUNTER} size={10}>
        TRANSPORTATION BUSINESS
      </Key>
      <Key x={382} y={124} anchor="end" fill={SIGNAL} size={10}>
        RAILROAD BUSINESS
      </Key>
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
  const x0 = 10;
  const h = 18;
  const offers = [
    { top: 12, b: 240, c: 124, name: "THIS OFFER", on: true },
    { top: 84, b: 300, c: 236, name: "COMPETING OFFER", on: false },
    { top: 156, b: 180, c: 96, name: "COMPETING OFFER", on: false },
  ];

  return (
    <Frame
      width={400}
      height={224}
      label="Three offers, each drawn as a benefits bar above a costs bar. The stretch of benefits beyond the costs is perceived value; this offer's is the longest, even though one competing offer has more benefits and more costs."
    >

      {offers.map((o) => {
        const by = o.top + 16;
        const cy = by + h + 6;
        const mid = cy + h / 2;
        const bEnd = x0 + o.b;
        const cEnd = x0 + o.c;
        const tone = o.on ? SIGNAL : INK3;
        const sw = o.on ? 2 : 1.25;
        return (
          <g key={o.top}>
            <Key x={x0} y={o.top + 10} fill={o.on ? INK : INK3} size={9.5}>
              {o.name}
            </Key>
            <rect
              x={x0}
              y={by}
              width={o.b}
              height={h}
              fill={o.on ? COUNTER : "rgba(34, 87, 91, 0.4)"}
            />
            <rect
              x={x0}
              y={cy}
              width={o.c}
              height={h}
              fill={o.on ? INK3 : "rgba(111, 106, 92, 0.4)"}
            />
            {o.on ? (
              <>
                <Key x={x0 + 8} y={by + 12.5} fill={PAPER} size={9}>
                  ALL THE BENEFITS
                </Key>
                <Key x={x0 + 8} y={cy + 12.5} fill={PAPER} size={9}>
                  ALL THE COSTS
                </Key>
              </>
            ) : null}
            {/* the benefits end, carried down into the costs row */}
            <line
              x1={bEnd}
              y1={by + h}
              x2={bEnd}
              y2={cy + h}
              stroke={tone}
              strokeWidth={1}
              strokeDasharray="3 3"
            />
            {/* the difference: benefits beyond costs */}
            <line
              x1={cEnd + 3}
              y1={mid}
              x2={bEnd - 3}
              y2={mid}
              stroke={tone}
              strokeWidth={sw}
            />
            <path d={head1.left(cEnd + 2, mid)} fill="none" stroke={tone} strokeWidth={sw} />
            <path d={head1.right(bEnd - 2, mid)} fill="none" stroke={tone} strokeWidth={sw} />
            {o.on ? (
              <Key x={bEnd + 10} y={mid + 3.5} fill={SIGNAL} size={10}>
                PERCEIVED VALUE
              </Key>
            ) : null}
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
  const band = 76;
  const bh = 34;
  const axis = band + bh + 12;
  const zones = [
    {
      x0: 10,
      x1: 168,
      k: "FALLS SHORT",
      v: "DISSATISFIED",
      Face: SmileySad,
      fill: "rgba(23, 22, 15, 0.07)",
      tone: INK3,
    },
    {
      x0: 168,
      x1: 232,
      k: "MATCHES",
      v: "SATISFIED",
      Face: Smiley,
      fill: COUNTER_TINT,
      tone: COUNTER,
    },
    {
      x0: 232,
      x1: 390,
      k: "EXCEEDS",
      v: "DELIGHTED",
      Face: SmileyWink,
      fill: SIGNAL_TINT,
      tone: SIGNAL,
    },
  ];
  const s = 34;

  return (
    <Frame
      width={400}
      height={170}
      label="Perceived performance runs along an arrow, with the buyer's expectations marked in the middle. Performance that falls short gets a sad face, dissatisfied; performance that matches gets a smile, satisfied; performance that exceeds gets a beaming wink, delighted."
    >
      {zones.map((z) => {
        const cx = (z.x0 + z.x1) / 2;
        return (
          <g key={z.k}>
            <z.Face x={cx - s / 2} y={8} size={s} weight="duotone" color={z.tone} />
            <Key x={cx} y={62} anchor="middle" fill={z.tone} size={11}>
              {z.v}
            </Key>
            <rect x={z.x0} y={band} width={z.x1 - z.x0} height={bh} fill={z.fill} />
            <Key x={cx} y={band + 21} anchor="middle" fill={z.tone} size={8.5}>
              {z.k}
            </Key>
          </g>
        );
      })}

      {/* perceived performance, with expectations as a point on it */}
      <line x1={10} y1={axis} x2={388} y2={axis} stroke={INK3} strokeWidth={1} />
      <path d={head1.right(390, axis)} fill="none" stroke={INK3} strokeWidth={1} />
      <path d={`M200 ${axis - 6} L208 ${axis + 7} L192 ${axis + 7} Z`} fill={INK} />
      <Key x={200} y={axis + 24} anchor="middle" fill={INK} size={9.5}>
        EXPECTATIONS
      </Key>
      <Key x={390} y={axis + 40} anchor="end" fill={INK3} size={8.5}>
        PERCEIVED PERFORMANCE
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   12 · FOUR PLUS ONE — create, create, create, create, capture
   ========================================================================== */

export function FourPlusOne() {
  const x0 = 12;
  const pitch = 76;
  const w = 68;
  const end = x0 + 4 * pitch + w;

  return (
    <Frame
      width={400}
      height={176}
      label="Five numbered steps along an arrow from research to value capture. A bracket under steps one to four reads create value for customers; a bracket under step five reads capture value in return."
    >
      <Key x={x0} y={24} fill={INK3} size={9}>
        RESEARCH
      </Key>
      <line x1={x0 + 72} y1={20} x2={end - 6} y2={20} stroke={RULE2} strokeWidth={1} />
      <path d={head1.right(end, 20)} fill="none" stroke={RULE2} strokeWidth={1} />
      <Key x={end} y={40} anchor="end" fill={INK3} size={9}>
        VALUE CAPTURE
      </Key>

      {[0, 1, 2, 3, 4].map((i) => {
        const last = i === 4;
        return (
          <g key={i}>
            <rect
              x={x0 + i * pitch}
              y={52}
              width={w}
              height={60}
              fill={last ? SIGNAL_TINT : COUNTER_TINT}
              stroke={last ? SIGNAL : COUNTER}
              strokeWidth={1.25}
            />
            <Display
              x={x0 + i * pitch + w / 2}
              y={94}
              anchor="middle"
              size={30}
              fill={last ? SIGNAL : COUNTER}
            >
              {i + 1}
            </Display>
          </g>
        );
      })}

      {/* brackets */}
      <path
        d={`M${x0} 122 L${x0} 130 L${x0 + 3 * pitch + w} 130 L${x0 + 3 * pitch + w} 122`}
        fill="none"
        stroke={COUNTER}
        strokeWidth={1.5}
      />
      <Key
        x={x0 + (3 * pitch + w) / 2}
        y={152}
        anchor="middle"
        fill={COUNTER}
        size={10}
      >
        CREATE VALUE FOR CUSTOMERS
      </Key>
      <path
        d={`M${x0 + 4 * pitch} 122 L${x0 + 4 * pitch} 130 L${end} 130 L${end} 122`}
        fill="none"
        stroke={SIGNAL}
        strokeWidth={1.5}
      />
      <Key x={x0 + 4 * pitch + w / 2} y={152} anchor="middle" fill={SIGNAL} size={9.5}>
        CAPTURE VALUE
      </Key>
      <Key x={x0 + 4 * pitch + w / 2} y={166} anchor="middle" fill={SIGNAL} size={9.5}>
        IN RETURN
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   13 · PARTITIONED FIELD — segmentation, then targeting
   ========================================================================== */

export function SegmentTarget() {
  const field = { x: 30, y: 66, w: 330, h: 190 };
  const vx1 = 30 + 110;
  const vx2 = 30 + 228;
  const hy1 = 66 + 88;
  const hy2 = 66 + 98;

  // Which of five regions a point falls in; region 3 is the target.
  const region = (px: number, py: number) => {
    if (px < vx1) return py < hy1 ? 0 : 1;
    if (py >= hy2) return 4;
    return px < vx2 ? 2 : 3;
  };

  // A dot on a divider belongs to no segment, so keep dots clear of them.
  const nearDivider = (px: number, py: number) =>
    Math.abs(px - vx1) < 6 ||
    (px < vx1 && Math.abs(py - hy1) < 6) ||
    (px > vx1 && Math.abs(py - hy2) < 6) ||
    (py < hy2 && Math.abs(px - vx2) < 6);

  const dots = Array.from({ length: 120 }, (_, i) => {
    const px = field.x + 8 + hash1(i + 1) * (field.w - 16);
    const py = field.y + 8 + hash1(i + 401) * (field.h - 16);
    return { px: +px.toFixed(1), py: +py.toFixed(1), r: region(px, py) };
  }).filter((d) => !nearDivider(d.px, d.py));

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
      height={270}
      label="Two panels of the same market. Segmentation divides the dots into five segments; targeting selects one segment to enter and fades the rest."
    >
      <Key x={field.x} y={26} fill={INK} size={13}>
        SEGMENTATION
      </Key>
      <Note x={field.x} y={48} size={15} fill={INK2}>
        dividing the market
      </Note>
      {panel(0, false)}

      <line
        x1={field.x + field.w + 12}
        y1={161}
        x2={field.x + field.w + 60}
        y2={161}
        stroke={INK}
        strokeWidth={1.5}
      />
      <path
        d={head1.right(field.x + field.w + 62, 161)}
        fill="none"
        stroke={INK}
        strokeWidth={1.5}
      />

      <Key x={field.x + 410} y={26} fill={SIGNAL} size={13}>
        TARGETING
      </Key>
      <Note x={field.x + 410} y={48} size={15} fill={INK2}>
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
      height={214}
      label="One customer's purchases as a row of bars over a lifetime of patronage. At the point the customer is lost, one bar is a single sale; every bar after it is the entire future income stream."
    >
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
      label="One bar is all of a customer's purchasing in a product category. The company's portion is marked as share of customer."
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
      label="A line marks now. To the left, sales and market share reflect the past. To the right, lifetime value streams from current and potential customers add up to customer equity."
    >

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
  const g = { x: 62, y: 12, w: 326, h: 240 };
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
      width={400}
      height={300}
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
            y={c.y + g.h / 4 + 7}
            anchor="middle"
            size={21}
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
        x1={g.x - 14}
        y1={g.y + g.h}
        x2={g.x - 14}
        y2={g.y + 8}
        stroke={INK3}
        strokeWidth={1}
      />
      <path
        d={head1.up(g.x - 14, g.y + 2)}
        fill="none"
        stroke={INK3}
        strokeWidth={1}
      />
      <Key x={g.x - 22} y={g.y + 10} anchor="end" fill={INK3} size={8.5}>
        HIGH
      </Key>
      <Key x={g.x - 22} y={g.y + g.h} anchor="end" fill={INK3} size={8.5}>
        LOW
      </Key>
      <g transform={`translate(${g.x - 48} ${my}) rotate(-90)`}>
        <Key x={0} y={0} anchor="middle" fill={INK} size={9.5}>
          POTENTIAL PROFITABILITY
        </Key>
      </g>

      {/* x axis */}
      <line
        x1={g.x}
        y1={g.y + g.h + 14}
        x2={g.x + g.w - 8}
        y2={g.y + g.h + 14}
        stroke={INK3}
        strokeWidth={1}
      />
      <path
        d={head1.right(g.x + g.w - 2, g.y + g.h + 14)}
        fill="none"
        stroke={INK3}
        strokeWidth={1}
      />
      <Key x={g.x} y={g.y + g.h + 34} fill={INK3} size={8.5}>
        LOW
      </Key>
      <Key x={g.x + g.w} y={g.y + g.h + 34} anchor="end" fill={INK3} size={8.5}>
        HIGH
      </Key>
      <Key x={mx} y={g.y + g.h + 34} anchor="middle" fill={INK} size={9.5}>
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
