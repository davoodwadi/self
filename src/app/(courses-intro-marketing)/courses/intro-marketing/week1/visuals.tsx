/* ==========================================================================
   Week 01 — figures
   --------------------------------------------------------------------------
   Hand-drawn SVG rather than the shared FlowRenderer. Three node-and-arrow
   charts were doing the work of a whole lecture, which meant every idea
   arrived in the same shape: a row of boxes. These are eight different
   grammars — containment, branching timeline, waterfall, wedge, quadrant,
   schematic curve, true-scale bar, cycle — so the deck changes register as
   the argument does.

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
   1 · CONTAINMENT — need ⊃ want ⊃ demand
   The old version drew these as three boxes in a row joined by arrows, which
   implies they are separate things in sequence. They are not: every demand is
   a want, and every want is some need wearing local clothes. Nesting says so.
   ========================================================================== */

export function NeedWantDemand() {
  const rows = [
    {
      y: 70,
      tone: INK3,
      term: "NEED",
      lines: ["A state of felt deprivation.", "Older than any firm."],
    },
    {
      y: 158,
      tone: COUNTER,
      term: "WANT",
      lines: ["The shape a culture gives", "that need."],
    },
    {
      y: 246,
      tone: SIGNAL,
      term: "DEMAND",
      lines: ["The shape someone can", "actually pay for."],
    },
  ];

  return (
    <Frame
      height={340}
      label="Three nested regions: demand sits inside want, which sits inside need."
    >
      {/* outer — need */}
      <rect
        x={45}
        y={30}
        width={470}
        height={270}
        fill="none"
        stroke={INK3}
        strokeWidth={1}
      />
      <Key x={62} y={54}>
        NEED
      </Key>

      {/* middle — want */}
      <rect
        x={95}
        y={72}
        width={370}
        height={186}
        fill="var(--counter-tint)"
        stroke={COUNTER}
        strokeWidth={1}
      />
      <Key x={112} y={96} fill={COUNTER}>
        WANT
      </Key>

      {/* inner — demand */}
      <rect
        x={160}
        y={120}
        width={240}
        height={90}
        fill="var(--signal-tint)"
        stroke={SIGNAL}
        strokeWidth={1.5}
      />
      <text
        x={280}
        y={160}
        textAnchor="middle"
        fontFamily={MONO}
        fontSize={13}
        letterSpacing="0.16em"
        fill={SIGNAL}
      >
        DEMAND
      </text>
      <Note x={280} y={182} anchor="middle" size={12} fill={INK2}>
        {"the only one that is a market"}
      </Note>

      {/* key */}
      {rows.map((r) => (
        <g key={r.term}>
          <rect x={560} y={r.y - 10} width={11} height={11} fill={r.tone} />
          <Key x={582} y={r.y} fill={INK}>
            {r.term}
          </Key>
          {r.lines.map((l, i) => (
            <Note key={i} x={582} y={r.y + 20 + i * 17} size={12.5}>
              {l}
            </Note>
          ))}
        </g>
      ))}

      <line x1={560} y1={302} x2={780} y2={302} stroke={RULE} strokeWidth={1} />
      <Note x={560} y={322} size={12} fill={INK3}>
        {"Marketing competes over the middle ring."}
      </Note>
    </Frame>
  );
}

/* ==========================================================================
   2 · BRANCHING TIMELINE — Bombardier, 1934–1959
   The need line runs dead flat across the whole chart while the want branches
   away from it. That flatness is the entire lesson, and it only shows up if
   the two are drawn on the same time axis.
   ========================================================================== */

