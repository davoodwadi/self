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
  seeded,
  Tile,
  Toggles,
  head,
  ht,
  r2,
} from "../_visuals/kit";
import { Agent, Badge, Cart, Coin, Cursor, Hotel, Listing, Mug, Parcel, Person, Shop, Sneaker, Star, Stopwatch } from "../_visuals/objects";

/* ==========================================================================
   WEEK 04 PLATES: MAIL-ORDER CATALOGUE
   --------------------------------------------------------------------------
   Products engraved in halftone inside double-ruled white tiles, ink marks,
   and one amber mark for the slide's key idea. See the course CLAUDE.md.
   Rankings, recommendations and sponsored slots are drawn as the catalogue
   page itself.
   ========================================================================== */

const ink = { stroke: CAT.ink, strokeWidth: LINE.outline, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
const hair = { stroke: CAT.ink, strokeWidth: LINE.hair, strokeLinecap: "round" as const };
const BODY_FONT = "var(--font-body)";

/** A search slip: a rounded bar with a magnifier button and the typed query. */
function SearchBar({ x, y, w, text, size = 12 }: { x: number; y: number; w: number; text: string; size?: number }) {
  const h = 28;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={14} fill={CAT.tile} {...ink} />
      <text x={x + 13} y={r2(y + h / 2 + size * 0.36)} fontFamily={BODY_FONT} fontSize={size} fill={CAT.ink}>
        {text}
      </text>
      <circle cx={x + w - 14} cy={y + 14} r={10} fill={CAT.ink} />
      <circle cx={x + w - 15.5} cy={y + 12.5} r={3.6} fill="none" stroke={CAT.tile} strokeWidth={1.3} />
      <line x1={x + w - 12.8} y1={y + 15.2} x2={x + w - 10} y2={y + 18} stroke={CAT.tile} strokeWidth={1.3} strokeLinecap="round" />
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

/** Over-ear headphones centred on (cx, cy): ink headband, halftone ear cups with a dense shaded side. About 40 × 38 at s = 1. */
function Headphones({ id, cx, cy, s = 1 }: { id: string; cx: number; cy: number; s?: number }) {
  const w = r2(LINE.outline / s);
  return (
    <g transform={`translate(${r2(cx)} ${r2(cy)}) scale(${s})`} strokeLinejoin="round">
      <path d="M-15 2V-4Q-15 -19 0 -19Q15 -19 15 -4V2" fill="none" stroke={CAT.ink} strokeWidth={r2(3.4 / s)} />
      <path d="M-15 2V-4Q-15 -19 0 -19Q15 -19 15 -4V2" fill="none" stroke={CAT.tile} strokeWidth={r2(1.2 / s)} />
      {[-1, 1].map((d) => (
        <g key={d}>
          <rect x={d < 0 ? -21 : 11} y={-3} width={10} height={20} rx={4} fill={ht(id, "light")} stroke={CAT.ink} strokeWidth={w} />
          <rect x={d < 0 ? -15 : 15} y={-1} width={4} height={16} rx={2} fill={ht(id, "dense")} stroke="none" />
        </g>
      ))}
    </g>
  );
}

/** A hardback novel standing face-on, centred on (cx, cy): halftone cover, dense spine edge, white title band. About 26 × 36 at s = 1. */
function Book({ id, cx, cy, s = 1, amber = false }: { id: string; cx: number; cy: number; s?: number; amber?: boolean }) {
  const w = r2(LINE.outline / s);
  return (
    <g transform={`translate(${r2(cx)} ${r2(cy)}) scale(${s})`} strokeLinejoin="round">
      <rect x={-13} y={-18} width={26} height={36} fill={amber ? CAT.amber : ht(id, "light")} stroke={CAT.ink} strokeWidth={w} />
      <rect x={-13} y={-18} width={5} height={36} fill={ht(id, "dense")} stroke={CAT.ink} strokeWidth={w} />
      <rect x={-5} y={-11} width={15} height={8} fill={CAT.tile} stroke={CAT.ink} strokeWidth={r2(LINE.hair / s)} />
    </g>
  );
}

/** A desk reading lamp centred on (cx, cy): weighted base, jointed arm, halftone shade. About 30 × 32 at s = 1. */
function Lamp({ id, cx, cy, s = 1 }: { id: string; cx: number; cy: number; s?: number }) {
  const w = r2(LINE.outline / s);
  return (
    <g transform={`translate(${r2(cx)} ${r2(cy)}) scale(${s})`} strokeLinejoin="round" strokeLinecap="round">
      <rect x={-12} y={12} width={18} height={4} fill={ht(id, "dense")} stroke={CAT.ink} strokeWidth={w} />
      <path d="M-3 12L-8 -2L4 -12" fill="none" stroke={CAT.ink} strokeWidth={r2(1.8 / s)} />
      <path d="M2 -16L16 -6L10 2Z" fill={ht(id, "light")} stroke={CAT.ink} strokeWidth={w} />
      <circle cx={-8} cy={-2} r={1.6} fill={CAT.tile} stroke={CAT.ink} strokeWidth={w} />
    </g>
  );
}

/** A loose-leaf tea tin centred on (cx, cy): halftone body, white lid band and label. About 20 × 30 at s = 1. */
function TeaTin({ id, cx, cy, s = 1 }: { id: string; cx: number; cy: number; s?: number }) {
  const w = r2(LINE.outline / s);
  return (
    <g transform={`translate(${r2(cx)} ${r2(cy)}) scale(${s})`} strokeLinejoin="round">
      <rect x={-10} y={-10} width={20} height={25} fill={ht(id, "light")} stroke={CAT.ink} strokeWidth={w} />
      <rect x={4} y={-10} width={6} height={25} fill={ht(id, "dense")} stroke="none" />
      <rect x={-11} y={-15} width={22} height={6} fill={CAT.tile} stroke={CAT.ink} strokeWidth={w} />
      <rect x={-7} y={-2} width={12} height={9} fill={CAT.tile} stroke={CAT.ink} strokeWidth={r2(LINE.hair / s)} />
    </g>
  );
}

/** A tick mark centred on (cx, cy); an amber tick keeps an ink outline. */
function Tick({ cx, cy, amber = false }: { cx: number; cy: number; amber?: boolean }) {
  const d = `M${cx - 7} ${cy}L${cx - 2} ${cy + 5}L${cx + 8} ${cy - 6}`;
  const cap = { fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return amber ? (
    <g>
      <path d={d} stroke={CAT.ink} strokeWidth={5.6} {...cap} />
      <path d={d} stroke={CAT.amber} strokeWidth={3.4} {...cap} />
    </g>
  ) : (
    <path d={d} stroke={CAT.ink} strokeWidth={2.6} {...cap} />
  );
}

/** An amber bracket beside a run of slots: the eye-level position, the key idea of slide 02. */
function AmberBracket({ x, y1, y2, side = "left" }: { x: number; y1: number; y2: number; side?: "left" | "right" }) {
  const d = side === "left" ? 6 : -6;
  return <path d={`M${x + d} ${y1}H${x}V${y2}H${x + d}`} fill="none" stroke={CAT.amber} strokeWidth={3.2} strokeLinejoin="round" />;
}

/** A packaged box on a shelf: halftone front, dense side, white label band. */
function ShelfBox({ id, x, y, w, h }: { id: string; x: number; y: number; w: number; h: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={ht(id, "light")} {...ink} />
      <rect x={r2(x + w * 0.72)} y={y} width={r2(w * 0.28)} height={h} fill={ht(id, "dense")} stroke="none" />
      <rect x={r2(x + 3)} y={r2(y + h * 0.3)} width={r2(w - 6)} height={r2(h * 0.24)} fill={CAT.tile} {...hair} />
    </g>
  );
}

/**
 * Left: a supermarket gondola of about thirty thousand items; the brand's
 * coins pay a slotting fee into the eye-level shelf, bracketed in amber.
 * Right: a phone's results page; the first two slots carry the same amber
 * bracket, and the list runs on far below the screen.
 */
export function ShelfToScreen() {
  const id = "w4-shelf";
  const shelves = [40, 96, 152, 208];
  return (
    <Frame
      width={800}
      height={290}
      label="Left: a supermarket shelf of about 30,000 items in four rows of boxes; a stack of coins pays a slotting fee into the eye-level shelf, bracketed in amber. Right: a phone showing a results page; the first two slots carry the same amber eye-level bracket, and the list of hundreds of millions of SKUs runs on far below the screen."
    >
      <HalftoneDefs id={id} />
      {/* the gondola */}
      <rect x={120} y={22} width={250} height={244} fill={CAT.tile} {...ink} />
      {shelves.map((y, r) => (
        <g key={r}>
          {Array.from({ length: 7 }, (_, k) => {
            const h = [40, 34, 42, 36, 40, 32, 38][(k + r * 3) % 7];
            return <ShelfBox key={k} id={id} x={128 + k * 34} y={y + 48 - h} w={28} h={h} />;
          })}
          <rect x={120} y={y + 48} width={250} height={6} fill={CAT.tile} {...ink} />
        </g>
      ))}
      <AmberBracket x={110} y1={92} y2={146} />
      <CatKey x={102} y={115} size={11} anchor="end" fill={CAT.amberText}>
        EYE
      </CatKey>
      <CatKey x={102} y={130} size={11} anchor="end" fill={CAT.amberText}>
        LEVEL
      </CatKey>
      {/* the slotting fee */}
      {[0, 1, 2, 3].map((k) => (
        <Coin key={k} id={id} cx={52} cy={210 - k * 7} rx={16} ry={4.2} t={4} />
      ))}
      <Arrow x1={52} y1={182} x2={102} y2={148} />
      <CatKey x={52} y={240} size={11} anchor="middle">
        SLOTTING
      </CatKey>
      <CatKey x={52} y={254} size={11} anchor="middle">
        FEE
      </CatKey>
      <Price x={245} y={284} size={14} anchor="middle">
        ≈ 30,000 items
      </Price>

      <line x1={420} y1={18} x2={420} y2={272} {...hair} />

      {/* the phone */}
      <rect x={540} y={14} width={132} height={250} rx={14} fill={CAT.tile} {...ink} />
      <rect x={547} y={30} width={118} height={206} fill="none" {...hair} />
      <line x1={590} y1={22} x2={622} y2={22} stroke={CAT.ink} strokeWidth={2} strokeLinecap="round" />
      <clipPath id={`${id}-screen`}>
        <rect x={547} y={30} width={118} height={206} />
      </clipPath>
      <g clipPath={`url(#${id}-screen)`}>
        {[0, 1, 2, 3, 4].map((k) => {
          const y = 36 + k * 46;
          return (
            <g key={k}>
              <Tile x={552} y={y} w={108} h={42} />
              <Numeral x={559} y={y + 17} size={13}>
                {k + 1}
              </Numeral>
              <Mug id={id} cx={588} cy={y + 23} scale={0.6} />
              <line x1={608} y1={y + 16} x2={650} y2={y + 16} {...hair} />
              <line x1={608} y1={y + 21} x2={638} y2={y + 21} {...hair} />
              <Price x={608} y={y + 34} size={10}>
                {["$14", "$12", "$16", "$11", "$13"][k]}
              </Price>
            </g>
          );
        })}
      </g>
      <AmberBracket x={530} y1={36} y2={124} />
      <CatKey x={522} y={75} size={11} anchor="end" fill={CAT.amberText}>
        EYE
      </CatKey>
      <CatKey x={522} y={90} size={11} anchor="end" fill={CAT.amberText}>
        LEVEL
      </CatKey>
      <Price x={606} y={284} size={14} anchor="middle">
        hundreds of millions of SKUs
      </Price>
    </Frame>
  );
}

/**
 * Pull: a shopper types an explicit query and the platform answers with a
 * ranked column of matching headphones. Push: no query; the platform's own
 * pages (homepage, a product page's "frequently bought together" row, the
 * cart) carry its suggestions. Below: the shared job, millions of items cut
 * to a handful (amber) within a few dozen milliseconds.
 */
export function PullAndPush() {
  const id = "w4-pullpush";
  const page = (x: number, w: number) => (
    <g>
      <rect x={x} y={176} width={w} height={116} fill={CAT.tile} {...ink} />
      <line x1={x} y1={192} x2={x + w} y2={192} {...hair} />
      <Badge cx={x + 10} cy={184} r={5} />
    </g>
  );
  const recTiles = (x: number, n: number) =>
    Array.from({ length: n }, (_, k) => (
      <g key={k}>
        <rect x={x + k * 38} y={250} width={34} height={34} fill={CAT.tile} {...hair} />
        <Headphones id={id} cx={x + k * 38 + 17} cy={267} s={0.55} />
      </g>
    ));
  return (
    <Frame
      width={560}
      height={378}
      label="Pull: a shopper types the query wireless noise-canceling headphones, and the platform orders three matching headphones from its catalog. Push: with no query, the platform's own pages carry its suggestions: a row of items on the homepage, a frequently bought together row on a product page, and a row in the cart. Below: both systems cut millions of items to a handful of candidates, in amber, within a few dozen milliseconds."
    >
      <HalftoneDefs id={id} />
      {/* PULL */}
      <CatKey x={10} y={20} size={11}>
        PULL
      </CatKey>
      <Person id={id} cx={34} cy={84} s={1.05} />
      <Arrow x1={60} y1={78} x2={74} y2={78} />
      <SearchBar x={80} y={64} w={246} text="wireless noise-canceling headphones" size={11} />
      <Arrow x1={332} y1={78} x2={344} y2={78} />
      {[0, 1, 2].map((k) => {
        const x = 350 + k * 68;
        return (
          <g key={k}>
            <Tile x={x} y={36} w={62} h={84} />
            <Numeral x={x + 8} y={54} size={14}>
              {k + 1}
            </Numeral>
            <Headphones id={id} cx={x + 31} cy={72} s={0.85} />
            <line x1={x + 10} y1={94} x2={x + 50} y2={94} {...hair} />
            <Price x={x + 10} y={110} size={11}>
              {["$249", "$199", "$329"][k]}
            </Price>
          </g>
        );
      })}

      <line x1={10} y1={142} x2={550} y2={142} {...hair} />

      {/* PUSH */}
      <CatKey x={10} y={164} size={11}>
        PUSH
      </CatKey>
      {/* homepage: a hero banner and a row of suggestions */}
      {page(10, 150)}
      <rect x={18} y={200} width={134} height={42} fill={ht(id, "light")} {...hair} />
      {recTiles(18, 3)}
      {/* product page: the item and its frequently bought together row */}
      {page(172, 206)}
      <Headphones id={id} cx={206} cy={220} s={1} />
      <NameLines x={240} y={206} w={120} />
      <Price x={240} y={232} size={11}>
        $249
      </Price>
      <CatKey x={180} y={247} size={8.6}>
        FREQUENTLY BOUGHT TOGETHER
      </CatKey>
      {[0, 1, 2].map((k) => (
        <rect key={k} x={180 + k * 38} y={254} width={34} height={30} fill={CAT.tile} {...hair} />
      ))}
      <Headphones id={id} cx={197} cy={269} s={0.5} />
      <rect x={225} y={262} width={20} height={14} rx={6} fill={ht(id, "dense")} {...hair} />
      <rect x={264} y={260} width={10} height={18} rx={2} fill={ht(id, "light")} {...hair} />
      {/* cart: the order and a row beneath it */}
      {page(390, 160)}
      <Cart id={id} cx={414} cy={216} s={1.1} />
      <NameLines x={438} y={208} w={100} />
      <Price x={538} y={232} size={11} anchor="end">
        $249
      </Price>
      {recTiles(398, 3)}

      <line x1={10} y1={308} x2={550} y2={308} {...hair} />

      {/* the shared job */}
      {Array.from({ length: 90 }, (_, k) => (
        <rect key={k} x={r2(10 + (k % 30) * 7.4)} y={r2(324 + Math.floor(k / 30) * 7.4)} width={5.4} height={5.4} fill={CAT.tile} stroke={CAT.ink} strokeWidth={0.5} />
      ))}
      <CatKey x={10} y={368} size={11}>
        MILLIONS OF ITEMS
      </CatKey>
      <Arrow x1={238} y1={334} x2={276} y2={334} />
      {[0, 1, 2].map((k) => (
        <rect key={k} x={286 + k * 22} y={324} width={18} height={20} fill={CAT.amber} stroke={CAT.ink} strokeWidth={1} />
      ))}
      <CatKey x={286} y={368} size={11} fill={CAT.amberText}>
        A HANDFUL
      </CatKey>
      <g>
        <rect x={397.5} y={319} width={5} height={4} fill={CAT.tile} {...ink} />
        <circle cx={400} cy={336} r={12} fill={CAT.tile} {...ink} />
        <path d="M400 336L400 326.5A9.5 9.5 0 0 1 408.2 331.2Z" fill={CAT.ink} />
      </g>
      <CatKey x={422} y={333} size={11}>
        A FEW DOZEN
      </CatKey>
      <CatKey x={422} y={349} size={11}>
        MILLISECONDS
      </CatKey>
    </Frame>
  );
}

/**
 * Left: the early recommender, a printed co-occurrence table: how often
 * buyers of each item also bought each other item. Right: today's deep
 * two-stage pipeline in amber: retrieval narrows a field of items to a
 * short row, a neural network scores them, and a ranked column comes out.
 */
export function LedgerToPipeline() {
  const id = "w4-ledger";
  const glyph = (k: number, cx: number, cy: number, sc: number) =>
    [
      <Mug key="m" id={id} cx={cx} cy={cy} scale={0.5 * sc} />,
      <Headphones key="h" id={id} cx={cx} cy={cy} s={0.55 * sc} />,
      <Book key="b" id={id} cx={cx} cy={cy} s={0.5 * sc} />,
      <Sneaker key="s" id={id} cx={cx} cy={cy + 2} s={0.38 * sc} />,
    ][k];
  const counts = [
    [null, 12, 3, 41],
    [12, null, 7, 26],
    [3, 7, null, 18],
    [41, 26, 18, null],
  ];
  const layers = [
    [0, 1, 2, 3, 4],
    [0, 1, 2, 3],
    [0, 1, 2],
  ];
  const ny = (l: number) => 152 + l * 26;
  const nx = (l: number, k: number) => r2(368 + (k - (layers[l].length - 1) / 2) * 14);
  return (
    <Frame
      width={480}
      height={320}
      label="Left: a printed co-occurrence table: rows and columns of four items, a mug, headphones, a novel and a sneaker, with counts of how often buyers of one also bought the other. An arrow spans two decades to the right: a deep two-stage pipeline in amber, where retrieval narrows a field of many items to a short row of candidates, a neural network scores them, and a ranked column of three listings comes out."
    >
      <HalftoneDefs id={id} />
      {/* the co-occurrence table */}
      <rect x={10} y={40} width={200} height={240} fill={CAT.tile} {...ink} />
      <rect x={14} y={44} width={192} height={232} fill="none" {...hair} />
      {[0, 1, 2, 3].map((k) => (
        <g key={k}>
          <g>{glyph(k, 80 + k * 36, 72, 1)}</g>
          <g>{glyph(k, 38, 120 + k * 44, 1)}</g>
        </g>
      ))}
      <line x1={18} y1={94} x2={202} y2={94} {...ink} />
      <line x1={60} y1={48} x2={60} y2={272} {...ink} />
      {counts.map((row, r) =>
        row.map((c, k) => (
          <g key={`${r}${k}`}>
            {r ? <line x1={62} y1={98 + r * 44} x2={202} y2={98 + r * 44} {...hair} /> : null}
            {c === null ? (
              <line x1={74 + k * 36} y1={120 + r * 44} x2={86 + k * 36} y2={120 + r * 44} {...hair} />
            ) : (
              <Price x={80 + k * 36} y={125 + r * 44} size={13} anchor="middle">
                {c}
              </Price>
            )}
          </g>
        )),
      )}
      <CatKey x={110} y={300} size={11} anchor="middle">
        CO-OCCURRENCE TABLE
      </CatKey>

      <Arrow x1={222} y1={160} x2={262} y2={160} />
      <CatKey x={242} y={146} size={9} anchor="middle">
        TWO
      </CatKey>
      <CatKey x={242} y={180} size={9} anchor="middle">
        DECADES
      </CatKey>

      {/* the two-stage pipeline */}
      {Array.from({ length: 48 }, (_, k) => (
        <rect key={k} x={r2(282 + (k % 16) * 11)} y={r2(30 + Math.floor(k / 16) * 11)} width={8} height={8} fill={CAT.tile} stroke={CAT.ink} strokeWidth={0.5} />
      ))}
      <path d="M282 66L346 112M455 66L398 112" fill="none" stroke={CAT.amber} strokeWidth={2.4} />
      <path d="M282 66L346 112M455 66L398 112" fill="none" stroke={CAT.ink} strokeWidth={0.6} />
      {Array.from({ length: 5 }, (_, k) => (
        <rect key={k} x={344 + k * 12} y={118} width={8} height={8} fill={CAT.tile} stroke={CAT.ink} strokeWidth={0.6} />
      ))}
      <CatKey x={472} y={100} size={10} anchor="end">
        STAGE 1
      </CatKey>
      {/* the network */}
      {layers.slice(0, -1).map((ks, l) =>
        ks.map((k) =>
          layers[l + 1].map((j) => <line key={`${l}${k}${j}`} x1={nx(l, k)} y1={ny(l)} x2={nx(l + 1, j)} y2={ny(l + 1)} {...hair} />),
        ),
      )}
      {[0, 1, 2, 3, 4].map((k) => (
        <line key={k} x1={348 + k * 12} y1={128} x2={nx(0, k)} y2={ny(0)} {...hair} />
      ))}
      {layers.map((ks, l) => ks.map((k) => <circle key={`${l}${k}`} cx={nx(l, k)} cy={ny(l)} r={4.5} fill={CAT.amber} stroke={CAT.ink} strokeWidth={1} />))}
      <CatKey x={472} y={182} size={10} anchor="end">
        STAGE 2
      </CatKey>
      <Arrow x1={368} y1={212} x2={368} y2={228} />
      {[0, 1, 2].map((k) => (
        <g key={k}>
          <Tile x={322 + k * 46} y={234} w={42} h={46} />
          <Numeral x={328 + k * 46} y={250} size={12}>
            {k + 1}
          </Numeral>
          <Mug id={id} cx={346 + k * 46} cy={262} scale={0.5} />
        </g>
      ))}
      <CatKey x={370} y={300} size={11} anchor="middle" fill={CAT.amberText}>
        TWO-STAGE PIPELINE
      </CatKey>
    </Frame>
  );
}

type Rec = "content" | "collab";
/**
 * One shopper bought a Scandinavian mystery. Each row of the catalogue below
 * is a candidate. Content-based: the right side shows each item's catalog
 * metadata, and the items whose tags match are recommended. Collaborative:
 * the right side becomes the item's row of the interaction matrix (which of
 * six shoppers bought it), and items sharing the most buyers are
 * recommended: the lamp and the tea, which share no text attributes. A new
 * novel listed today has tags but no buyers: only content-based can pick it
 * (amber).
 */
const ITEMS = [
  { key: "b1", kind: "book", tags: ["MYSTERY", "SCANDINAVIAN"], buyers: [1, 2, 3, 5] },
  { key: "b2", kind: "book", tags: ["MYSTERY", "SCANDINAVIAN"], buyers: [2] },
  { key: "lamp", kind: "lamp", tags: ["LAMP", "LED"], buyers: [1, 2, 3, 5] },
  { key: "b3", kind: "book", tags: ["MYSTERY", "SCANDINAVIAN"], buyers: [3, 6] },
  { key: "tea", kind: "tea", tags: ["TEA", "LOOSE LEAF"], buyers: [1, 3, 5] },
  { key: "mug", kind: "mug", tags: ["MUG", "CERAMIC"], buyers: [4, 6] },
  { key: "new", kind: "book", tags: ["MYSTERY", "SCANDINAVIAN"], buyers: [] as number[] },
] as const;

export function TwoRecommenders() {
  const [mode, setMode] = useState<Rec>("content");
  const [extra, setExtra] = useState<"new"[]>([]);
  const id = "w4-recs";
  const showNew = extra.includes("new");
  const bought = ITEMS[0];
  const rows = ITEMS.slice(1).filter((it) => it.key !== "new" || showNew);
  const shared = (it: (typeof ITEMS)[number]) => it.buyers.filter((b) => (bought.buyers as readonly number[]).includes(b)).length;
  const picked = (it: (typeof ITEMS)[number]) =>
    mode === "content" ? it.tags[0] === "MYSTERY" : ["lamp", "tea"].includes(it.key);
  const rowY = (k: number) => 72 + k * 36;
  const glyph = (it: (typeof ITEMS)[number], cx: number, cy: number) => {
    if (it.kind === "lamp") return <Lamp id={id} cx={cx} cy={cy} s={0.85} />;
    if (it.kind === "tea") return <TeaTin id={id} cx={cx} cy={cy + 1} s={0.82} />;
    if (it.kind === "mug") return <Mug id={id} cx={cx - 2} cy={cy} scale={0.75} />;
    return <Book id={id} cx={cx} cy={cy} s={0.75} amber={it.key === "new" && mode === "content"} />;
  };
  const right = (it: (typeof ITEMS)[number], y: number, head = false) =>
    mode === "content" ? (
      <g>
        {it.tags.map((t, j) => {
          const x = 104 + j * 96;
          const w = r2(t.length * 7.4 + 14);
          return (
            <g key={t}>
              <rect x={x} y={y - 9} width={w} height={18} rx={2} fill={CAT.tile} stroke={CAT.ink} strokeWidth={head ? 1.2 : 0.7} />
              <CatKey x={x + 7} y={y + 3.5} size={9}>
                {t}
              </CatKey>
            </g>
          );
        })}
      </g>
    ) : (
      <g>
        {[1, 2, 3, 4, 5, 6].map((b) => {
          const on = (it.buyers as readonly number[]).includes(b);
          return <rect key={b} x={110 + (b - 1) * 34} y={y - 9} width={22} height={18} fill={on ? CAT.ink : CAT.tile} stroke={CAT.ink} strokeWidth={0.7} />;
        })}
        {head ? null : (
          <Price x={354} y={y + 5} size={14} anchor="middle">
            {shared(it)}
          </Price>
        )}
      </g>
    );
  return (
    <div>
      <Frame
        width={480}
        height={296}
        label={
          mode === "content"
            ? `Content-based filtering. A shopper bought a novel tagged mystery and Scandinavian. The candidate rows show each item's catalog tags; the other Scandinavian mysteries are recommended${showNew ? ", including a novel listed today with no sales, in amber" : ""}, while the lamp, the tea and the mug are not.`
            : `Collaborative filtering. A shopper bought a Scandinavian mystery bought by shoppers 1, 2, 3 and 5. Each candidate row shows which of six shoppers bought it: the reading lamp shares 4 buyers and the tea tin 3, so they are recommended, though they share no text attributes${showNew ? "; the novel listed today has no buyers and cannot be recommended" : ""}.`
        }
      >
        <HalftoneDefs id={id} />
        {/* header */}
        {mode === "content" ? (
          <CatKey x={104} y={20} size={10.5}>
            CATALOG METADATA
          </CatKey>
        ) : (
          <g>
            {[1, 2, 3, 4, 5, 6].map((b) => (
              <Person key={b} id={id} cx={121 + (b - 1) * 34} cy={16} s={0.36} />
            ))}
            <CatKey x={354} y={20} size={9} anchor="middle">
              SHARED
            </CatKey>
          </g>
        )}
        <CatKey x={440} y={20} size={10.5} anchor="middle">
          PICK
        </CatKey>
        {/* the purchase */}
        <Tile x={10} y={30} w={84} h={34} />
        <Book id={id} cx={52} cy={47} s={0.75} />
        <g transform="translate(0 0)">{right(bought, 47, true)}</g>
        <CatKey x={440} y={51} size={9} anchor="middle">
          BOUGHT
        </CatKey>
        <line x1={10} y1={70} x2={470} y2={70} {...ink} />
        {/* the candidates */}
        {rows.map((it, k) => {
          const y = rowY(k) + 18;
          const pick = picked(it);
          return (
            <g key={it.key}>
              <rect x={10} y={rowY(k) + 2} width={84} height={32} fill={CAT.tile} stroke={CAT.ink} strokeWidth={0.7} />
              {glyph(it, 52, y)}
              {it.key === "new" ? (
                <CatKey x={88} y={y + 12} size={7.5} anchor="end">
                  NEW
                </CatKey>
              ) : null}
              {right(it, y)}
              {pick ? <Tick cx={440} cy={y} amber={it.key === "new"} /> : null}
              <line x1={10} y1={rowY(k) + 36} x2={470} y2={rowY(k) + 36} {...hair} />
            </g>
          );
        })}
      </Frame>
      <Segmented<Rec>
        label="Recommender"
        value={mode}
        onChange={setMode}
        options={[
          { id: "content", label: "Content-based" },
          { id: "collab", label: "Collaborative" },
        ]}
      />
      <Toggles<"new">
        label="Catalogue"
        value={extra}
        onChange={setExtra}
        options={[{ id: "new", label: "List a new novel today" }]}
      />
    </div>
  );
}

/**
 * Three small scenes under the three sentences. Item cold start: a new
 * listing with no clicks and an empty column in the purchase matrix. User
 * cold start: a first-time visitor whose order history is blank. Filter
 * bubble: a recommendation row of five near-identical mysteries, the rest of
 * the catalogue left outside it.
 */
export function ColdStartTrio() {
  const id = "w4-trio";
  return (
    <Frame
      width={800}
      height={150}
      label="Three scenes. Item cold start: a newly listed mug with zero clicks beside a purchase matrix whose column for it is empty. User cold start: a first-time visitor beside a blank order history. Filter bubble: a recommendation row of five near-identical mystery novels inside a bubble, with headphones, a lamp and a tea tin left outside it."
    >
      <HalftoneDefs id={id} />
      {/* item cold start */}
      <Tile x={14} y={20} w={92} h={110} />
      <CatKey x={98} y={36} size={9} anchor="end">
        NEW
      </CatKey>
      <Mug id={id} cx={58} cy={68} scale={1.1} />
      <line x1={26} y1={98} x2={80} y2={98} {...hair} />
      <Price x={26} y={118} size={12}>
        $18
      </Price>
      <Headphones id={id} cx={136} cy={30} s={0.42} />
      <Book id={id} cx={158} cy={30} s={0.42} />
      <Lamp id={id} cx={180} cy={30} s={0.5} />
      <Mug id={id} cx={203} cy={30} scale={0.42} />
      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2, 3].map((c) => {
          const on = c < 3 && (r * 7 + c * 3) % 4 !== 0;
          return <rect key={`${r}${c}`} x={128 + c * 22} y={46 + r * 17} width={16} height={12} fill={on ? CAT.ink : CAT.tile} stroke={CAT.ink} strokeWidth={c === 3 ? 1.1 : 0.6} strokeDasharray={c === 3 ? "2 2" : undefined} />;
        }),
      )}
      <Price x={128} y={128} size={13}>
        0 clicks
      </Price>
      <line x1={226} y1={14} x2={226} y2={136} {...hair} />

      {/* user cold start */}
      <Person id={id} cx={300} cy={76} s={1.5} />
      <rect x={356} y={26} width={92} height={100} fill={CAT.tile} {...ink} />
      <rect x={362} y={32} width={80} height={8} fill={CAT.ink} />
      {[0, 1, 2, 3, 4].map((k) => (
        <line key={k} x1={364} y1={58 + k * 14} x2={440} y2={58 + k * 14} stroke={CAT.ink} strokeWidth={0.5} strokeDasharray="2 2.5" />
      ))}
      <CatKey x={300} y={128} size={10} anchor="middle">
        FIRST VISIT
      </CatKey>
      <line x1={510} y1={14} x2={510} y2={136} {...hair} />

      {/* filter bubble */}
      <rect x={526} y={22} width={186} height={66} rx={33} fill="none" stroke={CAT.ink} strokeWidth={1.4} />
      {[0, 1, 2, 3, 4].map((k) => (
        <g key={k}>
          <rect x={548 + k * 30} y={36} width={26} height={40} fill={CAT.tile} stroke={CAT.ink} strokeWidth={0.6} />
          <Book id={id} cx={561 + k * 30} cy={56} s={0.72} />
        </g>
      ))}
      <Headphones id={id} cx={560} cy={118} s={0.8} />
      <Lamp id={id} cx={620} cy={116} s={0.85} />
      <TeaTin id={id} cx={680} cy={116} s={0.8} />
      <Mug id={id} cx={738} cy={60} scale={0.8} />
      <Sneaker id={id} cx={748} cy={116} s={0.55} />
    </Frame>
  );
}

