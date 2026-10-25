"use client";

import React, { useState } from "react";
import {
  Arrow,
  CAT,
  CatKey,
  Frame,
  HalftoneDefs,
  LINE,
  Numeral,
  PlateButton,
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
  Cart,
  Coin,
  Cursor,
  Espresso,
  Jacket,
  Mug,
  Parcel,
  Person,
  Sneaker,
  Star,
  Stopwatch,
  Warehouse,
} from "../_visuals/objects";

/* ==========================================================================
   WEEK 02 PLATES: MAIL-ORDER CATALOGUE
   --------------------------------------------------------------------------
   Products engraved in halftone inside double-ruled white tiles, ink marks,
   and one amber mark for the slide's key idea. See the course CLAUDE.md.
   ========================================================================== */

const ink = { stroke: CAT.ink, strokeWidth: LINE.outline, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
const hair = { stroke: CAT.ink, strokeWidth: LINE.hair, strokeLinecap: "round" as const };
const BODY_FONT = "var(--font-body)";

/**
 * Real data: Wadi & Ma (2026a), one hotel booking per session at each
 * model's default reasoning effort. Input tokens read per session, one
 * sheet per 10,000 (the last cut to the fraction), and the cost per session
 * at list prices.
 */
const AGENT_COST = [
  { key: "SONNET", tokens: 43860, cost: 9.56 },
  { key: "FLASH LITE", tokens: 52282, cost: 1.32 },
  { key: "LUNA", tokens: 57665, cost: 0.61 },
  { key: "FLASH", tokens: 75163, cost: 11.93 },
  { key: "PRO", tokens: 125960, cost: 28.25 },
];

export function AgentCostReal() {
  const id = "w2-cost";
  const x0 = 114;
  const step = 16;
  return (
    <Frame
      width={400}
      height={214}
      label={`Input tokens read and cost per booking session, by AI agent at default reasoning effort: ${AGENT_COST.map((a) => `${a.key.toLowerCase()} ${a.tokens.toLocaleString("en-US")} tokens, ${a.cost} cents`).join("; ")}. Each sheet is 10,000 tokens.`}
    >
      <HalftoneDefs id={id} />
      <defs>
        {AGENT_COST.map((a, i) => (
          <clipPath key={i} id={`${id}-c${i}`}>
            <rect x={x0} y={0} width={r2((a.tokens / 10000) * step)} height={214} />
          </clipPath>
        ))}
      </defs>
      <CatKey x={x0} y={16} size={10}>
        TOKENS READ · 1 SHEET = 10,000
      </CatKey>
      <CatKey x={392} y={16} anchor="end" size={10}>
        COST
      </CatKey>
      {AGENT_COST.map((a, i) => {
        const y = 30 + i * 36;
        return (
          <g key={a.key}>
            <Agent id={id} cx={14} cy={y + 14} s={0.42} />
            <CatKey x={30} y={y + 19} size={9.5}>
              {a.key}
            </CatKey>
            <g clipPath={`url(#${id}-c${i})`}>
              {Array.from({ length: Math.ceil(a.tokens / 10000) }, (_, k) => (
                <g key={k}>
                  <rect x={x0 + k * step} y={y + 2} width={step - 3} height={24} fill={CAT.tile} {...hair} />
                  {[0, 1, 2].map((j) => (
                    <line key={j} x1={x0 + k * step + 3} y1={y + 9 + j * 5} x2={x0 + k * step + step - 6} y2={y + 9 + j * 5} stroke={CAT.ink} strokeWidth={0.4} />
                  ))}
                </g>
              ))}
            </g>
            <Price x={392} y={y + 20} size={14} anchor="end">
              {`${a.cost}¢`}
            </Price>
          </g>
        );
      })}
    </Frame>
  );
}

/**
 * Grow the catalogue from ten items to half a million. A flat menu makes the
 * shopper scan every item; a category tree of ten branches per level adds
 * one click each time the catalogue grows tenfold. The amber path is the
 * route to one product through the tree.
 */
const SIZES = [10, 100, 1000, 10000, 100000, 500000];

export function CatalogDepth() {
  const [step, setStep] = useState(3);
  const id = "w2-depth";
  const n = SIZES[step];
  const depth = Math.ceil(Math.log10(n) - 1e-9);
  const shown = Math.min(n, 40);
  const pick = [3, 7, 1, 5, 8, 2];
  return (
    <div>
      <Frame
        width={560}
        height={318}
        label={`A catalogue of ${n.toLocaleString("en-US")} items. Above, a flat menu: the shopper scans up to ${n.toLocaleString("en-US")} items. Below, a category tree with ten branches per level: ${depth} ${depth === 1 ? "click" : "clicks"} reach any product, the path shown in amber.`}
      >
        <HalftoneDefs id={id} />
        <CatKey x={14} y={22} size={11}>
          FLAT MENU
        </CatKey>
        {Array.from({ length: shown }, (_, k) => (
          <g key={k}>
            <rect x={r2(14 + (k % 20) * 19)} y={34 + Math.floor(k / 20) * 22} width={15} height={18} fill={CAT.tile} {...hair} />
            <rect x={r2(17 + (k % 20) * 19)} y={38 + Math.floor(k / 20) * 22} width={9} height={7} fill={ht(id, "light")} />
          </g>
        ))}
        {n > shown ? (
          <CatKey x={14} y={96} size={10}>
            {`+ ${(n - shown).toLocaleString("en-US")} MORE`}
          </CatKey>
        ) : null}
        <CatKey x={546} y={22} size={11} anchor="end">
          ITEMS TO SCAN
        </CatKey>
        <Price x={546} y={48} size={20} anchor="end">
          {n.toLocaleString("en-US")}
        </Price>
        <line x1={14} y1={112.5} x2={546} y2={112.5} {...hair} />
        <CatKey x={14} y={134} size={11}>
          CATEGORY TREE
        </CatKey>
        {Array.from({ length: depth }, (_, lv) => {
          const y = 146 + lv * 27;
          const p = pick[lv];
          const px = 14 + p * 21;
          const next = lv + 1 < depth ? 14 + pick[lv + 1] * 21 : null;
          return (
            <g key={lv}>
              {Array.from({ length: 10 }, (_, b) => (
                <rect key={b} x={14 + b * 21} y={y} width={17} height={15} fill={b === p ? CAT.amber : CAT.tile} {...(b === p ? ink : hair)} />
              ))}
              {next !== null ? <line x1={px + 8.5} y1={y + 15} x2={next + 8.5} y2={y + 27} {...ink} /> : null}
              <Numeral x={232} y={y + 13} size={12}>
                {lv + 1}
              </Numeral>
            </g>
          );
        })}
        <CatKey x={546} y={134} size={11} anchor="end">
          CLICKS TO REACH
        </CatKey>
        <Price x={546} y={162} size={20} anchor="end" fill={CAT.amberText}>
          {depth}
        </Price>
      </Frame>
      <Slider label="Catalogue size" value={step} min={0} max={SIZES.length - 1} step={1} onChange={setStep} formatValue={(v) => SIZES[v].toLocaleString("en-US")} />
    </div>
  );
}

/**
 * The order summary as the shopper sees it on each checkout screen. The
 * cart and address screens show $48.00; only the payment screen adds
 * shipping, tax and handling (amber), and the total jumps to $64.55.
 */
export function CheckoutFriction() {
  const id = "w2-surprise";
  const steps = ["CART", "ADDRESS", "PAYMENT"];
  return (
    <Frame
      width={400}
      height={196}
      label="Three order summaries for the cart, address and payment screens. The first two show a $48.00 total. The payment screen adds shipping $9.95, tax $4.10 and handling $2.50 in amber, for a $64.55 total."
    >
      <HalftoneDefs id={id} />
      {steps.map((s, k) => {
        const x = 10 + k * 132;
        const last = k === 2;
        return (
          <g key={s}>
            <rect x={x} y={10} width={116} height={152} fill={CAT.tile} {...ink} />
            <Mug id={id} cx={x + 20} cy={34} scale={0.5} />
            <line x1={x + 34} y1={30} x2={x + 58} y2={30} {...hair} />
            <Price x={x + 108} y={38} size={11} anchor="end">
              $48.00
            </Price>
            {last
              ? [
                  ["Shipping", "$9.95"],
                  ["Tax", "$4.10"],
                  ["Handling", "$2.50"],
                ].map(([t, v], j) => (
                  <g key={t}>
                    <rect x={x + 6} y={50 + j * 20} width={104} height={17} fill={CAT.amber} stroke={CAT.ink} strokeWidth={0.6} />
                    <text x={x + 12} y={62 + j * 20} fontFamily={BODY_FONT} fontSize={10} fill={CAT.ink}>
                      {t}
                    </text>
                    <Price x={x + 104} y={62 + j * 20} size={11} anchor="end">
                      {v}
                    </Price>
                  </g>
                ))
              : null}
            <line x1={x + 8} y1={118.5} x2={x + 108} y2={118.5} {...ink} />
            <Price x={x + 108} y={142} size={16} anchor="end">
              {last ? "$64.55" : "$48.00"}
            </Price>
            <Numeral x={x} y={186} size={14}>
              {k + 1}
            </Numeral>
            <CatKey x={x + 14} y={185} size={10}>
              {s}
            </CatKey>
          </g>
        );
      })}
    </Frame>
  );
}

/**
 * The same three options set out three ways. Order: the first row draws
 * the most clicks. Default: the pre-selected shipping tier is the one most
 * people keep. Framing: a ribbon and a heavier frame lift the middle tier.
 */
export function ChoiceLevers() {
  const id = "w2-levers";
  const px = (k: number) => 8 + k * 146;
  return (
    <Frame
      width={440}
      height={226}
      label="Three panels. Order: three ranked mug rows, with five cursors beside the first, two beside the second and one beside the third. Default: three shipping options with the standard tier pre-selected. Framing: three price tiers with the middle one in a heavy frame under a most popular ribbon."
    >
      <HalftoneDefs id={id} />
      {["ORDER", "DEFAULT", "FRAMING"].map((k, i) => (
        <CatKey key={k} x={px(i) + 64} y={218} anchor="middle" size={11}>
          {k}
        </CatKey>
      ))}
      {[1, 2].map((k) => (
        <line key={k} x1={px(k) - 9} y1={8} x2={px(k) - 9} y2={204} {...hair} />
      ))}
      {/* order */}
      {[5, 2, 1].map((c, k) => {
        const y = 22 + k * 60;
        return (
          <g key={k}>
            <Tile x={px(0)} y={y} w={74} h={50} />
            <Numeral x={px(0) + 7} y={y + 16} size={12}>
              {k + 1}
            </Numeral>
            <Mug id={id} cx={px(0) + 44} cy={y + 25} scale={0.6} />
            {Array.from({ length: c }, (_, j) => (
              <Cursor key={j} x={r2(px(0) + 82 + (j % 3) * 14)} y={r2(y + 8 + Math.floor(j / 3) * 20)} scale={0.95} />
            ))}
          </g>
        );
      })}
      {/* default */}
      {[
        ["Standard", "Free", true],
        ["Express", "$12", false],
        ["Pickup", "Free", false],
      ].map(([t, p, on], k) => {
        const y = 30 + k * 52;
        return (
          <g key={t as string}>
            <rect x={px(1)} y={y} width={128} height={40} fill={CAT.tile} stroke={CAT.ink} strokeWidth={on ? LINE.bold : 0.6} />
            <circle cx={px(1) + 16} cy={y + 20} r={6} fill={CAT.tile} {...ink} />
            {on ? <circle cx={px(1) + 16} cy={y + 20} r={3.2} fill={CAT.ink} /> : null}
            <text x={px(1) + 30} y={y + 24} fontFamily={BODY_FONT} fontSize={11} fill={CAT.ink}>
              {t as string}
            </text>
            <Price x={px(1) + 120} y={y + 25} size={12} anchor="end">
              {p as string}
            </Price>
          </g>
        );
      })}
      {/* framing */}
      {["$10", "$25", "$60"].map((p, k) => {
        const y = 22 + k * 60;
        const mid = k === 1;
        return (
          <g key={p}>
            <rect x={px(2) + (mid ? 0 : 8)} y={y} width={mid ? 136 : 120} height={50} fill={CAT.tile} stroke={CAT.ink} strokeWidth={mid ? 2.4 : 0.8} />
            <Price x={px(2) + 20} y={y + 31} size={mid ? 20 : 15}>
              {p}
            </Price>
            <line x1={px(2) + 70} y1={y + 20} x2={px(2) + 116} y2={y + 20} {...hair} />
            <line x1={px(2) + 70} y1={y + 28} x2={px(2) + 104} y2={y + 28} {...hair} />
            {mid ? (
              <g>
                <rect x={px(2) + 34} y={y - 10} width={100} height={16} fill={CAT.ink} />
                <CatKey x={px(2) + 86} y={y + 2.5} anchor="middle" size={8.5} fill={CAT.tile}>
                  MOST POPULAR
                </CatKey>
              </g>
            ) : null}
          </g>
        );
      })}
    </Frame>
  );
}

/**
 * An AI agent working through a storefront: the results page, a product
 * page, an expanded spec tab, the returns policy. Under each step, what it
 * has spent so far: tokens read (stacked sheets), seconds (stopwatch) and
 * inference cost (coins), all growing with every click.
 */
export function ClickMeter() {
  const id = "w2-meter";
  const steps = [
    { tokens: 2, t: 1, coins: 1, cost: "0.4¢" },
    { tokens: 4, t: 3, coins: 2, cost: "0.9¢" },
    { tokens: 6, t: 5, coins: 3, cost: "1.5¢" },
    { tokens: 8, t: 7, coins: 4, cost: "2.2¢" },
  ];
  const px = (k: number) => 92 + k * 120;
  return (
    <Frame
      width={560}
      height={252}
      label="An AI agent clicks through four pages: a results page, a product page, an expanded spec tab and a returns policy. Under each, the running spend grows: stacks of token sheets from 2 to 8, a stopwatch filling, and coins from 1 to 4, costing 0.4 to 2.2 cents."
    >
      <HalftoneDefs id={id} />
      <Agent id={id} cx={34} cy={60} s={1.1} />
      {steps.map((s, k) => {
        const x = px(k);
        return (
          <g key={k}>
            <Arrow x1={x - 24} y1={60} x2={x - 6} y2={60} s={5} />
            <rect x={x} y={14} width={92} height={92} fill={CAT.tile} {...ink} />
            {k === 0 ? (
              [0, 1, 2].map((j) => (
                <g key={j}>
                  <rect x={x + 8} y={22 + j * 27} width={22} height={22} fill={CAT.tile} {...hair} />
                  <Mug id={id} cx={x + 19} cy={33 + j * 27} scale={0.38} />
                  <line x1={x + 36} y1={30 + j * 27} x2={x + 82} y2={30 + j * 27} {...hair} />
                </g>
              ))
            ) : k === 1 ? (
              <g>
                <Mug id={id} cx={x + 24} cy={50} scale={0.95} />
                <line x1={x + 56} y1={30} x2={x + 84} y2={30} {...ink} />
                <Price x={x + 56} y={54} size={12}>
                  $14
                </Price>
                <line x1={x + 8} y1={84} x2={x + 84} y2={84} {...hair} />
              </g>
            ) : k === 2 ? (
              <g>
                {[0, 1, 2].map((j) => (
                  <rect key={j} x={x + 8 + j * 26} y={22} width={24} height={12} fill={j === 1 ? CAT.ink : CAT.tile} {...hair} />
                ))}
                {[0, 1, 2, 3].map((j) => (
                  <line key={j} x1={x + 10} y1={48 + j * 12} x2={x + 82} y2={48 + j * 12} {...hair} />
                ))}
              </g>
            ) : (
              <g>
                {[0, 1, 2, 3, 4, 5].map((j) => (
                  <line key={j} x1={x + 10} y1={26 + j * 11} x2={j % 2 ? x + 70 : x + 82} y2={26 + j * 11} {...hair} />
                ))}
              </g>
            )}
            {/* spend so far */}
            {Array.from({ length: s.tokens }, (_, j) => (
              <rect key={j} x={x + 8 + j * 1.5} y={r2(196 - j * 6)} width={30} height={20} fill={CAT.tile} {...hair} />
            ))}
            <Stopwatch cx={x + 62} cy={150} r={13} t={s.t} />
            {Array.from({ length: s.coins }, (_, j) => (
              <Coin key={j} id={id} cx={x + 70} cy={r2(208 - j * 6)} rx={14} ry={3.6} t={3.6} />
            ))}
            <Price x={x + 46} y={242} size={13} anchor="middle" fill={k === 3 ? CAT.amberText : CAT.ink}>
              {s.cost}
            </Price>
          </g>
        );
      })}
    </Frame>
  );
}

/**
 * Three acquisition channels with their monthly spend and visitors, all
 * landing on the same store. Raise the store's conversion rate: orders
 * (parcels) grow on every row at once and the cost of each order (amber)
 * falls on every channel, though no channel's budget changed.
 */
const CHANNELS = [
  { key: "SEARCH ADS", spend: 2000, visits: 2000 },
  { key: "SOCIAL ADS", spend: 1500, visits: 3000 },
  { key: "EMAIL", spend: 300, visits: 1000 },
];

export function ConversionMultiplier() {
  const [cr, setCr] = useState(2);
  const id = "w2-cro";
  return (
    <div>
      <Frame
        width={480}
        height={262}
        label={`Three channels at a ${cr}% conversion rate. ${CHANNELS.map((c) => `${c.key.toLowerCase()}: $${c.spend} for ${c.visits} visitors, ${Math.round((c.visits * cr) / 100)} orders, $${Math.round(c.spend / ((c.visits * cr) / 100))} per order`).join("; ")}.`}
      >
        <HalftoneDefs id={id} />
        {["SPEND", "VISITORS", "ORDERS", "PER ORDER"].map((h, k) => (
          <CatKey key={h} x={[112, 192, 270, 466][k]} y={18} size={10} anchor={k === 3 ? "end" : "start"}>
            {h}
          </CatKey>
        ))}
        {CHANNELS.map((c, k) => {
          const y = 34 + k * 76;
          const orders = Math.round((c.visits * cr) / 100);
          const cpo = Math.round(c.spend / orders);
          return (
            <g key={c.key}>
              <line x1={14} y1={y - 4.5} x2={466} y2={y - 4.5} {...hair} />
              {k === 0 ? (
                <g>
                  <Tile x={16} y={y + 6} w={46} h={40} />
                  <Numeral x={21} y={y + 20} size={11}>
                    1
                  </Numeral>
                  <Mug id={id} cx={44} cy={y + 26} scale={0.5} />
                </g>
              ) : k === 1 ? (
                <g>
                  <rect x={26} y={y + 2} width={28} height={46} rx={3} fill={ht(id, "dense")} {...ink} />
                  <path d={`M35 ${y + 17}L46 ${y + 25}L35 ${y + 33}Z`} fill={CAT.tile} {...ink} />
                </g>
              ) : (
                <g>
                  <rect x={16} y={y + 10} width={48} height={32} fill={CAT.tile} {...ink} />
                  <path d={`M16 ${y + 10}L40 ${y + 28}L64 ${y + 10}`} fill="none" {...ink} />
                </g>
              )}
              <CatKey x={16} y={y + 64} size={9}>
                {c.key}
              </CatKey>
              <Price x={112} y={y + 32} size={15}>
                {`$${c.spend.toLocaleString("en-US")}`}
              </Price>
              <Price x={192} y={y + 32} size={15}>
                {c.visits.toLocaleString("en-US")}
              </Price>
              {Array.from({ length: Math.round(orders / 10) }, (_, j) => (
                <Parcel key={j} id={id} x={r2(270 + (j % 6) * 20)} y={r2(y + 20 - Math.floor(j / 6) * 16)} w={14} h={10} />
              ))}
              <Price x={270} y={y + 58} size={13}>
                {orders}
              </Price>
              <Price x={466} y={y + 32} size={18} anchor="end" fill={CAT.amberText}>
                {`$${cpo}`}
              </Price>
            </g>
          );
        })}
      </Frame>
      <Slider label="Conversion rate" value={cr} min={1} max={4} step={0.5} onChange={setCr} formatValue={(v) => `${v}%`} />
    </div>
  );
}

/**
 * One storefront, four tricks; the deceptive element is amber. Drip
 * pricing: the same ticket grows across three screens. Fake urgency: a
 * countdown that starts over when the page is reloaded, beside a warehouse
 * full of stock. Sneak into basket: add-ons already ticked. Roach motel and
 * confirmshaming: one click in, seven screens and a call out, and a decline
 * button that scolds.
 */
type Trick = "drip" | "urgency" | "sneak" | "roach";

export function DarkCheckout() {
  const [trick, setTrick] = useState<Trick>("drip");
  const [loads, setLoads] = useState(1);
  const id = "w2-dark";
  const label = {
    drip: "Drip pricing: a $45 headline price grows to $58 then $71 as service, facility and processing fees appear screen by screen, in amber.",
    urgency: `Fake urgency: a 'Deal ends in 09:59' timer and an 'Only 1 left!' tag in amber beside a warehouse stacked with parcels; the page has been loaded ${loads} ${loads === 1 ? "time" : "times"} and the timer still reads 09:59.`,
    sneak: "Sneak into basket: a cart with parcel protection and an extended warranty already ticked, in amber, raising the total from $60 to $83.",
    roach: "Roach motel and confirmshaming: subscribing takes one click; cancelling takes seven screens and a phone call. The decline button reads 'No thanks, I like paying full price', in amber.",
  }[trick];
  const amberBox = (x: number, y: number, w: number, h: number) => <rect x={x} y={y} width={w} height={h} fill={CAT.amber} stroke={CAT.ink} strokeWidth={0.8} />;
  const T = (x: number, y: number, s: string, size = 11, anchor: "start" | "middle" | "end" = "start") => (
    <text x={x} y={y} fontFamily={BODY_FONT} fontSize={size} fill={CAT.ink} textAnchor={anchor}>
      {s}
    </text>
  );
  return (
    <div>
      <Frame width={520} height={250} label={label}>
        <HalftoneDefs id={id} />
        {trick === "drip"
          ? [
              { p: 45, fees: [] as string[] },
              { p: 58, fees: ["Service fee  $13"] },
              { p: 71, fees: ["Service fee  $13", "Facility fee  $8", "Processing fee  $5"] },
            ].map((s, k) => {
              const x = 10 + k * 172;
              return (
                <g key={k}>
                  <rect x={x} y={16} width={156} height={196} fill={CAT.tile} {...ink} />
                  {T(x + 12, 40, "Concert ticket", 11)}
                  <Price x={x + 144} y={41} size={12} anchor="end">
                    $45
                  </Price>
                  {s.fees.map((f, j) => (
                    <g key={f}>
                      {amberBox(x + 8, 54 + j * 24, 140, 20)}
                      {T(x + 14, 68 + j * 24, f, 10.5)}
                    </g>
                  ))}
                  <line x1={x + 10} y1={152.5} x2={x + 146} y2={152.5} {...ink} />
                  <Price x={x + 144} y={184} size={22} anchor="end">
                    {`$${s.p}`}
                  </Price>
                  <Numeral x={x} y={236} size={14}>
                    {k + 1}
                  </Numeral>
                  <CatKey x={x + 14} y={235} size={10}>
                    SCREEN
                  </CatKey>
                </g>
              );
            })
          : null}
        {trick === "urgency" ? (
          <g>
            <rect x={10} y={16} width={250} height={214} fill={CAT.tile} {...ink} />
            <Mug id={id} cx={70} cy={86} scale={2} />
            {amberBox(132, 40, 116, 44)}
            {T(190, 58, "Deal ends in", 11, "middle")}
            <Price x={190} y={78} size={18} anchor="middle">
              09:59
            </Price>
            {amberBox(132, 96, 116, 26)}
            {T(190, 114, "Only 1 left!", 12, "middle")}
            <Price x={24} y={190} size={20}>
              $14
            </Price>
            <rect x={132} y={168} width={116} height={30} fill={CAT.ink} />
            <CatKey x={190} y={187} anchor="middle" size={10} fill={CAT.tile}>
              BUY NOW
            </CatKey>
            <Arrow x1={272} y1={124} x2={300} y2={124} s={6} />
            <Warehouse id={id} x={310} y={40} w={196} h={150} stock={false} />
            <rect x={360} y={96} width={96} height={93} fill={CAT.tile} />
            {Array.from({ length: 36 }, (_, k) => (
              <Parcel key={k} id={id} x={r2(366 + (k % 6) * 14)} y={r2(177 - Math.floor(k / 6) * 13)} w={11} h={9} />
            ))}
            <CatKey x={408} y={214} anchor="middle" size={10}>
              {`PAGE LOADS: ${loads}`}
            </CatKey>
          </g>
        ) : null}
        {trick === "sneak" ? (
          <g>
            <rect x={60} y={16} width={400} height={214} fill={CAT.tile} {...ink} />
            <g transform="translate(112 78) scale(0.6)">
              <Espresso id={id} cx={0} cy={0} />
            </g>
            {T(170, 50, "Espresso machine", 13)}
            <Price x={444} y={51} size={14} anchor="end">
              $60
            </Price>
            {[
              ["Parcel protection", "$4"],
              ["Extended warranty, 3 years", "$19"],
            ].map(([t, p], j) => (
              <g key={t}>
                {amberBox(166, 66 + j * 30, 286, 24)}
                <rect x={174} y={72 + j * 30} width={12} height={12} fill={CAT.tile} {...ink} />
                <path d={`M176 ${78 + j * 30}l3 3l6 -7`} fill="none" stroke={CAT.ink} strokeWidth={1.6} strokeLinecap="round" />
                {T(194, 82 + j * 30, t, 11)}
                <Price x={444} y={83 + j * 30} size={13} anchor="end">
                  {p}
                </Price>
              </g>
            ))}
            <line x1={166} y1={140.5} x2={452} y2={140.5} {...ink} />
            <Price x={444} y={172} size={24} anchor="end">
              $83
            </Price>
            <rect x={300} y={186} width={144} height={30} fill={CAT.ink} />
            <CatKey x={372} y={205} anchor="middle" size={10} fill={CAT.tile}>
              PLACE ORDER
            </CatKey>
          </g>
        ) : null}
        {trick === "roach" ? (
          <g>
            <CatKey x={10} y={30} size={10}>
              SUBSCRIBE
            </CatKey>
            <rect x={10} y={40} width={88} height={28} fill={CAT.ink} />
            <CatKey x={54} y={58} anchor="middle" size={10} fill={CAT.tile}>
              JOIN
            </CatKey>
            <Cursor x={80} y={56} scale={1.1} />
            <CatKey x={10} y={104} size={10}>
              CANCEL
            </CatKey>
            {Array.from({ length: 7 }, (_, k) => (
              <g key={k}>
                <rect x={10 + k * 60} y={114} width={46} height={40} fill={CAT.tile} {...ink} />
                <line x1={16 + k * 60} y1={124} x2={48 + k * 60} y2={124} {...hair} />
                <line x1={16 + k * 60} y1={131} x2={40 + k * 60} y2={131} {...hair} />
                <Arrow x1={58 + k * 60} y1={134} x2={k < 6 ? 68 + k * 60 : 436} y2={134} s={4} />
              </g>
            ))}
            <path d="M448 120q-6 0 -6 8q0 14 14 24q8 6 14 0l-5 -6q-4 3 -8 -1q-6 -6 -4 -12q3 -1 3 -5z" fill={CAT.ink} />
            {T(476, 142, "Call us", 10)}
            {amberBox(10, 184, 300, 40)}
            {T(160, 209, "No thanks, I like paying full price", 12, "middle")}
            <rect x={330} y={184} width={120} height={40} fill={CAT.ink} />
            <CatKey x={390} y={208} anchor="middle" size={10} fill={CAT.tile}>
              YES, SAVE 10%
            </CatKey>
          </g>
        ) : null}
      </Frame>
      <div className="flex flex-wrap items-end gap-x-4">
        <Segmented<Trick>
          label="Trick"
          value={trick}
          onChange={setTrick}
          options={[
            { id: "drip", label: "Drip pricing" },
            { id: "urgency", label: "Fake urgency" },
            { id: "sneak", label: "Sneak into basket" },
            { id: "roach", label: "Roach motel" },
          ]}
        />
        {trick === "urgency" ? (
          <PlateButton className="mt-2.5" onClick={() => setLoads((n) => n + 1)}>
            Reload the page
          </PlateButton>
        ) : null}
      </div>
    </div>
  );
}

/**
 * A footwear listing page with its category tree on the left, facet filters
 * below and the breadcrumb on top. Pick a branch of the tree, then tick
 * facets that cut across both branches. The waterproof boot at 4 has a blank
 * waterproof field in the PIM, so ticking Waterproof drops it (amber ring)
 * although it is waterproof.
 */
type Branch = "footwear" | "running" | "boots";
type Facet = "price" | "waterproof" | "stars";
const SHOES: { kind: "shoe" | "boot"; price: number; wp: boolean | null; stars: number }[] = [
  { kind: "shoe", price: 89, wp: false, stars: 4 },
  { kind: "boot", price: 149, wp: true, stars: 5 },
  { kind: "shoe", price: 119, wp: true, stars: 4 },
  { kind: "boot", price: 95, wp: null, stars: 5 },
  { kind: "shoe", price: 65, wp: false, stars: 3 },
  { kind: "boot", price: 79, wp: false, stars: 4 },
  { kind: "shoe", price: 99, wp: true, stars: 5 },
  { kind: "boot", price: 129, wp: true, stars: 3 },
];

export function FacetFilter() {
  const [branch, setBranch] = useState<Branch>("footwear");
  const [facets, setFacets] = useState<Facet[]>([]);
  const id = "w2-facets";
  const inBranch = (s: (typeof SHOES)[number]) => branch === "footwear" || (branch === "running" ? s.kind === "shoe" : s.kind === "boot");
  const passes = (s: (typeof SHOES)[number]) =>
    inBranch(s) && (!facets.includes("price") || s.price < 100) && (!facets.includes("waterproof") || s.wp === true) && (!facets.includes("stars") || s.stars >= 4);
  const lostToBlank = facets.includes("waterproof") && inBranch(SHOES[3]) && (!facets.includes("price") || SHOES[3].price < 100);
  const crumbs = ["Apparel", "Footwear", ...(branch === "running" ? ["Running Shoes"] : branch === "boots" ? ["Hiking Boots"] : [])];
  const facetText = { price: "Under $100", waterproof: "Waterproof", stars: "4★ & up" };
  const shownCount = SHOES.filter(passes).length;
  const tw = 96;
  const th = 104;
  return (
    <div>
      <Frame
        width={560}
        height={266}
        label={`A footwear listing page. Breadcrumb: ${crumbs.join(" › ")}${facets.length ? `, filtered by ${facets.map((f) => facetText[f]).join(", ")}` : ""}. ${shownCount} of 8 listings shown.${lostToBlank ? " The waterproof boot in slot 4 is hidden because its waterproof field is blank; its faded outline and amber blank field mark the empty slot." : ""}`}
      >
        <HalftoneDefs id={id} />
        {/* breadcrumb */}
        <text x={14} y={22} fontFamily={BODY_FONT} fontSize={12} fill={CAT.ink}>
          {crumbs.join("  ›  ")}
          {facets.map((f) => `   ·   ${facetText[f]}`).join("")}
        </text>
        <line x1={14} y1={32.5} x2={546} y2={32.5} {...hair} />
        {/* tree */}
        {[
          { t: "Apparel", d: 0, on: false },
          { t: "Footwear", d: 1, on: branch === "footwear" },
          { t: "Running Shoes", d: 2, on: branch === "running" },
          { t: "Hiking Boots", d: 2, on: branch === "boots" },
          { t: "Jackets", d: 1, on: false },
        ].map((n, k) => (
          <g key={n.t}>
            {n.d > 0 ? <path d={`M${8 + n.d * 12} ${50 + k * 24 - 12}V${50 + k * 24 - 4}H${14 + n.d * 12}`} fill="none" {...hair} /> : null}
            <text x={16 + n.d * 12} y={54 + k * 24} fontFamily={BODY_FONT} fontSize={12} fontWeight={n.on ? 700 : 400} fill={CAT.ink}>
              {n.t}
            </text>
          </g>
        ))}
        {/* listings */}
        {SHOES.map((s, k) => {
          const x = 150 + (k % 4) * (tw + 4);
          const y = 44 + Math.floor(k / 4) * (th + 6);
          if (!passes(s)) {
            const ring = k === 3 && lostToBlank;
            return (
              <g key={k}>
                <rect x={x} y={y} width={tw} height={th} fill="none" stroke={CAT.ink} strokeWidth={0.6} strokeDasharray="3 3" />
                {ring ? (
                  <g>
                    <g opacity={0.35}>
                      <Boot id={id} cx={x + tw / 2} cy={y + 38} />
                    </g>
                    <rect x={x + 6} y={y + 78} width={62} height={20} fill={CAT.amber} stroke={CAT.ink} strokeWidth={0.8} />
                    <Drop cx={x + 15} cy={y + 88} on={false} />
                    <CatKey x={x + 26} y={y + 93} size={10}>
                      BLANK
                    </CatKey>
                  </g>
                ) : null}
              </g>
            );
          }
          return (
            <g key={k}>
              <Tile x={x} y={y} w={tw} h={th} />
              <Numeral x={x + 8} y={y + 18} size={13}>
                {k + 1}
              </Numeral>
              {s.kind === "shoe" ? <Sneaker id={id} cx={x + tw / 2} cy={y + 40} s={0.95} /> : <Boot id={id} cx={x + tw / 2} cy={y + 38} />}
              <Price x={x + 9} y={y + 72} size={13}>
                {`$${s.price}`}
              </Price>
              <g>
                {Array.from({ length: 5 }, (_, j) => (
                  <Star key={j} cx={x + 54 + j * 8} cy={y + 68} r={3.2} on={j < s.stars} />
                ))}
              </g>
              <Drop cx={x + 15} cy={y + 88} on={s.wp === true} />
              <CatKey x={x + 26} y={y + 93} size={10} fill={s.wp === null ? CAT.amberText : CAT.ink}>
                {s.wp === null ? "BLANK" : s.wp ? "YES" : "NO"}
              </CatKey>
            </g>
          );
        })}
        <CatKey x={14} y={190} size={10}>
          SHOWING
        </CatKey>
        <Price x={14} y={212} size={18}>
          {`${shownCount} of 8`}
        </Price>
      </Frame>
      <Segmented<Branch>
        label="Category"
        value={branch}
        onChange={setBranch}
        options={[
          { id: "footwear", label: "Footwear" },
          { id: "running", label: "Running shoes" },
          { id: "boots", label: "Hiking boots" },
        ]}
      />
      <Toggles<Facet>
        label="Facets"
        value={facets}
        onChange={setFacets}
        options={[
          { id: "price", label: "Under $100" },
          { id: "waterproof", label: "Waterproof" },
          { id: "stars", label: "4 stars & up" },
        ]}
      />
    </div>
  );
}

/** A hiking boot in profile centred on (cx, cy): halftone upper, dense heel, lugged white sole, laces. */
function Boot({ id, cx, cy }: { id: string; cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx} ${cy})`} strokeLinejoin="round">
      <path d="M-20 -20H-2V-2Q12 2 22 6V12H-24V-14Q-24 -20 -20 -20Z" fill={ht(id, "light")} stroke={CAT.ink} strokeWidth={LINE.outline} />
      <path d="M-24 -6H-12V12H-24Z" fill={ht(id, "dense")} stroke="none" />
      <path d="M-26 12H24V17H-26Z" fill={CAT.tile} stroke={CAT.ink} strokeWidth={LINE.outline} />
      {[-20, -12, -4, 4, 12, 20].map((x) => (
        <line key={x} x1={x} y1={17} x2={x} y2={19} stroke={CAT.ink} strokeWidth={LINE.outline} />
      ))}
      {[0, 1, 2].map((k) => (
        <line key={k} x1={-4} y1={-16 + k * 5} x2={2} y2={-14 + k * 5} stroke={CAT.tile} strokeWidth={1.6} />
      ))}
    </g>
  );
}

/** A water drop centred on (cx, cy): filled ink when the listing says waterproof, open otherwise. */
function Drop({ cx, cy, on }: { cx: number; cy: number; on: boolean }) {
  return <path d={`M${cx} ${cy - 7}Q${cx + 6} ${cy} ${cx + 5} ${cy + 3}A5 5 0 0 1 ${cx - 5} ${cy + 3}Q${cx - 6} ${cy} ${cx} ${cy - 7}Z`} fill={on ? CAT.ink : CAT.tile} {...ink} />;
}

/**
 * A checkout form and what a hundred shoppers who start it do.
 * Switch fixes on: guest checkout drops the password fields, autocomplete
 * folds four address fields into one, a wallet replaces the card fields with
 * one approval, and upfront shipping removes the late surprise line (amber).
 * The screen gets shorter and more of the hundred finish (parcels).
 */
type Fix = "upfront" | "guest" | "auto" | "wallet";

export function FrictionFixes() {
  const [fixes, setFixes] = useState<Fix[]>([]);
  const id = "w2-fixes";
  const on = (f: Fix) => fixes.includes(f);
  const fields = [
    ...(on("guest") ? ["Email"] : ["Email", "Password", "Confirm password"]),
    ...(on("auto") ? ["Address (autocomplete)"] : ["Street", "City", "Postcode", "Country"]),
    ...(on("wallet") ? [] : ["Card number", "Expiry", "CVC"]),
  ];
  const done = 30 + (on("upfront") ? 12 : 0) + (on("guest") ? 10 : 0) + (on("auto") ? 8 : 0) + (on("wallet") ? 14 : 0);
  return (
    <div>
      <Frame
        width={560}
        height={200}
        label={`A checkout form with ${fields.length} fields to fill${on("wallet") ? " and a wallet pay button" : ""}${on("upfront") ? "" : ", and a shipping fee that appears only at the end, in amber"}. Of 100 shoppers who start it, ${done} finish, drawn as parcels.`}
      >
        <HalftoneDefs id={id} />
        {/* the form, two columns */}
        <rect x={10} y={8} width={330} height={184} fill={CAT.tile} {...ink} />
        {fields.map((f, k) => {
          const col = Math.floor(k / 5);
          const x = 20 + col * 160;
          const y = 16 + (k % 5) * 22;
          return (
            <g key={f + k}>
              <text x={x} y={y + 11} fontFamily={BODY_FONT} fontSize={11.5} fill={CAT.ink}>
                {f}
              </text>
              <rect x={x} y={y + 14} width={146} height={6} fill="none" {...hair} />
            </g>
          );
        })}
        {on("upfront") ? (
          <text x={20} y={146} fontFamily={BODY_FONT} fontSize={11.5} fill={CAT.ink}>
            Shipping $9.95 (shown in cart)
          </text>
        ) : (
          <g>
            <rect x={16} y={133} width={180} height={18} fill={CAT.amber} stroke={CAT.ink} strokeWidth={0.6} />
            <text x={22} y={146} fontFamily={BODY_FONT} fontSize={11.5} fill={CAT.ink}>
              Shipping +$9.95
            </text>
          </g>
        )}
        <rect x={16} y={158} width={318} height={26} fill={CAT.ink} />
        <CatKey x={175} y={176} anchor="middle" size={11.5} fill={CAT.tile}>
          {on("wallet") ? "PAY WITH FINGERPRINT" : "PLACE ORDER"}
        </CatKey>
        {/* the hundred */}
        {Array.from({ length: 100 }, (_, k) => {
          const x = 356 + (k % 10) * 20;
          const y = 8 + Math.floor(k / 10) * 15;
          return k < done ? (
            <Parcel key={k} id={id} x={x} y={y + 3} w={12} h={8} />
          ) : (
            <rect key={k} x={x} y={y + 1} width={14} height={10} fill="none" stroke={CAT.ink} strokeWidth={0.5} strokeDasharray="2 2" />
          );
        })}
        <Price x={356} y={182} size={19}>
          {`${done} of 100 finish`}
        </Price>
      </Frame>
      <Toggles<Fix>
        label="Fixes"
        value={fixes}
        onChange={setFixes}
        options={[
          { id: "upfront", label: "Shipping upfront" },
          { id: "guest", label: "Guest checkout" },
          { id: "auto", label: "Autocomplete" },
          { id: "wallet", label: "Digital wallet" },
        ]}
      />
    </div>
  );
}

/**
 * An agent asked for "a blender of 1,000 W or more, lowest total cost"
 * reads two product pages but not what sits behind later checkout steps or
 * inside PDFs. Blender A hides a $25 shipping fee until checkout; blender B
 * puts its 1,500 W motor only in a PDF manual. Expose either attribute and
 * see which one the agent buys; with both hidden it buys the dominated A.
 */
type Expose = "shipping" | "specs";

export function HiddenAttributes() {
  const [exp, setExp] = useState<Expose[]>([]);
  const id = "w2-hidden";
  const ship = exp.includes("shipping");
  const specs = exp.includes("specs");
  const aSeen = ship ? 104 : 79;
  const bQualifies = specs;
  const pick = bQualifies && 89 < aSeen ? "B" : "A";
  const paid = pick === "A" ? 104 : 89;
  const card = (x: number, which: "A" | "B") => {
    const isA = which === "A";
    const chosen = pick === which;
    return (
      <g>
        <rect x={x} y={20} width={300} height={196} fill={CAT.tile} stroke={CAT.ink} strokeWidth={chosen ? 2.4 : 1} />
        <rect x={x + 3} y={23} width={294} height={190} fill="none" stroke={CAT.ink} strokeWidth={0.45} />
        <CatKey x={x + 14} y={44} size={14}>
          {which}
        </CatKey>
        <Blender id={id} cx={x + 66} cy={120} />
        <Price x={x + 130} y={66} size={24}>
          {isA ? "$79" : "$89"}
        </Price>
        {/* shipping row */}
        {isA && !ship ? (
          <g>
            <rect x={x + 130} y={80} width={156} height={26} fill="none" stroke={CAT.ink} strokeWidth={0.8} strokeDasharray="3 3" />
            <text x={x + 138} y={97} fontFamily={BODY_FONT} fontSize={11} fill={CAT.ink}>
              Shipping: shown at step 3
            </text>
          </g>
        ) : (
          <g>
            <rect x={x + 130} y={80} width={156} height={26} fill={isA ? CAT.amber : CAT.tile} stroke={CAT.ink} strokeWidth={0.8} />
            <text x={x + 138} y={97} fontFamily={BODY_FONT} fontSize={11} fill={CAT.ink}>
              {isA ? "Shipping $25" : "Free shipping"}
            </text>
          </g>
        )}
        {/* spec row */}
        {!isA && !specs ? (
          <g>
            <path d={`M${x + 130} 116h22l8 8v28h-30Z`} fill={CAT.tile} {...ink} />
            <CatKey x={x + 145} y={142} anchor="middle" size={9}>
              PDF
            </CatKey>
            <text x={x + 168} y={138} fontFamily={BODY_FONT} fontSize={11} fill={CAT.ink}>
              Specifications (manual)
            </text>
          </g>
        ) : (
          <g>
            <rect x={x + 130} y={116} width={156} height={26} fill={!isA ? CAT.amber : CAT.tile} stroke={CAT.ink} strokeWidth={0.8} />
            <text x={x + 138} y={133} fontFamily={BODY_FONT} fontSize={11} fill={CAT.ink}>
              {isA ? "Motor 1,000 W" : "Motor 1,500 W"}
            </text>
          </g>
        )}
        <line x1={x + 130} y1={168.5} x2={x + 286} y2={168.5} {...hair} />
        <CatKey x={x + 130} y={190} size={10}>
          AGENT SEES
        </CatKey>
        <Price x={x + 286} y={192} size={15} anchor="end">
          {isA ? `$${aSeen}` : bQualifies ? "$89" : "no wattage"}
        </Price>
        {chosen ? <Agent id={id} cx={x + 268} cy={44} s={0.7} /> : null}
      </g>
    );
  };
  return (
    <div>
      <Frame
        width={800}
        height={232}
        label={`Two blender pages. A: $79, shipping $25 ${ship ? "shown on the page" : "hidden until checkout step 3"}, motor 1,000 W. B: $89, free shipping, 1,500 W motor ${specs ? "in a visible table" : "only in a PDF manual"}. The agent buys ${pick} and pays $${paid}${pick === "A" ? ", the dominated option" : ", the better option"}.`}
      >
        <HalftoneDefs id={id} />
        {card(10, "A")}
        {card(330, "B")}
        <rect x={650} y={130} width={140} height={60} fill={CAT.tile} {...ink} />
        <CatKey x={660} y={148} size={9}>
          GOAL
        </CatKey>
        <text x={660} y={166} fontFamily={BODY_FONT} fontSize={11} fill={CAT.ink}>
          1,000 W or more,
        </text>
        <text x={660} y={181} fontFamily={BODY_FONT} fontSize={11} fill={CAT.ink}>
          lowest total cost
        </text>
        <CatKey x={790} y={56} anchor="end" size={10}>
          AGENT PAYS
        </CatKey>
        <Price x={790} y={82} size={22} anchor="end" fill={pick === "A" ? CAT.amberText : CAT.ink}>
          {`$${paid}`}
        </Price>
        <CatKey x={790} y={104} anchor="end" size={9}>
          {pick === "A" ? "DOMINATED" : "BEST BUY"}
        </CatKey>
      </Frame>
      <Toggles<Expose>
        label="Put on the page"
        value={exp}
        onChange={setExp}
        options={[
          { id: "shipping", label: "A's shipping fee" },
          { id: "specs", label: "B's spec table" },
        ]}
      />
    </div>
  );
}

/** A countertop blender centred on (cx, cy): halftone jar with a white lid, dense motor base and a dial. */
function Blender({ id, cx, cy }: { id: string; cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx} ${cy})`} strokeLinejoin="round">
      <rect x={-20} y={-66} width={40} height={8} rx={2} fill={CAT.tile} stroke={CAT.ink} strokeWidth={LINE.outline} />
      <path d="M-20 -58H20L14 10H-14Z" fill={ht(id, "light")} stroke={CAT.ink} strokeWidth={LINE.outline} />
      <path d="M20 -50Q34 -50 34 -34V-14Q34 -2 18 -2" fill="none" stroke={CAT.ink} strokeWidth={3} />
      <path d="M-26 10H26L30 50H-30Z" fill={ht(id, "dense")} stroke={CAT.ink} strokeWidth={LINE.outline} />
      <circle cx={0} cy={30} r={8} fill={CAT.tile} stroke={CAT.ink} strokeWidth={LINE.outline} />
      <line x1={0} y1={30} x2={4} y2={24} stroke={CAT.ink} strokeWidth={LINE.outline} />
    </g>
  );
}

