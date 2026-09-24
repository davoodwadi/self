/* ==========================================================================
   Consumer Behavior · Week 04 — plates (Editorial Sketch)
   --------------------------------------------------------------------------
   Motivation, needs and values, drawn in ink and watercolour with the shared
   kit in ../_visuals (see ../CLAUDE.md for the style rules).

   Fixed cast for this week:
     · Gauge: a glass tube that fills with a tan wash. It is tension, the
       drive, hunger or thirst, conflict: whatever pushes the buyer to act.
     · Person: every human. A desired or better state is the same Person,
       upgraded (upright, a sharper coat, the product in hand) on a sky wash.
     · BrandBadge: the brand and its offer, on a pack or a card.
     · Heart: a feeling or what matters to the consumer.
   Teal is the one thing chosen, reached or ticked on a plate; pencil is only
   for something absent (an option not taken, a product not yet chosen).
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
  BrandBadge,
  Can3,
  Car2,
  Clock,
  curvePts,
  Glass2,
  Ground,
  handAt,
  Heart,
  type Look,
  Magnifier,
  Pack,
  PayCard,
  Person,
  Phone2,
  rp,
  Screen,
  sharp,
  Shoe,
  SketchArrow,
  Star,
  Suitcase1,
  Tag2,
  Thought,
  Tick1,
} from "../_visuals/objects";

/* -- the week's cast ------------------------------------------------------- */

/** The shopper this week: the same face and hair on every plate. */
const PLAIN: Look = { hair: "bob", wear: SK.earth, legs: SK.charcoal, outfit: "coat" };
const BETTER: Look = { hair: "bob", wear: SK.camel, legs: SK.charcoal, outfit: "coat" };

/** A capsule outline, `w` wide and `h` tall, with its top at (x, top). */
function capsule(x: number, top: number, w: number, h: number): Pt[] {
  const r = w / 2;
  const arc = (cy: number, a0: number) =>
    Array.from({ length: 7 }, (_, i) => {
      const a = a0 + (i / 6) * Math.PI;
      return [x + Math.cos(a) * r, cy + Math.sin(a) * r] as Pt;
    });
  return rp([...arc(top + r, Math.PI), ...arc(top + h - r, 0)]);
}

/**
 * The tension tube: a glass gauge filled from the bottom with a tan wash to
 * `level` (0–1). Everything that pushes a buyer to act is drawn as this.
 */
function Gauge({
  x,
  top,
  h = 130,
  w = 30,
  level,
  seed,
  label,
}: {
  x: number;
  top: number;
  h?: number;
  w?: number;
  level: number;
  seed: number;
  label?: string;
}) {
  const inset = 5;
  const fh = r2(Math.max((h - inset * 2) * level, w - inset * 2));
  const fill = capsule(x, r2(top + h - inset - fh), w - inset * 2, fh);
  return (
    <g>
      <Paper pts={capsule(x, top, w, h)} seed={seed} />
      <Wash pts={fill} seed={seed + 1} fill={SK.tan} opacity={0.7} dx={0.6} dy={0.4} />
      <InkLine pts={capsule(x, top, w, h)} seed={seed + 2} closed />
      {[0.25, 0.5, 0.75].map((f, i) => (
        <InkLine
          key={f}
          pts={rp([
            [x + w / 2 + 4, top + h * (1 - f)],
            [x + w / 2 + 11, top + h * (1 - f)],
          ])}
          seed={seed + 3 + i}
          width={0.9}
          amp={0.2}
        />
      ))}
      {label ? (
        <SketchText x={x} y={r2(top + h + 22)} anchor="middle" size={11}>
          {label}
        </SketchText>
      ) : null}
    </g>
  );
}

/** A dumbbell, centred on (x, y), `s` = scale (about 70 units wide at 1). */
function Dumbbell({ x, y, s = 1, seed }: { x: number; y: number; s?: number; seed: number }) {
  const plate = (cx: number, hw: number, hh: number) => sharp(at(x, y, [[cx - hw, -hh], [cx + hw, -hh], [cx + hw, hh], [cx - hw, hh]], s), true, 1.2);
  return (
    <g>
      <InkLine pts={at(x, y, [[-24, 0], [24, 0]], s)} seed={seed} width={2.4} amp={0.3} />
      {[-29, 29].map((cx, i) => (
        <g key={cx}>
          <Wash pts={plate(cx, 5, 14)} seed={seed + 1 + i} fill={SK.charcoal} opacity={0.7} dx={0.6} dy={0.4} />
          <InkLine pts={plate(cx, 5, 14)} seed={seed + 3 + i} width={1.1} amp={0.3} closed />
        </g>
      ))}
    </g>
  );
}

/** A small round head in a crowd, for a group of friends. */
function Face({ x, y, r = 7, seed, hair = SK.brown, skin = SK.skin }: { x: number; y: number; r?: number; seed: number; hair?: string; skin?: string }) {
  const head = rp(blobPts(x, y, r, r * 1.1, seed, 10, 0.06));
  const top = rp([[x - r, y - 1], [x - r * 0.8, y - r * 0.9], [x, y - r * 1.25], [x + r * 0.8, y - r * 0.9], [x + r, y - 1], [x + r * 0.2, y - r * 0.55]]);
  return (
    <g>
      <Wash pts={head} seed={seed + 1} fill={skin} opacity={0.75} dx={0.5} dy={0.4} />
      <Wash pts={top} seed={seed + 2} fill={hair} opacity={0.75} dx={0.3} dy={0} />
      <InkLine pts={head} seed={seed + 3} width={0.9} closed />
    </g>
  );
}

/** A target: the goal a consumer holds. */
function Target({ x, y, r = 18, seed }: { x: number; y: number; r?: number; seed: number }) {
  return (
    <g>
      <Wash pts={rp(blobPts(x, y, r * 0.36, r * 0.36, seed, 9, 0.08))} seed={seed} fill={SK.ochre} opacity={0.9} dx={0.4} dy={0.3} />
      {[1, 0.66, 0.34].map((k, i) => (
        <InkLine key={k} pts={rp(blobPts(x, y, r * k, r * k, seed + 1 + i, 12, 0.04))} seed={seed + 1 + i} width={1.1} closed />
      ))}
    </g>
  );
}

/** A small round dot, the end of a link. */
function Dot({ x, y, r = 3.4, seed, fill = SK.ink }: { x: number; y: number; r?: number; seed: number; fill?: string }) {
  return <Wash pts={rp(blobPts(x, y, r, r, seed, 8, 0.1))} seed={seed} fill={fill} opacity={1} dx={0} dy={0} />;
}

/** A bowl of hot food; (x, y) is the middle of its rim, `w` its width. */
function FoodBowl({ x, y, w = 80, seed, steam = true }: { x: number; y: number; w?: number; seed: number; steam?: boolean }) {
  const h = w / 2;
  const bowl = rp([
    ...Array.from({ length: 9 }, (_, i) => {
      const a = (i / 8) * Math.PI;
      return [x + Math.cos(a) * (w / 2), y + Math.sin(a) * h * 0.9] as Pt;
    }),
  ]);
  const food = rp(blobPts(x, y - 2, w * 0.4, h * 0.36, seed, 12, 0.12).filter(([, py]) => py <= y + 1));
  return (
    <g>
      {steam
        ? [-0.22, 0, 0.22].map((k, i) => (
            <InkLine
              key={k}
              pts={rp([
                [x + k * w, y - h * 0.5],
                [x + k * w - 5, y - h * 0.75],
                [x + k * w + 3, y - h * 1],
                [x + k * w - 3, y - h * 1.25],
              ])}
              seed={seed + 10 + i}
              width={0.9}
            />
          ))
        : null}
      <Wash pts={food} seed={seed + 1} fill={SK.ochre} opacity={0.75} dx={0.6} dy={0.4} />
      <InkLine pts={food} seed={seed + 2} width={0.9} />
      <Wash pts={bowl} seed={seed + 3} fill={SK.sky} opacity={0.7} dx={1} dy={0.8} />
      <InkLine pts={bowl} seed={seed + 4} closed />
    </g>
  );
}

/** A trophy; (x, y) is the middle of the cup's rim, `s` its scale. */
function Trophy({ x, y, s = 1, seed }: { x: number; y: number; s?: number; seed: number }) {
  const cup = at(x, y, [[-30, 0], [30, 0], [28, 22], [18, 40], [6, 48], [-6, 48], [-18, 40], [-28, 22]], s);
  const base = sharp(at(x, y, [[-24, 66], [24, 66], [24, 76], [-24, 76]], s), true, 1.5);
  return (
    <g>
      <InkLine pts={at(x, y, [[-29, 8], [-46, 8], [-44, 26], [-22, 36]], s)} seed={seed} width={1.3} />
      <InkLine pts={at(x, y, [[29, 8], [46, 8], [44, 26], [22, 36]], s)} seed={seed + 1} width={1.3} />
      <Wash pts={cup} seed={seed + 2} fill={SK.ochre} opacity={0.8} dx={1} dy={0.8} />
      <InkLine pts={cup} seed={seed + 3} closed />
      <InkLine pts={at(x, y, [[-4, 48], [-4, 66]], s)} seed={seed + 4} width={1.1} amp={0.2} />
      <InkLine pts={at(x, y, [[4, 48], [4, 66]], s)} seed={seed + 5} width={1.1} amp={0.2} />
      <Wash pts={base} seed={seed + 6} fill={SK.leather} opacity={0.75} dx={0.6} dy={0.5} />
      <InkLine pts={base} seed={seed + 7} width={1.1} closed />
    </g>
  );
}

/** A hand-drawn cross: a condition not met. */
function Cross({ x, y, s = 1, seed }: { x: number; y: number; s?: number; seed: number }) {
  return (
    <g>
      <InkLine pts={at(x, y, [[-5, -5], [5, 5]], s)} seed={seed} width={r2(1.8 * s)} amp={0.2} />
      <InkLine pts={at(x, y, [[-5, 5], [5, -5]], s)} seed={seed + 1} width={r2(1.8 * s)} amp={0.2} />
    </g>
  );
}

/** A burger in side view, centred on (x, y); about 60 units wide at s = 1. */
function Burger({ x, y, s = 1, seed, pencil = false }: { x: number; y: number; s?: number; seed: number; pencil?: boolean }) {
  const bun = at(x, y, [[-30, -6], [-28, -18], [-16, -28], [0, -31], [16, -28], [28, -18], [30, -6]], s);
  const patty = sharp(at(x, y, [[-31, 0], [31, 0], [31, 9], [-31, 9]], s), true, 3);
  const base = at(x, y, [[-29, 12], [29, 12], [26, 22], [-26, 22]], s);
  const leaf = at(x, y, [[-32, -3], [-22, 1], [-12, -3], [-2, 1], [8, -3], [18, 1], [28, -3], [33, 0]], s);
  if (pencil) {
    return (
      <g>
        <PencilLine pts={[...bun, bun[0]]} seed={seed} />
        <PencilLine pts={patty} seed={seed + 1} closed />
        <PencilLine pts={base} seed={seed + 2} closed />
      </g>
    );
  }
  return (
    <g>
      <Wash pts={bun} seed={seed} fill={SK.ochre} opacity={0.8} />
      <InkLine pts={[...bun, bun[0]]} seed={seed + 1} />
      <InkLine pts={leaf} seed={seed + 2} width={1} color={SK.teal} />
      <Wash pts={patty} seed={seed + 3} fill={SK.leather} opacity={0.8} dx={0.8} dy={0.4} />
      <InkLine pts={patty} seed={seed + 4} closed />
      <Wash pts={base} seed={seed + 5} fill={SK.ochre} opacity={0.75} />
      <InkLine pts={base} seed={seed + 6} closed />
    </g>
  );
}

