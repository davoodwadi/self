/* ==========================================================================
   Shared objects: the people, products, places and marks drawn on more than
   one week's plates, built on ./kit. Different versions of the same thing
   are numbered (Car1, Car2, ...). See "Shared pieces" in the root CLAUDE.md.
   ========================================================================== */

import React from "react";
import {
  blobPts,
  InkLine,
  Paper,
  PencilLine,
  type Pt,
  r2,
  seeded,
  SK,
  SketchText,
  Wash,
  wobble,
} from "./kit";

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
  headScale = 1,
}: {
  x: number;
  y: number;
  h?: number;
  look?: Look;
  /** Enlarge the head about the chin: about 1.4 for a child, 1.7 for a toddler. */
  headScale?: number;
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
  /** Head, hair and face points, scaled about the chin by `headScale`. */
  const H = (pts: Pt[]): Pt[] => P(pts.map(([px, py]) => [px * headScale, -177 + (py + 177) * headScale] as Pt));
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
      <Tone pencil={pencil} pts={H(head)} seed={seed + 43} fill={skin} opacity={skinOpacity} dx={0.8} dy={0.6} />
      <Ln pencil={pencil} pts={H(head)} seed={seed + 44} width={1.1} closed />
      <Tone pencil={pencil} pts={H(hairPts)} seed={seed + 45} fill={hairTone} opacity={0.72} dx={0.6} dy={0} />
      <Ln pencil={pencil} pts={H(hairPts)} seed={seed + 46} width={0.8} closed />
      {hair === "bun" ? (
        <>
          <Tone pencil={pencil} pts={H(blobPts(-5, -202, 4.8, 4.2, seed + 47, 9))} seed={seed + 47} fill={hairTone} opacity={0.72} dx={0.5} dy={0} />
          <Ln pencil={pencil} pts={H(blobPts(-5, -202, 4.8, 4.2, seed + 48, 9))} seed={seed + 48} width={0.8} closed />
        </>
      ) : null}
      {curls.map((c, i) => (
        <Ln key={i} pencil={pencil} pts={H(blobPts(c[0], c[1], c[2], c[2] * 0.9, seed + 50 + i, 7, 0.3))} seed={seed + 50 + i} width={0.7} closed />
      ))}
      {face ? (
        <g>
          <Ln pencil={pencil} pts={H([[1, -187.5], [3.6, -188]])} seed={seed + 60} width={0.7} />
          <Ln pencil={pencil} pts={H([[6.2, -188], [8, -187.6]])} seed={seed + 61} width={0.7} />
          <Ln pencil={pencil} pts={H([[6, -186], [7.4, -182.2], [5.4, -181.8]])} seed={seed + 62} width={0.6} />
          <Ln pencil={pencil} pts={H([[2.6, -178.8], [5.8, -178.6]])} seed={seed + 63} width={0.7} />
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

/* -- shared objects (first drawn for Week 1) ------------------------------ */

/** Sample a quadratic curve p0 → p1 bent toward c, for arrows and paths. */
export function curvePts(p0: Pt, c: Pt, p1: Pt, n = 12): Pt[] {
  return rp(
    Array.from({ length: n + 1 }, (_, i) => {
      const t = i / n;
      const u = 1 - t;
      return [u * u * p0[0] + 2 * u * t * c[0] + t * t * p1[0], u * u * p0[1] + 2 * u * t * c[1] + t * t * p1[1]] as Pt;
    }),
  );
}

/** A hand-drawn arrow along `pts`, with an open head at the last point. */
export function SketchArrow({
  pts,
  seed,
  width = 1.3,
  head = 9,
  color = SK.ink,
}: {
  pts: Pt[];
  seed: number;
  width?: number;
  head?: number;
  color?: string;
}) {
  const a = pts[pts.length - 2];
  const b = pts[pts.length - 1];
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
  const ux = (b[0] - a[0]) / len;
  const uy = (b[1] - a[1]) / len;
  const wing = (k: number): Pt => [b[0] - ux * head - uy * head * 0.55 * k, b[1] - uy * head + ux * head * 0.55 * k];
  return (
    <g>
      <InkLine pts={rp(pts)} seed={seed} width={width} color={color} />
      <InkLine pts={rp([wing(1), b, wing(-1)])} seed={seed + 1} width={width} amp={0.3} color={color} />
    </g>
  );
}

/** A five-point star; `filled` lays an ochre wash under it (a rating, a best pick). */
export function Star({ x, y, r = 10, seed, filled = true }: { x: number; y: number; r?: number; seed: number; filled?: boolean }) {
  const pts = rp(
    Array.from({ length: 10 }, (_, i) => {
      const a = -Math.PI / 2 + (i * Math.PI) / 5;
      const rr = i % 2 === 0 ? r : r * 0.45;
      return [x + Math.cos(a) * rr, y + Math.sin(a) * rr] as Pt;
    }),
  );
  return (
    <g>
      {filled ? <Wash pts={pts} seed={seed} fill={SK.ochre} opacity={0.85} dx={0.8} dy={0.6} /> : null}
      <InkLine pts={sharp(pts, true, 1)} seed={seed + 1} width={1} amp={0.35} closed />
    </g>
  );
}

/** A row of `of` rating stars, the first `n` filled. (x, y) is the first star. */
export function Stars({ x, y, n, of = 5, r = 10, gap = 26, seed }: { x: number; y: number; n: number; of?: number; r?: number; gap?: number; seed: number }) {
  return (
    <g>
      {Array.from({ length: of }, (_, i) => (
        <Star key={i} x={r2(x + i * gap)} y={y} r={r} seed={seed + i * 3} filled={i < n} />
      ))}
    </g>
  );
}

/** A magnifying glass centred on its lens: sky glass, leather handle. */
export function Magnifier({ x, y, r = 16, seed }: { x: number; y: number; r?: number; seed: number }) {
  const lens = rp(blobPts(x, y, r, r, seed, 16, 0.04));
  const d = r * 0.72;
  const hw = r * 0.2;
  const handle = rp([
    [x + d - hw * 0.7, y + d + hw * 0.7],
    [x + d + hw * 0.7, y + d - hw * 0.7],
    [x + d + r * 0.95 + hw * 0.7, y + d + r * 0.95 - hw * 0.7],
    [x + d + r * 0.95 - hw * 0.7, y + d + r * 0.95 + hw * 0.7],
  ]);
  return (
    <g>
      <Wash pts={lens} seed={seed + 1} fill={SK.sky} opacity={0.7} dx={1.2} dy={0.8} />
      <InkLine pts={lens} seed={seed + 2} width={1.6} closed />
      <Wash pts={handle} seed={seed + 3} fill={SK.leather} opacity={0.8} dx={0.8} dy={0.6} />
      <InkLine pts={handle} seed={seed + 4} width={1.1} closed />
    </g>
  );
}

/** A speech bubble centred on (x, y) with its tail pointing to (tx, ty). */
export function SpeechBubble({
  x,
  y,
  w,
  h,
  tx,
  ty,
  seed,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  tx: number;
  ty: number;
  seed: number;
}) {
  const l = x - w / 2;
  const r = x + w / 2;
  const t = y - h / 2;
  const b = y + h / 2;
  const k = Math.min(8, h / 3);
  const side = tx < x ? -1 : 1;
  const b0 = x + side * w * 0.08;
  const b1 = x + side * w * 0.3;
  const top: Pt[] = [
    [l + k, t],
    [r - k, t],
    [r, t + k],
    [r, b - k],
    [r - k, b],
  ];
  const bottom: Pt[] =
    side > 0
      ? [[b1, b], [tx, ty], [b0, b]]
      : [[b0, b], [tx, ty], [b1, b]];
  const pts = rp([...top, ...bottom, [l + k, b], [l, b - k], [l, t + k]]);
  return (
    <g>
      <Paper pts={pts} seed={seed} />
      <InkLine pts={pts} seed={seed + 1} width={1.1} closed />
    </g>
  );
}

/** A payment card centred on (x, y), `w` wide, tilted by `tilt` degrees. */
export function PayCard({ x, y, w = 34, tilt = 0, seed }: { x: number; y: number; w?: number; tilt?: number; seed: number }) {
  const h = w * 0.63;
  const rot = (px: number, py: number): Pt => {
    const a = (tilt * Math.PI) / 180;
    return [x + px * Math.cos(a) - py * Math.sin(a), y + px * Math.sin(a) + py * Math.cos(a)];
  };
  const body = rp(sharp([rot(-w / 2, -h / 2), rot(w / 2, -h / 2), rot(w / 2, h / 2), rot(-w / 2, h / 2)], true, 2));
  const chip = rp([rot(-w * 0.34, -h * 0.02), rot(-w * 0.14, -h * 0.02), rot(-w * 0.14, h * 0.26), rot(-w * 0.34, h * 0.26)]);
  return (
    <g>
      <Wash pts={body} seed={seed} fill={SK.charcoal} opacity={0.55} dx={1} dy={0.8} />
      <InkLine pts={body} seed={seed + 1} width={1.1} closed />
      <InkLine pts={rp([rot(-w / 2, -h * 0.24), rot(w / 2, -h * 0.24)])} seed={seed + 2} width={2.2} amp={0.3} />
      <Wash pts={chip} seed={seed + 3} fill={SK.ochre} opacity={0.9} dx={0.3} dy={0.3} />
      <InkLine pts={chip} seed={seed + 4} width={0.7} amp={0.2} closed />
    </g>
  );
}

/** An open eye, `w` wide: someone watching closely. */
export function Eye({ x, y, w = 30, seed }: { x: number; y: number; w?: number; seed: number }) {
  const h = w * 0.34;
  const lid = curvePts([x - w / 2, y], [x, y - h * 2], [x + w / 2, y], 10);
  const low = curvePts([x + w / 2, y], [x, y + h * 1.6], [x - w / 2, y], 10);
  const iris = rp(blobPts(x, y, h * 0.66, h * 0.66, seed, 10, 0.05));
  const pupil = rp(blobPts(x, y, h * 0.24, h * 0.24, seed + 5, 8, 0.05));
  return (
    <g>
      <Wash pts={iris} seed={seed + 1} fill={SK.brown} opacity={0.6} dx={0.4} dy={0.3} />
      <InkLine pts={iris} seed={seed + 2} width={0.9} closed />
      <path d={wobble(pupil, seed + 6, 0.2, 6, true)} fill={SK.ink} />
      <InkLine pts={[...lid, ...low.slice(1)]} seed={seed + 3} width={1.3} amp={0.4} />
      <InkLine pts={rp([[x - w * 0.3, y - h * 1.35], [x, y - h * 1.75], [x + w * 0.3, y - h * 1.4]])} seed={seed + 4} width={0.8} amp={0.3} />
    </g>
  );
}

/** A megaphone: mouthpiece at (x, y), the bell opening toward +x. */
export function Megaphone({ x, y, s = 1, seed }: { x: number; y: number; s?: number; seed: number }) {
  const cone = at(x, y, [[0, -8], [40, -24], [44, 0], [40, 24], [0, 8]], s);
  const grip = at(x, y, [[-11, -8], [0, -8], [0, 8], [-11, 8]], s);
  const handle = at(x, y, [[9, 7], [12, 24], [20, 24], [18, 10]], s);
  return (
    <g>
      <Wash pts={cone} seed={seed} fill={SK.camel} opacity={0.65} />
      <InkLine pts={cone} seed={seed + 1} closed />
      <InkLine pts={at(x, y, [[40, -24], [36, 0], [40, 24]], s)} seed={seed + 2} width={0.9} />
      <Wash pts={grip} seed={seed + 3} fill={SK.leather} opacity={0.8} dx={0.6} dy={0.4} />
      <InkLine pts={grip} seed={seed + 4} width={1.1} closed />
      <InkLine pts={handle} seed={seed + 5} width={1.1} />
    </g>
  );
}

/** A small clock face: time running short. */
export function Clock({ x, y, r = 13, seed }: { x: number; y: number; r?: number; seed: number }) {
  const face = rp(blobPts(x, y, r, r, seed, 14, 0.04));
  return (
    <g>
      <Paper pts={face} seed={seed + 1} />
      <InkLine pts={face} seed={seed + 2} width={1.3} closed />
      <InkLine pts={rp([[x, y - r * 0.62], [x, y], [x + r * 0.45, y + r * 0.3]])} seed={seed + 3} width={1.2} amp={0.2} />
    </g>
  );
}

/** A shopping cart, basket centred near (x, y). */
export function Cart({ x, y, s = 1, seed }: { x: number; y: number; s?: number; seed: number }) {
  const basket = at(x, y, [[-18, -16], [24, -16], [18, 2], [-10, 2]], s);
  const wheels = [at(x, y, [[-6, 10]], s)[0], at(x, y, [[14, 10]], s)[0]];
  return (
    <g>
      <Wash pts={basket} seed={seed} fill={SK.sky} opacity={0.55} />
      <InkLine pts={at(x, y, [[-28, -24], [-20, -24], [-10, 2], [18, 2]], s)} seed={seed + 1} width={1.4} />
      <InkLine pts={basket} seed={seed + 2} width={1.3} closed />
      <InkLine pts={at(x, y, [[-12, -6], [21, -6]], s)} seed={seed + 3} width={0.8} />
      {wheels.map((p, i) => (
        <InkLine key={i} pts={rp(blobPts(p[0], p[1], 3.4 * s, 3.4 * s, seed + 4 + i, 8, 0.05))} seed={seed + 6 + i} width={1.3} closed />
      ))}
    </g>
  );
}

/** A map pin with its tip at (x, y). */
export function MapPin({ x, y, s = 1, seed }: { x: number; y: number; s?: number; seed: number }) {
  // round head from lower left, over the top, to lower right; tip below
  const head = Array.from({ length: 13 }, (_, i) => {
    const a = ((215 - (i / 12) * 250) * Math.PI) / 180;
    return [Math.cos(a) * 17, -34 - Math.sin(a) * 17] as Pt;
  });
  const pin = at(x, y, [[0, 0], ...head], s);
  const hole = rp(blobPts(x, y - 34 * s, 6 * s, 6 * s, seed, 10, 0.05));
  return (
    <g>
      <Wash pts={pin} seed={seed + 1} fill={SK.camel} opacity={0.75} />
      <InkLine pts={pin} seed={seed + 2} closed />
      <Paper pts={hole} seed={seed + 3} />
      <InkLine pts={hole} seed={seed + 4} width={1} closed />
    </g>
  );
}

/**
 * A seated baby, upper body only (for a high chair, a lap, a pram). (x, y) is
 * the seat point; the baby faces −x, reaching one chubby arm to `hand`.
 */
export function Baby({
  x,
  y,
  hand,
  seed,
  wear = SK.sky,
  skin = SK.skin,
  hairTone = SK.tan,
}: {
  x: number;
  y: number;
  hand: Pt;
  seed: number;
  wear?: string;
  skin?: string;
  hairTone?: string;
}) {
  const body = rp(blobPts(x, y - 15, 12.5, 16, seed, 12, 0.06));
  const head = rp(blobPts(x - 1, y - 42, 12.5, 12, seed + 1, 12, 0.05));
  const sh: Pt = [x - 6, y - 24];
  const arm = rp(limb([sh, [r2((sh[0] + hand[0]) / 2), r2((sh[1] + hand[1]) / 2 + 3)], hand], 4.2, 3.6));
  const fist = rp(blobPts(hand[0], hand[1], 3.6, 3.6, seed + 2, 8, 0.1));
  return (
    <g>
      <Wash pts={body} seed={seed + 3} fill={wear} opacity={0.75} />
      <InkLine pts={body} seed={seed + 4} closed />
      <Wash pts={head} seed={seed + 5} fill={skin} opacity={0.75} dx={0.8} dy={0.6} />
      <InkLine pts={head} seed={seed + 6} width={1.1} closed />
      {/* a tuft of hair and a curl */}
      <Wash pts={rp([[x - 9, y - 50], [x - 2, y - 55.5], [x + 8, y - 52], [x + 10, y - 46], [x + 3, y - 50], [x - 4, y - 49]])} seed={seed + 7} fill={hairTone} opacity={0.75} dx={0.4} dy={0} />
      <InkLine pts={rp([[x - 3, y - 54], [x - 1, y - 59], [x + 3, y - 58], [x + 2, y - 55]])} seed={seed + 8} width={0.8} />
      {/* face, turned to −x: two dots for eyes, a round cheek, a small mouth */}
      <path d={wobble(rp(blobPts(x - 7, y - 43, 1.2, 1.4, seed + 9, 6, 0.1)), seed + 9, 0.1, 4, true)} fill={SK.ink} />
      <path d={wobble(rp(blobPts(x - 1, y - 43.5, 1.2, 1.4, seed + 10, 6, 0.1)), seed + 10, 0.1, 4, true)} fill={SK.ink} />
      <InkLine pts={rp([[x - 7.5, y - 36.5], [x - 5, y - 35], [x - 2.5, y - 36.5]])} seed={seed + 11} width={0.8} amp={0.2} />
      <Wash pts={rp(blobPts(x + 3, y - 38, 2.6, 2, seed + 12, 8, 0.1))} seed={seed + 12} fill={SK.blush} opacity={0.9} dx={0} dy={0} />
      {/* the reaching arm */}
      <Wash pts={arm} seed={seed + 13} fill={wear} opacity={0.75} dx={0.6} dy={0.6} />
      <InkLine pts={arm} seed={seed + 14} width={1.1} closed />
      <Wash pts={fist} seed={seed + 15} fill={skin} opacity={0.8} dx={0.3} dy={0.3} />
      <InkLine pts={fist} seed={seed + 16} width={0.9} closed />
    </g>
  );
}

/* -- shared objects (first drawn for Week 2) ------------------------------ */

/** Two beamed music notes, about 30 units across at s = 1. */
export function Notes({ x, y, s = 1, seed }: { x: number; y: number; s?: number; seed: number }) {
  const heads: Pt[] = [
    [-9, 10],
    [9, 6],
  ];
  return (
    <g>
      {heads.map(([hx, hy], i) => (
        <path key={i} d={wobble(rp(blobPts(x + hx * s, y + hy * s, 5 * s, 3.8 * s, seed + i, 9, 0.08)), seed + i, 0.2, 6, true)} fill={SK.ink} />
      ))}
      <InkLine pts={at(x, y, [[-4.5, 9], [-4.5, -13]], s)} seed={seed + 3} width={1.3} amp={0.2} />
      <InkLine pts={at(x, y, [[13.5, 5], [13.5, -17]], s)} seed={seed + 4} width={1.3} amp={0.2} />
      <InkLine pts={at(x, y, [[-4.5, -13], [13.5, -17]], s)} seed={seed + 5} width={3.2} amp={0.2} />
    </g>
  );
}

/** A thought cloud centred on (x, y), trailing two small puffs toward (tx, ty). */
export function Thought({ x, y, rx, ry, tx, ty, seed }: { x: number; y: number; rx: number; ry: number; tx: number; ty: number; seed: number }) {
  const cloud = cloudPts(x, y, rx, ry, 12);
  const puff = (k: number, r: number) => rp(blobPts(x + (tx - x) * k, y + (ty - y) * k, r, r, seed + k * 10, 8, 0.1));
  return (
    <g>
      <Paper pts={cloud} seed={seed} />
      <InkLine pts={cloud} seed={seed + 1} width={1.1} closed />
      <Paper pts={puff(0.62, 4.5)} seed={seed + 2} />
      <InkLine pts={puff(0.62, 4.5)} seed={seed + 3} width={0.9} closed />
      <Paper pts={puff(0.84, 2.8)} seed={seed + 4} />
      <InkLine pts={puff(0.84, 2.8)} seed={seed + 5} width={0.9} closed />
    </g>
  );
}

/** A pack standing on (x, bottom): cream, or washed when `fill` is set. */
export function Pack({ x, bottom, w = 30, h = 58, seed, fill, badge = false }: { x: number; bottom: number; w?: number; h?: number; seed: number; fill?: string; badge?: boolean }) {
  const pts = sharp([[x - w / 2, bottom - h], [x + w / 2, bottom - h], [x + w / 2, bottom], [x - w / 2, bottom]], true, 2);
  return (
    <g>
      {fill ? <Wash pts={pts} seed={seed} fill={fill} opacity={0.75} /> : <Paper pts={pts} seed={seed} />}
      <InkLine pts={pts} seed={seed + 1} width={1.2} closed />
      {badge ? (
        <BrandBadge x={x} y={r2(bottom - h * 0.58)} r={r2(w * 0.3)} seed={seed + 2} />
      ) : (
        <InkLine pts={rp([[x - w * 0.28, bottom - h * 0.58], [x + w * 0.28, bottom - h * 0.58]])} seed={seed + 2} width={0.8} />
      )}
    </g>
  );
}

/** A waisted, contoured bottle standing on (x, bottom). */
export function ShapedBottle({ x, bottom, seed }: { x: number; bottom: number; seed: number }) {
  const half: Pt[] = [[16, 0], [20, -22], [12, -36], [8, -46], [14, -58], [18, -70], [6, -84], [6, -98]];
  const pts = at(x, bottom, [...half, ...[...half].reverse().map(([px, py]) => [-px, py] as Pt)]);
  return (
    <g>
      <Wash pts={pts} seed={seed} fill={SK.sky} opacity={0.75} />
      <InkLine pts={pts} seed={seed + 1} closed />
      <InkLine pts={at(x, bottom, [[-10, -40], [10, -40]])} seed={seed + 2} width={0.8} />
    </g>
  );
}

/* -- shared objects (first drawn for Week 3) ------------------------------ */

/** A running shoe in side view, toe to +x; (x, y) is the middle of the sole. */
export function Shoe({ x, y, s = 1, seed, fill = SK.camel }: { x: number; y: number; s?: number; seed: number; fill?: string }) {
  const upper = at(x, y, [[-26, -5], [-25, -20], [-19, -20], [-13, -15], [-8, -25], [-3, -24], [4, -16], [14, -11], [24, -9], [28, -5]], s);
  const sole = at(x, y, [[-27, -5], [28, -5], [29, 0], [26, 3], [-26, 3], [-28, -1]], s);
  return (
    <g>
      <Wash pts={upper} seed={seed} fill={fill} opacity={0.8} dx={0.8} dy={0.6} />
      <Paper pts={sole} seed={seed + 5} />
      <InkLine pts={upper} seed={seed + 1} width={1.1} amp={0.4} />
      <InkLine pts={sole} seed={seed + 2} width={1.1} closed amp={0.3} />
      {[[-4, -19, 2, -15], [1, -16, 7, -12], [6, -14, 12, -10]].map(([x0, y0, x1, y1], i) => (
        <InkLine key={i} pts={at(x, y, [[x0, y0], [x1, y1]], s)} seed={seed + 6 + i} width={0.8} amp={0.2} />
      ))}
    </g>
  );
}

/** A wall screen, top-left (x, y); `children` draw on the glass. */
export function Screen({ x, y, w, h, seed, children }: { x: number; y: number; w: number; h: number; seed: number; children?: React.ReactNode }) {
  const body = sharp([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], true, 3);
  const glass = rp([[x + 5, y + 5], [x + w - 5, y + 5], [x + w - 5, y + h - 5], [x + 5, y + h - 5]]);
  return (
    <g>
      <Wash pts={body} seed={seed} fill={SK.charcoal} opacity={0.6} dx={0.8} dy={0.6} />
      <Paper pts={glass} seed={seed + 1} />
      <Wash pts={glass} seed={seed + 2} fill={SK.sky} opacity={0.55} dx={0.5} dy={0.4} />
      <InkLine pts={body} seed={seed + 3} width={1.2} closed />
      {children}
    </g>
  );
}

/** A soda can; (x, y) is the base centre. */
export function Can1({ x, y, seed }: { x: number; y: number; seed: number }) {
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

/** A drinks can standing on (x, bottom), `w` wide: teal, with a pale band. */
export function Can2({ x, bottom, w = 18, seed, tilt = 0 }: { x: number; bottom: number; w?: number; seed: number; tilt?: number }) {
  const h = w * 1.7;
  const body = sharp([[x - w / 2, bottom - h], [x + w / 2, bottom - h], [x + w / 2, bottom], [x - w / 2, bottom]], true, 2);
  const band = rp([[x - w / 2, bottom - h * 0.62], [x + w / 2, bottom - h * 0.62], [x + w / 2, bottom - h * 0.4], [x - w / 2, bottom - h * 0.4]]);
  return (
    <g transform={tilt ? `rotate(${tilt} ${x} ${r2(bottom - h / 2)})` : undefined}>
      <Wash pts={body} seed={seed} fill={SK.teal} opacity={0.75} dx={0.8} dy={0.6} />
      <Paper pts={band} seed={seed + 1} />
      <InkLine pts={body} seed={seed + 2} width={1.1} closed />
      <InkLine pts={rp([[x - w * 0.36, bottom - h - 2], [x + w * 0.36, bottom - h - 2]])} seed={seed + 3} width={1.4} amp={0.2} />
    </g>
  );
}

/** A drinks can standing on (x, bottom), in pencil when not chosen. */
export function Can3({ x, bottom, h = 50, seed, pencil = false }: { x: number; bottom: number; h?: number; seed: number; pencil?: boolean }) {
  const w = h * 0.56;
  const pts = sharp([[x - w / 2, bottom - h], [x + w / 2, bottom - h], [x + w / 2, bottom], [x - w / 2, bottom]], true, 3);
  return pencil ? (
    <g>
      <PencilLine pts={pts} seed={seed} closed />
      <PencilLine pts={rp([[x - w / 2, bottom - h + 7], [x + w / 2, bottom - h + 7]])} seed={seed + 1} />
    </g>
  ) : (
    <g>
      <Wash pts={pts} seed={seed} fill={SK.sky} opacity={0.8} />
      <InkLine pts={pts} seed={seed + 1} closed />
      <InkLine pts={rp([[x - w / 2, bottom - h + 7], [x + w / 2, bottom - h + 7]])} seed={seed + 2} width={0.8} />
    </g>
  );
}

/** A can; (x, y) is the middle of its base. `label` colours the band. */
export function Can4({ x, y, w = 34, h = 50, label = SK.camel, seed, bolt = false }: { x: number; y: number; w?: number; h?: number; label?: string; seed: number; bolt?: boolean }) {
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

/** A family sedan standing on (x, y), washed teal: the thing being bought. */
export function Car1({ x, y, seed }: { x: number; y: number; seed: number }) {
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

/** A car in side view; (x, y) is the ground under its middle, `s` its scale (160 wide at 1). */
export function Car2({ x, y, s = 1, seed }: { x: number; y: number; s?: number; seed: number }) {
  const body = at(x, y, [[-78, -14], [-78, -32], [-70, -40], [-42, -44], [-22, -66], [28, -66], [50, -44], [72, -40], [80, -30], [80, -14]], s);
  const win1 = at(x, y, [[-34, -46], [-18, -60], [-2, -60], [-2, -46]], s);
  const win2 = at(x, y, [[6, -46], [6, -60], [24, -60], [40, -46]], s);
  return (
    <g>
      <Wash pts={body} seed={seed} fill={SK.sky} opacity={0.8} />
      <InkLine pts={[...body, body[0]]} seed={seed + 1} />
      {[win1, win2].map((w, i) => (
        <g key={i}>
          <Paper pts={w} seed={seed + 2 + i} />
          <InkLine pts={w} seed={seed + 4 + i} width={1} closed />
        </g>
      ))}
      {[-48, 50].map((wx, i) => {
        const wh = rp(blobPts(x + wx * s, y - 13 * s, 13 * s, 13 * s, seed + 6 + i, 12, 0.04));
        return (
          <g key={wx}>
            <Wash pts={wh} seed={seed + 8 + i} fill={SK.charcoal} opacity={0.85} dx={0.4} dy={0.3} />
            <InkLine pts={wh} seed={seed + 10 + i} width={1.2} closed />
          </g>
        );
      })}
    </g>
  );
}

/** A car, side on; (x, y) is the middle of its wheelbase on the ground. */
export function Car3({ x, y, s = 1, seed, fill = SK.leather }: { x: number; y: number; s?: number; seed: number; fill?: string }) {
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

/** A tall glass of cold water; (x, y) is the base centre. */
export function Glass1({ x, y, seed }: { x: number; y: number; seed: number }) {
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

/** A glass of water standing on (x, bottom). */
export function Glass2({ x, bottom, h = 70, seed }: { x: number; bottom: number; h?: number; seed: number }) {
  const w = h * 0.62;
  const glass = sharp([[x - w / 2, bottom - h], [x + w / 2, bottom - h], [x + w * 0.38, bottom], [x - w * 0.38, bottom]], true, 2);
  const lv = bottom - h * 0.72;
  const k = (yy: number) => w / 2 - ((w / 2 - w * 0.38) * (yy - (bottom - h))) / h;
  const water = rp([[x - k(lv) + 2, lv], [x + k(lv) - 2, lv], [x + w * 0.38 - 2, bottom - 2], [x - w * 0.38 + 2, bottom - 2]]);
  return (
    <g>
      <Wash pts={water} seed={seed} fill={SK.sky} opacity={0.85} dx={0.6} dy={0.4} />
      <InkLine pts={rp([[x - k(lv) + 1, lv], [x + k(lv) - 1, lv]])} seed={seed + 1} width={0.8} />
      <InkLine pts={glass} seed={seed + 2} closed />
    </g>
  );
}

/** An open laptop, screen centred on (x, y). */
export function Laptop1({ x, y, seed }: { x: number; y: number; seed: number }) {
  const lid = sharp([[x - 30, y - 22], [x + 30, y - 22], [x + 30, y + 14], [x - 30, y + 14]], true, 2);
  const screen = rp([[x - 24, y - 16], [x + 24, y - 16], [x + 24, y + 9], [x - 24, y + 9]]);
  const base = sharp([[x - 38, y + 14], [x + 38, y + 14], [x + 33, y + 22], [x - 33, y + 22]], true, 1.5);
  return (
    <g>
      <Paper pts={lid} seed={seed} />
      <Wash pts={screen} seed={seed + 1} fill={SK.sky} opacity={0.7} dx={0.6} dy={0.4} />
      <InkLine pts={lid} seed={seed + 2} closed />
      <Wash pts={base} seed={seed + 3} fill={SK.charcoal} opacity={0.6} dx={0.6} dy={0.4} />
      <InkLine pts={base} seed={seed + 4} width={1.1} closed />
    </g>
  );
}

/** A laptop showing a search box; (x, y) is the middle of its base. */
export function Laptop2({ x, y, s = 1, seed }: { x: number; y: number; s?: number; seed: number }) {
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

/** A mug held up at (x, y), its handle toward +x. */
export function Mug1({ x, y, s = 1.6, seed }: { x: number; y: number; s?: number; seed: number }) {
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

/** A mug, body centred on (x, y), about 64 wide with its handle on +x. */
export function Mug2({ x, y, s = 1, seed, fill }: { x: number; y: number; s?: number; seed: number; fill?: string }) {
  const body = at(x, y, [[-26, -26], [22, -26], [22, 12], [16, 24], [-20, 24], [-26, 12]], s);
  const handle = at(x, y, [[22, -16], [34, -16], [38, -6], [34, 6], [22, 8]], s);
  return (
    <g>
      {fill ? <Wash pts={body} seed={seed} fill={fill} opacity={0.65} /> : <Paper pts={body} seed={seed} />}
      <InkLine pts={body} seed={seed + 1} closed />
      <InkLine pts={handle} seed={seed + 2} width={1.2} />
      <InkLine pts={at(x, y, [[-24, -20], [20, -20]], s)} seed={seed + 3} width={0.7} />
    </g>
  );
}

/** A perfume bottle standing on (x, bottom): sky glass, camel scent, tan cap. */
export function Perfume1({ x, bottom, s = 1, seed }: { x: number; bottom: number; s?: number; seed: number }) {
  const body = sharp(at(x, bottom, [[-17, -44], [17, -44], [19, 0], [-19, 0]], s), true, 3);
  const scent = at(x, bottom, [[-17, -24], [17, -24], [18, -2], [-18, -2]], s);
  const neck = at(x, bottom, [[-5, -52], [5, -52], [5, -44], [-5, -44]], s);
  const cap = sharp(at(x, bottom, [[-9, -66], [9, -66], [9, -52], [-9, -52]], s), true, 1.5);
  return (
    <g>
      <Wash pts={body} seed={seed} fill={SK.sky} opacity={0.6} />
      <Wash pts={scent} seed={seed + 1} fill={SK.camel} opacity={0.55} dx={1} dy={0} />
      <InkLine pts={body} seed={seed + 2} closed />
      <InkLine pts={neck} seed={seed + 3} width={1} closed />
      <Wash pts={cap} seed={seed + 4} fill={SK.tan} opacity={0.8} dx={0.6} dy={0.4} />
      <InkLine pts={cap} seed={seed + 5} width={1.1} closed />
    </g>
  );
}

/** A perfume bottle standing on (x, y). */
export function Perfume2({ x, y, s = 1, seed }: { x: number; y: number; s?: number; seed: number }) {
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

/** A phone with its top-left at (x, y), a notification count in its corner. */
export function Phone1({ x, y, n, seed, w = 42, h = 78 }: { x: number; y: number; n?: string; seed: number; w?: number; h?: number }) {
  const body = sharp([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], true, 6);
  const screen = rp([[x + 5, y + 9], [x + w - 5, y + 9], [x + w - 5, y + h - 12], [x + 5, y + h - 12]]);
  const badge = rp(blobPts(x + w - 2, y + 3, 11, 11, seed + 3, 10, 0.05));
  return (
    <g>
      <Wash pts={body} seed={seed} fill={SK.charcoal} opacity={0.55} dx={0.8} dy={0.6} />
      <Wash pts={screen} seed={seed + 1} fill={SK.sky} opacity={0.75} dx={0.4} dy={0.3} />
      <InkLine pts={body} seed={seed + 2} width={1.2} closed />
      {n ? (
        <>
          <Wash pts={badge} seed={seed + 4} fill={SK.ochre} opacity={0.95} dx={0.4} dy={0.3} />
          <InkLine pts={badge} seed={seed + 5} width={0.9} closed />
          <SketchText x={x + w - 2} y={y + 6.5} anchor="middle" size={n.length > 2 ? 7 : 9}>
            {n}
          </SketchText>
        </>
      ) : null}
    </g>
  );
}

/** A smartphone centred on (x, y), `s` = scale (40 × 72 at 1). */
export function Phone2({ x, y, s = 1, seed }: { x: number; y: number; s?: number; seed: number }) {
  const body = sharp(at(x, y, [[-20, -36], [20, -36], [20, 36], [-20, 36]], s), true, 5 * s);
  const glass = rp(at(x, y, [[-15, -28], [15, -28], [15, 26], [-15, 26]], s));
  return (
    <g>
      <Wash pts={body} seed={seed} fill={SK.charcoal} opacity={0.75} dx={0.6} dy={0.5} />
      <Wash pts={glass} seed={seed + 1} fill={SK.sky} opacity={0.9} dx={0.3} dy={0.3} />
      <InkLine pts={body} seed={seed + 2} width={1.1} closed />
    </g>
  );
}

/** A smartphone standing on (x, y). */
export function Phone3({ x, y, s = 1, seed }: { x: number; y: number; s?: number; seed: number }) {
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

const SHELF1_COLS = 4;
const SHELF1_ROWS = 3;
/** Where product `i` stands on Shelf1: four columns, three rows. */
export function shelf1Pos(i: number) {
  const c = i % SHELF1_COLS;
  const r = Math.floor(i / SHELF1_COLS);
  return { x: 150 + c * 62, y: 70 + r * 62 };
}

const SHELF1_WASH = [SK.camel, SK.earth, SK.sky, SK.tan];

/** Three wooden planks of twelve small products; `lit` is washed teal (the pick). */
export function Shelf1({ lit, faded = false }: { lit: number; faded?: boolean }) {
  return (
    <g>
      {Array.from({ length: SHELF1_ROWS }, (_, r) => (
        <InkLine key={r} pts={[[118, 92 + r * 62], [364, 92 + r * 62 + (r % 2 ? 1 : -1)]]} seed={400 + r} width={1.6} />
      ))}
      {Array.from({ length: SHELF1_COLS * SHELF1_ROWS }, (_, i) => {
        const { x, y } = shelf1Pos(i);
        const on = i === lit;
        const h = 32 + ((i * 7) % 3) * 3;
        const box = rp([[x - 15, y + 20 - h], [x + 15, y + 20 - h], [x + 15, y + 20], [x - 15, y + 20]]);
        return (
          <g key={i} opacity={faded && !on ? 0.35 : 1}>
            <Wash pts={box} seed={410 + i} fill={on ? SK.teal : SHELF1_WASH[i % 4]} opacity={on ? 0.75 : 0.5} />
            <InkLine pts={box} seed={430 + i} width={on ? 1.5 : 1.1} closed />
          </g>
        );
      })}
    </g>
  );
}

/** A small store shelf: one wooden plank on two uprights, standing on `gy`. */
export function Shelf2({ x0, x1, y, gy, seed }: { x0: number; x1: number; y: number; gy: number; seed: number }) {
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

/** A suitcase centred on (x, y); about 90 × 64 at s = 1. */
export function Suitcase1({ x, y, s = 1, seed }: { x: number; y: number; s?: number; seed: number }) {
  const body = sharp(at(x, y, [[-45, -30], [45, -30], [45, 32], [-45, 32]], s), true, 5 * s);
  return (
    <g>
      <InkLine pts={at(x, y, [[-13, -30], [-13, -42], [13, -42], [13, -30]], s)} seed={seed} width={2} amp={0.3} />
      <Wash pts={body} seed={seed + 1} fill={SK.camel} opacity={0.7} />
      <InkLine pts={body} seed={seed + 2} closed />
      {[-22, 22].map((sx, i) => (
        <InkLine key={sx} pts={at(x, y, [[sx, -30], [sx, 32]], s)} seed={seed + 3 + i} width={1.6} amp={0.2} color={SK.leather} />
      ))}
      {[-32, 32].map((wx, i) => (
        <InkLine key={wx} pts={rp(blobPts(x + wx * s, y + 38 * s, 4 * s, 4 * s, seed + 5 + i, 8, 0.05))} seed={seed + 5 + i} width={1.3} closed />
      ))}
    </g>
  );
}

/** An upright suitcase with a tag; (x, y) is the middle of its base. */
export function Suitcase2({ x, y, s = 1, seed }: { x: number; y: number; s?: number; seed: number }) {
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

/** A paper swing tag, its hole at (x, y), hanging toward +x, with a word on it. */
export function Tag1({ x, y, w = 72, seed, children, size = 12 }: { x: number; y: number; w?: number; seed: number; children?: React.ReactNode; size?: number }) {
  const h = 30;
  const pts = sharp([[x - 8, y], [x + 4, y - h / 2], [x + w, y - h / 2], [x + w, y + h / 2], [x + 4, y + h / 2]], true, 2);
  const hole = rp(blobPts(x + 2, y, 3, 3, seed + 2, 8, 0.05));
  return (
    <g>
      <Paper pts={pts} seed={seed} />
      <InkLine pts={pts} seed={seed + 1} width={1.2} closed />
      <InkLine pts={hole} seed={seed + 3} width={0.9} closed />
      {children ? (
        <SketchText x={r2(x + 6 + w / 2)} y={r2(y + size * 0.36)} anchor="middle" size={size}>
          {children}
        </SketchText>
      ) : null}
    </g>
  );
}

/** A small paper tag with a word on it, centred on (x, y). */
export function Tag2({ x, y, text, seed }: { x: number; y: number; text: string; seed: number }) {
  const w = text.length * 8.4 + 22;
  const pts = sharp([[x - w / 2, y - 13], [x + w / 2, y - 13], [x + w / 2, y + 13], [x - w / 2, y + 13]], true, 5);
  return (
    <g>
      <Paper pts={pts} seed={seed} />
      <InkLine pts={pts} seed={seed + 1} width={1.1} closed />
      <SketchText x={x} y={y + 4} anchor="middle" size={10}>
        {text}
      </SketchText>
    </g>
  );
}

/** A hand-drawn tick, teal: a condition met. */
export function Tick1({ x, y, s = 1, seed, color = SK.teal }: { x: number; y: number; s?: number; seed: number; color?: string }) {
  return <InkLine pts={at(x, y, [[-6, 0], [-1.5, 5], [7, -6]], s)} seed={seed} width={r2(2.2 * s)} amp={0.25} color={color} />;
}

/** A teal tick, like the Receipt's: what is done or chosen. */
export function Tick2({ x, y, s = 1, seed }: { x: number; y: number; s?: number; seed: number }) {
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

/** A luxury wristwatch, face centred on (x, y): leather strap, gold bezel. */
export function Watch1({ x, y, s = 1, seed }: { x: number; y: number; s?: number; seed: number }) {
  const strapTop = sharp(at(x, y, [[-15, -28], [15, -28], [13, -70], [-13, -70]], s), true, 2);
  const strapBot = sharp(at(x, y, [[-15, 28], [15, 28], [13, 70], [-13, 70]], s), true, 2);
  const bezel = rp(blobPts(x, y, 32 * s, 32 * s, seed, 18, 0.03));
  const face = rp(blobPts(x, y, 24 * s, 24 * s, seed + 1, 16, 0.03));
  const crown = sharp(at(x, y, [[31, -5], [38, -5], [38, 5], [31, 5]], s), true, 1);
  return (
    <g>
      {[strapTop, strapBot].map((p, i) => (
        <g key={i}>
          <Wash pts={p} seed={seed + 2 + i} fill={SK.leather} opacity={0.75} />
          <InkLine pts={p} seed={seed + 4 + i} width={1.2} closed />
        </g>
      ))}
      <Wash pts={bezel} seed={seed + 6} fill={SK.ochre} opacity={0.85} />
      <InkLine pts={bezel} seed={seed + 7} width={1.3} closed />
      <Paper pts={face} seed={seed + 8} />
      <InkLine pts={face} seed={seed + 9} width={1} closed />
      <Wash pts={crown} seed={seed + 10} fill={SK.ochre} opacity={0.85} dx={0.4} dy={0.3} />
      <InkLine pts={crown} seed={seed + 11} width={1} closed />
      {[0, 3, 6, 9].map((h) => {
        const a = (h / 12) * Math.PI * 2 - Math.PI / 2;
        return <InkLine key={h} pts={rp([[x + Math.cos(a) * 18 * s, y + Math.sin(a) * 18 * s], [x + Math.cos(a) * 22 * s, y + Math.sin(a) * 22 * s]])} seed={seed + 12 + h} width={1} amp={0.1} />;
      })}
      <InkLine pts={at(x, y, [[0, -15], [0, 0], [10, 6]], s)} seed={seed + 30} width={1.4} amp={0.1} />
    </g>
  );
}

/** A wristwatch standing upright; (x, y) is the foot of its strap. */
export function Watch2({ x, y, s = 1, seed }: { x: number; y: number; s?: number; seed: number }) {
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