export function BombardierDivergence() {
  const ticks = [
    { x: 110, year: "1934" },
    { x: 300, year: "1937" },
    { x: 470, year: "1959" },
    { x: 700, year: "TODAY" },
  ];

  return (
    <Frame
      height={330}
      label="A flat need line from 1934 to today, with the want branching away from it in 1937 and again in 1959."
    >
      {/* the need — flat, constant, underneath everything */}
      <line x1={70} y1={250} x2={760} y2={250} stroke={INK} strokeWidth={2} />
      <Key x={70} y={274} fill={INK}>
        THE NEED
      </Key>
      <Note x={70} y={294} size={12.5} fill={INK2}>
        {"Cross deep snow to reach help. Unchanged for as long as there has been snow."}
      </Note>

      {/* year ticks */}
      {ticks.map((t) => (
        <g key={t.year}>
          <line
            x1={t.x}
            y1={244}
            x2={t.x}
            y2={256}
            stroke={INK}
            strokeWidth={1.5}
          />
          <Key x={t.x} y={232} anchor="middle" fill={INK3}>
            {t.year}
          </Key>
        </g>
      ))}

      {/* 1934 — the event that starts it */}
      <line
        x1={110}
        y1={244}
        x2={110}
        y2={196}
        stroke={INK3}
        strokeWidth={1}
        strokeDasharray="2 3"
      />
      <Note x={110} y={186} anchor="middle" size={12.5} fill={INK2}>
        {"A child dies; the road is buried"}
      </Note>

      {/* branch: utility want, 1937 */}
      <path
        d="M 110 244 C 190 244, 230 160, 300 150"
        fill="none"
        stroke={COUNTER}
        strokeWidth={1.75}
      />
      <circle cx={300} cy={150} r={5} fill={COUNTER} />
      <Key x={314} y={172} fill={COUNTER}>
        B7 — TRACKED VEHICLE
      </Key>
      <Note x={314} y={190} size={12.5}>
        {"Sold to doctors, priests, ambulance crews."}
      </Note>

      {/* branch: leisure want, 1959 */}
      <path
        d="M 300 150 C 380 140, 410 80, 470 68"
        fill="none"
        stroke={SIGNAL}
        strokeWidth={1.75}
      />
      <circle cx={470} cy={68} r={5} fill={SIGNAL} />
      <Key x={484} y={90} fill={SIGNAL}>
        SKI-DOO
      </Key>
      <Note x={484} y={108} size={12.5}>
        {"Same machine, sold for fun. A new industry."}
      </Note>
      <path
        d="M 470 68 L 760 68"
        fill="none"
        stroke={SIGNAL}
        strokeWidth={1.75}
        strokeDasharray="4 4"
      />
    </Frame>
  );
}

/* ==========================================================================
   3 · WATERFALL — value is what is left after everything is deducted
   A waterfall makes the subtraction physical: the customer starts from what
   they think they are getting and spends it down. Money is only the first
   and largest deduction, which is the part students miss.
   ========================================================================== */

export function ValueWaterfall() {
  const BASE = 270;
  const S = 2.3;
  const y = (v: number) => BASE - v * S;

  const steps = [
    { label: ["BELIEVED", "BENEFIT"], from: 0, to: 100, tone: COUNTER },
    { label: ["MONEY"], from: 100, to: 66, tone: SIGNAL },
    { label: ["TIME"], from: 66, to: 52, tone: SIGNAL },
    { label: ["EFFORT"], from: 52, to: 42, tone: SIGNAL },
    { label: ["RISK OF", "BEING WRONG"], from: 42, to: 30, tone: SIGNAL },
    { label: ["LOOKING", "FOOLISH"], from: 30, to: 22, tone: SIGNAL },
    { label: ["PERCEIVED", "VALUE"], from: 0, to: 22, tone: INK },
  ];

  return (
    <Frame
      height={358}
      label="A waterfall chart: believed benefit is reduced by money, time, effort, risk and social risk, leaving perceived value."
    >
      <line x1={55} y1={BASE} x2={770} y2={BASE} stroke={INK} strokeWidth={1} />

      {steps.map((s, i) => {
        const x = 70 + i * 100;
        const top = y(Math.max(s.from, s.to));
        const h = Math.abs(y(s.from) - y(s.to));
        const isCost = i > 0 && i < 6;
        return (
          <g key={i}>
            <rect
              x={x}
              y={top}
              width={78}
              height={h}
              fill={isCost ? PAPER : s.tone}
              stroke={s.tone}
              strokeWidth={isCost ? 1.25 : 0}
            />
            {isCost && (
              <line
                x1={x}
                y1={top}
                x2={x + 78}
                y2={top}
                stroke={s.tone}
                strokeWidth={2}
              />
            )}
            {/* connector to the next bar */}
            {i < steps.length - 2 && (
              <line
                x1={x + 78}
                y1={y(s.to)}
                x2={x + 100}
                y2={y(s.to)}
                stroke={INK3}
                strokeWidth={1}
                strokeDasharray="2 3"
              />
            )}
            {s.label.map((l, j) => (
              <Key
                key={j}
                x={x + 39}
                y={BASE + 22 + j * 14}
                anchor="middle"
                size={9}
                fill={i === 6 ? INK : INK3}
              >
                {l}
              </Key>
            ))}
          </g>
        );
      })}

      {/* minus / equals signs between groups */}
      <Note x={159} y={y(83)} anchor="middle" size={17} fill={INK3}>
        −
      </Note>
      <Note x={659} y={y(11)} anchor="middle" size={17} fill={INK3}>
        =
      </Note>

      <line x1={55} y1={322} x2={770} y2={322} stroke={RULE} strokeWidth={1} />
      <Note x={55} y={342} size={12.5} fill={INK3}>
        {"Both columns are beliefs. Two people can meet the same price and part company over it, neither of them wrong."}
      </Note>
    </Frame>
  );
}

