/* ==========================================================================
   Consumer Behavior · Week 03 — plates (Editorial Sketch)
   --------------------------------------------------------------------------
   Learning and memory, drawn in ink and watercolour with the shared kit in
   ../_visuals (see ../CLAUDE.md for the style rules).

   Fixed cast for this week:
     · BrandBadge: the brand, on every plate, from the conditioning panels
       to the shelf to the forgetting curve.
     · Heart: the positive feeling a brand is paired with (broken: a bad one).
     · Node: a knot in the memory web; a lit node takes the teal wash.
     · Head: one profile, wherever memory sits inside the buyer.
     · Person: every human (the shared fashion figure).
   Teal is the one thing learned, lit or recalled on a plate; pencil is only
   for something absent (an empty slot, a forgotten or displaced message).
   ========================================================================== */

import React from "react";
import {
  blobPts,
  InkLine,
  Paper,
  PencilLine,
  type Pt,
  r2,
  SK,
  SketchFrame,
  SketchText,
  Wash,
} from "../_visuals/kit";
import {
  at,
  Backwash,
  Bag,
  Box,
  BrandBadge,
  curvePts,
  Ground,
  handAt,
  Heart,
  Magnifier,
  Notes,
  Pack,
  PayCard,
  Person,
  rp,
  Screen,
  ShapedBottle,
  sharp,
  Shoe,
  SketchArrow,
  Star,
  Thought,
} from "../_visuals/objects";

/* -- the week's cast ------------------------------------------------------- */

/** A knot in the memory web: cream, or washed teal when lit. */
function Node({ x, y, r = 7, seed, lit = false }: { x: number; y: number; r?: number; seed: number; lit?: boolean }) {
  const pts = rp(blobPts(x, y, r, r, seed, 10, 0.08));
  return (
    <g>
      {lit ? <Wash pts={pts} seed={seed + 1} fill={SK.teal} opacity={0.75} dx={0.8} dy={0.6} /> : <Paper pts={pts} seed={seed + 1} />}
      <InkLine pts={pts} seed={seed + 2} width={1} closed />
    </g>
  );
}

/** A link in the memory web; lit links are teal and heavier. */
function Link({ a, b, seed, lit = false }: { a: Pt; b: Pt; seed: number; lit?: boolean }) {
  return <InkLine pts={rp([a, b])} seed={seed} width={lit ? 2 : 0.9} color={lit ? SK.teal : SK.ink} amp={0.5} />;
}

/** A snack packet: a pillow with crimped ends, centred on (x, y). */
function Snack({ x, y, s = 1, seed, fill = SK.ochre }: { x: number; y: number; s?: number; seed: number; fill?: string }) {
  const teeth = (y0: number, tip: number) =>
    Array.from({ length: 5 }, (_, i) => [
      [-15 + i * 6 + 3, tip],
      [-15 + (i + 1) * 6, y0],
    ]).flat() as Pt[];
  const outline = at(x, y, [[-15, -22], ...teeth(-22, -27), [17, -8], [17, 8], [15, 22], ...teeth(22, 27).map(([px, py]) => [-px, py] as Pt), [-17, 8], [-17, -8]], s);
  return (
    <g>
      <Wash pts={outline} seed={seed} fill={fill} opacity={0.8} dx={1} dy={0.8} />
      <InkLine pts={outline} seed={seed + 1} width={1.1} closed amp={0.4} />
      <InkLine pts={at(x, y, [[-15, -16], [15, -16]], s)} seed={seed + 2} width={0.7} />
      <InkLine pts={at(x, y, [[-15, 16], [15, 16]], s)} seed={seed + 3} width={0.7} />
      <BrandBadge x={x} y={y} r={r2(8 * s)} seed={seed + 4} />
    </g>
  );
}

/* The Head: a profile facing +x, in a 360 × 400 box, scaled about (x, y). */
const HEAD_OUTLINE: Pt[] = [
  [118, 392], [108, 350], [86, 310], [74, 262], [72, 222], [80, 160], [112, 98], [160, 64], [222, 56],
  [272, 66], [304, 100], [316, 140], [314, 166], [328, 190], [340, 212], [336, 222], [318, 226],
  [322, 242], [314, 252], [320, 266], [312, 284], [292, 296], [266, 300], [256, 334], [258, 392],
];
const HEAD_HAIR: Pt[] = [
  [74, 250], [72, 210], [80, 160], [112, 98], [160, 64], [222, 56], [272, 66], [300, 96],
  [262, 86], [214, 84], [168, 94], [132, 118], [110, 160], [100, 206], [92, 250],
];

function Head({ x = 0, y = 0, s = 1, seed }: { x?: number; y?: number; s?: number; seed: number }) {
  const outline = at(x, y, HEAD_OUTLINE, s);
  return (
    <g>
      <Wash pts={outline} seed={seed} fill={SK.skin} opacity={0.4} dx={4 * s} dy={3 * s} />
      <Wash pts={at(x, y, HEAD_HAIR, s)} seed={seed + 1} fill={SK.brown} opacity={0.6} dx={2 * s} dy={1 * s} />
      <InkLine pts={outline} seed={seed + 2} width={1.4} />
      {/* ear, eye, a stroke of hair */}
      <InkLine pts={at(x, y, [[144, 252], [134, 264], [136, 284], [148, 292]], s)} seed={seed + 3} width={1} />
      <InkLine pts={at(x, y, [[282, 178], [296, 176]], s)} seed={seed + 4} width={1} />
      <InkLine pts={at(x, y, [[120, 130], [150, 100], [196, 80]], s)} seed={seed + 5} width={0.8} />
    </g>
  );
}

/* ==========================================================================
   TITLE · the brand lives in the head
   ========================================================================== */

const TITLE_NODES: Pt[] = [
  [200, 184], [150, 146], [156, 226], [214, 118], [262, 156], [252, 232], [118, 190], [194, 268], [284, 204],
];
const TITLE_LINKS: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [1, 6], [2, 6], [2, 7], [5, 7], [4, 8], [5, 8], [1, 3], [3, 4],
];

export function BrainBrands() {
  return (
    <SketchFrame
      id="sk-brain-brands"
      width={360}
      height={400}
      label="A head in profile. Inside it, a web of connected memory nodes, with the brand badge at the centre and the links from it lit teal."
    >
      <Backwash cx={196} cy={220} rx={170} ry={180} seed={100} />
      <Head seed={110} />
      {TITLE_LINKS.map(([a, b], i) => (
        <Link key={i} a={TITLE_NODES[a]} b={TITLE_NODES[b]} seed={130 + i * 2} lit={a === 0} />
      ))}
      {TITLE_NODES.slice(1).map(([x, y], i) => (
        <Node key={i} x={x} y={y} r={8} seed={170 + i * 4} lit={i < 5} />
      ))}
      <BrandBadge x={TITLE_NODES[0][0]} y={TITLE_NODES[0][1]} r={17} seed={210} />
    </SketchFrame>
  );
}

/* ==========================================================================
   WHAT IS CONSUMER LEARNING?
   ========================================================================== */

/** A permanent change in behaviour: picks wander, then settle on one brand. */
export function ExperienceChanges() {
  const base = 156;
  const before = [SK.camel, SK.sky, SK.camel, SK.sky, SK.sky, SK.camel];
  return (
    <SketchFrame
      id="sk-experience-changes"
      width={800}
      height={200}
      label="Shopping trips over time, one pack per trip. Before the experience, the picks switch between two plain products. At the experience, marked with a heart, the behaviour changes: every pick after it is the same teal brand pack."
    >
      <Backwash cx={622} cy={112} rx={190} ry={86} seed={300} />
      <SketchText x={172} y={34} anchor="middle" size={13}>
        BEFORE
      </SketchText>
      <SketchText x={628} y={34} anchor="middle" size={13}>
        AFTER
      </SketchText>
      {before.map((f, i) => (
        <Pack key={i} x={36 + i * 54} bottom={base} w={40} h={70} seed={310 + i * 4} fill={f} />
      ))}
      <InkLine pts={rp([[12, base + 1], [334, base]])} seed={340} width={1} />

      <Heart x={400} y={62} s={1.7} seed={350} />
      <InkLine pts={rp([[400, 86], [400, 162]])} seed={345} width={1.1} />
      <SketchText x={400} y={186} anchor="middle" size={13}>
        EXPERIENCE
      </SketchText>

      {Array.from({ length: 6 }, (_, i) => (
        <Pack key={i} x={492 + i * 54} bottom={base} w={40} h={70} seed={360 + i * 4} fill={SK.teal} badge />
      ))}
      <InkLine pts={rp([[466, base + 1], [788, base]])} seed={390} width={1} />
    </SketchFrame>
  );
}

/** Direct experience: you try the snack and like it. */
export function DirectTry() {
  const g = 204;
  const x = 196;
  const bag = handAt(x, g, 176, "hold", -1);
  const bite = handAt(x, g, 176, "chin");
  const chip = rp(blobPts(bite[0] + 3, bite[1] - 1, 3.6, 2.6, 486, 8, 0.2));
  return (
    <SketchFrame id="sk-direct-try" width={400} height={220} label="A person holds a new snack packet in one hand and lifts a chip to their mouth with the other; a heart floats beside their face: they like the taste.">
      <Backwash cx={200} cy={122} rx={150} ry={96} seed={400} />
      <Ground x0={80} x1={320} y={g} seed={405} />
      <Snack x={bag[0] - 10} y={bag[1] - 4} s={1.05} seed={470} />
      <Person x={x} y={g} h={176} seed={410} look={{ hair: "curly", wear: SK.camel }} arms={["hold", "chin"]} />
      <Wash pts={chip} seed={487} fill={SK.ochre} opacity={0.9} dx={0.3} dy={0.3} />
      <InkLine pts={chip} seed={488} width={0.8} closed />
      <Heart x={242} y={40} s={1.3} seed={480} />
    </SketchFrame>
  );
}

