/* ==========================================================================
   Consumer Behavior · Week 01 — figures
   --------------------------------------------------------------------------
   Editorial Sketch plates (ink and loose watercolour on warm paper): a
   receipt, an iceberg, a chain, a consumption cycle, a parent and a baby,
   two walks along the same shelf, four pulls on one shopper, a branching
   need, one shopper in four roles, a family car, a crowd sorted into
   groups, a temple of segments, and the ethical border. The style rules
   live in ../CLAUDE.md; shared marks come from ../_visuals.

   Fixed cast for this week:
     · Person: every human, one fashion-illustration figure. SHOPPER (bob,
       camel coat) is the one shopper who follows the week: the real buyer,
       every role, the marionette. Children use `headScale`; the baby in the
       high chair is the shared Baby.
     · Crowds are Isotype: the same figure in four looks (KINDS), drawn at
       full size and scaled down (Figure) so the washes read.
     · StageGlyph: magnifier (prepurchase), bag (purchase), star rating
       (postpurchase), on the cycle and again on the discussion plate.

   Colour roles: teal is the one thing chosen, lit or ticked on a plate (the
   Receipt ticks, the lit link, the best pick, the family car, the
   pre-ticked box); ochre a highlight or count; pencil only the Receipt's
   PRODUCT line, the thing not bought.
   ========================================================================== */

import React from "react";
import {
  SK,
  type Pt,
  seeded,
  wobble,
  blobPts,
  InkLine,
  PencilLine,
  Wash,
  Paper,
  SketchFrame,
  SketchText,
  r2,
} from "../_visuals/sketch";
import {
  Backwash,
  Baby,
  Bag,
  Cart,
  Clock,
  Eye,
  Ground,
  Heart,
  MapPin,
  Megaphone,
  Magnifier,
  PayCard,
  Person,
  SketchArrow,
  SpeechBubble,
  Star,
  Stars,
  at,
  curvePts,
  handAt,
  rp,
  sharp,
  type Look,
} from "../_visuals/sketch-cast";

/* ==========================================================================
   TITLE · a receipt that did not sell a product
   Drawn in the editorial-sketch style: wobbly doubled ink, loose watercolour
   washes set off-register, and faint dashed pencil for what was not bought.
   ========================================================================== */

export function Receipt() {
  const W = 420;
  const H = 500;
  const left = 70;
  const right = 350;
  const top = 34;
  const bottom = 446;
  const teeth = 14;
  const step = (right - left) / teeth;
  const outline: Pt[] = [
    [left, top],
    [right, top],
    [right, bottom],
  ];
  for (let i = 0; i < teeth; i++) {
    const x0 = right - i * step;
    outline.push([x0 - step / 2, bottom - 9], [x0 - step, bottom]);
  }
  const rnd = seeded(41);
  const bars = Array.from({ length: 16 }, () => 1 + Math.round(rnd() * 3));
  let bx = 102;
  const items = ["FEELINGS", "PROBLEMS", "SOCIAL NEEDS"];
  // a ragged brushstroke patch, behind the receipt
  const blob = blobPts(206, 236, 180, 186, 41);
  return (
    <SketchFrame
      id="sk-receipt"
      width={W}
      height={H}
      label="A sketched till receipt: the line for a product is struck through, and the lines bought are feelings, problems and social needs, each ticked."
    >
      {/* one pale blush wash behind the subject */}
      <Wash seed={5} fill={SK.blush} opacity={0.55} dx={0} dy={0} pts={blob} />

      {/* a few scratchy strokes and an earth wash for the ground */}
      <Wash
        seed={9}
        fill={SK.earth}
        opacity={0.5}
        dx={0}
        dy={0}
        pts={[
          [90, 468],
          [210, 460],
          [340, 466],
          [320, 480],
          [180, 482],
          [104, 478],
        ]}
      />
      <InkLine
        pts={[
          [82, 470],
          [168, 466],
        ]}
        seed={11}
        width={0.9}
      />
      <InkLine
        pts={[
          [196, 472],
          [320, 468],
        ]}
        seed={12}
        width={0.9}
      />
      <InkLine
        pts={[
          [256, 478],
          [354, 475],
        ]}
        seed={13}
        width={0.8}
      />

      {/* the receipt: cream paper with a faint grain, then its ink edge */}
      <Paper pts={outline} seed={21} />
      <InkLine pts={outline} seed={22} amp={1.3} closed />

      <g transform="translate(20 0)">
        <SketchText x={190} y={84} anchor="middle" size={26} serif>
          Receipt
        </SketchText>
        <PencilLine
          pts={[
            [74, 104],
            [306, 104],
          ]}
          seed={31}
        />

        {/* the line people expect: left in pencil, then struck out in ink */}
        <SketchText x={74} y={142} fill={SK.pencil}>
          PRODUCT
        </SketchText>
        <InkLine
          pts={[
            [66, 137],
            [314, 135],
          ]}
          seed={33}
          width={1.6}
        />
        <InkLine
          pts={[
            [294, 128],
            [306, 141],
          ]}
          seed={34}
          width={1.3}
          amp={0.4}
        />
        <InkLine
          pts={[
            [306, 128],
            [293, 141],
          ]}
          seed={35}
          width={1.3}
          amp={0.4}
        />

        {/* what was actually bought, each with a teal tick */}
        {items.map((t, i) => {
          const y = 192 + i * 44;
          const lx = 74 + t.length * 11.2 + 10;
          return (
            <g key={t}>
              <SketchText x={74} y={y}>
                {t}
              </SketchText>
              <PencilLine
                pts={[
                  [lx, y - 3],
                  [270, y - 3],
                ]}
                seed={40 + i}
                width={1.3}
                dash="1 5"
              />
              <path
                d={wobble(
                  [
                    [283, y - 7],
                    [290, y + 1],
                    [305, y - 15],
                  ],
                  50 + i,
                  0.6,
                  6,
                )}
                fill="none"
                stroke={SK.teal}
                strokeWidth={2.6}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          );
        })}

        <PencilLine
          pts={[
            [74, 312],
            [306, 312],
          ]}
          seed={61}
        />
        <SketchText x={74} y={342} size={12}>
          SOLUTIONS
        </SketchText>
        <Wash
          seed={63}
          fill={SK.ochre}
          opacity={0.55}
          dx={1}
          dy={-1}
          pts={[
            [288, 324],
            [308, 322],
            [312, 344],
            [290, 348],
          ]}
        />
        <SketchText x={306} y={342} anchor="end" size={12}>
          3
        </SketchText>

        {/* a quick barcode: a handful of loose strokes */}
        {bars.map((b, i) => {
          const x = bx;
          bx += b * 2.4 + 6;
          return (
            <path
              key={i}
              d={wobble(
                [
                  [x, 370],
                  [x + 0.6, 414],
                ],
                70 + i,
                0.5,
                12,
              )}
              fill="none"
              stroke={SK.ink}
              strokeWidth={b * 1.1}
              strokeLinecap="round"
              opacity={0.9}
            />
          );
        })}
      </g>
    </SketchFrame>
  );
}

/* ==========================================================================
   TIP OF THE ICEBERG
   ========================================================================== */

/** Points of a straight-segment path string ("M x y L x y … Z"). */
const pathPts = (d: string): Pt[] =>
  (d.match(/-?\d+(\.\d+)?/g) ?? []).map(Number).reduce<Pt[]>((acc, n, i, arr) => (i % 2 ? acc : [...acc, [n, arr[i + 1]] as Pt]), []);

