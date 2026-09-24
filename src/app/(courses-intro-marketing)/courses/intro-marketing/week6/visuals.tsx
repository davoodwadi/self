/* ==========================================================================
   Week 06 — figures
   --------------------------------------------------------------------------
   Hand-drawn SVG plates, one grammar per idea: a mixed crowd sorted into
   groups, five criteria glyphs, a nested map zoom, a profile card, twins with
   different inner lives, a row of behaviour icons, a benefit mapping, two
   towers of variables, a three-way overlap, a meter-and-select row, three
   factor panels, an open enclosure, a jigsaw fit, four targeting panels, a
   protein-powder fork, a product and a mind, a perceptual map, a sieve, a
   value-proposition grid, a colonnade, a slow curve that holds, and two
   phones seen by one consumer.

   Conventions carried over from earlier weeks:
     · viewBox width 800 (400 or 360 for column plates), flat fills, hairline
       rules, no shadows or gradients
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
  hash2,
  head2,
  headAlong1,
  INK,
  INK3,
  Key,
  Note,
  PAPER,
  PAPER2,
  r2,
  RULE,
  RULE2,
  Schematic,
  SIGNAL,
  SIGNAL_TINT,
} from "../_visuals/kit";
import {
  Coins1,
  HEAD_PATH,
  Head1,
  Mark1,
  Pack1,
  Person3,
  Phone1,
} from "../_visuals/objects";

/* -- shared glyphs --------------------------------------------------------- */

/** Tone for each buyer kind. */
const KIND_TONE = [COUNTER, INK, SIGNAL, INK3];

/** A tub of protein powder, centred on x, bottom at y. */
function Tub({ x, y, s = 1, tone = INK, fill = PAPER }: { x: number; y: number; s?: number; tone?: string; fill?: string }) {
  return (
    <g>
      <path
        d={`M${r2(x - 18 * s)} ${y}L${r2(x - 20 * s)} ${r2(y - 40 * s)}H${r2(x + 20 * s)}L${r2(x + 18 * s)} ${y}Z`}
        fill={fill}
        stroke={tone}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <rect x={r2(x - 22 * s)} y={r2(y - 48 * s)} width={r2(44 * s)} height={r2(8 * s)} fill={tone} />
      <rect x={r2(x - 19.5 * s)} y={r2(y - 30 * s)} width={r2(39 * s)} height={r2(13 * s)} fill={fill === PAPER ? SIGNAL_TINT : PAPER} stroke={tone} strokeWidth={1} />
    </g>
  );
}

/* ==========================================================================
   1 · SORTED CROWD — a market divided into distinct groups of buyers
   ========================================================================== */

export function MarketDivided() {
  // 24 buyers, six of each kind, in a jittered 6 × 4 grid.
  const order = Array.from({ length: 24 }, (_, i) => i).sort((a, b) => hash2(a + 40) - hash2(b + 40));
  const mixed = order.map((slot, i) => ({
    kind: i % 4,
    x: r2(56 + (slot % 6) * 42 + (hash2(slot + 90) - 0.5) * 16),
    y: r2(84 + Math.floor(slot / 6) * 44 + (hash2(slot + 190) - 0.5) * 14),
  }));
  const groupX = [410, 510, 610, 710];
  const inGroup = [
    [-18, -22],
    [18, -22],
    [-18, 0],
    [18, 0],
    [-18, 22],
    [18, 22],
  ];
  return (
    <Frame height={276} label="A market of mixed buyers, drawn as four kinds of mark, is divided into four distinct groups, each holding only one kind. Each group gets its own product or marketing program.">
      <Key x={30} y={32} fill={INK} size={10.5}>
        A MARKET
      </Key>
      <rect x={30} y={50} width={264} height={200} fill="none" stroke={INK3} strokeWidth={1.25} />
      {mixed.map((m, i) => (
        <Mark1 key={i} kind={m.kind} x={m.x} y={m.y} s={6} fill={KIND_TONE[m.kind]} />
      ))}

      <line x1={306} y1={150} x2={352} y2={150} stroke={INK} strokeWidth={1.5} />
      <path d={head2.right(354, 150)} fill="none" stroke={INK} strokeWidth={1.5} />

      <Key x={360} y={32} fill={SIGNAL} size={10.5}>
        DISTINCT GROUPS OF BUYERS
      </Key>
      {groupX.map((gx, g) => (
        <g key={gx}>
          <rect x={gx - 42} y={50} width={84} height={112} rx={4} fill={PAPER} stroke={KIND_TONE[g]} strokeWidth={1.5} />
          {inGroup.map(([dx, dy], j) => (
            <Mark1 key={j} kind={g} x={gx + dx} y={106 + dy} s={6} fill={KIND_TONE[g]} />
          ))}
          <line x1={gx} y1={164} x2={gx} y2={184} stroke={KIND_TONE[g]} strokeWidth={1.25} />
          <Pack1 x={gx} y={222} w={46} h={36} tone={KIND_TONE[g]} kind={g} />
        </g>
      ))}
      <path d="M368 232 V240 H752 V232" fill="none" stroke={INK} strokeWidth={1.25} />
      <Key x={560} y={264} anchor="middle" fill={INK} size={10}>
        SEPARATE PRODUCTS OR MARKETING PROGRAMS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   2 · FIVE CRITERIA GLYPHS — measurable, accessible, substantial,
       differentiable, actionable
   ========================================================================== */

const criteriaProps = {
  width: 72,
  height: 48,
  viewBox: "0 0 72 48",
  fill: "none",
  "aria-hidden": true,
} as const;

export function GlyphMeasurable() {
  return (
    <svg {...criteriaProps}>
      <rect x="4" y="22" width="64" height="16" stroke="var(--ink)" strokeWidth="1.5" />
      {[10, 18, 26, 34, 42, 50, 58].map((x, i) => (
        <line key={x} x1={x} y1="22" x2={x} y2={i % 2 ? 28 : 32} stroke="var(--ink)" strokeWidth="1.25" />
      ))}
      <path d="M10 12 H58" stroke="var(--signal)" strokeWidth="1.5" />
      <path d="M10 8 V16 M58 8 V16" stroke="var(--signal)" strokeWidth="1.5" />
    </svg>
  );
}

export function GlyphAccessible() {
  return (
    <svg {...criteriaProps}>
      <path d="M44 42 V8 H66 V42" stroke="var(--ink)" strokeWidth="1.5" />
      <path d="M44 8 L56 12 V46 L44 42" fill="var(--paper-2)" stroke="var(--ink)" strokeWidth="1.25" />
      <path d="M4 26 H36" stroke="var(--signal)" strokeWidth="1.5" />
      <path d="M30 20 L37 26 L30 32" stroke="var(--signal)" strokeWidth="1.5" />
    </svg>
  );
}

export function GlyphSubstantial() {
  return (
    <svg {...criteriaProps}>
      {[
        [10, 30],
        [26, 30],
        [42, 30],
        [18, 16],
        [34, 16],
        [26, 2],
      ].map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="14" height="12" stroke="var(--ink)" strokeWidth="1.25" />
      ))}
      <rect x="56" y="34" width="10" height="8" stroke="var(--ink-3)" strokeWidth="1.25" />
      <path d="M2 46 H70" stroke="var(--signal)" strokeWidth="1.5" />
    </svg>
  );
}

export function GlyphDifferentiable() {
  return (
    <svg {...criteriaProps}>
      <circle cx="18" cy="24" r="12" fill="var(--counter)" />
      <line x1="36" y1="4" x2="36" y2="44" stroke="var(--signal)" strokeWidth="1.5" strokeDasharray="3 3" />
      <rect x="44" y="12" width="24" height="24" fill="var(--ink)" />
    </svg>
  );
}

export function GlyphActionable() {
  return (
    <svg {...criteriaProps}>
      <circle cx="54" cy="24" r="14" stroke="var(--ink)" strokeWidth="1.5" />
      <circle cx="54" cy="24" r="6" stroke="var(--ink)" strokeWidth="1.25" />
      <circle cx="54" cy="24" r="2" fill="var(--signal)" />
      <path d="M4 24 H50" stroke="var(--signal)" strokeWidth="1.75" />
      <path d="M43 18 L51 24 L43 30" stroke="var(--signal)" strokeWidth="1.75" />
    </svg>
  );
}

