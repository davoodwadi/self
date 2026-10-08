/* ==========================================================================
   Consumer Behavior · Week 09 — figures
   --------------------------------------------------------------------------
   Editorial Sketch plates for postpurchase behavior, satisfaction and
   loyalty: wobbly doubled ink and loose watercolour washes set off-register.
   Every mark comes from ../_visuals; the style rules live in ../CLAUDE.md.

   Fixed cast for this week:
     · Person: every human, one fashion-illustration figure (the OWNER look
       for the week's buyer), varied only by hair, clothes and skin washes.
     · Headphones: the purchase the week follows, from unboxing to disposal.
     · Face: the one mark for how satisfied a consumer feels.
     · ReviewCard: every online review.
     · CoffeeBag: the routine product an agent reorders; the brand badge
       marks the consumer's usual brand.
     · Agent: the AI agent (shared: a phone with the AI sparkle).

   Colour roles: teal is the one thing chosen, bought, lit or ticked on a
   plate; ochre a badge, a count or a small highlight; pencil only an absent
   object (a review not written, an option not chosen).
   ========================================================================== */

import React from "react";
import {
  blobPts,
  InkLine,
  Paper,
  PencilLine,
  PlateButton,
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
  Clock,
  Ground,
  handAt,
  Heart,
  type Look,
  Notes,
  Person,
  ReviewCard,
  rp,
  sharp,
  SketchArrow,
  SpeechBubble,
  Star,
  Stars,
  Thought,
  Tick2,
} from "../_visuals/objects";

/* -- the week's looks ---------------------------------------------------- */

const OWNER: Look = { hair: "curly", hairTone: SK.brown, wear: SK.camel, legs: SK.charcoal, skin: SK.tan, skinOpacity: 0.55 };
const FRIEND: Look = { hair: "long", hairTone: SK.leather, wear: SK.sky, legs: SK.charcoal };
const CLERK: Look = { hair: "short", hairTone: SK.charcoal, wear: SK.stone, legs: SK.charcoal, skin: SK.camel, skinOpacity: 0.6 };
const BUYER: Look = { hair: "bun", hairTone: SK.tan, wear: SK.blush, legs: SK.leather };

/* -- the cast ------------------------------------------------------------- */

/**
 * The week's purchase: over-ear headphones seen from the front, band centre
 * top at (x, y - 30 s). `broken` snaps the band beside the left hinge.
 */
export function Headphones({
  x,
  y,
  s = 1,
  seed,
  broken = false,
  pencil = false,
  fill = SK.charcoal,
}: {
  x: number;
  y: number;
  s?: number;
  seed: number;
  broken?: boolean;
  pencil?: boolean;
  fill?: string;
}) {
  const band = (pts: Pt[]) => at(x, y, pts, s);
  const outer: Pt[] = [[-25, -2], [-24, -18], [-16, -29], [0, -33], [16, -29], [24, -18], [25, -2]];
  const inner: Pt[] = [[-20, -2], [-19.5, -16], [-13, -24], [0, -27.5], [13, -24], [19.5, -16], [20, -2]];
  const cup = (side: 1 | -1) =>
    sharp(at(x, y, [[side * 17, -6], [side * 31, -6], [side * 31, 16], [side * 17, 16]], s), true, 4 * s);
  const pad = (side: 1 | -1) => at(x, y, [[side * 15, -3], [side * 17, -3], [side * 17, 13], [side * 15, 13]], s);
  const Line = pencil ? PencilLine : InkLine;
  const bandL = broken ? outer.slice(0, 3) : outer;
  const bandR = broken ? outer.slice(3) : [];
  return (
    <g>
      {pencil ? null : (
        <>
          <Wash pts={cup(-1)} seed={seed} fill={fill} opacity={0.6} dx={0.8} dy={0.6} />
          <Wash pts={cup(1)} seed={seed + 1} fill={fill} opacity={0.6} dx={0.8} dy={0.6} />
          <Wash pts={pad(-1)} seed={seed + 2} fill={SK.tan} opacity={0.6} dx={0.3} dy={0.3} />
          <Wash pts={pad(1)} seed={seed + 3} fill={SK.tan} opacity={0.6} dx={0.3} dy={0.3} />
        </>
      )}
      <Line pts={cup(-1)} seed={seed + 4} closed />
      <Line pts={cup(1)} seed={seed + 5} closed />
      <Line pts={pad(-1)} seed={seed + 6} width={0.8} closed />
      <Line pts={pad(1)} seed={seed + 7} width={0.8} closed />
      {broken ? (
        <>
          <Line pts={band(bandL)} seed={seed + 8} />
          <Line pts={band(inner.slice(0, 3))} seed={seed + 9} width={0.9} />
          <Line pts={band([[-11, -32], ...bandR])} seed={seed + 10} />
          <Line pts={band([[-9, -26], ...inner.slice(3)])} seed={seed + 11} width={0.9} />
        </>
      ) : (
        <>
          <Line pts={band(outer)} seed={seed + 8} />
          <Line pts={band(inner)} seed={seed + 9} width={0.9} />
        </>
      )}
    </g>
  );
}

/** How satisfied a consumer feels: a small face, `mood` 1 (smile) to -1 (frown). */
export function Face({ x, y, r = 14, mood, seed, lit = false }: { x: number; y: number; r?: number; mood: number; seed: number; lit?: boolean }) {
  const head = rp(blobPts(x, y, r, r, seed, 14, 0.05));
  const m = Math.max(-1, Math.min(1, mood));
  const my = y + r * 0.38;
  const bend = r * 0.24 * m;
  return (
    <g>
      {lit ? <Wash pts={head} seed={seed + 1} fill={SK.teal} opacity={0.8} dx={0.8} dy={0.6} /> : <Paper pts={head} seed={seed + 1} />}
      <InkLine pts={head} seed={seed + 2} width={1.2} closed />
      <InkLine pts={rp([[x - r * 0.4, y - r * 0.2], [x - r * 0.3, y - r * 0.12]])} seed={seed + 3} width={1.5} amp={0.1} />
      <InkLine pts={rp([[x + r * 0.3, y - r * 0.2], [x + r * 0.4, y - r * 0.12]])} seed={seed + 4} width={1.5} amp={0.1} />
      <InkLine
        pts={rp([[x - r * 0.42, my - bend * 0.4], [x - r * 0.2, my + bend * 0.5], [x, my + bend * 0.7], [x + r * 0.2, my + bend * 0.5], [x + r * 0.42, my - bend * 0.4]])}
        seed={seed + 5}
        width={1.3}
        amp={0.15}
      />
    </g>
  );
}

/**
 * A stand-up coffee bag on (x, bottom), `w` wide: the routine product an agent
 * reorders. `badge` marks the consumer's usual brand.
 */
export function CoffeeBag({
  x,
  bottom,
  w = 46,
  h = 66,
  seed,
  badge = false,
  fill = SK.leather,
  lit = false,
}: {
  x: number;
  bottom: number;
  w?: number;
  h?: number;
  seed: number;
  badge?: boolean;
  fill?: string;
  lit?: boolean;
}) {
  const t = bottom - h;
  const body = rp([[x - w / 2, t + 8], [x + w / 2, t + 8], [x + w / 2 + 2, bottom], [x - w / 2 - 2, bottom]]);
  const top = sharp(rp([[x - w / 2, t], [x + w / 2, t], [x + w / 2, t + 8], [x - w / 2, t + 8]]), true, 1);
  const label = sharp(rp([[x - w * 0.34, t + h * 0.36], [x + w * 0.34, t + h * 0.36], [x + w * 0.34, t + h * 0.8], [x - w * 0.34, t + h * 0.8]]), true, 1.5);
  return (
    <g>
      {lit ? <Backwash cx={x} cy={r2(bottom - h / 2)} rx={r2(w * 0.95)} ry={r2(h * 0.7)} seed={seed + 9} fill={SK.teal} opacity={0.45} /> : null}
      <Wash pts={body} seed={seed} fill={fill} opacity={0.72} />
      <Wash pts={top} seed={seed + 1} fill={fill} opacity={0.5} dx={0.5} dy={0.3} />
      <InkLine pts={body} seed={seed + 2} closed />
      <InkLine pts={top} seed={seed + 3} width={1} closed />
      <Paper pts={label} seed={seed + 4} />
      <InkLine pts={label} seed={seed + 5} width={0.9} closed />
      {badge ? (
        <BrandBadge x={x} y={r2(t + h * 0.58)} r={r2(w * 0.17)} seed={seed + 6} />
      ) : (
        <>
          <InkLine pts={rp([[x - w * 0.2, t + h * 0.52], [x + w * 0.2, t + h * 0.52]])} seed={seed + 6} width={0.9} />
          <InkLine pts={rp([[x - w * 0.14, t + h * 0.64], [x + w * 0.14, t + h * 0.64]])} seed={seed + 7} width={0.8} />
        </>
      )}
    </g>
  );
}

/* ==========================================================================
   Title Slide
   ========================================================================== */

/**
 * The parcel, seen from above, just opened: the headphones lie in their
 * tissue, and beside the box sits the card that asks how the purchase went,
 * its stars not yet filled in.
 */
export function AfterTheSale() {
  const bx = 70;
  const by = 74;
  const bw = 250;
  const bh = 210;
  const box = rp([[bx, by], [bx + bw, by], [bx + bw, by + bh], [bx, by + bh]]);
  const flapT = rp([[bx, by], [bx + 26, by - 44], [bx + bw - 26, by - 44], [bx + bw, by]]);
  const flapB = rp([[bx, by + bh], [bx + 22, by + bh + 40], [bx + bw - 22, by + bh + 40], [bx + bw, by + bh]]);
  const flapL = rp([[bx, by], [bx - 46, by + 22], [bx - 46, by + bh - 22], [bx, by + bh]]);
  const flapR = rp([[bx + bw, by], [bx + bw + 40, by + 26], [bx + bw + 40, by + bh - 26], [bx + bw, by + bh]]);
  const inner = rp([[bx + 14, by + 14], [bx + bw - 14, by + 14], [bx + bw - 14, by + bh - 14], [bx + 14, by + bh - 14]]);
  const tissue = rp(blobPts(bx + bw / 2, by + bh / 2, 92, 76, 1031, 16, 0.18));
  const cx = 452;
  const cy = 150;
  const card = sharp(rp([[cx - 70, cy - 46], [cx + 70, cy - 52], [cx + 74, cy + 52], [cx - 66, cy + 58]]), true, 2);
  return (
    <SketchFrame
      id="sk-after-the-sale"
      width={560}
      height={380}
      label="An opened delivery box seen from above, a pair of headphones lying in its tissue paper. Beside it, a card asks HOW WAS IT? above five empty stars."
    >
      <Backwash cx={280} cy={190} rx={270} ry={176} seed={1000} />
      {[flapT, flapB, flapL, flapR].map((f, i) => (
        <g key={i}>
          <Wash pts={f} seed={1001 + i * 2} fill={SK.camel} opacity={0.42} />
          <InkLine pts={f} seed={1002 + i * 2} width={1.1} closed />
        </g>
      ))}
      <Wash pts={box} seed={1010} fill={SK.camel} opacity={0.62} />
      <InkLine pts={box} seed={1011} closed />
      <Wash pts={inner} seed={1012} fill={SK.tan} opacity={0.4} dx={1} dy={1} />
      <InkLine pts={inner} seed={1013} width={0.9} closed />
      <Paper pts={tissue} seed={1014} />
      <InkLine pts={tissue} seed={1015} width={0.8} closed />
      <Headphones x={bx + bw / 2} y={by + bh / 2 + 22} s={2.6} seed={1020} />
      {/* the card asking for a judgment */}
      <g>
        <Paper pts={card} seed={1040} />
        <InkLine pts={card} seed={1041} width={1.1} closed />
        <SketchText x={cx + 2} y={cy - 14} anchor="middle" size={15} serif>
          How was it?
        </SketchText>
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} x={r2(cx - 48 + i * 24)} y={cy + 20} r={9} seed={1050 + i * 3} filled={false} />
        ))}
      </g>
    </SketchFrame>
  );
}

