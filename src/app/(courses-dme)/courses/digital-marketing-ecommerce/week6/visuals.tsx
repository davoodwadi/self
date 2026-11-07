"use client";

import React, { useState } from "react";
import { CAT, CatKey, Frame, HalftoneDefs, LINE, Price, Segmented, Slider, Tile, ht, r2 } from "../_visuals/kit";
import { Bottle, Jacket, Parcel, Person, Sneaker } from "../_visuals/objects";

const ink = { stroke: CAT.ink, strokeWidth: LINE.outline, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
const hair = { stroke: CAT.ink, strokeWidth: LINE.hair, strokeLinecap: "round" as const };
const fmt = (n: number) => Math.round(n).toLocaleString("en-US");

/** A vertical video post: a phone-shaped frame with the product and a watch-progress bar. */
function VideoPost({ id, x, y, w = 78, h = 132, watched }: { id: string; x: number; y: number; w?: number; h?: number; watched: number }) {
  const barW = r2(((w - 16) * watched) / 100);
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={9} fill={CAT.tile} {...ink} />
      <rect x={x + 4} y={y + 4} width={w - 8} height={h - 8} rx={6} fill="none" {...hair} />
      <Sneaker id={id} cx={r2(x + w / 2)} cy={r2(y + h * 0.45)} s={r2(w / 72)} />
      <rect x={x + 8} y={y + h - 18} width={w - 16} height={5} fill={CAT.tile} {...hair} />
      <rect x={x + 8} y={y + h - 18} width={barW} height={5} fill={CAT.ink} />
    </g>
  );
}

/* ------------------------------------------------------------------------ */

type Graph = "social" | "interest";
const LEGACY_FOLLOWERS = 500000;
const LEGACY_RETENTION = 25;
const GATES = [40, 50, 60, 70];
const passed = (ret: number) => GATES.filter((g) => ret >= g).length;
const interestReach = (ret: number) => 300 * 10 ** passed(ret);

function graphReach(graph: Graph, ret: number) {
  if (graph === "social") return { fresh: 120 + 3 * ret, legacy: LEGACY_FOLLOWERS * 0.12 * (1 + LEGACY_RETENTION / 100) };
  return { fresh: interestReach(ret), legacy: interestReach(LEGACY_RETENTION) + LEGACY_FOLLOWERS * 0.01 };
}

/** One new post from a zero-follower account against a large legacy account, under two feed architectures. */
export function GraphReach() {
  const [graph, setGraph] = useState<Graph>("interest");
  const [ret, setRet] = useState(65);
  const id = "w6-graph";
  const r = graphReach(graph, ret);
  const lx = (v: number) => r2(190 + ((Math.log10(Math.max(100, v)) - 2) / 5) * 570);
  const rows = [
    { name: "New account", v: r.fresh, amber: r.fresh > r.legacy },
    { name: "Legacy account", v: r.legacy, amber: r.legacy >= r.fresh },
  ];
  return (
    <div>
      <Frame
        width={800}
        height={330}
        label={`${graph === "social" ? "Social-graph" : "Interest-graph"} feed. A new account with zero followers posts a video watched to ${ret} percent and reaches ${fmt(r.fresh)} people. A legacy account with 500,000 followers posts a video watched to ${LEGACY_RETENTION} percent and reaches ${fmt(r.legacy)} people.`}
        svgProps={{ "data-plate": "graph-reach" }}
      >
        <HalftoneDefs id={id} />
        {[0, 1].map((k) => {
          const x = 30 + k * 380;
          return (
            <g key={k}>
              <Tile x={x} y={16} w={360} h={166} />
              <VideoPost id={id} x={x + 22} y={33} watched={k ? LEGACY_RETENTION : ret} />
              <CatKey x={x + 122} y={60} size={15}>{k ? "Legacy account" : "New account"}</CatKey>
              <Price x={x + 122} y={98} size={22}>{k ? "500,000" : "0"}</Price>
              <CatKey x={x + 122} y={118} size={14}>followers</CatKey>
              <Price x={x + 122} y={153} size={18}>{k ? LEGACY_RETENTION : ret}%</Price>
              <CatKey x={x + 172} y={153} size={14}>watched</CatKey>
            </g>
          );
        })}
        {rows.map((row, k) => {
          const y = 214 + k * 44;
          return (
            <g key={row.name}>
              <CatKey x={30} y={y + 18} size={14}>{row.name}</CatKey>
              <rect x={190} y={y} width={r2(lx(row.v) - 190)} height={26} fill={row.amber ? CAT.amber : ht(id, "light")} {...ink} />
              <Price x={r2(Math.min(lx(row.v) + 8, 690))} y={y + 19} size={16} fill={row.amber ? CAT.amberText : CAT.ink}>{fmt(row.v)}</Price>
            </g>
          );
        })}
        <line x1={190} y1={306} x2={760} y2={306} {...hair} />
        {[100, 1000, 10000, 100000, 1000000, 10000000].map((t) => (
          <g key={t}>
            <line x1={lx(t)} y1={302} x2={lx(t)} y2={310} {...hair} />
            <Price x={lx(t)} y={325} size={14} anchor="middle">{t >= 1000000 ? `${t / 1000000}M` : t >= 1000 ? `${t / 1000}k` : t}</Price>
          </g>
        ))}
        <CatKey x={30} y={325} size={14}>People reached</CatKey>
      </Frame>
      <Segmented<Graph>
        label="Feed"
        value={graph}
        onChange={setGraph}
        options={[
          { id: "social", label: "Social graph" },
          { id: "interest", label: "Interest graph" },
        ]}
      />
      <Slider label="New video watched" min={10} max={90} step={5} value={ret} onChange={setRet} formatValue={(v) => `${v}%`} />
    </div>
  );
}

