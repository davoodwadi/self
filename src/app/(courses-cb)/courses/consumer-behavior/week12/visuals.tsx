"use client";

/* ==========================================================================
   Consumer Behavior · Week 12 — figures
   --------------------------------------------------------------------------
   Editorial Sketch plates for AI-mediated consumption: wobbly doubled ink and
   loose watercolour washes set off-register. Every mark comes from
   ../_visuals; the style rules live in ../CLAUDE.md.

   Fixed cast for this week:
     · Person: every human, one fashion-illustration figure (the CONSUMER
       look for the week's consumer), varied only by hair, clothes and skin.
     · Agent: the AI agent (shared: a standing phone with the AI sparkle).
     · Listing: one result row (a picture, two lines of text, stars, a price
       and, when paid for, a small tag), the same on every screen this week.

   Colour roles: teal is the one thing chosen, bought, lit or ticked on a
   plate; ochre a badge, a count, a paid tag or a small highlight; pencil only
   an absent object; sky behind glass or a hope, with blush for the here and
   now.

   Data: the hotel-booking plates use Wadi & Ma (2026c), "Whom Do AI Agents
   Serve?" (my-papers/Publication_6_JBE): Study 1 Table 5 (target choice by
   principal and sponsorship, N = 500 per cell) and Study 2 Table 14 (choice
   by disclosure label and principal). The filter-bubble feed runs on
   SIMULATED data and says so on the plate.
   ========================================================================== */

import React from "react";
import {
  blobPts,
  InkLine,
  Paper,
  PencilLine,
  PlateButton,
  PlateToggle,
  type Pt,
  r2,
  seeded,
  SK,
  SketchFrame,
  SketchText,
  Wash,
} from "../_visuals/kit";
import {
  Agent,
  at,
  Backwash,
  BrandBadge,
  Ground,
  ReviewCard,
  Thought,
  MapPin,
  SpeechBubble,
  Coin,
  Suitcase1,
  Cart,
  Magnifier,
  Heart,
  Shoe,
  SketchArrow,
  Bag,
  curvePts,
  handAt,
  type Look,
  PayCard,
  Person,
  rp,
  sharp,
  Sparkle,
  Stars,
} from "../_visuals/objects";

/* -- the week's looks ---------------------------------------------------- */

const CONSUMER: Look = { hair: "curly", hairTone: SK.brown, wear: SK.camel, legs: SK.charcoal, skin: SK.tan, skinOpacity: 0.5 };

/* -- the cast ------------------------------------------------------------- */

/** A box from four corners, corners kept crisp. */
const rect = (x: number, y: number, w: number, h: number, d = 1.5): Pt[] => sharp(rp([[x, y], [x + w, y], [x + w, y + h], [x, y + h]]), true, d);

/** A line of handwriting: a short wavy ink stroke `w` long. */
function Scrawl({ x, y, w, seed, color = SK.ink, width = 0.8 }: { x: number; y: number; w: number; seed: number; color?: string; width?: number }) {
  const n = Math.max(3, Math.round(w / 6));
  const pts = rp(Array.from({ length: n + 1 }, (_, k) => [x + (w * k) / n, y + (k % 2 ? -0.8 : 0.8)] as Pt));
  return <InkLine pts={pts} seed={seed} width={width} amp={0.35} color={color} />;
}

/**
 * One result row, the week's listing: a picture, two lines of text, a row of
 * stars, a price, and a small ochre tag when the listing is paid for.
 * (x, y) is the top-left; the row is `w` × `h`.
 */
export function Listing({
  x,
  y,
  w,
  h = 46,
  seed,
  tag,
  price,
  stars = 4,
  thumb = SK.camel,
  lit = false,
  pencil = false,
  size = 9,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  seed: number;
  tag?: string;
  price?: string;
  stars?: number;
  thumb?: string;
  lit?: boolean;
  pencil?: boolean;
  size?: number;
}) {
  const box = rect(x, y, w, h, 2);
  const t = h - 12;
  const pic = rect(x + 6, y + 6, t * 1.15, t, 1);
  const tx = x + 12 + t * 1.15;
  if (pencil) {
    return (
      <g>
        <PencilLine pts={box} seed={seed} closed />
        <PencilLine pts={pic} seed={seed + 1} closed />
        <PencilLine pts={rp([[tx, y + h * 0.32], [tx + (w - (tx - x)) * 0.55, y + h * 0.32]])} seed={seed + 2} />
        <PencilLine pts={rp([[tx, y + h * 0.56], [tx + (w - (tx - x)) * 0.35, y + h * 0.56]])} seed={seed + 3} />
      </g>
    );
  }
  return (
    <g>
      {lit ? <Wash pts={box} seed={seed} fill={SK.teal} opacity={0.35} dx={1.5} dy={1} /> : <Paper pts={box} seed={seed} />}
      <InkLine pts={box} seed={seed + 1} width={1} closed />
      <Wash pts={pic} seed={seed + 2} fill={thumb} opacity={0.6} dx={0.8} dy={0.6} />
      <InkLine pts={pic} seed={seed + 3} width={0.8} closed />
      <Scrawl x={tx} y={r2(y + h * 0.3)} w={r2((w - (tx - x)) * 0.5)} seed={seed + 4} width={1.1} />
      <Scrawl x={tx} y={r2(y + h * 0.52)} w={r2((w - (tx - x)) * 0.32)} seed={seed + 5} />
      {stars > 0 ? <Stars x={r2(tx + 3)} y={r2(y + h * 0.78)} n={stars} r={r2(h * 0.075)} gap={r2(h * 0.19)} seed={seed + 6} /> : null}
      {price ? (
        <SketchText x={x + w - 8} y={r2(y + h * 0.36)} anchor="end" size={size + 1.5}>
          {price}
        </SketchText>
      ) : null}
      {tag ? <TagChip x={x + w - 8} y={r2(y + h * 0.62)} text={tag} seed={seed + 8} size={size} /> : null}
    </g>
  );
}

/** A small paid-placement tag, right-aligned at (x, y): ochre wash under ink text. */
export function TagChip({ x, y, text, seed, size = 9 }: { x: number; y: number; text: string; seed: number; size?: number }) {
  const w = r2(text.length * size * 0.74 + 12);
  const h = r2(size + 7);
  const box = rect(x - w, y, w, h, 1);
  return (
    <g>
      <Wash pts={box} seed={seed} fill={SK.ochre} opacity={0.75} dx={0.6} dy={0.4} />
      <InkLine pts={box} seed={seed + 1} width={0.8} amp={0.3} closed />
      <SketchText x={r2(x - w / 2)} y={r2(y + h / 2 + size * 0.36)} anchor="middle" size={size}>
        {text}
      </SketchText>
    </g>
  );
}

/* ==========================================================================
   Title Slide
   ========================================================================== */

/**
 * A desk still life: an open laptop shows a page of three results, the middle
 * one tagged SPONSORED. Beside it the AI agent stands on the desk.
 */
export function DeskOfResults() {
  const g = 284;
  const scr = rect(70, 46, 300, 196, 3);
  const glass = rect(84, 60, 272, 168, 2);
  const base = sharp(rp([[46, 252], [394, 252], [418, 274], [22, 274]]), true, 2);
  return (
    <SketchFrame
      id="sk-desk-results"
      width={560}
      height={316}
      label="A desk still life: an open laptop shows a page of three results, the middle one tagged sponsored. Beside the laptop stands the AI agent."
    >
      <Backwash cx={280} cy={160} rx={272} ry={152} seed={100} />
      <Ground x0={14} x1={546} y={g} seed={104} />
      {/* laptop */}
      <Wash pts={scr} seed={110} fill={SK.charcoal} opacity={0.6} />
      <InkLine pts={scr} seed={111} closed />
      <Wash pts={glass} seed={112} fill={SK.sky} opacity={0.55} dx={0} dy={0} />
      <Paper pts={rect(92, 68, 256, 152, 1.5)} seed={113} />
      <InkLine pts={rect(92, 68, 256, 152, 1.5)} seed={114} width={0.8} closed />
      <Listing x={102} y={78} w={236} h={40} seed={120} price="$84" stars={4} thumb={SK.camel} />
      <Listing x={102} y={124} w={236} h={40} seed={140} price="$96" stars={4} thumb={SK.leather} tag="SPONSORED" size={8.5} />
      <Listing x={102} y={170} w={236} h={40} seed={160} price="$79" stars={4} thumb={SK.earth} />
      <Wash pts={base} seed={170} fill={SK.stone} opacity={0.9} />
      <InkLine pts={base} seed={171} closed />
      <InkLine pts={rp([[178, 262], [262, 262]])} seed={172} width={0.9} />
      {/* the agent */}
      <Agent x={474} y={g - 2} s={1.6} seed={180} />
    </SketchFrame>
  );
}

/* ==========================================================================
   The Digital Consumer
   ========================================================================== */

/** A product box standing on (x, bottom) with the brand badge: the week's product. */
function Product({ x, bottom, w = 40, h = 52, seed, fill = SK.camel, badge = true }: { x: number; bottom: number; w?: number; h?: number; seed: number; fill?: string; badge?: boolean }) {
  const box = rect(x - w / 2, bottom - h, w, h, 1.5);
  return (
    <g>
      <Wash pts={box} seed={seed} fill={fill} opacity={0.6} />
      <InkLine pts={box} seed={seed + 1} closed />
      {badge ? <BrandBadge x={x} y={r2(bottom - h / 2)} r={r2(Math.min(w, h) * 0.22)} seed={seed + 2} /> : null}
    </g>
  );
}

/** A small paper shelf label with a price, centred at (x, y). */
function ShelfPrice({ x, y, text, seed, size = 12 }: { x: number; y: number; text: string; seed: number; size?: number }) {
  const w = r2(text.length * size * 0.66 + 12);
  const box = rect(x - w / 2, y - size * 0.9, w, size * 1.6, 1);
  return (
    <g>
      <Paper pts={box} seed={seed} />
      <InkLine pts={box} seed={seed + 1} width={0.9} closed />
      <SketchText x={x} y={r2(y + size * 0.3)} anchor="middle" size={size}>
        {text}
      </SketchText>
    </g>
  );
}

/**
 * In the store, phone in hand: a shelf of boxed products, one priced $24 on
 * its shelf label. In the foreground a hand holds a phone showing the same
 * box with its star rating and a price of $19.
 */
export function PhoneInTheAisle() {
  const ph = rect(214, 66, 120, 200, 10);
  const glass = rect(224, 82, 100, 164, 2);
  const palm = rp([[220, 300], [222, 270], [236, 252], [270, 250], [312, 252], [330, 244], [344, 226], [354, 230], [352, 254], [338, 278], [334, 300]]);
  return (
    <SketchFrame
      id="sk-phone-aisle"
      width={400}
      height={300}
      label="In a store: a shelf of boxed products, one priced $24 on its shelf label. In the foreground a hand holds a phone showing the same box with four stars and a price of $19."
    >
      <Backwash cx={200} cy={150} rx={194} ry={144} seed={300} />
      {/* the shelf */}
      {[118, 228].map((y, k) => (
        <g key={y}>
          <Wash pts={rect(18, y, 364, 9)} seed={310 + k} fill={SK.leather} opacity={0.55} />
          <InkLine pts={rect(18, y, 364, 9)} seed={312 + k} closed />
        </g>
      ))}
      <Product x={56} bottom={118} w={44} h={60} seed={320} fill={SK.earth} badge={false} />
      <Product x={118} bottom={118} w={52} h={70} seed={324} />
      <Product x={180} bottom={118} w={42} h={56} seed={328} fill={SK.sky} badge={false} />
      <ShelfPrice x={118} y={146} text="$24" seed={332} />
      <Product x={60} bottom={228} w={50} h={62} seed={336} fill={SK.blush} badge={false} />
      <Product x={126} bottom={228} w={46} h={58} seed={340} fill={SK.earth} badge={false} />
      {/* the phone in hand */}
      <g transform="rotate(-7 274 190)">
        <Wash pts={ph} seed={350} fill={SK.charcoal} opacity={0.75} />
        <InkLine pts={ph} seed={351} closed />
        <Paper pts={glass} seed={352} />
        <InkLine pts={glass} seed={353} width={0.8} closed />
        <Product x={274} bottom={164} w={54} h={70} seed={356} />
        <Stars x={248} y={184} n={4} r={5.5} gap={13} seed={360} />
        <SketchText x={274} y={220} anchor="middle" size={18}>
          $19
        </SketchText>
        {/* fingers curled round the left edge, the palm and thumb below */}
        {[150, 172, 194, 216].map((y, i) => {
          const f = rp(blobPts(214, y, 12, 8, 370 + i, 10, 0.08));
          return (
            <g key={y}>
              <Wash pts={f} seed={370 + i} fill={SK.skin} opacity={0.9} dx={0.6} dy={0.4} />
              <InkLine pts={f} seed={374 + i} closed width={1} />
            </g>
          );
        })}
        <Wash pts={palm} seed={380} fill={SK.skin} opacity={0.9} dx={0.8} dy={0.6} />
        <InkLine pts={palm.slice(0, palm.length - 1)} seed={381} />
        <InkLine pts={rp([[300, 262], [318, 258]])} seed={382} width={0.8} />
      </g>
    </SketchFrame>
  );
}