/** A bowl of rice with chopsticks; (x, y) is the middle of the rim. */
function RiceBowl({ x, y, s = 1, seed, pencil = false }: { x: number; y: number; s?: number; seed: number; pencil?: boolean }) {
  const bowl = at(x, y, Array.from({ length: 9 }, (_, i) => {
    const a = (i / 8) * Math.PI;
    return [Math.cos(a) * 30, Math.sin(a) * 24] as Pt;
  }), s);
  const rice = at(x, y, [[-26, 0], [-20, -12], [-6, -18], [8, -18], [20, -12], [26, 0]], s);
  const sticks = [at(x, y, [[4, -12], [40, -44]], s), at(x, y, [[12, -10], [46, -36]], s)];
  if (pencil) {
    return (
      <g>
        <PencilLine pts={bowl} seed={seed} closed />
        <PencilLine pts={rice} seed={seed + 1} />
        {sticks.map((st, i) => <PencilLine key={i} pts={st} seed={seed + 2 + i} />)}
      </g>
    );
  }
  return (
    <g>
      {sticks.map((st, i) => <InkLine key={i} pts={st} seed={seed + 2 + i} width={1.6} amp={0.2} />)}
      <Paper pts={rice} seed={seed + 4} />
      <InkLine pts={rice} seed={seed + 5} width={0.9} />
      <Wash pts={bowl} seed={seed + 6} fill={SK.sky} opacity={0.8} />
      <InkLine pts={bowl} seed={seed + 7} closed />
    </g>
  );
}

/** A slice of pizza pointing down; (x, y) is the middle of the crust. */
function Pizza({ x, y, s = 1, seed, pencil = false, upright = false }: { x: number; y: number; s?: number; seed: number; pencil?: boolean; upright?: boolean }) {
  const k = upright ? -1 : 1;
  const P = (pts: Pt[]) => at(x, y, pts.map(([px, py]) => [px * k, py * k] as Pt), s);
  const slice = P([[-28, 0], [-14, -4], [0, -5], [14, -4], [28, 0], [0, 50]]);
  const crust = P([[-29, 1], [-14, -4], [0, -5], [14, -4], [29, 1]]);
  if (pencil) {
    return (
      <g>
        <PencilLine pts={slice} seed={seed} closed />
      </g>
    );
  }
  return (
    <g>
      <Wash pts={slice} seed={seed} fill={SK.ochre} opacity={0.7} />
      <InkLine pts={slice} seed={seed + 1} closed />
      <InkLine pts={crust} seed={seed + 2} width={4} color={SK.tan} amp={0.3} />
      {[[-10, 12], [8, 10], [-1, 28]].map(([px, py], i) => (
        <g key={i}>
          <Wash pts={rp(blobPts(x + px * k * s, y + py * k * s, 5 * s, 5 * s, seed + 3 + i, 8, 0.1))} seed={seed + 3 + i} fill={SK.leather} opacity={0.8} dx={0.3} dy={0.3} />
        </g>
      ))}
    </g>
  );
}

/** A padlock centred on its body at (x, y). */
function Padlock({ x, y, s = 1, seed }: { x: number; y: number; s?: number; seed: number }) {
  const body = sharp(at(x, y, [[-12, -8], [12, -8], [12, 12], [-12, 12]], s), true, 2);
  const shackle = at(x, y, Array.from({ length: 9 }, (_, i) => {
    const a = Math.PI + (i / 8) * Math.PI;
    return [Math.cos(a) * 8, -8 + Math.sin(a) * 10] as Pt;
  }), s);
  return (
    <g>
      <InkLine pts={shackle} seed={seed} width={2} amp={0.2} />
      <Wash pts={body} seed={seed + 1} fill={SK.ochre} opacity={0.85} dx={0.5} dy={0.4} />
      <InkLine pts={body} seed={seed + 2} width={1.2} closed />
      <InkLine pts={at(x, y, [[0, 0], [0, 5]], s)} seed={seed + 3} width={1.6} amp={0.1} />
    </g>
  );
}

/** A bottle standing on (x, bottom), in pencil when not chosen. */
function Bottle({ x, bottom, h = 80, seed, pencil = false }: { x: number; bottom: number; h?: number; seed: number; pencil?: boolean }) {
  const k = h / 80;
  const pts = at(x, bottom, [[-16, 0], [-16, -46], [-7, -60], [-6, -80], [6, -80], [7, -60], [16, -46], [16, 0]], k);
  return pencil ? (
    <PencilLine pts={pts} seed={seed} closed />
  ) : (
    <g>
      <Wash pts={pts} seed={seed} fill={SK.teal} opacity={0.6} />
      <InkLine pts={pts} seed={seed + 1} closed />
    </g>
  );
}

/**
 * A five-tier pyramid, apex at (x, top), base at `base`, `half` = half the
 * base width. `fills` washes each tier from the bottom (0) up; `lit` tiers
 * take the teal wash instead.
 */
function Pyramid({
  x,
  top,
  base,
  half,
  seed,
  fills = [],
  lit = [],
  line = 1.3,
}: {
  x: number;
  top: number;
  base: number;
  half: number;
  seed: number;
  fills?: (string | null)[];
  lit?: number[];
  line?: number;
}) {
  const th = (base - top) / 5;
  const hw = (yy: number) => (half * (yy - top)) / (base - top);
  return (
    <g>
      {Array.from({ length: 5 }, (_, i) => {
        const yb = base - i * th;
        const yt = yb - th;
        const pts = rp(
          i === 4
            ? [[x - hw(yb), yb], [x + hw(yb), yb], [x, yt]]
            : [[x - hw(yb), yb], [x + hw(yb), yb], [x + hw(yt), yt], [x - hw(yt), yt]],
        );
        const on = lit.includes(i);
        const fill = on ? SK.teal : fills[i];
        return (
          <g key={i}>
            <Paper pts={pts} seed={seed + i * 4} />
            {fill ? <Wash pts={pts} seed={seed + i * 4 + 1} fill={fill} opacity={on ? 0.7 : 0.45} dx={1.5} dy={1} /> : null}
            <InkLine pts={i === 4 ? pts : pts.slice(0, 3)} seed={seed + i * 4 + 2} width={line} closed={i === 4} />
          </g>
        );
      })}
      <InkLine pts={rp([[x - half, base], [x, top]])} seed={seed + 30} width={line} />
    </g>
  );
}

/**
 * An option as a token: `plus` (attractive, an ochre wash), `minus` (unwanted,
 * a charcoal wash), or `both`, split down the middle.
 */
function Option({ x, y, r = 30, kind, seed }: { x: number; y: number; r?: number; kind: "plus" | "minus" | "both"; seed: number }) {
  const disc = rp(blobPts(x, y, r, r, seed, 16, 0.04));
  const b = r * 0.36;
  const plus = (cx: number, color: string, k: number) => (
    <g>
      <InkLine pts={rp([[cx - b, y], [cx + b, y]])} seed={seed + k} width={3} amp={0.2} color={color} />
      <InkLine pts={rp([[cx, y - b], [cx, y + b]])} seed={seed + k + 1} width={3} amp={0.2} color={color} />
    </g>
  );
  const minus = (cx: number, color: string, k: number) => (
    <InkLine pts={rp([[cx - b, y], [cx + b, y]])} seed={seed + k} width={3} amp={0.2} color={color} />
  );
  if (kind === "both") {
    const half = (a0: number) =>
      rp(Array.from({ length: 9 }, (_, i) => {
        const a = a0 + (i / 8) * Math.PI;
        return [x + Math.cos(a) * r, y + Math.sin(a) * r] as Pt;
      }));
    return (
      <g>
        <Wash pts={half(Math.PI / 2)} seed={seed + 1} fill={SK.ochre} opacity={0.85} dx={0} dy={0} />
        <Wash pts={half(-Math.PI / 2)} seed={seed + 2} fill={SK.charcoal} opacity={0.75} dx={0} dy={0} />
        <InkLine pts={disc} seed={seed + 3} closed />
        <InkLine pts={rp([[x, y - r], [x, y + r]])} seed={seed + 4} width={1} />
        {plus(x - r / 2, SK.ink, 5)}
        {minus(x + r / 2, SK.paper, 7)}
      </g>
    );
  }
  return (
    <g>
      <Wash pts={disc} seed={seed + 1} fill={kind === "plus" ? SK.ochre : SK.charcoal} opacity={kind === "plus" ? 0.85 : 0.75} />
      <InkLine pts={disc} seed={seed + 3} closed />
      {kind === "plus" ? plus(x, SK.ink, 5) : minus(x, SK.paper, 5)}
    </g>
  );
}

/** A wallet centred on (x, y) with `coins` ochre coins peeking out of the top. */
function Wallet({ x, y, s = 1, coins = 1, seed }: { x: number; y: number; s?: number; coins?: number; seed: number }) {
  const body = sharp(at(x, y, [[-34, -22], [34, -22], [34, 24], [-34, 24]], s), true, 5 * s);
  const flap = sharp(at(x, y, [[8, -8], [36, -8], [36, 10], [8, 10]], s), true, 3 * s);
  return (
    <g>
      {Array.from({ length: coins }, (_, i) => {
        const c = rp(blobPts(x + (i - (coins - 1) / 2) * 22 * s, y - 26 * s, 11 * s, 11 * s, seed + i, 12, 0.04));
        return (
          <g key={i}>
            <Wash pts={c} seed={seed + 10 + i} fill={SK.ochre} opacity={0.9} dx={0.5} dy={0.4} />
            <InkLine pts={c} seed={seed + 20 + i} width={1.1} closed />
          </g>
        );
      })}
      <Wash pts={body} seed={seed + 30} fill={SK.leather} opacity={0.8} />
      <InkLine pts={body} seed={seed + 31} closed />
      <Wash pts={flap} seed={seed + 32} fill={SK.tan} opacity={0.8} dx={0.5} dy={0.4} />
      <InkLine pts={flap} seed={seed + 33} width={1.1} closed />
    </g>
  );
}

