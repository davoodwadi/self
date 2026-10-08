/* ==========================================================================
   Consumer Behavior · Week 10 — figures
   --------------------------------------------------------------------------
   Editorial Sketch plates for social influence, reference groups and word
   of mouth: wobbly doubled ink and loose watercolour washes set off-register.
   Every mark comes from ../_visuals; the style rules live in ../CLAUDE.md.

   Fixed cast for this week:
     · Person: every human, one fashion-illustration figure (the SHOPPER
       look for the consumer being influenced), varied only by hair,
       clothes and skin washes.
     · Shoe: the sneaker the week's consumer weighs up.
     · SpeechBubble: every piece of advice or word of mouth.
     · ReviewCard: every online review.
     · Agent: the AI assistant (shared: a phone with the AI sparkle).

   Colour roles: teal is the one thing chosen, bought, lit or ticked on a
   plate; ochre a badge, a count or a small highlight; pencil only an absent
   object (an empty chair, a product put back).
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
  Bag,
  Box,
  BrandBadge,
  curvePts,
  Ground,
  handAt,
  Heart,
  Laptop2,
  type Look,
  Person,
  ReviewCard,
  rp,
  sharp,
  Shoe,
  SketchArrow,
  SpeechBubble,
  Sparkle,
  Stars,
  Tag1,
  Tag2,
  Tick2,
} from "../_visuals/objects";

/* -- the week's looks ---------------------------------------------------- */

const SHOPPER: Look = { hair: "curly", hairTone: SK.brown, wear: SK.camel, legs: SK.charcoal, skin: SK.tan, skinOpacity: 0.55 };
const FRIEND: Look = { hair: "long", hairTone: SK.leather, wear: SK.sky, legs: SK.charcoal };
const FRIEND2: Look = { hair: "short", hairTone: SK.charcoal, wear: SK.stone, legs: SK.leather, skin: SK.camel, skinOpacity: 0.6 };
const ELDER: Look = { hair: "bun", hairTone: SK.stone, wear: SK.earth, legs: SK.charcoal, skin: SK.skin };

/* ==========================================================================
   Title Slide
   ========================================================================== */

/**
 * Choosing with others: the shopper holds up a sneaker while two friends lean
 * in to look, and an AI assistant on a stool beside them answers with a
 * sneaker of its own in a speech bubble.
 */
export function NotAlone() {
  const g = 326;
  const hand = handAt(236, g, 250, "reach", 1);
  return (
    <SketchFrame
      id="sk-not-alone"
      width={520}
      height={350}
      label="A shopper holds up a sneaker. Two friends lean in to look at it, and an AI assistant on a stool beside them answers with a sneaker in a speech bubble."
    >
      <Backwash cx={260} cy={190} rx={250} ry={150} seed={100} />
      <Ground x0={30} x1={500} y={g} seed={101} />
      <Person x={124} y={g} h={236} look={FRIEND} arms={["hip", "reach"]} seed={110} />
      <Person x={236} y={g} h={250} look={SHOPPER} arms={["hip", "reach"]} seed={140} />
      <Shoe x={r2(hand[0] + 18)} y={r2(hand[1] + 3)} s={1.15} seed={170} fill={SK.teal} />
      <Person x={378} y={g} h={230} look={FRIEND2} arms={["chin", "down"]} flip seed={180} />
      {/* the assistant on a stool */}
      <InkLine pts={rp([[434, 244], [428, g]])} seed={210} width={1.2} />
      <InkLine pts={rp([[478, 244], [484, g]])} seed={211} width={1.2} />
      <InkLine pts={rp([[431, 290], [481, 290]])} seed={214} width={0.9} />
      <Wash pts={rp([[422, 236], [490, 236], [490, 246], [422, 246]])} seed={212} fill={SK.leather} opacity={0.6} />
      <InkLine pts={rp([[422, 236], [490, 236], [490, 246], [422, 246]])} seed={213} width={1.1} closed />
      <Agent x={456} y={236} s={0.95} seed={220} />
      <SpeechBubble x={448} y={70} w={92} h={58} tx={456} ty={152} seed={230} />
      <Shoe x={448} y={78} s={0.95} seed={240} />
    </SketchFrame>
  );
}

/* ==========================================================================
   Why Other People Shape Our Choices
   ========================================================================== */

/** A speech bubble holding one heart: someone admires what they see. */
function AdmireBubble({ x, y, tx, ty, seed }: { x: number; y: number; tx: number; ty: number; seed: number }) {
  return (
    <g>
      <SpeechBubble x={x} y={y} w={46} h={36} tx={tx} ty={ty} seed={seed} />
      <Heart x={x} y={r2(y + 1)} s={0.85} seed={seed + 5} />
    </g>
  );
}

/**
 * A teenager in new teal sneakers, with two friends either side whose speech
 * bubbles each hold a heart: the friends admire the shoes.
 */
export function AdmiredSneakers() {
  const g = 240;
  const teen: Look = { hair: "short", hairTone: SK.brown, wear: SK.stone, legs: SK.charcoal, skin: SK.skin };
  return (
    <SketchFrame
      id="sk-admired-sneakers"
      width={400}
      height={260}
      label="A teenager stands in big new teal sneakers. Two friends on either side look on, one pointing at the shoes, each with a heart in a speech bubble: they admire the sneakers."
    >
      <Backwash cx={200} cy={150} rx={192} ry={104} seed={300} />
      <Ground x0={30} x1={370} y={g} seed={301} />
      <Person x={84} y={g} h={180} headScale={1.15} look={FRIEND} arms={["hip", "low"]} seed={310} />
      <Person x={200} y={g} h={190} headScale={1.15} look={teen} arms={["hip", "hip"]} seed={340} />
      <Shoe x={186} y={r2(g - 3)} s={0.64} seed={350} fill={SK.teal} />
      <Shoe x={216} y={r2(g)} s={0.64} seed={356} fill={SK.teal} />
      <Person x={316} y={g} h={174} headScale={1.15} look={{ ...FRIEND2, hair: "curly" }} arms={["down", "hip"]} flip seed={370} />
      <AdmireBubble x={60} y={36} tx={78} ty={56} seed={400} />
      <AdmireBubble x={342} y={42} tx={324} ty={62} seed={410} />
    </SketchFrame>
  );
}

/** A pram in side view, standing on (x, y), its push bar toward −x (+x when `flip`). */
function Pram({ x, y, s = 1, seed, flip = false }: { x: number; y: number; s?: number; seed: number; flip?: boolean }) {
  const f = flip ? -1 : 1;
  const P = (pts: Pt[]) => at(x, y, pts.map(([px, py]) => [px * f, py] as Pt), s);
  const body = P([[-30, -46], [26, -46], [24, -30], [12, -20], [-18, -20], [-28, -30]]);
  const hood = P([[4, -46], [8, -62], [16, -70], [26, -68], [32, -56], [28, -46]]);
  return (
    <g>
      <InkLine pts={P([[-28, -40], [-46, -100], [-54, -102]])} seed={seed} width={1.4} />
      <InkLine pts={P([[-14, -20], [-20, -8]])} seed={seed + 1} width={1} />
      <InkLine pts={P([[10, -20], [18, -8]])} seed={seed + 2} width={1} />
      <Wash pts={body} seed={seed + 3} fill={SK.sky} opacity={0.7} />
      <InkLine pts={body} seed={seed + 4} closed />
      <Wash pts={hood} seed={seed + 5} fill={SK.charcoal} opacity={0.55} />
      <InkLine pts={hood} seed={seed + 6} closed width={1.1} />
      {[-21, 19].map((wx, i) => (
        <InkLine key={wx} pts={rp(blobPts(x + wx * s * f, y - 7 * s, 7 * s, 7 * s, seed + 7 + i, 10, 0.05))} seed={seed + 7 + i} closed width={1.2} />
      ))}
    </g>
  );
}

/**
 * A new parent, a baby in arms, asks a parent pushing a pram; the question
 * bubble holds the pram with a question mark.
 */
export function AskOtherParents() {
  const g = 232;
  const push = handAt(272, g, 176, "low", 1, true);
  return (
    <SketchFrame
      id="sk-ask-other-parents"
      width={400}
      height={260}
      label="A new parent holding a baby asks another parent, who is pushing a pram, about it: the question bubble shows the pram and a question mark."
    >
      <Backwash cx={200} cy={150} rx={192} ry={104} seed={500} />
      <Ground x0={24} x1={376} y={g} seed={501} />
      <Person x={104} y={g} h={176} look={SHOPPER} arms={["hug", "hug"]} seed={510} />
      {/* the baby, wrapped in a blanket in the parent's arms */}
      <Wash pts={rp(blobPts(108, 122, 15, 10, 540, 12, 0.1))} seed={540} fill={SK.blush} opacity={0.8} />
      <InkLine pts={rp(blobPts(108, 122, 15, 10, 541, 12, 0.1))} seed={541} closed width={1.1} />
      <Wash pts={rp(blobPts(120, 116, 6, 6, 542, 10, 0.05))} seed={542} fill={SK.skin} opacity={0.7} />
      <InkLine pts={rp(blobPts(120, 116, 6, 6, 543, 10, 0.05))} seed={543} closed width={0.9} />
      <Person x={272} y={g} h={176} look={ELDER} arms={["hip", "low"]} flip seed={560} />
      <Pram x={r2(push[0] - 54 * 1.05)} y={g} s={1.05} seed={590} flip />
      <SpeechBubble x={164} y={42} w={92} h={50} tx={124} ty={70} seed={620} />
      <Pram x={146} y={62} s={0.36} seed={630} flip />
      <SketchText x={190} y={52} anchor="middle" size={20} serif>
        ?
      </SketchText>
    </SketchFrame>
  );
}

/**
 * Seen or not: on the street, a jacket, a car and a phone are in view of
 * passers-by (open eyes); behind the closed front door, toothpaste by the
 * basin and a mattress on the bed are seen by no one.
 */
export function SeenOrNot() {
  const g = 236;
  return (
    <SketchFrame
      id="sk-seen-or-not"
      width={800}
      height={262}
      label="Left, on the street: a person in a camel jacket, a phone at the ear, stands by a car while two passers-by look on and one points. Right, inside the home behind a closed door: a toothpaste tube by the basin and a mattress on a bed, seen by no one."
    >
      <Backwash cx={250} cy={146} rx={240} ry={110} seed={700} />
      <Backwash cx={636} cy={146} rx={150} ry={110} seed={701} fill={SK.earth} opacity={0.4} />
      <SketchText x={250} y={24} anchor="middle" size={12}>
        SEEN BY OTHERS
      </SketchText>
      <SketchText x={636} y={24} anchor="middle" size={12}>
        PRIVATE
      </SketchText>
      <Ground x0={30} x1={470} y={g} seed={702} />
      {/* the street: a car, a person in a jacket with a phone, eyes on them */}
      <Car x={124} y={g} seed={720} />
      <Person x={262} y={g} h={180} look={SHOPPER} arms={["hip", "chin"]} seed={740} />
      <PhoneInHand at={handAt(262, g, 180, "chin", 1)} seed={760} />
      <Person x={372} y={g} h={168} look={FRIEND} arms={["down", "point"]} flip seed={770} />
      <Person x={432} y={g} h={172} look={FRIEND2} arms={["down", "down"]} flip seed={800} />
      {/* the wall and the closed door */}
      <InkLine pts={rp([[488, 40], [490, g + 4]])} seed={790} width={1.6} />
      <Wash pts={rp([[494, 96], [526, 96], [526, g], [494, g]])} seed={791} fill={SK.leather} opacity={0.55} />
      <InkLine pts={rp([[494, 96], [526, 96], [526, g], [494, g]])} seed={792} closed />
      <InkLine pts={rp(blobPts(519, 168, 2.4, 2.4, 793, 8, 0.05))} seed={793} closed width={1} />
      {/* inside: basin with toothpaste, a bed with its mattress */}
      <Basin x={586} y={g} seed={820} />
      <Bed x={706} y={g} seed={860} />
    </SketchFrame>
  );
}

/** A phone held to the ear by a hand at `at`. */
function PhoneInHand({ at: [hx, hy], seed }: { at: Pt; seed: number }) {
  const body = sharp(rp([[hx - 1, hy - 14], [hx + 6, hy - 15], [hx + 8, hy + 3], [hx + 1, hy + 4]]), true, 1.5);
  return (
    <g>
      <Wash pts={body} seed={seed} fill={SK.charcoal} opacity={0.75} dx={0.4} dy={0.3} />
      <InkLine pts={body} seed={seed + 1} closed width={1} />
    </g>
  );
}