/* ------------------------------------------------------------------------ */

const POOLS = [300, 3000, 30000, 300000, 3000000];
const BASELINES = [40, 46, 52, 58];

/** Staged cohort testing: each larger pool opens only while retention beats the category baseline. */
export function CohortLadder() {
  const [rate, setRate] = useState(55);
  const id = "w6-cohort";
  const retAt = (k: number) => rate - 4 * k;
  let reached = 0;
  while (reached < 4 && retAt(reached) >= BASELINES[reached]) reached++;
  const total = POOLS.slice(0, reached + 1).reduce((a, b) => a + b, 0);
  return (
    <div>
      <Frame
        width={800}
        height={320}
        label={`A new video holds ${rate} percent of its first test pool. It is promoted through ${reached} of four gates and stops at the pool of ${fmt(POOLS[reached])} viewers, for ${fmt(total)} views in total.`}
        svgProps={{ "data-plate": "cohort-ladder" }}
      >
        <HalftoneDefs id={id} />
        <VideoPost id={id} x={34} y={22} w={84} h={140} watched={rate} />
        <Price x={140} y={52} size={26}>{fmt(total)}</Price>
        <CatKey x={140} y={74} size={14}>views</CatKey>
        {POOLS.map((pool, k) => {
          const x = 30 + k * 150;
          const top = 236 - k * 38;
          const on = k <= reached;
          const stop = k === reached;
          return (
            <g key={pool}>
              {on ? (
                <g>
                  <rect x={x} y={top} width={138} height={300 - top} fill={stop ? CAT.amber : CAT.tile} stroke={CAT.ink} strokeWidth={1} />
                  <rect x={x + 3} y={top + 3} width={132} height={294 - top} fill="none" stroke={CAT.ink} strokeWidth={0.45} />
                </g>
              ) : (
                <rect x={x} y={top} width={138} height={300 - top} fill="none" stroke={CAT.ink} strokeWidth={0.8} strokeDasharray="3 4" />
              )}
              <Price x={x + 69} y={top + 30} size={18} anchor="middle">{fmt(pool)}</Price>
              {k < 4 ? (
                <g>
                  <CatKey x={x + 69} y={top + 54} size={14} anchor="middle">{on ? `${retAt(k)}% vs ${BASELINES[k]}%` : `Bar ${BASELINES[k]}%`}</CatKey>
                  {on && !stop ? (
                    <path d={`M${x + 112} ${top - 8}L${x + 146} ${top - 30}`} fill="none" {...ink} />
                  ) : null}
                  {on && !stop ? <path d={headAlong2(x + 146, top - 30)} fill="none" {...ink} /> : null}
                </g>
              ) : null}
            </g>
          );
        })}
        <line x1={24} y1={300} x2={776} y2={300} {...ink} />
      </Frame>
      <Slider label="Watched in the first pool" min={30} max={80} step={1} value={rate} onChange={setRate} formatValue={(v) => `${v}%`} />
    </div>
  );
}

