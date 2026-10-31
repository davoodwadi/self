"use client";

import React, { useState } from "react";
import {
  CENTRE_DASH,
  FigureName,
  Frame,
  LINE,
  ObliqueBox,
  PAT,
  PatentDefs,
  PatentKey,
  Segmented,
  Slider,
  Toggles,
  r2,
  seeded,
  stip,
} from "../_visuals/kit";
import { Coins, Dial, Figure, Gear, Hall, Lens, SmallModel, Tag, headAlongPath, star } from "../_visuals/objects";

/* ==========================================================================
   WEEK 9 PLATES: PATENT DRAWING
   --------------------------------------------------------------------------
   Each plate is drawn as an invention on file: ink outlines at three weights,
   stipple tone, oblique projection (depth up and to the right), figure names
   in the body face and one examiner's red for the finding. See the course
   CLAUDE.md.

   Week cast: a pricing algorithm is the model housing with two gears
   (SmallModel). A price is a hanging tag (Tag). A shopper is a patent
   Figure. A buyer's willingness to pay is an upright bar. The platform is a
   columned hall.
   ========================================================================== */

const ink = {
  stroke: PAT.ink,
  strokeWidth: LINE.outline,
  strokeLinejoin: "round" as const,
  strokeLinecap: "round" as const,
};
const hair = {
  stroke: PAT.ink,
  strokeWidth: LINE.hair,
  strokeLinecap: "round" as const,
};
const R = PAT.signal;

/** Numerals or a quantity on a plate. */
function Num({
  x,
  y,
  children,
  size = 14,
  anchor = "middle",
  fill = PAT.ink,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  size?: number;
  anchor?: "start" | "middle" | "end";
  fill?: string;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily="var(--font-body)"
      fontSize={size}
      fill={fill}
      style={{ fontVariantNumeric: "lining-nums" }}
    >
      {children}
    </text>
  );
}

/** A short brick wall in front elevation, (x, y) its bottom-left. */
function Wall({ id, x, y, w, h, stroke = PAT.ink }: { id: string; x: number; y: number; w: number; h: number; stroke?: string }) {
  const rows = Math.round(h / 10);
  return (
    <g>
      <path d={`M${x} ${y - h}L${x + 8} ${y - h - 5}H${x + w + 8}L${x + w} ${y - h}Z`} fill={stip(id, "light")} {...ink} stroke={stroke} />
      <path d={`M${x + w} ${y - h}L${x + w + 8} ${y - h - 5}V${y - 5}L${x + w} ${y}Z`} fill={stip(id, "dense")} {...ink} stroke={stroke} />
      <rect x={x} y={y - h} width={w} height={h} fill={PAT.paper} {...ink} stroke={stroke} />
      {Array.from({ length: rows - 1 }, (_, r) => (
        <line key={r} x1={x} y1={r2(y - h + ((r + 1) * h) / rows)} x2={x + w} y2={r2(y - h + ((r + 1) * h) / rows)} {...hair} stroke={stroke} />
      ))}
      {Array.from({ length: rows }, (_, r) =>
        Array.from({ length: Math.floor(w / 16) }, (_, c) => {
          const bx = x + 8 + c * 16 + (r % 2) * 8;
          return bx < x + w - 2 ? <line key={`${r}-${c}`} x1={bx} y1={r2(y - h + (r * h) / rows)} x2={bx} y2={r2(y - h + ((r + 1) * h) / rows)} {...hair} stroke={stroke} /> : null;
        }),
      )}
    </g>
  );
}

/**
 * The six audit steps as six bench instruments, three under each row of
 * steps. First: the pricing model's inputs, with the pipe from a rival's
 * non-public data capped off (red). Price dispersion across three segments,
 * one sitting higher (red). A lens over a price tag and its struck-out
 * reference price. Second: a sandbox tray holding the forced-cut test, the
 * rival's punish-and-return path in red. Two identically rated and priced
 * listings, the platform's own ranked first (red). And the guardrails: a
 * surge gauge with a stop pin, a circuit-breaker switch and a Chinese wall.
 */
export function AuditBench({ part }: { part: "first" | "second" }) {
  const id = `w9-bench-${part}`;
  const g = 128;
  const label =
    part === "first"
      ? "Patent drawing of the first three audit instruments: the pricing model housing with its input pipes, the pipe from a rival's non-public data capped off in red. Three columns of personalized prices for three segments, the third sitting higher in red. And a lens over a price tag with its struck-out reference price."
      : "Patent drawing of the last three audit instruments: a sandbox tray holding a forced-cut test chart with the rival's punish-and-return price path in red. Two identically rated and priced listings, the platform's own ranked first in red. And the guardrails, a surge gauge with a stop pin, a circuit-breaker switch and a brick Chinese wall.";
  return (
    <Frame width={1200} height={140} label={label}>
      <PatentDefs id={id} />
      <line x1={10} y1={g} x2={1190} y2={g} {...ink} />
      {part === "first" ? (
        <g>
          {/* 1. inputs */}
          <g transform="translate(44 0)">
          <SmallModel id={id} x={190} y={52} w={76} h={76} />
          {[64, 84, 104].map((y) => (
            <g key={y}>
              <line x1={96} y1={y} x2={188} y2={y} {...ink} />
              <circle cx={96} cy={y} r={3} fill={PAT.paper} {...ink} />
            </g>
          ))}
          <Shopfront id={id} x={36} y={g} w={46} h={30} />
          <path d="M82 116H140" fill="none" stroke={R} strokeWidth={LINE.outline} strokeDasharray="5 3" />
          <rect x={140} y={109} width={8} height={14} fill={stip(id, "signal")} stroke={R} strokeWidth={LINE.outline} />
          <line x1={148} y1={116} x2={188} y2={116} {...hair} strokeDasharray="3 3" />
          </g>
          {/* 2. dispersion */}
          <g transform="translate(102 0)">
          {[0, 1, 2].map((k) => {
            const cx = 428 + k * 70;
            const rnd = seeded(11 + k);
            const base = k === 2 ? 52 : 82;
            return (
              <g key={k}>
                <Bust cx={cx} y={g - 4} s={0.9} />
                {Array.from({ length: 12 }, (_, i) => (
                  <circle key={i} cx={r2(cx - 12 + rnd() * 24)} cy={r2(base - 12 + rnd() * 24)} r={3} fill={k === 2 ? stip(id, "signal") : PAT.paper} stroke={k === 2 ? R : PAT.ink} strokeWidth={LINE.hair} />
                ))}
                <line x1={cx - 18} y1={base} x2={cx + 18} y2={base} stroke={k === 2 ? R : PAT.ink} strokeWidth={LINE.bold} />
              </g>
            );
          })}
          <line x1={392} y1={22} x2={392} y2={112} {...ink} />
          </g>
          {/* 3. presentation */}
          <g transform="translate(210 0)">
          <Tag cx={744} cy={70} text="$89" w={56} size={20} />
          <line x1={710} y1={80} x2={774} y2={60} {...ink} strokeWidth={LINE.bold} />
          <Tag cx={744} cy={110} text="$49" w={56} size={20} />
          <Lens id={id} cx={826} cy={80} r={30} a={0.75} handle={30} />
          </g>
        </g>
      ) : (
        <g>
          {/* 4. sandbox impulse response */}
          <g transform="translate(25 0)">
          <path d="M60 128L80 114H290L270 128Z" fill={stip(id, "light")} {...ink} />
          <rect x={100} y={28} width={160} height={93} fill={PAT.paper} {...ink} />
          <path d="M110 46H140V84H160V102H180V76H200V46H250" fill="none" {...ink} strokeWidth={LINE.bold} />
          <path d="M110 50H160V106H180V80H200V50H250" fill="none" stroke={R} strokeWidth={LINE.bold} strokeDasharray="5 3" />
          </g>
          {/* 5. ranking */}
          <g transform="translate(130 0)">
          {[0, 1].map((k) => {
            const y = 36 + k * 44;
            return (
              <g key={k}>
                <Num x={370} y={y + 22} size={16}>
                  {k === 0 ? "1" : "4"}
                </Num>
                <rect x={384} y={y} width={196} height={34} fill={PAT.paper} stroke={k === 0 ? R : PAT.ink} strokeWidth={k === 0 ? LINE.bold : LINE.outline} />
                {k === 0 ? <Emblem cx={404} cy={y + 14} stroke={R} /> : <SellerMark cx={404} cy={y + 16} />}
                {Array.from({ length: 5 }, (_, j) => (
                  <path key={j} d={star(436 + j * 12, y + 18, 4.4)} fill={j < 4 ? PAT.ink : PAT.paper} stroke={PAT.ink} strokeWidth={LINE.hair} strokeLinejoin="round" />
                ))}
                <Num x={570} y={y + 23} size={16} anchor="end">
                  $34.99
                </Num>
              </g>
            );
          })}
          </g>
          {/* 6. guardrails */}
          <g transform="translate(204 0)">
          <path d="M660 106A38 38 0 0 1 736 106" fill={PAT.paper} {...ink} />
          <line x1={698} y1={106} x2={718} y2={78} {...ink} strokeWidth={LINE.bold} />
          <circle cx={698} cy={106} r={3} fill={PAT.ink} />
          <circle cx={724} cy={76} r={3.5} fill={stip(id, "signal")} stroke={R} strokeWidth={LINE.outline} />
          <line x1={654} y1={106} x2={742} y2={106} {...ink} />
          <ObliqueBox id={id} x={768} y={70} w={36} h={50} dx={6} dy={4} />
          <line x1={786} y1={104} x2={798} y2={80} {...ink} strokeWidth={LINE.bold} />
          <circle cx={786} cy={104} r={3} fill={PAT.ink} />
          <Wall id={id} x={836} y={g} w={92} h={70} />
          </g>
        </g>
      )}
    </Frame>
  );
}

/**
 * Pricing bot meets buying bot, on four published findings. The seller's
 * pricing algorithm (left) faces a shopper's AI agent (right). What passes
 * between them changes with the tab, and the bars below give the study's
 * numbers.
 * Inspection (Wadi & Ma, 2026a): listings inspected per session, humans
 * 1.12, AI agents 1.63 to 5.83.
 * Anchor (Wadi & Fredette, 2025): a high reference price raised the models'
 * willingness to pay by $31.62 (a low one lowered it by $15.70).
 * Buried weights (Wadi & Ma, 2026b, Study 1, vague goal): optimal choice
 * 0.89 when weights are visible, 0.29 behind a costly tool call.
 * Platform tag (Wadi & Ma, 2026c, Study 2, platform-delegated agent): paid
 * listing chosen 39.6% when tagged "Promoted", 74.2% when tagged as
 * promoted by the platform.
 */
type Tactic = "inspect" | "anchor" | "weights" | "tag";

export function BotMeetsBot() {
  const [t, setT] = useState<Tactic>("inspect");
  const id = "w9-botbot";
  const bx0 = 188;
  const bw = 380;
  const bar = (y: number, key: string, from: number, to: number, max: number, text: string, red = false, range = false) => {
    const a = r2(bx0 + (from / max) * bw);
    const b = r2(bx0 + (to / max) * bw);
    return (
      <g>
        <PatentKey x={176} y={y + 13} size={12} anchor="end" fill={red ? R : PAT.ink}>
          {key}
        </PatentKey>
        <rect x={range ? a : bx0} y={y} width={r2((range ? b - a : b - bx0) || 1)} height={18} fill={red ? stip(id, "signal") : stip(id, "light")} {...ink} stroke={red ? R : PAT.ink} style={{ transition: "all 400ms ease" }} />
        <Num x={r2(b + 8)} y={y + 14} size={15} anchor="start" fill={red ? R : PAT.ink}>
          {text}
        </Num>
      </g>
    );
  };
  const label = {
    inspect: "AI shopping agents inspect between 1.63 and 5.83 listings per session against 1.12 for humans (Wadi and Ma, 2026a). A lens passes over a row of listing cards.",
    anchor: "A high arbitrary reference price, drawn as a struck-out $89 tag beside a $49 tag, raised the language models' willingness to pay by $31.62 (Wadi and Fredette, 2025).",
    weights: "With unit weights buried behind a costly tool call, drawn as a lidded card, the agents' optimal choice fell from 0.89 to 0.29 in red (Wadi and Ma, 2026b).",
    tag: "With a sponsorship tag attributed to the platform, the platform-delegated agent chose the paid listing 74.2 percent of the time in red, against 39.6 percent with a plain Promoted tag (Wadi and Ma, 2026c).",
  }[t];
  return (
    <div>
      <Frame width={600} height={252} label={`Patent drawing of a seller's pricing algorithm facing a shopper's AI agent holding a shopping bag. ${label}`}>
        <PatentDefs id={id} />
        <SmallModel id={id} x={20} y={30} w={76} h={74} />
        <SmallModel id={id} x={494} y={30} w={76} h={74} />
        <Bag id={id} x={518} y={29} w={24} h={24} />
        <line x1={10} y1={104} x2={590} y2={104} {...ink} />
        {/* what passes between them */}
        {t === "inspect" ? (
          <g>
            {Array.from({ length: 7 }, (_, i) => (
              <ObliqueBox key={i} id={id} x={150 + i * 42} y={56} w={30} h={40} dx={5} dy={3} />
            ))}
            <Lens id={id} cx={384} cy={66} r={20} a={0.7} handle={18} />
          </g>
        ) : t === "anchor" ? (
          <g>
            <Tag cx={252} cy={72} text="$89" w={52} size={18} />
            <line x1={222} y1={80} x2={282} y2={64} {...ink} strokeWidth={LINE.bold} />
            <Tag cx={350} cy={72} text="$49" w={52} size={18} />
          </g>
        ) : t === "weights" ? (
          <g>
            <ObliqueBox id={id} x={232} y={50} w={120} h={46} dx={8} dy={5} />
            <line x1={244} y1={62} x2={300} y2={62} {...ink} />
            <Num x={340} y={90} size={16} anchor="end">$4.99</Num>
            <rect x={244} y={74} width={46} height={16} fill={stip(id, "dense")} {...ink} stroke={R} />
            <path d="M290 82H300" fill="none" stroke={R} strokeWidth={LINE.hair} />
          </g>
        ) : (
          <g>
            <ObliqueBox id={id} x={232} y={58} w={120} h={38} dx={8} dy={5} />
            <line x1={244} y1={72} x2={300} y2={72} {...ink} />
            <Num x={340} y={88} size={16} anchor="end">$129</Num>
            <rect x={180} y={28} width={226} height={20} fill={PAT.paper} stroke={R} strokeWidth={LINE.bold} />
            <PatentKey x={295} y={42} size={12} fill={R}>
              Promoted by platform
            </PatentKey>
          </g>
        )}
        {/* the findings */}
        {t === "inspect" ? (
          <>
            {bar(140, "Humans", 0, 1.12, 7.5, "1.12")}
            {bar(190, "AI agents", 1.63, 5.83, 7.5, "1.63 to 5.83", false, true)}
            <PatentKey x={bx0} y={240} size={12} anchor="start">
              Listings inspected
            </PatentKey>
          </>
        ) : t === "anchor" ? (
          <>
            {bar(140, "No anchor", 0, 0, 40, "$0")}
            {bar(190, "High anchor", 0, 31.62, 40, "+$31.62", true)}
            <PatentKey x={bx0} y={240} size={12} anchor="start">
              Shift in willingness to pay
            </PatentKey>
          </>
        ) : t === "weights" ? (
          <>
            {bar(140, "Weights visible", 0, 0.89, 1, "0.89")}
            {bar(190, "Costly tool call", 0, 0.29, 1, "0.29", true)}
            <PatentKey x={bx0} y={240} size={12} anchor="start">
              Optimal choice
            </PatentKey>
          </>
        ) : (
          <>
            {bar(140, "Promoted", 0, 39.6, 100, "39.6%")}
            {bar(190, "By platform", 0, 74.2, 100, "74.2%", true)}
            <PatentKey x={bx0} y={240} size={12} anchor="start">
              Paid listing chosen
            </PatentKey>
          </>
        )}
      </Frame>
      <Segmented
        label="At the interface"
        options={[
          { id: "inspect", label: "Inspection" },
          { id: "anchor", label: "Anchor price" },
          { id: "weights", label: "Buried weights" },
          { id: "tag", label: "Platform tag" },
        ]}
        value={t}
        onChange={setT}
      />
    </div>
  );
}