/** A small hatchback in side view, standing on (x, y). */
function Car({ x, y, s = 1, seed }: { x: number; y: number; s?: number; seed: number }) {
  const body = at(x, y, [[-88, -14], [-86, -34], [-60, -40], [-38, -66], [24, -66], [52, -42], [84, -36], [90, -16], [84, -12], [-82, -12]], s);
  const glass = at(x, y, [[-30, -60], [-4, -60], [-4, -42], [-48, -42]], s);
  const glass2 = at(x, y, [[4, -60], [22, -60], [42, -42], [4, -42]], s);
  return (
    <g>
      <Wash pts={body} seed={seed} fill={SK.charcoal} opacity={0.5} />
      <InkLine pts={body} seed={seed + 1} closed />
      {[glass, glass2].map((p, i) => (
        <g key={i}>
          <Wash pts={p} seed={seed + 2 + i} fill={SK.sky} opacity={0.85} dx={0.6} dy={0.4} />
          <InkLine pts={p} seed={seed + 4 + i} closed width={1} />
        </g>
      ))}
      {[-54, 56].map((wx, i) => (
        <g key={wx}>
          <Wash pts={rp(blobPts(x + wx * s, y - 12 * s, 14 * s, 14 * s, seed + 6 + i, 12, 0.04))} seed={seed + 6 + i} fill={SK.ink} opacity={0.75} dx={0} dy={0} />
          <InkLine pts={rp(blobPts(x + wx * s, y - 12 * s, 14 * s, 14 * s, seed + 8 + i, 12, 0.04))} seed={seed + 8 + i} closed width={1.2} />
          <InkLine pts={rp(blobPts(x + wx * s, y - 12 * s, 5 * s, 5 * s, seed + 10 + i, 8, 0.04))} seed={seed + 10 + i} closed width={0.9} color={SK.paper} />
        </g>
      ))}
    </g>
  );
}

/** A pedestal basin standing on (x, y), a toothpaste tube on its rim. */
function Basin({ x, y, seed }: { x: number; y: number; seed: number }) {
  const bowl = at(x, y, [[-40, -112], [40, -112], [32, -90], [-32, -90]]);
  const tube = at(x, y, [[-38, -124], [4, -119], [4, -113], [-38, -112]]);
  return (
    <g>
      <InkLine pts={at(x, y, [[-8, -90], [-10, 0]])} seed={seed} />
      <InkLine pts={at(x, y, [[8, -90], [10, 0]])} seed={seed + 1} />
      <Paper pts={bowl} seed={seed + 2} />
      <InkLine pts={bowl} seed={seed + 3} closed />
      <InkLine pts={at(x, y, [[22, -112], [22, -128], [12, -128]])} seed={seed + 4} width={1.4} />
      {/* the mirror */}
      <Wash pts={rp(blobPts(x, y - 176, 30, 36, seed + 5, 14, 0.05))} seed={seed + 5} fill={SK.sky} opacity={0.65} />
      <InkLine pts={rp(blobPts(x, y - 176, 30, 36, seed + 6, 14, 0.05))} seed={seed + 6} closed width={1.2} />
      {/* toothpaste */}
      <Wash pts={tube} seed={seed + 7} fill={SK.blush} opacity={0.95} dx={0.4} dy={0.3} />
      <InkLine pts={sharp(tube, true, 1)} seed={seed + 8} closed width={1} />
      <InkLine pts={at(x, y, [[4, -120], [11, -120], [11, -112], [4, -112]])} seed={seed + 9} closed width={0.9} />
    </g>
  );
}

/** A bed seen from the side, standing on (x, y): frame, mattress and pillow. */
function Bed({ x, y, seed }: { x: number; y: number; seed: number }) {
  const mattress = at(x, y, [[-62, -58], [66, -58], [66, -38], [-62, -38]]);
  const pillow = at(x, y, [[-56, -70], [-26, -70], [-24, -58], [-58, -58]]);
  return (
    <g>
      <Wash pts={at(x, y, [[-72, -96], [-62, -96], [-62, 0], [-72, 0]])} seed={seed} fill={SK.leather} opacity={0.6} />
      <InkLine pts={at(x, y, [[-72, 0], [-72, -96], [-62, -96], [-62, 0]])} seed={seed + 1} />
      <Wash pts={at(x, y, [[-62, -38], [74, -38], [74, -26], [-62, -26]])} seed={seed + 2} fill={SK.leather} opacity={0.55} />
      <InkLine pts={at(x, y, [[-62, -38], [74, -38], [74, -26], [-62, -26]])} seed={seed + 3} closed />
      <InkLine pts={at(x, y, [[68, -26], [68, 0]])} seed={seed + 4} />
      <Paper pts={mattress} seed={seed + 5} />
      <Wash pts={mattress} seed={seed + 6} fill={SK.sky} opacity={0.5} />
      <InkLine pts={sharp(mattress, true, 3)} seed={seed + 7} closed />
      {[-30, 2, 34].map((qx, i) => (
        <InkLine key={qx} pts={at(x, y, [[qx, -55], [qx, -41]])} seed={seed + 8 + i} width={0.7} />
      ))}
      <Paper pts={pillow} seed={seed + 12} />
      <InkLine pts={sharp(pillow, true, 3)} seed={seed + 13} closed width={1.1} />
    </g>
  );
}

/* ==========================================================================
   Reference Groups: Membership, Aspirational, and Dissociative
   ========================================================================== */

/** A team jersey's number on a Person's chest (feet at x, y; height h). */
function JerseyNo({ x, y, h, n, flip = false }: { x: number; y: number; h: number; n: string; flip?: boolean }) {
  const s = h / 200;
  return (
    <SketchText x={r2(x + (flip ? -1 : 1) * 10 * s)} y={r2(y - 136 * s)} anchor="middle" size={r2(Math.max(8, 12 * s))}>
      {n}
    </SketchText>
  );
}

/**
 * A baseball cap on a Person's head: (x, y) are the Person's feet, `h` its
 * height; the brim points the way the Person faces.
 */
function Cap({ x, y, h, flip = false, seed, fill = SK.charcoal, pencil = false }: { x: number; y: number; h: number; flip?: boolean; seed: number; fill?: string; pencil?: boolean }) {
  const s = h / 200;
  const f = flip ? -1 : 1;
  const P = (pts: Pt[]) => rp(pts.map(([px, py]) => [x + f * px * s, y + py * s] as Pt));
  const dome = P([[-10, -190], [-9, -197], [-4, -201.5], [3, -201.5], [8.5, -197], [10, -190]]);
  const brim = P([[9, -191.5], [19, -190], [19, -188], [9, -189]]);
  if (pencil)
    return (
      <g>
        <PencilLine pts={dome} seed={seed} closed />
        <PencilLine pts={brim} seed={seed + 1} closed />
      </g>
    );
  return (
    <g>
      <Wash pts={dome} seed={seed} fill={fill} opacity={0.8} dx={0.5} dy={0.3} />
      <InkLine pts={dome} seed={seed + 1} closed width={1} />
      <Wash pts={brim} seed={seed + 2} fill={fill} opacity={0.8} dx={0.3} dy={0.2} />
      <InkLine pts={brim} seed={seed + 3} closed width={0.9} />
    </g>
  );
}

/**
 * A membership group: a team photo of four players in the same striped
 * jerseys, the shopper among them, a ball at their feet.
 */
export function TeamPhoto() {
  const g = 236;
  const team: [number, number, Look, number, boolean][] = [
    [72, 168, { ...FRIEND, wear: SK.sky }, 1000, false],
    [154, 176, { ...SHOPPER, wear: SK.sky }, 1040, false],
    [246, 172, { ...FRIEND2, wear: SK.sky }, 1080, true],
    [328, 166, { ...ELDER, hairTone: SK.brown, hair: "short", wear: SK.sky }, 1120, true],
  ];
  return (
    <SketchFrame
      id="sk-team-photo"
      width={400}
      height={260}
      label="A team photo: four players, the shopper among them, in the same blue jerseys numbered 4, 7, 9 and 11, a ball at their feet."
    >
      <Backwash cx={200} cy={146} rx={192} ry={108} seed={990} />
      <Ground x0={24} x1={376} y={g} seed={991} />
      {team.map(([x, h, look, seed, flip], i) => (
        <g key={seed}>
          <Person x={x} y={g} h={h} look={look} arms={i < 2 ? ["hip", "down"] : ["down", "hip"]} flip={flip} seed={seed} />
          <JerseyNo x={x} y={g} h={h} n={["4", "7", "9", "11"][i]} flip={flip} />
        </g>
      ))}
      {/* the ball */}
      <Paper pts={rp(blobPts(200, g - 13, 13, 13, 1160, 12, 0.04))} seed={1160} />
      <InkLine pts={rp(blobPts(200, g - 13, 13, 13, 1161, 12, 0.04))} seed={1161} closed width={1.2} />
      <InkLine pts={rp([[191, g - 22], [200, g - 15], [209, g - 22]])} seed={1162} width={0.9} />
      <InkLine pts={rp([[200, g - 15], [200, g - 1]])} seed={1163} width={0.9} />
    </SketchFrame>
  );
}

/** A podium block standing on g, top at `top`, from x0 to x1. */
function Block({ x0, x1, top, g, seed }: { x0: number; x1: number; top: number; g: number; seed: number }) {
  const pts = rp([[x0, top], [x1, top], [x1, g], [x0, g]]);
  return (
    <g>
      <Paper pts={pts} seed={seed} />
      <Wash pts={pts} seed={seed + 1} fill={SK.stone} opacity={0.6} />
      <InkLine pts={pts} seed={seed + 2} closed />
    </g>
  );
}

/** A medal hanging on a Person's chest: ochre disc on a short ribbon. */
function Medal({ x, y, h, seed }: { x: number; y: number; h: number; seed: number }) {
  const s = h / 200;
  const c: Pt = [r2(x), r2(y - 143 * s)];
  return (
    <g>
      <InkLine pts={rp([[x - 4 * s, y - 168 * s], [c[0], c[1] - 5 * s], [x + 4 * s, y - 168 * s]])} seed={seed} width={0.9} />
      <Wash pts={rp(blobPts(c[0], c[1], 5 * s, 5 * s, seed + 1, 8, 0.05))} seed={seed + 1} fill={SK.ochre} opacity={0.95} dx={0.3} dy={0.3} />
      <InkLine pts={rp(blobPts(c[0], c[1], 5 * s, 5 * s, seed + 2, 8, 0.05))} seed={seed + 2} closed width={0.9} />
    </g>
  );
}

/**
 * An aspirational group: elite athletes with medals on a podium, set on a
 * sky wash (the hope); the shopper stands below on a blush wash (the here
 * and now) and looks up at them.
 */
export function LookingUp() {
  const g = 236;
  return (
    <SketchFrame
      id="sk-looking-up"
      width={400}
      height={260}
      label="Three elite athletes with medals stand on a podium against a pale sky wash. Below, on the ground, the shopper stands with hands on hips and looks up at them."
    >
      <Backwash cx={236} cy={110} rx={156} ry={100} seed={1200} fill={SK.sky} opacity={0.55} />
      <Backwash cx={74} cy={170} rx={64} ry={80} seed={1201} fill={SK.blush} opacity={0.5} />
      <Ground x0={20} x1={380} y={g} seed={1202} />
      <Block x0={164} x1={228} top={180} g={g} seed={1210} />
      <Block x0={228} x1={292} top={156} g={g} seed={1215} />
      <Block x0={292} x1={356} top={192} g={g} seed={1220} />
      <Person x={196} y={180} h={122} look={{ ...FRIEND2, wear: SK.charcoal }} arms={["down", "up"]} seed={1230} />
      <Medal x={196} y={180} h={122} seed={1260} />
      <Person x={260} y={156} h={124} look={{ ...FRIEND, wear: SK.charcoal }} arms={["up", "up"]} seed={1270} />
      <Medal x={260} y={156} h={124} seed={1300} />
      <Person x={324} y={192} h={120} look={{ ...ELDER, hairTone: SK.brown, hair: "curly", wear: SK.charcoal }} arms={["up", "down"]} flip seed={1310} />
      <Medal x={324} y={192} h={120} seed={1340} />
      <Person x={78} y={g} h={170} look={SHOPPER} arms={["hip", "hip"]} seed={1350} />
    </SketchFrame>
  );
}

/**
 * A dissociative group: three people in the same loud ochre caps; the shopper
 * turns away from them, the same cap left on the hat stand, in pencil and
 * crossed out.
 */
export function TurnAway() {
  const g = 236;
  const crew: [number, Look, number][] = [
    [64, FRIEND2, 1400],
    [118, { ...FRIEND, hair: "short" }, 1440],
    [172, { ...ELDER, hair: "short", hairTone: SK.brown }, 1480],
  ];
  return (
    <SketchFrame
      id="sk-turn-away"
      width={400}
      height={260}
      label="Three people in the same ochre caps stand together. The shopper has turned away from them, leaving the same cap on a hat stand, drawn in pencil and crossed out."
    >
      <Backwash cx={200} cy={146} rx={192} ry={108} seed={1390} />
      <Ground x0={24} x1={376} y={g} seed={1391} />
      {crew.map(([x, look, seed]) => (
        <g key={seed}>
          <Person x={x} y={g} h={170} look={look} arms={["hip", "down"]} seed={seed} />
          <Cap x={x} y={g} h={170} seed={seed + 30} fill={SK.ochre} />
        </g>
      ))}
      <Person x={268} y={g} h={176} look={SHOPPER} arms={["down", "hip"]} seed={1520} />
      {/* the hat stand with the cap not bought */}
      <InkLine pts={rp([[340, 118], [342, g]])} seed={1560} width={1.4} />
      <InkLine pts={rp([[322, g], [360, g - 1]])} seed={1561} width={1.4} />
      <Cap x={336} y={526} h={430} seed={1570} pencil />
      <InkLine pts={rp([[324, 98], [356, 118]])} seed={1580} width={1.2} />
      <InkLine pts={rp([[356, 98], [324, 118]])} seed={1581} width={1.2} />
    </SketchFrame>
  );
}