/* ==========================================================================
   4 · THE WEDGE — satisfaction is the distance between two lines
   Delivered performance is flat, because the product is whatever it is. The
   promise is the line marketing controls. Sliding right to win the sale walks
   the firm out of the teal and into the red, which is the trap drawn plainly.
   ========================================================================== */

export function SatisfactionWedge() {
  const X0 = 90;
  const X1 = 740;
  const DELIVERED = 150;
  const CROSS = 415;

  return (
    <Frame
      height={330}
      label="Two crossing lines: flat delivered performance against a rising promise, forming a delight wedge on the left and a disappointment wedge on the right."
    >
      {/* wedges */}
      <path
        d={`M ${X0} ${DELIVERED} L ${CROSS} ${DELIVERED} L ${X0} 240 Z`}
        fill="var(--counter-tint)"
      />
      <path
        d={`M ${CROSS} ${DELIVERED} L ${X1} ${DELIVERED} L ${X1} 60 Z`}
        fill="var(--signal-tint)"
      />

      {/* delivered — flat */}
      <line
        x1={X0}
        y1={DELIVERED}
        x2={X1}
        y2={DELIVERED}
        stroke={INK}
        strokeWidth={2}
      />
      <Key x={X0} y={DELIVERED - 12} fill={INK}>
        WHAT THE PRODUCT ACTUALLY DOES
      </Key>

      {/* promised — rising */}
      <line x1={X0} y1={240} x2={X1} y2={60} stroke={SIGNAL} strokeWidth={2} />
      <Key x={X1} y={48} anchor="end" fill={SIGNAL}>
        WHAT THE MARKETING PROMISED
      </Key>

      <circle cx={CROSS} cy={DELIVERED} r={4.5} fill={INK} />
      <Note x={CROSS} y={DELIVERED - 30} anchor="middle" size={12.5} fill={INK2}>
        {"exactly as advertised"}
      </Note>

      {/* The delight wedge is a triangle that pinches shut toward the
          crossing, so its label has to live at the wide left end. */}
      <Key x={100} y={170} fill={COUNTER} size={11}>
        DELIGHT
      </Key>
      <Note x={100} y={188} size={12} fill={INK2}>
        {"they tell other people"}
      </Note>

      <Key x={600} y={118} fill={SIGNAL} size={11}>
        DISAPPOINTMENT
      </Key>
      <Note x={600} y={136} size={12} fill={INK2}>
        {"the product never changed"}
      </Note>

      {/* the pressure arrow */}
      <line x1={X0} y1={282} x2={X1 - 14} y2={282} stroke={INK3} strokeWidth={1} />
      <path
        d={`M ${X1 - 14} 278 L ${X1 - 4} 282 L ${X1 - 14} 286 Z`}
        fill={INK3}
      />
      <Note x={X0} y={304} size={12.5} fill={INK3}>
        {"Every quarter, the pressure is to move right — and the bar the product has to clear moves with it."}
      </Note>
    </Frame>
  );
}

/* ==========================================================================
   5 · QUADRANT — the five philosophies as positions, not eras
   Drawing them as a timeline (which is how they are usually taught, and how
   the previous version of this deck drew them) implies the early ones are
   finished. Plotting them on where the firm looks and how far ahead shows
   them as five occupied positions in the present tense.
   ========================================================================== */

