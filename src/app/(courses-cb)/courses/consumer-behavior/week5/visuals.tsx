/* ==========================================================================
   Consumer Behavior · Week 05 — figures
   --------------------------------------------------------------------------
   Editorial Sketch plates for the self-concept, personality and lifestyles:
   wobbly doubled ink and loose watercolour washes set off-register. Every
   mark comes from ../_sketch; the style rules live in ../CLAUDE.md.

   Fixed cast for this week:
     · Person: every human, one fashion-illustration figure, varied only by
       hair, clothes and skin washes. ACTUAL_SELF (plain, muted coat) and
       IDEAL_SELF (the same shopper upgraded to a camel jacket, on a sky
       wash) carry the self-concept; people are never drawn in pencil.
     · BrandBadge: the brand, a small ochre badge with a star. On a Person's
       chest it is the brand as a person (brand personality,
       anthropomorphism).
     · Bag and Box: what is bought, carrying the badge.
     · Heart: feeling.

   Colour roles: teal is the one thing chosen, lit or ticked on a plate;
   ochre the badge or a count; pencil only an absent object (an empty slot,
   a thing taken away or not bought).
   ========================================================================== */

import React from "react";
import {
  SK,
  SketchFrame,
  InkLine,
  PencilLine,
  Wash,
  Paper,
  SketchText,
  blobPts,
  wobble,
  seeded,
  r2,
  type Pt,
} from "../_sketch/sketch";

/* -- the cast (Editorial Sketch) ----------------------------------------- */

/** Round a point list, so every computed coordinate is stable (rule 20). */
const rp = (pts: Pt[]): Pt[] => pts.map(([x, y]) => [r2(x), r2(y)] as Pt);

/** One background wash behind the subject: a ragged, pale blob. */
function Backwash({
  cx,
  cy,
  rx,
  ry,
  seed,
  fill = SK.blush,
  opacity = 0.5,
}: {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  seed: number;
  fill?: string;
  opacity?: number;
}) {
  return (
    <Wash seed={seed} fill={fill} opacity={opacity} dx={0} dy={0} pts={blobPts(cx, cy, rx, ry, seed)} />
  );
}

/** A pale earth wash and a few scratchy strokes for the ground. */
function Ground({ x0, x1, y, seed }: { x0: number; x1: number; y: number; seed: number }) {
  const w = x1 - x0;
  return (
    <g>
      <Wash
        seed={seed}
        fill={SK.earth}
        opacity={0.45}
        dx={0}
        dy={0}
        pts={rp([
          [x0 + w * 0.04, y - 3],
          [x0 + w * 0.5, y - 6],
          [x1 - w * 0.04, y - 2],
          [x1 - w * 0.08, y + 9],
          [x0 + w * 0.45, y + 11],
          [x0 + w * 0.08, y + 8],
        ])}
      />
      <InkLine pts={rp([[x0, y], [x0 + w * 0.42, y - 2]])} seed={seed + 1} width={0.9} />
      <InkLine pts={rp([[x0 + w * 0.5, y + 1], [x1 - w * 0.06, y - 1]])} seed={seed + 2} width={0.9} />
      <InkLine pts={rp([[x0 + w * 0.7, y + 6], [x1, y + 5]])} seed={seed + 3} width={0.7} />
    </g>
  );
}

/** An ink line, or its unfinished pencil twin when `pencil` is set. */
function Ln({
  pts,
  seed,
  pencil = false,
  width,
  closed = false,
  color,
}: {
  pts: Pt[];
  seed: number;
  pencil?: boolean;
  width?: number;
  closed?: boolean;
  color?: string;
}) {
  return pencil ? (
    <PencilLine pts={pts} seed={seed} closed={closed} width={width ? width * 0.75 : 0.9} />
  ) : (
    <InkLine pts={pts} seed={seed} closed={closed} width={width} color={color} />
  );
}

/** A wash that disappears in pencil (unreal things stay uncoloured). */
function Tone({
  pts,
  seed,
  fill,
  pencil = false,
  opacity = 0.6,
  dx,
  dy,
}: {
  pts: Pt[];
  seed: number;
  fill: string;
  pencil?: boolean;
  opacity?: number;
  dx?: number;
  dy?: number;
}) {
  return pencil ? null : <Wash pts={pts} seed={seed} fill={fill} opacity={opacity} dx={dx} dy={dy} />;
}

/** Offset a centre line into a closed, tapering limb outline. */
function limb(c: Pt[], w0: number, w1: number): Pt[] {
  const left: Pt[] = [];
  const right: Pt[] = [];
  c.forEach((p, i) => {
    const a = c[Math.max(0, i - 1)];
    const b = c[Math.min(c.length - 1, i + 1)];
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    const nx = -(b[1] - a[1]) / len;
    const ny = (b[0] - a[0]) / len;
    const w = w0 + ((w1 - w0) * i) / (c.length - 1);
    left.push([p[0] + nx * w, p[1] + ny * w]);
    right.push([p[0] - nx * w, p[1] - ny * w]);
  });
  return [...left, ...right.reverse()];
}

/* The Person ---------------------------------------------------------------
   One fashion-illustration figure for every human this week: long legs, a
   small head, a few strokes for a face. Local units: 200 tall, feet at 0,
   facing +x. Variety comes from hair, clothes and skin washes. The `pencil`
   prop is kept in the kit, but people are always fully drawn, even an ideal
   self, a reflection or anything imagined (see ../CLAUDE.md). */

type ArmPose = "down" | "hip" | "hold" | "reach" | "up" | "carry" | "hug" | "point" | "chin" | "low" | "across" | "wave" | "shrug";

const ARMS: Record<ArmPose, Pt[]> = {
  down: [[15, -161], [20, -131], [21, -102]],
  hip: [[15, -161], [29, -139], [14, -122]],
  hold: [[15, -161], [22, -132], [25, -104]],
  reach: [[15, -161], [30, -146], [50, -138]],
  up: [[15, -161], [29, -184], [34, -210]],
  carry: [[15, -161], [24, -138], [44, -134]],
  hug: [[15, -161], [22, -138], [3, -136]],
  point: [[15, -161], [34, -160], [56, -170]],
  chin: [[15, -161], [22, -140], [7, -177]],
  low: [[15, -161], [32, -140], [62, -122]],
  wave: [[15, -161], [33, -164], [37, -196]],
  shrug: [[15, -161], [27, -132], [44, -142]],
  /** far arm only: crosses in front of the body to reach forward */
  across: [[15, -161], [2, -138], [-38, -131]],
};

type Hair = "bob" | "bun" | "curly" | "short" | "long";
type Outfit = "coat" | "jacket" | "dress" | "gown";

export type Look = {
  hair?: Hair;
  hairTone?: string;
  skin?: string;
  skinOpacity?: number;
  wear?: string;
  legs?: string;
  outfit?: Outfit;
};

const HAIR: Record<Hair, Pt[]> = {
  bob: [[-11, -175], [-11.5, -190], [-7, -198], [0, -199.5], [7, -198], [11.5, -190], [11, -175], [8, -176], [8.5, -187], [3, -192], [-6, -190], [-8.5, -184], [-8, -176]],
  bun: [[-9, -186], [-8, -195], [-2, -198.5], [6, -197], [9.5, -188], [6, -193], [-3, -193.5], [-7, -190]],
  curly: [[-12, -180], [-12.5, -192], [-7, -200.5], [1, -202], [8, -200], [12.5, -192], [12, -180], [8.5, -186], [3, -193], [-5, -192], [-9, -186]],
  short: [[-9, -186], [-8.5, -195], [-2, -199], [6, -197.5], [9.5, -187], [6.5, -192], [-2, -194], [-6.5, -191]],
  long: [[-11, -164], [-12, -190], [-7, -198.5], [0, -200], [7, -198.5], [12, -190], [11, -164], [8, -166], [8.5, -186], [3, -192], [-6, -190], [-8.5, -184], [-8, -166]],
};

/** Where the hand of a posed arm ends, in plate units (to hang props on). */
export function handAt(x: number, y: number, h: number, pose: ArmPose, side: 1 | -1 = 1, flip = false): Pt {
  const s = h / 200;
  const f = flip ? -1 : 1;
  const p = ARMS[pose][2];
  return [r2(x + f * side * p[0] * s), r2(y + p[1] * s)];
}

export function Person({
  x,
  y,
  h = 160,
  look = {},
  arms = ["hip", "down"],
  flip = false,
  pencil = false,
  seed = 1,
  face = true,
}: {
  x: number;
  y: number;
  h?: number;
  look?: Look;
  /** [far arm (−x side), near arm (+x side)] */
  arms?: [ArmPose, ArmPose];
  flip?: boolean;
  pencil?: boolean;
  seed?: number;
  face?: boolean;
}) {
  const s = h / 200;
  const f = flip ? -1 : 1;
  const P = (pts: Pt[]): Pt[] => rp(pts.map(([px, py]) => [x + f * px * s, y + py * s] as Pt));
  const {
    hair = "bob",
    hairTone = SK.brown,
    skin = SK.skin,
    skinOpacity = 0.7,
    wear = SK.camel,
    legs = SK.charcoal,
    outfit = "coat",
  } = look;

  const hem = outfit === "jacket" ? -110 : outfit === "gown" ? -5 : -84;
  const hemW = outfit === "jacket" ? 18 : outfit === "dress" ? 27 : outfit === "gown" ? 30 : 24;
  const gown = outfit === "gown";
  const body: Pt[] = [
    [-4, -169],
    [-12, -167.5],
    [-17, -162],
    [-16, -147],
    [-12.5, -122],
    [-hemW, hem],
    [hemW, hem],
    [12.5, -122],
    [16, -147],
    [17, -162],
    [12, -167.5],
    [4, -169],
  ];
  const top = hem + 1;
  const inset = 0;
  const legL: Pt[] = [[-hemW + 7, top], [-9.5, -42], [-8.5, -5], [-3.5, -5], [-4, -42], [-1.5, top + inset]];
  const legR: Pt[] = [[1.5, top + inset], [5, -42], [7, -5], [12, -5], [12, -42], [hemW - 7, top]];
  const legTone = outfit === "dress" ? skin : legs;
  const legOp = outfit === "dress" ? skinOpacity * 0.8 : 0.7;
  const shoeL: Pt[] = [[-9.5, -5], [-2.5, -5], [-1.5, 0], [-13, 0]];
  const shoeR: Pt[] = [[6, -5], [12.5, -5], [17, 0], [5, 0]];

  const arm = (pose: ArmPose, side: 1 | -1) => ARMS[pose].map(([ax, ay]) => [ax * side, ay] as Pt);
  const aL = arm(arms[0], -1);
  const aR = arm(arms[1], 1);
  const sleeve = (c: Pt[]) => limb(c, 4.2, 3);
  const handPt = (c: Pt[]) => blobPts(c[2][0], c[2][1] + 1.5, 3, 3.6, seed + 7, 8, 0.1);

  const head = blobPts(0, -186, 8.2, 10.4, seed + 3, 12, 0.05);
  const hairPts = HAIR[hair];
  const cr = seeded(seed + 5);
  const curls: [number, number, number][] =
    hair === "curly"
      ? Array.from({ length: 6 }, (_, i) => {
          const a = Math.PI * (1.02 + (i / 5) * 0.96) + (cr() - 0.5) * 0.25;
          const rr = 10.5 + cr() * 2;
          return [Math.cos(a) * rr, -189 + Math.sin(a) * rr, 2.4 + cr() * 1.6];
        })
      : [];

  return (
    <g>
      {/* legs and shoes */}
      {gown ? null : (
        <>
          <Tone pencil={pencil} pts={P(legL)} seed={seed + 10} fill={legTone} opacity={legOp} dx={1} dy={0} />
          <Tone pencil={pencil} pts={P(legR)} seed={seed + 11} fill={legTone} opacity={legOp} dx={1} dy={0} />
          <Ln pencil={pencil} pts={P([legL[0], legL[1], legL[2]])} seed={seed + 12} />
          <Ln pencil={pencil} pts={P([legL[5], legL[4], legL[3]])} seed={seed + 13} />
          <Ln pencil={pencil} pts={P([legR[0], legR[1], legR[2]])} seed={seed + 14} />
          <Ln pencil={pencil} pts={P([legR[5], legR[4], legR[3]])} seed={seed + 15} />
        </>
      )}
      <Tone pencil={pencil} pts={P(shoeL)} seed={seed + 16} fill={SK.leather} opacity={0.8} dx={0.5} dy={0} />
      <Tone pencil={pencil} pts={P(shoeR)} seed={seed + 17} fill={SK.leather} opacity={0.8} dx={0.5} dy={0} />
      <Ln pencil={pencil} pts={P(shoeL)} seed={seed + 18} width={1} closed />
      <Ln pencil={pencil} pts={P(shoeR)} seed={seed + 19} width={1} closed />

      {/* the coat, dress or jacket */}
      <Tone pencil={pencil} pts={P(body)} seed={seed + 20} fill={wear} opacity={0.62} />
      <Ln pencil={pencil} pts={P(body)} seed={seed + 21} closed />
      <Ln pencil={pencil} pts={P([[-4, -169], [0, -150], [4, -169]])} seed={seed + 22} width={1} />
      {outfit === "coat" || outfit === "jacket" ? (
        <Ln pencil={pencil} pts={P([[0, -150], [0.5, hem + 2]])} seed={seed + 23} width={0.9} />
      ) : null}
      {gown ? <Ln pencil={pencil} pts={P([[3, -118], [9, -60], [12, -8]])} seed={seed + 25} width={0.8} /> : null}
      <Ln pencil={pencil} pts={P([[-15.5, -123], [15.5, -123]])} seed={seed + 24} width={0.9} />

      {/* arms: sleeve washed like the coat, a small hand */}
      {[aL, aR].map((c, i) => (
        <g key={i}>
          <Tone pencil={pencil} pts={P(sleeve(c))} seed={seed + 30 + i} fill={wear} opacity={0.62} dx={1} dy={1} />
          <Ln pencil={pencil} pts={P(sleeve(c))} seed={seed + 32 + i} width={1.1} closed />
          <Tone pencil={pencil} pts={P(handPt(c))} seed={seed + 34 + i} fill={skin} opacity={skinOpacity} dx={0.5} dy={0.5} />
          <Ln pencil={pencil} pts={P(handPt(c))} seed={seed + 36 + i} width={0.8} closed />
        </g>
      ))}

      {/* neck, head, hair, face */}
      <Tone pencil={pencil} pts={P([[-3, -178], [3, -178], [3.5, -167], [-3.5, -167]])} seed={seed + 40} fill={skin} opacity={skinOpacity} dx={0} dy={0} />
      <Ln pencil={pencil} pts={P([[-3, -177], [-3.5, -168]])} seed={seed + 41} width={0.8} />
      <Ln pencil={pencil} pts={P([[3, -177], [3.5, -168]])} seed={seed + 42} width={0.8} />
      <Tone pencil={pencil} pts={P(head)} seed={seed + 43} fill={skin} opacity={skinOpacity} dx={0.8} dy={0.6} />
      <Ln pencil={pencil} pts={P(head)} seed={seed + 44} width={1.1} closed />
      <Tone pencil={pencil} pts={P(hairPts)} seed={seed + 45} fill={hairTone} opacity={0.72} dx={0.6} dy={0} />
      <Ln pencil={pencil} pts={P(hairPts)} seed={seed + 46} width={0.8} closed />
      {hair === "bun" ? (
        <>
          <Tone pencil={pencil} pts={P(blobPts(-5, -202, 4.8, 4.2, seed + 47, 9))} seed={seed + 47} fill={hairTone} opacity={0.72} dx={0.5} dy={0} />
          <Ln pencil={pencil} pts={P(blobPts(-5, -202, 4.8, 4.2, seed + 48, 9))} seed={seed + 48} width={0.8} closed />
        </>
      ) : null}
      {curls.map((c, i) => (
        <Ln key={i} pencil={pencil} pts={P(blobPts(c[0], c[1], c[2], c[2] * 0.9, seed + 50 + i, 7, 0.3))} seed={seed + 50 + i} width={0.7} closed />
      ))}
      {face ? (
        <g>
          <Ln pencil={pencil} pts={P([[1, -187.5], [3.6, -188]])} seed={seed + 60} width={0.7} />
          <Ln pencil={pencil} pts={P([[6.2, -188], [8, -187.6]])} seed={seed + 61} width={0.7} />
          <Ln pencil={pencil} pts={P([[6, -186], [7.4, -182.2], [5.4, -181.8]])} seed={seed + 62} width={0.6} />
          <Ln pencil={pencil} pts={P([[2.6, -178.8], [5.8, -178.6]])} seed={seed + 63} width={0.7} />
        </g>
      ) : null}
    </g>
  );
}

