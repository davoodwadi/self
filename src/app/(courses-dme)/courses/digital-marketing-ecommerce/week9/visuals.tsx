"use client";

import React, { useState } from "react";
import { CAT, CatKey, Frame, HalftoneDefs, LINE, Price, Segmented, Slider, Tile, Toggles, ht, r2, seeded } from "../_visuals/kit";
import { Agent, Hotel, Jacket, Parcel, Person } from "../_visuals/objects";

const ink = { stroke: CAT.ink, strokeWidth: LINE.outline, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
const hair = { stroke: CAT.ink, strokeWidth: LINE.hair, strokeLinecap: "round" as const };
const fmt = (n: number) => Math.round(n).toLocaleString("en-US");
const dollars = (n: number) => `$${n.toFixed(2)}`;

/* ---------------------------------------------------------------------------
   Week 9 cast
   ------------------------------------------------------------------------ */

/** A head of lettuce centred on (cx, cy), about 96 wide and 82 tall: a ruffled heart cupped by two outer leaves. */
function Lettuce({ id, cx, cy }: { id: string; cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx} ${cy}) scale(1.2)`} strokeLinejoin="round" stroke={CAT.ink} strokeWidth={0.95}>
      <path d="M0 36C-16 30 -26 12 -24 -4C-25 -14 -20 -24 -14 -28Q-10 -34 -4 -31Q0 -36 5 -31Q11 -34 14 -28C20 -24 25 -14 24 -4C26 12 16 30 0 36Z" fill={CAT.tile} />
      <path d="M-16 -18Q-8 -24 0 -22Q8 -24 16 -18M-18 -6Q-8 -12 0 -10Q8 -12 18 -6" fill="none" strokeWidth={0.55} />
      <path d="M3 36C-24 38 -42 22 -40 2Q-40 -10 -34 -18Q-32 -12 -28 -14Q-26 -6 -21 -8C-17 10 -8 24 3 36Z" fill={ht(id, "light")} />
      <path d="M0 33Q-18 20 -30 -6" fill="none" strokeWidth={0.55} />
      <path d="M-3 36C24 38 42 22 40 2Q40 -10 34 -18Q32 -12 28 -14Q26 -6 21 -8C17 10 8 24 -3 36Z" fill={ht(id, "dense")} />
      <path d="M0 33Q18 20 30 -6" fill="none" stroke={CAT.tile} strokeWidth={1.6} strokeLinecap="round" />
    </g>
  );
}

/** A snow shovel centred on (cx, cy), about 60 wide and 132 tall: D-grip, shaft and a halftone blade. */
function Shovel({ id, cx, cy }: { id: string; cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx} ${cy})`} strokeLinejoin="round">
      <path d="M-11 -66H11Q13 -66 13 -64V-52Q13 -48 9 -46L4 -42H-4L-9 -46Q-13 -48 -13 -52V-64Q-13 -66 -11 -66Z" fill={CAT.tile} {...ink} />
      <rect x={-6} y={-61} width={12} height={8} rx={2} fill={CAT.paper} {...ink} />
      <rect x={-3} y={-42} width={6} height={64} fill={ht(id, "light")} {...ink} />
      <path d="M-30 22H30L26 66H-26Z" fill={ht(id, "light")} {...ink} />
      <path d="M14 22H30L26 66H12Z" fill={ht(id, "dense")} stroke="none" />
      <path d="M-30 22H30L26 66H-26Z" fill="none" {...ink} />
      <path d="M-22 30V58" stroke={CAT.tile} strokeWidth={1.8} strokeLinecap="round" />
    </g>
  );
}

/* ---------------------------------------------------------------------------
   1. Dynamic pricing versus personalized pricing
   ------------------------------------------------------------------------ */

const QUOTES = {
  dynamic: [
    [180, 220],
    [180, 220],
  ],
  personal: [
    [165, 165],
    [205, 205],
  ],
};

