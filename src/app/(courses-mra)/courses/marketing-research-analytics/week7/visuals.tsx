/* ==========================================================================
   Week 07 plates: Hypothesis Testing and Group Differences.
   Built on ../_visuals/kit and ../_visuals/objects. Every plate follows the
   sentence it illustrates on the slide.
   ========================================================================== */

import React, { useState } from "react";
import {
  Frame,
  Key,
  Display,
  INK,
  INK2,
  INK3,
  RULE,
  RULE2,
  SIGNAL,
  COUNTER,
  PAPER,
  head,
  r2,
  seeded,
  PlateButton,
  Slider,
  Segmented,
  Toggles,
} from "../_visuals/kit";
import { Laptop, DeviceMobile, Lightbulb, Mouse, Basket, Basketball, Book, Pill, TShirt } from "@phosphor-icons/react";
import { Person1, AiMark1, Store1, Tick1 } from "../_visuals/objects";

/* --------------------------------------------------------------------------
   Shared statistics for the week's plates
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

/** Standard normal cumulative probability (Abramowitz–Stegun 7.1.26). */
export function phi(z: number) {
  const t = 1 / (1 + 0.3275911 * Math.abs(z) / Math.SQRT2);
  const y =
    1 -
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) *
      t *
      Math.exp(-(z * z) / 2);
  return z >= 0 ? 0.5 + y / 2 : 0.5 - y / 2;
}

function lnGamma(x: number) {
  const c = [76.18009172947146, -86.50532032941677, 24.01409824083091, -1.231739572450155, 0.001208650973866179, -0.000005395239384953];
  let y = x;
  let t = x + 5.5;
  t -= (x + 0.5) * Math.log(t);
  let s = 1.000000000190015;
  for (const k of c) s += k / ++y;
  return -t + Math.log((2.5066282746310005 * s) / x);
}

function betaFraction(a: number, b: number, x: number) {
  const tiny = 1e-30;
  let c = 1;
  let d = 1 - ((a + b) * x) / (a + 1);
  if (Math.abs(d) < tiny) d = tiny;
  d = 1 / d;
  let h = d;
  for (let m = 1; m <= 200; m++) {
    const m2 = 2 * m;
    let aa = (m * (b - m) * x) / ((a - 1 + m2) * (a + m2));
    d = 1 + aa * d;
    if (Math.abs(d) < tiny) d = tiny;
    c = 1 + aa / c;
    if (Math.abs(c) < tiny) c = tiny;
    d = 1 / d;
    h *= d * c;
    aa = (-(a + m) * (a + b + m) * x) / ((a + m2) * (a + 1 + m2));
    d = 1 + aa * d;
    if (Math.abs(d) < tiny) d = tiny;
    c = 1 + aa / c;
    if (Math.abs(c) < tiny) c = tiny;
    d = 1 / d;
    const del = d * c;
    h *= del;
    if (Math.abs(del - 1) < 3e-7) break;
  }
  return h;
}

/** Regularised incomplete beta function. */
function incBeta(a: number, b: number, x: number) {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  const bt = Math.exp(lnGamma(a + b) - lnGamma(a) - lnGamma(b) + a * Math.log(x) + b * Math.log(1 - x));
  return x < (a + 1) / (a + b + 2) ? (bt * betaFraction(a, b, x)) / a : 1 - (bt * betaFraction(b, a, 1 - x)) / b;
}

/** Two-tailed p-value of a t statistic with df degrees of freedom. */
export function pFromT(t: number, df: number) {
  return incBeta(df / 2, 0.5, df / (df + t * t));
}

/** A p-value as a report would print it. */
export function fmtP(p: number) {
  if (p < 0.001) return "p < 0.001";
  if (p < 0.01) return `p = ${p.toFixed(3)}`;
  return `p = ${p.toFixed(2)}`;
}

/** A signed dollar amount: +$6, −$4. */
const signed = (v: number, unit = "$") => `${v > 0 ? "+" : v < 0 ? "\u2212" : ""}${unit}${Math.abs(v)}`;

/* --------------------------------------------------------------------------
   From Sample to Population
   -------------------------------------------------------------------------- */

/** Forty-eight customers' monthly spending: the whole population. */
const POPULATION = (() => {
  const z = normals(71);
  return Array.from({ length: 48 }, () => Math.max(8, Math.round(62 + 20 * z())));
})();
const POP_MEAN = POPULATION.reduce((a, b) => a + b, 0) / POPULATION.length;
const SAMPLE_N = 8;
/** Pairs drawn before anyone presses the button, so the strip already reads. */
const PRE_DRAWN = 43;

/** Two disjoint samples of eight customers for draw number k. */
function drawPair(k: number) {
  const u = seeded(999 + k * 104729);
  const idx = POPULATION.map((_, i) => i);
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(u() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  const a = idx.slice(0, SAMPLE_N);
  const b = idx.slice(SAMPLE_N, 2 * SAMPLE_N);
  const mean = (s: number[]) => s.reduce((t, i) => t + POPULATION[i], 0) / s.length;
  const ma = Math.round(mean(a));
  const mb = Math.round(mean(b));
  return { a, b, ma, mb, diff: ma - mb };
}

/**
 * From sample to population: forty-eight customers form the population. Each
 * press draws two samples of eight from it, and the difference between the
 * two sample means joins a strip below. The population is the same every
 * time, yet the differences scatter on both sides of zero: chance alone
 * produces differences between samples.
 */
export function SameSourceDifferences() {
  const [draws, setDraws] = useState(PRE_DRAWN);
  const pairs = React.useMemo(() => Array.from({ length: draws }, (_, k) => drawPair(k)), [draws]);
  const now = pairs[pairs.length - 1];
  const inA = new Set(now.a);
  const inB = new Set(now.b);

  const px0 = 44;
  const pdx = 23.3;
  const row = (i: number) => (i < 24 ? 76 : 116);
  const col = (i: number) => r2(px0 + (i % 24) * pdx);

  const x0 = 70;
  const x1 = 590;
  const lim = 30;
  const X = (v: number) => r2(x0 + ((v + lim) / (2 * lim)) * (x1 - x0));
  const base = 352;
  const stacks = new Map<number, number>();
  const dots = pairs.map((p, k) => {
    const v = Math.max(-lim, Math.min(lim, p.diff));
    const bin = v;
    const level = stacks.get(bin) ?? 0;
    stacks.set(bin, level + 1);
    return { x: X(bin), y: r2(base - 5 - level * 6.5), last: k === pairs.length - 1 };
  });

  return (
    <div>
      <Frame
        width={640}
        height={392}
        label={`A population of 48 customers with a mean monthly spending of ${Math.round(POP_MEAN)} dollars. Two samples of eight are drawn from it: their means are ${now.ma} and ${now.mb} dollars, a difference of ${now.diff} dollars. After ${draws} pairs of samples, the differences between sample means scatter on both sides of zero`}
      >
        <Key x={20} y={22}>POPULATION</Key>
        <Key x={620} y={22} anchor="end">{`MEAN $${Math.round(POP_MEAN)} · PARAMETER`}</Key>
        {POPULATION.map((_, i) => (
          <Person1
            key={i}
            x={col(i)}
            y={row(i)}
            k={0.62}
            width={1.25}
            stroke={inA.has(i) ? INK : inB.has(i) ? COUNTER : INK3}
            fill={inA.has(i) ? INK : inB.has(i) ? COUNTER : PAPER}
          />
        ))}

        {/* the two sample means */}
        <line x1={20} y1={138} x2={620} y2={138} stroke={RULE} strokeWidth={1} />
        <Key x={20} y={162} fill={INK}>SAMPLE 1 · MEAN</Key>
        <Display x={20} y={192} size={26}>{`$${now.ma}`}</Display>
        <Key x={230} y={162} fill={COUNTER}>SAMPLE 2 · MEAN</Key>
        <Display x={230} y={192} size={26} fill={COUNTER}>{`$${now.mb}`}</Display>
        <Key x={620} y={162} anchor="end" fill={SIGNAL}>DIFFERENCE · STATISTIC</Key>
        <Display x={620} y={192} anchor="end" size={26} fill={SIGNAL}>{signed(now.diff)}</Display>

        {/* strip of differences, one dot per pair of samples */}
        <Key x={20} y={226}>{`DIFFERENCE BETWEEN THE TWO MEANS · ${draws} PAIRS OF SAMPLES`}</Key>
        <Key x={620} y={226} anchor="end" fill={INK3}>SIMULATED</Key>
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.last ? 4 : 3.1} fill={d.last ? SIGNAL : INK3} fillOpacity={d.last ? 1 : 0.65} />
        ))}
        <line x1={x0 - 10} y1={base} x2={x1 + 12} y2={base} stroke={INK} strokeWidth={1.25} />
        <path d={head.right(x1 + 12, base, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
        {[-30, -20, -10, 0, 10, 20, 30].map((v) => (
          <g key={v}>
            <line x1={X(v)} y1={base} x2={X(v)} y2={base + 4} stroke={INK} strokeWidth={1} />
            <Key x={X(v)} y={base + 18} anchor="middle" fill={v === 0 ? INK : INK3} size={9.5}>
              {v === 0 ? "$0" : signed(v)}
            </Key>
          </g>
        ))}
      </Frame>
      <div className="mt-2 flex items-center gap-3 px-1">
        <PlateButton onClick={() => setDraws((d) => Math.min(d + 1, 200))}>Draw two new samples</PlateButton>
      </div>
    </div>
  );
}


/* --------------------------------------------------------------------------
   Null and Alternative Hypotheses
   -------------------------------------------------------------------------- */

/**
 * Two-tailed and one-tailed alternatives on the same line: the difference in
 * mean monthly spending, members minus nonmembers. H0 is the single point of
 * no difference; a two-tailed H1 covers both directions away from it, a
 * one-tailed H1 only the direction specified in advance.
 */
