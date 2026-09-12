/* ==========================================================================
   Week 02 — figures
   --------------------------------------------------------------------------
   Same rules as Week 01. Hand-drawn SVG, one grammar per idea, no shared
   flow renderer. The eight plates here are: concentric map, speed ruler,
   real-data bar chart, timeline ribbon, quadrant, sieve, span bars, pyramid.

   Conventions, so the set reads as one system:
     · viewBox width 800, flat fills, hairline rules, no shadows or gradients
     · INK carries the neutral case, SIGNAL the operative one, COUNTER the
       contrast or the forward-looking state
     · every numeric axis is either real and cited, or explicitly schematic
     · labels are set in the mono face, uppercase, to read as printed keys
   ========================================================================== */

import React from "react";

const INK = "var(--ink)";
const INK2 = "var(--ink-2)";
const INK3 = "var(--ink-3)";
const RULE = "var(--rule)";
const SIGNAL = "var(--signal)";
const COUNTER = "var(--counter)";
const PAPER = "var(--paper)";
const PAPER2 = "var(--paper-2)";

const MONO = "var(--font-label)";
const BODY = "var(--font-body)";

/* -- small typographic helpers ------------------------------------------- */

function Key({
  x,
  y,
  children,
  anchor = "start",
  fill = INK3,
  size = 10,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  anchor?: "start" | "middle" | "end";
  fill?: string;
  size?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily={MONO}
      fontSize={size}
      letterSpacing="0.14em"
      fill={fill}
    >
      {children}
    </text>
  );
}

function Note({
  x,
  y,
  children,
  anchor = "start",
  fill = INK2,
  size = 13,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  anchor?: "start" | "middle" | "end";
  fill?: string;
  size?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily={BODY}
      fontSize={size}
      fill={fill}
    >
      {children}
    </text>
  );
}

function Frame({
  height,
  label,
  children,
}: {
  height: number;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      viewBox={`0 0 800 ${height}`}
      className="w-full h-auto"
      role="img"
      aria-label={label}
    >
      <title>{label}</title>
      {children}
    </svg>
  );
}

/* ==========================================================================
   1 · CONCENTRIC MAP — the firm, the actors, the forces
   Distance from the centre is the whole point. The inner band holds parties
   a firm can phone; the outer band holds conditions it can only plan around.
   The names live in the key so the bands stay readable.
   ========================================================================== */

export function EnvironmentRings() {
  const CX = 240;
  const CY = 200;

  return (
    <Frame
      height={400}
      label="The firm at the centre, micro actors on the inner ring, macro forces on the outer ring."
    >
      {/* macro band */}
      <circle cx={CX} cy={CY} r={186} fill={PAPER2} stroke={RULE} strokeWidth={1} />
      {/* micro band */}
      <circle cx={CX} cy={CY} r={118} fill={PAPER} stroke={COUNTER} strokeWidth={1} />
      {/* the firm */}
      <circle cx={CX} cy={CY} r={52} fill="var(--signal-tint)" stroke={SIGNAL} strokeWidth={1.5} />

      <text
        x={CX}
        y={CY + 4}
        textAnchor="middle"
        fontFamily={MONO}
        fontSize={12}
        letterSpacing="0.16em"
        fill={SIGNAL}
      >
        THE FIRM
      </text>

      <Key x={CX} y={106} anchor="middle" fill={COUNTER}>
        MICRO
      </Key>
      <Key x={CX} y={44} anchor="middle" fill={INK3}>
        MACRO
      </Key>

      {/* key column */}
      <line x1={500} y1={60} x2={780} y2={60} stroke={RULE} strokeWidth={1} />

      <rect x={500} y={78} width={11} height={11} fill={COUNTER} />
      <Key x={522} y={88} fill={INK}>
        MICRO · ACTORS
      </Key>
      <Note x={500} y={114} size={12.5}>
        {"Suppliers. Intermediaries. Competitors."}
      </Note>
      <Note x={500} y={132} size={12.5}>
        {"Customers. Publics."}
      </Note>
      <Note x={500} y={156} size={12.5} fill={INK3}>
        {"They have names and contracts."}
      </Note>
      <Note x={500} y={174} size={12.5} fill={INK3}>
        {"You negotiate with them."}
      </Note>

      <line x1={500} y1={200} x2={780} y2={200} stroke={RULE} strokeWidth={1} />

      <rect x={500} y={218} width={11} height={11} fill={INK3} />
      <Key x={522} y={228} fill={INK}>
        MACRO · FORCES
      </Key>
      <Note x={500} y={254} size={12.5}>
        {"Political. Economic. Social."}
      </Note>
      <Note x={500} y={272} size={12.5}>
        {"Technological. Legal. Environmental."}
      </Note>
      <Note x={500} y={296} size={12.5} fill={INK3}>
        {"No contract exists."}
      </Note>
      <Note x={500} y={314} size={12.5} fill={INK3}>
        {"You adapt, or the industry lobbies."}
      </Note>

      <line x1={500} y1={344} x2={780} y2={344} stroke={RULE} strokeWidth={1} />
      <Note x={500} y={364} size={12} fill={INK3}>
        {"Two questions sort any factor."}
      </Note>
      <Note x={500} y={382} size={12} fill={INK3}>
        {"Can I phone it? How fast does it move?"}
      </Note>
    </Frame>
  );
}

