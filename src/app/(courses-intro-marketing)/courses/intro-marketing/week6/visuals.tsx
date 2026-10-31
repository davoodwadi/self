/* ==========================================================================
   Week 6, figures
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
     - viewBox width 800 (400 or 360 for column plates), flat fills, hairline
       rules, no shadows or gradients
     - INK carries the neutral case, SIGNAL the operative one, COUNTER the
       contrast or outward-looking state
     - every label reuses words from the slide the plate sits on
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
  INK2,
  INK3,
  Key,
  Note,
  PAPER,
  PAPER2,
  r2,
  RULE,
  RULE2,
  SIGNAL,
  SIGNAL_TINT,
} from "../_visuals/kit";
import {
  Chip2,
  Coins2,
  Company1,
  HEAD_PATH,
  Head1,
  Mark1,
  Pack1,
  Person3,
  Phone1,
} from "../_visuals/objects";

/* -- shared glyphs --------------------------------------------------------- */

/**
 * Each buyer kind has its own mark (circle, square, triangle, diamond). The
 * tones only help tell them apart, so none is SIGNAL: SIGNAL stays free for
 * the segment a plate lights. Kind 3 is hollow so its diamond never reads as
 * kind 1's square.
 */
const KIND_TONE = [COUNTER, INK, INK3, INK];
const KIND_FILL = [COUNTER, INK, INK3, PAPER];

/**
 * A buyer: a person filled in their kind's tone, wearing their kind's mark.
 * `tone` overrides the kind's colour (a lit or faded buyer), keeping the mark.
 */
function Buyer({ kind, x, y, k = 0.8, tone }: { kind: number; x: number; y: number; k?: number; tone?: string }) {
  const stroke = tone ?? KIND_TONE[kind];
  const fill = tone ?? KIND_FILL[kind];
  return (
    <g>
      <Person3 x={x} y={y} k={k} stroke={stroke} fill={fill} width={1.25} />
      <Mark1
        kind={kind}
        x={x}
        y={r2(y - 8 * k)}
        s={r2(3.4 * k)}
        fill={fill === PAPER ? INK : PAPER}
      />
    </g>
  );
}

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
      <rect x={r2(x - 19.5 * s)} y={r2(y - 30 * s)} width={r2(39 * s)} height={r2(13 * s)} fill={fill !== PAPER ? PAPER : tone === SIGNAL ? SIGNAL_TINT : "var(--paper-3)"} stroke={tone} strokeWidth={1} />
    </g>
  );
}

/* ==========================================================================
   0. FOUR-STEP STP FRAMEWORK: selecting customers & deciding value proposition
   ========================================================================== */

