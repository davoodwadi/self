/* ==========================================================================
   Consumer Behavior · Week 11 — figures
   --------------------------------------------------------------------------
   Editorial Sketch plates for culture, subcultures and social class: wobbly
   doubled ink and loose watercolour washes set off-register. Every mark
   comes from ../_visuals; the style rules live in ../CLAUDE.md.

   Fixed cast for this week:
     · Person: every human, one fashion-illustration figure (the CONSUMER
       look for the week's consumer), varied only by hair, clothes and skin.
     · Gift: the wrapped present, the week's sign of exchange and ritual.
     · Agent: the AI assistant (shared: a phone with the AI sparkle).

   Colour roles: teal is the one thing chosen, bought, lit or ticked on a
   plate; ochre a badge, a count or a small highlight; pencil only an absent
   object; sky behind a hope, with blush for the here and now.

   Data: Hofstede's country scores come from his published dataset
   (geerthofstede.com, "6 dimensions for website", 2015 release; long-term
   orientation from the World Values Survey version). The AI ethnocentrism
   scores come from Wadi, Ghodrat & Philp (2026), Table 2: grand mean plus
   model, target-country and interaction effects.
   ========================================================================== */

import React from "react";
import {
  blobPts,
  InkLine,
  Paper,
  PencilLine,
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
  Bag,
  BrandBadge,
  Car3,
  Ground,
  Tag1,
  Watch1,
  handAt,
  Heart,
  Laptop2,
  type Look,
  Perfume1,
  Person,
  rp,
  sharp,
  SpeechBubble,
  Stars,
} from "../_visuals/objects";

/* -- the week's looks ---------------------------------------------------- */

const CONSUMER: Look = { hair: "bun", hairTone: SK.brown, wear: SK.camel, legs: SK.charcoal, skin: SK.tan, skinOpacity: 0.55 };
const FRIEND: Look = { hair: "long", hairTone: SK.leather, wear: SK.sky, legs: SK.charcoal };
const ELDER: Look = { hair: "short", hairTone: SK.stone, wear: SK.earth, legs: SK.charcoal, skin: SK.skin };
const YOUTH: Look = { hair: "curly", hairTone: SK.charcoal, wear: SK.blush, legs: SK.leather, skin: SK.brown, skinOpacity: 0.45 };

/* -- the cast ------------------------------------------------------------- */

/** A wrapped present standing on (x, bottom), `w` wide, ribbon and bow on top. */
export function Gift({ x, bottom, w = 50, h = 40, seed, fill = SK.blush }: { x: number; bottom: number; w?: number; h?: number; seed: number; fill?: string }) {
  const box = sharp(rp([[x - w / 2, bottom - h], [x + w / 2, bottom - h], [x + w / 2, bottom], [x - w / 2, bottom]]), true, 1.5);
  const top = bottom - h;
  return (
    <g>
      <Wash pts={box} seed={seed} fill={fill} opacity={0.75} />
      <InkLine pts={box} seed={seed + 1} closed />
      <InkLine pts={rp([[x, top], [x, bottom]])} seed={seed + 2} width={2.2} amp={0.3} color={SK.tan} />
      <InkLine pts={rp([[x - w / 2, top + h * 0.45], [x + w / 2, top + h * 0.45]])} seed={seed + 3} width={2.2} amp={0.3} color={SK.tan} />
      <InkLine pts={rp([[x, top], [x - w * 0.22, top - h * 0.28], [x - w * 0.26, top - h * 0.08], [x, top]])} seed={seed + 4} width={1.1} />
      <InkLine pts={rp([[x, top], [x + w * 0.22, top - h * 0.28], [x + w * 0.26, top - h * 0.08], [x, top]])} seed={seed + 5} width={1.1} />
    </g>
  );
}

/* ==========================================================================
   Title Slide
   ========================================================================== */

/** A round-bellied teapot on (x, bottom), spout to −x. */
function Teapot({ x, bottom, s = 1, seed }: { x: number; bottom: number; s?: number; seed: number }) {
  const body = rp(blobPts(x, bottom - 24 * s, 30 * s, 24 * s, seed, 16, 0.04));
  const lid = at(x, bottom, [[-14, -46], [14, -46], [10, -52], [-10, -52]], s);
  return (
    <g>
      <InkLine pts={at(x, bottom, [[-26, -26], [-42, -40], [-50, -42]], s)} seed={seed + 1} width={2.4} />
      <InkLine pts={at(x, bottom, [[26, -34], [40, -32], [38, -16], [26, -14]], s)} seed={seed + 2} width={1.4} />
      <Wash pts={body} seed={seed + 3} fill={SK.sky} opacity={0.7} />
      <InkLine pts={body} seed={seed + 4} closed />
      <Wash pts={lid} seed={seed + 5} fill={SK.sky} opacity={0.7} />
      <InkLine pts={lid} seed={seed + 6} closed width={1.1} />
      <InkLine pts={rp(blobPts(x, bottom - 55 * s, 3 * s, 3 * s, seed + 7, 8, 0.05))} seed={seed + 7} closed width={1} />
    </g>
  );
}

/** A paper lantern hanging from (x, y). */
function Lantern({ x, y, s = 1, seed }: { x: number; y: number; s?: number; seed: number }) {
  const body = rp(blobPts(x, y + 30 * s, 20 * s, 22 * s, seed, 14, 0.04));
  return (
    <g>
      <InkLine pts={rp([[x, 0], [x, y + 8 * s]])} seed={seed + 1} width={0.9} />
      <Wash pts={body} seed={seed + 2} fill={SK.blush} opacity={0.9} />
      <InkLine pts={body} seed={seed + 3} closed />
      <InkLine pts={rp([[x, y + 8 * s], [x - 9 * s, y + 30 * s], [x, y + 52 * s]])} seed={seed + 4} width={0.7} />
      <InkLine pts={rp([[x, y + 8 * s], [x + 9 * s, y + 30 * s], [x, y + 52 * s]])} seed={seed + 5} width={0.7} />
      <InkLine pts={rp([[x - 7 * s, y + 8 * s], [x + 7 * s, y + 8 * s]])} seed={seed + 6} width={1.6} color={SK.tan} />
      <InkLine pts={rp([[x - 7 * s, y + 52 * s], [x + 7 * s, y + 52 * s]])} seed={seed + 7} width={1.6} color={SK.tan} />
      <InkLine pts={rp([[x, y + 53 * s], [x, y + 64 * s]])} seed={seed + 8} width={0.8} color={SK.tan} />
    </g>
  );
}

/** A stack of books standing on (x, bottom), `n` high. */
function Books({ x, bottom, n, seed }: { x: number; bottom: number; n: number; seed: number }) {
  const rnd = seeded(seed);
  const fills = [SK.leather, SK.camel, SK.sky, SK.tan, SK.earth, SK.charcoal];
  const books: Pt[][] = [];
  for (let i = 0, y = bottom; i < n; i++) {
    const h = 9 + Math.round(rnd() * 4);
    const w = 54 + Math.round(rnd() * 12);
    const dx = Math.round((rnd() - 0.5) * 8);
    books.push(sharp(rp([[x - w / 2 + dx, y - h], [x + w / 2 + dx, y - h], [x + w / 2 + dx, y], [x - w / 2 + dx, y]]), true, 1));
    y -= h;
  }
  return (
    <g>
      {books.map((b, i) => (
        <g key={i}>
          <Wash pts={b} seed={seed + 10 + i} fill={fills[i % fills.length]} opacity={0.6} dx={0.6} dy={0.3} />
          <InkLine pts={b} seed={seed + 30 + i} closed width={1} />
        </g>
      ))}
    </g>
  );
}

/**
 * Culture in things: on a sideboard, a teapot and cups, a wrapped present and
 * a cake with candles, a paper lantern hanging above; the AI assistant stands
 * among them beside a tall stack of books, the text it learned from.
 */
export function CultureShelf() {
  const top = 236;
  const board = rp([[24, top], [496, top], [496, top + 12], [24, top + 12]]);
  return (
    <SketchFrame
      id="sk-culture-shelf"
      width={520}
      height={330}
      label="On a wooden sideboard: a teapot with two small cups, a wrapped present, and a cake with candles, with a paper lantern hanging above. The AI assistant stands among them beside a tall stack of books."
    >
      <Backwash cx={260} cy={176} rx={250} ry={150} seed={100} />
      <Lantern x={150} y={30} s={1.1} seed={110} />
      <Teapot x={86} bottom={top} s={1.2} seed={120} />
      {[148, 176].map((cx, i) => {
        const cup = rp([[cx - 10, top - 18], [cx + 10, top - 18], [cx + 7, top], [cx - 7, top]]);
        return (
          <g key={cx}>
            <Wash pts={cup} seed={130 + i} fill={SK.sky} opacity={0.7} />
            <InkLine pts={cup} seed={134 + i} closed width={1.1} />
          </g>
        );
      })}
      <Gift x={244} bottom={top} w={58} h={46} seed={140} />
      {/* the cake */}
      <Wash pts={rp([[290, top - 40], [352, top - 40], [352, top - 4], [290, top - 4]])} seed={150} fill={SK.camel} opacity={0.6} />
      <InkLine pts={rp([[290, top - 40], [352, top - 40], [352, top - 4], [290, top - 4]])} seed={151} closed />
      <InkLine pts={rp([[290, top - 28], [321, top - 22], [352, top - 28]])} seed={152} width={0.9} />
      <InkLine pts={rp([[282, top - 2], [360, top - 2]])} seed={153} width={1.2} />
      {[303, 321, 339].map((cx, i) => (
        <g key={cx}>
          <InkLine pts={rp([[cx, top - 40], [cx, top - 54]])} seed={160 + i} width={1.8} color={SK.sky} />
          <Wash pts={rp(blobPts(cx, top - 60, 3, 5, 165 + i, 8, 0.1))} seed={165 + i} fill={SK.ochre} opacity={0.95} dx={0} dy={0} />
        </g>
      ))}
      {/* the assistant and the text it learned from */}
      <Books x={458} bottom={top} n={9} seed={170} />
      <Agent x={396} y={top} s={1} seed={200} />
      <Wash pts={board} seed={210} fill={SK.leather} opacity={0.6} />
      <InkLine pts={board} seed={211} closed />
      <InkLine pts={rp([[48, top + 12], [46, 316]])} seed={212} width={1.3} />
      <InkLine pts={rp([[472, top + 12], [474, 316]])} seed={213} width={1.3} />
    </SketchFrame>
  );
}

/* ==========================================================================
   Culture as a Lens
   ========================================================================== */

/**
 * What people eat and how: two place settings seen from above on two
 * tablecloths. Left, a rice bowl with chopsticks on a rest and a tea cup;
 * right, a dinner plate with a knife, a fork and a glass.
 */
export function TwoTables() {
  const cloth = (x0: number, seed: number, fill: string) => (
    <g>
      <Wash pts={rp([[x0, 26], [x0 + 176, 26], [x0 + 176, 214], [x0, 214]])} seed={seed} fill={fill} opacity={0.4} />
      <InkLine pts={rp([[x0, 26], [x0 + 176, 26], [x0 + 176, 214], [x0, 214]])} seed={seed + 1} closed width={1} />
    </g>
  );
  return (
    <SketchFrame
      id="sk-two-tables"
      width={400}
      height={240}
      label="Two place settings seen from above. Left: a rice bowl, chopsticks on a rest and a tea cup. Right: a dinner plate between a fork and a knife, with a glass."
    >
      <Backwash cx={200} cy={120} rx={194} ry={112} seed={300} />
      {cloth(14, 301, SK.blush)}
      {cloth(210, 303, SK.sky)}
      {/* bowl, chopsticks, cup */}
      <Paper pts={rp(blobPts(96, 128, 48, 48, 310, 18, 0.03))} seed={310} />
      <InkLine pts={rp(blobPts(96, 128, 48, 48, 311, 18, 0.03))} seed={311} closed />
      <Wash pts={rp(blobPts(96, 128, 34, 34, 312, 16, 0.08))} seed={312} fill={SK.paper} opacity={1} dx={0} dy={0} />
      <InkLine pts={rp(blobPts(96, 128, 36, 36, 313, 16, 0.03))} seed={313} closed width={0.9} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <InkLine key={i} pts={rp(blobPts(80 + (i % 3) * 14, 118 + Math.floor(i / 3) * 16, 3.5, 2.2, 314 + i, 8, 0.1))} seed={314 + i} closed width={0.7} />
      ))}
      <InkLine pts={rp([[150, 60], [166, 190]])} seed={320} width={2.4} color={SK.leather} />
      <InkLine pts={rp([[160, 58], [174, 188]])} seed={321} width={2.4} color={SK.leather} />
      <Wash pts={rp(blobPts(166, 170, 9, 5, 322, 10, 0.1))} seed={322} fill={SK.ochre} opacity={0.8} dx={0} dy={0} />
      <InkLine pts={rp(blobPts(46, 56, 16, 16, 323, 12, 0.04))} seed={323} closed />
      <Wash pts={rp(blobPts(46, 56, 11, 11, 324, 12, 0.06))} seed={324} fill={SK.tan} opacity={0.5} dx={0} dy={0} />
      {/* plate, fork, knife, glass */}
      <Paper pts={rp(blobPts(296, 128, 54, 54, 330, 18, 0.03))} seed={330} />
      <InkLine pts={rp(blobPts(296, 128, 54, 54, 331, 18, 0.03))} seed={331} closed />
      <InkLine pts={rp(blobPts(296, 128, 38, 38, 332, 18, 0.03))} seed={332} closed width={0.8} />
      <InkLine pts={rp([[228, 92], [228, 196]])} seed={333} width={1.8} />
      {[222, 226, 230, 234].map((fx, i) => (
        <InkLine key={fx} pts={rp([[fx, 66], [fx, 88]])} seed={334 + i} width={1} />
      ))}
      <InkLine pts={rp([[222, 88], [234, 88]])} seed={338} width={1.2} />
      <InkLine pts={rp([[366, 70], [370, 66], [372, 112], [366, 112], [366, 196]])} seed={339} width={1.6} />
      <Wash pts={rp(blobPts(360, 50, 13, 13, 340, 12, 0.04))} seed={340} fill={SK.sky} opacity={0.7} />
      <InkLine pts={rp(blobPts(360, 50, 13, 13, 341, 12, 0.04))} seed={341} closed />
    </SketchFrame>
  );
}

