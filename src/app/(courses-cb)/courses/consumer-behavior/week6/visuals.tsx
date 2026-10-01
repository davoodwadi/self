/* ==========================================================================
   Consumer Behavior · Week 06 — figures
   --------------------------------------------------------------------------
   Editorial Sketch plates for attitudes and persuasion: wobbly doubled ink
   and loose watercolour washes set off-register. Every mark comes from
   ../_visuals; the style rules live in ../CLAUDE.md.

   Fixed cast for this week:
     · Person: every human, one fashion-illustration figure, varied only by
       hair, clothes and skin washes.
     · The ABC of an attitude, the same three marks on every plate:
       Heart = affect (feeling), Thought cloud = cognition (belief),
       Bag = behavior (buying).
     · BrandBadge: the brand (the attitude object), on a Box, Pack or Bag.
     · Agent: the AI system (shared: a phone with the AI sparkle).
     · Mortarboard: expertise, on a person or on the Agent.

   Colour roles: teal is the one thing chosen, bought, lit or ticked on a
   plate; ochre the badge or a count; pencil only an absent object (an empty
   slot, a placeholder line, a feeling that is not there).
   ========================================================================== */

import React from "react";
import { RotateCw } from "lucide-react";
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
  wobble,
} from "../_visuals/kit";
import {
  Agent,
  at,
  Backwash,
  Bag,
  Box,
  BrandBadge,
  Can4,
  Car2,
  cloudPts,
  curvePts,
  Ground,
  handAt,
  Heart,
  type Look,
  Magnifier,
  Pack,
  Perfume1,
  Person,
  rp,
  Screen,
  sharp,
  SketchArrow,
  SpeechBubble,
  Stars,
  Thought,
  Tag1,
  Tick1,
  Tick2,
} from "../_visuals/objects";

/* -- the week's looks ---------------------------------------------------- */

const SHOPPER: Look = { hair: "bob", hairTone: SK.brown, wear: SK.camel, legs: SK.charcoal };

/* ==========================================================================
   Title
   ========================================================================== */

/** A pair of open scissors lying flat, pivot at (x, y), blades toward +x, turned by `rot`. */
function Scissors({ x, y, rot = 0, seed }: { x: number; y: number; rot?: number; seed: number }) {
  const bladeA = sharp(rp([[x, y], [x + 46, y - 9], [x + 48, y - 6], [x + 4, y + 3]]), true, 1);
  const bladeB = sharp(rp([[x, y], [x + 44, y + 12], [x + 45, y + 15], [x - 2, y + 4]]), true, 1);
  const ringA = rp(blobPts(x - 14, y - 9, 9, 6.5, seed + 4, 10, 0.06));
  const ringB = rp(blobPts(x - 13, y + 11, 9, 6.5, seed + 5, 10, 0.06));
  return (
    <g transform={`rotate(${rot} ${x} ${y})`}>
      <Wash pts={bladeA} seed={seed} fill={SK.stone} opacity={0.8} dx={0.5} dy={0.4} />
      <Wash pts={bladeB} seed={seed + 1} fill={SK.stone} opacity={0.8} dx={0.5} dy={0.4} />
      <InkLine pts={bladeA} seed={seed + 2} width={1} closed />
      <InkLine pts={bladeB} seed={seed + 3} width={1} closed />
      <Wash pts={ringA} seed={seed + 6} fill={SK.charcoal} opacity={0.55} dx={0.5} dy={0.4} />
      <Wash pts={ringB} seed={seed + 7} fill={SK.charcoal} opacity={0.55} dx={0.5} dy={0.4} />
      <InkLine pts={ringA} seed={seed + 8} width={1.1} closed />
      <InkLine pts={ringB} seed={seed + 9} width={1.1} closed />
      <InkLine pts={rp([[x - 6, y - 4], [x, y]])} seed={seed + 10} width={1} />
      <InkLine pts={rp([[x - 5, y + 7], [x, y + 2]])} seed={seed + 11} width={1} />
    </g>
  );
}

/** A ballpoint pen lying from (x0, y0) to its tip at (x1, y1). */
function Pen({ x0, y0, x1, y1, seed }: { x0: number; y0: number; x1: number; y1: number; seed: number }) {
  const len = Math.hypot(x1 - x0, y1 - y0);
  const ux = (x1 - x0) / len;
  const uy = (y1 - y0) / len;
  const nx = -uy * 3.2;
  const ny = ux * 3.2;
  const tipBase: Pt = [x1 - ux * 12, y1 - uy * 12];
  const body = rp([[x0 + nx, y0 + ny], [tipBase[0] + nx, tipBase[1] + ny], [tipBase[0] - nx, tipBase[1] - ny], [x0 - nx, y0 - ny]]);
  const tip = rp([[tipBase[0] + nx, tipBase[1] + ny], [x1, y1], [tipBase[0] - nx, tipBase[1] - ny]]);
  return (
    <g>
      <Wash pts={body} seed={seed} fill={SK.charcoal} opacity={0.7} dx={0.5} dy={0.5} />
      <InkLine pts={sharp(body)} seed={seed + 1} width={1} closed />
      <InkLine pts={tip} seed={seed + 2} width={1} />
      <InkLine pts={rp([[x0 + ux * 10, y0 + uy * 10], [x0 + ux * 34, y0 + uy * 34]])} seed={seed + 3} width={0.9} color={SK.ochre} />
    </g>
  );
}

/**
 * The week's opening still life, seen from above: a magazine open at the
 * brand's ad. In pen, the reader has doodled a heart beside it (feel) and a
 * cloud of ticked thoughts in the margin (think); the coupon has been cut out
 * and lies by the scissors, its bag washed teal (act). The empty hole it left
 * is pencil.
 */
export function AdOnTheDesk() {
  const tilt = -4;
  const left = sharp(rp([[40, 40], [206, 40], [206, 270], [40, 270]]), true, 2);
  const right = sharp(rp([[206, 40], [372, 40], [372, 270], [206, 270]]), true, 2);
  const hole = rp([[292, 196], [360, 196], [360, 258], [292, 258]]);
  const coupon = sharp(rp([[0, 0], [70, 0], [70, 62], [0, 62]]), true, 1.5);
  return (
    <SketchFrame
      id="sk-ad-on-the-desk"
      width={420}
      height={360}
      label="Seen from above: a magazine lies open at an advertisement for the brand's box. In pen, a reader has drawn a heart beside the ad and a thought cloud with two ticks in the margin. A coupon has been cut from the corner of the page, leaving a pencil outline of the gap; the coupon, showing a teal shopping bag, lies beside a pair of scissors and a pen."
    >
      <Backwash cx={210} cy={180} rx={204} ry={170} seed={100} opacity={0.45} />
      <g transform={`rotate(${tilt} 206 155)`}>
        <Paper pts={left} seed={101} />
        <Paper pts={right} seed={102} />
        <InkLine pts={left} seed={103} closed />
        <InkLine pts={right} seed={104} closed />
        <InkLine pts={rp([[206, 44], [206, 266]])} seed={105} width={1.6} />
        {/* the article on the left page */}
        <InkLine pts={rp([[58, 62], [150, 62]])} seed={106} width={2.2} amp={0.3} />
        {[84, 96, 108, 120, 132, 144, 156, 168, 180, 192].map((y, i) => (
          <InkLine key={y} pts={rp([[58, y], [i % 4 === 3 ? 150 : 188, y]])} seed={110 + i} width={0.7} amp={0.25} />
        ))}
        {/* the reader's thought in the margin */}
        <MiniThought x={110} y={232} r={30} seed={130} />
        {[224, 242].map((y, i) => (
          <g key={y}>
            <Tick1 x={96} y={y - 2} s={0.7} seed={140 + i} color={SK.ink} />
            <InkLine pts={rp([[106, y], [130, y]])} seed={144 + i} width={0.8} amp={0.25} />
          </g>
        ))}
        {/* the ad on the right page */}
        <InkLine pts={rp([[226, 64], [352, 64]])} seed={150} width={2.6} amp={0.3} />
        <InkLine pts={rp([[226, 80], [316, 80]])} seed={151} width={0.9} amp={0.25} />
        <Box x={262} bottom={180} w={58} h={72} seed={152} />
        <Heart x={336} y={128} s={1.5} seed={160} />
        <PencilLine pts={hole} seed={170} closed />
      </g>
      <g transform="rotate(8 286 312)">
        <g transform="translate(250 280)">
          <Paper pts={coupon} seed={180} />
          <path d={wobble(coupon, 181, 0.4, 16, true)} fill="none" stroke={SK.ink} strokeWidth={1} strokeDasharray="5 4" />
          <Bag x={35} y={12} w={28} fill={SK.teal} seed={182} />
        </g>
      </g>
      <Scissors x={384} y={318} rot={196} seed={190} />
      <Pen x0={24} y0={318} x1={132} y1={298} seed={200} />
    </SketchFrame>
  );
}

/* ==========================================================================
   What Are Consumer Attitudes?
   ========================================================================== */

/**
 * An attitude as a reading on a meter: the brand's box faces an old dial
 * that runs from unfavorable to favorable, its needle resting somewhere
 * between the two.
 */
