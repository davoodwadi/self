/* ==========================================================================
   Consumer Behavior · Week 08 — figures
   --------------------------------------------------------------------------
   Editorial Sketch plates for behavioral economics, heuristics and biases:
   wobbly doubled ink and loose watercolour washes set off-register. Every
   mark comes from ../_visuals; the style rules live in ../CLAUDE.md.

   Fixed cast for this week:
     · Person: every human, one fashion-illustration figure (the SHOPPER look),
       varied only by hair, clothes and skin washes.
     · Agent: the AI agent (shared: a phone with the AI sparkle).
     · Jar: the instant-coffee jar, the week's running product for prices.
     · Tag: the paper price tag, for every price a shopper reads.

   Colour roles: teal is the one thing chosen, bought, lit or ticked on a
   plate; ochre a badge, a count or a small highlight; pencil only an absent
   object (a struck price, an unopened detail, a placeholder).
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
  BrandBadge,
  Can3,
  Car3,
  Ground,
  Heart,
  Jar,
  type Look,
  PayCard,
  Person,
  rp,
  sharp,
  SketchArrow,
  Stars,
  Thought,
  Tick2,
} from "../_visuals/objects";

/* -- the week's looks ---------------------------------------------------- */

const SHOPPER: Look = { hair: "curly", hairTone: SK.brown, wear: SK.camel, legs: SK.charcoal, skin: SK.tan, skinOpacity: 0.55 };

/* -- the week's price tag ------------------------------------------------- */

/**
 * A paper price tag hanging from a string, centred on (x, y), `w` wide. The
 * price is set in the serif; `big` sets the leftmost digit larger.
 */
function PriceTag({ x, y, w = 92, h = 46, seed, children, size = 22, lit = false }: { x: number; y: number; w?: number; h?: number; seed: number; children?: React.ReactNode; size?: number; lit?: boolean }) {
  const l = x - w / 2;
  const r = x + w / 2;
  const t = y - h / 2;
  const b = y + h / 2;
  const pts = sharp(rp([[l + 12, t], [r, t], [r, b], [l + 12, b], [l, y]]), true, 2);
  const hole = rp(blobPts(l + 11, y, 3.2, 3.2, seed + 2, 8, 0.05));
  return (
    <g>
      <Paper pts={pts} seed={seed} />
      {lit ? <Wash pts={pts} seed={seed + 4} fill={SK.teal} opacity={0.35} dx={1.2} dy={1} /> : null}
      <InkLine pts={pts} seed={seed + 1} width={1.2} closed />
      <InkLine pts={hole} seed={seed + 3} width={0.9} closed />
      {children ? (
        <SketchText x={r2(x + 6)} y={r2(y + size * 0.36)} anchor="middle" size={size} serif>
          {children}
        </SketchText>
      ) : null}
    </g>
  );
}

/** A shelf plank from x0 to x1 with its top at y. */
function Plank({ x0, x1, y, seed }: { x0: number; x1: number; y: number; seed: number }) {
  const pts = sharp(rp([[x0, y], [x1, y], [x1, y + 9], [x0, y + 9]]), true, 1.5);
  return (
    <g>
      <Wash pts={pts} seed={seed} fill={SK.leather} opacity={0.55} dx={0.6} dy={0.4} />
      <InkLine pts={pts} seed={seed + 1} width={1.1} closed />
    </g>
  );
}

/* ==========================================================================
   Title
   ========================================================================== */

/**
 * The week's opening: two coffee jars on a shelf, $4.99 and $5.00. A shopper
 * reaches for the $4.99 jar, and her AI agent, propped on the shelf, points
 * the same way: both take the shortcut. The $4.99 jar is the one chosen.
 */
export function ShortcutShelf() {
  return (
    <SketchFrame
      id="sk-shortcut-shelf"
      width={480}
      height={330}
      label="A shopper reaches for the cheaper-looking of two coffee jars on a shelf, priced $4.99 and $5.00. Her AI agent, a phone propped on the shelf, points to the same $4.99 jar, which is lit as the one chosen."
    >
      <Backwash cx={262} cy={172} rx={226} ry={146} seed={8001} />
      <Ground x0={90} x1={460} y={312} seed={8002} />
      <Plank x0={224} x1={462} y={196} seed={8003} />
      <Jar x={272} bottom={196} w={58} h={84} level={0.82} seed={8010} lit />
      <Jar x={378} bottom={196} w={62} h={92} level={0.82} seed={8020} />
      <PriceTag x={274} y={236} w={92} seed={8030}>
        $4.99
      </PriceTag>
      <PriceTag x={380} y={236} w={92} seed={8034}>
        $5.00
      </PriceTag>
      <InkLine pts={rp([[234, 205], [234, 222]])} seed={8038} width={0.8} />
      <InkLine pts={rp([[340, 205], [340, 222]])} seed={8039} width={0.8} />
      <Person x={190} y={312} h={196} look={SHOPPER} arms={["hip", "reach"]} seed={8040} />
      <Agent x={438} y={196} s={0.62} seed={8060} />
      <SketchArrow pts={rp([[444, 138], [440, 82], [380, 62], [318, 66], [292, 88]])} seed={8070} width={1.2} head={8} />
    </SketchFrame>
  );
}

/* ==========================================================================
   Beyond the Rational Consumer
   ========================================================================== */

const ROW_X = [44, 96, 148, 200, 252, 304, 356];
const ROW_H = [52, 60, 48, 56, 62, 50, 58];

/**
 * A shelf of seven coffee jars, with the shopper's search drawn as hops from
 * jar to jar over their lids. `looked` jars are visited in order; `pick` is
 * the jar bought (teal, with a tick).
 */
function JarRow({ id, looked, pick, label, seed }: { id: string; looked: number; pick: number; label: string; seed: number }) {
  const base = 168;
  return (
    <SketchFrame id={id} width={400} height={200} label={label}>
      <Backwash cx={200} cy={110} rx={192} ry={88} seed={seed} />
      <Plank x0={16} x1={384} y={base} seed={seed + 1} />
      {ROW_X.map((x, i) => (
        <Jar key={i} x={x} bottom={base} w={31} h={ROW_H[i]} level={0.8} seed={seed + 10 + i * 10} lit={i === pick} />
      ))}
      {ROW_X.slice(0, looked - 1).map((x, i) => {
        const y0 = base - ROW_H[i] - 20;
        const y1 = base - ROW_H[i + 1] - 20;
        const top = Math.min(y0, y1) - 22;
        return (
          <SketchArrow
            key={i}
            pts={rp([[x + 4, y0], [x + 14, top], [x + 38, top], [ROW_X[i + 1] - 4, y1 - 3]])}
            seed={seed + 100 + i * 3}
            width={1}
            head={6}
          />
        );
      })}
      <Tick2 x={ROW_X[pick] + 2} y={base + 22} s={1.1} seed={seed + 140} />
    </SketchFrame>
  );
}

/** The rational consumer: every jar on the shelf is looked at before the best one is bought. */
export function CompareEvery() {
  return (
    <JarRow
      id="sk-compare-every"
      looked={7}
      pick={4}
      seed={8100}
      label="Seven coffee jars on a shelf. Hops over the lids show the shopper looking at every jar in turn, from the first to the seventh; the fifth jar, the best, is the one bought, lit teal and ticked."
    />
  );
}

/** Satisficing: the shopper looks at three jars and buys the third, which is good enough. */
export function GoodEnough() {
  return (
    <JarRow
      id="sk-good-enough"
      looked={3}
      pick={2}
      seed={8200}
      label="The same seven coffee jars. Hops show the shopper looking at only the first three jars; the third, good enough, is bought, lit teal and ticked, and the other four are never looked at."
    />
  );
}

/* ==========================================================================
   System 1 and System 2
   ========================================================================== */

/**
 * System 1: a shopper walking past a shop window stops and points at the big
 * SALE sign in it, in an instant.
 */
export function SaleGlance() {
  const win = sharp(rp([[176, 34], [376, 34], [376, 196], [176, 196]]), true, 2);
  const sign = sharp(rp([[206, 66], [346, 66], [346, 136], [206, 136]]), true, 2);
  return (
    <SketchFrame
      id="sk-sale-glance"
      width={400}
      height={230}
      label="A shopper walking past a shop window stops and points at a big SALE sign hanging in it."
    >
      <Backwash cx={204} cy={120} rx={192} ry={104} seed={8301} />
      <Ground x0={20} x1={384} y={212} seed={8302} />
      <Wash pts={win} seed={8303} fill={SK.sky} opacity={0.5} dx={1} dy={1} />
      <InkLine pts={win} seed={8304} closed />
      <InkLine pts={rp([[166, 196], [386, 196]])} seed={8305} width={1.1} />
      <InkLine pts={rp([[236, 34], [236, 66]])} seed={8306} width={0.8} />
      <InkLine pts={rp([[316, 34], [316, 66]])} seed={8307} width={0.8} />
      <Paper pts={sign} seed={8308} />
      <Wash pts={sign} seed={8309} fill={SK.blush} opacity={0.8} dx={1.5} dy={1.2} />
      <InkLine pts={sign} seed={8310} closed width={1.3} />
      <SketchText x={276} y={115} anchor="middle" size={38} serif>
        SALE
      </SketchText>
      <Person x={100} y={212} h={176} look={SHOPPER} arms={["hip", "point"]} seed={8320} />
    </SketchFrame>
  );
}

/** A small notepad with a spiral top, centred at x with its top at y. */
function Notepad({ x, y, w = 150, h = 112, seed, children }: { x: number; y: number; w?: number; h?: number; seed: number; children?: React.ReactNode }) {
  const pad = sharp(rp([[x - w / 2, y], [x + w / 2, y], [x + w / 2, y + h], [x - w / 2, y + h]]), true, 2);
  return (
    <g>
      <Paper pts={pad} seed={seed} />
      <InkLine pts={pad} seed={seed + 1} closed />
      {Array.from({ length: Math.floor(w / 18) }, (_, i) => {
        const cx = r2(x - w / 2 + 14 + i * 18);
        return <InkLine key={i} pts={rp(blobPts(cx, y, 3.4, 5, seed + 10 + i, 8, 0.05))} seed={seed + 30 + i} width={0.9} closed />;
      })}
      {children}
    </g>
  );
}

