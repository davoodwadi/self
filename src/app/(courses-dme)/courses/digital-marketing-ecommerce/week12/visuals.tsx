"use client";

import React, { useState } from "react";
import { Arrow, CAT, CatKey, Frame, HalftoneDefs, LINE, Numeral, Price, Segmented, Slider, Tile, Toggles, head, headAlong, ht, r2, seeded } from "../_visuals/kit";
import { Agent, Backpack, Bottle, Cart, Coin, Cursor, Envelope, Headphones, Kettle, Mug, Padlock, Parcel, PayCard, Person, Shop, Star, Van } from "../_visuals/objects";

const ink = { stroke: CAT.ink, strokeWidth: LINE.outline, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
const hair = { stroke: CAT.ink, strokeWidth: LINE.hair, strokeLinecap: "round" as const };
const GREY = "#E9E8E4";
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";
const fmt = (n: number) => Math.round(n).toLocaleString("en-US");

/** Mono text for things printed in code: event fields, token signatures. */
function Code({ x, y, children, size = 15, fill = CAT.ink, weight = 400 }: { x: number; y: number; children: React.ReactNode; size?: number; fill?: string; weight?: number }) {
  return (
    <text x={x} y={y} fontFamily={MONO} fontSize={size} fontWeight={weight} fill={fill}>
      {children}
    </text>
  );
}

/** A tick in a ring, centred on (cx, cy). */
function Tick({ cx, cy, r = 8, fill = CAT.tile }: { cx: number; cy: number; r?: number; fill?: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={fill} {...ink} />
      <path d={`M${r2(cx - r * 0.45)} ${cy}L${r2(cx - r * 0.1)} ${r2(cy + r * 0.38)}L${r2(cx + r * 0.5)} ${r2(cy - r * 0.4)}`} fill="none" {...ink} strokeWidth={1.6} />
    </g>
  );
}

/** A cross in a ring, centred on (cx, cy). */
function Cross({ cx, cy, r = 8 }: { cx: number; cy: number; r?: number }) {
  const d = r2(r * 0.4);
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={CAT.tile} {...ink} />
      <path d={`M${cx - d} ${cy - d}L${cx + d} ${cy + d}M${cx + d} ${cy - d}L${cx - d} ${cy + d}`} fill="none" {...ink} strokeWidth={1.6} />
    </g>
  );
}

/* ---------------------------------------------------------------------------
   GDPR and dark patterns: the same cookie banner drawn two ways
   ------------------------------------------------------------------------ */

function BannerPage({ id, px }: { id: string; px: number }) {
  return (
    <g>
      <rect x={px} y={8} width={390} height={222} rx={4} fill={CAT.tile} {...ink} />
      <line x1={px} y1={26} x2={px + 390} y2={26} {...hair} />
      {[0, 1, 2].map((k) => (
        <circle key={k} cx={px + 12 + k * 10} cy={17} r={3} fill="none" {...hair} />
      ))}
      {[0, 1, 2].map((k) => (
        <g key={k}>
          <Tile x={px + 14 + k * 124} y={36} w={114} h={70} />
          <Mug id={id} cx={px + 71 + k * 124} cy={68} scale={0.85} />
        </g>
      ))}
      <rect x={px + 8} y={118} width={374} height={104} fill={CAT.tile} {...ink} strokeWidth={LINE.bold} />
      <line x1={px + 22} y1={138} x2={px + 360} y2={138} {...hair} />
      <line x1={px + 22} y1={148} x2={px + 300} y2={148} {...hair} />
    </g>
  );
}

function Button({ x, y, w, children, size = 17 }: { x: number; y: number; w: number; children: React.ReactNode; size?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={40} rx={3} fill={CAT.ink} {...ink} />
      <CatKey x={r2(x + w / 2)} y={y + 26} size={size} anchor="middle" fill={CAT.tile}>{children}</CatKey>
    </g>
  );
}

function ClickRow({ x, y, label, n, amber }: { x: number; y: number; label: string; n: number; amber?: boolean }) {
  return (
    <g>
      <CatKey x={x} y={y} size={17} fill={amber ? CAT.amberText : CAT.ink}>{label}</CatKey>
      {Array.from({ length: n }, (_, k) => (
        <Cursor key={k} x={x + 170 + k * 26} y={y - 18} scale={1.4} tone={amber ? "amber" : "ink"} />
      ))}
    </g>
  );
}