/* ==========================================================================
   After the Purchase
   ========================================================================== */

/** Headphones worn by a Person standing at (x, y), h tall, facing +x. */
function WornHeadphones({ x, y, h, seed, flip = false }: { x: number; y: number; h: number; seed: number; flip?: boolean }) {
  const s = h / 200;
  const f = flip ? -1 : 1;
  const P = (pts: Pt[]) => rp(pts.map(([px, py]) => [x + f * px * s, y + py * s] as Pt));
  const cup = P(blobPts(-6, -185, 4.6, 6.8, seed, 10, 0.05));
  return (
    <g>
      <InkLine pts={P([[-6.5, -191], [-8.5, -200], [-2, -207.5], [6, -206], [11, -196]])} seed={seed + 1} width={2.2} amp={0.3} />
      <Wash pts={cup} seed={seed + 2} fill={SK.charcoal} opacity={0.75} dx={0.4} dy={0.3} />
      <InkLine pts={cup} seed={seed + 3} width={1} closed />
    </g>
  );
}

/**
 * Four moments after the sale, one owner throughout: wearing the headphones,
 * weighing them up, telling a friend about them and, at last, dropping them
 * into a box to pass on.
 */
export function ProductLife() {
  const g = 262;
  const h = 150;
  const hold = handAt(280, g, h, "reach", 1);
  const drop = handAt(640, g, h, "low", 1);
  return (
    <SketchFrame
      id="sk-product-life"
      width={800}
      height={290}
      label="Four scenes of the same owner after buying headphones. Using it: wearing them, music notes beside the head. Judging it: hand on chin, holding the headphones, a thought cloud with three of five stars. Talking about it: telling a friend, a speech bubble with the headphones. Getting rid of it: dropping them into an open box."
    >
      <Backwash cx={400} cy={164} rx={396} ry={124} seed={1100} />
      <Ground x0={20} x1={780} y={g} seed={1101} />
      {[
        ["USING IT", 100],
        ["JUDGING IT", 300],
        ["TALKING ABOUT IT", 500],
        ["GETTING RID OF IT", 700],
      ].map(([t, x]) => (
        <SketchText key={t as string} x={x as number} y={22} anchor="middle" size={11}>
          {t}
        </SketchText>
      ))}

      {/* using it */}
      <Person x={84} y={g} h={h} look={OWNER} arms={["hip", "down"]} seed={1110} />
      <WornHeadphones x={84} y={g} h={h} seed={1180} />
      <Notes x={122} y={r2(g - 132)} s={0.75} seed={1181} />

      {/* judging it */}
      <Person x={280} y={g} h={h} look={OWNER} arms={["hip", "reach"]} seed={1120} />
      <Headphones x={r2(hold[0] + 12)} y={r2(hold[1] + 2)} s={0.62} seed={1185} />
      <Thought x={346} y={r2(g - 190)} rx={44} ry={20} tx={292} ty={r2(g - 150)} seed={1186} />
      <Stars x={318} y={r2(g - 190)} n={3} r={6.5} gap={14} seed={1190} />

      {/* talking about it */}
      <Person x={462} y={g} h={h} look={OWNER} arms={["down", "low"]} seed={1130} />
      <Person x={548} y={g} h={h * 0.96} look={FRIEND} arms={["hip", "down"]} flip seed={1140} />
      <SpeechBubble x={500} y={r2(g - 196)} w={62} h={40} tx={476} ty={r2(g - 160)} seed={1195} />
      <Headphones x={500} y={r2(g - 191)} s={0.6} seed={1197} />

      {/* getting rid of it */}
      <Person x={668} y={g} h={h} look={OWNER} arms={["down", "low"]} seed={1150} />
      <Headphones x={r2(drop[0] + 26)} y={r2(drop[1] + 16)} s={0.5} seed={1160} />
      <g>
        {(() => {
          const bx = 736;
          const box = rp([[bx - 30, g - 46], [bx + 30, g - 46], [bx + 30, g], [bx - 30, g]]);
          const flapL = rp([[bx - 30, g - 46], [bx - 44, g - 60], [bx - 16, g - 62], [bx - 2, g - 46]]);
          const flapR = rp([[bx + 30, g - 46], [bx + 42, g - 62], [bx + 16, g - 64], [bx + 2, g - 46]]);
          return (
            <>
              <Wash pts={flapL} seed={1170} fill={SK.camel} opacity={0.4} />
              <InkLine pts={flapL} seed={1171} width={1} closed />
              <Wash pts={flapR} seed={1172} fill={SK.camel} opacity={0.4} />
              <InkLine pts={flapR} seed={1173} width={1} closed />
              <Wash pts={box} seed={1174} fill={SK.camel} opacity={0.65} />
              <InkLine pts={box} seed={1175} closed />
            </>
          );
        })()}
      </g>
    </SketchFrame>
  );
}

/** A stack of `n` coins standing on (x, bottom): the cost of something. */
function Coins({ x, bottom, n, w = 34, seed }: { x: number; bottom: number; n: number; w?: number; seed: number }) {
  const t = w * 0.22;
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const y = r2(bottom - t / 2 - i * t * 0.95);
        const dx = r2((seeded(seed + i)() - 0.5) * 3);
        const rim = rp([[x + dx - w / 2, y - t / 2], [x + dx + w / 2, y - t / 2], [x + dx + w / 2, y + t / 2], [x + dx - w / 2, y + t / 2]]);
        return (
          <g key={i}>
            <Wash pts={rim} seed={seed + i * 3} fill={SK.ochre} opacity={0.75} dx={0.6} dy={0.3} />
            <InkLine pts={sharp(rim, true, t * 0.45)} seed={seed + i * 3 + 1} width={1} amp={0.3} closed />
          </g>
        );
      })}
    </g>
  );
}

/**
 * The cost of keeping against the cost of winning: an existing customer, back
 * with the brand's bag, beside a short stack of coins; a new customer beside
 * a tall one.
 */
export function KeepVsWin() {
  const g = 238;
  return (
    <SketchFrame
      id="sk-keep-vs-win"
      width={400}
      height={262}
      label="Two customers. KEEP: an existing customer carrying the brand's shopping bag, beside a short stack of three coins. WIN: a new customer, empty-handed, beside a tall stack of ten coins."
    >
      <Backwash cx={200} cy={146} rx={194} ry={112} seed={1200} />
      <Ground x0={24} x1={376} y={g} seed={1201} />
      <SketchText x={104} y={28} anchor="middle" size={12}>
        KEEP
      </SketchText>
      <SketchText x={296} y={28} anchor="middle" size={12}>
        WIN
      </SketchText>
      <InkLine pts={rp([[200, 40], [200, g - 12]])} seed={1202} width={0.8} />
      <Person x={84} y={g} h={170} look={OWNER} arms={["hip", "carry"]} seed={1210} />
      <Bag x={r2(handAt(84, g, 170, "carry")[0] + 2)} y={r2(handAt(84, g, 170, "carry")[1])} w={30} seed={1230} />
      <Coins x={156} bottom={g - 2} n={3} seed={1240} />
      <Person x={262} y={g} h={164} look={BUYER} arms={["down", "hip"]} seed={1250} />
      <Coins x={336} bottom={g - 2} n={10} seed={1270} />
    </SketchFrame>
  );
}

/* ==========================================================================
   Expectations and Reality: The Disconfirmation Model
   ========================================================================== */

const LV_TOP = 86;
const LV_BOTTOM = 256;
const START_EXPECT = 160;
const START_PERFORM = 156;
/** Levels closer than this (in drawing units) read as a match: confirmation. */
const MATCH = 14;
const clampLv = (y: number) => Math.round(Math.min(LV_BOTTOM, Math.max(LV_TOP, y)));

/** The ad that sets the expectation: a small poster with the headphones. */
function AdPoster({ x, y, seed }: { x: number; y: number; seed: number }) {
  const card = sharp(rp([[x - 42, y - 32], [x + 42, y - 32], [x + 42, y + 32], [x - 42, y + 32]]), true, 2);
  return (
    <g>
      <Paper pts={card} seed={seed} />
      <InkLine pts={card} seed={seed + 1} width={1.2} closed />
      <Stars x={x - 28} y={r2(y - 19)} n={5} r={4.8} gap={14} seed={seed + 20} />
      <Headphones x={x - 16} y={r2(y + 18)} s={0.62} seed={seed + 2} />
      <InkLine pts={rp([[x + 6, y + 4], [x + 34, y + 4]])} seed={seed + 40} width={0.8} />
      <InkLine pts={rp([[x + 6, y + 14], [x + 28, y + 14]])} seed={seed + 41} width={0.8} />
    </g>
  );
}

/**
 * The disconfirmation model as an instrument. Two rails share one scale: on
 * the left, the ad that set the consumer's expectations; on the right, the
 * headphones as they performed in use. Drag either one. A bracket measures
 * the gap, and the face on the right reports the verdict: positive
 * disconfirmation, confirmation or negative disconfirmation.
 */