/** One jacket quoted to two shoppers on two days: prices move with the day, or with the shopper. */
export function DynamicVsPersonal() {
  const id = "w9-quote";
  const panel = (x0: number, title: string, rows: number[][], foot: string, tone: string) => (
    <g>
      <CatKey x={x0} y={30} size={17} fill={tone}>{title}</CatKey>
      <CatKey x={x0 + 130} y={68} size={14} anchor="middle">Monday</CatKey>
      <CatKey x={x0 + 240} y={68} size={14} anchor="middle">Snowy Friday</CatKey>
      {rows.map((r, i) => {
        const y = 82 + i * 76;
        return (
          <g key={i}>
            <Person id={id} cx={x0 + 28} cy={y + 30} s={0.82} />
            {r.map((p, j) => (
              <g key={j}>
                <Tile x={x0 + 80 + j * 110} y={y} w={100} h={60} />
                <Price x={x0 + 130 + j * 110} y={y + 38} size={22} anchor="middle" fill={tone}>${p}</Price>
              </g>
            ))}
          </g>
        );
      })}
      <CatKey x={x0 + 185} y={264} size={14} anchor="middle" fill={tone}>{foot}</CatKey>
    </g>
  );
  return (
    <Frame
      width={800}
      height={280}
      label="One winter jacket quoted to two shoppers on a quiet Monday and on a snowy Friday. Under dynamic pricing both shoppers see $180 on Monday and $220 on Friday, so the price moves with the day. Under personalized pricing one shopper sees $165 and the other $205 on both days, so the price moves with the shopper."
      svgProps={{ "data-plate": "dynamic-vs-personal" }}
    >
      <HalftoneDefs id={id} />
      <Tile x={10} y={44} w={126} h={192} />
      <Jacket id={id} cx={73} cy={132} />
      <line x1={30} y1={210} x2={104} y2={210} {...hair} />
      <line x1={30} y1={216} x2={86} y2={216} {...hair} />
      {panel(150, "Dynamic pricing", QUOTES.dynamic, "Price moves with the day", CAT.ink)}
      <line x1={458} y1={18} x2={458} y2={270} {...hair} />
      {panel(474, "Personalized pricing", QUOTES.personal, "Price moves with the shopper", CAT.purple)}
    </Frame>
  );
}

/* ---------------------------------------------------------------------------
   2. Dual entitlement (Kahneman, Knetsch and Thaler, 1986)
   ------------------------------------------------------------------------ */

/**
 * Two questions from Kahneman, Knetsch and Thaler (1986). Lettuce: the
 * wholesale cost rises 30 cents and the grocer passes it on, 79% of 101
 * called it acceptable. Shovels: $15 to $20 the morning after a snowstorm,
 * 82% of 107 called it unfair. The cost and profit split inside each price
 * is drawn to show where the increase goes.
 */
const KKT = [
  { key: "lettuce", before: [70, 30], after: [100, 30], k: 1.1, tags: ["$1.00", "$1.30"], unfair: 21, n: 101, lines: ["Wholesale cost", "rises 30¢"] },
  { key: "shovel", before: [10, 5], after: [10, 10], k: 7.4, tags: ["$15", "$20"], unfair: 82, n: 107, lines: ["Snowstorm,", "same cost"] },
] as const;

