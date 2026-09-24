/* ==========================================================================
   Consumer Behavior · Week 02 — plates (Editorial Sketch)
   --------------------------------------------------------------------------
   Perception and sensory marketing, drawn in ink and watercolour with the
   shared kit in ../_visuals (see ../CLAUDE.md for the style rules).

   Fixed cast for this week:
     · SenseGlyph: the five sense organs, always the same drawing: an eye
       (sight), an ear (sound), a nose (smell), an open hand (touch) and lips
       (taste).
     · Person: every human (the shared fashion figure).
     · Heart: a feeling. BrandBadge: the brand.
   Teal is the one thing that gets through (noticed, detected, chosen) on a
   plate; pencil is only for something absent (the old, bigger pack).
   ========================================================================== */

import React from "react";
import { ForkKnife, HandPalm, Scissors, TShirt } from "@phosphor-icons/react";
import { SK, InkLine, PencilLine, Wash, Paper, SketchFrame, SketchText, blobPts, seeded, wobble, r2, type Pt } from "../_visuals/sketch";
import { Eye, Heart, Person, handAt, Ground, Box, BrandBadge, Backwash, Cart, SketchArrow, Notes, Thought, Pack, ShapedBottle, at, rp, sharp, curvePts } from "../_visuals/sketch-cast";
import {
  Can2,
  Laptop1,
  Mug2,
  Perfume1,
  Phone1,
  Tag1,
  Watch1,
} from "../_visuals/sketch-objects";

/* -- the five senses -------------------------------------------------------- */

export type Sense = "sight" | "sound" | "smell" | "touch" | "taste";
export const SENSES: Sense[] = ["sight", "sound", "smell", "touch", "taste"];

/** An ear seen from the side, about 30 units tall at s = 1. */
function Ear({ x, y, s = 1, seed }: { x: number; y: number; s?: number; seed: number }) {
  const outer = at(x, y, [[-4, -13], [3, -15], [9, -11], [11, -3], [8, 4], [4, 8], [3, 13], [-1, 16], [-5, 14]], s);
  const inner = at(x, y, [[-3, -7], [2, -8], [5, -4], [4, 1], [0, 3], [1, 7]], s);
  return (
    <g>
      <Wash pts={outer} seed={seed} fill={SK.skin} opacity={0.75} dx={0.8} dy={0.5} />
      <InkLine pts={outer} seed={seed + 1} width={1.2} />
      <InkLine pts={inner} seed={seed + 2} width={0.9} />
    </g>
  );
}

/** A nose in profile, facing −x, about 28 units tall at s = 1. */
function Nose({ x, y, s = 1, seed }: { x: number; y: number; s?: number; seed: number }) {
  const bridge = at(x, y, [[2, -14], [-2, -4], [-7, 5], [-9, 9], [-6, 11], [-2, 10]], s);
  const wing = at(x, y, [[-2, 10], [1, 7], [4, 9], [3, 12]], s);
  const skin = at(x, y, [[3, -14], [-2, -4], [-8, 6], [-8, 11], [5, 12], [7, 0], [7, -14]], s);
  return (
    <g>
      <Wash pts={skin} seed={seed} fill={SK.skin} opacity={0.7} dx={0.8} dy={0.4} />
      <InkLine pts={bridge} seed={seed + 1} width={1.2} />
      <InkLine pts={wing} seed={seed + 2} width={0.9} />
    </g>
  );
}

/** Closed lips, about 30 units wide at s = 1. */
function Lips({ x, y, s = 1, seed }: { x: number; y: number; s?: number; seed: number }) {
  const shape = at(x, y, [[-15, 0], [-8, -6], [-2.5, -5.5], [0, -3.5], [2.5, -5.5], [8, -6], [15, 0], [8, 6.5], [0, 7.5], [-8, 6.5]], s);
  return (
    <g>
      <Wash pts={shape} seed={seed} fill={SK.camel} opacity={0.7} dx={0.8} dy={0.5} />
      <InkLine pts={shape} seed={seed + 1} width={1.2} closed />
      <InkLine pts={at(x, y, [[-14, 0], [-6, 1], [0, 0.5], [6, 1], [14, 0]], s)} seed={seed + 2} width={0.9} />
    </g>
  );
}

/** An open hand (a light Phosphor palm over a skin wash), `size` units tall. */
function Palm({ x, y, size = 30, seed }: { x: number; y: number; size?: number; seed: number }) {
  return (
    <g>
      <Wash pts={rp(blobPts(x, y + size * 0.08, size * 0.3, size * 0.36, seed, 10, 0.1))} seed={seed} fill={SK.skin} opacity={0.7} dx={0.5} dy={0.5} />
      <HandPalm x={r2(x - size / 2)} y={r2(y - size / 2)} size={size} weight="light" color={SK.ink} />
    </g>
  );
}

/** One sense, always drawn as the same organ. (x, y) is its centre. */
export function SenseGlyph({ kind, x, y, s = 1, seed }: { kind: Sense; x: number; y: number; s?: number; seed: number }) {
  if (kind === "sight") return <Eye x={x} y={y} w={r2(32 * s)} seed={seed} />;
  if (kind === "sound") return <Ear x={x} y={y} s={s} seed={seed} />;
  if (kind === "smell") return <Nose x={x} y={y} s={s} seed={seed} />;
  if (kind === "touch") return <Palm x={x} y={y} size={r2(32 * s)} seed={seed} />;
  return <Lips x={x} y={y} s={s} seed={seed} />;
}

/* -- small objects ------------------------------------------------------------ */

/* ==========================================================================
   TITLE · the same cup, before and after the filters
   ========================================================================== */

export function Filters() {
  const cx = 180;
  const rays = [-14, -7, 0, 7, 14];
  const lenses: [number, string][] = [
    [138, SK.blush],
    [180, SK.sky],
    [222, SK.ochre],
  ];
  return (
    <SketchFrame
      id="sk-filters"
      width={360}
      height={470}
      label="A plain cream mug at the top, as it is. Lines of sight run down through a band of the five senses (an eye, an ear, a nose, a hand and lips), then through three overlapping coloured lenses, the personal filters. At the bottom the same mug is tilted, washed ochre and carries a heart: as we see it."
    >
      <Wash seed={5} fill={SK.blush} opacity={0.35} dx={0} dy={0} pts={blobPts(180, 250, 172, 226, 5)} />

      <SketchText x={cx} y={26} anchor="middle" size={10}>
        AS IT IS
      </SketchText>
      <Mug2 x={cx - 7} y={72} s={1.25} seed={20} />

      {/* lines of sight: plain ink above the filters, warm below */}
      {rays.map((d, i) => (
        <g key={d}>
          <InkLine pts={rp([[cx + d, 112], [cx + d * 1.2, 156]])} seed={30 + i} width={0.7} amp={0.4} />
          <InkLine pts={rp([[cx + d * 1.3, 216], [cx + d * 1.5, 246]])} seed={40 + i} width={0.7} amp={0.4} />
          <InkLine pts={rp([[cx + d * 1.6, 318], [cx + d * 1.8, 346]])} seed={50 + i} width={0.9} amp={0.4} color={SK.tan} />
        </g>
      ))}

      {/* our senses */}
      <SketchText x={34} y={152} size={10}>
        OUR SENSES
      </SketchText>
      <Paper pts={sharp([[26, 162], [334, 162], [334, 210], [26, 210]], true, 12)} seed={60} />
      <InkLine pts={sharp([[26, 162], [334, 162], [334, 210], [26, 210]], true, 12)} seed={61} closed />
      {SENSES.map((k, i) => (
        <SenseGlyph key={k} kind={k} x={66 + i * 57} y={185} s={0.9} seed={70 + i * 10} />
      ))}

      {/* personal filters: three overlapping lenses */}
      {lenses.map(([x, fill], i) => (
        <Wash key={x} pts={rp(blobPts(x, 282, 30, 30, 120 + i, 14, 0.05))} seed={120 + i} fill={fill} opacity={0.55} dx={1.5} dy={1} />
      ))}
      {lenses.map(([x], i) => (
        <InkLine key={x} pts={rp(blobPts(x, 282, 30, 30, 130 + i, 14, 0.04))} seed={130 + i} width={1.2} closed />
      ))}
      <SketchText x={262} y={262} size={10}>
        PERSONAL
      </SketchText>
      <SketchText x={262} y={276} size={10}>
        FILTERS
      </SketchText>

      {/* the mug as we see it */}
      <g transform="rotate(-7 180 396)">
        <Mug2 x={cx - 7} y={394} s={1.25} seed={140} fill={SK.ochre} />
        <Heart x={cx - 10} y={396} s={1.2} seed={150} />
      </g>
      <SketchText x={cx} y={458} anchor="middle" size={10}>
        AS WE SEE IT
      </SketchText>
    </SketchFrame>
  );
}

/* ==========================================================================
   WHAT IS PERCEPTION?
   ========================================================================== */

/** A raw sensation: a small ink dot, square, triangle or arc. */
function Mark({ x, y, k, seed, lit = false, r = 7.5 }: { x: number; y: number; k: number; seed: number; lit?: boolean; r?: number }) {
  const shape: Pt[] =
    k === 0
      ? rp(blobPts(x, y, r, r, seed, 9, 0.12))
      : k === 1
        ? rp(sharp([[x - r * 0.85, y - r * 0.85], [x + r * 0.85, y - r * 0.85], [x + r * 0.85, y + r * 0.85], [x - r * 0.85, y + r * 0.85]], true, 1))
        : k === 2
          ? rp(sharp([[x, y - r], [x + r, y + r * 0.8], [x - r, y + r * 0.8]], true, 1))
          : [];
  if (k === 3) return <InkLine pts={curvePts([x - r, y + r * 0.4], [x, y - r * 1.2], [x + r, y + r * 0.4], 6)} seed={seed} width={1.3} amp={0.3} />;
  return (
    <g>
      {lit ? <Wash pts={shape} seed={seed} fill={SK.teal} opacity={0.85} dx={0.6} dy={0.5} /> : null}
      <InkLine pts={shape} seed={seed + 1} width={lit ? 1.2 : 1} amp={0.3} closed />
    </g>
  );
}