/** A pencil lying at (x, y), `len` long, tilted by `deg`. */
function Pencil({ x, y, len = 96, deg = -20, seed }: { x: number; y: number; len?: number; deg?: number; seed: number }) {
  const a = (deg * Math.PI) / 180;
  const ux = Math.cos(a);
  const uy = Math.sin(a);
  const P = (u: number, v: number): Pt => [r2(x + ux * u - uy * v), r2(y + uy * u + ux * v)];
  const body = [P(0, -4.5), P(len - 16, -4.5), P(len - 16, 4.5), P(0, 4.5)];
  const tip = [P(len - 16, -4.5), P(len, 0), P(len - 16, 4.5)];
  return (
    <g>
      <Wash pts={body} seed={seed} fill={SK.ochre} opacity={0.8} dx={0.4} dy={0.3} />
      <InkLine pts={body} seed={seed + 1} width={1} closed />
      <InkLine pts={tip} seed={seed + 2} width={1} />
      <InkLine pts={[P(len - 4, -1.2), P(len, 0), P(len - 4, 1.2)]} seed={seed + 3} width={1.6} amp={0.1} />
    </g>
  );
}

/**
 * System 2: two coffee jars with their prices and weights, and a notepad on
 * which the price per ounce of each has been worked out; the cheaper one per
 * ounce, the $5.00 jar, is ticked and lit.
 */
export function SlowCompare() {
  return (
    <SketchFrame
      id="sk-slow-compare"
      width={400}
      height={230}
      label="Two coffee jars, $4.99 for 10 ounces and $5.00 for 11 ounces, beside a notepad and pencil. On the notepad the price per ounce of each is worked out: 49.9 cents and 45.5 cents. The $5.00 jar, cheaper per ounce, is ticked and lit."
    >
      <Backwash cx={200} cy={118} rx={192} ry={104} seed={8401} />
      <Ground x0={14} x1={206} y={150} seed={8402} />
      <Jar x={58} bottom={150} w={56} h={74} level={0.8} seed={8410} />
      <Jar x={150} bottom={150} w={60} h={82} level={0.8} seed={8420} lit />
      <PriceTag x={62} y={182} w={84} h={40} size={17} seed={8430}>
        $4.99
      </PriceTag>
      <PriceTag x={154} y={182} w={84} h={40} size={17} seed={8434}>
        $5.00
      </PriceTag>
      <SketchText x={62} y={218} anchor="middle" size={11}>
        10 OZ
      </SketchText>
      <SketchText x={154} y={218} anchor="middle" size={11}>
        11 OZ
      </SketchText>
      <Notepad x={300} y={40} w={150} h={124} seed={8440}>
        <SketchText x={240} y={84} size={14} serif>
          $4.99 ÷ 10
        </SketchText>
        <SketchText x={240} y={104} size={14} serif>
          = 49.9¢
        </SketchText>
        <SketchText x={240} y={132} size={14} serif>
          $5.00 ÷ 11
        </SketchText>
        <SketchText x={240} y={152} size={14} serif>
          = 45.5¢
        </SketchText>
        <Tick2 x={346} y={146} s={1} seed={8460} />
      </Notepad>
      <Pencil x={262} y={204} len={110} deg={-12} seed={8470} />
    </SketchFrame>
  );
}

/* ==========================================================================
   Heuristics: Mental Shortcuts
   ========================================================================== */

/** A warning triangle centred on (x, y), `r` to its corners. */
function Warning({ x, y, r = 16, seed }: { x: number; y: number; r?: number; seed: number }) {
  const tri = sharp(rp([[x, y - r], [x + r * 0.95, y + r * 0.62], [x - r * 0.95, y + r * 0.62]]), true, 1.5);
  return (
    <g>
      <Wash pts={tri} seed={seed} fill={SK.ochre} opacity={0.85} dx={0.6} dy={0.5} />
      <InkLine pts={tri} seed={seed + 1} width={1.2} closed />
      <InkLine pts={rp([[x, y - r * 0.4], [x, y + r * 0.12]])} seed={seed + 2} width={1.6} amp={0.1} />
      <InkLine pts={rp([[x, y + r * 0.32], [x, y + r * 0.36]])} seed={seed + 3} width={2} amp={0.05} />
    </g>
  );
}

/**
 * Availability: a newspaper with a RECALL headline about one car, and the
 * shopper who read it standing back from the same car at the dealer, a
 * warning sign filling her thoughts.
 */
export function RecallPaper() {
  const sheet = sharp(rp([[20, 40], [168, 34], [172, 176], [24, 182]]), true, 1.5);
  return (
    <SketchFrame
      id="sk-recall-paper"
      width={400}
      height={230}
      label="A newspaper with the headline RECALL above a picture of a car with an ochre brand badge. Beside it, a shopper stands back from the same car at the dealer, one hand raised, with a warning sign in her thought cloud."
    >
      <Backwash cx={204} cy={120} rx={192} ry={104} seed={8501} />
      <Ground x0={196} x1={392} y={212} seed={8502} />
      <Paper pts={sheet} seed={8503} />
      <InkLine pts={sheet} seed={8504} closed />
      <SketchText x={96} y={72} anchor="middle" size={24} serif>
        RECALL
      </SketchText>
      <InkLine pts={rp([[36, 84], [156, 81]])} seed={8505} width={0.8} />
      <Car3 x={96} y={146} s={0.82} seed={8510} />
      <BrandBadge x={96} y={124} r={6} seed={8520} />
      {[156, 164].map((y, i) => (
        <InkLine key={i} pts={rp([[40, y + 6], [150, y + 4]])} seed={8525 + i} width={0.7} />
      ))}
      <Car3 x={334} y={212} s={0.92} seed={8530} />
      <BrandBadge x={334} y={186} r={6.5} seed={8540} />
      <Person x={236} y={212} h={160} look={SHOPPER} arms={["hip", "shrug"]} seed={8550} />
      <Thought x={300} y={58} rx={40} ry={28} tx={244} ty={44} seed={8560} />
      <Warning x={300} y={60} r={17} seed={8570} />
    </SketchFrame>
  );
}

/** A cereal-style box standing on (x, bottom) in the leader's livery: a band and a bowl. */
function LiveryBox({ x, bottom, w = 86, h = 124, seed, badge = false }: { x: number; bottom: number; w?: number; h?: number; seed: number; badge?: boolean }) {
  const box = sharp(rp([[x - w / 2, bottom - h], [x + w / 2, bottom - h], [x + w / 2, bottom], [x - w / 2, bottom]]), true, 2);
  const band = rp([[x - w / 2, bottom - h + 16], [x + w / 2, bottom - h + 16], [x + w / 2, bottom - h + 44], [x - w / 2, bottom - h + 44]]);
  const bowl = rp(curvePtsLocal([x - 24, bottom - 46], [x, bottom - 14], [x + 24, bottom - 46]));
  return (
    <g>
      <Wash pts={box} seed={seed} fill={SK.camel} opacity={0.55} dx={1} dy={0.8} />
      <Wash pts={band} seed={seed + 1} fill={SK.ochre} opacity={0.8} dx={0.6} dy={0.4} />
      <InkLine pts={box} seed={seed + 2} closed />
      <InkLine pts={rp([[x - w / 2, bottom - h + 44], [x + w / 2, bottom - h + 44]])} seed={seed + 3} width={0.9} />
      <InkLine pts={[...bowl, bowl[0]]} seed={seed + 4} width={1} />
      {[-12, 0, 12].map((dx, i) => (
        <InkLine key={i} pts={rp(blobPts(x + dx, bottom - 50 - (i % 2) * 4, 5, 4, seed + 10 + i, 8, 0.1))} seed={seed + 20 + i} width={0.9} closed />
      ))}
      {badge ? <BrandBadge x={x} y={r2(bottom - h + 30)} r={9} seed={seed + 30} /> : <InkLine pts={rp([[x - 18, bottom - h + 30], [x + 18, bottom - h + 30]])} seed={seed + 30} width={1.1} />}
    </g>
  );
}

/** Points along a quadratic curve (local copy for small shapes). */
function curvePtsLocal(p0: Pt, c: Pt, p1: Pt, n = 10): Pt[] {
  return Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n;
    const u = 1 - t;
    return [u * u * p0[0] + 2 * u * t * c[0] + t * t * p1[0], u * u * p0[1] + 2 * u * t * c[1] + t * t * p1[1]] as Pt;
  });
}

/**
 * Representativeness: the market leader's box and a store brand in packaging
 * like it stand side by side; both carry the same five stars of quality.
 */
export function LookAlike() {
  return (
    <SketchFrame
      id="sk-look-alike"
      width={400}
      height={230}
      label="Two cereal boxes in the same colours, band and bowl picture, labelled MARKET LEADER and STORE BRAND. The same five quality stars sit above each, as if the look-alike store brand shared the leader's quality."
    >
      <Backwash cx={200} cy={118} rx={186} ry={104} seed={8601} />
      <Ground x0={40} x1={360} y={186} seed={8602} />
      <LiveryBox x={124} bottom={186} seed={8610} badge />
      <LiveryBox x={276} bottom={186} seed={8640} />
      <Stars x={76} y={36} n={5} r={8.5} gap={24} seed={8670} />
      <Stars x={228} y={36} n={5} r={8.5} gap={24} seed={8690} />
      <SketchText x={124} y={214} anchor="middle" size={11}>
        MARKET LEADER
      </SketchText>
      <SketchText x={276} y={214} anchor="middle" size={11}>
        STORE BRAND
      </SketchText>
    </SketchFrame>
  );
}

/** A wine bottle standing on (x, bottom), `h` tall, with a paper label. */
function WineBottle({ x, bottom, h = 150, seed, lit = false }: { x: number; bottom: number; h?: number; seed: number; lit?: boolean }) {
  const k = h / 150;
  const half: Pt[] = [[19, 0], [19, -88], [16, -100], [8, -112], [6, -120], [6, -146], [7, -150]];
  const outline = rp([...half.map(([px, py]) => [x + px * k, bottom + py * k] as Pt), ...[...half].reverse().map(([px, py]) => [x - px * k, bottom + py * k] as Pt)]);
  const label = sharp(rp([[x - 16 * k, bottom - 74 * k], [x + 16 * k, bottom - 74 * k], [x + 16 * k, bottom - 30 * k], [x - 16 * k, bottom - 30 * k]]), true, 1);
  const foil = rp([[x - 6.5 * k, bottom - 150 * k], [x + 6.5 * k, bottom - 150 * k], [x + 6.5 * k, bottom - 130 * k], [x - 6.5 * k, bottom - 130 * k]]);
  return (
    <g>
      <Wash pts={outline} seed={seed} fill={lit ? SK.teal : SK.charcoal} opacity={lit ? 0.6 : 0.5} dx={1} dy={0.6} />
      <Wash pts={foil} seed={seed + 1} fill={SK.leather} opacity={0.75} dx={0.3} dy={0.2} />
      <InkLine pts={outline} seed={seed + 2} closed />
      <Paper pts={label} seed={seed + 3} />
      <InkLine pts={label} seed={seed + 4} width={0.9} closed />
      <InkLine pts={rp([[x - 9 * k, bottom - 56 * k], [x + 9 * k, bottom - 56 * k]])} seed={seed + 5} width={0.8} />
      <InkLine pts={rp([[x - 6 * k, bottom - 46 * k], [x + 6 * k, bottom - 46 * k]])} seed={seed + 6} width={0.7} />
    </g>
  );
}

