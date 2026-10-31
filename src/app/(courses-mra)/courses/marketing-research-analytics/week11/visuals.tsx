/* ==========================================================================
   Week 11 plates: Customer Analytics and Predictive Modeling.
   Built on ../_visuals/kit and ../_visuals/objects. Every plate follows the
   sentence it illustrates on the slide.

   Data: the customer, model, evaluation, recommendation and fairness plates
   run on made-up data. The country-of-origin plate
   uses Wadi, Ghodrat & Philp (2026): Table 2 (main effects) and Figure 5
   (model × target interactions) for the CETSCALE.
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
  head,
  r2,
  seeded,
  PlateButton,
  Slider,
  Segmented,
  Toggles,
} from "../_visuals/kit";
import { Person1, AiMark1 } from "../_visuals/objects";
import {
  Headphones,
  DeviceMobile,
  Watch,
  Camera,
  GameController,
  Laptop,
  Envelope,
  FileText,
  Sneaker,
  Bicycle,
  Tent,
  Backpack,
  Coffee,
  CookingPot,
  Book,
} from "@phosphor-icons/react";

/* --------------------------------------------------------------------------
   Shared helpers
   -------------------------------------------------------------------------- */

/**
 * Pointer handlers for a drag inside a plate: `onPoint` receives the pointer
 * in the plate's own viewBox units. Attach to the element students grab.
 */
function dragHandlers(onPoint: (x: number, y: number) => void) {
  const at = (e: React.PointerEvent<SVGElement>) => {
    const svg = (e.currentTarget as SVGElement).ownerSVGElement ?? (e.currentTarget as SVGSVGElement);
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
    onPoint(p.x, p.y);
  };
  return {
    onPointerDown: (e: React.PointerEvent<SVGElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      at(e);
    },
    onPointerMove: (e: React.PointerEvent<SVGElement>) => {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) at(e);
    },
  };
}

const usd = (v: number) => `$${Math.round(v).toLocaleString("en-US")}`;

/* STUBS */
/* --------------------------------------------------------------------------
   Customer Analytics
   -------------------------------------------------------------------------- */

type Icon = React.ComponentType<{ x?: number; y?: number; size?: number; weight?: "regular"; color?: string }>;

/** Six customers of an electronics retailer, one row each (simulated). */
const LEDGER: { value: number; leave: number; respond: number; next: Icon }[] = [
  { value: 1840, leave: 6, respond: 41, next: Headphones },
  { value: 260, leave: 58, respond: 12, next: DeviceMobile },
  { value: 920, leave: 14, respond: 33, next: Watch },
  { value: 75, leave: 81, respond: 4, next: Camera },
  { value: 1310, leave: 9, respond: 27, next: GameController },
  { value: 430, leave: 22, respond: 18, next: Laptop },
];

/**
 * The customer as the unit of analysis: a ledger in which every row is one
 * customer and every column answers one of the four questions for that
 * customer, its value, its probability of leaving, its probability of
 * responding to an offer, and the product to offer next. One customer's
 * row is read across in --signal.
 */
export function CustomerLedger() {
  const top = 66;
  const rh = 40;
  const cols = [
    { key: "Value", x: 96, w: 124 },
    { key: "Likely to leave", x: 286, w: 110 },
    { key: "Likely to respond", x: 436, w: 110 },
    { key: "Next offer", x: 590, w: 70 },
  ];
  const lit = 2;
  return (
    <Frame
      width={680}
      height={326}
      label="A ledger of six customers, one row per customer, with four columns: value (from $75 to $1,840), probability of leaving (6% to 81%), probability of responding to an offer (4% to 41%) and the product to offer next (headphones, phone, watch, camera, game controller, laptop). The third customer's row is highlighted: value $920, 14% likely to leave, 33% likely to respond, next offer a watch"
    >
      {cols.map((c) => (
        <Key key={c.key} x={c.x} y={36} size={10}>
          {c.key}
        </Key>
      ))}
      <line x1={20} y1={48} x2={660} y2={48} stroke={INK} strokeWidth={1.25} />
      <rect x={14} y={r2(top + lit * rh - 4)} width={652} height={rh} fill={SIGNAL_TINT} />
      {LEDGER.map((row, i) => {
        const y = top + i * rh;
        const mid = y + rh / 2 - 4;
        const c = i === lit ? SIGNAL : INK;
        const Next = row.next;
        return (
          <g key={i}>
            {i > 0 ? <line x1={20} y1={y - 4} x2={660} y2={y - 4} stroke={RULE} strokeWidth={1} /> : null}
            <Person1 x={44} y={r2(y + rh - 8)} k={0.82} stroke={c} fill={i === lit ? SIGNAL : PAPER} width={1.3} />
            <rect x={cols[0].x} y={mid - 7} width={r2((row.value / 2000) * cols[0].w)} height={14} fill={c} />
            <Key x={r2(cols[0].x + (row.value / 2000) * cols[0].w + 6)} y={mid + 4} size={10.5} fill={c} weight={700}>
              {usd(row.value)}
            </Key>
            {[row.leave, row.respond].map((p, j) => {
              const col = cols[j + 1];
              return (
                <g key={j}>
                  <rect x={col.x} y={mid - 7} width={r2(col.w * 0.62)} height={14} fill="none" stroke={RULE2} strokeWidth={1} />
                  <rect x={col.x} y={mid - 7} width={r2((p / 100) * col.w * 0.62)} height={14} fill={c} />
                  <Key x={r2(col.x + col.w * 0.62 + 6)} y={mid + 4} size={10.5} fill={c} weight={700}>{`${p}%`}</Key>
                </g>
              );
            })}
            <Next x={cols[3].x + 6} y={r2(mid - 14)} size={28} weight="regular" color={c} />
          </g>
        );
      })}
      <line x1={20} y1={r2(top + 6 * rh - 4)} x2={660} y2={r2(top + 6 * rh - 4)} stroke={INK} strokeWidth={1.25} />
    </Frame>
  );
}
/* --------------------------------------------------------------------------
   Customer Lifetime Value
   -------------------------------------------------------------------------- */

/** CLV in closed form: m × r / (1 + d − r). */
const clvOf = (m: number, r: number, d: number) => (m * r) / (1 + d - r);

/**
 * The example's profit stream, year by year: each year's $100 margin (outline)
 * is kept only if the customer is still a customer (80% a year, grey), and is
 * worth less today the later it arrives (10% a year, --signal). The present
 * values, laid end to end below, add up to the CLV of about $267.
 */
export function ProfitStream() {
  const years = 12;
  const m = 100;
  const r = 0.8;
  const d = 0.1;
  const base = 172;
  const k = 1.2;
  const x0 = 214;
  const step = 37;
  const bw = 24;
  const pv = Array.from({ length: years }, (_, i) => m * (r / (1 + d)) ** (i + 1));
  const kept = Array.from({ length: years }, (_, i) => m * r ** (i + 1));
  const sx = 214;
  const sk = 1;
  const starts = pv.map((_, i) => pv.slice(0, i).reduce((a, b) => a + b, 0));
  const total = clvOf(m, r, d);
  const yTop = r2(base - m * k);
  const yKept = r2(base - kept[0] * k);
  const yPv = r2(base - pv[0] * k);
  return (
    <Frame
      width={680}
      height={262}
      label="A customer's profit stream over twelve years: each year's $100 margin is multiplied by the chance the customer is still a customer (80% a year) and discounted at 10% a year, so the present value falls from $73 in year 1 to under $5 by year 12. Laid end to end, the present values add up to a CLV of about $267"
    >
      {/* in-place labels for the three layers of year 1 */}
      {[
        { y: yTop, t: "$100 margin", c: INK3 },
        { y: yKept, t: "× still a customer", c: INK3 },
        { y: yPv, t: "Present value", c: SIGNAL },
      ].map((l, i) => (
        <g key={i}>
          <line x1={r2(x0 - 10)} y1={r2(l.y + (i === 2 ? 12 : 0))} x2={r2(x0 - 4)} y2={r2(l.y + (i === 2 ? 12 : 0))} stroke={l.c} strokeWidth={1} />
          <Key x={r2(x0 - 14)} y={r2(l.y + (i === 2 ? 16 : i === 1 ? 2 : 4))} anchor="end" size={9.5} fill={l.c} weight={i === 2 ? 700 : 600}>
            {l.t}
          </Key>
        </g>
      ))}
      {pv.map((v, i) => {
        const x = x0 + i * step;
        return (
          <g key={i}>
            <rect x={x} y={yTop} width={bw} height={r2(m * k)} fill={PAPER} stroke={RULE2} strokeWidth={1} />
            <rect x={x} y={r2(base - kept[i] * k)} width={bw} height={r2(kept[i] * k)} fill={PAPER3} />
            <rect x={x} y={r2(base - v * k)} width={bw} height={r2(v * k)} fill={SIGNAL} />
            <Key x={r2(x + bw / 2)} y={base + 15} anchor="middle" size={9}>{i + 1}</Key>
          </g>
        );
      })}
      <line x1={x0 - 6} y1={base} x2={r2(x0 + years * step - 6)} y2={base} stroke={INK} strokeWidth={1.25} />
      <Key x={r2(x0 + years * step - 6)} y={base + 30} anchor="end" size={9.5}>Year</Key>

      {/* the present values end to end */}
      <Key x={r2(sx - 14)} y={232} anchor="end" size={10} fill={SIGNAL} weight={700}>Sum</Key>
      {pv.map((v, i) => (
        <rect key={i} x={r2(sx + starts[i] * sk)} y={220} width={r2(Math.max(0.6, v * sk - 1.5))} height={16} fill={SIGNAL} />
      ))}
      <Display x={r2(sx + total * sk + 12)} y={236} size={24} fill={SIGNAL}>{`CLV ≈ ${usd(total)}`}</Display>
      <Key x={20} y={254} size={9} fill={INK3}>{"m = $100 | r = 80% | d = 10%"}</Key>
    </Frame>
  );
}
/** A small shopping bag standing on (x, y): one purchase. */
function BagMark({ x, y, s = 12, color = INK, fill = PAPER }: { x: number; y: number; s?: number; color?: string; fill?: string }) {
  const w = s * 0.8;
  const h = s * 0.78;
  return (
    <g>
      <path
        d={`M${r2(x - w * 0.24)} ${r2(y - h)}V${r2(y - h - s * 0.16)}Q${r2(x - w * 0.24)} ${r2(y - h - s * 0.36)} ${x} ${r2(y - h - s * 0.36)}Q${r2(x + w * 0.24)} ${r2(y - h - s * 0.36)} ${r2(x + w * 0.24)} ${r2(y - h - s * 0.16)}V${r2(y - h)}`}
        fill="none"
        stroke={color}
        strokeWidth={1.1}
      />
      <rect x={r2(x - w / 2)} y={r2(y - h)} width={r2(w)} height={r2(h)} fill={fill} stroke={color} strokeWidth={1.2} strokeLinejoin="round" />
    </g>
  );
}

/**
 * Observed and unobserved ends: a subscriber's monthly payments stop at a
 * cancellation the firm records. Two retail customers have both been silent
 * for three months, but the one who used to buy every two weeks is probably
 * gone while the one who buys every four months is probably still active.
 */
export function ObservedEnd() {
  const x0 = 170;
  const x1 = 560;
  const X = (mo: number) => r2(x0 + ((x1 - x0) * mo) / 12);
  const pay = Array.from({ length: 8 }, (_, i) => i + 0.5);
  const often = Array.from({ length: 12 }, (_, i) => 3.5 + i * 0.5);
  const seldom = [1, 5, 9];
  return (
    <Frame
      width={680}
      height={214}
      label="Contractual: a subscriber pays every month and cancels in month 8, so the end of the relationship is observed. Noncontractual: two retail customers have both made no purchase for three months. One used to buy every two weeks, so the probability that this customer is still active is low (15%). The other buys every four months, so the probability is high (80%)"
    >
      {/* today */}
      <line x1={X(12)} y1={86} x2={X(12)} y2={196} stroke={INK3} strokeWidth={1} strokeDasharray="3 3" />
      <Key x={X(12)} y={210} anchor="middle" size={9}>Today</Key>

      {/* contractual */}
      <Key x={20} y={44} size={10} weight={700} fill={INK}>Contractual</Key>
      <line x1={x0} y1={50} x2={X(8)} y2={50} stroke={INK} strokeWidth={1.25} />
      {pay.map((m, i) => (
        <rect key={i} x={r2(X(m) - 6)} y={38} width={12} height={8} rx={1} fill={PAPER} stroke={INK} strokeWidth={1.1} />
      ))}
      <line x1={X(8)} y1={30} x2={X(8)} y2={60} stroke={SIGNAL} strokeWidth={2.5} />
      <Key x={r2(X(8) + 10)} y={46} size={9.5} fill={SIGNAL} weight={700}>Cancelled: end observed</Key>

      <line x1={20} y1={76} x2={660} y2={76} stroke={RULE} strokeWidth={1} />

      {/* noncontractual */}
      <Key x={20} y={116} size={10} weight={700} fill={INK}>Noncontractual</Key>
      {[
        { y: 130, buys: often, p: 15 },
        { y: 176, buys: seldom, p: 80 },
      ].map((row, ri) => {
        const last = row.buys[row.buys.length - 1];
        return (
          <g key={ri}>
            <line x1={x0} y1={row.y} x2={X(last)} y2={row.y} stroke={INK} strokeWidth={1.25} />
            <line x1={X(last)} y1={row.y} x2={r2(X(12) - 4)} y2={row.y} stroke={INK3} strokeWidth={1} strokeDasharray="2 3" />
            {row.buys.map((m, i) => (
              <BagMark key={i} x={X(m)} y={row.y - 3} s={13} />
            ))}
            <Key x={r2(X(12) + 8)} y={row.y - 6} size={9} fill={SIGNAL}>Still active?</Key>
            <Key x={r2(X(12) + 8)} y={row.y + 8} size={11} fill={SIGNAL} weight={700}>{`${row.p}%`}</Key>
          </g>
        );
      })}
      <path d={`M${r2(X(9) + 6)} 108v-6H${r2(X(12) - 6)}v6`} fill="none" stroke={INK3} strokeWidth={1} />
      <Key x={r2(X(12) - 10)} y={98} anchor="end" size={9}>No purchase for 3 months</Key>
    </Frame>
  );
}
/**
 * CLV against the retention rate (m = $100, d = 10%), and what each lever buys
 * from where the firm stands. Students drag the customer along the curve:
 * ten more points of retention add $183 at 80% (267 → 450) but only $37 at
 * 50%, while ten percent more margin always adds a tenth of CLV. Retention
 * pays more the higher it already is.
 */