/**
 * A hundred carts filled in one day. Two-thirds of them (ink carts) are left
 * before payment, up to three-quarters counting the open carts at the edge
 * of the range; the rest end as paid parcels.
 */
export function HundredCarts() {
  const id = "w2-carts";
  return (
    <Frame
      width={400}
      height={170}
      label="One hundred carts in five rows of twenty: 67 solid ink carts abandoned, 8 open carts at the edge of the two-thirds to three-quarters range, and 25 parcels for carts that were paid."
    >
      <HalftoneDefs id={id} />
      {Array.from({ length: 100 }, (_, k) => {
        const cx = r2(19 + (k % 20) * 19.2);
        const cy = r2(18 + Math.floor(k / 20) * 25);
        if (k < 67) return <Cart key={k} id={id} cx={cx} cy={cy} s={0.55} />;
        if (k < 75) return <Cart key={k} id={id} cx={cx} cy={cy} s={0.55} tone="open" />;
        return <Parcel key={k} id={id} x={r2(cx - 6)} y={r2(cy - 3)} w={11} h={8} />;
      })}
      <line x1={10} y1={140.5} x2={390} y2={140.5} {...hair} />
      <Price x={10} y={162} size={16}>
        67–75
      </Price>
      <CatKey x={66} y={160} size={10}>
        OF 100 CARTS ABANDONED BEFORE PAYMENT
      </CatKey>
    </Frame>
  );
}

