"use client";

import React, { useState } from "react";
import {
  CAT,
  CatKey,
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
import { Cursor, Mug, Star } from "../_visuals/objects";

/* ==========================================================================
   WEEK 01 PLATES: MAIL-ORDER CATALOGUE
   --------------------------------------------------------------------------
   Products engraved in halftone inside double-ruled white tiles, ink marks,
   and one amber mark for the slide's key idea. See the course CLAUDE.md.
   ========================================================================== */

const ink = { stroke: CAT.ink, strokeWidth: LINE.outline, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
const hair = { stroke: CAT.ink, strokeWidth: LINE.hair, strokeLinecap: "round" as const };

/** A straight arrow from (x1, y1) to (x2, y2), head at the end. */
function Arrow({ x1, y1, x2, y2, color = CAT.ink, w = LINE.outline, s = 6 }: { x1: number; y1: number; x2: number; y2: number; color?: string; w?: number; s?: number }) {
  return (
    <g stroke={color} strokeWidth={w} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
      <path d={headAlong(x2, y2, x2 - x1, y2 - y1, s)} />
    </g>
  );
}

/**
 * Growth by addition against growth by connection. Each step, the retailer
 * opens one more warehouse; the marketplace gains one more buyer and one
 * more seller, and every buyer can now trade with every seller. Warehouses
 * grow in a line; possible matches grow as a square.
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
          RETAILER
        </CatKey>
        {Array.from({ length: n }, (_, k) => (
          <Warehouse key={k} id={id} x={14 + k * 50} y={34} w={42} h={36} stock={false} />
        ))}
        <CatKey x={466} y={22} size={11} anchor="end">
          WAREHOUSES
        </CatKey>
        <Price x={466} y={46} size={16} anchor="end">
          {n}
        </Price>
        <line x1={14} y1={88.5} x2={466} y2={88.5} {...hair} />
        <CatKey x={14} y={110} size={11}>
          MARKETPLACE
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
          POSSIBLE MATCHES
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
 * A hundred visits to the retailer's product pages, one mark each: 82
 * cursors from people and 18 agent heads (purple) fetching specifications
 * for someone else.
 */
export function AgentShare() {
  const id = "w1-share";
  const agents = new Set([3, 11, 17, 24, 30, 38, 42, 49, 55, 61, 66, 72, 79, 84, 88, 93, 97, 26]);
  return (
    <Frame
      width={400}
      height={216}
      label="One hundred product page visits in a 20 by 5 grid: 82 cursors from human shoppers and 18 purple AI agent heads."
    >
      <HalftoneDefs id={id} />
      {Array.from({ length: 100 }, (_, k) => {
        const cx = 24 + (k % 20) * 18.5;
        const cy = 22 + Math.floor(k / 20) * 30;
        return agents.has(k) ? (
          <Agent key={k} id={id} cx={r2(cx)} cy={r2(cy + 2)} s={0.36} tone="purple" />
        ) : (
          <Cursor key={k} x={r2(cx - 4)} y={r2(cy - 8)} scale={1.05} />
        );
      })}
      <line x1={12} y1={176.5} x2={388} y2={176.5} {...hair} />
      <Price x={12} y={202} size={18} fill={CAT.purple}>
        18
      </Price>
      <CatKey x={42} y={200} size={11} fill={CAT.purple}>
        OF 100 PRODUCT PAGE VISITS
      </CatKey>
    </Frame>
  );
}

/**
 * The same store built three ways, and one change to make. Pick the
 * architecture and the change: every part that has to be modified and
 * redeployed turns amber. In the monolith every change reaches the whole
 * block; headless confines a page change to its head; composable confines
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
  const engine = ["SEARCH", "CATALOG", "CART", "CHECKOUT", "ORDERS"];
  const services = [
    { key: "SEARCH", parts: ["SEARCH"] },
    { key: "CONTENT", parts: ["CMS"] },
    { key: "COMMERCE", parts: ["CATALOG", "CART", "ORDERS"] },
    { key: "PAYMENTS", parts: ["CHECKOUT"] },
  ];
  // which heads exist
  const headsShown: Head[] = arch === "mono" ? (change === "agent" ? ["web", "agent"] : ["web"]) : change === "agent" ? HEADS : HEADS.filter((h) => h !== "agent");
  // what turns amber
  const headLit = (h: Head) => (arch === "mono" ? h === "web" || (h === "agent" && change === "agent") : (change === "page" && h === "web") || (change === "agent" && h === "agent"));
  const engineLit = arch === "mono" || (arch === "headless" && change === "search");
  const serviceLit = (k: string) => arch === "composable" && change === "search" && k === "SEARCH";
  const total = headsShown.length + (arch === "composable" ? services.length : engine.length);
  const lit = headsShown.filter(headLit).length + (arch === "composable" ? services.filter((s) => serviceLit(s.key)).length : engineLit ? engine.length : 0);
  const amb = (on: boolean) => (on ? CAT.amber : CAT.tile);
  return (
    <div>
      <Frame
        width={480}
        height={262}
        label={`${{ mono: "Monolithic", headless: "Headless", composable: "Composable" }[arch]} store; change: ${{ page: "redesign the web page", agent: "add an AI agent channel", search: "swap the search engine" }[change]}. ${lit} of ${total} parts must be modified and redeployed, shown in amber.`}
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
          MODIFIED AND REDEPLOYED
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
 * The AI shopping agent: a rounded console head with an antenna, two square
 * eyes and a halftone face, centred on (cx, cy); about 40 × 44 at s = 1.
 */
function Agent({ id, cx, cy, s = 1, tone = "ink" }: { id: string; cx: number; cy: number; s?: number; tone?: "ink" | "purple" }) {
  const c = tone === "purple" ? CAT.purple : CAT.ink;
  return (
    <g transform={`translate(${r2(cx)} ${r2(cy)}) scale(${s})`} stroke={c} strokeWidth={r2(LINE.outline / s)} strokeLinejoin="round">
      <line x1={0} y1={-16} x2={0} y2={-23} />
      <circle cx={0} cy={-24} r={2.4} fill={c} />
      <rect x={-19} y={-16} width={38} height={30} rx={8} fill={tone === "purple" ? CAT.purple : ht(id, "light")} />
      <rect x={-13} y={-10} width={26} height={16} rx={4} fill={CAT.tile} />
      <rect x={-8} y={-6} width={5} height={6} fill={c} stroke="none" />
      <rect x={3} y={-6} width={5} height={6} fill={c} stroke="none" />
      <path d="M-12 14V20H12V14" fill="none" />
    </g>
  );
}

/**
 * What one click on the buy button sets off: four stations in order. Switch
 * on a failure and the run stops at the station that catches it; the
 * stations after it are never reached (dashed), and no money moves. Only a
 * clean run reaches the last station, where the funds are captured (amber).
 */
type Fail = "stock" | "fraud" | "decline";

export function CheckoutRun() {
  const [fails, setFails] = useState<Fail[]>([]);
  const id = "w1-checkout";
  const stopAt = fails.includes("stock") ? 0 : fails.includes("fraud") || fails.includes("decline") ? 2 : 4;
  const cx = (k: number) => 142 + k * 184;
  const keys = ["INVENTORY AND TAX", "TOKENIZATION", "FRAUD AND AUTHORIZATION", "COMMIT AND CAPTURE"];
  const lines = [["INVENTORY", "AND TAX"], ["TOKENIZATION"], ["FRAUD AND", "AUTHORIZATION"], ["COMMIT AND", "CAPTURE"]];
  const reached = (k: number) => k <= stopAt;
  const state = (k: number): "ok" | "stop" | "off" => (k < stopAt ? "ok" : k === stopAt ? "stop" : "off");
  return (
    <div>
      <Frame
        width={800}
        height={228}
        label={`A buy button starts four stations: inventory and tax, tokenization, fraud and authorization, commit and capture. ${stopAt === 4 ? "Every station passes and the funds are captured." : `The run stops at ${keys[stopAt].toLowerCase()}; later stations are never reached and no money moves.`}`}
      >
        <HalftoneDefs id={id} />
        {/* buy button */}
        <rect x={6} y={66} width={44} height={22} rx={3} fill={CAT.tile} {...ink} />
        <CatKey x={28} y={81} anchor="middle" size={10}>
          BUY
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
          MONEY MOVED
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
        label={`Six monthly pages of a new marketplace. ${seeding === "none" ? "Unseeded: every page stays empty and no shopper cursors appear." : `Seeded with ${seeding === "own" ? "the platform's own stock" : "zero-commission marquee sellers"} (amber listings): shopper cursors grow, then third-party listings fill the pages; by month 6, ${Math.round(months[5].s / 11)} seller listings and ${Math.round(months[5].b / 10)} cursors.`}`}
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
                MONTH
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
 * Twelve espresso machines on one catalogue page, each with its price, noise
 * and boiler printed on the listing. Switch on the goal's constraints one at
 * a time: listings that fail drop to dashed outlines, and the set worth
 * considering shrinks to the few that pass every one (amber).
 */
type Constraint = "quiet" | "price" | "steel";
const MACHINES = [
  { price: 289, db: 66, steel: false },
  { price: 349, db: 58, steel: true },
  { price: 479, db: 55, steel: true },
  { price: 199, db: 71, steel: false },
  { price: 379, db: 62, steel: true },
  { price: 529, db: 57, steel: true },
  { price: 249, db: 59, steel: false },
  { price: 399, db: 56, steel: true },
  { price: 319, db: 68, steel: true },
  { price: 449, db: 60, steel: false },
  { price: 229, db: 64, steel: true },
  { price: 369, db: 61, steel: false },
];

export function ConstraintFilter() {
  const [on, setOn] = useState<Constraint[]>([]);
  const id = "w1-filter";
  const pass = (m: (typeof MACHINES)[number]) =>
    (!on.includes("quiet") || m.db < 60) && (!on.includes("price") || m.price < 400) && (!on.includes("steel") || m.steel);
  const kept = MACHINES.filter(pass).length;
  const tw = 112;
  const th = 76;
  return (
    <div>
      <Frame
        width={480}
        height={292}
        label={`Twelve espresso machine listings with price, noise in decibels and boiler type. Constraints on: ${on.length ? on.join(", ") : "none"}. ${kept} of 12 listings pass and stay drawn${on.length ? " in amber" : ""}; the rest are dashed outlines.`}
      >
        <HalftoneDefs id={id} />
        {MACHINES.map((m, k) => {
          const x = 8 + (k % 4) * (tw + 4);
          const y = 8 + Math.floor(k / 4) * (th + 5);
          const ok = pass(m);
          return ok ? (
            <g key={k}>
              <Tile x={x} y={y} w={tw} h={th} />
              <g transform={`translate(${x + 30} ${y + 31}) scale(0.32)`}>
                <Espresso id={id} cx={0} cy={0} />
              </g>
              {on.length > 0 ? <circle cx={x + tw - 12} cy={y + 13} r={4.5} fill={CAT.amber} stroke={CAT.ink} strokeWidth={0.8} /> : null}
              <Price x={x + 58} y={y + 28} size={14}>
                {`$${m.price}`}
              </Price>
              <CatKey x={x + 58} y={y + 46} size={10.5}>
                {`${m.db} DB`}
              </CatKey>
              <CatKey x={x + 10} y={y + th - 9} size={10.5}>
                {m.steel ? "STAINLESS" : "ALUMINUM"}
              </CatKey>
            </g>
          ) : (
            <rect key={k} x={x} y={y} width={tw} height={th} fill="none" stroke={CAT.ink} strokeWidth={0.6} strokeDasharray="3 3" />
          );
        })}
        <line x1={8} y1={258.5} x2={472} y2={258.5} {...hair} />
        <CatKey x={8} y={282} size={12}>
          LEFT TO CONSIDER
        </CatKey>
        <Price x={472} y={283} size={16} anchor="end" fill={CAT.amberText}>
          {`${kept} of 12`}
        </Price>
      </Frame>
      <Toggles<Constraint>
        label="Goal"
        value={on}
        onChange={setOn}
        options={[
          { id: "quiet", label: "Quiet" },
          { id: "price", label: "Under $400" },
          { id: "steel", label: "Stainless-steel boiler" },
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
      key: "WHOLESALE",
      y: 52,
      kept: keptW,
      segs: [
        { v: SHOE.cost, key: "UNIT COST", fill: ht(id, "dense"), above: false },
        { v: keptW, key: "KEPT", fill: CAT.amber, above: true },
        { v: SHOE.price - SHOE.wholesale, key: "RETAILER", fill: ht(id, "light"), above: false },
      ],
    },
    {
      key: "D2C",
      y: 154,
      kept: keptD,
      segs: [
        { v: SHOE.cost, key: "UNIT COST", fill: ht(id, "dense"), above: false },
        { v: SHOE.ship, key: "FULFILLMENT", fill: ht(id, "light"), above: true },
        { v: cac, key: "ACQUISITION", fill: ht(id, "light"), above: false },
        { v: keptD, key: "KEPT", fill: CAT.amber, above: true },
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
                    <CatKey x={cx} y={sg.above ? r.y - 24 : r.y + 39} anchor="middle" size={11} fill={sg.key === "KEPT" ? CAT.amberText : CAT.ink}>
                      {sg.key}
                    </CatKey>
                    <Price x={cx} y={sg.above ? r.y - 6 : r.y + 58} anchor="middle" size={14} fill={sg.key === "KEPT" ? CAT.amberText : CAT.ink}>
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
          SHELF PRICE
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
    { key: "DIRECT", x: 20, price: direct.p, q: direct.q, profit: direct.profit, steps: [c, direct.p] },
    { key: "THROUGH A RETAILER", x: 250, price: p, q, profit: joint, steps: [c, w, p] },
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
                    {k === 0 ? "COST" : shelf ? "SHELF PRICE" : "WHOLESALE"}
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
              PAIRS SOLD
            </CatKey>
            <Price x={col.x + 196} y={247} size={14} anchor="end">
              {col.q}
            </Price>
            <line x1={col.x} y1={258.5} x2={col.x + 196} y2={258.5} {...hair} />
            <CatKey x={col.x} y={282} size={11}>
              {ci === 0 ? "BRAND EARNS" : "BOTH FIRMS EARN"}
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
 * found. Above the line, shoppers; below, shops. Set the size of the loss:
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
          MONTH
        </CatKey>
      </Frame>
      <Slider label="Shoppers left after month 1" value={left} min={20} max={80} step={5} onChange={setLeft} formatValue={(v) => `${v}%`} />
    </div>
  );
}

/**
 * The order form every business model fills in: four ruled fields, one per
 * question, each with the thing it asks about drawn in the answer box: the
 * seller's shop, the buyer, the stock and the coins.
 */
export function FourQuestions() {
  const id = "w1-four";
  const rows = [
    { key: "WHO SELLS", y: 52 },
    { key: "WHO BUYS", y: 112 },
    { key: "WHO OWNS THE INVENTORY", y: 172 },
    { key: "HOW REVENUE IS EARNED", y: 232 },
  ];
  return (
    <Frame
      width={400}
      height={300}
      label="An order form with four ruled fields: who sells, beside a shop front; who buys, beside a shopper; who owns the inventory, beside stacked parcels; and how revenue is earned, beside a stack of coins."
    >
      <HalftoneDefs id={id} />
      <rect x={20} y={10} width={360} height={280} fill={CAT.tile} {...ink} />
      <rect x={23} y={13} width={354} height={274} fill="none" stroke={CAT.ink} strokeWidth={0.45} />
      <rect x={36} y={26} width={328} height={8} fill={CAT.ink} />
      {rows.map((r, k) => (
        <g key={r.key}>
          <Numeral x={38} y={r.y + 30} size={16}>
            {k + 1}
          </Numeral>
          <CatKey x={60} y={r.y + 29} size={11}>
            {r.key}
          </CatKey>
          <line x1={60} y1={r.y + 41.5} x2={268} y2={r.y + 41.5} {...hair} />
          <rect x={282} y={r.y} width={78} height={50} fill="none" {...hair} />
        </g>
      ))}
      <Shop id={id} x={300} y={58} w={42} h={38} />
      <Person id={id} cx={321} cy={140} s={0.78} />
      <g>
        <Parcel id={id} x={296} y={203} w={20} h={15} />
        <Parcel id={id} x={320} y={203} w={20} h={15} />
        <Parcel id={id} x={308} y={185} w={20} h={15} />
      </g>
      {[0, 1, 2, 3].map((k) => (
        <Coin key={k} id={id} cx={321} cy={r2(266 - k * 7)} rx={13} ry={3.5} t={3.5} />
      ))}
    </Frame>
  );
}

/**
 * A shopper, head-and-shoulders, centred on (cx, cy) at scale s: white face,
 * halftone coat with a dense shaded side. About 40 wide and 50 tall at s = 1.
 */
function Person({ id, cx, cy, s = 1, tone = "ink" }: { id: string; cx: number; cy: number; s?: number; tone?: "ink" | "purple" }) {
  const stroke = tone === "purple" ? CAT.purple : CAT.ink;
  return (
    <g transform={`translate(${r2(cx)} ${r2(cy)}) scale(${s})`} stroke={stroke} strokeWidth={r2(LINE.outline / s)} strokeLinejoin="round">
      <path d="M-20 26V14Q-20 2 -8 0H8Q20 2 20 14V26Z" fill={tone === "purple" ? CAT.purple : ht(id, "light")} />
      {tone === "ink" ? <path d="M6 0Q20 2 20 14V26H8Z" fill={ht(id, "dense")} stroke="none" /> : null}
      <path d="M-5 0L0 8L5 0" fill={CAT.tile} />
      <circle cx={0} cy={-12} r={10} fill={CAT.tile} />
      <path d="M-10 -14Q-9 -24 0 -23Q9 -24 10 -14Q5 -18 0 -18Q-5 -18 -10 -14Z" fill={tone === "purple" ? CAT.purple : CAT.ink} />
    </g>
  );
}

/**
 * Four scenes, one under each scenario. The shoe maker's own web store sends
 * buyers' emails back to the maker. The fastener portal reorders bolts for a
 * factory on credit terms. The craft platform takes 6.5% of each sale it
 * passes on. The grocery app's top results for sparkling water are paid slots.
 */
export function FourScenarios() {
  const id = "w1-scen";
  const px = (k: number) => 8 + k * 198;
  return (
    <Frame
      width={800}
      height={168}
      label="Four scenes. One: a shoe factory's own web store sells a sneaker and an email envelope returns from the store to the factory. Two: a distributor's crate of bolts runs to a factory, with an invoice on net 30 terms. Three: three craft sellers' shops feed a platform page that passes the sale to a shopper and keeps a 6.5% coin. Four: a grocery results page for sparkling water whose top two bottles are marked sponsored, a cursor clicking the first."
    >
      <HalftoneDefs id={id} />
      {[1, 2, 3].map((k) => (
        <line key={k} x1={px(k) - 6} y1={10} x2={px(k) - 6} y2={158} {...hair} />
      ))}
      {/* 1 · D2C shoe store with email capture */}
      <Factory id={id} x={px(0) + 6} y={70} w={56} h={42} />
      <Arrow x1={px(0) + 68} y1={100} x2={px(0) + 96} y2={100} s={5} />
      <Tile x={px(0) + 102} y={52} w={82} h={80} />
      <Sneaker id={id} cx={px(0) + 143} cy={84} s={1} />
      <Price x={px(0) + 112} y={122} size={12}>
        $90
      </Price>
      <path d={`M${px(0) + 140} 46Q${px(0) + 100} 18 ${px(0) + 48} 52`} fill="none" {...ink} />
      <path d={headAlong(px(0) + 48, 52, -40, 26, 5)} fill="none" {...ink} />
      <Envelope id={id} x={px(0) + 78} y={16} w={30} h={19} />
      {/* 2 · B2B fastener portal */}
      <Warehouse id={id} x={px(1) + 6} y={58} w={58} h={52} />
      <g>
        <rect x={px(1) + 78} y={92} width={42} height={22} fill={ht(id, "light")} {...ink} />
        {[0, 1, 2, 3].map((j) => (
          <Bolt key={j} x={r2(px(1) + 84 + j * 9)} y={74} />
        ))}
      </g>
      <Arrow x1={px(1) + 124} y1={104} x2={px(1) + 138} y2={104} s={5} />
      <Factory id={id} x={px(1) + 142} y={70} w={46} h={42} />
      <g>
        <rect x={px(1) + 72} y={20} width={56} height={42} fill={CAT.tile} {...ink} />
        <line x1={px(1) + 78} y1={29} x2={px(1) + 122} y2={29} {...hair} />
        <line x1={px(1) + 78} y1={35} x2={px(1) + 110} y2={35} {...hair} />
        <CatKey x={px(1) + 100} y={54} anchor="middle" size={9}>
          NET 30
        </CatKey>
      </g>
      {/* 3 · craft marketplace */}
      {[0, 1, 2].map((j) => (
        <g key={j}>
          <Shop id={id} x={px(2) + 2} y={30 + j * 40} w={32} h={26} />
          <Arrow x1={px(2) + 40} y1={43 + j * 40} x2={px(2) + 60} y2={r2(76 + (j - 1) * 12)} s={5} />
        </g>
      ))}
      <ResultsPage id={id} x={px(2) + 66} y={22} owners={["ink", "ink", "ink"]} />
      <Badge cx={px(2) + 103} cy={14} r={5} />
      <Arrow x1={px(2) + 146} y1={70} x2={px(2) + 158} y2={70} s={5} />
      <Person id={id} cx={px(2) + 175} cy={70} s={0.7} />
      <line x1={px(2) + 103} y1={122} x2={px(2) + 103} y2={138} {...hair} />
      <Coin id={id} cx={px(2) + 103} cy={142} rx={12} ry={3.2} t={3.2} />
      <CatKey x={px(2) + 121} y={149} size={10}>
        6.5%
      </CatKey>
      {/* 4 · grocery retail media */}
      <g>
        <rect x={px(3) + 8} y={14} width={176} height={142} fill={CAT.tile} {...ink} />
        <rect x={px(3) + 16} y={22} width={160} height={18} rx={9} fill="none" {...ink} />
        <text x={px(3) + 28} y={35} fontFamily="var(--font-body)" fontSize={10} fill={CAT.ink}>
          sparkling water
        </text>
        {[0, 1, 2].map((j) => {
          const y = 48 + j * 35;
          return (
            <g key={j}>
              <Bottle id={id} x={px(3) + 28} y={y + 4} />
              <line x1={px(3) + 52} y1={y + 14} x2={px(3) + 104} y2={y + 14} {...hair} />
              <line x1={px(3) + 52} y1={y + 19} x2={px(3) + 90} y2={y + 19} {...hair} />
              {j < 2 ? (
                <CatKey x={px(3) + 174} y={y + 13} anchor="end" size={8}>
                  SPONSORED
                </CatKey>
              ) : null}
              {j < 2 ? <line x1={px(3) + 16} y1={y + 33} x2={px(3) + 176} y2={y + 33} stroke={CAT.ink} strokeWidth={0.3} /> : null}
            </g>
          );
        })}
        <Cursor x={px(3) + 122} y={66} scale={1} />
      </g>
    </Frame>
  );
}

/** A low sneaker in profile centred on (cx, cy): halftone upper, white sole and laces. */
function Sneaker({ id, cx, cy, s = 1 }: { id: string; cx: number; cy: number; s?: number }) {
  return (
    <g transform={`translate(${r2(cx)} ${r2(cy)}) scale(${s})`} strokeLinejoin="round">
      <path d="M-28 8V-6Q-28 -14 -20 -14Q-14 -14 -12 -8Q-2 -6 10 0Q24 2 28 6V8Z" fill={ht(id, "light")} stroke={CAT.ink} strokeWidth={r2(LINE.outline / s)} />
      <path d="M-28 -2Q-20 0 -12 -8Q-14 -14 -20 -14Q-28 -14 -28 -6Z" fill={ht(id, "dense")} stroke="none" />
      <path d="M-30 8H30Q30 14 24 14H-26Q-30 14 -30 8Z" fill={CAT.tile} stroke={CAT.ink} strokeWidth={r2(LINE.outline / s)} />
      {[0, 1, 2].map((k) => (
        <line key={k} x1={-6 + k * 6} y1={-6 + k * 2} x2={-2 + k * 6} y2={-1 + k * 2} stroke={CAT.tile} strokeWidth={r2(1.6 / s)} />
      ))}
    </g>
  );
}

/** A hex-head bolt standing upright with its top at (x, y). */
function Bolt({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x - 1.8} y={y + 5} width={3.6} height={13} fill={CAT.tile} {...ink} />
      {[0, 1, 2, 3].map((k) => (
        <line key={k} x1={x - 1.8} y1={y + 8 + k * 3} x2={x + 1.8} y2={y + 6.5 + k * 3} {...hair} />
      ))}
      <rect x={x - 3.6} y={y} width={7.2} height={5} fill={CAT.ink} />
    </g>
  );
}

/** A small glass bottle with its top-left at (x, y): halftone body, white cap band. */
function Bottle({ id, x, y }: { id: string; x: number; y: number }) {
  return (
    <g>
      <path d={`M${x + 4} ${y}h6v5q4 3 4 8v12q0 2 -2 2h-10q-2 0 -2 -2v-12q0 -5 4 -8Z`} fill={ht(id, "light")} {...ink} />
      <rect x={x + 3.5} y={y - 3} width={7} height={4} fill={CAT.ink} />
      <rect x={x} y={y + 15} width={14} height={6} fill={CAT.tile} {...hair} />
    </g>
  );
}

/**
 * Five scenes, one under each stage. A creator's video sends a shopper into
 * the store; the shopper searches and opens a product page; the cart becomes
 * a signed order; the van carries the parcel home; the buyer leaves five
 * stars and the next parcel arrives on its own loop (amber), with no ad.
 */
export function FunnelStages() {
  const id = "w1-stages";
  const px = (k: number) => 4 + k * 159;
  return (
    <Frame
      width={800}
      height={132}
      label="Five scenes. Acquisition: a short video with a play mark and a cursor, an arrow to a shop front. Activation: a search field and a magnifier over a product page. Conversion: a shopping cart, an arrow to an order form with a tick. Fulfillment: a delivery van carrying a parcel toward a house. Retention: a five-star review card and an amber loop arrow bringing a second parcel."
    >
      <HalftoneDefs id={id} />
      {[1, 2, 3, 4].map((k) => (
        <line key={k} x1={px(k) - 6} y1={10} x2={px(k) - 6} y2={124} {...hair} />
      ))}
      {/* 1 acquisition */}
      <HeadGlyph id={id} kind="social" cx={px(0) + 30} cy={64} />
      <Cursor x={px(0) + 36} y={66} scale={1} />
      <Arrow x1={px(0) + 54} y1={66} x2={px(0) + 78} y2={66} s={5} />
      <Shop id={id} x={px(0) + 84} y={38} w={56} h={50} />
      {/* 2 activation */}
      <rect x={px(1) + 8} y={22} width={132} height={16} rx={8} fill={CAT.tile} {...ink} />
      <Tile x={px(1) + 18} y={46} w={70} h={70} />
      <Mug id={id} cx={px(1) + 53} cy={74} scale={0.8} />
      <line x1={px(1) + 28} y1={100} x2={px(1) + 72} y2={100} {...hair} />
      <g>
        <circle cx={px(1) + 112} cy={78} r={15} fill={CAT.tile} stroke={CAT.ink} strokeWidth={LINE.bold} />
        <line x1={px(1) + 123} y1={89} x2={px(1) + 136} y2={102} stroke={CAT.ink} strokeWidth={4} strokeLinecap="round" />
        <line x1={px(1) + 104} y1={74} x2={px(1) + 120} y2={74} {...hair} />
        <line x1={px(1) + 104} y1={80} x2={px(1) + 116} y2={80} {...hair} />
      </g>
      {/* 3 conversion */}
      <Cart id={id} cx={px(2) + 30} cy={68} s={1.5} />
      <Arrow x1={px(2) + 58} y1={68} x2={px(2) + 80} y2={68} s={5} />
      <OrderForm x={px(2) + 86} y={22} w={52} h={92} />
      <path d={`M${px(2) + 100} 98l6 6l12 -14`} fill="none" stroke={CAT.ink} strokeWidth={LINE.bold} strokeLinecap="round" strokeLinejoin="round" />
      {/* 4 fulfillment */}
      <Van id={id} x={px(3) + 6} y={50} />
      <Arrow x1={px(3) + 96} y1={84} x2={px(3) + 112} y2={84} s={5} />
      <House id={id} cx={px(3) + 132} cy={84} />
      {/* 5 retention */}
      <rect x={px(4) + 6} y={30} width={66} height={22} fill={CAT.tile} {...ink} />
      {[0, 1, 2, 3, 4].map((k) => (
        <Star key={k} cx={r2(px(4) + 15 + k * 12)} cy={41} r={4.4} />
      ))}
      <Person id={id} cx={px(4) + 36} cy={94} s={0.75} />
      <path d={`M${px(4) + 66} 104Q${px(4) + 140} 116 ${px(4) + 140} 80Q${px(4) + 140} 52 ${px(4) + 104} 52`} fill="none" stroke={CAT.ink} strokeWidth={4.6} strokeLinecap="round" />
      <path d={`M${px(4) + 66} 104Q${px(4) + 140} 116 ${px(4) + 140} 80Q${px(4) + 140} 52 ${px(4) + 104} 52`} fill="none" stroke={CAT.amber} strokeWidth={2.8} strokeLinecap="round" />
      <path d={`M${px(4) + 70} 97L${px(4) + 61} 104L${px(4) + 71} 110Z`} fill={CAT.amber} stroke={CAT.ink} strokeWidth={0.8} strokeLinejoin="round" />
      <Parcel id={id} x={px(4) + 110} y={70} w={20} h={15} tone="amber" />
    </Frame>
  );
}

/** A delivery van at (x, y), facing right: halftone body, white cab window, two wheels and a parcel in the back. */
function Van({ id, x, y }: { id: string; x: number; y: number }) {
  return (
    <g>
      <path d={`M${x} ${y}H${x + 58}V${y + 40}H${x}Z`} fill={ht(id, "light")} {...ink} />
      <path d={`M${x + 58} ${y + 10}H${x + 74}L${x + 86} ${y + 24}V${y + 40}H${x + 58}Z`} fill={CAT.tile} {...ink} />
      <path d={`M${x + 62} ${y + 14}H${x + 73}L${x + 81} ${y + 24}H${x + 62}Z`} fill={ht(id, "dense")} {...hair} />
      <circle cx={x + 16} cy={y + 41} r={6} fill={CAT.tile} {...ink} />
      <circle cx={x + 70} cy={y + 41} r={6} fill={CAT.tile} {...ink} />
      <rect x={x + 8} y={y + 8} width={26} height={18} fill={CAT.tile} {...hair} />
      <Parcel id={id} x={x + 13} y={y + 14} w={14} h={10} />
    </g>
  );
}

/**
 * Real data: Wadi & Ma (2026a), hotel search over a 100-listing results page.
 * Mean listings inspected per session, drawn as a row of listing tiles (the
 * last tile cut to the fraction): human shoppers (Ursu, 2018, benchmark)
 * open about one; AI agents at their default reasoning effort open two to six.
 */
const INSPECTIONS = [
  { key: "HUMAN SHOPPERS", n: 1.12, human: true },
  { key: "SONNET", n: 1.63 },
  { key: "FLASH LITE", n: 3.12 },
  { key: "LUNA", n: 4.0 },
  { key: "FLASH", n: 4.25 },
  { key: "PRO", n: 5.83 },
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
        LISTINGS INSPECTED PER SESSION
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
        TAKE RATE
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
 * A thousand visitors pour through four handoffs; at each, some leave (the
 * figure in the gap). Fix one handoff or several and watch how many repeat
 * buyers come out of the bottom (amber). Each fix adds a few points at one
 * handoff, but its effect carries through every stage below it.
 */
type Fix = "landing" | "checkout" | "delivery";
const STAGES = ["VISITS", "PRODUCT VIEWS", "CARTS", "ORDERS", "REPEAT BUYERS"];

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
 * One seller, three marketplaces. The same mug at the same price is listed
 * on three rival platforms, each with its own mark, so no one platform holds
 * the seller.
 */
export function MultiHoming() {
  const id = "w1-multi";
  const rows = [6, 46, 86];
  return (
    <Frame
      width={400}
      height={124}
      label="One seller's shop on the left with arrows to three rival marketplace pages, each marked with its own platform badge, each listing the same mug at $14."
    >
      <HalftoneDefs id={id} />
      <Shop id={id} x={12} y={32} w={72} h={60} />
      {rows.map((y, k) => (
        <g key={y}>
          <Arrow x1={94} y1={64} x2={182} y2={y + 16} s={6} />
          <Tile x={190} y={y} w={198} h={32} />
          <PlatformMark kind={k} cx={208} cy={y + 16} r={7} />
          <Mug id={id} cx={244} cy={y + 17} scale={0.5} />
          <line x1={268} y1={y + 13} x2={324} y2={y + 13} {...hair} />
          <line x1={268} y1={y + 19} x2={310} y2={y + 19} {...hair} />
          <Price x={378} y={y + 21} size={13} anchor="end">
            $14
          </Price>
        </g>
      ))}
    </Frame>
  );
}

/** Three rival platforms' marks: 0 is the course's ringed star; 1 a ringed square; 2 a ringed triangle. */
function PlatformMark({ kind, cx, cy, r = 8 }: { kind: number; cx: number; cy: number; r?: number }) {
  if (kind === 0) return <Badge cx={cx} cy={cy} r={r} />;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={CAT.tile} {...ink} />
      {kind === 1 ? (
        <rect x={r2(cx - r * 0.42)} y={r2(cy - r * 0.42)} width={r2(r * 0.84)} height={r2(r * 0.84)} fill={CAT.ink} />
      ) : (
        <path d={`M${cx} ${r2(cy - r * 0.55)}L${r2(cx + r * 0.5)} ${r2(cy + r * 0.35)}H${r2(cx - r * 0.5)}Z`} fill={CAT.ink} />
      )}
    </g>
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
      label="Above, 1P: the platform's own warehouse, stamped with its badge, holds ink parcels and feeds the platform's results page, which sells to a shopper. Below, 3P: three independent sellers' shops each hold purple parcels; arrows run from them to their listings on the platform's results page, and on to a shopper."
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

/** A warehouse at (x, y), w × h: gabled roof in halftone, roller door with stacked parcels. */
function Warehouse({ id, x, y, w, h, stock = true }: { id: string; x: number; y: number; w: number; h: number; stock?: boolean }) {
  const roof = r2(h * 0.3);
  const dw = r2(w * 0.5);
  const dx = r2(x + (w - dw) / 2);
  return (
    <g>
      <path d={`M${x} ${y + roof}L${r2(x + w / 2)} ${y}L${x + w} ${y + roof}Z`} fill={ht(id, "light")} {...ink} />
      <rect x={x} y={y + roof} width={w} height={h - roof} fill={CAT.tile} {...ink} />
      <rect x={dx} y={r2(y + roof + 10)} width={dw} height={r2(h - roof - 10)} fill={CAT.tile} {...ink} />
      {stock ? (
        <>
          <Parcel id={id} x={dx + 4} y={y + h - 13} w={16} h={12} />
          <Parcel id={id} x={dx + 24} y={y + h - 13} w={16} h={12} />
          <Parcel id={id} x={dx + 14} y={y + h - 27} w={16} h={12} />
        </>
      ) : (
        [1, 2, 3].map((k) => <line key={k} x1={dx} y1={r2(y + roof + 10 + k * ((h - roof - 10) / 4))} x2={dx + dw} y2={r2(y + roof + 10 + k * ((h - roof - 10) / 4))} {...hair} />)
      )}
    </g>
  );
}

/** The platform's badge: a ringed star, its mark on whatever it owns or runs. */
function Badge({ cx, cy, r = 7 }: { cx: number; cy: number; r?: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={CAT.tile} {...ink} />
      <Star cx={cx} cy={cy} r={r * 0.62} />
    </g>
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
        label={`A results page of five mugs with clicks falling from 10 at rank 1 to 1 at rank 5. The platform's own mug, marked with its badge and amber clicks, sits at rank ${pos}. The platform earns $${earns}; third-party sellers get ${sellerClicks} sales.`}
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
          PLATFORM EARNS
        </CatKey>
        <Price x={150} y={247} size={16} fill={CAT.amberText}>
          {`$${earns}`}
        </Price>
        <CatKey x={340} y={246} size={11} anchor="end">
          {"SELLERS' SALES"}
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
 * The shop front students see, and the filing cabinet behind it: five
 * drawers holding the catalog, the stock counts, the price rules, the carts
 * and the payments, each drawer with its contents drawn on the label.
 */
export function RecordCabinet() {
  const id = "w1-cabinet";
  const drawers = 5;
  const dy = (k: number) => 38 + k * 46;
  return (
    <Frame
      width={400}
      height={282}
      label="A shop front on the left joined by lines to a five-drawer filing cabinet on the right; the drawer labels show a catalogue, a parcel, a price tag, a shopping cart and a payment card."
    >
      <HalftoneDefs id={id} />
      <Shop id={id} x={16} y={90} w={128} h={110} />
      {/* cabinet */}
      <rect x={226} y={22} width={160} height={250} fill={ht(id, "light")} {...ink} />
      {Array.from({ length: drawers }, (_, k) => (
        <g key={k}>
          <rect x={236} y={dy(k) - 8} width={140} height={40} fill={CAT.tile} {...ink} />
          <rect x={252} y={dy(k) - 2} width={52} height={28} fill={CAT.tile} {...hair} />
          <rect x={330} y={dy(k) + 9} width={30} height={6} rx={3} fill={CAT.tile} {...ink} />
          <line x1={152} y1={145} x2={234} y2={r2(dy(k) + 12)} {...hair} />
        </g>
      ))}
      {/* label contents */}
      <Catalogue id={id} cx={278} cy={dy(0) + 12} />
      <Parcel id={id} x={268} y={dy(1) + 8} w={18} h={13} />
      <g>
        <path d={`M262 ${dy(2) + 4}H286L294 ${dy(2) + 12}L286 ${dy(2) + 20}H262Z`} fill={CAT.tile} {...ink} />
        <circle cx={286} cy={dy(2) + 12} r={1.6} fill="none" {...ink} />
        <Price x={265} y={dy(2) + 16} size={9}>
          $14
        </Price>
      </g>
      <Cart id={id} cx={278} cy={dy(3) + 12} />
      <PayCard id={id} x={264} y={dy(4) + 3} w={30} h={19} />
    </Frame>
  );
}

/** A catalogue booklet centred on (cx, cy): halftone cover with a white title panel. */
function Catalogue({ id, cx, cy }: { id: string; cx: number; cy: number }) {
  return (
    <g>
      <rect x={cx - 9} y={cy - 11} width={20} height={23} fill={CAT.tile} {...ink} />
      <rect x={cx - 11} y={cy - 12} width={20} height={23} fill={ht(id, "light")} {...ink} />
      <rect x={cx - 8} y={cy - 8} width={14} height={6} fill={CAT.tile} {...hair} />
    </g>
  );
}

/** A shopping cart centred on (cx, cy): basket in halftone, handle and two wheels. */
function Cart({ id, cx, cy, s = 1, tone = "ink" }: { id: string; cx: number; cy: number; s?: number; tone?: "ink" | "amber" }) {
  return (
    <g transform={`translate(${r2(cx)} ${r2(cy)}) scale(${s})`} strokeLinejoin="round" strokeLinecap="round">
      <path d="M-16 -10H-11L-6 6H10L14 -5H-9" fill="none" stroke={CAT.ink} strokeWidth={r2(LINE.outline / s)} />
      <path d="M-9 -5H14L10 6H-6Z" fill={tone === "amber" ? CAT.amber : ht(id, "light")} stroke={CAT.ink} strokeWidth={r2(LINE.outline / s)} />
      <circle cx={-4} cy={10} r={2} fill={CAT.tile} stroke={CAT.ink} strokeWidth={r2(LINE.outline / s)} />
      <circle cx={8} cy={10} r={2} fill={CAT.tile} stroke={CAT.ink} strokeWidth={r2(LINE.outline / s)} />
    </g>
  );
}

/**
 * Left, outside the store: a web page's display ad aimed by a crumbled
 * third-party cookie, its clicks scattered off target. Right, inside the
 * marketplace: a pile of SKUs competes for four first-page slots, the top
 * two sold as sponsored; the shopper's query and the receipt it ends in
 * close one loop (amber) that the store alone can see.
 */
export function RetailMediaLoop() {
  const id = "w1-rmn";
  const pile = Array.from({ length: 60 }, (_, k) => k);
  return (
    <Frame
      width={800}
      height={262}
      label="Left: a printed web page with a display ad box, a crumbled third-party cookie beside it, and cursors scattered around the ad rather than on it. Right: a pile of many small parcels marked millions of SKUs points at a results page with only four slots under the query sparkling water; the top two are sponsored. A cursor clicks the first, an arrow leads to a receipt, and a thick amber loop marked closed-loop, first-party intent data runs from the receipt back to the query."
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
        THIRD-PARTY
      </CatKey>
      <CatKey x={212} y={122} anchor="middle" size={10}>
        COOKIES
      </CatKey>
      <line x1={260} y1={20} x2={260} y2={244} {...hair} />
      {/* inside: the marketplace */}
      {pile.map((k) => (
        <Parcel key={k} id={id} x={r2(282 + (k % 6) * 15)} y={r2(110 + Math.floor(k / 6) * 11)} w={10} h={8} />
      ))}
      <CatKey x={326} y={236} anchor="middle" size={10}>
        MILLIONS OF SKUs
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
                SPONSORED
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
        CLOSED-LOOP, FIRST-PARTY INTENT DATA
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

/** A till receipt at (x, y): zigzag foot, item lines with prices, and a total rule. */
function Receipt({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const zig = Array.from({ length: Math.floor(w / 7) }, (_, k) => `L${r2(x + w - (k + 0.5) * 7)} ${y + h + 4}L${r2(x + w - (k + 1) * 7)} ${y + h}`).join("");
  return (
    <g>
      <path d={`M${x} ${y}H${x + w}V${y + h}${zig}L${x} ${y + h}Z`} fill={CAT.tile} {...ink} />
      {[0, 1, 2].map((k) => (
        <g key={k}>
          <line x1={x + 7} y1={y + 18 + k * 14} x2={x + 36} y2={y + 18 + k * 14} {...hair} />
          <line x1={x + w - 20} y1={y + 18 + k * 14} x2={x + w - 7} y2={y + 18 + k * 14} {...hair} />
        </g>
      ))}
      <line x1={x + 7} y1={y + 66} x2={x + w - 7} y2={y + 66} {...ink} />
      <Price x={x + w - 7} y={y + 82} size={11} anchor="end">
        $8.97
      </Price>
      <rect x={x + 10} y={y + 92} width={w - 20} height={8} fill="none" {...hair} />
      {Array.from({ length: 12 }, (_, k) => (
        <line key={k} x1={r2(x + 12 + k * ((w - 24) / 11))} y1={y + 93} x2={r2(x + 12 + k * ((w - 24) / 11))} y2={y + 99} stroke={CAT.ink} strokeWidth={k % 3 ? 0.6 : 1.4} />
      ))}
    </g>
  );
}

/**
 * Four firms, one month. Each earns by its own model, drawn under its stack
 * of coins: a price tag (markup), a seller statement (take rate), a
 * membership card (subscription) and a sponsored listing (retail media).
 * Move shopper traffic and three stacks move with it; only the members who
 * renew move the subscription stack.
 */
export function RevenueDrivers() {
  const [visits, setVisits] = useState(50);
  const [renew, setRenew] = useState(80);
  const id = "w1-revenue";
  const v = visits * 1000;
  const models = [
    { key: "RETAIL MARKUP", rev: v * 0.03 * 9 },
    { key: "TAKE RATE", rev: v * 0.03 * 4.5 + 500 },
    { key: "SUBSCRIPTION", rev: 1500 * (renew / 100) * 10 },
    { key: "RETAIL MEDIA", rev: v * 0.06 },
  ];
  const cx = (k: number) => 76 + k * 136;
  const base = 178;
  const fmt = (n: number) => `$${(n / 1000).toFixed(1)}k`;
  return (
    <div>
      <Frame
        width={560}
        height={262}
        label={`Monthly revenue as stacks of coins, each coin $1,000, for four firms at ${v.toLocaleString("en-US")} visits and ${renew}% of members renewing: retail markup ${fmt(models[0].rev)} above a price tag, take rate ${fmt(models[1].rev)} above a seller statement, subscription ${fmt(models[2].rev)} above a membership card, retail media ${fmt(models[3].rev)} above a sponsored listing.`}
      >
        <HalftoneDefs id={id} />
        {models.map((m, k) => {
          const n = Math.max(1, Math.round(m.rev / 1000));
          return (
            <g key={m.key}>
              {Array.from({ length: n }, (_, j) => (
                <AmberCoin key={j} id={id} cx={cx(k)} cy={r2(base - 8 - j * 5.2)} amber={k === 2} />
              ))}
              <Price x={cx(k)} y={r2(base - 8 - (n - 1) * 5.2 - 12)} anchor="middle" size={14} fill={k === 2 ? CAT.amberText : CAT.ink}>
                {fmt(m.rev)}
              </Price>
              <CatKey x={cx(k)} y={256} anchor="middle" size={11}>
                {m.key}
              </CatKey>
            </g>
          );
        })}
        <line x1={14} y1={base + 4.5} x2={546} y2={base + 4.5} {...hair} />
        {/* price tag */}
        <g>
          <path d={`M${cx(0) - 26} 198H${cx(0) + 16}L${cx(0) + 28} 211L${cx(0) + 16} 224H${cx(0) - 26}Z`} fill={CAT.tile} {...ink} />
          <circle cx={cx(0) + 17} cy={211} r={2.2} fill="none" {...ink} />
          <Price x={cx(0) - 20} y={216} size={13}>
            $14
          </Price>
          <CatKey x={cx(0) - 26} y={238} size={10}>
            COST $5
          </CatKey>
        </g>
        {/* seller statement */}
        <g>
          <rect x={cx(1) - 24} y={192} width={48} height={46} fill={CAT.tile} {...ink} />
          <line x1={cx(1) - 18} y1={202} x2={cx(1) + 18} y2={202} {...hair} />
          <line x1={cx(1) - 18} y1={208} x2={cx(1) + 10} y2={208} {...hair} />
          <CatKey x={cx(1)} y={226} anchor="middle" size={11}>
            −15%
          </CatKey>
        </g>
        {/* membership card */}
        <g>
          <rect x={cx(2) - 34} y={192} width={68} height={42} rx={4} fill={CAT.tile} {...ink} />
          <Badge cx={cx(2) - 16} cy={208} r={6} />
          <Price x={cx(2) + 24} y={212} anchor="end" size={11}>
            $10
          </Price>
          <CatKey x={cx(2) + 26} y={228} anchor="end" size={9}>
            MONTHLY
          </CatKey>
        </g>
        {/* sponsored listing */}
        <g>
          <Tile x={cx(3) - 40} y={188} w={80} h={52} />
          <CatKey x={cx(3) + 35} y={202} anchor="end" size={9.5}>
            SPONSORED
          </CatKey>
          <Mug id={id} cx={cx(3) - 10} cy={222} scale={0.6} />
          <Cursor x={cx(3) + 10} y={216} scale={0.9} />
        </g>
      </Frame>
      <Slider label="Shopper visits" value={visits} min={10} max={100} step={10} onChange={setVisits} formatValue={(x) => `${x}k`} />
      <Slider label="Members who renew" value={renew} min={40} max={100} step={5} onChange={setRenew} formatValue={(x) => `${x}%`} />
    </div>
  );
}

/** A coin in a stack, edge-on; `amber` fills its face in the accent, with the ink outline kept. */
function AmberCoin({ id, cx, cy, amber = false }: { id: string; cx: number; cy: number; amber?: boolean }) {
  const rx = 22;
  const ry = 4.2;
  const t = 4;
  return (
    <g>
      <path d={`M${cx - rx} ${cy}v${t}a${rx} ${ry} 0 0 0 ${2 * rx} 0v-${t}`} fill={amber ? CAT.amber : ht(id, "dense")} {...ink} />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={amber ? CAT.amber : CAT.tile} {...ink} />
    </g>
  );
}

/**
 * Above, the shopper storefronts were built for: a person at a screen,
 * scanning a page of tiles, clicking, card in hand. Below, the same person
 * hands a goal to an AI agent (purple), and the agent, not the person,
 * faces the storefront.
 */
export function ScreenAssumption() {
  const id = "w1-assume";
  return (
    <Frame
      width={480}
      height={312}
      label="Above: a shopper sits facing a screen showing a page of product tiles, a cursor on one tile and a payment card beside the keyboard. Below: the same shopper passes a goal note to a purple AI agent, which faces the store's screen in the shopper's place."
    >
      <HalftoneDefs id={id} />
      {/* above: person at the screen */}
      <Person id={id} cx={70} cy={88} s={1.4} />
      <Monitor id={id} x={170} y={22} />
      <Cursor x={258} y={66} scale={1.1} />
      <rect x={160} y={140} width={120} height={10} fill={CAT.tile} {...ink} />
      {Array.from({ length: 10 }, (_, k) => (
        <line key={k} x1={168 + k * 11} y1={142} x2={168 + k * 11} y2={148} {...hair} />
      ))}
      <PayCard id={id} x={300} y={124} w={40} h={26} />
      <line x1={16} y1={168.5} x2={464} y2={168.5} {...hair} />
      {/* below: the agent between */}
      <Person id={id} cx={50} cy={240} s={1.1} />
      <g>
        <rect x={86} y={194} width={66} height={36} fill={CAT.tile} {...ink} />
        {[0, 1, 2].map((k) => (
          <line key={k} x1={93} y1={205 + k * 8} x2={k === 2 ? 128 : 144} y2={205 + k * 8} {...hair} />
        ))}
      </g>
      <Arrow x1={158} y1={240} x2={184} y2={240} s={6} />
      <Agent id={id} cx={218} cy={240} s={1.4} tone="purple" />
      <Arrow x1={252} y1={240} x2={290} y2={240} s={6} color={CAT.purple} />
      <Monitor id={id} x={298} y={188} />
    </Frame>
  );
}

/** A screen at (x, y) showing a page of six product tiles, with its stand. */
function Monitor({ id, x, y }: { id: string; x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width={140} height={96} rx={4} fill={CAT.tile} {...ink} />
      <rect x={x + 6} y={y + 6} width={128} height={84} fill="none" {...hair} />
      {Array.from({ length: 6 }, (_, k) => {
        const tx = x + 12 + (k % 3) * 40;
        const ty = y + 12 + Math.floor(k / 3) * 38;
        return (
          <g key={k}>
            <rect x={tx} y={ty} width={36} height={34} fill={CAT.tile} {...hair} />
            <Mug id={id} cx={tx + 18} cy={ty + 15} scale={0.45} />
            <line x1={tx + 5} y1={ty + 28} x2={tx + 24} y2={ty + 28} {...hair} />
          </g>
        );
      })}
      <path d={`M${x + 62} ${y + 96}V${y + 106}M${x + 78} ${y + 96}V${y + 106}M${x + 50} ${y + 107}H${x + 90}`} fill="none" {...ink} />
    </g>
  );
}

/**
 * Shoppers on the left, sellers on the right. Inside each side, the
 * same-side effect: one shopper's review helps the next; one seller's lower
 * tag pressures the other. Between the sides, the cross-side arcs: more
 * buyers draw more merchants, and more merchants draw more buyers.
 */
export function SidesDiagram() {
  const id = "w1-sides";
  return (
    <Frame
      width={400}
      height={250}
      label="Three shoppers on the left pass a five-star review card between them, marked same-side; three shops on the right show price tags of $14 and $12, marked same-side. Two arcs, marked cross-side, run from the shoppers to the shops above and from the shops back to the shoppers below."
    >
      <HalftoneDefs id={id} />
      {/* buyers */}
      <CatKey x={80} y={56} anchor="middle" size={11}>
        SAME-SIDE
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
        SAME-SIDE
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
        CROSS-SIDE
      </CatKey>
    </Frame>
  );
}

/**
 * Four records, one under each system. The PIM's product sheet; the OMS's
 * routing map, splitting one order between a warehouse and a store; the
 * ERP's ledger page; the CDP's customer profile with its trail of events.
 */
export function SystemsOfRecord() {
  const id = "w1-sor";
  const px = (k: number) => 8 + k * 200;
  return (
    <Frame
      width={800}
      height={156}
      label="Four records. One: a product sheet with a mug photo, attribute rows and a category path. Two: a routing map where a warehouse and a store each send one parcel of a split order to a customer's house. Three: a ledger page with ruled columns of figures. Four: a customer profile card with a portrait and a timeline of events ending in a receipt."
    >
      <HalftoneDefs id={id} />
      {[1, 2, 3].map((k) => (
        <line key={k} x1={px(k) - 8} y1={10} x2={px(k) - 8} y2={148} {...hair} />
      ))}
      {/* 1 · product sheet */}
      <g>
        <rect x={px(0) + 20} y={12} width={140} height={132} fill={CAT.tile} {...ink} />
        <rect x={px(0) + 30} y={22} width={52} height={50} fill={CAT.tile} {...hair} />
        <Mug id={id} cx={px(0) + 54} cy={48} scale={0.95} />
        {[0, 1, 2, 3].map((k) => (
          <g key={k}>
            <line x1={px(0) + 92} y1={28 + k * 12} x2={px(0) + 118} y2={28 + k * 12} {...hair} />
            <line x1={px(0) + 124} y1={28 + k * 12} x2={px(0) + 150} y2={28 + k * 12} {...hair} />
          </g>
        ))}
        {[0, 1, 2].map((k) => (
          <g key={k}>
            <rect x={px(0) + 30 + k * 40} y={86} width={28} height={9} fill={CAT.tile} {...hair} />
            {k < 2 ? <path d={headAlong(px(0) + 66 + k * 40, 90.5, 1, 0, 4)} fill="none" {...hair} /> : null}
          </g>
        ))}
        {[0, 1, 2].map((k) => (
          <rect key={k} x={px(0) + 30 + k * 26} y={108} width={20} height={20} fill={k === 0 ? ht(id, "light") : ht(id, "dense")} {...hair} />
        ))}
      </g>
      {/* 2 · routing map */}
      <g>
        <rect x={px(1) + 8} y={12} width={176} height={132} fill={CAT.tile} {...ink} />
        {[40, 78, 116].map((y) => (
          <line key={y} x1={px(1) + 8} y1={y} x2={px(1) + 184} y2={y} stroke={CAT.ink} strokeWidth={0.3} />
        ))}
        {[54, 100, 146].map((x) => (
          <line key={x} x1={px(1) + x} y1={12} x2={px(1) + x} y2={144} stroke={CAT.ink} strokeWidth={0.3} />
        ))}
        <Warehouse id={id} x={px(1) + 16} y={22} w={44} h={36} stock={false} />
        <Shop id={id} x={px(1) + 130} y={24} w={44} h={34} />
        <House id={id} cx={px(1) + 96} cy={118} />
        <Arrow x1={px(1) + 44} y1={64} x2={px(1) + 82} y2={106} s={5} />
        <Arrow x1={px(1) + 148} y1={64} x2={px(1) + 110} y2={106} s={5} />
        <Parcel id={id} x={px(1) + 42} y={84} w={14} h={10} />
        <Parcel id={id} x={px(1) + 136} y={84} w={14} h={10} />
      </g>
      {/* 3 · ledger */}
      <g>
        <rect x={px(2) + 14} y={12} width={164} height={132} fill={CAT.tile} {...ink} />
        <line x1={px(2) + 96} y1={12} x2={px(2) + 96} y2={144} {...hair} />
        <line x1={px(2) + 24} y1={30.5} x2={px(2) + 168} y2={30.5} {...ink} />
        {["1,240", "860", "3,105", "415", "2,070", "990"].map((n, k) => (
          <g key={k}>
            <line x1={px(2) + 24} y1={r2(50 + k * 15)} x2={px(2) + 74} y2={r2(50 + k * 15)} stroke={CAT.ink} strokeWidth={0.3} />
            <Price x={px(2) + 168} y={r2(47 + k * 15)} size={10} anchor="end">
              {n}
            </Price>
          </g>
        ))}
      </g>
      {/* 4 · customer profile */}
      <g>
        <rect x={px(3) + 12} y={12} width={168} height={132} rx={4} fill={CAT.tile} {...ink} />
        <Person id={id} cx={px(3) + 44} cy={48} s={0.8} />
        <line x1={px(3) + 76} y1={34} x2={px(3) + 164} y2={34} {...hair} />
        <line x1={px(3) + 76} y1={42} x2={px(3) + 140} y2={42} {...hair} />
        <line x1={px(3) + 76} y1={50} x2={px(3) + 150} y2={50} {...hair} />
        <line x1={px(3) + 24} y1={112.5} x2={px(3) + 150} y2={112.5} {...ink} />
        {[0, 1, 2, 3].map((k) => (
          <circle key={k} cx={px(3) + 30 + k * 28.5} cy={112.5} r={3.6} fill={CAT.ink} />
        ))}
        <Cursor x={px(3) + 27} y={84} scale={0.85} />
        <Star cx={px(3) + 58} cy={93} r={5} />
        <Cart id={id} cx={px(3) + 87} cy={93} s={0.6} />
        <path d={`M${px(3) + 107} 82H${px(3) + 121}V100l-2.33 2l-2.33 -2l-2.33 2l-2.33 -2l-2.33 2l-2.33 -2Z`} fill={CAT.tile} {...ink} />
        <line x1={px(3) + 110} y1={88} x2={px(3) + 118} y2={88} {...hair} />
        <line x1={px(3) + 110} y1={93} x2={px(3) + 118} y2={93} {...hair} />
      </g>
    </Frame>
  );
}

/** A house centred on (cx, cy): halftone roof, white walls and a door. */
function House({ id, cx, cy }: { id: string; cx: number; cy: number }) {
  return (
    <g>
      <rect x={cx - 13} y={cy - 6} width={26} height={20} fill={CAT.tile} {...ink} />
      <path d={`M${cx - 17} ${cy - 5}L${cx} ${cy - 20}L${cx + 17} ${cy - 5}Z`} fill={ht(id, "dense")} {...ink} />
      <rect x={cx - 4} y={cy + 3} width={8} height={11} fill={CAT.tile} {...ink} />
    </g>
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

/** A plant at (x, y), w × h: sawtooth roof, a chimney and a row of windows. */
function Factory({ id, x, y, w, h }: { id: string; x: number; y: number; w: number; h: number }) {
  const t = r2(w / 3);
  const roof = r2(h * 0.28);
  return (
    <g>
      <rect x={r2(x + w * 0.72)} y={r2(y - h * 0.25)} width={r2(w * 0.12)} height={r2(h * 0.5)} fill={ht(id, "dense")} {...ink} />
      <path
        d={`M${x} ${y + h}V${y + roof}${[0, 1, 2].map((k) => `L${r2(x + k * t + t)} ${y}V${y + roof}`).join("")}V${y + h}Z`}
        fill={CAT.tile}
        {...ink}
      />
      {[0, 1, 2].map((k) => (
        <path key={k} d={`M${r2(x + k * t)} ${y + roof}L${r2(x + k * t + t)} ${y}V${y + roof}Z`} fill={ht(id, "light")} {...ink} />
      ))}
      {[0, 1, 2].map((k) => (
        <rect key={k} x={r2(x + 6 + k * (w - 12) / 3)} y={r2(y + h * 0.5)} width={r2((w - 12) / 3 - 5)} height={r2(h * 0.22)} fill={ht(id, "dense")} {...hair} />
      ))}
    </g>
  );
}

/**
 * Ad spend buys visitors; a slow page loses them before they order. Coins
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
        label={`Ad spend of $${spend} as ${coins} coins buys ${visitors} visitors, drawn as ${cursors} cursors, who reach a product page that loads in ${load} seconds; ${orders} orders leave as ${parcels} parcels. Cost per order: ${cpo === null ? "no orders" : `$${cpo}`}.`}
      >
        <HalftoneDefs id={id} />
        {/* coins */}
        {Array.from({ length: coins }, (_, k) => (
          <Coin key={k} id={id} cx={38} cy={r2(150 - k * 9)} />
        ))}
        <CatKey x={38} y={186} anchor="middle" size={10}>
          AD SPEND
        </CatKey>
        <Price x={38} y={204} anchor="middle" size={14}>
          {`$${spend.toLocaleString("en-US")}`}
        </Price>
        {/* visitors */}
        {Array.from({ length: cursors }, (_, k) => (
          <Cursor key={k} x={r2(100 + (k % 4) * 15)} y={r2(144 - Math.floor(k / 4) * 22)} scale={0.95} />
        ))}
        <CatKey x={124} y={186} anchor="middle" size={10}>
          VISITORS
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
          PAGE LOAD
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
          ORDERS
        </CatKey>
        <Price x={346} y={204} anchor="middle" size={14}>
          {orders}
        </Price>
        <line x1={12} y1={214.5} x2={388} y2={214.5} {...hair} />
        <CatKey x={200} y={231} anchor="end" size={10}>
          COST PER ORDER
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

/** A coin seen edge-on in a stack, centred on (cx, cy): white face, halftone rim. */
function Coin({ id, cx, cy, rx = 17, ry = 4.5, t = 4.5 }: { id: string; cx: number; cy: number; rx?: number; ry?: number; t?: number }) {
  return (
    <g>
      <path d={`M${r2(cx - rx)} ${cy}v${t}a${rx} ${ry} 0 0 0 ${2 * rx} 0v-${t}`} fill={ht(id, "dense")} {...ink} />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={CAT.tile} {...ink} />
      <ellipse cx={cx} cy={cy} rx={r2(rx * 0.62)} ry={r2(ry * 0.6)} fill="none" {...hair} />
    </g>
  );
}

/** A parcel: front face in halftone, white top, a tape line, at (x, y) with face w × h. */
function Parcel({ id, x, y, w, h, tone = "ink" }: { id: string; x: number; y: number; w: number; h: number; tone?: "ink" | "amber" | "purple" }) {
  const d = r2(w * 0.28);
  return (
    <g>
      <path d={`M${x} ${y}l${d} ${r2(-d * 0.6)}h${w}l${-d} ${r2(d * 0.6)}Z`} fill={CAT.tile} {...ink} />
      <path d={`M${x + w} ${y}l${d} ${r2(-d * 0.6)}v${h}l${-d} ${r2(d * 0.6)}Z`} fill={ht(id, "dense")} {...ink} />
      <rect x={x} y={y} width={w} height={h} fill={tone === "amber" ? CAT.amber : tone === "purple" ? CAT.purple : ht(id, "light")} {...ink} />
      <line x1={r2(x + w / 2)} y1={y} x2={r2(x + w / 2)} y2={r2(y + h)} stroke={CAT.tile} strokeWidth={1.6} />
      <line x1={r2(x + w / 2)} y1={y} x2={r2(x + w / 2 + d)} y2={r2(y - d * 0.6)} stroke={CAT.ink} strokeWidth={LINE.hair} />
    </g>
  );
}

/** A stopwatch centred on (cx, cy); its hand sweeps t seconds of an 8-second dial. */
function Stopwatch({ cx, cy, r, t }: { cx: number; cy: number; r: number; t: number }) {
  const a = -Math.PI / 2 + (t / 8) * 2 * Math.PI;
  const sweep = t >= 8 ? "" : `M${cx} ${cy}L${cx} ${r2(cy - r + 2.5)}A${r - 2.5} ${r - 2.5} 0 ${t > 4 ? 1 : 0} 1 ${r2(cx + (r - 2.5) * Math.cos(a))} ${r2(cy + (r - 2.5) * Math.sin(a))}Z`;
  return (
    <g>
      <rect x={cx - 2.5} y={cy - r - 5} width={5} height={4} fill={CAT.tile} {...ink} />
      <circle cx={cx} cy={cy} r={r} fill={CAT.tile} {...ink} />
      {t >= 8 ? <circle cx={cx} cy={cy} r={r - 2.5} fill={CAT.ink} /> : <path d={sweep} fill={CAT.ink} />}
      <circle cx={cx} cy={cy} r={1.4} fill={CAT.tile} />
    </g>
  );
}

/**
 * The brand's trail jacket sits inside its all-in-one template. The three
 * channels the marketing director wants (a mobile configurator, a short-video
 * app and a conversational assistant) reach toward it on dashed lines that
 * stop at the template's closed wall.
 */
export function TrailBrand() {
  const id = "w1-trail";
  const heads: Head[] = ["phone", "social", "agent"];
  return (
    <Frame
      width={400}
      height={300}
      label="An engraved trail jacket in a listing tile, enclosed by a single heavy-ruled template block. On the right, a phone, a short-video screen and an AI agent each send a dashed line that stops at the block's wall."
    >
      <HalftoneDefs id={id} />
      <rect x={16} y={20} width={200} height={260} fill={CAT.tile} stroke={CAT.ink} strokeWidth={LINE.bold} />
      <Tile x={36} y={40} w={160} h={220} />
      <Numeral x={48} y={64} size={16}>
        1
      </Numeral>
      <Jacket id={id} cx={116} cy={136} />
      <line x1={52} y1={214} x2={150} y2={214} {...hair} />
      <line x1={52} y1={220} x2={130} y2={220} {...hair} />
      <Price x={52} y={244} size={14}>
        $189
      </Price>
      {heads.map((h, k) => {
        const y = 60 + k * 90;
        return (
          <g key={h}>
            <HeadGlyph id={id} kind={h} cx={340} cy={y} />
            <line x1={308} y1={y} x2={226} y2={y} stroke={CAT.ink} strokeWidth={LINE.outline} strokeDasharray="4 4" />
          </g>
        );
      })}
    </Frame>
  );
}

/** A hooded trail jacket centred on (cx, cy): halftone body, dense sleeve shading, white zip. */
function Jacket({ id, cx, cy }: { id: string; cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx} ${cy})`} strokeLinejoin="round">
      <path d="M-22 -50Q0 -66 22 -50L26 -38H-26Z" fill={ht(id, "dense")} stroke={CAT.ink} strokeWidth={LINE.outline} />
      <path d="M-26 -38L-48 -24L-58 52H-42L-34 0V60H34V0L42 52H58L48 -24L26 -38Z" fill={ht(id, "light")} stroke={CAT.ink} strokeWidth={LINE.outline} />
      <path d="M48 -24L58 52H42L36 4Z" fill={ht(id, "dense")} stroke="none" />
      <path d="M-26 -38Q0 -24 26 -38" fill="none" stroke={CAT.ink} strokeWidth={LINE.outline} />
      <line x1={0} y1={-30} x2={0} y2={60} stroke={CAT.tile} strokeWidth={2.4} />
      <line x1={0} y1={-30} x2={0} y2={60} stroke={CAT.ink} strokeWidth={0.5} strokeDasharray="1.5 1.5" />
      <rect x={-26} y={12} width={16} height={4} fill={CAT.tile} stroke={CAT.ink} strokeWidth={LINE.hair} />
      <rect x={10} y={12} width={16} height={4} fill={CAT.tile} stroke={CAT.ink} strokeWidth={LINE.hair} />
    </g>
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
        DIGITAL MARKETING
      </CatKey>
      <CatKey x={764} y={38} size={12} anchor="end">
        E-COMMERCE
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
        { x: 520, key: "ORDER" },
        { x: 620, key: "PAYMENT" },
        { x: 720, key: "FULFILLMENT" },
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

/** A mailed envelope at (x, y): white body, flap lines and a halftone stamp. */
function Envelope({ id, x, y, w, h }: { id: string; x: number; y: number; w: number; h: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={CAT.tile} {...ink} />
      <path d={`M${x} ${y}L${r2(x + w / 2)} ${r2(y + h * 0.58)}L${x + w} ${y}`} fill="none" {...ink} />
      <rect x={r2(x + w - 15)} y={y + 5} width={10} height={12} fill={ht(id, "dense")} {...hair} />
    </g>
  );
}

/** A shop front at (x, y), w × h: striped awning, a window with a mug, and a door. */
function Shop({ id, x, y, w, h }: { id: string; x: number; y: number; w: number; h: number }) {
  const n = 6;
  const sw = r2(w / n);
  const aw = r2(h * 0.2);
  return (
    <g>
      <rect x={x} y={r2(y + aw - 4)} width={w} height={r2(h - aw + 4)} fill={CAT.tile} {...ink} />
      {Array.from({ length: n }, (_, k) => (
        <path key={k} d={`M${r2(x + k * sw)} ${y}h${sw}v${r2(aw - 6)}a${r2(sw / 2)} 6 0 0 1 ${-sw} 0Z`} fill={k % 2 ? CAT.tile : ht(id, "dense")} {...ink} />
      ))}
      <rect x={r2(x + w * 0.1)} y={r2(y + aw + h * 0.12)} width={r2(w * 0.42)} height={r2(h * 0.36)} fill={ht(id, "light")} {...ink} />
      <rect x={r2(x + w * 0.62)} y={r2(y + aw + h * 0.12)} width={r2(w * 0.28)} height={r2(h - aw - h * 0.12)} fill={CAT.tile} {...ink} />
      <circle cx={r2(x + w * 0.85)} cy={r2(y + h * 0.66)} r={1.6} fill={CAT.ink} />
    </g>
  );
}

/** A printed order form at (x, y): heading bar, ruled lines and a signature box. */
function OrderForm({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const lines = Math.floor((h - 34) / 9);
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={CAT.tile} {...ink} />
      <rect x={x + 5} y={y + 6} width={w - 10} height={7} fill={CAT.ink} />
      {Array.from({ length: lines }, (_, k) => (
        <line key={k} x1={x + 6} y1={r2(y + 24 + k * 9)} x2={x + w - 6} y2={r2(y + 24 + k * 9)} {...hair} />
      ))}
      <rect x={r2(x + w - 24)} y={r2(y + h - 14)} width={18} height={8} fill="none" {...hair} />
    </g>
  );
}

/** A payment card at (x, y): halftone face, white chip and two number lines. */
function PayCard({ id, x, y, w, h, fill }: { id: string; x: number; y: number; w: number; h: number; fill?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={4} fill={fill ?? ht(id, "light")} {...ink} />
      <rect x={r2(x + w * 0.11)} y={r2(y + h * 0.3)} width={r2(w * 0.18)} height={r2(h * 0.22)} rx={1.5} fill={CAT.tile} {...ink} />
      <line x1={r2(x + w * 0.11)} y1={r2(y + h * 0.75)} x2={r2(x + w - 8)} y2={r2(y + h * 0.75)} stroke={CAT.tile} strokeWidth={2.4} />
    </g>
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
            <text x={306} y={84} fontFamily="var(--font-heading)" fontSize={26} fill={CAT.ink}>
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
              ADD TO CART
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

/** An engraved espresso machine centred on (cx, cy): halftone body, dense side, white drip tray and cup. */
function Espresso({ id, cx, cy }: { id: string; cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx} ${cy})`} strokeLinejoin="round">
      <rect x={-56} y={-66} width={112} height={26} rx={4} fill={ht(id, "light")} stroke={CAT.ink} strokeWidth={LINE.outline} />
      <rect x={-56} y={-40} width={30} height={86} fill={ht(id, "dense")} stroke={CAT.ink} strokeWidth={LINE.outline} />
      <rect x={26} y={-40} width={30} height={86} fill={ht(id, "light")} stroke={CAT.ink} strokeWidth={LINE.outline} />
      <rect x={-26} y={-40} width={52} height={12} fill={CAT.tile} stroke={CAT.ink} strokeWidth={LINE.outline} />
      <path d="M-14 -28H14V-20H-14Z" fill={CAT.ink} />
      <line x1={14} y1={-24} x2={34} y2={-24} stroke={CAT.ink} strokeWidth={3} strokeLinecap="round" />
      <path d="M-10 18H10V30Q10 34 6 34H-6Q-10 34 -10 30Z" fill={CAT.tile} stroke={CAT.ink} strokeWidth={LINE.outline} />
      <rect x={-62} y={46} width={124} height={8} fill={CAT.tile} stroke={CAT.ink} strokeWidth={LINE.outline} />
      <rect x={-26} y={36} width={52} height={10} fill={CAT.tile} stroke={CAT.ink} strokeWidth={LINE.outline} />
      <circle cx={41} cy={-53} r={6} fill={CAT.tile} stroke={CAT.ink} strokeWidth={LINE.outline} />
    </g>
  );
}

/**
 * Two rows on one page. Above, the physical store: a television commercial,
 * three weeks of calendar days, then the shop. Below, the digital store: a
 * printed ad, a search result, a product page and a card terminal set close
 * together, with one data rail running under all four.
 */
export function WeeksVsMilliseconds() {
  const id = "w1-weeks";
  const days = Array.from({ length: 21 }, (_, i) => i);
  const row2 = [28, 120, 212, 304];
  return (
    <Frame
      width={400}
      height={214}
      label="Above: a television commercial, then three weeks of calendar days, then a shop front. Below: a printed ad, a search result, a product page and a card terminal joined by short arrows marked milliseconds, with a shared data layer rail beneath all four."
    >
      <HalftoneDefs id={id} />
      {/* physical: TV */}
      <g>
        <line x1={34} y1={14} x2={44} y2={24} {...ink} />
        <line x1={58} y1={14} x2={48} y2={24} {...ink} />
        <rect x={18} y={24} width={60} height={44} rx={5} fill={CAT.tile} {...ink} />
        <rect x={24} y={30} width={40} height={32} rx={3} fill={ht(id, "light")} {...ink} />
        <circle cx={71} cy={36} r={2.4} fill="none" {...ink} />
        <circle cx={71} cy={46} r={2.4} fill="none" {...ink} />
        <line x1={28} y1={68} x2={24} y2={76} {...ink} />
        <line x1={68} y1={68} x2={72} y2={76} {...ink} />
        <Mug id={id} cx={44} cy={47} scale={0.55} />
      </g>
      {/* three weeks of days */}
      {days.map((d) => {
        const col = d % 7;
        const row = Math.floor(d / 7);
        return <rect key={d} x={r2(100 + col * 25)} y={r2(26 + row * 15)} width={21} height={11} fill={CAT.tile} {...hair} />;
      })}
      <CatKey x={185} y={82} anchor="middle" size={11}>
        WEEKS
      </CatKey>
      {/* the shop */}
      <g>
        <rect x={300} y={34} width={82} height={42} fill={CAT.tile} {...ink} />
        {[0, 1, 2, 3, 4, 5].map((k) => (
          <path key={k} d={`M${296 + k * 15} 20h15v12a7.5 5 0 0 1 -15 0Z`} fill={k % 2 ? CAT.tile : ht(id, "dense")} {...ink} />
        ))}
        <rect x={308} y={44} width={30} height={22} fill={ht(id, "light")} {...ink} />
        <rect x={350} y={44} width={22} height={32} fill={CAT.tile} {...ink} />
        <circle cx={367} cy={61} r={1.2} fill={CAT.ink} />
      </g>

      <line x1={12} y1={96.5} x2={388} y2={96.5} {...hair} />

      {/* digital: ad, result, product page, terminal */}
      {/* printed ad */}
      <g>
        <rect x={row2[0] - 16} y={122} width={70} height={54} fill={CAT.tile} {...ink} />
        <Mug id={id} cx={row2[0] + 4} cy={150} scale={0.6} />
        <CatKey x={row2[0] + 41} y={142} anchor="middle" size={9}>
          −20%
        </CatKey>
        <line x1={row2[0] + 30} y1={152} x2={row2[0] + 50} y2={152} {...hair} />
        <line x1={row2[0] + 30} y1={157} x2={row2[0] + 46} y2={157} {...hair} />
      </g>
      {/* search result */}
      <g>
        <Tile x={row2[1] - 12} y={120} w={66} h={58} />
        <Numeral x={row2[1] - 5} y={136} size={13}>
          1
        </Numeral>
        <Mug id={id} cx={row2[1] + 24} cy={146} scale={0.6} />
        <line x1={row2[1] - 2} y1={164} x2={row2[1] + 34} y2={164} {...hair} />
        <line x1={row2[1] - 2} y1={168} x2={row2[1] + 24} y2={168} {...hair} />
      </g>
      {/* product page */}
      <g>
        <rect x={row2[2] - 12} y={116} width={66} height={66} fill={CAT.tile} {...ink} />
        <Mug id={id} cx={row2[2] + 21} cy={139} scale={0.85} />
        <Price x={row2[2] - 5} y={170} size={10}>
          $14
        </Price>
        <rect x={row2[2] + 20} y={162} width={27} height={11} fill={CAT.tile} {...ink} />
        <line x1={row2[2] + 25} y1={167.5} x2={row2[2] + 42} y2={167.5} {...hair} />
      </g>
      {/* card terminal */}
      <g>
        <path d={`M${row2[3] + 6} 118H${row2[3] + 44}Q${row2[3] + 50} 118 ${row2[3] + 50} 124V176Q${row2[3] + 50} 182 ${row2[3] + 44} 182H${row2[3] + 6}Q${row2[3]} 182 ${row2[3]} 176V124Q${row2[3]} 118 ${row2[3] + 6} 118Z`} fill={ht(id, "light")} {...ink} />
        <rect x={row2[3] + 7} y={124} width={36} height={17} fill={CAT.tile} {...ink} />
        <Price x={row2[3] + 25} y={136.5} size={9} anchor="middle">
          $14
        </Price>
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={row2[3] + 9 + c * 11} y={147 + r * 9} width={8} height={6} rx={1} fill={CAT.tile} {...hair} />),
        )}
        <rect x={row2[3] + 52} y={128} width={14} height={22} rx={2} fill={CAT.tile} {...ink} />
        <rect x={row2[3] + 54} y={132} width={10} height={5} fill={ht(id, "dense")} />
      </g>
      {/* millisecond links */}
      {[0, 1, 2].map((k) => (
        <Arrow key={k} x1={row2[k] + (k === 0 ? 58 : 58)} y1={149} x2={row2[k + 1] - 16} y2={149} s={5} />
      ))}
      <CatKey x={200} y={113} anchor="middle" size={11}>
        MILLISECONDS
      </CatKey>
      {/* shared data layer */}
      {row2.map((x, k) => (
        <line key={x} x1={x + (k === 3 ? 25 : 21)} y1={k === 2 ? 182 : 178} x2={x + (k === 3 ? 25 : 21)} y2={192} {...hair} />
      ))}
      <line x1={row2[0] + 21} y1={192.5} x2={row2[3] + 25} y2={192.5} stroke={CAT.ink} strokeWidth={LINE.bold} />
      <CatKey x={200} y={208} anchor="middle" size={11}>
        SHARED DATA LAYER
      </CatKey>
    </Frame>
  );
}