/** A pack of gum lying flat on (x, bottom). */
function Gum({ x, bottom, s = 1, seed }: { x: number; bottom: number; s?: number; seed: number }) {
  const pack = sharp(at(x, bottom, [[-24, -16], [24, -16], [24, 0], [-24, 0]], s), true, 2);
  return (
    <g>
      <Wash pts={pack} seed={seed} fill={SK.ochre} opacity={0.7} />
      <InkLine pts={pack} seed={seed + 1} width={1.2} closed />
      <InkLine pts={at(x, bottom, [[-10, -16], [-10, 0]], s)} seed={seed + 2} width={0.8} />
    </g>
  );
}

/** A LOW–HIGH track with a marker at `level`. */
function Meter({ x1, x2, y, level, seed }: { x1: number; x2: number; y: number; level: number; seed: number }) {
  const mx = r2(x1 + (x2 - x1) * level);
  const track = sharp([[x1, y - 4], [x2, y - 4], [x2, y + 4], [x1, y + 4]], true, 3);
  return (
    <g>
      <Paper pts={track} seed={seed} />
      <Wash pts={rp([[x1, y - 4], [mx, y - 4], [mx, y + 4], [x1, y + 4]])} seed={seed + 1} fill={SK.ochre} opacity={0.9} dx={0} dy={0} />
      <InkLine pts={track} seed={seed + 2} width={1} closed />
      <Paper pts={rp(blobPts(mx, y, 7, 7, seed + 3, 10, 0.05))} seed={seed + 3} />
      <InkLine pts={rp(blobPts(mx, y, 7, 7, seed + 4, 10, 0.05))} seed={seed + 4} width={1.4} closed />
      <SketchText x={x1 - 10} y={y + 4} anchor="end" size={10}>
        LOW
      </SketchText>
      <SketchText x={x2 + 10} y={y + 4} size={10}>
        HIGH
      </SketchText>
    </g>
  );
}

/* ==========================================================================
   TITLE · from a current state to a better one
   ========================================================================== */

export function CurrentToBetter() {
  const stairs = sharp([
    [150, 352],
    [150, 312],
    [205, 312],
    [205, 268],
    [252, 268],
    [252, 224],
    [340, 224],
    [340, 352],
  ]);
  const [hx, hy] = handAt(292, 224, 150, "hold");
  return (
    <SketchFrame
      id="sk-current-to-better"
      width={360}
      height={400}
      label="At the foot of a short flight of steps, a person in a plain coat stands with arms hanging. At the top of the steps, on a pale sky wash, the same person stands upright in a camel coat, a hand on the hip and a shopping bag in the other hand."
    >
      <Backwash cx={84} cy={278} rx={82} ry={110} seed={10} />
      <Backwash cx={286} cy={138} rx={74} ry={110} seed={12} fill={SK.sky} opacity={0.55} />
      <Wash pts={stairs} seed={20} fill={SK.earth} opacity={0.5} dx={2} dy={2} />
      <InkLine pts={stairs.slice(0, -1)} seed={21} />
      <Ground x0={14} x1={340} y={352} seed={30} />
      <Person x={78} y={352} h={150} look={PLAIN} arms={["down", "down"]} seed={40} />
      <Person x={292} y={224} h={150} look={BETTER} arms={["hip", "hold"]} seed={140} />
      <Bag x={hx} y={hy} w={28} seed={240} />
      <SketchText x={78} y={384} anchor="middle" size={11}>
        CURRENT STATE
      </SketchText>
      <SketchText x={292} y={52} anchor="middle" size={11}>
        A BETTER ONE
      </SketchText>
    </SketchFrame>
  );
}

/* ==========================================================================
   WHAT IS CONSUMER MOTIVATION?
   ========================================================================== */

/** Two ledges: where the consumer is, and higher across a gap, where they want to be. */
export function MotivationGap() {
  const low = sharp([[24, 318], [24, 262], [322, 262], [322, 318]]);
  const high = sharp([[478, 318], [478, 170], [776, 170], [776, 318]]);
  return (
    <SketchFrame
      id="sk-motivation-gap"
      width={800}
      height={330}
      label="Two ledges with a gap between them. On the lower ledge, marked current state, a person in a plain coat stands with arms hanging. On the higher ledge across the gap, marked desired state, the same person stands upright in a camel coat on a sky wash. A bracket in the gap is marked gap, and an arrow marked act arcs from the first person over to the second."
    >
      <Backwash cx={176} cy={176} rx={140} ry={112} seed={300} />
      <Backwash cx={628} cy={92} rx={140} ry={96} seed={302} fill={SK.sky} opacity={0.55} />
      <Wash pts={low} seed={310} fill={SK.earth} opacity={0.55} />
      <InkLine pts={low.slice(1, -1)} seed={311} />
      <Wash pts={high} seed={312} fill={SK.earth} opacity={0.55} />
      <InkLine pts={high.slice(1, -1)} seed={313} />
      <SketchText x={40} y={298} size={12}>
        CURRENT STATE
      </SketchText>
      <SketchText x={760} y={298} anchor="end" size={12}>
        DESIRED STATE
      </SketchText>

      <Person x={176} y={262} h={150} look={PLAIN} arms={["down", "down"]} seed={320} />
      <Person x={628} y={170} h={150} look={BETTER} arms={["hip", "down"]} seed={420} />

      {/* the gap between the two states */}
      <InkLine pts={rp([[400, 172], [400, 260]])} seed={330} width={1.1} />
      <InkLine pts={rp([[392, 171], [408, 171]])} seed={331} width={1.1} />
      <InkLine pts={rp([[392, 261], [408, 261]])} seed={332} width={1.1} />
      <SketchText x={414} y={222} size={12}>
        GAP
      </SketchText>

      {/* acting to close it */}
      <SketchArrow pts={curvePts([214, 134], [400, 0], [586, 72], 16)} seed={340} />
      <SketchText x={400} y={36} anchor="middle" size={12}>
        ACT
      </SketchText>
    </SketchFrame>
  );
}

/** A need fills the tube; acting empties it. */
export function TensionAction() {
  return (
    <SketchFrame
      id="sk-tension-action"
      width={400}
      height={240}
      label="Two tension gauges. On the left, under the word need, the gauge is nearly full. An arrow marked action leads to the right, where the same gauge is nearly empty."
    >
      <Backwash cx={200} cy={120} rx={180} ry={104} seed={500} />
      <SketchText x={86} y={34} anchor="middle" size={12}>
        NEED
      </SketchText>
      <Gauge x={86} top={48} h={140} level={0.9} seed={510} label="TENSION" />
      <SketchArrow pts={rp([[132, 118], [198, 114], [262, 118]])} seed={520} />
      <SketchText x={197} y={100} anchor="middle" size={12}>
        ACTION
      </SketchText>
      <Gauge x={312} top={48} h={140} level={0.1} seed={530} label="TENSION" />
    </SketchFrame>
  );
}

/** One gym membership, three motives. */
export function GymMotives() {
  const card = sharp([[152, 14], [248, 14], [248, 72], [152, 72]], true, 3);
  const people: { x: number; key: string; look: Look; seed: number }[] = [
    { x: 72, key: "HEALTH", look: { hair: "curly", skin: SK.tan, skinOpacity: 0.6, wear: SK.sky, legs: SK.charcoal, outfit: "jacket" }, seed: 620 },
    { x: 200, key: "BELONGING", look: { hair: "bun", wear: SK.camel, legs: SK.leather, outfit: "coat" }, seed: 720 },
    { x: 328, key: "STATUS", look: { hair: "short", hairTone: SK.ink, skin: SK.camel, skinOpacity: 0.55, wear: SK.charcoal, legs: SK.charcoal, outfit: "coat" }, seed: 820 },
  ];
  return (
    <SketchFrame
      id="sk-gym-motives"
      width={400}
      height={330}
      label="One gym membership card with a dumbbell on it, at the top. Lines run from it to three people below. Above the first person is a heart, marked health; above the second, a small group of friends, marked belonging; above the third, a gold star, marked status."
    >
      <Backwash cx={200} cy={190} rx={190} ry={130} seed={600} />
      <Paper pts={card} seed={601} />
      <InkLine pts={card} seed={602} width={1.2} closed />
      <Dumbbell x={200} y={43} s={0.9} seed={603} />
      {people.map((p, i) => {
        const a: Pt = [200 + (p.x - 200) * 0.36, 74];
        const d = Math.hypot(a[0] - p.x, a[1] - 120);
        const b: Pt = [p.x + ((a[0] - p.x) / d) * 25, 120 + ((a[1] - 120) / d) * 25];
        return <InkLine key={p.key} pts={rp([a, b])} seed={610 + i} width={0.9} />;
      })}
      {people.map((p, i) => (
        <g key={p.key}>
          <Paper pts={rp(blobPts(p.x, 120, 22, 22, p.seed, 14, 0.05))} seed={p.seed + 1} />
          <InkLine pts={rp(blobPts(p.x, 120, 22, 22, p.seed + 2, 14, 0.05))} seed={p.seed + 2} width={1} closed />
          {i === 0 ? <Heart x={p.x} y={121} s={1.15} seed={p.seed + 3} /> : null}
          {i === 1 ? (
            <>
              <Face x={p.x - 10} y={116} r={6} seed={p.seed + 3} hair={SK.tan} />
              <Face x={p.x + 10} y={116} r={6} seed={p.seed + 8} hair={SK.ink} skin={SK.camel} />
              <Face x={p.x} y={128} r={6.5} seed={p.seed + 13} />
            </>
          ) : null}
          {i === 2 ? <Star x={p.x} y={121} r={13} seed={p.seed + 3} /> : null}
          <Person x={p.x} y={288} h={134} look={p.look} arms={["down", "hip"]} seed={p.seed + 20} />
          <SketchText x={p.x} y={316} anchor="middle" size={11}>
            {p.key}
          </SketchText>
        </g>
      ))}
    </SketchFrame>
  );
}

/** The marketer's job: tie the offer to a goal the consumer holds. */
export function ConnectOffer() {
  const link = curvePts([98, 132], [106, 64], [164, 70], 12);
  return (
    <SketchFrame
      id="sk-connect-offer"
      width={400}
      height={260}
      label="On the left, a product pack with the brand badge, marked offer. On the right, a person thinks of a target, marked goal. A teal line connects the offer to the goal."
    >
      <Backwash cx={210} cy={140} rx={186} ry={116} seed={900} />
      <Ground x0={24} x1={380} y={222} seed={905} />
      <Pack x={78} bottom={222} w={56} h={84} seed={910} fill={SK.camel} badge />
      <SketchText x={78} y={248} anchor="middle" size={11}>
        OFFER
      </SketchText>
      <Person x={318} y={222} h={150} look={BETTER} arms={["hip", "chin"]} flip seed={920} />
      <Thought x={214} y={74} rx={46} ry={34} tx={300} ty={96} seed={930} />
      <Target x={214} y={74} r={20} seed={940} />
      <SketchText x={214} y={26} anchor="middle" size={11}>
        GOAL
      </SketchText>
      <InkLine pts={link} seed={950} width={2.2} color={SK.teal} />
      <Dot x={98} y={132} seed={951} fill={SK.teal} />
      <Dot x={164} y={70} seed={952} fill={SK.teal} />
    </SketchFrame>
  );
}