/**
 * The two-stage pipeline as an instrument. The slider sets how many
 * candidates Stage 1 hands to Stage 2. Stage 1 (vector search) costs about
 * 12 ms whatever the catalogue size; the heavy Stage 2 model costs about
 * 0.15 ms per candidate. The ruler shows the response time against the
 * 100 ms budget; the readout shows how often the shopper's best match
 * survives retrieval (n / (n + 40), a plausible recall curve). A few hundred
 * candidates keep most best matches within budget; scoring the whole
 * catalogue would take hours.
 */
const STAGE_N = [10, 30, 100, 300, 600, 1000, 10000, 300000000];
export function TwoStage() {
  const [i, setI] = useState(3);
  const id = "w4-stage";
  const n = STAGE_N[i];
  const all = n >= 1e8;
  const ms = 12 + 0.15 * n;
  const recall = all ? 100 : Math.round((100 * n) / (n + 40));
  const over = ms > 100;
  const x0 = 60;
  const x1 = 454;
  const X = (t: number) => r2(x0 + (Math.min(t, 200) / 200) * (x1 - x0));
  const timeText = all ? "≈ 12.5 hours" : `${Math.round(ms)} ms`;
  const nText = all ? "every SKU" : n.toLocaleString("en-US");
  const tiles = Math.min(9, Math.max(1, Math.round(Math.log10(n) * 1.5)));
  return (
    <div>
      <Frame
        width={480}
        height={238}
        label={`Two-stage pipeline. Stage 1 narrows millions of SKUs to ${nText} candidates; Stage 2 scores them and ranks three listings. Response time ${timeText} against a 100 millisecond budget${over ? ", over budget" : ", within budget"}; the shopper's best match is among the candidates ${recall}% of the time.`}
      >
        <HalftoneDefs id={id} />
        {/* the catalogue */}
        {Array.from({ length: 70 }, (_, k) => (
          <rect key={k} x={r2(10 + (k % 10) * 7)} y={r2(26 + Math.floor(k / 10) * 7)} width={5} height={5} fill={CAT.tile} stroke={CAT.ink} strokeWidth={0.45} />
        ))}
        <CatKey x={10} y={92} size={9}>
          MILLIONS
        </CatKey>
        <CatKey x={128} y={22} size={10} anchor="middle">
          STAGE 1
        </CatKey>
        <Arrow x1={88} y1={50} x2={166} y2={50} />
        {/* the candidates handed on */}
        <rect x={174} y={20} width={112} height={62} fill={CAT.tile} {...ink} />
        {Array.from({ length: tiles }, (_, k) => (
          <rect key={k} x={182 + k * 11} y={28} width={8} height={10} fill={CAT.amber} stroke={CAT.ink} strokeWidth={0.8} />
        ))}
        <Price x={230} y={64} size={16} anchor="middle">
          {nText}
        </Price>
        <CatKey x={230} y={98} size={9} anchor="middle">
          CANDIDATES
        </CatKey>
        <CatKey x={330} y={22} size={10} anchor="middle">
          STAGE 2
        </CatKey>
        <Arrow x1={294} y1={50} x2={366} y2={50} />
        {[0, 1, 2].map((k) => (
          <g key={k}>
            <Tile x={374 + k * 34} y={24} w={30} h={50} />
            <Numeral x={378 + k * 34} y={38} size={10}>
              {k + 1}
            </Numeral>
            <Mug id={id} cx={388 + k * 34} cy={56} scale={0.4} />
          </g>
        ))}

        {/* the clock */}
        <line x1={x0} y1={150} x2={x1} y2={150} {...ink} />
        {[0, 50, 100, 150, 200].map((t) => (
          <g key={t}>
            <line x1={X(t)} y1={150} x2={X(t)} y2={155} {...ink} />
            <Price x={X(t)} y={170} size={11} anchor="middle">
              {`${t}`}
            </Price>
          </g>
        ))}
        <CatKey x={x1} y={186} size={9} anchor="end">
          MILLISECONDS
        </CatKey>
        <line x1={X(100)} y1={112} x2={X(100)} y2={150} stroke={CAT.ink} strokeWidth={LINE.bold} strokeDasharray="4 3" />
        <CatKey x={X(100) + 6} y={120} size={9}>
          BUDGET
        </CatKey>
        <rect x={x0} y={128} width={r2(X(12) - x0)} height={16} fill={CAT.ink} />
        <rect x={X(12)} y={128} width={r2(X(ms) - X(12))} height={16} fill={ht(id, "dense")} stroke={CAT.ink} strokeWidth={0.8} />
        {ms > 200 ? <path d={`M${x1 + 2} 128L${x1 + 10} 136L${x1 + 2} 144Z`} fill={CAT.ink} /> : null}
        <Stopwatch cx={30} cy={136} r={11} t={over ? 8 : Math.min(7.6, (ms / 100) * 8)} />
        <Price x={x0} y={212} size={15} fill={over ? CAT.ink : CAT.amberText}>
          {timeText}
        </Price>
        <CatKey x={x0} y={228} size={9}>
          {over ? "OVER BUDGET" : "WITHIN BUDGET"}
        </CatKey>
        <Price x={x1} y={212} size={15} anchor="end">
          {`${recall}%`}
        </Price>
        <CatKey x={x1} y={228} size={9} anchor="end">
          BEST MATCH KEPT IN STAGE 1
        </CatKey>
      </Frame>
      <Slider
        label="Candidates passed to Stage 2"
        value={i}
        min={0}
        max={STAGE_N.length - 1}
        onChange={setI}
        formatValue={(v) => (STAGE_N[v] >= 1e8 ? "All" : STAGE_N[v].toLocaleString("en-US"))}
      />
    </div>
  );
}

