/* ==========================================================================
   Week 08 plates: Experiments and A/B Testing.
   Built on ../_visuals/kit and ../_visuals/objects. Every plate follows the
   sentence it illustrates on the slide.
   ========================================================================== */

import React, { useState } from "react";
import {
  Frame,
  Key,
  Note,
  Display,
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
  headAlong,
  r2,
  seeded,
  PlateButton,
  Slider,
  Segmented,
  Toggles,
} from "../_visuals/kit";
import { Person1, AiMark1, Store1, Cup1, Tick1, RatingRow1 } from "../_visuals/objects";
import { Sun, Snowflake, GraduationCap, Desktop } from "@phosphor-icons/react";


/* --------------------------------------------------------------------------
   Causality in Marketing Research
   -------------------------------------------------------------------------- */

/** Which of the twenty shoppers in each row bought (fixed, so the plate reads the same every time). */
const BOUGHT_REGULAR = [1, 5, 8, 12, 15, 18];
const BOUGHT_REDUCED = [0, 2, 3, 5, 7, 9, 10, 12, 14, 16, 19];

/** A price tag hanging from its string, centred on (cx, cy). */
function PriceTag({ cx, cy, text, tone = INK }: { cx: number; cy: number; text: string; tone?: string }) {
  const w = 58;
  const h = 24;
  const x = cx - w / 2;
  const y = cy - h / 2;
  return (
    <g>
      <path
        d={`M${x + 10} ${y}H${x + w}V${y + h}H${x + 10}L${x} ${cy}Z`}
        fill={PAPER}
        stroke={tone}
        strokeWidth={1.25}
        strokeLinejoin="round"
      />
      <circle cx={x + 9} cy={cy} r={2.2} fill="none" stroke={tone} strokeWidth={1.1} />
      <Key x={r2(cx + 4)} y={cy + 4} anchor="middle" fill={tone} size={10.5} weight={700}>
        {text}
      </Key>
    </g>
  );
}

/**
 * A probabilistic cause: twenty shoppers at the regular price and twenty
 * after a price reduction. More buy after the reduction, yet some buy at the
 * regular price and many do not buy even at the lower one: the cause makes
 * buying more likely without guaranteeing it.
 */
