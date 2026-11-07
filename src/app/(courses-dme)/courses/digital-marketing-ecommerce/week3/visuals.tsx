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
  ht,
  r2,
} from "../_visuals/kit";
import { Agent, AmberCoin, Coin, Cursor, Hotel, Jacket, Kettle, Padlock, Parcel, Person, Sneaker, Star, Stopwatch } from "../_visuals/objects";

/* ==========================================================================
   WEEK 3 PLATES: MAIL-ORDER CATALOGUE
   --------------------------------------------------------------------------
   Products engraved in halftone inside double-ruled white tiles, ink marks,
   and one amber mark for the slide's key idea. See the course CLAUDE.md.
   Search results are drawn as the catalogue page itself: a search slip
   above a ranked column of listings.
   ========================================================================== */

const ink = { stroke: CAT.ink, strokeWidth: LINE.outline, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
const hair = { stroke: CAT.ink, strokeWidth: LINE.hair, strokeLinecap: "round" as const };
const BODY_FONT = "var(--font-body)";

/** A search slip: a rounded bar with a magnifier and the typed query. `go` fills the magnifier button. */
function SearchBar({
  x,
  y,
  w,
  text,
  size = 13,
  go = "ink",
}: {
  x: number;
  y: number;
  w: number;
  text: string;
  size?: number;
  go?: "ink" | "amber" | "none";
}) {
  const h = 28;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={14} fill={CAT.tile} {...ink} />
      <text x={x + 14} y={r2(y + h / 2 + size * 0.36)} fontFamily={BODY_FONT} fontSize={size} fill={CAT.ink}>
        {text}
      </text>
      {go === "none" ? null : (
        <g>
          <circle cx={x + w - 14} cy={y + 14} r={10} fill={go === "amber" ? CAT.amber : CAT.ink} stroke={CAT.ink} strokeWidth={1} />
          <circle cx={x + w - 15.5} cy={y + 12.5} r={3.6} fill="none" stroke={go === "amber" ? CAT.ink : CAT.tile} strokeWidth={1.3} />
          <line x1={x + w - 12.8} y1={y + 15.2} x2={x + w - 10} y2={y + 18} stroke={go === "amber" ? CAT.ink : CAT.tile} strokeWidth={1.3} strokeLinecap="round" />
        </g>
      )}
    </g>
  );
}

/** Two hairlines standing for a listing's name or a line of copy. */
function NameLines({ x, y, w, gap = 5 }: { x: number; y: number; w: number; gap?: number }) {
  return (
    <g>
      <line x1={x} y1={y} x2={r2(x + w)} y2={y} {...hair} />
      <line x1={x} y1={r2(y + gap)} x2={r2(x + w * 0.7)} y2={r2(y + gap)} {...hair} />
    </g>
  );
}

/* --------------------------------------------------------------------------
   Search as the Engine of Commercial Intent
   -------------------------------------------------------------------------- */

/**
 * Two moments. Left: a shopper watching a feed on a phone, with a sneaker
 * ad wedged between the video and the news. Right: the same shopper types
 * a query and the results page answers it with matching sneakers. The
 * search button, the act the user starts, is amber.
 */
