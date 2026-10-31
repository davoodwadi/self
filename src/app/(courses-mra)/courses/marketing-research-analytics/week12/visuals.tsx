/* ==========================================================================
   Week 12 plates: Text Analytics, AI-Driven Insights, and Reporting.
   Built on ../_visuals/kit and ../_visuals/objects. Every plate follows the
   sentence it illustrates on the slide.
   ========================================================================== */

import React, { useState } from "react";
import {
  Frame,
  Key,
  Note,
  Display,
  INK,
  INK2,
  INK3,
  RULE,
  RULE2,
  SIGNAL,
  COUNTER,
  PAPER,
  PAPER3,
  SIGNAL_TINT,
  head,
  r2,
  seeded,
  Slider,
  Segmented,
  Toggles,
} from "../_visuals/kit";
import { Person1, AiMark1 } from "../_visuals/objects";
import { Headset, Heart } from "@phosphor-icons/react";

/* --------------------------------------------------------------------------
   Shared helpers
   -------------------------------------------------------------------------- */

/**
 * Pointer handlers for a drag inside a plate: `onPoint` receives the pointer
 * in the plate's own viewBox units. Attach to the element students grab.
 */
function dragHandlers(onPoint: (x: number, y: number) => void) {
  const at = (e: React.PointerEvent<SVGElement>) => {
    const svg = (e.currentTarget as SVGElement).ownerSVGElement ?? (e.currentTarget as SVGSVGElement);
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
    onPoint(p.x, p.y);
  };
  return {
    onPointerDown: (e: React.PointerEvent<SVGElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      at(e);
    },
    onPointerMove: (e: React.PointerEvent<SVGElement>) => {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) at(e);
    },
  };
}

const pct = (v: number) => `${Math.round(v * 100)}%`;

/** Hairline bars standing for lines of text, the words themselves being beside the point. */
function TextLines({ x, y, widths, gap = 11, color = RULE2, w = 4 }: { x: number; y: number; widths: number[]; gap?: number; color?: string; w?: number }) {
  return (
    <g>
      {widths.map((len, i) => (
        <line key={i} x1={x} y1={r2(y + i * gap)} x2={r2(x + len)} y2={r2(y + i * gap)} stroke={color} strokeWidth={w} strokeLinecap="round" />
      ))}
    </g>
  );
}

/** A five-point star centred on (cx, cy), outer radius r. */
function starPath(cx: number, cy: number, r: number) {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 ? r * 0.45 : r;
    pts.push(`${i ? "L" : "M"}${r2(cx + rr * Math.cos(a))} ${r2(cy + rr * Math.sin(a))}`);
  }
  return pts.join("") + "Z";
}

/** A row of n rating stars, the first `filled` of them solid. */
function Stars({ x, y, filled, n = 5, r = 6.5, color = INK }: { x: number; y: number; filled: number; n?: number; r?: number; color?: string }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <path key={i} d={starPath(r2(x + i * r * 2.4), y, r)} fill={i < filled ? color : PAPER} stroke={color} strokeWidth={1.1} strokeLinejoin="round" />
      ))}
    </g>
  );
}

/** A round avatar holding a small Person1. */
function Avatar({ cx, cy, r = 11, stroke = INK }: { cx: number; cy: number; r?: number; stroke?: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={PAPER} stroke={stroke} strokeWidth={1.25} />
      <clipPath id={`av-${cx}-${cy}`}>
        <circle cx={cx} cy={cy} r={r - 0.6} />
      </clipPath>
      <g clipPath={`url(#av-${cx}-${cy})`}>
        <Person1 x={cx} y={r2(cy + r * 1.05)} k={r / 17} stroke={stroke} width={1.1} />
      </g>
    </g>
  );
}

/** A speech bubble with lines of text inside. The tail sits on the speaker's side. */
function Bubble({ x, y, w, h, side, lines, fill = PAPER, stroke = INK3 }: { x: number; y: number; w: number; h: number; side: "left" | "right"; lines: number[]; fill?: string; stroke?: string }) {
  // The tail leaves the bottom edge near the speaker's side and points down and out.
  const t0 = side === "left" ? x + 16 : x + w - 16;
  const t1 = side === "left" ? x + 4 : x + w - 4;
  const t2 = side === "left" ? x + 9 : x + w - 9;
  const bottom =
    side === "left"
      ? `H${t0}L${t1} ${y + h + 6}L${t2} ${y + h}H${x + 5}`
      : `H${t2}L${t1} ${y + h + 6}L${t0} ${y + h}H${x + 5}`;
  return (
    <g>
      <path
        d={`M${x + 5} ${y}H${x + w - 5}Q${x + w} ${y} ${x + w} ${y + 5}V${y + h - 5}Q${x + w} ${y + h} ${x + w - 5} ${y + h}${bottom}Q${x} ${y + h} ${x} ${y + h - 5}V${y + 5}Q${x} ${y} ${x + 5} ${y}Z`}
        fill={fill}
        stroke={stroke}
        strokeWidth={1.1}
        strokeLinejoin="round"
      />
      <TextLines x={x + 8} y={r2(y + h / 2 - ((lines.length - 1) * 8) / 2)} widths={lines} gap={8} w={3} />
    </g>
  );
}

/* --------------------------------------------------------------------------
   User-Generated Content
   -------------------------------------------------------------------------- */

/**
 * Two kinds of customer text: what consumers publish (a review, a post, a
 * forum thread) and what the firm's own channels collect (a chat log, a
 * service call transcript, an open-ended survey answer). Drawn as the
 * documents themselves. The words are hairlines.
 */
export function TextSources() {
  const card = (x: number, y: number, w = 300, h = 72) => (
    <rect x={x} y={y} width={w} height={h} rx={3} fill={PAPER} stroke={INK3} strokeWidth={1.1} />
  );
  const L = 20;
  const R = 360;
  return (
    <Frame
      width={680}
      height={318}
      label="Two columns of customer text. Published by consumers: an online review with four of five stars, a social media post with a like, and a forum thread with two replies. The firm's own channels: a chat log between a customer and an agent, a transcript of a customer service call, and an open-ended survey answer written in a large text box"
    >
      <Key x={L} y={24}>Published by consumers</Key>
      <Key x={R} y={24}>{"The firm’s own channels"}</Key>
      <line x1={340} y1={14} x2={340} y2={306} stroke={RULE} strokeWidth={1} />

      {/* review */}
      {card(L, 40)}
      <Avatar cx={L + 22} cy={62} />
      <Stars x={L + 46} y={62} filled={4} />
      <TextLines x={L + 46} y={82} widths={[226, 238, 150]} gap={9} w={3.5} />

      {/* social post */}
      {card(L, 124)}
      <Avatar cx={L + 22} cy={146} />
      <TextLines x={L + 46} y={140} widths={[90]} color={INK3} w={3.5} />
      <TextLines x={L + 46} y={158} widths={[232, 196]} gap={9} w={3.5} />
      <Heart x={L + 46} y={176} size={14} weight="fill" color={INK} />
      <TextLines x={L + 66} y={183.5} widths={[18]} color={INK3} w={3} />

      {/* forum thread */}
      {card(L, 208, 300, 92)}
      <Avatar cx={L + 22} cy={228} />
      <TextLines x={L + 46} y={224} widths={[214, 168]} gap={9} w={3.5} />
      <line x1={L + 22} y1={240} x2={L + 22} y2={284} stroke={RULE2} strokeWidth={1.25} />
      <line x1={L + 22} y1={262} x2={L + 40} y2={262} stroke={RULE2} strokeWidth={1.25} />
      <line x1={L + 22} y1={284} x2={L + 40} y2={284} stroke={RULE2} strokeWidth={1.25} />
      <Avatar cx={L + 52} cy={262} r={9} />
      <TextLines x={L + 70} y={262} widths={[190]} w={3.5} />
      <Avatar cx={L + 52} cy={284} r={9} />
      <TextLines x={L + 70} y={284} widths={[150]} w={3.5} />

      {/* chat log */}
      {card(R, 40, 300, 104)}
      <Bubble x={R + 12} y={50} w={150} h={22} side="left" lines={[120]} fill={PAPER3} stroke={PAPER3} />
      <Bubble x={R + 132} y={80} w={156} h={30} side="right" lines={[136, 92]} />
      <Bubble x={R + 12} y={116} w={124} h={18} side="left" lines={[96]} fill={PAPER3} stroke={PAPER3} />

      {/* service call transcript */}
      {card(R, 156, 300, 64)}
      <Headset x={R + 10} y={170} size={30} weight="regular" color={INK} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <TextLines x={R + 52} y={170 + i * 11} widths={[14]} color={INK3} w={3.5} />
          <TextLines x={R + 72} y={170 + i * 11} widths={[[200, 150, 214, 120][i]]} w={3.5} />
        </g>
      ))}

      {/* open-ended survey answer */}
      {card(R, 232, 300, 68)}
      <TextLines x={R + 14} y={248} widths={[200]} color={INK} w={3.5} />
      <rect x={R + 14} y={258} width={272} height={32} fill={PAPER} stroke={INK3} strokeWidth={1} />
      <path d={`M${R + 22} 270q8 -5 16 0t16 0t16 0t16 0t16 0t16 0t16 0t16 0t16 0t16 0t16 0t16 0t16 0M${R + 22} 281q8 -5 16 0t16 0t16 0t16 0t16 0t16 0t16 0`} fill="none" stroke={INK2} strokeWidth={1.1} />
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Social Listening
   -------------------------------------------------------------------------- */