/** Clicks per slot on a five-listing row, from Position 1 to 5. */
const SLOT_CLICKS = [10, 6, 4, 3, 2];

/** A row of rating stars, left edge at x, centred on y. */
function Stars({ x, y, n, r = 4 }: { x: number; y: number; n: number; r?: number }) {
  return (
    <g>
      {[0, 1, 2, 3, 4].map((k) => (
        <Star key={k} cx={r2(x + r + k * (r * 2 + 1.5))} cy={y} r={r} on={k < n} />
      ))}
    </g>
  );
}

/**
 * Five mug listings; the three-star mug sits at Position 1 and the
 * five-star mug at Position 4. Each listing's cursor stack is its clicks.
 * The button swaps the two mugs: the clicks stay with the slot, not the
 * mug, so the five-star mug now takes the tall amber stack.
 */
export function SlotSwap() {
  const [swapped, setSwapped] = useState(false);
  const id = "w4-swap";
  const rating = swapped ? [5, 4, 4, 3, 4] : [3, 4, 4, 5, 4];
  const prices = swapped ? ["$16", "$14", "$15", "$18", "$13"] : ["$18", "$14", "$15", "$16", "$13"];
  const tw = 84;
  const gap = 10;
  const top = 120;
  return (
    <div>
      <Frame
        width={480}
        height={262}
        label={`Five mug listings with stacks of clicks above them falling from 10 at Position 1 to 2 at Position 5; the top stack is amber. ${swapped ? "After the swap, the five-star mug sits at Position 1 and takes the 10 clicks, and the three-star mug at Position 4 gets 3." : "The three-star mug sits at Position 1 and takes 10 clicks; the five-star mug at Position 4 gets only 3."}`}
      >
        <HalftoneDefs id={id} />
        {SLOT_CLICKS.map((c, k) => {
          const x = 10 + k * (tw + gap);
          return (
            <g key={k}>
              {Array.from({ length: c }, (_, j) => (
                <Cursor key={j} x={x + tw / 2 - 14 + (j % 2) * 16} y={top - 24 - Math.floor(j / 2) * 18} scale={1.15} tone={k === 0 ? "amber" : "ink"} />
              ))}
              <Tile x={x} y={top} w={tw} h={104} />
              <Numeral x={x + 9} y={top + 19}>
                {k + 1}
              </Numeral>
              <Mug id={id} cx={x + tw / 2} cy={top + 46} scale={1.25} />
              <Stars x={x + 12} y={top + 78} n={rating[k]} r={4.2} />
              <Price x={x + 12} y={top + 97} size={12}>
                {prices[k]}
              </Price>
            </g>
          );
        })}
        {swapped ? (
          <g fill="none" {...ink}>
            <path d={`M${10 + tw / 2} ${top + 110}Q${10 + tw / 2} ${top + 136} ${r2(10 + 1.5 * (tw + gap) + tw / 2)} ${top + 136}Q${10 + 3 * (tw + gap) + tw / 2} ${top + 136} ${10 + 3 * (tw + gap) + tw / 2} ${top + 110}`} />
            <path d={`${head.up(10 + tw / 2, top + 108, 6)}`} />
            <path d={`${head.up(10 + 3 * (tw + gap) + tw / 2, top + 108, 6)}`} />
          </g>
        ) : null}
      </Frame>
      <div className="mt-2.5 px-1">
        <PlateButton onClick={() => setSwapped((v) => !v)}>{swapped ? "Swap them back" : "Swap listings 1 and 4"}</PlateButton>
      </div>
    </div>
  );
}