/* ==========================================================================
   2 · SPEED RULER — PESTLE sorted by how fast each force moves
   The usual PESTLE diagram is six equal boxes, which says the six are alike.
   They are not alike in the way that matters to planning: a tax changes in a
   speech and a population changes over forty years.
   ========================================================================== */

export function ForceSpeed() {
  const AXIS = 196;

  const marks = [
    { x: 150, term: "POLITICAL", note: "One budget speech", up: true, tone: SIGNAL },
    { x: 250, term: "LEGAL", note: "A bill, then a deadline", up: false, tone: INK },
    { x: 350, term: "ECONOMIC", note: "Rates move in a quarter", up: true, tone: INK },
    { x: 470, term: "TECHNOLOGICAL", note: "A few years to matter", up: false, tone: INK },
    { x: 590, term: "ENVIRONMENTAL", note: "Slow, then written into law", up: true, tone: INK },
    { x: 700, term: "SOCIAL", note: "A generation", up: false, tone: COUNTER },
  ];

  const scale = [
    { x: 100, t: "DAYS" },
    { x: 280, t: "MONTHS" },
    { x: 470, t: "YEARS" },
    { x: 700, t: "DECADES" },
  ];

  return (
    <Frame
      height={330}
      label="The six PESTLE forces placed on a scale running from days to decades, by how fast each one changes."
    >
      <line x1={70} y1={AXIS} x2={760} y2={AXIS} stroke={INK} strokeWidth={1.5} />
      <path d="M 752 192 L 762 196 L 752 200 Z" fill={INK} />

      {/* scale ticks. They sit above the axis because three of the six marks
          hang below it, and a dashed stem through a label is unreadable. */}
      {scale.map((s) => (
        <g key={s.t}>
          <line x1={s.x} y1={AXIS} x2={s.x} y2={AXIS - 9} stroke={INK3} strokeWidth={1} />
          <Key x={s.x} y={AXIS - 16} anchor="middle" size={9} fill={INK3}>
            {s.t}
          </Key>
        </g>
      ))}

      {marks.map((m) => {
        const stemTop = m.up ? AXIS - 46 : AXIS + 46;
        const keyY = m.up ? AXIS - 58 : AXIS + 60;
        const noteY = m.up ? AXIS - 40 : AXIS + 78;
        return (
          <g key={m.term}>
            <line
              x1={m.x}
              y1={AXIS}
              x2={m.x}
              y2={stemTop}
              stroke={m.tone}
              strokeWidth={1}
              strokeDasharray="2 3"
            />
            <circle cx={m.x} cy={AXIS} r={5} fill={m.tone} />
            <Key x={m.x} y={keyY} anchor="middle" fill={m.tone} size={10.5}>
              {m.term}
            </Key>
            <Note x={m.x} y={noteY} anchor="middle" size={12} fill={INK2}>
              {m.note}
            </Note>
          </g>
        );
      })}

      <Key x={70} y={AXIS + 26} fill={INK3} size={9}>
        FAST
      </Key>
      <Key x={760} y={AXIS + 26} anchor="end" fill={INK3} size={9}>
        SLOW
      </Key>

      <line x1={70} y1={300} x2={760} y2={300} stroke={RULE} strokeWidth={1} />
      <Note x={70} y={320} size={12.5} fill={INK3}>
        {"Firms watch the fast end because it is loud. The damage usually arrives from the slow end."}
      </Note>
    </Frame>
  );
}