export function Disconfirmation() {
  const [e, setE] = React.useState(START_EXPECT);
  const [p, setP] = React.useState(START_PERFORM);
  const drag = React.useRef<"e" | "p" | null>(null);
  const xe = 150;
  const xp = 400;
  const xb = 276;
  const gap = e - p; // positive: performance sits above expectations
  const kind = gap > MATCH ? "positive" : gap < -MATCH ? "negative" : "confirmation";

  const toY = (ev: React.PointerEvent<SVGGElement>) => {
    const svg = ev.currentTarget.ownerSVGElement!;
    const pt = svg.createSVGPoint();
    pt.x = ev.clientX;
    pt.y = ev.clientY;
    return pt.matrixTransform(svg.getScreenCTM()!.inverse()).y;
  };
  const grab = (which: "e" | "p") => ({
    onPointerDown: (ev: React.PointerEvent<SVGGElement>) => {
      drag.current = which;
      ev.currentTarget.setPointerCapture(ev.pointerId);
    },
    onPointerMove: (ev: React.PointerEvent<SVGGElement>) => {
      if (drag.current !== which) return;
      const y = clampLv(toY(ev));
      if (which === "e") setE(y);
      else setP(y);
    },
    onPointerUp: () => {
      drag.current = null;
    },
    onKeyDown: (ev: React.KeyboardEvent<SVGGElement>) => {
      const step = ev.key === "ArrowUp" ? -8 : ev.key === "ArrowDown" ? 8 : 0;
      if (!step) return;
      ev.preventDefault();
      if (which === "e") setE((y) => clampLv(y + step));
      else setP((y) => clampLv(y + step));
    },
    tabIndex: 0,
    role: "slider",
    "aria-label": which === "e" ? "Expectations" : "Perceived performance",
    "aria-valuemin": 0,
    "aria-valuemax": 100,
    "aria-valuenow": Math.round(((LV_BOTTOM - (which === "e" ? e : p)) / (LV_BOTTOM - LV_TOP)) * 100),
    "aria-orientation": "vertical" as const,
    style: { cursor: "ns-resize", touchAction: "none", outline: "none" } as React.CSSProperties,
  });

  const verdict = {
    positive: ["POSITIVE DISCONFIRMATION", "SATISFIED OR DELIGHTED"],
    confirmation: ["CONFIRMATION", "SATISFIED"],
    negative: ["NEGATIVE DISCONFIRMATION", "DISSATISFIED"],
  }[kind];
  const mood = kind === "positive" ? 1 : kind === "confirmation" ? 0.55 : -1;
  const label = `Two rails on one scale. Left: an ad for headphones, set at the level of the consumer's expectations. Right: the headphones, set at the level of their perceived performance${gap > 4 ? ", higher than the ad" : gap < -4 ? ", lower than the ad" : ", level with the ad"}. A bracket marks the gap. Verdict: ${verdict[0].toLowerCase()}, the consumer is ${verdict[1].toLowerCase()}.`;
  const top = Math.min(e, p);
  const bottom = Math.max(e, p);

  const chevrons = (x: number, y: number, d: number, seed: number) => (
    <g>
      <InkLine pts={rp([[x - 7, y - d + 7], [x, y - d], [x + 7, y - d + 7]])} seed={seed} width={1.2} amp={0.25} />
      <InkLine pts={rp([[x - 7, y + d - 7], [x, y + d], [x + 7, y + d - 7]])} seed={seed + 1} width={1.2} amp={0.25} />
    </g>
  );

  return (
    <>
      <SketchFrame id="sk-disconfirmation" width={800} height={310} label={label}>
        <Backwash cx={400} cy={160} rx={394} ry={146} seed={1300} />
        <SketchText x={xe} y={20} anchor="middle" size={12}>
          EXPECTATIONS
        </SketchText>
        <SketchText x={xp} y={20} anchor="middle" size={12}>
          PERCEIVED PERFORMANCE
        </SketchText>
        {/* the shared scale and the two rails, broken where the objects sit */}
        <SketchText x={40} y={LV_TOP - 26} anchor="middle" size={10.5}>
          HIGH
        </SketchText>
        <SketchText x={40} y={LV_BOTTOM + 44} anchor="middle" size={10.5}>
          LOW
        </SketchText>
        <InkLine pts={rp([[40, LV_TOP - 12], [40, LV_BOTTOM + 26]])} seed={1305} width={0.9} amp={0.4} />
        {([[xe, e], [xp, p]] as const).map(([x, y], k) => (
          <g key={x}>
            {y - 60 > LV_TOP - 34 ? <InkLine pts={rp([[x, LV_TOP - 34], [x, y - 60]])} seed={1310 + k} width={0.9} amp={0.5} /> : null}
            {y + 60 < LV_BOTTOM + 40 ? <InkLine pts={rp([[x, y + 60], [x, LV_BOTTOM + 40]])} seed={1312 + k} width={0.9} amp={0.5} /> : null}
          </g>
        ))}
        {/* level lines and the gap */}
        <InkLine pts={rp([[xe + 48, e], [xb - 6, e]])} seed={1320} width={1} />
        <InkLine pts={rp([[xp - 40, p], [xb + 6, p]])} seed={1321} width={1} />
        {Math.abs(gap) > 4 ? (
          <g>
            <InkLine pts={rp([[xb, top + 3], [xb, bottom - 3]])} seed={1322} width={1.6} />
            <InkLine pts={rp([[xb - 5, top + 9], [xb, top + 2], [xb + 5, top + 9]])} seed={1323} width={1.4} amp={0.2} />
            <InkLine pts={rp([[xb - 5, bottom - 9], [xb, bottom - 2], [xb + 5, bottom - 9]])} seed={1324} width={1.4} amp={0.2} />
          </g>
        ) : null}

        {/* the ad: what the consumer expected */}
        <g {...grab("e")}>
          <rect x={xe - 46} y={e - 52} width={92} height={104} fill="transparent" />
          <AdPoster x={xe} y={e} seed={1330} />
          {chevrons(xe, e, 50, 1370)}
        </g>
        {/* the headphones: how they performed */}
        <g {...grab("p")}>
          <rect x={xp - 40} y={p - 52} width={80} height={104} fill="transparent" />
          <Headphones x={xp} y={r2(p + 8)} s={1.15} seed={1380} />
          {chevrons(xp, p, 50, 1400)}
        </g>

        {/* the verdict */}
        <Face x={640} y={140} r={40} mood={mood} seed={1410} lit={kind !== "negative"} />
        <SketchText x={640} y={210} anchor="middle" size={12.5}>
          {verdict[0]}
        </SketchText>
        <SketchText x={640} y={232} anchor="middle" size={12.5}>
          {verdict[1]}
        </SketchText>
      </SketchFrame>
      <div className="mt-2 flex flex-wrap items-center gap-2 px-1" aria-live="polite">
        <PlateButton
          onClick={() => {
            setE(LV_TOP + 4);
            setP(START_PERFORM);
          }}
        >
          Promise too much
        </PlateButton>
        <PlateButton
          onClick={() => {
            setE(START_EXPECT);
            setP(START_PERFORM);
          }}
        >
          Reset
        </PlateButton>
      </div>
    </>
  );
}

/* ==========================================================================
   Other Influences on Satisfaction
   ========================================================================== */

/**
 * Equity as a balance: on one pan, what the consumer gave (coins and the time
 * and effort of a clock); on the other, what the consumer received (the
 * headphones). The beam hangs level: a fair exchange.
 */
export function EquityScale() {
  const px = 200;
  const beamY = 92;
  const panY = 196;
  const L = 96;
  const R = 304;
  const pan = (x: number) => rp([[x - 70, panY], [x + 70, panY], [x + 52, panY + 14], [x - 52, panY + 14]]);
  return (
    <SketchFrame
      id="sk-equity-scale"
      width={400}
      height={270}
      label="A balance scale hanging level. On the left pan, what the consumer gave: a stack of coins and a clock. On the right pan, what the consumer received: the headphones."
    >
      <Backwash cx={200} cy={150} rx={194} ry={118} seed={1500} />
      {/* post and foot */}
      <Wash pts={rp([[px - 34, 252], [px + 34, 252], [px + 26, 238], [px - 26, 238]])} seed={1501} fill={SK.leather} opacity={0.6} />
      <InkLine pts={rp([[px - 34, 252], [px + 34, 252], [px + 26, 238], [px - 26, 238]])} seed={1502} closed />
      <InkLine pts={rp([[px - 3, 238], [px - 3, beamY + 4]])} seed={1503} />
      <InkLine pts={rp([[px + 3, 238], [px + 3, beamY + 4]])} seed={1504} />
      {/* beam */}
      <InkLine pts={rp([[L, beamY], [R, beamY]])} seed={1505} width={1.6} />
      <InkLine pts={rp(blobPts(px, beamY, 6, 6, 1506, 10, 0.05))} seed={1507} width={1.2} closed />
      {/* chains and pans */}
      {[L, R].map((x, i) => (
        <g key={x}>
          <InkLine pts={rp([[x, beamY], [x - 66, panY]])} seed={1510 + i * 4} width={0.8} />
          <InkLine pts={rp([[x, beamY], [x + 66, panY]])} seed={1511 + i * 4} width={0.8} />
          <Wash pts={pan(x)} seed={1512 + i * 4} fill={SK.tan} opacity={0.5} />
          <InkLine pts={pan(x)} seed={1513 + i * 4} closed />
        </g>
      ))}
      <SketchText x={L} y={232} anchor="middle" size={10.5}>
        WHAT THEY GAVE
      </SketchText>
      <SketchText x={R} y={232} anchor="middle" size={10.5}>
        WHAT THEY RECEIVED
      </SketchText>
      {/* what was given */}
      <Coins x={L - 20} bottom={panY - 1} n={4} w={30} seed={1530} />
      <Clock x={L + 18} y={panY - 17} r={15} seed={1540} />
      {/* what was received */}
      <Headphones x={R} y={panY - 16} s={1.0} seed={1550} />
    </SketchFrame>
  );
}

/**
 * Blame on the company: the band has snapped at its hinge, a weakness the
 * maker could have prevented, and the owner points straight at the brand's
 * box. A thought cloud holds a deeply unhappy face.
 */
export function BlameCompany() {
  const g = 226;
  return (
    <SketchFrame
      id="sk-blame-company"
      width={400}
      height={250}
      label="An owner points at the brand's box on the counter; between them lie the headphones with the band snapped at the hinge. A thought cloud above the owner holds a deeply unhappy face."
    >
      <Backwash cx={200} cy={140} rx={194} ry={106} seed={1600} />
      <Ground x0={30} x1={370} y={g} seed={1601} />
      <Person x={92} y={g} h={176} look={OWNER} arms={["hip", "point"]} seed={1610} />
      {/* the counter, the broken pair and the maker's box */}
      <Wash pts={rp([[176, 158], [372, 158], [372, 168], [176, 168]])} seed={1630} fill={SK.leather} opacity={0.55} />
      <InkLine pts={rp([[176, 158], [372, 158], [372, 168], [176, 168]])} seed={1631} width={1.1} closed />
      <InkLine pts={rp([[190, 168], [190, g]])} seed={1632} />
      <InkLine pts={rp([[358, 168], [358, g]])} seed={1633} />
      <Headphones x={230} y={r2(158 - 16)} s={1.05} seed={1640} broken />
      <Box x={318} bottom={158} w={56} h={66} seed={1660} />
      <Thought x={150} y={38} rx={34} ry={24} tx={102} ty={62} seed={1668} />
      <Face x={150} y={38} r={16} mood={-1} seed={1670} />
    </SketchFrame>
  );
}

/**
 * Blame on oneself: the owner knocked a mug of coffee over the headphones,
 * and stands with a hand to the forehead. Its thought cloud holds a face that is
 * only a little unhappy.
 */
export function BlameSelf() {
  const g = 226;
  return (
    <SketchFrame
      id="sk-blame-self"
      width={400}
      height={250}
      label="An owner stands with a hand to the forehead beside a table where a knocked-over mug has spilled coffee over the headphones. A thought cloud above the owner holds a slightly unhappy face."
    >
      <Backwash cx={200} cy={140} rx={194} ry={106} seed={1700} />
      <Ground x0={30} x1={370} y={g} seed={1701} />
      <Person x={104} y={g} h={176} look={OWNER} arms={["hip", "chin"]} seed={1710} />
      <Wash pts={rp([[176, 158], [372, 158], [372, 168], [176, 168]])} seed={1730} fill={SK.leather} opacity={0.55} />
      <InkLine pts={rp([[176, 158], [372, 158], [372, 168], [176, 168]])} seed={1731} width={1.1} closed />
      <InkLine pts={rp([[190, 168], [190, g]])} seed={1732} />
      <InkLine pts={rp([[358, 168], [358, g]])} seed={1733} />
      {/* the spill */}
      <Wash pts={rp(blobPts(258, 157, 52, 6, 1740, 14, 0.25))} seed={1741} fill={SK.tan} opacity={0.75} dx={0} dy={0} />
      <Headphones x={244} y={r2(158 - 16)} s={1.05} seed={1750} />
      {/* a takeaway cup, knocked on its side, its lid toward the headphones */}
      <Paper pts={rp([[302, 127], [348, 133], [348, 156], [302, 157]])} seed={1770} />
      <InkLine pts={rp([[302, 127], [348, 133], [348, 156], [302, 157]])} seed={1771} closed />
      <Wash pts={rp([[316, 129], [332, 131], [332, 156.5], [316, 157]])} seed={1772} fill={SK.camel} opacity={0.75} dx={0.5} dy={0} />
      <InkLine pts={rp([[316, 129], [316, 157]])} seed={1773} width={0.9} />
      <InkLine pts={rp([[332, 131], [332, 156.5]])} seed={1774} width={0.9} />
      <Wash pts={rp([[294, 124], [302, 125], [302, 158], [294, 158]])} seed={1775} fill={SK.charcoal} opacity={0.6} dx={0.3} dy={0} />
      <InkLine pts={rp([[294, 124], [302, 125], [302, 158], [294, 158]])} seed={1776} width={1.1} closed />
      <Thought x={162} y={38} rx={34} ry={24} tx={114} ty={62} seed={1778} />
      <Face x={162} y={38} r={16} mood={-0.35} seed={1780} />
    </SketchFrame>
  );
}