// Twenty raw sensations. The seven dots (k = 0) are the ones that get picked.
const SCATTER: [number, number, number][] = [
  [-58, -52, 1], [-24, -56, 0], [14, -48, 2], [54, -54, 3],
  [-46, -22, 0], [-6, -18, 3], [34, -26, 0], [62, -4, 1],
  [-62, 6, 2], [-26, 12, 0], [10, 6, 1], [44, 16, 0],
  [-50, 40, 3], [-14, 44, 2], [24, 38, 0], [60, 46, 2],
  [-60, 64, 1], [-22, 68, 3], [18, 66, 1], [54, 70, 0],
];
// Where the seven picked dots go when they are organized: two eyes, a smile.
const FACE: Pt[] = [[-22, -20], [22, -20], [-34, 14], [-18, 28], [0, 32], [18, 28], [34, 14]];

export function SelectOrganizeInterpret() {
  const cx = [110, 310, 510, 700];
  const cy = 108;
  const picked = SCATTER.filter((p) => p[2] === 0);
  const labels = ["SENSATIONS", "SELECTING", "ORGANIZING", "INTERPRETING"];
  const face = rp(blobPts(cx[3], cy, 60, 60, 410, 16, 0.05));
  return (
    <SketchFrame
      id="sk-select-organize"
      width={800}
      height={236}
      label="Four panels left to right. Sensations: twenty small ink marks of mixed shapes scattered at random. Selecting: the same scatter with seven dots washed teal. Organizing: those seven dots moved into two eyes and a smile. Interpreting: a whole smiling face washed teal."
    >
      <Wash seed={400} fill={SK.blush} opacity={0.35} dx={0} dy={0} pts={blobPts(400, 118, 396, 112, 400, 18, 0.1)} />
      {cx.slice(0, 3).map((x, i) => (
        <SketchArrow key={x} pts={[[x + 86, cy], [x + 114, cy]]} seed={420 + i * 3} head={8} />
      ))}

      {SCATTER.map(([dx, dy, k], i) => (
        <Mark key={i} x={cx[0] + dx} y={cy + dy - 6} k={k} seed={430 + i * 2} />
      ))}
      {SCATTER.map(([dx, dy, k], i) => (
        <Mark key={i} x={cx[1] + dx} y={cy + dy - 6} k={k} seed={480 + i * 2} lit={k === 0} />
      ))}
      {picked.map((_, j) => (
        <Mark key={j} x={cx[2] + FACE[j][0]} y={cy + FACE[j][1]} k={0} seed={530 + j * 2} lit />
      ))}

      <Wash pts={face} seed={550} fill={SK.teal} opacity={0.45} />
      <InkLine pts={face} seed={551} width={1.4} closed />
      <path d={wobble(rp(blobPts(cx[3] - 21, cy - 18, 3.2, 4.2, 552, 8, 0.1)), 552, 0.2, 6, true)} fill={SK.ink} />
      <path d={wobble(rp(blobPts(cx[3] + 21, cy - 18, 3.2, 4.2, 553, 8, 0.1)), 553, 0.2, 6, true)} fill={SK.ink} />
      <InkLine pts={curvePts([cx[3] - 32, cy + 12], [cx[3], cy + 50], [cx[3] + 32, cy + 12], 10)} seed={554} width={1.8} amp={0.4} />

      {labels.map((t, i) => (
        <SketchText key={t} x={cx[i]} y={214} anchor="middle" size={11}>
          {t}
        </SketchText>
      ))}
    </SketchFrame>
  );
}


/** Three colour swatches, overlapping: something to see. */
function Swatches({ x, y, seed }: { x: number; y: number; seed: number }) {
  const sq = (dx: number, dy: number, w: number): Pt[] => sharp([[x + dx, y + dy], [x + dx + w, y + dy], [x + dx + w, y + dy + w], [x + dx, y + dy + w]], true, 1);
  const tiles: [Pt[], string][] = [
    [sq(-20, -16, 20), SK.camel],
    [sq(-6, -6, 20), SK.sky],
    [sq(6, -20, 16), SK.ochre],
  ];
  return (
    <g>
      {tiles.map(([pts, fill], i) => (
        <g key={i}>
          <Wash pts={pts} seed={seed + i * 2} fill={fill} opacity={0.8} dx={1} dy={0.8} />
          <InkLine pts={pts} seed={seed + i * 2 + 1} width={1} amp={0.3} closed />
        </g>
      ))}
    </g>
  );
}

/** Three rising wisps: something to smell. */
function Wisps({ x, y, seed }: { x: number; y: number; seed: number }) {
  return (
    <g>
      {[-12, 0, 12].map((dx, i) => (
        <InkLine key={dx} pts={at(x + dx, y, [[0, 18], [5, 10], [0, 2], [-5, -6], [0, -14], [4, -20]])} seed={seed + i} width={1.3} />
      ))}
    </g>
  );
}

/** A wrapped sweet: something to taste. */
function Sweet({ x, y, seed }: { x: number; y: number; seed: number }) {
  const body = rp(blobPts(x, y, 12, 9.5, seed, 10, 0.06));
  const endL = at(x, y, [[-11, -2], [-23, -10], [-21, 0], [-23, 10], [-11, 2]]);
  const endR = at(x, y, [[11, -2], [23, -10], [21, 0], [23, 10], [11, 2]]);
  return (
    <g>
      <Wash pts={endL} seed={seed + 1} fill={SK.ochre} opacity={0.7} dx={0.5} dy={0.5} />
      <Wash pts={endR} seed={seed + 2} fill={SK.ochre} opacity={0.7} dx={0.5} dy={0.5} />
      <InkLine pts={endL} seed={seed + 3} width={1} closed />
      <InkLine pts={endR} seed={seed + 4} width={1} closed />
      <Wash pts={body} seed={seed + 5} fill={SK.ochre} opacity={0.85} dx={0.6} dy={0.5} />
      <InkLine pts={body} seed={seed + 6} width={1.2} closed />
      <InkLine pts={at(x, y, [[-4, -6], [2, 0], [-4, 6]])} seed={seed + 7} width={0.8} />
    </g>
  );
}

/** A woven patch of cloth: something to feel. */
function Weave({ x, y, seed }: { x: number; y: number; seed: number }) {
  const patch = sharp([[x - 20, y - 16], [x + 20, y - 16], [x + 20, y + 16], [x - 20, y + 16]], true, 3);
  return (
    <g>
      <Wash pts={patch} seed={seed} fill={SK.camel} opacity={0.5} dx={1} dy={0.8} />
      <InkLine pts={patch} seed={seed + 1} width={1.2} closed />
      {[-8, 0, 8].map((dy, i) => (
        <InkLine key={dy} pts={at(x, y + dy, [[-16, 0], [-11, -3], [-6, 0], [-1, -3], [4, 0], [9, -3], [15, 0]])} seed={seed + 2 + i} width={0.8} amp={0.3} />
      ))}
    </g>
  );
}

export function SensoryFlood() {
  const head: Pt = [200, 128];
  // the five inputs sit round the head, each with its label above it
  const src: { x: number; y: number; t: string; el: React.ReactNode }[] = [
    { x: 52, y: 176, t: "SIGHTS", el: <Swatches x={52} y={176} seed={610} /> },
    { x: 84, y: 76, t: "SOUNDS", el: <Notes x={80} y={76} s={1.1} seed={620} /> },
    { x: 200, y: 50, t: "SMELLS", el: <Wisps x={200} y={50} seed={630} /> },
    { x: 316, y: 76, t: "TASTES", el: <Sweet x={316} y={76} seed={640} /> },
    { x: 348, y: 176, t: "TEXTURES", el: <Weave x={348} y={176} seed={650} /> },
  ];
  return (
    <SketchFrame
      id="sk-sensory-flood"
      width={400}
      height={312}
      label="A person stands in the middle, ringed by five kinds of input: sights (colour swatches), sounds (music notes), smells (rising wisps), tastes (a wrapped sweet) and textures (a woven patch). Two arrows run from each one to the person's head."
    >
      <Wash seed={600} fill={SK.blush} opacity={0.4} dx={0} dy={0} pts={blobPts(200, 168, 194, 142, 600, 16, 0.1)} />
      {src.map((c) => (
        <g key={c.t}>
          <SketchText x={c.x} y={c.y - 30} anchor="middle" size={9}>
            {c.t}
          </SketchText>
          {c.el}
        </g>
      ))}
      {src.flatMap((c, i) => {
        const dx = head[0] - c.x;
        const dy = head[1] - c.y;
        const len = Math.hypot(dx, dy);
        const ux = dx / len;
        const uy = dy / len;
        return [-7, 7].map((d, j) => {
          const px = -uy * d;
          const py = ux * d;
          const p0: Pt = [c.x + ux * 30 + px, c.y + uy * 30 + py];
          const p1: Pt = [head[0] - ux * 26 + px * 0.5, head[1] - uy * 26 + py * 0.5];
          return <SketchArrow key={`${i}${j}`} pts={rp([p0, p1])} seed={660 + i * 4 + j * 2} width={1} head={6} />;
        });
      })}

      <Ground x0={130} x1={270} y={298} seed={700} />
      <Person x={200} y={298} h={184} seed={710} look={{ hair: "curly", wear: SK.camel }} arms={["down", "down"]} />
    </SketchFrame>
  );
}


/** A billboard on two posts: board from (x0, top) to (x1, bottom), posts to `ground`. */
function Billboard({ x0, x1, top, bottom, ground, seed, children }: { x0: number; x1: number; top: number; bottom: number; ground: number; seed: number; children?: React.ReactNode }) {
  const board = sharp([[x0, top], [x1, top], [x1, bottom], [x0, bottom]], true, 2);
  const w = x1 - x0;
  return (
    <g>
      <InkLine pts={rp([[x0 + w * 0.25, bottom], [x0 + w * 0.25, ground]])} seed={seed} width={1.4} />
      <InkLine pts={rp([[x1 - w * 0.25, bottom], [x1 - w * 0.25, ground]])} seed={seed + 1} width={1.4} />
      <Paper pts={board} seed={seed + 2} />
      <InkLine pts={board} seed={seed + 3} closed />
      {children}
    </g>
  );
}

