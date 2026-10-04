/* ==========================================================================
   Consumer Behavior · Week 07 — figures
   --------------------------------------------------------------------------
   Editorial Sketch plates for the consumer decision-making process: wobbly
   doubled ink and loose watercolour washes set off-register. Every mark comes
   from ../_visuals; the style rules live in ../CLAUDE.md.

   Fixed cast for this week:
     · Person: every human, one fashion-illustration figure (the SHOPPER look),
       varied only by hair, clothes and skin washes.
     · Agent: the AI agent (shared: a phone with the AI sparkle).
     · Jar: the instant-coffee jar, the week's one running product for the
       delegated-search plates.
     · Sheets: a stack of pages, the amount of information gathered.

   Colour roles: teal is the one thing chosen, bought, lit or ticked on a
   plate; ochre a badge, a count or a small highlight; pencil only an absent
   object (an empty slot, an unopened look-up, a placeholder).
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
  seeded,
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
  Car3,
  Clock,
  cloudPts,
  curvePts,
  Ground,
  Jar,
  type Look,
  Laptop1,
  Laptop2,
  Magnifier,
  Megaphone,
  Mug2,
  Pack,
  PayCard,
  Person,
  Phone2,
  Phone3,
  rp,
  Shoe,
  sharp,
  Shelf2,
  SketchArrow,
  SpeechBubble,
  Stars,
  Thought,
  Tick1,
  Tick2,
} from "../_visuals/objects";

/* -- the week's looks ---------------------------------------------------- */

const SHOPPER: Look = { hair: "bob", hairTone: SK.brown, wear: SK.camel, legs: SK.charcoal };
const FRIEND: Look = { hair: "short", hairTone: SK.leather, wear: SK.sky, legs: SK.charcoal, skin: SK.skin, skinOpacity: 0.85 };
const ELDER: Look = { hair: "bun", hairTone: SK.stone, wear: SK.tan, legs: SK.charcoal, skinOpacity: 0.55 };

/** Left and right edges of a ribbon of width `w` laid along the centre line `c`. */
function ribbon(c: Pt[], w: number): [Pt[], Pt[]] {
  const left: Pt[] = [];
  const right: Pt[] = [];
  c.forEach((p, i) => {
    const a = c[Math.max(0, i - 1)];
    const b = c[Math.min(c.length - 1, i + 1)];
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    const nx = (-(b[1] - a[1]) / len) * (w / 2);
    const ny = ((b[0] - a[0]) / len) * (w / 2);
    left.push([r2(p[0] + nx), r2(p[1] + ny)]);
    right.push([r2(p[0] - nx), r2(p[1] - ny)]);
  });
  return [left, right];
}

/* ==========================================================================
   Title
   ========================================================================== */

/**
 * The week's opening: a decision as a long walk. A shopper stands at her
 * open, nearly empty fridge; a path winds past a laptop to the counter at the
 * far end, where the bag (teal) is the only part that is the purchase.
 */
export function DecisionPath() {
  const centre = rp(curvePts([36, 296], [200, 322], [300, 292], 8).concat(curvePts([300, 292], [380, 264], [452, 292], 6).slice(1)));
  const [l, r] = ribbon(centre, 30);
  const strip = [...l, ...[...r].reverse()];
  const fridge = sharp(rp([[28, 96], [104, 96], [104, 272], [28, 272]]), true, 2);
  const inside = rp([[36, 104], [96, 104], [96, 264], [36, 264]]);
  const door = sharp(rp([[104, 96], [128, 86], [128, 262], [104, 272]]), true, 2);
  const slab = sharp(rp([[330, 176], [458, 176], [458, 188], [330, 188]]), true, 1.5);
  const front = sharp(rp([[338, 188], [450, 188], [450, 272], [338, 272]]), true, 2);
  const top = sharp(rp([[198, 244], [278, 244], [278, 252], [198, 252]]), true, 1.5);
  return (
    <SketchFrame
      id="sk-decision-path"
      width={480}
      height={320}
      label="A long path from a shopper at her open, nearly empty fridge, past a laptop with a magnifier, to a shop counter at the far end. A teal shopping bag stands on the counter beside a payment card: the purchase is only the last step."
    >
      <Backwash cx={240} cy={176} rx={228} ry={142} seed={7001} />
      <Wash pts={strip} seed={7003} fill={SK.earth} opacity={0.7} dx={0} dy={1} />
      <InkLine pts={l} seed={7004} width={1} />
      <InkLine pts={r} seed={7005} width={1} />
      <Wash pts={inside} seed={7006} fill={SK.sky} opacity={0.5} dx={0} dy={0} />
      <InkLine pts={fridge} seed={7007} closed />
      {[150, 196, 238].map((y, i) => (
        <InkLine key={i} pts={rp([[36, y], [96, y + (i % 2 ? 1 : -1)]])} seed={7010 + i} width={0.9} />
      ))}
      <Wash pts={door} seed={7014} fill={SK.stone} opacity={0.75} dx={0.6} dy={0.4} />
      <InkLine pts={door} seed={7015} closed width={1.1} />
      <InkLine pts={rp([[120, 130], [120, 160]])} seed={7016} width={1.4} />
      <Pack x={66} bottom={150} w={18} h={26} seed={7017} fill={SK.camel} />
      <Person x={152} y={276} h={160} look={SHOPPER} flip arms={["hip", "reach"]} seed={7020} />
      <Wash pts={top} seed={7031} fill={SK.leather} opacity={0.6} dx={0.6} dy={0.4} />
      <InkLine pts={top} seed={7032} closed width={1.1} />
      <InkLine pts={rp([[206, 252], [206, 274]])} seed={7033} width={1.2} />
      <InkLine pts={rp([[270, 252], [270, 274]])} seed={7034} width={1.2} />
      <Laptop2 x={238} y={244} s={1.15} seed={7030} />
      <Magnifier x={296} y={206} r={15} seed={7040} />
      <Wash pts={front} seed={7050} fill={SK.camel} opacity={0.55} dx={1} dy={0.6} />
      <InkLine pts={front} seed={7051} closed />
      <Wash pts={slab} seed={7052} fill={SK.tan} opacity={0.6} dx={0.6} dy={0.4} />
      <InkLine pts={slab} seed={7053} closed width={1.1} />
      <Bag x={392} y={110} w={44} fill={SK.teal} seed={7060} />
      <PayCard x={430} y={168} w={32} tilt={-8} seed={7070} />
    </SketchFrame>
  );
}

/* ==========================================================================
   What Is Consumer Decision Making?
   ========================================================================== */

/**
 * A decision that takes weeks, told by the paperwork on the wall: a calendar
 * with three weeks of days crossed off, and beside it a car brochure covered
 * in the reader's notes and underlinings, a magnifier resting on it.
 */
export function WeeksDecision() {
  const cal = sharp(rp([[26, 34], [214, 34], [214, 206], [26, 206]]), true, 2);
  const head = sharp(rp([[26, 34], [214, 34], [214, 64], [26, 64]]), true, 2);
  const bro = sharp(rp([[246, 52], [374, 44], [382, 204], [254, 212]]), true, 2);
  const tilt = (x: number, y: number): Pt => [r2(x + (y - 52) * 0.05), r2(y - (x - 246) * 0.062)];
  return (
    <SketchFrame
      id="sk-weeks-decision"
      width={400}
      height={230}
      label="A decision that takes weeks: a wall calendar with three weeks of days crossed off, and beside it a car brochure covered in handwritten notes and underlinings, with a magnifier resting on it."
    >
      <Backwash cx={200} cy={120} rx={192} ry={104} seed={7101} />
      {/* the calendar */}
      <Paper pts={cal} seed={7103} />
      <Wash pts={head} seed={7104} fill={SK.camel} opacity={0.6} dx={0.8} dy={0.5} />
      <InkLine pts={cal} seed={7105} closed />
      <InkLine pts={rp([[26, 64], [214, 64]])} seed={7106} width={1.1} />
      {[0, 1, 2, 3, 4].map((row) =>
        [0, 1, 2, 3, 4, 5, 6].map((col) => {
          const cx = 42 + col * 26;
          const cy = 82 + row * 27;
          const k = row * 7 + col;
          return k < 21 ? (
            <InkLine key={k} pts={rp([[cx - 6, cy - 6], [cx + 6, cy + 6], [cx, cy], [cx + 6, cy - 6], [cx - 6, cy + 6]])} seed={7110 + k} width={1} amp={0.3} />
          ) : (
            <InkLine key={k} pts={rp([[cx - 5, cy + 6], [cx + 5, cy + 6]])} seed={7110 + k} width={0.6} amp={0.2} />
          );
        }),
      )}
      {/* the brochure, read and re-read */}
      <Paper pts={bro} seed={7150} />
      <InkLine pts={bro} seed={7151} closed />
      <Car3 x={314} y={112} s={0.78} seed={7152} fill={SK.sky} />
      {[132, 146, 160, 174, 188].map((y, i) => (
        <InkLine key={i} pts={rp([tilt(262, y), tilt(i % 2 ? 344 : 364, y)])} seed={7160 + i} width={0.8} amp={0.3} />
      ))}
      <InkLine pts={rp([tilt(262, 150), tilt(330, 150)])} seed={7170} width={1.4} color={SK.ochre} amp={0.3} />
      <InkLine pts={rp([tilt(262, 178), tilt(318, 178)])} seed={7171} width={1.4} color={SK.ochre} amp={0.3} />
      <Magnifier x={368} y={186} r={17} seed={7180} />
    </SketchFrame>
  );
}

/**
 * One consumer, two categories: the same shopper has a careful decision in
 * one thought cloud (a car under a magnifier) and a habitual one in the other
 * (the usual milk carton, a tick).
 */
export function TwoCategories() {
  return (
    <SketchFrame
      id="sk-two-categories"
      width={400}
      height={230}
      label="One shopper between two thought clouds. In the left cloud, a car under a magnifier: a careful decision. In the right cloud, the usual carton of milk with a teal tick: a habitual decision."
    >
      <Backwash cx={200} cy={118} rx={192} ry={100} seed={7151} />
      <Ground x0={110} x1={290} y={216} seed={7152} />
      <Person x={200} y={216} h={140} look={SHOPPER} arms={["hip", "hip"]} seed={7160} />
      <Thought x={84} y={78} rx={64} ry={38} tx={170} ty={110} seed={7170} />
      <Car3 x={80} y={96} s={0.7} seed={7171} fill={SK.sky} />
      <Magnifier x={108} y={66} r={13} seed={7172} />
      <Thought x={318} y={78} rx={64} ry={38} tx={232} ty={110} seed={7180} />
      <Carton x={306} bottom={104} w={28} h={52} seed={7181} />
      <Tick1 x={342} y={76} s={1.5} seed={7182} />
    </SketchFrame>
  );
}

/** A gable-top milk carton standing on (x, bottom). */
function Carton({ x, bottom, w = 36, h = 70, fill = SK.sky, seed }: { x: number; bottom: number; w?: number; h?: number; fill?: string; seed: number }) {
  const body = sharp(rp([[x - w / 2, bottom - h * 0.72], [x + w / 2, bottom - h * 0.72], [x + w / 2, bottom], [x - w / 2, bottom]]), true, 1.5);
  const gable = sharp(rp([[x - w / 2, bottom - h * 0.72], [x - w / 2 + 3, bottom - h * 0.92], [x + w / 2 - 3, bottom - h * 0.92], [x + w / 2, bottom - h * 0.72]]), true, 1);
  const fin = sharp(rp([[x - w / 2 + 3, bottom - h * 0.92], [x - w / 2 + 3, bottom - h], [x + w / 2 - 3, bottom - h], [x + w / 2 - 3, bottom - h * 0.92]]), true, 0.8);
  return (
    <g>
      <Paper pts={body} seed={seed} />
      <Wash pts={body} seed={seed + 1} fill={fill} opacity={0.65} dx={0.8} dy={0.5} />
      <InkLine pts={body} seed={seed + 2} closed />
      <Paper pts={gable} seed={seed + 3} />
      <InkLine pts={gable} seed={seed + 4} width={1.1} closed />
      <InkLine pts={rp([[x, bottom - h * 0.92], [x, bottom - h * 0.72]])} seed={seed + 5} width={0.7} />
      <Paper pts={fin} seed={seed + 6} />
      <InkLine pts={fin} seed={seed + 7} width={1} closed />
      <BrandBadge x={x} y={r2(bottom - h * 0.38)} r={r2(w * 0.24)} seed={seed + 8} />
    </g>
  );
}

/**
 * A decision that takes under a second: a close-up of the fridge door, where
 * a hand lifts the usual carton (teal) out of a row of cartons without a
 * pause; a stopwatch marks the time span.
 */
