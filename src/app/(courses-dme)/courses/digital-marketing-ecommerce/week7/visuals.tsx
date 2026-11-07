"use client";

import React, { useState } from "react";
import { Arrow, CAT, CatKey, Frame, HalftoneDefs, LINE, Price, Segmented, Slider, Tile, ht, r2, seeded } from "../_visuals/kit";
import { Backpack, Cart, CoffeeBag, Cursor, Envelope, Espresso, Laptop, Monitor, Parcel, Person } from "../_visuals/objects";

const ink = { stroke: CAT.ink, strokeWidth: LINE.outline, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
const hair = { stroke: CAT.ink, strokeWidth: LINE.hair, strokeLinecap: "round" as const };
const fmt = (n: number) => Math.round(n).toLocaleString("en-US");
const money = (n: number) => `${n < 0 ? "−" : ""}$${Math.abs(Math.round(n)).toLocaleString("en-US")}`;

/* ---------------------------------------------------------------------------
   Week 7 cast
   ------------------------------------------------------------------------ */

/** A phone at (x, y), 24 × 42, with a column of tiles on its screen. */
function Phone({ x, y, tone = CAT.ink }: { x: number; y: number; tone?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={24} height={42} rx={4} fill={CAT.tile} stroke={tone} strokeWidth={LINE.outline} />
      <rect x={x + 3} y={y + 5} width={18} height={30} fill="none" stroke={tone} strokeWidth={LINE.hair} />
      <rect x={x + 6} y={y + 8} width={12} height={10} fill="none" stroke={tone} strokeWidth={LINE.hair} />
      <line x1={x + 6} y1={y + 23} x2={x + 18} y2={y + 23} stroke={tone} strokeWidth={LINE.hair} />
      <line x1={x + 6} y1={y + 27} x2={x + 14} y2={y + 27} stroke={tone} strokeWidth={LINE.hair} />
      <line x1={x + 10} y1={y + 38.5} x2={x + 14} y2={y + 38.5} stroke={tone} strokeWidth={LINE.outline} />
    </g>
  );
}

/** A tablet at (x, y), 40 × 52, with a grid of tiles on its screen. */
function Tablet({ x, y, tone = CAT.ink }: { x: number; y: number; tone?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={40} height={52} rx={4} fill={CAT.tile} stroke={tone} strokeWidth={LINE.outline} />
      <rect x={x + 4} y={y + 4} width={32} height={42} fill="none" stroke={tone} strokeWidth={LINE.hair} />
      {[0, 1, 2, 3].map((k) => (
        <rect key={k} x={x + 7 + (k % 2) * 14} y={y + 8 + Math.floor(k / 2) * 17} width={12} height={14} fill="none" stroke={tone} strokeWidth={LINE.hair} />
      ))}
      <circle cx={x + 20} cy={y + 49} r={1.2} fill={tone} />
    </g>
  );
}

/** A conical burr grinder centred on (cx, cy): hopper, burr body and a cup. */
function Grinder({ id, cx, cy }: { id: string; cx: number; cy: number }) {
  return (
    <g strokeLinejoin="round">
      <path d={`M${cx - 14} ${cy - 26}H${cx + 14}L${cx + 8} ${cy - 12}H${cx - 8}Z`} fill={CAT.tile} {...ink} />
      <rect x={cx - 11} y={cy - 12} width={22} height={24} fill={ht(id, "light")} {...ink} />
      <rect x={cx + 3} y={cy - 12} width={8} height={24} fill={ht(id, "dense")} stroke="none" />
      <path d={`M${cx - 6} ${cy - 6}L${cx} ${cy + 6}L${cx + 6} ${cy - 6}`} fill="none" stroke={CAT.tile} strokeWidth={1.4} />
      <rect x={cx - 14} y={cy + 12} width={28} height={6} fill={CAT.tile} {...ink} />
      <path d={`M${cx - 7} ${cy + 18}H${cx + 7}V${cy + 26}H${cx - 7}Z`} fill={CAT.tile} {...ink} />
    </g>
  );
}

/** A water drop centred on (cx, cy). */
function Drop({ id, cx, cy }: { id: string; cx: number; cy: number }) {
  return (
    <g strokeLinejoin="round">
      <path d={`M${cx} ${cy - 24}C${cx + 6} ${cy - 12} ${cx + 15} ${cy - 2} ${cx + 15} ${cy + 8}A15 15 0 0 1 ${cx - 15} ${cy + 8}C${cx - 15} ${cy - 2} ${cx - 6} ${cy - 12} ${cx} ${cy - 24}Z`} fill={ht(id, "light")} {...ink} />
      <path d={`M${cx - 8} ${cy + 6}Q${cx - 8} ${cy + 15} ${cx} ${cy + 17}`} fill="none" stroke={CAT.tile} strokeWidth={2} strokeLinecap="round" />
    </g>
  );
}

/** A milk-steaming pitcher centred on (cx, cy). */
function Pitcher({ id, cx, cy }: { id: string; cx: number; cy: number }) {
  return (
    <g strokeLinejoin="round">
      <path d={`M${cx - 12} ${cy - 18}L${cx - 22} ${cy - 24}L${cx - 14} ${cy - 12}L${cx - 14} ${cy + 22}H${cx + 12}L${cx + 12} ${cy - 18}Z`} fill={ht(id, "light")} {...ink} />
      <path d={`M${cx + 4} ${cy - 18}H${cx + 12}V${cy + 22}H${cx + 4}Z`} fill={ht(id, "dense")} stroke="none" />
      <path d={`M${cx + 12} ${cy - 10}Q${cx + 24} ${cy - 8} ${cx + 22} ${cy + 4}Q${cx + 20} ${cy + 12} ${cx + 12} ${cy + 12}`} fill="none" {...ink} />
      <path d={`M${cx - 10} ${cy - 6}V${cy + 16}`} stroke={CAT.tile} strokeWidth={1.6} strokeLinecap="round" />
    </g>
  );
}

/** A card-index box at (x, y), 96 × 64: the CRM's filed contact cards. */
function CardBox({ id, x, y }: { id: string; x: number; y: number }) {
  return (
    <g strokeLinejoin="round">
      {[0, 1, 2, 3].map((k) => (
        <rect key={k} x={x + 10 + k * 5} y={y - 10 + k * 5} width={72} height={28} fill={CAT.tile} {...ink} />
      ))}
      <line x1={x + 32} y1={y + 12} x2={x + 74} y2={y + 12} {...hair} />
      <path d={`M${x} ${y + 18}H${x + 96}L${x + 90} ${y + 64}H${x + 6}Z`} fill={ht(id, "light")} {...ink} />
      <path d={`M${x + 70} ${y + 18}H${x + 96}L${x + 90} ${y + 64}H${x + 70}Z`} fill={ht(id, "dense")} stroke="none" />
      <rect x={x + 38} y={y + 30} width={20} height={10} fill={CAT.tile} {...ink} />
    </g>
  );
}

/* ---------------------------------------------------------------------------
   1. Renting attention versus owning relationships
   ------------------------------------------------------------------------ */

const PAID_PER_MONTH = 800;
const REPEAT_RATE = 0.06;
const LIST_KEEP = 0.96;
const FIRST = { price: 60, ad: 28, cogs: 24, ship: 10, send: 0 };
const REPEAT = { price: 60, ad: 0, cogs: 24, ship: 10, send: 0.01 };
const profitOf = (o: typeof FIRST) => o.price - o.ad - o.cogs - o.ship - o.send;

function rentSeries(stop: number) {
  let list = 0;
  return Array.from({ length: 24 }, (_, i) => {
    const m = i + 1;
    const paid = m <= stop ? PAID_PER_MONTH : 0;
    const repeat = Math.round(REPEAT_RATE * list);
    list = list * LIST_KEEP + paid;
    return { m, paid, repeat };
  });
}

/** Paid orders stop the month the budget stops. Repeat orders from the owned list keep arriving. */
export function RentVsOwn() {
  const [stop, setStop] = useState(12);
  const id = "w7-rent";
  const s = rentSeries(stop);
  const X0 = 78;
  const BW = 440 / 24;
  const Y0 = 292;
  const k = 232 / 1600;
  const Y = (v: number) => r2(Y0 - v * k);
  const paidTotal = s.reduce((a, d) => a + d.paid, 0);
  const repeatTotal = s.reduce((a, d) => a + d.repeat, 0);
  const total = paidTotal * profitOf(FIRST) + repeatTotal * profitOf(REPEAT);
  const last = s[23];
  const lastX = r2(X0 + 23 * BW + BW / 2);
  const rows: [string, number, number][] = [
    ["Price", FIRST.price, REPEAT.price],
    ["Ad cost", -FIRST.ad, -REPEAT.ad],
    ["Product cost", -FIRST.cogs, -REPEAT.cogs],
    ["Shipping", -FIRST.ship, -REPEAT.ship],
    ["Send cost", -FIRST.send, -REPEAT.send],
  ];
  const cell = (v: number) => (v === 0 ? "$0" : `${v < 0 ? "−" : ""}$${Math.abs(v) < 1 ? Math.abs(v).toFixed(2) : Math.abs(v)}`);
  return (
    <div>
      <Frame
        width={800}
        height={340}
        label={`The ad budget stops after month ${stop}. Paid orders fall to zero, while repeat orders from the owned list continue, ${fmt(last.repeat)} in month 24. A first order loses $2 after ad cost, product cost and shipping, and a repeat order earns $25.99. Profit over 24 months is ${money(total)}.`}
        svgProps={{ "data-plate": "rent-vs-own" }}
      >
        <HalftoneDefs id={id} />
        <CatKey x={X0 - 6} y={22} size={14}>Orders per month</CatKey>
        <line x1={X0 - 4} y1={Y0} x2={X0 + 442} y2={Y0} {...ink} />
        {[0, 500, 1000, 1500].map((v) => (
          <g key={v}>
            <line x1={X0 - 8} y1={Y(v)} x2={X0 - 4} y2={Y(v)} {...ink} />
            <Price x={X0 - 12} y={Y(v) + 5} size={14} anchor="end">{fmt(v)}</Price>
          </g>
        ))}
        {s.map((d, i) => {
          const x = r2(X0 + i * BW + 3);
          return (
            <g key={d.m}>
              {d.paid ? <rect x={x} y={Y(d.paid)} width={13} height={r2(d.paid * k)} fill={ht(id, "light")} {...ink} /> : null}
              {d.repeat ? <rect x={x} y={Y(d.paid + d.repeat)} width={13} height={r2(d.repeat * k)} fill={CAT.amber} {...ink} /> : null}
            </g>
          );
        })}
        {[1, 6, 12, 18, 24].map((m) => (
          <Price key={m} x={r2(X0 + (m - 1) * BW + BW / 2)} y={Y0 + 20} size={14} anchor="middle">{m}</Price>
        ))}
        <CatKey x={X0 + 220} y={Y0 + 42} size={14} anchor="middle">Month</CatKey>
        <line x1={r2(X0 + stop * BW + 1.5)} y1={70} x2={r2(X0 + stop * BW + 1.5)} y2={Y0} stroke={CAT.ink} strokeWidth={0.8} strokeDasharray="3 3" />
        <CatKey x={r2(X0 + stop * BW + (stop > 18 ? -6 : 6))} y={84} size={14} anchor={stop > 18 ? "end" : "start"}>Budget stops</CatKey>
        <CatKey x={X0} y={50} size={14}>Paid orders</CatKey>
        <line x1={r2(X0 + BW / 2)} y1={56} x2={r2(X0 + BW / 2)} y2={Y(s[0].paid) - 3} {...hair} />
        <CatKey x={X0 + 442} y={50} size={14} anchor="end" fill={CAT.amberText}>Repeat orders from the list</CatKey>
        <line x1={lastX} y1={56} x2={lastX} y2={Y(last.repeat) - 3} {...hair} />

        <Tile x={540} y={16} w={244} h={306} />
        <CatKey x={696} y={46} size={14} anchor="end">First</CatKey>
        <CatKey x={770} y={46} size={14} anchor="end">Repeat</CatKey>
        <line x1={554} y1={56} x2={772} y2={56} {...hair} />
        {rows.map(([name, a, b], i) => (
          <g key={name}>
            <CatKey x={554} y={80 + i * 26} size={14}>{name}</CatKey>
            <Price x={696} y={80 + i * 26} size={14} anchor="end">{cell(a)}</Price>
            <Price x={770} y={80 + i * 26} size={14} anchor="end">{cell(b)}</Price>
          </g>
        ))}
        <line x1={554} y1={198} x2={772} y2={198} {...ink} />
        <CatKey x={554} y={222} size={14}>Profit</CatKey>
        <Price x={696} y={222} size={16} anchor="end">−$2</Price>
        <Price x={770} y={222} size={16} anchor="end" fill={CAT.amberText}>$25.99</Price>
        <line x1={554} y1={240} x2={772} y2={240} {...hair} />
        <CatKey x={554} y={264} size={14}>Profit over 24 months</CatKey>
        <Price x={554} y={300} size={24}>{money(total)}</Price>
      </Frame>
      <Slider label="Ad budget stops after month" min={3} max={22} step={1} value={stop} onChange={setStop} />
    </div>
  );
}

/* ---------------------------------------------------------------------------
   2. Topic cluster: a pillar guide linked to cluster articles and a category
   ------------------------------------------------------------------------ */

/** A pillar page linked both ways to three cluster articles, leading readers on to the product category. */
export function TopicCluster() {
  const id = "w7-cluster";
  const articles = [
    { lines: ["Grinder burr", "geometry"], draw: (cx: number, cy: number) => <Grinder id={id} cx={cx} cy={cy} /> },
    { lines: ["Water", "chemistry"], draw: (cx: number, cy: number) => <Drop id={id} cx={cx} cy={cy} /> },
    { lines: ["Milk", "steaming"], draw: (cx: number, cy: number) => <Pitcher id={id} cx={cx} cy={cy} /> },
  ];
  return (
    <Frame
      width={800}
      height={330}
      label="A pillar page, a complete guide to home espresso extraction, links both ways to three cluster articles on grinder burr geometry, water chemistry and milk steaming. The pillar leads readers on to the espresso machine category."
      svgProps={{ "data-plate": "topic-cluster" }}
    >
      <HalftoneDefs id={id} />
      {articles.map((a, k) => {
        const y = 14 + k * 104;
        return (
          <g key={a.lines[0]}>
            <Tile x={20} y={y} w={210} h={94} />
            {a.draw(68, y + 47)}
            <CatKey x={110} y={y + 42} size={15}>{a.lines[0]}</CatKey>
            <CatKey x={110} y={y + 62} size={15}>{a.lines[1]}</CatKey>
            <line x1={240} y1={y + 47} x2={316} y2={r2(165 + (k - 1) * 46)} {...ink} />
            <path d={headAlongPts(240, y + 47, 316, r2(165 + (k - 1) * 46))} fill="none" {...ink} />
            <path d={headAlongPts(316, r2(165 + (k - 1) * 46), 240, y + 47)} fill="none" {...ink} />
          </g>
        );
      })}
      <rect x={326} y={30} width={200} height={270} fill={CAT.tile} stroke={CAT.ink} strokeWidth={1} />
      <rect x={329} y={33} width={194} height={264} fill="none" stroke={CAT.ink} strokeWidth={0.45} />
      <rect x={326} y={30} width={200} height={34} fill={CAT.amber} stroke={CAT.ink} strokeWidth={1} />
      <CatKey x={426} y={53} size={15} anchor="middle">Pillar page</CatKey>
      <g transform="translate(426 152) scale(0.78)">
        <Espresso id={id} cx={0} cy={0} />
      </g>
      <CatKey x={426} y={232} size={15} anchor="middle">Complete guide to</CatKey>
      <CatKey x={426} y={252} size={15} anchor="middle">home espresso</CatKey>
      <CatKey x={426} y={272} size={15} anchor="middle">extraction</CatKey>
      <Arrow x1={536} y1={165} x2={584} y2={165} />
      <Tile x={594} y={40} w={190} h={250} />
      <CatKey x={689} y={68} size={15} anchor="middle">Espresso machines</CatKey>
      {[0, 1].map((k) => (
        <g key={k}>
          <rect x={608 + k * 84} y={84} width={78} height={190} fill={CAT.tile} {...hair} />
          <g transform={`translate(${647 + k * 84} 160) scale(0.5)`}>
            <Espresso id={id} cx={0} cy={0} />
          </g>
          <line x1={616 + k * 84} y1={210} x2={676 + k * 84} y2={210} {...hair} />
          <line x1={616 + k * 84} y1={217} x2={656 + k * 84} y2={217} {...hair} />
          <Price x={616 + k * 84} y={252} size={15}>{k ? "$1,290" : "$649"}</Price>
        </g>
      ))}
    </Frame>
  );
}

/** Arrowhead at (x2, y2) pointing from (x1, y1). */
function headAlongPts(x1: number, y1: number, x2: number, y2: number, s = 7) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const bx = x2 - ux * s;
  const by = y2 - uy * s;
  const px = -uy * s * 0.62;
  const py = ux * s * 0.62;
  return `M${r2(bx + px)} ${r2(by + py)}L${r2(x2)} ${r2(y2)}L${r2(bx - px)} ${r2(by - py)}`;
}

