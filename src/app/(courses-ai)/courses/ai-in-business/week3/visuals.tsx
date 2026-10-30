"use client";

import React, { useState } from "react";
import {
  Backpack,
  CheckCircle,
  CookingPot,
  FileText,
  Robot,
  Sneaker,
  Star,
  Storefront,
  SuitcaseRolling,
  User,
  XCircle,
} from "@phosphor-icons/react";
import { Arrow, C, Knob, Plate, hash, label, r2 } from "../_visuals/kit";

/* ==========================================================================
   WEEK 3 PLATES
   --------------------------------------------------------------------------
   Plain academic plates on the white slide: ink for structure, grey for
   secondary marks, and one slate-blue mark for the element that is learned
   or chosen. See the course CLAUDE.md.
   ========================================================================== */

const L = label(13);
const LS = label(11.5, 400);
const LB = label(14, 600);
const MONO = { ...label(12, 500), fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" };

/** Several lines of plate text, one tspan per line. */
function Lines({
  x,
  y,
  lines,
  style = L,
  fill = C.ink,
  dy = 17,
  anchor,
}: {
  x: number;
  y: number;
  lines: string[];
  style?: React.CSSProperties;
  fill?: string;
  dy?: number;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text x={x} y={y} fill={fill} style={style} textAnchor={anchor}>
      {lines.map((t, i) => (
        <tspan key={i} x={x} dy={i ? dy : 0}>
          {t}
        </tspan>
      ))}
    </text>
  );
}

/** A rounded frame, tinted when it carries the accent. */
function Box({
  x,
  y,
  w,
  h,
  tone = C.ink,
  fill,
  rx = 4,
  dash,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  tone?: string;
  fill?: string;
  rx?: number;
  dash?: string;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={rx}
      fill={fill ?? (tone === C.accent ? C.tint : C.paper)}
      stroke={tone}
      strokeWidth={1.3}
      strokeDasharray={dash}
    />
  );
}

/** A Phosphor icon placed by its centre. */
function Icon({
  as,
  x,
  y,
  size = 34,
  tone = C.ink,
  weight = "duotone",
}: {
  as: React.ElementType;
  x: number;
  y: number;
  size?: number;
  tone?: string;
  weight?: "duotone" | "regular" | "fill";
}) {
  return React.createElement(as, {
    x: x - size / 2,
    y: y - size / 2,
    size,
    weight,
    color: tone,
  });
}

/** A row of choices under an interactive plate. */
function Choice<T extends string>({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: { id: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div role="radiogroup" aria-label={name} className="mt-4 flex flex-wrap gap-2">
      {options.map((o) => {
        const on = o.id === value;
        return (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(o.id)}
            className={`rounded border px-3 py-1.5 font-sans text-[0.9375rem] transition-colors ${
              on
                ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                : "border-[var(--rule)] bg-[var(--paper)] text-[var(--ink-2)] hover:border-[var(--ink-3)]"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/* --------------------------------------------------------------------------
   Two Sides of AI in the Marketplace
   -------------------------------------------------------------------------- */

export function TwoSidedMarket() {
  const firm = ["segment audiences", "rank search results", "personalize promotions"];
  const buyer = ["filter products", "compare prices", "execute purchases"];
  const rowY = [76, 136, 196];
  const gx = 350;
  const cw = 78;
  const ch = 56;
  return (
    <Plate
      w={960}
      h={330}
      title="Firm-side AI segments audiences, ranks search results and personalizes promotions to maximize conversion, margin and lifetime value. Consumer-side AI filters products, compares prices and executes purchases for the buyer's preferences and budget. Both act on the same product listings"
    >
      {/* firm side */}
      <Icon as={Storefront} x={20} y={26} size={38} />
      <text x={46} y={32} fill={C.ink} style={LB}>
        firm side
      </text>
      {firm.map((t, i) => (
        <g key={t}>
          <Box x={0} y={rowY[i] - 22} w={250} h={44} tone={C.ink3} />
          <text x={14} y={rowY[i] + 5} fill={C.ink} style={L}>
            {t}
          </text>
          <Arrow x1={256} y1={rowY[i]} x2={gx - 10} y2={rowY[i]} tone={C.ink3} />
        </g>
      ))}
      <text x={0} y={268} fill={C.ink3} style={LS}>
        optimized for
      </text>
      <Lines x={0} y={290} lines={["conversion rate, gross margin,", "customer lifetime value"]} style={L} fill={C.ink} />

      {/* the shared listings */}
      {Array.from({ length: 9 }, (_, k) => {
        const x = gx + (k % 3) * (cw + 12);
        const y = 48 + Math.floor(k / 3) * (ch + 12);
        return (
          <g key={k}>
            <rect x={x} y={y} width={cw} height={ch} rx={3} fill={C.paper} stroke={C.ink} strokeWidth={1.1} />
            <rect x={x + 6} y={y + 6} width={24} height={24} rx={2} fill={C.grey} />
            <line x1={x + 36} y1={y + 12} x2={x + cw - 8} y2={y + 12} stroke={C.ink3} strokeWidth={2.4} strokeLinecap="round" />
            <line x1={x + 36} y1={y + 22} x2={r2(x + 50 + hash(k) * 16)} y2={y + 22} stroke={C.ink3} strokeWidth={2.4} strokeLinecap="round" />
            <line x1={x + 6} y1={y + 44} x2={x + 30} y2={y + 44} stroke={C.ink} strokeWidth={2.4} strokeLinecap="round" />
          </g>
        );
      })}

      {/* consumer side */}
      <Icon as={User} x={724} y={26} size={36} tone={C.accent} />
      <Icon as={Robot} x={760} y={26} size={36} tone={C.accent} />
      <text x={786} y={32} fill={C.accent} style={LB}>
        consumer side
      </text>
      {buyer.map((t, i) => (
        <g key={t}>
          <Box x={710} y={rowY[i] - 22} w={248} h={44} tone={C.accent} />
          <text x={724} y={rowY[i] + 5} fill={C.accent} style={label(13, 600)}>
            {t}
          </text>
          <Arrow x1={704} y1={rowY[i]} x2={gx + 3 * cw + 24 + 10} y2={rowY[i]} tone={C.accent} />
        </g>
      ))}
      <text x={710} y={268} fill={C.ink3} style={LS}>
        instructed to represent
      </text>
      <Lines x={710} y={290} lines={["the buyer's stated preferences,", "budget constraints"]} style={L} fill={C.ink} />
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Behavioral Segmentation and RFM Features
   Recency on x, frequency on y, monetary value as dot area.
   -------------------------------------------------------------------------- */

const RFM = [
  { name: "high-spend loyalists", n: 16, rec: [4, 45], freq: [12, 22], spend: [900, 1900], tone: C.accent },
  { name: "seasonal gift buyers", n: 16, rec: [50, 125], freq: [2, 5], spend: [250, 650], tone: C.ink },
  { name: "dormant accounts", n: 16, rec: [215, 350], freq: [0.5, 3], spend: [40, 220], tone: C.ink3 },
] as const;

export function RfmScatter() {
  const x0 = 70;
  const x1 = 690;
  const yb = 316;
  const yt = 40;
  const X = (d: number) => r2(x0 + (d / 365) * (x1 - x0));
  const Y = (f: number) => r2(yb - (f / 24) * (yb - yt));
  const R = (m: number) => r2(Math.sqrt(m) * 0.24);
  const pts = RFM.flatMap((g, gi) =>
    Array.from({ length: g.n }, (_, k) => {
      const s = gi * 100 + k;
      return {
        g: gi,
        x: X(g.rec[0] + hash(s) * (g.rec[1] - g.rec[0])),
        y: Y(g.freq[0] + hash(s + 37) * (g.freq[1] - g.freq[0])),
        r: R(g.spend[0] + hash(s + 71) * (g.spend[1] - g.spend[0])),
      };
    }),
  );
  const tags = [
    { x: X(50), y: Y(21.5), anchor: "start" as const },
    { x: X(132), y: Y(6.4), anchor: "start" as const },
    { x: X(282), y: Y(4.6), anchor: "middle" as const },
  ];
  return (
    <Plate
      w={960}
      h={370}
      title="Customers plotted by days since their last purchase and purchases in the past year, with dot size showing money spent. Three groups appear: high-spend loyalists who bought recently and often with large dots, seasonal gift buyers with a few purchases a few months ago, and dormant accounts with small dots and no purchase for most of a year"
    >
      {/* axes */}
      <line x1={x0} y1={yb} x2={x1} y2={yb} stroke={C.ink} strokeWidth={1.2} />
      <line x1={x0} y1={yt - 10} x2={x0} y2={yb} stroke={C.ink} strokeWidth={1.2} />
      {[0, 90, 180, 270, 365].map((d) => (
        <g key={d}>
          <line x1={X(d)} y1={yb} x2={X(d)} y2={yb + 5} stroke={C.ink} />
          <text x={X(d)} y={yb + 20} textAnchor="middle" fill={C.ink3} style={LS}>
            {d}
          </text>
        </g>
      ))}
      {[0, 6, 12, 18, 24].map((f) => (
        <g key={f}>
          <line x1={x0 - 5} y1={Y(f)} x2={x0} y2={Y(f)} stroke={C.ink} />
          <text x={x0 - 10} y={Y(f) + 4} textAnchor="end" fill={C.ink3} style={LS}>
            {f}
          </text>
        </g>
      ))}
      <text x={(x0 + x1) / 2} y={yb + 44} textAnchor="middle" fill={C.ink} style={L}>
        Recency: days since last purchase
      </text>
      <text x={x0} y={yt - 20} fill={C.ink} style={L}>
        Frequency: purchases in the past year
      </text>

      {/* customers */}
      {pts.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={p.r}
          fill={p.g === 0 ? C.tint : p.g === 1 ? C.grey : "rgba(103, 109, 119, 0.06)"}
          stroke={RFM[p.g].tone}
          strokeWidth={1.2}
        />
      ))}
      {RFM.map((g, i) => (
        <text key={g.name} x={tags[i].x} y={tags[i].y} textAnchor={tags[i].anchor} fill={g.tone} style={label(13.5, 600)}>
          {g.name}
        </text>
      ))}

      {/* monetary key */}
      <text x={760} y={70} fill={C.ink} style={L}>
        Monetary: amount spent
      </text>
      {[100, 600, 1800].map((m, i) => {
        const cy = 112 + i * 54;
        return (
          <g key={m}>
            <circle cx={790} cy={cy} r={R(m)} fill="none" stroke={C.ink3} strokeWidth={1.2} />
            <text x={828} y={cy + 4} fill={C.ink3} style={LS}>
              ${m.toLocaleString("en-US")}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Propensity Modeling and Customer Lifetime Value
   A feature cutoff on a timeline, then five prospects scored two ways.
   -------------------------------------------------------------------------- */

const PROSPECTS = [
  { who: "one-time bargain hunter", p: 0.62, clv: 40 },
  { who: "coupon-only shopper", p: 0.55, clv: 55 },
  { who: "steady household buyer", p: 0.3, clv: 620 },
  { who: "new parent, frequent browser", p: 0.24, clv: 900 },
  { who: "lapsed account", p: 0.08, clv: 300 },
];

export function PropensityClv() {
  const cut = 560;
  const colP = 250;
  const colV = 490;
  const colE = 730;
  const BW = 170;
  const top = 132;
  const RH = 44;
  const ev = PROSPECTS.map((r) => r.p * r.clv);
  const byP = [...PROSPECTS.keys()].sort((a, b) => PROSPECTS[b].p - PROSPECTS[a].p).slice(0, 2);
  const byE = [...PROSPECTS.keys()].sort((a, b) => ev[b] - ev[a]).slice(0, 2);
  return (
    <Plate
      w={960}
      h={366}
      title="Features come only from transactions before a cutoff date, outcomes from the window after it. Five prospects: the two most likely to convert are a one-time bargain hunter and a coupon-only shopper, but conversion probability times lifetime value ranks a new parent and a steady household buyer first"
    >
      {/* the time horizon */}
      <line x1={0} y1={34} x2={cut} y2={34} stroke={C.ink} strokeWidth={3} />
      <line x1={cut} y1={34} x2={950} y2={34} stroke={C.ink3} strokeWidth={3} strokeDasharray="6 5" />
      <line x1={cut} y1={14} x2={cut} y2={56} stroke={C.accent} strokeWidth={2} />
      <text x={cut} y={74} textAnchor="middle" fill={C.accent} style={label(13, 600)}>
        feature cutoff
      </text>
      <text x={0} y={22} fill={C.ink} style={L}>
        features: transaction history before the cutoff
      </text>
      <text x={950} y={22} textAnchor="end" fill={C.ink3} style={L}>
        outcome window: did the prospect buy?
      </text>

      {/* column heads */}
      <text x={colP} y={top - 16} fill={C.ink} style={LB}>
        conversion probability
      </text>
      <text x={colV} y={top - 16} fill={C.ink} style={LB}>
        lifetime value
      </text>
      <text x={colE} y={top - 16} fill={C.accent} style={LB}>
        probability × CLV
      </text>
      <line x1={0} y1={top - 6} x2={960} y2={top - 6} stroke={C.rule} />

      {PROSPECTS.map((r, i) => {
        const y = top + i * RH;
        const pTop = byP.includes(i);
        const eTop = byE.includes(i);
        return (
          <g key={r.who}>
            <text x={0} y={y + 22} fill={C.ink} style={L}>
              {r.who}
            </text>
            <rect x={colP} y={y + 10} width={r2(r.p * BW / 0.7)} height={16} fill={pTop ? C.ink : C.ink3} opacity={pTop ? 0.85 : 0.45} />
            <text x={r2(colP + r.p * BW / 0.7 + 8)} y={y + 23} fill={C.ink3} style={LS}>
              {Math.round(r.p * 100)}%
            </text>
            <rect x={colV} y={y + 10} width={r2((r.clv / 1000) * BW)} height={16} fill={C.ink3} opacity={0.45} />
            <text x={r2(colV + (r.clv / 1000) * BW + 8)} y={y + 23} fill={C.ink3} style={LS}>
              ${r.clv}
            </text>
            <rect x={colE} y={y + 10} width={r2((ev[i] / 250) * BW)} height={16} fill={eTop ? C.accent : C.ink3} opacity={eTop ? 1 : 0.45} />
            <text x={r2(colE + (ev[i] / 250) * BW + 8)} y={y + 23} fill={eTop ? C.accent : C.ink3} style={label(11.5, eTop ? 600 : 400)}>
              ${Math.round(ev[i])}
            </text>
            <line x1={0} y1={y + RH - 4} x2={960} y2={y + RH - 4} stroke={C.rule} strokeWidth={0.6} />
          </g>
        );
      })}
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Churn Prediction Versus Uplift Modeling: the four uplift groups
   -------------------------------------------------------------------------- */

export function UpliftMatrix() {
  const x0 = 150;
  const y0 = 58;
  const cw = 230;
  const chh = 150;
  const cells = [
    { c: 0, r: 0, name: "sure things", verdict: "discount wasted", lit: false },
    { c: 1, r: 0, name: "persuadables", verdict: "send the offer", lit: true },
    { c: 0, r: 1, name: "sleeping dogs", verdict: "offer triggers a cancellation", lit: false },
    { c: 1, r: 1, name: "lost causes", verdict: "discount wasted", lit: false },
  ];
  return (
    <Plate
      w={620}
      h={372}
      title="Two by two uplift matrix. Customers who stay with or without the offer are sure things. Those who stay only if contacted are persuadables, the only group to send the offer. Those who leave only when contacted are sleeping dogs, and those who leave either way are lost causes"
    >
      <text x={x0 + cw} y={16} textAnchor="middle" fill={C.ink} style={LB}>
        without the offer, the customer
      </text>
      {["stays", "leaves"].map((t, i) => (
        <text key={t} x={x0 + cw * i + cw / 2} y={44} textAnchor="middle" fill={C.ink} style={L}>
          {t}
        </text>
      ))}
      <Lines x={0} y={y0 + chh} lines={["with the offer,", "the customer"]} style={LB} fill={C.ink} dy={18} />
      {["stays", "leaves"].map((t, i) => (
        <text key={t} x={x0 - 14} y={y0 + chh * i + chh / 2 + 4} textAnchor="end" fill={C.ink} style={L}>
          {t}
        </text>
      ))}
      {cells.map((k) => {
        const x = x0 + k.c * cw;
        const y = y0 + k.r * chh;
        return (
          <g key={k.name}>
            <rect x={x} y={y} width={cw} height={chh} fill={k.lit ? C.tint : C.paper} stroke={k.lit ? C.accent : C.ink3} strokeWidth={k.lit ? 2 : 1.1} />
            <text x={x + cw / 2} y={y + chh / 2 - 4} textAnchor="middle" fill={k.lit ? C.accent : C.ink} style={label(17, 700)}>
              {k.name}
            </text>
            <text x={x + cw / 2} y={y + chh / 2 + 20} textAnchor="middle" fill={k.lit ? C.accent : C.ink3} style={label(12.5, k.lit ? 600 : 400)}>
              {k.verdict}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Collaborative Filtering Versus Content-Based Filtering
   -------------------------------------------------------------------------- */

export function CfVsCb() {
  const cx0 = 92;
  const cs = 62;
  const rows = [
    [1, 1, 1, 1],
    [1, 1, 1, 0],
  ];
  const tagsLiked = ["trail", "waterproof", "lightweight"];
  const items = [
    { tags: ["trail", "waterproof", "lightweight"], sold: "launched today, 0 purchases", lit: true },
    { tags: ["beach", "slip-on", "casual"], sold: "4,210 purchases", lit: false },
  ];
  return (
    <Plate
      w={960}
      h={340}
      title="Collaborative filtering: two shoppers bought the same three running shoes, and one also bought a hydration vest, so the vest is recommended to the other. Content-based filtering: a newly launched shoe with no purchases shares the trail, waterproof and lightweight tags of a shoe the shopper liked, so it is recommended, while a casual beach sandal is not"
    >
      {/* collaborative */}
      <text x={0} y={18} fill={C.ink} style={LB}>
        collaborative filtering
      </text>
      {[Sneaker, Sneaker, Sneaker, Backpack].map((ic, j) => (
        <Icon key={j} as={ic} x={cx0 + j * cs + cs / 2} y={66} size={32} tone={j === 3 ? C.accent : C.ink} />
      ))}
      <text x={cx0 + 3 * cs + cs / 2} y={100} textAnchor="middle" fill={C.ink3} style={LS}>
        hydration vest
      </text>
      {rows.map((row, i) => {
        const y = 112 + i * cs;
        return (
          <g key={i}>
            <Icon as={User} x={44} y={y + cs / 2} size={34} tone={C.ink} />
            {row.map((v, j) => {
              const x = cx0 + j * cs;
              const rec = v === 0;
              return (
                <g key={j}>
                  <rect x={x + 4} y={y + 4} width={cs - 8} height={cs - 8} rx={3} fill={rec ? C.tint : v ? C.grey : C.paper} stroke={rec ? C.accent : C.ink3} strokeWidth={rec ? 1.8 : 1} strokeDasharray={rec ? "4 3" : undefined} />
                  {v ? <Icon as={CheckCircle} x={x + cs / 2} y={y + cs / 2} size={24} tone={C.ink} weight="regular" /> : null}
                  {rec ? (
                    <text x={x + cs / 2} y={y + cs / 2 + 7} textAnchor="middle" fill={C.accent} style={label(22, 700)}>
                      ?
                    </text>
                  ) : null}
                </g>
              );
            })}
          </g>
        );
      })}
      <path d={`M${cx0 + 4} ${112 + 2 * cs + 10}V${112 + 2 * cs + 18}H${cx0 + 3 * cs - 4}V${112 + 2 * cs + 10}`} fill="none" stroke={C.ink3} strokeWidth={1.3} />
      <text x={cx0 + 1.5 * cs} y={112 + 2 * cs + 38} textAnchor="middle" fill={C.ink3} style={LS}>
        same three shoes
      </text>
      <Arrow x1={cx0 + 3 * cs + cs / 2} y1={112 + 2 * cs + 40} x2={cx0 + 3 * cs + cs / 2} y2={112 + 2 * cs - 2} tone={C.accent} />
      <text x={cx0 + 3 * cs + cs / 2} y={112 + 2 * cs + 58} textAnchor="middle" fill={C.accent} style={label(13, 600)}>
        recommend
      </text>

      <line x1={440} y1={6} x2={440} y2={334} stroke={C.rule} />

      {/* content-based */}
      <text x={480} y={18} fill={C.ink} style={LB}>
        content-based filtering
      </text>
      <text x={480} y={52} fill={C.ink3} style={LS}>
        a shoe the shopper favored
      </text>
      <Box x={480} y={62} w={460} h={56} tone={C.ink} />
      <Icon as={Sneaker} x={512} y={90} size={34} />
      {tagsLiked.map((t, i) => (
        <g key={t}>
          <rect x={552 + i * 108} y={78} width={98} height={24} rx={12} fill={C.grey} stroke={C.ink3} />
          <text x={601 + i * 108} y={94} textAnchor="middle" fill={C.ink} style={label(12, 500)}>
            {t}
          </text>
        </g>
      ))}
      {items.map((it, i) => {
        const y = 152 + i * 92;
        return (
          <g key={i}>
            <Box x={480} y={y} w={460} h={56} tone={it.lit ? C.accent : C.ink3} />
            <Icon as={Sneaker} x={512} y={y + 28} size={34} tone={it.lit ? C.accent : C.ink3} />
            {it.tags.map((t, j) => {
              const match = tagsLiked.includes(t);
              return (
                <g key={t}>
                  <rect x={552 + j * 108} y={y + 16} width={98} height={24} rx={12} fill={match ? C.paper : C.paper} stroke={match ? C.accent : C.rule} />
                  <text x={601 + j * 108} y={y + 32} textAnchor="middle" fill={match ? C.accent : C.ink3} style={label(12, match ? 600 : 400)}>
                    {t}
                  </text>
                </g>
              );
            })}
            <text x={490} y={y + 74} fill={it.lit ? C.accent : C.ink3} style={label(12, it.lit ? 600 : 400)}>
              {it.sold}
            </text>
            {it.lit ? (
              <text x={940} y={y + 74} textAnchor="end" fill={C.accent} style={label(13, 600)}>
                recommend
              </text>
            ) : null}
          </g>
        );
      })}
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Two-Stage Recommendation and Search Ranking
   -------------------------------------------------------------------------- */

export function TwoStageFunnel() {
  const many = Array.from({ length: 520 }, (_, i) => [r2(8 + hash(i) * 204), r2(40 + hash(i + 999) * 184)]);
  const few = Array.from({ length: 48 }, (_, i) => [r2(332 + (i % 8) * 17), r2(78 + Math.floor(i / 8) * 19)]);
  const scores = [0.91, 0.86, 0.8, 0.77, 0.71, 0.66, 0.6];
  return (
    <Plate
      w={960}
      h={300}
      title="Ten million catalog items are narrowed by fast vector search to a few hundred candidates, which a deep ranking network scores. Business rules for margin, clearance and sponsored placements then adjust the final ranked list"
    >
      {/* the catalog */}
      <rect x={0} y={30} width={220} height={204} rx={4} fill="none" stroke={C.ink} strokeWidth={1.2} />
      {many.map(([x, y], i) => (
        <rect key={i} x={x} y={y} width={3} height={3} fill={C.ink3} opacity={0.55} />
      ))}
      <text x={110} y={258} textAnchor="middle" fill={C.ink} style={LB}>
        10,000,000 items
      </text>

      {/* retrieval */}
      <Arrow x1={228} y1={132} x2={314} y2={132} tone={C.ink} />
      <Lines x={271} y={100} lines={["candidate", "retrieval"]} style={label(12, 600)} fill={C.ink} anchor="middle" dy={15} />
      <text x={271} y={162} textAnchor="middle" fill={C.ink3} style={LS}>
        vector search
      </text>
      <rect x={322} y={64} width={146} height={136} rx={4} fill="none" stroke={C.ink} strokeWidth={1.2} />
      {few.map(([x, y], i) => (
        <rect key={i} x={x} y={y} width={9} height={9} rx={1.5} fill={C.ink3} opacity={0.7} />
      ))}
      <text x={395} y={224} textAnchor="middle" fill={C.ink} style={LB}>
        300 candidates
      </text>

      {/* ranking */}
      <Arrow x1={476} y1={132} x2={564} y2={132} tone={C.ink} />
      <Lines x={520} y={100} lines={["ranking"]} style={label(12, 600)} fill={C.ink} anchor="middle" />
      <Lines x={520} y={156} lines={["deep neural", "network"]} style={LS} fill={C.ink3} anchor="middle" dy={14} />
      {scores.map((s, i) => {
        const y = 40 + i * 28;
        const lit = i === 0;
        return (
          <g key={i}>
            <text x={584} y={y + 15} textAnchor="end" fill={lit ? C.accent : C.ink3} style={LS}>
              {i + 1}
            </text>
            <rect x={592} y={y} width={52} height={20} rx={2} fill={lit ? C.tint : C.paper} stroke={lit ? C.accent : C.ink3} />
            <rect x={652} y={y + 5} width={r2(s * 120)} height={10} fill={lit ? C.accent : C.ink3} opacity={lit ? 1 : 0.5} />
            <text x={r2(658 + s * 120)} y={y + 14} fill={lit ? C.accent : C.ink3} style={label(11, lit ? 600 : 400)}>
              {s.toFixed(2)}
            </text>
          </g>
        );
      })}
      <text x={652} y={250} fill={C.ink3} style={LS}>
        predicted conversion
      </text>

      {/* business rules */}
      <line x1={824} y1={30} x2={824} y2={236} stroke={C.rule} />
      <text x={842} y={52} fill={C.ink} style={LB}>
        business rules
      </text>
      {["profit margin", "inventory clearance", "sponsored placement"].map((t, i) => (
        <g key={t}>
          <rect x={842} y={70 + i * 40} width={116} height={28} rx={14} fill={C.paper} stroke={C.ink3} />
          <text x={901} y={88 + i * 40} textAnchor="middle" fill={C.ink} style={label(11.5, 500)}>
            {t}
          </text>
        </g>
      ))}
      <Arrow x1={838} y1={208} x2={782} y2={208} tone={C.ink3} />
      <text x={842} y={212} fill={C.ink3} style={LS}>
        adjust the order
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Exploration Versus Exploitation (interactive)
   Three offers shown over 50 rounds of 1,000 page views. A share of each
   round is spread evenly across all offers for testing, the rest goes to
   the offer with the highest estimated conversion rate. Estimates start
   from 20,000 past views for the default and a cautious 3 percent prior,
   worth 500 views, for each new offer.
   -------------------------------------------------------------------------- */

const OFFERS = [
  { name: "current default", rate: 0.04, prior: 0.04, n0: 20000 },
  { name: "new offer B", rate: 0.055, prior: 0.03, n0: 500 },
  { name: "new offer C", rate: 0.02, prior: 0.03, n0: 500 },
];
const ROUNDS = 50;
const PER = 1000;

function runBandit(eps: number) {
  const n = OFFERS.map((o) => o.n0);
  const s = OFFERS.map((o) => o.n0 * o.prior);
  const shares: number[][] = [];
  let total = 0;
  for (let t = 0; t < ROUNDS; t++) {
    const est = s.map((v, i) => v / n[i]);
    const best = est.indexOf(Math.max(...est));
    const imp = OFFERS.map((_, i) => (eps * PER) / 3 + (i === best ? (1 - eps) * PER : 0));
    shares.push(imp.map((v) => v / PER));
    imp.forEach((v, i) => {
      n[i] += v;
      s[i] += v * OFFERS[i].rate;
      total += v * OFFERS[i].rate;
    });
  }
  return { shares, total };
}

const CURVE = Array.from({ length: 51 }, (_, k) => runBandit(k / 100).total);

export function BanditLab() {
  const [eps, setEps] = useState(0);
  const { shares, total } = runBandit(eps);
  const x0 = 46;
  const x1 = 380;
  const yt = 34;
  const yb = 214;
  const X = (t: number) => r2(x0 + (t / ROUNDS) * (x1 - x0));
  const Y = (v: number) => r2(yb - v * (yb - yt));
  // stack order from the bottom: default, C, B
  const order = [0, 2, 1];
  const bands = order.map((k, j) => {
    const lo = (t: number) => order.slice(0, j).reduce((a, i) => a + shares[t][i], 0);
    const hi = (t: number) => lo(t) + shares[t][k];
    const top: string[] = [];
    const bot: string[] = [];
    for (let t = 0; t < ROUNDS; t++) {
      top.push(`${X(t)} ${Y(hi(t))}`, `${X(t + 1)} ${Y(hi(t))}`);
      bot.push(`${X(t)} ${Y(lo(t))}`, `${X(t + 1)} ${Y(lo(t))}`);
    }
    return { k, d: `M${top.join("L")}L${bot.reverse().join("L")}Z` };
  });
  const fills = ["rgba(103, 109, 119, 0.35)", C.accent, "rgba(103, 109, 119, 0.14)"];
  const cx0 = 46;
  const cx1 = 380;
  const cyb = 410;
  const cyt = 310;
  const CX = (e: number) => r2(cx0 + (e / 0.5) * (cx1 - cx0));
  const CY = (v: number) => r2(cyb - ((v - 1900) / (2800 - 1900)) * (cyb - cyt));
  const best = Math.max(...CURVE);
  return (
    <Plate
      w={560}
      h={532}
      title={`Interactive: drag the share of page views reserved for testing. At ${Math.round(eps * 100)} percent, the stacked chart shows which offer gets the page views over 50,000 views, and the run earns ${Math.round(total).toLocaleString("en-US")} conversions against 2,000 when only the default is shown`}
    >
      <text x={0} y={16} fill={C.ink} style={L}>
        share of page views, by offer
      </text>
      {bands.map((b) => (
        <path key={b.k} d={b.d} fill={fills[b.k]} stroke={b.k === 1 ? C.accent : "none"} strokeWidth={0.6} />
      ))}
      <line x1={x0} y1={yb} x2={x1} y2={yb} stroke={C.ink} />
      <line x1={x0} y1={yt} x2={x0} y2={yb} stroke={C.ink} />
      {[0, 0.5, 1].map((v) => (
        <text key={v} x={x0 - 8} y={Y(v) + 4} textAnchor="end" fill={C.ink3} style={LS}>
          {Math.round(v * 100)}%
        </text>
      ))}
      {[0, 25000, 50000].map((v) => (
        <text key={v} x={X(v / PER)} y={yb + 18} textAnchor="middle" fill={C.ink3} style={LS}>
          {v.toLocaleString("en-US")}
        </text>
      ))}
      <text x={x1} y={yb + 36} textAnchor="end" fill={C.ink3} style={LS}>
        page views
      </text>
      {[1, 2, 0].map((k, i) => {
        const y = 52 + i * 58;
        const lit = k === 1;
        return (
          <g key={k}>
            <rect x={x1 + 16} y={y - 11} width={12} height={12} fill={fills[k]} stroke={lit ? C.accent : C.ink3} strokeWidth={0.8} />
            <text x={x1 + 36} y={y} fill={lit ? C.accent : C.ink} style={label(12.5, lit ? 600 : 500)}>
              {OFFERS[k].name}
            </text>
            <text x={x1 + 36} y={y + 17} fill={C.ink3} style={LS}>
              converts {(OFFERS[k].rate * 100).toFixed(1)}%
            </text>
            <text x={x1 + 36} y={y + 33} fill={lit ? C.accent : C.ink3} style={label(11.5, lit ? 600 : 400)}>
              {Math.round(shares[ROUNDS - 1][k] * 100)}% of views at the end
            </text>
          </g>
        );
      })}

      {/* the payoff */}
      <text x={0} y={272} fill={C.ink} style={L}>
        conversions over 50,000 page views
      </text>
      <text x={556} y={274} textAnchor="end" fill={C.accent} style={label(22, 700)}>
        {Math.round(total).toLocaleString("en-US")}
      </text>
      <path d={`M${CURVE.map((v, k) => `${CX(k / 100)} ${CY(v)}`).join("L")}`} fill="none" stroke={C.ink3} strokeWidth={1.6} />
      <line x1={cx0} y1={cyb} x2={cx1} y2={cyb} stroke={C.ink} />
      <line x1={cx0} y1={cyt - 6} x2={cx0} y2={cyb} stroke={C.ink} />
      {[2000, 2500].map((v) => (
        <text key={v} x={cx0 - 8} y={CY(v) + 4} textAnchor="end" fill={C.ink3} style={LS}>
          {v.toLocaleString("en-US")}
        </text>
      ))}
      <line x1={cx0} y1={CY(best)} x2={cx1} y2={CY(best)} stroke={C.rule} strokeDasharray="4 3" />
      <circle cx={CX(eps)} cy={CY(total)} r={6} fill={C.accent} />

      <text x={0} y={470} fill={C.ink} style={L}>
        reserved for testing
      </text>
      <Knob x={cx0} y={492} len={cx1 - cx0} value={eps} min={0} max={0.5} step={0.01} onChange={setEps} label="Share of page views reserved for testing" />
      <text x={cx1 + 22} y={497} fill={C.accent} style={LB}>
        {Math.round(eps * 100)}%
      </text>
      {[0, 0.25, 0.5].map((v) => (
        <text key={v} x={CX(v)} y={520} textAnchor="middle" fill={C.ink3} style={LS}>
          {Math.round(v * 100)}%
        </text>
      ))}
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Generative AI in Copywriting and Creative Variation
   -------------------------------------------------------------------------- */

const VARIANTS = [
  { seg: "new parents", cr: 3.9 },
  { seg: "students", cr: 1.6 },
  { seg: "retirees", cr: 2.1 },
  { seg: "runners", cr: 4.4 },
  { seg: "commuters", cr: 1.2 },
  { seg: "home cooks", cr: 2.0 },
];

export function CreativePipeline() {
  const vx = 438;
  const ex = 700;
  return (
    <Plate
      w={960}
      h={340}
      title="One campaign brief, grounded in verified product specifications, brand voice and compliance rules, goes to a generative model that drafts six segment-specific ads. A live field experiment measures each ad's conversion rate, retires the weak variants and scales the two that drive purchases"
    >
      {/* brief and guardrails */}
      <Icon as={FileText} x={24} y={36} size={40} />
      <text x={50} y={42} fill={C.ink} style={LB}>
        one campaign brief
      </text>
      <Box x={0} y={78} w={210} h={130} tone={C.ink3} fill={C.grey} />
      <text x={14} y={102} fill={C.ink3} style={label(11.5, 600)}>
        guardrails
      </text>
      <Lines x={14} y={128} lines={["verified product specs", "brand voice", "compliance rules"]} style={L} fill={C.ink} dy={24} />
      <Arrow x1={218} y1={130} x2={292} y2={130} tone={C.ink3} />
      <Icon as={Robot} x={330} y={128} size={52} />
      <text x={330} y={176} textAnchor="middle" fill={C.ink3} style={LS}>
        generative model
      </text>
      <Arrow x1={368} y1={130} x2={vx - 10} y2={130} tone={C.ink3} />

      {/* the variants */}
      {VARIANTS.map((v, i) => {
        const y = 14 + i * 50;
        return (
          <g key={v.seg}>
            <rect x={vx} y={y} width={190} height={40} rx={3} fill={C.paper} stroke={C.ink3} />
            <rect x={vx + 6} y={y + 6} width={28} height={28} rx={2} fill={C.grey} />
            <line x1={vx + 42} y1={y + 14} x2={vx + 120} y2={y + 14} stroke={C.ink} strokeWidth={2.4} strokeLinecap="round" />
            <text x={vx + 42} y={y + 32} fill={C.ink3} style={label(11, 400)}>
              {v.seg}
            </text>
          </g>
        );
      })}

      {/* the field experiment */}
      <Arrow x1={vx + 198} y1={130} x2={ex - 12} y2={130} tone={C.ink3} />
      <text x={ex} y={14} fill={C.ink} style={LB}>
        live field experiment
      </text>
      {VARIANTS.map((v, i) => {
        const y = 22 + i * 50;
        const win = v.cr >= 3.5;
        const w = r2(v.cr * 40);
        return (
          <g key={v.seg}>
            <rect x={ex} y={y + 6} width={w} height={18} fill={win ? C.accent : C.ink3} opacity={win ? 1 : 0.35} />
            <text x={ex + w + 8} y={y + 20} fill={win ? C.accent : C.ink3} style={label(12, win ? 600 : 400)}>
              {v.cr.toFixed(1)}% {win ? "scale" : "retire"}
            </text>
          </g>
        );
      })}
      <text x={ex} y={326} fill={C.ink3} style={LS}>
        conversion rate
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Unstructured Voice-of-the-Customer Analytics
   Top: one three-star review split into aspects. Bottom: support tickets
   clustered by embedding, with an emerging cluster caught before returns.
   -------------------------------------------------------------------------- */

const ASPECTS = [
  { aspect: "durability", s: 0.8, quote: "The frame is solid and feels like it will last." },
  { aspect: "assembly instructions", s: -0.7, quote: "The assembly instructions were confusing." },
  { aspect: "packaging", s: -0.6, quote: "The box arrived dented." },
];

const TICKETS = [0, 1, 3, 5, 8, 11, 14, 16];
const RETURNS = [2.1, 2.0, 2.2, 2.1, 2.2, 2.3, 3.4, 4.6];

export function VocPipeline() {
  const ax = 590;
  const mid = 770;
  const clusters = [
    { cx: 96, cy: 300, n: 18, sp: 30, lit: false },
    { cx: 206, cy: 262, n: 14, sp: 26, lit: false },
    { cx: 214, cy: 346, n: 9, sp: 16, lit: true },
  ];
  const wx0 = 520;
  const wx1 = 850;
  const wyb = 380;
  const wyt = 246;
  const WX = (i: number) => r2(wx0 + (i / 7) * (wx1 - wx0));
  return (
    <Plate
      w={960}
      h={414}
      title="A three-star review praises durability but criticizes confusing assembly instructions and a dented box, and aspect-based sentiment scores each separately. Below, support tickets clustered by embedding reveal a small emerging cluster whose weekly count rises from week 3, before the return rate spikes in weeks 7 and 8"
    >
      {/* one review, three aspects */}
      <Box x={0} y={10} w={500} h={170} tone={C.ink3} />
      {[0, 1, 2, 3, 4].map((k) => (
        <Icon key={k} as={Star} x={22 + k * 22} y={34} size={20} tone={k < 3 ? C.ink : C.ink3} weight={k < 3 ? "fill" : "regular"} />
      ))}
      {ASPECTS.map((a, i) => (
        <text key={a.aspect} x={14} y={80 + i * 34} fill={C.ink} style={label(14, 400)}>
          {a.quote}
        </text>
      ))}
      <Arrow x1={508} y1={95} x2={ax - 12} y2={95} tone={C.ink3} />
      {ASPECTS.map((a, i) => {
        const y = 80 + i * 34;
        const w = r2(Math.abs(a.s) * 90);
        const neg = a.s < 0;
        return (
          <g key={a.aspect}>
            <text x={ax} y={y} fill={C.ink} style={label(13, 600)}>
              {a.aspect}
            </text>
            <rect x={neg ? mid + 60 - w : mid + 60} y={y - 12} width={w} height={14} fill={neg ? C.ink : C.ink3} opacity={neg ? 0.8 : 0.45} />
            <text x={neg ? mid + 54 - w : mid + 66 + w} y={y} textAnchor={neg ? "end" : "start"} fill={C.ink3} style={LS}>
              {a.s > 0 ? "+" : "−"}
              {Math.abs(a.s).toFixed(1)}
            </text>
          </g>
        );
      })}
      <line x1={mid + 60} y1={50} x2={mid + 60} y2={190} stroke={C.ink} />
      <text x={mid + 60} y={42} textAnchor="middle" fill={C.ink3} style={LS}>
        sentiment
      </text>

      <line x1={0} y1={210} x2={960} y2={210} stroke={C.rule} />

      {/* ticket embeddings */}
      <text x={0} y={236} fill={C.ink3} style={LS}>
        support tickets, clustered by embedding
      </text>
      {clusters.map((c, ci) =>
        Array.from({ length: c.n }, (_, k) => {
          const a = hash(ci * 50 + k) * Math.PI * 2;
          const d = Math.sqrt(hash(ci * 50 + k + 17)) * c.sp;
          return <circle key={`${ci}-${k}`} cx={r2(c.cx + Math.cos(a) * d * 1.4)} cy={r2(c.cy + Math.sin(a) * d * 0.8)} r={4} fill={c.lit ? C.accent : C.ink3} opacity={c.lit ? 1 : 0.5} />;
        }),
      )}
      <ellipse cx={214} cy={346} rx={34} ry={22} fill="none" stroke={C.accent} strokeWidth={1.4} strokeDasharray="4 3" />
      <Lines x={262} y={344} lines={["“the hinge", "cracked”"]} style={label(12.5, 600)} fill={C.accent} dy={16} />
      <Arrow x1={350} y1={320} x2={wx0 - 30} y2={320} tone={C.ink3} />

      {/* weekly counts against returns */}
      <line x1={wx0} y1={wyb} x2={wx1} y2={wyb} stroke={C.ink} />
      {TICKETS.map((_, i) => (
        <text key={i} x={WX(i)} y={wyb + 18} textAnchor="middle" fill={C.ink3} style={LS}>
          {i + 1}
        </text>
      ))}
      <text x={wx1 + 8} y={wyb + 18} fill={C.ink3} style={LS}>
        week
      </text>
      <path d={`M${TICKETS.map((v, i) => `${WX(i)} ${r2(wyb - (v / 16) * (wyb - wyt))}`).join("L")}`} fill="none" stroke={C.accent} strokeWidth={2.4} />
      <path d={`M${RETURNS.map((v, i) => `${WX(i)} ${r2(wyb - ((v - 1.5) / 4.5) * (wyb - wyt))}`).join("L")}`} fill="none" stroke={C.ink} strokeWidth={1.6} strokeDasharray="5 3" />
      <Lines x={WX(7) + 8} y={r2(wyb - (16 / 16) * (wyb - wyt)) + 4} lines={["tickets in", "the cluster"]} style={label(12, 600)} fill={C.accent} dy={15} />
      <text x={WX(7) + 8} y={r2(wyb - ((4.6 - 1.5) / 4.5) * (wyb - wyt)) + 4} fill={C.ink} style={label(12, 500)}>
        return rate
      </text>
      <line x1={WX(2)} y1={wyt - 6} x2={WX(2)} y2={wyb} stroke={C.accent} strokeWidth={1.2} />
      <text x={WX(2) + 6} y={wyt + 4} fill={C.accent} style={label(12, 600)}>
        detected
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Synthetic Respondents and Concept Testing
   Valid and invalid uses, then the spread of real and synthetic answers on
   one scale: CETSCALE composite scores (17 to 119), target USA. Humans:
   Detroit residents, Shimp and Sharma (1987). Model: Llama 3.3 70B, from
   Wadi, Ghodrat, and Philp (2026), Table 1.
   -------------------------------------------------------------------------- */

export function SyntheticUses() {
  const valid = ["pre-test a questionnaire", "flag ambiguous wording", "generate hypotheses about objections"];
  const invalid = ["estimate market demand", "estimate price elasticity", "measure willingness to pay"];
  const hum = { m: 68.58, sd: 25.96 };
  const mdl = { m: 71.99, sd: 0.95 };
  const x0 = 40;
  const x1 = 920;
  const base = 392;
  const X = (v: number) => r2(x0 + ((v - 17) / 102) * (x1 - x0));
  const H = 150;
  const curve = (m: number, sd: number) => {
    const peak = 1 / hum.sd;
    const pts = Array.from({ length: 409 }, (_, i) => {
      const v = 17 + (i / 408) * 102;
      const d = Math.exp(-((v - m) ** 2) / (2 * sd * sd)) / sd;
      return `${X(v)} ${r2(base - Math.min(H, (d / peak) * 64))}`;
    });
    return `M${X(17)} ${base}L${pts.join("L")}L${X(119)} ${base}Z`;
  };
  return (
    <Plate
      w={960}
      h={452}
      title="Valid early-stage uses of synthetic respondents: pre-testing a questionnaire, flagging ambiguous wording, generating hypotheses about objections. Invalid uses: estimating demand, price elasticity and willingness to pay. On the consumer ethnocentrism scale, Detroit residents spread widely with standard deviation 25.96, while Llama 3.3 70B answers sit in a narrow spike with standard deviation 0.95"
    >
      <text x={0} y={18} fill={C.accent} style={LB}>
        early-stage research
      </text>
      {valid.map((t, i) => (
        <g key={t}>
          <Icon as={CheckCircle} x={14} y={50 + i * 34} size={24} tone={C.accent} />
          <text x={36} y={55 + i * 34} fill={C.ink} style={L}>
            {t}
          </text>
        </g>
      ))}
      <text x={500} y={18} fill={C.ink} style={LB}>
        in place of human samples
      </text>
      {invalid.map((t, i) => (
        <g key={t}>
          <Icon as={XCircle} x={514} y={50 + i * 34} size={24} tone={C.ink3} />
          <text x={536} y={55 + i * 34} fill={C.ink3} style={L}>
            {t}
          </text>
        </g>
      ))}

      <line x1={0} y1={176} x2={960} y2={176} stroke={C.rule} />
      <text x={0} y={204} fill={C.ink} style={L}>
        Same survey, same scale: consumer ethnocentrism (CETSCALE)
      </text>

      <path d={curve(hum.m, hum.sd)} fill={C.grey} stroke={C.ink} strokeWidth={1.2} />
      <path d={curve(mdl.m, mdl.sd)} fill={C.tint} stroke={C.accent} strokeWidth={1.6} />
      <path d={`M${r2(X(mdl.m) - 17)} ${base - H + 24}L${r2(X(mdl.m) + 17)} ${base - H + 16}`} stroke={C.paper} strokeWidth={6} />
      <path d={`M${r2(X(mdl.m) - 17)} ${base - H + 20}L${r2(X(mdl.m) + 17)} ${base - H + 12}M${r2(X(mdl.m) - 17)} ${base - H + 28}L${r2(X(mdl.m) + 17)} ${base - H + 20}`} stroke={C.accent} strokeWidth={1} />
      <line x1={x0} y1={base} x2={x1} y2={base} stroke={C.ink} />
      {[17, 51, 85, 119].map((v) => (
        <text key={v} x={X(v)} y={base + 18} textAnchor="middle" fill={C.ink3} style={LS}>
          {v}
        </text>
      ))}
      <Lines x={X(30)} y={300} lines={["Detroit residents", "SD 25.96"]} style={label(12.5, 500)} fill={C.ink} anchor="middle" dy={16} />
      <Lines x={r2(X(mdl.m) + 32)} y={base - H + 14} lines={["Llama 3.3 70B", "SD 0.95"]} style={label(12.5, 600)} fill={C.accent} dy={16} />
      <text x={0} y={446} fill={C.ink3} style={label(10.5, 400)}>
        Shimp and Sharma (1987), Wadi, Ghodrat, and Philp (2026)
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   The AI Agent as a Surrogate Consumer
   -------------------------------------------------------------------------- */

export function SurrogateJourney() {
  const gx = 470;
  const keep = [7, 20, 29];
  return (
    <Plate
      w={960}
      h={318}
      title="A shopper asks an AI agent for a quiet dishwasher under 900 dollars that fits a 24-inch cutout. The agent turns this into structured filters, screens 36 listings and returns a shortlist of three"
    >
      {/* the request */}
      <Icon as={User} x={24} y={44} size={40} />
      <path d="M52 16H340a8 8 0 0 1 8 8V82a8 8 0 0 1 -8 8H70L58 102V90a8 8 0 0 1 -6 -8V24a8 8 0 0 1 0 -8Z" fill={C.grey} stroke="none" />
      <Lines x={66} y={42} lines={["“Find a quiet dishwasher under", "$900 that fits a 24-inch", "cabinet cutout.”"]} style={label(13.5, 400)} fill={C.ink} dy={18} />

      {/* the agent */}
      <Arrow x1={200} y1={106} x2={200} y2={140} tone={C.ink3} />
      <Icon as={Robot} x={200} y={170} size={48} />
      {["price ≤ $900", "width = 24 in", "sort: quietest first"].map((t, i) => (
        <g key={t}>
          <rect x={250} y={140 + i * 30} width={162} height={24} rx={3} fill={C.paper} stroke={C.ink3} />
          <text x={260} y={156 + i * 30} fill={C.ink} style={{ ...MONO, fontSize: 11.5 }}>
            {t}
          </text>
        </g>
      ))}
      <Arrow x1={418} y1={170} x2={gx - 10} y2={170} tone={C.ink3} />

      {/* screening */}
      {Array.from({ length: 36 }, (_, k) => {
        const x = gx + (k % 6) * 40;
        const y = 70 + Math.floor(k / 6) * 34;
        const ok = keep.includes(k);
        return (
          <g key={k}>
            <rect x={x} y={y} width={32} height={26} rx={2} fill={ok ? C.tint : C.paper} stroke={ok ? C.accent : C.rule} strokeWidth={ok ? 1.6 : 1} />
            {!ok ? <path d={`M${x + 8} ${y + 7}l16 12M${x + 24} ${y + 7}l-16 12`} stroke={C.ink3} strokeWidth={1} opacity={0.6} /> : null}
          </g>
        );
      })}
      <text x={gx + 116} y={56} textAnchor="middle" fill={C.ink3} style={LS}>
        36 listings screened
      </text>

      {/* the shortlist */}
      <Arrow x1={gx + 248} y1={170} x2={gx + 300} y2={170} tone={C.accent} />
      {keep.map((k, i) => (
        <g key={k}>
          <rect x={gx + 310} y={98 + i * 50} width={170} height={40} rx={3} fill={C.tint} stroke={C.accent} strokeWidth={1.4} />
          <text x={gx + 322} y={124 + i * 50} fill={C.accent} style={label(13, 600)}>
            {i + 1}
          </text>
          <line x1={gx + 340} y1={114 + i * 50} x2={gx + 450} y2={114 + i * 50} stroke={C.accent} strokeWidth={2.4} strokeLinecap="round" />
          <line x1={gx + 340} y1={126 + i * 50} x2={gx + 410} y2={126 + i * 50} stroke={C.accent} strokeWidth={2.4} strokeLinecap="round" opacity={0.5} />
        </g>
      ))}
      <text x={gx + 395} y={276} textAnchor="middle" fill={C.accent} style={LB}>
        3 shown to the shopper
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Marketing to Algorithms Versus Marketing to Humans
   One carry-on suitcase listing, as a shopper sees it and as an agent reads it.
   -------------------------------------------------------------------------- */

export function HumanVsAgent() {
  const fields: [string, string, boolean][] = [
    ["title", "Carry-on spinner suitcase", false],
    ["price", "49.99", false],
    ["shipping", "12.00", false],
    ["total_delivered", "61.99", false],
    ["warranty", "1 year", false],
    ["rating", "4.4 (2,310 reviews)", false],
    ["dimensions", "not found", true],
  ];
  return (
    <Plate
      w={960}
      h={360}
      title="The same carry-on suitcase listing. A shopper sees lifestyle photography, a bestseller badge and a 49.99 dollar price, with the dimensions printed inside the photo. An agent reads price, shipping, total delivered price, warranty and rating as text, finds no dimensions, and excludes the suitcase because it cannot confirm it fits"
    >
      {/* what a shopper sees */}
      <text x={0} y={18} fill={C.ink} style={LB}>
        what a shopper sees
      </text>
      <Box x={0} y={32} w={400} h={316} tone={C.ink3} />
      <rect x={14} y={46} width={372} height={186} rx={3} fill={C.grey} />
      <circle cx={320} cy={92} r={26} fill={C.paper} opacity={0.7} />
      <path d="M14 232L120 160L190 200L270 140L386 232Z" fill="rgba(103, 109, 119, 0.18)" />
      <Icon as={SuitcaseRolling} x={170} y={156} size={110} />
      <text x={372} y={222} textAnchor="end" fill={C.ink} style={label(12, 600)}>
        55 × 35 × 23 cm
      </text>
      <rect x={24} y={56} width={84} height={22} rx={11} fill={C.ink} />
      <text x={66} y={71} textAnchor="middle" fill={C.paper} style={label(11.5, 600)}>
        Bestseller
      </text>
      <text x={14} y={278} fill={C.ink} style={label(34, 700)}>
        $49.99
      </text>
      {[0, 1, 2, 3, 4].map((k) => (
        <Icon key={k} as={Star} x={232 + k * 22} y={268} size={20} tone={C.ink} weight={k < 4 ? "fill" : "regular"} />
      ))}
      <text x={14} y={318} fill={C.ink3} style={label(13, 400)}>
        Travel light. Arrive in style.
      </text>

      {/* what an agent reads */}
      <Icon as={Robot} x={514} y={14} size={30} tone={C.ink} />
      <text x={536} y={18} fill={C.ink} style={LB}>
        what an agent reads
      </text>
      <Box x={500} y={32} w={460} h={242} tone={C.ink3} />
      {fields.map(([k, v, miss], i) => {
        const y = 62 + i * 30;
        return (
          <g key={k}>
            {miss ? <rect x={508} y={y - 18} width={444} height={26} rx={3} fill={C.tint} stroke={C.accent} strokeDasharray="4 3" /> : null}
            <text x={516} y={y} fill={miss ? C.accent : C.ink3} style={{ ...MONO, fontSize: 12.5 }}>
              {k}:
            </text>
            <text x={680} y={y} fill={miss ? C.accent : C.ink} style={{ ...MONO, fontSize: 12.5, fontWeight: miss ? 700 : 500 }}>
              {v}
            </text>
          </g>
        );
      })}
      <Icon as={XCircle} x={514} y={308} size={26} tone={C.accent} />
      <Lines x={536} y={304} lines={["excluded: cannot confirm it fits", "an airline carry-on limit"]} style={label(13, 600)} fill={C.accent} dy={18} />
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Position Bias (interactive, real data)
   Wadi and Ma (2026a): booking probability by rank on 100-listing hotel
   pages whose order was randomized, at each model's lowest reasoning
   effort. Bars come from the quadratic linear probability model of choice
   (position and position² on rank / 100), with the intercept set so the
   bars average 1 in 100, since every session books one hotel.
   -------------------------------------------------------------------------- */

const POSITION = {
  sonnet: { label: "Sonnet", b1: -0.1565, b2: 0.1217 },
  luna: { label: "Luna", b1: -0.0729, b2: 0.0544 },
  pro: { label: "Pro", b1: -0.076, b2: 0.0638 },
  flashlite: { label: "Flash Lite", b1: -0.0503, b2: 0.0418 },
} as const;
type PositionModel = keyof typeof POSITION;

export function PositionLab() {
  const [m, setM] = useState<PositionModel>("sonnet");
  const M = POSITION[m];
  const a = 0.01 - M.b1 / 2 - M.b2 / 3;
  const raw = Array.from({ length: 100 }, (_, i) => Math.max(0, a + M.b1 * ((i + 1) / 100) + M.b2 * ((i + 1) / 100) ** 2));
  const z = raw.reduce((s, v) => s + v, 0);
  const p = raw.map((v) => v / z);
  const top10 = p.slice(0, 10).reduce((s, v) => s + v, 0);
  const last10 = p.slice(90).reduce((s, v) => s + v, 0);
  const x0 = 56;
  const x1 = 540;
  const yb = 236;
  const yt = 40;
  const pmax = 0.05;
  const X = (rank: number) => r2(x0 + ((rank - 0.5) / 100) * (x1 - x0));
  const Y = (v: number) => r2(yb - (Math.min(v, pmax) / pmax) * (yb - yt));
  const bw = r2(((x1 - x0) / 100) * 0.72);
  return (
    <div>
      <Plate
        w={560}
        h={344}
        title={`Probability that the hotel at each of 100 list positions is chosen by ${M.label}, with listings in random order. The first ten positions take ${Math.round(top10 * 100)} percent of choices and the last ten ${Math.round(last10 * 100)} percent, against 10 percent each if position did not matter`}
      >
        <text x={0} y={16} fill={C.ink} style={L}>
          chance the listing at each position is chosen
        </text>
        <line x1={x0} y1={yt - 8} x2={x0} y2={yb} stroke={C.ink} />
        {[0, 0.01, 0.03, 0.05].map((v) => (
          <g key={v}>
            <line x1={x0 - 5} y1={Y(v)} x2={x0} y2={Y(v)} stroke={C.ink} />
            <text x={x0 - 9} y={Y(v) + 4} textAnchor="end" fill={C.ink3} style={LS}>
              {Math.round(v * 100)}%
            </text>
          </g>
        ))}
        {p.map((v, i) => {
          const lit = i < 10;
          return <rect key={i} x={r2(X(i + 1) - bw / 2)} y={Y(v)} width={bw} height={r2(yb - Y(v))} fill={lit ? C.accent : C.ink3} opacity={lit ? 1 : 0.6} style={{ transition: "all 350ms ease" }} />;
        })}
        <line x1={x0} y1={Y(0.01)} x2={x1} y2={Y(0.01)} stroke={C.ink} strokeDasharray="5 3" />
        <text x={X(64)} y={Y(0.01) - 6} textAnchor="middle" fill={C.ink} style={LS}>
          if position did not matter
        </text>
        <line x1={x0} y1={yb} x2={x1} y2={yb} stroke={C.ink} />
        {[1, 25, 50, 75, 100].map((rank) => (
          <text key={rank} x={X(rank)} y={yb + 18} textAnchor="middle" fill={C.ink3} style={LS}>
            {rank}
          </text>
        ))}
        <text x={x1} y={yb + 36} textAnchor="end" fill={C.ink3} style={LS}>
          position in the list
        </text>
        <line x1={0} y1={286} x2={560} y2={286} stroke={C.rule} />
        <text x={0} y={316} fill={C.accent} style={label(24, 700)}>
          {Math.round(top10 * 100)}%
        </text>
        <Lines x={70} y={308} lines={["of choices go to the first 10 positions", "(10% if position did not matter)"]} style={LS} fill={C.ink} dy={15} />
        <text x={556} y={316} textAnchor="end" fill={C.ink} style={label(24, 700)}>
          {Math.round(last10 * 100)}%
        </text>
        <text x={556} y={338} textAnchor="end" fill={C.ink3} style={LS}>
          to the last 10
        </text>
      </Plate>
      <Choice
        name="Model"
        options={(Object.keys(POSITION) as PositionModel[]).map((k) => ({ id: k, label: POSITION[k].label }))}
        value={m}
        onChange={setM}
      />
      <p className="mt-3 font-sans text-[0.8125rem] text-[var(--ink-3)]">Wadi and Ma (2026a), 100-hotel pages in random order</p>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Brand Familiarity, Decoy Effects, and Algorithmic Heuristics
   -------------------------------------------------------------------------- */

export function BrandDecoy() {
  const bx = 540;
  const BW = 3.2;
  const sets = [
    { head: "without a decoy", rows: [["target", 45], ["rival", 55]] },
    { head: "with a decoy", rows: [["target", 66], ["rival", 31], ["decoy", 3]] },
  ] as const;
  const specs: Record<string, string> = { target: "$79, 4.6 stars", rival: "$65, 4.3 stars", decoy: "$85, 4.2 stars" };
  return (
    <Plate
      w={960}
      h={330}
      title="Two skillets with identical specifications and ratings: the familiar national brand is recommended 82 percent of the time and the new brand 18 percent. Adding a decoy that costs more and rates lower than the target raises the target's share from 45 to 66 percent"
    >
      {/* familiarity */}
      <text x={0} y={18} fill={C.ink} style={LB}>
        identical specs and ratings
      </text>
      {[
        ["familiar national brand", 82, true],
        ["new brand", 18, false],
      ].map(([who, v, lit], i) => {
        const y = 60 + i * 96;
        const w = r2((v as number) * 3.6);
        return (
          <g key={who as string}>
            <Icon as={CookingPot} x={24} y={y + 20} size={42} tone={C.ink} />
            <text x={56} y={y + 8} fill={C.ink} style={label(13, 600)}>
              {who as string}
            </text>
            <text x={56} y={y + 26} fill={C.ink3} style={LS}>
              $89, 28 cm, 4.5 stars
            </text>
            <rect x={56} y={y + 38} width={w} height={22} fill={lit ? C.accent : C.ink3} opacity={lit ? 1 : 0.5} />
            <text x={62 + w} y={y + 55} fill={lit ? C.accent : C.ink3} style={label(14, 700)}>
              {v as number}%
            </text>
          </g>
        );
      })}
      <text x={56} y={268} fill={C.ink3} style={LS}>
        share of recommendations
      </text>

      <line x1={490} y1={6} x2={490} y2={324} stroke={C.rule} />

      <text x={bx + 156} y={318} fill={C.ink3} style={LS}>
        share of recommendations
      </text>

      {/* decoy */}
      {sets.map((s, si) => {
        const y0 = 18 + si * 150;
        return (
          <g key={s.head}>
            <text x={bx} y={y0} fill={C.ink} style={LB}>
              {s.head}
            </text>
            {s.rows.map(([who, v], i) => {
              const y = y0 + 16 + i * 32;
              const lit = who === "target";
              const w = r2(v * BW);
              return (
                <g key={who}>
                  <text x={bx} y={y + 16} fill={lit ? C.accent : C.ink} style={label(13, lit ? 600 : 500)}>
                    {who}
                  </text>
                  <text x={bx + 56} y={y + 16} fill={C.ink3} style={LS}>
                    {specs[who]}
                  </text>
                  <rect x={bx + 156} y={y + 3} width={Math.max(w, 1)} height={18} fill={lit ? C.accent : C.ink3} opacity={lit ? 1 : 0.5} />
                  <text x={bx + 162 + w} y={y + 17} fill={lit ? C.accent : C.ink3} style={label(12.5, lit ? 700 : 400)}>
                    {v}%
                  </text>
                </g>
              );
            })}
          </g>
        );
      })}
    </Plate>
  );
}