/** Indirect experience: seeing an ad, or watching a friend buy running shoes. */
export function IndirectWatch() {
  const g = 204;
  const pay = handAt(300, g, 150, "reach");
  return (
    <SketchFrame
      id="sk-indirect-watch"
      width={400}
      height={220}
      label="Two small scenes. Left: a person watches an ad for a running shoe on a screen. Right: a person watches a friend pay for a pair of running shoes at a shop counter."
    >
      <Backwash cx={100} cy={124} rx={94} ry={92} seed={500} />
      <Backwash cx={300} cy={124} rx={96} ry={92} seed={502} />
      <InkLine pts={rp([[200, 30], [200, 206]])} seed={504} width={0.7} />

      {/* the ad */}
      <Ground x0={14} x1={186} y={g} seed={506} />
      <Screen x={18} y={70} w={96} h={64} seed={510}>
        <Shoe x={66} y={106} s={1.2} seed={520} />
      </Screen>
      <Person x={160} y={g} h={150} flip seed={530} look={{ hair: "bun", wear: SK.sky, skin: SK.camel, skinOpacity: 0.6 }} arms={["hip", "down"]} />

      {/* the friend buying */}
      <Ground x0={214} x1={390} y={g} seed={560} />
      <Person x={236} y={g} h={150} seed={565} look={{ hair: "bun", wear: SK.sky, skin: SK.camel, skinOpacity: 0.6 }} arms={["down", "hip"]} />
      <Person x={300} y={g} h={150} seed={600} look={{ hair: "short", wear: SK.camel, legs: SK.leather }} arms={["down", "reach"]} />
      <Paper pts={sharp([[334, 142], [392, 142], [392, g], [334, g]], true, 2)} seed={640} />
      <Wash pts={sharp([[334, 142], [392, 142], [392, g], [334, g]], true, 2)} seed={641} fill={SK.leather} opacity={0.45} />
      <InkLine pts={sharp([[334, 142], [392, 142], [392, g], [334, g]], true, 2)} seed={642} width={1.1} closed />
      <Shoe x={366} y={134} s={0.9} seed={650} />
      <PayCard x={pay[0] + 6} y={pay[1] - 2} w={20} tilt={-12} seed={660} />
    </SketchFrame>
  );
}

/** Ongoing: a new product slots into what the consumer already knows. */
export function UpdateLoop() {
  const g = 204;
  const slot = sharp([[258, 52], [286, 52], [286, 92], [258, 92]], true, 2);
  return (
    <SketchFrame
      id="sk-update-loop"
      width={400}
      height={220}
      label="A shopper with a thought cloud holding three products they already know and one empty slot. From the shelf on the right, a new teal product marked NEW moves up into the empty slot."
    >
      <Backwash cx={200} cy={118} rx={190} ry={96} seed={700} />
      <Ground x0={20} x1={250} y={g} seed={705} />
      <Person x={62} y={g} h={168} seed={710} look={{ hair: "long", wear: SK.charcoal, legs: SK.camel, skin: SK.tan, skinOpacity: 0.55 }} arms={["hip", "down"]} />
      <Thought x={200} y={72} rx={106} ry={42} tx={74} ty={34} seed={760} />
      <Pack x={140} bottom={92} w={28} h={40} seed={770} fill={SK.camel} />
      <Pack x={184} bottom={92} w={28} h={40} seed={774} fill={SK.sky} />
      <Pack x={228} bottom={92} w={28} h={40} seed={778} fill={SK.camel} badge />
      <PencilLine pts={slot} seed={782} closed />

      <InkLine pts={rp([[312, g], [392, g]])} seed={785} width={1.3} />
      <Box x={352} bottom={g} w={40} h={52} mark="new" fill={SK.teal} seed={790} />
      <SketchArrow pts={curvePts([354, 142], [352, 96], [292, 78], 12)} seed={795} width={1.2} head={8} />
    </SketchFrame>
  );
}

/** An automatic habit: eyes on the phone, the hand takes the brand anyway. */
export function HabitWeek() {
  const g = 204;
  const x = 132;
  const h = 180;
  const talk = handAt(x, g, h, "chin");
  const phone = sharp([[talk[0] - 1, talk[1] - 16], [talk[0] + 11, talk[1] - 18], [talk[0] + 13, talk[1] + 6], [talk[0] + 1, talk[1] + 8]], true, 1.5);
  const top = 104;
  const low = 176;
  const packs = [
    { x: 176, b: top, f: SK.teal, badge: true },
    { x: 218, b: top, f: SK.camel },
    { x: 260, b: top, f: SK.sky },
    { x: 302, b: top, f: SK.camel },
    { x: 176, b: low, f: SK.sky },
    { x: 218, b: low, f: SK.camel },
    { x: 260, b: low, f: SK.sky },
    { x: 302, b: low, f: SK.camel },
  ];
  return (
    <SketchFrame
      id="sk-habit"
      width={400}
      height={220}
      label="A shopper looks down at a phone while their other hand reaches, without looking, for the teal brand pack on the shelf: an automatic habit."
    >
      <Backwash cx={200} cy={118} rx={184} ry={96} seed={800} />
      <Ground x0={40} x1={360} y={g} seed={805} />
      {packs.map((k, i) => (
        <Pack key={i} x={k.x} bottom={k.b} w={32} h={46} seed={810 + i * 4} fill={k.f} badge={k.badge} />
      ))}
      <InkLine pts={rp([[152, top + 1], [328, top]])} seed={850} width={1.4} />
      <InkLine pts={rp([[152, low + 1], [328, low]])} seed={851} width={1.4} />
      <InkLine pts={rp([[328, 40], [328, g]])} seed={852} width={1.1} />
      <Person x={x} y={g} h={h} seed={860} look={{ hair: "short", wear: SK.sky, legs: SK.charcoal, skin: SK.brown, skinOpacity: 0.45 }} arms={["across", "chin"]} />
      <Wash pts={phone} seed={920} fill={SK.charcoal} opacity={0.7} dx={0.5} dy={0.4} />
      <InkLine pts={phone} seed={921} width={1} closed />
    </SketchFrame>
  );
}

/* ==========================================================================
   CLASSICAL CONDITIONING
   ========================================================================== */

/** A dog bowl heaped with meat powder, centred on its rim at (x, y). */
function Bowl({ x, y, seed }: { x: number; y: number; seed: number }) {
  const bowl = at(x, y, [[-32, 0], [32, 0], [26, 18], [-26, 18]]);
  const heap = at(x, y, [[-26, 1], [-14, -9], [0, -13], [14, -9], [26, 1]]);
  return (
    <g>
      <Wash pts={heap} seed={seed} fill={SK.tan} opacity={0.8} dx={0.6} dy={0.4} />
      <InkLine pts={heap} seed={seed + 1} width={0.9} />
      <Wash pts={bowl} seed={seed + 2} fill={SK.charcoal} opacity={0.5} />
      <InkLine pts={bowl} seed={seed + 3} closed />
    </g>
  );
}

/** A seated dog in profile, facing −x; (x, y) is where it sits on the ground. */
function SitDog({ x, y, s = 1, seed }: { x: number; y: number; s?: number; seed: number }) {
  const body = at(x, y, [
    [-52, -100], [-38, -107], [-27, -115], [-12, -122], [1, -117], [9, -97], [26, -62], [40, -42], [43, -20], [35, 0],
    [8, 0], [-6, 0], [-24, 0], [-24, -5], [-15, -8], [-15, -50], [-22, -70], [-31, -86], [-39, -92], [-50, -94],
  ], s);
  const ear = at(x, y, [[-11, -119], [-1, -103], [-5, -90], [-14, -100]], s);
  return (
    <g>
      <Wash pts={body} seed={seed} fill={SK.camel} opacity={0.62} />
      <Wash pts={ear} seed={seed + 1} fill={SK.leather} opacity={0.75} dx={0.6} dy={0.4} />
      <InkLine pts={body} seed={seed + 2} closed />
      <InkLine pts={ear} seed={seed + 3} width={1} />
      <InkLine pts={at(x, y, [[-8, -48], [-6, -1]], s)} seed={seed + 4} width={0.9} />
      <InkLine pts={at(x, y, [[30, -52], [18, -30], [20, -1]], s)} seed={seed + 5} width={0.9} />
      <InkLine pts={at(x, y, [[38, -8], [56, -4], [66, -14]], s)} seed={seed + 6} width={1.1} />
      <path d={`M${r2(x - 31 * s)} ${r2(y - 108 * s)}m-1.6 0a1.6 1.6 0 1 0 3.2 0a1.6 1.6 0 1 0 -3.2 0`} fill={SK.ink} />
      <path d={`M${r2(x - 51 * s)} ${r2(y - 100 * s)}m-2.4 0a2.4 2.2 0 1 0 4.8 0a2.4 2.2 0 1 0 -4.8 0`} fill={SK.ink} />
    </g>
  );
}

/** A hand bell, mouth centred on (x, y), with a few ringing strokes. */
function Bell({ x, y, s = 1, seed }: { x: number; y: number; s?: number; seed: number }) {
  const dome = at(x, y, [[-24, 0], [-20, -10], [-18, -28], [-10, -40], [0, -43], [10, -40], [18, -28], [20, -10], [24, 0]], s);
  const handle = at(x, y, [[-4, -43], [-4, -58], [4, -58], [4, -43]], s);
  const clapper = rp(blobPts(x, y + 7 * s, 5 * s, 5 * s, seed + 5, 8, 0.08));
  return (
    <g>
      <Wash pts={dome} seed={seed} fill={SK.ochre} opacity={0.75} />
      <InkLine pts={dome} seed={seed + 1} closed />
      <Wash pts={handle} seed={seed + 2} fill={SK.leather} opacity={0.8} dx={0.5} dy={0.4} />
      <InkLine pts={handle} seed={seed + 3} width={1.1} closed />
      <InkLine pts={clapper} seed={seed + 6} width={1} closed />
      {[1, -1].map((k) => (
        <g key={k}>
          <InkLine pts={at(x, y, [[k * 30, -40], [k * 36, -30], [k * 36, -20]], s)} seed={seed + 8 + k} width={0.9} />
          <InkLine pts={at(x, y, [[k * 38, -48], [k * 46, -34], [k * 45, -18]], s)} seed={seed + 12 + k} width={0.9} />
        </g>
      ))}
    </g>
  );
}

/** Pavlov's set-up: a bell rings, meat powder waits, the dog drools. */
export function Pavlov() {
  const g = 212;
  const dog = { x: 262, s: 1.35 };
  const mouth: Pt = [r2(dog.x - 44 * dog.s), r2(g - 92 * dog.s)];
  const drops: Pt[] = [[mouth[0], mouth[1] + 12], [mouth[0] + 3, mouth[1] + 28]];
  return (
    <SketchFrame id="sk-pavlov" width={400} height={230} label="Pavlov's set-up: a bell rings above a bowl of meat powder; a seated dog faces them, drooling.">
      <Backwash cx={200} cy={124} rx={188} ry={100} seed={1000} />
      <Ground x0={30} x1={370} y={g} seed={1005} />
      <Bell x={96} y={96} s={1.05} seed={1010} />
      <Bowl x={96} y={186} seed={1020} />
      <SitDog x={dog.x} y={g} s={dog.s} seed={1030} />
      {drops.map(([dx, dy], i) => {
        const pts = at(dx, dy, [[0, -6], [3.5, 1], [0, 4], [-3.5, 1]]);
        return (
          <g key={i}>
            <Wash pts={pts} seed={1040 + i * 2} fill={SK.teal} opacity={0.85} dx={0.3} dy={0.3} />
            <InkLine pts={pts} seed={1041 + i * 2} width={0.8} closed amp={0.2} />
          </g>
        );
      })}
    </SketchFrame>
  );
}