export function Evaluations() {
  const cx = 248;
  const cy = 176;
  const R = 112;
  const face = sharp(rp([[118, 34], [378, 34], [378, 204], [118, 204]]), true, 6);
  const arc = (r: number, n = 24): Pt[] =>
    rp(Array.from({ length: n + 1 }, (_, i) => {
      const a = Math.PI + (i / n) * Math.PI;
      return [cx + Math.cos(a) * r, cy + Math.sin(a) * r] as Pt;
    }));
  const at2 = (t: number, r: number): Pt => {
    const a = Math.PI + t * Math.PI;
    return [r2(cx + Math.cos(a) * r), r2(cy + Math.sin(a) * r)];
  };
  const needle = 0.62;
  return (
    <SketchFrame
      id="sk-evaluations"
      width={400}
      height={226}
      label="The brand's box stands beside a meter. The meter's dial runs from UNFAVORABLE on the left to FAVORABLE on the right, and its needle rests a little past the middle."
    >
      <Backwash cx={200} cy={116} rx={194} ry={104} seed={200} />
      <Box x={58} bottom={196} w={64} h={80} seed={210} />
      <Paper pts={face} seed={220} />
      <Wash pts={face} seed={221} fill={SK.earth} opacity={0.25} />
      <InkLine pts={face} seed={222} closed />
      <InkLine pts={arc(R)} seed={223} width={1.4} />
      <InkLine pts={arc(R - 10)} seed={224} width={0.8} />
      {Array.from({ length: 11 }, (_, i) => {
        const t = i / 10;
        const long = i % 5 === 0;
        return <InkLine key={i} pts={[at2(t, R - 10), at2(t, R - (long ? 26 : 18))]} seed={230 + i} width={long ? 1.3 : 0.9} amp={0.2} />;
      })}
      <InkLine pts={[[cx, cy], at2(needle, R - 18)]} seed={250} width={2.2} amp={0.2} />
      <InkLine pts={rp(blobPts(cx, cy, 6, 6, 251, 8, 0.05))} seed={252} width={1.2} closed />
      <Wash pts={rp(blobPts(cx, cy, 6, 6, 253, 8, 0.05))} seed={253} fill={SK.charcoal} opacity={0.8} dx={0} dy={0} />
      <SketchText x={136} y={196} size={10.5}>
        UNFAVORABLE
      </SketchText>
      <SketchText x={360} y={196} anchor="end" size={10.5}>
        FAVORABLE
      </SketchText>
    </SketchFrame>
  );
}

/**
 * Four weekly receipts laid side by side: the other items change from week
 * to week, but the brand's line is the same on every one, ticked.
 */
export function SameBrandEveryWeek() {
  const others = [
    [44, 30, 52],
    [36, 48, 28],
    [50, 26, 40],
    [30, 44, 46],
  ];
  return (
    <SketchFrame
      id="sk-same-brand"
      width={400}
      height={214}
      label="Four shop receipts, WEEK 1 to WEEK 4, side by side. Each lists different items, but every one has the same line with the brand badge, ticked in teal, in the same place."
    >
      <Backwash cx={200} cy={108} rx={194} ry={100} seed={320} />
      {others.map((lens, i) => {
        const x0 = 22 + i * 92;
        const top = 22 + (i % 2) * 8;
        const h = 168;
        const zig: Pt[] = [];
        for (let k = 0; k <= 8; k++) zig.push([r2(x0 + 76 - k * 9.5), r2(top + h + (k % 2 ? 5 : 0))]);
        const shape = rp([[x0, top], [x0 + 76, top], ...zig]);
        return (
          <g key={i} transform={`rotate(${[-3, 2, -1.5, 3][i]} ${x0 + 38} ${top + 84})`}>
            <Paper pts={shape} seed={330 + i * 20} />
            <InkLine pts={shape} seed={331 + i * 20} width={1} closed />
            <SketchText x={x0 + 38} y={top + 20} anchor="middle" size={10}>
              {`WEEK ${i + 1}`}
            </SketchText>
            <InkLine pts={rp([[x0 + 10, top + 30], [x0 + 66, top + 30]])} seed={332 + i * 20} width={0.7} amp={0.2} />
            {lens.map((l, k) => (
              <InkLine key={k} pts={rp([[x0 + 10, top + 50 + k * 18 + (k >= 1 ? 28 : 0)], [x0 + 10 + l, top + 50 + k * 18 + (k >= 1 ? 28 : 0)]])} seed={333 + i * 20 + k} width={0.8} amp={0.25} />
            ))}
            <BrandBadge x={x0 + 17} y={top + 82} r={7} seed={340 + i * 20} />
            <InkLine pts={rp([[x0 + 28, top + 82], [x0 + 52, top + 82]])} seed={341 + i * 20} width={0.9} amp={0.2} />
            <Tick2 x={x0 + 63} y={top + 81} s={0.55} seed={342 + i * 20} />
            <InkLine pts={rp([[x0 + 10, top + 150], [x0 + 66, top + 150]])} seed={343 + i * 20} width={1.2} amp={0.2} />
          </g>
        );
      })}
    </SketchFrame>
  );
}

/** A shopper walks on with the usual brand while a new product is explained. */
export function ResistNew() {
  const g = 196;
  const h = 150;
  const px = 92;
  const sx = 286;
  const offer = handAt(px, g, h, "carry", 1);
  const bag = handAt(sx, g, h, "down", 1);
  return (
    <SketchFrame
      id="sk-resist-new"
      width={400}
      height={214}
      label="On the left, a promoter holds out a box marked NEW, a speech bubble full of lines explaining it. On the right, a shopper carrying a bag with the usual brand badge walks the other way."
    >
      <Backwash cx={200} cy={112} rx={192} ry={96} seed={400} />
      <Ground x0={20} x1={380} y={g} seed={401} />
      <SpeechBubble x={168} y={42} w={112} h={52} tx={112} ty={74} seed={410} />
      {[30, 42, 54].map((y, i) => (
        <InkLine key={y} pts={rp([[124, y], [i === 2 ? 186 : 212, y]])} seed={420 + i} width={0.9} amp={0.3} />
      ))}
      <Person x={px} y={g} h={h} look={{ hair: "short", hairTone: SK.brown, skin: SK.tan, skinOpacity: 0.55, wear: SK.charcoal, legs: SK.charcoal, outfit: "jacket" }} arms={["down", "carry"]} seed={430} />
      <Box x={r2(offer[0] + 18)} bottom={r2(offer[1] + 14)} w={44} h={34} mark="new" seed={440} />
      <Person x={sx} y={g} h={h} look={SHOPPER} arms={["hip", "down"]} seed={450} />
      <Bag x={bag[0]} y={bag[1]} w={30} seed={460} />
      <SketchArrow pts={rp([[318, 184], [370, 184]])} seed={470} width={1} head={6} />
    </SketchFrame>
  );
}

/* ==========================================================================
   The ABC Model
   ========================================================================== */

/** Affect: the brand's post on a phone, a big heart tapped beneath it. */
export function AffectPlate() {
  const body = sharp(rp([[104, 12], [196, 12], [196, 204], [104, 204]]), true, 10);
  const glass = rp([[112, 26], [188, 26], [188, 190], [112, 190]]);
  const photo = sharp(rp([[118, 36], [182, 36], [182, 112], [118, 112]]), true, 2);
  return (
    <SketchFrame
      id="sk-affect"
      width={300}
      height={214}
      label="A phone shows the brand's post: a photo of its box, and beneath it a large heart, tapped, with a few lines of comments."
    >
      <Backwash cx={150} cy={108} rx={140} ry={98} seed={500} />
      <Wash pts={body} seed={501} fill={SK.charcoal} opacity={0.6} />
      <InkLine pts={body} seed={502} closed />
      <Paper pts={glass} seed={503} />
      <InkLine pts={sharp(glass)} seed={504} width={0.8} closed />
      <Wash pts={photo} seed={505} fill={SK.sky} opacity={0.55} dx={0.5} dy={0.4} />
      <InkLine pts={photo} seed={506} width={0.9} closed />
      <Box x={150} bottom={104} w={34} h={42} seed={507} />
      <Heart x={150} y={140} s={1.6} seed={510} />
      {[166, 178].map((y, i) => (
        <InkLine key={y} pts={rp([[120, y], [i ? 160 : 178, y]])} seed={520 + i} width={0.8} amp={0.25} />
      ))}
      <InkLine pts={rp([[140, 18], [160, 18]])} seed={525} width={1.1} />
    </SketchFrame>
  );
}

/** Behavior: three small scenes, buying, recommending and avoiding. */
export function BehaviorPlate() {
  const g = 178;
  const h = 128;
  const buyer = handAt(56, g, h, "down", 1);
  return (
    <SketchFrame
      id="sk-behavior"
      width={300}
      height={214}
      label="Three small scenes. BUYING: a shopper carries a teal bag with the brand badge. RECOMMENDING: a shopper tells a friend about the brand, a speech bubble showing its badge. AVOIDING: a shopper walks past the brand's box."
    >
      <Backwash cx={150} cy={108} rx={144} ry={98} seed={540} />
      <Ground x0={8} x1={292} y={g} seed={541} />

      <Person x={56} y={g} h={h} look={SHOPPER} arms={["hip", "down"]} seed={550} />
      <Bag x={buyer[0]} y={buyer[1]} w={26} fill={SK.teal} seed={560} />

      <Person x={128} y={g} h={h} look={{ hair: "curly", hairTone: SK.brown, skin: SK.brown, skinOpacity: 0.5, wear: SK.sky, legs: SK.charcoal }} arms={["down", "carry"]} seed={570} />
      <Person x={176} y={g} h={h - 8} look={{ hair: "short", hairTone: SK.tan, wear: SK.earth, legs: SK.charcoal, outfit: "jacket" }} arms={["down", "down"]} flip seed={580} />
      <SpeechBubble x={150} y={30} w={44} h={32} tx={134} ty={50} seed={590} />
      <BrandBadge x={150} y={30} r={9} seed={592} />

      <Box x={210} bottom={g} w={26} h={32} seed={600} />
      <Person x={246} y={g} h={h} look={{ hair: "bun", hairTone: SK.charcoal, skin: SK.camel, skinOpacity: 0.6, wear: SK.charcoal, legs: SK.charcoal }} arms={["down", "down"]} seed={610} />
      <SketchArrow pts={rp([[262, 162], [292, 162]])} seed={620} width={1} head={5} />

      {[
        [56, "BUYING"],
        [152, "RECOMMENDING"],
        [254, "AVOIDING"],
      ].map(([x, t]) => (
        <SketchText key={t as string} x={x as number} y={204} anchor="middle" size={9.5}>
          {t}
        </SketchText>
      ))}
    </SketchFrame>
  );
}

