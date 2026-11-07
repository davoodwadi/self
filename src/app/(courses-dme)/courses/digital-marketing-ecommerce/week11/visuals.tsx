"use client";

import React, { useState } from "react";
import { Arrow, CAT, CatKey, Frame, HalftoneDefs, LINE, Price, Segmented, Slider, head, ht, r2 } from "../_visuals/kit";
import { Cart, Coin, Envelope, Laptop, Parcel, PayCard, Person, Sneaker } from "../_visuals/objects";

const ink = { stroke: CAT.ink, strokeWidth: LINE.outline, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
const hair = { stroke: CAT.ink, strokeWidth: LINE.hair, strokeLinecap: "round" as const };
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";
const fmt = (n: number) => Math.round(n).toLocaleString("en-US");
const money = (n: number) => `${n < 0 ? "−" : ""}$${Math.abs(Math.round(n)).toLocaleString("en-US")}`;
const pct = (n: number) => `${Math.round(n * 100)}%`;

/** Mono text for things printed in code: event names, parameters, URLs, log lines. */
function Code({ x, y, children, size = 14, anchor = "start", weight = 400 }: { x: number; y: number; children: React.ReactNode; size?: number; anchor?: "start" | "middle" | "end"; weight?: number }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontFamily={MONO} fontSize={size} fontWeight={weight} fill={CAT.ink}>
      {children}
    </text>
  );
}

/* ---------------------------------------------------------------------------
   Week 11 cast
   ------------------------------------------------------------------------ */

/** A phone centred on (cx, cy) playing a creator's video: the creator in the screen, a play mark. */
function VideoPhone({ id, cx, cy }: { id: string; cx: number; cy: number }) {
  return (
    <g>
      <rect x={cx - 17} y={cy - 30} width={34} height={60} rx={5} fill={CAT.tile} {...ink} />
      <rect x={cx - 13} y={cy - 23} width={26} height={44} fill={CAT.tile} {...hair} />
      <Person id={id} cx={cx} cy={cy - 2} s={0.42} />
      <path d={`M${cx - 4} ${cy + 8}L${cx + 5} ${cy + 13}L${cx - 4} ${cy + 18}Z`} fill={CAT.ink} />
    </g>
  );
}

/** A search box with a sponsored result under it, centred on (cx, cy). */
function SearchAd({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <rect x={cx - 48} y={cy - 28} width={96} height={20} rx={10} fill={CAT.tile} {...ink} />
      <circle cx={cx + 34} cy={cy - 19} r={4} fill="none" {...ink} />
      <line x1={cx + 37} y1={cy - 16} x2={cx + 40} y2={cy - 13} {...ink} />
      <rect x={cx - 48} y={cy - 2} width={96} height={30} fill={CAT.tile} {...ink} />
      <CatKey x={cx - 43} y={cy + 19} size={15}>Ad</CatKey>
      <line x1={cx - 18} y1={cy + 8} x2={cx + 38} y2={cy + 8} {...hair} />
      <line x1={cx - 18} y1={cy + 19} x2={cx + 24} y2={cy + 19} {...hair} />
    </g>
  );
}

/** A printed page centred on (cx, cy): title bar and text lines. */
function PageGlyph({ id, cx, cy }: { id: string; cx: number; cy: number }) {
  return (
    <g>
      <rect x={cx - 17} y={cy - 22} width={34} height={44} fill={CAT.tile} {...ink} />
      <rect x={cx - 12} y={cy - 17} width={24} height={12} fill={ht(id, "light")} {...hair} />
      {[0, 1, 2].map((k) => (
        <line key={k} x1={cx - 12} y1={cy + k * 6} x2={cx + (k === 2 ? 4 : 12)} y2={cy + k * 6} {...hair} />
      ))}
    </g>
  );
}

/* ---------------------------------------------------------------------------
   The Measurement Paradox: platforms claiming the same orders
   ------------------------------------------------------------------------ */

const CLAIMS: { key: string; orders: number[] }[] = [
  { key: "Social ads claim", orders: [0, 1, 3, 4, 6, 8] },
  { key: "Search ads claim", orders: [1, 2, 3, 5, 8] },
  { key: "Email claims", orders: [3, 5, 7, 9] },
];