/** One beat of conditioning: stimulus on the left, the feeling on the right. */
function ConditioningStep({ step }: { step: 1 | 2 | 3 }) {
  const cy = 84;
  const heart: Pt = [322, cy];
  const card = (dx: number, dy: number) => sharp([[70 + dx, 42 + dy], [196 + dx, 42 + dy], [196 + dx, 126 + dy], [70 + dx, 126 + dy]], true, 4);
  const labels = {
    1: "Upbeat music leads naturally to a heart, a positive feeling.",
    2: "A card with music plus the brand badge, stacked many deep for repeated pairing, leads to the heart.",
    3: "The brand badge alone now leads to the heart along a teal arrow: the conditioned response.",
  };
  return (
    <SketchFrame id={`sk-conditioning-${step}`} width={400} height={170} label={labels[step]}>
      <Backwash cx={200} cy={88} rx={190} ry={76} seed={1100 + step * 40} opacity={0.4} />
      {step === 1 ? <Notes x={133} y={cy} s={2} seed={1110} /> : null}
      {step === 2 ? (
        <g>
          {[2, 1].map((k) => (
            <g key={k}>
              <Paper pts={card(k * 8, -k * 8)} seed={1150 + k * 3} />
              <InkLine pts={card(k * 8, -k * 8)} seed={1151 + k * 3} width={0.9} closed />
            </g>
          ))}
          <Paper pts={card(0, 0)} seed={1160} />
          <InkLine pts={card(0, 0)} seed={1161} width={1.2} closed />
          <Notes x={104} y={cy} s={1.25} seed={1162} />
          <SketchText x={133} y={cy + 8} anchor="middle" size={22} serif>
            +
          </SketchText>
          <BrandBadge x={164} y={cy} r={18} seed={1166} />
          <SketchText x={133} y={152} anchor="middle" size={11}>
            REPEATEDLY
          </SketchText>
        </g>
      ) : null}
      {step === 3 ? <BrandBadge x={133} y={cy} r={30} seed={1170} /> : null}
      <SketchArrow
        pts={rp([[step === 2 ? 222 : 186, cy], [288, cy]])}
        seed={1180 + step}
        width={step === 3 ? 2 : 1.2}
        color={step === 3 ? SK.teal : SK.ink}
      />
      <Heart x={heart[0]} y={heart[1]} s={2.1} seed={1190 + step * 3} />
    </SketchFrame>
  );
}

export function MusicFeeling() {
  return <ConditioningStep step={1} />;
}

export function PairedRepeatedly() {
  return <ConditioningStep step={2} />;
}

export function BrandAlone() {
  return <ConditioningStep step={3} />;
}

/* ==========================================================================
   REPETITION AND STIMULUS GENERALIZATION
   ========================================================================== */

/** A small ad card with the brand badge and two lines of copy; centre (x, y). */
function AdCard({ x, y, w = 60, seed, pencil = false, badge = true, lit = false, logo }: { x: number; y: number; w?: number; seed: number; pencil?: boolean; badge?: boolean; lit?: boolean; logo?: string }) {
  const h = w * 0.68;
  const pts = sharp([[x - w / 2, y - h / 2], [x + w / 2, y - h / 2], [x + w / 2, y + h / 2], [x - w / 2, y + h / 2]], true, 2);
  const lines = [
    rp([[x - w * 0.08, y - h * 0.12], [x + w * 0.36, y - h * 0.12]]),
    rp([[x - w * 0.08, y + h * 0.16], [x + w * 0.24, y + h * 0.16]]),
  ];
  if (pencil)
    return (
      <g>
        <PencilLine pts={pts} seed={seed} closed />
        {lines.map((l, i) => (
          <PencilLine key={i} pts={l} seed={seed + 2 + i} />
        ))}
        <PencilLine pts={rp(blobPts(x - w * 0.27, y, w * 0.14, w * 0.14, seed + 5, 10, 0.06))} seed={seed + 5} closed />
      </g>
    );
  return (
    <g>
      <Paper pts={pts} seed={seed} />
      {lit ? <Wash pts={pts} seed={seed + 8} fill={SK.teal} opacity={0.6} dx={1} dy={0.8} /> : null}
      <InkLine pts={pts} seed={seed + 1} width={1.1} closed />
      {lines.map((l, i) => (
        <InkLine key={i} pts={l} seed={seed + 2 + i} width={1.4} amp={0.3} color={SK.tan} />
      ))}
      {badge ? <BrandBadge x={r2(x - w * 0.27)} y={y} r={r2(w * 0.14)} seed={seed + 5} /> : null}
      {!badge && logo ? (
        <g>
          <Wash pts={rp(blobPts(x - w * 0.27, y, w * 0.13, w * 0.13, seed + 6, 8, 0.1))} seed={seed + 6} fill={logo} opacity={0.85} dx={0.4} dy={0.3} />
          <InkLine pts={rp(blobPts(x - w * 0.27, y, w * 0.13, w * 0.13, seed + 7, 8, 0.1))} seed={seed + 7} width={0.9} closed />
        </g>
      ) : null}
    </g>
  );
}

/** Link strength over repeated exposures: builds, sags without repetition, wears out. */
function repetitionPts() {
  const x0 = 96;
  const dx = 56;
  const y = (L: number) => r2(236 - L * 170);
  let L = 0;
  const pts: Pt[] = [[x0, y(0)]];
  for (let i = 0; i < 12; i++) {
    const x = x0 + i * dx;
    const worn = i >= 7;
    const peak = worn ? L + 0.03 : L + 0.38 * (1 - L);
    const keep = worn ? 0.84 : 0.9;
    pts.push([x, y(peak)]);
    for (let t = 1; t <= 3; t++) {
      const f = t / 3;
      pts.push([r2(x + f * dx), y(peak * (1 - (1 - keep) * Math.sqrt(f)))]);
    }
    L = peak * keep;
  }
  return pts;
}

export function RepetitionCurve() {
  const pts = repetitionPts();
  const decay = Array.from({ length: 9 }, (_, i) => {
    const f = i / 8;
    return [r2(96 + f * 240), r2(236 - 0.38 * 170 * Math.pow(1 - f, 2))] as Pt;
  });
  const wear = 96 + 7 * 56 - 16;
  const zone = rp([[wear, 36], [772, 36], [772, 236], [wear, 236]]);
  return (
    <SketchFrame
      id="sk-repetition"
      width={800}
      height={290}
      label="A line of link strength over repeated ad exposures, drawn as small ads along the bottom. Each exposure lifts the teal line and it sags between them, building higher: it strengthens the link. After a single exposure, a thin line sinks back to nothing: memory decay. Past the seventh exposure, in a zone marked wear-out, the exposures barely register and the line falls."
    >
      <Wash pts={zone} seed={1200} fill={SK.earth} opacity={0.45} dx={0} dy={0} />
      <SketchText x={wear + 18} y={62} size={13}>
        WEAR-OUT
      </SketchText>
      <SketchText x={110} y={62} size={13}>
        STRENGTHEN THE LINK
      </SketchText>
      <InkLine pts={rp([[80, 237], [776, 236]])} seed={1205} width={1.2} />
      <InkLine pts={decay} seed={1210} width={1} amp={0.3} />
      <SketchText x={346} y={230} size={11}>
        MEMORY DECAY
      </SketchText>
      <InkLine pts={pts} seed={1220} width={2.2} color={SK.teal} amp={0.25} />
      {Array.from({ length: 12 }, (_, i) => (
        <AdCard key={i} x={96 + i * 56} y={262} w={34} seed={1240 + i * 7} />
      ))}
    </SketchFrame>
  );
}

/** A cereal box standing on (x, bottom): body wash, a band with its wordmark, a bowl. */
function Cereal({
  x,
  bottom,
  seed,
  body,
  band,
  word,
  serif = true,
  w = 76,
  h = 108,
  seal = "none",
}: {
  x: number;
  bottom: number;
  seed: number;
  body: string;
  band: string;
  word: string;
  serif?: boolean;
  w?: number;
  h?: number;
  seal?: "ink" | "pencil" | "none";
}) {
  const l = x - w / 2;
  const t = bottom - h;
  const box = sharp([[l, t], [l + w, t], [l + w, bottom], [l, bottom]], true, 2);
  const stripe = rp([[l, t + 12], [l + w, t + 12], [l + w, t + 40], [l, t + 40]]);
  const bowl = at(x, bottom - 22, [[-w * 0.3, -10], [w * 0.3, -10], [w * 0.22, 6], [-w * 0.22, 6]]);
  const sealPts = rp(blobPts(l + w - 8, t - 2, 15, 15, seed + 9, 12, 0.05));
  return (
    <g>
      <Wash pts={box} seed={seed} fill={body} opacity={0.7} />
      <Wash pts={stripe} seed={seed + 1} fill={band} opacity={0.8} dx={1} dy={0.5} />
      <Paper pts={bowl} seed={seed + 2} />
      <InkLine pts={bowl} seed={seed + 3} width={1} closed />
      {[-0.14, 0, 0.14].map((f, i) => (
        <InkLine key={i} pts={rp(blobPts(x + w * f, bottom - 34, 4, 3, seed + 4 + i, 7, 0.1))} seed={seed + 4 + i} width={0.8} closed />
      ))}
      <InkLine pts={box} seed={seed + 7} closed />
      <SketchText x={x} y={t + 32} anchor="middle" size={serif ? 18 : 15} serif={serif} fill={SK.paper}>
        {word}
      </SketchText>
      {seal === "ink" ? <Seal x={l + w - 8} y={t - 2} seed={seed + 10} /> : null}
      {seal === "pencil" ? <PencilLine pts={sealPts} seed={seed + 12} closed /> : null}
    </g>
  );
}

/** The leader's gold seal: a round badge with a star. */
function Seal({ x, y, seed }: { x: number; y: number; seed: number }) {
  const pts = rp(blobPts(x, y, 15, 15, seed, 12, 0.05));
  return (
    <g>
      <Paper pts={pts} seed={seed + 3} />
      <Wash pts={pts} seed={seed} fill={SK.ochre} opacity={0.9} dx={0.5} dy={0.4} />
      <InkLine pts={pts} seed={seed + 1} width={1.1} closed />
      <SketchText x={x} y={r2(y + 5)} anchor="middle" size={15} serif>
        ★
      </SketchText>
    </g>
  );
}

const LEADER = { body: SK.ochre, band: SK.brown, word: "Crisp" };
const COPY = { body: SK.ochre, band: SK.brown, word: "Crispy" };