/* ---------------------------------------------------------------------------
   3. CRM versus CDP
   ------------------------------------------------------------------------ */

/** Raw event streams flow into the CDP, which resolves one profile and syncs segments outward. The CRM files known contacts. */
export function CdpPipeline() {
  const id = "w7-cdp";
  const sources: { name: string; draw: (x: number, y: number) => React.ReactNode }[] = [
    { name: "Web clicks", draw: (x, y) => <Cursor x={x - 6} y={y - 10} scale={1.4} /> },
    { name: "App events", draw: (x, y) => <Phone x={x - 9} y={y - 16} /> },
    { name: "Cart views", draw: (x, y) => <Cart id={id} cx={x} cy={y} s={1.1} /> },
    { name: "Store purchases", draw: (x, y) => <Price x={x} y={y + 7} size={20} anchor="middle">$</Price> },
    { name: "ERP order updates", draw: (x, y) => <Parcel id={id} x={x - 12} y={y - 6} w={20} h={16} /> },
  ];
  const sy = (k: number) => 36 + k * 46;
  return (
    <Frame
      width={800}
      height={400}
      label="Web clicks, app events, cart views, store purchases and ERP order updates stream into the customer data platform, which resolves them into one profile and syncs segments out to email, ad networks and personalization. Below, the CRM files known contact records, support tickets and the sales pipeline."
      svgProps={{ "data-plate": "cdp-pipeline" }}
    >
      <HalftoneDefs id={id} />
      {sources.map((src, k) => (
        <g key={src.name}>
          {src.draw(34, sy(k))}
          <CatKey x={58} y={sy(k) + 5} size={14}>{src.name}</CatKey>
          <Arrow x1={192} y1={sy(k)} x2={250} y2={r2(128 + (k - 2) * 18)} />
        </g>
      ))}
      <Tile x={258} y={50} w={140} h={156} />
      <CatKey x={328} y={84} size={16} anchor="middle">CDP</CatKey>
      {Array.from({ length: 15 }, (_, k) => (
        <rect key={k} x={274 + (k % 5) * 22} y={98 + Math.floor(k / 5) * 14} width={16} height={8} fill={ht(id, "light")} {...hair} />
      ))}
      <CatKey x={328} y={164} size={14} anchor="middle">Identity</CatKey>
      <CatKey x={328} y={182} size={14} anchor="middle">resolved</CatKey>
      <Arrow x1={406} y1={128} x2={440} y2={128} />
      <rect x={448} y={62} width={128} height={132} fill={CAT.amber} stroke={CAT.ink} strokeWidth={1} />
      <rect x={451} y={65} width={122} height={126} fill={CAT.tile} stroke={CAT.ink} strokeWidth={0.45} />
      <Person id={id} cx={512} cy={110} s={1.1} />
      <CatKey x={512} y={162} size={14} anchor="middle">One unified</CatKey>
      <CatKey x={512} y={180} size={14} anchor="middle">profile</CatKey>
      {[
        { name: "Email", y: 56 },
        { name: "Ad networks", y: 128 },
        { name: "Personalization", y: 200 },
      ].map((d) => (
        <Arrow key={d.name} x1={584} y1={128} x2={624} y2={d.y} />
      ))}
      <Envelope id={id} x={634} y={42} w={40} h={28} />
      <CatKey x={684} y={61} size={14}>Email</CatKey>
      <g transform="translate(634 112) scale(0.3)">
        <Monitor id={id} x={0} y={0} />
      </g>
      <CatKey x={684} y={133} size={14}>Ad networks</CatKey>
      {[0, 1].map((k) => (
        <rect key={k} x={634 + k * 22} y={186} width={18} height={26} fill={k ? CAT.tile : ht(id, "light")} {...ink} />
      ))}
      <CatKey x={684} y={205} size={14}>Personalization</CatKey>
      <line x1={20} y1={264} x2={780} y2={264} {...hair} />
      <CatKey x={20} y={292} size={16}>CRM</CatKey>
      <CardBox id={id} x={30} y={318} />
      {["Contact records", "Support tickets", "Sales pipeline"].map((t, k) => (
        <g key={t}>
          <Tile x={190 + k * 200} y={290} w={186} h={92} />
          <CatKey x={204 + k * 200} y={316} size={14}>{t}</CatKey>
        </g>
      ))}
      <Person id={id} cx={220} cy={352} s={0.6} />
      {[0, 1, 2].map((j) => (
        <line key={j} x1={242} y1={340 + j * 10} x2={r2(350 - j * 26)} y2={340 + j * 10} {...hair} />
      ))}
      <path d="M404 332H470V352H420L410 360V352H404Z" fill={CAT.tile} {...ink} />
      <line x1={412} y1={340} x2={460} y2={340} {...hair} />
      <line x1={412} y1={346} x2={444} y2={346} {...hair} />
      <path d="M484 346H552V366H546V374L538 366H484Z" fill={ht(id, "light")} {...ink} />
      {[0, 1, 2, 3].map((j) => (
        <g key={j}>
          <rect x={604 + j * 40} y={r2(372 - (4 - j) * 9)} width={30} height={r2((4 - j) * 9)} fill={j === 3 ? CAT.tile : ht(id, "light")} {...ink} />
        </g>
      ))}
    </Frame>
  );
}

