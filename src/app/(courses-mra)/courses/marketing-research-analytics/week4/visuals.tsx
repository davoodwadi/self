/* ==========================================================================
   Week 04 plates: Measurement and Questionnaire Design.
   Built on ../_visuals/kit and ../_visuals/objects. Every plate follows the
   sentence it illustrates on the slide.
   ========================================================================== */

import React, { useState } from "react";
import { Shuffle } from "lucide-react";
import { ShoppingBag, Tag } from "@phosphor-icons/react";
import {
  Frame,
  Key,
  Display,
  Note,
  INK,
  INK2,
  INK3,
  RULE,
  RULE2,
  SIGNAL,
  COUNTER,
  PAPER,
  PAPER3,
  SIGNAL_TINT,
  COUNTER_TINT,
  head,
  r2,
  PlateButton,
  Segmented,
  Slider,
  Toggles,
  seeded,
} from "../_visuals/kit";
import { Person1, Cup1 } from "../_visuals/objects";

/* --------------------------------------------------------------------------
   Measurement and Scaling
   -------------------------------------------------------------------------- */

/**
 * Measurement and Scaling: three coffee brands located on a continuum from
 * 1 to 7 of perceived quality, each at the average rating consumers gave it.
 * The brands are the objects; perceived quality is the characteristic; the
 * scale is the continuum on which they sit.
 */