/** The brand: a small ochre badge with a star, the same on every plate. */
export function BrandBadge({ x, y, r = 10, seed = 900, pencil = false }: { x: number; y: number; r?: number; seed?: number; pencil?: boolean }) {
  const star = Array.from({ length: 10 }, (_, i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 === 0 ? r * 0.55 : r * 0.24;
    return [x + Math.cos(a) * rr, y + Math.sin(a) * rr] as Pt;
  });
  return (
    <g>
      <Tone pencil={pencil} pts={blobPts(x, y, r, r, seed, 10, 0.08)} seed={seed} fill={SK.ochre} opacity={0.8} dx={0.6} dy={0.4} />
      <Ln pencil={pencil} pts={rp(blobPts(x, y, r, r, seed + 1, 10, 0.06))} seed={seed + 1} width={1} closed />
      <Ln pencil={pencil} pts={rp(star)} seed={seed + 2} width={0.8} closed />
    </g>
  );
}

/** A shopping bag hanging from a hand at (x, y); `w` is the bag's width. */
export function Bag({
  x,
  y,
  w = 30,
  seed = 700,
  badge = true,
  pencil = false,
  fill = SK.camel,
}: {
  x: number;
  y: number;
  w?: number;
  seed?: number;
  badge?: boolean;
  pencil?: boolean;
  fill?: string;
}) {
  const t = y + w * 0.36;
  const h = w * 0.95;
  const body: Pt[] = rp([
    [x - w / 2, t],
    [x + w / 2, t],
    [x + w / 2 + 2, t + h],
    [x - w / 2 - 2, t + h],
  ]);
  return (
    <g>
      <Ln pencil={pencil} pts={rp([[x - w * 0.22, t + 1], [x - w * 0.16, y + 1], [x + w * 0.16, y + 1], [x + w * 0.22, t + 1]])} seed={seed} width={1} />
      <Tone pencil={pencil} pts={body} seed={seed + 1} fill={fill} opacity={0.65} />
      <Ln pencil={pencil} pts={body} seed={seed + 2} closed />
      {badge ? <BrandBadge x={x} y={r2(t + h * 0.52)} r={r2(w * 0.22)} seed={seed + 3} pencil={pencil} /> : null}
    </g>
  );
}

/** A heart: the one symbol for feeling this week. */
export function Heart({ x, y, s = 1, seed = 800, broken = false }: { x: number; y: number; s?: number; seed?: number; broken?: boolean }) {
  const pts: Pt[] = rp(
    [
      [0, 10],
      [-8, 3],
      [-12, -4],
      [-9, -10],
      [-3, -10],
      [0, -5],
      [3, -10],
      [9, -10],
      [12, -4],
      [8, 3],
    ].map(([px, py]) => [x + px * s, y + py * s] as Pt),
  );
  return (
    <g>
      <Wash pts={pts} seed={seed} fill={SK.blush} opacity={0.95} dx={1} dy={1} />
      <InkLine pts={pts} seed={seed + 1} closed width={1.1} />
      {broken ? (
        <InkLine
          pts={rp([[x, y - 5 * s], [x - 2.5 * s, y - 1 * s], [x + 2 * s, y + 2 * s], [x - 1 * s, y + 6 * s], [x, y + 10 * s]])}
          seed={seed + 2}
          width={1.3}
        />
      ) : null}
    </g>
  );
}

/** A product box standing on (x, bottom). `mark` is the brand badge or NEW. */
export function Box({
  x,
  bottom,
  w = 40,
  h = 52,
  mark = "brand",
  seed = 600,
  fill = SK.camel,
  pencil = false,
}: {
  x: number;
  bottom: number;
  w?: number;
  h?: number;
  mark?: "brand" | "new" | "none";
  seed?: number;
  fill?: string;
  pencil?: boolean;
}) {
  const pts: Pt[] = rp([
    [x - w / 2, bottom - h],
    [x + w / 2, bottom - h],
    [x + w / 2, bottom],
    [x - w / 2, bottom],
  ]);
  const cy = r2(bottom - h / 2);
  return (
    <g>
      <Tone pencil={pencil} pts={pts} seed={seed} fill={fill} opacity={0.6} />
      <Ln pencil={pencil} pts={pts} seed={seed + 1} closed />
      {mark === "brand" ? <BrandBadge x={x} y={cy} r={r2(Math.min(w, h) * 0.24)} seed={seed + 2} pencil={pencil} /> : null}
      {mark === "new" && !pencil ? (
        <SketchText x={x} y={r2(cy + 4)} anchor="middle" size={11}>
          NEW
        </SketchText>
      ) : null}
    </g>
  );
}


/* ==========================================================================
   TITLE · a mirror that shows who they hope to become
   ========================================================================== */

/** The one shopper this week's opening plates follow. */
const SHOPPER: Look = { hair: "bob", hairTone: SK.brown, wear: SK.camel, legs: SK.charcoal };

/* The self-concept pair (see "Visceral, not ghosted" in ../CLAUDE.md): the
   same shopper as they are, in a plain muted coat, and as they hope to be,
   upgraded to a sharp camel jacket, shown on a sky wash. */
const ACTUAL_SELF: Look = { ...SHOPPER, wear: SK.earth, legs: SK.tan };
const IDEAL_SELF: Look = { ...SHOPPER, wear: SK.camel, legs: SK.charcoal, outfit: "jacket" };

/** The brand as a person: one look on every plate it appears in. */
const BRAND_LOOK: Look = { hair: "curly", hairTone: SK.charcoal, skin: SK.brown, skinOpacity: 0.55, wear: SK.charcoal, legs: SK.tan, outfit: "jacket" };

export function MirrorSelf() {
  const gy = 408;
  const px = 108;
  const ph = 290;
  const [hx, hy] = handAt(px, gy, ph, "hold");
  const mx = 292;
  const glass = blobPts(mx, 196, 64, 146, 31, 22, 0.02);
  const frame = blobPts(mx, 196, 74, 157, 32, 22, 0.02);
  const rh = 228;
  const ry = 318;
  const [rhx, rhy] = handAt(mx, ry, rh, "hold", 1, true);
  return (
    <SketchFrame
      id="sk-mirror-self"
      width={400}
      height={440}
      label="A shopper in a plain coat, holding a shopping bag with the brand badge, stands in front of a tall standing mirror. In the glass stands who they hope to become: the same person, upright in a sharp camel jacket, holding the same bag."
    >
      <Backwash cx={206} cy={220} rx={186} ry={196} seed={11} />
      <Ground x0={26} x1={378} y={gy} seed={14} />

      {/* the standing mirror: two legs, the glass, a leather frame */}
      <InkLine pts={[[mx - 30, 350], [mx - 44, gy - 2]]} seed={21} width={1.6} />
      <InkLine pts={[[mx + 30, 350], [mx + 44, gy - 2]]} seed={22} width={1.6} />
      <Paper pts={rp(glass)} seed={27} />

      {/* the reflection: who they hope to become, fully drawn, behind the glass */}
      <Person x={mx} y={ry} h={rh} look={IDEAL_SELF} arms={["hip", "hold"]} flip seed={40} />
      <Bag x={rhx} y={rhy} w={30} seed={60} />
      <Wash pts={glass} seed={24} fill={SK.sky} opacity={0.28} dx={-1} dy={1} />
      <path
        d={wobble(blobPts(mx + 1.5, 197.5, 69, 151.5, 33, 22, 0.02), 23, 1.6, 18, true)}
        fill="none"
        stroke={SK.leather}
        strokeWidth={9}
        opacity={0.5}
      />
      <InkLine pts={rp(frame)} seed={25} closed />
      <InkLine pts={rp(glass)} seed={26} closed width={1.1} />

      {/* the shopper as they are */}
      <Person x={px} y={gy} h={ph} look={ACTUAL_SELF} arms={["hip", "hold"]} seed={70} />
      <Bag x={hx} y={hy} w={38} seed={90} />
    </SketchFrame>
  );
}

/* ==========================================================================
   WHAT IS THE SELF-CONCEPT?
   ========================================================================== */

/** A scalloped thought cloud: `n` round bumps set on an ellipse. */
function cloudPts(cx: number, cy: number, rx: number, ry: number, n = 14): Pt[] {
  const base = Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    return [cx + Math.cos(a) * rx, cy + Math.sin(a) * ry] as Pt;
  });
  const out: Pt[] = [];
  base.forEach((p0, i) => {
    const p1 = base[(i + 1) % n];
    const mx = (p0[0] + p1[0]) / 2;
    const my = (p0[1] + p1[1]) / 2;
    const half = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]) / 2;
    const a0 = Math.atan2(p0[1] - my, p0[0] - mx);
    // sweep the outward half circle from p0 to p1
    for (let k = 0; k < 6; k++) {
      const a = a0 + (k / 6) * Math.PI;
      out.push([mx + Math.cos(a) * half, my + Math.sin(a) * half]);
    }
  });
  return rp(out);
}

/** Five rating pips, the first `n` filled with ochre. (x, y) is the first. */
function Pips({ x, y, n, seed, gap = 32, r = 9 }: { x: number; y: number; n: number; seed: number; gap?: number; r?: number }) {
  return (
    <g>
      {Array.from({ length: 5 }, (_, i) => {
        const pts = rp(blobPts(x + i * gap, y, r, r, seed + i * 3, 10, 0.08));
        return (
          <g key={i}>
            {i < n ? <Wash pts={pts} seed={seed + i * 3 + 1} fill={SK.ochre} opacity={0.8} dx={1} dy={0.5} /> : null}
            <InkLine pts={pts} seed={seed + i * 3 + 2} closed width={1} />
          </g>
        );
      })}
    </g>
  );
}

/** The person's own judgements of themselves, held in a thought. */
export function SelfJudgement() {
  const rows = [
    { key: "APPEARANCE", n: 4 },
    { key: "INTELLECT", n: 3 },
    { key: "SKILLS", n: 4 },
    { key: "CHARACTER", n: 2 },
  ];
  const gy = 304;
  const cloud = cloudPts(514, 156, 226, 106);
  return (
    <SketchFrame
      id="sk-self-judgement"
      width={800}
      height={330}
      label="A person stands with a hand on their chin, thinking about themselves. Their thought cloud holds four self-ratings: appearance, intellect, skills and character, each scored with filled dots out of five."
    >
      <Backwash cx={420} cy={170} rx={380} ry={150} seed={101} />
      <Ground x0={40} x1={250} y={gy} seed={104} />
      <Person x={140} y={gy} h={262} look={SHOPPER} arms={["hug", "chin"]} seed={110} />

      {/* the thought: two small bubbles rising to the cloud */}
      {[
        [200, 66, 4.5],
        [222, 78, 7],
        [252, 96, 10],
      ].map(([bx, by, br], i) => {
        const pts = rp(blobPts(bx, by, br, br * 0.9, 120 + i, 10, 0.1));
        return (
          <g key={i}>
            <Paper pts={pts} seed={122 + i} />
            <InkLine pts={pts} seed={124 + i} closed width={1.1} />
          </g>
        );
      })}
      <Paper pts={cloud} seed={126} />
      <InkLine pts={cloud} seed={127} closed amp={0.5} />

      {rows.map((row, i) => {
        const y = 94 + i * 42;
        return (
          <g key={row.key}>
            <SketchText x={350} y={y + 5} size={13}>
              {row.key}
            </SketchText>
            <Pips x={538} y={y} n={row.n} seed={130 + i * 20} />
          </g>
        );
      })}
    </SketchFrame>
  );
}

/** A small store shelf: one wooden plank on two uprights, standing on `gy`. */
function Shelf({ x0, x1, y, gy, seed }: { x0: number; x1: number; y: number; gy: number; seed: number }) {
  const plank: Pt[] = [[x0, y], [x1, y], [x1, y + 9], [x0, y + 9]];
  return (
    <g>
      <InkLine pts={[[x0 + 10, y + 9], [x0 + 10, gy]]} seed={seed} width={1.2} />
      <InkLine pts={[[x1 - 10, y + 9], [x1 - 10, gy]]} seed={seed + 1} width={1.2} />
      <Wash pts={plank} seed={seed + 2} fill={SK.leather} opacity={0.6} />
      <InkLine pts={plank} seed={seed + 3} closed />
    </g>
  );
}

/** One shelf, the familiar brand and a NEW box; the buyer has taken one. */
function EsteemChoice({ pick, look, id, label, seed }: { pick: "brand" | "new"; look: Look; id: string; label: string; seed: number }) {
  const gy = 226;
  const sy = 150;
  const slots = { brand: 262, new: 338 };
  const ph = 196;
  const [hx, hy] = handAt(104, gy, ph, "reach");
  const bw = 44;
  const bh = 56;
  const left = pick === "brand" ? "new" : "brand";
  return (
    <SketchFrame id={id} width={400} height={250} label={label}>
      <Backwash cx={210} cy={134} rx={190} ry={112} seed={seed} />
      <Ground x0={24} x1={380} y={gy} seed={seed + 1} />
      <Shelf x0={218} x1={382} y={sy} gy={gy} seed={seed + 4} />
      {/* the product still on the shelf, and the empty slot the other left */}
      <Box x={slots[left]} bottom={sy} w={bw} h={bh} mark={left} seed={seed + 10} fill={left === "new" ? SK.sky : SK.camel} />
      <Box x={slots[pick]} bottom={sy} w={bw} h={bh} mark="none" pencil seed={seed + 14} />
      <Person x={104} y={gy} h={ph} look={look} arms={["hip", "reach"]} seed={seed + 20} />
      <Box x={r2(hx + 14)} bottom={r2(hy + 8)} w={bw} h={bh} mark={pick} seed={seed + 30} fill={pick === "new" ? SK.sky : SK.camel} />
    </SketchFrame>
  );
}

export function HighEsteem() {
  return (
    <EsteemChoice
      pick="new"
      id="sk-high-esteem"
      seed={200}
      look={{ hair: "curly", hairTone: SK.charcoal, skin: SK.brown, skinOpacity: 0.55, wear: SK.camel, legs: SK.charcoal }}
      label="A confident shopper has taken the unknown box marked new from a store shelf and holds it up; its empty place on the shelf is a faint pencil outline, and the familiar brand stays behind."
    />
  );
}

export function LowEsteem() {
  return (
    <EsteemChoice
      pick="brand"
      id="sk-low-esteem"
      seed={260}
      look={{ hair: "short", hairTone: SK.tan, skin: SK.skin, wear: SK.charcoal, legs: SK.tan, outfit: "jacket" }}
      label="The same shelf: this shopper has taken the familiar box with the brand badge; its empty place is a faint pencil outline, and the unknown box marked new stays on the shelf."
    />
  );
}

/* ==========================================================================
   THE ACTUAL SELF VERSUS THE IDEAL SELF
   ========================================================================== */

/* Three matching panels, read left to right under their sentences: the gap
   (tension), the purchases that bridge it, and the ad that sells the ideal.
   Every panel shares one canvas, ground, step and pair of figures. */
const PANEL = { w: 400, h: 330, low: 292, high: 186, step: 214, ax: 80, ix: 312, ph: 150 };

/** The low ground, and a raised step for the ideal self. */
function Levels({ seed }: { seed: number }) {
  const { low, high, step, w } = PANEL;
  const top: Pt[] = [[step, high], [w - 14, high], [w - 16, high + 10], [step + 4, high + 10]];
  return (
    <g>
      <Ground x0={16} x1={step - 6} y={low} seed={seed} />
      <Wash pts={top} seed={seed + 5} fill={SK.earth} opacity={0.5} dx={2} dy={1} />
      <Wash pts={[[step, high], [step + 20, high], [step + 16, low], [step, low]]} seed={seed + 6} fill={SK.earth} opacity={0.3} dx={0} dy={0} />
      <InkLine pts={[[step, low + 2], [step + 1, high], [w - 12, high - 1]]} seed={seed + 7} />
    </g>
  );
}

/** Warm wash for the here and now, sky wash for the hoped-for self. */
function PanelWashes({ seed }: { seed: number }) {
  return (
    <g>
      <Backwash cx={112} cy={222} rx={104} ry={98} seed={seed} />
      <Backwash cx={306} cy={128} rx={92} ry={104} seed={seed + 1} fill={SK.sky} opacity={0.5} />
    </g>
  );
}

function PanelLabels({ ideal = true }: { ideal?: boolean }) {
  const { low, high, ax, ix } = PANEL;
  return (
    <g>
      <SketchText x={ax} y={low + 28} anchor="middle" size={15}>
        ACTUAL SELF
      </SketchText>
      {ideal ? (
        <SketchText x={ix} y={high + 30} anchor="middle" size={15}>
          IDEAL SELF
        </SketchText>
      ) : null}
    </g>
  );
}