/**
 * Price-quality inference: two wine bottles that look alike, $9 and $40.
 * Unable to taste them in the shop, the shopper reads the price: the $40
 * bottle gets five stars of expected quality and is the one chosen.
 */
export function WinePrice() {
  return (
    <SketchFrame
      id="sk-wine-price"
      width={400}
      height={230}
      label="Two wine bottles that look alike, priced $9 and $40. Above the $9 bottle, two of five quality stars; above the $40 bottle, five of five. The $40 bottle is lit teal as the one chosen: the higher price is read as higher quality."
    >
      <Backwash cx={200} cy={118} rx={186} ry={104} seed={8701} />
      <Ground x0={40} x1={360} y={196} seed={8702} />
      <WineBottle x={130} bottom={196} h={140} seed={8710} />
      <WineBottle x={270} bottom={196} h={140} seed={8720} lit />
      <PriceTag x={62} y={150} w={70} h={36} size={17} seed={8730}>
        $9
      </PriceTag>
      <PriceTag x={338} y={150} w={70} h={36} size={17} seed={8734}>
        $40
      </PriceTag>
      <InkLine pts={rp([[97, 150], [111, 152]])} seed={8738} width={0.8} />
      <InkLine pts={rp([[303, 150], [289, 152]])} seed={8739} width={0.8} />
      <Stars x={82} y={30} n={2} r={8} gap={24} seed={8740} />
      <Stars x={222} y={30} n={5} r={8} gap={24} seed={8760} />
    </SketchFrame>
  );
}

/* ==========================================================================
   Anchoring: The First Number Counts
   ========================================================================== */

/**
 * A cordless keyboard seen from the front and a little above, its front edge
 * centred on (x, y), `w` wide.
 */
function Keyboard({ x, y, w = 220, seed }: { x: number; y: number; w?: number; seed: number }) {
  const d = w * 0.34;
  const top = sharp(rp([[x - w / 2 + 14, y - d], [x + w / 2 - 14, y - d], [x + w / 2, y], [x - w / 2, y]]), true, 2);
  const lip = sharp(rp([[x - w / 2, y], [x + w / 2, y], [x + w / 2, y + 8], [x - w / 2, y + 8]]), true, 1.5);
  const rows = 4;
  return (
    <g>
      <Wash pts={top} seed={seed} fill={SK.stone} opacity={0.9} dx={1} dy={0.8} />
      <Wash pts={lip} seed={seed + 1} fill={SK.charcoal} opacity={0.55} dx={0.4} dy={0.3} />
      <InkLine pts={top} seed={seed + 2} closed />
      <InkLine pts={lip} seed={seed + 3} width={1} closed />
      {Array.from({ length: rows }, (_, r) => {
        const t = (r + 0.7) / (rows + 0.4);
        const yy = y - d + d * t;
        const inset = 14 * (1 - t) + 10;
        const x0 = x - w / 2 + inset;
        const x1 = x + w / 2 - inset;
        const n = r === rows - 1 ? 3 : 11;
        const keyW = r === rows - 1 ? (x1 - x0) / 3 : (x1 - x0) / n;
        return Array.from({ length: n }, (_, k) => {
          const kx0 = x0 + k * keyW + 1.5;
          const kx1 = x0 + (k + 1) * keyW - 1.5;
          const wide = r === rows - 1 && k === 1;
          const key = sharp(rp([[kx0, yy - 5.5], [kx1, yy - 5.5], [kx1, yy + 3.5], [kx0, yy + 3.5]]), true, 1);
          return <InkLine key={`${r}-${k}`} pts={key} seed={seed + 10 + r * 20 + k} width={wide ? 0.8 : 0.7} amp={0.25} closed />;
        });
      })}
    </g>
  );
}

/**
 * Ariely, Loewenstein & Prelec (2003), Table I: mean stated willingness to pay
 * for a cordless keyboard, by quintile of the class's social security digits.
 */
const KEYBOARD_WTP = [16.09, 26.82, 29.27, 34.55, 55.64];

const AX0 = 360;
const AX1 = 770;
const AXY = 252;
const digitX = (n: number) => r2(AX0 + ((AX1 - AX0) * (n + 0.5)) / 100);
const xDigit = (x: number) => Math.max(0, Math.min(99, Math.floor(((x - AX0) / (AX1 - AX0)) * 100)));
const two = (n: number) => String(n).padStart(2, "0");

/**
 * The anchoring instrument. Drag the card with the last two digits of a
 * social security number along the line from 00 to 99: the bar for that
 * fifth of the class lights, and the keyboard's price tag shows what those
 * students were willing to pay for it, from $16.09 to $55.64. Real data.
 */
export function AnchorDigits() {
  const [digits, setDigits] = React.useState(14);
  const svgRef = React.useRef<SVGSVGElement | null>(null);
  const dragging = React.useRef(false);
  const q = Math.min(4, Math.floor(digits / 20));
  const wtp = KEYBOARD_WTP[q];
  const toLocal = (e: React.PointerEvent) => {
    const svg = (e.currentTarget as SVGElement).ownerSVGElement ?? (e.currentTarget as SVGSVGElement);
    svgRef.current = svg as SVGSVGElement;
    const m = svgRef.current.getScreenCTM();
    if (!m) return null;
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse());
    return p.x;
  };
  const move = (e: React.PointerEvent) => {
    const x = toLocal(e);
    if (x !== null) setDigits(xDigit(x));
  };
  const cardX = digitX(digits);
  const card = sharp(rp([[cardX - 26, AXY + 12], [cardX + 26, AXY + 12], [cardX + 26, AXY + 50], [cardX - 26, AXY + 50]]), true, 2);
  const label = `A cordless keyboard with a price tag, beside five bars over a line of numbers from 00 to 99: what students were willing to pay for the keyboard, by the last two digits of their social security number. Lowest fifth $16.09, then $26.82, $29.27, $34.55, and highest fifth $55.64. The digits are now ${two(digits)}, so the price tag reads $${wtp.toFixed(2)}.`;
  return (
    <>
      <SketchFrame id="sk-anchor-digits" width={800} height={322} label={label}>
        <Backwash cx={400} cy={160} rx={394} ry={150} seed={8801} />
        {/* the keyboard and what it is worth to this fifth of the class */}
        <Keyboard x={176} y={250} w={260} seed={8810} />
                <PriceTag x={176} y={96} w={156} h={60} size={30} seed={8892}>
          {`$${wtp.toFixed(2)}`}
        </PriceTag>
        {/* the bars: one per fifth of the digits */}
        {KEYBOARD_WTP.map((v, i) => {
          const x0 = AX0 + ((AX1 - AX0) * i) / 5 + 12;
          const x1 = AX0 + ((AX1 - AX0) * (i + 1)) / 5 - 12;
          const top = AXY - (v / 60) * 196;
          const bar = sharp(rp([[x0, top], [x1, top], [x1, AXY], [x0, AXY]]), true, 1.5);
          const on = i === q;
          return (
            <g key={i}>
              <Wash pts={bar} seed={8900 + i} fill={on ? SK.teal : SK.camel} opacity={on ? 0.7 : 0.4} dx={0.8} dy={0.6} />
              <InkLine pts={bar} seed={8910 + i} width={on ? 1.3 : 1} closed />
              <SketchText x={r2((x0 + x1) / 2)} y={r2(top - 9)} anchor="middle" size={on ? 17 : 14} serif>
                {`$${v.toFixed(2)}`}
              </SketchText>
            </g>
          );
        })}
        {/* the number line */}
        <InkLine pts={rp([[AX0 - 6, AXY], [AX1 + 6, AXY]])} seed={8920} width={1.3} />
        {[0, 20, 40, 60, 80, 100].map((n, i) => {
          const x = r2(AX0 + ((AX1 - AX0) * n) / 100);
          return <InkLine key={i} pts={rp([[x, AXY - 4], [x, AXY + 4]])} seed={8930 + i} width={1} amp={0.1} />;
        })}
        <SketchText x={AX0} y={AXY + 66} anchor="middle" size={11}>
          00
        </SketchText>
        <SketchText x={AX1} y={AXY + 66} anchor="middle" size={11}>
          99
        </SketchText>
        <SketchText x={r2((AX0 + AX1) / 2)} y={AXY + 66} anchor="middle" size={11}>
          LAST TWO DIGITS OF A SOCIAL SECURITY NUMBER
        </SketchText>
        {/* the draggable card with the digits */}
        <g
          role="slider"
          tabIndex={0}
          aria-label="Last two digits of a social security number"
          aria-valuemin={0}
          aria-valuemax={99}
          aria-valuenow={digits}
          style={{ cursor: "ew-resize", outline: "none", touchAction: "none" }}
          onPointerDown={(e) => {
            dragging.current = true;
            (e.currentTarget as Element).setPointerCapture(e.pointerId);
            move(e);
          }}
          onPointerMove={(e) => {
            if (dragging.current) move(e);
          }}
          onPointerUp={() => {
            dragging.current = false;
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowUp") {
              e.preventDefault();
              setDigits((d) => Math.min(99, d + (e.shiftKey ? 10 : 1)));
            } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
              e.preventDefault();
              setDigits((d) => Math.max(0, d - (e.shiftKey ? 10 : 1)));
            }
          }}
        >
          <rect x={AX0 - 10} y={AXY - 14} width={AX1 - AX0 + 20} height={70} fill="transparent" />
          <InkLine pts={rp([[cardX, AXY - 6], [cardX, AXY + 12]])} seed={8940} width={1.3} amp={0.1} />
          <Paper pts={card} seed={8941} />
          <InkLine pts={card} seed={8942} width={1.3} closed />
          <SketchText x={cardX} y={AXY + 40} anchor="middle" size={24} serif>
            {two(digits)}
          </SketchText>
        </g>
      </SketchFrame>
      <div className="mt-2 flex flex-wrap items-center gap-2 px-1" aria-live="polite">
        <PlateButton onClick={() => setDigits(14)}>Low digits</PlateButton>
        <PlateButton onClick={() => setDigits(87)}>High digits</PlateButton>
      </div>
    </>
  );
}

