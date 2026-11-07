"use client";

import React, { useState } from "react";
import { Arrow, BODY, CAT, CatKey, Frame, HalftoneDefs, LINE, Price, Segmented, Slider, Tile, ht, r2 } from "../_visuals/kit";
import { CoffeeBag, Cursor, House, Laptop, Mug, Person, Shop, Star } from "../_visuals/objects";

const ink = { stroke: CAT.ink, strokeWidth: LINE.outline, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
const hair = { stroke: CAT.ink, strokeWidth: LINE.hair, strokeLinecap: "round" as const };
const fmt = (n: number) => Math.round(n).toLocaleString("en-US");

/* ---------------------------------------------------------------------------
   Week 8 cast
   ------------------------------------------------------------------------ */

/** A cast-iron skillet seen from above, centred on (cx, cy), about 58 wide. `cracked` draws the imitation's cracked pan. */
function Skillet({ id, cx, cy, cracked = false }: { id: string; cx: number; cy: number; cracked?: boolean }) {
  const px = cx - 8;
  return (
    <g strokeLinejoin="round">
      <rect x={px + 18} y={cy - 4} width={20} height={8} rx={3} fill={ht(id, "dense")} {...ink} />
      <circle cx={px + 33} cy={cy} r={1.6} fill={CAT.tile} />
      <circle cx={px} cy={cy} r={21} fill={ht(id, "light")} {...ink} />
      <circle cx={px} cy={cy} r={16} fill={cracked ? CAT.tile : ht(id, "dense")} {...ink} />
      <path d={`M${px - 10} ${cy - 8}Q${px - 13} ${cy} ${px - 9} ${cy + 7}`} fill="none" stroke={CAT.tile} strokeWidth={1.6} strokeLinecap="round" />
      {cracked ? (
        <path d={`M${px + 4} ${cy - 16}L${px + 1} ${cy - 8}L${px + 6} ${cy - 3}L${px + 1} ${cy + 5}L${px + 4} ${cy + 12}`} fill="none" stroke={CAT.ink} strokeWidth={1.4} strokeLinecap="round" />
      ) : null}
    </g>
  );
}

/** A rating star in amber with its ink outline: the key idea's star. */
function AmberStar({ cx, cy, r = 6 }: { cx: number; cy: number; r?: number }) {
  let d = "";
  for (let j = 0; j < 10; j++) {
    const a = -Math.PI / 2 + (j * Math.PI) / 5;
    const q = j % 2 ? r * 0.45 : r;
    d += `${j ? "L" : "M"}${r2(cx + q * Math.cos(a))} ${r2(cy + q * Math.sin(a))}`;
  }
  return <path d={`${d}Z`} fill={CAT.amber} stroke={CAT.ink} strokeWidth={0.9} strokeLinejoin="round" />;
}

/** A row of five stars from (x, cy), `filled` of them solid. */
function Stars({ x, cy, filled, r = 5.5, gap = 13, amber = false }: { x: number; cy: number; filled: number; r?: number; gap?: number; amber?: boolean }) {
  return (
    <g>
      {[0, 1, 2, 3, 4].map((k) =>
        amber && k < filled ? <AmberStar key={k} cx={r2(x + k * gap)} cy={cy} r={r} /> : <Star key={k} cx={r2(x + k * gap)} cy={cy} r={r} on={k < filled} />,
      )}
    </g>
  );
}

/** A vitamin jar centred on (cx, cy): halftone body, dense cap and a white label printed with its dose. */
function VitaminJar({ id, cx, cy }: { id: string; cx: number; cy: number }) {
  return (
    <g strokeLinejoin="round">
      <rect x={cx - 30} y={cy - 40} width={60} height={14} rx={2} fill={ht(id, "dense")} {...ink} />
      <rect x={cx - 36} y={cy - 26} width={72} height={66} rx={8} fill={ht(id, "light")} {...ink} />
      <path d={`M${cx + 22} ${cy - 26}H${cx + 28}Q${cx + 36} ${cy - 26} ${cx + 36} ${cy - 18}V${cy + 32}Q${cx + 36} ${cy + 40} ${cx + 28} ${cy + 40}H${cx + 22}Z`} fill={ht(id, "dense")} stroke="none" />
      <rect x={cx - 30} y={cy - 12} width={56} height={36} fill={CAT.tile} {...ink} />
      <Price x={cx - 2} y={cy + 11} size={14} anchor="middle">500 mg</Price>
    </g>
  );
}

/** A certification rosette centred on (cx, cy), printed with its two-line wording. */
function Seal({ cx, cy, r = 40, lines }: { cx: number; cy: number; r?: number; lines: [string, string] }) {
  let d = "";
  for (let j = 0; j < 48; j++) {
    const a = (j * Math.PI) / 24;
    const q = j % 2 ? r - 4 : r;
    d += `${j ? "L" : "M"}${r2(cx + q * Math.cos(a))} ${r2(cy + q * Math.sin(a))}`;
  }
  return (
    <g>
      <path d={`${d}Z`} fill={CAT.tile} {...ink} />
      <circle cx={cx} cy={cy} r={r - 9} fill="none" {...hair} />
      <CatKey x={cx} y={cy - 2} size={12} anchor="middle">{lines[0]}</CatKey>
      <CatKey x={cx} y={cy + 14} size={12} anchor="middle">{lines[1]}</CatKey>
    </g>
  );
}

/** A coiled charging cable with its plug, centred on (cx, cy). */
function Cable({ id, cx, cy }: { id: string; cx: number; cy: number }) {
  return (
    <g strokeLinejoin="round" fill="none">
      {[0, 1, 2].map((k) => (
        <ellipse key={k} cx={cx - 6 + k * 4} cy={cy + k * 2} rx={26 - k * 3} ry={18 - k * 2} {...ink} strokeWidth={2.2} />
      ))}
      <path d={`M${cx + 18} ${cy + 12}Q${cx + 30} ${cy + 22} ${cx + 34} ${cy + 8}`} {...ink} strokeWidth={2.2} />
      <rect x={cx + 29} y={cy - 12} width={11} height={20} rx={2} fill={ht(id, "dense")} {...ink} />
      <rect x={cx + 31.5} y={cy - 20} width={6} height={8} fill={CAT.tile} {...ink} />
    </g>
  );
}

/** An oil-filled radiator heater centred on (cx, cy): halftone fins, a control box and two feet. */
function Heater({ id, cx, cy }: { id: string; cx: number; cy: number }) {
  const fins = 6;
  const fw = 9;
  const x0 = cx - (fins * fw) / 2;
  return (
    <g strokeLinejoin="round">
      <rect x={x0 - 14} y={cy - 26} width={14} height={20} fill={CAT.tile} {...ink} />
      <circle cx={x0 - 7} cy={cy - 16} r={3.2} fill={ht(id, "dense")} {...ink} />
      {Array.from({ length: fins }, (_, k) => (
        <rect key={k} x={x0 + k * fw} y={cy - 32} width={fw - 1.5} height={60} rx={3.5} fill={ht(id, k > 3 ? "dense" : "light")} {...ink} />
      ))}
      <line x1={x0 - 2} y1={cy + 28} x2={x0 + fins * fw} y2={cy + 28} {...ink} />
      <path d={`M${x0 + 4} ${cy + 28}L${x0 - 2} ${cy + 36}M${x0 + fins * fw - 6} ${cy + 28}L${x0 + fins * fw} ${cy + 36}`} fill="none" {...ink} />
    </g>
  );
}

/** An open, empty parcel at (x, y) with face w × h: flaps up, nothing inside. */
function EmptyParcel({ id, x, y, w, h }: { id: string; x: number; y: number; w: number; h: number }) {
  const d = r2(w * 0.28);
  return (
    <g strokeLinejoin="round">
      <path d={`M${x} ${y}l${d} ${r2(-d * 0.6)}h${w}l${-d} ${r2(d * 0.6)}Z`} fill={CAT.tile} {...ink} />
      <path d={`M${x} ${y}l-12 -16l${d} ${r2(-d * 0.6)}l12 16`} fill={CAT.tile} {...ink} />
      <path d={`M${x + w} ${y}l12 -16l${d} ${r2(-d * 0.6)}l-12 16`} fill={CAT.tile} {...ink} />
      <path d={`M${x + w} ${y}l${d} ${r2(-d * 0.6)}v${h}l${-d} ${r2(d * 0.6)}Z`} fill={ht(id, "dense")} {...ink} />
      <rect x={x} y={y} width={w} height={h} fill={ht(id, "light")} {...ink} />
    </g>
  );
}

/** A portable blender centred on (cx, cy): latched lid, halftone jar and a dense motor base. */
function Blender({ id, cx, cy }: { id: string; cx: number; cy: number }) {
  return (
    <g strokeLinejoin="round">
      <rect x={cx - 20} y={cy - 50} width={40} height={12} rx={4} fill={ht(id, "dense")} {...ink} />
      <rect x={cx + 18} y={cy - 48} width={7} height={14} rx={2} fill={CAT.tile} {...ink} />
      <rect x={cx - 18} y={cy - 38} width={36} height={58} fill={ht(id, "light")} {...ink} />
      <rect x={cx + 6} y={cy - 38} width={12} height={58} fill={ht(id, "dense")} stroke="none" />
      <line x1={cx - 11} y1={cy - 30} x2={cx - 11} y2={cy + 12} stroke={CAT.tile} strokeWidth={2} strokeLinecap="round" />
      <path d={`M${cx - 8} ${cy + 8}L${cx} ${cy + 2}L${cx + 8} ${cy + 8}`} fill="none" stroke={CAT.ink} strokeWidth={1.2} />
      <rect x={cx - 20} y={cy + 20} width={40} height={26} rx={4} fill={ht(id, "dense")} {...ink} />
      <circle cx={cx} cy={cy + 33} r={4} fill={CAT.tile} {...ink} />
    </g>
  );
}

/* ---------------------------------------------------------------------------
   1. The market for lemons
   ------------------------------------------------------------------------ */

const GOOD = { worth: 80, cost: 55 };
const LEMON = { worth: 20 };

/**
 * Ten skillet listings. Without reviews, buyers pay the average worth of a
 * listing they cannot tell apart, and good sellers leave once that falls
 * below their cost. With reviews, each kind sells at its own price.
 */
export function LemonsMarket() {
  const [share, setShare] = useState(20);
  const [reviews, setReviews] = useState<"off" | "on">("off");
  const id = "w8-lemons";
  const s = share / 100;
  const nLemon = Math.round(s * 10);
  const isLemon = (i: number) => Math.floor(((i + 1) * nLemon) / 10) > Math.floor((i * nLemon) / 10);
  const pooled = Math.round(GOOD.worth * (1 - s) + LEMON.worth * s);
  const goodLeave = reviews === "off" && pooled < GOOD.cost;
  const pay = goodLeave ? LEMON.worth : pooled;
  const X = (v: number) => r2(60 + v * 7);
  const RY = 216;
  const label =
    reviews === "on"
      ? `With verified reviews, ${nLemon} of 10 skillet listings are imitations and buyers can tell them apart. Good skillets sell at $80, above the good seller's cost of $55, and imitations sell at $20.`
      : goodLeave
        ? `Without reviews, ${nLemon} of 10 listings are imitations. Buyers would pay $${pooled} for a listing they cannot judge, below the good seller's cost of $55, so the good sellers leave and only imitations remain, selling at $20.`
        : `Without reviews, ${nLemon} of 10 listings are imitations. Buyers pay $${pooled} for any listing, still above the good seller's cost of $55.`;
  return (
    <div>
      <Frame width={800} height={300} label={label} svgProps={{ "data-plate": "lemons-market" }}>
        <HalftoneDefs id={id} />
        {Array.from({ length: 10 }, (_, i) => {
          const x = 24 + i * 76;
          const lemon = isLemon(i);
          const gone = !lemon && goodLeave;
          return (
            <g key={i}>
              <Tile x={x} y={16} w={68} h={128} />
              {gone ? (
                <>
                  <CatKey x={x + 34} y={74} size={14} anchor="middle">Seller</CatKey>
                  <CatKey x={x + 34} y={92} size={14} anchor="middle">left</CatKey>
                </>
              ) : (
                <>
                  <Skillet id={id} cx={x + 34} cy={58} cracked={lemon} />
                  {reviews === "on" ? <Stars x={x + 10} cy={100} filled={lemon ? 2 : 5} r={4.6} gap={12} /> : null}
                  <Price x={x + 12} y={130} size={15}>{`$${reviews === "on" ? (lemon ? LEMON.worth : GOOD.worth) : pay}`}</Price>
                </>
              )}
            </g>
          );
        })}

        <line x1={X(0)} y1={RY} x2={X(100)} y2={RY} {...ink} />
        <Price x={X(0)} y={RY - 10} size={14} anchor="middle">$0</Price>
        <Price x={X(100)} y={RY - 10} size={14} anchor="middle">$100</Price>
        <line x1={X(GOOD.cost)} y1={RY - 22} x2={X(GOOD.cost)} y2={RY} stroke={CAT.ink} strokeWidth={LINE.bold} />
        <CatKey x={X(GOOD.cost)} y={RY - 30} size={14} anchor="middle">Good seller&apos;s cost $55</CatKey>
        {(reviews === "on"
          ? [
              { v: GOOD.worth, text: "Well reviewed $80", amber: true },
              { v: LEMON.worth, text: "Poorly reviewed $20", amber: false },
            ]
          : [{ v: pay, text: `Buyers pay $${pay}`, amber: true }]
        ).map((m) => (
          <g key={m.text}>
            <path d={`M${X(m.v)} ${RY + 3}l7 13h-14Z`} fill={m.amber ? CAT.amber : CAT.ink} {...ink} />
            <CatKey x={X(m.v)} y={RY + 40} size={15} anchor="middle" fill={m.amber ? CAT.amberText : CAT.ink}>{m.text}</CatKey>
          </g>
        ))}
      </Frame>
      <Slider label="Share of low-quality imitators" min={0} max={60} step={10} value={share} onChange={setShare} formatValue={(v) => `${v}%`} />
      <Segmented
        label="Verified reviews"
        value={reviews}
        onChange={setReviews}
        options={[
          { id: "off", label: "Off" },
          { id: "on", label: "On" },
        ]}
      />
    </div>
  );
}

/* ---------------------------------------------------------------------------
   2. Search, experience and credence goods
   ------------------------------------------------------------------------ */

/** Three listings and the evidence each is judged by: a specification table, buyers' reviews, a certification seal. */
export function ThreeGoods() {
  const id = "w8-goods";
  const T = 40;
  const specs: [string, string][] = [
    ["Screen", "2560 × 1600"],
    ["Storage", "1 TB"],
    ["Cable", "2 m"],
  ];
  return (
    <Frame
      width={800}
      height={270}
      label="Three listings. Search: a laptop, judged from its specification table of screen, storage and cable length. Experience: a bag of coffee beans, judged from 1,240 buyers' reviews averaging 4.6 stars. Credence: a vitamin jar printed 500 mg, judged from a third-party tested seal."
      svgProps={{ "data-plate": "three-goods" }}
    >
      <HalftoneDefs id={id} />
      {["Search", "Experience", "Credence"].map((name, k) => (
        <g key={name}>
          <Tile x={16 + k * 262} y={T} w={244} h={216} />
          <CatKey x={16 + k * 262 + 4} y={26} size={16} fill={k === 1 ? CAT.amberText : CAT.ink}>{name}</CatKey>
        </g>
      ))}

      <g transform={`translate(${138 - 42} ${T + 22}) scale(1.5)`}>
        <Laptop x={0} y={0} />
      </g>
      {specs.map(([a, b], i) => (
        <g key={a}>
          <line x1={34} y1={T + 118 + i * 30} x2={242} y2={T + 118 + i * 30} {...hair} />
          <CatKey x={34} y={T + 138 + i * 30} size={14}>{a}</CatKey>
          <Price x={242} y={T + 138 + i * 30} size={14} anchor="end">{b}</Price>
        </g>
      ))}
      <line x1={34} y1={T + 208} x2={242} y2={T + 208} {...hair} />

      <g transform={`translate(400 ${T + 62}) scale(1.25)`}>
        <CoffeeBag id={id} cx={0} cy={0} />
      </g>
      <Stars x={312} cy={T + 128} filled={5} r={7} gap={18} amber />
      <Price x={404} y={T + 134} size={17}>4.6</Price>
      <CatKey x={312} y={T + 156} size={14}>1,240 reviews</CatKey>
      {[0, 1].map((k) => (
        <g key={k}>
          <Stars x={316} cy={T + 176 + k * 22} filled={k ? 4 : 5} r={4} gap={10} />
          <line x1={370} y1={T + 176 + k * 22} x2={k ? 468 : 486} y2={T + 176 + k * 22} {...hair} />
        </g>
      ))}

      <VitaminJar id={id} cx={604} cy={T + 104} />
      <Seal cx={712} cy={T + 104} r={46} lines={["Third-party", "tested"]} />
    </Frame>
  );
}

/* ---------------------------------------------------------------------------
   3. Volume and variance
   ------------------------------------------------------------------------ */

const COUNTS = [2, 5, 10, 25, 50, 100, 200, 400, 800];
/** Half-width of the range the true average could fall in, for n reviews with a spread of one star. */
const halfRange = (n: number) => 1.96 / Math.sqrt(n);

/** A 4.7 average from 800 reviews against a 5.0 average whose count can change: how far the true average could lie from each. */
export function RatingRange() {
  const [ix, setIx] = useState(0);
  const id = "w8-range";
  const n = COUNTS[ix];
  const X = (v: number) => r2(300 + (v - 1) * 112);
  const rows = [
    { avg: 4.7, n: 800, amber: false },
    { avg: 5.0, n, amber: true },
  ].map((r, k) => ({ ...r, cy: 72 + k * 90, lo: Math.max(1, r.avg - halfRange(r.n)), hi: Math.min(5, r.avg + halfRange(r.n)) }));
  const b = rows[1];
  return (
    <div>
      <Frame
        width={800}
        height={244}
        label={`A 4.7 average from 800 reviews: the true average lies between ${rows[0].lo.toFixed(2)} and ${rows[0].hi.toFixed(2)}. A 5.0 average from ${fmt(n)} reviews: the true average could lie anywhere from ${b.lo.toFixed(2)} to 5.`}
        svgProps={{ "data-plate": "rating-range" }}
      >
        <HalftoneDefs id={id} />
        <CatKey x={300} y={24} size={17}>Where the true average could lie</CatKey>
        {rows.map((r) => (
          <g key={r.amber ? "b" : "a"}>
            <Tile x={16} y={r.cy - 36} w={232} h={72} />
            <Mug id={id} cx={56} cy={r.cy} scale={1.2} />
            <Price x={96} y={r.cy - 4} size={20}>{r.avg.toFixed(1)}</Price>
            <Star cx={136} cy={r.cy - 11} r={7} />
            <CatKey x={96} y={r.cy + 20} size={17}>{`${fmt(r.n)} ${r.n === 1 ? "review" : "reviews"}`}</CatKey>
            <line x1={X(1)} y1={r.cy} x2={X(5)} y2={r.cy} {...hair} />
            <rect x={X(r.lo)} y={r.cy - 9} width={Math.max(2, r2(X(r.hi) - X(r.lo)))} height={18} fill={r.amber ? CAT.amber : ht(id, "dense")} {...ink} />
            <circle cx={X(r.avg)} cy={r.cy} r={5} fill={CAT.ink} stroke={CAT.tile} strokeWidth={1.4} />
          </g>
        ))}
        <line x1={X(1)} y1={212} x2={X(5)} y2={212} {...ink} />
        {[1, 2, 3, 4, 5].map((v) => (
          <g key={v}>
            <line x1={X(v)} y1={206} x2={X(v)} y2={212} {...ink} />
            <Price x={X(v) - 5} y={236} size={17} anchor="middle">{v}</Price>
            <Star cx={X(v) + 10} cy={230} r={4.5} />
          </g>
        ))}
      </Frame>
      <Slider label="Reviews behind the 5.0 average" min={0} max={COUNTS.length - 1} step={1} value={ix} onChange={setIx} formatValue={(v) => fmt(COUNTS[v])} />
    </div>
  );
}

/** Share of ratings at 5, 4, 3, 2 and 1 stars for two products that both average 3.5 stars. */
const SHAPES: { pct: number[] }[] = [{ pct: [55, 5, 5, 5, 30] }, { pct: [5, 45, 45, 5, 0] }];

/** Two 3.5-star rating breakdowns: one split between 5 and 1 stars, one bunched in the middle. */
export function RatingShapes() {
  return (
    <Frame
      width={800}
      height={236}
      label="Two products that both average 3.5 stars. Left: 55 percent of ratings at 5 stars and 30 percent at 1 star, with few in between. Right: 45 percent at 4 stars and 45 percent at 3 stars, with almost none at the ends."
      svgProps={{ "data-plate": "rating-shapes" }}
    >
      {SHAPES.map((sh, k) => {
        const x = 16 + k * 392;
        return (
          <g key={k}>
            <Tile x={x} y={12} w={376} h={212} />
            <Price x={x + 22} y={48} size={22}>3.5</Price>
            <Star cx={x + 70} cy={40} r={8} />
            <CatKey x={x + 88} y={47} size={17}>average</CatKey>
            {sh.pct.map((p, i) => {
              const y = 72 + i * 30;
              return (
                <g key={i}>
                  <Price x={x + 30} y={y + 6} size={17} anchor="end">{5 - i}</Price>
                  <Star cx={x + 40} cy={y + 1} r={4.5} />
                  <rect x={x + 56} y={y - 8} width={240} height={16} fill="none" {...hair} />
                  {p ? <rect x={x + 56} y={y - 8} width={r2(2.4 * p)} height={16} fill={CAT.ink} /> : null}
                  <Price x={x + 352} y={y + 6} size={17} anchor="end">{`${p}%`}</Price>
                </g>
              );
            })}
          </g>
        );
      })}
    </Frame>
  );
}

/* ---------------------------------------------------------------------------
   4. Under-provision and the J-shaped distribution
   ------------------------------------------------------------------------ */

/** 1,000 orders by the buyer's experience, 5 stars down to 1. */
const BUYERS = [380, 320, 160, 80, 60];
/** Share of each group who review unprompted: delighted and angry buyers write, moderate buyers rarely do. */
const ORGANIC = [0.03, 0.004, 0.003, 0.012, 0.06];
/** Share of asked buyers who write a review, in the range field studies of review requests report. */
const ASKED = 0.3;

/** Asking verified buyers for a review raises the review count and pulls the posted ratings toward all buyers' experiences. */
export function SolicitJ() {
  const [asked, setAsked] = useState(0);
  const id = "w8-j";
  const q = asked / 100;
  const reviews = BUYERS.map((b, k) => b * ((1 - q) * ORGANIC[k] + q * Math.max(ORGANIC[k], ASKED)));
  const total = reviews.reduce((a, v) => a + v, 0);
  const share = reviews.map((v) => (100 * v) / total);
  const all = BUYERS.map((b) => b / 10);
  const BASE = 252;
  const k = 190 / 70;
  const H = (p: number) => r2(p * k);
  const cx = (stars: number) => 104 + (stars - 1) * 92;
  const top5 = r2(BASE - H(share[0]));
  return (
    <div>
      <Frame
        width={800}
        height={290}
        label={`${asked} percent of verified buyers are asked for a review. 1,000 orders produce ${fmt(total)} reviews. Posted reviews: ${share.map((p, i) => `${Math.round(p)} percent at ${5 - i} stars`).join(", ")}. All buyers' experiences: 38, 32, 16, 8 and 6 percent.`}
        svgProps={{ "data-plate": "solicit-j" }}
      >
        <HalftoneDefs id={id} />
        {[0, 20, 40, 60].map((v) => (
          <g key={v}>
            <line x1={50} y1={r2(BASE - H(v))} x2={56} y2={r2(BASE - H(v))} {...ink} />
            <Price x={46} y={r2(BASE - H(v) + 5)} size={14} anchor="end">{`${v}%`}</Price>
          </g>
        ))}
        <line x1={56} y1={BASE} x2={520} y2={BASE} {...ink} />
        {[1, 2, 3, 4, 5].map((stars) => {
          const i = 5 - stars;
          const c = cx(stars);
          return (
            <g key={stars}>
              <rect x={c - 32} y={r2(BASE - H(all[i]))} width={28} height={H(all[i])} fill={CAT.tile} {...ink} />
              {share[i] > 0.05 ? <rect x={c + 2} y={r2(BASE - H(share[i]))} width={28} height={H(share[i])} fill={CAT.amber} {...ink} /> : null}
              <Price x={c - 4} y={BASE + 24} size={15} anchor="middle">{stars}</Price>
              <Star cx={c + 9} cy={BASE + 19} r={4.5} />
            </g>
          );
        })}
        <CatKey x={cx(3) - 18} y={40} size={14} anchor="middle">All buyers&apos; experiences</CatKey>
        <line x1={cx(3) - 18} y1={46} x2={cx(3) - 18} y2={r2(BASE - H(all[2]) - 4)} {...hair} />
        <CatKey x={cx(5) + 30} y={40} size={14} anchor="end" fill={CAT.amberText}>Posted reviews</CatKey>
        <line x1={cx(5) + 16} y1={46} x2={cx(5) + 16} y2={r2(top5 - 4)} {...hair} />

        <Tile x={560} y={40} w={224} h={212} />
        <CatKey x={580} y={74} size={15}>Reviews from</CatKey>
        <CatKey x={580} y={94} size={15}>1,000 orders</CatKey>
        <Price x={580} y={152} size={44} fill={CAT.amberText}>{fmt(total)}</Price>
        <line x1={580} y1={176} x2={764} y2={176} {...hair} />
        <CatKey x={580} y={204} size={15}>Review rate</CatKey>
        <Price x={764} y={204} size={17} anchor="end">{`${(total / 10).toFixed(1)}%`}</Price>
      </Frame>
      <Slider label="Verified buyers sent a review request" min={0} max={100} step={10} value={asked} onChange={setAsked} formatValue={(v) => `${v}%`} />
    </div>
  );
}

/* ---------------------------------------------------------------------------
   5. Altruism and the $10 credit (Wadi, Legoux, Fredette, & Sénécal, 2026)
   ------------------------------------------------------------------------ */

/**
 * Study 2, Table 7: mean review intention (1 to 5) by message and credit.
 * Study 1, Table 3: share of buyers who wrote a review in the field, every
 * email offering the $10 credit (n = 2,160, 1,884 and 998).
 */
const INTENTION = { others: { none: 2.75, credit: 4.32 }, company: { none: 2.95, credit: 3.95 } };
const FIELD = [
  { name: "No appeal", rate: 22.5, amber: false },
  { name: "Help the company", rate: 32.0, amber: false },
  { name: "Help other customers", rate: 35.1, amber: true },
];

/** Two review requests, with or without the $10 credit, and how willing buyers were to write a review. Below, the field study's review rates. */
export function AskWhom() {
  const [credit, setCredit] = useState<"none" | "credit">("none");
  const id = "w8-ask";
  const X = (v: number) => r2(340 + (v - 1) * 100);
  const F = (p: number) => r2(340 + p * 10);
  const rows = [
    { key: "others" as const, subject: "Help other customers", amber: true },
    { key: "company" as const, subject: "Help the company", amber: false },
  ];
  return (
    <div>
      <Frame
        width={800}
        height={370}
        label={`Experiment, ${credit === "credit" ? "with a $10 credit" : "with no credit"}: review intention ${INTENTION.others[credit]} for a request to help other customers and ${INTENTION.company[credit]} for a request to help the company. Field study, every email offering the $10 credit: 22.5 percent wrote a review with no appeal, 32.0 percent when asked to help the company and 35.1 percent when asked to help other customers.`}
        svgProps={{ "data-plate": "ask-whom" }}
      >
        <HalftoneDefs id={id} />
        <CatKey x={340} y={22} size={14}>Experiment: review intention, 1 to 5</CatKey>
        {rows.map((r, k) => {
          const y = 36 + k * 88;
          const v = INTENTION[r.key][credit];
          return (
            <g key={r.key}>
              <rect x={16} y={y} width={290} height={76} fill={CAT.tile} {...ink} />
              <line x1={16} y1={y + 14} x2={306} y2={y + 14} {...hair} />
              <Price x={30} y={y + 38} size={17}>{r.subject}</Price>
              <line x1={30} y1={y + 52} x2={credit === "credit" ? 170 : 270} y2={y + 52} {...hair} />
              <line x1={30} y1={y + 62} x2={credit === "credit" ? 150 : 236} y2={y + 62} {...hair} />
              {credit === "credit" ? (
                <g>
                  <path d={`M${190} ${y + 46}h104v24h-104l-8 -12Z`} fill={CAT.tile} {...ink} />
                  <circle cx={194} cy={y + 58} r={2} fill="none" {...hair} />
                  <Price x={244} y={y + 63} size={14} anchor="middle">$10 credit</Price>
                </g>
              ) : null}
              <rect x={X(1)} y={y + 29} width={r2(X(v) - X(1))} height={20} fill={r.amber ? CAT.amber : ht(id, "dense")} {...ink} />
              <Price x={X(v) + 8} y={y + 45} size={16}>{v.toFixed(2)}</Price>
            </g>
          );
        })}
        <line x1={X(1)} y1={216} x2={X(5)} y2={216} {...ink} />
        {[1, 2, 3, 4, 5].map((v) => (
          <g key={v}>
            <line x1={X(v)} y1={210} x2={X(v)} y2={216} {...ink} />
            <Price x={X(v)} y={234} size={14} anchor="middle">{v}</Price>
          </g>
        ))}

        <line x1={16} y1={252} x2={784} y2={252} {...hair} />
        <CatKey x={16} y={276} size={14}>Field study, every email offering the $10 credit: share who wrote a review</CatKey>
        {FIELD.map((f, i) => {
          const y = 300 + i * 26;
          return (
            <g key={f.name}>
              <CatKey x={30} y={y + 5} size={14}>{f.name}</CatKey>
              <rect x={F(0)} y={y - 8} width={r2(F(f.rate) - F(0))} height={17} fill={f.amber ? CAT.amber : ht(id, "dense")} {...ink} />
              <Price x={F(f.rate) + 8} y={y + 6} size={15}>{`${f.rate.toFixed(1)}%`}</Price>
            </g>
          );
        })}
      </Frame>
      <Segmented
        label="Request offers"
        value={credit}
        onChange={setCredit}
        options={[
          { id: "none", label: "No credit" },
          { id: "credit", label: "A $10 credit" },
        ]}
      />
    </div>
  );
}

/* ---------------------------------------------------------------------------
   6. Performance-contingent incentives (Wadi, Fredette, Sénécal, & Legoux, 2026)
   ------------------------------------------------------------------------ */

type Reviewer = "first" | "experienced";
type Reward = "any" | "helpful";
type Appeal = "others" | "company";

/**
 * Field data from a North American online retailer, Table II: share of
 * buyers asked who wrote a review and mean review length in characters, by
 * reviewer experience, reward ($10 for any published review, or $2 when
 * published plus $8 after one helpful vote) and whom the request says the
 * review helps.
 */
const FIELD_II: Record<Reviewer, Record<Reward, Record<Appeal, { rate: number; chars: number }>>> = {
  experienced: {
    any: { company: { rate: 0.597, chars: 161.4 }, others: { rate: 0.743, chars: 159.6 } },
    helpful: { company: { rate: 0.539, chars: 169.3 }, others: { rate: 0.622, chars: 180.9 } },
  },
  first: {
    any: { company: { rate: 0.064, chars: 110.0 }, others: { rate: 0.056, chars: 130.9 } },
    helpful: { company: { rate: 0.07, chars: 192.3 }, others: { rate: 0.118, chars: 153.5 } },
  },
};
const CHARS_PER_LINE = 24;

/** The review request as an instrument: who is asked, how the reward is paid and whom the review helps change who writes and how long they write. */
export function PayForWhat() {
  const [who, setWho] = useState<Reviewer>("first");
  const [reward, setReward] = useState<Reward>("any");
  const [appeal, setAppeal] = useState<Appeal>("others");
  const cell = FIELD_II[who][reward][appeal];
  const n = Math.round(cell.rate * 100);
  const chars = Math.round(cell.chars);
  const lines = cell.chars / CHARS_PER_LINE;
  const full = Math.floor(lines);
  const rest = lines - full;
  const lineLen = [0.92, 0.86, 0.95, 0.88, 0.9, 0.84, 0.93, 0.87];
  const CX = 536;
  const CW = 248;
  return (
    <div>
      <Frame
        width={800}
        height={300}
        label={`A review request to ${who === "first" ? "first-time reviewers" : "experienced reviewers"}, asking them to ${appeal === "others" ? "help other customers" : "help the company"}, paying ${reward === "any" ? "a $10 credit for any review" : "$2 when the review is published and $8 after one helpful vote"}. ${n} of 100 buyers asked wrote a review, and the average review ran ${chars} characters.`}
        svgProps={{ "data-plate": "pay-for-what" }}
      >
        <rect x={16} y={40} width={250} height={244} fill={CAT.tile} {...ink} />
        <line x1={16} y1={64} x2={266} y2={64} {...hair} />
        <CatKey x={28} y={57} size={14}>{who === "first" ? "To: first-time reviewer" : "To: experienced reviewer"}</CatKey>
        <Price x={28} y={96} size={18}>{appeal === "others" ? "Help other customers" : "Help the company"}</Price>
        {[118, 132, 146, 160].map((y, i) => (
          <line key={y} x1={28} y1={y} x2={[240, 226, 248, 196][i]} y2={y} {...hair} />
        ))}
        <path d="M44 184h208v84h-208l-12 -42Z" fill={CAT.tile} {...ink} />
        <circle cx={48} cy={226} r={2.4} fill="none" {...hair} />
        {reward === "any" ? (
          <>
            <Price x={148} y={220} size={17} anchor="middle">$10 credit</Price>
            <CatKey x={148} y={244} size={14} anchor="middle">for any review</CatKey>
          </>
        ) : (
          <>
            <Price x={148} y={212} size={15} anchor="middle">$2 when published</Price>
            <Price x={148} y={234} size={15} anchor="middle">$8 after one</Price>
            <Price x={148} y={254} size={15} anchor="middle">helpful vote</Price>
          </>
        )}

        <CatKey x={386} y={24} size={15} anchor="middle">{`${n} of 100 asked wrote a review`}</CatKey>
        {Array.from({ length: 100 }, (_, i) => {
          const x = 298 + (i % 10) * 18;
          const y = 44 + Math.floor(i / 10) * 18;
          return <rect key={i} x={x} y={y} width={13} height={13} fill={i < n ? CAT.amber : CAT.tile} stroke={CAT.ink} strokeWidth={i < n ? 0.9 : LINE.hair} />;
        })}

        <CatKey x={CX + CW / 2} y={24} size={15} anchor="middle">{`Average review: ${chars} characters`}</CatKey>
        <Tile x={CX} y={40} w={CW} h={244} />
        <Stars x={CX + 20} cy={62} filled={5} r={5} gap={13} />
        {Array.from({ length: full + (rest > 0.05 ? 1 : 0) }, (_, i) => {
          const y = 88 + i * 23;
          const len = i === full ? rest : lineLen[i % lineLen.length];
          return <line key={i} x1={CX + 18} y1={y} x2={r2(CX + 18 + (CW - 36) * len)} y2={y} stroke={CAT.ink} strokeWidth={1.2} strokeLinecap="round" />;
        })}
      </Frame>
      <Segmented label="Reviewer" value={who} onChange={setWho} options={[{ id: "first", label: "First-time" }, { id: "experienced", label: "Experienced" }]} />
      <Segmented label="Reward" value={reward} onChange={setReward} options={[{ id: "any", label: "For any review" }, { id: "helpful", label: "Mostly after a helpful vote" }]} />
      <Segmented label="Request" value={appeal} onChange={setAppeal} options={[{ id: "others", label: "Help other customers" }, { id: "company", label: "Help the company" }]} />
    </div>
  );
}

/* ---------------------------------------------------------------------------
   7. Review hijacking and brushing
   ------------------------------------------------------------------------ */

/** A hijacked listing keeps its ratings when its product is swapped. A brushing parcel creates a verified purchase and a 5-star review. */
export function FakeSchemes() {
  const id = "w8-fake";
  const listing = (x: number, product: React.ReactNode, price: string) => (
    <g>
      <Tile x={x} y={44} w={150} h={236} />
      {product}
      <line x1={x + 16} y1={168} x2={x + 120} y2={168} {...hair} />
      <line x1={x + 16} y1={176} x2={x + 96} y2={176} {...hair} />
      <Stars x={x + 22} cy={204} filled={5} r={6} gap={15} />
      <Price x={x + 16} y={232} size={15}>4.8 (12,406)</Price>
      <Price x={x + 16} y={264} size={17}>{price}</Price>
    </g>
  );
  return (
    <Frame
      width={800}
      height={296}
      label="Review hijacking: a listing for a $9 charging cable with 12,406 ratings averaging 4.8 is swapped to an $89 space heater, which keeps the same 4.8 from 12,406 ratings. Brushing: a merchant ships an empty parcel to a real house under a fake buyer account, which creates a verified purchase record and a 5-star review."
      svgProps={{ "data-plate": "fake-schemes" }}
    >
      <HalftoneDefs id={id} />
      <CatKey x={16} y={26} size={16}>Review hijacking</CatKey>
      {listing(16, <Cable id={id} cx={86} cy={108} />, "$9")}
      <Arrow x1={176} y1={108} x2={212} y2={108} />
      {listing(222, <Heater id={id} cx={306} cy={106} />, "$89")}

      <line x1={398} y1={16} x2={398} y2={284} {...hair} />

      <CatKey x={420} y={26} size={16}>Brushing</CatKey>
      <Shop id={id} x={420} y={52} w={78} h={70} />
      <Arrow x1={508} y1={98} x2={540} y2={98} />
      <EmptyParcel id={id} x={560} y={86} w={46} h={34} />
      <Arrow x1={634} y1={98} x2={680} y2={98} />
      <g transform="translate(722 96) scale(1.9)">
        <House id={id} cx={0} cy={0} />
      </g>
      <Arrow x1={722} y1={136} x2={722} y2={160} />
      <rect x={420} y={168} width={364} height={112} fill={CAT.tile} {...ink} />
      <Person id={id} cx={452} cy={214} s={0.8} />
      <Stars x={490} cy={196} filled={5} r={7} gap={18} />
      <path d="M586 186h150v22h-150Z" fill={CAT.amber} {...ink} />
      <CatKey x={661} y={202} size={14} anchor="middle">Verified purchase</CatKey>
      {[228, 242, 256].map((y, i) => (
        <line key={y} x1={490} y1={y} x2={[764, 740, 690][i]} y2={y} {...hair} />
      ))}
    </Frame>
  );
}

/* ---------------------------------------------------------------------------
   8. AI review summaries
   ------------------------------------------------------------------------ */

/** A review section with the AI summary and its attribute chips above the star average and the reviews. */
export function ReviewSummary() {
  const id = "w8-summary";
  const chips: [string, number][] = [
    ["Battery life", 412],
    ["Quiet motor", 268],
    ["Lid latch", 97],
  ];
  let cx = 300;
  const placed = chips.map(([name, count]) => {
    const w = r2(name.length * 8.2 + String(count).length * 9 + 36);
    const c = { name, count, x: cx, w };
    cx = r2(cx + w + 12);
    return c;
  });
  const latch = placed[2];
  const bars = [62, 21, 7, 4, 6];
  return (
    <Frame
      width={800}
      height={320}
      label="A portable blender's review section. At the top, an AI summary: customers praise the battery life and quiet motor, but several mention the lid latch feels fragile, with chips for battery life (412 reviews), quiet motor (268) and lid latch (97), and a cursor clicking the lid latch chip. Beside it, the 4.4 star average from 3,982 reviews, and below, individual reviews."
      svgProps={{ "data-plate": "review-summary" }}
    >
      <HalftoneDefs id={id} />
      <Tile x={16} y={12} w={768} h={296} />
      <Blender id={id} cx={110} cy={74} />
      <Price x={40} y={168} size={30}>4.4</Price>
      <Stars x={102} cy={158} filled={4} r={7} gap={17} />
      <CatKey x={40} y={190} size={14}>3,982 reviews</CatKey>
      {bars.map((p, i) => (
        <g key={i}>
          <Price x={48} y={i * 17 + 218} size={14} anchor="end">{5 - i}</Price>
          <rect x={56} y={i * 17 + 207} width={180} height={11} fill="none" {...hair} />
          <rect x={56} y={i * 17 + 207} width={r2(1.8 * p)} height={11} fill={CAT.ink} />
        </g>
      ))}

      <line x1={268} y1={30} x2={268} y2={290} {...hair} />
      <CatKey x={300} y={46} size={15}>Customers say</CatKey>
      <text x={300} y={76} fontFamily={BODY} fontSize={16} fill={CAT.ink}>Customers praise the battery life and quiet motor, but several</text>
      <text x={300} y={98} fontFamily={BODY} fontSize={16} fill={CAT.ink}>mention the lid latch feels fragile.</text>
      {placed.map((c) => (
        <g key={c.name}>
          <rect x={c.x} y={116} width={c.w} height={30} rx={15} fill={CAT.amber} {...ink} />
          <CatKey x={c.x + 16} y={136} size={14}>{c.name}</CatKey>
          <Price x={c.x + c.w - 16} y={136} size={14} anchor="end">{c.count}</Price>
        </g>
      ))}
      <Cursor x={latch.x + 52} y={143} scale={1.4} />

      {[0, 1].map((k) => {
        const x = 300 + k * 240;
        return (
          <g key={k}>
            <rect x={x} y={178} width={226} height={110} fill={CAT.tile} {...hair} />
            <Stars x={x + 18} cy={198} filled={k ? 2 : 5} r={5} gap={13} />
            {[222, 236, 250, 264].map((y, i) => (
              <line key={y} x1={x + 16} y1={y} x2={x + [200, 186, 206, 140][i]} y2={y} {...hair} />
            ))}
          </g>
        );
      })}
    </Frame>
  );
}