/* ==========================================================================
   3 · REAL BARS — what the economic force did to Canadian prices
   Real figures, one source, one highlighted year. The 2 percent line is the
   Bank of Canada target, so the height of the 2022 bar has a reference and
   not just a shape.
   ========================================================================== */

export function PriceShock() {
  const BASE = 268;
  const S = 25;
  const years = [
    { y: "2019", v: 1.9 },
    { y: "2020", v: 0.7 },
    { y: "2021", v: 3.4 },
    { y: "2022", v: 6.8 },
    { y: "2023", v: 3.9 },
    { y: "2024", v: 2.4 },
  ];

  return (
    <Frame
      height={370}
      label="Annual average inflation in Canada from 2019 to 2024, with 2022 at 6.8 percent."
    >
      {/* target line */}
      <line
        x1={90}
        y1={BASE - 2 * S}
        x2={750}
        y2={BASE - 2 * S}
        stroke={COUNTER}
        strokeWidth={1}
        strokeDasharray="4 4"
      />
      <Key x={84} y={BASE - 2 * S + 4} anchor="end" fill={COUNTER} size={9}>
        2%
      </Key>

      {years.map((d, i) => {
        const x = 100 + i * 108;
        const h = d.v * S;
        const hot = d.y === "2022";
        return (
          <g key={d.y}>
            <rect
              x={x}
              y={BASE - h}
              width={72}
              height={h}
              fill={hot ? "var(--signal-tint)" : PAPER2}
              stroke={hot ? SIGNAL : INK3}
              strokeWidth={hot ? 1.75 : 1}
            />
            <text
              x={x + 36}
              y={BASE - h - 14}
              textAnchor="middle"
              fontFamily={MONO}
              fontSize={hot ? 17 : 14}
              fill={hot ? SIGNAL : INK}
            >
              {d.v.toFixed(1)}
            </text>
            <Key x={x + 36} y={BASE + 22} anchor="middle" fill={hot ? INK : INK3}>
              {d.y}
            </Key>
          </g>
        );
      })}

      <line x1={90} y1={BASE} x2={750} y2={BASE} stroke={INK} strokeWidth={1.5} />

      <Key x={90} y={44} fill={INK}>
        PRICE CHANGE FROM THE YEAR BEFORE, PER CENT
      </Key>

      <line x1={90} y1={310} x2={750} y2={310} stroke={RULE} strokeWidth={1} />
      <Note x={90} y={330} size={12.5} fill={INK3}>
        {"Statistics Canada, Consumer Price Index, annual average change."}
      </Note>
      <Note x={90} y={350} size={12.5} fill={INK3}>
        {"The dashed line is the Bank of Canada's 2 per cent target. 2022 was the fastest rise since 1982."}
      </Note>
    </Frame>
  );
}

/* ==========================================================================
   4 · TIMELINE RIBBON — five generations on one axis
   Drawn as staggered spans on a shared timeline so the overlap-free, roughly
   equal widths are visible. That evenness is the tell: these are conventions
   about birth years, not findings about people.
   ========================================================================== */