/** A small desk clock, face centred on (x, y), radius r. */
function DeskClock({ x, y, r = 16, seed }: { x: number; y: number; r?: number; seed: number }) {
  const rim = rp(blobPts(x, y, r, r, seed, 14, 0.03));
  const face = rp(blobPts(x, y, r * 0.78, r * 0.78, seed + 1, 14, 0.03));
  return (
    <g>
      <InkLine pts={rp([[x - r * 0.6, y + r * 0.8], [x - r * 0.8, y + r * 1.25]])} seed={seed + 2} width={1.2} />
      <InkLine pts={rp([[x + r * 0.6, y + r * 0.8], [x + r * 0.8, y + r * 1.25]])} seed={seed + 3} width={1.2} />
      <Wash pts={rim} seed={seed + 4} fill={SK.ochre} opacity={0.8} />
      <InkLine pts={rim} seed={seed + 5} closed width={1.1} />
      <Paper pts={face} seed={seed + 6} />
      <InkLine pts={face} seed={seed + 7} closed width={0.8} />
      <InkLine pts={rp([[x, y], [x, y - r * 0.55], [x, y], [x + r * 0.42, y + r * 0.1]])} seed={seed + 8} width={1} amp={0.1} />
    </g>
  );
}

/**
 * One gift, two meanings: in two scenes a giver offers the same desk clock.
 * On the left the receiver smiles, a heart above; on the right the receiver
 * shrugs it away with both hands, a broken heart above.
 */
export function SameGiftTwoMeanings() {
  const g = 230;
  const scene = (x0: number, welcome: boolean, seed: number) => {
    const hand = handAt(x0 + 50, g, 160, "reach", 1);
    return (
      <g>
        <Person x={x0 + 50} y={g} h={160} look={CONSUMER} arms={["hip", "reach"]} seed={seed} />
        <DeskClock x={r2(hand[0] + 14)} y={r2(hand[1] - 10)} r={13} seed={seed + 40} />
        <Person x={x0 + 148} y={g} h={156} look={welcome ? FRIEND : YOUTH} arms={welcome ? ["hip", "reach"] : ["shrug", "shrug"]} flip seed={seed + 60} />
        <Heart x={x0 + 148} y={46} s={1.2} seed={seed + 100} broken={!welcome} />
      </g>
    );
  };
  return (
    <SketchFrame
      id="sk-same-gift"
      width={400}
      height={250}
      label="Two scenes with the same gift. Left: a giver offers a desk clock and the receiver reaches for it, a heart above. Right: the same clock is offered and the receiver shrugs both hands away to refuse, a broken heart above."
    >
      <Backwash cx={104} cy={140} rx={98} ry={106} seed={400} />
      <Backwash cx={296} cy={140} rx={98} ry={106} seed={401} />
      <Ground x0={14} x1={194} y={g} seed={402} />
      <Ground x0={206} x1={386} y={g} seed={403} />
      {scene(10, true, 410)}
      {scene(202, false, 560)}
      <PencilLine pts={rp([[200, 36], [200, 236]])} seed={700} dash="2 6" />
    </SketchFrame>
  );
}

/* ==========================================================================
   Cultural Values: Hofstede's Dimensions
   ========================================================================== */

type Country = "USA" | "CHN" | "JPN" | "FRA" | "SWE" | "MEX";

/**
 * Hofstede's published country scores (0 to 100): individualism, power
 * distance, uncertainty avoidance, masculinity and long-term orientation.
 * Source: geerthofstede.com, "6 dimensions for website" (2015 release).
 */
const HOFSTEDE: Record<Country, { name: string; s: [number, number, number, number, number] }> = {
  USA: { name: "United States", s: [91, 40, 46, 62, 26] },
  CHN: { name: "China", s: [20, 80, 30, 66, 87] },
  JPN: { name: "Japan", s: [46, 54, 92, 95, 88] },
  FRA: { name: "France", s: [71, 68, 86, 43, 63] },
  SWE: { name: "Sweden", s: [71, 31, 29, 5, 53] },
  MEX: { name: "Mexico", s: [30, 81, 82, 69, 24] },
};

/** The five dimensions in the slide's order, with the words for each end. */
const DIMS: [string, string, string][] = [
  ["INDIVIDUALISM", "GROUP", "INDIVIDUAL"],
  ["POWER DISTANCE", "LOW", "HIGH"],
  ["UNCERTAINTY AVOIDANCE", "LOW", "HIGH"],
  ["MASCULINITY", "CARE", "ACHIEVEMENT"],
  ["LONG-TERM ORIENTATION", "PRESENT", "FUTURE"],
];

const COUNTRY_OPTIONS = (Object.keys(HOFSTEDE) as Country[]).map((id) => ({ id, label: HOFSTEDE[id].name }));

/**
 * Hofstede's dimensions as an instrument: five rails from 0 to 100. The
 * student picks two countries; a teal and an ochre marker place each country
 * on every rail, and an ink bar spans the gap between them.
 */
export function HofstedeCompare() {
  const [a, setA] = React.useState<Country>("USA");
  const [b, setB] = React.useState<Country>("CHN");
  const x0 = 344;
  const x1 = 664;
  const X = (v: number) => r2(x0 + ((x1 - x0) * v) / 100);
  const A = HOFSTEDE[a];
  const B = HOFSTEDE[b];
  const label =
    `Hofstede's five dimensions as rails from 0 to 100, comparing ${A.name} (teal) with ${B.name} (ochre): ` +
    DIMS.map(([d], i) => `${d.toLowerCase()} ${A.s[i]} and ${B.s[i]}`).join("; ") +
    ".";
  return (
    <>
      <SketchFrame id="sk-hofstede" width={800} height={334} label={label}>
        <Backwash cx={400} cy={166} rx={394} ry={160} seed={800} />
        {DIMS.map(([name, lo, hi], i) => {
          const y = 56 + i * 58;
          const va = A.s[i];
          const vb = B.s[i];
          const same = a === b;
          return (
            <g key={name}>
              <SketchText x={20} y={y + 4.5} size={12.5}>
                {name}
              </SketchText>
              <InkLine pts={rp([[x0, y], [x1, y]])} seed={810 + i} width={1} />
              <InkLine pts={rp([[x0, y - 5], [x0, y + 5]])} seed={820 + i} width={1} />
              <InkLine pts={rp([[x1, y - 5], [x1, y + 5]])} seed={830 + i} width={1} />
              <SketchText x={x0 - 10} y={y + 3.5} anchor="end" size={10.5} fill={SK.pencil}>
                {lo}
              </SketchText>
              <SketchText x={x1 + 10} y={y + 3.5} size={10.5} fill={SK.pencil}>
                {hi}
              </SketchText>
              {!same ? <InkLine pts={rp([[X(Math.min(va, vb)), y], [X(Math.max(va, vb)), y]])} seed={840 + i} width={3.2} amp={0.3} /> : null}
              {/* country B: ochre, labelled below */}
              {!same ? (
                <g>
                  <Wash pts={rp(blobPts(X(vb), y, 8, 8, 850 + i, 10, 0.05))} seed={850 + i} fill={SK.ochre} opacity={0.95} dx={0} dy={0} />
                  <InkLine pts={rp(blobPts(X(vb), y, 8, 8, 856 + i, 10, 0.05))} seed={856 + i} closed width={1.1} />
                  <SketchText x={X(vb)} y={y + 26} anchor="middle" size={12}>
                    {`${b} ${vb}`}
                  </SketchText>
                </g>
              ) : null}
              {/* country A: teal, labelled above */}
              <Wash pts={rp(blobPts(X(va), y, 8, 8, 862 + i, 10, 0.05))} seed={862 + i} fill={SK.teal} opacity={0.95} dx={0} dy={0} />
              <InkLine pts={rp(blobPts(X(va), y, 8, 8, 868 + i, 10, 0.05))} seed={868 + i} closed width={1.1} />
              <SketchText x={X(va)} y={y - 15} anchor="middle" size={12}>
                {`${a} ${va}`}
              </SketchText>
            </g>
          );
        })}
      </SketchFrame>
      <div className="mt-2 flex flex-col gap-0 px-1">
        <div className="flex flex-wrap items-center gap-x-2">
          <span className="mt-2 inline-block h-3 w-3 rounded-full bg-[#5E9C94]" aria-hidden />
          <PlateToggle<Country> options={COUNTRY_OPTIONS} value={a} onChange={setA} />
        </div>
        <div className="flex flex-wrap items-center gap-x-2">
          <span className="mt-2 inline-block h-3 w-3 rounded-full bg-[#E8B84A]" aria-hidden />
          <PlateToggle<Country> options={COUNTRY_OPTIONS} value={b} onChange={setB} />
        </div>
      </div>
    </>
  );
}

/**
 * Two ads for the same car. Left (individualist): one person in a teal coat
 * stands out in front of a row of identical grey figures, beside the car.
 * Right (collectivist): a family of four stands together beside the same
 * car and all point to it.
 */
export function TwoAds() {
  const poster = (x0: number, seed: number) => {
    const pts = sharp(rp([[x0, 16], [x0 + 184, 16], [x0 + 184, 232], [x0, 232]]), true, 2);
    return (
      <g>
        <Paper pts={pts} seed={seed} />
        <InkLine pts={pts} seed={seed + 1} closed width={1.2} />
      </g>
    );
  };
  const g = 214;
  const grey: Look = { hair: "short", hairTone: SK.charcoal, wear: SK.stone, legs: SK.stone, skin: SK.stone, skinOpacity: 0.6, shoes: SK.stone };
  return (
    <SketchFrame
      id="sk-two-ads"
      width={400}
      height={248}
      label="Two posters for the same car. Left: one person in a teal coat stands out in front of a row of identical grey figures, beside the car. Right: a family of two adults and two children stands together beside the same car and all point to it."
    >
      <Backwash cx={200} cy={124} rx={194} ry={118} seed={900} />
      {poster(10, 901)}
      {poster(206, 905)}
      {/* standing out */}
      <InkLine pts={rp([[22, 131], [186, 130]])} seed={1418} width={0.8} />
      {[30, 52, 74, 96, 118].map((x, i) => (
        <Person key={x} x={x} y={130} h={70} look={grey} arms={["down", "down"]} face={false} seed={910 + i * 100} />
      ))}
      <Person x={64} y={g} h={112} look={{ ...CONSUMER, wear: SK.teal }} arms={["hip", "down"]} seed={1420} />
      <Car3 x={140} y={g} s={0.72} seed={1460} fill={SK.camel} />
      {/* choosing together */}
      <Car3 x={340} y={g} s={0.6} seed={1480} fill={SK.camel} />
      <Person x={226} y={g} h={108} look={ELDER} arms={["down", "point"]} seed={1500} />
      <Person x={248} y={g} h={62} look={YOUTH} headScale={1.35} arms={["down", "point"]} seed={1580} />
      <Person x={268} y={g} h={58} look={{ ...CONSUMER, hair: "curly" }} headScale={1.35} arms={["down", "point"]} seed={1620} />
      <Person x={288} y={g} h={102} look={FRIEND} arms={["hip", "point"]} seed={1540} />
    </SketchFrame>
  );
}

/* ==========================================================================
   Rituals, Myths, and Symbols
   ========================================================================== */

/**
 * A grooming ritual: a bathroom mirror above a basin, and on the shelf the
 * morning skin-care steps in a row: cleanser, serum with a dropper, cream.
 */