/* ==========================================================================
   3 · NESTED ZOOM — geographic units, nations down to neighborhoods (400)
   ========================================================================== */

export function GeographicZoom() {
  const levels = ["NATIONS", "STATES", "REGIONS", "COUNTIES", "CITIES", "NEIGHBORHOODS"];
  return (
    <Frame width={400} height={300} label="Six nested outlines, each inside the last: nations, states, regions, counties, cities, and neighborhoods. The smallest holds a map pin.">
      {levels.map((name, i) => {
        const w = 360 - i * 50;
        const top = 20 + i * 42;
        const last = i === levels.length - 1;
        return (
          <g key={name}>
            <rect
              x={380 - w}
              y={top}
              width={w}
              height={290 - top}
              fill={last ? SIGNAL_TINT : i % 2 ? PAPER2 : PAPER}
              stroke={last ? SIGNAL : INK3}
              strokeWidth={last ? 1.75 : 1.25}
            />
            <Key x={380 - w + 10} y={top + 18} fill={last ? SIGNAL : INK} size={9.5}>
              {name}
            </Key>
          </g>
        );
      })}
      <path d="M325 286 C316 275 314 272 314 268 A11 11 0 0 1 336 268 C336 272 334 275 325 286 Z" fill={SIGNAL} />
      <circle cx={325} cy={268} r={4} fill={PAPER} />
    </Frame>
  );
}

/* ==========================================================================
   4 · PROFILE CARD — demographic variables (400)
   ========================================================================== */

export function DemographicCard() {
  const fields = ["AGE", "LIFE-CYCLE STAGE", "GENDER", "INCOME", "OCCUPATION", "EDUCATION", "RELIGION", "ETHNICITY", "GENERATION"];
  return (
    <Frame width={400} height={300} label="A profile card for one buyer with nine demographic fields: age, life-cycle stage, gender, income, occupation, education, religion, ethnicity, and generation. Beside the portrait, a ruler: easier to measure.">
      <rect x={16} y={16} width={368} height={272} rx={6} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <rect x={36} y={40} width={92} height={108} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.25} />
      <Person3 x={82} y={148} k={2.2} stroke={COUNTER} />

      {/* ruler: easier to measure */}
      <rect x={36} y={184} width={92} height={18} fill={PAPER} stroke={SIGNAL} strokeWidth={1.5} />
      {Array.from({ length: 9 }, (_, i) => (
        <line key={i} x1={44 + i * 9.5} y1={184} x2={44 + i * 9.5} y2={i % 2 ? 190 : 194} stroke={SIGNAL} strokeWidth={1.25} />
      ))}
      <Key x={82} y={230} anchor="middle" fill={SIGNAL} size={9}>
        EASIER TO
      </Key>
      <Key x={82} y={244} anchor="middle" fill={SIGNAL} size={9}>
        MEASURE
      </Key>

      {fields.map((f, i) => {
        const y = 52 + i * 26;
        return (
          <g key={f}>
            <Key x={150} y={y} fill={INK} size={9}>
              {f}
            </Key>
            <line x1={150} y1={y + 8} x2={366} y2={y + 8} stroke={RULE} strokeWidth={1} />
            <path d={`M${352} ${y - 3} L${356} ${y + 1} L${363} ${y - 7}`} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
          </g>
        );
      })}
    </Frame>
  );
}

/* ==========================================================================
   5 · TWINS — same demographic group, very different psychographics
   ========================================================================== */

/** An outdoor life: sun, mountains, and a tent. Box origin top-left. */
function OutdoorScene({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cx={170} cy={30} r={12} fill="none" stroke={COUNTER} strokeWidth={1.5} />
      <path d="M10 104 L70 30 L102 70 L128 44 L200 104 Z" fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.5} strokeLinejoin="round" />
      <path d="M58 44 L70 30 L82 45" fill="none" stroke={COUNTER} strokeWidth={1.5} />
      <path d="M118 104 L146 66 L174 104 Z" fill={PAPER} stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
      <path d="M146 66 V104 M138 104 L146 84 L154 104" fill="none" stroke={INK} strokeWidth={1.25} />
      <line x1={0} y1={104} x2={210} y2={104} stroke={INK} strokeWidth={1.25} />
    </g>
  );
}

/** A quiet life at home: armchair, reading lamp, a book. */
function HomeScene({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M40 60 H104 A8 8 0 0 1 112 68 V96 H32 V68 A8 8 0 0 1 40 60 Z" fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
      <path d="M48 60 V34 A10 10 0 0 1 58 24 H86 A10 10 0 0 1 96 34 V60" fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <path d="M36 96 V104 M108 96 V104" stroke={SIGNAL} strokeWidth={1.5} />
      <path d="M150 104 V32 M136 104 H164" stroke={INK} strokeWidth={1.5} />
      <path d="M134 32 L144 12 H158 L168 32 Z" fill={PAPER} stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
      <path d="M186 90 L200 86 V100 L186 104 L172 100 V86 Z M186 90 V104" fill={PAPER} stroke={INK} strokeWidth={1.25} strokeLinejoin="round" />
      <line x1={0} y1={104} x2={210} y2={104} stroke={INK} strokeWidth={1.25} />
    </g>
  );
}