export function TailDirections() {
  const x0 = 24;
  const x1 = 496;
  const zx = 260;
  const rows = [
    { y: 74, name: "TWO-TAILED TEST", left: true },
    { y: 176, name: "ONE-TAILED TEST", left: false },
  ];
  return (
    <Frame
      width={520}
      height={230}
      label="Two lines of the difference in mean monthly spending between members and nonmembers. On each, H0 is the point of no difference. In a two-tailed test, H1 extends in both directions, members spending less or more; in a one-tailed test, H1 extends only towards members spending more"
    >
      {rows.map((r) => (
        <g key={r.name}>
          <Key x={x0} y={r.y - 42} fill={INK}>{r.name}</Key>
          <line x1={x0} y1={r.y} x2={x1} y2={r.y} stroke={RULE2} strokeWidth={1.25} />
          {/* H1: arrows away from the point of no difference */}
          <path d={`M${zx + 14} ${r.y}H${x1}`} stroke={SIGNAL} strokeWidth={3} />
          <path d={head.right(x1, r.y, 11)} fill="none" stroke={SIGNAL} strokeWidth={3} />
          <Key x={x1} y={r.y + 26} anchor="end" fill={SIGNAL}>MEMBERS SPEND MORE</Key>
          {r.left ? (
            <>
              <path d={`M${zx - 14} ${r.y}H${x0}`} stroke={SIGNAL} strokeWidth={3} />
              <path d={head.left(x0, r.y, 11)} fill="none" stroke={SIGNAL} strokeWidth={3} />
              <Key x={x0} y={r.y + 26} fill={SIGNAL}>MEMBERS SPEND LESS</Key>
            </>
          ) : null}
          <Key x={390} y={r.y - 12} anchor="middle" fill={SIGNAL} size={12} weight={700}>H1</Key>
          {r.left ? <Key x={130} y={r.y - 12} anchor="middle" fill={SIGNAL} size={12} weight={700}>H1</Key> : null}
          {/* H0: the single point of no difference */}
          <circle cx={zx} cy={r.y} r={6.5} fill={INK} />
          <Key x={zx} y={r.y - 16} anchor="middle" fill={INK} size={12} weight={700}>H0</Key>
          <Key x={zx} y={r.y + 26} anchor="middle">NO DIFFERENCE</Key>
        </g>
      ))}
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   The p-Value and the Significance Level
   -------------------------------------------------------------------------- */

/** Pointer position in a plate's own units. */
function svgX(ev: React.PointerEvent<SVGSVGElement>) {
  const ctm = ev.currentTarget.getScreenCTM();
  if (!ctm) return null;
  return new DOMPoint(ev.clientX, ev.clientY).matrixTransform(ctm.inverse()).x;
}

/** Pointer handlers that make a whole plate one horizontal drag. */
function dragProps(onX: (x: number) => void): React.SVGProps<SVGSVGElement> {
  return {
    onPointerDown: (ev) => {
      ev.currentTarget.setPointerCapture(ev.pointerId);
      const x = svgX(ev);
      if (x !== null) onX(x);
    },
    onPointerMove: (ev) => {
      if (!ev.currentTarget.hasPointerCapture(ev.pointerId)) return;
      const x = svgX(ev);
      if (x !== null) onX(x);
    },
  };
}

/** A left–right drag handle drawn on an axis. */
function DragHandle({ x, y, tone = SIGNAL }: { x: number; y: number; tone?: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={7} fill={tone} stroke={PAPER} strokeWidth={2} />
      <path d={`M${r2(x - 12)} ${y - 4}L${r2(x - 17)} ${y}L${r2(x - 12)} ${y + 4}Z`} fill={tone} />
      <path d={`M${r2(x + 12)} ${y - 4}L${r2(x + 17)} ${y}L${r2(x + 12)} ${y + 4}Z`} fill={tone} />
    </g>
  );
}

/**
 * The p-value as an area: the distribution of the test statistic if H0 were
 * true. The student drags the observed result; the shaded tails beyond it on
 * both sides are the p-value. Moving from t = 2.05 to t = 1.88 barely changes
 * the shaded area (p from 0.04 to 0.06), but crosses the 0.05 threshold.
 */
export function PValueTail() {
  const [t, setT] = useState(2.05);
  const p = 2 * (1 - phi(t));
  const x0 = 40;
  const x1 = 600;
  const lim = 3.6;
  const X = (v: number) => r2(x0 + ((v + lim) / (2 * lim)) * (x1 - x0));
  const tOf = (x: number) => ((x - x0) / (x1 - x0)) * 2 * lim - lim;
  const base = 270;
  const peak = 160;
  const Y = (v: number) => r2(base - peak * Math.exp(-(v * v) / 2));
  const set = (v: number) => setT(Math.max(0.2, Math.min(3.4, Math.round(v * 100) / 100)));
  const line = (from: number, to: number) =>
    Array.from({ length: 41 }, (_, i) => {
      const v = from + ((to - from) * i) / 40;
      return `${i === 0 ? "M" : "L"}${X(v)} ${Y(v)}`;
    }).join("");
  const area = (from: number, to: number) => `${line(from, to)}L${X(to)} ${base}L${X(from)} ${base}Z`;
  const curve = line(-lim, lim);
  const reject = p < 0.05;
  const crit = 1.96;
  const labelRight = X(t) < 470;

  return (
    <div>
      <Frame
        width={640}
        height={316}
        label={`The distribution of the test statistic if the null hypothesis were true. The observed test statistic is ${t.toFixed(2)}; the shaded tails beyond it on both sides give ${fmtP(p)}, ${reject ? "below the significance level of 0.05, so the null hypothesis is rejected" : "above the significance level of 0.05, so the null hypothesis is not rejected"}`}
        className="cursor-ew-resize touch-none select-none"
        svgProps={dragProps((x) => set(tOf(x)))}
      >
        {/* the p-value: both tails at least as extreme as the observed result */}
        <path d={area(t, lim)} fill={SIGNAL} fillOpacity={0.5} stroke="none" />
        <path d={area(-lim, -t)} fill={SIGNAL} fillOpacity={0.5} stroke="none" />
        <path d={curve} fill="none" stroke={INK} strokeWidth={1.5} />
        <Key x={X(0)} y={Y(0) - 12} anchor="middle">IF H0 WERE TRUE</Key>

        {/* the 0.05 threshold */}
        {[-crit, crit].map((c) => (
          <line key={c} x1={X(c)} y1={base} x2={X(c)} y2={Y(c)} stroke={INK3} strokeWidth={1.25} strokeDasharray="3 3" />
        ))}

        {/* the observed result and its mirror */}
        <line x1={X(-t)} y1={base} x2={X(-t)} y2={r2(base - peak - 6)} stroke={SIGNAL} strokeWidth={1.25} strokeDasharray="4 3" />
        <line x1={X(t)} y1={base} x2={X(t)} y2={r2(base - peak - 6)} stroke={SIGNAL} strokeWidth={1.75} />
        <Key x={labelRight ? r2(X(t) + 8) : r2(X(t) - 8)} y={r2(base - peak + 6)} anchor={labelRight ? "start" : "end"} fill={SIGNAL}>
          OBSERVED
        </Key>

        <line x1={x0 - 6} y1={base} x2={x1 + 6} y2={base} stroke={INK} strokeWidth={1.25} />
        <Key x={X(0)} y={base + 20} anchor="middle" fill={INK3} size={9.5}>0</Key>
        <Key x={X(-crit)} y={base + 20} anchor="middle" fill={INK3} size={9.5}>{"\u22121.96"}</Key>
        <Key x={X(crit)} y={base + 20} anchor="middle" fill={INK3} size={9.5}>+1.96</Key>
        <Key x={X(0)} y={base + 38} anchor="middle" fill={INK3} size={9.5}>TEST STATISTIC</Key>
        <Key x={X(-crit)} y={base + 38} anchor="middle" fill={INK3} size={9.5}>0.05 THRESHOLD</Key>
        <Key x={X(crit)} y={base + 38} anchor="middle" fill={INK3} size={9.5}>0.05 THRESHOLD</Key>
        <g
          role="slider"
          tabIndex={0}
          aria-label="Observed test statistic"
          aria-valuemin={0.2}
          aria-valuemax={3.4}
          aria-valuenow={t}
          className="outline-none"
          onKeyDown={(ev) => {
            if (ev.key === "ArrowRight" || ev.key === "ArrowUp") set(t + 0.05);
            else if (ev.key === "ArrowLeft" || ev.key === "ArrowDown") set(t - 0.05);
            else return;
            ev.preventDefault();
          }}
        >
          <DragHandle x={X(t)} y={base} />
        </g>

        {/* the readout */}
        <Display x={x0} y={36} size={30} fill={SIGNAL}>{fmtP(p)}</Display>
        <Key x={x0} y={58} fill={reject ? SIGNAL : INK2}>
          {reject ? "BELOW 0.05 \u00b7 H0 REJECTED" : "ABOVE 0.05 \u00b7 H0 NOT REJECTED"}
        </Key>
      </Frame>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Type I and Type II Errors
   -------------------------------------------------------------------------- */

const ERROR_NS = [
  { id: "50", label: "50" },
  { id: "200", label: "200" },
  { id: "800", label: "800" },
] as const;
type ErrorN = (typeof ERROR_NS)[number]["id"];
/** The true difference in the H1 world, in pooled standard deviations. */
const TRUE_D = 0.2;

/**
 * Type I and Type II errors: the test statistic's distribution if H0 is true
 * and if H1 is true (a true difference of 0.2 standard deviations). The
 * student drags the critical value: moving it right shrinks the Type I area
 * and grows the Type II area. Changing the sample size moves the H1 curve
 * away from H0, and power rises.
 */
export function ErrorTradeoff() {
  const [c, setC] = useState(1.645);
  const [n, setN] = useState<ErrorN>("200");
  const delta = TRUE_D * Math.sqrt(Number(n) / 2);
  const typeI = 1 - phi(c);
  const typeII = phi(c - delta);
  const power = 1 - typeII;

  const x0 = 30;
  const x1 = 610;
  const lo = -3.4;
  const hi = 7.4;
  const X = (v: number) => r2(x0 + ((v - lo) / (hi - lo)) * (x1 - x0));
  const vOf = (x: number) => lo + ((x - x0) / (x1 - x0)) * (hi - lo);
  const base = 262;
  const peak = 128;
  const Y = (v: number, m: number) => r2(base - peak * Math.exp(-((v - m) ** 2) / 2));
  const line = (from: number, to: number, m: number) =>
    Array.from({ length: 49 }, (_, i) => {
      const v = from + ((to - from) * i) / 48;
      return `${i === 0 ? "M" : "L"}${X(v)} ${Y(v, m)}`;
    }).join("");
  const area = (from: number, to: number, m: number) =>
    to <= from ? "" : `${line(from, to, m)}L${X(to)} ${base}L${X(from)} ${base}Z`;
  const set = (v: number) => setC(Math.max(0, Math.min(4.2, Math.round(v * 100) / 100)));
  const pct = (v: number) => `${Math.round(v * 100)}%`;
  const cx = X(c);

  return (
    <div>
      <Frame
        width={640}
        height={318}
        label={`Two distributions of the test statistic: if H0 is true, and if H1 is true with a true difference of 0.2 standard deviations and ${n} respondents per group. With the critical value at ${c.toFixed(2)}, the probability of a Type I error is ${pct(typeI)}, of a Type II error ${pct(typeII)}, and the power is ${pct(power)}`}
        className="cursor-ew-resize touch-none select-none"
        svgProps={dragProps((x) => set(vOf(x)))}
      >
        {/* areas: Type II (H1 true, not rejected), power (H1 true, rejected), Type I (H0 true, rejected) */}
        <path d={area(lo, c, delta)} fill={INK3} fillOpacity={0.28} />
        <path d={area(c, hi, delta)} fill={SIGNAL} fillOpacity={0.3} />
        <path d={area(c, hi, 0)} fill={COUNTER} fillOpacity={0.6} />
        <path d={line(lo, hi, 0)} fill="none" stroke={INK} strokeWidth={1.5} />
        <path d={line(lo, hi, delta)} fill="none" stroke={INK} strokeWidth={1.5} />
        <Key x={r2(X(0) + 20)} y={base - peak - 12} anchor="end" fill={INK}>IF H0 IS TRUE</Key>
        <Key x={r2(X(delta) - 20)} y={base - peak - 12} fill={INK}>IF H1 IS TRUE</Key>

        {/* critical value */}
        <line x1={cx} y1={base} x2={cx} y2={r2(base - peak - 2)} stroke={INK} strokeWidth={1.5} />
        <line x1={x0 - 4} y1={base} x2={x1 + 4} y2={base} stroke={INK} strokeWidth={1.25} />
        <Key x={r2(cx - 12)} y={base + 24} anchor="end" fill={INK3} size={9.5}>H0 NOT REJECTED</Key>
        <Key x={r2(cx + 12)} y={base + 24} fill={INK} size={9.5}>H0 REJECTED</Key>
        <Key x={x1} y={base + 46} anchor="end" fill={INK3} size={9.5}>TEST STATISTIC</Key>
        <g
          role="slider"
          tabIndex={0}
          aria-label="Critical value"
          aria-valuemin={0}
          aria-valuemax={4.2}
          aria-valuenow={c}
          className="outline-none"
          onKeyDown={(ev) => {
            if (ev.key === "ArrowRight" || ev.key === "ArrowUp") set(c + 0.1);
            else if (ev.key === "ArrowLeft" || ev.key === "ArrowDown") set(c - 0.1);
            else return;
            ev.preventDefault();
          }}
        >
          <DragHandle x={cx} y={base} tone={INK} />
        </g>

        {/* readouts */}
        {[
          { k: "TYPE I ERROR", v: typeI, tone: COUNTER, x: 20 },
          { k: "TYPE II ERROR", v: typeII, tone: INK2, x: 230 },
          { k: "POWER", v: power, tone: SIGNAL, x: 440 },
        ].map((r) => (
          <g key={r.k}>
            <Key x={r.x} y={27} fill={r.tone}>{r.k}</Key>
            <Display x={r.x} y={62} size={30} fill={r.tone}>{pct(r.v)}</Display>
          </g>
        ))}
      </Frame>
      <Segmented label="Respondents per group" options={[...ERROR_NS]} value={n} onChange={setN} />
    </div>
  );
}

/* --------------------------------------------------------------------------
   The Independent-Samples t-Test
   -------------------------------------------------------------------------- */

const LEVER_MAX_N = 200;
/** Standard-normal draws for each group, standardised within every prefix length on use. */
const LEVER_Z = [normals(311), normals(733)].map((z) => Array.from({ length: LEVER_MAX_N }, () => z()));
const LEVER_JITTER = (() => {
  const u = seeded(92);
  return Array.from({ length: LEVER_MAX_N }, () => u() * 2 - 1);
})();

/** The first n draws rescaled to mean 0 and standard deviation 1, so the dots match the levers exactly. */
function standardised(z: number[], n: number) {
  const s = z.slice(0, n);
  const m = s.reduce((a, b) => a + b, 0) / n;
  const sd = Math.sqrt(s.reduce((a, b) => a + (b - m) ** 2, 0) / (n - 1));
  return s.map((v) => (v - m) / sd);
}

/**
 * The three levers of t: members' and nonmembers' monthly spending as dots.
 * Sliders set the difference between the means, the spread within the
 * groups and the number of respondents per group; t is the difference
 * divided by its standard error, and the p-value follows. Each lever alone
 * can carry the result across the 0.05 threshold.
 */
export function TLevers() {
  const [diff, setDiff] = useState(10);
  const [sd, setSd] = useState(25);
  const [n, setN] = useState(40);
  const se = sd * Math.sqrt(2 / n);
  const t = diff / se;
  const p = pFromT(t, 2 * n - 2);
  const base = 80;

  const x0 = 30;
  const x1 = 610;
  const X = (v: number) => r2(x0 + (Math.max(0, Math.min(200, v)) / 200) * (x1 - x0));
  const groups = [
    { name: "MEMBERS", mean: base + diff, z: standardised(LEVER_Z[0], n), y: 130, tone: COUNTER },
    { name: "NONMEMBERS", mean: base, z: standardised(LEVER_Z[1], n), y: 214, tone: INK3 },
  ];
  const axis = 262;
  const sig = p < 0.05;

  return (
    <div>
      <Frame
        width={640}
        height={300}
        label={`Monthly spending of ${n} members and ${n} nonmembers. Members spend ${diff} dollars more on average, with a standard deviation of ${sd} dollars within each group. The standard error of the difference is ${se.toFixed(2)} dollars, so t is ${t.toFixed(2)} and ${fmtP(p)}`}
      >
        <Key x={20} y={24}>t = DIFFERENCE BETWEEN THE MEANS ÷ ITS STANDARD ERROR</Key>
        <Display x={20} y={60} size={26}>{`$${diff} ÷ $${se.toFixed(2)}`}</Display>
        <Display x={300} y={60} size={26} fill={SIGNAL}>{`t = ${t.toFixed(2)}`}</Display>
        <Display x={620} y={60} size={26} anchor="end" fill={sig ? SIGNAL : INK2}>{fmtP(p)}</Display>

        {groups.map((g) => (
          <g key={g.name}>
            <Key x={20} y={g.y - 30} fill={g.tone === INK3 ? INK2 : g.tone}>{g.name}</Key>
            {g.z.map((v, i) => (
              <circle
                key={i}
                cx={X(g.mean + v * sd)}
                cy={r2(g.y + LEVER_JITTER[i] * 16)}
                r={2.6}
                fill={g.tone}
                fillOpacity={0.55}
              />
            ))}
            <line x1={X(g.mean)} y1={g.y - 22} x2={X(g.mean)} y2={g.y + 22} stroke={g.tone === INK3 ? INK : g.tone} strokeWidth={2.5} />
          </g>
        ))}
        {/* the difference between the means */}
        {diff > 0 ? (
          <g>
            <path d={`M${X(base)} 172H${X(base + diff)}`} stroke={SIGNAL} strokeWidth={1.75} />
            <path d={`M${X(base)} 166V178M${X(base + diff)} 166V178`} stroke={SIGNAL} strokeWidth={1.75} />
            <Key x={r2(X(base + diff) + 8)} y={176} fill={SIGNAL} size={9.5}>DIFFERENCE</Key>
          </g>
        ) : null}

        <line x1={x0 - 6} y1={axis} x2={x1 + 8} y2={axis} stroke={INK} strokeWidth={1.25} />
        <path d={head.right(x1 + 8, axis, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
        {[0, 40, 80, 120, 160, 200].map((v) => (
          <g key={v}>
            <line x1={X(v)} y1={axis} x2={X(v)} y2={axis + 4} stroke={INK} strokeWidth={1} />
            <Key x={X(v)} y={axis + 18} anchor="middle" fill={INK3} size={9.5}>{`$${v}`}</Key>
          </g>
        ))}
      </Frame>
      <Slider label="Difference in means" value={diff} min={0} max={40} onChange={setDiff} />
      <Slider label="Spread within groups" value={sd} min={5} max={25} onChange={setSd} />
      <Slider label="Respondents per group" value={n} min={10} max={200} step={10} onChange={setN} />
    </div>
  );
}

/* --------------------------------------------------------------------------
   The Paired-Samples t-Test
   -------------------------------------------------------------------------- */

/** Twelve respondents' ratings of a brand (0–100) before the advertisement. */
const BRAND_BEFORE = [24, 30, 36, 42, 48, 54, 60, 66, 72, 78, 84, 90];
/** Each respondent's rise after exposure: small, but every one of them goes up. */
const BRAND_GAIN = [4, 6, 4, 5, 7, 5, 4, 6, 4, 6, 5, 4];
const BRAND_AFTER = BRAND_BEFORE.map((v, i) => v + BRAND_GAIN[i]);

function meanSd(v: number[]) {
  const m = v.reduce((a, b) => a + b, 0) / v.length;
  return { m, sd: Math.sqrt(v.reduce((a, b) => a + (b - m) ** 2, 0) / (v.length - 1)) };
}

const PAIR_VIEWS = [
  { id: "independent", label: "Two independent groups" },
  { id: "paired", label: "Paired: same respondents" },
] as const;
type PairView = (typeof PAIR_VIEWS)[number]["id"];

/**
 * The same twelve respondents rate a brand before and after an advertisement.
 * Analysed as two independent groups, the five-point rise is lost in the
 * spread between respondents (t = 0.57). Analysed as pairs, each
 * respondent's rise is compared with their own earlier rating, and every
 * line goes up (t = 16.6).
 */
export function PairedVersusIndependent() {
  const [view, setView] = useState<PairView>("independent");
  const paired = view === "paired";
  const b = meanSd(BRAND_BEFORE);
  const a = meanSd(BRAND_AFTER);
  const d = meanSd(BRAND_GAIN);
  const n = BRAND_BEFORE.length;
  const t = paired ? d.m / (d.sd / Math.sqrt(n)) : (a.m - b.m) / Math.sqrt((a.sd ** 2 + b.sd ** 2) / n);
  const df = paired ? n - 1 : 2 * n - 2;
  const p = pFromT(t, df);

  const top = 44;
  const bottom = 272;
  const Y = (v: number) => r2(bottom - ((v - 20) / 80) * (bottom - top));
  const xb = 150;
  const xa = 350;

  return (
    <div>
      <Frame
        width={640}
        height={300}
        label={`Twelve respondents rate a brand from 0 to 100 before and after an advertisement; every rating rises by 4 to 7 points, 5 on average. ${paired ? "Analysed as pairs, each respondent is compared with themselves" : "Analysed as two independent groups, the rise is small beside the spread between respondents"}: t = ${t.toFixed(2)}, ${fmtP(p)}`}
      >
        <Key x={xb} y={22} anchor="middle" fill={INK}>BEFORE THE AD</Key>
        <Key x={xa} y={22} anchor="middle" fill={INK}>AFTER THE AD</Key>
        {[20, 40, 60, 80, 100].map((v) => (
          <g key={v}>
            <line x1={62} y1={Y(v)} x2={440} y2={Y(v)} stroke={RULE} strokeWidth={1} />
            <Key x={54} y={r2(Y(v) + 4)} anchor="end" fill={INK3} size={9.5}>{v}</Key>
          </g>
        ))}
        <Key x={20} y={22} fill={INK3} size={9.5}>RATING</Key>

        {paired
          ? BRAND_BEFORE.map((v, i) => (
              <line key={i} x1={xb} y1={Y(v)} x2={xa} y2={Y(BRAND_AFTER[i])} stroke={SIGNAL} strokeWidth={1.5} strokeOpacity={0.8} />
            ))
          : null}
        {BRAND_BEFORE.map((v, i) => (
          <circle key={`b${i}`} cx={xb} cy={Y(v)} r={4} fill={INK} />
        ))}
        {BRAND_AFTER.map((v, i) => (
          <circle key={`a${i}`} cx={xa} cy={Y(v)} r={4} fill={INK} />
        ))}
        {/* group means */}
        {[
          { x: xb, m: b.m },
          { x: xa, m: a.m },
        ].map((g) => (
          <g key={g.x}>
            <line x1={g.x - 40} y1={Y(g.m)} x2={g.x - 14} y2={Y(g.m)} stroke={COUNTER} strokeWidth={2.5} />
            <line x1={g.x + 14} y1={Y(g.m)} x2={g.x + 40} y2={Y(g.m)} stroke={COUNTER} strokeWidth={2.5} />
          </g>
        ))}
        <Key x={r2(xa + 46)} y={r2(Y(a.m) + 4)} fill={COUNTER} size={9.5}>MEAN</Key>

        {/* the verdict */}
        <line x1={470} y1={44} x2={470} y2={272} stroke={RULE} strokeWidth={1} />
        <Key x={492} y={70}>DIFFERENCE IN MEANS</Key>
        <Display x={492} y={104} size={28}>+5</Display>
        <Key x={492} y={160} fill={paired ? SIGNAL : INK2}>{paired ? "PAIRED t-TEST" : "INDEPENDENT t-TEST"}</Key>
        <Display x={492} y={196} size={28} fill={paired ? SIGNAL : INK2}>{`t = ${t.toFixed(2)}`}</Display>
        <Display x={492} y={234} size={28} fill={paired ? SIGNAL : INK2}>{fmtP(p)}</Display>
      </Frame>
      <Segmented label="Analyse as" options={[...PAIR_VIEWS]} value={view} onChange={setView} />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Analysis of Variance
   -------------------------------------------------------------------------- */

/** Two-sided p-value of an F statistic. */
function pFromF(f: number, d1: number, d2: number) {
  return incBeta(d2 / 2, d1 / 2, d2 / (d2 + d1 * f));
}

/** Mean satisfaction (0–100) online, in store and in the app: identical in both panels. */
const CHANNEL_MEANS = [52, 60, 64];
const CHANNEL_N = 15;
const CHANNEL_Z = [normals(41), normals(42), normals(43)].map((z) =>
  standardised(Array.from({ length: CHANNEL_N }, () => z()), CHANNEL_N),
);
const CHANNEL_JITTER = (() => {
  const u = seeded(17);
  return Array.from({ length: CHANNEL_N }, () => u() * 2 - 1);
})();

/** The channel a group shops through, drawn as the thing: a laptop, a shop, a phone. */
function ChannelIcon({ i, cx, cy }: { i: number; cx: number; cy: number }) {
  const s = 26;
  if (i === 1) return <Store1 cx={cx} cy={cy} k={1.3} />;
  const Icon = i === 0 ? Laptop : DeviceMobile;
  return <Icon x={r2(cx - s / 2)} y={r2(cy - s / 2)} size={s} weight="regular" color={INK} />;
}

/**
 * The F statistic: satisfaction of fifteen customers in each of three
 * channels (online, in store, in the app). Both panels have the same three
 * group means, so the variation between them is the same; only the
 * variation within the groups differs. Tight groups give a large F; spread
 * groups give a small F that is not significant.
 */
export function BetweenWithin() {
  const panels = [
    { sd: 4, x: 20, name: "LITTLE VARIATION WITHIN GROUPS" },
    { sd: 14, x: 420, name: "MUCH VARIATION WITHIN GROUPS" },
  ];
  const grand = CHANNEL_MEANS.reduce((a, b) => a + b, 0) / 3;
  const msb = (CHANNEL_N * CHANNEL_MEANS.reduce((a, m) => a + (m - grand) ** 2, 0)) / 2;
  const top = 60;
  const bottom = 214;
  const Y = (v: number) => r2(bottom - ((v - 20) / 80) * (bottom - top));
  const stats = panels.map((pn) => {
    const f = msb / pn.sd ** 2;
    return { f, p: pFromF(f, 2, 3 * CHANNEL_N - 3) };
  });

  return (
    <Frame
      width={800}
      height={256}
      label={`Satisfaction of fifteen customers in each of three channels: online, in store and in the mobile application, with means of 52, 60 and 64 in both panels. With little variation within the groups, F is ${stats[0].f.toFixed(1)} (${fmtP(stats[0].p)}); with much variation within the groups, F is ${stats[1].f.toFixed(1)} (${fmtP(stats[1].p)})`}
    >
      {panels.map((pn, k) => {
        const cols = [0, 1, 2].map((i) => r2(pn.x + 110 + i * 86));
        return (
          <g key={pn.name}>
            <Key x={pn.x} y={20} fill={INK} size={10}>{pn.name}</Key>
            {[20, 40, 60, 80, 100].map((v) => (
              <g key={v}>
                <line x1={pn.x + 30} y1={Y(v)} x2={pn.x + 370} y2={Y(v)} stroke={RULE} strokeWidth={1} />
                <Key x={pn.x + 22} y={r2(Y(v) + 4)} anchor="end" fill={INK3} size={9.5}>{v}</Key>
              </g>
            ))}
            {CHANNEL_MEANS.map((m, i) => (
              <g key={i}>
                {CHANNEL_Z[i].map((z, j) => (
                  <circle key={j} cx={r2(cols[i] + CHANNEL_JITTER[j] * 14)} cy={Y(m + z * pn.sd)} r={3} fill={INK3} fillOpacity={0.7} />
                ))}
                <line x1={r2(cols[i] - 24)} y1={Y(m)} x2={r2(cols[i] + 24)} y2={Y(m)} stroke={SIGNAL} strokeWidth={2.5} />
                <ChannelIcon i={i} cx={cols[i]} cy={236} />
              </g>
            ))}
            {/* between: the spread of the three means */}
            <path d={`M${pn.x + 58} ${Y(CHANNEL_MEANS[0])}V${Y(CHANNEL_MEANS[2])}`} stroke={SIGNAL} strokeWidth={1.75} />
            <path d={`M${pn.x + 53} ${Y(CHANNEL_MEANS[0])}H${pn.x + 63}M${pn.x + 53} ${Y(CHANNEL_MEANS[2])}H${pn.x + 63}`} stroke={SIGNAL} strokeWidth={1.75} />
            <Key x={pn.x + 52} y={r2(Y(CHANNEL_MEANS[2]) - 10)} anchor="middle" fill={SIGNAL} size={9.5}>BETWEEN</Key>
            {/* the verdict */}
            <Display x={pn.x + 370} y={24} anchor="end" size={22} fill={stats[k].p < 0.05 ? SIGNAL : INK2}>
              {`F = ${stats[k].f.toFixed(1)}`}
            </Display>
            <Key x={pn.x + 370} y={44} anchor="end" fill={stats[k].p < 0.05 ? SIGNAL : INK2}>
              {fmtP(stats[k].p)}
            </Key>
            {/* within: the spread of one group */}
            {(() => {
              const vals = CHANNEL_Z[2].map((z) => CHANNEL_MEANS[2] + z * pn.sd);
              const y0 = Y(Math.max(...vals));
              const y1 = Y(Math.min(...vals));
              const bx = r2(cols[2] + 34);
              return (
                <g>
                  <path d={`M${bx} ${y0}V${y1}M${bx - 4} ${y0}H${bx + 4}M${bx - 4} ${y1}H${bx + 4}`} stroke={INK3} strokeWidth={1.5} />
                  <Key x={r2(bx + 8)} y={r2((y0 + y1) / 2 + 4)} fill={INK3} size={9.5}>WITHIN</Key>
                </g>
              );
            })()}
          </g>
        );
      })}
      <line x1={400} y1={10} x2={400} y2={250} stroke={RULE2} strokeWidth={1} />
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   The Chi-Square Test
   -------------------------------------------------------------------------- */

/** Preferred channel (online, in store, app) by age group: 100 respondents per age group. */
const CHANNEL_BY_AGE = [
  { age: "18\u201334", counts: [45, 25, 30] },
  { age: "35\u201354", counts: [33, 40, 27] },
  { age: "55+", counts: [22, 55, 23] },
];

/**
 * The chi-square test: preferred shopping channel by age group. Each cell
 * shows the observed frequency and, beneath it, the frequency expected if
 * channel and age were unrelated; the stronger a cell's tint, the larger
 * its discrepancy. The discrepancies sum to the chi-square statistic.
 */
export function ObservedExpected() {
  const rows = CHANNEL_BY_AGE.map((r) => r.counts.reduce((a, b) => a + b, 0));
  const cols = [0, 1, 2].map((j) => CHANNEL_BY_AGE.reduce((a, r) => a + r.counts[j], 0));
  const total = rows.reduce((a, b) => a + b, 0);
  const cells = CHANNEL_BY_AGE.map((r, i) =>
    r.counts.map((o, j) => {
      const e = (rows[i] * cols[j]) / total;
      return { o, e, part: (o - e) ** 2 / e };
    }),
  );
  const chi = cells.flat().reduce((a, c) => a + c.part, 0);
  /* with 4 degrees of freedom the upper tail is exactly e^(−x/2)(1 + x/2) */
  const p = Math.exp(-chi / 2) * (1 + chi / 2);
  const maxPart = Math.max(...cells.flat().map((c) => c.part));

  const cx0 = 76;
  const cw = 130;
  const ry0 = 66;
  const rh = 58;
  return (
    <Frame
      width={548}
      height={318}
      label={`Preferred shopping channel by age group, 100 respondents per age group. Observed and expected frequencies: ${CHANNEL_BY_AGE.map((r, i) => `aged ${r.age}, ${r.counts.map((o, j) => `${o} observed against ${cells[i][j].e.toFixed(1)} expected`).join(", ")}`).join("; ")}. Chi-square is ${chi.toFixed(1)}, ${fmtP(p)}`}
    >
      {[0, 1, 2].map((j) => (
        <ChannelIcon key={j} i={j} cx={r2(cx0 + cw * j + cw / 2)} cy={34} />
      ))}
      <Key x={516} y={38} anchor="middle" fill={INK3} size={9.5}>TOTAL</Key>
      {CHANNEL_BY_AGE.map((r, i) => {
        const y = ry0 + i * rh;
        return (
          <g key={r.age}>
            <Key x={20} y={r2(y + rh / 2 + 4)} fill={INK}>{r.age}</Key>
            {cells[i].map((c, j) => {
              const x = cx0 + cw * j;
              return (
                <g key={j}>
                  <rect x={x + 2} y={y + 2} width={cw - 4} height={rh - 4} fill={SIGNAL} fillOpacity={r2(0.04 + 0.4 * (c.part / maxPart))} />
                  <Display x={r2(x + cw / 2 - 8)} y={r2(y + rh / 2 + 9)} anchor="end" size={24}>{c.o}</Display>
                  <Key x={r2(x + cw / 2 + 2)} y={r2(y + rh / 2 - 3)} fill={INK3} size={9.5}>EXPECTED</Key>
                  <Key x={r2(x + cw / 2 + 2)} y={r2(y + rh / 2 + 13)} fill={INK2} size={11}>{c.e.toFixed(1)}</Key>
                </g>
              );
            })}
            <Key x={516} y={r2(y + rh / 2 + 4)} anchor="middle" fill={INK3}>{rows[i]}</Key>
          </g>
        );
      })}
      <line x1={cx0} y1={ry0 + 3 * rh + 6} x2={536} y2={ry0 + 3 * rh + 6} stroke={RULE2} strokeWidth={1} />
      {cols.map((c, j) => (
        <Key key={j} x={r2(cx0 + cw * j + cw / 2)} y={ry0 + 3 * rh + 26} anchor="middle" fill={INK3}>{c}</Key>
      ))}
      <Key x={516} y={ry0 + 3 * rh + 26} anchor="middle" fill={INK3}>{total}</Key>
      <Key x={20} y={ry0 + 3 * rh + 26} fill={INK3} size={9.5}>TOTAL</Key>
      <Display x={cx0} y={308} size={24} fill={SIGNAL}>{`\u03c7\u00b2 = ${chi.toFixed(1)}`}</Display>
      <Key x={r2(cx0 + 120)} y={302} fill={SIGNAL}>{fmtP(p)}</Key>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Selecting a Test
   -------------------------------------------------------------------------- */

type TestKind = "independent" | "paired" | "anova" | "chisquare" | "ranks";

/**
 * A small picture of each test's situation, under its sentence: two groups
 * of different people; the same people measured twice; three groups; a
 * cross-tabulation of two nominal variables; two groups placed in rank order.
 */
export function TestGlyph({ kind }: { kind: TestKind }) {
  const base = 82;
  const people = (xs: number[], tone: string, filled = false) =>
    xs.map((x) => <Person1 key={x} x={x} y={base} k={0.85} stroke={tone} fill={filled ? tone : PAPER} width={1.4} />);
  const labels: Record<TestKind, string> = {
    independent: "Two groups of different respondents",
    paired: "The same respondents, each measured twice",
    anova: "Three groups of different respondents",
    chisquare: "A cross-tabulation of two nominal variables",
    ranks: "Two groups of respondents placed in rank order",
  };
  return (
    <Frame width={200} height={90} label={labels[kind]}>
      {kind === "independent" ? (
        <>
          {people([22, 48, 74], INK)}
          {people([126, 152, 178], COUNTER, true)}
        </>
      ) : null}
      {kind === "paired" ? (
        <>
          {people([46, 100, 154], INK)}
          {[46, 100, 154].map((x, i) => {
            const a = [32, 38, 28][i];
            const b = a - 14;
            return (
              <g key={x}>
                <circle cx={x - 10} cy={a} r={4} fill={INK3} />
                <circle cx={x + 10} cy={b} r={4} fill={SIGNAL} />
                <line x1={x - 6} y1={r2(a - 2)} x2={x + 6} y2={r2(b + 2)} stroke={SIGNAL} strokeWidth={1.5} />
              </g>
            );
          })}
        </>
      ) : null}
      {kind === "anova" ? (
        <>
          {people([16, 40], INK)}
          {people([88, 112], COUNTER, true)}
          {people([160, 184], INK3, true)}
        </>
      ) : null}
      {kind === "chisquare" ? (
        <g>
          {[0, 1, 2].map((j) => (
            <rect key={`c${j}`} x={62 + j * 38} y={4} width={34} height={6} fill={INK} />
          ))}
          {[0, 1, 2].map((i) => (
            <rect key={`r${i}`} x={30} y={21.5 + i * 25} width={26} height={6} fill={INK} />
          ))}
          {[0, 1, 2].map((i) =>
            [0, 1, 2].map((j) => (
              <rect
                key={`${i}${j}`}
                x={62 + j * 38}
                y={14 + i * 25}
                width={34}
                height={21}
                fill={SIGNAL}
                fillOpacity={[0.35, 0.08, 0.2, 0.08, 0.3, 0.08, 0.15, 0.08, 0.4][i * 3 + j]}
              />
            )),
          )}
        </g>
      ) : null}
      {kind === "ranks" ? (
        <>
          {people([22, 48, 74], INK)}
          {people([126, 152, 178], COUNTER, true)}
          {[
            [22, 2],
            [48, 5],
            [74, 3],
            [126, 1],
            [152, 6],
            [178, 4],
          ].map(([x, r]) => (
            <Key key={x} x={x} y={34} anchor="middle" fill={INK} size={12} weight={700}>{`${r}`}</Key>
          ))}
        </>
      ) : null}
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Statistical Versus Practical Significance
   -------------------------------------------------------------------------- */

const CONV_A = 0.0305;
const CONV_B = 0.03;
const VISITORS_MIN = 50_000;
const VISITORS_MAX = 4_000_000;
/** The slider's stops: total visitors in the test. */
const VISITOR_STEPS = [50_000, 100_000, 200_000, 300_000, 500_000, 750_000, 1_000_000, 1_250_000, 1_500_000, 1_750_000, 2_000_000, 2_500_000, 3_000_000, 4_000_000];
/** Position (0–100) along the logarithmic visitors axis. */
const visitorsAt = (i: number) => VISITORS_MIN * (VISITORS_MAX / VISITORS_MIN) ** (i / 100);
/** Two-tailed p-value for 3.05% against 3.00%, with the visitors split equally. */
function conversionP(total: number) {
  const pool = (CONV_A + CONV_B) / 2;
  const se = Math.sqrt(pool * (1 - pool) * (4 / total));
  return 2 * (1 - phi((CONV_A - CONV_B) / se));
}
const DEFAULT_VISITOR_STEP = VISITOR_STEPS.indexOf(2_000_000);

/** A small web page: a frame with a header bar and text lines, lettered A or B. */
function PageGlyph({ cx, y, letter }: { cx: number; y: number; letter: string }) {
  return (
    <g>
      <rect x={cx - 17} y={y} width={34} height={40} fill={PAPER} stroke={INK} strokeWidth={1.25} />
      <rect x={cx - 17} y={y} width={34} height={7} fill={INK} />
      <Key x={cx} y={y + 30} anchor="middle" fill={INK} size={13} weight={700}>{letter}</Key>
    </g>
  );
}

/**
 * Significance grows with the sample, not with the difference: two versions
 * of a page convert at 3.05 and 3.00 percent, bars drawn to scale. The
 * student sets the number of visitors; the p-value slides down its curve
 * and crosses 0.05 at about 1.8 million visitors, while the difference
 * itself never changes.
 */
export function SignificanceAndSize() {
  const [step, setStep] = useState(DEFAULT_VISITOR_STEP);
  const shown = VISITOR_STEPS[step];
  const p = conversionP(shown);
  const sig = p < 0.05;

  /* bars, to scale from zero */
  const barBase = 236;
  const barTop = 66;
  const BY = (v: number) => r2(barBase - (v / 0.035) * (barBase - barTop));
  const bars = [
    { v: CONV_A, x: 56, letter: "A" },
    { v: CONV_B, x: 136, letter: "B" },
  ];

  /* p against visitors: log visitors, square-root p */
  const gx0 = 270;
  const gx1 = 610;
  const gy0 = 66;
  const gy1 = 236;
  const GX = (n: number) => r2(gx0 + (Math.log(n / VISITORS_MIN) / Math.log(VISITORS_MAX / VISITORS_MIN)) * (gx1 - gx0));
  const GY = (pv: number) => r2(gy1 - Math.sqrt(pv) * (gy1 - gy0));
  const curve = Array.from({ length: 61 }, (_, i) => {
    const n = visitorsAt((i * 100) / 60);
    return `${i === 0 ? "M" : "L"}${GX(n)} ${GY(conversionP(n))}`;
  }).join("");

  return (
    <div>
      <Frame
        width={640}
        height={290}
        label={`Two versions of a web page convert 3.05 and 3.00 percent of visitors. With ${shown.toLocaleString("en-US")} visitors divided equally between them, ${fmtP(p)}: ${sig ? "statistically significant at the 0.05 level" : "not statistically significant"}. The p-value falls as the number of visitors grows and crosses 0.05 at about 1.8 million, while the difference stays at 0.05 percentage points`}
      >
        <Key x={20} y={24} fill={INK}>CONVERSION RATE</Key>
        {bars.map((b) => (
          <g key={b.letter}>
            <rect x={b.x - 26} y={BY(b.v)} width={52} height={r2(barBase - BY(b.v))} fill={b.letter === "A" ? SIGNAL : INK3} fillOpacity={b.letter === "A" ? 0.85 : 0.6} />
            <Key x={b.x} y={r2(BY(b.v) - 8)} anchor="middle" fill={INK}>{`${(b.v * 100).toFixed(2)}%`}</Key>
            <PageGlyph cx={b.x} y={244} letter={b.letter} />
          </g>
        ))}
        <line x1={16} y1={barBase} x2={176} y2={barBase} stroke={INK} strokeWidth={1.25} />

        <line x1={220} y1={14} x2={220} y2={278} stroke={RULE} strokeWidth={1} />

        {/* p against the number of visitors */}
        <Key x={gx0 - 10} y={24} fill={INK}>p-VALUE</Key>
        {[0.01, 0.25, 0.5, 1].map((v) => (
          <g key={v}>
            <line x1={gx0} y1={GY(v)} x2={gx1} y2={GY(v)} stroke={RULE} strokeWidth={1} />
            <Key x={gx0 - 8} y={r2(GY(v) + 4)} anchor="end" fill={INK3} size={9}>{`${v}`}</Key>
          </g>
        ))}
        <line x1={gx0} y1={GY(0.05)} x2={gx1} y2={GY(0.05)} stroke={COUNTER} strokeWidth={1.25} strokeDasharray="4 3" />
        <Key x={gx0 - 8} y={r2(GY(0.05) + 4)} anchor="end" fill={COUNTER} size={9}>0.05</Key>
        <path d={curve} fill="none" stroke={INK} strokeWidth={1.5} />
        <line x1={gx0} y1={gy1} x2={gx1} y2={gy1} stroke={INK} strokeWidth={1.25} />
        {[100_000, 1_000_000].map((n) => (
          <g key={n}>
            <line x1={GX(n)} y1={gy1} x2={GX(n)} y2={gy1 + 4} stroke={INK} strokeWidth={1} />
            <Key x={GX(n)} y={gy1 + 18} anchor="middle" fill={INK3} size={9}>{n === 100_000 ? "100,000" : "1 MILLION"}</Key>
          </g>
        ))}
        <Key x={gx1} y={gy1 + 36} anchor="end" fill={INK3} size={9.5}>VISITORS IN THE TEST</Key>
        <circle cx={GX(shown)} cy={GY(p)} r={6} fill={sig ? SIGNAL : INK} stroke={PAPER} strokeWidth={2} />

        <Display x={gx1} y={32} anchor="end" size={24} fill={sig ? SIGNAL : INK2}>{fmtP(p)}</Display>
        <Key x={gx1} y={52} anchor="end" fill={INK2}>{`${shown.toLocaleString("en-US")} VISITORS`}</Key>
      </Frame>
      <Slider label="Visitors in the test" value={step} min={0} max={VISITOR_STEPS.length - 1} onChange={setStep} showValue={false} />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Effect Size
   -------------------------------------------------------------------------- */

const EFFECTS = [
  { id: "0.2", label: "0.2", name: "SMALL" },
  { id: "0.5", label: "0.5", name: "MEDIUM" },
  { id: "0.8", label: "0.8", name: "LARGE" },
] as const;
type EffectId = (typeof EFFECTS)[number]["id"];

/**
 * Cohen's d as a picture: two groups' distributions, the difference between
 * their means set against one pooled standard deviation. The student picks
 * a small, medium or large d; even a large effect leaves the two groups
 * overlapping heavily.
 */
export function EffectOverlap() {
  const [id, setId] = useState<EffectId>("0.5");
  const e = EFFECTS.find((x) => x.id === id)!;
  const d = Number(id);
  const x0 = 20;
  const x1 = 520;
  const lo = -3;
  const hi = 3.8;
  const X = (v: number) => r2(x0 + ((v - lo) / (hi - lo)) * (x1 - x0));
  const base = 214;
  const peak = 130;
  const curve = (m: number, close: boolean) =>
    Array.from({ length: 61 }, (_, i) => {
      const v = lo + ((hi - lo) * i) / 60;
      return `${i === 0 ? "M" : "L"}${X(v)} ${r2(base - peak * Math.exp(-((v - m) ** 2) / 2))}`;
    }).join("") + (close ? `L${X(hi)} ${base}L${X(lo)} ${base}Z` : "");
  const top = base - peak;

  return (
    <div>
      <Frame
        width={560}
        height={268}
        label={`Two groups' distributions whose means differ by ${d} pooled standard deviations, a ${e.name.toLowerCase()} effect by convention. The two distributions overlap heavily`}
      >
        <path d={curve(0, true)} fill={INK3} fillOpacity={0.14} />
        <path d={curve(d, true)} fill={COUNTER} fillOpacity={0.16} />
        <path d={curve(0, false)} fill="none" stroke={INK2} strokeWidth={1.5} />
        <path d={curve(d, false)} fill="none" stroke={COUNTER} strokeWidth={1.5} />
        <line x1={X(0)} y1={base} x2={X(0)} y2={top} stroke={INK2} strokeWidth={1.25} strokeDasharray="3 3" />
        <line x1={X(d)} y1={base} x2={X(d)} y2={top} stroke={COUNTER} strokeWidth={1.25} strokeDasharray="3 3" />

        {/* numerator: the difference between the means */}
        <path d={`M${X(0)} ${top - 14}H${X(d)}M${X(0)} ${top - 20}V${top - 8}M${X(d)} ${top - 20}V${top - 8}`} stroke={SIGNAL} strokeWidth={2} />
        <Key x={r2(X(d) + 10)} y={top - 10} fill={SIGNAL}>DIFFERENCE BETWEEN THE MEANS</Key>

        <line x1={x0 - 4} y1={base} x2={x1 + 4} y2={base} stroke={INK} strokeWidth={1.25} />
        {/* denominator: one pooled standard deviation */}
        <path d={`M${X(0)} ${base + 18}H${X(1)}M${X(0)} ${base + 12}V${base + 24}M${X(1)} ${base + 12}V${base + 24}`} stroke={INK} strokeWidth={2} />
        <Key x={r2(X(1) + 10)} y={base + 22} fill={INK}>ONE POOLED STANDARD DEVIATION</Key>

        <Display x={20} y={36} size={28} fill={SIGNAL}>{`d = ${d.toFixed(1)}`}</Display>
        <Key x={20} y={58} fill={SIGNAL}>{e.name}</Key>
      </Frame>
      <Segmented label="Cohen's d" options={EFFECTS.map((x) => ({ id: x.id, label: x.label }))} value={id} onChange={setId} />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Confidence Intervals
   -------------------------------------------------------------------------- */

const CI_HALF = 7;

/**
 * A confidence interval and zero: the 95 percent interval for the difference
 * in mean spending, 8 to 22 dollars. The student drags the estimate along
 * the axis; the moment the interval reaches zero, p reaches 0.05, and once
 * it includes zero the difference is no longer significant.
 */
export function IntervalAndZero() {
  const [m, setM] = useState(15);
  const lo = m - CI_HALF;
  const hi = m + CI_HALF;
  const p = 2 * (1 - phi(Math.abs(m) / (CI_HALF / 1.96)));
  const excludes = lo > 0 || hi < 0;
  const tone = excludes ? SIGNAL : INK2;
  const x0 = 30;
  const x1 = 470;
  const vmin = -10;
  const vmax = 30;
  const X = (v: number) => r2(x0 + ((v - vmin) / (vmax - vmin)) * (x1 - x0));
  const vOf = (x: number) => vmin + ((x - x0) / (x1 - x0)) * (vmax - vmin);
  const set = (v: number) => setM(Math.max(-3, Math.min(23, Math.round(v))));
  const y = 138;
  const axis = 196;
  const dollars = (v: number) => (v < 0 ? `\u2212$${-v}` : `$${v}`);

  return (
    <Frame
      width={500}
      height={236}
      label={`A 95 percent confidence interval for the difference in mean spending from ${dollars(lo)} to ${dollars(hi)}, centred on ${dollars(m)}. It ${excludes ? "excludes" : "includes"} zero, ${fmtP(p)}`}
      className="cursor-ew-resize touch-none select-none"
      svgProps={dragProps((x) => set(vOf(x)))}
    >
      {/* no difference */}
      <line x1={X(0)} y1={y - 18} x2={X(0)} y2={axis} stroke={INK} strokeWidth={1.25} strokeDasharray="4 3" />
      <Key x={X(0)} y={y - 26} anchor="middle" fill={INK}>NO DIFFERENCE</Key>

      <g
        role="slider"
        tabIndex={0}
        aria-label="Estimated difference in mean spending"
        aria-valuemin={-3}
        aria-valuemax={23}
        aria-valuenow={m}
        className="outline-none"
        onKeyDown={(ev) => {
          if (ev.key === "ArrowRight" || ev.key === "ArrowUp") set(m + 1);
          else if (ev.key === "ArrowLeft" || ev.key === "ArrowDown") set(m - 1);
          else return;
          ev.preventDefault();
        }}
      >
        <path d={`M${X(lo)} ${y}H${X(hi)}M${X(lo)} ${y - 12}V${y + 12}M${X(hi)} ${y - 12}V${y + 12}`} stroke={tone} strokeWidth={3} />
        <DragHandle x={X(m)} y={y} tone={tone} />
      </g>
      <Key x={X(lo)} y={y + 32} anchor="middle" fill={tone}>{dollars(lo)}</Key>
      <Key x={X(hi)} y={y + 32} anchor="middle" fill={tone}>{dollars(hi)}</Key>
      <Key x={X(m)} y={y - 50} anchor="middle" fill={tone}>95% CONFIDENCE INTERVAL</Key>

      <line x1={x0 - 6} y1={axis} x2={x1 + 8} y2={axis} stroke={INK} strokeWidth={1.25} />
      <path d={head.right(x1 + 8, axis, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
      {[-10, 0, 10, 20, 30].map((v) => (
        <g key={v}>
          <line x1={X(v)} y1={axis} x2={X(v)} y2={axis + 4} stroke={INK} strokeWidth={1} />
          <Key x={X(v)} y={axis + 18} anchor="middle" fill={INK3} size={9.5}>{dollars(v)}</Key>
        </g>
      ))}
      <Key x={x1 + 8} y={axis + 36} anchor="end" fill={INK3} size={9.5}>DIFFERENCE IN MEAN SPENDING</Key>

      <Display x={20} y={36} size={26} fill={tone}>{fmtP(p)}</Display>
      <Key x={480} y={30} anchor="end" fill={tone}>
        {excludes ? "EXCLUDES ZERO \u00b7 SIGNIFICANT AT 0.05" : "INCLUDES ZERO \u00b7 NOT SIGNIFICANT AT 0.05"}
      </Key>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Questionable Research Practices
   -------------------------------------------------------------------------- */

const PRACTICES = [
  { id: "outliers", label: "Remove outliers after looking" },
  { id: "outcomes", label: "Test three outcomes" },
  { id: "stopping", label: "Add respondents until significant" },
  { id: "segments", label: "Test four segments" },
] as const;
type Practice = (typeof PRACTICES)[number]["id"];

/**
 * Percentage of studies reporting p < 0.05 when no difference exists, for
 * every combination of the four practices (bit 1 outliers, 2 outcomes,
 * 4 stopping, 8 segments). Simulated with 20,000 two-group studies of 30
 * respondents per group: outliers beyond 2 SD dropped when that helps;
 * three outcomes correlated 0.5; 10 respondents per group added up to three
 * times; four segments tested alongside the whole sample.
 */
const FALSE_POSITIVE_PCT = [5, 11.3, 11.6, 24.7, 10.6, 22.5, 22.9, 45.3, 20.5, 30.2, 42.5, 58.5, 39.9, 60.8, 69, 89.1];
/** The order in which studies light up, so adding a practice only adds studies. */
const STUDY_ORDER = (() => {
  const u = seeded(606);
  const idx = Array.from({ length: 100 }, (_, i) => i);
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(u() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx;
})();

/**
 * Forking paths: a hundred studies of a difference that does not exist. With
 * one planned test, five report a significant difference. The student
 * switches on the practices; each adds chances to find p < 0.05, and all
 * four together make most of the hundred studies report a false finding.
 */
export function ForkingPaths() {
  const [on, setOn] = useState<Practice[]>([]);
  const mask = PRACTICES.reduce((m, p, i) => (on.includes(p.id) ? m | (1 << i) : m), 0);
  const count = Math.round(FALSE_POSITIVE_PCT[mask]);
  const lit = new Set(STUDY_ORDER.slice(0, count));
  const cols = 20;
  const w = 18;
  const h = 22;
  const gx = 6;
  const gy = 8;

  return (
    <div>
      <Frame
        width={640}
        height={196}
        label={`One hundred simulated studies of a difference that does not exist. ${on.length === 0 ? "With one planned test" : `With ${on.length} practice${on.length > 1 ? "s" : ""} applied`}, ${count} of the 100 report a statistically significant difference`}
      >
        <Key x={20} y={22}>100 STUDIES · NO DIFFERENCE EXISTS</Key>
        <Key x={620} y={22} anchor="end" fill={INK3}>SIMULATED</Key>
        {Array.from({ length: 100 }, (_, i) => {
          const x = 20 + (i % cols) * (w + gx);
          const y = 40 + Math.floor(i / cols) * (h + gy);
          const hit = lit.has(i);
          return (
            <g key={i}>
              <rect x={x} y={y} width={w} height={h} fill={hit ? COUNTER : PAPER} stroke={hit ? COUNTER : INK3} strokeWidth={1} />
              <rect x={x} y={y} width={w} height={4} fill={hit ? COUNTER : INK3} />
            </g>
          );
        })}
        <Display x={620} y={104} anchor="end" size={40} fill={COUNTER}>{`${count}`}</Display>
        <Key x={620} y={128} anchor="end" fill={COUNTER}>OF 100 REPORT</Key>
        <Key x={620} y={146} anchor="end" fill={COUNTER}>p &lt; 0.05</Key>
      </Frame>
      <Toggles label="Practices" options={[...PRACTICES]} value={on} onChange={setOn} allowNone />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Multiple Comparisons
   -------------------------------------------------------------------------- */

/** p-values of 40 tests of true null hypotheses (uniform); seed 5 puts one below 0.05 among the first 20. */
const NULL_PS = (() => {
  const u = seeded(5);
  return Array.from({ length: 40 }, () => u());
})();
const CORRECTIONS = [
  { id: "none", label: "No correction" },
  { id: "bonferroni", label: "Bonferroni" },
] as const;
type Correction = (typeof CORRECTIONS)[number]["id"];

/**
 * Many tests of true null hypotheses, as in comparisons across segments.
 * The student sets the number of tests; each square is one test, filled
 * when it comes out significant. The curve gives the probability of at
 * least one significant result, 64 percent at 20 tests. The Bonferroni
 * correction divides 0.05 by the number of tests and holds that
 * probability near 5 percent.
 */
export function ManyTests() {
  const [k, setK] = useState(20);
  const [corr, setCorr] = useState<Correction>("none");
  const bonf = corr === "bonferroni";
  const level = bonf ? 0.05 / k : 0.05;
  const atLeastOne = (n: number) => 1 - (1 - (bonf ? 0.05 / n : 0.05)) ** n;
  const prob = atLeastOne(k);
  const hits = NULL_PS.slice(0, k).filter((p) => p < level).length;
  const fmtLevel = (v: number) => (v >= 0.01 ? v.toFixed(2) : v.toPrecision(2).replace(/0+$/, ""));

  const tile = 30;
  const gap = 6;
  const gx0 = 20;
  const gy0 = 70;

  const cx0 = 450;
  const cx1 = 660;
  const cy0 = 70;
  const cy1 = 222;
  const CX = (n: number) => r2(cx0 + ((n - 1) / 39) * (cx1 - cx0));
  const CY = (v: number) => r2(cy1 - v * (cy1 - cy0));
  const curve = (b: boolean) =>
    Array.from({ length: 40 }, (_, i) => {
      const n = i + 1;
      const v = 1 - (1 - (b ? 0.05 / n : 0.05)) ** n;
      return `${i === 0 ? "M" : "L"}${CX(n)} ${CY(v)}`;
    }).join("");

  return (
    <div>
      <Frame
        width={680}
        height={262}
        label={`${k} tests of true null hypotheses at a level of ${fmtLevel(level)} per test${bonf ? " after the Bonferroni correction" : ""}. In this simulated run ${hits} of the ${k} tests ${hits === 1 ? "is" : "are"} significant. The probability of at least one significant result is ${Math.round(prob * 100)} percent`}
      >
        <Key x={20} y={22} fill={INK}>{`${k} TEST${k > 1 ? "S" : ""} · NO REAL DIFFERENCES`}</Key>
        <Key x={20} y={42} fill={INK3}>{`LEVEL PER TEST ${fmtLevel(level)} · SIMULATED`}</Key>
        {NULL_PS.slice(0, k).map((p, i) => {
          const x = gx0 + (i % 10) * (tile + gap);
          const y = gy0 + Math.floor(i / 10) * (tile + gap);
          const hit = p < level;
          return (
            <g key={i}>
              <rect x={x} y={y} width={tile} height={tile} fill={hit ? COUNTER : PAPER} stroke={hit ? COUNTER : INK3} strokeWidth={1.25} />
              {hit ? (
                <Key x={r2(x + tile / 2)} y={r2(y + tile / 2 + 3.5)} anchor="middle" fill={PAPER} size={9} weight={700}>
                  {p.toFixed(3).slice(1)}
                </Key>
              ) : null}
            </g>
          );
        })}

        <line x1={400} y1={14} x2={400} y2={250} stroke={RULE} strokeWidth={1} />

        {/* probability of at least one Type I error */}
        <Key x={cx0 - 10} y={22} fill={INK}>AT LEAST ONE SIGNIFICANT RESULT</Key>
        {[0, 0.5, 1].map((v) => (
          <g key={v}>
            <line x1={cx0} y1={CY(v)} x2={cx1} y2={CY(v)} stroke={RULE} strokeWidth={1} />
            <Key x={cx0 - 8} y={r2(CY(v) + 4)} anchor="end" fill={INK3} size={9}>{`${v * 100}%`}</Key>
          </g>
        ))}
        <path d={curve(false)} fill="none" stroke={bonf ? RULE2 : COUNTER} strokeWidth={bonf ? 1.25 : 2} />
        <path d={curve(true)} fill="none" stroke={bonf ? SIGNAL : RULE2} strokeWidth={bonf ? 2 : 1.25} />
        <line x1={cx0} y1={cy1} x2={cx1} y2={cy1} stroke={INK} strokeWidth={1.25} />
        {[1, 10, 20, 30, 40].map((n) => (
          <g key={n}>
            <line x1={CX(n)} y1={cy1} x2={CX(n)} y2={cy1 + 4} stroke={INK} strokeWidth={1} />
            <Key x={CX(n)} y={cy1 + 18} anchor="middle" fill={INK3} size={9}>{n}</Key>
          </g>
        ))}
        <Key x={cx1} y={cy1 + 36} anchor="end" fill={INK3} size={9.5}>NUMBER OF TESTS</Key>
        <circle cx={CX(k)} cy={CY(prob)} r={6} fill={bonf ? SIGNAL : COUNTER} stroke={PAPER} strokeWidth={2} />
        <Display x={cx1} y={50} anchor="end" size={28} fill={bonf ? SIGNAL : COUNTER}>{`${Math.round(prob * 100)}%`}</Display>
      </Frame>
      <Slider label="Number of tests" value={k} min={1} max={40} onChange={setK} />
      <Segmented label="Correction" options={[...CORRECTIONS]} value={corr} onChange={setCorr} />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Preregistration and Reproducible Analysis
   -------------------------------------------------------------------------- */

/** A plan document: header bar and ticked lines; small copies stand for later analyses. */
function PlanDoc({ x, y, w, h, tone = INK, dashed = false }: { x: number; y: number; w: number; h: number; tone?: string; dashed?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={PAPER} stroke={tone} strokeWidth={1.25} strokeDasharray={dashed ? "4 3" : undefined} />
      {dashed ? null : <rect x={x} y={y} width={w} height={6} fill={tone} />}
    </g>
  );
}

/**
 * Preregistration: the plan (hypotheses, sample size, exclusion criteria,
 * analysis) is written before the data are collected. After collection,
 * confirmatory analyses test the planned hypotheses; exploratory analyses
 * produce ideas that become hypotheses for the next preregistered study.
 */
export function PreregistrationTimeline() {
  const items = ["HYPOTHESES", "SAMPLE SIZE", "EXCLUSION CRITERIA", "ANALYSIS PLAN"];
  const mid = 112;
  return (
    <Frame
      width={800}
      height={214}
      label="Before the data are collected, a preregistration document lists the hypotheses, sample size, exclusion criteria and analysis plan. The data are then collected from respondents. Confirmatory analyses test the preregistered hypotheses; exploratory analyses generate new ideas, which become hypotheses for a future preregistered study"
    >
      {/* the plan */}
      <Key x={20} y={22} fill={SIGNAL}>PREREGISTRATION</Key>
      <PlanDoc x={20} y={36} w={176} h={144} tone={SIGNAL} />
      {items.map((t, i) => (
        <g key={t}>
          <rect x={34} y={58 + i * 30} width={14} height={14} fill={SIGNAL} />
          <Tick1 cx={41} cy={65 + i * 30} s={4} />
          <Key x={56} y={70 + i * 30} fill={INK} size={9.5}>{t}</Key>
        </g>
      ))}

      {/* before | after */}
      <line x1={232} y1={14} x2={232} y2={184} stroke={INK3} strokeWidth={1.25} strokeDasharray="4 3" />
      <Key x={20} y={204} fill={INK3} size={9.5}>BEFORE THE DATA ARE COLLECTED</Key>
      <Key x={246} y={204} fill={INK3} size={9.5}>AFTER</Key>

      <path d={`M204 ${mid}H258`} stroke={INK} strokeWidth={1.5} />
      <path d={head.right(258, mid, 7)} fill="none" stroke={INK} strokeWidth={1.5} />

      {/* data collection */}
      <Key x={322} y={60} anchor="middle" fill={INK}>DATA COLLECTION</Key>
      {[282, 308, 334, 360].map((x) => (
        <Person1 key={x} x={x} y={mid + 16} k={0.8} />
      ))}

      {/* the fork */}
      <path d={`M384 ${mid}H410Q424 ${mid} 424 ${mid - 14}V${70}Q424 56 438 56H470`} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <path d={head.right(470, 56, 7)} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <path d={`M410 ${mid}Q424 ${mid} 424 ${mid + 14}V${154}Q424 168 438 168H470`} fill="none" stroke={COUNTER} strokeWidth={1.5} />
      <path d={head.right(470, 168, 7)} fill="none" stroke={COUNTER} strokeWidth={1.5} />

      {/* confirmatory: the planned test, checked against the plan */}
      <PlanDoc x={480} y={34} w={40} h={46} tone={SIGNAL} />
      <rect x={490} y={50} width={20} height={20} fill={SIGNAL} />
      <Tick1 cx={500} cy={60} s={6} />
      <Key x={534} y={54} fill={SIGNAL}>CONFIRMATORY</Key>
      <Key x={534} y={72} fill={INK3} size={9.5}>HYPOTHESES SPECIFIED IN ADVANCE</Key>

      {/* exploratory: a new idea, tested in a future study */}
      <Lightbulb x={484} y={152} size={32} weight="regular" color={COUNTER} />
      <Key x={534} y={166} fill={COUNTER}>EXPLORATORY</Key>
      <path d={`M640 ${162}H700`} stroke={COUNTER} strokeWidth={1.5} />
      <path d={head.right(700, 162, 7)} fill="none" stroke={COUNTER} strokeWidth={1.5} />
      <PlanDoc x={712} y={138} w={40} h={46} tone={COUNTER} dashed />
      <Key x={780} y={204} anchor="end" fill={COUNTER} size={9.5}>FUTURE TESTING</Key>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Hypothesis Testing in AI Evaluation
   -------------------------------------------------------------------------- */

/** Six products on which every pair of models is compared. */
const PRODUCT_ICONS = [Mouse, Basket, Basketball, Book, Pill, TShirt];

/**
 * Many models, many tests: each pair of models is compared on each of six
 * products. The student adds models; the chords between them multiply,
 * the number of tests grows with the square of the number of models, and so
 * does the number of significant results expected by chance alone. The
 * Bonferroni level shrinks accordingly.
 */
export function ModelComparisons() {
  const [k, setK] = useState(8);
  const pairs = (k * (k - 1)) / 2;
  const tests = pairs * PRODUCT_ICONS.length;
  const expected = tests * 0.05;
  const bonf = 0.05 / tests;
  const cx = 128;
  const cy = 150;
  const R = 108;
  const nodes = Array.from({ length: k }, (_, i) => {
    const a = -Math.PI / 2 + (2 * Math.PI * i) / k;
    return { x: r2(cx + R * Math.cos(a)), y: r2(cy + R * Math.sin(a)) };
  });
  const fmtBonf = String(Number(bonf.toPrecision(2)));
  const rx = 268;

  return (
    <div>
      <Frame
        width={600}
        height={300}
        label={`${k} AI models, each pair compared on six products: ${pairs} pairs and ${tests} tests. If no model differed from any other, about ${expected.toFixed(1)} tests would still be significant at the 0.05 level; the Bonferroni level per test is ${bonf.toPrecision(2)}`}
      >
        {nodes.map((a, i) =>
          nodes.slice(i + 1).map((b, j) => (
            <line key={`${i}-${j}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={INK3} strokeWidth={0.9} strokeOpacity={0.55} />
          )),
        )}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r={12} fill={PAPER} stroke={RULE2} strokeWidth={1} />
            <AiMark1 cx={n.x} cy={n.y} s={18} fill={SIGNAL} />
          </g>
        ))}

        <Key x={rx} y={40} fill={INK}>PAIRS OF MODELS</Key>
        <Display x={rx} y={72} size={28}>{`${pairs}`}</Display>
        <Key x={rx + 150} y={40} fill={INK}>{`\u00d7 ${PRODUCT_ICONS.length} PRODUCTS`}</Key>
        {PRODUCT_ICONS.map((Icon, i) => (
          <Icon key={i} x={rx + 150 + i * 30} y={51} size={26} weight="regular" color={INK} />
        ))}

        <line x1={rx} y1={100} x2={588} y2={100} stroke={RULE} strokeWidth={1} />
        <Key x={rx} y={126} fill={INK}>TESTS</Key>
        <Display x={588} y={130} anchor="end" size={28}>{tests.toLocaleString("en-US")}</Display>

        <Key x={rx} y={172} fill={COUNTER}>SIGNIFICANT BY CHANCE AT 0.05</Key>
        <Key x={rx} y={188} fill={COUNTER} size={9.5}>IF NO MODEL DIFFERS</Key>
        <Display x={588} y={186} anchor="end" size={28} fill={COUNTER}>{`\u2248 ${expected < 10 ? expected.toFixed(1) : Math.round(expected)}`}</Display>

        <Key x={rx} y={228} fill={SIGNAL}>BONFERRONI LEVEL</Key>
        <Key x={rx} y={244} fill={SIGNAL} size={9.5}>PER TEST</Key>
        <Display x={588} y={242} anchor="end" size={28} fill={SIGNAL}>{fmtBonf}</Display>
      </Frame>
      <Slider label="Models compared" value={k} min={2} max={16} onChange={setK} />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Reproducibility of AI Evaluations
   -------------------------------------------------------------------------- */

const RECORD_ROWS = [
  { key: "MODEL VERSION", value: "gpt-4.1-2025-04-14" },
  { key: "DATE", value: "2025-06-12" },
  { key: "GENERATION SETTINGS", value: "temperature 1.0 · max tokens 300" },
  { key: "COMPLETE PROMPTS", value: null },
  { key: "RESPONSES PER CONDITION", value: "100" },
];

/**
 * An evaluation's record sheet: the five items a reproducible evaluation
 * records, filled in for one condition. The prompt is kept in full, drawn
 * as its lines of text.
 */
export function EvaluationRecord() {
  const rowH = 38;
  const y0 = 58;
  return (
    <Frame
      width={540}
      height={252}
      label="A record sheet for one AI evaluation: the exact model version gpt-4.1-2025-04-14, the date 2025-06-12, the generation settings of temperature 1.0 and 300 maximum tokens, the complete prompt text, and 100 responses per condition"
    >
      <rect x={20} y={14} width={500} height={226} fill={PAPER} stroke={INK} strokeWidth={1.25} />
      <rect x={20} y={14} width={500} height={30} fill={INK} />
      <AiMark1 cx={40} cy={29} s={16} fill={PAPER} />
      {RECORD_ROWS.map((r, i) => {
        const y = y0 + i * rowH;
        const tall = r.value === null;
        return (
          <g key={r.key}>
            {i > 0 ? <line x1={36} y1={y - 8} x2={504} y2={y - 8} stroke={RULE} strokeWidth={1} /> : null}
            <Key x={36} y={y + 16} fill={INK3} size={10.5}>{r.key}</Key>
            {tall ? (
              <g>
                {[250, 200, 230].map((w, j) => (
                  <line key={j} x1={250} y1={y + 4 + j * 9} x2={250 + w} y2={y + 4 + j * 9} stroke={RULE2} strokeWidth={4} strokeLinecap="round" />
                ))}
              </g>
            ) : (
              <text x={250} y={y + 17} fontFamily="var(--font-mono, ui-monospace, monospace)" fontSize={16} fill={INK}>
                {r.value}
              </text>
            )}
          </g>
        );
      })}
    </Frame>
  );
}
