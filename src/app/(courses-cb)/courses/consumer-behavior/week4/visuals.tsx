/* ==========================================================================
   Consumer Behavior | Week 4: plates (Editorial Sketch)
   --------------------------------------------------------------------------
   Motivation, needs and values, drawn in ink and watercolour with the shared
   kit in ../_visuals (see ../CLAUDE.md for the style rules).

   Fixed cast for this week:
     - Gauge: a glass tube that fills with a tan wash. It is tension, the
       drive, hunger or thirst, conflict: whatever pushes the buyer to act.
     - Person: every human. A desired or better state is the same Person,
       upgraded (upright, a sharper coat, the product in hand) on a sky wash.
     - BrandBadge: the brand and its offer, on a pack or a card.
     - Heart: a feeling or what matters to the consumer.
     - Bicycle: the product of the motivation cycle, wished for in pencil,
       then bought in teal.
     - ReviewCard: a star-rated review, the week's sign for a written review.
   Teal is the one thing chosen, reached or ticked on a plate. Pencil is only
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
  Agent,
  at,
  Backwash,
  BrandBadge,
  Clock,
  curvePts,
  Ground,
  handAt,
  Heart,
  type Look,
  Magnifier,
  Pack,
  Person,
  Phone2,
  rp,
  sharp,
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
 * `level` (0 to 1). Everything that pushes a buyer to act is drawn as this.
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

/** A bowl of hot food. (x, y) is the middle of its rim, `w` its width. */
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

/** A trophy. (x, y) is the middle of the cup's rim, `s` its scale. */
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

/**
 * A five-tier pyramid, apex at (x, top), base at `base`, `half` = half the
 * base width. `fills` washes each tier from the bottom (0) up. `lit` tiers
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

/** A LOW-HIGH track with a marker at `level`. */
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
   MASLOW'S HIERARCHY, CONFLICTS, REVIEWS AND INVOLVEMENT | the parts
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
      label="Maslow's pyramid in five tiers, from survival at the bottom to growth at the top. Physiological: a bowl of food, a water drop and a moon. Safety: a shield. Belonging: a small group of friends. Esteem: a gold star. Self-actualization, on a sky wash: a teal sprout."
    >
      <Backwash cx={176} cy={236} rx={170} ry={170} seed={2100} />
      <Pyramid x={cx} top={top} base={base} half={half} seed={2110} fills={[SK.camel, SK.earth, SK.blush, SK.ochre, SK.sky]} />
      {TIERS.map((name, i) => (
        <SketchText key={name} x={edge(i) + 10} y={mid(i) + 4} size={i === 4 ? 9.5 : 10.5}>
          {name}
        </SketchText>
      ))}
      {/* survival to growth */}
      <SketchArrow pts={rp([[12, 390], [12, 30]])} seed={2150} width={1} head={7} />
      <text x={0} y={0} transform="translate(28 390) rotate(-90)" fontFamily="var(--font-label)" fontSize={10} fontWeight={500} fill={SK.ink}>
        SURVIVAL
      </text>
      <text x={0} y={0} transform="translate(28 30) rotate(-90)" textAnchor="end" fontFamily="var(--font-label)" fontSize={10} fontWeight={500} fill={SK.ink}>
        GROWTH
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