/**
 * Four bags of coffee on a results page. The cheapest-looking bag is the
 * smallest; the best value per 100 g is bag 2. Choose where the store puts
 * the unit price, and how many clicks the agent can afford. It reads the
 * bags in rank order until its clicks run out, then picks the best unit
 * price it has read, or, having read none, the lowest sticker price.
 * Unit prices it has read are amber.
 */
type Depth = 0 | 1 | 2;
const BAGS = [
  { price: 9.99, grams: 250 },
  { price: 12.49, grams: 500 },
  { price: 8.99, grams: 200 },
  { price: 11.99, grams: 340 },
];
const per100 = (b: (typeof BAGS)[number]) => (b.price / b.grams) * 100;

export function InspectionBudget() {
  const [depth, setDepth] = useState<Depth>(2);
  const [budget, setBudget] = useState(3);
  const id = "w2-budget";
  const read: boolean[] = [];
  let left = budget;
  BAGS.forEach(() => {
    if (left >= depth) {
      read.push(true);
      left -= depth;
    } else read.push(false);
  });
  const known = BAGS.map((b, k) => ({ k, v: per100(b) })).filter((x) => read[x.k]);
  const pick = known.length ? known.reduce((a, b) => (b.v < a.v ? b : a)).k : BAGS.reduce((a, b, k) => (b.price < BAGS[a].price ? k : a), 0);
  const best = 1;
  const tw = 108;
  return (
    <div>
      <Frame
        width={480}
        height={232}
        label={`Four coffee bags; the unit price is ${depth === 0 ? "on the card" : depth === 1 ? "one click away" : "two clicks away"} and the agent can afford ${budget} clicks. It reads the unit price of ${read.filter(Boolean).length} bags and picks bag ${pick + 1}${pick === best ? ", the best value" : `; the best value is bag ${best + 1}`}.`}
      >
        <HalftoneDefs id={id} />
        {BAGS.map((b, k) => {
          const x = 10 + k * (tw + 9);
          const chosen = k === pick;
          return (
            <g key={k}>
              <Tile x={x} y={36} w={tw} h={150} />
              <Numeral x={x + 9} y={56} size={14}>
                {k + 1}
              </Numeral>
              <Bag id={id} cx={x + tw / 2} cy={92} s={0.6 + b.grams / 1000} />
              <Price x={x + 9} y={146} size={14}>
                {`$${b.price}`}
              </Price>
              <CatKey x={x + tw - 8} y={145} anchor="end" size={9.5}>
                {`${b.grams} G`}
              </CatKey>
              {read[k] ? (
                <g>
                  <rect x={x + 8} y={156} width={tw - 16} height={20} fill={CAT.amber} stroke={CAT.ink} strokeWidth={0.6} />
                  <Price x={x + tw / 2} y={171} size={12} anchor="middle">
                    {`$${per100(b).toFixed(2)} / 100 g`}
                  </Price>
                </g>
              ) : (
                <rect x={x + 8} y={156} width={tw - 16} height={20} fill="none" stroke={CAT.ink} strokeWidth={0.6} strokeDasharray="3 3" />
              )}
              {chosen ? (
                <g>
                  <Agent id={id} cx={x + tw / 2} cy={16} s={0.55} />
                  <path d={`M${x + tw / 2} 27v5`} stroke={CAT.ink} strokeWidth={1} />
                  <rect x={x - 3} y={33} width={tw + 6} height={156} fill="none" stroke={CAT.ink} strokeWidth={LINE.bold} />
                </g>
              ) : null}
            </g>
          );
        })}
        <CatKey x={10} y={210} size={10}>
          CLICKS PER UNIT PRICE
        </CatKey>
        <Price x={170} y={211} size={14}>
          {depth}
        </Price>
        <CatKey x={470} y={210} anchor="end" size={10}>
          {pick === best ? "BEST VALUE CHOSEN" : `BEST VALUE IS BAG ${best + 1}`}
        </CatKey>
      </Frame>
      <Segmented<"0" | "1" | "2">
        label="Unit price"
        value={String(depth) as "0" | "1" | "2"}
        onChange={(v) => setDepth(Number(v) as Depth)}
        options={[
          { id: "0", label: "On the card" },
          { id: "1", label: "One click away" },
          { id: "2", label: "Two clicks away" },
        ]}
      />
      <Slider label="Clicks the agent can afford" value={budget} min={0} max={8} step={1} onChange={setBudget} />
    </div>
  );
}