/* ==========================================================================
   Cognitive Dissonance and Buyer's Regret
   ========================================================================== */

/**
 * Buyer's regret: the owner stands beside the box just opened, wearing the
 * new headphones, and pictures the pair left in the shop, drawn in pencil
 * because they were not bought.
 */
export function SecondThoughts() {
  const g = 238;
  return (
    <SketchFrame
      id="sk-second-thoughts"
      width={400}
      height={262}
      label="An owner wearing new headphones stands beside their box, a hand to the chin, picturing in a thought cloud the other pair of headphones, drawn in pencil because it was not bought."
    >
      <Backwash cx={200} cy={146} rx={194} ry={112} seed={1800} />
      <Ground x0={30} x1={370} y={g} seed={1801} />
      <Person x={150} y={g} h={180} look={OWNER} arms={["hip", "chin"]} seed={1810} />
      <WornHeadphones x={150} y={g} h={180} seed={1820} />
      <Box x={84} bottom={g} w={62} h={50} mark="brand" seed={1830} />
      <Thought x={282} y={84} rx={66} ry={46} tx={170} ty={60} seed={1840} />
      <Headphones x={282} y={96} s={1.15} seed={1850} pencil />
    </SketchFrame>
  );
}

/**
 * A receipt for an expensive purchase that cannot be undone: a large total
 * and a FINAL SALE · NO RETURNS line.
 */
export function FinalSale() {
  const x0 = 120;
  const x1 = 280;
  const top = 20;
  const bot = 246;
  const zig = Array.from({ length: 11 }, (_, i) => [r2(x1 - (i * (x1 - x0)) / 10), i % 2 ? bot - 6 : bot] as Pt);
  const slip = rp([[x0, top], [x1, top], ...zig]);
  const item = (y: number, w: number, seed: number) => (
    <g>
      <InkLine pts={rp([[x0 + 16, y], [x0 + 16 + w, y]])} seed={seed} width={0.8} />
      <InkLine pts={rp([[x1 - 44, y], [x1 - 16, y]])} seed={seed + 1} width={0.8} />
    </g>
  );
  return (
    <SketchFrame
      id="sk-final-sale"
      width={400}
      height={262}
      label="A long receipt with one item line, a large total of $349, and a stamped line FINAL SALE · NO RETURNS."
    >
      <Backwash cx={200} cy={134} rx={190} ry={118} seed={1900} />
      <Paper pts={slip} seed={1901} />
      <InkLine pts={slip} seed={1902} width={1.1} closed />
      <InkLine pts={rp([[x0 + 40, 44], [x1 - 40, 44]])} seed={1903} width={1.4} />
      <InkLine pts={rp([[x0 + 54, 56], [x1 - 54, 56]])} seed={1904} width={0.8} />
      {item(86, 62, 1905)}
      <InkLine pts={rp([[x0 + 14, 108], [x1 - 14, 108]])} seed={1910} width={0.8} />
      <SketchText x={x0 + 16} y={140} size={12}>
        TOTAL
      </SketchText>
      <SketchText x={x1 - 14} y={142} anchor="end" size={24} serif>
        $349
      </SketchText>
      {/* the stamp */}
      <g transform={`rotate(-6 ${200} ${196})`}>
        <InkLine pts={sharp(rp([[x0 + 18, 174], [x1 - 18, 174], [x1 - 18, 216], [x0 + 18, 216]]), true, 2)} seed={1920} width={1.5} closed />
        <SketchText x={200} y={191} anchor="middle" size={12}>
          FINAL SALE
        </SketchText>
        <SketchText x={200} y={210} anchor="middle" size={12}>
          NO RETURNS
        </SketchText>
      </g>
    </SketchFrame>
  );
}

/**
 * The rejected pair had something the chosen pair lacks: side by side, the
 * bought headphones (teal tick) and the pair left behind, in pencil, with an
 * ochre microphone boom.
 */
export function MissingFeature() {
  return (
    <SketchFrame
      id="sk-missing-feature"
      width={400}
      height={262}
      label="Two pairs of headphones side by side. The chosen pair, ticked in teal, has no microphone. The rejected pair, drawn in pencil, has an ochre microphone boom."
    >
      <Backwash cx={200} cy={134} rx={190} ry={112} seed={2000} />
      <Headphones x={112} y={146} s={2.1} seed={2010} />
      <Tick2 x={112} y={226} s={1.6} seed={2030} />
      <Headphones x={292} y={146} s={2.1} seed={2040} pencil />
      {/* the feature the chosen pair lacks: a microphone boom */}
      <InkLine pts={rp([[244, 182], [242, 200], [254, 214], [274, 218]])} seed={2060} width={2.4} color={SK.ochre} amp={0.4} />
      <Wash pts={rp(blobPts(283, 218, 9, 7, 2061, 10, 0.08))} seed={2062} fill={SK.ochre} opacity={0.9} dx={0.4} dy={0.3} />
      <PencilLine pts={rp(blobPts(283, 218, 9, 7, 2063, 10, 0.08))} seed={2064} closed />
    </SketchFrame>
  );
}

/* ==========================================================================
   Reducing Postpurchase Dissonance
   ========================================================================== */

/** The rival pair with its microphone boom, as the shop's poster shows it. */
function RivalPair({ x, y, s = 1, seed }: { x: number; y: number; s?: number; seed: number }) {
  return (
    <g>
      <Headphones x={x} y={y} s={s} seed={seed} fill={SK.tan} />
      <InkLine pts={at(x, y, [[-24, 17], [-25, 26], [-18, 32], [-8, 34]], s)} seed={seed + 20} width={r2(1.8 * s)} color={SK.ochre} amp={0.3} />
      <Wash pts={rp(blobPts(r2(x - 4 * s), r2(y + 34 * s), r2(4.4 * s), r2(3.6 * s), seed + 21, 10, 0.08))} seed={seed + 22} fill={SK.ochre} opacity={0.9} dx={0.3} dy={0.2} />
      <InkLine pts={rp(blobPts(r2(x - 4 * s), r2(y + 34 * s), r2(4.4 * s), r2(3.6 * s), seed + 23, 10, 0.08))} seed={seed + 24} width={0.9} closed />
    </g>
  );
}

/**
 * Reducing dissonance alone: the owner, wearing the headphones, reads a
 * five-star review of them on a phone, with her back turned to the poster
 * for the rival pair.
 */
export function SupportingInfo() {
  const g = 238;
  const ph = handAt(214, g, 184, "carry", 1);
  const px = r2(ph[0] + 6);
  const py = r2(ph[1] - 22);
  const poster = sharp(rp([[30, 46], [140, 46], [140, 176], [30, 176]]), true, 2);
  const body = sharp(rp([[px - 17, py - 28], [px + 17, py - 28], [px + 17, py + 28], [px - 17, py + 28]]), true, 4);
  const glass = rp([[px - 13, py - 22], [px + 13, py - 22], [px + 13, py + 21], [px - 13, py + 21]]);
  return (
    <SketchFrame
      id="sk-supporting-info"
      width={400}
      height={262}
      label="An owner reads a five-star review of her headphones on a phone, back turned to a poster advertising the rival pair with its microphone."
    >
      <Backwash cx={200} cy={146} rx={194} ry={112} seed={2100} />
      <Ground x0={20} x1={380} y={g} seed={2101} />
      {/* the rival's poster on the wall behind */}
      <Paper pts={poster} seed={2110} />
      <InkLine pts={poster} seed={2111} closed />
      <RivalPair x={85} y={110} s={1.25} seed={2120} />
      <InkLine pts={rp([[54, 158], [116, 158]])} seed={2150} width={0.9} />
      {/* the owner, turned toward the phone */}
      <Person x={214} y={g} h={184} look={OWNER} arms={["hip", "carry"]} seed={2160} />
      <Wash pts={body} seed={2200} fill={SK.charcoal} opacity={0.75} dx={0.5} dy={0.4} />
      <Paper pts={glass} seed={2201} />
      <InkLine pts={body} seed={2202} width={1.1} closed />
      <Headphones x={px} y={r2(py - 4)} s={0.34} seed={2205} />
      <Stars x={r2(px - 10.4)} y={r2(py + 10)} n={5} r={2.6} gap={5.2} seed={2210} />
    </SketchFrame>
  );
}

/**
 * The follow-up message: a thank-you card slid out of its envelope, with
 * three benefits of the headphones ticked off.
 */
export function ThankYouNote() {
  const env = sharp(rp([[56, 112], [344, 112], [344, 214], [56, 214]]), true, 2);
  const card = sharp(rp([[78, 30], [318, 22], [324, 172], [82, 180]]), true, 2);
  return (
    <SketchFrame
      id="sk-thank-you-note"
      width={400}
      height={236}
      label="A thank-you card pulled from its envelope, with a small drawing of the headphones and three benefit lines, each ticked in teal."
    >
      <Backwash cx={200} cy={124} rx={192} ry={108} seed={2300} />
      <Wash pts={env} seed={2301} fill={SK.camel} opacity={0.55} />
      <InkLine pts={env} seed={2302} closed />
      <Paper pts={card} seed={2303} />
      <InkLine pts={card} seed={2304} width={1.1} closed />
      <SketchText x={104} y={66} size={22} serif>
        Thank you
      </SketchText>
      <Headphones x={282} y={64} s={0.7} seed={2310} />
      {[0, 1, 2].map((i) => {
        const y = 100 + i * 24;
        return (
          <g key={i}>
            <Tick2 x={112} y={y} s={0.9} seed={2320 + i} />
            <InkLine pts={rp([[130, y + 1], [r2(130 + [140, 116, 150][i]), y - 1]])} seed={2330 + i} width={0.8} />
          </g>
        );
      })}
      {/* the envelope's front pocket, over the card */}
      <Wash pts={rp([[56, 150], [200, 194], [344, 150], [344, 214], [56, 214]])} seed={2340} fill={SK.camel} opacity={0.85} dx={0} dy={0} />
      <InkLine pts={rp([[56, 150], [200, 194], [344, 150], [344, 214], [56, 214]])} seed={2341} width={1.2} closed />
    </SketchFrame>
  );
}

/**
 * Two ways to lower the risk after buying, drawn apart: a warranty
 * certificate with its seal, and a prepaid label for free returns.
 */