/** The platform's emblem, a small pediment, centred on (cx, cy). */
function Emblem({ cx, cy, s = 1, stroke = PAT.ink }: { cx: number; cy: number; s?: number; stroke?: string }) {
  return (
    <g>
      <path d={`M${r2(cx - 9 * s)} ${r2(cy + 4 * s)}L${cx} ${r2(cy - 5 * s)}L${r2(cx + 9 * s)} ${r2(cy + 4 * s)}Z`} fill={PAT.paper} stroke={stroke} strokeWidth={LINE.outline} strokeLinejoin="round" />
      {[-5, 0, 5].map((d) => (
        <line key={d} x1={r2(cx + d * s)} y1={r2(cy + 5 * s)} x2={r2(cx + d * s)} y2={r2(cy + 11 * s)} stroke={stroke} strokeWidth={LINE.hair} />
      ))}
      <line x1={r2(cx - 9 * s)} y1={r2(cy + 12 * s)} x2={r2(cx + 9 * s)} y2={r2(cy + 12 * s)} stroke={stroke} strokeWidth={LINE.outline} />
    </g>
  );
}

/** A third-party seller's mark: a small awning shopfront centred on (cx, cy). */
function SellerMark({ cx, cy, stroke = PAT.ink }: { cx: number; cy: number; stroke?: string }) {
  return (
    <g>
      <path d={`M${cx - 10} ${cy - 3}H${cx + 10}L${cx + 8} ${cy - 8}H${cx - 8}Z`} fill={PAT.paper} stroke={stroke} strokeWidth={LINE.outline} strokeLinejoin="round" />
      <rect x={cx - 8} y={cy - 3} width={16} height={14} fill={PAT.paper} stroke={stroke} strokeWidth={LINE.outline} />
      <rect x={cx - 3} y={cy + 3} width={6} height={8} fill={PAT.paper} stroke={stroke} strokeWidth={LINE.hair} />
    </g>
  );
}

/** A delivery van in side view, (x, y) the bottom-left of its body. The platform's fulfillment service. */
function Van({ x, y, stroke = PAT.ink }: { x: number; y: number; stroke?: string }) {
  return (
    <g>
      <path d={`M${x} ${y}V${y - 13}H${x + 18}L${x + 25} ${y - 7}V${y}Z`} fill={PAT.paper} stroke={stroke} strokeWidth={LINE.outline} strokeLinejoin="round" />
      <line x1={x + 18} y1={y - 13} x2={x + 18} y2={y} stroke={stroke} strokeWidth={LINE.hair} />
      <circle cx={x + 6} cy={y + 1} r={2.6} fill={PAT.paper} stroke={stroke} strokeWidth={LINE.outline} />
      <circle cx={x + 20} cy={y + 1} r={2.6} fill={PAT.paper} stroke={stroke} strokeWidth={LINE.outline} />
    </g>
  );
}

/**
 * One product, four offers, and the "Buy Box" that takes the default sale.
 * The platform's own offer wears its emblem. A third-party offer wears a
 * shopfront. A van marks offers shipped by the platform's fulfillment
 * service. Neutral ranking gives the Buy Box to the cheapest equally rated
 * offer. Self-preferencing gives it to the platform's own. Conditioning gives
 * it to the seller that bought the platform's fulfillment. Red marks a Buy
 * Box that went to anything but the best offer.
 */
const OFFERS = [
  { own: true, van: true, price: "$24.99", stars: 4 },
  { own: false, van: false, price: "$21.99", stars: 4 },
  { own: false, van: true, price: "$23.49", stars: 4 },
  { own: false, van: false, price: "$26.50", stars: 3 },
];

export function BuyBox() {
  const [rule, setRule] = useState<"neutral" | "self" | "tied">("neutral");
  const id = "w9-buybox";
  const win = rule === "neutral" ? 1 : rule === "self" ? 0 : 2;
  const red = rule !== "neutral";
  const o = OFFERS[win];
  const c = red ? R : PAT.ink;
  const rowY = (i: number) => 104 + i * 36;
  return (
    <div>
      <Frame
        width={600}
        height={258}
        label={`Patent drawing of a product page with four offers for the same product: the platform's own at $24.99 shipped by its vans, a third-party seller at $21.99, a third-party seller at $23.49 that ships with the platform's vans, and a third-party seller at $26.50. Under ${rule === "neutral" ? "neutral ranking the Buy Box goes to the $21.99 third-party offer" : rule === "self" ? "self-preferencing the Buy Box goes, in red, to the platform's own $24.99 offer" : "buy-box conditioning the Buy Box goes, in red, to the $23.49 seller that bought the platform's fulfillment"}.`}
      >
        <PatentDefs id={id} />
        {/* page */}
        <rect x={16} y={14} width={568} height={236} fill={PAT.paper} {...ink} />
        <line x1={16} y1={30} x2={584} y2={30} {...hair} />
        {[0, 1, 2].map((k) => (
          <circle key={k} cx={26 + k * 7} cy={22} r={2} fill="none" {...hair} />
        ))}
        {/* the product */}
        <ObliqueBox id={id} x={40} y={52} w={56} h={36} dx={14} dy={9} />
        <line x1={124} y1={54} x2={260} y2={54} {...ink} />
        <line x1={124} y1={66} x2={220} y2={66} {...hair} />
        <line x1={124} y1={76} x2={236} y2={76} {...hair} />
        {/* the offers */}
        {OFFERS.map((f, i) => {
          const y = rowY(i);
          const isWin = i === win;
          return (
            <g key={i}>
              <rect x={36} y={y - 14} width={330} height={30} fill={PAT.paper} {...hair} stroke={isWin ? c : PAT.ink} strokeWidth={isWin ? LINE.bold : LINE.hair} />
              {f.own ? <Emblem cx={56} cy={y - 1} /> : <SellerMark cx={56} cy={y - 1} />}
              {Array.from({ length: 5 }, (_, j) => (
                <path key={j} d={star(92 + j * 11, y + 1, 4)} fill={j < f.stars ? PAT.ink : PAT.paper} stroke={PAT.ink} strokeWidth={LINE.hair} strokeLinejoin="round" />
              ))}
              {f.van ? <Van x={170} y={y + 6} /> : null}
              <Num x={354} y={y + 6} size={15} anchor="end" fill={isWin ? c : PAT.ink}>
                {f.price}
              </Num>
            </g>
          );
        })}
        {/* the Buy Box */}
        <PatentKey x={480} y={52} size={12}>
          Buy box
        </PatentKey>
        <rect x={400} y={62} width={160} height={150} fill={PAT.paper} {...ink} stroke={c} strokeWidth={red ? LINE.bold : LINE.outline} />
        {o.own ? <Emblem cx={480} cy={90} s={1.5} stroke={c} /> : <SellerMark cx={480} cy={92} stroke={c} />}
        <Num x={480} y={140} size={26} fill={c}>
          {o.price}
        </Num>
        <rect x={420} y={160} width={120} height={30} rx={3} fill={stip(id, "light")} {...ink} />
        <line x1={366} y1={rowY(win)} x2={396} y2={r2(137)} {...hair} strokeDasharray="4 3" stroke={c} style={{ transition: "all 300ms ease" }} />
      </Frame>
      <Segmented
        label="Ranking"
        options={[
          { id: "neutral", label: "Neutral" },
          { id: "self", label: "Self-preferencing" },
          { id: "tied", label: "Tying" },
        ]}
        value={rule}
        onChange={setRule}
      />
    </div>
  );
}

/** A small shopfront for a rival firm, (x, y) bottom-left of its front face. */
function Shopfront({ id, x, y, w = 70, h = 56 }: { id: string; x: number; y: number; w?: number; h?: number }) {
  return (
    <g>
      <ObliqueBox id={id} x={x} y={y - h} w={w} h={h} dx={10} dy={6} />
      <path d={`M${x} ${r2(y - h * 0.82)}H${x + w}L${x + w - 5} ${r2(y - h * 0.82 + 8)}H${x + 5}Z`} fill={stip(id, "light")} {...ink} />
      <rect x={r2(x + w * 0.14)} y={r2(y - h * 0.48)} width={r2(w * 0.28)} height={r2(h * 0.48)} fill={PAT.paper} {...hair} />
      <rect x={r2(x + w * 0.54)} y={r2(y - h * 0.48)} width={r2(w * 0.32)} height={r2(h * 0.28)} fill={PAT.paper} {...hair} />
    </g>
  );
}

/** A till receipt standing upright: hairline item rows and a total. (x, y) top-left. */
function Receipt({ x, y, total, red = false, coupon = false }: { x: number; y: number; total: string; red?: boolean; coupon?: boolean }) {
  const w = 58;
  const h = 70;
  const zig = Array.from({ length: 7 }, (_, i) => `L${r2(x + ((i + 0.5) * w) / 7)} ${y + h + 4}L${r2(x + ((i + 1) * w) / 7)} ${y + h}`).join("");
  return (
    <g>
      <path d={`M${x} ${y}H${x + w}V${y + h}${zig}`} fill={PAT.paper} {...ink} />
      <path d={`M${x} ${y}V${y + h}`} fill="none" {...ink} />
      <line x1={x + 8} y1={y + 12} x2={x + 44} y2={y + 12} {...hair} />
      <line x1={x + 8} y1={y + 22} x2={x + 36} y2={y + 22} {...hair} />
      {coupon ? <line x1={x + 8} y1={y + 32} x2={x + 30} y2={y + 32} {...hair} strokeDasharray="2 2" /> : null}
      <line x1={x + 6} y1={y + 42} x2={x + w - 6} y2={y + 42} {...hair} />
      <Num x={x + w - 7} y={y + 60} size={15} anchor="end" fill={red ? R : PAT.ink}>
        {total}
      </Num>
    </g>
  );
}

/**
 * The same two final prices reached two ways. Personalized surcharges: the
 * list price is $80 and one shopper is charged $20 more. Personalized
 * discount targeting: the list price is $100 and one shopper, about to
 * abandon the cart, is sent a $20 coupon. Either way one pays $100 and one
 * $80. The $20 gap (red) is the same.
 */
export function CouponDispersion() {
  const id = "w9-coupon";
  const fig = (ox: number, list: string, surcharge: boolean, name: string) => (
    <g>
      <Tag cx={ox + 70} cy={22} text={list} w={52} size={16} />
      <line x1={ox + 40} y1={36} x2={ox + 22} y2={48} {...hair} />
      <line x1={ox + 74} y1={36} x2={ox + 112} y2={48} {...hair} />
      <Receipt x={ox} y={52} total="$100" red={surcharge} />
      <Receipt x={ox + 86} y={52} total="$80" red={!surcharge} coupon={!surcharge} />
      {surcharge ? (
        <Num x={ox + 29} y={89} size={13} fill={R}>
          +$20
        </Num>
      ) : (
        <g>
          <rect x={ox + 152} y={66} width={44} height={22} fill={PAT.paper} stroke={R} strokeWidth={LINE.outline} strokeDasharray="3 2" />
          <Num x={ox + 174} y={82} size={13} fill={R}>
            −$20
          </Num>
          <line x1={ox + 152} y1={77} x2={ox + 146} y2={83} stroke={R} strokeWidth={LINE.hair} />
        </g>
      )}
      <FigureName x={ox + 100} y={152} size={14}>
        {name}
      </FigureName>
    </g>
  );
  return (
    <Frame
      width={540}
      height={160}
      label="Patent drawing in two figures. Personalized surcharges: a list price of $80, and two receipts, one for $100 with a red +$20 surcharge and one for $80. Personalized discount targeting: a list price of $100, and two receipts, one for $100 and one for $80 with a red dashed −$20 coupon beside it. Both end with the same $100 and $80."
    >
      <PatentDefs id={id} />
      {fig(26, "$80", true, "personalized surcharges")}
      <line x1={270} y1={8} x2={270} y2={154} {...hair} strokeDasharray={CENTRE_DASH} />
      {fig(298, "$100", false, "personalized discount targeting")}
    </Frame>
  );
}