function headAlong2(x: number, y: number) {
  const dx = 34;
  const dy = -22;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  const s = 7;
  const bx = x - ux * s;
  const by = y - uy * s;
  const px = -uy * s * 0.62;
  const py = ux * s * 0.62;
  return `M${r2(bx + px)} ${r2(by + py)}L${r2(x)} ${r2(y)}L${r2(bx - px)} ${r2(by - py)}`;
}

/* ------------------------------------------------------------------------ */

const ctr = (freq: number, hooks: number) => r2(2.2 * 0.8 ** Math.max(0, freq / hooks - 1));

/** Creative fatigue: click rate decays with repeated exposures to the same asset and recovers with rotation. */
export function CreativeFatigue() {
  const [freq, setFreq] = useState(8);
  const [hooks, setHooks] = useState<"1" | "2" | "4">("1");
  const n = Number(hooks);
  const id = "w6-fatigue";
  const X = (f: number) => r2(90 + ((f - 1) / 11) * 430);
  const Y = (c: number) => r2(260 - (c / 2.5) * 220);
  const curve = (h: number) => Array.from({ length: 45 }, (_, k) => 1 + (k * 11) / 44).map((f, k) => `${k ? "L" : "M"}${X(f)} ${Y(ctr(f, h))}`).join("");
  const now = ctr(freq, n);
  const each = r2(freq / n);
  return (
    <div>
      <Frame
        width={800}
        height={312}
        label={`The same audience sees the campaign ${freq} times a week. With ${n} ${n === 1 ? "hook" : "hooks"} in rotation each creative is seen ${each} times and the click rate is ${now.toFixed(2)} percent, against ${ctr(freq, 1).toFixed(2)} percent with one ad.`}
        svgProps={{ "data-plate": "creative-fatigue" }}
      >
        <HalftoneDefs id={id} />
        <line x1={90} y1={260} x2={520} y2={260} {...ink} />
        <line x1={90} y1={40} x2={90} y2={260} {...ink} />
        {[0, 1, 2].map((c) => (
          <g key={c}>
            <line x1={84} y1={Y(c)} x2={90} y2={Y(c)} {...ink} />
            <Price x={78} y={Y(c) + 5} size={14} anchor="end">{c}%</Price>
          </g>
        ))}
        {[1, 4, 8, 12].map((f) => (
          <g key={f}>
            <line x1={X(f)} y1={260} x2={X(f)} y2={266} {...ink} />
            <Price x={X(f)} y={282} size={14} anchor="middle">{f}</Price>
          </g>
        ))}
        <CatKey x={305} y={306} size={14} anchor="middle">Views per person per week</CatKey>
        <CatKey x={96} y={30} size={14}>Click rate</CatKey>
        <path d={curve(1)} fill="none" stroke={CAT.ink} strokeWidth={1.4} />
        {n > 1 ? <path d={curve(n)} fill="none" stroke={CAT.ink} strokeWidth={4.2} /> : null}
        {n > 1 ? <path d={curve(n)} fill="none" stroke={CAT.amber} strokeWidth={2.4} /> : null}
        <line x1={X(freq)} y1={Y(now)} x2={X(freq)} y2={260} stroke={CAT.ink} strokeWidth={0.6} strokeDasharray="2 3" />
        <circle cx={X(freq)} cy={Y(now)} r={6} fill={n > 1 ? CAT.amber : CAT.tile} {...ink} />
        {Array.from({ length: n }, (_, k) => {
          const cols = n === 4 ? 2 : n;
          const w = n === 1 ? 140 : 96;
          const h = n === 1 ? 170 : n === 2 ? 170 : 80;
          const x = r2(665 - (cols * w + (cols - 1) * 10) / 2 + (k % cols) * (w + 10));
          const y = 22 + Math.floor(k / cols) * 90;
          const s = n === 4 ? 1.3 : 2;
          const tilt = [0, -18, 18, 90][k];
          const top = k % 2 === 0;
          return (
            <g key={k}>
              <Tile x={x} y={y} w={w} h={h} />
              <g transform={`translate(${r2(x + w / 2)} ${r2(y + h * (top ? 0.58 : 0.42))}) rotate(${tilt}) scale(${s}) translate(-7 -12)`}>
                <Bottle id={id} x={0} y={0} />
              </g>
              <line x1={x + 12} y1={top ? y + 14 : y + h - 18} x2={x + w - 12} y2={top ? y + 14 : y + h - 18} {...hair} />
              <line x1={x + 12} y1={top ? y + 19 : y + h - 13} x2={r2(x + w * 0.6)} y2={top ? y + 19 : y + h - 13} {...hair} />
            </g>
          );
        })}
        <Price x={665} y={240} size={28} anchor="middle" fill={n > 1 ? CAT.amberText : CAT.ink}>{now.toFixed(2)}%</Price>
        <CatKey x={665} y={264} size={14} anchor="middle">{`Each ad seen ${each} times`}</CatKey>
      </Frame>
      <Slider label="Views per person per week" min={1} max={12} step={1} value={freq} onChange={setFreq} />
      <Segmented<"1" | "2" | "4">
        label="Hooks in rotation"
        value={hooks}
        onChange={setHooks}
        options={[
          { id: "1", label: "One ad" },
          { id: "2", label: "Two hooks" },
          { id: "4", label: "Four hooks" },
        ]}
      />
    </div>
  );
}