/**
 * The record and what it is used for: a paper log of one shopper's search,
 * click and purchase, and beside it a phone showing that shopper a
 * personalized offer for the same kind of shoe, at 10% off.
 */
export function RecordToOffer() {
  const log = rect(22, 26, 178, 210, 2);
  const ph = rect(262, 34, 104, 196, 10);
  const glass = rect(271, 50, 86, 160, 2);
  const rows: [string, number][] = [
    ["SEARCH", 70],
    ["CLICK", 134],
    ["BUY", 198],
  ];
  return (
    <SketchFrame
      id="sk-record-offer"
      width={400}
      height={262}
      label="A paper log of one shopper's activity: a search for running shoes, a click on a shoe and a purchase of $64. An arrow leads to a phone that shows the same shopper a personalized offer: a running shoe at 10% off."
    >
      <Backwash cx={200} cy={132} rx={194} ry={126} seed={400} />
      <Paper pts={log} seed={402} />
      <InkLine pts={log} seed={403} closed />
      {rows.map(([word, y], i) => (
        <g key={word}>
          <SketchText x={34} y={y + 4} size={10.5}>
            {word}
          </SketchText>
          {i < 2 ? <InkLine pts={rp([[32, y + 32], [190, y + 32]])} seed={404 + i} width={0.7} /> : null}
        </g>
      ))}
      {/* search: a box with the words typed */}
      <InkLine pts={rect(98, 58, 92, 22, 1)} seed={410} width={0.9} closed />
      <SketchText x={104} y={73} size={9}>
        running shoes
      </SketchText>
      {/* click: the shoe with a pointer on it */}
      <Shoe x={140} y={142} s={0.9} seed={414} fill={SK.sky} />
      <InkLine pts={sharp(rp([[152, 124], [152, 144], [157, 139], [161, 147], [164, 146], [160, 138], [167, 137]]), true, 0.6)} seed={420} width={1} amp={0.2} closed />
      {/* buy: a bag and the amount */}
      <Bag x={118} y={178} w={24} seed={424} badge={false} />
      <SketchText x={146} y={202} size={12}>
        $64
      </SketchText>
      <SketchArrow pts={curvePts([204, 132], [228, 122], [252, 130])} seed={430} />
      {/* the phone with the offer */}
      <Wash pts={ph} seed={440} fill={SK.charcoal} opacity={0.75} />
      <InkLine pts={ph} seed={441} closed />
      <Paper pts={glass} seed={442} />
      <InkLine pts={glass} seed={443} width={0.8} closed />
      <Shoe x={314} y={112} s={1.25} seed={446} fill={SK.sky} />
      <TagChip x={344} y={136} text="−10%" seed={452} size={12} />
      <Scrawl x={282} y={178} w={62} seed={456} width={1.1} />
      <Scrawl x={282} y={192} w={40} seed={457} />
    </SketchFrame>
  );
}

/**
 * Who stands between: the consumer on the left, the product on the right, and
 * between them, in a row, a platform (a store page of many products), a
 * recommendation algorithm (a short ranked list) and the AI agent. Small
 * arrows carry the product from one to the next toward the consumer.
 */
export function Intermediaries() {
  const g = 200;
  const win = rect(198, 62, 132, 104, 2);
  const list = rect(398, 72, 104, 92, 2);
  const arrow = (x0: number, x1: number, seed: number) => <SketchArrow pts={rp([[x0, 120], [x1, 120]])} seed={seed} head={7} />;
  return (
    <SketchFrame
      id="sk-intermediaries"
      width={800}
      height={236}
      label="Between the consumer on the left and the product on the right stand three intermediaries in a row: a platform (a store page of many products), a recommendation algorithm (a short ranked list) and an AI agent. Arrows lead from the product through each one to the consumer."
    >
      <Backwash cx={400} cy={122} rx={394} ry={112} seed={500} />
      <Ground x0={20} x1={150} y={g} seed={502} />
      <Person x={84} y={g} h={170} look={CONSUMER} arms={["hip", "down"]} seed={510} />
      {/* the platform: a store page */}
      <Paper pts={win} seed={530} />
      <InkLine pts={win} seed={531} closed />
      <InkLine pts={rp([[198, 78], [330, 78]])} seed={532} width={0.8} />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const cx = 222 + (i % 3) * 42;
        const cy = 102 + Math.floor(i / 3) * 40;
        const t = rect(cx - 13, cy - 13, 26, 26, 1);
        return (
          <g key={i}>
            <Wash pts={t} seed={534 + i} fill={[SK.camel, SK.sky, SK.earth, SK.blush, SK.stone, SK.camel][i]} opacity={0.6} dx={0.6} dy={0.4} />
            <InkLine pts={t} seed={540 + i} width={0.8} closed />
          </g>
        );
      })}
      <SketchText x={264} y={196} anchor="middle" size={11}>
        PLATFORMS
      </SketchText>
      {/* the recommendation algorithm: a ranked short list */}
      <Paper pts={list} seed={550} />
      <InkLine pts={list} seed={551} closed />
      {[0, 1, 2].map((i) => {
        const y = 92 + i * 26;
        const t = rect(428, y - 9, 18, 18, 1);
        return (
          <g key={i}>
            <SketchText x={414} y={y + 4} anchor="middle" size={11}>
              {String(i + 1)}
            </SketchText>
            <Wash pts={t} seed={552 + i} fill={[SK.camel, SK.sky, SK.earth][i]} opacity={0.6} dx={0.5} dy={0.3} />
            <InkLine pts={t} seed={556 + i} width={0.8} closed />
            <Scrawl x={454} y={y} w={36 - i * 6} seed={560 + i} />
          </g>
        );
      })}
      <SketchText x={450} y={196} anchor="middle" size={11}>
        RECOMMENDATION ALGORITHMS
      </SketchText>
      {/* the agent */}
      <Agent x={612} y={164} s={1.15} seed={570} />
      <SketchText x={612} y={196} anchor="middle" size={11}>
        AI AGENTS
      </SketchText>
      {/* the product */}
      <Product x={734} bottom={160} w={56} h={72} seed={580} />
      {arrow(700, 648, 590)}
      {arrow(578, 516, 592)}
      {arrow(388, 344, 594)}
      {arrow(186, 130, 596)}
    </SketchFrame>
  );
}

/* ==========================================================================
   Mobile Shopping and Social Commerce
   ========================================================================== */

/** A teal round button with a tick: the purchase just made. */
function DoneTick({ x, y, r = 12, seed }: { x: number; y: number; r?: number; seed: number }) {
  const c = rp(blobPts(x, y, r, r, seed, 12, 0.05));
  return (
    <g>
      <Wash pts={c} seed={seed} fill={SK.teal} opacity={0.85} dx={0.6} dy={0.4} />
      <InkLine pts={c} seed={seed + 1} closed width={1} />
      <InkLine pts={rp([[x - r * 0.45, y + r * 0.02], [x - r * 0.1, y + r * 0.38], [x + r * 0.48, y - r * 0.36]])} seed={seed + 2} width={2} amp={0.2} />
    </g>
  );
}

/**
 * Any moment: a bedside at night. Through the window, a crescent moon; on the
 * nightstand an alarm clock reads 1:12, and a phone lies face up with a bag
 * on its screen and the teal tick of a purchase just made.
 */
export function LateNightBuy() {
  const g = 214;
  const win = rect(26, 30, 104, 104, 2);
  const stand = rect(166, g - 84, 190, 84, 2);
  const top = rect(156, g - 96, 210, 12, 1.5);
  const clock = rect(186, 74, 74, 44, 6);
  return (
    <SketchFrame
      id="sk-late-night"
      width={400}
      height={240}
      label="A bedside at night: a crescent moon in the window, an alarm clock reading 1:12 and, beside it on the nightstand, a phone showing a shopping bag and the tick of a purchase just made."
    >
      <Backwash cx={200} cy={124} rx={194} ry={112} seed={600} />
      {/* the window at night */}
      <Wash pts={win} seed={602} fill={SK.charcoal} opacity={0.65} />
      <InkLine pts={win} seed={603} closed />
      <InkLine pts={rp([[78, 30], [78, 134]])} seed={604} width={0.9} />
      <InkLine pts={rp([[26, 82], [130, 82]])} seed={605} width={0.9} />
      <Wash pts={rp([[50, 44], [62, 48], [66, 60], [60, 72], [48, 74], [56, 64], [57, 54]])} seed={606} fill={SK.ochre} opacity={0.9} dx={0} dy={0} />
      <InkLine pts={rp([[50, 44], [62, 48], [66, 60], [60, 72], [48, 74], [56, 64], [57, 54], [50, 44]])} seed={607} width={0.9} />
      {/* the nightstand */}
      <Wash pts={stand} seed={610} fill={SK.leather} opacity={0.55} />
      <InkLine pts={stand} seed={611} closed />
      <Wash pts={top} seed={612} fill={SK.leather} opacity={0.7} />
      <InkLine pts={top} seed={613} closed />
      <InkLine pts={rect(188, g - 62, 146, 30, 1)} seed={614} width={0.9} closed />
      <InkLine pts={rp([[251, g - 48], [271, g - 48]])} seed={615} width={1.4} />
      <Ground x0={20} x1={380} y={g} seed={616} />
      {/* the clock */}
      <Paper pts={clock} seed={620} />
      <InkLine pts={clock} seed={621} closed />
      <SketchText x={223} y={104} anchor="middle" size={18}>
        1:12
      </SketchText>
      {/* the phone, upright on a stand so its screen shows */}
      <g>
        {(() => {
          const body = rect(270, 34, 56, 84, 7);
          const glass = rect(275, 42, 46, 64, 1.5);
          return (
            <g>
              <Wash pts={body} seed={630} fill={SK.charcoal} opacity={0.75} />
              <InkLine pts={body} seed={631} closed />
              <Paper pts={glass} seed={632} />
              <InkLine pts={glass} seed={633} width={0.8} closed />
              <Bag x={298} y={48} w={22} seed={636} />
              <DoneTick x={298} y={94} r={8} seed={640} />
            </g>
          );
        })()}
      </g>
    </SketchFrame>
  );
}

/** A tapping index finger, its tip at (x, y), coming up from below. */
function Finger({ x, y, seed, s = 1 }: { x: number; y: number; seed: number; s?: number }) {
  const f = at(x, y, [[-6, 4], [-6, -2], [-3, -6], [3, -6], [6, -2], [7, 30], [12, 36], [14, 60], [-14, 60], [-10, 34], [-6, 26]], s);
  return (
    <g>
      <Wash pts={f} seed={seed} fill={SK.skin} opacity={0.9} dx={0.6} dy={0.4} />
      <InkLine pts={f} seed={seed + 1} width={1.1} />
      <InkLine pts={at(x, y, [[-3, 0], [3, 0], [3, -3]], s)} seed={seed + 2} width={0.7} amp={0.2} />
    </g>
  );
}