export function MorningRoutine() {
  const shelf = 190;
  return (
    <SketchFrame
      id="sk-morning-routine"
      width={300}
      height={250}
      label="A bathroom mirror above a basin; on the shelf, three skin-care products in a row: a cleanser, a serum with a dropper and a jar of cream."
    >
      <Backwash cx={150} cy={126} rx={144} ry={118} seed={1700} />
      <Wash pts={rp(blobPts(150, 66, 50, 50, 1701, 16, 0.03))} seed={1701} fill={SK.sky} opacity={0.65} />
      <InkLine pts={rp(blobPts(150, 66, 50, 50, 1702, 16, 0.03))} seed={1702} closed width={1.3} />
      <InkLine pts={rp([[124, 50], [140, 34]])} seed={1703} width={0.8} />
      <InkLine pts={rp([[128, 62], [152, 38]])} seed={1704} width={0.8} />
      {/* shelf */}
      <Wash pts={rp([[48, shelf], [252, shelf], [252, shelf + 8], [48, shelf + 8]])} seed={1710} fill={SK.leather} opacity={0.6} />
      <InkLine pts={rp([[48, shelf], [252, shelf], [252, shelf + 8], [48, shelf + 8]])} seed={1711} closed />
      {/* cleanser: pump bottle */}
      <Wash pts={rp([[84, shelf - 50], [106, shelf - 50], [108, shelf], [82, shelf]])} seed={1720} fill={SK.blush} opacity={0.85} />
      <InkLine pts={sharp(rp([[84, shelf - 50], [106, shelf - 50], [108, shelf], [82, shelf]]), true, 2)} seed={1721} closed />
      <InkLine pts={rp([[95, shelf - 50], [95, shelf - 62], [106, shelf - 62]])} seed={1722} width={1.3} />
      {/* serum with dropper */}
      <Wash pts={rp([[138, shelf - 36], [162, shelf - 36], [162, shelf], [138, shelf]])} seed={1730} fill={SK.ochre} opacity={0.6} />
      <InkLine pts={sharp(rp([[138, shelf - 36], [162, shelf - 36], [162, shelf], [138, shelf]]), true, 3)} seed={1731} closed />
      <Wash pts={rp([[143, shelf - 50], [157, shelf - 50], [157, shelf - 36], [143, shelf - 36]])} seed={1732} fill={SK.charcoal} opacity={0.7} />
      <InkLine pts={rp([[143, shelf - 50], [157, shelf - 50], [157, shelf - 36], [143, shelf - 36]])} seed={1733} closed width={1} />
      <InkLine pts={rp(blobPts(150, shelf - 56, 5, 6, 1734, 8, 0.05))} seed={1734} closed width={1} />
      {/* cream jar */}
      <Wash pts={rp([[188, shelf - 26], [224, shelf - 26], [224, shelf], [188, shelf]])} seed={1740} fill={SK.paper} opacity={1} />
      <InkLine pts={sharp(rp([[188, shelf - 26], [224, shelf - 26], [224, shelf], [188, shelf]]), true, 2)} seed={1741} closed />
      <Wash pts={rp([[186, shelf - 34], [226, shelf - 34], [226, shelf - 26], [186, shelf - 26]])} seed={1742} fill={SK.camel} opacity={0.8} />
      <InkLine pts={rp([[186, shelf - 34], [226, shelf - 34], [226, shelf - 26], [186, shelf - 26]])} seed={1743} closed width={1} />
      {/* basin */}
      <Paper pts={rp([[90, shelf + 20], [210, shelf + 20], [196, shelf + 44], [104, shelf + 44]])} seed={1750} />
      <InkLine pts={rp([[90, shelf + 20], [210, shelf + 20], [196, shelf + 44], [104, shelf + 44]])} seed={1751} closed />
    </SketchFrame>
  );
}

/**
 * A gift-giving ritual: a wrapped present with a paper tag addressed TO
 * GRANDMA, beside a standing birthday card.
 */
export function GiftAndCard() {
  const bottom = 214;
  const card = sharp(rp([[198, 96], [274, 88], [282, 212], [202, 214]]), true, 2);
  return (
    <SketchFrame
      id="sk-gift-card"
      width={300}
      height={250}
      label="A wrapped present with a ribbon and a paper tag reading TO GRANDMA, beside a standing birthday card with a cake drawn on it."
    >
      <Backwash cx={150} cy={140} rx={144} ry={108} seed={1800} />
      <InkLine pts={rp([[24, bottom + 2], [276, bottom + 1]])} seed={1801} width={1} />
      <Gift x={98} bottom={bottom} w={120} h={96} seed={1810} fill={SK.sky} />
      {/* the tag on its string */}
      <InkLine pts={rp([[98, bottom - 96], [112, bottom - 116]])} seed={1820} width={0.8} />
      <Paper pts={sharp(rp([[106, bottom - 138], [190, bottom - 146], [193, bottom - 120], [109, bottom - 112]]), true, 2)} seed={1821} />
      <InkLine pts={sharp(rp([[106, bottom - 138], [190, bottom - 146], [193, bottom - 120], [109, bottom - 112]]), true, 2)} seed={1822} closed width={1} />
      <SketchText x={150} y={bottom - 125} anchor="middle" size={9}>
        TO GRANDMA
      </SketchText>
      {/* the card */}
      <Paper pts={card} seed={1830} />
      <Wash pts={card} seed={1831} fill={SK.blush} opacity={0.4} />
      <InkLine pts={card} seed={1832} closed width={1.1} />
      <Wash pts={rp([[218, 160], [262, 158], [262, 184], [218, 186]])} seed={1833} fill={SK.camel} opacity={0.7} />
      <InkLine pts={rp([[218, 160], [262, 158], [262, 184], [218, 186]])} seed={1834} closed width={1} />
      {[228, 240, 252].map((cx, i) => (
        <g key={cx}>
          <InkLine pts={rp([[cx, 158], [cx, 146]])} seed={1835 + i} width={1.5} color={SK.sky} />
          <Wash pts={rp(blobPts(cx, 141, 2.5, 4, 1840 + i, 8, 0.1))} seed={1840 + i} fill={SK.ochre} opacity={0.95} dx={0} dy={0} />
        </g>
      ))}
      <Scribble x={216} y={116} w={50} n={2} gap={10} last={0.7} seed={1850} />
    </SketchFrame>
  );
}

/** A few wobbly lines of handwriting from (x, y), `w` wide, the last `last` long. */
function Scribble({ x, y, w, n, gap = 11, last = 0.6, seed }: { x: number; y: number; w: number; n: number; gap?: number; last?: number; seed: number }) {
  const rnd = seeded(seed);
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const len = i === n - 1 ? last : 0.8 + rnd() * 0.2;
        const x1 = x + w * len;
        return <InkLine key={i} pts={rp(Array.from({ length: 6 }, (_, k) => [x + ((x1 - x) * k) / 5, y + i * gap + (k % 2 ? -0.8 : 0.8)] as Pt))} seed={seed + i} width={0.8} amp={0.4} />;
      })}
    </g>
  );
}

/**
 * Holiday rituals, two small scenes: left, a roast turkey on a platter for a
 * Thanksgiving dinner; right, a fan of Lunar New Year envelopes with gold
 * marks under a hanging paper lantern.
 */
export function Holidays() {
  const plat = 196;
  const bird = rp(blobPts(76, plat - 30, 50, 30, 1900, 16, 0.06));
  return (
    <SketchFrame
      id="sk-holidays"
      width={300}
      height={250}
      label="Two holiday scenes. Left: a roast turkey on a platter. Right: a fan of red-gold Lunar New Year envelopes under a hanging paper lantern."
    >
      <Backwash cx={76} cy={150} rx={70} ry={90} seed={1899} />
      <Backwash cx={226} cy={130} rx={70} ry={110} seed={1898} />
      {/* turkey */}
      <Paper pts={rp(blobPts(76, plat + 2, 70, 12, 1901, 14, 0.03))} seed={1901} />
      <InkLine pts={rp(blobPts(76, plat + 2, 70, 12, 1902, 14, 0.03))} seed={1902} closed />
      <Wash pts={bird} seed={1903} fill={SK.tan} opacity={0.75} />
      <InkLine pts={bird} seed={1904} closed />
      {[-1, 1].map((k, i) => {
        const leg = rp(blobPts(76 + k * 40, plat - 16, 16, 11, 1905 + i, 12, 0.08));
        return (
          <g key={k}>
            <Wash pts={leg} seed={1905 + i} fill={SK.leather} opacity={0.65} />
            <InkLine pts={leg} seed={1907 + i} closed width={1.1} />
            <InkLine pts={rp([[76 + k * 54, plat - 22], [76 + k * 64, plat - 30]])} seed={1909 + i} width={1.4} />
            <InkLine pts={rp(blobPts(76 + k * 66, plat - 32, 3.5, 3.5, 1912 + i, 8, 0.05))} seed={1912 + i} closed width={1} />
          </g>
        );
      })}
      <InkLine pts={rp([[52, plat - 42], [68, plat - 50], [90, plat - 50]])} seed={1911} width={0.8} />
      <PencilLine pts={rp([[150, 30], [150, 236]])} seed={1915} dash="2 6" />
      {/* envelopes and lantern */}
      <Lantern x={226} y={24} s={1.25} seed={1920} />
      {[-18, 0, 18].map((rot, i) => {
        const a = (rot * Math.PI) / 180;
        const P = (px: number, py: number): Pt => [r2(226 + px * Math.cos(a) - py * Math.sin(a)), r2(206 + px * Math.sin(a) + py * Math.cos(a))];
        const env = [P(-20, -70), P(20, -70), P(20, 0), P(-20, 0)];
        return (
          <g key={rot}>
            <Wash pts={env} seed={1930 + i} fill={SK.blush} opacity={0.95} />
            <InkLine pts={sharp(env, true, 1.5)} seed={1934 + i} closed width={1.1} />
            <InkLine pts={rp(blobPts(P(0, -44)[0], P(0, -44)[1], 6, 6, 1938 + i, 10, 0.05))} seed={1938 + i} closed width={1.2} color={SK.ochre} />
          </g>
        );
      })}
    </SketchFrame>
  );
}

/**
 * Rites of passage, two small scenes: left, a graduation cap on a rolled
 * diploma tied with a ribbon; right, two wedding rings in an open box.
 */
export function RitesOfPassage() {
  const board = rp([[22, 92], [80, 66], [138, 92], [80, 118]]);
  const crown = rp([[50, 102], [110, 102], [108, 132], [52, 132]]);
  const box = sharp(rp([[178, 150], [278, 150], [272, 206], [184, 206]]), true, 3);
  const lid = sharp(rp([[180, 150], [276, 150], [270, 96], [186, 96]]), true, 3);
  return (
    <SketchFrame
      id="sk-rites-of-passage"
      width={300}
      height={250}
      label="Two rites of passage. Left: a graduation cap with a tassel resting on a rolled diploma tied with a ribbon. Right: two gold wedding rings in an open ring box."
    >
      <Backwash cx={80} cy={140} rx={74} ry={100} seed={2000} />
      <Backwash cx={228} cy={140} rx={70} ry={100} seed={2001} />
      {/* diploma */}
      <Paper pts={rp([[26, 176], [136, 160], [140, 184], [30, 200]])} seed={2010} />
      <InkLine pts={rp([[26, 176], [136, 160], [140, 184], [30, 200]])} seed={2011} closed />
      <InkLine pts={rp(blobPts(28, 188, 5, 12, 2012, 10, 0.05))} seed={2012} closed width={1} />
      <InkLine pts={rp([[82, 168], [86, 192]])} seed={2013} width={2.4} color={SK.tan} />
      {/* cap */}
      <Wash pts={crown} seed={2020} fill={SK.charcoal} opacity={0.8} />
      <InkLine pts={crown} seed={2021} closed />
      <Wash pts={board} seed={2022} fill={SK.charcoal} opacity={0.85} />
      <InkLine pts={board} seed={2023} closed />
      <InkLine pts={rp([[80, 92], [124, 100], [126, 132]])} seed={2024} width={1.3} color={SK.ochre} />
      <Wash pts={rp(blobPts(126, 138, 3, 7, 2025, 8, 0.1))} seed={2025} fill={SK.ochre} opacity={0.95} dx={0} dy={0} />
      <PencilLine pts={rp([[154, 30], [154, 236]])} seed={2030} dash="2 6" />
      {/* ring box */}
      <Wash pts={lid} seed={2040} fill={SK.leather} opacity={0.65} />
      <InkLine pts={lid} seed={2041} closed />
      <Wash pts={box} seed={2042} fill={SK.leather} opacity={0.8} />
      <InkLine pts={box} seed={2043} closed />
      <Wash pts={rp([[188, 150], [268, 150], [264, 168], [192, 168]])} seed={2044} fill={SK.blush} opacity={0.8} />
      {[212, 244].map((cx, i) => (
        <g key={cx}>
          <InkLine pts={rp(blobPts(cx, 142, 14, 16, 2050 + i * 3, 14, 0.03))} seed={2050 + i * 3} closed width={3.4} color={SK.ochre} />
          <InkLine pts={rp(blobPts(cx, 142, 16, 18, 2051 + i * 3, 14, 0.03))} seed={2051 + i * 3} closed width={0.9} />
        </g>
      ))}
    </SketchFrame>
  );
}

/**
 * A brand borrows a myth: an ad poster of a runner, arms raised, breaking the
 * finish tape at the top of a steep climb, with the brand badge in the corner.
 */
