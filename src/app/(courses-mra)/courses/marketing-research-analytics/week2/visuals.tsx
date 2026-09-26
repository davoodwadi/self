/* ==========================================================================
   Week 02 plates: Research Design and Secondary Data.
   Built on ../_visuals/kit and ../_visuals/objects. Every plate follows the
   sentence it illustrates on the slide.
   ========================================================================== */

import React, { useState } from "react";
import { RotateCw } from "lucide-react";
import { Lightbulb, ChartBar, Flask, Envelope, Bicycle, Buildings, Globe, Database } from "@phosphor-icons/react";
import {
  Frame,
  Key,
  Display,
  INK,
  INK3,
  RULE,
  RULE2,
  SIGNAL,
  COUNTER,
  PAPER,
  SIGNAL_TINT,
  head,
  headAlong,
  r2,
  seeded,
  PlateButton,
  Segmented,
  Slider,
} from "../_visuals/kit";
import { Person1, Store1 } from "../_visuals/objects";

/* --------------------------------------------------------------------------
   Exploratory Research
   -------------------------------------------------------------------------- */

const POP_COLS = 15;
const POP_ROWS = 4;
const POP_N = POP_COLS * POP_ROWS;
const POP_HOLD = 18; // 30% of the population
const PILOT_N = 6;
/** Which people in the population hold the view, fixed for every render. */
const POP_HOLDERS: boolean[] = (() => {
  const rnd = seeded(20260926);
  const idx = Array.from({ length: POP_N }, (_, i) => i);
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  const set = new Set(idx.slice(0, POP_HOLD));
  return Array.from({ length: POP_N }, (_, i) => set.has(i));
})();

/** The k-th pilot sample: six distinct people, the same on every render. */
function pilotSample(k: number) {
  const rnd = seeded(9001 + k * 7919);
  const picked = new Set<number>();
  while (picked.size < PILOT_N) picked.add(Math.floor(rnd() * POP_N));
  return [...picked];
}

/**
 * Exploratory Research: a population of sixty, eighteen of whom (30%) hold a
 * view, and a pilot study that hears from six of them. Each pilot sample is
 * drawn out of the crowd and its share lands as a dot on the strip below,
 * next to the population's true share.
 *
 * Interactive: "Draw another sample" runs a new pilot. The dots scatter from
 * 0% to 67% around the true 30%: a small sample gives a different answer each
 * time, which is why its findings stay tentative. It opens with eight pilots
 * already drawn, so the spread reads before anyone presses.
 */
export function PilotSamples() {
  const [drawn, setDrawn] = useState(8);
  const HISTORY = 16;
  const first = Math.max(0, drawn - HISTORY);
  const draws = Array.from({ length: drawn - first }, (_, i) => {
    const members = pilotSample(first + i);
    return { members, holds: members.filter((m) => POP_HOLDERS[m]).length };
  });
  const current = draws[draws.length - 1];
  const inSample = new Set(current.members);

  const px = (c: number) => 30 + c * 24.3;
  const py = (r: number) => 56 + r * 34;
  const axisY = 268;
  const sx0 = 30;
  const sx1 = 370;
  const sx = (share: number) => r2(sx0 + share * (sx1 - sx0));
  // Dots stack in the column of their share, oldest at the bottom.
  const stacks = new Map<number, number>();
  const dots = draws.map((d, i) => {
    const level = stacks.get(d.holds) ?? 0;
    stacks.set(d.holds, level + 1);
    return { x: sx(d.holds / PILOT_N), y: r2(axisY - 9 - level * 11), latest: i === draws.length - 1 };
  });
  const truth = sx(POP_HOLD / POP_N);

  return (
    <>
      <Frame
        width={400}
        height={298}
        label={`A population of sixty people, eighteen of whom hold a view; a pilot sample of six in which ${current.holds} hold it, and the shares found by the last ${draws.length} pilot samples scattered around the population's thirty percent`}
      >
        <Key x={30} y={18} fill={INK3}>POPULATION</Key>
        <Key x={370} y={18} anchor="end" fill={COUNTER}>{`${POP_HOLD} OF ${POP_N} HOLD THE VIEW`}</Key>
        {Array.from({ length: POP_N }, (_, i) => {
          const c = i % POP_COLS;
          const r = Math.floor(i / POP_COLS);
          const on = inSample.has(i);
          const hold = POP_HOLDERS[i];
          return (
            <g key={i} opacity={on ? 1 : 0.28}>
              <Person1
                x={r2(px(c))}
                y={py(r)}
                k={0.72}
                stroke={hold ? COUNTER : INK}
                fill={hold ? COUNTER : PAPER}
                width={on ? 1.75 : 1.25}
              />
            </g>
          );
        })}
        {/* the six people of this pilot, underlined */}
        {current.members.map((m) => {
          const x = r2(px(m % POP_COLS));
          const y = py(Math.floor(m / POP_COLS)) + 4;
          return <line key={m} x1={r2(x - 9)} y1={y} x2={r2(x + 9)} y2={y} stroke={SIGNAL} strokeWidth={3} strokeLinecap="round" />;
        })}

        {/* the strip of pilot estimates */}
        <Key x={30} y={194} fill={SIGNAL}>{`THIS PILOT: ${current.holds} OF ${PILOT_N}`}</Key>
        <line x1={truth} y1={axisY} x2={truth} y2={204} stroke={COUNTER} strokeWidth={1.25} strokeDasharray="3 3" />
        <Key x={r2(truth + 6)} y={212} fill={COUNTER} size={10}>POPULATION 30%</Key>
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={4.5} fill={d.latest ? SIGNAL : PAPER} stroke={d.latest ? SIGNAL : INK} strokeWidth={1.25} />
        ))}
        <line x1={sx0 - 8} y1={axisY} x2={sx1 + 12} y2={axisY} stroke={INK} strokeWidth={1.25} />
        <path d={head.right(sx1 + 12, axisY, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
        {[0, 1, 2, 3, 4, 5, 6].map((h) => (
          <line key={h} x1={sx(h / PILOT_N)} y1={axisY} x2={sx(h / PILOT_N)} y2={axisY + 5} stroke={h % 3 ? RULE : INK} strokeWidth={1} />
        ))}
        {[0, 0.5, 1].map((s) => (
          <Key key={s} x={sx(s)} y={axisY + 20} anchor="middle" fill={INK3} size={10}>{`${s * 100}%`}</Key>
        ))}
      </Frame>
      <div className="mt-2 px-1">
        <PlateButton onClick={() => setDrawn((d) => d + 1)} icon={<RotateCw className="size-3.5" aria-hidden />}>
          Draw another sample
        </PlateButton>
      </div>
    </>
  );
}