export function GenerationBands() {
  const X0 = 80;
  const X1 = 750;
  const Y0 = 1946;
  const Y1 = 2025;
  const px = (yr: number) => X0 + ((yr - Y0) / (Y1 - Y0)) * (X1 - X0);

  const bands = [
    { term: "BOOMERS", from: 1946, to: 1965, y: 78, tone: INK3, fill: PAPER2 },
    { term: "GENERATION X", from: 1966, to: 1980, y: 124, tone: INK3, fill: PAPER2 },
    { term: "MILLENNIALS", from: 1981, to: 1996, y: 170, tone: COUNTER, fill: "var(--counter-tint)" },
    { term: "GENERATION Z", from: 1997, to: 2012, y: 216, tone: SIGNAL, fill: "var(--signal-tint)" },
    { term: "GENERATION ALPHA", from: 2013, to: 2024, y: 262, tone: INK3, fill: PAPER2 },
  ];

  return (
    <Frame
      height={392}
      label="Birth year ranges for five generations, drawn as spans on one timeline from 1946 to 2025."
    >
      {bands.map((b) => {
        const x = px(b.from);
        const w = px(b.to) - x;
        return (
          <g key={b.term}>
            <rect
              x={x}
              y={b.y}
              width={w}
              height={22}
              fill={b.fill}
              stroke={b.tone}
              strokeWidth={1}
            />
            <Key x={x} y={b.y - 8} fill={b.tone === INK3 ? INK : b.tone}>
              {b.term}
            </Key>
            {/* the last band ends near the right edge, so its years go inside */}
            {px(b.to) + 90 < 790 ? (
              <Note x={px(b.to) + 12} y={b.y + 16} size={12.5} fill={INK3}>
                {`${b.from}–${b.to}`}
              </Note>
            ) : (
              <Note x={px(b.from) - 12} y={b.y + 16} anchor="end" size={12.5} fill={INK3}>
                {`${b.from}–${b.to}`}
              </Note>
            )}
          </g>
        );
      })}

      {/* axis */}
      <line x1={X0} y1={318} x2={X1} y2={318} stroke={INK} strokeWidth={1.5} />
      {[1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020].map((yr) => (
        <g key={yr}>
          <line x1={px(yr)} y1={318} x2={px(yr)} y2={326} stroke={INK3} strokeWidth={1} />
          <Key x={px(yr)} y={342} anchor="middle" size={9} fill={INK3}>
            {String(yr)}
          </Key>
        </g>
      ))}

      <Note x={X0} y={372} size={12.5} fill={INK3}>
        {"The cut-offs are conventions. Different agencies and firms draw them a year or two apart."}
      </Note>
    </Frame>
  );
}

/* ==========================================================================
   5 · QUADRANT — legal and right are two separate tests
   The point of the grid is the bottom-right cell. Everything a marketer is
   tempted by sits there: allowed by law, good for the quarter, and hard to
   describe to the person paying for it.
   ========================================================================== */