export function ClaimedOrders() {
  const id = "w11-claimed";
  const X = (i: number) => 214 + i * 57;
  const ROW = [116, 168, 220];
  const total = CLAIMS.reduce((s, c) => s + c.orders.length, 0);
  return (
    <Frame width={800} height={296} label={`Ten orders shipped. Social ads claim 6 of them, search ads claim 5 and email claims 4, so the platforms claim ${total} orders between them. The fourth order is claimed by all three.`} svgProps={{ "data-plate": "claimed-orders" }}>
      <HalftoneDefs id={id} />
      {Array.from({ length: 10 }, (_, i) => (
        <line key={i} x1={r2(X(i) + 17)} y1={86} x2={r2(X(i) + 17)} y2={236} stroke={CAT.ink} strokeWidth={LINE.hair} strokeDasharray="1.5 3" />
      ))}
      <CatKey x={16} y={62} size={17}>Orders shipped</CatKey>
      <Price x={190} y={62} size={19} anchor="end">10</Price>
      {Array.from({ length: 10 }, (_, i) => (
        <Parcel key={i} id={id} x={X(i)} y={42} w={34} h={28} tone={i === 3 ? "amber" : "ink"} />
      ))}
      {CLAIMS.map((c, r) => (
        <g key={c.key}>
          <CatKey x={16} y={ROW[r] + 4} size={17}>{c.key}</CatKey>
          <Price x={190} y={ROW[r] + 4} size={19} anchor="end">{c.orders.length}</Price>
          {c.orders.map((o) => (
            <Parcel key={o} id={id} x={X(o) + 6} y={ROW[r] - 10} w={22} h={18} tone={o === 3 ? "amber" : "ink"} />
          ))}
        </g>
      ))}
      <line x1={16} y1={250} x2={784} y2={250} {...ink} />
      <CatKey x={16} y={280} size={17}>Orders claimed</CatKey>
      <Price x={190} y={280} size={19} anchor="end">{total}</Price>
      <CatKey x={214} y={280} size={16} fill={CAT.amberText}>One order, claimed three times</CatKey>
    </Frame>
  );
}

/* ---------------------------------------------------------------------------
   Event tracking: one visit as events, counted client-side and server-side
   ------------------------------------------------------------------------ */

const EVENTS: { name: string; params: string[] }[] = [
  { name: "page_view", params: ["page: /sneaker", "source: creator"] },
  { name: "view_item", params: ["item_id: SN-42", "price: 150"] },
  { name: "add_to_cart", params: ["item_id: SN-42", "quantity: 1"] },
  { name: "begin_checkout", params: ["value: 150", "coupon: SPRING"] },
  { name: "purchase", params: ["value: 150", "currency: USD"] },
];
const TIMEOUTS = 3;