/* ==========================================================================
   Three Types of Reference Group Influence
   ========================================================================== */

/** A small table: top at y from x0 to x1, legs down to g. */
function Table({ x0, x1, y, g, seed }: { x0: number; x1: number; y: number; g: number; seed: number }) {
  const top = rp([[x0, y], [x1, y], [x1, y + 7], [x0, y + 7]]);
  return (
    <g>
      <InkLine pts={rp([[x0 + 8, y + 7], [x0 + 6, g]])} seed={seed} width={1.2} />
      <InkLine pts={rp([[x1 - 8, y + 7], [x1 - 6, g]])} seed={seed + 1} width={1.2} />
      <Wash pts={top} seed={seed + 2} fill={SK.leather} opacity={0.6} />
      <InkLine pts={top} seed={seed + 3} closed width={1.1} />
    </g>
  );
}

/**
 * Informational influence: a friend who works in IT points at a laptop on a
 * table and recommends it; the shopper listens, hand to chin. The friend's
 * bubble holds the laptop and a teal tick.
 */
export function AskTheExpertFriend() {
  const g = 236;
  return (
    <SketchFrame
      id="sk-ask-expert-friend"
      width={400}
      height={260}
      label="A friend who works in IT points at a laptop on a table and recommends it: the friend's speech bubble shows the laptop with a teal tick. The shopper listens, hand to chin."
    >
      <Backwash cx={200} cy={146} rx={192} ry={108} seed={1600} />
      <Ground x0={24} x1={376} y={g} seed={1601} />
      <Table x0={150} x1={250} y={156} g={g} seed={1610} />
      <Laptop2 x={200} y={156} s={0.9} seed={1620} />
      <Person x={104} y={g} h={176} look={FRIEND2} arms={["hip", "reach"]} seed={1640} />
      <Person x={300} y={g} h={176} look={SHOPPER} arms={["down", "chin"]} flip seed={1680} />
      <SpeechBubble x={150} y={42} w={92} h={56} tx={112} ty={66} seed={1720} />
      <Laptop2 x={144} y={60} s={0.5} seed={1730} />
      <Tick2 x={176} y={44} s={0.85} seed={1740} />
    </SketchFrame>
  );
}

/**
 * Utilitarian influence: at the office, two coworkers in dark blazers nod a
 * teal tick at the shopper, who has come in a matching blazer; the hoodie
 * the shopper did not wear hangs on the coat stand in pencil.
 */
export function DressForTheOffice() {
  const g = 236;
  const blazer = { outfit: "jacket" as const, wear: SK.charcoal, legs: SK.charcoal };
  return (
    <SketchFrame
      id="sk-dress-office"
      width={400}
      height={260}
      label="At the office, the shopper arrives in a dark blazer that matches two coworkers' blazers; a coworker's speech bubble holds a teal tick of approval. A hoodie the shopper did not wear hangs on the coat stand, drawn in pencil."
    >
      <Backwash cx={200} cy={146} rx={192} ry={108} seed={1800} />
      <Ground x0={24} x1={376} y={g} seed={1801} />
      {/* the coat stand and the hoodie not worn */}
      <InkLine pts={rp([[52, 64], [54, g]])} seed={1810} width={1.4} />
      <InkLine pts={rp([[36, g], [70, g - 1]])} seed={1811} width={1.3} />
      <InkLine pts={rp([[44, 84], [52, 78], [62, 84]])} seed={1812} width={1.1} />
      <PencilLine pts={rp([[48, 88], [36, 94], [30, 150], [72, 150], [68, 94], [58, 88], [53, 100]])} seed={1813} closed />
      <PencilLine pts={rp([[44, 92], [53, 104], [62, 92]])} seed={1814} />
      <PencilLine pts={rp([[40, 92], [38, 76], [46, 66], [60, 66], [68, 76], [66, 92]])} seed={1815} />
      <PencilLine pts={rp([[44, 130], [62, 130]])} seed={1816} />
      <Person x={150} y={g} h={178} look={{ ...SHOPPER, ...blazer }} arms={["hip", "down"]} seed={1830} />
      <Person x={262} y={g} h={174} look={{ ...FRIEND, ...blazer }} arms={["down", "hip"]} flip seed={1870} />
      <Person x={334} y={g} h={170} look={{ ...ELDER, ...blazer, hairTone: SK.charcoal }} arms={["down", "down"]} flip seed={1910} />
      <SpeechBubble x={300} y={38} w={50} h={36} tx={272} ty={58} seed={1950} />
      <Tick2 x={299} y={38} seed={1960} />
    </SketchFrame>
  );
}

/**
 * Value-expressive influence: a store poster shows an athlete wearing the
 * brand badge; below it, an open shoebox with the same badge and a teal
 * sneaker, the one the shopper buys.
 */
export function AthletesBrand() {
  const poster = sharp(rp([[56, 22], [196, 22], [196, 234], [56, 234]]), true, 2);
  const lid = sharp(rp([[244, 172], [330, 92], [372, 112], [302, 172]]), true, 1.5);
  const box = sharp(rp([[220, 172], [370, 172], [366, 232], [224, 232]]), true, 2);
  return (
    <SketchFrame
      id="sk-athletes-brand"
      width={400}
      height={260}
      label="A store poster shows an athlete running in a jersey with the brand badge. Below and beside it, an open shoebox carries the same badge with a teal sneaker set on top, the one the shopper buys. The box lid leans behind it."
    >
      <Backwash cx={200} cy={136} rx={192} ry={112} seed={2000} />
      <Paper pts={poster} seed={2010} />
      <Wash pts={rp([[66, 32], [186, 32], [186, 224], [66, 224]])} seed={2011} fill={SK.sky} opacity={0.4} />
      <InkLine pts={poster} seed={2012} closed width={1.2} />
      <Person x={124} y={214} h={176} look={{ ...FRIEND2, wear: SK.charcoal }} arms={["up", "point"]} seed={2020} />
      <BrandBadge x={r2(124 + 7 * 0.88)} y={r2(214 - 146 * 0.88)} r={7} seed={2060} />
      {/* the shoebox with the same badge */}
      <Wash pts={lid} seed={2072} fill={SK.tan} opacity={0.55} />
      <InkLine pts={lid} seed={2073} closed width={1.1} />
      <Paper pts={box} seed={2074} />
      <Wash pts={box} seed={2070} fill={SK.camel} opacity={0.75} />
      <InkLine pts={box} seed={2071} closed />
      <Shoe x={300} y={166} s={1.25} seed={2080} fill={SK.teal} />
      <BrandBadge x={296} y={206} r={12} seed={2090} />
    </SketchFrame>
  );
}

/* ==========================================================================
   Conformity: Following the Group
   ========================================================================== */

type Room = "alone" | "aloud" | "written";

/**
 * Asch (1956), share of critical answers that went with the wrong majority:
 * control, judging alone (N = 37): 0.7%; Experiment 1, answering aloud after
 * the group (N = 123): 36.8%; Experiment 4, writing the answer while the
 * group answered aloud (N = 14): 12.5%.
 */
const ASCH: Record<Room, { pct: number; of100: number; text: string }> = {
  alone: { pct: 0.7, of100: 1, text: "ABOUT 1 IN 100 ANSWERS WAS WRONG" },
  aloud: { pct: 36.8, of100: 37, text: "37 IN 100 ANSWERS WENT WITH THE GROUP" },
  written: { pct: 12.5, of100: 13, text: "13 IN 100 ANSWERS WENT WITH THE GROUP" },
};

/** Comparison lines on the right-hand card: x, length; line 2 matches the standard. */
const ASCH_LINES: [number, number][] = [
  [152, 116],
  [202, 100],
  [252, 74],
];
const ASCH_BASE = 196;

/**
 * Asch's line test as an instrument. On the left, the two cards: a standard
 * line and three comparison lines, of which line 2 matches. On the right, the
 * room: six others answer "1" before the student's turn. The student taps a
 * line to answer, and switches the room: alone, the group answering aloud, or
 * the student writing the answer down. The tally below gives Asch's result
 * for that room.
 */
export function AschRoom() {
  const [room, setRoom] = React.useState<Room>("aloud");
  const [pick, setPick] = React.useState<number | null>(null);
  const g = 262;
  const seats = [372, 432, 492, 552, 612, 672, 732];
  const you = 5; // next to last, as in Asch's room
  const looks: Look[] = [FRIEND, FRIEND2, ELDER, { ...FRIEND, hair: "bob", wear: SK.stone }, { ...FRIEND2, hair: "curly", wear: SK.earth }, SHOPPER, { ...ELDER, hair: "short", hairTone: SK.brown, wear: SK.sky }];
  const r = ASCH[room];
  const youX = seats[you];
  const hand = handAt(youX, g, 150, "hug", 1);
  const choose = (i: number) => setPick(i);
  const label =
    `Asch's line test. Left: a card with one standard line, and a card with three comparison lines numbered 1 to 3; line 2 matches the standard. ` +
    (room === "alone"
      ? "Right: the student judges alone. "
      : `Right: six other people in a row answer "1" aloud before the student's turn. ` + (room === "written" ? "The student writes the answer on a slip of paper. " : "The student answers aloud. ")) +
    (pick === null ? "The student has not answered yet. " : `The student chose line ${pick + 1}. `) +
    `In Asch's study (1956), ${r.text.toLowerCase()} (${r.pct}%).`;

  return (
    <>
      <SketchFrame id="sk-asch-room" width={800} height={360} label={label}>
        <Backwash cx={400} cy={170} rx={394} ry={160} seed={2200} />
        {/* the two cards */}
        {[
          [[34, 72], [104, 72], [104, 220], [34, 220]],
          [[120, 72], [284, 72], [284, 220], [120, 220]],
        ].map((c, i) => (
          <g key={i}>
            <Paper pts={sharp(c as Pt[], true, 2)} seed={2210 + i * 3} />
            <InkLine pts={sharp(c as Pt[], true, 2)} seed={2211 + i * 3} width={1.2} closed />
          </g>
        ))}
        <InkLine pts={rp([[69, ASCH_BASE - 100], [69, ASCH_BASE]])} seed={2220} width={3} amp={0.25} />
        {ASCH_LINES.map(([x, len], i) => {
          const on = pick === i;
          return (
            <g
              key={i}
              role="button"
              tabIndex={0}
              aria-label={`Answer line ${i + 1}`}
              aria-pressed={on}
              onClick={() => choose(i)}
              onKeyDown={(ev) => {
                if (ev.key === "Enter" || ev.key === " ") {
                  ev.preventDefault();
                  choose(i);
                }
              }}
              style={{ cursor: "pointer", outline: "none" }}
            >
              <rect x={x - 22} y={80} width={44} height={138} fill="transparent" />
              {on ? <Wash pts={rp([[x - 13, ASCH_BASE - len - 6], [x + 13, ASCH_BASE - len - 6], [x + 13, ASCH_BASE + 22], [x - 13, ASCH_BASE + 22]])} seed={2230 + i} fill={SK.teal} opacity={0.45} dx={0} dy={0} /> : null}
              <InkLine pts={rp([[x, ASCH_BASE - len], [x, ASCH_BASE]])} seed={2240 + i} width={3} amp={0.25} />
              <SketchText x={x} y={ASCH_BASE + 17} anchor="middle" size={13}>
                {String(i + 1)}
              </SketchText>
            </g>
          );
        })}
        <SketchText x={159} y={52} anchor="middle" size={11}>
          TAP THE LINE THAT MATCHES
        </SketchText>

        {/* the room */}
        <Ground x0={340} x1={770} y={g} seed={2250} />
        {seats.map((x, i) =>
          i === you ? null : room === "alone" ? null : (
            <g key={x}>
              <Person x={x} y={g} h={140} look={looks[i]} arms={["down", "hip"]} flip={i > you} seed={2260 + i * 40} />
              <SpeechBubble x={x} y={i % 2 ? 66 : 82} w={34} h={30} tx={x + (i > you ? -4 : 4)} ty={i % 2 ? 98 : 112} seed={2560 + i * 5} />
              <SketchText x={x} y={(i % 2 ? 66 : 82) + 5} anchor="middle" size={14}>
                1
              </SketchText>
            </g>
          ),
        )}
        <Person x={youX} y={g} h={150} look={SHOPPER} arms={["hip", room === "written" ? "hug" : "down"]} seed={2600} />
        {room === "written" ? (
          <g>
            <Paper pts={sharp(rp([[hand[0] - 15, hand[1] - 20], [hand[0] + 13, hand[1] - 22], [hand[0] + 15, hand[1] + 6], [hand[0] - 13, hand[1] + 8]]), true, 1.5)} seed={2640} />
            <InkLine pts={sharp(rp([[hand[0] - 15, hand[1] - 20], [hand[0] + 13, hand[1] - 22], [hand[0] + 15, hand[1] + 6], [hand[0] - 13, hand[1] + 8]]), true, 1.5)} seed={2641} width={1} closed />
            <SketchText x={r2(hand[0])} y={r2(hand[1] - 2)} anchor="middle" size={13}>
              {pick === null ? "" : String(pick + 1)}
            </SketchText>
          </g>
        ) : (
          <g>
            <SpeechBubble x={youX} y={44} w={40} h={34} tx={youX + 4} ty={84} seed={2650} />
            <SketchText x={youX} y={50} anchor="middle" size={15}>
              {pick === null ? "?" : String(pick + 1)}
            </SketchText>
          </g>
        )}

        {/* Asch's result for this room */}
        <SketchText x={34} y={306} size={12}>
          {r.text}
        </SketchText>
        {Array.from({ length: 100 }, (_, i) => {
          const x = r2(36 + i * 7.3);
          const on = i < r.of100;
          return on ? (
            <InkLine key={i} pts={[[x, 320], [x, 342]]} seed={2700 + i} width={2.4} amp={0.3} color={SK.ochre} />
          ) : (
            <InkLine key={i} pts={[[x, 324], [x, 338]]} seed={2700 + i} width={0.8} amp={0.3} />
          );
        })}
      </SketchFrame>
      <PlateToggle<Room>
        options={[
          { id: "alone", label: "Alone" },
          { id: "aloud", label: "The group answers first" },
          { id: "written", label: "You write it down" },
        ]}
        value={room}
        onChange={setRoom}
      />
    </>
  );
}