export function EthicsGrid() {
  const L = 130;
  const R = 720;
  const T = 62;
  const B = 316;
  const MX = (L + R) / 2;
  const MY = (T + B) / 2;

  return (
    <Frame
      height={412}
      label="A grid plotting marketing practices by whether they are legal and whether they could be explained to the customer."
    >
      {/* the hard cell, shaded */}
      <rect x={MX} y={MY} width={R - MX} height={B - MY} fill="var(--signal-tint)" />

      <rect x={L} y={T} width={R - L} height={B - T} fill="none" stroke={RULE} strokeWidth={1} />
      <line x1={MX} y1={T} x2={MX} y2={B} stroke={INK3} strokeWidth={1} />
      <line x1={L} y1={MY} x2={R} y2={MY} stroke={INK3} strokeWidth={1} />

      {/* top left */}
      <Key x={L + 20} y={T + 30} fill={INK3}>
        MOSTLY EMPTY
      </Key>
      <Note x={L + 20} y={T + 52} size={12.5}>
        {"Right, but not allowed."}
      </Note>
      <Note x={L + 20} y={T + 70} size={12.5} fill={INK3}>
        {"The law is out of date when this fills up."}
      </Note>

      {/* top right */}
      <Key x={MX + 20} y={T + 30} fill={COUNTER}>
        WHERE YOU WANT TO BE
      </Key>
      <Note x={MX + 20} y={T + 52} size={12.5}>
        {"Cascades built a business on recycled fibre."}
      </Note>
      <Note x={MX + 20} y={T + 70} size={12.5} fill={INK3}>
        {"Slower to build. Nothing to walk back later."}
      </Note>

      {/* bottom left */}
      <Key x={L + 20} y={MY + 30} fill={INK}>
        ALREADY ILLEGAL
      </Key>
      <Note x={L + 20} y={MY + 52} size={12.5}>
        {"Fourteen years of fixed bread prices."}
      </Note>
      <Note x={L + 20} y={MY + 70} size={12.5} fill={INK3}>
        {"The fines arrive, eventually."}
      </Note>

      {/* bottom right */}
      <Key x={MX + 20} y={MY + 30} fill={SIGNAL}>
        THE HARD CORNER
      </Key>
      <Note x={MX + 20} y={MY + 52} size={12.5}>
        {"Legal today. Profitable today."}
      </Note>
      <Note x={MX + 20} y={MY + 70} size={12.5} fill={INK3}>
        {"Hard to say out loud to the buyer."}
      </Note>

      {/* axes */}
      <Key x={L} y={B + 26} fill={INK}>
        IS IT LEGAL?
      </Key>
      <Key x={L} y={B + 46} size={9} fill={INK3}>
        NO
      </Key>
      <Key x={R} y={B + 46} anchor="end" size={9} fill={INK3}>
        YES
      </Key>

      <g transform={`translate(92, ${B}) rotate(-90)`}>
        <Key x={0} y={0} fill={INK}>
          WOULD IT SURVIVE EXPLAINING?
        </Key>
      </g>
      <Key x={L - 8} y={T + 12} anchor="end" size={9} fill={INK3}>
        YES
      </Key>
      <Key x={L - 8} y={B} anchor="end" size={9} fill={INK3}>
        NO
      </Key>

      <line x1={L} y1={B + 66} x2={R} y2={B + 66} stroke={RULE} strokeWidth={1} />
      <Note x={L} y={B + 86} size={12.5} fill={INK3}>
        {"Law is slow. Most practices reach the shaded cell long before a rule reaches them."}
      </Note>
    </Frame>
  );
}

/* ==========================================================================
   6 · SIEVE — three gates a green claim has to pass
   Drawn with the failures falling out of the bottom, because that is where
   almost all of them go. Each exit carries a real claim that failed there.
   ========================================================================== */

