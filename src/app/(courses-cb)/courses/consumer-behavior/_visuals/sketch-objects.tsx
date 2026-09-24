/* ==========================================================================
   Consumer Behavior — shared everyday objects
   --------------------------------------------------------------------------
   Objects drawn in more than one week, built on ./sketch and ./sketch-cast.
   Where weeks drew the same object differently, every drawing is kept and
   numbered (Car1, Car2, ...), in the order the weeks first used them, so
   each plate renders exactly as before. Reuse one of these before drawing a
   new version.

   Weeks import from here, ./sketch and ./sketch-cast, never from another week.
   ========================================================================== */

import React from "react";
import { blobPts, InkLine, Paper, PencilLine, r2, SK, SketchText, Wash, wobble, type Pt } from "./sketch";
import { at, rp, sharp } from "./sketch-cast";

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