/* ---------------------------------------------------------------------------
   4. Deterministic versus probabilistic identity resolution
   ------------------------------------------------------------------------ */

/** Three anonymous devices, joined by an exact login on the left and by inferred clues on the right. */
export function IdentityLinks() {
  const id = "w7-identity";
  const panels = [
    { x: 20, title: "Deterministic", tone: CAT.ink, dash: undefined as string | undefined, clues: ["Same login", "Same login", "Same login"], verdict: "Same person" },
    { x: 410, title: "Probabilistic", tone: CAT.purple, dash: "4 4", clues: ["Shared IP", "Same evenings", "Same postcode"], verdict: "72% likely" },
  ];
  return (
    <Frame
      width={800}
      height={330}
      label="One shopper's phone, work laptop and home tablet appear as three anonymous visitors. Deterministic resolution joins them by the same verified login. Probabilistic resolution infers the link from a shared IP address, timing and location, with only 72 percent likelihood."
      svgProps={{ "data-plate": "identity-links" }}
    >
      <HalftoneDefs id={id} />
      {panels.map((p) => {
        const dev = [p.x + 68, p.x + 185, p.x + 302];
        const pc = { x: p.x + 185, y: 246 };
        return (
          <g key={p.title}>
            <Tile x={p.x} y={14} w={370} h={302} />
            <CatKey x={p.x + 185} y={44} size={16} anchor="middle" fill={p.tone}>{p.title}</CatKey>
            <Phone x={dev[0] - 12} y={62} tone={p.tone} />
            <Laptop x={dev[1] - 28} y={62} tone={p.tone} />
            <Tablet x={dev[2] - 20} y={58} tone={p.tone} />
            {dev.map((dx, k) => (
              <g key={k}>
                <line x1={dx} y1={150} x2={r2(pc.x + (k - 1) * 14)} y2={pc.y - 44} stroke={p.tone} strokeWidth={1.3} strokeDasharray={p.dash} />
                <line x1={dx} y1={110} x2={dx} y2={126} stroke={p.tone} strokeWidth={1.3} strokeDasharray={p.dash} />
                <rect x={dx - 53} y={126} width={106} height={24} fill={CAT.tile} stroke={p.tone} strokeWidth={0.6} />
                <CatKey x={dx} y={143} size={14} anchor="middle" fill={p.tone}>{p.clues[k]}</CatKey>
              </g>
            ))}
            <Person id={id} cx={pc.x} cy={pc.y} s={1.15} tone={p.tone === CAT.purple ? "purple" : "ink"} />
            <Price x={pc.x} y={302} size={16} anchor="middle" fill={p.tone}>{p.verdict}</Price>
          </g>
        );
      })}
    </Frame>
  );
}