export function WarrantyReturns() {
  const cert = sharp(rp([[30, 34], [212, 34], [212, 206], [30, 206]]), true, 2);
  const seal = Array.from({ length: 16 }, (_, i) => {
    const a = (i / 16) * Math.PI * 2;
    const rr = i % 2 ? 19 : 23;
    return [r2(170 + Math.cos(a) * rr), r2(166 + Math.sin(a) * rr)] as Pt;
  });
  const label = sharp(rp([[242, 72], [372, 72], [372, 180], [242, 180]]), true, 2);
  return (
    <SketchFrame
      id="sk-warranty-returns"
      width={400}
      height={236}
      label="Left: a certificate headed 2-YEAR WARRANTY with an ochre seal. Right: a shipping label marked FREE RETURNS with an arrow curving back."
    >
      <Backwash cx={200} cy={122} rx={194} ry={108} seed={2400} />
      {/* the warranty */}
      <Paper pts={cert} seed={2401} />
      <InkLine pts={cert} seed={2402} closed />
      <InkLine pts={sharp(rp([[40, 44], [202, 44], [202, 196], [40, 196]]), true, 2)} seed={2403} width={0.7} closed />
      <SketchText x={121} y={76} anchor="middle" size={12}>
        2-YEAR WARRANTY
      </SketchText>
      <InkLine pts={rp([[58, 100], [184, 100]])} seed={2404} width={0.8} />
      <InkLine pts={rp([[58, 116], [170, 116]])} seed={2405} width={0.8} />
      <InkLine pts={rp([[58, 166], [120, 160], [136, 168]])} seed={2406} width={0.9} />
      <Wash pts={seal} seed={2407} fill={SK.ochre} opacity={0.85} dx={0.6} dy={0.5} />
      <InkLine pts={sharp(seal, true, 1)} seed={2408} width={1} closed />
      <InkLine pts={rp(blobPts(170, 166, 11, 11, 2409, 12, 0.04))} seed={2410} width={0.8} closed />
      {/* the returns label */}
      <Paper pts={label} seed={2420} />
      <InkLine pts={label} seed={2421} closed />
      <SketchText x={307} y={100} anchor="middle" size={12}>
        FREE RETURNS
      </SketchText>
      <SketchArrow pts={rp([[314, 162], [306, 136], [286, 128], [266, 136], [258, 158]])} seed={2422} width={1.4} head={8} />
      {Array.from({ length: 8 }, (_, i) => (
        <InkLine key={i} pts={rp([[r2(330 + i * 4.4), 140], [r2(330 + i * 4.4), 166]])} seed={2430 + i} width={i % 3 ? 0.8 : 1.6} amp={0.1} />
      ))}
    </SketchFrame>
  );
}

/**
 * An ad that shows satisfied owners: a magazine page with two people wearing
 * the headphones, one with an arm raised in delight, under a row of stars.
 */
export function OwnersAd() {
  const page = sharp(rp([[96, 14], [304, 14], [304, 224], [96, 224]]), true, 2);
  const g = 206;
  return (
    <SketchFrame
      id="sk-owners-ad"
      width={400}
      height={236}
      label="A magazine ad: two smiling owners wearing the headphones, one waving an arm in delight, under a row of five stars."
    >
      <Backwash cx={200} cy={120} rx={194} ry={108} seed={2500} />
      <Paper pts={page} seed={2501} />
      <InkLine pts={page} seed={2502} closed />
      <Wash pts={rp(blobPts(200, 150, 88, 58, 2503, 14, 0.16))} seed={2504} fill={SK.sky} opacity={0.45} dx={0} dy={0} />
      <Stars x={148} y={38} n={5} r={8} gap={26} seed={2510} />
      <Person x={168} y={g} h={142} look={OWNER} arms={["hip", "wave"]} seed={2530} />
      <WornHeadphones x={168} y={g} h={142} seed={2560} />
      <Person x={240} y={g} h={136} look={FRIEND} arms={["hip", "down"]} flip seed={2570} />
      <WornHeadphones x={240} y={g} h={136} seed={2600} flip />
    </SketchFrame>
  );
}

/**
 * Customer service that responds quickly: a phone chat in which the owner's
 * message about the broken headphones is answered two minutes later, the
 * reply ticked in teal.
 */
export function QuickReply() {
  const body = sharp(rp([[132, 8], [268, 8], [268, 228], [132, 228]]), true, 12);
  const glass = rp([[142, 24], [258, 24], [258, 212], [142, 212]]);
  const ask = sharp(rp([[150, 38], [222, 38], [222, 92], [160, 92], [150, 100]]), true, 4);
  const reply = sharp(rp([[178, 134], [250, 134], [250, 190], [240, 190], [242, 200], [228, 190], [178, 190]]), true, 4);
  return (
    <SketchFrame
      id="sk-quick-reply"
      width={400}
      height={236}
      label="A phone chat. The owner's message shows the broken headphones; under the time 2 MIN, the company's reply arrives with a teal tick."
    >
      <Backwash cx={200} cy={118} rx={190} ry={110} seed={2700} />
      <Wash pts={body} seed={2701} fill={SK.charcoal} opacity={0.75} />
      <Paper pts={glass} seed={2702} />
      <InkLine pts={body} seed={2703} closed />
      <Paper pts={ask} seed={2704} />
      <InkLine pts={ask} seed={2705} width={1.1} closed />
      <Headphones x={186} y={70} s={0.85} seed={2710} broken />
      <SketchText x={200} y={119} anchor="middle" size={11}>
        2 MIN
      </SketchText>
      <Wash pts={reply} seed={2730} fill={SK.sky} opacity={0.6} dx={0.8} dy={0.6} />
      <InkLine pts={reply} seed={2731} width={1.1} closed />
      <Tick2 x={198} y={156} s={1.1} seed={2732} />
      <InkLine pts={rp([[214, 152], [240, 152]])} seed={2733} width={0.8} />
      <InkLine pts={rp([[190, 174], [238, 174]])} seed={2734} width={0.8} />
    </SketchFrame>
  );
}

/* ==========================================================================
   Responses to Dissatisfaction
   ========================================================================== */

/** A shop's service counter, top at y, from x0 to x1, standing on g. */
function Counter({ x0, x1, y, g, seed }: { x0: number; x1: number; y: number; g: number; seed: number }) {
  const top = rp([[x0, y], [x1, y], [x1, y + 10], [x0, y + 10]]);
  const front = rp([[x0 + 4, y + 10], [x1 - 4, y + 10], [x1 - 4, g], [x0 + 4, g]]);
  return (
    <g>
      <Paper pts={front} seed={seed + 4} />
      <Wash pts={front} seed={seed} fill={SK.leather} opacity={0.4} />
      <InkLine pts={front} seed={seed + 1} closed />
      <Wash pts={top} seed={seed + 2} fill={SK.leather} opacity={0.65} />
      <InkLine pts={top} seed={seed + 3} width={1.1} closed />
    </g>
  );
}

/**
 * A voice response: at the shop's counter, the owner holds out the broken
 * headphones and speaks to the clerk.
 */
export function VoiceResponse() {
  const g = 226;
  const hand = handAt(118, g, 176, "reach", 1);
  return (
    <SketchFrame
      id="sk-voice-response"
      width={400}
      height={250}
      label="At a shop counter, an owner holds out the broken headphones and speaks to the clerk behind it."
    >
      <Backwash cx={200} cy={138} rx={194} ry={108} seed={2800} />
      <Ground x0={24} x1={376} y={g} seed={2801} />
      <Person x={296} y={g} h={170} look={CLERK} arms={["hip", "down"]} flip seed={2810} />
      <Counter x0={206} x1={366} y={150} g={g} seed={2830} />
      <Person x={118} y={g} h={176} look={OWNER} arms={["hip", "reach"]} seed={2840} />
      <Headphones x={r2(hand[0] + 22)} y={r2(hand[1] + 4)} s={0.8} seed={2870} broken />
      <SpeechBubble x={184} y={40} w={64} h={34} tx={140} ty={64} seed={2880} />
      {[0, 1].map((i) => (
        <InkLine key={i} pts={rp([[164, 35 + i * 10], [r2(204 - i * 10), 35 + i * 10]])} seed={2882 + i} width={0.8} />
      ))}
    </SketchFrame>
  );
}

/**
 * A private response: the owner, now carrying another brand's bag, warns a
 * friend, the bubble showing the broken headphones crossed out.
 */
export function PrivateResponse() {
  const g = 226;
  const bag = handAt(130, g, 176, "carry", -1);
  return (
    <SketchFrame
      id="sk-private-response"
      width={400}
      height={250}
      label="An owner carrying a plain shopping bag from another brand warns a friend; the speech bubble shows the broken headphones crossed out."
    >
      <Backwash cx={200} cy={138} rx={194} ry={108} seed={2900} />
      <Ground x0={24} x1={376} y={g} seed={2901} />
      <Person x={130} y={g} h={176} look={OWNER} arms={["carry", "low"]} seed={2910} />
      <Bag x={r2(bag[0] - 2)} y={bag[1]} w={32} badge={false} fill={SK.sky} seed={2940} />
      <Person x={262} y={g} h={170} look={FRIEND} arms={["hip", "down"]} flip seed={2950} />
      <SpeechBubble x={198} y={44} w={88} h={50} tx={146} ty={82} seed={2980} />
      <Headphones x={198} y={48} s={0.82} seed={2985} broken />
      <InkLine pts={rp([[174, 29], [222, 61]])} seed={2990} width={1.8} />
      <InkLine pts={rp([[222, 29], [174, 61]])} seed={2991} width={1.8} />
    </SketchFrame>
  );
}

/**
 * A third-party response: a public review site open on a laptop, where the
 * owner has posted one star for the headphones.
 */
export function ThirdPartyResponse() {
  const lid = sharp(rp([[84, 22], [316, 22], [316, 182], [84, 182]]), true, 6);
  const screen = rp([[96, 34], [304, 34], [304, 172], [96, 172]]);
  const base = rp([[60, 182], [340, 182], [354, 200], [46, 200]]);
  return (
    <SketchFrame
      id="sk-third-party"
      width={400}
      height={226}
      label="A laptop open on a public review site: beside a small picture of the headphones, a review with one star out of five."
    >
      <Backwash cx={200} cy={114} rx={194} ry={104} seed={3000} />
      <Wash pts={lid} seed={3001} fill={SK.charcoal} opacity={0.7} />
      <Paper pts={screen} seed={3002} />
      <InkLine pts={lid} seed={3003} closed />
      <Wash pts={base} seed={3004} fill={SK.stone} opacity={0.8} />
      <InkLine pts={base} seed={3005} closed />
      {/* the site's bar */}
      <InkLine pts={rp([[96, 50], [304, 50]])} seed={3006} width={0.8} />
      {[108, 118, 128].map((x, i) => (
        <InkLine key={x} pts={rp(blobPts(x, 42, 2.6, 2.6, 3007 + i, 8, 0.05))} seed={3010 + i} width={0.8} closed />
      ))}
      <Headphones x={136} y={98} s={1} seed={3020} broken />
      <ReviewCard x={176} y={64} w={116} stars={1} lines={4} last={0.5} seed={3040} r={6.5} />
    </SketchFrame>
  );
}

/** A small shopfront standing on g: awning, window and door. */
function Shopfront({ x, g, w = 130, h = 120, seed }: { x: number; g: number; w?: number; h?: number; seed: number }) {
  const l = x - w / 2;
  const r = x + w / 2;
  const wall = rp([[l, g - h + 26], [r, g - h + 26], [r, g], [l, g]]);
  const awning = rp([[l - 8, g - h], [r + 8, g - h], [r + 8, g - h + 26], [l - 8, g - h + 26]]);
  const door = rp([[x + 8, g - 70], [x + 44, g - 70], [x + 44, g], [x + 8, g]]);
  const win = rp([[l + 14, g - 72], [x - 6, g - 72], [x - 6, g - 30], [l + 14, g - 30]]);
  return (
    <g>
      <Wash pts={wall} seed={seed} fill={SK.camel} opacity={0.45} />
      <InkLine pts={wall} seed={seed + 1} closed />
      <Wash pts={awning} seed={seed + 2} fill={SK.tan} opacity={0.6} />
      <InkLine pts={awning} seed={seed + 3} closed />
      {Array.from({ length: 5 }, (_, i) => {
        const sx = r2(l - 8 + ((i + 1) * (w + 16)) / 6);
        return <InkLine key={i} pts={rp([[sx, g - h], [sx, g - h + 26]])} seed={seed + 4 + i} width={0.8} />;
      })}
      <Wash pts={win} seed={seed + 10} fill={SK.sky} opacity={0.7} />
      <InkLine pts={win} seed={seed + 11} closed width={1.1} />
      <Wash pts={door} seed={seed + 12} fill={SK.leather} opacity={0.6} />
      <InkLine pts={door} seed={seed + 13} closed width={1.1} />
    </g>
  );
}