/** Cognition: the brand's pack, and a thought about it: three ticked beliefs. */
export function CognitionPlate() {
  const pack = sharp(rp([[30, 56], [110, 56], [110, 196], [30, 196]]), true, 3);
  return (
    <SketchFrame
      id="sk-cognition"
      width={300}
      height={214}
      label="The brand's tall pack stands on the left with label lines on its front. A thought cloud trails from it, holding three lines of beliefs about it, each with a tick."
    >
      <Backwash cx={150} cy={110} rx={140} ry={98} seed={640} />
      <Wash pts={pack} seed={650} fill={SK.camel} opacity={0.6} />
      <InkLine pts={pack} seed={651} closed />
      <BrandBadge x={70} y={96} r={18} seed={652} />
      {[134, 148, 162].map((y, i) => (
        <InkLine key={y} pts={rp([[44, y], [i === 1 ? 84 : 96, y]])} seed={655 + i} width={0.8} amp={0.25} />
      ))}
      <Thought x={208} y={98} rx={70} ry={52} tx={112} ty={178} seed={660} />
      {[74, 98, 122].map((y, i) => (
        <g key={y}>
          <Tick2 x={172} y={y} s={0.6} seed={670 + i * 4} />
          <InkLine pts={rp([[186, y], [i === 1 ? 226 : 242, y]])} seed={690 + i} width={0.9} amp={0.3} />
        </g>
      ))}
    </SketchFrame>
  );
}

/**
 * The three parts together, then at odds. SUPPORT: the heart, the ticked
 * belief and the bought bag agree. CONFLICT: the heart is drawn to the box,
 * the belief says it costs too much, and the shopper walks away empty-handed.
 */
export function SupportConflict() {
  const g = 214;
  const h = 170;
  const a = 250;
  const b = 610;
  const bag = handAt(a, g, h, "down", 1);
  return (
    <SketchFrame
      id="sk-support-conflict"
      width={800}
      height={236}
      label="Two scenes with the same shopper. SUPPORT: a heart beside the shopper, a thought of the brand's box with ticks, and a teal bag with the brand badge in hand. CONFLICT: a heart drawn toward the brand's box on the left, a thought of the box with a $$$ price tag, and empty hands as the shopper walks away from it."
    >
      <Backwash cx={196} cy={124} rx={188} ry={106} seed={720} />
      <Backwash cx={604} cy={124} rx={188} ry={106} seed={721} />
      <SketchText x={30} y={28} size={10.5}>
        SUPPORT
      </SketchText>
      <SketchText x={436} y={28} size={10.5}>
        CONFLICT
      </SketchText>

      {/* support: heart, belief and bag agree */}
      <Ground x0={150} x1={350} y={g} seed={722} />
      <Thought x={120} y={96} rx={60} ry={42} tx={238} ty={64} seed={730} />
      <Box x={92} bottom={116} w={28} h={34} seed={740} />
      {[84, 104].map((y, i) => (
        <g key={y}>
          <Tick2 x={124} y={y} s={0.55} seed={750 + i * 4} />
          <InkLine pts={rp([[136, y], [160, y]])} seed={760 + i} width={0.9} amp={0.3} />
        </g>
      ))}
      <Person x={a} y={g} h={h} look={SHOPPER} arms={["hip", "down"]} seed={770} />
      <Heart x={300} y={92} s={1.2} seed={780} />
      <Bag x={bag[0]} y={bag[1]} w={32} fill={SK.teal} seed={790} />

      {/* conflict: the heart pulls one way, the belief the other */}
      <Ground x0={470} x1={770} y={g} seed={800} />
      <Box x={506} bottom={g} w={36} h={44} seed={810} />
      <Heart x={548} y={116} s={1.2} seed={820} />
      <Thought x={704} y={84} rx={58} ry={40} tx={622} ty={60} seed={830} />
      <Box x={680} bottom={104} w={28} h={34} seed={840} />
      <Tag1 x={706} y={86} w={46} seed={850} size={11}>
        $$$
      </Tag1>
      <Person x={b} y={g} h={h} look={SHOPPER} arms={["down", "down"]} seed={860} />
      <SketchArrow pts={rp([[640, 196], [700, 196]])} seed={870} width={1} head={6} />
    </SketchFrame>
  );
}

/* ==========================================================================
   Four Functions of Attitudes
   ========================================================================== */

/** An umbrella: canopy centred over (x, y), the handle hanging to (x, y + l). */
function Umbrella({ x, y, r = 44, l = 70, seed, fill = SK.teal }: { x: number; y: number; r?: number; l?: number; seed: number; fill?: string }) {
  const arc: Pt[] = Array.from({ length: 13 }, (_, i) => {
    const a = Math.PI + (i / 12) * Math.PI;
    return [x + Math.cos(a) * r, y + Math.sin(a) * r * 0.62] as Pt;
  });
  const scallops: Pt[] = [];
  for (let k = 0; k < 4; k++) {
    const x0 = x + r - (k * 2 * r) / 4;
    const x1 = x + r - ((k + 1) * 2 * r) / 4;
    scallops.push(...curvePts([x0, y], [(x0 + x1) / 2, y - r * 0.16], [x1, y], 5).slice(k === 0 ? 0 : 1));
  }
  const canopy = rp([...arc, ...scallops]);
  return (
    <g>
      <Wash pts={canopy} seed={seed} fill={fill} opacity={0.7} />
      <InkLine pts={canopy} seed={seed + 1} closed />
      <InkLine pts={rp([[x, y - r * 0.62], [x, y + l], ...curvePts([x, y + l], [x + 2, y + l + 9], [x + 9, y + l + 6], 4).slice(1)])} seed={seed + 2} width={1.2} />
      <BrandBadge x={x} y={r2(y - r * 0.32)} r={8} seed={seed + 3} />
    </g>
  );
}

/** Rain: short slanted strokes, kept clear of a box (x0..x1 above y1). */
function Rain({ x0, x1, y0, y1, seed, n = 18, clear }: { x0: number; x1: number; y0: number; y1: number; seed: number; n?: number; clear?: [number, number] }) {
  const rnd = seeded(seed);
  const drops: Pt[] = [];
  let i = 0;
  while (drops.length < n && i < n * 6) {
    i++;
    const x = x0 + rnd() * (x1 - x0);
    const y = y0 + rnd() * (y1 - y0);
    if (clear && x > clear[0] && x < clear[1]) continue;
    drops.push([r2(x), r2(y)]);
  }
  return (
    <g>
      {drops.map(([x, y], k) => (
        <InkLine key={k} pts={rp([[x, y], [x - 3, y + 9]])} seed={seed + 10 + k} width={0.8} amp={0.2} color={SK.charcoal} />
      ))}
    </g>
  );
}

/** Utilitarian: the brand's umbrella keeps its owner dry in the rain. */
export function UtilitarianPlate() {
  const g = 196;
  const h = 150;
  const x = 120;
  const hand = handAt(x, g, h, "hold", 1);
  return (
    <SketchFrame
      id="sk-utilitarian"
      width={240}
      height={214}
      label="Rain falls all around a shopper who stays dry under a teal umbrella carrying the brand badge."
    >
      <Backwash cx={120} cy={112} rx={112} ry={98} seed={900} />
      <Rain x0={12} x1={228} y0={14} y1={176} seed={910} n={24} clear={[46, 196]} />
      <Ground x0={30} x1={210} y={g} seed={901} />
      <Person x={x} y={g} h={h} look={SHOPPER} arms={["down", "hold"]} seed={920} />
      <Umbrella x={hand[0]} y={46} r={58} l={r2(hand[1] - 46)} seed={930} />
    </SketchFrame>
  );
}

/** A leaf, stem at (x, y), pointing up-right; `s` scales it (about 20 tall). */
function Leaf({ x, y, s = 1, seed }: { x: number; y: number; s?: number; seed: number }) {
  const blade = at(x, y, [[0, 0], [-6, -8], [-5, -16], [2, -21], [9, -19], [8, -10], [3, -3]], s);
  return (
    <g>
      <Wash pts={blade} seed={seed} fill={SK.teal} opacity={0.75} dx={1} dy={0.5} />
      <InkLine pts={blade} seed={seed + 1} width={1} closed />
      <InkLine pts={at(x, y, [[-1, 3], [1, -6], [5, -17]], s)} seed={seed + 2} width={0.8} />
    </g>
  );
}