export function EventStream() {
  const [block, setBlock] = useState(25);
  const id = "w11-events";
  const client = 100 - block - TIMEOUTS;
  const TW = 148;
  const TX = (i: number) => 6 + i * 160;
  const TY = 74;
  const TH = 150;
  const glyph = (i: number, cx: number, cy: number) => {
    if (i === 0) return <PageGlyph id={id} cx={cx} cy={cy} />;
    if (i === 1) return <Sneaker id={id} cx={cx} cy={cy + 2} s={0.95} />;
    if (i === 2) return <Cart id={id} cx={cx} cy={cy} s={1.5} />;
    if (i === 3) return <PayCard id={id} x={cx - 24} y={cy - 15} w={48} h={30} />;
    return <Parcel id={id} x={cx - 18} y={cy - 10} w={32} h={26} />;
  };
  const squares = (y: number, missingFrom: number, server: boolean) =>
    Array.from({ length: 100 }, (_, k) => {
      const missed = k >= missingFrom;
      const x = r2(6 + (k % 50) * 15.7);
      const yy = y + Math.floor(k / 50) * 16;
      const fill = !missed ? ht(id, "dense") : server ? CAT.amber : CAT.tile;
      return <rect key={k} x={x} y={yy} width={12} height={12} fill={fill} {...ink} strokeWidth={0.8} />;
    });
  return (
    <div>
      <Frame width={800} height={390} label={`A visit from a tagged campaign link fires page_view, view_item, add_to_cart, begin_checkout and purchase. With ${block}% of shoppers blocking browser tags, client-side tags count ${client} of 100 purchases and server-side tagging counts all 100.`} svgProps={{ "data-plate": "event-stream" }}>
        <HalftoneDefs id={id} />
        <rect x={6} y={12} width={788} height={30} rx={15} fill={CAT.tile} {...ink} />
        <Code x={24} y={32} size={14.5}>shop.example/sneaker?utm_source=creator&amp;utm_medium=social&amp;utm_campaign=spring</Code>
        <Arrow x1={80} y1={44} x2={80} y2={TY - 3} />
        {EVENTS.map((e, i) => {
          const x = TX(i);
          return (
            <g key={e.name}>
              <rect x={x} y={TY} width={TW} height={TH} fill={CAT.tile} {...ink} />
              <Code x={x + 10} y={TY + 24} size={15} weight={600}>{e.name}</Code>
              <line x1={x} y1={TY + 34} x2={x + TW} y2={TY + 34} {...hair} />
              {glyph(i, x + TW / 2, TY + 70)}
              {e.params.map((p, k) => (
                <Code key={p} x={x + 10} y={TY + 116 + k * 20} size={14}>{p}</Code>
              ))}
              {i < 4 ? <path d={head.right(x + TW + 10, TY + TH / 2, 7)} fill="none" {...ink} /> : null}
            </g>
          );
        })}
        <CatKey x={6} y={258} size={16}>Client-side tags</CatKey>
        <Price x={794} y={258} size={16} anchor="end">{`${client} of 100 purchases counted`}</Price>
        {squares(266, client, false)}
        <CatKey x={6} y={330} size={16}>Server-side tagging</CatKey>
        <Price x={794} y={330} size={16} anchor="end" fill={CAT.amberText}>{`100 of 100 counted, ${100 - client} recovered`}</Price>
        {squares(338, client, true)}
      </Frame>
      <Slider label="Shoppers blocking browser tags" min={0} max={40} value={block} onChange={setBlock} formatValue={(v) => `${v}%`} />
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Cohort retention table versus the aggregate
   ------------------------------------------------------------------------ */

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

function cohorts(g: number) {
  return MONTHS.map((_, c) => {
    const size = 1000 * Math.pow(1 + g, c);
    const first = 0.45 - (g / 0.4) * 0.05 * c;
    const ret = (m: number) => (m === 0 ? 1 : first * Math.pow(0.8, m - 1));
    return { size, ret };
  });
}

export function CohortTable() {
  const [growth, setGrowth] = useState(30);
  const id = "w11-cohort";
  const g = growth / 100;
  const rows = cohorts(g);
  const active = MONTHS.map((_, t) => rows.slice(0, t + 1).reduce((s, r, c) => s + r.size * r.ret(t - c), 0));
  const RY = (c: number) => 52 + c * 40;
  const CX = (m: number) => 140 + (m - 1) * 70;
  const LX0 = 568;
  const LX1 = 776;
  const LY0 = 262;
  const LY1 = 70;
  const MAX = 11000;
  const lx = (t: number) => r2(LX0 + (t / 5) * (LX1 - LX0));
  const ly = (v: number) => r2(LY0 - (v / MAX) * (LY0 - LY1));
  return (
    <div>
      <Frame width={800} height={316} label={`With paid acquisition growing ${growth}% a month, active customers rise from ${fmt(active[0])} in January to ${fmt(active[5])} in June, while Month 1 retention falls from ${pct(rows[0].ret(1))} for the January cohort to ${pct(rows[4].ret(1))} for the May cohort.`} svgProps={{ "data-plate": "cohort-table" }}>
        <HalftoneDefs id={id} />
        <CatKey x={8} y={24} size={15}>Cohort</CatKey>
        <CatKey x={104} y={24} size={15} anchor="end">New</CatKey>
        {[1, 2, 3, 4, 5].map((m) => (
          <CatKey key={m} x={CX(m) + 32} y={24} size={15} anchor="middle">{`Month ${m}`}</CatKey>
        ))}
        <line x1={8} y1={34} x2={490} y2={34} {...ink} />
        {rows.map((r, c) => (
          <g key={c}>
            <CatKey x={8} y={RY(c) + 22} size={15}>{MONTHS[c]}</CatKey>
            <Price x={104} y={RY(c) + 22} size={15} anchor="end">{fmt(r.size)}</Price>
            {[1, 2, 3, 4, 5].filter((m) => c + m <= 5).map((m) => {
              const v = r.ret(m);
              const w = r2((v / 0.5) * 60);
              return (
                <g key={m}>
                  <rect x={CX(m)} y={RY(c)} width={64} height={34} fill={CAT.tile} {...ink} strokeWidth={0.8} />
                  <Price x={CX(m) + 32} y={RY(c) + 19} size={15} anchor="middle">{pct(v)}</Price>
                  <rect x={CX(m) + 2} y={RY(c) + 25} width={w} height={6} fill={m === 1 ? CAT.amber : ht(id, "dense")} {...ink} strokeWidth={0.6} />
                </g>
              );
            })}
          </g>
        ))}
        <CatKey x={LX0 - 16} y={24} size={15}>Active customers</CatKey>
        <line x1={LX0} y1={LY0} x2={LX1} y2={LY0} {...ink} />
        <path d={active.map((v, t) => `${t ? "L" : "M"}${lx(t)} ${ly(v)}`).join("")} fill="none" {...ink} strokeWidth={1.6} />
        {active.map((v, t) => (
          <circle key={t} cx={lx(t)} cy={ly(v)} r={3.5} fill={CAT.tile} {...ink} />
        ))}
        <Price x={lx(0)} y={ly(active[0]) + 24} size={15} anchor="start">{fmt(active[0])}</Price>
        <Price x={lx(5)} y={ly(active[5]) - 10} size={15} anchor="end">{fmt(active[5])}</Price>
        {MONTHS.map((mo, t) => (
          <CatKey key={mo} x={lx(t)} y={LY0 + 22} size={14} anchor="middle">{mo}</CatKey>
        ))}
      </Frame>
      <Slider label="Paid acquisition growth per month" min={0} max={40} step={5} value={growth} onChange={setGrowth} formatValue={(v) => `${v}%`} />
    </div>
  );
}

/* ---------------------------------------------------------------------------
   CAC payback and CLV
   ------------------------------------------------------------------------ */

const FIRST_CM = 30;
const MONTH_CM = 12;

function payback(cac: number, s: number) {
  const cum = Array.from({ length: 25 }, (_, m) => FIRST_CM + MONTH_CM * Array.from({ length: m }, (_, k) => Math.pow(s, k + 1)).reduce((a, b) => a + b, 0));
  const month = cum.findIndex((v) => v >= cac);
  const clv = FIRST_CM + Array.from({ length: 60 }, (_, k) => (MONTH_CM * Math.pow(s, k + 1)) / Math.pow(1.01, k + 1)).reduce((a, b) => a + b, 0);
  return { cum, month, clv };
}

export function PaybackCurve() {
  const [cac, setCac] = useState(60);
  const [ret, setRet] = useState(88);
  const id = "w11-payback";
  const { cum, month, clv } = payback(cac, ret / 100);
  const X0 = 70;
  const BW = 22;
  const STEP = 28.6;
  const Y0 = 270;
  const MAX = 250;
  const y = (v: number) => r2(Y0 - (Math.min(v, MAX) / MAX) * 190);
  return (
    <div>
      <Frame width={800} height={330} label={`With an acquisition cost of ${money(cac)} and ${ret}% of customers buying again each month, ${month >= 0 ? `cumulative contribution margin pays back the acquisition cost in month ${month}` : "the acquisition cost is not paid back within 24 months"}. CLV is ${money(clv)} and LTV to CAC is ${(clv / cac).toFixed(1)}.`} svgProps={{ "data-plate": "payback-curve" }}>
        <HalftoneDefs id={id} />
        <CatKey x={X0 - 50} y={28} size={16}>{`Acquisition cost ${money(cac)}`}</CatKey>
        <CatKey x={430} y={28} size={16}>{`CLV ${money(clv)}`}</CatKey>
        <CatKey x={780} y={28} size={16} anchor="end">{`LTV to CAC ${(clv / cac).toFixed(1)}`}</CatKey>
        {[0, 100, 200].map((v) => (
          <g key={v}>
            <line x1={X0 - 6} y1={y(v)} x2={X0 + 24 * STEP + BW + 4} y2={y(v)} {...hair} strokeDasharray={v ? "1.5 3" : undefined} />
            <Price x={X0 - 10} y={y(v) + 5} size={14} anchor="end">{`$${v}`}</Price>
          </g>
        ))}
        {cum.map((v, m) => (
          <rect key={m} x={r2(X0 + m * STEP)} y={y(v)} width={BW} height={r2(Y0 - y(v))} fill={m === month ? CAT.amber : m > month && month >= 0 ? ht(id, "dense") : ht(id, "light")} {...ink} strokeWidth={0.8} />
        ))}
        <line x1={X0 - 6} y1={y(cac)} x2={X0 + 24 * STEP + BW + 4} y2={y(cac)} {...ink} strokeWidth={1.6} />
        {month >= 0 ? (
          <g>
            <line x1={r2(X0 + month * STEP + BW / 2)} y1={74} x2={r2(X0 + month * STEP + BW / 2)} y2={r2(y(cum[month]) - 5)} stroke={CAT.ink} strokeWidth={LINE.hair} />
            <CatKey x={r2(X0 + month * STEP + (month < 14 ? 0 : BW))} y={66} size={16} anchor={month < 14 ? "start" : "end"} fill={CAT.amberText}>{`Paid back in month ${month}`}</CatKey>
          </g>
        ) : (
          <CatKey x={X0 + 24 * STEP + BW} y={66} size={16} anchor="end" fill={CAT.amberText}>Not paid back within 24 months</CatKey>
        )}
        <line x1={X0 - 6} y1={Y0} x2={X0 + 24 * STEP + BW + 4} y2={Y0} {...ink} />
        {[0, 6, 12, 18, 24].map((m) => (
          <Price key={m} x={r2(X0 + m * STEP + BW / 2)} y={Y0 + 20} size={14} anchor="middle">{m}</Price>
        ))}
        <CatKey x={400} y={Y0 + 46} size={15} anchor="middle">Months since first order: cumulative contribution margin</CatKey>
      </Frame>
      <Slider label="Acquisition cost" min={40} max={200} step={5} value={cac} onChange={setCac} formatValue={(v) => `$${v}`} />
      <Slider label="Customers who buy again each month" min={60} max={95} value={ret} onChange={setRet} formatValue={(v) => `${v}%`} />
    </div>
  );
}

/* ---------------------------------------------------------------------------
   ROAS versus contribution margin: $1,000 → $4,000 → $800
   ------------------------------------------------------------------------ */

function Stack({ id, cx, base, n, amberTop = 0 }: { id: string; cx: number; base: number; n: number; amberTop?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, k) => (
        <Coin key={k} id={id} cx={cx} cy={r2(base - k * 6)} rx={20} ry={5} t={6} />
      ))}
      {Array.from({ length: amberTop }, (_, k) => {
        const cy = r2(base - (n + k) * 6);
        return (
          <g key={`a${k}`}>
            <path d={`M${cx - 20} ${cy}v6a20 5 0 0 0 40 0v-6`} fill="none" {...ink} strokeDasharray="2.5 2" />
            <ellipse cx={cx} cy={cy} rx={20} ry={5} fill="none" {...ink} strokeDasharray="2.5 2" />
          </g>
        );
      })}
    </g>
  );
}