/** One advertisement, two viewers, two different impressions. */
export function SameAdTwoImpressions() {
  const g = 284;
  return (
    <SketchFrame
      id="sk-same-ad"
      width={400}
      height={300}
      label="One billboard advertisement in the middle, showing a product box with the brand badge. Two people look up at it from either side. One thinks of a whole heart; the other thinks of a broken heart."
    >
      <Wash seed={800} fill={SK.blush} opacity={0.4} dx={0} dy={0} pts={blobPts(200, 170, 194, 128, 800, 16, 0.1)} />
      <Ground x0={30} x1={370} y={g} seed={805} />
      <Billboard x0={128} x1={272} top={46} bottom={130} ground={g} seed={810}>
        <Box x={170} bottom={118} w={40} h={58} seed={820} />
        <InkLine pts={rp([[204, 76], [254, 76]])} seed={825} width={2} amp={0.4} />
        <InkLine pts={rp([[204, 90], [244, 90]])} seed={826} width={2} amp={0.4} />
        <InkLine pts={rp([[204, 104], [234, 104]])} seed={827} width={2} amp={0.4} />
      </Billboard>

      <Person x={64} y={g} h={168} seed={830} look={{ hair: "bob", wear: SK.camel }} arms={["hip", "down"]} />
      <Thought x={60} y={60} rx={34} ry={24} tx={66} ty={118} seed={870} />
      <Heart x={60} y={61} s={1.3} seed={880} />

      <Person x={336} y={g} h={168} flip seed={890} look={{ hair: "short", wear: SK.sky, skin: SK.tan, skinOpacity: 0.55 }} arms={["down", "down"]} />
      <Thought x={340} y={60} rx={34} ry={24} tx={334} ty={118} seed={930} />
      <Heart x={340} y={61} s={1.3} seed={940} broken />
    </SketchFrame>
  );
}

/* ==========================================================================
   THE THREE STAGES OF PERCEPTION
   ========================================================================== */

export const STAGES = ["Exposure", "Attention", "Interpretation"];

export function PerceptionFunnel() {
  const c = 176;
  const top = (x: number) => (x <= 300 ? 70 + ((x - 40) / 260) * 40 : x <= 540 ? 110 + ((x - 300) / 240) * 46 : 156);
  const rnd = seeded(1001);
  const exposure = Array.from({ length: 36 }, (_, i) => {
    const col = i % 6;
    const row = Math.floor(i / 6);
    const x = r2(68 + col * 38 + (rnd() - 0.5) * 12);
    const h = c - top(x) - 14;
    const y = r2(c + ((row - 2.5) / 2.5) * h * 0.9 + (rnd() - 0.5) * 6);
    return { x, y, k: (i * 7) % 4 };
  });
  const attention: Pt[] = [[336, 164], [360, 190], [388, 168], [414, 188], [440, 170], [466, 190], [492, 174], [516, 186]];
  const heap1 = Array.from({ length: 14 }, (_, i) => ({ x: r2(84 + i * 13 + (rnd() - 0.5) * 5), y: 318 - (i % 2) * 9, k: (i * 3) % 4 }));
  const heap2 = Array.from({ length: 7 }, (_, i) => ({ x: 368 + i * 18, y: 318 - (i % 2) * 9 }));
  const funnel: Pt[] = sharp([[40, 70], [300, 110], [540, 156], [760, 156], [760, 196], [540, 196], [300, 242], [40, 282]], true, 2);
  const xs = [170, 420, 650];
  return (
    <SketchFrame
      id="sk-funnel"
      width={800}
      height={350}
      label="A funnel lying on its side. Stage 1, Exposure, is the wide mouth holding thirty-six small marks. Stage 2, Attention, is narrower and holds eight dots. Stage 3, Interpretation, is a thin tube holding one teal dot, with an arrow leading out. Under the first two stages, marks drop out of the funnel into two piles marked filtered out."
    >
      <Wash seed={1000} fill={SK.blush} opacity={0.35} dx={0} dy={0} pts={blobPts(400, 186, 396, 162, 1000, 18, 0.08)} />
      {xs.map((x, i) => (
        <g key={x}>
          <SketchText x={x} y={22} anchor="middle" size={10}>
            {`STAGE ${i + 1}`}
          </SketchText>
          <SketchText x={x} y={50} anchor="middle" size={22} serif>
            {STAGES[i]}
          </SketchText>
        </g>
      ))}

      <Paper pts={funnel} seed={1010} />
      <InkLine pts={funnel} seed={1011} width={1.5} closed />
      <InkLine pts={[[300, 116], [300, 236]]} seed={1012} width={0.7} />
      <InkLine pts={[[540, 161], [540, 191]]} seed={1013} width={0.7} />

      {exposure.map((p, i) => (
        <Mark key={i} x={p.x} y={p.y} k={p.k} r={5.5} seed={1020 + i * 2} />
      ))}
      {attention.map(([x, y], i) => (
        <Mark key={i} x={x} y={y} k={0} r={5.5} seed={1100 + i * 2} />
      ))}
      <Mark x={620} y={c} k={0} r={10} seed={1120} lit />
      <SketchArrow pts={[[642, c], [742, c]]} seed={1122} width={1.4} head={9} />

      {/* what falls out */}
      <SketchArrow pts={[[170, 272], [170, 298]]} seed={1130} width={1} head={6} />
      <SketchArrow pts={[[420, 230], [420, 298]]} seed={1132} width={1} head={6} />
      {heap1.map((p, i) => (
        <Mark key={i} x={p.x} y={p.y} k={p.k} r={4.5} seed={1140 + i * 2} />
      ))}
      {heap2.map((p, i) => (
        <Mark key={i} x={p.x} y={p.y} k={0} r={4.5} seed={1180 + i * 2} />
      ))}
      <SketchText x={170} y={342} anchor="middle" size={10}>
        FILTERED OUT
      </SketchText>
      <SketchText x={422} y={342} anchor="middle" size={10}>
        FILTERED OUT
      </SketchText>
    </SketchFrame>
  );
}

/* ==========================================================================
   SENSORY MARKETING · one small scene per sense (all 300 × 220, ground 196)
   ========================================================================== */

const VG = 196;


/** Sight: plain packs on a shelf; one is picked out by its colour. */
export function SightVignette() {
  const xs = [118, 156, 194, 232, 270];
  const lit = 3;
  return (
    <SketchFrame id="sk-sight" width={300} height={220} label="An eye on the left looks along a shelf of five packs. Four are plain cream; the eye's line of sight lands on the one teal pack with the brand badge.">
      <Backwash cx={156} cy={122} rx={136} ry={90} seed={1200} />
      <SenseGlyph kind="sight" x={42} y={82} s={1.3} seed={1205} />
      {xs.map((x, i) => (
        <Pack key={x} x={x} bottom={VG - 4} h={74} seed={1210 + i * 4} fill={i === lit ? SK.teal : undefined} badge={i === lit} />
      ))}
      <InkLine pts={[[94, VG - 3], [292, VG - 5]]} seed={1240} width={1.8} />
      <SketchArrow pts={curvePts([66, 74], [150, 16], [xs[lit] - 4, VG - 86], 12)} seed={1242} width={1} head={7} />
    </SketchFrame>
  );
}

/** A loudspeaker facing +x: magnet box at (x, y), cone opening to the right. */
function Speaker({ x, y, seed }: { x: number; y: number; seed: number }) {
  const box = sharp([[x - 8, y - 14], [x + 6, y - 14], [x + 6, y + 14], [x - 8, y + 14]], true, 1.5);
  const cone = rp([[x + 6, y - 12], [x + 30, y - 32], [x + 30, y + 32], [x + 6, y + 12]]);
  return (
    <g>
      <Wash pts={box} seed={seed} fill={SK.charcoal} opacity={0.7} dx={0.6} dy={0.5} />
      <InkLine pts={box} seed={seed + 1} width={1.2} closed />
      <Wash pts={cone} seed={seed + 2} fill={SK.camel} opacity={0.6} />
      <InkLine pts={cone} seed={seed + 3} width={1.2} closed />
      <InkLine pts={curvePts([x + 40, y - 14], [x + 48, y], [x + 40, y + 14], 6)} seed={seed + 4} width={1} />
      <InkLine pts={curvePts([x + 50, y - 24], [x + 62, y], [x + 50, y + 24], 8)} seed={seed + 5} width={1} />
    </g>
  );
}

/** Sound: a jingle plays in the store, and the shopper carries it in memory. */
export function SoundVignette() {
  const h = 138;
  return (
    <SketchFrame id="sk-sound" width={300} height={220} label="A loudspeaker plays music notes into a store. A shopper pushing a cart hums along: the same notes sit in a thought cloud above the shopper's head.">
      <Backwash cx={150} cy={118} rx={140} ry={90} seed={1300} />
      <Ground x0={100} x1={292} y={VG} seed={1305} />
      <Speaker x={24} y={112} seed={1310} />
      <Notes x={70} y={62} s={0.85} seed={1320} />
      <Person x={124} y={VG} h={h} seed={1330} look={{ hair: "bun", wear: SK.sky, skin: SK.camel, skinOpacity: 0.6 }} arms={["down", "low"]} />
      <Cart x={234} y={170} s={2.4} seed={1370} />
      <Thought x={206} y={40} rx={38} ry={24} tx={132} ty={58} seed={1380} />
      <Notes x={202} y={38} s={0.8} seed={1390} />
    </SketchFrame>
  );
}