/**
 * Value-expressive: a closed laptop lid covered in its owner's stickers, a
 * leaf, a bicycle, a mountain and a sun, showing what the owner stands for.
 */
export function ValueExpressivePlate() {
  const lid = sharp(rp([[22, 30], [218, 30], [218, 172], [22, 172]]), true, 8);
  const disc = (x: number, y: number, r: number, seed: number, fill: string) => {
    const pts = rp(blobPts(x, y, r, r, seed, 14, 0.04));
    return (
      <g>
        <Paper pts={pts} seed={seed} />
        <Wash pts={pts} seed={seed + 1} fill={fill} opacity={0.35} dx={0.5} dy={0.4} />
        <InkLine pts={pts} seed={seed + 2} width={1} closed />
      </g>
    );
  };
  const wheel = (x: number, y: number, seed: number) => <InkLine pts={rp(blobPts(x, y, 8, 8, seed, 12, 0.03))} seed={seed} width={1} closed />;
  const sun = rp(blobPts(176, 136, 8, 8, 1060, 12, 0.04));
  return (
    <SketchFrame
      id="sk-value-expressive"
      width={240}
      height={214}
      label="A closed laptop seen from the front, covered in its owner's stickers: a large teal leaf, a bicycle, a mountain and a sun."
    >
      <Backwash cx={120} cy={104} rx={112} ry={94} seed={1000} />
      <Wash pts={lid} seed={1001} fill={SK.charcoal} opacity={0.55} />
      <InkLine pts={lid} seed={1002} closed />
      {(() => {
        const base = sharp(rp([[14, 172], [226, 172], [232, 184], [8, 184]]), true, 2);
        return (
          <>
            <Wash pts={base} seed={1003} fill={SK.stone} opacity={0.9} dx={0} dy={0} />
            <InkLine pts={base} seed={1004} width={1.1} closed />
          </>
        );
      })()}

      {disc(76, 92, 38, 1010, SK.teal)}
      <Leaf x={70} y={118} s={2.2} seed={1015} />

      {disc(170, 66, 28, 1020, SK.sky)}
      {wheel(156, 72, 1025)}
      {wheel(184, 72, 1026)}
      <InkLine pts={rp([[156, 72], [166, 56], [178, 56], [184, 72]])} seed={1027} width={1} />
      <InkLine pts={rp([[166, 56], [170, 72], [178, 56]])} seed={1028} width={0.9} />

      <g>
        {(() => {
          const card = sharp(rp([[104, 136], [148, 136], [148, 164], [104, 164]]), true, 2);
          const peak = rp([[108, 160], [122, 142], [130, 152], [136, 146], [145, 160]]);
          return (
            <>
              <Paper pts={card} seed={1040} />
              <Wash pts={peak} seed={1041} fill={SK.earth} opacity={0.8} dx={0} dy={0} />
              <InkLine pts={card} seed={1042} width={1} closed />
              <InkLine pts={peak} seed={1043} width={1} />
            </>
          );
        })()}
      </g>

      {disc(176, 136, 25, 1050, SK.blush)}
      <Wash pts={sun} seed={1061} fill={SK.ochre} opacity={0.8} dx={0.5} dy={0.4} />
      <InkLine pts={sun} seed={1062} width={1} closed />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return <InkLine key={i} pts={rp([[176 + Math.cos(a) * 11, 136 + Math.sin(a) * 11], [176 + Math.cos(a) * 16, 136 + Math.sin(a) * 16]])} seed={1063 + i} width={0.9} amp={0.1} />;
      })}
    </SketchFrame>
  );
}

/** Ego-defensive: a quick spray of deodorant while two people look on. */
export function EgoDefensivePlate() {
  const g = 196;
  const h = 176;
  const x = 92;
  const s = h / 200;
  const pit: Pt = [r2(x - 13 * s), r2(g - 156 * s)];
  const hand = handAt(x, g, h, "across", 1);
  const cx = hand[0] - 2;
  const top = hand[1] - 20;
  const can = sharp(rp([[cx - 4.5, top], [cx + 4.5, top], [cx + 4.5, hand[1] + 6], [cx - 4.5, hand[1] + 6]]), true, 1.2);
  const cap = sharp(rp([[cx - 3, top - 6], [cx + 3, top - 6], [cx + 3, top], [cx - 3, top]]), true, 0.8);
  const nozzle: Pt = [cx + 3, top - 4];
  const ang = Math.atan2(pit[1] - nozzle[1], pit[0] - nozzle[0]);
  const ray = (da: number, l: number): Pt[] => rp([[nozzle[0] + Math.cos(ang + da) * 4, nozzle[1] + Math.sin(ang + da) * 4], [nozzle[0] + Math.cos(ang + da) * l, nozzle[1] + Math.sin(ang + da) * l]]);
  const others: Look[] = [
    { hair: "short", hairTone: SK.charcoal, wear: SK.earth, legs: SK.tan, outfit: "jacket" },
    { hair: "long", hairTone: SK.tan, skin: SK.camel, skinOpacity: 0.6, wear: SK.charcoal, legs: SK.charcoal },
  ];
  return (
    <SketchFrame
      id="sk-ego-defensive"
      width={240}
      height={214}
      label="A shopper raises one arm and sprays deodorant under it, while two people stand close by, one whispering to the other."
    >
      <Backwash cx={120} cy={112} rx={112} ry={98} seed={1100} />
      <Ground x0={10} x1={226} y={g} seed={1101} />
      {others.map((look, i) => (
        <Person key={i} x={170 + i * 36} y={g} h={128} look={look} arms={["down", "down"]} flip seed={1110 + i * 40} />
      ))}
      <SpeechBubble x={190} y={34} w={30} h={20} tx={178} ty={52} seed={1190} />
      {[184, 190, 196].map((dx, k) => (
        <InkLine key={k} pts={rp(blobPts(dx, 34, 1.1, 1.1, 1195 + k, 6, 0.2))} seed={1195 + k} width={0.9} closed />
      ))}
      <Person x={x} y={g} h={h} look={SHOPPER} arms={["up", "across"]} seed={1200} />
      <Wash pts={can} seed={1210} fill={SK.charcoal} opacity={0.55} />
      <InkLine pts={can} seed={1211} width={1} closed />
      <InkLine pts={cap} seed={1212} width={0.9} closed />
      {[-0.35, 0, 0.35].map((da, k) => (
        <InkLine key={k} pts={ray(da, 13)} seed={1220 + k} width={0.7} amp={0.2} />
      ))}
    </SketchFrame>
  );
}

/** A small pack, tilted by `tilt` degrees about its base centre. */
function TiltPack({ x, bottom, w = 18, h = 30, tilt = 0, seed, fill }: { x: number; bottom: number; w?: number; h?: number; tilt?: number; seed: number; fill?: string }) {
  return (
    <g transform={`rotate(${tilt} ${x} ${bottom})`}>
      <Pack x={x} bottom={bottom} w={w} h={h} seed={seed} fill={fill} />
    </g>
  );
}

/** A small ink cross: ruled out. */
function Cross({ x, y, r = 4, seed }: { x: number; y: number; r?: number; seed: number }) {
  return (
    <g>
      <InkLine pts={rp([[x - r, y - r], [x + r, y + r]])} seed={seed} width={1.2} amp={0.2} />
      <InkLine pts={rp([[x + r, y - r], [x - r, y + r]])} seed={seed + 1} width={1.2} amp={0.2} />
    </g>
  );
}

/** Knowledge: a jumble of packs, sorted in the shopper's mind into good and bad. */
export function KnowledgePlate() {
  const g = 196;
  const jumble: [number, number, number, string | undefined][] = [
    [26, g, -14, SK.camel],
    [46, g, 8, undefined],
    [66, g, -4, SK.sky],
    [36, g - 30, 20, SK.earth],
    [58, g - 31, -16, SK.camel],
    [86, g, 12, SK.earth],
  ];
  const row = (y: number, fills: (string | undefined)[], mark: "tick" | "cross", seed: number) =>
    fills.map((f, i) => (
      <g key={i}>
        <Pack x={78 + i * 22} bottom={y} w={14} h={19} seed={seed + i * 4} fill={f} />
        {mark === "tick" ? (
          <Tick2 x={78 + i * 22} y={y + 7} s={0.4} seed={seed + 50 + i} />
        ) : (
          <Cross x={78 + i * 22} y={y + 7} r={3} seed={seed + 50 + i * 2} />
        )}
      </g>
    ));
  return (
    <SketchFrame
      id="sk-knowledge"
      width={240}
      height={214}
      label="On the left, a jumbled heap of different packs. A shopper beside it thinks of the same packs sorted into two neat rows: the top row ticked, the bottom row crossed out."
    >
      <Backwash cx={120} cy={112} rx={112} ry={98} seed={1300} />
      <Ground x0={10} x1={226} y={g} seed={1301} />
      {jumble.map(([x, b, t, f], i) => (
        <TiltPack key={i} x={x} bottom={b} tilt={t} fill={f} seed={1310 + i * 4} />
      ))}
      <Thought x={100} y={58} rx={50} ry={42} tx={198} ty={82} seed={1340} />
      {row(42, [SK.camel, SK.sky, undefined], "tick", 1350)}
      {row(78, [SK.earth, SK.camel, SK.sky], "cross", 1420)}
      <Person x={210} y={g} h={140} look={SHOPPER} arms={["chin", "down"]} flip seed={1500} />
    </SketchFrame>
  );
}