/**
 * Asch (1956), Experiment 6: when the majority's line differed from the
 * standard by 3/4, 1/2 or 1/4 inch, 25.7%, 33.3% and 56.7% of answers went
 * with the majority.
 */
const UNSURE: [string, number, number][] = [
  ["3/4 INCH", 18, 25.7],
  ["1/2 INCH", 12, 33.3],
  ["1/4 INCH", 6, 56.7],
];

/**
 * Uncertainty and conformity: three pairs of lines, the standard beside the
 * majority's wrong line, closer in length from left to right; under each, an
 * ochre bar for the share of answers that went with the group (Asch, 1956).
 */
export function HarderToTell() {
  return (
    <SketchFrame
      id="sk-harder-to-tell"
      width={400}
      height={300}
      label="Three cards, each with a standard line beside the group's wrong line. The difference shrinks from 3/4 inch to 1/2 inch to 1/4 inch. Under each, a bar shows the answers that went with the group: 26, 33 and 57 in 100 (Asch, 1956)."
    >
      <Backwash cx={200} cy={146} rx={194} ry={138} seed={2800} />
      {UNSURE.map(([lab, d, pct], i) => {
        const cx = 76 + i * 124;
        const card = sharp(rp([[cx - 46, 18], [cx + 46, 18], [cx + 46, 108], [cx - 46, 108]]), true, 2);
        const barTop = r2(272 - pct * 1.9);
        return (
          <g key={lab}>
            <Paper pts={card} seed={2810 + i * 10} />
            <InkLine pts={card} seed={2811 + i * 10} closed width={1.1} />
            <InkLine pts={rp([[cx - 16, 96 - 56], [cx - 16, 96]])} seed={2812 + i * 10} width={2.6} amp={0.2} />
            <InkLine pts={rp([[cx + 16, 96 - 56 - d * 1.2], [cx + 16, 96]])} seed={2813 + i * 10} width={2.6} amp={0.2} />
            <SketchText x={cx} y={128} anchor="middle" size={10}>
              {`${lab} APART`}
            </SketchText>
            <Wash pts={rp([[cx - 18, barTop], [cx + 18, barTop], [cx + 18, 272], [cx - 18, 272]])} seed={2814 + i * 10} fill={SK.ochre} opacity={0.85} dx={0.6} dy={0.4} />
            <InkLine pts={rp([[cx - 18, 272], [cx - 18, barTop], [cx + 18, barTop], [cx + 18, 272]])} seed={2815 + i * 10} width={1.1} />
            <SketchText x={cx} y={r2(barTop - 7)} anchor="middle" size={12}>
              {`${Math.round(pct)} IN 100`}
            </SketchText>
          </g>
        );
      })}
      <InkLine pts={rp([[18, 272], [382, 272]])} seed={2850} width={1.1} />
      <SketchText x={200} y={292} anchor="middle" size={10.5}>
        ANSWERS THAT WENT WITH THE GROUP
      </SketchText>
    </SketchFrame>
  );
}

/**
 * A store shelf of three products. The middle one carries a BESTSELLER tag,
 * and most of its stock is gone: pencil outlines mark the boxes other
 * shoppers took.
 */
export function BestsellerShelf() {
  const plank = 176;
  const stacks: [number, string, number][] = [
    [86, SK.sky, 4],
    [200, SK.camel, 1],
    [314, SK.earth, 4],
  ];
  return (
    <SketchFrame
      id="sk-bestseller-shelf"
      width={400}
      height={250}
      label="A store shelf of three products. The middle product has a BESTSELLER tag and only one box left; pencil outlines show the boxes other shoppers took. The products on either side are fully stocked."
    >
      <Backwash cx={200} cy={130} rx={194} ry={116} seed={2900} />
      {stacks.map(([x, fill, left], i) =>
        [0, 1, 2, 3].map((k) => {
          const bx = x + (k % 2 ? 22 : -22);
          const bottom = plank - (k > 1 ? 52 : 0);
          return k < left ? (
            <Box key={`${i}-${k}`} x={bx} bottom={bottom} w={42} h={50} mark="none" fill={fill} seed={2910 + i * 40 + k * 8} />
          ) : (
            <Box key={`${i}-${k}`} x={bx} bottom={bottom} w={42} h={50} mark="none" fill={fill} seed={2910 + i * 40 + k * 8} pencil />
          );
        }),
      )}
      <Wash pts={rp([[24, plank], [376, plank], [376, plank + 10], [24, plank + 10]])} seed={3040} fill={SK.leather} opacity={0.6} />
      <InkLine pts={rp([[24, plank], [376, plank], [376, plank + 10], [24, plank + 10]])} seed={3041} closed />
      <InkLine pts={rp([[200, plank + 10], [200, plank + 22]])} seed={3042} width={0.9} />
      <Tag2 x={200} y={plank + 36} text="BESTSELLER" seed={3050} />
    </SketchFrame>
  );
}

/* ==========================================================================
   Five Bases of Social Power
   ========================================================================== */

/**
 * Referent power: a fan copies the pose and the jersey of a favourite athlete
 * on a poster, a heart beside the fan.
 */
export function CopyTheAthlete() {
  const g = 252;
  const poster = sharp(rp([[150, 18], [282, 18], [282, 200], [150, 200]]), true, 2);
  return (
    <SketchFrame
      id="sk-copy-athlete"
      width={300}
      height={270}
      label="A fan stands in front of a poster of a favourite athlete with a medal, wearing the same jersey and copying the athlete's raised-arm pose; a heart beside the fan."
    >
      <Backwash cx={150} cy={140} rx={144} ry={124} seed={3100} />
      <Paper pts={poster} seed={3110} />
      <Wash pts={rp([[158, 26], [274, 26], [274, 192], [158, 192]])} seed={3111} fill={SK.sky} opacity={0.4} />
      <InkLine pts={poster} seed={3112} closed width={1.2} />
      <Person x={216} y={188} h={150} look={{ ...FRIEND2, wear: SK.camel, hair: "short" }} arms={["hip", "up"]} seed={3120} />
      <Medal x={216} y={188} h={150} seed={3140} />
      <Ground x0={18} x1={282} y={g} seed={3150} />
      <Person x={88} y={g} h={176} look={{ ...SHOPPER, wear: SK.camel }} arms={["hip", "up"]} seed={3160} />
      <Heart x={44} y={90} s={1.1} seed={3200} />
    </SketchFrame>
  );
}

/**
 * Legitimate power: a police officer in uniform, peaked cap and badge holds
 * up a palm, and a car stops in front of the officer.
 */
export function OfficerStop() {
  const g = 252;
  const h = 196;
  const k = h / 200;
  const uniform: Look = { hair: "short", hairTone: SK.brown, wear: SK.charcoal, legs: SK.charcoal, outfit: "jacket", skin: SK.camel, skinOpacity: 0.6 };
  const P = (pts: Pt[]) => rp(pts.map(([px, py]) => [230 - px * k, g + py * k] as Pt));
  const crown = P([[-11, -191], [-14, -202], [-6, -205], [8, -204], [13, -199], [10, -191]]);
  const badge = rp(Array.from({ length: 10 }, (_, i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 === 0 ? 7 : 3.2;
    return [r2(230 - 8 * k + Math.cos(a) * rr), r2(g - 146 * k + Math.sin(a) * rr)] as Pt;
  }));
  return (
    <SketchFrame
      id="sk-officer-stop"
      width={300}
      height={270}
      label="A police officer in a dark uniform, peaked cap and star badge holds up a palm, and a car has stopped in front of the officer."
    >
      <Backwash cx={150} cy={140} rx={144} ry={124} seed={3300} />
      <Ground x0={14} x1={286} y={g} seed={3301} />
      <Car x={98} y={g} s={0.86} seed={3370} />
      <Person x={230} y={g} h={h} look={uniform} arms={["hip", "wave"]} flip seed={3310} />
      <Wash pts={crown} seed={3350} fill={SK.charcoal} opacity={0.85} dx={0.4} dy={0.3} />
      <InkLine pts={crown} seed={3351} closed width={1} />
      <InkLine pts={P([[8, -191.5], [19, -189]])} seed={3352} width={1.6} amp={0.2} />
      <Wash pts={badge} seed={3353} fill={SK.ochre} opacity={0.95} dx={0.3} dy={0.2} />
      <InkLine pts={sharp(badge, true, 0.8)} seed={3354} closed width={0.8} amp={0.2} />
    </SketchFrame>
  );
}

/** A sunscreen tube lying on its side; (x, y) the middle, `s` its scale (about 80 long at 1). */
function Sunscreen({ x, y, s = 1, seed }: { x: number; y: number; s?: number; seed: number }) {
  const tube = sharp(at(x, y, [[-40, -12], [26, -10], [26, 10], [-40, 12], [-44, 0]], s), true, 2);
  const cap = sharp(at(x, y, [[26, -8], [40, -8], [40, 8], [26, 8]], s), true, 1.5);
  return (
    <g>
      <Paper pts={tube} seed={seed} />
      <Wash pts={tube} seed={seed + 1} fill={SK.ochre} opacity={0.45} />
      <InkLine pts={tube} seed={seed + 2} closed width={1.1} />
      <Wash pts={cap} seed={seed + 3} fill={SK.sky} opacity={0.8} />
      <InkLine pts={cap} seed={seed + 4} closed width={1} />
      <SketchText x={r2(x - 8 * s)} y={r2(y + 4 * s)} anchor="middle" size={r2(10 * s)}>
        SPF 50
      </SketchText>
    </g>
  );
}

/**
 * Expert power: a dermatologist in a white coat holds out a tube of
 * sunscreen to a patient.
 */
export function DermatologistAdvice() {
  const g = 252;
  const coat: Look = { hair: "bun", hairTone: SK.charcoal, wear: SK.paper, legs: SK.charcoal, skin: SK.brown, skinOpacity: 0.45 };
  const hand = handAt(98, g, 186, "reach", 1);
  return (
    <SketchFrame
      id="sk-dermatologist"
      width={300}
      height={270}
      label="A dermatologist in a white coat with a stethoscope holds out a tube of SPF 50 sunscreen to a patient, who reaches to take it."
    >
      <Backwash cx={150} cy={140} rx={144} ry={124} seed={3500} />
      <Ground x0={18} x1={282} y={g} seed={3501} />
      <Person x={98} y={g} h={186} look={coat} arms={["hip", "reach"]} seed={3510} />
      {/* stethoscope */}
      <InkLine pts={rp([[93, g - 158], [88, g - 142], [92, g - 128], [100, g - 122]])} seed={3540} width={1.5} color={SK.charcoal} />
      <InkLine pts={rp([[103, g - 158], [107, g - 146]])} seed={3541} width={1.5} color={SK.charcoal} />
      <Wash pts={rp(blobPts(101, g - 119, 4, 4, 3542, 8, 0.05))} seed={3542} fill={SK.charcoal} opacity={0.8} dx={0} dy={0} />
      <InkLine pts={rp(blobPts(101, g - 119, 4, 4, 3543, 8, 0.05))} seed={3543} closed width={1} />
      <Person x={226} y={g} h={174} look={SHOPPER} arms={["down", "reach"]} flip seed={3550} />
      <Sunscreen x={r2(hand[0] + 34)} y={r2(hand[1] - 2)} s={0.85} seed={3590} />
    </SketchFrame>
  );
}