export function PhilosophyMatrix() {
  const pts = [
    {
      x: 165,
      y: 300,
      tone: INK3,
      term: "SELLING",
      desc: "Push what we already made",
      anchor: "start" as const,
    },
    {
      x: 250,
      y: 255,
      tone: INK3,
      term: "PRODUCTION",
      desc: "Make it cheaper, make more",
      anchor: "start" as const,
    },
    {
      x: 340,
      y: 192,
      tone: INK3,
      term: "PRODUCT",
      desc: "Relentless improvement",
      anchor: "start" as const,
    },
    {
      x: 545,
      y: 215,
      tone: SIGNAL,
      term: "MARKETING",
      desc: "Ask first, then build",
      anchor: "start" as const,
    },
    {
      x: 650,
      y: 105,
      tone: COUNTER,
      term: "SOCIETAL",
      desc: "Ask who pays for it later",
      anchor: "end" as const,
    },
  ];

  return (
    <Frame
      height={420}
      label="A quadrant chart plotting the five marketing philosophies by where the firm looks and how far ahead it plans."
    >
      {/* axes */}
      <line x1={110} y1={330} x2={752} y2={330} stroke={INK} strokeWidth={1} />
      <line x1={110} y1={330} x2={110} y2={52} stroke={INK} strokeWidth={1} />
      <path d="M 752 326 L 762 330 L 752 334 Z" fill={INK} />
      <path d="M 106 52 L 110 42 L 114 52 Z" fill={INK} />

      {/* quadrant hairlines */}
      <line
        x1={430}
        y1={330}
        x2={430}
        y2={52}
        stroke={RULE}
        strokeWidth={1}
        strokeDasharray="3 4"
      />
      <line
        x1={110}
        y1={196}
        x2={752}
        y2={196}
        stroke={RULE}
        strokeWidth={1}
        strokeDasharray="3 4"
      />

      {/* axis labels */}
      <Key x={110} y={356} fill={INK}>
        WHERE THE FIRM LOOKS
      </Key>
      <Note x={110} y={376} size={12} fill={INK3}>
        {"at its own factory"}
      </Note>
      <Note x={752} y={376} anchor="end" size={12} fill={INK3}>
        {"at the person buying, and everyone downstream"}
      </Note>

      <g transform="translate(88, 330) rotate(-90)">
        <Key x={0} y={0} fill={INK}>
          HOW FAR AHEAD
        </Key>
      </g>
      <Note x={96} y={64} anchor="end" size={12} fill={INK3}>
        {"a generation"}
      </Note>

      {/* plotted positions */}
      {pts.map((p) => (
        <g key={p.term}>
          <circle cx={p.x} cy={p.y} r={6} fill={p.tone} />
          <Key
            x={p.anchor === "start" ? p.x + 15 : p.x - 15}
            y={p.y - 4}
            anchor={p.anchor}
            fill={p.tone === INK3 ? INK : p.tone}
          >
            {p.term}
          </Key>
          <Note
            x={p.anchor === "start" ? p.x + 15 : p.x - 15}
            y={p.y + 14}
            anchor={p.anchor}
            size={12.5}
          >
            {p.desc}
          </Note>
        </g>
      ))}

      <line x1={110} y1={396} x2={752} y2={396} stroke={RULE} strokeWidth={1} />
      <Note x={110} y={414} size={12.5} fill={INK3}>
        {"Every one of these five positions is occupied by a company trading this morning."}
      </Note>
    </Frame>
  );
}

/* ==========================================================================
   6 · SCHEMATIC CURVE — Kodak, 1975 to 2012
   Deliberately unnumbered on the vertical axis. The shape of the transition
   is well documented; inventing revenue figures to decorate it would be the
   exact failure this course spends a week warning students about. Dates and
   events on the chart are the checkable part.
   ========================================================================== */