export function FourStepStpFramework() {
  const panels = [
    { x: 20, cx: 106, step: "1. Market segmentation", note: "Divide into buyer groups", lit: false },
    { x: 212, cx: 298, step: "2. Market targeting", note: "Select segments to enter", lit: true },
    { x: 416, cx: 502, step: "3. Differentiation", note: "Create superior value", lit: false },
    { x: 608, cx: 694, step: "4. Positioning", note: "Place in consumer minds", lit: true },
  ];

  return (
    <Frame
      height={296}
      label="Four-step STP framework. Left pair under Selecting customers to serve: 1. Market segmentation divides a market into four buyer groups, and 2. Market targeting selects the upper-right segment. Right pair under Deciding on a value proposition: 3. Differentiation sets one market offering apart with superior value, and 4. Positioning places that offering in a clear spot inside a target consumer's mind."
    >
      {/* Top stage brackets */}
      <Key x={202} y={22} anchor="middle" fill={INK} size={11}>
        Selecting customers to serve
      </Key>
      <path d="M20 38 V30 H384 V38" fill="none" stroke={INK} strokeWidth={1.25} />

      <Key x={598} y={22} anchor="middle" fill={SIGNAL} size={11}>
        Deciding on a value proposition
      </Key>
      <path d="M416 38 V30 H780 V38" fill="none" stroke={SIGNAL} strokeWidth={1.25} />

      {/* Four step cards */}
      {panels.map((p) => (
        <g key={p.step}>
          <rect
            x={p.x}
            y={50}
            width={172}
            height={196}
            rx={4}
            fill={p.lit ? PAPER2 : PAPER}
            stroke={p.lit ? SIGNAL : INK}
            strokeWidth={p.lit ? 1.5 : 1.25}
          />
          <Key x={p.cx} y={72} anchor="middle" fill={p.lit ? SIGNAL : INK} size={10.5}>
            {p.step}
          </Key>
          <line x1={p.x + 14} y1={82} x2={p.x + 158} y2={82} stroke={RULE} strokeWidth={1} />
          <Note x={p.cx} y={232} anchor="middle" fill={p.lit ? SIGNAL : INK3} size={11.5}>
            {p.note}
          </Note>
        </g>
      ))}

      {/* Step 1 drawing: 2x2 divided market */}
      <rect x={44} y={96} width={124} height={110} fill={PAPER} stroke={INK3} strokeWidth={1} />
      <line x1={106} y1={96} x2={106} y2={206} stroke={INK3} strokeWidth={1} strokeDasharray="3 3" />
      <line x1={44} y1={151} x2={168} y2={151} stroke={INK3} strokeWidth={1} strokeDasharray="3 3" />
      <Buyer kind={0} x={66} y={142} k={0.62} />
      <Buyer kind={0} x={86} y={142} k={0.62} />
      <Buyer kind={1} x={126} y={142} k={0.62} />
      <Buyer kind={1} x={146} y={142} k={0.62} />
      <Buyer kind={2} x={66} y={196} k={0.62} />
      <Buyer kind={2} x={86} y={196} k={0.62} />
      <Buyer kind={3} x={126} y={196} k={0.62} />
      <Buyer kind={3} x={146} y={196} k={0.62} />

      {/* Step 2 drawing: selected segment highlighted */}
      <rect x={236} y={96} width={124} height={110} fill={PAPER} stroke={INK3} strokeWidth={1} />
      <rect x={298} y={96} width={62} height={55} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
      <line x1={298} y1={151} x2={298} y2={206} stroke={RULE2} strokeWidth={1} strokeDasharray="3 3" />
      <line x1={236} y1={151} x2={298} y2={151} stroke={RULE2} strokeWidth={1} strokeDasharray="3 3" />
      <Buyer kind={0} x={258} y={142} k={0.62} tone={RULE2} />
      <Buyer kind={0} x={278} y={142} k={0.62} tone={RULE2} />
      <Buyer kind={1} x={318} y={142} k={0.62} tone={SIGNAL} />
      <Buyer kind={1} x={338} y={142} k={0.62} tone={SIGNAL} />
      <Buyer kind={2} x={258} y={196} k={0.62} tone={RULE2} />
      <Buyer kind={2} x={278} y={196} k={0.62} tone={RULE2} />
      <Buyer kind={3} x={318} y={196} k={0.62} tone={RULE2} />
      <Buyer kind={3} x={338} y={196} k={0.62} tone={RULE2} />

      {/* Step 3 drawing: differentiated market offering */}
      <Pack1 x={456} y={198} w={34} h={46} tone={INK3} />
      <Pack1 x={496} y={198} w={34} h={46} tone={INK3} />
      <Pack1 x={544} y={198} w={40} h={60} tone={SIGNAL} fill={SIGNAL_TINT} />
      <path
        d="M544 110 L547.5 117.5 L556 118.5 L549.8 124 L551.5 132 L544 127.8 L536.5 132 L538.2 124 L532 118.5 L540.5 117.5 Z"
        fill={SIGNAL}
      />
      <line x1={432} y1={198} x2={572} y2={198} stroke={INK} strokeWidth={1.25} />

      {/* Step 4 drawing: clear place in consumer minds (head profile + perceptual map) */}
      <Head1 x={626} y={88} k={0.56} tone={INK} fill={PAPER} />
      <line x1={662} y1={143} x2={716} y2={143} stroke={RULE2} strokeWidth={1} />
      <line x1={689} y1={116} x2={689} y2={170} stroke={RULE2} strokeWidth={1} />
      <circle cx={674} cy={153} r={4} fill={INK3} />
      <circle cx={682} cy={160} r={3.5} fill={INK3} />
      <circle cx={669} cy={161} r={3.2} fill={INK3} />
      <circle cx={703} cy={129} r={7.5} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
      <circle cx={703} cy={129} r={3} fill={SIGNAL} />

      {/* Arrows between steps */}
      {[
        [192, 212, INK],
        [384, 416, SIGNAL],
        [588, 608, INK],
      ].map(([x1, x2, tone]) => (
        <g key={x1}>
          <line x1={x1} y1={148} x2={Number(x2) - 2} y2={148} stroke={String(tone)} strokeWidth={1.5} />
          <path d={head2.right(Number(x2), 148)} fill="none" stroke={String(tone)} strokeWidth={1.5} />
        </g>
      ))}

      {/* Bottom unifying rule */}
      <line x1={20} y1={264} x2={780} y2={264} stroke={INK} strokeWidth={1.25} />
      <Key x={400} y={284} anchor="middle" fill={INK} size={10.5}>
        Customer-driven marketing strategy (STP)
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   1. SORTED CROWD: a market divided into distinct groups of buyers
   ========================================================================== */

export function MarketDivided() {
  // 24 buyers, six of each kind, in a jittered 6 × 4 grid.
  const order = Array.from({ length: 24 }, (_, i) => i).sort((a, b) => hash2(a + 40) - hash2(b + 40));
  const mixed = order.map((slot, i) => ({
    kind: i % 4,
    x: r2(50 + (slot % 6) * 44 + (hash2(slot + 90) - 0.5) * 12),
    y: r2(100 + Math.floor(slot / 6) * 50 + (hash2(slot + 190) - 0.5) * 8),
  }));
  const groupX = [396, 506, 616, 726];
  const inGroup = [-28, 0, 28].flatMap((dx) => [
    [dx, 98],
    [dx, 146],
  ]);
  return (
    <Frame height={300} label="A market of mixed buyers, four kinds of people each wearing their own mark, is divided into four distinct groups, each holding only one kind. Under each group sits its own product, marked for that group.">
      <Key x={20} y={30} fill={INK} size={10.5}>
        A MARKET
      </Key>
      <rect x={20} y={44} width={286} height={232} fill="none" stroke={INK3} strokeWidth={1.25} />
      {mixed.map((m, i) => (
        <Buyer key={i} kind={m.kind} x={m.x} y={m.y} />
      ))}

      <line x1={316} y1={160} x2={334} y2={160} stroke={INK} strokeWidth={1.5} />
      <path d={head2.right(336, 160)} fill="none" stroke={INK} strokeWidth={1.5} />

      <Key x={348} y={30} fill={SIGNAL} size={10.5}>
        DISTINCT GROUPS OF BUYERS
      </Key>
      {groupX.map((gx, g) => (
        <g key={gx}>
          <rect x={gx - 48} y={44} width={96} height={120} rx={4} fill={PAPER} stroke={SIGNAL} strokeWidth={1.5} />
          {inGroup.map(([dx, y], j) => (
            <Buyer key={j} kind={g} x={gx + dx} y={y} />
          ))}
          <line x1={gx} y1={164} x2={gx} y2={190} stroke={INK3} strokeWidth={1.25} />
          <Pack1 x={gx} y={232} w={46} h={40} tone={KIND_TONE[g]} kind={g} markFill={KIND_FILL[g]} />
        </g>
      ))}
      <path d="M348 244 V252 H774 V244" fill="none" stroke={INK} strokeWidth={1.25} />
      <Key x={561} y={276} anchor="middle" fill={INK} size={10}>
        SEPARATE PRODUCTS OR MARKETING PROGRAMS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   2. FIVE CRITERIA GLYPHS: measurable, accessible, substantial,
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
   3. FOUR PRIMARY BASES FOR SEGMENTING CONSUMER MARKETS
   ========================================================================== */

export function ConsumerSegmentationBases() {
  const cols = [
    { x: 20, cx: 108, title: "Geographic", note: "Nations, regions, climate, cities", tone: COUNTER, fill: PAPER },
    { x: 212, cx: 300, title: "Demographic", note: "Most popular, easier to measure", tone: SIGNAL, fill: PAPER2 },
    { x: 404, cx: 492, title: "Psychographic", note: "Social class, lifestyle, personality", tone: INK, fill: PAPER },
    { x: 596, cx: 684, title: "Behavioral", note: "Occasions, benefits, usage, loyalty", tone: INK, fill: PAPER },
  ];

  return (
    <Frame
      height={284}
      label="Four primary bases for segmenting consumer markets. 1. Geographic: northern cold region with snow and boot versus southern warm region with sun and patio chair. 2. Demographic (highlighted as most popular and easier to measure): buyer profile card with age, life-cycle, income, and generation plus a measuring ruler. 3. Psychographic: two buyers with outdoor mountain versus home reading lifestyles. 4. Behavioral: calendar occasion, benefit star, usage rate bars, and loyalty return loop."
    >
      <Key x={400} y={20} anchor="middle" fill={INK} size={11}>
        Four primary bases for segmenting consumer markets
      </Key>

      {cols.map((c) => (
        <g key={c.title}>
          <rect
            x={c.x}
            y={34}
            width={176}
            height={232}
            rx={4}
            fill={c.fill}
            stroke={c.tone}
            strokeWidth={c.tone === SIGNAL ? 1.5 : 1.25}
          />
          <Key x={c.cx} y={56} anchor="middle" fill={c.tone} size={11}>
            {c.title}
          </Key>
          <line x1={c.x + 14} y1={66} x2={c.x + 162} y2={66} stroke={RULE} strokeWidth={1} />
          <Note x={c.cx} y={250} anchor="middle" fill={c.tone === SIGNAL ? SIGNAL : INK3} size={11}>
            {c.note}
          </Note>
        </g>
      ))}

      {/* 1. Geographic: North (snow + boot) vs South (sun + patio lounge) */}
      <rect x={36} y={78} width={144} height={68} rx={3} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.25} />
      <Key x={46} y={95} fill={COUNTER} size={9.5}>
        North
      </Key>
      {/* Snowflake */}
      <g stroke={COUNTER} strokeWidth={1.25} strokeLinecap="round">
        <line x1={62} y1={110} x2={62} y2={130} />
        <line x1={52} y1={120} x2={72} y2={120} />
        <line x1={55} y1={113} x2={69} y2={127} />
        <line x1={69} y1={113} x2={55} y2={127} />
      </g>
      {/* Insulated boot silhouette */}
      <path
        d="M118 96 H138 V122 H154 A6 6 0 0 1 160 128 V134 H114 V96 Z"
        fill={PAPER}
        stroke={COUNTER}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <line x1={114} y1={130} x2={160} y2={130} stroke={COUNTER} strokeWidth={1.25} />

      <rect x={36} y={156} width={144} height={68} rx={3} fill={PAPER} stroke={INK} strokeWidth={1.25} />
      <Key x={46} y={173} fill={INK} size={9.5}>
        South
      </Key>
      {/* Sun */}
      <circle cx={62} cy={198} r={7} fill="none" stroke={INK} strokeWidth={1.3} />
      {[0, 60, 120, 180, 240, 300].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <line
            key={deg}
            x1={r2(62 + Math.cos(rad) * 10)}
            y1={r2(198 + Math.sin(rad) * 10)}
            x2={r2(62 + Math.cos(rad) * 13)}
            y2={r2(198 + Math.sin(rad) * 13)}
            stroke={INK}
            strokeWidth={1.2}
          />
        );
      })}
      {/* Patio umbrella + table */}
      <path d="M112 192 Q136 172 160 192 Z" fill={PAPER2} stroke={INK} strokeWidth={1.4} strokeLinejoin="round" />
      <line x1={136} y1={192} x2={136} y2={214} stroke={INK} strokeWidth={1.4} />
      <line x1={118} y1={204} x2={154} y2={204} stroke={INK} strokeWidth={1.4} />
      <line x1={124} y1={204} x2={120} y2={214} stroke={INK} strokeWidth={1.3} />
      <line x1={148} y1={204} x2={152} y2={214} stroke={INK} strokeWidth={1.3} />

      {/* 2. Demographic: Profile card + ticked traits + ruler */}
      <rect x={228} y={80} width={52} height={68} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.25} />
      <Person3 x={254} y={142} k={1.3} stroke={SIGNAL} />
      {[
        ["Age", 92],
        ["Life-cycle", 118],
        ["Income", 144],
        ["Generation", 170],
      ].map(([label, y]) => (
        <g key={label}>
          <Key x={290} y={Number(y)} fill={INK} size={9.5}>
            {label}
          </Key>
          <line x1={290} y1={Number(y) + 6} x2={372} y2={Number(y) + 6} stroke={RULE2} strokeWidth={1} />
          <path
            d={`M360 ${Number(y) - 3} L364 ${Number(y) + 1} L371 ${Number(y) - 6}`}
            fill="none"
            stroke={SIGNAL}
            strokeWidth={1.5}
          />
        </g>
      ))}
      {/* Measuring ruler at bottom of demographic card */}
      <rect x={228} y={196} width={144} height={20} fill={PAPER} stroke={SIGNAL} strokeWidth={1.4} />
      {Array.from({ length: 13 }, (_, i) => (
        <line
          key={i}
          x1={238 + i * 10.3}
          y1={196}
          x2={238 + i * 10.3}
          y2={i % 2 === 0 ? 206 : 202}
          stroke={SIGNAL}
          strokeWidth={1.2}
        />
      ))}

      {/* 3. Psychographic: Two buyers with contrasting lifestyles */}
      <rect x={418} y={78} width={68} height={62} rx={6} fill={PAPER} stroke={INK} strokeWidth={1.25} />
      <path d="M426 128 L444 98 L456 115 L466 104 L478 128 Z" fill={PAPER2} stroke={INK} strokeWidth={1.3} strokeLinejoin="round" />
      <circle cx={468} cy={91} r={4.5} fill="none" stroke={INK} strokeWidth={1.2} />
      <circle cx={452} cy={147} r={3} fill={PAPER} stroke={INK} strokeWidth={1.2} />
      <circle cx={452} cy={155} r={1.8} fill={PAPER} stroke={INK} strokeWidth={1.1} />

      <rect x={498} y={78} width={68} height={62} rx={6} fill={PAPER} stroke={INK} strokeWidth={1.25} />
      <Armchair x={532} y={110} k={0.42} tone={INK} />
      <circle cx={532} cy={147} r={3} fill={PAPER} stroke={INK} strokeWidth={1.2} />
      <circle cx={532} cy={155} r={1.8} fill={PAPER} stroke={INK} strokeWidth={1.1} />

      <Person3 x={452} y={210} k={1.3} stroke={INK} />
      <Person3 x={532} y={210} k={1.3} stroke={INK} />
      <path d="M430 218 V224 H554 V218" fill="none" stroke={INK3} strokeWidth={1.1} />

      {/* 4. Behavioral: 2x2 grid of occasions, benefits, usage rate, loyalty */}
      <line x1={684} y1={78} x2={684} y2={224} stroke={RULE} strokeWidth={1} />
      <line x1={610} y1={151} x2={758} y2={151} stroke={RULE} strokeWidth={1} />

      {/* Top-left: Occasion calendar */}
      <rect x={624} y={88} width={38} height={36} fill={PAPER} stroke={INK} strokeWidth={1.3} />
      <rect x={624} y={88} width={38} height={8} fill={INK} />
      <circle cx={648} cy={111} r={5} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <Key x={643} y={140} anchor="middle" fill={INK3} size={8.5}>
        Occasions
      </Key>

      {/* Top-right: Benefits sought star */}
      <path
        d="M725 90 L728.5 98 L737 99 L730.8 104.5 L732.5 113 L725 108.5 L717.5 113 L719.2 104.5 L713 99 L721.5 98 Z"
        fill={SIGNAL}
      />
      <Key x={725} y={140} anchor="middle" fill={INK3} size={8.5}>
        Benefits
      </Key>

      {/* Bottom-left: Usage rate bars */}
      <rect x={626} y={188} width={8} height={12} fill={PAPER} stroke={INK} strokeWidth={1.2} />
      <rect x={639} y={176} width={8} height={24} fill={PAPER} stroke={INK} strokeWidth={1.2} />
      <rect x={652} y={162} width={8} height={38} fill={SIGNAL} stroke={SIGNAL} strokeWidth={1.2} />
      <line x1={622} y1={200} x2={664} y2={200} stroke={INK} strokeWidth={1.2} />
      <Key x={643} y={216} anchor="middle" fill={INK3} size={8.5}>
        Usage rate
      </Key>

      {/* Bottom-right: Loyalty status heart + return arc */}
      <path
        d="M725 190 C716 184 713 177 716 173 C719 169 723 170 725 174 C727 170 731 169 734 173 C737 177 734 184 725 190 Z"
        fill={SIGNAL}
      />
      <path d="M741 174 A17 17 0 1 1 733 164" fill="none" stroke={INK} strokeWidth={1.4} />
      <path d={headAlong1(733, 164, 0.866, 0.5, 5.5)} fill="none" stroke={INK} strokeWidth={1.4} />
      <Key x={725} y={216} anchor="middle" fill={INK3} size={8.5}>
        Loyalty
      </Key>
    </Frame>
  );
}