export function SecondDecision() {
  const door = sharp(rp([[20, 24], [252, 24], [252, 226], [20, 226]]), true, 3);
  const lip = sharp(rp([[20, 160], [252, 160], [252, 186], [20, 186]]), true, 1.5);
  const sleeve = rp([[262, 108], [400, 74], [400, 122], [262, 144]]);
  // the back of the hand on the right, fingers wrapped round the carton's front
  const hand: Pt[] = rp([[262, 112], [240, 114], [206, 116], [198, 120], [202, 125], [197, 130], [203, 135], [210, 140], [236, 141], [262, 140]]);
  return (
    <SketchFrame
      id="sk-second-decision"
      width={400}
      height={230}
      label="A decision that takes under a second: a close-up of a fridge door shelf holding a row of milk cartons. A hand lifts the usual carton, washed teal, out of the row without pausing. A stopwatch beside it reads UNDER 1 SECOND."
    >
      <Backwash cx={200} cy={124} rx={192} ry={100} seed={7201} />
      <Wash pts={door} seed={7202} fill={SK.sky} opacity={0.3} dx={0} dy={0} />
      <InkLine pts={door} seed={7203} width={1.1} closed />
      {[0, 1, 2].map((i) => (
        <Carton key={i} x={52 + i * 50} bottom={170} seed={7210 + i * 10} />
      ))}
      <Wash pts={lip} seed={7240} fill={SK.sky} opacity={0.55} dx={0.6} dy={0.4} />
      <InkLine pts={lip} seed={7241} width={1.2} closed />
      {/* the usual carton, lifted clear of the shelf */}
      <Carton x={214} bottom={138} w={40} h={80} fill={SK.teal} seed={7250} />
      <Wash pts={sleeve} seed={7270} fill={SK.camel} opacity={0.75} dx={0.8} dy={0.5} />
      <InkLine pts={rp([[400, 74], [262, 108], [262, 144], [400, 122]])} seed={7271} />
      <Wash pts={hand} seed={7272} fill={SK.skin} opacity={0.85} dx={0.6} dy={0.4} />
      <InkLine pts={hand} seed={7273} width={1.2} closed />
      {[125, 130, 135].map((y, k) => (
        <InkLine key={k} pts={rp([[203, y], [226, y]])} seed={7274 + k} width={0.7} amp={0.2} />
      ))}
      <Clock x={332} y={182} r={20} seed={7280} />
      <InkLine pts={rp([[332, 156], [332, 162]])} seed={7284} width={2} amp={0.1} />
      <SketchText x={332} y={220} anchor="middle" size={10.5}>
        UNDER 1 SECOND
      </SketchText>
    </SketchFrame>
  );
}

/**
 * Part of the process handed off: the shopper speaks a goal (a short list) to
 * her AI agent, which looks across the products and picks one (teal).
 */
export function AgentHandsOff() {
  return (
    <SketchFrame
      id="sk-agent-hands-off"
      width={400}
      height={230}
      label="A shopper speaks a goal, shown as a short list in a speech bubble, to her AI agent, a phone with a sparkle. An arrow runs from the agent to a shelf of three coffee jars under a magnifier; the agent has picked one, washed teal."
    >
      <Backwash cx={200} cy={118} rx={192} ry={100} seed={7301} />
      <Ground x0={24} x1={380} y={216} seed={7302} />
      <Person x={62} y={216} h={156} look={SHOPPER} arms={["hip", "point"]} seed={7310} />
      <SpeechBubble x={122} y={52} w={78} h={44} tx={166} ty={114} seed={7320} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <Tick1 x={102} y={42 + i * 12} s={0.55} seed={7330 + i} color={SK.ink} />
          <InkLine pts={rp([[112, 43 + i * 12], [140 - i * 6, 42 + i * 12]])} seed={7340 + i} width={0.9} />
        </g>
      ))}
      <Agent x={176} y={216} s={1.25} seed={7350} />
      <SketchArrow pts={rp(curvePts([206, 150], [226, 124], [250, 130], 6))} seed={7360} width={1.2} head={8} />
      <InkLine pts={rp([[256, 190], [388, 189]])} seed={7370} width={1.6} />
      {[0, 1, 2].map((i) => (
        <Jar key={i} x={282 + i * 40} bottom={188} w={28} h={44} level={0.8} seed={7380 + i * 10} lit={i === 1} />
      ))}
      <Magnifier x={300} y={84} r={20} seed={7400} />
    </SketchFrame>
  );
}

/* ==========================================================================
   The Five Stages of the Decision Process
   One purchase, a new phone, carried through the five stages.
   ========================================================================== */

/** Stage 1: the phone's screen is smashed, so the actual state has fallen. */
export function StageProblem() {
  const cracks: Pt[][] = [
    [[0, -20], [-6, -8], [2, 2], [-8, 14], [-4, 26]],
    [[-6, -8], [-18, -12], [-24, -22]],
    [[2, 2], [14, 0], [22, 10]],
    [[-8, 14], [-20, 20]],
  ];
  return (
    <SketchFrame
      id="sk-stage-problem"
      width={240}
      height={190}
      label="Stage 1, problem recognition: a phone lies with its glass smashed by cracks that run across the screen."
    >
      <Backwash cx={120} cy={96} rx={112} ry={82} seed={7501} />
      <Phone2 x={120} y={96} s={1.9} seed={7510} />
      {cracks.map((c, i) => (
        <InkLine key={i} pts={at(119, 94, c, 1.5)} seed={7520 + i} width={1.1} amp={0.5} />
      ))}
    </SketchFrame>
  );
}

/** Stage 2: the shopper looks for solutions: a laptop with a search box and a magnifier. */
export function StageSearch() {
  return (
    <SketchFrame
      id="sk-stage-search"
      width={240}
      height={190}
      label="Stage 2, information search: a laptop showing a search box, with a magnifier held up beside it."
    >
      <Backwash cx={120} cy={96} rx={112} ry={82} seed={7601} />
      <Laptop2 x={94} y={142} s={1.6} seed={7610} />
      <Magnifier x={188} y={72} r={21} seed={7620} />
    </SketchFrame>
  );
}

/** Stage 3: two options compared on the attributes that matter (stars). */
export function StageEvaluate() {
  return (
    <SketchFrame
      id="sk-stage-evaluate"
      width={240}
      height={190}
      label="Stage 3, evaluation of alternatives: two phones stand side by side, the left with three stars under it and the right with four."
    >
      <Backwash cx={120} cy={96} rx={112} ry={82} seed={7701} />
      <Ground x0={28} x1={212} y={142} seed={7702} />
      <Phone3 x={66} y={140} s={1.3} seed={7710} />
      <Phone3 x={174} y={140} s={1.3} seed={7720} />
      <Stars x={36} y={166} n={3} r={7} gap={17} seed={7730} />
      <Stars x={144} y={166} n={4} r={7} gap={17} seed={7740} />
    </SketchFrame>
  );
}

/** Stage 4: one option chosen and bought: the bag (teal) and the card. */
export function StageChoose() {
  return (
    <SketchFrame
      id="sk-stage-choose"
      width={240}
      height={190}
      label="Stage 4, product choice: a teal shopping bag stands beside a payment card; the choice has been made and paid for."
    >
      <Backwash cx={120} cy={96} rx={112} ry={82} seed={7801} />
      <Ground x0={34} x1={206} y={158} seed={7802} />
      <Bag x={106} y={62} w={74} fill={SK.teal} seed={7810} />
      <PayCard x={178} y={142} w={50} tilt={-10} seed={7820} />
    </SketchFrame>
  );
}

/**
 * Stage 5: the new phone in use, held in the hand, set against the phone she
 * expected (in her thought cloud); the teal tick between them is the verdict:
 * it met expectations.
 */
export function StagePost() {
  const sleeve = rp([[70, 192], [74, 160], [120, 158], [126, 192]]);
  const hand: Pt[] = rp([[68, 118], [62, 108], [66, 100], [74, 104], [76, 120], [118, 116], [128, 104], [134, 108], [130, 122], [132, 130], [126, 150], [118, 162], [76, 164], [68, 148]]);
  return (
    <SketchFrame
      id="sk-stage-post"
      width={240}
      height={190}
      label="Stage 5, postpurchase evaluation: a hand holds the new phone in use. Above it, a thought cloud shows the phone she expected. A teal tick between them: the phone met her expectations."
    >
      <Backwash cx={120} cy={96} rx={112} ry={82} seed={7901} />
      <Wash pts={sleeve} seed={7902} fill={SK.camel} opacity={0.75} dx={0.6} dy={0.4} />
      <InkLine pts={rp([[70, 192], [74, 160], [120, 158], [126, 192]])} seed={7903} />
      <Phone2 x={98} y={92} s={1.25} seed={7910} />
      <Wash pts={hand} seed={7911} fill={SK.skin} opacity={0.85} dx={0.5} dy={0.4} />
      <InkLine pts={hand} seed={7912} width={1.2} closed />
      {[128, 140].map((y, k) => (
        <InkLine key={k} pts={rp([[118, y], [128, y - 1]])} seed={7913 + k} width={0.7} amp={0.2} />
      ))}
      <Thought x={186} y={52} rx={42} ry={30} tx={132} ty={82} seed={7920} />
      <Phone2 x={186} y={52} s={0.62} seed={7925} />
      <Tick2 x={188} y={134} s={1.5} seed={7930} />
    </SketchFrame>
  );
}

/**
 * The model against real consumers: three crossings of the same stream on
 * five stepping stones, one stone per stage. The first consumer jumps from
 * stone 1 to stone 4 (stones 2 and 3, never touched, are pencil); the second
 * steps back from 3 to 2 and crosses it again; the third treads the stones in
 * a different order, 1, 2, 4, 3, 5.
 */
export function SkipRepeat() {
  const W = 800;
  const xs = [104, 252, 400, 548, 696];
  const rows = [68, 148, 228];
  const rx = 38;
  const ry = 17;
  /** A hand-drawn hop from stone a to stone b along row y, over the top or under. */
  const hop = (y: number, a: number, b: number, up: boolean, seed: number) => {
    const x0 = xs[a];
    const x1 = xs[b];
    const dir = Math.sign(x1 - x0);
    const lift = Math.min(34, 18 + Math.abs(x1 - x0) * 0.04);
    const p0: Pt = [x0 + dir * 16, y + (up ? -ry - 2 : ry + 2)];
    const p1: Pt = [x1 - dir * 20, y + (up ? -ry - 4 : ry + 4)];
    const c: Pt = [(x0 + x1) / 2, y + (up ? -1 : 1) * (ry + lift * 1.7)];
    return <SketchArrow pts={rp(curvePts(p0, c, p1, 10))} seed={seed} width={1.5} head={9} />;
  };
  const stream = (y: number, seed: number) => (
    <Wash pts={rp([[34, y - 19], [240, y - 23], [480, y - 18], [772, y - 22], [778, y + 19], [520, y + 23], [260, y + 18], [30, y + 22]])} seed={seed} fill={SK.sky} opacity={0.55} dx={0} dy={0} />
  );
  const stones = (y: number, skipped: number[], seed: number, nums: number[] = [1, 2, 3, 4, 5]) =>
    xs.map((x, i) => {
      const rock = rp(blobPts(x, y, rx, ry, seed + i, 16, 0.07));
      return skipped.includes(i) ? (
        <g key={i}>
          <PencilLine pts={rock} seed={seed + 10 + i} closed />
          <SketchText x={x} y={y + 6} anchor="middle" size={17} fill={SK.pencil}>
            {String(nums[i])}
          </SketchText>
        </g>
      ) : (
        <g key={i}>
          <Wash pts={rock} seed={seed + 20 + i} fill={SK.stone} opacity={0.95} dx={1} dy={0.8} />
          <InkLine pts={rock} seed={seed + 30 + i} width={1.2} closed />
          <SketchText x={x} y={y + 6} anchor="middle" size={17} serif>
            {String(nums[i])}
          </SketchText>
        </g>
      );
    });
  return (
    <SketchFrame
      id="sk-skip-repeat"
      width={W}
      height={268}
      label="Three consumers cross the same stream on five stepping stones, one numbered stone for each stage. The first jumps from stone 1 to stone 4; stones 2 and 3, never touched, are drawn in pencil. The second steps back from stone 3 to stone 2 and crosses it again. The third treads the stones in a different order, 1, 2, 4, 3, 5."
    >
      {rows.map((y, r) => (
        <g key={r}>{stream(y, 8001 + r * 10)}</g>
      ))}
      {/* skip */}
      {stones(rows[0], [1, 2], 8040)}
      {hop(rows[0], 0, 3, true, 8070)}
      {hop(rows[0], 3, 4, true, 8071)}
      {/* repeat */}
      {stones(rows[1], [], 8100)}
      {hop(rows[1], 0, 1, true, 8170)}
      {hop(rows[1], 1, 2, true, 8171)}
      {hop(rows[1], 2, 1, false, 8172)}
      {hop(rows[1], 2, 3, true, 8173)}
      {hop(rows[1], 3, 4, true, 8174)}
      {/* different order */}
      {stones(rows[2], [], 8200, [1, 2, 4, 3, 5])}
      {hop(rows[2], 0, 1, true, 8270)}
      {hop(rows[2], 1, 2, true, 8271)}
      {hop(rows[2], 2, 3, true, 8272)}
      {hop(rows[2], 3, 4, true, 8273)}
    </SketchFrame>
  );
}

/* ==========================================================================
   Problem Recognition: The Actual State and the Ideal State
   ========================================================================== */