/**
 * Reward power: things that can be given: a prize rosette, a discount
 * coupon and a note of praise.
 */
export function Rewards() {
  const ribbon = (dx: number) => sharp(rp([[84 + dx, 120], [96 + dx, 120], [102 + dx * 1.6, 196], [90 + dx * 1.3, 186], [80 + dx * 1.6, 196]]), true, 1);
  const coupon = sharp(rp([[156, 52], [280, 40], [288, 112], [164, 124]]), true, 2);
  const note = sharp(rp([[150, 150], [270, 156], [266, 226], [146, 220]]), true, 2);
  const rosette = rp(Array.from({ length: 24 }, (_, i) => {
    const a = (i / 24) * Math.PI * 2;
    const rr = i % 2 ? 44 : 50;
    return [90 + Math.cos(a) * rr, 92 + Math.sin(a) * rr] as Pt;
  }));
  return (
    <SketchFrame
      id="sk-rewards"
      width={300}
      height={270}
      label="Things a source of power can give: a prize rosette, a coupon for 20% off, and a handwritten note of praise with a heart."
    >
      <Backwash cx={150} cy={136} rx={144} ry={124} seed={3700} />
      {[ribbon(-12), ribbon(12)].map((p, i) => (
        <g key={i}>
          <Wash pts={p} seed={3712 + i} fill={SK.camel} opacity={0.75} />
          <InkLine pts={p} seed={3714 + i} closed width={1.1} />
        </g>
      ))}
      <Wash pts={rosette} seed={3730} fill={SK.ochre} opacity={0.85} />
      <InkLine pts={rosette} seed={3731} closed width={1.1} />
      <Paper pts={rp(blobPts(90, 92, 26, 26, 3732, 14, 0.04))} seed={3732} />
      <InkLine pts={rp(blobPts(90, 92, 26, 26, 3733, 14, 0.04))} seed={3733} closed width={1} />
      <SketchText x={90} y={100} anchor="middle" size={22} serif>
        1
      </SketchText>
      {/* the coupon */}
      <Paper pts={coupon} seed={3740} />
      <InkLine pts={coupon} seed={3741} closed width={1.1} />
      <PencilLine pts={rp([[184, 54], [192, 120]])} seed={3742} dash="3 4" />
      <SketchText x={238} y={92} anchor="middle" size={22} serif>
        −20%
      </SketchText>
      {/* the note of praise */}
      <Paper pts={note} seed={3750} />
      <InkLine pts={note} seed={3751} closed width={1.1} />
      {[0, 1, 2].map((i) => (
        <InkLine key={i} pts={rp(Array.from({ length: 7 }, (_, k) => [162 + k * (i === 2 ? 10 : 14), 176 + i * 15 + (k % 2 ? -1 : 1)] as Pt))} seed={3760 + i} width={0.8} amp={0.4} />
      ))}
      <Heart x={248} y={204} s={0.9} seed={3770} />
    </SketchFrame>
  );
}

/**
 * Coercive power: a parking fine tucked under a car's windscreen wiper.
 */
export function ParkingFine() {
  const glass = rp([[20, 40], [280, 24], [292, 150], [14, 168]]);
  const ticket = sharp(rp([[108, 92], [196, 82], [206, 196], [118, 206]]), true, 2);
  return (
    <SketchFrame
      id="sk-parking-fine"
      width={300}
      height={270}
      label="Close up on a car windscreen: a parking fine for $60 is tucked under the wiper."
    >
      <Backwash cx={150} cy={136} rx={144} ry={124} seed={3900} />
      <Wash pts={glass} seed={3901} fill={SK.sky} opacity={0.7} />
      <InkLine pts={glass} seed={3902} closed width={1.3} />
      {/* bonnet */}
      <Wash pts={rp([[14, 168], [292, 150], [296, 250], [8, 250]])} seed={3903} fill={SK.charcoal} opacity={0.5} />
      <InkLine pts={rp([[14, 168], [8, 250]])} seed={3904} />
      <InkLine pts={rp([[292, 150], [296, 250]])} seed={3905} />
      <Paper pts={ticket} seed={3910} />
      <InkLine pts={ticket} seed={3911} closed width={1.1} />
      <SketchText x={158} y={122} anchor="middle" size={12}>
        FINE
      </SketchText>
      <SketchText x={160} y={152} anchor="middle" size={22} serif>
        $60
      </SketchText>
      <InkLine pts={rp([[132, 170], [184, 166]])} seed={3920} width={0.8} />
      {/* the wiper over the ticket */}
      <Wash pts={rp([[30, 214], [260, 164], [262, 172], [32, 222]])} seed={3930} fill={SK.ink} opacity={0.8} dx={0} dy={0} />
      <InkLine pts={rp([[30, 214], [260, 164], [262, 172], [32, 222]])} seed={3931} closed width={1} />
    </SketchFrame>
  );
}

/* ==========================================================================
   Expert Power and AI Assistants
   ========================================================================== */

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

/** A small laptop thumbnail on a card, centred on (x, y); `lit` = the pick. */
function PickCard({ x, y, seed, lit = false }: { x: number; y: number; seed: number; lit?: boolean }) {
  const card = sharp(rp([[x - 22, y - 20], [x + 22, y - 20], [x + 22, y + 20], [x - 22, y + 20]]), true, 2);
  return (
    <g>
      <Paper pts={card} seed={seed} />
      {lit ? <Wash pts={card} seed={seed + 1} fill={SK.teal} opacity={0.5} /> : null}
      <InkLine pts={card} seed={seed + 2} closed width={lit ? 1.4 : 1} />
      <Laptop2 x={x} y={y + 12} s={0.36} seed={seed + 3} />
    </g>
  );
}

/**
 * Asking an AI assistant: on a phone, the consumer's bubble asks which laptop
 * to buy; the assistant's reply is long and detailed and offers three
 * laptops, the first lit teal and ticked as the one to buy.
 */
export function AskTheAssistant() {
  const body = sharp(rp([[120, 8], [280, 8], [280, 292], [120, 292]]), true, 12);
  const glass = rp([[130, 26], [270, 26], [270, 278], [130, 278]]);
  const ask = sharp(rp([[196, 40], [260, 40], [260, 84], [210, 84], [204, 92], [204, 84], [196, 84]]), true, 3);
  const reply = sharp(rp([[140, 104], [262, 104], [262, 266], [150, 266], [140, 274], [140, 266]]), true, 3);
  return (
    <SketchFrame
      id="sk-ask-assistant"
      width={400}
      height={300}
      label="A phone chat with an AI assistant. The consumer's bubble shows a laptop and a question mark. The assistant's long, detailed reply ends with a short list of laptops, the first lit teal and ticked as the one to buy."
    >
      <Backwash cx={200} cy={150} rx={190} ry={144} seed={4000} />
      <Wash pts={body} seed={4001} fill={SK.charcoal} opacity={0.65} />
      <InkLine pts={body} seed={4002} closed width={1.3} />
      <Paper pts={glass} seed={4003} />
      <InkLine pts={glass} seed={4004} closed width={0.9} />
      {/* the consumer's question */}
      <Wash pts={ask} seed={4010} fill={SK.blush} opacity={0.7} />
      <InkLine pts={ask} seed={4011} closed width={1} />
      <Laptop2 x={218} y={76} s={0.4} seed={4012} />
      <SketchText x={244} y={72} anchor="middle" size={18} serif>
        ?
      </SketchText>
      {/* the assistant's answer: fluent, detailed, and a short list */}
      <Wash pts={reply} seed={4020} fill={SK.sky} opacity={0.5} />
      <InkLine pts={reply} seed={4021} closed width={1} />
      <Sparkle x={154} y={120} r={8} seed={4022} />
      <Scribble x={170} y={118} w={82} n={2} seed={4030} last={0.9} />
      <Scribble x={152} y={144} w={100} n={5} seed={4040} last={0.55} />
      <PickCard x={168} y={232} seed={4060} lit />
      <PickCard x={216} y={232} seed={4070} />
      <Tick2 x={170} y={206} s={0.8} seed={4080} />
      <SketchText x={250} y={238} anchor="middle" size={14} serif>
        …
      </SketchText>
    </SketchFrame>
  );
}

/** One assistant answer card centred on x, top at y, quoting a battery life. */
function AnswerCard({ x, y, text, seed }: { x: number; y: number; text: string; seed: number }) {
  const card = sharp(rp([[x - 68, y], [x + 68, y], [x + 68, y + 92], [x - 68, y + 92]]), true, 3);
  return (
    <g>
      <Wash pts={card} seed={seed} fill={SK.sky} opacity={0.5} />
      <InkLine pts={card} seed={seed + 1} closed width={1.1} />
      <Sparkle x={x - 50} y={y + 18} r={8} seed={seed + 2} />
      <Scribble x={x - 34} y={y + 16} w={92} n={2} gap={10} last={0.85} seed={seed + 3} />
      <SketchText x={x} y={y + 64} anchor="middle" size={14}>
        {text}
      </SketchText>
      <Scribble x={x - 54} y={y + 80} w={108} n={1} last={0.7} seed={seed + 8} />
    </g>
  );
}

/**
 * The same confidence, right or wrong: two assistant answers, laid out alike,
 * quote the battery life of the same laptop. The box says 10 hours; the
 * answer that says 10 is ticked, the one that says 16 is crossed out.
 */
export function SameConfidence() {
  return (
    <SketchFrame
      id="sk-same-confidence"
      width={400}
      height={270}
      label="Two AI assistant answers, written in the same fluent style, give the battery life of one laptop. The laptop's box says 10 hours. The answer that says 10 hours is ticked; the one that says 16 hours, just as confident, is wrong and crossed."
    >
      <Backwash cx={200} cy={136} rx={194} ry={128} seed={4100} />
      <AnswerCard x={96} y={20} text="BATTERY 10 H" seed={4110} />
      <AnswerCard x={304} y={20} text="BATTERY 16 H" seed={4130} />
      {/* the laptop box with its printed spec */}
      <Paper pts={sharp(rp([[134, 156], [266, 156], [266, 250], [134, 250]]), true, 2)} seed={4150} />
      <Wash pts={rp([[134, 156], [266, 156], [266, 250], [134, 250]])} seed={4151} fill={SK.camel} opacity={0.5} />
      <InkLine pts={sharp(rp([[134, 156], [266, 156], [266, 250], [134, 250]]), true, 2)} seed={4152} closed />
      <Laptop2 x={200} y={214} s={0.7} seed={4153} />
      <SketchText x={200} y={238} anchor="middle" size={11}>
        BATTERY 10 H
      </SketchText>
      <Tick2 x={96} y={134} s={1.1} seed={4160} />
      <InkLine pts={rp([[294, 124], [314, 144]])} seed={4170} width={2} />
      <InkLine pts={rp([[314, 124], [294, 144]])} seed={4171} width={2} />
    </SketchFrame>
  );
}

/** A coin, centred on (x, y). */
function Coin({ x, y, r = 9, seed }: { x: number; y: number; r?: number; seed: number }) {
  return (
    <g>
      <Wash pts={rp(blobPts(x, y, r, r, seed, 10, 0.05))} seed={seed} fill={SK.ochre} opacity={0.9} dx={0.4} dy={0.3} />
      <InkLine pts={rp(blobPts(x, y, r, r, seed + 1, 10, 0.05))} seed={seed + 1} closed width={1} />
      <SketchText x={x} y={r2(y + r * 0.42)} anchor="middle" size={r2(r * 1.2)} serif>
        $
      </SketchText>
    </g>
  );
}

/**
 * Independence: left, a skin expert recommends a sunscreen while the other hand
 * takes coins; right, the AI
 * assistant stands in a platform's storefront and recommends a laptop, and
 * an arrow from the laptop ends at a coin with a question mark: does the
 * platform profit?
 */