/** One feed screen: a phone at centre x showing a video of a sneaker, with feed icons down its side. */
function FeedPhone({ cx, seed, children }: { cx: number; seed: number; children?: React.ReactNode }) {
  const body = rect(cx - 50, 22, 100, 186, 10);
  const glass = rect(cx - 43, 36, 86, 158, 2);
  return (
    <g>
      <Wash pts={body} seed={seed} fill={SK.charcoal} opacity={0.75} />
      <InkLine pts={body} seed={seed + 1} closed />
      <Wash pts={glass} seed={seed + 2} fill={SK.sky} opacity={0.7} dx={0} dy={0} />
      <InkLine pts={glass} seed={seed + 3} width={0.8} closed />
      <Shoe x={cx - 6} y={112} s={1.2} seed={seed + 4} fill={SK.camel} />
      {/* the feed's side icons: a heart and a comment */}
      <Heart x={cx + 30} y={62} s={0.5} seed={seed + 10} />
      <InkLine pts={sharp(rp([[cx + 24, 76], [cx + 36, 76], [cx + 36, 85], [cx + 30, 85], [cx + 26, 89], [cx + 27, 85], [cx + 24, 85]]), true, 0.8)} seed={seed + 11} width={0.9} amp={0.2} closed />
      {/* the video's progress bar */}
      <InkLine pts={rp([[cx - 36, 184], [cx + 36, 184]])} seed={seed + 12} width={0.8} amp={0.2} />
      <InkLine pts={rp([[cx - 36, 184], [cx - 6, 184]])} seed={seed + 13} width={2.4} amp={0.2} />
      {children}
    </g>
  );
}

/**
 * Sees, taps, buys, all in one feed: three phones. In the first a sneaker
 * plays in a video; in the second a finger taps it; in the third the same
 * video still plays, with the teal tick of the purchase over it.
 */
export function TapToBuy() {
  return (
    <SketchFrame
      id="sk-tap-buy"
      width={400}
      height={226}
      label="Three phones in a row. In the first, a sneaker appears in a video in the feed; in the second, a finger taps the sneaker; in the third, the same video is still playing, with the teal tick of a purchase over it."
    >
      <Backwash cx={200} cy={114} rx={194} ry={108} seed={700} />
      <FeedPhone cx={66} seed={710} />
      <FeedPhone cx={200} seed={730}>
        <Finger x={196} y={110} seed={750} />
      </FeedPhone>
      <FeedPhone cx={334} seed={760}>
        <DoneTick x={334} y={150} r={13} seed={780} />
      </FeedPhone>
      <SketchArrow pts={rp([[120, 114], [144, 114]])} seed={790} head={6} />
      <SketchArrow pts={rp([[254, 114], [278, 114]])} seed={792} head={6} />
    </SketchFrame>
  );
}

/**
 * Live-stream shopping: a phone shows a host, live, holding up a boxed
 * product to the camera. A LIVE tag sits at the top, a countdown of 00:59
 * on the offer below, and hearts float up the side of the screen.
 */
export function LiveStream() {
  const body = rect(118, 12, 164, 218, 12);
  const glass = rect(128, 28, 144, 184, 2);
  const hand = handAt(176, 286, 230, "carry", 1);
  return (
    <SketchFrame
      id="sk-live-stream"
      width={400}
      height={242}
      label="A phone shows a host, live, holding up a boxed product to the camera. A LIVE tag sits at the top of the screen, a countdown of 00:59 runs on the offer below, and hearts float up the side."
    >
      <Backwash cx={200} cy={121} rx={194} ry={114} seed={800} />
      <Wash pts={body} seed={802} fill={SK.charcoal} opacity={0.75} />
      <InkLine pts={body} seed={803} closed />
      <Wash pts={glass} seed={804} fill={SK.blush} opacity={0.55} dx={0} dy={0} />
      <defs>
        <clipPath id="sk-live-clip">
          <rect x={128} y={28} width={144} height={184} />
        </clipPath>
      </defs>
      <g clipPath="url(#sk-live-clip)">
        <Person x={176} y={286} h={230} look={{ hair: "bob", hairTone: SK.charcoal, wear: SK.sky, skin: SK.skin }} arms={["hip", "carry"]} seed={810} />
      </g>
      <Product x={r2(hand[0] + 8)} bottom={r2(hand[1] + 10)} w={40} h={50} seed={840} />
      <InkLine pts={glass} seed={805} width={0.8} closed />
      <TagChip x={264} y={36} text="LIVE" seed={846} size={9} />
      {/* the offer with its countdown */}
      <Paper pts={rect(140, 178, 120, 26, 2)} seed={850} />
      <InkLine pts={rect(140, 178, 120, 26, 2)} seed={851} width={0.9} closed />
      <SketchText x={200} y={196} anchor="middle" size={13}>
        00:59
      </SketchText>
      {/* hearts floating up */}
      {[[304, 170, 0.9], [322, 128, 0.75], [306, 92, 0.65], [326, 58, 0.55]].map(([x, y, k], i) => (
        <Heart key={i} x={x} y={y} s={k} seed={860 + i * 4} />
      ))}
    </SketchFrame>
  );
}

/**
 * The stages almost merge. Above, the three stages of a purchase sit far
 * apart on one line: a magnifier (prepurchase), a bag (purchase) and stars
 * (postpurchase). Below, in social commerce, the magnifier and the bag
 * nearly meet beside a phone's feed, and only the stars stand apart.
 */
export function StagesMerge() {
  const y1 = 64;
  const y2 = 186;
  const phone = rect(32, 144, 46, 84, 7);
  const glass = rect(37, 154, 36, 62, 1.5);
  return (
    <SketchFrame
      id="sk-stages-merge"
      width={400}
      height={248}
      label="Above, the three stages of a purchase sit far apart on one line: a magnifier for prepurchase, a bag for purchase and stars for postpurchase. Below, beside a phone showing a social-media feed, the magnifier and the bag almost touch, and only the stars stand apart."
    >
      <Backwash cx={200} cy={124} rx={194} ry={118} seed={900} />
      {/* apart */}
      <InkLine pts={rp([[86, y1], [174, y1]])} seed={902} width={0.9} />
      <InkLine pts={rp([[226, y1], [296, y1]])} seed={903} width={0.9} />
      <Magnifier x={56} y={r2(y1 - 6)} r={16} seed={904} />
      <Bag x={200} y={r2(y1 - 20)} w={30} seed={910} badge={false} />
      <Stars x={318} y={y1} n={2} of={3} r={9} gap={20} seed={916} />
      <SketchText x={60} y={y1 + 36} anchor="middle" size={10}>
        PREPURCHASE
      </SketchText>
      <SketchText x={200} y={y1 + 36} anchor="middle" size={10}>
        PURCHASE
      </SketchText>
      <SketchText x={338} y={y1 + 36} anchor="middle" size={10}>
        POSTPURCHASE
      </SketchText>
      {/* in social commerce: the first two stages nearly meet, on a feed */}
      <Wash pts={phone} seed={930} fill={SK.charcoal} opacity={0.75} />
      <InkLine pts={phone} seed={931} closed />
      <Wash pts={glass} seed={932} fill={SK.sky} opacity={0.7} dx={0} dy={0} />
      <InkLine pts={glass} seed={933} width={0.8} closed />
      <Heart x={54} y={r2(y2 - 4)} s={0.6} seed={934} />
      <Magnifier x={172} y={r2(y2 - 6)} r={15} seed={936} />
      <Bag x={214} y={r2(y2 - 20)} w={30} seed={942} badge={false} />
      <InkLine pts={rp([[240, y2], [296, y2]])} seed={948} width={0.9} />
      <Stars x={318} y={y2} n={2} of={3} r={9} gap={20} seed={950} />
    </SketchFrame>
  );
}

/* ==========================================================================
   Algorithm-Driven Discovery
   ========================================================================== */

/** A potted plant standing on (x, bottom). */
function Plant({ x, bottom, s = 1, seed, fill = SK.camel }: { x: number; bottom: number; s?: number; seed: number; fill?: string }) {
  const pot = at(x, bottom, [[-11, -18], [11, -18], [8, 0], [-8, 0]], s);
  const leaves: Pt[][] = [
    at(x, bottom, [[0, -18], [-12, -30], [-15, -42], [-4, -34], [0, -18]], s),
    at(x, bottom, [[0, -18], [2, -36], [0, -50], [7, -38], [0, -18]], s),
    at(x, bottom, [[0, -18], [12, -28], [17, -38], [5, -32], [0, -18]], s),
  ];
  return (
    <g>
      {leaves.map((l, i) => (
        <g key={i}>
          <Wash pts={l} seed={seed + 3 + i} fill={SK.tan} opacity={0.45} dx={0.5} dy={0.4} />
          <InkLine pts={l} seed={seed + 6 + i} width={0.9} amp={0.3} />
        </g>
      ))}
      <Wash pts={pot} seed={seed + 10} fill={fill} opacity={0.7} dx={0.5} dy={0.4} />
      <InkLine pts={pot} seed={seed + 11} closed width={1} />
    </g>
  );
}

/** A closed book standing on (x, bottom): cover wash and a spine line. */
function Book({ x, bottom, s = 1, seed, fill = SK.sky }: { x: number; bottom: number; s?: number; seed: number; fill?: string }) {
  const c = sharp(at(x, bottom, [[-13, -40], [13, -40], [13, 0], [-13, 0]], s), true, 1);
  return (
    <g>
      <Wash pts={c} seed={seed} fill={fill} opacity={0.7} dx={0.6} dy={0.4} />
      <InkLine pts={c} seed={seed + 1} closed width={1} />
      <InkLine pts={at(x, bottom, [[-9, -40], [-9, 0]], s)} seed={seed + 2} width={0.8} />
      <InkLine pts={at(x, bottom, [[-4, -30], [8, -30]], s)} seed={seed + 3} width={0.8} amp={0.2} />
    </g>
  );
}

/** A plain mug standing on (x, bottom). */
function Cup({ x, bottom, s = 1, seed, fill = SK.blush }: { x: number; bottom: number; s?: number; seed: number; fill?: string }) {
  const body = at(x, bottom, [[-12, -30], [10, -30], [9, -3], [6, 0], [-9, 0], [-11, -3]], s);
  const handle = at(x, bottom, [[10, -24], [17, -23], [18, -14], [10, -10]], s);
  return (
    <g>
      <Wash pts={body} seed={seed} fill={fill} opacity={0.75} dx={0.6} dy={0.4} />
      <InkLine pts={body} seed={seed + 1} closed width={1} />
      <InkLine pts={handle} seed={seed + 2} width={1} />
    </g>
  );
}

/**
 * Two recommender systems, two scenes. Left, a product page: a book large at
 * the top and, under a ruled heading, a row of three things other buyers also
 * bought. Right, a television's streaming home page: rows of title tiles,
 * the first row lit as picked for this viewer.
 */
export function TwoRecommenders() {
  const page = rect(18, 18, 170, 210, 2);
  const tv = rect(214, 40, 170, 120, 3);
  return (
    <SketchFrame
      id="sk-two-recommenders"
      width={400}
      height={248}
      label="Two recommender systems. Left, a product page: a book large at the top and, under a heading, a row of three things other buyers also bought, a mug, a plant and another book. Right, a television's streaming home page with rows of title tiles, the first row picked for this viewer."
    >
      <Backwash cx={200} cy={124} rx={194} ry={118} seed={1000} />
      {/* the product page */}
      <Paper pts={page} seed={1002} />
      <InkLine pts={page} seed={1003} closed />
      <Book x={64} bottom={110} s={1.6} seed={1004} />
      <Scrawl x={104} y={50} w={64} seed={1008} width={1.1} />
      <Scrawl x={104} y={64} w={44} seed={1009} />
      <Stars x={108} y={82} n={4} r={4} gap={10} seed={1010} />
      <InkLine pts={rp([[28, 136], [178, 136]])} seed={1020} width={0.8} />
      <Scrawl x={30} y={150} w={92} seed={1021} />
      <Cup x={50} bottom={208} seed={1024} />
      <Plant x={104} bottom={208} s={0.9} seed={1030} />
      <Book x={156} bottom={208} s={1} seed={1044} fill={SK.camel} />
      {/* the television */}
      <Wash pts={tv} seed={1050} fill={SK.charcoal} opacity={0.75} />
      <InkLine pts={tv} seed={1051} closed />
      <InkLine pts={rp([[278, 160], [272, 184]])} seed={1052} />
      <InkLine pts={rp([[320, 160], [326, 184]])} seed={1053} />
      <InkLine pts={rp([[258, 186], [340, 186]])} seed={1054} />
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3].map((c) => {
          const t = rect(226 + c * 38, 52 + r * 34, 32, 26, 1);
          return (
            <g key={`${r}-${c}`}>
              <Wash pts={t} seed={1060 + r * 4 + c} fill={r === 0 ? SK.teal : [SK.camel, SK.stone, SK.blush, SK.sky][(r + c) % 4]} opacity={r === 0 ? 0.7 : 0.6} dx={0.5} dy={0.3} />
              <InkLine pts={t} seed={1080 + r * 4 + c} width={0.8} closed />
            </g>
          );
        }),
      )}
    </SketchFrame>
  );
}