/**
 * The reference plate, made an instrument. Eight mug listings; Position 1
 * is a sponsored three-star mug and Position 6 a better five-star mug.
 * A shopper inspects the next listing with probability d, which falls as
 * the effort of inspecting one more listing rises (d from 0.85 to 0.45);
 * clicks per position follow d^(k-1). Each stack holds up to twelve
 * cursors; the top stack is amber, and the readout is the top three's share
 * of all clicks.
 */
const EFFORT = ["Very low", "Low", "Medium", "High", "Very high"];
export function SearchCost() {
  const [e, setE] = useState(2);
  const id = "w4-cost";
  const d = 0.85 - e * 0.1;
  const w = Array.from({ length: 8 }, (_, k) => Math.pow(d, k));
  const total = w.reduce((a, b) => a + b, 0);
  const top3 = Math.round((100 * (w[0] + w[1] + w[2])) / total);
  const tw = 54;
  const gap = 4;
  const top = 128;
  return (
    <div>
      <Frame
        width={480}
        height={240}
        label={`Eight mug listings with stacks of clicks above them; Position 1 is a sponsored three-star mug and its stack is amber, Position 6 is a five-star mug. With ${EFFORT[e].toLowerCase()} effort to inspect each listing, clicks fall from ${Math.round(12 * w[0])} cursors at Position 1 to ${Math.round(12 * w[7])} at Position 8, and the top three listings take ${top3}% of all clicks.`}
      >
        <HalftoneDefs id={id} />
        {w.map((v, k) => {
          const x = 10 + k * (tw + gap);
          const c = Math.round(12 * v);
          return (
            <g key={k}>
              {Array.from({ length: c }, (_, j) => (
                <Cursor key={j} x={x + tw / 2 - 12 + (j % 2) * 13} y={top - 22 - Math.floor(j / 2) * 17} scale={1} tone={k === 0 ? "amber" : "ink"} />
              ))}
              <Tile x={x} y={top} w={tw} h={78} />
              <Numeral x={x + 7} y={top + 16} size={13}>
                {k + 1}
              </Numeral>
              {k === 0 ? (
                <CatKey x={x + tw / 2} y={top + 94} size={8.5} anchor="middle">
                  SPONSORED
                </CatKey>
              ) : null}
              <Mug id={id} cx={x + tw / 2} cy={top + 36} scale={0.82} />
              <Stars x={x + 7} y={top + 58} n={k === 0 ? 3 : k === 5 ? 5 : 4} r={3.1} />
            </g>
          );
        })}
        <Price x={244} y={232} size={15} anchor="end" fill={CAT.amberText}>
          {`${top3}%`}
        </Price>
        <CatKey x={252} y={231} size={10}>
          OF CLICKS GO TO THE TOP THREE
        </CatKey>
      </Frame>
      <Slider label="Effort to inspect each listing" value={e} min={0} max={4} onChange={setE} formatValue={(v) => EFFORT[v]} />
    </div>
  );
}

/**
 * The rich-get-richer loop as a bump chart. Five mugs with true relevance
 * 5 to 1 stars start in a poor order (the three-star mug, amber, on top).
 * Each week every slot is examined with probability 1, 0.5, 0.3, 0.2, 0.12
 * by position, the mug's clicks are examination × relevance (with seeded
 * week-to-week noise), and the list is re-ranked on cumulative scores.
 * Raw clicks keep the amber mug locked at Position 1; dividing clicks by the
 * slot's examination probability (IPW) recovers the true order within weeks.
 */
