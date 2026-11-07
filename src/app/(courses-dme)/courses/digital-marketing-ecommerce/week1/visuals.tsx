"use client";

import React, { useState } from "react";
import {
  CAT,
  CatKey,
  Arrow,
  Frame,
  HalftoneDefs,
  LINE,
  Numeral,
  Price,
  Segmented,
  Slider,
  Tile,
  Toggles,
  headAlong,
  ht,
  r2,
} from "../_visuals/kit";
import {
  Agent,
  AmberCoin,
  Badge,
  Bottle,
  Coin,
  Cursor,
  Envelope,
  Espresso,
  Factory,
  Mug,
  OrderForm,
  Parcel,
  PayCard,
  Person,
  Receipt,
  Shop,
  Sneaker,
  Star,
  Stopwatch,
  Warehouse,
} from "../_visuals/objects";

/* ==========================================================================
   WEEK 1 PLATES: MAIL-ORDER CATALOGUE
   --------------------------------------------------------------------------
   Products engraved in halftone inside double-ruled white tiles, ink marks,
   and one amber mark for the slide's key idea. See the course CLAUDE.md.
   ========================================================================== */

const ink = { stroke: CAT.ink, strokeWidth: LINE.outline, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
const hair = { stroke: CAT.ink, strokeWidth: LINE.hair, strokeLinecap: "round" as const };

/**
 * Growth by addition against growth by connection. Each step, the retailer
 * opens one more warehouse. The marketplace gains one more buyer and one
 * more seller, and every buyer can now trade with every seller. Warehouses
 * grow in a line. Possible matches grow as a square.
 */
export function AddOneAtATime() {
  const [n, setN] = useState(4);
  const id = "w1-scale";
  const rowY = (k: number) => r2(134 + k * 24);
  return (
    <div>
      <Frame
        width={480}
        height={322}
        label={`Above, a retailer with ${n} warehouses in a row. Below, a marketplace with ${n} buyers and ${n} sellers, every buyer joined to every seller: ${n * n} possible matches.`}
      >
        <HalftoneDefs id={id} />
        <CatKey x={14} y={22} size={11}>
          Retailer
        </CatKey>
        {Array.from({ length: n }, (_, k) => (
          <Warehouse key={k} id={id} x={14 + k * 50} y={34} w={42} h={36} stock={false} />
        ))}
        <CatKey x={466} y={22} size={11} anchor="end">
          Warehouses
        </CatKey>
        <Price x={466} y={46} size={16} anchor="end">
          {n}
        </Price>
        <line x1={14} y1={88.5} x2={466} y2={88.5} {...hair} />
        <CatKey x={14} y={110} size={11}>
          Marketplace
        </CatKey>
        {/* every buyer to every seller */}
        {Array.from({ length: n }, (_, b) =>
          Array.from({ length: n }, (_, s) => (
            <line key={`${b}-${s}`} x1={92} y1={rowY(b)} x2={346} y2={rowY(s)} stroke={CAT.ink} strokeWidth={0.6} />
          )),
        )}
        {Array.from({ length: n }, (_, k) => (
          <g key={k}>
            <Person id={id} cx={74} cy={rowY(k) - 0.5} s={0.38} />
            <Shop id={id} x={352} y={rowY(k) - 9} w={26} h={18} />
          </g>
        ))}
        <CatKey x={466} y={110} size={11} anchor="end">
          Possible matches
        </CatKey>
        <Price x={466} y={136} size={20} anchor="end" fill={CAT.amberText}>
          {n * n}
        </Price>
      </Frame>
      <Slider label="Steps of growth" value={n} min={1} max={8} step={1} onChange={setN} />
    </div>
  );
}

/**
 * The same store built three ways, and one change to make. Pick the
 * architecture and the change: every part that has to be modified and
 * redeployed turns amber. In the monolith every change reaches the whole
 * block. Headless confines a page change to its head. Composable confines
 * a search swap to the search service.
 */
type Arch = "mono" | "headless" | "composable";
type Change = "page" | "agent" | "search";
type Head = "web" | "phone" | "kiosk" | "social" | "agent";

const HEADS: Head[] = ["web", "phone", "kiosk", "social", "agent"];

export function ArchitectureChange() {
  const [arch, setArch] = useState<Arch>("mono");
  const [change, setChange] = useState<Change>("page");
  const id = "w1-arch";
  const hx = (k: number) => 16 + k * 92;
  const hy = 18;
  const hw = 76;
  const hh = 58;
  // back-end parts
  const engine = ["Search", "Catalog", "Cart", "Checkout", "Orders"];
  const services = [
    { key: "Search", parts: ["Search"] },
    { key: "Content", parts: ["CMS"] },
    { key: "Commerce", parts: ["Catalog", "Cart", "Orders"] },
    { key: "Payments", parts: ["Checkout"] },
  ];
  // which heads exist
  const headsShown: Head[] = arch === "mono" ? (change === "agent" ? ["web", "agent"] : ["web"]) : change === "agent" ? HEADS : HEADS.filter((h) => h !== "agent");
  // what turns amber
  const headLit = (h: Head) => (arch === "mono" ? h === "web" || (h === "agent" && change === "agent") : (change === "page" && h === "web") || (change === "agent" && h === "agent"));
  const engineLit = arch === "mono" || (arch === "headless" && change === "search");
  const serviceLit = (k: string) => arch === "composable" && change === "search" && k === "Search";
  const total = headsShown.length + (arch === "composable" ? services.length : engine.length);
  const lit = headsShown.filter(headLit).length + (arch === "composable" ? services.filter((s) => serviceLit(s.key)).length : engineLit ? engine.length : 0);
  const amb = (on: boolean) => (on ? CAT.amber : CAT.tile);
  return (
    <div>
      <Frame
        width={480}
        height={262}
        label={`${{ mono: "Monolithic", headless: "Headless", composable: "Composable" }[arch]} store. Change: ${{ page: "redesign the web page", agent: "add an AI agent channel", search: "swap the search engine" }[change]}. ${lit} of ${total} parts must be modified and redeployed, shown in amber.`}
      >
        <HalftoneDefs id={id} />
        {/* the monolith's single block wraps the web head and the engine */}
        {arch === "mono" ? <rect x={hx(0) - 10} y={hy - 8} width={464} height={196} fill={CAT.tile} {...ink} strokeWidth={LINE.bold} /> : null}
        {/* heads */}
        {HEADS.map((h, k) =>
          headsShown.includes(h) ? (
            <g key={h}>
              <rect x={hx(k)} y={hy} width={hw} height={hh} fill={amb(headLit(h))} {...ink} />
              <HeadGlyph id={id} kind={h} cx={hx(k) + hw / 2} cy={hy + hh / 2} />
              {arch !== "mono" ? <line x1={hx(k) + hw / 2} y1={hy + hh} x2={hx(k) + hw / 2} y2={112} {...ink} /> : null}
            </g>
          ) : null,
        )}
        {arch !== "mono" ? (
          <g>
            <line x1={hx(0) + hw / 2} y1={112.5} x2={hx(4) + hw / 2} y2={112.5} stroke={CAT.ink} strokeWidth={LINE.bold} />
            <CatKey x={hx(4) + hw / 2 + 8} y={116} size={11}>
              API
            </CatKey>
          </g>
        ) : null}
        {/* back end */}
        {arch !== "composable" ? (
          <g>
            <rect x={hx(0)} y={128} width={444} height={56} fill={CAT.tile} {...ink} />
            {arch !== "mono" ? <line x1={r2(hx(0) + 222)} y1={112} x2={r2(hx(0) + 222)} y2={128} {...ink} /> : null}
            {engine.map((e, k) => (
              <g key={e}>
                <rect x={r2(hx(0) + 7 + k * 86.6)} y={137} width={80} height={38} fill={amb(engineLit)} {...ink} />
                <CatKey x={r2(hx(0) + 47 + k * 86.6)} y={160} anchor="middle" size={11}>
                  {e}
                </CatKey>
              </g>
            ))}
          </g>
        ) : (
          <g>
            {services.map((s, k) => (
              <g key={s.key}>
                <line x1={r2(hx(0) + 52 + k * 112)} y1={112} x2={r2(hx(0) + 52 + k * 112)} y2={128} {...ink} />
                <rect x={r2(hx(0) + k * 112)} y={128} width={104} height={56} fill={CAT.tile} {...ink} />
                <rect x={r2(hx(0) + 7 + k * 112)} y={137} width={90} height={38} fill={amb(serviceLit(s.key))} {...ink} />
                <CatKey x={r2(hx(0) + 52 + k * 112)} y={160} anchor="middle" size={11}>
                  {s.key}
                </CatKey>
              </g>
            ))}
          </g>
        )}
        <line x1={6} y1={214.5} x2={474} y2={214.5} {...hair} />
        <CatKey x={6} y={244} size={12}>
          Modified and redeployed
        </CatKey>
        <Price x={474} y={245} size={17} anchor="end" fill={CAT.amberText}>
          {`${lit} of ${total} parts`}
        </Price>
      </Frame>
      <Segmented<Arch>
        label="Architecture"
        value={arch}
        onChange={setArch}
        options={[
          { id: "mono", label: "Monolithic" },
          { id: "headless", label: "Headless" },
          { id: "composable", label: "Composable" },
        ]}
      />
      <Segmented<Change>
        label="Change"
        value={change}
        onChange={setChange}
        options={[
          { id: "page", label: "Redesign page" },
          { id: "agent", label: "Add AI agent" },
          { id: "search", label: "Swap search" },
        ]}
      />
    </div>
  );
}

/** The five storefront heads, each centred on (cx, cy): web page, phone, kiosk, short-video checkout and AI agent. */
function HeadGlyph({ id, kind, cx, cy }: { id: string; kind: Head; cx: number; cy: number }) {
  if (kind === "web")
    return (
      <g>
        <rect x={cx - 26} y={cy - 20} width={52} height={40} fill={CAT.tile} {...ink} />
        <Mug id={id} cx={cx - 10} cy={cy + 1} scale={0.55} />
        <line x1={cx + 4} y1={cy - 4} x2={cx + 20} y2={cy - 4} {...hair} />
        <line x1={cx + 4} y1={cy + 2} x2={cx + 16} y2={cy + 2} {...hair} />
      </g>
    );
  if (kind === "phone")
    return (
      <g>
        <rect x={cx - 12} y={cy - 23} width={24} height={46} rx={4} fill={CAT.tile} {...ink} />
        <rect x={cx - 9} y={cy - 17} width={18} height={30} fill={ht(id, "light")} {...hair} />
        <circle cx={cx} cy={cy + 18} r={1.6} fill="none" {...ink} />
      </g>
    );
  if (kind === "kiosk")
    return (
      <g>
        <rect x={cx - 14} y={cy - 24} width={28} height={30} fill={CAT.tile} {...ink} />
        <rect x={cx - 10} y={cy - 20} width={20} height={20} fill={ht(id, "light")} {...hair} />
        <path d={`M${cx - 4} ${cy + 6}V${cy + 20}M${cx + 4} ${cy + 6}V${cy + 20}M${cx - 12} ${cy + 22}H${cx + 12}`} fill="none" {...ink} />
      </g>
    );
  if (kind === "social")
    return (
      <g>
        <rect x={cx - 15} y={cy - 24} width={30} height={48} rx={3} fill={ht(id, "dense")} {...ink} />
        <path d={`M${cx - 5} ${cy - 10}L${cx + 8} ${cy - 2}L${cx - 5} ${cy + 6}Z`} fill={CAT.tile} {...ink} />
        <rect x={cx - 10} y={cy + 12} width={20} height={7} fill={CAT.tile} {...hair} />
      </g>
    );
  return <Agent id={id} cx={cx} cy={cy} s={0.9} />;
}

/**
 * What one click on the buy button sets off: four stations in order. Switch
 * on a failure and the run stops at the station that catches it. The
 * stations after it are never reached (dashed), and no money moves. Only a
 * clean run reaches the last station, where the funds are captured (amber).
 */
type Fail = "stock" | "fraud" | "decline";

export function CheckoutRun() {
  const [fails, setFails] = useState<Fail[]>([]);
  const id = "w1-checkout";
  const stopAt = fails.includes("stock") ? 0 : fails.includes("fraud") || fails.includes("decline") ? 2 : 4;
  const cx = (k: number) => 142 + k * 184;
  const keys = ["Inventory and tax", "Tokenization", "Fraud and authorization", "Commit and capture"];
  const lines = [["Inventory", "and tax"], ["Tokenization"], ["Fraud and", "authorization"], ["Commit and", "capture"]];
  const reached = (k: number) => k <= stopAt;
  const state = (k: number): "ok" | "stop" | "off" => (k < stopAt ? "ok" : k === stopAt ? "stop" : "off");
  return (
    <div>
      <Frame
        width={800}
        height={228}
        label={`A buy button starts four stations: inventory and tax, tokenization, fraud and authorization, commit and capture. ${stopAt === 4 ? "Every station passes and the funds are captured." : `The run stops at ${keys[stopAt].toLowerCase()}. Later stations are never reached and no money moves.`}`}
      >
        <HalftoneDefs id={id} />
        {/* buy button */}
        <rect x={6} y={66} width={44} height={22} rx={3} fill={CAT.tile} {...ink} />
        <CatKey x={28} y={81} anchor="middle" size={10}>
          Buy
        </CatKey>
        <Cursor x={36} y={82} scale={1} />
        {[0, 1, 2, 3].map((k) => {
          const st = state(k);
          const dash = st === "off" ? "3 3" : undefined;
          return (
            <g key={k}>
              {(
                <Arrow x1={k === 0 ? 54 : cx(k - 1) + 76} y1={77} x2={cx(k) - 76} y2={77} s={5} w={reached(k) ? LINE.outline : 0.5} />
              )}
              <rect x={cx(k) - 72} y={20} width={144} height={114} fill={CAT.tile} stroke={CAT.ink} strokeWidth={st === "off" ? 0.6 : 1} strokeDasharray={dash} />
              {st !== "off" ? <Station id={id} k={k} cx={cx(k)} fails={fails} /> : null}
              {st === "stop" && stopAt < 4 ? (
                <g>
                  <circle cx={cx(k) + 56} cy={38} r={11} fill={CAT.ink} />
                  <path d={`M${cx(k) + 51} 33L${cx(k) + 61} 43M${cx(k) + 61} 33L${cx(k) + 51} 43`} stroke={CAT.tile} strokeWidth={2} strokeLinecap="round" />
                </g>
              ) : null}
              <Numeral x={cx(k) - 72} y={160} size={15}>
                {k + 1}
              </Numeral>
              {lines[k].map((l, j) => (
                <CatKey key={l} x={cx(k) - 56} y={159 + j * 13} size={10}>
                  {l}
                </CatKey>
              ))}
            </g>
          );
        })}
        <line x1={10} y1={190.5} x2={790} y2={190.5} {...hair} />
        <CatKey x={10} y={216} size={11}>
          Money moved
        </CatKey>
        <Price x={130} y={217} size={16} fill={CAT.amberText}>
          {stopAt === 4 ? "$64.80 captured" : "none"}
        </Price>
      </Frame>
      <Toggles<Fail>
        label="Something goes wrong"
        value={fails}
        onChange={setFails}
        options={[
          { id: "stock", label: "Out of stock" },
          { id: "fraud", label: "Device looks fraudulent" },
          { id: "decline", label: "Bank declines the hold" },
        ]}
      />
    </div>
  );
}

/** The drawing inside each checkout station. */
function Station({ id, k, cx, fails }: { id: string; k: number; cx: number; fails: Fail[] }) {
  if (k === 0) {
    const out = fails.includes("stock");
    return (
      <g>
        {[54, 86].map((y) => (
          <line key={y} x1={cx - 60} y1={y} x2={cx + 4} y2={y} {...ink} />
        ))}
        {!out ? (
          <>
            <Parcel id={id} x={cx - 52} y={40} w={18} h={13} />
            <Parcel id={id} x={cx - 28} y={40} w={18} h={13} />
            <Parcel id={id} x={cx - 40} y={72} w={18} h={13} />
          </>
        ) : null}
        <path d={`M${cx + 16} 58H${cx + 52}L${cx + 62} 70L${cx + 52} 82H${cx + 16}Z`} fill={CAT.tile} {...ink} />
        <Price x={cx + 22} y={75} size={12}>
          +8%
        </Price>
        <Price x={cx - 56} y={118} size={11}>
          $60.00 + $4.80
        </Price>
      </g>
    );
  }
  if (k === 1)
    return (
      <g>
        <PayCard id={id} x={cx - 64} y={50} w={58} h={38} />
        <Arrow x1={cx} y1={69} x2={cx + 12} y2={69} s={4} />
        <rect x={cx + 14} y={56} width={52} height={26} fill={CAT.tile} {...ink} />
        <text x={cx + 40} y={73} textAnchor="middle" fontFamily="var(--font-body)" fontSize={10} fill={CAT.ink}>
          tok_7Hq2xK
        </text>
        <text x={cx - 64} y={110} fontFamily="var(--font-body)" fontSize={10.5} fill={CAT.ink}>
          4111 1111 1111 1111
        </text>
        <line x1={cx - 66} y1={107} x2={cx + 32} y2={107} {...ink} />
      </g>
    );
  if (k === 2) {
    const fraud = fails.includes("fraud");
    const a = fraud ? -0.35 : -2.6;
    return (
      <g>
        <path d={`M${cx - 66} 84A28 28 0 0 1 ${cx - 10} 84`} fill="none" {...ink} />
        {[0, 1, 2, 3, 4].map((j) => {
          const t = Math.PI + (j / 4) * Math.PI;
          return <line key={j} x1={r2(cx - 38 + 24 * Math.cos(t))} y1={r2(84 + 24 * Math.sin(t))} x2={r2(cx - 38 + 28 * Math.cos(t))} y2={r2(84 + 28 * Math.sin(t))} {...hair} />;
        })}
        <line x1={cx - 38} y1={84} x2={r2(cx - 38 + 22 * Math.cos(a))} y2={r2(84 + 22 * Math.sin(a))} stroke={CAT.ink} strokeWidth={LINE.bold} strokeLinecap="round" />
        <circle cx={cx - 38} cy={84} r={2.5} fill={CAT.ink} />
        {!fraud ? <Bank id={id} cx={cx + 36} cy={80} /> : null}
      </g>
    );
  }
  return (
    <g>
      <OrderForm x={cx - 66} y={40} w={40} h={68} />
      <Arrow x1={cx - 20} y1={74} x2={cx - 6} y2={74} s={4} />
      <Warehouse id={id} x={cx - 2} y={44} w={40} h={34} stock={false} />
      {[0, 1, 2].map((j) => (
        <AmberCoin key={j} id={id} cx={cx + 48} cy={r2(110 - j * 5.2)} amber />
      ))}
    </g>
  );
}

/** A bank front centred on (cx, cy): pediment, four columns and a step. */
function Bank({ id, cx, cy }: { id: string; cx: number; cy: number }) {
  return (
    <g>
      <path d={`M${cx - 26} ${cy - 18}L${cx} ${cy - 32}L${cx + 26} ${cy - 18}Z`} fill={ht(id, "light")} {...ink} />
      <rect x={cx - 24} y={cy - 18} width={48} height={5} fill={CAT.tile} {...ink} />
      {[0, 1, 2, 3].map((j) => (
        <rect key={j} x={cx - 20 + j * 12} y={cy - 12} width={5} height={22} fill={CAT.tile} {...ink} />
      ))}
      <rect x={cx - 28} y={cy + 10} width={56} height={5} fill={CAT.tile} {...ink} />
    </g>
  );
}

/**
 * Six monthly pages of a new marketplace: listing slots on the page, shopper
 * cursors beneath. Unseeded, both stay empty: nobody lists, nobody visits.
 * Seed one side (the platform's own stock, or a few marquee sellers on zero
 * commission, both in amber) and shoppers arrive, then sellers follow them.
 */
type Seeding = "none" | "own" | "marquee";
/** Each marquee seller draws more shoppers than an ordinary listing. */
const SEEDS: Record<Seeding, { slots: number; months: number; pull: number }> = {
  none: { slots: 0, months: 0, pull: 0 },
  own: { slots: 4, months: 3, pull: 11 },
  marquee: { slots: 3, months: 4, pull: 16 },
};

function coldStart(seeding: Seeding) {
  const f = (x: number) => 100 / (1 + Math.exp(-(x - 50) / 11));
  const { slots, months, pull } = SEEDS[seeding];
  const out: { b: number; s: number; seed: number }[] = [];
  let b = 0;
  let s = 0;
  for (let t = 0; t < 6; t++) {
    const seed = t < months ? slots : 0;
    out.push({ b, s, seed });
    s = s + 0.6 * (f(b) - s);
    b = b + 0.6 * (f(s + seed * pull) - b);
  }
  return out;
}

export function ColdStartSeed() {
  const [seeding, setSeeding] = useState<Seeding>("none");
  const id = "w1-cold";
  const months = coldStart(seeding);
  const pw = 84;
  const px = (t: number) => 14 + t * 90;
  return (
    <div>
      <Frame
        width={560}
        height={192}
        label={`Six monthly pages of a new marketplace. ${seeding === "none" ? "Unseeded: every page stays empty and no shopper cursors appear." : `Seeded with ${seeding === "own" ? "the platform's own stock" : "zero-commission marquee sellers"} (amber listings): shopper cursors grow, then third-party listings fill the pages. By month 6, ${Math.round(months[5].s / 11)} seller listings and ${Math.round(months[5].b / 10)} cursors.`}`}
      >
        <HalftoneDefs id={id} />
        {months.map((m, t) => {
          const organic = Math.min(9 - m.seed, Math.round(m.s / 11));
          const cursors = Math.round(m.b / 10);
          return (
            <g key={t}>
              <rect x={px(t)} y={8} width={pw} height={96} fill={CAT.tile} {...ink} />
              <rect x={px(t) + 3} y={11} width={pw - 6} height={90} fill="none" stroke={CAT.ink} strokeWidth={0.45} />
              {Array.from({ length: 9 }, (_, k) => {
                const cx = px(t) + 10 + (k % 3) * 22;
                const cy = 16 + Math.floor(k / 3) * 28;
                const isSeed = k < m.seed;
                const filled = isSeed || k < m.seed + organic;
                return (
                  <g key={k}>
                    <rect x={cx} y={cy} width={20} height={25} fill="none" stroke={CAT.ink} strokeWidth={0.4} strokeDasharray={filled ? undefined : "1.5 2"} />
                    {filled ? <Parcel id={id} x={cx + 3} y={cy + 7} w={11} h={9} tone={isSeed ? "amber" : "ink"} /> : null}
                    {isSeed && seeding === "own" ? <Badge cx={cx + 10} cy={cy + 20} r={3.2} /> : null}
                    {isSeed && seeding === "marquee" ? (
                      <CatKey x={cx + 10} y={cy + 23} anchor="middle" size={9}>
                        0%
                      </CatKey>
                    ) : null}
                  </g>
                );
              })}
              {Array.from({ length: cursors }, (_, k) => (
                <Cursor key={k} x={r2(px(t) + 10 + (k % 5) * 15)} y={r2(114 + Math.floor(k / 5) * 21)} scale={1} />
              ))}
              <CatKey x={px(t) + pw / 2 + 4} y={183} anchor="end" size={11}>
                Month
              </CatKey>
              <Numeral x={px(t) + pw / 2 + 8} y={184} size={14}>
                {t + 1}
              </Numeral>
            </g>
          );
        })}
      </Frame>
      <Segmented<Seeding>
        label="Launch"
        value={seeding}
        onChange={setSeeding}
        options={[
          { id: "none", label: "No seeding" },
          { id: "own", label: "Sell own stock first" },
          { id: "marquee", label: "Zero-commission marquee sellers" },
        ]}
      />
    </div>
  );
}

/**
 * One $80 pair of shoes, split two ways. Sold through a retailer, the maker
 * keeps $15 of it. Sold direct, the maker keeps the retailer's share too,
 * but pays to ship single pairs and to win each buyer. Drag the acquisition
 * cost to find where selling direct stops paying.
 */
const SHOE = { price: 80, cost: 25, wholesale: 40, ship: 9 };

export function DirectLedger() {
  const [cac, setCac] = useState(20);
  const id = "w1-ledger";
  const x0 = 118;
  const u = 3.6;
  const keptW = SHOE.wholesale - SHOE.cost;
  const keptD = SHOE.price - SHOE.cost - SHOE.ship - cac;
  const X = (v: number) => r2(x0 + v * u);
  type Seg = { v: number; key: string; fill: string; above: boolean };
  const rows: { key: string; y: number; segs: Seg[]; kept: number }[] = [
    {
      key: "Wholesale",
      y: 52,
      kept: keptW,
      segs: [
        { v: SHOE.cost, key: "Unit cost", fill: ht(id, "dense"), above: false },
        { v: keptW, key: "Kept", fill: CAT.amber, above: true },
        { v: SHOE.price - SHOE.wholesale, key: "Retailer", fill: ht(id, "light"), above: false },
      ],
    },
    {
      key: "D2C",
      y: 154,
      kept: keptD,
      segs: [
        { v: SHOE.cost, key: "Unit cost", fill: ht(id, "dense"), above: false },
        { v: SHOE.ship, key: "Fulfillment", fill: ht(id, "light"), above: true },
        { v: cac, key: "Acquisition", fill: ht(id, "light"), above: false },
        { v: keptD, key: "Kept", fill: CAT.amber, above: true },
      ],
    },
  ];
  return (
    <div>
      <Frame
        width={440}
        height={222}
        label={`One $80 pair split two ways. Wholesale: unit cost $25, the maker keeps $${keptW}, the retailer $40. Direct-to-consumer: unit cost $25, fulfillment $9, acquisition $${cac}, the maker keeps $${keptD}.`}
      >
        <HalftoneDefs id={id} />
        {rows.map((r) => {
          let acc = 0;
          return (
            <g key={r.key}>
              <CatKey x={12} y={r.y + 17} size={13}>
                {r.key}
              </CatKey>
              {r.segs.map((sg, k) => {
                const a = acc;
                acc += sg.v;
                if (sg.v <= 0) return null;
                const cx = r2((X(a) + X(acc)) / 2);
                return (
                  <g key={k}>
                    <rect x={X(a)} y={r.y} width={r2(sg.v * u)} height={24} fill={sg.fill} {...ink} />
                    <CatKey x={cx} y={sg.above ? r.y - 24 : r.y + 39} anchor="middle" size={11} fill={sg.key === "Kept" ? CAT.amberText : CAT.ink}>
                      {sg.key}
                    </CatKey>
                    <Price x={cx} y={sg.above ? r.y - 6 : r.y + 58} anchor="middle" size={14} fill={sg.key === "Kept" ? CAT.amberText : CAT.ink}>
                      {`$${sg.v}`}
                    </Price>
                  </g>
                );
              })}
            </g>
          );
        })}
        {/* the shelf price */}
        <line x1={X(SHOE.price)} y1={26} x2={X(SHOE.price)} y2={186} {...hair} strokeDasharray="2 3" />
        <Price x={X(SHOE.price) + 5} y={18} size={14} anchor="end">
          $80
        </Price>
        <CatKey x={X(SHOE.price) - 34} y={17} anchor="end" size={11}>
          Shelf price
        </CatKey>
      </Frame>
      <Slider label="Acquisition cost per order" value={cac} min={0} max={45} step={1} onChange={setCac} formatValue={(v) => `$${v}`} />
    </div>
  );
}

/**
 * The same sneaker, cost $20, sold two ways to the same shoppers (each $1
 * off the price sells one more pair, from 100 pairs at $0). Direct, the
 * brand sets the price that earns the most: $60. Through a retailer, the
 * brand first sets a wholesale price, then the retailer adds its own markup
 * to earn the most for itself. Move the wholesale price: the shelf price
 * (amber) always lands above $60, fewer pairs sell, and the two firms
 * together earn less than the direct channel.
 */
export function DoubleMarkup() {
  const [w, setW] = useState(60);
  const id = "w1-dm";
  const c = 20;
  const direct = { p: 60, q: 40, profit: 1600 };
  const p = Math.round((100 + w) / 2);
  const q = 100 - p;
  const joint = (p - c) * q;
  const cols = [
    { key: "Direct", x: 20, price: direct.p, q: direct.q, profit: direct.profit, steps: [c, direct.p] },
    { key: "Through a retailer", x: 250, price: p, q, profit: joint, steps: [c, w, p] },
  ];
  return (
    <div>
      <Frame
        width={480}
        height={316}
        label={`A $20 sneaker sold two ways. Direct: shelf price $60, 40 pairs sold, $1,600 earned. Through a retailer with a $${w} wholesale price: shelf price $${p}, ${q} pairs sold, $${joint.toLocaleString("en-US")} earned by the two firms together.`}
      >
        <HalftoneDefs id={id} />
        <line x1={240} y1={14} x2={240} y2={300} {...hair} />
        {cols.map((col, ci) => (
          <g key={col.key}>
            <CatKey x={col.x} y={26} size={12}>
              {col.key}
            </CatKey>
            {/* price ladder: cost, then each markup */}
            {col.steps.map((v, k) => {
              const y = 56 + k * 30;
              const shelf = k === col.steps.length - 1;
              return (
                <g key={k}>
                  <path
                    d={`M${col.x} ${y}H${col.x + 54}L${col.x + 64} ${y + 10}L${col.x + 54} ${y + 20}H${col.x}Z`}
                    fill={shelf && ci === 1 ? CAT.amber : CAT.tile}
                    {...ink}
                  />
                  <Price x={col.x + 8} y={y + 15} size={13}>
                    {`$${v}`}
                  </Price>
                  <CatKey x={col.x + 72} y={y + 14} size={10.5}>
                    {k === 0 ? "Cost" : shelf ? "Shelf price" : "Wholesale"}
                  </CatKey>
                </g>
              );
            })}
            <Sneaker id={id} cx={col.x + 186} cy={202} s={1} />
            {/* pairs sold, one parcel per four pairs */}
            {Array.from({ length: Math.round(col.q / 4) }, (_, k) => (
              <Parcel key={k} id={id} x={r2(col.x + (k % 5) * 30)} y={r2(206 - Math.floor(k / 5) * 22)} w={22} h={16} />
            ))}
            <CatKey x={col.x} y={246} size={11}>
              Pairs sold
            </CatKey>
            <Price x={col.x + 196} y={247} size={14} anchor="end">
              {col.q}
            </Price>
            <line x1={col.x} y1={258.5} x2={col.x + 196} y2={258.5} {...hair} />
            <CatKey x={col.x} y={282} size={11}>
              {ci === 0 ? "Brand earns" : "Both firms earn"}
            </CatKey>
            <Price x={col.x + 196} y={283} size={14} anchor="end">
              {`$${col.profit.toLocaleString("en-US")}`}
            </Price>
          </g>
        ))}
      </Frame>
      <Slider label="Wholesale price" value={w} min={22} max={90} step={2} onChange={setW} formatValue={(v) => `$${v}`} />
    </div>
  );
}

/**
 * A busy marketplace loses some of its shoppers in month 1. Each month after,
 * sellers respond to the buyers they saw and buyers to the sellers they
 * found. Above the line, shoppers. Below, shops. Set the size of the loss:
 * a small dip recovers, but past a tipping point the same loop runs in
 * reverse and both sides drain away.
 */
function flywheel(b0: number) {
  const f = (x: number) => 100 / (1 + Math.exp(-(x - 50) / 11));
  const out = [{ b: 85, s: 85 }];
  let b = b0;
  let s = 85;
  for (let t = 1; t <= 8; t++) {
    out.push({ b, s });
    s = s + 0.6 * (f(b) - s);
    b = b + 0.6 * (f(s) - b);
  }
  return out;
}

export function Flywheel() {
  const [left, setLeft] = useState(55);
  const id = "w1-flywheel";
  const pts = flywheel(left);
  const X = (t: number) => r2(40 + t * 42);
  const panels = [
    { key: "b" as const, top: 16 },
    { key: "s" as const, top: 146 },
  ];
  const Y = (top: number, v: number) => r2(top + 100 - v);
  const last = pts[pts.length - 1];
  return (
    <div>
      <Frame
        width={400}
        height={298}
        label={`Shoppers above and shops below over nine months. Month 0: both at 85. In month 1, ${left}% of shoppers remain. By month 8, shoppers stand at ${Math.round(last.b)} and shops at ${Math.round(last.s)}.`}
      >
        <HalftoneDefs id={id} />
        {panels.map((p) => (
          <g key={p.key}>
            <line x1={24} y1={p.top + 106.5} x2={386} y2={p.top + 106.5} {...hair} />
            <path d={`M${pts.map((q, t) => `${X(t)} ${Y(p.top, q[p.key])}`).join("L")}`} fill="none" {...ink} />
            {pts.map((q, t) =>
              p.key === "b" ? (
                <Person key={t} id={id} cx={X(t)} cy={r2(Y(p.top, q.b) - 2)} s={0.3} />
              ) : (
                <Shop key={t} id={id} x={r2(X(t) - 9)} y={r2(Y(p.top, q.s) - 7)} w={18} h={14} />
              ),
            )}
          </g>
        ))}
        {pts.map((_, t) => (
          <Numeral key={t} x={X(t)} y={274} size={12} anchor="middle">
            {t}
          </Numeral>
        ))}
        <CatKey x={X(4)} y={292} anchor="middle" size={9}>
          Month
        </CatKey>
      </Frame>
      <Slider label="Shoppers left after month 1" value={left} min={20} max={80} step={5} onChange={setLeft} formatValue={(v) => `${v}%`} />
    </div>
  );
}

/**
 * Real data: Wadi & Ma (2026a), hotel search over a 100-listing results page.
 * Mean listings inspected per session, drawn as a row of listing tiles (the
 * last tile cut to the fraction): human shoppers (Ursu, 2018, benchmark)
 * open about one. AI agents at their default reasoning effort open two to six.
 */
const INSPECTIONS = [
  { key: "Human shoppers", n: 1.12, human: true },
  { key: "Sonnet", n: 1.63 },
  { key: "Flash Lite", n: 3.12 },
  { key: "Luna", n: 4.0 },
  { key: "Flash", n: 4.25 },
  { key: "Pro", n: 5.83 },
];

export function InspectionsReal() {
  const id = "w1-inspect";
  const x0 = 150;
  const step = 32;
  const tw = 28;
  return (
    <Frame
      width={400}
      height={262}
      label={`Mean listings inspected per session, drawn as rows of listing tiles: ${INSPECTIONS.map((r) => `${r.key.toLowerCase()} ${r.n.toFixed(2)}`).join(", ")}. Human shoppers in ink, AI agents in purple.`}
    >
      <HalftoneDefs id={id} />
      <defs>
        {INSPECTIONS.map((r, i) => (
          <clipPath key={i} id={`${id}-clip-${i}`}>
            <rect x={x0} y={0} width={r2(Math.floor(r.n) * step + (r.n % 1) * tw)} height={262} />
          </clipPath>
        ))}
      </defs>
      <CatKey x={x0} y={16} size={10}>
        Listings inspected per session
      </CatKey>
      {INSPECTIONS.map((r, i) => {
        const y = 32 + i * 37;
        const tiles = Math.ceil(r.n);
        return (
          <g key={r.key}>
            {r.human ? <Person id={id} cx={14} cy={y + 15} s={0.38} /> : <Agent id={id} cx={14} cy={y + 15} s={0.42} tone="purple" />}
            <CatKey x={30} y={y + 19} size={9.5} fill={r.human ? CAT.ink : CAT.purple}>
              {r.key}
            </CatKey>
            <g clipPath={`url(#${id}-clip-${i})`}>
              {Array.from({ length: tiles }, (_, k) => (
                <g key={k}>
                  <rect x={x0 + k * step} y={y + 2} width={tw} height={26} fill={CAT.tile} stroke={r.human ? CAT.ink : CAT.purple} strokeWidth={1} />
                  <rect x={x0 + k * step + 4} y={y + 7} width={tw - 8} height={9} fill={r.human ? ht(id, "light") : CAT.purple} />
                  <line x1={x0 + k * step + 4} y1={y + 21} x2={x0 + k * step + tw - 6} y2={y + 21} stroke={r.human ? CAT.ink : CAT.purple} strokeWidth={0.5} />
                </g>
              ))}
            </g>
            <Price x={392} y={y + 20} size={13} anchor="end" fill={r.human ? CAT.ink : CAT.purple}>
              {r.n.toFixed(2)}
            </Price>
          </g>
        );
      })}
    </Frame>
  );
}

/**
 * The buyer meets the seller through the platform once: order 1 runs up
 * through the platform's page, which keeps its fee. Orders 2, 3 and 4 run
 * straight between them underneath, and the platform's page sees none.
 */
export function Leakage() {
  const id = "w1-leak";
  return (
    <Frame
      width={400}
      height={136}
      label="A buyer on the left and a seller's shop on the right. Order 1 runs up through the platform's page, which keeps a take-rate coin. Orders 2, 3 and 4 run as straight arrows between buyer and seller beneath the platform."
    >
      <HalftoneDefs id={id} />
      <Person id={id} cx={30} cy={98} s={0.85} />
      <Shop id={id} x={326} y={72} w={62} h={52} />
      {/* order 1 through the platform */}
      <Tile x={164} y={6} w={72} h={44} />
      <Badge cx={180} cy={22} r={6} />
      <line x1={192} y1={20} x2={226} y2={20} {...hair} />
      <line x1={192} y1={26} x2={218} y2={26} {...hair} />
      <Mug id={id} cx={204} cy={39} scale={0.38} />
      <path d="M44 70Q80 28 156 28" fill="none" {...ink} />
      <path d={headAlong(156, 28, 62, 0, 6)} fill="none" {...ink} />
      <path d="M244 28Q320 28 346 66" fill="none" {...ink} />
      <path d={headAlong(346, 66, 26, 38, 6)} fill="none" {...ink} />
      <Numeral x={82} y={38} size={14}>
        1
      </Numeral>
      <Coin id={id} cx={262} cy={9} rx={9} ry={2.6} t={2.6} />
      <CatKey x={276} y={13} size={10}>
        Take rate
      </CatKey>
      {/* repeat orders off the platform */}
      {[0, 1, 2].map((k) => {
        const y = 86 + k * 17;
        return (
          <g key={k}>
            <Arrow x1={58} y1={y} x2={318} y2={y} s={6} />
            <Numeral x={196} y={y - 4} size={12} anchor="middle">
              {k + 2}
            </Numeral>
          </g>
        );
      })}
    </Frame>
  );
}

/**
 * A thousand visitors pour through four handoffs. At each, some leave (the
 * figure in the gap). Fix one handoff or several and watch how many repeat
 * buyers come out of the bottom (amber). Each fix adds a few points at one
 * handoff, but its effect carries through every stage below it.
 */
type Fix = "landing" | "checkout" | "delivery";
const STAGES = ["Visits", "Product views", "Carts", "Orders", "Repeat buyers"];

export function LeakyFunnel() {
  const [fixes, setFixes] = useState<Fix[]>([]);
  const id = "w1-funnel";
  const rates = [fixes.includes("landing") ? 0.75 : 0.6, 0.25, fixes.includes("checkout") ? 0.6 : 0.4, fixes.includes("delivery") ? 0.4 : 0.3];
  const counts = [1000];
  rates.forEach((r) => counts.push(Math.round(counts[counts.length - 1] * r)));
  const cx = 206;
  const W = (n: number) => r2(Math.max(14, Math.sqrt(n / 1000) * 300));
  const ty = (k: number) => 14 + k * 54;
  return (
    <div>
      <Frame
        width={480}
        height={292}
        label={`A funnel of five tiers: ${STAGES.map((s, k) => `${s.toLowerCase()} ${counts[k]}`).join(", ")}. The number leaving at each handoff is printed in the gap.`}
      >
        <HalftoneDefs id={id} />
        {counts.map((n, k) => {
          const w = W(n);
          const last = k === counts.length - 1;
          return (
            <g key={k}>
              <rect x={r2(cx - w / 2)} y={ty(k)} width={w} height={32} fill={last ? CAT.amber : k % 2 ? ht(id, "dense") : ht(id, "light")} {...ink} />
              <CatKey x={368} y={ty(k) + 15} size={10} fill={last ? CAT.amberText : CAT.ink}>
                {STAGES[k]}
              </CatKey>
              <Price x={368} y={ty(k) + 30} size={14} fill={last ? CAT.amberText : CAT.ink}>
                {n.toLocaleString("en-US")}
              </Price>
              {k > 0 ? (
                <g>
                  <path d={`M${r2(cx - W(counts[k - 1]) / 2)} ${ty(k - 1) + 32}L${r2(cx - w / 2)} ${ty(k)}M${r2(cx + W(counts[k - 1]) / 2)} ${ty(k - 1) + 32}L${r2(cx + w / 2)} ${ty(k)}`} fill="none" {...hair} />
                  <Price x={r2(cx - W(counts[k - 1]) / 2 - 4)} y={ty(k) - 6} size={12} anchor="end">
                    {`−${(counts[k - 1] - n).toLocaleString("en-US")}`}
                  </Price>
                </g>
              ) : null}
            </g>
          );
        })}
      </Frame>
      <Toggles<Fix>
        label="Fix a handoff"
        value={fixes}
        onChange={setFixes}
        options={[
          { id: "landing", label: "Faster landing page" },
          { id: "checkout", label: "Simpler checkout" },
          { id: "delivery", label: "Faster delivery" },
        ]}
      />
    </div>
  );
}

/**
 * 1P above, 3P below. Above, the platform's own warehouse holds the stock
 * and the platform's page sells it. Below, three independent sellers keep
 * their own stock (purple) and the platform's page only lists, ranks and
 * checks out their goods.
 */
export function OneVsThree() {
  const id = "w1-1p3p";
  return (
    <Frame
      width={400}
      height={258}
      label="Above, 1P: the platform's own warehouse, stamped with its badge, holds ink parcels and feeds the platform's results page, which sells to a shopper. Below, 3P: three independent sellers' shops each hold purple parcels. Arrows run from them to their listings on the platform's results page, and on to a shopper."
    >
      <HalftoneDefs id={id} />
      <CatKey x={14} y={24} size={13}>
        1P
      </CatKey>
      <CatKey x={14} y={152} size={13}>
        3P
      </CatKey>
      <line x1={14} y1={128.5} x2={386} y2={128.5} {...hair} />
      {/* 1P */}
      <Warehouse id={id} x={44} y={30} w={92} h={70} />
      <Badge cx={90} cy={44} />
      <Arrow x1={144} y1={72} x2={172} y2={72} s={5} />
      <ResultsPage id={id} x={180} y={20} owners={["ink", "ink", "ink"]} />
      <Arrow x1={262} y1={72} x2={300} y2={72} s={5} />
      <Person id={id} cx={336} cy={72} s={0.95} />
      {/* 3P */}
      {[0, 1, 2].map((k) => {
        const y = 140 + k * 38;
        return (
          <g key={k}>
            <Shop id={id} x={44} y={y} w={40} h={30} />
            <Parcel id={id} x={94} y={y + 16} w={16} h={12} tone="purple" />
            <Arrow x1={122} y1={y + 18} x2={172} y2={r2(176 + (k - 1) * 14)} s={5} color={CAT.purple} />
          </g>
        );
      })}
      <ResultsPage id={id} x={180} y={160} owners={["purple", "purple", "purple"]} />
      <Badge cx={217} cy={151} r={6} />
      <Arrow x1={262} y1={206} x2={300} y2={206} s={5} />
      <Person id={id} cx={336} cy={206} s={0.95} />
    </Frame>
  );
}

/**
 * The platform's results page at (x, y): a white page of three ranked rows,
 * each with a numeral, a parcel and two name lines. `owners` colours each
 * row's parcel: ink for the platform's own stock, purple for a seller's.
 */
function ResultsPage({ id, x, y, owners }: { id: string; x: number; y: number; owners: ("ink" | "purple")[] }) {
  const w = 74;
  const h = 96;
  return (
    <g>
      <Tile x={x} y={y} w={w} h={h} />
      {owners.map((o, k) => {
        const ry = y + 10 + k * 28;
        return (
          <g key={k}>
            <Numeral x={x + 9} y={ry + 17} size={12}>
              {k + 1}
            </Numeral>
            <Parcel id={id} x={x + 22} y={ry + 8} w={14} h={10} tone={o} />
            <line x1={x + 44} y1={ry + 10} x2={x + 66} y2={ry + 10} {...hair} />
            <line x1={x + 44} y1={ry + 15} x2={x + 60} y2={ry + 15} {...hair} />
            {k < 2 ? <line x1={x + 8} y1={ry + 26} x2={x + w - 8} y2={ry + 26} stroke={CAT.ink} strokeWidth={0.3} /> : null}
          </g>
        );
      })}
    </g>
  );
}

/**
 * One results page on a hybrid platform: five mugs, clicks falling with
 * rank. One mug is the platform's own (its badge, its amber clicks), the
 * rest belong to third-party sellers. Move the platform's mug up the page:
 * each of its sales earns the platform the full markup, each seller sale
 * only the commission, so the platform's takings rise as the sellers' fall.
 */
const CLICKS = [10, 6, 4, 2, 1];
const OWN_MARGIN = 9;
const COMMISSION = 3;

export function OwnListingRank() {
  const [pos, setPos] = useState(4);
  const id = "w1-hybrid";
  const own = pos - 1;
  const ownClicks = CLICKS[own];
  const sellerClicks = CLICKS.reduce((a, c, k) => (k === own ? a : a + c), 0);
  const earns = ownClicks * OWN_MARGIN + sellerClicks * COMMISSION;
  const tw = 80;
  const gap = 13;
  const tx = (k: number) => 14 + k * (tw + gap);
  const ty = 118;
  return (
    <div>
      <Frame
        width={480}
        height={262}
        label={`A results page of five mugs with clicks falling from 10 at rank 1 to 1 at rank 5. The platform's own mug, marked with its badge and amber clicks, sits at rank ${pos}. The platform earns $${earns}. Third-party sellers get ${sellerClicks} sales.`}
      >
        <HalftoneDefs id={id} />
        {CLICKS.map((c, k) => {
          const mine = k === own;
          return (
            <g key={k}>
              {Array.from({ length: c }, (_, j) => (
                <Cursor key={j} x={r2(tx(k) + 26 + (j % 2) * 18)} y={r2(ty - 22 - Math.floor(j / 2) * 19)} scale={1.05} tone={mine ? "amber" : "ink"} />
              ))}
              <Tile x={tx(k)} y={ty} w={tw} h={86} />
              <Numeral x={tx(k) + 9} y={ty + 19} size={15}>
                {k + 1}
              </Numeral>
              {mine ? <Badge cx={tx(k) + tw - 14} cy={ty + 15} /> : null}
              <Mug id={id} cx={tx(k) + tw / 2} cy={ty + 42} scale={1.05} />
              <Price x={tx(k) + 10} y={ty + 77} size={13}>
                {mine ? "$12" : "$14"}
              </Price>
            </g>
          );
        })}
        <line x1={14} y1={222.5} x2={466} y2={222.5} {...hair} />
        <CatKey x={14} y={246} size={11}>
          Platform earns
        </CatKey>
        <Price x={150} y={247} size={16} fill={CAT.amberText}>
          {`$${earns}`}
        </Price>
        <CatKey x={340} y={246} size={11} anchor="end">
          {"Sellers' sales"}
        </CatKey>
        <Price x={350} y={247} size={16}>
          {sellerClicks}
        </Price>
      </Frame>
      <Slider label="Rank of the platform's own mug" value={pos} min={1} max={5} step={1} onChange={setPos} />
    </div>
  );
}

/**
 * Left, outside the store: a web page's display ad aimed by a crumbled
 * third-party cookie, its clicks scattered off target. Right, inside the
 * marketplace: a pile of SKUs competes for four first-page slots, the top
 * two sold as sponsored. The shopper's query and the receipt it ends in
 * close one loop (amber) that the store alone can see.
 */
export function RetailMediaLoop() {
  const id = "w1-rmn";
  const pile = Array.from({ length: 60 }, (_, k) => k);
  return (
    <Frame
      width={800}
      height={262}
      label="Left: a printed web page with a display ad box, a crumbled third-party cookie beside it, and cursors scattered around the ad rather than on it. Right: a pile of many small parcels marked millions of SKUs points at a results page with only four slots under the query sparkling water. The top two are sponsored. A cursor clicks the first, an arrow leads to a receipt, and a thick amber loop marked closed-loop, first-party intent data runs from the receipt back to the query."
    >
      <HalftoneDefs id={id} />
      {/* outside: display network */}
      <rect x={20} y={40} width={150} height={170} fill={CAT.tile} {...ink} />
      <rect x={30} y={50} width={96} height={9} fill={CAT.ink} />
      {[0, 1, 2, 3, 4, 5, 6].map((k) => (
        <line key={k} x1={30} y1={70 + k * 8} x2={k % 3 === 2 ? 110 : 128} y2={70 + k * 8} {...hair} />
      ))}
      <rect x={30} y={134} width={130} height={64} fill={ht(id, "light")} {...ink} />
      <rect x={60} y={150} width={70} height={32} fill={CAT.tile} {...ink} />
      <Mug id={id} cx={80} cy={166} scale={0.55} />
      <line x1={96} y1={162} x2={122} y2={162} {...hair} />
      <line x1={96} y1={168} x2={116} y2={168} {...hair} />
      {[
        [138, 70],
        [178, 168],
        [20, 222],
        [186, 206],
        [146, 226],
      ].map(([x, y], k) => (
        <Cursor key={k} x={x} y={y} scale={1} />
      ))}
      <CrumbledCookie id={id} cx={212} cy={70} />
      <CatKey x={212} y={108} anchor="middle" size={10}>
        Third-party
      </CatKey>
      <CatKey x={212} y={122} anchor="middle" size={10}>
        cookies
      </CatKey>
      <line x1={260} y1={20} x2={260} y2={244} {...hair} />
      {/* inside: the marketplace */}
      {pile.map((k) => (
        <Parcel key={k} id={id} x={r2(282 + (k % 6) * 15)} y={r2(110 + Math.floor(k / 6) * 11)} w={10} h={8} />
      ))}
      <CatKey x={326} y={236} anchor="middle" size={10}>
        Millions of SKUs
      </CatKey>
      <Arrow x1={380} y1={160} x2={402} y2={160} s={6} />
      <rect x={410} y={60} width={170} height={20} rx={10} fill={CAT.tile} {...ink} />
      <text x={424} y={74} fontFamily="var(--font-body)" fontSize={11} fill={CAT.ink}>
        sparkling water
      </text>
      <Tile x={410} y={90} w={170} h={150} />
      {[0, 1, 2, 3].map((j) => {
        const y = 98 + j * 35;
        return (
          <g key={j}>
            <Numeral x={420} y={y + 22} size={13}>
              {j + 1}
            </Numeral>
            <Bottle id={id} x={436} y={y + 6} />
            <line x1={460} y1={y + 15} x2={510} y2={y + 15} {...hair} />
            <line x1={460} y1={y + 21} x2={496} y2={y + 21} {...hair} />
            {j < 2 ? (
              <CatKey x={572} y={y + 14} anchor="end" size={8}>
                Sponsored
              </CatKey>
            ) : null}
            {j < 3 ? <line x1={418} y1={y + 33} x2={572} y2={y + 33} stroke={CAT.ink} strokeWidth={0.3} /> : null}
          </g>
        );
      })}
      <Cursor x={524} y={114} scale={1.1} />
      <Arrow x1={590} y1={130} x2={624} y2={130} s={6} />
      <Receipt x={632} y={98} w={70} h={112} />
      {/* the closed loop */}
      <path d="M702 112Q760 112 760 60Q760 30 640 30H596Q588 30 588 52V58" fill="none" stroke={CAT.ink} strokeWidth={5.2} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M702 112Q760 112 760 60Q760 30 640 30H596Q588 30 588 52V58" fill="none" stroke={CAT.amber} strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M580 50L588 62L596 50Z" fill={CAT.amber} stroke={CAT.ink} strokeWidth={0.8} strokeLinejoin="round" />
      <CatKey x={644} y={22} anchor="middle" size={10} fill={CAT.amberText}>
        Closed-loop, first-party intent data
      </CatKey>
    </Frame>
  );
}

/** A tracking cookie broken in two, centred on (cx, cy): halftone chips on a white biscuit. */
function CrumbledCookie({ id, cx, cy }: { id: string; cx: number; cy: number }) {
  return (
    <g>
      <path d={`M${cx - 2} ${cy - 18}A18 18 0 0 0 ${cx - 4} ${cy + 18}L${cx + 1} ${cy + 6}L${cx - 5} ${cy - 2}L${cx + 2} ${cy - 10}Z`} fill={ht(id, "light")} {...ink} />
      <path d={`M${cx + 5} ${cy - 18}L${cx + 9} ${cy - 9}L${cx + 3} ${cy - 1}L${cx + 9} ${cy + 7}L${cx + 4} ${cy + 18}A18 18 0 0 0 ${cx + 5} ${cy - 18}Z`} fill={ht(id, "light")} {...ink} transform={`translate(5 3)`} />
      {[
        [-9, -6],
        [-11, 6],
        [16, -4],
        [14, 10],
      ].map(([dx, dy], k) => (
        <circle key={k} cx={cx + dx} cy={cy + dy} r={2.6} fill={CAT.ink} />
      ))}
    </g>
  );
}

/**
 * Shoppers on the left, sellers on the right. Inside each side, the
 * same-side effect: one shopper's review helps the next. One seller's lower
 * tag pressures the other. Between the sides, the cross-side arcs: more
 * buyers draw more merchants, and more merchants draw more buyers.
 */
export function SidesDiagram() {
  const id = "w1-sides";
  return (
    <Frame
      width={400}
      height={250}
      label="Three shoppers on the left pass a five-star review card between them, marked same-side. Three shops on the right show price tags of $14 and $12, marked same-side. Two arcs, marked cross-side, run from the shoppers to the shops above and from the shops back to the shoppers below."
    >
      <HalftoneDefs id={id} />
      {/* buyers */}
      <CatKey x={80} y={56} anchor="middle" size={11}>
        Same-side
      </CatKey>
      <Person id={id} cx={46} cy={104} s={0.72} />
      <Person id={id} cx={46} cy={168} s={0.72} />
      <Person id={id} cx={116} cy={136} s={0.72} />
      <g>
        <rect x={66} y={70} width={44} height={16} fill={CAT.tile} {...ink} />
        {[0, 1, 2, 3, 4].map((k) => (
          <Star key={k} cx={r2(72 + k * 8)} cy={78} r={3.3} />
        ))}
      </g>
      <Arrow x1={60} y1={86} x2={64} y2={80} s={4} />
      <Arrow x1={104} y1={90} x2={112} y2={108} s={5} />
      {/* sellers */}
      <CatKey x={318} y={56} anchor="middle" size={11}>
        Same-side
      </CatKey>
      <Shop id={id} x={268} y={86} w={44} h={34} />
      <Shop id={id} x={268} y={150} w={44} h={34} />
      <Shop id={id} x={330} y={118} w={44} h={34} />
      <g>
        <path d="M322 76H354L362 84L354 92H322Z" fill={CAT.tile} {...ink} />
        <Price x={326} y={88} size={11}>
          $14
        </Price>
        <path d="M322 168H354L362 176L354 184H322Z" fill={CAT.tile} {...ink} />
        <Price x={326} y={180} size={11}>
          $12
        </Price>
        <Arrow x1={384} y1={94} x2={384} y2={166} s={5} />
      </g>
      {/* cross-side arcs */}
      <path d="M118 108Q200 50 262 96" fill="none" stroke={CAT.ink} strokeWidth={LINE.bold} strokeLinecap="round" />
      <path d={headAlong(262, 96, 62, 46, 7)} fill="none" stroke={CAT.ink} strokeWidth={LINE.bold} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M264 186Q200 236 124 170" fill="none" stroke={CAT.ink} strokeWidth={LINE.bold} strokeLinecap="round" />
      <path d={headAlong(124, 170, -76, -66, 7)} fill="none" stroke={CAT.ink} strokeWidth={LINE.bold} strokeLinecap="round" strokeLinejoin="round" />
      <CatKey x={200} y={142} anchor="middle" size={11}>
        Cross-side
      </CatKey>
    </Frame>
  );
}

/**
 * Three routes, one under each sentence. B2C: the retailer's shop sells to a
 * shopper. B2B: one firm's plant ships crates to another firm. D2C: the
 * manufacturer's parcel arcs over the shop straight to the shopper.
 */
export function ThreeRoutes() {
  const id = "w1-routes";
  const panel = (k: number) => 14 + k * 262;
  return (
    <Frame
      width={800}
      height={128}
      label="Three routes. B2C: a manufacturer supplies a shop, which sends a parcel to a shopper. B2B: one firm's plant sends a pallet of crates to another firm's plant. D2C: the manufacturer's arrow arcs over the shop straight to the shopper."
    >
      <HalftoneDefs id={id} />
      {[0, 1, 2].map((k) => (
        <CatKey key={k} x={panel(k) + 124} y={122} anchor="middle" size={12}>
          {["B2C", "B2B", "D2C"][k]}
        </CatKey>
      ))}
      {[1, 2].map((k) => (
        <line key={k} x1={panel(k) - 10} y1={14} x2={panel(k) - 10} y2={118} {...hair} />
      ))}
      {/* B2C */}
      <Factory id={id} x={panel(0)} y={58} w={60} h={44} />
      <Arrow x1={panel(0) + 66} y1={84} x2={panel(0) + 88} y2={84} s={5} />
      <Shop id={id} x={panel(0) + 94} y={56} w={56} h={46} />
      <Arrow x1={panel(0) + 156} y1={84} x2={panel(0) + 186} y2={84} s={5} />
      <Parcel id={id} x={panel(0) + 166} y={60} w={14} h={10} />
      <Person id={id} cx={panel(0) + 214} cy={80} s={0.85} />
      {/* B2B */}
      <Factory id={id} x={panel(1)} y={58} w={60} h={44} />
      <Arrow x1={panel(1) + 66} y1={92} x2={panel(1) + 176} y2={92} s={5} />
      <g>
        {[0, 1, 2].map((c) => (
          <rect key={c} x={panel(1) + 92 + c * 20} y={70} width={18} height={14} fill={c === 1 ? ht(id, "dense") : ht(id, "light")} {...ink} />
        ))}
        <rect x={panel(1) + 90} y={84} width={64} height={4} fill={CAT.tile} {...ink} />
      </g>
      <Factory id={id} x={panel(1) + 182} y={58} w={60} h={44} />
      {/* D2C */}
      <Factory id={id} x={panel(2)} y={58} w={60} h={44} />
      <Shop id={id} x={panel(2) + 94} y={56} w={56} h={46} />
      <path d={`M${panel(2) + 52} 54Q${panel(2) + 122} -4 ${panel(2) + 194} 58`} fill="none" stroke={CAT.ink} strokeWidth={LINE.bold} strokeLinecap="round" />
      <path d={headAlong(panel(2) + 194, 58, 72, 62, 7)} fill="none" stroke={CAT.ink} strokeWidth={LINE.bold} strokeLinecap="round" strokeLinejoin="round" />
      <Parcel id={id} x={panel(2) + 112} y={24} w={14} h={10} />
      <Person id={id} cx={panel(2) + 214} cy={80} s={0.85} />
    </Frame>
  );
}

/**
 * Ad spend buys visitors. A slow page loses them before they order. Coins
 * on the left, a grid of visitor cursors, the product page with its load
 * time, and the parcels that leave. The cost of each order is the one amber
 * figure. With no spend, even a fast page ships nothing.
 */
export function TrafficTimesStore() {
  const [spend, setSpend] = useState(1000);
  const [load, setLoad] = useState(6);
  const id = "w1-traffic";
  const visitors = spend; // $1 a click
  const rate = 0.032 * Math.exp(-0.3 * (load - 1));
  const orders = Math.round(visitors * rate);
  const cpo = orders > 0 ? Math.round(spend / orders) : null;
  const coins = Math.round(spend / 200);
  const cursors = Math.round(visitors / 100);
  const parcels = Math.round(orders / 4);
  return (
    <div>
      <Frame
        width={400}
        height={240}
        label={`Ad spend of $${spend} as ${coins} coins buys ${visitors} visitors, drawn as ${cursors} cursors, who reach a product page that loads in ${load} seconds. ${orders} orders leave as ${parcels} parcels. Cost per order: ${cpo === null ? "no orders" : `$${cpo}`}.`}
      >
        <HalftoneDefs id={id} />
        {/* coins */}
        {Array.from({ length: coins }, (_, k) => (
          <Coin key={k} id={id} cx={38} cy={r2(150 - k * 9)} />
        ))}
        <CatKey x={38} y={186} anchor="middle" size={10}>
          Ad spend
        </CatKey>
        <Price x={38} y={204} anchor="middle" size={14}>
          {`$${spend.toLocaleString("en-US")}`}
        </Price>
        {/* visitors */}
        {Array.from({ length: cursors }, (_, k) => (
          <Cursor key={k} x={r2(100 + (k % 4) * 15)} y={r2(144 - Math.floor(k / 4) * 22)} scale={0.95} />
        ))}
        <CatKey x={124} y={186} anchor="middle" size={10}>
          Visitors
        </CatKey>
        <Price x={124} y={204} anchor="middle" size={14}>
          {visitors.toLocaleString("en-US")}
        </Price>
        <Arrow x1={166} y1={110} x2={180} y2={110} s={5} />
        {/* product page with load time */}
        <Tile x={182} y={52} w={84} h={108} />
        <Mug id={id} cx={224} cy={92} scale={1.05} />
        <line x1={194} y1={122} x2={244} y2={122} {...hair} />
        <line x1={194} y1={127} x2={232} y2={127} {...hair} />
        <Price x={194} y={146} size={12}>
          $14
        </Price>
        <Stopwatch cx={224} cy={30} r={13} t={load} />
        <CatKey x={224} y={186} anchor="middle" size={10}>
          Page load
        </CatKey>
        <Price x={224} y={204} anchor="middle" size={14}>
          {`${load} s`}
        </Price>
        <Arrow x1={272} y1={110} x2={288} y2={110} s={5} />
        {/* parcels */}
        {Array.from({ length: parcels }, (_, k) => (
          <Parcel key={k} id={id} x={r2(300 + (k % 4) * 23)} y={r2(144 - Math.floor(k / 4) * 18)} w={17} h={12} />
        ))}
        <CatKey x={346} y={186} anchor="middle" size={10}>
          Orders
        </CatKey>
        <Price x={346} y={204} anchor="middle" size={14}>
          {orders}
        </Price>
        <line x1={12} y1={214.5} x2={388} y2={214.5} {...hair} />
        <CatKey x={200} y={231} anchor="end" size={10}>
          Cost per order
        </CatKey>
        <Price x={210} y={232} size={15} fill={CAT.amberText}>
          {cpo === null ? "no orders" : `$${cpo}`}
        </Price>
      </Frame>
      <Slider label="Ad spend" value={spend} min={0} max={2000} step={200} onChange={setSpend} formatValue={(v) => `$${v}`} />
      <Slider label="Page load" value={load} min={1} max={8} step={1} onChange={setLoad} formatValue={(v) => `${v} s`} />
    </div>
  );
}

/**
 * A catalogue spread. The left page is digital marketing: a search result,
 * an email and a printed ad send attention into the storefront, which sits
 * across the gutter. The right page is e-commerce: the order form, the
 * payment card and the parcel that complete the exchange.
 */
export function TwoPages() {
  const id = "w1-pages";
  const shopX = 400;
  return (
    <Frame
      width={800}
      height={248}
      label="A two-page catalogue spread. Left page, digital marketing: a search result, an email envelope and a printed ad send arrows into a storefront that straddles the gutter. Right page, e-commerce: arrows run from the storefront to an order form, a payment card and a parcel."
    >
      <HalftoneDefs id={id} />
      {/* the spread */}
      <rect x={14} y={10} width={772} height={228} fill={CAT.tile} {...ink} />
      <rect x={17} y={13} width={766} height={222} fill="none" stroke={CAT.ink} strokeWidth={0.45} />
      <line x1={400} y1={13} x2={400} y2={56} {...hair} />
      <line x1={400} y1={196} x2={400} y2={235} {...hair} />
      <CatKey x={36} y={38} size={12}>
        Digital marketing
      </CatKey>
      <CatKey x={764} y={38} size={12} anchor="end">
        E-commerce
      </CatKey>
      {/* left page: three channels */}
      <g>
        <Tile x={60} y={56} w={70} h={52} />
        <Numeral x={67} y={72} size={13}>
          1
        </Numeral>
        <Mug id={id} cx={98} cy={80} scale={0.6} />
        <line x1={70} y1={97} x2={110} y2={97} {...hair} />
        <Cursor x={136} y={90} scale={1} />
      </g>
      <Envelope id={id} x={60} y={124} w={70} h={44} />
      <g>
        <rect x={60} y={182} width={70} height={46} fill={CAT.tile} {...ink} />
        <Mug id={id} cx={80} cy={205} scale={0.55} />
        <CatKey x={113} y={202} anchor="middle" size={9}>
          −20%
        </CatKey>
        <line x1={100} y1={211} x2={124} y2={211} {...hair} />
      </g>
      {[82, 146, 205].map((y) => (
        <Arrow key={y} x1={156} y1={y} x2={322} y2={r2(126 + (y - 146) * 0.25)} s={6} />
      ))}
      {/* the storefront across the gutter */}
      <Shop id={id} x={shopX - 66} y={64} w={132} h={122} />
      {/* right page: order, payment, fulfillment */}
      {[
        { x: 520, key: "Order" },
        { x: 620, key: "Payment" },
        { x: 720, key: "Fulfillment" },
      ].map((s) => (
        <CatKey key={s.key} x={s.x} y={214} anchor="middle" size={10}>
          {s.key}
        </CatKey>
      ))}
      <Arrow x1={476} y1={136} x2={490} y2={136} s={6} />
      <OrderForm x={494} y={86} w={52} h={92} />
      <Arrow x1={554} y1={136} x2={584} y2={136} s={6} />
      <PayCard id={id} x={590} y={114} w={62} h={42} />
      <Arrow x1={660} y1={136} x2={686} y2={136} s={6} />
      <Parcel id={id} x={694} y={118} w={44} h={34} />
    </Frame>
  );
}

/**
 * One product page, read twice. The shopper sees the engraved photograph,
 * the heavy sale badge and the big price. Switch the reader to the AI agent
 * (purple) and the same page arrives as text: the HTML and a JSON record,
 * where the photograph is an empty image tag and the attributes the
 * shopper never saw are spelled out.
 */
type Reader = "human" | "agent";
const PAGE_CODE: { t: string; indent: number; strong?: boolean }[] = [
  { t: '<h1>Barista One espresso machine</h1>', indent: 0 },
  { t: '<img src="kitchen.jpg" alt="">', indent: 0 },
  { t: '<span class="badge">-15%</span>', indent: 0 },
  { t: '<script type="application/ld+json">', indent: 0 },
  { t: '{ "@type": "Product",', indent: 1, strong: true },
  { t: '"price": 349, "priceCurrency": "USD",', indent: 2, strong: true },
  { t: '"availability": "InStock",', indent: 2, strong: true },
  { t: '"boiler": "stainless steel",', indent: 2, strong: true },
  { t: '"noiseLevel": "58 dB",', indent: 2, strong: true },
  { t: '"aggregateRating": { "ratingValue": 4.6 } }', indent: 2, strong: true },
  { t: "</script>", indent: 0 },
];

export function TwoReaders() {
  const [reader, setReader] = useState<Reader>("human");
  const id = "w1-readers";
  return (
    <div>
      <Frame
        width={560}
        height={300}
        label={
          reader === "human"
            ? "The product page as a shopper sees it: an engraved photograph of an espresso machine on a kitchen counter, a heavy -15% badge, the product name, four stars, a $349 price and an add-to-cart button."
            : "The same page as an AI agent reads it: lines of HTML in which the photograph is an image tag with empty alt text, followed by a JSON product record giving price 349, in stock, stainless-steel boiler, 58 dB and rating 4.6."
        }
      >
        <HalftoneDefs id={id} />
        <rect x={14} y={12} width={532} height={276} fill={CAT.tile} {...ink} />
        <rect x={17} y={15} width={526} height={270} fill="none" stroke={CAT.ink} strokeWidth={0.45} />
        {reader === "human" ? (
          <g>
            <Person id={id} cx={512} cy={44} s={0.6} />
            {/* the photograph */}
            <rect x={34} y={34} width={250} height={234} fill={CAT.tile} {...ink} />
            <rect x={34} y={196} width={250} height={72} fill={ht(id, "light")} {...ink} />
            <rect x={210} y={52} width={56} height={70} fill={CAT.tile} {...hair} />
            <line x1={238} y1={52} x2={238} y2={122} {...hair} />
            <line x1={210} y1={87} x2={266} y2={87} {...hair} />
            <Espresso id={id} cx={130} cy={150} />
            {/* listing text */}
            <text x={306} y={84} fontFamily="var(--font-body)" fontSize={26} fill={CAT.ink}>
              Barista One
            </text>
            <line x1={306} y1={100} x2={460} y2={100} {...hair} />
            <line x1={306} y1={108} x2={430} y2={108} {...hair} />
            {[0, 1, 2, 3, 4].map((k) => (
              <Star key={k} cx={312 + k * 15} cy={128} r={5.5} on={k < 4} />
            ))}
            <Price x={306} y={186} size={40}>
              $349
            </Price>
            <g>
              <circle cx={460} cy={174} r={28} fill={CAT.ink} />
              <CatKey x={460} y={179} anchor="middle" size={14} fill={CAT.tile}>
                −15%
              </CatKey>
            </g>
            <rect x={306} y={214} width={150} height={34} fill={CAT.ink} />
            <CatKey x={381} y={235} anchor="middle" size={11} fill={CAT.tile}>
              Add to cart
            </CatKey>
          </g>
        ) : (
          <g>
            <Agent id={id} cx={512} cy={44} s={0.9} tone="purple" />
            {PAGE_CODE.map((l, k) => (
              <text
                key={k}
                x={34 + l.indent * 18}
                y={58 + k * 21}
                fontFamily="var(--font-body)"
                fontSize={13}
                fontWeight={l.strong ? 600 : 400}
                fill={l.strong ? CAT.purple : CAT.ink}
              >
                {l.t}
              </text>
            ))}
          </g>
        )}
      </Frame>
      <Segmented<Reader>
        label="Reader"
        value={reader}
        onChange={setReader}
        options={[
          { id: "human", label: "Human shopper" },
          { id: "agent", label: "AI shopping agent" },
        ]}
      />
    </div>
  );
}