/* ---------------------------------------------------------------------------
   5. Lifecycle flows on one customer's timeline
   ------------------------------------------------------------------------ */

/** Each automated flow sits on the customer event that triggers it. */
export function LifecycleTimeline() {
  const id = "w7-flows";
  const LY = 172;
  const events = [
    { x: 76, flow: ["Welcome", "series"], event: ["Subscribes"], day: "Day 0" },
    { x: 222, flow: ["Browse and cart", "abandonment"], event: ["Leaves bag", "in cart"], day: "Day 3" },
    { x: 380, flow: ["Post-purchase", "onboarding"], event: ["Orders and", "receives"], day: "Day 6 to 9" },
    { x: 548, flow: ["Replenishment"], event: ["Bag nearly", "empty"], day: "Day 34" },
    { x: 712, flow: ["Win-back"], event: ["Past usual", "reorder time"], day: "Day 75" },
  ];
  return (
    <Frame
      width={800}
      height={256}
      label="One coffee customer's timeline. Subscribing triggers the welcome series on day 0, leaving a bag in the cart triggers abandonment emails on day 3, ordering and delivery trigger post-purchase onboarding, the bag nearly running out triggers replenishment on day 34, and passing the usual reorder time triggers win-back on day 75."
      svgProps={{ "data-plate": "lifecycle-timeline" }}
    >
      <HalftoneDefs id={id} />
      <line x1={30} y1={LY} x2={776} y2={LY} {...ink} />
      <path d={headAlongPts(760, LY, 778, LY)} fill="none" {...ink} />
      {events.map((e, k) => (
        <g key={e.day}>
          <Envelope id={id} x={e.x - 26} y={62} w={52} h={36} />
          {e.flow.map((t, j) => (
            <CatKey key={t} x={e.x} y={r2(24 + j * 19 + (e.flow.length === 1 ? 19 : 0))} size={15} anchor="middle">{t}</CatKey>
          ))}
          <line x1={e.x} y1={100} x2={e.x} y2={LY - 9} {...hair} />
          <circle cx={e.x} cy={LY} r={7} fill={CAT.amber} {...ink} />
          {e.event.map((t, j) => (
            <CatKey key={t} x={e.x} y={LY + 30 + j * 18} size={14} anchor="middle">{t}</CatKey>
          ))}
          <Price x={e.x} y={LY + 30 + e.event.length * 18 + 8} size={14} anchor="middle">{e.day}</Price>
          {k === 2 ? <CoffeeBag id={id} cx={e.x + 62} cy={126} level={1} /> : null}
          {k === 3 ? <CoffeeBag id={id} cx={e.x + 60} cy={126} level={0.12} /> : null}
        </g>
      ))}
    </Frame>
  );
}