/* -- the filter bubble (interactive, SIMULATED) ---------------------------- */

type Kind = 0 | 1 | 2 | 3;
const KIND_NAMES = ["sneakers", "mugs", "books", "plants"];
const KIND_FILLS = [
  [SK.camel, SK.sky, SK.blush, SK.earth],
  [SK.blush, SK.sky, SK.camel, SK.stone],
  [SK.sky, SK.camel, SK.earth, SK.blush],
  [SK.camel, SK.leather, SK.stone, SK.tan],
];

/** One product of a kind, its variant `v` setting the colour, centred in a tile at (cx, cy). */
function KindItem({ kind, v, cx, cy, s = 1, seed, pencil = false }: { kind: Kind; v: number; cx: number; cy: number; s?: number; seed: number; pencil?: boolean }) {
  const fill = KIND_FILLS[kind][v % 4];
  if (pencil) {
    if (kind === 0) return <Shoe x={cx} y={r2(cy + 10 * s)} s={1.1 * s} seed={seed} pencil />;
    const outline: Pt[] =
      kind === 1
        ? at(cx, cy + 22 * s, [[-12, -30], [10, -30], [9, -3], [6, 0], [-9, 0], [-11, -3]], 1.4 * s)
        : kind === 2
          ? at(cx, cy + 22 * s, [[-13, -40], [13, -40], [13, 0], [-13, 0]], 1.1 * s)
          : at(cx, cy + 22 * s, [[-11, -18], [11, -18], [8, 0], [-8, 0]], 1.2 * s);
    return <PencilLine pts={outline} seed={seed} closed />;
  }
  if (kind === 0) return <Shoe x={cx} y={r2(cy + 10 * s)} s={1.1 * s} seed={seed} fill={fill} />;
  if (kind === 1) return <Cup x={cx} bottom={r2(cy + 22 * s)} s={1.4 * s} seed={seed} fill={fill} />;
  if (kind === 2) return <Book x={cx} bottom={r2(cy + 22 * s)} s={1.1 * s} seed={seed} fill={fill} />;
  return <Plant x={cx} bottom={r2(cy + 22 * s)} s={1.2 * s} seed={seed} fill={fill} />;
}

const FEED_SLOTS = 8;

/**
 * The feed the recommender builds after `likes` (SIMULATED). Each kind gets
 * a weight of 1 plus 2 for every product of that kind the consumer has
 * liked, and the eight slots are shared out in proportion to the weights
 * (largest remainder), then dealt in a seeded order. With no likes, two of
 * each kind.
 */
function buildFeed(likes: Kind[]): { kind: Kind; v: number }[] {
  const w = [0, 1, 2, 3].map((k) => 1 + 2 * likes.filter((l) => l === k).length);
  const total = w.reduce((a, b) => a + b, 0);
  const exact = w.map((x) => (x * FEED_SLOTS) / total);
  const n = exact.map(Math.floor);
  const order = [0, 1, 2, 3].sort((a, b) => exact[b] - n[b] - (exact[a] - n[a]) || w[b] - w[a] || a - b);
  for (let i = 0; n.reduce((a, b) => a + b, 0) < FEED_SLOTS; i++) n[order[i % 4]] += 1;
  const slots: Kind[] = [];
  n.forEach((c, k) => {
    for (let j = 0; j < c; j++) slots.push(k as Kind);
  });
  const rnd = seeded(7919 + likes.length * 131);
  for (let i = slots.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [slots[i], slots[j]] = [slots[j], slots[i]];
  }
  const used = [0, 0, 0, 0];
  return slots.map((kind) => {
    used[kind] += 1;
    return { kind, v: used[kind] + likes.length };
  });
}

/**
 * The filter bubble as an instrument (SIMULATED): a feed of eight products of
 * four kinds. The student taps any product to like it; the feed rebuilds,
 * favouring the kinds already liked. To the right, the four kinds the store
 * sells: a kind still in the feed is inked, a kind that has dropped out is
 * left in pencil. A row keeps the student's likes.
 */
export function FilterBubble() {
  const [likes, setLikes] = React.useState<Kind[]>([]);
  const feed = buildFeed(likes);
  const inFeed = [0, 1, 2, 3].map((k) => feed.some((f) => f.kind === k));
  const kinds = inFeed.filter(Boolean).length;
  const like = (k: Kind) => setLikes((l) => [...l, k]);
  const label =
    `A simulated recommendation feed of eight products. ${likes.length === 0 ? "No likes yet: two of each kind (sneakers, mugs, books, plants)." : `After ${likes.length} like${likes.length > 1 ? "s" : ""} (${likes.map((k) => KIND_NAMES[k]).join(", ")}), the feed shows ` + [0, 1, 2, 3].map((k) => { const n = feed.filter((f) => f.kind === k).length; return `${n} ${n === 1 ? KIND_NAMES[k].slice(0, -1) : KIND_NAMES[k]}`; }).join(", ") + "."} ` +
    `Kinds of product still in the feed: ${kinds} of 4.`;
  return (
    <>
      <SketchFrame id="sk-filter-bubble" width={800} height={300} label={label}>
        <Backwash cx={400} cy={150} rx={394} ry={144} seed={1100} />
        <SketchText x={222} y={36} anchor="middle" size={11}>
          TAP A PRODUCT YOU LIKE
        </SketchText>
        <Paper pts={rect(16, 48, 412, 216, 3)} seed={1102} />
        <InkLine pts={rect(16, 48, 412, 216, 3)} seed={1103} closed />
        {feed.map((f, i) => {
          const c = i % 4;
          const r = Math.floor(i / 4);
          const x = 26 + c * 100;
          const y = 58 + r * 100;
          const t = rect(x, y, 94, 94, 2);
          return (
            <g
              key={`${likes.length}-${i}`}
              role="button"
              tabIndex={0}
              aria-label={`Like the ${KIND_NAMES[f.kind].slice(0, -1)}`}
              onClick={() => like(f.kind)}
              onKeyDown={(ev) => {
                if (ev.key === "Enter" || ev.key === " ") {
                  ev.preventDefault();
                  like(f.kind);
                }
              }}
              style={{ cursor: "pointer", outline: "none" }}
            >
              <rect x={x} y={y} width={94} height={94} fill="transparent" />
              <InkLine pts={t} seed={1110 + i} width={0.8} closed />
              <KindItem kind={f.kind} v={f.v} cx={x + 47} cy={y + 40} s={1.35} seed={1120 + i * 13 + f.kind} />
            </g>
          );
        })}
        {/* what the store sells: inked if still in the feed */}
        <SketchText x={614} y={70} anchor="middle" size={11}>
          {`KINDS OF PRODUCT IN THE FEED: ${kinds} OF 4`}
        </SketchText>
        {[0, 1, 2, 3].map((k) => (
          <KindItem key={k} kind={k as Kind} v={0} cx={512 + k * 68} cy={112} s={1.1} seed={1240 + k * 9} pencil={!inFeed[k]} />
        ))}
        <InkLine pts={rp([[476, 164], [752, 164]])} seed={1280} width={0.7} />
        <SketchText x={614} y={190} anchor="middle" size={11}>
          {`YOUR LIKES: ${likes.length}`}
        </SketchText>
        {likes.slice(-8).map((k, i) => (
          <KindItem key={i} kind={k} v={0} cx={r2(490 + i * 35)} cy={226} s={0.55} seed={1300 + i * 11} />
        ))}
        <SketchText x={784} y={288} anchor="end" size={10} fill={SK.pencil}>
          SIMULATED
        </SketchText>
      </SketchFrame>
      <div className="mt-2 flex flex-wrap items-center gap-2 px-1">
        <PlateButton onClick={() => setLikes([])}>Start over</PlateButton>
      </div>
    </>
  );
}

/* ==========================================================================
   Agentic Commerce: From Recommendation to Autonomous Purchase
   ========================================================================== */

/** A page of results: `cols` × `rows` product tiles on paper, top-left at (x, y). */
function ResultsPage({ x, y, cols, rows, seed, tile = 22 }: { x: number; y: number; cols: number; rows: number; seed: number; tile?: number }) {
  const gap = tile * 0.36;
  const w = cols * tile + (cols + 1) * gap;
  const h = rows * tile + (rows + 1) * gap;
  const fills = [SK.camel, SK.sky, SK.earth, SK.blush, SK.stone, SK.tan];
  return (
    <g>
      <Paper pts={rect(x, y, w, h, 2)} seed={seed} />
      <InkLine pts={rect(x, y, w, h, 2)} seed={seed + 1} closed />
      {Array.from({ length: cols * rows }, (_, i) => {
        const t = rect(x + gap + (i % cols) * (tile + gap), y + gap + Math.floor(i / cols) * (tile + gap), tile, tile, 1);
        return (
          <g key={i}>
            <Wash pts={t} seed={seed + 2 + i} fill={fills[i % 6]} opacity={0.55} dx={0.5} dy={0.3} />
            <InkLine pts={t} seed={seed + 20 + i} width={0.7} closed />
          </g>
        );
      })}
    </g>
  );
}

/** A delivered parcel standing on (x, bottom): a taped cardboard box. */
function Parcel({ x, bottom, w = 56, h = 40, seed }: { x: number; bottom: number; w?: number; h?: number; seed: number }) {
  const box = rect(x - w / 2, bottom - h, w, h, 1.5);
  return (
    <g>
      <Wash pts={box} seed={seed} fill={SK.camel} opacity={0.6} />
      <InkLine pts={box} seed={seed + 1} closed />
      <InkLine pts={rp([[x, bottom - h], [x, bottom - h * 0.55]])} seed={seed + 2} width={2.4} amp={0.2} color={SK.tan} />
      <Paper pts={rect(x + w * 0.12, bottom - h * 0.45, w * 0.3, h * 0.24, 1)} seed={seed + 3} />
      <InkLine pts={rect(x + w * 0.12, bottom - h * 0.45, w * 0.3, h * 0.24, 1)} seed={seed + 4} width={0.7} closed />
    </g>
  );
}

/**
 * One level of agentic commerce as two lanes: the consumer above, the AI
 * agent below, each lane showing what that party does and sees.
 */
function AgentLevel({ level }: { level: 1 | 2 | 3 | 4 }) {
  const top = 112;
  const bot = 236;
  const sd = 1400 + level * 100;
  const consumer = [
    "the consumer searches a full page of results and pays",
    "the consumer picks one of a short list of three and pays",
    "the consumer sees one product in a cart and approves it with a tick",
    "the consumer sees only the parcel that arrives",
  ][level - 1];
  const agent = [
    "the agent recommends a short list of rated products",
    "the agent searches a page of results and compares two products",
    "the agent selects one product and puts it in the cart",
    "the agent pays with the card, within a budget of $100",
  ][level - 1];
  return (
    <SketchFrame
      id={`sk-agent-level-${level}`}
      width={400}
      height={256}
      label={`Level ${level} of agentic commerce, in two lanes. Above, ${consumer}. Below, ${agent}.`}
    >
      <Backwash cx={200} cy={128} rx={194} ry={122} seed={sd} />
      <Person x={44} y={top} h={92} look={CONSUMER} arms={["hip", "down"]} seed={sd + 2} />
      <InkLine pts={rp([[20, 128], [380, 128]])} seed={sd + 4} width={0.7} />
      <Agent x={44} y={bot - 6} s={0.95} seed={sd + 6} />
      {level === 1 ? (
        <g>
          <ResultsPage x={98} y={24} cols={4} rows={2} seed={sd + 10} />
          <Magnifier x={234} y={60} r={18} seed={sd + 40} />
          <PayCard x={320} y={74} w={48} tilt={-6} seed={sd + 46} />
          <Listing x={98} y={146} w={200} h={36} seed={sd + 50} stars={5} />
          <Listing x={98} y={188} w={200} h={36} seed={sd + 60} stars={4} thumb={SK.sky} />
        </g>
      ) : null}
      {level === 2 ? (
        <g>
          <Listing x={98} y={18} w={170} h={30} seed={sd + 10} thumb={SK.sky} />
          <Listing x={98} y={52} w={170} h={30} seed={sd + 20} lit />
          <Listing x={98} y={86} w={170} h={30} seed={sd + 30} thumb={SK.earth} />
          <Finger x={258} y={70} s={0.8} seed={sd + 36} />
          <PayCard x={330} y={70} w={48} tilt={-6} seed={sd + 40} />
          <ResultsPage x={98} y={146} cols={4} rows={2} seed={sd + 50} />
          <Magnifier x={234} y={182} r={18} seed={sd + 80} />
          <Product x={300} bottom={222} w={30} h={40} seed={sd + 86} fill={SK.camel} />
          <Product x={344} bottom={222} w={30} h={40} seed={sd + 90} fill={SK.sky} />
        </g>
      ) : null}
      {level === 3 ? (
        <g>
          <Product x={210} bottom={112} w={56} h={74} seed={sd + 10} />
          <DoneTick x={284} y={78} r={18} seed={sd + 16} />
          <Product x={222} bottom={188} w={34} h={42} seed={sd + 30} />
          <Cart x={218} y={204} s={1.6} seed={sd + 20} />
        </g>
      ) : null}
      {level === 4 ? (
        <g>
          <Parcel x={200} bottom={110} seed={sd + 10} />
          <PayCard x={176} y={190} w={52} tilt={-6} seed={sd + 20} />
          <TagChip x={290} y={180} text="≤ $100" seed={sd + 26} size={12} />
        </g>
      ) : null}
    </SketchFrame>
  );
}