const LEVEL_TOP = 84;
const LEVEL_BOTTOM = 226;
/** Both phones start level: the consumer has what she wants. */
const LEVEL_START = 150;
/** The gap (in drawing units) that counts as a significant difference. */
const GAP_SIGNIFICANT = 48;

const clampLevel = (y: number) => Math.round(Math.min(LEVEL_BOTTOM, Math.max(LEVEL_TOP, y)));

/** A phone's cracked glass, drawn over Phone2 at scale s centred on (x, y): `n` of three crack runs. */
function Cracks({ x, y, s, n = 3, seed }: { x: number; y: number; s: number; n?: number; seed: number }) {
  const lines: Pt[][] = [
    [[0, -20], [-6, -8], [2, 2], [-8, 14], [-4, 26]],
    [[-6, -8], [-18, -12], [-24, -22]],
    [[2, 2], [14, 0], [22, 10]],
    [[-8, 14], [-20, 20]],
    [[14, 0], [16, -16], [8, -28]],
  ];
  return (
    <g>
      {lines.slice(0, n).map((c, i) => (
        <InkLine key={i} pts={at(x, y, c, s * 0.8)} seed={seed + i} width={1} amp={0.35} />
      ))}
    </g>
  );
}

/** Camera lenses across the top of a Phone2 glass: more lenses, a better phone. */
function Lenses({ x, y, s, n, seed }: { x: number; y: number; s: number; n: number; seed: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, k) => {
        const cx = r2(x + (8 - k * 9) * s);
        const cy = r2(y - 20 * s);
        const ring = rp(blobPts(cx, cy, 3.6 * s, 3.6 * s, seed + k, 9, 0.05));
        return (
          <g key={k}>
            <Wash pts={ring} seed={seed + 10 + k} fill={SK.charcoal} opacity={0.8} dx={0.2} dy={0.2} />
            <InkLine pts={ring} seed={seed + 20 + k} width={0.9} closed />
          </g>
        );
      })}
    </g>
  );
}

/**
 * Problem recognition as a gap, an instrument students work by hand. On the
 * left, in the blush of the here and now, the phone the consumer has: the
 * actual state. On the right, in a sky-washed cloud, the phone she would like:
 * the ideal state. Both start level and identical. Drag the actual phone down
 * and its glass cracks further the lower it goes; drag the ideal phone up and
 * it gains camera lenses. A bracket measures the gap between the two levels.
 * Only when the gap passes the significance mark does a problem register,
 * and which phone moved names it: need or opportunity recognition.
 */
export function ActualIdeal() {
  const [a, setA] = React.useState(LEVEL_START);
  const [i, setI] = React.useState(LEVEL_START);
  const drag = React.useRef<"a" | "i" | null>(null);
  const xa = 160;
  const xi = 450;
  const xb = 305;
  const ps = 1.32;
  const gap = a - i;
  const recognised = gap > GAP_SIGNIFICANT;
  const fell = a - LEVEL_START;
  const rose = LEVEL_START - i;
  const need = fell >= rose;
  const cracks = fell > 66 ? 5 : fell > 44 ? 3 : fell > 22 ? 1 : 0;
  const lenses = rose > 50 ? 3 : rose > 24 ? 2 : 1;

  const toY = (e: React.PointerEvent<SVGGElement>) => {
    const svg = e.currentTarget.ownerSVGElement!;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    return pt.matrixTransform(svg.getScreenCTM()!.inverse()).y;
  };
  const grab = (which: "a" | "i") => ({
    onPointerDown: (e: React.PointerEvent<SVGGElement>) => {
      drag.current = which;
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    onPointerMove: (e: React.PointerEvent<SVGGElement>) => {
      if (drag.current !== which) return;
      const y = clampLevel(toY(e));
      // the actual state can only fall and the ideal only rise from the start
      if (which === "a") setA(Math.max(LEVEL_START, y));
      else setI(Math.min(LEVEL_START, y));
    },
    onPointerUp: () => {
      drag.current = null;
    },
    onKeyDown: (e: React.KeyboardEvent<SVGGElement>) => {
      const step = e.key === "ArrowUp" ? -8 : e.key === "ArrowDown" ? 8 : 0;
      if (!step) return;
      e.preventDefault();
      if (which === "a") setA((y) => Math.max(LEVEL_START, clampLevel(y + step)));
      else setI((y) => Math.min(LEVEL_START, clampLevel(y + step)));
    },
    tabIndex: 0,
    role: "slider",
    "aria-label": which === "a" ? "Actual state: drag down" : "Ideal state: drag up",
    "aria-valuemin": 0,
    "aria-valuemax": 100,
    "aria-valuenow": Math.round(((LEVEL_BOTTOM - (which === "a" ? a : i)) / (LEVEL_BOTTOM - LEVEL_TOP)) * 100),
    "aria-orientation": "vertical" as const,
    style: { cursor: "ns-resize", touchAction: "none", outline: "none" } as React.CSSProperties,
  });

  const verdict = recognised ? (need ? "need recognition" : "opportunity recognition") : "no problem recognized";
  const label = `An instrument with two phones. On the left, in a blush wash, the phone the consumer has: the actual state${cracks ? ", its glass cracked" : ""}. On the right, in a sky-washed cloud, the phone she would like: the ideal state, with ${lenses} camera ${lenses > 1 ? "lenses" : "lens"}. A bracket measures the gap between their levels against a significance mark. Result: ${verdict}.`;
  const top = Math.min(a, i);
  const bottom = Math.max(a, i);
  const mark = i + GAP_SIGNIFICANT;

  const chevron = (x: number, y: number, down: boolean, seed: number) => {
    const d = down ? 1 : -1;
    return <InkLine pts={rp([[x - 8, y - d * 4], [x, y + d * 4], [x + 8, y - d * 4]])} seed={seed} width={1.3} amp={0.25} />;
  };

  return (
    <>
      <SketchFrame id="sk-actual-ideal" width={800} height={300} label={label}>
        {/* the here and now, and the ideal */}
        <Wash pts={rp(blobPts(xa, 156, 104, 134, 8301, 16, 0.12))} seed={8302} fill={SK.blush} opacity={0.4} dx={0} dy={0} />
        <Wash pts={rp(blobPts(xi, 156, 108, 134, 8304, 16, 0.12))} seed={8303} fill={SK.sky} opacity={0.45} dx={0} dy={0} />
        <SketchText x={xa} y={17} anchor="middle" size={12}>
          ACTUAL STATE
        </SketchText>
        <SketchText x={xi} y={17} anchor="middle" size={12}>
          IDEAL STATE
        </SketchText>

        {/* level lines run from each phone to the bracket */}
        <InkLine pts={rp([[xa + 34, a], [xb - 8, a]])} seed={8320} width={0.9} />
        <InkLine pts={rp([[xi - 34, i], [xb + 8, i]])} seed={8321} width={0.9} />
        {/* the significance mark, measured down from the ideal level */}
        <PencilLine pts={rp([[xb - 18, mark], [xb + 18, mark]])} seed={8325} width={1.2} dash="3 3" />
        <SketchText x={xb - 22} y={mark + 4} anchor="end" size={9.5} fill={SK.pencil}>
          SIGNIFICANT
        </SketchText>
        {gap > 4 ? (
          <g>
            <InkLine pts={rp([[xb, top + 3], [xb, bottom - 3]])} seed={8322} width={recognised ? 2.4 : 1.4} color={recognised ? SK.teal : SK.ink} />
            <InkLine pts={rp([[xb - 6, top + 2], [xb + 6, top + 2]])} seed={8323} width={1.4} amp={0.2} />
            <InkLine pts={rp([[xb - 6, bottom - 2], [xb + 6, bottom - 2]])} seed={8324} width={1.4} amp={0.2} />
          </g>
        ) : null}

        {/* the actual phone: it can only get worse */}
        <g {...grab("a")}>
          <rect x={xa - 44} y={a - 72} width={88} height={144} fill="transparent" />
          <Phone2 x={xa} y={a} s={ps} seed={8330} />
          <Lenses x={xa} y={a} s={ps} n={1} seed={8336} />
          {cracks ? <Cracks x={xa} y={a + 5} s={ps * 1.05} n={cracks} seed={8340} /> : null}
          {a < LEVEL_BOTTOM ? chevron(xa, a + 60, true, 8346) : null}
        </g>
        {/* the ideal phone: it can only get better */}
        <g {...grab("i")}>
          <rect x={xi - 44} y={i - 72} width={88} height={144} fill="transparent" />
          <Phone2 x={xi} y={i} s={ps} seed={8350} />
          <Lenses x={xi} y={i} s={ps} n={lenses} seed={8356} />
          {i > LEVEL_TOP ? chevron(xi, i - 60, false, 8366) : null}
        </g>

        {/* the verdict */}
        <g>
          {recognised ? (
            <Wash pts={rp(blobPts(680, 122, 26, 26, 8370, 12, 0.05))} seed={8371} fill={SK.teal} opacity={0.85} dx={0.8} dy={0.6} />
          ) : null}
          <InkLine pts={rp(blobPts(680, 122, 26, 26, 8372, 12, 0.04))} seed={8373} width={1.4} closed />
          {recognised ? <Tick2 x={680} y={122} s={1.15} seed={8374} /> : null}
          <SketchText x={680} y={174} anchor="middle" size={12}>
            {recognised ? "PROBLEM RECOGNIZED" : "NO PROBLEM RECOGNIZED"}
          </SketchText>
          {recognised ? (
            <SketchText x={680} y={196} anchor="middle" size={12}>
              {need ? "NEED RECOGNITION" : "OPPORTUNITY RECOGNITION"}
            </SketchText>
          ) : null}
        </g>
      </SketchFrame>
      <div className="mt-2 flex flex-wrap items-center gap-2 px-1" aria-live="polite">
        <PlateButton
          onClick={() => {
            setA(LEVEL_BOTTOM - 8);
            setI(LEVEL_START);
          }}
        >
          Phone breaks
        </PlateButton>
        <PlateButton
          onClick={() => {
            setI(LEVEL_TOP + 10);
            setA(LEVEL_START);
          }}
        >
          Better phone appears
        </PlateButton>
        <PlateButton
          onClick={() => {
            setA(LEVEL_START);
            setI(LEVEL_START);
          }}
        >
          Reset
        </PlateButton>
      </div>
    </>
  );
}

/** Sound lines running from a megaphone's bell. */
function Sound({ x, y, seed }: { x: number; y: number; seed: number }) {
  return (
    <g>
      {[-1, 0, 1].map((k, i) => (
        <InkLine key={i} pts={rp(curvePts([x, y + k * 14 - 3], [x + 8, y + k * 18], [x, y + k * 14 + 3], 4))} seed={seed + i} width={1.1} amp={0.2} />
      ))}
    </g>
  );
}

/* ==========================================================================
   Marketers trigger recognition
   ========================================================================== */

/**
 * A marketer's reminder that a product runs out or wears out: a megaphone
 * calls toward an almost-empty coffee jar and, in a second scene, a shoe worn
 * through at the sole.
 */
export function MarketerNeed() {
  const hole = rp([[-6, -3], [-1, -6], [4, -2], [2, 2], [-4, 3]]);
  return (
    <SketchFrame
      id="sk-marketer-need"
      width={400}
      height={200}
      label="Two scenes in which a megaphone calls out a reminder. On the left, toward an almost empty coffee jar; on the right, toward a shoe worn through at the sole."
    >
      <Backwash cx={200} cy={102} rx={192} ry={88} seed={8401} />
      <Ground x0={24} x1={176} y={172} seed={8402} />
      <Ground x0={224} x1={376} y={172} seed={8403} />
      <InkLine pts={rp([[200, 30], [200, 170]])} seed={8404} width={0.8} amp={0.5} />
      <Megaphone x={26} y={56} s={0.8} seed={8410} />
      <Sound x={72} y={56} seed={8415} />
      <Jar x={128} bottom={172} w={46} h={70} level={0.12} seed={8420} />
      <Megaphone x={226} y={56} s={0.8} seed={8430} />
      <Sound x={272} y={56} seed={8435} />
      <Shoe x={320} y={170} s={1.7} seed={8440} />
      <Wash pts={at(298, 168, hole, 1.7)} seed={8450} fill={SK.charcoal} opacity={0.7} dx={0} dy={0} />
      <InkLine pts={at(298, 168, hole, 1.7)} seed={8451} width={1} closed />
    </SketchFrame>
  );
}

/**
 * A marketer showing a better state the consumer had not imagined: a shopper
 * looks up at a poster of a better phone while her own thought cloud, drawn in
 * pencil, is still empty.
 */
export function MarketerOpportunity() {
  const poster = sharp(rp([[220, 22], [382, 22], [382, 178], [220, 178]]), true, 2);
  const cloud = rp(cloudPts(78, 52, 40, 20, 10));
  const puff = (cx: number, cy: number, r: number) => rp(blobPts(cx, cy, r, r, 8461 + r, 8, 0.1));
  return (
    <SketchFrame
      id="sk-marketer-opportunity"
      width={400}
      height={200}
      label="A shopper looks at a poster of a phone with a large camera lens and bright rays. Her own thought cloud, drawn in pencil, is empty: she had not imagined this better state."
    >
      <Backwash cx={200} cy={102} rx={192} ry={88} seed={8460} />
      <Ground x0={24} x1={206} y={186} seed={8461} />
      <PencilLine pts={cloud} seed={8462} closed />
      <PencilLine pts={puff(128, 82, 5)} seed={8463} closed />
      <PencilLine pts={puff(138, 96, 3)} seed={8464} closed />
      <Person x={168} y={186} h={150} look={SHOPPER} arms={["hip", "chin"]} seed={8470} />
      <Paper pts={poster} seed={8480} />
      <InkLine pts={poster} seed={8481} closed />
      {[[-40, -52], [0, -64], [40, -52], [-52, 0], [52, 0]].map(([dx, dy], i) => (
        <InkLine key={i} pts={rp([[301 + dx * 0.72, 100 + dy * 0.72], [301 + dx, 100 + dy]])} seed={8482 + i} width={1.4} color={SK.ochre} amp={0.2} />
      ))}
      <Phone2 x={301} y={100} s={1.5} seed={8490} />
      <Wash pts={rp(blobPts(317, 66, 12, 12, 8492, 10, 0.05))} seed={8493} fill={SK.ochre} opacity={0.9} dx={0.4} dy={0.3} />
      <InkLine pts={rp(blobPts(317, 66, 12, 12, 8494, 10, 0.05))} seed={8495} width={1.2} closed />
      <InkLine pts={rp(blobPts(317, 66, 4.5, 4.5, 8496, 8, 0.05))} seed={8497} width={1} closed />
    </SketchFrame>
  );
}

/* ==========================================================================
   Three Levels of Decision Making
   ========================================================================== */

/** A stack of `n` loose pages standing on (x, bottom): information gathered. */
function Sheets({ x, bottom, w = 52, n = 5, ph = 6, seed }: { x: number; bottom: number; w?: number; n?: number; ph?: number; seed: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, k) => {
        const y = bottom - (k + 1) * ph;
        const dx = ((k * 5) % 7) - 3;
        const pg = sharp(rp([[x - w / 2 + dx, y], [x + w / 2 + dx, y], [x + w / 2 + dx, y + ph], [x - w / 2 + dx, y + ph]]), true, 1);
        return (
          <g key={k}>
            <Paper pts={pg} seed={seed + k * 3} />
            <InkLine pts={pg} seed={seed + k * 3 + 1} width={0.9} closed />
          </g>
        );
      })}
    </g>
  );
}