/* ------------------------------------------------------------------------ */

/** One $20,000 creator budget: a single macro-influencer against ten micro-influencers, with bot-inflated followers. */
export function CreatorBudget() {
  const [bots, setBots] = useState(0);
  const id = "w6-creators";
  const macroViews = 1200000 * 0.5 * (1 - bots / 100);
  const macroEngaged = macroViews * 0.015;
  const macroOrders = macroEngaged * 0.04;
  const microViews = 10 * 30000 * 0.6;
  const microEngaged = microViews * 0.06;
  const microOrders = microEngaged * 0.08;
  const cols = [
    { x: 190, name: "1 macro creator", followers: "1,200,000 followers", views: macroViews, engaged: macroEngaged, orders: macroOrders },
    { x: 485, name: "10 micro creators", followers: "30,000 followers each", views: microViews, engaged: microEngaged, orders: microOrders },
  ];
  return (
    <div>
      <Frame
        width={800}
        height={340}
        label={`A $20,000 creator budget. One macro creator with 1.2 million followers, ${bots} percent of them bots, reaches ${fmt(macroViews)} real viewers, ${fmt(macroEngaged)} engaged viewers and ${fmt(macroOrders)} orders. Ten micro creators reach ${fmt(microViews)} viewers, ${fmt(microEngaged)} engaged viewers and ${fmt(microOrders)} orders.`}
        svgProps={{ "data-plate": "creator-budget" }}
      >
        <HalftoneDefs id={id} />
        {cols.map((c, k) => (
          <g key={c.name}>
            <Tile x={c.x} y={14} w={285} h={118} />
            {k === 0 ? (
              <g>
                <Person id={id} cx={c.x + 62} cy={76} s={1.5} />
              </g>
            ) : (
              Array.from({ length: 10 }, (_, j) => <Person key={j} id={id} cx={c.x + 24 + (j % 5) * 21} cy={52 + Math.floor(j / 5) * 44} s={0.5} />)
            )}
            <CatKey x={c.x + 270} y={44} size={15} anchor="end">{c.name}</CatKey>
            <CatKey x={c.x + 270} y={66} size={14} anchor="end">{c.followers}</CatKey>
            <Price x={c.x + 270} y={112} size={18} anchor="end">{k ? "$2,000 each" : "$20,000"}</Price>
            <Price x={c.x + 270} y={172} size={20} anchor="end">{fmt(c.views)}</Price>
            <Price x={c.x + 270} y={214} size={20} anchor="end">{fmt(c.engaged)}</Price>
            {Array.from({ length: Math.round(c.orders / 100) }, (_, j) => (
              <Parcel key={j} id={id} x={c.x + 12 + j * 21} y={262} w={16} h={14} tone={k ? "amber" : "ink"} />
            ))}
            <Price x={c.x + 270} y={276} size={20} anchor="end" fill={k ? CAT.amberText : CAT.ink}>{fmt(c.orders)}</Price>
          </g>
        ))}
        {["Real viewers", "Engaged", "Orders"].map((t, k) => (
          <g key={t}>
            <CatKey x={30} y={[172, 214, 276][k]} size={14}>{t}</CatKey>
            <line x1={30} y1={[184, 226, 290][k]} x2={770} y2={[184, 226, 290][k]} {...hair} />
          </g>
        ))}
        <CatKey x={30} y={318} size={14}>One parcel = 100 orders</CatKey>
      </Frame>
      <Slider label="Macro followers that are bots" min={0} max={60} step={10} value={bots} onChange={setBots} formatValue={(v) => `${v}%`} />
    </div>
  );
}