function ConflictPlate({ kind, name }: { kind: "aa" | "av" | "vv"; name: string }) {
  const labels = {
    aa: "A person stands between two attractive options, each marked plus, arms stretched toward both. Arrows lead from the person to each option.",
    av: "A person reaches toward one option that is half plus and half minus. One arrow leads toward it. Another pushes back from it.",
    vv: "A person stands between two unwanted options, each marked minus, shrugging. Arrows push toward the person from both sides.",
  };
  const look: Look = { hair: "long", hairTone: SK.brown, wear: SK.camel, outfit: "jacket" };
  return (
    <SketchFrame id={`sk-conflict-${kind}`} width={400} height={256} label={`${name.toLowerCase()}: ${labels[kind]}`}>
      <Backwash cx={200} cy={120} rx={186} ry={104} seed={2400} />
      <Ground x0={30} x1={370} y={212} seed={2401} />
      <SketchText x={200} y={246} anchor="middle" size={15}>
        {name}
      </SketchText>
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

/** Product involvement: expensive, socially visible, central to self-identity. */
function ProductInvolvement() {
  const tags = [
    { x: 76, y: 50, t: "EXPENSIVE", to: [180, 82] as Pt },
    { x: 316, y: 50, t: "SELF-IDENTITY", to: [220, 82] as Pt },
    { x: 200, y: 184, t: "SOCIALLY VISIBLE", to: [200, 144] as Pt },
  ];
  return (
    <SketchFrame
      id="sk-product-involvement"
      width={400}
      height={284}
      label="Product. A phone in the centre with three tags linked to it: expensive, self-identity and socially visible. Below, a meter from low to high sits near high."
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
      <SketchText x={200} y={274} anchor="middle" size={15}>
        PRODUCT
      </SketchText>
    </SketchFrame>
  );
}

/** Message involvement: close attention to the information in an ad. */
function MessageInvolvement() {
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
      height={284}
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
      <SketchText x={200} y={274} anchor="middle" size={15}>
        MESSAGE
      </SketchText>
    </SketchFrame>
  );
}

/** Purchase-situation involvement: a gift for a boss, acute time pressure. */
function SituationInvolvement() {
  const box = sharp([[236, 62], [304, 62], [304, 116], [236, 116]], true, 2);
  const lid = sharp([[230, 48], [310, 48], [310, 64], [230, 64]], true, 2);
  return (
    <SketchFrame
      id="sk-situation-involvement"
      width={400}
      height={284}
      label="Purchase situation. A clock marked time pressure and a wrapped gift box with a bow. Arrows run down from each to a meter from low to high, whose marker sits near high."
    >
      <Backwash cx={200} cy={124} rx={186} ry={114} seed={3000} />
      <Clock x={110} y={80} r={30} seed={3001} />
      <SketchText x={110} y={136} anchor="middle" size={10.5}>
        TIME PRESSURE
      </SketchText>
      <Paper pts={box} seed={3010} />
      <Wash pts={box} seed={3011} fill={SK.blush} opacity={0.85} />
      <InkLine pts={box} seed={3012} closed />
      <Paper pts={lid} seed={3013} />
      <Wash pts={lid} seed={3014} fill={SK.blush} opacity={0.95} />
      <InkLine pts={lid} seed={3015} closed />
      <InkLine pts={rp([[270, 48], [270, 116]])} seed={3016} width={2.6} color={SK.tan} amp={0.2} />
      <InkLine pts={rp([[270, 46], [254, 32], [252, 44], [270, 46], [286, 32], [288, 44], [270, 46]])} seed={3017} width={1.2} color={SK.tan} />
      {[110, 270].map((x, i) => (
        <SketchArrow key={x} pts={rp([[x, 150], [200 + (x - 200) * 0.3, 192]])} seed={3040 + i * 2} width={1} head={6} />
      ))}
      <Meter x1={110} x2={290} y={224} level={0.84} seed={3050} />
      <SketchText x={200} y={274} anchor="middle" size={15}>
        PURCHASE SITUATION
      </SketchText>
    </SketchFrame>
  );
}

/** The reviewer with a phone in the near hand, standing on (x, g). */
function Reviewer({ x, g, seed, flip = false, look = BETTER }: { x: number; g: number; seed: number; flip?: boolean; look?: Look }) {
  const [hx, hy] = handAt(x, g, 140, "hold", 1, flip);
  return (
    <g>
      <Person x={x} y={g} h={140} look={look} arms={["down", "hold"]} flip={flip} seed={seed} />
      <Phone2 x={r2(hx + (flip ? -3 : 3))} y={r2(hy - 10)} s={0.36} seed={seed + 80} />
    </g>
  );
}

/** A small review card, top-left (x, y): five stars over two lines of text. */
function ReviewCard({ x, y, seed }: { x: number; y: number; seed: number }) {
  const card = sharp([[x, y], [x + 54, y], [x + 54, y + 34], [x, y + 34]], true, 2);
  return (
    <g>
      <Paper pts={card} seed={seed} />
      <InkLine pts={card} seed={seed + 1} width={1} closed />
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} x={x + 9 + i * 9} y={y + 10} r={3.6} seed={seed + 2 + i} filled={i < 4} />
      ))}
      <InkLine pts={rp([[x + 6, y + 21], [x + 48, y + 21]])} seed={seed + 8} width={0.7} amp={0.2} />
      <InkLine pts={rp([[x + 6, y + 28], [x + 36, y + 28]])} seed={seed + 9} width={0.7} amp={0.2} />
    </g>
  );
}

/* ==========================================================================
   DEFINING CONSUMER MOTIVATION | the motivation cycle
   ========================================================================== */