/** Similar stimuli, the same learned response: a heart for the look-alike too. */
export function GeneralizationChart() {
  const b = 220;
  return (
    <SketchFrame
      id="sk-generalization"
      width={400}
      height={240}
      label="Three cereal boxes on a shelf. The national brand leader, in ochre with a brown band, brings a heart. A look-alike box in the same colours and font brings the same heart. A plain blue box that looks nothing like them brings none."
    >
      <Backwash cx={140} cy={128} rx={138} ry={106} seed={1300} />
      <InkLine pts={rp([[20, b + 1], [380, b]])} seed={1302} width={1.3} />
      <Cereal x={80} bottom={b} seed={1310} {...LEADER} />
      <Cereal x={200} bottom={b} seed={1330} {...COPY} />
      <Cereal x={320} bottom={b} seed={1350} body={SK.sky} band={SK.charcoal} word="oats" serif={false} />
      <Heart x={80} y={62} s={1.5} seed={1370} />
      <Heart x={200} y={62} s={1.5} seed={1374} />
    </SketchFrame>
  );
}

/** A connector between the two boxes: short end ticks, its word above. */
function Match({ y, word, seed }: { y: number; word: string; seed: number }) {
  return (
    <g>
      <InkLine pts={rp([[142, y], [258, y]])} seed={seed} width={1} />
      <InkLine pts={rp([[142, y - 5], [142, y + 5]])} seed={seed + 1} width={1} amp={0.2} />
      <InkLine pts={rp([[258, y - 5], [258, y + 5]])} seed={seed + 2} width={1} amp={0.2} />
      <SketchText x={200} y={y - 8} anchor="middle" size={11}>
        {word}
      </SketchText>
    </g>
  );
}

/** The store brand copies the leader's package colours and fonts. */
export function CopyCat() {
  const b = 206;
  return (
    <SketchFrame
      id="sk-copycat"
      width={400}
      height={240}
      label="The national brand's cereal box and the store brand's box side by side, in the same ochre and brown with the same serif lettering. Lines join their matching fonts and their matching colours."
    >
      <Backwash cx={200} cy={132} rx={192} ry={100} seed={1400} />
      <InkLine pts={rp([[20, b + 1], [380, b]])} seed={1402} width={1.3} />
      <Cereal x={84} bottom={b} seed={1410} {...LEADER} w={100} h={150} />
      <Cereal x={316} bottom={b} seed={1430} {...COPY} w={100} h={150} />
      <Match y={80} word="FONTS" seed={1450} />
      <Match y={140} word="COLORS" seed={1455} />
      <SketchText x={84} y={230} anchor="middle" size={11}>
        NATIONAL BRAND
      </SketchText>
      <SketchText x={316} y={230} anchor="middle" size={11}>
        STORE BRAND
      </SketchText>
    </SketchFrame>
  );
}

/** Discrimination: the leader teaches its one unique difference. */
export function SpotTheDifference() {
  const b = 206;
  return (
    <SketchFrame
      id="sk-spot-difference"
      width={400}
      height={240}
      label="The same two boxes, but the national brand's box carries a star seal on its corner, looked at through a magnifying glass. On the store brand's box the seal is missing: only a faint pencil outline where it would be."
    >
      <Backwash cx={200} cy={132} rx={192} ry={100} seed={1500} />
      <InkLine pts={rp([[20, b + 1], [380, b]])} seed={1502} width={1.3} />
      <Cereal x={84} bottom={b} seed={1510} {...LEADER} w={100} h={150} />
      <Cereal x={316} bottom={b} seed={1530} {...COPY} w={100} h={150} seal="pencil" />
      <Magnifier x={126} y={54} r={27} seed={1550} />
      <Seal x={126} y={54} seed={1560} />
      <SketchText x={246} y={36} anchor="middle" size={11}>
        UNIQUE DIFFERENCE
      </SketchText>
      <SketchText x={84} y={230} anchor="middle" size={11}>
        NATIONAL BRAND
      </SketchText>
      <SketchText x={316} y={230} anchor="middle" size={11}>
        STORE BRAND
      </SketchText>
    </SketchFrame>
  );
}

/* ==========================================================================
   INSTRUMENTAL CONDITIONING
   ========================================================================== */

/** Behaviour → outcome → what is learned: perform it, or avoid it. */
export function InstrumentalMatrix() {
  const rows = [
    { g: 128, good: true },
    { g: 252, good: false },
  ];
  return (
    <SketchFrame
      id="sk-instrumental"
      width={540}
      height={264}
      label="Two rows. In each, the same shopper carries a shopping bag. Top: the behaviour leads to a whole heart, a positive outcome, and the shopper learns to perform it. Bottom: it leads to a broken heart, a negative outcome, and the shopper learns to avoid it."
    >
      <Backwash cx={270} cy={132} rx={262} ry={126} seed={1600} opacity={0.4} />
      {rows.map((r, i) => {
        const hand = handAt(70, r.g, 116, "hold");
        return (
          <g key={i}>
            <InkLine pts={rp([[20, r.g + 1], [130, r.g]])} seed={1610 + i * 40} width={0.9} />
            <Person x={70} y={r.g} h={116} seed={1620 + i * 40} look={{ hair: "bob", wear: SK.camel, skin: SK.skin }} arms={["hip", "hold"]} />
            <Bag x={hand[0] + 2} y={hand[1]} w={22} seed={1650 + i * 40} />
            <SketchArrow pts={rp([[132, r.g - 52], [212, r.g - 52]])} seed={1660 + i * 40} />
            <Heart x={262} y={r.g - 52} s={2.2} seed={1670 + i * 40} broken={!r.good} />
            <SketchArrow pts={rp([[312, r.g - 52], [382, r.g - 52]])} seed={1680 + i * 40} color={r.good ? SK.teal : SK.ink} width={r.good ? 2 : 1.3} />
            <SketchText x={398} y={r.g - 42} size={30} serif fill={r.good ? SK.teal : SK.ink}>
              {r.good ? "Perform" : "Avoid"}
            </SketchText>
          </g>
        );
      })}
    </SketchFrame>
  );
}

/** Positive reinforcement: a loyalty card filling up, and a thank-you discount. */
export function LoyaltyPoints() {
  const card = sharp([[22, 40], [236, 40], [236, 166], [22, 166]], true, 6);
  const tag = rp([[262, 92], [290, 54], [390, 54], [390, 130], [290, 130]]);
  const hole = rp(blobPts(280, 92, 5, 5, 1790, 8, 0.05));
  return (
    <SketchFrame
      id="sk-loyalty"
      width={400}
      height={200}
      label="A loyalty card with eight stamp spots, six filled with stars and two still empty, next to a tag that reads thank you, minus ten percent."
    >
      <Backwash cx={200} cy={104} rx={190} ry={90} seed={1700} />
      <Paper pts={card} seed={1710} />
      <InkLine pts={card} seed={1711} closed />
      <BrandBadge x={48} y={66} r={11} seed={1712} />
      <InkLine pts={rp([[68, 66], [150, 66]])} seed={1715} width={2} color={SK.tan} amp={0.3} />
      {Array.from({ length: 8 }, (_, i) => {
        const x = 52 + (i % 4) * 50;
        const y = 108 + Math.floor(i / 4) * 34;
        return i < 6 ? (
          <Star key={i} x={x} y={y} r={12} seed={1720 + i * 3} />
        ) : (
          <PencilLine key={i} pts={rp(blobPts(x, y, 11, 11, 1750 + i, 10, 0.05))} seed={1750 + i} closed />
        );
      })}
      <Wash pts={tag} seed={1780} fill={SK.camel} opacity={0.75} />
      <InkLine pts={tag} seed={1781} closed />
      <Paper pts={hole} seed={1790} />
      <InkLine pts={hole} seed={1791} width={0.9} closed />
      <SketchText x={342} y={82} anchor="middle" size={9.5}>
        THANK YOU
      </SketchText>
      <SketchText x={342} y={113} anchor="middle" size={22}>
        −10%
      </SketchText>
    </SketchFrame>
  );
}

/** Jagged pain marks either side of a head at (x, y). */
function Pain({ x, y, seed }: { x: number; y: number; seed: number }) {
  return (
    <g>
      {[-1, 1].map((k) => {
        const pts = rp([[x + k * 13, y - 4], [x + k * 19, y - 12], [x + k * 21, y - 3], [x + k * 28, y - 11]]);
        return <InkLine key={k} pts={pts} seed={seed + k} width={1.5} amp={0.2} />;
      })}
    </g>
  );
}

/** A capsule centred on (x, y), tilted by `tilt` degrees. */
function Pill({ x, y, tilt = -30, seed }: { x: number; y: number; tilt?: number; seed: number }) {
  const a = (tilt * Math.PI) / 180;
  const R = (px: number, py: number): Pt => [r2(x + px * Math.cos(a) - py * Math.sin(a)), r2(y + px * Math.sin(a) + py * Math.cos(a))];
  const arc = (cx: number, from: number, to: number) =>
    Array.from({ length: 7 }, (_, i) => {
      const t = ((from + ((to - from) * i) / 6) * Math.PI) / 180;
      return R(cx + Math.cos(t) * 11, Math.sin(t) * 11);
    });
  const left = [R(0, -11), ...arc(-15, 270, 90), R(0, 11)];
  const whole = [...arc(15, -90, 90), ...arc(-15, 90, 270)];
  return (
    <g>
      <Paper pts={whole} seed={seed} />
      <Wash pts={left} seed={seed + 1} fill={SK.camel} opacity={0.85} dx={0.4} dy={0.3} />
      <InkLine pts={whole} seed={seed + 2} width={1.2} closed amp={0.3} />
      <InkLine pts={[R(0, -11), R(0, 11)]} seed={seed + 3} width={1} amp={0.2} />
    </g>
  );
}

/** Negative reinforcement: the medicine removes the headache. */
export function HeadacheGone() {
  const g = 188;
  const h = 150;
  const head = (x: number): [number, number] => [x, r2(g - 186 * (h / 200))];
  return (
    <SketchFrame
      id="sk-headache"
      width={400}
      height={200}
      label="On the left, a person holds their face, jagged pain marks at the head. An arrow passes a pill to the same person on the right, standing easy with hands on hips, the pain marks gone."
    >
      <Backwash cx={200} cy={104} rx={190} ry={92} seed={1800} />
      <Ground x0={20} x1={380} y={g} seed={1805} />
      <Person x={74} y={g} h={h} seed={1810} look={{ hair: "long", hairTone: SK.tan, wear: SK.sky, legs: SK.charcoal }} arms={["down", "chin"]} />
      <Pain x={head(74)[0]} y={head(74)[1]} seed={1860} />
      <SketchArrow pts={rp([[130, 100], [270, 100]])} seed={1870} />
      <Pill x={200} y={80} seed={1880} />
      <Person x={326} y={g} h={h} seed={1810} look={{ hair: "long", hairTone: SK.tan, wear: SK.sky, legs: SK.charcoal }} arms={["hip", "hip"]} />
    </SketchFrame>
  );
}