/** A tall swing tag centred on (x, y): a hole at the top and lines of text. */
function SwingTag({ x, y, w = 128, h = 150, seed, lit = false, children }: { x: number; y: number; w?: number; h?: number; seed: number; lit?: boolean; children?: React.ReactNode }) {
  const l = x - w / 2;
  const r = x + w / 2;
  const t = y - h / 2;
  const b = y + h / 2;
  const pts = sharp(rp([[l, t + 18], [x - 16, t], [x + 16, t], [r, t + 18], [r, b], [l, b]]), true, 2);
  const hole = rp(blobPts(x, t + 14, 4.5, 4.5, seed + 2, 8, 0.05));
  return (
    <g>
      <Paper pts={pts} seed={seed} />
      {lit ? <Wash pts={pts} seed={seed + 4} fill={SK.teal} opacity={0.3} dx={1.5} dy={1.2} /> : null}
      <InkLine pts={pts} seed={seed + 1} closed />
      <InkLine pts={hole} seed={seed + 3} width={0.9} closed />
      <InkLine pts={rp(curvePtsLocal([x, t + 10], [x - 18, t - 22], [x + 6, t - 34], 8))} seed={seed + 5} width={0.9} />
      {children}
    </g>
  );
}

/**
 * The same $79 price twice: alone on one tag, and under a "compare at $120"
 * reference on the other, where it reads as the better deal (teal).
 */
export function CompareAt() {
  return (
    <SketchFrame
      id="sk-compare-at"
      width={400}
      height={230}
      label="Two swing tags with the same price, $79. The first shows only $79. The second shows COMPARE AT $120 above the $79, which makes the same price look lower; it is lit teal."
    >
      <Backwash cx={200} cy={124} rx={186} ry={102} seed={9001} />
      <SwingTag x={110} y={136} seed={9010}>
        <SketchText x={110} y={168} anchor="middle" size={36} serif>
          $79
        </SketchText>
      </SwingTag>
      <SwingTag x={290} y={136} seed={9020} lit>
        <SketchText x={290} y={122} anchor="middle" size={10}>
          COMPARE AT
        </SketchText>
        <SketchText x={290} y={142} anchor="middle" size={17} serif>
          $120
        </SketchText>
        <InkLine pts={rp([[252, 154], [328, 154]])} seed={9030} width={0.8} />
        <SketchText x={290} y={192} anchor="middle" size={36} serif>
          $79
        </SketchText>
      </SwingTag>
    </SketchFrame>
  );
}

/**
 * Three anchors marketers set, one per scene: a shelf label with a higher
 * regular price above the price paid; a LIMIT 12 PER CUSTOMER sign over a
 * stack of soup cans; and a menu whose first, highest-priced dish sets the
 * scale for the rest.
 */
export function MarketerAnchors() {
  const shelfTag = sharp(rp([[42, 82], [222, 82], [222, 172], [42, 172]]), true, 2);
  const sign = sharp(rp([[318, 20], [482, 20], [482, 70], [318, 70]]), true, 2);
  const menu = sharp(rp([[596, 22], [762, 22], [762, 206], [596, 206]]), true, 2);
  const cans: [number, number][] = [];
  [0, 1, 2].forEach((row) => {
    const n = 4 - row;
    for (let i = 0; i < n; i++) cans.push([r2(400 - ((n - 1) * 28) / 2 + i * 28), 200 - row * 40]);
  });
  const dishes = [
    { y: 74, price: "$95", big: true },
    { y: 120, price: "$32" },
    { y: 150, price: "$28" },
    { y: 180, price: "$24" },
  ];
  return (
    <SketchFrame
      id="sk-marketer-anchors"
      width={800}
      height={222}
      label="Three scenes. A shelf label shows REG. $6.49 above a larger price of $4.99. A sign reading LIMIT 12 PER CUSTOMER hangs over a pyramid of soup cans. A restaurant menu lists a $95 dish first, then dishes at $32, $28 and $24."
    >
      <Backwash cx={400} cy={114} rx={394} ry={104} seed={9101} />
      {/* reference price */}
      <Paper pts={shelfTag} seed={9110} />
      <InkLine pts={shelfTag} seed={9111} closed />
      <SketchText x={132} y={110} anchor="middle" size={12}>
        REG. $6.49
      </SketchText>
      <SketchText x={132} y={156} anchor="middle" size={38} serif>
        $4.99
      </SketchText>
      {/* suggested quantity */}
      <InkLine pts={rp([[342, 4], [342, 20]])} seed={9120} width={0.8} />
      <InkLine pts={rp([[458, 4], [458, 20]])} seed={9121} width={0.8} />
      <Paper pts={sign} seed={9122} />
      <Wash pts={sign} seed={9123} fill={SK.ochre} opacity={0.55} dx={1.2} dy={1} />
      <InkLine pts={sign} seed={9124} closed />
      <SketchText x={400} y={43} anchor="middle" size={14} serif>
        LIMIT 12
      </SketchText>
      <SketchText x={400} y={61} anchor="middle" size={10}>
        PER CUSTOMER
      </SketchText>
      {cans.map(([x, b], i) => (
        <Can3 key={i} x={x} bottom={b} h={38} seed={9130 + i * 3} />
      ))}
      <InkLine pts={rp([[330, 201], [470, 201]])} seed={9160} width={1} />
      {/* menu */}
      <Paper pts={menu} seed={9170} />
      <InkLine pts={menu} seed={9171} closed />
      <InkLine pts={rp([[650, 44], [708, 44]])} seed={9172} width={1.1} />
      {dishes.map((d, i) => (
        <g key={i}>
          <InkLine pts={rp([[612, d.y - 5], [d.big ? 690 : 680, d.y - 5]])} seed={9180 + i} width={d.big ? 1.4 : 0.8} />
          {d.big ? <InkLine pts={rp([[612, d.y + 7], [664, d.y + 7]])} seed={9190 + i} width={0.7} /> : null}
          <SketchText x={748} y={d.y} anchor="end" size={d.big ? 20 : 14} serif>
            {d.price}
          </SketchText>
        </g>
      ))}
      <InkLine pts={rp([[612, 98], [746, 98]])} seed={9196} width={0.6} />
    </SketchFrame>
  );
}

/* ==========================================================================
   Loss Aversion and the Endowment Effect
   ========================================================================== */

/** A banknote lying flat, centred on (x, y): ink and a camel wash, or pencil when it is lost. */
function Bill({ x, y, w = 76, h = 15, value, seed, lost = false }: { x: number; y: number; w?: number; h?: number; value: string; seed: number; lost?: boolean }) {
  const pts = sharp(rp([[x - w / 2, y - h / 2], [x + w / 2, y - h / 2], [x + w / 2, y + h / 2], [x - w / 2, y + h / 2]]), true, 1.5);
  const oval = rp(blobPts(r2(x + w * 0.22), y, 8, h * 0.28, seed + 3, 10, 0.05));
  return lost ? (
    <g>
      <PencilLine pts={pts} seed={seed} closed />
      <PencilLine pts={oval} seed={seed + 1} closed dash="2 3" />
      <SketchText x={r2(x - w / 2 + 5)} y={r2(y + 4)} size={9} fill={SK.pencil}>
        {value}
      </SketchText>
    </g>
  ) : (
    <g>
      <Paper pts={pts} seed={seed} />
      <Wash pts={pts} seed={seed + 1} fill={SK.camel} opacity={0.45} dx={0.8} dy={0.6} />
      <InkLine pts={pts} seed={seed + 2} width={1} closed />
      <InkLine pts={oval} seed={seed + 4} width={0.7} closed />
      <SketchText x={r2(x - w / 2 + 5)} y={r2(y + 4)} size={9}>
        {value}
      </SketchText>
    </g>
  );
}

const LOST = 20;
/** About twice: the found amount that balances the loss. */
const BALANCE_AT = 40;

/**
 * Loss aversion as a balance. On the left pan lies a lost $20 (in pencil: the
 * money is gone); on the right, the money found. With $20 found the beam
 * still tips toward the loss. Add $10 at a time: it levels only at about
 * twice the loss, $40.
 */
export function LossBalance() {
  const [found, setFound] = React.useState(20);
  const px = 200;
  const py = 70;
  const L = 128;
  const deg = Math.max(-14, Math.min(14, ((BALANCE_AT - found) / 20) * 11));
  const a = (deg * Math.PI) / 180;
  const left: Pt = [r2(px - L * Math.cos(a)), r2(py + L * Math.sin(a))];
  const right: Pt = [r2(px + L * Math.cos(a)), r2(py - L * Math.sin(a))];
  const drop = 66;
  const level = found === BALANCE_AT;
  const pan = (c: Pt, seed: number) => {
    const y = c[1] + drop;
    const dish = rp(curvePtsLocal([c[0] - 50, y], [c[0], y + 26], [c[0] + 50, y], 10));
    return (
      <g>
        <InkLine pts={rp([[c[0], c[1] + 4], [c[0] - 46, y]])} seed={seed} width={0.8} />
        <InkLine pts={rp([[c[0], c[1] + 4], [c[0] + 46, y]])} seed={seed + 1} width={0.8} />
        <InkLine pts={[...dish, dish[0]]} seed={seed + 3} width={1.2} />
      </g>
    );
  };
  const bills = found / 10;
  const label = `A balance scale. On the left pan lies a lost $20 bill, drawn in pencil because it is gone; on the right pan, $${found} found in $10 bills. ${
    level ? "The beam is level: finding about twice the amount, $40, makes up for losing $20." : found < BALANCE_AT ? "The beam tips toward the loss: the lost $20 still weighs more." : "The beam tips toward the money found."
  }`;
  return (
    <>
      <SketchFrame id="sk-loss-balance" width={400} height={270} label={label}>
        <Backwash cx={200} cy={146} rx={192} ry={118} seed={9201} />
        <Ground x0={140} x1={260} y={250} seed={9202} />
        {/* stand */}
        <InkLine pts={rp([[px, py + 6], [px, 248]])} seed={9203} width={1.6} />
        <InkLine pts={rp([[px - 34, 248], [px + 34, 248]])} seed={9204} width={1.6} />
        <Wash pts={rp(blobPts(px, py, 7, 7, 9205, 10, 0.05))} seed={9207} fill={SK.leather} opacity={0.8} dx={0.3} dy={0.3} />
        <InkLine pts={rp(blobPts(px, py, 7, 7, 9208, 10, 0.05))} seed={9209} width={1.1} closed />
        {/* beam */}
        <InkLine pts={[left, right]} seed={9206} width={2} amp={0.4} />
        {pan(left, 9210)}
        {pan(right, 9220)}
        <Bill x={left[0]} y={r2(left[1] + drop + 3)} value="$20" seed={9230} lost />
        {Array.from({ length: bills }, (_, i) => (
          <Bill key={i} x={r2(right[0] + (i % 2 ? 2 : -2))} y={r2(right[1] + drop + 3 - i * 10)} value="$10" seed={9240 + i * 6} />
        ))}
        <SketchText x={72} y={262} anchor="middle" size={11}>
          LOST $20
        </SketchText>
        <SketchText x={328} y={262} anchor="middle" size={11}>
          {`FOUND $${found}`}
        </SketchText>
        {level ? (
          <SketchText x={px} y={28} anchor="middle" size={12}>
            ABOUT TWICE
          </SketchText>
        ) : null}
      </SketchFrame>
      <div className="mt-2 flex flex-wrap items-center gap-2 px-1" aria-live="polite">
        <PlateButton onClick={() => setFound((f) => Math.min(60, f + 10))}>Add $10 found</PlateButton>
        <PlateButton onClick={() => setFound((f) => Math.max(10, f - 10))}>Take $10 away</PlateButton>
        <PlateButton onClick={() => setFound(20)}>Start over</PlateButton>
      </div>
    </>
  );
}