/** A bottle with a cap and a label band, (cx, y) its base centre. */
function Bottle({ id, cx, y, children }: { id: string; cx: number; y: number; children?: React.ReactNode }) {
  return (
    <g>
      <path d={`M${cx - 15} ${y}V${y - 46}Q${cx - 15} ${y - 58} ${cx - 6} ${y - 62}V${y - 72}H${cx + 6}V${y - 62}Q${cx + 15} ${y - 58} ${cx + 15} ${y - 46}V${y}Z`} fill={PAT.paper} {...ink} />
      <rect x={cx - 7} y={y - 80} width={14} height={8} fill={stip(id, "dense")} {...ink} />
      <rect x={cx - 15} y={y - 38} width={30} height={24} fill={PAT.paper} {...hair} />
      {children}
    </g>
  );
}

/**
 * Data appropriation. A third-party seller's shop and its bottle, with the
 * sales record the marketplace holds for it. That record runs (red, dashed)
 * into the platform's hall, and out comes a private-label copy of the same
 * bottle carrying the platform's emblem, priced under the original.
 */
export function DataAppropriation() {
  const id = "w9-appropriate";
  const g = 210;
  return (
    <Frame
      width={460}
      height={232}
      label="Patent drawing of data appropriation: a third-party seller's shopfront and its bottle tagged $18, with a sales record sheet of rising bars. A red dashed line carries the record into the platform's columned hall, and beside the hall stands a private-label copy of the same bottle with the platform's emblem, tagged $14."
    >
      <PatentDefs id={id} />
      <line x1={10} y1={g} x2={450} y2={g} {...ink} />
      <Shopfront id={id} x={14} y={g} w={62} h={58} />
      <Bottle id={id} cx={110} y={g} />
      <Tag cx={114} cy={110} text="$18" w={36} size={14} />
      {/* the sales record */}
      <path d="M22 26H82L90 34V106H22Z" fill={PAT.paper} {...ink} />
      <path d="M82 26V34H90" fill="none" {...hair} />
      {[0, 1, 2, 3, 4].map((k) => (
        <rect key={k} x={30 + k * 11} y={r2(98 - (12 + k * 11))} width={7} height={r2(12 + k * 11)} fill={stip(id, "light")} {...hair} />
      ))}
      <path d="M90 60C150 60 170 70 214 104" fill="none" stroke={R} strokeWidth={LINE.bold} strokeDasharray="6 4" />
      <path d={headAlongPath(218, 107, 1, 0.8, 8)} fill="none" stroke={R} strokeWidth={LINE.outline} />
      <Hall id={id} x={226} y={g} w={92} h={84} />
      <line x1={344} y1={g - 40} x2={366} y2={g - 40} {...ink} />
      <path d={headAlongPath(370, g - 40, 1, 0, 7)} fill="none" {...ink} />
      <Bottle id={id} cx={398} y={g}>
        <Emblem cx={398} cy={g - 30} s={0.9} />
      </Bottle>
      <Tag cx={402} cy={110} text="$14" w={36} size={14} />
    </Frame>
  );
}

/**
 * Why speed sustains tacit coordination. Top: one firm cuts its price on day
 * 0 (solid). The rival (dashed) holds its price until it detects the cut,
 * then retaliates, and both sit in a price war. Bottom: a balance weighs the
 * cutter's gain while the rival has not yet noticed ($10k a day, left pan)
 * against the fixed $60k cost of the price war (red, right pan). Shorten the
 * time to detect and the gain shrinks until the cut no longer pays.
 */
const LAGS = [
  { label: "30 days", days: 30 },
  { label: "7 days", days: 7 },
  { label: "1 day", days: 1 },
  { label: "1 hour", days: 1 / 24 },
  { label: "1 second", days: 1 / 86400 },
];

export function DetectionLag() {
  const [k, setK] = useState(1);
  const id = "w9-lag";
  const lag = LAGS[k].days;
  const gain = Math.round(lag * 10);
  const loss = 60;
  const x0 = 40;
  const x1 = 520;
  const D = (d: number) => r2(x0 + ((d + 6) / 46) * (x1 - x0));
  const hi = 30;
  const lo = 82;
  const mid = 58;
  const war = 20;
  const rivalCut = Math.min(lag, 40);
  const end = Math.min(rivalCut + war, 40);
  const cutter = `M${D(-6)} ${hi}H${D(0)}V${mid}H${D(rivalCut)}V${lo}H${D(end)}${end < 40 ? `V${hi}H${D(40)}` : ""}`;
  const rival = `M${D(-6)} ${hi}H${D(rivalCut)}V${lo}H${D(end)}${end < 40 ? `V${hi}H${D(40)}` : ""}`;
  // the balance
  const px = 280;
  const py = 150;
  const tilt = Math.max(-1, Math.min(1, (gain - loss) / 60));
  const ang = tilt * 0.16;
  const arm = 150;
  const lx = r2(px - Math.cos(ang) * arm);
  const ly = r2(py + Math.sin(ang) * arm);
  const rx = r2(px + Math.cos(ang) * arm);
  const ry = r2(py - Math.sin(ang) * arm);
  const gainCoins = Math.max(gain > 0 ? 1 : 0, Math.min(9, Math.round(gain / 10)));
  return (
    <div>
      <Frame
        width={560}
        height={268}
        label={`Patent drawing of tacit coordination. Top: a price path over 40 days. One firm cuts on day 0 and the rival, detecting the cut after ${LAGS[k].label}, retaliates into a 20-day price war before both return to the high price. Bottom: a balance weighing the cutter's gain before detection, $${gain}k, against the $60k cost of the price war in red. The balance tips ${gain > loss ? "toward the gain, so undercutting pays" : "toward the price war, so undercutting does not pay"}.`}
      >
        <PatentDefs id={id} />
        <line x1={x0} y1={20} x2={x0} y2={96} {...ink} />
        <line x1={x0} y1={96} x2={x1 + 6} y2={96} {...ink} />
        <PatentKey x={x0 + 6} y={16} size={13} anchor="start">
          Price
        </PatentKey>
        {[0, 10, 20, 30, 40].map((d) => (
          <g key={d}>
            <line x1={D(d)} y1={96} x2={D(d)} y2={100} {...ink} />
            <Num x={D(d)} y={114} size={13}>{`day ${d}`}</Num>
          </g>
        ))}
        {lag >= 1 ? (
          <path d={`M${D(0)} ${hi - 8}V${hi - 12}H${D(rivalCut)}V${hi - 8}`} fill="none" {...hair} />
        ) : null}
        <path d={rival} fill="none" {...ink} strokeDasharray="6 3" style={{ transition: "d 400ms ease" }} />
        <path d={cutter} fill="none" {...ink} strokeWidth={LINE.bold} style={{ transition: "d 400ms ease" }} />
        <rect x={D(rivalCut)} y={lo + 2} width={r2(D(end) - D(rivalCut))} height={8} fill={stip(id, "signal")} stroke="none" />
        {/* the balance */}
        <path d={`M${px - 16} 252H${px + 16}L${px + 6} 236H${px - 6}Z`} fill={stip(id, "dense")} {...ink} />
        <line x1={px} y1={236} x2={px} y2={py} {...ink} strokeWidth={LINE.bold} />
        <line x1={lx} y1={ly} x2={rx} y2={ry} {...ink} strokeWidth={LINE.bold} style={{ transition: "all 400ms ease" }} />
        <circle cx={px} cy={py} r={4} fill={PAT.paper} {...ink} />
        <g style={{ transition: "transform 400ms ease", transform: `translate(${lx - (px - arm)}px, ${ly - py}px)` }}>
          <line x1={px - arm} y1={py} x2={px - arm - 30} y2={py + 40} {...hair} />
          <line x1={px - arm} y1={py} x2={px - arm + 30} y2={py + 40} {...hair} />
          <path d={`M${px - arm - 34} ${py + 40}Q${px - arm} ${py + 52} ${px - arm + 34} ${py + 40}Z`} fill={PAT.paper} {...ink} />
          {gainCoins > 0 ? <Coins id={id} cx={px - arm} y={py + 40} n={gainCoins} rx={13} ry={4} h={4} /> : null}
          <Num x={px - arm - 46} y={py + 46} size={15} anchor="end">{`$${gain}k`}</Num>
        </g>
        <g style={{ transition: "transform 400ms ease", transform: `translate(${rx - (px + arm)}px, ${ry - py}px)` }}>
          <line x1={px + arm} y1={py} x2={px + arm - 30} y2={py + 40} {...hair} />
          <line x1={px + arm} y1={py} x2={px + arm + 30} y2={py + 40} {...hair} />
          <path d={`M${px + arm - 34} ${py + 40}Q${px + arm} ${py + 52} ${px + arm + 34} ${py + 40}Z`} fill={PAT.paper} {...ink} />
          <Coins id={id} cx={px + arm} y={py + 40} n={6} rx={13} ry={4} h={4} red />
          <Num x={px + arm + 46} y={py + 46} size={15} anchor="start" fill={R}>{`$${loss}k`}</Num>
        </g>
        <PatentKey x={20} y={260} size={12.5} anchor="start">
          Gain from undercutting
        </PatentKey>
        <PatentKey x={px + arm} y={260} size={12.5} fill={R}>
          Price war
        </PatentKey>
      </Frame>
      <Slider label="Time to detect a cut" value={k} min={0} max={LAGS.length - 1} onChange={setK} formatValue={(v) => LAGS[v].label} />
    </div>
  );
}

/**
 * Dual entitlement, on two questions from Kahneman, Knetsch and Thaler
 * (1986). Each price is drawn as a stacked column, unit cost (dense) under
 * profit (light), before and after the increase. Cost: the wholesale price
 * of lettuce rises 30 cents and the grocer passes it on, so the profit block
 * is unchanged. 79% of 101 respondents called it acceptable. Need: snow
 * shovels go from $15 to $20 the morning after a snowstorm with no change in
 * cost, so the whole rise lands on profit (red). 82% of 107 called it unfair.
 */
const KKT = {
  cost: { before: [70, 30], after: [100, 30], k: 1.2, fair: 79, n: 101 },
  need: { before: [10, 5], after: [10, 10], k: 8, fair: 18, n: 107 },
} as const;