/**
 * Most dissatisfied customers never complain: a row of twelve unhappy faces,
 * of whom only the one nearest the shop speaks to it, the complaint in teal.
 */
export function SilentMajority() {
  const g = 166;
  return (
    <SketchFrame
      id="sk-silent-majority"
      width={800}
      height={184}
      label="A row of twelve unhappy faces. Eleven say nothing; only the last one, nearest the shop, speaks to it, its speech bubble washed teal."
    >
      <Backwash cx={400} cy={96} rx={396} ry={84} seed={3100} />
      <Ground x0={630} x1={790} y={g} seed={3101} />
      {Array.from({ length: 12 }, (_, i) => (
        <Face key={i} x={r2(56 + i * 44)} y={120} r={16} mood={-0.8 - (i % 3) * 0.1} seed={3110 + i * 7} />
      ))}
      <Wash pts={rp([[512, 36], [600, 36], [600, 72], [552, 72], [534, 96], [538, 72], [512, 72]])} seed={3200} fill={SK.teal} opacity={0.75} dx={1} dy={1} />
      <InkLine pts={sharp(rp([[512, 36], [600, 36], [600, 72], [552, 72], [534, 96], [538, 72], [512, 72]]), true, 4)} seed={3201} width={1.2} closed />
      <InkLine pts={rp([[526, 48], [586, 48]])} seed={3202} width={0.8} />
      <InkLine pts={rp([[526, 60], [574, 60]])} seed={3203} width={0.8} />
      <Shopfront x={712} g={g} seed={3220} />
    </SketchFrame>
  );
}

/* ==========================================================================
   Product Disposal and Secondary Markets
   ========================================================================== */

/**
 * Three ways out, from the headphones at the top: kept inside the home; lent
 * to a friend on a round trip that brings them back; or let go for good, one
 * way, to a bin, a gift, a swap or a sale.
 */
export function DisposalPaths() {
  const rx = 400;
  const ry = 46;
  const g = 262;
  const house = rp([[70, 158], [133, 112], [196, 158], [196, g], [70, g]]);
  const shelf = rp([[94, 214], [172, 214]]);
  const bin = rp([[524, 206], [566, 206], [561, g], [529, g]]);
  const gift = rp([[590, 216], [632, 216], [632, g], [590, g]]);
  const tag = sharp(rp([[726, 222], [770, 222], [770, 254], [726, 254], [714, 238]]), true, 1.5);
  const hand = handAt(356, g, 132, "reach", 1);
  return (
    <SketchFrame
      id="sk-disposal-paths"
      width={800}
      height={280}
      label="From the headphones at the top, three paths. Left: an arrow into a house, where they sit on a shelf. Middle: a round trip, an arrow out to a friend who holds them and another arrow back. Right: a one-way arrow to a bracket over four ends: a bin, a wrapped gift, a pair of swap arrows and a price tag."
    >
      <Backwash cx={400} cy={146} rx={394} ry={128} seed={3300} />
      <Ground x0={40} x1={780} y={g} seed={3302} />
      <Headphones x={rx} y={ry} s={1.05} seed={3301} />
      {/* keep it */}
      <Wash pts={house} seed={3310} fill={SK.camel} opacity={0.4} />
      <InkLine pts={house} seed={3311} closed />
      <InkLine pts={shelf} seed={3312} width={1.4} />
      <Headphones x={133} y={r2(214 - 16)} s={0.7} seed={3313} />
      <SketchArrow pts={rp([[354, 48], [250, 66], [160, 116]])} seed={3320} />
      {/* get rid of it temporarily: out and back */}
      <SketchArrow pts={rp([[386, 80], [390, 118], [394, 152]])} seed={3330} />
      <SketchArrow pts={rp([[430, 154], [430, 114], [420, 80]])} seed={3332} />
      <Person x={356} y={g} h={132} look={FRIEND} arms={["hip", "reach"]} seed={3340} />
      <Headphones x={r2(hand[0] + 12)} y={r2(hand[1] + 2)} s={0.5} seed={3360} />
      {/* get rid of it permanently: one way */}
      <SketchArrow pts={rp([[448, 46], [580, 70], [646, 180]])} seed={3370} />
      <InkLine pts={rp([[518, 194], [518, 184], [776, 184], [776, 194]])} seed={3374} width={1.1} />
      <Wash pts={bin} seed={3371} fill={SK.charcoal} opacity={0.45} />
      <InkLine pts={bin} seed={3372} closed />
      <InkLine pts={rp([[519, 201], [571, 201]])} seed={3373} width={1.5} />
      <Wash pts={gift} seed={3380} fill={SK.blush} opacity={0.8} />
      <InkLine pts={gift} seed={3381} closed />
      <InkLine pts={rp([[611, 216], [611, g]])} seed={3382} width={1.6} color={SK.tan} />
      <InkLine pts={rp([[600, 207], [611, 216], [622, 207]])} seed={3383} width={1.1} />
      <SketchArrow pts={rp([[656, 228], [700, 228]])} seed={3390} head={7} />
      <SketchArrow pts={rp([[700, 246], [656, 246]])} seed={3392} head={7} />
      <Paper pts={tag} seed={3394} />
      <InkLine pts={tag} seed={3395} width={1.1} closed />
      <SketchText x={748} y={243} anchor="middle" size={13}>
        $
      </SketchText>
    </SketchFrame>
  );
}

/**
 * Lateral cycling: the owner lists the used headphones on a resale app, and
 * a second consumer walks off holding them, the pair now hers (teal).
 */
export function LateralCycling() {
  const g = 238;
  const ph = handAt(80, g, 176, "carry", 1);
  const px = r2(ph[0] + 8);
  const py = r2(ph[1] - 20);
  const body = sharp(rp([[px - 17, py - 28], [px + 17, py - 28], [px + 17, py + 28], [px - 17, py + 28]]), true, 4);
  const glass = rp([[px - 13, py - 22], [px + 13, py - 22], [px + 13, py + 21], [px - 13, py + 21]]);
  const hold = handAt(318, g, 170, "reach", 1, true);
  return (
    <SketchFrame
      id="sk-lateral-cycling"
      width={400}
      height={262}
      label="Left: the owner holds a phone showing the used headphones listed for sale with a price tag. An arrow leads right to a second consumer who now holds the headphones, washed teal."
    >
      <Backwash cx={200} cy={146} rx={194} ry={112} seed={3500} />
      <Ground x0={24} x1={376} y={g} seed={3501} />
      <Person x={80} y={g} h={176} look={OWNER} arms={["hip", "carry"]} seed={3510} />
      <Wash pts={body} seed={3540} fill={SK.charcoal} opacity={0.75} dx={0.5} dy={0.4} />
      <Paper pts={glass} seed={3541} />
      <InkLine pts={body} seed={3542} width={1.1} closed />
      <Headphones x={px} y={r2(py - 2)} s={0.34} seed={3545} />
      <InkLine pts={sharp(rp([[px - 8, py + 8], [px + 8, py + 8], [px + 8, py + 16], [px - 8, py + 16]]), true, 1)} seed={3560} width={0.8} closed />
      <SketchText x={px} y={r2(py + 15)} anchor="middle" size={7.5}>
        $
      </SketchText>
      <SketchArrow pts={rp([[px + 30, py], [190, py - 20], [236, py - 4]])} seed={3570} />
      <Person x={318} y={g} h={170} look={BUYER} arms={["hip", "reach"]} flip seed={3580} />
      <Headphones x={r2(hold[0] - 14)} y={r2(hold[1] + 2)} s={0.7} seed={3610} fill={SK.teal} />
    </SketchFrame>
  );
}

/* ==========================================================================
   Online Reviews as Postpurchase Behavior
   ========================================================================== */

/**
 * Review intention (1 = definitely not, 5 = definitely yes) after a request
 * that offered a credit. Wadi et al. (2026a), Study 2, Table 7: with the
 * financial incentive, helping other customers 4.32 and helping the company
 * 3.95.
 */
const CREDIT_REQUESTS = [
  { lines: ["HELP OTHER", "SHOPPERS"], value: 4.32 },
  { lines: ["HELP THE", "COMPANY"], value: 3.95 },
];

/**
 * Two review requests that both offer a credit, differing only in whom the
 * review is said to help. Under each, a bar shows how willing customers were
 * to write the review; the request to help other shoppers wins (teal).
 */
export function HelpWhom() {
  const base = 218;
  const unit = 18;
  return (
    <SketchFrame
      id="sk-help-whom"
      width={400}
      height={236}
      label="Two review request emails, each offering a $10 credit. One asks the customer to help other shoppers; the other asks them to help the company. Under each, a bar of review intention on a 1 to 5 scale: 4.32 for helping other shoppers, washed teal, and 3.95 for helping the company."
    >
      <Backwash cx={200} cy={120} rx={194} ry={112} seed={3700} />
      {CREDIT_REQUESTS.map((m, i) => {
        const cx = 110 + i * 180;
        const card = sharp(rp([[cx - 82, 16], [cx + 82, 16], [cx + 82, 112], [cx - 82, 112]]), true, 2);
        const tag = sharp(rp([[cx - 8, 86], [cx + 76, 86], [cx + 76, 104], [cx - 8, 104], [cx - 16, 95]]), true, 1.2);
        const top = r2(base - (m.value - 1) * unit);
        const bar = sharp(rp([[cx - 30, top], [cx + 30, top], [cx + 30, base], [cx - 30, base]]), true, 1.5);
        return (
          <g key={m.lines[1]}>
            <Paper pts={card} seed={3710 + i * 20} />
            <InkLine pts={card} seed={3711 + i * 20} width={1.1} closed />
            <InkLine pts={rp([[cx - 82, 30], [cx + 82, 30]])} seed={3712 + i * 20} width={0.8} />
            <SketchText x={cx - 70} y={48} size={10.5}>
              {m.lines[0]}
            </SketchText>
            <SketchText x={cx - 70} y={71} size={10.5}>
              {m.lines[1]}
            </SketchText>
            <InkLine pts={rp([[cx - 70, 81], [cx - 26, 81]])} seed={3713 + i * 20} width={0.8} />
            <Wash pts={tag} seed={3714 + i * 20} fill={SK.ochre} opacity={0.8} dx={0.5} dy={0.4} />
            <InkLine pts={tag} seed={3715 + i * 20} width={1} closed />
            <SketchText x={cx + 34} y={99} anchor="middle" size={9.5}>
              $10 CREDIT
            </SketchText>
            {i === 0 ? <Wash pts={bar} seed={3716} fill={SK.teal} opacity={0.8} /> : <Paper pts={bar} seed={3736} />}
            <InkLine pts={bar} seed={3717 + i * 20} width={1.1} closed />
            <SketchText x={cx} y={r2(top - 8)} anchor="middle" size={13}>
              {m.value.toFixed(2)}
            </SketchText>
          </g>
        );
      })}
      <InkLine pts={rp([[40, base], [360, base]])} seed={3760} width={1} />
      <SketchText x={200} y={134} anchor="middle" size={9.5}>
        REVIEW INTENTION, 1–5
      </SketchText>
    </SketchFrame>
  );
}

/* -- a quiet labelled switch under an interactive plate --------------------- */