export function ProbabilisticCause() {
  const rows = [
    { key: "REGULAR PRICE", tag: "$6.00", bought: BOUGHT_REGULAR, y: 84, tone: INK },
    { key: "PRICE REDUCTION", tag: "\u221220%", bought: BOUGHT_REDUCED, y: 178, tone: SIGNAL },
  ];
  const x0 = 126;
  const dx = 18.5;
  return (
    <Frame
      width={640}
      height={214}
      label="Twenty shoppers at the regular price, of whom 6 buy, and twenty after a 20 percent price reduction, of whom 11 buy. The reduction makes buying more likely, but 9 of the 20 still do not buy"
    >
      {rows.map((r) => {
        const set = new Set(r.bought);
        return (
          <g key={r.key}>
            <Key x={20} y={r.y - 52} fill={r.tone === INK ? INK2 : r.tone}>{r.key}</Key>
            <PriceTag cx={56} cy={r.y - 16} text={r.tag} tone={r.tone} />
            {Array.from({ length: 20 }, (_, i) => (
              <Person1
                key={i}
                x={r2(x0 + i * dx)}
                y={r.y}
                k={0.78}
                width={1.25}
                stroke={set.has(i) ? COUNTER : INK3}
                fill={set.has(i) ? COUNTER : PAPER}
              />
            ))}
            <Display x={620} y={r.y - 12} anchor="end" size={30} fill={r.tone === INK ? INK : SIGNAL}>
              {`${r.bought.length} of 20`}
            </Display>
            <Key x={620} y={r.y + 9} anchor="end" fill={COUNTER}>BOUGHT</Key>
          </g>
        );
      })}
      <line x1={20} y1={112} x2={620} y2={112} stroke={RULE} strokeWidth={1} />
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Conditions for Causality
   -------------------------------------------------------------------------- */

/** Ten stores: in-store promotion and sales, both on a 0–1 scale. The five busiest-area stores come last. */
const PROMO_STORES = [
  [0.08, 0.16],
  [0.2, 0.3],
  [0.3, 0.2],
  [0.36, 0.42],
  [0.46, 0.33],
  [0.56, 0.58],
  [0.64, 0.5],
  [0.74, 0.74],
  [0.84, 0.66],
  [0.92, 0.86],
];

/**
 * The three conditions, one panel each. 1: stores with more promotion have
 * higher sales. 2: the promotion comes first and sales rise after it. 3: the
 * stores with most promotion are also the busy-area stores, a rival
 * explanation that has to be ruled out.
 */
export function ThreeConditions() {
  const w = 236;
  const gap = 26;
  const top = 40;
  const base = 188;
  const panels = [0, 1, 2].map((i) => 20 + i * (w + gap));

  const scatter = (px: number, busy: boolean) => {
    const X = (v: number) => r2(px + 26 + v * (w - 44));
    const Y = (v: number) => r2(base - 14 - v * (base - top - 40));
    return (
      <g>
        <line x1={px + 12} y1={base} x2={px + w - 4} y2={base} stroke={INK} strokeWidth={1.25} />
        <path d={head.right(px + w - 4, base, 6)} fill="none" stroke={INK} strokeWidth={1.25} />
        <line x1={px + 12} y1={base} x2={px + 12} y2={top + 14} stroke={INK} strokeWidth={1.25} />
        <path d={head.up(px + 12, top + 14, 6)} fill="none" stroke={INK} strokeWidth={1.25} />
        <Key x={px + w - 4} y={base + 18} anchor="end" size={9.5}>PROMOTION</Key>
        <Key x={px + 20} y={top + 22} size={9.5}>SALES</Key>
        {PROMO_STORES.map(([a, b], i) => {
          const hot = busy && i >= 5;
          return <Store1 key={i} cx={X(a)} cy={Y(b)} k={0.9} stroke={hot ? COUNTER : INK2} fill={PAPER} />;
        })}
        {busy ? (
          <g>
            <Key x={X(0.62)} y={Y(0.95)} anchor="end" fill={COUNTER} size={9.5}>BUSY AREA</Key>
            <Key x={X(0.52)} y={Y(0.04)} fill={INK3} size={9.5}>QUIET AREA</Key>
          </g>
        ) : null}
      </g>
    );
  };

  const weeks = [3, 3, 3, 5, 6, 6, 6, 6];
  const timeline = (px: number) => {
    const bw = 18;
    const step = (w - 30) / weeks.length;
    const X = (i: number) => r2(px + 22 + i * step);
    return (
      <g>
        <line x1={px + 12} y1={base} x2={px + w - 4} y2={base} stroke={INK} strokeWidth={1.25} />
        <path d={head.right(px + w - 4, base, 6)} fill="none" stroke={INK} strokeWidth={1.25} />
        <Key x={px + w - 4} y={base + 18} anchor="end" size={9.5}>WEEKS</Key>
        {weeks.map((v, i) => (
          <rect key={i} x={X(i)} y={r2(base - v * 14)} width={bw} height={r2(v * 14)} fill={i >= 3 ? SIGNAL : RULE2} />
        ))}
        <PriceTag cx={r2(X(3) + 24)} cy={top + 20} text={"\u221220%"} />
        <line x1={r2(X(3) - 5)} y1={top + 23} x2={r2(X(3) - 5)} y2={base} stroke={INK} strokeWidth={1} strokeDasharray="3 3" />
        <Key x={r2(X(3) - 12)} y={top + 24} anchor="end" size={9.5}>CAUSE</Key>
        <Key x={r2(X(7) + bw)} y={r2(base - 6 * 14 - 10)} anchor="end" fill={SIGNAL} size={9.5}>EFFECT</Key>
      </g>
    );
  };

  return (
    <Frame
      width={800}
      height={210}
      label="Three panels. One: ten stores, where those with more in-store promotion have higher sales. Two: weekly sales, flat until a 20 percent promotion in week four and higher after it, so the cause comes first. Three: the same ten stores, where the five with the most promotion are also in busy areas, another possible cause of their higher sales"
    >
      {panels.map((px, i) => (
        <Key key={i} x={px} y={20} fill={i === 2 ? COUNTER : INK3}>{`0${i + 1}`}</Key>
      ))}
      {scatter(panels[0], false)}
      {timeline(panels[1])}
      {scatter(panels[2], true)}
      {[1, 2].map((i) => (
        <line key={i} x1={r2(panels[i] - gap / 2)} y1={12} x2={r2(panels[i] - gap / 2)} y2={200} stroke={RULE} strokeWidth={1} />
      ))}
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Elements of an Experiment
   -------------------------------------------------------------------------- */

/** An arrow from (x1, y1) to (x2, y2) with an open head at the target. */
function Arrow({
  x1,
  y1,
  x2,
  y2,
  stroke = INK,
  width = 1.25,
  dash,
  s = 7,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stroke?: string;
  width?: number;
  dash?: string;
  s?: number;
}) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth={width} strokeDasharray={dash} />
      <path d={headAlong(x2, y2, x2 - x1, y2 - y1, s)} fill="none" stroke={stroke} strokeWidth={width} />
    </g>
  );
}

/**
 * The anatomy of an experiment: eight test units are split into a treatment
 * group, which gets the price reduction, and a control group, which keeps the
 * current price. The season, an extraneous variable, reaches both groups
 * alike; the dependent variable, purchases, is measured in each.
 */
export function ExperimentAnatomy() {
  const rowT = 96;
  const rowC = 206;
  const px = [212, 238, 264, 290];
  const tagX = 372;
  const barX = 468;
  return (
    <Frame
      width={640}
      height={250}
      label="Eight test units are divided into a treatment group of four, which receives a 20 percent price reduction, and a control group of four, which keeps the current price of 6 dollars. The season, an extraneous variable, affects both groups. Purchases, the dependent variable, are measured in each group and are higher in the treatment group"
    >
      <Key x={20} y={22}>TEST UNITS</Key>
      <Key x={tagX} y={22} anchor="middle" fill={SIGNAL}>INDEPENDENT VARIABLE</Key>
      <Key x={barX} y={22}>DEPENDENT VARIABLE</Key>

      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <Person1 key={i} x={r2(38 + (i % 4) * 24)} y={i < 4 ? 138 : 176} k={0.72} width={1.25} stroke={INK2} />
      ))}
      <Arrow x1={136} y1={140} x2={194} y2={rowT - 14} />
      <Arrow x1={136} y1={160} x2={194} y2={rowC - 14} />

      <Key x={200} y={50} fill={SIGNAL}>TREATMENT GROUP</Key>
      <Key x={200} y={238}>CONTROL GROUP</Key>
      {px.map((x) => (
        <g key={x}>
          <Person1 x={x} y={rowT} k={0.72} width={1.25} stroke={SIGNAL} />
          <Person1 x={x} y={rowC} k={0.72} width={1.25} stroke={INK2} />
        </g>
      ))}

      {/* the season reaches both groups */}
      <Sun x={237} y={137} size={26} weight="regular" color={COUNTER} />
      <Key x={274} y={154} fill={COUNTER}>EXTRANEOUS VARIABLE</Key>
      <Arrow x1={250} y1={134} x2={250} y2={104} stroke={COUNTER} dash="3 3" s={6} />
      <Arrow x1={250} y1={166} x2={250} y2={178} stroke={COUNTER} dash="3 3" s={6} />

      <PriceTag cx={tagX} cy={rowT - 14} text={"\u221220%"} tone={SIGNAL} />
      <PriceTag cx={tagX} cy={rowC - 14} text="$6.00" />
      <Arrow x1={306} y1={rowT - 14} x2={338} y2={rowT - 14} stroke={SIGNAL} />
      <Arrow x1={306} y1={rowC - 14} x2={338} y2={rowC - 14} />

      <Arrow x1={408} y1={rowT - 14} x2={460} y2={rowT - 14} stroke={SIGNAL} />
      <Arrow x1={408} y1={rowC - 14} x2={460} y2={rowC - 14} />
      <rect x={barX} y={rowT - 26} width={148} height={24} fill={SIGNAL} />
      <rect x={barX} y={rowC - 26} width={84} height={24} fill={RULE2} />
      <Key x={barX} y={rowT + 14} size={9.5} fill={INK3}>PURCHASES</Key>
      <Key x={barX} y={rowC + 14} size={9.5} fill={INK3}>PURCHASES</Key>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Random Assignment
   -------------------------------------------------------------------------- */

/** Forty customers; the sixteen heavy buyers are a characteristic nobody measured. */
const HEAVY = new Set([1, 3, 4, 8, 11, 13, 14, 17, 20, 22, 27, 29, 31, 34, 36, 39]);
/** Assignments made before anyone presses the button, so the strip already reads. */
const PRE_ASSIGNED = 29;

/** Random assignment number k: a shuffle of the forty, the first twenty to treatment. */
function assign(k: number) {
  const u = seeded(4101 + k * 7919);
  const idx = Array.from({ length: 40 }, (_, i) => i);
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(u() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  const t = idx.slice(0, 20).sort((a, b) => a - b);
  const c = idx.slice(20).sort((a, b) => a - b);
  const ht = t.filter((i) => HEAVY.has(i)).length;
  return { t, c, ht, hc: 16 - ht, diff: ht - (16 - ht) };
}

/**
 * Random assignment balances what was never measured: forty customers, of
 * whom sixteen are heavy buyers, are split at random into two groups of
 * twenty. One split can be uneven, but across repeated assignments the
 * difference in heavy buyers between the groups centres on zero.
 */
export function RandomBalance() {
  const [n, setN] = useState(PRE_ASSIGNED);
  const all = React.useMemo(() => Array.from({ length: n }, (_, k) => assign(k)), [n]);
  const now = all[all.length - 1];
  const avg = all.reduce((a, b) => a + b.diff, 0) / all.length;

  const groups = [
    { name: "TREATMENT GROUP", ids: now.t, heavy: now.ht, x: 20, tone: SIGNAL },
    { name: "CONTROL GROUP", ids: now.c, heavy: now.hc, x: 340, tone: INK2 },
  ];

  const x0 = 60;
  const x1 = 580;
  const lim = 10;
  const X = (v: number) => r2(x0 + ((v + lim) / (2 * lim)) * (x1 - x0));
  const base = 318;
  const counts = new Map<number, number>();
  all.forEach((a) => counts.set(a.diff, (counts.get(a.diff) ?? 0) + 1));
  const step = Math.min(8, 100 / Math.max(...counts.values()));
  const stacks = new Map<number, number>();
  const dots = all.map((a, k) => {
    const level = stacks.get(a.diff) ?? 0;
    stacks.set(a.diff, level + 1);
    return { x: X(a.diff), y: r2(base - 6 - level * step), last: k === all.length - 1 };
  });
  const signedN = (v: number) => (v > 0 ? `+${v}` : v < 0 ? `\u2212${Math.abs(v)}` : "0");

  return (
    <div>
      <Frame
        width={640}
        height={356}
        label={`Forty customers, sixteen of them heavy buyers, a characteristic that was not measured, are assigned at random to two groups of twenty. In assignment ${n}, the treatment group has ${now.ht} heavy buyers and the control group ${now.hc}. Across ${n} random assignments, the difference averages ${avg.toFixed(1)}, close to zero`}
      >
        {groups.map((g) => (
          <g key={g.name}>
            <Key x={g.x} y={22} fill={g.tone}>{g.name}</Key>
            <Key x={g.x + 280} y={22} anchor="end" fill={COUNTER}>{`${g.heavy} HEAVY BUYERS`}</Key>
            {g.ids.map((id, i) => {
              const h = HEAVY.has(id);
              return (
                <Person1
                  key={id}
                  x={r2(g.x + 14 + (i % 10) * 28)}
                  y={i < 10 ? 70 : 116}
                  k={0.74}
                  width={1.25}
                  stroke={h ? COUNTER : INK3}
                  fill={h ? COUNTER : PAPER}
                />
              );
            })}
          </g>
        ))}
        <line x1={320} y1={8} x2={320} y2={124} stroke={RULE} strokeWidth={1} />
        <Key x={20} y={152} fill={COUNTER} size={10}>HEAVY BUYER · NOT MEASURED</Key>

        <line x1={20} y1={168} x2={620} y2={168} stroke={RULE} strokeWidth={1} />
        <Key x={20} y={192}>{`DIFFERENCE IN HEAVY BUYERS, TREATMENT \u2212 CONTROL · ${n} ASSIGNMENTS`}</Key>
        <Key x={620} y={192} anchor="end" fill={SIGNAL}>{`AVERAGE ${avg >= 0 ? "+" : "\u2212"}${Math.abs(avg).toFixed(1)}`}</Key>
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.last ? 4 : 3.3} fill={d.last ? SIGNAL : INK3} fillOpacity={d.last ? 1 : 0.6} />
        ))}
        <line x1={x0 - 10} y1={base} x2={x1 + 12} y2={base} stroke={INK} strokeWidth={1.25} />
        <path d={head.right(x1 + 12, base, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
        {[-10, -5, 0, 5, 10].map((v) => (
          <g key={v}>
            <line x1={X(v)} y1={base} x2={X(v)} y2={base + 4} stroke={INK} strokeWidth={1} />
            <Key x={X(v)} y={base + 22} anchor="middle" fill={v === 0 ? INK : INK3} size={9.5}>{signedN(v)}</Key>
          </g>
        ))}
        <path d={`M${X(avg)} ${base + 3}l5 8h-10Z`} fill={SIGNAL} />
      </Frame>
      <div className="mt-2 flex items-center gap-3 px-1">
        <PlateButton onClick={() => setN((v) => Math.min(v + 1, 150))}>Assign again at random</PlateButton>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Threats to Internal Validity
   -------------------------------------------------------------------------- */

const CONTROLS = [
  { id: "control", label: "Control group" },
  { id: "random", label: "Random assignment" },
] as const;
type ControlId = (typeof CONTROLS)[number]["id"];

/**
 * What a before–after change in sales contains. A new promotion runs in
 * stores that volunteered; their sales change is the true effect plus a
 * competitor's price cut (history), growing familiarity (maturation) and the
 * volunteers' own head start (selection bias). A control group cancels what
 * reaches both groups; random assignment removes the head start.
 */
export function ThreatsAndControls() {
  const [on, setOn] = useState<ControlId[]>([]);
  const control = on.includes("control");
  const random = on.includes("random");
  const rows = [
    { name: "TREATMENT EFFECT", note: "the new promotion", v: 6, kept: true, why: "" },
    { name: "HISTORY", note: "a competitor\u2019s price cut", v: -4, kept: !control, why: "CANCELLED BY THE CONTROL GROUP" },
    { name: "MATURATION", note: "growing familiarity", v: 3, kept: !control, why: "CANCELLED BY THE CONTROL GROUP" },
    { name: "SELECTION BIAS", note: "the stores volunteered", v: 5, kept: !random, why: "REMOVED BY RANDOM ASSIGNMENT" },
  ];
  const est = rows.filter((r) => r.kept).reduce((a, r) => a + r.v, 0);

  const zx = 272;
  const k = 18;
  const X = (v: number) => r2(zx + v * k);
  const y0 = 64;
  const dy = 44;
  const sumY = y0 + rows.length * dy + 22;
  const pct = (v: number) => `${v > 0 ? "+" : v < 0 ? "\u2212" : ""}${Math.abs(v)}%`;

  return (
    <div>
      <Frame
        width={640}
        height={338}
        label={`A promotion is tested in stores that volunteered. The true effect on sales is plus 6 percent. ${
          control ? "A control group cancels history and maturation. " : "Without a control group, history (minus 4 percent) and maturation (plus 3 percent) stay in the estimate. "
        }${random ? "Random assignment removes selection bias. " : "Without random assignment, selection bias (plus 5 percent) stays in the estimate. "}The estimated effect is ${pct(est)}`}
      >
        <Key x={20} y={24}>WHAT THE CHANGE IN SALES CONTAINS</Key>
        <line x1={zx} y1={40} x2={zx} y2={sumY + 12} stroke={INK} strokeWidth={1.25} />
        <Key x={zx} y={36} anchor="middle" size={9.5}>0</Key>
        {rows.map((r, i) => {
          const y = y0 + i * dy;
          const lo = Math.min(X(0), X(r.v));
          const w = Math.abs(X(r.v) - X(0));
          const tone = i === 0 ? SIGNAL : COUNTER;
          return (
            <g key={r.name}>
              <Key x={20} y={y} fill={r.kept ? (i === 0 ? SIGNAL : INK2) : INK3}>{r.name}</Key>
              <Note x={20} y={y + 15} size={11.5} fill={INK3}>{r.note}</Note>
              <rect
                x={lo}
                y={y - 11}
                width={w}
                height={22}
                fill={r.kept ? tone : "none"}
                fillOpacity={r.kept && i > 0 ? 0.85 : 1}
                stroke={r.kept ? "none" : INK3}
                strokeWidth={1}
                strokeDasharray="3 3"
              />
              <Key x={r.v < 0 ? lo - 8 : lo + w + 8} y={y + 5} anchor={r.v < 0 ? "end" : "start"} fill={r.kept ? INK : INK3}>
                {pct(r.v)}
              </Key>
              {!r.kept ? (
                <Key x={620} y={y + 5} anchor="end" fill={INK3} size={9.5}>{r.why}</Key>
              ) : null}
            </g>
          );
        })}
        <line x1={20} y1={sumY - 22} x2={620} y2={sumY - 22} stroke={RULE} strokeWidth={1} />
        <Key x={20} y={sumY + 5} fill={INK}>ESTIMATED EFFECT</Key>
        <rect
          x={Math.min(X(0), X(est))}
          y={sumY - 11}
          width={Math.abs(X(est) - X(0))}
          height={22}
          fill={est === 6 ? SIGNAL : INK2}
        />
        <Display x={r2(Math.max(X(0), X(est)) + 10)} y={sumY + 9} size={24} fill={est === 6 ? SIGNAL : INK}>
          {pct(est)}
        </Display>
        <Key x={zx + 8} y={sumY + 32} fill={est === 6 ? SIGNAL : COUNTER}>
          {est === 6 ? "EQUALS THE TRUE EFFECT" : `OFF BY ${pct(est - 6)}`}
        </Key>
      </Frame>
      <Toggles label="Add" options={[...CONTROLS]} value={on} onChange={setOn} allowNone />
    </div>
  );
}

/* --------------------------------------------------------------------------
   External Validity
   -------------------------------------------------------------------------- */

/**
 * Three ways a result may fail to travel: from student participants to the
 * target market's consumers, from an online study at a desk to a real store,
 * and from a winter test to a summer market. Each pair is joined by a dashed
 * arrow: the step external validity asks about.
 */
export function GeneralizeThreeWays() {
  const w = 236;
  const gap = 26;
  const panels = [0, 1, 2].map((i) => 20 + i * (w + gap));
  const mid = 86;
  const bridge = (px: number) => (
    <Arrow x1={px + 92} y1={mid} x2={px + 144} y2={mid} stroke={COUNTER} dash="4 3" />
  );
  return (
    <Frame
      width={800}
      height={140}
      label="Three steps a result may not survive. People: from student participants to the varied consumers of the target market. Settings: from an online study at a desk to a real store. Times: from a test in winter to the market in summer"
    >
      {["PEOPLE", "SETTINGS", "TIMES"].map((k, i) => (
        <Key key={k} x={panels[i]} y={22}>{k}</Key>
      ))}
      {[1, 2].map((i) => (
        <line key={i} x1={r2(panels[i] - gap / 2)} y1={10} x2={r2(panels[i] - gap / 2)} y2={130} stroke={RULE} strokeWidth={1} />
      ))}

      {/* people: students to target consumers */}
      {[0, 1, 2].map((j) => {
        const x = panels[0] + 20 + j * 27;
        return (
          <g key={j}>
            <Person1 x={x} y={116} k={0.95} width={1.25} stroke={INK2} />
            <GraduationCap x={x - 12} y={64} size={24} weight="regular" color={INK} />
          </g>
        );
      })}
      {bridge(panels[0])}
      {[
        [1.05, 0],
        [0.8, 1],
        [0.95, 2],
      ].map(([k, j]) => (
        <Person1 key={j} x={panels[0] + 164 + j * 28} y={116} k={k} width={1.25} stroke={INK2} />
      ))}

      {/* settings: an online study at a desk to a real store */}
      <Desktop x={panels[1] + 22} y={mid - 26} size={52} weight="regular" color={INK} />
      {bridge(panels[1])}
      <Store1 cx={panels[1] + 196} cy={mid + 2} k={2.6} stroke={INK} />

      {/* times: winter to summer */}
      <Snowflake x={panels[2] + 26} y={mid - 24} size={48} weight="regular" color={INK} />
      {bridge(panels[2])}
      <Sun x={panels[2] + 166} y={mid - 24} size={48} weight="regular" color={INK} />
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Laboratory and Field Experiments
   -------------------------------------------------------------------------- */

/**
 * Laboratory, then field: six package candidates are compared in an online
 * study on screen, two emerge as promising, and those two go into real
 * stores, where one is confirmed.
 */
export function LabThenField() {
  const letters = ["A", "B", "C", "D", "E", "F"];
  const promising = new Set([1, 4]);
  const scrX = 20;
  const scrW = 250;
  return (
    <Frame
      width={640}
      height={214}
      label="A laboratory experiment compares six package designs, A to F, in an online study on screen; B and E are promising. A field experiment then tests B and E in real stores, where B is confirmed"
    >
      <Key x={scrX} y={22} fill={INK2}>LABORATORY EXPERIMENT</Key>
      {/* a monitor holding the online study */}
      <rect x={scrX} y={40} width={scrW} height={120} rx={6} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <path d={`M${scrX + scrW / 2 - 16} 160L${scrX + scrW / 2 - 22} 184H${scrX + scrW / 2 + 22}L${scrX + scrW / 2 + 16} 160`} fill="none" stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
      <line x1={scrX + scrW / 2 - 40} y1={184} x2={scrX + scrW / 2 + 40} y2={184} stroke={INK} strokeWidth={1.5} />
      {letters.map((l, i) => {
        const x = scrX + 30 + i * 38;
        const on = promising.has(i);
        return (
          <g key={l}>
            <Cup1 x={x} y={112} k={1.3} stroke={on ? SIGNAL : INK3} fill={on ? SIGNAL : PAPER} />
            <Key x={x} y={136} anchor="middle" size={10} fill={on ? SIGNAL : INK3}>{l}</Key>
          </g>
        );
      })}

      <Arrow x1={284} y1={100} x2={336} y2={100} stroke={SIGNAL} />

      <Key x={350} y={22} fill={INK2}>FIELD EXPERIMENT</Key>
      {[
        { l: "B", y: 82, win: true },
        { l: "E", y: 160, win: false },
      ].map((r) => (
        <g key={r.l}>
          <Cup1 x={368} y={r.y} k={1.3} stroke={SIGNAL} fill={SIGNAL} />
          <Key x={368} y={r.y + 22} anchor="middle" size={10} fill={SIGNAL}>{r.l}</Key>
          {[0, 1, 2].map((j) => (
            <Store1 key={j} cx={414 + j * 44} cy={r.y - 12} k={1.9} stroke={INK2} />
          ))}
          {r.win ? (
            <g>
              <circle cx={604} cy={r.y - 12} r={13} fill={SIGNAL} />
              <Tick1 cx={604} cy={r.y - 12} s={5.5} />
            </g>
          ) : null}
        </g>
      ))}
      <line x1={350} y1={121} x2={620} y2={121} stroke={RULE} strokeWidth={1} />
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Experimental Designs
   -------------------------------------------------------------------------- */

/** A questionnaire sheet centred on (cx, cy): one measurement of the dependent variable. */
function Sheet({ cx, cy, tone = INK }: { cx: number; cy: number; tone?: string }) {
  return (
    <g>
      <rect x={cx - 9} y={cy - 12} width={18} height={24} rx={1.5} fill={PAPER} stroke={tone} strokeWidth={1.25} />
      {[-5, 0, 5].map((d) => (
        <line key={d} x1={cx - 5} y1={cy + d} x2={cx + 5} y2={cy + d} stroke={tone} strokeWidth={1.1} />
      ))}
    </g>
  );
}

/** Mean purchase intention (1–7) in the four conditions of the two-by-two example. */
const FACTORIAL = {
  lower: { price: 5.0, quality: 5.0 },
  higher: { price: 3.6, quality: 4.8 },
};

/**
 * Three designs. Posttest-only: two randomly assigned groups, measured once
 * after the treatment. Pretest–posttest: each group is also measured before,
 * and that first questionnaire may itself change the answers. Factorial: two
 * prices crossed with two messages; the quality message helps only at the
 * higher price, an interaction.
 */
export function DesignRows() {
  const rows = [
    { y: 64, tone: SIGNAL, treat: true },
    { y: 116, tone: INK2, treat: false },
  ];
  const group = (x: number, y: number, tone: string) => (
    <g>
      <Person1 x={x} y={y + 12} k={0.62} width={1.25} stroke={tone} />
      <Person1 x={x + 16} y={y + 12} k={0.62} width={1.25} stroke={tone} />
    </g>
  );
  const tag = (cx: number, y: number) => <PriceTag cx={cx} cy={y} text={"\u221220%"} tone={SIGNAL} />;
  const timeAxis = (x1: number, x2: number) => (
    <g>
      <line x1={x1} y1={148} x2={x2} y2={148} stroke={INK} strokeWidth={1.25} />
      <path d={head.right(x2, 148, 6)} fill="none" stroke={INK} strokeWidth={1.25} />
      <Key x={x2} y={164} anchor="end" size={9.5}>TIME</Key>
    </g>
  );

  /* factorial table and plot */
  const tx = 150;
  const cw = 104;
  const ty = 236;
  const rh = 40;
  const px0 = 436;
  const px1 = 540;
  const py = (v: number) => r2(344 - (v - 3) * 44);
  return (
    <Frame
      width={640}
      height={372}
      label="Three experimental designs. Posttest-only control group design: a treatment group receives a 20 percent price reduction and both groups are measured once, afterwards. Pretest-posttest control group design: both groups are also measured before the treatment, and that pretest may cause a testing effect. Factorial design, two by two: lower and higher price crossed with a price-focused and a quality-focused message. At the lower price both messages give a mean purchase intention of 5.0; at the higher price the quality-focused message gives 4.8 against 3.6, an interaction"
    >
      {/* posttest-only */}
      <Key x={20} y={22}>POSTTEST-ONLY</Key>
      {rows.map((r) => (
        <g key={r.y}>
          {group(28, r.y, r.tone)}
          {r.treat ? tag(150, r.y) : null}
          <Arrow x1={70} y1={r.y} x2={r.treat ? 114 : 222} y2={r.y} stroke={RULE2} s={5} />
          {r.treat ? <Arrow x1={186} y1={r.y} x2={222} y2={r.y} stroke={RULE2} s={5} /> : null}
          <Sheet cx={240} cy={r.y} tone={r.tone} />
        </g>
      ))}
      {timeAxis(20, 280)}

      <line x1={310} y1={10} x2={310} y2={170} stroke={RULE} strokeWidth={1} />

      {/* pretest-posttest */}
      <Key x={330} y={22}>PRETEST-POSTTEST</Key>
      {rows.map((r) => (
        <g key={r.y}>
          {group(338, r.y, r.tone)}
          <Arrow x1={380} y1={r.y} x2={400} y2={r.y} stroke={RULE2} s={5} />
          <Sheet cx={416} cy={r.y} tone={COUNTER} />
          {r.treat ? tag(490, r.y) : null}
          <Arrow x1={432} y1={r.y} x2={r.treat ? 454 : 574} y2={r.y} stroke={RULE2} s={5} />
          {r.treat ? <Arrow x1={526} y1={r.y} x2={574} y2={r.y} stroke={RULE2} s={5} /> : null}
          <Sheet cx={592} cy={r.y} tone={r.tone} />
        </g>
      ))}
      <Key x={416} y={40} anchor="middle" fill={COUNTER} size={9.5}>TESTING EFFECT?</Key>
      {timeAxis(330, 620)}

      <line x1={20} y1={186} x2={620} y2={186} stroke={RULE} strokeWidth={1} />

      {/* factorial */}
      <Key x={20} y={210}>{"FACTORIAL \u00b7 2 \u00d7 2"}</Key>
      <Key x={tx + cw / 2} y={ty - 8} anchor="middle" size={9.5}>PRICE MESSAGE</Key>
      <Key x={tx + cw * 1.5} y={ty - 8} anchor="middle" size={9.5} fill={SIGNAL}>QUALITY MESSAGE</Key>
      {(["lower", "higher"] as const).map((p, i) => {
        const y = ty + i * rh;
        return (
          <g key={p}>
            <Key x={tx - 12} y={y + 25} anchor="end" size={9.5}>{p === "lower" ? "LOWER PRICE" : "HIGHER PRICE"}</Key>
            {(["price", "quality"] as const).map((m, j) => {
              const hot = p === "higher" && m === "quality";
              return (
                <g key={m}>
                  <rect x={tx + j * cw} y={y} width={cw} height={rh} fill={hot ? SIGNAL_TINT : PAPER} stroke={RULE2} strokeWidth={1} />
                  <Display x={tx + j * cw + cw / 2} y={y + 28} anchor="middle" size={20} fill={hot ? SIGNAL : INK}>
                    {FACTORIAL[p][m].toFixed(1)}
                  </Display>
                </g>
              );
            })}
          </g>
        );
      })}
      <Key x={tx} y={ty + 2 * rh + 20} size={9.5} fill={INK3}>{"MEAN PURCHASE INTENTION, 1\u20137"}</Key>

      {/* interaction plot */}
      <line x1={px0 - 20} y1={344} x2={px1 + 20} y2={344} stroke={INK} strokeWidth={1.25} />
      <line x1={px0 - 20} y1={344} x2={px0 - 20} y2={206} stroke={INK} strokeWidth={1.25} />
      <path d={head.up(px0 - 20, 206, 6)} fill="none" stroke={INK} strokeWidth={1.25} />
      <Key x={px0} y={362} anchor="middle" size={9.5}>LOWER PRICE</Key>
      <Key x={px1} y={362} anchor="middle" size={9.5}>HIGHER PRICE</Key>
      <line x1={px0} y1={py(5.0)} x2={px1} y2={py(3.6)} stroke={INK3} strokeWidth={2} />
      <line x1={px0} y1={py(5.0) + 0} x2={px1} y2={py(4.8)} stroke={SIGNAL} strokeWidth={2} />
      {[
        [px0, 5.0, SIGNAL],
        [px1, 3.6, INK3],
        [px1, 4.8, SIGNAL],
      ].map(([x, v, c], i) => (
        <circle key={i} cx={x as number} cy={py(v as number)} r={4} fill={c as string} />
      ))}
      <Key x={px1 + 12} y={py(4.8) + 4} size={9.5} fill={SIGNAL}>QUALITY</Key>
      <Key x={px1 + 12} y={py(3.6) + 4} size={9.5} fill={INK3}>PRICE</Key>
      <Key x={px0 - 12} y={216} size={9.5} fill={INK3}>INTENTION</Key>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   A/B Testing
   -------------------------------------------------------------------------- */

/**
 * A web page drawn as a browser window at (x, y), w wide: a headline bar,
 * an image and a button. `change` fills the button, the element version B
 * alters; `headline` and `image` pick among drawn variants for the
 * multivariate grid.
 */
function Page({
  x,
  y,
  w = 150,
  tone = INK,
  button = "plain",
  headline = 0,
  image = 0,
  label,
  accent,
}: {
  x: number;
  y: number;
  w?: number;
  tone?: string;
  /** Button wording drawn as a short (0) or long (1) line, for the multivariate grid. */
  label?: number;
  /** Colour of a filled button, when it differs from the page's outline. */
  accent?: string;
  button?: "plain" | "filled";
  headline?: number;
  image?: number;
}) {
  const h = r2(w * 0.8);
  const u = w / 150;
  const s = (n: number) => r2(n * u);
  const hl = [0.62, 0.78, 0.48][headline];
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={s(4)} fill={PAPER} stroke={tone} strokeWidth={1.25} />
      <line x1={x} y1={r2(y + s(14))} x2={x + w} y2={r2(y + s(14))} stroke={tone} strokeWidth={1} />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={r2(x + s(9 + i * 8))} cy={r2(y + s(7))} r={s(2)} fill={tone} />
      ))}
      <rect x={r2(x + s(14))} y={r2(y + s(24))} width={r2((w - s(28)) * hl)} height={s(8)} fill={tone} />
      {image === 0 ? (
        <rect x={r2(x + s(14))} y={r2(y + s(40))} width={r2(w - s(28))} height={s(38)} fill={PAPER3} />
      ) : (
        <circle cx={r2(x + w / 2)} cy={r2(y + s(59))} r={s(19)} fill={PAPER3} />
      )}
      <rect
        x={r2(x + w / 2 - s(26))}
        y={r2(y + s(88))}
        width={s(52)}
        height={s(18)}
        rx={s(3)}
        fill={button === "filled" ? (accent ?? tone) : PAPER}
        stroke={button === "filled" ? (accent ?? tone) : tone}
        strokeWidth={1.25}
      />
      {label !== undefined ? (
        <line
          x1={r2(x + w / 2 - s(label ? 17 : 8))}
          y1={r2(y + s(97))}
          x2={r2(x + w / 2 + s(label ? 17 : 8))}
          y2={r2(y + s(97))}
          stroke={tone}
          strokeWidth={s(3)}
        />
      ) : null}
    </g>
  );
}

/** The order in which sixteen arriving users were assigned: 1 = version B. */
const AB_ORDER = [0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1];

/**
 * An A/B test: arriving users are assigned at random, one by one, to version
 * A, the current page, or version B, the same page with a new button. The
 * primary metric, the conversion rate, is compared between the two groups.
 */
export function AbSplit() {
  return (
    <Frame
      width={640}
      height={248}
      label="Sixteen arriving users are assigned at random to version A, the current page, or version B, the same page with a filled button. Eight see each version. The conversion rate is 3.1 percent for version A and 3.6 percent for version B"
    >
      <Key x={20} y={22}>USERS, ASSIGNED AT RANDOM AS THEY ARRIVE</Key>
      {AB_ORDER.map((b, i) => (
        <Person1 key={i} x={r2(36 + i * 37.8)} y={70} k={0.78} width={1.25} stroke={b ? SIGNAL : INK2} fill={PAPER} />
      ))}
      {[
        { x: 60, name: "VERSION A \u00b7 CONTROL", tone: INK2, button: "plain" as const, rate: "3.1%" },
        { x: 350, name: "VERSION B \u00b7 CHANGE", tone: SIGNAL, button: "filled" as const, rate: "3.6%" },
      ].map((v) => (
        <g key={v.name}>
          <Key x={v.x} y={110} fill={v.tone}>{v.name}</Key>
          <Page x={v.x} y={122} w={140} tone={INK2} accent={SIGNAL} button={v.button} />
          <Key x={v.x + 156} y={176} fill={INK3} size={9.5}>CONVERSION RATE</Key>
          <Display x={v.x + 156} y={206} size={30} fill={v.tone === SIGNAL ? SIGNAL : INK}>{v.rate}</Display>
        </g>
      ))}
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Designing an A/B Test
   -------------------------------------------------------------------------- */

const POWERS = [
  { id: "80", label: "80%" },
  { id: "90", label: "90%" },
] as const;
type PowerId = (typeof POWERS)[number]["id"];

const BASE_RATE = 0.04;
const DAILY_USERS = 6000;

/** Users per version for a two-sided test at alpha 0.05 of a lift of `lift` (a proportion) over the baseline. */
function usersPerVersion(lift: number, power: PowerId) {
  const z = 1.96 + (power === "80" ? 0.8416 : 1.2816);
  const p2 = BASE_RATE + lift;
  return Math.ceil((z * z * (BASE_RATE * (1 - BASE_RATE) + p2 * (1 - p2))) / (lift * lift));
}

/**
 * Planning an A/B test: the smallest lift worth detecting and the power set
 * the users needed per version; at 6,000 users a day that fixes the days, and
 * the run is extended to whole weeks so every weekday is represented. Halving
 * the smallest effect roughly quadruples the users.
 */
export function TestPlanner() {
  const [tenths, setTenths] = useState(5);
  const [power, setPower] = useState<PowerId>("80");
  const lift = tenths / 1000;
  const n = usersPerVersion(lift, power);
  const days = Math.ceil((2 * n) / DAILY_USERS);
  const weeks = Math.max(1, Math.ceil(days / 7));
  const fmt = (v: number) => v.toLocaleString("en-US");

  const cx0 = 92;
  const cw = 70;
  const ch = 30;
  const cy0 = 154;
  const dayNames = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  return (
    <div>
      <Frame
        width={640}
        height={352}
        label={`Baseline conversion rate 4.0 percent, 6,000 users a day. To detect a lift of ${(tenths / 10).toFixed(1)} percentage points with ${power} percent power requires ${fmt(n)} users per version, ${days} days of traffic, so the test runs for ${weeks} complete ${weeks === 1 ? "week" : "weeks"}`}
      >
        <Key x={20} y={22}>{`BASELINE CONVERSION 4.0% \u00b7 ${fmt(DAILY_USERS)} USERS A DAY \u00b7 ALPHA 0.05`}</Key>
        <Key x={20} y={54} fill={INK3} size={10}>SMALLEST EFFECT WORTH DETECTING</Key>
        <Display x={20} y={88} size={28}>{`+${(tenths / 10).toFixed(1)} points`}</Display>
        <Key x={290} y={54} fill={INK3} size={10}>USERS PER VERSION</Key>
        <Display x={290} y={88} size={28} fill={SIGNAL}>{fmt(n)}</Display>
        <Key x={620} y={54} anchor="end" fill={INK3} size={10}>DURATION</Key>
        <Display x={620} y={88} anchor="end" size={28} fill={SIGNAL}>{`${weeks} ${weeks === 1 ? "week" : "weeks"}`}</Display>

        <line x1={20} y1={110} x2={620} y2={110} stroke={RULE} strokeWidth={1} />
        {dayNames.map((d, i) => (
          <Key key={d} x={r2(cx0 + i * cw + cw / 2)} y={140} anchor="middle" size={9.5}>{d}</Key>
        ))}
        {Array.from({ length: 5 }, (_, w) => (
          <g key={w}>
            <Key x={20} y={r2(cy0 + w * (ch + 4) + ch / 2 + 4)} size={9.5} fill={w < weeks ? INK2 : INK3}>{`WEEK ${w + 1}`}</Key>
            {dayNames.map((_, d) => {
              const k = w * 7 + d;
              const need = k < days;
              const pad = !need && w < weeks;
              return (
                <rect
                  key={d}
                  x={r2(cx0 + d * cw + 2)}
                  y={r2(cy0 + w * (ch + 4))}
                  width={cw - 4}
                  height={ch}
                  fill={need ? SIGNAL : pad ? SIGNAL_TINT : PAPER}
                  stroke={need || pad ? SIGNAL : RULE2}
                  strokeWidth={1}
                />
              );
            })}
          </g>
        ))}
        {days % 7 !== 0 ? (
          <Key x={r2(cx0 + 7 * cw)} y={344} anchor="end" size={9.5} fill={SIGNAL}>
            {`${days} ${days === 1 ? "DAY" : "DAYS"} OF TRAFFIC, EXTENDED TO COMPLETE THE WEEKLY CYCLE`}
          </Key>
        ) : (
          <Key x={r2(cx0 + 7 * cw)} y={344} anchor="end" size={9.5} fill={SIGNAL}>{`${days} DAYS OF TRAFFIC`}</Key>
        )}
      </Frame>
      <Slider label="Smallest effect worth detecting" value={tenths} min={3} max={10} onChange={setTenths} showValue={false} />
      <Segmented label="Statistical power" options={[...POWERS]} value={power} onChange={setPower} />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Multivariate Testing
   -------------------------------------------------------------------------- */

const ELEMENTS = [
  { id: "headline", label: "3 headlines" },
  { id: "image", label: "2 images" },
  { id: "button", label: "2 button labels" },
] as const;
type ElementId = (typeof ELEMENTS)[number]["id"];

const MVT_VISITORS = 120000;

/**
 * Every combination of the elements that vary, drawn as its own page. Each
 * element added multiplies the combinations, and the same 120,000 visitors
 * are divided among them: with all three varying, twelve pages share the
 * traffic that an A/B test splits in two.
 */
export function CombinationGrid() {
  const [on, setOn] = useState<ElementId[]>(["headline", "image", "button"]);
  const hs = on.includes("headline") ? [0, 1, 2] : [0];
  const is = on.includes("image") ? [0, 1] : [0];
  const bs = on.includes("button") ? [0, 1] : [0];
  const combos = hs.flatMap((h) => is.flatMap((i) => bs.map((b) => ({ h, i, b }))));
  const n = combos.length;
  const each = Math.floor(MVT_VISITORS / n);
  const fmt = (v: number) => v.toLocaleString("en-US");

  const pw = 80;
  const cols = 6;
  const gx = 20;
  const gy = 20;
  const rowsUsed = Math.ceil(n / cols);
  const inRow = (r: number) => Math.min(cols, n - r * cols);
  return (
    <div>
      <Frame
        width={640}
        height={272}
        label={`${n} combinations of ${on.map((o) => ELEMENTS.find((e) => e.id === o)!.label).join(", ")}. The same ${fmt(MVT_VISITORS)} visitors are divided among them, ${fmt(each)} per combination, against ${fmt(MVT_VISITORS / 2)} per version in an A/B test`}
      >
        <Key x={20} y={22}>{`${fmt(MVT_VISITORS)} VISITORS`}</Key>
        <Display x={20} y={58} size={28} fill={SIGNAL}>{`${n} combinations`}</Display>
        <Key x={620} y={22} anchor="end" fill={INK3}>USERS PER COMBINATION</Key>
        <Display x={620} y={58} anchor="end" size={28} fill={SIGNAL}>{fmt(each)}</Display>
        <Key x={620} y={78} anchor="end" fill={INK3} size={9.5}>{`A/B TEST: ${fmt(MVT_VISITORS / 2)} PER VERSION`}</Key>
        {combos.map((c, k) => {
          const r = Math.floor(k / cols);
          const m = inRow(r);
          const x0 = 320 - (m * pw + (m - 1) * gx) / 2;
          const x = r2(x0 + (k % cols) * (pw + gx));
          const y = r2(104 + r * (64 + gy) + (rowsUsed === 1 ? 42 : 0));
          return (
            <g key={`${c.h}${c.i}${c.b}`}>
              <Page x={x} y={y} w={pw} tone={INK2} headline={c.h} image={c.i} label={on.includes("button") ? c.b : undefined} />
            </g>
          );
        })}
      </Frame>
      <Toggles label="Elements that vary" options={[...ELEMENTS]} value={on} onChange={setOn} />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Common Errors in A/B Testing
   -------------------------------------------------------------------------- */

/** A seeded standard-normal stream (Box–Muller). */
function normals(seed: number) {
  const u = seeded(seed);
  return () => {
    let a = 0;
    while (a === 0) a = u();
    return Math.sqrt(-2 * Math.log(a)) * Math.cos(2 * Math.PI * u());
  };
}

const PEEK_DAYS = 28;
const PEEK_TESTS = 200;
const PEEK_SHOWN = 20;

/**
 * Two hundred simulated A/B tests of two identical versions, 28 days each:
 * the test statistic z after each day. Seed 56 gives the expected rates,
 * 10 of 200 significant at the end and 51 of 200 significant on some day.
 */
const PEEK_PATHS = (() => {
  const z = normals(56);
  return Array.from({ length: PEEK_TESTS }, () => {
    let sum = 0;
    return Array.from({ length: PEEK_DAYS }, (_, t) => {
      sum += z();
      return sum / Math.sqrt(t + 1);
    });
  });
})();
const firstCross = (p: number[]) => p.findIndex((v) => Math.abs(v) >= 1.96);

const PEEK_MODES = [
  { id: "end", label: "Once, at the planned end" },
  { id: "daily", label: "Every day, stop when significant" },
] as const;
type PeekMode = (typeof PEEK_MODES)[number]["id"];

/**
 * Peeking: both versions are identical, so every significant result is a
 * Type I error. Checked once at the planned end, about 5 in 100 tests cross
 * the threshold. Checked every day and stopped at the first crossing, about
 * a quarter do.
 */
export function PeekingPaths() {
  const [mode, setMode] = useState<PeekMode>("end");
  const daily = mode === "daily";
  const fp = PEEK_PATHS.filter((p) => (daily ? firstCross(p) >= 0 : Math.abs(p[PEEK_DAYS - 1]) >= 1.96)).length;

  const x0 = 30;
  const x1 = 520;
  const X = (d: number) => r2(x0 + (d / (PEEK_DAYS - 1)) * (x1 - x0));
  const mid = 160;
  const k = 23;
  const lim = 4.2;
  const Y = (v: number) => r2(mid - Math.max(-lim, Math.min(lim, v)) * k);
  const shown = PEEK_PATHS.slice(0, PEEK_SHOWN);

  return (
    <div>
      <Frame
        width={640}
        height={344}
        label={`Simulated A/B tests of two identical versions over 28 days, showing the test statistic after each day for 20 of 200 tests. ${
          daily ? "Checked every day and stopped at the first significant result" : "Checked once at the planned end"
        }, ${fp} of 200 tests, ${Math.round((fp / PEEK_TESTS) * 100)} percent, report a difference that does not exist`}
      >
        <Key x={20} y={22}>{"TWO IDENTICAL VERSIONS \u00b7 TEST STATISTIC AFTER EACH DAY"}</Key>
        <Key x={620} y={22} anchor="end" fill={INK3}>SIMULATED</Key>
        {/* the significance zones */}
        <rect x={x0} y={Y(lim)} width={x1 - x0} height={r2(Y(1.96) - Y(lim))} fill={COUNTER_TINT} />
        <rect x={x0} y={Y(-1.96)} width={x1 - x0} height={r2(Y(-lim) - Y(-1.96))} fill={COUNTER_TINT} />
        {[Y(3.1), Y(-3.1)].map((y) => (
          <g key={y}>
            <Key x={x1 + 22} y={y - 2} fill={COUNTER} size={9.5}>SIGNIFICANT</Key>
            <Key x={x1 + 22} y={y + 12} fill={COUNTER} size={9.5}>{"p < 0.05"}</Key>
          </g>
        ))}
        <line x1={x0} y1={mid} x2={x1} y2={mid} stroke={RULE2} strokeWidth={1} />

        {shown.map((p, i) => {
          const c = firstCross(p);
          const stopAt = daily && c >= 0 ? c : PEEK_DAYS - 1;
          const hit = daily ? c >= 0 : Math.abs(p[PEEK_DAYS - 1]) >= 1.96;
          const d = p
            .slice(0, stopAt + 1)
            .map((v, t) => `${t === 0 ? "M" : "L"}${X(t)} ${Y(v)}`)
            .join("");
          return (
            <g key={i}>
              <path d={d} fill="none" stroke={hit ? COUNTER : INK3} strokeWidth={hit ? 1.6 : 1} strokeOpacity={hit ? 1 : 0.55} strokeLinejoin="round" />
              {hit ? <circle cx={X(stopAt)} cy={Y(p[stopAt])} r={3.6} fill={COUNTER} /> : null}
            </g>
          );
        })}
        {!daily ? (
          <line x1={X(PEEK_DAYS - 1)} y1={Y(lim)} x2={X(PEEK_DAYS - 1)} y2={Y(-lim)} stroke={INK} strokeWidth={1.25} strokeDasharray="4 3" />
        ) : null}

        <line x1={x0} y1={Y(-lim)} x2={x1 + 12} y2={Y(-lim)} stroke={INK} strokeWidth={1.25} />
        <path d={head.right(x1 + 12, Y(-lim), 7)} fill="none" stroke={INK} strokeWidth={1.25} />
        {[1, 7, 14, 21, 28].map((d) => (
          <Key key={d} x={X(d - 1)} y={r2(Y(-lim) + 16)} anchor="middle" size={9.5}>{`DAY ${d}`}</Key>
        ))}
        <line x1={20} y1={300} x2={620} y2={300} stroke={RULE} strokeWidth={1} />
        <Key x={20} y={328} fill={COUNTER}>FALSE POSITIVES</Key>
        <Display x={160} y={332} size={24} fill={COUNTER}>{`${fp} of ${PEEK_TESTS} tests`}</Display>
        <Display x={620} y={332} anchor="end" size={24} fill={COUNTER}>{`${Math.round((fp / PEEK_TESTS) * 100)}%`}</Display>
      </Frame>
      <Segmented label="Check the result" options={[...PEEK_MODES]} value={mode} onChange={setMode} />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Quasi-Experimental Designs
   -------------------------------------------------------------------------- */

/** Week-to-week wobble (thousand dollars) around each region's level; each half sums to zero. */
const WOBBLE_A = [0.6, -0.8, 0.4, -0.3, 0.7, -0.6, -0.5, 0.8, -0.4, 0.6, -0.9, 0.4];
const WOBBLE_B = [-0.5, 0.6, -0.2, 0.7, -0.4, -0.2, 0.5, -0.6, 0.3, -0.3, 0.6, -0.5];
const SALES_A = WOBBLE_A.map((w, i) => (i < 6 ? 100 : 112) + w * 0.5);
const SALES_B = WOBBLE_B.map((w, i) => (i < 6 ? 100 : 105) + w * 0.5);

const QUASI = [
  { id: "series", label: "Time series" },
  { id: "nonequivalent", label: "Nonequivalent control" },
  { id: "did", label: "Difference-in-differences" },
] as const;
type QuasiId = (typeof QUASI)[number]["id"];

/**
 * Average weekly sales per store in two regions, six weeks before and six
 * after a loyalty program starts in Region A. Each design reads a different
 * comparison from the same data: A's own before and after (+12,000); A
 * against B after the start (+7,000, taking B as comparable); and A's change
 * against B's change (+12,000 − 5,000 = +7,000).
 */
export function QuasiDesigns() {
  const [view, setView] = useState<QuasiId>("did");
  const x0 = 70;
  const x1 = 560;
  const X = (i: number) => r2(x0 + (i / 11) * (x1 - x0));
  const cut = r2((X(5) + X(6)) / 2);
  const Y = (v: number) => r2(262 - (v - 97) * 10.5);
  const line = (v: number[], from: number, to: number) =>
    v.slice(from, to + 1).map((y, i) => `${i === 0 ? "M" : "L"}${X(from + i)} ${Y(y)}`).join("");

  const showA = { before: view !== "nonequivalent", after: true };
  const showB = { before: view === "did", after: view !== "series" };
  const est = view === "series" ? 12 : 7;
  const level = (y: number, from: number, to: number, tone: string) => (
    <line x1={X(from)} y1={Y(y)} x2={X(to)} y2={Y(y)} stroke={tone} strokeWidth={1} strokeDasharray="2 3" />
  );

  return (
    <div>
      <Frame
        width={640}
        height={300}
        label={`Average weekly sales per store, six weeks before and six weeks after a loyalty program starts in Region A. Region A rises from 100,000 to 112,000 dollars, Region B from 100,000 to 105,000. ${
          view === "series"
            ? "The time series design uses Region A alone and attributes its whole rise of 12,000 dollars to the program."
            : view === "nonequivalent"
              ? "The nonequivalent control group design compares Region A with Region B after the start: 7,000 dollars, assuming the regions were otherwise alike."
              : "The difference-in-differences design compares the two changes: 12,000 minus 5,000, or 7,000 dollars."
        }`}
      >
        <Key x={20} y={22}>AVERAGE WEEKLY SALES PER STORE</Key>
        <Key x={620} y={22} anchor="end" fill={SIGNAL}>ESTIMATED EFFECT</Key>
        <Display x={620} y={54} anchor="end" size={28} fill={SIGNAL}>{`+$${est},000`}</Display>

        <rect x={cut} y={64} width={x1 + 10 - cut} height={206} fill={PAPER3} />
        <Key x={r2(cut + 8)} y={80} fill={SIGNAL} size={9.5}>LOYALTY PROGRAM IN REGION A</Key>
        <Key x={r2((x0 + cut) / 2)} y={80} anchor="middle" size={9.5} fill={INK3}>BEFORE</Key>

        {[100, 105, 112].map((v) => (
          <Key key={v} x={x0 - 12} y={r2(Y(v) + 4)} anchor="end" size={9.5} fill={INK3}>{`$${v}K`}</Key>
        ))}

        {/* Region B */}
        {showB.before ? <path d={line(SALES_B, 0, 5)} fill="none" stroke={COUNTER} strokeWidth={1.75} /> : null}
        {showB.after ? <path d={line(SALES_B, 6, 11)} fill="none" stroke={COUNTER} strokeWidth={1.75} /> : null}
        {showB.before && showB.after ? <path d={`M${X(5)} ${Y(SALES_B[5])}L${X(6)} ${Y(SALES_B[6])}`} stroke={COUNTER} strokeWidth={1.75} /> : null}
        {showB.after ? <Key x={X(11) + 10} y={r2(Y(105) + 4)} fill={COUNTER}>REGION B</Key> : null}

        {/* Region A */}
        {showA.before ? <path d={line(SALES_A, 0, 5)} fill="none" stroke={SIGNAL} strokeWidth={2} /> : null}
        <path d={line(SALES_A, 6, 11)} fill="none" stroke={SIGNAL} strokeWidth={2} />
        {showA.before ? <path d={`M${X(5)} ${Y(SALES_A[5])}L${X(6)} ${Y(SALES_A[6])}`} stroke={SIGNAL} strokeWidth={2} /> : null}
        <Key x={X(11) + 10} y={r2(Y(112) + 4)} fill={SIGNAL}>REGION A</Key>

        {/* levels and the comparison each design makes */}
        {level(100, 0, 11, RULE2)}
        {view === "series" ? (
          <g>
            <Arrow x1={X(8)} y1={Y(100)} x2={X(8)} y2={r2(Y(112) + 2)} stroke={SIGNAL} s={6} />
            <Key x={X(8) + 8} y={Y(106)} fill={SIGNAL} size={10}>+12,000</Key>
          </g>
        ) : null}
        {view === "nonequivalent" ? (
          <g>
            <Arrow x1={X(8)} y1={Y(105)} x2={X(8)} y2={r2(Y(112) + 2)} stroke={SIGNAL} s={6} />
            <Key x={X(8) + 8} y={r2(Y(108.5) + 4)} fill={SIGNAL} size={10}>+7,000</Key>
          </g>
        ) : null}
        {view === "did" ? (
          <g>
            <Arrow x1={X(7)} y1={Y(100)} x2={X(7)} y2={r2(Y(105) + 2)} stroke={COUNTER} s={6} />
            <Key x={X(7) + 8} y={r2(Y(102.5) + 4)} fill={COUNTER} size={10}>+5,000</Key>
            <Arrow x1={X(9.5)} y1={Y(100)} x2={X(9.5)} y2={r2(Y(105) + 2)} stroke={COUNTER} dash="3 3" s={6} />
            <Arrow x1={X(9.5)} y1={Y(105)} x2={X(9.5)} y2={r2(Y(112) + 2)} stroke={SIGNAL} s={6} />
            <Key x={X(9.5) + 8} y={r2(Y(102.5) + 4)} fill={COUNTER} size={10}>+5,000</Key>
            <Key x={X(9.5) + 8} y={r2(Y(108.5) + 4)} fill={SIGNAL} size={10}>+7,000</Key>
          </g>
        ) : null}

        <line x1={x0} y1={270} x2={x1 + 20} y2={270} stroke={INK} strokeWidth={1.25} />
        <path d={head.right(x1 + 20, 270, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
        <Key x={x1 + 20} y={290} anchor="end" size={9.5}>WEEKS</Key>
      </Frame>
      <Segmented label="Design" options={[...QUASI]} value={view} onChange={setView} />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Limitations of Quasi-Experiments
   -------------------------------------------------------------------------- */

/**
 * The parallel-trends check. The slider sets how fast Region A's sales were
 * already growing before the program, with the averages before and after
 * unchanged, so the difference-in-differences estimate stays +$7,000. Only
 * the weeks before the program show whether the two regions moved together;
 * if A was already pulling ahead, its earlier trend explains part of the gap.
 */
export function ParallelTrends() {
  const [tenths, setTenths] = useState(0);
  const slope = tenths / 10;
  const a = (t: number) => (t < 6 ? 100 + slope * (t - 2.5) : 112 + slope * (t - 8.5)) + WOBBLE_A[t] * 0.35;
  const b = (t: number) => (t < 6 ? 100 : 105) + WOBBLE_B[t] * 0.35;
  const adjusted = 7 - 6 * slope;
  const parallel = tenths === 0;

  const x0 = 70;
  const x1 = 560;
  const X = (i: number) => r2(x0 + (i / 11) * (x1 - x0));
  const cut = r2((X(5) + X(6)) / 2);
  const Y = (v: number) => r2(262 - (v - 98) * 10);
  const path = (f: (t: number) => number, from: number, to: number) =>
    Array.from({ length: to - from + 1 }, (_, i) => `${i === 0 ? "M" : "L"}${X(from + i)} ${Y(f(from + i))}`).join("");
  const money = (v: number) => `${v < 0 ? "\u2212" : "+"}$${Math.abs(Math.round(v * 1000)).toLocaleString("en-US")}`;

  return (
    <div>
      <Frame
        width={640}
        height={318}
        label={`Average weekly sales per store in two regions. Before the program, Region A ${
          parallel ? "moves in parallel with Region B" : `grows ${Math.abs(slope).toFixed(1)} thousand dollars a week ${slope > 0 ? "faster" : "slower"} than Region B`
        }. The difference-in-differences estimate stays 7,000 dollars; ${
          parallel ? "the parallel trends assumption holds" : `if Region A's earlier trend had continued, the effect would be ${money(adjusted)}`
        }`}
      >
        <Key x={20} y={22}>AVERAGE WEEKLY SALES PER STORE</Key>
        <Key x={620} y={22} anchor="end" fill={INK3}>DIFFERENCE-IN-DIFFERENCES</Key>
        <Display x={620} y={52} anchor="end" size={26}>+$7,000</Display>

        <rect x={cut} y={70} width={x1 + 10 - cut} height={200} fill={PAPER3} />
        <Key x={r2(cut + 8)} y={86} fill={SIGNAL} size={9.5}>LOYALTY PROGRAM IN REGION A</Key>
        <rect x={x0 - 8} y={70} width={r2(cut - x0 + 8)} height={200} fill="none" stroke={parallel ? SIGNAL : COUNTER} strokeWidth={1.25} />
        <Key x={x0} y={86} fill={parallel ? SIGNAL : COUNTER} size={9.5}>
          {parallel ? "BEFORE: TRENDS PARALLEL" : "BEFORE: TRENDS DIFFER"}
        </Key>

        {[100, 105, 112].map((v) => (
          <Key key={v} x={x0 - 16} y={r2(Y(v) + 4)} anchor="end" size={9.5} fill={INK3}>{`$${v}K`}</Key>
        ))}

        {!parallel ? (
          <g>
            <path
              d={path((t) => 105 + slope * (t - 2.5), 6, 11)}
              fill="none"
              stroke={SIGNAL}
              strokeWidth={1.5}
              strokeDasharray="5 4"
            />
            <Key
              x={X(11)}
              y={slope > 0 ? r2(Y(105 + slope * 8.5) - 7) : r2(Y(105 + slope * 8.5) + 18)}
              anchor="end"
              fill={SIGNAL}
              size={9.5}
            >
              A WITHOUT THE PROGRAM
            </Key>
          </g>
        ) : null}
        <path d={path(b, 0, 11)} fill="none" stroke={COUNTER} strokeWidth={1.75} />
        <path d={path(a, 0, 11)} fill="none" stroke={SIGNAL} strokeWidth={2} />
        <Key x={X(11) + 10} y={r2(Y(a(11)) + 4)} fill={SIGNAL}>REGION A</Key>
        <Key x={X(11) + 10} y={r2(Y(b(11)) + 4)} fill={COUNTER}>REGION B</Key>

        <line x1={x0 - 8} y1={270} x2={x1 + 20} y2={270} stroke={INK} strokeWidth={1.25} />
        <path d={head.right(x1 + 20, 270, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
        <Key x={x1 + 20} y={290} anchor="end" size={9.5}>WEEKS</Key>
        <Key x={20} y={308} fill={parallel ? SIGNAL : COUNTER} size={10}>
          {parallel ? "B\u2019S CHANGE STANDS IN FOR A WITHOUT THE PROGRAM" : `IF A\u2019S EARLIER TREND HAD CONTINUED, THE EFFECT WOULD BE ${money(adjusted)}`}
        </Key>
      </Frame>
      <Slider
        label="Region A's growth before the program"
        value={tenths}
        min={-5}
        max={5}
        onChange={setTenths}
        showValue={false}
      />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Piloting Experiments With Simulated Subjects
   -------------------------------------------------------------------------- */

/** Simulated subjects' purchase intention (1–7), twenty per condition, for each version of the materials. */
const PILOT = {
  hidden: {
    control: [4, 4, 5, 4, 3, 4, 4, 5, 4, 4, 3, 4, 5, 4, 4, 4, 5, 4, 3, 4],
    treatment: [5, 4, 5, 4, 4, 5, 4, 5, 4, 4, 5, 4, 5, 4, 3, 5, 4, 5, 4, 4],
  },
  revealed: {
    control: [4, 4, 3, 4, 4, 4, 3, 4, 4, 4, 4, 3, 4, 4, 4, 4, 3, 4, 4, 4],
    treatment: [6, 6, 7, 6, 6, 6, 7, 6, 6, 5, 6, 6, 7, 6, 6, 6, 6, 7, 6, 6],
  },
};

const MATERIALS = [
  { id: "hidden", label: "Hypothesis not stated" },
  { id: "revealed", label: "Hypothesis revealed" },
] as const;
type MaterialId = (typeof MATERIALS)[number]["id"];

const meanOf = (v: number[]) => v.reduce((a, b) => a + b, 0) / v.length;

/**
 * A pilot run on simulated subjects: twenty AI respondents rate a coffee
 * package with or without an eco-label. When the instructions keep the
 * hypothesis back, the label moves ratings a little; when a line of the
 * instructions states it, the model delivers the expected result and the
 * effect swells.
 */
export function PilotDemand() {
  const [m, setM] = useState<MaterialId>("hidden");
  const data = PILOT[m];
  const diff = meanOf(data.treatment) - meanOf(data.control);

  const sx = 200;
  const X = (v: number) => r2(sx + 24 + (v - 1) * 60);
  const rows = [
    { key: "WITHOUT ECO-LABEL", v: data.control, base: 124, tone: INK2 },
    { key: "WITH ECO-LABEL", v: data.treatment, base: 244, tone: SIGNAL },
  ];

  return (
    <div>
      <Frame
        width={640}
        height={282}
        label={`A pilot with twenty simulated subjects per condition rating purchase intention from 1 to 7 for a coffee package with and without an eco-label. ${
          m === "hidden" ? "When the instructions do not state the hypothesis" : "When the instructions reveal the hypothesis"
        }, mean intention is ${meanOf(data.control).toFixed(1)} without the label and ${meanOf(data.treatment).toFixed(1)} with it, a difference of ${diff.toFixed(1)}`}
      >
        {/* the instructions sheet */}
        <Key x={20} y={22}>INSTRUCTIONS</Key>
        <rect x={20} y={36} width={140} height={176} rx={2} fill={PAPER} stroke={INK} strokeWidth={1.25} />
        {[60, 76, 92, 108, 124, 140].map((y, i) => (
          <line key={y} x1={34} y1={y} x2={i % 3 === 2 ? 110 : 146} y2={y} stroke={RULE2} strokeWidth={4} strokeLinecap="round" />
        ))}
        {m === "revealed" ? (
          <g>
            <line x1={34} y1={160} x2={146} y2={160} stroke={COUNTER} strokeWidth={4} strokeLinecap="round" />
            <line x1={34} y1={176} x2={120} y2={176} stroke={COUNTER} strokeWidth={4} strokeLinecap="round" />
            <Key x={20} y={234} fill={COUNTER} size={9.5}>STATES THE HYPOTHESIS</Key>
          </g>
        ) : null}
        <RatingRow1 x={36} y={188} n={7} box={14} gap={2} numbers={false} />

        <Key x={sx} y={22}>PURCHASE INTENTION</Key>
        <Key x={620} y={22} anchor="end" fill={INK3}>SIMULATED</Key>
        {rows.map((r) => {
          const count = new Map<number, number>();
          return (
            <g key={r.key}>
              <Key x={sx} y={r.base - 72} fill={r.tone}>{r.key}</Key>
              <line x1={sx} y1={r.base} x2={620} y2={r.base} stroke={INK} strokeWidth={1.25} />
              {[1, 2, 3, 4, 5, 6, 7].map((v) => (
                <Key key={v} x={X(v)} y={r.base + 15} anchor="middle" size={9.5} fill={INK3}>{v}</Key>
              ))}
              {r.v.map((v, i) => {
                const lvl = count.get(v) ?? 0;
                count.set(v, lvl + 1);
                const col = lvl % 4;
                const inRow = Math.min(4, r.v.filter((w) => w === v).length - Math.floor(lvl / 4) * 4);
                return <AiMark1 key={i} cx={r2(X(v) - (inRow - 1) * 5.5 + col * 11)} cy={r2(r.base - 9 - Math.floor(lvl / 4) * 11)} s={11} fill={r.tone} />;
              })}
              <path d={`M${X(meanOf(r.v))} ${r.base + 20}l5 8h-10Z`} fill={r.tone} />
            </g>
          );
        })}
        <Key x={620} y={r2(rows[1].base - 72)} anchor="end" fill={m === "revealed" ? COUNTER : SIGNAL}>
          {`DIFFERENCE ${diff >= 0 ? "+" : "\u2212"}${Math.abs(diff).toFixed(1)}`}
        </Key>
      </Frame>
      <Segmented label="Materials" options={[...MATERIALS]} value={m} onChange={setM} />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Multi-Armed Bandits
   -------------------------------------------------------------------------- */

/**
 * A simulated bandit (Thompson sampling, seed 23) choosing among four ad
 * versions with true click-through rates of 2.0%, 2.4%, 3.0% and 2.6%, over
 * 14 days of 2,000 impressions: each day's share of impressions per version.
 */
const BANDIT_DAYS = [
  [0.253, 0.197, 0.31, 0.24],
  [0.063, 0.703, 0.153, 0.08],
  [0.073, 0.157, 0.303, 0.467],
  [0.03, 0.133, 0.537, 0.3],
  [0.043, 0.177, 0.527, 0.253],
  [0.02, 0.19, 0.63, 0.16],
  [0.007, 0.1, 0.817, 0.077],
  [0.04, 0.05, 0.857, 0.053],
  [0.017, 0.15, 0.77, 0.063],
  [0.027, 0.053, 0.88, 0.04],
  [0.02, 0.033, 0.853, 0.093],
  [0.043, 0.013, 0.893, 0.05],
  [0, 0.01, 0.957, 0.033],
  [0.01, 0.01, 0.9, 0.08],
];
/** Impressions per version over the whole test, from the same simulation. */
const BANDIT_TOTALS = [1294, 3954, 18773, 3981];
const VERSION_FILL = [INK3, RULE2, SIGNAL, PAPER3];
const VERSIONS = ["A", "B", "C", "D"];

/**
 * How a bandit allocates: each column is one day's impressions, split among
 * four ad versions. Early days spread impressions to learn about every
 * version (exploration), and a lucky start for B is corrected; as evidence
 * builds, most impressions go to C, the best performer (exploitation).
 */
export function BanditAllocation() {
  const [day, setDay] = useState(14);
  const x0 = 60;
  const cw = 34;
  const gap = 4.5;
  const top = 74;
  const h = 200;
  const X = (d: number) => r2(x0 + d * (cw + gap));
  const shareC = Math.round(BANDIT_DAYS[day - 1][2] * 100);

  return (
    <div>
      <Frame
        width={640}
        height={332}
        label={`A simulated bandit allocating 2,000 daily impressions among four ad versions over 14 days. On day 1 each version receives about a quarter; by day ${day}, version C, the best performer, receives ${shareC} percent`}
      >
        <Key x={20} y={22}>SHARE OF EACH DAY&rsquo;S IMPRESSIONS</Key>
        <Key x={620} y={22} anchor="end" fill={INK3}>SIMULATED</Key>
        <Key x={20} y={52} fill={SIGNAL}>{`DAY ${day} \u00b7 VERSION C`}</Key>
        <Display x={170} y={56} size={26} fill={SIGNAL}>{`${shareC}%`}</Display>

        {BANDIT_DAYS.map((sh, d) => {
          if (d >= day) {
            return <rect key={d} x={X(d)} y={top} width={cw} height={h} fill="none" stroke={RULE2} strokeWidth={1} strokeDasharray="3 3" />;
          }
          return (
            <g key={d}>
              {sh.map((v, a) => {
                const below = sh.slice(0, a + 1).reduce((t, w) => t + w, 0);
                return <rect key={a} x={X(d)} y={r2(top + h - below * h)} width={cw} height={r2(v * h)} fill={VERSION_FILL[a]} stroke={a === 3 ? RULE2 : "none"} strokeWidth={0.75} />;
              })}
            </g>
          );
        })}
        {/* version letters beside day 1, where every version has a share */}
        {BANDIT_DAYS[0].map((v, a) => {
          const below = BANDIT_DAYS[0].slice(0, a + 1).reduce((t, w) => t + w, 0);
          return (
            <Key key={a} x={x0 - 10} y={r2(top + h - below * h + (v * h) / 2 + 4)} anchor="end" fill={a === 2 ? SIGNAL : INK2}>
              {VERSIONS[a]}
            </Key>
          );
        })}
        <line x1={x0 - 4} y1={top + h} x2={X(14) + 8} y2={top + h} stroke={INK} strokeWidth={1.25} />
        <path d={head.right(X(14) + 8, top + h, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
        {[1, 7, 14].map((d) => (
          <Key key={d} x={r2(X(d - 1) + cw / 2)} y={top + h + 16} anchor="middle" size={9.5}>{`DAY ${d}`}</Key>
        ))}
        {/* exploration and exploitation, under the days they describe */}
        <path d={`M${X(0)} ${top + h + 26}V${top + h + 32}H${r2(X(4) - gap)}V${top + h + 26}`} fill="none" stroke={INK3} strokeWidth={1} />
        <Key x={X(0)} y={top + h + 48} size={9.5} fill={INK2}>EXPLORATION</Key>
        <path d={`M${X(6)} ${top + h + 26}V${top + h + 32}H${r2(X(14) - gap)}V${top + h + 26}`} fill="none" stroke={SIGNAL} strokeWidth={1} />
        <Key x={r2(X(14) - gap)} y={top + h + 48} anchor="end" size={9.5} fill={SIGNAL}>EXPLOITATION</Key>
      </Frame>
      <Slider label="Day" value={day} min={1} max={14} onChange={setDay} />
    </div>
  );
}

/* --------------------------------------------------------------------------
   A/B Tests and Bandits Compared
   -------------------------------------------------------------------------- */

const ALLOCATIONS = [
  { id: "fixed", label: "Fixed test, equal split" },
  { id: "bandit", label: "Bandit" },
] as const;
type AllocationId = (typeof ALLOCATIONS)[number]["id"];

const TRUE_CTR = [0.02, 0.024, 0.03, 0.026];

/**
 * The same 28,000 impressions and the same four versions, allocated two ways.
 * The bandit sends far fewer impressions to the weaker versions, so fewer
 * clicks are lost; but version A, rarely shown, is measured on few
 * impressions, and the interval around C's advantage over A is much wider.
 */
export function CostAndPrecision() {
  const [m, setM] = useState<AllocationId>("fixed");
  const n = m === "fixed" ? [7000, 7000, 7000, 7000] : BANDIT_TOTALS;
  const weaker = n[0] + n[1] + n[3];
  const lost = Math.round(n.reduce((a, k, i) => a + k * (TRUE_CTR[2] - TRUE_CTR[i]), 0));
  const half = 1.96 * Math.sqrt((TRUE_CTR[0] * (1 - TRUE_CTR[0])) / n[0] + (TRUE_CTR[2] * (1 - TRUE_CTR[2])) / n[2]) * 100;
  const fmt = (v: number) => v.toLocaleString("en-US");

  const bx = 50;
  const bw = 230;
  const B = (v: number) => r2((v / 20000) * bw);
  const ax0 = 350;
  const ax1 = 610;
  const A = (v: number) => r2(ax0 + (v / 2.5) * (ax1 - ax0));
  return (
    <div>
      <Frame
        width={640}
        height={262}
        label={`28,000 impressions over four ad versions, ${m === "fixed" ? "split equally, 7,000 each" : "allocated by a bandit: 1,294, 3,954, 18,773 and 3,981"}. ${fmt(weaker)} impressions go to the weaker versions, losing about ${lost} clicks. The 95 percent confidence interval for version C's advantage over version A is plus or minus ${half.toFixed(2)} percentage points`}
      >
        <Key x={20} y={22}>IMPRESSIONS PER VERSION</Key>
        <Key x={620} y={22} anchor="end" fill={INK3}>SIMULATED</Key>
        {n.map((v, i) => (
          <g key={i}>
            <Key x={20} y={r2(58 + i * 34 + 4)} fill={i === 2 ? SIGNAL : INK2}>{VERSIONS[i]}</Key>
            <rect x={bx} y={r2(58 + i * 34 - 10)} width={B(v)} height={20} fill={i === 2 ? SIGNAL : VERSION_FILL[i]} stroke={i === 3 ? RULE2 : "none"} strokeWidth={0.75} />
            <Key x={r2(bx + B(v) + 8)} y={r2(58 + i * 34 + 4)} size={10} fill={INK2}>{fmt(v)}</Key>
          </g>
        ))}
        <line x1={bx} y1={38} x2={bx} y2={180} stroke={INK} strokeWidth={1.25} />

        <line x1={330} y1={34} x2={330} y2={250} stroke={RULE} strokeWidth={1} />
        <Key x={350} y={50} fill={COUNTER} size={10}>CLICKS LOST TO WEAKER VERSIONS</Key>
        <Display x={350} y={84} size={30} fill={COUNTER}>{`${lost}`}</Display>
        <Key x={430} y={80} size={10} fill={INK3}>{`ON ${fmt(weaker)} IMPRESSIONS`}</Key>

        <Key x={350} y={132} fill={SIGNAL} size={10}>C OVER A, 95% CONFIDENCE INTERVAL</Key>
        <line x1={A(1 - half)} y1={172} x2={A(1 + half)} y2={172} stroke={SIGNAL} strokeWidth={3} />
        <path d={`M${A(1 - half)} 164V180M${A(1 + half)} 164V180`} stroke={SIGNAL} strokeWidth={1.75} />
        <circle cx={A(1)} cy={172} r={5} fill={SIGNAL} />
        <Key x={A(1)} y={156} anchor="middle" size={10} fill={SIGNAL}>{`\u00b1${half.toFixed(2)}`}</Key>
        <line x1={ax0} y1={206} x2={ax1 + 8} y2={206} stroke={INK} strokeWidth={1.25} />
        <path d={head.right(ax1 + 8, 206, 6)} fill="none" stroke={INK} strokeWidth={1.25} />
        {[0, 0.5, 1, 1.5, 2, 2.5].map((v) => (
          <g key={v}>
            <line x1={A(v)} y1={206} x2={A(v)} y2={210} stroke={INK} strokeWidth={1} />
            <Key x={A(v)} y={224} anchor="middle" size={9.5} fill={INK3}>{v === 0 ? "0" : `+${v}`}</Key>
          </g>
        ))}
        <Key x={ax1 + 8} y={244} anchor="end" size={9.5}>PERCENTAGE POINTS</Key>
      </Frame>
      <Segmented label="Allocation" options={[...ALLOCATIONS]} value={m} onChange={setM} />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Controlled Experiments on AI Agents
   -------------------------------------------------------------------------- */

/**
 * The 2 × 2 design of Wadi and Ma (2026b): the cost of inspecting an
 * attribute crossed with the specificity of the goal. Every cell runs the
 * same eight models, 100 sessions each: 800 sessions a cell, 3,200 in all.
 */
export function AgentFactorial() {
  const cx0 = 214;
  const cw = 206;
  const cy0 = 42;
  const ch = 80;
  const rows = [
    { key: "VAGUE GOAL", quote: "\u201cfind the best deal\u201d" },
    { key: "SPECIFIC GOAL", quote: "\u201c\u2026lowest price per ounce\u201d" },
  ];
  const cols = ["$0.00 PER INSPECTION", "$10.00 PER INSPECTION"];
  return (
    <Frame
      width={640}
      height={250}
      label="A two-by-two design: the cost of inspecting an attribute, 0 or 10 dollars, crossed with the goal, vague (find the best deal) or specific (find the coffee with the lowest price per ounce). Each of the four conditions runs eight models for 100 sessions each, 800 sessions per condition and 3,200 in total"
    >
      {cols.map((c, j) => (
        <Key key={c} x={r2(cx0 + j * cw + cw / 2)} y={26} anchor="middle" fill={INK2}>{c}</Key>
      ))}
      {rows.map((r, i) => {
        const y = cy0 + i * (ch + 8);
        return (
          <g key={r.key}>
            <Key x={20} y={r2(y + 34)} fill={INK2}>{r.key}</Key>
            <Note x={20} y={r2(y + 54)} size={12.5} italic fill={INK3}>{r.quote}</Note>
            {[0, 1].map((j) => {
              const x = cx0 + j * cw;
              return (
                <g key={j}>
                  <rect x={x + 4} y={y} width={cw - 8} height={ch} fill={PAPER} stroke={RULE2} strokeWidth={1} />
                  {Array.from({ length: 8 }, (_, k) => (
                    <AiMark1 key={k} cx={r2(x + 30 + k * 21)} cy={r2(y + 30)} s={16} fill={SIGNAL} />
                  ))}
                  <Key x={r2(x + cw / 2)} y={r2(y + 62)} anchor="middle" size={9.5} fill={INK3}>
                    {"8 MODELS \u00d7 100 SESSIONS"}
                  </Key>
                </g>
              );
            })}
          </g>
        );
      })}
      <line x1={20} y1={220} x2={620} y2={220} stroke={RULE} strokeWidth={1} />
      <Key x={20} y={240}>{"4 CONDITIONS \u00d7 8 MODELS \u00d7 100 SESSIONS"}</Key>
      <Key x={620} y={240} anchor="end" fill={SIGNAL}>3,200 SESSIONS</Key>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Process Tracing With AI Agents
   -------------------------------------------------------------------------- */

/** The stimuli of Wadi and Ma (2026b): two instant coffees, three diagnostic attributes and four constant ones. */
const BOARD_ROWS = [
  { id: "price_dollars", label: "PRICE, DOLLARS", a: "$4", b: "$5", diagnostic: true },
  { id: "price_cents", label: "PRICE, CENTS", a: "99\u00a2", b: "00\u00a2", diagnostic: true },
  { id: "weight", label: "WEIGHT", a: "10 oz", b: "11 oz", diagnostic: true },
  { id: "origin", label: "ORIGIN", a: "Colombia", b: "Colombia", diagnostic: false },
  { id: "roast_date", label: "ROAST DATE", a: "2 weeks", b: "2 weeks", diagnostic: false },
  { id: "calories", label: "CALORIES", a: "3", b: "3", diagnostic: false },
  { id: "packaging", label: "PACKAGING", a: "Foil bag", b: "Foil bag", diagnostic: false },
];
/** The trace the board opens with: an agent that checks both prices and stops. */
const BOARD_START = ["A:price_dollars", "B:price_dollars", "A:price_cents", "B:price_cents"];
const INSPECT_COST = 10;

/**
 * An information board for an AI shopping agent. Each cell opens only
 * through a tool call that costs the consumer $10. The board starts with the
 * trace of an agent that checked both prices and stopped: with correct use
 * of what it saw, it picks Coffee A, the lower price. Opening the two weights
 * reveals that Coffee B is cheaper per ounce: the poor choice came from what
 * was not acquired, not from how it was used.
 */
export function InformationBoard() {
  const [calls, setCalls] = useState<string[]>(BOARD_START);
  const open = new Set(calls);
  const has = (c: "A" | "B", id: string) => open.has(`${c}:${id}`);
  const knows = (id: string) => has("A", id) && has("B", id);

  const unit = knows("price_dollars") && knows("price_cents") && knows("weight");
  const price = knows("price_dollars");
  const choice = unit ? "B" : price ? "A" : null;
  const good = choice === "B";

  const cx = [214, 290];
  const cw = 70;
  const ry0 = 62;
  const rh = 29;
  const logX = 390;
  const shown = calls.slice(-7);

  return (
    <div>
      <Frame
        width={640}
        height={322}
        label={`An information board with two instant coffees and seven attributes, each opened by a tool call that costs the consumer 10 dollars. ${calls.length} cells opened, costing ${calls.length * INSPECT_COST} dollars. ${
          choice === null
            ? "Not enough has been opened to compare the coffees."
            : good
              ? "With both prices and both weights opened, the unit prices show that Coffee B, at 0.455 dollars an ounce against 0.499, is the better choice."
              : "With only the prices opened, the agent correctly picks the lower price, Coffee A, although Coffee B is cheaper per ounce: a failure to acquire information."
        }`}
      >
        {/* the board */}
        {(["A", "B"] as const).map((c, j) => (
          <g key={c}>
            <Cup1 x={cx[j] + cw / 2} y={36} k={1.05} stroke={INK2} />
            <Key x={cx[j] + cw / 2} y={53} anchor="middle" fill={INK2}>{c}</Key>
          </g>
        ))}
        {BOARD_ROWS.map((r, i) => {
          const y = ry0 + i * rh;
          return (
            <g key={r.id}>
              <Key x={20} y={y + 18} size={10} fill={r.diagnostic ? INK2 : INK3}>{r.label}</Key>
              {(["A", "B"] as const).map((c, j) => {
                const isOpen = has(c, r.id);
                const key = `${c}:${r.id}`;
                return (
                  <g
                    key={c}
                    onClick={isOpen ? undefined : () => setCalls((v) => [...v, key])}
                    style={{ cursor: isOpen ? "default" : "pointer" }}
                  >
                    <rect
                      x={cx[j] + 2}
                      y={y + 2}
                      width={cw - 4}
                      height={rh - 4}
                      fill={isOpen ? PAPER : PAPER3}
                      stroke={isOpen ? INK3 : RULE2}
                      strokeWidth={1}
                    />
                    {isOpen ? (
                      <Note x={r2(cx[j] + cw / 2)} y={y + 19} anchor="middle" size={12.5} fill={INK} weight={500}>
                        {c === "A" ? r.a : r.b}
                      </Note>
                    ) : (
                      <path
                        d={`M${cx[j] + cw / 2 - 4} ${y + rh / 2}h8M${cx[j] + cw / 2} ${y + rh / 2 - 4}v8`}
                        stroke={INK3}
                        strokeWidth={1.25}
                      />
                    )}
                  </g>
                );
              })}
            </g>
          );
        })}

        {/* the record of tool calls */}
        <line x1={370} y1={14} x2={370} y2={310} stroke={RULE} strokeWidth={1} />
        <Key x={logX} y={22}>{`TOOL CALLS \u00b7 ${calls.length}`}</Key>
        <Key x={620} y={22} anchor="end" fill={COUNTER}>{`COST $${calls.length * INSPECT_COST}`}</Key>
        {shown.map((c, i) => {
          const [who, id] = c.split(":");
          const n = calls.length - shown.length + i + 1;
          return (
            <g key={c}>
              <Key x={logX} y={48 + i * 17} size={9.5} fill={INK3}>{String(n).padStart(2, "0")}</Key>
              <text x={logX + 22} y={48 + i * 17} fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize={10.5} fill={INK2}>
                {`inspect_cell(${who}, ${id})`}
              </text>
            </g>
          );
        })}

        {/* the choice that correct use of the opened cells implies */}
        <line x1={logX} y1={180} x2={620} y2={180} stroke={RULE} strokeWidth={1} />
        <Key x={logX} y={202} size={10}>CHOICE FROM THE OPENED CELLS</Key>
        {choice ? (
          <g>
            <Display x={logX} y={238} size={26} fill={good ? SIGNAL : COUNTER}>{`Coffee ${choice}`}</Display>
            <Key x={logX} y={260} size={10} fill={INK3}>
              {unit ? "A $0.499 \u00b7 B $0.455 PER OZ" : price ? "A $4.99 \u00b7 B $5.00" : ""}
            </Key>
            <Key x={logX} y={284} size={10} fill={good ? SIGNAL : COUNTER}>
              {good ? "OPTIMAL: LOWEST PRICE PER OUNCE" : "POOR CHOICE: FAILURE TO ACQUIRE"}
            </Key>
            {!good ? (
              <Key x={logX} y={302} size={10} fill={INK3}>NO FAILURE TO USE: $4.99 IS LOWER</Key>
            ) : null}
          </g>
        ) : (
          <Key x={logX} y={238} size={10} fill={INK3}>NOT ENOUGH OPENED TO COMPARE</Key>
        )}
      </Frame>
      <div className="mt-2 flex items-center gap-3 px-1">
        <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--ink-3)]" style={{ fontFamily: "var(--font-label)" }}>
          Open a cell to call the tool
        </span>
        <PlateButton onClick={() => setCalls([])} className="ml-auto">
          Clear the board
        </PlateButton>
      </div>
    </div>
  );
}