export function DualEntitlement() {
  const [why, setWhy] = useState<"cost" | "need">("need");
  const id = "w9-entitle";
  const d = KKT[why];
  const base = 196;
  const col = (x: number, [cost, profit]: readonly [number, number], red: boolean) => {
    const hc = r2(cost * d.k);
    const hp = r2(profit * d.k);
    return (
      <g>
        <ObliqueBox id={id} x={x} y={r2(base - hc)} w={58} h={hc} dx={12} dy={7} />
        <ObliqueBox id={id} x={x} y={r2(base - hc - hp)} w={58} h={hp} dx={12} dy={7} front={red ? stip(id, "signal") : stip(id, "light")} stroke={red ? R : PAT.ink} />
      </g>
    );
  };
  const bTop = base - (d.before[0] + d.before[1]) * d.k;
  const aCost = base - d.after[0] * d.k;
  const aTop = aCost - d.after[1] * d.k;
  return (
    <div>
      <Frame
        width={560}
        height={318}
        label={
          why === "cost"
            ? "Patent drawing of a cost-justified increase: a head of lettuce and two stacked price columns, unit cost under profit. After the wholesale cost rises 30 cents, the cost block grows by 30 cents and the profit block stays the same. Below, 79 percent of 101 respondents judged the increase acceptable and 21 percent unfair (Kahneman, Knetsch and Thaler, 1986)."
            : "Patent drawing of an increase on a spike in need: a snow shovel and two stacked price columns, unit cost under profit, going from $15 to $20 after a snowstorm. The cost block is unchanged and the profit block doubles, in red. Below, 82 percent of 107 respondents judged the increase unfair, drawn in red, and 18 percent acceptable (Kahneman, Knetsch and Thaler, 1986)."
        }
      >
        <PatentDefs id={id} />
        {why === "need" ? (
          <g>
            {/* snow shovel */}
            <path d="M74 26H92" {...ink} strokeWidth={LINE.bold} fill="none" />
            <path d="M83 26V128" {...ink} strokeWidth={2.4} fill="none" />
            <path d="M83 28V128" stroke={PAT.paper} strokeWidth={1} fill="none" />
            <path d="M58 128H108L114 188H52Z" fill={stip(id, "light")} {...ink} />
            <path d="M52 188L56 194H118L114 188" fill={stip(id, "dense")} {...ink} />
            {[70, 83, 96].map((x) => (
              <line key={x} x1={x} y1={134} x2={r2(x + (x - 83) * 0.12)} y2={182} {...hair} />
            ))}
          </g>
        ) : (
          <g>
            {/* head of lettuce */}
            <path d="M40 160Q34 116 84 108Q134 116 128 160Q110 192 84 192Q58 192 40 160Z" fill={stip(id, "light")} {...ink} />
            <path d="M52 150Q62 124 84 120Q106 124 116 150Q104 176 84 178Q64 176 52 150Z" fill={PAT.paper} {...ink} />
            <path d="M84 178V128M84 150L70 136M84 160L98 142M84 168L68 156" fill="none" {...hair} />
          </g>
        )}
        {col(178, d.before, false)}
        {col(318, d.after, why === "need")}
        <line x1={250} y1={150} x2={300} y2={150} {...ink} />
        <path d={headAlongPath(304, 150, 1, 0, 8)} fill="none" {...ink} />
        {why === "need" ? (
          <>
            <Num x={213} y={r2(bTop - 14)} size={18}>$15</Num>
            <Num x={353} y={r2(aTop - 14)} size={18} fill={R}>$20</Num>
          </>
        ) : (
          <>
            <path d={`M306 ${r2(aCost)}H312M306 ${r2(aCost + 30 * d.k)}H312M309 ${r2(aCost)}V${r2(aCost + 30 * d.k)}`} fill="none" {...hair} />
            <Num x={300} y={r2(aCost + 15 * d.k + 5)} size={15} anchor="end">+30¢</Num>
          </>
        )}
        <PatentKey x={396} y={r2((aCost + aTop) / 2 + 4)} size={11} anchor="start" fill={why === "need" ? R : PAT.ink}>
          Profit
        </PatentKey>
        <PatentKey x={396} y={r2((aCost + base) / 2 + 4)} size={11} anchor="start">
          Unit cost
        </PatentKey>
        {/* the survey */}
        <line x1={14} y1={222} x2={546} y2={222} {...hair} />
        {(() => {
          const x0 = 40;
          const w = 480;
          const xf = r2(x0 + (w * d.fair) / 100);
          return (
            <g>
              <rect x={x0} y={250} width={r2(xf - x0)} height={22} fill={stip(id, "light")} {...ink} />
              <rect x={xf} y={250} width={r2(x0 + w - xf)} height={22} fill={why === "need" ? stip(id, "signal") : stip(id, "dense")} {...ink} stroke={why === "need" ? R : PAT.ink} />
              <PatentKey x={x0} y={243} size={11} anchor="start">
                {`Acceptable ${d.fair}%`}
              </PatentKey>
              <PatentKey x={x0 + w} y={243} size={11} anchor="end" fill={why === "need" ? R : PAT.ink}>
                {`Unfair ${100 - d.fair}%`}
              </PatentKey>
              <Num x={x0 + w} y={292} size={13} anchor="end">
                {`${d.n} respondents`}
              </Num>
            </g>
          );
        })()}
      </Frame>
      <Segmented
        label="Price rises on"
        options={[
          { id: "cost", label: "Higher input cost" },
          { id: "need", label: "A spike in need" },
        ]}
        value={why}
        onChange={setWhy}
      />
    </div>
  );
}

/** A shopping bag in oblique projection, (x, y) the bottom-left of its front. */
function Bag({ id, x, y, w = 26, h = 28, stroke = PAT.ink }: { id: string; x: number; y: number; w?: number; h?: number; stroke?: string }) {
  return (
    <g>
      <path d={`M${x + 7} ${y - h}V${y - h - 7}Q${x + w / 2} ${y - h - 15} ${x + w - 7} ${y - h - 7}V${y - h}`} fill="none" {...ink} stroke={stroke} />
      <ObliqueBox id={id} x={x} y={y - h} w={w} h={h} dx={6} dy={4} stroke={stroke} />
    </g>
  );
}

/**
 * Two rival pricing algorithms face each other with no wire between them.
 * Between them, each one's price over time: both start near the competitive
 * level and climb, without a message passing, to settle together at a
 * collusive, supra-competitive level (the red band).
 */
export function FacingMachines() {
  const id = "w9-facing";
  const x0 = 270;
  const x1 = 530;
  const yC = 168;
  const yM = 72;
  const trace = (seed: number) => {
    const rnd = seeded(seed);
    return Array.from({ length: 53 }, (_, i) => {
      const t = i / 52;
      const lvl = yC - (yC - yM - 10) * (1 - Math.exp(-t * 4.2));
      const noise = (rnd() - 0.5) * 30 * (1 - t) ** 1.4;
      return `${r2(x0 + t * (x1 - x0))} ${r2(lvl + noise)}`;
    }).join("L");
  };
  return (
    <Frame
      width={800}
      height={226}
      label="Patent drawing of two rival pricing algorithm housings facing each other with nothing connecting them. Between them, a chart of each firm's price over time: both start near the competitive level and, without any message passing, climb and settle together in a red supra-competitive band near the collusive level."
    >
      <PatentDefs id={id} />
      <SmallModel id={id} x={60} y={74} w={120} h={104} />
      <ObliqueBox id={id} x={48} y={178} w={144} h={10} dx={10} dy={6} />
      <SmallModel id={id} x={610} y={74} w={120} h={104} />
      <ObliqueBox id={id} x={598} y={178} w={144} h={10} dx={10} dy={6} />
      {/* the chart */}
      <line x1={x0} y1={40} x2={x0} y2={186} {...ink} />
      <line x1={x0} y1={186} x2={x1 + 6} y2={186} {...ink} />
      <rect x={x0 + 1} y={yM - 6} width={x1 - x0} height={26} fill={stip(id, "signal")} stroke="none" />
      <line x1={x0} y1={yM} x2={x1} y2={yM} stroke={R} strokeWidth={LINE.hair} strokeDasharray="5 3" />
      <line x1={x0} y1={yC} x2={x1} y2={yC} {...hair} strokeDasharray="5 3" />
      <PatentKey x={x0 + 8} y={yM - 14} size={12} anchor="start" fill={R}>
        Collusive
      </PatentKey>
      <PatentKey x={x1} y={yC + 14} size={12} anchor="end">
        Competitive
      </PatentKey>
      <path d={`M${trace(3)}`} fill="none" {...ink} strokeWidth={LINE.bold} />
      <path d={`M${trace(8)}`} fill="none" {...ink} strokeWidth={LINE.outline} strokeDasharray="6 3" />
      <PatentKey x={r2((x0 + x1) / 2)} y={206} size={12}>
        Time
      </PatentKey>
      <PatentKey x={x0 - 8} y={36} size={12} anchor="end">
        Price
      </PatentKey>
    </Frame>
  );
}

/**
 * The forced price cut of Calvano, Calzolari, Denicolò and Pastorello (2020),
 * run on two Q-learning pricing agents trained in their baseline market
 * (logit demand, two firms, unit cost 1, 15 prices, one-period memory,
 * learning rate 0.15, discount 0.95, this run converged after 1.37 million
 * periods). LEARNED holds each agent's learned price index for every state
 * (own last price, rival last price). Before the shock both sit near the
 * monopoly price. In period 0 firm 1 is forced to the chosen price, and from
 * then on both follow their learned strategies: the rival (red) answers with
 * a price war, and both step back up to the high price.
 */
const PRICES = [1.4277,1.4665,1.5052,1.544,1.5827,1.6215,1.6602,1.699,1.7377,1.7764,1.8152,1.8539,1.8927,1.9314,1.9702];
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

export function ForcedCut() {
  const [cut, setCut] = useState(5);
  const id = "w9-forced";
  const path = forcedPath(cut);
  const x0 = 70;
  const x1 = 576;
  const yTop = 22;
  const yBot = 196;
  const pLo = 1.4;
  const pHi = 2.0;
  const n = path.length;
  const X = (i: number) => r2(x0 + (i / n) * (x1 - x0));
  const Y = (p: number) => r2(yBot - ((p - pLo) / (pHi - pLo)) * (yBot - yTop));
  const steps = (who: 0 | 1) => path.map(([a, b], i) => `${i === 0 ? "M" : "L"}${X(i)} ${Y(PRICES[who === 0 ? a : b])}H${X(i + 1)}`).join("");
  const back = path.findIndex((s, i) => i > 4 && s[0] === 12 && s[1] === 11);
  return (
    <div>
      <Frame
        width={600}
        height={248}
        label={`Patent drawing of a forced price cut between two learned Q-learning pricing agents. Before the shock both price near the monopoly price of ${MONOPOLY.toFixed(2)}, far above the static Nash price of ${NASH.toFixed(2)}. In period 0 firm 1 is forced down to ${PRICES[cut].toFixed(2)}. In period 1 the rival, in red, cuts its own price into a price war. Both then step back up and return to the high collusive prices by period ${back - 3}.`}
      >
        <PatentDefs id={id} />
        <line x1={x0} y1={yTop - 6} x2={x0} y2={yBot} {...ink} />
        <line x1={x0} y1={yBot} x2={x1 + 6} y2={yBot} {...ink} />
        {[1.4, 1.6, 1.8, 2.0].map((p) => (
          <g key={p}>
            <line x1={x0 - 5} y1={Y(p)} x2={x0} y2={Y(p)} {...ink} />
            <Num x={x0 - 9} y={Y(p) + 4} size={13} anchor="end">{p.toFixed(2)}</Num>
          </g>
        ))}
        <line x1={X(5)} y1={Y(MONOPOLY)} x2={x1} y2={Y(MONOPOLY)} {...hair} strokeDasharray="5 3" />
        <line x1={x0} y1={Y(NASH)} x2={x1} y2={Y(NASH)} {...hair} strokeDasharray="5 3" />
        <PatentKey x={x1} y={r2(Y(MONOPOLY) - 7)} size={12} anchor="end">
          Monopoly
        </PatentKey>
        <PatentKey x={x1} y={r2(Y(NASH) + 15)} size={12} anchor="end">
          Static Nash equilibrium
        </PatentKey>
        {/* the forced period */}
        <rect x={X(3)} y={yTop - 4} width={r2(X(4) - X(3))} height={yBot - yTop + 4} fill={stip(id, "light")} stroke="none" />
        <path d={steps(1)} fill="none" stroke={R} strokeWidth={LINE.bold} strokeDasharray="6 3" style={{ transition: "d 400ms ease" }} />
        <path d={steps(0)} fill="none" {...ink} strokeWidth={LINE.bold} style={{ transition: "d 400ms ease" }} />
        {path.map((_, i) => (
          <g key={i}>
            <line x1={r2((X(i) + X(i + 1)) / 2)} y1={yBot} x2={r2((X(i) + X(i + 1)) / 2)} y2={yBot + 4} {...ink} />
            {(i - 3) % 3 === 0 ? (
              <Num x={r2((X(i) + X(i + 1)) / 2)} y={yBot + 18} size={13}>{`${i - 3}`}</Num>
            ) : null}
          </g>
        ))}
        <PatentKey x={x1} y={yBot + 36} size={12} anchor="end">
          Period
        </PatentKey>
        <PatentKey x={r2((X(3) + X(4)) / 2)} y={yTop - 9} size={12}>
          Forced cut
        </PatentKey>
        <FigureName x={r2(X(0) + 9)} y={r2(Y(PRICES[12]) - 8)} size={13} anchor="start">
          firm 1
        </FigureName>
        <FigureName x={r2(X(0) + 9)} y={r2(Y(PRICES[11]) + 17)} size={13} anchor="start">
          rival
        </FigureName>
      </Frame>
      <Slider label="Forced price" value={cut} min={0} max={11} onChange={setCut} formatValue={(v) => PRICES[v].toFixed(2)} />
    </div>
  );
}

/** A price board on an A-frame easel: a white face with a big price and a second line. (x, y) board top-left. */
function Easel({ id, x, y, big, small, red = false }: { id: string; x: number; y: number; big: string; small: string; red?: boolean }) {
  const w = 150;
  const h = 112;
  const c = red ? R : PAT.ink;
  return (
    <g>
      <line x1={x + 22} y1={y + h} x2={x + 6} y2={y + h + 40} {...ink} />
      <line x1={x + w - 22} y1={y + h} x2={x + w - 6} y2={y + h + 40} {...ink} />
      <line x1={x + w / 2 + 8} y1={y + 10} x2={x + w / 2 + 30} y2={y + h + 34} {...hair} strokeDasharray="3 2" />
      <ObliqueBox id={id} x={x} y={y} w={w} h={h} dx={6} dy={4} />
      <text x={x + w / 2} y={y + 56} textAnchor="middle" fontFamily="var(--font-body)" fontSize={38} fill={PAT.ink}>
        {big}
      </text>
      <line x1={x + 22} y1={y + 70} x2={x + w - 22} y2={y + 70} {...hair} />
      <text x={x + w / 2} y={y + 96} textAnchor="middle" fontFamily="var(--font-body)" fontSize={22} fill={c}>
        {small}
      </text>
    </g>
  );
}

/**
 * The same $20 difference in two frames. Discount: the board reads $100
 * with a $20 discount below it. Surcharge: the board reads $80 with a $20
 * surcharge (red, the frame judged less fair). Both end at $80 and $100.
 */
export function Frames() {
  const id = "w9-frames";
  return (
    <Frame
      width={560}
      height={210}
      label="Patent drawing in two figures, two price boards on easels. Discount: the board reads $100 with −$20 beneath it. Surcharge: the board reads $80 with a red +$20 beneath it. The difference between the two prices is the same $20."
    >
      <PatentDefs id={id} />
      <Easel id={id} x={46} y={18} big="$100" small="−$20" />
      <FigureName x={124} y={198} size={14}>
        discount
      </FigureName>
      <line x1={280} y1={12} x2={280} y2={196} {...hair} strokeDasharray={CENTRE_DASH} />
      <Easel id={id} x={356} y={18} big="$80" small="+$20" red />
      <FigureName x={434} y={198} size={14}>
        surcharge
      </FigureName>
    </Frame>
  );
}

/**
 * The surge cap: a graduated column shows the surge multiplier that demand
 * would drive the fare to. When an emergency is declared, a stop bar holds
 * it at ×1.5 and the blocked excess stands empty in red dashes.
 */