/* ------------------------------------------------------------------------ */

const PRICE = 40;
const CONTRACTS = [
  { id: "flat", name: "Flat fee", pay: (_: number) => 3000 },
  { id: "affiliate", name: "Affiliate 15%", pay: (s: number) => s * PRICE * 0.15 },
  { id: "hybrid", name: "Hybrid", pay: (s: number) => 1000 + s * PRICE * 0.075 },
];

/** Three creator contracts priced against the number of attributed sales. */
export function ContractPayout() {
  const [sales, setSales] = useState(250);
  const X = (s: number) => r2(90 + (s / 1000) * 400);
  const Y = (p: number) => r2(250 - (p / 7000) * 210);
  const rows = CONTRACTS.map((c) => ({ ...c, now: c.pay(sales), per: sales ? c.pay(sales) / sales : Infinity }));
  const best = rows.reduce((a, b) => (b.per < a.per ? b : a));
  return (
    <div>
      <Frame
        width={800}
        height={300}
        label={`At ${sales} attributed sales of a $40 product, the creator earns $3,000 under a flat fee, $${fmt(rows[1].now)} under 15 percent affiliate commission, and $${fmt(rows[2].now)} under a $1,000 hybrid base plus 7.5 percent. The lowest cost per sale for the brand is ${best.name.toLowerCase()}.`}
        svgProps={{ "data-plate": "contract-payout" }}
      >
        <line x1={90} y1={250} x2={490} y2={250} {...ink} />
        <line x1={90} y1={36} x2={90} y2={250} {...ink} />
        {[0, 2000, 4000, 6000].map((p) => (
          <g key={p}>
            <line x1={84} y1={Y(p)} x2={90} y2={Y(p)} {...ink} />
            <Price x={78} y={Y(p) + 5} size={14} anchor="end">{p ? `$${p / 1000}k` : "$0"}</Price>
          </g>
        ))}
        {[0, 500, 1000].map((s) => (
          <g key={s}>
            <line x1={X(s)} y1={250} x2={X(s)} y2={256} {...ink} />
            <Price x={X(s)} y={272} size={14} anchor="middle">{fmt(s)}</Price>
          </g>
        ))}
        <CatKey x={290} y={292} size={14} anchor="middle">Attributed sales</CatKey>
        <CatKey x={96} y={28} size={14}>Creator earns</CatKey>
        {rows.map((c) => (
          <g key={c.id}>
            <path d={`M${X(0)} ${Y(c.pay(0))}L${X(1000)} ${Y(c.pay(1000))}`} fill="none" stroke={CAT.ink} strokeWidth={c.id === "flat" ? 1.2 : c.id === "affiliate" ? 1.2 : 1.2} strokeDasharray={c.id === "flat" ? undefined : c.id === "affiliate" ? "6 4" : "1.5 3"} />
            <CatKey x={496} y={Y(c.pay(1000)) + 5} size={14}>{c.id === "affiliate" ? "Affiliate" : c.name}</CatKey>
          </g>
        ))}
        <line x1={X(sales)} y1={36} x2={X(sales)} y2={250} stroke={CAT.ink} strokeWidth={0.6} strokeDasharray="2 3" />
        {rows.map((c) => (
          <circle key={c.id} cx={X(sales)} cy={Y(c.now)} r={4.5} fill={c.id === best.id ? CAT.amber : CAT.tile} {...ink} />
        ))}
        <Tile x={575} y={24} w={200} h={250} />
        <CatKey x={593} y={52} size={14}>Contract</CatKey>
        <CatKey x={757} y={52} size={14} anchor="end">Per sale</CatKey>
        <line x1={593} y1={62} x2={757} y2={62} {...hair} />
        {rows.map((c, k) => {
          const y = 92 + k * 64;
          const on = c.id === best.id;
          return (
            <g key={c.id}>
              {on ? <rect x={584} y={y - 22} width={182} height={54} fill={CAT.amber} {...ink} /> : null}
              <CatKey x={593} y={y} size={14}>{c.name}</CatKey>
              <Price x={593} y={y + 22} size={14}>${fmt(c.now)}</Price>
              <Price x={757} y={y + 22} size={18} anchor="end">{sales ? `$${c.per.toFixed(2)}` : "n/a"}</Price>
            </g>
          );
        })}
      </Frame>
      <Slider label="Attributed sales" min={0} max={1000} step={50} value={sales} onChange={setSales} />
    </div>
  );
}