export function HeroAd() {
  const poster = sharp(rp([[40, 14], [260, 14], [260, 236], [40, 236]]), true, 2);
  const g = 176;
  return (
    <SketchFrame
      id="sk-hero-ad"
      width={300}
      height={250}
      label="An ad poster: a runner with arms raised breaks the finish tape at the top of a steep hill, the brand badge in the corner."
    >
      <Backwash cx={150} cy={126} rx={144} ry={118} seed={2100} />
      <Paper pts={poster} seed={2101} />
      <Wash pts={rp([[50, 24], [250, 24], [250, 226], [50, 226]])} seed={2102} fill={SK.sky} opacity={0.4} />
      <InkLine pts={poster} seed={2103} closed width={1.2} />
      {/* the hill climbed */}
      <Wash pts={rp([[50, 226], [50, 210], [150, g], [250, g + 2], [250, 226]])} seed={2110} fill={SK.earth} opacity={0.6} />
      <InkLine pts={rp([[50, 212], [150, g], [250, g + 2]])} seed={2111} />
      {/* the finish posts and broken tape */}
      <InkLine pts={rp([[118, g + 10], [118, 98]])} seed={2120} width={1.4} />
      <InkLine pts={rp([[206, g + 1], [206, 98]])} seed={2121} width={1.4} />
      <InkLine pts={rp([[118, 116], [134, 124], [146, 140]])} seed={2122} width={2.2} color={SK.ochre} />
      <InkLine pts={rp([[206, 116], [188, 122], [176, 134]])} seed={2123} width={2.2} color={SK.ochre} />
      <Person x={162} y={g} h={130} look={{ ...YOUTH, wear: SK.camel }} arms={["up", "up"]} seed={2130} />
      <BrandBadge x={232} y={206} r={13} seed={2170} />
    </SketchFrame>
  );
}

/* ==========================================================================
   Sacred and Profane Consumption
   ========================================================================== */

/**
 * Sacred and profane: left, a grandparent's watch set apart on velvet in a
 * glass case on a stand (SACRED); right, an open kitchen drawer of everyday
 * spoons, a pen and a tape roll jumbled together (PROFANE).
 */
export function SacredProfane() {
  const glass = sharp(rp([[56, 40], [184, 40], [184, 176], [56, 176]]), true, 3);
  const drawer = rp([[226, 132], [384, 132], [376, 200], [234, 200]]);
  return (
    <SketchFrame
      id="sk-sacred-profane"
      width={400}
      height={240}
      label="Left, SACRED: a watch set apart on dark velvet inside a glass case on a wooden stand. Right, PROFANE: an open kitchen drawer with spoons, a pen and a roll of tape jumbled together."
    >
      <Backwash cx={120} cy={130} rx={112} ry={104} seed={2200} fill={SK.sky} opacity={0.45} />
      <Backwash cx={304} cy={150} rx={92} ry={82} seed={2201} />
      <SketchText x={120} y={24} anchor="middle" size={11}>
        SACRED
      </SketchText>
      <SketchText x={304} y={24} anchor="middle" size={11}>
        PROFANE
      </SketchText>
      {/* the case */}
      <Wash pts={rp([[70, 132], [170, 132], [170, 176], [70, 176]])} seed={2210} fill={SK.charcoal} opacity={0.75} />
      <Watch1 x={120} y={104} s={0.62} seed={2220} />
      <Wash pts={glass} seed={2230} fill={SK.sky} opacity={0.25} />
      <InkLine pts={glass} seed={2231} closed width={1.2} />
      <InkLine pts={rp([[66, 64], [84, 48]])} seed={2232} width={0.8} />
      <Wash pts={rp([[46, 176], [194, 176], [190, 196], [50, 196]])} seed={2233} fill={SK.leather} opacity={0.7} />
      <InkLine pts={rp([[46, 176], [194, 176], [190, 196], [50, 196]])} seed={2234} closed />
      <InkLine pts={rp([[64, 196], [60, 222]])} seed={2235} width={1.3} />
      <InkLine pts={rp([[176, 196], [180, 222]])} seed={2236} width={1.3} />
      {/* the drawer */}
      <Wash pts={drawer} seed={2240} fill={SK.camel} opacity={0.55} />
      {[[244, 150, 330, 170], [252, 176, 346, 150], [290, 186, 372, 172]].map(([x0, y0, x1, y1], i) => (
        <g key={i}>
          <InkLine pts={rp([[x0, y0], [x1 - 8, y1 + (y0 - y1) * 0.1]])} seed={2250 + i} width={2.4} />
          <Wash pts={rp(blobPts(x1, y1, 11, 7, 2255 + i, 10, 0.08))} seed={2258 + i} fill={SK.stone} opacity={0.9} dx={0} dy={0} />
          <InkLine pts={rp(blobPts(x1, y1, 11, 7, 2255 + i, 10, 0.08))} seed={2255 + i} closed width={1.1} />
        </g>
      ))}
      <Wash pts={rp([[262, 186], [312, 192], [310, 196], [260, 190]])} seed={2260} fill={SK.sky} opacity={0.9} dx={0} dy={0} />
      <InkLine pts={rp([[262, 186], [312, 192], [310, 196], [260, 190]])} seed={2261} closed width={0.9} />
      <InkLine pts={rp(blobPts(346, 188, 10, 8, 2262, 10, 0.05))} seed={2262} closed width={1.1} />
      <InkLine pts={rp(blobPts(346, 188, 4, 3, 2263, 8, 0.05))} seed={2263} closed width={0.8} />
      <InkLine pts={drawer} seed={2241} closed />
      <Wash pts={rp([[234, 200], [376, 200], [376, 222], [234, 222]])} seed={2270} fill={SK.camel} opacity={0.75} />
      <InkLine pts={rp([[234, 200], [376, 200], [376, 222], [234, 222]])} seed={2271} closed />
      <InkLine pts={rp([[290, 211], [320, 211]])} seed={2272} width={2} />
    </SketchFrame>
  );
}

/** A sports jersey, front view, centred on (x, y), `s` its scale (about 90 wide). */
function Jersey({ x, y, s = 1, seed, signed = false, fill = SK.sky }: { x: number; y: number; s?: number; seed: number; signed?: boolean; fill?: string }) {
  const body = at(x, y, [[-22, -44], [-10, -48], [0, -40], [10, -48], [22, -44], [44, -28], [36, -14], [26, -20], [26, 46], [-26, 46], [-26, -20], [-36, -14], [-44, -28]], s);
  return (
    <g>
      <Wash pts={body} seed={seed} fill={fill} opacity={0.75} />
      <InkLine pts={body} seed={seed + 1} closed />
      <SketchText x={x} y={r2(y + 12 * s)} anchor="middle" size={r2(26 * s)} serif>
        10
      </SketchText>
      {signed ? (
        <path
          d={`M${r2(x - 20 * s)} ${r2(y + 30 * s)} q${r2(6 * s)} ${r2(-14 * s)} ${r2(10 * s)} ${r2(-2 * s)} t${r2(10 * s)} ${r2(-4 * s)} t${r2(10 * s)} ${r2(2 * s)} t${r2(12 * s)} ${r2(-6 * s)}`}
          fill="none"
          stroke={SK.ink}
          strokeWidth={1.4}
          strokeLinecap="round"
        />
      ) : null}
    </g>
  );
}

/**
 * Sacralization: three things that became sacred to their owners: a jersey
 * signed by a player, a patchwork quilt passed down in a family (an old photo
 * pinned to it), and a snow globe bought on a special trip.
 */
export function BecameSacred() {
  const g = 210;
  const quilt = rp([[128, g - 64], [214, g - 64], [214, g], [128, g]]);
  return (
    <SketchFrame
      id="sk-became-sacred"
      width={340}
      height={240}
      label="Three possessions that became sacred: a jersey with a player's signature, a folded patchwork quilt passed down in a family with an old photograph pinned to it, and a souvenir snow globe from a trip."
    >
      <Backwash cx={170} cy={140} rx={164} ry={96} seed={2300} fill={SK.sky} opacity={0.4} />
      <InkLine pts={rp([[16, g + 1], [324, g]])} seed={2301} width={1} />
      <Jersey x={62} y={g - 54} s={1} seed={2310} signed />
      {/* the quilt */}
      <Paper pts={quilt} seed={2320} />
      {[0, 1, 2, 3].map((c) =>
        [0, 1, 2].map((r) => {
          const fills = [SK.blush, SK.camel, SK.sky, SK.earth];
          const px = 128 + c * 21.5;
          const py = g - 64 + r * 21.3;
          return <Wash key={`${c}-${r}`} pts={rp([[px + 1, py + 1], [px + 20, py + 1], [px + 20, py + 20], [px + 1, py + 20]])} seed={2321 + c * 3 + r} fill={fills[(c + r) % 4]} opacity={0.6} dx={0} dy={0} />;
        }),
      )}
      <InkLine pts={quilt} seed={2340} closed />
      <InkLine pts={rp([[128, g - 43], [214, g - 43]])} seed={2341} width={0.6} />
      <InkLine pts={rp([[128, g - 21], [214, g - 21]])} seed={2342} width={0.6} />
      <Paper pts={sharp(rp([[148, g - 88], [190, g - 92], [192, g - 54], [150, g - 52]]), true, 1.5)} seed={2343} />
      <InkLine pts={sharp(rp([[148, g - 88], [190, g - 92], [192, g - 54], [150, g - 52]]), true, 1.5)} seed={2344} closed width={1} />
      <InkLine pts={rp(blobPts(170, g - 78, 5, 6, 2345, 8, 0.05))} seed={2345} closed width={0.9} />
      <InkLine pts={rp([[160, g - 58], [164, g - 68], [176, g - 68], [180, g - 58]])} seed={2346} width={0.9} />
      {/* the snow globe */}
      <Wash pts={rp(blobPts(284, g - 52, 34, 34, 2350, 16, 0.03))} seed={2350} fill={SK.sky} opacity={0.65} />
      <InkLine pts={rp([[276, g - 26], [276, g - 60], [284, g - 74], [292, g - 60], [292, g - 26]])} seed={2351} width={1.1} />
      <InkLine pts={rp(blobPts(284, g - 52, 34, 34, 2352, 16, 0.03))} seed={2352} closed width={1.2} />
      {[[262, g - 70], [300, g - 66], [270, g - 46], [304, g - 40], [288, g - 80]].map(([fx, fy], i) => (
        <InkLine key={i} pts={rp(blobPts(fx, fy, 1.6, 1.6, 2360 + i, 6, 0.05))} seed={2360 + i} closed width={0.8} />
      ))}
      <Wash pts={rp([[252, g - 22], [316, g - 22], [322, g], [246, g]])} seed={2370} fill={SK.leather} opacity={0.8} />
      <InkLine pts={rp([[252, g - 22], [316, g - 22], [322, g], [246, g]])} seed={2371} closed />
    </SketchFrame>
  );
}

/** A small flag motif (stripes and a star canton) filling the box x, y, w, h. */
function FlagPrint({ x, y, w, h, seed }: { x: number; y: number; w: number; h: number; seed: number }) {
  return (
    <g>
      {[0, 1, 2, 3, 4].map((i) => (
        <InkLine key={i} pts={rp([[x + w * 0.38, y + (h * (i + 0.5)) / 5], [x + w, y + (h * (i + 0.5)) / 5]])} seed={seed + i} width={r2(h / 9)} amp={0.3} color={i % 2 ? SK.paper : SK.blush} />
      ))}
      <Wash pts={rp([[x, y], [x + w * 0.38, y], [x + w * 0.38, y + h * 0.55], [x, y + h * 0.55]])} seed={seed + 6} fill={SK.charcoal} opacity={0.75} dx={0} dy={0} />
      <SketchText x={r2(x + w * 0.19)} y={r2(y + h * 0.42)} anchor="middle" size={r2(h * 0.38)} fill={SK.paper}>
        ★
      </SketchText>
      <InkLine pts={rp([[x, y], [x + w, y], [x + w, y + h], [x, y + h]])} seed={seed + 7} closed width={0.9} />
    </g>
  );
}

/**
 * Desacralization: in a wire bargain bin, the national flag printed on a
 * plastic mug, a pair of flip-flops and a paper cup, with a $1.99 tag.
 */