/* ---------------------------------------------------------------------------
   6. RFM segments
   ------------------------------------------------------------------------ */

type Seg = "champ" | "risk" | "one" | "mid";
function rfmCustomers() {
  const rnd = seeded(7);
  const out: { r: number; f: number; m: number; seg: Seg }[] = [];
  const add = (n: number, seg: Seg, r: [number, number], f: [number, number], m: [number, number]) => {
    for (let i = 0; i < n; i++) out.push({ seg, r: r[0] + rnd() * (r[1] - r[0]), f: f[0] + rnd() * (f[1] - f[0]), m: m[0] + rnd() * (m[1] - m[0]) });
  };
  add(12, "champ", [5, 50], [8, 12], [900, 1800]);
  add(9, "risk", [200, 330], [6, 10], [800, 1600]);
  add(16, "one", [60, 350], [1, 1], [20, 60]);
  add(22, "mid", [20, 240], [2, 6], [100, 500]);
  return out;
}
const RFM = rfmCustomers();

/** Customers placed by recency and frequency, circle size by spend, each segment marked with its message. */
export function RfmMap() {
  const id = "w7-rfm";
  const X = (r: number) => r2(90 + (r / 365) * 650);
  const Y = (f: number) => r2(284 - ((f - 1) / 11) * 224);
  const R = (m: number) => r2(3 + Math.sqrt(m) * 0.32);
  const fill: Record<Seg, string> = { champ: CAT.amber, risk: CAT.purple, one: CAT.tile, mid: ht(id, "light") };
  return (
    <Frame
      width={800}
      height={340}
      label="Customers placed by days since last order and orders in the past year, circle size by total spend. Champions, recent, frequent and high spending, get VIP early access. At-Risk Big Spenders, frequent and high spending but long lapsed, get a win-back offer. Price-Sensitive One-Timers bought once, cheaply."
      svgProps={{ "data-plate": "rfm-map" }}
    >
      <HalftoneDefs id={id} />
      <line x1={90} y1={296} x2={750} y2={296} {...ink} />
      <line x1={78} y1={50} x2={78} y2={296} {...ink} />
      {[0, 90, 180, 270, 365].map((d) => (
        <g key={d}>
          <line x1={X(d)} y1={296} x2={X(d)} y2={301} {...ink} />
          <Price x={X(d)} y={318} size={14} anchor="middle">{d}</Price>
        </g>
      ))}
      <CatKey x={750} y={336} size={14} anchor="end">Days since last order</CatKey>
      {[1, 4, 8, 12].map((f) => (
        <g key={f}>
          <line x1={73} y1={Y(f)} x2={78} y2={Y(f)} {...ink} />
          <Price x={68} y={Y(f) + 5} size={14} anchor="end">{f}</Price>
        </g>
      ))}
      <CatKey x={84} y={34} size={14}>Orders in the past year</CatKey>
      {RFM.map((c, k) => (
        <circle key={k} cx={X(c.r)} cy={Y(c.f)} r={R(c.m)} fill={fill[c.seg]} stroke={c.seg === "risk" ? CAT.purple : CAT.ink} strokeWidth={c.seg === "risk" ? 1 : 0.9} fillOpacity={c.seg === "risk" ? 0.85 : 1} />
      ))}
      <CatKey x={214} y={78} size={15}>Champions</CatKey>
      <CatKey x={214} y={97} size={14} fill={CAT.amberText}>VIP early access</CatKey>
      <CatKey x={540} y={222} size={15} fill={CAT.purple}>At-Risk Big Spenders</CatKey>
      <CatKey x={540} y={241} size={14} fill={CAT.purple}>Win-back offer</CatKey>
      <CatKey x={750} y={268} size={15} anchor="end">Price-Sensitive One-Timers</CatKey>
    </Frame>
  );
}