/** A bicycle standing on (x, g), about 110 units wide. Teal when `lit`, pencil when absent. */
function Bicycle({ x, g, s = 1, seed, lit = false, pencil = false }: { x: number; g: number; s?: number; seed: number; lit?: boolean; pencil?: boolean }) {
  const r = 22 * s;
  const rear: Pt = [r2(x - 34 * s), r2(g - r)];
  const front: Pt = [r2(x + 34 * s), r2(g - r)];
  const crank: Pt = [r2(x - 4 * s), r2(g - r)];
  const seat: Pt = [r2(x - 12 * s), r2(g - r - 32 * s)];
  const head: Pt = [r2(x + 24 * s), r2(g - r - 30 * s)];
  const frame = rp([rear, seat, crank, rear]);
  const tubes = rp([seat, head, crank]);
  const fork = rp([head, front]);
  const bar = rp([[head[0] - 4 * s, head[1] - 8 * s], head, [head[0] + 8 * s, head[1] - 6 * s]]);
  const saddle = rp([[seat[0] - 9 * s, seat[1] - 3 * s], [seat[0] + 7 * s, seat[1] - 3 * s]]);
  const wheel = (c: Pt, k: number) => rp(blobPts(c[0], c[1], r, r, seed + k, 16, 0.03));
  if (pencil) {
    return (
      <g>
        <PencilLine pts={wheel(rear, 1)} dash="3 2.5" width={1.1} seed={seed + 1} closed />
        <PencilLine pts={wheel(front, 2)} dash="3 2.5" width={1.1} seed={seed + 2} closed />
        <PencilLine pts={frame} dash="3 2.5" width={1.1} seed={seed + 3} />
        <PencilLine pts={tubes} dash="3 2.5" width={1.1} seed={seed + 4} />
        <PencilLine pts={fork} dash="3 2.5" width={1.1} seed={seed + 5} />
        <PencilLine pts={bar} dash="3 2.5" width={1.1} seed={seed + 6} />
        <PencilLine pts={saddle} dash="3 2.5" width={1.1} seed={seed + 7} />
      </g>
    );
  }
  const tone = lit ? SK.teal : SK.ink;
  return (
    <g>
      <InkLine pts={wheel(rear, 1)} seed={seed + 1} closed />
      <InkLine pts={wheel(front, 2)} seed={seed + 2} closed />
      <InkLine pts={frame} seed={seed + 3} width={2.2} color={tone} />
      <InkLine pts={tubes} seed={seed + 4} width={2.2} color={tone} />
      <InkLine pts={fork} seed={seed + 5} width={2.2} color={tone} />
      <InkLine pts={bar} seed={seed + 6} width={1.4} />
      <InkLine pts={saddle} seed={seed + 7} width={2.4} />
    </g>
  );
}

/**
 * Unmet need (the bicycle wished for, in pencil), tension (a full gauge),
 * goal-directed behavior (the buyer walks the new bicycle home), tension
 * reduction (an empty gauge), and back round to the next need.
 */
export function MotivationCycle() {
  const g = 214;
  const stations = [
    { x: 100, t: ["UNMET NEED"] },
    { x: 300, t: ["TENSION"] },
    { x: 500, t: ["GOAL-DIRECTED", "BEHAVIOR"] },
    { x: 700, t: ["TENSION", "REDUCTION"] },
  ];
  return (
    <SketchFrame
      id="sk-motivation-cycle"
      width={800}
      height={330}
      label="A cycle of four stations, left to right. Unmet need: a person in a plain coat thinks of a bicycle drawn in pencil. Tension: a gauge filled nearly to the top. Goal-directed behavior: the person in a camel coat walks a new teal bicycle. Tension reduction: the same gauge, nearly empty. Arrows lead from each station to the next, and a long arrow beneath runs from the last station back to the first."
    >
      <Backwash cx={400} cy={150} rx={386} ry={130} seed={4000} />
      <Ground x0={30} x1={770} y={g} seed={4001} />

      {/* unmet need */}
      <Person x={70} y={g} h={140} look={PLAIN} arms={["down", "down"]} seed={4010} />
      <Thought x={160} y={66} rx={70} ry={46} tx={92} ty={96} seed={4030} />
      <Bicycle x={160} g={96} s={0.9} seed={4040} pencil />

      {/* tension */}
      <Gauge x={300} top={66} h={136} w={32} level={0.88} seed={4050} />

      {/* goal-directed behavior */}
      <Bicycle x={494} g={g} s={1.2} seed={4080} lit />
      <Person x={500} y={g} h={140} look={BETTER} arms={["down", "hold"]} seed={4060} />

      {/* tension reduction */}
      <Gauge x={700} top={66} h={136} w={32} level={0.1} seed={4090} />

      {[
        [212, 268],
        [336, 420],
        [584, 664],
      ].map(([a, b], i) => (
        <SketchArrow key={a} pts={rp([[a, 142], [(a + b) / 2, 138], [b, 142]])} seed={4100 + i * 2} />
      ))}
      <SketchArrow pts={curvePts([700, 284], [400, 318], [100, 284], 18)} seed={4110} width={1.1} />

      {stations.map((s) =>
        s.t.map((line, k) => (
          <SketchText key={line + s.x} x={s.x} y={238 + k * 14} anchor="middle" size={11}>
            {line}
          </SketchText>
        )),
      )}
    </SketchFrame>
  );
}

/* ==========================================================================
   EXPECTANCY THEORY | an interactive chain
   ========================================================================== */

const fmt = (v: number) => v.toFixed(1);

/**
 * Effort, performance, outcome. Each slider sets one belief. Performance bars
 * grow with expectancy, the second link thickens with instrumentality, the
 * hearts fill with valence, and motivation is their product, so any one belief
 * near zero empties it.
 */