export function WhoPaysTheExpert() {
  const g = 240;
  const coat: Look = { hair: "bun", hairTone: SK.charcoal, wear: SK.paper, legs: SK.charcoal, skin: SK.brown, skinOpacity: 0.45 };
  const hand = handAt(84, g, 170, "reach", 1);
  const back = handAt(84, g, 170, "low", -1);
  const awn = rp([[236, 64], [372, 64], [380, 88], [228, 88]]);
  return (
    <SketchFrame
      id="sk-who-pays"
      width={400}
      height={260}
      label="Left: a skin expert in a white coat holds out a sunscreen with one hand while the other hand, stretched out behind, takes coins. Right: the AI assistant stands in a storefront and recommends a laptop; an arrow from the laptop ends at a coin with a question mark."
    >
      <Backwash cx={200} cy={146} rx={194} ry={110} seed={4200} />
      <Ground x0={18} x1={382} y={g} seed={4201} />
      {/* the paid human expert */}
      <Person x={84} y={g} h={170} look={coat} arms={["low", "reach"]} seed={4210} />
      <Sunscreen x={r2(hand[0] + 30)} y={r2(hand[1] - 2)} s={0.72} seed={4250} />
      <Coin x={r2(back[0] - 4)} y={r2(back[1] + 6)} r={9} seed={4260} />
      <Coin x={r2(back[0] - 14)} y={r2(back[1] + 20)} r={7} seed={4265} />
      {/* divider */}
      <PencilLine pts={rp([[196, 30], [198, g - 6]])} seed={4280} dash="2 6" />
      {/* the platform's assistant */}
      <Wash pts={rp([[240, 88], [368, 88], [368, g], [240, g]])} seed={4290} fill={SK.earth} opacity={0.4} />
      <InkLine pts={rp([[240, 88], [240, g]])} seed={4291} />
      <InkLine pts={rp([[368, 88], [368, g]])} seed={4292} />
      <Wash pts={awn} seed={4293} fill={SK.camel} opacity={0.75} />
      <InkLine pts={awn} seed={4294} closed width={1.1} />
      {[264, 292, 320, 348].map((x, i) => (
        <InkLine key={x} pts={rp([[x, 64], [x - 2, 88]])} seed={4295 + i} width={0.8} />
      ))}
      <Agent x={268} y={g} s={1.05} seed={4300} />
      <SpeechBubble x={326} y={170} w={60} h={52} tx={290} ty={196} seed={4305} />
      <Laptop2 x={326} y={186} s={0.5} seed={4310} />
      <SketchArrow pts={curvePts([326, 140], [334, 122], [318, 112])} seed={4315} head={7} />
      <Coin x={308} y={106} r={9} seed={4320} />
      <SketchText x={340} y={112} anchor="middle" size={20} serif>
        ?
      </SketchText>
    </SketchFrame>
  );
}

/* ==========================================================================
   Word of Mouth and Opinion Leaders
   ========================================================================== */

/**
 * Word of mouth beside advertising: left, a friend tells the shopper about a
 * sneaker (speech bubble with the shoe and a heart); right, a billboard ad
 * for the same sneaker with a price tag: the seller has money in the sale.
 */
export function FriendOrAd() {
  const g = 240;
  const board = sharp(rp([[230, 30], [380, 30], [380, 140], [230, 140]]), true, 2);
  return (
    <SketchFrame
      id="sk-friend-or-ad"
      width={400}
      height={260}
      label="Left: a friend tells the shopper about a sneaker; the friend's speech bubble shows the sneaker and a heart. Right: a billboard advertises the same sneaker with a price tag."
    >
      <Backwash cx={200} cy={146} rx={194} ry={110} seed={4400} />
      <Ground x0={18} x1={382} y={g} seed={4401} />
      <Person x={52} y={g} h={168} look={FRIEND} arms={["hip", "reach"]} seed={4410} />
      <Person x={150} y={g} h={172} look={SHOPPER} arms={["down", "hip"]} flip seed={4450} />
      <SpeechBubble x={92} y={40} w={92} h={50} tx={64} ty={70} seed={4490} />
      <Shoe x={84} y={46} s={0.8} seed={4495} />
      <Heart x={118} y={34} s={0.6} seed={4499} />
      {/* the billboard */}
      <InkLine pts={rp([[270, 140], [268, g]])} seed={4500} width={1.4} />
      <InkLine pts={rp([[340, 140], [342, g]])} seed={4501} width={1.4} />
      <Paper pts={board} seed={4502} />
      <Wash pts={board} seed={4503} fill={SK.sky} opacity={0.35} />
      <InkLine pts={board} seed={4504} closed width={1.2} />
      <Shoe x={290} y={98} s={1.25} seed={4510} />
      <Tag1 x={330} y={60} w={40} seed={4520} size={13}>
        $90
      </Tag1>
    </SketchFrame>
  );
}

/**
 * Negative word of mouth weighs more: a balance in which one one-star review
 * on one pan outweighs three five-star reviews on the other.
 */
export function OneComplaint() {
  const tilt = 14;
  const lx = 104;
  const rx = 296;
  const ly = 64 + tilt;
  const ry = 64 - tilt;
  const drop = 120;
  return (
    <SketchFrame
      id="sk-one-complaint"
      width={400}
      height={260}
      label="A balance: on the lower pan, one review with one star; on the higher pan, three reviews with five stars each. The single complaint outweighs the praise."
    >
      <Backwash cx={200} cy={140} rx={194} ry={114} seed={4600} />
      {/* stand */}
      <InkLine pts={rp([[200, 64], [200, 238]])} seed={4610} width={1.6} />
      <Wash pts={rp([[160, 238], [240, 238], [240, 248], [160, 248]])} seed={4611} fill={SK.leather} opacity={0.6} />
      <InkLine pts={rp([[160, 238], [240, 238], [240, 248], [160, 248]])} seed={4612} closed />
      <InkLine pts={rp([[lx, ly], [rx, ry]])} seed={4613} width={1.8} />
      <InkLine pts={rp(blobPts(200, 64, 4, 4, 4614, 8, 0.05))} seed={4614} closed width={1.2} />
      {/* hangers and pans */}
      {[[lx, ly], [rx, ry]].map(([x, y], i) => (
        <g key={i}>
          <InkLine pts={rp([[x, y], [x, y + 10]])} seed={4620 + i * 5} width={1.1} />
          <InkLine pts={rp([[x - 50, y + 10], [x + 50, y + 10]])} seed={4621 + i * 5} width={1.1} />
          <InkLine pts={rp([[x - 50, y + 10], [x - 50, y + drop]])} seed={4622 + i * 5} width={0.8} />
          <InkLine pts={rp([[x + 50, y + 10], [x + 50, y + drop]])} seed={4623 + i * 5} width={0.8} />
          <Wash pts={rp([[x - 58, y + drop], [x + 58, y + drop], [x + 46, y + drop + 12], [x - 46, y + drop + 12]])} seed={4624 + i * 5} fill={SK.ochre} opacity={0.45} />
          <InkLine pts={rp([[x - 58, y + drop], [x + 58, y + drop], [x + 46, y + drop + 12], [x - 46, y + drop + 12]])} seed={4625 + i * 5} closed width={1.1} />
        </g>
      ))}
      <ReviewCard x={lx - 40} y={ly + drop - 44} w={80} stars={1} lines={2} r={5} seed={4640} />
      {[0, 1, 2].map((k) => (
        <ReviewCard key={k} x={rx - 40} y={ry + drop - 34 - k * 34} w={80} stars={5} lines={1} r={5} seed={4660 + k * 20} />
      ))}
    </SketchFrame>
  );
}

/**
 * The forms of eWOM, each drawn as itself: a written review, a star rating,
 * a forum thread and a social media post with comments.
 */
export function EWomForms() {
  const thread = sharp(rp([[220, 22], [380, 22], [380, 120], [220, 120]]), true, 3);
  const post = sharp(rp([[220, 140], [380, 140], [380, 246], [220, 246]]), true, 3);
  return (
    <SketchFrame
      id="sk-ewom-forms"
      width={400}
      height={260}
      label="Four forms of electronic word of mouth: a written review card, a five-star rating, a forum thread with three replies, and a social media post of a sneaker with a heart and comment bubbles."
    >
      <Backwash cx={200} cy={134} rx={194} ry={122} seed={4700} />
      <ReviewCard x={24} y={22} w={170} stars={4} lines={4} last={0.5} r={7} seed={4710} />
      {/* a star rating */}
      <Stars x={42} y={196} n={4} r={12} gap={32} seed={4730} />
      <SketchText x={108} y={234} anchor="middle" size={12}>
        4.3 · 812 RATINGS
      </SketchText>
      {/* the forum thread */}
      <Paper pts={thread} seed={4740} />
      <InkLine pts={thread} seed={4741} closed width={1.1} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <InkLine pts={rp(blobPts(238 + i * 10, 42 + i * 28, 7, 7, 4742 + i * 3, 10, 0.05))} seed={4742 + i * 3} closed width={1} />
          <Scribble x={254 + i * 10} y={40 + i * 28} w={110 - i * 10} n={2} gap={8} last={0.6} seed={4750 + i * 4} />
        </g>
      ))}
      {/* the social post */}
      <Paper pts={post} seed={4770} />
      <InkLine pts={post} seed={4771} closed width={1.1} />
      <Wash pts={rp([[230, 150], [370, 150], [370, 204], [230, 204]])} seed={4772} fill={SK.sky} opacity={0.5} />
      <Shoe x={300} y={190} s={0.95} seed={4773} />
      <Heart x={238} y={224} s={0.7} seed={4780} />
      {[0, 1].map((i) => (
        <g key={i}>
          <SpeechBubble x={286 + i * 52} y={224} w={40} h={22} tx={278 + i * 52} ty={240} seed={4790 + i * 4} />
          <Scribble x={274 + i * 52} y={224} w={24} n={1} last={1} seed={4798 + i} />
        </g>
      ))}
    </SketchFrame>
  );
}

type Category = "fashion" | "tech" | "groceries";

type NetNode = { x: number; y: number; h: number; look: Look; seed: number; flip?: boolean };

/** The circle of acquaintances: two opinion leaders (F, T), a market maven (M) and nine friends. */
const NET: Record<string, NetNode> = {
  F: { x: 176, y: 220, h: 104, look: { ...FRIEND, hair: "bob" }, seed: 5000 },
  T: { x: 624, y: 220, h: 104, look: { ...FRIEND2 }, seed: 5040, flip: true },
  M: { x: 400, y: 292, h: 104, look: { ...ELDER, hairTone: SK.brown, hair: "curly" }, seed: 5080 },
  a: { x: 56, y: 116, h: 84, look: SHOPPER, seed: 5120 },
  b: { x: 64, y: 316, h: 84, look: { ...FRIEND, wear: SK.earth }, seed: 5160 },
  c: { x: 262, y: 104, h: 84, look: { ...FRIEND2, wear: SK.blush, hair: "long" }, seed: 5200, flip: true },
  d: { x: 300, y: 250, h: 84, look: { ...ELDER, wear: SK.sky, hairTone: SK.charcoal }, seed: 5240, flip: true },
  e: { x: 744, y: 116, h: 84, look: { ...SHOPPER, wear: SK.stone, hair: "bun" }, seed: 5280, flip: true },
  f: { x: 736, y: 316, h: 84, look: { ...FRIEND, hair: "curly", wear: SK.camel }, seed: 5320, flip: true },
  g: { x: 538, y: 104, h: 84, look: { ...FRIEND2, wear: SK.earth }, seed: 5360 },
  h: { x: 500, y: 250, h: 84, look: { ...FRIEND, wear: SK.stone, hair: "short" }, seed: 5400 },
  i: { x: 400, y: 112, h: 84, look: { ...SHOPPER, hair: "long", wear: SK.sky, skin: SK.skin, skinOpacity: 0.7 }, seed: 5440 },
};

/** Who takes whose advice in each category: [source, receiver]. */
const ASKS: Record<Category, [string, string][]> = {
  fashion: [["F", "a"], ["F", "b"], ["F", "c"], ["F", "d"], ["M", "d"], ["M", "i"]],
  tech: [["T", "e"], ["T", "f"], ["T", "g"], ["T", "h"], ["M", "h"], ["M", "i"]],
  groceries: [["M", "d"], ["M", "h"], ["M", "i"]],
};

const LEADER: Record<Category, string | null> = { fashion: "F", tech: "T", groceries: null };

/** Where a ray from `o` along unit `u` crosses a figure's box: [enter, leave]. */
function slab(o: Pt, u: Pt, n: NetNode): [number, number] {
  const hw = (22 * n.h) / 200;
  const box: [number, number, number, number] = [n.x - hw, n.x + hw, n.y - n.h, n.y];
  let t0 = -Infinity;
  let t1 = Infinity;
  ([[0, box[0], box[1]], [1, box[2], box[3]]] as [0 | 1, number, number][]).forEach(([k, lo, hi]) => {
    if (Math.abs(u[k]) < 1e-9) return;
    const ta = (lo - o[k]) / u[k];
    const tb = (hi - o[k]) / u[k];
    t0 = Math.max(t0, Math.min(ta, tb));
    t1 = Math.min(t1, Math.max(ta, tb));
  });
  return [t0, t1];
}

/**
 * Opinion leaders and the market maven as an instrument. Twelve people; the
 * student picks a product category and arrows show whose advice reaches whom.
 * A sneaker stands by the fashion leader and a laptop by the technology
 * leader: each one's arrows appear only in that category (the leader's coat
 * turns teal). The market maven, a shopping bag at the feet, passes on advice
 * in every one.
 */