/* ==========================================================================
   How Attitudes Form: Three Hierarchies
   ========================================================================== */

type Step = "think" | "brief" | "feel" | "act" | "explain";

/** A small thought cloud with no tail: cognition, the same in every strip. */
function MiniThought({ x, y, r = 22, seed }: { x: number; y: number; r?: number; seed: number }) {
  const c = cloudPts(x, y, r, r * 0.72, r < 16 ? 8 : 10);
  return (
    <g>
      <Paper pts={c} seed={seed} />
      <InkLine pts={c} seed={seed + 1} width={1.1} closed />
    </g>
  );
}

const STEP_WORD: Record<Step, string> = {
  think: "THINK",
  brief: "THINK BRIEFLY",
  feel: "FEEL",
  act: "ACT",
  explain: "EXPLAIN",
};

/**
 * One hierarchy as a strip: the product, then its three steps in order, each
 * drawn with the week's mark (cloud = think, heart = feel, bag = act).
 */
function HierarchyStrip({ id, label, product, steps, seed }: { id: string; label: string; product: React.ReactNode; steps: [Step, Step, Step]; seed: number }) {
  const xs = [176, 304, 432];
  const cy = 44;
  return (
    <SketchFrame id={id} width={500} height={104} label={label}>
      <Backwash cx={250} cy={52} rx={246} ry={50} seed={seed} />
      {product}
      <SketchArrow pts={rp([[96, cy], [134, cy]])} seed={seed + 1} width={1.1} head={7} />
      {steps.map((st, i) => {
        const x = xs[i];
        return (
          <g key={i}>
            {st === "think" || st === "explain" ? <MiniThought x={x} y={cy} r={24} seed={seed + 10 + i * 10} /> : null}
            {st === "brief" ? <MiniThought x={x} y={cy + 6} r={13} seed={seed + 10 + i * 10} /> : null}
            {st === "feel" ? <Heart x={x} y={cy + 2} s={1.6} seed={seed + 10 + i * 10} /> : null}
            {st === "act" ? <Bag x={x} y={cy - 24} w={34} fill={SK.teal} seed={seed + 10 + i * 10} /> : null}
            <SketchText x={x} y={94} anchor="middle" size={10}>
              {STEP_WORD[st]}
            </SketchText>
            {i < 2 ? <SketchArrow pts={rp([[x + 40, cy], [xs[i + 1] - 40, cy]])} seed={seed + 40 + i} width={1.1} head={7} /> : null}
          </g>
        );
      })}
    </SketchFrame>
  );
}

/** Standard learning: a car, thought through, then felt, then bought. */
export function StandardHierarchy() {
  return (
    <HierarchyStrip
      id="sk-standard"
      seed={1600}
      steps={["think", "feel", "act"]}
      label="A car, then a thought cloud (THINK), a heart (FEEL) and a teal bag (ACT), in that order."
      product={<Car2 x={50} y={66} s={0.5} seed={1690} />}
    />
  );
}

/** Low involvement: a can of soda, a brief thought, bought, then a feeling. */
export function LowInvolvementHierarchy() {
  return (
    <HierarchyStrip
      id="sk-low-involvement"
      seed={1700}
      steps={["brief", "act", "feel"]}
      label="A soda can, then a small thought cloud (THINK BRIEFLY), a teal bag (ACT) and a heart (FEEL), in that order."
      product={<Can4 x={50} y={70} w={30} h={46} seed={1790} />}
    />
  );
}

/** Experiential: a perfume, felt first, bought, then explained. */
export function ExperientialHierarchy() {
  return (
    <HierarchyStrip
      id="sk-experiential"
      seed={1800}
      steps={["feel", "act", "explain"]}
      label="A perfume bottle, then a heart (FEEL), a teal bag (ACT) and a thought cloud (EXPLAIN), in that order."
      product={<Perfume1 x={50} bottom={76} s={0.8} seed={1890} />}
    />
  );
}

/* ==========================================================================
   Who Delivers the Message
   ========================================================================== */

/** A graduation cap (mortarboard) sitting on a head whose top is (x, y): expertise. */
function Mortarboard({ x, y, s = 1, seed }: { x: number; y: number; s?: number; seed: number }) {
  const board = sharp(at(x, y, [[-16, -6], [0, -12], [16, -6], [0, 0]], s), true, 1);
  const cap = at(x, y, [[-8, -3], [-8, 5], [8, 5], [8, -3]], s);
  return (
    <g>
      <Wash pts={cap} seed={seed} fill={SK.charcoal} opacity={0.8} dx={0.4} dy={0.4} />
      <InkLine pts={cap} seed={seed + 1} width={1} closed />
      <Wash pts={board} seed={seed + 2} fill={SK.charcoal} opacity={0.85} dx={0.5} dy={0.3} />
      <InkLine pts={board} seed={seed + 3} width={1} closed />
      <InkLine pts={at(x, y, [[0, -6], [-11, -3], [-12, 8]], s)} seed={seed + 4} width={0.8} color={SK.ochre} />
    </g>
  );
}

const SOURCE: Look = { hair: "short", hairTone: SK.brown, skin: SK.tan, skinOpacity: 0.55, wear: SK.earth, legs: SK.charcoal, outfit: "jacket" };

/**
 * Expertise: the brand's pack carries an expert's seal, a rosette with the
 * graduation cap the week uses for expertise.
 */
export function ExpertSource() {
  const pack = sharp(rp([[70, 34], [168, 34], [168, 196], [70, 196]]), true, 3);
  const sx = 186;
  const sy = 92;
  const petals = rp(Array.from({ length: 24 }, (_, i) => {
    const a = (i / 24) * Math.PI * 2;
    const r = i % 2 ? 30 : 36;
    return [sx + Math.cos(a) * r, sy + Math.sin(a) * r] as Pt;
  }));
  const inner = rp(blobPts(sx, sy, 24, 24, 1940, 14, 0.03));
  const tails = [rp([[sx - 14, sy + 26], [sx - 24, sy + 70], [sx - 14, sy + 62], [sx - 6, sy + 72], [sx - 2, sy + 30]]), rp([[sx + 2, sy + 30], [sx + 8, sy + 72], [sx + 14, sy + 62], [sx + 26, sy + 70], [sx + 14, sy + 26]])];
  return (
    <SketchFrame
      id="sk-expert"
      width={300}
      height={214}
      label="The brand's pack with a large rosette seal pinned to it; in the middle of the seal is a graduation cap, the mark of expertise."
    >
      <Backwash cx={150} cy={110} rx={140} ry={98} seed={1900} />
      <Wash pts={pack} seed={1901} fill={SK.camel} opacity={0.6} />
      <InkLine pts={pack} seed={1902} closed />
      <BrandBadge x={104} y={78} r={20} seed={1903} />
      {[132, 148, 164].map((y, i) => (
        <InkLine key={y} pts={rp([[84, y], [i === 1 ? 124 : 140, y]])} seed={1905 + i} width={0.8} amp={0.25} />
      ))}
      {tails.map((t, i) => (
        <g key={i}>
          <Wash pts={t} seed={1920 + i} fill={SK.tan} opacity={0.7} dx={0.5} dy={0.4} />
          <InkLine pts={t} seed={1922 + i} width={1} closed />
        </g>
      ))}
      <Wash pts={petals} seed={1930} fill={SK.ochre} opacity={0.85} dx={0.6} dy={0.4} />
      <InkLine pts={petals} seed={1931} width={1} closed />
      <Paper pts={inner} seed={1941} />
      <InkLine pts={inner} seed={1942} width={1} closed />
      <Mortarboard x={sx} y={sy + 6} s={1.15} seed={1950} />
    </SketchFrame>
  );
}

/**
 * Trustworthiness: an honest review card for the brand. Four stars of five,
 * one good point ticked and one weak point owned up to, crossed.
 */
export function TrustworthySource() {
  const card = sharp(rp([[40, 26], [262, 26], [262, 190], [40, 190]]), true, 4);
  return (
    <SketchFrame
      id="sk-trustworthy"
      width={300}
      height={214}
      label="An honest review card for the brand: the brand's badge, four of five stars filled, one point ticked and one point crossed, and a signature at the bottom."
    >
      <Backwash cx={150} cy={108} rx={140} ry={98} seed={2000} />
      <g transform="rotate(-3 151 108)">
        <Paper pts={card} seed={2001} />
        <InkLine pts={card} seed={2002} closed />
        <BrandBadge x={74} y={60} r={18} seed={2003} />
        <Stars x={112} y={60} n={4} of={5} r={10} gap={26} seed={2010} />
        <Tick2 x={70} y={106} s={0.7} seed={2040} />
        <InkLine pts={rp([[86, 106], [226, 106]])} seed={2041} width={0.9} amp={0.3} />
        <Cross x={70} y={134} r={5.5} seed={2042} />
        <InkLine pts={rp([[86, 134], [196, 134]])} seed={2044} width={0.9} amp={0.3} />
        <InkLine pts={curvePts([150, 172], [176, 150], [200, 168], 8).concat(curvePts([200, 168], [214, 180], [236, 162], 6).slice(1))} seed={2050} width={1} amp={0.4} />
      </g>
    </SketchFrame>
  );
}

/**
 * Attractiveness in three scenes. FAMILIARITY: the same face on a screen and
 * a poster, again and again. LIKABILITY: a warm wave, and a heart in return.
 * SIMILARITY: a source who looks just like the shopper.
 */