export function Iceberg() {
  const water = 150;
  const tip = pathPts("M352 150L371 122L384 96L398 62L409 84L418 92L432 120L450 150");
  const mass = pathPts(
    "M352 150L302 160L258 182L226 200L200 232L166 256L152 294L134 328L158 362L184 392L234 404L288 426L350 430L408 446L468 432L528 428L582 404L624 384L650 348L676 318L664 280L648 248L616 218L584 198L540 178L494 160L450 150",
  );
  const sea: Pt[] = [[24, 152], [390, 150], [758, 153], [752, 452], [400, 456], [30, 450]];
  return (
    <SketchFrame
      id="sk-iceberg"
      width={800}
      height={460}
      label="A sketched iceberg in pale water. Above the waterline, a small tip marked just shopping, one second at the register. Below it, a far larger mass: before the sale, noticing problems, searching options and asking friends; after the sale, using the item, feeling happy or regretful and telling others. A bracket down the whole iceberg reads consumer behavior."
    >
      {/* the sea, then the ice below the surface: paper under a thin veil of water */}
      <Wash pts={sea} seed={102} fill={SK.sky} opacity={0.6} dx={0} dy={0} />
      <Paper pts={mass} seed={101} />
      <Wash pts={mass} seed={109} fill={SK.sky} opacity={0.22} dx={4} dy={3} />
      <InkLine pts={sharp(mass, true, 2)} seed={103} closed />
      <InkLine pts={[[398, 158], [388, 214], [362, 262]]} seed={116} width={0.8} />
      <InkLine pts={[[606, 222], [630, 262], [644, 300]]} seed={117} width={0.8} />

      {/* the tip above the water, the only part most people see */}
      <Paper pts={tip} seed={104} />
      <Wash pts={tip} seed={105} fill={SK.blush} opacity={0.75} dx={2} dy={1} />
      <InkLine pts={sharp(tip, false, 1.5)} seed={106} />
      <InkLine pts={[[398, 66], [392, 112], [380, 146]]} seed={118} width={0.8} />

      {/* the surface, broken where the ice comes through, and a few ripples */}
      <InkLine pts={[[20, water], [346, water + 1]]} seed={107} />
      <InkLine pts={[[456, water], [760, water - 1]]} seed={108} />
      {[70, 210, 560, 690].map((x, i) => (
        <InkLine key={x} pts={[[x, water - 8], [x + 9, water - 12], [x + 18, water - 8], [x + 27, water - 11]]} seed={110 + i} width={0.8} />
      ))}

      {/* what most people see */}
      <InkLine pts={[[296, 98], [376, 110]]} seed={115} width={0.8} />
      <SketchText x={290} y={94} anchor="end" size={12}>
        JUST SHOPPING
      </SketchText>
      <SketchText x={290} y={114} anchor="end" size={12}>
        one second at the register
      </SketchText>

      {/* before and after, inside the hidden mass */}
      <SketchText x={206} y={256} size={12}>
        BEFORE
      </SketchText>
      {["noticing problems", "searching options", "asking friends"].map((t, i) => (
        <SketchText key={t} x={206} y={286 + i * 24} size={12}>
          {t}
        </SketchText>
      ))}
      <SketchText x={430} y={256} size={12}>
        AFTER
      </SketchText>
      {["use the item", "feel happy or regretful", "tell others"].map((t, i) => (
        <SketchText key={t} x={430} y={286 + i * 24} size={12}>
          {t}
        </SketchText>
      ))}

      {/* the whole chain */}
      <InkLine pts={[[724, 62], [736, 64], [737, 250], [736, 438], [724, 440]]} seed={120} />
      <g transform="translate(758 251) rotate(90)">
        <SketchText x={0} y={0} anchor="middle" size={12}>
          CONSUMER BEHAVIOR
        </SketchText>
      </g>
    </SketchFrame>
  );
}

/** A long chain with one link lit: the second at the register. */
export function OneSecondChain() {
  const links = 11;
  const lit = 5;
  const gap = 36;
  const x0 = 200 - lit * gap;
  const cy = 92;
  return (
    <SketchFrame
      id="sk-one-second"
      width={400}
      height={170}
      label="A sketched chain of links running off both edges; one link in the middle is washed teal, under the words the register and one second."
    >
      <Backwash cx={200} cy={92} rx={150} ry={56} seed={130} />
      <SketchText x={200} y={32} anchor="middle" size={12}>
        THE REGISTER
      </SketchText>
      <InkLine pts={[[200, 42], [200, 62]]} seed={131} width={1} />
      {Array.from({ length: links }, (_, i) => {
        const cx = x0 + i * gap;
        const on = i === lit;
        const face = i % 2 === 1;
        const ring = rp(blobPts(cx, cy, 24, face ? 14 : 4.5, 140 + i, 16, 0.04));
        return (
          <g key={i} opacity={on ? 1 : r2(Math.max(0.2, 1 - Math.abs(i - lit) * 0.16))}>
            {on ? (
              <path d={wobble(ring, 150, 0.6, 14, true)} fill="none" stroke={SK.teal} strokeWidth={7} opacity={0.6} />
            ) : null}
            <InkLine pts={ring} seed={160 + i} width={on ? 1.8 : 1.5} closed />
          </g>
        );
      })}
      <SketchText x={200} y={144} anchor="middle" size={12}>
        ONE SECOND
      </SketchText>
    </SketchFrame>
  );
}

/* ==========================================================================
   THREE STAGES OF CONSUMPTION
   ========================================================================== */

const STAGES = ["Prepurchase", "Purchase", "Postpurchase"];

/** One glyph per stage: search (a magnifier), buy (a bag), judge (a rating). */
function StageGlyph({ stage, x, y, seed }: { stage: number; x: number; y: number; seed: number }) {
  if (stage === 0) return <Magnifier x={x - 5} y={y - 5} r={18} seed={seed} />;
  if (stage === 1) return <Bag x={x} y={y - 26} w={40} seed={seed} badge={false} />;
  return <Stars x={x - 24} y={y} n={2} of={3} r={11} gap={24} seed={seed} />;
}

/** A round stage medallion: cream paper with a loose ink ring. */
function Medallion({ x, y, r, seed }: { x: number; y: number; r: number; seed: number }) {
  const ring = rp(blobPts(x, y, r, r, seed, 18, 0.04));
  return (
    <g>
      <Paper pts={ring} seed={seed + 1} />
      <InkLine pts={ring} seed={seed + 2} closed />
    </g>
  );
}

export function ConsumptionCycle() {
  const xs = [150, 400, 650];
  const cy = 158;
  const R = 56;
  return (
    <SketchFrame
      id="sk-cycle"
      width={800}
      height={320}
      label="Three sketched stages in a loop: Stage 1 Prepurchase (a magnifying glass), Stage 2 Purchase (a shopping bag), Stage 3 Postpurchase (a star rating). An arrow from Postpurchase curves back to Prepurchase, marked repeat purchases."
    >
      <Backwash cx={400} cy={170} rx={360} ry={120} seed={200} opacity={0.4} />
      {xs.map((x, i) => (
        <g key={x}>
          <SketchText x={x} y={36} anchor="middle" size={12}>
            {`STAGE ${i + 1}`}
          </SketchText>
          <SketchText x={x} y={72} anchor="middle" size={24} serif>
            {STAGES[i]}
          </SketchText>
          <Medallion x={x} y={cy} r={R} seed={210 + i * 5} />
          <StageGlyph stage={i} x={x} y={cy} seed={230 + i * 10} />
        </g>
      ))}
      <SketchArrow pts={[[216, cy], [334, cy - 1]]} seed={260} />
      <SketchArrow pts={[[466, cy], [584, cy + 1]]} seed={262} />
      {/* the loop back */}
      <SketchArrow
        pts={[[650, cy + R + 6], [640, 262], [560, 284], [400, 290], [240, 284], [160, 262], [150, cy + R + 8]]}
        seed={264}
      />
      <SketchText x={400} y={272} anchor="middle" size={12}>
        REPEAT PURCHASES
      </SketchText>
    </SketchFrame>
  );
}

/** Row markers for the stage table: the consumer (a shopper's head and
    shoulders) and the marketer (a watching eye). */
export function ConsumerMark() {
  const shoulders: Pt[] = [[7, 39], [9, 30], [14, 26], [26, 26], [31, 30], [33, 39]];
  const head = rp(blobPts(20, 16, 6.4, 7.8, 301, 12, 0.05));
  const hair: Pt[] = [[13.4, 17], [13, 10], [17, 7.2], [23, 7.2], [27, 10], [26.6, 17], [24.6, 12], [18, 11], [15, 13]];
  return (
    <SketchFrame id="sk-mark-consumer" width={40} height={40} label="" decorative className="h-9 w-9 shrink-0">
      <Wash pts={shoulders} seed={302} fill={SK.camel} opacity={0.65} dx={1} dy={0.5} />
      <InkLine pts={shoulders} seed={303} width={1.1} amp={0.4} />
      <Wash pts={head} seed={304} fill={SK.skin} opacity={0.75} dx={0.6} dy={0.4} />
      <InkLine pts={head} seed={305} width={1} amp={0.3} closed />
      <Wash pts={hair} seed={306} fill={SK.brown} opacity={0.75} dx={0.4} dy={0} />
      <InkLine pts={hair} seed={307} width={0.8} amp={0.3} closed />
    </SketchFrame>
  );
}

export function MarketerMark() {
  return (
    <SketchFrame id="sk-mark-marketer" width={40} height={40} label="" decorative className="h-9 w-9 shrink-0">
      <Eye x={20} y={22} w={32} seed={310} />
    </SketchFrame>
  );
}

/* ==========================================================================
   CONSUMERS VERSUS CUSTOMERS
   ========================================================================== */

/** A jar of baby food centred on (x, y): leather lid, food wash, paper label with a baby's face. */
function Jar({ x, y, seed }: { x: number; y: number; seed: number }) {
  const lid = at(x, y, [[-22, -46], [22, -46], [22, -33], [-22, -33]]);
  const body = at(x, y, [[-28, -28], [-24, -33], [24, -33], [28, -28], [28, 36], [22, 45], [-22, 45], [-28, 36]]);
  const label = at(x, y, [[-28, -12], [28, -12], [28, 18], [-28, 18]]);
  return (
    <g>
      <Wash pts={body} seed={seed} fill={SK.camel} opacity={0.6} />
      <InkLine pts={body} seed={seed + 1} closed />
      <Wash pts={lid} seed={seed + 2} fill={SK.leather} opacity={0.8} dx={1} dy={0.5} />
      <InkLine pts={lid} seed={seed + 3} width={1.1} closed />
      <Paper pts={label} seed={seed + 4} />
      <InkLine pts={label} seed={seed + 5} width={1} closed />
      <InkLine pts={rp(blobPts(x, y + 3, 8, 8, seed + 6, 10, 0.05))} seed={seed + 7} width={0.9} closed />
      <InkLine pts={at(x, y, [[-3.5, 1], [-3, 2]])} seed={seed + 8} width={1.6} />
      <InkLine pts={at(x, y, [[3, 1], [3.5, 2]])} seed={seed + 9} width={1.6} />
      <InkLine pts={at(x, y, [[-3.5, 6], [0, 8], [3.5, 6]])} seed={seed + 10} width={0.8} />
    </g>
  );
}