/** Over-ear headphones centred on (x, y) at scale s. */
function Headphones({ x, y, s = 1, seed }: { x: number; y: number; s?: number; seed: number }) {
  const band = rp(curvePtsLocal([x - 22 * s, y + 4 * s], [x, y - 40 * s], [x + 22 * s, y + 4 * s], 10));
  const cup = (cx: number, k: number) => sharp(rp([[cx - 7 * s, y - 2 * s], [cx + 7 * s, y - 2 * s], [cx + 7 * s, y + 16 * s], [cx - 7 * s, y + 16 * s]]), true, 3 * s);
  return (
    <g>
      <InkLine pts={band} seed={seed} width={1.6} />
      {[-22, 22].map((dx, i) => (
        <g key={i}>
          <Wash pts={cup(x + dx * s, i)} seed={seed + 1 + i} fill={SK.charcoal} opacity={0.7} dx={0.4} dy={0.3} />
          <InkLine pts={cup(x + dx * s, i)} seed={seed + 3 + i} width={1.1} closed />
        </g>
      ))}
    </g>
  );
}

/**
 * The endowment effect after a free trial: a month on the calendar, every day
 * crossed off, and the shopper wearing the headphones she has used all
 * month, a hand on one ear cup, turned away from the open return box.
 */
export function FreeTrial() {
  const cal = sharp(rp([[22, 40], [170, 40], [170, 176], [22, 176]]), true, 2);
  const cells: Pt[] = [];
  for (let r = 0; r < 5; r++) for (let c = 0; c < 7; c++) if (r * 7 + c < 30) cells.push([r2(36 + c * 20), r2(80 + r * 20)]);
  return (
    <SketchFrame
      id="sk-free-trial"
      width={400}
      height={230}
      label="A calendar page for one month with all thirty days crossed off. Beside it, a shopper wearing the headphones she has used all month holds one ear cup and turns away from an open return box on the floor."
    >
      <Backwash cx={204} cy={120} rx={192} ry={104} seed={9301} />
      <Ground x0={200} x1={392} y={212} seed={9302} />
      <Paper pts={cal} seed={9303} />
      <InkLine pts={cal} seed={9304} closed />
      <Wash pts={rp([[22, 40], [170, 40], [170, 62], [22, 62]])} seed={9305} fill={SK.camel} opacity={0.55} dx={0.6} dy={0.4} />
      <InkLine pts={rp([[22, 62], [170, 62]])} seed={9306} width={0.9} />
      <SketchText x={96} y={56} anchor="middle" size={11}>
        30 DAYS
      </SketchText>
      {cells.map(([cx, cy], i) => (
        <InkLine key={i} pts={rp([[cx - 5, cy - 5], [cx + 5, cy + 5]])} seed={9310 + i} width={0.9} amp={0.2} />
      ))}
      <OpenBox x={354} bottom={212} seed={9350} />
      <Person x={266} y={212} h={168} look={SHOPPER} flip arms={["hip", "chin"]} seed={9370} />
      <Headphones x={266} y={52} s={0.5} seed={9390} />
    </SketchFrame>
  );
}


/** An open cardboard box standing on (x, bottom), its two flaps folded out. */
function OpenBox({ x, bottom, w = 62, h = 44, seed }: { x: number; bottom: number; w?: number; h?: number; seed: number }) {
  const body = sharp(rp([[x - w / 2, bottom - h], [x + w / 2, bottom - h], [x + w / 2, bottom], [x - w / 2, bottom]]), true, 1.5);
  const flapL = rp([[x - w / 2, bottom - h], [x - w / 2 - 16, bottom - h - 18], [x - 6, bottom - h - 14], [x - 2, bottom - h]]);
  const flapR = rp([[x + w / 2, bottom - h], [x + w / 2 + 14, bottom - h - 20], [x + 8, bottom - h - 16], [x + 2, bottom - h]]);
  return (
    <g>
      <Wash pts={flapL} seed={seed} fill={SK.camel} opacity={0.5} dx={0.5} dy={0.4} />
      <Wash pts={flapR} seed={seed + 1} fill={SK.camel} opacity={0.5} dx={0.5} dy={0.4} />
      <InkLine pts={flapL} seed={seed + 2} width={1.1} closed />
      <InkLine pts={flapR} seed={seed + 3} width={1.1} closed />
      <Wash pts={body} seed={seed + 4} fill={SK.camel} opacity={0.65} dx={0.8} dy={0.6} />
      <InkLine pts={body} seed={seed + 5} closed />
      <InkLine pts={rp([[x - 10, bottom - h + 12], [x + 10, bottom - h + 12]])} seed={seed + 6} width={0.8} />
    </g>
  );
}

/* ==========================================================================
   Status Quo Bias and Framing Effects
   ========================================================================== */

/**
 * Status quo bias as paperwork: a fanned stack of a year's monthly bills from
 * the same provider (one badge), the latest paid again (teal tick), and a
 * rival's sealed envelope offering a lower price, set aside unopened.
 */
export function SameProvider() {
  const bills = Array.from({ length: 6 }, (_, i) => i);
  const env = sharp(rp([[262, 92], [384, 84], [390, 164], [268, 172]]), true, 2);
  return (
    <SketchFrame
      id="sk-same-provider"
      width={400}
      height={230}
      label="A fanned stack of monthly bills, all from the same provider with the same ochre badge; the top bill is paid again, with a teal tick. Beside them lies a sealed envelope from a rival provider marked 30% LESS, unopened."
    >
      <Backwash cx={204} cy={120} rx={192} ry={104} seed={9401} />
      {bills.map((i) => {
        const dx = i * 18;
        const dy = i * 6;
        const pts = sharp(rp([[30 + dx, 22 + dy], [150 + dx, 22 + dy], [150 + dx, 150 + dy], [30 + dx, 150 + dy]]), true, 1.5);
        return (
          <g key={i}>
            <Paper pts={pts} seed={9410 + i * 10} />
            <InkLine pts={pts} seed={9411 + i * 10} width={1} closed />
            <BrandBadge x={39 + dx} y={36 + dy} r={6} seed={9412 + i * 10} />
          </g>
        );
      })}
      {[100, 118, 136, 154].map((y, k) => (
        <InkLine key={k} pts={rp([[140, y], [k === 3 ? 196 : 226, y]])} seed={9480 + k} width={0.8} />
      ))}
      <SketchText x={230} y={78} anchor="end" size={11}>
        MONTH 12
      </SketchText>
      <Tick2 x={218} y={160} s={1.3} seed={9490} />
      <Paper pts={env} seed={9500} />
      <InkLine pts={env} seed={9501} closed />
      <InkLine pts={rp([[264, 96], [328, 134], [386, 88]])} seed={9502} width={1} />
      <Wash pts={rp(blobPts(328, 134, 10, 10, 9503, 10, 0.05))} seed={9504} fill={SK.leather} opacity={0.75} dx={0.3} dy={0.3} />
      <InkLine pts={rp(blobPts(328, 134, 10, 10, 9505, 10, 0.05))} seed={9506} width={1} closed />
      <SketchText x={330} y={162} anchor="middle" size={12}>
        30% LESS
      </SketchText>
    </SketchFrame>
  );
}

/** A tray of ground beef under film, seen from above at a slant, centred on (x, y), with a label. */
function BeefTray({ x, y, seed, children, lit = false }: { x: number; y: number; seed: number; children?: React.ReactNode; lit?: boolean }) {
  const tray = sharp(rp([[x - 74, y - 40], [x + 74, y - 40], [x + 82, y + 40], [x - 82, y + 40]]), true, 4);
  const meat = rp(blobPts(x, y + 2, 60, 28, seed + 1, 16, 0.12));
  const label = sharp(rp([[x - 50, y + 12], [x + 54, y + 12], [x + 54, y + 50], [x - 50, y + 50]]), true, 1.5);
  return (
    <g>
      <Wash pts={tray} seed={seed} fill={SK.stone} opacity={0.8} dx={0.8} dy={0.6} />
      <InkLine pts={tray} seed={seed + 2} closed />
      <Wash pts={meat} seed={seed + 3} fill={SK.blush} opacity={0.95} dx={0.6} dy={0.4} />
      <Wash pts={rp(blobPts(x - 4, y - 2, 50, 20, seed + 4, 14, 0.2))} seed={seed + 5} fill={SK.leather} opacity={0.35} dx={0} dy={0} />
      <InkLine pts={meat} seed={seed + 6} width={0.9} closed />
      {[-34, -14, 8, 30].map((dx, i) => (
        <InkLine key={i} pts={rp(curvePtsLocal([x + dx - 8, y - 10 + (i % 2) * 6], [x + dx, y - 16 + (i % 2) * 6], [x + dx + 8, y - 10 + (i % 2) * 6], 4))} seed={seed + 10 + i} width={0.6} />
      ))}
      <Paper pts={label} seed={seed + 20} />
      {lit ? <Wash pts={label} seed={seed + 21} fill={SK.teal} opacity={0.4} dx={1} dy={0.8} /> : null}
      <InkLine pts={label} seed={seed + 22} width={1.1} closed />
      {children}
    </g>
  );
}

/**
 * Framing: two identical trays of ground beef. One label says 75% LEAN, the
 * other 25% FAT. Same facts; the lean frame is the one rated more favourably
 * and lit teal.
 */