export function ClaimSieve() {
  const LANE = 104;
  const gates = [
    {
      x: 230,
      term: "IS IT SPECIFIC?",
      fail: "“eco-friendly”, “green”",
      fail2: "No number to check.",
    },
    {
      x: 420,
      term: "WAS IT TESTED?",
      fail: "“Recyclable” pods, in cities",
      fail2: "that did not collect them.",
    },
    {
      x: 610,
      term: "DOES IT MATTER?",
      fail: "A paper straw in a plastic cup.",
      fail2: "True, and beside the point.",
    },
  ];

  return (
    <Frame
      height={352}
      label="A green claim passing through three gates: is it specific, was it tested, does it matter, with the failures falling out at each gate."
    >
      {/* the lane */}
      <line x1={70} y1={LANE} x2={716} y2={LANE} stroke={INK} strokeWidth={1.5} />
      <path d="M 716 100 L 726 104 L 716 108 Z" fill={INK} />

      <Key x={70} y={LANE - 14} fill={INK}>
        THE CLAIM
      </Key>
      <Key x={726} y={LANE - 14} anchor="end" fill={COUNTER}>
        SURVIVES
      </Key>

      {gates.map((g, i) => (
        <g key={g.term}>
          {/* the gate */}
          <line x1={g.x} y1={LANE - 26} x2={g.x} y2={LANE + 26} stroke={SIGNAL} strokeWidth={2} />
          <Key x={g.x} y={LANE - 38} anchor="middle" fill={SIGNAL} size={10.5}>
            {g.term}
          </Key>

          {/* the failure exit */}
          <path
            d={`M ${g.x} ${LANE + 26} L ${g.x} ${LANE + 76}`}
            stroke={INK3}
            strokeWidth={1}
            strokeDasharray="2 3"
            fill="none"
          />
          <path
            d={`M ${g.x - 4} ${LANE + 76} L ${g.x} ${LANE + 86} L ${g.x + 4} ${LANE + 76} Z`}
            fill={INK3}
          />
          <Key x={g.x} y={LANE + 106} anchor="middle" size={9} fill={INK3}>
            {`FAILS HERE · ${String(i + 1).padStart(2, "0")}`}
          </Key>
          <Note x={g.x} y={LANE + 126} anchor="middle" size={12} fill={INK2}>
            {g.fail}
          </Note>
          <Note x={g.x} y={LANE + 144} anchor="middle" size={12} fill={INK2}>
            {g.fail2}
          </Note>
        </g>
      ))}

      <line x1={70} y1={296} x2={726} y2={296} stroke={RULE} strokeWidth={1} />
      <Note x={70} y={316} size={12.5} fill={INK3}>
        {"Since June 2024 the Competition Act requires adequate and proper testing behind a product's environmental claims."}
      </Note>
      <Note x={70} y={334} size={12.5} fill={INK3}>
        {"The firm making the claim has to hold the evidence. Being sincere is not a defence."}
      </Note>
    </Frame>
  );
}

/* ==========================================================================
   7 · SPAN BARS — the gap that forces a replacement
   Two spans on one time axis. The product still works in the shaded stretch;
   what has expired is the supply of parts and updates. Drawn schematically
   because the real lengths differ by category, and inventing them would be
   the failure this week is about.
   ========================================================================== */

export function LifespanGap() {
  const X0 = 90;
  const PXY = 64;
  const x = (yr: number) => X0 + yr * PXY;

  return (
    <Frame
      height={344}
      label="Two spans on one axis: the hardware keeps working for ten years while parts and updates stop at five, leaving a replacement window."
    >
      {/* the replacement window, shaded behind the bars */}
      <rect x={x(5)} y={74} width={x(10) - x(5)} height={124} fill="var(--signal-tint)" />
      <line x1={x(5)} y1={74} x2={x(5)} y2={222} stroke={SIGNAL} strokeWidth={1} strokeDasharray="3 3" />

      {/* hardware */}
      <rect x={X0} y={84} width={x(10) - X0} height={32} fill={PAPER2} stroke={INK} strokeWidth={1} />
      <Key x={X0} y={74} fill={INK}>
        THE HARDWARE STILL WORKS
      </Key>

      {/* parts and updates */}
      <rect x={X0} y={152} width={x(5) - X0} height={32} fill="var(--counter-tint)" stroke={COUNTER} strokeWidth={1} />
      <Key x={X0} y={142} fill={COUNTER}>
        PARTS, SOFTWARE UPDATES, SERVICE
      </Key>

      {/* what the law now asks for */}
      <line
        x1={x(5)}
        y1={168}
        x2={x(9)}
        y2={168}
        stroke={COUNTER}
        strokeWidth={1.5}
        strokeDasharray="5 4"
      />
      <path d={`M ${x(9)} 164 L ${x(9) + 10} 168 L ${x(9)} 172 Z`} fill={COUNTER} />
      <Key x={x(5) + 18} y={142} fill={COUNTER} size={9}>
        WHAT BILL 29 ASKS FOR
      </Key>

      <Key x={x(5) + 14} y={212} fill={SIGNAL} size={10.5}>
        THE REPLACEMENT WINDOW
      </Key>
      <Note x={x(5) + 14} y={230} size={12.5} fill={INK2}>
        {"Nothing broke. The support ended,"}
      </Note>
      <Note x={x(5) + 14} y={248} size={12.5} fill={INK2}>
        {"and repair costs more than a new one."}
      </Note>

      {/* axis */}
      <line x1={X0} y1={258} x2={x(10)} y2={258} stroke={INK} strokeWidth={1.5} />
      {[0, 2, 4, 6, 8, 10].map((yr) => (
        <g key={yr}>
          <line x1={x(yr)} y1={258} x2={x(yr)} y2={266} stroke={INK3} strokeWidth={1} />
          <Key x={x(yr)} y={282} anchor="middle" size={9} fill={INK3}>
            {yr === 0 ? "PURCHASE" : `YEAR ${yr}`}
          </Key>
        </g>
      ))}

      <Note x={X0} y={310} size={12.5} fill={INK3}>
        {"Schematic. Québec's Bill 29, passed in October 2023, pushes the dashed line to the right:"}
      </Note>
      <Note x={X0} y={328} size={12.5} fill={INK3}>
        {"it requires that parts and repair information stay available."}
      </Note>
    </Frame>
  );
}