/** A bag of coffee beans centred on (cx, cy) at scale s: folded top, halftone body, white label with a bean. */
function Bag({ id, cx, cy, s = 1 }: { id: string; cx: number; cy: number; s?: number }) {
  return (
    <g transform={`translate(${cx} ${cy}) scale(${r2(s)})`} strokeLinejoin="round">
      <path d="M-16 -26H16L18 -20H-18Z" fill={ht(id, "dense")} stroke={CAT.ink} strokeWidth={r2(LINE.outline / s)} />
      <path d="M-18 -20H18L20 24Q20 26 18 26H-18Q-20 26 -20 24Z" fill={ht(id, "light")} stroke={CAT.ink} strokeWidth={r2(LINE.outline / s)} />
      <rect x={-11} y={-6} width={22} height={18} fill={CAT.tile} stroke={CAT.ink} strokeWidth={r2(LINE.outline / s)} />
      <ellipse cx={0} cy={3} rx={4} ry={5.5} fill={CAT.ink} />
      <path d="M0 -2Q-2 3 0 8" fill="none" stroke={CAT.tile} strokeWidth={r2(1 / s)} />
    </g>
  );
}

/**
 * The retailer's quarter in three rows of fifty marks, each two percent:
 * phones (purple) and desktop screens (ink). Phones hold 72% of sessions and
 * 68% of add-to-cart events, but only 34% of completed orders.
 */