export function RoasMargin() {
  const id = "w11-roas";
  const B = 196;
  return (
    <Frame width={800} height={262} label="$1,000 of ad spend brings $4,000 of attributed revenue, a 4.0x ROAS. At a 20% contribution margin that revenue leaves $800, which is $200 short of the ad spend." svgProps={{ "data-plate": "roas-margin" }}>
      <HalftoneDefs id={id} />
      <Price x={70} y={112} size={22} anchor="middle">$1,000</Price>
      <Stack id={id} cx={70} base={B} n={10} />
      <CatKey x={70} y={236} size={18} anchor="middle">Ad spend</CatKey>

      <Arrow x1={112} y1={172} x2={204} y2={172} />
      <CatKey x={158} y={160} size={17} anchor="middle">4.0x ROAS</CatKey>

      <Price x={309} y={112} size={22} anchor="middle">$4,000</Price>
      {[240, 286, 332, 378].map((cx) => (
        <Stack key={cx} id={id} cx={cx} base={B} n={10} />
      ))}
      <CatKey x={309} y={236} size={18} anchor="middle">Attributed revenue</CatKey>

      <Arrow x1={418} y1={172} x2={574} y2={172} />
      <CatKey x={496} y={160} size={17} anchor="middle">20% margin</CatKey>

      <Price x={630} y={112} size={22} anchor="middle">$800</Price>
      <Stack id={id} cx={630} base={B} n={8} amberTop={2} />
      <Price x={660} y={r2(B - 9 * 6 + 10)} size={22} fill={CAT.amberText}>−$200</Price>
      <CatKey x={630} y={236} size={18} anchor="middle">Contribution margin</CatKey>
    </Frame>
  );
}