/** Punishment: a late fee lands after the due date. */
export function LateFee() {
  const cal = sharp([[28, 34], [172, 34], [172, 176], [28, 176]], true, 4);
  const head = rp([[28, 34], [172, 34], [172, 62], [28, 62]]);
  const bill = sharp([[208, 38], [364, 38], [364, 176], [208, 176]], true, 2);
  const stamp = (px: number, py: number): Pt => {
    const a = (-9 * Math.PI) / 180;
    return [r2(290 + px * Math.cos(a) - py * Math.sin(a)), r2(136 + px * Math.sin(a) + py * Math.cos(a))];
  };
  const box = sharp([stamp(-62, -24), stamp(62, -24), stamp(62, 24), stamp(-62, 24)], true, 3);
  return (
    <SketchFrame
      id="sk-late-fee"
      width={400}
      height={200}
      label="A calendar page with the due date circled and the days after it crossed off, and a bill stamped late fee, plus twenty-five dollars."
    >
      <Backwash cx={200} cy={104} rx={190} ry={92} seed={1900} />
      <Paper pts={cal} seed={1910} />
      <Wash pts={head} seed={1911} fill={SK.tan} opacity={0.75} dx={1} dy={0.5} />
      <InkLine pts={cal} seed={1912} closed />
      <SketchText x={100} y={53} anchor="middle" size={10} fill={SK.paper}>
        DUE
      </SketchText>
      {Array.from({ length: 12 }, (_, i) => {
        const x = 50 + (i % 4) * 33;
        const y = 88 + Math.floor(i / 4) * 30;
        return (
          <g key={i}>
            <SketchText x={x} y={y + 5} anchor="middle" size={12}>
              {String(i + 10)}
            </SketchText>
            {i === 5 ? <InkLine pts={rp(blobPts(x, y, 14, 12, 1920, 12, 0.06))} seed={1921} width={1.3} closed /> : null}
            {i > 5 ? <InkLine pts={rp([[x - 10, y + 8], [x + 10, y - 8]])} seed={1930 + i} width={1.3} amp={0.2} /> : null}
          </g>
        );
      })}
      <Paper pts={bill} seed={1950} />
      <InkLine pts={bill} seed={1951} closed />
      {[62, 78, 94].map((y, i) => (
        <InkLine key={y} pts={rp([[224, y], [i === 2 ? 290 : 334, y]])} seed={1955 + i} width={1.6} color={SK.tan} amp={0.3} />
      ))}
      <Wash pts={box} seed={1960} fill={SK.blush} opacity={0.8} dx={0.8} dy={0.6} />
      <InkLine pts={box} seed={1961} width={1.8} closed />
      <g transform="rotate(-9 290 136)">
        <SketchText x={290} y={130} anchor="middle" size={10}>
          LATE FEE
        </SketchText>
        <SketchText x={290} y={153} anchor="middle" size={18}>
          +$25
        </SketchText>
      </g>
    </SketchFrame>
  );
}

/* ==========================================================================
   OBSERVATIONAL LEARNING
   ========================================================================== */

/** Learning from your own reward, and from watching someone else's. */
export function LearnByWatching() {
  const g = 246;
  const h = 164;
  const own = handAt(116, g, h, "up");
  const model = handAt(452, g, h, "up", 1, true);
  const WATCHER = { hair: "bun" as const, wear: SK.sky, skin: SK.camel, skinOpacity: 0.6 };
  return (
    <SketchFrame
      id="sk-learn-by-watching"
      width={560}
      height={262}
      label="Left, personal rewards: a person holds up a star they have earned. Right, watching other people: a person stands to one side and watches someone else hold up the star."
    >
      <Backwash cx={116} cy={152} rx={104} ry={100} seed={2000} />
      <Backwash cx={400} cy={152} rx={150} ry={100} seed={2002} />
      <InkLine pts={rp([[236, 30], [236, 250]])} seed={2004} width={0.7} />
      <SketchText x={116} y={22} anchor="middle" size={11}>
        PERSONAL REWARDS
      </SketchText>
      <SketchText x={400} y={22} anchor="middle" size={11}>
        WATCHING OTHER PEOPLE
      </SketchText>

      <Ground x0={36} x1={200} y={g} seed={2006} />
      <Person x={116} y={g} h={h} seed={2010} look={WATCHER} arms={["hip", "up"]} />
      <Star x={own[0]} y={own[1] - 12} r={14} seed={2060} />

      <Ground x0={270} x1={540} y={g} seed={2066} />
      <Person x={326} y={g} h={h} seed={2070} look={WATCHER} arms={["down", "hip"]} />
      <Person x={452} y={g} h={h} flip seed={2120} look={{ hair: "curly", wear: SK.camel, skin: SK.brown, skinOpacity: 0.45 }} arms={["hip", "up"]} />
      <Star x={model[0]} y={model[1] - 12} r={14} seed={2170} />
    </SketchFrame>
  );
}

/** The watcher in the three steps: the same shopper throughout. */
const SHOPPER = { hair: "bun" as const, wear: SK.sky, skin: SK.camel, skinOpacity: 0.6 };
/** The model: attractive, credible, in the teal jacket the shopper will copy. */
const MODEL = { hair: "curly" as const, wear: SK.teal, skin: SK.brown, skinOpacity: 0.45, outfit: "jacket" as const };

/** A jacket laid flat, centred on (x, y). */
function Jacket({ x, y, s = 1, seed }: { x: number; y: number; s?: number; seed: number }) {
  const pts = at(x, y, [[-9, -24], [-24, -18], [-34, 8], [-26, 12], [-18, -6], [-18, 26], [18, 26], [18, -6], [26, 12], [34, 8], [24, -18], [9, -24], [0, -10]], s);
  return (
    <g>
      <Wash pts={pts} seed={seed} fill={SK.teal} opacity={0.75} />
      <InkLine pts={pts} seed={seed + 1} closed />
      <InkLine pts={at(x, y, [[0, -10], [0, 26]], s)} seed={seed + 2} width={0.9} />
    </g>
  );
}

/** First: attention to an attractive, credible model. */
export function AttendModel() {
  const g = 204;
  const beam = rp([[262, 8], [206, g], [334, g]]);
  return (
    <SketchFrame id="sk-attend-model" width={400} height={220} label="A model in a teal jacket stands in a pool of light. A shopper on the left turns to look at the model.">
      <Backwash cx={200} cy={120} rx={188} ry={96} seed={2200} opacity={0.35} />
      <Wash pts={beam} seed={2205} fill={SK.ochre} opacity={0.35} dx={0} dy={0} />
      <Ground x0={30} x1={370} y={g} seed={2210} />
      <Person x={96} y={g} h={160} seed={2220} look={SHOPPER} arms={["down", "hip"]} />
      <Person x={270} y={g} h={176} flip seed={2270} look={MODEL} arms={["hip", "hip"]} />
    </SketchFrame>
  );
}

/** Second: the shopper remembers what the model wore. */
export function RememberModel() {
  const g = 204;
  return (
    <SketchFrame id="sk-remember-model" width={400} height={220} label="The shopper, now alone, with a thought cloud holding the model's teal jacket.">
      <Backwash cx={200} cy={120} rx={188} ry={96} seed={2300} />
      <Ground x0={40} x1={300} y={g} seed={2310} />
      <Person x={110} y={g} h={160} seed={2220} look={SHOPPER} arms={["down", "chin"]} />
      <Thought x={262} y={80} rx={74} ry={50} tx={124} ty={56} seed={2320} />
      <Jacket x={262} y={80} s={1.25} seed={2340} />
    </SketchFrame>
  );
}

/** Third: the memory becomes a purchase. */
export function CopyPurchase() {
  const g = 204;
  const hand = handAt(186, g, 160, "hold");
  return (
    <SketchFrame id="sk-copy-purchase" width={400} height={220} label="The shopper now wears the same teal jacket and carries a shopping bag.">
      <Backwash cx={200} cy={120} rx={188} ry={96} seed={2400} />
      <Ground x0={60} x1={340} y={g} seed={2410} />
      <Person x={186} y={g} h={160} seed={2220} look={{ ...SHOPPER, wear: SK.teal, outfit: "jacket" }} arms={["hip", "hold"]} />
      <Bag x={hand[0] + 3} y={hand[1]} w={32} seed={2440} />
    </SketchFrame>
  );
}

/* ==========================================================================
   THE MEMORY SYSTEM
   ========================================================================== */

const SENSORY_CARDS: [number, number][] = [
  [56, 110], [118, 96], [184, 112], [80, 150], [150, 146], [206, 158], [52, 196], [120, 190], [178, 204], [92, 236], [160, 240], [214, 226],
];

export function MemoryStorageFlow() {
  const tray = sharp([[328, 152], [466, 152], [466, 212], [328, 212]], true, 4);
  const cab = sharp([[584, 90], [782, 90], [782, 262], [584, 262]], true, 4);
  const field = rp(blobPts(134, 172, 118, 96, 2510, 14, 0.1));
  return (
    <SketchFrame
      id="sk-memory-stores"
      width={800}
      height={320}
      label="Three memory stores from left to right. Sensory memory: many ads scattered loosely, held for a few seconds; the brand's ad, lit teal, gets attention and moves on. Short-term memory: a small tray with room for only four ads, held for about twenty seconds, two more falling out. Elaborative rehearsal moves the brand's ad on to long-term memory: a large cabinet of many filed ads, kept for days, months or years."
    >
      <Wash pts={field} seed={2500} fill={SK.earth} opacity={0.4} dx={0} dy={0} />
      {[
        { x: 134, t: "Sensory", time: "A FEW SECONDS" },
        { x: 400, t: "Short-term", time: "ABOUT 20 SECONDS" },
        { x: 683, t: "Long-term", time: "DAYS · MONTHS · YEARS" },
      ].map((h) => (
        <g key={h.t}>
          <SketchText x={h.x} y={42} anchor="middle" size={24} serif>
            {h.t}
          </SketchText>
          <SketchText x={h.x} y={306} anchor="middle" size={11}>
            {h.time}
          </SketchText>
        </g>
      ))}

      {SENSORY_CARDS.map(([x, y], i) => (
        <AdCard key={i} x={x} y={y} w={40} seed={2520 + i * 9} badge={i === 5} lit={i === 5} />
      ))}
      <SketchArrow pts={rp([[232, 162], [320, 178]])} seed={2640} color={SK.teal} width={1.6} />
      <SketchText x={270} y={152} anchor="middle" size={10}>
        ATTENTION
      </SketchText>

      <Paper pts={tray} seed={2650} />
      <InkLine pts={tray} seed={2651} closed />
      {[0, 1, 2, 3].map((i) => (
        <AdCard key={i} x={348 + i * 33} y={182} w={28} seed={2660 + i * 9} badge={i === 3} lit={i === 3} />
      ))}
      <AdCard x={372} y={250} w={26} seed={2700} badge={false} pencil />
      <AdCard x={430} y={262} w={26} seed={2710} badge={false} pencil />

      <SketchArrow pts={rp([[474, 182], [576, 182]])} seed={2720} color={SK.teal} width={1.6} />
      <SketchText x={525} y={206} anchor="middle" size={8.5}>
        ELABORATIVE
      </SketchText>
      <SketchText x={525} y={219} anchor="middle" size={8.5}>
        REHEARSAL
      </SketchText>

      <Wash pts={cab} seed={2730} fill={SK.leather} opacity={0.35} />
      <InkLine pts={cab} seed={2731} closed />
      {Array.from({ length: 12 }, (_, i) => {
        const c = i % 4;
        const r = Math.floor(i / 4);
        return <AdCard key={i} x={617 + c * 44} y={122 + r * 52} w={34} seed={2740 + i * 9} badge={i === 6} lit={i === 6} />;
      })}
      {[148, 200].map((y, i) => (
        <InkLine key={y} pts={rp([[590, y], [776, y]])} seed={2860 + i} width={0.9} />
      ))}
    </SketchFrame>
  );
}