export function MobileShare() {
  const rows = [
    { key: "SESSIONS", mobile: 72 },
    { key: "ADD-TO-CART EVENTS", mobile: 68 },
    { key: "COMPLETED ORDERS", mobile: 34 },
  ];
  return (
    <Frame
      width={400}
      height={262}
      label="Three rows of fifty marks, each two percent: sessions 72% phones, add-to-cart events 68% phones, completed orders 34% phones; phones in purple, desktop screens in ink."
    >
      {rows.map((r, i) => {
        const y = 14 + i * 84;
        const phones = r.mobile / 2;
        return (
          <g key={r.key}>
            <CatKey x={10} y={y + 10} size={10}>
              {r.key}
            </CatKey>
            <Price x={390} y={y + 11} size={15} anchor="end" fill={CAT.purple}>
              {`${r.mobile}%`}
            </Price>
            {Array.from({ length: 50 }, (_, k) => {
              const x = 12 + (k % 25) * 15.2;
              const yy = y + 22 + Math.floor(k / 25) * 24;
              return k < phones ? (
                <g key={k}>
                  <rect x={r2(x)} y={yy} width={9} height={17} rx={2} fill={CAT.purple} />
                  <rect x={r2(x + 1.8)} y={yy + 2.5} width={5.4} height={10} fill={CAT.tile} />
                </g>
              ) : (
                <g key={k}>
                  <rect x={r2(x - 1.5)} y={yy + 2} width={12} height={9} fill={CAT.tile} stroke={CAT.ink} strokeWidth={1} />
                  <line x1={r2(x + 4.5)} y1={yy + 11} x2={r2(x + 4.5)} y2={yy + 15} stroke={CAT.ink} strokeWidth={1} />
                  <line x1={r2(x + 1.5)} y1={yy + 15.5} x2={r2(x + 7.5)} y2={yy + 15.5} stroke={CAT.ink} strokeWidth={1} />
                </g>
              );
            })}
          </g>
        );
      })}
    </Frame>
  );
}

/**
 * The same promotional banner, read twice. The shopper sees the mug, the
 * discount and the new price. The AI agent (purple) reading the page code
 * finds only an image tag pointing at a file name: no material, category,
 * discount or price.
 */
export function MugBanner() {
  const id = "w2-banner";
  return (
    <Frame
      width={440}
      height={276}
      label="Above: a shopper looks at a banner showing an engraved ceramic mug with the words 20% Off All Ceramic Mugs, Now $16. Below: a purple AI agent reads the same banner in the page code as a single image tag, img src promo_banner_v3.jpg, with nothing else."
    >
      <HalftoneDefs id={id} />
      <Person id={id} cx={34} cy={74} s={1} />
      <rect x={76} y={14} width={354} height={118} fill={CAT.ink} />
      <rect x={86} y={24} width={110} height={98} fill={CAT.tile} />
      <Mug id={id} cx={141} cy={73} scale={1.8} />
      <text x={212} y={60} fontFamily="var(--font-heading)" fontSize={26} fill={CAT.tile}>
        20% Off
      </text>
      <text x={212} y={84} fontFamily={BODY_FONT} fontSize={13} fill={CAT.tile}>
        All Ceramic Mugs
      </text>
      <text x={212} y={114} fontFamily="var(--font-heading)" fontSize={22} fill={CAT.tile}>
        Now $16
      </text>
      <line x1={14} y1={152.5} x2={426} y2={152.5} {...hair} />
      <Agent id={id} cx={34} cy={228} s={1} tone="purple" />
      <rect x={76} y={196} width={354} height={60} fill={CAT.tile} stroke={CAT.purple} strokeWidth={1} />
      <text x={92} y={231} fontFamily={BODY_FONT} fontSize={14} fill={CAT.purple}>
        {'<img src="promo_banner_v3.jpg">'}
      </text>
    </Frame>
  );
}

/**
 * One product detail page, top to bottom, with the fold drawn across it.
 * Above: the shoe's photograph with its 360-degree and video thumbnails,
 * title, price, size and colour selectors, stock and the add-to-cart
 * button, and right under the button the risk-reversal lines (amber). Below:
 * the spec table, the fit scale and verified reviews.
 */
export function PdpAnatomy() {
  const id = "w2-pdp";
  return (
    <Frame
      width={440}
      height={392}
      label="A product detail page with a dashed fold line. Above the fold: a large sneaker photograph with thumbnails for a 360-degree spin and a video, the title, $120 price, size boxes, colour swatches, in-stock line and add-to-cart button, with amber risk-reversal lines for delivery date, free returns and warranty beneath it. Below the fold: a specification table, a fit scale and three reviews with stars."
    >
      <HalftoneDefs id={id} />
      <rect x={10} y={8} width={330} height={376} fill={CAT.tile} {...ink} />
      {/* media */}
      <rect x={22} y={20} width={150} height={120} fill={CAT.tile} {...hair} />
      <Sneaker id={id} cx={97} cy={84} s={1.5} />
      {[0, 1, 2].map((k) => (
        <rect key={k} x={22 + k * 52} y={146} width={46} height={30} fill={CAT.tile} {...hair} />
      ))}
      <Sneaker id={id} cx={45} cy={161} s={0.55} />
      {/* 360 mark */}
      <Sneaker id={id} cx={97} cy={160} s={0.42} />
      <path d="M82 168A16 7 0 1 0 84 154" fill="none" {...ink} />
      <path d={headAlong(84, 154, 3, -1, 4)} fill="none" {...ink} />
      {/* video mark */}
      <path d="M144 152L158 161L144 170Z" fill={CAT.ink} />
      {/* buy box */}
      <line x1={186} y1={26} x2={326} y2={26} {...ink} />
      <line x1={186} y1={34} x2={300} y2={34} {...hair} />
      <Price x={186} y={60} size={20}>
        $120
      </Price>
      {[0, 1, 2, 3, 4].map((k) => (
        <g key={k}>
          <rect x={186 + k * 28} y={72} width={24} height={18} fill={k === 2 ? CAT.ink : CAT.tile} {...hair} />
          <Price x={198 + k * 28} y={85} size={10} anchor="middle" fill={k === 2 ? CAT.tile : CAT.ink}>
            {`${40 + k}`}
          </Price>
        </g>
      ))}
      {[0, 1, 2].map((k) => (
        <circle key={k} cx={194 + k * 20} cy={104} r={7} fill={k === 0 ? CAT.ink : k === 1 ? ht(id, "dense") : CAT.tile} {...ink} />
      ))}
      <CatKey x={256} y={108} size={9}>
        IN STOCK
      </CatKey>
      <rect x={186} y={118} width={140} height={26} fill={CAT.ink} />
      <CatKey x={256} y={135} anchor="middle" size={10} fill={CAT.tile}>
        ADD TO CART
      </CatKey>
      {/* risk reversal */}
      <rect x={186} y={150} width={140} height={38} fill={CAT.amber} stroke={CAT.ink} strokeWidth={0.8} />
      {["Arrives Thursday 14 May", "Free returns for 60 days", "2-year warranty"].map((t, k) => (
        <text key={t} x={194} y={162 + k * 11} fontFamily={BODY_FONT} fontSize={9.5} fill={CAT.ink}>
          {t}
        </text>
      ))}
      {/* fold */}
      <line x1={4} y1={198.5} x2={436} y2={198.5} stroke={CAT.ink} strokeWidth={1} strokeDasharray="5 4" />
      {/* below: spec table */}
      {[0, 1, 2, 3].map((k) => (
        <g key={k}>
          <line x1={22} y1={222 + k * 14} x2={74} y2={222 + k * 14} {...hair} />
          <line x1={92} y1={222 + k * 14} x2={150} y2={222 + k * 14} {...hair} />
          <line x1={22} y1={228.5 + k * 14} x2={160} y2={228.5 + k * 14} stroke={CAT.ink} strokeWidth={0.3} />
        </g>
      ))}
      {/* fit scale */}
      <line x1={186} y1={232} x2={326} y2={232} {...ink} />
      {[0, 1, 2, 3, 4].map((k) => (
        <line key={k} x1={186 + k * 35} y1={227} x2={186 + k * 35} y2={237} {...ink} />
      ))}
      <path d="M247 222l5 8l5 -8Z" fill={CAT.ink} />
      <CatKey x={186} y={252} size={9}>
        SMALL
      </CatKey>
      <CatKey x={326} y={252} anchor="end" size={9}>
        LARGE
      </CatKey>
      {/* reviews */}
      {[0, 1, 2].map((k) => (
        <g key={k}>
          {[0, 1, 2, 3, 4].map((j) => (
            <Star key={j} cx={28 + j * 10} cy={290 + k * 30} r={3.8} on={j < [5, 4, 5][k]} />
          ))}
          <CatKey x={82} y={294 + k * 30} size={9}>
            VERIFIED
          </CatKey>
          <line x1={22} y1={302 + k * 30} x2={320} y2={302 + k * 30} {...hair} />
          <line x1={22} y1={308 + k * 30} x2={260} y2={308 + k * 30} {...hair} />
        </g>
      ))}
      {/* keys in the margin */}
      <CatKey x={352} y={24} size={10}>
        ABOVE THE
      </CatKey>
      <CatKey x={352} y={37} size={10}>
        FOLD
      </CatKey>
      <CatKey x={352} y={164} size={10} fill={CAT.amberText}>
        RISK
      </CatKey>
      <CatKey x={352} y={177} size={10} fill={CAT.amberText}>
        REVERSAL
      </CatKey>
      <CatKey x={352} y={218} size={10}>
        BELOW THE
      </CatKey>
      <CatKey x={352} y={231} size={10}>
        FOLD
      </CatKey>
      <line x1={340} y1={160} x2={348} y2={160} {...hair} />
    </Frame>
  );
}

/**
 * One store's search bar, three queries and two engines. An exact keyword
 * engine needs the typed string inside a product title, so a synonym, a typo
 * or a sentence returns an empty page (amber). Lexical matching plus
 * semantic embeddings finds the coats and the backpacks under $150.
 */
type Query = "parka" | "typo" | "sentence";
type Engine = "exact" | "semantic";
const QUERIES: Record<Query, string> = { parka: "parka", typo: "winter cot", sentence: "carry-on backpack under 150 dollars" };
const STOCK: { kind: "coat" | "pack"; title: string; price: number }[] = [
  { kind: "coat", title: "Winter coat", price: 189 },
  { kind: "coat", title: "Insulated winter coat", price: 229 },
  { kind: "pack", title: "Carry-on backpack", price: 129 },
  { kind: "pack", title: "Travel backpack", price: 179 },
  { kind: "pack", title: "Carry-on backpack 40 L", price: 149 },
  { kind: "coat", title: "Rain shell", price: 99 },
];

export function QueryEngine() {
  const [q, setQ] = useState<Query>("parka");
  const [engine, setEngine] = useState<Engine>("exact");
  const id = "w2-search";
  const text = QUERIES[q];
  const hits = STOCK.filter((s) => {
    if (engine === "exact") return s.title.toLowerCase().includes(text.toLowerCase());
    if (q === "sentence") return s.kind === "pack" && s.price <= 150;
    return s.title.toLowerCase().includes("winter coat");
  });
  return (
    <div>
      <Frame
        width={560}
        height={262}
        label={`A store search bar with the query "${text}", run by ${engine === "exact" ? "an exact keyword engine" : "lexical plus semantic search"}. ${hits.length === 0 ? "The results page is empty: 0 results, marked in amber." : `${hits.length} results: ${hits.map((h) => `${h.title} $${h.price}`).join(", ")}.`}`}
      >
        <HalftoneDefs id={id} />
        <rect x={14} y={10} width={532} height={240} fill={CAT.tile} {...ink} />
        <rect x={30} y={24} width={420} height={30} rx={15} fill={CAT.tile} {...ink} />
        <circle cx={50} cy={39} r={6} fill="none" {...ink} />
        <line x1={54.5} y1={43.5} x2={59} y2={48} {...ink} />
        <text x={68} y={44} fontFamily={BODY_FONT} fontSize={15} fill={CAT.ink}>
          {text}
        </text>
        <rect x={462} y={24} width={70} height={30} fill={CAT.ink} />
        <circle cx={491} cy={37} r={6} fill="none" stroke={CAT.tile} strokeWidth={1.4} />
        <line x1={495.5} y1={41.5} x2={500} y2={46} stroke={CAT.tile} strokeWidth={1.4} />
        <line x1={30} y1={68.5} x2={532} y2={68.5} {...hair} />
        {hits.length === 0 ? (
          <g>
            <rect x={170} y={104} width={220} height={52} fill={CAT.amber} stroke={CAT.ink} strokeWidth={1} />
            <Price x={280} y={139} size={22} anchor="middle">
              0 results
            </Price>
            {[0, 1, 2].map((k) => (
              <rect key={k} x={146 + k * 92} y={180} width={84} height={50} fill="none" stroke={CAT.ink} strokeWidth={0.6} strokeDasharray="3 3" />
            ))}
          </g>
        ) : (
          hits.map((h, k) => (
            <g key={h.title}>
              <Tile x={30 + k * 128} y={82} w={120} h={156} />
              <Numeral x={40 + k * 128} y={102} size={14}>
                {k + 1}
              </Numeral>
              {h.kind === "coat" ? (
                <g transform={`translate(${90 + k * 128} 150) scale(0.5)`}>
                  <Jacket id={id} cx={0} cy={0} />
                </g>
              ) : (
                <Backpack id={id} cx={90 + k * 128} cy={146} />
              )}
              <line x1={42 + k * 128} y1={198} x2={130 + k * 128} y2={198} {...hair} />
              <line x1={42 + k * 128} y1={205} x2={112 + k * 128} y2={205} {...hair} />
              <Price x={42 + k * 128} y={228} size={15}>
                {`$${h.price}`}
              </Price>
            </g>
          ))
        )}
      </Frame>
      <Segmented<Query>
        label="Query"
        value={q}
        onChange={setQ}
        options={[
          { id: "parka", label: "parka" },
          { id: "typo", label: "winter cot" },
          { id: "sentence", label: "carry-on backpack under 150 dollars" },
        ]}
      />
      <Segmented<Engine>
        label="Engine"
        value={engine}
        onChange={setEngine}
        options={[
          { id: "exact", label: "Exact keywords" },
          { id: "semantic", label: "Lexical + semantic" },
        ]}
      />
    </div>
  );
}