/** Smell: the scent goes straight in, to the limbic system and a feeling. */
export function SmellVignette() {
  // a head in profile, facing −x: forehead, brow, nose, lips, chin, neck; then the back of the skull
  const face: Pt[] = rp([
    [204, 38], [182, 52], [174, 72], [172, 84], [160, 100], [150, 110], [160, 116], [158, 124],
    [164, 128], [159, 134], [166, 146], [182, 158], [194, 162], [196, 200],
  ]);
  const skull: Pt[] = rp([[204, 38], [238, 34], [268, 52], [280, 84], [278, 120], [264, 148], [258, 200]]);
  const head: Pt[] = [...face, ...[...skull].reverse()];
  const hair: Pt[] = rp([[196, 40], [230, 30], [264, 46], [280, 82], [279, 118], [268, 142], [258, 112], [246, 76], [222, 56], [200, 50]]);
  return (
    <SketchFrame id="sk-smell" width={300} height={220} label="A perfume bottle gives off a scent that drifts into the nose of a head in profile. An arrow runs from the nose straight to a heart inside the head, marked limbic system.">
      <Backwash cx={150} cy={116} rx={140} ry={92} seed={1400} />
      <Ground x0={14} x1={100} y={VG} seed={1405} />
      <Perfume1 x={52} bottom={VG - 2} seed={1410} />
      {[-6, 6].map((d, i) => (
        <InkLine key={d} pts={curvePts([52 + d, 122], [92 + d, 70 + i * 12], [144, 106 + i * 6], 10)} seed={1420 + i} width={1} />
      ))}

      <Wash pts={head} seed={1430} fill={SK.skin} opacity={0.5} dx={1.5} dy={1} />
      <Wash pts={hair} seed={1431} fill={SK.brown} opacity={0.6} dx={0.8} dy={0.4} />
      <InkLine pts={face} seed={1432} width={1.3} />
      <InkLine pts={skull} seed={1433} width={1.3} />
      <InkLine pts={rp([[176, 80], [184, 78]])} seed={1434} width={0.8} />

      <SketchArrow pts={rp([[164, 110], [190, 104], [210, 98]])} seed={1440} width={1.2} head={6} />
      <Heart x={226} y={96} s={1.05} seed={1445} />
      <SketchText x={228} y={128} anchor="middle" size={7.5}>
        LIMBIC SYSTEM
      </SketchText>
    </SketchFrame>
  );
}

/** Touch: holding the item makes it feel like yours. */
export function TouchVignette() {
  const h = 176;
  const hand = handAt(106, VG, h, "carry");
  return (
    <SketchFrame id="sk-touch" width={300} height={220} label="A shopper holds a teal product box close against the chest. A tag hanging from the box reads mine.">
      <Backwash cx={150} cy={118} rx={140} ry={90} seed={1500} />
      <Ground x0={50} x1={170} y={VG} seed={1505} />
      <Person x={106} y={VG} h={h} seed={1510} look={{ hair: "long", wear: SK.camel, hairTone: SK.tan }} arms={["hug", "carry"]} />
      <Box x={r2(hand[0] - 8)} bottom={r2(hand[1] + 20)} w={44} h={40} fill={SK.teal} seed={1560} />
      <InkLine pts={curvePts([hand[0] + 14, hand[1] - 10], [hand[0] + 40, hand[1] - 22], [hand[0] + 62, hand[1] - 8], 8)} seed={1570} width={0.9} />
      <Tag1 x={r2(hand[0] + 70)} y={r2(hand[1] - 8)} seed={1575} w={64}>
        MINE
      </Tag1>
    </SketchFrame>
  );
}

/** Taste: the same drink, bought again and again. */
export function TasteVignette() {
  const h = 176;
  const hand = handAt(100, VG, h, "reach");
  return (
    <SketchFrame id="sk-taste" width={300} height={220} label="A shopper puts another teal drinks can into a shopping cart that already holds four of the same teal can.">
      <Backwash cx={150} cy={118} rx={140} ry={90} seed={1600} />
      <Ground x0={40} x1={290} y={VG} seed={1605} />
      <Person x={100} y={VG} h={h} seed={1610} look={{ hair: "short", wear: SK.charcoal, legs: SK.tan, skin: SK.brown, skinOpacity: 0.45 }} arms={["down", "reach"]} />
      <Can2 x={r2(hand[0] + 2)} bottom={r2(hand[1] + 16)} w={16} seed={1660} />
      {[0, 1, 2, 3].map((i) => (
        <Can2 key={i} x={r2(186 + i * 19)} bottom={146 - (i % 2) * 3} w={16} seed={1670 + i * 4} />
      ))}
      <Cart x={206} y={170} s={2.4} seed={1700} />
    </SketchFrame>
  );
}

/* ==========================================================================
   SENSORY THRESHOLDS
   ========================================================================== */

/** A bar from (x, base) up `h` units, `w` wide: teal when lit, cream when not. */
function Bar({ x, base, h, w, seed, lit = false }: { x: number; base: number; h: number; w: number; seed: number; lit?: boolean }) {
  const pts = sharp([[x - w / 2, base - h], [x + w / 2, base - h], [x + w / 2, base], [x - w / 2, base]], true, 1.5);
  return (
    <g>
      {lit ? <Wash pts={pts} seed={seed} fill={SK.teal} opacity={0.75} dx={1} dy={0.8} /> : <Paper pts={pts} seed={seed} />}
      <InkLine pts={pts} seed={seed + 1} width={1.1} closed />
    </g>
  );
}

/** Eight stimuli of rising strength; only those above the line are detected. */
export function AbsoluteThreshold() {
  const base = 206;
  const line = 124;
  const heights = [12, 28, 46, 66, 94, 120, 146, 172];
  const bx = (i: number) => 86 + i * 42;
  return (
    <SketchFrame
      id="sk-absolute"
      width={400}
      height={262}
      label="Eight bars of stimulation rising in height from left to right. A line across them is the absolute threshold. The four bars that stop below the line are left cream, marked not detected; the four that cross it are washed teal, marked detected."
    >
      <Backwash cx={210} cy={130} rx={196} ry={124} seed={1800} />
      <SketchArrow pts={[[48, base], [48, 34]]} seed={1805} width={1.1} head={7} />
      <g transform={`translate(38 ${base - 20}) rotate(-90)`}>
        <SketchText x={0} y={0} size={9}>
          STIMULATION
        </SketchText>
      </g>
      {heights.map((h, i) => (
        <Bar key={i} x={bx(i)} base={base} h={h} w={26} seed={1810 + i * 2} lit={base - h < line} />
      ))}
      <InkLine pts={[[62, base], [390, base]]} seed={1830} width={1.3} />
      <InkLine pts={[[62, line], [390, line]]} seed={1831} width={1.6} />
      <SketchText x={66} y={line - 10} size={9}>
        ABSOLUTE THRESHOLD
      </SketchText>
      <InkLine pts={[[bx(0) - 13, base + 12], [bx(0) - 13, base + 18], [bx(3) + 13, base + 18], [bx(3) + 13, base + 12]]} seed={1835} width={0.9} amp={0.3} />
      <SketchText x={r2((bx(0) + bx(3)) / 2)} y={base + 38} anchor="middle" size={9}>
        NOT DETECTED
      </SketchText>
      <InkLine pts={[[bx(4) - 13, base + 12], [bx(4) - 13, base + 18], [bx(7) + 13, base + 18], [bx(7) + 13, base + 12]]} seed={1837} width={0.9} amp={0.3} />
      <SketchText x={r2((bx(4) + bx(7)) / 2)} y={base + 38} anchor="middle" size={9}>
        DETECTED
      </SketchText>
    </SketchFrame>
  );
}

/** From the driver's seat, the far billboard's text is too small to read. */
export function FarBillboard() {
  const hz = 132;
  const glass = rp([...curvePts([26, 30], [200, 10], [374, 30], 10), [386, 206], [14, 206]]);
  const road = rp([[150, 204], [197, hz], [203, hz], [250, 204]]);
  return (
    <SketchFrame id="sk-far-billboard" width={400} height={262} label="The view through a car windscreen: a highway runs to the horizon, and far off beside it stands a small billboard whose lines of text are too small to read. An ochre question mark hangs over it.">
      <Backwash cx={200} cy={96} rx={160} ry={66} seed={1900} fill={SK.sky} opacity={0.55} />
      <Wash pts={rp([[40, hz - 2], [200, hz - 4], [360, hz - 1], [376, 196], [200, 200], [26, 194]])} seed={1901} fill={SK.earth} opacity={0.45} dx={0} dy={0} />
      <Wash pts={road} seed={1902} fill={SK.charcoal} opacity={0.3} dx={0} dy={0} />
      <InkLine pts={[[36, hz], [164, hz - 1]]} seed={1903} width={0.9} />
      <InkLine pts={[[236, hz - 1], [366, hz + 1]]} seed={1904} width={0.9} />
      <InkLine pts={road.slice(0, 2)} seed={1905} width={1.1} />
      <InkLine pts={road.slice(2)} seed={1906} width={1.1} />
      {[0, 1, 2].map((i) => (
        <InkLine key={i} pts={rp([[200, 194 - i * 22], [200, 183 - i * 20]])} seed={1907 + i} width={1.6 - i * 0.4} amp={0.2} />
      ))}

      {/* the far billboard, its text a blur of tiny lines */}
      <InkLine pts={[[296, 124], [296, 133]]} seed={1910} width={0.8} amp={0.1} />
      <InkLine pts={[[306, 124], [306, 133]]} seed={1911} width={0.8} amp={0.1} />
      <Paper pts={sharp([[289, 113], [313, 113], [313, 124], [289, 124]], true, 0.8)} seed={1912} />
      <InkLine pts={sharp([[289, 113], [313, 113], [313, 124], [289, 124]], true, 0.8)} seed={1913} width={0.8} amp={0.1} closed />
      {[116.5, 119, 121.5].map((y, i) => (
        <InkLine key={y} pts={[[292, y], [i === 2 ? 302 : 310, y]]} seed={1914 + i} width={0.4} amp={0.1} />
      ))}
      <SketchText x={301} y={102} anchor="middle" size={22} serif fill={SK.tan}>
        ?
      </SketchText>

      <InkLine pts={glass} seed={1920} width={1.6} closed />
      {/* the dashboard edge and the top of the steering wheel */}
      <InkLine pts={[[6, 222], [394, 220]]} seed={1921} width={1.2} />
      <Wash pts={rp([...curvePts([96, 262], [150, 190], [204, 262], 10), ...curvePts([190, 262], [150, 206], [110, 262], 10)])} seed={1922} fill={SK.leather} opacity={0.8} dx={0} dy={0} />
      <InkLine pts={curvePts([96, 262], [150, 190], [204, 262], 12)} seed={1923} width={1.2} />
      <InkLine pts={curvePts([110, 262], [150, 206], [190, 262], 12)} seed={1924} width={1.1} />
    </SketchFrame>
  );
}