/** A wooden high chair: back post, seat box, tray and splayed legs. */
function HighChair({ seed }: { seed: number }) {
  const back: Pt[] = [[660, 60], [668, 58], [669, 132], [661, 132]];
  const panel: Pt[] = [[612, 104], [669, 104], [669, 133], [612, 133]];
  const tray: Pt[] = [[580, 99], [628, 99], [628, 106], [580, 106]];
  return {
    back: (
      <g>
        <Wash pts={back} seed={seed} fill={SK.leather} opacity={0.7} dx={0.8} dy={0} />
        <InkLine pts={back} seed={seed + 1} width={1.1} closed />
      </g>
    ),
    front: (
      <g>
        <InkLine pts={[[618, 133], [600, 172]]} seed={seed + 2} />
        <InkLine pts={[[664, 133], [682, 172]]} seed={seed + 3} />
        <InkLine pts={[[607, 157], [675, 157]]} seed={seed + 4} width={1} />
        <Paper pts={panel} seed={seed + 5} />
        <Wash pts={panel} seed={seed + 6} fill={SK.leather} opacity={0.5} />
        <InkLine pts={panel} seed={seed + 7} closed />
        <Wash pts={tray} seed={seed + 8} fill={SK.leather} opacity={0.7} dx={0.6} dy={0.4} />
        <InkLine pts={tray} seed={seed + 9} width={1.1} closed />
      </g>
    ),
  };
}

export function BuysUses() {
  const g = 172;
  const hand = handAt(170, g, 140, "reach");
  const baby: Pt = [616, 96];
  const chair = HighChair({ seed: 360 });
  const bowl = at(596, 99, [[-12, 0], [12, 0], [8, 7], [-8, 7]]);
  return (
    <SketchFrame
      id="sk-buys-uses"
      width={800}
      height={250}
      label="A parent in a camel coat pays with a card for a jar of baby food: the customer, who buys it and weighs price and nutrition. A baby in a wooden high chair reaches a spoon into the bowl: the consumer, who uses it and cares about taste and texture."
    >
      <Backwash cx={400} cy={112} rx={372} ry={92} seed={330} opacity={0.4} />
      <Ground x0={70} x1={730} y={g} seed={332} />

      {/* the parent: the customer, card in hand */}
      <Person x={170} y={g} h={140} look={{ hair: "bun", hairTone: SK.brown, wear: SK.camel, legs: SK.charcoal }} arms={["hip", "reach"]} seed={340} />
      <PayCard x={r2(hand[0] + 9)} y={r2(hand[1] - 3)} w={30} tilt={-12} seed={350} />

      <SketchArrow pts={[[236, 102], [352, 101]]} seed={354} />
      <SketchText x={294} y={88} anchor="middle" size={12}>
        BUYS
      </SketchText>
      <Jar x={400} y={94} seed={310} />
      <SketchArrow pts={[[448, 101], [540, 102]]} seed={356} />
      <SketchText x={494} y={88} anchor="middle" size={12}>
        USES
      </SketchText>

      {/* the baby in a high chair: the consumer, spoon in hand (drawn larger about the ground) */}
      <g transform="translate(641 172) scale(1.4) translate(-641 -172)">
      {chair.back}
      <Baby x={641} y={128} hand={baby} seed={370} />
      {chair.front}
      <Paper pts={bowl} seed={376} />
      <InkLine pts={bowl} seed={377} width={1} closed />
      <InkLine pts={[[baby[0], baby[1]], [r2(baby[0] - 14), r2(baby[1] + 12)]]} seed={378} width={1.2} />
      </g>

      <SketchText x={170} y={206} anchor="middle" size={12}>
        CUSTOMER
      </SketchText>
      <SketchText x={170} y={228} anchor="middle" size={12}>
        price · nutrition
      </SketchText>
      <SketchText x={641} y={206} anchor="middle" size={12}>
        CONSUMER
      </SketchText>
      <SketchText x={641} y={228} anchor="middle" size={12}>
        taste · texture
      </SketchText>
    </SketchFrame>
  );
}

/* ==========================================================================
   WHY CONSUMERS ARE NOT CALCULATORS
   ========================================================================== */

const SHELF_COLS = 4;
const SHELF_ROWS = 3;
function shelfPos(i: number) {
  const c = i % SHELF_COLS;
  const r = Math.floor(i / SHELF_COLS);
  return { x: 150 + c * 62, y: 70 + r * 62 };
}

const SHELF_WASH = [SK.camel, SK.earth, SK.sky, SK.tan];

/** Three wooden planks of twelve small products; `lit` is washed teal (the pick). */
function Shelf({ lit, faded = false }: { lit: number; faded?: boolean }) {
  return (
    <g>
      {Array.from({ length: SHELF_ROWS }, (_, r) => (
        <InkLine key={r} pts={[[118, 92 + r * 62], [364, 92 + r * 62 + (r % 2 ? 1 : -1)]]} seed={400 + r} width={1.6} />
      ))}
      {Array.from({ length: SHELF_COLS * SHELF_ROWS }, (_, i) => {
        const { x, y } = shelfPos(i);
        const on = i === lit;
        const h = 32 + ((i * 7) % 3) * 3;
        const box = rp([[x - 15, y + 20 - h], [x + 15, y + 20 - h], [x + 15, y + 20], [x - 15, y + 20]]);
        return (
          <g key={i} opacity={faded && !on ? 0.35 : 1}>
            <Wash pts={box} seed={410 + i} fill={on ? SK.teal : SHELF_WASH[i % 4]} opacity={on ? 0.75 : 0.5} />
            <InkLine pts={box} seed={430 + i} width={on ? 1.5 : 1.1} closed />
          </g>
        );
      })}
    </g>
  );
}

/** The old model: visit every option, score it, take the best. */
export function CalculatorWalk() {
  const best = 10;
  const rowY = (r: number) => 70 + r * 62 - 30;
  // along the top of each row in turn, turning at the ends: every option passed
  const path: Pt[] = [
    [78, 104],
    [100, rowY(0)],
    [356, rowY(0)],
    [374, rowY(0) + 30],
    [356, rowY(1)],
    [128, rowY(1)],
    [110, rowY(1) + 30],
    [128, rowY(2)],
    [362, rowY(2)],
  ];
  const b = shelfPos(best);
  return (
    <SketchFrame
      id="sk-calculator-walk"
      width={400}
      height={300}
      label="The old model: a buyer in a dark suit walks a path along every one of twelve products on a three-plank shelf, a dot at each, and takes the single best one, washed teal with a star."
    >
      <Backwash cx={220} cy={136} rx={184} ry={118} seed={450} opacity={0.4} />
      <Ground x0={24} x1={100} y={186} seed={452} />
      <Person x={60} y={186} h={112} look={{ hair: "short", hairTone: SK.brown, wear: SK.charcoal, legs: SK.charcoal, outfit: "jacket" }} arms={["down", "point"]} seed={460} />
      <Shelf lit={best} />
      <SketchArrow pts={path} seed={470} width={1.1} head={7} />
      {Array.from({ length: 12 }, (_, i) => {
        const p = shelfPos(i);
        return <path key={i} d={wobble(rp(blobPts(p.x, rowY(Math.floor(i / 4)), 2.4, 2.4, 480 + i, 7, 0.1)), 480 + i, 0.1, 4, true)} fill={SK.ink} />;
      })}
      <Star x={b.x} y={b.y + 3} r={9} seed={496} />
      <SketchText x={20} y={262} size={12}>
        COMPARE ALL · CALCULATE · PICK THE BEST
      </SketchText>
      <SketchText x={20} y={284} size={12}>
        every option, every cost
      </SketchText>
    </SketchFrame>
  );
}

/** A phone-style battery, nearly empty: energy running low. */
function Battery({ x, y, seed }: { x: number; y: number; seed: number }) {
  const shell = rp([[x - 16, y - 9], [x + 14, y - 9], [x + 14, y + 9], [x - 16, y + 9]]);
  const level = rp([[x - 13, y - 5.5], [x - 7, y - 5.5], [x - 7, y + 5.5], [x - 13, y + 5.5]]);
  return (
    <g>
      <Wash pts={level} seed={seed} fill={SK.tan} opacity={0.85} dx={0.3} dy={0.3} />
      <InkLine pts={sharp(shell, true, 2)} seed={seed + 1} width={1.3} closed />
      <InkLine pts={rp([[x + 17, y - 4], [x + 17, y + 4]])} seed={seed + 2} width={2.2} amp={0.2} />
    </g>
  );
}