/* ---------------------------------------------------------------------------
   7. Deliverability: blast frequency, sunsetting and inbox placement
   ------------------------------------------------------------------------ */

const ENGAGED = 120000;
const UNENGAGED = 280000;
const KEPT_UNENGAGED = 30000;

function deliverability(blasts: number, sunset: boolean) {
  const u = sunset ? KEPT_UNENGAGED : UNENGAGED;
  const list = ENGAGED + u;
  const engagedOpen = 0.3 / (1 + 0.15 * (blasts - 1));
  const opens = (ENGAGED * engagedOpen + u * 0.01) / list;
  const complaints = ((u * 0.0015 + ENGAGED * 0.0003) * blasts * 1000) / list;
  const rep = Math.max(0, Math.min(100, 40 + 200 * opens - 8 * complaints));
  const inbox = Math.round((20 + 0.78 * rep) / 10);
  return { list, opens, complaints, rep, inbox };
}

/** Sending blasts to unengaged addresses lowers reputation, and the receipts and cart reminders of active buyers land in spam too. */
export function InboxPlacement() {
  const [blasts, setBlasts] = useState(4);
  const [mode, setMode] = useState<"all" | "sunset">("all");
  const id = "w7-inbox";
  const d = deliverability(blasts, mode === "sunset");
  const keptU = mode === "sunset" ? KEPT_UNENGAGED / 10000 : UNENGAGED / 10000;
  const tray = (x: number, n: number, name: string) => (
    <g>
      <path d={`M${x} 196H${x + 150}L${x + 140} 236H${x + 10}Z`} fill={ht(id, "light")} {...ink} />
      <path d={`M${x} 196H${x + 150}`} {...ink} />
      {Array.from({ length: n }, (_, k) => (
        <g key={k} transform={`translate(${r2(x + 19 + (k % 5) * 28)} ${r2(176 - Math.floor(k / 5) * 26)}) rotate(${(k % 2 ? 4 : -4)})`}>
          <rect x={-12} y={-8} width={26} height={18} fill={CAT.amber} {...ink} />
          <path d="M-12 -8L1 3L14 -8" fill="none" {...ink} />
        </g>
      ))}
      <CatKey x={x + 75} y={260} size={15} anchor="middle">{name}</CatKey>
      <Price x={x + 75} y={282} size={15} anchor="middle">{`${n} of 10`}</Price>
    </g>
  );
  return (
    <div>
      <Frame
        width={800}
        height={300}
        label={`${mode === "sunset" ? "After a sunset policy the list holds" : "The whole list holds"} ${fmt(d.list)} addresses and gets ${blasts} ${blasts === 1 ? "blast" : "blasts"} a week. Opens per send ${(d.opens * 100).toFixed(1)} percent, ${d.complaints.toFixed(1)} spam complaints per 1,000 sends, sender reputation ${Math.round(d.rep)} of 100. ${d.inbox} of 10 receipts and cart reminders to active buyers reach the inbox and ${10 - d.inbox} ${10 - d.inbox === 1 ? "lands" : "land"} in spam.`}
        svgProps={{ "data-plate": "inbox-placement" }}
      >
        <HalftoneDefs id={id} />
        <CatKey x={24} y={30} size={14}>Engaged</CatKey>
        <CatKey x={134} y={30} size={14}>Unengaged</CatKey>
        {Array.from({ length: 40 }, (_, k) => {
          const engaged = k < 12;
          const j = engaged ? k : k - 12;
          const x = (engaged ? 24 : 134) + (j % 4) * 24;
          const y = 44 + Math.floor(j / 4) * 22;
          const kept = engaged || j < keptU;
          return kept ? (
            <g key={k}>
              <rect x={x} y={y} width={22} height={16} fill={engaged ? ht(id, "dense") : CAT.tile} {...ink} />
              <path d={`M${x} ${y}L${x + 11} ${y + 9}L${x + 22} ${y}`} fill="none" stroke={engaged ? CAT.tile : CAT.ink} strokeWidth={LINE.hair} />
            </g>
          ) : (
            <rect key={k} x={x} y={y} width={22} height={16} fill="none" stroke={CAT.ink} strokeWidth={0.6} strokeDasharray="2 3" />
          );
        })}
        <CatKey x={24} y={234} size={14}>One envelope = 10,000 addresses</CatKey>
        <Price x={24} y={262} size={18}>{`${fmt(d.list)} on the list`}</Price>

        {[
          { name: "Opens per send", v: `${(d.opens * 100).toFixed(1)}%` },
          { name: "Complaints per 1,000", v: d.complaints.toFixed(1) },
        ].map((r, k) => (
          <g key={r.name}>
            <CatKey x={262} y={42 + k * 58} size={14}>{r.name}</CatKey>
            <Price x={262} y={68 + k * 58} size={20}>{r.v}</Price>
          </g>
        ))}
        <CatKey x={262} y={158} size={14}>Sender reputation</CatKey>
        <rect x={262} y={168} width={160} height={14} fill={CAT.tile} {...ink} />
        <rect x={262} y={168} width={r2(1.6 * d.rep)} height={14} fill={ht(id, "dense")} {...ink} />
        <Price x={262} y={204} size={20}>{`${Math.round(d.rep)} of 100`}</Price>

        <CatKey x={460} y={30} size={14}>Receipts and cart reminders to active buyers</CatKey>
        {tray(460, d.inbox, "Inbox")}
        {tray(630, 10 - d.inbox, "Spam")}
      </Frame>
      <Slider label="Blasts per week" min={1} max={5} step={1} value={blasts} onChange={setBlasts} />
      <Segmented<"all" | "sunset">
        label="List"
        value={mode}
        onChange={setMode}
        options={[
          { id: "all", label: "Whole list" },
          { id: "sunset", label: "Sunset unengaged addresses" },
        ]}
      />
    </div>
  );
}