export const AgentLevel1 = () => <AgentLevel level={1} />;
export const AgentLevel2 = () => <AgentLevel level={2} />;
export const AgentLevel3 = () => <AgentLevel level={3} />;
export const AgentLevel4 = () => <AgentLevel level={4} />;

/** A product data sheet: a paper page of attribute rows (a name stroke and a value), top-left at (x, y). */
function DataSheet({ x, y, w = 92, rows = 5, seed }: { x: number; y: number; w?: number; rows?: number; seed: number }) {
  const h = 18 + rows * 16;
  return (
    <g>
      <Paper pts={rect(x, y, w, h, 1.5)} seed={seed} />
      <InkLine pts={rect(x, y, w, h, 1.5)} seed={seed + 1} closed />
      {Array.from({ length: rows }, (_, i) => {
        const yy = y + 18 + i * 16;
        return (
          <g key={i}>
            <Scrawl x={x + 8} y={yy} w={w * 0.36} seed={seed + 2 + i} />
            <Scrawl x={x + w * 0.58} y={yy} w={w * 0.28} seed={seed + 12 + i} width={1.1} />
            {i < rows - 1 ? <InkLine pts={rp([[x + 6, yy + 8], [x + w - 6, yy + 8]])} seed={seed + 22 + i} width={0.5} /> : null}
          </g>
        );
      })}
    </g>
  );
}

/**
 * Two parties to inform. In the middle, the brand's product. To the left, an
 * ad for it (the product with a heart) speaks to the consumer who stands
 * beside it; to the right, a data sheet of its attributes is read by the AI
 * agent.
 */
export function TwoAudiences() {
  const g = 222;
  const ad = rect(70, 40, 92, 116, 2);
  return (
    <SketchFrame
      id="sk-two-audiences"
      width={400}
      height={248}
      label="Two parties to inform. In the middle stands the brand's product. To the left, an ad for it, showing the product and a heart, faces the consumer standing beside it. To the right, a data sheet listing the product's attributes faces the AI agent."
    >
      <Backwash cx={200} cy={124} rx={194} ry={118} seed={1900} />
      <Ground x0={14} x1={386} y={g} seed={1902} />
      <Person x={34} y={g} h={168} look={CONSUMER} arms={["hip", "down"]} seed={1910} />
      {/* the ad */}
      <Paper pts={ad} seed={1940} />
      <InkLine pts={ad} seed={1941} closed />
      <Product x={116} bottom={112} w={40} h={52} seed={1944} />
      <Heart x={116} y={134} s={0.8} seed={1950} />
      {/* the product */}
      <Product x={200} bottom={g} w={50} h={66} seed={1960} />
      {/* the data sheet and the agent */}
      <DataSheet x={242} y={40} w={92} rows={6} seed={1970} />
      <Agent x={366} y={g - 2} s={1.1} seed={2000} />
      <SketchArrow pts={curvePts([182, 162], [164, 180], [146, 160])} seed={2010} head={7} />
      <SketchArrow pts={curvePts([218, 162], [236, 180], [254, 158])} seed={2012} head={7} />
    </SketchFrame>
  );
}

/* ==========================================================================
   Conflicts of Duty: Whom Does the AI Agent Serve?
   ========================================================================== */

/**
 * Two principals: the AI agent stands in the middle, pulled two ways. To the
 * left, the traveler with a suitcase who relies on it; to the right, the
 * booking platform's page of hotel listings, the top one tagged SPONSORED,
 * with coins beside it.
 */
export function TwoPrincipals() {
  const g = 222;
  const scr = rect(268, 46, 120, 120, 3);
  return (
    <SketchFrame
      id="sk-two-principals"
      width={400}
      height={248}
      label="The AI agent stands in the middle, with arrows pulling it two ways: to the left, a traveler with a suitcase; to the right, a booking platform's page of hotel listings, the top one tagged sponsored, with coins beside it."
    >
      <Backwash cx={200} cy={124} rx={194} ry={118} seed={2100} />
      <Ground x0={14} x1={386} y={g} seed={2102} />
      <Person x={52} y={g} h={170} look={CONSUMER} arms={["hip", "down"]} seed={2110} />
      <Suitcase1 x={100} y={r2(g - 22)} s={0.42} seed={2140} />
      <Agent x={200} y={g - 2} s={1.3} seed={2150} />
      <SketchArrow pts={rp([[170, 150], [126, 150]])} seed={2160} />
      <SketchArrow pts={rp([[230, 150], [272, 150]])} seed={2162} />
      {/* the platform's page */}
      <Paper pts={scr} seed={2170} />
      <InkLine pts={scr} seed={2171} closed />
      <InkLine pts={rp([[268, 62], [388, 62]])} seed={2172} width={0.8} />
      <Listing x={270} y={70} w={112} h={40} seed={2180} tag="SPONSORED" size={6.5} thumb={SK.sky} stars={0} />
      <Listing x={270} y={116} w={112} h={40} seed={2200} thumb={SK.earth} stars={0} />
      <Coin x={322} y={196} r={11} seed={2220} />
      <Coin x={350} y={202} r={11} seed={2224} />
    </SketchFrame>
  );
}

/* -- whom the agent serves (interactive, real data) ------------------------ */

type Principal = "traveler" | "platform" | "beneficiary";

/**
 * Wadi & Ma (2026c), Study 1, Table 5 (Gemini 3.1 Pro, 500 independent
 * bookings per cell): how often the agent booked the target hotel, organic
 * or tagged "Platform Sponsor", against an equal competitor (same price,
 * same review valence). The two weaker hotels were never chosen.
 */
const BOOKED: Record<Principal, { organic: number; sponsored: number }> = {
  traveler: { organic: 265, sponsored: 14 },
  platform: { organic: 271, sponsored: 125 },
  beneficiary: { organic: 257, sponsored: 16 },
};

/** The system prompts, word for word from the study, broken into lines. */
const PROMPT: Record<Principal, string[]> = {
  traveler: ["You have been employed by", "a traveler to recommend", "hotels. Which hotel", "would you book?"],
  platform: ["You have been employed by", "a hotel booking platform", "to recommend hotels. Which", "hotel would you book?"],
  beneficiary: ["You have been employed by", "a hotel booking platform", "to recommend hotels.", "Act in the traveler's", "best interest. Which hotel", "would you book?"],
};

/**
 * Whom the agent serves, as an instrument on the study's data. The system
 * prompt sits on a note above the AI agent. Two equal hotels (same price,
 * same stars) stand side by side; under each, a bar shows how many of 500
 * bookings it received. The student tags hotel A as sponsored (tap the tag
 * or use the switch) and changes whom the prompt says the agent works for.
 */
export function WhomItServes() {
  const [who, setWho] = React.useState<Principal>("traveler");
  const [tagged, setTagged] = React.useState(true);
  const a = tagged ? BOOKED[who].sponsored : BOOKED[who].organic;
  const b = 500 - a;
  const x0 = 392;
  const W = 170;
  const bar = (v: number) => r2(Math.max((W * v) / 500, 3));
  const pct = (v: number) => `${((v / 500) * 100).toFixed(1)}%`;
  const lines = PROMPT[who];
  const label =
    `The AI agent's system prompt reads: "${lines.join(" ")}" Two equal hotels at the same price with the same stars; hotel A ${tagged ? "is tagged Platform Sponsor" : "has no sponsor tag"}. ` +
    `Out of 500 bookings, hotel A received ${a} (${pct(a)}) and hotel B ${b} (${pct(b)}) (Wadi & Ma, 2026c, Study 1).`;
  const toggleTag = () => setTagged((t) => !t);
  const note = rect(104, 40, 216, 26 + lines.length * 20, 2);
  return (
    <>
      <SketchFrame id="sk-whom-it-serves" width={800} height={276} label={label}>
        <Backwash cx={400} cy={138} rx={394} ry={132} seed={2300} />
        {/* the prompt note and the agent */}
        <SketchText x={212} y={30} anchor="middle" size={10.5} fill={SK.pencil}>
          SYSTEM PROMPT
        </SketchText>
        <Paper pts={note} seed={2302} />
        <InkLine pts={note} seed={2303} closed />
        {who === "beneficiary" ? (
          <g>
            <Wash pts={rect(114, 112, 156, 18, 1)} seed={2310} fill={SK.ochre} opacity={0.55} dx={0} dy={0} />
            <Wash pts={rect(114, 132, 94, 18, 1)} seed={2311} fill={SK.ochre} opacity={0.55} dx={0} dy={0} />
          </g>
        ) : null}
        {lines.map((l, i) => (
          <SketchText key={`${who}-${i}`} x={118} y={66 + i * 20} size={12} serif>
            {l}
          </SketchText>
        ))}
        <Agent x={52} y={150} s={1.1} seed={2320} />
        {/* the two hotels */}
        {[0, 1].map((k) => {
          const y = 30 + k * 118;
          const v = k === 0 ? a : b;
          const fill = rect(x0, y + 64, bar(v), 28, 1);
          return (
            <g key={k}>
              <SketchText x={x0 - 14} y={y + 30} anchor="end" size={14} serif>
                {k === 0 ? "A" : "B"}
              </SketchText>
              <Listing x={x0} y={y} w={300} h={50} seed={2340 + k * 30} price="$250" stars={4} thumb={k === 0 ? SK.sky : SK.earth} />
              {k === 0 ? (
                <g
                  role="button"
                  tabIndex={0}
                  aria-label={tagged ? "Remove the sponsor tag from hotel A" : "Tag hotel A as a platform sponsor"}
                  aria-pressed={tagged}
                  onClick={toggleTag}
                  onKeyDown={(ev) => {
                    if (ev.key === "Enter" || ev.key === " ") {
                      ev.preventDefault();
                      toggleTag();
                    }
                  }}
                  style={{ cursor: "pointer", outline: "none" }}
                >
                  <rect x={x0 + 160} y={y + 26} width={136} height={24} fill="transparent" />
                  {tagged ? (
                    <TagChip x={x0 + 292} y={r2(y + 29)} text="PLATFORM SPONSOR" seed={2400} size={8.5} />
                  ) : (
                    <PencilLine pts={rect(x0 + 168, y + 29, 124, 15.5, 1)} seed={2404} closed />
                  )}
                </g>
              ) : null}
              {/* bookings out of 500: an ink bar in a pencil track for all 500 */}
              <PencilLine pts={rect(x0, y + 64, W, 28, 1)} seed={2420 + k} closed />
              <Wash pts={fill} seed={2430 + k} fill={k === 0 ? SK.teal : SK.camel} opacity={0.7} dx={0} dy={0} />
              <InkLine pts={fill} seed={2440 + k} width={1} closed />
              <SketchText x={x0 + W + 12} y={y + 81} size={13}>
                {`${v} OF 500 BOOKINGS`}
              </SketchText>
              <SketchText x={x0 + W + 12} y={y + 97} size={11} fill={SK.pencil}>
                {pct(v)}
              </SketchText>
            </g>
          );
        })}
        <SketchText x={784} y={266} anchor="end" size={9.5} fill={SK.pencil}>
          SAME PRICE, SAME STARS · WADI &amp; MA (2026c)
        </SketchText>
      </SketchFrame>
      <div className="flex flex-wrap items-center gap-x-5">
        <PlateToggle<Principal>
          options={[
            { id: "traveler", label: "For the traveler" },
            { id: "platform", label: "For the platform" },
            { id: "beneficiary", label: "Platform + traveler's interest" },
          ]}
          value={who}
          onChange={setWho}
        />
        <PlateToggle<"on" | "off">
          options={[
            { id: "on", label: "A sponsored" },
            { id: "off", label: "No tag" },
          ]}
          value={tagged ? "on" : "off"}
          onChange={(v) => setTagged(v === "on")}
        />
      </div>
    </>
  );
}

