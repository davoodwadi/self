"use client";

import React, { useState } from "react";
import { Arrow, CAT, head, CatKey, Frame, HalftoneDefs, LINE, PAPER3, Price, Segmented, Slider, Tile, Toggles, ht, r2, seeded } from "../_visuals/kit";
import { Agent, Cursor, House, Mug, Parcel, Person, Shop, Van, Warehouse } from "../_visuals/objects";

const ink = { stroke: CAT.ink, strokeWidth: LINE.outline, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
const hair = { stroke: CAT.ink, strokeWidth: LINE.hair, strokeLinecap: "round" as const };
const fmt = (n: number) => Math.round(n).toLocaleString("en-US");
const money = (n: number) => `${n < 0 ? "−" : ""}$${Math.abs(Math.round(n)).toLocaleString("en-US")}`;
const cents = (n: number) => `$${n.toFixed(2)}`;
const pct = (n: number) => `${Math.round(n * 100)}%`;

/* ---------------------------------------------------------------------------
   Week 10 cast
   ------------------------------------------------------------------------ */

/** A key centred on (cx, cy): ring bow, shaft and two teeth. */
function KeyGlyph({ id, cx, cy }: { id: string; cx: number; cy: number }) {
  return (
    <g strokeLinejoin="round">
      <circle cx={cx - 16} cy={cy} r={11} fill={ht(id, "light")} {...ink} />
      <circle cx={cx - 16} cy={cy} r={4} fill={CAT.tile} {...ink} />
      <path d={`M${cx - 5} ${cy - 3}H${cx + 24}V${cy + 3}H${cx - 5}Z`} fill={CAT.tile} {...ink} />
      <path d={`M${cx + 12} ${cy + 3}V${cy + 10}H${cx + 16}V${cy + 3}M${cx + 19} ${cy + 3}V${cy + 8}H${cx + 23}V${cy + 3}`} fill={CAT.tile} {...ink} />
    </g>
  );
}

/** A picking rack centred on (cx, cy): two shelves of bins, one unit lifted out. */
function PickRack({ id, cx, cy }: { id: string; cx: number; cy: number }) {
  return (
    <g>
      <rect x={cx - 30} y={cy - 24} width={60} height={50} fill={CAT.tile} {...ink} />
      <line x1={cx - 30} y1={cy + 1} x2={cx + 30} y2={cy + 1} {...ink} />
      {[0, 1, 2].map((k) => (
        <g key={k}>
          <rect x={cx - 26 + k * 18} y={cy - 12} width={15} height={11} fill={ht(id, "light")} {...hair} />
          <rect x={cx - 26 + k * 18} y={cy + 13} width={15} height={11} fill={k === 1 ? CAT.tile : ht(id, "light")} {...hair} />
        </g>
      ))}
      <Mug id={id} cx={cx} cy={cy - 40} scale={0.42} />
      <path d={`M${cx} ${cy + 10}V${cy - 28}`} stroke={CAT.ink} strokeWidth={0.8} strokeDasharray="2 2" />
    </g>
  );
}

/** An open shipping box centred on (cx, cy) with a mug inside and the flaps up. */
function OpenBox({ id, cx, cy }: { id: string; cx: number; cy: number }) {
  return (
    <g strokeLinejoin="round">
      <Mug id={id} cx={cx} cy={cy - 8} scale={0.5} />
      <path d={`M${cx - 24} ${cy - 6}L${cx - 34} ${cy - 20}L${cx - 22} ${cy - 22}L${cx - 14} ${cy - 6}Z`} fill={CAT.tile} {...ink} />
      <path d={`M${cx + 24} ${cy - 6}L${cx + 34} ${cy - 20}L${cx + 22} ${cy - 22}L${cx + 14} ${cy - 6}Z`} fill={CAT.tile} {...ink} />
      <rect x={cx - 24} y={cy - 6} width={48} height={30} fill={ht(id, "light")} {...ink} />
      <rect x={cx + 10} y={cy - 6} width={14} height={30} fill={ht(id, "dense")} stroke="none" />
      <rect x={cx - 24} y={cy - 6} width={48} height={30} fill="none" {...ink} />
    </g>
  );
}

/** A sorting belt centred on (cx, cy): rollers under three parcels. */
function SortBelt({ id, cx, cy }: { id: string; cx: number; cy: number }) {
  return (
    <g>
      <rect x={cx - 36} y={cy + 8} width={72} height={8} rx={4} fill={CAT.tile} {...ink} />
      {[0, 1, 2, 3, 4].map((k) => (
        <circle key={k} cx={cx - 28 + k * 14} cy={cy + 12} r={2} fill={CAT.ink} />
      ))}
      <Parcel id={id} x={cx - 32} y={cy - 6} w={16} h={14} />
      <Parcel id={id} x={cx - 8} y={cy - 10} w={18} h={18} />
      <Parcel id={id} x={cx + 18} y={cy - 4} w={14} h={12} />
      <path d={`M${cx - 36} ${cy + 26}V${cy + 32}M${cx + 36} ${cy + 26}V${cy + 32}`} {...ink} />
      <line x1={cx - 36} y1={cy + 16} x2={cx - 36} y2={cy + 26} {...ink} />
      <line x1={cx + 36} y1={cy + 16} x2={cx + 36} y2={cy + 26} {...ink} />
    </g>
  );
}

/** A tick, centred on (cx, cy). */
function Tick({ cx, cy, s = 1, color = CAT.ink }: { cx: number; cy: number; s?: number; color?: string }) {
  return <path d={`M${r2(cx - 6 * s)} ${cy}L${r2(cx - 2 * s)} ${r2(cy + 5 * s)}L${r2(cx + 7 * s)} ${r2(cy - 6 * s)}`} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />;
}

/** A cross, centred on (cx, cy). */
function Cross({ cx, cy, s = 1 }: { cx: number; cy: number; s?: number }) {
  const d = r2(5 * s);
  return <path d={`M${cx - d} ${cy - d}L${cx + d} ${cy + d}M${cx + d} ${cy - d}L${cx - d} ${cy + d}`} fill="none" stroke={CAT.ink} strokeWidth={2} strokeLinecap="round" />;
}

/** A curved arrow from (x1, y1) back to (x2, y2), bowing upward: the way back. */
function BackArrow({ x1, y1, x2, y2, lift = 22, color = CAT.ink }: { x1: number; y1: number; x2: number; y2: number; lift?: number; color?: string }) {
  const mx = r2((x1 + x2) / 2);
  const my = r2(Math.min(y1, y2) - lift);
  const dx = x2 - mx;
  const dy = y2 - my;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const s = 6;
  const bx = x2 - ux * s;
  const by = y2 - uy * s;
  return (
    <g fill="none" stroke={color} strokeWidth={LINE.outline} strokeLinecap="round" strokeLinejoin="round">
      <path d={`M${x1} ${y1}Q${mx} ${my} ${x2} ${y2}`} />
      <path d={`M${r2(bx - uy * s * 0.62)} ${r2(by + ux * s * 0.62)}L${x2} ${y2}L${r2(bx + uy * s * 0.62)} ${r2(by - ux * s * 0.62)}`} />
    </g>
  );
}

/* ---------------------------------------------------------------------------
   1. Digital atoms versus physical boxes
   ------------------------------------------------------------------------ */

const STAGES = [
  { name: ["Picking"], add: 1.4 },
  { name: ["Packing"], add: 1.7 },
  { name: ["Carrier", "sorting"], add: 1.5 },
  { name: ["Last-mile", "delivery"], add: 5.2 },
  { name: ["Possible", "return"], add: 8.5 },
];

/** The same checkout click: a digital order ends at a credential, a physical order runs through five costly stages. */
export function AtomsVsBoxes() {
  const id = "w10-atoms";
  const SX = [214, 334, 454, 574, 702];
  const totals = STAGES.map((_, k) => STAGES.slice(0, k + 1).reduce((a, s) => a + s.add, 0));
  const orderButton = (y: number) => (
    <g>
      <rect x={20} y={y - 16} width={112} height={32} fill={CAT.ink} />
      <CatKey x={76} y={y + 5} size={14} anchor="middle" fill={CAT.tile}>Place order</CatKey>
      <Cursor x={112} y={y + 4} scale={1.3} />
    </g>
  );
  return (
    <Frame
      width={800}
      height={300}
      label="The same checkout click. A digital service order ends when a database credential is issued, at a cost near zero. A physical order runs through picking, packing, carrier sorting, last-mile delivery and a possible return, and its cost adds up to $9.80 by the doorstep and $18.30 if the item comes back."
      svgProps={{ "data-plate": "atoms-vs-boxes" }}
    >
      <HalftoneDefs id={id} />
      <CatKey x={20} y={26} size={15}>Digital service</CatKey>
      {orderButton(62)}
      <Arrow x1={150} y1={62} x2={196} y2={62} />
      <KeyGlyph id={id} cx={228} cy={62} />
      <CatKey x={270} y={67} size={14}>Credential issued</CatKey>
      <Price x={SX[4]} y={68} size={18} anchor="middle">$0.00</Price>
      <line x1={20} y1={106} x2={780} y2={106} {...hair} />

      <CatKey x={20} y={136} size={15}>Physical order</CatKey>
      {orderButton(190)}
      <PickRack id={id} cx={SX[0]} cy={192} />
      <OpenBox id={id} cx={SX[1]} cy={190} />
      <SortBelt id={id} cx={SX[2]} cy={186} />
      <g transform={`translate(${SX[3] - 46} 168) scale(0.7)`}>
        <Van id={id} x={0} y={0} />
      </g>
      <House id={id} cx={SX[3] + 32} cy={190} />
      <rect x={SX[4] - 46} y={142} width={92} height={78} fill="none" stroke={CAT.ink} strokeWidth={0.8} strokeDasharray="3 3" />
      <Parcel id={id} x={SX[4] - 4} y={188} w={22} h={18} />
      <BackArrow x1={SX[4] + 4} y1={180} x2={SX[4] - 30} y2={196} lift={20} />
      {STAGES.map((s, k) => (
        <g key={s.name[0]}>
          {k < 4 ? <Arrow x1={SX[k] + 40} y1={234} x2={SX[k + 1] - 40} y2={234} w={0.8} s={5} /> : null}
          {s.name.map((line, j) => (
            <CatKey key={line} x={SX[k]} y={240 + j * 17} size={14} anchor="middle">{line}</CatKey>
          ))}
          <Price x={SX[k]} y={290} size={16} anchor="middle" fill={k === 4 ? CAT.amberText : CAT.ink}>{cents(totals[k])}</Price>
        </g>
      ))}
      <Arrow x1={140} y1={190} x2={174} y2={190} />
      <CatKey x={20} y={289} size={14}>Cost so far</CatKey>    </Frame>
  );
}

/* ---------------------------------------------------------------------------
   2. Store pickup and inventory accuracy
   ------------------------------------------------------------------------ */

const PICKUPS = (() => {
  const rnd = seeded(1010);
  return Array.from({ length: 24 }, () => [rnd(), rnd(), rnd()]);
})();

/** The OMS routes an order to the store five miles away. When records overstate shelf stock, pickup orders for missing items are cancelled. */
export function PickupAccuracy() {
  const [acc, setAcc] = useState(90);
  const [items, setItems] = useState<"1" | "2" | "3">("2");
  const id = "w10-pickup";
  const n = Number(items);
  const orders = PICKUPS.map((u) => u.slice(0, n).map((v) => v < acc / 100));
  const cancelled = orders.filter((o) => o.some((present) => !present)).length;
  return (
    <div>
      <Frame
        width={800}
        height={380}
        label={`The order management system routes an online order to a store five miles from the buyer instead of a warehouse two thousand miles away. With store records ${acc} percent accurate and ${n} item${n > 1 ? "s" : ""} per order, ${cancelled} of 24 pickup orders accepted by the store are for items that are not on the shelf and must be cancelled.`}
        svgProps={{ "data-plate": "pickup-accuracy" }}
      >
        <HalftoneDefs id={id} />
        <House id={id} cx={56} cy={84} />
        <CatKey x={56} y={52} size={14} anchor="middle">Buyer</CatKey>
        <Shop id={id} x={176} y={50} w={72} h={56} />
        <Arrow x1={170} y1={84} x2={84} y2={84} />
        <CatKey x={128} y={74} size={14} anchor="middle">5 miles</CatKey>
        <line x1={690} y1={126} x2={90} y2={126} stroke={CAT.ink} strokeWidth={0.8} strokeDasharray="3 4" />
        <path d={head.left(78, 126, 6)} fill="none" {...ink} />
        <path d="M444 136L452 116M452 136L460 116" {...ink} />
        <CatKey x={520} y={120} size={14} anchor="middle">2,000 miles</CatKey>
        <Warehouse id={id} x={652} y={40} w={76} h={62} />
        <line x1={690} y1={102} x2={690} y2={126} stroke={CAT.ink} strokeWidth={0.8} strokeDasharray="3 4" />
        <line x1={20} y1={152} x2={780} y2={152} {...hair} />
        <CatKey x={20} y={178} size={15}>Pickup orders the store accepted</CatKey>
        <Price x={780} y={178} size={16} anchor="end" fill={CAT.amberText}>{`${cancelled} of 24 cancelled`}</Price>
        {orders.map((o, k) => {
          const x = 20 + (k % 12) * 64;
          const y = 194 + Math.floor(k / 12) * 92;
          const bad = o.some((p) => !p);
          return (
            <g key={k}>
              <rect x={x} y={y} width={56} height={82} fill={bad ? CAT.amber : CAT.tile} stroke={CAT.ink} strokeWidth={1} />
              <rect x={x + 3} y={y + 3} width={50} height={76} fill="none" stroke={CAT.ink} strokeWidth={0.45} />
              {o.map((present, j) => {
                const cy = r2(y + 82 / (n + 1) * (j + 1));
                return present ? (
                  <Mug key={j} id={id} cx={x + 27} cy={cy} scale={n === 3 ? 0.48 : 0.6} />
                ) : (
                  <rect key={j} x={x + 15} y={cy - 9} width={24} height={18} fill={CAT.tile} stroke={CAT.ink} strokeWidth={0.9} strokeDasharray="2.5 2" />
                );
              })}
            </g>
          );
        })}
      </Frame>
      <Slider label="Store records match the shelf" min={60} max={100} value={acc} onChange={setAcc} formatValue={(v) => `${v}%`} />
      <Segmented label="Items per order" options={[{ id: "1", label: "1" }, { id: "2", label: "2" }, { id: "3", label: "3" }]} value={items} onChange={setItems} />
    </div>
  );
}

/* ---------------------------------------------------------------------------
   3. Regional fulfillment nodes
   ------------------------------------------------------------------------ */

const MAP = { x: 20, y: 20, w: 480, h: 300 };
const NODE_SETS: [number, number][][] = [
  [[260, 170]],
  [[150, 120], [380, 220]],
  [[120, 110], [390, 100], [260, 250]],
  [[115, 100], [395, 95], [125, 245], [395, 250]],
  [[105, 95], [405, 90], [115, 255], [405, 255], [260, 172]],
];
const BUYERS = (() => {
  const rnd = seeded(77);
  const out: [number, number][] = [];
  while (out.length < 64) {
    const x = r2(MAP.x + 18 + rnd() * (MAP.w - 36));
    const y = r2(MAP.y + 22 + rnd() * (MAP.h - 40));
    if (out.every(([a, b]) => Math.hypot(a - x, b - y) > 24) && NODE_SETS.flat().every(([a, b]) => Math.hypot(a - x, b - y) > 36)) out.push([x, y]);
  }
  return out;
})();
/** Map units to carrier zones (one unit is about five miles). */
const zoneOf = (d: number) => (d < 50 ? 2 : d < 75 ? 3 : d < 115 ? 4 : d < 190 ? 5 : d < 270 ? 6 : d < 350 ? 7 : 8);
const DAYS: Record<number, number> = { 2: 1, 3: 2, 4: 2, 5: 3, 6: 4, 7: 4, 8: 5 };

/** More regional nodes put stock nearer more buyers: lower zones, more of them within two days by ground. */
export function RegionalNodes() {
  const [n, setN] = useState(1);
  const id = "w10-nodes";
  const nodes = NODE_SETS[n - 1];
  const buyers = BUYERS.map(([x, y]) => {
    const d = Math.min(...nodes.map(([a, b]) => Math.hypot(a - x, b - y)));
    const z = zoneOf(d);
    return { x, y, z, days: DAYS[z] };
  });
  const avgZone = buyers.reduce((a, b) => a + b.z, 0) / buyers.length;
  const within2 = buyers.filter((b) => b.days <= 2).length / buyers.length;
  const byDay = [1, 2, 3, 4, 5].map((d) => buyers.filter((b) => b.days === d).length);
  const BX = 560;
  const BY = 284;
  const k = 120 / 60;
  return (
    <div>
      <Frame
        width={800}
        height={340}
        label={`With ${n} regional fulfillment node${n > 1 ? "s" : ""}, the average shipping zone is ${avgZone.toFixed(1)} and ${pct(within2)} of buyers can be reached in one or two days by ground.`}
        svgProps={{ "data-plate": "regional-nodes" }}
      >
        <HalftoneDefs id={id} />
        <rect x={MAP.x} y={MAP.y} width={MAP.w} height={MAP.h} fill={PAPER3} stroke={CAT.ink} strokeWidth={0.6} />
        {buyers.map((b, i) => (
          <g key={i}>
            <rect x={b.x - 6} y={b.y - 3} width={12} height={9} fill={b.days <= 2 ? CAT.amber : CAT.tile} {...ink} strokeWidth={0.8} />
            <path d={`M${b.x - 8} ${b.y - 2}L${b.x} ${b.y - 9}L${b.x + 8} ${b.y - 2}`} fill="none" {...ink} strokeWidth={0.8} />
          </g>
        ))}
        {nodes.map(([x, y], i) => (
          <Warehouse key={i} id={id} x={x - 28} y={y - 24} w={56} h={46} />
        ))}
        <CatKey x={BX} y={40} size={18}>Average zone</CatKey>
        <Price x={BX} y={82} size={34}>{avgZone.toFixed(1)}</Price>
        <CatKey x={BX} y={BY + 44} size={18}>Ground delivery days</CatKey>
        <line x1={BX - 4} y1={BY} x2={BX + 210} y2={BY} {...ink} />
        {byDay.map((c, i) => (
          <g key={i}>
            {c ? <rect x={BX + i * 42} y={r2(BY - c * k)} width={30} height={r2(c * k)} fill={i < 2 ? CAT.amber : ht(id, "light")} {...ink} /> : null}
            <Price x={BX + i * 42 + 15} y={BY + 20} size={18} anchor="middle">{i + 1}</Price>
            {c ? <Price x={BX + i * 42 + 15} y={r2(BY - c * k - 6)} size={17} anchor="middle">{c}</Price> : null}
          </g>
        ))}
        <CatKey x={BX} y={126} size={18} fill={CAT.amberText}>{`${pct(within2)} within two days`}</CatKey>
      </Frame>
      <Slider label="Regional fulfillment nodes" min={1} max={5} value={n} onChange={setN} />
    </div>
  );
}

/* ---------------------------------------------------------------------------
   4. The last-mile route
   ------------------------------------------------------------------------ */

const ROUTE_COST = 400;
const UPSTREAM = 3.2;
const ROWS_Y = [84, 174, 264];

/** Few stops per route and failed first attempts push up the last mile's cost per parcel and its share of shipping cost. */
export function LastMileRoute() {
  const [stops, setStops] = useState(120);
  const [fail, setFail] = useState(8);
  const id = "w10-route";
  const delivered = stops * (1 - fail / 100);
  const last = ROUTE_COST / delivered;
  const total = last + UPSTREAM;
  const share = last / total;
  const houses = Math.round(stops / 10);
  const failed = Math.round((houses * fail) / 100);
  const perRow = Math.ceil(houses / 3);
  const firstFail = Math.min(...Array.from({ length: failed }, (_, k) => Math.floor(((k + 0.5) * houses) / Math.max(failed, 1))));
  const failSet = new Set(Array.from({ length: failed }, (_, k) => Math.floor(((k + 0.5) * houses) / Math.max(failed, 1))));
  const X0 = 120;
  const X1 = 440;
  const BX = 520;
  const BY = 300;
  const kk = 250 / 16;
  return (
    <div>
      <Frame
        width={800}
        height={320}
        label={`With ${stops} stops per route and ${fail} percent of first attempts failing, the last mile costs ${cents(last)} per parcel, ${pct(share)} of the ${cents(total)} total shipping cost.`}
        svgProps={{ "data-plate": "last-mile-route" }}
      >
        <HalftoneDefs id={id} />
        <Warehouse id={id} x={20} y={44} w={64} h={54} />
        <CatKey x={52} y={124} size={17} anchor="middle">Local depot</CatKey>
        <path
          d={`M84 ${ROWS_Y[0] + 14}H${X1}A40 40 0 0 1 ${X1} ${ROWS_Y[1] + 14}H${X0}A40 40 0 0 0 ${X0} ${ROWS_Y[2] + 14}H${X1}`}
          fill="none"
          stroke={CAT.ink}
          strokeWidth={6}
          strokeLinecap="round"
        />
        <path
          d={`M84 ${ROWS_Y[0] + 14}H${X1}A40 40 0 0 1 ${X1} ${ROWS_Y[1] + 14}H${X0}A40 40 0 0 0 ${X0} ${ROWS_Y[2] + 14}H${X1}`}
          fill="none"
          stroke={CAT.tile}
          strokeWidth={1.2}
          strokeDasharray="5 5"
        />
        {Array.from({ length: houses }, (_, k) => {
          const row = Math.floor(k / perRow);
          const j = k % perRow;
          const span = X1 - X0 - 20;
          const pos = perRow > 1 ? j / (perRow - 1) : 0.5;
          const x = r2(row === 1 ? X1 - 10 - pos * span : X0 + 10 + pos * span);
          const y = ROWS_Y[row];
          return (
            <g key={k}>
              <House id={id} cx={x} cy={y - 10} />
              {failSet.has(k) ? (
                <g>
                  <Parcel id={id} x={x + 15} y={y - 6} w={10} h={9} />
                  <BackArrow x1={x + 22} y1={y - 12} x2={x + 2} y2={y - 34} lift={6} />
                  {k === firstFail ? <CatKey x={x} y={y - 42} size={16} anchor="middle">Failed first attempt</CatKey> : null}
                </g>
              ) : null}
            </g>
          );
        })}
        <g transform={`translate(${X1 + 6} ${ROWS_Y[2] - 4}) scale(0.5)`}>
          <Van id={id} x={0} y={0} />
        </g>
        <CatKey x={BX - 30} y={28} size={18}>Shipping cost per parcel</CatKey>
        <line x1={BX - 10} y1={BY} x2={BX + 70} y2={BY} {...ink} />
        <rect x={BX} y={r2(BY - UPSTREAM * kk)} width={60} height={r2(UPSTREAM * kk)} fill={ht(id, "light")} {...ink} />
        <rect x={BX} y={r2(BY - total * kk)} width={60} height={r2(last * kk)} fill={CAT.amber} {...ink} />
        <CatKey x={BX + 72} y={r2(BY - UPSTREAM * kk / 2 + 5)} size={17}>{`Line haul ${cents(UPSTREAM)}`}</CatKey>
        <CatKey x={BX + 72} y={r2(BY - UPSTREAM * kk - (last * kk) / 2 - 4)} size={17} fill={CAT.amberText}>{`Last mile ${cents(last)}`}</CatKey>
        <Price x={BX + 72} y={r2(BY - UPSTREAM * kk - (last * kk) / 2 + 16)} size={19} fill={CAT.amberText}>{`${pct(share)} of total`}</Price>
      </Frame>
      <Slider label="Stops per route" min={40} max={200} step={10} value={stops} onChange={setStops} />
      <Slider label="Failed first attempts" min={0} max={20} value={fail} onChange={setFail} formatValue={(v) => `${v}%`} />
    </div>
  );
}

/* ---------------------------------------------------------------------------
   5. Free-shipping threshold
   ------------------------------------------------------------------------ */

function basketBins(step: number) {
  const mu = Math.log(55);
  const raw = Array.from({ length: 160 / step }, (_, i) => {
    const b = i * step + step / 2;
    return { b, w: Math.exp(-((Math.log(b) - mu) ** 2) / (2 * 0.5 * 0.5)) / b };
  });
  const tot = raw.reduce((a, r) => a + r.w, 0);
  return raw.map((r) => ({ b: r.b, w: (100 * r.w) / tot }));
}
const BASKETS = basketBins(5);
const BASKETS_FINE = basketBins(1);
const AOV = BASKETS_FINE.reduce((a, r) => a + r.b * r.w, 0) / 100;
const SHIP = { fee: 6.95, carrier: 9, margin: 0.42, band: 40, topMax: 0.8, unit: 10, abandon: 2.2 };

function thresholdOutcome(T: number) {
  let profit = 0;
  let topUp = 0;
  let abandon = 0;
  for (const { b, w } of BASKETS_FINE) {
    if (b >= T) {
      profit += w * (SHIP.margin * b - SHIP.carrier);
      continue;
    }
    const gap = T - b;
    const p = gap <= SHIP.band ? SHIP.topMax * (1 - gap / SHIP.band) : 0;
    const a = Math.min(0.75, (SHIP.abandon * SHIP.fee) / b);
    profit += w * p * (SHIP.margin * Math.max(T, b + SHIP.unit) - SHIP.carrier);
    topUp += w * p;
    profit += w * (1 - p) * (1 - a) * (SHIP.margin * b + SHIP.fee - SHIP.carrier);
    abandon += w * (1 - p) * a;
  }
  return { profit, topUp, abandon };
}
const T_RANGE = Array.from({ length: 46 }, (_, i) => 30 + i * 2);
const T_CURVE = T_RANGE.map((T) => thresholdOutcome(T).profit);

/** Moving the threshold above the average order value: more shoppers add a unit to qualify, fewer abandon, until the fee chases small baskets away. */
export function FreeShipThreshold() {
  const [T, setT] = useState(40);
  const id = "w10-threshold";
  const o = thresholdOutcome(T);
  const HX = 60;
  const HW = 12;
  const HY = 270;
  const hk = 150 / 12;
  const X = (v: number) => r2(HX + (v / 5) * (HW + 1));
  const CX0 = 560;
  const CX1 = 780;
  const CY0 = 250;
  const CY1 = 110;
  const pMin = 1600;
  const pMax = 1900;
  const cx = (t: number) => r2(CX0 + ((t - 30) / 90) * (CX1 - CX0));
  const cy = (p: number) => r2(CY0 - ((p - pMin) / (pMax - pMin)) * (CY0 - CY1));
  return (
    <div>
      <Frame
        width={800}
        height={330}
        label={`Baskets average ${money(AOV)}. With free shipping over ${money(T)}, ${Math.round(o.topUp)} of 100 shoppers add an extra unit to qualify, ${Math.round(o.abandon)} abandon over the shipping fee, and profit after shipping is ${money(o.profit)} per 100 shoppers.`}
        svgProps={{ "data-plate": "free-ship-threshold" }}
      >
        <HalftoneDefs id={id} />
        <CatKey x={HX - 40} y={26} size={15}>Shoppers by basket value</CatKey>
        <line x1={HX - 4} y1={HY} x2={X(160)} y2={HY} {...ink} />
        {BASKETS.map(({ b, w }) => {
          const x = r2(HX + ((b - 2.5) / 5) * (HW + 1));
          const h = r2(w * hk);
          const free = b >= T;
          const gap = T - b;
          const p = !free && gap <= SHIP.band ? SHIP.topMax * (1 - gap / SHIP.band) : 0;
          return (
            <g key={b}>
              <rect x={x} y={r2(HY - h)} width={HW} height={h} fill={free ? ht(id, "light") : CAT.tile} {...ink} strokeWidth={0.8} />
              {p > 0 ? <rect x={x} y={r2(HY - h)} width={HW} height={r2(h * p)} fill={CAT.amber} {...ink} strokeWidth={0.8} /> : null}
            </g>
          );
        })}
        {[0, 40, 80, 120, 160].map((v) => (
          <Price key={v} x={X(v)} y={HY + 20} size={14} anchor="middle">{`$${v}`}</Price>
        ))}
        <line x1={X(AOV)} y1={60} x2={X(AOV)} y2={HY} stroke={CAT.ink} strokeWidth={0.8} strokeDasharray="2 3" />
        <CatKey x={X(AOV) + 4} y={56} size={14}>{`Average order ${money(AOV)}`}</CatKey>
        <line x1={X(T)} y1={84} x2={X(T)} y2={HY} {...ink} strokeWidth={1.6} />
        <CatKey x={X(T) + 4} y={80} size={14}>{`Free over ${money(T)}`}</CatKey>
        <CatKey x={HX - 40} y={312} size={14} fill={CAT.amberText}>{`${Math.round(o.topUp)} add a unit to qualify`}</CatKey>
        <CatKey x={300} y={312} size={14}>{`${Math.round(o.abandon)} abandon over the fee`}</CatKey>

        <CatKey x={CX0 - 10} y={26} size={15}>Profit per 100 shoppers</CatKey>
        <Price x={CX0 - 10} y={66} size={28}>{money(o.profit)}</Price>
        <line x1={CX0} y1={CY0} x2={CX1} y2={CY0} {...ink} />
        <path d={T_RANGE.map((t, i) => `${i ? "L" : "M"}${cx(t)} ${cy(T_CURVE[i])}`).join("")} fill="none" {...ink} strokeWidth={1.4} />
        <circle cx={cx(T)} cy={cy(o.profit)} r={5.5} fill={CAT.amber} {...ink} />
        {[30, 60, 90, 120].map((v) => (
          <Price key={v} x={cx(v)} y={CY0 + 20} size={14} anchor="middle">{`$${v}`}</Price>
        ))}
        <CatKey x={(CX0 + CX1) / 2} y={CY0 + 40} size={14} anchor="middle">Free-shipping threshold</CatKey>
      </Frame>
      <Slider label="Free shipping over" min={30} max={120} step={2} value={T} onChange={setT} formatValue={(v) => `$${v}`} />
    </div>
  );
}

/* ---------------------------------------------------------------------------
   6. Return rates in stores and online
   ------------------------------------------------------------------------ */

const RATE_ROWS = [
  { name: "Physical stores", lo: 0.08, hi: 0.1 },
  { name: "E-commerce", lo: 0.18, hi: 0.25 },
  { name: "Online fashion apparel and footwear", lo: 0.3, hi: 0.4 },
];

/** Forty parcels sold in each channel, with the returned ones in amber. */
export function ReturnRates() {
  const id = "w10-rates";
  const N = 40;
  const SP = 19;
  return (
    <Frame
      width={800}
      height={268}
      label="Of every 40 items sold, about 3 to 4 come back to physical stores (8 to 10 percent), 7 to 10 come back in e-commerce (18 to 25 percent), and 12 to 16 come back in online fashion apparel and footwear (30 to 40 percent)."
      svgProps={{ "data-plate": "return-rates" }}
    >
      <HalftoneDefs id={id} />
      {RATE_ROWS.map((r, row) => {
        const y = 30 + row * 84;
        const hiN = Math.round(r.hi * N);
        const x = (k: number) => r2(24 + k * SP);
        return (
          <g key={r.name}>
            <CatKey x={20} y={y} size={15}>{r.name}</CatKey>
            <Price x={780} y={y} size={16} anchor="end" fill={CAT.amberText}>{`${Math.round(r.lo * 100)} to ${Math.round(r.hi * 100)}% returned`}</Price>
            {Array.from({ length: N }, (_, k) => (
              <Parcel key={k} id={id} x={x(k)} y={y + 22} w={13} h={13} tone={k < hiN ? "amber" : "ink"} />
            ))}
            <path d={`M${r2(24 + r.lo * N * SP - 3)} ${y + 42}V${y + 48}H${r2(24 + r.hi * N * SP - 4)}V${y + 42}`} fill="none" {...hair} strokeWidth={0.9} />
          </g>
        );
      })}
    </Frame>
  );
}

/* ---------------------------------------------------------------------------
   7. Return policy leniency
   ------------------------------------------------------------------------ */

const KEPT_MARGIN = 36;
function leniency(days: number, free: boolean) {
  const conv = 0.03 * (1 + 0.35 * (1 - Math.exp(-days / 15)) + (free ? 0.12 : 0));
  const rate = 0.06 + 0.16 * (1 - Math.exp(-days / 30)) + (free ? 0.07 : 0);
  const orders = 10000 * conv;
  const cost = 20 + (free ? 9 : 0);
  const returns = orders * rate;
  const profit = (orders - returns) * KEPT_MARGIN - returns * cost;
  return { orders, rate, returns, cost, profit };
}
const DAY_RANGE = Array.from({ length: 19 }, (_, i) => i * 5);

/** A longer window and free return labels raise orders and returns together, so profit rises and then falls. */
export function ReturnLeniency() {
  const [days, setDays] = useState(60);
  const [ship, setShip] = useState<"paid" | "free">("free");
  const id = "w10-lenient";
  const free = ship === "free";
  const o = leniency(days, free);
  const curve = DAY_RANGE.map((d) => leniency(d, free).profit);
  const CX0 = 90;
  const CX1 = 470;
  const CY0 = 270;
  const CY1 = 70;
  const pMin = 7000;
  const pMax = 11000;
  const cx = (d: number) => r2(CX0 + (d / 90) * (CX1 - CX0));
  const cy = (p: number) => r2(CY0 - ((p - pMin) / (pMax - pMin)) * (CY0 - CY1));
  const rows: [string, string][] = [
    ["Orders", fmt(o.orders)],
    ["Returned", `${fmt(o.returns)} (${pct(o.rate)})`],
    ["Cost per return", money(o.cost)],
    ["Margin per kept order", money(KEPT_MARGIN)],
  ];
  return (
    <div>
      <Frame
        width={800}
        height={330}
        label={`With a ${days}-day window and ${free ? "free" : "buyer-paid"} return shipping, an $80 garment store gets ${fmt(o.orders)} orders per 10,000 visitors, ${pct(o.rate)} of them come back, and profit is ${money(o.profit)}.`}
        svgProps={{ "data-plate": "return-leniency" }}
      >
        <HalftoneDefs id={id} />
        <CatKey x={20} y={26} size={18}>Profit per 10,000 visitors</CatKey>
        <line x1={CX0} y1={CY0} x2={CX1} y2={CY0} {...ink} />
        <line x1={CX0} y1={CY1 - 10} x2={CX0} y2={CY0} {...ink} />
        {[7000, 9000, 11000].map((v) => (
          <g key={v}>
            <line x1={CX0 - 4} y1={cy(v)} x2={CX0} y2={cy(v)} {...ink} />
            <Price x={CX0 - 8} y={cy(v) + 5} size={17} anchor="end">{`$${v / 1000}k`}</Price>
          </g>
        ))}
        <path d={DAY_RANGE.map((d, i) => `${i ? "L" : "M"}${cx(d)} ${cy(curve[i])}`).join("")} fill="none" {...ink} strokeWidth={1.5} />
        <line x1={cx(days)} y1={cy(o.profit)} x2={cx(days)} y2={CY0} stroke={CAT.ink} strokeWidth={0.8} strokeDasharray="2 3" />
        <circle cx={cx(days)} cy={cy(o.profit)} r={6} fill={CAT.amber} {...ink} />
        {[0, 30, 60, 90].map((v) => (
          <Price key={v} x={cx(v)} y={CY0 + 20} size={17} anchor="middle">{v}</Price>
        ))}
        <CatKey x={(CX0 + CX1) / 2} y={CY0 + 42} size={17} anchor="middle">Return window in days</CatKey>

        <Tile x={520} y={16} w={264} h={276} />
        <Price x={540} y={70} size={30}>{money(o.profit)}</Price>
        <CatKey x={540} y={94} size={17}>Profit</CatKey>
        <line x1={536} y1={110} x2={768} y2={110} {...hair} />
        {rows.map(([k, v], i) => (
          <g key={k}>
            <CatKey x={540} y={142 + i * 40} size={17}>{k}</CatKey>
            <Price x={768} y={142 + i * 40} size={18} anchor="end">{v}</Price>
            <line x1={536} y1={156 + i * 40} x2={768} y2={156 + i * 40} {...hair} />
          </g>
        ))}
      </Frame>
      <Slider label="Return window" min={0} max={90} step={5} value={days} onChange={setDays} formatValue={(v) => `${v} days`} />
      <Segmented label="Return shipping" options={[{ id: "paid", label: "Buyer pays" }, { id: "free", label: "Free" }]} value={ship} onChange={setShip} />
    </div>
  );
}

/* ---------------------------------------------------------------------------
   8. The cost of one return
   ------------------------------------------------------------------------ */

const REVERSE = [
  { name: ["Return shipping", "and receiving"], add: 10 },
  { name: ["Opening and", "inspection"], add: 6 },
  { name: ["Condition", "grading"], add: 2 },
  { name: ["Cleaning or", "repackaging"], add: 2 },
  { name: ["Write-off if", "not sellable as new"], add: 45 },
];

/** One returned parcel through five hand steps, its cost added up as a share of the original price. */
export function ReverseCost() {
  const id = "w10-reverse";
  const SX = [84, 238, 392, 546, 702];
  const BX0 = 30;
  const BX1 = 770;
  const bx = (p: number) => r2(BX0 + (p / 100) * (BX1 - BX0));
  const segs = REVERSE.map((s, k) => {
    const a = REVERSE.slice(0, k).reduce((t, r) => t + r.add, 0);
    return { a, b: a + s.add };
  });
  return (
    <Frame
      width={800}
      height={300}
      label="A returned $80 garment is shipped back and received, opened and inspected, graded, cleaned or repackaged, and written off if it cannot be sold as new. Return shipping and handling cost 20 percent of the original price when the item is resold as new, and 65 percent once the write-off is added."
      svgProps={{ "data-plate": "reverse-cost" }}
    >
      <HalftoneDefs id={id} />
      <Parcel id={id} x={SX[0] - 18} y={56} w={30} h={26} />
      <BackArrow x1={SX[0] + 34} y1={58} x2={SX[0] + 2} y2={42} lift={16} />
      <OpenBox id={id} cx={SX[1]} cy={66} />
      <circle cx={SX[1] + 26} cy={44} r={9} fill={CAT.tile} {...ink} />
      <line x1={SX[1] + 32} y1={51} x2={SX[1] + 40} y2={60} {...ink} strokeWidth={2.4} />
      {["A", "B", "C"].map((g, k) => (
        <g key={g}>
          <path d={`M${SX[2] - 36 + k * 26} 50H${SX[2] - 18 + k * 26}V82H${SX[2] - 36 + k * 26}Z`} fill={k === 0 ? CAT.tile : ht(id, "light")} {...ink} />
          <circle cx={SX[2] - 27 + k * 26} cy={56} r={2} fill={CAT.tile} {...ink} />
          <Price x={SX[2] - 27 + k * 26} y={76} size={16} anchor="middle">{g}</Price>
        </g>
      ))}
      <path d={`M${SX[3] - 4} 36Q${SX[3] - 4} 30 ${SX[3]} 30Q${SX[3] + 4} 30 ${SX[3] + 4} 35L${SX[3]} 40L${SX[3] - 26} 52H${SX[3] + 26}L${SX[3]} 40`} fill="none" {...ink} />
      <path d={`M${SX[3] - 10} 48L${SX[3] - 30} 56L${SX[3] - 26} 68L${SX[3] - 18} 65V94H${SX[3] + 18}V65L${SX[3] + 26} 68L${SX[3] + 30} 56L${SX[3] + 10} 48Q${SX[3]} 56 ${SX[3] - 10} 48Z`} fill={ht(id, "light")} {...ink} />
      {[0, 1, 2].map((k) => (
        <path key={k} d={`M${SX[3] + 38 + k * 6} 86Q${SX[3] + 34 + k * 6} 76 ${SX[3] + 38 + k * 6} 66Q${SX[3] + 42 + k * 6} 56 ${SX[3] + 38 + k * 6} 46`} fill="none" {...hair} strokeWidth={0.9} />
      ))}
      <path d={`M${SX[4] - 22} 46H${SX[4] + 16}L${SX[4] + 28} 66L${SX[4] + 16} 86H${SX[4] - 22}Z`} fill={CAT.tile} {...ink} />
      <circle cx={SX[4] + 16} cy={66} r={2.5} fill={CAT.tile} {...ink} />
      <Price x={SX[4] - 4} y={72} size={19} anchor="middle">$80</Price>
      <line x1={SX[4] - 24} y1={88} x2={SX[4] + 22} y2={44} {...ink} strokeWidth={2} />
      {REVERSE.map((s, k) => (
        <g key={s.name[0]}>
          {k < 4 ? <Arrow x1={SX[k] + 52} y1={70} x2={SX[k + 1] - 52} y2={70} w={0.8} s={5} /> : null}
          {s.name.map((line, j) => (
            <CatKey key={line} x={SX[k]} y={122 + j * 20} size={17} anchor="middle">{line}</CatKey>
          ))}
          <Price x={SX[k]} y={184} size={19} anchor="middle">{`+${s.add}%`}</Price>
        </g>
      ))}
      <CatKey x={BX0} y={216} size={17}>Cost as a share of the original price</CatKey>
      {segs.map((g, k) => (
        <rect key={k} x={bx(g.a)} y={228} width={r2(bx(g.b) - bx(g.a))} height={22} fill={k === 4 ? CAT.amber : ht(id, k % 2 ? "dense" : "light")} {...ink} strokeWidth={0.9} />
      ))}
      <rect x={bx(65)} y={228} width={r2(bx(100) - bx(65))} height={22} fill={CAT.tile} {...ink} strokeWidth={0.9} />
      <line x1={bx(20)} y1={222} x2={bx(20)} y2={262} {...ink} />
      <line x1={bx(65)} y1={222} x2={bx(65)} y2={262} {...ink} />
      <Price x={bx(20)} y={282} size={19} anchor="middle">20%</Price>
      <CatKey x={bx(20) + 24} y={282} size={17}>resold as new</CatKey>
      <Price x={bx(65)} y={282} size={19} anchor="middle" fill={CAT.amberText}>65%</Price>
      <CatKey x={bx(65) + 24} y={282} size={17} fill={CAT.amberText}>written off</CatKey>
      <Price x={bx(100)} y={282} size={17} anchor="end">100%</Price>
    </Frame>
  );
}

/* ---------------------------------------------------------------------------
   9. AI customer service triage
   ------------------------------------------------------------------------ */

const REQUESTS = (() => {
  const rnd = seeded(4242);
  return Array.from({ length: 100 }, (_, i) => {
    const complex = i % 25 < 7;
    const conf = complex ? 0.25 + rnd() * 0.6 : 0.62 + rnd() * 0.37;
    return { complex, conf };
  });
})();

/** A confidence threshold splits 100 requests between the AI agent and a human. Complex cases the agent answers alone go wrong. */
export function SupportTriage() {
  const [thr, setThr] = useState(70);
  const id = "w10-triage";
  const byType = (a: (typeof REQUESTS)[number], b: (typeof REQUESTS)[number]) => Number(b.complex) - Number(a.complex);
  const ai = REQUESTS.filter((r) => r.conf >= thr / 100).sort(byType);
  const human = REQUESTS.filter((r) => r.conf < thr / 100).sort(byType);
  const wrong = ai.filter((r) => r.complex).length;
  const COLS = 14;
  const CELL = 26;
  const bubble = (key: number, x: number, y: number, fill: string) => (
    <path key={key} d={`M${x} ${y}H${x + 20}V${y + 14}H${x + 9}L${x + 4} ${y + 19}V${y + 14}H${x}Z`} fill={fill} {...ink} strokeWidth={0.8} />
  );
  const tray = (list: typeof REQUESTS, x0: number, isAi: boolean) =>
    list.map((r, k) => {
      const x = x0 + (k % COLS) * CELL;
      const y = 120 + Math.floor(k / COLS) * 24;
      const fill = isAi && r.complex ? CAT.amber : r.complex ? ht(id, "dense") : CAT.tile;
      return bubble(k, x, y, fill);
    });
  return (
    <div>
      <Frame
        width={800}
        height={350}
        label={`An AI agent connected to the order and return systems answers alone when its confidence is at least ${thr} percent. It resolves ${ai.length} of 100 requests in seconds and escalates ${human.length} to a human with the transcript. ${wrong} complex cases are answered by the agent alone and go wrong.`}
        svgProps={{ "data-plate": "support-triage" }}
      >
        <HalftoneDefs id={id} />
        <Agent id={id} cx={44} cy={58} s={1.2} />
        <CatKey x={80} y={50} size={15}>AI agent</CatKey>
        <CatKey x={80} y={70} size={14}>reads the OMS and RMS</CatKey>
        <Person id={id} cx={436} cy={58} s={1.05} />
        <CatKey x={468} y={50} size={15}>Human representative</CatKey>
        <CatKey x={468} y={70} size={14}>gets the transcript</CatKey>
        <line x1={20} y1={98} x2={392} y2={98} {...hair} />
        <line x1={408} y1={98} x2={780} y2={98} {...hair} />
        {tray(ai, 24, true)}
        {tray(human, 412, false)}
        <line x1={400} y1={96} x2={400} y2={314} {...hair} />
        <Price x={24} y={338} size={16}>{`${ai.length} resolved alone`}</Price>
        <Price x={388} y={338} size={16} anchor="end" fill={CAT.amberText}>{`${wrong} complex, gone wrong`}</Price>
        <Price x={412} y={338} size={16}>{`${human.length} escalated`}</Price>
        <Price x={780} y={338} size={16} anchor="end">{`${human.filter((r) => r.complex).length} complex`}</Price>
      </Frame>
      <Slider label="Confidence the agent needs to answer alone" min={50} max={99} value={thr} onChange={setThr} formatValue={(v) => `${v}%`} />
    </div>
  );
}

/* ---------------------------------------------------------------------------
   10. The agent's delivery constraint check
   ------------------------------------------------------------------------ */

type Field = "date" | "cost" | "returns";
const OFFERS = [
  { n: 1, price: 24, ours: true, date: "Thursday", ship: 5.99, ret: "30 days", onTime: true },
  { n: 2, price: 27, ours: false, date: "Thursday", ship: 4.99, ret: "30 days", onTime: true },
  { n: 3, price: 25, ours: false, date: "Monday", ship: 0, ret: "14 days", onTime: false },
  { n: 4, price: 26, ours: false, date: "Friday", ship: 7.99, ret: "15 days", onTime: true },
];

/** The agent checks each offer's delivery date, shipping cost and return window. Unknown values fail, so the cheapest offer can lose. */
export function AgentDeliveryCheck() {
  const [on, setOn] = useState<Field[]>([]);
  const id = "w10-agent";
  const rows = OFFERS.map((o) => {
    const shown = (f: Field) => !o.ours || on.includes(f);
    const date = shown("date") ? o.date : "Fast standard";
    const ship = shown("cost") ? (o.ship ? cents(o.ship) : "Free") : "At checkout";
    const ret = shown("returns") ? o.ret : "See policy";
    const checks = [shown("date") ? (o.onTime ? "pass" : "fail") : "unknown", shown("cost") ? "pass" : "unknown", shown("returns") ? "pass" : "unknown"];
    const passes = checks.every((c) => c === "pass");
    return { ...o, date, shipText: ship, ret, checks, passes, total: o.price + o.ship };
  });
  const best = rows.filter((r) => r.passes).sort((a, b) => a.total - b.total)[0];
  const COLS = [196, 344, 492];
  const Y = (k: number) => 116 + k * 58;
  return (
    <div>
      <Frame
        width={800}
        height={354}
        label={`An AI agent told to order a birthday gift that arrives in Toronto by Friday checks four offers. Our store's offer is the cheapest, but ${rows[0].passes ? "with its delivery date, shipping cost and return window exposed it passes and the agent orders it" : "unknown values fail the check, so the agent orders from a competitor"}.`}
        svgProps={{ "data-plate": "agent-delivery-check" }}
      >
        <HalftoneDefs id={id} />
        <Agent id={id} cx={40} cy={44} s={1.1} />
        <rect x={76} y={22} width={460} height={40} fill={CAT.tile} {...ink} />
        <path d="M76 36L66 44L76 48" fill={CAT.tile} {...ink} />
        <line x1={76.6} y1={37} x2={76.6} y2={47} stroke={CAT.tile} strokeWidth={1.6} />
        <CatKey x={90} y={47} size={15}>Order a birthday gift that arrives in Toronto by Friday</CatKey>
        {["Arrives", "Shipping", "Returns"].map((h, k) => (
          <CatKey key={h} x={COLS[k]} y={92} size={14}>{h}</CatKey>
        ))}
        {rows.map((r, k) => {
          const y = Y(k);
          return (
            <g key={r.n}>
              <rect x={20} y={y - 20} width={160} height={50} fill={r === best ? CAT.amber : CAT.tile} stroke={CAT.ink} strokeWidth={1} />
              <rect x={r === best ? 25 : 23} y={r === best ? y - 15 : y - 17} width={r === best ? 150 : 154} height={r === best ? 40 : 44} fill={CAT.tile} stroke={CAT.ink} strokeWidth={0.45} />
              <Mug id={id} cx={52} cy={y + 5} scale={0.6} />
              <CatKey x={78} y={y + 1} size={14}>{r.ours ? "Our store" : `Store ${r.n}`}</CatKey>
              <Price x={78} y={y + 20} size={15}>{`$${r.price}`}</Price>
              {[r.date, r.shipText, r.ret].map((t, j) => (
                <g key={j}>
                  <CatKey x={COLS[j] + 24} y={y + 10} size={14}>{t}</CatKey>
                  {r.checks[j] === "pass" ? <Tick cx={COLS[j] + 8} cy={y + 4} /> : r.checks[j] === "fail" ? <Cross cx={COLS[j] + 8} cy={y + 5} /> : <Price x={COLS[j] + 8} y={y + 11} size={18} anchor="middle">?</Price>}
                </g>
              ))}
              <Price x={780} y={y + 10} size={15} anchor="end" fill={r === best ? CAT.amberText : CAT.ink}>{r === best ? "Ordered" : r.passes ? "Passes" : "Fails"}</Price>
              {k < 3 ? <line x1={196} y1={y + 32} x2={780} y2={y + 32} {...hair} /> : null}
            </g>
          );
        })}
      </Frame>
      <Toggles
        label="Our store exposes"
        options={[{ id: "date", label: "Delivery-by date" }, { id: "cost", label: "Exact shipping cost" }, { id: "returns", label: "Return window" }]}
        value={on}
        onChange={setOn}
      />
    </div>
  );
}