export function RetentionLever() {
  const [r, setR] = useState(0.8);
  const m = 100;
  const d = 0.1;
  const cx0 = 66;
  const cx1 = 396;
  const base = 286;
  const X = (v: number) => r2(cx0 + ((v - 0.5) / 0.45) * (cx1 - cx0));
  const Y = (v: number) => r2(base - (v / 700) * 246);
  const curve = Array.from({ length: 46 }, (_, i) => 0.5 + i * 0.01)
    .map((v, i) => `${i ? "L" : "M"}${X(v)} ${Y(clvOf(m, v, d))}`)
    .join("");
  const now = clvOf(m, r, d);
  const up = clvOf(m, r + 0.1, d);
  const gains = [
    { key: "Margin +10%", sub: `$100 → $110`, v: now * 0.1, c: INK },
    { key: "Retention +10 points", sub: `${Math.round(r * 100)}% → ${Math.round(r * 100) + 10}%`, v: up - now, c: SIGNAL },
  ];
  const bx = 452;
  const B = (v: number) => r2((v / 340) * 196);
  const drag = dragHandlers((px) => setR(Math.min(0.85, Math.max(0.5, Math.round(((px - cx0) / (cx1 - cx0)) * 45 + 50) / 100))));
  return (
    <Frame
      width={680}
      height={330}
      label={`CLV against the retention rate, for a $100 margin and a 10% discount rate. At ${Math.round(r * 100)}% retention, CLV is ${usd(now)}. Raising the margin by 10% adds ${usd(now * 0.1)}. Raising retention by ten points adds ${usd(up - now)}`}
      svgProps={{ style: { touchAction: "none" } }}
    >
      {/* axes */}
      <line x1={cx0} y1={base} x2={cx1 + 14} y2={base} stroke={INK} strokeWidth={1.25} />
      <path d={head.right(cx1 + 14, base, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
      <line x1={cx0} y1={base} x2={cx0} y2={26} stroke={INK} strokeWidth={1.25} />
      <path d={head.up(cx0, 26, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
      <Key x={cx0 + 8} y={30} size={10}>CLV</Key>
      <Key x={cx1 + 14} y={base + 30} anchor="end" size={10}>Retention rate</Key>
      {[0.5, 0.6, 0.7, 0.8, 0.9].map((v) => (
        <g key={v}>
          <line x1={X(v)} y1={base} x2={X(v)} y2={base + 4} stroke={INK} strokeWidth={1.25} />
          <Key x={X(v)} y={base + 16} anchor="middle" size={9.5}>{`${Math.round(v * 100)}%`}</Key>
        </g>
      ))}
      {[200, 400, 600].map((v) => (
        <g key={v}>
          <line x1={cx0 - 4} y1={Y(v)} x2={cx0} y2={Y(v)} stroke={INK} strokeWidth={1.25} />
          <Key x={cx0 - 8} y={r2(Y(v) + 3.5)} anchor="end" size={9.5}>{`$${v}`}</Key>
        </g>
      ))}
      <path d={curve} fill="none" stroke={INK} strokeWidth={1.75} />

      {/* the step of ten points */}
      <path d={`M${X(r)} ${Y(now)}H${X(r + 0.1)}V${Y(up)}`} fill="none" stroke={SIGNAL} strokeWidth={1.5} strokeDasharray="4 3" />
      <circle cx={X(r + 0.1)} cy={Y(up)} r={4} fill={SIGNAL} />
      <Key x={r2(X(r + 0.1) + 10)} y={r2((Y(now) + Y(up)) / 2 + 4)} size={10.5} fill={SIGNAL} weight={700}>{`+${usd(up - now)}`}</Key>
      <line x1={X(r)} y1={Y(now)} x2={X(r)} y2={base} stroke={INK3} strokeWidth={1} strokeDasharray="2 3" />

      {/* the customer, dragged along the curve */}
      <g {...drag} style={{ cursor: "ew-resize" }}>
        <rect x={cx0} y={20} width={cx1 - cx0} height={base - 20} fill="transparent" />
        <circle cx={X(r)} cy={Y(now)} r={11} fill={PAPER} stroke={INK} strokeWidth={1.5} />
        <path d={`M${r2(X(r) - 6)} ${Y(now)}H${r2(X(r) + 6)}${head.left(r2(X(r) - 6), Y(now), 4)}${head.right(r2(X(r) + 6), Y(now), 4)}`} fill="none" stroke={INK} strokeWidth={1.4} />
      </g>
      <Key x={r2(X(r) - 16)} y={r2(Y(now) - 4)} anchor="end" size={10.5} weight={700} fill={INK}>{usd(now)}</Key>

      {/* what each lever adds */}
      <Key x={bx} y={70} size={10}>What each lever adds</Key>
      {gains.map((g, i) => {
        const y = 112 + i * 84;
        return (
          <g key={g.key}>
            <Key x={bx} y={y} size={9.5} fill={g.c} weight={700}>{g.key}</Key>
            <Key x={bx} y={y + 14} size={9} fill={INK3}>{g.sub}</Key>
            <rect x={bx} y={y + 24} width={Math.max(2, B(g.v))} height={20} fill={g.c} />
            <Key x={r2(bx + Math.max(2, B(g.v)) + 8)} y={y + 38} size={11} fill={g.c} weight={700}>{`+${usd(g.v)}`}</Key>
          </g>
        );
      })}
      <Key x={660} y={324} anchor="end" size={9} fill={INK3}>{"m = $100 | d = 10%"}</Key>
    </Frame>
  );
}
/* --------------------------------------------------------------------------
   RFM Analysis
   -------------------------------------------------------------------------- */

/**
 * Twenty customers' purchases over the last twelve months, as [month, dollars]
 * with month 12 = today, and whether each responded to the next offer
 * (simulated, seed 2509: response falls steeply with time since purchase).
 */
const RFM_CUSTOMERS: { p: [number, number][]; resp: boolean }[] = [
  { p: [[0.3, 37], [0.6, 22], [0.9, 83], [1.2, 83], [3, 49], [3.3, 127], [4.6, 32], [9.8, 47], [11, 54]], resp: true },
  { p: [[3.4, 32]], resp: false },
  { p: [[0.4, 35], [1, 73], [2.5, 75], [2.9, 33], [3.3, 29], [3.7, 91]], resp: false },
  { p: [[3.5, 24], [3.9, 115]], resp: false },
  { p: [[0.3, 133], [0.6, 31], [0.9, 33], [1.3, 24]], resp: false },
  { p: [[3.2, 65]], resp: false },
  { p: [[0.2, 112], [6.2, 53], [6.6, 26], [7.1, 121], [9.1, 70], [9.9, 114]], resp: true },
  { p: [[1.5, 98], [3.1, 21]], resp: false },
  { p: [[6, 127]], resp: false },
  { p: [[3.8, 20], [9.3, 22]], resp: false },
  { p: [[0.4, 58], [0.7, 134]], resp: false },
  { p: [[4.8, 23]], resp: false },
  { p: [[0.8, 55], [1.2, 22], [1.6, 54], [4.9, 42], [5.3, 82], [5.9, 76]], resp: false },
  { p: [[6.6, 41]], resp: false },
  { p: [[4.9, 90], [5.3, 117]], resp: true },
  { p: [[0.3, 44], [4.8, 104], [11.8, 138]], resp: true },
  { p: [[4.1, 41], [7.7, 38], [10.9, 48], [11.4, 46]], resp: true },
  { p: [[10.3, 50]], resp: true },
  { p: [[2.7, 93], [11.4, 27]], resp: true },
  { p: [[5.3, 57]], resp: false },
];

type Rfm = "R" | "F" | "M";

/** Quintile scores 1 to 5 for one measure: the top four customers score 5. */
function quintileScores(values: number[], higherIsBetter: boolean) {
  const order = values.map((_, i) => i).sort((a, b) => (higherIsBetter ? values[b] - values[a] : values[a] - values[b]) || a - b);
  const score = new Array<number>(values.length);
  order.forEach((i, rank) => {
    score[i] = 5 - Math.floor(rank / 4);
  });
  return { order, score };
}

const RFM_STATS = (() => {
  const rec = RFM_CUSTOMERS.map((c) => 12 - Math.max(...c.p.map((q) => q[0])));
  const freq = RFM_CUSTOMERS.map((c) => c.p.length);
  const mon = RFM_CUSTOMERS.map((c) => c.p.reduce((a, q) => a + q[1], 0));
  return { R: quintileScores(rec, false), F: quintileScores(freq, true), M: quintileScores(mon, true) };
})();

/**
 * Re-rank the customer base: twenty purchase histories, scored 1 to 5 on
 * recency, frequency and monetary value. Students rank the rows by one
 * measure. The ticks show who responded to the next offer, and each
 * quintile's count sits beside it. Ranked by recency, all four in the top
 * quintile responded and responses fall away below. Ranked by frequency or
 * monetary value they are spread across the list.
 */
export function RfmRanking() {
  const [by, setBy] = useState<Rfm>("R");
  const { order } = RFM_STATS[by];
  const tx0 = 54;
  const tx1 = 316;
  const X = (mo: number) => r2(tx0 + ((tx1 - tx0) * mo) / 12);
  const top = 50;
  const rh = 12.5;
  const gap = 8;
  const rowY = (rank: number) => r2(top + rank * rh + Math.floor(rank / 4) * gap);
  const scoreX = { R: 356, F: 386, M: 416 };
  const respX = 466;
  const counts = [0, 1, 2, 3, 4].map((q) => order.slice(q * 4, q * 4 + 4).filter((i) => RFM_CUSTOMERS[i].resp).length);
  const names = { R: "recency", F: "frequency", M: "monetary value" };
  return (
    <div>
      <Frame
        width={680}
        height={350}
        label={`Twenty customers ranked by ${names[by]} and grouped into quintiles. Customers who responded to the next offer, from the top quintile down: ${counts.join(", ")} of 4`}
      >
        <Key x={tx0} y={30} size={9.5}>Purchases, last 12 months</Key>
        <Key x={tx1} y={30} anchor="end" size={9.5}>Today</Key>
        {(["R", "F", "M"] as Rfm[]).map((k) => (
          <Key key={k} x={scoreX[k]} y={30} anchor="middle" size={11} weight={700} fill={k === by ? INK : INK3}>
            {k}
          </Key>
        ))}
        <Key x={respX} y={30} anchor="middle" size={9.5}>Responded</Key>
        <Key x={516} y={30} size={9.5}>Per quintile</Key>
        <line x1={tx1} y1={38} x2={tx1} y2={rowY(19) + 10} stroke={RULE2} strokeWidth={1} />
        {order.map((ci, rank) => {
          const c = RFM_CUSTOMERS[ci];
          const y = rowY(rank);
          return (
            <g key={ci} style={{ transform: `translateY(${y}px)`, transition: "transform 450ms ease" }}>
              <line x1={tx0} y1={0} x2={tx1} y2={0} stroke={RULE} strokeWidth={1} />
              {c.p.map(([mo, amt], j) => (
                <circle key={j} cx={X(mo)} cy={0} r={r2(1.4 + Math.sqrt(amt) * 0.3)} fill={INK} fillOpacity={0.85} stroke={PAPER} strokeWidth={0.8} />
              ))}
              {(["R", "F", "M"] as Rfm[]).map((k) => (
                <Key key={k} x={scoreX[k]} y={3.8} anchor="middle" size={10} weight={k === by ? 700 : 500} fill={k === by ? INK : INK3}>
                  {RFM_STATS[k].score[ci]}
                </Key>
              ))}
              <rect x={respX - 5} y={-5} width={10} height={10} fill={c.resp ? SIGNAL : PAPER} stroke={c.resp ? SIGNAL : RULE2} strokeWidth={1.2} />
              {c.resp ? (
                <path d={`M${respX - 3} 0.2L${respX - 0.7} 2.5L${respX + 3} -2.4`} fill="none" stroke={PAPER} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
              ) : null}
            </g>
          );
        })}
        {counts.map((n, q) => {
          const y0 = rowY(q * 4) - 6;
          const y1 = rowY(q * 4 + 3) + 6;
          return (
            <g key={q}>
              <path d={`M488 ${y0}h5V${y1}h-5`} fill="none" stroke={INK3} strokeWidth={1} />
              <rect x={516} y={r2((y0 + y1) / 2 - 8)} width={r2(n * 24)} height={16} fill={SIGNAL} />
              <rect x={516} y={r2((y0 + y1) / 2 - 8)} width={96} height={16} fill="none" stroke={RULE2} strokeWidth={1} />
              <Key x={620} y={r2((y0 + y1) / 2 + 4)} size={10.5} weight={700} fill={n ? SIGNAL : INK3}>{`${n} OF 4`}</Key>
            </g>
          );
        })}
      </Frame>
      <Segmented<Rfm>
        label="Rank customers by"
        options={[
          { id: "R", label: "Recency" },
          { id: "F", label: "Frequency" },
          { id: "M", label: "Monetary value" },
        ]}
        value={by}
        onChange={setBy}
      />
    </div>
  );
}
/**
 * Four RFM profiles drawn as the purchase histories that produce them, in a
 * grid of recency (rows) by frequency and monetary value (columns), each
 * with the action it calls for.
 */
export function RfmProfiles() {
  const cells = [
    { col: 1, row: 0, name: "Most valuable", s: [5, 5, 5], buys: [[0.6, 90], [1.8, 120], [3, 80], [4.1, 140], [5.4, 100], [6.5, 90], [7.7, 130], [8.8, 110], [10, 120], [11.1, 140]], act: "Reward" },
    { col: 1, row: 1, name: "At risk", s: [1, 5, 5], buys: [[0.4, 120], [1.2, 90], [2.1, 140], [2.9, 110], [3.8, 130], [4.6, 100], [5.5, 120]], act: "Contact" },
    { col: 0, row: 0, name: "New", s: [5, 1, 1], buys: [[11.2, 60]], act: "Develop" },
    { col: 0, row: 1, name: "Lapsed", s: [1, 1, 1], buys: [[1.5, 30]], act: "Limit spending" },
  ];
  const gx = [128, 404];
  const gy = [56, 196];
  const cw = 252;
  const ch = 124;
  return (
    <Frame
      width={680}
      height={340}
      label="Four RFM profiles drawn as twelve-month purchase histories. High recency with high frequency and spending: most valuable, reward. Low recency with high frequency and spending: at risk, contact. High recency with low frequency: new, develop. Low on all three: lapsed, limit spending"
    >
      <Key x={r2(gx[0] + cw / 2)} y={36} anchor="middle" size={10}>Low frequency and spending</Key>
      <Key x={r2(gx[1] + cw / 2)} y={36} anchor="middle" size={10}>High frequency and spending</Key>
      <Key x={110} y={r2(gy[0] + ch / 2 - 2)} anchor="end" size={10}>Recent</Key>
      <Key x={110} y={r2(gy[0] + ch / 2 + 12)} anchor="end" size={9} fill={INK3}>High R</Key>
      <Key x={110} y={r2(gy[1] + ch / 2 - 2)} anchor="end" size={10}>Not recent</Key>
      <Key x={110} y={r2(gy[1] + ch / 2 + 12)} anchor="end" size={9} fill={INK3}>Low R</Key>
      {cells.map((c) => {
        const x = gx[c.col];
        const y = gy[c.row];
        const t0 = x + 16;
        const t1 = x + cw - 16;
        const X = (mo: number) => r2(t0 + ((t1 - t0) * mo) / 12);
        const ty = y + 66;
        return (
          <g key={c.name}>
            <rect x={x} y={y} width={cw} height={ch} fill={PAPER} stroke={RULE2} strokeWidth={1} />
            <Key x={x + 16} y={y + 24} size={10.5} weight={700} fill={INK}>{c.name}</Key>
            <Key x={x + cw - 16} y={y + 24} anchor="end" size={10} fill={INK3}>{`R ${c.s[0]} | F ${c.s[1]} | M ${c.s[2]}`}</Key>
            <line x1={t0} y1={ty} x2={t1} y2={ty} stroke={RULE2} strokeWidth={1} />
            <line x1={t1} y1={ty - 9} x2={t1} y2={ty + 9} stroke={INK3} strokeWidth={1} />
            {c.buys.map(([mo, amt], j) => (
              <circle key={j} cx={X(mo)} cy={ty} r={r2(1.4 + Math.sqrt(amt) * 0.36)} fill={INK} fillOpacity={0.85} stroke={PAPER} strokeWidth={0.8} />
            ))}
            <Key x={t1} y={ty + 22} anchor="end" size={8.5} fill={INK3}>Today</Key>
            <path d={`M${x + 16} ${y + ch - 18}h14`} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
            <path d={head.right(x + 32, y + ch - 18, 6)} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
            <Key x={x + 40} y={y + ch - 14} size={10.5} weight={700} fill={SIGNAL}>{c.act}</Key>
          </g>
        );
      })}
    </Frame>
  );
}
/* --------------------------------------------------------------------------
   Churn and Response Models
   -------------------------------------------------------------------------- */

/**
 * Twelve subscribers ranked by their predicted probability of churning in
 * the next quarter (simulated). The four highest scores receive the
 * retention offer.
 */
export function ChurnRanking() {
  const probs = [72, 61, 48, 39, 27, 21, 16, 12, 9, 7, 5, 3];
  const x0 = 70;
  const step = 50;
  const base = 196;
  const k = 1.8;
  const reach = 4;
  return (
    <Frame
      width={680}
      height={290}
      label={`Twelve customers ranked by predicted probability of churning, from ${probs[0]}% to ${probs[11]}%. The four with the highest scores (${probs.slice(0, reach).join(", ")}%) receive the retention offer`}
    >
      <Key x={20} y={24} size={10}>Predicted probability of churning</Key>
      <line x1={x0 - 26} y1={base} x2={r2(x0 + 11 * step + 26)} y2={base} stroke={INK} strokeWidth={1.25} />
      {probs.map((p, i) => {
        const x = x0 + i * step;
        const on = i < reach;
        const c = on ? SIGNAL : INK;
        return (
          <g key={i}>
            <rect x={x - 11} y={r2(base - p * k)} width={22} height={r2(p * k)} fill={on ? SIGNAL : PAPER3} />
            <Key x={x} y={r2(base - p * k - 6)} anchor="middle" size={10} weight={700} fill={on ? SIGNAL : INK3}>{`${p}%`}</Key>
            <Person1 x={x} y={base + 44} k={0.95} stroke={c} fill={on ? SIGNAL : PAPER} width={1.3} />
          </g>
        );
      })}
      <path d={`M${x0 - 16} 252v6H${r2(x0 + (reach - 1) * step + 16)}v-6`} fill="none" stroke={SIGNAL} strokeWidth={1.25} />
      <Envelope x={r2(x0 + ((reach - 1) * step) / 2 - 46)} y={262} size={24} weight="regular" color={SIGNAL} />
      <Key x={r2(x0 + ((reach - 1) * step) / 2 - 16)} y={279} size={10} weight={700} fill={SIGNAL}>Retention offer</Key>
      <path d={`M${r2(x0 + reach * step - 16)} 252v6H${r2(x0 + 11 * step + 16)}v-6`} fill="none" stroke={INK3} strokeWidth={1} />
      <Key x={r2(x0 + ((reach + 11) * step) / 2)} y={279} anchor="middle" size={10} fill={INK3}>No offer</Key>
    </Frame>
  );
}
/* --------------------------------------------------------------------------
   Decision Trees
   -------------------------------------------------------------------------- */

type SplitVar = "contract" | "complaint" | "age";
type TreeNode = { n: number; churn: number; label: string };

/**
 * 1,000 subscribers, 100 of whom churned (simulated). For each candidate
 * first split: the two subgroups (the higher-churn one first), and that
 * subgroup's own split on "no use in 30 days".
 */
const SPLITS: Record<SplitVar, { name: string; kids: [TreeNode, TreeNode]; grand: [TreeNode, TreeNode] }> = {
  contract: {
    name: "Contract",
    kids: [
      { n: 400, churn: 80, label: "Monthly" },
      { n: 600, churn: 20, label: "Annual" },
    ],
    grand: [
      { n: 100, churn: 45, label: "No use in 30 days" },
      { n: 300, churn: 35, label: "Used" },
    ],
  },
  complaint: {
    name: "Complaint",
    kids: [
      { n: 100, churn: 25, label: "Complained" },
      { n: 900, churn: 75, label: "None" },
    ],
    grand: [
      { n: 30, churn: 14, label: "No use in 30 days" },
      { n: 70, churn: 11, label: "Used" },
    ],
  },
  age: {
    name: "Age",
    kids: [
      { n: 500, churn: 55, label: "Under 35" },
      { n: 500, churn: 45, label: "35 and over" },
    ],
    grand: [
      { n: 120, churn: 40, label: "No use in 30 days" },
      { n: 380, churn: 15, label: "Used" },
    ],
  },
};

const gini = (t: TreeNode) => {
  const p = t.churn / t.n;
  return 2 * p * (1 - p);
};
/** Fall in Gini impurity from the root (1,000 customers, 100 churners) to two subgroups. */
const separation = (kids: [TreeNode, TreeNode]) =>
  gini({ n: 1000, churn: 100, label: "" }) - kids.reduce((a, k) => a + (k.n / 1000) * gini(k), 0);

/**
 * Choose the first split: the tree's root holds 1,000 customers with 10%
 * churn, drawn as a bar whose churners are shaded. Students choose the first
 * variable. The subgroups' bars show how far churners are pulled into one
 * branch, the meter compares the three candidates, and contract wins. Under
 * the monthly branch, a second split on 30 days without use gives the rule
 * "monthly contract, no use in 30 days: 45% churn".
 */
export function FirstSplit() {
  const [v, setV] = useState<SplitVar>("contract");
  const s = SPLITS[v];
  const u = 0.24;
  const pos = { root: { x: 210, y: 46 }, kids: [{ x: 108, y: 150 }, { x: 330, y: 150 }], grand: [{ x: 72, y: 262 }, { x: 206, y: 262 }] };
  const sep = (Object.keys(SPLITS) as SplitVar[]).map((k) => ({ k, v: separation(SPLITS[k].kids) }));
  const best = sep.reduce((a, b) => (b.v > a.v ? b : a)).k;
  const node = (t: TreeNode, x: number, y: number, lit = false) => {
    const w = r2(t.n * u);
    const cw = r2(t.churn * u);
    const pct = Math.round((t.churn / t.n) * 100);
    return (
      <g>
        <rect x={r2(x - w / 2)} y={y} width={w} height={16} fill={PAPER3} />
        <rect x={r2(x - w / 2)} y={y} width={cw} height={16} fill={COUNTER} />
        <Key x={x} y={y + 32} anchor="middle" size={9.5} fill={INK3}>{`${t.n.toLocaleString("en-US")} customers`}</Key>
        <Key x={x} y={y + 46} anchor="middle" size={10.5} weight={700} fill={lit ? SIGNAL : INK}>{`${pct}% churn`}</Key>
      </g>
    );
  };
  const edge = (from: { x: number; y: number }, to: { x: number; y: number }, label: string, h = 16) => (
    <g>
      <path d={`M${from.x} ${from.y + 52}V${r2(from.y + 64)}H${to.x}V${to.y - 22}`} fill="none" stroke={INK3} strokeWidth={1} />
      <Key x={to.x} y={to.y - h + 6} anchor="middle" size={9.5} weight={700} fill={INK}>{label}</Key>
    </g>
  );
  return (
    <div>
      <Frame
        width={680}
        height={334}
        label={`A decision tree on 1,000 customers with 10% churn, first split on ${s.name.toLowerCase()}: ${s.kids[0].label.toLowerCase()} ${s.kids[0].n} customers, ${Math.round((s.kids[0].churn / s.kids[0].n) * 100)}% churn. ${s.kids[1].label.toLowerCase()} ${s.kids[1].n}, ${Math.round((s.kids[1].churn / s.kids[1].n) * 100)}% churn. Then no use in 30 days: ${Math.round((s.grand[0].churn / s.grand[0].n) * 100)}% churn. Contract separates churners best`}
      >
        {node({ n: 1000, churn: 100, label: "" }, pos.root.x, pos.root.y)}
        <Key x={r2(pos.root.x - 120)} y={pos.root.y - 7} size={9.5} weight={700} fill={COUNTER}>Churners</Key>
        <Key x={r2(pos.root.x + 120)} y={pos.root.y - 7} anchor="end" size={9.5} fill={INK3}>All customers</Key>
        {s.kids.map((t, i) => (
          <g key={`${v}-k${i}`}>
            {edge(pos.root, pos.kids[i], t.label)}
            {node(t, pos.kids[i].x, pos.kids[i].y)}
          </g>
        ))}
        {s.grand.map((t, i) => (
          <g key={`${v}-g${i}`}>
            {edge(pos.kids[0], pos.grand[i], t.label)}
            {node(t, pos.grand[i].x, pos.grand[i].y, i === 0 && v === "contract")}
          </g>
        ))}

        {/* the candidates compared */}
        <line x1={448} y1={20} x2={448} y2={316} stroke={RULE} strokeWidth={1} />
        <Key x={468} y={40} size={10}>How well the first</Key>
        <Key x={468} y={54} size={10}>split separates churners</Key>
        {sep.map((c, i) => {
          const y = 92 + i * 52;
          const on = c.k === v;
          const w = r2((c.v / 0.016) * 170);
          return (
            <g key={c.k}>
              <Key x={468} y={y} size={10} weight={on ? 700 : 500} fill={on ? INK : INK3}>{SPLITS[c.k].name}</Key>
              <rect x={468} y={y + 8} width={Math.max(2, w)} height={14} fill={c.k === best ? SIGNAL : on ? INK : PAPER3} />
              {c.k === best ? (
                <Key x={r2(468 + w + 8)} y={y + 19} size={9.5} weight={700} fill={SIGNAL}>Best</Key>
              ) : null}
            </g>
          );
        })}
      </Frame>
      <Segmented<SplitVar>
        label="First split on"
        options={[
          { id: "contract", label: "Contract" },
          { id: "complaint", label: "Complaint" },
          { id: "age", label: "Age" },
        ]}
        value={v}
        onChange={setV}
      />
    </div>
  );
}
/* --------------------------------------------------------------------------
   Ensemble Models
   -------------------------------------------------------------------------- */

const TREE_STEPS = [1, 2, 3, 5, 10, 20, 50, 100, 200];

/**
 * One customer's churn probability from each of 200 trees (simulated): each
 * tree, grown on its own random sample of customers and variables, gives a
 * leaf rate scattered widely around 0.38.
 */
const TREE_VOTES = (() => {
  const rnd = seeded(118);
  return Array.from({ length: 200 }, () => {
    const z = Math.sqrt(-2 * Math.log(1 - rnd())) * Math.cos(2 * Math.PI * rnd());
    return Math.min(0.96, Math.max(0.02, Math.round((0.38 + 0.19 * z) * 50) / 50));
  });
})();

/** Holdout error rate of a forest of n trees (simulated): falls fast, then flattens. */
const forestError = (n: number) => 0.19 + 0.09 / n ** 0.6;

/**
 * Grow the forest: above, each tree's prediction for one customer as a dot,
 * and the forest's average in --signal. Below, the forest's error on holdout
 * customers. Students add trees: a single tree's answer could be anything
 * from 10% to 70%, the average settles near 38%, and the holdout error falls
 * quickly and then flattens, so the gains from more trees taper.
 */
export function ForestAverage() {
  const [step, setStep] = useState(5);
  const n = TREE_STEPS[step];
  const votes = TREE_VOTES.slice(0, n);
  const mean = votes.reduce((a, b) => a + b, 0) / n;
  const ax0 = 60;
  const ax1 = 640;
  const X = (p: number) => r2(ax0 + p * (ax1 - ax0));
  const base = 146;
  const stack = new Map<number, number>();
  const dots = votes.map((p) => {
    const h = stack.get(p) ?? 0;
    stack.set(p, h + 1);
    return { x: X(p), y: r2(base - 5 - h * 4.6) };
  });
  const ex0 = 90;
  const ex1 = 640;
  const L = (t: number) => r2(ex0 + (Math.log(t) / Math.log(200)) * (ex1 - ex0));
  const eb = 316;
  const E = (e: number) => r2(eb - ((e - 0.18) / 0.11) * 80);
  const curve = Array.from({ length: 60 }, (_, i) => Math.exp((i / 59) * Math.log(200)))
    .map((t, i) => `${i ? "L" : "M"}${L(t)} ${E(forestError(t))}`)
    .join("");
  return (
    <div>
      <Frame
        width={680}
        height={352}
        label={`A random forest of ${n} tree${n > 1 ? "s" : ""}: the trees' predictions for one customer's churn probability range from ${Math.round(Math.min(...votes) * 100)}% to ${Math.round(Math.max(...votes) * 100)}%, and their average is ${Math.round(mean * 100)}%. The forest's holdout error is ${(forestError(n) * 100).toFixed(1)}%, falling quickly with the first trees and then flattening`}
      >
        <Key x={20} y={22} size={10}>{"One customer’s predicted churn probability"}</Key>
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={2.1} fill={INK3} />
        ))}
        {(() => {
          const far = dots.reduce((a, d) => (Math.abs(d.x - X(mean)) > Math.abs(a.x - X(mean)) ? d : a));
          const right = far.x > X(mean) || far.x < 140;
          if (n === 1) return null;
          return (
            <g>
              <line x1={far.x} y1={r2(far.y - 5)} x2={far.x} y2={r2(far.y - 22)} stroke={INK3} strokeWidth={1} />
              <Key x={far.x} y={r2(far.y - 27)} anchor={right ? "start" : "end"} size={9.5} fill={INK3}>
                One tree
              </Key>
            </g>
          );
        })()}
        <line x1={ax0} y1={base} x2={ax1} y2={base} stroke={INK} strokeWidth={1.25} />
        {[0, 0.25, 0.5, 0.75, 1].map((p) => (
          <g key={p}>
            <line x1={X(p)} y1={base} x2={X(p)} y2={base + 4} stroke={INK} strokeWidth={1.25} />
            <Key x={X(p)} y={base + 16} anchor="middle" size={9.5}>{`${p * 100}%`}</Key>
          </g>
        ))}
        <line x1={X(mean)} y1={46} x2={X(mean)} y2={base} stroke={SIGNAL} strokeWidth={2} />
        <Key x={X(mean)} y={40} anchor="middle" size={10.5} weight={700} fill={SIGNAL}>{n === 1 ? `One tree: ${Math.round(mean * 100)}%` : `Average of ${n} trees: ${Math.round(mean * 100)}%`}</Key>

        <line x1={20} y1={188} x2={660} y2={188} stroke={RULE} strokeWidth={1} />
        <Key x={20} y={208} size={10}>Holdout error</Key>
        <line x1={ex0} y1={eb} x2={ex1} y2={eb} stroke={INK} strokeWidth={1.25} />
        <line x1={ex0} y1={eb} x2={ex0} y2={218} stroke={INK} strokeWidth={1.25} />
        {[0.2, 0.25].map((e) => (
          <g key={e}>
            <line x1={ex0 - 4} y1={E(e)} x2={ex0} y2={E(e)} stroke={INK} strokeWidth={1.25} />
            <Key x={ex0 - 8} y={r2(E(e) + 3.5)} anchor="end" size={9.5}>{`${e * 100}%`}</Key>
          </g>
        ))}
        {TREE_STEPS.map((t) => (
          <g key={t}>
            <line x1={L(t)} y1={eb} x2={L(t)} y2={eb + 4} stroke={INK} strokeWidth={1.25} />
            <Key x={L(t)} y={eb + 16} anchor="middle" size={9}>{t}</Key>
          </g>
        ))}
        <Key x={ex1} y={eb + 32} anchor="end" size={9.5}>Trees</Key>
        <path d={curve} fill="none" stroke={INK} strokeWidth={1.5} />
        <circle cx={L(n)} cy={E(forestError(n))} r={5} fill={SIGNAL} />
        <Key x={r2(L(n) + (n >= 100 ? -10 : 10))} y={r2(E(forestError(n)) - 10)} anchor={n >= 100 ? "end" : "start"} size={10.5} weight={700} fill={SIGNAL}>
          {`${(forestError(n) * 100).toFixed(1)}%`}
        </Key>
      </Frame>
      <Slider label={`Trees in the forest: ${n}`} value={step} min={0} max={TREE_STEPS.length - 1} onChange={setStep} showValue={false} />
    </div>
  );
}
/* --------------------------------------------------------------------------
   Training and Holdout Data
   -------------------------------------------------------------------------- */

/**
 * Three ways to hold data out: a random split of customers, five folds that
 * take turns as the holdout (cross-validation), and a split in time, with
 * the model estimated on earlier months and evaluated on later ones. The
 * holdout is --signal throughout.
 */
export function DataSplits() {
  const rnd = seeded(41);
  const held = Array.from({ length: 30 }, () => rnd() < 0.3);
  const x0 = 150;
  const x1 = 540;
  const cell = (x1 - x0) / 30;
  const fw = (x1 - x0 - 40) / 5;
  return (
    <Frame
      width={560}
      height={268}
      label="Three ways to divide the data. A random split: most customers form the training sample and about three in ten the holdout sample. Cross-validation: five folds, each taking a turn as the holdout, with the five results averaged. A split in time: the model is estimated on the earlier months and evaluated on the later months"
    >
      {/* random split */}
      <Key x={20} y={36} size={10} weight={700} fill={INK}>Random split</Key>
      {held.map((h, i) => (
        <Person1 key={i} x={r2(x0 + i * cell + cell / 2)} y={42} k={0.5} width={1} stroke={h ? SIGNAL : INK3} fill={h ? SIGNAL : PAPER} />
      ))}
      <Key x={x0} y={58} size={9.5} fill={INK3}>Training</Key>
      <Key x={x1} y={58} anchor="end" size={9.5} fill={SIGNAL} weight={700}>Holdout</Key>

      <line x1={20} y1={72} x2={540} y2={72} stroke={RULE} strokeWidth={1} />

      {/* cross-validation */}
      <Key x={20} y={100} size={10} weight={700} fill={INK}>Cross-</Key>
      <Key x={20} y={114} size={10} weight={700} fill={INK}>Validation</Key>
      {[0, 1, 2, 3, 4].map((run) => (
        <g key={run}>
          {[0, 1, 2, 3, 4].map((f) => (
            <rect key={f} x={r2(x0 + f * fw + 1)} y={86 + run * 16} width={r2(fw - 2)} height={12} fill={f === run ? SIGNAL : INK3} />
          ))}
        </g>
      ))}
      <path d={`M${r2(x1 - 30)} 86h8V${86 + 4 * 16 + 12}h-8`} fill="none" stroke={INK3} strokeWidth={1} />
      <Key x={x1} y={r2(86 + 2 * 16 + 10)} anchor="end" size={9.5} fill={INK3}>Avg</Key>

      <line x1={20} y1={180} x2={540} y2={180} stroke={RULE} strokeWidth={1} />

      {/* split in time */}
      <Key x={20} y={214} size={10} weight={700} fill={INK}>Over time</Key>
      {Array.from({ length: 12 }, (_, m) => {
        const w = (x1 - x0) / 12;
        const later = m >= 9;
        return <rect key={m} x={r2(x0 + m * w + 1)} y={200} width={r2(w - 2)} height={18} fill={later ? SIGNAL : INK3} />;
      })}
      <Key x={x0} y={236} size={9.5} fill={INK3}>Earlier months: estimate</Key>
      <Key x={x1} y={236} anchor="end" size={9.5} fill={SIGNAL} weight={700}>Later: evaluate</Key>
      <line x1={x0} y1={250} x2={x1} y2={250} stroke={INK} strokeWidth={1.25} />
      <path d={head.right(x1, 250, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
      <Key x={x1} y={264} anchor="end" size={9} fill={INK3}>Time</Key>
    </Frame>
  );
}
/**
 * Leakage: a churner's record over time, with the date on which the model
 * must predict. Usage records before that date are available. The request
 * for a cancellation form comes after it. Students add the request to the
 * model's variables: holdout accuracy jumps from 74% to 96%, while the
 * accuracy the model can achieve at the time of prediction stays at 74%.
 */
export function LeakageCheck() {
  const [vars, setVars] = useState<"form"[]>([]);
  const leak = vars.includes("form");
  const t0 = 40;
  const t1 = 520;
  const pd = 330;
  const acc = [
    { key: "On holdout data", v: leak ? 96 : 74 },
    { key: "In practice", v: 74 },
  ];
  const B = (v: number) => r2((v / 100) * 330);
  return (
    <div>
      <Frame
        width={560}
        height={290}
        label={`One churner's record over time: usage records before the date of prediction, and a request for a cancellation form after it. ${
          leak ? "With the request among the model's variables" : "Without the request"
        }, accuracy on holdout data is ${acc[0].v}% and accuracy in practice is 74%`}
      >
        {/* the record */}
        <line x1={t0} y1={92} x2={t1} y2={92} stroke={INK} strokeWidth={1.25} />
        <path d={head.right(t1, 92, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
        <Key x={t1} y={110} anchor="end" size={9} fill={INK3}>Time</Key>
        {[60, 100, 140, 180, 220, 260, 296].map((x, i) => (
          <rect key={x} x={x - 4} y={r2(92 - (26 - i * 3))} width={8} height={r2(26 - i * 3)} fill={INK3} />
        ))}
        <Key x={60} y={110} size={9} fill={INK3}>Usage</Key>
        <line x1={pd} y1={22} x2={pd} y2={118} stroke={SIGNAL} strokeWidth={2} />
        <Key x={r2(pd - 6)} y={30} anchor="end" size={9.5} weight={700} fill={SIGNAL}>Date of prediction</Key>
        <FileText x={392} y={58} size={28} weight="regular" color={leak ? COUNTER : INK} />
        <Key x={406} y={110} anchor="middle" size={9} fill={leak ? COUNTER : INK3}>Form request</Key>
        <path d={`M470 92v-22`} fill="none" stroke={INK} strokeWidth={1.5} />
        <Key x={470} y={60} anchor="middle" size={9.5} weight={700} fill={INK}>Churns</Key>
        {/* what the model is given */}
        <path
          d={`M${t0 + 4} 132v6H${leak ? 424 : pd - 6}v-6`}
          fill="none"
          stroke={leak ? COUNTER : INK3}
          strokeWidth={1.25}
        />
        <Key x={t0 + 4} y={154} size={9.5} fill={leak ? COUNTER : INK3} weight={leak ? 700 : 600}>
          {leak ? "Model's variables: include information from after the date" : "Model's variables"}
        </Key>

        <line x1={20} y1={174} x2={540} y2={174} stroke={RULE} strokeWidth={1} />
        <Key x={20} y={198} size={10}>Accuracy</Key>
        {acc.map((a, i) => {
          const y = 214 + i * 34;
          const c = i === 0 && leak ? COUNTER : INK;
          return (
            <g key={a.key}>
              <Key x={150} y={y + 15} anchor="end" size={9.5} fill={INK2}>{a.key}</Key>
              <rect x={160} y={y} width={B(100)} height={20} fill="none" stroke={RULE2} strokeWidth={1} />
              <rect x={160} y={y} width={B(a.v)} height={20} fill={c} />
              <Key x={r2(160 + B(a.v) - 8)} y={y + 14.5} anchor="end" size={10.5} weight={700} fill={PAPER}>{`${a.v}%`}</Key>
            </g>
          );
        })}
      </Frame>
      <Toggles<"form">
        label="Model's variables"
        options={[{ id: "form", label: "Cancellation-form request" }]}
        value={vars}
        onChange={setVars}
        allowNone
      />
    </div>
  );
}
/* --------------------------------------------------------------------------
   The Confusion Matrix
   -------------------------------------------------------------------------- */

/**
 * 1,000 holdout customers ranked by predicted churn probability (simulated):
 * the cumulative number of churners among the top k is 100 × (1 − (1 − k/1000)^5.64),
 * so the top 150 hold 60 of the 100 churners, and the probabilities follow
 * the local churn rate, scaled so that exactly 150 customers score 25% or more.
 */
const RANKED = (() => {
  const a = Math.log(0.4) / Math.log(0.85);
  const C = (k: number) => 100 * (1 - (1 - k / 1000) ** a);
  const c = 0.25 / (1 - 150 / 1000) ** (a - 1);
  return Array.from({ length: 1000 }, (_, i) => {
    const k = i + 1;
    return { p: c * (1 - (k - 0.5) / 1000) ** (a - 1), churn: Math.floor(C(k) + 1e-9) > Math.floor(C(k - 1) + 1e-9) };
  });
})();
const CUM_CHURN = RANKED.reduce<number[]>((acc, r, i) => {
  acc.push((i ? acc[i - 1] : 0) + (r.churn ? 1 : 0));
  return acc;
}, []);

/**
 * Move the threshold: the curve shows each holdout customer's predicted
 * probability, ranked from highest to lowest, with the churners marked
 * beneath. Students drag the threshold line. Everyone above it is predicted
 * to churn, and the confusion matrix, precision, recall and accuracy follow.
 * At 25% it reproduces the example (150 flagged, 60 churners: precision 40%,
 * recall 60%). Above the highest score no one is flagged, accuracy is 90%
 * and recall is zero.
 */
export function ThresholdMatrix() {
  const [t, setT] = useState(25);
  const flagged = RANKED.filter((r) => r.p * 100 >= t - 1e-9).length;
  const tp = flagged ? CUM_CHURN[flagged - 1] : 0;
  const fp = flagged - tp;
  const fn = 100 - tp;
  const tn = 900 - fp;
  const precision = flagged ? tp / flagged : 0;
  const recall = tp / 100;
  const accuracy = (tp + tn) / 1000;
  const x0 = 60;
  const x1 = 640;
  const RX = (k: number) => r2(x0 + (k / 1000) * (x1 - x0));
  const pTop = 0.56;
  const yb = 136;
  const PY = (p: number) => r2(yb - (p / pTop) * 108);
  const curve = RANKED.filter((_, i) => i % 10 === 0 || i === 999)
    .map((r, i) => `${i ? "L" : "M"}${RX(RANKED.indexOf(r) + 0.5)} ${PY(r.p)}`)
    .join("");
  const drag = dragHandlers((_, py) => setT(Math.min(56, Math.max(2, Math.round(((yb - py) / 108) * pTop * 100)))));
  const cut = RX(flagged);
  const pct = (v: number) => `${Math.round(v * 100)}%`;
  const cells = [
    { k: "True positives", v: tp, x: 0, y: 0, lit: true },
    { k: "False negatives", v: fn, x: 1, y: 0 },
    { k: "False positives", v: fp, x: 0, y: 1 },
    { k: "True negatives", v: tn, x: 1, y: 1 },
  ];
  const mx = 152;
  const my = 222;
  const cw = 132;
  const ch = 50;
  const metrics = [
    { k: "Precision", v: precision, sub: `${tp} OF ${flagged}`, c: SIGNAL },
    { k: "Recall", v: recall, sub: `${tp} OF 100`, c: SIGNAL },
    { k: "Accuracy", v: accuracy, sub: `${tp + tn} OF 1,000`, c: INK },
  ];
  return (
    <Frame
      width={680}
      height={340}
      label={`Holdout customers ranked by predicted churn probability, with a threshold of ${t}%: ${flagged} customers predicted to churn. True positives ${tp}, false positives ${fp}, false negatives ${fn}, true negatives ${tn}. Precision ${pct(precision)}, recall ${pct(recall)}, accuracy ${pct(accuracy)}`}
      svgProps={{ style: { touchAction: "none" } }}
    >
      <Key x={20} y={18} size={10}>Predicted probability of churning</Key>
      <rect x={x0} y={24} width={r2(cut - x0)} height={r2(yb - 24)} fill={SIGNAL_TINT} />
      <line x1={x0} y1={yb} x2={x1} y2={yb} stroke={INK} strokeWidth={1.25} />
      <line x1={x0} y1={yb} x2={x0} y2={24} stroke={INK} strokeWidth={1.25} />
      {[0, 0.25, 0.5].map((p) => (
        <g key={p}>
          <line x1={x0 - 4} y1={PY(p)} x2={x0} y2={PY(p)} stroke={INK} strokeWidth={1.25} />
          <Key x={x0 - 8} y={r2(PY(p) + 3.5)} anchor="end" size={9.5}>{`${p * 100}%`}</Key>
        </g>
      ))}
      <path d={curve} fill="none" stroke={INK} strokeWidth={1.5} />
      {/* churners, in rank order */}
      {RANKED.map((r, i) => (r.churn ? <line key={i} x1={RX(i + 0.5)} y1={yb + 6} x2={RX(i + 0.5)} y2={yb + 18} stroke={COUNTER} strokeWidth={1} /> : null))}
      <Key x={x1} y={yb + 32} anchor="end" size={9} fill={COUNTER}>Churners, by rank</Key>
      <line x1={cut} y1={24} x2={cut} y2={yb + 22} stroke={SIGNAL} strokeWidth={1} strokeDasharray="3 3" />
      <Key x={r2(Math.max(cut, x0 + 4) + 6)} y={38} size={9.5} weight={700} fill={SIGNAL}>{flagged ? `${flagged} predicted to churn` : "None predicted to churn"}</Key>
      {/* the threshold, dragged up and down */}
      <g {...drag} style={{ cursor: "ns-resize" }}>
        <rect x={x0} y={20} width={x1 - x0} height={r2(yb - 20)} fill="transparent" />
        <line x1={x0} y1={PY(t / 100)} x2={x1} y2={PY(t / 100)} stroke={SIGNAL} strokeWidth={2} />
        <circle cx={x1 - 12} cy={PY(t / 100)} r={10} fill={PAPER} stroke={SIGNAL} strokeWidth={1.5} />
        <path d={`M${x1 - 12} ${r2(PY(t / 100) - 6)}V${r2(PY(t / 100) + 6)}${head.up(x1 - 12, r2(PY(t / 100) - 6), 4)}${head.down(x1 - 12, r2(PY(t / 100) + 6), 4)}`} fill="none" stroke={SIGNAL} strokeWidth={1.4} />
      </g>
      <Key x={x1 - 28} y={r2(PY(t / 100) + (PY(t / 100) < 60 ? 17 : -6))} anchor="end" size={10.5} weight={700} fill={SIGNAL}>{`Threshold ${t}%`}</Key>

      {/* the confusion matrix */}
      <Key x={r2(mx + cw / 2)} y={my - 10} anchor="middle" size={9.5}>Predicted churn</Key>
      <Key x={r2(mx + cw * 1.5)} y={my - 10} anchor="middle" size={9.5}>Predicted stay</Key>
      <Key x={mx - 10} y={r2(my + ch / 2 + 4)} anchor="end" size={9.5}>Actual churn</Key>
      <Key x={mx - 10} y={r2(my + ch * 1.5 + 4)} anchor="end" size={9.5}>Actual stay</Key>
      {cells.map((c) => (
        <g key={c.k}>
          <rect x={mx + c.x * cw} y={my + c.y * ch} width={cw} height={ch} fill={PAPER} stroke={RULE2} strokeWidth={1} />
          <Key x={r2(mx + c.x * cw + cw / 2)} y={my + c.y * ch + 18} anchor="middle" size={8.5} fill={INK3}>{c.k}</Key>
          <Display x={r2(mx + c.x * cw + cw / 2)} y={my + c.y * ch + 41} anchor="middle" size={20} fill={c.lit ? SIGNAL : INK}>
            {c.v.toLocaleString("en-US")}
          </Display>
        </g>
      ))}
      {/* the measures */}
      {metrics.map((m, i) => {
        const y = 222 + i * 40;
        const bx = 528;
        return (
          <g key={m.k}>
            <Key x={430} y={y + 10} size={9.5} weight={700} fill={m.c}>{m.k}</Key>
            <Key x={430} y={y + 23} size={8.5} fill={INK3}>{m.sub}</Key>
            <rect x={bx} y={y} width={90} height={16} fill="none" stroke={RULE2} strokeWidth={1} />
            <rect x={bx} y={y} width={r2(m.v * 90)} height={16} fill={m.c} />
            <Key x={bx + 96} y={y + 12.5} size={10.5} weight={700} fill={m.c}>{m.k === "Precision" && !flagged ? "n/a" : pct(m.v)}</Key>
          </g>
        );
      })}
    </Frame>
  );
}
/* --------------------------------------------------------------------------
   Lift
   -------------------------------------------------------------------------- */

/** Share of all churners in each decile of 10,000 customers ranked by a churn model (simulated). */
const DECILE_SHARE = [35, 20, 14, 10, 7, 5, 4, 2.5, 1.5, 1];
/** Expected benefit of contacting one churner, and the cost of contacting one customer. */
const SAVE_VALUE = 80;
const CONTACT_COST = 10;

/**
 * Target deeper: 10,000 customers (1,000 churners) ranked by a churn model.
 * Left, the gains chart: the cumulative share of churners captured as
 * deciles are targeted, against the diagonal of random contact. Right, each
 * decile's lift and its expected benefit ($80 per churner reached) against
 * its cost ($10 per customer contacted). Students extend the campaign one
 * decile at a time: the net benefit grows through the third decile, the
 * last whose benefit exceeds its cost, and shrinks after it.
 */
export function GainsChart() {
  const [depth, setDepth] = useState(1);
  const cum = DECILE_SHARE.reduce<number[]>((acc, v, i) => {
    acc.push((i ? acc[i - 1] : 0) + v);
    return acc;
  }, []);
  const benefit = DECILE_SHARE.map((s) => (s / 100) * 1000 * SAVE_VALUE);
  const cost = 1000 * CONTACT_COST;
  const net = benefit.slice(0, depth).reduce((a, b) => a + b - cost, 0);
  const gx0 = 62;
  const gx1 = 282;
  const gy0 = 276;
  const gy1 = 56;
  const GX = (p: number) => r2(gx0 + (p / 100) * (gx1 - gx0));
  const GY = (p: number) => r2(gy0 - (p / 100) * (gy0 - gy1));
  const pts = [0, ...cum].map((v, i) => `${i ? "L" : "M"}${GX(i * 10)} ${GY(v)}`).join("");
  const bx0 = 372;
  const bw = 26;
  const bstep = 29;
  const bb = 238;
  const BY = (v: number) => r2(bb - (v / 30000) * 170);
  const signed = (v: number) => `${v < 0 ? "−" : "+"}${usd(Math.abs(v))}`;
  return (
    <div>
      <Frame
        width={680}
        height={334}
        label={`Gains chart and lift for 10,000 customers ranked by a churn model. Targeting the top ${depth} decile${depth > 1 ? "s" : ""} (${depth * 10}% of customers) captures ${cum[depth - 1]}% of churners. The top decile's lift is 3.5. Each decile costs $10,000 to contact. The expected benefit exceeds the cost through the third decile. Net expected benefit of this campaign: ${signed(net)}`}
      >
        {/* gains chart */}
        <Key x={20} y={26} size={10}>Gains chart</Key>
        <rect x={gx0} y={gy1} width={r2(GX(depth * 10) - gx0)} height={gy0 - gy1} fill={SIGNAL_TINT} />
        <line x1={gx0} y1={gy0} x2={gx1} y2={gy1} stroke={INK3} strokeWidth={1} strokeDasharray="3 3" />
        <Key x={r2(GX(30))} y={r2(GY(19))} size={9} fill={INK3}>Random</Key>
        <path d={pts} fill="none" stroke={INK} strokeWidth={1.5} />
        {cum.map((v, i) => (
          <circle key={i} cx={GX((i + 1) * 10)} cy={GY(v)} r={i < depth ? 4 : 3} fill={i < depth ? SIGNAL : INK} />
        ))}
        <Key x={r2(GX(depth * 10) + (depth > 7 ? -8 : 8))} y={r2(GY(cum[depth - 1]) + (depth > 7 ? 18 : 16))} anchor={depth > 7 ? "end" : "start"} size={10.5} weight={700} fill={SIGNAL}>
          {`${Math.round(cum[depth - 1])}% of churners`}
        </Key>
        <line x1={gx0} y1={gy0} x2={gx1} y2={gy0} stroke={INK} strokeWidth={1.25} />
        <line x1={gx0} y1={gy0} x2={gx0} y2={gy1} stroke={INK} strokeWidth={1.25} />
        {[0, 50, 100].map((p) => (
          <g key={p}>
            <Key x={GX(p)} y={gy0 + 16} anchor="middle" size={9.5}>{`${p}%`}</Key>
            <Key x={gx0 - 8} y={r2(GY(p) + 3.5)} anchor="end" size={9.5}>{`${p}%`}</Key>
          </g>
        ))}
        <Key x={gx1} y={gy0 + 32} anchor="end" size={9.5}>Customers targeted</Key>
        <Key x={gx0 + 6} y={gy1 - 8} size={9.5}>Churners captured</Key>

        <line x1={326} y1={20} x2={326} y2={312} stroke={RULE} strokeWidth={1} />

        {/* each decile: lift, benefit and cost */}
        <Key x={346} y={26} size={10}>Each decile: benefit against cost</Key>
        {benefit.map((b, i) => {
          const x = bx0 + i * bstep;
          const on = i < depth;
          const pays = b > cost;
          return (
            <g key={i}>
              <rect x={x} y={BY(b)} width={bw} height={r2(bb - BY(b))} fill={on ? (pays ? SIGNAL : COUNTER) : PAPER3} />
              {i === 0 ? (
                <Key x={x} y={r2(BY(b) - 6)} size={9} weight={700} fill={on ? SIGNAL : INK3}>{`${usd(b)} benefit`}</Key>
              ) : null}
              <Key x={r2(x + bw / 2)} y={bb + 32} anchor="middle" size={9} weight={700} fill={on ? (pays ? SIGNAL : COUNTER) : INK3}>
                {String(+(DECILE_SHARE[i] / 10).toFixed(2))}
              </Key>
              <Key x={r2(x + bw / 2)} y={bb + 15} anchor="middle" size={9}>{i + 1}</Key>
            </g>
          );
        })}
        <Key x={bx0 - 12} y={bb + 15} anchor="end" size={9}>Decile</Key>
        <Key x={bx0 - 12} y={bb + 32} anchor="end" size={9} weight={700} fill={INK}>Lift</Key>
        <line x1={bx0 - 6} y1={BY(cost)} x2={r2(bx0 + 10 * bstep)} y2={BY(cost)} stroke={INK} strokeWidth={1.25} strokeDasharray="5 3" />
        <Key x={r2(bx0 + 10 * bstep)} y={r2(BY(cost) - 6)} anchor="end" size={9} fill={INK}>{`Cost ${usd(cost)}`}</Key>
        <line x1={bx0 - 6} y1={bb} x2={r2(bx0 + 10 * bstep)} y2={bb} stroke={INK} strokeWidth={1.25} />
        <Key x={346} y={bb + 66} size={10} weight={700} fill={INK}>Net expected benefit</Key>
        <Display x={r2(bx0 + 10 * bstep)} y={bb + 72} anchor="end" size={22} fill={net >= 0 ? SIGNAL : COUNTER}>
          {signed(net)}
        </Display>
      </Frame>
      <Slider label={`Deciles contacted: ${depth}`} value={depth} min={1} max={10} onChange={setDepth} showValue={false} />
    </div>
  );
}
/* --------------------------------------------------------------------------
   Predicting Churn and Preventing Churn
   -------------------------------------------------------------------------- */

type Target = "all" | "churn" | "uplift";

/**
 * Forty customers sorted by what they would do without and with a retention
 * call (simulated): 7 persuadables, 20 sure things, 8 lost causes and 5
 * sleeping dogs. `churn` and `uplift` are how many of each group the top 10
 * by churn score and the top 10 by estimated uplift contain.
 */
const UPLIFT_GROUPS = [
  { key: "Persuadables", n: 7, col: 0, row: 0, effect: 1, pick: { all: 7, churn: 4, uplift: 7 } },
  { key: "Sure things", n: 20, col: 1, row: 0, effect: 0, pick: { all: 20, churn: 0, uplift: 3 } },
  { key: "Lost causes", n: 8, col: 0, row: 1, effect: 0, pick: { all: 8, churn: 6, uplift: 0 } },
  { key: "Sleeping dogs", n: 5, col: 1, row: 1, effect: -1, pick: { all: 5, churn: 0, uplift: 0 } },
];

/**
 * Whom to call: forty customers in four cells, by whether they would leave
 * without a retention call (columns) and with it (rows). Students choose
 * whom to call. Calling everyone keeps 7 but loses the 5 sleeping dogs. The
 * ten highest churn scores fall among those who would leave anyway, half of
 * them lost causes. The ten highest uplift estimates reach every persuadable.
 */
export function UpliftTargeting() {
  const [by, setBy] = useState<Target>("churn");
  const gx = [150, 404];
  const gy = [58, 172];
  const cw = 240;
  const ch = 100;
  const called = UPLIFT_GROUPS.reduce((a, g) => a + g.pick[by], 0);
  const kept = UPLIFT_GROUPS.filter((g) => g.effect > 0).reduce((a, g) => a + g.pick[by], 0);
  const lost = UPLIFT_GROUPS.filter((g) => g.effect < 0).reduce((a, g) => a + g.pick[by], 0);
  const wasted = called - kept - lost;
  const net = kept - lost;
  return (
    <div>
      <Frame
        width={680}
        height={350}
        label={`Forty customers by what they would do without and with a retention call: 7 persuadables, 20 sure things, 8 lost causes, 5 sleeping dogs. ${
          by === "all" ? "Calling everyone" : by === "churn" ? "Calling the ten highest churn scores" : "Calling the ten highest uplift estimates"
        }: ${called} calls, ${kept} customers kept by the call, ${lost} lost because of it, ${wasted} calls with no effect. Net ${net >= 0 ? "+" : "−"}${Math.abs(net)}`}
      >
        <Key x={r2(gx[0] + cw)} y={20} anchor="middle" size={9.5} fill={INK3}>Without a call, the customer</Key>
        <Key x={r2(gx[0] + cw / 2)} y={42} anchor="middle" size={10} weight={700} fill={INK}>Leaves</Key>
        <Key x={r2(gx[1] + cw / 2)} y={42} anchor="middle" size={10} weight={700} fill={INK}>Stays</Key>
        <Key x={20} y={r2(gy[0] + ch / 2 - 18)} size={9.5} fill={INK3}>With a call,</Key>
        <Key x={20} y={r2(gy[0] + ch / 2 - 4)} size={9.5} fill={INK3}>The customer</Key>
        <Key x={20} y={r2(gy[0] + ch / 2 + 14)} size={10} weight={700} fill={INK}>Stays</Key>
        <Key x={20} y={r2(gy[1] + ch / 2 + 4)} size={10} weight={700} fill={INK}>Leaves</Key>
        {UPLIFT_GROUPS.map((g) => {
          const x = gx[g.col];
          const y = gy[g.row];
          const tone = g.effect > 0 ? SIGNAL : g.effect < 0 ? COUNTER : INK3;
          const per = 10;
          return (
            <g key={g.key}>
              <rect x={x} y={y} width={cw} height={ch} fill={PAPER} stroke={g.effect ? tone : RULE2} strokeWidth={g.effect ? 1.5 : 1} />
              <Key x={x + 12} y={y + 20} size={10} weight={700} fill={g.effect ? tone : INK2}>{g.key}</Key>
              {Array.from({ length: g.n }, (_, j) => {
                const on = j < g.pick[by];
                return (
                  <Person1
                    key={j}
                    x={r2(x + 22 + (j % per) * 22)}
                    y={r2(y + 58 + Math.floor(j / per) * 34)}
                    k={0.72}
                    width={1.2}
                    stroke={on ? (g.effect ? tone : INK) : INK3}
                    fill={on ? (g.effect ? tone : INK) : PAPER}
                  />
                );
              })}
            </g>
          );
        })}
        <Key x={20} y={302} size={9.5} fill={INK3}>Filled: called</Key>
        {[
          { k: "Calls", v: `${called}`, c: INK },
          { k: "Kept by the call", v: `+${kept}`, c: SIGNAL },
          { k: "Lost because of it", v: lost ? `−${lost}` : "0", c: COUNTER },
          { k: "No effect", v: `${wasted}`, c: INK3 },
        ].map((m, i) => (
          <g key={m.k}>
            <Key x={r2(150 + i * 127)} y={302} size={9} fill={m.c}>{m.k}</Key>
            <Display x={r2(150 + i * 127)} y={330} size={24} fill={m.c}>{m.v}</Display>
          </g>
        ))}
      </Frame>
      <Segmented<Target>
        label="Call"
        options={[
          { id: "all", label: "Everyone" },
          { id: "churn", label: "Top 10 churn scores" },
          { id: "uplift", label: "Top 10 uplift" },
        ]}
        value={by}
        onChange={setBy}
      />
    </div>
  );
}
/* --------------------------------------------------------------------------
   Recommendation Systems
   -------------------------------------------------------------------------- */

type Method = "content" | "collab";

/** Nine products with one attribute each. The bicycle is new and has no purchases yet. */
const PRODUCTS: { icon: Icon; name: string; tag: string; isNew?: boolean }[] = [
  { icon: Sneaker, name: "running shoes", tag: "Sport" },
  { icon: Watch, name: "sports watch", tag: "Sport" },
  { icon: Bicycle, name: "bicycle", tag: "Sport", isNew: true },
  { icon: Tent, name: "tent", tag: "Camping" },
  { icon: Backpack, name: "backpack", tag: "Camping" },
  { icon: Headphones, name: "headphones", tag: "Audio" },
  { icon: Coffee, name: "coffee", tag: "Kitchen" },
  { icon: CookingPot, name: "cooking pot", tag: "Kitchen" },
  { icon: Book, name: "book", tag: "Reading" },
];

/** Who bought what (product indexes). The last customer is new. */
const BOUGHT: { id: string; items: number[] }[] = [
  { id: "A", items: [0, 1, 5] },
  { id: "B", items: [0, 3, 4, 5] },
  { id: "C", items: [6, 8] },
  { id: "D", items: [0, 1, 3] },
  { id: "E", items: [6, 7, 5] },
  { id: "New", items: [] },
];

/** Up to two recommendations, and for collaborative filtering the similar customers. */
function recommend(ci: number, method: Method) {
  const mine = BOUGHT[ci].items;
  const free = PRODUCTS.map((_, i) => i).filter((i) => !mine.includes(i));
  if (method === "content") {
    const tags = new Set(mine.map((i) => PRODUCTS[i].tag));
    return { recs: free.filter((i) => tags.has(PRODUCTS[i].tag)).slice(0, 2), peers: [] as number[] };
  }
  const peers = BOUGHT.map((b, j) => ({ j, s: j === ci ? 0 : b.items.filter((i) => mine.includes(i)).length })).filter((p) => p.s > 0);
  const score = free.map((i) => ({ i, s: peers.reduce((a, p) => a + (BOUGHT[p.j].items.includes(i) ? p.s : 0), 0) }));
  const recs = score
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s || a.i - b.i)
    .slice(0, 2)
    .map((x) => x.i);
  return { recs, peers: peers.map((p) => p.j) };
}

/**
 * Two ways to recommend: a purchase matrix of six customers and nine
 * products, each product with one attribute. Students pick a customer and a
 * method. Content-based recommendation finds unbought products with the
 * same attribute as the customer's purchases (for D: the bicycle and the
 * backpack). Collaborative filtering finds what customers with overlapping
 * purchases bought (for D, from A and B: the headphones and the backpack).
 * The new bicycle never appears through collaborative filtering, and the new
 * customer gets nothing from either: the cold-start problem.
 */
export function Recommender() {
  const [ci, setCi] = useState(3);
  const [method, setMethod] = useState<Method>("collab");
  const { recs, peers } = recommend(ci, method);
  const px0 = 136;
  const pstep = 58;
  const PX = (i: number) => px0 + i * pstep;
  const ry0 = 112;
  const rh = 34;
  const RY = (j: number) => ry0 + j * rh;
  const buyers = PRODUCTS.map((_, i) => BOUGHT.filter((b) => b.items.includes(i)).length);
  const me = BOUGHT[ci];
  const recText = recs.length ? recs.map((i) => PRODUCTS[i].name).join(" and ") : "nothing";
  const why =
    me.items.length === 0
      ? "No purchase history: nothing to recommend"
      : recs.length === 0
        ? "No unbought product shares an attribute"
        : method === "content"
          ? `Same attribute as what ${me.id} bought`
          : `Bought by customers like ${me.id}: ${peers.map((j) => BOUGHT[j].id).join(", ")}`;
  return (
    <div>
      <Frame
        width={680}
        height={372}
        label={`A purchase matrix of six customers and nine products. For customer ${me.id}, ${
          method === "content" ? "content-based recommendation" : "collaborative filtering"
        } recommends ${recText}. ${why.charAt(0) + why.slice(1).toLowerCase()}. The new bicycle has no purchases and the new customer has no history`}
      >
        {PRODUCTS.map((p, i) => {
          const Ic = p.icon;
          const rec = recs.includes(i);
          return (
            <g key={i}>
              {p.isNew ? <Key x={PX(i)} y={18} anchor="middle" size={9} weight={700} fill={INK}>New</Key> : null}
              <Ic x={PX(i) - 15} y={26} size={30} weight="regular" color={rec ? SIGNAL : INK} />
              <Key x={PX(i)} y={76} anchor="middle" size={8.5} fill={INK3}>{p.tag}</Key>
            </g>
          );
        })}
        <Key x={20} y={60} size={8.5} fill={INK3}>Pick a customer</Key>
        <line x1={20} y1={88} x2={660} y2={88} stroke={INK} strokeWidth={1.25} />
        {BOUGHT.map((b, j) => {
          const y = RY(j);
          const sel = j === ci;
          const peer = peers.includes(j);
          return (
            <g key={b.id} onClick={() => setCi(j)} style={{ cursor: "pointer" }}>
              <rect x={14} y={y - 16} width={652} height={rh - 2} fill={sel ? SIGNAL_TINT : peer ? PAPER3 : "transparent"} />
              <Person1 x={34} y={y + 12} k={0.7} width={1.2} stroke={sel ? SIGNAL : INK} fill={sel ? SIGNAL : PAPER} />
              <Key x={52} y={y + 4} size={10} weight={700} fill={sel ? SIGNAL : INK}>{b.id}</Key>
              {PRODUCTS.map((_, i) => {
                const has = b.items.includes(i);
                const rec = sel && recs.includes(i);
                return (
                  <g key={i}>
                    {has ? <circle cx={PX(i)} cy={y} r={6} fill={sel ? SIGNAL : INK} /> : <circle cx={PX(i)} cy={y} r={2} fill={RULE2} />}
                    {rec ? <circle cx={PX(i)} cy={y} r={10} fill="none" stroke={SIGNAL} strokeWidth={2} strokeDasharray="3 2" /> : null}
                  </g>
                );
              })}
            </g>
          );
        })}
        <line x1={20} y1={r2(RY(5) + 20)} x2={660} y2={r2(RY(5) + 20)} stroke={INK} strokeWidth={1.25} />
        <Key x={20} y={r2(RY(5) + 40)} size={9}>Buyers</Key>
        {buyers.map((n, i) => (
          <Key key={i} x={PX(i)} y={r2(RY(5) + 40)} anchor="middle" size={10} weight={700} fill={n ? INK : COUNTER}>{n}</Key>
        ))}
        <circle cx={28} cy={r2(RY(5) + 60)} r={7} fill="none" stroke={SIGNAL} strokeWidth={2} strokeDasharray="3 2" />
        <Key x={42} y={r2(RY(5) + 64)} size={10} weight={700} fill={SIGNAL}>{recs.length ? `Recommended for ${me.id}` : `Nothing for ${me.id}`}</Key>
        <Key x={r2(42 + ((recs.length ? `Recommended for ${me.id}` : `Nothing for ${me.id}`).length + 2) * 7.6)} y={r2(RY(5) + 64)} size={9.5} fill={INK2}>{why}</Key>
      </Frame>
      <Segmented<Method>
        label="Method"
        options={[
          { id: "content", label: "Content-based" },
          { id: "collab", label: "Collaborative filtering" },
        ]}
        value={method}
        onChange={setMethod}
      />
    </div>
  );
}
/* --------------------------------------------------------------------------
   Algorithmic Bias
   -------------------------------------------------------------------------- */

/**
 * The model's estimated response rate for each group after t retrainings
 * (simulated). Both groups truly respond at 20%. The first model, trained on
 * old data, puts group A at 22% and group B at 14%, below the 18% offer
 * threshold. A group's estimate moves toward the truth only through
 * responses to offers it receives.
 */
const estA = (t: number) => 20 + 2 * 0.5 ** t;
const estB = (t: number, explore: boolean) => {
  if (!explore) return 14;
  let e = 14;
  for (let i = 0; i < t; i++) e += (20 - e) * (e >= 18 ? 0.5 : 0.25);
  return e;
};

/**
 * Retrain and watch: each press retrains the model on the responses the last
 * round of offers produced. Group A, above the threshold, receives offers,
 * and its estimate settles at the true 20%. Group B never receives an offer,
 * so it never produces evidence, and its estimate stays at 14% however often
 * the model is retrained. Adding a few random offers to every group lets B's
 * estimate recover.
 */
export function FeedbackLoop() {
  const [t, setT] = useState(5);
  const [explore, setExplore] = useState<"random"[]>([]);
  const ex = explore.includes("random");
  const rounds = 5;
  const x0 = 70;
  const x1 = 420;
  const X = (r: number) => r2(x0 + (r / rounds) * (x1 - x0));
  const y0 = 252;
  const Y = (v: number) => r2(y0 - ((v - 10) / 15) * 200);
  const a = Array.from({ length: t + 1 }, (_, r) => estA(r));
  const b = Array.from({ length: t + 1 }, (_, r) => estB(r, ex));
  const path = (vals: number[]) => vals.map((v, r) => `${r ? "L" : "M"}${X(r)} ${Y(v)}`).join("");
  const offersB = b.slice(0, t).filter((v) => v >= 18).length;
  return (
    <div>
      <Frame
        width={680}
        height={292}
        label={`The model's estimated response rate for two groups over ${t} retraining${t === 1 ? "" : "s"}. Both truly respond at 20%. Group A starts at 22%, above the 18% offer threshold, and settles at ${a[t].toFixed(1)}%. Group B starts at 14% and ${
          ex ? `, with random offers, reaches ${b[t].toFixed(1)}%` : "never receives an offer, so its estimate stays at 14%"
        }`}
      >
        <Key x={20} y={22} size={10}>Estimated response rate</Key>
        {[10, 15, 20, 25].map((v) => (
          <g key={v}>
            <line x1={x0 - 4} y1={Y(v)} x2={x0} y2={Y(v)} stroke={INK} strokeWidth={1.25} />
            <Key x={x0 - 8} y={r2(Y(v) + 3.5)} anchor="end" size={9.5}>{`${v}%`}</Key>
          </g>
        ))}
        <line x1={x0} y1={y0} x2={x1 + 10} y2={y0} stroke={INK} strokeWidth={1.25} />
        <line x1={x0} y1={y0} x2={x0} y2={Y(25)} stroke={INK} strokeWidth={1.25} />
        {Array.from({ length: rounds + 1 }, (_, r) => (
          <Key key={r} x={X(r)} y={y0 + 16} anchor="middle" size={9.5} fill={r <= t ? INK : RULE2}>{r}</Key>
        ))}
        <Key x={x1 + 10} y={y0 + 32} anchor="end" size={9.5}>Retrainings</Key>
        <line x1={x0} y1={Y(20)} x2={x1 + 10} y2={Y(20)} stroke={INK3} strokeWidth={1} strokeDasharray="1.5 3" />
        <Key x={x0 + 8} y={r2(Y(20) + 13)} size={9} fill={INK3}>True rate, both groups</Key>
        <line x1={x0} y1={Y(18)} x2={x1 + 10} y2={Y(18)} stroke={SIGNAL} strokeWidth={1.25} strokeDasharray="5 3" />
        <Key x={x0 + 8} y={r2(Y(18) + 14)} size={9} weight={700} fill={SIGNAL}>Offer threshold</Key>
        <rect x={x0 + 1} y={Y(25)} width={r2(x1 + 9 - x0)} height={r2(Y(18) - Y(25))} fill={SIGNAL_TINT} />
        <Key x={x0 + 8} y={r2(Y(25) + 14)} size={9} fill={SIGNAL}>Receives offers</Key>

        <path d={path(a)} fill="none" stroke={INK} strokeWidth={2} />
        <path d={path(b)} fill="none" stroke={COUNTER} strokeWidth={2} />
        {a.map((v, r) => <circle key={`a${r}`} cx={X(r)} cy={Y(v)} r={3.5} fill={INK} />)}
        {b.map((v, r) => <circle key={`b${r}`} cx={X(r)} cy={Y(v)} r={3.5} fill={COUNTER} />)}
        <Key x={r2(X(t) + 10)} y={r2(Y(a[t]) - 8)} size={10} weight={700} fill={INK}>{`Group A ${a[t].toFixed(1)}%`}</Key>
        <Key x={r2(X(t) + 10)} y={r2(Y(b[t]) + 16)} size={10} weight={700} fill={COUNTER}>{`Group B ${b[t].toFixed(1)}%`}</Key>

        {/* evidence the model has gathered */}
        <Key x={516} y={196} size={9.5}>Offers sent so far</Key>
        {[
          { k: "A", n: t, c: INK },
          { k: "B", n: ex ? t : offersB, c: COUNTER },
        ].map((g, i) => (
          <g key={g.k}>
            <Person1 x={526} y={r2(234 + i * 30)} k={0.6} width={1.1} stroke={g.c} fill={g.c} />
            <Key x={540} y={r2(228 + i * 30)} size={9.5} weight={700} fill={g.c}>{g.k}</Key>
            {Array.from({ length: rounds }, (_, r) => (
              <Envelope key={r} x={r2(556 + r * 20)} y={r2(214 + i * 30)} size={18} weight="regular" color={r < g.n ? g.c : RULE2} />
            ))}
          </g>
        ))}
      </Frame>
      <div className="mt-2 flex flex-wrap items-center gap-3 px-1">
        <PlateButton onClick={() => setT((v) => (v >= rounds ? 0 : v + 1))}>{t >= rounds ? "Start over" : "Retrain the model"}</PlateButton>
        <Toggles<"random">
          label="Also"
          options={[{ id: "random", label: "Random offers to every group" }]}
          value={explore}
          onChange={(v) => {
            setExplore(v);
            setT(0);
          }}
          allowNone
        />
      </div>
    </div>
  );
}
/* --------------------------------------------------------------------------
   Fairness Criteria
   -------------------------------------------------------------------------- */

const FAIR_GRID = Array.from({ length: 200 }, (_, i) => (i + 0.5) / 200);
/** A calibrated score distribution: Beta(a, b) weights on the grid, summing to 1. */
function betaWeights(a: number, b: number) {
  const w = FAIR_GRID.map((x) => Math.exp((a - 1) * Math.log(x) + (b - 1) * Math.log(1 - x)));
  const s = w.reduce((p, q) => p + q, 0);
  return w.map((v) => v / s);
}
/** Group A responds at 32% on average, group B at 20% (simulated, calibrated scores). */
const FAIR_A = betaWeights(2, 4.3);
const FAIR_B = betaWeights(1.5, 6);
const FAIR_T = 0.4;

/** Offer rate and the share of would-be responders who receive the offer, with scores shifted by `shift`. */
function fairRates(w: number[], shift: number) {
  const base = w.reduce((s, v, i) => s + v * FAIR_GRID[i], 0);
  let offer = 0;
  let tp = 0;
  w.forEach((v, i) => {
    if (FAIR_GRID[i] + shift >= FAIR_T) {
      offer += v;
      tp += v * FAIR_GRID[i];
    }
  });
  return { offer: offer * 100, tpr: (tp / base) * 100 };
}

/**
 * Three criteria, one model: calibrated scores for two groups whose true
 * response rates differ (32% and 20%), and one rule, an offer to everyone
 * scoring 40% or more. Students raise group B's scores. At zero the model is
 * calibrated but B receives fewer offers (parity fails) and fewer of B's
 * would-be responders are reached (equal opportunity fails). About +12
 * points equalizes the share of responders reached and about +15 the offer
 * rates, but by then B's scores overstate its actual rate. No setting meets
 * all three.
 */
export function FairnessThresholds() {
  const [shift, setShift] = useState(0);
  const a = fairRates(FAIR_A, 0);
  const b = fairRates(FAIR_B, shift / 100);
  const crit = [
    { k: "Demographic parity", sub: "Offer rate", av: a.offer, bv: b.offer, ok: Math.abs(a.offer - b.offer) <= 1.5 },
    { k: "Equal opportunity", sub: "Responders who get the offer", av: a.tpr, bv: b.tpr, ok: Math.abs(a.tpr - b.tpr) <= 1.5 },
    { k: "Calibration", sub: "Predicted minus actual rate", av: 0, bv: shift, ok: shift === 0, pts: true },
  ];
  const met = crit.filter((c) => c.ok).length;
  const hx0 = 40;
  const hx1 = 360;
  const HX = (p: number) => r2(hx0 + Math.min(1, p) * (hx1 - hx0));
  const hist = (w: number[], s: number) => {
    const bins = new Array<number>(20).fill(0);
    w.forEach((v, i) => {
      bins[Math.min(19, Math.floor((FAIR_GRID[i] + s) * 20))] += v;
    });
    return bins;
  };
  const panels = [
    { k: "Group A", base: 32, bins: hist(FAIR_A, 0), y: 140, c: INK },
    { k: "Group B", base: 20, bins: hist(FAIR_B, shift / 100), y: 278, c: COUNTER },
  ];
  const pc = (v: number) => `${Math.round(v)}%`;
  return (
    <div>
      <Frame
        width={680}
        height={318}
        label={`Calibrated scores for two groups with true response rates of 32% (A) and 20% (B). An offer goes to every score of 40% or more. Group B's scores raised by ${shift} points. Offer rate: A ${pc(a.offer)}, B ${pc(b.offer)}. Responders who get the offer: A ${pc(a.tpr)}, B ${pc(b.tpr)}. Criteria met: ${met} of 3`}
      >
        {panels.map((p) => (
          <g key={p.k}>
            <Key x={hx0} y={p.y - 96} size={10} weight={700} fill={p.c}>{p.k}</Key>
            <Key x={hx0} y={p.y - 82} size={9} fill={INK3}>{`Responds at ${p.base}%`}</Key>
            {p.bins.map((v, i) => {
              const h = r2(v * 420);
              const lo = i / 20;
              const on = lo >= FAIR_T - 1e-9;
              return <rect key={i} x={r2(HX(lo) + 0.6)} y={r2(p.y - h)} width={r2((hx1 - hx0) / 20 - 1.2)} height={h} fill={on ? p.c : PAPER3} />;
            })}
            <line x1={hx0} y1={p.y} x2={hx1} y2={p.y} stroke={INK} strokeWidth={1.25} />
            {[0, 0.5, 1].map((v) => (
              <Key key={v} x={HX(v)} y={p.y + 14} anchor="middle" size={9}>{`${v * 100}%`}</Key>
            ))}
          </g>
        ))}
        <line x1={HX(FAIR_T)} y1={24} x2={HX(FAIR_T)} y2={282} stroke={SIGNAL} strokeWidth={1.5} strokeDasharray="4 3" />
        <Key x={r2(HX(FAIR_T) + 6)} y={20} size={9} weight={700} fill={SIGNAL}>Offer at 40% or more</Key>
        <Key x={hx1} y={312} anchor="end" size={9} fill={INK3}>{shift ? `Predicted probability (B raised +${shift})` : "Predicted probability"}</Key>

        <line x1={384} y1={20} x2={384} y2={304} stroke={RULE} strokeWidth={1} />
        {crit.map((c, i) => {
          const y = 38 + i * 80;
          return (
            <g key={c.k}>
              <Key x={404} y={y} size={10} weight={700} fill={INK}>{c.k}</Key>
              <Key x={404} y={y + 15} size={8.5} fill={INK3}>{c.sub}</Key>
              <Key x={404} y={y + 40} size={10.5} weight={700} fill={INK}>{c.pts ? "A  0" : `A ${pc(c.av)}`}</Key>
              <Key x={474} y={y + 40} size={10.5} weight={700} fill={COUNTER}>{c.pts ? `B ${c.bv ? `+${c.bv}` : "0"}` : `B ${pc(c.bv)}`}</Key>
              <circle cx={640} cy={y + 24} r={11} fill={c.ok ? SIGNAL : PAPER} stroke={c.ok ? SIGNAL : RULE2} strokeWidth={1.25} />
              {c.ok ? (
                <path d={`M634 ${y + 24}l4 4l8 -8`} fill="none" stroke={PAPER} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <path d={`M636 ${y + 20}l8 8M644 ${y + 20}l-8 8`} fill="none" stroke={INK3} strokeWidth={1.5} strokeLinecap="round" />
              )}
            </g>
          );
        })}
        <line x1={404} y1={268} x2={660} y2={268} stroke={RULE} strokeWidth={1} />
        <Key x={404} y={292} size={10} weight={700} fill={INK}>Criteria met</Key>
        <Display x={660} y={296} anchor="end" size={24} fill={INK}>{`${met} of 3`}</Display>
      </Frame>
      <Slider label={`Raise group B's scores: +${shift} points`} value={shift} min={0} max={20} onChange={setShift} showValue={false} />
    </div>
  );
}
/* --------------------------------------------------------------------------
   Explaining Model Decisions
   -------------------------------------------------------------------------- */

/** Average size of each variable's contribution across all customers, in points (simulated). */
const GLOBAL_IMPORTANCE = [
  { k: "Purchases, last 90 days", v: 9.1 },
  { k: "Account balance", v: 6.4 },
  { k: "Tenure", v: 4.2 },
  { k: "Support calls", v: 2.7 },
  { k: "Email opens", v: 1.6 },
];
const OFFER_BASE = 30;
const OFFER_CUT = 40;
/** The balance's contribution for this customer, in points: −8 at $800, 0 at $1,200. */
const balanceShap = (b: number) => (b - 1200) / 50;

/**
 * Global, local and counterfactual: left, how much each variable moves the
 * model's predictions on average. Right, why the model gave one customer a
 * 35% probability of responding, below the 40% needed for an offer, as
 * contributions added to the average prediction of 30%. Students raise the
 * customer's account balance: at $1,050 the prediction reaches 40% and the
 * customer qualifies, the smallest change of balance that flips the decision.
 */
export function ExplainOffer() {
  const [bal, setBal] = useState(800);
  const parts = [
    { k: "Purchases", v: 12 },
    { k: "Balance", v: balanceShap(bal), lit: true },
    { k: "Tenure", v: 5 },
    { k: "Support calls", v: -4 },
  ];
  const starts = parts.reduce<number[]>((acc, p, i) => {
    acc.push(i ? acc[i - 1] + parts[i - 1].v : OFFER_BASE);
    return acc;
  }, []);
  const pred = OFFER_BASE + parts.reduce((a, p) => a + p.v, 0);
  const qualifies = pred >= OFFER_CUT - 1e-9;
  const lx0 = 410;
  const lx1 = 590;
  const LX = (v: number) => r2(lx0 + ((v - 20) / 40) * (lx1 - lx0));
  const rowY = (i: number) => 66 + i * 34;
  const signed = (v: number) => `${v < 0 ? "−" : "+"}${Math.abs(Math.round(v))}`;
  const cfBalance = 1200 + 50 * (OFFER_CUT - (pred - balanceShap(bal)));
  return (
    <div>
      <Frame
        width={680}
        height={318}
        label={`Global explanation: average contribution of each variable, purchases in the last 90 days 9.1 points, account balance 6.4, tenure 4.2, support calls 2.7, email opens 1.6. Local explanation for one customer with an account balance of ${usd(bal)}: average prediction 30%, purchases +12, balance ${signed(parts[1].v)}, tenure +5, support calls −4, prediction ${Math.round(pred)}%. ${
          qualifies ? "the customer qualifies for the offer" : "below the 40% needed for an offer"
        }. Counterfactual: a balance of ${usd(cfBalance)} or more would qualify the customer`}
      >
        {/* global */}
        <Key x={20} y={26} size={10} weight={700} fill={INK}>Global</Key>
        <Key x={20} y={41} size={9} fill={INK3}>All customers</Key>
        {GLOBAL_IMPORTANCE.map((g, i) => {
          const y = 70 + i * 40;
          return (
            <g key={g.k}>
              <Key x={20} y={y} size={9} fill={INK2}>{g.k}</Key>
              <rect x={20} y={y + 7} width={r2(g.v * 22)} height={13} fill={INK} />
              <Key x={r2(26 + g.v * 22)} y={y + 17.5} size={9.5} weight={700}>{g.v.toFixed(1)}</Key>
            </g>
          );
        })}
        <Key x={20} y={290} size={9} fill={INK3}>Average contribution, points</Key>

        <line x1={262} y1={20} x2={262} y2={300} stroke={RULE} strokeWidth={1} />

        {/* local */}
        <Key x={282} y={26} size={10} weight={700} fill={INK}>Local</Key>
        <Key x={282} y={41} size={9} fill={INK3}>One customer</Key>
        <line x1={LX(OFFER_CUT)} y1={40} x2={LX(OFFER_CUT)} y2={rowY(5) + 20} stroke={SIGNAL} strokeWidth={1.25} strokeDasharray="4 3" />
        <Key x={r2(LX(OFFER_CUT) + 6)} y={40} size={9} weight={700} fill={SIGNAL}>Offer at 40%</Key>
        <Key x={282} y={rowY(0) + 4} size={9.5} fill={INK2}>Average</Key>
        <line x1={LX(OFFER_BASE)} y1={rowY(0) - 9} x2={LX(OFFER_BASE)} y2={rowY(0) + 9} stroke={INK} strokeWidth={2} />
        <Key x={r2(LX(OFFER_BASE) - 8)} y={rowY(0) + 4} anchor="end" size={9.5} weight={700}>30%</Key>
        {parts.map((p, i) => {
          const y = rowY(i + 1);
          const a = LX(starts[i]);
          const b = LX(starts[i] + p.v);
          const c = p.lit ? SIGNAL : p.v < 0 ? COUNTER : INK;
          return (
            <g key={p.k}>
              <Key x={282} y={y + 4} size={9.5} fill={p.lit ? SIGNAL : INK2} weight={p.lit ? 700 : 600}>{p.k}</Key>
              <line x1={a} y1={r2(rowY(i) + 9)} x2={a} y2={y - 8} stroke={RULE2} strokeWidth={1} />
              <rect x={Math.min(a, b)} y={y - 8} width={Math.max(1.5, r2(Math.abs(b - a)))} height={16} fill={c} />
              <Key x={660} y={y + 4} anchor="end" size={9.5} weight={700} fill={c}>{signed(p.v)}</Key>
            </g>
          );
        })}
        <Key x={282} y={rowY(5) + 4} size={9.5} weight={700} fill={INK}>Prediction</Key>
        <line x1={LX(starts[3] + parts[3].v)} y1={r2(rowY(4) + 9)} x2={LX(starts[3] + parts[3].v)} y2={rowY(5) - 9} stroke={RULE2} strokeWidth={1} />
        <line x1={LX(pred)} y1={rowY(5) - 9} x2={LX(pred)} y2={rowY(5) + 9} stroke={qualifies ? SIGNAL : INK} strokeWidth={3} />
        <Key x={660} y={rowY(5) + 4} anchor="end" size={10} weight={700} fill={qualifies ? SIGNAL : INK}>
          {`${Math.round(pred)}%: ${qualifies ? "Offer" : "No offer"}`}
        </Key>
        <line x1={lx0} y1={rowY(5) + 22} x2={lx1} y2={rowY(5) + 22} stroke={INK} strokeWidth={1.25} />
        {[20, 40, 60].map((v) => (
          <g key={v}>
            <line x1={LX(v)} y1={rowY(5) + 22} x2={LX(v)} y2={rowY(5) + 26} stroke={INK} strokeWidth={1.25} />
            <Key x={LX(v)} y={rowY(5) + 38} anchor="middle" size={9}>{`${v}%`}</Key>
          </g>
        ))}
        <Key x={282} y={292} size={9} fill={INK3}>{`Counterfactual: balance of ${usd(cfBalance)} or more qualifies`}</Key>
      </Frame>
      <Slider label={`This customer's account balance: ${usd(bal)}`} value={bal} min={400} max={1600} step={50} onChange={setBal} showValue={false} />
    </div>
  );
}
/* --------------------------------------------------------------------------
   Behavioral Evaluation Beyond Benchmarks
   -------------------------------------------------------------------------- */

type PairView = "score" | "noModel" | "pairing";

/**
 * Wadi, Ghodrat & Philp (2026), CETSCALE (17 to 119) in a fully crossed 5 × 4
 * design: grand mean and model and target main effects (Table 2), and the
 * model × target interactions (Figure 5).
 */
const COO_GRAND = 66.25;
const COO_MODELS = [
  { name: "Llama 3.3", home: "USA", effect: 0.31 },
  { name: "Gemma 3", home: "USA", effect: -11.99 },
  { name: "Qwen3", home: "China", effect: -14.63 },
  { name: "Aya Expanse", home: "Canada", effect: 21.19 },
  { name: "Ministral", home: "France", effect: 5.11 },
];
const COO_TARGETS = [
  { name: "USA", effect: 2.84, pair: [2.59, 3.21, -0.61, -1.18, -4.0] },
  { name: "Canada", effect: 4.62, pair: [5.2, 2.14, -0.57, -3.77, -2.99] },
  { name: "China", effect: -6.46, pair: [-4.29, -5.4, -0.2, 5.35, 4.54] },
  { name: "France", effect: -1.0, pair: [-3.5, 0.05, 1.39, -0.39, 2.45] },
];

/**
 * Separate the bias from the baseline (real data): each cell is one model's
 * expected consumer-ethnocentrism score when the statements concern one
 * country. Students strip the baselines away. The raw scores mostly show
 * which model is high or low everywhere (Aya Expanse ~87, Qwen3 ~52). After
 * removing each model's baseline, what remains is the target country's
 * effect plus the pairing. With both baselines removed, only the
 * country-of-origin interaction remains: the two U.S.-developed models rate
 * higher when the statements concern the USA and Canada and lower when they
 * concern China.
 */
export function CountryPairing() {
  const [view, setView] = useState<PairView>("score");
  const cx0 = 150;
  const cw = 102;
  const ry0 = 92;
  const rh = 46;
  const value = (mi: number, ti: number) => {
    const t = COO_TARGETS[ti];
    const m = COO_MODELS[mi];
    if (view === "score") return COO_GRAND + m.effect + t.effect + t.pair[mi];
    if (view === "noModel") return t.effect + t.pair[mi];
    return t.pair[mi];
  };
  const fill = (v: number) => {
    if (view === "score") {
      const a = r2(Math.min(1, Math.max(0, (v - 40) / 60)) * 0.85);
      return `rgba(21, 24, 29, ${a})`;
    }
    const a = r2(Math.min(1, Math.abs(v) / 12) * 0.75);
    return v >= 0 ? `rgba(44, 74, 140, ${a})` : `rgba(165, 98, 27, ${a})`;
  };
  const text = (v: number) => (view === "score" ? v.toFixed(1) : `${v >= 0 ? "+" : "−"}${Math.abs(v).toFixed(1)}`);
  const dark = (v: number) => (view === "score" ? v > 72 : Math.abs(v) > 6.5);
  const title = {
    score: "Expected CETSCALE score (17 to 119)",
    noModel: "Score minus the model’s baseline",
    pairing: "Pairing effect only: country-of-origin bias",
  }[view];
  return (
    <div>
      <Frame
        width={680}
        height={322}
        label={`Consumer-ethnocentrism (CETSCALE) of five language models when the statements concern the USA, Canada, China or France (Wadi, Ghodrat & Philp, 2026). View: ${title.toLowerCase()}. ${COO_TARGETS.map(
          (t, ti) => `${t.name}: ${COO_MODELS.map((m, mi) => `${m.name} ${text(value(mi, ti))}`).join(", ")}`,
        ).join(". ")}. Outlined cells pair a model with its own country of development`}
      >
        <Key x={20} y={22} size={10} weight={700} fill={view === "pairing" ? SIGNAL : INK}>{title}</Key>
        <Key x={20} y={r2(ry0 - 12)} size={9} fill={INK3}>Statements about</Key>
        {COO_MODELS.map((m, mi) => {
          const x = r2(cx0 + mi * cw + cw / 2);
          return (
            <g key={m.name}>
              <AiMark1 cx={x} cy={44} s={16} fill={INK} />
              <Note x={x} y={68} anchor="middle" size={12} weight={600} fill={INK}>{m.name}</Note>
              <Key x={x} y={82} anchor="middle" size={8.5} fill={INK3}>{m.home}</Key>
            </g>
          );
        })}
        {COO_TARGETS.map((t, ti) => {
          const y = ry0 + ti * rh;
          return (
            <g key={t.name}>
              <Key x={20} y={r2(y + rh / 2 + 4)} size={10} weight={700} fill={INK}>{t.name}</Key>
              {COO_MODELS.map((m, mi) => {
                const v = value(mi, ti);
                const x = cx0 + mi * cw;
                const home = m.home === t.name;
                return (
                  <g key={m.name}>
                    <rect x={x + 2} y={y + 2} width={cw - 4} height={rh - 4} fill={fill(v)} stroke={home ? INK : "none"} strokeWidth={home ? 2 : 0} />
                    <Key x={r2(x + cw / 2)} y={r2(y + rh / 2 + 4)} anchor="middle" size={11} weight={700} fill={dark(v) ? PAPER : INK}>
                      {text(v)}
                    </Key>
                  </g>
                );
              })}
            </g>
          );
        })}
        <rect x={20} y={290} width={14} height={14} fill="none" stroke={INK} strokeWidth={2} />
        <Key x={42} y={301} size={9} fill={INK3}>{"Model’s own country"}</Key>
        <Key x={660} y={301} anchor="end" size={9} fill={INK3}>{"Wadi, Ghodrat & Philp (2026)"}</Key>
      </Frame>
      <Segmented<PairView>
        label="Show"
        options={[
          { id: "score", label: "Expected score" },
          { id: "noModel", label: "Minus model baseline" },
          { id: "pairing", label: "Pairing only" },
        ]}
        value={view}
        onChange={setView}
      />
    </div>
  );
}
/* --------------------------------------------------------------------------
   Auditing an AI Agent
   -------------------------------------------------------------------------- */

type OrderMode = "fixed" | "random";

/** Four listings at the same price. C has the best rating, so the standard says C. */
const LISTINGS = [
  { id: "A", rating: 4.1 },
  { id: "B", rating: 3.9 },
  { id: "C", rating: 4.8 },
  { id: "D", rating: 3.9 },
];
/**
 * An agent's choice shares over 400 tasks (simulated: choice ∝ exp(quality +
 * position), with a strong pull toward the first slot). With a fixed order A
 * is always first. With randomized orders every listing appears in every slot.
 */
const ORDER_SHARES = {
  fixed: { byListing: [43, 14, 35, 8] },
  random: { byListing: [20, 16, 48, 16], bySlot: [46, 23, 17, 14] },
};
const EXAMPLE_ORDERS = {
  fixed: [
    [0, 1, 2, 3],
    [0, 1, 2, 3],
    [0, 1, 2, 3],
  ],
  random: [
    [2, 0, 3, 1],
    [1, 3, 0, 2],
    [3, 2, 1, 0],
  ],
};

/**
 * Fixed or randomized order: an agent picks one of four equally priced
 * listings, where the normative standard is the best-rated, C. With the
 * listings always in the same order, A, always first, wins 43% of tasks and
 * the audit would conclude that the agent prefers A. With the order
 * randomized, C wins 48%, and the first slot's pull is measured separately:
 * 46% of choices go to whatever is listed first.
 */
export function OrderRandomization() {
  const [mode, setMode] = useState<OrderMode>("fixed");
  const shares = ORDER_SHARES[mode].byListing;
  const top = shares.indexOf(Math.max(...shares));
  const bx = 360;
  const B = (v: number) => r2((v / 50) * 140);
  return (
    <div>
      <Frame
        width={680}
        height={316}
        label={`An AI agent chooses among four listings at the same price. C has the best rating. ${
          mode === "fixed"
            ? "With the listings always in the order A, B, C, D, the agent chooses A in 43% of 400 tasks, B 14%, C 35%, D 8%"
            : "With the order randomized in every task, the agent chooses A in 20% of 400 tasks, B 16%, C 48%, D 16%. By position, 46% of choices go to the first listing, 23% the second, 17% the third, 14% the fourth"
        }`}
      >
        <Key x={20} y={22} size={10}>Three of the tasks</Key>
        {EXAMPLE_ORDERS[mode].map((order, ti) => {
          const x = 20 + ti * 104;
          return (
            <g key={ti}>
              <AiMark1 cx={x + 10} cy={46} s={16} fill={INK} />
              {order.map((li, slot) => {
                const l = LISTINGS[li];
                const y = 64 + slot * 34;
                const best = l.id === "C";
                return (
                  <g key={slot}>
                    <rect x={x} y={y} width={90} height={28} rx={2} fill={PAPER} stroke={slot === 0 ? INK : RULE2} strokeWidth={slot === 0 ? 1.5 : 1} />
                    <Key x={x + 10} y={y + 18.5} size={11} weight={700} fill={best ? SIGNAL : INK}>{l.id}</Key>
                    <path
                      d={`M${x + 50} ${y + 8}l2.2 4.6l5 .7l-3.6 3.5l.9 5l-4.5 -2.4l-4.5 2.4l.9 -5l-3.6 -3.5l5 -.7z`}
                      fill={best ? SIGNAL : INK3}
                    />
                    <Key x={x + 62} y={y + 18.5} size={10} weight={600} fill={best ? SIGNAL : INK2}>{l.rating.toFixed(1)}</Key>
                  </g>
                );
              })}
            </g>
          );
        })}
        <Key x={20} y={218} size={9} fill={INK3}>{mode === "fixed" ? "Same order in every task" : "A new order in every task"}</Key>
        <Key x={20} y={232} size={9} fill={INK3}>Same price for all four</Key>

        <line x1={334} y1={20} x2={334} y2={300} stroke={RULE} strokeWidth={1} />

        <Key x={bx} y={22} size={10}>{"Agent’s choices, 400 tasks"}</Key>
        {shares.map((v, i) => {
          const y = 42 + i * 34;
          const isC = i === 2;
          const c = isC ? SIGNAL : i === top ? COUNTER : INK3;
          return (
            <g key={i}>
              <Key x={bx} y={y + 15} size={11} weight={700} fill={isC ? SIGNAL : INK}>{LISTINGS[i].id}</Key>
              <rect x={bx + 22} y={y + 2} width={B(v)} height={18} fill={c} />
              <Key x={r2(bx + 28 + B(v))} y={y + 15} size={10.5} weight={700} fill={c}>{`${v}%`}</Key>
              {isC ? <Key x={660} y={y + 15} anchor="end" size={9} weight={700} fill={SIGNAL}>Best rated</Key> : null}
              {i === 0 && mode === "fixed" ? <Key x={660} y={y + 15} anchor="end" size={9} weight={700} fill={COUNTER}>Always first</Key> : null}
            </g>
          );
        })}
        {mode === "random" ? (
          <g>
            <Key x={bx} y={202} size={10}>Choices by position in the list</Key>
            {ORDER_SHARES.random.bySlot.map((v, k) => {
              const x = bx + k * 74;
              const h = r2(v * 1.2);
              return (
                <g key={k}>
                  <rect x={x} y={r2(284 - h)} width={40} height={h} fill={k === 0 ? INK : PAPER3} />
                  <Key x={x + 20} y={r2(284 - h - 5)} anchor="middle" size={10} weight={700} fill={k === 0 ? INK : INK3}>{`${v}%`}</Key>
                  <Key x={x + 20} y={298} anchor="middle" size={9}>{["1ST", "2ND", "3RD", "4TH"][k]}</Key>
                </g>
              );
            })}
          </g>
        ) : (
          <g>
            <Key x={bx} y={202} size={10}>Choices by position in the list</Key>
            {[0, 1, 2, 3].map((k) => (
              <g key={k}>
                <rect x={bx + k * 74} y={244} width={40} height={40} fill="none" stroke={RULE2} strokeWidth={1} strokeDasharray="3 3" />
                <Key x={bx + k * 74 + 20} y={269} anchor="middle" size={11} weight={700} fill={INK3}>?</Key>
                <Key x={bx + k * 74 + 20} y={298} anchor="middle" size={9}>{["1ST", "2ND", "3RD", "4TH"][k]}</Key>
              </g>
            ))}
            <Key x={bx} y={224} size={9} fill={INK3}>Not separable from the listings</Key>
          </g>
        )}
      </Frame>
      <Segmented<OrderMode>
        label="Order of the listings"
        options={[
          { id: "fixed", label: "Fixed" },
          { id: "random", label: "Randomized" },
        ]}
        value={mode}
        onChange={setMode}
      />
    </div>
  );
}