/* ==========================================================================
   DRIVE THEORY
   ========================================================================== */

/** Hunger drives toward food, thirst toward a drink: two small scenes. */
export function HungerThirst() {
  const row = (top: number, kind: "hunger" | "thirst", seed: number) => (
    <g>
      <Gauge x={58} top={top} h={86} w={24} level={0.86} seed={seed} label={kind === "hunger" ? "HUNGER" : "THIRST"} />
      <SketchArrow pts={rp([[96, top + 44], [168, top + 41], [236, top + 44]])} seed={seed + 10} />
      <SketchText x={166} y={top + 30} anchor="middle" size={11}>
        DRIVE
      </SketchText>
      {kind === "hunger" ? (
        <FoodBowl x={310} y={top + 52} w={84} seed={seed + 20} />
      ) : (
        <Glass2 x={310} bottom={top + 86} h={78} seed={seed + 20} />
      )}
    </g>
  );
  return (
    <SketchFrame
      id="sk-hunger-thirst"
      width={400}
      height={270}
      label="Two small scenes. Top: a nearly full gauge marked hunger, and an arrow marked drive pointing to a steaming bowl of food. Bottom: a nearly full gauge marked thirst, and an arrow marked drive pointing to a glass of water."
    >
      <Backwash cx={200} cy={134} rx={188} ry={128} seed={1000} />
      {row(14, "hunger", 1010)}
      <InkLine pts={rp([[40, 136], [360, 134]])} seed={1005} width={0.7} />
      {row(152, "thirst", 1050)}
    </SketchFrame>
  );
}

/** Tension over time: an unmet need, the drive, then a fall back to balance. */
export function DriveCurve() {
  const rise = curvePts([100, 200], [178, 200], [192, 86], 10);
  const top = curvePts([192, 86], [206, 40], [220, 86], 8);
  const fall = curvePts([220, 86], [236, 200], [306, 200], 10);
  const line: Pt[] = rp([[44, 200], ...rise, ...top.slice(1), ...fall.slice(1), [376, 200]]);
  return (
    <SketchFrame
      id="sk-drive-curve"
      width={400}
      height={250}
      label="A line of tension over time. It sits on the balanced-state line, starts rising at an unmet need, peaks as the drive, then tension falls back down to the balanced state."
    >
      <Backwash cx={210} cy={130} rx={190} ry={116} seed={1100} />
      <Wash pts={rp([...line, [376, 202], [44, 202]])} seed={1101} fill={SK.tan} opacity={0.35} dx={0} dy={1} />
      <InkLine pts={rp([[44, 26], [44, 204]])} seed={1102} width={1} />
      <InkLine pts={rp([[44, 202], [382, 202]])} seed={1103} width={0.9} />
      <InkLine pts={line} seed={1104} width={1.8} />
      <text x={0} y={0} transform="translate(32 30) rotate(-90)" textAnchor="end" fontFamily="var(--font-label)" fontSize={10} fontWeight={500} letterSpacing="0.14em" fill={SK.ink}>
        TENSION
      </text>
      <Dot x={100} y={200} r={4} seed={1105} />
      <SketchText x={100} y={226} anchor="middle" size={11}>
        UNMET NEED
      </SketchText>
      <SketchText x={206} y={48} anchor="middle" size={12}>
        DRIVE
      </SketchText>
      <SketchArrow pts={rp([[262, 92], [276, 118], [284, 146]])} seed={1106} width={1.1} head={7} />
      <SketchText x={270} y={82} size={11}>
        TENSION FALLS
      </SketchText>
      <SketchText x={376} y={226} anchor="end" size={11}>
        BALANCED STATE
      </SketchText>
    </SketchFrame>
  );
}

/** Marketing reminds people of the need (the rise) or offers the product that reduces it (the fall). */
export function MarketingDrive() {
  const rise = curvePts([90, 214], [166, 214], [196, 112], 10);
  const top = curvePts([196, 112], [210, 78], [224, 112], 8);
  const fall = curvePts([224, 112], [252, 214], [326, 214], 10);
  const line: Pt[] = rp([[24, 214], ...rise, ...top.slice(1), ...fall.slice(1), [384, 214]]);
  return (
    <SketchFrame
      id="sk-marketing-drive"
      width={400}
      height={240}
      label="A small tension curve. On its rising side, an ad on a screen showing the brand, marked remind, points into the rise. On its falling side, the brand's product pack, marked reduce, points into the fall."
    >
      <Backwash cx={200} cy={130} rx={190} ry={108} seed={1200} />
      <Wash pts={rp([...line, [384, 216], [24, 216]])} seed={1201} fill={SK.tan} opacity={0.35} dx={0} dy={1} />
      <InkLine pts={line} seed={1202} width={1.8} />
      <SketchText x={210} y={64} anchor="middle" size={11}>
        DRIVE
      </SketchText>

      {/* remind: an ad */}
      <Screen x={26} y={70} w={76} h={52} seed={1210}>
        <BrandBadge x={64} y={96} r={11} seed={1216} />
      </Screen>
      <SketchText x={64} y={56} anchor="middle" size={11}>
        REMIND
      </SketchText>
      <SketchArrow pts={rp([[108, 116], [136, 136], [160, 168]])} seed={1220} width={1.2} head={7} />

      {/* reduce: the product */}
      <Pack x={344} bottom={150} w={40} h={58} seed={1230} fill={SK.camel} badge />
      <SketchText x={344} y={78} anchor="middle" size={11}>
        REDUCE
      </SketchText>
      <SketchArrow pts={rp([[320, 158], [292, 170], [262, 176]])} seed={1240} width={1.2} head={7} />
    </SketchFrame>
  );
}

/* ==========================================================================
   EXPECTANCY THEORY
   ========================================================================== */

export function ExpectancyChain() {
  const [lx, ly] = handAt(130, 232, 150, "up", -1);
  const [rx] = handAt(130, 232, 150, "up", 1);
  const bars = [
    { x: 364, h: 42 },
    { x: 400, h: 74 },
    { x: 436, h: 108 },
  ];
  return (
    <SketchFrame
      id="sk-expectancy-chain"
      width={800}
      height={290}
      label="Three stations left to right. Effort: a person lifting a dumbbell overhead. Performance: three rising bars. Outcome: a gold trophy with three hearts above it, marked valence. The arrow from effort to performance is marked expectancy; the arrow from performance to outcome is marked instrumentality."
    >
      <Backwash cx={400} cy={140} rx={380} ry={130} seed={1300} />
      <Ground x0={40} x1={760} y={232} seed={1301} />
      {/* effort */}
      <Person x={130} y={232} h={150} look={BETTER} arms={["up", "up"]} seed={1310} />
      <Dumbbell x={r2((lx + rx) / 2)} y={r2(ly - 2)} s={1.05} seed={1320} />
      {/* performance */}
      {bars.map((b, i) => {
        const pts = sharp([[b.x - 13, 232], [b.x - 13, 232 - b.h], [b.x + 13, 232 - b.h], [b.x + 13, 232]], true, 1.5);
        return (
          <g key={b.x}>
            <Wash pts={pts} seed={1330 + i * 3} fill={SK.camel} opacity={0.4 + i * 0.2} dx={1} dy={0} />
            <InkLine pts={pts.slice(0, -2)} seed={1331 + i * 3} width={1.2} />
          </g>
        );
      })}
      {/* outcome */}
      <Trophy x={670} y={128} s={1.1} seed={1350} />
      {[-28, 0, 28].map((dx, i) => (
        <Heart key={dx} x={670 + dx} y={82} s={0.85} seed={1360 + i * 3} />
      ))}
      <SketchText x={670} y={56} anchor="middle" size={12}>
        VALENCE
      </SketchText>
      {/* the two beliefs */}
      <SketchArrow pts={rp([[200, 160], [264, 156], [330, 160]])} seed={1370} />
      <SketchText x={265} y={140} anchor="middle" size={12}>
        EXPECTANCY
      </SketchText>
      <SketchArrow pts={rp([[470, 160], [534, 156], [600, 160]])} seed={1372} />
      <SketchText x={535} y={140} anchor="middle" size={12}>
        INSTRUMENTALITY
      </SketchText>
      {[
        { x: 130, t: "EFFORT" },
        { x: 400, t: "PERFORMANCE" },
        { x: 670, t: "OUTCOME" },
      ].map((k) => (
        <SketchText key={k.t} x={k.x} y={272} anchor="middle" size={12}>
          {k.t}
        </SketchText>
      ))}
    </SketchFrame>
  );
}

/** Three beliefs met, each filling a third of the motivation bar. */
export function MoreMotivated() {
  const cols = [150, 400, 650];
  const seg = [90, 296.67, 503.33, 710];
  const hill = rp([[96, 112], [124, 70], [150, 50], [176, 70], [204, 112]]);
  return (
    <SketchFrame
      id="sk-more-motivated"
      width={800}
      height={290}
      label="Three conditions side by side, each ticked in teal: a small hill with a flag on top, marked goal seems possible; the brand's product pack, marked product seems useful; a gold trophy, marked result feels valuable. Arrows run down from each into one bar, filling a third of it each, marked more motivated."
    >
      <Backwash cx={400} cy={140} rx={380} ry={132} seed={1400} />
      {/* possible: a hill with a flag on top */}
      <Wash pts={hill} seed={1401} fill={SK.earth} opacity={0.7} />
      <InkLine pts={hill} seed={1402} />
      <InkLine pts={rp([[150, 52], [150, 26]])} seed={1403} width={1.2} amp={0.2} />
      <Wash pts={rp([[151, 26], [172, 29], [166, 34], [172, 40], [151, 40]])} seed={1404} fill={SK.ochre} opacity={0.85} dx={0.5} dy={0.3} />
      <InkLine pts={rp([[151, 26], [172, 29], [166, 34], [172, 40], [151, 40]])} seed={1405} width={1} />
      {/* useful: the product */}
      <Pack x={400} bottom={112} w={46} h={70} seed={1410} fill={SK.camel} badge />
      {/* valuable: the result */}
      <Trophy x={650} y={40} s={0.78} seed={1420} />

      {[
        ["GOAL SEEMS", "POSSIBLE"],
        ["PRODUCT SEEMS", "USEFUL"],
        ["RESULT FEELS", "VALUABLE"],
      ].map(([a, b], i) => {
        const x = cols[i];
        const box = sharp([[seg[i], 222], [seg[i + 1], 222], [seg[i + 1], 248], [seg[i], 248]], true, 1);
        return (
          <g key={a}>
            <SketchText x={x} y={138} anchor="middle" size={11}>
              {a}
            </SketchText>
            <SketchText x={x} y={154} anchor="middle" size={11}>
              {b}
            </SketchText>
            <Tick1 x={x} y={176} s={1.5} seed={1430 + i * 4} />
            <SketchArrow pts={rp([[x, 190], [x, 214]])} seed={1432 + i * 4} width={1.1} head={6} />
            <Wash pts={rp(box)} seed={1450 + i} fill={SK.ochre} opacity={[0.45, 0.65, 0.85][i]} dx={0} dy={0} />
          </g>
        );
      })}
      <InkLine pts={sharp([[90, 222], [710, 222], [710, 248], [90, 248]], true, 2)} seed={1460} width={1.3} closed />
      <SketchText x={400} y={276} anchor="middle" size={12}>
        MORE MOTIVATED
      </SketchText>
    </SketchFrame>
  );
}