/** Real people: short of time and energy, one shortcut to a familiar pick. */
export function ShortcutWalk() {
  const pick = 4;
  const p = shelfPos(pick);
  const hand = handAt(60, 186, 112, "reach");
  return (
    <SketchFrame
      id="sk-shortcut-walk"
      width={400}
      height={300}
      label="Real people: the same shelf of twelve products, mostly faded. A shopper in a camel coat, short of time (a clock) and energy (a nearly empty battery), takes one short curved shortcut straight to a single product, washed teal."
    >
      <Backwash cx={220} cy={136} rx={184} ry={118} seed={500} opacity={0.4} />
      <Ground x0={24} x1={100} y={186} seed={502} />
      <Shelf lit={pick} faded />
      <Person x={60} y={186} h={112} look={{ hair: "bob", hairTone: SK.brown, wear: SK.camel, legs: SK.charcoal }} arms={["down", "reach"]} seed={510} />
      <Clock x={34} y={46} r={13} seed={520} />
      <Battery x={80} y={46} seed={524} />
      <SketchArrow pts={curvePts([r2(hand[0] + 5), r2(hand[1] + 3)], [r2(hand[0] + 30), r2(hand[1] - 2)], [p.x - 21, p.y - 2], 8)} seed={530} width={1.6} head={8} />
      <SketchText x={20} y={262} size={12}>
        LIMITED TIME · LIMITED ENERGY
      </SketchText>
      <SketchText x={20} y={284} size={12}>
        a mental shortcut
      </SketchText>
    </SketchFrame>
  );
}

/** A mood face: a round blush face with a wavering mouth. */
function MoodFace({ x, y, r = 20, seed }: { x: number; y: number; r?: number; seed: number }) {
  const face = rp(blobPts(x, y, r, r, seed, 14, 0.05));
  return (
    <g>
      <Wash pts={face} seed={seed + 1} fill={SK.blush} opacity={0.9} />
      <InkLine pts={face} seed={seed + 2} closed />
      <InkLine pts={at(x, y, [[-9, -5], [-6, -6.5]])} seed={seed + 3} width={1.8} amp={0.2} />
      <InkLine pts={at(x, y, [[6, -6.5], [9, -5]])} seed={seed + 4} width={1.8} amp={0.2} />
      <InkLine pts={at(x, y, [[-9, 7], [-4.5, 4.5], [0, 7], [4.5, 9], [9, 6.5]])} seed={seed + 5} width={1.2} amp={0.2} />
    </g>
  );
}

/** A habit: an arrow running round a loop back to where it began. */
function HabitLoop({ x, y, r = 19, seed }: { x: number; y: number; r?: number; seed: number }) {
  const arc = rp(
    Array.from({ length: 14 }, (_, i) => {
      const a = ((-70 + (i / 13) * 290) * Math.PI) / 180;
      return [x + Math.cos(a) * r, y + Math.sin(a) * r] as Pt;
    }),
  );
  return <SketchArrow pts={arc} seed={seed} width={1.6} head={8} />;
}

/** Mood, habits, brand loyalty and social pressure all pull on one choice. */
export function FourPulls() {
  const src = [
    { x: 130, label: "MOOD" },
    { x: 310, label: "HABITS" },
    { x: 490, label: "BRAND LOYALTY" },
    { x: 670, label: "SOCIAL PRESSURE" },
  ];
  const gy = 52;
  const g = 306;
  return (
    <SketchFrame
      id="sk-four-pulls"
      width={800}
      height={320}
      label="Four forces, each a hand-drawn arrow converging on one shopper thinking with a hand to the chin: mood (a round face with a wavering mouth), habits (a looping arrow), brand loyalty (a heart) and social pressure (three people watching)."
    >
      <Backwash cx={400} cy={170} rx={372} ry={136} seed={540} opacity={0.4} />
      <MoodFace x={130} y={gy} r={24} seed={550} />
      <HabitLoop x={310} y={gy} r={23} seed={560} />
      <Heart x={490} y={gy + 1} s={1.9} seed={570} />
      <Person x={636} y={gy + 48} h={76} look={{ hair: "curly", hairTone: SK.charcoal, skin: SK.brown, skinOpacity: 0.5, wear: SK.earth, legs: SK.tan }} arms={["down", "hip"]} seed={580} />
      <Person x={706} y={gy + 48} h={72} flip look={{ hair: "long", hairTone: SK.tan, wear: SK.sky, legs: SK.charcoal }} arms={["hip", "down"]} seed={680} />
      <Person x={671} y={gy + 52} h={84} look={{ hair: "short", hairTone: SK.brown, skin: SK.camel, skinOpacity: 0.6, wear: SK.charcoal, legs: SK.charcoal, outfit: "jacket" }} arms={["down", "down"]} seed={780} />
      {src.map((s) => (
        <SketchText key={s.label} x={s.x} y={118} anchor="middle" size={12}>
          {s.label}
        </SketchText>
      ))}
      {src.map((s, i) => (
        <SketchArrow
          key={s.label}
          pts={[
            [r2(s.x + (400 - s.x) * 0.1), 132],
            [r2(400 + (s.x - 400) * 0.13), 172],
          ]}
          seed={590 + i * 3}
        />
      ))}
      <Ground x0={340} x1={460} y={g} seed={600} />
      <Person x={400} y={g} h={124} look={{ hair: "bob", hairTone: SK.brown, wear: SK.camel, legs: SK.charcoal }} arms={["down", "chin"]} seed={610} />
    </SketchFrame>
  );
}

/** A calculator whose display reads ERROR. */
export function CalculatorError() {
  const body = sharp([[120, 22], [280, 22], [280, 280], [120, 280]], true, 12);
  const screen = rp([[138, 42], [262, 42], [262, 92], [138, 92]]);
  return (
    <SketchFrame id="sk-calc-error" width={400} height={300} label="A sketched pocket calculator in a camel case, its pale glass display reading ERROR.">
      <Backwash cx={200} cy={152} rx={150} ry={136} seed={620} opacity={0.45} />
      <Wash pts={body} seed={621} fill={SK.camel} opacity={0.55} />
      <InkLine pts={body} seed={622} closed />
      <Wash pts={screen} seed={623} fill={SK.sky} opacity={0.7} dx={2} dy={1.5} />
      <InkLine pts={sharp(screen, true, 2)} seed={624} width={1.1} closed />
      <SketchText x={250} y={76} anchor="end" size={20}>
        ERROR
      </SketchText>
      {Array.from({ length: 16 }, (_, i) => {
        const c = i % 4;
        const r = Math.floor(i / 4);
        const key = rp([[140 + c * 31, 110 + r * 40], [164 + c * 31, 110 + r * 40], [164 + c * 31, 138 + r * 40], [140 + c * 31, 138 + r * 40]]);
        return (
          <g key={i}>
            {c === 3 ? <Wash pts={key} seed={630 + i} fill={SK.leather} opacity={0.6} dx={1} dy={0.8} /> : <Paper pts={key} seed={630 + i} />}
            <InkLine pts={key} seed={650 + i} width={1} amp={0.4} closed />
          </g>
        );
      })}
    </SketchFrame>
  );
}

/* ==========================================================================
   NEEDS VERSUS WANTS
   ========================================================================== */

/** A tall glass of cold water; (x, y) is the base centre. */
function Glass({ x, y, seed }: { x: number; y: number; seed: number }) {
  const glass = at(x, y, [[-17, -62], [17, -62], [13, 0], [-13, 0]]);
  const water = at(x, y, [[-15.5, -42], [15.5, -42], [13, 0], [-13, 0]]);
  return (
    <g>
      <Wash pts={water} seed={seed} fill={SK.sky} opacity={0.8} dx={1} dy={0} />
      <InkLine pts={glass} seed={seed + 1} closed />
      <InkLine pts={at(x, y, [[-15, -42], [15, -42]])} seed={seed + 2} width={0.9} />
      {/* two ice cubes */}
      <InkLine pts={at(x, y, [[-9, -38], [-1, -39], [-1, -31], [-9, -30]])} seed={seed + 3} width={0.8} closed />
      <InkLine pts={at(x, y, [[1, -30], [9, -31], [9, -23], [1, -22]])} seed={seed + 4} width={0.8} closed />
    </g>
  );
}

/** A soda can; (x, y) is the base centre. */
function Can({ x, y, seed }: { x: number; y: number; seed: number }) {
  const rim = (cy: number, half: "top" | "bottom" | "all") =>
    rp(
      Array.from({ length: half === "all" ? 13 : 7 }, (_, i) => {
        const a = half === "all" ? (i / 12) * Math.PI * 2 : half === "top" ? Math.PI + (i / 6) * Math.PI : (i / 6) * Math.PI;
        return [x + Math.cos(a) * 16, y + cy + Math.sin(a) * 4] as Pt;
      }),
    );
  const outline = rp([[x - 16, y - 54], ...rim(-2, "bottom").reverse(), [x + 16, y - 54]]);
  return (
    <g>
      <Wash pts={[...rim(-54, "top"), ...rim(-2, "bottom")]} seed={seed} fill={SK.charcoal} opacity={0.5} />
      <InkLine pts={outline} seed={seed + 1} />
      <InkLine pts={rim(-54, "all")} seed={seed + 2} width={1.1} closed />
      <path
        d={wobble(rp([[x - 16, y - 30], [x - 6, y - 25], [x + 6, y - 33], [x + 16, y - 28]]), seed + 3, 0.3, 6)}
        fill="none"
        stroke={SK.ochre}
        strokeWidth={4}
        strokeLinecap="round"
        opacity={0.9}
      />
      <InkLine pts={at(x, y, [[1, -55], [8, -57], [9, -54]])} seed={seed + 4} width={1} amp={0.1} />
    </g>
  );
}