/* --------------------------------------------------------------------------
   Descriptive Research
   -------------------------------------------------------------------------- */

type StoreGroup = "all" | "small" | "large";
/** Advertising spend (0–10) and sales (0–100) of twenty stores. */
const SMALL_STORES: [number, number][] = [
  [0.9, 30], [1.5, 40], [1.8, 22], [2.3, 33], [2.8, 44], [3.0, 18], [3.4, 29], [3.9, 39], [4.2, 24], [4.6, 34],
];
const LARGE_STORES: [number, number][] = [
  [5.3, 70], [5.8, 82], [6.2, 60], [6.7, 74], [7.1, 88], [7.4, 58], [7.9, 78], [8.4, 62], [8.7, 84], [9.3, 68],
];

/** Least-squares line through the points: [intercept, slope]. */
function fit(pts: [number, number][]) {
  const n = pts.length;
  const mx = pts.reduce((s, p) => s + p[0], 0) / n;
  const my = pts.reduce((s, p) => s + p[1], 0) / n;
  const sxy = pts.reduce((s, p) => s + (p[0] - mx) * (p[1] - my), 0);
  const sxx = pts.reduce((s, p) => s + (p[0] - mx) ** 2, 0);
  const b = sxy / sxx;
  return [my - b * mx, b] as const;
}

/**
 * Descriptive Research: twenty stores by advertising spend and sales. Across
 * all stores the two are clearly associated. The stores are drawn at their
 * size, and large stores both advertise more and sell more.
 *
 * Interactive: choose ALL, SMALL or LARGE. Among stores of one size the line
 * is flat: the association came from store size, so the survey alone cannot
 * say that advertising causes sales. It opens on ALL, the plate as a survey
 * would first report it.
 */