/* ==========================================================================
   NEEDS, WANTS, AND DEMAND
   ========================================================================== */

/** A need: hunger, a basic requirement. */
export function NeedHunger() {
  return (
    <SketchFrame
      id="sk-need-hunger"
      width={400}
      height={250}
      label="A person holds a hand to the stomach, head bowed. Beside them, a nearly full gauge marked hunger."
    >
      <Backwash cx={200} cy={130} rx={170} ry={112} seed={1500} />
      <Ground x0={60} x1={340} y={222} seed={1501} />
      <Person x={150} y={222} h={180} look={PLAIN} arms={["down", "hug"]} seed={1510} />
      <Gauge x={262} top={60} h={130} level={0.86} seed={1520} label="HUNGER" />
    </SketchFrame>
  );
}

/** A want: the specific product chosen to satisfy the need. */
export function WantBurger() {
  const [hx] = handAt(96, 222, 170, "reach");
  return (
    <SketchFrame
      id="sk-want-burger"
      width={400}
      height={250}
      label="The same person reaches for a burger on a counter. The burger is ticked in teal. Beside it, a bowl of rice and a slice of pizza sit in faint pencil, not chosen."
    >
      <Backwash cx={210} cy={126} rx={180} ry={112} seed={1600} />
      <Ground x0={30} x1={370} y={222} seed={1601} />
      <InkLine pts={rp([[132, 164], [376, 162]])} seed={1602} width={1.3} />
      <InkLine pts={rp([[146, 165], [150, 222]])} seed={1603} width={1.1} />
      <InkLine pts={rp([[362, 164], [358, 222]])} seed={1604} width={1.1} />
      <Person x={96} y={222} h={170} look={PLAIN} arms={["down", "reach"]} seed={1610} />
      <Burger x={r2(hx + 40)} y={r2(140)} s={0.95} seed={1620} />
      <Tick1 x={r2(hx + 40)} y={96} s={1.6} seed={1625} />
      <RiceBowl x={262} y={140} s={0.8} seed={1630} pencil />
      <Pizza x={332} y={160} s={0.8} seed={1640} pencil upright />
    </SketchFrame>
  );
}

/** One need, three wants: culture, personality and past experience. */
export function ShapedWants() {
  const ends = [
    { y: 58, ly: 48, key: "CULTURE", food: <RiceBowl x={340} y={62} s={0.9} seed={1730} /> },
    { y: 150, ly: 134, key: "PERSONALITY", food: <Burger x={340} y={156} s={0.9} seed={1740} /> },
    { y: 242, ly: 256, key: "PAST EXPERIENCE", food: <Pizza x={340} y={224} s={0.8} seed={1750} /> },
  ];
  return (
    <SketchFrame
      id="sk-shaped-wants"
      width={400}
      height={290}
      label="One nearly full gauge marked hunger on the left. Three curved arrows fan out from it to three different foods: a bowl of rice, a burger and a slice of pizza. The arrows are marked culture, personality and past experience."
    >
      <Backwash cx={206} cy={146} rx={188} ry={134} seed={1700} />
      <Gauge x={46} top={80} h={120} w={26} level={0.86} seed={1710} label="HUNGER" />
      {ends.map((e, i) => (
        <g key={e.key}>
          <SketchArrow pts={curvePts([80, 150], [150, e.y], [290, e.y], 14)} seed={1760 + i * 3} width={1.2} head={8} />
          <SketchText x={196} y={e.ly} anchor="middle" size={10}>
            {e.key}
          </SketchText>
          {e.food}
        </g>
      ))}
    </SketchFrame>
  );
}

/** Demand needs both: the ability and the willingness to pay. */
export function DemandTest() {
  const cols: { x: number; able: boolean; willing: boolean; look: Look; seed: number }[] = [
    { x: 220, able: false, willing: true, look: { hair: "curly", skin: SK.tan, skinOpacity: 0.6, wear: SK.sky, outfit: "jacket" }, seed: 1810 },
    { x: 286, able: true, willing: false, look: { hair: "short", hairTone: SK.ink, wear: SK.charcoal, outfit: "coat" }, seed: 1880 },
    { x: 352, able: true, willing: true, look: { hair: "bun", wear: SK.camel, legs: SK.leather, outfit: "coat" }, seed: 1950 },
  ];
  return (
    <SketchFrame
      id="sk-demand-test"
      width={400}
      height={300}
      label="Three people each thinking of the same phone. Two rows below them: ability to pay and willingness to pay. The first person is willing but not able; the second is able but not willing; the third is both, holds out a payment card, and only that column is marked demand. The other two are marked want."
    >
      <Backwash cx={290} cy={120} rx={120} ry={116} seed={1800} />
      <SketchText x={10} y={226} size={10.5}>
        ABILITY TO PAY
      </SketchText>
      <SketchText x={10} y={254} size={10.5}>
        WILLINGNESS TO PAY
      </SketchText>
      <InkLine pts={rp([[10, 206], [392, 206]])} seed={1801} width={0.8} />
      <InkLine pts={rp([[10, 236], [392, 236]])} seed={1802} width={0.6} />
      <InkLine pts={rp([[10, 264], [392, 264]])} seed={1803} width={0.8} />
      {cols.map((c) => {
        const demand = c.able && c.willing;
        const [hx, hy] = handAt(c.x, 196, 116, "hold", 1);
        return (
          <g key={c.x}>
            <Thought x={c.x - 2} y={44} rx={22} ry={20} tx={c.x} ty={80} seed={c.seed} />
            <Phone2 x={c.x - 2} y={44} s={0.36} seed={c.seed + 10} />
            <Person x={c.x} y={196} h={116} look={c.look} arms={["down", demand ? "hold" : "down"]} flip={!demand} seed={c.seed + 20} />
            {demand ? <PayCard x={r2(hx + 6)} y={r2(hy - 4)} w={20} tilt={-14} seed={c.seed + 30} /> : null}
            {c.able ? <Tick1 x={c.x} y={222} seed={c.seed + 40} /> : <Cross x={c.x} y={221} seed={c.seed + 40} />}
            {c.willing ? <Tick1 x={c.x} y={250} seed={c.seed + 44} /> : <Cross x={c.x} y={249} seed={c.seed + 44} />}
            <SketchText x={c.x} y={288} anchor="middle" size={11}>
              {demand ? "DEMAND" : "WANT"}
            </SketchText>
          </g>
        );
      })}
    </SketchFrame>
  );
}

/** Marketers shape the want above ground; the need beneath is not theirs to make. */
export function ShapeNotCreate() {
  const band = rp([[16, 196], [384, 194], [384, 262], [16, 262]]);
  return (
    <SketchFrame
      id="sk-shape-not-create"
      width={400}
      height={276}
      label="Above ground, marked want: the brand's product pack between two faint pencil alternatives, a bottle and a can, with an arrow arcing over them marked can shape. Below ground, a band marked need, with a padlock and the words cannot create."
    >
      <Backwash cx={200} cy={110} rx={184} ry={96} seed={2000} />
      <SketchArrow pts={curvePts([84, 100], [200, 6], [316, 100], 16)} seed={2001} />
      <SketchText x={200} y={36} anchor="middle" size={11}>
        CAN SHAPE
      </SketchText>
      <Bottle x={112} bottom={184} h={78} seed={2010} pencil />
      <Pack x={200} bottom={184} w={48} h={78} seed={2020} fill={SK.camel} badge />
      <Can3 x={288} bottom={184} h={52} seed={2030} pencil />
      <SketchText x={20} y={176} size={11}>
        WANT
      </SketchText>
      <Wash pts={band} seed={2040} fill={SK.earth} opacity={0.85} dx={0} dy={0} />
      <InkLine pts={rp([[12, 188], [388, 186]])} seed={2041} width={1.4} />
      <SketchText x={28} y={234} size={13}>
        NEED
      </SketchText>
      <SketchText x={318} y={234} anchor="end" size={11}>
        CANNOT CREATE
      </SketchText>
      <Padlock x={350} y={228} seed={2050} />
    </SketchFrame>
  );
}

/* ==========================================================================
   MASLOW
   ========================================================================== */

const TIERS = ["PHYSIOLOGICAL", "SAFETY", "BELONGING", "ESTEEM", "SELF-ACTUALIZATION"];

export function MaslowPyramid() {
  const cx = 152;
  const top = 22;
  const base = 392;
  const half = 124;
  const th = (base - top) / 5;
  const mid = (i: number) => r2(base - (i + 0.5) * th);
  const edge = (i: number) => r2(cx + (half * (mid(i) - top)) / (base - top));
  const drop = rp([[166, 336], [158, 350], [157, 356], [161, 362], [171, 362], [175, 356], [174, 350]]);
  const moon = rp([[196, 334], [188, 340], [186, 350], [192, 360], [204, 362], [196, 354], [194, 344]]);
  const shield = sharp([[152, 264], [172, 271], [171, 288], [164, 299], [152, 306], [140, 299], [133, 288], [132, 271]], true, 1.5);
  const sprout: Pt[] = rp([[152, 84], [152, 58]]);
  return (
    <SketchFrame
      id="sk-maslow-pyramid"
      width={400}
      height={410}
      label="Maslow's pyramid in five tiers, from basic needs at the bottom to higher-order needs at the top. Physiological: a bowl of food, a water drop and a moon. Safety: a shield. Belonging: a small group of friends. Esteem: a gold star. Self-actualization, on a sky wash: a teal sprout."
    >
      <Backwash cx={176} cy={236} rx={170} ry={170} seed={2100} />
      <Pyramid x={cx} top={top} base={base} half={half} seed={2110} fills={[SK.camel, SK.earth, SK.blush, SK.ochre, SK.sky]} />
      {TIERS.map((name, i) => (
        <SketchText key={name} x={edge(i) + 10} y={mid(i) + 4} size={i === 4 ? 9.5 : 10.5}>
          {name}
        </SketchText>
      ))}
      {/* basic → higher-order */}
      <SketchArrow pts={rp([[12, 390], [12, 30]])} seed={2150} width={1} head={7} />
      <text x={0} y={0} transform="translate(28 390) rotate(-90)" fontFamily="var(--font-label)" fontSize={10} fontWeight={500} letterSpacing="0.14em" fill={SK.ink}>
        BASIC
      </text>
      <text x={0} y={0} transform="translate(28 30) rotate(-90)" textAnchor="end" fontFamily="var(--font-label)" fontSize={10} fontWeight={500} letterSpacing="0.14em" fill={SK.ink}>
        HIGHER-ORDER
      </text>
      {/* physiological: food, water, sleep */}
      <FoodBowl x={124} y={350} w={36} seed={2160} steam={false} />
      <Wash pts={drop} seed={2165} fill={SK.sky} opacity={0.95} dx={0.4} dy={0.3} />
      <InkLine pts={drop} seed={2166} width={1} closed />
      <Wash pts={moon} seed={2167} fill={SK.ochre} opacity={0.8} dx={0.4} dy={0.3} />
      <InkLine pts={moon} seed={2168} width={1} closed />
      {/* safety */}
      <Wash pts={shield} seed={2170} fill={SK.charcoal} opacity={0.6} />
      <InkLine pts={shield} seed={2171} closed />
      <Tick1 x={152} y={285} s={1.1} seed={2172} color={SK.paper} />
      {/* belonging */}
      <Face x={136} y={214} r={8.5} seed={2175} hair={SK.tan} />
      <Face x={152} y={206} r={8.5} seed={2178} />
      <Face x={168} y={214} r={8.5} seed={2180} hair={SK.ink} skin={SK.camel} />
      {/* esteem */}
      <Star x={152} y={140} r={14} seed={2185} />
      {/* self-actualization: a sprout */}
      <InkLine pts={sprout} seed={2190} width={1.6} color={SK.teal} amp={0.2} />
      {[[[152, 66], [140, 60], [138, 52], [148, 54]], [[152, 72], [164, 66], [166, 58], [156, 60]]].map((leaf, i) => (
        <g key={i}>
          <Wash pts={rp(leaf as Pt[])} seed={2192 + i} fill={SK.teal} opacity={0.85} dx={0.3} dy={0.2} />
          <InkLine pts={rp(leaf as Pt[])} seed={2194 + i} width={0.9} closed />
        </g>
      ))}
    </SketchFrame>
  );
}