export function DualEntitlement() {
  const id = "w9-kkt";
  const base = 214;
  return (
    <Frame
      width={800}
      height={330}
      label="Two price increases from Kahneman, Knetsch and Thaler (1986). A grocer passes on a 30 cent rise in the wholesale cost of lettuce, raising the price from $1.00 to $1.30: the cost part grows and the profit part stays the same, and 21 percent of 101 respondents judged it unfair. A hardware store raises snow shovels from $15 to $20 the morning after a snowstorm with no change in cost: the whole rise goes to profit, and 82 percent of 107 respondents judged it unfair."
      svgProps={{ "data-plate": "dual-entitlement" }}
    >
      <HalftoneDefs id={id} />
      {KKT.map((d, s) => {
        const x0 = 14 + s * 400;
        const col = (x: number, [cost, profit]: readonly number[], grew: boolean, tag: string, name: string) => {
          const hc = r2(cost * d.k);
          const hp = r2(profit * d.k);
          return (
            <g>
              <rect x={x} y={r2(base - hc)} width={52} height={hc} fill={ht(id, "dense")} {...ink} />
              <rect x={x} y={r2(base - hc - hp)} width={52} height={hp} fill={grew ? CAT.amber : CAT.tile} {...ink} />
              <Price x={x + 26} y={r2(base - hc - hp - 10)} size={17} anchor="middle">{tag}</Price>
              <CatKey x={x + 26} y={base + 22} size={14} anchor="middle">{name}</CatKey>
            </g>
          );
        };
        const after = d.after;
        const hcA = after[0] * d.k;
        const hpA = after[1] * d.k;
        return (
          <g key={d.key}>
            <Tile x={x0} y={30} w={130} h={150} />
            {s === 0 ? <Lettuce id={id} cx={x0 + 65} cy={104} /> : <Shovel id={id} cx={x0 + 65} cy={104} />}
            <CatKey x={x0 + 65} y={204} size={14} anchor="middle">{d.lines[0]}</CatKey>
            <CatKey x={x0 + 65} y={222} size={14} anchor="middle">{d.lines[1]}</CatKey>
            {col(x0 + 150, d.before, false, d.tags[0], "Before")}
            {col(x0 + 222, after, s === 1, d.tags[1], "After")}
            <line x1={x0 + 278} y1={r2(base - hcA - hpA / 2)} x2={x0 + 288} y2={r2(base - hcA - hpA / 2)} {...hair} />
            <CatKey x={x0 + 292} y={r2(base - hcA - hpA / 2 + 5)} size={14}>Profit</CatKey>
            <line x1={x0 + 278} y1={r2(base - hcA / 2)} x2={x0 + 288} y2={r2(base - hcA / 2)} {...hair} />
            <CatKey x={x0 + 292} y={r2(base - hcA / 2 + 5)} size={14}>Cost</CatKey>
            <CatKey x={x0} y={270} size={14}>Judged unfair</CatKey>
            <rect x={x0} y={280} width={300} height={22} fill={CAT.tile} {...ink} />
            <rect x={x0} y={280} width={r2(3 * d.unfair)} height={22} fill={CAT.ink} {...ink} />
            <Price x={x0 + 308} y={298} size={18}>{d.unfair}%</Price>
            <CatKey x={x0 + 300} y={324} size={14} anchor="end">{`of ${d.n} people asked`}</CatKey>
          </g>
        );
      })}
    </Frame>
  );
}

/* ---------------------------------------------------------------------------
   3. Free-shipping threshold
   ------------------------------------------------------------------------ */

const BASKETS = (() => {
  const rnd = seeded(9);
  return Array.from({ length: 200 }, () => {
    const u1 = Math.max(rnd(), 1e-6);
    const u2 = rnd();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    return { b: Math.min(118, Math.max(8, Math.round(42 * Math.exp(0.42 * z)))), u: rnd() };
  });
})();
const BASE_AOV = BASKETS.reduce((a, d) => a + d.b, 0) / BASKETS.length;
const REACH = 30;

/** Shoppers a short way below the threshold add an item to reach it; those far below do not. */
function topUps(t: number) {
  return BASKETS.map((d) => {
    const gap = t - d.b;
    if (gap > 0 && gap <= REACH && d.u < 0.85 * (1 - gap / REACH)) return { b: r2(t + ((d.u * 97) % 8)), up: true };
    return { b: d.b, up: false };
  });
}