/* ------------------------------------------------------------------------ */

type Route = "redirect" | "native";
const ROUTES: Record<Route, { steps: { name: string; n: number }[]; data: boolean[] }> = {
  redirect: {
    steps: [
      { name: "Tap tag", n: 1000 },
      { name: "Page loads", n: 620 },
      { name: "Type address", n: 300 },
      { name: "Type card", n: 210 },
      { name: "Order", n: 170 },
    ],
    data: [true, true, true, true, true],
  },
  native: {
    steps: [
      { name: "Tap tag", n: 1000 },
      { name: "Pick size", n: 780 },
      { name: "Order", n: 560 },
    ],
    data: [true, true, false, false, false],
  },
};
const FIELDS = ["Order", "Shipping address", "Email", "Marketing consent", "Browsing events"];

/** Shoppers who tap a tagged product: redirected to the brand's site or checking out inside the app. */
export function CheckoutRoutes() {
  const [route, setRoute] = useState<Route>("redirect");
  const id = "w6-checkout";
  const r = ROUTES[route];
  const bw = route === "redirect" ? 76 : 120;
  const gap = route === "redirect" ? 18 : 30;
  const last = r.steps[r.steps.length - 1].n;
  return (
    <div>
      <Frame
        width={800}
        height={310}
        label={`${route === "redirect" ? "External link" : "Native checkout"}: of 1,000 shoppers who tap a tagged product, ${last} place an order after ${r.steps.length - 1} steps. The merchant receives ${FIELDS.filter((_, k) => r.data[k]).join(", ").toLowerCase()}${route === "native" ? ", while email, marketing consent and browsing events stay with the platform" : ""}.`}
        svgProps={{ "data-plate": "checkout-routes" }}
      >
        <HalftoneDefs id={id} />
        <line x1={30} y1={250} x2={510} y2={250} {...ink} />
        {r.steps.map((s, k) => {
          const x = 36 + k * (bw + gap);
          const h = r2((s.n / 1000) * 200);
          const end = k === r.steps.length - 1;
          return (
            <g key={s.name}>
              <rect x={x} y={250 - h} width={bw} height={h} fill={end ? CAT.amber : ht(id, "light")} {...ink} />
              <Price x={x + bw / 2} y={242 - h} size={16} anchor="middle" fill={end ? CAT.amberText : CAT.ink}>{fmt(s.n)}</Price>
              <CatKey x={x + bw / 2} y={272} size={14} anchor="middle">{s.name}</CatKey>
            </g>
          );
        })}
        <CatKey x={30} y={300} size={14}>Shoppers left at each step</CatKey>
        <Tile x={560} y={30} w={215} h={250} />
        <CatKey x={578} y={58} size={14}>Merchant receives</CatKey>
        <line x1={578} y1={70} x2={757} y2={70} {...hair} />
        {FIELDS.map((f, k) => {
          const y = 102 + k * 38;
          const on = r.data[k];
          return (
            <g key={f}>
              <rect x={578} y={y - 13} width={16} height={16} fill={CAT.tile} {...ink} />
              {on ? <path d={`M581 ${y - 5}L585 ${y}L592 ${y - 10}`} fill="none" stroke={CAT.ink} strokeWidth={2} /> : <path d={`M581 ${y - 10}L591 ${y}M591 ${y - 10}L581 ${y}`} fill="none" stroke={CAT.ink} strokeWidth={1.4} />}
              <CatKey x={604} y={y} size={14}>{f}</CatKey>
            </g>
          );
        })}
      </Frame>
      <Segmented<Route>
        label="After the tap"
        value={route}
        onChange={setRoute}
        options={[
          { id: "redirect", label: "External link" },
          { id: "native", label: "Native checkout" },
        ]}
      />
    </div>
  );
}