/** Chunking: ten digits become three groups. */
export function Chunking() {
  const digits = "5145550199".split("");
  const chunks = [
    { t: "514", x: 20, w: 102 },
    { t: "555", x: 136, w: 102 },
    { t: "0199", x: 252, w: 128 },
  ];
  return (
    <SketchFrame id="sk-chunking" width={400} height={210} label="Ten separate digit tiles, 5 1 4 5 5 5 0 1 9 9, become three chunks: 514, 555, 0199.">
      <Backwash cx={200} cy={150} rx={194} ry={58} seed={2900} />
      <SketchText x={20} y={24} size={11}>
        10 ITEMS
      </SketchText>
      {digits.map((d, i) => {
        const x = 20 + i * 36;
        const tile = sharp([[x, 36], [x + 30, 36], [x + 30, 76], [x, 76]], true, 2);
        return (
          <g key={i}>
            <Paper pts={tile} seed={2910 + i * 3} />
            <InkLine pts={tile} seed={2911 + i * 3} width={1} closed />
            <SketchText x={x + 15} y={63} anchor="middle" size={17}>
              {d}
            </SketchText>
          </g>
        );
      })}
      <SketchArrow pts={rp([[200, 86], [200, 112]])} seed={2950} width={1.2} head={7} />
      <SketchText x={20} y={126} size={11}>
        3 CHUNKS
      </SketchText>
      {chunks.map((c, i) => {
        const tile = sharp([[c.x, 138], [c.x + c.w, 138], [c.x + c.w, 188], [c.x, 188]], true, 3);
        return (
          <g key={c.t}>
            <Paper pts={tile} seed={2960 + i * 4} />
            <Wash pts={tile} seed={2961 + i * 4} fill={SK.teal} opacity={0.45} />
            <InkLine pts={tile} seed={2962 + i * 4} closed />
            <SketchText x={c.x + c.w / 2} y={171} anchor="middle" size={24}>
              {c.t}
            </SketchText>
          </g>
        );
      })}
    </SketchFrame>
  );
}

/* ==========================================================================
   ASSOCIATIVE NETWORKS
   ========================================================================== */

const polar = (cx: number, cy: number, r: number, deg: number): Pt => {
  const a = (deg * Math.PI) / 180;
  return [r2(cx + r * Math.cos(a)), r2(cy + r * Math.sin(a))];
};

/** A spider web whose knots are concepts, a brand and feelings. */
export function SpiderWeb() {
  const cx = 200;
  const cy = 128;
  const spokes = Array.from({ length: 8 }, (_, i) => -90 + i * 45);
  const rings = [36, 70, 104];
  const knots = [
    { r: 70, a: -135, k: "concept" },
    { r: 36, a: 0, k: "concept" },
    { r: 104, a: 45, k: "concept" },
    { r: 104, a: 135, k: "brand" },
    { r: 104, a: -45, k: "feeling" },
    { r: 36, a: 180, k: "feeling" },
    { r: 104, a: 180, k: "concept" },
  ];
  return (
    <SketchFrame
      id="sk-spider-web"
      width={400}
      height={256}
      label="A spider web. At its knots sit three kinds of node: small round nodes for concepts, the brand badge for a brand, and hearts for feelings."
    >
      <Backwash cx={200} cy={128} rx={150} ry={120} seed={3000} />
      {spokes.map((a, i) => (
        <InkLine key={a} pts={rp([[cx, cy], polar(cx, cy, 120, a)])} seed={3010 + i} width={0.8} amp={0.4} />
      ))}
      {rings.map((r, j) => (
        <InkLine key={r} pts={[...spokes, spokes[0]].map((a) => polar(cx, cy, r, a))} seed={3030 + j} width={0.8} amp={0.5} />
      ))}
      {knots.map((n, i) => {
        const [x, y] = polar(cx, cy, n.r, n.a);
        if (n.k === "brand") return <BrandBadge key={i} x={x} y={y} r={14} seed={3040 + i * 5} />;
        if (n.k === "feeling") return <Heart key={i} x={x} y={y} s={0.95} seed={3040 + i * 5} />;
        return <Node key={i} x={x} y={y} r={8} seed={3040 + i * 5} />;
      })}
      <SketchText x={74} y={132} anchor="end" size={11}>
        CONCEPT
      </SketchText>
      <SketchText x={288} y={48} size={11}>
        FEELING
      </SketchText>
      <SketchText x={106} y={234} anchor="end" size={11}>
        BRAND
      </SketchText>
    </SketchFrame>
  );
}

/** A word node: a ragged oval with a word, washed teal when lit. */
function WordNode({ x, y, word, seed, lit = true, serif = false, size = 13 }: { x: number; y: number; word: string; seed: number; lit?: boolean; serif?: boolean; size?: number }) {
  const w = word.length * size * 0.42 + 26;
  const pts = rp(blobPts(x, y, w, size + 6, seed, 14, 0.05));
  return (
    <g>
      <Paper pts={pts} seed={seed + 1} />
      {lit ? <Wash pts={pts} seed={seed + 2} fill={SK.teal} opacity={0.45} dx={1.2} dy={0.8} /> : null}
      <InkLine pts={pts} seed={seed + 3} width={1.1} closed />
      <SketchText x={x} y={r2(y + size * 0.36)} anchor="middle" size={size} serif={serif}>
        {word}
      </SketchText>
    </g>
  );
}

/** Nike and the nodes that light up around it. */
export function BrandAssociativeNetwork() {
  const c: Pt = [200, 140];
  const first = [
    { p: [94, 62] as Pt, t: "running" },
    { p: [306, 62] as Pt, t: "sneakers" },
    { p: [94, 218] as Pt, t: "athletes" },
    { p: [304, 218] as Pt, t: "Just Do It" },
  ];
  const outer: [number, Pt][] = [
    [0, [32, 114]],
    [0, [156, 26]],
    [1, [368, 114]],
    [1, [244, 26]],
    [2, [32, 166]],
    [2, [156, 256]],
    [3, [368, 166]],
    [3, [244, 256]],
  ];
  return (
    <SketchFrame
      id="sk-nike-network"
      width={400}
      height={282}
      label="A memory network. The central node reads Nike. Four lit teal nodes are linked to it: running, sneakers, athletes, and Just Do It. Further out, small unlit nodes hang off them."
    >
      <Backwash cx={200} cy={140} rx={194} ry={130} seed={3100} />
      {outer.map(([k, p], i) => (
        <g key={i}>
          <Link a={first[k].p} b={p} seed={3110 + i * 2} />
          <Node x={p[0]} y={p[1]} r={6} seed={3130 + i * 3} />
        </g>
      ))}
      {first.map((f, i) => (
        <Link key={f.t} a={c} b={f.p} seed={3160 + i * 2} lit />
      ))}
      {first.map((f, i) => (
        <WordNode key={f.t} x={f.p[0]} y={f.p[1]} word={f.t} seed={3170 + i * 5} />
      ))}
      <WordNode x={c[0]} y={c[1]} word="Nike" seed={3200} lit={false} serif size={24} />
    </SketchFrame>
  );
}

const SPREAD_NODES: Pt[] = [[0, 0], [-26, -16], [26, -18], [4, 28], [-50, 10], [-36, -42], [52, 4], [36, -46], [-22, 50], [32, 46]];
const SPREAD_LINKS: [number, number][] = [[0, 1], [0, 2], [0, 3], [1, 4], [1, 5], [2, 6], [2, 7], [3, 8], [3, 9]];
const RING = [0, 1, 1, 1, 2, 2, 2, 2, 2, 2];

/** Spreading activation in three beats: the lit centre lights its neighbours, then theirs. */
export function SpreadingActivation() {
  const frames = [66, 200, 334];
  const cy = 108;
  return (
    <SketchFrame
      id="sk-spreading"
      width={400}
      height={180}
      label="The same small network drawn three times. First, only the centre node is lit. Second, the three nodes linked to it light up too. Third, the activation has spread to the outer nodes linked to those."
    >
      <Backwash cx={200} cy={104} rx={194} ry={74} seed={3300} opacity={0.4} />
      {frames.map((fx, f) => (
        <g key={fx}>
          <SketchText x={fx} y={28} anchor="middle" size={18} serif>
            {String(f + 1)}
          </SketchText>
          {SPREAD_LINKS.map(([a, b], i) => (
            <Link
              key={i}
              a={[fx + SPREAD_NODES[a][0], cy + SPREAD_NODES[a][1]]}
              b={[fx + SPREAD_NODES[b][0], cy + SPREAD_NODES[b][1]]}
              seed={3310 + f * 30 + i * 2}
              lit={RING[b] <= f}
            />
          ))}
          {SPREAD_NODES.map(([x, y], i) => (
            <Node key={i} x={fx + x} y={cy + y} r={i === 0 ? 8 : 5.5} seed={3400 + f * 40 + i * 3} lit={RING[i] <= f} />
          ))}
        </g>
      ))}
    </SketchFrame>
  );
}