export function PsychographicTwins() {
  return (
    <Frame height={318} label="Two identical people stand on one bracket: the same demographic group. Above one, an outdoor life of mountains and a tent; above the other, a quiet life of an armchair, a lamp, and a book. Very different psychographic characteristics.">
      <Key x={400} y={22} anchor="middle" fill={SIGNAL} size={10.5}>
        VERY DIFFERENT PSYCHOGRAPHIC CHARACTERISTICS
      </Key>

      {[
        { x: 140, tone: COUNTER, scene: <OutdoorScene x={155} y={48} /> },
        { x: 440, tone: SIGNAL, scene: <HomeScene x={455} y={48} /> },
      ].map((p) => (
        <g key={p.x}>
          <rect x={p.x} y={38} width={240} height={128} rx={14} fill={PAPER} stroke={p.tone} strokeWidth={1.5} />
          {p.scene}
          <circle cx={p.x + 120} cy={178} r={5} fill={PAPER} stroke={p.tone} strokeWidth={1.5} />
          <circle cx={p.x + 120} cy={192} r={3} fill={PAPER} stroke={p.tone} strokeWidth={1.5} />
        </g>
      ))}
      <Display x={400} y={116} anchor="middle" fill={INK3} size={40}>
        ≠
      </Display>

      <Person3 x={260} y={274} k={2} stroke={INK} />
      <Person3 x={560} y={274} k={2} stroke={INK} />
      <path d="M180 282 V290 H640 V282" fill="none" stroke={INK} strokeWidth={1.25} />
      <Key x={410} y={310} anchor="middle" fill={INK} size={10}>
        SAME DEMOGRAPHIC GROUP
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   6 · LIFESTYLE TO PRODUCT — offerings that align (400)
   ========================================================================== */

export function LifestyleProducts() {
  return (
    <Frame width={400} height={196} label="Two rows. An outdoor lifestyle lines up with a tent; a quiet lifestyle at home lines up with a reading lamp.">
      <Key x={70} y={24} anchor="middle" fill={INK3} size={9}>
        LIFESTYLES
      </Key>
      <Key x={320} y={24} anchor="middle" fill={INK3} size={9}>
        PRODUCTS
      </Key>

      {/* outdoor → tent */}
      <circle cx={70} cy={76} r={36} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.5} />
      <path d="M44 94 L64 66 L76 80 L84 70 L98 94 Z" fill="none" stroke={COUNTER} strokeWidth={1.5} strokeLinejoin="round" />
      <path d="M118 76 H262" stroke={COUNTER} strokeWidth={1.5} />
      <path d={head2.right(264, 76)} fill="none" stroke={COUNTER} strokeWidth={1.5} />
      <rect x={278} y={46} width={84} height={60} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <path d="M296 98 L320 60 L344 98 Z M320 60 V98" fill="none" stroke={COUNTER} strokeWidth={1.5} strokeLinejoin="round" />

      {/* home → lamp */}
      <circle cx={70} cy={150} r={36} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
      <path d="M52 158 H88 V148 A5 5 0 0 0 83 143 H57 A5 5 0 0 0 52 148 Z M58 143 V132 H82 V143" fill="none" stroke={SIGNAL} strokeWidth={1.5} strokeLinejoin="round" />
      <path d="M118 150 H262" stroke={SIGNAL} strokeWidth={1.5} />
      <path d={head2.right(264, 150)} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <rect x={278} y={120} width={84} height={60} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <path d="M320 144 V172 M308 172 H332 M306 144 L312 130 H328 L334 144 Z" fill="none" stroke={SIGNAL} strokeWidth={1.5} strokeLinejoin="round" />

      <Note x={190} y={68} anchor="middle" size={11.5} italic>
        align
      </Note>
      <Note x={190} y={142} anchor="middle" size={11.5} italic>
        align
      </Note>
    </Frame>
  );
}

/* ==========================================================================
   7 · BEHAVIOUR ICONS — the five behavioral variables
   ========================================================================== */

export function BehavioralVariables() {
  const cols = [80, 240, 400, 560, 720];
  return (
    <Frame height={196} label="Five behavioral variables as icons: occasions, a calendar with one day circled; benefits sought, a magnifier over a star; user status, three people from dashed to filled; usage rate, three bars from short to tall; loyalty status, a heart inside a returning arrow.">
      {cols.slice(1).map((x) => (
        <line key={x} x1={x - 80} y1={24} x2={x - 80} y2={176} stroke={RULE} strokeWidth={1} />
      ))}

      {/* occasions */}
      <rect x={46} y={44} width={68} height={70} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <rect x={46.75} y={44.75} width={66.5} height={14} fill={INK} />
      <path d="M60 38 V50 M100 38 V50" stroke={INK} strokeWidth={2} strokeLinecap="round" />
      {Array.from({ length: 12 }, (_, i) => {
        const x = 58 + (i % 4) * 14.5;
        const y = 72 + Math.floor(i / 4) * 14;
        return <circle key={i} cx={x} cy={y} r={2} fill={INK3} />;
      })}
      <circle cx={87} cy={86} r={7} fill="none" stroke={SIGNAL} strokeWidth={1.75} />

      {/* benefits sought */}
      <path d="M232 60 L237 71 L249 72 L240 80 L243 92 L232 86 L221 92 L224 80 L215 72 L227 71 Z" fill={SIGNAL} />
      <circle cx={232} cy={78} r={30} fill="none" stroke={INK} strokeWidth={1.75} />
      <line x1={254} y1={100} x2={274} y2={120} stroke={INK} strokeWidth={4} strokeLinecap="round" />

      {/* user status */}
      <g strokeDasharray="3 3">
        <Person3 x={372} y={112} k={1.25} stroke={INK3} />
      </g>
      <Person3 x={400} y={112} k={1.25} stroke={INK} />
      <Person3 x={428} y={112} k={1.25} stroke={SIGNAL} fill={SIGNAL} />

      {/* usage rate */}
      {[
        [532, 18],
        [556, 40],
        [580, 66],
      ].map(([x, h]) => (
        <rect key={x} x={x - 8} y={114 - h} width={16} height={h} fill={x === 580 ? SIGNAL : PAPER} stroke={x === 580 ? SIGNAL : INK} strokeWidth={1.5} />
      ))}
      <line x1={512} y1={114} x2={600} y2={114} stroke={INK} strokeWidth={1.25} />

      {/* loyalty status */}
      <path d="M720 96 C700 84 694 72 700 64 C706 56 716 58 720 66 C724 58 734 56 740 64 C746 72 740 84 720 96 Z" fill={SIGNAL} />
      <path d="M753.83 63.69 A36 36 0 1 1 738 44.82" fill="none" stroke={INK} strokeWidth={1.75} />
      <path d={headAlong1(738, 44.82, 0.866, 0.5, 9)} fill="none" stroke={INK} strokeWidth={1.75} />

      {[
        ["OCCASIONS", ""],
        ["BENEFITS", "SOUGHT"],
        ["USER", "STATUS"],
        ["USAGE", "RATE"],
        ["LOYALTY", "STATUS"],
      ].map(([a, b], i) => (
        <g key={a}>
          <Key x={cols[i]} y={b ? 156 : 164} anchor="middle" fill={INK} size={10}>
            {a}
          </Key>
          {b ? (
            <Key x={cols[i]} y={172} anchor="middle" fill={INK} size={10}>
              {b}
            </Key>
          ) : null}
        </g>
      ))}
    </Frame>
  );
}

/* ==========================================================================
   8 · BENEFIT MAPPING — benefits, the people who seek each, the brands
   ========================================================================== */

export function BenefitMapping() {
  const rows = [
    { y: 92, kind: 0, tone: COUNTER },
    { y: 162, kind: 2, tone: SIGNAL },
    { y: 232, kind: 1, tone: INK },
  ];
  return (
    <Frame height={270} label="A three-column map. Each major benefit, drawn as a shape, links to the kinds of people who look for it, wearing that shape, and to the major brands that deliver it, carrying the same shape.">
      {[
        { x: 120, n: "01", a: "MAJOR BENEFITS" },
        { x: 400, n: "02", a: "PEOPLE WHO LOOK FOR EACH" },
        { x: 680, n: "03", a: "BRANDS THAT DELIVER EACH" },
      ].map((h) => (
        <g key={h.n}>
          <Display x={h.x} y={30} anchor="middle" fill={INK3} size={18}>
            {h.n}
          </Display>
          <Key x={h.x} y={52} anchor="middle" fill={INK} size={10}>
            {h.a}
          </Key>
        </g>
      ))}
      <line x1={30} y1={64} x2={770} y2={64} stroke={RULE2} strokeWidth={1} />

      {rows.map((r) => (
        <g key={r.y}>
          <circle cx={120} cy={r.y} r={24} fill={PAPER} stroke={r.tone} strokeWidth={1.5} />
          <Mark1 kind={r.kind} x={120} y={r.y} s={11} fill={r.tone} />

          <line x1={152} y1={r.y} x2={316} y2={r.y} stroke={r.tone} strokeWidth={1.25} />
          <path d={head2.right(318, r.y)} fill="none" stroke={r.tone} strokeWidth={1.25} />
          {[350, 400, 450].map((px) => (
            <g key={px}>
              <Person3 x={px} y={r.y + 20} k={1.1} stroke={r.tone} />
              <Mark1 kind={r.kind} x={px} y={r.y + 8} s={3.5} fill={r.tone} />
            </g>
          ))}

          <line x1={484} y1={r.y} x2={612} y2={r.y} stroke={r.tone} strokeWidth={1.25} />
          <path d={head2.right(614, r.y)} fill="none" stroke={r.tone} strokeWidth={1.25} />
          <Pack1 x={652} y={r.y + 20} w={42} h={44} tone={r.tone} kind={r.kind} />
          <Pack1 x={712} y={r.y + 20} w={42} h={44} tone={r.tone} kind={r.kind} />
        </g>
      ))}
    </Frame>
  );
}

/* ==========================================================================
   9 · TWO TOWERS — business marketers add variables on top
   ========================================================================== */

export function BusinessTowers() {
  const shared = ["LOYALTY STATUS", "USAGE RATE", "USER STATUS", "BENEFITS SOUGHT", "DEMOGRAPHIC", "GEOGRAPHIC"].reverse();
  const extra = ["CUSTOMER OPERATING CHARACTERISTICS", "PURCHASING APPROACHES", "SITUATIONAL FACTORS", "PERSONAL CHARACTERISTICS"];
  const base = 276;
  const step = 23;
  const block = (x: number, i: number, label: string, lit: boolean) => {
    const y = base - (i + 1) * step;
    return (
      <g key={`${x}-${label}`}>
        <rect x={x} y={y} width={280} height={20} fill={lit ? SIGNAL_TINT : PAPER} stroke={lit ? SIGNAL : INK} strokeWidth={1.25} />
        <Key x={x + 140} y={y + 14} anchor="middle" fill={lit ? SIGNAL : INK} size={9}>
          {label}
        </Key>
      </g>
    );
  };
  const sharedTop = base - shared.length * step;
  return (
    <Frame height={316} label="Two towers of segmentation variables. The consumer tower and the business tower share the same six blocks: geographic, demographic, benefits sought, user status, usage rate, loyalty status. The business tower stacks four more on top: customer operating characteristics, purchasing approaches, situational factors, personal characteristics.">
      {shared.map((s, i) => block(20, i, s, false))}
      {shared.map((s, i) => block(400, i, s, false))}
      {extra.map((s, i) => block(400, i + shared.length, s, true))}

      <line x1={10} y1={base + 1} x2={700} y2={base + 1} stroke={INK} strokeWidth={1.75} />
      <Key x={160} y={300} anchor="middle" fill={INK} size={10}>
        CONSUMER MARKETERS
      </Key>
      <Key x={540} y={300} anchor="middle" fill={INK} size={10}>
        BUSINESS MARKETERS
      </Key>

      {[sharedTop - 2, base - 1].map((y) => (
        <line key={y} x1={304} y1={y} x2={396} y2={y} stroke={INK3} strokeWidth={1} strokeDasharray="3 4" />
      ))}
      <Note x={350} y={198} anchor="middle" size={12} italic>
        many of the
      </Note>
      <Note x={350} y={214} anchor="middle" size={12} italic>
        same variables
      </Note>

      <path d={`M688 ${base - 10 * step} H696 V${sharedTop - 3} H688`} fill="none" stroke={SIGNAL} strokeWidth={1.25} />
      <Key x={706} y={base - 8 * step + 4} fill={SIGNAL} size={9}>
        ADDITIONAL
      </Key>
      <Key x={706} y={base - 8 * step + 18} fill={SIGNAL} size={9}>
        VARIABLES
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   10 · THREE-WAY OVERLAP — combining variables for athletic shoes
   ========================================================================== */

export function ShoeOverlap() {
  const circles = [
    { cx: 380, cy: 124, tone: INK, name: "DEMOGRAPHIC", lx: 290, ly: 26, anchor: "end" as const },
    { cx: 500, cy: 124, tone: COUNTER, name: "PSYCHOGRAPHIC", lx: 590, ly: 26, anchor: "start" as const },
    { cx: 440, cy: 222, tone: INK3, name: "BEHAVIORAL", lx: 440, ly: 334, anchor: "middle" as const },
  ];
  return (
    <Frame height={346} label="An athletic shoe beside three overlapping circles: demographic, psychographic, and behavioral. Where all three overlap sits one specific consumer group.">
      {/* sneaker */}
      <path
        d="M44 234 V204 C44 190 52 182 64 182 L94 190 C108 192 118 184 126 172 L140 152 C146 144 156 146 160 154 L178 184 C198 196 232 200 250 208 C262 214 264 224 262 234 Z"
        fill={PAPER}
        stroke={INK}
        strokeWidth={1.75}
        strokeLinejoin="round"
      />
      <rect x={38} y={232} width={230} height={12} rx={5} fill={SIGNAL} />
      <path d="M150 166 L164 158 M158 178 L172 170 M168 190 L182 182" stroke={INK} strokeWidth={1.5} strokeLinecap="round" />
      <path d="M88 214 C130 214 170 206 206 214" fill="none" stroke={INK3} strokeWidth={1.25} />
      <Key x={152} y={278} anchor="middle" fill={INK} size={10}>
        ATHLETIC SHOES
      </Key>

      {circles.map((c) => (
        <g key={c.name}>
          <circle cx={c.cx} cy={c.cy} r={92} fill="none" stroke={c.tone} strokeWidth={1.75} />
          <Key x={c.lx} y={c.ly} anchor={c.anchor} fill={c.tone} size={10.5}>
            {c.name}
          </Key>
        </g>
      ))}
      <line x1={296} y1={30} x2={330} y2={58} stroke={INK} strokeWidth={1} />
      <line x1={584} y1={30} x2={550} y2={58} stroke={COUNTER} strokeWidth={1} />

      <circle cx={440} cy={162} r={18} fill={SIGNAL} />
      {[
        [433, 157],
        [447, 157],
        [440, 169],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={3} fill={PAPER} />
      ))}
      <line x1={458} y1={168} x2={640} y2={220} stroke={SIGNAL} strokeWidth={1.25} />
      <Key x={646} y={218} fill={SIGNAL} size={10}>
        A SPECIFIC
      </Key>
      <Key x={646} y={234} fill={SIGNAL} size={10}>
        CONSUMER GROUP
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   11 · METER AND SELECT — evaluate each segment, select one or more
   ========================================================================== */

export function EvaluateSelect() {
  const score = [0.34, 0.82, 0.5, 0.9, 0.28];
  const chosen = [1, 3];
  return (
    <Frame height={256} label="Five market segments, each with an attractiveness meter. The two most attractive are selected, and a bracket joins them: one or more segments to enter.">
      <Schematic x={792} y={20} />
      <Key x={20} y={98} fill={INK3} size={9.5}>
        SEGMENTS
      </Key>
      <Key x={20} y={170} fill={INK3} size={9.5}>
        ATTRACTIVENESS
      </Key>
      <Key x={20} y={206} fill={INK3} size={9.5}>
        SELECT
      </Key>
      {score.map((s, i) => {
        const x = 150 + i * 130;
        const on = chosen.includes(i);
        return (
          <g key={i}>
            <rect x={x} y={38} width={110} height={96} fill={on ? SIGNAL_TINT : PAPER} stroke={on ? SIGNAL : INK3} strokeWidth={on ? 2 : 1.25} />
            {[25, 55, 85].map((dx) => (
              <Person3 key={dx} x={x + dx} y={120} k={1} stroke={on ? SIGNAL : INK3} />
            ))}
            <rect x={x + 0.75} y={160.75} width={108.5} height={10.5} fill="none" stroke={INK3} strokeWidth={1.5} />
            <rect x={x} y={160} width={r2(110 * s)} height={12} fill={on ? SIGNAL : INK3} />
            {on ? (
              <g>
                <circle cx={x + 55} cy={202} r={11} fill={SIGNAL} />
                <path d={`M${x + 49} ${202} L${x + 53} ${206} L${x + 61} ${197}`} fill="none" stroke={PAPER} strokeWidth={2} />
              </g>
            ) : (
              <line x1={x + 49} y1={202} x2={x + 61} y2={202} stroke={RULE2} strokeWidth={2} />
            )}
          </g>
        );
      })}
      <path d="M335 216 V226 H595 V216" fill="none" stroke={SIGNAL} strokeWidth={1.25} />
      <Key x={465} y={248} anchor="middle" fill={SIGNAL} size={10}>
        ONE OR MORE SEGMENTS TO ENTER
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   12 · THREE FACTOR PANELS — size and growth, structure, objectives
   ========================================================================== */

export function ThreeFactors() {
  return (
    <Frame height={216} label="Three factors in three panels: segment size and growth, rising bars; segment structural attractiveness, a segment pressed on from every side; company objectives and resources, a target and a stack of coins.">
      <line x1={270} y1={20} x2={270} y2={200} stroke={RULE} strokeWidth={1} />
      <line x1={530} y1={20} x2={530} y2={200} stroke={RULE} strokeWidth={1} />
      {[20, 280, 540].map((x, i) => (
        <Display key={x} x={x + 6} y={40} fill={INK3} size={20}>
          {`0${i + 1}`}
        </Display>
      ))}

      {/* size and growth */}
      {[20, 34, 50, 70].map((h, j) => (
        <rect key={h} x={100 + j * 24} y={140 - h} width={16} height={h} fill={j === 3 ? SIGNAL_TINT : PAPER} stroke={j === 3 ? SIGNAL : INK} strokeWidth={1.5} />
      ))}
      <line x1={90} y1={140} x2={200} y2={140} stroke={INK} strokeWidth={1.25} />
      <path d="M86 100 L180 54" fill="none" stroke={SIGNAL} strokeWidth={1.75} />
      <path d={headAlong1(182, 53, 94, -46, 9)} fill="none" stroke={SIGNAL} strokeWidth={1.75} />

      {/* structural attractiveness */}
      <rect x={370} y={66} width={60} height={60} fill={PAPER2} stroke={INK} strokeWidth={1.5} />
      <circle cx={400} cy={96} r={6} fill={SIGNAL} />
      {[
        [334, 96, 364, 96],
        [466, 96, 436, 96],
        [400, 30, 400, 60],
        [400, 160, 400, 132],
      ].map(([x1, y1, x2, y2]) => (
        <g key={`${x1}-${y1}`}>
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK3} strokeWidth={1.75} />
          <path d={headAlong1(x2, y2, x2 - x1, y2 - y1)} fill="none" stroke={INK3} strokeWidth={1.75} />
        </g>
      ))}

      {/* objectives and resources */}
      <circle cx={630} cy={98} r={32} fill="none" stroke={COUNTER} strokeWidth={1.5} />
      <circle cx={630} cy={98} r={19} fill="none" stroke={COUNTER} strokeWidth={1.5} />
      <circle cx={630} cy={98} r={7} fill={COUNTER} />
      <Coins1 x={712} y={136} n={6} rx={17} tone={INK} />

      {[
        [150, "SEGMENT SIZE", "AND GROWTH", INK],
        [400, "SEGMENT STRUCTURAL", "ATTRACTIVENESS", INK],
        [660, "COMPANY OBJECTIVES", "AND RESOURCES", COUNTER],
      ].map(([x, a, b, tone]) => (
        <g key={a as string}>
          <Key x={x as number} y={182} anchor="middle" fill={tone as string} size={10}>
            {a}
          </Key>
          <Key x={x as number} y={198} anchor="middle" fill={tone as string} size={10}>
            {b}
          </Key>
        </g>
      ))}
    </Frame>
  );
}

/* ==========================================================================
   13 · OPEN ENCLOSURE — competitors inside, entrants at the gap (400)
   ========================================================================== */

export function CrowdedSegment() {
  const rivals: [number, number, number][] = [
    [176, 72, 20],
    [232, 64, -30],
    [300, 76, 160],
    [196, 118, 110],
    [262, 110, 200],
    [330, 122, -120],
    [350, 64, 60],
  ];
  return (
    <Frame width={400} height={188} label="A segment drawn as an enclosure crowded with strong, aggressive competitors pointing every way. Its wall has an open gap, and new entrants stream in through it.">
      <Key x={380} y={24} anchor="end" fill={SIGNAL} size={9.5}>
        LESS ATTRACTIVE
      </Key>
      <path d="M130 70 V40 H380 V150 H130 V120" fill="none" stroke={INK} strokeWidth={2} />
      {rivals.map(([x, y, deg]) => (
        <path key={`${x}-${y}`} d="M-10 -9 L12 0 L-10 9 Z" transform={`translate(${x} ${y}) rotate(${deg})`} fill={INK} />
      ))}
      {[62, 94, 126].map((y, i) => (
        <g key={y}>
          <Person3 x={30 + i * 10} y={y + 14} k={0.7} stroke={SIGNAL} />
          <path d={`M${48 + i * 10} ${y} C90 ${y} 100 95 146 95`} fill="none" stroke={SIGNAL} strokeWidth={1.25} strokeDasharray="4 3" />
        </g>
      ))}
      <path d={head2.right(152, 95)} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <Key x={20} y={176} fill={SIGNAL} size={9}>
        NEW ENTRANTS
      </Key>
      <Key x={255} y={176} anchor="middle" fill={INK} size={9}>
        STRONG, AGGRESSIVE COMPETITORS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   14 · JIGSAW — skills and resources fit what the segment needs (400)
   ========================================================================== */

export function SkillsFit() {
  return (
    <Frame width={400} height={188} label="Two jigsaw pieces. The company's piece, skills and resources, has a tab that fits the socket in the segment's piece: needed to succeed in that segment.">
      <path d="M30 50 H166 V74 C186 74 194 82 194 94 C194 106 186 114 166 114 V138 H30 Z" fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.75} strokeLinejoin="round" />
      <path d="M234 50 H370 V138 H234 V114 C254 114 262 106 262 94 C262 82 254 74 234 74 Z" fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.75} strokeLinejoin="round" />
      <line x1={180} y1={30} x2={222} y2={30} stroke={INK} strokeWidth={1.5} />
      <path d={head2.right(224, 30)} fill="none" stroke={INK} strokeWidth={1.5} />
      <Person3 x={98} y={108} k={1.1} stroke={COUNTER} />
      <Person3 x={318} y={108} k={1.1} stroke={SIGNAL} />
      <Person3 x={298} y={112} k={0.8} stroke={SIGNAL} />
      <Person3 x={338} y={112} k={0.8} stroke={SIGNAL} />
      <Key x={98} y={164} anchor="middle" fill={COUNTER} size={9}>
        SKILLS AND
      </Key>
      <Key x={98} y={178} anchor="middle" fill={COUNTER} size={9}>
        RESOURCES
      </Key>
      <Key x={302} y={164} anchor="middle" fill={SIGNAL} size={9}>
        TO SUCCEED IN
      </Key>
      <Key x={302} y={178} anchor="middle" fill={SIGNAL} size={9}>
        THAT SEGMENT
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   15 · FOUR TARGETING PANELS — the same market, targeted four ways (360)
   ========================================================================== */

const OFFSETS: [number, number][] = [
  [-20, -12],
  [0, -18],
  [20, -10],
  [-16, 12],
  [4, 8],
  [22, 14],
];
const NICHE: [number, number][] = [
  [-11, -9],
  [11, -10],
  [-10, 10],
  [12, 9],
];
const CLUSTERS = [
  { kind: 0, cx: 96, cy: 78 },
  { kind: 1, cx: 252, cy: 70 },
  { kind: 2, cx: 168, cy: 150 },
];
const NICHE_C = { kind: 3, cx: 296, cy: 180 };

/** Every buyer in the shared market, as {kind, x, y}. */
function marketBuyers() {
  const out: { kind: number; x: number; y: number; niche: boolean }[] = [];
  CLUSTERS.forEach((c) => OFFSETS.forEach(([dx, dy]) => out.push({ kind: c.kind, x: c.cx + dx, y: c.cy + dy, niche: false })));
  NICHE.forEach(([dx, dy]) => out.push({ kind: NICHE_C.kind, x: NICHE_C.cx + dx, y: NICHE_C.cy + dy, niche: true }));
  return out;
}

function MarketField() {
  return <rect x={16} y={16} width={328} height={200} fill="none" stroke={INK3} strokeWidth={1.25} />;
}

export function TargetUndifferentiated() {
  const needs = [
    [124, 92],
    [222, 86],
    [170, 142],
  ];
  return (
    <Frame width={360} height={232} label="The whole market. Three overlapping need circles, one around each group of buyers, and the area they share is lit: what is common in the needs of consumers.">
      <MarketField />
      {needs.map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r={64} fill={SIGNAL_TINT} stroke={INK3} strokeWidth={1} strokeDasharray="4 3" />
      ))}
      {marketBuyers().map((b, i) => (
        <Mark1 key={i} kind={b.kind} x={b.x} y={b.y} s={5.5} fill={INK3} />
      ))}
      <circle cx={172} cy={106} r={13} fill={SIGNAL} />
    </Frame>
  );
}

export function TargetDifferentiated() {
  const packs = [
    { x: 42, y: 46, c: CLUSTERS[0] },
    { x: 318, y: 118, c: CLUSTERS[1] },
    { x: 92, y: 196, c: CLUSTERS[2] },
  ];
  return (
    <Frame width={360} height={232} label="The same market. Each of three segments is ringed in its own colour, and each has its own separate offer beside it.">
      <MarketField />
      {CLUSTERS.map((c) => (
        <circle key={c.kind} cx={c.cx + 1} cy={c.cy - 2} r={34} fill={PAPER} stroke={KIND_TONE[c.kind]} strokeWidth={1.75} />
      ))}
      {marketBuyers().map((b, i) => (
        <Mark1 key={i} kind={b.kind} x={b.x} y={b.y} s={5.5} fill={b.niche ? RULE2 : KIND_TONE[b.kind]} />
      ))}
      {packs.map((p) => (
        <g key={p.x}>
          <line x1={p.x} y1={p.y - 14} x2={p.c.cx + (p.x < p.c.cx ? -24 : 24)} y2={p.c.cy + (p.y < p.c.cy ? -24 : 24)} stroke={KIND_TONE[p.c.kind]} strokeWidth={1} />
          <Pack1 x={p.x} y={p.y} w={30} h={28} tone={KIND_TONE[p.c.kind]} kind={p.c.kind} />
        </g>
      ))}
    </Frame>
  );
}

export function TargetConcentrated() {
  return (
    <Frame width={360} height={232} label="The same market, faded, except one small niche in the corner. It is ringed and filled: a large share of one smaller segment.">
      <MarketField />
      {marketBuyers().map((b, i) =>
        b.niche ? null : <Mark1 key={i} kind={b.kind} x={b.x} y={b.y} s={5.5} fill={RULE2} />,
      )}
      <circle cx={NICHE_C.cx} cy={NICHE_C.cy} r={30} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={2} />
      {NICHE.map(([dx, dy], i) => (
        <Mark1 key={i} kind={3} x={NICHE_C.cx + dx} y={NICHE_C.cy + dy} s={6} fill={SIGNAL} />
      ))}
      <Pack1 x={226} y={200} w={30} h={28} tone={SIGNAL} fill={PAPER} kind={3} />
    </Frame>
  );
}

export function TargetMicro() {
  return (
    <Frame width={360} height={232} label="The same market, but every single buyer has a small ring of their own, and a map pin marks a local customer segment.">
      <MarketField />
      {marketBuyers().map((b, i) => (
        <g key={i}>
          <circle cx={b.x} cy={b.y} r={8.5} fill={PAPER} stroke={SIGNAL} strokeWidth={1.25} />
          <Mark1 kind={b.kind} x={b.x} y={b.y} s={4.2} fill={KIND_TONE[b.kind]} />
        </g>
      ))}
      <path d="M312 60 C302 48 298 42 298 36 A14 14 0 0 1 326 36 C326 42 322 48 312 60 Z" fill={SIGNAL} />
      <circle cx={312} cy={36} r={4.5} fill={PAPER} />
    </Frame>
  );
}

/* ==========================================================================
   16 · PROTEIN POWDER FORK — differentiated or concentrated?
   ========================================================================== */

export function ProteinFork() {
  return (
    <Frame height={276} label="A tub of premium, organic, plant-based protein powder with two routes. Up: differentiated marketing, three segments each with its own tub. Down: concentrated marketing, one niche with one tub.">
      <Key x={110} y={56} anchor="middle" fill={INK} size={9.5}>
        PREMIUM · ORGANIC
      </Key>
      <Key x={110} y={72} anchor="middle" fill={INK} size={9.5}>
        PLANT-BASED
      </Key>
      <Tub x={110} y={190} s={2} tone={INK} />

      <path d="M164 140 C220 140 220 78 280 78" fill="none" stroke={COUNTER} strokeWidth={1.5} />
      <path d={head2.right(282, 78)} fill="none" stroke={COUNTER} strokeWidth={1.5} />
      <path d="M164 150 C220 150 220 212 280 212" fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <path d={head2.right(282, 212)} fill="none" stroke={SIGNAL} strokeWidth={1.5} />

      <Key x={296} y={28} fill={COUNTER} size={10.5}>
        DIFFERENTIATED MARKETING?
      </Key>
      {[0, 1, 2].map((g) => {
        const x = 340 + g * 150;
        return (
          <g key={g}>
            <rect x={x - 42} y={44} width={124} height={68} rx={4} fill={PAPER} stroke={KIND_TONE[g]} strokeWidth={1.25} />
            {[
              [-22, 64],
              [0, 64],
              [-22, 92],
              [0, 92],
            ].map(([dx, y]) => (
              <Mark1 key={`${dx}-${y}`} kind={g} x={x + dx - 6} y={y} s={6} fill={KIND_TONE[g]} />
            ))}
            <Tub x={x + 46} y={104} s={0.95} tone={KIND_TONE[g]} />
          </g>
        );
      })}

      <Key x={296} y={162} fill={SIGNAL} size={10.5}>
        CONCENTRATED MARKETING?
      </Key>
      <rect x={298} y={178} width={184} height={80} rx={4} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.75} />
      {[
        [320, 200],
        [346, 200],
        [372, 200],
        [320, 236],
        [346, 236],
        [372, 236],
      ].map(([x, y]) => (
        <Mark1 key={`${x}-${y}`} kind={3} x={x} y={y} s={7} fill={SIGNAL} />
      ))}
      <Tub x={436} y={250} s={1.3} tone={SIGNAL} />
      {[520, 600, 680].map((x) => (
        <rect key={x} x={x} y={190} width={60} height={56} rx={4} fill="none" stroke={RULE2} strokeWidth={1} strokeDasharray="4 4" />
      ))}
    </Frame>
  );
}

/* ==========================================================================
   17 · PRODUCT AND MIND — differentiation, then positioning
   ========================================================================== */

export function OfferingAndMind() {
  return (
    <Frame height={300} label="Left, differentiation: three market offerings, two alike, one made different with a mark of superior customer value. An arrow leads right, to positioning: a head in profile holding a small map where competing products cluster and the offering sits in its own clear, distinctive place.">
      <Key x={40} y={24} fill={INK} size={10.5}>
        DIFFERENTIATION
      </Key>
      <Note x={40} y={44} size={12.5} italic>
        the firm&apos;s market offering
      </Note>
      <Pack1 x={80} y={200} w={64} h={84} tone={INK3} />
      <Pack1 x={164} y={200} w={64} h={84} tone={INK3} />
      <Pack1 x={260} y={206} w={76} h={98} tone={SIGNAL} fill={SIGNAL_TINT} />
      <path d="M260 138 L265 149 L277 150 L268 158 L271 170 L260 164 L249 170 L252 158 L243 150 L255 149 Z" fill={SIGNAL} />
      <line x1={36} y1={206} x2={316} y2={206} stroke={INK} strokeWidth={1.25} />
      <Key x={260} y={232} anchor="middle" fill={SIGNAL} size={9.5}>
        SUPERIOR
      </Key>
      <Key x={260} y={246} anchor="middle" fill={SIGNAL} size={9.5}>
        CUSTOMER VALUE
      </Key>

      <line x1={330} y1={150} x2={414} y2={150} stroke={SIGNAL} strokeWidth={1.75} />
      <path d={head2.right(416, 150)} fill="none" stroke={SIGNAL} strokeWidth={1.75} />

      <Key x={760} y={24} anchor="end" fill={SIGNAL} size={10.5}>
        POSITIONING
      </Key>
      <Head1 x={470} y={56} k={1.05} tone={INK} fill={PAPER} />
      {/* the map in the mind */}
      <line x1={540} y1={130} x2={680} y2={130} stroke={RULE2} strokeWidth={1} />
      <line x1={610} y1={78} x2={610} y2={186} stroke={RULE2} strokeWidth={1} />
      {[
        [566, 154],
        [584, 166],
        [560, 172],
        [588, 148],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={7} fill={INK3} />
      ))}
      <Note x={578} y={208} anchor="middle" size={11.5} italic>
        competing products
      </Note>
      <circle cx={636} cy={106} r={15} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.25} />
      <path
        d="M0 -16 L5 -5 L17 -4 L8 4 L11 16 L0 10 L-11 16 L-8 4 L-17 -4 L-5 -5 Z"
        transform="translate(636 107) scale(0.58)"
        fill={SIGNAL}
      />
      <Key x={615} y={292} anchor="middle" fill={INK} size={9.5}>
        IN THE MINDS OF TARGET CONSUMERS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   18 · PERCEPTUAL MAP — perceived positioning and relative share
   ========================================================================== */

export function PerceptualMap() {
  const rivals: [number, number, number][] = [
    [168, 118, 46],
    [196, 306, 30],
    [446, 312, 20],
    [488, 150, 13],
  ];
  const bx = 410;
  const by = 94;
  return (
    <Frame height={404} label="A perceptual positioning map. Two buying dimensions cross at the centre. A brand circle sits in the upper right; competing products are grey circles of different sizes. A key explains that each circle's position is the brand's perceived positioning, and its size is relative market share.">
      <Schematic x={792} y={18} />
      <line x1={60} y1={210} x2={560} y2={210} stroke={INK} strokeWidth={1.5} />
      <path d={head2.right(562, 210)} fill="none" stroke={INK} strokeWidth={1.5} />
      <path d={head2.left(58, 210)} fill="none" stroke={INK} strokeWidth={1.5} />
      <line x1={310} y1={34} x2={310} y2={388} stroke={INK} strokeWidth={1.5} />
      <path d={head2.up(310, 32)} fill="none" stroke={INK} strokeWidth={1.5} />
      <path d={head2.down(310, 390)} fill="none" stroke={INK} strokeWidth={1.5} />
      <Key x={322} y={40} fill={INK} size={9.5}>
        BUYING DIMENSION 2
      </Key>
      <Key x={560} y={234} anchor="end" fill={INK} size={9.5}>
        BUYING DIMENSION 1
      </Key>

      {rivals.map(([x, y, r]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill={PAPER2} stroke={INK3} strokeWidth={1.5} />
      ))}

      <line x1={bx} y1={by + 24} x2={bx} y2={208} stroke={SIGNAL} strokeWidth={1} strokeDasharray="3 4" />
      <line x1={bx - 24} y1={by} x2={312} y2={by} stroke={SIGNAL} strokeWidth={1} strokeDasharray="3 4" />
      <circle cx={bx} cy={by} r={24} fill={SIGNAL} />
      <Key x={bx} y={by + 4} anchor="middle" fill={PAPER} size={9}>
        BRAND
      </Key>

      {/* key */}
      <line x1={592} y1={40} x2={592} y2={388} stroke={RULE} strokeWidth={1} />
      <path d="M612 74 H660 M636 50 V98" stroke={RULE2} strokeWidth={1} />
      <circle cx={648} cy={62} r={6} fill={SIGNAL} />
      <line x1={648} y1={68} x2={648} y2={74} stroke={SIGNAL} strokeWidth={1} strokeDasharray="2 2" />
      <line x1={642} y1={62} x2={636} y2={62} stroke={SIGNAL} strokeWidth={1} strokeDasharray="2 2" />
      <Key x={612} y={128} fill={INK} size={9.5}>
        POSITION OF EACH CIRCLE
      </Key>
      <Note x={612} y={148} size={12.5} italic>
        the brand&apos;s perceived
      </Note>
      <Note x={612} y={164} size={12.5} italic>
        positioning
      </Note>

      <circle cx={622} cy={262} r={8} fill={PAPER2} stroke={INK3} strokeWidth={1.5} />
      <circle cx={670} cy={248} r={22} fill={PAPER2} stroke={INK3} strokeWidth={1.5} />
      <line x1={606} y1={272} x2={700} y2={272} stroke={RULE2} strokeWidth={1} />
      <Key x={612} y={304} fill={INK} size={9.5}>
        SIZE OF THE CIRCLE
      </Key>
      <Note x={612} y={324} size={12.5} italic>
        relative market share
      </Note>

      <circle cx={619} cy={358} r={7} fill={SIGNAL} />
      <Key x={634} y={362} fill={SIGNAL} size={9.5}>
        BRAND
      </Key>
      <circle cx={619} cy={382} r={7} fill={PAPER2} stroke={INK3} strokeWidth={1.5} />
      <Key x={634} y={386} fill={INK3} size={9.5}>
        COMPETING PRODUCTS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   19 · SIEVE — seven screens a difference must pass to be promoted
   ========================================================================== */

export function DifferenceSieve() {
  const screens = ["IMPORTANT", "DISTINCTIVE", "SUPERIOR", "COMMUNICABLE", "PREEMPTIVE", "AFFORDABLE", "PROFITABLE"];
  const counts = [14, 11, 9, 7, 5, 3, 2, 1];
  const bandY = (k: number) => 40 + k * 36;
  const screenY = (i: number) => 58 + i * 36;
  return (
    <Frame height={318} label="A sieve with seven screens: important, distinctive, superior, communicable, preemptive, affordable, profitable. Fourteen possible differences enter at the top; some are dropped at every screen, and one passes all seven to be promoted.">
      <Key x={210} y={bandY(0) + 4} anchor="end" fill={INK} size={9.5}>
        DIFFERENCES
      </Key>
      <line x1={620} y1={24} x2={620} y2={310} stroke={RULE} strokeWidth={1} />

      {screens.map((s, i) => (
        <g key={s}>
          <line x1={226} y1={screenY(i)} x2={594} y2={screenY(i)} stroke={INK} strokeWidth={1.5} strokeDasharray="14 6" />
          <Key x={210} y={screenY(i) + 4} anchor="end" fill={INK} size={9.5}>
            {s}
          </Key>
        </g>
      ))}

      {counts.map((n, k) => {
        const last = k === counts.length - 1;
        const dropped = k === 0 ? 0 : counts[k - 1] - n;
        return (
          <g key={k}>
            {Array.from({ length: n }, (_, j) => (
              <circle key={j} cx={410 + (j - (n - 1) / 2) * 24} cy={bandY(k)} r={last ? 8 : 5} fill={last ? SIGNAL : INK} />
            ))}
            {Array.from({ length: dropped }, (_, j) => (
              <circle key={`d${j}`} cx={644 + j * 18} cy={bandY(k) - 18} r={4.5} fill="none" stroke={INK3} strokeWidth={1.25} />
            ))}
          </g>
        );
      })}
      <line x1={428} y1={bandY(7)} x2={466} y2={bandY(7)} stroke={SIGNAL} strokeWidth={1.5} />
      <path d={head2.right(468, bandY(7))} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <Key x={478} y={bandY(7) + 4} fill={SIGNAL} size={10.5}>
        PROMOTE
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   20 · VALUE GRID — the five value propositions
   ========================================================================== */

export function ValueGrid() {
  const levels = ["MORE", "THE SAME", "LESS"];
  const cells: Record<string, string> = {
    "0-0": "More for More",
    "0-1": "More for the Same",
    "0-2": "More for Less",
    "1-2": "The Same for Less",
    "2-2": "Less for much Less",
  };
  const x0 = 210;
  const y0 = 70;
  const cw = 186;
  const ch = 88;
  return (
    <Frame height={350} label="A three-by-three grid of benefits against price, each More, The Same, or Less. Five cells are named: More for More, More for the Same, More for Less, The Same for Less, and Less for much Less. The other four are left blank.">
      <Key x={x0 + (cw * 3) / 2} y={22} anchor="middle" fill={INK} size={10.5}>
        PRICE
      </Key>
      <Key x={40} y={y0 + (ch * 3) / 2 + 4} fill={INK} size={10.5}>
        BENEFITS
      </Key>
      {levels.map((l, i) => (
        <g key={l}>
          <Key x={x0 + cw * i + cw / 2} y={54} anchor="middle" fill={INK3} size={9.5}>
            {l}
          </Key>
          <Key x={x0 - 14} y={y0 + ch * i + ch / 2 + 4} anchor="end" fill={INK3} size={9.5}>
            {l}
          </Key>
        </g>
      ))}
      {[0, 1, 2].map((r) =>
        [0, 1, 2].map((c) => {
          const name = cells[`${r}-${c}`];
          const x = x0 + c * cw;
          const y = y0 + r * ch;
          const strong = r === 0 && c === 2;
          return (
            <g key={`${r}-${c}`}>
              <rect
                x={x + 3}
                y={y + 3}
                width={cw - 6}
                height={ch - 6}
                fill={name ? (strong ? SIGNAL : SIGNAL_TINT) : PAPER2}
                stroke={name ? SIGNAL : RULE}
                strokeWidth={name ? 1.5 : 1}
              />
              {name ? (
                <Display x={x + cw / 2} y={y + ch / 2 + 6} anchor="middle" fill={strong ? PAPER : SIGNAL} size={17}>
                  {name}
                </Display>
              ) : null}
            </g>
          );
        }),
      )}
    </Frame>
  );
}

/* ==========================================================================
   21 · COLONNADE — the 4 Ps hold up the positioning strategy (400)
   ========================================================================== */

export function FourPsColonnade() {
  const ps = ["PRODUCT", "PRICE", "PLACE", "PROMOTION"];
  return (
    <Frame width={400} height={240} label="Four columns, product, price, place, and promotion, hold up a beam labelled positioning strategy.">
      <rect x={20} y={20} width={360} height={40} fill={SIGNAL} />
      <Key x={200} y={45} anchor="middle" fill={PAPER} size={10.5}>
        POSITIONING STRATEGY
      </Key>
      {ps.map((p, i) => {
        const cx = 65 + i * 90;
        return (
          <g key={p}>
            <rect x={cx - 30} y={60} width={60} height={8} fill={PAPER} stroke={INK} strokeWidth={1.25} />
            <rect x={cx - 22} y={68} width={44} height={112} fill={PAPER} stroke={INK} strokeWidth={1.5} />
            {[-10, 0, 10].map((dx) => (
              <line key={dx} x1={cx + dx} y1={76} x2={cx + dx} y2={172} stroke={RULE2} strokeWidth={1} />
            ))}
            <rect x={cx - 30} y={180} width={60} height={8} fill={PAPER} stroke={INK} strokeWidth={1.25} />
            <Key x={cx} y={214} anchor="middle" fill={INK} size={9}>
              {p}
            </Key>
          </g>
        );
      })}
      <line x1={14} y1={188} x2={386} y2={188} stroke={INK} strokeWidth={1.75} />
    </Frame>
  );
}

/* ==========================================================================
   22 · SLOW CURVE THAT HOLDS — establishing takes long, maintaining is steady
   ========================================================================== */

export function EstablishMaintain() {
  const pulses = [520, 560, 600, 640, 680, 720];
  return (
    <Frame height={244} label="A schematic curve over time. Establishing or changing a position rises slowly over a long stretch. Then a level line holds, kept up by regular marks of consistent performance and communication.">
      <Schematic x={792} y={18} />
      <line x1={60} y1={30} x2={60} y2={190} stroke={INK3} strokeWidth={1.25} />
      <line x1={60} y1={190} x2={770} y2={190} stroke={INK3} strokeWidth={1.25} />
      <path d={head2.right(772, 190)} fill="none" stroke={INK3} strokeWidth={1.25} />
      <Key x={70} y={30} fill={INK3} size={9.5}>
        POSITION
      </Key>
      <Key x={770} y={176} anchor="end" fill={INK3} size={9.5}>
        TIME
      </Key>

      <path d="M60 180 C200 178 270 168 330 132 C390 96 420 68 490 64" fill="none" stroke={INK} strokeWidth={2} />
      <line x1={490} y1={64} x2={760} y2={64} stroke={SIGNAL} strokeWidth={2.5} />
      {pulses.map((x, i) =>
        i % 2 ? (
          <rect key={x} x={x - 5} y={59} width={10} height={10} fill={SIGNAL} />
        ) : (
          <circle key={x} cx={x} cy={64} r={5.5} fill={SIGNAL} />
        ),
      )}

      <Note x={270} y={116} anchor="middle" size={12.5} italic>
        usually takes a long time
      </Note>
      <path d="M64 204 V212 H486 V204" fill="none" stroke={INK} strokeWidth={1.25} />
      <Key x={275} y={234} anchor="middle" fill={INK} size={9.5}>
        ESTABLISHING OR CHANGING A POSITION
      </Key>

      <Key x={625} y={40} anchor="middle" fill={SIGNAL} size={9.5}>
        MAINTAINING IT
      </Key>
      <circle cx={512} cy={100} r={4.5} fill={SIGNAL} />
      <Note x={524} y={104} size={12} italic>
        consistent performance
      </Note>
      <rect x={507.5} y={117.5} width={9} height={9} fill={SIGNAL} />
      <Note x={524} y={126} size={12} italic>
        consistent communication
      </Note>
    </Frame>
  );
}

/* ==========================================================================
   23 · TWO PHONES, ONE MIND — value proposition and differentiation
   ========================================================================== */

export function PhonesInMind() {
  return (
    <Frame height={262} label="A consumer in profile looks at two smartphones: a popular brand and its main competitor. Above the first, a question: what is its value proposition? Between them, a double arrow asks how it differentiates itself.">
      <Head1 x={30} y={40} k={0.9} faceRight tone={INK} fill={PAPER} />
      <path d="M196 144 L420 110 M196 144 L620 110" fill="none" stroke={INK3} strokeWidth={1} strokeDasharray="4 5" />
      <Key x={110} y={254} anchor="middle" fill={INK} size={9.5}>
        IN THE MINDS OF CONSUMERS
      </Key>

      <Key x={420} y={34} anchor="middle" fill={SIGNAL} size={10}>
        VALUE PROPOSITION?
      </Key>
      <Phone1 x={385} y={52} w={70} h={130} tone={SIGNAL} fill={SIGNAL_TINT} />
      <Display x={420} y={130} anchor="middle" fill={SIGNAL} size={30}>
        ?
      </Display>
      <Key x={420} y={208} anchor="middle" fill={SIGNAL} size={9.5}>
        POPULAR
      </Key>
      <Key x={420} y={222} anchor="middle" fill={SIGNAL} size={9.5}>
        SMARTPHONE BRAND
      </Key>

      <Phone1 x={585} y={52} w={70} h={130} tone={INK3} />
      <Key x={620} y={208} anchor="middle" fill={INK3} size={9.5}>
        MAIN
      </Key>
      <Key x={620} y={222} anchor="middle" fill={INK3} size={9.5}>
        COMPETITOR
      </Key>

      <line x1={470} y1={117} x2={570} y2={117} stroke={INK} strokeWidth={1.5} />
      <path d={head2.right(572, 117)} fill="none" stroke={INK} strokeWidth={1.5} />
      <path d={head2.left(468, 117)} fill="none" stroke={INK} strokeWidth={1.5} />
      <Note x={520} y={104} anchor="middle" size={12} italic>
        differentiates
      </Note>
    </Frame>
  );
}

/* ==========================================================================
   Conclusion glyphs — each echoes a plate already seen
   ========================================================================== */

export function GlyphSegment() {
  return (
    <svg {...glyphProps}>
      <line x1="32" y1="2" x2="32" y2="38" stroke="var(--ink-3)" strokeWidth="1" strokeDasharray="2 3" />
      {[
        [10, 12],
        [22, 12],
        [10, 28],
        [22, 28],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill="var(--counter)" />
      ))}
      {[
        [42, 8],
        [54, 8],
        [42, 24],
        [54, 24],
      ].map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x - 3.5} y={y} width="7" height="7" fill="var(--ink)" />
      ))}
    </svg>
  );
}

export function GlyphTarget() {
  return (
    <svg {...glyphProps}>
      {[8, 20, 44, 56].map((x) => (
        <circle key={x} cx={x} cy="20" r="3" fill="var(--rule-2)" />
      ))}
      <circle cx="32" cy="20" r="11" fill="rgba(178, 58, 21, 0.09)" stroke="var(--signal)" strokeWidth="1.5" />
      <circle cx="32" cy="20" r="4" fill="var(--signal)" />
    </svg>
  );
}

export function GlyphMind() {
  return (
    <svg {...glyphProps}>
      <g transform="translate(14 2) scale(0.165)">
        <path d={HEAD_PATH} stroke="var(--ink)" strokeWidth="9" strokeLinejoin="round" strokeLinecap="round" />
      </g>
      <circle cx="28" cy="16" r="2.5" fill="var(--ink-3)" />
      <circle cx="33" cy="20" r="2.5" fill="var(--ink-3)" />
      <circle cx="40" cy="12" r="4" fill="var(--signal)" />
    </svg>
  );
}