/** A lying bar from x0, `len` long, top at y: cream, or washed with `fill`. */
function HBar({ x0, y, len, h = 11, seed, fill }: { x0: number; y: number; len: number; h?: number; seed: number; fill?: string }) {
  const pts = sharp([[x0, y], [x0 + len, y], [x0 + len, y + h], [x0, y + h]], true, 1);
  return (
    <g>
      {fill ? <Wash pts={pts} seed={seed} fill={fill} opacity={0.8} dx={0.6} dy={0.5} /> : <Paper pts={pts} seed={seed} />}
      <InkLine pts={pts} seed={seed + 1} width={1} amp={0.3} closed />
    </g>
  );
}

/** Pairs of bars with a growing difference: the first one noticed is the JND. */
export function JndLadder() {
  const diffs = [3, 8, 18, 36];
  const x0 = 40;
  const L = 190;
  const rowY = (i: number) => 30 + i * 56;
  const jnd = 2;
  return (
    <SketchFrame
      id="sk-jnd"
      width={400}
      height={262}
      label="Four rows, each comparing two bars. The top bar of each pair is always the same length; the bottom bar is longer by a small piece that grows from row to row. The first two rows are marked same; the last two are marked different. The piece in the first row marked different is washed teal and bracketed as the JND."
    >
      <Backwash cx={200} cy={132} rx={194} ry={122} seed={2000} />
      {diffs.map((d, i) => {
        const y = rowY(i);
        const on = i >= jnd;
        return (
          <g key={d}>
            <HBar x0={x0} y={y} len={L} h={14} seed={2010 + i * 8} />
            <HBar x0={x0} y={y + 19} len={L} h={14} seed={2012 + i * 8} />
            <HBar x0={x0 + L} y={y + 19} len={d} h={14} seed={2014 + i * 8} fill={i === jnd ? SK.teal : SK.ochre} />
            <SketchText x={340} y={y + 22} anchor="middle" size={10}>
              {on ? "DIFFERENT" : "SAME"}
            </SketchText>
          </g>
        );
      })}
      <InkLine pts={rp([[x0 + L, rowY(jnd) + 38], [x0 + L, rowY(jnd) + 43], [x0 + L + diffs[jnd], rowY(jnd) + 43], [x0 + L + diffs[jnd], rowY(jnd) + 38]])} seed={2050} width={0.9} amp={0.1} />
      <SketchText x={x0 + L + diffs[jnd] + 8} y={rowY(jnd) + 48} size={10}>
        JND
      </SketchText>
    </SketchFrame>
  );
}

/* ==========================================================================
   WEBER'S LAW
   ========================================================================== */

/** The same ten per cent is a bigger piece the stronger the starting point. */
export function ProportionBars() {
  const bars = [64, 136, 272];
  const x0 = 30;
  return (
    <SketchFrame id="sk-proportion" width={400} height={214} label="Three bars of rising length, each an initial stimulus. Each ends in a teal piece one tenth of its length, marked plus ten per cent, so the piece grows as the bar grows.">
      <Backwash cx={200} cy={110} rx={192} ry={100} seed={2100} />
      {bars.map((w, i) => {
        const y = 34 + i * 58;
        return (
          <g key={w}>
            <HBar x0={x0} y={y} len={w} h={28} seed={2110 + i * 4} />
            <HBar x0={x0 + w} y={y} len={r2(w * 0.1)} h={28} seed={2112 + i * 4} fill={SK.teal} />
            <SketchText x={r2(x0 + w * 1.1 + 10)} y={y + 19} size={11}>
              +10%
            </SketchText>
          </g>
        );
      })}
      <SketchText x={x0 + 12} y={34 + 2 * 58 + 18} size={9}>
        INITIAL STIMULUS
      </SketchText>
    </SketchFrame>
  );
}

/** A wrapped candy bar centred on (x, y). */
function CandyBar({ x, y, seed }: { x: number; y: number; seed: number }) {
  const body = sharp([[x - 34, y - 13], [x + 34, y - 13], [x + 34, y + 13], [x - 34, y + 13]], true, 2);
  const endL = rp([[x - 34, y - 12], [x - 44, y - 17], [x - 42, y], [x - 44, y + 17], [x - 34, y + 12]]);
  const endR = rp([[x + 34, y - 12], [x + 44, y - 17], [x + 42, y], [x + 44, y + 17], [x + 34, y + 12]]);
  const label = sharp([[x - 14, y - 7], [x + 14, y - 7], [x + 14, y + 7], [x - 14, y + 7]], true, 1);
  return (
    <g>
      {[endL, endR].map((p, i) => (
        <g key={i}>
          <Wash pts={p} seed={seed + i} fill={SK.tan} opacity={0.6} dx={0.5} dy={0.4} />
          <InkLine pts={p} seed={seed + 2 + i} width={1} closed />
        </g>
      ))}
      <Wash pts={body} seed={seed + 4} fill={SK.camel} opacity={0.8} />
      <InkLine pts={body} seed={seed + 5} closed />
      <Paper pts={label} seed={seed + 6} />
      <InkLine pts={label} seed={seed + 7} width={0.9} closed />
    </g>
  );
}

/** One price rise of ten cents: the product, old → new price, and the bar that grows. */
function PriceRise({
  id,
  label,
  product,
  from,
  to,
  pct,
  ext,
  seed,
}: {
  id: string;
  label: string;
  product: React.ReactNode;
  from: string;
  to: string;
  pct: string;
  ext: number;
  seed: number;
}) {
  const x0 = 140;
  const L = 180;
  const y = 146;
  return (
    <SketchFrame id={id} width={400} height={234} label={label}>
      <Backwash cx={200} cy={122} rx={192} ry={108} seed={seed} />
      <SketchText x={200} y={76} anchor="middle" size={26} serif>
        {from} → {to}
      </SketchText>
      {product}
      <HBar x0={x0} y={y} len={L} h={32} seed={seed + 10} />
      {ext >= 1 ? (
        <HBar x0={x0 + L} y={y} len={ext} h={32} seed={seed + 12} fill={SK.teal} />
      ) : (
        <InkLine pts={[[x0 + L + 1, y], [x0 + L + 1, y + 32]]} seed={seed + 12} width={0.5} amp={0.1} color={SK.teal} />
      )}
      <SketchText x={r2(x0 + L + Math.max(ext, 0) + 8)} y={y + 21} size={12}>
        {pct}
      </SketchText>
    </SketchFrame>
  );
}

/** Ten cents on a one-dollar candy bar: a ten per cent jump. */
export function CandyJump() {
  return (
    <PriceRise
      id="sk-candy-jump"
      label="A candy bar whose price goes from one dollar to one dollar ten. Its price bar grows by a teal tenth, marked plus ten per cent."
      product={<g transform="translate(70 162) scale(1.25) translate(-70 -162)"><CandyBar x={70} y={162} seed={2210} /></g>}
      from="$1.00"
      to="$1.10"
      pct="+10%"
      ext={18}
      seed={2200}
    />
  );
}

/** Ten cents on a thousand-dollar laptop: a sliver nobody can see. */
export function LaptopSliver() {
  return (
    <PriceRise
      id="sk-laptop-sliver"
      label="A laptop whose price goes from one thousand dollars to one thousand dollars and ten cents. Its price bar grows by a sliver too thin to see, marked plus 0.01 per cent."
      product={<g transform="translate(70 158) scale(1.25) translate(-70 -158)"><Laptop1 x={70} y={158} seed={2310} /></g>}
      from="$1,000.00"
      to="$1,000.10"
      pct="+0.01%"
      ext={0}
      seed={2300}
    />
  );
}

/** The JND on a meter: past the mark is noticed (teal); the pointer sits at `at`. */
function JndMeter({ y, at: px, seed }: { y: number; at: number; seed: number }) {
  const track = sharp([[40, y], [360, y], [360, y + 10], [40, y + 10]], true, 2);
  return (
    <g>
      <Paper pts={track} seed={seed} />
      <Wash pts={rp([[200, y], [360, y], [360, y + 10], [200, y + 10]])} seed={seed + 1} fill={SK.teal} opacity={0.55} dx={0} dy={0} />
      <InkLine pts={track} seed={seed + 2} width={1} closed />
      <InkLine pts={[[200, y - 8], [200, y + 18]]} seed={seed + 3} width={1.6} amp={0.2} />
      <SketchText x={200} y={y + 34} anchor="middle" size={10}>
        JND
      </SketchText>
      <path d={wobble(sharp([[px, y - 2], [px - 8, y - 17], [px + 8, y - 17]], true, 1), seed + 4, 0.2, 8, true)} fill={SK.ink} />
    </g>
  );
}

/** Staying below: the pack shrinks inside its old outline; the price creeps up. */
export function StayBelow() {
  const old = sharp([[58, 30], [128, 30], [128, 160], [58, 160]], true, 2);
  const now = sharp([[66, 46], [120, 46], [120, 160], [66, 160]], true, 2);
  return (
    <SketchFrame id="sk-stay-below" width={400} height={234} label="Two small scenes. A snack pack drawn inside the pencil outline of its old, bigger size. A price tag of three ninety-nine followed by one of four oh nine. Below, a meter shows the pointer sitting just short of the JND mark.">
      <Backwash cx={200} cy={116} rx={194} ry={112} seed={2400} />
      <PencilLine pts={old} seed={2405} closed />
      <Wash pts={now} seed={2406} fill={SK.camel} opacity={0.7} />
      <InkLine pts={now} seed={2407} closed />
      <BrandBadge x={93} y={98} r={13} seed={2408} />

      <Tag1 x={228} y={58} w={80} seed={2420} size={14}>
        $3.99
      </Tag1>
      <SketchArrow pts={[[272, 80], [272, 110]]} seed={2425} width={1} head={6} />
      <Tag1 x={228} y={132} w={80} seed={2430} size={14}>
        $4.09
      </Tag1>

      <JndMeter y={192} at={178} seed={2440} />
    </SketchFrame>
  );
}