/** A cup of hot tea on its saucer, steam rising; (x, y) is the base centre. */
function TeaCup({ x, y, seed }: { x: number; y: number; seed: number }) {
  const cup = at(x, y, [[-24, -40], [18, -40], [16, -16], [6, -2], [-14, -2], [-22, -16]]);
  const tea = at(x, y, [[-23, -40], [17, -40], [16, -35], [-22, -35]]);
  return (
    <g>
      <Paper pts={cup} seed={seed} />
      <Wash pts={tea} seed={seed + 1} fill={SK.camel} opacity={0.8} dx={0.5} dy={0.5} />
      <InkLine pts={cup} seed={seed + 2} closed />
      <InkLine pts={at(x, y, [[17, -33], [27, -31], [27, -21], [15, -17]])} seed={seed + 3} width={1.2} />
      <InkLine pts={at(x, y, [[-34, 2], [-4, 5], [28, 2]])} seed={seed + 4} />
      {[-12, 0, 12].map((dx, i) => (
        <InkLine
          key={dx}
          pts={at(x, y, [[dx - 3, -48], [dx - 7, -55], [dx - 3, -62], [dx - 7, -69]])}
          seed={seed + 5 + i}
          width={0.9}
        />
      ))}
    </g>
  );
}

export function NeedWantTrio() {
  const needs = ["THIRST", "HUNGER", "SHELTER", "BELONGING"];
  const pillY = (i: number) => 96 + i * 56;
  const tY = pillY(0);
  const mtl = 110;
  const other = 280;
  return (
    <SketchFrame
      id="sk-need-want"
      width={800}
      height={350}
      label="Needs on the left as four hand-drawn pills: thirst, highlighted, then hunger, shelter and belonging. Thirst branches into two wants: in Montreal, a glass of cold water with ice or a soda can; in another country, a steaming cup of hot tea."
    >
      <Backwash cx={420} cy={180} rx={380} ry={160} seed={700} opacity={0.35} />
      <SketchText x={40} y={34} size={12}>
        NEEDS
      </SketchText>
      <SketchText x={40} y={56} size={12}>
        exist before marketing
      </SketchText>
      <SketchText x={320} y={34} size={12}>
        WANTS
      </SketchText>
      <SketchText x={320} y={56} size={12}>
        shaped by culture and personality
      </SketchText>
      <InkLine pts={[[286, 22], [287, 64]]} seed={701} width={0.8} />

      {needs.map((n, i) => {
        const y = pillY(i);
        const pill = rp([
          ...Array.from({ length: 7 }, (_, k) => {
            const a = Math.PI / 2 + (k / 6) * Math.PI;
            return [60 + Math.cos(a) * 20, y + Math.sin(a) * 20] as Pt;
          }),
          ...Array.from({ length: 7 }, (_, k) => {
            const a = -Math.PI / 2 + (k / 6) * Math.PI;
            return [190 + Math.cos(a) * 20, y + Math.sin(a) * 20] as Pt;
          }),
        ]);
        return (
          <g key={n} opacity={i === 0 ? 1 : 0.5}>
            {i === 0 ? <Wash pts={pill} seed={710 + i} fill={SK.ochre} opacity={0.6} /> : <Paper pts={pill} seed={710 + i} />}
            <InkLine pts={pill} seed={720 + i} closed />
            <SketchText x={125} y={y + 4} anchor="middle" size={12}>
              {n}
            </SketchText>
          </g>
        );
      })}

      {/* thirst branches into two wants */}
      <InkLine pts={curvePts([212, tY], [290, tY], [318, mtl], 10)} seed={730} />
      <InkLine pts={curvePts([212, tY], [270, other], [318, other], 14)} seed={731} />
      <path d={wobble(rp(blobPts(320, mtl, 4, 4, 732, 8, 0.1)), 732, 0.2, 4, true)} fill={SK.ink} />
      <path d={wobble(rp(blobPts(320, other, 4, 4, 733, 8, 0.1)), 733, 0.2, 4, true)} fill={SK.ink} />
      <SketchText x={334} y={mtl + 4} size={12}>
        MONTREAL
      </SketchText>
      <SketchText x={334} y={other + 4} size={12}>
        ANOTHER COUNTRY
      </SketchText>

      <g transform={`translate(530 ${mtl + 44}) scale(1.35) translate(-530 ${-(mtl + 44)})`}>
        <Glass x={530} y={mtl + 44} seed={740} />
      </g>
      <g transform={`translate(630 ${mtl + 44}) scale(1.35) translate(-630 ${-(mtl + 44)})`}>
        <Can x={630} y={mtl + 44} seed={750} />
      </g>
      <g transform={`translate(580 ${other + 44}) scale(1.35) translate(-580 ${-(other + 44)})`}>
        <TeaCup x={580} y={other + 44} seed={760} />
      </g>
    </SketchFrame>
  );
}

/* ==========================================================================
   THE MANY ROLES ONE PERSON PLAYS
   ========================================================================== */

/** A mug held up at (x, y), its handle toward +x. */
function Mug({ x, y, s = 1.6, seed }: { x: number; y: number; s?: number; seed: number }) {
  const cup = sharp(at(x, y, [[-5.5, -7], [5.5, -7], [5, 6], [-5, 6]], s), true, 1);
  return (
    <g>
      <Paper pts={cup} seed={seed} />
      <Wash pts={cup} seed={seed + 1} fill={SK.camel} opacity={0.65} dx={0.6} dy={0.4} />
      <InkLine pts={cup} seed={seed + 2} width={1.1} amp={0.2} closed />
      <InkLine pts={at(x, y, [[5.5, -4], [9.5, -3.5], [9.5, 2], [5.2, 3]], s)} seed={seed + 3} width={1} amp={0.2} />
    </g>
  );
}

/** The one shopper who plays every role this week. */
const SHOPPER: Look = { hair: "bob", hairTone: SK.brown, wear: SK.camel, legs: SK.charcoal };

/** One glyph per role: the same person, a different prop. */
export function RoleGlyph({ role }: { role: 0 | 1 | 2 | 3 }) {
  const labels = [
    "The shopper, hand to chin, with a speech bubble holding an exclamation mark: noticing the problem first.",
    "The shopper speaking to a second person, a speech bubble of three dots between them.",
    "The shopper holding out a payment card.",
    "The shopper drinking from a mug, using the product.",
  ];
  const g = 112;
  const h = 94;
  const px = role === 1 ? 50 : 62;
  const seed = 800 + role * 40;
  const hand = handAt(px, g, h, "reach");
  const mouth = handAt(px, g, h, "chin");
  return (
    <SketchFrame id={`sk-role-${role}`} width={160} height={120} label={labels[role]} className="block h-auto w-full max-w-[180px]">
      <Backwash cx={84} cy={70} rx={70} ry={46} seed={seed} opacity={0.4} />
      <Ground x0={14} x1={146} y={g} seed={seed + 1} />
      <Person
        x={px}
        y={g}
        h={h}
        look={SHOPPER}
        arms={role === 0 ? ["down", "chin"] : role === 1 ? ["down", "low"] : role === 2 ? ["hip", "reach"] : ["hip", "chin"]}
        seed={seed + 2}
      />
      {role === 0 ? (
        <g>
          <SpeechBubble x={116} y={30} w={40} h={34} tx={86} ty={54} seed={seed + 10} />
          <InkLine pts={[[116, 20], [116, 34]]} seed={seed + 12} width={2.2} amp={0.2} />
          <path d={wobble(rp(blobPts(116, 40, 1.8, 1.8, seed + 13, 6, 0.1)), seed + 13, 0.1, 4, true)} fill={SK.ink} />
        </g>
      ) : null}
      {role === 1 ? (
        <g>
          <SpeechBubble x={98} y={24} w={44} h={28} tx={74} ty={46} seed={seed + 10} />
          {[-10, 0, 10].map((dx, i) => (
            <path key={dx} d={wobble(rp(blobPts(98 + dx, 24, 2.2, 2.2, seed + 14 + i, 6, 0.1)), seed + 14 + i, 0.1, 4, true)} fill={SK.ink} />
          ))}
          <Person
            x={130}
            y={g}
            h={82}
            flip
            look={{ hair: "curly", hairTone: SK.charcoal, skin: SK.brown, skinOpacity: 0.55, wear: SK.sky, legs: SK.tan }}
            arms={["down", "down"]}
            seed={seed + 20}
          />
        </g>
      ) : null}
      {role === 2 ? <PayCard x={r2(hand[0] + 7)} y={r2(hand[1] - 2)} w={19} tilt={-12} seed={seed + 10} /> : null}
      {role === 3 ? <Mug x={r2(mouth[0] + 9)} y={r2(mouth[1] + 3)} seed={seed + 10} /> : null}
    </SketchFrame>
  );
}