/** One row of outlined buttons, one of them on; `label` names the group for screen readers. */
function PlateChoice<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { id: T; label: string }[];
  value: T;
  onChange: (id: T) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label={label}>
      {options.map((o) => {
        const on = o.id === value;
        return (
          <button
            key={o.id}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(o.id)}
            className={
              "inline-flex items-center border px-2 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.1em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rule-2)] " +
              (on
                ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
                : "border-[var(--rule-2)] bg-[var(--paper)] text-[var(--ink-2)] hover:border-[var(--ink-3)] hover:text-[var(--ink)]")
            }
            style={{ fontFamily: "var(--font-label)" }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

type Reviewer = "first" | "experienced";
type Incentive = "any" | "helpful";
type Appeal = "shoppers" | "company";

/**
 * Field data from a North American online retailer: the share of customers
 * who wrote a review after a request, and the mean review length in
 * characters, by reviewer experience, incentive scheme (paid for completing
 * any review vs paid only when the review is voted helpful) and the request's
 * message (help other shoppers = social exchange; help the company =
 * reciprocal exchange). Wadi et al. (2026b), Table II.
 */
const REVIEW_FIELD: Record<Reviewer, Record<Incentive, Record<Appeal, { rate: number; chars: number }>>> = {
  experienced: {
    any: { company: { rate: 0.597, chars: 161.4 }, shoppers: { rate: 0.743, chars: 159.6 } },
    helpful: { company: { rate: 0.539, chars: 169.3 }, shoppers: { rate: 0.622, chars: 180.9 } },
  },
  first: {
    any: { company: { rate: 0.064, chars: 110.0 }, shoppers: { rate: 0.056, chars: 130.9 } },
    helpful: { company: { rate: 0.07, chars: 192.3 }, shoppers: { rate: 0.118, chars: 153.5 } },
  },
};

/** Characters of review text drawn per handwritten line on the big card. */
const CHARS_PER_LINE = 24;

/**
 * The review request as an instrument, on the retailer's field data. Set who
 * is asked, how the reward is paid and whom the message says the review will
 * help. The middle shows how many of 100 customers asked wrote a review
 * (teal cards; pencil for reviews not written); the right shows how long the
 * average review ran.
 */
export function ReviewRequests() {
  const [who, setWho] = React.useState<Reviewer>("first");
  const [pay, setPay] = React.useState<Incentive>("any");
  const [msg, setMsg] = React.useState<Appeal>("shoppers");
  const cell = REVIEW_FIELD[who][pay][msg];
  const n = Math.round(cell.rate * 100);
  const chars = Math.round(cell.chars);
  const lines = cell.chars / CHARS_PER_LINE;
  const full = Math.floor(lines);
  const last = lines - full;

  /* the request email */
  const mail = sharp(rp([[20, 38], [270, 38], [270, 216], [20, 216]]), true, 2);
  const tag = sharp(rp([[44, 172], [236, 172], [236, 196], [44, 196], [34, 184]]), true, 1.2);

  /* the 10 x 10 grid of customers asked */
  const gx = 310;
  const gy = 44;
  const step = 17;

  /* the average review */
  const cx0 = 560;
  const cy0 = 44;
  const cw = 210;
  const lh = 17;
  const cardH = 28 + 8 * lh;
  const card = sharp(rp([[cx0, cy0], [cx0 + cw, cy0], [cx0 + cw, cy0 + cardH], [cx0, cy0 + cardH]]), true, 2);
  const rnd = seeded(4300);
  const wobbleOf = Array.from({ length: 9 }, () => 0.84 + rnd() * 0.12);

  const label = `A review request ${who === "first" ? "to a first-time reviewer" : "to an experienced reviewer"}, paid ${pay === "any" ? "for any review" : "only if the review is voted helpful"}, asking the customer to ${msg === "shoppers" ? "help other shoppers" : "help the company"}. ${n} of 100 customers asked wrote a review; the average review ran ${chars} characters.`;

  return (
    <>
      <SketchFrame id="sk-review-requests" width={800} height={228} label={label}>
        <Backwash cx={400} cy={118} rx={396} ry={108} seed={4000} />

        {/* the request */}
        <SketchText x={145} y={24} anchor="middle" size={11}>
          THE REQUEST
        </SketchText>
        <Paper pts={mail} seed={4001} />
        <InkLine pts={mail} seed={4002} closed />
        <InkLine pts={rp([[20, 58], [270, 58]])} seed={4003} width={0.8} />
        <SketchText x={34} y={53} size={9.5}>
          {who === "first" ? "TO: FIRST-TIME REVIEWER" : "TO: EXPERIENCED REVIEWER"}
        </SketchText>
        <SketchText x={34} y={86} size={15} serif>
          {msg === "shoppers" ? "Help other shoppers" : "Help the company"}
        </SketchText>
        <SketchText x={34} y={108} size={15} serif>
          by writing a review.
        </SketchText>
        <InkLine pts={rp([[34, 128], [236, 128]])} seed={4004} width={0.8} />
        <InkLine pts={rp([[34, 142], [210, 142]])} seed={4005} width={0.8} />
        <InkLine pts={rp([[34, 156], [180, 156]])} seed={4006} width={0.8} />
        <Wash pts={tag} seed={4007} fill={SK.ochre} opacity={0.8} dx={0.5} dy={0.4} />
        <InkLine pts={tag} seed={4008} width={1} closed />
        <SketchText x={142} y={188} anchor="middle" size={9.5}>
          {pay === "any" ? "PAID FOR ANY REVIEW" : "PAID ONLY IF HELPFUL"}
        </SketchText>

        {/* who wrote one */}
        <SketchText x={gx + (step * 10) / 2 - 4} y={24} anchor="middle" size={11}>
          {`${n} OF 100 ASKED WROTE ONE`}
        </SketchText>
        {Array.from({ length: 100 }, (_, i) => {
          const x = gx + (i % 10) * step;
          const y = gy + Math.floor(i / 10) * step;
          const pts = sharp(rp([[x, y], [x + 12.5, y], [x + 12.5, y + 12.5], [x, y + 12.5]]), true, 1.2);
          return i < n ? (
            <g key={i}>
              <Wash pts={pts} seed={4100 + i} fill={SK.teal} opacity={0.8} dx={0.4} dy={0.3} />
              <InkLine pts={pts} seed={4200 + i} width={0.8} amp={0.15} closed />
            </g>
          ) : (
            <PencilLine key={i} pts={pts} seed={4200 + i} closed dash="2 3" width={0.7} />
          );
        })}

        {/* how long the average review ran */}
        <SketchText x={cx0 + cw / 2} y={24} anchor="middle" size={11}>
          {`AVERAGE REVIEW: ${chars} CHARACTERS`}
        </SketchText>
        <Paper pts={card} seed={4301} />
        <InkLine pts={card} seed={4302} closed />
        {Array.from({ length: full + (last > 0.05 ? 1 : 0) }, (_, i) => {
          const y = cy0 + 22 + i * lh;
          const len = i === full ? last : wobbleOf[i];
          const x1 = r2(cx0 + 16 + (cw - 32) * len);
          const pts = rp(Array.from({ length: 9 }, (_, k) => [cx0 + 16 + ((x1 - cx0 - 16) * k) / 8, y + (k % 2 ? -1.6 : 1.6)] as Pt));
          return <InkLine key={i} pts={pts} seed={4310 + i} width={0.9} amp={0.4} />;
        })}
      </SketchFrame>
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 px-1" aria-live="polite">
        <PlateChoice
          label="Reviewer"
          value={who}
          onChange={setWho}
          options={[
            { id: "first", label: "First-time" },
            { id: "experienced", label: "Experienced" },
          ]}
        />
        <PlateChoice
          label="Paid for"
          value={pay}
          onChange={setPay}
          options={[
            { id: "any", label: "Any review" },
            { id: "helpful", label: "Only if helpful" },
          ]}
        />
        <PlateChoice
          label="Help"
          value={msg}
          onChange={setMsg}
          options={[
            { id: "shoppers", label: "Help shoppers" },
            { id: "company", label: "Help company" },
          ]}
        />
      </div>
    </>
  );
}

/**
 * Two audiences for one review: a shopper on one side and an AI agent on
 * the other, both turned to the same review card.
 */
export function TwoAudiences() {
  const g = 238;
  return (
    <SketchFrame
      id="sk-two-audiences"
      width={400}
      height={262}
      label="One review card with four stars stands between a shopper, who reads it, and an AI agent, which reads it too."
    >
      <Backwash cx={200} cy={146} rx={194} ry={112} seed={4500} />
      <Ground x0={24} x1={376} y={g} seed={4501} />
      <Person x={70} y={g} h={182} look={BUYER} arms={["hip", "chin"]} seed={4510} />
      <ReviewCard x={128} y={72} w={144} stars={4} lines={4} last={0.55} seed={4540} r={8} />
      <Agent x={326} y={g} s={1.45} seed={4560} />
    </SketchFrame>
  );
}

/* ==========================================================================
   From Satisfaction to Loyalty
   ========================================================================== */

/**
 * A brand's stamp card with `stamps` of ten slots stamped (teal: purchases
 * made, pencil: empty slots), and a heart beside it when the consumer holds a
 * strong positive attitude toward the brand. The three loyalty plates share
 * this one layout so they compare at a glance.
 */
function LoyaltyCard({ id, stamps, heart, label }: { id: string; stamps: number; heart: boolean; label: string }) {
  const x0 = 34;
  const y0 = 34;
  const w = 236;
  const h = 132;
  const card = sharp(rp([[x0, y0], [x0 + w, y0], [x0 + w, y0 + h], [x0, y0 + h]]), true, 3);
  return (
    <SketchFrame id={id} width={400} height={200} label={label}>
      <Backwash cx={200} cy={100} rx={194} ry={94} seed={4600} />
      <Paper pts={card} seed={4601} />
      <InkLine pts={card} seed={4602} closed />
      <BrandBadge x={x0 + 26} y={y0 + 24} r={11} seed={4603} />
      <InkLine pts={rp([[x0 + 46, y0 + 24], [x0 + 120, y0 + 24]])} seed={4604} width={0.8} />
      {Array.from({ length: 10 }, (_, i) => {
        const cx = x0 + 32 + (i % 5) * 43;
        const cy = y0 + 66 + Math.floor(i / 5) * 40;
        const ring = rp(blobPts(cx, cy, 14, 14, 4610 + i * 3, 12, 0.05));
        return i < stamps ? (
          <g key={i}>
            <Wash pts={ring} seed={4611 + i * 3} fill={SK.teal} opacity={0.8} dx={0.6} dy={0.5} />
            <InkLine pts={ring} seed={4612 + i * 3} width={1} closed />
          </g>
        ) : (
          <PencilLine key={i} pts={ring} seed={4612 + i * 3} closed dash="3 3" />
        );
      })}
      {heart ? <Heart x={334} y={100} s={3} seed={4660} /> : null}
    </SketchFrame>
  );
}

export function TrueLoyalty() {
  return (
    <LoyaltyCard
      id="sk-true-loyalty"
      stamps={9}
      heart
      label="The brand's stamp card with nine of ten purchases stamped, and a large heart beside it."
    />
  );
}

export function SpuriousLoyalty() {
  return (
    <LoyaltyCard
      id="sk-spurious-loyalty"
      stamps={9}
      heart={false}
      label="The brand's stamp card with nine of ten purchases stamped, and no heart beside it."
    />
  );
}

export function LatentLoyalty() {
  return (
    <LoyaltyCard
      id="sk-latent-loyalty"
      stamps={1}
      heart
      label="The brand's stamp card with only one of ten purchases stamped, and a large heart beside it."
    />
  );
}

/**
 * Satisfied, yet gone: the customer, still smiling about the usual brand,
 * walks away from its shop toward a rival's sign offering 30% off.
 */
export function BetterDeal() {
  const g = 238;
  const sign = sharp(rp([[300, 60], [372, 60], [372, 112], [300, 112]]), true, 2);
  return (
    <SketchFrame
      id="sk-better-deal"
      width={400}
      height={262}
      label="A customer walks away from the usual brand's shop toward a rival's sign offering 30% off; her thought cloud holds a smiling face."
    >
      <Backwash cx={200} cy={146} rx={194} ry={112} seed={4700} />
      <Ground x0={20} x1={380} y={g} seed={4701} />
      {/* the usual brand's shop, left behind */}
      <Shopfront x={70} g={g} w={100} h={118} seed={4710} />
      <BrandBadge x={52} y={r2(g - 64)} r={11} seed={4730} />
      {/* the rival's offer */}
      <InkLine pts={rp([[336, 112], [336, g]])} seed={4740} width={1.4} />
      <Wash pts={sign} seed={4741} fill={SK.ochre} opacity={0.8} />
      <InkLine pts={sign} seed={4742} closed />
      <SketchText x={336} y={93} anchor="middle" size={18} serif>
        −30%
      </SketchText>
      <Person x={226} y={g} h={170} look={OWNER} arms={["down", "low"]} seed={4750} />
      <Thought x={170} y={56} rx={32} ry={24} tx={218} ty={70} seed={4780} />
      <Face x={170} y={56} r={15} mood={1} seed={4790} />
    </SketchFrame>
  );
}

/* ==========================================================================
   Brand Loyalty and Delegated Repurchase
   ========================================================================== */

/** The price scale, in dollars per ounce, along both rails. */
const PPO_MIN = 0.35;
const PPO_MAX = 0.55;
const RAIL_X0 = 50;
const RAIL_X1 = 320;
const USUAL_PPO = 0.45;
const START_RIVAL = 0.5;
const xOfPpo = (p: number) => r2(RAIL_X0 + ((p - PPO_MIN) / (PPO_MAX - PPO_MIN)) * (RAIL_X1 - RAIL_X0));
const ppoOfX = (x: number) => {
  const p = PPO_MIN + ((x - RAIL_X0) / (RAIL_X1 - RAIL_X0)) * (PPO_MAX - PPO_MIN);
  return Math.round(Math.min(PPO_MAX, Math.max(PPO_MIN, p)) * 100) / 100;
};

/**
 * Delegated repurchase as an instrument. The usual coffee (brand badge)
 * stands at its price per ounce on the upper rail; a rival coffee stands on
 * the lower rail, and the student drags it along the same price scale. Two
 * agents reorder at once: one told "reorder my usual coffee", one told "buy
 * coffee at the best price". Whatever each agent puts in its basket is teal.
 * The instruction that names the brand keeps it; the instruction that states
 * only a goal switches as soon as the rival is cheaper.
 */
export function UsualOrBest() {
  const [rival, setRival] = React.useState(START_RIVAL);
  const drag = React.useRef(false);
  const usualX = xOfPpo(USUAL_PPO);
  const rivalX = xOfPpo(rival);
  const goalPick: "usual" | "rival" = rival < USUAL_PPO ? "rival" : "usual";
  const railU = 132;
  const railR = 252;

  const toX = (ev: React.PointerEvent<SVGGElement>) => {
    const svg = ev.currentTarget.ownerSVGElement!;
    const pt = svg.createSVGPoint();
    pt.x = ev.clientX;
    pt.y = ev.clientY;
    return pt.matrixTransform(svg.getScreenCTM()!.inverse()).x;
  };
  const handle = {
    onPointerDown: (ev: React.PointerEvent<SVGGElement>) => {
      drag.current = true;
      ev.currentTarget.setPointerCapture(ev.pointerId);
    },
    onPointerMove: (ev: React.PointerEvent<SVGGElement>) => {
      if (drag.current) setRival(ppoOfX(toX(ev)));
    },
    onPointerUp: () => {
      drag.current = false;
    },
    onKeyDown: (ev: React.KeyboardEvent<SVGGElement>) => {
      const step = ev.key === "ArrowLeft" ? -0.01 : ev.key === "ArrowRight" ? 0.01 : 0;
      if (!step) return;
      ev.preventDefault();
      setRival((p) => Math.round(Math.min(PPO_MAX, Math.max(PPO_MIN, p + step)) * 100) / 100);
    },
    tabIndex: 0,
    role: "slider",
    "aria-label": "Rival coffee's price per ounce",
    "aria-valuemin": PPO_MIN,
    "aria-valuemax": PPO_MAX,
    "aria-valuenow": rival,
    "aria-valuetext": `$${rival.toFixed(2)} per ounce`,
    style: { cursor: "ew-resize", touchAction: "none", outline: "none" } as React.CSSProperties,
  };

  const rows = [
    { y: 74, text: ["“REORDER MY", "USUAL COFFEE.”"], pick: "usual" as const },
    { y: 206, text: ["“BUY COFFEE AT", "THE BEST PRICE.”"], pick: goalPick },
  ];
  const label = `Two coffees on a price-per-ounce scale: the usual brand at $${USUAL_PPO.toFixed(2)} and a rival at $${rival.toFixed(2)}. The agent told to reorder the usual coffee puts the usual brand in its basket. The agent told to buy coffee at the best price puts the ${goalPick === "usual" ? "usual brand" : "rival"} in its basket.`;

  return (
    <>
      <SketchFrame id="sk-usual-or-best" width={800} height={300} label={label}>
        <Backwash cx={400} cy={150} rx={396} ry={146} seed={4800} />

        {/* the two rails on one price scale */}
        <SketchText x={(RAIL_X0 + RAIL_X1) / 2} y={20} anchor="middle" size={11}>
          PRICE PER OUNCE
        </SketchText>
        {[railU, railR].map((y, k) => (
          <InkLine key={y} pts={rp([[RAIL_X0 - 14, y], [RAIL_X1 + 14, y]])} seed={4801 + k} width={1.1} />
        ))}
        {[0.35, 0.4, 0.45, 0.5, 0.55].map((p, i) => {
          const x = xOfPpo(p);
          return (
            <g key={p}>
              <InkLine pts={rp([[x, railU + 4], [x, railU + 10]])} seed={4810 + i} width={0.8} amp={0.1} />
              <SketchText x={x} y={railU + 24} anchor="middle" size={10}>
                {`$${p.toFixed(2)}`}
              </SketchText>
            </g>
          );
        })}
        <PencilLine pts={rp([[usualX, railU + 32], [usualX, railR]])} seed={4820} />

        {/* the usual coffee: fixed */}
        <CoffeeBag x={usualX} bottom={railU} w={42} h={62} badge seed={4830} />
        {/* the rival coffee: drag it along its rail */}
        <g {...handle}>
          <rect x={rivalX - 34} y={railR - 82} width={68} height={92} fill="transparent" />
          <CoffeeBag x={rivalX} bottom={railR} w={42} h={62} fill={SK.tan} seed={4850} />
          <InkLine pts={rp([[rivalX - 34, railR - 30], [rivalX - 42, railR - 36], [rivalX - 34, railR - 42]])} seed={4870} width={1.2} amp={0.2} />
          <InkLine pts={rp([[rivalX + 34, railR - 30], [rivalX + 42, railR - 36], [rivalX + 34, railR - 42]])} seed={4871} width={1.2} amp={0.2} />
        </g>
        <SketchText x={rivalX} y={railR + 22} anchor="middle" size={12}>
          {`$${rival.toFixed(2)}`}
        </SketchText>

        {/* the two instructions, the two agents, the two baskets */}
        {rows.map((row, k) => {
          const bx = 448;
          const ax = 612;
          const kx = 726;
          const by = row.y;
          return (
            <g key={k}>
              <Paper pts={sharp(rp([[bx - 78, by - 24], [bx + 78, by - 24], [bx + 78, by + 24], [bx - 78, by + 24]]), true, 2)} seed={4900 + k * 40} />
              <InkLine pts={sharp(rp([[bx - 78, by - 24], [bx + 78, by - 24], [bx + 78, by + 24], [bx - 78, by + 24]]), true, 2)} seed={4901 + k * 40} width={1.1} closed />
              <SketchArrow pts={rp([[bx + 84, by], [ax - 28, by]])} seed={4902 + k * 40} head={7} />
              <SketchText x={bx} y={r2(by - 3)} anchor="middle" size={10.5}>
                {row.text[0]}
              </SketchText>
              <SketchText x={bx} y={r2(by + 11)} anchor="middle" size={10.5}>
                {row.text[1]}
              </SketchText>
              <Agent x={ax} y={r2(by + 34)} s={0.86} seed={4910 + k * 40} />
              <SketchArrow pts={rp([[ax + 26, by], [kx - 36, by]])} seed={4920 + k * 40} head={7} />
              <CoffeeBag
                x={kx}
                bottom={r2(by + 30)}
                w={40}
                h={58}
                badge={row.pick === "usual"}
                fill={row.pick === "usual" ? SK.leather : SK.tan}
                lit
                seed={4930 + k * 40}
              />
            </g>
          );
        })}
      </SketchFrame>
      <div className="mt-2 flex flex-wrap items-center gap-2 px-1" aria-live="polite">
        <PlateButton onClick={() => setRival(0.4)}>Rival goes on sale</PlateButton>
        <PlateButton onClick={() => setRival(START_RIVAL)}>Reset</PlateButton>
      </div>
    </>
  );
}

/* ==========================================================================
   Discussion: The Review You Did Not Write
   ========================================================================== */

/**
 * The review you did not write: a review form on a phone with its stars and
 * text left in pencil, and a reward tag tied on beside it.
 */
export function UnwrittenReview() {
  const body = sharp(rp([[120, 14], [280, 14], [280, 290], [120, 290]]), true, 14);
  const glass = rp([[132, 32], [268, 32], [268, 272], [132, 272]]);
  const box = sharp(rp([[146, 128], [254, 128], [254, 232], [146, 232]]), true, 2);
  const button = sharp(rp([[166, 244], [234, 244], [234, 262], [166, 262]]), true, 3);
  const tag = sharp(rp([[300, 196], [362, 196], [362, 236], [300, 236], [288, 216]]), true, 1.5);
  return (
    <SketchFrame
      id="sk-unwritten-review"
      width={400}
      height={304}
      label="A phone shows a review form for the headphones: its five stars and its text box are drawn in pencil, unfilled. A reward tag with a dollar sign is tied to the phone."
    >
      <Backwash cx={200} cy={152} rx={194} ry={146} seed={5000} />
      <Wash pts={body} seed={5001} fill={SK.charcoal} opacity={0.75} />
      <Paper pts={glass} seed={5002} />
      <InkLine pts={body} seed={5003} closed />
      <Headphones x={200} y={78} s={1.05} seed={5010} />
      {Array.from({ length: 5 }, (_, i) => (
        <PencilLine
          key={i}
          pts={rp(Array.from({ length: 10 }, (_, k) => {
            const a = -Math.PI / 2 + (k * Math.PI) / 5;
            const rr = k % 2 === 0 ? 9 : 4;
            return [156 + i * 22 + Math.cos(a) * rr, 110 + Math.sin(a) * rr] as Pt;
          }))}
          seed={5030 + i}
          closed
          dash="2 3"
        />
      ))}
      <PencilLine pts={box} seed={5040} closed />
      {[150, 170, 190].map((y, i) => (
        <PencilLine key={y} pts={rp([[158, y], [r2(242 - i * 18), y]])} seed={5041 + i} />
      ))}
      <InkLine pts={button} seed={5050} width={1} closed />
      <InkLine pts={rp([[184, 253], [216, 253]])} seed={5051} width={0.8} />
      {/* the reward, tied on */}
      <InkLine pts={rp([[280, 180], [288, 196], [296, 214]])} seed={5060} width={0.8} />
      <Wash pts={tag} seed={5061} fill={SK.ochre} opacity={0.85} />
      <InkLine pts={tag} seed={5062} closed />
      <SketchText x={332} y={223} anchor="middle" size={18} serif>
        $
      </SketchText>
    </SketchFrame>
  );
}