export function Attractiveness() {
  const g = 196;
  const h = 150;
  const poster = sharp(rp([[118, 54], [168, 54], [168, 130], [118, 130]]), true, 2);
  return (
    <SketchFrame
      id="sk-attractiveness"
      width={800}
      height={226}
      label="Three scenes. FAMILIARITY: a shopper looks at the same spokesperson on a wall screen and on a poster. LIKABILITY: the spokesperson waves warmly and the shopper answers with a heart. SIMILARITY: the spokesperson, holding the brand's pack, has the same hair and coat as the shopper facing them."
    >
      <Backwash cx={130} cy={118} rx={124} ry={100} seed={2100} />
      <Backwash cx={400} cy={118} rx={124} ry={100} seed={2101} />
      <Backwash cx={670} cy={118} rx={124} ry={100} seed={2102} />

      {/* familiarity */}
      <Ground x0={14} x1={246} y={g} seed={2110} />
      <Screen x={14} y={34} w={92} h={66} seed={2120}>
        <Person x={60} y={94} h={54} look={SOURCE} arms={["down", "down"]} seed={2130} />
      </Screen>
      <Paper pts={poster} seed={2140} />
      <InkLine pts={poster} seed={2141} closed />
      <Person x={143} y={124} h={62} look={SOURCE} arms={["down", "down"]} seed={2150} />
      <Person x={214} y={g} h={h} look={SHOPPER} arms={["hip", "down"]} flip seed={2160} />

      {/* likability */}
      <Ground x0={284} x1={516} y={g} seed={2200} />
      <Person x={344} y={g} h={h} look={SOURCE} arms={["down", "wave"]} seed={2210} />
      <Person x={452} y={g} h={h} look={SHOPPER} arms={["down", "down"]} flip seed={2220} />
      <Heart x={420} y={58} s={1.2} seed={2230} />

      {/* similarity */}
      <Ground x0={554} x1={786} y={g} seed={2300} />
      <Person x={614} y={g} h={h} look={{ ...SHOPPER, hairTone: SK.tan }} arms={["down", "carry"]} seed={2310} />
      <Pack x={r2(handAt(614, g, h, "carry", 1)[0] + 12)} bottom={r2(handAt(614, g, h, "carry", 1)[1] + 12)} w={22} h={34} seed={2320} badge />
      <Person x={726} y={g} h={h} look={SHOPPER} arms={["hip", "down"]} flip seed={2330} />

      {[
        [130, "FAMILIARITY"],
        [400, "LIKABILITY"],
        [670, "SIMILARITY"],
      ].map(([x, t]) => (
        <SketchText key={t as string} x={x as number} y={218} anchor="middle" size={10.5}>
          {t}
        </SketchText>
      ))}
    </SketchFrame>
  );
}

/* ==========================================================================
   AI as a Message Source
   ========================================================================== */

/** A bubble of advice that turned out wrong: a line of advice crossed out. */
function WrongAdvice({ x, y, tx, ty, seed }: { x: number; y: number; tx: number; ty: number; seed: number }) {
  return (
    <g>
      <SpeechBubble x={x} y={y} w={62} h={36} tx={tx} ty={ty} seed={seed} />
      <InkLine pts={rp([[x - 20, y], [x + 4, y]])} seed={seed + 2} width={0.9} amp={0.3} />
      <Cross x={x + 16} y={y} r={5} seed={seed + 3} />
    </g>
  );
}

/**
 * The same mistake, two advisers. The AI's wrong advice sends the shopper
 * away; the person's wrong advice is forgiven, and the shopper stays.
 */
export function SameMistake() {
  const g = 188;
  const h = 132;
  return (
    <SketchFrame
      id="sk-same-mistake"
      width={400}
      height={206}
      label="Two scenes. Left: an AI agent's advice is crossed out as wrong, and the shopper turns and walks away from it. Right: a person's advice is crossed out as just as wrong, and the shopper still stands facing them, listening."
    >
      <Backwash cx={100} cy={106} rx={96} ry={92} seed={2400} />
      <Backwash cx={300} cy={106} rx={96} ry={92} seed={2401} />
      <Ground x0={14} x1={190} y={g} seed={2402} />
      <Ground x0={212} x1={388} y={g} seed={2403} />

      <Agent x={50} y={g} s={0.9} seed={2410} />
      <WrongAdvice x={80} y={62} tx={58} ty={110} seed={2420} />
      <Person x={150} y={g} h={h} look={SHOPPER} arms={["hip", "down"]} seed={2430} />
      <SketchArrow pts={rp([[162, 168], [188, 168]])} seed={2440} width={1} head={5} />

      <Person x={250} y={g} h={h} look={SOURCE} arms={["down", "shrug"]} seed={2450} />
      <WrongAdvice x={274} y={34} tx={256} ty={64} seed={2460} />
      <Person x={344} y={g} h={h} look={SHOPPER} arms={["down", "down"]} flip seed={2470} />
    </SketchFrame>
  );
}

/** A bubble holding one number: a numerical estimate. */
function Estimate({ x, y, tx, ty, n, seed }: { x: number; y: number; tx: number; ty: number; n: string; seed: number }) {
  return (
    <g>
      <SpeechBubble x={x} y={y} w={56} h={34} tx={tx} ty={ty} seed={seed} />
      <SketchText x={x} y={r2(y + 5)} anchor="middle" size={14}>
        {n}
      </SketchText>
    </g>
  );
}

/** Two estimates, one from a person and one from an AI; the shopper follows the AI's. */
export function FollowTheEstimate() {
  const g = 188;
  const h = 132;
  const hand = handAt(196, g, h, "carry", 1);
  const card = sharp(rp([[hand[0] - 2, hand[1] - 30], [hand[0] + 40, hand[1] - 30], [hand[0] + 40, hand[1] + 2], [hand[0] - 2, hand[1] + 2]]), true, 2);
  return (
    <SketchFrame
      id="sk-follow-estimate"
      width={400}
      height={206}
      label="A person on the left gives an estimate of 120; an AI agent on the right gives an estimate of 140. The shopper between them faces the AI agent and holds a card with 140 written on it, underlined in teal."
    >
      <Backwash cx={200} cy={106} rx={194} ry={92} seed={2500} />
      <Ground x0={20} x1={380} y={g} seed={2501} />
      <Person x={60} y={g} h={h} look={SOURCE} arms={["down", "down"]} seed={2510} />
      <Estimate x={92} y={36} tx={68} ty={58} n="120" seed={2520} />
      <Person x={196} y={g} h={h} look={SHOPPER} arms={["down", "carry"]} seed={2530} />
      <Paper pts={card} seed={2532} />
      <InkLine pts={card} seed={2533} width={1} closed />
      <SketchText x={r2(hand[0] + 19)} y={r2(hand[1] - 10)} anchor="middle" size={13}>
        140
      </SketchText>
      <InkLine pts={rp([[hand[0] + 6, hand[1] - 5], [hand[0] + 32, hand[1] - 5]])} seed={2534} width={2.2} amp={0.3} color={SK.teal} />
      <Agent x={330} y={g} s={0.9} seed={2540} />
      <Estimate x={312} y={60} tx={326} ty={104} n="140" seed={2550} />
    </SketchFrame>
  );
}

/** A wrapped gift standing on (x, bottom): a camel box, a tan ribbon and bow. */
function Gift({ x, bottom, w = 40, h = 32, seed }: { x: number; bottom: number; w?: number; h?: number; seed: number }) {
  const box = sharp(rp([[x - w / 2, bottom - h], [x + w / 2, bottom - h], [x + w / 2, bottom], [x - w / 2, bottom]]), true, 1.5);
  const t = bottom - h;
  return (
    <g>
      <Wash pts={box} seed={seed} fill={SK.camel} opacity={0.6} />
      <InkLine pts={box} seed={seed + 1} closed />
      <Wash pts={rp([[x - 3, t], [x + 3, t], [x + 3, bottom], [x - 3, bottom]])} seed={seed + 2} fill={SK.tan} opacity={0.8} dx={0} dy={0} />
      <InkLine pts={rp([[x - 3, t], [x - 3, bottom]])} seed={seed + 3} width={0.8} />
      <InkLine pts={rp([[x + 3, t], [x + 3, bottom]])} seed={seed + 4} width={0.8} />
      <InkLine pts={rp([[x, t], [x - 12, t - 10], [x - 14, t - 3], [x, t]])} seed={seed + 5} width={1} />
      <InkLine pts={rp([[x, t], [x + 12, t - 10], [x + 14, t - 3], [x, t]])} seed={seed + 6} width={1} />
    </g>
  );
}

/** A loan statement: a paper slip with the monthly payment worked out. */
function LoanSlip({ x, y, seed }: { x: number; y: number; seed: number }) {
  const slip = sharp(rp([[x - 37, y - 22], [x + 37, y - 22], [x + 37, y + 22], [x - 37, y + 22]]), true, 2);
  return (
    <g>
      <Paper pts={slip} seed={seed} />
      <InkLine pts={slip} seed={seed + 1} closed />
      {[-12, -4].map((dy, i) => (
        <InkLine key={dy} pts={rp([[x - 27, y + dy], [x + (i ? 8 : 24), y + dy]])} seed={seed + 2 + i} width={0.8} amp={0.3} />
      ))}
      <SketchText x={x} y={r2(y + 14)} anchor="middle" size={11}>
        $412/MO
      </SketchText>
    </g>
  );
}