const LOOP_REL = [0.3, 0.24, 0.18, 0.12, 0.08];
const LOOP_STARS = [5, 4, 3, 2, 1];
const LOOP_EXAM = [1, 0.5, 0.3, 0.2, 0.12];
const LOOP_START = [2, 3, 1, 0, 4];
const LOOP_WEEKS = 8;
function loopPaths(ipw: boolean) {
  const rnd = seeded(7);
  const noise = Array.from({ length: LOOP_WEEKS }, () => LOOP_REL.map(() => 0.8 + rnd() * 0.4));
  const orders = [LOOP_START];
  const score = [0, 0, 0, 0, 0];
  for (let w = 0; w < LOOP_WEEKS; w++) {
    const order = orders[w];
    order.forEach((m, pos) => {
      const clicks = LOOP_EXAM[pos] * LOOP_REL[m] * noise[w][m];
      score[m] += ipw ? clicks / LOOP_EXAM[pos] : clicks;
    });
    const next = [...order].sort((a, b) => score[b] - score[a] || order.indexOf(a) - order.indexOf(b));
    orders.push(next);
  }
  return orders;
}
export function FeedbackLoop() {
  const [rule, setRule] = useState<"raw" | "ipw">("raw");
  const id = "w4-loop";
  const orders = loopPaths(rule === "ipw");
  const X = (w: number) => r2(104 + w * 25);
  const Y = (pos: number) => r2(34 + pos * 40);
  const final = orders[LOOP_WEEKS];
  const pathOf = (m: number) => orders.map((o, w) => `${w ? "L" : "M"}${X(w)} ${Y(o.indexOf(m))}`).join("");
  const lockedTop = final[0] === 2;
  return (
    <div>
      <Frame
        width={480}
        height={240}
        label={`A bump chart of five mugs over eight weeks of retraining. The three-star mug, in amber, starts at Position 1 and the five-star mug at Position 4. ${rule === "raw" ? "Trained on raw clicks, the amber mug stays locked at Position 1 and the five-star mug never reaches the top." : "Trained on clicks divided by each slot's examination probability, the five-star mug rises to Position 1 and the amber three-star mug falls to Position 3."}`}
      >
        <HalftoneDefs id={id} />
        {[0, 1, 2, 3, 4].map((pos) => (
          <g key={pos}>
            <Numeral x={10} y={Y(pos) + 5} size={14}>
              {pos + 1}
            </Numeral>
            <Stars x={28} y={Y(pos)} n={LOOP_STARS[LOOP_START[pos]]} r={4.4} />
            <line x1={X(0)} y1={Y(pos)} x2={X(LOOP_WEEKS)} y2={Y(pos)} stroke={CAT.ink} strokeWidth={0.4} strokeDasharray="1 3" />
          </g>
        ))}
        {[0, 1, 3, 4].map((m) => (
          <path key={m} d={pathOf(m)} fill="none" stroke={CAT.ink} strokeWidth={1.3} strokeLinejoin="round" />
        ))}
        <path d={pathOf(2)} fill="none" stroke={CAT.ink} strokeWidth={5} strokeLinejoin="round" strokeLinecap="round" />
        <path d={pathOf(2)} fill="none" stroke={CAT.amber} strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" />
        {orders.map((o, w) =>
          o.map((m, pos) => <circle key={`${w}${m}`} cx={X(w)} cy={Y(pos)} r={m === 2 ? 3.4 : 2.4} fill={m === 2 ? CAT.amber : CAT.ink} stroke={CAT.ink} strokeWidth={0.8} />),
        )}
        {[0, 2, 4, 6, 8].map((w) => (
          <Price key={w} x={X(w)} y={222} size={11} anchor="middle">
            {`${w}`}
          </Price>
        ))}
        <CatKey x={X(4)} y={236} size={9} anchor="middle">
          WEEKS OF RETRAINING
        </CatKey>
        {/* the order the model has learned */}
        {final.map((m, pos) => (
          <g key={m}>
            <rect x={322} y={Y(pos) - 16} width={148} height={32} fill={CAT.tile} stroke={CAT.ink} strokeWidth={m === 2 ? 1.6 : 0.7} />
            <Mug id={id} cx={342} cy={Y(pos)} scale={0.62} />
            <Stars x={362} y={Y(pos)} n={LOOP_STARS[m]} r={5} />
          </g>
        ))}
        <CatKey x={396} y={222} size={9} anchor="middle">
          {lockedTop ? "LOCKED AT THE TOP" : "TRUE ORDER RECOVERED"}
        </CatKey>
      </Frame>
      <Segmented<"raw" | "ipw">
        label="Train the ranker on"
        value={rule}
        onChange={setRule}
        options={[
          { id: "raw", label: "Raw clicks" },
          { id: "ipw", label: "Clicks ÷ examination" },
        ]}
      />
    </div>
  );
}

/** An add-to-cart button: a small rounded bar with a cart, amber when it is the key idea. */
function CartButton({ id, x, y, w = 46, amber = false }: { id: string; x: number; y: number; w?: number; amber?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={16} rx={8} fill={amber ? CAT.amber : CAT.tile} stroke={CAT.ink} strokeWidth={1} />
      <Cart id={id} cx={r2(x + w / 2)} cy={y + 8} s={0.55} tone="open" />
    </g>
  );
}

/**
 * Two scenes. Left: a display ad for a sneaker on a news page, and the long
 * dotted route from the ad to the shop where the sale might happen. Right:
 * the same sneaker as a sponsored listing on a marketplace results page,
 * with its add-to-cart button (amber) inside the ad itself.
 */
export function PointOfPurchase() {
  const id = "w4-pop";
  return (
    <Frame
      width={480}
      height={250}
      label="Left: a sneaker banner ad on a news page, with a long dotted route from the ad to a distant shop where the sale might happen. Right: the same sneaker as a sponsored listing at the top of a marketplace results page, with the add-to-cart button, in amber, inside the ad itself, and a shopper's cursor on it."
    >
      <HalftoneDefs id={id} />
      {/* the display ad, far from the sale */}
      <rect x={10} y={14} width={124} height={170} fill={CAT.tile} {...ink} />
      <rect x={18} y={22} width={108} height={7} fill={CAT.ink} />
      {[0, 1, 2].map((k) => (
        <line key={k} x1={18} y1={40 + k * 8} x2={k === 2 ? 90 : 126} y2={40 + k * 8} {...hair} />
      ))}
      <rect x={18} y={70} width={108} height={58} fill={CAT.tile} stroke={CAT.ink} strokeWidth={1.4} />
      <CatKey x={120} y={81} size={8} anchor="end">
        AD
      </CatKey>
      <Sneaker id={id} cx={62} cy={102} s={0.95} />
      {[0, 1, 2, 3].map((k) => (
        <line key={k} x1={18} y1={140 + k * 9} x2={k === 3 ? 80 : 126} y2={140 + k * 9} {...hair} />
      ))}
      <path d="M126 100C200 100 60 214 158 214" fill="none" stroke={CAT.ink} strokeWidth={1} strokeDasharray="1.5 4" strokeLinecap="round" />
      <path d={head.right(165, 214, 7)} fill="none" {...ink} />
      <Shop id={id} x={170} y={186} w={56} h={46} />

      <line x1={244} y1={14} x2={244} y2={236} {...hair} />

      {/* the sponsored listing, at the sale */}
      <rect x={270} y={14} width={200} height={222} fill={CAT.tile} {...ink} />
      <rect x={280} y={24} width={180} height={20} rx={10} fill={CAT.tile} {...hair} />
      <line x1={292} y1={34} x2={360} y2={34} {...hair} />
      <Tile x={280} y={52} w={180} h={92} />
      <Numeral x={289} y={71}>
        1
      </Numeral>
      <CatKey x={452} y={68} size={8} anchor="end">
        SPONSORED
      </CatKey>
      <Sneaker id={id} cx={330} cy={104} s={0.95} />
      <line x1={376} y1={92} x2={448} y2={92} {...hair} />
      <line x1={376} y1={98} x2={426} y2={98} {...hair} />
      <Price x={376} y={116} size={13}>
        $119
      </Price>
      <CartButton id={id} x={402} y={120} amber />
      <Cursor x={437} y={128} scale={1.1} />
      {[0, 1].map((k) => (
        <g key={k}>
          <Tile x={280} y={152 + k * 42} w={180} h={36} />
          <Numeral x={289} y={170 + k * 42} size={13}>
            {k + 2}
          </Numeral>
          <Sneaker id={id} cx={330} cy={172 + k * 42} s={0.5} />
          <line x1={376} y1={166 + k * 42} x2={440} y2={166 + k * 42} {...hair} />
          <line x1={376} y1={172 + k * 42} x2={420} y2={172 + k * 42} {...hair} />
        </g>
      ))}
    </Frame>
  );
}

/**
 * A marketplace results grid of six mug listings. Positions 1 and 5 are
 * sponsored, interleaved with the organic ones; each looks identical to its
 * neighbours except for the small SPONSORED key in its corner.
 */
export function LookAlikeCards() {
  const id = "w4-alike";
  const prices = ["$16", "$14", "$15", "$18", "$17", "$13"];
  return (
    <Frame
      width={400}
      height={234}
      label="A marketplace results grid of six mug listings in two rows. Positions 1 and 5 are sponsored and sit interleaved with the organic listings; they look identical to the others except for a small Sponsored key in the corner."
    >
      <HalftoneDefs id={id} />
      {prices.map((p, k) => (
        <Listing key={k} id={id} x={26 + (k % 3) * 120} y={10 + Math.floor(k / 3) * 114} n={k + 1} price={p} sponsored={k === 0 || k === 4} />
      ))}
    </Frame>
  );
}

/**
 * A new mug launches at organic Position 48 with no sales. Weekly sales
 * follow its slot (14 × 0.8^(rank − 1), or 12 a week while it holds the
 * sponsored top slot), one in ten buyers leaves a review, and its organic
 * rank improves with cumulative sales (48 / (1 + sales / 8)). Organic only,
 * it never sells and never climbs; four sponsored weeks buy the sales and
 * reviews that carry it into the top organic slots after the ads stop.
 */