export function FlagMerch() {
  const bin = rp([[40, 110], [300, 110], [284, 214], [56, 214]]);
  return (
    <SketchFrame
      id="sk-flag-merch"
      width={340}
      height={240}
      label="A wire bargain bin of cheap goods printed with the national flag: a plastic mug, a pair of flip-flops and a paper cup, with a price tag of $1.99."
    >
      <Backwash cx={170} cy={140} rx={164} ry={96} seed={2400} />
      {/* goods sticking up out of the bin */}
      <Wash pts={rp([[70, 62], [128, 62], [124, 132], [74, 132]])} seed={2410} fill={SK.paper} opacity={1} dx={0} dy={0} />
      <FlagPrint x={78} y={76} w={42} h={30} seed={2411} />
      <InkLine pts={rp([[70, 62], [128, 62], [124, 132], [74, 132]])} seed={2420} closed />
      <InkLine pts={rp([[128, 76], [146, 80], [144, 108], [126, 110]])} seed={2421} width={1.6} />
      {[0, 1].map((k) => {
        const sole = rp(blobPts(176 + k * 34, 92, 15, 36, 2430 + k, 14, 0.08));
        return (
          <g key={k}>
            <Paper pts={sole} seed={2432 + k} />
            <FlagPrint x={166 + k * 34} y={72} w={20} h={32} seed={2440 + k * 10} />
            <InkLine pts={sole} seed={2460 + k} closed />
            <InkLine pts={rp([[166 + k * 34, 80], [176 + k * 34, 70], [186 + k * 34, 80]])} seed={2462 + k} width={1.8} color={SK.charcoal} />
          </g>
        );
      })}
      <Wash pts={rp([[244, 74], [282, 74], [276, 132], [250, 132]])} seed={2470} fill={SK.paper} opacity={1} dx={0} dy={0} />
      <FlagPrint x={251} y={88} w={24} h={20} seed={2471} />
      <InkLine pts={rp([[244, 74], [282, 74], [276, 132], [250, 132]])} seed={2480} closed />
      {/* the wire bin */}
      <Wash pts={bin} seed={2490} fill={SK.stone} opacity={0.5} />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <InkLine key={i} pts={rp([[40 + i * 37, 110], [56 + i * 32.6, 214]])} seed={2491 + i} width={0.7} />
      ))}
      {[0, 1, 2].map((i) => (
        <InkLine key={i} pts={rp([[40 + i * 5, 110 + i * 35], [300 - i * 5, 110 + i * 35]])} seed={2500 + i} width={0.7} />
      ))}
      <InkLine pts={bin} seed={2505} closed width={1.3} />
      <Tag1 x={262} y={176} w={60} seed={2510} size={13}>
        $1.99
      </Tag1>
    </SketchFrame>
  );
}

/**
 * Not at any price: the owner clutches a framed signed jersey and answers
 * with a crossed-out bubble, while a buyer holds out banknotes and offers
 * $5,000.
 */
export function NotForSale() {
  const g = 230;
  const hug = handAt(120, g, 176, "hug", 1);
  const offer = handAt(268, g, 172, "reach", 1, true);
  const frame = sharp(rp([[hug[0] - 27, hug[1] - 4], [hug[0] + 27, hug[1] - 4], [hug[0] + 27, hug[1] + 56], [hug[0] - 27, hug[1] + 56]]), true, 2);
  return (
    <SketchFrame
      id="sk-not-for-sale"
      width={340}
      height={250}
      label="The owner clutches a framed, signed jersey to the chest, a crossed-out speech bubble above. A buyer holds out a fan of banknotes, a speech bubble reading $5,000."
    >
      <Backwash cx={170} cy={140} rx={164} ry={106} seed={2600} />
      <Ground x0={24} x1={316} y={g} seed={2601} />
      <Person x={120} y={g} h={176} look={CONSUMER} arms={["hug", "hug"]} seed={2610} />
      <Wash pts={frame} seed={2640} fill={SK.leather} opacity={0.7} />
      <InkLine pts={frame} seed={2641} closed />
      <Jersey x={hug[0]} y={r2(hug[1] + 26)} s={0.44} seed={2645} signed />
      <Person x={268} y={g} h={172} look={ELDER} arms={["hip", "reach"]} flip seed={2660} />
      {[0, 1, 2].map((i) => {
        const bx = offer[0] - 18 - i * 3;
        const by = offer[1] - 6 - i * 4;
        const note = sharp(rp([[bx - 14, by - 8], [bx + 14, by - 10], [bx + 15, by + 6], [bx - 13, by + 8]]), true, 1);
        return (
          <g key={i}>
            <Paper pts={note} seed={2703 + i} />
            <Wash pts={note} seed={2706 + i} fill={SK.camel} opacity={0.35} />
            <InkLine pts={note} seed={2709 + i} closed width={0.9} />
          </g>
        );
      })}
      <SpeechBubble x={292} y={30} w={78} h={36} tx={276} ty={54} seed={2720} />
      <SketchText x={292} y={35} anchor="middle" size={13}>
        $5,000
      </SketchText>
      <SpeechBubble x={84} y={30} w={46} h={36} tx={104} ty={52} seed={2730} />
      <InkLine pts={rp([[74, 21], [94, 39]])} seed={2735} width={2} />
      <InkLine pts={rp([[94, 21], [74, 39]])} seed={2736} width={2} />
    </SketchFrame>
  );
}

/* ==========================================================================
   Subcultures: Shared Identity Within a Culture
   ========================================================================== */

/** Generation boundaries by birth year (Pew Research Center). */
const GENERATIONS: [string, string][] = [
  ["BABY BOOMERS", "1946–1964"],
  ["GENERATION X", "1965–1980"],
  ["MILLENNIALS", "1981–1996"],
  ["GENERATION Z", "1997–2012"],
];

/**
 * Four generations and the screen each grew up with: a television set with
 * rabbit-ear aerial, a boxy desktop computer, a laptop, and a smartphone.
 */
export function GenerationScreens() {
  const g = 160;
  const cx = (i: number) => 100 + i * 200;
  return (
    <SketchFrame
      id="sk-generation-screens"
      width={800}
      height={220}
      label="Four generations with their birth years and the screen each grew up with: Baby Boomers, 1946 to 1964, a television set with an aerial; Generation X, 1965 to 1980, a boxy desktop computer; Millennials, 1981 to 1996, a laptop; Generation Z, 1997 to 2012, a smartphone."
    >
      <Backwash cx={400} cy={110} rx={394} ry={104} seed={2800} />
      <InkLine pts={rp([[20, g + 1], [780, g]])} seed={2801} width={1} />
      {/* TV */}
      <g>
        <InkLine pts={rp([[cx(0) - 6, g - 92], [cx(0) - 26, g - 124]])} seed={2810} width={1} />
        <InkLine pts={rp([[cx(0) + 6, g - 92], [cx(0) + 28, g - 120]])} seed={2811} width={1} />
        <Wash pts={rp([[cx(0) - 50, g - 92], [cx(0) + 50, g - 92], [cx(0) + 50, g - 12], [cx(0) - 50, g - 12]])} seed={2812} fill={SK.leather} opacity={0.65} />
        <InkLine pts={sharp(rp([[cx(0) - 50, g - 92], [cx(0) + 50, g - 92], [cx(0) + 50, g - 12], [cx(0) - 50, g - 12]]), true, 4)} seed={2813} closed />
        <Wash pts={rp(blobPts(cx(0) - 12, g - 52, 30, 28, 2814, 14, 0.04))} seed={2814} fill={SK.stone} opacity={0.85} dx={0} dy={0} />
        <InkLine pts={rp(blobPts(cx(0) - 12, g - 52, 30, 28, 2815, 14, 0.04))} seed={2815} closed width={1.1} />
        {[0, 1].map((k) => (
          <InkLine key={k} pts={rp(blobPts(cx(0) + 34, g - 70 + k * 22, 5, 5, 2816 + k, 8, 0.05))} seed={2816 + k} closed width={1} />
        ))}
        <InkLine pts={rp([[cx(0) - 40, g - 12], [cx(0) - 44, g]])} seed={2818} width={1.3} />
        <InkLine pts={rp([[cx(0) + 40, g - 12], [cx(0) + 44, g]])} seed={2819} width={1.3} />
      </g>
      {/* desktop computer */}
      <g>
        <Wash pts={rp([[cx(1) - 44, g - 104], [cx(1) + 44, g - 104], [cx(1) + 44, g - 30], [cx(1) - 44, g - 30]])} seed={2820} fill={SK.stone} opacity={0.8} />
        <InkLine pts={sharp(rp([[cx(1) - 44, g - 104], [cx(1) + 44, g - 104], [cx(1) + 44, g - 30], [cx(1) - 44, g - 30]]), true, 4)} seed={2821} closed />
        <Wash pts={rp([[cx(1) - 32, g - 94], [cx(1) + 32, g - 94], [cx(1) + 32, g - 44], [cx(1) - 32, g - 44]])} seed={2822} fill={SK.charcoal} opacity={0.75} dx={0} dy={0} />
        <InkLine pts={rp([[cx(1) - 32, g - 94], [cx(1) + 32, g - 94], [cx(1) + 32, g - 44], [cx(1) - 32, g - 44]])} seed={2823} closed width={1} />
        <InkLine pts={rp([[cx(1) - 24, g - 82], [cx(1) - 4, g - 82]])} seed={2824} width={1.2} color={SK.ochre} />
        <InkLine pts={rp([[cx(1) - 24, g - 72], [cx(1) + 10, g - 72]])} seed={2825} width={1.2} color={SK.ochre} />
        <Wash pts={rp([[cx(1) - 54, g - 26], [cx(1) + 54, g - 26], [cx(1) + 58, g], [cx(1) - 58, g]])} seed={2826} fill={SK.stone} opacity={0.8} />
        <InkLine pts={rp([[cx(1) - 54, g - 26], [cx(1) + 54, g - 26], [cx(1) + 58, g], [cx(1) - 58, g]])} seed={2827} closed />
        <InkLine pts={rp([[cx(1) + 20, g - 14], [cx(1) + 44, g - 14]])} seed={2828} width={1} />
      </g>
      <Laptop2 x={cx(2)} y={g} s={1.45} seed={2830} />
      {/* smartphone */}
      <g>
        <Wash pts={sharp(rp([[cx(3) - 24, g - 100], [cx(3) + 24, g - 100], [cx(3) + 24, g], [cx(3) - 24, g]]), true, 6)} seed={2840} fill={SK.charcoal} opacity={0.7} />
        <Wash pts={rp([[cx(3) - 19, g - 90], [cx(3) + 19, g - 90], [cx(3) + 19, g - 10], [cx(3) - 19, g - 10]])} seed={2841} fill={SK.sky} opacity={0.9} dx={0} dy={0} />
        <InkLine pts={sharp(rp([[cx(3) - 24, g - 100], [cx(3) + 24, g - 100], [cx(3) + 24, g], [cx(3) - 24, g]]), true, 6)} seed={2842} closed />
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => (
            <InkLine key={`${r}${c}`} pts={rp(sharp([[cx(3) - 14 + c * 11, g - 82 + r * 13], [cx(3) - 7 + c * 11, g - 82 + r * 13], [cx(3) - 7 + c * 11, g - 75 + r * 13], [cx(3) - 14 + c * 11, g - 75 + r * 13]], true, 1))} seed={2850 + r * 3 + c} closed width={0.8} />
          )),
        )}
      </g>
      {GENERATIONS.map(([name, years], i) => (
        <g key={name}>
          <SketchText x={cx(i)} y={g + 26} anchor="middle" size={12}>
            {name}
          </SketchText>
          <SketchText x={cx(i)} y={g + 44} anchor="middle" size={11} fill={SK.pencil}>
            {years}
          </SketchText>
        </g>
      ))}
    </SketchFrame>
  );
}

/**
 * Geographic subcultures as a map: one country split into a cold north
 * (snowflakes, a bowl of hot soup, winter boots) and a warm south (the sun,
 * a straw sun hat, sandals).
 */
export function RegionalMap() {
  const land = rp([[40, 60], [120, 26], [220, 34], [300, 22], [362, 64], [350, 120], [372, 170], [330, 220], [240, 230], [150, 222], [70, 200], [30, 140]]);
  const north = rp([[40, 60], [120, 26], [220, 34], [300, 22], [362, 64], [350, 120], [30, 128]]);
  return (
    <SketchFrame
      id="sk-regional-map"
      width={400}
      height={250}
      label="A map of one country split into two regions. The cold north shows snowflakes, a bowl of hot soup and winter boots. The warm south shows the sun, a straw sun hat and sandals."
    >
      <Backwash cx={200} cy={126} rx={194} ry={118} seed={2900} />
      <Wash pts={land} seed={2901} fill={SK.camel} opacity={0.45} />
      <Wash pts={north} seed={2902} fill={SK.sky} opacity={0.8} />
      <InkLine pts={land} seed={2903} closed width={1.3} />
      <PencilLine pts={rp([[34, 128], [120, 122], [220, 130], [352, 120]])} seed={2904} dash="5 5" />
      {/* north */}
      {[[86, 62], [258, 52], [318, 94]].map(([fx, fy], i) => (
        <g key={i}>
          {[0, 60, 120].map((a) => {
            const r = (a * Math.PI) / 180;
            return <InkLine key={a} pts={rp([[fx - Math.cos(r) * 9, fy - Math.sin(r) * 9], [fx + Math.cos(r) * 9, fy + Math.sin(r) * 9]])} seed={2910 + i * 3 + a / 60} width={1.1} />;
          })}
        </g>
      ))}
      <Paper pts={rp([[132, 86], [196, 86], [184, 112], [144, 112]])} seed={2920} />
      <InkLine pts={rp([[132, 86], [196, 86], [184, 112], [144, 112]])} seed={2921} closed />
      <Wash pts={rp([[136, 86], [192, 86], [190, 92], [138, 92]])} seed={2922} fill={SK.tan} opacity={0.8} dx={0} dy={0} />
      {[150, 164, 178].map((sx, i) => (
        <InkLine key={sx} pts={rp([[sx, 80], [sx - 4, 70], [sx + 2, 60]])} seed={2925 + i} width={0.8} />
      ))}
      {[0, 1].map((k) => {
        const boot = rp([[220 + k * 30, 70], [238 + k * 30, 70], [240 + k * 30, 98], [256 + k * 30, 102], [256 + k * 30, 112], [220 + k * 30, 112]]);
        return (
          <g key={k}>
            <Wash pts={boot} seed={2930 + k} fill={SK.leather} opacity={0.7} />
            <InkLine pts={boot} seed={2932 + k} closed width={1.1} />
          </g>
        );
      })}
      {/* south */}
      <Wash pts={rp(blobPts(96, 168, 16, 16, 2940, 12, 0.04))} seed={2940} fill={SK.ochre} opacity={0.95} dx={0} dy={0} />
      <InkLine pts={rp(blobPts(96, 168, 16, 16, 2941, 12, 0.04))} seed={2941} closed width={1.1} />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const a = (i / 8) * Math.PI * 2;
        return <InkLine key={i} pts={rp([[96 + Math.cos(a) * 21, 168 + Math.sin(a) * 21], [96 + Math.cos(a) * 28, 168 + Math.sin(a) * 28]])} seed={2942 + i} width={1} />;
      })}
      <Wash pts={rp(blobPts(195, 172, 40, 12, 2960, 14, 0.05))} seed={2960} fill={SK.ochre} opacity={0.6} />
      <InkLine pts={rp(blobPts(195, 172, 40, 12, 2961, 14, 0.05))} seed={2961} closed width={1.1} />
      <Wash pts={rp([[175, 170], [178, 150], [195, 144], [212, 150], [215, 170]])} seed={2962} fill={SK.ochre} opacity={0.75} />
      <InkLine pts={rp([[175, 170], [178, 150], [195, 144], [212, 150], [215, 170]])} seed={2963} width={1.1} />
      <InkLine pts={rp([[176, 164], [195, 167], [214, 164]])} seed={2964} width={2.4} color={SK.leather} />
      {[0, 1].map((k) => {
        const sole = rp(blobPts(268 + k * 34, 176, 13, 28, 2970 + k, 12, 0.08));
        return (
          <g key={k}>
            <Wash pts={sole} seed={2972 + k} fill={SK.tan} opacity={0.6} />
            <InkLine pts={sole} seed={2974 + k} closed width={1.1} />
            <InkLine pts={rp([[258 + k * 34, 168], [268 + k * 34, 158], [278 + k * 34, 168]])} seed={2976 + k} width={2} color={SK.leather} />
          </g>
        );
      })}
    </SketchFrame>
  );
}