/** A stretched coil spring from a to b: loops, like a pulled phone cord. */
function Spring({ a, b, coils = 9, amp = 10, seed }: { a: Pt; b: Pt; coils?: number; amp?: number; seed: number }) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  const lead = 14;
  const run = len - lead * 2;
  const pts: Pt[] = [a];
  const n = coils * 12;
  for (let i = 0; i <= n; i++) {
    const th = (i / n) * coils * Math.PI * 2;
    const along = lead + (run * i) / n + (Math.cos(th) - 1) * amp * 0.75;
    const side = Math.sin(th) * amp;
    pts.push([a[0] + ux * along - uy * side, a[1] + uy * along + ux * side]);
  }
  pts.push(b);
  return (
    <path
      d={wobble(rp(pts), seed, 0.25, 3)}
      fill="none"
      stroke={SK.ink}
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

/** 1 · The gap between the two selves, pulled taut: tension. */
export function GapPanel() {
  const { w, h, low, high, ax, ix, ph } = PANEL;
  const a = handAt(ax, low, ph, "point");
  const b = handAt(ix, high, ph, "reach", 1, true);
  return (
    <SketchFrame
      id="sk-gap-panel"
      width={w}
      height={h}
      label="The shopper in a plain coat stands on low ground, labelled actual self. On a raised step, against a pale sky wash, stands the same person in a sharp camel jacket, labelled ideal self. They reach toward each other, and a coil spring stretched taut between their hands is labelled tension."
    >
      <PanelWashes seed={301} />
      <Levels seed={304} />
      <Person x={ax} y={low} h={ph} look={ACTUAL_SELF} arms={["hip", "point"]} seed={310} />
      <Person x={ix} y={high} h={ph} look={IDEAL_SELF} arms={["hip", "reach"]} flip seed={330} />
      <Spring a={[a[0] + 3, a[1] - 2]} b={[b[0] - 3, b[1] + 2]} coils={7} amp={8} seed={350} />
      <SketchText x={r2((a[0] + b[0]) / 2 + 32)} y={r2((a[1] + b[1]) / 2 + 38)} anchor="middle" size={16}>
        TENSION
      </SketchText>
      <PanelLabels />
    </SketchFrame>
  );
}

/** 2 · Products bought to bridge the gap: branded boxes stacked into steps. */
export function BridgePanel() {
  const { w, h, low, high, step, ax, ix, ph } = PANEL;
  const bh = (low - high) / 3;
  const bw = 30;
  const cols = [1, 2, 3].map((n, i) => ({ x: r2(step - bw / 2 - 2 - (2 - i) * (bw + 2)), n }));
  const [bx, by] = handAt(ix, high, ph, "hold", 1, true);
  return (
    <SketchFrame
      id="sk-bridge-panel"
      width={w}
      height={h}
      label="The same two selves on the same two levels. Product boxes with the brand badge are stacked into three steps that climb from the actual self's low ground to the ideal self's step, and the ideal self holds a shopping bag with the brand badge."
    >
      <PanelWashes seed={401} />
      <Levels seed={404} />
      {cols.map((c, ci) =>
        Array.from({ length: c.n }, (_, i) => (
          <Box key={`${ci}-${i}`} x={c.x} bottom={r2(low - bh * i)} w={bw} h={r2(bh - 1)} seed={420 + ci * 10 + i * 3} />
        )),
      )}
      <Person x={ax} y={low} h={ph} look={ACTUAL_SELF} arms={["down", "down"]} seed={310} />
      <Person x={ix} y={high} h={ph} look={IDEAL_SELF} arms={["hip", "hold"]} flip seed={330} />
      <Bag x={bx} y={by} w={26} seed={460} />
      <PanelLabels />
    </SketchFrame>
  );
}

/** 3 · The ad shows the upgraded self, holding the product. */
export function AdPanel() {
  const { w, h, low, ax, ph } = PANEL;
  const board: Pt[] = [[160, 26], [388, 26], [388, 204], [160, 204]];
  const ih = 132;
  const ix = 274;
  const iy = 190;
  const [hx, hy] = handAt(ix, iy, ih, "hold");
  return (
    <SketchFrame
      id="sk-ad-panel"
      width={w}
      height={h}
      label="The shopper in a plain coat, labelled actual self, looks up at a billboard. On the billboard, set on a pale sky wash, their ideal self in a sharp camel jacket holds a shopping bag with the brand badge; the brand badge also sits in the billboard's corner."
    >
      <Backwash cx={112} cy={222} rx={104} ry={98} seed={501} />
      <Ground x0={16} x1={w - 12} y={low} seed={504} />
      <InkLine pts={[[210, 204], [208, low]]} seed={506} width={1.5} />
      <InkLine pts={[[338, 204], [340, low]]} seed={507} width={1.5} />
      <Paper pts={board} seed={508} />
      <Wash pts={[[172, 38], [376, 38], [376, 192], [172, 192]]} seed={511} fill={SK.sky} opacity={0.45} dx={0} dy={0} />
      <InkLine pts={sharp(board)} seed={509} closed amp={1} />
      <BrandBadge x={362} y={52} r={11} seed={510} />
      <Person x={ix} y={iy} h={ih} look={IDEAL_SELF} arms={["hip", "hold"]} seed={520} />
      <Bag x={hx} y={hy} w={24} seed={540} />
      <Person x={ax} y={low} h={ph} look={ACTUAL_SELF} arms={["hip", "down"]} seed={550} />
      <PanelLabels ideal={false} />
    </SketchFrame>
  );
}

/* ==========================================================================
   THE EXTENDED SELF: POSSESSIONS AS IDENTITY
   ========================================================================== */

/** Offset a local point list to (x, y) at scale s, rounded. */
const at = (x: number, y: number, pts: Pt[], s = 1): Pt[] => rp(pts.map(([px, py]) => [x + px * s, y + py * s] as Pt));

/** Add a point just either side of each corner, so the smoothing keeps it crisp. */
function sharp(pts: Pt[], closed = true, d = 1.5): Pt[] {
  const out: Pt[] = [];
  const n = pts.length;
  pts.forEach((p, i) => {
    const prev = pts[(i - 1 + n) % n];
    const next = pts[(i + 1) % n];
    const edge = (q: Pt) => {
      const l = Math.hypot(q[0] - p[0], q[1] - p[1]) || 1;
      const k = Math.min(d, l / 3) / l;
      return [p[0] + (q[0] - p[0]) * k, p[1] + (q[1] - p[1]) * k] as Pt;
    };
    if (closed || i > 0) out.push(edge(prev));
    out.push(p);
    if (closed || i < n - 1) out.push(edge(next));
  });
  return rp(out);
}

/** A ring with a stone; (x, y) is the centre of the band. */
function JewelRing({ x, y, seed, s = 1 }: { x: number; y: number; seed: number; s?: number }) {
  const band = rp(blobPts(x, y + 6 * s, 13 * s, 13 * s, seed, 14, 0.04));
  const stone = at(x, y, [[-8, -8], [-4, -15], [4, -15], [8, -8], [0, -2]], s);
  return (
    <g>
      <Wash pts={band} seed={seed + 1} fill={SK.camel} opacity={0.35} />
      <InkLine pts={band} seed={seed + 2} closed width={1.6} />
      <InkLine pts={rp(blobPts(x, y + 6 * s, 9 * s, 9 * s, seed + 3, 12, 0.04))} seed={seed + 4} closed width={1} />
      <Wash pts={stone} seed={seed + 5} fill={SK.sky} opacity={0.9} dx={1} dy={1} />
      <InkLine pts={stone} seed={seed + 6} closed width={1.1} />
    </g>
  );
}

/** A T-shirt centred on (x, y). */
function Shirt({ x, y, seed, s = 1 }: { x: number; y: number; seed: number; s?: number }) {
  const pts = sharp(at(x, y, [[-8, -20], [-24, -12], [-18, 0], [-12, -4], [-12, 20], [12, 20], [12, -4], [18, 0], [24, -12], [8, -20], [0, -14]], s));
  return (
    <g>
      <Wash pts={pts} seed={seed} fill={SK.charcoal} opacity={0.45} />
      <InkLine pts={pts} seed={seed + 1} closed />
    </g>
  );
}

/** A house; (x, y) is the middle of its base. */
function House({ x, y, s = 1, seed, fill = SK.camel }: { x: number; y: number; s?: number; seed: number; fill?: string }) {
  const walls = sharp(at(x, y, [[-20, 0], [-20, -26], [20, -26], [20, 0]], s));
  const roof = at(x, y, [[-25, -24], [0, -46], [25, -24]], s);
  const door = at(x, y, [[-5, 0], [-5, -14], [5, -14], [5, 0]], s);
  return (
    <g>
      <Wash pts={walls} seed={seed} fill={fill} opacity={0.55} />
      <Wash pts={[...roof]} seed={seed + 1} fill={SK.leather} opacity={0.55} dx={1} dy={1} />
      <InkLine pts={walls} seed={seed + 2} closed width={1.1} />
      <InkLine pts={roof} seed={seed + 3} width={1.1} />
      <InkLine pts={door} seed={seed + 4} width={0.9} />
    </g>
  );
}

/** A sofa; (x, y) is the middle of its base. */
function Sofa({ x, y, seed, s = 1 }: { x: number; y: number; seed: number; s?: number }) {
  const back = at(x, y, [[-26, -14], [-24, -34], [24, -34], [26, -14]], s);
  const seat = sharp(at(x, y, [[-34, -4], [-34, -22], [-24, -22], [-24, -12], [24, -12], [24, -22], [34, -22], [34, -4]], s));
  return (
    <g>
      <Wash pts={[...back, ...at(x, y, [[26, -4], [-26, -4]], s)]} seed={seed} fill={SK.tan} opacity={0.5} />
      <InkLine pts={back} seed={seed + 1} width={1.1} />
      <InkLine pts={seat} seed={seed + 2} closed width={1.1} />
      <InkLine pts={at(x, y, [[-28, -4], [-29, 2]], s)} seed={seed + 3} width={1} />
      <InkLine pts={at(x, y, [[28, -4], [29, 2]], s)} seed={seed + 4} width={1} />
    </g>
  );
}

/** A small town skyline: one stepped silhouette; (x, y) is the middle of its base. */
function Skyline({ x, y, seed, s = 1 }: { x: number; y: number; seed: number; s?: number }) {
  const outline = sharp(
    at(x, y, [[-36, 0], [-36, -30], [-22, -30], [-22, -50], [-8, -50], [-8, -36], [6, -36], [6, -60], [22, -60], [22, -26], [34, -26], [34, 0]], s),
    true,
    1.2,
  );
  const windows: Pt[] = [[-29, -20], [-15, -40], [-15, -28], [14, -50], [14, -38], [14, -26], [28, -16]];
  return (
    <g>
      <Wash pts={outline} seed={seed} fill={SK.charcoal} opacity={0.3} dx={1.5} dy={1} />
      <InkLine pts={outline} seed={seed + 1} closed width={1.1} />
      {windows.map(([wx, wy], i) => (
        <InkLine key={i} pts={at(x, y, [[wx - 2.5, wy], [wx + 2.5, wy]], s)} seed={seed + 2 + i} width={1.4} amp={0.3} />
      ))}
    </g>
  );
}

/** A team pennant on its stick; (x, y) is the foot of the stick. */
function Pennant({ x, y, seed, s = 1 }: { x: number; y: number; seed: number; s?: number }) {
  const flag = sharp(at(x, y, [[-18, -62], [30, -50], [-18, -38]], s));
  return (
    <g>
      <InkLine pts={at(x, y, [[-18, 0], [-18, -64]], s)} seed={seed} width={1.5} />
      <Wash pts={flag} seed={seed + 1} fill={SK.camel} opacity={0.7} />
      <InkLine pts={flag} seed={seed + 2} closed />
      <InkLine pts={at(x, y, [[-12, -50], [12, -50]], s)} seed={seed + 3} width={1.2} />
    </g>
  );
}

/** A raised placard, the sign of a social movement; (x, y) is the foot of the stick. */
function Placard({ x, y, seed, s = 1 }: { x: number; y: number; seed: number; s?: number }) {
  const board = sharp(at(x, y, [[-26, -68], [26, -68], [26, -36], [-26, -36]], s));
  return (
    <g>
      <InkLine pts={at(x, y, [[0, 0], [0, -36]], s)} seed={seed} width={1.5} />
      <Paper pts={board} seed={seed + 1} />
      <InkLine pts={board} seed={seed + 2} closed />
      <InkLine pts={at(x, y, [[-16, -57], [16, -57]], s)} seed={seed + 3} width={1.8} />
      <InkLine pts={at(x, y, [[-11, -47], [11, -47]], s)} seed={seed + 4} width={1.8} />
    </g>
  );
}

const RINGS = ["INDIVIDUAL", "FAMILY", "COMMUNITY", "GROUP"];
const RADII = [140, 220, 300, 380];

/** The self at the centre, possessions widening out to the group. */
export function ExtendedRings() {
  const cx = 400;
  const base = 398;
  /** A point in band `i`, `deg` degrees from the vertical. */
  const p = (i: number, deg: number) => {
    const r = i === 0 ? 92 : (RADII[i - 1] + RADII[i]) / 2;
    const a = (deg * Math.PI) / 180;
    return { x: r2(cx + r * Math.sin(a)), y: r2(base - r * Math.cos(a)) };
  };
  const arc = (r: number): Pt[] =>
    rp(Array.from({ length: 25 }, (_, k) => {
      const a = Math.PI + (k / 24) * Math.PI;
      return [cx + Math.cos(a) * r, base + Math.sin(a) * r] as Pt;
    }));
  return (
    <SketchFrame
      id="sk-extended-rings"
      width={800}
      height={414}
      label="A person stands at the centre of four widening half-rings marked individual, family, community and group. The inner ring holds a jewelled ring and a shirt; the next a house and a sofa; the next a row of neighborhood houses and a town skyline; the outer ring a team pennant and a protest placard."
    >
      <Backwash cx={400} cy={250} rx={390} ry={170} seed={601} />
      {RADII.map((r, i) => (
        <InkLine key={r} pts={arc(r)} seed={610 + i} width={1} amp={1} />
      ))}
      <Ground x0={14} x1={786} y={base} seed={620} />
      {RADII.map((r, i) => (
        <SketchText key={r} x={cx} y={r2(base - r + 22)} anchor="middle" size={12}>
          {RINGS[i]}
        </SketchText>
      ))}
      <Person x={cx} y={base} h={108} look={SHOPPER} arms={["hip", "down"]} seed={630} />
      <g data-item>
        <JewelRing x={p(0, -62).x} y={p(0, -62).y - 2} s={1.3} seed={650} />
      </g>
      <g data-item>
        <Shirt x={p(0, 62).x} y={p(0, 62).y + 2} s={1.05} seed={660} />
      </g>
      <g data-item>
        <House x={p(1, -70).x} y={p(1, -70).y + 26} s={1.1} seed={670} />
      </g>
      <g data-item>
        <Sofa x={p(1, 72).x} y={p(1, 72).y + 14} s={0.95} seed={680} />
      </g>
      <g data-item>
        {[-20, 0, 20].map((dx, i) => (
          <House key={dx} x={p(2, -72).x - 4 + dx} y={p(2, -72).y + 16} s={0.48} seed={690 + i * 6} />
        ))}
      </g>
      <g data-item>
        <Skyline x={p(2, 72).x + 4} y={p(2, 72).y + 22} s={0.9} seed={720} />
      </g>
      <g data-item>
        <Pennant x={p(3, -72).x + 2} y={p(3, -72).y + 36} s={1} seed={740} />
      </g>
      <g data-item>
        <Placard x={p(3, 72).x - 2} y={p(3, 72).y + 32} s={0.9} seed={750} />
      </g>
    </SketchFrame>
  );
}

/** The four half-rings in miniature, with one band washed teal. */
export function RingMark({ lit }: { lit: number }) {
  const radii = [9, 17, 25, 33];
  const half = (r: number): Pt[] =>
    rp(Array.from({ length: 13 }, (_, k) => {
      const a = Math.PI + (k / 12) * Math.PI;
      return [38 + Math.cos(a) * r, 38 + Math.sin(a) * r] as Pt;
    }));
  const inner = lit > 0 ? half(radii[lit - 1]).reverse() : [[38, 38] as Pt];
  return (
    <svg viewBox="0 0 76 42" className="h-10 w-[4.5rem] shrink-0" aria-hidden>
      <path d={wobble([...half(radii[lit]), ...inner], 960 + lit, 0.6, 8, true)} fill={SK.teal} opacity={0.55} transform="translate(1.2 0.6)" />
      {radii.map((r, i) => (
        <path key={r} d={wobble(half(r), 970 + i, 0.4, 8)} fill="none" stroke={SK.ink} strokeWidth={1} strokeLinecap="round" />
      ))}
      <path d={wobble([[2, 38], [74, 38]], 979, 0.4, 10)} fill="none" stroke={SK.ink} strokeWidth={1} strokeLinecap="round" />
    </svg>
  );
}

/* ==========================================================================
   PERSONALITY TRAITS AND CONSUMER BEHAVIOR
   ========================================================================== */

/* The four trait plates share one canvas, ground line and figure height. */
const TRAIT = { w: 400, h: 240, gy: 220, ph: 172 };

/** First in line, and already holding something new. */
export function Innovativeness() {
  const { w, h, gy, ph } = TRAIT;
  const fx = 232;
  const [hx, hy] = handAt(fx, gy, ph * 0.94, "reach");
  const queue: { x: number; look: Look }[] = [
    { x: 40, look: { hair: "short", hairTone: SK.charcoal, wear: SK.charcoal, legs: SK.tan, outfit: "jacket" } },
    { x: 96, look: { hair: "long", hairTone: SK.camel, wear: SK.sky, skinOpacity: 0.5 } },
    { x: 154, look: { hair: "bun", hairTone: SK.brown, skin: SK.tan, skinOpacity: 0.5, wear: SK.leather, outfit: "dress" } },
  ];
  return (
    <SketchFrame
      id="sk-innovativeness"
      width={w}
      height={h}
      label="A queue of four people waits at a stand stocked with boxes marked new. The person at the front of the line already holds a new box up to look at it."
    >
      <Backwash cx={206} cy={128} rx={192} ry={106} seed={1001} />
      <Ground x0={18} x1={384} y={gy} seed={1004} />
      <Shelf x0={318} x1={390} y={150} gy={gy} seed={1008} />
      <Box x={356} bottom={150} w={38} h={48} mark="new" fill={SK.sky} seed={1012} />
      {queue.map((q, i) => (
        <Person key={q.x} x={q.x} y={gy} h={ph * 0.94} look={q.look} arms={["down", "down"]} seed={1020 + i * 80} />
      ))}
      <Person x={fx} y={gy} h={ph * 0.94} look={{ hair: "curly", hairTone: SK.charcoal, skin: SK.brown, skinOpacity: 0.55, wear: SK.camel }} arms={["hip", "reach"]} seed={1300} />
      <Box x={r2(hx + 12)} bottom={r2(hy + 6)} w={36} h={44} mark="new" fill={SK.sky} seed={1340} />
    </SketchFrame>
  );
}

/** A car, side on; (x, y) is the middle of its wheelbase on the ground. */
function Car({ x, y, s = 1, seed, fill = SK.leather }: { x: number; y: number; s?: number; seed: number; fill?: string }) {
  const body = at(x, y, [[-60, -10], [-60, -28], [-44, -32], [-26, -52], [22, -52], [40, -32], [60, -28], [62, -10]], s);
  const glass = at(x, y, [[-22, -34], [-16, -47], [16, -47], [30, -34]], s);
  return (
    <g>
      <Wash pts={body} seed={seed} fill={fill} opacity={0.55} />
      <Wash pts={glass} seed={seed + 1} fill={SK.sky} opacity={0.8} dx={1} dy={0} />
      <InkLine pts={body} seed={seed + 2} closed />
      <InkLine pts={glass} seed={seed + 3} closed width={1} />
      {[-36, 38].map((wx, i) => {
        const wheel = rp(blobPts(x + wx * s, y - 10 * s, 11 * s, 11 * s, seed + 4 + i, 12, 0.05));
        return (
          <g key={wx}>
            <Wash pts={wheel} seed={seed + 6 + i} fill={SK.charcoal} opacity={0.7} dx={0.5} dy={0.5} />
            <InkLine pts={wheel} seed={seed + 8 + i} closed width={1.2} />
          </g>
        );
      })}
    </g>
  );
}

/** Worldly goods, owned for status: standing tall on a pile of purchases. */
export function Materialism() {
  const { w, h, gy } = TRAIT;
  const pile = [
    { x: 96, b: gy, w: 58, hh: 34, f: SK.camel },
    { x: 156, b: gy, w: 58, hh: 34, f: SK.tan },
    { x: 126, b: gy - 34, w: 54, hh: 32, f: SK.sky },
  ];
  const top = gy - 66;
  const ph = 124;
  const [hx, hy] = handAt(128, top, ph, "hold");
  return (
    <SketchFrame
      id="sk-materialism"
      width={w}
      height={h}
      label="A person stands tall on top of a pile of branded purchase boxes, holding a shopping bag, next to a shiny car."
    >
      <Backwash cx={206} cy={122} rx={190} ry={110} seed={1401} />
      <Ground x0={20} x1={384} y={gy} seed={1404} />
      <Car x={296} y={gy} s={1.15} seed={1410} />
      {pile.map((b, i) => (
        <Box key={i} x={b.x} bottom={b.b} w={b.w} h={b.hh} fill={b.f} seed={1430 + i * 5} />
      ))}
      <Person x={128} y={top} h={ph} look={{ hair: "long", hairTone: SK.brown, skin: SK.camel, skinOpacity: 0.55, wear: SK.charcoal, outfit: "dress" }} arms={["hip", "hold"]} seed={1460} />
      <Bag x={hx} y={hy} w={24} seed={1520} />
    </SketchFrame>
  );
}

/** Reading every line of a long, detailed product description. */
export function NeedForCognition() {
  const { w, h, gy, ph } = TRAIT;
  const px = 112;
  const [hx, hy] = handAt(px, gy, ph, "point");
  const sx = r2(hx - 4);
  const sw = 52;
  const top = r2(hy - 10);
  const folds = [0, 1, 2, 3].map((i) => r2(top + i * 34));
  const bottom = r2(top + 4 * 34);
  // an accordion leaflet: each panel's edge kinks a little at the folds
  const edge: Pt[] = [
    [sx, top],
    [sx + sw, top],
    ...folds.slice(1).map((y, i) => [sx + sw + (i % 2 ? -3 : 3), y] as Pt),
    [sx + sw, bottom],
    [sx, bottom],
    ...folds.slice(1).reverse().map((y, i) => [sx + (i % 2 ? 3 : -3), y] as Pt),
  ];
  const rnd = seeded(1611);
  return (
    <SketchFrame
      id="sk-need-for-cognition"
      width={w}
      height={h}
      label="A person with a hand on their chin holds up a long folded product leaflet, dense with lines of small print, and reads it closely. The product box with the brand badge stands at the foot of the leaflet."
    >
      <Backwash cx={206} cy={124} rx={192} ry={108} seed={1601} />
      <Ground x0={20} x1={384} y={gy} seed={1604} />
      <Box x={300} bottom={gy} w={64} h={78} seed={1606} />
      <Person x={px} y={gy} h={ph} look={{ hair: "short", hairTone: SK.brown, skin: SK.skin, wear: SK.sky, legs: SK.charcoal, outfit: "jacket" }} arms={["chin", "point"]} seed={1620} />
      <Paper pts={edge} seed={1640} />
      <InkLine pts={sharp(edge)} seed={1641} closed width={1.1} />
      {folds.slice(1).map((y, i) => (
        <InkLine key={y} pts={rp([[sx + (i % 2 ? 3 : -3), y], [sx + sw + (i % 2 ? -3 : 3), y]])} seed={1645 + i} width={0.7} />
      ))}
      {folds.map((y, fi) =>
        [0, 1, 2].map((k) => (
          <InkLine
            key={`${fi}-${k}`}
            pts={rp([[sx + 8, y + 9 + k * 8], [sx + 8 + 26 + Math.round(rnd() * 8), y + 9 + k * 8]])}
            seed={1660 + fi * 3 + k}
            width={0.7}
            amp={0.3}
          />
        )),
      )}
    </SketchFrame>
  );
}

/** A piggy bank standing on (x, bottom), facing right. */
function PiggyBank({ x, bottom, seed }: { x: number; bottom: number; seed: number }) {
  const cy = bottom - 34;
  const body = rp(blobPts(x, cy, 38, 25, seed, 16, 0.05));
  const snout = at(x, cy, [[34, -9], [46, -8], [46, 7], [34, 8]]);
  const ear = at(x, cy, [[10, -21], [18, -36], [24, -19]]);
  const legs = [-22, -8, 12, 24].map((lx) => at(x, cy, [[lx, 18], [lx, 34]]));
  return (
    <g>
      <Wash pts={[...body]} seed={seed + 1} fill={SK.skin} opacity={0.75} />
      <Wash pts={snout} seed={seed + 2} fill={SK.skin} opacity={0.75} dx={1} dy={1} />
      {legs.map((l, i) => (
        <InkLine key={i} pts={l} seed={seed + 3 + i} width={2.2} />
      ))}
      <InkLine pts={body} seed={seed + 8} closed />
      <InkLine pts={sharp(snout)} seed={seed + 9} closed width={1.1} />
      <InkLine pts={ear} seed={seed + 10} width={1.1} />
      <InkLine pts={at(x, cy, [[-37, -2], [-45, -8], [-43, -15], [-38, -11]])} seed={seed + 11} width={0.9} />
      <InkLine pts={at(x, cy, [[-8, -24], [8, -24]])} seed={seed + 12} width={2.2} />
      <InkLine pts={at(x, cy, [[24, -7], [25, -5]])} seed={seed + 13} width={2} />
    </g>
  );
}

/** A coin: a small ochre disc. */
function Coin({ x, y, seed, r = 7 }: { x: number; y: number; seed: number; r?: number }) {
  const pts = rp(blobPts(x, y, r, r, seed, 10, 0.06));
  return (
    <g>
      <Wash pts={pts} seed={seed + 1} fill={SK.ochre} opacity={0.85} dx={0.8} dy={0.5} />
      <InkLine pts={pts} seed={seed + 2} closed width={1} />
    </g>
  );
}

/** Careful spending: the coin is saved, the wasteful bag stays unbought. */
export function Frugality() {
  const { w, h, gy, ph } = TRAIT;
  const px = 70;
  const [hx, hy] = handAt(px, gy, ph, "low");
  const pig = r2(hx + 12);
  return (
    <SketchFrame
      id="sk-frugality"
      width={w}
      height={h}
      label="A person drops a coin into a piggy bank. Beside them, a shopping bag they did not buy is drawn in faint pencil and crossed out in ink."
    >
      <Backwash cx={206} cy={126} rx={190} ry={106} seed={1701} />
      <Ground x0={20} x1={384} y={gy} seed={1704} />
      <Person x={px} y={gy} h={ph} look={{ hair: "bun", hairTone: SK.charcoal, skin: SK.tan, skinOpacity: 0.5, wear: SK.leather, legs: SK.charcoal }} arms={["hip", "low"]} seed={1710} />
      <Coin x={r2(pig - 3)} y={r2(hy + 18)} seed={1765} r={6.5} />
      <PiggyBank x={pig} bottom={gy} seed={1770} />
      <Bag x={320} y={120} w={48} pencil seed={1790} />
      <InkLine pts={[[296, 134], [346, 186]]} seed={1797} width={1.5} />
      <InkLine pts={[[346, 134], [296, 186]]} seed={1798} width={1.5} />
    </SketchFrame>
  );
}

/* ==========================================================================
   THE BIG FIVE PERSONALITY DIMENSIONS
   ========================================================================== */

/* The five dimension plates share one canvas, ground line and figure height. */
const BIG = { w: 400, h: 220, gy: 202, ph: 164 };

/** Creativity: painting something new at an easel. */
export function Openness() {
  const { w, h, gy, ph } = BIG;
  const px = 134;
  const [hx, hy] = handAt(px, gy, ph, "reach");
  const canvas: Pt[] = [[196, 22], [320, 22], [320, 118], [196, 118]];
  return (
    <SketchFrame
      id="sk-openness"
      width={w}
      height={h}
      label="A person stands at an easel with a brush, painting a new picture of loose colour: a sky, a sun and a hill."
    >
      <Backwash cx={206} cy={112} rx={190} ry={98} seed={1801} />
      <Ground x0={20} x1={384} y={gy} seed={1804} />
      {/* the easel */}
      <InkLine pts={[[258, 14], [214, gy - 2]]} seed={1806} width={1.4} />
      <InkLine pts={[[258, 14], [302, gy - 2]]} seed={1807} width={1.4} />
      <InkLine pts={[[258, 118], [262, gy - 2]]} seed={1808} width={1.2} />
      <InkLine pts={[[190, 120], [326, 120]]} seed={1809} width={1.4} />
      <Paper pts={canvas} seed={1810} />
      <Wash pts={[[204, 30], [312, 30], [312, 76], [204, 80]]} seed={1811} fill={SK.sky} opacity={0.7} dx={0} dy={0} />
      <Wash pts={blobPts(286, 52, 13, 13, 1812, 10)} seed={1812} fill={SK.ochre} opacity={0.85} dx={0} dy={0} />
      <Wash pts={[[200, 110], [236, 74], [268, 92], [314, 70], [316, 112]]} seed={1813} fill={SK.camel} opacity={0.75} dx={0} dy={0} />
      <InkLine pts={canvas} seed={1814} closed />
      <Person x={px} y={gy} h={ph} look={{ hair: "curly", hairTone: SK.brown, skin: SK.skin, wear: SK.charcoal, legs: SK.tan }} arms={["hip", "reach"]} seed={1820} />
      {/* the brush, from the hand to the canvas */}
      <InkLine pts={rp([[hx - 2, hy + 2], [hx + 30, hy - 22]])} seed={1860} width={1.8} amp={0.3} />
      <Wash pts={rp(blobPts(hx + 33, hy - 24, 4, 3, 1861, 8))} seed={1861} fill={SK.ochre} opacity={0.9} dx={0} dy={0} />
      {/* the wet stroke it is laying down */}
      <path
        d={wobble(rp([[hx + 35, hy - 25], [hx + 48, hy - 34], [hx + 62, hy - 30], [hx + 76, hy - 40]]), 1862, 0.8, 8)}
        fill="none"
        stroke={SK.ochre}
        strokeWidth={4.5}
        strokeLinecap="round"
        opacity={0.85}
      />
    </SketchFrame>
  );
}

/** A teal tick, like the Receipt's: what is done or chosen. */
function Tick({ x, y, s = 1, seed }: { x: number; y: number; s?: number; seed: number }) {
  return (
    <path
      d={wobble(at(x, y, [[-7, -1], [-1, 6], [10, -9]], s), seed, 0.5, 5)}
      fill="none"
      stroke={SK.teal}
      strokeWidth={2.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

/** Organization: every item on the list is done. */
export function Conscientiousness() {
  const { w, h, gy, ph } = BIG;
  const px = 124;
  const [hx, hy] = handAt(px, gy, ph, "reach");
  const bx = r2(hx - 2);
  const by = r2(hy - 62);
  const board: Pt[] = [[bx, by], [bx + 96, by], [bx + 96, by + 124], [bx, by + 124]];
  const clip: Pt[] = [[bx + 32, by - 6], [bx + 64, by - 6], [bx + 64, by + 8], [bx + 32, by + 8]];
  return (
    <SketchFrame
      id="sk-conscientiousness"
      width={w}
      height={h}
      label="A person holds up a clipboard checklist on which every item has a teal tick."
    >
      <Backwash cx={206} cy={112} rx={190} ry={98} seed={1901} />
      <Ground x0={20} x1={384} y={gy} seed={1904} />
      <Person x={px} y={gy} h={ph} look={{ hair: "bob", hairTone: SK.charcoal, skin: SK.camel, skinOpacity: 0.55, wear: SK.camel, legs: SK.charcoal, outfit: "jacket" }} arms={["hip", "reach"]} seed={1910} />
      <Wash pts={board} seed={1950} fill={SK.leather} opacity={0.55} dx={2} dy={2} />
      <Paper pts={at(0, 0, [[bx + 8, by + 12], [bx + 88, by + 12], [bx + 88, by + 116], [bx + 8, by + 116]])} seed={1951} />
      <InkLine pts={sharp(board)} seed={1952} closed />
      <Wash pts={clip} seed={1953} fill={SK.charcoal} opacity={0.6} dx={0.5} dy={0.5} />
      <InkLine pts={sharp(clip)} seed={1954} closed width={1} />
      {[0, 1, 2, 3].map((i) => {
        const y = r2(by + 32 + i * 23);
        const box = at(0, 0, [[bx + 16, y - 7], [bx + 28, y - 7], [bx + 28, y + 5], [bx + 16, y + 5]]);
        return (
          <g key={i}>
            <InkLine pts={sharp(box)} seed={1960 + i * 4} closed width={0.9} />
            <InkLine pts={rp([[bx + 36, y], [bx + (i % 2 ? 70 : 80), y]])} seed={1961 + i * 4} width={0.8} amp={0.4} />
            <Tick x={bx + 23} y={y - 2} s={0.9} seed={1962 + i * 4} />
          </g>
        );
      })}
    </SketchFrame>
  );
}

/** A speech bubble with a few lines of talk; the tail points at (tx, ty). */
function Speech({ x, y, w, h, tx, ty, seed, lines = 2 }: { x: number; y: number; w: number; h: number; tx: number; ty: number; seed: number; lines?: number }) {
  const l = x - w / 2;
  const r = x + w / 2;
  const t = y - h / 2;
  const b = y + h / 2;
  const side = tx < x ? -1 : 1;
  const tb = x + side * w * 0.12;
  const pts: Pt[] = rp([
    [l + 8, t],
    [r - 8, t],
    [r, t + 8],
    [r, b - 8],
    [r - 8, b],
    [tb + 7 * side, b],
    [tx, ty],
    [tb - 7 * side, b],
    [l + 8, b],
    [l, b - 8],
    [l, t + 8],
  ]);
  return (
    <g>
      <Paper pts={pts} seed={seed} />
      <InkLine pts={pts} seed={seed + 1} closed width={1.1} />
      {Array.from({ length: lines }, (_, i) => (
        <InkLine
          key={i}
          pts={rp([[l + 10, t + 12 + i * 9], [r - (i === lines - 1 ? 22 : 10), t + 12 + i * 9]])}
          seed={seed + 2 + i}
          width={0.8}
          amp={0.4}
        />
      ))}
    </g>
  );
}

/** Sociability: the one doing the talking in the middle of the group. */
export function Extraversion() {
  const { w, h, gy, ph } = BIG;
  const sh = ph * 0.86;
  const cx = 200;
  const listeners: { x: number; flip: boolean; look: Look }[] = [
    { x: 52, flip: false, look: { hair: "short", hairTone: SK.charcoal, wear: SK.sky, outfit: "jacket", legs: SK.charcoal } },
    { x: 116, flip: false, look: { hair: "bun", hairTone: SK.brown, skin: SK.tan, skinOpacity: 0.5, wear: SK.leather, outfit: "dress" } },
    { x: 284, flip: true, look: { hair: "long", hairTone: SK.camel, wear: SK.charcoal, legs: SK.tan } },
    { x: 348, flip: true, look: { hair: "curly", hairTone: SK.charcoal, skin: SK.brown, skinOpacity: 0.55, wear: SK.camel } },
  ];
  return (
    <SketchFrame
      id="sk-extraversion"
      width={w}
      height={h}
      label="A person in the middle of a group talks with one arm raised and a speech bubble above them, while four others stand round them listening."
    >
      <Backwash cx={206} cy={112} rx={192} ry={98} seed={2001} />
      <Ground x0={16} x1={386} y={gy} seed={2004} />
      {listeners.map((l, i) => (
        <Person key={l.x} x={l.x} y={gy} h={sh} look={l.look} arms={["down", "down"]} flip={l.flip} seed={2010 + i * 80} />
      ))}
      <Person x={cx} y={gy} h={ph} look={{ hair: "bob", hairTone: SK.tan, skin: SK.skin, wear: SK.camel, legs: SK.charcoal }} arms={["hip", "up"]} seed={2400} />
      <Speech x={r2(cx - 58)} y={26} w={74} h={30} tx={r2(cx - 12)} ty={50} seed={2450} />
    </SketchFrame>
  );
}

/** Cooperation: two people carry one load together, warmly. */
export function Agreeableness() {
  const { w, h, gy, ph } = BIG;
  const ax = 108;
  const bx = 292;
  const [lx, ly] = handAt(ax, gy, ph, "carry");
  const [rx] = handAt(bx, gy, ph, "carry", 1, true);
  const box: Pt[] = [[lx - 2, ly - 30], [rx + 2, ly - 30], [rx + 2, ly + 6], [lx - 2, ly + 6]];
  return (
    <SketchFrame
      id="sk-agreeableness"
      width={w}
      height={h}
      label="Two people face each other and carry one long box between them, with a heart above the box."
    >
      <Backwash cx={204} cy={112} rx={190} ry={98} seed={2101} />
      <Ground x0={20} x1={384} y={gy} seed={2104} />
      <Person x={ax} y={gy} h={ph} look={{ hair: "short", hairTone: SK.brown, skin: SK.camel, skinOpacity: 0.5, wear: SK.sky, legs: SK.charcoal, outfit: "jacket" }} arms={["across", "carry"]} seed={2110} />
      <Person x={bx} y={gy} h={ph} look={{ hair: "bun", hairTone: SK.charcoal, skin: SK.brown, skinOpacity: 0.5, wear: SK.camel, legs: SK.tan }} arms={["across", "carry"]} flip seed={2200} />
      <Wash pts={box} seed={2250} fill={SK.tan} opacity={0.55} />
      <InkLine pts={sharp(box)} seed={2251} closed />
      <InkLine pts={rp([[lx + 6, ly - 18], [rx - 6, ly - 18]])} seed={2252} width={0.8} />
      <Heart x={200} y={r2(ly - 62)} s={1.5} seed={2260} />
    </SketchFrame>
  );
}

/** Anxiety and mood swings: a storm cloud over one person. */
export function Neuroticism() {
  const { w, h, gy, ph } = BIG;
  const px = 200;
  const cloud = cloudPts(200, 40, 66, 14, 10);
  const bolt = at(236, 60, [[6, 0], [-6, 18], [3, 18], [-5, 38], [16, 12], [7, 12], [14, 0]]);
  return (
    <SketchFrame
      id="sk-neuroticism"
      width={w}
      height={h}
      label="A person hugs themselves anxiously under a dark storm cloud with rain and a lightning bolt."
    >
      <Backwash cx={204} cy={116} rx={186} ry={96} seed={2301} fill={SK.sky} opacity={0.45} />
      <Ground x0={40} x1={364} y={gy} seed={2304} />
      <Person x={px} y={gy} h={ph * 0.74} look={{ hair: "long", hairTone: SK.brown, skin: SK.skin, wear: SK.sky, legs: SK.charcoal }} arms={["hug", "hug"]} seed={2310} />
      <Wash pts={cloud} seed={2350} fill={SK.charcoal} opacity={0.55} />
      <InkLine pts={cloud} seed={2351} closed width={1.1} amp={0.5} />
      <Wash pts={bolt} seed={2352} fill={SK.ochre} opacity={0.9} dx={1} dy={1} />
      <InkLine pts={sharp(bolt)} seed={2353} closed width={1} />
      {[146, 162, 178, 264].map((x, i) => (
        <InkLine key={x} pts={rp([[x, 70 + (i % 2) * 8], [x - 4, 82 + (i % 2) * 8]])} seed={2360 + i} width={0.9} />
      ))}
    </SketchFrame>
  );
}

/** One poster on two posts; children draw its contents. */
function Poster({ x0, x1, top, bottom, gy, seed, children }: { x0: number; x1: number; top: number; bottom: number; gy: number; seed: number; children?: React.ReactNode }) {
  const board: Pt[] = [[x0, top], [x1, top], [x1, bottom], [x0, bottom]];
  const w = x1 - x0;
  return (
    <g>
      <InkLine pts={[[x0 + w * 0.22, bottom], [x0 + w * 0.22 - 1, gy]]} seed={seed} width={1.5} />
      <InkLine pts={[[x1 - w * 0.22, bottom], [x1 - w * 0.22 + 1, gy]]} seed={seed + 1} width={1.5} />
      <Paper pts={board} seed={seed + 2} />
      {children}
      <InkLine pts={sharp(board)} seed={seed + 3} closed />
    </g>
  );
}

/** The same product, two ads: loud for the extravert, orderly for the conscientious. */
export function TailoredAds() {
  const gy = 300;
  const ph = 196;
  const rnd = seeded(2511);
  const confetti = Array.from({ length: 22 }, (_, i) => ({
    x: r2(166 + rnd() * 198),
    y: r2(84 + rnd() * 140),
    f: [SK.ochre, SK.camel, SK.sky][i % 3],
  })).filter((c) => Math.abs(c.x - 264) > 38 || Math.abs(c.y - 170) > 40);
  return (
    <SketchFrame
      id="sk-tailored-ads"
      width={800}
      height={344}
      label="The same product box with the brand badge in two posters. On the left, an arm-waving extravert reads a loud poster that says Join the party, splashed with ochre and confetti. On the right, a calm conscientious person reads an orderly poster that says Built to last, with neat ruled lines of detail."
    >
      <Backwash cx={400} cy={170} rx={390} ry={160} seed={2501} />
      <Ground x0={20} x1={384} y={gy} seed={2504} />
      <Ground x0={416} x1={780} y={gy} seed={2508} />

      {/* extraversion: loud copy, warm splashes, confetti */}
      <Poster x0={150} x1={380} top={30} bottom={238} gy={gy} seed={2520}>
        <Wash pts={blobPts(264, 168, 60, 50, 2525, 14, 0.3)} seed={2525} fill={SK.ochre} opacity={0.7} dx={0} dy={0} />
        {confetti.map((c, i) => (
          <Wash key={i} pts={rp(blobPts(c.x, c.y, 6.5, 4.5, 2530 + i, 7))} seed={2530 + i} fill={c.f} opacity={0.95} dx={0} dy={0} />
        ))}
        <SketchText x={265} y={66} anchor="middle" size={24} serif>
          Join the party!
        </SketchText>
        <Box x={264} bottom={204} w={56} h={66} seed={2550} />
      </Poster>
      <Person x={76} y={gy} h={ph} look={{ hair: "curly", hairTone: SK.charcoal, skin: SK.brown, skinOpacity: 0.55, wear: SK.camel, legs: SK.charcoal }} arms={["hip", "up"]} seed={2560} />
      <SketchText x={76} y={330} anchor="middle" size={12}>
        EXTRAVERSION
      </SketchText>

      {/* conscientiousness: plain copy, one calm wash, ruled detail */}
      <Poster x0={550} x1={780} top={30} bottom={238} gy={gy} seed={2620}>
        <Wash pts={[[566, 92], [764, 92], [764, 186], [566, 186]]} seed={2625} fill={SK.sky} opacity={0.55} dx={0} dy={0} />
        <SketchText x={665} y={66} anchor="middle" size={24} serif>
          Built to last.
        </SketchText>
        <Box x={665} bottom={178} w={56} h={66} seed={2650} />
        {[0, 1, 2].map((i) => (
          <InkLine key={i} pts={rp([[590, 202 + i * 10], [i === 2 ? 700 : 740, 202 + i * 10]])} seed={2660 + i} width={0.8} amp={0.3} />
        ))}
      </Poster>
      <Person x={476} y={gy} h={ph} look={{ hair: "bob", hairTone: SK.brown, skin: SK.skin, wear: SK.charcoal, legs: SK.charcoal, outfit: "jacket" }} arms={["down", "down"]} seed={2670} />
      <SketchText x={476} y={330} anchor="middle" size={12}>
        CONSCIENTIOUSNESS
      </SketchText>
    </SketchFrame>
  );
}

/* ==========================================================================
   BRAND PERSONALITY: GIVING LIFE TO OBJECTS
   ========================================================================== */

/** The brand as a person: the week's Person wearing the brand badge on the chest. */
function BrandPerson(props: React.ComponentProps<typeof Person> & { badgeInk?: boolean }) {
  const { x, y, h = 160, flip = false, pencil = false, seed = 1, badgeInk = true } = props;
  const s = h / 200;
  const f = flip ? -1 : 1;
  return (
    <g>
      <Person {...props} />
      <BrandBadge x={r2(x + f * 7 * s)} y={r2(y - 146 * s)} r={r2(Math.max(5, 6.5 * s))} seed={seed + 90} pencil={pencil && !badgeInk} />
    </g>
  );
}

/** Consumers picture the brand as a person. */
export function BrandTraits() {
  const gy = 270;
  const cloud = cloudPts(292, 114, 82, 84, 12);
  return (
    <SketchFrame
      id="sk-brand-traits"
      width={400}
      height={296}
      label="A consumer looks at a product box with the brand badge. In their thought cloud, the brand appears as a person in a dark jacket, wearing the same badge on their chest."
    >
      <Backwash cx={204} cy={150} rx={190} ry={136} seed={2701} />
      <Ground x0={20} x1={380} y={gy} seed={2704} />
      <Person x={70} y={gy} h={190} look={SHOPPER} arms={["hip", "down"]} seed={2710} />
      <Box x={170} bottom={gy} w={56} h={68} seed={2750} />
      {[
        [104, 76, 4.5],
        [126, 82, 7],
        [156, 96, 9.5],
      ].map(([bx, by, br], i) => {
        const pts = rp(blobPts(bx, by, br, br * 0.9, 2760 + i, 10, 0.1));
        return (
          <g key={i}>
            <Paper pts={pts} seed={2763 + i} />
            <InkLine pts={pts} seed={2766 + i} closed width={1.1} />
          </g>
        );
      })}
      <Paper pts={cloud} seed={2770} />
      <InkLine pts={cloud} seed={2771} closed amp={0.5} />
      <BrandPerson x={294} y={196} h={150} look={BRAND_LOOK} arms={["hip", "down"]} seed={2780} />
    </SketchFrame>
  );
}

/* The five dimension rows share one canvas; the brand person stands at left. */
const DIM = { w: 400, h: 220, gy: 204, ph: 176, px: 78 };

/** A standing greeting card with a heart on its front; (x, y) is its base. */
function GreetingCard({ x, y, seed, s = 1 }: { x: number; y: number; seed: number; s?: number }) {
  const back = at(x, y, [[-4, 0], [-4, -62], [26, -58], [26, 0]], s);
  const front = at(x, y, [[-4, 0], [-4, -62], [-30, -56], [-30, 4]], s);
  return (
    <g>
      <Paper pts={back} seed={seed} />
      <InkLine pts={sharp(back)} seed={seed + 1} closed width={1.1} />
      <Paper pts={front} seed={seed + 2} />
      <Wash pts={front} seed={seed + 3} fill={SK.blush} opacity={0.5} dx={0} dy={0} />
      <InkLine pts={sharp(front)} seed={seed + 4} closed width={1.1} />
      <Heart x={r2(x - 17 * s)} y={r2(y - 30 * s)} s={r2(0.7 * s)} seed={seed + 5} />
    </g>
  );
}

/** A can; (x, y) is the middle of its base. `label` colours the band. */
function Can({ x, y, w = 34, h = 50, label = SK.camel, seed, bolt = false }: { x: number; y: number; w?: number; h?: number; label?: string; seed: number; bolt?: boolean }) {
  const top = y - h;
  const hw = w / 2;
  const body = at(x, 0, [[-hw, top + 3], [-hw, y - 3], [-hw * 0.5, y + 1], [hw * 0.5, y + 1], [hw, y - 3], [hw, top + 3]]);
  const lid = rp(blobPts(x, top + 3, hw, 4, seed, 12, 0.02));
  const band = at(x, 0, [[-hw, top + h * 0.2], [hw, top + h * 0.2], [hw, top + h * 0.84], [-hw, top + h * 0.84]]);
  const rim = (yy: number, k: number) => (
    <InkLine pts={at(x, 0, [[-hw, yy], [-hw * 0.5, yy + 2.5], [hw * 0.5, yy + 2.5], [hw, yy]])} seed={seed + k} width={0.8} />
  );
  return (
    <g>
      <Paper pts={[...body]} seed={seed + 9} />
      <Wash pts={band} seed={seed + 1} fill={label} opacity={0.9} />
      <InkLine pts={body} seed={seed + 2} width={1.2} />
      <InkLine pts={lid} seed={seed + 3} closed width={1} />
      {rim(top + 9, 6)}
      {rim(y - 8, 7)}
      {bolt ? (
        <g>
          <Wash pts={at(x, top + h * 0.52, [[2, -10], [-5, 1], [0, 1], [-3, 10], [6, -2], [1, -2], [4, -10]], w / 22)} seed={seed + 4} fill={SK.ochre} opacity={0.95} dx={0} dy={0} />
          <InkLine pts={sharp(at(x, top + h * 0.52, [[2, -10], [-5, 1], [0, 1], [-3, 10], [6, -2], [1, -2], [4, -10]], w / 22))} seed={seed + 5} closed width={0.8} />
        </g>
      ) : (
        <Paper pts={rp(blobPts(x, top + h * 0.52, hw * 0.55, h * 0.13, seed + 4, 10, 0.05))} seed={seed + 5} />
      )}
    </g>
  );
}

/** Sincerity: down-to-earth and cheerful, with a greeting card and a soup can. */
export function Sincerity() {
  const { w, h, gy, ph, px } = DIM;
  return (
    <SketchFrame
      id="sk-sincerity"
      width={w}
      height={h}
      label="The brand as a person, wearing the brand badge: a warm, cheerful figure in a cosy camel cardigan, waving hello. Beside them stand a greeting card with a heart and a can of soup."
    >
      <Backwash cx={204} cy={112} rx={190} ry={98} seed={2801} />
      <Ground x0={20} x1={384} y={gy} seed={2804} />
      <BrandPerson x={px} y={gy} h={ph} look={{ hair: "curly", hairTone: SK.tan, skin: SK.skin, wear: SK.camel, legs: SK.tan }} arms={["hip", "wave"]} seed={2810} />
      <GreetingCard x={218} y={gy} s={1.45} seed={2850} />
      <Can x={320} y={gy} w={52} h={76} label={SK.blush} seed={2860} />
    </SketchFrame>
  );
}

/** A smartphone standing on (x, y). */
function Phone({ x, y, s = 1, seed }: { x: number; y: number; s?: number; seed: number }) {
  const body = sharp(at(x, y, [[-20, 0], [-20, -78], [20, -78], [20, 0]], s), true, 4);
  const screen = at(x, y, [[-15, -8], [-15, -70], [15, -70], [15, -8]], s);
  return (
    <g>
      <Wash pts={body} seed={seed} fill={SK.charcoal} opacity={0.65} />
      <Wash pts={screen} seed={seed + 1} fill={SK.sky} opacity={0.85} dx={0} dy={0} />
      <InkLine pts={body} seed={seed + 2} closed />
      <InkLine pts={sharp(screen)} seed={seed + 3} closed width={0.8} />
      <InkLine pts={at(x, y, [[-4, -74], [4, -74]], s)} seed={seed + 4} width={1.1} />
    </g>
  );
}

/** Excitement: daring and spirited, with a phone and an energy drink. */
export function Excitement() {
  const { w, h, gy, ph, px } = DIM;
  return (
    <SketchFrame
      id="sk-excitement"
      width={w}
      height={h}
      label="The brand as a person, wearing the brand badge: a spirited figure in a dark jacket and jeans, both arms flung up in excitement. Beside them stand a sleek smartphone and a can of energy drink marked with a lightning bolt."
    >
      <Backwash cx={204} cy={112} rx={190} ry={98} seed={2901} />
      <Ground x0={20} x1={384} y={gy} seed={2904} />
      <BrandPerson x={px} y={gy} h={ph * 0.92} look={{ hair: "short", hairTone: SK.charcoal, skin: SK.tan, skinOpacity: 0.5, wear: SK.charcoal, legs: SK.sky, outfit: "jacket" }} arms={["up", "up"]} seed={2910} />
      <Phone x={214} y={gy} s={1.05} seed={2950} />
      <Can x={310} y={gy} w={40} h={86} label={SK.sky} bolt seed={2960} />
    </SketchFrame>
  );
}

/** A briefcase hanging from a hand at (x, y). */
function Briefcase({ x, y, w = 34, seed }: { x: number; y: number; w?: number; seed: number }) {
  const t = y + 6;
  const body = sharp(rp([[x - w / 2, t], [x + w / 2, t], [x + w / 2, t + w * 0.72], [x - w / 2, t + w * 0.72]]), true, 2);
  return (
    <g>
      <InkLine pts={rp([[x - 6, t], [x - 5, y - 1], [x + 5, y - 1], [x + 6, t]])} seed={seed} width={1.1} />
      <Wash pts={body} seed={seed + 1} fill={SK.leather} opacity={0.7} />
      <InkLine pts={body} seed={seed + 2} closed />
      <InkLine pts={rp([[x - w / 2, t + w * 0.28], [x + w / 2, t + w * 0.28]])} seed={seed + 3} width={0.8} />
    </g>
  );
}

/** A laptop showing a search box; (x, y) is the middle of its base. */
function Laptop({ x, y, s = 1, seed }: { x: number; y: number; s?: number; seed: number }) {
  const lid = sharp(at(x, y, [[-32, -8], [-30, -58], [30, -58], [32, -8]], s));
  const base = sharp(at(x, y, [[-40, 0], [-32, -8], [32, -8], [40, 0]], s));
  const search = sharp(at(x, y, [[-20, -38], [20, -38], [20, -28], [-20, -28]], s));
  return (
    <g>
      <Wash pts={lid} seed={seed} fill={SK.sky} opacity={0.6} />
      <Wash pts={base} seed={seed + 1} fill={SK.charcoal} opacity={0.5} dx={0.5} dy={0.5} />
      <InkLine pts={lid} seed={seed + 2} closed />
      <InkLine pts={base} seed={seed + 3} closed width={1.1} />
      <Paper pts={search} seed={seed + 4} />
      <InkLine pts={search} seed={seed + 5} closed width={0.9} />
      <InkLine pts={rp(blobPts(x + 14 * s, y - 33 * s, 2.6 * s, 2.6 * s, seed + 6, 8, 0.05))} seed={seed + 6} closed width={0.8} />
    </g>
  );
}

/** Competence: reliable and successful, with a sturdy car and a search engine. */
export function Competence() {
  const { w, h, gy, ph, px } = DIM;
  const [hx, hy] = handAt(px, gy, ph, "hold");
  return (
    <SketchFrame
      id="sk-competence"
      width={w}
      height={h}
      label="The brand as a person, wearing the brand badge: a composed figure in a dark suit, carrying a briefcase. Beside them stand a laptop showing a search box and a solid family car."
    >
      <Backwash cx={204} cy={112} rx={190} ry={98} seed={3001} />
      <Ground x0={20} x1={384} y={gy} seed={3004} />
      <BrandPerson x={px} y={gy} h={ph} look={{ hair: "short", hairTone: SK.brown, skin: SK.skin, wear: SK.charcoal, legs: SK.charcoal, outfit: "jacket" }} arms={["hip", "hold"]} seed={3010} />
      <Briefcase x={hx} y={hy} seed={3050} />
      <Laptop x={186} y={gy} s={0.82} seed={3060} />
      <Car x={306} y={gy} s={1} fill={SK.sky} seed={3070} />
    </SketchFrame>
  );
}

/** A perfume bottle standing on (x, y). */
function Perfume({ x, y, s = 1, seed }: { x: number; y: number; s?: number; seed: number }) {
  const glass = sharp(at(x, y, [[-22, 0], [-22, -40], [22, -40], [22, 0]], s), true, 3);
  const neck = sharp(at(x, y, [[-6, -40], [-6, -48], [6, -48], [6, -40]], s));
  const cap = sharp(at(x, y, [[-11, -48], [-11, -64], [11, -64], [11, -48]], s));
  const label = sharp(at(x, y, [[-12, -14], [-12, -28], [12, -28], [12, -14]], s));
  return (
    <g>
      <Wash pts={glass} seed={seed} fill={SK.sky} opacity={0.7} />
      <Wash pts={cap} seed={seed + 1} fill={SK.charcoal} opacity={0.75} dx={0.5} dy={0.5} />
      <InkLine pts={glass} seed={seed + 2} closed />
      <InkLine pts={neck} seed={seed + 3} closed width={1} />
      <InkLine pts={cap} seed={seed + 4} closed />
      <Paper pts={label} seed={seed + 5} />
      <InkLine pts={label} seed={seed + 6} closed width={0.8} />
    </g>
  );
}

/** A wristwatch standing upright; (x, y) is the foot of its strap. */
function Watch({ x, y, s = 1, seed }: { x: number; y: number; s?: number; seed: number }) {
  const cy = y - 38 * s;
  const face = rp(blobPts(x, cy, 18 * s, 18 * s, seed, 16, 0.02));
  const inner = rp(blobPts(x, cy, 13 * s, 13 * s, seed + 1, 14, 0.02));
  const top = sharp(at(x, y, [[-10, -54], [-9, -76], [9, -76], [10, -54]], s));
  const bot = sharp(at(x, y, [[-10, -22], [-9, 0], [9, 0], [10, -22]], s));
  return (
    <g>
      <Wash pts={top} seed={seed + 2} fill={SK.leather} opacity={0.7} />
      <Wash pts={bot} seed={seed + 3} fill={SK.leather} opacity={0.7} />
      <InkLine pts={top} seed={seed + 4} closed width={1.1} />
      <InkLine pts={bot} seed={seed + 5} closed width={1.1} />
      <Wash pts={face} seed={seed + 6} fill={SK.ochre} opacity={0.7} dx={1} dy={0.5} />
      <InkLine pts={face} seed={seed + 7} closed />
      <Paper pts={inner} seed={seed + 8} />
      <InkLine pts={inner} seed={seed + 9} closed width={0.8} />
      <InkLine pts={rp([[x, cy], [x, cy - 9 * s]])} seed={seed + 10} width={1.1} />
      <InkLine pts={rp([[x, cy], [x + 6 * s, cy + 3 * s]])} seed={seed + 11} width={1.1} />
    </g>
  );
}

/** Sophistication: elegant and upper-class, with perfume and a fine watch. */
export function Sophistication() {
  const { w, h, gy, ph, px } = DIM;
  return (
    <SketchFrame
      id="sk-sophistication"
      width={w}
      height={h}
      label="The brand as a person, wearing the brand badge: an elegant figure in a long evening gown, hair in a bun, a hand on the hip. Beside them stand a perfume bottle and a fine wristwatch."
    >
      <Backwash cx={204} cy={112} rx={190} ry={98} seed={3101} />
      <Ground x0={20} x1={384} y={gy} seed={3104} />
      <BrandPerson x={px} y={gy} h={ph} look={{ hair: "bun", hairTone: SK.charcoal, skin: SK.camel, skinOpacity: 0.55, wear: SK.charcoal, outfit: "gown" }} arms={["hip", "down"]} seed={3110} />
      <Perfume x={206} y={gy} s={1.2} seed={3150} />
      <Watch x={314} y={gy} s={1.3} seed={3160} />
    </SketchFrame>
  );
}

/** A boxy four-by-four with a spare wheel; (x, y) is the middle of its wheelbase. */
function Jeep({ x, y, s = 1, seed }: { x: number; y: number; s?: number; seed: number }) {
  const body = sharp(at(x, y, [[-52, -12], [-52, -40], [-30, -42], [-24, -66], [30, -66], [32, -42], [50, -40], [52, -12]], s));
  const glass = sharp(at(x, y, [[-20, -44], [-16, -60], [8, -60], [8, -44]], s));
  const glass2 = sharp(at(x, y, [[14, -44], [14, -60], [26, -60], [28, -44]], s));
  return (
    <g>
      <Wash pts={body} seed={seed} fill={SK.camel} opacity={0.65} />
      <Wash pts={glass} seed={seed + 1} fill={SK.sky} opacity={0.8} dx={0.5} dy={0} />
      <Wash pts={glass2} seed={seed + 2} fill={SK.sky} opacity={0.8} dx={0.5} dy={0} />
      <InkLine pts={body} seed={seed + 3} closed />
      <InkLine pts={glass} seed={seed + 4} closed width={0.9} />
      <InkLine pts={glass2} seed={seed + 5} closed width={0.9} />
      {[
        [-32, 13, -13],
        [34, 13, -13],
        [-58, 10, -34],
      ].map(([wx, r, wy], i) => {
        const wheel = rp(blobPts(x + wx * s, y + wy * s, r * s, r * s, seed + 6 + i, 12, 0.05));
        return (
          <g key={i}>
            <Wash pts={wheel} seed={seed + 10 + i} fill={SK.charcoal} opacity={0.75} dx={0.5} dy={0.5} />
            <InkLine pts={wheel} seed={seed + 14 + i} closed width={1.2} />
          </g>
        );
      })}
    </g>
  );
}

/** A small ridge tent; (x, y) is the middle of its base. */
function Tent({ x, y, s = 1, seed }: { x: number; y: number; s?: number; seed: number }) {
  const shell = sharp(at(x, y, [[-44, 0], [0, -56], [44, 0]], s));
  const door = at(x, y, [[-12, 0], [0, -34], [12, 0]], s);
  return (
    <g>
      <Wash pts={shell} seed={seed} fill={SK.tan} opacity={0.6} />
      <Wash pts={door} seed={seed + 1} fill={SK.charcoal} opacity={0.55} dx={0} dy={0} />
      <InkLine pts={shell} seed={seed + 2} closed />
      <InkLine pts={door} seed={seed + 3} width={1} />
      <InkLine pts={at(x, y, [[0, -56], [2, -64]], s)} seed={seed + 4} width={1.2} />
    </g>
  );
}

/** Ruggedness: outdoorsy and tough, with a four-by-four and a tent. */
export function Ruggedness() {
  const { w, h, gy, ph, px } = DIM;
  const sc = ph / 200;
  const pack = at(px, gy, [[-36, -160], [-14, -166], [-12, -106], [-38, -110]], sc);
  return (
    <SketchFrame
      id="sk-ruggedness"
      width={w}
      height={h}
      label="The brand as a person, wearing the brand badge: a hiker in a padded jacket and cargo trousers, with a backpack. Beside them stand a small tent and a boxy four-by-four with a spare wheel."
    >
      <Backwash cx={204} cy={112} rx={190} ry={98} seed={3201} />
      <Ground x0={20} x1={384} y={gy} seed={3204} />
      <Wash pts={pack} seed={3206} fill={SK.leather} opacity={0.7} />
      <InkLine pts={sharp(pack)} seed={3207} closed />
      <BrandPerson x={px} y={gy} h={ph} look={{ hair: "short", hairTone: SK.brown, skin: SK.tan, skinOpacity: 0.55, wear: SK.camel, legs: SK.earth, outfit: "jacket" }} arms={["down", "down"]} seed={3210} />
      {/* the backpack strap over the near shoulder */}
      <InkLine pts={at(px, gy, [[-6, -168], [-1, -150], [2, -126]], sc)} seed={3208} width={1.6} />
      <Tent x={206} y={gy} s={1.05} seed={3250} />
      <Jeep x={318} y={gy} s={0.92} seed={3260} />
    </SketchFrame>
  );
}

/* ==========================================================================
   ANTHROPOMORPHISM AND BRAND RELATIONSHIPS
   ========================================================================== */

/** A person sees a face in the front of a car. */
export function FaceInObject() {
  const gy = 246;
  const cx = 262;
  const body = sharp(at(cx, gy, [[-92, -26], [-92, -96], [-70, -104], [70, -104], [92, -96], [92, -26]]), true, 6);
  const glass = sharp(at(cx, gy, [[-66, -104], [-50, -160], [50, -160], [66, -104]]), true, 4);
  const grille = sharp(at(cx, gy, [[-34, -54], [34, -54], [34, -44], [-34, -44]]), true, 3);
  const lamp = (dx: number, sd: number) => rp(blobPts(cx + dx, gy - 74, 17, 15, sd, 12, 0.04));
  return (
    <SketchFrame
      id="sk-face-in-object"
      width={400}
      height={268}
      label="A person looks at the front of a car. Its headlights read as eyes and its grille as a smile; the face they see, with brows and pupils, is sketched over the car in faint pencil."
    >
      <Backwash cx={214} cy={140} rx={190} ry={120} seed={3301} />
      <Ground x0={20} x1={384} y={gy} seed={3304} />
      <Person x={64} y={gy} h={186} look={{ hair: "long", hairTone: SK.charcoal, skin: SK.camel, skinOpacity: 0.5, wear: SK.sky, legs: SK.charcoal }} arms={["hip", "down"]} seed={3310} />
      {/* the car, head on */}
      {[-62, 62].map((dx, i) => {
        const tyre = sharp(at(cx, gy, [[dx - 14, -30], [dx + 14, -30], [dx + 14, -2], [dx - 14, -2]]), true, 4);
        return (
          <g key={dx}>
            <Wash pts={tyre} seed={3340 + i} fill={SK.charcoal} opacity={0.75} dx={0.5} dy={0.5} />
            <InkLine pts={tyre} seed={3342 + i} closed width={1.1} />
          </g>
        );
      })}
      <Wash pts={body} seed={3350} fill={SK.camel} opacity={0.6} />
      <Wash pts={glass} seed={3351} fill={SK.sky} opacity={0.75} />
      <InkLine pts={body} seed={3352} closed />
      <InkLine pts={glass} seed={3353} closed />
      {[-52, 52].map((dx, i) => (
        <g key={dx}>
          <Paper pts={lamp(dx, 3360 + i)} seed={3362 + i} />
          <InkLine pts={lamp(dx, 3360 + i)} seed={3364 + i} closed />
        </g>
      ))}
      <Wash pts={grille} seed={3369} fill={SK.charcoal} opacity={0.5} dx={0.5} dy={0.5} />
      <InkLine pts={grille} seed={3370} closed width={1.1} />
      <InkLine pts={at(cx, gy, [[-92, -32], [92, -32]])} seed={3371} width={1} />

      {/* the face the viewer reads into it: still pencil */}
      <PencilLine pts={at(cx, gy, [[-64, -112], [-50, -122], [-34, -116]])} seed={3380} width={1.3} />
      <PencilLine pts={at(cx, gy, [[34, -116], [50, -122], [64, -112]])} seed={3381} width={1.3} />
      <PencilLine pts={rp(blobPts(cx - 48, gy - 72, 6, 6, 3382, 8, 0.05))} seed={3382} closed width={1.2} dash="3 3" />
      <PencilLine pts={rp(blobPts(cx + 56, gy - 72, 6, 6, 3383, 8, 0.05))} seed={3383} closed width={1.2} dash="3 3" />
      <PencilLine pts={at(cx, gy, [[-50, -58], [-30, -38], [0, -34], [30, -38], [50, -58]])} seed={3384} width={1.3} />
    </SketchFrame>
  );
}

/** A round candy mascot wearing the brand badge, waving; a shopper waves back. */
export function Mascot() {
  const gy = 246;
  const mx = 272;
  const my = 146;
  const body = rp(blobPts(mx, my, 52, 46, 3401, 16, 0.04));
  const glove = (x: number, y: number, sd: number) => rp(blobPts(x, y, 8, 7.5, sd, 9, 0.12));
  return (
    <SketchFrame
      id="sk-mascot"
      width={400}
      height={268}
      label="A round candy mascot with a face, arms, legs and white gloves, wearing the brand badge, waves cheerfully. A shopper waves back at it."
    >
      <Backwash cx={210} cy={140} rx={190} ry={120} seed={3400} />
      <Ground x0={20} x1={384} y={gy} seed={3402} />
      <Person x={70} y={gy} h={180} look={{ hair: "bun", hairTone: SK.brown, skin: SK.skin, wear: SK.leather, legs: SK.charcoal, outfit: "dress" }} arms={["hip", "wave"]} seed={3410} />

      {/* legs and shoes */}
      <InkLine pts={[[mx - 18, my + 44], [mx - 22, gy - 8]]} seed={3450} width={1.6} />
      <InkLine pts={[[mx + 18, my + 44], [mx + 22, gy - 8]]} seed={3451} width={1.6} />
      {[
        [mx - 32, mx - 14],
        [mx + 16, mx + 34],
      ].map(([a, b], i) => {
        const shoe = rp([[a, gy], [a + 2, gy - 9], [b - 2, gy - 9], [b, gy]]);
        return (
          <g key={i}>
            <Wash pts={shoe} seed={3452 + i} fill={SK.leather} opacity={0.8} dx={0.5} dy={0} />
            <InkLine pts={shoe} seed={3454 + i} closed width={1.1} />
          </g>
        );
      })}
      {/* arms: one down, one waving */}
      <InkLine pts={[[mx - 50, my + 6], [mx - 68, my + 30], [mx - 72, my + 44]]} seed={3460} width={1.6} />
      <InkLine pts={[[mx + 48, my - 12], [mx + 66, my - 34], [mx + 70, my - 56]]} seed={3461} width={1.6} />
      {/* the candy body */}
      <Wash pts={body} seed={3470} fill={SK.sky} opacity={0.8} />
      <InkLine pts={body} seed={3471} closed />
      <Paper pts={glove(mx - 72, my + 50, 3472)} seed={3473} />
      <InkLine pts={glove(mx - 72, my + 50, 3472)} seed={3474} closed width={1.1} />
      <Paper pts={glove(mx + 71, my - 63, 3475)} seed={3476} />
      <InkLine pts={glove(mx + 71, my - 63, 3475)} seed={3477} closed width={1.1} />
      {/* face */}
      {[-14, 14].map((dx, i) => (
        <g key={dx}>
          <Paper pts={rp(blobPts(mx + dx, my - 14, 7, 9, 3480 + i, 10, 0.05))} seed={3482 + i} />
          <InkLine pts={rp(blobPts(mx + dx, my - 14, 7, 9, 3480 + i, 10, 0.05))} seed={3484 + i} closed width={1} />
          <InkLine pts={rp(blobPts(mx + dx + 2, my - 12, 2.4, 3, 3486 + i, 7, 0.05))} seed={3488 + i} closed width={2} />
        </g>
      ))}
      <InkLine pts={[[mx - 18, my + 6], [mx - 8, my + 14], [mx + 8, my + 14], [mx + 18, my + 6]]} seed={3490} width={1.3} />
      <BrandBadge x={mx} y={my + 30} r={9} seed={3492} />
    </SketchFrame>
  );
}

/** A hand-drawn arrow from a to b, head at b. */
function Arrow({ a, b, seed, width = 1.4 }: { a: Pt; b: Pt; seed: number; width?: number }) {
  const ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
  const hd = (da: number): Pt => [r2(b[0] - Math.cos(ang + da) * 11), r2(b[1] - Math.sin(ang + da) * 11)];
  return (
    <g>
      <InkLine pts={rp([a, b])} seed={seed} width={width} />
      <InkLine pts={[hd(0.45), rp([b])[0], hd(-0.45)]} seed={seed + 1} width={width} amp={0.3} />
    </g>
  );
}

/** A loyalty stamp card; (x, y) is its top-left corner. */
function StampCard({ x, y, seed }: { x: number; y: number; seed: number }) {
  const card = sharp(rp([[x, y], [x + 70, y], [x + 70, y + 42], [x, y + 42]]), true, 2);
  return (
    <g>
      <Paper pts={card} seed={seed} />
      <InkLine pts={card} seed={seed + 1} closed width={1.1} />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const cx = x + 13 + (i % 3) * 22;
        const cy = y + 13 + Math.floor(i / 3) * 16;
        const pts = rp(blobPts(cx, cy, 6, 6, seed + 2 + i, 8, 0.08));
        return (
          <g key={i}>
            {i < 5 ? <Wash pts={pts} seed={seed + 10 + i} fill={SK.ochre} opacity={0.85} dx={0.5} dy={0.5} /> : null}
            <InkLine pts={pts} seed={seed + 20 + i} closed width={0.8} />
          </g>
        );
      })}
    </g>
  );
}

/** Loyalty turns into a relationship once the brand is seen as a partner. */
export function BrandPartner() {
  const gy = 300;
  const ph = 196;
  const [cx, cy] = handAt(118, gy, ph, "reach");
  return (
    <SketchFrame
      id="sk-brand-partner"
      width={800}
      height={336}
      label="Left, labelled brand loyalty: a shopper holds up a loyalty card with five of six stamps, with three branded bags from repeat purchases at their feet. An arrow leads right, labelled emotional relationship: the same shopper holds hands with the brand as a person, who wears the brand badge, and a heart floats between them."
    >
      <Backwash cx={400} cy={170} rx={390} ry={160} seed={3501} />
      <Ground x0={20} x1={340} y={gy} seed={3504} />
      <Ground x0={460} x1={780} y={gy} seed={3508} />

      {/* brand loyalty: repeat purchases and a stamp card */}
      <Person x={118} y={gy} h={ph} look={SHOPPER} arms={["hip", "reach"]} seed={3510} />
      <StampCard x={r2(cx - 4)} y={r2(cy - 40)} seed={3550} />
      {[206, 246, 286].map((bx, i) => (
        <Bag key={bx} x={bx} y={gy - 44} w={34} seed={3580 + i * 8} />
      ))}
      <SketchText x={180} y={330} anchor="middle" size={12}>
        BRAND LOYALTY
      </SketchText>

      <Arrow a={[352, 170]} b={[444, 170]} seed={3600} />

      {/* the relationship: hand in hand with the brand as a person */}
      <Person x={570} y={gy} h={ph} look={SHOPPER} arms={["hip", "hold"]} seed={3610} />
      <BrandPerson x={620} y={gy} h={ph} look={BRAND_LOOK} arms={["hold", "hip"]} seed={3650} />
      <Heart x={596} y={62} s={1.8} seed={3700} />
      <SketchText x={614} y={330} anchor="middle" size={12}>
        EMOTIONAL RELATIONSHIP
      </SketchText>
    </SketchFrame>
  );
}

/** A product box with a crack through it; (x, bottom) is its base. */
function CrackedBox({ x, bottom, w = 48, h = 58, seed, pencil = false, badge = true, fill = SK.camel }: { x: number; bottom: number; w?: number; h?: number; seed: number; pencil?: boolean; badge?: boolean; fill?: string }) {
  return (
    <g>
      <Box x={x} bottom={bottom} w={w} h={h} mark={badge ? "brand" : "none"} pencil={pencil} seed={seed} fill={fill} />
      <Ln
        pencil={pencil}
        pts={rp(
          badge
            ? [[x - w * 0.5, bottom - h * 0.78], [x - w * 0.34, bottom - h * 0.66], [x - w * 0.42, bottom - h * 0.48], [x - w * 0.3, bottom - h * 0.34], [x - w * 0.38, bottom - h * 0.12]]
            : [[x - w * 0.08, bottom - h], [x + w * 0.1, bottom - h * 0.74], [x - w * 0.1, bottom - h * 0.52], [x + w * 0.08, bottom - h * 0.28], [x - w * 0.04, bottom]],
        )}
        seed={seed + 8}
        width={1.4}
      />
    </g>
  );
}

/** A plain product failing earns a shrug; a brand seen as a person failing, a broken heart. */
export function Betrayal() {
  const gy = 292;
  const ph = 196;
  const [bx, by] = handAt(664, gy, ph, "carry", 1, true);
  return (
    <SketchFrame
      id="sk-betrayal"
      width={800}
      height={330}
      label="Left, labelled simple dissatisfaction: a shopper shrugs mildly beside a plain, faceless product box with a crack in it. Right, labelled personal betrayal: the brand as a person, wearing the brand badge, holds out a cracked box, and the shopper facing it clutches their chest under a broken heart."
    >
      <Backwash cx={180} cy={176} rx={170} ry={130} seed={3802} fill={SK.earth} opacity={0.2} />
      <Backwash cx={590} cy={166} rx={210} ry={150} seed={3801} />
      <Ground x0={20} x1={330} y={gy} seed={3804} />
      <Ground x0={420} x1={780} y={gy} seed={3808} />

      {/* a plain, faceless product fails: a mild shrug */}
      <Person x={118} y={gy} h={ph} look={SHOPPER} arms={["shrug", "shrug"]} seed={3810} />
      <CrackedBox x={236} bottom={gy} w={54} h={64} seed={3830} badge={false} fill={SK.sky} />
      <SketchText x={176} y={322} anchor="middle" size={12}>
        SIMPLE DISSATISFACTION
      </SketchText>

      {/* the brand as a person fails: a broken heart */}
      <Person x={520} y={gy} h={ph} look={SHOPPER} arms={["hip", "hug"]} seed={3850} />
      <Heart x={520} y={58} s={1.8} broken seed={3890} />
      <BrandPerson x={664} y={gy} h={ph} look={BRAND_LOOK} arms={["across", "carry"]} flip seed={3900} />
      <CrackedBox x={r2(bx - 10)} bottom={r2(by + 8)} w={40} h={48} seed={3960} />
      <SketchText x={592} y={322} anchor="middle" size={12}>
        PERSONAL BETRAYAL
      </SketchText>
    </SketchFrame>
  );
}

/* ==========================================================================
   PSYCHOGRAPHICS AND LIFESTYLES: MEASURING AIOS
   ========================================================================== */

/** A mountain with a snow line; (x, y) is the middle of its base. */
function Mountain({ x, y, s = 1, seed }: { x: number; y: number; s?: number; seed: number }) {
  const back = sharp(at(x, y, [[-10, 0], [30, -52], [70, 0]], s));
  const front = sharp(at(x, y, [[-62, 0], [-10, -70], [42, 0]], s));
  return (
    <g>
      <Wash pts={back} seed={seed} fill={SK.earth} opacity={0.7} />
      <InkLine pts={back} seed={seed + 1} width={1.1} />
      <Wash pts={front} seed={seed + 2} fill={SK.tan} opacity={0.55} />
      <InkLine pts={front} seed={seed + 3} />
      <InkLine pts={at(x, y, [[-24, -52], [-17, -46], [-10, -52], [-3, -46], [4, -52]], s)} seed={seed + 4} width={0.9} />
    </g>
  );
}

/** The same buyer, seen as data and seen as motives. */
export function WhoWhy() {
  const gy = 300;
  const ph = 200;
  const [lx, ly] = handAt(96, gy, ph, "hold");
  const [rx, ry] = handAt(500, gy, ph, "hold");
  const card: Pt[] = [[170, 96], [330, 96], [330, 196], [170, 196]];
  const cloud = cloudPts(664, 118, 104, 76, 14);
  return (
    <SketchFrame
      id="sk-who-why"
      width={800}
      height={336}
      label="Left, labelled demographics: a shopper with a shopping bag beside a data card reading age 34, income $58K, city Boston. Right, labelled psychographics: the same shopper with the same bag, thinking of a mountain and a heart, a love of the outdoors."
    >
      <Backwash cx={400} cy={170} rx={390} ry={160} seed={3901} />
      <Ground x0={20} x1={360} y={gy} seed={3904} />
      <Ground x0={440} x1={780} y={gy} seed={3908} />

      {/* demographics: who buys */}
      <Person x={96} y={gy} h={ph} look={SHOPPER} arms={["hip", "hold"]} seed={3910} />
      <Bag x={lx} y={ly} w={34} seed={3950} />
      <Paper pts={card} seed={3960} />
      <InkLine pts={sharp(card)} seed={3961} closed />
      {["AGE 34", "INCOME $58K", "CITY BOSTON"].map((t, i) => (
        <SketchText key={t} x={188} y={130 + i * 26} size={13}>
          {t}
        </SketchText>
      ))}
      <SketchText x={190} y={328} anchor="middle" size={12}>
        DEMOGRAPHICS
      </SketchText>

      {/* psychographics: why they buy */}
      <Person x={500} y={gy} h={ph} look={SHOPPER} arms={["hip", "hold"]} seed={3970} />
      <Bag x={rx} y={ry} w={34} seed={4010} />
      {[
        [528, 94, 4.5],
        [546, 104, 7],
      ].map(([bx, by, br], i) => {
        const pts = rp(blobPts(bx, by, br, br * 0.9, 4020 + i, 10, 0.1));
        return (
          <g key={i}>
            <Paper pts={pts} seed={4022 + i} />
            <InkLine pts={pts} seed={4024 + i} closed width={1.1} />
          </g>
        );
      })}
      <Paper pts={cloud} seed={4030} />
      <InkLine pts={cloud} seed={4031} closed amp={0.5} />
      <Mountain x={654} y={160} s={1.05} seed={4040} />
      <Heart x={712} y={82} s={1.2} seed={4050} />
      <SketchText x={610} y={328} anchor="middle" size={12}>
        PSYCHOGRAPHICS
      </SketchText>
    </SketchFrame>
  );
}

/* The three AIO plates are paper objects on one canvas size. */
const AIO = { w: 400, h: 340 };

/** A guitar centred on (x, y), neck up and to the right; `pencil` draws its ghost. */
function Guitar({ x, y, s = 1, seed, pencil = false }: { x: number; y: number; s?: number; seed: number; pencil?: boolean }) {
  const lower = rp(blobPts(x - 4 * s, y + 7 * s, 12 * s, 11 * s, seed, 12, 0.04));
  const upper = rp(blobPts(x + 5 * s, y - 5 * s, 9 * s, 8.5 * s, seed + 1, 12, 0.04));
  return (
    <g>
      <Ln pencil={pencil} pts={at(x, y, [[4, -6], [22, -24]], s)} seed={seed + 2} width={2.2} />
      <Paper pts={lower} seed={seed + 9} />
      <Paper pts={upper} seed={seed + 10} />
      <Tone pencil={pencil} pts={lower} seed={seed + 3} fill={SK.camel} opacity={0.75} />
      <Tone pencil={pencil} pts={upper} seed={seed + 4} fill={SK.camel} opacity={0.75} />
      <Ln pencil={pencil} pts={lower} seed={seed + 5} closed width={1.1} />
      <Ln pencil={pencil} pts={upper} seed={seed + 6} closed width={1.1} />
      <Ln pencil={pencil} pts={rp(blobPts(x, y + 1 * s, 3 * s, 3 * s, seed + 7, 8, 0.05))} seed={seed + 7} closed width={1} />
      <Ln pencil={pencil} pts={at(x, y, [[20, -27], [26, -21]], s)} seed={seed + 8} width={2.6} />
    </g>
  );
}

/** Two wine glasses tilted together in a toast; (x, y) is where the rims meet. */
function Cheers({ x, y, s = 1, seed }: { x: number; y: number; s?: number; seed: number }) {
  const glass = (side: 1 | -1, k: number) => {
    // one upright glass in local units (rim at y 0, foot at y 34), then tilted in
    const a = side * 0.3;
    const rot = (pts: Pt[]): Pt[] =>
      rp(
        pts.map(([px, py]) => {
          const qx = px * Math.cos(a) - py * Math.sin(a);
          const qy = px * Math.sin(a) + py * Math.cos(a);
          return [x + (qx + side * 13) * s, y + qy * s] as Pt;
        }),
      );
    const bowl = rot([[-9, 0], [9, 0], [8, 9], [3, 15], [-3, 15], [-8, 9]]);
    const wine = rot([[-8.4, 6], [8.4, 6], [8, 9], [3, 14], [-3, 14], [-8, 9]]);
    return (
      <g key={k}>
        <Wash pts={wine} seed={seed + k * 5} fill={SK.leather} opacity={0.7} dx={0} dy={0} />
        <InkLine pts={bowl} seed={seed + k * 5 + 1} closed width={1.1} />
        <InkLine pts={rot([[0, 15], [0, 30]])} seed={seed + k * 5 + 2} width={1.1} />
        <InkLine pts={rot([[-7, 31], [7, 31]])} seed={seed + k * 5 + 3} width={1.1} />
      </g>
    );
  };
  return <g>{[glass(-1, 0), glass(1, 1)]}</g>;
}

/** An upright suitcase with a tag; (x, y) is the middle of its base. */
function Suitcase({ x, y, s = 1, seed }: { x: number; y: number; s?: number; seed: number }) {
  const body = sharp(at(x, y, [[-14, -4], [-14, -38], [14, -38], [14, -4]], s), true, 2.5);
  return (
    <g>
      <InkLine pts={at(x, y, [[-6, -38], [-6, -48], [6, -48], [6, -38]], s)} seed={seed} width={1.1} />
      <Wash pts={body} seed={seed + 1} fill={SK.sky} opacity={0.6} />
      <InkLine pts={body} seed={seed + 2} closed />
      <InkLine pts={at(x, y, [[-5, -34], [-5, -8]], s)} seed={seed + 3} width={0.8} />
      <InkLine pts={at(x, y, [[5, -34], [5, -8]], s)} seed={seed + 4} width={0.8} />
      <Paper pts={sharp(at(x, y, [[14, -30], [24, -26], [22, -18], [13, -22]], s))} seed={seed + 5} />
      <InkLine pts={sharp(at(x, y, [[14, -30], [24, -26], [22, -18], [13, -22]], s))} seed={seed + 6} closed width={0.8} />
      <InkLine pts={rp(blobPts(x - 8 * s, y - 1 * s, 2.4 * s, 2.4 * s, seed + 7, 8, 0.05))} seed={seed + 7} closed width={1} />
      <InkLine pts={rp(blobPts(x + 8 * s, y - 1 * s, 2.4 * s, 2.4 * s, seed + 8, 8, 0.05))} seed={seed + 8} closed width={1} />
    </g>
  );
}

/** A striped box of popcorn; (x, y) is the middle of its base. */
function Popcorn({ x, y, s = 1, seed }: { x: number; y: number; s?: number; seed: number }) {
  const box = sharp(at(x, y, [[-15, -34], [15, -34], [11, 0], [-11, 0]], s));
  return (
    <g>
      {[-10, -2, 7].map((dx, i) => (
        <g key={dx}>
          <Paper pts={rp(blobPts(x + dx * s, y - 36 * s - (i === 1 ? 4 : 0) * s, 7 * s, 6 * s, seed + i, 9, 0.2))} seed={seed + 3 + i} />
          <InkLine pts={rp(blobPts(x + dx * s, y - 36 * s - (i === 1 ? 4 : 0) * s, 7 * s, 6 * s, seed + i, 9, 0.2))} seed={seed + 6 + i} closed width={0.9} />
        </g>
      ))}
      <Paper pts={box} seed={seed + 9} />
      {[-7, 5].map((dx, i) => (
        <Wash key={dx} pts={at(x, y, [[dx - 3, -34], [dx + 3, -34], [dx + 2.4, 0], [dx - 2.4, 0]], s)} seed={seed + 10 + i} fill={SK.blush} opacity={0.95} dx={0} dy={0} />
      ))}
      <InkLine pts={box} seed={seed + 12} closed />
    </g>
  );
}

/** Activities: a week planner filled with work, hobbies, social events, a trip and a film. */
export function Activities() {
  const { w, h } = AIO;
  const page: Pt[] = [[92, 22], [308, 22], [308, 322], [92, 322]];
  const rows = [0, 1, 2, 3, 4].map((i) => r2(70 + i * 54));
  return (
    <SketchFrame
      id="sk-activities"
      width={w}
      height={h}
      label="A week planner page. Each entry is drawn: a briefcase for work, a guitar for a hobby, two glasses raised in a toast for a social event, a suitcase with a tag for a vacation, and a box of popcorn for entertainment."
    >
      <Backwash cx={200} cy={172} rx={186} ry={160} seed={4101} />
      <Paper pts={page} seed={4102} />
      <Wash pts={[[92, 22], [308, 22], [308, 44], [92, 44]]} seed={4103} fill={SK.tan} opacity={0.5} dx={0} dy={0} />
      <InkLine pts={sharp(page)} seed={4104} closed />
      <InkLine pts={[[92, 44], [308, 44]]} seed={4105} width={0.9} />
      {rows.slice(1).map((y, i) => (
        <PencilLine key={y} pts={[[104, y - 27], [296, y - 27]]} seed={4110 + i} dash="2 4" />
      ))}
      <Briefcase x={134} y={rows[0] - 16} w={34} seed={4120} />
      <Guitar x={134} y={rows[1] + 2} s={1.05} seed={4130} />
      <Cheers x={134} y={rows[2] - 12} s={1} seed={4140} />
      <Suitcase x={132} y={rows[3] + 23} s={0.9} seed={4150} />
      <Popcorn x={134} y={rows[4] + 22} s={0.9} seed={4160} />
      {rows.map((y, i) => (
        <g key={y}>
          <InkLine pts={rp([[176, y - 5], [i % 2 ? 262 : 280, y - 5]])} seed={4170 + i * 2} width={0.8} amp={0.4} />
          <InkLine pts={rp([[176, y + 6], [i % 2 ? 236 : 222, y + 6]])} seed={4171 + i * 2} width={0.8} amp={0.4} />
        </g>
      ))}
    </SketchFrame>
  );
}

/** Interests: magazines on family, home, job, community, food and fashion. */
export function Interests() {
  const { w, h } = AIO;
  const mw = 98;
  const mh = 132;
  const covers: { t: string; fill: string; art: (cx: number, cy: number, sd: number) => React.ReactNode }[] = [
    { t: "FAMILY", fill: SK.blush, art: (cx, cy, sd) => <Heart x={cx} y={cy} s={1.5} seed={sd} /> },
    { t: "HOME", fill: SK.sky, art: (cx, cy, sd) => <House x={cx} y={cy + 22} s={0.95} seed={sd} /> },
    { t: "JOB", fill: SK.earth, art: (cx, cy, sd) => <Briefcase x={cx} y={cy - 18} w={40} seed={sd} /> },
    { t: "COMMUNITY", fill: SK.sky, art: (cx, cy, sd) => <Skyline x={cx} y={cy + 24} s={0.8} seed={sd} /> },
    { t: "FOOD", fill: SK.earth, art: (cx, cy, sd) => <Can x={cx} y={cy + 24} w={34} h={48} label={SK.blush} seed={sd} /> },
    { t: "FASHION", fill: SK.blush, art: (cx, cy, sd) => <Shirt x={cx} y={cy} s={1.05} seed={sd} /> },
  ];
  return (
    <SketchFrame
      id="sk-interests"
      width={w}
      height={h}
      label="Six magazines, two rows of three, titled family, home, job, community, food and fashion, each with a drawing on its cover: a heart, a house, a briefcase, a town skyline, a can of soup and a shirt."
    >
      <Backwash cx={200} cy={170} rx={190} ry={160} seed={4201} />
      {covers.map((c, i) => {
        const x0 = 40 + (i % 3) * (mw + 12);
        const y0 = 26 + Math.floor(i / 3) * (mh + 18);
        const cover: Pt[] = [[x0, y0], [x0 + mw, y0], [x0 + mw, y0 + mh], [x0, y0 + mh]];
        const art: Pt[] = [[x0 + 8, y0 + 34], [x0 + mw - 8, y0 + 34], [x0 + mw - 8, y0 + mh - 10], [x0 + 8, y0 + mh - 10]];
        const cx = r2(x0 + mw / 2);
        const cy = r2(y0 + 34 + (mh - 44) / 2);
        return (
          <g key={c.t}>
            <Paper pts={cover} seed={4210 + i * 10} />
            <Wash pts={art} seed={4211 + i * 10} fill={c.fill} opacity={0.45} dx={0} dy={0} />
            <InkLine pts={sharp(cover)} seed={4212 + i * 10} closed />
            <SketchText x={cx} y={r2(y0 + 24)} anchor="middle" size={c.t.length > 7 ? 11.5 : 16} serif>
              {c.t}
            </SketchText>
            {c.art(cx, cy, 4300 + i * 20)}
          </g>
        );
      })}
    </SketchFrame>
  );
}

/** Opinions: a survey card rating oneself, social issues, politics, business and products. */
export function Opinions() {
  const { w, h } = AIO;
  const card: Pt[] = [[36, 24], [364, 24], [364, 318], [36, 318]];
  const rows = [
    { t: "ONESELF", pick: 3 },
    { t: "SOCIAL ISSUES", pick: 4 },
    { t: "POLITICS", pick: 1 },
    { t: "BUSINESS", pick: 2 },
    { t: "PRODUCTS", pick: 4 },
  ];
  const col = (k: number) => 226 + k * 29;
  return (
    <SketchFrame
      id="sk-opinions"
      width={w}
      height={h}
      label="A survey card. Five topics, oneself, social issues, politics, business and products, each have a row of five circles from disagree to agree, with one circle marked teal in every row."
    >
      <Backwash cx={200} cy={172} rx={190} ry={160} seed={4401} />
      <Paper pts={card} seed={4402} />
      <InkLine pts={sharp(card)} seed={4403} closed />
      <SketchText x={col(0) - 8} y={62} size={10}>
        DISAGREE
      </SketchText>
      <SketchText x={col(4) + 8} y={62} anchor="end" size={10}>
        AGREE
      </SketchText>
      <InkLine pts={[[52, 76], [348, 76]]} seed={4404} width={0.9} />
      {rows.map((r, i) => {
        const y = 110 + i * 46;
        return (
          <g key={r.t}>
            <SketchText x={56} y={y + 4} size={12}>
              {r.t}
            </SketchText>
            {[0, 1, 2, 3, 4].map((k) => {
              const pts = rp(blobPts(col(k), y, 7.5, 7.5, 4410 + i * 10 + k, 10, 0.08));
              return (
                <g key={k}>
                  {k === r.pick ? <Wash pts={pts} seed={4460 + i * 5 + k} fill={SK.teal} opacity={0.9} dx={0.4} dy={0.3} /> : null}
                  <InkLine pts={pts} seed={4490 + i * 5 + k} closed width={0.9} />
                </g>
              );
            })}
            {i < rows.length - 1 ? <PencilLine pts={[[52, y + 23], [348, y + 23]]} seed={4520 + i} dash="2 4" /> : null}
          </g>
        );
      })}
    </SketchFrame>
  );
}

/* ==========================================================================
   THE VALS SEGMENTATION SYSTEM
   ========================================================================== */

type Seg = { key: string; name: string; look: Look };

const VALS_TOP: Seg = { key: "innovators", name: "INNOVATORS", look: { hair: "bob", hairTone: SK.charcoal, wear: SK.camel, legs: SK.charcoal } };
const VALS_GRID: Seg[][] = [
  [
    { key: "thinkers", name: "THINKERS", look: { hair: "short", hairTone: SK.brown, wear: SK.sky, outfit: "jacket" } },
    { key: "achievers", name: "ACHIEVERS", look: { hair: "bun", hairTone: SK.charcoal, skin: SK.camel, skinOpacity: 0.55, wear: SK.charcoal, outfit: "jacket" } },
    { key: "experiencers", name: "EXPERIENCERS", look: { hair: "curly", hairTone: SK.charcoal, skin: SK.brown, skinOpacity: 0.55, wear: SK.camel, legs: SK.sky } },
  ],
  [
    { key: "believers", name: "BELIEVERS", look: { hair: "long", hairTone: SK.tan, wear: SK.earth, outfit: "dress" } },
    { key: "strivers", name: "STRIVERS", look: { hair: "short", hairTone: SK.charcoal, skin: SK.tan, skinOpacity: 0.5, wear: SK.leather, outfit: "jacket" } },
    { key: "makers", name: "MAKERS", look: { hair: "bob", hairTone: SK.brown, wear: SK.tan, legs: SK.charcoal } },
  ],
];
const VALS_BOTTOM: Seg = { key: "survivors", name: "SURVIVORS", look: { hair: "bun", hairTone: SK.earth, skin: SK.skin, wear: SK.earth, legs: SK.tan, outfit: "dress" } };
const MOTIVES = ["IDEALS", "ACHIEVEMENT", "SELF-EXPRESSION"];

/** The VALS framework: resources from high to low, motivation across. */
export function VALSMap() {
  const gx = 96;
  const gw = 684;
  const cw = (gw - 28) / 3;
  const colX = (c: number) => r2(gx + c * (cw + 14));
  const cell = (x0: number, y0: number, w: number, hh: number, seg: Seg, sd: number) => {
    const box: Pt[] = [[x0, y0], [x0 + w, y0], [x0 + w, y0 + hh], [x0, y0 + hh]];
    return (
      <g key={seg.key}>
        <Paper pts={box} seed={sd} />
        <InkLine pts={sharp(box)} seed={sd + 1} closed width={1.1} />
        <Person x={r2(x0 + 30)} y={r2(y0 + hh - 6)} h={r2(hh - 12)} look={seg.look} arms={["hip", "down"]} seed={sd + 2} face={false} />
        <SketchText x={r2(x0 + 58)} y={r2(y0 + hh / 2 + 5)} size={13}>
          {seg.name}
        </SketchText>
      </g>
    );
  };
  return (
    <SketchFrame
      id="sk-vals-map"
      width={800}
      height={414}
      label="The VALS map of eight consumer segments, each with a small figure. Innovators span the top, where resources are highest; survivors span the bottom, where they are lowest. Between them, three columns by primary motivation: ideals, with thinkers above believers; achievement, with achievers above strivers; and self-expression, with experiencers above makers. An arrow on the left runs from high resources to low resources."
    >
      <Backwash cx={420} cy={206} rx={390} ry={200} seed={4601} />
      {/* resources, high to low */}
      <SketchText x={20} y={24} size={10}>
        HIGH RESOURCES
      </SketchText>
      <SketchText x={20} y={402} size={10}>
        LOW RESOURCES
      </SketchText>
      <Arrow a={[52, 330]} b={[52, 40]} seed={4602} />
      <InkLine pts={[[52, 330], [52, 380]]} seed={4604} width={1.4} />
      <InkLine pts={[[44, 370], [52, 382], [60, 370]]} seed={4605} width={1.4} amp={0.3} />

      {cell(gx, 38, gw, 64, VALS_TOP, 4610)}
      {MOTIVES.map((m, c) => (
        <SketchText key={m} x={r2(colX(c) + cw / 2)} y={128} anchor="middle" size={11}>
          {m}
        </SketchText>
      ))}
      {VALS_GRID.map((row, r) => row.map((seg, c) => cell(colX(c), 140 + r * 80, cw, 66, seg, 4700 + r * 60 + c * 20)))}
      {cell(gx, 310, gw, 64, VALS_BOTTOM, 4900)}
    </SketchFrame>
  );
}

const VALS_KEYS = [
  ["innovators"],
  ["thinkers", "achievers", "experiencers"],
  ["believers", "strivers", "makers"],
  ["survivors"],
];

/** The VALS map in miniature, with the named segments washed teal. */
export function VALSMark({ lit }: { lit: string[] }) {
  const rowsY = [3, 13, 23, 33];
  return (
    <svg viewBox="0 0 62 42" className="h-10 w-[3.75rem] shrink-0" aria-hidden>
      {VALS_KEYS.map((row, r) =>
        row.map((k, c) => {
          const w = row.length === 1 ? 56 : 17.3;
          const x = 3 + c * (17.3 + 2);
          const y = rowsY[r];
          const box: Pt[] = [[x, y], [x + w, y], [x + w, y + 7], [x, y + 7]];
          const on = lit.includes(k);
          return (
            <g key={k}>
              {on ? <path d={wobble(box, 980 + r * 3 + c, 0.5, 6, true)} fill={SK.teal} opacity={0.6} transform="translate(0.8 0.5)" /> : null}
              <path d={wobble(box, 990 + r * 3 + c, 0.35, 6, true)} fill="none" stroke={SK.ink} strokeWidth={0.8} strokeLinejoin="round" />
            </g>
          );
        }),
      )}
    </svg>
  );
}

/* ==========================================================================
   DISCUSSION: YOUR EXTENDED SELF
   ========================================================================== */

/** A treasured possession, then the same person with it taken away. */
export function YourPossession() {
  const gy = 300;
  const ph = 212;
  const look: Look = { hair: "curly", hairTone: SK.brown, skin: SK.camel, skinOpacity: 0.55, wear: SK.sky, legs: SK.charcoal };
  const g = (x: number): [number, number] => [r2(x + 8), r2(gy - 106)];
  return (
    <SketchFrame
      id="sk-your-possession"
      width={800}
      height={326}
      label="Left: a person holds their guitar close. Right: the same person in the same pose with empty arms; the guitar that was taken away is only a faint pencil outline."
    >
      <Backwash cx={218} cy={170} rx={168} ry={146} seed={5001} />
      <Backwash cx={582} cy={170} rx={168} ry={146} seed={5002} fill={SK.sky} opacity={0.4} />
      <Ground x0={80} x1={360} y={gy} seed={5004} />
      <Ground x0={440} x1={720} y={gy} seed={5008} />

      <Person x={220} y={gy} h={ph} look={look} arms={["hug", "hold"]} seed={5010} />
      <Guitar x={g(220)[0]} y={g(220)[1]} s={2.3} seed={5060} />

      <Person x={580} y={gy} h={ph} look={look} arms={["hug", "hold"]} seed={5010} />
      <Guitar x={g(580)[0]} y={g(580)[1]} s={2.3} seed={5060} pencil />
    </SketchFrame>
  );
}