/** A tiny pyramid for a row of text: which tiers the line is about. */
export function TierMark({ lit }: { lit: number[] }) {
  return (
    <SketchFrame id={`sk-tier-${lit.join("")}`} width={64} height={54} label="" decorative className="block h-12 w-14 shrink-0">
      <Pyramid x={32} top={4} base={50} half={29} seed={2200 + lit[0] * 10} lit={lit} line={1} />
    </SketchFrame>
  );
}

/** Several tiers at once, from one purchase. */
export function SeveralLevels() {
  const cx = 116;
  const top = 26;
  const base = 236;
  const half = 104;
  const th = (base - top) / 5;
  const lit = [0, 2, 4];
  const mid = (i: number) => r2(base - (i + 0.5) * th);
  const edge = (i: number) => r2(cx + (half * (mid(i) - top)) / (base - top));
  const bag: Pt = [326, 104];
  return (
    <SketchFrame
      id="sk-several-levels"
      width={400}
      height={262}
      label="A small five-tier pyramid. Teal lines run from one shopping bag on the right to three different tiers at once, the bottom, middle and top tiers, which are lit teal. Marked at the same time."
    >
      <Backwash cx={200} cy={138} rx={186} ry={118} seed={2300} />
      <Pyramid x={cx} top={top} base={base} half={half} seed={2310} lit={lit} />
      {lit.map((i) => (
        <g key={i}>
          <InkLine pts={rp([[edge(i) + 8, mid(i)], [bag[0] - 22, bag[1] + 22]])} seed={2340 + i} width={1.6} color={SK.teal} />
          <Dot x={edge(i) + 8} y={mid(i)} seed={2350 + i} fill={SK.teal} />
        </g>
      ))}
      <Bag x={bag[0]} y={bag[1] - 10} w={42} seed={2360} />
      <SketchText x={326} y={184} anchor="middle" size={11}>
        AT THE SAME
      </SketchText>
      <SketchText x={326} y={200} anchor="middle" size={11}>
        TIME
      </SketchText>
    </SketchFrame>
  );
}

/* ==========================================================================
   MOTIVATIONAL CONFLICTS
   ========================================================================== */

function ConflictPlate({ kind }: { kind: "aa" | "av" | "vv" }) {
  const labels = {
    aa: "A person stands between two attractive options, each marked plus, arms stretched toward both. Arrows lead from the person to each option.",
    av: "A person reaches toward one option that is half plus and half minus. One arrow leads toward it; another pushes back from it.",
    vv: "A person stands between two unwanted options, each marked minus, shrugging. Arrows push toward the person from both sides.",
  };
  const look: Look = { hair: "long", hairTone: SK.brown, wear: SK.camel, outfit: "jacket" };
  return (
    <SketchFrame id={`sk-conflict-${kind}`} width={400} height={230} label={labels[kind]}>
      <Backwash cx={200} cy={120} rx={186} ry={104} seed={2400} />
      <Ground x0={30} x1={370} y={212} seed={2401} />
      {kind === "av" ? (
        <>
          <Person x={110} y={212} h={150} look={look} arms={["down", "reach"]} seed={2410} />
          <Option x={300} y={104} r={38} kind="both" seed={2420} />
          <SketchArrow pts={rp([[160, 84], [210, 80], [252, 84]])} seed={2430} />
          <SketchArrow pts={rp([[252, 132], [210, 136], [160, 132]])} seed={2432} />
        </>
      ) : (
        <>
          <Person x={200} y={212} h={150} look={look} arms={kind === "aa" ? ["reach", "reach"] : ["shrug", "shrug"]} seed={2410} />
          <Option x={62} y={100} kind={kind === "aa" ? "plus" : "minus"} seed={2420} />
          <Option x={338} y={100} kind={kind === "aa" ? "plus" : "minus"} seed={2440} />
          {kind === "aa" ? (
            <>
              <SketchArrow pts={rp([[176, 76], [136, 80], [100, 88]])} seed={2430} />
              <SketchArrow pts={rp([[224, 76], [264, 80], [300, 88]])} seed={2432} />
            </>
          ) : (
            <>
              <SketchArrow pts={rp([[98, 84], [136, 78], [174, 76]])} seed={2430} />
              <SketchArrow pts={rp([[302, 84], [264, 78], [226, 76]])} seed={2432} />
            </>
          )}
        </>
      )}
    </SketchFrame>
  );
}

export function ApproachApproach() {
  return <ConflictPlate kind="aa" />;
}

export function ApproachAvoidance() {
  return <ConflictPlate kind="av" />;
}

export function AvoidanceAvoidance() {
  return <ConflictPlate kind="vv" />;
}

/** Two attractive options; the budget allows one. */
export function PhoneOrTrip() {
  return (
    <SketchFrame
      id="sk-phone-or-trip"
      width={400}
      height={290}
      label="A new phone on the left and a suitcase for a weekend trip on the right, each marked plus. In the middle, a wallet with a single coin, marked budget, with arrows to both and the word or between them. A person stands below, hand on chin."
    >
      <Backwash cx={200} cy={150} rx={188} ry={132} seed={2500} />
      <Ground x0={110} x1={290} y={276} seed={2501} />
      <Phone2 x={62} y={108} s={1.05} seed={2510} />
      <Option x={96} y={52} r={13} kind="plus" seed={2515} />
      <Suitcase1 x={332} y={116} s={0.78} seed={2520} />
      <Option x={372} y={62} r={13} kind="plus" seed={2525} />
      <Wallet x={200} y={96} s={0.9} seed={2530} />
      <SketchText x={200} y={140} anchor="middle" size={10}>
        BUDGET
      </SketchText>
      <SketchArrow pts={curvePts([160, 92], [128, 68], [96, 90], 10)} seed={2540} width={1.1} head={7} />
      <SketchArrow pts={curvePts([240, 92], [272, 68], [290, 94], 10)} seed={2542} width={1.1} head={7} />
      <SketchText x={200} y={34} anchor="middle" size={14} serif>
        or
      </SketchText>
      <Person x={200} y={276} h={122} look={PLAIN} arms={["hip", "chin"]} seed={2550} />
    </SketchFrame>
  );
}

/** A strong brand spells out benefits and cost; the conflict gauge drops. */
export function ClearerChoice() {
  const card = (x0: number) => sharp([[x0, 34], [x0 + 108, 34], [x0 + 108, 214], [x0, 214]], true, 4);
  return (
    <SketchFrame
      id="sk-clearer-choice"
      width={400}
      height={260}
      label="Two panels. Left: a vague offer card with smudged lines and question marks, beside a nearly full gauge marked conflict. Right: a strong brand's card with the brand badge, three benefits ticked in teal and a clear cost of $29, beside a nearly empty conflict gauge."
    >
      <Backwash cx={200} cy={128} rx={190} ry={120} seed={2600} />
      {/* vague */}
      <Paper pts={card(12)} seed={2601} />
      <InkLine pts={card(12)} seed={2602} width={1.1} closed />
      {[74, 102, 130, 158].map((y, i) => (
        <Wash key={y} pts={rp([[28, y - 5], [28 + [76, 60, 70, 44][i], y - 6], [28 + [76, 60, 70, 44][i], y + 5], [28, y + 6]])} seed={2603 + i} fill={SK.earth} opacity={0.9} dx={0} dy={0} />
      ))}
      <SketchText x={104} y={62} anchor="middle" size={24} serif>
        ?
      </SketchText>
      <SketchText x={104} y={202} anchor="middle" size={24} serif>
        ?
      </SketchText>
      <Gauge x={158} top={50} h={130} w={22} level={0.88} seed={2610} />
      <SketchText x={158} y={202} anchor="middle" size={9.5}>
        CONFLICT
      </SketchText>
      <InkLine pts={rp([[200, 30], [200, 232]])} seed={2615} width={0.6} />
      {/* clear */}
      <Paper pts={card(212)} seed={2620} />
      <InkLine pts={card(212)} seed={2621} width={1.2} closed />
      <BrandBadge x={236} y={62} r={13} seed={2622} />
      {[98, 122, 146].map((y, i) => (
        <g key={y}>
          <Tick1 x={232} y={y} s={0.9} seed={2630 + i * 3} />
          <InkLine pts={rp([[246, y], [246 + [56, 44, 50][i], y]])} seed={2631 + i * 3} width={1.6} amp={0.3} />
        </g>
      ))}
      <InkLine pts={rp([[224, 168], [310, 168]])} seed={2640} width={0.7} />
      <SketchText x={224} y={198} size={10}>
        COST
      </SketchText>
      <SketchText x={312} y={200} anchor="end" size={20} serif>
        $29
      </SketchText>
      <Gauge x={358} top={50} h={130} w={22} level={0.12} seed={2650} />
      <SketchText x={358} y={202} anchor="middle" size={9.5}>
        CONFLICT
      </SketchText>
    </SketchFrame>
  );
}

/* ==========================================================================
   CONSUMER INVOLVEMENT
   ========================================================================== */