/** A round certification seal centred on (x, y) with one word on it. */
function Seal({ x, y, r = 22, word, seed }: { x: number; y: number; r?: number; word: string; seed: number }) {
  return (
    <g>
      <Paper pts={rp(blobPts(x, y, r, r, seed, 14, 0.03))} seed={seed} />
      <Wash pts={rp(blobPts(x, y, r, r, seed + 1, 14, 0.03))} seed={seed + 1} fill={SK.ochre} opacity={0.35} />
      <InkLine pts={rp(blobPts(x, y, r, r, seed + 2, 14, 0.03))} seed={seed + 2} closed width={1.2} />
      <InkLine pts={rp(blobPts(x, y, r - 5, r - 5, seed + 3, 14, 0.03))} seed={seed + 3} closed width={0.7} />
      <SketchText x={x} y={r2(y + 3.5)} anchor="middle" size={r2(r * 0.29)}>
        {word}
      </SketchText>
    </g>
  );
}

/**
 * Dietary rules as a market: two food packages on a shelf, one carrying a
 * HALAL seal, the other a KOSHER seal.
 */
export function DietSeals() {
  const shelf = 206;
  const pack = (x: number, fill: string, seed: number) => {
    const body = sharp(rp([[x - 62, shelf - 132], [x + 62, shelf - 132], [x + 62, shelf], [x - 62, shelf]]), true, 3);
    return (
      <g>
        <Wash pts={body} seed={seed} fill={fill} opacity={0.6} />
        <InkLine pts={body} seed={seed + 1} closed />
        <Paper pts={rp([[x - 46, shelf - 118], [x + 46, shelf - 118], [x + 46, shelf - 70], [x - 46, shelf - 70]])} seed={seed + 2} />
        <InkLine pts={rp([[x - 46, shelf - 118], [x + 46, shelf - 118], [x + 46, shelf - 70], [x - 46, shelf - 70]])} seed={seed + 3} closed width={1} />
        <Scribble x={x - 36} y={shelf - 102} w={72} n={2} gap={14} last={0.6} seed={seed + 4} />
      </g>
    );
  };
  return (
    <SketchFrame
      id="sk-diet-seals"
      width={400}
      height={240}
      label="Two food packages on a shelf. One carries a round HALAL certification seal, the other a round KOSHER certification seal."
    >
      <Backwash cx={200} cy={130} rx={194} ry={108} seed={3000} />
      {pack(116, SK.camel, 3010)}
      {pack(284, SK.sky, 3030)}
      <Seal x={116} y={shelf - 38} r={28} word="HALAL" seed={3050} />
      <Seal x={284} y={shelf - 38} r={28} word="KOSHER" seed={3060} />
      <Wash pts={rp([[24, shelf], [376, shelf], [376, shelf + 10], [24, shelf + 10]])} seed={3070} fill={SK.leather} opacity={0.6} />
      <InkLine pts={rp([[24, shelf], [376, shelf], [376, shelf + 10], [24, shelf + 10]])} seed={3071} closed />
    </SketchFrame>
  );
}

/* ==========================================================================
   Social Class and Status Symbols
   ========================================================================== */

/**
 * A structured handbag standing on (x, bottom), `w` wide; `logos` covers it
 * in large monogram badges, otherwise it carries one small clasp.
 */
function Handbag({ x, bottom, w = 90, seed, fill = SK.leather, logos = false }: { x: number; bottom: number; w?: number; seed: number; fill?: string; logos?: boolean }) {
  const h = w * 0.66;
  const body = sharp(rp([[x - w / 2 + 6, bottom - h], [x + w / 2 - 6, bottom - h], [x + w / 2, bottom], [x - w / 2, bottom]]), true, 3);
  return (
    <g>
      <InkLine pts={rp([[x - w * 0.26, bottom - h], [x - w * 0.22, bottom - h - w * 0.3], [x + w * 0.22, bottom - h - w * 0.3], [x + w * 0.26, bottom - h]])} seed={seed} width={2.2} color={SK.ink} />
      <Wash pts={body} seed={seed + 1} fill={fill} opacity={0.75} />
      <InkLine pts={body} seed={seed + 2} closed />
      <InkLine pts={rp([[x - w / 2 + 6, bottom - h + w * 0.18], [x + w / 2 - 6, bottom - h + w * 0.18]])} seed={seed + 3} width={0.9} />
      {logos ? (
        [-0.3, 0, 0.3].map((k, i) => (
          <g key={k}>
            <BrandBadge x={r2(x + k * w)} y={r2(bottom - h * 0.36)} r={r2(w * 0.11)} seed={seed + 10 + i * 3} />
          </g>
        ))
      ) : (
        <Wash pts={rp([[x - 5, bottom - h + w * 0.14], [x + 5, bottom - h + w * 0.14], [x + 5, bottom - h + w * 0.24], [x - 5, bottom - h + w * 0.24]])} seed={seed + 4} fill={SK.ochre} opacity={0.95} dx={0} dy={0} />
      )}
    </g>
  );
}

/**
 * Status symbols: on a velvet display stand, a gold luxury watch beside a
 * structured designer handbag.
 */
export function StatusSymbols() {
  const top = 188;
  return (
    <SketchFrame
      id="sk-status-symbols"
      width={400}
      height={240}
      label="On a dark velvet display stand, a gold luxury watch beside a structured designer handbag."
    >
      <Backwash cx={200} cy={124} rx={194} ry={112} seed={3100} />
      <Wash pts={rp([[40, top], [360, top], [372, top + 30], [28, top + 30]])} seed={3110} fill={SK.charcoal} opacity={0.8} />
      <InkLine pts={rp([[40, top], [360, top], [372, top + 30], [28, top + 30]])} seed={3111} closed />
      <Watch1 x={120} y={125} s={0.9} seed={3120} />
      <Handbag x={268} bottom={top} w={128} seed={3150} />
    </SketchFrame>
  );
}

/**
 * Old money and new money: left, a person in a plain camel jacket carries a
 * small bag with no visible logo (OLD MONEY); right, a person whose coat is
 * covered in large brand badges carries a bag stamped with them and wears dark
 * glasses (NEW MONEY).
 */
export function OldNewMoney() {
  const g = 230;
  const hOld = 184;
  const hNew = 184;
  const handOld = handAt(100, g, hOld, "low", 1);
  const handNew = handAt(300, g, hNew, "low", 1, true);
  const bw = 46;
  const bagBottom = (hy: number) => r2(hy + bw * 0.66 + bw * 0.3);
  const k = hNew / 200;
  return (
    <SketchFrame
      id="sk-old-new-money"
      width={400}
      height={250}
      label="Left, OLD MONEY: a person in a plain camel jacket carries a small leather bag with no visible logo. Right, NEW MONEY: a person in a coat covered in large brand badges carries a bag stamped with the same badges and wears dark glasses."
    >
      <Backwash cx={110} cy={140} rx={100} ry={104} seed={3200} />
      <Backwash cx={290} cy={140} rx={100} ry={104} seed={3201} />
      <SketchText x={100} y={22} anchor="middle" size={11}>
        OLD MONEY
      </SketchText>
      <SketchText x={300} y={22} anchor="middle" size={11}>
        NEW MONEY
      </SketchText>
      <Ground x0={20} x1={380} y={g} seed={3202} />
      <Person x={100} y={g} h={hOld} look={{ ...ELDER, hair: "short", hairTone: SK.stone, wear: SK.camel, outfit: "jacket", legs: SK.charcoal }} arms={["hip", "low"]} seed={3210} />
      <Handbag x={handOld[0]} bottom={bagBottom(handOld[1])} w={bw} seed={3250} />
      <Person x={300} y={g} h={hNew} look={{ ...YOUTH, wear: SK.stone, legs: SK.charcoal }} arms={["hip", "low"]} flip seed={3270} />
      {[
        [-8, -150],
        [8, -134],
        [-6, -112],
        [9, -96],
      ].map(([bx, by], i) => (
        <BrandBadge key={i} x={r2(300 - bx * k)} y={r2(g + by * k)} r={6.5} seed={3300 + i * 4} />
      ))}
      <Wash pts={rp([[300 - 9 * k, g - 189 * k], [300 + 9 * k, g - 189 * k], [300 + 9 * k, g - 184 * k], [300 - 9 * k, g - 184 * k]])} seed={3320} fill={SK.ink} opacity={0.9} dx={0} dy={0} />
      <Handbag x={handNew[0]} bottom={bagBottom(handNew[1])} w={bw} seed={3330} fill={SK.stone} logos />
    </SketchFrame>
  );
}

/* ==========================================================================
   Conspicuous Consumption and Income Inequality
   ========================================================================== */

/** A sweater laid flat, centred on (x, y), about 150 wide at s = 1. */
function Sweater({ x, y, s = 1, seed, fill }: { x: number; y: number; s?: number; seed: number; fill: string }) {
  const body = at(x, y, [[-30, -66], [-12, -70], [0, -62], [12, -70], [30, -66], [74, -30], [62, -12], [42, -30], [42, 66], [-42, 66], [-42, -30], [-62, -12], [-74, -30]], s);
  return (
    <g>
      <Wash pts={body} seed={seed} fill={fill} opacity={0.65} />
      <InkLine pts={body} seed={seed + 1} closed />
      <InkLine pts={at(x, y, [[-12, -70], [0, -56], [12, -70]], s)} seed={seed + 2} width={1} />
      <InkLine pts={at(x, y, [[-42, 56], [42, 56]], s)} seed={seed + 3} width={0.8} />
    </g>
  );
}

/**
 * Loud and quiet: two sweaters laid flat. The left one carries a huge brand
 * badge across the chest; the right one, in a finer knit, only a tiny badge
 * stitched near the hem.
 */
export function LoudQuiet() {
  return (
    <SketchFrame
      id="sk-loud-quiet"
      width={400}
      height={220}
      label="Two sweaters laid flat. The left one carries a huge brand badge across the chest. The right one carries only a tiny badge stitched near the hem."
    >
      <Backwash cx={200} cy={112} rx={194} ry={104} seed={3400} />
      <Sweater x={104} y={110} s={1.05} seed={3410} fill={SK.camel} />
      <BrandBadge x={104} y={100} r={34} seed={3420} />
      <Sweater x={296} y={110} s={1.05} seed={3430} fill={SK.charcoal} />
      <BrandBadge x={326} y={164} r={5} seed={3440} />
    </SketchFrame>
  );
}

/** A shopfront from x to x + w on ground g, its awning washed `awning`. */
function Shopfront({ x, w, g, seed, awning, sign }: { x: number; w: number; g: number; seed: number; awning: string; sign?: React.ReactNode }) {
  const wall = rp([[x, 60], [x + w, 60], [x + w, g], [x, g]]);
  const glass = rp([[x + 12, 108], [x + w - 12, 108], [x + w - 12, g - 30], [x + 12, g - 30]]);
  const awn = rp([[x - 6, 84], [x + w + 6, 84], [x + w, 104], [x, 104]]);
  return (
    <g>
      <Wash pts={wall} seed={seed} fill={SK.stone} opacity={0.6} />
      <InkLine pts={wall} seed={seed + 1} closed />
      <Wash pts={glass} seed={seed + 2} fill={SK.sky} opacity={0.6} />
      <InkLine pts={glass} seed={seed + 3} closed width={1} />
      <Wash pts={awn} seed={seed + 4} fill={awning} opacity={0.8} />
      <InkLine pts={awn} seed={seed + 5} closed width={1.1} />
      {sign}
    </g>
  );
}