function SurgeCap() {
  const [demand, setDemand] = useState(4);
  const [flags, setFlags] = useState<string[]>(["emergency"]);
  const id = "w9-guard-cap";
  const emergency = flags.includes("emergency");
  const want = r2(1 + (demand - 1) * 0.875);
  const cap = 1.5;
  const shown = emergency ? Math.min(want, cap) : want;
  const base = 160;
  const Y = (m: number) => r2(base - ((m - 1) / 3.5) * 120);
  return (
    <div>
      <Frame
        width={250}
        height={176}
        label={`Patent drawing of an emergency surge cap: a graduated column of the surge multiplier. Demand would drive the fare to ×${want.toFixed(1)}. ${emergency ? `with an emergency declared, a stop bar holds it at ×${shown.toFixed(1)}${want > cap ? " and the blocked excess stands empty in red dashes" : ""}` : `with no emergency declared, it reaches ×${shown.toFixed(1)}`}.`}
      >
        <PatentDefs id={id} />
        <path d={`M100 ${base}V${Y(4.5)}A22 6 0 0 1 144 ${Y(4.5)}V${base}A22 6 0 0 1 100 ${base}Z`} fill={PAT.paper} {...ink} />
        <path d={`M100 ${Y(shown)}V${base}A22 6 0 0 0 144 ${base}V${Y(shown)}Z`} fill={stip(id, "light")} stroke="none" style={{ transition: "all 300ms ease" }} />
        <ellipse cx={122} cy={Y(shown)} rx={22} ry={6} fill="none" {...hair} style={{ transition: "all 300ms ease" }} />
        <path d={`M100 ${Y(4.5)}V${base}A22 6 0 0 0 144 ${base}V${Y(4.5)}`} fill="none" {...ink} />
        <ellipse cx={122} cy={Y(4.5)} rx={22} ry={6} fill="none" {...ink} />
        {emergency && want > cap ? (
          <path d={`M100 ${Y(want)}V${Y(cap)}M144 ${Y(cap)}V${Y(want)}M100 ${Y(want)}A22 6 0 0 0 144 ${Y(want)}`} fill="none" stroke={R} strokeWidth={LINE.outline} strokeDasharray="4 3" />
        ) : null}
        {emergency ? <ObliqueBox id={id} x={92} y={r2(Y(cap) - 6)} w={60} h={6} dx={8} dy={5} /> : null}
        {[1, 2, 3, 4].map((m) => (
          <g key={m}>
            <line x1={92} y1={Y(m)} x2={100} y2={Y(m)} {...hair} />
            <Num x={86} y={r2(Y(m) + 4)} size={13} anchor="end">{`×${m}`}</Num>
          </g>
        ))}
        <Num x={164} y={r2(Y(shown) + 6)} size={20} anchor="start" fill={!emergency && want > 2 ? R : PAT.ink}>
          {`×${shown.toFixed(1)}`}
        </Num>
      </Frame>
      <Slider label="Demand spike" value={demand} min={1} max={5} step={0.5} onChange={setDemand} showValue={false} />
      <Toggles label="Declared" options={[{ id: "emergency", label: "Emergency" }]} value={flags} onChange={setFlags} />
    </div>
  );
}

/**
 * The four guardrails. Cap: the interactive surge cap above. Framing: a
 * published base price board beside a posted eligibility rule. Reward: the
 * pricing agent's input from a rival's price, cut through with a break line,
 * so its policy cannot condition on it. Firewall: a wall between the
 * sellers' data and the rest of the platform, and a level balance holding the
 * platform's own box and a third-party box at the same weight.
 */
export function Guardrail({ kind }: { kind: "cap" | "framing" | "reward" | "firewall" }) {
  if (kind === "cap") return <SurgeCap />;
  const id = `w9-guard-${kind}`;
  const label = {
    framing: "Patent drawing of transparent discount framing: a price board reading $100 beside a posted rule sheet reading loyalty −10% with its terms beneath.",
    reward: "Patent drawing of collusion-resistant reward design: a pricing agent housing whose input line from a rival's price tag is cut through by a break line, so it cannot feed the agent's policy.",
    firewall: "Patent drawing of firewall and ranking neutrality mandates: a brick wall shutting off a third-party seller's sales record, and beyond it a level balance holding the platform's own box and a third-party box at equal height.",
  }[kind];
  return (
    <Frame width={250} height={176} label={label}>
      <PatentDefs id={id} />
      {kind === "framing" ? (
        <g>
          <ObliqueBox id={id} x={20} y={40} w={110} h={84} dx={6} dy={4} />
          <text x={75} y={96} textAnchor="middle" fontFamily="var(--font-body)" fontSize={34} fill={PAT.ink}>
            $100
          </text>
          <line x1={40} y1={124} x2={30} y2={160} {...ink} />
          <line x1={110} y1={124} x2={120} y2={160} {...ink} />
          <path d="M148 34H222L230 42V146H148Z" fill={PAT.paper} {...ink} />
          <path d="M222 34V42H230" fill="none" {...hair} />
          <PatentKey x={190} y={58} size={12}>
            Loyalty
          </PatentKey>
          <text x={189} y={86} textAnchor="middle" fontFamily="var(--font-body)" fontSize={20} fill={PAT.ink}>
            −10%
          </text>
          {[102, 114, 126].map((y) => (
            <line key={y} x1={158} y1={y} x2={220} y2={y} {...hair} />
          ))}
        </g>
      ) : kind === "reward" ? (
        <g>
          <Tag cx={46} cy={70} text="$9.40" w={44} size={13} />
          <path d="M70 70H94" fill="none" {...ink} />
          <path d="M94 58L100 66L92 72L100 80" fill="none" {...ink} strokeWidth={LINE.bold} />
          <path d="M106 58L112 66L104 72L112 80" fill="none" {...ink} strokeWidth={LINE.bold} />
          <path d="M110 70H132" fill="none" {...ink} strokeDasharray="3 3" />
          <SmallModel id={id} x={134} y={40} w={84} h={84} />
        </g>
      ) : (
        <g>
          <path d="M14 30H62L70 38V100H14Z" fill={PAT.paper} {...ink} />
          {[0, 1, 2, 3].map((k) => (
            <rect key={k} x={22 + k * 11} y={r2(92 - (10 + k * 10))} width={7} height={r2(10 + k * 10)} fill={stip(id, "light")} {...hair} />
          ))}
          <Wall id={id} x={80} y={150} w={28} h={130} />
          <line x1={10} y1={150} x2={240} y2={150} {...ink} />
          {/* level balance */}
          <line x1={178} y1={150} x2={178} y2={70} {...ink} strokeWidth={LINE.bold} />
          <line x1={132} y1={70} x2={224} y2={70} {...ink} strokeWidth={LINE.bold} />
          <circle cx={178} cy={70} r={3} fill={PAT.paper} {...ink} />
          {[132, 224].map((cx, i) => (
            <g key={cx}>
              <line x1={cx} y1={70} x2={cx - 14} y2={96} {...hair} />
              <line x1={cx} y1={70} x2={cx + 14} y2={96} {...hair} />
              <path d={`M${cx - 17} 96Q${cx} 104 ${cx + 17} 96Z`} fill={PAT.paper} {...ink} />
              <ObliqueBox id={id} x={cx - 10} y={80} w={20} h={16} dx={5} dy={3} />
              {i === 0 ? <Emblem cx={cx} cy={84} s={0.6} /> : <SellerMark cx={cx} cy={89} />}
            </g>
          ))}
        </g>
      )}
    </Frame>
  );
}

/**
 * Ten buyers at their willingness to pay, from higher-income (left) to
 * lower-income (right). One price: $40, or $62 when supply is fixed at four
 * units. Personalized: each served buyer pays $2 under their willingness to
 * pay. Red stipple is surplus the higher prices take from buyers who would
 * have bought anyway. Total welfare is the value of every unit sold.
 */
const WTP10 = [90, 80, 70, 62, 54, 46, 40, 34, 28, 24];

export function OutputExpansion() {
  const [pricing, setPricing] = useState<"uniform" | "personalized">("uniform");
  const [supply, setSupply] = useState<"expand" | "fixed">("expand");
  const id = "w9-welfare";
  const cap = supply === "fixed" ? 4 : 10;
  const uni = supply === "fixed" ? 62 : 40;
  const plan = WTP10.map((w, i) => {
    if (i >= cap) return null;
    if (pricing === "uniform") return w >= uni ? uni : null;
    return w - 2;
  });
  const sold = plan.filter((p) => p !== null).length;
  const cs = plan.reduce<number>((u, p, i) => u + (p === null ? 0 : WTP10[i] - p), 0);
  const welfare = plan.reduce<number>((u, p, i) => u + (p === null ? 0 : WTP10[i]), 0);
  const x0 = 56;
  const bw = 38;
  const gap = 10;
  const y0 = 200;
  const Y = (v: number) => r2(y0 - (v / 100) * 172);
  const bx = (i: number) => x0 + 12 + i * (bw + gap);
  return (
    <div>
      <Frame
        width={560}
        height={268}
        label={`Patent drawing of ten buyers drawn as bars at their willingness to pay, from $90 to $24, under ${pricing === "uniform" ? `one price of $${uni}` : "personalized prices of $2 below each buyer's willingness to pay"}${supply === "fixed" ? ", with supply fixed at four units behind a partition" : ""}. ${sold} units are sold, consumer surplus is $${cs} and total welfare $${welfare}.${pricing === "personalized" ? " Red stipple marks the surplus taken from buyers who pay more than the single price." : ""}`}
      >
        <PatentDefs id={id} />
        <line x1={x0} y1={22} x2={x0} y2={y0} {...ink} />
        <line x1={x0} y1={y0} x2={548} y2={y0} {...ink} />
        {[25, 50, 75, 100].map((v) => (
          <g key={v}>
            <line x1={x0 - 5} y1={Y(v)} x2={x0} y2={Y(v)} {...ink} />
            <Num x={x0 - 9} y={Y(v) + 4} size={13} anchor="end">{`$${v}`}</Num>
          </g>
        ))}
        <PatentKey x={x0 + 8} y={18} size={12} anchor="start">
          Willingness to pay
        </PatentKey>
        {WTP10.map((w, i) => {
          const p = plan[i];
          const x = bx(i);
          if (p === null) return <rect key={i} x={x} y={Y(w)} width={bw} height={r2(y0 - Y(w))} fill="none" {...hair} strokeDasharray="3 2.5" />;
          const extra = pricing === "personalized" && p > uni ? p : null;
          return (
            <g key={i}>
              <rect x={x} y={Y(p)} width={bw} height={r2(y0 - Y(p))} fill={stip(id, "dense")} stroke="none" />
              {extra ? <rect x={x} y={Y(extra)} width={bw} height={r2(Y(uni) - Y(extra))} fill={PAT.paper} stroke="none" /> : null}
              {extra ? <rect x={x} y={Y(extra)} width={bw} height={r2(Y(uni) - Y(extra))} fill={stip(id, "signal")} stroke="none" /> : null}
              {w > p ? <rect x={x} y={Y(w)} width={bw} height={r2(Y(p) - Y(w))} fill={stip(id, "light")} stroke="none" /> : null}
              <rect x={x} y={Y(w)} width={bw} height={r2(y0 - Y(w))} fill="none" {...ink} />
              <line x1={x - 2} y1={Y(p)} x2={x + bw + 2} y2={Y(p)} stroke={extra ? R : PAT.ink} strokeWidth={LINE.bold} />
            </g>
          );
        })}
        {pricing === "personalized" ? (
          <line x1={bx(0) - 6} y1={Y(uni)} x2={bx(9) + bw + 6} y2={Y(uni)} {...hair} strokeDasharray={CENTRE_DASH} />
        ) : null}
        {supply === "fixed" ? (
          <g>
            <ObliqueBox id={id} x={r2(bx(4) - gap / 2 - 3)} y={30} w={6} h={170} dx={6} dy={4} />
            <PatentKey x={r2(bx(4) + 12)} y={44} size={11} anchor="start">
              Fixed supply
            </PatentKey>
          </g>
        ) : null}
        {/* readouts */}
        <line x1={14} y1={222} x2={546} y2={222} {...hair} />
        <PatentKey x={x0} y={250} size={11} anchor="start">
          Units sold
        </PatentKey>
        <Num x={x0 + 118} y={252} size={18} anchor="start">{`${sold}`}</Num>
        <PatentKey x={210} y={250} size={11} anchor="start">
          Surplus
        </PatentKey>
        <Num x={292} y={252} size={18} anchor="start" fill={pricing === "personalized" ? R : PAT.ink}>{`$${cs}`}</Num>
        <PatentKey x={370} y={250} size={11} anchor="start">
          Welfare
        </PatentKey>
        <Num x={548} y={252} size={18} anchor="end">{`$${welfare}`}</Num>
      </Frame>
      <Segmented
        label="Pricing"
        options={[
          { id: "uniform", label: "One price" },
          { id: "personalized", label: "Personalized" },
        ]}
        value={pricing}
        onChange={setPricing}
      />
      <Segmented
        label="Supply"
        options={[
          { id: "expand", label: "Output expands" },
          { id: "fixed", label: "Fixed supply" },
        ]}
        value={supply}
        onChange={setSupply}
      />
    </div>
  );
}