/** Who is trusted depends on the task: the AI for the loan, a friend for the gift. */
export function ObjectiveSubjective() {
  const g = 178;
  return (
    <SketchFrame
      id="sk-objective-subjective"
      width={400}
      height={206}
      label="Two scenes. OBJECTIVE: a loan statement showing $412 a month, with an AI agent and a person below it; the AI agent is ticked. SUBJECTIVE: a wrapped gift, with an AI agent and a person below it; the person is ticked."
    >
      <Backwash cx={100} cy={102} rx={96} ry={94} seed={2600} />
      <Backwash cx={300} cy={102} rx={96} ry={94} seed={2601} />

      <LoanSlip x={100} y={40} seed={2610} />
      <Ground x0={24} x1={176} y={g} seed={2620} />
      <Agent x={66} y={g} s={0.75} seed={2630} />
      <Tick2 x={66} y={92} s={0.9} seed={2640} />
      <Person x={138} y={g} h={100} look={SOURCE} arms={["down", "down"]} flip seed={2650} />

      <Gift x={300} bottom={58} seed={2660} />
      <Ground x0={224} x1={376} y={g} seed={2670} />
      <Agent x={266} y={g} s={0.75} seed={2680} />
      <Person x={338} y={g} h={100} look={SOURCE} arms={["down", "down"]} flip seed={2690} />
      <Tick2 x={338} y={68} s={0.9} seed={2700} />

      <SketchText x={100} y={200} anchor="middle" size={10.5}>
        OBJECTIVE
      </SketchText>
      <SketchText x={300} y={200} anchor="middle" size={10.5}>
        SUBJECTIVE
      </SketchText>
    </SketchFrame>
  );
}

/** A small shop front standing on (x, bottom): awning, window and door. */
function Storefront({ x, bottom, w = 96, h = 92, seed }: { x: number; bottom: number; w?: number; h?: number; seed: number }) {
  const l = x - w / 2;
  const r = x + w / 2;
  const t = bottom - h;
  const wall = sharp(rp([[l, t + 18], [r, t + 18], [r, bottom], [l, bottom]]), true, 2);
  const awning = sharp(rp([[l - 6, t + 2], [r + 6, t + 2], [r + 6, t + 22], [l - 6, t + 22]]), true, 2);
  const door = sharp(rp([[x + 8, bottom - 44], [x + 30, bottom - 44], [x + 30, bottom], [x + 8, bottom]]), true, 1.5);
  const win = sharp(rp([[l + 10, bottom - 50], [x - 4, bottom - 50], [x - 4, bottom - 18], [l + 10, bottom - 18]]), true, 1.5);
  return (
    <g>
      <Wash pts={wall} seed={seed} fill={SK.earth} opacity={0.55} />
      <InkLine pts={wall} seed={seed + 1} closed />
      <Wash pts={awning} seed={seed + 2} fill={SK.camel} opacity={0.7} />
      <InkLine pts={awning} seed={seed + 3} closed />
      {[1, 2, 3, 4, 5].map((k) => {
        const ax = r2(l - 6 + ((w + 12) * k) / 6);
        return <InkLine key={k} pts={rp([[ax, t + 2], [ax, t + 22]])} seed={seed + 4 + k} width={0.8} />;
      })}
      <Wash pts={win} seed={seed + 12} fill={SK.sky} opacity={0.7} dx={0.6} dy={0.4} />
      <InkLine pts={win} seed={seed + 13} width={1} closed />
      <Wash pts={door} seed={seed + 14} fill={SK.leather} opacity={0.6} dx={0.6} dy={0.4} />
      <InkLine pts={door} seed={seed + 15} width={1} closed />
    </g>
  );
}

/**
 * An expert AI, but whose side is it on? The agent in a graduation cap
 * stands between the shopper and the store; its arrows point both ways.
 */
export function WhoseInterests() {
  const g = 188;
  const ax = 200;
  const s = 1;
  return (
    <SketchFrame
      id="sk-whose-interests"
      width={400}
      height={206}
      label="An AI agent wearing a graduation cap stands between a shopper on the left and a store on the right. Arrows from the agent point to both, with a question mark above: whose interests does it serve?"
    >
      <Backwash cx={200} cy={106} rx={194} ry={92} seed={2800} />
      <Ground x0={20} x1={384} y={g} seed={2801} />
      <Person x={60} y={g} h={140} look={SHOPPER} arms={["down", "down"]} seed={2810} />
      <Agent x={ax} y={g} s={s} seed={2820} />
      <Mortarboard x={ax} y={r2(g - 78 * s - 4)} s={1.25} seed={2830} />
      <Storefront x={330} bottom={g} seed={2840} />
      <SketchArrow pts={curvePts([172, 120], [134, 100], [96, 112], 10)} seed={2850} width={1.1} head={7} />
      <SketchArrow pts={curvePts([228, 120], [250, 104], [270, 120], 10)} seed={2852} width={1.1} head={7} />
      <SketchText x={ax} y={68} anchor="middle" size={26} serif>
        ?
      </SketchText>
    </SketchFrame>
  );
}

/* ==========================================================================
   Framing
   ========================================================================== */

/**
 * One poster for the same product and the same $200, framed two ways: a
 * gain (save it, a cheerful owner) or a loss (lose it, a worried non-owner).
 */
function FramePoster({ id, gain, seed }: { id: string; gain: boolean; seed: number }) {
  const sheet = sharp(rp([[60, 14], [340, 14], [340, 206], [60, 206]]), true, 3);
  const g = 192;
  const h = 124;
  const px = gain ? 156 : 236;
  const hand = handAt(px, g, h, "carry", 1);
  return (
    <SketchFrame
      id={id}
      width={400}
      height={220}
      label={
        gain
          ? "A poster headed SAVE $200 A YEAR WITH IT: a cheerful owner waves and holds the brand's box."
          : "A poster headed LOSE $200 A YEAR WITHOUT IT: a worried shopper with a hand to the chin looks back at the brand's box, a broken heart between them."
      }
    >
      <Backwash cx={200} cy={112} rx={196} ry={104} seed={seed} />
      <Paper pts={sheet} seed={seed + 1} />
      <InkLine pts={sheet} seed={seed + 2} closed />
      <SketchText x={200} y={46} anchor="middle" size={20} serif>
        {gain ? "Save $200 a year with it" : "Lose $200 a year without it"}
      </SketchText>
      <InkLine pts={rp([[90, 60], [310, 60]])} seed={seed + 3} width={0.8} amp={0.3} />
      <InkLine pts={rp([[86, g], [314, g]])} seed={seed + 4} width={0.9} />
      {gain ? (
        <>
          <Person x={px} y={g} h={h} look={SHOPPER} arms={["wave", "carry"]} seed={seed + 10} />
          <Box x={r2(hand[0] + 14)} bottom={r2(hand[1] + 12)} w={30} h={34} seed={seed + 60} />
          <Heart x={238} y={100} s={1.1} seed={seed + 70} />
        </>
      ) : (
        <>
          <Box x={146} bottom={g} w={34} h={40} seed={seed + 60} />
          <Person x={px} y={g} h={h} look={SHOPPER} arms={["down", "chin"]} flip seed={seed + 10} />
          <Heart x={190} y={104} s={1.1} broken seed={seed + 70} />
        </>
      )}
    </SketchFrame>
  );
}

export function PositiveFrame() {
  return <FramePoster id="sk-positive-frame" gain seed={2900} />;
}

export function NegativeFrame() {
  return <FramePoster id="sk-negative-frame" gain={false} seed={3000} />;
}

/* ==========================================================================
   Measuring the Attitudes of AI Models (interactive)
   ========================================================================== */

/**
 * The probability each model assigns to the seven points of one attitude
 * item. SIMULATED: plausible spreads for two models, not results from any
 * study. Replace them with real models' probabilities when available.
 */
const SIM_MODELS = [
  { name: "MODEL A", pmf: [0.01, 0.03, 0.08, 0.2, 0.32, 0.26, 0.1], first: 2, seed: 11000 },
  { name: "MODEL B", pmf: [0.04, 0.12, 0.25, 0.3, 0.18, 0.08, 0.03], first: 4, seed: 12000 },
];

/** The k-th simulated answer (0–6) of model m: seeded, so server and client agree. */
function modelAnswer(m: number, k: number): number {
  const { pmf, first, seed } = SIM_MODELS[m];
  if (k === 0) return first;
  const u = seeded(seed + k)();
  let acc = 0;
  for (let i = 0; i < pmf.length; i++) {
    acc += pmf[i];
    if (u < acc) return i;
  }
  return pmf.length - 1;
}

const fmt1 = (n: number) => (Math.round(n * 10) / 10).toFixed(1);

/**
 * Ask two models the same seven-point item, once or many times. After one
 * ask, the answers can rank the models the wrong way round; as the asks add
 * up, each model's spread of answers settles toward the probabilities it
 * assigns, which "Read probabilities" lays over the bars.
 */