/**
 * Both ends grow, the middle shrinks: three shops in a row. Left, a luxury
 * boutique with two shoppers leaving with bags; middle, a mid-priced store
 * with an empty window and a CLOSING DOWN sign; right, a discount store with
 * a −50% banner and two shoppers with bags.
 */
export function ThreeStores() {
  const g = 214;
  return (
    <SketchFrame
      id="sk-three-stores"
      width={520}
      height={240}
      label="Three shops in a row. Left: a luxury boutique with a black awning and two shoppers leaving with bags. Middle: a mid-priced store with an empty window and a CLOSING DOWN sign. Right: a discount store with a minus 50 percent banner and two shoppers with bags."
    >
      <Backwash cx={260} cy={130} rx={254} ry={108} seed={3500} />
      <Ground x0={10} x1={510} y={g} seed={3501} />
      <Shopfront x={20} w={140} g={g} seed={3510} awning={SK.charcoal} />
      <Shopfront
        x={190}
        w={140}
        g={g}
        seed={3530}
        awning={SK.stone}
        sign={
          <g>
            <Paper pts={rp([[208, 124], [312, 124], [312, 150], [208, 150]])} seed={3540} />
            <InkLine pts={rp([[208, 124], [312, 124], [312, 150], [208, 150]])} seed={3541} closed width={1} />
            <SketchText x={260} y={141} anchor="middle" size={9.5}>
              CLOSING DOWN
            </SketchText>
            <PencilLine pts={rp([[214, 172], [306, 172]])} seed={3542} />
            <PencilLine pts={sharp(rp([[232, 172], [252, 172], [252, 154], [232, 154]]))} seed={3543} closed />
            <PencilLine pts={sharp(rp([[268, 172], [288, 172], [288, 160], [268, 160]]))} seed={3544} closed />
          </g>
        }
      />
      <Shopfront
        x={360}
        w={140}
        g={g}
        seed={3550}
        awning={SK.ochre}
        sign={
          <g>
            <Paper pts={rp([[394, 64], [466, 64], [466, 82], [394, 82]])} seed={3560} />
            <InkLine pts={rp([[394, 64], [466, 64], [466, 82], [394, 82]])} seed={3561} closed width={1} />
            <SketchText x={430} y={78} anchor="middle" size={13} serif>
              −50%
            </SketchText>
          </g>
        }
      />
      <SketchText x={90} y={78} anchor="middle" size={13} serif>
        MAISON
      </SketchText>
      {/* shoppers */}
      {[
        [56, SK.charcoal, false],
        [128, SK.charcoal, true],
        [396, SK.ochre, false],
        [468, SK.ochre, true],
      ].map(([x, fill, flip], i) => {
        const hx = x as number;
        const hand = handAt(hx, g, 104, "carry", 1, flip as boolean);
        return (
          <g key={i}>
            <Person x={hx} y={g} h={104} look={[CONSUMER, FRIEND, YOUTH, ELDER][i]} arms={["down", "carry"]} flip={flip as boolean} seed={3600 + i * 60} />
            <Bag x={hand[0]} y={hand[1]} w={16} badge={false} fill={fill as string} seed={3800 + i * 5} />
          </g>
        );
      })}
    </SketchFrame>
  );
}

/**
 * Status through experiences: a boarding pass and a fine-dining tasting menu
 * card laid on a table, with a passport.
 */
export function Experiences() {
  const pass = sharp(rp([[26, 70], [196, 52], [204, 122], [34, 140]]), true, 3);
  const menu = sharp(rp([[176, 40], [272, 46], [264, 210], [168, 204]]), true, 3);
  return (
    <SketchFrame
      id="sk-experiences"
      width={300}
      height={230}
      label="On a table, a boarding pass with a plane drawn on it, a passport, and a fine-dining tasting menu card with seven courses listed."
    >
      <Backwash cx={150} cy={120} rx={144} ry={106} seed={3900} />
      <Paper pts={menu} seed={3910} />
      <InkLine pts={menu} seed={3911} closed />
      <SketchText x={220} y={70} anchor="middle" size={12} serif>
        MENU
      </SketchText>
      <Scribble x={190} y={92} w={60} n={7} gap={14} last={0.7} seed={3912} />
      <Wash pts={sharp(rp([[50, 150], [118, 144], [124, 212], [56, 218]]), true, 3)} seed={3920} fill={SK.charcoal} opacity={0.7} />
      <InkLine pts={sharp(rp([[50, 150], [118, 144], [124, 212], [56, 218]]), true, 3)} seed={3921} closed />
      <InkLine pts={rp(blobPts(87, 180, 12, 12, 3922, 12, 0.04))} seed={3922} closed width={1} color={SK.ochre} />
      <Paper pts={pass} seed={3930} />
      <Wash pts={pass} seed={3931} fill={SK.sky} opacity={0.35} />
      <InkLine pts={pass} seed={3932} closed />
      <PencilLine pts={rp([[150, 60], [156, 128]])} seed={3933} dash="3 4" />
      <path d={`M60 100 l30 -4 l6 -10 l4 0 l-2 10 l18 -2 l4 -6 l3 0 l-1 7 l-1 7 l-3 0 l-4 -5 l-18 2 l4 10 l-4 0 l-8 -9 l-30 4 z`} fill={SK.ink} opacity={0.85} />
      <Scribble x={52} y={120} w={80} n={1} last={1} seed={3934} />
      <Scribble x={164} y={86} w={26} n={3} gap={11} last={0.8} seed={3936} />
    </SketchFrame>
  );
}

/**
 * Status through knowledge and taste: a pour-over coffee set: a gooseneck
 * kettle pours into a cone dripper on a glass carafe, which stands on a
 * scale reading 18.0 g.
 */
export function PourOver() {
  const scaleTop = 186;
  const carafe = rp([[150, 112], [196, 112], [212, 160], [208, scaleTop], [138, scaleTop], [134, 160]]);
  const cone = rp([[136, 82], [210, 82], [184, 114], [162, 114]]);
  const kettle = rp(blobPts(70, 96, 34, 28, 4000, 14, 0.04));
  return (
    <SketchFrame
      id="sk-pour-over"
      width={300}
      height={230}
      label="A pour-over coffee set: a gooseneck kettle pours a thin stream into a cone dripper on a glass carafe, which stands on a digital scale reading 18.0 g."
    >
      <Backwash cx={150} cy={120} rx={144} ry={106} seed={3999} />
      {/* kettle */}
      <Wash pts={kettle} seed={4001} fill={SK.charcoal} opacity={0.7} />
      <InkLine pts={kettle} seed={4002} closed />
      <InkLine pts={rp([[96, 108], [118, 96], [128, 60], [140, 54]])} seed={4003} width={3} />
      <InkLine pts={rp([[44, 82], [30, 76], [28, 110], [44, 112]])} seed={4004} width={1.6} />
      <InkLine pts={rp([[52, 72], [86, 70]])} seed={4006} width={1.2} />
      <InkLine pts={rp(blobPts(70, 66, 5, 4, 4007, 8, 0.05))} seed={4007} closed width={1.1} />
      <InkLine pts={rp([[140, 56], [158, 80]])} seed={4005} width={1} color={SK.leather} />
      {/* dripper and carafe */}
      <Paper pts={cone} seed={4010} />
      <InkLine pts={cone} seed={4011} closed />
      <Wash pts={carafe} seed={4012} fill={SK.sky} opacity={0.55} />
      <Wash pts={rp([[138, 160], [208, 160], [208, scaleTop], [138, scaleTop]])} seed={4013} fill={SK.leather} opacity={0.7} dx={0} dy={0} />
      <InkLine pts={carafe} seed={4014} closed />
      {/* scale */}
      <Wash pts={rp([[96, scaleTop], [270, scaleTop], [274, scaleTop + 24], [92, scaleTop + 24]])} seed={4020} fill={SK.stone} opacity={0.9} />
      <InkLine pts={rp([[96, scaleTop], [270, scaleTop], [274, scaleTop + 24], [92, scaleTop + 24]])} seed={4021} closed />
      <Paper pts={rp([[220, scaleTop + 5], [264, scaleTop + 5], [264, scaleTop + 20], [220, scaleTop + 20]])} seed={4022} />
      <InkLine pts={rp([[220, scaleTop + 5], [264, scaleTop + 5], [264, scaleTop + 20], [220, scaleTop + 20]])} seed={4023} closed width={1} />
      <SketchText x={242} y={scaleTop + 16.5} anchor="middle" size={9.5}>
        18.0 g
      </SketchText>
    </SketchFrame>
  );
}

/* ==========================================================================
   Consumer Ethnocentrism and Country of Origin
   ========================================================================== */

/** A paper label centred on (x, y) reading `text`, sized to the text. */
function Label({ x, y, text, seed, size = 10 }: { x: number; y: number; text: string; seed: number; size?: number }) {
  const w = r2(text.length * size * 0.78 + 16);
  const pts = sharp(rp([[x - w / 2, y - 11], [x + w / 2, y - 11], [x + w / 2, y + 11], [x - w / 2, y + 11]]), true, 2);
  return (
    <g>
      <Paper pts={pts} seed={seed} />
      <InkLine pts={pts} seed={seed + 1} closed width={1} />
      <SketchText x={x} y={r2(y + size * 0.36)} anchor="middle" size={size}>
        {text}
      </SketchText>
    </g>
  );
}

/**
 * The country-of-origin effect: three products, each with the label of the
 * country consumers link with quality in that category: a car (MADE IN
 * GERMANY), a perfume (MADE IN FRANCE) and a watch (SWISS MADE).
 */
export function MadeIn() {
  const g = 180;
  return (
    <SketchFrame
      id="sk-made-in"
      width={520}
      height={230}
      label="Three products with origin labels: a car labelled MADE IN GERMANY, a perfume bottle labelled MADE IN FRANCE, and a wristwatch labelled SWISS MADE."
    >
      <Backwash cx={260} cy={116} rx={254} ry={108} seed={4100} />
      <InkLine pts={rp([[16, g + 1], [504, g]])} seed={4101} width={1} />
      <Car3 x={96} y={g} s={1.15} seed={4110} fill={SK.charcoal} />
      <Perfume1 x={270} bottom={g} s={1.5} seed={4130} />
      <Watch1 x={430} y={106} s={0.95} seed={4150} />
      <Label x={96} y={g + 26} text="MADE IN GERMANY" seed={4170} />
      <Label x={270} y={g + 26} text="MADE IN FRANCE" seed={4175} />
      <Label x={430} y={g + 26} text="SWISS MADE" seed={4180} />
    </SketchFrame>
  );
}

/** A jar of jam standing on (x, bottom); `flag` puts the home flag on its label. */
function JamJar({ x, bottom, seed, lit = false, flag = false }: { x: number; bottom: number; seed: number; lit?: boolean; flag?: boolean }) {
  const body = sharp(rp([[x - 24, bottom - 62], [x + 24, bottom - 62], [x + 26, bottom], [x - 26, bottom]]), true, 4);
  const lid = sharp(rp([[x - 26, bottom - 74], [x + 26, bottom - 74], [x + 26, bottom - 62], [x - 26, bottom - 62]]), true, 2);
  return (
    <g>
      <Wash pts={body} seed={seed} fill={lit ? SK.teal : SK.blush} opacity={lit ? 0.6 : 0.8} />
      <InkLine pts={body} seed={seed + 1} closed />
      <Wash pts={lid} seed={seed + 2} fill={SK.camel} opacity={0.8} />
      <InkLine pts={lid} seed={seed + 3} closed width={1.1} />
      <Paper pts={rp([[x - 18, bottom - 46], [x + 18, bottom - 46], [x + 18, bottom - 18], [x - 18, bottom - 18]])} seed={seed + 4} />
      <InkLine pts={rp([[x - 18, bottom - 46], [x + 18, bottom - 46], [x + 18, bottom - 18], [x - 18, bottom - 18]])} seed={seed + 5} closed width={0.9} />
      {flag ? <FlagPrint x={x - 12} y={bottom - 41} w={24} h={18} seed={seed + 6} /> : <Scribble x={x - 12} y={bottom - 36} w={24} n={2} gap={8} last={0.7} seed={seed + 6} />}
    </g>
  );
}

/**
 * An ethnocentric choice: on a shelf, a domestic jam with the home flag on
 * its label at $4.49 and an imported jam at $3.29 with five stars. The
 * shopper reaches for the domestic jar, lit teal.
 */