/** A small sheet standing upright, signed (an agreement) or not (a goal), (x, y) top-left. */
function Agreement({ x, y, w = 60, h = 52, stroke = PAT.ink, signed = true }: { x: number; y: number; w?: number; h?: number; stroke?: string; signed?: boolean }) {
  return (
    <g>
      <path d={`M${x} ${y}H${x + w - 9}L${x + w} ${y + 9}V${y + h}H${x}Z`} fill={PAT.paper} {...ink} stroke={stroke} />
      <path d={`M${x + w - 9} ${y}V${y + 9}H${x + w}`} fill="none" {...hair} stroke={stroke} />
      {[12, 20, 28].map((d) => (
        <line key={d} x1={x + 7} y1={y + d} x2={x + w - 12} y2={y + d} {...hair} stroke={stroke} />
      ))}
      {signed ? <path d={`M${x + 7} ${y + h - 9}q4 -6 7 0t7 -2`} fill="none" {...hair} stroke={stroke} /> : null}
      {signed ? <path d={`M${x + w - 24} ${y + h - 9}q4 -6 7 0t7 -2`} fill="none" {...hair} stroke={stroke} /> : null}
    </g>
  );
}

/**
 * The four pathways of Ezrachi and Stucke (2016), one small mechanism each.
 * Messenger: a signed price-fixing agreement (red) drives two pricing
 * housings. Hub-and-Spoke: three rival shops feed one shared vendor engine
 * (red) that sets all their prices. Predictable Agent: two rule-based
 * housings, cut open to show a price slider that can fall only to a fixed
 * margin floor (red), and a window on the rival's price it matches. Autonomous Machine: two learning housings, each
 * given only its own goal sheet, with nothing shared. Their prices settle
 * equal and high (red).
 */
export function Pathway({ kind }: { kind: "messenger" | "hub" | "predictable" | "autonomous" }) {
  const id = `w9-path-${kind}`;
  const label = {
    messenger: "Patent drawing of the Messenger pathway: a red signed price-fixing agreement with centre lines running down into two pricing algorithm housings, each issuing the same $9.40 tag.",
    hub: "Patent drawing of the Hub-and-Spoke pathway: three rival shopfronts, each piped into one shared red vendor engine at the centre, which returns prices to all three.",
    predictable: "Patent drawing of the Predictable Agent pathway: two rule-based pricing housings cut open, each with a price slider on a rail that can only fall as far as a red margin floor stop, and a round window showing the rival's $9.40 price.",
    autonomous: "Patent drawing of the Autonomous Machine pathway: two separate learning pricing housings, each fed only by its own goal sheet and sharing nothing, both issuing the same high red $9.40 tag.",
  }[kind];
  return (
    <Frame width={250} height={180} label={label}>
      <PatentDefs id={id} />
      {kind === "messenger" ? (
        <g>
          <Agreement x={95} y={8} stroke={R} />
          <line x1={112} y1={60} x2={60} y2={86} {...hair} strokeDasharray={CENTRE_DASH} />
          <line x1={138} y1={60} x2={190} y2={86} {...hair} strokeDasharray={CENTRE_DASH} />
          <SmallModel id={id} x={22} y={92} w={58} h={54} />
          <SmallModel id={id} x={160} y={92} w={58} h={54} />
          <Tag cx={56} cy={166} text="$9.40" w={46} size={13} />
          <Tag cx={194} cy={166} text="$9.40" w={46} size={13} />
        </g>
      ) : kind === "hub" ? (
        <g>
          {[
            [10, 62],
            [99, 26],
            [188, 62],
          ].map(([x, y], i) => (
            <Shopfront key={i} id={id} x={x} y={y + 40} w={46} h={36} />
          ))}
          <path d="M33 106V136H101" fill="none" {...ink} />
          <path d="M122 70V122" fill="none" {...ink} />
          <path d="M211 106V136H149" fill="none" {...ink} />
          <ObliqueBox id={id} x={101} y={122} w={48} h={44} dx={10} dy={6} stroke={R} front={stip(id, "signal")} />
          <Gear cx={125} cy={144} r={11} n={9} />
        </g>
      ) : kind === "predictable" ? (
        <g>
          {[12, 132].map((x) => (
            <g key={x}>
              <ObliqueBox id={id} x={x} y={30} w={96} h={112} dx={10} dy={6} />
              <path d={`M${x + 16} 42V130`} {...ink} fill="none" />
              <rect x={x + 7} y={74} width={18} height={11} fill={PAT.paper} {...ink} />
              <ObliqueBox id={id} x={x + 7} y={110} w={18} h={9} dx={4} dy={3} stroke={R} front={stip(id, "signal")} />
              {[46, 58, 70, 90, 102].map((y) => (
                <line key={y} x1={x + 16} y1={y} x2={x + 21} y2={y} {...hair} />
              ))}
              <circle cx={x + 61} cy={82} r={29} fill={PAT.paper} {...ink} />
              <circle cx={x + 61} cy={82} r={26} fill="none" {...hair} />
              <Tag cx={x + 66} cy={82} text="$9.40" w={36} size={12} />
            </g>
          ))}
          <PatentKey x={125} y={168} size={12} fill={R}>
            Margin floor
          </PatentKey>
        </g>
      ) : (
        <g>
          {[18, 142].map((x) => (
            <g key={x}>
              <Agreement x={x + 10} y={8} w={50} h={40} signed={false} />
              <line x1={x + 35} y1={50} x2={x + 35} y2={68} {...ink} />
              <path d={headAlongPath(x + 35, 72, 0, 1, 7)} fill="none" {...ink} />
              <SmallModel id={id} x={x} y={78} w={70} h={64} />
              <Tag cx={x + 40} cy={164} text="$9.40" w={46} size={13} red />
            </g>
          ))}
          <line x1={125} y1={8} x2={125} y2={174} {...hair} strokeDasharray={CENTRE_DASH} />
        </g>
      )}
    </Frame>
  );
}

/**
 * Then and now. Left: a shelf of four identical products, each with the same
 * paper tag, and a clerk reaching in to change one by hand. Right: the
 * pricing algorithm fed by four live inputs, writing a tag onto a web page as
 * it loads.
 */
export function PricingThenNow() {
  const id = "w9-thennow";
  const inputs = [
    { key: "Competitor prices", y: 44 },
    { key: "Inventory levels", y: 86 },
    { key: "Search traffic", y: 128 },
    { key: "Customer telemetry", y: 170 },
  ];
  const hx = 610;
  const hy = 72;
  return (
    <Frame
      width={800}
      height={226}
      label="Patent drawing in two figures. Left, physical menu or shelf updates: four identical boxed products on a shelf, each with the same $4.99 paper tag, and a clerk reaching in to swap one tag by hand. Right, milliseconds before a page loads: a pricing algorithm housing fed by four lines from competitor prices (a rival tag), inventory levels (stacked cartons), search traffic (a lens) and customer telemetry (a phone), writing a red $5.37 tag onto a web page."
    >
      <PatentDefs id={id} />
      {/* ---- then: the shelf ---- */}
      <g transform="translate(-8 0)">
      {[30, 82, 134, 186].map((x) => (
        <ObliqueBox key={x} id={id} x={x} y={84} w={36} h={54} dx={8} dy={5} />
      ))}
      <ObliqueBox id={id} x={20} y={138} w={250} h={12} dx={10} dy={6} />
      {[50, 102, 154, 206].map((cx) => (
        <g key={cx}>
          <line x1={cx - 16} y1={150} x2={cx - 16} y2={160} {...hair} />
          <Tag cx={cx + 4} cy={170} text="$4.99" w={34} size={11} />
        </g>
      ))}
      <Figure id={id} x={318} y={198} s={1.45} arm="reach" flip />
      <Tag cx={268} cy={118} text="$4.99" w={34} size={11} />
      <FigureName x={160} y={218} size={14}>
        physical menu or shelf updates
      </FigureName>
      </g>

      {/* ---- now: inputs, housing, page ---- */}
      <line x1={329} y1={14} x2={329} y2={212} {...hair} strokeDasharray={CENTRE_DASH} />
      {inputs.map((p, i) => (
        <g key={p.key}>
          <PatentKey x={525} y={p.y + 4} size={11} anchor="end">
            {p.key}
          </PatentKey>
          <line x1={566} y1={p.y} x2={hx} y2={r2(hy + 14 + i * 14)} {...hair} />
          <circle cx={hx} cy={r2(hy + 14 + i * 14)} r={1.6} fill={PAT.ink} />
        </g>
      ))}
      {/* competitor price: a small rival tag */}
      <path d="M536 37H560V51H536L529 44Z" fill={PAT.paper} {...ink} />
      <circle cx={534} cy={44} r={1.4} fill="none" {...hair} />
      {/* inventory: stacked cartons */}
      <ObliqueBox id={id} x={532} y={84} w={12} h={10} dx={4} dy={3} />
      <ObliqueBox id={id} x={546} y={84} w={12} h={10} dx={4} dy={3} />
      <ObliqueBox id={id} x={539} y={74} w={12} h={10} dx={4} dy={3} />
      {/* search traffic: a lens */}
      <Lens id={id} cx={545} cy={125} r={9} a={0.8} handle={9} />
      {/* customer telemetry: a phone */}
      <rect x={538} y={159} width={14} height={23} rx={2.5} fill={PAT.paper} {...ink} />
      <line x1={542} y1={178} x2={548} y2={178} {...hair} />
      <path d="M556 163Q560 167 556 171M559 160Q565 167 559 174" fill="none" {...hair} />
      <SmallModel id={id} x={hx} y={hy} w={70} h={70} />
      {/* output to the page */}
      <line x1={690} y1={104} x2={712} y2={104} {...ink} />
      <path d={headAlongPath(714, 104, 1, 0, 7)} fill="none" {...ink} />
      <rect x={718} y={46} width={72} height={112} fill={PAT.paper} {...ink} />
      <line x1={718} y1={58} x2={790} y2={58} {...hair} />
      {[0, 1, 2].map((k) => (
        <circle key={k} cx={724 + k * 6} cy={52} r={1.6} fill="none" {...hair} />
      ))}
      <rect x={728} y={66} width={52} height={34} fill={stip(id, "light")} {...hair} />
      <line x1={728} y1={110} x2={776} y2={110} {...hair} />
      <line x1={728} y1={118} x2={764} y2={118} {...hair} />
      <Tag cx={758} cy={138} text="$5.37" w={44} size={12} red />
      <FigureName x={590} y={218} size={14}>
        milliseconds before a page loads
      </FigureName>
    </Frame>
  );
}

/**
 * One shopper's reservation price ($70, the upright line under the bust)
 * and the seller's estimate of it, drawn as a red stippled bell. With a few
 * observed variables the estimate is the segment's average and wide. As the
 * variables add up it narrows onto the individual. The price is set at the
 * estimate, and the shopper keeps only the gap: the consumer surplus left.
 */
const VARS = [1, 3, 10, 30, 100, 300];

export function ReservationEstimate() {
  const [k, setK] = useState(1);
  const id = "w9-estimate";
  const n = VARS[k];
  const truth = 70;
  const mean = r2(truth - 26 / Math.sqrt(n));
  const sd = r2(Math.max(16 / Math.sqrt(n), 1.4));
  const ax = 150;
  const X = (v: number) => r2(24 + ((v - 20) / 80) * 352);
  const peak = Math.min(92, r2(440 / sd));
  const bell = Array.from({ length: 121 }, (_, i) => {
    const v = 20 + (i * 80) / 120;
    const yy = ax - peak * Math.exp(-0.5 * ((v - mean) / sd) ** 2);
    return `${X(v)} ${r2(yy)}`;
  });
  const price = Math.round(mean);
  const left = truth - price;
  return (
    <div>
      <Frame
        width={400}
        height={210}
        label={`Patent drawing of one shopper's reservation price of $70, an upright line under a bust, and the seller's estimate of it from ${n} observed variable${n > 1 ? "s" : ""}, a red stippled bell centred on $${price}. The shopper keeps $${left} of consumer surplus.`}
      >
        <PatentDefs id={id} />
        <path d={`M${bell.join("L")}`} fill={stip(id, "signal")} stroke={R} strokeWidth={LINE.outline} style={{ transition: "all 300ms ease" }} />
        <line x1={14} y1={ax} x2={386} y2={ax} {...ink} />
        {[20, 40, 60, 80, 100].map((v) => (
          <g key={v}>
            <line x1={X(v)} y1={ax} x2={X(v)} y2={ax + 5} {...ink} />
            <Num x={X(v)} y={ax + 20} size={13}>{`$${v}`}</Num>
          </g>
        ))}
        {/* the shopper's reservation price */}
        <line x1={X(truth)} y1={44} x2={X(truth)} y2={ax} {...ink} strokeWidth={LINE.bold} />
        <Bust cx={X(truth)} y={40} s={1.1} fill={stip(id, "light")} />
        <PatentKey x={r2(X(truth) - 16)} y={24} size={11} anchor="end">
          Reservation price
        </PatentKey>
        {/* the surplus left */}
        {left > 0 ? (
          <>
            <path d={`M${X(price)} ${ax + 30}V${ax + 36}H${X(truth)}V${ax + 30}`} fill="none" {...ink} />
            <Num x={r2((X(price) + X(truth)) / 2)} y={ax + 51} size={13}>{`$${left}`}</Num>
          </>
        ) : null}
      </Frame>
      <Slider
        label="Variables observed"
        value={k}
        min={0}
        max={VARS.length - 1}
        onChange={setK}
        formatValue={(v) => `${VARS[v]}`}
      />
    </div>
  );
}

/**
 * Left: a verifiable eligibility rule, a notice pinned up for anyone to read
 * (STUDENT −20%), and a shopper holding the student card it asks for. Right:
 * an opaque algorithmic score, a sealed housing with screwed plates. Its
 * criteria run inside as hidden (dashed, red) routes to a dial, and a price
 * comes out with nothing on the face to say why.
 */