export function BrandsOnScale() {
  const x0 = 40;
  const x1 = 360;
  const X = (v: number) => r2(x0 + ((v - 1) / 6) * (x1 - x0));
  const axisY = 162;
  const brands = [
    { mark: "A", v: 2.6 },
    { mark: "B", v: 4.5 },
    { mark: "C", v: 6.2 },
  ];
  return (
    <Frame
      width={400}
      height={198}
      label="Three coffee brands, A, B and C, located on a scale of perceived quality from 1 to 7, at average ratings of 2.6, 4.5 and 6.2"
    >
      <Key x={x0} y={20} fill={INK3}>PERCEIVED QUALITY</Key>
      {/* the continuum */}
      <line x1={x0 - 14} y1={axisY} x2={x1 + 22} y2={axisY} stroke={INK} strokeWidth={1.5} />
      <path d={head.right(x1 + 22, axisY, 7)} fill="none" stroke={INK} strokeWidth={1.5} />
      {[1, 2, 3, 4, 5, 6, 7].map((v) => (
        <g key={v}>
          <line x1={X(v)} y1={axisY - 5} x2={X(v)} y2={axisY + 5} stroke={INK} strokeWidth={1.25} />
          <Key x={X(v)} y={axisY + 24} anchor="middle" fill={INK2} size={12}>
            {v}
          </Key>
        </g>
      ))}
      {/* the objects, located on it */}
      {brands.map((b) => {
        const x = X(b.v);
        return (
          <g key={b.mark}>
            <Cup1 x={x} y={100} k={2.2} />
            <text x={x} y={94} textAnchor="middle" fontFamily="var(--font-heading)" fontSize={17} fontWeight={600} fill={INK}>
              {b.mark}
            </text>
            <line x1={x} y1={134} x2={x} y2={axisY - 9} stroke={INK3} strokeWidth={1} strokeDasharray="3 3" />
            <circle cx={x} cy={axisY} r={5} fill={SIGNAL} />
            <Key x={x} y={124} anchor="middle" fill={SIGNAL} size={11} weight={700}>
              {b.v.toFixed(1)}
            </Key>
          </g>
        );
      })}
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Constructs and Operational Definitions
   -------------------------------------------------------------------------- */

/**
 * A row of rating boxes from 1 to n, the chosen one filled; the item's
 * wording above it is drawn as a hairline bar, since the procedure, not the
 * words, is the point. Shared by the rating plates of this week.
 */
function RatingRow({
  x,
  y,
  n = 7,
  pick,
  box = 24,
  gap = 4,
  tone = INK,
  stem,
  numbers = true,
}: {
  x: number;
  y: number;
  n?: number;
  /** 1-based chosen category, or none. */
  pick?: number;
  box?: number;
  gap?: number;
  tone?: string;
  /** Length of the hairline bar standing for the item's wording. */
  stem?: number;
  numbers?: boolean;
}) {
  return (
    <g>
      {stem ? (
        <line x1={x + 2} y1={y - 12} x2={x + stem} y2={y - 12} stroke={RULE2} strokeWidth={4} strokeLinecap="round" />
      ) : null}
      {Array.from({ length: n }, (_, i) => {
        const bx = x + i * (box + gap);
        const on = pick === i + 1;
        return (
          <g key={i}>
            <rect x={bx} y={y} width={box} height={box} fill={on ? tone : PAPER} stroke={on ? tone : INK3} strokeWidth={1.25} />
            {numbers ? (
              <Key x={r2(bx + box / 2)} y={r2(y + box / 2 + 4)} anchor="middle" fill={on ? PAPER : INK3} size={10.5} weight={on ? 700 : 500}>
                {i + 1}
              </Key>
            ) : null}
          </g>
        );
      })}
    </g>
  );
}

/**
 * Constructs and Operational Definitions: the example's procedure. Three
 * ratings of satisfaction, each from 1 to 7, and their average: the
 * satisfaction score that stands for the construct.
 */
export function OperationalDefinition() {
  const picks = [6, 5, 7];
  const rows = [46, 110, 174];
  const x = 20;
  const right = x + 7 * 28 - 4;
  return (
    <Frame
      width={400}
      height={214}
      label="Three ratings of satisfaction with a product, each on a scale from 1 to 7, answered 6, 5 and 7, and averaged into a satisfaction score of 6.0"
    >
      {rows.map((y, i) => (
        <RatingRow key={y} x={x} y={y} pick={picks[i]} stem={[150, 124, 164][i]} tone={INK} />
      ))}
      {/* the three ratings gathered into one score */}
      <path
        d={`M${right + 14} ${rows[0] + 12}H${right + 26}V${rows[2] + 12}H${right + 14}M${right + 26} ${rows[1] + 12}H${right + 40}`}
        fill="none"
        stroke={INK3}
        strokeWidth={1.25}
      />
      <path d={head.right(right + 44, rows[1] + 12, 7)} fill="none" stroke={INK3} strokeWidth={1.25} />
      <Key x={right + 56} y={rows[1] - 18} fill={INK3} size={10}>AVERAGE</Key>
      <Display x={right + 54} y={rows[1] + 24} fill={SIGNAL} size={40}>6.0</Display>
      <Key x={right + 56} y={rows[1] + 46} fill={SIGNAL} size={10}>SATISFACTION</Key>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Nominal and Ordinal Scales
   -------------------------------------------------------------------------- */

/**
 * Nominal and Ordinal Scales: one consumer's ranking of three coffee brands
 * (top row, equal steps: first, second, third) against the strength of that
 * consumer's preference (bottom continuum). The first brand is far ahead;
 * the second and third are close. The ranks keep the order and lose the gaps.
 */
export function RanksHideGaps() {
  const top = [
    { mark: "A", rank: "1ST", x: 170, at: 150 },
    { mark: "B", rank: "2ND", x: 400, at: 560 },
    { mark: "C", rank: "3RD", x: 630, at: 650 },
  ];
  const axisY = 148;
  return (
    <Frame
      width={800}
      height={214}
      label="A consumer ranks three coffee brands A, B and C first, second and third, in equal steps. On the continuum of preference beneath, A is far ahead, while B and C are close together: the ranks show the order but not how much more A is preferred"
    >
      <Key x={20} y={22} fill={INK3}>RANK</Key>
      <Key x={20} y={axisY - 14} fill={INK3}>PREFERENCE</Key>
      {/* the continuum: more preferred to the left */}
      <line x1={30} y1={axisY} x2={770} y2={axisY} stroke={INK} strokeWidth={1.5} />
      <path d={head.left(30, axisY, 7)} fill="none" stroke={INK} strokeWidth={1.5} />
      <Key x={36} y={axisY + 22} fill={INK3} size={10}>MORE</Key>
      <Key x={770} y={axisY + 22} anchor="end" fill={INK3} size={10}>LESS</Key>

      {top.map((b) => (
        <g key={b.mark}>
          <Cup1 x={b.x} y={66} k={2.3} />
          <text x={b.x} y={60} textAnchor="middle" fontFamily="var(--font-heading)" fontSize={16} fontWeight={600} fill={INK}>
            {b.mark}
          </text>
          <Key x={b.x} y={90} anchor="middle" fill={INK} size={13} weight={700}>
            {b.rank}
          </Key>
          <line x1={b.x} y1={100} x2={b.at} y2={axisY - 8} stroke={INK3} strokeWidth={1} strokeDasharray="3 3" />
          <circle cx={b.at} cy={axisY} r={5.5} fill={INK} />
          <text x={b.at} y={axisY + 24} textAnchor="middle" fontFamily="var(--font-heading)" fontSize={15} fontWeight={600} fill={INK}>
            {b.mark}
          </text>
        </g>
      ))}
      {/* the gaps the ranks do not show */}
      <path d={`M${top[0].at} 186V194H${top[1].at}V186`} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <Key x={r2((top[0].at + top[1].at) / 2)} y={210} anchor="middle" fill={SIGNAL} size={10.5}>HOW MUCH MORE</Key>
      <path d={`M${top[1].at} 186V194H${top[2].at}V186`} fill="none" stroke={INK3} strokeWidth={1.25} />
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Interval and Ratio Scales
   -------------------------------------------------------------------------- */

const Z_MIN = -45;
const Z_MAX = 5;

/**
 * Interval and Ratio Scales: a 10-degree day and a 20-degree day, measured as
 * bars from the scale's zero, above a customer who spends 100 dollars and one
 * who spends 200, measured from no spending at all.
 *
 * Interactive: drag the zero of the temperature scale along its axis. The
 * difference between the two days stays 10 degrees wherever the zero sits,
 * but "twice as warm" holds only at 0 °C: at the zero of the Fahrenheit
 * scale (about −18 °C) the 20-degree day reads 1.36 times the other, and
 * further left the ratio sinks toward 1. The spending row has an absolute
 * zero, nothing to drag, and its ratio stays 2. It opens at 0 °C.
 */
export function ArbitraryZero() {
  const [z, setZ] = useState(0);
  const L = 40;
  const R = 560;
  const T = (t: number) => r2(L + ((t - Z_MIN) / (25 - Z_MIN)) * (R - L));
  const tInv = (x: number) => Z_MIN + ((x - L) / (R - L)) * (25 - Z_MIN);
  const M = (v: number) => r2(L + (v / 250) * (R - L));
  const set = (v: number) => setZ(Math.max(Z_MIN, Math.min(Z_MAX, Math.round(v))));
  const drag = (e: React.PointerEvent<SVGSVGElement>) => {
    const ctm = e.currentTarget.getScreenCTM();
    if (!ctm) return;
    set(tInv(new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse()).x));
  };

  const ratio = (20 - z) / (10 - z);
  const deg = (v: number) => (v < 0 ? `\u2212${-v}` : String(v));
  const tAxis = 128;
  const mAxis = 278;
  const bars = [
    { t: 10, y: 58 },
    { t: 20, y: 84 },
  ];
  const spend = [
    { v: 100, y: 208 },
    { v: 200, y: 234 },
  ];
  const bh = 16;
  const zx = T(z);
  const RX = 604;

  return (
    <Frame
      width={800}
      height={310}
      label={`Two days of 10 and 20 degrees Celsius measured from a zero set at ${deg(z)} degrees Celsius: they read ${10 - z} and ${20 - z}, so the warmer day reads ${ratio.toFixed(2)} times the cooler one, while the difference stays 10 degrees. Below, spending of 100 and 200 dollars measured from an absolute zero: always twice as much`}
      className="cursor-ew-resize touch-none select-none"
      svgProps={{
        onPointerDown: (e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          drag(e);
        },
        onPointerMove: (e) => {
          if (e.currentTarget.hasPointerCapture(e.pointerId)) drag(e);
        },
      }}
    >
      {/* ---------------- interval: temperature ---------------- */}
      <Key x={L} y={18} fill={INK}>INTERVAL SCALE</Key>
      <Key x={L + 128} y={18} fill={INK3}>TEMPERATURE</Key>
      {bars.map((b) => (
        <g key={b.t}>
          <rect x={zx} y={b.y} width={r2(T(b.t) - zx)} height={bh} fill={PAPER3} stroke={INK} strokeWidth={1.25} />
          <Key x={r2(T(b.t) + 8)} y={b.y + 12} fill={INK} size={12} weight={700}>
            {`${b.t - z}°`}
          </Key>
        </g>
      ))}
      <line x1={L - 16} y1={tAxis} x2={R + 16} y2={tAxis} stroke={INK} strokeWidth={1.5} />
      {[-40, -30, -20, -10, 0, 10, 20].map((t) => (
        <g key={t}>
          <line x1={T(t)} y1={tAxis} x2={T(t)} y2={tAxis + 6} stroke={INK} strokeWidth={1.25} />
          <Key x={T(t)} y={tAxis + 22} anchor="middle" fill={INK3} size={10.5}>
            {`${deg(t)} °C`}
          </Key>
        </g>
      ))}
      {/* the zero: arbitrary, so it can be dragged */}
      <line x1={zx} y1={50} x2={zx} y2={tAxis} stroke={COUNTER} strokeWidth={1.75} />
      <g
        role="slider"
        tabIndex={0}
        aria-label="Zero point of the temperature scale, in degrees Celsius"
        aria-valuemin={Z_MIN}
        aria-valuemax={Z_MAX}
        aria-valuenow={z}
        className="outline-none [&:focus-visible>circle]:stroke-[var(--ink)]"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" || e.key === "ArrowUp") set(z + 1);
          else if (e.key === "ArrowLeft" || e.key === "ArrowDown") set(z - 1);
          else return;
          e.preventDefault();
        }}
      >
        <circle cx={zx} cy={tAxis} r={9} fill={PAPER} stroke={COUNTER} strokeWidth={2} />
        <path d={`M${r2(zx - 13)} ${tAxis - 4}L${r2(zx - 18)} ${tAxis}L${r2(zx - 13)} ${tAxis + 4}Z`} fill={COUNTER} />
        <path d={`M${r2(zx + 13)} ${tAxis - 4}L${r2(zx + 18)} ${tAxis}L${r2(zx + 13)} ${tAxis + 4}Z`} fill={COUNTER} />
      </g>
      <Key x={zx} y={44} anchor="middle" fill={COUNTER} size={11} weight={700}>ZERO</Key>

      <Key x={RX} y={58} fill={INK3} size={10}>DIFFERENCE</Key>
      <Display x={RX} y={86} fill={INK} size={26}>10°</Display>
      <Key x={RX + 92} y={58} fill={COUNTER} size={10}>RATIO</Key>
      <Display x={RX + 92} y={86} fill={COUNTER} size={26}>{`${ratio.toFixed(2)}×`}</Display>

      <line x1={20} y1={166} x2={780} y2={166} stroke={RULE} strokeWidth={1} />

      {/* ---------------- ratio: spending ---------------- */}
      <Key x={L} y={192} fill={INK}>RATIO SCALE</Key>
      <Key x={L + 110} y={192} fill={INK3}>SPENDING</Key>
      {spend.map((b) => (
        <g key={b.v}>
          <rect x={M(0)} y={b.y} width={r2(M(b.v) - M(0))} height={bh} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.25} />
          <Key x={r2(M(b.v) + 8)} y={b.y + 12} fill={SIGNAL} size={12} weight={700}>
            {`$${b.v}`}
          </Key>
        </g>
      ))}
      <line x1={M(0)} y1={mAxis} x2={R + 16} y2={mAxis} stroke={INK} strokeWidth={1.5} />
      <line x1={M(0)} y1={200} x2={M(0)} y2={mAxis} stroke={INK} strokeWidth={2.5} />
      {[0, 50, 100, 150, 200, 250].map((v) => (
        <g key={v}>
          <line x1={M(v)} y1={mAxis} x2={M(v)} y2={mAxis + 6} stroke={INK} strokeWidth={1.25} />
          <Key x={M(v)} y={mAxis + 22} anchor="middle" fill={INK3} size={10.5}>
            {`$${v}`}
          </Key>
        </g>
      ))}
      <Key x={RX} y={208} fill={INK3} size={10}>DIFFERENCE</Key>
      <Display x={RX} y={236} fill={INK} size={26}>$100</Display>
      <Key x={RX + 92} y={208} fill={SIGNAL} size={10}>RATIO</Key>
      <Display x={RX + 92} y={236} fill={SIGNAL} size={26}>2.00×</Display>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Levels of Measurement and Permissible Statistics
   -------------------------------------------------------------------------- */

const REGIONS = [
  { name: "NORTH", n: 8 },
  { name: "EAST", n: 5 },
  { name: "SOUTH", n: 4 },
  { name: "WEST", n: 3 },
];
/** Ways of numbering the four regions, each as valid as the others. */
const NUMBERINGS = [
  [1, 2, 3, 4],
  [3, 1, 4, 2],
  [4, 3, 2, 1],
  [2, 4, 1, 3],
  [1, 3, 4, 2],
  [4, 1, 2, 3],
];

/**
 * Permissible Statistics: twenty respondents by region of residence, each
 * region carrying a code. The mode is North; the "average region code" is
 * computed beside it, with the region whose code it lies nearest.
 *
 * Interactive: "Renumber the regions" assigns the codes differently, which a
 * nominal scale allows. No respondent moves and the mode stays North, but
 * the average code jumps between 2.10 and 2.90 and names a different
 * "average region" each time: a result that cannot be interpreted. It opens
 * with the regions numbered 1 to 4 in order.
 */
export function RegionCodes() {
  const [k, setK] = useState(0);
  const codes = NUMBERINGS[k];
  const total = REGIONS.reduce((a, r) => a + r.n, 0);
  const mean = REGIONS.reduce((a, r, i) => a + r.n * codes[i], 0) / total;
  const nearest = REGIONS[codes.indexOf(Math.round(mean))].name;
  const bw = 88;
  const bx = (i: number) => 12 + i * 95;
  const top = 12;
  const bh = 104;
  return (
    <>
      <Frame
        width={400}
        height={208}
        label={`Twenty respondents by region, coded ${REGIONS.map((r, i) => `${r.name.toLowerCase()} ${codes[i]}`).join(", ")}. The mode is North; the average region code is ${mean.toFixed(2)}, nearest the code for ${nearest.toLowerCase()}`}
      >
        {REGIONS.map((r, i) => {
          const x = bx(i);
          return (
            <g key={r.name}>
              <rect x={x} y={top} width={bw} height={bh} fill={i === 0 ? SIGNAL_TINT : PAPER} stroke={i === 0 ? SIGNAL : RULE2} strokeWidth={1.25} />
              <Key x={x + 8} y={top + 18} fill={i === 0 ? SIGNAL : INK3} size={10}>
                {r.name}
              </Key>
              <rect x={x + bw - 26} y={top + 5} width={20} height={18} fill={INK} />
              <Key x={x + bw - 16} y={top + 18.5} anchor="middle" fill={PAPER} size={11.5} weight={700}>
                {codes[i]}
              </Key>
              {Array.from({ length: r.n }, (_, j) => (
                <Person1
                  key={j}
                  x={r2(x + 14 + (j % 4) * 20)}
                  y={r2(top + 62 + Math.floor(j / 4) * 36)}
                  k={0.8}
                  stroke={i === 0 ? SIGNAL : INK}
                  fill={i === 0 ? SIGNAL : PAPER}
                />
              ))}
            </g>
          );
        })}
        <line x1={12} y1={132} x2={388} y2={132} stroke={RULE} strokeWidth={1} />
        <Key x={12} y={154} fill={SIGNAL} size={10}>MODE</Key>
        <Display x={12} y={188} fill={SIGNAL} size={30}>North</Display>
        <Key x={202} y={154} fill={COUNTER} size={10}>AVERAGE REGION CODE</Key>
        <Display x={202} y={188} fill={COUNTER} size={30}>{mean.toFixed(2)}</Display>
        <Key x={286} y={184} fill={COUNTER} size={10}>{`\u2248 ${nearest}?`}</Key>
      </Frame>
      <div className="mt-2 px-1">
        <PlateButton onClick={() => setK((v) => (v + 1) % NUMBERINGS.length)} icon={<Shuffle className="size-3.5" aria-hidden />}>
          Renumber the regions
        </PlateButton>
      </div>
    </>
  );
}

/* --------------------------------------------------------------------------
   Comparative Scales
   -------------------------------------------------------------------------- */

/** A lettered coffee brand: the cup with its mark on the sleeve. */
function Brand({ x, y, mark, k = 1.9, tone = INK, fill = PAPER }: { x: number; y: number; mark: string; k?: number; tone?: string; fill?: string }) {
  return (
    <g>
      <Cup1 x={x} y={y} k={k} stroke={tone} fill={fill} />
      <text x={x} y={r2(y - 5.5 * (k / 1.9))} textAnchor="middle" fontFamily="var(--font-heading)" fontSize={r2(8 * k)} fontWeight={600} fill={tone}>
        {mark}
      </text>
    </g>
  );
}

/**
 * Comparative Scales: one completed answer on each form, in the three
 * columns above it. Paired comparison: of two brands, one is chosen. Rank
 * order: five brands numbered from most to least preferred. Constant sum:
 * 100 points divided among three attributes of coffee.
 */
export function ComparativeForms() {
  const rank = [
    { m: "A", r: 2 },
    { m: "B", r: 5 },
    { m: "C", r: 1 },
    { m: "D", r: 4 },
    { m: "E", r: 3 },
  ];
  const split = [
    { key: "TASTE", v: 50 },
    { key: "PRICE", v: 30 },
    { key: "AROMA", v: 20 },
  ];
  const sx = 566;
  const sw = 214;
  let acc = 0;
  return (
    <Frame
      width={800}
      height={132}
      label="Three completed comparative scales. Paired comparison: of brands A and B, B is chosen. Rank order: brands A to E ranked 2, 5, 1, 4 and 3. Constant sum: 100 points divided among taste 50, price 30 and aroma 20"
    >
      {/* paired comparison */}
      <Brand x={70} y={82} mark="A" k={2.3} />
      <Key x={127} y={62} anchor="middle" fill={INK3} size={11}>OR</Key>
      <Brand x={184} y={82} mark="B" k={2.3} tone={SIGNAL} fill={SIGNAL_TINT} />
      <circle cx={184} cy={106} r={9} fill={SIGNAL} />
      <path d="M179.5 106L182.5 109L188.5 102.5" fill="none" stroke={PAPER} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={70} cy={106} r={9} fill={PAPER} stroke={INK3} strokeWidth={1.25} />

      <line x1={263} y1={14} x2={263} y2={120} stroke={RULE} strokeWidth={1} />

      {/* rank order */}
      {rank.map((b, i) => {
        const x = 300 + i * 46;
        const first = b.r === 1;
        return (
          <g key={b.m}>
            <Brand x={x} y={70} mark={b.m} k={1.9} />
            <rect x={x - 12} y={86} width={24} height={24} fill={first ? SIGNAL : PAPER} stroke={first ? SIGNAL : INK3} strokeWidth={1.25} />
            <Key x={x} y={103} anchor="middle" fill={first ? PAPER : INK} size={12.5} weight={700}>
              {b.r}
            </Key>
          </g>
        );
      })}

      <line x1={536} y1={14} x2={536} y2={120} stroke={RULE} strokeWidth={1} />

      {/* constant sum */}
      {split.map((a, i) => {
        const x = r2(sx + (acc / 100) * sw);
        const w = r2((a.v / 100) * sw);
        acc += a.v;
        return (
          <g key={a.key}>
            <rect x={x} y={52} width={w} height={30} fill={i === 0 ? SIGNAL : i === 1 ? PAPER3 : PAPER} stroke={i === 0 ? SIGNAL : INK3} strokeWidth={1.25} />
            <Key x={r2(x + w / 2)} y={72} anchor="middle" fill={i === 0 ? PAPER : INK} size={12} weight={700}>
              {a.v}
            </Key>
            <Key x={r2(x + w / 2)} y={100} anchor="middle" fill={INK3} size={9.5}>
              {a.key}
            </Key>
          </g>
        );
      })}
      <Key x={sx + sw} y={40} anchor="end" fill={INK} size={11} weight={700}>= 100 POINTS</Key>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Likert Scales
   -------------------------------------------------------------------------- */

/**
 * Likert Scales: three statements measuring the same construct, each rated
 * from 1, strongly disagree, to 5, strongly agree (4, 5 and 4), gathered
 * into a single score: a sum of 13, an average of 4.3.
 */
export function LikertItems() {
  const picks = [4, 5, 4];
  const rows = [54, 112, 170];
  const x = 16;
  const box = 32;
  const gap = 9;
  const right = x + 5 * (box + gap) - gap;
  return (
    <Frame
      width={400}
      height={214}
      label="Three Likert statements about the same construct, each rated on five categories from strongly disagree to strongly agree, answered 4, 5 and 4, and combined into a single score: a sum of 13 or an average of 4.3"
    >
      <Key x={x} y={18} fill={INK3} size={9}>STRONGLY</Key>
      <Key x={x} y={29} fill={INK3} size={9}>DISAGREE</Key>
      <Key x={right} y={18} anchor="end" fill={INK3} size={9}>STRONGLY</Key>
      <Key x={right} y={29} anchor="end" fill={INK3} size={9}>AGREE</Key>
      {rows.map((y, i) => (
        <RatingRow key={y} x={x} y={y} n={5} box={box} gap={gap} pick={picks[i]} stem={[196, 150, 176][i]} />
      ))}
      <path
        d={`M${right + 14} ${rows[0] + 16}H${right + 26}V${rows[2] + 16}H${right + 14}M${right + 26} ${rows[1] + 16}H${right + 40}`}
        fill="none"
        stroke={INK3}
        strokeWidth={1.25}
      />
      <path d={head.right(right + 44, rows[1] + 16, 7)} fill="none" stroke={INK3} strokeWidth={1.25} />
      <Key x={right + 58} y={rows[1] - 30} fill={INK3} size={10}>SUM</Key>
      <Display x={right + 57} y={rows[1] - 4} fill={INK} size={28}>13</Display>
      <Key x={right + 58} y={rows[1] + 26} fill={SIGNAL} size={10}>AVERAGE</Key>
      <Display x={right + 57} y={rows[1] + 58} fill={SIGNAL} size={36}>4.3</Display>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Semantic Differential Scales
   -------------------------------------------------------------------------- */

type Layout = "left" | "mixed";
/** The three pairs of the hotel example: favorable adjective first. */
const PAIRS = [
  { fav: "modern", unfav: "old-fashioned" },
  { fav: "friendly", unfav: "unfriendly" },
  { fav: "inexpensive", unfav: "expensive" },
];
/** Which side the favorable adjective takes in each layout. */
const FAV_LEFT: Record<Layout, boolean[]> = {
  left: [true, true, true],
  mixed: [false, true, false],
};

/**
 * Semantic Differential Scales: the same hotel form completed by two
 * respondents. The first is a delighted guest who marks the favorable end of
 * every pair. The second answers by habit and marks the left-hand box of
 * every pair without reading it.
 *
 * Interactive: FAVORABLE ADJECTIVE switches the form between the favorable
 * adjective always on the left and on the left for some pairs and the right
 * for others. With every favorable adjective on the left, the two forms are
 * identical, and the habit passes for delight; once the pairs alternate, the
 * guest's marks follow the words while the habitual marks stay in the left
 * column, landing on "old-fashioned" and "expensive". It opens with every
 * favorable adjective on the left.
 */
export function HabitProfile() {
  const [layout, setLayout] = useState<Layout>("left");
  const favLeft = FAV_LEFT[layout];
  const box = 20;
  const gap = 3;
  const bx0 = 124;
  const bxs = (i: number) => bx0 + i * (box + gap);
  const bxEnd = bxs(6) + box;
  const rowH = 26;
  const forms = [
    { y: 30, key: "A DELIGHTED GUEST", tone: SIGNAL, tint: SIGNAL_TINT, pick: (r: number) => (favLeft[r] ? 0 : 6) },
    { y: 140, key: "ANSWERS BY HABIT", tone: COUNTER, tint: COUNTER_TINT, pick: () => 0 },
  ];
  const differ = PAIRS.filter((_, r) => forms[0].pick(r) !== forms[1].pick(r)).length;

  return (
    <>
      <Frame
        width={400}
        height={256}
        label={`A hotel rated on three semantic differential pairs, with the favorable adjective ${layout === "left" ? "always on the left" : "on the left for some pairs and on the right for others"}. A delighted guest marks the favorable end of every pair; a respondent answering by habit marks the left-hand box every time. ${differ === 0 ? "The two forms are identical." : `The forms differ on ${differ} of 3 pairs: the habitual marks fall on old-fashioned and expensive.`}`}
      >
        {forms.map((f, fi) => (
          <g key={fi}>
            <Key x={16} y={f.y - 12} fill={f.tone} size={10}>{f.key}</Key>
            <Person1 x={24} y={f.y + rowH * 2 + 8} k={1.1} stroke={f.tone} fill={f.tint} />
            {PAIRS.map((pair, r) => {
              const y = f.y + r * rowH;
              const left = favLeft[r] ? pair.fav : pair.unfav;
              const right = favLeft[r] ? pair.unfav : pair.fav;
              const pick = f.pick(r);
              return (
                <g key={pair.fav}>
                  <Note x={bx0 - 8} y={y + 15} anchor="end" size={12.5} fill={favLeft[r] ? INK : INK3} weight={favLeft[r] ? 600 : 400}>
                    {left}
                  </Note>
                  {Array.from({ length: 7 }, (_, i) => (
                    <rect key={i} x={bxs(i)} y={y} width={box} height={box} fill={PAPER} stroke={RULE2} strokeWidth={1} />
                  ))}
                  <circle cx={bxs(pick) + box / 2} cy={y + box / 2} r={6.5} fill={f.tone} />
                  <Note x={bxEnd + 8} y={y + 15} size={12.5} fill={favLeft[r] ? INK3 : INK} weight={favLeft[r] ? 400 : 600}>
                    {right}
                  </Note>
                </g>
              );
            })}
          </g>
        ))}
        <line x1={16} y1={226} x2={384} y2={226} stroke={RULE} strokeWidth={1} />
        <Key x={16} y={248} fill={differ === 0 ? COUNTER : SIGNAL} size={10.5}>
          {differ === 0 ? "THE TWO FORMS ARE IDENTICAL" : `THE FORMS DIFFER ON ${differ} OF 3 PAIRS`}
        </Key>
      </Frame>
      <Segmented
        label="Favorable adjective"
        value={layout}
        onChange={setLayout}
        options={[
          { id: "left", label: "Always on the left" },
          { id: "mixed", label: "Left or right" },
        ]}
      />
    </>
  );
}

/* --------------------------------------------------------------------------
   Decisions in Constructing Rating Scales
   -------------------------------------------------------------------------- */

type Option = "midpoint" | "noopinion";
/**
 * Forty customers rate a new feature of an app. 28 have used it; 12 have
 * not. Counts per category, least to most favorable, for each design:
 * informed answers, then the answers of those who have not used it.
 */
const ANSWERS: Record<"odd" | "even", { informed: number[]; guess: number[] }> = {
  // five categories: the uninformed pile onto the neutral midpoint
  odd: { informed: [3, 6, 5, 9, 5], guess: [0, 2, 8, 2, 0] },
  // four categories: neutral customers and guessers must lean one way
  even: { informed: [3, 8, 12, 5], guess: [1, 5, 5, 1] },
};
const UNINFORMED = 12;

/**
 * Decisions in Constructing Rating Scales: forty customers' ratings of a new
 * app feature, one figure per customer, stacked over the category chosen.
 * Customers who have used the feature are ink; the twelve who have not are
 * ochre. The share favorable among those who rated is read off beside it.
 *
 * Interactive: SCALE toggles a neutral midpoint and a "no opinion" option.
 * With a midpoint and no way out, the uninformed pile onto the middle and
 * the share favorable reads 40%; without a midpoint they must lean, and it
 * reads 57%; with a "no opinion" option they leave the scale and it reads
 * 50% or 61%. The same forty opinions yield four findings. It opens with a
 * midpoint and no "no opinion" option.
 */
export function ScaleDecisions() {
  const [on, setOn] = useState<Option[]>(["midpoint"]);
  const odd = on.includes("midpoint");
  const dk = on.includes("noopinion");
  const a = ANSWERS[odd ? "odd" : "even"];
  const n = a.informed.length;
  const counts = a.informed.map((v, i) => ({ informed: v, guess: dk ? 0 : a.guess[i] }));
  const rated = dk ? 40 - UNINFORMED : 40;
  const fav = counts.slice(n - 2).reduce((s, c) => s + c.informed + c.guess, 0);
  const pct = Math.round((fav / rated) * 100);

  const base = 176;
  const colW = 56;
  const x0 = 18;
  const cx = (i: number) => x0 + colW / 2 + i * colW;
  const per = 3;
  const px = 12.5;
  const py = 19;
  const stack = (x: number, informed: number, guess: number, key: string) =>
    Array.from({ length: informed + guess }, (_, j) => {
      const g = j >= informed;
      return (
        <Person1
          key={`${key}${j}`}
          x={r2(x + ((j % per) - 1) * px)}
          y={r2(base - 3 - Math.floor(j / per) * py)}
          k={0.5}
          width={1}
          stroke={g ? COUNTER : INK}
          fill={g ? COUNTER : PAPER}
        />
      );
    });
  const dkX = 350;
  const favL = cx(n - 2) - colW / 2 + 4;
  const favR = cx(n - 1) + colW / 2 - 4;

  return (
    <>
      <Frame
        width={400}
        height={236}
        label={`Forty customers rate a new app feature on a scale of ${n} categories${odd ? " with a neutral midpoint" : " with no midpoint"}${dk ? ', plus a "no opinion" option' : ""}. ${dk ? 'The twelve who have not used the feature choose "no opinion".' : odd ? "The twelve who have not used it mostly choose the midpoint." : "The twelve who have not used it lean one way or the other."} ${pct}% of those who rated are favorable`}
      >
        <Key x={x0} y={20} fill={INK3} size={10}>{`FAVORABLE, OF ${rated} WHO RATED`}</Key>
        <Display x={x0} y={56} fill={SIGNAL} size={36}>{`${pct}%`}</Display>

        {counts.map((c, i) => (
          <g key={i}>{stack(cx(i), c.informed, c.guess, `c${i}`)}</g>
        ))}
        <line x1={x0} y1={base} x2={x0 + n * colW} y2={base} stroke={INK} strokeWidth={1.25} />
        {counts.map((_, i) => (
          <Key key={i} x={cx(i)} y={base + 17} anchor="middle" fill={odd && i === 2 ? INK : INK3} size={11} weight={odd && i === 2 ? 700 : 600}>
            {i + 1}
          </Key>
        ))}
        {odd ? (
          <Key x={cx(2)} y={base + 31} anchor="middle" fill={INK3} size={9}>NEUTRAL</Key>
        ) : null}
        {!dk ? (
          <Key
            x={cx(2) + 24}
            y={r2(base - 3 - (Math.ceil((counts[2].informed + counts[2].guess) / per) - 1) * py - 9)}
            fill={COUNTER}
            size={9.5}
          >
            HAVE NOT USED IT
          </Key>
        ) : null}
        {/* the favorable categories */}
        <path d={`M${r2(favL)} ${base + 36}V${base + 42}H${r2(favR)}V${base + 36}`} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
        <Key x={r2((favL + favR) / 2)} y={base + 56} anchor="middle" fill={SIGNAL} size={9.5}>FAVORABLE</Key>

        {/* the way out */}
        {dk ? (
          <g>
            <line x1={dkX - 34} y1={base} x2={dkX + 34} y2={base} stroke={INK} strokeWidth={1.25} strokeDasharray="4 3" />
            {stack(dkX, 0, UNINFORMED, "dk")}
            <Key x={dkX} y={base + 17} anchor="middle" fill={COUNTER} size={9.5}>NO OPINION</Key>
          </g>
        ) : null}
      </Frame>
      <Toggles
        label="Scale"
        value={on}
        onChange={setOn}
        allowNone
        options={[
          { id: "midpoint", label: "Neutral midpoint" },
          { id: "noopinion", label: "No opinion option" },
        ]}
      />
    </>
  );
}

/* --------------------------------------------------------------------------
   Multi-Item Scales
   -------------------------------------------------------------------------- */

const MAX_ITEMS = 8;
/** Forty respondents: their satisfaction, and each item's error in measuring it. */
const RESPONDENTS = (() => {
  const rnd = seeded(265);
  const normal = () => Math.sqrt(-2 * Math.log(1 - rnd())) * Math.cos(2 * Math.PI * rnd());
  return Array.from({ length: 40 }, () => ({
    t: Math.max(1.6, Math.min(6.4, 4 + 1.05 * normal())),
    e: Array.from({ length: MAX_ITEMS }, () => 1.25 * normal()),
  }));
})();
const clamp7 = (v: number) => Math.max(1, Math.min(7, v));
const scoreWith = (k: number) => RESPONDENTS.map((p) => clamp7(p.t + p.e.slice(0, k).reduce((a, b) => a + b, 0) / k));
function correlation(a: number[], b: number[]) {
  const ma = a.reduce((s, v) => s + v, 0) / a.length;
  const mb = b.reduce((s, v) => s + v, 0) / b.length;
  let sab = 0;
  let saa = 0;
  let sbb = 0;
  a.forEach((v, i) => {
    sab += (v - ma) * (b[i] - mb);
    saa += (v - ma) ** 2;
    sbb += (b[i] - mb) ** 2;
  });
  return sab / Math.sqrt(saa * sbb);
}
const TRUE = RESPONDENTS.map((p) => p.t);
const R_BY_ITEMS = Array.from({ length: MAX_ITEMS }, (_, i) => correlation(TRUE, scoreWith(i + 1)));

/**
 * Multi-Item Scales: forty respondents, each placed by their actual
 * satisfaction (across) and by the score the scale gives them (up). A
 * perfect measure would put every respondent on the diagonal. Beside it,
 * the correlation between score and satisfaction for scales of one to eight
 * items.
 *
 * Interactive: ITEMS sets how many items are combined into the score. With
 * one item the respondents scatter far from the diagonal; each added item
 * pulls them in, quickly at first and then by less and less, as the curve
 * beside it shows. It opens with a single item.
 */
export function MultiItemAccuracy() {
  const [k, setK] = useState(1);
  const scores = scoreWith(k);
  const r = R_BY_ITEMS[k - 1];

  const sx0 = 60;
  const sx1 = 330;
  const sy0 = 206;
  const sy1 = 26;
  const SX = (v: number) => r2(sx0 + ((v - 1) / 6) * (sx1 - sx0));
  const SY = (v: number) => r2(sy0 - ((v - 1) / 6) * (sy0 - sy1));

  const cx0 = 500;
  const cx1 = 760;
  const cy0 = 206;
  const cy1 = 40;
  const CX = (i: number) => r2(cx0 + ((i - 1) / (MAX_ITEMS - 1)) * (cx1 - cx0));
  const CY = (v: number) => r2(cy0 - ((v - 0.5) / 0.5) * (cy0 - cy1));
  const curve = R_BY_ITEMS.map((v, i) => `${i ? "L" : "M"}${CX(i + 1)} ${CY(v)}`).join("");

  return (
    <>
      <Frame
        width={800}
        height={246}
        label={`Forty respondents placed by their satisfaction and by the score a scale of ${k} item${k > 1 ? "s" : ""} gives them. The correlation between score and satisfaction is ${r.toFixed(2)}; across one to eight items it rises from ${R_BY_ITEMS[0].toFixed(2)} to ${R_BY_ITEMS[MAX_ITEMS - 1].toFixed(2)}, by less with each added item`}
      >
        {/* ---------------- the respondents ---------------- */}
        <line x1={sx0} y1={sy0} x2={sx1 + 14} y2={sy0} stroke={INK} strokeWidth={1.25} />
        <path d={head.right(sx1 + 14, sy0, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
        <line x1={sx0} y1={sy0} x2={sx0} y2={sy1 - 14} stroke={INK} strokeWidth={1.25} />
        <path d={head.up(sx0, sy1 - 14, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
        {[1, 4, 7].map((v) => (
          <g key={v}>
            <Key x={SX(v)} y={sy0 + 16} anchor="middle" fill={INK3} size={9.5}>{v}</Key>
            <Key x={sx0 - 8} y={r2(SY(v) + 3.5)} anchor="end" fill={INK3} size={9.5}>{v}</Key>
          </g>
        ))}
        <Key x={sx1 + 14} y={sy0 + 32} anchor="end" fill={INK3} size={10}>SATISFACTION</Key>
        <g transform={`translate(${sx0 - 30} ${sy1 - 12}) rotate(-90)`}>
          <Key x={0} y={0} anchor="end" fill={INK3} size={10}>SCALE SCORE</Key>
        </g>
        <line x1={SX(1)} y1={SY(1)} x2={SX(7)} y2={SY(7)} stroke={INK3} strokeWidth={1} strokeDasharray="4 4" />
        {RESPONDENTS.map((p, i) => (
          <circle key={i} cx={SX(p.t)} cy={SY(scores[i])} r={4.5} fill={SIGNAL} fillOpacity={0.8} />
        ))}

        {/* ---------------- accuracy by number of items ---------------- */}
        <Key x={cx0 - 34} y={20} fill={INK3} size={10}>CORRELATION WITH SATISFACTION</Key>
        <line x1={cx0 - 10} y1={cy0} x2={cx1 + 14} y2={cy0} stroke={INK} strokeWidth={1.25} />
        <path d={head.right(cx1 + 14, cy0, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
        <line x1={cx0 - 10} y1={cy0} x2={cx0 - 10} y2={cy1 - 10} stroke={INK} strokeWidth={1.25} />
        {[0.5, 0.75, 1].map((v) => (
          <g key={v}>
            <line x1={cx0 - 14} y1={CY(v)} x2={cx0 - 10} y2={CY(v)} stroke={INK} strokeWidth={1} />
            <Key x={cx0 - 18} y={r2(CY(v) + 3.5)} anchor="end" fill={INK3} size={9.5}>{v.toFixed(2)}</Key>
          </g>
        ))}
        {Array.from({ length: MAX_ITEMS }, (_, i) => (
          <Key key={i} x={CX(i + 1)} y={cy0 + 16} anchor="middle" fill={i + 1 === k ? SIGNAL : INK3} size={9.5} weight={i + 1 === k ? 700 : 600}>
            {i + 1}
          </Key>
        ))}
        <Key x={cx1 + 14} y={cy0 + 32} anchor="end" fill={INK3} size={10}>ITEMS</Key>
        <path d={curve} fill="none" stroke={INK} strokeWidth={1.5} />
        {R_BY_ITEMS.map((v, i) => (
          <circle key={i} cx={CX(i + 1)} cy={CY(v)} r={i + 1 === k ? 6.5 : 3} fill={i + 1 === k ? SIGNAL : INK} />
        ))}
        <Display x={r2(CX(k) + (k > 5 ? -12 : 12))} y={r2(CY(r) + 30)} anchor={k > 5 ? "end" : "start"} fill={SIGNAL} size={26}>
          {r.toFixed(2)}
        </Display>
      </Frame>
      <Slider label="Items" value={k} min={1} max={MAX_ITEMS} onChange={setK} />
    </>
  );
}

/* --------------------------------------------------------------------------
   Reliability
   -------------------------------------------------------------------------- */

/** Thirty respondents answering the same scale twice, a few weeks apart. */
const RETEST = (() => {
  const rnd = seeded(71);
  const normal = () => Math.sqrt(-2 * Math.log(1 - rnd())) * Math.cos(2 * Math.PI * rnd());
  return Array.from({ length: 30 }, () => {
    const t = 4 + 1.05 * normal();
    return { a: clamp7(t + 0.45 * normal()), b: clamp7(t + 0.45 * normal()) };
  });
})();
const RETEST_R = correlation(
  RETEST.map((p) => p.a),
  RETEST.map((p) => p.b),
);
const ALPHA = 0.86;

/**
 * Reliability: two assessments of one satisfaction scale. Above, test-retest:
 * thirty respondents' scores at the first and the second administration,
 * which lie close to the diagonal and correlate strongly. Below, coefficient
 * alpha for the same scale, inside the conventionally acceptable range from
 * 0.70 upward.
 */
export function TestRetest() {
  const x0 = 56;
  const x1 = 250;
  const y0 = 196;
  const y1 = 20;
  const X = (v: number) => r2(x0 + ((v - 1) / 6) * (x1 - x0));
  const Y = (v: number) => r2(y0 - ((v - 1) / 6) * (y0 - y1));
  const a0 = 30;
  const a1 = 370;
  const aY = 268;
  const A = (v: number) => r2(a0 + ((v - 0.5) / 0.5) * (a1 - a0));
  return (
    <Frame
      width={400}
      height={300}
      label={`Test-retest reliability: thirty respondents' scores on a satisfaction scale at two administrations lie close to the diagonal, a correlation of ${RETEST_R.toFixed(2)}. Coefficient alpha for the scale is ${ALPHA}, above the conventional threshold of 0.70`}
    >
      {/* test-retest */}
      <line x1={x0} y1={y0} x2={x1 + 12} y2={y0} stroke={INK} strokeWidth={1.25} />
      <path d={head.right(x1 + 12, y0, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
      <line x1={x0} y1={y0} x2={x0} y2={y1 - 8} stroke={INK} strokeWidth={1.25} />
      <path d={head.up(x0, y1 - 8, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
      <line x1={X(1)} y1={Y(1)} x2={X(7)} y2={Y(7)} stroke={INK3} strokeWidth={1} strokeDasharray="4 4" />
      {RETEST.map((p, i) => (
        <circle key={i} cx={X(p.a)} cy={Y(p.b)} r={4} fill={SIGNAL} fillOpacity={0.8} />
      ))}
      <Key x={x1 + 12} y={y0 + 18} anchor="end" fill={INK3} size={9.5}>FIRST TIME</Key>
      <g transform={`translate(${x0 - 12} ${y1 - 4}) rotate(-90)`}>
        <Key x={0} y={0} anchor="end" fill={INK3} size={9.5}>SECOND TIME</Key>
      </g>
      <Key x={284} y={90} fill={INK3} size={10}>TEST-RETEST</Key>
      <Key x={284} y={104} fill={INK3} size={10}>CORRELATION</Key>
      <Display x={282} y={138} fill={SIGNAL} size={34}>{RETEST_R.toFixed(2)}</Display>

      {/* coefficient alpha */}
      <Key x={a0} y={aY - 26} fill={INK3} size={10}>COEFFICIENT ALPHA</Key>
      <rect x={A(0.7)} y={aY - 12} width={r2(A(1) - A(0.7))} height={24} fill={PAPER3} stroke={RULE2} strokeWidth={1} />
      <Key x={A(1)} y={aY - 18} anchor="end" fill={INK3} size={9}>ACCEPTABLE</Key>
      <line x1={a0} y1={aY} x2={a1} y2={aY} stroke={INK} strokeWidth={1.25} />
      {[0.5, 0.7, 1].map((v) => (
        <g key={v}>
          <line x1={A(v)} y1={aY - 5} x2={A(v)} y2={aY + 5} stroke={INK} strokeWidth={1.25} />
          <Key x={A(v)} y={aY + 22} anchor="middle" fill={v === 0.7 ? INK : INK3} size={10} weight={v === 0.7 ? 700 : 600}>
            {v.toFixed(2)}
          </Key>
        </g>
      ))}
      <circle cx={A(ALPHA)} cy={aY} r={7} fill={SIGNAL} />
      <Key x={A(ALPHA)} y={aY + 22} anchor="middle" fill={SIGNAL} size={10.5} weight={700}>{ALPHA.toFixed(2)}</Key>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Validity
   -------------------------------------------------------------------------- */

/** A questionnaire form: a sheet with rating rows, standing for a measure. */
function FormSheet({
  x,
  y,
  w = 62,
  h = 78,
  tone = INK,
  fill = PAPER,
  boxes = true,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  tone?: string;
  fill?: string;
  /** Small sheets show only the question lines. */
  boxes?: boolean;
}) {
  const rows = [0.24, 0.5, 0.76];
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={fill} stroke={tone} strokeWidth={1.5} />
      {rows.map((f) => (
        <g key={f}>
          <line x1={x + (boxes ? 8 : 6)} y1={r2(y + h * f - (boxes ? 6 : -2))} x2={r2(x + w * (boxes ? 0.62 : 0.8))} y2={r2(y + h * f - (boxes ? 6 : -2))} stroke={boxes ? RULE2 : tone} strokeWidth={boxes ? 3 : 1.5} strokeLinecap="round" />
          {boxes && Array.from({ length: 5 }, (_, i) => (
            <rect key={i} x={r2(x + 8 + i * ((w - 16) / 5))} y={r2(y + h * f - 1)} width={r2((w - 16) / 5 - 2)} height={6} fill="none" stroke={tone} strokeWidth={0.9} />
          ))}
        </g>
      ))}
    </g>
  );
}

/**
 * Validity: evidence for a new satisfaction scale. It correlates strongly
 * with another measure of satisfaction (convergent), moderately with actual
 * purchases (criterion), and hardly at all with price consciousness, a
 * different construct (discriminant). Line weight follows the correlation.
 */
export function ValidityEvidence() {
  const hub = { x: 18, y: 96, w: 66, h: 84 };
  const hx = hub.x + hub.w;
  const hy = hub.y + hub.h / 2;
  const tx = 206;
  const links = [
    { y: 50, r: 0.78, key: "CONVERGENT", lines: ["another measure of", "satisfaction"], tone: SIGNAL, w: 5, dash: undefined },
    { y: 138, r: 0.52, key: "CRITERION", lines: ["actual purchases"], tone: INK, w: 3, dash: undefined },
    { y: 222, r: 0.08, key: "DISCRIMINANT", lines: ["price consciousness"], tone: COUNTER, w: 1.25, dash: "4 4" },
  ];
  return (
    <Frame
      width={400}
      height={262}
      label="Evidence for the validity of a new satisfaction scale: it correlates 0.78 with another measure of satisfaction (convergent validity), 0.52 with actual purchases (criterion validity), and only 0.08 with price consciousness, a different construct (discriminant validity)"
    >
      <Key x={hub.x} y={hub.y - 12} fill={INK} size={10}>NEW SCALE</Key>
      <FormSheet x={hub.x} y={hub.y} w={hub.w} h={hub.h} />
      {links.map((l, i) => {
        const ex = tx - 8;
        const mx = (hx + 12 + ex) / 2;
        const my = hy + ((l.y - hy) * (mx - hx - 12)) / (ex - hx - 12);
        return (
          <g key={l.key}>
            <line x1={hx + 12} y1={hy} x2={ex} y2={l.y} stroke={l.tone} strokeWidth={l.w} strokeDasharray={l.dash} strokeLinecap="round" />
            <rect x={r2(mx - 17)} y={r2(my - 10)} width={34} height={20} fill={PAPER} />
            <Key x={r2(mx)} y={r2(my + 4)} anchor="middle" fill={l.tone} size={11} weight={700}>
              {l.r.toFixed(2).replace(/^0/, "")}
            </Key>
            {i === 0 ? (
              <FormSheet x={tx + 3} y={l.y - 19} w={28} h={38} boxes={false} />
            ) : i === 1 ? (
              <ShoppingBag x={tx} y={l.y - 17} size={34} weight="regular" color={INK} />
            ) : (
              <Tag x={tx} y={l.y - 17} size={34} weight="regular" color={INK} />
            )}
            <Key x={tx + 44} y={l.y - (l.lines.length > 1 ? 14 : 6)} fill={l.tone} size={10}>
              {l.key}
            </Key>
            {l.lines.map((t, j) => (
              <Note key={t} x={tx + 44} y={l.y + (l.lines.length > 1 ? 2 : 10) + j * 16} size={12.5} fill={INK2}>
                {t}
              </Note>
            ))}
          </g>
        );
      })}
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Reliability Versus Validity
   -------------------------------------------------------------------------- */

/**
 * Reliability Versus Validity: a bathroom scale, seen from above, and five
 * weighings of the same person, who weighs 70 kilograms. The readings sit
 * together, consistent (reliable), and every one of them is three kilograms
 * too high (not valid).
 */
export function BathroomScale() {
  const readings = [72.9, 73.0, 73.1, 73.0, 72.95];
  const L = 250;
  const R = 770;
  const X = (v: number) => r2(L + ((v - 66) / 10) * (R - L));
  const axisY = 118;
  return (
    <Frame
      width={800}
      height={166}
      label="A bathroom scale reading 73.0 kilograms. Five weighings of a person whose true weight is 70 kilograms all fall between 72.9 and 73.1: consistent, and every one three kilograms too high"
    >
      {/* the scale, from above */}
      <rect x={40} y={18} width={132} height={132} rx={18} fill={PAPER} stroke={INK} strokeWidth={1.75} />
      <rect x={70} y={32} width={72} height={30} rx={3} fill={INK} />
      <text x={106} y={54} textAnchor="middle" fontFamily="var(--font-label)" fontSize={18} fontWeight={600} fill={PAPER}>
        73.0
      </text>
      <rect x={60} y={80} width={40} height={58} rx={14} fill={PAPER3} stroke={INK3} strokeWidth={1} />
      <rect x={112} y={80} width={40} height={58} rx={14} fill={PAPER3} stroke={INK3} strokeWidth={1} />

      {/* the readings */}
      <line x1={L - 10} y1={axisY} x2={R + 10} y2={axisY} stroke={INK} strokeWidth={1.5} />
      {[66, 68, 70, 72, 74, 76].map((v) => (
        <g key={v}>
          <line x1={X(v)} y1={axisY} x2={X(v)} y2={axisY + 6} stroke={INK} strokeWidth={1.25} />
          <Key x={X(v)} y={axisY + 24} anchor="middle" fill={v === 70 ? INK : INK3} size={11} weight={v === 70 ? 700 : 600}>
            {`${v} KG`}
          </Key>
        </g>
      ))}
      {/* the true weight */}
      <line x1={X(70)} y1={60} x2={X(70)} y2={axisY} stroke={INK} strokeWidth={1.25} strokeDasharray="4 3" />
      <Key x={r2(X(70) - 8)} y={66} anchor="end" fill={INK} size={10.5}>TRUE WEIGHT</Key>
      {readings.map((v, i) => (
        <circle key={i} cx={X(v)} cy={axisY - 12 - i * 13} r={5.5} fill={SIGNAL} />
      ))}
      <Key x={r2(X(73) + 16)} y={axisY - 44} fill={SIGNAL} size={10.5}>FIVE WEIGHINGS</Key>
      <Key x={r2(X(73) + 16)} y={axisY - 30} fill={SIGNAL} size={10.5}>CONSISTENT</Key>
      {/* the systematic error */}
      <path d={`M${X(70)} 40V32H${X(73)}V40`} fill="none" stroke={COUNTER} strokeWidth={1.5} />
      <Key x={r2((X(70) + X(73)) / 2)} y={22} anchor="middle" fill={COUNTER} size={10.5}>3 KG TOO HIGH</Key>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Types of Questions
   -------------------------------------------------------------------------- */

/** A tick inside a box or circle centred on (cx, cy). */
function Tick({ cx, cy, s = 5, stroke = PAPER }: { cx: number; cy: number; s?: number; stroke?: string }) {
  return (
    <path
      d={`M${r2(cx - s)} ${r2(cy)}L${r2(cx - s * 0.3)} ${r2(cy + s * 0.7)}L${r2(cx + s)} ${r2(cy - s * 0.8)}`}
      fill="none"
      stroke={stroke}
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

/**
 * Types of Questions: one answered question of each type, under the column
 * that names it. Open-ended: an answer written in the respondent's own
 * words. Multiple choice: two of four options selected. Dichotomous: yes or
 * no. Scaled: one category of a rating scale.
 */
export function QuestionForms() {
  const cols = [0, 206, 412, 618];
  const w = 182;
  const stem = (x: number, len: number) => (
    <line x1={x + 12} y1={24} x2={x + 12 + len} y2={24} stroke={RULE2} strokeWidth={4} strokeLinecap="round" />
  );
  const wave = (x: number, y: number, len: number) => {
    const n = Math.floor(len / 8);
    let d = `M${x} ${y}`;
    for (let i = 0; i < n; i++) d += `q2 ${i % 2 ? 3 : -3} 4 0t4 0`;
    return <path d={d} fill="none" stroke={INK2} strokeWidth={1.25} strokeLinecap="round" />;
  };
  return (
    <Frame
      width={800}
      height={140}
      label="One answered question of each type: an open-ended answer written in the respondent's own words; a multiple-choice question with two of four options selected; a dichotomous question answered yes; and a scaled question answered 4 on a scale of 5"
    >
      {cols.map((x) => (
        <rect key={x} x={x + 0.75} y={8} width={w - 1.5} height={124} fill={PAPER} stroke={RULE2} strokeWidth={1} />
      ))}

      {/* open-ended */}
      {stem(cols[0], 130)}
      <rect x={cols[0] + 12} y={40} width={w - 24} height={80} fill={PAPER} stroke={INK3} strokeWidth={1} />
      {wave(cols[0] + 22, 58, 132)}
      {wave(cols[0] + 22, 78, 120)}
      {wave(cols[0] + 22, 98, 72)}

      {/* multiple choice */}
      {stem(cols[1], 120)}
      {[true, false, true, false].map((on, i) => {
        const y = 42 + i * 21;
        const x = cols[1] + 14;
        return (
          <g key={i}>
            <rect x={x} y={y} width={13} height={13} fill={on ? INK : PAPER} stroke={INK} strokeWidth={1.25} />
            {on ? <Tick cx={x + 6.5} cy={y + 6.5} s={4} /> : null}
            <line x1={x + 24} y1={y + 7} x2={x + 24 + [96, 74, 108, 62][i]} y2={y + 7} stroke={RULE2} strokeWidth={3} strokeLinecap="round" />
          </g>
        );
      })}

      {/* dichotomous */}
      {stem(cols[2], 140)}
      {["YES", "NO"].map((t, i) => {
        const x = cols[2] + 30 + i * 80;
        const on = i === 0;
        return (
          <g key={t}>
            <circle cx={x} cy={82} r={11} fill={on ? INK : PAPER} stroke={INK} strokeWidth={1.5} />
            {on ? <Tick cx={x} cy={82} s={5} /> : null}
            <Key x={x + 18} y={87} fill={INK} size={13} weight={700}>{t}</Key>
          </g>
        );
      })}

      {/* scaled */}
      {stem(cols[3], 124)}
      <RatingRow x={cols[3] + 14} y={70} n={5} box={26} gap={6} pick={4} />
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Question Order
   -------------------------------------------------------------------------- */

/**
 * Question Order: a questionnaire from its first question to its last.
 * Screening, then simple and interesting questions, then the funnel from
 * general to specific questions, and sensitive and classification questions,
 * such as income, at the end.
 */
export function QuestionnaireFunnel() {
  const L = 58;
  const R = 384;
  const cx = (L + R) / 2;
  const fTop = 124;
  const fBot = 238;
  const topW = R - L;
  const botW = 116;
  const fx = (y: number) => {
    const t = (y - fTop) / (fBot - fTop);
    return (topW - t * (topW - botW)) / 2;
  };
  const band = (y: number, h: number, fill: string, stroke: string) => (
    <rect x={L} y={y} width={R - L} height={h} fill={fill} stroke={stroke} strokeWidth={1.25} />
  );
  const num = (n: number, y: number) => (
    <Key x={20} y={y} fill={INK3} size={11} weight={700}>{String(n).padStart(2, "0")}</Key>
  );
  return (
    <Frame
      width={400}
      height={324}
      label="A questionnaire in order: screening questions first, then simple and interesting questions, then a funnel from general to specific questions, and sensitive and classification questions, such as income, at the end"
    >
      {/* the order runs down the page */}
      <line x1={40} y1={16} x2={40} y2={306} stroke={RULE2} strokeWidth={1.25} />
      <path d={head.down(40, 310, 7)} fill="none" stroke={RULE2} strokeWidth={1.25} />

      {num(1, 42)}
      {band(18, 40, PAPER, INK)}
      <Key x={L + 14} y={43} fill={INK} size={11}>SCREENING</Key>

      {num(2, 94)}
      {band(70, 40, PAPER, INK)}
      <Key x={L + 14} y={95} fill={INK} size={11}>SIMPLE, INTERESTING</Key>

      {num(3, 146)}
      <path
        d={`M${r2(cx - fx(fTop))} ${fTop}H${r2(cx + fx(fTop))}L${r2(cx + fx(fBot))} ${fBot}H${r2(cx - fx(fBot))}Z`}
        fill={SIGNAL_TINT}
        stroke={SIGNAL}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <Key x={cx} y={fTop + 22} anchor="middle" fill={SIGNAL} size={11}>GENERAL</Key>
      {[160, 180, 200].map((y) => (
        <line key={y} x1={r2(cx - fx(y) + 18)} y1={y} x2={r2(cx + fx(y) - 18)} y2={y} stroke={SIGNAL} strokeOpacity={0.45} strokeWidth={3} strokeLinecap="round" />
      ))}
      <Key x={cx} y={fBot - 12} anchor="middle" fill={SIGNAL} size={11}>SPECIFIC</Key>

      {num(4, 274)}
      {band(250, 58, PAPER3, INK3)}
      <Key x={L + 14} y={274} fill={INK} size={11}>SENSITIVE, CLASSIFICATION</Key>
      <Note x={L + 14} y={295} fill={INK2} size={13}>income</Note>
    </Frame>
  );
}