export function GeographicZoom() {
  const levels = ["NATIONS", "STATES", "REGIONS", "COUNTIES", "CITIES", "NEIGHBORHOODS"];
  return (
    <Frame width={400} height={232} label="Six nested outlines, each inside the last: nations, states, regions, counties, cities, and neighborhoods. The smallest holds a map pin.">
      {levels.map((name, i) => {
        const x = 12 + i * 22;
        const y = 12 + i * 26;
        const last = i === levels.length - 1;
        return (
          <g key={name}>
            <rect
              x={x}
              y={y}
              width={376 - i * 30}
              height={208 - i * 32}
              fill={last ? SIGNAL_TINT : i % 2 ? PAPER2 : PAPER}
              stroke={last ? SIGNAL : INK3}
              strokeWidth={last ? 1.75 : 1.25}
            />
            <Key x={x + 10} y={y + 18} fill={last ? SIGNAL : INK} size={9.5}>
              {name}
            </Key>
          </g>
        );
      })}
      <path d="M300 182 C291 171 289 168 289 164 A11 11 0 0 1 311 164 C311 168 309 171 300 182 Z" fill={SIGNAL} />
      <circle cx={300} cy={164} r={4} fill={PAPER} />
    </Frame>
  );
}

/* ==========================================================================
   4. PROFILE CARD: demographic variables (400)
   ========================================================================== */

export function DemographicCard() {
  const fields = ["AGE", "LIFE-CYCLE STAGE", "GENDER", "INCOME", "OCCUPATION", "EDUCATION", "RELIGION", "ETHNICITY", "GENERATION"];
  return (
    <Frame width={400} height={232} label="A profile card for one buyer with nine demographic fields, each ticked: age, life-cycle stage, gender, income, occupation, education, religion, ethnicity, and generation. Under the portrait, a ruler: easier to measure.">
      <rect x={12} y={10} width={376} height={212} rx={6} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <rect x={32} y={28} width={92} height={96} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.25} />
      <Person3 x={78} y={124} k={2} stroke={COUNTER} />

      {/* ruler: easier to measure */}
      <rect x={32} y={146} width={92} height={18} fill={PAPER} stroke={SIGNAL} strokeWidth={1.5} />
      {Array.from({ length: 9 }, (_, i) => (
        <line key={i} x1={40 + i * 9.5} y1={146} x2={40 + i * 9.5} y2={i % 2 ? 152 : 156} stroke={SIGNAL} strokeWidth={1.25} />
      ))}
      <Key x={78} y={186} anchor="middle" fill={SIGNAL} size={9}>
        EASIER TO
      </Key>
      <Key x={78} y={200} anchor="middle" fill={SIGNAL} size={9}>
        MEASURE
      </Key>

      {fields.map((f, i) => {
        const y = 36 + i * 21;
        return (
          <g key={f}>
            <Key x={146} y={y} fill={INK} size={9}>
              {f}
            </Key>
            <line x1={146} y1={y + 7} x2={370} y2={y + 7} stroke={RULE} strokeWidth={1} />
            <path d={`M${356} ${y - 3} L${360} ${y + 1} L${367} ${y - 7}`} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
          </g>
        );
      })}
    </Frame>
  );
}

/* ==========================================================================
   5. TWINS: same demographic group, very different psychographics
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
      <path d="M40 60 H104 A8 8 0 0 1 112 68 V96 H32 V68 A8 8 0 0 1 40 60 Z" fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <path d="M48 60 V34 A10 10 0 0 1 58 24 H86 A10 10 0 0 1 96 34 V60" fill="none" stroke={INK} strokeWidth={1.5} />
      <path d="M36 96 V104 M108 96 V104" stroke={INK} strokeWidth={1.5} />
      <path d="M150 104 V32 M136 104 H164" stroke={INK} strokeWidth={1.5} />
      <path d="M134 32 L144 12 H158 L168 32 Z" fill={PAPER} stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
      <path d="M186 90 L200 86 V100 L186 104 L172 100 V86 Z M186 90 V104" fill={PAPER} stroke={INK} strokeWidth={1.25} strokeLinejoin="round" />
      <line x1={0} y1={104} x2={210} y2={104} stroke={INK} strokeWidth={1.25} />
    </g>
  );
}

export function PsychographicTwins() {
  return (
    <Frame height={318} label="Two identical people stand on one bracket: the same demographic group. Above one, an outdoor life of mountains and a tent. Above the other, a quiet life of an armchair, a lamp, and a book. Very different psychographic characteristics.">
      <Key x={400} y={22} anchor="middle" fill={SIGNAL} size={10.5}>
        VERY DIFFERENT PSYCHOGRAPHIC CHARACTERISTICS
      </Key>

      {[
        { x: 140, tone: COUNTER, scene: <OutdoorScene x={155} y={48} /> },
        { x: 440, tone: INK, scene: <HomeScene x={455} y={48} /> },
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
   6. LIFESTYLE TO PRODUCT: offerings that align (400)
   ========================================================================== */

/** The armchair from HomeScene, drawn small, centred on (x, y). */
function Armchair({ x, y, k = 0.5, tone = INK }: { x: number; y: number; k?: number; tone?: string }) {
  const w = r2(1.5 / k);
  return (
    <g transform={`translate(${r2(x - 72 * k)} ${r2(y - 64 * k)}) scale(${k})`}>
      <path d="M40 60 H104 A8 8 0 0 1 112 68 V96 H32 V68 A8 8 0 0 1 40 60 Z" fill={PAPER} stroke={tone} strokeWidth={w} />
      <path d="M48 60 V34 A10 10 0 0 1 58 24 H86 A10 10 0 0 1 96 34 V60" fill="none" stroke={tone} strokeWidth={w} />
      <path d="M36 96 V104 M108 96 V104" stroke={tone} strokeWidth={w} />
    </g>
  );
}

