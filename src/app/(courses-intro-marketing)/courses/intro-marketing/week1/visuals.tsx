/* ==========================================================================
   Week 1, figures
   --------------------------------------------------------------------------
   Hand-drawn SVG plates, one grammar per idea, so the deck changes shape as
   the argument does: an iceberg, an exchange loop, two lanes, a triangle, a
   field of view, a split lane, a rosette, a gauge, a staircase, a partitioned
   field, a cycle, a network, a income stream, a ledger across "now", and a
   quadrant.

   Conventions, so the set reads as one system:
     - viewBox width 800, flat fills, hairline rules, no shadows or gradients
     - INK carries the neutral case, SIGNAL the operative one, COUNTER the
       contrast or the outward-looking state
     - every label reuses words from the slide the plate sits on
     - keys are set in the body grotesque, uppercase and tracked (no mono)
   ========================================================================== */

import React from "react";
import { Hoodie, ImageSquare, Smiley, SmileySad, SmileyWink } from "@phosphor-icons/react";
import {
  Anchor,
  COUNTER,
  DragKnob,
  PAPER3,
  Segmented,
  Toggles,
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
import { Chip1, Chip2, Person1 } from "../_visuals/objects";

/* -- small typographic helpers ------------------------------------------- */

/* ==========================================================================
   1. ICEBERG: selling is the visible tip
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
   2. EXCHANGE LOOP: create value, capture value in return
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
   3. ATTRACT / KEEP: the dual goal
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
   4. INWARD / OUTWARD: the danger shared by production and product
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
   5. TWO LANES: inside-out selling, outside-in marketing
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
  const rowTop = (i: number) => 144 + i * 72;
  const lanes = [
    {
      cx: 184,
      name: "SELLING",
      dir: "INSIDE-OUT",
      tone: COUNTER,
      outward: true,
      stages: [
        ["Factory"],
        ["Existing", "products"],
        ["Heavy", "promotion"],
        ["Profit via", "sales volume"],
      ],
    },
    {
      cx: 326,
      name: "MARKETING",
      dir: "OUTSIDE-IN",
      tone: SIGNAL,
      outward: false,
      stages: [
        ["Well-defined", "market"],
        ["Customer needs"],
        ["Coordinated", "marketing"],
        ["Profit via", "satisfaction"],
      ],
    },
  ];

  return (
    <Frame
      width={400}
      height={426}
      label="Two columns comparing the selling and marketing orientations. The selling concept runs inside-out from the factory to existing products, heavy promotion, and short-term profit through sales volume. The marketing concept runs outside-in from a well-defined market to underlying customer needs, coordinated marketing activities, and profit through long-term customer satisfaction."
    >
      {heads.map((h, i) => (
        <Key key={h} x={8} y={rowTop(i) + 20} fill={INK3} size={9}>
          {h}
        </Key>
      ))}
      <line x1={8} y1={128} x2={392} y2={128} stroke={RULE2} strokeWidth={1} />
      <line x1={255} y1={10} x2={255} y2={418} stroke={RULE} strokeWidth={1} />

      {lanes.map((lane) => (
        <g key={lane.name}>
          <Key x={lane.cx} y={18} anchor="middle" fill={INK} size={11}>
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
                  <>
                    <line
                      x1={lane.cx}
                      y1={top - 22}
                      x2={lane.cx}
                      y2={top - 5}
                      stroke={lane.tone}
                      strokeWidth={1.5}
                    />
                    <path
                      d={head1.down(lane.cx, top - 4)}
                      fill="none"
                      stroke={lane.tone}
                      strokeWidth={1.5}
                    />
                  </>
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
                    y={top + 20 + j * 20}
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
   6. TRIANGLE: the three considerations in balance
   ========================================================================== */

export function SocietalTriangle() {
  const T = { x: 200, y: 46 };
  const L = { x: 84, y: 242 };
  const R = { x: 316, y: 242 };

  return (
    <Frame
      width={400}
      height={292}
      label="A triad with long-run public interest at the top, consumer wants at the bottom left, and company profits at the bottom right, balanced around the societal marketing concept."
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

      <Key x={T.x} y={T.y - 18} anchor="middle" fill={INK} size={11}>
        LONG-RUN PUBLIC INTEREST
      </Key>
      <Key x={L.x} y={L.y + 30} anchor="middle" fill={INK} size={11}>
        CONSUMER WANTS
      </Key>
      <Key x={R.x} y={R.y + 30} anchor="middle" fill={INK} size={11}>
        COMPANY PROFITS
      </Key>

      <Key x={200} y={168} anchor="middle" fill={SIGNAL} size={11.5}>
        SOCIETAL
      </Key>
      <Key x={200} y={186} anchor="middle" fill={SIGNAL} size={11.5}>
        MARKETING
      </Key>
      <Key x={200} y={204} anchor="middle" fill={SIGNAL} size={11.5}>
        CONCEPT
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   7. FIELD OF VIEW: myopia is a narrow beam
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
   8. SPLIT LANE: comparing needs, wants, and demands
   Three lanes stacked in the order one becomes the next. The spine on the
   left says what each is. The lane to the right shows it happening.
   ========================================================================== */

export function NeedsWantsDemandsLanes() {
  const spine = 36;
  const lane = 250;
  const rows = { need: 62, want: 196, demand: 330 };

  return (
    <Frame
      height={392}
      label="Progression from an underlying human need to a culturally shaped want and a purchasing-power-backed market demand. Needs are physical, social, and individual. Shaped by culture and personality, a hungry commuter in Toronto wants a bagel and coffee whereas a hungry commuter in Tokyo wants rice, grilled fish, and miso soup. A want backed by buying power becomes a market demand."
    >
      {/* lane rules */}
      <line x1={226} y1={122} x2={780} y2={122} stroke={RULE} strokeWidth={1} />
      <line x1={226} y1={258} x2={780} y2={258} stroke={RULE} strokeWidth={1} />
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
          a: "Shaped by culture",
          b: "and personality",
          tone: COUNTER,
        },
        { y0: 210, y1: 304, a: "Backed by", b: "buying power", tone: SIGNAL },
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
        { x: lane, k: "PHYSICAL", n: "food, clothing, shelter, safety" },
        { x: lane + 196, k: "SOCIAL", n: "belonging, affection" },
        { x: lane + 362, k: "INDIVIDUAL", n: "knowledge, self-expression" },
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
          <Note x={c.x} y={84} size={13} fill={INK2}>
            {c.n}
          </Note>
        </g>
      ))}

      {/* ---- lane 2: one need, two cultures ---- */}
      <Chip1 x={lane} y={196} w={156} label="HUNGRY COMMUTER" tone={INK} />
      <path
        d={`M${lane + 156} 190 C${lane + 202} 190 ${lane + 202} 160 ${lane + 262} 160`}
        fill="none"
        stroke={COUNTER}
        strokeWidth={1.5}
      />
      <path
        d={`M${lane + 156} 190 C${lane + 202} 190 ${lane + 202} 220 ${lane + 262} 220`}
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
      <Key x={lane + 280} y={150} fill={INK3} size={9.5}>
        In Toronto
      </Key>
      <Note x={lane + 280} y={172} size={14.5} fill={COUNTER}>
        a bagel and coffee
      </Note>
      <Key x={lane + 280} y={210} fill={INK3} size={9.5}>
        In Tokyo
      </Key>
      <Note x={lane + 280} y={232} size={14.5} fill={COUNTER}>
        rice, grilled fish, and miso soup
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
   9. ROSETTE: an offering is a combination
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
   10. BENEFITS LESS COSTS: perceived value, relative to competing offers
   ========================================================================== */

export function PerceivedValueBars() {
  const x0 = 10;
  const h = 18;
  // This offer's benefits and costs are the student's to move. The two
  // competing offers stay put. Lengths are in plate units from x0.
  const [b, setB] = React.useState(240);
  const [c, setC] = React.useState(124);
  const offers = [
    { top: 12, b, c, name: "THIS OFFER", mine: true },
    { top: 84, b: 300, c: 236, name: "COMPETING OFFER", mine: false },
    { top: 156, b: 180, c: 96, name: "COMPETING OFFER", mine: false },
  ];
  const values = offers.map((o) => o.b - o.c);
  const best = values.indexOf(Math.max(...values));

  return (
    <Frame
      width={400}
      height={272}
      label={`Three offers, each drawn as a total benefits bar above a total costs bar. The difference between benefits and costs is customer perceived value. The benefits and costs of this offer can be dragged. ${best === 0 ? "This offer" : best === 1 ? "The competing offer with the most benefits" : "The cheaper competing offer"} now has the highest perceived value.`}
    >
      {offers.map((o, i) => {
        const by = o.top + 16;
        const cy = by + h + 6;
        const mid = cy + h / 2;
        const bEnd = x0 + o.b;
        const cEnd = x0 + o.c;
        const on = i === best;
        const tone = on ? SIGNAL : INK3;
        const sw = on ? 2 : 1.25;
        return (
          <g key={o.top}>
            <Key x={x0} y={o.top + 10} fill={o.mine ? INK : INK3} size={9.5}>
              {o.name}
            </Key>
            {on ? (
              <Key x={390} y={o.top + 10} anchor="end" fill={SIGNAL} size={9.5}>
                HIGHEST PERCEIVED VALUE
              </Key>
            ) : null}
            <rect
              x={x0}
              y={by}
              width={o.b}
              height={h}
              fill={o.mine ? COUNTER : "rgba(34, 87, 91, 0.4)"}
            />
            <rect
              x={x0}
              y={cy}
              width={o.c}
              height={h}
              fill={o.mine ? INK3 : "rgba(111, 106, 92, 0.4)"}
            />
            {o.mine ? (
              <>
                <Key x={x0 + 8} y={by + 12.5} fill={PAPER} size={9}>
                  TOTAL BENEFITS
                </Key>
                <Key x={x0 + 8} y={cy + 12.5} fill={PAPER} size={9}>
                  TOTAL COSTS
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
            {o.b - o.c > (o.mine ? 34 : 12) ? (
              <>
                <line x1={cEnd + (o.mine ? 22 : 3)} y1={mid} x2={bEnd - 3} y2={mid} stroke={tone} strokeWidth={sw} />
                <path d={head1.left(cEnd + (o.mine ? 21 : 2), mid)} fill="none" stroke={tone} strokeWidth={sw} />
                <path d={head1.right(bEnd - 2, mid)} fill="none" stroke={tone} strokeWidth={sw} />
              </>
            ) : null}
            {o.mine ? (
              <>
                <DragKnob
                  y={by + h / 2}
                  value={bEnd}
                  min={x0 + 130}
                  max={x0 + 340}
                  onChange={(v) => {
                    setB(v - x0);
                    setC((cc) => Math.min(cc, v - x0));
                  }}
                  label="Total benefits of this offer"
                />
                <DragKnob
                  y={cy + h / 2}
                  value={cEnd}
                  min={x0 + 40}
                  max={bEnd}
                  onChange={(v) => setC(v - x0)}
                  label="Total costs of this offer"
                />
              </>
            ) : null}
          </g>
        );
      })}
      <line x1={10} y1={222} x2={390} y2={222} stroke={RULE} strokeWidth={1} />
      <Key x={10} y={240} fill={COUNTER} size={9.5}>
        BENEFITS: FUNCTIONAL, SERVICE, PRESTIGE
      </Key>
      <Key x={10} y={258} fill={INK3} size={9.5}>
        COSTS: PRICE, TIME, EFFORT, RISK
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   11. GAUGE: performance measured against expectations
   ========================================================================== */

export function SatisfactionGauge() {
  // The product's perceived performance is fixed. The student moves the
  // buyer's expectations and watches the same performance change verdict.
  const perf = 262;
  const half = 36;
  const [exp, setExp] = React.useState(160);
  const band = 70;
  const bh = 34;
  const axis = band + bh + 14;
  const lo = Math.max(10, exp - half);
  const hi = Math.min(390, exp + half);
  const zones = [
    {
      x0: 10,
      x1: lo,
      k: "FALLS SHORT",
      v: "DISSATISFIED",
      Face: SmileySad,
      fill: "rgba(23, 22, 15, 0.07)",
      tone: INK3,
    },
    {
      x0: lo,
      x1: hi,
      k: "MATCHES",
      v: "SATISFIED",
      Face: Smiley,
      fill: COUNTER_TINT,
      tone: COUNTER,
    },
    {
      x0: hi,
      x1: 390,
      k: "EXCEEDS",
      v: "DELIGHTED",
      Face: SmileyWink,
      fill: SIGNAL_TINT,
      tone: SIGNAL,
    },
  ];
  const verdict = zones[perf < lo ? 0 : perf <= hi ? 1 : 2];
  const s = 36;

  return (
    <Frame
      width={400}
      height={176}
      label={`Perceived performance is fixed on an arrow. The buyer's expectations can be dragged along it. Performance that falls short of expectations is dissatisfied, that matches is satisfied, that exceeds is delighted. With expectations where they are now, the same performance leaves the customer ${verdict.v.toLowerCase()}.`}
    >
      {/* the verdict for this product's performance */}
      <verdict.Face x={perf - s / 2} y={2} size={s} weight="duotone" color={verdict.tone} />
      <Key x={perf} y={54} anchor="middle" fill={verdict.tone} size={11}>
        {verdict.v}
      </Key>

      {zones.map((z) => {
        if (z.x1 - z.x0 <= 0) return null;
        // The key sits in the zone's middle, or in its wider side when the
        // performance line would run through it.
        let kx = (z.x0 + z.x1) / 2;
        let room = z.x1 - z.x0;
        if (Math.abs(kx - perf) < 44) {
          const left = perf - z.x0;
          const right = z.x1 - perf;
          kx = left > right ? (z.x0 + perf) / 2 : (perf + z.x1) / 2;
          room = Math.max(left, right);
        }
        return (
          <g key={z.k}>
            <rect x={z.x0} y={band} width={z.x1 - z.x0} height={bh} fill={z.fill} />
            {room >= 66 ? (
              <Key x={kx} y={band + 21} anchor="middle" fill={z.tone} size={8.5}>
                {z.k}
              </Key>
            ) : null}
          </g>
        );
      })}

      {/* the product's perceived performance, fixed */}
      <line x1={perf} y1={60} x2={perf} y2={axis + 36} stroke={INK} strokeWidth={1.5} />
      <circle cx={perf} cy={axis} r={4} fill={INK} />

      {/* the axis, with expectations as the knob on it */}
      <line x1={10} y1={axis} x2={388} y2={axis} stroke={INK3} strokeWidth={1} />
      <path d={head1.right(390, axis)} fill="none" stroke={INK3} strokeWidth={1} />
      <Key x={exp} y={axis + 28} anchor="middle" fill={INK} size={9.5}>
        EXPECTATIONS
      </Key>
      <Key x={perf} y={axis + 50} anchor="middle" fill={INK} size={9.5}>
        PERCEIVED PERFORMANCE
      </Key>
      <DragKnob
        y={axis}
        value={exp}
        min={60}
        max={340}
        onChange={setExp}
        label="The buyer's expectations"
      />
    </Frame>
  );
}

/* ==========================================================================
   11b | WHAT THE AI AGENT CAN READ: two listings, one comparison
   The student chooses which of jacket A's facts its seller states as text.
   The rest sit inside a product photo, which people see and the AI agent
   cannot read. The agent compares only what it can read.
   ========================================================================== */

type Fact = "price" | "waterproof" | "reviews";

export const AGENT_FACTS: { id: Fact; label: string }[] = [
  { id: "price", label: "Price" },
  { id: "waterproof", label: "Waterproofing" },
  { id: "reviews", label: "Reviews" },
];

const JACKETS = {
  a: { price: 139, waterproof: 20000, reviews: 4.8 },
  b: { price: 149, waterproof: 10000, reviews: 4.2 },
};

const factText = (f: Fact, j: (typeof JACKETS)["a"]) =>
  f === "price"
    ? `$${j.price}`
    : f === "waterproof"
      ? `${j.waterproof.toLocaleString("en-US")} mm`
      : `${j.reviews} / 5`;

/** Which jacket wins one fact, judged only from what the agent can read. */
function factWinner(f: Fact, aReadable: boolean): "a" | "b" {
  if (!aReadable) return "b";
  const a = JACKETS.a[f];
  const b = JACKETS.b[f];
  return f === "price" ? (a <= b ? "a" : "b") : a >= b ? "a" : "b";
}

export function AgentReads() {
  const [readable, setReadable] = React.useState<Fact[]>(["price"]);
  const wins = AGENT_FACTS.map((f) => factWinner(f.id, readable.includes(f.id)));
  const pick = wins.filter((w) => w === "a").length >= 2 ? "a" : "b";

  const cardW = 214;
  const cards = [
    { id: "a" as const, x: 16 },
    { id: "b" as const, x: 250 },
  ];
  const top = 88;
  const rowY = (i: number) => top + 108 + i * 40;
  const panel = 506;
  const ca = 162;
  const cb = 244;

  return (
    <div>
      <Frame
        height={336}
        label={`A consumer wants a rain jacket under $150, and an AI agent compares two listings. Jacket A costs $139, is waterproof to 20,000 mm and has reviews of 4.8 out of 5. Jacket B costs $149, 10,000 mm and 4.2. Jacket B states every fact as text. Jacket A states ${readable.length ? readable.map((f) => f).join(" and ") : "nothing"} as text and shows the rest only inside a product photo, which the AI agent cannot read. Comparing only what it can read, the AI agent picks jacket ${pick.toUpperCase()}.`}
      >
        {/* the want, handed to the AI agent */}
        <Person1 x={40} y={58} s={1.1} />
        <rect x={62} y={22} width={228} height={36} rx={18} fill={PAPER} stroke={INK} strokeWidth={1.25} />
        <Note x={176} y={46} anchor="middle" size={16} fill={INK}>
          a rain jacket under $150
        </Note>
        <line x1={300} y1={40} x2={624} y2={40} stroke={INK3} strokeWidth={1.25} />
        <path d={head1.right(632, 40)} fill="none" stroke={INK3} strokeWidth={1.25} />
        <Chip2 x={664} y={40} s={40} tone={INK} fill={PAPER} />

        {/* two listings, as a person sees them */}
        {cards.map((c) => {
          const j = JACKETS[c.id];
          const chosen = pick === c.id;
          return (
            <g key={c.id}>
              <rect
                x={c.x}
                y={top}
                width={cardW}
                height={232}
                fill={PAPER}
                stroke={chosen ? SIGNAL : RULE2}
                strokeWidth={chosen ? 2.5 : 1.25}
              />
              <Hoodie x={c.x + 18} y={top + 16} size={58} weight="duotone" color={INK} />
              <Display x={c.x + cardW - 20} y={top + 52} anchor="end" size={30} fill={chosen ? SIGNAL : INK}>
                {c.id.toUpperCase()}
              </Display>
              {AGENT_FACTS.map((f, i) => {
                const y = rowY(i);
                const asText = c.id === "b" || readable.includes(f.id);
                return (
                  <g key={f.id}>
                    {asText ? (
                      <>
                        <Key x={c.x + 16} y={y} fill={INK3} size={10}>
                          {f.label.toUpperCase()}
                        </Key>
                        <Note x={c.x + 16} y={y + 21} size={17} fill={INK}>
                          {factText(f.id, j)}
                        </Note>
                      </>
                    ) : (
                      <>
                        {/* the fact is printed inside a product photo */}
                        <rect x={c.x + 10} y={y - 14} width={cardW - 20} height={34} fill={PAPER3} stroke={INK3} strokeWidth={1} />
                        <ImageSquare x={c.x + 16} y={y - 7} size={20} weight="duotone" color={INK3} />
                        <Note x={c.x + 42} y={y + 8} size={13.5} fill={INK2} italic>
                          {`${f.id === "waterproof" ? "waterproof" : f.label.toLowerCase()} ${factText(f.id, j).toLowerCase()}`}
                        </Note>
                      </>
                    )}
                  </g>
                );
              })}
            </g>
          );
        })}

        {/* what the AI agent can read, and its comparison */}
        <Key x={panel} y={top + 12} fill={INK} size={11}>
          WHAT THE AI AGENT CAN READ
        </Key>
        <Display x={panel + ca} y={top + 52} anchor="middle" size={20} fill={INK3}>
          A
        </Display>
        <Display x={panel + cb} y={top + 52} anchor="middle" size={20} fill={INK3}>
          B
        </Display>
        {AGENT_FACTS.map((f, i) => {
          const y = top + 92 + i * 40;
          const aRead = readable.includes(f.id);
          return (
            <g key={f.id}>
              <line x1={panel} y1={y - 24} x2={784} y2={y - 24} stroke={RULE} strokeWidth={1} />
              <Key x={panel} y={y} fill={INK3} size={9}>
                {f.label.toUpperCase()}
              </Key>
              <Note x={panel + ca} y={y + 1} anchor="middle" size={14.5} fill={wins[i] === "a" ? INK : INK3}>
                {aRead ? factText(f.id, JACKETS.a) : "?"}
              </Note>
              <Note x={panel + cb} y={y + 1} anchor="middle" size={14.5} fill={wins[i] === "b" ? INK : INK3}>
                {factText(f.id, JACKETS.b)}
              </Note>
              {/* the better reading of this fact, underlined */}
              <line
                x1={panel + (wins[i] === "a" ? ca : cb) - 34}
                y1={y + 8}
                x2={panel + (wins[i] === "a" ? ca : cb) + 34}
                y2={y + 8}
                stroke={INK}
                strokeWidth={1.75}
              />
            </g>
          );
        })}
        <line x1={panel} y1={top + 188} x2={786} y2={top + 188} stroke={INK} strokeWidth={1.25} />
        <Key x={panel} y={top + 222} fill={SIGNAL} size={12}>
          {"THE AI AGENT'S PICK"}
        </Key>
        <Display x={784} y={top + 230} anchor="end" size={34} fill={SIGNAL}>
          {pick.toUpperCase()}
        </Display>
      </Frame>
      <Toggles
        label="Jacket A's seller states as text"
        options={AGENT_FACTS}
        value={readable}
        onChange={setReadable}
      />
    </div>
  );
}

/* ==========================================================================
   12. FOUR PLUS ONE: create, create, create, create, capture
   ========================================================================== */

export function FourPlusOne() {
  const x0 = 16;
  const pitch = 158;
  const w = 136;
  const h = 84;
  const top = 36;
  const end = x0 + 4 * pitch + w;
  const steps = [
    ["Understand", "marketplace"],
    ["Design value", "strategy"],
    ["Construct", "program"],
    ["Build customer", "relationships"],
    ["Capture value", "in return"],
  ];

  return (
    <Frame
      width={800}
      height={186}
      label="Five-step marketing process from understanding the marketplace to capturing value in return. A bracket under steps one to four reads create value for customers, and a bracket under step five reads capture value in return."
    >
      <Key x={x0} y={20} fill={INK3} size={10}>
        RESEARCH AND STRATEGY
      </Key>
      <line x1={x0 + 150} y1={16} x2={end - 110} y2={16} stroke={RULE2} strokeWidth={1} />
      <path d={head1.right(end - 108, 16)} fill="none" stroke={RULE2} strokeWidth={1} />
      <Key x={end} y={20} anchor="end" fill={SIGNAL} size={10}>
        EQUITY AND PROFITS
      </Key>

      {steps.map((lines, i) => {
        const last = i === 4;
        const bx = x0 + i * pitch;
        return (
          <g key={i}>
            <rect
              x={bx}
              y={top}
              width={w}
              height={h}
              fill={last ? SIGNAL_TINT : COUNTER_TINT}
              stroke={last ? SIGNAL : COUNTER}
              strokeWidth={1.25}
            />
            <Key
              x={bx + 12}
              y={top + 22}
              fill={last ? SIGNAL : COUNTER}
              size={10}
            >
              {`STEP ${i + 1}`}
            </Key>
            <Note x={bx + 12} y={top + 46} size={13.5} fill={INK}>
              {lines[0]}
            </Note>
            <Note x={bx + 12} y={top + 66} size={13.5} fill={INK}>
              {lines[1]}
            </Note>
            {!last ? (
              <>
                <line
                  x1={bx + w + 4}
                  y1={top + h / 2}
                  x2={bx + pitch - 6}
                  y2={top + h / 2}
                  stroke={i === 3 ? SIGNAL : COUNTER}
                  strokeWidth={1.5}
                />
                <path
                  d={head1.right(bx + pitch - 4, top + h / 2)}
                  fill="none"
                  stroke={i === 3 ? SIGNAL : COUNTER}
                  strokeWidth={1.5}
                />
              </>
            ) : null}
          </g>
        );
      })}

      {/* brackets */}
      <path
        d={`M${x0} 132 L${x0} 142 L${x0 + 3 * pitch + w} 142 L${x0 + 3 * pitch + w} 132`}
        fill="none"
        stroke={COUNTER}
        strokeWidth={1.5}
      />
      <Key
        x={x0 + (3 * pitch + w) / 2}
        y={166}
        anchor="middle"
        fill={COUNTER}
        size={11}
      >
        CREATE VALUE FOR CUSTOMERS (STEPS 1 TO 4)
      </Key>
      <path
        d={`M${x0 + 4 * pitch} 132 L${x0 + 4 * pitch} 142 L${end} 142 L${end} 132`}
        fill="none"
        stroke={SIGNAL}
        strokeWidth={1.5}
      />
      <Key x={x0 + 4 * pitch + w / 2} y={166} anchor="middle" fill={SIGNAL} size={10.5}>
        CAPTURE VALUE
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   13. PARTITIONED FIELD: segmentation, then targeting
   ========================================================================== */

export function SegmentTarget() {
  const field = { x: 30, y: 66, w: 330, h: 190 };
  const vx1 = 30 + 110;
  const vx2 = 30 + 228;
  const hy1 = 66 + 88;
  const hy2 = 66 + 98;

  // Which of five regions a point falls in. Region 3 is the target.
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
      label="Two panels of the same market. Segmentation divides the dots into five segments. Targeting selects one segment to enter and fades the rest."
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
   14. CYCLE + NETWORK: relationships, managed two ways
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
   15. INCOME STREAM: a single sale versus a lifetime of patronage
   ========================================================================== */

export function LifetimeStream() {
  const base = 138;
  const cut = 5;
  const bars = Array.from({ length: 24 }, (_, i) => ({
    x: 68 + i * 28,
    h: Math.round(26 + hash1(i + 11) * 32),
  }));
  const last = bars[bars.length - 1];
  const w = 16;
  const barY = 216;
  const barH = 34;

  return (
    <Frame
      width={800}
      height={292}
      label="Top: comparison of a single-transaction margin against cumulative customer lifetime value across a lifetime of patronage. Bottom: share of customer across product categories captured by the firm versus competing firms."
    >
      {/* ---- Top panel: Single-transaction margin vs. cumulative CLV ---- */}
      <line x1={50} y1={base} x2={762} y2={base} stroke={INK} strokeWidth={1} />
      <path
        d={head1.right(770, base)}
        fill="none"
        stroke={INK}
        strokeWidth={1}
      />
      <Key x={770} y={base + 22} anchor="end" fill={INK3} size={9.5}>
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
            <rect key={i} x={b.x} y={y} width={w} height={b.h} fill={COUNTER} />
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
        y1={28}
        x2={bars[cut].x - 6}
        y2={base + 8}
        stroke={INK}
        strokeWidth={1.25}
        strokeDasharray="4 3"
      />
      <Key x={bars[cut].x - 14} y={40} anchor="end" fill={INK} size={10}>
        DEFECTS OVER DISPUTE
      </Key>

      {/* single transaction */}
      <Key
        x={bars[cut].x + w / 2}
        y={base + 22}
        anchor="middle"
        fill={COUNTER}
        size={9.5}
      >
        SINGLE TRANSACTION
      </Key>

      {/* cumulative CLV stream */}
      <path
        d={`M${bars[cut + 1].x} 66 L${bars[cut + 1].x} 56 L${last.x + w} 56 L${last.x + w} 66`}
        fill="none"
        stroke={SIGNAL}
        strokeWidth={1.5}
      />
      <Key
        x={(bars[cut + 1].x + last.x + w) / 2}
        y={42}
        anchor="middle"
        fill={SIGNAL}
        size={11}
      >
        Cumulative customer lifetime value (CLV)
      </Key>

      <line x1={50} y1={178} x2={770} y2={178} stroke={RULE} strokeWidth={1} />

      {/* ---- Bottom panel: Share of customer across product categories ---- */}
      <Key x={50} y={204} fill={INK} size={10}>
        SHARE OF CUSTOMER ACROSS PRODUCT CATEGORIES
      </Key>
      <Key x={750} y={204} anchor="end" fill={INK3} size={9.5}>
        TOTAL CATEGORY SPENDING
      </Key>

      <rect x={50} y={barY} width={160} height={barH} fill={SIGNAL} />
      <Key x={130} y={barY + 21} anchor="middle" fill={PAPER} size={10}>
        CHECKING
      </Key>

      <rect
        x={212}
        y={barY}
        width={170}
        height={barH}
        fill={SIGNAL_TINT}
        stroke={SIGNAL}
        strokeWidth={1.25}
      />
      <Key x={297} y={barY + 21} anchor="middle" fill={SIGNAL} size={10}>
        + MORTGAGE
      </Key>

      <rect
        x={384}
        y={barY}
        width={166}
        height={barH}
        fill={SIGNAL_TINT}
        stroke={SIGNAL}
        strokeWidth={1.25}
      />
      <Key x={467} y={barY + 21} anchor="middle" fill={SIGNAL} size={10}>
        + WEALTH MANAGEMENT
      </Key>

      <rect
        x={552}
        y={barY}
        width={198}
        height={barH}
        fill={PAPER3}
        stroke={RULE2}
        strokeWidth={1}
      />
      <Key x={651} y={barY + 21} anchor="middle" fill={INK3} size={10}>
        COMPETING FIRMS
      </Key>

      <path
        d="M50 258 L50 266 L550 266 L550 258"
        fill="none"
        stroke={SIGNAL}
        strokeWidth={1.5}
      />
      <Key x={300} y={284} anchor="middle" fill={SIGNAL} size={10.5}>
        SHARE OF CUSTOMER (SHARE OF WALLET) CAPTURED BY FIRM
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   16. ONE BAR: share of customer
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
   17. LEDGER ACROSS "NOW": the past, and the future value of the firm
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
   18. QUADRANT: strangers, butterflies, true friends, barnacles
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
   19. FIVE TO ONE: split a year's budget between acquiring and retaining
   Made-up data: the 5:1 cost ratio is the one the discussion gives. The budget,
   customer bases and the share who would leave are plausible round numbers.
   ========================================================================== */

const BUDGET = 10000;
const ACQUIRE = 100;
const RETAIN = 20;
const WOULD_LEAVE = 0.3;
const FIRMS = {
  startup: { base: 40, label: "A startup" },
  established: { base: 1000, label: "An established firm" },
} as const;
type Firm = keyof typeof FIRMS;

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

export function AcquireRetain() {
  const [firm, setFirm] = React.useState<Firm>("startup");
  const [retainSpend, setRetainSpend] = React.useState(5000);
  const base = FIRMS[firm].base;
  const leaving = Math.round(base * WOULD_LEAVE);
  const kept = Math.min(leaving, Math.floor(retainSpend / RETAIN));
  const gained = Math.floor((BUDGET - retainSpend) / ACQUIRE);
  const stayed = base - leaving;
  const lost = leaving - kept;
  const total = stayed + kept + gained;
  // The year-end bar is drawn to the best total this firm could reach.
  const best = Math.max(
    ...Array.from({ length: 101 }, (_, i) => {
      const r = i * 100;
      return stayed + Math.min(leaving, Math.floor(r / RETAIN)) + Math.floor((BUDGET - r) / ACQUIRE);
    }),
  );
  const scaleMax = Math.max(best, base) * 1.04;

  // Budget bar: x from b0 to b1. The divider is the knob.
  const b0 = 190;
  const b1 = 690;
  const split = r2(b0 + ((BUDGET - retainSpend) / BUDGET) * (b1 - b0));
  const by = 30;
  const unused = retainSpend - kept * RETAIN;
  const usedW = r2(((kept * RETAIN) / BUDGET) * (b1 - b0));
  const bh = 40;
  // Year-end customers: one stacked bar.
  const y2 = 168;
  const w = (n: number) => r2((n / scaleMax) * (b1 - b0));
  const xs = r2(b0 + w(stayed));
  const xk = r2(xs + w(kept));
  const xg = r2(xk + w(gained));

  return (
    <div>
      <Frame
        height={242}
        label={`${FIRMS[firm].label} with ${base} customers splits a ${money(BUDGET)} budget: acquiring a new customer costs ${money(ACQUIRE)} and retaining an existing one costs ${money(RETAIN)}, five times less. ${leaving} customers would leave this year. Now ${money(BUDGET - retainSpend)} acquires ${gained} new customers and ${money(retainSpend)} retains ${kept}, for ${total} customers at year end.`}
      >
        {/* the budget, split by the knob */}
        <Key x={b0 - 16} y={by + 16} anchor="end" fill={INK} size={10.5}>
          {`${money(BUDGET)} BUDGET`}
        </Key>
        <Key x={b0 - 16} y={by + 32} anchor="end" fill={INK3} size={9}>
          FOR ONE YEAR
        </Key>
        <rect x={b0} y={by} width={r2(split - b0)} height={bh} fill={SIGNAL} />
        <rect x={split} y={by} width={usedW} height={bh} fill={COUNTER} />
        {unused > 0 ? (
          <rect
            x={r2(split + usedW + 0.75)}
            y={by + 0.75}
            width={Math.max(0, r2(b1 - split - usedW - 1.5))}
            height={bh - 1.5}
            fill={COUNTER_TINT}
            stroke={COUNTER}
            strokeWidth={1}
            strokeDasharray="4 3"
          />
        ) : null}
        {split - b0 > 130 ? (
          <Key x={b0 + 12} y={by + 25} fill={PAPER} size={10}>
            {`ACQUIRE ${money(BUDGET - retainSpend)}`}
          </Key>
        ) : null}
        {usedW > 130 ? (
          <Key x={split + 18} y={by + 25} fill={PAPER} size={10}>
            {`RETAIN ${money(retainSpend - unused)}`}
          </Key>
        ) : null}
        {unused > 0 && b1 - split - usedW > 150 ? (
          <Key x={b1 - 12} y={by + 25} anchor="end" fill={COUNTER} size={10}>
            {`UNUSED ${money(unused)}`}
          </Key>
        ) : null}
        <Key x={b0} y={by - 12} fill={SIGNAL} size={9}>
          {`${money(ACQUIRE)} TO ACQUIRE A NEW CUSTOMER`}
        </Key>
        <Key x={b1} y={by - 12} anchor="end" fill={COUNTER} size={9}>
          {`${money(RETAIN)} TO RETAIN AN EXISTING ONE`}
        </Key>
        <line x1={split} y1={by - 4} x2={split} y2={by + bh + 4} stroke={INK} strokeWidth={1.5} />
        <DragKnob
          y={by + bh / 2}
          value={split}
          min={b0}
          max={b1}
          onChange={(v) => setRetainSpend(Math.round(((b1 - v) / (b1 - b0)) * (BUDGET / 100)) * 100)}
          label="Split of the budget between acquiring and retaining"
        />

        {/* what the money buys */}
        <Key x={b0} y={by + bh + 26} fill={SIGNAL} size={9.5}>
          {`${gained} NEW CUSTOMERS`}
        </Key>
        <Key x={b1} y={by + bh + 26} anchor="end" fill={COUNTER} size={9.5}>
          {`${kept} OF ${leaving} WHO WOULD LEAVE ARE KEPT`}
        </Key>

        {/* customers at year end */}
        <Key x={b0 - 16} y={y2 + 16} anchor="end" fill={INK} size={10.5}>
          CUSTOMERS
        </Key>
        <Key x={b0 - 16} y={y2 + 32} anchor="end" fill={INK3} size={9}>
          AT YEAR END
        </Key>
        <rect x={b0} y={y2} width={w(stayed)} height={bh} fill={INK3} />
        <rect x={xs} y={y2} width={w(kept)} height={bh} fill={COUNTER} />
        <rect x={xk} y={y2} width={w(gained)} height={bh} fill={SIGNAL} />
        {[
          { x: b0, n: stayed, k: "STAYED" },
          { x: xs, n: kept, k: "KEPT" },
          { x: xk, n: gained, k: "NEW" },
        ].map((seg) =>
          w(seg.n) >= 84 ? (
            <Key key={seg.k} x={seg.x + 10} y={y2 + 25} fill={PAPER} size={9.5}>
              {`${seg.n.toLocaleString("en-US")} ${seg.k}`}
            </Key>
          ) : w(seg.n) >= 30 ? (
            <Key key={seg.k} x={r2(seg.x + w(seg.n) / 2)} y={y2 + 25} anchor="middle" fill={PAPER} size={9.5}>
              {seg.n.toLocaleString("en-US")}
            </Key>
          ) : null,
        )}
        {lost > 0 ? (
          <rect
            x={xg + 0.75}
            y={y2 + 0.75}
            width={Math.max(0, w(lost) - 1.5)}
            height={bh - 1.5}
            fill="none"
            stroke={INK3}
            strokeWidth={1}
            strokeDasharray="3 3"
          />
        ) : null}
        {lost > 0 && w(lost) > 40 ? (
          <Key x={r2(xg + w(lost) / 2)} y={y2 + 25} anchor="middle" fill={INK3} size={9}>
            LOST
          </Key>
        ) : null}
        <Display x={r2(Math.max(xg + w(lost), b0) + 14)} y={y2 + 30} size={30} fill={INK}>
          {total.toLocaleString("en-US")}
        </Display>
        <Key x={b0} y={y2 + bh + 22} fill={INK3} size={9}>
          {`STARTED THE YEAR WITH ${base.toLocaleString("en-US")}`}
        </Key>
      </Frame>
      <Segmented
        label="The firm"
        options={(Object.keys(FIRMS) as Firm[]).map((id) => ({ id, label: FIRMS[id].label }))}
        value={firm}
        onChange={setFirm}
      />
    </div>
  );
}

/* ==========================================================================
   20. DELEGATED SHOPPING SEQUENCE: consumer -> AI agent -> postpurchase use
   ========================================================================== */

export function DelegatedShoppingSequence() {
  const top = 28;
  const h = 186;

  return (
    <Frame
      width={800}
      height={244}
      label="Three-stage delegated shopping sequence. First, the human consumer states a want and budget constraint: a waterproof hiking jacket under 150 dollars. Second, the AI shopping agent acts as an operational surrogate that searches catalogs, compares specifications, and executes the purchase. Third, the human consumer wears the jacket in the rain and forms the postpurchase satisfaction judgment that drives customer lifetime value."
    >
      {/* Stage 1: Human Consumer */}
      <rect
        x={16}
        y={top}
        width={232}
        height={h}
        fill={PAPER}
        stroke={INK}
        strokeWidth={1.25}
      />
      <Key x={32} y={top + 24} fill={INK} size={10.5}>
        1. HUMAN CONSUMER
      </Key>
      <Person1 x={50} y={top + 96} s={1.1} />
      <rect
        x={80}
        y={top + 52}
        width={152}
        height={56}
        rx={10}
        fill={PAPER3}
        stroke={RULE2}
        strokeWidth={1}
      />
      <Note x={92} y={top + 76} size={13} fill={INK}>
        Waterproof jacket
      </Note>
      <Note x={92} y={top + 95} size={13} fill={INK}>
        under $150
      </Note>
      <line x1={32} y1={top + 132} x2={232} y2={top + 132} stroke={RULE} strokeWidth={1} />
      <Key x={32} y={top + 152} fill={INK3} size={9.5}>
        STATES WANT AND BUDGET
      </Key>
      <Key x={32} y={top + 168} fill={INK3} size={9.5}>
        HOLDS BUYING POWER
      </Key>

      {/* Connector 1 -> 2 */}
      <line x1={252} y1={top + h / 2} x2={278} y2={top + h / 2} stroke={INK} strokeWidth={1.5} />
      <path d={head1.right(280, top + h / 2)} fill="none" stroke={INK} strokeWidth={1.5} />

      {/* Stage 2: AI Shopping Agent */}
      <rect
        x={284}
        y={top}
        width={232}
        height={h}
        fill={COUNTER_TINT}
        stroke={COUNTER}
        strokeWidth={1.5}
      />
      <Key x={300} y={top + 24} fill={COUNTER} size={10.5}>
        2. AI SHOPPING AGENT
      </Key>
      <Chip2 x={324} y={top + 80} s={38} tone={COUNTER} fill={PAPER} />
      <Note x={360} y={top + 64} size={13} fill={INK}>
        Searches catalogs
      </Note>
      <Note x={360} y={top + 84} size={13} fill={INK}>
        Compares specs
      </Note>
      <Note x={360} y={top + 104} size={13} fill={INK}>
        Executes purchase
      </Note>
      <line x1={300} y1={top + 132} x2={500} y2={top + 132} stroke={COUNTER} strokeWidth={1} />
      <Key x={300} y={top + 152} fill={COUNTER} size={9.5}>
        OPERATIONAL SURROGATE
      </Key>
      <Key x={300} y={top + 168} fill={COUNTER} size={9.5}>
        READS STRUCTURED DATA
      </Key>

      {/* Connector 2 -> 3 */}
      <line x1={520} y1={top + h / 2} x2={546} y2={top + h / 2} stroke={SIGNAL} strokeWidth={1.5} />
      <path d={head1.right(548, top + h / 2)} fill="none" stroke={SIGNAL} strokeWidth={1.5} />

      {/* Stage 3: Postpurchase Experience */}
      <rect
        x={552}
        y={top}
        width={232}
        height={h}
        fill={SIGNAL_TINT}
        stroke={SIGNAL}
        strokeWidth={1.5}
      />
      <Key x={568} y={top + 24} fill={SIGNAL} size={10.5}>
        3. POSTPURCHASE USE
      </Key>
      <Hoodie x={568} y={top + 52} size={52} weight="duotone" color={SIGNAL} />
      <Note x={630} y={top + 70} size={13} fill={INK}>
        Wears in the rain
      </Note>
      <Note x={630} y={top + 92} size={13} fill={INK}>
        Judges performance
      </Note>
      <line x1={568} y1={top + 132} x2={768} y2={top + 132} stroke={SIGNAL} strokeWidth={1} />
      <Key x={568} y={top + 152} fill={SIGNAL} size={9.5}>
        SATISFACTION JUDGMENT
      </Key>
      <Key x={568} y={top + 168} fill={SIGNAL} size={9.5}>
        Drives lifetime value (CLV)
      </Key>
    </Frame>
  );
}