export function CookieBanners() {
  const id = "w12-banner";
  const L = 0;
  const R = 410;
  const PW = 120;
  const panel = (k: number) => L + k * (PW + 15);
  return (
    <Frame width={800} height={372} label="The same storefront cookie banner drawn two ways. On the left, Accept all is a large dark button, while rejecting non-essential cookies means clicking Settings and then working through three grey sub-menus: one click to accept, four clicks to reject. On the right, Accept all and Reject non-essential are equal buttons on the first layer: one click either way." svgProps={{ "data-plate": "cookie-banners" }}>
      <HalftoneDefs id={id} />
      <BannerPage id={id} px={L} />
      <CatKey x={L + 24} y={196} size={16}>Settings</CatKey>
      <line x1={L + 24} y1={200} x2={L + 90} y2={200} {...hair} />
      <Button x={L + 190} y={168} w={178}>Accept all</Button>
      <Arrow x1={L + 56} y1={206} x2={L + 56} y2={246} />
      {[0, 1, 2].map((k) => (
        <g key={k}>
          <rect x={panel(k)} y={250} width={PW} height={62} rx={2} fill={GREY} {...ink} />
          <line x1={panel(k) + 10} y1={264} x2={panel(k) + PW - 14} y2={264} {...hair} />
          <line x1={panel(k) + 10} y1={272} x2={panel(k) + PW - 34} y2={272} {...hair} />
          {k < 2 ? <path d={head.right(panel(k) + PW + 12, 281, 6)} fill="none" {...ink} /> : null}
        </g>
      ))}
      <CatKey x={panel(0) + 10} y={300} size={14}>More options</CatKey>
      <CatKey x={panel(1) + 10} y={300} size={14}>Advanced</CatKey>
      <CatKey x={panel(2) + 10} y={290} size={14} fill={CAT.amberText}>Reject</CatKey>
      <CatKey x={panel(2) + 10} y={305} size={14} fill={CAT.amberText}>non-essential</CatKey>

      <BannerPage id={id} px={R} />
      <Button x={R + 18} y={168} w={172}>Accept all</Button>
      <Button x={R + 200} y={168} w={172} size={15.5}>Reject non-essential</Button>

      <ClickRow x={L} y={346} label="Clicks to reject" n={4} amber />
      <ClickRow x={R} y={346} label="Clicks to reject" n={1} />
    </Frame>
  );
}

/* ---------------------------------------------------------------------------
   CMP: consent state travels with the event and gates each destination
   ------------------------------------------------------------------------ */

type Consent = "analytics" | "ads";

const LANES: { key: string; needs: Consent | null; note: string }[] = [
  { key: "Order system", needs: null, note: "Always needed" },
  { key: "Analytics", needs: "analytics", note: "Needs analytics" },
  { key: "CDP profile", needs: "ads", note: "Needs advertising" },
  { key: "Ad platforms", needs: "ads", note: "Needs advertising" },
];

function LaneGlyph({ id, k, cx, cy }: { id: string; k: number; cx: number; cy: number }) {
  if (k === 0) return <Parcel id={id} x={cx - 16} y={cy - 8} w={28} h={20} />;
  if (k === 1)
    return (
      <g>
        <line x1={cx - 18} y1={cy + 14} x2={cx + 18} y2={cy + 14} {...ink} />
        {[10, 18, 26].map((h, j) => (
          <rect key={j} x={cx - 15 + j * 11} y={cy + 14 - h} width={8} height={h} fill={ht(id, "dense")} {...ink} strokeWidth={0.8} />
        ))}
      </g>
    );
  if (k === 2)
    return (
      <g>
        <rect x={cx - 18} y={cy - 15} width={36} height={30} fill={CAT.tile} {...ink} />
        <Person id={id} cx={cx - 7} cy={cy + 1} s={0.36} />
        <line x1={cx + 2} y1={cy - 4} x2={cx + 13} y2={cy - 4} {...hair} />
        <line x1={cx + 2} y1={cy + 3} x2={cx + 11} y2={cy + 3} {...hair} />
      </g>
    );
  return (
    <g>
      <rect x={cx - 18} y={cy - 15} width={36} height={30} fill={CAT.tile} {...ink} />
      <CatKey x={cx} y={cy + 6} size={17} anchor="middle">Ad</CatKey>
    </g>
  );
}