export function LifestyleProducts() {
  return (
    <Frame width={400} height={176} label="Two rows. An outdoor lifestyle of mountains aligns with a tent for sale. A quiet lifestyle at home, an armchair, aligns with a reading lamp for sale.">
      {/* outdoor → tent */}
      <circle cx={60} cy={48} r={36} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.5} />
      <path d="M34 66 L54 38 L66 52 L74 42 L88 66 Z" fill="none" stroke={COUNTER} strokeWidth={1.5} strokeLinejoin="round" />
      <path d="M108 48 H262" stroke={SIGNAL} strokeWidth={1.5} />
      <path d={head2.right(264, 48)} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <rect x={284} y={18} width={84} height={60} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <path d="M302 70 L326 32 L350 70 Z M326 32 V70" fill="none" stroke={COUNTER} strokeWidth={1.5} strokeLinejoin="round" />

      {/* home → lamp */}
      <circle cx={60} cy={128} r={36} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <Armchair x={60} y={128} k={0.5} />
      <path d="M108 128 H262" stroke={SIGNAL} strokeWidth={1.5} />
      <path d={head2.right(264, 128)} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <rect x={284} y={98} width={84} height={60} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <path d="M326 122 V150 M314 150 H338 M312 122 L318 108 H334 L340 122 Z" fill="none" stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />

      <Note x={185} y={40} anchor="middle" size={11.5} italic fill={SIGNAL}>
        align
      </Note>
      <Note x={185} y={120} anchor="middle" size={11.5} italic fill={SIGNAL}>
        align
      </Note>
    </Frame>
  );
}

/* ==========================================================================
   7. BEHAVIOUR ICONS: the five behavioral variables
   ========================================================================== */