/** A travel backpack centred on (cx, cy): halftone body, dense side, white front pocket and a top handle. */
function Backpack({ id, cx, cy }: { id: string; cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx} ${cy})`} strokeLinejoin="round">
      <path d="M-8 -34Q0 -42 8 -34" fill="none" stroke={CAT.ink} strokeWidth={2.4} />
      <rect x={-26} y={-34} width={52} height={66} rx={12} fill={ht(id, "light")} stroke={CAT.ink} strokeWidth={LINE.outline} />
      <path d="M14 -33Q26 -32 26 -22V20Q26 32 14 32Z" fill={ht(id, "dense")} stroke="none" />
      <rect x={-18} y={4} width={30} height={22} rx={5} fill={CAT.tile} stroke={CAT.ink} strokeWidth={LINE.outline} />
      <line x1={-14} y1={10} x2={8} y2={10} stroke={CAT.ink} strokeWidth={LINE.hair} />
    </g>
  );
}

/**
 * Six months of cart-recovery emails, with and without a discount code.
 * Upper row: orders the emails recover each month (parcels, each four
 * orders). Lower row: repeat buyers who have learned to leave their cart to
 * wait for the code (amber carts), orders that would have been paid at full
 * price.
 */
type Policy = "plain" | "code";

export function RecoveryDiscount() {
  const [policy, setPolicy] = useState<Policy>("plain");
  const id = "w2-recover";
  const months = Array.from({ length: 6 }, (_, m) => ({
    recovered: policy === "plain" ? 20 : 28 + m * 4,
    strategic: policy === "plain" ? 0 : m * 6,
  }));
  const lost = months.reduce((a, m) => a + m.strategic, 0);
  const cx = (m: number) => 88 + m * 58;
  return (
    <div>
      <Frame
        width={440}
        height={176}
        label={`Six months of recovery emails, ${policy === "plain" ? "reminder only" : "reminder with a 10% code"}. Recovered orders per month: ${months.map((m) => m.recovered).join(", ")}. Buyers abandoning on purpose: ${months.map((m) => m.strategic).join(", ")}; ${lost} full-price orders turned into discounted ones.`}
      >
        <HalftoneDefs id={id} />
        <g transform="translate(0 -36)">
        <CatKey x={10} y={70} size={10}>
          RECOVERED
        </CatKey>
        <CatKey x={10} y={128} size={10} fill={CAT.amberText}>
          WAITING FOR
        </CatKey>
        <CatKey x={10} y={141} size={10} fill={CAT.amberText}>
          THE CODE
        </CatKey>
        {months.map((m, k) => (
          <g key={k}>
            {Array.from({ length: Math.round(m.recovered / 4) }, (_, j) => (
              <Parcel key={j} id={id} x={r2(cx(k) + (j % 3) * 15)} y={r2(80 - Math.floor(j / 3) * 12)} w={11} h={8} />
            ))}
            {Array.from({ length: Math.round(m.strategic / 4) }, (_, j) => (
              <Cart key={j} id={id} cx={r2(cx(k) + 8 + (j % 3) * 16)} cy={r2(114 + Math.floor(j / 3) * 18)} s={0.5} tone="amber" />
            ))}
            <Numeral x={cx(k) + 20} y={180} size={13} anchor="middle">
              {k + 1}
            </Numeral>
          </g>
        ))}
        <line x1={84} y1={96.5} x2={436} y2={96.5} {...hair} />
        <line x1={84} y1={162.5} x2={436} y2={162.5} {...hair} />
        <CatKey x={10} y={179} size={10}>
          MONTH
        </CatKey>
        <Price x={436} y={204} size={14} anchor="end" fill={CAT.amberText}>
          {`${lost} full-price orders lost to the code`}
        </Price>
        </g>
      </Frame>
      <Segmented<Policy>
        label="Recovery email"
        value={policy}
        onChange={setPolicy}
        options={[
          { id: "plain", label: "Reminder only" },
          { id: "code", label: "Reminder + 10% code" },
        ]}
      />
    </div>
  );
}

/**
 * The coffee brand's product page before and after the minimalist redesign,
 * and orders before and after. The redesign drops the spec table for a PDF
 * and hides shipping behind three clicks. Orders from people stay level;
 * orders from AI assistants (purple) fall by 45 percent.
 */
export function RedesignDrop() {
  const id = "w2-redesign";
  const page = (x: number, after: boolean) => (
    <g>
      <rect x={x} y={10} width={180} height={128} fill={CAT.tile} {...ink} />
      <g transform={`translate(${x + 44} 64) scale(0.42)`}>
        <Espresso id={id} cx={0} cy={0} />
      </g>
      <line x1={x + 92} y1={28} x2={x + 168} y2={28} {...ink} />
      <Price x={x + 92} y={52} size={14}>
        $649
      </Price>
      {after ? (
        <g>
          <path d={`M${x + 92} 66h18l6 6v22h-24Z`} fill={CAT.tile} {...ink} />
          <CatKey x={x + 104} y={86} anchor="middle" size={9}>
            PDF
          </CatKey>
          {[0, 1, 2].map((k) => (
            <g key={k}>
              <rect x={x + 92 + k * 26} y={104} width={20} height={14} fill={CAT.tile} {...hair} />
              {k < 2 ? <Arrow x1={x + 113 + k * 26} y1={111} x2={x + 117 + k * 26} y2={111} s={3} /> : null}
            </g>
          ))}
        </g>
      ) : (
        <g>
          {[0, 1, 2, 3].map((k) => (
            <g key={k}>
              <line x1={x + 92} y1={70 + k * 11} x2={x + 122} y2={70 + k * 11} {...hair} />
              <line x1={x + 130} y1={70 + k * 11} x2={x + 166} y2={70 + k * 11} {...hair} />
            </g>
          ))}
          <text x={x + 92} y={124} fontFamily={BODY_FONT} fontSize={9.5} fill={CAT.ink}>
            Shipping $15
          </text>
        </g>
      )}
    </g>
  );
  const rows = [
    { who: "human", before: 10, after: 10 },
    { who: "agent", before: 10, after: 5.5 },
  ];
  return (
    <Frame
      width={400}
      height={262}
      label="Left, the old product page with a visible spec table and a shipping line; right, the redesign with a PDF icon and three click steps before shipping is shown. Below, orders before and after: people's orders stay at ten parcels; AI assistants' orders, in purple, fall from ten parcels to five and a half, minus 45 percent."
    >
      <HalftoneDefs id={id} />
      {page(10, false)}
      <Arrow x1={194} y1={74} x2={206} y2={74} s={5} />
      {page(210, true)}
      {rows.map((r, i) => {
        const y = 160 + i * 50;
        const purple = r.who === "agent";
        return (
          <g key={r.who}>
            {purple ? <Agent id={id} cx={22} cy={y + 12} s={0.6} tone="purple" /> : <Person id={id} cx={22} cy={y + 14} s={0.55} />}
            {[r.before, r.after].map((n, side) => (
              <g key={side} clipPath={`url(#${id}-clip-${i}-${side})`}>
                <defs>
                  <clipPath id={`${id}-clip-${i}-${side}`}>
                    <rect x={50 + side * 200} y={y} width={r2(n * 14)} height={30} />
                  </clipPath>
                </defs>
                {Array.from({ length: 10 }, (_, k) => (
                  <Parcel key={k} id={id} x={50 + side * 200 + k * 14} y={y + 10} w={10} h={8} tone={purple ? "purple" : "ink"} />
                ))}
              </g>
            ))}
          </g>
        );
      })}
      <Price x={390} y={234} size={15} anchor="end" fill={CAT.purple}>
        −45%
      </Price>
    </Frame>
  );
}

/**
 * The page's DOM tree at the moment a fast agent reads it. Server-side
 * rendered, the product facts are in the first response. Rendered by
 * client-side JavaScript, the first response is an empty root element
 * (amber) until the script's fetch returns at 900 ms. Move the moment the
 * agent reads and count the facts it gets.
 */
type Render = "csr" | "ssr";
const FACTS = ['<h1>Barista One</h1>', '<span itemprop="price">349</span>', '<meta itemprop="priceCurrency" content="USD">', '<link itemprop="availability" href="InStock">', "<table> boiler · 58 dB · 1,450 W </table>"];

export function RenderTiming() {
  const [mode, setMode] = useState<Render>("csr");
  const [t, setT] = useState(200);
  const id = "w2-render";
  const ready = mode === "ssr" || t >= 900;
  const X = (ms: number) => r2(40 + (ms / 1500) * 480);
  return (
    <div>
      <Frame
        width={560}
        height={300}
        label={`${mode === "ssr" ? "Server-side rendered" : "Client-side rendered"} page read by an AI agent at ${t} ms. ${ready ? "All five product facts are in the DOM: title, price, currency, availability and specifications." : "The DOM holds only an empty root element, shown in amber: no product facts."}`}
      >
        <HalftoneDefs id={id} />
        <Agent id={id} cx={34} cy={52} s={0.9} />
        <Arrow x1={60} y1={52} x2={84} y2={52} s={6} />
        <rect x={92} y={12} width={454} height={210} fill={CAT.tile} {...ink} />
        {[
          ["<html>", 0],
          ["<head> … </head>", 1],
          ["<body>", 1],
        ].map(([tag, d], k) => (
          <text key={k} x={106 + (d as number) * 18} y={34 + k * 18} fontFamily={BODY_FONT} fontSize={12} fill={CAT.ink}>
            {tag as string}
          </text>
        ))}
        {ready ? (
          <g>
            <text x={142} y={88} fontFamily={BODY_FONT} fontSize={12} fill={CAT.ink}>
              {'<div id="root">'}
            </text>
            {FACTS.map((f, k) => (
              <g key={k}>
                <rect x={156} y={96 + k * 22} width={374} height={18} fill={CAT.tile} {...hair} />
                <text x={164} y={109 + k * 22} fontFamily={BODY_FONT} fontSize={11} fill={CAT.ink}>
                  {f}
                </text>
              </g>
            ))}
          </g>
        ) : (
          <g>
            <rect x={136} y={74} width={200} height={22} fill={CAT.amber} stroke={CAT.ink} strokeWidth={0.8} />
            <text x={142} y={89} fontFamily={BODY_FONT} fontSize={12} fill={CAT.ink}>
              {'<div id="root"></div>'}
            </text>
            {FACTS.map((_, k) => (
              <rect key={k} x={156} y={104 + k * 22} width={374} height={16} fill="none" stroke={CAT.ink} strokeWidth={0.5} strokeDasharray="3 3" />
            ))}
          </g>
        )}
        {/* timeline */}
        <line x1={X(0)} y1={252.5} x2={X(1500)} y2={252.5} {...ink} />
        {[0, 500, 1000, 1500].map((ms) => (
          <g key={ms}>
            <line x1={X(ms)} y1={248} x2={X(ms)} y2={257} {...ink} />
            <Price x={X(ms)} y={274} size={11} anchor="middle">
              {`${ms} ms`}
            </Price>
          </g>
        ))}
        {mode === "csr" ? (
          <g>
            <line x1={X(900)} y1={242} x2={X(900)} y2={262} stroke={CAT.ink} strokeWidth={LINE.bold} />
            <CatKey x={X(900)} y={238} anchor="middle" size={10}>
              SCRIPT FETCH RETURNS
            </CatKey>
          </g>
        ) : null}
        <path d={`M${X(t)} 258l-6 10h12Z`} fill={CAT.ink} />
        <CatKey x={X(t)} y={292} anchor="middle" size={10}>
          AGENT READS
        </CatKey>
        <CatKey x={530} y={34} anchor="end" size={10}>
          FACTS FOUND
        </CatKey>
        <Price x={530} y={58} size={18} anchor="end" fill={ready ? CAT.ink : CAT.amberText}>
          {ready ? "5 of 5" : "0 of 5"}
        </Price>
      </Frame>
      <Segmented<Render>
        label="Rendering"
        value={mode}
        onChange={setMode}
        options={[
          { id: "csr", label: "Client-side JavaScript" },
          { id: "ssr", label: "Server-side rendered" },
        ]}
      />
      <Slider label="Agent reads at" value={t} min={50} max={1500} step={50} onChange={setT} formatValue={(v) => `${v} ms`} />
    </div>
  );
}

/**
 * Left, a product page's JSON-LD block; right, the search result built from
 * it. Switch fields on in the block and the result gains what each declares
 * (amber): the price, the stock status, the stars and review count. Below,
 * the merchant feed pushes the same catalogue to search, social and AI
 * shopping ecosystems.
 */
type Field = "offer" | "stock" | "rating" | "gtin";

