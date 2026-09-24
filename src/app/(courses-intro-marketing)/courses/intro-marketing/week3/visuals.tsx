/* ==========================================================================
   Week 03 — figures
   --------------------------------------------------------------------------
   Hand-drawn SVG plates, one grammar per idea: a census of the consumer
   market, a body receiving stimuli, a fork into information sources, a
   slopegraph of rankings, an interrupted lane, a timeline that runs past the
   purchase, a wave that needs calming, nested rings of influence, a learning
   column, a field of subcultures, a sociogram, a perception sequence, a
   spectrum, two market lanes, a three-panel market structure, a round table,
   a matched pair, and two documents for one product.

   Conventions carried over from Week 01/02/04:
     · viewBox width 800 (400 for column plates), flat fills, hairline rules
     · INK carries the neutral case, SIGNAL the operative one, COUNTER the
       contrast or outward-looking state
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
  glyphProps,
  hash1,
  head2,
  headAlong1,
  INK,
  INK3,
  Key,
  Note,
  PAPER,
  r2,
  RULE,
  RULE2,
  Schematic,
  SIGNAL,
  SIGNAL_TINT,
} from "../_visuals/kit";
import { Person2 } from "../_visuals/objects";
import { ChatCircleText, HandGrabbing, Newspaper, Storefront } from "@phosphor-icons/react";

/* ==========================================================================
   1 · CENSUS — the consumer market is individuals and households
   ========================================================================== */