export function AssociationNotCause() {
  const [group, setGroup] = useState<StoreGroup>("all");
  const L = 40;
  const R = 384;
  const B = 196;
  const T = 20;
  const X = (v: number) => r2(L + 12 + (v / 10) * (R - L - 28));
  const Y = (v: number) => r2(B - 8 - (v / 100) * (B - T - 16));
  const pts = group === "small" ? SMALL_STORES : group === "large" ? LARGE_STORES : [...SMALL_STORES, ...LARGE_STORES];
  const [a, b] = fit(pts);
  const xs = pts.map((p) => p[0]);
  const flat = group !== "all";
  // A one-size line runs well past its cluster, so it reads behind the stores.
  const reach = flat ? 0.7 : 0.3;
  const lx0 = Math.min(...xs) - reach;
  const lx1 = Math.min(10, Math.max(...xs) + reach);
  const tone = flat ? COUNTER : SIGNAL;
  const lineEnd = { x: X(lx1), y: Y(a + b * lx1) };
  // The label sits in open space: under the middle of the line across all
  // stores, and beside the free end of a one-size line.
  const labelAt =
    group === "all"
      ? { x: r2(X(5) + 14), y: r2(Y(a + b * 5) + 24), anchor: "start" as const }
      : group === "small"
        ? { x: r2(lineEnd.x + 10), y: r2(lineEnd.y + 4), anchor: "start" as const }
        : { x: r2(X(lx0) - 10), y: r2(Y(a + b * lx0) + 4), anchor: "end" as const };
  const label = flat
    ? `Twenty stores by advertising spend and sales; only the ${group} stores are shown in full, and among them the fitted line is flat: no association`
    : "Twenty stores by advertising spend and sales, small stores low on both and large stores high on both; the fitted line across all stores rises steeply: the two are associated";

  return (
    <>
      <Frame width={400} height={226} label={label}>
        {/* axes */}
        <line x1={L} y1={B} x2={R} y2={B} stroke={INK} strokeWidth={1.25} />
        <path d={head.right(R, B, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
        <line x1={L} y1={B} x2={L} y2={T - 6} stroke={INK} strokeWidth={1.25} />
        <path d={head.up(L, T - 6, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
        <Key x={R} y={B + 22} anchor="end" fill={INK3}>ADVERTISING SPEND</Key>
        <g transform={`translate(${L - 12} ${T - 4}) rotate(-90)`}>
          <Key x={0} y={0} anchor="end" fill={INK3}>SALES</Key>
        </g>
        {/* the fitted line for the stores in view, behind them */}
        <line x1={X(lx0)} y1={Y(a + b * lx0)} x2={lineEnd.x} y2={lineEnd.y} stroke={tone} strokeWidth={2.25} strokeLinecap="round" />
        <Key x={labelAt.x} y={labelAt.y} anchor={labelAt.anchor} fill={tone} size={10.5}>
          {flat ? "NO ASSOCIATION" : "ASSOCIATED"}
        </Key>
        {/* stores, drawn at their size */}
        {SMALL_STORES.map(([x, y], i) => (
          <g key={`s${i}`} opacity={group === "large" ? 0.22 : 1}>
            <Store1 cx={X(x)} cy={Y(y)} k={0.72} stroke={INK} />
          </g>
        ))}
        {LARGE_STORES.map(([x, y], i) => (
          <g key={`l${i}`} opacity={group === "small" ? 0.22 : 1}>
            <Store1 cx={X(x)} cy={Y(y)} k={1.1} stroke={INK} />
          </g>
        ))}
      </Frame>
      <Segmented
        label="Stores"
        value={group}
        onChange={setGroup}
        options={[
          { id: "all", label: "All" },
          { id: "small", label: "Small only" },
          { id: "large", label: "Large only" },
        ]}
      />
    </>
  );
}

/* --------------------------------------------------------------------------
   Cross-Sectional and Longitudinal Designs
   -------------------------------------------------------------------------- */

/** Who buys brand B in each cross-sectional sample (two different samples). */
const CROSS_B = [
  [0, 4, 5, 9],
  [2, 3, 7, 8],
];
/** Who buys brand B at wave 1 of the panel. */
const PANEL_B1 = [1, 3, 6, 8];
/** Switches in pairs, one B→A and one A→B, so the share of B never moves. */
const PANEL_SWITCH_PAIRS = [
  [3, 5],
  [8, 0],
  [1, 9],
];

/**
 * Cross-Sectional and Longitudinal Designs: two waves of ten brand buyers,
 * brand B filled. On the left, a multiple cross-sectional design: a new
 * sample at each wave, 4 of 10 buying B both times. On the right, a panel:
 * the same ten people at both waves, a line from each person to themselves,
 * drawn in the accent where the person switched brand.
 *
 * Interactive: the SWITCHERS slider moves people between brands in pairs.
 * The panel fills with switching, and the cross-sections do not change at
 * all: at 4 of 10 either way, only the panel can see who switched. It opens
 * with four switchers.
 */
export function SwitchingPanel() {
  const [switchers, setSwitchers] = useState(4);
  const pairs = PANEL_SWITCH_PAIRS.slice(0, switchers / 2);
  const switched = new Set(pairs.flat());
  const panelB2 = new Set(PANEL_B1);
  for (const [out, into] of pairs) {
    panelB2.delete(out);
    panelB2.add(into);
  }

  const row = [88, 176];
  const k = 0.9;
  const step = 24;
  const left = { x0: 96, count: 386, title: 88 };
  const right = { x0: 448, count: 780, title: 440 };
  const px = (x0: number, i: number) => x0 + i * step;

  const person = (x: number, y: number, b: boolean, key: string) => (
    <Person1 key={key} x={x} y={y} k={k} stroke={b ? COUNTER : INK} fill={b ? COUNTER : PAPER} />
  );

  return (
    <>
      <Frame
        width={800}
        height={202}
        label={`Two waves of ten brand buyers. Left, a multiple cross-sectional design: a different sample at each wave, four of ten buying brand B both times. Right, a longitudinal panel: the same ten people at both waves, ${switchers} of whom switched brand, while four of ten still buy brand B`}
      >
        {/* row keys shared by both designs */}
        <Key x={20} y={row[0] - 10} fill={INK3}>WAVE 1</Key>
        <Key x={20} y={row[1] - 10} fill={INK3}>WAVE 2</Key>

        {/* multiple cross-sectional: a new sample at each wave */}
        <Key x={left.title} y={20} fill={INK}>CROSS-SECTIONAL</Key>
        <Key x={left.count} y={20} anchor="end" fill={COUNTER} size={10}>BRAND B</Key>
        {row.map((y, w) =>
          Array.from({ length: 10 }, (_, i) => person(px(left.x0, i), y, CROSS_B[w].includes(i), `c${w}-${i}`)),
        )}
        {row.map((y, w) => (
          <Key key={`cc${w}`} x={left.count} y={y - 10} anchor="end" fill={COUNTER}>4 OF 10</Key>
        ))}

        <line x1={400} y1={8} x2={400} y2={194} stroke={RULE} strokeWidth={1} />

        {/* longitudinal: the same people at both waves */}
        <Key x={right.title} y={20} fill={SIGNAL}>LONGITUDINAL</Key>
        <Key x={right.count} y={20} anchor="end" fill={COUNTER} size={10}>BRAND B</Key>
        {Array.from({ length: 10 }, (_, i) => {
          const x = px(right.x0, i);
          const s = switched.has(i);
          return (
            <line
              key={`l${i}`}
              x1={x}
              y1={row[0] + 8}
              x2={x}
              y2={row[1] - 40}
              stroke={s ? SIGNAL : RULE2}
              strokeWidth={s ? 2.5 : 1.25}
              strokeLinecap="round"
            />
          );
        })}
        {Array.from({ length: 10 }, (_, i) => person(px(right.x0, i), row[0], PANEL_B1.includes(i), `p1-${i}`))}
        {Array.from({ length: 10 }, (_, i) => person(px(right.x0, i), row[1], panelB2.has(i), `p2-${i}`))}
        {row.map((y, w) => (
          <Key key={`pc${w}`} x={right.count} y={y - 10} anchor="end" fill={COUNTER}>4 OF 10</Key>
        ))}
        <Key x={right.count} y={r2((row[0] + row[1]) / 2 - 12)} anchor="end" fill={SIGNAL}>
          {`${switchers} SWITCHED`}
        </Key>
      </Frame>
      <Slider label="Switchers" value={switchers} min={0} max={6} step={2} onChange={setSwitchers} />
    </>
  );
}

/* --------------------------------------------------------------------------
   Causal Research
   -------------------------------------------------------------------------- */

const EFFECT = 20;
const TREND_MIN = -30;
const TREND_MAX = 40;

/**
 * Causal Research: weekly sales before and after a price reduction, in stores
 * where the price was reduced and in comparable stores where it was not.
 * Whatever else moves sales (the season, a competitor, the weather) moves
 * both groups alike.
 *
 * Interactive: drag the unchanged stores' AFTER point up or down, which sets
 * how much sales would have moved anyway. The before–after change in the
 * reduced stores swings with it; the difference from the unchanged stores
 * stays at +20. Only the controlled comparison isolates the effect of the
 * manipulation. It opens with sales rising by 25 anyway.
 */
export function ControlledEffect() {
  const [trend, setTrend] = useState(25);
  const L = 40;
  const axisY = 196;
  const bx = 80;
  const ax = 196;
  const Y = (v: number) => r2(axisY - 8 - ((v - 60) / 110) * 164);
  const V = (y: number) => 60 + ((axisY - 8 - y) / 164) * 110;
  const before = 100;
  const control = before + trend;
  const test = control + EFFECT;
  const change = test - before;
  const set = (v: number) => setTrend(Math.max(TREND_MIN, Math.min(TREND_MAX, Math.round((v - before) / 5) * 5)));

  const drag = (e: React.PointerEvent<SVGSVGElement>) => {
    const ctm = e.currentTarget.getScreenCTM();
    if (!ctm) return;
    set(V(new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse()).y));
  };

  const cy = Y(control);
  const ty = Y(test);
  const by = Y(before);
  const sign = (n: number) => (n > 0 ? `+${n}` : n < 0 ? `−${-n}` : "0");

  return (
    <Frame
      width={400}
      height={292}
      label={`Weekly sales before and after a price reduction. Where the price was reduced, sales changed by ${sign(change)}; where it was unchanged, by ${sign(trend)}. The difference between them, the effect of the reduction, is +${EFFECT}`}
      className="cursor-ns-resize touch-none select-none"
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
      {/* axes */}
      <line x1={L} y1={axisY} x2={228} y2={axisY} stroke={INK} strokeWidth={1.25} />
      <line x1={L} y1={axisY} x2={L} y2={12} stroke={INK} strokeWidth={1.25} />
      <path d={head.up(L, 12, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
      <g transform={`translate(${L - 12} 16) rotate(-90)`}>
        <Key x={0} y={0} anchor="end" fill={INK3}>SALES</Key>
      </g>
      <Key x={bx} y={axisY + 20} anchor="middle" fill={INK3}>BEFORE</Key>
      <Key x={ax} y={axisY + 20} anchor="middle" fill={INK3}>AFTER</Key>
      <line x1={138} y1={axisY} x2={138} y2={24} stroke={RULE2} strokeWidth={1} strokeDasharray="3 3" />
      <Key x={138} y={18} anchor="middle" fill={INK3} size={10}>PRICE CUT</Key>

      {/* the level before, carried across */}
      <line x1={bx} y1={by} x2={ax + 8} y2={by} stroke={INK3} strokeWidth={1} strokeDasharray="4 3" />

      {/* the two groups of stores */}
      <line x1={bx} y1={by} x2={ax} y2={cy} stroke={COUNTER} strokeWidth={2} />
      <line x1={bx} y1={by} x2={ax} y2={ty} stroke={SIGNAL} strokeWidth={2.25} />
      <circle cx={bx} cy={by} r={4} fill={INK} />
      <circle cx={ax} cy={ty} r={4.5} fill={SIGNAL} />

      {/* the handle: what happens to sales anyway */}
      <g
        role="slider"
        tabIndex={0}
        aria-label="Change in sales without the price reduction"
        aria-valuemin={TREND_MIN}
        aria-valuemax={TREND_MAX}
        aria-valuenow={trend}
        className="outline-none [&:focus-visible>circle]:stroke-[var(--ink)]"
        onKeyDown={(e) => {
          if (e.key === "ArrowUp" || e.key === "ArrowRight") set(control + 5);
          else if (e.key === "ArrowDown" || e.key === "ArrowLeft") set(control - 5);
          else return;
          e.preventDefault();
        }}
      >
        <circle cx={ax} cy={cy} r={8} fill={PAPER} stroke={COUNTER} strokeWidth={2} />
        <path d={`M${ax - 4} ${r2(cy - 12)}L${ax} ${r2(cy - 17)}L${ax + 4} ${r2(cy - 12)}Z`} fill={COUNTER} />
        <path d={`M${ax - 4} ${r2(cy + 12)}L${ax} ${r2(cy + 17)}L${ax + 4} ${r2(cy + 12)}Z`} fill={COUNTER} />
      </g>

      {/* the effect: the gap between the two groups after the cut */}
      <path d={`M${ax + 16} ${ty}H${ax + 22}V${cy}H${ax + 16}`} fill="none" stroke={SIGNAL} strokeWidth={1.75} />
      <Key x={ax + 32} y={r2(ty + 4)} fill={SIGNAL} size={10}>PRICE REDUCED</Key>
      <Key x={ax + 32} y={r2(cy + 4)} fill={COUNTER} size={10}>PRICE UNCHANGED</Key>

      {/* the two comparisons */}
      <line x1={L} y1={232} x2={380} y2={232} stroke={RULE} strokeWidth={1} />
      <Key x={L} y={252} fill={INK3} size={10}>BEFORE–AFTER</Key>
      <Display x={L} y={280} fill={INK} size={28}>{sign(change)}</Display>
      <Key x={ax + 16} y={252} fill={SIGNAL} size={10}>REDUCED VS UNCHANGED</Key>
      <Display x={ax + 16} y={280} fill={SIGNAL} size={28}>{sign(EFFECT)}</Display>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Selecting a Research Design
   -------------------------------------------------------------------------- */

/**
 * Selecting a Research Design: the usual sequence, from an ambiguous problem
 * (?) through exploratory research (hypotheses), descriptive research (the
 * magnitude) and causal research (the effect of an action). A well-defined
 * problem (!) may enter at descriptive or causal research directly.
 */
export function DesignSequence() {
  const cy = 118;
  const r = 30;
  const xs = [250, 460, 670];
  const stations = [
    { key: "EXPLORATORY", sub: "HYPOTHESES", Icon: Lightbulb },
    { key: "DESCRIPTIVE", sub: "MAGNITUDE", Icon: ChartBar },
    { key: "CAUSAL", sub: "EFFECT OF AN ACTION", Icon: Flask },
  ];
  const q = { x: 70, y: cy };
  const bang = { x: 565, y: 34 };
  const mark = (x: number, y: number, ch: string, tone: string) => (
    <g>
      <circle cx={x} cy={y} r={16} fill={PAPER} stroke={tone} strokeWidth={1.5} />
      <text x={x} y={y + 6} textAnchor="middle" fontFamily="var(--font-heading)" fontSize={18} fontWeight={600} fill={tone}>
        {ch}
      </text>
    </g>
  );
  // Curved entries from the well-defined problem down onto the tops of two stations.
  const entry = (tx: number) => {
    const sx = bang.x + (tx < bang.x ? -12 : 12);
    const sy = bang.y + 11;
    const ey = cy - r - 6;
    return (
      <g key={tx}>
        <path d={`M${sx} ${sy}C${sx} ${sy + 30} ${tx} ${ey - 34} ${tx} ${ey}`} fill="none" stroke={COUNTER} strokeWidth={1.5} />
        <path d={head.down(tx, ey, 7)} fill="none" stroke={COUNTER} strokeWidth={1.5} />
      </g>
    );
  };
  return (
    <Frame
      width={800}
      height={194}
      label="The usual sequence of research designs: an ambiguous problem leads to exploratory research, which generates hypotheses, then descriptive research, which estimates the magnitude, then causal research, which tests the effect of an action. A well-defined problem may enter at descriptive or causal research directly"
    >
      {/* the usual sequence */}
      {mark(q.x, q.y, "?", INK)}
      <Key x={q.x} y={cy + 42} anchor="middle" fill={INK3} size={10}>AMBIGUOUS</Key>
      <Key x={q.x} y={cy + 56} anchor="middle" fill={INK3} size={10}>PROBLEM</Key>
      {[q.x + 22, ...xs.slice(0, -1).map((x) => x + r + 6)].map((x0, i) => {
        const x1 = xs[i] - r - 6;
        return (
          <g key={i}>
            <line x1={x0} y1={cy} x2={x1} y2={cy} stroke={INK} strokeWidth={1.25} />
            <path d={head.right(x1, cy, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
          </g>
        );
      })}
      {stations.map(({ key, sub, Icon }, i) => (
        <g key={key}>
          <circle cx={xs[i]} cy={cy} r={r} fill={PAPER} stroke={INK} strokeWidth={1.5} />
          <Icon x={xs[i] - 15} y={cy - 15} size={30} color={INK} />
          <Key x={xs[i]} y={cy + r + 20} anchor="middle" fill={INK}>{key}</Key>
          <Key x={xs[i]} y={cy + r + 36} anchor="middle" fill={INK3} size={10}>{sub}</Key>
        </g>
      ))}

      {/* the shortcut for a well-defined problem */}
      {mark(bang.x, bang.y, "!", COUNTER)}
      <Key x={bang.x - 26} y={bang.y + 4} anchor="end" fill={COUNTER} size={10}>WELL-DEFINED PROBLEM</Key>
      {entry(xs[1])}
      {entry(xs[2])}
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Discussion: Designing the Study
   -------------------------------------------------------------------------- */

/**
 * Discussion: many website inquiries, one purchase of an electric bicycle,
 * and an unexplained gap between them.
 */
export function InquiriesToPurchases() {
  const cols = 6;
  const rows = 4;
  const base = 70;
  return (
    <Frame
      width={400}
      height={212}
      label="Twenty-four people who sent an inquiry from the website, and only one who bought an electric bicycle, with a question mark over the gap between them"
    >
      <Envelope x={20} y={10} size={26} color={INK} />
      <Key x={54} y={29} fill={INK3}>24 INQUIRIES</Key>
      {Array.from({ length: cols * rows }, (_, i) => (
        <Person1 key={i} x={32 + (i % cols) * 26} y={base + Math.floor(i / cols) * 40} k={0.85} />
      ))}
      <line x1={196} y1={124} x2={292} y2={124} stroke={INK} strokeWidth={1.25} />
      <path d={head.right(292, 124, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
      <circle cx={244} cy={92} r={15} fill={PAPER} stroke={COUNTER} strokeWidth={1.5} />
      <text x={244} y={98} textAnchor="middle" fontFamily="var(--font-heading)" fontSize={17} fontWeight={600} fill={COUNTER}>?</text>
      <Person1 x={316} y={150} k={1.1} stroke={INK} fill={INK} />
      <Bicycle x={336} y={112} size={40} color={INK} />
      <Key x={340} y={96} anchor="middle" fill={INK3}>1 PURCHASE</Key>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Evaluating Secondary Data
   -------------------------------------------------------------------------- */

const AGE0 = 16;
const AGE1 = 70;
/** Buyers of a category at each age, 16 to 70: young-skewed, with a second rise in mid-life. */
const BUYERS_BY_AGE = Array.from({ length: AGE1 - AGE0 + 1 }, (_, i) => {
  const a = AGE0 + i;
  return Math.exp(-((a - 27) ** 2) / (2 * 8 ** 2)) + 0.4 * Math.exp(-((a - 47) ** 2) / (2 * 11 ** 2));
});
const BUYERS_TOTAL = BUYERS_BY_AGE.reduce((s, v) => s + v, 0);
const UPPER_MIN = 21;
const UPPER_MAX = 44;

/**
 * Evaluating Secondary Data, Definitions: the same buyers of one category by
 * age, and the share a source would report as "young adults" under its own
 * definition, which starts at 18 and ends where the source draws the line.
 *
 * Interactive: drag the edge of the band. Moving the upper age from 24 to 34
 * roughly doubles the reported share, although not one buyer has changed:
 * two sources can disagree only because they define the group differently.
 * It opens at 18–24.
 */
export function DefinitionShift() {
  const [upper, setUpper] = useState(24);
  const L = 30;
  const R = 386;
  const axisY = 178;
  const top = 64;
  const bw = (R - L) / (AGE1 - AGE0 + 1);
  const X = (age: number) => r2(L + (age - AGE0) * bw);
  const peak = Math.max(...BUYERS_BY_AGE);
  const H = (v: number) => r2((v / peak) * (axisY - top - 10));
  const share = Math.round(
    (BUYERS_BY_AGE.slice(18 - AGE0, upper - AGE0 + 1).reduce((s, v) => s + v, 0) / BUYERS_TOTAL) * 100,
  );
  const set = (age: number) => setUpper(Math.max(UPPER_MIN, Math.min(UPPER_MAX, Math.round(age))));
  const drag = (e: React.PointerEvent<SVGSVGElement>) => {
    const ctm = e.currentTarget.getScreenCTM();
    if (!ctm) return;
    const x = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse()).x;
    set((x - L) / bw + AGE0 - 1);
  };
  const edge = X(upper + 1);
  const band0 = X(18);

  return (
    <Frame
      width={400}
      height={220}
      label={`Buyers of a category by age, from 16 to 70. Young adults defined as aged 18 to ${upper} make up ${share} percent of buyers`}
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
      {/* the definition: a band from 18 to the upper age */}
      <rect x={band0} y={top - 8} width={r2(edge - band0)} height={axisY - top + 8} fill={SIGNAL_TINT} />
      <Key x={band0} y={top - 28} fill={SIGNAL}>{`YOUNG ADULTS ${18}–${upper}`}</Key>

      {/* buyers at each age */}
      {BUYERS_BY_AGE.map((v, i) => {
        const age = AGE0 + i;
        const inBand = age >= 18 && age <= upper;
        const h = H(v);
        return (
          <rect
            key={age}
            x={r2(X(age) + 0.6)}
            y={r2(axisY - h)}
            width={r2(bw - 1.2)}
            height={h}
            fill={inBand ? SIGNAL : RULE2}
          />
        );
      })}

      {/* the share the source would report */}
      <Display x={R} y={top + 4} anchor="end" fill={SIGNAL} size={34}>{`${share}%`}</Display>
      <Key x={R} y={top + 26} anchor="end" fill={INK3} size={10}>OF BUYERS</Key>

      {/* the draggable edge */}
      <g
        role="slider"
        tabIndex={0}
        aria-label="Upper age of young adults"
        aria-valuemin={UPPER_MIN}
        aria-valuemax={UPPER_MAX}
        aria-valuenow={upper}
        className="outline-none [&:focus-visible>circle]:stroke-[var(--ink)]"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" || e.key === "ArrowUp") set(upper + 1);
          else if (e.key === "ArrowLeft" || e.key === "ArrowDown") set(upper - 1);
          else return;
          e.preventDefault();
        }}
      >
        <line x1={edge} y1={top - 8} x2={edge} y2={axisY} stroke={SIGNAL} strokeWidth={2} />
        <circle cx={edge} cy={top - 8} r={8} fill={PAPER} stroke={SIGNAL} strokeWidth={2} />
        <path d={`M${r2(edge - 12)} ${top - 12}l-5 4l5 4Z`} fill={SIGNAL} />
        <path d={`M${r2(edge + 12)} ${top - 12}l5 4l-5 4Z`} fill={SIGNAL} />
      </g>

      {/* the age axis */}
      <line x1={L - 6} y1={axisY} x2={R + 8} y2={axisY} stroke={INK} strokeWidth={1.25} />
      <path d={head.right(R + 8, axisY, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
      {[20, 30, 40, 50, 60, 70].map((a) => (
        <g key={a}>
          <line x1={r2(X(a) + bw / 2)} y1={axisY} x2={r2(X(a) + bw / 2)} y2={axisY + 5} stroke={INK} strokeWidth={1} />
          <Key x={r2(X(a) + bw / 2)} y={axisY + 19} anchor="middle" fill={INK3} size={10}>{`${a}`}</Key>
        </g>
      ))}
      <Key x={R + 8} y={axisY + 34} anchor="end" fill={INK3} size={10}>AGE</Key>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Internal Secondary Data
   -------------------------------------------------------------------------- */

/**
 * Internal Secondary Data: one market of three groups: the firm's own
 * customers, competitors' customers and people who have never purchased.
 * The firm's internal data enclose only the first group.
 */
export function InternalCoverage() {
  const groups = [
    { cx: 72, stroke: SIGNAL, fill: SIGNAL, l1: "THE FIRM'S", l2: "CUSTOMERS", tone: SIGNAL },
    { cx: 206, stroke: COUNTER, fill: COUNTER, l1: "COMPETITORS'", l2: "CUSTOMERS", tone: COUNTER },
    { cx: 336, stroke: COUNTER, fill: PAPER, l1: "NEVER", l2: "PURCHASED", tone: COUNTER },
  ];
  const rowY = [66, 104, 142];
  const colDx = [-26, 0, 26];
  return (
    <Frame
      width={400}
      height={206}
      label="A market of three groups of nine people: the firm's customers, enclosed by the firm's internal data; competitors' customers; and people who have never purchased, both outside it"
    >
      <rect x={20} y={10} width={104} height={146} rx={4} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
      <Key x={72} y={29} anchor="middle" fill={SIGNAL} size={10}>INTERNAL DATA</Key>
      {groups.map((g) => (
        <g key={g.l1}>
          {rowY.map((y) =>
            colDx.map((dx) => <Person1 key={`${y}-${dx}`} x={g.cx + dx} y={y} k={0.8} stroke={g.stroke} fill={g.fill} />),
          )}
          <Key x={g.cx} y={178} anchor="middle" fill={g.tone} size={10}>{g.l1}</Key>
          <Key x={g.cx} y={192} anchor="middle" fill={g.tone} size={10}>{g.l2}</Key>
        </g>
      ))}
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Types of Customer Data
   -------------------------------------------------------------------------- */

/**
 * Types of Customer Data: four small scenes of where the firm's data come
 * from. First-party: its own customer, directly. Zero-party: a customer who
 * hands over a completed form. Second-party: a partner organisation's own
 * customer, passed on by the partner. Third-party: many websites feeding a
 * broker that sells to several buyers, the firm among them. The firm is the
 * accent building in every scene.
 */
export function DataRelationships() {
  const cy = 70;
  const s = 34;
  const flow = (x1: number, y1: number, x2: number, y2: number, tone = INK) => (
    <g key={`${x1}-${y1}-${x2}-${y2}`}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={tone} strokeWidth={1.25} />
      <path d={headAlong(x2, y2, x2 - x1, y2 - y1, 7)} fill="none" stroke={tone} strokeWidth={1.25} />
    </g>
  );
  const firm = (x: number, y: number, tone = SIGNAL) => <Buildings x={x - s / 2} y={y - s / 2} size={s} color={tone} />;
  const cols = [0, 200, 400, 600];
  const keys = [
    { t: "FIRST-PARTY", tone: SIGNAL },
    { t: "ZERO-PARTY", tone: SIGNAL },
    { t: "SECOND-PARTY", tone: INK },
    { t: "THIRD-PARTY", tone: COUNTER },
  ];
  const fan = [30, 70, 110];
  return (
    <Frame
      width={800}
      height={156}
      label="Four sources of customer data. First-party: the firm collects from its own customer directly. Zero-party: a customer hands the firm a completed form. Second-party: a partner organisation passes on data from its own customer. Third-party: many websites feed a broker, which sells to several buyers, the firm among them"
    >
      {cols.slice(1).map((x) => (
        <line key={x} x1={x} y1={8} x2={x} y2={148} stroke={RULE} strokeWidth={1} />
      ))}

      {/* first-party: customer → firm */}
      <Person1 x={cols[0] + 48} y={cy + 19} k={1.15} />
      {flow(cols[0] + 72, cy, cols[0] + 126, cy, SIGNAL)}
      {firm(cols[0] + 150, cy)}

      {/* zero-party: customer hands over a completed form → firm */}
      <Person1 x={cols[1] + 36} y={cy + 19} k={1.15} />
      <rect x={cols[1] + 56} y={cy - 16} width={22} height={28} rx={2} fill={PAPER} stroke={INK} strokeWidth={1.25} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <path d={`M${cols[1] + 60} ${cy - 9 + i * 8}l2 2l3.5-4`} fill="none" stroke={INK} strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round" />
          <line x1={cols[1] + 68} y1={cy - 9 + i * 8} x2={cols[1] + 74} y2={cy - 9 + i * 8} stroke={INK} strokeWidth={1.25} />
        </g>
      ))}
      {flow(cols[1] + 86, cy, cols[1] + 126, cy, SIGNAL)}
      {firm(cols[1] + 150, cy)}

      {/* second-party: partner's customer → partner → firm */}
      <Person1 x={cols[2] + 28} y={cy + 19} k={1.15} />
      {flow(cols[2] + 46, cy, cols[2] + 74, cy)}
      {firm(cols[2] + 96, cy, INK)}
      {flow(cols[2] + 118, cy, cols[2] + 146, cy)}
      {firm(cols[2] + 170, cy)}

      {/* third-party: many websites → broker → many buyers */}
      {fan.map((y) => (
        <Globe key={`g${y}`} x={cols[3] + 18} y={y - 13} size={26} color={INK} />
      ))}
      {fan.map((y) => flow(cols[3] + 50, r2(y + (cy - y) * 0.15), cols[3] + 80, r2(y + (cy - y) * 0.75), COUNTER))}
      <Database x={cols[3] + 84} y={cy - s / 2} size={s} color={COUNTER} />
      {fan.map((y) => flow(cols[3] + 120, r2(cy + (y - cy) * 0.25), cols[3] + 146, r2(cy + (y - cy) * 0.8), COUNTER))}
      {fan.map((y, i) => (
        <g key={`b${y}`}>{firm(cols[3] + 172, y, i === 1 ? SIGNAL : INK)}</g>
      ))}

      {keys.map((k, i) => (
        <Key key={k.t} x={cols[i] + 100} y={146} anchor="middle" fill={k.tone}>{k.t}</Key>
      ))}
    </Frame>
  );
}