/** Personal importance: gum, shoes and a car along one axis. */
export function InvolvementScale() {
  return (
    <SketchFrame
      id="sk-involvement-scale"
      width={800}
      height={176}
      label="A horizontal axis marked involvement, running from low to high. Along it: a pack of gum near low, a running shoe in the middle, and a car near high."
    >
      <Backwash cx={400} cy={92} rx={380} ry={82} seed={2700} />
      <SketchArrow pts={rp([[70, 124], [400, 122], [730, 124]])} seed={2701} width={1.4} head={10} />
      <SketchText x={70} y={154} size={11}>
        LOW
      </SketchText>
      <SketchText x={730} y={154} anchor="end" size={11}>
        HIGH
      </SketchText>
      <SketchText x={400} y={154} anchor="middle" size={12}>
        INVOLVEMENT
      </SketchText>
      <Gum x={170} bottom={110} s={1.4} seed={2710} />
      <Shoe x={400} y={104} s={2.1} seed={2720} />
      <Car2 x={620} y={112} s={1.05} seed={2730} />
      {[170, 400, 620].map((x, i) => (
        <InkLine key={x} pts={rp([[x, 116], [x, 130]])} seed={2740 + i} width={1.1} />
      ))}
    </SketchFrame>
  );
}

/** Product involvement: identity, risk, daily life. */
export function ProductInvolvement() {
  const tags = [
    { x: 76, y: 50, t: "IDENTITY", to: [180, 82] as Pt },
    { x: 324, y: 50, t: "RISK", to: [220, 82] as Pt },
    { x: 200, y: 184, t: "DAILY LIFE", to: [200, 144] as Pt },
  ];
  return (
    <SketchFrame
      id="sk-product-involvement"
      width={400}
      height={250}
      label="A phone in the centre with three tags linked to it: identity, risk and daily life. Below, a meter from low to high sits near high."
    >
      <Backwash cx={200} cy={124} rx={186} ry={114} seed={2800} />
      {tags.map((t, i) => (
        <InkLine key={t.t} pts={rp([[t.x + (t.to[0] - t.x) * 0.36, t.y + (t.to[1] - t.y) * 0.36], t.to])} seed={2801 + i} width={1} />
      ))}
      <Phone2 x={200} y={104} s={1.05} seed={2810} />
      {tags.map((t, i) => (
        <Tag2 key={t.t} x={t.x} y={t.y} text={t.t} seed={2820 + i * 3} />
      ))}
      <Meter x1={110} x2={290} y={228} level={0.88} seed={2840} />
    </SketchFrame>
  );
}

/** Message involvement: close attention to the information in an ad. */
export function MessageInvolvement() {
  const ad = sharp([[214, 18], [362, 18], [362, 190], [214, 190]], true, 3);
  const px = 132;
  const py = 196;
  const h = 170;
  const eye: Pt = [r2(px + 7 * (h / 200)), r2(py - 188 * (h / 200))];
  const rows = [80, 102, 124, 146, 168];
  return (
    <SketchFrame
      id="sk-message-involvement"
      width={400}
      height={250}
      label="A person stands close to a poster ad, hand on chin, reading it: thin sight lines run from their eye to the lines of text under the brand badge. Below, a meter from low to high sits near high."
    >
      <Backwash cx={220} cy={112} rx={180} ry={104} seed={2900} />
      <Paper pts={ad} seed={2901} />
      <InkLine pts={ad} seed={2902} width={1.2} closed />
      <BrandBadge x={244} y={48} r={14} seed={2903} />
      {rows.map((y, i) => (
        <InkLine key={y} pts={rp([[232, y], [232 + [110, 92, 104, 80, 60][i], y]])} seed={2910 + i} width={1.6} amp={0.3} />
      ))}
      {rows.slice(0, 4).map((y, i) => (
        <InkLine key={y} pts={rp([[eye[0] + 6, eye[1] + 1], [226, y - 1]])} seed={2920 + i} width={0.6} color={SK.tan} />
      ))}
      <Person x={px} y={py} h={h} look={BETTER} arms={["hip", "chin"]} seed={2930} />
      <Ground x0={40} x1={370} y={196} seed={2940} />
      <Meter x1={110} x2={290} y={230} level={0.86} seed={2950} />
    </SketchFrame>
  );
}

/** Purchase-situation involvement: time pressure, social setting, perceived risk. */
export function SituationInvolvement() {
  const warn = sharp([[330, 44], [360, 98], [300, 98]], true, 3);
  return (
    <SketchFrame
      id="sk-situation-involvement"
      width={400}
      height={250}
      label="Three things above a meter: a clock marked time pressure, a small group of friends marked social setting, and a warning triangle marked perceived risk. Arrows run down from each to a meter whose marker can move both ways."
    >
      <Backwash cx={200} cy={124} rx={186} ry={114} seed={3000} />
      <Clock x={70} y={72} r={24} seed={3001} />
      <Face x={186} y={70} r={10} seed={3010} hair={SK.tan} />
      <Face x={214} y={70} r={10} seed={3015} hair={SK.ink} skin={SK.camel} />
      <Face x={200} y={88} r={11} seed={3020} />
      <Wash pts={warn} seed={3030} fill={SK.ochre} opacity={0.85} />
      <InkLine pts={warn} seed={3031} closed />
      <InkLine pts={rp([[330, 62], [330, 80]])} seed={3032} width={2.4} amp={0.1} />
      <Dot x={330} y={89} r={2.2} seed={3033} />
      {[
        [70, "TIME", "PRESSURE"],
        [200, "SOCIAL", "SETTING"],
        [330, "PERCEIVED", "RISK"],
      ].map(([x, a, b], i) => (
        <g key={a as string}>
          <SketchText x={x as number} y={128} anchor="middle" size={10.5}>
            {a}
          </SketchText>
          <SketchText x={x as number} y={142} anchor="middle" size={10.5}>
            {b}
          </SketchText>
          <SketchArrow pts={rp([[x as number, 152], [200 + ((x as number) - 200) * 0.3, 192]])} seed={3040 + i * 2} width={1} head={6} />
        </g>
      ))}
      <Meter x1={110} x2={290} y={224} level={0.55} seed={3050} />
      <SketchArrow pts={rp([[196, 206], [176, 206]])} seed={3060} width={1} head={5} />
      <SketchArrow pts={rp([[214, 206], [234, 206]])} seed={3062} width={1} head={5} />
    </SketchFrame>
  );
}

/** High involvement compares carefully; low involvement grabs the familiar pack. */
export function HighVsLow() {
  const [mx, my] = handAt(334, 262, 160, "reach", 1, true);
  return (
    <SketchFrame
      id="sk-high-vs-low"
      width={800}
      height={320}
      label="Two panels. High involvement: a person holds a magnifying glass up to three products on their left, each with its own checklist of ticks and crosses beneath. Low involvement: a person reaches straight for the one familiar teal pack on a shelf."
    >
      <Backwash cx={200} cy={160} rx={190} ry={140} seed={3100} />
      <Backwash cx={610} cy={160} rx={186} ry={140} seed={3102} />
      <InkLine pts={rp([[400, 24], [400, 290]])} seed={3104} width={0.6} />
      <SketchText x={24} y={30} size={11}>
        HIGH INVOLVEMENT
      </SketchText>
      <SketchText x={424} y={30} size={11}>
        LOW INVOLVEMENT
      </SketchText>

      {/* high: careful comparison */}
      <Ground x0={24} x1={380} y={262} seed={3106} />
      <Person x={334} y={262} h={160} look={BETTER} arms={["hip", "reach"]} flip seed={3110} />
      <Magnifier x={r2(mx - 24)} y={r2(my - 24)} r={15} seed={3120} />
      {[62, 130, 198].map((x, i) => (
        <g key={x}>
          <Pack x={x} bottom={124} w={40} h={60} seed={3130 + i * 20} fill={[SK.earth, SK.camel, SK.sky][i]} badge={i === 1} />
          {(() => {
            const card = sharp([[x - 27, 136], [x + 27, 136], [x + 27, 236], [x - 27, 236]], true, 3);
            return (
              <>
                <Paper pts={card} seed={3131 + i * 20} />
                <InkLine pts={card} seed={3132 + i * 20} width={1} closed />
              </>
            );
          })()}
          {[0, 1, 2, 3].map((r) => {
            const ok = (i + r) % 3 !== 0;
            const y = 156 + r * 22;
            return (
              <g key={r}>
                {ok ? <Tick1 x={x - 14} y={y} s={0.7} seed={3133 + i * 20 + r * 3} /> : <Cross x={x - 14} y={y} s={0.7} seed={3133 + i * 20 + r * 3} />}
                <InkLine pts={rp([[x - 4, y], [x + 18, y]])} seed={3134 + i * 20 + r * 3} width={1.2} amp={0.2} />
              </g>
            );
          })}
        </g>
      ))}
      <SketchText x={200} y={296} anchor="middle" size={10.5}>
        MORE EFFORT · CAREFUL COMPARISON
      </SketchText>

      {/* low: habit and simple cues */}
      {[120, 196].map((y, r) => (
        <g key={y}>
          {[586, 630, 674, 718, 762].map((x, c) => {
            const mine = r === 1 && c === 0;
            return mine ? (
              <Pack key={x} x={x} bottom={y} w={34} h={52} seed={3200 + c} fill={SK.teal} badge />
            ) : (
              <Pack key={x} x={x} bottom={y} w={34} h={52} seed={3200 + r * 10 + c} fill={[SK.earth, SK.camel][(r + c) % 2]} />
            );
          })}
          <InkLine pts={rp([[560, y + 1], [786, y + 1]])} seed={3230 + r} width={1.6} />
        </g>
      ))}
      <Ground x0={424} x1={780} y={262} seed={3240} />
      <Person x={528} y={262} h={160} look={PLAIN} arms={["down", "reach"]} seed={3250} />
      <SketchText x={600} y={296} anchor="middle" size={10.5}>
        HABIT · SIMPLE CUES
      </SketchText>
    </SketchFrame>
  );
}

/* ==========================================================================
   VALUES
   ========================================================================== */

/** The same running shoe (teal: the one chosen) on a Person's feet. */
function ShoesOn({ x, y, h, seed, flip = false }: { x: number; y: number; h: number; seed: number; flip?: boolean }) {
  const k = h / 200;
  const f = flip ? -1 : 1;
  return (
    <g transform={flip ? `translate(${r2(2 * x)} 0) scale(-1 1)` : undefined}>
      <Shoe x={r2(x - 5 * k * f * f)} y={r2(y - 2 * k)} s={r2(0.3 * k * 1.6)} seed={seed} fill={SK.teal} />
      <Shoe x={r2(x + 11 * k)} y={r2(y - 1 * k)} s={r2(0.3 * k * 1.6)} seed={seed + 10} fill={SK.teal} />
    </g>
  );
}