export function KodakSchematic() {
  return (
    <Frame
      height={366}
      label="A schematic of Kodak's film business peaking in the mid-1990s and collapsing by 2012, crossed by a rising digital curve."
    >
      {/* film — area under the curve */}
      <path
        d="M 90 165 C 170 145, 240 125, 300 110 C 370 92, 420 70, 459 62 C 500 72, 525 82, 547 95 C 590 130, 615 165, 640 190 C 675 220, 710 245, 740 258 L 740 270 L 90 270 Z"
        fill="var(--signal-tint)"
      />
      <path
        d="M 90 165 C 170 145, 240 125, 300 110 C 370 92, 420 70, 459 62 C 500 72, 525 82, 547 95 C 590 130, 615 165, 640 190 C 675 220, 710 245, 740 258"
        fill="none"
        stroke={SIGNAL}
        strokeWidth={2}
      />
      <Key x={300} y={100} fill={SIGNAL}>
        FILM
      </Key>

      {/* digital */}
      <path
        d="M 90 266 C 160 263, 240 258, 300 255 C 370 248, 420 240, 459 232 C 495 220, 525 210, 547 198 C 585 175, 615 150, 640 130 C 675 110, 710 88, 740 72"
        fill="none"
        stroke={COUNTER}
        strokeWidth={2}
        strokeDasharray="5 4"
      />
      <Key x={738} y={62} anchor="end" fill={COUNTER}>
        DIGITAL
      </Key>

      {/* baseline */}
      <line x1={90} y1={270} x2={740} y2={270} stroke={INK} strokeWidth={1} />

      {/* event markers */}
      {[
        { x: 90, year: "1975", note: "Builds the first digital", note2: "camera in its own lab" },
        { x: 459, year: "1996", note: "Peak film", note2: "" },
        { x: 740, year: "2012", note: "Chapter 11", note2: "" },
      ].map((m) => (
        <g key={m.year}>
          <line
            x1={m.x}
            y1={270}
            x2={m.x}
            y2={284}
            stroke={INK}
            strokeWidth={1.5}
          />
          <Key
            x={m.x === 740 ? m.x : m.x === 90 ? m.x : m.x}
            y={300}
            anchor={m.x === 740 ? "end" : m.x === 90 ? "start" : "middle"}
            fill={INK}
          >
            {m.year}
          </Key>
          {m.note && (
            <Note
              x={m.x === 740 ? m.x : m.x === 90 ? m.x : m.x}
              y={318}
              anchor={m.x === 740 ? "end" : m.x === 90 ? "start" : "middle"}
              size={12}
              fill={INK2}
            >
              {m.note}
            </Note>
          )}
          {m.note2 && (
            <Note x={m.x} y={334} size={12} fill={INK2}>
              {m.note2}
            </Note>
          )}
        </g>
      ))}

      <Note x={740} y={354} anchor="end" size={12} fill={INK3}>
        {"Vertical axis is schematic — the dates are not."}
      </Note>
    </Frame>
  );
}

/* ==========================================================================
   7 · TRUE SCALE — the refund against the relationship
   The whole argument is that the two numbers are not comparable, so the only
   honest way to draw it is at real proportion and let the $4 disappear. A
   legible bar chart here would destroy the point it is making.
   ========================================================================== */

export function LifetimeScale() {
  const X0 = 70;
  const W = 670;
  const terms = [
    { x: 70, v: "$5", k: "A DAY" },
    { x: 210, v: "× 5", k: "DAYS A WEEK" },
    { x: 355, v: "× 52", k: "WEEKS" },
    { x: 495, v: "× 10", k: "YEARS" },
    { x: 645, v: "$13,000", k: "THE RELATIONSHIP" },
  ];

  return (
    <Frame
      height={280}
      label="The arithmetic of a daily coffee habit over ten years, and a bar drawn to scale in which a four dollar refund is a hairline."
    >
      {terms.map((t, i) => (
        <g key={t.v}>
          <text
            x={t.x}
            y={56}
            fontFamily={MONO}
            fontSize={i === 4 ? 27 : 23}
            fill={i === 4 ? SIGNAL : INK}
            letterSpacing="0.01em"
          >
            {t.v}
          </text>
          <Key x={t.x} y={76} size={9.5}>
            {t.k}
          </Key>
          {i === 3 && (
            <Note x={t.x + 92} y={54} size={19} fill={INK3}>
              =
            </Note>
          )}
        </g>
      ))}

      {/* the bar, drawn at true scale */}
      <rect
        x={X0}
        y={130}
        width={W}
        height={42}
        fill="var(--signal-tint)"
        stroke={SIGNAL}
        strokeWidth={1.25}
      />
      {/* $4 — 0.03% of the bar. Roughly a fifth of a pixel, so it is drawn
          as the thinnest mark the renderer will produce and pointed at. */}
      <line
        x1={X0 + 0.5}
        y1={130}
        x2={X0 + 0.5}
        y2={172}
        stroke={INK}
        strokeWidth={1}
      />
      <path
        d={`M ${X0 + 1} 130 L ${X0 + 46} 104`}
        stroke={INK}
        strokeWidth={1}
        fill="none"
      />
      <Key x={X0 + 52} y={100} fill={INK}>
        $4
      </Key>
      <Note x={X0 + 52} y={118} size={12.5} fill={INK2}>
        {"the refund the manager is deciding whether to give"}
      </Note>

      <Key x={X0} y={192} size={9.5}>
        0
      </Key>
      <Key x={X0 + W} y={192} anchor="end" size={9.5}>
        $13,000
      </Key>

      <line x1={X0} y1={220} x2={740} y2={220} stroke={RULE} strokeWidth={1} />
      <Note x={X0} y={240} size={12.5} fill={INK3}>
        {"Drawn to scale. The refund is the hairline at the left edge — it is 0.03% of what is on the table."}
      </Note>
      <Note x={X0} y={260} size={12.5} fill={INK3}>
        {"A firm that measures the bar and a firm that measures the hairline will treat the same customer very differently."}
      </Note>
    </Frame>
  );
}

