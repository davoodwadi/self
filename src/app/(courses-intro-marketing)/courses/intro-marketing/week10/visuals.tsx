/* ==========================================================================
   Week 10 — figures
   --------------------------------------------------------------------------
   Hand-drawn SVG plates, one grammar per idea. The week is about sending one
   message through many tools, so a fixed cast of five glyphs stands for the
   five tools on every plate — a megaphone is advertising, a newspaper public
   relations, a coupon sales promotion, two people face to face personal
   selling, a phone direct and digital marketing — and a small seal (a ring
   with a diamond) stands for the brand message itself. When the seal looks
   the same everywhere, the message is consistent; when the shapes differ,
   the message is in conflict.

   Conventions carried over from earlier weeks:
     · viewBox width 800 (400 for column plates), flat fills, hairline rules,
       no shadows or gradients
     · SIGNAL marks the operative case (the tool's strength, the consistent
       message, the step in focus); COUNTER the limit, the conflict or the
       competitor; INK the neutral case
     · every label reuses words from the slide the plate sits on
     · integer coordinates only, so server and client render the same markup
   ========================================================================== */

import React from "react";
import {
  COUNTER,
  COUNTER_TINT,
  Display,
  Frame,
  headAlong1,
  INK,
  INK3,
  Key,
  PAPER,
  PAPER2,
  r2,
  RULE,
  RULE2,
  SIGNAL,
  SIGNAL_TINT,
} from "../_visuals/kit";
import {
  Arrow2,
  Bubble1,
  Coins2,
  Gift2,
  GlyphFrame,
  Mark2,
  Pack4,
  Person3,
  Store2,
  Tool,
  ToolKind,
  Tv1,
  TwoWay2,
} from "../_visuals/objects";

/* -- geometry helpers ------------------------------------------------------ */

/* -- the cast of the week -------------------------------------------------- */

export const TOOLS: { kind: ToolKind; name: string }[] = [
  { kind: "ad", name: "ADVERTISING" },
  { kind: "pr", name: "PUBLIC RELATIONS" },
  { kind: "sp", name: "SALES PROMOTION" },
  { kind: "ps", name: "PERSONAL SELLING" },
  { kind: "dd", name: "DIRECT AND DIGITAL" },
];

/** A message that is not the brand's: a different shape each time. */
function OddMark({
  x,
  y,
  shape,
  r = 10,
  tone = COUNTER,
}: {
  x: number;
  y: number;
  shape: "square" | "triangle" | "star";
  r?: number;
  tone?: string;
}) {
  if (shape === "square") {
    return <rect x={x - r} y={y - r} width={r * 2} height={r * 2} fill={PAPER} stroke={tone} strokeWidth={1.5} />;
  }
  if (shape === "triangle") {
    return (
      <path
        d={`M${x} ${y - r - 1}L${x + r + 1} ${y + r - 1}H${x - r - 1}Z`}
        fill={PAPER}
        stroke={tone}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    );
  }
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={PAPER} stroke={tone} strokeWidth={1.5} strokeDasharray="3 2" />
      <circle cx={x} cy={y} r={Math.round(r / 3)} fill={tone} />
    </g>
  );
}

/* ==========================================================================
   THE PROMOTION MIX
   ========================================================================== */

/** Five tools poured into one bar: the blend. */
export function BlendBar() {
  const xs = [96, 248, 400, 552, 704];
  const segs = [
    { x: 40, w: 200 },
    { x: 240, w: 110 },
    { x: 350, w: 150 },
    { x: 500, w: 140 },
    { x: 640, w: 120 },
  ];
  const fills = [SIGNAL_TINT, PAPER2, COUNTER_TINT, PAPER2, SIGNAL_TINT];
  return (
    <Frame
      height={262}
      label="The five promotion tools in a row: a megaphone for advertising, a newspaper for public relations, a coupon for sales promotion, two people for personal selling and a phone for direct and digital. A line runs down from each into its own share of one long bar, the blend."
    >
      {TOOLS.map((t, i) => (
        <g key={t.kind}>
          <Tool kind={t.kind} x={xs[i]} y={46} />
          <Key x={xs[i]} y={92} anchor="middle" fill={INK} size={9.5}>
            {t.name}
          </Key>
          <line
            x1={xs[i]}
            y1={104}
            x2={segs[i].x + segs[i].w / 2}
            y2={160}
            stroke={INK3}
            strokeWidth={1}
          />
        </g>
      ))}
      {segs.map((s, i) => (
        <rect key={i} x={s.x} y={164} width={s.w} height={38} fill={fills[i]} stroke={INK} strokeWidth={1.25} />
      ))}
      <rect x={40} y={164} width={720} height={38} fill="none" stroke={SIGNAL} strokeWidth={2} />
      <Key x={40} y={232} fill={SIGNAL} size={10.5}>
        THE SPECIFIC BLEND OF PROMOTIONAL TOOLS
      </Key>
    </Frame>
  );
}

/** Engaging first, a relationship later: the link between them thickens. */
export function EngageRelate() {
  const rows = [
    { y: 64, gap: 250, w: 1, tone: INK3, dash: "4 4", key: "ENGAGE" },
    { y: 144, gap: 190, w: 2, tone: INK, dash: undefined, key: "" },
    { y: 224, gap: 130, w: 3.5, tone: SIGNAL, dash: undefined, key: "RELATIONSHIP" },
  ];
  return (
    <Frame
      width={400}
      height={268}
      label="Three rows, one after another. In each a brand seal on the left and a consumer on the right. In the first row they are far apart with a thin dashed link; in the last they stand close with a thick two-way link."
    >
      {rows.map((r, i) => {
        const left = 200 - r.gap / 2;
        const right = 200 + r.gap / 2;
        return (
          <g key={i}>
            <Mark2 x={left} y={r.y - 10} r={12} tone={i === 2 ? SIGNAL : INK} />
            <Person3 x={right} y={r.y + 6} k={0.9} stroke={i === 2 ? SIGNAL : INK} />
            <TwoWay2 x1={left + 18} y1={r.y - 10} x2={right - 16} y2={r.y - 10} tone={r.tone} width={r.w} dash={r.dash} />
            {r.key ? (
              <Key x={200} y={r.y + 20} anchor="middle" fill={i === 2 ? SIGNAL : INK3} size={10}>
                {r.key}
              </Key>
            ) : null}
          </g>
        );
      })}
      <Arrow2 x1={22} y1={40} x2={22} y2={230} tone={RULE2} width={1} size={6} />
    </Frame>
  );
}

/** Value carried in a message, delivered to a person. */
export function PersuasiveValue() {
  return (
    <Frame
      width={400}
      height={250}
      label="A brand seal on the left speaks a large bubble. Inside the bubble a price tag with a check mark: customer value. An arrow carries it to a consumer on the right."
    >
      <Mark2 x={44} y={170} r={16} />
      <Bubble1 x={74} y={42} w={196} h={96} tone={SIGNAL} fill={SIGNAL_TINT} />
      {/* tag with a check: value */}
      <path d="M126 70H196L214 90L196 110H126Z" fill={PAPER} stroke={SIGNAL} strokeWidth={1.5} strokeLinejoin="round" />
      <circle cx={200} cy={90} r={3.5} fill="none" stroke={SIGNAL} strokeWidth={1.25} />
      <path d="M142 90L154 101L176 78" fill="none" stroke={SIGNAL} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      <Key x={172} y={126} anchor="middle" fill={SIGNAL} size={9.5}>
        CUSTOMER VALUE
      </Key>
      <Arrow2 x1={282} y1={100} x2={330} y2={140} tone={SIGNAL} width={2} />
      <Person3 x={352} y={210} k={1.5} stroke={SIGNAL} />
      <Key x={200} y={228} anchor="middle" fill={INK} size={10}>
        PERSUASIVELY
      </Key>
    </Frame>
  );
}