/* ------------------------------------------------------------------------ */

/** A small serum dropper bottle, centred on (cx, cy), about 26 × 64. */
function Serum({ id, cx, cy }: { id: string; cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx} ${cy})`} strokeLinejoin="round">
      <path d="M-5 -32H5V-20H-5Z" fill={CAT.ink} />
      <rect x={-7} y={-20} width={14} height={8} fill={CAT.tile} {...ink} />
      <path d="M-7 -12H7Q14 -10 14 -2V28Q14 32 10 32H-10Q-14 32 -14 28V-2Q-14 -10 -7 -12Z" fill={ht(id, "light")} {...ink} />
      <path d="M6 -11Q14 -10 14 -2V28Q14 32 10 32H6Z" fill={ht(id, "dense")} />
      <rect x={-11} y={4} width={22} height={14} fill={CAT.tile} {...hair} />
    </g>
  );
}

/** Human creator or virtual influencer, endorsing a symbolic product or an experience good. */
export function EndorserGrid() {
  const id = "w6-endorser";
  const cells = [
    { row: 0, col: 0, claim: "Wore it all week" },
    { row: 0, col: 1, claim: "Healed my skin" },
    { row: 1, col: 0, claim: "Styled in it" },
    { row: 1, col: 1, claim: "Healed my skin?" },
  ];
  return (
    <Frame
      width={800}
      height={350}
      label="A two by two grid. A human creator says a fashion jacket was worn all week and a skincare serum healed their skin. A virtual influencer, drawn in purple, is styled in the jacket, but its claim that the serum healed its skin is struck through and marked in amber, because it has no skin and no lived experience."
      svgProps={{ "data-plate": "endorser-grid" }}
    >
      <HalftoneDefs id={id} />
      <CatKey x={330} y={30} size={15} anchor="middle">Fashion</CatKey>
      <CatKey x={630} y={30} size={15} anchor="middle">Skincare</CatKey>
      <CatKey x={30} y={115} size={15}>Human</CatKey>
      <CatKey x={30} y={135} size={15}>creator</CatKey>
      <CatKey x={30} y={270} size={15}>Virtual</CatKey>
      <CatKey x={30} y={290} size={15}>influencer</CatKey>
      {cells.map((c) => {
        const x = 185 + c.col * 300;
        const y = 44 + c.row * 152;
        const flag = c.row === 1 && c.col === 1;
        return (
          <g key={`${c.row}${c.col}`}>
            {flag ? <rect x={x - 6} y={y - 6} width={302} height={152} fill={CAT.amber} {...ink} /> : null}
            <Tile x={x} y={y} w={290} h={140} />
            <Person id={id} cx={x + 46} cy={y + 62} s={1.25} tone={c.row ? "purple" : "ink"} />
            {c.col === 0 ? (
              <g transform={`translate(${x + 112} ${y + 70}) scale(0.62)`}>
                <Jacket id={id} cx={0} cy={0} />
              </g>
            ) : (
              <Serum id={id} cx={x + 112} cy={y + 76} />
            )}
            <path d={`M${x + 162} ${y + 26}H${x + 282}V${y + 66}H${x + 186}L${x + 174} ${y + 78}V${y + 66}H${x + 162}Z`} fill={CAT.tile} {...ink} />
            <CatKey x={x + 222} y={y + 51} size={14} anchor="middle" fill={flag ? CAT.amberText : CAT.ink}>{c.claim}</CatKey>
            {flag ? <line x1={x + 168} y1={y + 46} x2={x + 276} y2={y + 47} stroke={CAT.ink} strokeWidth={1.4} /> : null}
          </g>
        );
      })}
    </Frame>
  );
}