export function BehavioralVariables() {
  const cols = [80, 240, 400, 560, 720];
  return (
    <Frame height={196} label="Five behavioral variables as icons: occasions, a calendar with one day circled. Benefits sought, a magnifier over a star. User status, three people from dashed to filled. Usage rate, three bars from short to tall. Loyalty status, a heart inside a returning arrow.">
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
   8. BENEFIT MAPPING: benefits, the people who seek each, the brands
   ========================================================================== */

export function BenefitMapping() {
  const rows = [
    { y: 90, kind: 0 },
    { y: 154, kind: 2 },
    { y: 218, kind: 1 },
  ];
  return (
    <Frame height={250} label="A three-column map. Each major benefit, drawn as a shape, links to the kinds of people who look for it, each person wearing that shape, and to the major brands that deliver it, carrying the same shape.">
      {[
        { x: 120, n: "1", a: "MAJOR BENEFITS" },
        { x: 400, n: "2", a: "PEOPLE WHO LOOK FOR EACH" },
        { x: 680, n: "3", a: "BRANDS THAT DELIVER EACH" },
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

      {rows.map(({ y, kind }) => ({ y, kind, tone: KIND_TONE[kind] })).map((r) => (
        <g key={r.y}>
          <circle cx={120} cy={r.y} r={24} fill={PAPER} stroke={r.tone} strokeWidth={1.5} />
          <Mark1 kind={r.kind} x={120} y={r.y} s={11} fill={KIND_FILL[r.kind]} stroke={r.tone} width={1.5} />

          <line x1={152} y1={r.y} x2={316} y2={r.y} stroke={r.tone} strokeWidth={1.25} />
          <path d={head2.right(318, r.y)} fill="none" stroke={r.tone} strokeWidth={1.25} />
          {[350, 400, 450].map((px) => (
            <Buyer key={px} kind={r.kind} x={px} y={r.y + 20} k={1.1} />
          ))}

          <line x1={484} y1={r.y} x2={612} y2={r.y} stroke={r.tone} strokeWidth={1.25} />
          <path d={head2.right(614, r.y)} fill="none" stroke={r.tone} strokeWidth={1.25} />
          <Pack1 x={652} y={r.y + 20} w={42} h={44} tone={r.tone} kind={r.kind} markFill={KIND_FILL[r.kind]} />
          <Pack1 x={712} y={r.y + 20} w={42} h={44} tone={r.tone} kind={r.kind} markFill={KIND_FILL[r.kind]} />
        </g>
      ))}
    </Frame>
  );
}

/* ==========================================================================
   9. TWO TOWERS: business marketers add variables on top
   ========================================================================== */

export function BusinessTowers() {
  const shared = ["LOYALTY STATUS", "USAGE RATE", "USER STATUS", "BENEFITS SOUGHT", "DEMOGRAPHIC", "GEOGRAPHIC"].reverse();
  const extra = ["CUSTOMER OPERATING CHARACTERISTICS", "PURCHASING APPROACHES", "SITUATIONAL FACTORS", "PERSONAL CHARACTERISTICS"];
  const base = 290;
  const step = 27;
  const block = (x: number, i: number, label: string, lit: boolean) => {
    const y = base - (i + 1) * step;
    return (
      <g key={`${x}-${label}`}>
        <rect x={x} y={y} width={280} height={24} fill={lit ? SIGNAL_TINT : PAPER} stroke={lit ? SIGNAL : INK} strokeWidth={1.25} />
        <Key x={x + 140} y={y + 16.5} anchor="middle" fill={lit ? SIGNAL : INK} size={label.length > 30 ? 9 : 10}>
          {label}
        </Key>
      </g>
    );
  };
  const sharedTop = base - shared.length * step;
  return (
    <Frame height={332} label="Two towers of segmentation variables. The consumer tower and the business tower share the same six blocks: geographic, demographic, benefits sought, user status, usage rate, loyalty status. The business tower stacks four more on top: customer operating characteristics, purchasing approaches, situational factors, personal characteristics.">
      {shared.map((s, i) => block(20, i, s, false))}
      {shared.map((s, i) => block(400, i, s, false))}
      {extra.map((s, i) => block(400, i + shared.length, s, true))}

      <line x1={10} y1={base + 1} x2={700} y2={base + 1} stroke={INK} strokeWidth={1.75} />
      <Key x={160} y={316} anchor="middle" fill={INK} size={10}>
        CONSUMER MARKETERS
      </Key>
      <Key x={540} y={316} anchor="middle" fill={INK} size={10}>
        BUSINESS MARKETERS
      </Key>

      {[sharedTop - 2, base - 1].map((y) => (
        <line key={y} x1={304} y1={y} x2={396} y2={y} stroke={INK3} strokeWidth={1} strokeDasharray="3 4" />
      ))}
      <Note x={350} y={210} anchor="middle" size={12} italic>
        many of the
      </Note>
      <Note x={350} y={228} anchor="middle" size={12} italic>
        same variables
      </Note>

      <path d={`M688 ${base - 10 * step} H696 V${sharedTop - 3} H688`} fill="none" stroke={SIGNAL} strokeWidth={1.25} />
      <Key x={706} y={base - 8 * step + 2} fill={SIGNAL} size={10}>
        ADDITIONAL
      </Key>
      <Key x={706} y={base - 8 * step + 17} fill={SIGNAL} size={10}>
        VARIABLES
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   10. THREE-WAY OVERLAP: combining variables for athletic shoes
   ========================================================================== */

export function ShoeOverlap() {
  const circles = [
    { cx: 392, cy: 120, tone: INK, name: "DEMOGRAPHIC", lx: 290, ly: 26, anchor: "end" as const },
    { cx: 488, cy: 120, tone: COUNTER, name: "PSYCHOGRAPHIC", lx: 590, ly: 26, anchor: "start" as const },
    { cx: 440, cy: 206, tone: INK3, name: "BEHAVIORAL", lx: 440, ly: 322, anchor: "middle" as const },
  ];
  return (
    <Frame height={336} label="An athletic shoe, with the brand's colour on its sole, beside three overlapping circles: demographic, psychographic, and behavioral. Where all three overlap stand three people, one specific consumer group.">
      {/* sneaker */}
      <path
        d="M44 234 V204 C44 190 52 182 64 182 L94 190 C108 192 118 184 126 172 L140 152 C146 144 156 146 160 154 L178 184 C198 196 232 200 250 208 C262 214 264 224 262 234 Z"
        fill={PAPER}
        stroke={INK}
        strokeWidth={1.75}
        strokeLinejoin="round"
      />
      <rect x={38} y={232} width={230} height={12} rx={5} fill={COUNTER} />
      <path d="M150 166 L164 158 M158 178 L172 170 M168 190 L182 182" stroke={INK} strokeWidth={1.5} strokeLinecap="round" />
      <path d="M88 214 C130 214 170 206 206 214" fill="none" stroke={INK3} strokeWidth={1.25} />

      {circles.map((c) => (
        <g key={c.name}>
          <circle cx={c.cx} cy={c.cy} r={92} fill="none" stroke={c.tone} strokeWidth={1.75} />
          <Key x={c.lx} y={c.ly} anchor={c.anchor} fill={c.tone} size={10.5}>
            {c.name}
          </Key>
        </g>
      ))}
      <line x1={296} y1={30} x2={326} y2={54} stroke={INK} strokeWidth={1} />
      <line x1={584} y1={30} x2={554} y2={54} stroke={COUNTER} strokeWidth={1} />

      {[422, 440, 458].map((x) => (
        <Person3 key={x} x={x} y={166} k={0.65} stroke={SIGNAL} fill={SIGNAL} width={1} />
      ))}
      <line x1={470} y1={160} x2={640} y2={212} stroke={SIGNAL} strokeWidth={1.25} />
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
   11. METER AND SELECT: evaluate each segment, select one or more
   ========================================================================== */

export function EvaluateSelect() {
  const score = [0.34, 0.82, 0.5, 0.9, 0.28];
  const chosen = [1, 3];
  return (
    <Frame height={256} label="Five market segments, each with an attractiveness meter. The two most attractive are selected, and a bracket joins them: one or more segments to enter.">
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
   12. THREE FACTOR PANELS: size and growth, structure, objectives
   ========================================================================== */

export function ThreeFactors() {
  return (
    <Frame height={216} label="Three factors in three panels: segment size and growth, rising bars. Segment structural attractiveness, a segment pressed on from every side. Company objectives and resources, a target and a stack of coins.">
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
      <Coins2 x={712} y={130} n={6} w={36} tone={INK} />

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
   13. OPEN ENCLOSURE: competitors inside, entrants at the gap (400)
   ========================================================================== */

export function CrowdedSegment() {
  const rivals: [number, number][] = [
    [172, 84],
    [228, 84],
    [284, 84],
    [340, 84],
    [200, 140],
    [256, 140],
    [312, 140],
  ];
  return (
    <Frame width={400} height={192} label="A segment drawn as an enclosure packed with seven strong competitors, drawn as solid company buildings. Its wall has an open gap, and three new entrant companies stream in through it.">
      <Key x={380} y={22} anchor="end" fill={SIGNAL} size={9.5}>
        LESS ATTRACTIVE
      </Key>
      <path d="M130 72 V36 H380 V152 H130 V118" fill="none" stroke={INK} strokeWidth={2} />
      {rivals.map(([cx, base]) => (
        <Company1 key={`${cx}-${base}`} cx={cx} base={base} w={32} h={30} tone={INK} fill={INK} />
      ))}
      {[62, 96, 130].map((base) => (
        <g key={base}>
          <Company1 cx={40} base={base} w={22} h={18} tone={SIGNAL} />
          <path d={`M58 ${base - 9} C96 ${base - 9} 104 95 144 95`} fill="none" stroke={SIGNAL} strokeWidth={1.25} strokeDasharray="4 3" />
        </g>
      ))}
      <path d={head2.right(150, 95)} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <Key x={20} y={178} fill={SIGNAL} size={9}>
        NEW ENTRANTS
      </Key>
      <Key x={255} y={178} anchor="middle" fill={INK} size={9}>
        STRONG, AGGRESSIVE COMPETITORS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   14. JIGSAW: skills and resources fit what the segment needs (400)
   ========================================================================== */

export function SkillsFit() {
  return (
    <Frame width={400} height={188} label="Two jigsaw pieces. The company's piece, a company building marked skills and resources, has a tab that fits the socket in the segment's piece: needed to succeed in that segment.">
      <path d="M30 50 H166 V74 C186 74 194 82 194 94 C194 106 186 114 166 114 V138 H30 Z" fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.75} strokeLinejoin="round" />
      <path d="M234 50 H370 V138 H234 V114 C254 114 262 106 262 94 C262 82 254 74 234 74 Z" fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.75} strokeLinejoin="round" />
      <line x1={180} y1={30} x2={222} y2={30} stroke={INK} strokeWidth={1.5} />
      <path d={head2.right(224, 30)} fill="none" stroke={INK} strokeWidth={1.5} />
      <Company1 cx={98} base={118} w={44} h={36} tone={COUNTER} />
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
   15. TARGETING CONTINUUM: mass to micromarketing (800)
   ========================================================================== */

export function TargetingContinuum() {
  const cols = [
    { x: 20, cx: 108, title: "Undifferentiated (mass)", note: "Whole market, one offer", tone: INK, fill: PAPER },
    { x: 212, cx: 300, title: "Differentiated", note: "Separate offers per segment", tone: COUNTER, fill: PAPER },
    { x: 404, cx: 492, title: "Concentrated (niche)", note: "Large share of one niche", tone: SIGNAL, fill: PAPER2 },
    { x: 596, cx: 684, title: "Micromarketing", note: "Local or individual tailoring", tone: SIGNAL, fill: PAPER },
  ];

  return (
    <Frame
      height={292}
      label="Four-stage continuum of market targeting strategies from broad to narrow. 1. Undifferentiated (mass) marketing sends one offer to the whole market. 2. Differentiated marketing sends three separate offers to three distinct segments. 3. Concentrated (niche) marketing sends one specialized offer to a single niche segment while leaving other segments unserved. 4. Micromarketing tailors offers to specific local areas and individual buyers."
    >
      {/* Top continuum bar */}
      <Key x={20} y={22} fill={INK} size={10.5}>
        Broad coverage (whole market)
      </Key>
      <line x1={210} y1={18} x2={586} y2={18} stroke={INK} strokeWidth={1.5} />
      <path d={head2.right(588, 18)} fill="none" stroke={INK} strokeWidth={1.5} />
      <Key x={772} y={22} anchor="end" fill={SIGNAL} size={10.5}>
        Narrow coverage (local or individual)
      </Key>

      {/* Four stage panels */}
      {cols.map((c) => (
        <g key={c.title}>
          <rect
            x={c.x}
            y={36}
            width={176}
            height={238}
            rx={4}
            fill={c.fill}
            stroke={c.tone}
            strokeWidth={c.tone === SIGNAL ? 1.5 : 1.25}
          />
          <Key x={c.cx} y={58} anchor="middle" fill={c.tone} size={10.5}>
            {c.title}
          </Key>
          <line x1={c.x + 12} y1={68} x2={c.x + 164} y2={68} stroke={RULE} strokeWidth={1} />
          <Note x={c.cx} y={258} anchor="middle" fill={c.tone === SIGNAL ? SIGNAL : INK3} size={11}>
            {c.note}
          </Note>
        </g>
      ))}

      {/* Stage 1: Undifferentiated (1 offer -> whole market box) */}
      <Pack1 x={108} y={110} w={30} h={28} tone={INK} />
      <line x1={108} y1={110} x2={108} y2={132} stroke={INK} strokeWidth={1.3} />
      <path d={head2.down(108, 134)} fill="none" stroke={INK} strokeWidth={1.3} />
      <rect x={38} y={138} width={140} height={94} rx={4} fill={PAPER2} stroke={INK} strokeWidth={1.25} />
      {[58, 92, 124, 158].map((bx, i) => (
        <g key={bx}>
          <Buyer kind={i} x={bx} y={178} k={0.58} tone={INK3} />
          <Buyer kind={(i + 1) % 4} x={bx} y={218} k={0.58} tone={INK3} />
        </g>
      ))}

      {/* Stage 2: Differentiated (3 separate offers -> 3 segments) */}
      {[0, 1, 2].map((g) => {
        const sx = 248 + g * 52;
        const tone = KIND_TONE[g];
        return (
          <g key={g}>
            <Pack1 x={sx} y={110} w={26} h={26} tone={tone} kind={g} markFill={KIND_FILL[g]} />
            <line x1={sx} y1={110} x2={sx} y2={132} stroke={tone} strokeWidth={1.25} />
            <path d={head2.down(sx, 134)} fill="none" stroke={tone} strokeWidth={1.25} />
            <rect x={sx - 21} y={138} width={42} height={94} rx={3} fill={PAPER} stroke={tone} strokeWidth={1.25} />
            <Buyer kind={g} x={sx} y={178} k={0.58} />
            <Buyer kind={g} x={sx} y={218} k={0.58} />
          </g>
        );
      })}

      {/* Stage 3: Concentrated (1 niche offer -> 1 lit niche, 2 unserved segments) */}
      {[0, 1].map((g) => {
        const sx = 440 + g * 52;
        return (
          <g key={g}>
            <rect
              x={sx - 21}
              y={138}
              width={42}
              height={94}
              rx={3}
              fill={PAPER}
              stroke={RULE2}
              strokeWidth={1}
              strokeDasharray="3 3"
            />
            <Buyer kind={g} x={sx} y={178} k={0.58} tone={RULE2} />
            <Buyer kind={g} x={sx} y={218} k={0.58} tone={RULE2} />
          </g>
        );
      })}
      <Pack1 x={544} y={110} w={28} h={26} tone={SIGNAL} fill={SIGNAL_TINT} kind={3} />
      <line x1={544} y1={110} x2={544} y2={132} stroke={SIGNAL} strokeWidth={1.5} />
      <path d={head2.down(544, 134)} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <rect x={523} y={138} width={42} height={94} rx={3} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
      <Buyer kind={3} x={544} y={178} k={0.58} tone={SIGNAL} />
      <Buyer kind={3} x={544} y={218} k={0.58} tone={SIGNAL} />

      {/* Stage 4: Micromarketing (local pin + individual offers -> individual rings) */}
      {/* Local pin */}
      <path
        d="M642 112 C635 103 633 99 633 95 A9 9 0 0 1 651 95 C651 99 649 103 642 112 Z"
        fill={SIGNAL}
      />
      <circle cx={642} cy={95} r={3.2} fill={PAPER} />
      <line x1={642} y1={114} x2={642} y2={132} stroke={SIGNAL} strokeWidth={1.25} />
      <path d={head2.down(642, 134)} fill="none" stroke={SIGNAL} strokeWidth={1.25} />
      <rect x={616} y={138} width={52} height={94} rx={3} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.25} />
      <Buyer kind={0} x={642} y={178} k={0.58} tone={SIGNAL} />
      <Buyer kind={2} x={642} y={218} k={0.58} tone={SIGNAL} />

      {/* Individual tailored offers */}
      {[700, 738].map((ix, idx) => (
        <g key={ix}>
          <Pack1 x={ix} y={110} w={22} h={22} tone={SIGNAL} fill={SIGNAL_TINT} kind={idx + 1} />
          <line x1={ix} y1={110} x2={ix} y2={148} stroke={SIGNAL} strokeWidth={1.2} strokeDasharray="2 2" />
          <circle cx={ix} cy={169} r={16} fill={PAPER} stroke={SIGNAL} strokeWidth={1.3} />
          <Buyer kind={idx + 1} x={ix} y={179} k={0.56} tone={SIGNAL} />
          <circle cx={ix} cy={210} r={16} fill={PAPER} stroke={SIGNAL} strokeWidth={1.3} />
          <Buyer kind={(idx + 2) % 4} x={ix} y={220} k={0.56} tone={SIGNAL} />
        </g>
      ))}
    </Frame>
  );
}

/* ==========================================================================
   15b. FOUR TARGETING PANELS: the same market, targeted four ways (360)
   ========================================================================== */

/* Buyers' feet, relative to their cluster's centre: two rows of three. */
const OFFSETS: [number, number][] = [
  [-26, -2],
  [0, -4],
  [26, -2],
  [-26, 24],
  [0, 22],
  [26, 24],
];
const NICHE: [number, number][] = [
  [-13, 0],
  [13, 0],
  [-13, 24],
  [13, 24],
];
const CLUSTERS = [
  { kind: 0, cx: 90, cy: 68 },
  { kind: 1, cx: 262, cy: 68 },
  { kind: 2, cx: 164, cy: 148 },
];
const NICHE_C = { kind: 3, cx: 290, cy: 160 };
/** Buyer scale on the four targeting panels. */
const BK = 0.6;

/** Every buyer in the shared market, as {kind, x, y (feet)}. */
function marketBuyers() {
  const out: { kind: number; x: number; y: number; niche: boolean }[] = [];
  CLUSTERS.forEach((c) => OFFSETS.forEach(([dx, dy]) => out.push({ kind: c.kind, x: c.cx + dx, y: c.cy + dy, niche: false })));
  NICHE.forEach(([dx, dy]) => out.push({ kind: NICHE_C.kind, x: NICHE_C.cx + dx, y: NICHE_C.cy + dy, niche: true }));
  return out;
}

/** Centre of a group's glyphs (buyers stand on their feet, so it sits above cy). */
const mid = (c: { cx: number; cy: number }) => ({ x: c.cx, y: c.cy + 1 });

function MarketField() {
  return <rect x={16} y={16} width={328} height={200} fill="none" stroke={INK3} strokeWidth={1.25} />;
}

export function TargetUndifferentiated() {
  const needs = [
    [120, 86],
    [230, 86],
    [175, 146],
  ];
  return (
    <Frame width={360} height={232} label="The whole market of buyers, all drawn alike in grey. Three overlapping need circles, one around each group, and the area they share is lit: what is common in the needs of consumers.">
      <MarketField />
      {needs.map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r={58} fill={SIGNAL_TINT} stroke={INK3} strokeWidth={1} strokeDasharray="4 3" />
      ))}
      {marketBuyers().map((b, i) => (
        <Buyer key={i} kind={b.kind} x={b.x} y={b.y} k={BK} tone={INK3} />
      ))}
      <circle cx={175} cy={108} r={11} fill={SIGNAL} />
    </Frame>
  );
}

export function TargetDifferentiated() {
  const R = 44;
  const packs = [
    { x: 40, y: 150, c: CLUSTERS[0] },
    { x: 176, y: 62, c: CLUSTERS[1] },
    { x: 80, y: 206, c: CLUSTERS[2] },
  ];
  return (
    <Frame width={360} height={232} label="The same market. Each of three segments is ringed in its own colour, and each has its own separate offer beside it, carrying its mark.">
      <MarketField />
      {CLUSTERS.map((c) => (
        <circle key={c.kind} cx={mid(c).x} cy={mid(c).y} r={R} fill={PAPER} stroke={KIND_TONE[c.kind]} strokeWidth={1.75} />
      ))}
      {marketBuyers().map((b, i) => (
        <Buyer key={i} kind={b.kind} x={b.x} y={b.y} k={BK} tone={b.niche ? RULE2 : undefined} />
      ))}
      {packs.map((p) => {
        const m = mid(p.c);
        const top = { x: p.x, y: p.y - 28 };
        const dx = top.x - m.x;
        const dy = top.y - m.y;
        const d = Math.hypot(dx, dy);
        return (
          <g key={p.x}>
            <line x1={top.x} y1={top.y} x2={r2(m.x + (dx / d) * R)} y2={r2(m.y + (dy / d) * R)} stroke={KIND_TONE[p.c.kind]} strokeWidth={1} />
            <Pack1 x={p.x} y={p.y} w={30} h={28} tone={KIND_TONE[p.c.kind]} kind={p.c.kind} markFill={KIND_FILL[p.c.kind]} />
          </g>
        );
      })}
    </Frame>
  );
}

export function TargetConcentrated() {
  const m = mid(NICHE_C);
  return (
    <Frame width={360} height={232} label="The same market, faded, except one small niche. It is ringed and lit, and has its own offer: a large share of one smaller segment.">
      <MarketField />
      {marketBuyers().map((b, i) =>
        b.niche ? null : <Buyer key={i} kind={b.kind} x={b.x} y={b.y} k={BK} tone={RULE2} />,
      )}
      <circle cx={m.x} cy={m.y} r={35} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={2} />
      {NICHE.map(([dx, dy], i) => (
        <Buyer key={i} kind={3} x={NICHE_C.cx + dx} y={NICHE_C.cy + dy} k={BK} tone={SIGNAL} />
      ))}
      <line x1={241} y1={m.y + 6} x2={256} y2={m.y + 6} stroke={SIGNAL} strokeWidth={1} />
      <Pack1 x={226} y={m.y + 20} w={30} h={28} tone={SIGNAL} fill={PAPER} kind={3} />
    </Frame>
  );
}

export function TargetMicro() {
  const m = mid(NICHE_C);
  return (
    <Frame width={360} height={232} label="The same market, but every single buyer has a small ring of their own, and a map pin marks one local customer segment.">
      <MarketField />
      {marketBuyers().map((b, i) => (
        <g key={i}>
          <circle cx={b.x} cy={r2(b.y - 10.5)} r={12.5} fill={PAPER} stroke={SIGNAL} strokeWidth={1.25} />
          <Buyer kind={b.kind} x={b.x} y={b.y} k={BK} />
        </g>
      ))}
      <path d={`M${m.x} ${m.y - 30} C${m.x - 8} ${m.y - 40} ${m.x - 11} ${m.y - 45} ${m.x - 11} ${m.y - 50} A11 11 0 0 1 ${m.x + 11} ${m.y - 50} C${m.x + 11} ${m.y - 45} ${m.x + 8} ${m.y - 40} ${m.x} ${m.y - 30} Z`} fill={SIGNAL} />
      <circle cx={m.x} cy={m.y - 50} r={3.8} fill={PAPER} />
    </Frame>
  );
}

/* ==========================================================================
   16. PROTEIN POWDER FORK: differentiated or concentrated?
   ========================================================================== */

export function ProteinFork() {
  return (
    <Frame height={276} label="A tub of premium, organic, plant-based protein powder with two routes. Up: differentiated marketing, three segments of buyers each with its own tub. Down: concentrated marketing, one niche of buyers with one tub, the other segments left empty.">
      <Key x={110} y={56} anchor="middle" fill={INK} size={9.5}>
        PREMIUM | ORGANIC
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
              [-28, 78],
              [-6, 78],
              [-28, 106],
              [-6, 106],
            ].map(([dx, y]) => (
              <Buyer key={`${dx}-${y}`} kind={g} x={x + dx} y={y} k={0.65} />
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
        [322, 212],
        [348, 212],
        [374, 212],
        [322, 248],
        [348, 248],
        [374, 248],
      ].map(([x, y]) => (
        <Buyer key={`${x}-${y}`} kind={3} x={x} y={y} k={0.8} tone={SIGNAL} />
      ))}
      <Tub x={436} y={250} s={1.3} tone={SIGNAL} />
      {[520, 600, 680].map((x) => (
        <rect key={x} x={x} y={190} width={60} height={56} rx={4} fill="none" stroke={RULE2} strokeWidth={1} strokeDasharray="4 4" />
      ))}
    </Frame>
  );
}

/* ==========================================================================
   17. PRODUCT AND MIND: differentiation, then positioning
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
   18. PERCEPTUAL MAP: perceived positioning and relative share
   ========================================================================== */

export function PerceptualMap() {
  const rivals: { id: string; x: number; y: number; r: number }[] = [
    { id: "A", x: 112, y: 252, r: 26 },
    { id: "B", x: 170, y: 274, r: 19 },
    { id: "C", x: 136, y: 306, r: 14 },
    { id: "D", x: 134, y: 106, r: 22 },
    { id: "E", x: 382, y: 270, r: 20 },
  ];
  const bx = 386;
  const by = 104;
  return (
    <Frame
      width={520}
      height={376}
      label="Two-dimensional perceptual positioning map for sport-utility vehicles. The horizontal axis plots Price from Economy on the left to Luxury on the right. The vertical axis plots Orientation from Fuel efficiency at the bottom to Rugged off-road performance at the top. Competing SUV brands A, B, and C cluster in a crowded zone in the lower-left quadrant, where circle size shows relative market share. In the upper-right quadrant sits an unserved market gap where the target brand position is plotted."
    >
      {/* Horizontal axis: Price (Economy to Luxury) */}
      <line x1={36} y1={190} x2={484} y2={190} stroke={INK} strokeWidth={1.5} />
      <path d={head2.right(486, 190)} fill="none" stroke={INK} strokeWidth={1.5} />
      <path d={head2.left(34, 190)} fill="none" stroke={INK} strokeWidth={1.5} />
      <Key x={40} y={178} anchor="start" fill={INK} size={10}>
        Price: Economy
      </Key>
      <Key x={480} y={178} anchor="end" fill={INK} size={10}>
        Price: Luxury
      </Key>

      {/* Vertical axis: Orientation (Fuel efficiency to Rugged off-road performance) */}
      <line x1={260} y1={42} x2={260} y2={338} stroke={INK} strokeWidth={1.5} />
      <path d={head2.up(260, 40)} fill="none" stroke={INK} strokeWidth={1.5} />
      <path d={head2.down(260, 340)} fill="none" stroke={INK} strokeWidth={1.5} />
      <Key x={260} y={24} anchor="middle" fill={INK} size={10.5}>
        Orientation: Rugged off-road performance
      </Key>
      <Key x={260} y={362} anchor="middle" fill={INK} size={10.5}>
        Orientation: Fuel efficiency
      </Key>

      {/* Crowded zone enclosure in lower-left quadrant */}
      <rect
        x={70}
        y={214}
        width={134}
        height={118}
        rx={12}
        fill={PAPER2}
        stroke={INK3}
        strokeWidth={1.2}
        strokeDasharray="4 3"
      />
      <Note x={137} y={348} anchor="middle" fill={INK3} size={11}>
        Crowded zone
      </Note>

      {/* Competing SUV brand circles (radius = relative market share) */}
      {rivals.map((rv) => (
        <g key={rv.id}>
          <circle cx={rv.x} cy={rv.y} r={rv.r} fill="var(--paper-3)" stroke={INK} strokeWidth={1.4} />
          <Key x={rv.x} y={rv.y + 4} anchor="middle" fill={INK} size={9.5}>
            {rv.id}
          </Key>
        </g>
      ))}

      {/* Note for circle size = market share */}
      <Note x={134} y={68} anchor="middle" fill={INK3} size={11}>
        Size = market share
      </Note>

      {/* Unserved market gap & target brand position in upper-right quadrant */}
      <circle
        cx={bx}
        cy={by}
        r={44}
        fill={SIGNAL_TINT}
        stroke={SIGNAL}
        strokeWidth={1.25}
        strokeDasharray="5 4"
      />
      <line x1={bx} y1={by + 46} x2={bx} y2={187} stroke={SIGNAL} strokeWidth={1.1} strokeDasharray="3 3" />
      <line x1={bx - 46} y1={by} x2={263} y2={by} stroke={SIGNAL} strokeWidth={1.1} strokeDasharray="3 3" />
      <circle cx={bx} cy={by} r={24} fill={SIGNAL} />
      <Key x={bx} y={by + 4} anchor="middle" fill={PAPER} size={9.5}>
        Brand
      </Key>
      <Key x={bx} y={50} anchor="middle" fill={SIGNAL} size={10}>
        Unserved market gap
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   19. SIEVE: seven screens a difference must pass to be promoted
   ========================================================================== */

export function DifferenceSieve() {
  const screens = ["IMPORTANT", "DISTINCTIVE", "SUPERIOR", "COMMUNICABLE", "PREEMPTIVE", "AFFORDABLE", "PROFITABLE"];
  const counts = [14, 11, 9, 7, 5, 3, 2, 1];
  const cx = 463;
  const bandY = (k: number) => 44 + k * 36;
  const screenY = (i: number) => 62 + i * 36;
  return (
    <Frame height={316} label="A sieve with seven screens: important, distinctive, superior, communicable, preemptive, affordable, profitable. Fourteen possible differences enter at the top. Fewer pass each screen, and the one that passes all seven is promoted.">
      <Key x={cx} y={22} anchor="middle" fill={INK} size={9.5}>
        DIFFERENCES
      </Key>

      {screens.map((s, i) => (
        <g key={s}>
          <line x1={209} y1={screenY(i)} x2={717} y2={screenY(i)} stroke={INK} strokeWidth={1.5} strokeDasharray="14 6" />
          <Key x={193} y={screenY(i) + 4} anchor="end" fill={INK} size={9.5}>
            {s}
          </Key>
        </g>
      ))}

      {counts.map((n, k) => {
        const last = k === counts.length - 1;
        return (
          <g key={k}>
            {Array.from({ length: n }, (_, j) => (
              <circle key={j} cx={cx + (j - (n - 1) / 2) * 28} cy={bandY(k)} r={last ? 8 : 5} fill={last ? SIGNAL : INK} />
            ))}
          </g>
        );
      })}
      <line x1={cx + 18} y1={bandY(7)} x2={cx + 56} y2={bandY(7)} stroke={SIGNAL} strokeWidth={1.5} />
      <path d={head2.right(cx + 58, bandY(7))} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <Key x={cx + 68} y={bandY(7) + 4} fill={SIGNAL} size={10.5}>
        PROMOTE
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   20. VALUE GRID: the five value propositions
   ========================================================================== */

export function ValueGrid() {
  const levels = ["More", "The same", "Less"];
  const cells: Record<string, { name: string; sub: string }> = {
    "0-0": { name: "More for More", sub: "Luxury benefits, high price" },
    "0-1": { name: "More for the Same", sub: "Luxury quality, lower price" },
    "0-2": { name: "More for Less", sub: "Hard to sustain long-run" },
    "1-2": { name: "The Same for Less", sub: "Standard brands, deep discount" },
    "2-2": { name: "Less for Much Less", sub: "Fewer frills, rock-bottom price" },
  };
  const x0 = 156;
  const y0 = 68;
  const cw = 204;
  const ch = 88;
  return (
    <Frame
      height={348}
      label="Three-by-three value proposition grid comparing Benefits offered (More, The same, Less) against Price charged (More, The same, Less). Five winning value proposition cells are highlighted: More for More, More for the Same, More for Less, The Same for Less, and Less for Much Less."
    >
      <Key x={x0 + (cw * 3) / 2} y={24} anchor="middle" fill={INK} size={11}>
        Price charged
      </Key>
      <Key x={28} y={y0 + (ch * 3) / 2 - 4} fill={INK} size={11}>
        Benefits
      </Key>
      <Key x={28} y={y0 + (ch * 3) / 2 + 12} fill={INK} size={11}>
        offered
      </Key>
      {levels.map((l, i) => (
        <g key={l}>
          <Key x={x0 + cw * i + cw / 2} y={52} anchor="middle" fill={INK3} size={10.5}>
            {l}
          </Key>
          <Key x={x0 - 14} y={y0 + ch * i + ch / 2 + 4} anchor="end" fill={INK3} size={10.5}>
            {l}
          </Key>
        </g>
      ))}
      {[0, 1, 2].map((r) =>
        [0, 1, 2].map((c) => {
          const cell = cells[`${r}-${c}`];
          const isMiddle = r === 1 && c === 1;
          const x = x0 + c * cw;
          const y = y0 + r * ch;
          return (
            <g key={`${r}-${c}`}>
              <rect
                x={x + 4}
                y={y + 4}
                width={cw - 8}
                height={ch - 8}
                rx={4}
                fill={cell ? SIGNAL_TINT : PAPER2}
                stroke={cell ? SIGNAL : RULE2}
                strokeWidth={cell ? 1.5 : 1}
              />
              {cell ? (
                <>
                  <Display x={x + cw / 2} y={y + 40} anchor="middle" fill={SIGNAL} size={16.5}>
                    {cell.name}
                  </Display>
                  <Note x={x + cw / 2} y={y + 62} anchor="middle" fill={INK2} size={11}>
                    {cell.sub}
                  </Note>
                </>
              ) : (
                <Note x={x + cw / 2} y={y + ch / 2 + 4} anchor="middle" fill={INK3} size={11}>
                  {isMiddle ? "Average parity" : "Losing proposition"}
                </Note>
              )}
            </g>
          );
        }),
      )}
    </Frame>
  );
}

/* ==========================================================================
   21. COLONNADE: the 4 Ps hold up the positioning strategy (400)
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
   22. SLOW CURVE THAT HOLDS: establishing takes long, maintaining is steady
   ========================================================================== */

export function EstablishMaintain() {
  const pulses = [524, 568, 612, 656, 700, 744];
  return (
    <Frame height={244} label="A curve over time. Establishing or changing a position rises slowly over a long stretch. Then a level line holds, kept up by regular marks of consistent performance and communication: maintaining it.">
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
      {pulses.map((x) => (
        <circle key={x} cx={x} cy={64} r={5.5} fill={SIGNAL} />
      ))}
      <Note x={634} y={42} anchor="middle" size={12.5} italic fill={SIGNAL}>
        consistent performance and communication
      </Note>

      <Note x={270} y={116} anchor="middle" size={12.5} italic>
        usually takes a long time
      </Note>
      <path d="M64 204 V212 H486 V204" fill="none" stroke={INK} strokeWidth={1.25} />
      <Key x={275} y={234} anchor="middle" fill={INK} size={9.5}>
        ESTABLISHING OR CHANGING A POSITION
      </Key>
      <path d="M494 204 V212 H760 V204" fill="none" stroke={SIGNAL} strokeWidth={1.25} />
      <Key x={627} y={234} anchor="middle" fill={SIGNAL} size={9.5}>
        MAINTAINING IT
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   23. AI CONSIDERATION SHORTLIST: prompt -> structured sources -> 3-brand list
   ========================================================================== */

export function AiConsiderationShortlist() {
  const sources = [
    { y: 46, title: "Product specifications", sub: "Concrete cushioning spec" },
    { y: 112, title: "Independent reviews", sub: "800 km durability test" },
    { y: 178, title: "Comparison articles", sub: "Marathon road ranking" },
  ];

  return (
    <Frame
      height={298}
      label="Conversational AI assistant translating a consumer's need-based prompt into a three-brand shortlist. Left: a consumer asks which running shoes are best for marathon training on concrete. Center: the AI assistant synthesizes structured product specifications, independent reviews, and comparison articles. Right: the AI-generated shortlist recommends three verified brands (A, B, and C) as the consumer's consideration set, while Brand D, relying only on television ads without public spec data, is absent from the shortlist."
    >
      {/* Column headings */}
      <Key x={116} y={22} anchor="middle" fill={INK} size={10.5}>
        1. Need-based prompt
      </Key>
      <Key x={378} y={22} anchor="middle" fill={INK} size={10.5}>
        2. Public sources synthesized
      </Key>
      <Key x={664} y={22} anchor="middle" fill={SIGNAL} size={10.5}>
        3. AI-generated shortlist
      </Key>

      {/* 1. Consumer and prompt bubble */}
      <rect x={20} y={42} width={192} height={96} rx={6} fill={PAPER2} stroke={INK} strokeWidth={1.3} />
      <path d="M58 138 L50 152 L72 138" fill={PAPER2} stroke={INK} strokeWidth={1.3} strokeLinejoin="round" />
      <line x1={59} y1={138} x2={71} y2={138} stroke={PAPER2} strokeWidth={2} />
      <Key x={34} y={62} fill={INK3} size={9.5}>
        Consumer query
      </Key>
      <Note x={34} y={84} fill={INK} size={11.5}>
        &quot;Best running shoes for
      </Note>
      <Note x={34} y={102} fill={INK} size={11.5}>
        marathon training
      </Note>
      <Note x={34} y={120} fill={SIGNAL} size={11.5}>
        on concrete?&quot;
      </Note>

      <Person3 x={56} y={214} k={1.45} stroke={INK} />

      {/* Prompt arrow into synthesis */}
      <line x1={212} y1={90} x2={244} y2={90} stroke={INK} strokeWidth={1.4} />
      <path d={head2.right(246, 90)} fill="none" stroke={INK} strokeWidth={1.4} />

      {/* 2. Three structured public sources */}
      {sources.map((s) => (
        <g key={s.title}>
          <rect x={250} y={s.y} width={166} height={52} rx={4} fill={PAPER} stroke={INK} strokeWidth={1.25} />
          <Key x={262} y={s.y + 21} fill={INK} size={10}>
            {s.title}
          </Key>
          <Note x={262} y={s.y + 39} fill={INK3} size={10.5}>
            {s.sub}
          </Note>
        </g>
      ))}

      {/* Converging connectors to AI assistant chip */}
      <path d="M416 72 H433 V138 H448" fill="none" stroke={INK} strokeWidth={1.25} />
      <line x1={416} y1={138} x2={448} y2={138} stroke={INK} strokeWidth={1.25} />
      <path d="M416 204 H433 V138" fill="none" stroke={INK} strokeWidth={1.25} />
      <path d={head2.right(450, 138)} fill="none" stroke={INK} strokeWidth={1.25} />

      <Chip2 x={485} y={138} s={42} tone={SIGNAL} fill={SIGNAL_TINT} />
      <Key x={485} y={186} anchor="middle" fill={SIGNAL} size={9.5}>
        AI assistant
      </Key>

      {/* Arrow from AI assistant to shortlist */}
      <line x1={518} y1={138} x2={542} y2={138} stroke={SIGNAL} strokeWidth={1.5} />
      <path d={head2.right(544, 138)} fill="none" stroke={SIGNAL} strokeWidth={1.5} />

      {/* 3. Three-brand shortlist (Consideration set) */}
      <rect x={548} y={38} width={232} height={192} rx={6} fill={PAPER2} stroke={SIGNAL} strokeWidth={1.5} />
      <Key x={664} y={58} anchor="middle" fill={SIGNAL} size={10}>
        Consideration set (3 brands)
      </Key>

      <rect x={562} y={68} width={204} height={46} rx={4} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.4} />
      <Key x={574} y={87} fill={SIGNAL} size={10}>
        1. Brand A (Concrete Road)
      </Key>
      <Note x={574} y={104} fill={INK2} size={10.5}>
        Verified cushioning + 800 km spec
      </Note>

      <rect x={562} y={122} width={204} height={46} rx={4} fill={PAPER} stroke={INK} strokeWidth={1.2} />
      <Key x={574} y={141} fill={INK} size={10}>
        2. Brand B (Marathon Pro)
      </Key>
      <Note x={574} y={158} fill={INK3} size={10.5}>
        Verified concrete impact rating
      </Note>

      <rect x={562} y={176} width={204} height={44} rx={4} fill={PAPER} stroke={INK} strokeWidth={1.2} />
      <Key x={574} y={194} fill={INK} size={10}>
        3. Brand C (Distance Plus)
      </Key>
      <Note x={574} y={210} fill={INK3} size={10.5}>
        Verified long-run stability review
      </Note>

      {/* Bottom row: Unverified TV-ad-only brand omitted */}
      <rect
        x={250}
        y={242}
        width={166}
        height={44}
        rx={4}
        fill={PAPER}
        stroke={RULE2}
        strokeWidth={1.2}
        strokeDasharray="4 3"
      />
      <Key x={262} y={260} fill={INK3} size={9.5}>
        TV commercial only
      </Key>
      <Note x={262} y={276} fill={INK3} size={10.5}>
        Vague slogan, no spec facts
      </Note>

      <line x1={416} y1={264} x2={542} y2={264} stroke={RULE2} strokeWidth={1.2} strokeDasharray="3 3" />

      <rect
        x={548}
        y={242}
        width={232}
        height={44}
        rx={4}
        fill={PAPER}
        stroke={RULE2}
        strokeWidth={1.2}
        strokeDasharray="4 3"
      />
      <Key x={664} y={260} anchor="middle" fill={INK3} size={9.5}>
        Brand D: absent from shortlist
      </Key>
      <Note x={664} y={276} anchor="middle" fill={INK3} size={10.5}>
        Fails to enter consideration set
      </Note>
    </Frame>
  );
}

/* ==========================================================================
   23b. TWO PHONES, ONE MIND: value proposition and differentiation
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
   Conclusion glyphs: each echoes a plate already seen
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