export function LeanFat() {
  return (
    <SketchFrame
      id="sk-lean-fat"
      width={400}
      height={180}
      label="Two identical trays of ground beef under film. One label reads 75% LEAN, the other 25% FAT. The 75% LEAN label is lit teal: the same beef is rated more favourably when it is described as lean."
    >
      <Backwash cx={200} cy={92} rx={192} ry={82} seed={9601} />
      <BeefTray x={104} y={78} seed={9610} lit>
        <SketchText x={106} y={118} anchor="middle" size={15} serif>
          75% LEAN
        </SketchText>
      </BeefTray>
      <BeefTray x={296} y={78} seed={9640}>
        <SketchText x={298} y={118} anchor="middle" size={15} serif>
          25% FAT
        </SketchText>
      </BeefTray>
    </SketchFrame>
  );
}

/** A small easel sign standing on (x, bottom), w × h, with lines of text as children. */
function Easel({ x, bottom, w = 140, h = 96, seed, children }: { x: number; bottom: number; w?: number; h?: number; seed: number; children?: React.ReactNode }) {
  const board = sharp(rp([[x - w / 2, bottom - h - 16], [x + w / 2, bottom - h - 16], [x + w / 2, bottom - 16], [x - w / 2, bottom - 16]]), true, 2);
  return (
    <g>
      <InkLine pts={rp([[x - w / 2 + 14, bottom - 20], [x - w / 2 + 6, bottom]])} seed={seed} width={1.1} />
      <InkLine pts={rp([[x + w / 2 - 14, bottom - 20], [x + w / 2 - 6, bottom]])} seed={seed + 1} width={1.1} />
      <Paper pts={board} seed={seed + 2} />
      <InkLine pts={board} seed={seed + 3} closed />
      {children}
    </g>
  );
}

/**
 * The same 30-cent gap, framed two ways at two counters: a surcharge for
 * paying by card (a loss, with a broken heart above it) and a discount for
 * paying in cash.
 */
export function SurchargeDiscount() {
  return (
    <SketchFrame
      id="sk-surcharge-discount"
      width={400}
      height={222}
      label="Two counter signs describing the same price gap. The first: $10.00, CARD +30¢, with a payment card in front and a broken heart above it. The second: $10.30, CASH −30¢, with banknotes in front."
    >
      <Backwash cx={200} cy={114} rx={192} ry={102} seed={9701} />
      <Ground x0={20} x1={380} y={178} seed={9702} />
      <Easel x={104} bottom={178} seed={9710}>
        <SketchText x={104} y={102} anchor="middle" size={26} serif>
          $10.00
        </SketchText>
        <SketchText x={104} y={134} anchor="middle" size={12}>
          CARD +30¢
        </SketchText>
      </Easel>
      <Easel x={296} bottom={178} seed={9720}>
        <SketchText x={296} y={102} anchor="middle" size={26} serif>
          $10.30
        </SketchText>
        <SketchText x={296} y={134} anchor="middle" size={12}>
          CASH −30¢
        </SketchText>
      </Easel>
      <Heart x={104} y={34} s={1.5} seed={9730} broken />
      <PayCard x={104} y={202} w={40} tilt={-6} seed={9740} />
      <Bill x={296} y={203} w={60} h={14} value="$10" seed={9750} />
    </SketchFrame>
  );
}

/* ==========================================================================
   Pricing Cues: Just-Below Prices and Discount Frames
   ========================================================================== */

/**
 * The left-digit effect on a large swing tag: $4.99, read from left to right
 * (the arrow over the digits), with the extra weight on the leftmost digit,
 * the 4, marked by an ochre wash.
 */
export function LeftDigit() {
  return (
    <SketchFrame
      id="sk-left-digit"
      width={320}
      height={300}
      label="A large swing tag reading $4.99. An arrow over the digits runs from left to right, the way the price is read, and an ochre wash marks the leftmost digit, the 4, which gets the extra weight."
    >
      <Backwash cx={160} cy={160} rx={150} ry={132} seed={9801} />
      <SwingTag x={160} y={176} w={236} h={196} seed={9810}>
        <Wash pts={rp(blobPts(128, 200, 26, 38, 9820, 12, 0.1))} seed={9821} fill={SK.ochre} opacity={0.6} dx={0} dy={0} />
        <SketchText x={160} y={226} anchor="middle" size={78} serif>
          $4.99
        </SketchText>
        <SketchArrow pts={rp([[72, 134], [160, 128], [250, 134]])} seed={9830} width={1.3} head={9} />
      </SwingTag>
    </SketchFrame>
  );
}

/**
 * Promotional framing and transaction utility: a bought bag (teal: the
 * product) with its swing tag, $25 struck through, an ochre 20% OFF sticker
 * and $20; above the tag, a heart for the good-deal feeling that comes on top
 * of the product.
 */
export function DealTag() {
  const sticker = rp(blobPts(306, 84, 34, 34, 9910, 14, 0.06));
  return (
    <SketchFrame
      id="sk-deal-tag"
      width={400}
      height={230}
      label="A shopping bag, lit teal as the product bought, with a swing tag hanging from its handle: $25 struck through, an ochre 20% OFF sticker and $20. A heart floats above the tag: the feeling of a good deal on top of the product."
    >
      <Backwash cx={200} cy={120} rx={186} ry={104} seed={9901} />
      <Ground x0={40} x1={330} y={216} seed={9902} />
      <Bag x={120} y={56} w={116} seed={9905} fill={SK.teal} badge />
      <SwingTag x={250} y={150} w={120} h={126} seed={9920}>
        <SketchText x={250} y={150} anchor="middle" size={18} serif>
          $25
        </SketchText>
        <InkLine pts={rp([[226, 144], [274, 143]])} seed={9930} width={1.3} />
        <SketchText x={250} y={194} anchor="middle" size={30} serif>
          $20
        </SketchText>
      </SwingTag>
      <Wash pts={sticker} seed={9911} fill={SK.ochre} opacity={0.9} dx={0.6} dy={0.5} />
      <InkLine pts={sticker} seed={9912} width={1.1} closed />
      <SketchText x={306} y={81} anchor="middle" size={13} serif>
        20%
      </SketchText>
      <SketchText x={306} y={96} anchor="middle" size={10}>
        OFF
      </SketchText>
      <Heart x={354} y={36} s={1.4} seed={9940} />
    </SketchFrame>
  );
}

/* ==========================================================================
   Choice Architecture, Defaults, and Nudges
   ========================================================================== */

/** Johnson & Goldstein (2003), effective consent rates for organ donation (%). */
const OPT_IN = [
  { c: "DENMARK", v: 4.25, t: "4.25%" },
  { c: "NETHERLANDS", v: 27.5, t: "27.5%" },
  { c: "UK", v: 17.17, t: "17.17%" },
  { c: "GERMANY", v: 12, t: "12%" },
];
const OPT_OUT = [
  { c: "AUSTRIA", v: 99.98, t: "99.98%" },
  { c: "BELGIUM", v: 98, t: "98%" },
  { c: "FRANCE", v: 99.91, t: "99.91%" },
  { c: "HUNGARY", v: 99.997, t: "99.997%" },
  { c: "POLAND", v: 99.5, t: "99.5%" },
  { c: "PORTUGAL", v: 99.64, t: "99.64%" },
  { c: "SWEDEN", v: 85.9, t: "85.9%" },
];

/** A licence form with one checkbox, centred on (x, y); `ticked` pre-ticks it (teal). */
function DonorForm({ x, y, ticked, seed }: { x: number; y: number; ticked: boolean; seed: number }) {
  const card = sharp(rp([[x - 60, y - 22], [x + 60, y - 22], [x + 60, y + 22], [x - 60, y + 22]]), true, 2);
  const box = sharp(rp([[x - 48, y - 8], [x - 32, y - 8], [x - 32, y + 8], [x - 48, y + 8]]), true, 1);
  return (
    <g>
      <Paper pts={card} seed={seed} />
      <InkLine pts={card} seed={seed + 1} closed />
      <InkLine pts={box} seed={seed + 2} width={1.1} closed />
      {ticked ? <Tick2 x={-40 + x} y={y - 1} s={0.9} seed={seed + 3} /> : null}
      <InkLine pts={rp([[x - 22, y - 5], [x + 46, y - 5]])} seed={seed + 4} width={0.8} />
      <InkLine pts={rp([[x - 22, y + 6], [x + 30, y + 6]])} seed={seed + 5} width={0.8} />
    </g>
  );
}

/**
 * Defaults and organ donation (Johnson & Goldstein, 2003): the share of people
 * who are effectively donors in four countries where people must opt in (an
 * empty box on the form) and seven where donation is the default (a pre-ticked
 * box). Real data.
 */
export function OrganDefaults() {
  const base = 284;
  const scale = 1.6;
  const slot = 60;
  const bar = (x: number, d: { c: string; v: number; t: string }, i: number, seed: number) => {
    const top = r2(base - d.v * scale);
    const pts = sharp(rp([[x - 20, top], [x + 20, top], [x + 20, base], [x - 20, base]]), true, 1.5);
    return (
      <g key={d.c}>
        <Wash pts={pts} seed={seed + i * 4} fill={SK.camel} opacity={0.5} dx={0.6} dy={0.5} />
        <InkLine pts={pts} seed={seed + i * 4 + 1} width={1} closed />
        <SketchText x={x} y={r2(top - 7)} anchor="middle" size={12} serif>
          {d.t}
        </SketchText>
        <g transform={`rotate(-32 ${x + 6} ${base + 14})`}>
          <SketchText x={x + 6} y={base + 14} anchor="end" size={9}>
            {d.c}
          </SketchText>
        </g>
      </g>
    );
  };
  const inX = (i: number) => 74 + i * slot;
  const outX = (i: number) => 384 + i * slot;
  return (
    <SketchFrame
      id="sk-organ-defaults"
      width={800}
      height={358}
      label="Bars showing the share of people who are registered organ donors. Where people must opt in, shown by a form with an empty box: Denmark 4.25%, the Netherlands 27.5%, the UK 17.17% and Germany 12%. Where donation is the default, shown by a form with a pre-ticked box: Austria 99.98%, Belgium 98%, France 99.91%, Hungary 99.997%, Poland 99.5%, Portugal 99.64% and Sweden 85.9%."
    >
      <Backwash cx={400} cy={170} rx={394} ry={160} seed={10101} />
      <DonorForm x={164} y={34} ticked={false} seed={10110} />
      <DonorForm x={564} y={34} ticked seed={10120} />
      <SketchText x={164} y={80} anchor="middle" size={11}>
        MUST OPT IN
      </SketchText>
      <SketchText x={564} y={80} anchor="middle" size={11}>
        DONOR BY DEFAULT
      </SketchText>
      <InkLine pts={rp([[40, base], [290, base]])} seed={10130} width={1.2} />
      <InkLine pts={rp([[350, base], [780, base]])} seed={10131} width={1.2} />
      {OPT_IN.map((d, i) => bar(inX(i), d, i, 10140))}
      {OPT_OUT.map((d, i) => bar(outX(i), d, i, 10180))}
    </SketchFrame>
  );
}