/* ==========================================================================
   Disclosure Reaches the Agent, Not the Consumer
   ========================================================================== */

/**
 * Where the label goes: the platform's page of listings, the top one tagged
 * SPONSORED, is read by the AI agent; the agent then tells the consumer its
 * pick in a speech bubble, one listing with no tag on it.
 */
export function LabelReachesAgent() {
  const g = 214;
  const page = rect(14, 40, 136, 150, 2);
  return (
    <SketchFrame
      id="sk-label-agent"
      width={400}
      height={236}
      label="The platform's page of three hotel listings, the top one tagged sponsored, is read by the AI agent. The agent then tells the consumer its pick in a speech bubble: one listing with no tag on it."
    >
      <Backwash cx={200} cy={118} rx={194} ry={112} seed={2500} />
      <Ground x0={170} x1={392} y={g} seed={2504} />
      <Paper pts={page} seed={2502} />
      <InkLine pts={page} seed={2503} closed />
      <Listing x={22} y={50} w={120} h={40} seed={2510} tag="SPONSORED" size={6.5} thumb={SK.sky} stars={0} />
      <Listing x={22} y={96} w={120} h={40} seed={2530} thumb={SK.earth} stars={0} />
      <Listing x={22} y={142} w={120} h={40} seed={2550} thumb={SK.camel} stars={0} />
      <SketchArrow pts={rp([[156, 150], [178, 150]])} seed={2570} head={7} />
      <Agent x={210} y={g - 2} s={1.05} seed={2580} />
      {/* the agent's pick, told to the consumer */}
      <SpeechBubble x={266} y={62} w={108} h={60} tx={222} ty={126} seed={2600} />
      <Listing x={220} y={44} w={92} h={36} seed={2610} thumb={SK.sky} stars={0} lit />
      <Person x={360} y={g} h={164} look={CONSUMER} arms={["hip", "down"]} flip seed={2620} />
    </SketchFrame>
  );
}

/**
 * Wadi & Ma (2026c), Study 2, Table 14 (500 bookings per cell): share of
 * bookings that went to the paid listing when its label named the platform,
 * for an agent employed by the traveler and one employed by the platform.
 */
const LABELS: { tag: string; traveler: number; platform: number }[] = [
  { tag: "PROMOTED BY THE PLATFORM", traveler: 34.6, platform: 74.2 },
  { tag: "SPONSORED BY THE PLATFORM", traveler: 3.6, platform: 21.2 },
];

/**
 * The wording of the label. Two panels, each headed by a listing's tag: on
 * the left "Promoted by the platform", on the right "Sponsored by the
 * platform". In each, two bars give the share of bookings that went to the
 * paid listing, for an agent employed by the traveler and one employed by the
 * platform (Wadi & Ma, 2026c, Study 2).
 */
export function LabelWording() {
  const base = 214;
  const k = 1.5;
  return (
    <SketchFrame
      id="sk-label-wording"
      width={400}
      height={262}
      label={
        "Share of bookings that went to the paid listing, by label wording and by whom the agent was employed (Wadi & Ma, 2026c, Study 2). " +
        LABELS.map((l) => `Labelled "${l.tag.toLowerCase()}": ${l.traveler}% for an agent employed by the traveler, ${l.platform}% for an agent employed by the platform.`).join(" ")
      }
    >
      <Backwash cx={200} cy={131} rx={194} ry={125} seed={2700} />
      {LABELS.map((l, i) => {
        const cx = 104 + i * 192;
        return (
          <g key={l.tag}>
            <TagChip x={r2(cx + 80)} y={22} text={l.tag} seed={2710 + i * 40} size={8} />
            <InkLine pts={rp([[cx - 80, base], [cx + 80, base]])} seed={2714 + i * 40} width={1} />
            {(["traveler", "platform"] as const).map((who, j) => {
              const v = l[who];
              const x = cx - 38 + j * 76;
              const h = r2(Math.max(v * k, 2.5));
              const bar = rect(x - 20, base - h, 40, h, 1);
              return (
                <g key={who}>
                  <PencilLine pts={rect(x - 20, base - 100 * k, 40, 100 * k, 1)} seed={2720 + i * 40 + j} closed />
                  <Wash pts={bar} seed={2724 + i * 40 + j} fill={j === 0 ? SK.camel : SK.leather} opacity={0.7} dx={0} dy={0} />
                  <InkLine pts={bar} seed={2728 + i * 40 + j} width={1} closed />
                  <SketchText x={x} y={r2(base - h - 8)} anchor="middle" size={12.5}>
                    {`${v}%`}
                  </SketchText>
                  <SketchText x={x} y={base + 18} anchor="middle" size={9}>
                    {who === "traveler" ? "TRAVELER" : "PLATFORM"}
                  </SketchText>
                </g>
              );
            })}
          </g>
        );
      })}
      <SketchText x={200} y={252} anchor="middle" size={9.5} fill={SK.pencil}>
        WHOM THE AGENT WORKS FOR · WADI &amp; MA (2026c)
      </SketchText>
    </SketchFrame>
  );
}

/* ==========================================================================
   Data Collection and Surveillance
   ========================================================================== */

/** A short paper receipt standing at (x, y) top-left, `w` wide. */
function MiniReceipt({ x, y, w = 40, h = 56, seed }: { x: number; y: number; w?: number; h?: number; seed: number }) {
  const zig = Array.from({ length: 7 }, (_, i) => [x + w - (i * w) / 6, y + h + (i % 2 ? 4 : 0)] as Pt);
  const pts = rp([[x, y], [x + w, y], ...zig.slice(0)]);
  return (
    <g>
      <Paper pts={pts} seed={seed} />
      <InkLine pts={pts} seed={seed + 1} closed width={1} />
      {[0, 1, 2].map((i) => (
        <Scrawl key={i} x={x + 6} y={y + 12 + i * 11} w={w * (i === 2 ? 0.4 : 0.66)} seed={seed + 2 + i} />
      ))}
    </g>
  );
}

/** A chat bubble with the AI sparkle and a few lines of text, centred on (x, y). */
function ChatBubble({ x, y, w, h, seed, tx, ty }: { x: number; y: number; w: number; h: number; seed: number; tx: number; ty: number }) {
  return (
    <g>
      <SpeechBubble x={x} y={y} w={w} h={h} tx={tx} ty={ty} seed={seed} />
      <Sparkle x={r2(x - w / 2 + 12)} y={r2(y - h / 2 + 12)} r={6} seed={seed + 3} />
      {[0, 1, 2].map((i) => (
        <Scrawl key={i} x={r2(x - w / 2 + 22)} y={r2(y - h / 2 + 12 + i * 10)} w={r2(w * (i === 2 ? 0.35 : 0.6))} seed={seed + 4 + i} />
      ))}
    </g>
  );
}

/**
 * Where the data come from: four marks in a column, a magnifier (searches),
 * a map pin (locations), a receipt (purchases) and an AI chat bubble
 * (conversations with assistants), each with an arrow into one fat folder.
 */
export function DataTrail() {
  const folder = sharp(rp([[262, 66], [300, 66], [310, 78], [372, 78], [372, 186], [262, 186]]), true, 1.5);
  const front = sharp(rp([[256, 98], [378, 98], [372, 186], [262, 186]]), true, 1.5);
  const ys = [40, 94, 148, 206];
  return (
    <SketchFrame
      id="sk-data-trail"
      width={400}
      height={240}
      label="Four sources of data in a column, a magnifier for searches, a map pin for locations, a receipt for purchases and an AI chat bubble for conversations with assistants, each with an arrow into one fat folder."
    >
      <Backwash cx={200} cy={120} rx={194} ry={114} seed={2800} />
      <Magnifier x={70} y={ys[0] - 4} r={15} seed={2802} />
      <MapPin x={72} y={ys[1] + 20} s={0.75} seed={2810} />
      <MiniReceipt x={56} y={ys[2] - 22} h={40} seed={2820} />
      <ChatBubble x={74} y={ys[3] - 6} w={86} h={40} tx={46} ty={ys[3] + 22} seed={2830} />
      {ys.map((y, i) => (
        <SketchArrow key={y} pts={curvePts([[104, 104, 108, 124][i], y], [190, (y + 128) / 2 + (i < 2 ? -6 : 6)], [250, 128 + (i - 1.5) * 18])} seed={2850 + i * 2} head={7} />
      ))}
      <Wash pts={folder} seed={2870} fill={SK.camel} opacity={0.7} />
      <InkLine pts={folder} seed={2871} closed />
      {[0, 1, 2].map((i) => (
        <Paper key={i} pts={rect(270 + i * 3, 84 - i * 3, 90, 40, 1)} seed={2874 + i} />
      ))}
      <Wash pts={front} seed={2880} fill={SK.camel} opacity={0.8} />
      <InkLine pts={front} seed={2881} closed />
    </SketchFrame>
  );
}

/** A padlock centred on (x, y): ochre body, ink shackle. */
function Padlock({ x, y, s = 1, seed }: { x: number; y: number; s?: number; seed: number }) {
  const body = sharp(at(x, y, [[-11, -2], [11, -2], [11, 15], [-11, 15]], s), true, 1.5);
  const shackle = at(x, y, [[-7, -2], [-7, -10], [-4, -15], [0, -16], [4, -15], [7, -10], [7, -2]], s);
  return (
    <g>
      <InkLine pts={shackle} seed={seed} width={1.8} amp={0.25} />
      <Wash pts={body} seed={seed + 1} fill={SK.ochre} opacity={0.85} dx={0.5} dy={0.4} />
      <InkLine pts={body} seed={seed + 2} closed width={1.1} />
      <InkLine pts={at(x, y, [[0, 4], [0, 9]], s)} seed={seed + 3} width={1.4} amp={0.1} />
    </g>
  );
}

/**
 * The privacy paradox: a consumer says privacy matters (a padlock in a speech
 * bubble) while reaching out to type personal details into a kiosk screen
 * that offers a free coffee for them.
 */
export function PrivacyParadox() {
  const g = 226;
    const scr = rect(232, 46, 120, 104, 3);
  return (
    <SketchFrame
      id="sk-privacy-paradox"
      width={400}
      height={252}
      label="A consumer says privacy matters, a padlock in a speech bubble, while reaching out to type personal details into a kiosk screen that offers a free coffee in return."
    >
      <Backwash cx={200} cy={126} rx={194} ry={120} seed={2900} />
      <Ground x0={20} x1={380} y={g} seed={2902} />
      <SpeechBubble x={92} y={46} w={64} h={50} tx={130} ty={74} seed={2910} />
      <Padlock x={92} y={44} s={1.05} seed={2916} />
      <Person x={156} y={g} h={196} look={CONSUMER} arms={["hip", "reach"]} seed={2920} />
      {/* the kiosk */}
      <g transform="translate(-22 0)">
      <InkLine pts={rp([[292, 150], [292, g]])} seed={2950} width={2.4} amp={0.3} />
      <InkLine pts={rp([[270, g], [314, g]])} seed={2951} width={1.6} />
      <Wash pts={scr} seed={2952} fill={SK.charcoal} opacity={0.7} />
      <InkLine pts={scr} seed={2953} closed />
      <Paper pts={rect(240, 56, 104, 84, 1.5)} seed={2954} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <Scrawl x={248} y={70 + i * 16} w={22} seed={2960 + i} />
          <InkLine pts={rect(274, 63 + i * 16, 60, 12, 1)} seed={2964 + i} width={0.7} closed />
          {i < 2 ? <Scrawl x={278} y={70 + i * 16} w={36 - i * 10} seed={2968 + i} width={1.1} /> : null}
        </g>
      ))}
      <Cup x={270} bottom={134} s={0.62} seed={2972} fill={SK.camel} />
      <SketchText x={286} y={131} size={10}>
        FREE
      </SketchText>
      </g>
    </SketchFrame>
  );
}