/** A small house seen from the front, standing on (x, bottom); `lit` washes its walls teal. */
function House({ x, bottom, w = 100, h = 76, seed, lit = false }: { x: number; bottom: number; w?: number; h?: number; seed: number; lit?: boolean }) {
  const dw = r2(w * 0.08);
  const ww = r2(w * 0.09);
  const walls = sharp(rp([[x - w / 2, bottom - h * 0.62], [x + w / 2, bottom - h * 0.62], [x + w / 2, bottom], [x - w / 2, bottom]]), true, 1.5);
  const roof = sharp(rp([[x - w / 2 - w * 0.08, bottom - h * 0.62], [x, bottom - h], [x + w / 2 + w * 0.08, bottom - h * 0.62]]), true, 1.5);
  const door = sharp(rp([[x - dw, bottom - h * 0.4], [x + dw, bottom - h * 0.4], [x + dw, bottom], [x - dw, bottom]]), true, 1);
  const win = (cx: number) => sharp(rp([[cx - ww, bottom - h * 0.5], [cx + ww, bottom - h * 0.5], [cx + ww, bottom - h * 0.28], [cx - ww, bottom - h * 0.28]]), true, 1);
  return (
    <g>
      <Wash pts={walls} seed={seed} fill={lit ? SK.teal : SK.camel} opacity={lit ? 0.7 : 0.55} />
      <Wash pts={roof} seed={seed + 1} fill={SK.tan} opacity={0.75} dx={1} dy={0.6} />
      <InkLine pts={walls} seed={seed + 2} closed width={w < 60 ? 1.1 : 1.3} />
      <InkLine pts={roof} seed={seed + 3} closed width={w < 60 ? 1.1 : 1.3} />
      <Wash pts={door} seed={seed + 4} fill={SK.leather} opacity={0.75} dx={0.4} dy={0.2} />
      <InkLine pts={door} seed={seed + 5} width={1} closed />
      {[x - w * 0.3, x + w * 0.3].map((cx, i) => (
        <g key={i}>
          <Wash pts={win(cx)} seed={seed + 6 + i} fill={SK.sky} opacity={0.8} dx={0.3} dy={0.2} />
          <InkLine pts={win(cx)} seed={seed + 8 + i} width={0.9} closed />
        </g>
      ))}
    </g>
  );
}

/**
 * The three levels share one picture: the route a shopper walks from her own
 * front door (left) to the thing she buys. The length of the walk is the
 * effort of the decision.
 */
function FrontDoor({ x, bottom, seed }: { x: number; bottom: number; seed: number }) {
  const frame = sharp(rp([[x - 17, bottom - 64], [x + 17, bottom - 64], [x + 17, bottom], [x - 17, bottom]]), true, 1.5);
  const leaf = sharp(rp([[x - 13, bottom - 60], [x + 3, bottom - 56], [x + 3, bottom - 2], [x - 13, bottom]]), true, 1);
  return (
    <g>
      <Wash pts={frame} seed={seed} fill={SK.stone} opacity={0.6} dx={0.4} dy={0.3} />
      <InkLine pts={frame} seed={seed + 1} width={1.2} closed />
      <Wash pts={leaf} seed={seed + 2} fill={SK.leather} opacity={0.75} dx={0.4} dy={0.3} />
      <InkLine pts={leaf} seed={seed + 3} width={1} closed />
      <InkLine pts={rp([[x, bottom - 30], [x, bottom - 27]])} seed={seed + 4} width={1.8} amp={0.1} />
    </g>
  );
}

/** A toothpaste carton lying on a shelf, centred on x with its base on `bottom`. */
function Paste({ x, bottom, fill = SK.sky, seed }: { x: number; bottom: number; fill?: string; seed: number }) {
  const box = sharp(rp([[x - 22, bottom - 15], [x + 22, bottom - 15], [x + 22, bottom], [x - 22, bottom]]), true, 1.2);
  return (
    <g>
      <Paper pts={box} seed={seed} />
      <Wash pts={box} seed={seed + 1} fill={fill} opacity={0.7} dx={0.6} dy={0.4} />
      <InkLine pts={box} seed={seed + 2} width={1.1} closed />
      <BrandBadge x={r2(x - 10)} y={r2(bottom - 7.5)} r={5} seed={seed + 3} />
    </g>
  );
}

/** Routine response: from the front door straight to the usual toothpaste, no stops. */
export function RoutineScene() {
  return (
    <SketchFrame
      id="sk-routine-scene"
      width={400}
      height={240}
      label="Routine response: from her front door, a short, straight route leads directly to the usual toothpaste, washed teal, on a store shelf, with no stops on the way."
    >
      <Backwash cx={200} cy={130} rx={192} ry={104} seed={8501} />
      <Ground x0={24} x1={376} y={208} seed={8502} />
      <FrontDoor x={56} bottom={208} seed={8505} />
      <Shelf2 x0={236} x1={372} y={78} gy={208} seed={8510} />
      {[124, 170].map((y, k) => (
        <InkLine key={k} pts={rp([[236, y], [372, y]])} seed={8515 + k} width={1.2} />
      ))}
      {[78, 124, 170].map((b, r) =>
        [0, 1].map((k) =>
          r === 2 && k === 0 ? (
            <Paste key={`${r}${k}`} x={266} bottom={b} fill={SK.teal} seed={8530} />
          ) : (
            <Paste key={`${r}${k}`} x={266 + k * 66} bottom={b} seed={8520 + r * 10 + k * 5} />
          ),
        ),
      )}
      <SketchArrow pts={rp(curvePts([82, 196], [160, 198], [236, 180], 8))} seed={8540} width={1.6} head={10} />
    </SketchFrame>
  );
}

/** A loop-the-loop on a route: the walker stops and circles once at (cx, y − r). */
function loopAt(cx: number, y: number, r: number): Pt[] {
  return Array.from({ length: 13 }, (_, k) => {
    const t = (k / 12) * Math.PI * 2;
    return [r2(cx + Math.sin(t) * r * -1), r2(y - r + Math.cos(t) * r)] as Pt;
  });
}

/** Limited problem solving: the route circles once at each of three cereal boxes and ends at the third. */
export function LimitedScene() {
  const lane = 222;
  const route = rp([[82, lane], ...loopAt(174, lane, 12), ...loopAt(248, lane, 12), [304, lane], [318, 204]]);
  return (
    <SketchFrame
      id="sk-limited-scene"
      width={400}
      height={240}
      label="Limited problem solving: from her front door, the route stops and circles once in front of each of three cereal boxes, comparing a few options, and ends at the one she takes, washed teal."
    >
      <Backwash cx={200} cy={130} rx={192} ry={104} seed={8601} />
      <FrontDoor x={56} bottom={226} seed={8605} />
      <Shelf2 x0={140} x1={360} y={160} gy={202} seed={8602} />
      {[[174, SK.sky], [248, SK.blush], [322, SK.teal]].map(([x, f], k) => (
        <Box key={k} x={x as number} bottom={160} w={40} h={66} mark="brand" fill={f as string} seed={8610 + k * 4} />
      ))}
      <SketchArrow pts={route} seed={8630} width={1.6} head={10} />
    </SketchFrame>
  );
}

/** Extended problem solving: a long walk past house after house before one is chosen. */
export function ExtendedScene() {
  const homes: [number, number, boolean][] = [
    [124, 90, false],
    [226, 82, false],
    [330, 92, false],
    [176, 200, false],
    [292, 206, true],
  ];
  const route = rp([
    ...curvePts([48, 206], [56, 116], [104, 114], 7),
    ...curvePts([104, 114], [240, 110], [350, 114], 8).slice(1),
    ...curvePts([350, 114], [392, 128], [350, 140], 5).slice(1),
    ...curvePts([350, 140], [240, 144], [130, 140], 8).slice(1),
    ...curvePts([130, 140], [100, 160], [122, 210], 6).slice(1),
    ...curvePts([122, 210], [150, 226], [214, 222], 6).slice(1),
    ...curvePts([214, 222], [256, 220], [282, 212], 4).slice(1),
  ]);
  return (
    <SketchFrame
      id="sk-extended-scene"
      width={400}
      height={240}
      label="Extended problem solving: from her front door, a long route winds past five houses for sale, visiting each in turn, before it ends at the door of the one she chooses, washed teal."
    >
      <Backwash cx={200} cy={130} rx={192} ry={108} seed={8701} />
      <FrontDoor x={30} bottom={226} seed={8705} />
      {homes.map(([x, b, lit], k) => (
        <House key={k} x={x} bottom={b} w={52} h={46} seed={8710 + k * 12} lit={lit} />
      ))}
      <SketchArrow pts={route} seed={8780} width={1.5} head={10} />
    </SketchFrame>
  );
}

/* ==========================================================================
   Information Search: Internal and External
   ========================================================================== */

/** Internal search: the shopper looks into memory, which holds a brand and what she thinks of it. */
export function InternalSearch() {
  return (
    <SketchFrame
      id="sk-internal-search"
      width={400}
      height={240}
      label="Internal search: a shopper with her hand at her chin has a thought cloud that holds the brand's badge and four of five stars, what she already knows from memory."
    >
      <Backwash cx={200} cy={124} rx={192} ry={108} seed={8801} />
      <Ground x0={60} x1={250} y={226} seed={8802} />
      <Person x={130} y={226} h={170} look={SHOPPER} arms={["hip", "chin"]} seed={8810} />
      <Thought x={274} y={78} rx={92} ry={44} tx={150} ty={90} seed={8820} />
      <BrandBadge x={226} y={78} r={22} seed={8830} />
      <Stars x={266} y={78} n={4} r={9} gap={21} seed={8840} />
    </SketchFrame>
  );
}

/** A shop front standing on (x, bottom): striped awning over a window and door. */
function Shop({ x, bottom, w = 70, h = 56, seed, awningFill = SK.ochre }: { x: number; bottom: number; w?: number; h?: number; seed: number; awningFill?: string }) {
  const walls = sharp(rp([[x - w / 2, bottom - h * 0.72], [x + w / 2, bottom - h * 0.72], [x + w / 2, bottom], [x - w / 2, bottom]]), true, 1.2);
  const awning = sharp(rp([[x - w / 2 - 4, bottom - h * 0.72], [x - w / 2 + 4, bottom - h], [x + w / 2 - 4, bottom - h], [x + w / 2 + 4, bottom - h * 0.72]]), true, 1);
  const win = sharp(rp([[x - w / 2 + 8, bottom - h * 0.58], [x + 4, bottom - h * 0.58], [x + 4, bottom - 8], [x - w / 2 + 8, bottom - 8]]), true, 1);
  const door = sharp(rp([[x + 12, bottom - h * 0.58], [x + w / 2 - 6, bottom - h * 0.58], [x + w / 2 - 6, bottom], [x + 12, bottom]]), true, 1);
  return (
    <g>
      <Wash pts={walls} seed={seed} fill={SK.stone} opacity={0.7} dx={0.6} dy={0.4} />
      <InkLine pts={walls} seed={seed + 1} width={1.1} closed />
      <Wash pts={awning} seed={seed + 2} fill={awningFill} opacity={0.75} dx={0.8} dy={0.5} />
      <InkLine pts={awning} seed={seed + 3} width={1.1} closed />
      <Wash pts={win} seed={seed + 4} fill={SK.sky} opacity={0.8} dx={0.3} dy={0.2} />
      <InkLine pts={win} seed={seed + 5} width={0.9} closed />
      <InkLine pts={door} seed={seed + 6} width={0.9} closed />
    </g>
  );
}