/** A starburst of `n` points centred on (x, y). */
function burstPts(x: number, y: number, R: number, n = 12): Pt[] {
  return rp(
    Array.from({ length: n * 2 }, (_, i) => {
      const a = (i * Math.PI) / n;
      const rr = i % 2 === 0 ? R : R * 0.78;
      return [x + Math.cos(a) * rr, y + Math.sin(a) * rr] as Pt;
    }),
  );
}

/** Exceeding: a bold new pack, and a discount nobody can miss. */
export function Exceed() {
  const old = sharp([[42, 104], [84, 104], [84, 160], [42, 160]], true, 2);
  const now = sharp([[112, 34], [180, 34], [180, 160], [112, 160]], true, 2);
  const burst = sharp(burstPts(300, 96, 58, 12), true, 1);
  return (
    <SketchFrame id="sk-exceed" width={400} height={234} label="Two small scenes. A small plain old pack, an arrow, and a bigger redesigned pack in bold ochre with stripes and the word new. A big ochre starburst reading minus forty per cent. Below, a meter shows the pointer far past the JND mark.">
      <Backwash cx={200} cy={116} rx={194} ry={112} seed={2500} />
      <Paper pts={old} seed={2505} />
      <InkLine pts={old} seed={2506} closed />
      <InkLine pts={rp([[50, 128], [76, 128]])} seed={2507} width={0.8} />
      <SketchArrow pts={[[92, 132], [106, 132]]} seed={2508} width={1} head={5} />
      <Wash pts={now} seed={2510} fill={SK.ochre} opacity={0.8} />
      {[62, 84].map((y, i) => (
        <InkLine key={y} pts={rp([[114, y], [178, y]])} seed={2511 + i} width={3} amp={0.4} color={SK.tan} />
      ))}
      <InkLine pts={now} seed={2515} width={1.4} closed />
      <SketchText x={146} y={132} anchor="middle" size={14}>
        NEW
      </SketchText>

      <Wash pts={burst} seed={2520} fill={SK.ochre} opacity={0.85} />
      <InkLine pts={burst} seed={2521} width={1.2} amp={0.3} closed />
      <SketchText x={302} y={104} anchor="middle" size={22}>
        −40%
      </SketchText>

      <JndMeter y={192} at={332} seed={2540} />
    </SketchFrame>
  );
}

/* ==========================================================================
   ATTENTION
   ========================================================================== */

type Clutter =
  | { kind: "ad"; x: number; y: number; w: number; h: number; tone: string }
  | { kind: "phone"; x: number; y: number; n: string }
  | { kind: "sign"; x: number; y: number; w: number; h: number; n: string };

function ClutterCard({ c, seed }: { c: Clutter; seed: number }) {
  if (c.kind === "phone") return <Phone1 x={c.x} y={c.y} n={c.n} seed={seed} />;
  const box = sharp([[c.x, c.y], [c.x + c.w, c.y], [c.x + c.w, c.y + c.h], [c.x, c.y + c.h]], true, 2);
  if (c.kind === "sign")
    return (
      <g>
        <Paper pts={box} seed={seed} />
        <InkLine pts={box} seed={seed + 1} width={1.4} closed />
        <SketchText x={r2(c.x + c.w / 2)} y={r2(c.y + c.h / 2 + 6)} anchor="middle" size={16}>
          {c.n}
        </SketchText>
      </g>
    );
  const pic = sharp([[c.x + 8, c.y + 8], [c.x + c.h - 8, c.y + 8], [c.x + c.h - 8, c.y + c.h - 8], [c.x + 8, c.y + c.h - 8]], true, 1.5);
  return (
    <g>
      <Paper pts={box} seed={seed} />
      <Wash pts={pic} seed={seed + 1} fill={c.tone} opacity={0.75} dx={0.6} dy={0.5} />
      <InkLine pts={box} seed={seed + 2} width={1.1} closed />
      <InkLine pts={rp([[c.x + c.h, c.y + 16], [c.x + c.w - 10, c.y + 16]])} seed={seed + 3} width={2} amp={0.3} />
      <InkLine pts={rp([[c.x + c.h, c.y + 28], [c.x + c.h + (c.w - c.h - 10) * 0.6, c.y + 28]])} seed={seed + 4} width={2} amp={0.3} />
    </g>
  );
}

const CLUTTER: Clutter[] = [
  { kind: "ad", x: 24, y: 20, w: 120, h: 70, tone: SK.camel },
  { kind: "phone", x: 160, y: 36, n: "12" },
  { kind: "ad", x: 220, y: 14, w: 100, h: 60, tone: SK.sky },
  { kind: "sign", x: 30, y: 110, w: 96, h: 54, n: "SALE" },
  { kind: "ad", x: 142, y: 140, w: 110, h: 64, tone: SK.tan },
  { kind: "phone", x: 272, y: 92, n: "5" },
  { kind: "phone", x: 34, y: 190, n: "99+" },
  { kind: "ad", x: 96, y: 214, w: 120, h: 54, tone: SK.sky },
  { kind: "sign", x: 232, y: 206, w: 90, h: 52, n: "NEW" },
  { kind: "ad", x: 480, y: 16, w: 104, h: 62, tone: SK.tan },
  { kind: "phone", x: 598, y: 26, n: "7" },
  { kind: "ad", x: 656, y: 14, w: 120, h: 68, tone: SK.camel },
  { kind: "sign", x: 540, y: 118, w: 104, h: 56, n: "−50%" },
  { kind: "ad", x: 676, y: 108, w: 100, h: 62, tone: SK.sky },
  { kind: "ad", x: 486, y: 196, w: 116, h: 60, tone: SK.camel },
  { kind: "phone", x: 622, y: 190, n: "34" },
  { kind: "sign", x: 686, y: 198, w: 90, h: 58, n: "BUY" },
];

export function Overload() {
  return (
    <SketchFrame id="sk-overload" width={800} height={300} label="A shopper, hands to the head, stands in a narrow gap between two walls of clutter: ads, store signs reading sale, new, buy and minus fifty per cent, and phones whose ochre notification badges read 5, 7, 12, 34 and 99-plus.">
      <Backwash cx={400} cy={150} rx={396} ry={146} seed={2600} opacity={0.35} />
      {CLUTTER.map((c, i) => (
        <ClutterCard key={i} c={c} seed={2610 + i * 8} />
      ))}
      <Ground x0={350} x1={450} y={288} seed={2760} />
      <Person x={400} y={288} h={230} seed={2770} look={{ hair: "bob", wear: SK.camel }} arms={["chin", "chin"]} />
    </SketchFrame>
  );
}

/** A mouse pointer with its tip at (x, y). */
function Pointer({ x, y, seed }: { x: number; y: number; seed: number }) {
  const pts = sharp(at(x, y, [[0, 0], [0, 30], [8, 23], [14, 35], [20, 32], [14, 21], [24, 21]]), true, 1);
  return (
    <g>
      <Paper pts={pts} seed={seed} />
      <InkLine pts={pts} seed={seed + 1} width={1.3} amp={0.3} closed />
    </g>
  );
}

/** Selective exposure: the viewer skips the ad. */
export function SkipAd() {
  const player = sharp([[36, 18], [364, 18], [364, 204], [36, 204]], true, 6);
  const button = sharp([[226, 122], [346, 122], [346, 158], [226, 158]], true, 3);
  return (
    <SketchFrame id="sk-skip-ad" width={400} height={240} label="A video player showing an ad for a product box, with a teal skip ad button in the corner and a pointer about to press it.">
      <g transform="translate(0 9)">
        <Backwash cx={200} cy={112} rx={196} ry={108} seed={2800} opacity={0.4} />
        <Wash pts={player} seed={2801} fill={SK.charcoal} opacity={0.6} />
        <InkLine pts={player} seed={2802} width={1.4} closed />
        <Box x={100} bottom={150} w={58} h={84} fill={SK.camel} seed={2810} />
        <InkLine pts={rp([[148, 64], [276, 64]])} seed={2815} width={3} amp={0.4} color={SK.paper} />
        <InkLine pts={rp([[148, 84], [236, 84]])} seed={2816} width={3} amp={0.4} color={SK.paper} />
        <InkLine pts={rp([[56, 186], [344, 186]])} seed={2817} width={3} amp={0.2} color={SK.earth} />
        <InkLine pts={rp([[56, 186], [96, 186]])} seed={2818} width={3} amp={0.2} color={SK.ochre} />
        <Wash pts={button} seed={2820} fill={SK.teal} opacity={0.95} dx={0.8} dy={0.6} />
        <InkLine pts={button} seed={2821} width={1.2} closed />
        <SketchText x={286} y={145} anchor="middle" size={13}>
          SKIP AD ›
        </SketchText>
        <Pointer x={314} y={150} seed={2830} />
      </g>
    </SketchFrame>
  );
}

/** A shop sign on a post: board centred on x, from `top`, post down to `ground`. */
function ShopSign({ x, top, ground, seed, fill, children }: { x: number; top: number; ground: number; seed: number; fill?: string; children?: React.ReactNode }) {
  const board = sharp([[x - 36, top], [x + 36, top], [x + 36, top + 54], [x - 36, top + 54]], true, 3);
  return (
    <g>
      <InkLine pts={rp([[x, top + 54], [x, ground]])} seed={seed} width={1.5} />
      {fill ? <Wash pts={board} seed={seed + 1} fill={fill} opacity={0.8} /> : <Paper pts={board} seed={seed + 1} />}
      <InkLine pts={board} seed={seed + 2} closed />
      {children}
    </g>
  );
}