export function ShippingThreshold() {
  const [t, setT] = useState(55);
  const id = "w9-ship";
  const carts = topUps(t);
  const aov = carts.reduce((a, d) => a + d.b, 0) / carts.length;
  const added = carts.filter((d) => d.up).length;
  const free = carts.filter((d) => d.b >= t).length;
  const X0 = 60;
  const BW = 28;
  const Y0 = 300;
  const X = (v: number) => r2(X0 + (v / 5) * BW);
  const bins: { up: boolean }[][] = Array.from({ length: 24 }, () => []);
  carts
    .slice()
    .sort((a, b) => Number(a.up) - Number(b.up))
    .forEach((d) => bins[Math.min(23, Math.floor(d.b / 5))].push(d));
  return (
    <div>
      <Frame
        width={800}
        height={360}
        label={`200 shopping baskets by value. With free shipping from $${t}, ${added} shoppers a short way below the threshold add an item to reach it, ${free} orders ship free, and Average Order Value is ${dollars(aov)} against ${dollars(BASE_AOV)} with no threshold.`}
        svgProps={{ "data-plate": "shipping-threshold" }}
      >
        <HalftoneDefs id={id} />
        <CatKey x={X0} y={24} size={14}>Average Order Value</CatKey>
        <Price x={X0} y={54} size={26}>{dollars(aov)}</Price>
        <CatKey x={X0 + 112} y={52} size={14}>{`${dollars(BASE_AOV)} with no threshold`}</CatKey>
        <CatKey x={760} y={24} size={14} anchor="end" fill={CAT.amberText}>{`${added} shoppers added an item`}</CatKey>
        <CatKey x={760} y={48} size={14} anchor="end">{`${free} of 200 orders ship free`}</CatKey>
        <CatKey x={X0} y={98} size={14}>Each block is one basket</CatKey>
        <line x1={X0 - 4} y1={Y0} x2={X(120) + 4} y2={Y0} {...ink} />
        {bins.map((bin, i) =>
          bin.map((d, k) => {
            const col = k % 2;
            const row = Math.floor(k / 2);
            return (
              <rect
                key={`${i}-${k}`}
                x={r2(X0 + i * BW + 2 + col * 12)}
                y={r2(Y0 - 5 - row * 5)}
                width={11}
                height={4}
                fill={d.up ? CAT.amber : ht(id, "light")}
                stroke={CAT.ink}
                strokeWidth={0.6}
              />
            );
          }),
        )}
        {[0, 20, 40, 60, 80, 100, 120].map((v) => (
          <g key={v}>
            <line x1={X(v)} y1={Y0} x2={X(v)} y2={Y0 + 5} {...ink} />
            <Price x={X(v)} y={Y0 + 22} size={14} anchor="middle">${v}</Price>
          </g>
        ))}
        <CatKey x={X(60)} y={Y0 + 48} size={14} anchor="middle">Basket value</CatKey>
        <line x1={X(t)} y1={84} x2={X(t)} y2={Y0} stroke={CAT.ink} strokeWidth={1} strokeDasharray="4 3" />
        <CatKey x={r2(X(t) + (t > 90 ? -8 : 8))} y={100} size={14} anchor={t > 90 ? "end" : "start"}>{`Free shipping from $${t}`}</CatKey>
      </Frame>
      <Slider label="Free shipping from" min={20} max={120} step={5} value={t} onChange={setT} formatValue={(v) => `$${v}`} />
    </div>
  );
}

/* ---------------------------------------------------------------------------
   4. Discount depth and break-even volume
   ------------------------------------------------------------------------ */

const PRICE = 100;
const COST = 60;
const TARGET = 100 * (PRICE - COST);