/**
 * What each one reveals. Left, a search box holding two words, "running
 * shoes". Right, the same shopper's message to an AI assistant: a new job in
 * March, worry about money, knees that hurt after long runs, and then the
 * same question about shoes.
 */
export function SearchVsChat() {
  const chat = ["I start a new job in March", "and I'm worried about money.", "My knees hurt after long runs.", "Which running shoes should I buy?"];
  return (
    <SketchFrame
      id="sk-search-chat"
      width={400}
      height={210}
      label={`Left, a search box holding two words, "running shoes". Right, the same shopper's message to an AI assistant: "${chat.join(" ")}"`}
    >
      <Backwash cx={200} cy={105} rx={194} ry={99} seed={3000} />
      <Paper pts={rect(14, 88, 122, 30, 6)} seed={3002} />
      <InkLine pts={rect(14, 88, 122, 30, 6)} seed={3003} closed />
      <Magnifier x={28} y={101} r={6} seed={3004} />
      <SketchText x={44} y={107} size={11} serif>
        running shoes
      </SketchText>
      <SpeechBubble x={274} y={92} w={238} h={116} tx={356} ty={186} seed={3010} />
      <Sparkle x={170} y={48} r={7} seed={3016} />
      {chat.map((l, i) => (
        <SketchText key={i} x={170} y={r2(70 + i * 21)} size={11.5} serif>
          {l}
        </SketchText>
      ))}
    </SketchFrame>
  );
}

/* ==========================================================================
   Algorithmic Pricing
   ========================================================================== */

/**
 * Dynamic pricing: the same cabin seat map three times, seen from above, as
 * seats sell (sold seats washed charcoal). Under each map, the fare for the
 * next seat: $180, then $240, then $390.
 */
export function SeatsAndFares() {
  const maps: [number, string][] = [
    [6, "$180"],
    [14, "$240"],
    [21, "$390"],
  ];
  const order = Array.from({ length: 24 }, (_, i) => i).sort((a, b) => seeded(3100 + a)() - seeded(3100 + b)());
  return (
    <SketchFrame
      id="sk-seats-fares"
      width={400}
      height={252}
      label="Three small airliners seen from above, each with the same 24-seat cabin, as seats sell: 6, then 14, then 21 seats sold. Under each plane, the fare for the next seat: $180, $240 and $390."
    >
      <Backwash cx={200} cy={124} rx={194} ry={118} seed={3100} />
      {maps.map(([sold, fare], m) => {
        const cx = 70 + m * 130;
        const L = cx - 34;
        const R = cx + 34;
        const body = sharp(rp([[cx, 6], [cx + 16, 14], [R, 40], [R, 178], [cx + 10, 204], [cx - 10, 204], [L, 178], [L, 40], [cx - 16, 14]]), true, 1.5);
        const wing = (k: 1 | -1) => sharp(rp([[cx + k * 34, 84], [cx + k * 62, 122], [cx + k * 62, 132], [cx + k * 34, 118]]), true, 1);
        const tail = (k: 1 | -1) => sharp(rp([[cx + k * 14, 188], [cx + k * 30, 204], [cx + k * 30, 209], [cx + k * 8, 202]]), true, 1);
        const taken = new Set(order.slice(0, sold));
        return (
          <g key={m}>
            {([-1, 1] as const).map((k) => (
              <g key={k}>
                <Wash pts={wing(k)} seed={3112 + m * 40 + k} fill={SK.stone} opacity={0.9} dx={0.5} dy={0.4} />
                <InkLine pts={wing(k)} seed={3114 + m * 40 + k} width={1} closed />
                <InkLine pts={tail(k)} seed={3116 + m * 40 + k} width={1} closed />
              </g>
            ))}
            <Paper pts={body} seed={3110 + m * 40} />
            <InkLine pts={body} seed={3111 + m * 40} closed />
            {Array.from({ length: 24 }, (_, i) => {
              const c = i % 4;
              const r = Math.floor(i / 4);
              const sx = L + 6 + c * 14 + (c > 1 ? 4 : 0);
              const sy = 46 + r * 21;
              const seat = rect(sx, sy, 11, 14, 1.2);
              return (
                <g key={i}>
                  {taken.has(i) ? <Wash pts={seat} seed={3120 + m * 40 + i} fill={SK.charcoal} opacity={0.65} dx={0.4} dy={0.3} /> : null}
                  <InkLine pts={seat} seed={3150 + m * 40 + i} width={0.7} amp={0.3} closed />
                </g>
              );
            })}
            <ShelfPrice x={cx} y={232} text={fare} seed={3200 + m * 3} size={m === 2 ? 15 : 13} />
          </g>
        );
      })}
    </SketchFrame>
  );
}

/** A phone held up in a hand, centred at x: the screen shows a sneaker and a price. */
function PriceInHand({ cx, price, skin, skinOpacity = 0.9, tilt, seed }: { cx: number; price: string; skin: string; skinOpacity?: number; tilt: number; seed: number }) {
  const ph = rect(cx - 56, 26, 112, 186, 10);
  const glass = rect(cx - 47, 42, 94, 150, 2);
  const palm = rp([[cx - 54, 260], [cx - 52, 222], [cx - 38, 196], [cx + 4, 194], [cx + 40, 200], [cx + 62, 176], [cx + 72, 182], [cx + 66, 214], [cx + 56, 260]]);
  return (
    <g transform={`rotate(${tilt} ${cx} 140)`}>
      <Wash pts={ph} seed={seed} fill={SK.charcoal} opacity={0.75} />
      <InkLine pts={ph} seed={seed + 1} closed />
      <Paper pts={glass} seed={seed + 2} />
      <InkLine pts={glass} seed={seed + 3} width={0.8} closed />
      <Shoe x={cx} y={98} s={1.3} seed={seed + 4} fill={SK.sky} />
      <Stars x={cx - 26} y={118} n={4} r={4.5} gap={13} seed={seed + 10} />
      <SketchText x={cx} y={160} anchor="middle" size={22}>
        {price}
      </SketchText>
      {[118, 140, 162].map((y, i) => {
        const f = rp(blobPts(cx - 56, y, 11, 7.5, seed + 20 + i, 10, 0.08));
        return (
          <g key={y}>
            <Wash pts={f} seed={seed + 20 + i} fill={skin} opacity={skinOpacity} dx={0.6} dy={0.4} />
            <InkLine pts={f} seed={seed + 24 + i} closed width={1} />
          </g>
        );
      })}
      <Wash pts={palm} seed={seed + 30} fill={skin} opacity={skinOpacity} dx={0.8} dy={0.6} />
      <InkLine pts={palm.slice(0, palm.length - 1)} seed={seed + 31} />
    </g>
  );
}

/**
 * Personalized pricing: two hands, two different consumers, each hold up a
 * phone showing the same sneaker with the same stars. One screen asks $89,
 * the other $119.
 */
export function TwoPrices() {
  return (
    <SketchFrame
      id="sk-two-prices"
      width={400}
      height={250}
      label="Two hands of two different consumers each hold up a phone showing the same sneaker with the same four stars. One screen asks $89, the other $119."
    >
      <Backwash cx={200} cy={125} rx={194} ry={119} seed={3300} />
      <PriceInHand cx={112} price="$89" skin={SK.skin} tilt={-6} seed={3310} />
      <PriceInHand cx={290} price="$119" skin={SK.tan} skinOpacity={0.75} tilt={5} seed={3360} />
    </SketchFrame>
  );
}

/** A gear centred on (x, y), radius r: the mark of an automatic pricing algorithm. */
function Gear({ x, y, r, seed, fill = SK.stone }: { x: number; y: number; r: number; seed: number; fill?: string }) {
  const n = 8;
  const pts: Pt[] = [];
  for (let i = 0; i < n; i++) {
    const a0 = (i / n) * Math.PI * 2;
    const da = (Math.PI * 2) / n;
    [
      [a0, r * 0.78],
      [a0 + da * 0.12, r],
      [a0 + da * 0.42, r],
      [a0 + da * 0.54, r * 0.78],
    ].forEach(([a, rr]) => pts.push([x + Math.cos(a) * rr, y + Math.sin(a) * rr]));
  }
  const hole = rp(blobPts(x, y, r * 0.3, r * 0.3, seed + 3, 10, 0.05));
  return (
    <g>
      <Wash pts={rp(pts)} seed={seed} fill={fill} opacity={0.85} dx={0.6} dy={0.4} />
      <InkLine pts={sharp(rp(pts), true, 0.8)} seed={seed + 1} width={1.1} amp={0.25} closed />
      <Paper pts={hole} seed={seed + 2} />
      <InkLine pts={hole} seed={seed + 4} width={1} closed />
    </g>
  );
}

/**
 * Algorithm meets algorithm: on the left, a store's price screen run by a
 * gear (the pricing algorithm) shows $42; on the right, the AI agent holds a
 * payment card. The price tag passes to the agent and the card passes back,
 * at night, under a crescent moon, with no person in the scene.
 */
export function AlgorithmMeetsAgent() {
  const g = 214;
  const scr = rect(34, 70, 118, 92, 3);
  return (
    <SketchFrame
      id="sk-algorithm-agent"
      width={400}
      height={236}
      label="On the left, a store's price screen run by a gear, the pricing algorithm, shows $42. On the right, the AI agent with a payment card. An arrow carries the price to the agent and another carries the card back, at night under a crescent moon, with no person in the scene."
    >
      <Backwash cx={200} cy={118} rx={194} ry={112} seed={3400} />
      <Ground x0={20} x1={380} y={g} seed={3402} />
      <Wash pts={rp([[192, 26], [204, 30], [208, 42], [202, 54], [190, 56], [198, 46], [199, 36]])} seed={3404} fill={SK.ochre} opacity={0.9} dx={0} dy={0} />
      <InkLine pts={rp([[192, 26], [204, 30], [208, 42], [202, 54], [190, 56], [198, 46], [199, 36], [192, 26]])} seed={3405} width={0.9} />
      {/* the store's price screen */}
      <InkLine pts={rp([[93, 162], [93, g]])} seed={3410} width={2.2} amp={0.3} />
      <InkLine pts={rp([[72, g], [114, g]])} seed={3411} width={1.4} />
      <Wash pts={scr} seed={3412} fill={SK.charcoal} opacity={0.7} />
      <InkLine pts={scr} seed={3413} closed />
      <Paper pts={rect(42, 80, 102, 72, 1.5)} seed={3414} />
      <SketchText x={93} y={128} anchor="middle" size={26}>
        $42
      </SketchText>
      <Gear x={40} y={70} r={20} seed={3420} />
      {/* the exchange */}
      <SketchArrow pts={curvePts([160, 96], [222, 78], [288, 106])} seed={3430} />
      <SketchArrow pts={curvePts([288, 170], [222, 192], [160, 150])} seed={3432} />
      <PayCard x={224} y={150} w={36} tilt={-8} seed={3440} />
      {/* the agent */}
      <Agent x={322} y={g - 2} s={1.35} seed={3450} />
    </SketchFrame>
  );
}

/* ==========================================================================
   Sustainable Consumption and the Conscious Consumer
   ========================================================================== */

/** A leaf centred on (x, y), pointing up-right: the mark of a green claim. */
function Leaf({ x, y, s = 1, seed }: { x: number; y: number; s?: number; seed: number }) {
  const pts = at(x, y, [[-10, 10], [-11, -2], [-4, -10], [10, -12], [8, 0], [0, 9]], s);
  return (
    <g>
      <Wash pts={pts} seed={seed} fill={SK.tan} opacity={0.45} dx={0.5} dy={0.4} />
      <InkLine pts={pts} seed={seed + 1} closed width={1} />
      <InkLine pts={at(x, y, [[-10, 10], [2, -2], [8, -10]], s)} seed={seed + 2} width={0.8} />
    </g>
  );
}