export function RuleVsScore() {
  const id = "w9-rulescore";
  return (
    <Frame
      width={560}
      height={222}
      label="Patent drawing in two figures. Verifiable eligibility rules: a pinned notice reading student −20% with hairline terms beneath, and a shopper holding up a student card. Opaque algorithmic scores: a sealed, screwed housing with a score dial. Its criteria run inside as hidden red dashed routes, and a $93 tag comes out of it."
    >
      <PatentDefs id={id} />
      {/* the notice */}
      <path d="M36 22H160V150H36Z" fill={PAT.paper} {...ink} />
      <path d="M160 22L166 26V154L160 150Z" fill={stip(id, "dense")} {...ink} />
      <circle cx={98} cy={30} r={3} fill={stip(id, "dense")} {...ink} />
      <PatentKey x={98} y={56} size={13}>
        Student
      </PatentKey>
      <text x={98} y={86} textAnchor="middle" fontFamily="var(--font-body)" fontSize={26} fill={PAT.ink}>
        −20%
      </text>
      {[104, 116, 128, 140].map((y, i) => (
        <line key={y} x1={50} y1={y} x2={146 - (i % 2) * 22} y2={y} {...hair} />
      ))}
      <Figure id={id} x={218} y={196} s={1.45} arm="raise" flip />
      <rect x={168} y={62} width={30} height={20} fill={PAT.paper} {...ink} />
      <rect x={172} y={66} width={8} height={10} fill={stip(id, "light")} {...hair} />
      <line x1={184} y1={69} x2={194} y2={69} {...hair} />
      <line x1={184} y1={74} x2={192} y2={74} {...hair} />
      <FigureName x={122} y={214} size={14}>
        verifiable eligibility rules
      </FigureName>

      <line x1={280} y1={12} x2={280} y2={200} {...hair} strokeDasharray={CENTRE_DASH} />

      {/* the sealed score */}
      <ObliqueBox id={id} x={318} y={52} w={124} h={104} dx={14} dy={9} />
      {[[326, 60], [434, 60], [326, 148], [434, 148]].map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r={2.6} fill={PAT.paper} {...hair} />
          <line x1={cx - 1.8} y1={cy - 1.8} x2={cx + 1.8} y2={cy + 1.8} {...hair} />
        </g>
      ))}
      {[74, 98, 122].map((y, i) => (
        <path key={y} d={`M318 ${y}H${346 + i * 6}L366 104H380`} fill="none" stroke={R} strokeWidth={LINE.hair} strokeDasharray="4 3" />
      ))}
      <Dial cx={404} cy={104} r={20} deg={48} />
      <line x1={456} y1={104} x2={478} y2={104} {...ink} />
      <path d={headAlongPath(482, 104, 1, 0, 8)} fill="none" {...ink} />
      <Tag cx={518} cy={104} text="$93" w={40} size={15} red />
      <FigureName x={410} y={214} size={14}>
        opaque algorithmic scores
      </FigureName>
    </Frame>
  );
}

/**
 * The fare for the same ride across one day, for two shoppers. Dynamic: one
 * fare that rises with the morning and evening peaks, the same for both at
 * any moment. Personalized: each shopper has their own fare at every moment
 * (red, the higher one). The slider moves the moment. The tags over the two
 * shoppers read the fare each sees then.
 */
const dynFare = (t: number) =>
  20 + 13 * Math.exp(-(((t - 8.5) / 1.3) ** 2)) + 17 * Math.exp(-(((t - 18) / 1.6) ** 2));
const fmtTime = (t: number) => `${Math.floor(t)}:${t % 1 ? "30" : "00"}`;

export function SameMoment() {
  const [mode, setMode] = useState<"dynamic" | "personalized">("dynamic");
  const [t, setT] = useState(18);
  const id = "w9-moment";
  const x0 = 54;
  const x1 = 372;
  const y0 = 214;
  const yTop = 34;
  const X = (h: number) => r2(x0 + ((h - 6) / 18) * (x1 - x0));
  const Y = (p: number) => r2(y0 - (p / 40) * (y0 - yTop));
  const hours = Array.from({ length: 73 }, (_, i) => 6 + i * 0.25);
  const fareA = (h: number) => (mode === "dynamic" ? dynFare(h) : 21);
  const fareB = (h: number) => (mode === "dynamic" ? dynFare(h) : 32);
  const path = (f: (h: number) => number) => `M${hours.map((h) => `${X(h)} ${Y(f(h))}`).join("L")}`;
  const a = Math.round(fareA(t));
  const b = Math.round(fareB(t));
  const split = mode === "personalized";
  return (
    <div>
      <Frame
        width={560}
        height={262}
        label={
          split
            ? `Patent drawing of personalized pricing: the fare for the same ride across a day, drawn as two flat lines, one for each shopper, $21 and a red $32. At ${fmtTime(t)} the two shoppers standing side by side see different tags, $${a} and $${b}.`
            : `Patent drawing of dynamic pricing: the fare for the same ride across a day, one line that rises to a morning peak near 8:30 and an evening peak near 18:00. At ${fmtTime(t)} the two shoppers standing side by side see the same tag, $${a}.`
        }
      >
        <PatentDefs id={id} />
        {/* axes */}
        <line x1={x0} y1={yTop - 8} x2={x0} y2={y0} {...ink} />
        <line x1={x0} y1={y0} x2={x1 + 6} y2={y0} {...ink} />
        {[10, 20, 30, 40].map((p) => (
          <g key={p}>
            <line x1={x0 - 5} y1={Y(p)} x2={x0} y2={Y(p)} {...ink} />
            <Num x={x0 - 9} y={Y(p) + 4} size={13} anchor="end">{`$${p}`}</Num>
          </g>
        ))}
        {[6, 12, 18, 24].map((h) => (
          <g key={h}>
            <line x1={X(h)} y1={y0} x2={X(h)} y2={y0 + 5} {...ink} />
            <Num x={X(h)} y={y0 + 20} size={13}>{`${h}:00`}</Num>
          </g>
        ))}
        <PatentKey x={x0 + 8} y={yTop - 14} size={12} anchor="start">
          Fare for the same ride
        </PatentKey>
        <PatentKey x={x1 + 4} y={y0 + 40} size={12} anchor="end">
          Time of day
        </PatentKey>
        {/* the fares */}
        {split ? (
          <>
            <path d={path(fareA)} fill="none" {...ink} strokeWidth={LINE.bold} />
            <path d={path(fareB)} fill="none" stroke={R} strokeWidth={LINE.bold} strokeLinecap="round" />
          </>
        ) : (
          <>
            <path d={`${path(fareA)}L${X(24)} ${y0}L${X(6)} ${y0}Z`} fill={stip(id, "light")} stroke="none" />
            <path d={path(fareA)} fill="none" {...ink} strokeWidth={LINE.bold} />
          </>
        )}
        {/* the moment */}
        <line x1={X(t)} y1={yTop - 4} x2={X(t)} y2={y0} {...hair} strokeDasharray={CENTRE_DASH} />
        <circle cx={X(t)} cy={Y(fareA(t))} r={3.2} fill={PAT.paper} {...ink} />
        {split ? <circle cx={X(t)} cy={Y(fareB(t))} r={3.2} fill={PAT.paper} stroke={R} strokeWidth={LINE.outline} /> : null}
        {/* the two shoppers at that moment */}
        <Num x={466} y={30} size={15}>
          {fmtTime(t)}
        </Num>
        <Tag cx={434} cy={68} text={`$${a}`} w={46} size={15} />
        <Tag cx={506} cy={68} text={`$${b}`} w={46} size={15} red={split} />
        <line x1={428} y1={81} x2={428} y2={95} {...hair} />
        <line x1={500} y1={81} x2={500} y2={95} {...hair} />
        <Figure id={id} x={428} y={226} s={1.5} arm="reach" coat="light" />
        <Figure id={id} x={500} y={226} s={1.5} arm="reach" coat="dense" />
        <rect x={469} y={136} width={9} height={15} rx={1.5} fill={PAT.paper} {...ink} />
        <rect x={541} y={136} width={9} height={15} rx={1.5} fill={PAT.paper} {...ink} />
      </Frame>
      <Segmented
        label="Pricing"
        options={[
          { id: "dynamic", label: "Dynamic" },
          { id: "personalized", label: "Personalized" },
        ]}
        value={mode}
        onChange={setMode}
      />
      <Slider label="Moment" value={t} min={6} max={24} step={0.5} onChange={setT} formatValue={fmtTime} />
    </div>
  );
}

/** A shopper in bust form for crowds and slices: head and shoulders, centred on cx, base at y. */
function Bust({ cx, y, s = 1, stroke = PAT.ink, fill = PAT.paper }: { cx: number; y: number; s?: number; stroke?: string; fill?: string }) {
  return (
    <g>
      <path
        d={`M${r2(cx - 8 * s)} ${y}V${r2(y - 6 * s)}Q${r2(cx - 8 * s)} ${r2(y - 12 * s)} ${cx} ${r2(y - 12 * s)}Q${r2(cx + 8 * s)} ${r2(y - 12 * s)} ${r2(cx + 8 * s)} ${r2(y - 6 * s)}V${y}`}
        fill={fill}
        stroke={stroke}
        strokeWidth={LINE.outline}
        strokeLinejoin="round"
      />
      <circle cx={cx} cy={r2(y - 17 * s)} r={r2(4.6 * s)} fill={PAT.paper} stroke={stroke} strokeWidth={LINE.outline} />
    </g>
  );
}

/**
 * The market cut into slices, one tag per slice. Brick-and-mortar retail
 * cuts the twelve shoppers into three segments with three prices. Machine
 * learning and digital tracking cut them into twelve slices, one shopper
 * each, every tag (red) at that shopper's own willingness to pay.
 */
const WTP12 = [31, 36, 40, 44, 47, 52, 55, 59, 63, 68, 72, 79];

export function SieveStack() {
  const id = "w9-slices";
  const X0 = 30;
  const W = 440;
  const row = (y: number, n: number, gap: number, red: boolean) => {
    const sw = (W - (n - 1) * gap) / n;
    const per = 12 / n;
    return Array.from({ length: n }, (_, i) => {
      const x = r2(X0 + i * (sw + gap));
      const price = WTP12[i * per];
      const tw = n > 3 ? 30 : 46;
      const drop = n > 3 && i % 2 ? 22 : 0;
      return (
        <g key={i}>
          <ObliqueBox id={id} x={x} y={y} w={r2(sw)} h={50} dx={7} dy={5} />
          {Array.from({ length: per }, (_, j) => (
            <Bust key={j} cx={r2(x + (sw / per) * (j + 0.5))} y={y + 46} s={0.95} />
          ))}
          <line x1={r2(x + sw / 2)} y1={y + 50} x2={r2(x + sw / 2)} y2={y + 60 + drop} {...hair} stroke={red ? R : PAT.ink} />
          <Tag cx={r2(x + sw / 2 + 4)} cy={y + 72 + drop} text={`$${price}`} w={tw} size={n > 3 ? 12 : 13} red={red} />
        </g>
      );
    });
  };
  return (
    <Frame
      width={500}
      height={318}
      label="Patent drawing of the same twelve shoppers cut into slices, one price tag per slice. Brick-and-mortar retail: three slices of four shoppers each, tagged $31, $47 and $63. Machine learning and digital tracking: twelve slices of one shopper each, every tag in red at that shopper's own willingness to pay, from $31 to $79."
    >
      <PatentDefs id={id} />
      <PatentKey x={X0} y={24} size={12} anchor="start">
        Brick-and-mortar retail
      </PatentKey>
      {row(50, 3, 18, false)}
      <line x1={X0} y1={156} x2={X0 + W + 10} y2={156} {...hair} strokeDasharray={CENTRE_DASH} />
      <PatentKey x={X0} y={184} size={12} anchor="start">
        Machine learning and digital tracking
      </PatentKey>
      {row(208, 12, 6, true)}
    </Frame>
  );
}

/** A hotel row on a results page: a small house, a name rule, stars and the price. (x, y) top-left. */
function HotelRow({ x, y, w, stars, price, red = false }: { x: number; y: number; w: number; stars: number; price: number; red?: boolean }) {
  const c = red ? R : PAT.ink;
  return (
    <g>
      <rect x={x} y={y} width={w} height={38} fill={PAT.paper} stroke={c} strokeWidth={red ? LINE.bold : LINE.outline} />
      <path d={`M${x + 10} ${y + 31}V${y + 17}L${x + 21} ${y + 8}L${x + 32} ${y + 17}V${y + 31}Z`} fill={PAT.paper} {...ink} stroke={c} />
      <rect x={x + 18} y={y + 23} width={6} height={8} fill={PAT.paper} {...hair} />
      <line x1={x + 44} y1={y + 13} x2={x + 128} y2={y + 13} {...ink} />
      {Array.from({ length: 5 }, (_, j) => (
        <path key={j} d={star(x + 48 + j * 10, y + 26, 3.6)} fill={j < stars ? PAT.ink : PAT.paper} stroke={PAT.ink} strokeWidth={LINE.hair} strokeLinejoin="round" />
      ))}
      <Num x={x + w - 10} y={y + 25} size={15} anchor="end" fill={c}>{`$${price}`}</Num>
    </g>
  );
}

/**
 * Search steering. A results page lists the same five hotels at the same
 * prices for every shopper. Only the order changes. For a shopper predicted
 * to be price-sensitive the cheapest rooms lead. For one predicted to be
 * price-insensitive the costliest lead (the top slot in red). The product
 * page beside it shows the same $189 for both.
 */
const HOTELS = [
  { stars: 3, price: 89 },
  { stars: 3, price: 112 },
  { stars: 4, price: 139 },
  { stars: 4, price: 189 },
  { stars: 5, price: 245 },
];