export function DiscountBreakEven() {
  const [pct, setPct] = useState(20);
  const id = "w9-margin";
  const sale = PRICE * (1 - pct / 100);
  const margin = sale - COST;
  const units = TARGET / margin;
  const blocks = Math.round(units / 10);
  const k = 2.1;
  const base = 290;
  const col = (x: number, price: number, amber: boolean, name: string) => {
    const hc = r2(COST * k);
    const hm = r2((price - COST) * k);
    return (
      <g>
        <rect x={x} y={r2(base - hc)} width={70} height={hc} fill={ht(id, "dense")} {...ink} />
        <rect x={x} y={r2(base - hc - hm)} width={70} height={hm} fill={amber ? CAT.amber : CAT.tile} {...ink} />
        {hm >= 18 ? <Price x={x + 35} y={r2(base - hc - hm / 2 + 6)} size={16} anchor="middle">${fmt(price - COST)}</Price> : null}
        <Price x={x + 35} y={r2(base - hc - hm - 10)} size={18} anchor="middle">${fmt(price)}</Price>
        <CatKey x={x + 35} y={base + 24} size={14} anchor="middle">{name}</CatKey>
      </g>
    );
  };
  return (
    <div>
      <Frame
        width={800}
        height={330}
        label={`A $100 product with a $60 unit cost earns $40 per sale at full price. At ${pct}% off it sells for $${fmt(sale)} and earns $${fmt(margin)} per sale, so it needs ${fmt(units)} sales instead of 100 to earn the same $4,000 contribution.`}
        svgProps={{ "data-plate": "discount-break-even" }}
      >
        <HalftoneDefs id={id} />
        <CatKey x={20} y={24} size={14}>Margin per sale</CatKey>
        <line x1={20} y1={base} x2={260} y2={base} {...ink} />
        {col(34, PRICE, false, "Full price")}
        {col(134, sale, true, pct === 0 ? "No discount" : `${pct}% off`)}
        <line x1={208} y1={r2(base - (COST * k) / 2)} x2={218} y2={r2(base - (COST * k) / 2)} {...hair} />
        <CatKey x={222} y={r2(base - (COST * k) / 2 + 5)} size={14}>$60 cost</CatKey>

        <line x1={300} y1={16} x2={300} y2={314} {...hair} />
        <CatKey x={326} y={24} size={14}>Sales needed to earn $4,000</CatKey>
        <Price x={326} y={60} size={28} fill={pct ? CAT.amberText : CAT.ink}>{fmt(units)}</Price>
        <CatKey x={326 + String(fmt(units)).length * 17 + 10} y={58} size={14}>{pct ? `sales, ${fmt((units / 100 - 1) * 100)}% more than at full price` : "sales at full price"}</CatKey>
        {Array.from({ length: blocks }, (_, i) => {
          const c = i % 10;
          const r = Math.floor(i / 10);
          return <Parcel key={i} id={id} x={330 + c * 44} y={98 + r * 50} w={28} h={22} tone={i < 10 ? "ink" : "amber"} />;
        })}
        <CatKey x={326} y={312} size={14}>Each parcel is 10 sales</CatKey>
      </Frame>
      <Slider label="Sitewide discount" min={0} max={30} step={5} value={pct} onChange={setPct} formatValue={(v) => `${v}%`} />
    </div>
  );
}

/* ---------------------------------------------------------------------------
   5. Repricers: penny-undercut price war and learned collusion
   ------------------------------------------------------------------------ */

const START = [34, 33.95];
const UNIT_COST = 22;
const FLOOR = 24;
const STEP = 0.05;

/** Each second one seller reprices to the rival's price less $0.05, down to its floor (or to cost). */
function undercutPath(floor: number) {
  const p = [...START];
  const path: [number, number][] = [[p[0], p[1]]];
  for (let s = 1; s <= 300; s++) {
    const me = s % 2 === 0 ? 0 : 1;
    p[me] = Math.max(floor, r2(p[1 - me] - STEP));
    path.push([p[0], p[1]]);
  }
  return path;
}

/**
 * The forced price cut of Calvano, Calzolari, Denicolò and Pastorello (2020),
 * run on two Q-learning pricing agents trained in their baseline market
 * (logit demand, two firms, unit cost 1, 15 prices, one-period memory,
 * learning rate 0.15, discount 0.95). LEARNED holds each agent's learned
 * price index for every state (own last price, rival last price). Seller 1 is
 * forced to the chosen price in one period, and from then on both follow
 * their learned strategies.
 */