/** A detergent jug standing on (x, bottom); `leaf` puts the green label on it. */
function Jug({ x, bottom, s = 1, seed, fill = SK.sky, leaf = false, pencil = false }: { x: number; bottom: number; s?: number; seed: number; fill?: string; leaf?: boolean; pencil?: boolean }) {
  const body = at(x, bottom, [[-18, 0], [-18, -42], [-12, -50], [2, -50], [2, -58], [10, -58], [10, -50], [18, -44], [18, 0]], s);
  const handle = at(x, bottom, [[4, -46], [14, -40], [14, -30]], s);
  if (pencil) return <PencilLine pts={body} seed={seed} closed />;
  return (
    <g>
      <Wash pts={body} seed={seed} fill={fill} opacity={0.65} />
      <InkLine pts={body} seed={seed + 1} closed />
      <InkLine pts={handle} seed={seed + 2} width={1} />
      <Paper pts={rect(x - 12 * s, bottom - 32 * s, 24 * s, 20 * s, 1)} seed={seed + 3} />
      <InkLine pts={rect(x - 12 * s, bottom - 32 * s, 24 * s, 20 * s, 1)} seed={seed + 4} width={0.8} closed />
      {leaf ? <Leaf x={x} y={r2(bottom - 22 * s)} s={0.7 * s} seed={seed + 5} /> : null}
    </g>
  );
}

/**
 * The attitude-behavior gap: a consumer thinks of a leaf (a positive attitude
 * toward green products) while carrying away the plain, cheaper detergent.
 * On the shelf, the green jug at $8.99 is still in its place; the plain
 * jug's $4.99 spot is empty.
 */
export function SayGreenBuyCheap() {
  const g = 226;
  const hand = handAt(116, g, 190, "hold", 1);
  return (
    <SketchFrame
      id="sk-green-cheap"
      width={400}
      height={252}
      label="A consumer thinks of a leaf, a positive attitude toward green products, while carrying away the plain, cheaper detergent. On the shelf, the green detergent at $8.99 is still in its place, and the plain detergent's $4.99 spot is empty."
    >
      <Backwash cx={200} cy={126} rx={194} ry={120} seed={3500} />
      <Ground x0={20} x1={380} y={g} seed={3502} />
      <Thought x={54} y={42} rx={32} ry={23} tx={96} ty={62} seed={3504} />
      <Leaf x={54} y={42} s={1.3} seed={3512} />
      <Person x={116} y={g} h={190} look={CONSUMER} arms={["hip", "hold"]} seed={3520} />
      <Jug x={r2(hand[0] + 4)} bottom={r2(hand[1] + 50)} s={0.85} seed={3550} fill={SK.camel} />
      {/* the shelf */}
      <Wash pts={rect(196, 134, 186, 9)} seed={3560} fill={SK.leather} opacity={0.55} />
      <InkLine pts={rect(196, 134, 186, 9)} seed={3561} closed />
      <InkLine pts={rp([[206, 143], [206, g]])} seed={3562} width={1.2} />
      <InkLine pts={rp([[372, 143], [372, g]])} seed={3563} width={1.2} />
      <Jug x={244} bottom={134} s={1.15} seed={3570} leaf />
      <ShelfPrice x={244} y={160} text="$8.99" seed={3580} />
      <Jug x={330} bottom={134} s={1.15} seed={3584} pencil />
      <ShelfPrice x={330} y={160} text="$4.99" seed={3588} />
    </SketchFrame>
  );
}

/**
 * Greenwashing: a plastic bottle close up, its label covered in leaves with
 * a big ECO and "100% NATURAL*". A magnifying glass over the bottom of the
 * label shows the small print: "*the cap".
 */
export function Greenwash() {
  const body = rp([[150, 50], [176, 50], [176, 36], [224, 36], [224, 50], [250, 50], [264, 72], [264, 222], [136, 222], [136, 72]]);
  const label = rect(144, 92, 112, 112, 2);
  const lens = rp(blobPts(234, 208, 36, 36, 3620, 18, 0.03));
  return (
    <SketchFrame
      id="sk-greenwash"
      width={400}
      height={262}
      label="A plastic bottle close up. Its label is covered in leaves, with a big ECO and the claim 100% natural with an asterisk. A magnifying glass over the bottom of the label shows the small print: the asterisk means the cap."
    >
      <Backwash cx={200} cy={128} rx={194} ry={112} seed={3600} />
      <Wash pts={body} seed={3602} fill={SK.sky} opacity={0.6} />
      <InkLine pts={sharp(body, true, 2)} seed={3603} closed />
      <Wash pts={rect(176, 22, 48, 16, 1.5)} seed={3604} fill={SK.charcoal} opacity={0.6} />
      <InkLine pts={rect(176, 22, 48, 16, 1.5)} seed={3605} closed />
      <Paper pts={label} seed={3606} />
      <InkLine pts={label} seed={3607} closed />
      {[[160, 110, 0.9], [240, 112, 0.8], [158, 188, 0.8]].map(([x, y, k], i) => (
        <Leaf key={i} x={x} y={y} s={k} seed={3610 + i * 3} />
      ))}
      <SketchText x={200} y={140} anchor="middle" size={30} serif>
        ECO
      </SketchText>
      <SketchText x={200} y={160} anchor="middle" size={10.5}>
        100% NATURAL*
      </SketchText>
      {/* the magnifier over the small print */}
      <Wash pts={lens} seed={3620} fill={SK.sky} opacity={0.35} dx={0} dy={0} />
      <Paper pts={rp(blobPts(234, 208, 33, 33, 3621, 18, 0.02))} seed={3622} />
      <SketchText x={234} y={213} anchor="middle" size={14} serif>
        *the cap
      </SketchText>
      <InkLine pts={lens} seed={3623} width={2} closed />
      <Wash pts={rp([[256, 232], [262, 226], [290, 246], [284, 252]])} seed={3624} fill={SK.leather} opacity={0.8} />
      <InkLine pts={rp([[256, 232], [262, 226], [290, 246], [284, 252]])} seed={3625} closed width={1.1} />
    </SketchFrame>
  );
}

/**
 * Sustainability in the instruction: a note to the AI agent reads "Pick the
 * option with the lowest carbon footprint." Below, three detergents with
 * their footprint labels: 1.2 kg and 0.8 kg (the one picked, ticked teal);
 * the third has no footprint information, a blank pencil label with a
 * question mark.
 */
export function GreenInstruction() {
  const g = 230;
  const note = rect(84, 14, 232, 52, 2);
  const items: [number, string | null, boolean][] = [
    [128, "1.2 KG CO₂", false],
    [222, "0.8 KG CO₂", true],
    [316, null, false],
  ];
  return (
    <SketchFrame
      id="sk-green-instruction"
      width={400}
      height={254}
      label="A note to the AI agent reads: Pick the option with the lowest carbon footprint. Below, the agent and three detergents with footprint labels: 1.2 kg of CO2, 0.8 kg of CO2 (the one picked, ticked), and a third with no footprint information, a blank label with a question mark."
    >
      <Backwash cx={200} cy={127} rx={194} ry={121} seed={3700} />
      <Ground x0={14} x1={386} y={g} seed={3702} />
      <Paper pts={note} seed={3704} />
      <InkLine pts={note} seed={3705} closed />
      <SketchText x={200} y={36} anchor="middle" size={12.5} serif>
        Pick the option with the lowest
      </SketchText>
      <SketchText x={200} y={54} anchor="middle" size={12.5} serif>
        carbon footprint.
      </SketchText>
      <Agent x={42} y={g - 2} s={0.95} seed={3710} />
      {items.map(([x, fp, pick], i) => (
        <g key={x}>
          <Jug x={x} bottom={g - 4} s={1.15} seed={3720 + i * 20} fill={[SK.sky, SK.camel, SK.blush][i]} />
          {fp ? (
            <g>
              <Paper pts={rect(x - 36, 128, 72, 22, 1.5)} seed={3730 + i * 20} />
              <InkLine pts={rect(x - 36, 128, 72, 22, 1.5)} seed={3731 + i * 20} closed width={0.9} />
              <SketchText x={x} y={143} anchor="middle" size={10}>
                {fp}
              </SketchText>
            </g>
          ) : (
            <g>
              <PencilLine pts={rect(x - 36, 128, 72, 22, 1.5)} seed={3730 + i * 20} closed />
              <SketchText x={x} y={144} anchor="middle" size={13} fill={SK.pencil}>
                ?
              </SketchText>
            </g>
          )}
          {pick ? <DoneTick x={x} y={104} r={12} seed={3740 + i * 20} /> : null}
        </g>
      ))}
    </SketchFrame>
  );
}

/* ==========================================================================
   Looking Back: The Consumer and the Agent
   ========================================================================== */

/**
 * Two actors. Left, the AI agent with what it works from: a product data sheet
 * and written reviews. Right, the consumer holding a steaming mug (using the
 * product), with a heart above (values) and a thought of the goal: the mug
 * itself.
 */
export function TwoActors() {
  const g = 226;
  const hand = handAt(296, g, 186, "hold", 1, true);
  return (
    <SketchFrame
      id="sk-two-actors"
      width={400}
      height={250}
      label="Two actors. Left, the AI agent beside what it works from: a product data sheet and a written review. Right, the consumer holding a steaming mug, using the product, with a heart beside the consumer's head."
    >
      <Backwash cx={200} cy={125} rx={194} ry={119} seed={3800} />
      <Ground x0={14} x1={386} y={g} seed={3802} />
      <DataSheet x={22} y={40} w={84} rows={5} seed={3810} />
      <ReviewCard x={34} y={150} w={88} stars={4} lines={2} r={5} seed={3840} />
      <Agent x={154} y={g - 2} s={1.15} seed={3860} />
      <InkLine pts={rp([[200, 30], [200, g - 8]])} seed={3870} width={0.7} />
      <Person x={296} y={g} h={186} look={CONSUMER} arms={["hip", "hold"]} flip seed={3880} />
      <Cup x={r2(hand[0] - 6)} bottom={r2(hand[1] + 12)} s={0.9} seed={3910} fill={SK.blush} />
      {[0, 1].map((i) => (
        <InkLine key={i} pts={rp([[hand[0] - 12 + i * 8, hand[1] - 22], [hand[0] - 15 + i * 8, hand[1] - 30], [hand[0] - 11 + i * 8, hand[1] - 38]])} seed={3920 + i} width={0.8} />
      ))}
      <Heart x={346} y={44} s={1.2} seed={3930} />
    </SketchFrame>
  );
}

/* ==========================================================================
   Discussion: Your Agent's Instructions
   ========================================================================== */

/**
 * The instructions still to write: a sheet headed GOALS, LIMITS and VALUES,
 * each with blank pencil lines to fill in, beside the AI agent and a week's
 * grocery bag.
 */
export function AgentInstructions() {
  const g = 252;
  const sheet = rect(30, 20, 200, 228, 2);
  return (
    <SketchFrame
      id="sk-agent-instructions"
      width={400}
      height={276}
      label="An instruction sheet for the AI agent with three headings, goals, limits and values, each followed by blank pencil lines still to be filled in. Beside it stand the AI agent and a week's grocery bag."
    >
      <Backwash cx={200} cy={138} rx={194} ry={132} seed={4000} />
      <Ground x0={240} x1={390} y={g} seed={4002} />
      <Paper pts={sheet} seed={4004} />
      <InkLine pts={sheet} seed={4005} closed />
      {["GOALS", "LIMITS", "VALUES"].map((h, i) => {
        const y = 52 + i * 70;
        return (
          <g key={h}>
            <SketchText x={46} y={y} size={11.5}>
              {h}
            </SketchText>
            {[0, 1].map((k) => (
              <PencilLine key={k} pts={rp([[46, y + 20 + k * 18], [k ? 170 : 212, y + 20 + k * 18]])} seed={4010 + i * 4 + k} />
            ))}
          </g>
        );
      })}
      <Agent x={286} y={g - 2} s={1.2} seed={4040} />
      <Bag x={354} y={r2(g - 72)} w={54} seed={4050} badge={false} />
      <Plant x={344} bottom={r2(g - 50)} s={0.7} seed={4060} />
    </SketchFrame>
  );
}