export function SteeredResults() {
  const [who, setWho] = useState<"sensitive" | "insensitive">("sensitive");
  const id = "w9-steer";
  const order = who === "sensitive" ? [0, 1, 2, 3, 4] : [4, 3, 2, 1, 0];
  const wx = 46;
  const ww = 270;
  const top = 46;
  return (
    <div>
      <Frame
        width={560}
        height={272}
        label={`Patent drawing of a search results page listing the same five hotels at $89, $112, $139, $189 and $245. For a shopper predicted to be ${who === "sensitive" ? "price-sensitive, the cheapest room leads the list" : "price-insensitive, the costliest room, $245, leads the list in red"}. Beside it, the product page for one hotel shows the same $189 for every shopper.`}
      >
        <PatentDefs id={id} />
        {/* results window */}
        <rect x={wx - 14} y={14} width={ww + 28} height={250} fill={PAT.paper} {...ink} />
        <line x1={wx - 14} y1={30} x2={wx + ww + 14} y2={30} {...hair} />
        {[0, 1, 2].map((k) => (
          <circle key={k} cx={wx - 6 + k * 7} cy={22} r={2} fill="none" {...hair} />
        ))}
        {[1, 2, 3, 4, 5].map((n, i) => (
          <Num key={n} x={wx - 22 + 4} y={top + i * 42 + 24} size={13}>
            {n}
          </Num>
        ))}
        {HOTELS.map((h, k) => {
          const slot = order.indexOf(k);
          return (
            <g key={k} style={{ transform: `translateY(${slot * 42}px)`, transition: "transform 500ms ease" }}>
              <HotelRow x={wx} y={top} w={ww} stars={h.stars} price={h.price} red={slot === 0 && who === "insensitive"} />
            </g>
          );
        })}
        {/* the product page */}
        <g transform="translate(0 -18)">
        <rect x={370} y={58} width={170} height={190} fill={PAT.paper} {...ink} />
        <line x1={370} y1={74} x2={540} y2={74} {...hair} />
        {[0, 1, 2].map((k) => (
          <circle key={k} cx={378 + k * 7} cy={66} r={2} fill="none" {...hair} />
        ))}
        <path d="M402 168V128L436 100L470 128V168Z" fill={PAT.paper} {...ink} />
        <path d="M436 100L452 90L486 118L470 128Z" fill={stip(id, "light")} {...ink} />
        <path d="M470 128L486 118V158L470 168Z" fill={stip(id, "dense")} {...ink} />
        <rect x={428} y={146} width={16} height={22} fill={PAT.paper} {...hair} />
        <line x1={386} y1={186} x2={490} y2={186} {...ink} />
        {Array.from({ length: 5 }, (_, j) => (
          <path key={j} d={star(392 + j * 12, 204, 4.4)} fill={j < 4 ? PAT.ink : PAT.paper} stroke={PAT.ink} strokeWidth={LINE.hair} strokeLinejoin="round" />
        ))}
        <Num x={526} y={232} size={22} anchor="end">
          $189
        </Num>
        <PatentKey x={455} y={274} size={12}>
          Product page
        </PatentKey>
        </g>
      </Frame>
      <Segmented
        label="Shopper predicted"
        options={[
          { id: "sensitive", label: "Price-sensitive" },
          { id: "insensitive", label: "Price-insensitive" },
        ]}
        value={who}
        onChange={setWho}
      />
    </div>
  );
}

/**
 * Twelve buyers as upright bars at their willingness to pay, highest first.
 * Each degree of discrimination sets the price each buyer pays (a bold rule
 * across the bar): what they pay is the seller's revenue (dense stipple),
 * what they keep is consumer surplus (light stipple), and a buyer priced out
 * stands in dashed outline. Second degree offers an economy version worth at
 * most $45 to anyone. The part of a bar above $45 is the value forgone.
 */
const WTP_BARS = [92, 84, 78, 70, 64, 58, 52, 46, 40, 34, 28, 22];
type Degree = "uniform" | "second" | "third" | "first";

function degreePlan(d: Degree) {
  return WTP_BARS.map((w, i) => {
    if (d === "uniform") return w >= 46 ? { pay: 46, value: w, tier: "" } : null;
    if (d === "third") {
      const p = i >= 6 ? 28 : 58;
      return w >= p ? { pay: p, value: w, tier: i >= 6 ? "student" : "full" } : null;
    }
    if (d === "second") {
      if (w - 58 >= Math.min(w, 45) - 34) return { pay: 58, value: w, tier: "business" };
      if (Math.min(w, 45) >= 34) return { pay: 34, value: Math.min(w, 45), tier: "economy" };
      return null;
    }
    return { pay: w, value: w, tier: "" };
  });
}

export function SurplusCapture() {
  const [d, setD] = useState<Degree>("uniform");
  const id = "w9-surplus";
  const plan = degreePlan(d);
  const x0 = 56;
  const bw = 34;
  const gap = 6;
  const y0 = 206;
  const Y = (v: number) => r2(y0 - (v / 100) * 170);
  const bx = (i: number) => x0 + 8 + i * (bw + gap);
  const cs = plan.reduce((u, p) => u + (p ? p.value - p.pay : 0), 0);
  const rev = plan.reduce((u, p) => u + (p ? p.pay : 0), 0);
  const served = plan.filter(Boolean).length;
  // contiguous groups for the brackets under the bars
  const groups: { tier: string; a: number; b: number }[] = [];
  plan.forEach((p, i) => {
    const t = p?.tier ?? "";
    if (!t) return;
    const g = groups[groups.length - 1];
    if (g && g.tier === t && g.b === i - 1) g.b = i;
    else groups.push({ tier: t, a: i, b: i });
  });
  const tierKey: Record<string, string> = { student: "Student", full: "Full price", business: "Business", economy: "Economy" };
  return (
    <div>
      <Frame
        width={560}
        height={292}
        label={`Patent drawing of twelve buyers drawn as bars at their willingness to pay, from $92 down to $22, under ${d === "uniform" ? "one uniform price of $46" : d === "second" ? "second-degree price discrimination: a business version at $58 and an economy version at $34 worth at most $45" : d === "third" ? "third-degree price discrimination: $58 full price and a $28 student price" : "first-degree price discrimination: each buyer pays exactly their willingness to pay"}. ${served} of 12 buyers are served. Consumer surplus is $${cs} and seller revenue $${rev}.`}
      >
        <PatentDefs id={id} />
        <line x1={x0} y1={22} x2={x0} y2={y0} {...ink} />
        <line x1={x0} y1={y0} x2={548} y2={y0} {...ink} />
        {[25, 50, 75, 100].map((v) => (
          <g key={v}>
            <line x1={x0 - 5} y1={Y(v)} x2={x0} y2={Y(v)} {...ink} />
            <Num x={x0 - 9} y={Y(v) + 4} size={13} anchor="end">{`$${v}`}</Num>
          </g>
        ))}
        <PatentKey x={x0 + 8} y={18} size={12} anchor="start">
          Willingness to pay
        </PatentKey>
        {WTP_BARS.map((w, i) => {
          const p = plan[i];
          const x = bx(i);
          if (!p) return <rect key={i} x={x} y={Y(w)} width={bw} height={r2(y0 - Y(w))} fill="none" {...hair} strokeDasharray="3 2.5" />;
          return (
            <g key={i}>
              <rect x={x} y={Y(p.pay)} width={bw} height={r2(y0 - Y(p.pay))} fill={stip(id, "dense")} stroke="none" />
              {p.value > p.pay ? <rect x={x} y={Y(p.value)} width={bw} height={r2(Y(p.pay) - Y(p.value))} fill={stip(id, "light")} stroke="none" /> : null}
              <rect x={x} y={Y(w)} width={bw} height={r2(y0 - Y(w))} fill="none" {...ink} />
              {p.value < w ? <line x1={x} y1={Y(p.value)} x2={x + bw} y2={Y(p.value)} {...hair} strokeDasharray="3 2" /> : null}
              <line x1={x - 2} y1={Y(p.pay)} x2={x + bw + 2} y2={Y(p.pay)} {...ink} strokeWidth={LINE.bold} />
            </g>
          );
        })}
        {groups.map((g) => {
          const a = bx(g.a);
          const b = bx(g.b) + bw;
          return (
            <g key={g.tier + g.a}>
              <path d={`M${a} ${y0 + 6}V${y0 + 11}H${b}V${y0 + 6}`} fill="none" {...hair} />
              <PatentKey x={r2((a + b) / 2)} y={y0 + 26} size={11}>
                {tierKey[g.tier]}
              </PatentKey>
            </g>
          );
        })}
        {/* readouts */}
        <line x1={14} y1={244} x2={546} y2={244} {...hair} />
        <rect x={x0} y={259} width={14} height={14} fill={stip(id, "light")} {...hair} />
        <PatentKey x={x0 + 22} y={271} size={11} anchor="start">
          Consumer surplus
        </PatentKey>
        <Num x={x0 + 200} y={273} size={18} anchor="start" fill={cs === 0 ? R : PAT.ink}>{`$${cs}`}</Num>
        <rect x={322} y={259} width={14} height={14} fill={stip(id, "dense")} {...hair} />
        <PatentKey x={344} y={271} size={11} anchor="start">
          Revenue
        </PatentKey>
        <Num x={430} y={273} size={18} anchor="start">{`$${rev}`}</Num>
        <Num x={548} y={273} size={13} anchor="end">{`${served} of 12 buy`}</Num>
      </Frame>
      <Segmented
        label="Degree"
        options={[
          { id: "uniform", label: "One price" },
          { id: "third", label: "Third" },
          { id: "second", label: "Second" },
          { id: "first", label: "First" },
        ]}
        value={d}
        onChange={setD}
      />
    </div>
  );
}

/**
 * The running total of a retailer's profit from opaque personalized pricing,
 * against charging everyone one price, week by week. Before shoppers find
 * out, the extra margin piles up slowly (light stipple). From the week of
 * discovery, lost sales from the drop in brand trust pull the total below
 * zero and keep pulling (red). The slider sets how many weeks have passed
 * since discovery. The line ahead of it is dashed.
 */
const ledger = (wk: number) => {
  if (wk <= 0) return 2 * (wk + 26);
  const loss = 5 * wk + 9 * 2.5 * (1 - Math.exp(-wk / 2.5));
  return 52 - loss;
};

export function TrustLedger() {
  const [now, setNow] = useState(10);
  const id = "w9-ledger";
  const x0 = 64;
  const x1 = 620;
  const yz = 74;
  const X = (wk: number) => r2(x0 + ((wk + 26) / 78) * (x1 - x0));
  const Y = (v: number) => r2(yz - v * 0.42);
  const wks = Array.from({ length: 79 }, (_, i) => i - 26);
  const past = wks.filter((w) => w <= now);
  const ahead = wks.filter((w) => w >= now);
  const pts = (ws: number[]) => ws.map((w) => `${X(w)} ${Y(ledger(w))}`).join("L");
  const gain = wks.filter((w) => w <= Math.min(now, 0));
  const cross = 7;
  const v = Math.round(ledger(now));
  return (
    <div>
      <Frame
        width={640}
        height={196}
        label={`Patent drawing of the running total of extra profit from opaque personalized pricing over 78 weeks. Before discovery it climbs slowly to $52,000 in light stipple. After discovery it falls, crossing zero about ${cross} weeks later, and keeps falling in red. ${now} weeks after discovery the total stands at ${v < 0 ? "−" : ""}$${Math.abs(v)},000.`}
      >
        <PatentDefs id={id} />
        {/* gains before discovery */}
        <path d={`M${X(-26)} ${yz}L${pts(gain)}L${X(gain[gain.length - 1])} ${yz}Z`} fill={stip(id, "light")} stroke="none" />
        {/* losses after the total crosses zero */}
        {now > cross ? (
          <path
            d={`M${X(cross)} ${yz}L${pts(wks.filter((w) => w >= cross && w <= now))}L${X(now)} ${yz}Z`}
            fill={stip(id, "signal")}
            stroke="none"
          />
        ) : null}
        <line x1={x0} y1={yz} x2={x1 + 6} y2={yz} {...ink} />
        <line x1={x0} y1={14} x2={x0} y2={182} {...ink} />
        {[50, 0, -100, -200].map((t) => (
          <g key={t}>
            <line x1={x0 - 5} y1={Y(t)} x2={x0} y2={Y(t)} {...ink} />
            <Num x={x0 - 9} y={Y(t) + 4} size={13} anchor="end">{t === 0 ? "$0" : `${t < 0 ? "−" : "+"}$${Math.abs(t)}k`}</Num>
          </g>
        ))}
        <path d={`M${pts(past)}`} fill="none" stroke={now > 0 ? R : PAT.ink} strokeWidth={LINE.bold} strokeLinejoin="round" />
        <path d={`M${pts(gain)}`} fill="none" {...ink} strokeWidth={LINE.bold} />
        <path d={`M${pts(ahead)}`} fill="none" {...hair} strokeDasharray="4 3" />
        {/* discovery */}
        <line x1={X(0)} y1={16} x2={X(0)} y2={182} {...hair} strokeDasharray={CENTRE_DASH} />
        <PatentKey x={r2(X(0) + 8)} y={24} size={12} anchor="start">
          Discovery
        </PatentKey>
        <FigureName x={r2(X(-11))} y={r2(Y(52) - 9)} size={13}>
          short-term margin gains
        </FigureName>
        <FigureName x={r2(X(28))} y={r2(Y(-205))} size={13} anchor="end">
          lasting drop in brand trust
        </FigureName>
        <circle cx={X(now)} cy={Y(ledger(now))} r={3.4} fill={PAT.paper} stroke={now > 0 ? R : PAT.ink} strokeWidth={LINE.outline} />
        <Num x={x1} y={42} size={22} anchor="end" fill={v < 0 ? R : PAT.ink}>
          {`${v < 0 ? "−" : "+"}$${Math.abs(v)}k`}
        </Num>
      </Frame>
      <Slider label="Weeks since discovery" value={now} min={0} max={52} onChange={setNow} />
    </div>
  );
}