function launchRun(sponsor: boolean) {
  let cum = 0;
  let rank = 48;
  const weeks: { sales: number; rank: number; sponsored: boolean; cum: number }[] = [{ sales: 0, rank, sponsored: false, cum: 0 }];
  for (let w = 1; w <= 12; w++) {
    const sponsored = sponsor && w <= 4;
    const sales = sponsored ? 12 : 14 * Math.pow(0.8, rank - 1);
    cum += sales;
    rank = Math.max(1, Math.round(48 / (1 + cum / 8)));
    weeks.push({ sales, rank, sponsored, cum });
  }
  return weeks;
}
export function LaunchClimb() {
  const [plan, setPlan] = useState<"organic" | "sponsored">("sponsored");
  const [week, setWeek] = useState(12);
  const id = "w4-launch";
  const run = launchRun(plan === "sponsored");
  const now = run[week];
  const reviews = Math.floor(now.cum / 10);
  const slotY = (r: number) => (r <= 10 ? 52 + (r - 1) * 19 : 266);
  const mugY = now.sponsored ? 22 : slotY(now.rank);
  return (
    <div>
      <Frame
        width={400}
        height={300}
        label={`A new mug, in amber, launches at organic Position 48. ${plan === "sponsored" ? "Its maker buys the sponsored top slot for weeks 1 to 4." : "Its maker relies on organic rank alone."} At week ${week} it ${now.sponsored ? "holds the sponsored slot" : `sits at organic Position ${now.rank}`}, has ${Math.round(now.cum)} sales in total and ${reviews} reviews; weekly sales are drawn as parcel stacks, purple in sponsored weeks.`}
      >
        <HalftoneDefs id={id} />
        {/* the results page */}
        <rect x={10} y={10} width={136} height={24} fill={CAT.tile} stroke={CAT.purple} strokeWidth={1.2} />
        <CatKey x={138} y={26} size={8} anchor="end" fill={CAT.purple}>
          SPONSORED
        </CatKey>
        {Array.from({ length: 10 }, (_, k) => (
          <g key={k}>
            <rect x={10} y={slotY(k + 1) - 8} width={136} height={16} fill={CAT.tile} stroke={CAT.ink} strokeWidth={0.6} />
            <Numeral x={16} y={slotY(k + 1) + 4.5} size={11}>
              {k + 1}
            </Numeral>
          </g>
        ))}
        {[0, 1, 2].map((k) => (
          <circle key={k} cx={78} cy={r2(-4 + slotY(10) + 22 + k * 7)} r={1.4} fill={CAT.ink} />
        ))}
        <rect x={10} y={258} width={136} height={16} fill={CAT.tile} stroke={CAT.ink} strokeWidth={0.6} />
        <Numeral x={16} y={270.5} size={11}>
          {now.sponsored || now.rank <= 10 ? "48" : `${now.rank}`}
        </Numeral>
        {/* the new mug in its slot */}
        <rect x={30} y={mugY - 9} width={42} height={18} fill={CAT.amber} stroke={CAT.ink} strokeWidth={1.1} />
        <Mug id={id} cx={51} cy={mugY} scale={0.42} />

        {/* weekly sales */}
        {run.slice(1).map((w, k) => {
          const n = Math.round(w.sales / 2);
          const x = 168 + k * 19;
          const shown = k + 1 <= week;
          return (
            <g key={k}>
              {shown
                ? Array.from({ length: n }, (_, j) => <Parcel key={j} id={id} x={x} y={228 - j * 12} w={12} h={9} tone={w.sponsored ? "purple" : "ink"} />)
                : null}
              <Price x={x + 7} y={258} size={9.5} anchor="middle">
                {`${k + 1}`}
              </Price>
            </g>
          );
        })}
        <line x1={164} y1={239} x2={396} y2={239} {...hair} />
        <CatKey x={280} y={274} size={9} anchor="middle">
          WEEKLY SALES
        </CatKey>
        <Star cx={176} cy={22} r={7} />
        <Price x={190} y={27} size={14}>
          {`${reviews} reviews`}
        </Price>
        <Price x={396} y={27} size={14} anchor="end">
          {`${Math.round(now.cum)} sold`}
        </Price>
      </Frame>
      <Segmented<"organic" | "sponsored">
        label="Launch plan"
        value={plan}
        onChange={setPlan}
        options={[
          { id: "organic", label: "Organic only" },
          { id: "sponsored", label: "Sponsored, weeks 1–4" },
        ]}
      />
      <Slider label="Week" value={week} min={0} max={12} onChange={setWeek} />
    </div>
  );
}

/**
 * The platform's three-way trade-off on one results page for "coffee mug".
 * The slider fills the top of the eight slots with sponsored listings
 * (purple). Without a relevance floor the highest bidders are poorly matched
 * (a sneaker, headphones) and pay $1.20 a click; with the floor only mugs
 * may bid, at most three qualify, and they pay $0.80. Slots are examined
 * with probability 1, 0.6, 0.4 … 0.09; 30% of examinations click; an
 * examination of a mug converts 10% (a qualified sponsored mug 9%), of a
 * mismatch 2%. Shoppers who come back next quarter scale with orders, and
 * next quarter's ad revenue scales with them.
 */
const SLOT_EXAM = [1, 0.6, 0.4, 0.3, 0.22, 0.16, 0.12, 0.09];
export function SponsoredSlots() {
  const [n, setN] = useState(2);
  const [floor, setFloor] = useState<"floor"[]>([]);
  const id = "w4-slots";
  const hasFloor = floor.includes("floor");
  const ads = hasFloor ? Math.min(n, 3) : n;
  const cpc = hasFloor ? 0.8 : 1.2;
  let orders = 0;
  let organic = 0;
  let revenue = 0;
  SLOT_EXAM.forEach((e, k) => {
    const sponsored = k < ads;
    const conv = sponsored ? (hasFloor ? 0.09 : 0.02) : 0.1;
    const o = 100 * e * conv;
    orders += o;
    if (!sponsored) organic += o;
    if (sponsored) revenue += 100 * e * 0.3 * cpc;
  });
  const orders0 = 100 * SLOT_EXAM.reduce((a, b) => a + b, 0) * 0.1;
  const back = Math.round((10 * orders) / orders0);
  const next = Math.round(revenue * (back / 10));
  const glyphs = ["sneaker", "headphones", "sneaker", "headphones", "sneaker", "headphones"];
  const rowKey = (y: number, t: string) => (
    <CatKey x={200} y={y} size={10}>
      {t}
    </CatKey>
  );
  return (
    <div>
      <Frame
        width={480}
        height={318}
        label={`A results page for coffee mug with ${ads} sponsored listings, in purple, at the top of eight slots${hasFloor ? "; a relevance floor lets only mugs bid" : adMismatch(ads)}. Per 100 searches: ${Math.round(orders)} orders for buyers, ${back} of 10 shoppers come back next quarter, ${Math.round(organic)} orders for organic sellers, and $${Math.round(revenue)} of ad revenue now, $${next} next quarter.`}
      >
        <HalftoneDefs id={id} />
        <SearchBar x={10} y={6} w={160} text="coffee mug" size={11} />
        {SLOT_EXAM.map((_, k) => {
          const y = 42 + k * 34;
          const sponsored = k < ads;
          const item = sponsored && !hasFloor ? glyphs[k] : "mug";
          return (
            <g key={k}>
              <rect x={10} y={y} width={160} height={30} fill={CAT.tile} stroke={sponsored ? CAT.purple : CAT.ink} strokeWidth={sponsored ? 1.4 : 0.7} />
              <Numeral x={16} y={y + 20} size={12}>
                {k + 1}
              </Numeral>
              {item === "mug" ? (
                <Mug id={id} cx={46} cy={y + 15} scale={0.5} />
              ) : item === "sneaker" ? (
                <Sneaker id={id} cx={46} cy={y + 16} s={0.42} />
              ) : (
                <Headphones id={id} cx={46} cy={y + 16} s={0.55} />
              )}
              <line x1={66} y1={y + 12} x2={116} y2={y + 12} {...hair} />
              <line x1={66} y1={y + 18} x2={100} y2={y + 18} {...hair} />
              {sponsored ? (
                <CatKey x={164} y={y + 26} size={7} anchor="end" fill={CAT.purple}>
                  SPONSORED
                </CatKey>
              ) : null}
            </g>
          );
        })}

        {rowKey(20, "BUYERS' ORDERS")}
        {Array.from({ length: Math.round(orders / 2) }, (_, k) => (
          <Parcel key={k} id={id} x={204 + k * 16} y={36} w={13} h={10} />
        ))}
        <Price x={470} y={46} size={13} anchor="end">
          {`${Math.round(orders)}`}
        </Price>

        {rowKey(84, "SHOPPERS WHO COME BACK")}
        {Array.from({ length: 10 }, (_, k) =>
          k < back ? (
            <Person key={k} id={id} cx={212 + k * 22} cy={110} s={0.42} />
          ) : (
            <g key={k} transform={`translate(${212 + k * 22} 110) scale(0.42)`}>
              <path d="M-20 26V14Q-20 2 -8 0H8Q20 2 20 14V26Z" fill="none" stroke={CAT.ink} strokeWidth={2} strokeDasharray="3 3" />
              <circle cx={0} cy={-12} r={10} fill="none" stroke={CAT.ink} strokeWidth={2} strokeDasharray="3 3" />
            </g>
          ),
        )}
        <Price x={470} y={115} size={13} anchor="end">
          {`${back} of 10`}
        </Price>

        {rowKey(160, "ORGANIC SELLERS' ORDERS")}
        {Array.from({ length: Math.round(organic / 2) }, (_, k) => (
          <Parcel key={k} id={id} x={204 + k * 16} y={176} w={13} h={10} />
        ))}
        <Price x={470} y={186} size={13} anchor="end">
          {`${Math.round(organic)}`}
        </Price>

        {rowKey(226, "PLATFORM AD REVENUE")}
        {[
          { v: revenue, x: 222, t: "NOW" },
          { v: next, x: 330, t: "NEXT QUARTER" },
        ].map((c) => (
          <g key={c.t}>
            {Array.from({ length: Math.round(c.v / 12) }, (_, k) => (
              <Coin key={k} id={id} cx={c.x} cy={290 - k * 5.5} rx={14} ry={3.6} t={3.4} />
            ))}
            <Price x={c.x + 22} y={296} size={13}>
              {`$${Math.round(c.v)}`}
            </Price>
            <CatKey x={c.x - 14} y={312} size={8.5}>
              {c.t}
            </CatKey>
          </g>
        ))}
      </Frame>
      <Slider label="Sponsored slots at the top" value={n} min={0} max={6} onChange={setN} />
      <Toggles<"floor"> label="Auction rule" value={floor} onChange={setFloor} options={[{ id: "floor", label: "Relevance floor" }]} />
    </div>
  );
}
function adMismatch(ads: number) {
  return ads ? "; the highest bidders sell sneakers and headphones" : "";
}

/**
 * The sellers' prisoner's dilemma as a printed payoff sheet. Two rival
 * sellers each choose to bid for the sponsored slot or not; each cell holds
 * each seller's margin as a coin stack (seller A left, B right). Whatever
 * the rival does, bidding pays more, so both bid and land in the amber cell,
 * where both keep less than if neither had bid.
 */
export function BidToDefend() {
  const id = "w4-pd";
  const cells = [
    { r: 0, c: 0, a: 6, b: 6 },
    { r: 0, c: 1, a: 12, b: 3 },
    { r: 1, c: 0, a: 3, b: 12 },
    { r: 1, c: 1, a: 9, b: 9 },
  ];
  const cx = (c: number) => 132 + c * 132;
  const cy = (r: number) => 66 + r * 92;
  const seller = (x: number, y: number, t: string) => (
    <g>
      <Shop id={id} x={x} y={y} w={26} h={22} />
      <CatKey x={x + 32} y={y + 17} size={11}>
        {t}
      </CatKey>
    </g>
  );
  return (
    <Frame
      width={400}
      height={252}
      label="A payoff sheet for two rival sellers, A and B, each choosing to bid for the sponsored slot or not, with each seller's margin as a coin stack. Neither bids: 9 and 9. One bids: the bidder keeps 12, the other 3. Both bid: 6 and 6, the amber cell, where both keep less than if neither had bid."
    >
      <HalftoneDefs id={id} />
      {seller(246, 6, "B")}
      {seller(8, 120, "A")}
      {["BIDS", "DOES NOT"].map((t, c) => (
        <CatKey key={t} x={cx(c) + 66} y={44} size={10} anchor="middle">
          {t}
        </CatKey>
      ))}
      {["BIDS", "DOES NOT"].map((t, r) => (
        <CatKey key={t} x={124} y={cy(r) + 50} size={10} anchor="end">
          {t}
        </CatKey>
      ))}
      {cells.map((cell) => {
        const both = cell.r === 0 && cell.c === 0;
        const x = cx(cell.c);
        const y = cy(cell.r);
        return (
          <g key={`${cell.r}${cell.c}`}>
            <rect x={x} y={y} width={128} height={86} fill={CAT.tile} stroke={CAT.ink} strokeWidth={0.8} />
            {both ? <rect x={x + 3} y={y + 3} width={122} height={80} fill="none" stroke={CAT.amber} strokeWidth={3} /> : null}
            {[
              { v: cell.a, x: x + 34 },
              { v: cell.b, x: x + 94 },
            ].map((m, j) => (
              <g key={j}>
                {Array.from({ length: m.v }, (_, k) => (
                  <Coin key={k} id={id} cx={m.x} cy={y + 58 - k * 4} rx={13} ry={3.2} t={3} />
                ))}
                <Price x={m.x} y={y + 80} size={12} anchor="middle" fill={both ? CAT.amberText : CAT.ink}>
                  {`${j ? "B" : "A"} $${m.v}`}
                </Price>
              </g>
            ))}
          </g>
        );
      })}
    </Frame>
  );
}