/**
 * External search: six sources reach the shopper. Left: an ad, a website, a
 * store. Right: reviews, a friend, a salesperson at a counter.
 */
export function ExternalSearch() {
  const ad = sharp(rp([[30, 20], [90, 20], [90, 66], [30, 66]]), true, 1.5);
  const review = sharp(rp([[296, 20], [378, 20], [378, 66], [296, 66]]), true, 1.5);
  const counter = sharp(rp([[300, 196], [376, 196], [376, 226], [300, 226]]), true, 1.5);
  return (
    <SketchFrame
      id="sk-external-search"
      width={400}
      height={240}
      label="External search: a shopper stands in the middle with six sources of new information around her, each with an arrow toward her: an ad, a website on a laptop, a shop, a card of star reviews, a friend and a salesperson behind a counter."
    >
      <Backwash cx={200} cy={124} rx={194} ry={110} seed={8901} />
      <Ground x0={150} x1={250} y={226} seed={8902} />
      <Person x={200} y={226} h={168} look={SHOPPER} arms={["hip", "hold"]} seed={8910} />
      {/* left column */}
      <Paper pts={ad} seed={8920} />
      <InkLine pts={ad} seed={8921} closed />
      <BrandBadge x={60} y={43} r={13} seed={8922} />
      <Laptop1 x={62} y={122} seed={8930} />
      <Shop x={60} bottom={226} w={70} h={58} seed={8940} />
      {/* right column */}
      <Paper pts={review} seed={8950} />
      <InkLine pts={review} seed={8951} closed />
      <Stars x={314} y={43} n={4} r={7} gap={13} seed={8952} />
      <Person x={338} y={150} h={76} look={FRIEND} flip arms={["hip", "hold"]} seed={8960} />
      <Person x={338} y={226} h={76} look={ELDER} flip arms={["down", "down"]} seed={8970} />
      <Paper pts={counter} seed={8979} />
      <Wash pts={counter} seed={8980} fill={SK.camel} opacity={0.6} dx={0.8} dy={0.5} />
      <InkLine pts={counter} seed={8981} width={1.1} closed />
      {/* arrows from each source toward the shopper */}
      <SketchArrow pts={rp([[98, 52], [160, 96]])} seed={8990} width={1.1} head={7} />
      <SketchArrow pts={rp([[104, 122], [158, 122]])} seed={8991} width={1.1} head={7} />
      <SketchArrow pts={rp([[98, 196], [160, 156]])} seed={8992} width={1.1} head={7} />
      <SketchArrow pts={rp([[300, 74], [240, 100]])} seed={8993} width={1.1} head={7} />
      <SketchArrow pts={rp([[304, 118], [242, 122]])} seed={8994} width={1.1} head={7} />
      <SketchArrow pts={rp([[300, 190], [240, 156]])} seed={8995} width={1.1} head={7} />
    </SketchFrame>
  );
}

/** Shops on the street, and what each visit costs in time and fares. */
const STREET_SHOPS = 8;
const VISIT_COST = 4;

/**
 * SIMULATED prices for the same pair of headphones in eight shops: each
 * street draws a fresh set between $95 and $125 from a seeded sequence, so
 * the server and the client agree and every street is reproducible.
 */
function streetPrices(street: number): number[] {
  // the first street is set by hand so the opening plate shows the pattern
  if (street === 0) return [118, 109, 112, 99, 104, 101, 97, 103];
  const rnd = seeded(7400 + street * 31);
  return Array.from({ length: STREET_SHOPS }, () => 95 + Math.round(rnd() * 30));
}

/**
 * Search has costs, as an instrument. Eight shops line a street; the price of
 * the same headphones in each is unknown (a pencil tag) until the shopper
 * walks in. Each visit reveals one more price and costs $4 of time and fares.
 * Under the street, aligned with the shops, two running totals: the money
 * saved so far against the first price, and the cost of all the searching.
 * Savings jump early and then level off while the cost keeps climbing, so the
 * best place to stop (teal, with the price paid there) comes well before the
 * last shop. SIMULATED.
 */
export function SearchStreet() {
  const [street, setStreet] = React.useState(0);
  const [seen, setSeen] = React.useState(3);
  const prices = React.useMemo(() => streetPrices(street), [street]);
  const xs = Array.from({ length: STREET_SHOPS }, (_, k) => 72 + k * 86);
  const best = (n: number) => Math.min(...prices.slice(0, n));
  const saved = (n: number) => prices[0] - best(n);
  const cost = (n: number) => (n - 1) * VISIT_COST;
  const net = (n: number) => saved(n) - cost(n);
  const visited = Array.from({ length: seen }, (_, k) => k + 1);
  const stop = visited.reduce((a, n) => (net(n) > net(a) ? n : a), 1);
  // the price paid by a shopper who stops at the best place: the cheapest seen by then
  const paid = prices.slice(0, stop).indexOf(best(stop));
  // the chart: $0 at y 290, $30 at y 176
  const Y0 = 290;
  const scale = 114 / 30;
  const yOf = (v: number) => r2(Y0 - Math.min(30, v) * scale);
  const savedPts = rp(visited.map((n) => [xs[n - 1], yOf(saved(n))] as Pt));
  const costPts = rp(visited.map((n) => [xs[n - 1], yOf(cost(n))] as Pt));
  const last = xs[seen - 1];
  const savedOnTop = saved(seen) >= cost(seen);
  /** Two-line label beside the last point: above it for the upper series, below for the lower. */
  const endLabel = (name: string, value: number, y: number, above: boolean, fill: string) => (
    <g>
      <SketchText x={last + 10} y={above ? y - 16 : y + 14} size={9.5} fill={fill}>
        {name}
      </SketchText>
      <SketchText x={last + 10} y={above ? y - 3 : y + 27} size={11} fill={fill}>
        {`$${value}`}
      </SketchText>
    </g>
  );
  const visit = () => setSeen((n) => Math.min(STREET_SHOPS, n + 1));
  const awnings = [SK.camel, SK.sky, SK.blush, SK.tan, SK.earth, SK.camel, SK.sky, SK.blush];
  const label = `SIMULATED. A street of eight shops selling the same headphones. ${seen} of 8 shops visited; prices seen: ${prices
    .slice(0, seen)
    .map((p) => `$${p}`)
    .join(", ")}. Money saved against the first price: $${saved(seen)}; search cost at $4 a visit: $${cost(seen)}. The best place to stop so far is shop ${stop}, marked teal with the price paid there.`;
  return (
    <>
      <SketchFrame id="sk-search-street" width={800} height={330} label={label}>
        <Backwash cx={400} cy={160} rx={394} ry={156} seed={9001} />
        <Ground x0={24} x1={776} y={104} seed={9002} />
        {xs.map((x, k) => {
          const open = k < seen;
          const next = k === seen;
          const tag = sharp(rp([[x - 26, 122], [x + 26, 122], [x + 26, 148], [x - 26, 148]]), true, 1.5);
          return (
            <g
              key={k}
              {...(next
                ? {
                    role: "button",
                    tabIndex: 0,
                    "aria-label": `Visit shop ${k + 1}`,
                    onClick: visit,
                    onKeyDown: (e: React.KeyboardEvent) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        visit();
                      }
                    },
                    style: { cursor: "pointer", outline: "none" },
                  }
                : {})}
            >
              {next ? <rect x={x - 40} y={40} width={80} height={114} fill="transparent" /> : null}
              <Shop x={x} bottom={104} w={66} h={58} seed={9010 + k * 10} awningFill={awnings[k]} />
              <InkLine pts={rp([[x, 104], [x, 122]])} seed={9100 + k} width={0.8} amp={0.2} />
              {open ? (
                <>
                  {seen > 1 && k === paid ? <Wash pts={tag} seed={9110 + k} fill={SK.teal} opacity={0.55} dx={0.6} dy={0.4} /> : <Paper pts={tag} seed={9110 + k} />}
                  <InkLine pts={tag} seed={9120 + k} width={1} closed />
                  <SketchText x={x} y={141} anchor="middle" size={14} serif>
                    {`$${prices[k]}`}
                  </SketchText>
                </>
              ) : (
                <>
                  <PencilLine pts={tag} seed={9130 + k} closed />
                  <SketchText x={x} y={140} anchor="middle" size={13} fill={SK.pencil}>
                    ?
                  </SketchText>
                </>
              )}
              {next ? <InkLine pts={rp([[x - 7, 26], [x, 33], [x + 7, 26]])} seed={9140 + k} width={1.4} amp={0.2} /> : null}
            </g>
          );
        })}
        {/* the chart, one column per shop */}
        <InkLine pts={rp([[40, Y0], [xs[seen - 1] + 4, Y0]])} seed={9150} width={0.9} />
        <SketchText x={34} y={Y0 + 4} anchor="end" size={9.5}>
          $0
        </SketchText>
        <SketchText x={34} y={yOf(20) + 4} anchor="end" size={9.5}>
          $20
        </SketchText>
        <InkLine pts={rp([[40, yOf(20)], [48, yOf(20)]])} seed={9151} width={0.8} amp={0.1} />
        {seen > 1 ? <InkLine pts={rp([[xs[stop - 1], 152], [xs[stop - 1], Y0]])} seed={9152} width={2.2} color={SK.teal} amp={0.3} /> : null}
        {seen > 1 ? (
          <>
            <InkLine pts={costPts} seed={9160} width={1.6} color={SK.tan} amp={0.3} />
            <InkLine pts={savedPts} seed={9161} width={1.8} amp={0.3} />
          </>
        ) : null}
        {visited.map((n) => (
          <g key={n}>
            <InkLine pts={rp(blobPts(xs[n - 1], yOf(cost(n)), 3, 3, 9170 + n, 7, 0.05))} seed={9180 + n} width={1.2} color={SK.tan} closed />
            <InkLine pts={rp(blobPts(xs[n - 1], yOf(saved(n)), 3.4, 3.4, 9190 + n, 7, 0.05))} seed={9200 + n} width={1.5} closed />
          </g>
        ))}
        {seen > 1 ? (
          <>
            {endLabel("MONEY SAVED", saved(seen), yOf(saved(seen)), savedOnTop, SK.ink)}
            {endLabel("SEARCH COST", cost(seen), yOf(cost(seen)), !savedOnTop, SK.tan)}
          </>
        ) : null}
        <SketchText x={780} y={322} anchor="end" size={9.5} fill={SK.pencil}>
          SIMULATED
        </SketchText>
      </SketchFrame>
      <div className="mt-2 flex flex-wrap items-center gap-2 px-1" aria-live="polite">
        <PlateButton onClick={visit}>Visit the next shop</PlateButton>
        <PlateButton
          onClick={() => {
            setStreet((n) => n + 1);
            setSeen(3);
          }}
        >
          Try another street
        </PlateButton>
      </div>
    </>
  );
}

/* ==========================================================================
   Perceived Risk and the Amount of Search
   ========================================================================== */

/** A drop: a teardrop with a pointed top, tip at (x, y). */
function Drop({ x, y, s = 1, seed, fill = SK.camel }: { x: number; y: number; s?: number; seed: number; fill?: string }) {
  const pts = at(x, y, [[0, 0], [4, 8], [4.6, 12], [0, 16], [-4.6, 12], [-4, 8]], s);
  return (
    <g>
      <Wash pts={pts} seed={seed} fill={fill} opacity={0.8} dx={0.4} dy={0.3} />
      <InkLine pts={pts} seed={seed + 1} width={1} closed amp={0.3} />
    </g>
  );
}