export function FeedVsQuery() {
  const id = "w3-feed";
  return (
    <Frame
      width={560}
      height={262}
      label="Left: a shopper watches a video feed on a phone and a sponsored sneaker ad is pushed in between the video and the news. Right: the same shopper types the query trail running shoes size 9 and presses search, shown in amber. The results page shows two matching trail shoes at $129 and $139."
    >
      <HalftoneDefs id={id} />
      {/* Left: the feed, interrupted */}
      <Person id={id} cx={44} cy={160} s={1.3} />
      <rect x={96} y={14} width={128} height={234} rx={14} fill={CAT.tile} {...ink} />
      <rect x={103} y={28} width={114} height={206} fill="none" {...hair} />
      <rect x={110} y={36} width={100} height={52} fill={ht(id, "dense")} {...hair} />
      <path d="M154 52V72L170 62Z" fill={CAT.tile} stroke={CAT.ink} strokeWidth={0.8} strokeLinejoin="round" />
      <NameLines x={110} y={98} w={96} />
      <g>
        <rect x={98} y={114} width={136} height={76} fill={CAT.tile} stroke={CAT.ink} strokeWidth={1.4} />
        <rect x={101} y={117} width={130} height={70} fill="none" stroke={CAT.ink} strokeWidth={0.45} />
        <CatKey x={226} y={131} size={10.5} anchor="end">
          Sponsored
        </CatKey>
        <Sneaker id={id} cx={152} cy={158} s={1.15} />
        <Price x={226} y={180} size={12} anchor="end">
          $119
        </Price>
      </g>
      <NameLines x={110} y={202} w={96} />
      <rect x={110} y={214} width={100} height={14} fill={ht(id, "dense")} {...hair} />

      <line x1={280} y1={18} x2={280} y2={244} {...hair} />

      {/* Right: the query, answered */}
      <SearchBar x={300} y={18} w={246} text="trail running shoes size 9" size={12.5} go="amber" />
      <Person id={id} cx={330} cy={166} s={1.3} />
      <Arrow x1={330} y1={128} x2={330} y2={56} />
      {[0, 1].map((k) => {
        const tx = 372 + k * 90;
        return (
          <g key={k}>
            <Tile x={tx} y={64} w={84} h={184} />
            <Numeral x={tx + 9} y={84} size={15}>
              {k + 1}
            </Numeral>
            <Sneaker id={id} cx={tx + 42} cy={134} s={1.2} />
            <NameLines x={tx + 10} y={180} w={58} />
            <Price x={tx + 10} y={232} size={14}>
              {k === 0 ? "$129" : "$139"}
            </Price>
          </g>
        );
      })}
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Classifying Search Queries by Intent
   -------------------------------------------------------------------------- */

/** The kettle's product page as a small document at (x, y), 46 × 58: amber kettle and five stars for its quality. */
function KettlePage({ id, x, y, amber = true }: { id: string; x: number; y: number; amber?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={46} height={58} fill={CAT.tile} {...ink} />
      <Kettle id={id} cx={x + 25} cy={y + 20} s={0.6} amber={amber} />
      {Array.from({ length: 5 }, (_, k) => (
        <Star key={k} cx={x + 8 + k * 7.5} cy={y + 41} r={2.8} />
      ))}
      <line x1={x + 6} y1={y + 50} x2={x + 34} y2={y + 50} {...hair} />
    </g>
  );
}

/** A crawler spider centred on (cx, cy): dense halftone body, white head band and eight legs. */
function Spider({ id, cx, cy }: { id: string; cx: number; cy: number }) {
  const legs = [-1, 1].flatMap((side) =>
    [-7, -2, 3, 8].map((dy, k) => `M${cx + side * 5} ${cy + dy * 0.6}L${cx + side * (13 + k)} ${cy + dy - 6}L${cx + side * (17 + k * 1.5)} ${cy + dy + 4}`),
  );
  return (
    <g>
      {legs.map((d, k) => (
        <path key={k} d={d} fill="none" {...ink} />
      ))}
      <ellipse cx={cx} cy={cy + 3} rx={7} ry={9} fill={ht(id, "dense")} {...ink} />
      <circle cx={cx} cy={cy - 8} r={4.5} fill={CAT.tile} {...ink} />
    </g>
  );
}

type Fault = "robots" | "noindex" | "script";
const FAULT_CODE: Record<Fault, { stage: 1 | 2; code: string }> = {
  robots: { stage: 1, code: "Disallow: /kettle" },
  noindex: { stage: 2, code: '<meta name="robots" content="noindex">' },
  script: { stage: 2, code: "<div id=root></div>" },
};

/**
 * The three stages as three stations: a spider fetching linked pages, a
 * card-index cabinet, and the ranked list. Under the first two sits the
 * slot the five-star kettle page reaches. The list's top row is its third.
 * Each fault stops the page at its stage, with the offending line printed
 * on the stop bar, and every slot after it stays empty.
 */
export function CrawlPipeline() {
  const [faults, setFaults] = useState<Fault[]>([]);
  const id = "w3-pipe";
  const stop = faults.length ? Math.min(...faults.map((f) => FAULT_CODE[f].stage)) : 4;
  const first = (["robots", "noindex", "script"] as Fault[]).find((f) => faults.includes(f) && FAULT_CODE[f].stage === stop);
  const reached = (stage: number) => stage < stop;
  const cx = [96, 280, 464];
  const slotY = 150;
  const stopX = stop === 1 ? 26 : stop === 2 ? 188 : 0;
  return (
    <div>
      <Frame
        width={560}
        height={226}
        label={
          stop === 4
            ? "The five-star kettle page passes all three stages: a spider crawls it, it is stored in the index cabinet, and it ranks first in the results list, marked in amber."
            : `The five-star kettle page stops at stage ${stop}, ${stop === 1 ? "crawling" : "rendering and indexing"}, because of ${first === "robots" ? "a robots.txt Disallow rule" : first === "noindex" ? "a noindex meta tag" : "content built only by client-side scripts"}. ${stop === 2 ? "It was crawled, but it is never stored in the index" : "It is never fetched"}, and the ranked list shows three other kettles.`
        }
      >
        <HalftoneDefs id={id} />
        {["1. Crawl", "2. Render + index", "3. Rank"].map((k, i) => (
          <CatKey key={k} x={cx[i]} y={16} size={10} anchor="middle">
            {k}
          </CatKey>
        ))}
        {/* Stage 1: a spider between linked pages */}
        {[
          [44, 34],
          [124, 34],
          [44, 96],
          [124, 96],
        ].map(([px, py], k) => (
          <g key={k}>
            <rect x={px} y={py} width={24} height={30} fill={CAT.tile} {...ink} />
            <line x1={px + 5} y1={py + 10} x2={px + 19} y2={py + 10} {...hair} />
            <line x1={px + 5} y1={py + 16} x2={px + 15} y2={py + 16} {...hair} />
          </g>
        ))}
        {[
          [68, 49, 80, 70],
          [124, 49, 112, 70],
          [68, 111, 82, 90],
          [124, 111, 110, 90],
        ].map(([x1, y1, x2, y2], k) => (
          <line key={k} x1={x1} y1={y1} x2={x2} y2={y2} stroke={CAT.ink} strokeWidth={0.6} strokeDasharray="2 2" />
        ))}
        <Spider id={id} cx={96} cy={80} />
        <Arrow x1={160} y1={80} x2={222} y2={80} />
        {/* Stage 2: the card-index cabinet */}
        <rect x={240} y={44} width={80} height={86} fill={CAT.tile} {...ink} />
        <path d="M236 52H324V30H236Z" fill={ht(id, "light")} {...ink} />
        {Array.from({ length: 9 }, (_, k) => (
          <path key={k} d={`M${242 + k * 9} 52V${36 + (k % 3) * 2}H${248 + k * 9}V52`} fill={CAT.tile} stroke={CAT.ink} strokeWidth={0.6} />
        ))}
        {[0, 1, 2].map((k) => (
          <g key={k}>
            <rect x={248} y={60 + k * 23} width={64} height={18} fill={CAT.tile} {...ink} />
            <rect x={272} y={66 + k * 23} width={16} height={6} fill={CAT.tile} {...ink} />
          </g>
        ))}
        <Arrow x1={338} y1={80} x2={400} y2={80} />
        {/* Stage 3: the ranked list */}
        {[0, 1, 2].map((r) => {
          const y = 34 + r * 34;
          const ours = r === 0 && reached(3);
          return (
            <g key={r}>
              <Tile x={414} y={y} w={132} h={30} />
              <Numeral x={422} y={y + 20} size={13}>
                {r + 1}
              </Numeral>
              <Kettle id={id} cx={454} cy={y + 16} s={0.5} amber={ours} />
              {ours
                ? Array.from({ length: 5 }, (_, k) => <Star key={k} cx={480 + k * 7.5} cy={y + 15} r={2.8} />)
                : <NameLines x={478} y={y + 12} w={50} gap={6} />}
            </g>
          );
        })}
        {/* the page's own route: slots it reached */}
        {[1, 2].map((stage) => {
          const x = cx[stage - 1] - 23;
          return reached(stage) ? (
            <KettlePage key={stage} id={id} x={x} y={slotY} />
          ) : (
            <rect key={stage} x={x} y={slotY} width={46} height={58} fill="none" stroke={CAT.ink} strokeWidth={0.6} strokeDasharray="3 3" />
          );
        })}
        {stop < 4 ? (
          <g>
            <line x1={stopX} y1={slotY - 4} x2={stopX} y2={slotY + 62} stroke={CAT.ink} strokeWidth={3} strokeLinecap="round" />
            <text x={stopX + 10} y={slotY + 76} fontFamily="ui-monospace, monospace" fontSize={10.5} fill={CAT.ink}>
              {first ? FAULT_CODE[first].code : ""}
            </text>
          </g>
        ) : null}
      </Frame>
      <Toggles<Fault>
        label="Site faults"
        value={faults}
        onChange={setFaults}
        options={[
          { id: "robots", label: "Blocked in robots.txt" },
          { id: "noindex", label: "noindex tag" },
          { id: "script", label: "Client-side scripts only" },
        ]}
      />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Lexical Matching, Semantic Embeddings, and Authority Signals
   -------------------------------------------------------------------------- */

type Signal = "lexical" | "semantic" | "authority" | "pogo";

/** Five result titles for "waterproof rain jacket". Bold parts repeat the query's exact words. */
const DOCS: { id: string; title: [string, boolean][]; links: number; pogo: boolean }[] = [
  { id: "A", title: [["Waterproof Rain Jacket", true], [" | ", false], ["Waterproof Rain Jacket", true], [" Sale", false]], links: 1, pogo: true },
  { id: "B", title: [["Storm shell, fully seam-taped, 20,000 mm", false]], links: 4, pogo: false },
  { id: "C", title: [["How to choose a ", false], ["rain jacket", true]], links: 2, pogo: false },
  { id: "D", title: [["Tested: 12 ", false], ["waterproof", true], [" shells for wet trails", false]], links: 9, pogo: false },
  { id: "E", title: [["Men's ", false], ["waterproof jacket", true], [" for ", false], ["rain", true]], links: 1, pogo: false },
];
const ORDER_BY: Record<Signal, string[]> = {
  lexical: ["A", "E", "C", "D", "B"],
  semantic: ["A", "B", "E", "C", "D"],
  authority: ["D", "A", "B", "E", "C"],
  pogo: ["D", "B", "E", "C", "A"],
};
const SIGNALS: Signal[] = ["lexical", "semantic", "authority", "pogo"];

/**
 * One query, five pages, re-ranked as each family of signals is switched
 * on. Lexical scoring rewards the page that repeats the exact words (bold).
 * Embeddings lift the storm shell (amber), which matches the meaning with
 * none of the words. The link column breaks ties for the magazine test.
 * And the stuffed page, whose visitors bounce straight back, falls last.
 */
export function RankSignals() {
  const [sig, setSig] = useState<Signal>("lexical");
  const id = "w3-signals";
  const level = SIGNALS.indexOf(sig);
  const order = ORDER_BY[sig];
  const rowY = (docId: string) => 60 + order.indexOf(docId) * 45;
  return (
    <div>
      <Frame
        width={560}
        height={290}
        label={`Results for waterproof rain jacket ranked by ${["lexical matching only", "lexical plus semantic embeddings", "lexical, semantic and link authority", "all signals including pogo-sticking"][level]}: ${order
          .map((d, i) => `${i + 1}. ${DOCS.find((x) => x.id === d)!.title.map((t) => t[0]).join("")}`)
          .join(". ")}. The storm shell page, which shares the meaning but not the words of the query, is amber.`}
      >
        <HalftoneDefs id={id} />
        <SearchBar x={14} y={8} w={300} text="waterproof rain jacket" size={13} go="ink" />
        {level >= 2 ? (
          <CatKey x={392} y={52} size={9}>
            Links in
          </CatKey>
        ) : null}
        {level >= 3 ? (
          <CatKey x={544} y={52} size={9} anchor="end">
            Bounce
          </CatKey>
        ) : null}
        {order.map((_, i) => (
          <g key={i}>
            <Tile x={14} y={60 + i * 45} w={532} h={40} />
            <Numeral x={26} y={60 + i * 45 + 26} size={15}>
              {i + 1}
            </Numeral>
          </g>
        ))}
        {DOCS.map((d) => {
          const y = rowY(d.id);
          const amber = d.id === "B";
          return (
            <g key={d.id} style={{ transform: `translate(0px, ${y}px)`, transition: "transform 450ms ease" }}>
              {amber ? <rect x={46} y={8} width={6} height={24} fill={CAT.amber} stroke={CAT.ink} strokeWidth={0.8} /> : null}
              <text x={60} y={19} fontFamily={BODY_FONT} fontSize={12.5} fill={amber ? CAT.amberText : CAT.ink}>
                {d.title.map(([t, exact], k) => (
                  <tspan key={k} fontWeight={exact && level === 0 ? 700 : 400}>
                    {t}
                  </tspan>
                ))}
              </text>
              <line x1={60} y1={29} x2={190} y2={29} {...hair} />
              {level >= 2
                ? Array.from({ length: d.links }, (_, k) => (
                    <g key={k}>
                      <rect x={392 + k * 9} y={12} width={6} height={8} fill={CAT.tile} stroke={CAT.ink} strokeWidth={0.7} />
                      <line x1={395 + k * 9} y1={21} x2={395 + k * 9} y2={27} stroke={CAT.ink} strokeWidth={0.7} />
                      <path d={`M${393 + k * 9} 25L${395 + k * 9} 28L${397 + k * 9} 25`} fill="none" stroke={CAT.ink} strokeWidth={0.7} />
                    </g>
                  ))
                : null}
              {level >= 3 && d.pogo ? (
                <g>
                  <path d="M512 30V16Q512 9 519 9Q526 9 526 16V22" fill="none" {...ink} />
                  <path d="M508 25L512 31L516 25" fill="none" {...ink} />
                  <Cursor x={524} y={20} scale={0.9} />
                </g>
              ) : null}
            </g>
          );
        })}
      </Frame>
      <Segmented<Signal>
        label="Ranking signals"
        value={sig}
        onChange={setSig}
        options={[
          { id: "lexical", label: "Lexical (BM25)" },
          { id: "semantic", label: "+ Embeddings" },
          { id: "authority", label: "+ Link authority" },
          { id: "pogo", label: "+ Pogo-sticking" },
        ]}
      />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Part 2: Search Engine Optimization (SEO) Strategy
   -------------------------------------------------------------------------- */

const ORGANIC = [0, 0, 0, 1, 1, 2, 2, 3, 4, 5, 6, 7];

/**
 * A year of clicks, month by month, one cursor per thousand. Upper row:
 * paid clicks, four a month, each month bought with a coin. Lower row:
 * organic clicks (amber), nothing for three months and then climbing, at
 * no cost per click. Stop paying and the paid row ends that month. The
 * organic row keeps growing.
 */
export function CompoundingClicks() {
  const [paidUntil, setPaidUntil] = useState(12);
  const id = "w3-compound";
  const colX = (m: number) => 74 + m * 34;
  const paidTotal = paidUntil * 4;
  const orgTotal = ORGANIC.reduce((a, b) => a + b, 0);
  return (
    <div>
      <Frame
        width={480}
        height={262}
        label={`Twelve months of clicks, one cursor per thousand. Paid search: four thousand clicks a month for ${paidUntil} months, each month paid with a coin, ${paidTotal} thousand in all, and none after spending stops. Organic search, in amber: no clicks for three months, then 1, 1, 2, 2, 3, 4, 5, 6 and 7 thousand a month, ${orgTotal} thousand in all, at no cost per click.`}
      >
        <HalftoneDefs id={id} />
        <CatKey x={12} y={16} size={10}>
          Paid
        </CatKey>
        <CatKey x={12} y={136} size={10}>
          Organic
        </CatKey>
        <line x1={64} y1={88.5} x2={474} y2={88.5} {...hair} />
        <line x1={64} y1={226.5} x2={474} y2={226.5} {...hair} />
        {Array.from({ length: 12 }, (_, m) => {
          const x = colX(m);
          const paid = m < paidUntil;
          return (
            <g key={m}>
              {paid
                ? Array.from({ length: 4 }, (_, c) => <Cursor key={c} x={x + 6} y={r2(70 - c * 15)} scale={1.05} />)
                : null}
              {paid ? <Coin id={id} cx={x + 12} cy={100} rx={10} ry={2.8} t={3} /> : null}
              {Array.from({ length: ORGANIC[m] }, (_, c) => (
                <Cursor key={c} x={x + 6} y={r2(208 - c * 15)} scale={1.05} tone="amber" />
              ))}
              <Price x={x + 12} y={244} size={11} anchor="middle">
                {m + 1}
              </Price>
            </g>
          );
        })}
        <CatKey x={12} y={244} size={10}>
          Month
        </CatKey>
        <Price x={60} y={16} size={13}>
          {`${paidTotal},000 clicks`}
        </Price>
        <Price x={96} y={136} size={13} fill={CAT.amberText}>
          {`${orgTotal},000 clicks`}
        </Price>
      </Frame>
      <Slider label="Ads paid until month" value={paidUntil} min={0} max={12} onChange={setPaidUntil} />
    </div>
  );
}

/* --------------------------------------------------------------------------
   On-Page, Technical, and Off-Page SEO
   -------------------------------------------------------------------------- */

/** A folded newspaper at (x, y), 44 × 34: masthead bar, a halftone photo and columns of copy. */
function Newspaper({ id, x, y }: { id: string; x: number; y: number }) {
  return (
    <g>
      <path d={`M${x} ${y}H${x + 44}V${y + 34}H${x}Z`} fill={CAT.tile} {...ink} />
      <rect x={x + 4} y={y + 4} width={36} height={5} fill={CAT.ink} />
      <rect x={x + 4} y={y + 12} width={16} height={12} fill={ht(id, "dense")} {...hair} />
      {[0, 1, 2].map((k) => (
        <line key={k} x1={x + 24} y1={y + 14 + k * 5} x2={x + 40} y2={y + 14 + k * 5} {...hair} />
      ))}
      <line x1={x + 4} y1={y + 29} x2={x + 40} y2={y + 29} {...hair} />
    </g>
  );
}

type Lever = "on" | "tech" | "off" | "black";

/**
 * One kettle page and where it ranks. Left: the results ladder, positions
 * 1 to 10, with the page's listing in amber. Right: the page itself. On-page
 * work prints its title tag, headings and internal links. Technical work
 * turns the slow stopwatch fast, shuts the HTTPS lock and adds a sitemap.
 * Off-page work brings three newspapers linking in. Each lifts the listing.
 * A link farm on the right gets the page de-indexed: its listing leaves the
 * ladder.
 */
export function SeoLevers() {
  const [levers, setLevers] = useState<Lever[]>([]);
  const id = "w3-seo";
  const on = (l: Lever) => levers.includes(l);
  const banned = on("black");
  const rank = 9 - (on("on") ? 3 : 0) - (on("tech") ? 2 : 0) - (on("off") ? 3 : 0);
  const px = 268;
  const py = 46;
  return (
    <div>
      <Frame
        width={460}
        height={312}
        label={
          banned
            ? "The kettle page is surrounded by a link farm of identical pages and has been de-indexed: its amber listing is gone from the results ladder."
            : `The kettle page ranks number ${rank} of 10. ${on("on") ? "On-page: its title tag, headings and internal links are written. " : "On-page: no title tag or headings. "}${on("tech") ? "Technical: the stopwatch reads fast, the HTTPS lock is shut and a sitemap is in place. " : "Technical: the stopwatch reads slow and the lock is open. "}${on("off") ? "Off-page: three newspapers link to it." : "Off-page: no outside links."}`
        }
      >
        <HalftoneDefs id={id} />
        {/* the ladder */}
        {Array.from({ length: 10 }, (_, k) => {
          const y = 12 + k * 28;
          const ours = !banned && k + 1 === rank;
          return (
            <g key={k}>
              <Numeral x={14} y={y + 18} size={13}>
                {k + 1}
              </Numeral>
              {ours ? (
                <g>
                  <Tile x={36} y={y} w={112} h={24} />
                  <Kettle id={id} cx={60} cy={y + 13} s={0.48} amber />
                  <NameLines x={82} y={y + 10} w={52} gap={5} />
                </g>
              ) : (
                <g>
                  <rect x={36} y={y} width={112} height={24} fill={CAT.tile} stroke={CAT.ink} strokeWidth={0.6} />
                  <NameLines x={46} y={y + 10} w={70} gap={5} />
                </g>
              )}
            </g>
          );
        })}
        {banned ? (
          <CatKey x={92} y={306} size={9} anchor="middle">
            De-indexed
          </CatKey>
        ) : null}
        {/* the page */}
        <rect x={px} y={py} width={116} height={170} fill={CAT.tile} stroke={CAT.ink} strokeWidth={banned ? 0.8 : LINE.outline} strokeDasharray={banned ? "4 3" : undefined} />
        {on("on") ? (
          <g>
            <rect x={px + 8} y={py + 8} width={100} height={9} fill={CAT.ink} />
            <rect x={px + 8} y={py + 24} width={70} height={5} fill={CAT.ink} />
          </g>
        ) : null}
        <Kettle id={id} cx={px + 58} cy={py + 62} s={1.1} />
        {on("on") ? (
          <g>
            <rect x={px + 8} y={py + 92} width={52} height={3.5} fill={CAT.ink} />
            <NameLines x={px + 8} y={py + 102} w={100} gap={6} />
            <rect x={px + 8} y={py + 120} width={52} height={3.5} fill={CAT.ink} />
            <NameLines x={px + 8} y={py + 130} w={100} gap={6} />
            {[0, 1, 2].map((k) => (
              <line key={k} x1={px + 8 + k * 34} y1={py + 156} x2={px + 34 + k * 34} y2={py + 156} stroke={CAT.ink} strokeWidth={1} />
            ))}
          </g>
        ) : (
          <NameLines x={px + 8} y={py + 110} w={60} gap={6} />
        )}
        {/* technical footing */}
        <Stopwatch cx={px + 18} cy={py + 196} r={11} t={on("tech") ? 1 : 6.5} />
        <Padlock cx={px + 58} cy={py + 196} shut={on("tech")} />
        {on("tech") ? (
          <g {...ink} fill="none">
            <rect x={px + 88} y={py + 182} width={12} height={8} fill={CAT.tile} />
            <path d={`M${px + 94} ${py + 190}V${py + 196}M${px + 84} ${py + 196}H${px + 104}M${px + 84} ${py + 196}V${py + 200}M${px + 104} ${py + 196}V${py + 200}`} />
            <rect x={px + 79} y={py + 200} width={10} height={7} fill={CAT.tile} />
            <rect x={px + 99} y={py + 200} width={10} height={7} fill={CAT.tile} />
          </g>
        ) : null}
        {/* off-page: newspapers linking in */}
        {on("off")
          ? [60, 112, 164].map((y, k) => (
              <g key={k}>
                <Newspaper id={id} x={178} y={y} />
                <Arrow x1={226} y1={y + 17} x2={px - 4} y2={r2(py + 50 + k * 40)} />
              </g>
            ))
          : null}
        {/* black hat: a link farm */}
        {banned
          ? Array.from({ length: 12 }, (_, k) => {
              const fx = 400 + (k % 3) * 18;
              const fy = 60 + Math.floor(k / 3) * 30;
              return (
                <g key={k}>
                  <rect x={fx} y={fy} width={12} height={16} fill={CAT.tile} stroke={CAT.ink} strokeWidth={0.6} />
                  <line x1={fx + 2} y1={fy + 6} x2={fx + 10} y2={fy + 6} stroke={CAT.ink} strokeWidth={0.4} />
                </g>
              );
            })
          : null}
        {banned ? <Arrow x1={398} y1={112} x2={px + 120} y2={112} /> : null}
      </Frame>
      <Toggles<Lever>
        label="SEO work"
        value={levers}
        onChange={setLevers}
        options={[
          { id: "on", label: "On-page" },
          { id: "tech", label: "Technical" },
          { id: "off", label: "Off-page" },
          { id: "black", label: "Buy a link farm" },
        ]}
      />
    </div>
  );
}

/* --------------------------------------------------------------------------
   The Long Tail of E-Commerce Search
   -------------------------------------------------------------------------- */

const TAIL_N = 80;
/** Monthly searches per query, by rank: a power law, v ∝ k^-0.8. */
const VOLUME = Array.from({ length: TAIL_N }, (_, k) => Math.pow(k + 1, -0.8));
/** Conversion rises from about 1% on the head to 5% deep in the tail. */
const CONV = Array.from({ length: TAIL_N }, (_, k) => 0.01 + 0.04 * Math.min(1, k / 30));
const VOL_SUM = VOLUME.reduce((a, b) => a + b, 0);
const ORD_SUM = VOLUME.reduce((a, v, k) => a + v * CONV[k], 0);

/**
 * Eighty queries for running shoes, ranked by monthly searches: a few tall
 * head bars and a long flat tail (amber). Move the cut between head and
 * tail. Below, twenty cursors split searches and twenty parcels split
 * orders between the two: the tail holds most of the searches, and even
 * more of the orders, because its shoppers convert at higher rates.
 */
export function LongTail() {
  const [head, setHead] = useState(5);
  const id = "w3-tail";
  const x0 = 40;
  const step = 6.25;
  const base = 172;
  const hMax = 140;
  const headVol = VOLUME.slice(0, head).reduce((a, b) => a + b, 0) / VOL_SUM;
  const headOrd = VOLUME.slice(0, head).reduce((a, v, k) => a + v * CONV[k], 0) / ORD_SUM;
  const nSearch = Math.round(20 * headVol);
  const nOrder = Math.round(20 * headOrd);
  const cutX = r2(x0 + head * step - 1);
  return (
    <div>
      <Frame
        width={560}
        height={292}
        label={`Eighty running-shoe queries ranked by monthly searches, falling as a power law from running shoes to long queries such as women's wide waterproof trail running shoes size 8. With the top ${head} queries counted as the head, the long tail (amber) holds ${Math.round((1 - headVol) * 100)}% of searches and ${Math.round((1 - headOrd) * 100)}% of orders.`}
      >
        <HalftoneDefs id={id} />
        {VOLUME.map((v, k) => {
          const h = r2((hMax * v) / VOLUME[0]);
          const tail = k >= head;
          return (
            <rect
              key={k}
              x={r2(x0 + k * step)}
              y={r2(base - h)}
              width={4.5}
              height={h}
              fill={tail ? CAT.amber : ht(id, "dense")}
              stroke={CAT.ink}
              strokeWidth={0.5}
            />
          );
        })}
        <line x1={x0 - 4} y1={base + 0.5} x2={548} y2={base + 0.5} {...ink} />
        <line x1={cutX} y1={48} x2={cutX} y2={base + 6} stroke={CAT.ink} strokeWidth={0.8} strokeDasharray="3 2" />
        <text x={x0 + 10} y={38} fontFamily={BODY_FONT} fontSize={11.5} fill={CAT.ink}>
          running shoes
        </text>
        <text x={250} y={140} fontFamily={BODY_FONT} fontSize={11.5} fill={CAT.ink}>
          women&apos;s wide waterproof trail running shoes size 8
        </text>
        <line x1={x0 + 57 * step + 2} y1={146} x2={x0 + 57 * step + 2} y2={160} {...hair} />
        <CatKey x={12} y={18} size={10.5}>
          Searches per month, by query
        </CatKey>
        {/* readouts: searches and orders, head against tail */}
        <CatKey x={12} y={218} size={10.5}>
          Searches
        </CatKey>
        <CatKey x={12} y={268} size={10.5}>
          Orders
        </CatKey>
        {Array.from({ length: 20 }, (_, k) => (
          <Cursor key={k} x={110 + k * 19} y={204} scale={1.1} tone={k < nSearch ? "ink" : "amber"} />
        ))}
        {Array.from({ length: 20 }, (_, k) => (
          <Parcel key={k} id={id} x={108 + k * 19} y={258} w={12} h={10} tone={k < nOrder ? "ink" : "amber"} />
        ))}
        <Price x={548} y={220} size={15} anchor="end" fill={CAT.amberText}>
          {`${Math.round((1 - headVol) * 100)}%`}
        </Price>
        <Price x={548} y={270} size={15} anchor="end" fill={CAT.amberText}>
          {`${Math.round((1 - headOrd) * 100)}%`}
        </Price>
      </Frame>
      <Slider label="Head terms" value={head} min={1} max={20} onChange={setHead} formatValue={(v) => `top ${v}`} />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Part 3: Paid Search (SEM) and Auction Mechanics
   -------------------------------------------------------------------------- */

const RIVALS = [
  { id: "a", bid: 4.0, qs: 4 },
  { id: "b", bid: 2.0, qs: 9 },
  { id: "c", bid: 3.0, qs: 5 },
];
const money = (n: number) => `$${n.toFixed(2)}`;

/**
 * The auction for "gooseneck kettle": your kettle (amber) against three
 * rivals for three paid slots. Each row prints the bid, the Quality Score
 * as ten squares, Ad Rank = bid × Quality Score, and what the slot pays:
 * the Ad Rank of the row below divided by the payer's own Quality Score,
 * plus one cent. The fourth Ad Rank wins no slot. Raise your Quality Score
 * and you climb while your price per click falls.
 */
export function AuctionDesk() {
  const [bid, setBid] = useState(2.5);
  const [qs, setQs] = useState(7);
  const id = "w3-gsp";
  const all = [{ id: "you", bid, qs }, ...RIVALS]
    .map((a) => ({ ...a, rank: a.bid * a.qs }))
    .sort((p, q) => q.rank - p.rank || q.bid - p.bid);
  const pos = (aid: string) => all.findIndex((a) => a.id === aid);
  const rowY = (i: number) => 28 + i * 52;
  const youAt = pos("you");
  const youPays = youAt < 3 ? all[youAt + 1].rank / qs + 0.01 : null;
  return (
    <div>
      <Frame
        width={560}
        height={238}
        label={`Ad auction for gooseneck kettle. ${all
          .map((a, i) => `${i < 3 ? `Slot ${i + 1}` : "No slot"}: ${a.id === "you" ? "your kettle (amber)" : "a rival kettle"}, bid ${money(a.bid)}, Quality Score ${a.qs}, Ad Rank ${a.rank.toFixed(1)}${i < 3 ? `, pays ${money(all[i + 1].rank / a.qs + 0.01)} per click` : ""}`)
          .join(". ")}.`}
      >
        <HalftoneDefs id={id} />
        <CatKey x={22} y={16} size={9.5}>Slot</CatKey>
        <CatKey x={124} y={16} size={9.5}>Bid</CatKey>
        <CatKey x={178} y={16} size={9.5}>Quality score</CatKey>
        <CatKey x={308} y={16} size={9.5}>Ad rank</CatKey>
        <CatKey x={548} y={16} size={9.5} anchor="end">Pays per click</CatKey>
        {[0, 1, 2, 3].map((i) =>
          i < 3 ? (
            <g key={i}>
              <Tile x={10} y={rowY(i)} w={544} h={46} />
              <Numeral x={22} y={rowY(i) + 29} size={16}>
                {i + 1}
              </Numeral>
            </g>
          ) : (
            <g key={i}>
              <rect x={10} y={rowY(i)} width={544} height={46} fill="none" stroke={CAT.ink} strokeWidth={0.6} strokeDasharray="3 3" />
              <CatKey x={544} y={rowY(i) + 28} size={9.5} anchor="end">
                No slot
              </CatKey>
            </g>
          ),
        )}
        {all.map((a) => {
          const i = pos(a.id);
          const you = a.id === "you";
          const next = all[i + 1];
          return (
            <g key={a.id} style={{ transform: `translate(0px, ${rowY(i)}px)`, transition: "transform 400ms ease" }}>
              <Kettle id={id} cx={70} cy={25} s={0.72} amber={you} />
              <Price x={124} y={28} size={13}>
                {money(a.bid)}
              </Price>
              {Array.from({ length: 10 }, (_, k) => (
                <rect key={k} x={178 + k * 12} y={17} width={9} height={9} fill={k < a.qs ? CAT.ink : CAT.tile} stroke={CAT.ink} strokeWidth={0.7} />
              ))}
              <Price x={308} y={28} size={12.5}>
                {`${a.bid.toFixed(2)} × ${a.qs} = ${a.rank.toFixed(1)}`}
              </Price>
              {next ? (
                <Price x={544} y={28} size={12.5} anchor="end" fill={you ? CAT.amberText : CAT.ink}>
                  {`${next.rank.toFixed(1)} ÷ ${a.qs} + 0.01 = ${money(next.rank / a.qs + 0.01)}`}
                </Price>
              ) : null}
            </g>
          );
        })}
      </Frame>
      <Slider label="Your max CPC bid" value={bid} min={0.5} max={5} step={0.1} onChange={setBid} formatValue={money} />
      <Slider label="Your Quality Score" value={qs} min={1} max={10} onChange={setQs} />
      <p className="sr-only" aria-live="polite">
        {youPays === null ? "Your ad wins no slot." : `Your ad takes slot ${youAt + 1} and pays ${money(youPays)} per click.`}
      </p>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Keyword Match Types, Negative Keywords, and Automated Bidding
   -------------------------------------------------------------------------- */

type Match = "exact" | "phrase" | "broad";
type Negative = "free" | "repair" | "battery replacement";
const KEYWORD_AS: Record<Match, string> = { exact: "[luxury dive watch]", phrase: '"luxury dive watch"', broad: "luxury dive watch" };
const MATCH_RANK: Record<Match, number> = { exact: 0, phrase: 1, broad: 2 };
/** Incoming searches: the loosest match type that still triggers the ad, the negative that would block it, and whether the click turns into an order. */
const SEARCHES: { q: string; needs: Match; neg?: Negative; order: boolean }[] = [
  { q: "luxury dive watch", needs: "exact", order: true },
  { q: "luxury dive watch for men", needs: "phrase", order: true },
  { q: "steel luxury dive watch 300m", needs: "phrase", order: true },
  { q: "luxury dive watch battery replacement", needs: "phrase", neg: "battery replacement", order: false },
  { q: "free luxury dive watch giveaway", needs: "phrase", neg: "free", order: false },
  { q: "swiss automatic diver's watch", needs: "broad", order: true },
  { q: "dive watch repair near me", needs: "broad", neg: "repair", order: false },
  { q: "cheap smartwatch for swimming", needs: "broad", order: false },
];

/**
 * One keyword, eight searches. Each search the ad shows on costs a click
 * (a coin). Clicks that end in an order earn a parcel, and clicks that never
 * could are amber coins, the wasted spend. Loosen the match type and the ad
 * reaches more searches. Add negative keywords and the unprofitable ones are
 * struck out.
 */
export function MatchTypes() {
  const [match, setMatch] = useState<Match>("phrase");
  const [negs, setNegs] = useState<Negative[]>([]);
  const id = "w3-match";
  const shown = SEARCHES.map((q) => MATCH_RANK[q.needs] <= MATCH_RANK[match] && !(q.neg && negs.includes(q.neg)));
  const blocked = SEARCHES.map((q) => MATCH_RANK[q.needs] <= MATCH_RANK[match] && !!q.neg && negs.includes(q.neg));
  const clicks = shown.filter(Boolean).length;
  const orders = SEARCHES.filter((q, i) => shown[i] && q.order).length;
  const wasted = clicks - orders;
  return (
    <div>
      <Frame
        width={560}
        height={318}
        label={`Keyword ${KEYWORD_AS[match]} as ${match} match${negs.length ? `, with negative keywords ${negs.join(", ")}` : ""}. The ad shows on ${clicks} of 8 searches: ${SEARCHES.filter((_, i) => shown[i])
          .map((q) => q.q)
          .join(". ")}. ${orders} clicks lead to orders and ${wasted} are wasted spend, drawn as amber coins.`}
      >
        <HalftoneDefs id={id} />
        <CatKey x={10} y={23} size={10.5}>
          Keyword
        </CatKey>
        <rect x={84} y={6} width={220} height={24} rx={4} fill={CAT.tile} {...ink} />
        <text x={96} y={23} fontFamily="ui-monospace, monospace" fontSize={13} fill={CAT.ink}>
          {KEYWORD_AS[match]}
        </text>
        <CatKey x={414} y={22} size={11} anchor="middle">
          Click
        </CatKey>
        <CatKey x={480} y={22} size={11} anchor="middle">
          Order
        </CatKey>
        {SEARCHES.map((q, i) => {
          const y = 42 + i * 30;
          const on = shown[i];
          const struck = blocked[i];
          return (
            <g key={q.q}>
              <rect x={10} y={y} width={350} height={24} rx={12} fill={CAT.tile} stroke={CAT.ink} strokeWidth={on ? LINE.outline : 0.6} />
              <text x={24} y={y + 16} fontFamily={BODY_FONT} fontSize={12} fill={CAT.ink} opacity={on || struck ? 1 : 0.55}>
                {q.q}
              </text>
              {struck ? (
                <g>
                  <line x1={20} y1={y + 12} x2={300} y2={y + 12} stroke={CAT.ink} strokeWidth={1.4} />
                  <CatKey x={352} y={y + 16} size={8.5} anchor="end">
                    Negative
                  </CatKey>
                </g>
              ) : null}
              {on ? (
                <g>
                  <AmberCoin id={id} cx={414} cy={y + 9} amber={!q.order} />
                  {q.order ? <Parcel id={id} x={466} y={y + 7} w={16} h={12} /> : null}
                </g>
              ) : null}
            </g>
          );
        })}
        <line x1={380} y1={286.5} x2={550} y2={286.5} {...hair} />
        <Price x={414} y={306} size={14} anchor="middle" fill={wasted ? CAT.amberText : CAT.ink}>
          {`${wasted} wasted`}
        </Price>
        <Price x={500} y={306} size={14} anchor="middle">
          {`${orders} orders`}
        </Price>
      </Frame>
      <Segmented<Match>
        label="Match type"
        value={match}
        onChange={setMatch}
        options={[
          { id: "exact", label: "Exact" },
          { id: "phrase", label: "Phrase" },
          { id: "broad", label: "Broad" },
        ]}
      />
      <Toggles<Negative>
        label="Negative keywords"
        value={negs}
        onChange={setNegs}
        options={[
          { id: "free", label: "free" },
          { id: "repair", label: "repair" },
          { id: "battery replacement", label: "battery replacement" },
        ]}
      />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Part 4: Search Cannibalization and Incrementality
   -------------------------------------------------------------------------- */

type Rivals = "none" | "conquest";
type Organic = "top" | "fold";
/** Where twenty brand-ad clicks go once the ad is paused, by market position. */
const AFTER_PAUSE: Record<Rivals, Record<Organic, { organic: number; rival: number; lost: number }>> = {
  none: { top: { organic: 19, rival: 0, lost: 1 }, fold: { organic: 10, rival: 0, lost: 10 } },
  conquest: { top: { organic: 12, rival: 8, lost: 0 }, fold: { organic: 6, rival: 10, lost: 4 } },
};

/** A small grid of cursors, ten to a row, tips starting at (x, y). */
function CursorGrid({ x, y, n, tone }: { x: number; y: number; n: number; tone: "ink" | "amber" | "purple" }) {
  return (
    <g>
      {Array.from({ length: n }, (_, k) => (
        <Cursor key={k} x={r2(x + (k % 10) * 12)} y={r2(y + Math.floor(k / 10) * 15)} scale={0.85} tone={tone} />
      ))}
    </g>
  );
}

/**
 * The results page for the brand's own name. While the brand ad runs, it
 * takes twenty clicks. Pause it: clicks that simply move to the brand's
 * organic link are amber (they would have arrived for free), clicks a
 * conquesting rival takes are purple, and clicks that find nothing leave
 * the page. The readout counts what the ad really added.
 */
export function PauseBrandAds() {
  const [rivals, setRivals] = useState<Rivals>("none");
  const [organic, setOrganic] = useState<Organic>("top");
  const [paused, setPaused] = useState(false);
  const id = "w3-pause";
  const after = AFTER_PAUSE[rivals][organic];
  const added = 20 - after.organic;
  const rows: ("ad" | "rival" | "other" | "fold" | "ours")[] = [
    "ad",
    ...(rivals === "conquest" ? (["rival"] as const) : []),
    ...(organic === "top" ? (["ours", "other", "other", "other"] as const) : (["other", "other", "other", "fold", "ours"] as const)),
  ];
  let y = 44;
  const placed = rows.map((r) => {
    const at = y;
    y += r === "fold" ? 14 : 42;
    return { r, y: at };
  });
  return (
    <div>
      <Frame
        width={560}
        height={316}
        label={
          paused
            ? `Brand ad paused${rivals === "conquest" ? ", with a rival advertising on the brand's name" : ", with no rival ads"}, and the brand's organic link ${organic === "top" ? "at the top" : "pushed below the fold"}. Of 20 former ad clicks, ${after.organic} go to the brand's organic link (amber), ${after.rival} to the rival's ad (purple) and ${after.lost} leave the page. The ad added ${added} of 20 clicks.`
            : `The brand's own ad runs on the query patagonia fleece and takes 20 clicks${rivals === "conquest" ? ", above a rival's ad on the same name" : ""}. The brand's organic link is ${organic === "top" ? "right below" : "below the fold"}.`
        }
      >
        <HalftoneDefs id={id} />
        <SearchBar x={10} y={8} w={250} text="patagonia fleece" size={13} go="ink" />
        {placed.map(({ r, y }, k) => {
          if (r === "fold") {
            return (
              <g key={k}>
                <line x1={6} y1={y + 6} x2={364} y2={y + 6} stroke={CAT.ink} strokeWidth={0.8} strokeDasharray="5 3" />
              </g>
            );
          }
          const sponsored = r === "ad" || r === "rival";
          const pausedAd = r === "ad" && paused;
          return (
            <g key={k}>
              {pausedAd ? (
                <rect x={10} y={y} width={350} height={38} fill="none" stroke={CAT.ink} strokeWidth={0.6} strokeDasharray="3 3" />
              ) : (
                <g>
                  <Tile x={10} y={y} w={350} h={38} />
                  <g transform={`translate(${36} ${y + 19}) scale(0.22)`}>
                    <Jacket id={id} cx={0} cy={0} />
                  </g>
                  {sponsored ? (
                    <CatKey x={352} y={y + 14} size={10.5} anchor="end" fill={r === "rival" ? CAT.purple : CAT.ink}>
                      Sponsored
                    </CatKey>
                  ) : null}
                  {r === "ours" || r === "ad" ? (
                    <g>
                      <CatKey x={58} y={y + 17} size={10.5}>
                        Patagonia
                      </CatKey>
                      <line x1={58} y1={y + 26} x2={120} y2={y + 26} {...hair} />
                    </g>
                  ) : (
                    <NameLines x={58} y={y + 15} w={52} gap={6} />
                  )}
                </g>
              )}
              {r === "ad" && !paused ? <CursorGrid x={152} y={y + 5} n={20} tone="ink" /> : null}
              {r === "ours" && paused ? <CursorGrid x={152} y={y + 5} n={after.organic} tone="amber" /> : null}
              {r === "rival" && paused ? <CursorGrid x={152} y={y + 5} n={after.rival} tone="purple" /> : null}
            </g>
          );
        })}
        {/* readout */}
        <CatKey x={460} y={60} size={10.5} anchor="middle">
          Clicks the ad added
        </CatKey>
        <Price x={460} y={100} size={28} anchor="middle" >
          {paused ? `${added}` : "?"}
        </Price>
        <CatKey x={460} y={120} size={10.5} anchor="middle">
          of 20
        </CatKey>
        {paused && after.lost ? (
          <g>
            <CatKey x={460} y={178} size={10.5} anchor="middle">
              Left the page
            </CatKey>
            <CursorGrid x={r2(460 - Math.min(10, after.lost) * 6 + 2)} y={188} n={after.lost} tone="ink" />
          </g>
        ) : null}
      </Frame>
      <div className="mt-1 flex flex-wrap items-center gap-3 px-1">
        <PlateButton onClick={() => setPaused((v) => !v)}>{paused ? "Resume the brand ad" : "Pause the brand ad"}</PlateButton>
      </div>
      <Segmented<Rivals>
        label="Rivals on your name"
        value={rivals}
        onChange={setRivals}
        options={[
          { id: "none", label: "None" },
          { id: "conquest", label: "Conquesting" },
        ]}
      />
      <Segmented<Organic>
        label="Your organic link"
        value={organic}
        onChange={setOrganic}
        options={[
          { id: "top", label: "Top result" },
          { id: "fold", label: "Below the fold" },
        ]}
      />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Discussion: Auditing a High-ROAS Search Agency Report
   -------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
   Part 5: From Search Engines to AI Answer Engines
   -------------------------------------------------------------------------- */

/** A web page at (x, y), 52 × 64: a kettle photo and lines of copy. */
function WebPage({ id, x, y }: { id: string; x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width={52} height={64} fill={CAT.tile} {...ink} />
      <rect x={x} y={y} width={52} height={7} fill={ht(id, "dense")} {...hair} />
      <Kettle id={id} cx={x + 28} cy={y + 24} s={0.55} />
      {[0, 1, 2].map((k) => (
        <line key={k} x1={x + 6} y1={y + 42 + k * 6} x2={x + (k === 2 ? 30 : 46)} y2={y + 42 + k * 6} {...hair} />
      ))}
    </g>
  );
}

type Engine = "search" | "answer";

/**
 * Who does the reading. Search engine: ten blue links, four of them opened
 * as tabs, and the shopper reading and comparing across them. Answer
 * engine: an AI agent reads the same candidate pages and hands the shopper
 * a single answer with a shortlist of three cited kettles (amber).
 */
export function WhoReads() {
  const [engine, setEngine] = useState<Engine>("search");
  const id = "w3-reads";
  return (
    <div>
      <Frame
        width={480}
        height={250}
        label={
          engine === "search"
            ? "Search engine: a list of ten links, the first four opened as four browser tabs, and the shopper left to read and compare across the tabs."
            : "Answer engine: an AI agent reads four candidate pages and gives the shopper one synthesized answer with a shortlist of three cited kettles, in amber."
        }
      >
        <HalftoneDefs id={id} />
        <Person id={id} cx={436} cy={128} s={1.5} />
        {engine === "search" ? (
          <g>
            {Array.from({ length: 10 }, (_, k) => (
              <g key={k}>
                <rect x={12} y={18 + k * 21} width={118} height={16} fill={CAT.tile} stroke={CAT.ink} strokeWidth={k < 4 ? 1.6 : 0.6} />
                <Numeral x={18} y={30 + k * 21} size={10}>
                  {k + 1}
                </Numeral>
                <line x1={34} y1={26 + k * 21} x2={108} y2={26 + k * 21} {...hair} />
              </g>
            ))}
            {/* the browser: four tabs opened from links 1 to 4 */}
            {[0, 1, 2, 3].map((k) => (
              <g key={k}>
                <path d={`M${160 + k * 54} 46V34Q${160 + k * 54} 28 ${166 + k * 54} 28H${206 + k * 54}Q${212 + k * 54} 28 ${212 + k * 54} 34V46`} fill={k === 3 ? CAT.tile : ht(id, "light")} {...ink} />
                <Numeral x={168 + k * 54} y={42} size={11}>
                  {k + 1}
                </Numeral>
              </g>
            ))}
            <rect x={156} y={46} width={232} height={176} fill={CAT.tile} {...ink} />
            <Kettle id={id} cx={214} cy={104} s={1.5} />
            {[0, 1, 2, 3, 4].map((k) => (
              <line key={k} x1={272} y1={80 + k * 12} x2={k === 4 ? 340 : 374} y2={80 + k * 12} {...hair} />
            ))}
            {[0, 1, 2].map((k) => (
              <line key={k} x1={170} y1={160 + k * 12} x2={k === 2 ? 300 : 374} y2={160 + k * 12} {...hair} />
            ))}
          </g>
        ) : (
          <g>
            {[0, 1, 2, 3].map((k) => (
              <g key={k}>
                <g transform={`translate(40 ${8 + k * 60}) scale(0.8)`}>
                  <WebPage id={id} x={0} y={0} />
                </g>
                <Arrow x1={88} y1={r2(34 + k * 60)} x2={166} y2={r2(116 + k * 8)} w={0.8} s={5} />
              </g>
            ))}
            <Agent id={id} cx={196} cy={128} s={1.25} />
            <Arrow x1={226} y1={128} x2={246} y2={128} />
            <rect x={252} y={44} width={140} height={170} fill={CAT.tile} {...ink} />
            {[0, 1, 2].map((k) => (
              <line key={k} x1={262} y1={60 + k * 8} x2={k === 2 ? 330 : 382} y2={60 + k * 8} {...hair} />
            ))}
            {[0, 1, 2].map((k) => (
              <g key={k}>
                <Tile x={262} y={88 + k * 40} w={120} h={36} />
                <Numeral x={270} y={111 + k * 40} size={12}>
                  {k + 1}
                </Numeral>
                <Kettle id={id} cx={302} cy={107 + k * 40} s={0.58} amber />
                <line x1={326} y1={102 + k * 40} x2={372} y2={102 + k * 40} {...hair} />
                <line x1={326} y1={110 + k * 40} x2={356} y2={110 + k * 40} {...hair} />
              </g>
            ))}
            <Arrow x1={396} y1={140} x2={410} y2={136} />
          </g>
        )}
      </Frame>
      <Segmented<Engine>
        label="Engine"
        value={engine}
        onChange={setEngine}
        options={[
          { id: "search", label: "Search engine: ten links" },
          { id: "answer", label: "Answer engine: RAG" },
        ]}
      />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Generative Engine Optimization (GEO) and the AI Shortlist
   -------------------------------------------------------------------------- */

type Evidence = "numbers" | "table" | "citations" | "schema";
/** Retrieval rank of the brand's page among eight candidates, by how many kinds of evidence it carries. */
const GEO_RANK = [7, 5, 4, 3, 1];
/** Clicks per 100 searches on a page of ten blue links, by position. */
const SERP_CLICKS = [28, 15, 10, 7, 5, 4, 3, 2];

/**
 * The brand's kettle page and where retrieval places it. Left: the page,
 * vague superlatives until evidence is added (figures, a comparison table,
 * third-party citations, JSON-LD). Middle: eight candidate pages by
 * retrieval rank, the brand's in amber. Right: what that rank earns. On
 * ten blue links even fifth place gets a trickle of clicks. The AI answer
 * names only three kettles, so the brand is in the answer or out of it.
 */
export function ShortlistEvidence() {
  const [ev, setEv] = useState<Evidence[]>([]);
  const id = "w3-geo";
  const has = (e: Evidence) => ev.includes(e);
  const rank = GEO_RANK[ev.length];
  const clicks = SERP_CLICKS[rank - 1];
  const inAnswer = rank <= 3;
  const px = 10;
  return (
    <div>
      <Frame
        width={560}
        height={262}
        label={`The brand's kettle page ${ev.length ? `carries ${ev.map((e) => ({ numbers: "verifiable figures", table: "a comparison table", citations: "third-party citations", schema: "Schema.org JSON-LD" })[e]).join(", ")}` : "carries only vague superlatives"} and ranks ${rank} of 8 in retrieval. On ten blue links it earns ${clicks} clicks per 100 searches. The AI answer cites three kettles and ${inAnswer ? `includes the brand at number ${rank}` : "leaves the brand out"}.`}
      >
        <HalftoneDefs id={id} />
        {/* the page */}
        <rect x={px} y={8} width={176} height={246} fill={CAT.tile} {...ink} />
        <Kettle id={id} cx={px + 40} cy={44} s={1.1} amber />
        <NameLines x={px + 82} y={34} w={80} gap={7} />
        {ev.length === 0 ? (
          <text x={px + 12} y={96} fontFamily={BODY_FONT} fontStyle="italic" fontSize={13} fill={CAT.ink}>
            <tspan x={px + 12}>The ultimate,</tspan>
            <tspan x={px + 12} dy={17}>revolutionary kettle!</tspan>
          </text>
        ) : null}
        {has("numbers") ? (
          <text x={px + 12} y={88} fontFamily="ui-monospace, monospace" fontSize={11} fill={CAT.ink}>
            <tspan x={px + 12}>1.0 L | 1,200 W</tspan>
            <tspan x={px + 12} dy={13}>boils in 3 min</tspan>
          </text>
        ) : null}
        {has("table") ? (
          <g>
            {[0, 1, 2, 3].map((r) => (
              <line key={r} x1={px + 12} y1={126 + r * 13} x2={px + 164} y2={126 + r * 13} {...hair} />
            ))}
            {[0, 1, 2].map((c) => (
              <g key={c}>
                <Kettle id={id} cx={px + 64 + c * 40} cy={117} s={0.3} amber={c === 0} />
                {[0, 1, 2].map((r) => (
                  <line key={r} x1={px + 52 + c * 40} y1={133 + r * 13} x2={px + 76 + c * 40} y2={133 + r * 13} stroke={CAT.ink} strokeWidth={1.2} />
                ))}
              </g>
            ))}
          </g>
        ) : null}
        {has("citations") ? (
          <g>
            <Newspaper id={id} x={px + 12} y={176} />
            <text x={px + 62} y={190} fontFamily={BODY_FONT} fontSize={11} fill={CAT.ink}>
              &quot;Most accurate&quot;
            </text>
            <text x={px + 62} y={204} fontFamily="ui-monospace, monospace" fontSize={10} fill={CAT.ink}>
              [1] Lab test
            </text>
          </g>
        ) : null}
        {has("schema") ? (
          <text x={px + 12} y={240} fontFamily="ui-monospace, monospace" fontSize={10} fill={CAT.ink}>
            {'{"@type": "Product", …}'}
          </text>
        ) : null}
        {/* retrieval rank */}
        <CatKey x={206} y={18} size={11}>
          Retrieved
        </CatKey>
        {Array.from({ length: 8 }, (_, k) => {
          const y = 26 + k * 28 + (k >= 3 ? 8 : 0);
          const ours = k + 1 === rank;
          return (
            <g key={k}>
              <rect x={206} y={y} width={120} height={24} fill={CAT.tile} stroke={CAT.ink} strokeWidth={ours ? LINE.outline : 0.6} />
              <Numeral x={212} y={y + 17} size={11}>
                {k + 1}
              </Numeral>
              <Kettle id={id} cx={242} cy={y + 13} s={0.44} amber={ours} />
              <NameLines x={262} y={y + 10} w={50} gap={5} />
            </g>
          );
        })}
        <line x1={202} y1={113} x2={330} y2={113} stroke={CAT.ink} strokeWidth={0.8} strokeDasharray="4 3" />
        {/* what the rank earns */}
        <CatKey x={348} y={18} size={11}>
          Ten blue links
        </CatKey>
        <Price x={348} y={44} size={13}>
          {`${clicks} clicks per 100`}
        </Price>
        {Array.from({ length: clicks }, (_, k) => (
          <Cursor key={k} x={r2(350 + (k % 10) * 20)} y={r2(54 + Math.floor(k / 10) * 17)} scale={0.95} />
        ))}
        <CatKey x={348} y={134} size={11}>
          AI answer
        </CatKey>
        <rect x={348} y={142} width={204} height={112} fill={CAT.tile} {...ink} />
        <line x1={358} y1={154} x2={540} y2={154} {...hair} />
        <line x1={358} y1={162} x2={500} y2={162} {...hair} />
        {[0, 1, 2].map((k) => {
          const ours = inAnswer && k + 1 === rank;
          return (
            <g key={k}>
              <Tile x={358} y={170 + k * 27} w={184} h={23} />
              <Numeral x={366} y={186 + k * 27} size={11}>
                {k + 1}
              </Numeral>
              <Kettle id={id} cx={396} cy={182 + k * 27} s={0.42} amber={ours} />
              <NameLines x={416} y={178 + k * 27} w={60} gap={5} />
            </g>
          );
        })}
      </Frame>
      <Toggles<Evidence>
        label="Evidence on the page"
        value={ev}
        onChange={setEv}
        options={[
          { id: "numbers", label: "Figures" },
          { id: "table", label: "Comparison table" },
          { id: "citations", label: "Third-party citation" },
          { id: "schema", label: "Schema.org" },
        ]}
      />
    </div>
  );
}

/**
 * Real data: Wadi & Ma (2026c), Study 2, Table 14 (Gemini 3.1 Pro, 500
 * hotel bookings per cell): share of bookings in which the AI agent chose
 * the paid listing, by the label on that listing and by whom the agent was
 * told it serves.
 */
const PAID_SHARE = {
  promoted: { traveler: 28.8, platform: 39.6 },
  sponsored: { traveler: 0.8, platform: 1.4 },
} as const;

/**
 * A conversational answer recommending three hotels, the second one a paid
 * insertion carrying the label chosen below. Under it, one grid of 100
 * squares per agent (each square 1% of 500 bookings): amber squares are
 * bookings that went to the paid hotel. The agent told it serves the
 * platform is purple, against the one told it serves the traveler.
 */
export function SponsoredInAnswer() {
  const [label, setLabel] = useState<"promoted" | "sponsored">("promoted");
  const id = "w3-paid";
  const share = PAID_SHARE[label];
  const word = label === "promoted" ? "Promoted" : "Sponsored";
  const grids: { key: "traveler" | "platform"; x: number; title: string }[] = [
    { key: "traveler", x: 22, title: "Serves the traveler" },
    { key: "platform", x: 212, title: "Serves the platform" },
  ];
  return (
    <div>
      <Frame
        width={400}
        height={332}
        label={`An AI agent's answer recommends three hotels. The second, in amber, is a paid insertion labelled ${label}. Share of 500 bookings that went to the paid hotel (Wadi & Ma, 2026c, Study 2): ${share.traveler}% for an agent told it serves the traveler and ${share.platform}% for an agent told it serves the platform, shown as amber squares out of 100.`}
      >
        <HalftoneDefs id={id} />
        <rect x={10} y={8} width={380} height={112} fill={CAT.tile} {...ink} />
        <line x1={22} y1={22} x2={300} y2={22} {...hair} />
        <line x1={22} y1={30} x2={220} y2={30} {...hair} />
        {[0, 1, 2].map((k) => {
          const y = 38 + k * 26;
          const paid = k === 1;
          return (
            <g key={k}>
              <Tile x={20} y={y} w={360} h={23} />
              <Numeral x={28} y={y + 16} size={11}>
                {k + 1}
              </Numeral>
              <Hotel id={id} cx={54} cy={y + 12} s={0.42} amber={paid} />
              <NameLines x={70} y={y + 10} w={90} gap={5} />
              {paid ? (
                <CatKey x={372} y={y + 16} size={10.5} anchor="end">
                  {word}
                </CatKey>
              ) : null}
            </g>
          );
        })}
        {grids.map((g) => {
          const pct = share[g.key];
          const n = Math.round(pct);
          return (
            <g key={g.key}>
              <Agent id={id} cx={g.x + 12} cy={152} s={0.55} tone={g.key === "platform" ? "purple" : "ink"} />
              <CatKey x={g.x + 30} y={156} size={10.5} fill={g.key === "platform" ? CAT.purple : CAT.ink}>
                {g.title}
              </CatKey>
              {Array.from({ length: 100 }, (_, k) => (
                <rect
                  key={k}
                  x={r2(g.x + (k % 10) * 15)}
                  y={r2(172 + Math.floor(k / 10) * 11)}
                  width={12}
                  height={8}
                  fill={k < n ? CAT.amber : CAT.tile}
                  stroke={CAT.ink}
                  strokeWidth={0.5}
                />
              ))}
              <Price x={g.x + 72} y={298} size={17} anchor="middle" fill={CAT.amberText}>
                {`${pct}%`}
              </Price>
            </g>
          );
        })}
        <CatKey x={200} y={322} size={10.5} anchor="middle">
          Bookings that went to the paid hotel
        </CatKey>
      </Frame>
      <Segmented<"promoted" | "sponsored">
        label="Label on the paid hotel"
        value={label}
        onChange={setLabel}
        options={[
          { id: "promoted", label: "Promoted" },
          { id: "sponsored", label: "Sponsored" },
        ]}
      />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Discussion: Winning the Conversational Shortlist
   -------------------------------------------------------------------------- */