export function AskTwoModels() {
  const [asked, setAsked] = React.useState(1);
  const [probs, setProbs] = React.useState(false);
  const box = 60;
  const colX = (i: number) => 168 + i * 76;
  const rows = [40, 150];
  const band = 64;
  const data = SIM_MODELS.map((m, mi) => {
    const counts = [0, 0, 0, 0, 0, 0, 0];
    let sum = 0;
    for (let k = 0; k < asked; k++) {
      const a = modelAnswer(mi, k);
      counts[a]++;
      sum += a + 1;
    }
    const expected = m.pmf.reduce((acc, p, i) => acc + p * (i + 1), 0);
    return { counts, mean: sum / asked, latest: modelAnswer(mi, asked - 1), expected };
  });
  const top = Math.max(
    ...data.flatMap((d) => d.counts.map((c) => c / asked)),
    ...(probs ? SIM_MODELS.flatMap((m) => m.pmf) : [0]),
  );
  const hOf = (share: number) => r2((share / top) * band);
  const label = `Two AI models, A and B, answer the same item on a scale from 1 (strongly disagree) to 7 (strongly agree), asked ${asked} ${asked === 1 ? "time" : "times"} each. ${data
    .map((d, i) => `${SIM_MODELS[i].name}: latest answer ${d.latest + 1}, average ${fmt1(d.mean)}, answers per point ${d.counts.join(", ")}`)
    .join(". ")}.${probs ? ` Outlines show the probability each model assigns to each point; expected answers ${fmt1(data[0].expected)} and ${fmt1(data[1].expected)}.` : ""} The data are simulated.`;
  return (
    <>
      <SketchFrame id="sk-ask-two-models" width={800} height={256} label={label}>
        <Backwash cx={400} cy={130} rx={394} ry={124} seed={3100} />
        <SketchText x={24} y={26} size={11.5}>
          {`ASKED ${asked} ${asked === 1 ? "TIME" : "TIMES"}`}
        </SketchText>
        <SketchText x={colX(0)} y={26} size={11}>
          STRONGLY DISAGREE
        </SketchText>
        <SketchText x={colX(6) + box} y={26} anchor="end" size={11}>
          STRONGLY AGREE
        </SketchText>

        {data.map((d, mi) => {
          const y0 = rows[mi];
          const base = y0 + band + 8;
          const sd = 3200 + mi * 200;
          return (
            <g key={mi}>
              <SketchText x={72} y={y0 + 14} anchor="middle" size={11.5}>
                {SIM_MODELS[mi].name}
              </SketchText>
              <Agent x={72} y={base} s={0.62} seed={sd} />
              <InkLine pts={rp([[colX(0) - 8, base], [colX(6) + box + 8, base]])} seed={sd + 1} width={1} />
              {d.counts.map((c, i) => {
                const h = hOf(c / asked);
                const x0 = colX(i) + 6;
                const x1 = colX(i) + box - 6;
                const bar = sharp(rp([[x0, base - h], [x1, base - h], [x1, base], [x0, base]]), true, 1.5);
                const ph = hOf(SIM_MODELS[mi].pmf[i]);
                return (
                  <g key={i}>
                    {c > 0 ? (
                      <>
                        <Wash pts={bar} seed={sd + 10 + i} fill={SK.camel} opacity={0.7} dx={1} dy={0} />
                        <InkLine pts={bar} seed={sd + 20 + i} width={1} closed />
                      </>
                    ) : null}
                    {probs ? (
                      <InkLine pts={sharp(rp([[x0 - 3, base], [x0 - 3, base - ph], [x1 + 3, base - ph], [x1 + 3, base]]), false, 1.5)} seed={sd + 30 + i} width={1.6} amp={0.3} />
                    ) : null}
                    {i === d.latest ? (
                      <InkLine pts={rp(blobPts(colX(i) + box / 2, base + 14, 11, 10, sd + 40, 10, 0.08))} seed={sd + 41} width={1.8} color={SK.teal} closed />
                    ) : null}
                    <SketchText x={colX(i) + box / 2} y={base + 19} anchor="middle" size={13}>
                      {String(i + 1)}
                    </SketchText>
                  </g>
                );
              })}
              <SketchText x={744} y={y0 + 24} anchor="middle" size={11}>
                AVERAGE
              </SketchText>
              <SketchText x={744} y={y0 + 60} anchor="middle" size={28} serif>
                {fmt1(d.mean)}
              </SketchText>
              {probs ? (
                <SketchText x={744} y={y0 + 82} anchor="middle" size={11}>
                  {`EXPECTED ${fmt1(d.expected)}`}
                </SketchText>
              ) : null}
            </g>
          );
        })}
        <SketchText x={776} y={250} anchor="end" size={11} fill={SK.pencil}>
          SIMULATED
        </SketchText>
      </SketchFrame>
      <div className="mt-2 flex flex-wrap items-center gap-2 px-1" aria-live="polite">
        <PlateButton onClick={() => setAsked((a) => Math.min(a + 1, 999))} icon={<RotateCw className="size-3.5" aria-hidden />}>
          Ask again
        </PlateButton>
        <PlateButton onClick={() => setAsked((a) => Math.min(a + 10, 999))}>Ask 10 more</PlateButton>
        <PlateButton onClick={() => setProbs((v) => !v)}>{probs ? "Hide probabilities" : "Read probabilities"}</PlateButton>
        <PlateButton
          onClick={() => {
            setAsked(1);
            setProbs(false);
          }}
        >
          Start over
        </PlateButton>
      </div>
    </>
  );
}

/**
 * A pattern, not a feeling: the AI agent with its answers stacked into a
 * spread on a card, and only a pencil heart where a feeling would be.
 */
export function PatternNotFeeling() {
  const g = 176;
  const card = sharp(rp([[150, 54], [366, 54], [366, 170], [150, 170]]), true, 3);
  const spread = [0.04, 0.12, 0.25, 0.3, 0.18, 0.08, 0.03];
  const heart: Pt[] = rp([[0, 10], [-8, 3], [-12, -4], [-9, -10], [-3, -10], [0, -5], [3, -10], [9, -10], [12, -4], [8, 3]].map(([x, y]) => [78 + x * 2, 52 + y * 2] as Pt));
  return (
    <SketchFrame
      id="sk-pattern-not-feeling"
      width={380}
      height={196}
      label="An AI agent beside a card showing the spread of its answers across seven points on the scale. Above the agent, a heart drawn only in pencil: there is no feeling."
    >
      <Backwash cx={190} cy={100} rx={184} ry={92} seed={3500} />
      <Ground x0={30} x1={130} y={g} seed={3501} />
      <Agent x={78} y={g} s={1.05} seed={3510} />
      <PencilLine pts={heart} seed={3520} width={1.2} closed />
      <SketchArrow pts={rp([[106, 124], [142, 118]])} seed={3525} width={1.1} head={7} />
      <Paper pts={card} seed={3530} />
      <InkLine pts={card} seed={3531} closed />
      <InkLine pts={rp([[166, 146], [350, 146]])} seed={3532} width={1} />
      {spread.map((p, i) => {
        const x0 = 172 + i * 25;
        const h = r2(p * 230);
        const bar = sharp(rp([[x0, 146 - h], [x0 + 18, 146 - h], [x0 + 18, 146], [x0, 146]]), true, 1.2);
        return (
          <g key={i}>
            <Wash pts={bar} seed={3540 + i} fill={SK.camel} opacity={0.7} dx={1} dy={0} />
            <InkLine pts={bar} seed={3550 + i} width={0.9} closed />
            <SketchText x={x0 + 9} y={162} anchor="middle" size={10}>
              {String(i + 1)}
            </SketchText>
          </g>
        );
      })}
    </SketchFrame>
  );
}

/* ==========================================================================
   Discussion
   ========================================================================== */

/**
 * Auditing an ad: a magnifier over a poster with a spokesperson and the
 * brand's box, and a checklist of the week's three marks, each ticked.
 */
export function AuditAd() {
  const poster = sharp(rp([[30, 18], [230, 18], [230, 214], [30, 214]]), true, 3);
  const g = 196;
  const hand = handAt(100, g, 124, "carry", 1);
  return (
    <SketchFrame
      id="sk-audit-ad"
      width={400}
      height={232}
      label="An advertisement poster with a headline and a spokesperson holding the brand's box, a magnifying glass held over it. Beside it, a checklist of a heart, a thought cloud and a shopping bag, each ticked."
    >
      <Backwash cx={200} cy={116} rx={196} ry={110} seed={3600} />
      <Paper pts={poster} seed={3601} />
      <InkLine pts={poster} seed={3602} closed />
      <InkLine pts={rp([[50, 42], [210, 42]])} seed={3603} width={2.4} amp={0.4} />
      <InkLine pts={rp([[50, 58], [170, 58]])} seed={3604} width={1} amp={0.3} />
      <InkLine pts={rp([[44, g], [216, g]])} seed={3605} width={0.9} />
      <Person x={100} y={g} h={124} look={SOURCE} arms={["down", "carry"]} seed={3610} />
      <Box x={r2(hand[0] + 14)} bottom={r2(hand[1] + 12)} w={30} h={34} seed={3660} />
      <Magnifier x={178} y={124} r={24} seed={3670} />

      {[
        [74, "heart"],
        [126, "cloud"],
        [178, "bag"],
      ].map(([y, kind], i) => (
        <g key={i}>
          {kind === "heart" ? <Heart x={290} y={y as number} s={1.1} seed={3700} /> : null}
          {kind === "cloud" ? <MiniThought x={290} y={y as number} r={17} seed={3710} /> : null}
          {kind === "bag" ? <Bag x={290} y={(y as number) - 16} w={24} badge={false} seed={3720} /> : null}
          <Tick2 x={340} y={y as number} s={0.9} seed={3730 + i} />
        </g>
      ))}
    </SketchFrame>
  );
}