const PRICES = [1.4277, 1.4665, 1.5052, 1.544, 1.5827, 1.6215, 1.6602, 1.699, 1.7377, 1.7764, 1.8152, 1.8539, 1.8927, 1.9314, 1.9702];
const NASH = 1.4729;
const MONOPOLY = 1.925;
const LEARNED = [
  [4, 2, 2, 3, 1, 4, 1, 6, 4, 1, 1, 2, 1, 11, 1, 6, 4, 2, 2, 4, 6, 7, 0, 7, 0, 10, 3, 4, 2, 1, 3, 2, 0, 9, 4, 5, 7, 0, 2, 2, 3, 0, 1, 4, 3, 2, 4, 2, 4, 0, 0, 0, 2, 4, 2, 3, 3, 6, 5, 8, 2, 4, 0, 2, 0, 0, 2, 2, 1, 0, 2, 2, 3, 2, 2, 5, 6, 1, 6, 1, 2, 4, 6, 1, 4, 7, 4, 8, 4, 3, 4, 0, 1, 1, 2, 4, 1, 4, 1, 4, 6, 4, 6, 4, 7, 2, 0, 1, 6, 2, 3, 2, 3, 1, 3, 2, 10, 4, 11, 0, 1, 6, 6, 5, 4, 6, 4, 4, 6, 4, 3, 6, 2, 4, 2, 4, 6, 1, 1, 6, 8, 12, 7, 4, 1, 2, 0, 4, 6, 4, 2, 5, 11, 3, 12, 1, 4, 0, 2, 2, 6, 4, 5, 2, 5, 6, 2, 2, 0, 3, 11, 2, 2, 5, 4, 1, 4, 3, 14, 6, 1, 3, 2, 1, 0, 2, 2, 0, 5, 2, 0, 12, 3, 4, 9, 2, 6, 4, 6, 4, 10, 6, 6, 11, 5, 2, 9, 3, 4, 4, 4, 6, 8, 0, 5, 1, 7, 3, 14, 4, 5, 3, 6, 6, 3],
  [0, 2, 4, 3, 3, 3, 6, 1, 0, 0, 1, 3, 2, 9, 4, 1, 0, 3, 0, 4, 2, 2, 2, 3, 1, 4, 11, 2, 3, 2, 3, 3, 2, 3, 2, 2, 2, 2, 5, 0, 0, 3, 3, 2, 3, 6, 1, 6, 2, 2, 2, 6, 2, 3, 0, 0, 2, 4, 11, 12, 4, 6, 4, 2, 2, 2, 3, 1, 7, 1, 10, 2, 2, 13, 6, 4, 1, 7, 2, 2, 3, 1, 0, 4, 4, 6, 0, 1, 8, 8, 2, 4, 5, 2, 3, 4, 0, 2, 4, 11, 4, 1, 1, 4, 5, 3, 2, 0, 3, 3, 2, 5, 6, 6, 11, 2, 9, 6, 0, 5, 1, 1, 5, 6, 2, 0, 6, 6, 0, 2, 3, 5, 7, 7, 7, 6, 2, 3, 3, 2, 6, 8, 4, 0, 2, 9, 8, 1, 7, 2, 1, 1, 1, 6, 3, 11, 0, 1, 4, 1, 1, 1, 11, 3, 14, 3, 5, 2, 0, 1, 4, 2, 9, 4, 6, 0, 4, 11, 6, 4, 6, 6, 2, 2, 0, 10, 7, 6, 1, 7, 0, 0, 7, 0, 11, 12, 3, 2, 5, 3, 0, 0, 12, 5, 4, 1, 0, 2, 8, 0, 6, 6, 2, 14, 3, 0, 7, 0, 9, 0, 8, 3, 10, 8, 9],
];

function forcedPath(cut: number) {
  const m = PRICES.length;
  let o: [number, number] = [12, 11];
  const path: [number, number][] = [o, o, o];
  for (let k = 0; k < 13; k++) {
    let a1 = LEARNED[0][o[0] * m + o[1]];
    const a2 = LEARNED[1][o[1] * m + o[0]];
    if (k === 0) a1 = cut;
    path.push([a1, a2]);
    o = [a1, a2];
  }
  return path;
}

type Mode = "rules" | "learning";

