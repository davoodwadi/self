/* ==========================================================================
   Week 05 plates: Sampling and Data Collection.
   Built on ../_visuals/kit and ../_visuals/objects. Every plate follows the
   sentence it illustrates on the slide.
   ========================================================================== */

import React, { useState } from "react";
import { RotateCw, Shuffle } from "lucide-react";
import {
  Frame,
  Key,
  Note,
  Display,
  INK,
  INK2,
  INK3,
  RULE,
  SIGNAL,
  COUNTER,
  PAPER,
  PAPER3,
  SIGNAL_TINT,
  head,
  r2,
  Slider,
  Segmented,
  Toggles,
  PlateButton,
  seeded,
} from "../_visuals/kit";
import { Person1, AiMark1 } from "../_visuals/objects";

/* --------------------------------------------------------------------------
   Sampling and Nonsampling Error
   -------------------------------------------------------------------------- */

/** Standard normal draws from a seeded stream. */
function normals(seed: number, count: number) {
  const rnd = seeded(seed);
  return Array.from({ length: count }, () => Math.sqrt(-2 * Math.log(1 - rnd())) * Math.cos(2 * Math.PI * rnd()));
}

const SIZES = [25, 50, 100, 200, 400, 800, 1600];
const REPEATS = 24;
/** The true share of all customers who would recommend the firm. */
const TRUE_SHARE = 0.4;
/** The share among email subscribers, the frame that misses other customers. */
const FRAME_SHARE = 0.55;
const Z_ALL = normals(145, REPEATS);
const Z_FRAME = normals(357, REPEATS);

/**
 * Sampling and nonsampling error: twenty-four repeated samples from each of
 * two frames, at the sample size the slider sets. Samples from the complete
 * customer list scatter around the true 40% and close in on it as n grows;
 * samples from the email list close in just as fast, but on 55%, so their
 * frame error stays whatever the sample size.
 */