/** Strong positive links make one brand easy to recall in the aisle. */
export function StrongLinks() {
  const g = 214;
  const head: Pt = [r2(76 + 8), r2(g - 186 * 0.84)];
  return (
    <SketchFrame
      id="sk-strong-links"
      width={400}
      height={230}
      label="A shopper in a store aisle faces a shelf. A thick teal link, carrying a heart, runs from the shopper's head straight to the brand's pack; only a thin link reaches a plain pack on the lower shelf."
    >
      <Backwash cx={200} cy={120} rx={190} ry={104} seed={3500} />
      <Ground x0={24} x1={210} y={g} seed={3505} />
      {[
        { x: 256, b: 118, f: SK.camel, badge: true },
        { x: 306, b: 118, f: SK.sky },
        { x: 356, b: 118, f: SK.camel },
        { x: 256, b: 206, f: SK.sky },
        { x: 306, b: 206, f: SK.camel },
        { x: 356, b: 206, f: SK.sky },
      ].map((k, i) => (
        <Pack key={i} x={k.x} bottom={k.b} w={38} h={60} seed={3510 + i * 4} fill={k.f} badge={k.badge} />
      ))}
      <InkLine pts={rp([[228, 119], [384, 118]])} seed={3540} width={1.4} />
      <InkLine pts={rp([[228, 207], [384, 206]])} seed={3541} width={1.4} />
      <Person x={76} y={g} h={168} seed={3550} look={{ hair: "short", wear: SK.camel, legs: SK.charcoal, skin: SK.skin }} arms={["down", "hip"]} />
      <InkLine pts={curvePts([head[0] + 10, head[1] - 6], [160, 22], [234, 70], 14)} seed={3600} width={3.2} color={SK.teal} amp={0.3} />
      <Heart x={160} y={40} s={1.1} seed={3610} />
      <InkLine pts={curvePts([head[0] + 10, head[1] + 12], [170, 150], [234, 170], 14)} seed={3620} width={0.8} amp={0.3} />
    </SketchFrame>
  );
}

/* ==========================================================================
   RETRIEVAL
   ========================================================================== */

/** Pulling the brand out of long-term memory at the shelf. */
export function Retrieve() {
  const cab = sharp([[22, 70], [178, 70], [178, 196], [22, 196]], true, 4);
  const cells: Pt[] = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) cells.push([54 + c * 46, 96 + r * 40]);
  const gone = 2;
  const slot = sharp([[cells[gone][0] - 15, cells[gone][1] - 10], [cells[gone][0] + 15, cells[gone][1] - 10], [cells[gone][0] + 15, cells[gone][1] + 10], [cells[gone][0] - 15, cells[gone][1] + 10]], true, 2);
  return (
    <SketchFrame
      id="sk-retrieve"
      width={400}
      height={240}
      label="On the left, long-term memory: a cabinet of filed ads with one slot now empty. A teal arrow carries the brand's ad out of the cabinet to the shelf on the right, where the brand's own pack sits at the point of purchase."
    >
      <Backwash cx={200} cy={130} rx={192} ry={104} seed={3700} />
      <SketchText x={84} y={56} anchor="middle" size={10}>
        LONG-TERM MEMORY
      </SketchText>
      <Wash pts={cab} seed={3705} fill={SK.leather} opacity={0.35} />
      <InkLine pts={cab} seed={3706} closed />
      {cells.map(([x, y], i) =>
        i === gone ? null : <AdCard key={i} x={x} y={y} w={30} seed={3710 + i * 9} badge={false} />,
      )}
      <PencilLine pts={slot} seed={3800} closed />
      <SketchArrow pts={curvePts([160, 84], [236, -4], [282, 118], 16)} seed={3810} color={SK.teal} width={1.8} />
      <AdCard x={216} y={42} w={40} seed={3820} lit />
      <InkLine pts={rp([[246, 191], [388, 190]])} seed={3830} width={1.4} />
      <Pack x={284} bottom={190} w={42} h={66} seed={3840} fill={SK.camel} badge />
      <Pack x={344} bottom={190} w={42} h={66} seed={3845} fill={SK.sky} />
      <SketchText x={316} y={214} anchor="middle" size={10}>
        POINT OF PURCHASE
      </SketchText>
    </SketchFrame>
  );
}

/** Shape, colour and logo each pull the same brand memory. */
export function RetrievalCues() {
  const hs = 0.62;
  const hx = 168;
  const hy = 18;
  const mem: Pt = [r2(hx + 200 * hs), r2(hy + 184 * hs)];
  const cues = [
    { y: 70, label: 144, t: "PACKAGING SHAPES" },
    { y: 176, label: 214, t: "COLORS" },
    { y: 246, label: 284, t: "LOGOS" },
  ];
  const swatch = sharp([[40, 158], [76, 158], [76, 194], [40, 194]], true, 3);
  return (
    <SketchFrame
      id="sk-retrieval-cues"
      width={400}
      height={296}
      label="Three cues on the left, one above another: a distinctively shaped bottle, a colour swatch, and the brand's logo. Lines fan from all three into a head in profile, where the brand's memory node lights up teal."
    >
      <Backwash cx={290} cy={150} rx={108} ry={136} seed={3900} />
      <Head x={hx} y={hy} s={hs} seed={3905} />
      {cues.map((c, i) => (
        <InkLine key={c.t} pts={curvePts([92, c.y], [190, c.y], [mem[0] - 20, mem[1] + (i - 1) * 9], 12)} seed={3920 + i * 2} width={1.1} />
      ))}
      <Wash pts={rp(blobPts(mem[0], mem[1], 26, 26, 3930, 12, 0.08))} seed={3930} fill={SK.teal} opacity={0.45} />
      <BrandBadge x={mem[0]} y={mem[1]} r={16} seed={3935} />

      <ShapedBottle x={58} bottom={120} seed={3940} />
      <Wash pts={swatch} seed={3950} fill={SK.camel} opacity={0.85} />
      <InkLine pts={swatch} seed={3951} closed />
      <BrandBadge x={58} y={246} r={18} seed={3955} />
      {cues.map((c) => (
        <SketchText key={c.t} x={20} y={c.label} size={9.5}>
          {c.t}
        </SketchText>
      ))}
    </SketchFrame>
  );
}

/** The ad's distinct box, and the exact same box found on a crowded shelf. */
export function GreenBox() {
  const fills = [SK.camel, SK.sky, SK.earth, SK.leather, SK.charcoal, SK.blush, SK.camel, SK.sky];
  const rows = [150, 232];
  const target = { row: 0, col: 3 };
  const xs = [176, 216, 256, 296, 336, 376];
  return (
    <SketchFrame
      id="sk-green-box"
      width={400}
      height={250}
      label="Top left: an ad on a screen showing one distinct teal box. Right: a crowded two-row shelf of boxes in many muted colours; exactly one is the same teal box, and an arrow runs to it from the ad."
    >
      <Backwash cx={200} cy={130} rx={192} ry={112} seed={4000} />
      <Screen x={16} y={24} w={112} h={88} seed={4010}>
        <Pack x={72} bottom={100} w={32} h={54} seed={4020} fill={SK.teal} />
      </Screen>
      {rows.map((b, r) => (
        <g key={b}>
          {xs.map((x, c) => {
            const hit = r === target.row && c === target.col;
            const h = 56 + ((c * 7 + r * 3) % 3) * 8;
            return <Pack key={c} x={x} bottom={b} w={32} h={h} seed={4030 + r * 40 + c * 5} fill={hit ? SK.teal : fills[(c + r * 3) % fills.length]} />;
          })}
          <InkLine pts={rp([[152, b + 1], [396, b]])} seed={4120 + r} width={1.4} />
        </g>
      ))}
      <SketchArrow pts={curvePts([132, 52], [270, 16], [296, 88], 14)} seed={4130} width={1.3} />
    </SketchFrame>
  );
}

/** State-dependent retrieval: the ad sticks when the buyer's mood matches it. */
export function MoodMatch() {
  const g = 252;
  const h = 138;
  const cols = [
    { x: 64, happy: true, seed: 4200 },
    { x: 264, happy: false, seed: 4300 },
  ];
  return (
    <SketchFrame
      id="sk-mood-match"
      width={400}
      height={264}
      label="Two buyers watch the same upbeat ad, which shows a heart and the brand badge. Left: a buyer in a happy mood, a whole heart beside them, arms up; their thought cloud holds the brand clearly. Right: a buyer in a sad mood, a broken heart beside them, arms down; their thought cloud holds only a faint pencil outline of the brand."
    >
      <Backwash cx={100} cy={150} rx={96} ry={110} seed={4190} />
      <Backwash cx={300} cy={150} rx={96} ry={110} seed={4195} fill={SK.earth} opacity={0.4} />
      <InkLine pts={rp([[200, 20], [200, 252]])} seed={4198} width={0.7} />
      {cols.map((c) => {
        const cloud: Pt = [c.x + 80, 136];
        return (
          <g key={c.x}>
            <Screen x={c.x + 4} y={16} w={104} h={62} seed={c.seed}>
              <Heart x={c.x + 38} y={47} s={1.05} seed={c.seed + 10} />
              <BrandBadge x={c.x + 76} y={47} r={13} seed={c.seed + 14} />
            </Screen>
            <Ground x0={c.x - 44} x1={c.x + 110} y={g} seed={c.seed + 20} />
            <Person
              x={c.x}
              y={g}
              h={h}
              seed={c.seed + 30}
              look={c.happy ? { hair: "curly", wear: SK.camel, skin: SK.skin } : { hair: "curly", wear: SK.charcoal, skin: SK.skin }}
              arms={c.happy ? ["up", "wave"] : ["down", "down"]}
            />
            <Heart x={c.x - 36} y={128} s={1} seed={c.seed + 80} broken={!c.happy} />
            <Thought x={cloud[0]} y={cloud[1]} rx={34} ry={24} tx={c.x + 10} ty={126} seed={c.seed + 90} />
            {c.happy ? (
              <BrandBadge x={cloud[0]} y={cloud[1]} r={14} seed={c.seed + 100} />
            ) : (
              <BrandBadge x={cloud[0]} y={cloud[1]} r={14} seed={c.seed + 100} pencil />
            )}
          </g>
        );
      })}
    </SketchFrame>
  );
}

/* ==========================================================================
   WHY CONSUMERS FORGET
   ========================================================================== */