/* ---------------------------------------------------------------------------
   Average versus marginal ROAS as the budget scales
   ------------------------------------------------------------------------ */

const RESP = { A: 60000, k: 6000 };
const BREAK_EVEN = 5;
const avgRoas = (b: number) => (RESP.A * (1 - Math.exp(-b / RESP.k))) / b;
const margRoas = (b: number) => (RESP.A / RESP.k) * Math.exp(-b / RESP.k);
const BUDGETS = Array.from({ length: 41 }, (_, i) => 250 + i * 243.75);

export function MarginalRoas() {
  const [budget, setBudget] = useState(6000);
  const X0 = 74;
  const X1 = 772;
  const Y0 = 250;
  const k = 20;
  const x = (b: number) => r2(X0 + (b / 10000) * (X1 - X0));
  const y = (v: number) => r2(Y0 - Math.min(v, 10) * k);
  const a = avgRoas(budget);
  const m = margRoas(budget);
  const line = (f: (b: number) => number) => BUDGETS.map((b, i) => `${i ? "L" : "M"}${x(b)} ${y(f(b))}`).join("");
  return (
    <div>
      <Frame width={800} height={316} label={`At a daily budget of ${money(budget)}, average ROAS is ${a.toFixed(1)}x and the last dollar returns ${m.toFixed(1)}x, against a break-even of 5.0x at a 20% margin.`} svgProps={{ "data-plate": "marginal-roas" }}>
        <CatKey x={X0 - 50} y={26} size={18}>{`Average ${a.toFixed(1)}x`}</CatKey>
        <CatKey x={X0 + 140} y={26} size={18} fill={CAT.amberText}>{`Last dollar ${m.toFixed(1)}x`}</CatKey>
        {[0, 5, 10].map((v) => (
          <Price key={v} x={X0 - 10} y={y(v) + 6} size={17} anchor="end">{`${v}x`}</Price>
        ))}
        <line x1={X0} y1={y(BREAK_EVEN)} x2={X1} y2={y(BREAK_EVEN)} stroke={CAT.ink} strokeWidth={0.9} strokeDasharray="4 3" />
        <CatKey x={X1} y={y(BREAK_EVEN) + 22} size={17} anchor="end">Break-even at 20% margin</CatKey>
        <line x1={x(budget)} y1={y(10) - 4} x2={x(budget)} y2={Y0} stroke={CAT.ink} strokeWidth={0.8} strokeDasharray="2 3" />
        <path d={line(avgRoas)} fill="none" {...ink} strokeWidth={1.8} />
        <path d={line(margRoas)} fill="none" stroke={CAT.ink} strokeWidth={4.2} strokeLinecap="round" />
        <path d={line(margRoas)} fill="none" stroke={CAT.amber} strokeWidth={2.2} strokeLinecap="round" />
        <CatKey x={x(7600)} y={y(avgRoas(7600)) - 12} size={17} anchor="middle">Average ROAS</CatKey>
        <CatKey x={x(7600)} y={y(margRoas(7600)) + 28} size={17} anchor="middle" fill={CAT.amberText}>Last dollar ROAS</CatKey>
        <circle cx={x(budget)} cy={y(a)} r={5} fill={CAT.tile} {...ink} />
        <circle cx={x(budget)} cy={y(m)} r={5.5} fill={CAT.amber} {...ink} />
        <line x1={X0} y1={Y0} x2={X1} y2={Y0} {...ink} />
        {[0, 2500, 5000, 7500, 10000].map((b) => (
          <Price key={b} x={x(b)} y={Y0 + 24} size={17} anchor={b === 0 ? "start" : b === 10000 ? "end" : "middle"}>{money(b)}</Price>
        ))}
        <CatKey x={(X0 + X1) / 2} y={Y0 + 54} size={17} anchor="middle">Daily ad budget</CatKey>
      </Frame>
      <Slider label="Daily ad budget" min={500} max={10000} step={250} value={budget} onChange={setBudget} formatValue={(v) => money(v)} />
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Attribution rules across one journey
   ------------------------------------------------------------------------ */

type Rule = "last" | "first" | "linear" | "decay" | "u" | "shapley";

/** Probability each channel alone turns a shopper into a buyer, for the Shapley game. */
const SOLO = [0.2, 0.12, 0.06, 0.02];
const value = (set: number[]) => 1 - set.reduce((p, i) => p * (1 - SOLO[i]), 1);
const fact = (n: number): number => (n <= 1 ? 1 : n * fact(n - 1));

function shapley() {
  const n = SOLO.length;
  const subsets = Array.from({ length: 1 << n }, (_, mask) => SOLO.map((_, i) => i).filter((i) => mask & (1 << i)));
  const phi = SOLO.map((_, i) =>
    subsets
      .filter((S) => !S.includes(i))
      .reduce((s, S) => s + ((fact(S.length) * fact(n - S.length - 1)) / fact(n)) * (value([...S, i]) - value(S)), 0),
  );
  const total = phi.reduce((a, b) => a + b, 0);
  return phi.map((p) => p / total);
}

/** Round shares to whole percents that add to 100. */
function to100(w: number[]) {
  const t = w.reduce((a, b) => a + b, 0);
  const raw = w.map((v) => (v / t) * 100);
  const base = raw.map(Math.floor);
  const short = 100 - base.reduce((a, b) => a + b, 0);
  const order = raw.map((v, i) => ({ i, r: v - Math.floor(v) })).sort((p, q) => q.r - p.r).slice(0, short).map((o) => o.i);
  return base.map((v, i) => (order.includes(i) ? v + 1 : v));
}

const CREDIT: Record<Rule, number[]> = {
  last: [0, 0, 0, 100],
  first: [100, 0, 0, 0],
  linear: [25, 25, 25, 25],
  decay: to100([6, 4, 2, 0].map((d) => Math.pow(2, -d / 2))),
  u: [40, 10, 10, 40],
  shapley: to100(shapley()),
};

const RULES: { id: Rule; label: string }[] = [
  { id: "last", label: "Last touch" },
  { id: "first", label: "First touch" },
  { id: "linear", label: "Linear" },
  { id: "decay", label: "Time decay" },
  { id: "u", label: "U-shaped" },
  { id: "shapley", label: "Shapley value" },
];

export function AttributionRules() {
  const [rule, setRule] = useState<Rule>("last");
  const id = "w11-mta";
  const credit = CREDIT[rule];
  const top = Math.max(...credit);
  const unique = credit.filter((c) => c === top).length === 1;
  const CX = [80, 250, 420, 590];
  const DAYS = ["Monday", "Wednesday", "Friday", "Sunday"];
  const IY = 82;
  const B0 = 300;
  const BH = 130;
  return (
    <div>
      <Frame width={800} height={334} label={`${RULES.find((r) => r.id === rule)?.label} attribution gives the creator video ${credit[0]}%, paid search ${credit[1]}%, the email ${credit[2]}% and the direct visit ${credit[3]}% of the order's credit.`} svgProps={{ "data-plate": "attribution-rules" }}>
        <HalftoneDefs id={id} />
        {DAYS.map((d, i) => (
          <CatKey key={d} x={CX[i]} y={24} size={16} anchor="middle">{d}</CatKey>
        ))}
        <CatKey x={738} y={24} size={16} anchor="middle">Purchase</CatKey>
        <VideoPhone id={id} cx={CX[0]} cy={IY} />
        <SearchAd cx={CX[1]} cy={IY} />
        <Envelope id={id} x={CX[2] - 32} y={IY - 22} w={64} h={44} />
        <g>
          <Laptop x={CX[3] - 28} y={IY - 24} />
          <rect x={CX[3] - 24} y={IY - 20} width={48} height={9} fill={CAT.tile} {...hair} />
        </g>
        <Parcel id={id} x={720} y={IY - 14} w={34} h={30} />
        {[0, 1, 2, 3].map((i) => (
          <Arrow key={i} x1={CX[i] + (i === 1 ? 56 : 40)} y1={IY} x2={i < 3 ? CX[i + 1] - (i === 0 ? 56 : 42) : 708} y2={IY} />
        ))}
        {credit.map((c, i) => {
          const h = r2((c / 100) * BH);
          return (
            <g key={i}>
              {c > 0 ? <rect x={CX[i] - 30} y={r2(B0 - h)} width={60} height={h} fill={unique && c === top ? CAT.amber : ht(id, "light")} {...ink} /> : null}
              <Price x={CX[i]} y={r2(B0 - h - 10)} size={19} anchor="middle" fill={unique && c === top ? CAT.amberText : CAT.ink}>{`${c}%`}</Price>
            </g>
          );
        })}
        <line x1={20} y1={B0} x2={660} y2={B0} {...ink} />
        <CatKey x={340} y={B0 + 26} size={16} anchor="middle">Share of the order&apos;s credit</CatKey>
      </Frame>
      <Segmented label="Attribution model" options={RULES} value={rule} onChange={setRule} />
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Holdout experiment: attributed conversions versus incremental lift
   ------------------------------------------------------------------------ */

const TREATED_BUY = 30;

export function HoldoutLift() {
  const [anyway, setAnyway] = useState(22);
  const id = "w11-holdout";
  const lift = TREATED_BUY - anyway;
  const grid = (x0: number, treated: boolean) =>
    Array.from({ length: 100 }, (_, k) => {
      const fill = k < anyway ? ht(id, "dense") : treated && k < TREATED_BUY ? CAT.amber : CAT.tile;
      return <rect key={k} x={r2(x0 + (k % 10) * 21)} y={r2(56 + Math.floor(k / 10) * 21)} width={17} height={17} fill={fill} {...ink} strokeWidth={0.8} />;
    });
  return (
    <div>
      <Frame width={800} height={300} label={`Of 100 customers shown retargeting ads, 30 buy, and the ads are credited with all 30. Of 100 in the holdout who see no ads, ${anyway} buy anyway, so the incremental lift is ${lift} orders.`} svgProps={{ "data-plate": "holdout-lift" }}>
        <HalftoneDefs id={id} />
        <CatKey x={20} y={34} size={18}>Shown the ads</CatKey>
        <CatKey x={290} y={34} size={18}>Holdout, no ads</CatKey>
        {grid(20, true)}
        {grid(290, false)}
        <Price x={20} y={290} size={18}>{`${TREATED_BUY} of 100 buy`}</Price>
        <Price x={290} y={290} size={18}>{`${anyway} of 100 buy`}</Price>
        <CatKey x={566} y={70} size={18}>Credited to the ads</CatKey>
        <Price x={566} y={110} size={34}>{TREATED_BUY}</Price>
        <CatKey x={566} y={160} size={18}>Would buy anyway</CatKey>
        <Price x={566} y={200} size={34}>{anyway}</Price>
        <CatKey x={566} y={250} size={18} fill={CAT.amberText}>Incremental lift</CatKey>
        <Price x={566} y={290} size={34} fill={CAT.amberText}>{lift}</Price>
      </Frame>
      <Slider label="Targeted customers who would buy anyway" min={6} max={30} value={anyway} onChange={setAnyway} formatValue={(v) => `${v} of 100`} />
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Dark funnel: what analytics reports versus where buyers came from
   ------------------------------------------------------------------------ */

const RETURNING = 10;

function darkSplit(d: number) {
  const tracked = 100 - RETURNING - d;
  const social = Math.round(tracked * 0.4);
  const search = Math.round(tracked * 0.35);
  const email = tracked - social - search;
  const chat = Math.round(d * 0.55);
  return { social, search, email, chat, ai: d - chat };
}

export function DarkFunnel() {
  const [dark, setDark] = useState(35);
  const id = "w11-dark";
  const s = darkSplit(dark);
  const left: { key: string; n: number; darkPart?: number }[] = [
    { key: "Paid social", n: s.social },
    { key: "Paid search", n: s.search },
    { key: "Email", n: s.email },
    { key: "Direct or branded search", n: RETURNING + dark, darkPart: dark },
  ];
  const right: { key: string; n: number; amber?: boolean }[] = [
    { key: "Paid social", n: s.social },
    { key: "Paid search", n: s.search },
    { key: "Email", n: s.email },
    { key: "Returning customer", n: RETURNING },
    { key: "Group chat or podcast", n: s.chat, amber: true },
    { key: "AI assistant", n: s.ai, amber: true },
  ];
  const LB = 196;
  const lk = 2.4;
  const RB = 600;
  const rk = lk;
  return (
    <div>
      <Frame width={800} height={350} label={`Of 100 orders, ${dark} come from buyers who first heard of the product off-site. Analytics files them under Direct or branded search (${RETURNING + dark} orders), while the post-purchase survey finds ${s.chat} from group chats or podcasts and ${s.ai} from AI assistants.`} svgProps={{ "data-plate": "dark-funnel" }}>
        <HalftoneDefs id={id} />
        <CatKey x={8} y={24} size={16}>Web analytics report</CatKey>
        <line x1={8} y1={34} x2={372} y2={34} {...ink} />
        {left.map((r, i) => {
          const yy = 52 + i * 38;
          const lit = r.n - (r.darkPart ?? 0);
          return (
            <g key={r.key}>
              <CatKey x={8} y={yy + 15} size={15}>{r.key}</CatKey>
              <rect x={LB} y={yy} width={r2(lit * lk)} height={20} fill={ht(id, "light")} {...ink} strokeWidth={0.8} />
              {r.darkPart ? <rect x={r2(LB + lit * lk)} y={yy} width={r2(r.darkPart * lk)} height={20} fill={CAT.amber} {...ink} strokeWidth={0.8} /> : null}
              <Price x={r2(LB + r.n * lk + 6)} y={yy + 16} size={15}>{r.n}</Price>
            </g>
          );
        })}
        <CatKey x={8} y={232} size={16}>Server log</CatKey>
        <rect x={8} y={242} width={364} height={92} fill={CAT.tile} {...ink} />
        {[
          ["GET /sneaker", "ChatGPT-User"],
          ["GET /api/products", "PerplexityBot"],
          ["GET /sneaker/specs", "ClaudeBot"],
        ].map(([req, ua], k) => (
          <g key={ua}>
            <Code x={20} y={268 + k * 26} size={14}>{req}</Code>
            <Code x={360} y={268 + k * 26} size={14} anchor="end" weight={600}>{ua}</Code>
          </g>
        ))}

        <CatKey x={420} y={24} size={16}>&quot;How did you hear about us?&quot;</CatKey>
        <line x1={420} y1={34} x2={792} y2={34} {...ink} />
        {right.map((r, i) => {
          const yy = 52 + i * 38;
          return (
            <g key={r.key}>
              <CatKey x={420} y={yy + 15} size={15}>{r.key}</CatKey>
              <rect x={RB} y={yy} width={r2(Math.max(r.n, 0) * rk)} height={20} fill={r.amber ? CAT.amber : ht(id, "light")} {...ink} strokeWidth={0.8} />
              <Price x={r2(RB + r.n * rk + 6)} y={yy + 16} size={15}>{r.n}</Price>
            </g>
          );
        })}
      </Frame>
      <Slider label="Buyers who first heard of us off-site" min={10} max={60} step={5} value={dark} onChange={setDark} formatValue={(v) => `${v} of 100`} />
    </div>
  );
}