export function ExpectancyLab() {
  const [e, setE] = React.useState(0.8);
  const [ins, setIns] = React.useState(0.8);
  const [v, setV] = React.useState(0.8);
  const m = e * ins * v;
  const g = 222;
  const [lx, ly] = handAt(130, g, 140, "up", -1);
  const [rx] = handAt(130, g, 140, "up", 1);
  const bars = [
    { x: 364, h: 40 },
    { x: 400, h: 70 },
    { x: 436, h: 100 },
  ];
  const hearts = Math.round(v * 3);
  const link = (x0: number, x1: number, strength: number, seed: number) =>
    strength < 0.15 ? (
      <PencilLine pts={rp([[x0, 150], [(x0 + x1) / 2, 146], [x1, 150]])} seed={seed} />
    ) : (
      <SketchArrow pts={rp([[x0, 150], [(x0 + x1) / 2, 146], [x1, 150]])} seed={seed} width={r2(0.6 + strength * 2.2)} />
    );
  const sliders = [
    { label: "expectancy", value: e, set: setE },
    { label: "instrumentality", value: ins, set: setIns },
    { label: "valence", value: v, set: setV },
  ];
  return (
    <div className="w-full">
      <SketchFrame
        id="sk-expectancy-lab"
        width={800}
        height={350}
        label={`Three stations left to right. Effort: a person lifting a dumbbell overhead. Performance: three bars, whose height follows expectancy. Outcome: a trophy with hearts above it, as many as the valence allows. The arrow from effort to performance is expectancy, ${fmt(e)}. The arrow from performance to outcome is instrumentality, ${fmt(ins)}. Valence is ${fmt(v)}. Below, a motivation meter shows their product, ${m.toFixed(2)}.`}
      >
        <Backwash cx={400} cy={150} rx={384} ry={140} seed={4200} />
        <Ground x0={40} x1={760} y={g} seed={4201} />
        <Person x={130} y={g} h={140} look={BETTER} arms={["up", "up"]} seed={4210} />
        <Dumbbell x={r2((lx + rx) / 2)} y={r2(ly - 2)} s={1} seed={4220} />
        {bars.map((b, i) => {
          const h = r2(Math.max(4, b.h * e));
          const pts = sharp([[b.x - 13, g], [b.x - 13, g - h], [b.x + 13, g - h], [b.x + 13, g]], true, 1.5);
          return (
            <g key={b.x}>
              <Wash pts={pts} seed={4230 + i * 3} fill={SK.camel} opacity={0.4 + i * 0.2} dx={1} dy={0} />
              <InkLine pts={pts.slice(0, -2)} seed={4231 + i * 3} width={1.2} />
            </g>
          );
        })}
        <Trophy x={670} y={124} s={1.05} seed={4250} />
        {[-28, 0, 28].map((dx, i) =>
          i < hearts ? (
            <Heart key={dx} x={670 + dx} y={74} s={0.85} seed={4260 + i * 3} />
          ) : (
            <PencilLine
              key={dx}
              closed
              seed={4260 + i * 3}
              pts={rp([[0, 10], [-8, 3], [-12, -4], [-9, -10], [-3, -10], [0, -5], [3, -10], [9, -10], [12, -4], [8, 3]].map(([px, py]) => [670 + dx + px * 0.85, 74 + py * 0.85] as Pt))}
            />
          ),
        )}
        {link(200, 330, e, 4270)}
        {link(470, 600, ins, 4272)}
        <SketchText x={265} y={128} anchor="middle" size={12}>
          {`EXPECTANCY ${fmt(e)}`}
        </SketchText>
        <SketchText x={535} y={128} anchor="middle" size={12}>
          {`INSTRUMENTALITY ${fmt(ins)}`}
        </SketchText>
        <SketchText x={670} y={46} anchor="middle" size={12}>
          {`VALENCE ${fmt(v)}`}
        </SketchText>
        {[
          { x: 130, t: "EFFORT" },
          { x: 400, t: "PERFORMANCE" },
          { x: 670, t: "OUTCOME" },
        ].map((k) => (
          <SketchText key={k.t} x={k.x} y={246} anchor="middle" size={12}>
            {k.t}
          </SketchText>
        ))}
        <SketchText x={400} y={290} anchor="middle" size={13}>
          {`MOTIVATION ${fmt(e)} × ${fmt(ins)} × ${fmt(v)} = ${m.toFixed(2)}`}
        </SketchText>
        <Meter x1={210} x2={590} y={320} level={m} seed={4280} />
      </SketchFrame>
      <div className="mt-2 grid gap-x-6 gap-y-2 px-1 sm:grid-cols-3">
        {sliders.map((s) => (
          <label
            key={s.label}
            className="flex items-center gap-3 whitespace-nowrap text-xs font-medium text-[var(--ink-2)]"
            style={{ fontFamily: "var(--font-label)" }}
          >
            {s.label}
            <input
              type="range"
              min={0}
              max={10}
              value={Math.round(s.value * 10)}
              onChange={(ev) => s.set(Number(ev.target.value) / 10)}
              className="w-full accent-[var(--ink)]"
              aria-label={s.label}
            />
          </label>
        ))}
      </div>
    </div>
  );
}

