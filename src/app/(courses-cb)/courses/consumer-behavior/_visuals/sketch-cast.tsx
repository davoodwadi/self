/* ==========================================================================
   Consumer Behavior — the Editorial Sketch cast
   --------------------------------------------------------------------------
   The figures every week draws with, built on ./sketch: the fashion-
   illustration Person (with handAt for props), BrandBadge and BrandPerson,
   Bag, Box and Heart, plus the scene pieces (Backwash, Ground, cloudPts)
   and point helpers (rp, at, sharp). First drawn for Week 5.

   Weeks import from here and from ./sketch, never from another week.
   ========================================================================== */

import React from "react";
import { SK, InkLine, PencilLine, Wash, SketchText, blobPts, seeded, r2, type Pt } from "./sketch";

/* -- the cast (Editorial Sketch) ----------------------------------------- */

/** Round a point list, so every computed coordinate is stable (rule 20). */
export const rp = (pts: Pt[]): Pt[] => pts.map(([x, y]) => [r2(x), r2(y)] as Pt);

/** One background wash behind the subject: a ragged, pale blob. */
export function Backwash({
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
export function Ground({ x0, x1, y, seed }: { x0: number; x1: number; y: number; seed: number }) {
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
export function Ln({
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
export function Tone({
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

export type ArmPose = "down" | "hip" | "hold" | "reach" | "up" | "carry" | "hug" | "point" | "chin" | "low" | "across" | "wave" | "shrug";

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

export type Hair = "bob" | "bun" | "curly" | "short" | "long";
export type Outfit = "coat" | "jacket" | "dress" | "gown";

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

/** A scalloped thought cloud: `n` round bumps set on an ellipse. */
export function cloudPts(cx: number, cy: number, rx: number, ry: number, n = 14): Pt[] {
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

/** Offset a local point list to (x, y) at scale s, rounded. */
export const at = (x: number, y: number, pts: Pt[], s = 1): Pt[] => rp(pts.map(([px, py]) => [x + px * s, y + py * s] as Pt));

/** Add a point just either side of each corner, so the smoothing keeps it crisp. */
export function sharp(pts: Pt[], closed = true, d = 1.5): Pt[] {
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

/** The brand as a person: the week's Person wearing the brand badge on the chest. */
export function BrandPerson(props: React.ComponentProps<typeof Person> & { badgeInk?: boolean }) {
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