export function ConsentRouting() {
  const [on, setOn] = useState<Consent[]>(["analytics"]);
  const id = "w12-consent";
  const ok = (n: Consent | null) => n === null || on.includes(n);
  const state = (c: Consent) => (on.includes(c) ? "granted" : "denied");
  const LY = (k: number) => 52 + k * 64;
  const GX = 300;
  const reached = LANES.filter((l) => ok(l.needs)).map((l) => l.key);
  return (
    <div>
      <Frame width={800} height={284} label={`A purchase event carries the visitor's consent state: analytics ${state("analytics")}, advertising ${state("ads")}. The CMP lets it reach ${reached.join(", ")} and blocks the rest.`} svgProps={{ "data-plate": "consent-routing" }}>
        <HalftoneDefs id={id} />
        <rect x={6} y={40} width={250} height={200} fill={CAT.tile} {...ink} />
        <Code x={20} y={72} size={17} weight={600}>event: purchase</Code>
        <Code x={20} y={100} size={17}>value: 150</Code>
        <Code x={20} y={136} size={17}>consent:</Code>
        <Code x={40} y={164} size={17}>analytics:</Code>
        <Code x={150} y={164} size={17} weight={600} fill={on.includes("analytics") ? CAT.ink : CAT.amberText}>{state("analytics")}</Code>
        <Code x={40} y={192} size={17}>ads:</Code>
        <Code x={150} y={192} size={17} weight={600} fill={on.includes("ads") ? CAT.ink : CAT.amberText}>{state("ads")}</Code>
        <Arrow x1={258} y1={140} x2={GX - 4} y2={140} />
        <rect x={GX} y={24} width={40} height={250} fill={CAT.tile} {...ink} />
        <rect x={GX + 3} y={27} width={34} height={244} fill="none" stroke={CAT.ink} strokeWidth={0.45} />
        <CatKey x={GX + 20} y={17} size={17} anchor="middle">CMP</CatKey>
        {LANES.map((l, k) => {
          const y = LY(k);
          const pass = ok(l.needs);
          return (
            <g key={l.key}>
              <CatKey x={352} y={y - 9} size={17}>{l.note}</CatKey>
              {pass ? (
                <Arrow x1={GX + 44} y1={y} x2={588} y2={y} />
              ) : (
                <g>
                  <line x1={GX + 44} y1={y} x2={508} y2={y} {...ink} />
                  <rect x={510} y={y - 13} width={9} height={26} fill={CAT.amber} {...ink} />
                  <CatKey x={528} y={y + 6} size={16} fill={CAT.amberText}>Blocked</CatKey>
                </g>
              )}
              <LaneGlyph id={id} k={k} cx={622} cy={y} />
              <CatKey x={654} y={y + 6} size={17}>{l.key}</CatKey>
            </g>
          );
        })}
      </Frame>
      <Toggles label="Visitor consents to" options={[{ id: "analytics", label: "Analytics" }, { id: "ads", label: "Advertising" }]} value={on} onChange={setOn} />
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Data minimization: purging inactive records caps what a breach exposes
   ------------------------------------------------------------------------ */

const MONTHS = 36;

export function RetentionPurge() {
  const [keep, setKeep] = useState(12);
  const id = "w12-retention";
  const X = (m: number) => r2(46 + (m - 1) * 20.4);
  const BASE = 290;
  const STEP = 5.6;
  const held = Math.min(MONTHS, keep);
  const purged = MONTHS - held;
  return (
    <div>
      <Frame width={800} height={330} label={`A store gains 1,000 new customers a month. Purging inactive records after ${keep} months, it holds ${fmt(held * 1000)} personal records in month 36, all exposed in a breach, and has purged ${fmt(purged * 1000)}.`} svgProps={{ "data-plate": "retention-purge" }}>
        <HalftoneDefs id={id} />
        <CatKey x={8} y={24} size={18}>Records held in month 36</CatKey>
        <Price x={330} y={24} size={20} fill={CAT.amberText}>{fmt(held * 1000)}</Price>
        <CatKey x={8} y={52} size={18}>Purged after purpose expired</CatKey>
        <Price x={330} y={52} size={20}>{fmt(purged * 1000)}</Price>
        {Array.from({ length: MONTHS }, (_, i) => {
          const m = i + 1;
          const kept = Math.min(m, keep);
          const last = m === MONTHS;
          return (
            <g key={m}>
              {Array.from({ length: m }, (_, k) => {
                const y = r2(BASE - (k + 1) * STEP);
                const isHeld = k < kept;
                return (
                  <rect
                    key={k}
                    x={X(m)}
                    y={y}
                    width={15}
                    height={4.4}
                    fill={isHeld ? (last ? CAT.amber : CAT.tile) : "none"}
                    stroke={CAT.ink}
                    strokeWidth={isHeld ? 0.8 : 0.45}
                    strokeDasharray={isHeld ? undefined : "1.5 1.5"}
                  />
                );
              })}
            </g>
          );
        })}
        <line x1={40} y1={BASE + 2} x2={792} y2={BASE + 2} {...ink} />
        {[1, 12, 24, 36].map((m) => (
          <CatKey key={m} x={m === MONTHS ? X(m) + 15 : r2(X(m) + 7.5)} y={BASE + 26} size={17} anchor={m === MONTHS ? "end" : "middle"}>{`Month ${m}`}</CatKey>
        ))}
      </Frame>
      <Slider label="Purge inactive records after" min={3} max={36} step={3} value={keep} onChange={setKeep} formatValue={(v) => `${v} months`} />
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Seller data appropriation and self-preferencing over a year
   ------------------------------------------------------------------------ */

const LAUNCH = 7;

function stack(id: string, x: number, base: number, n: number, tone: "ink" | "amber") {
  return Array.from({ length: n }, (_, k) => <Parcel key={k} id={id} x={x} y={r2(base - (k + 1) * 11)} w={15} h={9} tone={tone} />);
}

export function ReplicaLaunch() {
  const id = "w12-replica";
  const X = (m: number) => r2(214 + (m - 1) * 44);
  const ROWS = [
    { key: ["Self-preferencing", "with seller data"], base: 264, replica: true },
    { key: ["Gatekeeper", "rules"], base: 420, replica: false },
  ];
  return (
    <Frame width={800} height={456} label="An independent seller's backpack sells 8 parcels a month. Where the platform reads the seller's sales data, it launches a cheaper replica in month 7 and ranks it first: the replica sells 6 a month and the seller's sales fall to 3, down 63 percent. Under gatekeeper rules the seller's data are closed to the platform and the seller keeps selling 8 a month." svgProps={{ "data-plate": "replica-launch" }}>
      <HalftoneDefs id={id} />
      <Tile x={214} y={6} w={104} h={100} />
      <Backpack id={id} cx={266} cy={50} />
      <Price x={226} y={96} size={16}>$48</Price>
      <Arrow x1={326} y1={56} x2={372} y2={56} />
      <Tile x={380} y={6} w={104} h={100} />
      <Backpack id={id} cx={432} cy={50} amber />
      <Price x={392} y={96} size={16}>$39</Price>
      <g transform="translate(466 24)">
        <circle cx={0} cy={0} r={10} fill={CAT.tile} {...ink} />
        <Star cx={0} cy={0} r={6.2} />
      </g>
      <CatKey x={510} y={50} size={16}>Seller&apos;s original and the</CatKey>
      <CatKey x={510} y={70} size={16}>platform&apos;s private-label replica</CatKey>
      {ROWS.map((row) => (
        <g key={row.key[0]}>
          <CatKey x={8} y={row.base - 66} size={17}>{row.key[0]}</CatKey>
          <CatKey x={8} y={row.base - 46} size={17}>{row.key[1]}</CatKey>
          <Price x={8} y={row.base - 12} size={17} fill={row.replica ? CAT.amberText : CAT.ink}>{row.replica ? "Seller −63%" : "Seller unchanged"}</Price>
          <line x1={X(1) - 4} y1={row.base - 104} x2={X(6) + 30} y2={row.base - 104} {...hair} />
          <line x1={X(1) - 4} y1={row.base - 104} x2={X(1) - 4} y2={row.base - 98} {...hair} />
          <line x1={X(6) + 30} y1={row.base - 104} x2={X(6) + 30} y2={row.base - 98} {...hair} />
          {row.replica ? (
            <CatKey x={X(1)} y={row.base - 110} size={15}>Platform reads seller&apos;s sales data</CatKey>
          ) : (
            <g>
              <Padlock cx={X(1) + 6} cy={row.base - 122} shut />
              <CatKey x={X(1) + 22} y={row.base - 110} size={15}>Seller&apos;s data closed to the platform</CatKey>
            </g>
          )}
          {row.replica ? (
            <g>
              <line x1={X(LAUNCH) - 8} y1={row.base - 140} x2={X(LAUNCH) - 8} y2={row.base + 2} stroke={CAT.ink} strokeWidth={LINE.hair} strokeDasharray="2 2" />
              <CatKey x={X(LAUNCH) - 2} y={row.base - 128} size={15} fill={CAT.amberText}>Replica launched</CatKey>
              <CatKey x={X(LAUNCH) - 2} y={row.base - 110} size={15} fill={CAT.amberText}>and ranked first</CatKey>
            </g>
          ) : null}
          {Array.from({ length: 12 }, (_, i) => {
            const m = i + 1;
            const after = row.replica && m >= LAUNCH;
            return (
              <g key={m}>
                {stack(id, X(m), row.base, after ? 3 : 8, "ink")}
                {after ? stack(id, X(m) + 20, row.base, 6, "amber") : null}
              </g>
            );
          })}
          <line x1={X(1) - 6} y1={row.base + 2} x2={792} y2={row.base + 2} {...ink} />
        </g>
      ))}
      {Array.from({ length: 12 }, (_, i) => (
        <Numeral key={i} x={X(i + 1) + 8} y={448} size={15} anchor="middle">{i + 1}</Numeral>
      ))}
      <CatKey x={8} y={448} size={16}>Month</CatKey>
    </Frame>
  );
}

/* ---------------------------------------------------------------------------
   Anti-bot firewalls versus delegation tokens at the checkout
   ------------------------------------------------------------------------ */

function Token({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <rect x={cx - 6} y={cy - 4} width={12} height={8} rx={1.5} fill={CAT.amber} {...ink} strokeWidth={0.8} />
      <circle cx={cx - 2} cy={cy} r={1.3} fill={CAT.ink} />
    </g>
  );
}

export function AgentGate() {
  const [mode, setMode] = useState<"firewall" | "token">("firewall");
  const [strict, setStrict] = useState(40);
  const id = "w12-gate";
  const tokens = mode === "token";
  const blockedOf = (bot: boolean) => (tokens ? (bot ? 20 : 0) : Math.round((strict / 100) * 20));
  const WALL = 452;
  const ROWS = [
    { bot: false, key: ["Customers'", "shopping assistants"], y: 92 },
    { bot: true, key: ["Credential-", "stuffing bots"], y: 206 },
  ];
  const place = (k: number, blocked: boolean, y: number) => {
    const col = k % 10;
    const row = Math.floor(k / 10);
    return { cx: blocked ? r2(WALL - 18 - col * 26) : r2(WALL + 48 + col * 26), cy: y + row * 34 };
  };
  const through = (bot: boolean) => 20 - blockedOf(bot);
  return (
    <div>
      <Frame width={800} height={282} label={tokens ? "With delegation tokens checked at the checkout, all 20 customers' shopping assistants carry a token and reach checkout, and all 20 credential-stuffing bots are blocked." : `An anti-bot firewall at ${strict}% strictness cannot tell the two kinds of bot apart: it blocks ${blockedOf(false)} of 20 customers' shopping assistants and ${blockedOf(true)} of 20 credential-stuffing bots.`} svgProps={{ "data-plate": "agent-gate" }}>
        <HalftoneDefs id={id} />
        <CatKey x={r2((180 + WALL) / 2)} y={28} size={17} anchor="middle">Blocked</CatKey>
        <CatKey x={r2(WALL + 30 + 135)} y={28} size={17} anchor="middle">Reached checkout</CatKey>
        <rect x={WALL} y={40} width={22} height={232} fill={CAT.tile} {...ink} />
        {Array.from({ length: 14 }, (_, r) => (
          <g key={r}>
            <line x1={WALL} y1={r2(40 + (r + 1) * 16.5)} x2={WALL + 22} y2={r2(40 + (r + 1) * 16.5)} {...hair} />
            <line x1={WALL + (r % 2 ? 7 : 15)} y1={r2(40 + r * 16.5)} x2={WALL + (r % 2 ? 7 : 15)} y2={r2(40 + (r + 1) * 16.5)} {...hair} />
          </g>
        ))}
        {tokens ? <rect x={WALL + 5} y={146} width={12} height={20} fill={CAT.amber} {...ink} /> : null}
        {ROWS.map((row) => {
          const b = blockedOf(row.bot);
          return (
            <g key={row.key[0]}>
              <CatKey x={8} y={row.y - 4} size={16} fill={row.bot ? CAT.purple : CAT.ink}>{row.key[0]}</CatKey>
              <CatKey x={8} y={row.y + 16} size={16} fill={row.bot ? CAT.purple : CAT.ink}>{row.key[1]}</CatKey>
              <Price x={8} y={row.y + 44} size={16} fill={row.bot ? CAT.purple : CAT.ink}>{`${through(row.bot)} of 20 through`}</Price>
              {Array.from({ length: 20 }, (_, k) => {
                const blocked = k < b;
                const { cx, cy } = place(blocked ? k : k - b, blocked, row.y);
                return (
                  <g key={k}>
                    <Agent id={id} cx={cx} cy={cy} s={0.52} tone={row.bot ? "purple" : "ink"} />
                    {tokens && !row.bot ? <Token cx={cx + 9} cy={cy + 10} /> : null}
                  </g>
                );
              })}
            </g>
          );
        })}
      </Frame>
      <Segmented label="Checkout check" options={[{ id: "firewall", label: "Anti-bot firewall" }, { id: "token", label: "Delegation tokens" }]} value={mode} onChange={setMode} />
      {tokens ? null : <Slider label="Firewall strictness" min={0} max={100} step={10} value={strict} onChange={setStrict} formatValue={(v) => `${v}%`} />}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   A delegation token with bounded authority and three attempted orders
   ------------------------------------------------------------------------ */

function Television({ cx, cy, id }: { cx: number; cy: number; id: string }) {
  return (
    <g>
      <rect x={cx - 24} y={cy - 18} width={48} height={30} rx={2} fill={ht(id, "dense")} {...ink} />
      <rect x={cx - 20} y={cy - 14} width={40} height={22} fill={CAT.tile} {...hair} />
      <path d={`M${cx - 8} ${cy + 20}L${cx} ${cy + 12}L${cx + 8} ${cy + 20}`} fill="none" {...ink} />
    </g>
  );
}

function TowelRoll({ cx, cy, id }: { cx: number; cy: number; id: string }) {
  return (
    <g>
      <rect x={cx - 14} y={cy - 18} width={28} height={36} fill={ht(id, "light")} {...ink} />
      <ellipse cx={cx} cy={cy - 18} rx={14} ry={4.5} fill={CAT.tile} {...ink} />
      <ellipse cx={cx} cy={cy - 18} rx={4} ry={1.5} fill={CAT.ink} />
      <path d={`M${cx + 6} ${cy - 13}V${cy + 22}H${cx + 16}V${cy - 16}`} fill={CAT.tile} {...ink} />
    </g>
  );
}

const ORDERS = [
  { price: "$38", merchant: "Approved merchant", ok: true, note: "Approved" },
  { price: "$420", merchant: "Approved merchant", ok: false, note: "Over the limit" },
  { price: "$24", merchant: "Merchant not on the list", ok: false, note: "Merchant not approved" },
];

export function DelegationMandate() {
  const id = "w12-mandate";
  const OY = (k: number) => 12 + k * 98;
  return (
    <Frame width={800} height={310} label="A delegation token issued by a verified human allows an AI agent to spend up to $150 on household staples at approved merchants. The agent attempts three orders: detergent for $38 at an approved merchant is approved and paid with a single-use card, a $420 television is declined as over the limit, and $24 of paper towels from a merchant not on the list is declined." svgProps={{ "data-plate": "delegation-mandate" }}>
      <HalftoneDefs id={id} />
      <rect x={8} y={12} width={228} height={286} fill={CAT.tile} {...ink} />
      <rect x={11} y={15} width={222} height={280} fill="none" stroke={CAT.ink} strokeWidth={0.45} />
      <CatKey x={26} y={44} size={18}>Delegation token</CatKey>
      <Person id={id} cx={46} cy={92} s={0.9} />
      <Tick cx={66} cy={108} r={8} />
      <CatKey x={86} y={90} size={17}>Verified</CatKey>
      <CatKey x={86} y={110} size={17}>human principal</CatKey>
      <line x1={26} y1={132} x2={218} y2={132} {...hair} />
      <Price x={30} y={166} size={17}>Up to $150</Price>
      <CatKey x={30} y={196} size={16}>Household staples</CatKey>
      <CatKey x={30} y={224} size={16}>Approved merchants</CatKey>
      <line x1={26} y1={244} x2={218} y2={244} {...hair} />
      <Code x={30} y={274} size={16}>sig 7f3a…c91e</Code>
      <Arrow x1={240} y1={155} x2={268} y2={155} />
      <Agent id={id} cx={300} cy={160} s={1.3} />
      {ORDERS.map((o, k) => {
        const y = OY(k);
        return (
          <g key={k}>
            <line x1={330} y1={160} x2={366} y2={r2(y + 43)} {...ink} />
            <path d={headAlong(366, r2(y + 43), 36, y + 43 - 160, 6)} fill="none" {...ink} />
            <rect x={370} y={y} width={424} height={86} fill={CAT.tile} {...ink} />
            {k === 0 ? (
              <g transform={`translate(${398} ${y + 22}) scale(1.8)`}>
                <Bottle id={id} x={-7} y={0} />
              </g>
            ) : k === 1 ? (
              <Television id={id} cx={410} cy={y + 42} />
            ) : (
              <TowelRoll id={id} cx={406} cy={y + 44} />
            )}
            <Price x={440} y={y + 38} size={19}>{o.price}</Price>
            <CatKey x={440} y={y + 66} size={17}>{o.merchant}</CatKey>
            {o.ok ? <Tick cx={576} cy={y + 30} r={10} fill={CAT.amber} /> : <Cross cx={576} cy={y + 30} r={10} />}
            <CatKey x={594} y={y + 36} size={17} fill={o.ok ? CAT.amberText : CAT.ink}>{o.note}</CatKey>
            {o.ok ? (
              <g>
                <PayCard id={id} x={632} y={y + 52} w={34} h={22} fill={CAT.amber} />
                <CatKey x={672} y={y + 68} size={15.5} fill={CAT.amberText}>Single-use card</CatKey>
              </g>
            ) : null}
          </g>
        );
      })}
    </Frame>
  );
}

/* ---------------------------------------------------------------------------
   B2A: delegation moves sales to verified value unless the prompt names a brand
   ------------------------------------------------------------------------ */

const BRANDS = [
  { key: "Familiar brand", price: "$214 landed", stars: 4, battery: "20 h battery", humanShare: 0.7 },
  { key: "Better verified rival", price: "$169 landed", stars: 5, battery: "30 h battery", humanShare: 0.3 },
];

export function AgentShare() {
  const [delegated, setDelegated] = useState(20);
  const [named, setNamed] = useState(20);
  const id = "w12-share";
  const d = delegated / 100;
  const p = named / 100;
  const agentFamiliar = p + (1 - p) * 0.1;
  const sales = BRANDS.map((b, i) => {
    const human = (1 - d) * 100 * b.humanShare;
    const agent = d * 100 * (i === 0 ? agentFamiliar : 1 - agentFamiliar);
    return { human: Math.round(human), agent: Math.round(agent) };
  });
  const RY = (i: number) => 14 + i * 142;
  const PX = (k: number) => r2(262 + k * 26.5);
  const parcels = (n: number, y: number, tone: "ink" | "purple") =>
    Array.from({ length: Math.round(n / 5) }, (_, k) => <Parcel key={k} id={id} x={PX(k)} y={y} w={18} h={14} tone={tone} />);
  return (
    <div>
      <Frame width={800} height={292} label={`Of 100 headphone purchases, ${delegated}% are delegated to AI agents and ${named}% of delegation prompts name the familiar brand. The familiar brand sells ${sales[0].human + sales[0].agent} (${sales[0].agent} through agents) and the better verified rival sells ${sales[1].human + sales[1].agent} (${sales[1].agent} through agents).`} svgProps={{ "data-plate": "agent-share" }}>
        <HalftoneDefs id={id} />
        {BRANDS.map((b, i) => {
          const y = RY(i);
          const s = sales[i];
          return (
            <g key={b.key}>
              <Tile x={6} y={y} w={190} h={128} />
              <CatKey x={18} y={y + 24} size={15}>{b.key}</CatKey>
              <Headphones id={id} cx={50} cy={y + 66} s={1.15} />
              {Array.from({ length: 5 }, (_, k) => (
                <Star key={k} cx={96 + k * 16} cy={y + 52} r={6.5} on={k < b.stars} />
              ))}
              <CatKey x={88} y={y + 82} size={14}>{b.battery}</CatKey>
              <Price x={18} y={y + 114} size={16}>{b.price}</Price>
              <Person id={id} cx={228} cy={y + 32} s={0.52} />
              {parcels(s.human, y + 26, "ink")}
              <Agent id={id} cx={228} cy={y + 96} s={0.58} tone="purple" />
              {parcels(s.agent, y + 90, "purple")}
              <Price x={794} y={y + 40} size={18} anchor="end">{s.human}</Price>
              <Price x={794} y={y + 104} size={18} anchor="end" fill={CAT.purple}>{s.agent}</Price>
              <line x1={214} y1={y + 128} x2={794} y2={y + 128} {...hair} />
            </g>
          );
        })}
      </Frame>
      <Slider label="Purchases delegated to AI agents" min={0} max={100} step={5} value={delegated} onChange={setDelegated} formatValue={(v) => `${v}%`} />
      <Slider label="Prompts that name the familiar brand" min={0} max={100} step={5} value={named} onChange={setNamed} formatValue={(v) => `${v}%`} />
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Behavioral auditing: repeated sampling narrows the estimate
   ------------------------------------------------------------------------ */

const SAMPLES = [1, 2, 5, 10, 20, 50, 100, 200, 400];
const DRAWS = (() => {
  const rnd = seeded(12);
  return Array.from({ length: 400 }, () => rnd() < 0.38);
})();

function wilson(x: number, n: number) {
  const z = 1.96;
  const ph = x / n;
  const den = 1 + (z * z) / n;
  const c = (ph + (z * z) / (2 * n)) / den;
  const h = (z * Math.sqrt((ph * (1 - ph)) / n + (z * z) / (4 * n * n))) / den;
  return [Math.max(0, c - h), Math.min(1, c + h)];
}

export function AuditSampling() {
  const [idx, setIdx] = useState(3);
  const id = "w12-audit";
  const n = SAMPLES[idx];
  const yes = DRAWS.slice(0, n).filter(Boolean).length;
  const est = yes / n;
  const [lo, hi] = wilson(yes, n);
  const LX0 = 346;
  const LX1 = 778;
  const lx = (v: number) => r2(LX0 + v * (LX1 - LX0));
  const LY = 214;
  const pc = (v: number) => `${Math.round(v * 100)}%`;
  return (
    <div>
      <Frame width={800} height={296} label={n === 1 ? `One response to the shopping prompt ${yes ? "recommends" : "does not recommend"} the firm's kettle, a yes or a no with a plausible rate anywhere from ${pc(lo)} to ${pc(hi)}.` : `The same shopping prompt sent ${n} times: ${yes} responses recommend the firm's kettle, an estimated rate of ${pc(est)} with a 95% range of ${pc(lo)} to ${pc(hi)}.`} svgProps={{ "data-plate": "audit-sampling" }}>
        <HalftoneDefs id={id} />
        {DRAWS.slice(0, n).map((d, k) => (
          <rect key={k} x={r2(8 + (k % 20) * 14)} y={r2(16 + Math.floor(k / 20) * 13.6)} width={10.5} height={10.5} fill={d ? CAT.amber : CAT.tile} stroke={CAT.ink} strokeWidth={0.7} />
        ))}
        <Kettle id={id} cx={372} cy={52} s={1.25} amber />
        <CatKey x={414} y={46} size={18}>{`Recommended in ${yes} of ${n}`}</CatKey>
        <CatKey x={414} y={70} size={18}>{n === 1 ? "response" : "responses"}</CatKey>
        <Price x={lx(est)} y={LY - 46} size={20} anchor={est > 0.85 ? "end" : est < 0.1 ? "start" : "middle"}>{pc(est)}</Price>
        <line x1={LX0} y1={LY} x2={LX1} y2={LY} {...ink} />
        {[0, 0.25, 0.5, 0.75, 1].map((v) => (
          <g key={v}>
            <line x1={lx(v)} y1={LY - 5} x2={lx(v)} y2={LY + 5} {...ink} />
            <Price x={lx(v)} y={LY + 28} size={16} anchor="middle">{pc(v)}</Price>
          </g>
        ))}
        <rect x={lx(lo)} y={LY - 9} width={Math.max(2, r2(lx(hi) - lx(lo)))} height={18} fill={CAT.amber} stroke={CAT.ink} strokeWidth={0.9} />
        <circle cx={lx(est)} cy={LY} r={6} fill={CAT.ink} />
        <CatKey x={LX0} y={LY + 66} size={17}>{`95% range ${pc(lo)} to ${pc(hi)}`}</CatKey>
      </Frame>
      <Slider label="Repeated samples of the same prompt" min={0} max={SAMPLES.length - 1} value={idx} onChange={setIdx} formatValue={(v) => `${SAMPLES[v]}`} />
    </div>
  );
}

/* ---------------------------------------------------------------------------
   The twelve weeks as stacked layers
   ------------------------------------------------------------------------ */

const LAYERS: { name: string; weeks: number[] }[] = [
  { name: "Operations, Measurement, and Governance", weeks: [10, 11, 12] },
  { name: "Relationship, Trust, and Commercial Levers", weeks: [7, 8, 9] },
  { name: "Discovery and Acquisition Channels", weeks: [3, 4, 5, 6] },
  { name: "Foundation and Storefront", weeks: [1, 2] },
];

function LayerGlyphs({ id, k, y }: { id: string; k: number; y: number }) {
  const cy = y + 40;
  if (k === 0)
    return (
      <g>
        <Van id={id} x={566} y={cy - 22} />
        {[0, 1, 2].map((j) => (
          <Coin key={j} id={id} cx={696} cy={r2(cy + 12 - j * 6)} rx={16} ry={4} t={5} />
        ))}
        <Padlock cx={756} cy={cy} shut />
      </g>
    );
  if (k === 1)
    return (
      <g>
        <Envelope id={id} x={560} y={cy - 16} w={50} h={34} />
        {Array.from({ length: 5 }, (_, j) => (
          <Star key={j} cx={636 + j * 15} cy={cy} r={6.5} />
        ))}
        <path d={`M${712} ${cy - 15}H${770}L${784} ${cy}L${770} ${cy + 15}H${712}Z`} fill={CAT.tile} {...ink} />
        <circle cx={720} cy={cy} r={2.5} fill="none" {...ink} />
        <Price x={729} y={cy + 5} size={14}>−10%</Price>
      </g>
    );
  if (k === 2)
    return (
      <g>
        <Tile x={566} y={cy - 28} w={58} h={56} />
        <Mug id={id} cx={595} cy={cy - 2} scale={0.9} />
        {[0, 1, 2].map((j) => (
          <Cursor key={j} x={640 + j * 18} y={cy - 12} scale={1.3} />
        ))}
        <Agent id={id} cx={752} cy={cy + 2} s={0.75} />
      </g>
    );
  return (
    <g>
      <Shop id={id} x={566} y={cy - 26} w={72} h={50} />
      <Cart id={id} cx={690} cy={cy} s={1.6} />
      <Parcel id={id} x={738} y={cy - 6} w={28} h={20} />
    </g>
  );
}

export function TwelveWeeks() {
  const id = "w12-stack";
  const LY = (k: number) => 10 + k * 84;
  return (
    <Frame width={800} height={346} label="The integrated digital commerce system as four stacked layers: Foundation and Storefront (Weeks 1 and 2) at the base, Discovery and Acquisition Channels (Weeks 3 to 6) on it, Relationship, Trust, and Commercial Levers (Weeks 7 to 9) above, and Operations, Measurement, and Governance (Weeks 10 to 12) on top." svgProps={{ "data-plate": "twelve-weeks" }}>
      <HalftoneDefs id={id} />
      {LAYERS.map((l, k) => {
        const y = LY(k);
        return (
          <g key={l.name}>
            <Tile x={6} y={y} w={788} h={78} />
            <CatKey x={22} y={y + 46} size={17}>{l.name}</CatKey>
            {l.weeks.map((w, j) => (
              <g key={w}>
                <rect x={386 + j * 42} y={y + 21} width={36} height={36} fill={CAT.tile} {...ink} />
                <Numeral x={404 + j * 42} y={y + 46} size={17} anchor="middle">{w}</Numeral>
              </g>
            ))}
            <LayerGlyphs id={id} k={k} y={y} />
          </g>
        );
      })}
    </Frame>
  );
}