/** The promotion mix as the core of a wider field of communications. */
export function CoreOfComms() {
  const ring = [0, 1, 2, 3, 4].map((i) => {
    const a = ((-90 + i * 72) * Math.PI) / 180;
    return { x: Math.round(200 + 42 * Math.cos(a)), y: Math.round(158 + 42 * Math.sin(a)) };
  });
  return (
    <Frame
      width={400}
      height={310}
      label="Two circles, one inside the other. The inner circle holds the five promotion tools around a brand seal and is labelled the promotion mix. The wide outer circle around it is labelled marketing communications."
    >
      <circle cx={200} cy={158} r={132} fill={PAPER2} stroke={INK} strokeWidth={1.25} />
      <circle cx={200} cy={158} r={70} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={2} />
      <Key x={200} y={52} anchor="middle" fill={INK} size={10}>
        MARKETING
      </Key>
      <Key x={200} y={66} anchor="middle" fill={INK} size={10}>
        COMMUNICATIONS
      </Key>
      <Mark2 x={200} y={158} r={10} />
      {TOOLS.map((t, i) => (
        <Tool key={t.kind} kind={t.kind} x={ring[i].x} y={ring[i].y} k={0.42} tone={SIGNAL} />
      ))}
      <Key x={200} y={250} anchor="middle" fill={SIGNAL} size={10}>
        PROMOTION MIX
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   ELEMENTS OF THE PROMOTION MIX — hub and spoke
   ========================================================================== */

export function MessageHub() {
  const cx = 400;
  const cy = 214;
  const nodes = TOOLS.map((t, i) => {
    const a = ((-90 + i * 72) * Math.PI) / 180;
    return {
      ...t,
      x: Math.round(cx + 230 * Math.cos(a)),
      y: Math.round(cy + 150 * Math.sin(a)),
      ux: Math.cos(a),
      uy: Math.sin(a),
    };
  });
  return (
    <Frame
      height={420}
      label="A hub and five spokes. At the hub a circle holding the brand seal, labelled consistent brand message. Arrows run out from it to the five tools around it, and each tool carries a copy of the same seal."
    >
      {nodes.map((n) => {
        const ax = Math.round(cx + 84 * n.ux);
        const ay = Math.round(cy + 84 * n.uy);
        const bx = Math.round(n.x - 48 * n.ux);
        const by = Math.round(n.y - 38 * n.uy);
        return <Arrow2 key={n.kind} x1={ax} y1={ay} x2={bx} y2={by} tone={SIGNAL} width={1.5} />;
      })}
      <circle cx={cx} cy={cy} r={76} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={2} />
      <Mark2 x={cx} y={cy - 16} r={16} />
      <Key x={cx} y={cy + 20} anchor="middle" fill={SIGNAL} size={10}>
        CONSISTENT
      </Key>
      <Key x={cx} y={cy + 34} anchor="middle" fill={SIGNAL} size={10}>
        BRAND MESSAGE
      </Key>
      {nodes.map((n, i) => {
        const side = i === 0 ? "top" : i === 1 ? "right" : i === 4 ? "left" : "bottom";
        const lx = side === "right" ? n.x + 40 : side === "left" ? n.x - 40 : n.x;
        const ly = side === "top" ? n.y - 30 : side === "bottom" ? n.y + 42 : n.y + 4;
        const anchor = side === "right" ? "start" : side === "left" ? "end" : "middle";
        return (
          <g key={n.kind}>
            <Tool kind={n.kind} x={n.x} y={n.y} k={1.05} />
            <Mark2 x={n.x + 22} y={n.y - 18} r={6} />
            <Key x={lx} y={ly} anchor={anchor} fill={INK} size={10.5}>
              {n.name}
            </Key>
          </g>
        );
      })}
    </Frame>
  );
}

/** A tool glyph on its own, for lists and strips. */
export function ToolGlyph({
  kind,
  tone = INK,
  size = 56,
}: {
  kind: ToolKind;
  tone?: string;
  size?: number;
}) {
  return (
    <svg viewBox="0 0 64 48" width={size} height={Math.round((size * 48) / 64)} aria-hidden className="block shrink-0">
      <Tool kind={kind} x={30} y={24} tone={tone} fill={tone === SIGNAL ? SIGNAL_TINT : PAPER} />
    </svg>
  );
}

/* ==========================================================================
   ADVERTISING
   ========================================================================== */

/** One megaphone, buyers scattered far across the field, all reached. */
export function DispersedReach() {
  const rings = [150, 290, 430, 570, 710];
  const buyers: { x: number; y: number }[] = [];
  for (let i = 0; i < 40; i++) {
    const c = i % 10;
    const r = Math.floor(i / 10);
    if (i % 7 === 3) continue;
    buyers.push({
      x: 232 + c * 58 + (((i * 37) % 29) - 14),
      y: 62 + r * 58 + (((i * 53) % 23) - 11),
    });
  }
  return (
    <Frame
      height={292}
      label="A megaphone on the left. Sound rings spread out from it across the whole plate, and some thirty buyers stand scattered far apart across that field, every one of them inside the rings."
    >
      {rings.map((r) => (
        <circle key={r} cx={112} cy={150} r={r} fill="none" stroke={RULE2} strokeWidth={1} strokeDasharray="3 5" />
      ))}
      <Tool kind="ad" x={82} y={150} k={1.7} tone={SIGNAL} fill={SIGNAL_TINT} />
      <Key x={82} y={196} anchor="middle" fill={SIGNAL} size={10}>
        ADVERTISING
      </Key>
      {buyers.map((b, i) => (
        <Person3 key={i} x={b.x} y={b.y + 11} k={0.58} stroke={INK} />
      ))}
      <Key x={232} y={280} fill={INK} size={10.5}>
        MASSES OF GEOGRAPHICALLY DISPERSED BUYERS
      </Key>
    </Frame>
  );
}

/** The same bubble, again and again, along a time line. */
export function RepeatMessage() {
  const xs = [80, 132, 184, 236, 288, 340];
  return (
    <Frame
      width={400}
      height={214}
      label="A megaphone on the left, then six identical speech bubbles in a row along a time line, each carrying the same brand seal, numbered one to six."
    >
      <Key x={20} y={30} fill={INK} size={10}>
        THE SAME MESSAGE, MANY TIMES
      </Key>
      <Tool kind="ad" x={36} y={96} k={0.8} tone={SIGNAL} />
      {xs.map((x) => (
        <g key={x}>
          <Bubble1 x={x} y={68} w={42} h={34} tone={SIGNAL} fill={SIGNAL_TINT} width={1.25} />
          <Mark2 x={x + 21} y={85} r={8} />
          <line x1={x + 21} y1={144} x2={x + 21} y2={152} stroke={INK3} strokeWidth={1} />
        </g>
      ))}
      <Arrow2 x1={70} y1={148} x2={390} y2={148} tone={INK3} width={1} size={6} />
      {xs.map((x, i) => (
        <Key key={x} x={x + 21} y={172} anchor="middle" fill={INK3} size={9.5}>
          {String(i + 1)}
        </Key>
      ))}
      <Key x={390} y={200} anchor="end" fill={INK3} size={9}>
        TIME
      </Key>
    </Frame>
  );
}

/** A television set beside the tall stack of money it costs. */
export function TvCost() {
  return (
    <Frame
      width={400}
      height={240}
      label="A television set on the left. On the right a very tall stack of coins, drawn in the contrast colour: what a television campaign costs."
    >
      <Tv1 x={120} y={196} k={1.35} />
      <Key x={120} y={222} anchor="middle" fill={INK} size={10}>
        TELEVISION
      </Key>
      <Arrow2 x1={186} y1={150} x2={236} y2={150} tone={INK3} width={1.25} />
      <Coins2 x={292} y={200} n={17} tone={COUNTER} fill={COUNTER_TINT} w={46} />
      <Key x={292} y={222} anchor="middle" fill={COUNTER} size={10}>
        VERY COSTLY
      </Key>
    </Frame>
  );
}

/** Above, a set talks at a viewer. Below, a salesperson talks with a buyer. */
export function NoSalesperson() {
  return (
    <Frame
      width={400}
      height={268}
      label="Two rows. Above, a television sends a thin dashed one-way arrow to a distant viewer. Below, a company salesperson and a buyer stand face to face, joined by a thick two-way arrow."
    >
      <Tv1 x={66} y={104} k={0.8} tone={INK3} />
      <Key x={66} y={124} anchor="middle" fill={INK3} size={9.5}>
        ADVERTISING
      </Key>
      <Arrow2 x1={112} y1={78} x2={296} y2={78} tone={INK3} width={1} dash="4 4" />
      <Person3 x={328} y={104} k={1.2} stroke={INK3} />
      <line x1={20} y1={144} x2={380} y2={144} stroke={RULE} strokeWidth={1} />
      <Key x={200} y={172} anchor="middle" fill={SIGNAL} size={9.5}>
        DIRECT PERSUASIVENESS
      </Key>
      <Person3 x={144} y={242} k={1.4} stroke={SIGNAL} fill={SIGNAL_TINT} />
      <Person3 x={256} y={242} k={1.4} stroke={INK} />
      <TwoWay2 x1={162} y1={210} x2={238} y2={210} tone={SIGNAL} width={2.25} />
      <Key x={200} y={262} anchor="middle" fill={SIGNAL} size={9.5}>
        COMPANY SALESPEOPLE
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   PUBLIC RELATIONS
   ========================================================================== */

/** How far each is believed: a news story against an ad. */
export function Believability() {
  return (
    <Frame
      width={400}
      height={282}
      label="Two bars measuring believability. Public relations, shown by a newspaper, has a tall bar. Ads, shown by a megaphone, have a short one."
    >
      <Key x={24} y={30} fill={INK} size={10}>
        BELIEVABILITY
      </Key>
      <rect x={96} y={60} width={68} height={150} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.75} />
      <rect x={236} y={162} width={68} height={48} fill={PAPER2} stroke={INK3} strokeWidth={1.25} />
      <line x1={40} y1={210} x2={360} y2={210} stroke={INK} strokeWidth={1.25} />
      <Tool kind="pr" x={130} y={236} k={0.85} tone={SIGNAL} />
      <Tool kind="ad" x={270} y={236} k={0.85} tone={INK3} />
      <Key x={130} y={272} anchor="middle" fill={SIGNAL} size={9.5}>
        PUBLIC RELATIONS
      </Key>
      <Key x={270} y={272} anchor="middle" fill={INK3} size={9.5}>
        ADS
      </Key>
    </Frame>
  );
}

/** A cross: the message is stopped here. */
function Blocked({ x, y }: { x: number; y: number }) {
  return (
    <path d={`M${x - 7} ${y - 7}L${x + 7} ${y + 7}M${x + 7} ${y - 7}L${x - 7} ${y + 7}`} stroke={COUNTER} strokeWidth={2.25} strokeLinecap="round" />
  );
}

/** A prospect who blocks ads and salespeople still reads the story. */
export function AvoidersReached() {
  return (
    <Frame
      width={400}
      height={296}
      label="A prospect at the bottom centre. A megaphone at top left and a salesperson at top right each send a dashed arrow that is stopped by a cross before it reaches them. A newspaper above sends a solid arrow that gets through."
    >
      <Tool kind="ad" x={62} y={96} tone={INK3} />
      <Key x={62} y={136} anchor="middle" fill={INK3} size={9.5}>
        ADVERTISEMENTS
      </Key>
      <Tool kind="ps" x={338} y={96} tone={INK3} />
      <Key x={338} y={136} anchor="middle" fill={INK3} size={9.5}>
        SALESPEOPLE
      </Key>
      <Arrow2 x1={96} y1={148} x2={140} y2={186} tone={INK3} width={1.1} dash="4 3" />
      <Arrow2 x1={304} y1={148} x2={260} y2={186} tone={INK3} width={1.1} dash="4 3" />
      <Blocked x={152} y={198} />
      <Blocked x={248} y={198} />
      <Tool kind="pr" x={200} y={62} k={1.2} tone={SIGNAL} fill={SIGNAL_TINT} />
      <Key x={200} y={28} anchor="middle" fill={SIGNAL} size={9.5}>
        PUBLIC RELATIONS
      </Key>
      <Arrow2 x1={200} y1={86} x2={200} y2={180} tone={SIGNAL} width={2} />
      <Person3 x={200} y={252} k={1.6} stroke={INK} />
      <Key x={200} y={278} anchor="middle" fill={INK} size={9.5}>
        PROSPECTS
      </Key>
    </Frame>
  );
}

/** A product on a lit stage, an audience watching. */
export function Dramatize() {
  const heads = [40, 88, 136, 184, 232, 280, 328, 376];
  return (
    <Frame
      width={400}
      height={292}
      label="A spotlight at the top throws a cone of light onto a stage. On the stage a single product carrying the brand seal. A row of audience heads in the foreground watches it."
    >
      <path d="M186 38L110 222H290L214 38Z" fill={SIGNAL_TINT} />
      <path d="M184 20H216L222 38H178Z" fill={INK} />
      <ellipse cx={200} cy={222} rx={112} ry={14} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
      <Pack4 x={200} y={218} w={58} h={70} tone={SIGNAL} fill={PAPER} />
      <Mark2 x={200} y={180} r={11} />
      <Key x={20} y={64} fill={SIGNAL} size={10}>
        DRAMATIZES
      </Key>
      {heads.map((x) => (
        <path key={x} d={`M${x - 20} 292V282Q${x - 20} 258 ${x} 258Q${x + 20} 258 ${x + 20} 282V292`} fill={PAPER2} stroke={INK3} strokeWidth={1.25} />
      ))}
    </Frame>
  );
}

/** A long bar of potential with only a short stretch of it in use. */
export function Underused() {
  return (
    <Frame
      height={180}
      label="Public relations, shown by a newspaper, beside one long bar labelled strong potential. Only a short stretch at the start of the bar is filled; the long remainder is empty and marked underused."
    >
      <Tool kind="pr" x={60} y={86} k={1.25} tone={SIGNAL} />
      <Key x={110} y={48} fill={INK} size={10.5}>
        STRONG POTENTIAL
      </Key>
      <path d="M110 56V60H760V56" fill="none" stroke={INK} strokeWidth={1} />
      <rect x={110} y={66} width={650} height={40} fill={PAPER} stroke={INK} strokeWidth={1.25} strokeDasharray="5 4" />
      <rect x={110} y={66} width={130} height={40} fill={SIGNAL} />
      <Key x={175} y={132} anchor="middle" fill={SIGNAL} size={10}>
        USED
      </Key>
      <Key x={500} y={132} anchor="middle" fill={COUNTER} size={10}>
        UNDERUSED
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   SALES PROMOTION
   ========================================================================== */

/** Coupons, contests, discounts and premiums, each drawn. */
export function FourIncentives() {
  const tiles = [110, 303, 497, 690];
  const names = ["COUPONS", "CONTESTS", "DISCOUNTS", "PREMIUMS"];
  return (
    <Frame
      height={232}
      label="Four tiles. A coupon with a perforated stub. A trophy with a number one. A price tag reading percent off. A product with a free gift box tied to it."
    >
      {tiles.map((x, i) => (
        <g key={x}>
          <rect x={x - 86} y={24} width={172} height={146} fill={PAPER} stroke={RULE} strokeWidth={1} />
          <Key x={x} y={200} anchor="middle" fill={SIGNAL} size={10.5}>
            {names[i]}
          </Key>
        </g>
      ))}
      <Tool kind="sp" x={110} y={97} k={1.8} tone={SIGNAL} fill={SIGNAL_TINT} />
      {/* trophy */}
      <g strokeLinejoin="round" stroke={SIGNAL} strokeWidth={1.5}>
        <path d="M285 60H321V84Q321 108 303 110Q285 108 285 84Z" fill={SIGNAL_TINT} />
        <path d="M285 66Q268 66 270 82Q272 96 287 96M321 66Q338 66 336 82Q334 96 319 96" fill="none" />
        <rect x={299} y={110} width={8} height={16} fill={PAPER} />
        <rect x={286} y={126} width={34} height={9} fill={PAPER} />
      </g>
      <Display x={303} y={94} anchor="middle" fill={SIGNAL} size={20}>
        1
      </Display>
      {/* discount tag */}
      <path d="M446 74H522L546 98L522 122H446Z" fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} strokeLinejoin="round" />
      <circle cx={530} cy={98} r={4} fill={PAPER} stroke={SIGNAL} strokeWidth={1.25} />
      <Display x={484} y={105} anchor="middle" fill={SIGNAL} size={17}>
        % OFF
      </Display>
      {/* premium: a product with a free gift tied on */}
      <Pack4 x={666} y={140} w={46} h={66} tone={INK} />
      <Mark2 x={666} y={108} r={9} />
      <Gift2 x={718} y={140} s={30} />
      <path d="M689 124Q698 116 703 124" fill="none" stroke={SIGNAL} strokeWidth={1.25} />
    </Frame>
  );
}

/** Every eye on the shelf goes to the pack with the offer. */
export function AttentionIncentive() {
  const packs = [70, 135, 200, 265, 330];
  const viewers = [100, 200, 300];
  const star = Array.from({ length: 24 }, (_, i) => {
    const a = (i * 15 * Math.PI) / 180;
    const r = i % 2 === 0 ? 21 : 14;
    return `${i === 0 ? "M" : "L"}${r2(216 + r * Math.cos(a))} ${r2(62 + r * Math.sin(a))}`;
  }).join("") + "Z";
  return (
    <Frame
      width={400}
      height={290}
      label="A shelf of five identical packs. The middle one carries a starburst offer. Three shoppers below all look at that one pack, their gaze lines meeting on it."
    >
      <Key x={200} y={24} anchor="middle" fill={SIGNAL} size={9.5}>
        STRONG INCENTIVE TO PURCHASE
      </Key>
      {packs.map((x) => (
        <Pack4 key={x} x={x} y={130} w={44} h={60} tone={x === 200 ? SIGNAL : INK3} fill={x === 200 ? SIGNAL_TINT : PAPER} />
      ))}
      <line x1={24} y1={130} x2={376} y2={130} stroke={INK} strokeWidth={2} />
      {viewers.map((x) => (
        <line key={x} x1={x} y1={222} x2={200} y2={136} stroke={SIGNAL} strokeWidth={1} strokeDasharray="3 3" />
      ))}
      <path d={star} fill={SIGNAL} />
      <Display x={216} y={67} anchor="middle" fill={PAPER} size={14}>
        %
      </Display>
      {viewers.map((x) => (
        <Person3 key={x} x={x} y={272} k={1.3} />
      ))}
      <Key x={20} y={174} fill={SIGNAL} size={9.5}>
        ATTENTION
      </Key>
    </Frame>
  );
}

/** Buyers before the deadline get a gift; buyers after it do not. */
export function QuickResponse() {
  const early = [56, 110, 164];
  const late = [296, 350];
  return (
    <Frame
      width={400}
      height={244}
      label="A time line with a clock marking a deadline. Three buyers who act before it each hold a gift. Two buyers who come after it get nothing."
    >
      <rect x={20} y={40} width={218} height={140} fill={SIGNAL_TINT} />
      <line x1={238} y1={40} x2={238} y2={190} stroke={INK} strokeWidth={1.25} strokeDasharray="4 3" />
      <circle cx={238} cy={30} r={16} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <path d="M238 20V30L246 34" fill="none" stroke={INK} strokeWidth={1.5} strokeLinecap="round" />
      {early.map((x) => (
        <g key={x}>
          <Person3 x={x} y={168} k={1.1} stroke={SIGNAL} />
          <Gift2 x={x + 21} y={166} s={14} />
        </g>
      ))}
      {late.map((x) => (
        <Person3 key={x} x={x} y={168} k={1.1} stroke={INK3} />
      ))}
      <Arrow2 x1={20} y1={180} x2={386} y2={180} tone={INK} width={1.25} size={7} />
      <Key x={129} y={206} anchor="middle" fill={SIGNAL} size={10}>
        QUICK RESPONSE
      </Key>
      <Key x={323} y={206} anchor="middle" fill={INK3} size={10}>
        LATER
      </Key>
      <Key x={386} y={232} anchor="end" fill={INK3} size={9}>
        TIME
      </Key>
    </Frame>
  );
}

/** Sales jump during the promotion and fall back; preference stays flat. */
export function ShortLived() {
  return (
    <Frame
      height={306}
      label="A time chart. A shaded band marks the promotion. The sales line leaps up inside the band and drops straight back to where it began once the band ends. The long-term brand preference line below barely moves at all."
    >
      <rect x={250} y={50} width={120} height={200} fill={SIGNAL_TINT} />
      <Key x={310} y={40} anchor="middle" fill={SIGNAL} size={10}>
        PROMOTION
      </Key>
      <path d="M70 180H250L268 84H352L374 172L396 182H700" fill="none" stroke={INK} strokeWidth={2.25} strokeLinejoin="round" />
      <path d="M70 226H250Q310 220 370 224H700" fill="none" stroke={COUNTER} strokeWidth={2.25} />
      <Key x={700} y={170} anchor="end" fill={INK} size={10}>
        SALES
      </Key>
      <Key x={700} y={216} anchor="end" fill={COUNTER} size={10}>
        LONG-TERM BRAND PREFERENCE
      </Key>
      <line x1={410} y1={112} x2={372} y2={150} stroke={SIGNAL} strokeWidth={1} />
      <Key x={414} y={110} fill={SIGNAL} size={10}>
        SHORT-LIVED
      </Key>
      <Arrow2 x1={70} y1={258} x2={740} y2={258} tone={INK3} width={1} size={6} />
      <Key x={740} y={282} anchor="end" fill={INK3} size={9}>
        TIME
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   PERSONAL SELLING
   ========================================================================== */

/** The buying process, with personal selling strongest at its later stages. */
export function LateStages() {
  const names = ["", "", "", "PREFERENCES", "CONVICTIONS", "ACTIONS"];
  const heights = [26, 32, 40, 104, 120, 132];
  return (
    <Frame
      height={272}
      label="The buying process drawn as six chevrons in a row. Above each, a bar for how effective personal selling is there. The bars are short over the first three and tall over the last three, labelled preferences, convictions and actions."
    >
      <Tool kind="ps" x={62} y={40} k={1.05} tone={SIGNAL} fill={SIGNAL_TINT} />
      <Key x={92} y={46} fill={SIGNAL} size={10}>
        PERSONAL SELLING
      </Key>
      <Key x={580} y={30} anchor="middle" fill={SIGNAL} size={10}>
        MOST EFFECTIVE
      </Key>
      <path d="M404 38V44H756V38" fill="none" stroke={SIGNAL} strokeWidth={1} />
      {names.map((n, i) => {
        const x0 = 40 + i * 120;
        const lit = i >= 3;
        return (
          <g key={i}>
            <rect
              x={x0 + 30}
              y={178 - heights[i]}
              width={56}
              height={heights[i]}
              fill={lit ? SIGNAL : PAPER2}
              stroke={lit ? SIGNAL : INK3}
              strokeWidth={1.25}
            />
            <path
              d={`M${x0} 188H${x0 + 106}L${x0 + 118} 204L${x0 + 106} 220H${x0}L${x0 + 12} 204Z`}
              fill={lit ? SIGNAL_TINT : PAPER2}
              stroke={lit ? SIGNAL : INK3}
              strokeWidth={1.25}
              strokeLinejoin="round"
            />
            {n ? (
              <Key x={x0 + 60} y={244} anchor="middle" fill={SIGNAL} size={10}>
                {n}
              </Key>
            ) : null}
          </g>
        );
      })}
      <Key x={40} y={244} fill={INK3} size={10}>
        THE BUYING PROCESS
      </Key>
    </Frame>
  );
}

/** Two commitments measured along time. */
export function Commitment() {
  const ticks = Array.from({ length: 10 }, (_, i) => 30 + i * 36);
  return (
    <Frame
      width={400}
      height={206}
      label="Two bars along a time line. Advertising is a short bar. Personal selling is a long bar that runs most of the way across."
    >
      <Key x={30} y={42} fill={INK3} size={9.5}>
        ADVERTISING
      </Key>
      <rect x={30} y={50} width={96} height={28} fill={PAPER2} stroke={INK3} strokeWidth={1.25} />
      <Key x={30} y={106} fill={SIGNAL} size={9.5}>
        PERSONAL SELLING
      </Key>
      <rect x={30} y={114} width={330} height={28} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.75} />
      <Arrow2 x1={30} y1={166} x2={386} y2={166} tone={INK3} width={1} size={6} />
      {ticks.map((x) => (
        <line key={x} x1={x} y1={162} x2={x} y2={170} stroke={INK3} strokeWidth={1} />
      ))}
      <Key x={386} y={192} anchor="end" fill={INK3} size={9}>
        TIME
      </Key>
    </Frame>
  );
}

/** Five coin stacks, one per tool; personal selling towers over the rest. */
export function MostExpensive() {
  const xs = [48, 124, 200, 276, 352];
  return (
    <Frame
      width={400}
      height={262}
      label="A coin stack above each of the five promotion tools. Personal selling's stack, drawn in signal colour, is by far the tallest."
    >
      {TOOLS.map((t, i) => {
        const lit = t.kind === "ps";
        return (
          <g key={t.kind}>
            <Coins2 x={xs[i]} y={206} n={lit ? 13 : 5} tone={lit ? SIGNAL : INK3} fill={lit ? SIGNAL_TINT : PAPER} w={34} />
            <Tool kind={t.kind} x={xs[i]} y={234} k={0.72} tone={lit ? SIGNAL : INK3} />
          </g>
        );
      })}
      <Key x={276} y={112} anchor="middle" fill={SIGNAL} size={10}>
        MOST EXPENSIVE
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   DIRECT AND DIGITAL MARKETING
   ========================================================================== */

/** Out of a crowd, one customer and one small community are reached. */
export function Targeted() {
  const one = { x: 470, y: 132 };
  const group = { x: 664, y: 196 };
  const members = [
    { x: 640, y: 196 },
    { x: 664, y: 188 },
    { x: 688, y: 196 },
    { x: 652, y: 222 },
    { x: 676, y: 222 },
  ];
  const dots: { x: number; y: number }[] = [];
  for (let i = 0; i < 90; i++) {
    const c = i % 18;
    const r = Math.floor(i / 18);
    const x = 250 + c * 30 + (((i * 37) % 17) - 8);
    const y = 50 + r * 46 + (((i * 53) % 19) - 9);
    if (Math.hypot(x - one.x, y - one.y) < 40) continue;
    if (Math.hypot(x - group.x, y - group.y) < 60) continue;
    dots.push({ x, y });
  }
  return (
    <Frame
      height={286}
      label="A phone on the left. Across the right a faint crowd of dots. Two arrows leave the phone: one goes to a single customer circled in the crowd, the other to a small circled community of five people."
    >
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={3.5} fill={RULE2} />
      ))}
      <Tool kind="dd" x={90} y={150} k={1.9} tone={SIGNAL} fill={SIGNAL_TINT} />
      <Arrow2 x1={134} y1={140} x2={436} y2={128} tone={SIGNAL} width={1.75} />
      <Arrow2 x1={134} y1={162} x2={612} y2={196} tone={SIGNAL} width={1.75} />
      <circle cx={one.x} cy={one.y - 10} r={30} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
      <Person3 x={one.x} y={one.y + 8} k={1} stroke={SIGNAL} />
      <Key x={one.x} y={one.y - 50} anchor="middle" fill={SIGNAL} size={10}>
        A SPECIFIC CUSTOMER
      </Key>
      <circle cx={group.x} cy={group.y + 2} r={48} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} strokeDasharray="5 3" />
      {members.map((m, i) => (
        <Person3 key={i} x={m.x} y={m.y + 10} k={0.66} stroke={SIGNAL} />
      ))}
      <Key x={group.x} y={group.y + 72} anchor="middle" fill={SIGNAL} size={10}>
        COMMUNITY
      </Key>
    </Frame>
  );
}

/** A phone: a message addressed to one person, answered at once. */
export function Immediate() {
  return (
    <Frame
      width={400}
      height={290}
      label="A large phone. On its screen an incoming bubble carrying a small portrait of the one person it is for, and right beneath it that person's reply bubble."
    >
      <rect x={134} y={18} width={132} height={256} rx={16} fill={PAPER} stroke={INK} strokeWidth={1.75} />
      <rect x={146} y={42} width={108} height={196} fill={PAPER2} stroke={INK} strokeWidth={0.9} />
      <circle cx={200} cy={256} r={6} fill="none" stroke={INK} strokeWidth={1.25} />
      <Bubble1 x={154} y={60} w={86} h={48} tone={INK} fill={PAPER} />
      <circle cx={174} cy={84} r={11} fill={PAPER2} stroke={SIGNAL} strokeWidth={1.25} />
      <Person3 x={174} y={93} k={0.42} stroke={SIGNAL} width={1.1} />
      <path d="M192 76H228M192 86H222M192 96H214" stroke={INK3} strokeWidth={1.5} />
      <Bubble1 x={170} y={134} w={76} h={34} tone={SIGNAL} fill={SIGNAL_TINT} tail="right" />
      <path d="M182 146H232M182 156H218" stroke={SIGNAL} strokeWidth={1.5} />
      <line x1={124} y1={84} x2={150} y2={84} stroke={INK3} strokeWidth={1} />
      <Key x={120} y={88} anchor="end" fill={INK} size={9.5}>
        PERSONALIZED
      </Key>
      <line x1={250} y1={151} x2={276} y2={151} stroke={SIGNAL} strokeWidth={1} />
      <Key x={280} y={155} fill={SIGNAL} size={9.5}>
        RAPID RESPONSE
      </Key>
    </Frame>
  );
}

/** Brand and customer taking turns: a two-way dialogue. */
export function Dialogue() {
  const turns = [
    { y: 36, side: "left" as const },
    { y: 92, side: "right" as const },
    { y: 148, side: "left" as const },
    { y: 204, side: "right" as const },
  ];
  return (
    <Frame
      width={400}
      height={286}
      label="A brand seal on the left and a customer on the right. Between them four speech bubbles take turns, brand, customer, brand, customer, stepping down the plate."
    >
      <Mark2 x={44} y={140} r={18} />
      <Person3 x={356} y={170} k={1.5} />
      {turns.map((t, i) => {
        const brand = t.side === "left";
        const x = brand ? 84 : 196;
        return (
          <g key={i}>
            <Bubble1 x={x} y={t.y} w={120} h={34} tone={brand ? SIGNAL : INK} fill={brand ? SIGNAL_TINT : PAPER} tail={brand ? "left" : "right"} />
            <path d={`M${x + 14} ${t.y + 13}H${x + 104}M${x + 14} ${t.y + 23}H${x + 80}`} stroke={brand ? SIGNAL : INK3} strokeWidth={1.5} />
          </g>
        );
      })}
      <Key x={200} y={276} anchor="middle" fill={SIGNAL} size={10}>
        TWO-WAY DIALOGUE
      </Key>
    </Frame>
  );
}

/** A phone aimed at the centre of a target. */
export function Bullseye() {
  return (
    <Frame
      width={400}
      height={256}
      label="A phone on the left fires an arrow straight into the centre of a target."
    >
      {[92, 66, 40].map((r, i) => (
        <circle key={r} cx={270} cy={120} r={r} fill={i % 2 === 0 ? PAPER2 : PAPER} stroke={INK} strokeWidth={1.25} />
      ))}
      <circle cx={270} cy={120} r={15} fill={SIGNAL} />
      <Tool kind="dd" x={54} y={120} k={1.3} tone={SIGNAL} fill={SIGNAL_TINT} />
      <line x1={86} y1={120} x2={262} y2={120} stroke={SIGNAL} strokeWidth={2.5} />
      <path d={headAlong1(266, 120, 1, 0, 12)} fill="none" stroke={SIGNAL} strokeWidth={2.5} />
      <path d="M96 120L86 112M96 120L86 128M106 120L96 112M106 120L96 128" stroke={SIGNAL} strokeWidth={1.5} />
      <Key x={270} y={242} anchor="middle" fill={SIGNAL} size={10}>
        HIGHLY TARGETED
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   DISCUSSION — selecting promotional tools
   ========================================================================== */

/** A budget on a balance between mass advertising and personal selling. */
export function BudgetScale() {
  return (
    <Frame
      height={300}
      label="A balance. On its left pan a megaphone, mass advertising; on its right pan two people, personal selling. On top of the beam a stack of coins, the budget, with a question mark above it."
    >
      <Key x={400} y={36} anchor="middle" fill={INK} size={10.5}>
        THE BUDGET
      </Key>
      <Display x={400} y={84} anchor="middle" fill={SIGNAL} size={34}>
        ?
      </Display>
      <Coins2 x={400} y={156} n={8} tone={SIGNAL} fill={SIGNAL_TINT} w={40} />
      <line x1={160} y1={160} x2={640} y2={160} stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <path d="M400 162L370 250H430Z" fill={PAPER2} stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
      <line x1={330} y1={250} x2={470} y2={250} stroke={INK} strokeWidth={2} />
      {[
        { x: 170, kind: "ad" as const, name: "MASS ADVERTISING" },
        { x: 630, kind: "ps" as const, name: "PERSONAL SELLING" },
      ].map((p) => (
        <g key={p.x}>
          <path d={`M${p.x} 160L${p.x - 64} 222M${p.x} 160L${p.x + 64} 222`} stroke={INK3} strokeWidth={1} />
          <path d={`M${p.x - 64} 222H${p.x + 64}Q${p.x + 60} 236 ${p.x} 236Q${p.x - 60} 236 ${p.x - 64} 222Z`} fill={PAPER2} stroke={INK} strokeWidth={1.5} />
          <Tool kind={p.kind} x={p.x} y={202} k={1.2} />
          <Key x={p.x} y={264} anchor="middle" fill={INK} size={10.5}>
            {p.name}
          </Key>
        </g>
      ))}
    </Frame>
  );
}

/* ==========================================================================
   THE NEED FOR IMC
   ========================================================================== */

/** One consumer, messages arriving from every side. */
export function Bombarded() {
  const cx = 400;
  const cy = 176;
  const sources = Array.from({ length: 12 }, (_, i) => {
    const a = ((15 + i * 30) * Math.PI) / 180;
    return {
      kind: TOOLS[i % 5].kind,
      x: Math.round(cx + 322 * Math.cos(a)),
      y: Math.round(cy + 118 * Math.sin(a)),
    };
  });
  return (
    <Frame
      height={322}
      label="A single consumer in the centre. Twelve sources ring them, megaphones, newspapers, coupons, salespeople and phones, and every one fires an arrow straight at them."
    >
      <Key x={24} y={28} fill={INK} size={10.5}>
        A BROAD RANGE OF SOURCES
      </Key>
      {sources.map((s, i) => {
        const dx = cx - s.x;
        const dy = cy - s.y;
        const len = Math.hypot(dx, dy);
        const ux = dx / len;
        const uy = dy / len;
        return (
          <Arrow2
            key={i}
            x1={Math.round(s.x + ux * 34)}
            y1={Math.round(s.y + uy * 24)}
            x2={Math.round(cx - ux * 58)}
            y2={Math.round(cy - uy * 52)}
            tone={COUNTER}
            width={1.1}
            size={6}
          />
        );
      })}
      {sources.map((s, i) => (
        <Tool key={i} kind={s.kind} x={s.x} y={s.y} k={0.85} tone={INK} />
      ))}
      <Person3 x={cx} y={cy + 34} k={2} stroke={INK} fill={PAPER2} />
    </Frame>
  );
}

/** Three sources, three different shapes, one confused picture. */
export function ConfusedImage() {
  const rows = [
    { y: 60, kind: "ad" as const, shape: "square" as const },
    { y: 145, kind: "pr" as const, shape: "triangle" as const },
    { y: 230, kind: "dd" as const, shape: "star" as const },
  ];
  return (
    <Frame
      height={300}
      label="Three sources on the left, a megaphone, a newspaper and a phone, each send a differently shaped message: a square, a triangle, a dotted ring. All three arrive in one consumer's thought cloud, where the shapes pile on top of each other beside a question mark."
    >
      {rows.map((r) => (
        <g key={r.y}>
          <Tool kind={r.kind} x={90} y={r.y} k={1.2} />
          <Arrow2 x1={130} y1={r.y} x2={226} y2={r.y} tone={INK3} width={1.1} size={6} />
          <OddMark x={250} y={r.y} shape={r.shape} r={13} />
          <Arrow2 x1={272} y1={r.y} x2={536} y2={104 + (r.y - 145) / 6} tone={COUNTER} width={1.1} size={6} />
        </g>
      ))}
      <Key x={90} y={290} anchor="middle" fill={INK} size={9.5}>
        DIFFERENT SOURCES
      </Key>
      <Key x={250} y={290} anchor="middle" fill={COUNTER} size={9.5}>
        CONFLICTING MESSAGES
      </Key>
      <ellipse cx={624} cy={106} rx={84} ry={52} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.5} />
      <OddMark x={598} y={104} shape="square" r={15} />
      <OddMark x={622} y={98} shape="triangle" r={15} />
      <OddMark x={612} y={120} shape="star" r={15} />
      <Display x={672} y={122} anchor="middle" fill={COUNTER} size={34}>
        ?
      </Display>
      <circle cx={626} cy={172} r={5} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.25} />
      <circle cx={630} cy={188} r={3.5} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.25} />
      <Person3 x={636} y={276} k={2} stroke={INK} />
      <Key x={624} y={36} anchor="middle" fill={COUNTER} size={10}>
        CONFUSED COMPANY IMAGE
      </Key>
    </Frame>
  );
}

/** Media broken into many pieces; the route to the consumer winds through them. */
export function Fragmented() {
  const cells = [
    { x: 30, y: 44, kind: "ad" as const },
    { x: 146, y: 44, kind: "pr" as const },
    { x: 262, y: 44, kind: "dd" as const },
    { x: 30, y: 118, kind: "dd" as const },
    { x: 146, y: 118, kind: "sp" as const },
    { x: 262, y: 118, kind: "ad" as const },
    { x: 30, y: 192, kind: "pr" as const },
    { x: 146, y: 192, kind: "ad" as const },
    { x: 262, y: 192, kind: "sp" as const },
  ];
  const jag = [
    [8, 4, 0, 6],
    [0, 7, 5, 0],
    [6, 0, 8, 3],
    [0, 5, 7, 0],
    [7, 0, 0, 8],
    [3, 6, 0, 4],
    [5, 0, 6, 0],
    [0, 8, 3, 5],
    [6, 3, 0, 7],
  ];
  return (
    <Frame
      width={400}
      height={300}
      label="The media landscape drawn as nine broken, uneven shards, each holding a different medium. A brand seal at the top left and a consumer at the bottom right, joined by a dashed route that has to wind through the cracks between the shards."
    >
      <Key x={380} y={24} anchor="end" fill={INK} size={9.5}>
        FRAGMENTED MEDIA LANDSCAPE
      </Key>
      {cells.map((c, i) => {
        const [a, b, d, e] = jag[i];
        const w = 108;
        const h = 64;
        return (
          <g key={i}>
            <path
              d={`M${c.x + a} ${c.y}L${c.x + w} ${c.y + b}L${c.x + w - d} ${c.y + h}L${c.x} ${c.y + h - e}Z`}
              fill={PAPER2}
              stroke={INK3}
              strokeWidth={1.1}
              strokeLinejoin="round"
            />
            <Tool kind={c.kind} x={c.x + 54} y={c.y + 32} k={0.6} tone={INK3} />
          </g>
        );
      })}
      <Mark2 x={18} y={22} r={10} />
      <path
        d="M30 30H142V113H258V187H374V262H336"
        fill="none"
        stroke={SIGNAL}
        strokeWidth={1.75}
        strokeDasharray="5 4"
        strokeLinejoin="round"
      />
      <path d={headAlong1(332, 262, -1, 0, 7)} fill="none" stroke={SIGNAL} strokeWidth={1.75} />
      <Person3 x={312} y={292} k={1.1} stroke={SIGNAL} />
    </Frame>
  );
}

/** The same three sources, now all sending the same seal, bound into one. */
export function TiedTogether() {
  const rows = [
    { y: 60, kind: "ad" as const },
    { y: 145, kind: "pr" as const },
    { y: 230, kind: "dd" as const },
  ];
  return (
    <Frame
      height={300}
      label="The same three sources, megaphone, newspaper and phone. This time each sends the same brand seal, and the three lines are drawn together through a single ring labelled IMC, then carried as one arrow into the consumer's thought cloud, which holds one clear seal."
    >
      {rows.map((r) => (
        <g key={r.y}>
          <Tool kind={r.kind} x={90} y={r.y} k={1.2} />
          <Arrow2 x1={130} y1={r.y} x2={226} y2={r.y} tone={INK3} width={1.1} size={6} />
          <Mark2 x={250} y={r.y} r={13} />
          <path d={`M266 ${r.y}C330 ${r.y} 350 145 392 145`} fill="none" stroke={SIGNAL} strokeWidth={1.75} />
        </g>
      ))}
      <circle cx={420} cy={145} r={30} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={2.25} />
      <Display x={420} y={151} anchor="middle" fill={SIGNAL} size={16}>
        IMC
      </Display>
      <Arrow2 x1={450} y1={140} x2={538} y2={114} tone={SIGNAL} width={3} />
      <Key x={420} y={200} anchor="middle" fill={SIGNAL} size={9.5}>
        TIES TOGETHER
      </Key>
      <Key x={250} y={290} anchor="middle" fill={SIGNAL} size={9.5}>
        {"ALL OF THE COMPANY'S MESSAGES"}
      </Key>
      <ellipse cx={624} cy={106} rx={84} ry={52} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
      <Mark2 x={624} y={106} r={26} />
      <circle cx={626} cy={172} r={5} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.25} />
      <circle cx={630} cy={188} r={3.5} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.25} />
      <Person3 x={636} y={276} k={2} stroke={INK} />
      <Key x={624} y={36} anchor="middle" fill={SIGNAL} size={10}>
        ONE COMPANY IMAGE
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   DEFINING IMC
   ========================================================================== */

/** Five loose channels pass through one clasp and leave aligned. */
export function Coordinated() {
  const ys = [44, 96, 148, 200, 252];
  return (
    <Frame
      height={296}
      label="Five channels start on the left, one from each promotion tool, as wandering grey lines. They pass through a single clasp in the middle. On the far side they run as five straight parallel lines in signal colour into one brand seal."
    >
      {TOOLS.map((t, i) => {
        const inY = 118 + i * 16;
        const bend = i % 2 === 0 ? 36 : -36;
        return (
          <g key={t.kind}>
            <Tool kind={t.kind} x={56} y={ys[i]} k={0.95} />
            <path
              d={`M${92} ${ys[i]}C${170} ${ys[i] + bend} ${250} ${inY - bend} ${350} ${inY}`}
              fill="none"
              stroke={INK3}
              strokeWidth={1.4}
            />
            <line x1={410} y1={inY} x2={622} y2={inY} stroke={SIGNAL} strokeWidth={1.75} />
          </g>
        );
      })}
      <rect x={350} y={100} width={60} height={100} rx={14} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={2} />
      <Key x={380} y={86} anchor="middle" fill={SIGNAL} size={9.5}>
        INTEGRATING AND COORDINATING
      </Key>
      <path d="M622 118L660 150M622 134L660 150M622 150H660M622 166L660 150M622 182L660 150" stroke={SIGNAL} strokeWidth={1.25} />
      <Mark2 x={698} y={150} r={34} />
      <Key x={170} y={288} anchor="middle" fill={INK3} size={9.5}>
        MANY COMMUNICATIONS CHANNELS
      </Key>
    </Frame>
  );
}

/** Clear, consistent, compelling — one tile each. */
export function ClearConsistentCompelling() {
  const corner = (x: number, y: number, sx: number, sy: number) =>
    `M${x} ${y + sy * 14}V${y}H${x + sx * 14}`;
  return (
    <Frame
      height={232}
      label="Three tiles. Clear: a sharp brand seal framed by viewfinder corners. Consistent: three identical seals in a row joined by equals signs. Compelling: a seal with a person drawn toward it by an arrow."
    >
      {[140, 400, 660].map((x) => (
        <rect key={x} x={x - 116} y={20} width={232} height={154} fill={PAPER} stroke={RULE} strokeWidth={1} />
      ))}
      <Mark2 x={140} y={97} r={30} />
      <path
        d={[
          corner(96, 53, 1, 1),
          corner(184, 53, -1, 1),
          corner(96, 141, 1, -1),
          corner(184, 141, -1, -1),
        ].join("")}
        fill="none"
        stroke={INK}
        strokeWidth={1.75}
      />
      {[336, 400, 464].map((x) => (
        <Mark2 key={x} x={x} y={97} r={20} />
      ))}
      {[368, 432].map((x) => (
        <path key={x} d={`M${x - 5} 94H${x + 5}M${x - 5} 100H${x + 5}`} stroke={INK} strokeWidth={1.5} />
      ))}
      <Mark2 x={612} y={97} r={26} />
      <Arrow2 x1={690} y1={97} x2={648} y2={97} tone={SIGNAL} width={2} />
      <Person3 x={718} y={136} k={1.4} />
      {[
        { x: 140, n: "CLEAR" },
        { x: 400, n: "CONSISTENT" },
        { x: 660, n: "COMPELLING" },
      ].map((t) => (
        <Key key={t.x} x={t.x} y={204} anchor="middle" fill={SIGNAL} size={10.5}>
          {t.n}
        </Key>
      ))}
    </Frame>
  );
}

/** A department box. */
function Dept({ x, y, tone }: { x: number; y: number; tone: string }) {
  return (
    <g>
      <rect x={x} y={y} width={112} height={70} fill={PAPER} stroke={tone} strokeWidth={1.5} />
      <Key x={x + 56} y={y + 18} anchor="middle" fill={tone} size={8.5}>
        DEPARTMENT
      </Key>
    </g>
  );
}

/** Two departments: broken apart with mismatched messages, then joined. */
export function Disconnect() {
  return (
    <Frame
      width={400}
      height={300}
      label="Two rows of two departments. In the top row the link between them is broken and each sends a different shape. In the bottom row they are joined by a solid line and both send the same brand seal."
    >
      <Dept x={30} y={30} tone={COUNTER} />
      <Dept x={258} y={30} tone={COUNTER} />
      <OddMark x={86} y={74} shape="square" r={12} />
      <OddMark x={314} y={74} shape="triangle" r={12} />
      <path d="M142 65H182L190 55L198 75L206 65" fill="none" stroke={COUNTER} strokeWidth={1.5} strokeLinejoin="round" />
      <line x1={220} y1={65} x2={258} y2={65} stroke={COUNTER} strokeWidth={1.5} />
      <Key x={200} y={128} anchor="middle" fill={COUNTER} size={9.5}>
        UNCOORDINATED
      </Key>
      <line x1={20} y1={150} x2={380} y2={150} stroke={RULE} strokeWidth={1} />
      <Dept x={30} y={172} tone={SIGNAL} />
      <Dept x={258} y={172} tone={SIGNAL} />
      <Mark2 x={86} y={216} r={12} />
      <Mark2 x={314} y={216} r={12} />
      <line x1={142} y1={207} x2={258} y2={207} stroke={SIGNAL} strokeWidth={2.5} />
      <Key x={200} y={272} anchor="middle" fill={SIGNAL} size={9.5}>
        COORDINATED
      </Key>
    </Frame>
  );
}

/** Store, billboard, app, package, salesperson — the same seal on each. */
export function Touchpoints() {
  return (
    <Frame
      height={238}
      label="Five touchpoints in a row, a store, a billboard, a phone app, a package and a salesperson, each carrying the same brand seal, all tied together by one line along the bottom."
    >
      <Store2 x={100} y={150} k={1.25} />
      <Mark2 x={100} y={104} r={7} />
      {/* billboard */}
      <path d="M232 150V112M268 150V112" stroke={INK} strokeWidth={1.5} />
      <rect x={202} y={60} width={96} height={52} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <Mark2 x={250} y={86} r={14} />
      {/* phone */}
      <rect x={380} y={84} width={40} height={66} rx={6} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <rect x={386} y={94} width={28} height={44} fill={PAPER2} stroke={INK} strokeWidth={0.75} />
      <Mark2 x={400} y={116} r={9} />
      <Pack4 x={550} y={150} w={58} h={62} />
      <Mark2 x={550} y={122} r={12} />
      <Person3 x={700} y={150} k={1.7} />
      <Mark2 x={700} y={140} r={6} />
      <line x1={60} y1={164} x2={740} y2={164} stroke={SIGNAL} strokeWidth={2.25} />
      {[100, 250, 400, 550, 700].map((x) => (
        <line key={x} x1={x} y1={151} x2={x} y2={164} stroke={SIGNAL} strokeWidth={1.5} />
      ))}
      {["STORE", "BILLBOARD", "APP", "PACKAGE", "SALESPERSON"].map((n, i) => (
        <Key key={n} x={100 + i * 150} y={186} anchor="middle" fill={INK3} size={9.5}>
          {n}
        </Key>
      ))}
      <Key x={400} y={222} anchor="middle" fill={SIGNAL} size={10.5}>
        A UNIFIED BRAND IDENTITY ACROSS ALL TOUCHPOINTS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   STEPS IN DEVELOPING EFFECTIVE COMMUNICATION — cascading flow
   ========================================================================== */

export const STEPS = [
  ["IDENTIFY THE", "TARGET AUDIENCE"],
  ["DETERMINE THE", "OBJECTIVES"],
  ["DESIGN THE", "MESSAGE"],
  ["CHOOSE THE", "MEDIA"],
  ["SELECT SOURCE,", "COLLECT FEEDBACK"],
];

export function StepCascade() {
  const w = 170;
  const h = 58;
  const at = (i: number) => ({ x: 20 + i * 148, y: 44 + i * 66 });
  return (
    <Frame
      height={388}
      label="Five steps cascading down from top left to bottom right, each block feeding the next: identify the target audience, determine the objectives, design the message, choose the media, select the source and collect feedback. A dashed feedback line runs from the last step back up to the first."
    >
      {STEPS.map((s, i) => {
        const { x, y } = at(i);
        const last = i === STEPS.length - 1;
        return (
          <g key={i}>
            {i < STEPS.length - 1 ? (
              <path
                d={`M${x + 60} ${y + h}V${y + 66 + 29}H${at(i + 1).x - 4}`}
                fill="none"
                stroke={INK}
                strokeWidth={1.5}
              />
            ) : null}
            {i < STEPS.length - 1 ? (
              <path d={headAlong1(at(i + 1).x - 2, y + 66 + 29, 1, 0, 7)} fill="none" stroke={INK} strokeWidth={1.5} />
            ) : null}
            <rect
              x={x}
              y={y}
              width={w}
              height={h}
              fill={last ? SIGNAL_TINT : PAPER}
              stroke={last ? SIGNAL : INK}
              strokeWidth={1.5}
            />
            <Display x={x + 22} y={y + 40} anchor="middle" fill={SIGNAL} size={26}>
              {String(i + 1)}
            </Display>
            <Key x={x + 44} y={y + 25} fill={INK} size={9.5}>
              {s[0]}
            </Key>
            <Key x={x + 44} y={y + 41} fill={INK} size={9.5}>
              {s[1]}
            </Key>
          </g>
        );
      })}
      <path
        d={`M${at(4).x + 130} ${at(4).y}V22H${at(0).x + 105}V${at(0).y - 2}`}
        fill="none"
        stroke={COUNTER}
        strokeWidth={1.5}
        strokeDasharray="5 4"
      />
      <path d={headAlong1(at(0).x + 105, at(0).y - 1, 0, 1, 7)} fill="none" stroke={COUNTER} strokeWidth={1.5} />
      <Key x={at(4).x + 122} y={16} anchor="end" fill={COUNTER} size={9.5}>
        FEEDBACK
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   DETERMINING COMMUNICATION OBJECTIVES
   ========================================================================== */

/** Where each member of the audience stands, measured to the product. */
export function WhereTheyStand() {
  const people = [
    { x: 56, y: 178 },
    { x: 150, y: 200 },
    { x: 250, y: 222 },
  ];
  return (
    <Frame
      width={400}
      height={262}
      label="A product on the right. Three members of the target audience stand at different distances from it, near, middling and far, and a measuring line runs from each of them to the product."
    >
      <Pack4 x={352} y={150} w={48} h={58} tone={SIGNAL} fill={SIGNAL_TINT} />
      <Mark2 x={352} y={116} r={9} />
      <Key x={352} y={74} anchor="middle" fill={SIGNAL} size={9.5}>
        PRODUCT
      </Key>
      <line x1={24} y1={150} x2={376} y2={150} stroke={INK} strokeWidth={1.25} />
      {[56, 150, 250].map((x) => (
        <Person3 key={x} x={x} y={150} k={1.2} />
      ))}
      {people.map((p, i) => (
        <g key={p.x}>
          <line x1={p.x} y1={156} x2={p.x} y2={p.y + 4} stroke={RULE2} strokeWidth={1} />
          <line x1={p.x} y1={p.y} x2={352} y2={p.y} stroke={i === 1 ? SIGNAL : INK3} strokeWidth={i === 1 ? 1.75 : 1} />
          <path d={`M${p.x} ${p.y - 5}V${p.y + 5}M352 ${p.y - 5}V${p.y + 5}`} stroke={i === 1 ? SIGNAL : INK3} strokeWidth={1.25} />
        </g>
      ))}
      <line x1={352} y1={156} x2={352} y2={227} stroke={RULE2} strokeWidth={1} />
      <Key x={24} y={252} fill={INK} size={9.5}>
        WHERE THE TARGET AUDIENCE STANDS
      </Key>
    </Frame>
  );
}

export const READINESS = ["AWARENESS", "KNOWLEDGE", "LIKING", "PREFERENCE", "CONVICTION", "PURCHASE"];

/** Six rising stages, a consumer on the first, purchase at the top. */
export function ReadinessStairs() {
  return (
    <Frame
      height={300}
      label="Six columns rising like a staircase: awareness, knowledge, liking, preference, conviction and purchase, the last one lit. A consumer stands on the first step, and a dashed arrow climbs over the steps toward purchase."
    >
      <Key x={40} y={36} fill={INK} size={10.5}>
        BUYER-READINESS STAGES
      </Key>
      {READINESS.map((n, i) => {
        const x = 40 + i * 120;
        const top = 270 - (i + 1) * 36;
        const last = i === READINESS.length - 1;
        return (
          <g key={n}>
            <rect
              x={x}
              y={top}
              width={116}
              height={284 - top}
              fill={last ? SIGNAL : PAPER2}
              stroke={last ? SIGNAL : INK}
              strokeWidth={1.25}
            />
            <Key x={x + 58} y={top + 22} anchor="middle" fill={last ? PAPER : INK} size={9.5}>
              {n}
            </Key>
          </g>
        );
      })}
      <Person3 x={74} y={234} k={1.2} stroke={SIGNAL} fill={SIGNAL_TINT} />
      <line x1={112} y1={194} x2={650} y2={42} stroke={SIGNAL} strokeWidth={1.75} strokeDasharray="6 4" />
      <path d={headAlong1(654, 41, 538, -152, 10)} fill="none" stroke={SIGNAL} strokeWidth={1.75} />
    </Frame>
  );
}

/** A consumer guided along a path to a ticked purchase decision. */
export function GuideToPurchase() {
  return (
    <Frame
      width={400}
      height={232}
      label="A consumer on the left. A dashed guiding path curves up and over to a large ticked box on the right, the final purchase decision."
    >
      <Person3 x={64} y={186} k={1.4} />
      <path d="M92 142Q190 20 282 110" fill="none" stroke={SIGNAL} strokeWidth={2} strokeDasharray="6 4" />
      <path d={headAlong1(286, 114, 1, 1, 10)} fill="none" stroke={SIGNAL} strokeWidth={2} />
      <rect x={290} y={112} width={70} height={70} fill={SIGNAL} />
      <path d="M306 146L320 162L346 128" fill="none" stroke={PAPER} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
      <Key x={200} y={220} anchor="middle" fill={SIGNAL} size={9.5}>
        FINAL PURCHASE DECISION
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   DESIGNING THE MESSAGE
   ========================================================================== */

/** Attention, interest, desire, action: four bands narrowing to the act. */
export function Aida() {
  const bands = ["GET ATTENTION", "HOLD INTEREST", "AROUSE DESIRE", "OBTAIN ACTION"];
  return (
    <Frame
      height={284}
      label="Four bands stacked into a funnel, each narrower than the one above: get attention, hold interest, arouse desire, and at the narrow bottom, lit, obtain action."
    >
      {bands.map((b, i) => {
        const w = 720 - i * 140;
        const x = 400 - w / 2;
        const y = 20 + i * 64;
        const last = i === bands.length - 1;
        return (
          <g key={b}>
            <rect x={x} y={y} width={w} height={54} fill={last ? SIGNAL : i === 0 ? PAPER : PAPER2} stroke={last ? SIGNAL : INK} strokeWidth={1.25} />
            <Display x={x + 22} y={y + 36} fill={last ? PAPER : SIGNAL} size={22}>
              {b[b.indexOf(" ") + 1]}
            </Display>
            <Key x={400} y={y + 32} anchor="middle" fill={last ? PAPER : INK} size={11}>
              {b}
            </Key>
          </g>
        );
      })}
    </Frame>
  );
}

/** Rational, emotional, moral: three kinds of appeal. */
export function ThreeAppeals() {
  return (
    <Frame
      height={232}
      label="Three tiles. Rational: a rising bar chart with a tick. Emotional: a heart. Moral: a balanced pair of scales."
    >
      {[140, 400, 660].map((x) => (
        <rect key={x} x={x - 116} y={20} width={232} height={154} fill={PAPER} stroke={RULE} strokeWidth={1} />
      ))}
      <path d="M94 140H192" stroke={INK} strokeWidth={1.25} />
      {[
        { x: 104, h: 30 },
        { x: 130, h: 52 },
        { x: 156, h: 74 },
      ].map((b) => (
        <rect key={b.x} x={b.x} y={140 - b.h} width={20} height={b.h} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.25} />
      ))}
      <path d="M104 56L114 66L132 46" fill="none" stroke={SIGNAL} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M400 138C336 96 356 46 400 72C444 46 464 96 400 138Z" fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.75} strokeLinejoin="round" />
      <g stroke={SIGNAL} strokeWidth={1.5} fill="none">
        <path d="M660 50V140M636 140H684M606 62H714" />
        <path d="M614 62L598 104M614 62L630 104M706 62L690 104M706 62L722 104" strokeWidth={1} />
        <path d="M594 104H634Q614 122 594 104ZM686 104H726Q706 122 686 104Z" fill={SIGNAL_TINT} />
      </g>
      <circle cx={660} cy={50} r={4} fill={SIGNAL} />
      {[
        { x: 140, n: "RATIONAL" },
        { x: 400, n: "EMOTIONAL" },
        { x: 660, n: "MORAL" },
      ].map((t) => (
        <Key key={t.x} x={t.x} y={204} anchor="middle" fill={SIGNAL} size={10.5}>
          {t.n}
        </Key>
      ))}
    </Frame>
  );
}

/** One message states its conclusion; the other leaves it to the listener. */
export function ConcludeOrLeave() {
  return (
    <Frame
      width={400}
      height={300}
      label="Two messages. The first ends in a boxed conclusion and hands it to the listener. The second ends in a question mark, and the listener supplies the conclusion in their own thought bubble."
    >
      <Bubble1 x={24} y={24} w={236} h={88} />
      <path d="M40 46H240M40 62H220" stroke={INK3} strokeWidth={1.5} />
      <rect x={40} y={74} width={140} height={24} fill={SIGNAL} />
      <Key x={110} y={90} anchor="middle" fill={PAPER} size={9}>
        CONCLUSION
      </Key>
      <Person3 x={330} y={112} k={1.4} />
      <Key x={24} y={140} fill={SIGNAL} size={9.5}>
        DRAW A CONCLUSION
      </Key>
      <line x1={20} y1={156} x2={380} y2={156} stroke={RULE} strokeWidth={1} />
      <Bubble1 x={24} y={182} w={236} h={66} />
      <path d="M40 204H240M40 220H200" stroke={INK3} strokeWidth={1.5} />
      <Display x={230} y={234} anchor="middle" fill={COUNTER} size={24}>
        ?
      </Display>
      <ellipse cx={336} cy={196} rx={40} ry={20} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.25} />
      <rect x={316} y={189} width={40} height={14} fill={COUNTER} />
      <circle cx={326} cy={224} r={3.5} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1} />
      <Person3 x={322} y={282} k={1.4} />
      <Key x={24} y={286} fill={COUNTER} size={9.5}>
        LEAVE IT TO THE AUDIENCE
      </Key>
    </Frame>
  );
}

/** An ad laid out on a grid, with its colours and its sound called out. */
export function AdFormat() {
  const wave = Array.from({ length: 16 }, (_, i) => {
    const x = 130 + i * 9;
    const h = [4, 9, 14, 7, 12, 18, 10, 5, 13, 16, 8, 11, 6, 14, 9, 4][i];
    return `M${x} ${232 - h}V${232 + h}`;
  }).join("");
  return (
    <Frame
      width={400}
      height={300}
      label="An ad poster on a dashed layout grid: a heavy headline bar, an image block, lines of copy and a sound wave. Beside it three colour swatches. Callouts name design, layout, color and sound."
    >
      <rect x={112} y={24} width={176} height={250} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <path d="M170 24V274M230 24V274M112 108H288M112 190H288" stroke={RULE2} strokeWidth={1} strokeDasharray="3 3" />
      <rect x={126} y={40} width={148} height={16} fill={INK} />
      <rect x={126} y={70} width={148} height={78} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.25} />
      <Mark2 x={200} y={109} r={16} />
      <path d="M126 166H274M126 178H250" stroke={INK3} strokeWidth={1.5} />
      <path d={wave} stroke={SIGNAL} strokeWidth={2} strokeLinecap="round" />
      {[SIGNAL, COUNTER, INK].map((c, i) => (
        <rect key={i} x={312} y={96 + i * 26} width={20} height={20} fill={c} />
      ))}
      <line x1={100} y1={48} x2={124} y2={48} stroke={INK3} strokeWidth={1} />
      <Key x={96} y={52} anchor="end" fill={INK} size={9.5}>
        DESIGN
      </Key>
      <line x1={100} y1={190} x2={112} y2={190} stroke={INK3} strokeWidth={1} />
      <Key x={96} y={194} anchor="end" fill={INK} size={9.5}>
        LAYOUT
      </Key>
      <Key x={322} y={84} anchor="middle" fill={INK} size={9.5}>
        COLOR
      </Key>
      <line x1={278} y1={232} x2={300} y2={232} stroke={INK3} strokeWidth={1} />
      <Key x={304} y={236} fill={SIGNAL} size={9.5}>
        SOUND
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   SETTING THE PROMOTIONAL BUDGET — four methods, one plate each
   ========================================================================== */

/** What is left once everything else is paid for. */
export function Affordable() {
  return (
    <Frame
      width={400}
      height={176}
      label="One bar of company funds. Most of it goes to everything else; only the small piece left over at the end goes to promotion."
    >
      <Key x={30} y={44} fill={INK} size={9.5}>
        WHAT THE COMPANY CAN AFFORD
      </Key>
      <rect x={30} y={58} width={260} height={44} fill={PAPER2} stroke={INK3} strokeWidth={1.25} />
      <rect x={290} y={58} width={80} height={44} fill={SIGNAL} />
      <rect x={30} y={58} width={340} height={44} fill="none" stroke={INK} strokeWidth={1.25} />
      <Key x={160} y={130} anchor="middle" fill={INK3} size={9.5}>
        EVERYTHING ELSE
      </Key>
      <Key x={330} y={130} anchor="middle" fill={SIGNAL} size={9.5}>
        PROMOTION
      </Key>
    </Frame>
  );
}

/** A fixed slice of current and forecasted sales. */
export function PercentOfSales() {
  return (
    <Frame
      width={400}
      height={196}
      label="Two sales bars, current and forecasted. The same fixed slice at the start of each, marked with a percent sign, becomes the promotion budget."
    >
      <Key x={30} y={36} fill={INK} size={9.5}>
        CURRENT SALES
      </Key>
      <rect x={30} y={44} width={290} height={40} fill={PAPER2} stroke={INK} strokeWidth={1.25} />
      <rect x={30} y={44} width={58} height={40} fill={SIGNAL} />
      <Display x={59} y={71} anchor="middle" fill={PAPER} size={18}>
        %
      </Display>
      <Key x={30} y={116} fill={INK} size={9.5}>
        FORECASTED SALES
      </Key>
      <rect x={30} y={124} width={340} height={40} fill={PAPER} stroke={INK} strokeWidth={1.25} strokeDasharray="5 4" />
      <rect x={30} y={124} width={68} height={40} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.25} strokeDasharray="5 4" />
      <Display x={64} y={151} anchor="middle" fill={SIGNAL} size={18}>
        %
      </Display>
    </Frame>
  );
}

/** Our stack set level with the competitor's. */
export function Parity() {
  return (
    <Frame
      width={400}
      height={226}
      label="Two coin stacks of the same height, the competitors' and ours, joined by a dashed level line with an equals sign between them."
    >
      <Coins2 x={120} y={186} n={10} tone={COUNTER} fill={COUNTER_TINT} w={50} />
      <Coins2 x={280} y={186} n={10} tone={SIGNAL} fill={SIGNAL_TINT} w={50} />
      <line x1={80} y1={116} x2={320} y2={116} stroke={INK} strokeWidth={1} strokeDasharray="4 3" />
      <Display x={200} y={172} anchor="middle" fill={INK} size={30}>
        =
      </Display>
      <Key x={120} y={212} anchor="middle" fill={COUNTER} size={9.5}>
        {"COMPETITORS' OUTLAYS"}
      </Key>
      <Key x={280} y={212} anchor="middle" fill={SIGNAL} size={9.5}>
        OUR BUDGET
      </Key>
    </Frame>
  );
}

/** A flag (the objective), the tasks it needs, and their cost added up. */
export function ObjectiveTask() {
  const tasks = [
    { y: 30, n: 2 },
    { y: 80, n: 3 },
    { y: 130, n: 2 },
  ];
  return (
    <Frame
      width={400}
      height={206}
      label="A flag on the left, the objective. Arrows lead to three task boxes, each with a small pile of coins beside it. A bracket gathers the three piles into one stack, the budget."
    >
      <line x1={36} y1={50} x2={36} y2={134} stroke={INK} strokeWidth={1.75} />
      <path d="M37 50L74 62L37 74Z" fill={SIGNAL} />
      <Key x={36} y={156} anchor="middle" fill={SIGNAL} size={9}>
        OBJECTIVE
      </Key>
      {tasks.map((t) => (
        <g key={t.y}>
          <Arrow2 x1={80} y1={68} x2={116} y2={t.y + 18} tone={INK3} width={1} size={6} />
          <rect x={120} y={t.y} width={96} height={36} fill={PAPER} stroke={INK} strokeWidth={1.25} />
          <Key x={168} y={t.y + 22} anchor="middle" fill={INK} size={9.5}>
            TASK
          </Key>
          <Coins2 x={246} y={t.y + 34} n={t.n} w={24} />
        </g>
      ))}
      <path d="M276 30H286V166H276" fill="none" stroke={INK} strokeWidth={1.25} />
      <Arrow2 x1={290} y1={98} x2={322} y2={98} tone={SIGNAL} width={1.5} size={6} />
      <Coins2 x={356} y={136} n={7} tone={SIGNAL} fill={SIGNAL_TINT} w={34} />
      <Key x={356} y={160} anchor="middle" fill={SIGNAL} size={9.5}>
        BUDGET
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   OBJECTIVE AND TASK METHOD ADVANTAGE
   ========================================================================== */

/** Spending against results, with the assumption written down on the line. */
export function Assumptions() {
  return (
    <Frame
      width={400}
      height={262}
      label="A chart of dollars spent against promotion results. A line rises through it, and a card pinned to the line reads assumption: the relationship has been written out."
    >
      <path d="M60 36V210H372" fill="none" stroke={INK} strokeWidth={1.25} />
      <Key x={66} y={30} fill={INK} size={9}>
        PROMOTION RESULTS
      </Key>
      <Key x={372} y={234} anchor="end" fill={INK} size={9}>
        DOLLARS SPENT
      </Key>
      <line x1={60} y1={210} x2={344} y2={78} stroke={SIGNAL} strokeWidth={2.25} />
      {[
        { x: 132, y: 177 },
        { x: 216, y: 137 },
        { x: 300, y: 98 },
      ].map((p) => (
        <circle key={p.x} cx={p.x} cy={p.y} r={4.5} fill={PAPER} stroke={SIGNAL} strokeWidth={1.75} />
      ))}
      <rect x={112} y={58} width={120} height={36} fill={PAPER} stroke={SIGNAL} strokeWidth={1.5} />
      <Key x={172} y={80} anchor="middle" fill={SIGNAL} size={9.5}>
        ASSUMPTION
      </Key>
      <line x1={196} y1={94} x2={214} y2={130} stroke={SIGNAL} strokeWidth={1} />
    </Frame>
  );
}

/** Objectives lead to tasks, tasks to the budget. */
export function LogicChain() {
  const boxes = [
    { x: 40, n: "OBJECTIVES" },
    { x: 300, n: "TASKS" },
    { x: 560, n: "BUDGET" },
  ];
  return (
    <Frame
      height={140}
      label="Three boxes joined by arrows in one line of reasoning: objectives, then tasks, then budget."
    >
      {boxes.map((b, i) => {
        const last = i === boxes.length - 1;
        return (
          <g key={b.n}>
            <rect x={b.x} y={40} width={200} height={60} fill={last ? SIGNAL : PAPER} stroke={last ? SIGNAL : INK} strokeWidth={1.5} />
            <Key x={b.x + 100} y={75} anchor="middle" fill={last ? PAPER : INK} size={11}>
              {b.n}
            </Key>
            {i < boxes.length - 1 ? <Arrow2 x1={b.x + 208} y1={70} x2={b.x + 252} y2={70} tone={INK} width={1.75} /> : null}
          </g>
        );
      })}
    </Frame>
  );
}

/** A coin stack tied by a line to a flag on a hill. */
export function TiedToGoals() {
  return (
    <Frame
      width={400}
      height={242}
      label="A stack of coins on the left tied by a taut line to a flag planted on a hill on the right: spending attached to the strategic goal."
    >
      <Coins2 x={84} y={200} n={9} tone={SIGNAL} fill={SIGNAL_TINT} w={46} />
      <path d="M200 200Q300 120 390 200Z" fill={PAPER2} stroke={INK} strokeWidth={1.25} />
      <line x1={296} y1={162} x2={296} y2={60} stroke={INK} strokeWidth={1.75} />
      <path d="M297 60L344 76L297 92Z" fill={SIGNAL} />
      <path d="M84 140Q190 64 294 100" fill="none" stroke={SIGNAL} strokeWidth={2.25} />
      <circle cx={84} cy={140} r={4} fill={SIGNAL} />
      <circle cx={294} cy={100} r={4} fill={SIGNAL} />
      <Key x={84} y={226} anchor="middle" fill={SIGNAL} size={9.5}>
        SPENDING
      </Key>
      <Key x={296} y={226} anchor="middle" fill={INK} size={9.5}>
        STRATEGIC GOALS
      </Key>
    </Frame>
  );
}

/** Past the known point, the results could land anywhere in a widening fan. */
export function PredictionFan() {
  const ends = [60, 100, 150, 196];
  return (
    <Frame
      width={400}
      height={262}
      label="The same chart of dollars spent against results. A solid line runs a short way from the origin, then splits into a widening fan of dashed lines, any of which could be the outcome, with a question mark inside."
    >
      <path d="M60 36V210H372" fill="none" stroke={INK} strokeWidth={1.25} />
      <Key x={66} y={30} fill={INK} size={9}>
        RESULTS
      </Key>
      <Key x={372} y={234} anchor="end" fill={INK} size={9}>
        DOLLARS SPENT
      </Key>
      <path d="M130 172L360 60V196Z" fill={COUNTER_TINT} />
      <line x1={60} y1={210} x2={130} y2={172} stroke={INK} strokeWidth={2.25} />
      {ends.map((y) => (
        <line key={y} x1={130} y1={172} x2={360} y2={y} stroke={COUNTER} strokeWidth={1.25} strokeDasharray="5 4" />
      ))}
      <circle cx={130} cy={172} r={4.5} fill={PAPER} stroke={INK} strokeWidth={1.75} />
      <Display x={322} y={146} anchor="middle" fill={COUNTER} size={26}>
        ?
      </Display>
      <Key x={392} y={30} anchor="end" fill={COUNTER} size={9}>
        PREDICTION
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   MEASURING EFFECTIVENESS
   ========================================================================== */

/** Money in, a campaign, more money back. */
export function Roi() {
  return (
    <Frame
      width={400}
      height={214}
      label="A small stack of coins spent on the left goes into a campaign, shown as a megaphone, and a taller stack comes back on the right: the return on the investment."
    >
      <Key x={200} y={30} anchor="middle" fill={INK} size={9.5}>
        RETURN ON INVESTMENT
      </Key>
      <Coins2 x={60} y={170} n={5} w={40} />
      <Arrow2 x1={92} y1={134} x2={160} y2={122} tone={INK3} width={1.25} size={6} />
      <Tool kind="ad" x={200} y={120} k={1.25} />
      <Arrow2 x1={244} y1={122} x2={306} y2={134} tone={SIGNAL} width={1.5} size={6} />
      <Coins2 x={340} y={170} n={9} tone={SIGNAL} fill={SIGNAL_TINT} w={40} />
      <Key x={60} y={196} anchor="middle" fill={INK} size={9.5}>
        INVESTMENT
      </Key>
      <Key x={340} y={196} anchor="middle" fill={SIGNAL} size={9.5}>
        RETURN
      </Key>
    </Frame>
  );
}

/** An interviewer asks; the audience member pictures the message. */
export function Remember() {
  return (
    <Frame
      width={400}
      height={262}
      label="An interviewer with a clipboard asks a question, drawn as a bubble with a question mark. The member of the target audience across from them pictures the brand seal in a thought bubble."
    >
      <Bubble1 x={36} y={40} w={96} h={54} />
      <Display x={84} y={78} anchor="middle" fill={INK} size={28}>
        ?
      </Display>
      <Person3 x={80} y={212} k={1.6} />
      <rect x={100} y={176} width={20} height={26} fill={PAPER} stroke={INK} strokeWidth={1.25} />
      <path d="M104 186H116M104 192H114" stroke={INK3} strokeWidth={1} />
      <ellipse cx={304} cy={82} rx={60} ry={42} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
      <Mark2 x={304} y={82} r={18} />
      <circle cx={312} cy={138} r={5} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.25} />
      <circle cx={316} cy={152} r={3.5} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.25} />
      <Person3 x={320} y={212} k={1.6} />
      <Key x={200} y={246} anchor="middle" fill={SIGNAL} size={9.5}>
        DO THEY REMEMBER THE MESSAGE?
      </Key>
    </Frame>
  );
}

/** A tally of times seen; a checklist of points recalled. */
export function SeenRecall() {
  const tally = (x0: number) =>
    `M${x0} 116V156M${x0 + 10} 116V156M${x0 + 20} 116V156M${x0 + 30} 116V156M${x0 - 6} 150L${x0 + 36} 122`;
  const points = [
    { y: 60, ok: true },
    { y: 88, ok: false },
    { y: 116, ok: true },
    { y: 144, ok: true },
  ];
  return (
    <Frame
      width={400}
      height={214}
      label="Left, an eye above tally marks counting the times the message was seen. Right, a card listing four points of the message, three of them ticked as recalled."
    >
      <path d="M62 70Q100 38 138 70Q100 102 62 70Z" fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <circle cx={100} cy={70} r={11} fill={INK} />
      <path d={tally(58) + tally(112)} stroke={INK} strokeWidth={1.75} strokeLinecap="round" />
      <Key x={100} y={196} anchor="middle" fill={INK} size={9.5}>
        TIMES SEEN
      </Key>
      <line x1={200} y1={30} x2={200} y2={176} stroke={RULE} strokeWidth={1} />
      <rect x={232} y={40} width={140} height={128} fill={PAPER} stroke={INK} strokeWidth={1.25} />
      {points.map((p) => (
        <g key={p.y}>
          <rect x={244} y={p.y - 7} width={14} height={14} fill={p.ok ? SIGNAL : PAPER} stroke={p.ok ? SIGNAL : INK3} strokeWidth={1.25} />
          {p.ok ? <path d={`M247 ${p.y}L250 ${p.y + 4}L256 ${p.y - 4}`} fill="none" stroke={PAPER} strokeWidth={1.75} strokeLinecap="round" /> : null}
          <line x1={268} y1={p.y} x2={356} y2={p.y} stroke={p.ok ? INK : RULE2} strokeWidth={1.5} />
        </g>
      ))}
      <Key x={302} y={196} anchor="middle" fill={SIGNAL} size={9.5}>
        POINTS RECALLED
      </Key>
    </Frame>
  );
}

/** Sales before and after the campaign; market share before and after. */
export function SalesShare() {
  const heights = [60, 64, 58, 62, 92, 104, 112, 110];
  const donut = (cx: number, p: number) => {
    const r = 56;
    const a0 = -Math.PI / 2;
    const a1 = a0 + p * Math.PI * 2;
    const x0 = r2(cx + r * Math.cos(a0));
    const y0 = r2(150 + r * Math.sin(a0));
    const x1 = r2(cx + r * Math.cos(a1));
    const y1 = r2(150 + r * Math.sin(a1));
    return `M${x0} ${y0}A${r} ${r} 0 ${p > 0.5 ? 1 : 0} 1 ${x1} ${y1}`;
  };
  return (
    <Frame
      height={292}
      label="Left, monthly sales bars: level before a dashed campaign line, clearly higher after it. Right, two market-share rings, before and after, the campaign's slice larger in the second."
    >
      <line x1={232} y1={40} x2={232} y2={244} stroke={SIGNAL} strokeWidth={1.5} strokeDasharray="5 4" />
      <Key x={238} y={50} fill={SIGNAL} size={9.5}>
        CAMPAIGN
      </Key>
      {heights.map((h, i) => {
        const after = i >= 4;
        return (
          <rect
            key={i}
            x={56 + i * 44 + (after ? 4 : 0)}
            y={240 - h}
            width={28}
            height={h}
            fill={after ? SIGNAL : PAPER2}
            stroke={after ? SIGNAL : INK3}
            strokeWidth={1.25}
          />
        );
      })}
      <line x1={44} y1={240} x2={420} y2={240} stroke={INK} strokeWidth={1.25} />
      <Key x={232} y={270} anchor="middle" fill={INK} size={10}>
        SALES
      </Key>
      {[
        { cx: 530, p: 0.18, n: "BEFORE" },
        { cx: 710, p: 0.3, n: "AFTER" },
      ].map((d) => (
        <g key={d.cx}>
          <circle cx={d.cx} cy={150} r={56} fill="none" stroke={RULE} strokeWidth={20} />
          <path d={donut(d.cx, d.p)} fill="none" stroke={SIGNAL} strokeWidth={20} />
          <Key x={d.cx} y={234} anchor="middle" fill={INK3} size={9.5}>
            {d.n}
          </Key>
        </g>
      ))}
      <Arrow2 x1={602} y1={150} x2={638} y2={150} tone={INK} width={1.5} size={6} />
      <Key x={620} y={270} anchor="middle" fill={INK} size={10}>
        MARKET SHARE
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   DISCUSSION — budgeting strategies
   ========================================================================== */

/** A fixed share of small first-year sales leaves a tiny budget. */
export function StartupSlice() {
  const years = [
    { x: 200, h: 44 },
    { x: 400, h: 120 },
    { x: 600, h: 200 },
  ];
  return (
    <Frame
      height={300}
      label="Three sales bars for years one, two and three, growing each year. The same fixed percentage is sliced off the top of each for promotion, so in year one the slice is a sliver. Above year one a faint megaphone and a question mark."
    >
      <Key x={40} y={34} fill={SIGNAL} size={10.5}>
        PERCENTAGE OF SALES
      </Key>
      <rect x={40} y={44} width={14} height={14} fill={SIGNAL} />
      <Key x={62} y={56} fill={INK3} size={9.5}>
        PROMOTION BUDGET
      </Key>
      {years.map((y, i) => {
        const top = 250 - y.h;
        const slice = Math.round(y.h * 0.2);
        return (
          <g key={y.x}>
            <rect x={y.x - 50} y={top} width={100} height={y.h} fill={PAPER2} stroke={INK} strokeWidth={1.25} />
            <rect x={y.x - 50} y={top} width={100} height={slice} fill={SIGNAL} />
            <Key x={y.x} y={274} anchor="middle" fill={INK} size={10}>
              {`YEAR ${i + 1}`}
            </Key>
          </g>
        );
      })}
      <line x1={120} y1={250} x2={680} y2={250} stroke={INK} strokeWidth={1.25} />
      <Tool kind="ad" x={192} y={160} k={1} tone={INK3} />
      <Display x={236} y={170} anchor="middle" fill={COUNTER} size={30}>
        ?
      </Display>
    </Frame>
  );
}

/* ==========================================================================
   CONCLUSION — small glyphs
   ========================================================================== */

export function GlyphMix() {
  const pts = [0, 1, 2, 3, 4].map((i) => {
    const a = ((-90 + i * 72) * Math.PI) / 180;
    return { x: r2(36 + 22 * Math.cos(a)), y: r2(29 + 22 * Math.sin(a)) };
  });
  return (
    <GlyphFrame>
      {pts.map((p, i) => (
        <g key={i}>
          <line x1={36} y1={29} x2={p.x} y2={p.y} stroke={SIGNAL} strokeWidth={1} />
          <circle cx={p.x} cy={p.y} r={4.5} fill={PAPER} stroke={INK} strokeWidth={1.25} />
        </g>
      ))}
      <Mark2 x={36} y={29} r={8} />
    </GlyphFrame>
  );
}

export function GlyphTogether() {
  return (
    <GlyphFrame>
      <path d="M4 10C24 10 26 28 44 28M4 28H44M4 46C24 46 26 28 44 28" fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <Mark2 x={56} y={28} r={11} />
    </GlyphFrame>
  );
}

export function GlyphAudience() {
  return (
    <GlyphFrame>
      <path d="M6 50H22V38H38V26H54V14H68V50Z" fill={PAPER2} stroke={INK} strokeWidth={1.25} strokeLinejoin="round" />
      <path d="M54 14H68V50H54Z" fill={SIGNAL} />
      <circle cx={14} cy={28} r={3.5} fill={PAPER} stroke={SIGNAL} strokeWidth={1.25} />
      <path d="M9 38V34Q9 31 14 31Q19 31 19 34V38Z" fill={PAPER} stroke={SIGNAL} strokeWidth={1.25} />
    </GlyphFrame>
  );
}

export function GlyphBudget() {
  return (
    <GlyphFrame>
      <Coins2 x={22} y={52} n={6} tone={SIGNAL} fill={SIGNAL_TINT} w={26} />
      <path d="M42 50V8M42 50H70" fill="none" stroke={INK} strokeWidth={1.25} />
      <path d="M44 44L54 34L60 38L68 18" fill="none" stroke={SIGNAL} strokeWidth={1.75} strokeLinejoin="round" />
    </GlyphFrame>
  );
}