/** Perceptual vigilance: the hungry person sees the restaurant sign. */
export function Vigilance() {
  const g = 226;
  const icon = 28;
  return (
    <SketchFrame id="sk-vigilance" width={400} height={240} label="A hungry person, thinking of a fork and knife, looks past a clothes shop sign and a hair salon sign to a third, teal restaurant sign with a fork and knife on it. A line of sight arcs from the person's eyes to that sign.">
      <Backwash cx={200} cy={124} rx={196} ry={112} seed={2900} />
      <Ground x0={20} x1={380} y={g} seed={2905} />
      <ShopSign x={168} top={52} ground={g} seed={2910}>
        <TShirt x={168 - icon / 2} y={79 - icon / 2} size={icon} weight="light" color={SK.ink} />
      </ShopSign>
      <ShopSign x={256} top={52} ground={g} seed={2920}>
        <Scissors x={256 - icon / 2} y={79 - icon / 2} size={icon} weight="light" color={SK.ink} />
      </ShopSign>
      <ShopSign x={344} top={52} ground={g} seed={2930} fill={SK.teal}>
        <ForkKnife x={344 - icon / 2} y={79 - icon / 2} size={icon} weight="light" color={SK.ink} />
      </ShopSign>

      <Person x={62} y={g} h={160} seed={2940} look={{ hair: "curly", wear: SK.sky, skin: SK.tan, skinOpacity: 0.55 }} arms={["down", "hip"]} />
      <Thought x={54} y={30} rx={30} ry={18} tx={62} ty={62} seed={2990} />
      <ForkKnife x={54 - 11} y={30 - 11} size={22} weight="light" color={SK.ink} />
      <SketchArrow pts={curvePts([80, 74], [210, 0], [318, 46], 16)} seed={2995} width={1} head={7} />
    </SketchFrame>
  );
}

/** A cigarette pack centred on (x, y) with its big warning label. */
function CigarettePack({ x, y, seed }: { x: number; y: number; seed: number }) {
  const body = sharp([[x - 30, y - 42], [x + 30, y - 42], [x + 30, y + 42], [x - 30, y + 42]], true, 2);
  const lid = rp([[x - 30, y - 42], [x + 30, y - 42], [x + 30, y - 24], [x - 30, y - 24]]);
  const label = sharp([[x - 25, y - 16], [x + 25, y - 16], [x + 25, y + 36], [x - 25, y + 36]], true, 1.5);
  const tri = sharp([[x, y - 8], [x + 13, y + 14], [x - 13, y + 14]], true, 1);
  return (
    <g>
      <Paper pts={body} seed={seed} />
      <Wash pts={lid} seed={seed + 1} fill={SK.charcoal} opacity={0.6} dx={0.5} dy={0.4} />
      <Wash pts={label} seed={seed + 2} fill={SK.ochre} opacity={0.85} dx={0.6} dy={0.4} />
      <InkLine pts={body} seed={seed + 3} width={1.2} closed />
      <InkLine pts={rp([[x - 30, y - 24], [x + 30, y - 24]])} seed={seed + 4} width={0.9} />
      <InkLine pts={label} seed={seed + 5} width={1} closed />
      <InkLine pts={tri} seed={seed + 6} width={1.2} amp={0.2} closed />
      <InkLine pts={rp([[x, y - 1], [x, y + 6]])} seed={seed + 7} width={1.6} amp={0.1} />
      <SketchText x={x} y={y + 29} anchor="middle" size={8}>
        WARNING
      </SketchText>
    </g>
  );
}

/** Perceptual defense: the smoker holds the pack out and looks the other way. */
export function Defense() {
  const g = 226;
  const h = 190;
  const pack = handAt(196, g, h, "reach", -1, true);
  const cig = handAt(196, g, h, "chin", 1, true);
  return (
    <SketchFrame id="sk-defense" width={400} height={240} label="A smoker holds a cigarette to the lips and turns the head away, while the other hand holds out a cigarette pack with a big ochre warning label on it, unlooked-at.">
      <Backwash cx={200} cy={124} rx={196} ry={112} seed={3000} />
      <Ground x0={110} x1={310} y={g} seed={3005} />
      <Person x={196} y={g} h={h} flip seed={3010} look={{ hair: "short", wear: SK.charcoal, legs: SK.tan, skin: SK.skin }} arms={["reach", "chin"]} />
      <CigarettePack x={r2(pack[0] + 34)} y={r2(pack[1] - 4)} seed={3060} />
      <InkLine pts={rp([[cig[0] - 2, cig[1]], [cig[0] - 18, cig[1] - 3]])} seed={3070} width={2.4} amp={0.1} color={SK.paper} />
      <InkLine pts={rp([[cig[0] - 2, cig[1] - 1.5], [cig[0] - 18, cig[1] - 4.5], [cig[0] - 18, cig[1] - 1.5], [cig[0] - 2, cig[1] + 1.5]])} seed={3071} width={0.7} amp={0.1} />
      <InkLine pts={rp([[cig[0] - 20, cig[1] - 6], [cig[0] - 26, cig[1] - 14], [cig[0] - 21, cig[1] - 22], [cig[0] - 27, cig[1] - 32]])} seed={3072} width={0.8} />
    </SketchFrame>
  );
}

/** Adaptation: the same person passes the same billboard, and notices it less each time. */
export function Adaptation() {
  const g = 188;
  const xs = [70, 200, 330];
  const labels = ["NEW", "FAMILIAR", "WITH TIME"];
  const look = { hair: "bun" as const, wear: SK.camel, skin: SK.skin };
  const phone = handAt(318, g, 124, "carry", 1, true);
  return (
    <SketchFrame id="sk-adaptation" width={400} height={240} label="The same person passes the same billboard three times along a time line. New: facing it and pointing up at it. Familiar: walking by, arms down. With time: turned away from it, looking at a phone.">
      <Backwash cx={200} cy={118} rx={196} ry={112} seed={3100} />
      {xs.map((cx, i) => (
        <g key={cx}>
          <Ground x0={cx - 56} x1={cx + 56} y={g} seed={3110 + i * 4} />
          <Billboard x0={cx + 6} x1={cx + 58} top={36} bottom={70} ground={g} seed={3130 + i * 10}>
            <BrandBadge x={cx + 32} y={53} r={10} seed={3136 + i * 10} />
          </Billboard>
        </g>
      ))}
      <Person x={48} y={g} h={124} seed={3170} look={look} arms={["down", "point"]} />
      <Person x={176} y={g} h={124} seed={3170} look={look} arms={["down", "down"]} />
      <Person x={318} y={g} h={124} flip seed={3170} look={look} arms={["down", "carry"]} />
      <Phone1 x={r2(phone[0] - 7)} y={r2(phone[1] - 17)} seed={3190} w={12} h={20} />

      <SketchArrow pts={[[20, 206], [384, 206]]} seed={3200} width={1} head={7} />
      {labels.map((t, i) => (
        <SketchText key={t} x={xs[i]} y={230} anchor="middle" size={9}>
          {t}
        </SketchText>
      ))}
    </SketchFrame>
  );
}

/* ==========================================================================
   GESTALT PRINCIPLES
   ========================================================================== */

/** Separate dots that the eye reads as one whole heart. */
export function WholeFromParts() {
  const heart = (t: number): Pt => {
    const x = 16 * Math.sin(t) ** 3;
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    return [200 + x * 6, 100 - y * 6];
  };
  const dense = Array.from({ length: 721 }, (_, i) => heart((i / 720) * Math.PI * 2));
  const acc = [0];
  for (let i = 1; i < dense.length; i++) acc.push(acc[i - 1] + Math.hypot(dense[i][0] - dense[i - 1][0], dense[i][1] - dense[i - 1][1]));
  const total = acc[acc.length - 1];
  const n = 22;
  const dots = Array.from({ length: n }, (_, k) => dense[acc.findIndex((a) => a >= (k / n) * total)]);
  return (
    <SketchFrame id="sk-whole-from-parts" width={400} height={220} label="Twenty-two separate dots with gaps between them, laid out so that together they read as one heart.">
      <Backwash cx={200} cy={112} rx={180} ry={104} seed={3300} />
      {dots.map(([x, y], i) => {
        const pts = rp(blobPts(x, y, 7, 7, 3310 + i, 9, 0.12));
        return (
          <g key={i}>
            <Wash pts={pts} seed={3310 + i} fill={i % 2 === 0 ? SK.camel : SK.tan} opacity={0.85} dx={0.8} dy={0.6} />
            <InkLine pts={pts} seed={3340 + i} width={1} amp={0.3} closed />
          </g>
        );
      })}
    </SketchFrame>
  );
}

/** Closure: a logo made of cut discs still reads as a whole triangle. */
export function Closure() {
  const c: Pt = [200, 114];
  const R = 36;
  const tips: Pt[] = [
    [200, 66],
    [242, 138],
    [158, 138],
  ];
  const card = sharp([[104, 14], [296, 14], [296, 222], [104, 222]], true, 10);
  return (
    <SketchFrame id="sk-closure" width={400} height={234} label="A brand logo on a cream card: three ochre discs, each with a wedge cut out, placed so the cut-outs line up into a triangle that is never drawn. Two short lines beneath stand for the brand name.">
      <Backwash cx={200} cy={118} rx={180} ry={110} seed={3400} />
      <Paper pts={card} seed={3401} />
      <InkLine pts={card} seed={3402} closed />
      {tips.map(([x, y], i) => {
        const a = Math.atan2(c[1] - y, c[0] - x);
        const arc = Array.from({ length: 15 }, (_, k) => {
          const t = a + Math.PI / 6 + (k / 14) * (Math.PI * 2 - Math.PI / 3);
          return [x + Math.cos(t) * R, y + Math.sin(t) * R] as Pt;
        });
        const pts = rp([[x, y], ...arc]);
        return (
          <g key={i}>
            <Wash pts={pts} seed={3410 + i * 3} fill={SK.ochre} opacity={0.85} dx={0.8} dy={0.6} />
            <InkLine pts={sharp(pts, true, 1)} seed={3411 + i * 3} width={1.2} amp={0.3} closed />
          </g>
        );
      })}
      <InkLine pts={[[146, 194], [254, 194]]} seed={3430} width={3} amp={0.4} />
      <InkLine pts={[[166, 207], [234, 207]]} seed={3431} width={1.6} amp={0.4} />
    </SketchFrame>
  );
}