/** Monetary risk: coins spilling out of a wallet, money lost on a poor choice. */
export function MonetaryRisk() {
  const wallet = sharp(rp([[92, 60], [210, 60], [214, 112], [88, 112]]), true, 3);
  const mouth = rp([[96, 54], [206, 54], [210, 66], [92, 66]]);
  const strap = sharp(rp([[150, 66], [188, 66], [188, 96], [150, 96]]), true, 1.5);
  const coin = (cx: number, cy: number, seed: number) => rp(blobPts(cx, cy, 14, 14, seed, 12, 0.05));
  const coins: [number, number, number][] = [[128, 52, 9110], [112, 132, 9111], [166, 150, 9112]];
  return (
    <SketchFrame
      id="sk-monetary-risk"
      width={240}
      height={190}
      label="Monetary risk: an open leather wallet with a strap, three coins with dollar signs spilling out of it and falling to the ground, money lost."
    >
      <Backwash cx={120} cy={96} rx={112} ry={82} seed={9101} />
      <Ground x0={30} x1={210} y={172} seed={9099} />
      <Wash pts={mouth} seed={9100} fill={SK.charcoal} opacity={0.7} dx={0} dy={0} />
      <Wash pts={coin(128, 52, 9113)} seed={9114} fill={SK.ochre} opacity={0.9} dx={0.5} dy={0.4} />
      <InkLine pts={coin(128, 52, 9115)} seed={9116} width={1.2} closed />
      <SketchText x={128} y={56.5} anchor="middle" size={12}>
        $
      </SketchText>
      <Wash pts={wallet} seed={9102} fill={SK.leather} opacity={0.75} dx={0.8} dy={0.6} />
      <InkLine pts={wallet} seed={9103} closed />
      <InkLine pts={mouth} seed={9104} width={1.1} closed />
      <Wash pts={strap} seed={9105} fill={SK.tan} opacity={0.7} dx={0.6} dy={0.4} />
      <InkLine pts={strap} seed={9106} width={1} closed />
      {coins.slice(1).map(([cx, cy, sd], i) => (
        <g key={i}>
          <Wash pts={coin(cx, cy, sd)} seed={sd + 20} fill={SK.ochre} opacity={0.9} dx={0.5} dy={0.4} />
          <InkLine pts={coin(cx, cy, sd + 40)} seed={sd + 60} width={1.2} closed />
          <SketchText x={cx} y={cy + 4.5} anchor="middle" size={12}>
            $
          </SketchText>
        </g>
      ))}
    </SketchFrame>
  );
}

/** Functional risk: a mug that does not hold its drink: cracked, dripping. */
export function FunctionalRisk() {
  return (
    <SketchFrame
      id="sk-functional-risk"
      width={240}
      height={190}
      label="Functional risk: a mug with a crack down its side drips drops of coffee onto the table; the product does not perform as expected."
    >
      <Backwash cx={120} cy={96} rx={112} ry={82} seed={9201} />
      <Ground x0={30} x1={210} y={150} seed={9202} />
      <Mug2 x={104} y={104} s={1.3} seed={9210} />
      <InkLine pts={rp([[96, 74], [90, 96], [100, 108], [92, 128]])} seed={9220} width={1.3} amp={0.4} />
      <Drop x={92} y={134} s={0.9} seed={9230} />
      <Drop x={72} y={146} s={0.8} seed={9232} />
    </SketchFrame>
  );
}

/** Physical risk: harm to the body: a shopper doubled over, hands on her stomach, beside the pack. */
export function PhysicalRisk() {
  return (
    <SketchFrame
      id="sk-physical-risk"
      width={240}
      height={190}
      label="Physical risk: a shopper with both hands pressed to her stomach stands beside a pack of food, harmed by what she bought."
    >
      <Backwash cx={120} cy={96} rx={112} ry={82} seed={9301} />
      <Ground x0={24} x1={216} y={176} seed={9302} />
      <Person x={96} y={176} h={150} look={SHOPPER} arms={["hug", "hug"]} seed={9310} />
      {[[-26, -6], [-30, 8], [30, -6], [34, 8]].map(([dx, dy], i) => (
        <InkLine key={i} pts={rp([[96 + dx * 0.62, 94 + dy], [96 + dx * 1.05, 92 + dy * 1.5]])} seed={9330 + i} width={1.1} amp={0.2} />
      ))}
      <Pack x={172} bottom={176} w={32} h={58} seed={9320} fill={SK.camel} badge />
    </SketchFrame>
  );
}

/** Social risk: others judge the consumer: two onlookers point and whisper at her. */
export function SocialRisk() {
  return (
    <SketchFrame
      id="sk-social-risk"
      width={240}
      height={190}
      label="Social risk: a shopper stands in the middle while two onlookers point at her and whisper, each with a speech bubble."
    >
      <Backwash cx={120} cy={96} rx={112} ry={82} seed={9401} />
      <Ground x0={14} x1={226} y={178} seed={9402} />
      <Person x={122} y={178} h={128} look={SHOPPER} arms={["hip", "down"]} seed={9410} />
      <Person x={42} y={178} h={118} look={FRIEND} arms={["hip", "point"]} seed={9420} />
      <Person x={204} y={178} h={118} look={ELDER} flip arms={["hip", "point"]} seed={9430} />
      <SpeechBubble x={46} y={40} w={52} h={30} tx={44} ty={66} seed={9440} />
      <SpeechBubble x={196} y={40} w={52} h={30} tx={200} ty={66} seed={9444} />
      {[[34, 54], [186, 54]].map(([x], i) => (
        <g key={i}>
          <InkLine pts={rp([[x - 6, 36], [x + 14, 36]])} seed={9450 + i * 2} width={1} />
          <InkLine pts={rp([[x - 6, 44], [x + 8, 44]])} seed={9451 + i * 2} width={1} />
        </g>
      ))}
    </SketchFrame>
  );
}

/** Psychological risk: damage to self-image: her thought cloud holds a small self crossed out. */
export function PsychologicalRisk() {
  return (
    <SketchFrame
      id="sk-psychological-risk"
      width={240}
      height={190}
      label="Psychological risk: a shopper with her hand at her chin has a thought cloud holding a small picture of herself crossed out, her self-image damaged."
    >
      <Backwash cx={120} cy={96} rx={112} ry={82} seed={9501} />
      <Ground x0={24} x1={160} y={176} seed={9502} />
      <Person x={84} y={176} h={140} look={SHOPPER} arms={["hip", "chin"]} seed={9510} />
      <Thought x={160} y={62} rx={56} ry={34} tx={100} ty={86} seed={9520} />
      <Person x={160} y={90} h={52} look={SHOPPER} arms={["down", "down"]} seed={9530} />
      <InkLine pts={rp([[142, 38], [180, 90]])} seed={9540} width={1.8} amp={0.4} />
      <InkLine pts={rp([[180, 38], [142, 90]])} seed={9541} width={1.8} amp={0.4} />
    </SketchFrame>
  );
}

/**
 * The more is at risk, the more is gathered: three purchases of rising risk,
 * each standing on the research behind it. A pack of gum sits on a single
 * page, a laptop on a short stack, and a car on a tall tower of pages.
 */
export function RiskMoreInfo() {
  const G = 212;
  const ph = 8;
  return (
    <SketchFrame
      id="sk-risk-more-info"
      width={800}
      height={232}
      label="Three purchases of rising risk, each standing on the pages of information gathered for it: a pack of gum on a single page, a laptop on a stack of five pages, and a car on a tall tower of twelve pages."
    >
      <Backwash cx={400} cy={124} rx={392} ry={104} seed={9601} />
      <Ground x0={40} x1={760} y={G} seed={9602} />
      <Sheets x={150} bottom={G} w={74} n={1} ph={ph} seed={9620} />
      <Pack x={150} bottom={G - ph} w={34} h={54} seed={9610} fill={SK.sky} badge />
      <Sheets x={400} bottom={G} w={126} n={5} ph={ph} seed={9640} />
      <Laptop2 x={400} y={G - 5 * ph} s={1.35} seed={9630} />
      <Sheets x={650} bottom={G} w={146} n={12} ph={ph} seed={9660} />
      <Car3 x={650} y={G - 12 * ph} s={1} seed={9650} fill={SK.leather} />
    </SketchFrame>
  );
}

/* ==========================================================================
   Delegated Search: When an AI Agent Gathers the Information
   ========================================================================== */

/**
 * Wadi & Ma (2026b), Study 1 Tool-Lab, Table 1. Eight AI agents chose between
 * two instant coffees whose six diagnostic details (the dollars, cents and
 * weight of each) were hidden until looked up, at $0 or $10 per look-up, with
 * 100 sessions per agent in each cell. Entries pool the vague and specific
 * goal cells, which had equal numbers of sessions: details looked up (of 6),
 * and the share of sessions that chose the coffee cheaper per ounce.
 */
const POOLED: Record<"free" | "costly", { details: number; best: number }> = {
  free: { details: r2((6.0 + 5.86) / 2), best: r2((0.94 + 0.89) / 2) },
  costly: { details: r2((5.72 + 3.81) / 2), best: r2((0.83 + 0.29) / 2) },
};

/** The study's two coffees, detail by detail. */
const TOOL_COFFEES = [
  { cells: ["$4", ".99", "10 OZ"], price: 4.99, oz: 10 },
  { cells: ["$5", ".00", "11 OZ"], price: 5.0, oz: 11 },
];
const DETAILS = ["DOLLARS", "CENTS", "WEIGHT"];

/**
 * The look-up board, played by the class. Two coffee jars head two columns of
 * hidden details (dollars, cents, weight), as in the study. Tap a pencil card
 * to look it up; when look-ups cost, each one adds $10 to the bill. Tap a jar
 * to choose it: the board opens, and the price per ounce shows whether the
 * choice was the better deal. Beside it, what the AI agents in the study did
 * under the same cost: how many of the six details they looked up, and how
 * many in ten chose the coffee cheaper per ounce (teal). Real data.
 */
export function InformationBoard() {
  const [cost, setCost] = React.useState<"free" | "costly">("free");
  const [open, setOpen] = React.useState<boolean[]>(Array(6).fill(false));
  const [choice, setChoice] = React.useState<number | null>(null);
  const isCostly = cost === "costly";
  const looked = open.filter(Boolean).length;
  const per = TOOL_COFFEES.map((c) => c.price / c.oz);
  const better = per[0] < per[1] ? 0 : 1;
  const done = choice !== null;
  const study = POOLED[cost];
  const lit = Math.round(study.best * 10);
  const xs = [206, 364];
  const ys = [138, 192, 246];
  const cents = (v: number) => `${(Math.round(v * 1000) / 10).toFixed(1)}¢`;
  const reset = () => {
    setOpen(Array(6).fill(false));
    setChoice(null);
  };
  const lookUp = (k: number) => {
    if (done) return;
    setOpen((o) => o.map((v, j) => (j === k ? true : v)));
  };
  const tap = (fn: () => void, name: string) => ({
    role: "button" as const,
    tabIndex: 0,
    "aria-label": name,
    onClick: fn,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        fn();
      }
    },
    style: { cursor: "pointer", outline: "none" },
  });
  const label = `A look-up board of two instant coffees, each with three hidden details: dollars, cents and weight. Look-ups are ${isCostly ? "$10 each" : "free"}. ${looked} of 6 details looked up${isCostly ? `, $${looked * 10} spent` : ""}. ${
    done ? `The ${choice === 0 ? "left" : "right"} coffee was chosen; it is ${choice === better ? "" : "not "}the one cheaper per ounce (${cents(per[0])} against ${cents(per[1])}).` : "No coffee chosen yet."
  } AI agents in the study, with look-ups ${isCostly ? "at $10" : "free"}, looked up ${study.details} of 6 details on average and chose the coffee cheaper per ounce in about ${lit} of 10 sessions.`;
  return (
    <>
      <SketchFrame id="sk-information-board" width={800} height={330} label={label}>
        <Backwash cx={400} cy={166} rx={394} ry={156} seed={9701} />
        {/* the two jars: tap one to choose it */}
        {TOOL_COFFEES.map((_, j) => (
          <g key={j} {...(done ? {} : tap(() => setChoice(j), `Choose the ${j === 0 ? "left" : "right"} coffee`))}>
            <rect x={xs[j] - 40} y={8} width={80} height={102} fill="transparent" />
            <Jar x={xs[j]} bottom={102} w={48} h={62} level={0.85} seed={9730 + j * 10} />
            {choice === j ? <Tick1 x={xs[j] + 44} y={34} s={1.5} seed={9750 + j} color={SK.ink} /> : null}
          </g>
        ))}
        {DETAILS.map((d, r) => (
          <SketchText key={d} x={110} y={ys[r] + 4} anchor="end" size={10.5}>
            {d}
          </SketchText>
        ))}
        {TOOL_COFFEES.map((c, j) =>
          DETAILS.map((_, r) => {
            const k = j * 3 + r;
            const shown = open[k] || done;
            const box = sharp(rp([[xs[j] - 58, ys[r] - 21], [xs[j] + 58, ys[r] - 21], [xs[j] + 58, ys[r] + 21], [xs[j] - 58, ys[r] + 21]]), true, 1.5);
            return (
              <g key={k} {...(shown ? {} : tap(() => lookUp(k), `Look up the ${DETAILS[r].toLowerCase()} of the ${j === 0 ? "left" : "right"} coffee`))}>
                {shown ? (
                  <>
                    <Paper pts={box} seed={9800 + k} />
                    <InkLine pts={box} seed={9810 + k} width={1} closed />
                    <SketchText x={xs[j]} y={ys[r] + 7} anchor="middle" size={20} serif>
                      {c.cells[r]}
                    </SketchText>
                    {isCostly && open[k] ? (
                      <g>
                        <Wash pts={rp(blobPts(xs[j] + 58, ys[r] - 21, 9, 9, 9830 + k, 10, 0.05))} seed={9840 + k} fill={SK.ochre} opacity={0.95} dx={0.3} dy={0.3} />
                        <InkLine pts={rp(blobPts(xs[j] + 58, ys[r] - 21, 9, 9, 9850 + k, 10, 0.05))} seed={9860 + k} width={1} closed />
                      </g>
                    ) : null}
                  </>
                ) : (
                  <>
                    <rect x={xs[j] - 60} y={ys[r] - 23} width={120} height={46} fill="transparent" />
                    <PencilLine pts={box} seed={9870 + k} closed />
                    <SketchText x={xs[j]} y={ys[r] + 6} anchor="middle" size={17} fill={SK.pencil}>
                      ?
                    </SketchText>
                  </>
                )}
              </g>
            );
          }),
        )}
        {/* the verdict, once a coffee is chosen */}
        {done ? (
          <g>
            {TOOL_COFFEES.map((_, j) => (
              <SketchText key={j} x={xs[j]} y={296} anchor="middle" size={12}>
                {`${cents(per[j])} PER OZ`}
              </SketchText>
            ))}
            <SketchText x={285} y={318} anchor="middle" size={11}>
              {choice === better ? "THE BETTER DEAL" : "NOT THE BETTER DEAL"}
            </SketchText>
          </g>
        ) : (
          <SketchText x={285} y={300} anchor="middle" size={11} fill={SK.pencil}>
            {isCostly ? `${looked} LOOK-UPS · $${looked * 10} SPENT` : `${looked} LOOK-UPS`}
          </SketchText>
        )}
        {isCostly && done ? (
          <SketchText x={110} y={300} anchor="end" size={11}>
            {`$${looked * 10} SPENT`}
          </SketchText>
        ) : null}

        {/* the AI agents in the study, under the same cost */}
        <InkLine pts={rp([[488, 40], [488, 300]])} seed={9890} width={0.8} amp={0.4} />
        <Agent x={548} y={118} s={0.95} seed={9900} />
        <SketchText x={592} y={62} size={10.5}>
          AI AGENTS
        </SketchText>
        <SketchText x={592} y={78} size={10.5}>
          IN THE STUDY
        </SketchText>
        <SketchText x={592} y={110} size={30} serif>
          {study.details.toFixed(1)}
        </SketchText>
        <SketchText x={650} y={110} size={10.5}>
          OF 6 LOOKED UP
        </SketchText>
        {Array.from({ length: 10 }, (_, k) => (
          <Jar key={k} x={526 + (k % 5) * 50} bottom={k < 5 ? 196 : 266} w={26} h={34} level={0.8} seed={9910 + k * 10} lit={k < lit} />
        ))}
        <SketchText x={626} y={292} anchor="middle" size={10.5}>
          {`${lit} IN 10 CHOSE THE BETTER DEAL`}
        </SketchText>
      </SketchFrame>
      <PlateToggle
        value={cost}
        onChange={(c) => {
          setCost(c);
          reset();
        }}
        options={[
          { id: "free", label: "Look-ups are free" },
          { id: "costly", label: "Each look-up costs $10" },
        ]}
      />
      <div className="mt-2 flex flex-wrap items-center gap-2 px-1" aria-live="polite">
        <PlateButton onClick={() => setChoice(0)}>Choose the left coffee</PlateButton>
        <PlateButton onClick={() => setChoice(1)}>Choose the right coffee</PlateButton>
        <PlateButton onClick={reset}>Start over</PlateButton>
      </div>
    </>
  );
}