/** A family sedan standing on (x, y), washed teal: the thing being bought. */
function Car({ x, y, seed }: { x: number; y: number; seed: number }) {
  const body = at(x, y, [[-130, -22], [-131, -50], [-112, -62], [-70, -66], [-40, -104], [52, -104], [86, -66], [118, -60], [132, -42], [132, -22]]);
  const front = sharp(at(x, y, [[-58, -68], [-34, -96], [-3, -96], [-3, -68]]), true, 2);
  const back = sharp(at(x, y, [[5, -68], [5, -96], [48, -96], [72, -68]]), true, 2);
  return (
    <g>
      <Wash pts={body} seed={seed} fill={SK.teal} opacity={0.6} />
      <InkLine pts={body} seed={seed + 1} closed />
      <Wash pts={front} seed={seed + 2} fill={SK.sky} opacity={0.85} dx={1} dy={1} />
      <InkLine pts={front} seed={seed + 3} width={1.1} closed />
      <Wash pts={back} seed={seed + 4} fill={SK.sky} opacity={0.85} dx={1} dy={1} />
      <InkLine pts={back} seed={seed + 5} width={1.1} closed />
      <InkLine pts={at(x, y, [[-20, -58], [-10, -58]])} seed={seed + 6} width={1.2} amp={0.2} />
      {[-78, 80].map((dx, i) => {
        const tyre = rp(blobPts(x + dx, y - 20, 20, 20, seed + 10 + i, 14, 0.04));
        const hub = rp(blobPts(x + dx, y - 20, 7, 7, seed + 12 + i, 8, 0.05));
        return (
          <g key={dx}>
            <Paper pts={tyre} seed={seed + 14 + i} />
            <Wash pts={tyre} seed={seed + 16 + i} fill={SK.charcoal} opacity={0.8} dx={0.5} dy={0.5} />
            <InkLine pts={tyre} seed={seed + 18 + i} closed />
            <Paper pts={hub} seed={seed + 20 + i} />
            <InkLine pts={hub} seed={seed + 22 + i} width={0.9} closed />
          </g>
        );
      })}
    </g>
  );
}

export function FamilyCar() {
  const g = 178;
  const card = handAt(166, g, 132, "reach");
  return (
    <SketchFrame
      id="sk-family-car"
      width={800}
      height={236}
      label="A household buying a family car, washed teal. On the left two parents, one holding out a payment card: parents buy. On the right two children, speech bubbles raised with a heart and an exclamation mark, an arrow from them to the car: children influence."
    >
      <Backwash cx={400} cy={112} rx={372} ry={100} seed={900} opacity={0.4} />
      <Ground x0={40} x1={760} y={g} seed={902} />

      {/* parents: the buyers */}
      <Person x={100} y={g} h={142} look={{ hair: "short", hairTone: SK.charcoal, skin: SK.camel, skinOpacity: 0.6, wear: SK.charcoal, legs: SK.charcoal, outfit: "jacket" }} arms={["down", "hip"]} seed={910} />
      <Person x={166} y={g} h={132} look={SHOPPER} arms={["hip", "reach"]} seed={1010} />
      <PayCard x={r2(card[0] + 7)} y={r2(card[1] - 2)} w={24} tilt={-12} seed={1110} />

      <Car x={400} y={g} seed={1120} />

      {/* children: the influencers */}
      <Person x={624} y={g} h={80} headScale={1.5} flip look={{ hair: "curly", hairTone: SK.brown, skin: SK.brown, skinOpacity: 0.5, wear: SK.ochre, legs: SK.tan }} arms={["up", "down"]} seed={1150} />
      <Person x={690} y={g} h={70} headScale={1.6} flip look={{ hair: "bob", hairTone: SK.tan, wear: SK.sky, legs: SK.charcoal }} arms={["down", "wave"]} seed={1250} />
      <SpeechBubble x={590} y={48} w={46} h={32} tx={614} ty={78} seed={1350} />
      <Heart x={590} y={49} s={0.75} seed={1352} />
      <SpeechBubble x={704} y={62} w={40} h={30} tx={694} ty={96} seed={1360} />
      <InkLine pts={[[704, 53], [704, 64]]} seed={1362} width={2.2} amp={0.2} />
      <path d={wobble(rp(blobPts(704, 70, 1.8, 1.8, 1363, 6, 0.1)), 1363, 0.1, 4, true)} fill={SK.ink} />
      <SketchArrow pts={curvePts([562, 52], [512, 52], [480, 88], 8)} seed={1370} />

      <SketchText x={133} y={214} anchor="middle" size={12}>
        PARENTS BUY
      </SketchText>
      <SketchText x={656} y={214} anchor="middle" size={12}>
        CHILDREN INFLUENCE
      </SketchText>
    </SketchFrame>
  );
}

/* ==========================================================================
   MARKET SEGMENTATION
   ========================================================================== */

type Shape = 0 | 1 | 2 | 3;

/** Four kinds of shopper, told apart by clothes and hair (Isotype: one figure, four looks). */
const KINDS: Look[] = [
  { hair: "bob", hairTone: SK.brown, wear: SK.camel, legs: SK.charcoal },
  { hair: "short", hairTone: SK.charcoal, skin: SK.camel, skinOpacity: 0.6, wear: SK.charcoal, legs: SK.charcoal, outfit: "jacket" },
  { hair: "long", hairTone: SK.tan, wear: SK.sky, legs: SK.skin, outfit: "dress" },
  { hair: "curly", hairTone: SK.charcoal, skin: SK.brown, skinOpacity: 0.55, wear: SK.earth, legs: SK.tan },
];

// A mixed crowd: 20 people of four kinds, placed by hand so nobody overlaps.
const CROWD: { x: number; y: number; k: Shape }[] = [
  { x: 214, y: 58, k: 1 },
  { x: 258, y: 44, k: 0 },
  { x: 302, y: 62, k: 2 },
  { x: 346, y: 46, k: 3 },
  { x: 232, y: 98, k: 3 },
  { x: 278, y: 90, k: 1 },
  { x: 322, y: 104, k: 0 },
  { x: 364, y: 88, k: 2 },
  { x: 212, y: 140, k: 0 },
  { x: 256, y: 134, k: 2 },
  { x: 300, y: 148, k: 3 },
  { x: 346, y: 134, k: 1 },
  { x: 232, y: 182, k: 2 },
  { x: 276, y: 176, k: 0 },
  { x: 320, y: 190, k: 1 },
  { x: 366, y: 176, k: 0 },
  { x: 214, y: 222, k: 3 },
  { x: 258, y: 218, k: 1 },
  { x: 302, y: 230, k: 2 },
  { x: 346, y: 218, k: 3 },
];