/* ==========================================================================
   MOTIVATIONAL CONFLICTS | three structures side by side
   ========================================================================== */

export function ThreeConflicts() {
  const names: Record<"aa" | "av" | "vv", string[]> = {
    aa: ["APPROACH-APPROACH"],
    av: ["APPROACH-AVOIDANCE"],
    vv: ["AVOIDANCE-AVOIDANCE"],
  };
  return (
    <div className="grid w-full gap-4 sm:grid-cols-3">
      {(["aa", "av", "vv"] as const).map((k) => (
        <ConflictPlate key={k} kind={k} name={names[k][0]} />
      ))}
    </div>
  );
}

/* ==========================================================================
   INTRINSIC VERSUS EXTRINSIC | crowding out
   ========================================================================== */

/**
 * Two panels, the same reviewer writing the same review. Intrinsic: the motive
 * is a heart and the review goes to another shopper. Extrinsic: the motive is
 * the credit, the review goes to the firm, and the heart, crowded out, is
 * left in pencil.
 */
export function CrowdingOut() {
  const g = 212;
  const heart = (x: number, y: number, s: number) =>
    rp([[0, 10], [-8, 3], [-12, -4], [-9, -10], [-3, -10], [0, -5], [3, -10], [9, -10], [12, -4], [8, 3]].map(([px, py]) => [x + px * s, y + py * s] as Pt));
  return (
    <SketchFrame
      id="sk-crowding-out"
      width={400}
      height={238}
      label="Two panels. Intrinsic: a reviewer thinking of a heart holds up a star-rated review, and an arrow carries it to another shopper reading a phone. Extrinsic: the same reviewer thinks of a tag reading plus ten dollars, and an arrow carries the same review to the brand. The heart, pushed out of the thought, is drawn only in pencil and marked crowded out."
    >
      <Backwash cx={100} cy={126} rx={94} ry={98} seed={4300} opacity={0.4} />
      <Backwash cx={300} cy={126} rx={94} ry={98} seed={4301} opacity={0.4} />
      <InkLine pts={rp([[204, 20], [204, 214]])} seed={4302} width={0.6} />
      <SketchText x={100} y={24} anchor="middle" size={11}>
        INTRINSIC
      </SketchText>
      <SketchText x={300} y={24} anchor="middle" size={11}>
        EXTRINSIC
      </SketchText>

      <Ground x0={12} x1={194} y={g} seed={4303} />
      <Reviewer x={40} g={g} seed={4310} />
      <Thought x={66} y={56} rx={24} ry={17} tx={46} ty={82} seed={4330} />
      <Heart x={66} y={55} s={1} seed={4340} />
      <ReviewCard x={70} y={100} seed={4345} />
      <SketchArrow pts={[[128, 117], [152, 124]]} seed={4355} width={1.1} head={6} />
      <Reviewer x={180} g={g} seed={4360} flip look={PLAIN} />

      <Ground x0={210} x1={388} y={g} seed={4304} />
      <Reviewer x={240} g={g} seed={4370} />
      <Thought x={272} y={56} rx={36} ry={19} tx={246} ty={82} seed={4390} />
      <Tag2 x={272} y={56} text="+$10" seed={4400} />
      <PencilLine pts={heart(342, 50, 1.25)} seed={4405} width={1.2} dash="3 2.5" closed />
      <SketchText x={342} y={84} anchor="middle" size={9.5} fill={SK.pencil}>
        CROWDED OUT
      </SketchText>
      <ReviewCard x={270} y={100} seed={4410} />
      <SketchArrow pts={[[328, 117], [348, 128]]} seed={4420} width={1.1} head={6} />
      <BrandBadge x={364} y={140} r={14} seed={4425} />
    </SketchFrame>
  );
}

/* ==========================================================================
   INVOLVEMENT | three sources
   ========================================================================== */

export function InvolvementSources() {
  const items = [
    { k: "product", plate: <ProductInvolvement /> },
    { k: "message", plate: <MessageInvolvement /> },
    { k: "situation", plate: <SituationInvolvement /> },
  ];
  return (
    <div className="grid w-full gap-4 sm:grid-cols-3">
      {items.map((i) => (
        <div key={i.k} className="min-w-0">
          {i.plate}
        </div>
      ))}
    </div>
  );
}

/* ==========================================================================
   STRENGTH, DIRECTION, DRIVE, VALUES, CONFLICTS, APPEALS, AND DELEGATION
   ========================================================================== */