export function WhoAsksWhom() {
  const [cat, setCat] = React.useState<Category>("fashion");
  const chest = (n: NetNode): Pt => [n.x, n.y - n.h * 0.58];
  const lead = LEADER[cat];
  const catName = { fashion: "fashion", tech: "technology", groceries: "groceries" }[cat];
  const label =
    `A circle of twelve acquaintances. One opinion leader stands by a sneaker, another by a laptop, and the market maven by a shopping bag. For ${catName}, arrows show whose advice reaches whom: ` +
    (lead ? `the ${catName} opinion leader advises four people, and ` : "neither opinion leader advises anyone, and ") +
    `the market maven passes advice to ${ASKS[cat].filter(([s0]) => s0 === "M").length} people, as in every category.`;
  return (
    <>
      <SketchFrame id="sk-who-asks-whom" width={800} height={340} label={label}>
        <Backwash cx={400} cy={172} rx={394} ry={164} seed={4900} />
        {ASKS[cat].map(([from, to], k) => {
          const a = chest(NET[from]);
          const b = chest(NET[to]);
          const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
          const u: Pt = [(b[0] - a[0]) / len, (b[1] - a[1]) / len];
          const leave = slab(a, u, NET[from])[1] + 6;
          const enter = slab(a, u, NET[to])[0] - 6;
          const p0: Pt = [r2(a[0] + u[0] * leave), r2(a[1] + u[1] * leave)];
          const p1: Pt = [r2(a[0] + u[0] * enter), r2(a[1] + u[1] * enter)];
          return <SketchArrow key={`${cat}-${k}`} pts={[p0, p1]} seed={4920 + k * 3} width={1.3} head={8} />;
        })}
        {Object.entries(NET).map(([id, n]) => (
          <Person
            key={id}
            x={n.x}
            y={n.y}
            h={n.h}
            look={id === lead ? { ...n.look, wear: SK.teal } : n.look}
            arms={id === "F" || id === "T" || id === "M" ? ["hip", "hip"] : ["down", "hip"]}
            flip={n.flip}
            seed={n.seed}
          />
        ))}
        <Shoe x={212} y={NET.F.y - 3} s={0.55} seed={5480} />
        <Laptop2 x={588} y={NET.T.y} s={0.5} seed={5490} />
        <Bag x={366} y={NET.M.y - 34} w={26} badge={false} fill={SK.camel} seed={5500} />
        {lead ? (
          <SketchText x={NET[lead].x} y={NET[lead].y + 18} anchor="middle" size={11}>
            OPINION LEADER
          </SketchText>
        ) : null}
        <SketchText x={NET.M.x} y={NET.M.y + 18} anchor="middle" size={11}>
          MARKET MAVEN
        </SketchText>
      </SketchFrame>
      <PlateToggle<Category>
        options={[
          { id: "fashion", label: "Fashion" },
          { id: "tech", label: "Technology" },
          { id: "groceries", label: "Groceries" },
        ]}
        value={cat}
        onChange={setCat}
      />
    </>
  );
}

/* ==========================================================================
   AI-Generated Review Summaries and Synthetic Reviews
   ========================================================================== */

/** SIMULATED: the genuine reviews of the camel sneaker, and the rival's average. */
const GENUINE = [5, 2, 3, 4, 2, 3, 4, 3];
const FAKE_SLOTS = 4;
const RIVAL_AVG = 3.5;

/** A product summary box: AI sparkle, average stars and its one-line verdict. */
function SummaryBox({ x, y, w, avg, verdict, shoe, seed }: { x: number; y: number; w: number; avg: number; verdict: string; shoe: string; seed: number }) {
  const box = sharp(rp([[x, y], [x + w, y], [x + w, y + 88], [x, y + 88]]), true, 3);
  return (
    <g>
      <Paper pts={box} seed={seed} />
      <Wash pts={box} seed={seed + 1} fill={SK.sky} opacity={0.4} />
      <InkLine pts={box} seed={seed + 2} closed width={1.1} />
      <Shoe x={x + 36} y={y + 32} s={0.6} seed={seed + 3} fill={shoe} />
      <Stars x={x + 82} y={y + 26} n={Math.round(avg)} r={7.5} gap={19} seed={seed + 10} />
      <SketchText x={x + 178} y={y + 31} size={13}>
        {avg.toFixed(1)}
      </SketchText>
      <Sparkle x={x + 18} y={y + 66} r={7} seed={seed + 4} />
      <SketchText x={x + 32} y={y + 70} size={11.5}>
        {verdict}
      </SketchText>
    </g>
  );
}

const verdictFor = (avg: number) => (avg >= 3.7 ? "MOST BUYERS LOVE IT" : avg >= 3.4 ? "MANY BUYERS LIKE IT" : "BUYERS ARE DIVIDED");

/**
 * Synthetic reviews and the AI summary, as an instrument (SIMULATED data).
 * Left, the camel sneaker's eight genuine reviews and four empty slots; the
 * student taps a slot to add a synthetic five-star review, which looks just
 * like the others. Middle, the AI summaries of the camel sneaker and a rival
 * blue one. Right, a shopper and an AI agent each pick the sneaker with the
 * better summary. A few fake reviews lift the summary and turn both picks.
 */
export function FakeReviews() {
  const [fakes, setFakes] = React.useState(0);
  const [reveal, setReveal] = React.useState(false);
  const scores = [...GENUINE, ...Array.from({ length: fakes }, () => 5)];
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  const ours = avg > RIVAL_AVG;
  const pick = ours ? SK.camel : SK.sky;
  const g = 262;
  const cell = (i: number): Pt => [20 + (i % 3) * 110, 64 + Math.floor(i / 3) * 46];
  const label =
    `SIMULATED. Left: the camel sneaker's reviews: eight genuine ones and ${fakes} synthetic five-star ${fakes === 1 ? "review" : "reviews"} that look the same` +
    (reveal && fakes ? ", here marked with the AI sparkle" : "") +
    `. Middle: the AI summary gives the camel sneaker ${avg.toFixed(1)} stars, "${verdictFor(avg).toLowerCase()}", beside the blue rival's ${RIVAL_AVG.toFixed(1)}. Right: a shopper and an AI agent both pick the ${ours ? "camel" : "blue"} sneaker.`;
  return (
    <>
      <SketchFrame id="sk-fake-reviews" width={800} height={290} label={label}>
        <Backwash cx={400} cy={146} rx={394} ry={140} seed={6000} />
        <SketchText x={780} y={24} anchor="end" size={10.5} fill={SK.pencil}>
          SIMULATED
        </SketchText>
        <Shoe x={46} y={40} s={0.7} seed={6001} />
        {/* the review grid */}
        {Array.from({ length: GENUINE.length + FAKE_SLOTS }, (_, i) => {
          const [x, y] = cell(i);
          const k = i - GENUINE.length;
          if (k < 0) return <ReviewCard key={i} x={x} y={y} w={102} stars={GENUINE[i]} lines={1} r={5.5} seed={6010 + i * 40} />;
          const filled = k < fakes;
          if (filled)
            return (
              <g key={i}>
                <ReviewCard x={x} y={y} w={102} stars={5} lines={1} r={5.5} seed={6010 + i * 40} />
                {reveal ? <Sparkle x={x + 90} y={y + 11} r={6.5} seed={6500 + i} /> : null}
              </g>
            );
          const next = k === fakes;
          return (
            <g
              key={i}
              role="button"
              tabIndex={next ? 0 : -1}
              aria-label="Add a synthetic five-star review"
              onClick={() => setFakes(k + 1)}
              onKeyDown={(ev) => {
                if (ev.key === "Enter" || ev.key === " ") {
                  ev.preventDefault();
                  setFakes(k + 1);
                }
              }}
              style={{ cursor: "pointer", outline: "none" }}
            >
              <rect x={x} y={y} width={102} height={36} fill="transparent" />
              <PencilLine pts={sharp(rp([[x, y], [x + 102, y], [x + 102, y + 35], [x, y + 35]]), true, 2)} seed={6600 + i} closed />
              <SketchText x={x + 51} y={y + 23} anchor="middle" size={16} fill={SK.pencil}>
                +
              </SketchText>
            </g>
          );
        })}
        {/* into the summaries */}
        <SketchArrow pts={[[344, 92], [370, 92]]} seed={6700} head={7} />
        <SummaryBox x={380} y={44} w={214} avg={avg} verdict={verdictFor(avg)} shoe={SK.camel} seed={6710} />
        <SummaryBox x={380} y={152} w={214} avg={RIVAL_AVG} verdict={verdictFor(RIVAL_AVG)} shoe={SK.sky} seed={6740} />
        {/* the readers */}
        <Ground x0={612} x1={788} y={g} seed={6770} />
        <Person x={652} y={g} h={156} look={SHOPPER} arms={["hip", "chin"]} seed={6780} />
        <Agent x={744} y={g} s={1} seed={6820} />
        {[[652, 64], [744, 132]].map(([x, y], i) => (
          <g key={i}>
            <SpeechBubble x={x} y={y} w={74} h={42} tx={x + (i ? -6 : 6)} ty={y + (i ? 40 : 46)} seed={6830 + i * 5} />
            <Wash pts={rp([[x - 30, y - 15], [x + 30, y - 15], [x + 30, y + 15], [x - 30, y + 15]])} seed={6840 + i} fill={SK.teal} opacity={0.35} />
            <Shoe x={x} y={y + 6} s={0.62} seed={6850 + i * 9} fill={pick} />
          </g>
        ))}
      </SketchFrame>
      <div className="mt-2 flex flex-wrap items-center gap-2 px-1" aria-live="polite">
        <PlateButton onClick={() => setReveal((r) => !r)}>{reveal ? "Hide the marks" : "Mark the fakes"}</PlateButton>
        <PlateButton
          onClick={() => {
            setFakes(0);
            setReveal(false);
          }}
        >
          Remove fake reviews
        </PlateButton>
      </div>
    </>
  );
}

/**
 * The 2024 rule: a printed rule with an official seal; a review card with
 * the AI sparkle and no real reviewer is stamped out beside it.
 */
export function FakeReviewBan() {
  const page = sharp(rp([[40, 16], [190, 16], [190, 230], [40, 230]]), true, 2);
  const seal = rp(Array.from({ length: 28 }, (_, i) => {
    const a = (i / 28) * Math.PI * 2;
    const rr = i % 2 ? 21 : 25;
    return [150 + Math.cos(a) * rr, 190 + Math.sin(a) * rr] as Pt;
  }));
  return (
    <SketchFrame
      id="sk-fake-review-ban"
      width={400}
      height={250}
      label="A printed 2024 rule with an official seal. Beside it, a five-star review card marked with the AI sparkle, from a reviewer who does not exist, is crossed out."
    >
      <Backwash cx={200} cy={126} rx={194} ry={118} seed={7000} />
      <Paper pts={page} seed={7010} />
      <InkLine pts={page} seed={7011} closed width={1.2} />
      <SketchText x={115} y={46} anchor="middle" size={14} serif>
        RULE
      </SketchText>
      <SketchText x={115} y={64} anchor="middle" size={10}>
        2024
      </SketchText>
      <Scribble x={58} y={88} w={114} n={6} gap={12} last={0.5} seed={7020} />
      <Wash pts={seal} seed={7030} fill={SK.ochre} opacity={0.85} />
      <InkLine pts={seal} seed={7031} closed width={1} />
      <InkLine pts={rp(blobPts(150, 190, 13, 13, 7032, 12, 0.04))} seed={7032} closed width={0.9} />
      {/* the fake review, struck out */}
      <ReviewCard x={226} y={70} w={140} stars={5} lines={3} r={7} seed={7040} />
      <Sparkle x={350} y={84} r={8} seed={7060} />
      <InkLine pts={rp([[220, 64], [374, 168]])} seed={7070} width={2.2} />
      <InkLine pts={rp([[374, 64], [220, 168]])} seed={7071} width={2.2} />
    </SketchFrame>
  );
}

/* ==========================================================================
   Influencers, Virtual Influencers, and Online Communities
   ========================================================================== */

/** A follower: the week's Person, small; `heart` puts a heart above the head. */
function Follower({ x, y, h, look, seed, heart = false, flip = false }: { x: number; y: number; h: number; look: Look; seed: number; heart?: boolean; flip?: boolean }) {
  return (
    <g>
      <Person x={x} y={y} h={h} look={look} arms={["down", "down"]} flip={flip} seed={seed} face={h > 50} />
      {heart ? <Heart x={x} y={r2(y - h - 10)} s={r2(Math.max(0.5, h / 90))} seed={seed + 95} /> : null}
    </g>
  );
}