export function RichResult() {
  const [fields, setFields] = useState<Field[]>(["offer"]);
  const id = "w2-rich";
  const on = (f: Field) => fields.includes(f);
  const lines: { t: string; d: number; f?: Field }[] = [
    { t: "{", d: 0 },
    { t: '"@type": "Product",', d: 1 },
    { t: '"name": "Barista One",', d: 1 },
    { t: '"brand": "Corva",', d: 1 },
    ...(on("gtin") ? [{ t: '"gtin13": "4006381333931",', d: 1, f: "gtin" as Field }] : []),
    ...(on("offer") || on("stock")
      ? [
          { t: '"offers": { "@type": "Offer",', d: 1 },
          ...(on("offer") ? [{ t: '"price": 349, "priceCurrency": "USD",', d: 2, f: "offer" as Field }] : []),
          ...(on("stock") ? [{ t: '"availability": "InStock"', d: 2, f: "stock" as Field }] : []),
          { t: "},", d: 1 },
        ]
      : []),
    ...(on("rating") ? [{ t: '"aggregateRating": { "ratingValue": 4.6,', d: 1, f: "rating" as Field }, { t: '"reviewCount": 812 }', d: 2, f: "rating" as Field }] : []),
    { t: "}", d: 0 },
  ];
  return (
    <div>
      <Frame
        width={560}
        height={276}
        label={`A JSON-LD Product block declaring ${fields.length ? fields.join(", ") : "only name and brand"}, and the search result built from it${on("offer") ? ", showing $349" : ""}${on("stock") ? ", in stock" : ""}${on("rating") ? ", 4.6 stars from 812 reviews" : ""}. Below, a merchant feed sends the catalogue to a search engine, a social platform and an AI agent.`}
      >
        <HalftoneDefs id={id} />
        {/* JSON-LD block */}
        <rect x={10} y={10} width={292} height={200} fill={CAT.tile} {...ink} />
        <text x={20} y={28} fontFamily={BODY_FONT} fontSize={10} fill={CAT.ink}>
          {'<script type="application/ld+json">'}
        </text>
        {lines.map((l, k) => (
          <text key={k} x={20 + l.d * 12} y={46 + k * 14} fontFamily={BODY_FONT} fontSize={10.5} fontWeight={l.f ? 600 : 400} fill={CAT.ink}>
            {l.t}
          </text>
        ))}
        {/* search result */}
        <rect x={318} y={10} width={232} height={120} fill={CAT.tile} {...ink} />
        <text x={330} y={32} fontFamily={BODY_FONT} fontSize={9.5} fill={CAT.ink}>
          corva.com › espresso
        </text>
        <text x={330} y={52} fontFamily="var(--font-heading)" fontSize={14} fill={CAT.ink}>
          Barista One espresso machine
        </text>
        <line x1={330} y1={64} x2={530} y2={64} {...hair} />
        <line x1={330} y1={71} x2={500} y2={71} {...hair} />
        {(() => {
          let x = 330;
          const items: React.ReactNode[] = [];
          if (on("rating")) {
            items.push(
              <g key="r">
                <rect x={x - 4} y={84} width={112} height={20} fill={CAT.amber} stroke={CAT.ink} strokeWidth={0.6} />
                {[0, 1, 2, 3, 4].map((j) => (
                  <Star key={j} cx={x + 6 + j * 11} cy={94} r={4.2} on={j < 4} />
                ))}
                <Price x={x + 62} y={98} size={11}>
                  4.6 (812)
                </Price>
              </g>,
            );
            x += 116;
          }
          if (on("offer")) {
            items.push(
              <g key="o">
                <rect x={x - 4} y={84} width={44} height={20} fill={CAT.amber} stroke={CAT.ink} strokeWidth={0.6} />
                <Price x={x + 2} y={99} size={13}>
                  $349
                </Price>
              </g>,
            );
            x += 48;
          }
          if (on("stock")) {
            items.push(
              <g key="s">
                <rect x={x - 4} y={84} width={62} height={20} fill={CAT.amber} stroke={CAT.ink} strokeWidth={0.6} />
                <CatKey x={x + 2} y={98} size={9}>
                  IN STOCK
                </CatKey>
              </g>,
            );
          }
          return items;
        })()}
        <Arrow x1={306} y1={70} x2={314} y2={70} s={4} />
        {/* merchant feed */}
        <rect x={318} y={150} width={60} height={70} fill={CAT.tile} {...ink} />
        <text x={326} y={168} fontFamily={BODY_FONT} fontSize={9} fill={CAT.ink}>
          {"<feed>"}
        </text>
        {[0, 1, 2, 3].map((k) => (
          <line key={k} x1={326} y1={180 + k * 9} x2={k % 2 ? 360 : 370} y2={180 + k * 9} {...hair} />
        ))}
        {[154, 202, 252].map((y, k) => (
          <g key={y}>
            <Arrow x1={386} y1={185} x2={440} y2={y + 6} s={5} />
            {k === 0 ? (
              <g>
                <circle cx={464} cy={y + 4} r={11} fill="none" stroke={CAT.ink} strokeWidth={LINE.bold} />
                <line x1={472} y1={y + 12} x2={480} y2={y + 20} stroke={CAT.ink} strokeWidth={3} strokeLinecap="round" />
              </g>
            ) : k === 1 ? (
              <g>
                <rect x={454} y={y - 8} width={22} height={36} rx={3} fill={ht(id, "dense")} {...ink} />
                <path d={`M461 ${y + 2}L470 ${y + 8}L461 ${y + 14}Z`} fill={CAT.tile} {...ink} />
              </g>
            ) : (
              <Agent id={id} cx={466} cy={y + 8} s={0.7} />
            )}
          </g>
        ))}
        <CatKey x={318} y={238} size={10}>
          MERCHANT FEED
        </CatKey>
      </Frame>
      <Toggles<Field>
        label="Declare in JSON-LD"
        value={fields}
        onChange={setFields}
        options={[
          { id: "offer", label: "Price" },
          { id: "stock", label: "Stock status" },
          { id: "rating", label: "Rating" },
          { id: "gtin", label: "GTIN" },
        ]}
      />
    </div>
  );
}

/**
 * Twenty sessions as rows of a log, each mark one micro-conversion reached,
 * the last column the paid order. Under each gap, the transition rate from
 * the step before. Switch the week: a blurry new thumbnail set cuts the
 * category-to-product rate, a shipping fee shown only at payment cuts the
 * cart-to-order rate; the weakest rate is marked in amber.
 */
type Week = "normal" | "thumbs" | "fees";
const STEPS = ["CATEGORY", "PRODUCT PAGE", "SIZE", "ADD TO CART", "ORDER"];
const REACH: Record<Week, number[]> = {
  normal: [20, 14, 11, 8, 5],
  thumbs: [20, 6, 5, 4, 2],
  fees: [20, 14, 11, 8, 1],
};
/** A fixed shuffle of the twenty sessions, so the rows read as a real log. */
const ORDER = [7, 2, 15, 0, 11, 4, 18, 9, 1, 13, 5, 16, 3, 10, 19, 6, 12, 8, 17, 14];

export function SessionLog() {
  const [week, setWeek] = useState<Week>("normal");
  const id = "w2-log";
  const reach = REACH[week];
  const rates = reach.slice(1).map((r, k) => Math.round((100 * r) / reach[k]));
  const worst = rates.indexOf(Math.min(...rates));
  const cx = (k: number) => 150 + k * 96;
  return (
    <div>
      <Frame
        width={560}
        height={300}
        label={`A log of 20 sessions across five steps: category, product page, size, add to cart, order. Sessions reaching each: ${reach.join(", ")}. Transition rates: ${rates.map((r) => `${r}%`).join(", ")}; the weakest, ${rates[worst]}% into ${STEPS[worst + 1].toLowerCase()}, in amber. Overall conversion ${Math.round((100 * reach[4]) / 20)}%.`}
      >
        <HalftoneDefs id={id} />
        {STEPS.map((s, k) => (
          <CatKey key={s} x={cx(k)} y={18} anchor="middle" size={10}>
            {s}
          </CatKey>
        ))}
        {ORDER.map((sess, row) => {
          const y = 30 + row * 10.5;
          return (
            <g key={sess}>
              <line x1={104} y1={y + 4} x2={cx(4) + 30} y2={y + 4} stroke={CAT.ink} strokeWidth={0.25} />
              {STEPS.map((_, k) => {
                const on = sess < reach[k];
                return on ? (
                  k === 4 ? (
                    <rect key={k} x={cx(k) - 5} y={y} width={10} height={8} fill={CAT.ink} />
                  ) : (
                    <circle key={k} cx={cx(k)} cy={y + 4} r={3.4} fill={CAT.ink} />
                  )
                ) : null;
              })}
            </g>
          );
        })}
        <CatKey x={14} y={36} size={10}>
          SESSION LOG
        </CatKey>
        <CatKey x={14} y={50} size={10}>
          20 VISITS
        </CatKey>
        <line x1={104} y1={244.5} x2={cx(4) + 30} y2={244.5} {...hair} />
        {rates.map((r, k) => {
          const mx = (cx(k) + cx(k + 1)) / 2;
          const bad = k === worst;
          return (
            <g key={k}>
              {bad ? <rect x={mx - 28} y={252} width={56} height={26} fill={CAT.amber} stroke={CAT.ink} strokeWidth={0.8} /> : null}
              <Price x={mx} y={271} size={15} anchor="middle">
                {`${r}%`}
              </Price>
            </g>
          );
        })}
        <CatKey x={14} y={270} size={10}>
          STEP RATE
        </CatKey>
        <CatKey x={546} y={296} anchor="end" size={10}>
          {`OVERALL CONVERSION ${Math.round((100 * reach[4]) / 20)}%`}
        </CatKey>
      </Frame>
      <Segmented<Week>
        label="Week"
        value={week}
        onChange={setWeek}
        options={[
          { id: "normal", label: "Normal week" },
          { id: "thumbs", label: "Blurry new thumbnails" },
          { id: "fees", label: "Shipping fee at payment" },
        ]}
      />
    </div>
  );
}

/**
 * The shop floor on the left and its online counterpart on the right, row by
 * row. The hanging aisle sign becomes the category menu, the endcap display
 * becomes the featured row of tiles, and the associate answering a shopper
 * becomes the page's structured answers: spec rows and questions.
 */
export function StoreToPage() {
  const id = "w2-store";
  const rows = [42, 108, 178];
  return (
    <Frame
      width={800}
      height={222}
      label="Left, a shop floor: a tall aisle shelf of mugs, a hanging aisle sign, an endcap display of stacked mugs with a price tag, and a sales associate answering a shopper. Right, an online catalogue page: a category menu marked information architecture, a featured row of tiles marked interface layout, and a panel of spec rows and questions marked structured data. Arrows join each shop element to its online counterpart."
    >
      <HalftoneDefs id={id} />
      {/* aisle shelf */}
      <rect x={14} y={14} width={86} height={196} fill={CAT.tile} {...ink} />
      {[0, 1, 2, 3].map((k) => (
        <g key={k}>
          <line x1={14} y1={58 + k * 48} x2={100} y2={58 + k * 48} {...ink} />
          {[0, 1, 2].map((j) => (
            <Mug key={j} id={id} cx={30 + j * 27} cy={44 + k * 48} scale={0.48} />
          ))}
        </g>
      ))}
      {/* hanging sign */}
      <line x1={150} y1={4} x2={150} y2={20} {...hair} />
      <line x1={226} y1={4} x2={226} y2={20} {...hair} />
      <rect x={136} y={20} width={104} height={28} fill={CAT.ink} />
      <line x1={150} y1={31} x2={226} y2={31} stroke={CAT.tile} strokeWidth={1.6} />
      <line x1={150} y1={38} x2={204} y2={38} stroke={CAT.tile} strokeWidth={1.6} />
      {/* endcap */}
      <path d="M128 132H252L244 92H136Z" fill={CAT.tile} {...ink} />
      <rect x={128} y={132} width={124} height={8} fill={ht(id, "dense")} {...ink} />
      {[0, 1, 2].map((j) => (
        <Mug key={j} id={id} cx={160 + j * 28} cy={80} scale={0.55} />
      ))}
      <Mug id={id} cx={174} cy={63.5} scale={0.55} />
      <Mug id={id} cx={202} cy={63.5} scale={0.55} />
      <path d="M250 98H282L290 106L282 114H250Z" fill={CAT.tile} {...ink} />
      <Price x={254} y={110} size={10}>
        $14
      </Price>
      {/* associate and shopper */}
      <Person id={id} cx={150} cy={190} s={0.72} />
      <Person id={id} cx={236} cy={190} s={0.72} />
      <path d="M164 152H222Q228 152 228 158V166Q228 172 222 172H180L172 180V172H164Q158 172 158 166V158Q158 152 164 152Z" fill={CAT.tile} {...ink} />
      <line x1={168} y1={160} x2={216} y2={160} {...hair} />
      <line x1={168} y1={166} x2={204} y2={166} {...hair} />
      {/* links */}
      {rows.map((y, k) => (
        <Arrow key={y} x1={k === 1 ? 298 : k === 0 ? 248 : 262} y1={k === 0 ? 34 : y + (k === 1 ? -2 : 0)} x2={418} y2={k === 0 ? 41 : y} s={6} />
      ))}
      {/* the online page */}
      <rect x={426} y={14} width={232} height={196} fill={CAT.tile} {...ink} />
      <rect x={429} y={17} width={226} height={190} fill="none" stroke={CAT.ink} strokeWidth={0.45} />
      {[0, 1, 2, 3].map((k) => (
        <g key={k}>
          <rect x={438 + k * 53} y={30} width={48} height={22} fill={k === 1 ? CAT.ink : CAT.tile} {...hair} />
          <line x1={446 + k * 53} y1={41} x2={478 + k * 53} y2={41} stroke={k === 1 ? CAT.tile : CAT.ink} strokeWidth={k === 1 ? 1.2 : 0.5} />
        </g>
      ))}
      {[0, 1, 2].map((k) => (
        <g key={k}>
          <Tile x={438 + k * 72} y={70} w={64} h={58} />
          <Mug id={id} cx={470 + k * 72} cy={94} scale={0.62} />
          <line x1={446 + k * 72} y1={116} x2={482 + k * 72} y2={116} {...hair} />
        </g>
      ))}
      <rect x={438} y={140} width={208} height={60} fill={CAT.tile} {...hair} />
      {[0, 1, 2].map((k) => (
        <g key={k}>
          <line x1={446} y1={154 + k * 15} x2={500} y2={154 + k * 15} {...hair} />
          <line x1={520} y1={154 + k * 15} x2={560} y2={154 + k * 15} {...hair} />
          {k < 2 ? <line x1={442} y1={161 + k * 15} x2={642} y2={161 + k * 15} stroke={CAT.ink} strokeWidth={0.3} /> : null}
        </g>
      ))}
      <path d="M586 178H632Q636 178 636 182V190Q636 194 632 194H600L594 199V194H586Q582 194 582 190V182Q582 178 586 178Z" fill={CAT.tile} {...ink} />
      <line x1={590} y1={186} x2={626} y2={186} {...hair} />
      <CatKey x={672} y={rows[0] + 4} size={10}>
        INFORMATION
      </CatKey>
      <CatKey x={672} y={rows[0] + 17} size={10}>
        ARCHITECTURE
      </CatKey>
      <CatKey x={672} y={rows[1] + 4} size={10}>
        INTERFACE
      </CatKey>
      <CatKey x={672} y={rows[1] + 17} size={10}>
        LAYOUT
      </CatKey>
      <CatKey x={672} y={rows[2] + 4} size={10}>
        STRUCTURED
      </CatKey>
      <CatKey x={672} y={rows[2] + 17} size={10}>
        DATA
      </CatKey>
    </Frame>
  );
}