/**
 * The proposal on two phones. Today: two sponsored listings (purple) and two
 * organic listings above the fold. Proposed: four sponsored listings fill
 * the first screen and the organic results start below the fold; a tag
 * carries the projected +28% in retail media revenue.
 */
export function FirstScreen() {
  const id = "w4-first";
  const phone = (x: number, ads: number, title: string) => (
    <g>
      <CatKey x={x + 66} y={16} size={10} anchor="middle">
        {title}
      </CatKey>
      <rect x={x} y={26} width={132} height={262} rx={14} fill={CAT.tile} {...ink} />
      <line x1={x + 50} y1={34} x2={x + 82} y2={34} stroke={CAT.ink} strokeWidth={2} strokeLinecap="round" />
      <rect x={x + 10} y={42} width={112} height={18} rx={9} fill={CAT.tile} {...hair} />
      {[0, 1, 2, 3].map((k) => {
        const y = 68 + k * 52;
        const sponsored = k < ads;
        return (
          <g key={k}>
            <rect x={x + 10} y={y} width={112} height={46} fill={CAT.tile} stroke={sponsored ? CAT.purple : CAT.ink} strokeWidth={sponsored ? 1.4 : 0.8} />
            <Mug id={id} cx={x + 32} cy={y + 22} scale={0.6} />
            <line x1={x + 54} y1={y + 16} x2={x + 112} y2={y + 16} {...hair} />
            <line x1={x + 54} y1={y + 22} x2={x + 94} y2={y + 22} {...hair} />
            {sponsored ? (
              <CatKey x={x + 116} y={y + 39} size={8.4} anchor="end" fill={CAT.purple}>
                SPONSORED
              </CatKey>
            ) : null}
          </g>
        );
      })}
      <Price x={x + 66} y={312} size={14} anchor="middle">
        {`${4 - ads} organic on screen`}
      </Price>
    </g>
  );
  return (
    <Frame
      width={400}
      height={322}
      label="Two phones. Today: two sponsored listings, in purple, and two organic listings on the first screen. Proposed: four sponsored listings fill the first screen and organic results begin only below the fold, with a tag for the projected 28 percent jump in retail media revenue."
    >
      <HalftoneDefs id={id} />
      {phone(20, 2, "TODAY")}
      {phone(248, 4, "PROPOSED")}
      <Coin id={id} cx={200} cy={146} rx={16} ry={4.2} t={4} />
      <Coin id={id} cx={200} cy={140} rx={16} ry={4.2} t={4} />
      <Coin id={id} cx={200} cy={134} rx={16} ry={4.2} t={4} />
      <Price x={200} y={180} size={20} anchor="middle">
        +28%
      </Price>
      <Arrow x1={160} y1={196} x2={240} y2={196} />
    </Frame>
  );
}

/**
 * The hypothesis drawn: an AI agent takes in a whole page of twenty mug
 * listings at once, in milliseconds, and gives every slot the same single
 * look, so no position would stand out.
 */
export function HypothesisPage() {
  const id = "w4-hyp";
  return (
    <Frame
      width={480}
      height={292}
      label="The hypothesis: an AI shopping agent with a stopwatch reading milliseconds takes in a whole page of twenty mug listings at once and gives every slot the same single look, one cursor on each listing, so no position stands out."
    >
      <HalftoneDefs id={id} />
      <Agent id={id} cx={52} cy={128} s={1.7} />
      <Stopwatch cx={52} cy={206} r={14} t={0.6} />
      <CatKey x={52} y={240} size={10} anchor="middle">
        MILLISECONDS
      </CatKey>
      <Arrow x1={98} y1={146} x2={130} y2={146} />
      <rect x={140} y={10} width={330} height={272} fill={CAT.tile} {...ink} />
      {Array.from({ length: 20 }, (_, k) => {
        const x = 150 + (k % 5) * 64;
        const y = 20 + Math.floor(k / 5) * 64;
        return (
          <g key={k}>
            <rect x={x} y={y} width={58} height={58} fill={CAT.tile} stroke={CAT.ink} strokeWidth={0.7} />
            <Numeral x={x + 5} y={y + 14} size={10}>
              {k + 1}
            </Numeral>
            <Mug id={id} cx={x + 24} cy={y + 32} scale={0.62} />
            <Cursor x={x + 44} y={y + 38} scale={0.95} />
          </g>
        );
      })}
    </Frame>
  );
}

/**
 * Real data: Wadi & Ma (2026b), 500 shopping sessions per model at its
 * default reasoning effort on a 100-listing results page, where each
 * listing's details take a tool call to inspect. Curves are the quadratic
 * linear probability models of inspection (position and position² on
 * rank / 100), with the intercept set so the curve averages the model's
 * mean inspections per session. The human reference is Ursu (2018): click
 * probability 0.0019 lower per rank on a page of about 27 listings,
 * averaging 1.12 clicks per session; that page ends at rank 27.
 */
const INSPECT = {
  human: { label: "Human shopper", mean: 1.12, b1: 0, b2: 0 },
  flashlite: { label: "Flash Lite", mean: 3.12, b1: -0.146, b2: 0.0982 },
  flash: { label: "Flash", mean: 4.25, b1: -0.1356, b2: 0.0993 },
  pro: { label: "Pro", mean: 5.83, b1: -0.0567, b2: 0.0276 },
  sonnet: { label: "Sonnet", mean: 1.63, b1: -0.0643, b2: 0.0454 },
  luna: { label: "Luna", mean: 4.0, b1: -0.1867, b2: 0.1272 },
} as const;
type Inspector = keyof typeof INSPECT;
function inspectionBins(who: Inspector) {
  const m = INSPECT[who];
  const f =
    who === "human"
      ? (r: number) => (r <= 27 ? 1.12 / 27 - 0.0019 * (r - 14) : 0)
      : (r: number) => {
          const a = m.mean / 100 - m.b1 / 2 - m.b2 / 3;
          return a + m.b1 * (r / 100) + m.b2 * (r / 100) ** 2;
        };
  return Array.from({ length: 10 }, (_, b) => {
    let t = 0;
    for (let r = b * 10 + 1; r <= b * 10 + 10; r++) t += f(r);
    return t * 100;
  });
}
export function AgentInspections() {
  const [who, setWho] = useState<Inspector>("flashlite");
  const id = "w4-inspect";
  const m = INSPECT[who];
  const bins = inspectionBins(who);
  const human = who === "human";
  const tw = 44;
  const gap = 3;
  const base = 198;
  const per = 4;
  return (
    <div>
      <Frame
        width={480}
        height={306}
        label={`Inspections per 100 sessions on a 100-listing results page, grouped in ten blocks of ten ranks, each cursor standing for 4 inspections; the top block's stack is amber. ${human ? "Human shoppers: 58, 39 and 16 in the first three blocks, and the page ends at rank 27." : `The ${m.label} agent: ${bins.map((b) => Math.round(b)).join(", ")} from ranks 1–10 to 91–100, falling and then rising again toward the end of the list.`} ${m.label} inspects ${m.mean.toFixed(2)} listings per session.`}
      >
        <HalftoneDefs id={id} />
        {human ? <Person id={id} cx={190} cy={26} s={0.62} /> : <Agent id={id} cx={190} cy={30} s={0.7} tone="purple" />}
        <Price x={214} y={28} size={15} fill={human ? CAT.ink : CAT.purple}>
          {m.label}
        </Price>
        <Price x={470} y={28} size={15} anchor="end">
          {`${m.mean.toFixed(2)} per session`}
        </Price>
        {bins.map((v, b) => {
          const x = 10 + b * (tw + gap);
          const c = Math.round(v / per);
          const absent = human && b >= 3;
          return (
            <g key={b}>
              {Array.from({ length: c }, (_, j) => (
                <Cursor key={j} x={x + tw / 2 - 11 + (j % 2) * 12} y={base - 18 - Math.floor(j / 2) * 15} scale={0.9} tone={b === 0 ? "amber" : "ink"} />
              ))}
              {absent ? (
                <rect x={x} y={base} width={tw} height={54} fill="none" stroke={CAT.ink} strokeWidth={0.7} strokeDasharray="2 2.5" />
              ) : (
                <g>
                  <Tile x={x} y={base} w={tw} h={54} />
                  <Mug id={id} cx={x + tw / 2} cy={base + 26} scale={0.62} />
                </g>
              )}
              <Price x={x + tw / 2} y={base + 70} size={10} anchor="middle">
                {`${b * 10 + 1}–${b * 10 + 10}`}
              </Price>
            </g>
          );
        })}
        <CatKey x={240} y={296} size={9.5} anchor="middle">
          {human ? "RANK ON THE PAGE · THE HUMAN PAGE ENDS AT 27" : "RANK ON THE PAGE"}
        </CatKey>
      </Frame>
      <Segmented<Inspector>
        label="Who shops"
        value={who}
        onChange={setWho}
        options={(Object.keys(INSPECT) as Inspector[]).map((k) => ({ id: k, label: INSPECT[k].label }))}
      />
    </div>
  );
}

/**
 * Two scenes. Left: a shopper reads the SPONSORED key on Position 1 and
 * recognises the payment behind it (a thought bubble holding a coin). Right:
 * an AI assistant stands between the shopper and the same page; its
 * configuration card (amber) names whom it serves, the shopper or the
 * platform, and the choice is left open.
 */
export function PersuasionOrDelegation() {
  const id = "w4-pk";
  const page = (x: number, y: number) => (
    <g>
      <rect x={x} y={y} width={120} height={150} fill={CAT.tile} {...ink} />
      <Tile x={x + 8} y={y + 8} w={104} h={56} />
      <Numeral x={x + 15} y={y + 25} size={13}>
        1
      </Numeral>
      <CatKey x={x + 106} y={y + 24} size={7.5} anchor="end">
        SPONSORED
      </CatKey>
      <Mug id={id} cx={x + 42} cy={y + 44} scale={0.7} />
      <line x1={x + 64} y1={y + 42} x2={x + 104} y2={y + 42} {...hair} />
      <line x1={x + 64} y1={y + 48} x2={x + 92} y2={y + 48} {...hair} />
      {[0, 1].map((k) => (
        <g key={k}>
          <rect x={x + 8} y={y + 72 + k * 36} width={104} height={32} fill={CAT.tile} stroke={CAT.ink} strokeWidth={0.6} />
          <Numeral x={x + 15} y={y + 92 + k * 36} size={11}>
            {k + 2}
          </Numeral>
          <Mug id={id} cx={x + 42} cy={y + 88 + k * 36} scale={0.45} />
        </g>
      ))}
    </g>
  );
  return (
    <Frame
      width={480}
      height={262}
      label="Left: a shopper reads the Sponsored key on the first listing of a results page and recognises that the seller paid for the placement, shown as a thought bubble holding a coin. Right: an AI shopping assistant stands between a shopper and the same page; its configuration card, in amber, asks whom it serves, the shopper or the platform, with neither box ticked."
    >
      <HalftoneDefs id={id} />
      {/* the shopper reads the label */}
      <Person id={id} cx={36} cy={196} s={1.3} />
      <path d="M50 178L104 78" fill="none" stroke={CAT.ink} strokeWidth={0.8} strokeDasharray="2 3" />
      <circle cx={34} cy={126} r={4} fill={CAT.tile} {...hair} />
      <circle cx={38} cy={146} r={2.6} fill={CAT.tile} {...hair} />
      <ellipse cx={34} cy={84} rx={26} ry={20} fill={CAT.tile} {...ink} />
      <Coin id={id} cx={34} cy={84} rx={13} ry={3.6} t={3.6} />
      <Coin id={id} cx={34} cy={79} rx={13} ry={3.6} t={3.6} />
      {page(98, 52)}

      <line x1={236} y1={14} x2={236} y2={248} {...hair} />

      {/* the assistant in between */}
      <Person id={id} cx={268} cy={196} s={1.3} />
      <Agent id={id} cx={330} cy={196} s={1.1} />
      <Arrow x1={294} y1={196} x2={306} y2={196} />
      {page(352, 52)}
      <rect x={252} y={24} width={92} height={108} fill={CAT.tile} stroke={CAT.ink} strokeWidth={1} />
      <rect x={255} y={27} width={86} height={102} fill="none" stroke={CAT.amber} strokeWidth={2.4} />
      <CatKey x={298} y={46} size={9} anchor="middle" fill={CAT.amberText}>
        SERVES
      </CatKey>
      {[0, 1].map((k) => (
        <g key={k}>
          <rect x={266} y={62 + k * 32} width={14} height={14} fill={CAT.tile} {...ink} />
          {k === 0 ? <Person id={id} cx={306} cy={70 + k * 32} s={0.4} /> : <Badge cx={306} cy={69 + k * 32} r={9} />}
        </g>
      ))}
      <line x1={298} y1={134} x2={326} y2={168} stroke={CAT.ink} strokeWidth={0.8} />
    </Frame>
  );
}