/* ---------------------------------------------------------------------------
   8. Personalization granularity: the inverted U
   ------------------------------------------------------------------------ */

type Level = "0" | "1" | "2" | "3" | "4";
const respAt = (t: number) => 1.1 + 1.5 * t - 0.42 * t * t;
const creepAt = (t: number) => 0.03 + 0.92 / (1 + Math.exp(-2 * (t - 3)));
const LEVELS: { id: Level; tick: string; subject: string[] }[] = [
  { id: "0", tick: "Generic", subject: ["This week's new arrivals"] },
  { id: "1", tick: "Category", subject: ["New in hiking packs"] },
  { id: "2", tick: "Attribute", subject: ["Packs that weigh", "under 900 grams"] },
  { id: "3", tick: "History", subject: ["A lighter pack to go", "with your trail shoes"] },
  { id: "4", tick: "Tracking", subject: ["You viewed the Ridge 30", "at 11:42 last night", "from your phone"] },
];

/** Response rises with relevant personalization, then falls once the message reveals tracking the customer did not knowingly share. */
export function CreepinessCurve() {
  const [lvl, setLvl] = useState<Level>("2");
  const id = "w7-creep";
  const i = Number(lvl);
  const X = (k: number) => r2(96 + k * 92);
  const Y = (c: number) => r2(270 - (c / 3) * 200);
  const YS = (s: number) => r2(270 - s * 200);
  const curve = (f: (t: number) => number, yOf: (v: number) => number) =>
    Array.from({ length: 41 }, (_, k) => k / 10).map((t, k) => `${k ? "L" : "M"}${X(t)} ${yOf(f(t))}`).join("");
  const cur = { ...LEVELS[i], ctr: r2(respAt(i)) };
  return (
    <div>
      <Frame
        width={800}
        height={320}
        label={`Personalization level: ${cur.tick}. The subject line reads "${cur.subject.join(" ")}". Click rate ${cur.ctr.toFixed(1)} percent. Response rises from generic to attribute-level personalization, then falls as perceived surveillance rises.`}
        svgProps={{ "data-plate": "creepiness-curve" }}
      >
        <HalftoneDefs id={id} />
        <line x1={72} y1={270} x2={490} y2={270} {...ink} />
        <line x1={72} y1={60} x2={72} y2={270} {...ink} />
        {[0, 1, 2, 3].map((c) => (
          <g key={c}>
            <line x1={67} y1={Y(c)} x2={72} y2={Y(c)} {...ink} />
            <Price x={62} y={Y(c) + 5} size={14} anchor="end">{`${c}%`}</Price>
          </g>
        ))}
        <CatKey x={78} y={44} size={14}>Click rate</CatKey>
        {LEVELS.map((l, k) => (
          <g key={l.id}>
            <line x1={X(k)} y1={270} x2={X(k)} y2={275} {...ink} />
            <CatKey x={X(k)} y={294} size={14} anchor="middle">{l.tick}</CatKey>
          </g>
        ))}
        <CatKey x={280} y={316} size={14} anchor="middle">How granular the personalization is</CatKey>
        <path d={curve(creepAt, YS)} fill="none" stroke={CAT.purple} strokeWidth={1.4} strokeDasharray="5 4" />
        <CatKey x={X(4) - 10} y={YS(creepAt(4)) - 12} size={14} anchor="end" fill={CAT.purple}>Perceived surveillance</CatKey>
        <path d={curve(respAt, Y)} fill="none" stroke={CAT.ink} strokeWidth={1.8} />
        <line x1={X(i)} y1={Y(cur.ctr)} x2={X(i)} y2={270} stroke={CAT.ink} strokeWidth={0.6} strokeDasharray="2 3" />
        <circle cx={X(i)} cy={Y(cur.ctr)} r={7} fill={CAT.amber} {...ink} />

        <Tile x={520} y={24} w={264} h={276} />
        <rect x={536} y={40} width={232} height={22} fill={ht(id, "light")} {...hair} />
        <rect x={538} y={40} width={64} height={22} fill={CAT.tile} {...hair} />
        <CatKey x={570} y={56} size={14} anchor="middle">Inbox</CatKey>
        {cur.subject.map((t, j) => (
          <CatKey key={t} x={540} y={92 + j * 21} size={16}>{t}</CatKey>
        ))}
        <line x1={540} y1={162} x2={764} y2={162} {...hair} />
        <Backpack id={id} cx={600} cy={222} />
        <line x1={652} y1={204} x2={760} y2={204} {...hair} />
        <line x1={652} y1={212} x2={730} y2={212} {...hair} />
        <Price x={652} y={238} size={15}>$129</Price>
        <CatKey x={652} y={266} size={14}>Click rate</CatKey>
        <Price x={652} y={290} size={22} fill={CAT.amberText}>{`${cur.ctr.toFixed(1)}%`}</Price>
      </Frame>
      <Segmented<Level>
        label="Personalization"
        value={lvl}
        onChange={setLvl}
        options={[
          { id: "0", label: "Generic" },
          { id: "1", label: "Category" },
          { id: "2", label: "Attribute match" },
          { id: "3", label: "Purchase history" },
          { id: "4", label: "Exact tracking" },
        ]}
      />
    </div>
  );
}