/** A small round dot, the end of a link. */
function Dot({ x, y, r = 3.4, seed, fill = SK.ink }: { x: number; y: number; r?: number; seed: number; fill?: string }) {
  return <Wash pts={rp(blobPts(x, y, r, r, seed, 8, 0.1))} seed={seed} fill={fill} opacity={1} dx={0} dy={0} />;
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

/** A burger in side view, centred on (x, y). About 60 units wide at s = 1. */
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

/** A bowl of rice with chopsticks. (x, y) is the middle of the rim. */
function RiceBowl({ x, y, s = 1, seed, pencil = false }: { x: number; y: number; s?: number; seed: number; pencil?: boolean }) {
  const bowl = at(
    x,
    y,
    Array.from({ length: 9 }, (_, i) => {
      const a = (i / 8) * Math.PI;
      return [Math.cos(a) * 30, Math.sin(a) * 24] as Pt;
    }),
    s,
  );
  const rice = at(x, y, [[-26, 0], [-20, -12], [-6, -18], [8, -18], [20, -12], [26, 0]], s);
  const sticks = [at(x, y, [[4, -12], [40, -44]], s), at(x, y, [[12, -10], [46, -36]], s)];
  if (pencil) {
    return (
      <g>
        <PencilLine pts={bowl} seed={seed} closed />
        <PencilLine pts={rice} seed={seed + 1} />
        {sticks.map((st, i) => (
          <PencilLine key={i} pts={st} seed={seed + 2 + i} />
        ))}
      </g>
    );
  }
  return (
    <g>
      {sticks.map((st, i) => (
        <InkLine key={i} pts={st} seed={seed + 2 + i} width={1.6} amp={0.2} />
      ))}
      <Paper pts={rice} seed={seed + 4} />
      <InkLine pts={rice} seed={seed + 5} width={0.9} />
      <Wash pts={bowl} seed={seed + 6} fill={SK.sky} opacity={0.8} />
      <InkLine pts={bowl} seed={seed + 7} closed />
    </g>
  );
}

/** A slice of pizza pointing down. (x, y) is the middle of the crust. */
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
      <text x={0} y={0} transform="translate(32 30) rotate(-90)" textAnchor="end" fontFamily="var(--font-label)" fontSize={10} fontWeight={500} fill={SK.ink}>
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

/** The one that fits their values, not the one with the most features. */
export function FitsValues() {
  const card = (x0: number) => sharp([[x0, 56], [x0 + 170, 56], [x0 + 170, 246], [x0, 246]], true, 4);
  const valCard = sharp([[44, 68], [194, 68], [194, 204], [44, 204]], true, 4);
  return (
    <SketchFrame
      id="sk-fits-values"
      width={800}
      height={286}
      label="On the left, a core value card marked personal value. On the right, two product spec cards: one with a long list of eight ticked features, marked most features, and one with four teal ticks and the matching value emblem, marked fits their values. An arrow arcs above the first card to connect the personal value card to the second product."
    >
      <Backwash cx={120} cy={140} rx={110} ry={108} seed={3600} />
      <Backwash cx={520} cy={154} rx={260} ry={124} seed={3602} />

      <Paper pts={valCard} seed={3620} />
      <InkLine pts={valCard} seed={3621} width={1.2} closed />
      <Heart x={119} y={124} s={1.4} seed={3630} />
      <SketchText x={119} y={178} anchor="middle" size={10}>
        PERSONAL VALUE
      </SketchText>

      <Paper pts={card(300)} seed={3650} />
      <InkLine pts={card(300)} seed={3651} width={1.1} closed />
      {Array.from({ length: 8 }, (_, i) => (
        <g key={i}>
          <Tick1 x={326} y={78 + i * 20} s={0.75} seed={3660 + i * 2} color={SK.ink} />
          <InkLine pts={rp([[342, 78 + i * 20], [342 + [96, 78, 88, 68, 98, 74, 84, 64][i], 78 + i * 20]])} seed={3661 + i * 2} width={1.3} amp={0.25} />
        </g>
      ))}
      <SketchText x={385} y={272} anchor="middle" size={11}>
        MOST FEATURES
      </SketchText>

      <Paper pts={card(550)} seed={3680} />
      <Wash pts={card(550)} seed={3681} fill={SK.teal} opacity={0.28} dx={2} dy={2} />
      <InkLine pts={card(550)} seed={3682} width={1.4} closed />
      <Heart x={635} y={102} s={1.4} seed={3683} />
      {Array.from({ length: 4 }, (_, i) => (
        <g key={i}>
          <Tick1 x={576} y={154 + i * 20} s={0.75} seed={3690 + i * 2} />
          <InkLine pts={rp([[592, 154 + i * 20], [592 + [96, 78, 88, 68][i], 154 + i * 20]])} seed={3691 + i * 2} width={1.3} amp={0.25} />
        </g>
      ))}
      <SketchText x={635} y={272} anchor="middle" size={11}>
        FITS THEIR VALUES
      </SketchText>
      <SketchArrow pts={curvePts([194, 72], [416, -12], [612, 48], 18)} seed={3640} width={1.4} color={SK.teal} />
    </SketchFrame>
  );
}

/** Two attractive options. The budget allows one. */
export function PhoneOrTrip() {
  return (
    <SketchFrame
      id="sk-phone-or-trip"
      width={400}
      height={200}
      label="A new phone on the left and a suitcase for a weekend trip on the right, each marked plus. In the middle, a wallet with a single coin, marked budget, with arrows to both and the word or between them."
    >
      <Backwash cx={200} cy={104} rx={188} ry={88} seed={2500} />
      <Phone2 x={62} y={114} s={1.15} seed={2510} />
      <Option x={98} y={54} r={13} kind="plus" seed={2515} />
      <Suitcase1 x={332} y={120} s={0.85} seed={2520} />
      <Option x={372} y={62} r={13} kind="plus" seed={2525} />
      <Wallet x={200} y={104} s={1} seed={2530} />
      <SketchText x={200} y={154} anchor="middle" size={10}>
        BUDGET
      </SketchText>
      <SketchArrow pts={curvePts([158, 98], [128, 72], [96, 94], 10)} seed={2540} width={1.1} head={7} />
      <SketchArrow pts={curvePts([242, 98], [272, 72], [286, 98], 10)} seed={2542} width={1.1} head={7} />
      <SketchText x={200} y={40} anchor="middle" size={14} serif>
        or
      </SketchText>
    </SketchFrame>
  );
}

/** A strong brand spells out benefits and cost. The conflict gauge drops. */
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

/** Review intention (1 to 5) by message, without and with a $10 credit (Wadi et al., 2026a, Study 2). */
const INTENTION = [
  { label: ["HELP OTHER", "SHOPPERS"], none: 2.75, credit: 4.32 },
  { label: ["HELP THE", "COMPANY"], none: 2.95, credit: 3.95 },
];

export function CreditByMessage() {
  const base = 214;
  const unit = 40;
  const yOf = (v: number) => r2(base - (v - 1) * unit);
  return (
    <SketchFrame
      id="sk-credit-message"
      width={400}
      height={268}
      label="Review intention on a scale from 1 to 5, one bar per message. Help other shoppers: 2.75 with no credit, rising to 4.32 with a ten-dollar credit, a teal gain of 1.57. Help the company: 2.95 with no credit, rising to 3.95 with the credit, a gain of 1.00."
    >
      <Backwash cx={214} cy={134} rx={186} ry={120} seed={3800} opacity={0.4} />
      <InkLine pts={rp([[70, yOf(5) - 6], [70, base]])} seed={3801} width={1} />
      <InkLine pts={rp([[70, base], [372, base]])} seed={3802} width={1} />
      {[1, 2, 3, 4, 5].map((v) => (
        <g key={v}>
          <InkLine pts={rp([[64, yOf(v)], [70, yOf(v)]])} seed={3803 + v} width={0.8} amp={0.1} />
          <SketchText x={58} y={yOf(v) + 4} anchor="end" size={10}>
            {String(v)}
          </SketchText>
        </g>
      ))}
      <SketchText x={70} y={30} anchor="middle" size={9.5}>
        REVIEW INTENTION
      </SketchText>

      {INTENTION.map((m, i) => {
        const x0 = 118 + i * 140;
        const x1 = x0 + 104;
        const low = sharp([[x0, yOf(m.none)], [x1, yOf(m.none)], [x1, base], [x0, base]], true, 1.5);
        const up = sharp([[x0, yOf(m.credit)], [x1, yOf(m.credit)], [x1, yOf(m.none)], [x0, yOf(m.none)]], true, 1.5);
        const cx = (x0 + x1) / 2;
        const gain = r2(m.credit - m.none);
        return (
          <g key={m.label[1]}>
            <Paper pts={low} seed={3820 + i * 10} />
            <InkLine pts={low} seed={3821 + i * 10} width={1.1} closed />
            <Wash pts={up} seed={3822 + i * 10} fill={i === 0 ? SK.teal : SK.camel} opacity={0.75} />
            <InkLine pts={up} seed={3823 + i * 10} width={1.1} closed />
            <SketchText x={cx} y={r2(yOf(m.credit) - 8)} anchor="middle" size={12}>
              {m.credit.toFixed(2)}
            </SketchText>
            <SketchText x={cx} y={r2((yOf(m.credit) + yOf(m.none)) / 2 - 4)} anchor="middle" size={9.5}>
              $10 CREDIT
            </SketchText>
            <SketchText x={cx} y={r2((yOf(m.credit) + yOf(m.none)) / 2 + 12)} anchor="middle" size={11}>
              {`+${gain.toFixed(2)}`}
            </SketchText>
            <SketchText x={cx} y={r2(yOf(m.none) + 18)} anchor="middle" size={11}>
              {m.none.toFixed(2)}
            </SketchText>
            <SketchText x={cx} y={r2(yOf(m.none) + 34)} anchor="middle" size={9.5}>
              NO CREDIT
            </SketchText>
            {m.label.map((t, k) => (
              <SketchText key={t} x={cx} y={base + 20 + k * 15} anchor="middle" size={10}>
                {t}
              </SketchText>
            ))}
          </g>
        );
      })}
    </SketchFrame>
  );
}

/** High involvement compares carefully. Low involvement grabs the familiar pack. */
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
        MORE EFFORT | CAREFUL COMPARISON
      </SketchText>

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
        HABIT | SIMPLE CUES
      </SketchText>
    </SketchFrame>
  );
}