/** Similarity: evenly spaced packs still group by shared colour and shape. */
export function Similarity() {
  const cols = 8;
  const rows = 3;
  const group = (c: number) => (c < 3 ? 0 : c < 5 ? 1 : 2);
  const tone = [SK.camel, SK.charcoal, SK.sky];
  const shelf = (r: number) => 78 + r * 70;
  return (
    <SketchFrame id="sk-similarity" width={400} height={234} label="A shelf of twenty-four evenly spaced packs in three rows. The three left columns are camel boxes, the middle two are dark round tins, the right three are pale blue tall bottles, so the eye sees three blocks.">
      <Backwash cx={200} cy={118} rx={196} ry={112} seed={3500} />
      {Array.from({ length: rows }, (_, r) => (
        <g key={r}>
          {Array.from({ length: cols }, (_, c) => {
            const x = 44 + c * 44;
            const b = shelf(r) - 2;
            const g = group(c);
            const sd = 3510 + r * 40 + c * 4;
            const pts =
              g === 0
                ? sharp([[x - 14, b - 48], [x + 14, b - 48], [x + 14, b], [x - 14, b]], true, 1.5)
                : g === 1
                  ? rp(blobPts(x, b - 17, 16, 17, sd, 12, 0.04))
                  : sharp([[x - 10, b], [x - 10, b - 34], [x - 4, b - 42], [x - 4, b - 54], [x + 4, b - 54], [x + 4, b - 42], [x + 10, b - 34], [x + 10, b]], true, 1);
            return (
              <g key={c}>
                <Wash pts={pts} seed={sd} fill={tone[g]} opacity={g === 1 ? 0.6 : 0.8} dx={0.8} dy={0.6} />
                <InkLine pts={pts} seed={sd + 1} width={1.1} closed />
              </g>
            );
          })}
          <InkLine pts={[[22, shelf(r)], [378, shelf(r)]]} seed={3500 + r * 3} width={1.8} />
        </g>
      ))}
    </SketchFrame>
  );
}

/** Figure-ground: a dark vase, or two pale faces looking at each other. */
export function FigureGround() {
  // the right-hand profile (a face looking left); the left side mirrors it
  const edge: Pt[] = [
    [70, 20], [64, 50], [56, 80], [62, 94], [22, 120], [40, 130], [32, 142],
    [42, 152], [32, 162], [50, 178], [36, 196], [60, 214], [70, 230],
  ];
  const cx = 200;
  const right = edge.map(([dx, y]) => [cx + dx, y] as Pt);
  const left = [...edge].reverse().map(([dx, y]) => [cx - dx, y] as Pt);
  const vase = rp([...right, ...left]);
  const panel = sharp([[84, 20], [316, 20], [316, 230], [84, 230]], true, 2);
  return (
    <SketchFrame id="sk-figure-ground" width={400} height={234} label="The classic vase-and-faces picture: a dark vase in the middle of a cream panel, whose two edges are also the profiles of two pale faces looking at each other.">
      <Backwash cx={200} cy={117} rx={180} ry={110} seed={3600} />
      <g transform="translate(12.8 0) scale(0.936)">
        <Paper pts={panel} seed={3601} />
        <Wash pts={vase} seed={3602} fill={SK.charcoal} opacity={0.8} dx={1} dy={0} />
        <InkLine pts={right} seed={3603} width={1.3} amp={0.5} />
        <InkLine pts={[...left].reverse()} seed={3604} width={1.3} amp={0.5} />
        <InkLine pts={panel} seed={3605} closed />
      </g>
    </SketchFrame>
  );
}

/* ==========================================================================
   SEMIOTICS
   ========================================================================== */

/** A bald eagle, wings spread wide, head turned in profile; (x, y) is its body centre. */
function Eagle({ x, y, s = 1, seed }: { x: number; y: number; s?: number; seed: number }) {
  const wingR: Pt[] = [[6, -10], [30, -22], [56, -28], [78, -26], [90, -18], [82, -14], [90, -9], [80, -6], [86, -1], [74, 0], [78, 5], [62, 4], [40, 6], [12, 10]];
  const wingL: Pt[] = wingR.map(([px, py]) => [-px, py] as Pt).reverse();
  const body = rp(blobPts(x, y + 6 * s, 13 * s, 24 * s, seed, 12, 0.05));
  const head = at(x, y, [[-8, -14], [-7, -28], [0, -35], [9, -31], [10, -20], [7, -12]], s);
  const beak = at(x, y, [[-6, -30], [-16, -28], [-18, -22], [-12, -23], [-6, -22]], s);
  const tail = at(x, y, [[-9, 26], [9, 26], [15, 46], [0, 50], [-15, 46]], s);
  return (
    <g>
      {[wingL, wingR].map((w, i) => (
        <g key={i}>
          <Wash pts={at(x, y, w, s)} seed={seed + 1 + i} fill={SK.brown} opacity={0.72} />
          <InkLine pts={at(x, y, w, s)} seed={seed + 3 + i} width={1.1} closed />
        </g>
      ))}
      <Paper pts={tail} seed={seed + 5} />
      <InkLine pts={tail} seed={seed + 6} width={1.1} closed />
      <Wash pts={body} seed={seed + 7} fill={SK.brown} opacity={0.8} />
      <InkLine pts={body} seed={seed + 8} closed />
      <Paper pts={head} seed={seed + 9} />
      <InkLine pts={head} seed={seed + 10} width={1.1} closed />
      <Wash pts={beak} seed={seed + 11} fill={SK.ochre} opacity={0.95} dx={0.4} dy={0.3} />
      <InkLine pts={beak} seed={seed + 12} width={1} closed />
      <path d={wobble(rp(blobPts(x - 2 * s, y - 27 * s, 1.5 * s, 1.5 * s, seed + 13, 6, 0.1)), seed + 13, 0.1, 4, true)} fill={SK.ink} />
      <InkLine pts={at(x, y, [[-5, 28], [-7, 36]], s)} seed={seed + 14} width={1.4} color={SK.tan} />
      <InkLine pts={at(x, y, [[5, 28], [7, 36]], s)} seed={seed + 15} width={1.4} color={SK.tan} />
    </g>
  );
}

export function SemioticTriangle() {
  const card = sharp([[304, 30], [496, 30], [496, 186], [304, 186]], true, 3);
  return (
    <SketchFrame
      id="sk-semiotic"
      width={800}
      height={448}
      label="A triangle of three parts. Bottom left, the object: a luxury watch with a gold bezel. Top, the sign: an ad card showing a bald eagle soaring. Bottom right, the interpretant: a person standing tall and confident on a pale sky wash, with freedom and prestige written beneath. Arrows run from the watch up to the eagle ad and from the ad down to the person."
    >
      <Backwash cx={400} cy={224} rx={396} ry={212} seed={3700} opacity={0.35} />

      <Watch1 x={170} y={292} s={1.1} seed={3710} />
      <SketchText x={170} y={406} anchor="middle" size={17}>
        OBJECT
      </SketchText>

      <Paper pts={card} seed={3740} />
      <InkLine pts={card} seed={3741} width={1.3} closed />
      <Eagle x={400} y={98} s={0.94} seed={3750} />
      <SketchText x={510} y={114} size={17}>
        SIGN
      </SketchText>

      <Backwash cx={630} cy={296} rx={78} ry={96} seed={3770} fill={SK.sky} opacity={0.6} />
      <Person x={630} y={372} h={176} seed={3780} look={{ hair: "long", wear: SK.charcoal, hairTone: SK.brown, legs: SK.charcoal, outfit: "coat" }} arms={["hip", "hip"]} />
      <Ground x0={570} x1={690} y={372} seed={3830} />
      <SketchText x={630} y={404} anchor="middle" size={17}>
        INTERPRETANT
      </SketchText>
      <SketchText x={630} y={430} anchor="middle" size={20} serif>
        freedom and prestige
      </SketchText>

      <SketchArrow pts={curvePts([214, 236], [240, 170], [292, 150], 10)} seed={3840} />
      <SketchArrow pts={curvePts([508, 150], [566, 170], [596, 200], 10)} seed={3843} />
    </SketchFrame>
  );
}

/* ==========================================================================
   DISCUSSION
   ========================================================================== */


export function SensorySignatures() {
  const card = sharp([[305, 88], [495, 88], [495, 218], [305, 218]], true, 10);
  const cues: { x: number; y: number; t: string }[] = [
    { x: 120, y: 134, t: "SIGNATURE SCENT" },
    { x: 120, y: 276, t: "DISTINCT JINGLE" },
    { x: 680, y: 134, t: "UNIQUE BOTTLE SHAPE" },
    { x: 680, y: 276, t: "SPECIFIC COLOR" },
  ];
  const swatch = sharp([[652, 206], [708, 206], [708, 250], [652, 250]], true, 3);
  return (
    <SketchFrame
      id="sk-signatures"
      width={800}
      height={296}
      label="A blank brand card in the middle holding only a question mark: no name and no logo. Four cues point to it: a signature scent (a perfume bottle), a distinct jingle (music notes), a unique bottle shape (a waisted, contoured bottle) and a specific color (an ochre swatch)."
    >
      <Backwash cx={400} cy={150} rx={396} ry={136} seed={3900} opacity={0.35} />
      <Perfume1 x={120} bottom={114} seed={3910} />
      <Notes x={116} y={234} s={1.4} seed={3920} />
      <ShapedBottle x={680} bottom={114} seed={3930} />
      <Wash pts={swatch} seed={3940} fill={SK.ochre} opacity={0.9} />
      <InkLine pts={swatch} seed={3941} closed />
      {cues.map((c) => (
        <SketchText key={c.t} x={c.x} y={c.y} anchor="middle" size={12}>
          {c.t}
        </SketchText>
      ))}
      {cues.map((c, i) => {
        const left = c.x < 400;
        const top = c.y < 200;
        const p0: Pt = [left ? c.x + 60 : c.x - 60, top ? 84 : 230];
        const p1: Pt = [left ? 296 : 504, top ? 124 : 184];
        return <SketchArrow key={i} pts={rp([p0, p1])} seed={3950 + i * 3} width={1.1} head={8} />;
      })}

      <Paper pts={card} seed={3970} />
      <InkLine pts={card} seed={3971} width={1.4} closed />
      <SketchText x={400} y={176} anchor="middle" size={64} serif fill={SK.tan}>
        ?
      </SketchText>
      <SketchText x={400} y={246} anchor="middle" size={13}>
        BRAND RECALL
      </SketchText>
    </SketchFrame>
  );
}