/**
 * The three templates in order: a listing page full of candidates, the
 * product detail page of the one chosen, and the cart holding it. A cursor
 * moves the shopper from each to the next.
 */
export function ThreeTemplates() {
  const id = "w2-templates";
  const page = (x: number) => (
    <g>
      <rect x={x} y={10} width={210} height={150} fill={CAT.tile} {...ink} />
      <rect x={x + 3} y={13} width={204} height={144} fill="none" stroke={CAT.ink} strokeWidth={0.45} />
    </g>
  );
  return (
    <Frame
      width={800}
      height={192}
      label="Three catalogue pages joined by arrows: a listing page with a filter column and a grid of twelve mug tiles, one clicked; a product detail page with a large mug, price and add-to-cart button, clicked; a shopping cart with the mug as a line item, a total and a checkout button."
    >
      <HalftoneDefs id={id} />
      {/* listing page */}
      {page(10)}
      {[0, 1, 2, 3, 4].map((k) => (
        <g key={k}>
          <rect x={22} y={28 + k * 22} width={8} height={8} fill={k % 2 ? CAT.ink : CAT.tile} {...hair} />
          <line x1={34} y1={32 + k * 22} x2={56} y2={32 + k * 22} {...hair} />
        </g>
      ))}
      {Array.from({ length: 12 }, (_, k) => {
        const x = 66 + (k % 4) * 37;
        const y = 24 + Math.floor(k / 4) * 44;
        return (
          <g key={k}>
            <rect x={x} y={y} width={33} height={40} fill={CAT.tile} {...hair} />
            <Mug id={id} cx={x + 16} cy={y + 16} scale={0.42} />
            <line x1={x + 5} y1={y + 32} x2={x + 25} y2={y + 32} {...hair} />
          </g>
        );
      })}
      <Cursor x={128} y={84} scale={1.1} />
      <Arrow x1={228} y1={85} x2={290} y2={85} s={7} />
      {/* product detail page */}
      {page(298)}
      <rect x={312} y={24} width={96} height={104} fill={CAT.tile} {...hair} />
      <Mug id={id} cx={358} cy={76} scale={1.6} />
      <line x1={420} y1={34} x2={492} y2={34} {...ink} />
      <line x1={420} y1={42} x2={478} y2={42} {...hair} />
      {[0, 1, 2, 3, 4].map((k) => (
        <Star key={k} cx={424 + k * 10} cy={56} r={3.8} />
      ))}
      <Price x={420} y={82} size={18}>
        $14
      </Price>
      <rect x={420} y={98} width={74} height={22} fill={CAT.ink} />
      <CatKey x={457} y={112} anchor="middle" size={8} fill={CAT.tile}>
        ADD TO CART
      </CatKey>
      <line x1={312} y1={140} x2={494} y2={140} {...hair} />
      <line x1={312} y1={147} x2={460} y2={147} {...hair} />
      <Cursor x={482} y={114} scale={1.1} />
      <Arrow x1={516} y1={85} x2={578} y2={85} s={7} />
      {/* cart */}
      {page(586)}
      <rect x={600} y={26} width={36} height={34} fill={CAT.tile} {...hair} />
      <Mug id={id} cx={618} cy={43} scale={0.55} />
      <line x1={646} y1={36} x2={706} y2={36} {...hair} />
      <line x1={646} y1={44} x2={690} y2={44} {...hair} />
      <Price x={782} y={48} size={13} anchor="end">
        $14
      </Price>
      <line x1={600} y1={74.5} x2={782} y2={74.5} {...hair} />
      <line x1={600} y1={92} x2={650} y2={92} {...hair} />
      <Price x={782} y={97} size={13} anchor="end">
        $14
      </Price>
      <line x1={600} y1={106.5} x2={782} y2={106.5} {...ink} />
      <rect x={680} y={118} width={102} height={24} fill={CAT.ink} />
      <CatKey x={731} y={134} anchor="middle" size={9} fill={CAT.tile}>
        CHECKOUT
      </CatKey>
      {[
        [115, "LISTING PAGE"],
        [403, "PRODUCT DETAIL PAGE"],
        [691, "SHOPPING CART"],
      ].map(([x, k]) => (
        <CatKey key={k as string} x={x as number} y={184} anchor="middle" size={11}>
          {k}
        </CatKey>
      ))}
    </Frame>
  );
}

/**
 * A hundred shoppers face the same plan page set out three ways. Twenty
 * near-identical variants: most walk away. Basic and Pro: more choose,
 * mostly Basic. Add the $60 Enterprise tier: few buy it, but Pro (amber)
 * now looks balanced and becomes the favourite. Each cursor is two shoppers.
 */
type Menu = "twenty" | "two" | "three";
const MENUS: Record<Menu, { tiers: { name: string; price: number; n: number }[]; left: number }> = {
  twenty: { tiers: Array.from({ length: 20 }, (_, k) => ({ name: `V${k + 1}`, price: 14 + (k % 5), n: k % 4 === 0 ? 4 : k % 2 ? 2 : 0 })), left: 60 },
  two: { tiers: [{ name: "Basic", price: 10, n: 40 }, { name: "Pro", price: 25, n: 24 }], left: 36 },
  three: {
    tiers: [
      { name: "Basic", price: 10, n: 28 },
      { name: "Pro", price: 25, n: 42 },
      { name: "Enterprise", price: 60, n: 6 },
    ],
    left: 24,
  },
};

export function TierFraming() {
  const [menu, setMenu] = useState<Menu>("two");
  const id = "w2-tiers";
  const m = MENUS[menu];
  const many = menu === "twenty";
  const cardW = many ? 18 : 96;
  const gap = many ? 2.2 : 14;
  const chosen = 100 - m.left;
  return (
    <div>
      <Frame
        width={560}
        height={300}
        label={`A plan page shown as ${menu === "twenty" ? "twenty near-identical variants" : menu === "two" ? "Basic and Pro tiers" : "Basic, Pro and Enterprise tiers"}. Of 100 shoppers, ${chosen} choose a plan${many ? "" : `: ${m.tiers.map((t) => `${t.name} ${t.n}`).join(", ")}`}; ${m.left} walk away.`}
      >
        <HalftoneDefs id={id} />
        {m.tiers.map((t, k) => {
          const x = r2(14 + k * (cardW + gap));
          const pro = t.name === "Pro" && menu === "three";
          const cursors = Math.round(t.n / 2);
          const cols = many ? 1 : 4;
          return (
            <g key={t.name}>
              {Array.from({ length: cursors }, (_, j) => (
                <Cursor key={j} x={r2(x + (many ? 5 : 24 + (j % cols) * 15))} y={r2(186 - Math.floor(j / cols) * (many ? 17 : 19))} scale={many ? 0.85 : 1} tone={pro ? "amber" : "ink"} />
              ))}
              <rect x={x} y={214} width={cardW} height={many ? 44 : 60} fill={CAT.tile} stroke={CAT.ink} strokeWidth={pro ? LINE.bold : 0.8} />
              {many ? (
                <rect x={x + 4} y={222} width={cardW - 8} height={6} fill={ht(id, "light")} />
              ) : (
                <g>
                  <text x={x + 10} y={234} fontFamily={BODY_FONT} fontSize={12} fill={CAT.ink}>
                    {t.name}
                  </text>
                  <Price x={x + 10} y={260} size={17}>
                    {`$${t.price}`}
                  </Price>
                </g>
              )}
              {!many ? (
                <Price x={x + cardW - 8} y={260} size={13} anchor="end" fill={pro ? CAT.amberText : CAT.ink}>
                  {t.n}
                </Price>
              ) : null}
            </g>
          );
        })}
        {/* walked away */}
        <line x1={434.5} y1={20} x2={434.5} y2={280} {...hair} />
        {Array.from({ length: Math.round(m.left / 2) }, (_, j) => (
          <path key={j} transform={`translate(${r2(446 + (j % 6) * 16)} ${r2(254 - Math.floor(j / 6) * 20)})`} d="M0 0V13L3.5 9.8L6 15L8 14L5.6 9H10Z" fill="none" stroke={CAT.ink} strokeWidth={0.8} strokeDasharray="2 1.5" strokeLinejoin="round" />
        ))}
        <CatKey x={446} y={34} size={10}>
          WALKED AWAY
        </CatKey>
        <Price x={546} y={56} size={18} anchor="end">
          {m.left}
        </Price>
        <CatKey x={14} y={34} size={10}>
          CHOSE A PLAN
        </CatKey>
        <Price x={14} y={58} size={18}>
          {chosen}
        </Price>
      </Frame>
      <Segmented<Menu>
        label="Page shows"
        value={menu}
        onChange={setMenu}
        options={[
          { id: "twenty", label: "Twenty variants" },
          { id: "two", label: "Basic + Pro" },
          { id: "three", label: "Basic + Pro + Enterprise" },
        ]}
      />
    </div>
  );
}

/**
 * The dark-pattern variant against the honest control, month by month,
 * per thousand visitors. Above the line: extra orders won (ink parcels);
 * below: extra returns and chargebacks (amber), and lost orders once trust
 * wears off (dashed). Slide the months on: the A/B test's first month looks
 * like a win; the ledger turns against it.
 */
function trustMonth(m: number) {
  const lift = Math.round(8 - 14 * Math.pow(m / 12, 0.8));
  const refunds = Math.round(2 + 0.6 * m);
  return { lift, refunds };
}

export function TrustLedger() {
  const [months, setMonths] = useState(6);
  const id = "w2-trust";
  const ms = Array.from({ length: months }, (_, k) => trustMonth(k + 1));
  const net = ms.reduce((a, m) => a + m.lift - m.refunds, 0);
  const cx = (k: number) => 128 + k * 22.5;
  const base = 66;
  return (
    <div>
      <Frame
        width={400}
        height={218}
        label={`The dark-pattern variant against the control over ${months} ${months === 1 ? "month" : "months"}, per thousand visitors: extra orders ${ms.map((m) => m.lift).join(", ")}; extra returns and chargebacks ${ms.map((m) => m.refunds).join(", ")}. Net: ${net >= 0 ? "+" : ""}${net} orders.`}
      >
        <HalftoneDefs id={id} />
        <line x1={118} y1={base + 0.5} x2={390} y2={base + 0.5} {...ink} />
        {ms.map((m, k) => (
          <g key={k}>
            {Array.from({ length: Math.max(0, m.lift) }, (_, j) => (
              <Parcel key={`u${j}`} id={id} x={cx(k) - 6} y={r2(base - 10 - j * 8)} w={10} h={6.5} />
            ))}
            {Array.from({ length: Math.max(0, -m.lift) }, (_, j) => (
              <rect key={`l${j}`} x={cx(k) - 6} y={r2(base + 4 + j * 8)} width={10} height={6.5} fill="none" stroke={CAT.ink} strokeWidth={0.6} strokeDasharray="2 1.5" />
            ))}
            {Array.from({ length: m.refunds }, (_, j) => (
              <Parcel key={`r${j}`} id={id} x={cx(k) - 6} y={r2(base + 7 + (Math.max(0, -m.lift) + j) * 8)} w={10} h={6.5} tone="amber" />
            ))}
            <Numeral x={cx(k)} y={212} size={11} anchor="middle">
              {k + 1}
            </Numeral>
          </g>
        ))}
        <CatKey x={14} y={52} size={10}>
          EXTRA ORDERS
        </CatKey>
        <CatKey x={14} y={88} size={10} fill={CAT.amberText}>
          RETURNS AND
        </CatKey>
        <CatKey x={14} y={101} size={10} fill={CAT.amberText}>
          CHARGEBACKS
        </CatKey>
        <CatKey x={14} y={211} size={10}>
          MONTH
        </CatKey>
        <CatKey x={390} y={22} anchor="end" size={10}>
          NET ORDERS
        </CatKey>
        <Price x={390} y={44} size={18} anchor="end" fill={net < 0 ? CAT.amberText : CAT.ink}>
          {`${net >= 0 ? "+" : ""}${net}`}
        </Price>
      </Frame>
      <Slider label="Months since launch" value={months} min={1} max={12} step={1} onChange={setMonths} />
    </div>
  );
}