/** A laundry detergent jug standing on (x, bottom). */
function Jug({ x, bottom, seed }: { x: number; bottom: number; seed: number }) {
  const body = sharp(rp([[x - 22, bottom], [x - 22, bottom - 50], [x - 12, bottom - 62], [x + 6, bottom - 62], [x + 22, bottom - 50], [x + 22, bottom]]), true, 3);
  const cap = sharp(rp([[x - 10, bottom - 62], [x - 10, bottom - 72], [x + 2, bottom - 72], [x + 2, bottom - 62]]), true, 1.5);
  const handle = rp([[x + 8, bottom - 58], [x + 20, bottom - 56], [x + 20, bottom - 40], [x + 12, bottom - 40]]);
  const label = sharp(rp([[x - 16, bottom - 36], [x + 16, bottom - 36], [x + 16, bottom - 14], [x - 16, bottom - 14]]), true, 1.5);
  return (
    <g>
      <Wash pts={body} seed={seed} fill={SK.sky} opacity={0.8} />
      <InkLine pts={body} seed={seed + 1} closed />
      <InkLine pts={handle} seed={seed + 2} width={1} />
      <Wash pts={cap} seed={seed + 3} fill={SK.charcoal} opacity={0.6} />
      <InkLine pts={cap} seed={seed + 4} width={1} closed />
      <Paper pts={label} seed={seed + 5} />
      <InkLine pts={label} seed={seed + 6} width={0.9} closed />
    </g>
  );
}