/**
 * The delegation and its catch. A shopper hands the agent a brief (price,
 * quality, fit). The agent itself sits inside the marketplace, which
 * deployed it (the platform's badge on its wall) and whose coins come from
 * the sponsored listing beside it.
 */
export function TwoPrincipals() {
  const id = "w4-principals";
  return (
    <Frame
      width={400}
      height={226}
      label="A shopper hands an AI agent a brief listing price, quality and fit. The agent sits inside the marketplace that deployed it and wears the platform's badge; beside it a sponsored listing pays coins to the platform."
    >
      <HalftoneDefs id={id} />
      <Person id={id} cx={34} cy={176} s={1.25} />
      {/* the brief */}
      <rect x={10} y={20} width={86} height={92} fill={CAT.tile} {...ink} />
      {["PRICE", "QUALITY", "FIT"].map((t, k) => (
        <g key={t}>
          <rect x={18} y={34 + k * 24} width={10} height={10} fill={CAT.tile} {...ink} />
          <CatKey x={34} y={43 + k * 24} size={9.5}>
            {t}
          </CatKey>
        </g>
      ))}
      <Arrow x1={100} y1={66} x2={162} y2={118} />
      {/* the marketplace */}
      <rect x={128} y={10} width={262} height={206} fill="none" stroke={CAT.ink} strokeWidth={1.4} />
      <Badge cx={146} cy={28} r={10} />
      <Agent id={id} cx={196} cy={146} s={1.4} />
      <Tile x={268} y={40} w={110} h={86} />
      <CatKey x={370} y={56} size={8.4} anchor="end">
        SPONSORED
      </CatKey>
      <Mug id={id} cx={300} cy={84} scale={0.85} />
      <Price x={334} y={112} size={12}>
        $24
      </Price>
      {[0, 1, 2, 3].map((k) => (
        <Coin key={k} id={id} cx={323} cy={196 - k * 6} rx={15} ry={4} t={3.8} />
      ))}
      <Arrow x1={323} y1={130} x2={323} y2={168} />
      <Badge cx={226} cy={170} r={8} />
      <Arrow x1={302} y1={186} x2={238} y2={172} />
    </Frame>
  );
}

/**
 * Real data: Wadi & Ma (2026c), Study 1, Table 3 (Gemini 3.1 Pro, 500 runs
 * per cell): the share of runs in which the agent booked the target hotel
 * when it was listed organically and when it carried a Sponsored tag, by
 * whom the system prompt said the agent was employed. Each booking slip is
 * 2% of runs; the amber bracket is the sponsorship penalty, 50.2 points for
 * the traveler's agent and 29.2 for the platform's.
 */
const ROLE_SHARE = {
  traveler: { organic: 53.0, sponsored: 2.8 },
  platform: { organic: 54.2, sponsored: 25.0 },
} as const;
export function RoleSwitch() {
  const [role, setRole] = useState<"traveler" | "platform">("traveler");
  const id = "w4-role";
  const d = ROLE_SHARE[role];
  const penalty = r2(d.organic - d.sponsored);
  const base = 196;
  const k = 2.6;
  const top = (v: number) => r2(base - v * k);
  const cols = [
    { x: 196, v: d.organic, sponsored: false },
    { x: 320, v: d.sponsored, sponsored: true },
  ];
  return (
    <div>
      <Frame
        width={480}
        height={262}
        label={`An AI agent whose system prompt says it is employed by ${role === "traveler" ? "the traveler" : "the hotel booking platform"} books the same target hotel in ${d.organic}% of runs when it is listed organically and ${d.sponsored}% when it carries a Sponsored tag, drawn as stacks of booking slips; the amber bracket marks a sponsorship penalty of ${penalty.toFixed(1)} points.`}
      >
        <HalftoneDefs id={id} />
        {/* the system prompt */}
        <rect x={10} y={20} width={120} height={84} fill={CAT.tile} {...ink} />
        <rect x={16} y={26} width={108} height={7} fill={CAT.ink} />
        <CatKey x={18} y={50} size={9}>
          EMPLOYED BY
        </CatKey>
        {role === "traveler" ? <Person id={id} cx={40} cy={78} s={0.62} /> : <Badge cx={40} cy={80} r={13} />}
        <CatKey x={62} y={84} size={9}>
          {role === "traveler" ? "TRAVELER" : "PLATFORM"}
        </CatKey>
        <line x1={70} y1={104} x2={70} y2={152} {...ink} />
        <Agent id={id} cx={70} cy={182} s={1.25} />

        {cols.map((c) => {
          const n = Math.round(c.v / 2);
          return (
            <g key={c.x}>
              {Array.from({ length: n }, (_, j) => (
                <rect key={j} x={c.x} y={r2(base - (j + 1) * 2 * k)} width={64} height={r2(2 * k - 1)} fill={CAT.tile} stroke={CAT.ink} strokeWidth={0.6} />
              ))}
              <Price x={c.x + 32} y={top(c.v) - 8} size={15} anchor="middle">
                {`${c.v.toFixed(1)}%`}
              </Price>
              <Tile x={c.x - 16} y={204} w={96} h={50} />
              <Hotel id={id} cx={c.x + 4} cy={231} s={0.7} />
              {c.sponsored ? (
                <CatKey x={c.x + 74} y={246} size={7.5} anchor="end">
                  SPONSORED
                </CatKey>
              ) : null}
              <line x1={c.x + 26} y1={222} x2={c.x + 70} y2={222} {...hair} />
              <line x1={c.x + 26} y1={228} x2={c.x + 56} y2={228} {...hair} />
            </g>
          );
        })}
        {/* the penalty */}
        <path d={`M404 ${top(d.organic)}H414V${top(d.sponsored)}H404`} fill="none" stroke={CAT.ink} strokeWidth={4.6} strokeLinejoin="round" />
        <path d={`M404 ${top(d.organic)}H414V${top(d.sponsored)}H404`} fill="none" stroke={CAT.amber} strokeWidth={2.6} strokeLinejoin="round" />
        <Price x={424} y={r2((top(d.organic) + top(d.sponsored)) / 2 + 2)} size={15} fill={CAT.amberText}>
          {`−${penalty.toFixed(1)}`}
        </Price>
        <CatKey x={424} y={r2((top(d.organic) + top(d.sponsored)) / 2 + 16)} size={8}>
          POINTS
        </CatKey>
      </Frame>
      <Segmented<"traveler" | "platform">
        label="System prompt"
        value={role}
        onChange={setRole}
        options={[
          { id: "traveler", label: "Employed by the traveler" },
          { id: "platform", label: "Employed by the platform" },
        ]}
      />
    </div>
  );
}

/** A toddler car seat in profile centred on (cx, cy): halftone shell, dense side wing, white harness strap and base. About 30 × 34 at s = 1. */
function CarSeat({ id, cx, cy, s = 1 }: { id: string; cx: number; cy: number; s?: number }) {
  const w = r2(LINE.outline / s);
  return (
    <g transform={`translate(${r2(cx)} ${r2(cy)}) scale(${s})`} strokeLinejoin="round" strokeLinecap="round">
      <path d="M-8 -17Q-14 -17 -14 -10V6Q-14 12 -8 12H12Q16 12 16 8V4Q16 0 10 0H0V-10Q0 -17 -8 -17Z" fill={ht(id, "light")} stroke={CAT.ink} strokeWidth={w} />
      <path d="M-14 -10Q-14 -17 -8 -17Q-4 -17 -2 -14V4H-14Z" fill={ht(id, "dense")} stroke="none" />
      <path d="M-4 -8L6 4" stroke={CAT.tile} strokeWidth={r2(2.4 / s)} />
      <rect x={-12} y={12} width={26} height={5} rx={2} fill={CAT.tile} stroke={CAT.ink} strokeWidth={w} />
    </g>
  );
}

/**
 * The audit as a printed test sheet: the parent's request on a slip, then
 * eight versions of the same results page crossing rank position (1 or 8),
 * the label (Sponsored or none) and the price ($349 or $199) for the same
 * car seat. Each run records which seat the assistant picks.
 */
export function AuditGrid() {
  const id = "w4-audit";
  const cells = [0, 1, 2, 3, 4, 5, 6, 7].map((k) => ({ rank: k & 1 ? 8 : 1, sponsored: !(k & 2), price: k & 4 ? "$199" : "$349" }));
  return (
    <Frame
      width={400}
      height={318}
      label="An audit test sheet. A slip reads: Pick the best car seat for my toddler. Below, eight versions of the same results page for one car seat cross its rank position, 1 or 8, its label, Sponsored or none, and its price, $349 or $199; each version records the assistant's pick."
    >
      <HalftoneDefs id={id} />
      <rect x={10} y={8} width={380} height={30} rx={15} fill={CAT.tile} {...ink} />
      <text x={26} y={28} fontFamily={BODY_FONT} fontSize={13} fill={CAT.ink}>
        Pick the best car seat for my toddler
      </text>
      <Agent id={id} cx={368} cy={26} s={0.5} />
      {cells.map((c, k) => {
        const x = 10 + (k % 4) * 96;
        const y = 52 + Math.floor(k / 4) * 132;
        return (
          <g key={k}>
            <Tile x={x} y={y} w={88} h={124} />
            <Numeral x={x + 9} y={y + 20} size={15}>
              {c.rank}
            </Numeral>
            {c.sponsored ? (
              <CatKey x={x + 82} y={y + 34} size={8.2} anchor="end">
                SPONSORED
              </CatKey>
            ) : null}
            <CarSeat id={id} cx={x + 44} cy={y + 64} s={1.2} />
            <line x1={x + 12} y1={y + 92} x2={x + 70} y2={y + 92} {...hair} />
            <line x1={x + 12} y1={y + 97} x2={x + 56} y2={y + 97} {...hair} />
            <Price x={x + 12} y={y + 115} size={13}>
              {c.price}
            </Price>
          </g>
        );
      })}
    </Frame>
  );
}