/**
 * 26 weeks of category conversation (simulated): our brand's mentions,
 * split into negative and the rest, under two competitors'. From week 18 an
 * issue breaks and our negative mentions surge.
 */
const SOV_WEEKS = (() => {
  const rnd = seeded(1207);
  const spike = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 150, 290, 230, 160, 110, 80, 60, 45];
  return spike.map((extra) => {
    const b = Math.round(300 + (rnd() - 0.5) * 50);
    const c = Math.round(200 + (rnd() - 0.5) * 36);
    const rest = Math.round(205 + (rnd() - 0.5) * 40 + extra * 0.25);
    const neg = Math.round(22 + (rnd() - 0.5) * 12 + extra);
    return { b, c, rest, neg };
  });
})();

/**
 * Social listening as an instrument: drag the window along the weeks and
 * read our brand's share of voice and the negative share of its mentions
 * for those weeks. Over the quiet weeks the share sits near a third. Over
 * the surge it climbs, but most of the added conversation is negative.
 */
export function ShareOfVoice() {
  const [start, setStart] = useState(3);
  const span = 6;
  const x0 = 64;
  const bw = 20;
  const base = 232;
  const top = 46;
  const Y = (v: number) => r2(base - (v / 1200) * (base - top));
  const win = SOV_WEEKS.slice(start, start + span);
  const sum = (k: "b" | "c" | "rest" | "neg") => win.reduce((a, w) => a + w[k], 0);
  const ours = sum("rest") + sum("neg");
  const all = ours + sum("b") + sum("c");
  const sov = ours / all;
  const neg = sum("neg") / ours;
  const drag = dragHandlers((x) => setStart(Math.max(0, Math.min(26 - span, Math.round((x - x0) / bw - span / 2)))));
  const wx = x0 + start * bw;
  // The readout: one bar of the window's conversation, split by brand.
  const rb0 = 64;
  const rb1 = 420;
  const RX = (f: number) => r2(rb0 + f * (rb1 - rb0));
  const shares = [ours / all, sum("b") / all, sum("c") / all];
  return (
    <div>
      <Frame
        width={680}
        height={372}
        label={`Weekly mentions in a category over 26 weeks: our brand, with its negative mentions in ochre, under brands B and C. Our negative mentions surge from week 18. A window covers weeks ${start + 1} to ${start + span}: our share of voice there is ${pct(sov)}, and ${pct(neg)} of our mentions are negative`}
      >
        <Key x={20} y={22} size={10}>Weekly mentions in the category</Key>
        {[0, 500, 1000].map((v) => (
          <g key={v}>
            <line x1={x0 - 6} y1={Y(v)} x2={x0 + 26 * bw} y2={Y(v)} stroke={v ? RULE : INK} strokeWidth={v ? 1 : 1.25} />
            <Key x={x0 - 10} y={r2(Y(v) + 3.5)} anchor="end" size={9.5}>{v.toLocaleString("en-US")}</Key>
          </g>
        ))}
        <rect x={wx} y={top - 8} width={span * bw} height={base - top + 8} fill={SIGNAL_TINT} />
        {SOV_WEEKS.map((w, i) => {
          const x = x0 + i * bw + 3;
          const yNeg = Y(w.neg);
          const yOurs = Y(w.neg + w.rest);
          const yC = Y(w.neg + w.rest + w.c);
          const yB = Y(w.neg + w.rest + w.c + w.b);
          return (
            <g key={i}>
              <rect x={x} y={yNeg} width={bw - 6} height={r2(base - yNeg)} fill={COUNTER} />
              <rect x={x} y={yOurs} width={bw - 6} height={r2(yNeg - yOurs)} fill={INK2} />
              <rect x={x} y={yC} width={bw - 6} height={r2(yOurs - yC)} fill={RULE2} />
              <rect x={x} y={yB} width={bw - 6} height={r2(yC - yB)} fill={PAPER3} />
            </g>
          );
        })}
        {(() => {
          const last = SOV_WEEKS[25];
          const lx = x0 + 26 * bw + 6;
          const mid = (a: number, b: number) => r2((Y(a) + Y(b)) / 2 + 3.5);
          return (
            <g>
              <Key x={lx} y={mid(last.neg + last.rest + last.c, last.neg + last.rest + last.c + last.b)} size={9.5}>Brand B</Key>
              <Key x={lx} y={mid(last.neg + last.rest, last.neg + last.rest + last.c)} size={9.5}>Brand C</Key>
              <Key x={lx} y={mid(last.neg, last.neg + last.rest)} size={9.5} fill={INK}>Our brand</Key>
              <Key x={lx} y={mid(0, last.neg)} size={9.5} fill={COUNTER}>Negative</Key>
            </g>
          );
        })()}
        {[1, 5, 10, 15, 20, 26].map((wk) => (
          <Key key={wk} x={r2(x0 + (wk - 0.5) * bw)} y={base + 16} anchor="middle" size={9.5}>{wk}</Key>
        ))}
        <Key x={x0} y={base + 32} size={9.5}>Week</Key>
        <rect
          x={x0}
          y={top - 8}
          width={26 * bw}
          height={base - top + 8}
          fill="transparent"
          style={{ cursor: "ew-resize", touchAction: "none" }}
          {...drag}
        />
        <g pointerEvents="none">
          <rect x={wx} y={top - 8} width={span * bw} height={base - top + 8} fill="none" stroke={SIGNAL} strokeWidth={1.75} />
          <rect x={r2(wx + (span * bw) / 2 - 14)} y={top - 14} width={28} height={10} rx={2} fill={SIGNAL} />
          {[-4, 0, 4].map((d) => (
            <line key={d} x1={r2(wx + (span * bw) / 2 + d)} y1={top - 12} x2={r2(wx + (span * bw) / 2 + d)} y2={top - 6} stroke={PAPER} strokeWidth={1} />
          ))}
        </g>

        <line x1={20} y1={272} x2={660} y2={272} stroke={RULE} strokeWidth={1} />
        <Key x={rb0} y={294} size={10}>{`Share of voice, weeks ${start + 1}n/a${start + span}`}</Key>
        {shares.map((f, i) => {
          const a = shares.slice(0, i).reduce((p, q) => p + q, 0);
          return (
            <g key={i}>
              <rect x={RX(a)} y={304} width={r2(RX(a + f) - RX(a))} height={22} fill={[SIGNAL, PAPER3, RULE2][i]} stroke={PAPER} strokeWidth={1} />
              {i > 0 ? (
                <Key x={r2((RX(a) + RX(a + f)) / 2)} y={319} anchor="middle" size={9.5} fill={INK2}>{["", "B", "C"][i]}</Key>
              ) : null}
            </g>
          );
        })}
        <Display x={rb0} y={358} size={26} fill={SIGNAL}>{pct(sov)}</Display>
        <Note x={rb0 + 58} y={354} size={12.5} fill={INK2}>of mentions are of our brand</Note>
        <Key x={470} y={294} size={10}>Of our mentions</Key>
        <Display x={470} y={330} size={26} fill={COUNTER}>{pct(neg)}</Display>
        <Note x={528} y={326} size={12.5} fill={INK2}>negative</Note>
      </Frame>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Limitations of User-Generated Content
   -------------------------------------------------------------------------- */

/** How 1,000 customers rate their stay (simulated): mostly moderate to good. */
const EXPERIENCE = [0.04, 0.08, 0.22, 0.41, 0.25];
/** Share of customers with a moderate experience who post a review. */
const BASE_POST = 0.03;

/** One small bar chart of ratings 1 to 5, with its percentages and stars. */
function RatingBars({ x, shares, fill, stroke, keyText, mean, keyFill = INK3 }: { x: number; shares: number[]; fill: string; stroke: string; keyText: string; mean: number; keyFill?: string }) {
  const base = 236;
  const H = (v: number) => r2((v / 0.7) * 160);
  return (
    <g>
      <Key x={x} y={40} size={10} fill={keyFill}>{keyText}</Key>
      <line x1={x} y1={base} x2={x + 256} y2={base} stroke={INK} strokeWidth={1.25} />
      {shares.map((v, i) => {
        const bx = x + 8 + i * 50;
        return (
          <g key={i}>
            <rect x={bx} y={r2(base - H(v))} width={36} height={H(v)} fill={fill} stroke={stroke} strokeWidth={1.25} />
            <Key x={bx + 18} y={r2(base - H(v) - 7)} anchor="middle" size={10.5} weight={700} fill={stroke === INK3 ? INK2 : stroke}>{pct(v)}</Key>
            <Key x={bx + 13} y={base + 20} anchor="middle" size={11} fill={INK}>{i + 1}</Key>
            <path d={starPath(bx + 25, base + 16, 5)} fill={INK} />
          </g>
        );
      })}
      <Key x={x} y={base + 50} size={10}>Mean rating</Key>
      <Display x={x + 98} y={base + 54} size={24} fill={keyFill === INK3 ? INK : keyFill}>{mean.toFixed(2)}</Display>
    </g>
  );
}

/**
 * Who posts: every customer's rating of a stay beside the ratings that get
 * posted. Slide how much more often guests with 1- or 5-star experiences
 * post than guests with moderate ones. At 1× the posted reviews mirror the
 * customers. As the multiplier grows the posted ratings pile up at the ends.
 */
export function WhoPosts() {
  const [k, setK] = useState(5);
  const weights = EXPERIENCE.map((v, i) => v * BASE_POST * (i === 0 || i === 4 ? k : 1));
  const posted = weights.reduce((a, b) => a + b, 0);
  const shares = weights.map((w) => w / posted);
  const mean = (xs: number[]) => xs.reduce((a, v, i) => a + v * (i + 1), 0);
  const ends = shares[0] + shares[4];
  return (
    <div>
      <Frame
        width={680}
        height={322}
        label={`Ratings of 1 to 5 stars. All customers: 4%, 8%, 22%, 41% and 25%, a mean of 3.75. Posted reviews, when extreme experiences are ${k} times as likely to be posted: ${shares.map(pct).join(", ")}, a mean of ${mean(shares).toFixed(2)}. ${pct(ends)} of posted reviews are 1 or 5 stars, against 29% of customers`}
      >
        <RatingBars x={36} shares={EXPERIENCE} fill={PAPER3} stroke={INK3} keyText="All 1,000 customers" mean={mean(EXPERIENCE)} />
        <RatingBars x={388} shares={shares} fill={SIGNAL_TINT} stroke={SIGNAL} keyText={`The ${Math.round(posted * 1000)} who post a review`} mean={mean(shares)} keyFill={SIGNAL} />
        <path d={`M318 140H359${head.right(360, 140)}`} fill="none" stroke={INK3} strokeWidth={1.5} />
      </Frame>
      <Slider label="Times as likely to post, 1 or 5 stars" value={k} min={1} max={10} onChange={setK} />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Sentiment Analysis
   -------------------------------------------------------------------------- */

type Polarity = "Positive" | "Negative" | "Neutral";
type ReviewId = "phone" | "hotel" | "flight" | "film" | "car";

/**
 * Five short reviews scored by a word list. Each word is a piece of the
 * review. `score` marks the words the lexicon knows. `reading` is the
 * polarity a person assigns. `aspects` splits it by attribute.
 */
const REVIEWS: Record<
  ReviewId,
  {
    domain: string;
    words: { w: string; score?: number }[];
    reading: Polarity;
    aspects?: { name: string; polarity: Polarity }[];
    missed?: string;
  }
> = {
  phone: {
    domain: "A phone",
    words: [{ w: "The battery is " }, { w: "great", score: 1 }, { w: " but the camera is " }, { w: "awful", score: -1 }, { w: "." }],
    reading: "Neutral",
    aspects: [
      { name: "Battery", polarity: "Positive" },
      { name: "Camera", polarity: "Negative" },
    ],
  },
  hotel: {
    domain: "A hotel",
    words: [{ w: "The room was not " }, { w: "clean", score: 1 }, { w: " and not " }, { w: "quiet", score: 1 }, { w: "." }],
    reading: "Negative",
    missed: "Negation",
  },
  flight: {
    domain: "An airline",
    words: [{ w: "Great", score: 1 }, { w: ", another delayed flight. Just " }, { w: "perfect", score: 1 }, { w: "." }],
    reading: "Negative",
    missed: "Sarcasm",
  },
  film: {
    domain: "A film",
    words: [{ w: "The plot is " }, { w: "unpredictable", score: -1 }, { w: " to the very end." }],
    reading: "Positive",
    missed: "Domain-specific meaning",
  },
  car: {
    domain: "A car",
    words: [{ w: "The steering is " }, { w: "unpredictable", score: -1 }, { w: " on wet roads." }],
    reading: "Negative",
  },
};

const polarityOf = (score: number): Polarity => (score > 0 ? "Positive" : score < 0 ? "Negative" : "Neutral");

/**
 * A lexicon against a reader: choose a review. The words the lexicon knows
 * are underlined and tallied on the left, a person's reading sits on the
 * right. The phone review splits by aspect. The hotel, airline and film
 * reviews show negation, sarcasm and domain-specific meaning fooling the
 * word count. The car review, with the same word as the film, is scored
 * correctly.
 */
export function LexiconReader() {
  const [id, setId] = useState<ReviewId>("phone");
  const r = REVIEWS[id];
  const known = r.words.filter((w) => w.score !== undefined);
  const total = known.reduce((a, w) => a + (w.score ?? 0), 0);
  const lex = polarityOf(total);
  const wrong = lex !== r.reading || !!r.aspects;
  const sign = (v: number) => (v > 0 ? `+${v}` : v < 0 ? `\u2212${-v}` : "0");
  const L = 36;
  const R = 376;
  return (
    <div>
      <Frame
        width={680}
        height={300}
        label={`A review of ${r.domain.toLowerCase()}: "${r.words.map((w) => w.w).join("")}" The lexicon finds ${known.map((w) => `${w.w} (${sign(w.score ?? 0)})`).join(" and ")}, a score of ${sign(total)}, ${lex.toLowerCase()}. A person reads it as ${r.aspects ? r.aspects.map((a) => `${a.polarity.toLowerCase()} about the ${a.name.toLowerCase()}`).join(" and ") : r.reading.toLowerCase()}${r.missed ? `. The lexicon misses the ${r.missed.toLowerCase()}` : ""}`}
      >
        <Key x={L} y={30} size={10}>{`A review of ${r.domain}`}</Key>
        <text x={L} y={74} fontFamily="var(--font-body)" fontSize={25} fill={INK}>
          {"\u201C"}
          {r.words.map((w, i) =>
            w.score === undefined ? (
              <tspan key={i}>{w.w}</tspan>
            ) : (
              <tspan key={i} fontWeight={600} textDecoration="underline" fill={w.score > 0 ? INK : COUNTER}>
                {w.w}
              </tspan>
            ),
          )}
          {"\u201D"}
        </text>
        <line x1={20} y1={104} x2={660} y2={104} stroke={RULE} strokeWidth={1} />

        <Key x={L} y={134} size={10}>Lexicon-based score</Key>
        {known.map((w, i) => (
          <g key={i}>
            <Note x={L} y={168 + i * 28} size={16} weight={600} fill={(w.score ?? 0) > 0 ? INK : COUNTER}>{w.w.toLowerCase()}</Note>
            <Key x={L + 250} y={168 + i * 28} anchor="end" size={13} weight={700} fill={(w.score ?? 0) > 0 ? INK : COUNTER}>{sign(w.score ?? 0)}</Key>
          </g>
        ))}
        <line x1={L} y1={232} x2={L + 252} y2={232} stroke={INK} strokeWidth={1.25} />
        <Key x={L} y={256} size={13} weight={700} fill={INK}>{lex}</Key>
        <Key x={L + 250} y={256} anchor="end" size={13} weight={700} fill={INK}>{sign(total)}</Key>
        {r.missed ? (
          <Key x={L} y={284} size={10} fill={COUNTER}>{`Misses the ${r.missed}`}</Key>
        ) : null}

        <line x1={340} y1={120} x2={340} y2={288} stroke={RULE} strokeWidth={1} />
        <Person1 x={R + 10} y={146} k={0.8} />
        <Key x={R + 30} y={134} size={10}>{r.aspects ? "A person’s reading, by aspect" : "A person’s reading"}</Key>
        {r.aspects ? (
          r.aspects.map((a, i) => (
            <g key={a.name}>
              <Key x={R} y={190 + i * 34} size={11} fill={INK3}>{a.name}</Key>
              <Key x={R + 110} y={190 + i * 34} size={14} weight={700} fill={SIGNAL}>{a.polarity}</Key>
            </g>
          ))
        ) : (
          <Key x={R} y={200} size={16} weight={700} fill={SIGNAL}>{r.reading}</Key>
        )}
        {!wrong ? <Key x={R} y={284} size={10} fill={INK3}>The lexicon agrees</Key> : null}
      </Frame>
      <Segmented<ReviewId>
        label="Review"
        options={[
          { id: "phone", label: "Phone" },
          { id: "hotel", label: "Hotel" },
          { id: "flight", label: "Airline" },
          { id: "film", label: "Film" },
          { id: "car", label: "Car" },
        ]}
        value={id}
        onChange={setId}
      />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Topic Modeling
   -------------------------------------------------------------------------- */

type Theme = "rise" | "budget" | "series" | "library" | "quality" | "billing";

/** Six fine themes in cancellation comments, each a distribution over words (simulated). */
const THEME_WORDS: Record<Theme, [string, number][]> = {
  rise: [["price", 0.09], ["increase", 0.07], ["raised", 0.05], ["expensive", 0.05]],
  budget: [["afford", 0.07], ["budget", 0.05], ["money", 0.05], ["cheaper", 0.04]],
  series: [["series", 0.07], ["season", 0.06], ["ended", 0.05], ["finished", 0.04]],
  library: [["movies", 0.07], ["nothing", 0.06], ["library", 0.06], ["watch", 0.05]],
  quality: [["buffering", 0.08], ["app", 0.07], ["crashes", 0.06], ["slow", 0.05]],
  billing: [["charged", 0.08], ["refund", 0.07], ["twice", 0.05], ["card", 0.05]],
};

/** How the model groups the fine themes at each number of topics. */
const GROUPINGS: Record<number, Theme[][]> = {
  2: [["rise", "budget", "series", "library"], ["quality", "billing"]],
  3: [["rise", "budget"], ["series", "library"], ["quality", "billing"]],
  4: [["rise", "budget"], ["series", "library"], ["quality"], ["billing"]],
  5: [["rise", "budget"], ["series"], ["library"], ["quality"], ["billing"]],
  6: [["rise"], ["budget"], ["series"], ["library"], ["quality"], ["billing"]],
};

/** The label an analyst would give each grouping after reading its words and texts. */
function topicLabel(g: Theme[]) {
  const k = g.join("+");
  return (
    {
      "rise+budget": "Price",
      "series+library": "Content",
      quality: "Quality",
      billing: "Billing",
      series: "Series",
      library: "Library",
      rise: "Price rise",
      budget: "Budget",
    } as Record<string, string>
  )[k];
}

/** Three comments, each a mixture of fine themes. */
const COMMENTS: { text: string; mix: [Theme, number][] }[] = [
  { text: "The price went up again and there is nothing new to watch.", mix: [["rise", 0.55], ["library", 0.45]] },
  { text: "The app keeps crashing, and I was charged twice for May.", mix: [["quality", 0.5], ["billing", 0.5]] },
  { text: "My series ended and I cannot justify the money any more.", mix: [["series", 0.6], ["budget", 0.4]] },
];

/** One grey per topic, darkest first. The number on each mark names it. */
const TOPIC_FILL = [INK, INK2, INK3, RULE2, PAPER3, PAPER];
const TOPIC_TEXT = [PAPER, PAPER, PAPER, INK, INK, INK];

/**
 * The analyst chooses the number of topics: each topic is a column of its
 * most probable words, in order, labelled as an analyst would.
 * Each comment below is a bar split into the topics it mixes. At 2 and 3
 * the model merges unrelated themes (marked MIXED). At 4 each topic reads
 * as one reason. At 5 and 6 topics split into finer reasons.
 */
export function TopicCount() {
  const [k, setK] = useState(4);
  const groups = GROUPINGS[k];
  const colW = 640 / k;
  const topics = groups.map((g) => {
    const words = g.flatMap((t) => THEME_WORDS[t].map(([w, p]) => [w, p / g.length] as [string, number]));
    words.sort((a, b) => b[1] - a[1]);
    return { label: topicLabel(g), words: words.slice(0, 5) };
  });
  const topicOf = (t: Theme) => groups.findIndex((g) => g.includes(t));
  return (
    <div>
      <Frame
        width={680}
        height={374}
        label={`Topics found in 8,400 cancellation comments with ${k} topics: ${topics.map((t, i) => `topic ${i + 1}, ${t.label ?? "mixed"} (${t.words.map((w) => w[0]).join(", ")})`).join(". ")}. Three comments are shown as mixtures of these topics`}
      >
        <Key x={20} y={22} size={10}>{`${k} topics in 8,400 cancellation comments`}</Key>
        {topics.map((t, i) => {
          const x = 20 + i * colW;
          return (
            <g key={i}>
              {i > 0 ? <line x1={x - 6} y1={42} x2={x - 6} y2={196} stroke={RULE} strokeWidth={1} /> : null}
              <rect x={x} y={42} width={18} height={18} fill={TOPIC_FILL[i]} stroke={INK3} strokeWidth={i === 5 ? 1 : 0} />
              <Key x={x + 9} y={55} anchor="middle" size={10} weight={700} fill={TOPIC_TEXT[i]}>{i + 1}</Key>
              <Key x={x + 24} y={56} size={10} weight={700} fill={t.label ? INK : COUNTER}>{t.label ?? "Mixed"}</Key>
              {t.words.map(([w], j) => (
                <Note key={w} x={x} y={90 + j * 23} size={14} fill={INK}>{w}</Note>
              ))}
            </g>
          );
        })}
        <line x1={20} y1={212} x2={660} y2={212} stroke={RULE} strokeWidth={1} />
        <Key x={20} y={234} size={10}>Each comment as a mixture of topics</Key>
        {COMMENTS.map((c, i) => {
          const y = 262 + i * 40;
          const shares = new Map<number, number>();
          c.mix.forEach(([t, v]) => shares.set(topicOf(t), (shares.get(topicOf(t)) ?? 0) + v));
          const segs = [...shares.entries()].sort((a, b) => a[0] - b[0]);
          const starts = segs.map((_, j) => segs.slice(0, j).reduce((a, s2) => a + s2[1], 0));
          return (
            <g key={i}>
              <Note x={20} y={y} size={12.5} italic fill={INK2}>{`\u201C${c.text}\u201D`}</Note>
              {segs.map(([ti, v], j) => (
                <g key={ti}>
                  <rect x={r2(20 + starts[j] * 640)} y={y + 7} width={r2(v * 640 - 2)} height={14} fill={TOPIC_FILL[ti]} stroke={INK3} strokeWidth={ti === 5 ? 1 : 0} />
                  <Key x={r2(20 + (starts[j] + v / 2) * 640)} y={y + 18} anchor="middle" size={9.5} weight={700} fill={TOPIC_TEXT[ti]}>
                    {`${ti + 1} | ${pct(v)}`}
                  </Key>
                </g>
              ))}
            </g>
          );
        })}
      </Frame>
      <Slider label="Number of topics" value={k} min={2} max={6} onChange={setK} />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Text Classification With Large Language Models
   -------------------------------------------------------------------------- */

type Wording = "a" | "b" | "c";

const WORDINGS: Record<Wording, string> = {
  a: "Classify the complaint as delivery, billing, product fault, or account.",
  b: "What is the customer unhappy about? Choose delivery, billing, product fault, or account.",
  c: "As in B, followed by three complaints already coded by the team.",
};

const COMPLAINT_TYPES = ["Delivery", "Billing", "Product\nfault", "Account"];

/** Twelve messages and the category each version of the instructions assigns (simulated). */
const MESSAGES: { text: string; a: number; b: number; c: number }[] = [
  { text: "My parcel arrived four days late.", a: 0, b: 0, c: 0 },
  { text: "I was charged twice for one order.", a: 1, b: 1, c: 1 },
  { text: "The kettle stopped working after a week.", a: 2, b: 2, c: 2 },
  { text: "I cannot reset my password.", a: 3, b: 3, c: 3 },
  { text: "Charged for an order that never arrived.", a: 1, b: 0, c: 1 },
  { text: "I cannot log in to track my parcel.", a: 3, b: 3, c: 3 },
  { text: "Still no refund for the broken blender.", a: 1, b: 2, c: 1 },
  { text: "Wrong size sent, and now a return fee.", a: 0, b: 0, c: 0 },
  { text: "The box was crushed and the lamp cracked.", a: 2, b: 0, c: 0 },
  { text: "My account shows an order I did not place.", a: 3, b: 3, c: 3 },
  { text: "Left in the rain. The speaker is ruined.", a: 0, b: 2, c: 2 },
  { text: "The app bills me in the wrong currency.", a: 1, b: 1, c: 1 },
];

/**
 * One model, three versions of the instructions: zero-shot wording A,
 * zero-shot wording B, and B with three coded examples (few-shot). Each
 * row is a message and its dot the category assigned. Rows that land
 * somewhere other than under wording A are marked, with a ring where A put
 * them. The clear messages never move. The ambiguous ones do.
 */
export function WordingFlips() {
  const [v, setV] = useState<Wording>("b");
  const cols = [404, 480, 556, 632];
  const top = 132;
  const rh = 21;
  const changed = MESSAGES.filter((m) => m[v] !== m.a).length;
  return (
    <div>
      <Frame
        width={680}
        height={420}
        label={`A language model classifies twelve customer messages into delivery, billing, product fault or account. Instructions: ${WORDINGS[v]} ${v === "a" ? "This is the reference wording." : `${changed} of 12 messages receive a different category than under wording A.`}`}
      >
        <Key x={20} y={22} size={10}>{v === "c" ? "Instructions, few-shot" : `Instructions ${v.toUpperCase()}, zero-shot`}</Key>
        <rect x={20} y={34} width={640} height={40} fill={PAPER} stroke={INK3} strokeWidth={1} />
        <AiMark1 cx={42} cy={54} s={22} fill={SIGNAL} />
        <Note x={64} y={59} size={13.5} italic fill={INK}>{WORDINGS[v]}</Note>
        {COMPLAINT_TYPES.map((t, i) => (
          <g key={t}>
            {t.split("\n").map((line, j, all) => (
              <Key key={line} x={cols[i]} y={r2(116 - (all.length - 1 - j) * 13)} anchor="middle" size={9.5}>{line}</Key>
            ))}
          </g>
        ))}
        {MESSAGES.map((m, i) => {
          const y = top + i * rh;
          const moved = m[v] !== m.a;
          return (
            <g key={i}>
              {moved ? <rect x={14} y={r2(y - 9)} width={652} height={rh - 2} fill={SIGNAL_TINT} /> : null}
              <Note x={20} y={r2(y + 4.5)} size={12.5} fill={moved ? INK : INK2}>{m.text}</Note>
              {cols.map((cx) => (
                <circle key={cx} cx={cx} cy={y} r={1.5} fill={RULE2} />
              ))}
              {moved ? <circle cx={cols[m.a]} cy={y} r={5} fill="none" stroke={INK3} strokeWidth={1.25} strokeDasharray="2 2" /> : null}
              <circle cx={cols[m[v]]} cy={y} r={5.5} fill={moved ? SIGNAL : INK} />
            </g>
          );
        })}
        <line x1={20} y1={r2(top + 12 * rh - 4)} x2={660} y2={r2(top + 12 * rh - 4)} stroke={RULE} strokeWidth={1} />
        {v === "a" ? (
          <Note x={20} y={r2(top + 12 * rh + 22)} size={13} fill={INK2}>The reference wording: compare the others with it.</Note>
        ) : (
          <g>
            <Display x={20} y={r2(top + 12 * rh + 26)} size={24} fill={SIGNAL}>{`${changed} of 12`}</Display>
            <Note x={106} y={r2(top + 12 * rh + 22)} size={13} fill={INK2}>messages change category from wording A</Note>
          </g>
        )}
      </Frame>
      <Segmented<Wording>
        label="Instructions"
        options={[
          { id: "a", label: "Wording A" },
          { id: "b", label: "Wording B" },
          { id: "c", label: "B + examples" },
        ]}
        value={v}
        onChange={setV}
      />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Validating Text Analytics
   -------------------------------------------------------------------------- */

type Lang = "all" | "en" | "es" | "fr";

/** Precision and recall of the model against human coding, by language (simulated). */
const VALIDATION: Record<Lang, { n: number; rows: [number, number][] }> = {
  all: { n: 600, rows: [[0.91, 0.89], [0.88, 0.84], [0.86, 0.9], [0.93, 0.87]] },
  en: { n: 420, rows: [[0.93, 0.92], [0.91, 0.93], [0.88, 0.92], [0.94, 0.9]] },
  es: { n: 120, rows: [[0.87, 0.83], [0.83, 0.52], [0.82, 0.86], [0.91, 0.8]] },
  fr: { n: 60, rows: [[0.88, 0.85], [0.86, 0.81], [0.84, 0.88], [0.92, 0.83]] },
};

/**
 * Validation, split: the model's precision and recall for each category
 * on a random sample coded by two people. Across all 600 texts every
 * figure looks acceptable. Split by language, the Spanish texts show the
 * model missing half of the billing complaints.
 */
export function ValidationByLanguage() {
  const [lang, setLang] = useState<Lang>("all");
  const d = VALIDATION[lang];
  const x0 = 170;
  const x1 = 600;
  const X = (v: number) => r2(x0 + v * (x1 - x0));
  const cats = ["Delivery", "Billing", "Product fault", "Account"];
  const low = (v: number) => v < 0.7;
  return (
    <div>
      <Frame
        width={680}
        height={356}
        label={`Precision and recall of an automated classification against human coding of ${d.n} ${lang === "all" ? "sampled texts in all languages" : `${{ en: "English", es: "Spanish", fr: "French" }[lang]} texts`}: ${cats.map((c, i) => `${c.toLowerCase()} ${pct(d.rows[i][0])} and ${pct(d.rows[i][1])}`).join(". ")}`}
      >
        <Key x={20} y={22} size={10}>{`${d.n} sampled texts${lang === "all" ? "" : `, ${{ en: "English", es: "Spanish", fr: "French" }[lang]}`}`}</Key>
        <Person1 x={34} y={66} k={0.75} />
        <Person1 x={54} y={66} k={0.75} />
        <Note x={72} y={56} size={12.5} fill={INK2}>Two people agree on 92% of texts.</Note>
        <AiMark1 cx={372} cy={52} s={20} fill={SIGNAL} />
        <Note x={388} y={56} size={12.5} fill={INK2}>The model is compared with them.</Note>
        <line x1={20} y1={82} x2={660} y2={82} stroke={RULE} strokeWidth={1} />
        <line x1={x0} y1={324} x2={x1} y2={324} stroke={INK} strokeWidth={1.25} />
        {[0, 0.5, 1].map((v) => (
          <g key={v}>
            <line x1={X(v)} y1={v ? 318 : 96} x2={X(v)} y2={324} stroke={INK} strokeWidth={1.25} />
            <Key x={X(v)} y={340} anchor="middle" size={9.5}>{pct(v)}</Key>
          </g>
        ))}
        {d.rows.map(([p, rc], i) => {
          const y = 108 + i * 54;
          return (
            <g key={i}>
              <Key x={20} y={y + 17} size={10.5} fill={INK}>{cats[i]}</Key>
              {[p, rc].map((v, j) => (
                <g key={j}>
                  <rect x={x0} y={y + j * 17} width={r2(X(v) - x0)} height={13} fill={low(v) ? SIGNAL : j ? INK3 : INK2} />
                  <Key x={r2(X(v) + 6)} y={y + j * 17 + 10.5} size={10.5} weight={700} fill={low(v) ? SIGNAL : INK2}>{pct(v)}</Key>
                  {i === 0 ? (
                    <Key x={x0 + 8} y={y + j * 17 + 10} size={9} fill={PAPER}>{j ? "Recall" : "Precision"}</Key>
                  ) : null}
                </g>
              ))}
            </g>
          );
        })}
      </Frame>
      <Segmented<Lang>
        label="Texts"
        options={[
          { id: "all", label: "All" },
          { id: "en", label: "English" },
          { id: "es", label: "Spanish" },
          { id: "fr", label: "French" },
        ]}
        value={lang}
        onChange={setLang}
      />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Privacy in Text and Social Data
   -------------------------------------------------------------------------- */

type Quasi = "postal" | "age" | "job";

/** Residents of a city of 40,000 adults who share each combination (simulated). */
function matching(on: Quasi[]) {
  const k = [...on].sort().join("+");
  return (
    {
      "": 40000,
      postal: 1850,
      age: 610,
      job: 260,
      "age+postal": 29,
      "job+postal": 12,
      "age+job": 4,
      "age+job+postal": 1,
    } as Record<string, number>
  )[k];
}

/**
 * Re-identification: a respondent's record with the name removed, and the
 * residents of the city who share whichever characteristics stay in it.
 * Each characteristic alone matches hundreds of people. Together they
 * match one. The people drawn are the matches, up to 30.
 */
export function ReIdentification() {
  const [on, setOn] = useState<Quasi[]>(["postal"]);
  const n = matching(on);
  const fields: { id: Quasi | "name"; key: string; value: string }[] = [
    { id: "name", key: "Name", value: "" },
    { id: "postal", key: "Postal code", value: "H2X 1Y4" },
    { id: "age", key: "Age", value: "34" },
    { id: "job", key: "Occupation", value: "Pharmacist" },
  ];
  const lx0 = 344;
  const lx1 = 652;
  const LX = (v: number) => r2(lx0 + (Math.log10(v) / Math.log10(40000)) * (lx1 - lx0));
  const shown = Math.min(n, 30);
  return (
    <div>
      <Frame
        width={680}
        height={318}
        label={`A respondent's record with the name removed, keeping ${on.length ? on.map((q) => ({ postal: "postal code", age: "age", job: "occupation" })[q]).join(", ") : "no characteristics"}. In a city of 40,000 adults, ${n.toLocaleString("en-US")} ${n === 1 ? "resident matches: the respondent is identified" : "residents match"}`}
      >
        <Key x={20} y={22} size={10}>{"One respondent’s record"}</Key>
        <rect x={20} y={36} width={264} height={236} fill={PAPER} stroke={INK3} strokeWidth={1.1} />
        {fields.map((f, i) => {
          const y = 76 + i * 56;
          const kept = f.id !== "name" && on.includes(f.id);
          return (
            <g key={f.id}>
              {i > 0 ? <line x1={32} y1={y - 30} x2={272} y2={y - 30} stroke={RULE} strokeWidth={1} /> : null}
              <Key x={34} y={y} size={9.5}>{f.key}</Key>
              {f.id === "name" ? (
<Key x={144} y={y} size={10} fill={INK3}>Removed</Key>
              ) : kept ? (
                <Note x={144} y={y + 1} size={15} weight={600} fill={INK}>{f.value}</Note>
              ) : (
                <rect x={144} y={y - 11} width={92} height={14} fill={PAPER3} />
              )}
            </g>
          );
        })}

        <Key x={344} y={22} size={10}>Residents who match, city of 40,000</Key>
        <Display x={344} y={76} size={40} fill={n === 1 ? SIGNAL : INK}>{n.toLocaleString("en-US")}</Display>
        {n === 1 ? (
          <Note x={r2(344 + 30)} y={70} size={14} weight={600} fill={SIGNAL}>the respondent, identified</Note>
        ) : null}
        <line x1={lx0} y1={104} x2={lx1} y2={104} stroke={INK} strokeWidth={1.25} />
        {[1, 10, 100, 1000, 10000].map((v) => (
          <g key={v}>
            <line x1={LX(v)} y1={100} x2={LX(v)} y2={108} stroke={INK} strokeWidth={1.25} />
            <Key x={LX(v)} y={122} anchor="middle" size={9}>{v.toLocaleString("en-US")}</Key>
          </g>
        ))}
        <circle cx={LX(n)} cy={104} r={6} fill={n === 1 ? SIGNAL : INK} stroke={PAPER} strokeWidth={1.5} />
        {Array.from({ length: shown }, (_, i) => {
          const col = i % 10;
          const row = Math.floor(i / 10);
          return (
            <Person1
              key={i}
              x={r2(358 + col * 30)}
              y={r2(184 + row * 46)}
              k={0.82}
              stroke={n === 1 ? SIGNAL : INK3}
              fill={n === 1 ? SIGNAL : PAPER}
              width={1.25}
            />
          );
        })}
        {n > 30 ? (
          <Note x={344} y={306} size={12.5} fill={INK3}>{`and ${(n - 30).toLocaleString("en-US")} more`}</Note>
        ) : null}
      </Frame>
      <Toggles<Quasi>
        label="Keep in the record"
        options={[
          { id: "postal", label: "Postal code" },
          { id: "age", label: "Age" },
          { id: "job", label: "Occupation" },
        ]}
        value={on}
        onChange={setOn}
        allowNone
      />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Privacy and AI Tools
   -------------------------------------------------------------------------- */

/** A line of transcript text in which some pieces are set apart in a colour. */
function MarkedLine({ x, y, parts, color }: { x: number; y: number; parts: (string | [string])[]; color: string }) {
  return (
    <text x={x} y={y} fontFamily={"var(--font-body)"} fontSize={14} fill={INK2}>
      {parts.map((p, i) =>
        typeof p === "string" ? (
          <tspan key={i}>{p}</tspan>
        ) : (
          <tspan key={i} fill={color} fontWeight={600}>
            {p[0]}
          </tspan>
        ),
      )}
    </text>
  );
}

/**
 * Personal data out before submission: a chat message inside the firm, the
 * same message with the name, phone number and address replaced, and only
 * the replaced version crossing the firm's boundary to an external AI
 * service.
 */
export function Redaction() {
  return (
    <Frame
      width={680}
      height={262}
      label="Inside the firm, a customer's chat message: Hi, this is Maria Lopez, 514-555-0182. My order to 22 Rue Saint-Denis never arrived. Below it, the same message with the personal data replaced: Hi, this is [NAME], [PHONE]. My order to [ADDRESS] never arrived. Only the replaced message crosses the firm's boundary to an external AI service"
    >
      <rect x={14} y={30} width={452} height={220} fill="none" stroke={INK3} strokeWidth={1.25} />
      <Key x={26} y={22} size={10}>Inside the firm</Key>
      <Key x={510} y={22} size={10}>External AI service</Key>

      <rect x={30} y={46} width={420} height={70} rx={3} fill={PAPER} stroke={INK3} strokeWidth={1} />
      <MarkedLine x={44} y={74} parts={["Hi, this is ", ["Maria Lopez"], ", ", ["514-555-0182"], ". My order to"]} color={COUNTER} />
      <MarkedLine x={44} y={98} parts={[["22 Rue Saint-Denis"], " never arrived."]} color={COUNTER} />

      <path d={`M240 122V${158 - 1}${head.down(240, 158)}`} fill="none" stroke={INK3} strokeWidth={1.5} />

      <rect x={30} y={164} width={420} height={70} rx={3} fill={PAPER} stroke={INK} strokeWidth={1.25} />
      <MarkedLine x={44} y={192} parts={["Hi, this is ", ["[Name]"], ", ", ["[Phone]"], ". My order to"]} color={SIGNAL} />
      <MarkedLine x={44} y={216} parts={[["[Address]"], " never arrived."]} color={SIGNAL} />

      <rect x={510} y={30} width={150} height={220} fill={PAPER3} />
      <path d={`M450 199H${560 - 1}${head.right(560, 199)}`} fill="none" stroke={INK} strokeWidth={1.5} />
      <AiMark1 cx={600} cy={199} s={64} fill={SIGNAL} />
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Data Storytelling
   -------------------------------------------------------------------------- */

/** Main reason for cancelling, as shares of the customers interviewed (simulated). */
const REASONS: [string, number][] = [
  ["Price increase", 0.42],
  ["Service", 0.24],
  ["Content", 0.19],
  ["Other", 0.15],
];

/**
 * A chart whose title states its finding, and only the finding its
 * uncertainty supports: the bars carry 95% confidence intervals for the
 * number of cancelled customers interviewed. With few interviews the
 * price and service intervals overlap and the title can claim only that
 * the two are not yet separable. With more, the title names price as the
 * main reason.
 */
export function StoryChart() {
  const [n, setN] = useState(400);
  const [p1, p2] = [REASONS[0][1], REASONS[1][1]];
  // Difference between two shares of one sample: var = (p1 + p2 − (p1 − p2)²) / n.
  const zDiff = (p1 - p2) / Math.sqrt((p1 + p2 - (p1 - p2) ** 2) / n);
  const leads = zDiff >= 1.96;
  const half = (p: number) => 1.96 * Math.sqrt((p * (1 - p)) / n);
  const x0 = 168;
  const x1 = 620;
  const X = (v: number) => r2(x0 + (v / 0.7) * (x1 - x0));
  return (
    <div>
      <Frame
        width={680}
        height={330}
        label={`A presentation chart of the main reasons for cancelling among ${n} customers interviewed, with 95% confidence intervals: ${REASONS.map(([r, p]) => `${r.toLowerCase()} ${pct(p)} plus or minus ${Math.round(half(p) * 100)} points`).join(", ")}. Its title reads: ${leads ? "Price is the main reason customers cancel" : "Price and service cannot yet be separated"}`}
      >
        <rect x={20} y={14} width={640} height={302} fill={PAPER} stroke={INK3} strokeWidth={1} />
        <Display x={40} y={56} size={23} fill={leads ? SIGNAL : INK}>
          {leads ? "Price is the main reason customers cancel" : "Price and service cannot yet be separated"}
        </Display>
        <Note x={40} y={80} size={12.5} fill={INK3}>
          {`Main reason for cancelling, ${n.toLocaleString("en-US")} customers interviewed, 95% confidence intervals`}
        </Note>
        {REASONS.map(([r, p], i) => {
          const y = 104 + i * 44;
          const h = half(p);
          const lit = i === 0 && leads;
          return (
            <g key={r}>
              <Note x={40} y={y + 17} size={13.5} fill={INK}>{r}</Note>
              <rect x={x0} y={y + 4} width={r2(X(p) - x0)} height={18} fill={lit ? SIGNAL : RULE2} />
              <line x1={X(Math.max(0, p - h))} y1={y + 13} x2={X(p + h)} y2={y + 13} stroke={INK} strokeWidth={1.5} />
              <line x1={X(Math.max(0, p - h))} y1={y + 6} x2={X(Math.max(0, p - h))} y2={y + 20} stroke={INK} strokeWidth={1.5} />
              <line x1={X(p + h)} y1={y + 6} x2={X(p + h)} y2={y + 20} stroke={INK} strokeWidth={1.5} />
              <Key x={r2(X(p + h) + 8)} y={y + 17} size={10.5} weight={700} fill={lit ? SIGNAL : INK2}>{`${pct(p)} \u00B1 ${Math.round(h * 100)}`}</Key>
            </g>
          );
        })}
        <line x1={x0} y1={286} x2={x1} y2={286} stroke={INK} strokeWidth={1.25} />
        {[0, 0.2, 0.4, 0.6].map((v) => (
          <g key={v}>
            <line x1={X(v)} y1={286} x2={X(v)} y2={290} stroke={INK} strokeWidth={1.25} />
            <Key x={X(v)} y={303} anchor="middle" size={9.5}>{pct(v)}</Key>
          </g>
        ))}
      </Frame>
      <Slider label="Customers interviewed" value={n} min={30} max={1000} step={10} onChange={setN} />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Reporting the Use of AI
   -------------------------------------------------------------------------- */

/** Rows of a report's AI disclosure: the step, whether an AI tool did it, and how it was checked. */
const DISCLOSURE: { step: string[]; ai: boolean; check: string[]; lit?: boolean }[] = [
  { step: ["Drafting the", "questionnaire"], ai: true, check: ["Revised by the research team.", "pretested with 12 customers."] },
  { step: ["Coding 2,400 open-", "ended responses"], ai: true, check: ["Agreement with two human coders", "on 300 responses: 89%."], lit: true },
  { step: ["Synthetic", "respondents"], ai: true, check: ["Used to pilot the questionnaire.", "not the source of any finding."] },
  { step: ["Limitations"], ai: false, check: ["Coding agreement is lower for", "Spanish responses (78%)."] },
];

/**
 * The disclosure as a page of the report: a short method subsection that
 * lists each step where an AI tool was used (spark), how its output was
 * verified, whether synthetic respondents were used, and the limitation
 * the AI introduces.
 */
export function AiDisclosure() {
  return (
    <Frame
      width={600}
      height={360}
      label="A page from a research report, section 3.4, Use of AI tools: a table of steps and how each was verified. Drafting the questionnaire: revised by the research team and pretested with 12 customers. Coding 2,400 open-ended responses: agreement with two human coders on 300 responses, 89%. Synthetic respondents: used to pilot the questionnaire, not the source of any finding. Limitations: coding agreement is lower for Spanish responses, 78%"
    >
      <rect x={20} y={10} width={560} height={340} fill={PAPER} stroke={INK3} strokeWidth={1} />
      <Key x={44} y={40} size={9.5}>3. Method</Key>
      <Display x={44} y={70} size={21}>3.4 Use of AI tools</Display>
      <Key x={44} y={102} size={9}>Step</Key>
      <Key x={290} y={102} size={9}>Verification and limits</Key>
      <line x1={44} y1={110} x2={556} y2={110} stroke={INK} strokeWidth={1.25} />
      {DISCLOSURE.map((r, i) => {
        const y = 134 + i * 54;
        return (
          <g key={i}>
            {i > 0 ? <line x1={44} y1={y - 20} x2={556} y2={y - 20} stroke={RULE} strokeWidth={1} /> : null}
            {r.ai ? <AiMark1 cx={56} cy={y + 2} s={18} fill={SIGNAL} /> : null}
            {r.step.map((t, j) => (
              <Note key={j} x={76} y={y + 6 + j * 17} size={13} weight={600} fill={INK}>{t}</Note>
            ))}
            {r.check.map((t, j) => (
              <Note key={j} x={290} y={y + 6 + j * 17} size={13} fill={r.lit ? SIGNAL : INK2} weight={r.lit ? 600 : 400}>{t}</Note>
            ))}
          </g>
        );
      })}
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Agent-Mediated Markets as a Research Agenda
   -------------------------------------------------------------------------- */

type Cost = "0" | "10";
type Goal = "vague" | "specific";

/**
 * Wadi & Ma (2026b), Study 1, Table 1: eight commercially deployed models,
 * 100 sessions per model and condition. Mean diagnostic cells opened (of 2
 * per attribute: dollars, cents, weight) and the share of sessions that
 * chose the coffee with the lower price per ounce.
 */
const TOOL_LAB: Record<Goal, Record<Cost, { dollars: number; cents: number; weight: number; optimal: number }>> = {
  specific: {
    "0": { dollars: 2.0, cents: 2.0, weight: 2.0, optimal: 0.94 },
    "10": { dollars: 2.0, cents: 1.72, weight: 2.0, optimal: 0.83 },
  },
  vague: {
    "0": { dollars: 2.0, cents: 1.97, weight: 1.9, optimal: 0.89 },
    "10": { dollars: 1.94, cents: 0.77, weight: 1.1, optimal: 0.29 },
  },
};

/**
 * How agents choose, on real data: an AI agent buys instant coffee from a
 * storefront where each attribute is hidden until inspected. Coffee A costs
 * $4.99 for 10 oz, Coffee B $5.00 for 11 oz, so B is cheaper per ounce.
 * Set the cost of each inspection and the goal in the consumer's prompt:
 * either change alone leaves search and choice nearly intact. Together,
 * the agents skip the cents and the weight, and most choose Coffee A.
 */
export function AgentSearch() {
  const [cost, setCost] = useState<Cost>("10");
  const [goal, setGoal] = useState<Goal>("vague");
  const d = TOOL_LAB[goal][cost];
  const rows: { key: string; a: string; b: string; v: number }[] = [
    { key: "Dollars", a: "$4", b: "$5", v: d.dollars / 2 },
    { key: "Cents", a: "99\u00A2", b: "00\u00A2", v: d.cents / 2 },
    { key: "Weight", a: "10 oz", b: "11 oz", v: d.weight / 2 },
  ];
  const bx0 = 470;
  const bx1 = 640;
  const BX = (v: number) => r2(bx0 + v * (bx1 - bx0));
  return (
    <div>
      <Frame
        width={680}
        height={372}
        label={`An AI agent shops for instant coffee. Each inspection of an attribute costs the user $${cost}, and the prompt says: ${goal === "vague" ? "find the best deal" : "find the coffee with the lowest price per ounce"}. Across eight models, sessions opened the dollars in ${pct(rows[0].v)}, the cents in ${pct(rows[1].v)} and the weight in ${pct(rows[2].v)} of cases, and ${pct(d.optimal)} chose Coffee B, the lower price per ounce. Data: Wadi and Ma 2026b, Table 1`}
      >
        <AiMark1 cx={32} cy={30} s={22} fill={SIGNAL} />
        <Note x={52} y={35} size={14} italic fill={INK}>
          {goal === "vague" ? "\u201CYou need to find the best deal on instant coffee.\u201D" : "\u201CYou need to find the coffee with the lowest price per ounce.\u201D"}
        </Note>
        <Note x={52} y={57} size={13} fill={INK2}>{cost === "0" ? "Inspecting an attribute is free." : "Each inspection costs the user $10."}</Note>

        <Key x={230} y={96} anchor="middle" size={10} fill={INK}>Coffee a</Key>
        <Key x={370} y={96} anchor="middle" size={10} fill={INK}>Coffee B</Key>
        <Key x={230} y={112} anchor="middle" size={9} fill={INK3}>$0.499 per oz</Key>
        <Key x={370} y={112} anchor="middle" size={9} fill={INK3}>$0.455 per oz</Key>
        <Key x={bx0} y={112} size={9}>Sessions that opened it</Key>
        {rows.map((r, i) => {
          const y = 124 + i * 50;
          return (
            <g key={r.key}>
              <Key x={40} y={y + 25} size={10}>{r.key}</Key>
              {[r.a, r.b].map((t, j) => (
                <g key={j}>
                  <rect x={170 + j * 140} y={y} width={120} height={38} fill={PAPER} stroke={INK3} strokeWidth={1.1} />
                  <Note x={230 + j * 140} y={y + 25} anchor="middle" size={15} weight={600} fill={INK}>{t}</Note>
                </g>
              ))}
              <rect x={bx0} y={y + 12} width={r2(BX(r.v) - bx0)} height={14} fill={r.v < 0.7 ? COUNTER : INK3} />
              <Key x={r2(BX(r.v) + (r.v > 0.8 ? -6 : 6))} y={y + 23} anchor={r.v > 0.8 ? "end" : "start"} size={10} weight={700} fill={r.v > 0.8 ? PAPER : COUNTER}>{pct(r.v)}</Key>
            </g>
          );
        })}
        <line x1={20} y1={284} x2={660} y2={284} stroke={RULE} strokeWidth={1} />
        <Key x={40} y={308} size={10}>Chose coffee B, the lower price per ounce</Key>
        <rect x={40} y={318} width={400} height={18} fill={PAPER3} />
        <rect x={40} y={318} width={r2(400 * d.optimal)} height={18} fill={SIGNAL} />
        <Display x={456} y={336} size={28} fill={SIGNAL}>{pct(d.optimal)}</Display>
        <Key x={660} y={364} anchor="end" size={9} fill={INK3}>{"Wadi & Ma (2026b), Table 1. 3,200 sessions, 8 models"}</Key>
      </Frame>
      <div className="flex flex-wrap gap-x-6">
        <Segmented<Cost>
          label="Cost per inspection"
          options={[
            { id: "0", label: "$0" },
            { id: "10", label: "$10" },
          ]}
          value={cost}
          onChange={setCost}
        />
        <Segmented<Goal>
          label="Goal in the prompt"
          options={[
            { id: "vague", label: "Best deal" },
            { id: "specific", label: "Price per ounce" },
          ]}
          value={goal}
          onChange={setGoal}
        />
      </div>
    </div>
  );
}