/** Decay: the brand's memory trace falls away over time. */
export function ForgettingCurve() {
  const pts = Array.from({ length: 25 }, (_, i) => {
    const f = i / 24;
    return [r2(116 + f * 654), r2(214 - 140 * Math.exp(-3.2 * f))] as Pt;
  });
  const marks = [0, 5, 10, 16, 23];
  const fade = [1, 0.7, 0.45, 0.25];
  return (
    <SketchFrame
      id="sk-forgetting-curve"
      width={800}
      height={250}
      label="A memory trace falling over time along a curve. Copies of the brand badge sit on the curve and fade: clear at the start, paler and paler, and only a pencil outline at the end."
    >
      <Backwash cx={250} cy={110} rx={220} ry={90} seed={4400} opacity={0.4} />
      <InkLine pts={rp([[70, 218], [780, 218]])} seed={4405} width={1.2} />
      <InkLine pts={rp([[70, 30], [70, 218]])} seed={4406} width={1.2} />
      <InkLine pts={pts} seed={4410} width={2} amp={0.3} />
      {marks.map((m, i) =>
        i < 4 ? (
          <g key={m} opacity={fade[i]}>
            <BrandBadge x={pts[m][0]} y={r2(pts[m][1] - 30)} r={16} seed={4420 + i * 5} />
          </g>
        ) : (
          <BrandBadge key={m} x={pts[m][0]} y={r2(pts[m][1] - 30)} r={16} seed={4420 + i * 5} pencil />
        ),
      )}
      <SketchText x={780} y={240} anchor="end" size={11}>
        TIME →
      </SketchText>
      <g transform="rotate(-90 52 124)">
        <SketchText x={52} y={124} anchor="middle" size={11}>
          MEMORY TRACE
        </SketchText>
      </g>
      <SketchText x={250} y={196} size={13}>
        DECAY
      </SketchText>
    </SketchFrame>
  );
}

/** Interference: new ads pile in and displace the older message. */
export function Interference() {
  const pile: [number, number, number][] = [
    [214, 112, 6],
    [262, 138, -5],
    [300, 100, 4],
  ];
  return (
    <SketchFrame
      id="sk-interference"
      width={400}
      height={220}
      label="A pile of new ads for other brands slides in from the right. The older brand message they push aside is left as only a faint pencil outline."
    >
      <Backwash cx={230} cy={118} rx={160} ry={90} seed={4500} />
      <g transform="rotate(-10 86 120)">
        <AdCard x={86} y={120} w={96} seed={4510} pencil />
      </g>
      {pile.map(([x, y, a], i) => (
        <g key={i} transform={`rotate(${a} ${x} ${y})`}>
          <AdCard x={x} y={y} w={96} seed={4520 + i * 9} badge={false} logo={[SK.camel, SK.sky, SK.charcoal][i]} />
        </g>
      ))}
      <SketchArrow pts={rp([[390, 58], [352, 58]])} seed={4560} />
      <SketchArrow pts={rp([[390, 176], [352, 176]])} seed={4563} />
      <SketchText x={86} y={196} anchor="middle" size={10}>
        OLDER
      </SketchText>
      <SketchText x={258} y={200} anchor="middle" size={10}>
        NEW
      </SketchText>
    </SketchFrame>
  );
}

/** Retroactive or proactive: which way the interference runs along time. */
function InterferenceDirection({ back }: { back: boolean }) {
  const oldX = 96;
  const newX = 304;
  const seed = back ? 4600 : 4700;
  const arc = back ? curvePts([newX - 16, 80], [200, 4], [oldX + 16, 80], 14) : curvePts([oldX + 16, 80], [200, 4], [newX - 16, 80], 14);
  return (
    <SketchFrame
      id={back ? "sk-retroactive" : "sk-proactive"}
      width={400}
      height={220}
      label={
        back
          ? "A timeline: old information on the left, new learning on the right. An arrow curves back from the new card to the old one, which is left as only a pencil outline."
          : "A timeline: an older habit on the left, a new brand name on the right. An arrow curves forward from the old habit to the new name, which is left as only a pencil outline."
      }
    >
      <Backwash cx={200} cy={118} rx={190} ry={90} seed={seed} />
      <SketchArrow pts={rp([[24, 176], [376, 176]])} seed={seed + 2} width={1} head={7} />
      <AdCard x={oldX} y={120} w={96} seed={seed + 10} pencil={back} badge={false} logo={SK.camel} />
      <AdCard x={newX} y={120} w={96} seed={seed + 20} pencil={!back} />
      <SketchArrow pts={arc} seed={seed + 30} width={1.8} />
      <SketchText x={oldX} y={202} anchor="middle" size={10}>
        {back ? "OLD INFORMATION" : "OLDER HABIT"}
      </SketchText>
      <SketchText x={newX} y={202} anchor="middle" size={10}>
        {back ? "NEW LEARNING" : "NEW BRAND NAME"}
      </SketchText>
    </SketchFrame>
  );
}

export function Retroactive() {
  return <InterferenceDirection back />;
}

export function Proactive() {
  return <InterferenceDirection back={false} />;
}

/** Three defences: one identity everywhere, regular reminders, a clear spot on the shelf. */
export function FightForgetting() {
  const base = 170;
  const cup = rp([[36, 104], [86, 104], [80, base], [42, base]]);
  const line: Pt[] = [];
  let L = 0.8;
  for (let i = 0; i < 6; i++) {
    const x = 304 + i * 36;
    const peak = Math.min(0.92, L + 0.2);
    line.push([x, r2(150 - peak * 80)]);
    L = peak * 0.8;
    line.push([x + 34, r2(150 - L * 80)]);
  }
  return (
    <SketchFrame
      id="sk-fight-forgetting"
      width={800}
      height={236}
      label="Three panels. Consistent visual identity: a cup, a shopping bag and a box all carry the same brand badge. Reminder ads: small ads arrive at regular intervals, and each one lifts a teal memory line before it can fall far. Clear shelf placement: on a shelf of plain packs, the brand's packs stand together at eye level."
    >
      <Backwash cx={400} cy={120} rx={396} ry={108} seed={4800} opacity={0.4} />
      {[266, 534].map((x, i) => (
        <InkLine key={x} pts={rp([[x, 26], [x, 196]])} seed={4805 + i} width={0.7} />
      ))}

      <Wash pts={cup} seed={4810} fill={SK.paper} opacity={1} dx={0} dy={0} />
      <InkLine pts={cup} seed={4811} closed />
      <BrandBadge x={61} y={136} r={13} seed={4812} />
      <Bag x={138} y={92} w={52} seed={4820} />
      <Box x={212} bottom={base} w={54} h={70} seed={4830} />
      <InkLine pts={rp([[24, base + 1], [248, base]])} seed={4840} width={1} />

      <InkLine pts={line} seed={4850} width={2} color={SK.teal} amp={0.2} />
      {Array.from({ length: 6 }, (_, i) => (
        <g key={i}>
          <InkLine pts={rp([[304 + i * 36, 166], [304 + i * 36, line[i * 2][1] + 6]])} seed={4900 + i} width={0.7} amp={0.2} />
          <AdCard x={304 + i * 36} y={178} w={28} seed={4860 + i * 9} />
        </g>
      ))}

      {[92, 136, 180].map((b, r) => (
        <g key={b}>
          {Array.from({ length: 5 }, (_, c) => {
            const mine = r === 1 && c >= 1 && c <= 3;
            return <Pack key={c} x={580 + c * 44} bottom={b} w={30} h={36} seed={4920 + r * 30 + c * 5} fill={mine ? SK.camel : [SK.sky, SK.earth][(c + r) % 2]} badge={mine} />;
          })}
          <InkLine pts={rp([[554, b + 1], [782, b]])} seed={4910 + r} width={1.2} />
        </g>
      ))}

      {[
        { x: 134, t: "CONSISTENT VISUAL IDENTITY" },
        { x: 400, t: "REMINDER ADS" },
        { x: 668, t: "CLEAR SHELF PLACEMENT" },
      ].map((k) => (
        <SketchText key={k.t} x={k.x} y={222} anchor="middle" size={10.5}>
          {k.t}
        </SketchText>
      ))}
    </SketchFrame>
  );
}

/* ==========================================================================
   DISCUSSION · your brand web
   ========================================================================== */

export function YourBrandWeb() {
  const c: Pt = [400, 128];
  const spots = [-157, -23, 23, 157].map((a, i) => ({ n: i + 1, p: polar(c[0], c[1], 196, a) }));
  return (
    <SketchFrame
      id="sk-your-brand-web"
      width={800}
      height={372}
      label="An empty memory web to fill in: a centre placeholder for your brand and four numbered empty nodes around it, each link marked with a question mark, all in pencil. Below, three ways the links might have been taught: conditioning (music plus the brand badge), observation (one person watching another), and personal experience (a snack and a heart)."
    >
      <Backwash cx={400} cy={130} rx={330} ry={116} seed={5000} opacity={0.4} />
      {spots.map((sp, i) => {
        const mid: Pt = [r2((c[0] + sp.p[0]) / 2), r2((c[1] + sp.p[1]) / 2)];
        return (
          <g key={sp.n}>
            <PencilLine pts={rp([c, sp.p])} seed={5010 + i} />
            <Paper pts={rp(blobPts(mid[0], mid[1], 12, 12, 5020 + i, 10, 0.05))} seed={5020 + i} />
            <SketchText x={mid[0]} y={mid[1] + 6} anchor="middle" size={17} serif>
              ?
            </SketchText>
            <Paper pts={rp(blobPts(sp.p[0], sp.p[1], 30, 30, 5030 + i, 12, 0.05))} seed={5030 + i} />
            <PencilLine pts={rp(blobPts(sp.p[0], sp.p[1], 30, 30, 5030 + i, 12, 0.05))} seed={5040 + i} closed />
            <SketchText x={sp.p[0]} y={sp.p[1] + 7} anchor="middle" size={20} serif>
              {String(sp.n)}
            </SketchText>
          </g>
        );
      })}
      <Paper pts={rp(blobPts(c[0], c[1], 52, 52, 5050, 14, 0.05))} seed={5050} />
      <PencilLine pts={rp(blobPts(c[0], c[1], 52, 52, 5050, 14, 0.05))} seed={5051} closed />
      <SketchText x={c[0]} y={c[1] - 3} anchor="middle" size={11}>
        YOUR
      </SketchText>
      <SketchText x={c[0]} y={c[1] + 13} anchor="middle" size={11}>
        BRAND
      </SketchText>

      <InkLine pts={rp([[40, 262], [760, 262]])} seed={5060} width={0.7} />
      <Notes x={120} y={302} s={1.1} seed={5070} />
      <SketchText x={150} y={309} anchor="middle" size={18} serif>
        +
      </SketchText>
      <BrandBadge x={180} y={302} r={15} seed={5075} />
      <SketchText x={150} y={362} anchor="middle" size={11}>
        CONDITIONING
      </SketchText>

      <g transform="translate(400 342) scale(0.46)">
        <Person x={-60} y={0} h={140} seed={5080} look={SHOPPER} arms={["down", "hip"]} />
        <Person x={60} y={0} h={140} flip seed={5130} look={MODEL} arms={["hip", "hip"]} />
      </g>
      <SketchText x={400} y={362} anchor="middle" size={11}>
        OBSERVATION
      </SketchText>

      <Snack x={624} y={302} s={0.8} seed={5180} />
      <Heart x={668} y={296} s={1.1} seed={5190} />
      <SketchText x={648} y={362} anchor="middle" size={11}>
        PERSONAL EXPERIENCE
      </SketchText>
    </SketchFrame>
  );
}