/* ==========================================================================
   8 · PYRAMID — Carroll's four responsibilities
   Stacked because the levels are not alternatives. A firm does not get to
   pick the top one and skip the two underneath, although the annual report
   is usually written as though it does.
   ========================================================================== */

export function CsrPyramid() {
  const CX = 262;
  const BASE = 330;
  const H = 60;
  const HALF = 200;
  const STEP = 44;

  const levels = [
    { term: "ECONOMIC", desc: "Be profitable. Nothing happens without it.", duty: "REQUIRED", tone: INK },
    { term: "LEGAL", desc: "Obey the law. The floor, not the goal.", duty: "REQUIRED", tone: INK },
    { term: "ETHICAL", desc: "Be fair where the law is silent.", duty: "EXPECTED", tone: COUNTER },
    { term: "PHILANTHROPIC", desc: "Give back. Voluntary, and very photogenic.", duty: "VOLUNTARY", tone: SIGNAL },
  ];

  return (
    <Frame
      height={400}
      label="Carroll's pyramid: economic, legal, ethical and philanthropic responsibilities stacked in four levels."
    >
      {levels.map((lv, i) => {
        const yB = BASE - i * H;
        const yT = yB - H;
        const hB = HALF - i * STEP;
        const hT = HALF - (i + 1) * STEP;
        const midY = (yB + yT) / 2;
        return (
          <g key={lv.term}>
            <polygon
              points={`${CX - hB},${yB} ${CX + hB},${yB} ${CX + hT},${yT} ${CX - hT},${yT}`}
              fill={i === 3 ? "var(--signal-tint)" : i === 2 ? "var(--counter-tint)" : PAPER2}
              stroke={lv.tone}
              strokeWidth={1}
            />
            <text
              x={CX}
              y={midY + 4}
              textAnchor="middle"
              fontFamily={MONO}
              fontSize={i === 3 ? 9.5 : 11}
              letterSpacing="0.14em"
              fill={lv.tone}
            >
              {lv.term}
            </text>

            {/* leader out to the key */}
            <line
              x1={CX + hB}
              y1={midY}
              x2={500}
              y2={midY}
              stroke={RULE}
              strokeWidth={1}
              strokeDasharray="2 4"
            />
            <Note x={512} y={midY - 2} size={12.5}>
              {lv.desc}
            </Note>
            <Key x={512} y={midY + 16} size={9} fill={INK3}>
              {lv.duty}
            </Key>
          </g>
        );
      })}

      <line x1={62} y1={352} x2={760} y2={352} stroke={RULE} strokeWidth={1} />
      <Note x={62} y={372} size={12.5} fill={INK3}>
        {"Carroll, 1991. The levels stack, so a donation does not settle a debt owed at a lower level."}
      </Note>
      <Note x={62} y={390} size={12.5} fill={INK3}>
        {"A firm that funds a food bank while fixing prices has skipped three levels to reach the fourth."}
      </Note>
    </Frame>
  );
}