export function ConsumerMarket() {
  const ground = 186;
  const singles = [80, 125, 170, 215, 260];
  const homes = [
    { x: 430, w: 96, n: 2 },
    { x: 560, w: 110, n: 3 },
    { x: 690, w: 96, n: 2 },
  ];
  return (
    <Frame height={226} label="The consumer market: a row of individuals and a row of houses with the people of each household inside, bracketed together.">
      <line x1={40} y1={56} x2={760} y2={56} stroke={SIGNAL} strokeWidth={1.5} />
      <line x1={40} y1={56} x2={40} y2={66} stroke={SIGNAL} strokeWidth={1.5} />
      <line x1={760} y1={56} x2={760} y2={66} stroke={SIGNAL} strokeWidth={1.5} />
      <Key x={400} y={40} anchor="middle" fill={SIGNAL} size={12}>
        THE CONSUMER MARKET
      </Key>

      {singles.map((x) => (
        <Person2 key={x} x={x} y={ground} k={1.25} />
      ))}

      <Display x={322} y={ground - 12} anchor="middle" fill={INK3} size={30}>
        +
      </Display>

      {homes.map((h) => {
        const left = h.x - h.w / 2;
        const offsets = h.n === 3 ? [-30, 0, 30] : [-18, 18];
        return (
          <g key={h.x}>
            <rect x={left} y={ground - 66} width={h.w} height={66} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.5} />
            <path
              d={`M${left - 8} ${ground - 66}L${h.x} ${ground - 102}L${left + h.w + 8} ${ground - 66}`}
              fill="none"
              stroke={COUNTER}
              strokeWidth={1.5}
              strokeLinejoin="round"
            />
            {offsets.map((o) => (
              <Person2 key={o} x={h.x + o} y={ground} k={0.9} stroke={COUNTER} />
            ))}
          </g>
        );
      })}

      <line x1={40} y1={ground} x2={760} y2={ground} stroke={RULE} strokeWidth={1} />
      <Key x={170} y={214} anchor="middle" fill={INK} size={11}>
        INDIVIDUALS
      </Key>
      <Key x={560} y={214} anchor="middle" fill={COUNTER} size={11}>
        HOUSEHOLDS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   2 · STIMULI — a need triggered from inside or from outside
   ========================================================================== */

export function NeedStimuli() {
  return (
    <Frame height={230} label="A person recognizes a problem or need, triggered by an internal stimulus from within or an external stimulus from outside.">
      <Key x={400} y={50} anchor="middle" fill={SIGNAL} size={12}>
        PROBLEM OR NEED
      </Key>
      <circle cx={400} cy={86} r={20} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
      <Display x={400} y={96} anchor="middle" fill={SIGNAL} size={26}>
        !
      </Display>
      <circle cx={400} cy={116} r={3} fill={SIGNAL} />
      <circle cx={400} cy={127} r={2} fill={SIGNAL} />

      <line x1={320} y1={210} x2={480} y2={210} stroke={RULE} strokeWidth={1} />
      <Person2 x={400} y={210} k={2.2} />

      {/* internal: a pulse inside the body */}
      <circle cx={400} cy={190} r={4} fill={INK} />
      <circle cx={400} cy={190} r={9} fill="none" stroke={INK} strokeWidth={1} />
      <line x1={376} y1={190} x2={272} y2={190} stroke={INK} strokeWidth={1} />
      <Key x={264} y={194} anchor="end" fill={INK} size={11}>
        INTERNAL STIMULI
      </Key>

      {/* external: a screen sending a signal in */}
      <rect x={612} y={92} width={130} height={60} fill={PAPER} stroke={COUNTER} strokeWidth={1.5} />
      <circle cx={638} cy={112} r={8} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1} />
      <line x1={656} y1={108} x2={726} y2={108} stroke={COUNTER} strokeWidth={2} />
      <line x1={656} y1={118} x2={704} y2={118} stroke={COUNTER} strokeWidth={2} />
      <rect x={628} y={132} width={98} height={7} fill={COUNTER_TINT} />
      <line x1={606} y1={124} x2={426} y2={146} stroke={COUNTER} strokeWidth={1.5} />
      <path d={headAlong1(424, 146, -182, 22)} fill="none" stroke={COUNTER} strokeWidth={1.5} />
      <Key x={677} y={176} anchor="middle" fill={COUNTER} size={11}>
        EXTERNAL STIMULI
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   3 · FORK — may or may not search; four sources, personal the strongest
   ========================================================================== */

export function SearchFork() {
  const sources = [
    { y: 60, name: "PERSONAL", hot: true },
    { y: 112, name: "COMMERCIAL", hot: false },
    { y: 164, name: "PUBLIC", hot: false },
    { y: 216, name: "EXPERIENTIAL", hot: false },
  ];
  const icon = (name: string, y: number, tone: string) => {
    const p = { x: 452, y: y - 12, size: 24, weight: "duotone" as const, color: tone };
    if (name === "COMMERCIAL") return <Storefront {...p} />;
    if (name === "PUBLIC") return <Newspaper {...p} />;
    if (name === "EXPERIENTIAL") return <HandGrabbing {...p} />;
    return (
      <g>
        <Person2 x={458} y={y + 11} k={0.66} stroke={tone} fill={SIGNAL_TINT} width={1.25} />
        <Person2 x={474} y={y + 11} k={0.66} stroke={tone} fill={SIGNAL_TINT} width={1.25} />
      </g>
    );
  };
  return (
    <Frame height={256} label="Once a need is triggered, a consumer may search or may not. Searching fans out to four sources: two people (personal), a storefront (commercial), a newspaper (public), and a hand holding the product (experiential); the line to personal is the heaviest, marked most effective.">
      <circle cx={56} cy={150} r={10} fill={SIGNAL} />
      <Key x={56} y={178} anchor="middle" fill={SIGNAL} size={10}>
        NEED
      </Key>
      <Key x={56} y={192} anchor="middle" fill={SIGNAL} size={10}>
        TRIGGERED
      </Key>

      <path d="M68 150 C140 150 170 80 244 80" fill="none" stroke={INK} strokeWidth={1.5} />
      <circle cx={250} cy={80} r={5} fill={INK} />
      <Key x={250} y={62} anchor="middle" fill={INK} size={10}>
        MAY SEARCH
      </Key>

      <path d="M68 150 C140 150 170 230 240 230" fill="none" stroke={INK3} strokeWidth={1.5} strokeDasharray="4 5" />
      <circle cx={246} cy={230} r={5} fill={PAPER} stroke={INK3} strokeWidth={1.5} />
      <Key x={262} y={234} fill={INK3} size={10}>
        MAY NOT SEARCH
      </Key>

      <Key x={540} y={24} anchor="middle" fill={INK3} size={10}>
        INFORMATION SOURCES
      </Key>
      {sources.map((s) => (
        <g key={s.name}>
          <line
            x1={256}
            y1={80}
            x2={438}
            y2={s.y}
            stroke={s.hot ? SIGNAL : INK3}
            strokeWidth={s.hot ? 2.5 : 1}
          />
          <rect
            x={440}
            y={s.y - 20}
            width={200}
            height={40}
            fill={s.hot ? SIGNAL_TINT : PAPER}
            stroke={s.hot ? SIGNAL : INK}
            strokeWidth={s.hot ? 2 : 1.25}
          />
          {icon(s.name, s.y, s.hot ? SIGNAL : INK)}
          <Key x={492} y={s.y + 4} fill={s.hot ? SIGNAL : INK} size={10.5}>
            {s.name}
          </Key>
        </g>
      ))}
      <Key x={656} y={64} fill={SIGNAL} size={10}>
        MOST EFFECTIVE
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   4 · SLOPEGRAPH — one choice set, evaluated differently
   ========================================================================== */

export function ChoiceSetSlope() {
  const L = 220;
  const R = 580;
  const W = 120;
  const rows = [85, 135, 185, 235];
  const brands = [
    { name: "BRAND A", tone: INK, left: 0, right: 1 },
    { name: "BRAND B", tone: INK3, left: 1, right: 3 },
    { name: "BRAND C", tone: SIGNAL, left: 2, right: 0 },
    { name: "BRAND D", tone: COUNTER, left: 3, right: 2 },
  ];
  return (
    <Frame height={292} label="The same four brands in a choice set, ranked in one order by one consumer in one situation, and in a different order by another consumer in another situation.">
      <Schematic />
      <Key x={L} y={40} anchor="middle" fill={INK3} size={10}>
        ONE CONSUMER, ONE SITUATION
      </Key>
      <Key x={R} y={40} anchor="middle" fill={INK3} size={10}>
        ANOTHER CONSUMER, ANOTHER SITUATION
      </Key>

      {rows.map((y, i) => (
        <g key={y}>
          <Display x={L - W / 2 - 16} y={y + 7} anchor="end" fill={INK3} size={18}>
            {String(i + 1)}
          </Display>
          <Display x={R + W / 2 + 16} y={y + 7} fill={INK3} size={18}>
            {String(i + 1)}
          </Display>
        </g>
      ))}

      {brands.map((b) => {
        const yl = rows[b.left];
        const yr = rows[b.right];
        return (
          <g key={b.name}>
            <line x1={L + W / 2} y1={yl} x2={R - W / 2} y2={yr} stroke={b.tone} strokeWidth={1.5} />
            {[
              [L, yl],
              [R, yr],
            ].map(([x, y]) => (
              <g key={x}>
                <rect x={x - W / 2} y={y - 15} width={W} height={30} fill={PAPER} stroke={b.tone} strokeWidth={1.5} />
                <Key x={x} y={y + 4} anchor="middle" fill={b.tone} size={10.5}>
                  {b.name}
                </Key>
              </g>
            ))}
          </g>
        );
      })}

      <Key x={400} y={280} anchor="middle" fill={INK3} size={10}>
        SAME CHOICE SET, DIFFERENT EVALUATIONS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   5 · INTERRUPTED LANE — intention to decision, with two forces between
   ========================================================================== */

export function IntentionToDecision() {
  const ranks = [
    { y: 85, n: "1", name: "BRAND C", top: true },
    { y: 125, n: "2", name: "BRAND A", top: false },
    { y: 165, n: "3", name: "BRAND D", top: false },
  ];
  return (
    <Frame height={236} label="The consumer ranks brands, forms a purchase intention for the most preferred one, and moves toward a purchase decision; attitudes of others and unexpected situational factors come in between.">
      <Key x={125} y={48} anchor="middle" fill={INK3} size={10}>
        RANKS BRANDS
      </Key>
      {ranks.map((r) => (
        <g key={r.n}>
          <rect
            x={60}
            y={r.y - 15}
            width={130}
            height={30}
            fill={r.top ? SIGNAL_TINT : PAPER}
            stroke={r.top ? SIGNAL : INK3}
            strokeWidth={r.top ? 1.75 : 1.25}
          />
          <Display x={78} y={r.y + 6} anchor="middle" fill={r.top ? SIGNAL : INK3} size={16}>
            {r.n}
          </Display>
          <Key x={98} y={r.y + 4} fill={r.top ? SIGNAL : INK3} size={10}>
            {r.name}
          </Key>
        </g>
      ))}

      <path d="M190 85 C240 85 240 125 282 125" fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <circle cx={290} cy={125} r={8} fill={PAPER} stroke={INK} strokeWidth={2} />
      <Key x={290} y={160} anchor="middle" fill={INK} size={10}>
        PURCHASE INTENTION
      </Key>

      <line x1={298} y1={125} x2={400} y2={125} stroke={SIGNAL} strokeWidth={2} />
      <line x1={400} y1={125} x2={620} y2={125} stroke={SIGNAL} strokeWidth={2} strokeDasharray="6 6" />
      <line x1={620} y1={125} x2={686} y2={125} stroke={SIGNAL} strokeWidth={2} />
      <path d={head2.right(688, 125)} fill="none" stroke={SIGNAL} strokeWidth={2} />
      <circle cx={700} cy={125} r={10} fill={SIGNAL} />
      <Key x={700} y={160} anchor="middle" fill={SIGNAL} size={10}>
        PURCHASE DECISION
      </Key>

      <line x1={460} y1={62} x2={460} y2={112} stroke={COUNTER} strokeWidth={1.5} />
      <path d={head2.down(460, 114)} fill="none" stroke={COUNTER} strokeWidth={1.5} />
      <Key x={460} y={48} anchor="middle" fill={COUNTER} size={10}>
        ATTITUDES OF OTHERS
      </Key>

      <line x1={560} y1={196} x2={560} y2={138} stroke={COUNTER} strokeWidth={1.5} />
      <path d={head2.up(560, 136)} fill="none" stroke={COUNTER} strokeWidth={1.5} />
      <Key x={560} y={216} anchor="middle" fill={COUNTER} size={10}>
        UNEXPECTED SITUATIONAL FACTORS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   6 · TIMELINE — the marketer's job runs past the purchase
   ========================================================================== */

export function PostpurchaseTimeline() {
  const zig = Array.from({ length: 13 }, (_, i) => `${300 + i * 10} ${i === 0 || i === 12 ? 150 : i % 2 ? 138 : 162}`);
  return (
    <Frame height={250} label="A timeline with the product bought partway along. The marketer's job continues past that point, through cognitive dissonance, to a satisfied or dissatisfied consumer.">
      <line x1={60} y1={44} x2={736} y2={44} stroke={SIGNAL} strokeWidth={1.5} />
      <line x1={60} y1={44} x2={60} y2={54} stroke={SIGNAL} strokeWidth={1.5} />
      <path d={head2.right(740, 44)} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <Key x={400} y={32} anchor="middle" fill={SIGNAL} size={11}>
        THE MARKETER&apos;S JOB
      </Key>

      <line x1={40} y1={150} x2={300} y2={150} stroke={INK3} strokeWidth={1.5} />
      <line x1={300} y1={96} x2={300} y2={204} stroke={INK} strokeWidth={1.5} />
      <Key x={300} y={86} anchor="middle" fill={INK} size={10.5}>
        PRODUCT BOUGHT
      </Key>

      <path d={`M${zig.join("L")}`} fill="none" stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
      <line x1={365} y1={168} x2={365} y2={202} stroke={RULE2} strokeWidth={1} />
      <Key x={365} y={220} anchor="middle" fill={INK} size={10}>
        COGNITIVE DISSONANCE
      </Key>

      <path d="M420 150 C520 150 580 96 690 96" fill="none" stroke={COUNTER} strokeWidth={2} />
      <circle cx={698} cy={96} r={7} fill={COUNTER} />
      <Key x={704} y={74} anchor="end" fill={COUNTER} size={10.5}>
        SATISFIED
      </Key>

      <path d="M420 150 C520 150 580 204 690 204" fill="none" stroke={INK3} strokeWidth={2} />
      <circle cx={698} cy={204} r={7} fill={INK3} />
      <Key x={704} y={236} anchor="end" fill={INK3} size={10.5}>
        DISSATISFIED
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   7 · CALMING WAVE — what could the brand say to settle it?
   ========================================================================== */

export function DissonanceCalm() {
  const amps = [30, -34, 26, -36, 22, -32, 28, -34, 24, -30, 20, -32, 26, -34, 28, -30, 22, -34, 26, -30, 24, -20];
  const pts = amps.map((a, i) => `${40 + i * 15} ${110 + (i === 0 ? 0 : a)}`);
  return (
    <Frame height={170} label="A jagged line of buyer's remorse, then a message bubble from the brand, then a calm flat line of less dissonance.">
      <Key x={205} y={40} anchor="middle" fill={INK} size={11}>
        BUYER&apos;S REMORSE
      </Key>
      <path d={`M${pts.join("L")}`} fill="none" stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />

      <Key x={400} y={40} anchor="middle" fill={COUNTER} size={11}>
        BRAND COMMUNICATION
      </Key>
      <ChatCircleText x={372} y={82} size={56} weight="duotone" color={COUNTER} />

      <Key x={595} y={40} anchor="middle" fill={INK} size={11}>
        LESS DISSONANCE
      </Key>
      <line x1={440} y1={110} x2={760} y2={110} stroke={INK} strokeWidth={1.5} />
    </Frame>
  );
}

/* ==========================================================================
   8 · NESTED RINGS — four kinds of influence around the buyer
   ========================================================================== */

export function InfluenceRings({ compact = false }: { compact?: boolean } = {}) {
  if (compact) {
    // A 400-square version for text to wrap around: names sit on their bands.
    const c = 200;
    const rings = [
      { r: 190, inner: 152, name: "CULTURAL" },
      { r: 152, inner: 114, name: "SOCIAL" },
      { r: 114, inner: 76, name: "PERSONAL" },
      { r: 76, inner: 10, name: "PSYCHOLOGICAL" },
    ];
    return (
      <Frame width={400} height={400} label="Four nested rings around the buyer at the centre, named on their bands: cultural outermost, then social, personal, and psychological.">
        {rings.map((ring) => (
          <circle key={ring.name} cx={c} cy={c} r={ring.r} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1} />
        ))}
        {rings.map((ring) => (
          <Key key={ring.name} x={c} y={r2(c - (ring.r + ring.inner) / 2 + 4)} anchor="middle" fill={COUNTER} size={ring.name === "PSYCHOLOGICAL" ? 9.5 : 11}>
            {ring.name}
          </Key>
        ))}
        <circle cx={c} cy={c} r={9} fill={SIGNAL} />
        <Key x={c} y={c + 30} anchor="middle" fill={SIGNAL} size={9.5}>
          THE BUYER
        </Key>
      </Frame>
    );
  }
  const cx = 480;
  const cy = 188;
  const rings = [
    { r: 160, y: 58, name: "CULTURAL" },
    { r: 124, y: 108, name: "SOCIAL" },
    { r: 88, y: 158, name: "PERSONAL" },
    { r: 52, y: 208, name: "PSYCHOLOGICAL" },
  ];
  return (
    <Frame height={360} label="Nested rings around the buyer: cultural outermost, then social, personal, and psychological characteristics.">
      {rings.map((ring) => (
        <circle key={ring.name} cx={cx} cy={cy} r={ring.r} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1} />
      ))}
      <circle cx={cx} cy={cy} r={10} fill={SIGNAL} />

      {rings.map((ring) => {
        const x = r2(cx - Math.sqrt(ring.r * ring.r - (ring.y - cy) * (ring.y - cy)));
        return (
          <g key={ring.name}>
            <line x1={250} y1={ring.y} x2={x} y2={ring.y} stroke={INK} strokeWidth={1} />
            <circle cx={x} cy={ring.y} r={2.5} fill={INK} />
            <Key x={240} y={ring.y + 4} anchor="end" fill={INK} size={11}>
              {ring.name}
            </Key>
          </g>
        );
      })}

      <line x1={494} y1={cy} x2={662} y2={cy} stroke={SIGNAL} strokeWidth={1} />
      <Key x={670} y={cy + 4} fill={SIGNAL} size={11}>
        THE BUYER
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   9 · LEARNING COLUMN — what a person learns from society (400 wide)
   ========================================================================== */

export function LearnedFromSociety() {
  const chips = ["VALUES", "PERCEPTIONS", "WANTS", "BEHAVIORS"];
  return (
    <Frame width={400} height={316} label="Society at the top passes basic values, perceptions, wants, and behaviors down to a person.">
      <rect x={20} y={20} width={360} height={40} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.5} />
      <Key x={200} y={45} anchor="middle" fill={COUNTER} size={12}>
        SOCIETY
      </Key>
      <line x1={200} y1={60} x2={200} y2={236} stroke={INK3} strokeWidth={1.25} />
      <path d={head2.down(200, 238)} fill="none" stroke={INK3} strokeWidth={1.25} />
      {chips.map((c, i) => {
        const top = 76 + i * 38;
        return (
          <g key={c}>
            <rect x={110} y={top} width={180} height={28} fill={PAPER} stroke={INK} strokeWidth={1.25} />
            <Key x={200} y={top + 18} anchor="middle" fill={INK} size={10.5}>
              {c}
            </Key>
          </g>
        );
      })}
      <Person2 x={200} y={306} k={1.6} stroke={SIGNAL} />
    </Frame>
  );
}

/* ==========================================================================
   10 · FIELD OF SUBCULTURES — groups with shared values inside a culture
   ========================================================================== */

export function SubcultureField() {
  const loose = [
    [70, 100],
    [90, 230],
    [140, 260],
    [300, 210],
    [340, 180],
    [180, 90],
    [330, 230],
    [60, 190],
    [240, 60],
    [110, 80],
  ];
  const groups = [
    { cx: 120, cy: 150, r: 48, tone: COUNTER, tint: COUNTER_TINT, shape: "circle" },
    { cx: 275, cy: 125, r: 44, tone: SIGNAL, tint: SIGNAL_TINT, shape: "square" },
    { cx: 215, cy: 232, r: 40, tone: INK, tint: "none", shape: "triangle" },
  ] as const;
  return (
    <Frame width={400} height={330} label="A wide culture holding scattered individuals and three subcultures, each a cluster of people sharing the same marks.">
      <ellipse cx={200} cy={160} rx={180} ry={130} fill="none" stroke={INK3} strokeWidth={1.25} />
      <Key x={200} y={52} anchor="middle" fill={INK3} size={11}>
        CULTURE
      </Key>
      {loose.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={3} fill={INK3} />
      ))}
      {groups.map((g) => (
        <g key={g.cx}>
          <circle cx={g.cx} cy={g.cy} r={g.r} fill={g.tint} stroke={g.tone} strokeWidth={1.5} />
          {Array.from({ length: 5 }, (_, i) => {
            const t = ((-90 + i * 72) * Math.PI) / 180;
            const x = r2(g.cx + 20 * Math.cos(t));
            const y = r2(g.cy + 20 * Math.sin(t));
            if (g.shape === "circle") return <circle key={i} cx={x} cy={y} r={4.5} fill={g.tone} />;
            if (g.shape === "square") return <rect key={i} x={x - 4} y={y - 4} width={8} height={8} fill={g.tone} />;
            return <path key={i} d={`M${x} ${r2(y - 5)}L${r2(x + 5)} ${r2(y + 4)}L${r2(x - 5)} ${r2(y + 4)}Z`} fill={g.tone} />;
          })}
        </g>
      ))}
      <Key x={200} y={318} anchor="middle" fill={INK} size={11}>
        SUBCULTURES
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   11 · SOCIOGRAM — groups around the consumer, direct and indirect
   ========================================================================== */

export function SocialWeb() {
  const net = [
    [570, 222],
    [610, 206],
    [642, 238],
    [602, 256],
    [558, 250],
  ];
  const edges = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 0],
    [0, 2],
  ];
  return (
    <Frame height={300} label="The consumer at the centre, with family and small groups as direct references, and an influencer and social networks as indirect references.">
      <line x1={226} y1={96} x2={382} y2={158} stroke={INK} strokeWidth={1.25} />
      <line x1={232} y1={234} x2={382} y2={180} stroke={INK} strokeWidth={1.25} />
      <line x1={584} y1={94} x2={418} y2={158} stroke={SIGNAL} strokeWidth={1.25} strokeDasharray="5 5" />
      <line x1={556} y1={236} x2={418} y2={182} stroke={COUNTER} strokeWidth={1.25} strokeDasharray="5 5" />
      <Key x={300} y={172} anchor="middle" fill={INK3} size={10}>
        DIRECT
      </Key>
      <Key x={500} y={172} anchor="middle" fill={INK3} size={10}>
        INDIRECT
      </Key>

      <Person2 x={400} y={196} k={1.6} />
      <Key x={400} y={222} anchor="middle" fill={INK} size={10.5}>
        CONSUMER
      </Key>

      {[176, 200, 224].map((x) => (
        <Person2 key={x} x={x} y={100} k={0.85} />
      ))}
      <Key x={200} y={124} anchor="middle" fill={INK} size={10.5}>
        FAMILY
      </Key>

      <circle cx={200} cy={234} r={30} fill="none" stroke={RULE2} strokeWidth={1} />
      {[
        [185, 220],
        [215, 220],
        [185, 248],
        [215, 248],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={6} fill={PAPER} stroke={INK} strokeWidth={1.25} />
      ))}
      <Key x={200} y={286} anchor="middle" fill={INK} size={10.5}>
        SMALL GROUPS
      </Key>

      <Person2 x={600} y={100} k={1} stroke={SIGNAL} />
      <path d="M614 62 A 14 14 0 0 1 614 82" fill="none" stroke={SIGNAL} strokeWidth={1.25} />
      <path d="M622 55 A 24 24 0 0 1 622 89" fill="none" stroke={SIGNAL} strokeWidth={1.25} />
      <Key x={600} y={124} anchor="middle" fill={SIGNAL} size={10.5}>
        INFLUENCER
      </Key>
      <Note x={600} y={142} anchor="middle" size={12} italic>
        influencer marketing
      </Note>

      {edges.map(([a, b]) => (
        <line key={`${a}-${b}`} x1={net[a][0]} y1={net[a][1]} x2={net[b][0]} y2={net[b][1]} stroke={COUNTER} strokeWidth={1} />
      ))}
      {net.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={6} fill={PAPER} stroke={COUNTER} strokeWidth={1.5} />
      ))}
      <Note x={666} y={236} size={12} italic>
        word of mouth
      </Note>
      <Key x={600} y={286} anchor="middle" fill={COUNTER} size={10.5}>
        SOCIAL NETWORKS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   12 · PERCEPTION SEQUENCE — select, organize, interpret
   ========================================================================== */

export function PerceptionSequence() {
  const cxs = [110, 303, 497, 690];
  const cy = 140;
  const marks = Array.from({ length: 22 }, (_, i) => ({
    dx: r2((hash1(i + 1) * 2 - 1) * 60),
    dy: r2((hash1(i + 51) * 2 - 1) * 46),
    shape: i % 3,
  }));
  const chosen = [1, 4, 6, 9, 12, 15, 17, 20];
  const house = [
    [-40, 40],
    [-40, -5],
    [-20, -25],
    [0, -45],
    [20, -25],
    [40, -5],
    [40, 40],
    [0, 40],
  ];
  const mark = (x: number, y: number, shape: number, fill: string, key: string) => {
    x = r2(x);
    y = r2(y);
    if (shape === 0) return <circle key={key} cx={x} cy={y} r={4.5} fill={fill} />;
    if (shape === 1) return <rect key={key} x={x - 4} y={y - 4} width={8} height={8} fill={fill} />;
    return <path key={key} d={`M${x} ${r2(y - 5)}L${r2(x + 5)} ${r2(y + 4)}L${r2(x - 5)} ${r2(y + 4)}Z`} fill={fill} />;
  };
  const headers = [
    { t: "INFORMATION", c: INK3 },
    { t: "SELECT", c: SIGNAL },
    { t: "ORGANIZE", c: SIGNAL },
    { t: "INTERPRET", c: SIGNAL },
  ];
  return (
    <Frame height={250} label="Perception in three moves: from scattered information, a person selects a few pieces, organizes them, and interprets them into a meaningful picture, here a house.">
      {headers.map((h, i) => (
        <Key key={h.t} x={cxs[i]} y={44} anchor="middle" fill={h.c} size={10.5}>
          {h.t}
        </Key>
      ))}
      {cxs.slice(0, -1).map((x, i) => (
        <g key={x}>
          <line x1={x + 80} y1={cy} x2={cxs[i + 1] - 82} y2={cy} stroke={INK3} strokeWidth={1.25} />
          <path d={head2.right(cxs[i + 1] - 80, cy)} fill="none" stroke={INK3} strokeWidth={1.25} />
        </g>
      ))}

      {marks.map((m, i) => mark(cxs[0] + m.dx, cy + m.dy, m.shape, INK3, `a${i}`))}

      {marks.map((m, i) =>
        mark(cxs[1] + m.dx, cy + m.dy, m.shape, chosen.includes(i) ? SIGNAL : RULE2, `b${i}`),
      )}

      {chosen.map((idx, j) =>
        mark(cxs[2] - 36 + (j % 4) * 24, cy - 15 + Math.floor(j / 4) * 30, marks[idx].shape, SIGNAL, `c${j}`),
      )}

      <path
        d={`M${house.map(([x, y]) => `${cxs[3] + x} ${cy + y}`).join("L")}Z`}
        fill={SIGNAL_TINT}
        stroke={SIGNAL}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      {house.map(([x, y], j) => mark(cxs[3] + x, cy + y, marks[chosen[j]].shape, SIGNAL, `d${j}`))}
      <Key x={cxs[3]} y={226} anchor="middle" fill={SIGNAL} size={10.5}>
        A MEANINGFUL PICTURE
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   13 · SPECTRUM — expertise or lifestyle?
   ========================================================================== */

export function ExpertiseLifestyle() {
  return (
    <Frame height={180} label="An influencer standing on a line between expertise and lifestyle, with a question of which way their influence leans.">
      <Display x={400} y={52} anchor="middle" fill={SIGNAL} size={26}>
        ?
      </Display>
      <Person2 x={400} y={120} k={1.5} />
      <line x1={368} y1={104} x2={302} y2={104} stroke={INK3} strokeWidth={1.25} />
      <path d={head2.left(300, 104)} fill="none" stroke={INK3} strokeWidth={1.25} />
      <line x1={432} y1={104} x2={498} y2={104} stroke={INK3} strokeWidth={1.25} />
      <path d={head2.right(500, 104)} fill="none" stroke={INK3} strokeWidth={1.25} />

      <line x1={140} y1={130} x2={660} y2={130} stroke={INK3} strokeWidth={1.5} />
      <circle cx={140} cy={130} r={6} fill={COUNTER} />
      <circle cx={660} cy={130} r={6} fill={SIGNAL} />
      <Key x={140} y={164} anchor="middle" fill={COUNTER} size={12}>
        EXPERTISE
      </Key>
      <Key x={400} y={164} anchor="middle" fill={INK} size={10.5}>
        INFLUENCER
      </Key>
      <Key x={660} y={164} anchor="middle" fill={SIGNAL} size={12}>
        LIFESTYLE
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   14 · TWO LANES — selling to final consumers, or to organizations
   ========================================================================== */

export function ConsumerAndBusinessLanes() {
  return (
    <Frame height={248} label="Two lanes. B2C: a business sells to a final consumer. B2B: a business sells to an organization, which uses what it buys in the production of other products.">
      <Key x={40} y={86} fill={COUNTER} size={13}>
        B2C
      </Key>
      <rect x={100} y={64} width={140} height={32} fill={PAPER} stroke={INK} strokeWidth={1.25} />
      <Key x={170} y={84} anchor="middle" fill={INK} size={10}>
        BUSINESS
      </Key>
      <line x1={244} y1={80} x2={638} y2={80} stroke={COUNTER} strokeWidth={1.5} />
      <path d={head2.right(640, 80)} fill="none" stroke={COUNTER} strokeWidth={1.5} />
      <Person2 x={690} y={98} k={1.2} stroke={COUNTER} />
      <Key x={690} y={124} anchor="middle" fill={COUNTER} size={10.5}>
        FINAL CONSUMER
      </Key>

      <line x1={20} y1={145} x2={780} y2={145} stroke={RULE} strokeWidth={1} />

      <Key x={40} y={196} fill={SIGNAL} size={13}>
        B2B
      </Key>
      <rect x={100} y={174} width={140} height={32} fill={PAPER} stroke={INK} strokeWidth={1.25} />
      <Key x={170} y={194} anchor="middle" fill={INK} size={10}>
        BUSINESS
      </Key>
      <line x1={244} y1={190} x2={374} y2={190} stroke={SIGNAL} strokeWidth={1.5} />
      <path d={head2.right(376, 190)} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <path
        d="M380 174 L380 158 L415 170 L415 158 L450 170 L450 158 L485 170 L485 158 L520 170 L520 174"
        fill={SIGNAL_TINT}
        stroke={SIGNAL}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <rect x={380} y={174} width={140} height={32} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
      <Key x={450} y={194} anchor="middle" fill={SIGNAL} size={10}>
        ORGANIZATION
      </Key>
      <line x1={524} y1={190} x2={634} y2={190} stroke={SIGNAL} strokeWidth={1.5} />
      <path d={head2.right(636, 190)} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <Note x={580} y={178} anchor="middle" size={11.5} italic>
        used in production
      </Note>
      {[644, 676, 708].map((x) => (
        <rect key={x} x={x} y={177} width={26} height={26} fill={PAPER} stroke={INK} strokeWidth={1.25} />
      ))}
      <Key x={689} y={232} anchor="middle" fill={INK} size={10.5}>
        OTHER PRODUCTS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   15 · TRIPTYCH — buyers, derived demand, and fluctuation
   ========================================================================== */

export function MarketStructureTriptych() {
  const calm = [0, -4, -2, -5, -1, -4, -3, -6, -2, -4, -3];
  const swing = [0, -26, 10, -30, 18, -12, 24, -28, 6, -20, 14];
  const line = (base: number, ds: number[]) =>
    `M${ds.map((d, i) => `${600 + i * 17} ${base + d}`).join("L")}`;
  return (
    <Frame height={240} label="Three panels. Buyers: many small B2C buyers against a few large B2B buyers. Derived demand: consumer demand drives business demand. Demand over time: B2C steady, B2B fluctuating.">
      <Schematic />
      <line x1={267} y1={20} x2={267} y2={228} stroke={RULE} strokeWidth={1} />
      <line x1={533} y1={20} x2={533} y2={228} stroke={RULE} strokeWidth={1} />

      {/* buyers */}
      <Key x={135} y={34} anchor="middle" fill={INK3} size={10}>
        BUYERS
      </Key>
      <Key x={30} y={90} fill={INK3} size={11}>
        B2C
      </Key>
      {[76, 96].map((y) =>
        Array.from({ length: 10 }, (_, i) => (
          <circle key={`${y}-${i}`} cx={74 + i * 17} cy={y} r={4.5} fill={PAPER} stroke={INK3} strokeWidth={1.25} />
        )),
      )}
      <Key x={30} y={166} fill={SIGNAL} size={11}>
        B2B
      </Key>
      {[90, 150, 210].map((x) => (
        <rect key={x} x={x - 22} y={138} width={44} height={44} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
      ))}

      {/* derived demand */}
      <Key x={400} y={34} anchor="middle" fill={INK3} size={10}>
        DERIVED DEMAND
      </Key>
      <rect x={310} y={58} width={180} height={32} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.5} />
      <Key x={400} y={78} anchor="middle" fill={COUNTER} size={10}>
        CONSUMER DEMAND
      </Key>
      <line x1={400} y1={94} x2={400} y2={152} stroke={SIGNAL} strokeWidth={1.5} />
      <path d={head2.down(400, 154)} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <rect x={310} y={158} width={180} height={32} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
      <Key x={400} y={178} anchor="middle" fill={SIGNAL} size={10}>
        BUSINESS DEMAND
      </Key>

      {/* fluctuation */}
      <Key x={665} y={34} anchor="middle" fill={INK3} size={10}>
        DEMAND OVER TIME
      </Key>
      <Key x={556} y={90} fill={INK3} size={11}>
        B2C
      </Key>
      <path d={line(86, calm)} fill="none" stroke={INK3} strokeWidth={1.5} strokeLinejoin="round" />
      <Key x={556} y={170} fill={SIGNAL} size={11}>
        B2B
      </Key>
      <path d={line(166, swing)} fill="none" stroke={SIGNAL} strokeWidth={1.75} strokeLinejoin="round" />
      <Note x={685} y={224} anchor="middle" size={12} italic>
        more fluctuating
      </Note>
    </Frame>
  );
}

/* ==========================================================================
   16 · ROUND TABLE — five roles around one purchase decision
   ========================================================================== */

export function BuyingCenterTable({ round = false }: { round?: boolean } = {}) {
  if (round) {
    // A 400-wide version for text to wrap around: only the table and its roles.
    const c = { x: 200, y: 165 };
    const roles = [
      { a: -90, name: "USERS" },
      { a: -18, name: "INFLUENCERS" },
      { a: 54, name: "DECIDERS" },
      { a: 126, name: "BUYERS" },
      { a: 198, name: "GATEKEEPERS" },
    ];
    return (
      <Frame width={400} height={306} label="Five people, users, influencers, deciders, buyers, and gatekeepers, around one oval purchase decision.">
        <ellipse cx={c.x} cy={c.y} rx={96} ry={52} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
        <Key x={c.x} y={c.y + 4} anchor="middle" fill={SIGNAL} size={10}>
          PURCHASE DECISION
        </Key>
        {roles.map((s) => {
          const t = (s.a * Math.PI) / 180;
          const x = r2(c.x + 150 * Math.cos(t));
          const y = r2(c.y + 112 * Math.sin(t));
          return (
            <g key={s.name}>
              <Person2 x={x} y={r2(y + 17)} k={1.1} />
              <Key x={x} y={s.a < 0 || s.a > 180 ? y - 30 : y + 36} anchor="middle" fill={INK} size={9.5}>
                {s.name}
              </Key>
            </g>
          );
        })}
      </Frame>
    );
  }
  const cx = 520;
  const cy = 160;
  const seats = [
    { a: -90, name: "USERS", below: false },
    { a: -18, name: "INFLUENCERS", below: true },
    { a: 54, name: "DECIDERS", below: true },
    { a: 126, name: "BUYERS", below: true },
    { a: 198, name: "GATEKEEPERS", below: true },
  ];
  return (
    <Frame height={300} label="Left: one person, rarely the whole story. Right: five people, users, influencers, deciders, buyers, and gatekeepers, around one oval purchase decision.">
      <Person2 x={120} y={196} k={1.6} stroke={INK3} dashed />
      <Key x={120} y={232} anchor="middle" fill={INK3} size={10}>
        RARELY ONE PERSON
      </Key>
      <line x1={240} y1={40} x2={240} y2={260} stroke={RULE} strokeWidth={1} />

      <ellipse cx={cx} cy={cy} rx={140} ry={66} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
      <Key x={cx} y={cy + 4} anchor="middle" fill={SIGNAL} size={10.5}>
        PURCHASE DECISION
      </Key>
      {seats.map((s) => {
        const t = (s.a * Math.PI) / 180;
        const x = r2(cx + 215 * Math.cos(t));
        const y = r2(cy + 112 * Math.sin(t));
        return (
          <g key={s.name}>
            <Person2 x={x} y={r2(y + 17)} k={1.1} />
            <Key x={x} y={s.below ? y + 36 : y - 30} anchor="middle" fill={INK} size={10}>
              {s.name}
            </Key>
          </g>
        );
      })}
    </Frame>
  );
}

/* ==========================================================================
   17 · MATCHED PAIR — trained salesperson, trained purchasing agent
   ========================================================================== */

function Badge({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={7} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
      <path d={`M${x - 3} ${y}L${x - 1} ${y + 3}L${x + 3.5} ${y - 3}`} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
    </g>
  );
}

export function MatchedExperts() {
  const ground = 120;
  return (
    <Frame width={640} height={170} label="A trained purchasing agent for the business buyer, backed by more decision participants, faces an equal: a well-trained salesperson for the B2B marketer.">
      <Key x={95} y={50} anchor="middle" fill={INK3} size={9.5}>
        MORE DECISION
      </Key>
      <Key x={95} y={64} anchor="middle" fill={INK3} size={9.5}>
        PARTICIPANTS
      </Key>
      {[44, 78, 112, 146].map((x) => (
        <Person2 key={x} x={x} y={ground} k={1.1} stroke={INK3} />
      ))}

      <Key x={210} y={36} anchor="middle" fill={INK3} size={10}>
        BUSINESS BUYER
      </Key>
      <Person2 x={210} y={ground} k={2} />
      <Badge x={219} y={102} />

      <Display x={320} y={104} anchor="middle" fill={SIGNAL} size={40}>
        =
      </Display>

      <Key x={430} y={36} anchor="middle" fill={INK3} size={10}>
        B2B MARKETER
      </Key>
      <Person2 x={430} y={ground} k={2} />
      <Badge x={439} y={102} />

      <line x1={30} y1={ground} x2={530} y2={ground} stroke={RULE} strokeWidth={1} />
      <Key x={210} y={152} anchor="middle" fill={INK} size={10}>
        TRAINED PURCHASING AGENT
      </Key>
      <Key x={430} y={152} anchor="middle" fill={INK} size={10}>
        WELL-TRAINED SALESPERSON
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   18 · TWO DOCUMENTS — one product, different materials per role
   ========================================================================== */

export function TwoBrochures({ column = false }: { column?: boolean } = {}) {
  const lens = [140, 120, 136, 100, 130, 90];
  if (column) {
    // A 400-wide version: the product on top feeding two documents below.
    return (
      <Frame width={400} height={352} label="One product at the top feeds two documents in one buying center: a technical one for the user, an IT employee, and a financial one for the decider, the CFO.">
        <rect x={160} y={20} width={80} height={32} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
        <Key x={200} y={40} anchor="middle" fill={SIGNAL} size={10}>
          PRODUCT
        </Key>
        <path d="M184 56 C184 80 105 72 105 94" fill="none" stroke={INK3} strokeWidth={1.25} />
        <path d={head2.down(105, 96)} fill="none" stroke={INK3} strokeWidth={1.25} />
        <path d="M216 56 C216 80 295 72 295 94" fill="none" stroke={INK3} strokeWidth={1.25} />
        <path d={head2.down(295, 96)} fill="none" stroke={INK3} strokeWidth={1.25} />

        {/* for the user */}
        <rect x={20} y={100} width={170} height={170} fill={PAPER} stroke={INK} strokeWidth={1.5} />
        <Key x={105} y={122} anchor="middle" fill={INK} size={9.5}>
          FOR THE USER
        </Key>
        <circle cx={50} cy={152} r={9} fill="none" stroke={INK} strokeWidth={1.75} />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((d) => (
          <rect key={d} x={48} y={137} width={4} height={5} fill={INK} transform={`rotate(${d} 50 152)`} />
        ))}
        <line x1={72} y1={146} x2={170} y2={146} stroke={INK3} strokeWidth={2} />
        <line x1={72} y1={158} x2={146} y2={158} stroke={INK3} strokeWidth={2} />
        {lens.map((l, i) => (
          <line key={i} x1={36} y1={186 + i * 13} x2={r2(36 + l * 0.9)} y2={186 + i * 13} stroke={RULE2} strokeWidth={2} />
        ))}

        {/* for the decider */}
        <rect x={210} y={100} width={170} height={170} fill={PAPER} stroke={COUNTER} strokeWidth={1.5} />
        <Key x={295} y={122} anchor="middle" fill={COUNTER} size={9.5}>
          FOR THE DECIDER
        </Key>
        <Display x={242} y={164} anchor="middle" fill={COUNTER} size={30}>
          $
        </Display>
        <line x1={266} y1={146} x2={360} y2={146} stroke={INK3} strokeWidth={2} />
        <line x1={266} y1={158} x2={336} y2={158} stroke={INK3} strokeWidth={2} />
        {[24, 40, 56, 72].map((h, i) => (
          <rect key={h} x={236 + i * 34} y={254 - h} width={22} height={h} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.25} />
        ))}
        <line x1={226} y1={254} x2={364} y2={254} stroke={COUNTER} strokeWidth={1} />

        <Key x={105} y={294} anchor="middle" fill={INK} size={10.5}>
          IT EMPLOYEE
        </Key>
        <Key x={295} y={294} anchor="middle" fill={COUNTER} size={10.5}>
          CFO
        </Key>
        <line x1={20} y1={312} x2={380} y2={312} stroke={INK3} strokeWidth={1} />
        <line x1={20} y1={306} x2={20} y2={312} stroke={INK3} strokeWidth={1} />
        <line x1={380} y1={306} x2={380} y2={312} stroke={INK3} strokeWidth={1} />
        <Key x={200} y={334} anchor="middle" fill={INK3} size={9.5}>
          ONE BUYING CENTER
        </Key>
      </Frame>
    );
  }
  return (
    <Frame height={290} label="One product at the centre of one buying center, with a technical document for the user, an IT employee, and a financial document for the decider, the CFO.">
      <Key x={400} y={36} anchor="middle" fill={INK3} size={10}>
        ONE BUYING CENTER
      </Key>

      {/* for the user */}
      <rect x={110} y={56} width={180} height={190} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <Key x={200} y={80} anchor="middle" fill={INK} size={10}>
        FOR THE USER
      </Key>
      <circle cx={150} cy={118} r={9} fill="none" stroke={INK} strokeWidth={1.75} />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((d) => (
        <rect key={d} x={148} y={103} width={4} height={5} fill={INK} transform={`rotate(${d} 150 118)`} />
      ))}
      <line x1={176} y1={112} x2={266} y2={112} stroke={INK3} strokeWidth={2} />
      <line x1={176} y1={124} x2={240} y2={124} stroke={INK3} strokeWidth={2} />
      {lens.map((l, i) => (
        <line key={i} x1={130} y1={156 + i * 14} x2={130 + l} y2={156 + i * 14} stroke={RULE2} strokeWidth={2} />
      ))}

      {/* the product */}
      <line x1={356} y1={150} x2={296} y2={150} stroke={INK3} strokeWidth={1.25} />
      <path d={head2.left(294, 150)} fill="none" stroke={INK3} strokeWidth={1.25} />
      <rect x={360} y={134} width={80} height={32} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
      <Key x={400} y={154} anchor="middle" fill={SIGNAL} size={10}>
        PRODUCT
      </Key>
      <line x1={444} y1={150} x2={504} y2={150} stroke={INK3} strokeWidth={1.25} />
      <path d={head2.right(506, 150)} fill="none" stroke={INK3} strokeWidth={1.25} />

      {/* for the decider */}
      <rect x={510} y={56} width={180} height={190} fill={PAPER} stroke={COUNTER} strokeWidth={1.5} />
      <Key x={600} y={80} anchor="middle" fill={COUNTER} size={10}>
        FOR THE DECIDER
      </Key>
      <Display x={548} y={130} anchor="middle" fill={COUNTER} size={32}>
        $
      </Display>
      <line x1={576} y1={112} x2={666} y2={112} stroke={INK3} strokeWidth={2} />
      <line x1={576} y1={124} x2={640} y2={124} stroke={INK3} strokeWidth={2} />
      {[28, 48, 70, 88].map((h, i) => (
        <rect key={h} x={540 + i * 32} y={228 - h} width={22} height={h} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.25} />
      ))}
      <line x1={530} y1={228} x2={670} y2={228} stroke={COUNTER} strokeWidth={1} />

      <Key x={200} y={274} anchor="middle" fill={INK} size={11}>
        IT EMPLOYEE
      </Key>
      <Key x={600} y={274} anchor="middle" fill={COUNTER} size={11}>
        CFO
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   Conclusion glyphs — each echoes a plate already seen
   ========================================================================== */

export function GlyphRoute() {
  return (
    <svg {...glyphProps}>
      <line x1="6" y1="20" x2="58" y2="20" stroke="var(--ink-3)" strokeWidth="1.5" />
      {[6, 19, 32, 45].map((x) => (
        <circle key={x} cx={x} cy="20" r="3" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" />
      ))}
      <circle cx="58" cy="20" r="4.5" fill="var(--signal)" />
    </svg>
  );
}

export function GlyphRings() {
  return (
    <svg {...glyphProps}>
      {[18, 13, 8].map((r) => (
        <circle key={r} cx="32" cy="20" r={r} stroke="var(--counter)" strokeWidth="1.25" fill="rgba(34, 87, 91, 0.09)" />
      ))}
      <circle cx="32" cy="20" r="3" fill="var(--signal)" />
    </svg>
  );
}

export function GlyphTable() {
  const seats = [-90, -18, 54, 126, 198].map((d) => {
    const t = (d * Math.PI) / 180;
    return [+(32 + 26 * Math.cos(t)).toFixed(2), +(21 + 15 * Math.sin(t)).toFixed(2)];
  });
  return (
    <svg {...glyphProps}>
      <ellipse cx="32" cy="21" rx="15" ry="8" fill="rgba(178, 58, 21, 0.09)" stroke="var(--signal)" strokeWidth="1.5" />
      {seats.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.5" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" />
      ))}
    </svg>
  );
}