export function HomeJar() {
  const shelf = 150;
  const g = 230;
  return (
    <SketchFrame
      id="sk-home-jar"
      width={400}
      height={250}
      label="On a store shelf, a domestic jam with the home flag on its label, priced $4.49, beside an imported jam priced $3.29 with five rating stars. A shopper reaches for the domestic jar, which is lit teal."
    >
      <Backwash cx={200} cy={134} rx={194} ry={112} seed={4200} />
      <Ground x0={20} x1={380} y={g} seed={4201} />
      <Person x={100} y={g} h={186} look={CONSUMER} arms={["hip", "reach"]} seed={4210} />
      <JamJar x={168} bottom={shelf} seed={4250} flag lit />
      <JamJar x={290} bottom={shelf} seed={4270} />
      <Stars x={252} y={56} n={5} r={7} gap={19} seed={4290} />
      <Wash pts={rp([[120, shelf], [376, shelf], [376, shelf + 10], [120, shelf + 10]])} seed={4300} fill={SK.leather} opacity={0.6} />
      <InkLine pts={rp([[120, shelf], [376, shelf], [376, shelf + 10], [120, shelf + 10]])} seed={4301} closed />
      <InkLine pts={rp([[132, shelf + 10], [132, g]])} seed={4302} width={1.2} />
      <InkLine pts={rp([[364, shelf + 10], [364, g]])} seed={4303} width={1.2} />
      <Label x={168} y={shelf + 28} text="$4.49" seed={4310} size={12} />
      <Label x={290} y={shelf + 28} text="$3.29" seed={4315} size={12} />
    </SketchFrame>
  );
}

/**
 * The CETSCALE as a questionnaire: a printed sheet with item lines, each
 * answered on a 1-to-7 row of boxes from DISAGREE to AGREE; one row is
 * ticked at 6.
 */
export function ScaleSheet() {
  const sheet = sharp(rp([[30, 14], [370, 14], [370, 226], [30, 226]]), true, 2);
  const rows = [58, 124, 190];
  const picks = [6, 4, 7];
  return (
    <SketchFrame
      id="sk-scale-sheet"
      width={400}
      height={240}
      label="A printed questionnaire sheet with three statements, each answered on a row of seven boxes numbered 1 to 7 from DISAGREE to AGREE; the answers ticked are 6, 4 and 7."
    >
      <Backwash cx={200} cy={120} rx={194} ry={114} seed={4400} />
      <Paper pts={sheet} seed={4401} />
      <InkLine pts={sheet} seed={4402} closed width={1.2} />
      {rows.map((y, r) => (
        <g key={y}>
          <SketchText x={46} y={y - 18} size={11}>
            {`${r + 1}.`}
          </SketchText>
          <Scribble x={66} y={y - 22} w={280} n={1} last={r === 1 ? 0.7 : 0.95} seed={4410 + r} />
          {Array.from({ length: 7 }, (_, i) => {
            const bx = 112 + i * 30;
            const box = sharp(rp([[bx - 9, y - 5], [bx + 9, y - 5], [bx + 9, y + 13], [bx - 9, y + 13]]), true, 1);
            return (
              <g key={i}>
                <InkLine pts={box} seed={4420 + r * 10 + i} closed width={0.9} />
                {r === 0 ? (
                  <SketchText x={bx} y={y - 8} anchor="middle" size={8.5} fill={SK.pencil}>
                    {String(i + 1)}
                  </SketchText>
                ) : null}
                {picks[r] === i + 1 ? <InkLine pts={rp([[bx - 6, y + 4], [bx - 1, y + 10], [bx + 8, y - 4]])} seed={4500 + r} width={2} amp={0.2} /> : null}
              </g>
            );
          })}
          <SketchText x={98} y={y + 8} anchor="end" size={8.5} fill={SK.pencil}>
            DISAGREE
          </SketchText>
          <SketchText x={310} y={y + 8} size={8.5} fill={SK.pencil}>
            AGREE
          </SketchText>
        </g>
      ))}
    </SketchFrame>
  );
}

/* ==========================================================================
   Cultural Bias in AI Models
   ========================================================================== */

type ModelId = "llama" | "gemma" | "qwen" | "aya" | "ministral";
type Target = "USA" | "CANADA" | "CHINA" | "FRANCE";
type BiasView = "scores" | "pairing";

/**
 * Wadi, Ghodrat & Philp (2026), Table 2 and Figure 5: the expected CETSCALE
 * score (17 to 119) is the grand mean plus the model effect, the target
 * effect and their interaction. The interaction alone is the country-pairing
 * (country-of-origin) bias.
 */
const GRAND = 66.25;
const MODELS: Record<ModelId, { label: string; home: Target; effect: number }> = {
  llama: { label: "Llama 3.3 (USA)", home: "USA", effect: 0.31 },
  gemma: { label: "Gemma 3 (USA)", home: "USA", effect: -11.99 },
  qwen: { label: "Qwen3 (China)", home: "CHINA", effect: -14.63 },
  aya: { label: "Aya Expanse (Canada)", home: "CANADA", effect: 21.19 },
  ministral: { label: "Ministral (France)", home: "FRANCE", effect: 5.11 },
};
const TARGETS: { id: Target; effect: number }[] = [
  { id: "USA", effect: 2.84 },
  { id: "CANADA", effect: 4.62 },
  { id: "CHINA", effect: -6.46 },
  { id: "FRANCE", effect: -1.0 },
];
const PAIRING: Record<Target, Record<ModelId, number>> = {
  CANADA: { aya: -3.77, gemma: 2.14, llama: 5.2, ministral: -2.99, qwen: -0.57 },
  CHINA: { aya: 5.35, gemma: -5.4, llama: -4.29, ministral: 4.54, qwen: -0.2 },
  FRANCE: { aya: -0.39, gemma: 0.05, llama: -3.5, ministral: 2.45, qwen: 1.39 },
  USA: { aya: -1.18, gemma: 3.21, llama: 2.59, ministral: -4.0, qwen: -0.61 },
};
const scoreOf = (m: ModelId, t: Target) => GRAND + MODELS[m].effect + TARGETS.find((x) => x.id === t)!.effect + PAIRING[t][m];

/**
 * Consumer ethnocentrism in AI models as an instrument (real data). The
 * student picks one of five models; four bars give its expected CETSCALE
 * score when the statements are about each country, the bar for the model's
 * home country lit teal. A second view keeps only the country-pairing shift.
 */
export function ModelEthnocentrism() {
  const [m, setM] = React.useState<ModelId>("llama");
  const [view, setView] = React.useState<BiasView>("scores");
  const xs0 = 208;
  const xs1 = 560;
  const S = (v: number) => r2(xs0 + ((xs1 - xs0) * (v - 17)) / (119 - 17));
  const zero = 396;
  const P = (v: number) => r2(zero + v * 25);
  const model = MODELS[m];
  const rowY = (i: number) => 92 + i * 52;
  const label =
    view === "scores"
      ? `${model.label}: expected CETSCALE scores (17 to 119; higher is more ethnocentric) when the statements are about each country: ` +
        TARGETS.map((t) => `${t.id.toLowerCase()} ${scoreOf(m, t.id).toFixed(1)}`).join(", ") +
        ` (Wadi, Ghodrat & Philp, 2026). The home-country bar is lit teal.`
      : `${model.label}: country-pairing shift in CETSCALE points, after removing the model's overall level and each country's overall level: ` +
        TARGETS.map((t) => `${t.id.toLowerCase()} ${PAIRING[t.id][m] > 0 ? "+" : ""}${PAIRING[t.id][m].toFixed(1)}`).join(", ") +
        ` (Wadi, Ghodrat & Philp, 2026).`;
  return (
    <>
      <SketchFrame id="sk-model-ethno" width={620} height={320} label={label}>
        <Backwash cx={310} cy={160} rx={304} ry={154} seed={4600} />
        <Agent x={56} y={238} s={1.4} seed={4610} />
        <SketchText x={56} y={266} anchor="middle" size={11}>
          {model.label.split(" (")[0].toUpperCase()}
        </SketchText>
        <SketchText x={56} y={283} anchor="middle" size={10} fill={SK.pencil}>
          {`MADE IN ${model.home === "USA" ? "THE USA" : model.home}`}
        </SketchText>
        <SketchText x={view === "scores" ? S(68) : zero} y={40} anchor="middle" size={12}>
          {view === "scores" ? "CETSCALE SCORE" : "COUNTRY-PAIRING SHIFT"}
        </SketchText>
        {view === "scores" ? (
          <g>
            <InkLine pts={rp([[xs0, 64], [xs0, 266]])} seed={4620} width={1} />
            <SketchText x={xs0} y={286} anchor="middle" size={10.5} fill={SK.pencil}>
              17
            </SketchText>
            <SketchText x={xs1} y={286} anchor="middle" size={10.5} fill={SK.pencil}>
              119
            </SketchText>
            <SketchText x={S(68)} y={304} anchor="middle" size={10.5} fill={SK.pencil}>
              MORE ETHNOCENTRIC →
            </SketchText>
            <InkLine pts={rp([[xs0, 266], [xs1, 266]])} seed={4621} width={1} />
            <InkLine pts={rp([[xs1, 262], [xs1, 270]])} seed={4623} width={1} />
          </g>
        ) : (
          <g>
            <InkLine pts={rp([[zero, 64], [zero, 266]])} seed={4622} width={1} />
            <InkLine pts={rp([[P(-6.5), 266], [P(6.5), 266]])} seed={4624} width={1} />
            <SketchText x={zero} y={286} anchor="middle" size={10.5} fill={SK.pencil}>
              0
            </SketchText>
            <SketchText x={P(-6)} y={286} anchor="middle" size={10.5} fill={SK.pencil}>
              ← LESS
            </SketchText>
            <SketchText x={P(6)} y={286} anchor="middle" size={10.5} fill={SK.pencil}>
              MORE →
            </SketchText>
          </g>
        )}
        {TARGETS.map((t, i) => {
          const y = rowY(i);
          const home = t.id === model.home;
          const v = view === "scores" ? scoreOf(m, t.id) : PAIRING[t.id][m];
          const a = view === "scores" ? xs0 : Math.min(zero, P(v));
          const b = view === "scores" ? S(v) : Math.max(zero, P(v));
          const bar = rp([[a, y - 15], [b, y - 15], [b, y + 15], [a, y + 15]]);
          const txt = view === "scores" ? v.toFixed(1) : `${v > 0 ? "+" : ""}${v.toFixed(1)}`;
          const tx = view === "scores" ? b + 8 : v >= 0 ? b + 8 : a - 8;
          return (
            <g key={t.id}>
              <SketchText x={view === "scores" ? xs0 - 10 : 176} y={y + 4.5} anchor="end" size={12.5}>
                {t.id}
              </SketchText>
              {Math.abs(b - a) > 1 ? <Wash pts={bar} seed={4630 + i} fill={home ? SK.teal : SK.camel} opacity={home ? 0.75 : 0.6} dx={0} dy={0} /> : null}
              {Math.abs(b - a) > 1 ? <InkLine pts={sharp(bar, true, 1.5)} seed={4640 + i} closed width={1} /> : null}
              <SketchText x={r2(tx)} y={y + 4.5} anchor={view === "pairing" && v < 0 ? "end" : "start"} size={12.5}>
                {txt}
              </SketchText>
            </g>
          );
        })}
      </SketchFrame>
      <PlateToggle<ModelId>
        options={(Object.keys(MODELS) as ModelId[]).map((id) => ({ id, label: MODELS[id].label }))}
        value={m}
        onChange={setM}
      />
      <PlateToggle<BiasView>
        options={[
          { id: "scores", label: "Scores" },
          { id: "pairing", label: "Country-pairing shift" },
        ]}
        value={view}
        onChange={setView}
      />
    </>
  );
}

/* ==========================================================================
   Discussion: Culture in the Cart
   ========================================================================== */

/**
 * Culture in the cart: a shopping basket holding a teapot and a wrapped gift,
 * and beside it the AI assistant, whose speech bubble shows the same teapot
 * with a question mark.
 */
export function CultureCart() {
  const g = 250;
  const basket = rp([[40, 150], [250, 150], [232, g], [58, g]]);
  return (
    <SketchFrame
      id="sk-culture-cart"
      width={420}
      height={280}
      label="A wicker shopping basket holding a teapot and a wrapped gift. Beside it, the AI assistant's speech bubble shows the same teapot with a question mark."
    >
      <Backwash cx={210} cy={150} rx={204} ry={124} seed={4700} />
      <Teapot x={104} bottom={168} s={1.25} seed={4710} />
      <Gift x={196} bottom={164} w={70} h={58} seed={4720} />
      <Wash pts={basket} seed={4730} fill={SK.camel} opacity={0.75} />
      {[0, 1, 2].map((i) => (
        <InkLine key={i} pts={rp([[44 + i * 3, 178 + i * 24], [246 - i * 6, 178 + i * 24]])} seed={4731 + i} width={0.8} />
      ))}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <InkLine key={i} pts={rp([[66 + i * 32, 150], [72 + i * 28.5, g]])} seed={4735 + i} width={0.8} />
      ))}
      <InkLine pts={basket} seed={4742} closed />
      <Agent x={344} y={g} s={1.25} seed={4750} />
      <SpeechBubble x={340} y={66} w={110} h={70} tx={340} ty={136} seed={4760} />
      <Teapot x={332} bottom={90} s={0.62} seed={4770} />
      <SketchText x={378} y={84} anchor="middle" size={20} serif>
        ?
      </SketchText>
    </SketchFrame>
  );
}