/* ==========================================================================
   8 · CYCLE — four steps spend, the fifth collects and refills
   Drawn as a closed ring because the return path is the part that matters:
   the money captured in step five is what pays for step one next time.
   ========================================================================== */

export function ProcessCycle() {
  const nodes = [
    { x: 400, y: 68, n: "01", t: "UNDERSTAND", d: "the market", pos: "top" },
    { x: 525.54, y: 159.21, n: "02", t: "DECIDE", d: "who, and how", pos: "right" },
    { x: 477.59, y: 306.79, n: "03", t: "BUILD", d: "the offer", pos: "right" },
    { x: 322.41, y: 306.79, n: "04", t: "ENGAGE", d: "the relationship", pos: "left" },
    { x: 274.46, y: 159.21, n: "05", t: "CAPTURE", d: "get paid", pos: "left" },
  ];

  return (
    <Frame
      height={400}
      label="Five steps arranged in a ring: understand, decide, build, engage, capture — with the fifth feeding back into the first."
    >
      {/* the ring */}
      <circle
        cx={400}
        cy={200}
        r={132}
        fill="none"
        stroke={INK3}
        strokeWidth={1}
        strokeDasharray="3 5"
      />
      {/* the return arc, 05 back to 01 */}
      <path
        d="M 274.46 159.21 A 132 132 0 0 1 400 68"
        fill="none"
        stroke={SIGNAL}
        strokeWidth={2}
      />
      <path d="M 394 70 L 402 64 L 403 74 Z" fill={SIGNAL} />

      {nodes.map((nd, i) => {
        const isCapture = i === 4;
        const tone = isCapture ? SIGNAL : INK;
        const anchor =
          nd.pos === "top" ? "middle" : nd.pos === "right" ? "start" : "end";
        const tx =
          nd.pos === "top" ? nd.x : nd.pos === "right" ? nd.x + 20 : nd.x - 20;
        const ty = nd.pos === "top" ? nd.y - 30 : nd.y - 4;
        return (
          <g key={nd.n}>
            <circle cx={nd.x} cy={nd.y} r={9} fill={tone} />
            <text
              x={nd.x}
              y={nd.y + 3.5}
              textAnchor="middle"
              fontFamily={MONO}
              fontSize={9}
              fill={PAPER}
            >
              {nd.n}
            </text>
            <Key x={tx} y={ty} anchor={anchor as "start" | "middle" | "end"} fill={tone}>
              {nd.t}
            </Key>
            <Note
              x={tx}
              y={ty + 18}
              anchor={anchor as "start" | "middle" | "end"}
              size={12.5}
            >
              {nd.d}
            </Note>
          </g>
        );
      })}

      {/* centre */}
      <Note x={400} y={194} anchor="middle" size={13} fill={INK2}>
        {"Four steps spend."}
      </Note>
      <text
        x={400}
        y={214}
        textAnchor="middle"
        fontFamily={BODY}
        fontSize={13}
        fill={SIGNAL}
      >
        {"The fifth refills the budget."}
      </text>
    </Frame>
  );
}