export function RepricerLoops() {
  const [mode, setMode] = useState<Mode>("rules");
  const [floors, setFloors] = useState<"floor"[]>([]);
  const [cut, setCut] = useState(5);
  const id = "w9-reprice";
  const x0 = 84;
  const x1 = 700;
  const yTop = 70;
  const yBot = 270;

  let lines: { d: string; dash?: string; endY: number }[] = [];
  let guides: { y: number; label: string }[] = [];
  let ticks: { x: number; label: string }[] = [];
  let yTicks: { y: number; label: string }[] = [];
  let xLabel = "";
  let label = "";
  let note = "";

  if (mode === "rules") {
    const floor = floors.includes("floor") ? FLOOR : UNIT_COST;
    const path = undercutPath(floor);
    const lo = 20;
    const hi = 36;
    const n = path.length - 1;
    const X = (i: number) => r2(x0 + (i / n) * (x1 - x0));
    const Y = (p: number) => r2(yBot - ((p - lo) / (hi - lo)) * (yBot - yTop));
    const line = (who: 0 | 1) => path.map((p, i) => `${i === 0 ? "M" : "L"}${X(i)} ${Y(p[who])}`).join("");
    lines = [
      { d: line(0), endY: Y(path[n][0]) },
      { d: line(1), dash: "5 3", endY: Y(path[n][1]) },
    ];
    guides = [{ y: Y(UNIT_COST), label: "Cost $22.00" }];
    if (floor === FLOOR) guides.push({ y: Y(FLOOR), label: "Floor $24.00" });
    yTicks = [20, 24, 28, 32, 36].map((v) => ({ y: Y(v), label: `$${v}` }));
    ticks = [0, 1, 2, 3, 4, 5].map((m) => ({ x: X(m * 60), label: String(m) }));
    xLabel = "Minutes";
    const reach = path.findIndex((p) => p[0] === floor && p[1] === floor);
    note = `Both at $${floor.toFixed(2)} after ${reach} seconds`;
    label = `Two sellers start at $34.00 and $33.95 and each undercuts the other by $0.05 every second. Both reach $${floor.toFixed(2)}, ${floor === FLOOR ? "the floor" : "unit cost"}, after ${reach} seconds.`;
  } else {
    const path = forcedPath(cut);
    const lo = 1.4;
    const hi = 2.0;
    const n = path.length;
    const X = (i: number) => r2(x0 + (i / n) * (x1 - x0));
    const Y = (p: number) => r2(yBot - ((p - lo) / (hi - lo)) * (yBot - yTop));
    const steps = (who: 0 | 1) => path.map((p, i) => `${i === 0 ? "M" : "L"}${X(i)} ${Y(PRICES[p[who]])}H${X(i + 1)}`).join("");
    lines = [
      { d: steps(0), endY: Y(PRICES[path[n - 1][0]]) },
      { d: steps(1), dash: "5 3", endY: Y(PRICES[path[n - 1][1]]) },
    ];
    guides = [
      { y: Y(MONOPOLY), label: "Monopoly price" },
      { y: Y(NASH), label: "Competitive price" },
    ];
    yTicks = [1.4, 1.6, 1.8, 2.0].map((v) => ({ y: Y(v), label: v.toFixed(2) }));
    ticks = [0, 4, 8, 12, 16].map((k) => ({ x: X(k), label: String(k) }));
    xLabel = "Period";
    note = "Unit cost 1.00";
    label = `Two learning pricing agents from the market of Calvano et al. (2020) hold prices near the monopoly level. Seller 1 is forced to cut to ${PRICES[cut].toFixed(2)} in period 3. Seller 2 answers with lower prices, and both then step back up to the high price.`;
  }

  return (
    <div>
      <Frame width={800} height={330} label={label} svgProps={{ "data-plate": "repricer-loops" }}>
        <HalftoneDefs id={id} />
        <CatKey x={x0 - 10} y={30} size={14}>Price</CatKey>
        <CatKey x={x1} y={30} size={14} anchor="end">{note}</CatKey>
        {guides.map((g) => (
          <g key={g.label}>
            <line x1={x0} y1={g.y} x2={x1} y2={g.y} stroke={CAT.ink} strokeWidth={0.8} strokeDasharray="2 3" />
            <CatKey x={x0 + 6} y={r2(g.y - 6)} size={14}>{g.label}</CatKey>
          </g>
        ))}
        <line x1={x0} y1={yBot} x2={x1} y2={yBot} {...ink} />
        <line x1={x0} y1={yTop - 10} x2={x0} y2={yBot} {...ink} />
        {yTicks.map((t) => (
          <g key={t.label}>
            <line x1={x0 - 5} y1={t.y} x2={x0} y2={t.y} {...ink} />
            <Price x={x0 - 9} y={r2(t.y + 5)} size={14} anchor="end">{t.label}</Price>
          </g>
        ))}
        {ticks.map((t) => (
          <g key={t.label}>
            <line x1={t.x} y1={yBot} x2={t.x} y2={yBot + 5} {...ink} />
            <Price x={t.x} y={yBot + 22} size={14} anchor="middle">{t.label}</Price>
          </g>
        ))}
        <CatKey x={r2((x0 + x1) / 2)} y={yBot + 46} size={14} anchor="middle">{xLabel}</CatKey>
        {lines.map((l, i) => (
          <path key={i} d={l.d} fill="none" stroke={i === 0 ? CAT.ink : CAT.purple} strokeWidth={LINE.bold} strokeDasharray={l.dash} strokeLinejoin="round" />
        ))}
        <CatKey x={x1 + 10} y={r2(Math.min(lines[0].endY, lines[1].endY) - 6)} size={14}>Seller 1</CatKey>
        <CatKey x={x1 + 10} y={r2(Math.max(lines[0].endY, lines[1].endY) + 16)} size={14} fill={CAT.purple}>Seller 2</CatKey>
      </Frame>
      <Segmented
        label="Pricing"
        options={[
          { id: "rules", label: "Undercut-by-a-nickel rules" },
          { id: "learning", label: "Learning agents" },
        ]}
        value={mode}
        onChange={setMode}
      />
      {mode === "rules" ? (
        <Toggles label="Repricer setting" options={[{ id: "floor", label: "Hard floor at $24.00" }]} value={floors} onChange={setFloors} />
      ) : (
        <Slider label="Seller 1 forced to" min={0} max={11} step={1} value={cut} onChange={setCut} formatValue={(v) => PRICES[v].toFixed(2)} />
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   6. Discount badges and AI shopping agents (Wadi & Ma, 2026a)
   ------------------------------------------------------------------------ */

/**
 * Linear probability coefficients on the discount-badge indicator in the
 * "Chosen | Inspected" model of the Study 1 Expedia hotel replication
 * (search-ranking-llm, tbl-ursu-table2): human 0.0104 (Ursu, 2018 data,
 * 53,921 inspections), Gemini Flash Lite 0.0726 (1,469), Gemini Pro 0.3743
 * (3,660). Drawn in percentage points.
 */
const BADGE = [
  { who: "Human shoppers", pts: 1.04, agent: false },
  { who: "Gemini Flash Lite agent", pts: 7.26, agent: true },
  { who: "Gemini Pro agent", pts: 37.43, agent: true },
];

export function BadgeLift() {
  const id = "w9-badge";
  const bx = 270;
  const k = 10;
  return (
    <Frame
      width={800}
      height={262}
      label="Rise in the chance that an inspected hotel listing is booked when it carries a visible discount badge: 1.0 percentage point for human shoppers, 7.3 points for the Gemini Flash Lite agent and 37.4 points for the Gemini Pro agent (Wadi & Ma, 2026a)."
      svgProps={{ "data-plate": "badge-lift" }}
    >
      <HalftoneDefs id={id} />
      <Tile x={14} y={60} w={124} h={150} />
      <Hotel id={id} cx={76} cy={124} s={1.7} />
      <line x1={34} y1={176} x2={100} y2={176} {...hair} />
      <line x1={34} y1={182} x2={82} y2={182} {...hair} />
      <Price x={34} y={200} size={14}>$219</Price>
      <g transform="rotate(8 118 56)">
        <rect x={86} y={40} width={64} height={32} rx={3} fill={CAT.amber} {...ink} />
        <Price x={118} y={62} size={17} anchor="middle">−15%</Price>
      </g>
      <CatKey x={bx} y={26} size={14}>Rise in the chance an inspected listing is booked with the badge</CatKey>
      {BADGE.map((d, i) => {
        const y = 56 + i * 72;
        return (
          <g key={d.who}>
            {d.agent ? <Agent id={id} cx={214} cy={y + 24} s={0.8} tone="purple" /> : <Person id={id} cx={214} cy={y + 24} s={0.8} />}
            <CatKey x={bx} y={y + 6} size={14} fill={d.agent ? CAT.purple : CAT.ink}>{d.who}</CatKey>
            <rect x={bx} y={y + 16} width={Math.max(2, r2(d.pts * k))} height={24} fill={d.agent ? CAT.purple : ht(id, "dense")} {...ink} />
            <Price x={r2(bx + Math.max(2, d.pts * k) + 8)} y={y + 34} size={17}>{`+${d.pts.toFixed(1)} points`}</Price>
          </g>
        );
      })}
    </Frame>
  );
}