export function ErrorsAndSampleSize() {
  const [i, setI] = useState(1);
  const n = SIZES[i];
  const x0 = 170;
  const x1 = 760;
  const X = (p: number) => r2(x0 + ((p - 0.15) / 0.7) * (x1 - x0));
  const rows = [
    { key: "all", y: 86, share: TRUE_SHARE, z: Z_ALL, label: ["ALL", "CUSTOMERS"], tone: SIGNAL },
    { key: "frame", y: 178, share: FRAME_SHARE, z: Z_FRAME, label: ["EMAIL", "SUBSCRIBERS"], tone: COUNTER },
  ];
  const axisY = 238;
  const se = Math.sqrt((TRUE_SHARE * (1 - TRUE_SHARE)) / n);
  const lo = X(TRUE_SHARE - 1.96 * se);
  const hi = X(TRUE_SHARE + 1.96 * se);
  const bY = rows[0].y + 26;
  const fY = rows[1].y + 26;

  return (
    <>
      <Frame
        width={800}
        height={268}
        label={`Twenty-four samples of ${n} customers drawn from the complete customer list scatter around the true share of 40 percent, within about ${Math.round(196 * se)} points of it; twenty-four samples of ${n} drawn from the email subscriber list scatter around 55 percent. As the sample size grows both clusters narrow, but the email samples stay centred 15 points away from the true value`}
      >
        <Display x={20} y={30} fill={INK} size={24}>{`n = ${n.toLocaleString("en-US")}`}</Display>
        <Key x={20} y={48} fill={INK3} size={9.5}>24 SAMPLES PER LIST</Key>

        {/* the true value, through both rows */}
        <line x1={X(TRUE_SHARE)} y1={30} x2={X(TRUE_SHARE)} y2={axisY} stroke={INK} strokeWidth={1.25} strokeDasharray="4 4" />
        <Key x={X(TRUE_SHARE)} y={20} anchor="middle" fill={INK} size={10}>TRUE VALUE 40%</Key>

        {rows.map((row) => {
          const s = Math.sqrt((row.share * (1 - row.share)) / n);
          return (
            <g key={row.key}>
              <Key x={20} y={row.y - 3} fill={row.tone} size={10.5}>{row.label[0]}</Key>
              <Key x={20} y={row.y + 11} fill={row.tone} size={10.5}>{row.label[1]}</Key>
              {row.z.map((z, k) => {
                const p = Math.min(0.83, Math.max(0.17, row.share + z * s));
                // three staggered lanes, so overlapping estimates stay visible
                const lane = (k % 3) - 1;
                return <circle key={k} cx={X(p)} cy={r2(row.y + lane * 11)} r={5} fill={row.tone} fillOpacity={0.75} />;
              })}
            </g>
          );
        })}

        {/* the spread the sample size narrows */}
        <path d={`M${lo} ${bY - 5}V${bY}H${hi}V${bY - 5}`} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
        <Key x={r2(hi + 10)} y={bY + 4} fill={SIGNAL} size={10}>SAMPLING ERROR</Key>

        {/* the gap the sample size cannot close */}
        <line x1={X(TRUE_SHARE)} y1={fY} x2={X(FRAME_SHARE)} y2={fY} stroke={COUNTER} strokeWidth={1.5} />
        <path d={head.left(X(TRUE_SHARE), fY, 6)} fill="none" stroke={COUNTER} strokeWidth={1.5} />
        <path d={head.right(X(FRAME_SHARE), fY, 6)} fill="none" stroke={COUNTER} strokeWidth={1.5} />
        <Key x={r2(X(FRAME_SHARE) + 10)} y={fY + 4} fill={COUNTER} size={10}>FRAME ERROR</Key>

        <line x1={x0 - 6} y1={axisY} x2={x1 + 12} y2={axisY} stroke={INK} strokeWidth={1.25} />
        <path d={head.right(x1 + 12, axisY, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
        {[0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8].map((p) => (
          <g key={p}>
            <line x1={X(p)} y1={axisY} x2={X(p)} y2={axisY + 5} stroke={INK} strokeWidth={1} />
            <Key x={X(p)} y={axisY + 20} anchor="middle" fill={INK3} size={10}>{`${Math.round(p * 100)}%`}</Key>
          </g>
        ))}
        <Key x={20} y={axisY + 4} fill={INK3} size={10}>WOULD RECOMMEND</Key>
      </Frame>
      <Slider label="Sample size" value={i} min={0} max={SIZES.length - 1} onChange={setI} showValue={false} />
    </>
  );
}

/* --------------------------------------------------------------------------
   Simple Random and Systematic Sampling
   -------------------------------------------------------------------------- */

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const WEEKS = 10;
/** A store's daily sales over ten weeks: a list with a weekly pattern. */
const DAILY = (() => {
  const base = [62, 58, 64, 72, 92, 138, 104];
  const rnd = seeded(77);
  return Array.from({ length: WEEKS * 7 }, (_, d) => Math.round(base[d % 7] + (rnd() - 0.5) * 16));
})();
const DAILY_MEAN = DAILY.reduce((a, b) => a + b, 0) / DAILY.length;
const INTERVALS = ["5", "6", "7", "8"] as const;
type Interval = (typeof INTERVALS)[number];

function systematic(k: number, start: number) {
  const picks: number[] = [];
  for (let d = start; d < DAILY.length; d += k) picks.push(d);
  return picks;
}
const meanOf = (picks: number[]) => picks.reduce((a, d) => a + DAILY[d], 0) / picks.length;

/**
 * Systematic sampling from a list with a pattern: seventy days of a store's
 * sales laid out as a calendar, with every kth day selected from a random
 * start. At an interval of 7 every selected day falls on the same weekday,
 * so the estimate of average daily sales depends on which weekday the start
 * happens to hit; at 5, 6 or 8 the selected days spread across the week and
 * every start lands close to the true average.
 */
export function PeriodicList() {
  const [k, setK] = useState<Interval>("7");
  const [start, setStart] = useState(2);
  const K = Number(k);
  const s = start % K;
  const picks = systematic(K, s);
  const chosen = new Set(picks);
  const est = meanOf(picks);
  const others = Array.from({ length: K }, (_, i) => i).filter((i) => i !== s).map((i) => meanOf(systematic(K, i)));

  const gx = 35;
  const cw = 47;
  const gy = 40;
  const ch = 19;
  const barMax = 36;
  const ax0 = 50;
  const ax1 = 370;
  const axY = 318;
  const A = (v: number) => r2(ax0 + ((v - 40) / 120) * (ax1 - ax0));

  return (
    <>
      <Frame
        width={400}
        height={350}
        label={`Seventy days of a store's sales laid out by weekday, with Saturdays highest. Every ${K}th day from day ${s + 1} is selected: ${picks.length} days, averaging ${Math.round(est)} against a true daily average of ${Math.round(DAILY_MEAN)}. The other possible starts give averages from ${Math.round(Math.min(...others))} to ${Math.round(Math.max(...others))}`}
      >
        <Key x={gx} y={16} fill={INK3} size={10}>SAMPLING FRAME: 70 DAYS OF SALES</Key>
        {DAYS.map((d, i) => (
          <Key key={d} x={r2(gx + i * cw + cw / 2)} y={34} anchor="middle" fill={INK3} size={9}>{d}</Key>
        ))}
        {DAILY.map((v, d) => {
          const c = d % 7;
          const w = Math.floor(d / 7);
          const x = gx + c * cw;
          const y = gy + w * ch;
          const on = chosen.has(d);
          return (
            <g key={d}>
              <rect x={x + 1} y={y + 1} width={cw - 2} height={ch - 2} fill={on ? SIGNAL_TINT : "none"} stroke={on ? SIGNAL : RULE} strokeWidth={on ? 1.5 : 1} />
              <rect x={x + 5} y={y + 6} width={r2((v / 140) * barMax)} height={ch - 12} fill={on ? SIGNAL : INK3} fillOpacity={on ? 1 : 0.45} />
            </g>
          );
        })}

        {/* the estimate of average daily sales */}
        <Key x={gx} y={250} fill={INK3} size={10}>AVERAGE DAILY SALES</Key>
        <line x1={A(DAILY_MEAN)} y1={258} x2={A(DAILY_MEAN)} y2={axY} stroke={INK} strokeWidth={1.25} strokeDasharray="4 4" />
        <Key x={r2(A(DAILY_MEAN) + 6)} y={268} fill={INK} size={9}>{`TRUE ${Math.round(DAILY_MEAN)}`}</Key>
        {others.map((v, i) => (
          <circle key={i} cx={A(v)} cy={axY - 12} r={4} fill={PAPER} stroke={INK3} strokeWidth={1.25} />
        ))}
        <circle cx={A(est)} cy={axY - 12} r={6} fill={SIGNAL} />
        <Key
          x={Math.abs(A(est) - A(DAILY_MEAN)) < 14 ? r2(A(est) + (est < DAILY_MEAN ? -4 : 4)) : A(est)}
          y={axY - 24}
          anchor={Math.abs(A(est) - A(DAILY_MEAN)) < 14 ? (est < DAILY_MEAN ? "end" : "start") : "middle"}
          fill={SIGNAL}
          size={10}
          weight={700}
        >
          {`${Math.round(est)}`}
        </Key>
        <line x1={ax0 - 6} y1={axY} x2={ax1 + 10} y2={axY} stroke={INK} strokeWidth={1.25} />
        <path d={head.right(ax1 + 10, axY, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
        {[40, 80, 120, 160].map((v) => (
          <g key={v}>
            <line x1={A(v)} y1={axY} x2={A(v)} y2={axY + 4} stroke={INK} strokeWidth={1} />
            <Key x={A(v)} y={axY + 17} anchor="middle" fill={INK3} size={9}>{v}</Key>
          </g>
        ))}
      </Frame>
      <div className="flex flex-wrap items-center justify-between gap-x-4">
        <Segmented
          label="Every kth day"
          options={INTERVALS.map((id) => ({ id, label: `${id}th` }))}
          value={k}
          onChange={setK}
        />
        <PlateButton className="mt-2" onClick={() => setStart((v) => v + 1 + Math.floor(Math.random() * (K - 1)))} icon={<Shuffle className="size-3.5" aria-hidden />}>
          New random start
        </PlateButton>
      </div>
    </>
  );
}

/* --------------------------------------------------------------------------
   Stratified and Cluster Sampling
   -------------------------------------------------------------------------- */

/** Buyers in each block of ten; the four rows of blocks are four regions. */
const BLOCK_BUYERS = [
  [0, 1, 1, 0],
  [2, 2, 1, 3],
  [8, 7, 9, 8],
  [10, 9, 10, 9],
];
const PER_BLOCK = 10;
const POP = 160;
const SAMPLE_N = 20;
const DRAWS = 24;
/** Person p (0–159): block b = floor(p / 10), region = floor(b / 4). */
const BUYS = (() => {
  const rnd = seeded(33);
  const out: boolean[] = [];
  BLOCK_BUYERS.flat().forEach((b) => {
    const slots = Array.from({ length: PER_BLOCK }, (_, i) => i);
    for (let i = slots.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [slots[i], slots[j]] = [slots[j], slots[i]];
    }
    const buyers = new Set(slots.slice(0, b));
    for (let i = 0; i < PER_BLOCK; i++) out.push(buyers.has(i));
  });
  return out;
})();

function pickFrom(rnd: () => number, pool: number[], k: number) {
  const a = [...pool];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, k);
}
const range = (a: number, b: number) => Array.from({ length: b - a }, (_, i) => a + i);

type Technique = "random" | "stratified" | "cluster";
const TECHNIQUES: { id: Technique; label: string; key: string }[] = [
  { id: "random", label: "Simple random", key: "SIMPLE RANDOM" },
  { id: "stratified", label: "Stratified", key: "STRATIFIED" },
  { id: "cluster", label: "Cluster", key: "CLUSTER" },
];
/** Twenty-four samples of twenty drawn with each technique. */
const SAMPLES: Record<Technique, number[][]> = (() => {
  const rnd = seeded(2024);
  const out: Record<Technique, number[][]> = { random: [], stratified: [], cluster: [] };
  for (let d = 0; d < DRAWS; d++) {
    out.random.push(pickFrom(rnd, range(0, POP), SAMPLE_N));
    out.stratified.push([0, 1, 2, 3].flatMap((r) => pickFrom(rnd, range(r * 40, r * 40 + 40), SAMPLE_N / 4)));
    out.cluster.push(pickFrom(rnd, range(0, 16), 2).flatMap((b) => range(b * PER_BLOCK, b * PER_BLOCK + PER_BLOCK)));
  }
  return out;
})();
const shareOf = (members: number[]) => members.filter((m) => BUYS[m]).length / members.length;

/**
 * Stratified and cluster sampling: 160 customers in sixteen city blocks,
 * four blocks to each of four regions, and the regions differ sharply in the
 * share who would buy. A sample of twenty drawn with the chosen technique is
 * marked on the map; beside it, the estimates from twenty-four samples of
 * twenty with each technique. Stratified samples cluster tightly on the true
 * 50%, simple random samples spread wider, and samples of two whole blocks
 * spread widest.
 */
export function StrataAndClusters() {
  const [tech, setTech] = useState<Technique>("stratified");
  const [draw, setDraw] = useState(0);
  const members = SAMPLES[tech][draw % DRAWS];
  const inSample = new Set(members);

  // the map: four regions (rows) of four blocks
  const bx0 = 20;
  const bw = 92;
  const bg = 6;
  const by0 = 42;
  const bh = 58;
  const rg = 10;
  const blockX = (c: number) => bx0 + c * (bw + bg);
  const blockY = (r: number) => by0 + r * (bh + rg);

  // the strips
  const sx0 = 476;
  const sx1 = 776;
  const S = (v: number) => r2(sx0 + v * (sx1 - sx0));
  const rowY = [104, 188, 272];
  const axisY = 292;

  return (
    <>
      <Frame
        width={800}
        height={322}
        label={`A population of 160 customers in sixteen city blocks, four to each of four regions; the share who would buy ranges from about 5 percent in one region to about 95 percent in another, 50 percent overall. A ${tech === "random" ? "simple random" : tech} sample of twenty is marked, which estimates ${Math.round(shareOf(members) * 100)} percent. Across twenty-four samples of twenty, stratified estimates lie closest to 50 percent, simple random estimates spread wider, and cluster estimates spread widest`}
      >
        <Key x={bx0} y={22} fill={INK3} size={10}>{`${POP} CUSTOMERS · 16 BLOCKS · 4 REGIONS`}</Key>
        {BLOCK_BUYERS.map((row, r) => (
          <g key={r}>
            <rect x={bx0 - 6} y={blockY(r) - 4} width={4 * bw + 3 * bg + 12} height={bh + 8} fill="none" stroke={tech === "stratified" ? SIGNAL : RULE} strokeWidth={tech === "stratified" ? 1.25 : 1} />
            {row.map((_, c) => {
              const b = r * 4 + c;
              const picked = tech === "cluster" && inSample.has(b * PER_BLOCK);
              return (
                <rect key={c} x={blockX(c)} y={blockY(r)} width={bw} height={bh} fill={picked ? SIGNAL_TINT : PAPER} stroke={picked ? SIGNAL : RULE} strokeWidth={picked ? 1.75 : 1} />
              );
            })}
          </g>
        ))}
        {BUYS.map((buy, p) => {
          const b = Math.floor(p / PER_BLOCK);
          const i = p % PER_BLOCK;
          const x = r2(blockX(b % 4) + 12 + (i % 5) * 17);
          const y = r2(blockY(Math.floor(b / 4)) + 25 + Math.floor(i / 5) * 25);
          const on = inSample.has(p);
          return (
            <g key={p} opacity={on ? 1 : 0.3}>
              <Person1 x={x} y={y} k={0.52} stroke={buy ? COUNTER : INK} fill={buy ? COUNTER : PAPER} width={on ? 1.5 : 1} />
            </g>
          );
        })}

        {/* estimates from twenty-four samples with each technique */}
        <Key x={sx0} y={22} fill={INK3} size={10}>
          <tspan fill={COUNTER}>WOULD BUY</tspan>: 24 SAMPLES OF 20
        </Key>
        <line x1={S(0.5)} y1={36} x2={S(0.5)} y2={axisY} stroke={INK} strokeWidth={1.25} strokeDasharray="4 4" />
        <Key x={r2(S(0.5) + 6)} y={44} fill={INK} size={9.5}>TRUE 50%</Key>
        {TECHNIQUES.map((t, ti) => {
          const stacks = new Map<number, number>();
          const on = t.id === tech;
          return (
            <g key={t.id}>
              <Key x={sx0} y={rowY[ti] - 56} fill={on ? SIGNAL : INK3} size={9.5} weight={on ? 700 : 600}>{t.key}</Key>
              <line x1={sx0} y1={rowY[ti] + 6} x2={sx1} y2={rowY[ti] + 6} stroke={RULE} strokeWidth={1} />
              {SAMPLES[t.id].map((m, d) => {
                const v = shareOf(m);
                const level = stacks.get(v) ?? 0;
                stacks.set(v, level + 1);
                const current = on && d === draw % DRAWS;
                return (
                  <circle
                    key={d}
                    cx={S(v)}
                    cy={r2(rowY[ti] - level * 6.5)}
                    r={current ? 4.5 : 3}
                    fill={current ? SIGNAL : on ? SIGNAL : INK3}
                    fillOpacity={current ? 1 : on ? 0.45 : 0.55}
                    stroke={current ? INK : "none"}
                    strokeWidth={1.25}
                  />
                );
              })}
            </g>
          );
        })}
        <line x1={sx0 - 4} y1={axisY} x2={sx1 + 12} y2={axisY} stroke={INK} strokeWidth={1.25} />
        <path d={head.right(sx1 + 12, axisY, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
        {[0, 0.25, 0.5, 0.75, 1].map((v) => (
          <g key={v}>
            <line x1={S(v)} y1={axisY} x2={S(v)} y2={axisY + 4} stroke={INK} strokeWidth={1} />
            <Key x={S(v)} y={axisY + 17} anchor="middle" fill={INK3} size={9}>{`${v * 100}%`}</Key>
          </g>
        ))}
      </Frame>
      <div className="flex flex-wrap items-center justify-between gap-x-4">
        <Segmented label="Technique" options={TECHNIQUES.map(({ id, label }) => ({ id, label }))} value={tech} onChange={setTech} />
        <PlateButton className="mt-2" onClick={() => setDraw((d) => d + 1)} icon={<RotateCw className="size-3.5" aria-hidden />}>
          Draw another sample
        </PlateButton>
      </div>
    </>
  );
}

/* --------------------------------------------------------------------------
   Precision and Confidence
   -------------------------------------------------------------------------- */

const POPULATIONS = [
  { id: "1k", label: "1,000", N: 1_000 },
  { id: "10k", label: "10,000", N: 10_000 },
  { id: "1m", label: "1 million", N: 1_000_000 },
  { id: "100m", label: "100 million", N: 100_000_000 },
] as const;
type PopId = (typeof POPULATIONS)[number]["id"];

/** Sample size for a proportion at 95% confidence, p = 0.5, e in points; corrected for a finite population. */
function requiredN(e: number, N: number) {
  const n0 = (1.96 ** 2 * 0.25) / (e / 100) ** 2;
  return Math.ceil(n0 / (1 + (n0 - 1) / N));
}
const fmt = (v: number) => v.toLocaleString("en-US");
const pts = (e: number) => (Number.isInteger(e) ? String(e) : e.toFixed(1));

/**
 * Precision and sample size: the sample required to estimate a proportion at
 * 95% confidence, plotted against the margin of error. The student drags the
 * margin along the axis and reads the sample size; the open point at half the
 * margin needs about four times as many. Switching the population from 1
 * million to 100 million leaves the curve where it is; only a population as
 * small as 1,000 or 10,000 bends it down.
 */
export function SampleSizeCurve() {
  const [e, setE] = useState(5);
  const [pop, setPop] = useState<PopId>("1m");
  const N = POPULATIONS.find((p) => p.id === pop)!.N;
  const E_MIN = 2;
  const E_MAX = 10;
  const x0 = 64;
  const x1 = 364;
  const yBase = 276;
  const yTop = 40;
  const X = (v: number) => r2(x0 + ((v - E_MIN) / (E_MAX - E_MIN)) * (x1 - x0));
  const Y = (n: number) => r2(yBase - (n / 2500) * (yBase - yTop));
  const eInv = (x: number) => E_MIN + ((x - x0) / (x1 - x0)) * (E_MAX - E_MIN);
  const set = (v: number) => setE(Math.max(E_MIN, Math.min(E_MAX, Math.round(v * 2) / 2)));
  const drag = (ev: React.PointerEvent<SVGSVGElement>) => {
    const ctm = ev.currentTarget.getScreenCTM();
    if (!ctm) return;
    set(eInv(new DOMPoint(ev.clientX, ev.clientY).matrixTransform(ctm.inverse()).x));
  };
  const curve = (pop: number) =>
    Array.from({ length: 81 }, (_, i) => {
      const v = E_MIN + (i / 80) * (E_MAX - E_MIN);
      return `${i ? "L" : "M"}${X(v)} ${Y(Math.min(2500, requiredN(v, pop)))}`;
    }).join("");
  const n = requiredN(e, N);
  const half = e / 2;
  const nHalf = requiredN(half, N);
  const showHalf = half >= E_MIN;
  const ex = X(e);

  return (
    <>
      <Frame
        width={400}
        height={330}
        label={`Required sample size at 95 percent confidence against the margin of error, for a population of ${POPULATIONS.find((p) => p.id === pop)!.label}: a margin of plus or minus ${pts(e)} points requires ${fmt(n)} respondents${showHalf ? `, and half that margin, ${pts(half)} points, requires ${fmt(nHalf)}` : ""}. The curve for 1 million and for 100 million is the same`}
        className="cursor-ew-resize touch-none select-none"
        svgProps={{
          onPointerDown: (ev) => {
            ev.currentTarget.setPointerCapture(ev.pointerId);
            drag(ev);
          },
          onPointerMove: (ev) => {
            if (ev.currentTarget.hasPointerCapture(ev.pointerId)) drag(ev);
          },
        }}
      >
        <Key x={16} y={22} fill={INK3} size={10}>REQUIRED SAMPLE</Key>
        {[0, 1000, 2000].map((v) => (
          <g key={v}>
            <line x1={x0 - 4} y1={Y(v)} x2={x0} y2={Y(v)} stroke={INK} strokeWidth={1} />
            <Key x={x0 - 8} y={r2(Y(v) + 3.5)} anchor="end" fill={INK3} size={9}>{fmt(v)}</Key>
          </g>
        ))}
        <line x1={x0} y1={yBase} x2={x0} y2={yTop - 10} stroke={INK} strokeWidth={1.25} />
        <path d={head.up(x0, yTop - 10, 7)} fill="none" stroke={INK} strokeWidth={1.25} />

        {/* the large-population curve stays in place as the reference */}
        {N < 1_000_000 ? (
          <>
            <path d={curve(100_000_000)} fill="none" stroke={INK3} strokeWidth={1.25} strokeDasharray="4 4" />
            <Key x={x0 + 12} y={Y(2380)} fill={INK3} size={9}>100 MILLION</Key>
          </>
        ) : null}
        <path d={curve(N)} fill="none" stroke={INK} strokeWidth={1.75} />

        {/* guides from the chosen margin to its sample size */}
        <line x1={ex} y1={yBase} x2={ex} y2={Y(n)} stroke={SIGNAL} strokeWidth={1.25} />
        <line x1={x0} y1={Y(n)} x2={ex} y2={Y(n)} stroke={SIGNAL} strokeWidth={1.25} strokeDasharray="3 3" />
        {showHalf ? (
          <>
            <line x1={X(half)} y1={yBase} x2={X(half)} y2={Y(nHalf)} stroke={INK3} strokeWidth={1} strokeDasharray="3 3" />
            <circle cx={X(half)} cy={Y(nHalf)} r={5} fill={PAPER} stroke={INK} strokeWidth={1.5} />
          </>
        ) : null}
        <circle cx={ex} cy={Y(n)} r={6} fill={SIGNAL} />
        <Key x={x1} y={30} anchor="end" fill={SIGNAL} size={10}>{`SAMPLE FOR \u00b1${pts(e)}`}</Key>
        <Display x={x1} y={60} anchor="end" fill={SIGNAL} size={30}>{fmt(n)}</Display>
        {showHalf ? (
          <Key x={x1} y={84} anchor="end" fill={INK} size={10}>
            {`FOR \u00b1${pts(half)}: ${fmt(nHalf)}, \u00d7${(nHalf / n).toFixed(1)}`}
          </Key>
        ) : null}

        {/* the margin of error: dragged along the axis */}
        <line x1={x0} y1={yBase} x2={x1 + 14} y2={yBase} stroke={INK} strokeWidth={1.25} />
        <path d={head.right(x1 + 14, yBase, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
        {[2, 4, 6, 8, 10].map((v) => (
          <g key={v}>
            <line x1={X(v)} y1={yBase} x2={X(v)} y2={yBase + 4} stroke={INK} strokeWidth={1} />
            {Math.abs(v - e) >= 1.5 ? (
              <Key x={X(v)} y={yBase + 30} anchor="middle" fill={INK3} size={9}>{`\u00b1${v}`}</Key>
            ) : null}
          </g>
        ))}
        <Key x={x1 + 14} y={yBase + 48} anchor="end" fill={INK3} size={10}>MARGIN OF ERROR, POINTS</Key>
        <g
          role="slider"
          tabIndex={0}
          aria-label="Margin of error, in percentage points"
          aria-valuemin={E_MIN}
          aria-valuemax={E_MAX}
          aria-valuenow={e}
          className="outline-none [&:focus-visible>circle]:stroke-[var(--ink)]"
          onKeyDown={(ev) => {
            if (ev.key === "ArrowRight" || ev.key === "ArrowUp") set(e + 0.5);
            else if (ev.key === "ArrowLeft" || ev.key === "ArrowDown") set(e - 0.5);
            else return;
            ev.preventDefault();
          }}
        >
          <circle cx={ex} cy={yBase} r={8} fill={PAPER} stroke={SIGNAL} strokeWidth={2} />
          <path d={`M${r2(ex - 12)} ${yBase - 4}L${r2(ex - 17)} ${yBase}L${r2(ex - 12)} ${yBase + 4}Z`} fill={SIGNAL} />
          <path d={`M${r2(ex + 12)} ${yBase - 4}L${r2(ex + 17)} ${yBase}L${r2(ex + 12)} ${yBase + 4}Z`} fill={SIGNAL} />
        </g>
        <Key x={ex} y={yBase + 30} anchor="middle" fill={SIGNAL} size={10} weight={700}>{`\u00b1${pts(e)}`}</Key>
      </Frame>
      <Segmented label="Population" options={POPULATIONS.map(({ id, label }) => ({ id, label }))} value={pop} onChange={setPop} />
    </>
  );
}

/* --------------------------------------------------------------------------
   Incidence and Completion Rates
   -------------------------------------------------------------------------- */

/**
 * Incidence and completion: 1,925 people contacted, of whom half qualify
 * (963) and 40% of those complete the questionnaire (385). Each bar is drawn
 * to scale from a common start, with the rate that links it to the bar above.
 */
export function ContactFunnel() {
  const x0 = 24;
  const x1 = 376;
  const W = (v: number) => r2((v / 1925) * (x1 - x0));
  const rows = [
    { key: "CONTACTED", v: 1925, y: 30, fill: PAPER, stroke: INK },
    { key: "QUALIFY", v: 962.5, y: 104, fill: PAPER3, stroke: INK, rate: "INCIDENCE RATE 50%" },
    { key: "COMPLETE", v: 385, y: 178, fill: SIGNAL, stroke: SIGNAL, rate: "COMPLETION RATE 40%" },
  ];
  const h = 30;
  return (
    <Frame
      width={400}
      height={222}
      label="Three bars drawn to scale: 1,925 people contacted; half of them, about 963, qualify at an incidence rate of 50 percent; 40 percent of those, 385, complete the questionnaire"
    >
      {rows.map((r, i) => (
        <g key={r.key}>
          <Key x={x0} y={r.y - 8} fill={i === 2 ? SIGNAL : INK} size={10}>{r.key}</Key>
          <rect x={x0} y={r.y} width={W(r.v)} height={h} fill={r.fill} stroke={r.stroke} strokeWidth={1.25} />
          <Display
            x={i === 0 ? r2(x0 + W(r.v) - 10) : r2(x0 + W(r.v) + 10)}
            y={r.y + 22}
            anchor={i === 0 ? "end" : "start"}
            fill={i === 2 ? SIGNAL : INK}
            size={22}
          >
            {Math.round(r.v).toLocaleString("en-US")}
          </Display>
          {r.rate ? (
            <>
              <path d={`M${r2(x0 + 14)} ${rows[i - 1].y + h + 4}V${r.y - 22}`} fill="none" stroke={INK3} strokeWidth={1.25} />
              <path d={head.down(r2(x0 + 14), r.y - 22, 6)} fill="none" stroke={INK3} strokeWidth={1.25} />
              <Key x={r2(x0 + 26)} y={r.y - 28} fill={INK3} size={9.5}>{r.rate}</Key>
            </>
          ) : null}
        </g>
      ))}
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Data Quality Checks
   -------------------------------------------------------------------------- */

type Check = "time" | "attention" | "consistency" | "open" | "technical";
const CHECKS: { id: Check; label: string; tag: string }[] = [
  { id: "time", label: "Completion time", tag: "TOO FAST" },
  { id: "attention", label: "Attention check", tag: "ATTENTION" },
  { id: "consistency", label: "Consistency", tag: "CONTRADICTS" },
  { id: "open", label: "Open-ended review", tag: "GENERIC TEXT" },
  { id: "technical", label: "Technical", tag: "SAME DEVICE" },
];
/**
 * Thirty completed questionnaires. Twenty come from genuine respondents, ten
 * of them satisfied; the other ten are speeders, straight-liners, an
 * inconsistent respondent, two entries from one device and three bots, all
 * reporting satisfaction. Each lists the checks that would flag it.
 */
const BATCH: { satisfied: boolean; caught: Check[] }[] = (() => {
  const bad: Record<number, Check[]> = {
    2: ["time", "attention"],
    5: ["attention"],
    9: ["open", "time"],
    11: ["technical"],
    14: ["technical"],
    16: ["consistency"],
    19: ["time"],
    22: ["open", "technical"],
    25: ["attention"],
    28: ["open"],
  };
  const genuineSatisfied = new Set([0, 3, 7, 8, 13, 15, 18, 21, 24, 27]);
  return Array.from({ length: 30 }, (_, i) => ({
    satisfied: i in bad || genuineSatisfied.has(i),
    caught: bad[i] ?? [],
  }));
})();

/** The bot that the technical check flags for automated activity, not a shared device. */
const BOT_ON_DEVICE = 22;

/**
 * Data quality checks: thirty completed questionnaires, satisfied
 * respondents filled. The student switches checks on; each flags a
 * different set of respondents, which are set aside and named by the check
 * that caught them, and the share satisfied among those kept falls from 67%
 * towards the 50% of the genuine respondents only when all five checks run.
 */
export function QualityChecks() {
  const [on, setOn] = useState<Check[]>(["time"]);
  const flagOf = (c: Check[]) => CHECKS.find((k) => on.includes(k.id) && c.includes(k.id));
  const kept = BATCH.filter((r) => !flagOf(r.caught));
  const share = kept.filter((r) => r.satisfied).length / kept.length;
  const removed = BATCH.length - kept.length;

  const cols = 10;
  const cw = 54;
  const ch = 58;
  const gx = 10;
  const gy = 30;
  const ax0 = 24;
  const ax1 = 530;
  const axY = 290;
  const A = (v: number) => r2(ax0 + v * (ax1 - ax0));

  return (
    <>
      <Frame
        width={560}
        height={318}
        label={`Thirty completed questionnaires. With ${on.length ? on.map((c) => CHECKS.find((k) => k.id === c)!.label.toLowerCase()).join(", ") : "no checks"} applied, ${removed} are removed, and ${Math.round(share * 100)} percent of the remaining respondents are satisfied, against 50 percent among the twenty genuine respondents`}
      >
        <Key x={ax0} y={16} fill={INK3} size={10}>
          30 QUESTIONNAIRES · <tspan fill={COUNTER}>SATISFIED</tspan>
        </Key>
        {BATCH.map((r, i) => {
          const cx = r2(gx + (i % cols) * cw + cw / 2);
          const top = gy + Math.floor(i / cols) * ch;
          const flag = flagOf(r.caught);
          return (
            <g key={i}>
              <g opacity={flag ? 0.25 : 1}>
                <Person1 x={cx} y={top + 36} k={0.85} stroke={r.satisfied ? COUNTER : INK} fill={r.satisfied ? COUNTER : PAPER} />
              </g>
              {flag ? (
                <>
                  <path d={`M${r2(cx - 12)} ${top + 6}L${r2(cx + 12)} ${top + 34}M${r2(cx + 12)} ${top + 6}L${r2(cx - 12)} ${top + 34}`} stroke={SIGNAL} strokeWidth={2} strokeLinecap="round" />
                  <Key x={cx} y={top + 49} anchor="middle" fill={SIGNAL} size={7} weight={700}>
                    {i === BOT_ON_DEVICE && flag.id === "technical" ? "AUTOMATED" : flag.tag}
                  </Key>
                </>
              ) : null}
            </g>
          );
        })}

        {/* the estimate from the questionnaires that are kept */}
        <Key x={ax0} y={240} fill={INK3} size={10}>{`SATISFIED AMONG ${kept.length} KEPT`}</Key>
        <Key x={ax1} y={240} anchor="end" fill={SIGNAL} size={10} weight={700}>{`REMOVED ${removed} OF 30`}</Key>
        <line x1={A(0.5)} y1={248} x2={A(0.5)} y2={axY} stroke={INK} strokeWidth={1.25} strokeDasharray="4 4" />
        <Key x={r2(A(0.5) - 6)} y={260} anchor="end" fill={INK} size={9}>GENUINE 50%</Key>
        <circle cx={A(share)} cy={axY - 12} r={6} fill={SIGNAL} />
        <Key x={r2(A(share) + 10)} y={axY - 8} fill={SIGNAL} size={11} weight={700}>{`${Math.round(share * 100)}%`}</Key>
        <line x1={ax0} y1={axY} x2={ax1 + 10} y2={axY} stroke={INK} strokeWidth={1.25} />
        <path d={head.right(ax1 + 10, axY, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
        {[0, 0.25, 0.5, 0.75, 1].map((v) => (
          <g key={v}>
            <line x1={A(v)} y1={axY} x2={A(v)} y2={axY + 4} stroke={INK} strokeWidth={1} />
            <Key x={A(v)} y={axY + 17} anchor="middle" fill={INK3} size={9}>{`${v * 100}%`}</Key>
          </g>
        ))}
      </Frame>
      <Toggles label="Checks" options={CHECKS.map(({ id, label }) => ({ id, label }))} value={on} onChange={setOn} allowNone />
    </>
  );
}

/* --------------------------------------------------------------------------
   Limitations of Synthetic Respondents
   -------------------------------------------------------------------------- */

/** Thirty answers on a 7-point purchase-intention scale, as counts for 1–7. */
const REAL_COUNTS = [2, 3, 5, 6, 6, 5, 3];
const WORDINGS = [
  { id: "a", label: "Wording A", prompt: "\u201cYou are a 35-year-old shopper.\u201d", counts: [0, 0, 1, 5, 16, 7, 1] },
  { id: "b", label: "Wording B", prompt: "\u201cAnswer as a typical 35-year-old shopper.\u201d", counts: [0, 1, 7, 16, 5, 1, 0] },
  { id: "c", label: "Wording C", prompt: "\u201cImagine you are 35 and shop every week.\u201d", counts: [0, 0, 0, 2, 7, 16, 5] },
] as const;
type WordingId = (typeof WORDINGS)[number]["id"];

function stats(counts: readonly number[]) {
  const n = counts.reduce((a, b) => a + b, 0);
  const mean = counts.reduce((a, c, i) => a + c * (i + 1), 0) / n;
  const sd = Math.sqrt(counts.reduce((a, c, i) => a + c * (i + 1 - mean) ** 2, 0) / (n - 1));
  return { mean, sd };
}

/**
 * Real and synthetic answers to one purchase-intention question: thirty
 * people spread across the whole scale, thirty synthetic respondents packed
 * into two or three points. Changing the wording of the prompt moves the
 * synthetic answers along the scale while the real ones stay put.
 */
export function SyntheticSpread() {
  const [w, setW] = useState<WordingId>("a");
  const wording = WORDINGS.find((x) => x.id === w)!;
  const real = stats(REAL_COUNTS);
  const syn = stats(wording.counts);

  const x0 = 40;
  const colW = 48;
  const cx = (i: number) => r2(x0 + i * colW + colW / 2);
  const cell = 14;
  const realBase = 76;
  const synBase = 250;
  const axisY = 266;

  const stack = (counts: readonly number[], base: number, draw: (x: number, y: number, key: string) => React.ReactNode) =>
    counts.flatMap((c, i) =>
      Array.from({ length: c }, (_, j) => {
        const row = Math.floor(j / 3);
        const inRow = Math.min(3, c - row * 3);
        return draw(r2(cx(i) + ((j % 3) - (inRow - 1) / 2) * cell), r2(base - row * cell), `${i}-${j}`);
      }),
    );
  const meanMark = (m: number, base: number, tone: string) => {
    const x = r2(x0 + (m - 0.5) * colW);
    return <path d={`M${r2(x - 5)} ${base + 10}L${x} ${base + 3}L${r2(x + 5)} ${base + 10}Z`} fill={tone} />;
  };

  return (
    <>
      <Frame
        width={400}
        height={304}
        label={`Purchase intention on a 7-point scale. Thirty real respondents spread from 1 to 7, standard deviation ${real.sd.toFixed(1)}. Thirty synthetic respondents prompted with ${wording.prompt} cluster around ${syn.mean.toFixed(1)}, standard deviation ${syn.sd.toFixed(1)}; each wording moves the cluster to a different point`}
      >
        <Key x={x0 - 24} y={18} fill={COUNTER} size={10}>30 REAL RESPONDENTS</Key>
        <Key x={376} y={18} anchor="end" fill={INK} size={10}>{`SD ${real.sd.toFixed(1)}`}</Key>
        {stack(REAL_COUNTS, realBase, (x, y, key) => (
          <Person1 key={key} x={x} y={y} k={0.36} stroke={COUNTER} fill={COUNTER} width={1} />
        ))}
        <line x1={x0 - 6} y1={realBase + 2} x2={x0 + 7 * colW + 12} y2={realBase + 2} stroke={INK3} strokeWidth={1} />
        {meanMark(real.mean, realBase, COUNTER)}
        <line x1={x0 - 24} y1={104} x2={376} y2={104} stroke={RULE} strokeWidth={1} />

        <Key x={x0 - 24} y={128} fill={SIGNAL} size={10}>30 SYNTHETIC RESPONDENTS</Key>
        <Key x={376} y={128} anchor="end" fill={INK} size={10}>{`SD ${syn.sd.toFixed(1)}`}</Key>
        <Note x={x0 - 24} y={148} fill={INK2} size={12} italic>{wording.prompt}</Note>
        {stack(wording.counts, synBase, (x, y, key) => (
          <AiMark1 key={key} cx={x} cy={r2(y - 6)} s={12} fill={SIGNAL} />
        ))}
        {meanMark(syn.mean, synBase, SIGNAL)}

        <line x1={x0 - 6} y1={axisY} x2={x0 + 7 * colW + 12} y2={axisY} stroke={INK} strokeWidth={1.25} />
        <path d={head.right(x0 + 7 * colW + 12, axisY, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
        {REAL_COUNTS.map((_, i) => (
          <Key key={i} x={cx(i)} y={axisY + 17} anchor="middle" fill={INK3} size={10}>{i + 1}</Key>
        ))}
        <Key x={x0 + 7 * colW + 12} y={axisY + 30} anchor="end" fill={INK3} size={9.5}>PURCHASE INTENTION</Key>
      </Frame>
      <Segmented label="Prompt" options={WORDINGS.map(({ id, label }) => ({ id, label }))} value={w} onChange={setW} />
    </>
  );
}

/* --------------------------------------------------------------------------
   Sampling in AI Evaluation
   -------------------------------------------------------------------------- */

/** Simulated willingness to pay stated by one model for one product, prompt after prompt. */
const WTP_MEAN = 9;
const WTP_SD = 3.6;
const WTP_MAX_K = 200;
const WTP_DRAWS: { v: number; j: number }[] = (() => {
  const rnd = seeded(20250914);
  return Array.from({ length: WTP_MAX_K }, () => {
    const u1 = Math.max(rnd(), 1e-9);
    const u2 = rnd();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    return { v: Math.min(19.5, Math.max(0.5, WTP_MEAN + WTP_SD * z)), j: rnd() };
  });
})();

/**
 * Interactive: the slider sets how many responses are drawn from the same
 * model with the same prompt. Each response is a dot; below the axis, the
 * mean of the responses and its 95 percent confidence interval, which
 * narrows with the square root of the number of responses. It opens at 10.
 */
export function ResponsesPerPrompt() {
  const [k, setK] = useState(10);
  const draws = WTP_DRAWS.slice(0, k);
  const mean = draws.reduce((a, d) => a + d.v, 0) / k;
  const sd = k > 1 ? Math.sqrt(draws.reduce((a, d) => a + (d.v - mean) ** 2, 0) / (k - 1)) : 0;
  const half = k > 1 ? (1.96 * sd) / Math.sqrt(k) : 0;
  const x0 = 40;
  const x1 = 372;
  const sx = (v: number) => r2(x0 + (v / 20) * (x1 - x0));
  const axis = 128;
  const yMean = 170;
  const money = (v: number) => `$${v.toFixed(2)}`;
  return (
    <>
      <Frame
        width={400}
        height={212}
        label={`Simulated willingness to pay stated by one model in ${k} ${k === 1 ? "response" : "responses"} to the same prompt${k > 1 ? `, spread from ${money(Math.min(...draws.map((d) => d.v)))} to ${money(Math.max(...draws.map((d) => d.v)))}` : ""}. The mean is ${money(mean)}${k > 1 ? `, with a 95 percent confidence interval of plus or minus ${money(half)}` : "; a single response gives no estimate of variation"}`}
      >
        <Key x={16} y={20} fill={INK3} size={9.5}>{`${k} ${k === 1 ? "RESPONSE" : "RESPONSES"} · SAME PROMPT`}</Key>
        <Key x={384} y={20} anchor="end" fill={INK3} size={9}>SIMULATED</Key>
        {draws.map((d, i) => (
          <circle key={i} cx={sx(d.v)} cy={r2(44 + d.j * 66)} r={k > 60 ? 3 : 4} fill={PAPER3} stroke={INK} strokeWidth={1} />
        ))}
        <line x1={x0 - 10} y1={axis} x2={x1 + 10} y2={axis} stroke={INK} strokeWidth={1.25} />
        {[0, 5, 10, 15, 20].map((v) => (
          <g key={v}>
            <line x1={sx(v)} y1={axis} x2={sx(v)} y2={axis + 5} stroke={INK} strokeWidth={1} />
            <Key x={sx(v)} y={axis + 19} anchor="middle" fill={INK3} size={10}>{`$${v}`}</Key>
          </g>
        ))}
        {k > 1 ? (
          <g>
            <rect x={sx(mean - half)} y={yMean - 7} width={r2(sx(mean + half) - sx(mean - half))} height={14} fill={SIGNAL_TINT} />
            <line x1={sx(mean - half)} y1={yMean - 9} x2={sx(mean - half)} y2={yMean + 9} stroke={SIGNAL} strokeWidth={1.5} />
            <line x1={sx(mean + half)} y1={yMean - 9} x2={sx(mean + half)} y2={yMean + 9} stroke={SIGNAL} strokeWidth={1.5} />
          </g>
        ) : null}
        <circle cx={sx(mean)} cy={yMean} r={5} fill={SIGNAL} />
        <Key x={16} y={yMean + 34} fill={SIGNAL} size={10}>
          {k > 1 ? `MEAN ${money(mean)} · 95% INTERVAL ± ${money(half)}` : `ONE RESPONSE ${money(mean)} · NO ESTIMATE OF VARIATION`}
        </Key>
      </Frame>
      <Slider label="Responses" value={k} min={1} max={WTP_MAX_K} onChange={setK} />
    </>
  );
}