/** An apple centred on (x, y), radius r; `lit` washes it teal (the one taken). */
function Apple({ x, y, r = 11, seed, lit = false }: { x: number; y: number; r?: number; seed: number; lit?: boolean }) {
  const body = rp(blobPts(x, y, r, r * 0.92, seed, 12, 0.08));
  return (
    <g>
      <Wash pts={body} seed={seed + 1} fill={lit ? SK.teal : SK.camel} opacity={lit ? 0.8 : 0.7} dx={0.6} dy={0.5} />
      <InkLine pts={body} seed={seed + 2} width={1} closed />
      <InkLine pts={rp([[x, y - r + 2], [x + 2, y - r - 5]])} seed={seed + 3} width={1} amp={0.1} />
    </g>
  );
}

/** A slice of cake on a small plate, centred on (x, bottom). */
function Cake({ x, bottom, seed }: { x: number; bottom: number; seed: number }) {
  const slice = sharp(rp([[x - 16, bottom - 4], [x + 16, bottom - 4], [x + 16, bottom - 24], [x - 10, bottom - 28]]), true, 1.5);
  return (
    <g>
      <Wash pts={slice} seed={seed} fill={SK.blush} opacity={0.9} dx={0.5} dy={0.4} />
      <InkLine pts={slice} seed={seed + 1} width={1} closed />
      <InkLine pts={rp([[x - 16, bottom - 15], [x + 16, bottom - 15]])} seed={seed + 2} width={0.7} />
      <InkLine pts={rp([[x - 22, bottom - 2], [x + 22, bottom - 2]])} seed={seed + 3} width={1.1} />
    </g>
  );
}

/**
 * A nudge: a cafeteria shelf with the fruit moved to eye level and the cakes
 * still there on the shelf below. The diner's eye line meets the fruit, and
 * the apple she takes is teal. No option is removed and no price changes.
 */
export function FruitEyeLevel() {
  const shelves = [86, 156];
  const fruitX = [212, 244, 276, 308, 340];
  return (
    <SketchFrame
      id="sk-fruit-eye-level"
      width={400}
      height={230}
      label="A cafeteria shelf with a row of apples at eye level and slices of cake still available on the shelf below. A diner stands beside it; her eye line meets the fruit, and she reaches for an apple, which is lit teal."
    >
      <Backwash cx={204} cy={120} rx={192} ry={104} seed={10201} />
      <Ground x0={20} x1={384} y={212} seed={10202} />
      <InkLine pts={rp([[190, 30], [190, 212]])} seed={10203} width={1.2} />
      <InkLine pts={rp([[362, 30], [362, 212]])} seed={10204} width={1.2} />
      {shelves.map((y, i) => (
        <Plank key={i} x0={186} x1={366} y={y} seed={10210 + i * 3} />
      ))}
      {fruitX.map((x, i) => (
        <Apple key={i} x={x} y={74} seed={10220 + i * 5} lit={i === 0} />
      ))}
      {[222, 276, 330].map((x, i) => (
        <Cake key={i} x={x} bottom={156} seed={10250 + i * 4} />
      ))}
      <Person x={128} y={212} h={170} look={SHOPPER} arms={["hip", "reach"]} seed={10270} />
      <SketchArrow pts={rp([[140, 58], [170, 58], [197, 68]])} seed={10290} width={1} head={7} />
    </SketchFrame>
  );
}

/* ==========================================================================
   Do AI Agents Use Heuristics?
   ========================================================================== */

/**
 * Wadi & Fredette (2025), Table 11: average correlation between the anchor
 * (the digits of the social security number in the prompt) and the stated
 * willingness to pay, for the oldest and newest model tested from each
 * provider, and for people in Ariely et al. (2003).
 */
const GENERATIONS = [
  { older: "LLAMA 2 70B", o: 0.017, os: "0.02", newer: "LLAMA 4 MAVERICK", n: 0.934, ns: "0.93" },
  { older: "CLAUDE 3.5 HAIKU", o: 0.475, os: "0.48", newer: "CLAUDE 3.7 SONNET", n: 0.984, ns: "0.98" },
  { older: "GPT-3.5 TURBO", o: 0.797, os: "0.80", newer: "GPT-4.1", n: 0.825, ns: "0.83" },
];
const PEOPLE = 0.388;

/**
 * Newer models anchor more: a slope chart from each provider's older model
 * (left) to its newer model (right), on a scale of how closely the stated
 * price followed the anchor number, from 0 to 1. A thin line marks people.
 * Real data.
 */
export function AnchorByGeneration() {
  const x0 = 212;
  const x1 = 362;
  const top = 50;
  const bot = 270;
  const Y = (v: number) => r2(bot - v * (bot - top));
  const spread = (ys: number[]) => {
    const order = ys.map((y, i) => ({ y, i })).sort((a, b) => a.y - b.y);
    for (let k = 1; k < order.length; k++) if (order[k].y - order[k - 1].y < 17) order[k].y = order[k - 1].y + 17;
    const out = [...ys];
    order.forEach((o) => (out[o.i] = o.y));
    return out;
  };
  const rightY = spread(GENERATIONS.map((g) => Y(g.n)));
  return (
    <SketchFrame
      id="sk-anchor-by-generation"
      width={604}
      height={318}
      label="A slope chart of how closely an AI model's stated price followed an anchor number, from 0 (not at all) to 1 (exactly). Llama 2 70B 0.02 rises to Llama 4 Maverick 0.93; Claude 3.5 Haiku 0.48 rises to Claude 3.7 Sonnet 0.98; GPT-3.5 Turbo 0.80 rises to GPT-4.1 0.83. A thin line marks people, in the 2003 study by Ariely and colleagues, at 0.39. The newer models are lit teal."
    >
      <Backwash cx={302} cy={160} rx={296} ry={152} seed={10301} />
      <SketchText x={300} y={top - 24} anchor="middle" size={12}>
        HOW CLOSELY THE PRICE FOLLOWED THE NUMBER
      </SketchText>
      <SketchText x={x0} y={bot + 32} anchor="middle" size={12}>
        OLDER MODEL
      </SketchText>
      <SketchText x={x1} y={bot + 32} anchor="middle" size={12}>
        NEWER MODEL
      </SketchText>
      {/* people */}
      <InkLine pts={rp([[x0 - 10, Y(PEOPLE)], [x1 + 10, Y(PEOPLE)]])} seed={10303} width={0.7} />
      <SketchText x={x0 - 18} y={Y(PEOPLE) + 4} anchor="end" size={13}>
        PEOPLE  0.39
      </SketchText>
      {GENERATIONS.map((g, i) => {
        const a: Pt = [x0, Y(g.o)];
        const b: Pt = [x1, Y(g.n)];
        const dotA = rp(blobPts(a[0], a[1], 6, 6, 10310 + i * 10, 8, 0.05));
        const dotB = rp(blobPts(b[0], b[1], 6, 6, 10311 + i * 10, 8, 0.05));
        return (
          <g key={i}>
            <InkLine pts={[a, b]} seed={10312 + i * 10} width={1.3} />
            <Wash pts={dotA} seed={10313 + i * 10} fill={SK.camel} opacity={0.9} dx={0.3} dy={0.3} />
            <InkLine pts={dotA} seed={10314 + i * 10} width={1} closed />
            <Wash pts={dotB} seed={10315 + i * 10} fill={SK.teal} opacity={0.9} dx={0.3} dy={0.3} />
            <InkLine pts={dotB} seed={10316 + i * 10} width={1} closed />
            <SketchText x={x0 - 18} y={r2(a[1] + 4.5)} anchor="end" size={13}>
              {`${g.older}  ${g.os}`}
            </SketchText>
            <SketchText x={x1 + 16} y={r2(rightY[i] + 4.5)} size={13}>
              {`${g.ns}  ${g.newer}`}
            </SketchText>
          </g>
        );
      })}
    </SketchFrame>
  );
}

/**
 * Wadi & Ma (2026b), full information: eight AI agents in a row per pricing
 * cue. Top row, beside a $4.99 tag: the seven agents that gave the cents the
 * same weight as whole dollars are ticked. Bottom row, beside a 20% OFF tag:
 * the six that gave a dollar saved through a discount the same weight as a
 * dollar of list price. Real counts.
 */
export function EightAgents() {
  const rows = [
    { y: 108, n: 7, tag: "$4.99", count: "7 OF 8" },
    { y: 222, n: 6, tag: "20% OFF", count: "6 OF 8" },
  ];
  const xs = Array.from({ length: 8 }, (_, i) => 158 + i * 40);
  return (
    <SketchFrame
      id="sk-eight-agents"
      width={560}
      height={250}
      label="Two rows of eight AI agents with all product details visible. Beside a $4.99 price tag, seven of the eight agents are ticked: they gave the cents the same weight as whole dollars. Beside a 20% OFF tag, six of the eight are ticked: they gave a dollar saved through a discount the same weight as a dollar of list price."
    >
      <Backwash cx={280} cy={128} rx={274} ry={118} seed={10401} />
      {rows.map((row, r) => (
        <g key={r}>
          <PriceTag x={68} y={row.y - 34} w={r ? 108 : 94} h={40} size={r ? 15 : 18} seed={10410 + r * 5}>
            {row.tag}
          </PriceTag>
          {xs.map((x, i) => (
            <g key={i}>
              <Agent x={x} y={row.y - 6} s={0.62} seed={10420 + r * 100 + i * 8} />
              {i < row.n ? <Tick2 x={x + 1} y={row.y + 10} s={0.95} seed={10500 + r * 20 + i} /> : null}
            </g>
          ))}
          <SketchText x={482} y={row.y - 22} size={19} serif>
            {row.count}
          </SketchText>
        </g>
      ))}
    </SketchFrame>
  );
}

/* ==========================================================================
   Information Costs and Storefront Design
   ========================================================================== */

type Goal = "vague" | "specific";
type Cost = "free" | "costly";

/**
 * Wadi & Ma (2026b), Study 1 Tool-Lab, Table 1: across eight AI agents, the
 * share of sessions that chose the coffee cheaper per ounce, and the number
 * of the six diagnostic details (dollars, cents, weight of each coffee) they
 * looked up, by goal and look-up cost ($0 or $10 per look-up).
 */
const TOOL_LAB: Record<Goal, Record<Cost, { best: number; details: number }>> = {
  specific: { free: { best: 0.94, details: 6.0 }, costly: { best: 0.83, details: 5.72 } },
  vague: { free: { best: 0.89, details: 5.86 }, costly: { best: 0.29, details: 3.81 } },
};