/** A small crowd figure: drawn at full size and scaled down, so the ink stays fine and the washes read. */
function Figure({ x, y, k = 0.46, ...rest }: Omit<React.ComponentProps<typeof Person>, "x" | "y" | "h"> & { x: number; y: number; k?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`}>
      <Person x={0} y={0} h={96} {...rest} />
    </g>
  );
}

/** One message aimed at everyone lands with only one kind of person. */
export function OneMessage() {
  const arcs = [0, 1, 2].map((i) =>
    rp(
      Array.from({ length: 7 }, (_, k) => {
        const a = ((-38 + (k / 6) * 76) * Math.PI) / 180;
        const r = 18 + i * 14;
        return [92 + Math.cos(a) * r, 140 + Math.sin(a) * r] as Pt;
      }),
    ),
  );
  return (
    <SketchFrame
      id="sk-one-message"
      width={400}
      height={270}
      label="A megaphone sends the same camel-coloured message to a mixed crowd of twenty people in four different looks. Only the people in camel coats turn toward it and wave; the others, in dark suits, pale dresses and earth coats, face away."
    >
      <Backwash cx={250} cy={140} rx={150} ry={128} seed={1400} opacity={0.4} />
      <Megaphone x={44} y={140} seed={1402} />
      {arcs.map((pts, i) => (
        <g key={i}>
          <path d={wobble(pts, 1405 + i, 0.6, 10)} fill="none" stroke={SK.camel} strokeWidth={5} strokeLinecap="round" opacity={0.6} />
          <InkLine pts={pts} seed={1410 + i} width={1.1} />
        </g>
      ))}
      <SketchText x={54} y={204} anchor="middle" size={12}>
        SAME
      </SketchText>
      <SketchText x={54} y={220} anchor="middle" size={12}>
        MESSAGE
      </SketchText>
      {[...CROWD]
        .sort((p, q) => p.y - q.y)
        .map((p, i) => {
          const hit = p.k === 0;
          return (
            <Figure
              key={i}
              x={p.x}
              y={p.y + 20}
              flip={hit}
              look={KINDS[p.k]}
              arms={hit ? ["down", "wave"] : ["down", "down"]}
              seed={1420 + i * 100}
            />
          );
        })}
      <SketchText x={290} y={264} anchor="middle" size={12}>
        EVERYONE
      </SketchText>
    </SketchFrame>
  );
}

/** The same crowd sorted into smaller groups with shared traits. */
export function SortedGroups() {
  const groups: { cx: number; cy: number; k: Shape }[] = [
    { cx: 110, cy: 80, k: 0 },
    { cx: 290, cy: 80, k: 1 },
    { cx: 110, cy: 190, k: 2 },
    { cx: 290, cy: 190, k: 3 },
  ];
  return (
    <SketchFrame
      id="sk-sorted-groups"
      width={400}
      height={270}
      label="The same twenty people sorted into four smaller groups, each loosely ringed in ink: camel coats, dark suits, pale dresses and earth coats."
    >
      <Backwash cx={200} cy={134} rx={188} ry={124} seed={3500} opacity={0.4} />
      {groups.map((g, gi) => {
        const members = CROWD.filter((p) => p.k === g.k);
        const ring = rp(blobPts(g.cx, g.cy, 82, 50, 3510 + gi, 16, 0.06));
        return (
          <g key={g.k}>
            <InkLine pts={ring} seed={3520 + gi} width={1.1} closed />
            {members.map((_, i) => (
              <Figure
                key={i}
                k={0.56}
                x={r2(g.cx + (i - (members.length - 1) / 2) * 27)}
                y={g.cy + 28}
                look={KINDS[g.k]}
                arms={["down", "down"]}
                seed={3600 + gi * 1000 + i * 100}
              />
            ))}
          </g>
        );
      })}
      <SketchText x={200} y={264} anchor="middle" size={12}>
        SMALLER GROUPS · SHARED TRAITS
      </SketchText>
    </SketchFrame>
  );
}

/** What each pillar stands on: ages, a place, a feeling, a repeat purchase. */
function PillarGlyph({ i, x, y }: { i: number; x: number; y: number }) {
  if (i === 0)
    return (
      <g>
        <Figure x={x - 28} y={y + 42} k={0.44} headScale={1.5} look={{ hair: "curly", hairTone: SK.brown, skin: SK.brown, skinOpacity: 0.5, wear: SK.ochre, legs: SK.tan }} arms={["down", "down"]} seed={1700} />
        <Figure x={x} y={y + 42} k={0.74} look={SHOPPER} arms={["down", "hip"]} seed={1800} />
        <Figure x={x + 28} y={y + 42} k={0.66} look={{ hair: "short", hairTone: SK.earth, wear: SK.charcoal, legs: SK.tan, outfit: "jacket" }} arms={["down", "down"]} seed={1900} />
      </g>
    );
  if (i === 1) return <MapPin x={x} y={y + 30} s={1.1} seed={1960} />;
  if (i === 2) return <Heart x={x} y={y} s={2.2} seed={1970} />;
  const loop = rp(
    Array.from({ length: 10 }, (_, k) => {
      const a = ((200 - (k / 9) * 250) * Math.PI) / 180;
      return [x + 2 + Math.cos(a) * 14, y - 28 - Math.sin(a) * 12] as Pt;
    }),
  );
  return (
    <g>
      <Cart x={x - 2} y={y + 10} s={1.2} seed={1980} />
      <SketchArrow pts={loop} seed={1990} width={1.1} head={6} />
    </g>
  );
}

export const PILLARS = ["DEMOGRAPHICS", "GEOGRAPHICS", "PSYCHOGRAPHICS", "BEHAVIORAL"];

export function SegmentationPillars() {
  const xs = [100, 300, 500, 700];
  const roof: Pt[] = [[40, 92], [400, 22], [760, 92]];
  const band: Pt[] = [[40, 92], [760, 92], [760, 122], [40, 122]];
  const plinth: Pt[] = [[24, 278], [776, 278], [776, 290], [24, 290]];
  return (
    <SketchFrame
      id="sk-pillars"
      width={800}
      height={330}
      label="A sketched temple front labelled market segmentation, held up by four pillars: demographics (a child, an adult and an older person), geographics (a map pin), psychographics (a heart), behavioral (a shopping cart with a repeat arrow)."
    >
      <Backwash cx={400} cy={170} rx={380} ry={150} seed={1600} opacity={0.35} />
      <Paper pts={roof} seed={1601} />
      <InkLine pts={sharp(roof, true, 2)} seed={1602} closed />
      <Wash pts={band} seed={1603} fill={SK.tan} opacity={0.45} />
      <InkLine pts={sharp(band, true, 2)} seed={1604} closed />
      <SketchText x={400} y={112} anchor="middle" size={12}>
        MARKET SEGMENTATION
      </SketchText>
      {xs.map((x, i) => {
        const cap = rp([[x - 62, 122], [x + 62, 122], [x + 62, 134], [x - 62, 134]]);
        const shaft = rp([[x - 50, 134], [x + 50, 134], [x + 50, 266], [x - 50, 266]]);
        const base = rp([[x - 62, 266], [x + 62, 266], [x + 62, 278], [x - 62, 278]]);
        return (
          <g key={x}>
            <Paper pts={shaft} seed={1610 + i} />
            <InkLine pts={[[x - 50, 134], [x - 50, 266]]} seed={1620 + i} />
            <InkLine pts={[[x + 50, 134], [x + 50, 266]]} seed={1630 + i} />
            <Paper pts={cap} seed={1640 + i} />
            <InkLine pts={sharp(cap, true, 1.5)} seed={1650 + i} width={1.1} closed />
            <Paper pts={base} seed={1660 + i} />
            <InkLine pts={sharp(base, true, 1.5)} seed={1670 + i} width={1.1} closed />
            <PillarGlyph i={i} x={x} y={200} />
            <SketchText x={x} y={314} anchor="middle" size={11}>
              {PILLARS[i]}
            </SketchText>
          </g>
        );
      })}
      <Wash pts={plinth} seed={1680} fill={SK.earth} opacity={0.6} />
      <InkLine pts={sharp(plinth, true, 1.5)} seed={1681} closed />
    </SketchFrame>
  );
}

/* ==========================================================================
   THE ETHICAL BORDER
   ========================================================================== */

/** The seller who appears on the ethics plates. */
const SELLER: Look = { hair: "short", hairTone: SK.brown, skin: SK.camel, skinOpacity: 0.6, wear: SK.leather, legs: SK.charcoal, outfit: "jacket" };

/** Ethical marketing: the product handed over with its facts showing. */
export function Informs() {
  const g = 200;
  const box = sharp(rp([[170, 68], [230, 68], [230, 122], [170, 122]]), true, 2);
  const label = rp([[180, 76], [220, 76], [220, 114], [180, 114]]);
  const badge = rp(blobPts(200, 95, 12, 12, 2010, 12, 0.05));
  return (
    <SketchFrame
      id="sk-informs"
      width={400}
      height={220}
      label="A seller in a leather jacket hands the shopper a camel box; both hold it, and its paper label plainly shows an information mark."
    >
      <Backwash cx={200} cy={120} rx={176} ry={92} seed={2000} opacity={0.45} />
      <Ground x0={50} x1={350} y={g} seed={2002} />
      <Person x={132} y={g} h={152} look={SELLER} arms={["down", "reach"]} seed={2100} />
      <Person x={268} y={g} h={146} flip look={SHOPPER} arms={["down", "reach"]} seed={2200} />
      <Paper pts={box} seed={2004} />
      <Wash pts={box} seed={2005} fill={SK.camel} opacity={0.6} />
      <InkLine pts={box} seed={2006} closed />
      <Paper pts={label} seed={2007} />
      <InkLine pts={label} seed={2008} width={0.9} closed />
      <Wash pts={badge} seed={2011} fill={SK.ochre} opacity={0.85} dx={0.5} dy={0.5} />
      <InkLine pts={badge} seed={2012} width={1} closed />
      <path d={wobble(rp(blobPts(200, 89, 1.6, 1.6, 2013, 6, 0.1)), 2013, 0.1, 4, true)} fill={SK.ink} />
      <InkLine pts={[[200, 94], [200, 101]]} seed={2014} width={2} amp={0.1} />
    </SketchFrame>
  );
}

/** Manipulative marketing: a shopper on strings. */
export function Marionette() {
  const g = 206;
  const h = 128;
  const lh = handAt(200, g, h, "wave", -1);
  const rh = handAt(200, g, h, "wave", 1);
  const bar = sharp(rp([[132, 18], [268, 18], [268, 27], [132, 27]]), true, 1.5);
  const cross = sharp(rp([[196, 8], [204, 8], [204, 44], [196, 44]]), true, 1.5);
  return (
    <SketchFrame
      id="sk-marionette"
      width={400}
      height={220}
      label="A marionette: a wooden control bar hangs above the shopper, with thin strings pulling up both hands and the head."
    >
      <Backwash cx={200} cy={128} rx={150} ry={88} seed={2300} opacity={0.45} />
      <Ground x0={120} x1={280} y={g} seed={2302} />
      <InkLine pts={[[136, 23], lh]} seed={2304} width={0.7} amp={0.2} />
      <InkLine pts={[[264, 23], rh]} seed={2305} width={0.7} amp={0.2} />
      <InkLine pts={[[200, 44], [201, 76]]} seed={2306} width={0.7} amp={0.1} />
      <Person x={200} y={g} h={h} look={SHOPPER} arms={["wave", "wave"]} seed={2310} />
      <Wash pts={bar} seed={2320} fill={SK.leather} opacity={0.75} dx={1} dy={0.5} />
      <InkLine pts={bar} seed={2321} width={1.1} closed />
      <Wash pts={cross} seed={2322} fill={SK.leather} opacity={0.75} dx={0.5} dy={0.5} />
      <InkLine pts={cross} seed={2323} width={1.1} closed />
    </SketchFrame>
  );
}

/** A dark pattern: the sign-up box you cannot easily leave. */
export function DarkPattern() {
  const win = sharp(rp([[20, 14], [380, 14], [380, 306], [20, 306]]), true, 3);
  const modal = sharp(rp([[58, 70], [342, 70], [342, 290], [58, 290]]), true, 3);
  const timer = sharp(rp([[122, 120], [278, 120], [278, 146], [122, 146]]), true, 2);
  const button = sharp(rp([[80, 160], [320, 160], [320, 206], [80, 206]]), true, 3);
  const tickBox = sharp(rp([[80, 220], [94, 220], [94, 234], [80, 234]]), true, 1);
  return (
    <SketchFrame
      id="sk-dark-pattern"
      width={400}
      height={320}
      label="A sketched website pop-up: a huge camel button reading yes, sign me up; a countdown timer; a box to send offers already ticked in teal; and a tiny, faint no thanks link."
    >
      <Backwash cx={200} cy={160} rx={196} ry={158} seed={2400} opacity={0.4} />
      <Paper pts={win} seed={2401} />
      <InkLine pts={win} seed={2402} closed />
      <InkLine pts={[[20, 40], [380, 40]]} seed={2403} width={1} />
      {[36, 50, 64].map((x, i) => (
        <InkLine key={x} pts={rp(blobPts(x, 27, 3.6, 3.6, 2404 + i, 8, 0.05))} seed={2410 + i} width={0.9} closed />
      ))}
      <InkLine pts={[[40, 56], [360, 55]]} seed={2415} width={0.8} />

      <Paper pts={modal} seed={2420} />
      <InkLine pts={modal} seed={2421} closed />
      <SketchText x={200} y={106} anchor="middle" size={19} serif>
        Wait! Don&rsquo;t miss out
      </SketchText>
      <Wash pts={timer} seed={2422} fill={SK.ochre} opacity={0.55} />
      <InkLine pts={timer} seed={2423} width={1} closed />
      <SketchText x={200} y={138} anchor="middle" size={12}>
        ENDS IN 00:59
      </SketchText>
      <Wash pts={button} seed={2424} fill={SK.camel} opacity={0.75} />
      <InkLine pts={button} seed={2425} closed />
      <SketchText x={200} y={188} anchor="middle" size={13}>
        YES, SIGN ME UP
      </SketchText>
      <InkLine pts={tickBox} seed={2426} width={1.1} closed />
      <path
        d={wobble(rp([[82, 226], [86, 232], [96, 216]]), 2427, 0.3, 6)}
        fill="none"
        stroke={SK.teal}
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <SketchText x={104} y={232} size={11}>
        Send me offers every day
      </SketchText>
      <g opacity={0.45}>
        <SketchText x={200} y={272} anchor="middle" size={8}>
          no thanks, I don&rsquo;t like saving money
        </SketchText>
      </g>
    </SketchFrame>
  );
}

/** Regulators and consumers push back: a gavel and a one-star review. */
export function Punished() {
  const handle = sharp(rp([[-4, 12], [4, 12], [4, 108], [-4, 108]]), true, 1.5);
  const head = sharp(rp([[-38, -17], [38, -17], [38, 17], [-38, 17]]), true, 3);
  const block = sharp(rp([[42, 168], [122, 168], [122, 182], [42, 182]]), true, 2);
  const card = sharp(rp([[220, 60], [370, 60], [370, 170], [220, 170]]), true, 3);
  return (
    <SketchFrame
      id="sk-punished"
      width={400}
      height={220}
      label="A wooden judge's gavel coming down on its block, marked regulators, and a paper review card with one star out of five, marked consumers."
    >
      <Backwash cx={200} cy={112} rx={186} ry={96} seed={2500} opacity={0.45} />
      <g transform="translate(66 126) rotate(-120)">
        <Wash pts={handle} seed={2501} fill={SK.tan} opacity={0.75} dx={0.8} dy={0.5} />
        <InkLine pts={handle} seed={2502} width={1.1} closed />
        <Wash pts={head} seed={2503} fill={SK.leather} opacity={0.75} />
        <InkLine pts={head} seed={2504} closed />
        <InkLine pts={[[-24, -17], [-24, 17]]} seed={2505} width={0.9} />
        <InkLine pts={[[24, -17], [24, 17]]} seed={2506} width={0.9} />
      </g>
      <Wash pts={block} seed={2507} fill={SK.leather} opacity={0.75} />
      <InkLine pts={block} seed={2508} closed />
      {[
        [[46, 164], [32, 158]],
        [[106, 162], [120, 155]],
        [[128, 174], [140, 173]],
      ].map((pts, i) => (
        <InkLine key={i} pts={pts as Pt[]} seed={2510 + i} width={1.4} />
      ))}
      <SketchText x={100} y={208} anchor="middle" size={12}>
        REGULATORS
      </SketchText>

      <Paper pts={card} seed={2520} />
      <InkLine pts={card} seed={2521} closed />
      <Stars x={243} y={92} n={1} r={10} gap={26} seed={2530} />
      {[118, 134, 150].map((y, i) => (
        <InkLine key={y} pts={[[236, y], [i === 2 ? 306 : 354, y]]} seed={2550 + i} width={0.8} />
      ))}
      <SketchText x={295} y={208} anchor="middle" size={12}>
        CONSUMERS
      </SketchText>
    </SketchFrame>
  );
}

/* ==========================================================================
   DISCUSSION
   ========================================================================== */

/** The three stages, each in question, beside a scale of need and want. */
export function RegretCheck() {
  const xs = [90, 230, 370];
  const pan = (cx: number) => rp([[cx - 30, 124], [cx + 30, 124], [cx + 22, 138], [cx - 22, 138]]);
  return (
    <SketchFrame
      id="sk-regret-check"
      width={800}
      height={250}
      label="The three stages of consumption, Prepurchase (a magnifier), Purchase (a bag) and Postpurchase (a star rating), each in a round medallion marked with a question mark; beside them a wooden balance scale weighing need against impulsive want, a question mark above it."
    >
      <Backwash cx={400} cy={128} rx={384} ry={112} seed={2600} opacity={0.35} />
      {xs.map((x, i) => (
        <g key={x}>
          <Medallion x={x} y={128} r={46} seed={2610 + i * 5} />
          <StageGlyph stage={i} x={x} y={128} seed={2630 + i * 10} />
          <SketchText x={x + 46} y={92} anchor="middle" size={30} serif>
            ?
          </SketchText>
          <SketchText x={x} y={202} anchor="middle" size={12}>
            {STAGES[i].toUpperCase()}
          </SketchText>
        </g>
      ))}
      <InkLine pts={[[470, 50], [471, 206]]} seed={2660} width={0.8} />

      {/* balance: need against impulsive want */}
      <g transform="translate(-24 0)">
      <Wash pts={rp([[636, 72], [644, 72], [644, 190], [636, 190]])} seed={2670} fill={SK.leather} opacity={0.6} dx={0.5} dy={0} />
      <InkLine pts={[[636, 72], [636, 190]]} seed={2671} />
      <InkLine pts={[[644, 72], [644, 190]]} seed={2672} />
      <Wash pts={rp([[602, 188], [678, 188], [678, 198], [602, 198]])} seed={2673} fill={SK.leather} opacity={0.7} />
      <InkLine pts={sharp(rp([[602, 188], [678, 188], [678, 198], [602, 198]]), true, 1.5)} seed={2674} closed />
      <InkLine pts={[[556, 68], [724, 68]]} seed={2675} width={1.8} />
      <InkLine pts={rp(blobPts(640, 68, 5, 5, 2676, 8, 0.05))} seed={2677} width={1.2} closed />
      {[556, 724].map((cx, i) => (
        <g key={cx}>
          <InkLine pts={[[cx, 68], [cx - 26, 124]]} seed={2680 + i * 4} width={0.8} />
          <InkLine pts={[[cx, 68], [cx + 26, 124]]} seed={2681 + i * 4} width={0.8} />
          <Paper pts={pan(cx)} seed={2682 + i * 4} />
          <InkLine pts={pan(cx)} seed={2683 + i * 4} closed />
        </g>
      ))}
      <SketchText x={640} y={50} anchor="middle" size={30} serif>
        ?
      </SketchText>
      <SketchText x={556} y={166} anchor="middle" size={12}>
        NEED
      </SketchText>
      <SketchText x={724} y={166} anchor="middle" size={12}>
        IMPULSIVE WANT
      </SketchText>
      </g>
    </SketchFrame>
  );
}