/* ==========================================================================
   The Delegation Instruction: How Specific Is the Goal?
   ========================================================================== */

type Goal = "vague" | "specific";

/**
 * Wadi & Ma (2026b), Study 1 Tool-Lab, Table 1, the $10-per-look-up cells:
 * how many of the two dollars, cents and weight details the eight AI agents
 * looked up on average (of 2 each), and the share of sessions that chose the
 * $5.00 coffee, the one cheaper per ounce. 100 sessions per agent per cell.
 */
const COSTLY: Record<Goal, { dollars: number; cents: number; weight: number; best: number }> = {
  vague: { dollars: 1.94, cents: 0.77, weight: 1.1, best: 0.29 },
  specific: { dollars: 2.0, cents: 1.72, weight: 2.0, best: 0.83 },
};

const GOAL_LINES: Record<Goal, string[]> = {
  vague: ["\u201cFIND THE BEST DEAL", "ON INSTANT COFFEE.\u201d"],
  specific: ["\u201cFIND THE COFFEE WITH", "THE LOWEST PRICE", "PER OUNCE.\u201d"],
};

/**
 * The delegation instruction as the switch. Tap one of the two instruction
 * cards (a vague goal or a specific one) and the AI agents in the study go to
 * work with every look-up costing $10. Three gauges fill to how often they
 * looked up each detail; under the study's two coffees, ten small jars split
 * to show how many in ten chose each one. With the vague goal the weight
 * gauge drops to about half and most choices go to the $4.99 coffee; with the
 * specific goal the agents look up the weight and most choose the $5.00
 * coffee, cheaper per ounce (teal). Real data.
 */
export function GoalBoard() {
  const [goal, setGoal] = React.useState<Goal>("vague");
  const d = COSTLY[goal];
  const better = Math.round(d.best * 10);
  const gauges = [
    { name: "DOLLARS", v: d.dollars / 2, x: 450 },
    { name: "CENTS", v: d.cents / 2, x: 590 },
    { name: "WEIGHT", v: d.weight / 2, x: 730 },
  ];
  const pct = (v: number) => `${Math.round(v * 100)}%`;
  const coffees = [
    { x: 486, price: "$4.99", oz: "10 OZ", per: "49.9¢ PER OZ", n: 10 - better, lit: false },
    { x: 690, price: "$5.00", oz: "11 OZ", per: "45.5¢ PER OZ", n: better, lit: true },
  ];
  const cards: { id: Goal; y: number; h: number }[] = [
    { id: "vague", y: 30, h: 86 },
    { id: "specific", y: 140, h: 102 },
  ];
  const label = `Two instruction cards: a vague goal, find the best deal on instant coffee, and a specific goal, find the coffee with the lowest price per ounce. The ${goal} goal is selected and passed to an AI agent; every look-up costs $10. Gauges show how often the AI agents in the study looked up each detail: dollars ${pct(d.dollars / 2)}, cents ${pct(d.cents / 2)}, weight ${pct(d.weight / 2)}. Of ten choices, ${10 - better} went to the $4.99 coffee for 10 ounces and ${better} to the $5.00 coffee for 11 ounces, the one cheaper per ounce, marked teal. Real data.`;
  return (
    <>
      <SketchFrame id="sk-goal-board" width={800} height={360} label={label}>
        <Backwash cx={400} cy={182} rx={394} ry={172} seed={10001} />
        {/* the two instructions: tap one */}
        {cards.map((c) => {
          const on = goal === c.id;
          const card = sharp(rp([[20, c.y], [244, c.y], [244, c.y + c.h], [20, c.y + c.h]]), true, 2);
          return (
            <g
              key={c.id}
              role="button"
              tabIndex={0}
              aria-pressed={on}
              aria-label={`Give the agent the ${c.id} goal`}
              onClick={() => setGoal(c.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setGoal(c.id);
                }
              }}
              style={{ cursor: "pointer", outline: "none" }}
              opacity={on ? 1 : 0.45}
            >
              <Paper pts={card} seed={10010 + c.y} />
              <InkLine pts={card} seed={10012 + c.y} width={on ? 1.5 : 1} closed />
              {GOAL_LINES[c.id].map((line, k) => (
                <SketchText key={k} x={36} y={c.y + 32 + k * 22} size={12}>
                  {line}
                </SketchText>
              ))}
            </g>
          );
        })}
        <SketchArrow pts={rp(goal === "vague" ? curvePts([248, 74], [300, 120], [298, 258], 8) : curvePts([248, 196], [290, 214], [296, 258], 6))} seed={10030} width={1.3} head={9} />
        <Agent x={300} y={344} s={0.95} seed={10040} />
        <Wash pts={rp(blobPts(348, 278, 15, 15, 10045, 10, 0.05))} seed={10046} fill={SK.ochre} opacity={0.9} dx={0.3} dy={0.3} />
        <InkLine pts={rp(blobPts(348, 278, 15, 15, 10047, 10, 0.05))} seed={10048} width={1} closed />
        <SketchText x={348} y={282} anchor="middle" size={9}>
          $10
        </SketchText>

        {/* how often the agents looked up each detail */}
        <SketchText x={590} y={22} anchor="middle" size={10.5}>
          HOW OFTEN THE AGENTS LOOKED IT UP
        </SketchText>
        {gauges.map((g, k) => {
          const top = 58;
          const h = 74;
          const frame = sharp(rp([[g.x - 40, top], [g.x + 40, top], [g.x + 40, top + h], [g.x - 40, top + h]]), true, 1.5);
          const fill = rp([[g.x - 38, top + h - 2 - (h - 4) * g.v], [g.x + 38, top + h - 2 - (h - 4) * g.v], [g.x + 38, top + h - 2], [g.x - 38, top + h - 2]]);
          return (
            <g key={g.name}>
              <SketchText x={g.x} y={48} anchor="middle" size={10.5}>
                {g.name}
              </SketchText>
              <Paper pts={frame} seed={10050 + k * 4} />
              <Wash pts={fill} seed={10051 + k * 4} fill={SK.camel} opacity={0.75} dx={0} dy={0} />
              <InkLine pts={frame} seed={10052 + k * 4} width={1.1} closed />
              <SketchText x={g.x} y={top + h + 26} anchor="middle" size={20} serif>
                {pct(g.v)}
              </SketchText>
            </g>
          );
        })}

        {/* the two coffees, and how ten choices split between them */}
        {coffees.map((c, j) => (
          <g key={j}>
            <Jar x={c.x - 54} bottom={262} w={40} h={50} level={0.85} seed={10070 + j * 10} lit={c.lit} />
            <SketchText x={c.x - 22} y={228} size={18} serif>
              {c.price}
            </SketchText>
            <SketchText x={c.x - 22} y={246} size={10.5}>
              {c.oz}
            </SketchText>
            <SketchText x={c.x - 22} y={262} size={10.5}>
              {c.per}
            </SketchText>
            {Array.from({ length: 10 }, (_, k) => {
              const x = c.x - 76 + (k % 5) * 30;
              const b = k < 5 ? 306 : 346;
              return k < c.n ? (
                <Jar key={k} x={x} bottom={b} w={18} h={22} level={0.8} seed={10100 + j * 100 + k * 10} lit={c.lit} />
              ) : null;
            })}
          </g>
        ))}
      </SketchFrame>
      <PlateToggle
        value={goal}
        onChange={setGoal}
        options={[
          { id: "vague", label: "Vague goal" },
          { id: "specific", label: "Specific goal" },
        ]}
      />
    </>
  );
}

/* ==========================================================================
   Evaluating Alternatives: From Awareness to Consideration
   ========================================================================== */

/**
 * The brands a consumer knows, as nested sets. The awareness set holds every
 * brand known; inside it the evoked set (the brands recalled) holds the
 * consideration set (teal: seriously considered), the inept set (rejected,
 * crossed out) and the inert set (indifferent). Switch the source of the
 * consideration set: recalled from memory, or the list an AI agent returns.
 */