const GOAL_TEXT: Record<Goal, string[]> = {
  vague: ["“FIND THE BEST DEAL", "ON INSTANT COFFEE.”"],
  specific: ["“FIND THE COFFEE WITH", "THE LOWEST PRICE", "PER OUNCE.”"],
};

/** The jar in pencil: the better coffee, not chosen. */
function PencilJar({ x, bottom, w, h, seed }: { x: number; bottom: number; w: number; h: number; seed: number }) {
  return (
    <g>
      <PencilLine pts={sharp(rp([[x - w / 2, bottom - h], [x + w / 2, bottom - h], [x + w / 2, bottom], [x - w / 2, bottom]]), true, 2)} seed={seed} closed />
      <PencilLine pts={sharp(rp([[x - w / 2 - 2, bottom - h - 8], [x + w / 2 + 2, bottom - h - 8], [x + w / 2 + 2, bottom - h], [x - w / 2 - 2, bottom - h]]), true, 1)} seed={seed + 1} closed />
    </g>
  );
}

/** A small coin with its value, centred on (x, y). */
function Coin({ x, y, value, seed }: { x: number; y: number; value: string; seed: number }) {
  const c = rp(blobPts(x, y, 13, 13, seed, 10, 0.05));
  return (
    <g>
      <Wash pts={c} seed={seed + 1} fill={SK.ochre} opacity={0.9} dx={0.3} dy={0.3} />
      <InkLine pts={c} seed={seed + 2} width={1} closed />
      <SketchText x={x} y={r2(y + 3.5)} anchor="middle" size={value.length > 2 ? 8.5 : 9.5}>
        {value}
      </SketchText>
    </g>
  );
}

/**
 * The storefront instrument. Tap the instruction card to switch the goal the
 * consumer gives the agent (vague or specific), and tap the storefront to
 * switch what each look-up of a hidden detail costs ($0 or $10). The right
 * side shows what the agents did in the study: the share that chose the
 * coffee cheaper per ounce (ten jars of it: teal when chosen, pencil when not) and how many of the six
 * details they looked up. Only the vague goal with costly look-ups collapses.
 * Real data.
 */
export function StorefrontLab() {
  const [goal, setGoal] = React.useState<Goal>("vague");
  const [cost, setCost] = React.useState<Cost>("free");
  const cell = TOOL_LAB[goal][cost];
  const lit = Math.round(cell.best * 10);
  const coin = cost === "free" ? "$0" : "$10";
  const card = sharp(rp([[24, 70], [214, 70], [214, 214], [24, 214]]), true, 2);
  const store = sharp(rp([[250, 46], [530, 46], [530, 260], [250, 260]]), true, 2);
  const tap = (fn: () => void) => ({
    role: "button" as const,
    tabIndex: 0,
    style: { cursor: "pointer", outline: "none" },
    onClick: fn,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        fn();
      }
    },
  });
  const listings = [
    { x: 320, price: "$4.99", h: 50 },
    { x: 460, price: "$5.00", h: 56 },
  ];
  const label = `An AI agent's shopping task. The instruction card reads ${GOAL_TEXT[goal].join(" ")} The storefront lists two coffees, $4.99 and $5.00, whose details are hidden; each look-up costs ${coin}. In the study, the agents looked up ${cell.details.toFixed(2)} of 6 details and chose the coffee cheaper per ounce in ${Math.round(cell.best * 100)}% of sessions.`;
  return (
    <>
      <SketchFrame id="sk-storefront-lab" width={800} height={300} label={label}>
        <Backwash cx={400} cy={150} rx={394} ry={142} seed={10601} />
        {/* the instruction */}
        <g {...tap(() => setGoal((g) => (g === "vague" ? "specific" : "vague")))} aria-label={`Instruction: ${goal} goal. Tap to switch.`}>
          <Paper pts={card} seed={10610} />
          <InkLine pts={card} seed={10611} closed />
          <SketchText x={119} y={60} anchor="middle" size={10.5}>
            {goal === "vague" ? "VAGUE GOAL" : "SPECIFIC GOAL"}
          </SketchText>
          {GOAL_TEXT[goal].map((line, i) => (
            <SketchText key={line} x={119} y={r2(124 + i * 20 - (GOAL_TEXT[goal].length - 2) * 10)} anchor="middle" size={13} serif>
              {line}
            </SketchText>
          ))}
          <Agent x={186} y={204} s={0.5} seed={10620} />
        </g>
        <SketchArrow pts={rp([[218, 150], [246, 150]])} seed={10630} width={1.2} head={7} />
        {/* the storefront */}
        <g {...tap(() => setCost((c) => (c === "free" ? "costly" : "free")))} aria-label={`Storefront: each look-up costs ${coin}. Tap to switch.`}>
          <Paper pts={store} seed={10640} />
          <InkLine pts={store} seed={10641} closed />
          <InkLine pts={rp([[250, 72], [530, 72]])} seed={10642} width={0.9} />
          {[264, 276, 288].map((x, i) => (
            <InkLine key={i} pts={rp(blobPts(x, 59, 3.5, 3.5, 10643 + i, 8, 0.05))} seed={10646 + i} width={0.8} closed />
          ))}
          {listings.map((l, i) => {
            const det = sharp(rp([[l.x - 44, 196], [l.x + 30, 196], [l.x + 30, 230], [l.x - 44, 230]]), true, 1.5);
            return (
              <g key={i}>
                <Jar x={l.x} bottom={164} w={46} h={l.h} level={0.8} seed={10650 + i * 20} />
                <SketchText x={l.x} y={186} anchor="middle" size={15} serif>
                  {l.price}
                </SketchText>
                <PencilLine pts={det} seed={10670 + i * 4} closed />
                <SketchText x={l.x - 7} y={218} anchor="middle" size={11} fill={SK.pencil}>
                  OZ ?
                </SketchText>
                <Coin x={l.x + 36} y={196} value={coin} seed={10680 + i * 6} />
              </g>
            );
          })}
        </g>
        <SketchArrow pts={rp([[534, 150], [566, 150]])} seed={10690} width={1.2} head={7} />
        {/* what the agents did */}
        <SketchText x={680} y={52} anchor="middle" size={10.5}>
          CHOSE THE BETTER COFFEE
        </SketchText>
        <SketchText x={680} y={104} anchor="middle" size={44} serif>
          {`${Math.round(cell.best * 100)}%`}
        </SketchText>
        {Array.from({ length: 10 }, (_, i) => {
          const x = 610 + (i % 5) * 35;
          const b = i < 5 ? 168 : 222;
          return i < lit ? <Jar key={i} x={x} bottom={b} w={20} h={28} level={0.8} seed={10700 + i * 10} lit /> : <PencilJar key={i} x={x} bottom={b} w={20} h={28} seed={10700 + i * 10} />;
        })}
        <SketchText x={680} y={256} anchor="middle" size={10.5}>
          {`DETAILS LOOKED UP ${cell.details.toFixed(2)} OF 6`}
        </SketchText>
      </SketchFrame>
      <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-1">
        <PlateToggle
          value={goal}
          onChange={setGoal}
          options={[
            { id: "vague", label: "Vague goal" },
            { id: "specific", label: "Specific goal" },
          ]}
        />
        <PlateToggle
          value={cost}
          onChange={setCost}
          options={[
            { id: "free", label: "Look-ups free" },
            { id: "costly", label: "Look-ups cost $10" },
          ]}
        />
      </div>
    </>
  );
}

/* ==========================================================================
   Discussion: Spot the Shortcut
   ========================================================================== */

/**
 * An online product page full of cues to spot: a coffee jar with a 20% OFF
 * sticker, a "compare at" reference price above a just-below price, a star
 * rating and a pre-ticked box that adds a second jar. Beside it stands the AI
 * agent that might shop the page instead.
 */
export function ProductPage() {
  const page = sharp(rp([[24, 24], [392, 24], [392, 300], [24, 300]]), true, 2);
  const box = sharp(rp([[214, 238], [230, 238], [230, 254], [214, 254]]), true, 1);
  const button = sharp(rp([[214, 266], [360, 266], [360, 288], [214, 288]]), true, 3);
  const sticker = rp(blobPts(150, 98, 26, 26, 10810, 14, 0.06));
  return (
    <SketchFrame
      id="sk-product-page"
      width={480}
      height={320}
      label="An online product page for a coffee jar. An ochre 20% OFF sticker sits on the photo. The text column shows four of five rating stars, COMPARE AT $7.49 above a price of $4.99, and a pre-ticked box to add a second jar above the buy button. An AI agent stands beside the page."
    >
      <Backwash cx={240} cy={164} rx={232} ry={150} seed={10801} />
      <Paper pts={page} seed={10802} />
      <InkLine pts={page} seed={10803} closed />
      <InkLine pts={rp([[24, 50], [392, 50]])} seed={10804} width={0.9} />
      {[38, 50, 62].map((x, i) => (
        <InkLine key={i} pts={rp(blobPts(x, 37, 3.5, 3.5, 10805 + i, 8, 0.05))} seed={10808 + i} width={0.8} closed />
      ))}
      <Jar x={108} bottom={232} w={92} h={120} level={0.8} seed={10820} />
      <Wash pts={sticker} seed={10811} fill={SK.ochre} opacity={0.9} dx={0.5} dy={0.4} />
      <InkLine pts={sticker} seed={10812} width={1.1} closed />
      <SketchText x={150} y={96} anchor="middle" size={12} serif>
        20%
      </SketchText>
      <SketchText x={150} y={109} anchor="middle" size={8.5}>
        OFF
      </SketchText>
      <InkLine pts={rp([[214, 74], [340, 74]])} seed={10830} width={1.6} />
      <InkLine pts={rp([[214, 90], [300, 90]])} seed={10831} width={0.9} />
      <Stars x={222} y={114} n={4} r={7.5} gap={21} seed={10840} />
      <SketchText x={214} y={152} size={10}>
        COMPARE AT $7.49
      </SketchText>
      <SketchText x={214} y={196} size={36} serif>
        $4.99
      </SketchText>
      <InkLine pts={box} seed={10850} width={1.1} closed />
      <Tick2 x={222} y={245} s={0.9} seed={10851} />
      <InkLine pts={rp([[238, 246], [340, 246]])} seed={10852} width={0.8} />
      <Wash pts={button} seed={10853} fill={SK.charcoal} opacity={0.6} dx={0.5} dy={0.4} />
      <InkLine pts={button} seed={10854} width={1.1} closed />
      <Agent x={438} y={290} s={0.9} seed={10860} />
    </SketchFrame>
  );
}