/** A phone on a stand showing a person talking to camera; base centre (x, y). */
function CreatorPhone({ x, y, s = 1, seed, look = FRIEND, sparkle = false }: { x: number; y: number; s?: number; seed: number; look?: Look; sparkle?: boolean }) {
  const body = sharp(at(x, y, [[-26, -96], [26, -96], [26, 0], [-26, 0]], s), true, 5 * s);
  const glass = rp(at(x, y, [[-21, -88], [21, -88], [21, -8], [-21, -8]], s));
  return (
    <g>
      <Wash pts={body} seed={seed} fill={SK.charcoal} opacity={0.7} />
      <Wash pts={glass} seed={seed + 1} fill={SK.sky} opacity={0.85} dx={0.3} dy={0.3} />
      <InkLine pts={body} seed={seed + 2} closed width={1.2} />
      <Person x={x} y={r2(y - 11 * s)} h={r2(74 * s)} look={look} arms={["hip", "wave"]} seed={seed + 10} />
      {sparkle ? <Sparkle x={r2(x + 14 * s)} y={r2(y - 76 * s)} r={r2(6 * s)} seed={seed + 5} /> : null}
    </g>
  );
}

const CROWD_LOOKS: Look[] = [SHOPPER, FRIEND, FRIEND2, ELDER, { ...FRIEND, wear: SK.earth }, { ...FRIEND2, wear: SK.blush, hair: "long" }];

/**
 * Macro- and micro-influencers: left, a creator's phone faces a crowd of
 * thirty small followers, a few of them with hearts; right, another creator's
 * phone faces six followers, nearly all with hearts.
 */
export function MacroMicro() {
  const g = 238;
  return (
    <SketchFrame
      id="sk-macro-micro"
      width={800}
      height={260}
      label="Left, MACRO-INFLUENCER: a creator on a phone faces a crowd of thirty small followers, three of them with hearts. Right, MICRO-INFLUENCER: another creator faces six followers, five of them with hearts."
    >
      <Backwash cx={230} cy={140} rx={226} ry={118} seed={7100} />
      <Backwash cx={640} cy={140} rx={150} ry={118} seed={7101} />
      <SketchText x={230} y={24} anchor="middle" size={12}>
        MACRO-INFLUENCER
      </SketchText>
      <SketchText x={640} y={24} anchor="middle" size={12}>
        MICRO-INFLUENCER
      </SketchText>
      <CreatorPhone x={54} y={g} s={1.05} seed={7110} />
      {Array.from({ length: 30 }, (_, i) => {
        const row = Math.floor(i / 10);
        const col = i % 10;
        const x = 124 + col * 30 + (row % 2) * 12;
        const y = 132 + row * 48;
        return <Follower key={i} x={x} y={y} h={44} look={CROWD_LOOKS[(i * 7) % 6]} seed={7200 + i * 100} heart={[3, 16, 27].includes(i)} flip />;
      })}
      <PencilLine pts={rp([[452, 40], [454, 240]])} seed={7190} dash="2 6" />
      <CreatorPhone x={520} y={g} s={1.05} seed={7150} look={{ ...FRIEND2, hair: "curly", wear: SK.camel }} />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const x = 596 + (i % 3) * 62;
        const y = i < 3 ? 138 : 240;
        return <Follower key={i} x={x} y={y} h={70} look={CROWD_LOOKS[i]} seed={10400 + i * 100} heart={i !== 4} flip />;
      })}
    </SketchFrame>
  );
}

/**
 * A parasocial relationship: a follower at home waves at a large phone and
 * holds a heart up to it; on the screen, the influencer waves at the camera,
 * not at the follower.
 */
export function OneSided() {
  const g = 240;
  return (
    <SketchFrame
      id="sk-one-sided"
      width={400}
      height={260}
      label="A follower at home waves at a large phone with a heart above, as if to a friend; on the screen, the influencer waves at the camera and cannot see the follower."
    >
      <Backwash cx={200} cy={140} rx={194} ry={116} seed={7400} />
      <Ground x0={20} x1={380} y={g} seed={7401} />
      {/* a small table holding the phone */}
      <Table x0={42} x1={182} y={196} g={g} seed={7410} />
      <CreatorPhone x={112} y={196} s={1.75} seed={7420} look={{ ...FRIEND2, hair: "long", wear: SK.blush }} />
      <Person x={290} y={g} h={186} look={SHOPPER} arms={["down", "wave"]} flip seed={7450} />
      <Heart x={248} y={46} s={1.5} seed={7490} />
    </SketchFrame>
  );
}

/**
 * A virtual influencer: a social post in which a smooth, computer-generated
 * character (no face, the AI sparkle at the shoulder) holds up a sneaker it
 * has never worn; hearts pile up under the post.
 */
export function VirtualInfluencer() {
  const card = sharp(rp([[96, 12], [304, 12], [304, 248], [96, 248]]), true, 3);
  const photo = rp([[108, 24], [292, 24], [292, 194], [108, 194]]);
  const look: Look = { hair: "bob", hairTone: SK.blush, wear: SK.sky, legs: SK.sky, skin: SK.stone, skinOpacity: 0.9, shoes: SK.sky };
  const hand = handAt(184, 188, 150, "reach", 1);
  return (
    <SketchFrame
      id="sk-virtual-influencer"
      width={400}
      height={260}
      label="A social media post: a smooth, computer-generated character with no face and the AI sparkle at its shoulder holds up a sneaker. Hearts sit under the post."
    >
      <Backwash cx={200} cy={130} rx={194} ry={124} seed={7500} />
      <Paper pts={card} seed={7510} />
      <InkLine pts={card} seed={7511} closed width={1.2} />
      <Wash pts={photo} seed={7512} fill={SK.blush} opacity={0.35} />
      <InkLine pts={photo} seed={7513} closed width={0.9} />
      <Person x={184} y={188} h={150} look={look} arms={["hip", "reach"]} face={false} seed={7520} />
      <Sparkle x={142} y={62} r={10} seed={7560} />
      <Shoe x={r2(hand[0] + 22)} y={r2(hand[1] + 3)} s={0.85} seed={7570} />
      <Heart x={124} y={218} s={0.8} seed={7580} />
      <SketchText x={140} y={224} size={12}>
        48K
      </SketchText>
      <Scribble x={188} y={214} w={100} n={2} gap={12} last={0.6} seed={7590} />
    </SketchFrame>
  );
}

/**
 * An online brand community: a forum page under the brand badge, where three
 * members each post a photo of themselves in the brand's sneakers (outdoors, a
 * walk in the rain, a sunny day out), with replies beneath.
 */
export function BrandForum() {
  const page = sharp(rp([[24, 16], [376, 16], [376, 244], [24, 244]]), true, 3);
  const uses: [string, number][] = [
    ["run", 0],
    ["rain", 1],
    ["day", 2],
  ];
  return (
    <SketchFrame
      id="sk-brand-forum"
      width={400}
      height={260}
      label="A brand forum page under the brand badge: three members each post a photo of themselves wearing the brand's camel sneakers: pointing the way outdoors, in the rain and on a sunny day out, with replies and hearts beneath."
    >
      <Backwash cx={200} cy={130} rx={194} ry={124} seed={7600} />
      <Paper pts={page} seed={7601} />
      <InkLine pts={page} seed={7602} closed width={1.2} />
      <BrandBadge x={48} y={40} r={12} seed={7603} />
      <Scribble x={68} y={40} w={120} n={1} last={1} seed={7604} />
      <InkLine pts={rp([[24, 62], [376, 62]])} seed={7605} width={0.9} />
      {uses.map(([kind, i]) => {
        const x = 36 + i * 114;
        const photo = rp([[x, 92], [x + 100, 92], [x + 100, 192], [x, 192]]);
        const look: Look = [{ ...FRIEND, shoes: SK.camel }, { ...FRIEND2, wear: SK.charcoal, shoes: SK.camel }, { ...ELDER, wear: SK.blush, shoes: SK.camel }][i];
        return (
          <g key={kind}>
            <InkLine pts={rp(blobPts(x + 8, 76, 7, 7, 7610 + i * 20, 10, 0.05))} seed={7610 + i * 20} closed width={1} />
            <Scribble x={x + 20} y={76} w={78} n={1} last={0.9} seed={7612 + i * 20} />
            <Wash pts={photo} seed={7614 + i * 20} fill={i === 1 ? SK.sky : i === 0 ? SK.earth : SK.blush} opacity={0.5} />
            <InkLine pts={photo} seed={7615 + i * 20} closed width={0.9} />
            {kind === "rain"
              ? [0, 1, 2, 3, 4].map((k) => <InkLine key={k} pts={rp([[x + 12 + k * 19, 100 + (k % 2) * 8], [x + 8 + k * 19, 112 + (k % 2) * 8]])} seed={7630 + k} width={0.8} />)
              : null}
            {kind === "day" ? <InkLine pts={rp(blobPts(x + 82, 110, 9, 9, 7650, 10, 0.05))} seed={7650} closed width={0.9} /> : null}
            <Person
              x={x + (kind === "day" ? 44 : 50)}
              y={184}
              h={80}
              look={look}
              arms={kind === "run" ? ["hip", "reach"] : kind === "rain" ? ["hip", "hip"] : ["hip", "wave"]}
              seed={7660 + i * 100}
            />
            <Shoe x={x + (kind === "day" ? 40 : 46)} y={182} s={0.42} seed={7900 + i * 20} />
            <Shoe x={x + (kind === "day" ? 52 : 58)} y={184} s={0.42} seed={7910 + i * 20} />
            <Heart x={x + 10} y={216} s={0.6} seed={7690 + i * 5} />
            <Scribble x={x + 24} y={214} w={70} n={2} gap={10} last={0.5} seed={7700 + i * 5} />
          </g>
        );
      })}
    </SketchFrame>
  );
}

/**
 * A disclosed endorsement: an influencer's post of the sneaker, labelled
 * PAID PARTNERSHIP and #AD.
 */
export function PaidPost() {
  const card = sharp(rp([[110, 12], [290, 12], [290, 248], [110, 248]]), true, 3);
  const photo = rp([[122, 46], [278, 46], [278, 196], [122, 196]]);
  const hand = handAt(186, 192, 140, "reach", 1);
  return (
    <SketchFrame
      id="sk-paid-post"
      width={400}
      height={260}
      label="An influencer's post: the influencer holds up the sneaker; the post is labelled PAID PARTNERSHIP at the top and #AD under the photo."
    >
      <Backwash cx={200} cy={130} rx={194} ry={124} seed={7800} />
      <Paper pts={card} seed={7810} />
      <InkLine pts={card} seed={7811} closed width={1.2} />
      <InkLine pts={rp(blobPts(128, 29, 7, 7, 7812, 10, 0.05))} seed={7812} closed width={1} />
      <SketchText x={142} y={33} size={10}>
        PAID PARTNERSHIP
      </SketchText>
      <Wash pts={photo} seed={7813} fill={SK.sky} opacity={0.4} />
      <InkLine pts={photo} seed={7814} closed width={0.9} />
      <Person x={186} y={192} h={140} look={{ ...FRIEND2, hair: "curly", wear: SK.camel }} arms={["hip", "reach"]} seed={7820} />
      <Shoe x={r2(hand[0] + 22)} y={r2(hand[1] + 3)} s={0.8} seed={7860} />
      <SketchText x={128} y={222} size={14}>
        #AD
      </SketchText>
      <Scribble x={170} y={218} w={100} n={2} gap={12} last={0.55} seed={7870} />
    </SketchFrame>
  );
}

/* ==========================================================================
   Discussion: Who Influenced Your Last Purchase?
   ========================================================================== */

/**
 * Four possible sources around one purchase: a friend, a group, an
 * influencer on a phone and an AI assistant, each with an arrow to the teal
 * shopping bag in the middle.
 */
export function WhoInfluenced() {
  const g = 300;
  const bag: Pt = [210, 200];
  return (
    <SketchFrame
      id="sk-who-influenced"
      width={420}
      height={320}
      label="One teal shopping bag in the middle. Around it, four sources each send an arrow to it: a friend, a group of three people, an influencer on a phone and an AI assistant."
    >
      <Backwash cx={210} cy={164} rx={204} ry={150} seed={8000} />
      <Bag x={bag[0]} y={bag[1] - 34} w={60} badge={false} fill={SK.teal} seed={8010} />
      {/* top left: a friend */}
      <Person x={60} y={150} h={120} look={FRIEND} arms={["hip", "reach"]} seed={8020} />
      {/* top right: a group */}
      {[318, 346, 374].map((x, i) => (
        <Person key={x} x={x} y={150} h={i === 1 ? 118 : 108} look={CROWD_LOOKS[i + 1]} arms={["down", "down"]} flip seed={8060 + i * 100} />
      ))}
      {/* bottom left: an influencer on a phone */}
      <CreatorPhone x={60} y={g} s={0.95} seed={8400} look={{ ...FRIEND2, hair: "long", wear: SK.blush }} />
      {/* bottom right: the AI assistant */}
      <Agent x={360} y={g} s={1.05} seed={8450} />
      <SketchArrow pts={curvePts([94, 104], [150, 120], [176, 160])} seed={8500} head={8} />
      <SketchArrow pts={curvePts([304, 104], [266, 120], [244, 160])} seed={8503} head={8} />
      <SketchArrow pts={curvePts([94, 236], [140, 236], [172, 218])} seed={8506} head={8} />
      <SketchArrow pts={curvePts([334, 236], [284, 236], [250, 218])} seed={8509} head={8} />
    </SketchFrame>
  );
}