/** Functional value: performance, convenience, reliability. */
export function FunctionalValue() {
  return (
    <SketchFrame
      id="sk-functional-value"
      width={400}
      height={240}
      label="A teal running shoe with three ticks beneath it: performance, convenience, reliability."
    >
      <Backwash cx={200} cy={120} rx={180} ry={108} seed={3300} />
      <Shoe x={200} y={96} s={2.6} seed={3301} fill={SK.teal} />
      <InkLine pts={rp([[100, 118], [300, 118]])} seed={3310} width={0.7} />
      {["PERFORMANCE", "CONVENIENCE", "RELIABILITY"].map((t, i) => (
        <g key={t}>
          <Tick1 x={128} y={148 + i * 28} seed={3320 + i * 2} />
          <SketchText x={146} y={152 + i * 28} size={11}>
            {t}
          </SketchText>
        </g>
      ))}
    </SketchFrame>
  );
}

/** Social value: belonging, recognition, how others see the consumer. */
export function SocialValue() {
  return (
    <SketchFrame
      id="sk-social-value"
      width={400}
      height={240}
      label="A person in teal running shoes stands in the centre, head high. Two people on either side turn to look at them along thin sight lines. A gold star sits above the person in the centre."
    >
      <Backwash cx={200} cy={130} rx={180} ry={108} seed={3400} />
      <Ground x0={24} x1={376} y={214} seed={3401} />
      <InkLine pts={rp([[80, 73], [186, 58]])} seed={3402} width={0.6} color={SK.tan} />
      <InkLine pts={rp([[320, 73], [214, 58]])} seed={3403} width={0.6} color={SK.tan} />
      <Person x={70} y={214} h={150} look={{ hair: "curly", skin: SK.tan, skinOpacity: 0.6, wear: SK.sky, outfit: "jacket" }} arms={["down", "hip"]} seed={3410} />
      <Person x={330} y={214} h={150} look={{ hair: "short", hairTone: SK.ink, wear: SK.charcoal }} arms={["down", "hip"]} flip seed={3420} />
      <Person x={200} y={214} h={170} look={BETTER} arms={["hip", "hip"]} seed={3430} />
      <ShoesOn x={200} y={214} h={170} seed={3440} />
      <Star x={200} y={24} r={14} seed={3450} />
    </SketchFrame>
  );
}

/** Experiential value: pleasure, excitement, comfort, meaning. */
export function ExperientialValue() {
  const spark = (x: number, y: number, r: number, seed: number) => (
    <InkLine pts={sharp(rp([[x, y - r], [x + r * 0.22, y - r * 0.22], [x + r, y], [x + r * 0.22, y + r * 0.22], [x, y + r], [x - r * 0.22, y + r * 0.22], [x - r, y], [x - r * 0.22, y - r * 0.22]]), true, 0.6)} seed={seed} width={1} amp={0.2} closed />
  );
  return (
    <SketchFrame
      id="sk-experiential-value"
      width={400}
      height={240}
      label="A person in teal running shoes with both arms raised in joy, a heart and a few sparkles around them."
    >
      <Backwash cx={200} cy={124} rx={176} ry={110} seed={3500} />
      <Ground x0={60} x1={340} y={214} seed={3501} />
      <Person x={200} y={214} h={160} look={BETTER} arms={["up", "up"]} seed={3510} />
      <ShoesOn x={200} y={214} h={160} seed={3520} />
      <Heart x={200} y={26} s={1.2} seed={3530} />
      {spark(120, 70, 10, 3540)}
      {spark(286, 60, 8, 3541)}
      {spark(290, 130, 11, 3542)}
      {spark(110, 142, 7, 3543)}
    </SketchFrame>
  );
}

/** The one that fits their values, not the one with the most features. */
export function FitsValues() {
  const card = (x0: number) => sharp([[x0, 44], [x0 + 140, 44], [x0 + 140, 244], [x0, 244]], true, 4);
  return (
    <SketchFrame
      id="sk-fits-values"
      width={800}
      height={300}
      label="A consumer thinks of a heart. Two products: one with a long list of eight ticked features, marked most features; one with four teal ticks and the same heart on it, marked fits their values. An arrow runs from the heart in the consumer's thought to the heart on the second product."
    >
      <Backwash cx={180} cy={160} rx={170} ry={136} seed={3600} />
      <Backwash cx={560} cy={150} rx={230} ry={138} seed={3602} />
      <Ground x0={30} x1={250} y={270} seed={3603} />
      <Person x={100} y={270} h={180} look={BETTER} arms={["hip", "chin"]} seed={3610} />
      <Thought x={186} y={74} rx={40} ry={32} tx={116} ty={104} seed={3620} />
      <Heart x={186} y={76} s={1.2} seed={3630} />

      {/* most features */}
      <Paper pts={card(330)} seed={3650} />
      <InkLine pts={card(330)} seed={3651} width={1.1} closed />
      {Array.from({ length: 8 }, (_, i) => (
        <g key={i}>
          <Tick1 x={352} y={68 + i * 22} s={0.75} seed={3660 + i * 2} color={SK.ink} />
          <InkLine pts={rp([[366, 68 + i * 22], [366 + [80, 66, 74, 58, 82, 62, 70, 54][i], 68 + i * 22]])} seed={3661 + i * 2} width={1.3} amp={0.25} />
        </g>
      ))}
      <SketchText x={400} y={274} anchor="middle" size={11}>
        MOST FEATURES
      </SketchText>

      {/* fits their values */}
      <Paper pts={card(570)} seed={3680} />
      <Wash pts={card(570)} seed={3681} fill={SK.sky} opacity={0.35} dx={2} dy={2} />
      <InkLine pts={card(570)} seed={3682} width={1.4} closed />
      <Heart x={640} y={96} s={1.4} seed={3683} />
      {Array.from({ length: 4 }, (_, i) => (
        <g key={i}>
          <Tick1 x={592} y={150 + i * 22} s={0.75} seed={3690 + i * 2} />
          <InkLine pts={rp([[606, 150 + i * 22], [606 + [80, 66, 74, 58][i], 150 + i * 22]])} seed={3691 + i * 2} width={1.3} amp={0.25} />
        </g>
      ))}
      <SketchText x={640} y={274} anchor="middle" size={11}>
        FITS THEIR VALUES
      </SketchText>
      <SketchArrow pts={curvePts([228, 62], [440, -24], [626, 78], 18)} seed={3640} width={1.2} color={SK.tan} />
    </SketchFrame>
  );
}

/* ==========================================================================
   DISCUSSION · find the motive
   ========================================================================== */

/** The four theories in miniature, each as it was drawn on its own slide. */
function TheoryMini({ kind, x, y }: { kind: 0 | 1 | 2 | 3; x: number; y: number }) {
  if (kind === 0) {
    return (
      <g>
        <Gauge x={x - 16} top={y - 36} h={72} w={22} level={0.18} seed={3700} />
        <SketchArrow pts={rp([[x + 26, y - 30], [x + 27, y], [x + 26, y + 30]])} seed={3705} width={1.3} head={7} />
      </g>
    );
  }
  if (kind === 1) {
    return (
      <g transform={`translate(${x} ${y}) scale(1.5) translate(${-x} ${-y})`}>
        <Dumbbell x={x - 50} y={y} s={0.42} seed={3710} />
        <SketchArrow pts={rp([[x - 28, y], [x - 12, y]])} seed={3715} width={1.1} head={5} />
        {[0, 1, 2].map((i) => {
          const bx = x - 4 + i * 9;
          const bh = 12 + i * 9;
          const pts = sharp([[bx - 3.5, y + 16], [bx - 3.5, y + 16 - bh], [bx + 3.5, y + 16 - bh], [bx + 3.5, y + 16]], true, 1);
          return <InkLine key={i} pts={pts} seed={3716 + i} width={1} closed />;
        })}
        <SketchArrow pts={rp([[x + 24, y], [x + 38, y]])} seed={3720} width={1.1} head={5} />
        <Trophy x={x + 54} y={y - 12} s={0.34} seed={3722} />
      </g>
    );
  }
  if (kind === 2) {
    return <Pyramid x={x} top={y - 36} base={y + 36} half={40} seed={3730} fills={[SK.camel, SK.earth, SK.blush, SK.ochre, SK.sky]} line={1.1} />;
  }
  return (
    <g>
      <Option x={x - 46} y={y - 10} r={15} kind="plus" seed={3740} />
      <Option x={x + 46} y={y - 10} r={15} kind="plus" seed={3745} />
      <Person x={x} y={y + 38} h={80} look={PLAIN} arms={["reach", "reach"]} seed={3750} />
    </g>
  );
}

export function FindTheMotive() {
  const left = 344;
  const right = 456;
  const bottom = 262;
  const teeth = 8;
  const step = (right - left) / teeth;
  const outline: Pt[] = [[left, 50], [right, 50], [right, bottom]];
  for (let i = 0; i < teeth; i++) {
    const x0 = right - i * step;
    outline.push([x0 - step / 2, bottom - 8], [x0 - step, bottom]);
  }
  const receipt = rp(outline);
  const spots: { kind: 0 | 1 | 2 | 3; x: number; y: number; t: string; from: Pt; to: Pt }[] = [
    { kind: 0, x: 150, y: 92, t: "DRIVE REDUCTION", from: [left - 6, 100], to: [216, 92] },
    { kind: 1, x: 650, y: 92, t: "EXPECTANCY", from: [right + 6, 100], to: [548, 94] },
    { kind: 2, x: 150, y: 234, t: "HIERARCHY OF NEEDS", from: [left - 6, 212], to: [216, 232] },
    { kind: 3, x: 650, y: 234, t: "MOTIVATIONAL CONFLICT", from: [right + 6, 212], to: [584, 226] },
  ];
  return (
    <SketchFrame
      id="sk-find-the-motive"
      width={800}
      height={330}
      label="A receipt for a recent purchase with a large question mark on it. Lines run from it to four small drawings: a nearly empty tension gauge with a falling arrow, marked drive reduction; a dumbbell leading to rising bars and a trophy, marked expectancy; the needs pyramid, marked hierarchy of needs; and a person reaching for two attractive options, marked motivational conflict."
    >
      <Backwash cx={400} cy={160} rx={380} ry={150} seed={3760} />
      {spots.map((sp, i) => (
        <InkLine key={sp.t} pts={rp([sp.from, sp.to])} seed={3770 + i} width={0.9} />
      ))}
      <Paper pts={receipt} seed={3780} />
      <InkLine pts={receipt} seed={3781} closed />
      <InkLine pts={rp([[362, 78], [438, 78]])} seed={3782} width={1.6} amp={0.3} />
      <InkLine pts={rp([[362, 94], [414, 94]])} seed={3783} width={1.6} amp={0.3} />
      <SketchText x={400} y={196} anchor="middle" size={76} serif>
        ?
      </SketchText>
      <InkLine pts={rp([[362, 226], [438, 226]])} seed={3784} width={0.8} />
      {spots.map((sp) => (
        <g key={sp.t}>
          <TheoryMini kind={sp.kind} x={sp.x} y={sp.y} />
          <SketchText x={sp.x} y={sp.y + 62} anchor="middle" size={11}>
            {sp.t}
          </SketchText>
        </g>
      ))}
    </SketchFrame>
  );
}