export function DelegateByInvolvement() {
  const g = 196;
  const [hx, hy] = handAt(292, g, 150, "reach");
  return (
    <SketchFrame
      id="sk-delegate-involvement"
      width={400}
      height={218}
      label="Two panels. Low involvement: the AI agent phone and a laundry detergent jug with a circular repeat arrow over it, reordered by the agent. High involvement: a person holds up an engagement ring in a teal box and looks at it closely."
    >
      <Backwash cx={100} cy={118} rx={94} ry={90} seed={3900} opacity={0.4} />
      <Backwash cx={300} cy={118} rx={94} ry={90} seed={3901} opacity={0.4} />
      <InkLine pts={rp([[200, 18], [200, 200]])} seed={3902} width={0.6} />
      <SketchText x={100} y={24} anchor="middle" size={10.5}>
        LOW INVOLVEMENT
      </SketchText>
      <SketchText x={300} y={24} anchor="middle" size={10.5}>
        HIGH INVOLVEMENT
      </SketchText>

      <Ground x0={14} x1={188} y={g} seed={3903} />
      <Agent x={54} y={g} s={1.05} seed={3910} />
      <SketchArrow pts={[[82, 150], [110, 150]]} seed={3920} />
      <Jug x={146} bottom={g} seed={3930} />
      <SketchArrow
        pts={rp(
          Array.from({ length: 14 }, (_, i) => {
            const a = Math.PI * (0.62 + (i / 13) * 1.62);
            return [146 + Math.cos(a) * 17, 94 + Math.sin(a) * 17] as Pt;
          }),
        )}
        seed={3940}
        width={1.2}
        head={6}
      />

      <Ground x0={212} x1={388} y={g} seed={3904} />
      <Person x={292} y={g} h={150} look={BETTER} arms={["hip", "reach"]} seed={3950} />
      {(() => {
        const box = sharp(rp([[hx - 2, hy - 10], [hx + 24, hy - 10], [hx + 24, hy + 6], [hx - 2, hy + 6]]), true, 2);
        const ring = rp(blobPts(hx + 11, hy - 18, 6, 6, 3962, 12, 0.04));
        const gem = sharp(rp([[hx + 11, hy - 32], [hx + 15, hy - 27], [hx + 11, hy - 24], [hx + 7, hy - 27]]), true, 0.8);
        return (
          <g>
            <Wash pts={box} seed={3960} fill={SK.teal} opacity={0.85} />
            <InkLine pts={box} seed={3961} width={1.1} closed />
            <InkLine pts={ring} seed={3963} width={1.4} closed />
            <Wash pts={gem} seed={3964} fill={SK.sky} opacity={0.9} dx={0.3} dy={0.3} />
            <InkLine pts={gem} seed={3965} width={0.9} closed />
          </g>
        );
      })()}
    </SketchFrame>
  );
}