export function ConsiderationSets() {
  const [src, setSrc] = React.useState<"memory" | "agent">("memory");
  const agent = src === "agent";
  const memory: string[] = [SK.camel, SK.sky, SK.blush];
  const fromAgent: string[] = [SK.tan, SK.ochre, SK.earth];
  const cons = agent ? fromAgent : memory;
  const blob = (cx: number, cy: number, rx: number, ry: number, seed: number) => rp(blobPts(cx, cy, rx, ry, seed, 16, 0.06));
  const aware = blob(310, 180, 292, 160, 10301);
  const evoked = blob(300, 186, 208, 116, 10302);
  const considerBlob = blob(232, 188, 86, 66, 10303);
  const inept = blob(388, 150, 48, 40, 10304);
  const inert = blob(388, 242, 48, 34, 10305);
  const label = `Nested sets of brands, each a blob of product packs. The awareness set holds all brands known; inside it the evoked set holds the brands recalled; inside that, the consideration set (teal) holds three brands, the inept set two crossed-out brands and the inert set two plain brands. ${
    agent ? "The three brands in the consideration set come from the list an AI agent returned, next to the consumer." : "The three brands in the consideration set were recalled by the consumer from memory."
  }`;
  const arrow = agent ? rp(curvePts([620, 292], [560, 200], [326, 196], 10)) : rp([[596, 196], [326, 196]]);
  return (
    <>
      <SketchFrame id="sk-consideration-sets" width={800} height={344} label={label}>
        <Wash pts={aware} seed={10311} fill={SK.stone} opacity={0.5} dx={0} dy={0} />
        <InkLine pts={aware} seed={10312} width={1} closed />
        <Wash pts={evoked} seed={10313} fill={SK.earth} opacity={0.5} dx={0} dy={0} />
        <InkLine pts={evoked} seed={10314} width={1} closed />
        <Wash pts={considerBlob} seed={10315} fill={SK.teal} opacity={0.4} dx={1} dy={1} />
        <InkLine pts={considerBlob} seed={10316} width={1.2} closed />
        <Wash pts={inept} seed={10317} fill={SK.stone} opacity={0.7} dx={0} dy={0} />
        <InkLine pts={inept} seed={10318} width={1} closed />
        <Wash pts={inert} seed={10319} fill={SK.stone} opacity={0.7} dx={0} dy={0} />
        <InkLine pts={inert} seed={10320} width={1} closed />

        <SketchText x={310} y={326} anchor="middle" size={11}>
          AWARENESS SET
        </SketchText>
        <SketchText x={220} y={98} anchor="middle" size={11}>
          EVOKED SET
        </SketchText>
        <SketchText x={232} y={278} anchor="middle" size={11}>
          CONSIDERATION SET
        </SketchText>
        <SketchText x={388} y={101} anchor="middle" size={11}>
          INEPT SET
        </SketchText>
        <SketchText x={388} y={294} anchor="middle" size={11}>
          INERT SET
        </SketchText>

        {[0, 1, 2, 3].map((k) => (
          <Pack key={k} x={242 + k * 46} bottom={70} w={22} h={34} seed={10330 + k * 3} fill={[SK.stone, SK.earth, SK.blush, SK.sky][k]} badge />
        ))}
        {cons.map((f, k) => (
          <Pack key={k} x={198 + k * 34} bottom={216} w={24} h={40} seed={agent ? 10360 + k * 3 : 10340 + k * 3} fill={f} badge />
        ))}
        {[0, 1].map((k) => (
          <g key={k}>
            <Pack x={372 + k * 32} bottom={170} w={22} h={34} seed={10380 + k * 3} fill={[SK.earth, SK.blush][k]} badge />
            <InkLine pts={rp([[364 + k * 32, 144], [380 + k * 32, 168]])} seed={10390 + k} width={1.8} amp={0.3} />
            <InkLine pts={rp([[380 + k * 32, 144], [364 + k * 32, 168]])} seed={10392 + k} width={1.8} amp={0.3} />
          </g>
        ))}
        {[0, 1].map((k) => (
          <Pack key={k} x={372 + k * 32} bottom={262} w={22} h={34} seed={10400 + k * 3} fill={[SK.sky, SK.camel][k]} badge />
        ))}

        {/* where the consideration set came from */}
        <SketchArrow pts={arrow} seed={10410} width={1.4} head={10} />
        {agent ? (
          <g>
            <Agent x={650} y={330} s={1.5} seed={10420} />
          </g>
        ) : (
          <g>
            <Thought x={680} y={196} rx={60} ry={32} tx={742} ty={236} seed={10430} />
            <Pack x={662} bottom={214} w={22} h={34} seed={10440} fill={SK.camel} badge />
            <Pack x={696} bottom={214} w={22} h={34} seed={10443} fill={SK.sky} badge />
          </g>
        )}
        <Person x={744} y={332} h={170} look={SHOPPER} flip arms={["hip", agent ? "carry" : "chin"]} seed={10450} />
      </SketchFrame>
      <PlateToggle
        value={src}
        onChange={setSrc}
        options={[
          { id: "memory", label: "Recalled from memory" },
          { id: "agent", label: "Returned by an AI agent" },
        ]}
      />
    </>
  );
}

/* ==========================================================================
   Decision Rules: How Consumers Choose
   ========================================================================== */

/** Five laptops scored 1 to 5 (5 = best: cheapest, longest battery, best screen). */
const LAPTOPS = [
  { id: "A", scores: [5, 2, 5] },
  { id: "B", scores: [3, 4, 4] },
  { id: "C", scores: [4, 3, 3] },
  { id: "D", scores: [5, 3, 2] },
  { id: "E", scores: [2, 5, 4] },
];
const ATTRS = ["PRICE", "BATTERY", "SCREEN"];

type RuleId = "compensatory" | "lexicographic" | "aspects" | "conjunctive" | "both";

type Verdict = {
  /** For each laptop: the attribute (0–2) that knocked it out, or null if it stayed. */
  out: (number | null)[];
  /** Laptops left standing. */
  left: number[];
  /** True when the laptops' totals are shown. */
  totals: boolean;
  note: string[];
};

const total = (i: number) => LAPTOPS[i].scores.reduce((a, b) => a + b, 0);

/** Run one decision rule over the five laptops. */
function runRule(rule: RuleId): Verdict {
  const all = LAPTOPS.map((_, i) => i);
  const out: (number | null)[] = LAPTOPS.map(() => null);
  if (rule === "compensatory") {
    const best = Math.max(...all.map(total));
    return { out, left: all.filter((i) => total(i) === best), totals: true, note: ["TOTAL OF", "ALL THREE"] };
  }
  if (rule === "lexicographic") {
    let left = all;
    for (let a = 0; a < 3 && left.length > 1; a++) {
      const best = Math.max(...left.map((i) => LAPTOPS[i].scores[a]));
      left.forEach((i) => {
        if (LAPTOPS[i].scores[a] < best) out[i] = a;
      });
      left = left.filter((i) => LAPTOPS[i].scores[a] === best);
    }
    return { out, left, totals: false, note: ["PRICE FIRST,", "THEN BATTERY"] };
  }
  if (rule === "aspects") {
    let left = all;
    for (const [a, cut] of [[1, 4], [0, 3]] as const) {
      left.forEach((i) => {
        if (LAPTOPS[i].scores[a] < cut) out[i] = a;
      });
      left = left.filter((i) => LAPTOPS[i].scores[a] >= cut);
    }
    return { out, left, totals: false, note: ["BATTERY 4 OR MORE,", "THEN PRICE 3 OR MORE"] };
  }
  // conjunctive: a minimum of 3 on every attribute
  all.forEach((i) => {
    const fail = LAPTOPS[i].scores.findIndex((s) => s < 3);
    if (fail >= 0) out[i] = fail;
  });
  const survivors = all.filter((i) => out[i] === null);
  if (rule === "conjunctive") return { out, left: survivors, totals: false, note: ["AT LEAST 3 ON", "EVERY ATTRIBUTE"] };
  const best = Math.max(...survivors.map(total));
  return { out, left: survivors.filter((i) => total(i) === best), totals: true, note: ["AT LEAST 3,", "THEN TOTAL"] };
}

const RULES: { id: RuleId; label: string }[] = [
  { id: "compensatory", label: "Compensatory" },
  { id: "lexicographic", label: "Lexicographic" },
  { id: "aspects", label: "Elimination by aspects" },
  { id: "conjunctive", label: "Conjunctive" },
  { id: "both", label: "Narrow, then trade off" },
];

/**
 * Five laptops scored on price, battery and screen (more pips = better). Pick
 * a decision rule and watch it work down the board: the rule decides which
 * laptops stay and which one wins (teal), so the same options give a
 * different choice under different rules. The last rule narrows with the
 * conjunctive rule, then trades off among those left.
 */
export function DecisionRules() {
  const [rule, setRule] = React.useState<RuleId>("compensatory");
  const v = runRule(rule);
  const final = v.left.length === 1;
  const colX = [250, 380, 510];
  const rowY = (i: number) => 92 + i * 56;
  const names = v.left.map((i) => LAPTOPS[i].id).join(" and ");
  const label = `Five laptops, A to E, scored on price, battery and screen with up to five pips each. Rule: ${RULES.find((r) => r.id === rule)!.label}. ${
    final ? `The rule picks laptop ${names}.` : `Laptops ${names} remain; the rule alone does not choose between them.`
  }`;
  return (
    <>
      <SketchFrame id="sk-decision-rules" width={800} height={354} label={label}>
        <Backwash cx={400} cy={182} rx={394} ry={166} seed={10501} />
        {ATTRS.map((a, c) => (
          <SketchText key={a} x={colX[c]} y={40} anchor="middle" size={11.5}>
            {a}
          </SketchText>
        ))}
        {LAPTOPS.map((lap, i) => {
          const y = rowY(i);
          const knocked = v.out[i] !== null;
          const stays = v.left.includes(i);
          const band = sharp(rp([[96, y - 25], [572, y - 25], [572, y + 25], [96, y + 25]]), true, 2);
          return (
            <g key={lap.id}>
              {stays && final ? <Wash pts={band} seed={10510 + i} fill={SK.teal} opacity={0.4} dx={1} dy={0.6} /> : null}
              {stays && !final ? <InkLine pts={band} seed={10520 + i} width={1.2} color={SK.teal} closed /> : null}
              <g opacity={knocked ? 0.32 : 1}>
                <Laptop2 x={56} y={y + 14} s={0.8} seed={10530 + i * 8} />
                <SketchText x={122} y={y + 6} anchor="middle" size={17} serif>
                  {lap.id}
                </SketchText>
                {lap.scores.map((s, c) =>
                  Array.from({ length: 5 }, (_, k) => {
                    const cx = colX[c] - 32 + k * 16;
                    const ring = rp(blobPts(cx, y, 6.2, 6.2, 10600 + i * 100 + c * 10 + k, 8, 0.06));
                    return (
                      <g key={`${c}-${k}`}>
                        {k < s ? <Wash pts={ring} seed={10700 + i * 100 + c * 10 + k} fill={SK.camel} opacity={0.9} dx={0.3} dy={0.3} /> : null}
                        <InkLine pts={ring} seed={10800 + i * 100 + c * 10 + k} width={0.9} closed />
                      </g>
                    );
                  }),
                )}
                {v.totals && (rule === "compensatory" || v.out[i] === null) ? (
                  <SketchText x={596} y={y + 7} anchor="middle" size={22} serif>
                    {String(total(i))}
                  </SketchText>
                ) : null}
              </g>
              {knocked ? (
                <g>
                  <InkLine pts={rp([[colX[c0(v.out[i])] - 40, y - 14], [colX[c0(v.out[i])] + 40, y + 14]])} seed={10900 + i} width={1.8} amp={0.4} />
                  <InkLine pts={rp([[colX[c0(v.out[i])] + 40, y - 14], [colX[c0(v.out[i])] - 40, y + 14]])} seed={10910 + i} width={1.8} amp={0.4} />
                </g>
              ) : null}
            </g>
          );
        })}
        <SketchText x={596} y={40} anchor="middle" size={11.5}>
          {v.totals ? "TOTAL" : ""}
        </SketchText>
        {v.note.map((line, k) => (
          <SketchText key={k} x={700} y={140 + k * 20} anchor="middle" size={11.5}>
            {line}
          </SketchText>
        ))}
        <SketchText x={700} y={234} anchor="middle" size={11.5}>
          {final ? "CHOICE" : "STILL IN"}
        </SketchText>
        <SketchText x={700} y={296} anchor="middle" size={final ? 48 : 34} serif>
          {v.left.map((i) => LAPTOPS[i].id).join(" ")}
        </SketchText>
      </SketchFrame>
      <PlateToggle value={rule} onChange={setRule} options={RULES} />
    </>
  );
}

/** Safe column index for a knocked-out laptop. */
function c0(n: number | null): number {
  return n ?? 0;
}

/* ==========================================================================
   Discussion: Write the Instruction
   ========================================================================== */

/**
 * An instruction card handed to an AI agent: some lines are inked and ticked
 * (stated), the rest are pencil blanks (left for the agent to decide).
 */
export function InstructionCard() {
  const card = sharp(rp([[128, 26], [282, 26], [282, 172], [128, 172]]), true, 2);
  return (
    <SketchFrame
      id="sk-instruction-card"
      width={400}
      height={230}
      label="A shopper hands an instruction card to her AI agent. On the card, two lines are written in ink and ticked: they are stated. Two more lines are pencil blanks, left for the agent to decide."
    >
      <Backwash cx={200} cy={118} rx={192} ry={100} seed={10601} />
      <Ground x0={20} x1={380} y={214} seed={10602} />
      <Person x={60} y={214} h={160} look={SHOPPER} arms={["hip", "carry"]} seed={10610} />
      <Paper pts={card} seed={10620} />
      <InkLine pts={card} seed={10621} closed />
      {[0, 1, 2, 3].map((k) => {
        const y = 54 + k * 34;
        const stated = k < 2;
        const box = rp([[142, y - 9], [160, y - 9], [160, y + 9], [142, y + 9]]);
        return (
          <g key={k}>
            {stated ? (
              <>
                <InkLine pts={box} seed={10630 + k} width={1} closed />
                <Tick1 x={151} y={y} s={1.1} seed={10640 + k} />
                <InkLine pts={rp([[170, y + 2], [268 - k * 14, y + 1]])} seed={10650 + k} width={1.1} />
              </>
            ) : (
              <>
                <PencilLine pts={box} seed={10660 + k} closed />
                <PencilLine pts={rp([[170, y + 2], [268 - k * 14, y + 1]])} seed={10670 + k} />
              </>
            )}
          </g>
        );
      })}
      <Agent x={336} y={214} s={1.15} seed={10680} />
      <SketchArrow pts={rp([[288, 120], [312, 126]])} seed={10690} width={1.2} head={8} />
    </SketchFrame>
  );
}
